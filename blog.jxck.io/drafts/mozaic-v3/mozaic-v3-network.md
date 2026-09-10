# mozaic.fm v3 Release Note #2 - Network

## Intro

mozaic.fm v3 をリリースした。

今回は、採用したネットワーク周りの変更について解説する。

ずっとやってみたかった実験を多分に入れているため、場合によっては接続すらできないだろう。

Podcast アプリを通しての視聴には影響がないため、これまで通りアプリで楽しんで欲しい。


## no IPv4

まず、ずっとやってみたかった IPv6 Only にした。

具体的には mozaic.fm ドメインの A レコードの提供をやめている。

従って、IPv4 のみの環境からアクセスすると以下のようにエラーが出るだろう。

TODO: エラー画面

IPv4 が枯渇すると騒がれてから数年、CIDR などによる延命もあり、良くてデュアル、場合によっては v4 のみの環境が未だに多い。

今年 4 月には、ブログの方でテストを行ったが、そのときは A は落とさず、src IP が v4 だったらエラーにするものだった。

- 本サイトの IPv4 アクセスをブロックするテスト | blog.jxck.io
  - https://blog.jxck.io/entries/2026-04-01/ipv6-only.html

しかし、これだと色々なところにエラー画面がキャッシュされ、OGP が壊れたりといった状況になった。

それも中途半端なため、今回は A レコードを落とし、サーバもリッスンしないことで、完全に IPv4 を落とすことにした。加えて HTTPS RR で `ipv6hint` も告知している。

Happy Eyeballs による僅かな遅延も気にする必要はなくなり、マンションの混んだ v4 トンネルに悩まされることもない。

実は、筆者のマンションは、v4 オンリーのマンションタイプであるため、サイトに接続することができない。

検証は毎回 Cloudflare WARP を入れ、トンネリングしてアクセスしているため、同じ状況の人にはこれを推奨する。

- 1.1.1.1
  - https://one.one.one.one/

なお、Podcast アプリでの視聴に必要な feed, mp3, artwork を提供するホストについては、Dual Stack を維持しているため、Spotify などでの視聴には影響はない。


## no :80

HTTPS Only というと、別に珍しくもないだろう。

一般的には、`http://` と `https://` を両方デプロイし、`http://` の場合はリダイレクトをかけ、HSTS で固着させるといった構成が基本だ。Cookie に `Secure` がついていれば、大きな被害はないだろうという落としどころだ。

しかし、その最初のアクセスは平文が残り、ブラウザは HTTPS First Mode, Preload HSTS, HTTPS RR などを模索しながら、最初の平文通信も暗号化する方法を探っている。

本サイトでは、`:443` のみを受けるようにするとともに、`:80` を Listen するのをやめ、ufw でも塞ぐことにした。

これにより、そもそも `:80` とは経路確立ができないため、平文にペイロードが露出することはない。

しかし、mozaic.fm 自体が 10 年以上やっているため、世の中には `http://mozaic.fm` なリンクもあるだろう。

そこで DNS から HTTPS RR を提供することで、対応するクライアントが最初から HTTPS に Upgrade できるようアドバタイズしている。

`mozaic.fm` は、かなり以前に Chrome の Preload HSTS プログラムに登録しており、HSTS に `preload` も入れていた。しかし、HTTPS RR が普及したことも鑑み、`preload` はもうやめることにした(リストへの削除申請はしていない)。

```
Strict-Transport-Security: max-age=63072000; includeSubDomains
```

なお、Podcast アプリでの視聴に必要な feed, mp3, artwork を提供するホストについては、`:80` を維持しているため、Spotify などでの視聴には影響はない状態を維持したい。

ところが、これを h2o で維持するのは、少しむずかしかった。

例えば、`mozaic.fm` は `:80` を listen せず、`feed.mozaic.fm` は `:80` を listen する `h2o.conf` はこうなる。

```conf
jxck.io:
  listen:
    port: 80
mozaic.fm:
  listen:
    port: 443
feed.mozaic.fm:
  listen:
    port: 80
  listen:
    port: 443
```

