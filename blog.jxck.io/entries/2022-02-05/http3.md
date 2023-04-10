# [http3][quic][dns] サイトの HTTP3 化と DNS HTTPS RR および Alt-Svc Header によるアドバタイズ

## Intro

本サイトを HTTP3 対応し、Alt-Svc ヘッダおよび DNS HTTPS Resource Record によってそれをアドバタイズする構成を適用した。

色々ハマったので作業のログを記す。


## HTTP3 on h2o

Fastly の数々の発表からも h2o が HTTP3 に対応していることは自明だが、その設定方法がドキュメントに記載されておらず、なかなか設定方法がわからずにいた。先日、たまたま当該 [issue](https://github.com/h2o/h2o/issues/2906#issuecomment-1026107729) の中で、設定ファイルサンプルの中にコメントアウトされたフラグがあることを教えてもらい、これをたよりに HTTP3 化を進めることができた。

したがって、ここから記す内容はドキュメントやリリースノートの内容ではないため、将来的に全然違う方法になるかもしれない点には注意が必要だ。なお、最近はリリース自体がないため master をビルドしてデプロイしている。


### h2o.config

サンプルに記載されていた設定は以下だ。

- https://github.com/h2o/h2o/blob/master/examples/h2o/h2o.conf#L14

まず、 `listen` directive の中で `type: quic` を指定するとそれだけで QUIC が有効になり、HTTP3 が動くようだ。そして、そのとおり実際に動く。

```yaml
# The following three lines enable HTTP3
listen:
  <<: *ssl_listen
  type: quic
header.set: "Alt-Svc: h3-25=\":8081\""
```

ここで注意が必要なのは、ブラウザの挙動とディレクティブの順番だ。

例えば、本サイトではテスト用に `http3.jxck.io` を切り、そこで以下のように検証を試みた。

```yaml
hosts:
  "jxck.io:443":
      listen: 443
      ...
  "jxck.io:80":
      listen: 80
      ...

  "http3.jxck.io:80":
    listen:
      port: 80
      pathes:
        "/":
      redirect:
        status: 308
        url: https://http3.jxck.io:443/

  "http3.jxck.io:443":
    listen:
      port: 443
      type: quic # for http3
      ssl:
        key-file: /keys/jxck.io/privkey.pem
        certificate-file: /keys/jxck.io/fullchain.pem
        minimum-version: TLSv1.2
        cipher-suite: "ECDHE-ECDSA-AES256-GCM-SHA384:..."
        cipher-preference: server
    header.add: "Alt-Svc: h3=\":443\";ma=60,quic=\":443\";ma=60"
    paths:
      "/":
        mruby.handler: |
          Proc.new do |env|
            [200, {}, ["http3"]]
          end
```

しかし、これではデプロイできない。mruby ハンドラ内の `"http3"` とだけ表示されるのを期待したが、実際には jxck.io の内容が表示される。

これは、ブラウザが `Alt-Svc` を見てから初めて QUIC 対応を知るため、1 回目のアクセスは通常通り HTTP1 or 2 で行い、UDP しか待ち受けてない `http3.jxck.io` では接続が確立できず、フォールバックとして TCP での接続を受け取れる `jxck.io` の内容が表示されているようだ。

つまり `type: quic` を指定した listener は、HTTP2 と HTTP3 を同時に受けるわけではなく、完全に HTTP3 のみを listen するフラグとなっていることがわかる。

したがって、HTTP3 だけではなく HTTP2 も並行して待ち受け、HTTP2 側で `Alt-Svc` を返し、2 回目の接続から HTTP3 にアクセスするように構成する必要がある。

```yaml
hosts:
  "http3.jxck.io:443": # http2
    listen:
      port: 443
      ...
  "http3.jxck.io:443": # http3
    listen:
      port: 443
        type: quic
        ...
```

ところが、これでは `http3.jxck.io:443` という Map のキーがかぶってエラーになる。ただし、今までサンプル通りに書いていたここの Port 番号は無くてもよいようなので、リダイレクト用の 80 も含めて以下のようにした。

```yaml
hosts:
  "http3.jxck.io:80": # http1
    listen:
      port: 80
      ... # https へのリダイレクト
  "http3.jxck.io:443": # http2
    listen:
      port: 443
      ... # Alt-Svc の提供
  "http3.jxck.io": # http3
    listen:
      port: 443
        type: quic
        ...
```

これだとパス部分を 3 回コピーする必要がある。Yaml のエイリアスが使えるとは言え、ちょっと微妙だ。

と思ってドキュメントを眺めていたら以下の書き方でもいけることがわかった。Yaml 的にはアウトな気がするが `listen` は重複しても良いらしい。

- [Listening to both HTTP and HTTPS · h2o/h2o Wiki (github.com)](https://github.com/h2o/h2o/wiki/Listening-to-both-HTTP-and-HTTPS)

```yaml
hosts:
  "http3.jxck.io":
    listen:
      port: 443
      type: quic
      ...
    listen:
      port: 443
        ...
    listen:
      port: 80
    header.add: "Alt-Svc: h3=\":443\";ma=60,quic=\":443\";ma=60"
    paths:
      mruby.handler-file: .mruby.handler/hsts.rb
      ...
```

結果、H3 -> H2 -> H1 の順で `listen` を記述し、全体で `Alt-Svc` を付与すると、意図したデプロイができることがわかった。

とはいえもう 80 はリダイレクトのためだけに listen しているのでそこは分けるといかのようになる。

```yaml
hosts:
  "http3.jxck.io:80":
    listen:
      port: 80
    paths:
      "/":
        mruby.handler: |
          Proc.new do |env|
            location = "https://http3.jxck.io:443"
            [308, {location: location}, []]
          end
  "http3.jxck.io":
    listen:
      port: 443
      type: quic
      ...
    listen:
      port: 443
        ...
    header.add: "Alt-Svc: h3=\":443\";ma=60,quic=\":443\";ma=60"
    header.add: "Strict-Transport-Security: max-age=31536000"
    paths:
      mruby.handler-file: .mruby.handler/hsts.rb
      ...
```


### Cipher Suite

HTTP3 は TLS/1.3 を前提としており、使用できる Cipher Suite が限られている。それも踏まえて Cipher Suites の見直しも行った。

- RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3
  - https://datatracker.ietf.org/doc/html/rfc8446#section-9.1

まず、TLS/1.3 でマンダトリなのは以下だ。

- TLS_AES_128_GCM_SHA256 (MUST)
- TLS_AES_256_GCM_SHA384 (SHOULD)
- TLS_CHACHA20_POLY1305_SHA256 (SHOULD)

しかし、この 3 つだけでは TLS/1.2 でつながらない場面が予想されるため、互換用の Suite も対応が必要だ。こうした場合は、Mozilla の Wiki にある推奨設定が参考になる。

- Security/Server Side TLS - MozillaWiki
  - https://wiki.mozilla.org/Security/Server_Side_TLS#Intermediate_compatibility_.28recommended.29

推奨される Cipher Suite は以下。

```
0x13,0x01 - TLS_AES_128_GCM_SHA256         TLSv1.3  Kx=any   Au=any    Enc=AESGCM(128)             Mac=AEAD
0x13,0x02 - TLS_AES_256_GCM_SHA384         TLSv1.3  Kx=any   Au=any    Enc=AESGCM(256)             Mac=AEAD
0x13,0x03 - TLS_CHACHA20_POLY1305_SHA256   TLSv1.3  Kx=any   Au=any    Enc=CHACHA20/POLY1305(256)  Mac=AEAD
0xC0,0x2B - ECDHE-ECDSA-AES128-GCM-SHA256  TLSv1.2  Kx=ECDH  Au=ECDSA  Enc=AESGCM(128)             Mac=AEAD
0xC0,0x2F - ECDHE-RSA-AES128-GCM-SHA256    TLSv1.2  Kx=ECDH  Au=RSA    Enc=AESGCM(128)             Mac=AEAD
0xC0,0x2C - ECDHE-ECDSA-AES256-GCM-SHA384  TLSv1.2  Kx=ECDH  Au=ECDSA  Enc=AESGCM(256)             Mac=AEAD
0xC0,0x30 - ECDHE-RSA-AES256-GCM-SHA384    TLSv1.2  Kx=ECDH  Au=RSA    Enc=AESGCM(256)             Mac=AEAD
0xCC,0xA9 - ECDHE-ECDSA-CHACHA20-POLY1305  TLSv1.2  Kx=ECDH  Au=ECDSA  Enc=CHACHA20/POLY1305(256)  Mac=AEAD
0xCC,0xA8 - ECDHE-RSA-CHACHA20-POLY1305    TLSv1.2  Kx=ECDH  Au=RSA    Enc=CHACHA20/POLY1305(256)  Mac=AEAD
0x00,0x9E - DHE-RSA-AES128-GCM-SHA256      TLSv1.2  Kx=DH    Au=RSA    Enc=AESGCM(128)             Mac=AEAD
0x00,0x9F - DHE-RSA-AES256-GCM-SHA384      TLSv1.2  Kx=DH    Au=RSA    Enc=AESGCM(256)             Mac=AEAD
```

結果、できあがった h2o.conf が以下だ。

- https://github.com/Jxck/jxck.io/blob/master/h2o.conf


### Alt-Svc HTTP Header

`Alt-Svc` は HTTP3 のためだけではなく、「このサーバでは別のサービス(Alternate Service)を提供している」という旨をアドバタイズする仕様だ。

- RFC 7838 - HTTP Alternative Services
  - https://datatracker.ietf.org/doc/html/rfc7838

今回はこれを HTTP3 のアドバタイズにのみ使用している。

```http
Alt-Svc: h3=":443";ma=60,quic=":443";ma=60"
```

実装中は `h3-25` などのように Draft のバージョンを付与したネゴシエーションも行われていたが、現状の Chrome Stable (M97)では `h3` のみで動作することを確認している。本来後ろの `quic` もいらないように思うが、なんとなく残している。

`ma` は Max-Age であり、本来はもっと長い時間にするべきだが、デバッグ中なので短くしている。

他にも `persist` や `clear` があるが、今回は使ってないため挙動は確認してない。

指定する Port だが、例えばこれを `h3=:4433` などとして TCP-TLS 用の 443 とは別に QUIC のサーバを建てることもできるという仕様になっている。したがって、最初は以下のようにしていた。

```yaml
hosts:
  "http3.jxck.io:443": # http2
    listen:
      port: 443
      header.add: "Alt-Svc: h3=\":4433\";ma=60"
      ...
  "http3.jxck.io:4433": # http3
    listen:
      port: 4433
        type: quic
        ...
```

しかし、これでは動かない。

どうやら Chrome は特権 Port からの `Alt-Svc` は特権ポートでないと許可しないようだ。つまり `8080` -> `4433` はできるが `443` -> `4433` はできない。 `8080` -> `443` もできない。

結果 UDP-QUIC と TCP+TLS は、実質どちらも `443` を使う必要があるため、前述のような構成になった。

これにより、HTTP2 で接続し、そこで `Alt-Svc` を受信したら、次のリクエストからは HTTP3 になる挙動を Chrome で確認した。


## HTTPS Resource Record

折角の HTTP3 なのに、一度 HTTP2 で接続してからでないと使えないのは勿体ない。しかし、いきなり HTTP3 でリクエストしても UDP-QUIC が提供されているかわからないため、このような仕様になっている。

もし最初のリクエストから HTTP3 で接続させたければ、リクエストよりも先に HTTP3 がサポートされている旨を知る必要がある。そこで使用できるのが DNS の HTTPS RR(Resource Record)だ。

- draft-ietf-dnsop-http-record-00
  - https://datatracker.ietf.org/doc/html/draft-ietf-dnsop-svcb-https-08

HTTPS の RR は全部解説すると長くなるので、HTTP3 に対応する部分にフォーカスすると以下のように `Alt-Svc` 相当の情報を提供すれば良い。

```dns
http3.jxck.io IN HTTPS 1 . alpn="h3"
```

なお、このレコードも HTTP3 のためのものではなく、HTTPS に関する情報が提供できるため、例えば HSTS のように「サイトが HTTPS に対応している」ことをアドバタイズする用途にも使える。これまでは `Strict-Transport-Security` ヘッダか、ブラウザに登録する Preload HSTS を利用するしかなかったが、HTTPS RR を用いれば DNS レベルで `http://` アクセスを防ぐことができる。

ついでに、A や AAAA を別途引かないでも済むように、アドレスをヒントとして提供できるようになっている。

```dns
http3.jxck.io IN HTTPS 1 . (alpn="h3" ipv4hint="160.16.91.134" ipv6hint="2001:e42:102:1521:160:16:91:134")
```


### 対応している DNS

ドメインを持っていれば、どこかしらに DNS の設定を書いていると思うが、DNS によっては選択できるレコードタイプが限定されているものがある。

筆者の場合は Sakura の DNS を利用していたが、ここではそもそも HTTPS Record が選択できなかったため、DNS を引っ越すところから始める必要があった。

![Sakura DNS のレコードタイプ](sakura-dns-supported-record.png#347x404 "Sakura DNS Supported Record")

そこで HTTPS Record Type に対応している Google Cloud DNS に引っ越すことにした。

![Google Cloud DNS のレコードタイプ](google-cloud-dns-supported-record.png#502x616 "Google Cloud DNS Supported Record")


### Chrome での HTTP RR

しかし、このレコードを追加しただけでは Chrome では HTTP3 が動かない。

まず、Chrome はこの HTTPS RR への対応を開始しているが、現段階では前述の HSTS 用途のみで、HTTP3 のアドバタイズには対応してないようだ。

- Intent to Ship: HTTP->HTTPS redirect for HTTPS DNS records
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_wp024Ixvfk/m/dJi0uyG0BAAJ

したがって、現状 Chrome ではこれはできない。


### Firefox での HTTP RR

代わりに Firefox は既に HTTP RR による HTTP3 に対応している。ところがこちらもデフォルトの設定のままではクエリが飛ばない。

これは、 *HTTP RR は DoH に対応している必要がある* というルールがあり、これが仕様なのか実装なのかは未確認だが、DoH に対応した DNS にクエリする場合のみ取得される。また、その設定も OS の DNS 設定を 1.1.1.1 などにするだけではなく、Firefox の設定画面から DoH を有効にする必要がある。DoH 有効時にプロバイダを選ばされ、ここでは Cloudflare を選択した。この時点で OS の DNS 設定は無視されているかもしれない。

![Firefox の DoH 有効化](enable-firefox-doh.png#1338x370 "Enable Firefox DoH")

設定が成功していれば、Firefox の about:networking#dnslookuptool からクエリを試すと、HTTPS RR が引けることが確認できる。

![Firefox での DNS Lookup テスト](firefox-dns-lookup.png#1410x648 "Firefox DNS Lookup")


## 結果

以上を設定してやっとサイトを HTTP3 に対応することができた。

![Chrome Devtools の Network Tab で HTTP3 化を確認](http3-devtools.png#1446x1672)

まとめると、やることは以下だ。

- HTTPS RR に対応した DNS を選択、レコードを設定
- h2o で `type: quic` を有効にしつつ HTTP2 にもフォールバックできるよう構成
- `Alt-Svc` ヘッダをレスポンスに追加
- Firefox は DoH を有効化

本サイトは blog.jxck.io は jxck.io の CNAME のようにサブドメインを CNAME で設定している。この場合 HTTPS RR を提供するのは大本の jxck.io のみになる。


## Outro

念願の HTTP3 対応を実現することができた。

HTTP3 はずっと検証したかったがドキュメントが更新されなかったため使い方がわからず、たまにドキュメントやリポジトリを "http3" で検索していたが、 "http/3" で検索すればもっと早く気付けていたと思うと残念だ。

そろそろ h2o をやめて Nginx に引っ越して、そちらで検証するかと考えていたところなので、Issue で教えてくれた [inductor](https://github.com/h2o/h2o/issues/2906#issuecomment-1026107729) には感謝しか無い。

今後は HTTP RR Record 含め、より細かく挙動などを検証していきたい。


## Resources

- Spec
  - RFC 8446 - The Transport Layer Security (TLS) Protocol Version 1.3
    - https://datatracker.ietf.org/doc/html/rfc8446#section-9.1
  - RFC 7838 - HTTP Alternative Services
    - https://datatracker.ietf.org/doc/html/rfc7838
  - draft-ietf-dnsop-http-record-00
    - https://datatracker.ietf.org/doc/html/draft-ietf-dnsop-svcb-https-08
- Explainer
- Requirements Doc
  - DNS HTTPS Records
    - https://docs.google.com/document/d/1k461sRbddjDGj7Q8f-ZKHZvmB-ENUWSdX_3Fpp2dmXQ/edit
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
  - Intent to Ship: HTTP->HTTPS redirect for HTTPS DNS records
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/_wp024Ixvfk/m/dJi0uyG0BAAJ
- Chrome Platform Status
  - QUIC (HTTP/3) - Chrome Platform Status
    - https://chromestatus.com/feature/5338403830759424
  - HTTP->HTTPS redirect for HTTPS DNS records - Chrome Platform Status
    - https://chromestatus.com/feature/5485544526053376
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
  - How can we use HTTP/3? - Issue #2906 - h2o/h2o
    - https://github.com/h2o/h2o/issues/2906
- Other
  - Security/Server Side TLS - MozillaWiki
    - https://wiki.mozilla.org/Security/Server_Side_TLS#Intermediate_compatibility_.28recommended.29
  - HTTP/3 Check
    - https://http3check.net/