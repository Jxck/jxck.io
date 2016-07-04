# [hpkp][security] Public Key Pinning for HTTP(HPKP) 対応と report-uri.io でのレポート収集

## Intro

本サイトにて Public Key Pinning for HTTP を有効化した。

[CSP](https://blog.jxck.io/entries/2016-03-30/content-security-policy.html) 同様、まずは Report-Only を設定し、
HPKP Report についても、 [report-uri.io](https://report-uri.io) を用いて収集することにした。

導入に必要な設定や、注意点についてまとめる。

なお、本サイトへの導入はあくまで **実験** である。運用や影響も踏まえると、一般サービスへの安易な導入は推奨しない。

また、本来は HSTS と併用することが推奨されている。(必須ではない)
そちらも追って対応する予定である。


## Public Key Pinning

### 概要

Public Key Pinning for HTTP(HPKP) とは、証明書の信頼性を向上させる仕組みである。

- [RFC 7469 - Public Key Pinning Extension for HTTP](https://tools.ietf.org/html/rfc7469)


本サイトは HTTPS を提供しており、証明書は証明機関(CA)より有料のワイルドカード証明書を購入して設定している。(Let's Encrypt ではない)

本ドメインの証明書の有効性は、この CA によって担保されており、この CA の信頼性は各デバイスにプリインストールされた CA の証明書(およびそこまでのチェイン)で担保されている。

この仕組み(PKI) は、デバイスが CA を信用していることが土台となっているため、たとえば CA が危殆化するなどのインシデントが発生すると、基盤そのものが揺らぐことを意味する。

もし CA が攻撃され、偽の証明書が発行された場合、ユーザはその証明書が CA から発行された本物にしか見えないため、接続先が偽サイトだとしても信用してしまう。

仕組み上 CA の危殆化はあってはならない訳だが、証明書の価値が高まりつつあり、一方で多くの認証局が運用されている今、一部の CA では実際に攻撃による偽の証明書発行が発生している。

- [Pinning 年表](https://jp.globalsign.com/blog/2013/certificate_public_key_pinning.html) 参照
- [1. 不正なSSL証明書の脅威](http://d.hatena.ne.jp/jovi0608/20140902/1409635279) 参照

そこで、このリスクを低減するために考案されたのが HPKP である。


### Public Key Pinning for HTTP

本サイト `jxck.io` の証明書については、管理者である筆者が把握している。

この証明書のハッシュを HTTP ヘッダに付与することで、ブラウザに保存させる。

ユーザが HTTPS 接続を確立する際に、取得した証明書のハッシュと、このヘッダのハッシュを比較することで、サーバの提示した証明書が筆者の把握している証明書と同じであることを検査する。

偽物が検出された際は、不正な証明書が発行されている可能性があるため、ブラウザはアクセスをブロックする。

実際に HPKP で違反が発生した場合の挙動は以下で試すことができる。

[pinningtest.appspot.com](https://pinningtest.appspot.com/)


また、違反を発見した場合、ブラウザはその旨をレポートとして生成し、送信することで管理者に通知する。

これによって、筆者は自分のサービスの証明書が偽造されている事実を把握することができる。

この仕組みは、近年発生している CA への攻撃による偽証明書の発行の発見に、大きく貢献している。


### Preload Public Key Pinning

HTTP レスポンスヘッダでハッシュを提示する方法では、 最初のアクセス時から偽の証明書が使われていた場合は無力である。

あくまで、再訪問時への偽造にしか効果がなく、これを **Trust on First Use (TOFU)** という。

そこで、ブラウザにあらかじめ証明書のハッシュを登録する Preload Publick Key Pinning もある。

ただし、これは非常に重要なドメインにのみ提供されており、現状一般に向けた登録フローは公開されていない。

Chrome と Firefox への Preload Pins のリストは以下である。

- [[chrome] Contents of /trunk/src/net/http/transport_security_state_static.json](https://src.chromium.org/viewvc/chrome/trunk/src/net/http/transport_security_state_static.json)
- [mozilla-central mozilla/security/manager/tools/PreloadedHPKPins.json](http://mxr.mozilla.org/mozilla-central/source/security/manager/tools/PreloadedHPKPins.json)

したがって本サイトでは、 HTTP ヘッダでの対応を実施する。


## HPKP の設定

### Public-Key-Pins ヘッダ

HPKP を有効化するには、 Public-Key-Pins ヘッダを付与し、その引数にハッシュを指定する。

```
Public-Key-Pins: pin-sha256="base64=="; max-age=expireTime [; includeSubdomains][; report-uri="reportURI"]
```

設定については、以下が参考になる。

[Public Key Pinning - Web セキュリティ \| MDN](https://developer.mozilla.org/ja/docs/Web/Security/Public_Key_Pinning)


基本的には後述する方法で取得した証明書のハッシュである Subject Public Key Information(SPKI) の Base64 と、ブラウザに保持する期限、検証に失敗した場合のレポート送信先を指定する。

現時点では sha256 のみがアルゴリズムとして認められているが、これは将来拡張される可能性がある。

Pin を設定する際は、現在有効な Pin 以外に、バックアップ Pin の登録が必須になっている。

これは、有効な Pin をひとつしか登録しない場合、証明書の危殆化や期限切れなどで、証明書を新しく更新すると必ず不一致が起こってしまうためである。


### Subject Public Key Information (SPKI)

Pin の値は openssl コマンドを用いれば、公開鍵から SPKI の Base64 エンコードまで一括で行える。

手元に、 Key, CSR, CRT のいずれかがあればそれを用いることができ、 Web 経由で取得した公開鍵からも生成できる。

管理者がローカルで行うなら、何かあっても一番害のない CSR からの生成がよさそうと考える。


```sh
$ openssl req -in my-signing-request.csr -pubkey -noout | openssl rsa -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64
```


## report-uri.io

ブラウザは、  Pin に一致しない証明書を検出した場合、違反レポートを生成し `report-uri` に指定した URI に対して自動的に送信する。

HPKP の違反レポートは次のような JSON データである。

```json
{
    "date-time": "2014-04-06T13:00:50Z",
    "hostname": "www.example.com",
    "port": 443,
    "effective-expiration-date": "2014-05-01T12:40:50Z",
    "include-subdomains": false,
    "served-certificate-chain": [
      "-----BEGIN CERTIFICATE-----\n
      MIIEBDCCAuygAwIBAgIDAjppMA0GCSqGSIb3DQEBBQUAMEIxCzAJBgNVBAYTAlVT\n
      ...
      HFa9llF7b1cq26KqltyMdMKVvvBulRP/F/A8rLIQjcxz++iPAsbw+zOzlTvjwsto\n
      WHPbqCRiOwY1nQ2pM714A5AuTHhdUDqB1O6gyHA43LL5Z/qHQF1hwFGPa4NrzQU6\n
      yuGnBXj8ytqU0CwIPX4WecigUCAkVDNx\n
      -----END CERTIFICATE-----",
      ...
    ],
    "validated-certificate-chain": [
      "-----BEGIN CERTIFICATE-----\n
      MIIEBDCCAuygAwIBAgIDAjppMA0GCSqGSIb3DQEBBQUAMEIxCzAJBgNVBAYTAlVT\n
      ...
      HFa9llF7b1cq26KqltyMdMKVvvBulRP/F/A8rLIQjcxz++iPAsbw+zOzlTvjwsto\n
      WHPbqCRiOwY1nQ2pM714A5AuTHhdUDqB1O6gyHA43LL5Z/qHQF1hwFGPa4NrzQU6\n
      yuGnBXj8ytqU0CwIPX4WecigUCAkVDNx\n
      -----END CERTIFICATE-----",
      ...
    ],
    "known-pins": [
      "pin-sha256=\"d6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM=\"",
      "pin-sha256=\"E9CZ9INDbd+2eRQozYqqbQ2yXLVKB9+xcprMF+44U1g=\""
    ]
  }
```


## 懸念点

### 証明書更新と Max-Age

HPKP の運用での一番の懸念は、証明書の更新だろう。

たとえば今回は、現行の Pin(Pin1 とする)に加えてバックアップ Pin(Pin2 とする) をひとつ登録したため、このバックアップ Pin2 にあたる証明書への更新までは問題ないだろう。

しかし、問題はそのあとどうするかである。(その後更新する新しい証明書の Pin を Pin3, 4... とする)

ブラウザが `[Pin1, Pin2]` を保存した状態なら、 Pin2 の証明書に更新されてもバックアップが効いているため問題はない。

次に証明書を Pin3 のものへ更新した時がポイントとなるだろう。

これは `[Pin1, Pin2]` を保存したまま、その後しばらく訪れず、 Pin3 の証明書に更新されてから訪れたら、持っている Pin と証明書がマッチせず接続できなくなるためである。

つまり、 Pin3 を運用する際には、必ず `[Pin1, Pin2]` の組はブラウザから Expire されている必要がある。

しかし、それを恐れて Pin の Max-Age を短くしすぎると、アクセスするたびに Pin が無効にな状態となり、 TOFU であるこのプロトコルを生かしきれない。

Report-Only でない運用では、接続ができないという状態になるため、サービスへの影響も大きくなる。

それを踏まえてか、次のような中間証明書を Pin 留めするという運用もあるようなので、紹介する。


### 中間証明書の Pin

Github は現在 HPKP を運用しているため、 Pin の値を調べてみた。

Github では、 Leaf (`github.com` 自体の証明書) ではなく、そこから Root CA までの証明書チェインに入っている、中間証明書を Pin として設定していた。

OpenSSL の `-showcerts` コマンドを用いて、 Github の証明書を取得し Pin を計算してみる。

(証明書がふたつあり、中間証明書にあたるふたつ目だけ抜き出している)

```sh
# github.com pins Intermediate Certificate
# so add `-showcerts` option for first openssl
# and extract second CERTIFICATE with ruby
echo '---- EXPECTED ----'
openssl s_client -servername github.com -connect github.com:443 -showcerts 2>/dev/null \
  | ruby -nle 'puts $_.scan(/-----BEGIN CERTIFICATE-----.*?-----END CERTIFICATE-----/m)[1]' \
  | openssl x509 -pubkey -noout 2>/dev/null \
  | openssl rsa -pubin -outform der 2>/dev/null \
  | openssl dgst -sha256 -binary 2>/dev/null \
  | openssl enc -base64 2>/dev/null
```

実際に `Public-Key-Pins` ヘッダを見てみる。この中にはバックアップを含めいくつか登録されているが、その中に上で計算したものが入っている。

```sh
# get the actual Public-Key-Pins headre
# this will include hash calculated above
echo '---- ACTUAL ----'
curl -sI https://github.com | grep Public-Key-Pins | ruby -nle 'puts $_.gsub(";", "\n")'
```

Leaf の証明書を Pin 留めしてしまうと、前述のとおり証明書の更新で Pin との不整合が起きた場合に、接続できなくなってしまう。

このリスクを減らすために、中間証明書を Pin 留めするという運用になっている模様である。

([@jovi0608](https://twitter.com/jovi0608) さんにアドバイス頂きました、ありがとうございます。)


## 本サイトでの適用

### Pin

まず現在の証明書から、現行の Pin を生成しそれを指定する。

本サイトでは、 2 年ごとに更新するワイルドカード証明書を購入して使用している。

つまり、全サブドメインで証明書はひとつであり、期限も長いので、運用はそこまで難しくないだろうと考えている。

バックアップ Pin としては、未来の(次の更新で使用する)証明書用の鍵を先にひとつ用意しておき、そこからバックアップ用 Pin を生成することにした。

`report-uri` には CSP 同様 [report-uri.io](https://report-uri.io) を設定する。

そしてこれを [jxck.io](https://jxck.io) と [blog.jxck.io](https://blog.jxck.io) に設定した。

今回はあくまで実験であるため、 CSP 同様に Report-Only での運用とする。


デモとして、 Report-Only 無しのヘッダを指定したページを次に用意した。

[Public Key Pinning DEMO \| labs.jxck.io](https://labs.jxck.io/public-key-pinning/)

HPKP が有効になっていることは、 [chrome://net-internals/#hsts](chrome://net-internals/#hsts) で確認できる。しかし Report-Only ではここに上がらないようである。


### 結果

生成したヘッダは以下である。
max-age は、とりあえず 3600s と短い値から始めることにした。

```
Public-Key-Pins:
  max-age=3600;
  pin-sha256="7JT7NhX2St/VBBkRi4BO427M7ytLy7p3CRYPtHpSm7c=";
  pin-sha256="+WpRHNpAId2FIOvVgwmS3HsG+eJtERKC4/qM1tQaeRk=";
  report-uri="https://4887c342aec2b444c655987aa8b0d5cb.report-uri.io/r/default/hpkp/enforce"
```

Report-Only は、 `max-age` が不要になる。また report-uri.io では、 Report-Only 用に URI が変わるので、それを設定している。

```
Public-Key-Pins-Report-Only:
  pin-sha256="7JT7NhX2St/VBBkRi4BO427M7ytLy7p3CRYPtHpSm7c=";
  pin-sha256="+WpRHNpAId2FIOvVgwmS3HsG+eJtERKC4/qM1tQaeRk=";
  report-uri="https://4887c342aec2b444c655987aa8b0d5cb.report-uri.io/r/default/hpkp/reportOnly"
```

意図的にレポートを上げて見てみたかったが、単に不正な証明書を用意するだけではだめだった。
どうやったら、正しく HPKP 違反ができるのか、自前で CA を立てるなどする必要があるのかもしれない。

ということで CSP と違い、よほどのことがない限りレポートは上がらないはずであると考える。

もしレポートが上がった場合、結構な問題が発生している可能性もあるので、必要に応じて追記や報告をしたい。