ところが、h2o のインスタンスが listen しているアドレス自体が一緒だと、`mozaic.fm:80` のリクエストは、同じ IP/Port を listen している最初の定義(Default vhost)にフォールバックされてしまう。この h2o は mozaic.fm だけでなく jxck.io もホストしているため、そちらに落ちて意図しないレスポンスを返してしまうのだ。

もともと使っていた Sakura VPS では、インスタンスに割り当てられる IPv6 アドレスがそれぞれ 1 つずつなので、h2o の制約を逃れることができなかった。

ところが、`mozaic.fm` はすでに IPv4 をサポートしないことになっているので、IPv6 でアドレスを分ければ、フォールバックがおこらない。しかし、Sakura VPS は IPv6 も 1 個なのでそれもできない。

そこで、長年利用していた Sakura VPS をやめ、IPv4 は 1 個だが、IPv6 が複数付与される ConoHa VPS に移行することにした。

このようにサブドメインごとに IPv6 を分け、`mozaic.fm` は専用 IPv6 の `:443` のみを Listen することで、フォールバックを防ぐことができた。

```
"mozaic.fm":
  listen:
    host: 2400:8500:2002:3327:a160:251:255:820
    port: 443
"feed.mozaic.fm:80":
  listen:
    host: 2400:8500:2002:3327:a160:251:255:825
    port: 80
  listen:
    host: 160.251.255.82
    port: 80
```

これにより、視聴者は常に `:443` で暗号化された経路を使うため、どんなエピソードを聞いているか、完全に秘匿することが可能になる。(mp3 は `:80` を維持しているためそちらを見ればわかるが。)

10 年以上 mozaic.fm を支えてくれた Sakura VPS を卒業するのは名残惜しいが、リスナーの安全には代えることができない。今までありがとう。


## no plain DNS

HTTP が暗号化されても、その手前の DNS Query が平文だと、「mozaic.fm を名前解決した」という事実がネットワークに暴露してしまう。

そこで DNS over HTTPS を用いると、DNS Query を HTTPS で暗号化することができる。

これについては、筆者が対応するのではなく、DoH に対応した DNS をユーザが使ってもらう必要がある。

先ほど紹介した Cloudflare WARP なら、1.1.1.1 を用いてそれが可能だ。


## no DNS Poisoning

ところが、DoH で引いた値が Cache Poisoning などされていれば、偽のレコードで攻撃者サーバに接続させられる可能性は残る。

そこで、筆者は DNSSEC を有効にし、レコードに署名をつけている。

これによって、署名のチェーンを辿ればレコードが改ざんされていることを検知できるため、安心して解決して欲しい。


## no Mis-issued Certificate

ここまでで、DNS から HTTP Request まで全て暗号化することができた。

しかし、正規の CA から mozaic.fm の証明書が、筆者の知らないところで発行され、それを使って偽サイトを立てられると、不正確な Web の情報や、フェイクオーディオを聴かされる可能性がある。

そこで、筆者が使っている Let's Encrypt 以外が証明書を発行しないよう、CAA レコードで対象を絞りつつ、それを無視する発行を検知するため、CT Log の監視を行っていた。

以前、登録したドメインの CT Log が追加されると、Facebook にメッセージが来るなぞの連携があったが、それはどうやらサ終してしまった。

そこで Cloudflare の Certificate Transparency Monitoring に移行し、メールで通知を受け取る運用に変えた。無料で使えるため、非常にありがたい。


## no Long Lived Certificate

Let's Encrypt は 6 日(160 時間)期限の短命証明書を提供している。

これは、仮に誤発行が発覚しても、適切に失効するのは非常に難しく、仮に失効できてもその事実をクライアントに伝えるのが難しいという問題に起因した緩和策だ。

要するに、誤発行を失効するより、そもそもすぐに期限切れで無効になれば良いという考え方だ。

本サイトは、この短命証明書に移行した。

