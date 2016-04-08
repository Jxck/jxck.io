# [hpkp][security] Public Key Pinning for HTTP 対応と report-uri.io でのレポート収集

## Intro

本サイトにて Public Key Pinning for HTTP を有効化した。

[CSP](https://blog.jxck.io/entries/2016-03-30/content-security-policy.html) 同様、まずは Report-Only を設定し、
HPKP Report についても、 [report-uri.io](https://report-uri.io) を用いて収集することにした。

導入に必要な設定や、注意点についてまとめる。

また、本サイトへの導入はあくまで **実験** である。運用や影響も踏まえると、一般サービスへの安易な導入は推奨しない。


## Public Key Pinning

### モチベーション

Public Key Pinning for HTTP(HPKP) とは、証明書の信頼性を向上させる仕組みである。

- [RFC 7469 - Public Key Pinning Extension for HTTP](https://tools.ietf.org/html/rfc7469)


本サイトは HTTPS を提供しており、証明書は証明機関(CA)より有料のワイルドカード証明書を購入して設定している。(Let's Encrypt ではない)

本ドメインの証明書の有効性は、この CA によって担保されており、この CA の信頼性は各デバイスにプリインストールされた CA の証明書(およびそこまでのチェーン)で担保されている。

つまり、この仕組み(PKI) は、デバイスが CA を信用していることが土台となっているため、例えば CA が危殆化するなどのインシデントが発生すると、基盤そのものが揺らいでしまう。

例えば CA が攻撃され、偽の証明書が発行された場合、ユーザはその証明書が CA から発行された本物にしか見えないため、接続先が偽サイトだとしても信用してしまう。

仕組み上 CA の危殆化はあってはならない訳だが、証明書の価値が高まりつつあり、一方で多くの認証局が運用されている今、一部の CA では実際に攻撃による偽の証明書発行が発生している。

TODO:link

そこで、このリスクを低減するために使われるのが HPKP である。


### Public Key Pinning for HTTP

Public Key Pinning は、例えば本サイト `jxck.io` の証明書については、管理者である筆者が把握している。

そこで、この証明書のハッシュを HTTP ヘッダに付与することで、ブラウザに保存させる。

ユーザが HTTPS 接続を確率する際に、取得した証明書のハッシュと、このヘッダのハッシュを比較することで、サーバが提示した証明書が筆者の把握している証明書と違うもの、つまり偽物であることを検出する。

偽物が検出された際は、ブラウザがその旨をレポートとして生成し、送信することで管理者に通知する。

これによって、筆者も自分のサービスの証明書が偽造されている事実を把握することができる。

近年発覚している CA への攻撃による偽証明書の発行は、ほとんどがこの仕組みによって発覚している。


### Preload Public Key Pinning

HTTP レスポンスヘッダでハッシュを提示する方法では、 最初のアクセス時から偽の証明書が使われていた場合は無力である。

あくまで、再訪問時への偽造にしか効果がなく、これを **Trust on First Use (TOFU)** という。

そこで、ブラウザにあらかじめ証明書のハッシュを登録する Preload  Publick Key Pinning もあるが、これは非常に重要なドメインにのみ提供されており、現状一般に向けた登録フローは公開されていない。

Chrome と Firefox への Preload Pins のリストは以下である。

- [[chrome] Contents of /trunk/src/net/http/transport_security_state_static.json](https://src.chromium.org/viewvc/chrome/trunk/src/net/http/transport_security_state_static.json)
- [mozilla-central mozilla/security/manager/tools/PreloadedHPKPins.json](http://mxr.mozilla.org/mozilla-central/source/security/manager/tools/PreloadedHPKPins.json)

従って本サイトでは、 HTTP ヘッダでの対応を実施する。


## HPKP の設定

HPKP を有効にするには、 Public-Key-Pins ヘッダを付与し、その引数にハッシュを指定する。

```
Public-Key-Pins: pin-sha256="base64=="; max-age=expireTime [; includeSubdomains][; report-uri="reportURI"]
```

設定については、以下が参考になる。

[Public Key Pinning - Web セキュリティ | MDN](https://developer.mozilla.org/ja/docs/Web/Security/Public_Key_Pinning)


基本的には後述する方法で取得した証明書のハッシュである Subject Public Key Information(SPKI) の Base64 と、ブラウザに保持する期限、検証に失敗した場合のレポート送信先を指定する。


## 中間証明書の Pin

Github は現在 HPKP を運用しているため、 Pin の値を調べてみた。

Github では、 Leaf (github.com 自体の証明書) ではなく、そこから Root CA までの証明書チェインに入っている、中間証明書を Pin として設定していた。

OpenSSL の `-showcerts` コマンドを用いて、 Github の証明書を取得し、 Pin を計算してみる。
(証明書が二つ見えるので、その二つ目がそれにあたる)

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


### Subject Public Key Information (SPKI)

openssl コマンドを用いると、公開鍵から SPKI の Base64 エンコードまで一括で行える。
手元に、 Key, CSR, CRT のいずれかがあればそれを用いることができ、 Web 経由で取得した公開鍵からも生成できる。

管理者がローカルで行うなら、何かあっても一番害のない CSR からの生成がよさそうに考える。

```sh
$ openssl req -in my-signing-request.csr -pubkey -noout | openssl rsa -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64
```

また Web 経由で取得できる公開鍵を使うこともできる。


```sh
openssl s_client -servername www.example.com -connect www.example.com:443 | openssl x509 -pubkey -noout | openssl rsa -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64
```

実際に Github が hpkp に対応しているため、その値を取って比較してみる。




---

https://projects.dm.id.lv/Public-Key-Pins_test
https://projects.dm.id.lv/Public-Key-Pins_calculator
https://jp.globalsign.com/blog/2013/certificate_public_key_pinning.html
https://developers.google.com/web/updates/2015/09/HPKP-reporting-with-chrome-46


## CSP の注意点

もし、先ほど例示した設定をサイト全体に適用した場合、何がおこるかを考えてみる。

```
Content-Security-Policy: default-src 'self'
```

まず、この指定により、インラインスクリプトが全て無効になる。
よくある例として、 Google Analytics のためページ下部に埋め込んだ `<script>` が全て動かなくなるため、アナリティクスが動かなくなる。

他にも、例えば `cdn.jquery.com` などの Public CDN から取得しているスクリプトも軒並み動かなくなる。

スクリプトだけでなく、 `<img>` や `<iframe>` なども注意が必要だ。

特にアド(広告)を貼っている場合は、そのアドは表示されなくなる可能性が高い。

同じオリジンから配布している JS でも、内部で `eval()` を実行している箇所や、 XHR, WebSocket で別オリジンに接続している箇所は、ポリシー違反になる場合もある。

とにかく、ある程度外部のリソースへリンクしているコンテンツにとっては、前述の制約はかなり厳しいものである。

よって、ここに対してホワイトリストで、信頼するドメインの追加や、幾つかの挙動を例外的に許可する設定を足していくことになる。


## Report Only

脆弱性がなくても、コンテンツの挙動が少しでもポリシーに触れると、そのページが正常に動作しなくなる可能性がある。

従って、いきなりポリシーを有効にするのはかなり難しいと思われる。

そこで、移行手段として Content-Security-Policy-Report-Only を利用することができる。

これは、ポリシー違反があった場合、レポートだけを送信し、コンテンツの挙動を一切ブロックしないというものである。

以下のように、ポリシーに `report-uri` ディレクティブでレポート先 uri を指定する。

```
Content-Security-Policy-Report-Only: default-src 'self'; report-uri http://example.com/csp-report
```

これによって、ポリシー違反があってもコンテンツをブロックしないため、サイトへの影響はほぼ無くなる。

まずはこの指定でレポートを収集しながら、影響範囲を把握しポリシーとコンテンツを徐々に改善することができる。

修正が完了し、レポートが落ち着いたら Content-Security-Policy に移行するフローが導入しやすいだろう。


## report-uri.io

ブラウザは、 CSP に違反した実行を検出した場合、違反レポートを生成し `report-uri` に指定した URI に対して自動的に送信する。

CSP の違反レポートは以下のような JSON データである。


```json
{
    "csp-report": {
        "document-uri": "https://www.jxck.io/",
        "violated-directive": "default-src 'self'",
        "effective-directive": "img-src",
        "original-policy": "default-src 'self';",
        "blocked-uri": "https://www.google-analytics.com",
        "status-code": 0
    }
}
```

このレポートは、 Google Analytics の実行がポリシーのホワイトリストに含まれていないことによって発生している。

こうしたレポートにより、どのページの、どの実行が、どのポリシーに違反したかなどが取得できる。


このレポートの収集と解析を行うサービスとして、 report-uri.io というサービスが最近登場した。

[Welcome to report-uri.io](http://report-uri.io/)


登録し、発行された URI を `report-uri` に指定するだけなので、導入は非常に楽である。

ダッシュボードでは、レポートの分析や、ポリシーディレクティブの生成のサポートまで行ってくれるようである。


## 懸念点

本サイトのコンテンツは、全て筆者の管理下にあるため、影響の把握はそこまで難しくはない。

外部コンテンツの取得についても、取得方法の変更や、本サイトオリジンからの配布に変更するなど、対応は不可能ではないだろう。

アドや外部タグの導入も多くはないため、あまり問題はないだろうと思われる。


一番懸念しているのは、例えば本サイト購読者の、ブラウザ拡張やブックマークレットなどへの影響である。

本サイトは技術ブログであるため、購読者もそうしたツールを利用する技術者である可能性が非常に高く、これが問題になるのかどうかは興味がある。

レポートなどを通してそうした事実がわかれば、追って報告したい。


## 本サイトでの適用

本サイトでも、まずは Report-Only をサイト全体に適用し、 report-uri.io にてレポートを収集することにした。

一通りエラーを見て回ったところ、以下の点で修正が必要だった。

- *.jxck.io 間でコンテンツをリンクしている
- AMP のカスタムタグを CDN より読み込んでいる
- AMP のカスタムタグがインラインスタイルを使用していた
- YouTube の動画を `<iframe>` で埋め込んでいる
- Google Analytics を設定している
- 一部インラインスクリプト、インラインスタイルを使用していた


基本的には、必要なオリジンをホワイトリストに追加し、インラインスタイル、インラインスクリプトは外部化した。

しかし、 AMP のカスタムタグがインラインスタイルを使用している部分は、手を入れることができない。

かといって、全体としてスタイルに `'unsafe-inline'` を許容するのもはばかられたため、 AMP ページのみスタイルの `'unsafe-inline'` を許可した。

よって、通常のページと AMP 対応ページでは以下の出し分けをしている。

```
# normal page
content-security-policy-report-only: default-src 'self' https://*.jxck.io https://www.google-analytics.com ; child-src https://www.youtube.com ; report-uri https://xxx.report-uri.io/r/default/csp/reportOnly

# amp page
content-security-policy-report-only: default-src 'self' https://*.jxck.io https://www.google-analytics.com https://cdn.ampproject.org ; style-src 'unsafe-inline' ; report-uri https://xxx.report-uri.io/r/default/csp/reportOnly
```

今後も収集したポリシーを解析、それを元にコンテンツやポリシーの修正を実施し、ある程度影響が見えてから実際の CSP の適用を再検討したいと考えている。