もともと Certbot の更新は HTTP ベース(HTTP-01) で行っていたが、`:80` を閉じることになったため、`http://mozaic.fm/.well-known` に接続できなくなった。そこで、Cloudflare の API Token を Certbot に渡し、DNS ベース(DNS-01)で更新を行うように移行した。

もともと Short Lived にする前は、Systemd Timer を 48 時間おきに起動していた。しかし、Short Lived の場合 Certbot は 80 時間を切ると更新をかける。もし 80 時間を切ったあとの起動で Certbot がミスしたら、2 日後の Timer 発火時には証明書がもう切れている可能性がある。そこで、Daily での起動に直し、毎日残期限をチェックしながら更新するようにしている。

ACME のおかげで、この頻度での更新も可能になった。

DNS-PERSIST-01 が来れば、DNS-01 のレコード書き換えによるチェックも変わるため、提供されたらそちらも検証したい。


## no TLS/1.2

TLS は長いこと 1.2 をベースとして、ネゴシエーションが通れば 1.3 を使うという運用が主だった。

ところが TLS/1.2 には歴史的な蓄積が大きく、現在となっては非推奨な方式もサポートされており、設定を気をつけるしかなかった。

そこで、本サイトでは、1.3 未満を落とすことにした。

これにより、古い鍵交換や暗号化が全て落とされ、Forward Secrecy が必須になり、RTT も短縮される。

1.2 での接続自体ができなくなることで、ユーザが知らぬ間に非推奨な方式でハンドシェイクしてしまい、その隙をつかれて聴いているエピソードがバレてしまう心配がなくなる。


## no Pre-Quantum Cipher Suite

完璧に HTTPS をデプロイできても、暗号化が破られると問題だ。

特に量子コンピュータによって、従来安全とされていたアルゴリズムが危殆化した場合の影響が大きい。

リスナーの通信パケットを全て溜め込んでおき、量子コンピュータを使ってじっくり暗号を解読したら、「このリスナーがこのエピソードを聞いていた」という事実が、さかのぼって暴露される可能性がある。

これに対抗するため、現在は耐量子暗号(Post-Quantum Cryptography)が研究され、標準仕様も整備されてきた。

TLS/1.3 では、実装必須な Suite は `TLS_AES_128_GCM_SHA256` と定義されている。

> A TLS-compliant application MUST implement the TLS_AES_128_GCM_SHA256 [GCM] cipher suite
> and SHOULD implement the TLS_AES_256_GCM_SHA384 [GCM]
> and TLS_CHACHA20_POLY1305_SHA256 [RFC8439] cipher suites (see Appendix B.4).
>
> --- https://www.rfc-editor.org/rfc/rfc9846.html#section-9.1

ところが、Grover のアルゴリズムにより、量子コンピュータを用いると鍵探索コストを削減できると指摘がされている。AES-128 は概ね 2^64 相当に落ちるというものだ。

これにより、すぐ危殆化するわけではないが、NSA CNSA 2.0 においては、共通鍵暗号の鍵長は 256bit を推奨している。

> Use 256-bit keys for all classification levels
>
> --- https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF

RFC と競合するが、RFC 側は基本的には疎通(Interop)を重視しているため、セキュリティレベルだけを起点に書かれているわけではない。そして、全ての暗号化方式には危殆化のリスクがあるが、そのたびに RFC を更新するのも難しい。

そこで、Mandatory-to-Implement の節には以下の一文がある。

> In the absence of an application profile standard specifying otherwise:
>
> --- https://www.rfc-editor.org/rfc/rfc9846.html#section-9.1

要するに、NSA CNSA のような国家の調達基準といった、別に定める Standard Profile によってこれを上書きする余地だ。疎通ができないリスクを飲んだ上で、AES-128 を落とし SHOULD である、AES-256 や ChaCha20-Poly1305 のみをサポートする要件が定義されることもある。

本サイトはなんらかの Standard Profile を適用しているわけではないが、実験を目的とした構成として、あえて AES-128 を落とした設定を試した。

ところが、実際に h2o.conf で `TLS_AES_128_GCM_SHA256` を落としてみたところ、h2o の使っている quicly が `SIGSEGV` してしまった。

QUIC の方では、Initial Packet の保護に `AES_128` が使われることが明示されている。

> Initial packets use AEAD_AES_128_GCM
> with keys derived from the Destination Connection ID field
> of the first Initial packet sent by the client;
>
> --- https://www.rfc-editor.org/info/rfc9001/#section-5

しかし、これは Initial Packet のみの話であり、後続の TLS ネゴシエーションで Cipher Suite とは関係ないはずだ。

ところが、quicly は Initial Packet 保護に必要なアルゴリズムも、h2o.conf に指定した Cipher Suite の一覧から探し、見つからなくて落ちているように見える。

やっていることが尖りすぎているため、悪いのはどちらかというと難しいところだが、想定していたとしたら `SIGSEGV` で落ちていることは無いと思うため、後で問題を整理してレポートしたい。いずれにせよ現状 h2o では QUIC の AES-128 を落とすことはできない。

ところが、h2o では QUIC かどうかで設定を変えることができる。そこで、QUIC では AES-128 を残し、Initial 以降では他の Suite を優先する。TCP (H/1.1, H/2 etc) では AES-128 を落とす。加えて `cipher-preference: server` を追加し、Server 側の優先順位で選択する。この指定に落ち着いている。


## no Pre-Quantum Key Exchange

鍵交換についても、同様に耐量子性をもつものを用いるのが望ましいだろう。

NSA CNSA 2.0 では鍵交換は NIST にも採用された ML-KEM の利用を規定している。

> ML-KEM-1024 for all classification levels.
>
> --- https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSI_CNSA_2.0_FAQ_.PDF

picotls は、OpenSSL 3.5 以上を使ってビルドすると、以下の ML-KEM をサポートできる。

- mlkem512
- mlkem768
- mlkem1024

CNSA をとるのであれば、選ぶべきは `mlkem1024` 一択となる。ところが純粋な ML-KEM を実装するブラウザはなく、基本はハイブリッド方式を選択している。

- X25519MLKEM768
- secp256r1mlkem768
- secp384r1mlkem1024

これらについては、「ML-KEM がもし破られた場合、単体ではフォールバックがない」とした視点で使われている。ML-KEM の実績の少ない現時点で、単体でも安全なのかどうかの議論が続いていることが原因だ。

現状多くのブラウザは `X25519MLKEM768` を採用し、純粋な ML-KEM が実装されるのは先になりそうだ。そこで、ハイブリッド方式と純粋な ML-KEM を両方サポートしておくことにした。

問題は、TLS/1.3 で MUST となっている `secp256r1` と SHOULD な `x25519` だ。

> A TLS-compliant application MUST support key exchange with secp256r1 (NIST P-256)
> and SHOULD support key exchange with X25519 [RFC7748].
>
> --- https://www.rfc-editor.org/rfc/rfc9846.html#section-9.1

ところが、これも共通鍵暗号同様、疎通のための規定であり、危殆化した場合はプロファイルによる上書きが許可されている。

`x25519` だけを落とすことも考えたが、やはりここは実験として `secp256r1` も含め両方とも外してみることにした。

モダンなブラウザであれば、しばらくは `X25519MLKEM768` での接続が大半となるだろう。

これで、量子コンピュータが攻撃者の手にわたっても、どんな Show Note を見ているかを覗かれる心配が無くなる。


## no TCP

そうすると、今度は UDP のみにしたらどうなるだろう?という興味が出てくる。つまり ufw で TCP を落としてしまう方法だ。

必然的に QUIC しか通らなくなるため、H/3 が前提となる。

しかし、この設定を https://mozaic.fm 全体に指定すると、いよいよ自分でも環境の確認が難しくなってしまうことが判明した。

そこで、後日解説する https://wiki.mozaic.fm という新設のドメインを、最初から UDP のみにすることにした。

もしここが塞がれている環境では Wiki を見ることはできないが、H/2 が通ればとりあえず https://mozaic.fm は開く状態だ。


## no HTTP/1.1

TCP を閉じた wiki.mozaic.fm は、基本的に QUIC しか通らない。すると H/2 と H/1.1 は疎通できる隙はない。

そこで HTTPS RR の中で、`alpn="h3" no-default-alpn` とし、H3 のみを告知、H/2 は告知せず、Default ALPN である http/1.1 は落とすというアドバタイズが妥当に思える。

ところが、`no-default-alpn` があると Chrome で接続ができなくなる。これは、Chrome が、`no-default-alpn` の指定された HTTPS RR 全体を無視するためだ。

> To ensure consistency of behavior,
> clients MAY reject the entire SVCB RRset
> and fall back to basic connection establishment
> if all of the compatible RRs indicate "no-default-alpn",
> even if connection could have succeeded using a non-default ALPN protocol.
>
> --- https://www.rfc-editor.org/rfc/rfc9460.html#section-7.1.2

つまり、Chrome の現在の実装は `no-default-alpn` を見ると、全部のアドバタイズを捨てて、安全であろう TCP にフォールバックするという、MAY の保守的な実装になっている。結果、TCP にフォールバックし、TCP を塞いだ wiki.mozaic.fm では接続が確立できなくなったのだ。

ここまで来ると、尖りすぎて Chrome も置き去りにしてしまうため、流石にもう接続できる人がいなくなる。そこで、`no-default-alpn` はあきらめることにした。

```
alpn="h3" ech="..." ipv6hint="..."
```

つまり HTTP/1.1 は暗黙的に広告されるが、実際には接続できない状態となる。


## no plain SNI

HTTP のペイロードが暗号化されても、その手前には TLS のハンドシェイクが残っている。

特に Client Hello にある SNI をみれば、どのドメインに接続しているのかはわかってしまう。

そこで、Encrypted Client Hello (ECH) を導入し、HTTPS RR に対して公開鍵を提供すれば、SNI を盗聴されることはなくなる。

例えば、Cloudflare でこの設定を行えば、以下のように Cloudflare を経由しているという Public Name だけが露出し、裏にある何万もの Origin (Anonymity Set) のどれにフォワードされるかはわからないという構成が取れるのだ。

```
public-name=cloudflare-ech.com
```

ところが、`:80` を閉じたり、TCP を閉じたりしている、真っ当ではない mozaic.fm は、もはや Cloudflare Workers などにデプロイしたり、Cloudflare でプロキシすることはできない。

そこで、mozaic.fm を Public Name として、自前で ECH をホストすることにした。

```
public-name=mozaic.fm, config-id=11
```

対応するブラウザは、この鍵を使い SNI を含めて最初のペイロードから暗号化できるため、パケットを盗聴されても `public-name` しか見ることができない。

したがって、同じ Public Name の裏にある `wiki.mozaic.fm` や `vtt.mozaic.fm` などの、どれに接続しているかはわからなくなるのだ。

また、政府が `wiki.mozaic.fm` を有害 Wiki 指定して SNI をブロックするように ISP に要請しても、ブロックを迂回できることが期待される。

(実は IPv4 を落とすために、ホストごとに IPv6 を振ったので、パケットを見れば接続先はわかるが。)


## Outro

mozaic.fm は、Web 技術について議論する Podcast であり、最新の技術の動向について、常に注視している。

ただ、注視するだけでなく、それを実践する場として https://mozaic.fm を使っているが、今回の刷新で、これまで試せていなかった様々な技術を試すことができた。

こうした実験場所を持っていると、プロダクションでは決してできないデプロイを試し、「理論上はあり得るが、実践したことがない」ことを実践できる。

結果この mozaic.fm は、おそらく世界でも有数の尖ったデプロイで、それゆえに接続が非常に難しくなった。

しかし、Podcast は Podcast アプリで聞く人がほとんどなので、Podcast アプリが必要とする feed, mp3, artwork については、従来通り配信しているため、視聴には問題ない。

次回は、UI の刷新について紹介する。