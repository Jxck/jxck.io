# [webpackaging][signed-http-exchange] WebPackaging の Signed HTTP Exchanges


## Intro

[WebPackaging](https://github.com/WICG/webpackage) は以下の 3 つの仕様を組み合わせたユースケースである。

- [Signed HTTP Exchanges](https://tools.ietf.org/html/draft-yasskin-http-origin-signed-responses-04): Signing (コンテンツに署名する)
- [Bundled HTTP Exchanges](https://tools.ietf.org/html/draft-yasskin-wpack-bundled-exchanges-00): Bundling (コンテンツを 1 つにまとめる)
- [Loading Signed Exchanges](https://wicg.github.io/webpackage/loading.html): Loading (そのコンテンツをロードする)

本エントリでは、各仕様を Signing/Bundling/Loading と記す。

現状、 Signing および Loading の仕様策定が進んでおり、 Chrome は Experimental な実装を行っている。

全体的に仕様が大きく、今後も変更される可能性が高いため、今回は実装が進んでいる Signing に絞り、ユースケース、仕様、および本ブログへの適用を中心に解説する。


## Signing (Signed HTTP Exchanges)

Signing は、簡単に言えば Web コンテンツに署名を行う仕様である。

今回は対象として mozaic.fm ドメインにある以下のコンテンツについて考える。

- https://mozaic.fm/index.html

mozaic.fm の管理者は、保有する秘密鍵を用いて、このコンテンツの Request/Response に対して署名をする。

単にファイルを署名するのではなく、 Request/Response が対象であるため、 Method/URL/Status/Header なども含まれる点が重要だ。

署名した結果 `mozaicfm-index.sxg` というファイルを生成する。

一般的に電子署名の効果は、「否認」「改ざん」「なりすまし」などへの耐性であり、それは Signing においても同様だ。

一度署名すれば、コンテンツの所有者が mozaic.fm であり、誰かが成りすまして作ったものではなく、署名以降改ざんされていない、ということが保証される。

この署名をコンテンツに対して行う一連の流れが Signing の仕様だ。


## Bundling (Bundled HTTP Exchanges)

Siging は、単一の Request/Response に対する署名を行う。

つまり index.html に署名をしても、そこに読み込まれる JS や CSS といったサブリソースは含まれない。

そこで署名の前に、サブリソースなどを 1 つにまとめる仕様が Bundling だ。

Bundling は、もう少し仕様と実装が進んだら改めて解説したい。


## Loading (Loading HTTP Exchanges)

次に jxck.io ドメインには CDN 機能があるとし、先の署名した sxg ファイルをここから配信したとする。

- https://cdn.jxck.io/mozaicfm-index.sxg

通常、この URL を fetch したブラウザは、 Origin を `https://cdn.jxck.io` として扱う。

仮に、このファイルがそのまま表示できるとすれば、 URL バーにはこのアドレスが表示されるだろう。

しかし、このファイルは Response URL 情報を含み、署名されている。

署名を検証することで、内容が改ざんされていないことが保証できるため、ブラウザはこのコンテンツを mozaic.fm から取得したかのように扱うことができる。

具体的には URL バーに、オリジナルの URL である以下を表示できる。

- https://mozaic.fm/index.html

Signing で署名された sxg を読み込んだブラウザが、署名を確認しこのように挙動する流れが Loading の仕様だ。


## Physical / Logical URL

Signing(Signed HTTP Exchange) によって起こる大きな変化は、 Logical URL と Physical URL の分離である。

(この名前は、最近では inner/outer URL と呼ばれてもいるようだが、その辺ははっきりしないので、本エントリでは Logical/Physical を採用する)

先の例で言えば、以下のようになる。

- Logical URL: https://mozaic.fm/index.html
- Physical URL: https://cdn.jxck.io/mozaicfm-index.sxg

実際に mozaic.fm のオリジンサーバから取得したわけではないが、署名によってそのように扱うことができる。

展開される Origin は mozaic.fm のものになり、ここから遷移する際に付与される Referer や Origin ヘッダも全て mozaic.fm になる。

![signed http exchange 概観](signed-http-exchange.svg#748x561 "signed http exchange")


## Use Case

これにより可能になるユースケースを解説する。


### AMP Cache

AMP は、 Origin サーバにある AMP Valid なコンテンツを  AMP Cache に置き、そこから代理で配信する構成になっている。

構成はいわゆる CDN だが、あらゆるドメインを対象とするため、 Cache 自体は Google のドメインのままだ。したがってモバイルで Google 検索した結果 AMP コンテンツを取得した場合、 URL バーに表示されるのは Google の URL となる。

例えばこの記事の AMP 対応 URL は以下だが、 AMP キャッシュの URL は以下になる。

- https://blog.jxck.io/entries/2018-12-01/signed-http-exchanges.amp.html
- https://www.google.co.jp/amp/s/blog.jxck.io/entries/2018-12-01/signed-http-exchanges.amp.html

この挙動は、 AMP の仕組みを疑問視するユーザが指摘するポイントの 1 つだった。

- [AMP letter](http://ampletter.org/?lang=ja)

ここで AMP が Signed HTTP Exchange に対応すると、 Google 検索の結果 AMP キャッシュからコンテンツを取得しても、元の URL を URL バーに表示できる。

AMP チームはすでに WebPackaging への対応をかなり早い段階でアナウンスしている。

- [Developer Preview of better AMP URLs in Google Search - Accelerated Mobile Pages Project](https://amphtml.wordpress.com/2018/11/13/developer-preview-of-better-amp-urls-in-google-search/)

また、 Cloudflare は AMP Cache に対して sxg を提供する部分のサポートをアナウンスしている。

- [Real URLs for AMP Cached Content Using Cloudflare Workers](https://blog.cloudflare.com/real-urls-for-amp-cached-content-using-cloudflare-workers/)


### Subresource CDN

AMP キャッシュと同じことが、一般の CDN でも可能になる。

これまで CDN を入れる場合は Edge を同じドメインにするのが一般的だったが、 Edge がどのドメインであっても問題ない場合もでるだろう。

逆に考えると、自分のドメインから他ドメインのコンテンツを配信することも可能になる。

例えば、 bundle が一般化した今はわからないが、かつて jquery は自分のドメインからではなく CDN から取得する構成が推奨された。


```html
<script src=https://code.jquery.com/jquery-3.3.1.js></script>
```

この URL を使うと、もし他のサービスが同じ URL で取得しキャッシュしていれば、それがそのままキャッシュヒットするからである。

多くのサービスが同じ URL を使えば使うほど、そのメリットは増える。

もし jQuery が sxg を配布したら、そのファイルを自分のサーバから配布しつつ、 展開後の URL は同じになるため、キャッシュは同じになるということが可能になる。

ただし sxg への URL を src に書くと、取得する際にキャッシュが有ってもヒットされることができない。


```html
<script src=https://cdn.example.com/jquery-3.3.1.js.sxg></script>
<!-- これだと https://code.jquery.com/jquery-3.3.1.js のキャッシュがあってもヒットしない -->
```

そこで logicalsrc/physicalsrc を両方書く方法が提案されている。


```html
<script logicalsrc=https://code.jquery.com/jquery-3.3.1.js
        physicalsrc=https://cdn.example.com/jquery-3.3.1.js.sxg></script>
```

[A.2. Explicit use of a content distributor for subresources](https://tools.ietf.org/html/draft-yasskin-http-origin-signed-responses-04#appendix-A.2)


### Cross Origin Server Push

例えば index.html のレスポンスより前に jquery.js を HTTP2 Push する場合は、 jquery.js は同じ Origin からである必要があった。

しかし、内容の検証を sxg が担うため、 sxg を Push すれば jquery.js を jquery.com からの CORS Push として送ることが可能になる。

- HTTP2 Push に対応してない 3rd Party Contents を代理で Push する
- Origin が張った接続に 3rd Party コンテンツを相乗りする


### Subresource Integrity

Subresource Integrity (SRI) とは、 Subresouce が想定したものであることを確認し、改ざん等によって意図しないものに差し替えられることを防ぐ仕組みである。

以下は、 integrity 属性に jquery 全体の sha-256 ハッシュを含むことで、異なる jquery が実行されることを防ぐ。


```html
<script src=https://code.jquery.com/jquery-3.3.1.js
        integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="></script>
```

WebAppSec はこの SRI に、単なるハッシュではなく、署名を取り入れる方法について議論している。

- [mikewest/signature-based-sri: Signature-based Resource Loading Restrictions](https://github.com/mikewest/signature-based-sri)

これは、まさしく Signing がやっていることと類似している。

同様に、 TLS のような経路の暗号化だけでは足らず、コンテンツの完全性について保証が欲しい仕様で応用が可能になるだろう。


### Web Archive

[Internet Archive](https://web.archive.org/) や [Web 魚拓](https://megalodon.jp/) のように、クロールした結果を保存するサービスが存在する。

しかし、これらのサービスが保存しているコンテンツが、オリジナルのものから改ざんされていないことは保証できない(運営への信頼によって成り立っている)。

ここで、こうしたサービスが sxg を収集するようになれば、改ざんされていないことが検証可能になる。

もっと言えば、成りすましも否認も出来ないため、アーカイブされているものに対して「見に覚えがない」と白をきることもできなくなる。

こうして、アーカイブされたコンテンツの信頼性が担保できるようになると、利用の幅が広がるだろう。


### Local Sharing

CDN よりももっと積極的に、あらゆる場所でキャッシュすることが可能になる。

例えば、隣の端末が取得済みのコンテンツをローカルネットワークで転送したり、ダウンロードしておいたものをチャットで共有することも可能だ。。

並行して、署名の前に複数のコンテンツを束ねる bundling が実現すれば、例えば Offline 状態で隣の端末から bluetooth でもらった PWA をインストールするといった利用も想定されている。

(しかし、現時点では後述の理由により offline での利用は出来ない)

やりかたはいくらでも有るが、より積極的なキャッシュが可能になるというイメージだ。


## 導入方法

実際にコンテンツを署名し、別オリジンから配布して表示するまでの流れをまとめる。

Origin Trial 、拡張付き証明書、フラグつき起動の Chrome Canary など必要なため多少敷居が高いが、ここからもまだ仕様/実装ともに作業途中の技術であることがわかるだろう。

署名には、リファレンス実装として提供されている Go 製の以下のツールを利用する。

<https://github.com/WICG/webpackage/tree/master/go/signedexchange>


### 証明書

Signing には CanSignHttpExchanges 拡張を含む X.509 証明書が必要だ。

現状これを試すための選択肢は 3 つある

1. 現状 DigiCert のみが拡張に対応した証明書を発行するので、そこから購入する
2. 通常の証明書を利用し、 Chrome の <chrome://flags/#allow-sxg-certs-without-extension> を有効にする
3. 拡張を含む自己証明書を作成する

今回は DEMO 用に 3 を採用する。

まず、署名を行う mozaic.fm ドメイン用に、 CanSignHttpExchanges 拡張の入った自己証明書を以下のように作成する。


```shell
#! /bin/sh

# prime256v1 ecdsa の秘密鍵を生成
openssl ecparam -out priv.key -name prime256v1 -genkey

# 鍵に対する証明書のリクエストを作成、ドメインは mozaic.fm とする
openssl req -new -sha256 -key priv.key -out cert.csr -subj '/CN=mozaic.fm/O=Test/C=US'

# 拡張を指定した CSR を生成する
echo "1.3.6.1.4.1.11129.2.1.22 = ASN1:NULL\nsubjectAltName=DNS:mozaic.fm" > ext
openssl x509 -req -days 360 -in cert.csr -signkey priv.key -out cert.pem -extfile ext

# 証明書を生成する
openssl x509 -req -days 360 -in cert.csr -signkey priv.key -out cert.pem
```


### 証明書チェーン

Signing の検証に必要な証明書チェーンを生成する。

ファイルは CBOR 形式で、証明書チェーン、 OCSP 、 SCT を含む必要がある。

生成には、リファレンス実装の gen-certurl を使用する。

<https://github.com/WICG/webpackage/tree/master/go/signedexchange/cmd/gen-certurl>


```shell
#! /bin/sh

# gen-certurl の取得
go get -u github.com/WICG/webpackage/go/signedexchange/cmd/gen-certurl

# 本来は ocsp の指定が必要だが、自己証明書なので適当な値を指定する
# 正当な証明書ならば、指定しなければリクエストを投げて取得してくれる
echo "ocsp" > tmp
./bin/gen-certurl -pem cert.pem -ocsp tmp > cert.cbor
```

生成した cert.cbor は、 `Content-Type: application/cert-chain+cbor` で、 CDN から配布する必要がある。

ここでは、以下の URL から配布することとする。

<https://labs.jxck.io/webpackaging/signed-http-exchange-b2/cert.cbor>


## 検証データ

仕様上は、証明書の期限が切れていた場合に、証明書を再度取得し直すための Validity Data を生成し validity-url に置く必要がある。

しかし、まだツールには実装されておらず、 Chrome もこの値を見ていないようだ。

したがって、今回は適当な validity-url だけ決めて、 validity data の生成は飛ばす。

(ただし、ここの運用は色々考えて設計する必要がありそうに感じている)


### 署名

ここまでに用意した材料を用いて、コンテンツに署名する。

署名には、リファレンス実装の gen-signedexchange を使用する。

<https://github.com/WICG/webpackage/tree/master/go/signedexchange/cmd/gen-signedexchange>


```shell
#! /bin/sh

# gen-signedexchange の取得
go get -u github.com/WICG/webpackage/go/signedexchange/cmd/gen-signedexchange

# mozaic.fm/index.html を署名
./bin/gen-signedexchange \
  -uri         https://mozaic.fm/index.html \ # ブラウザが表示する URL
  -content     ../mozaic.fm/index.html \ # 対象コンテンツ
  -certificate cert.pem \ # 証明書
  -privateKey  priv.key \ # 秘密鍵
  -certUrl     https://labs.jxck.io/webpackaging/signed-http-exchange-b2/cert.cbor \ # 証明書チェーンの URL
  -validityUrl https://labs.jxck.io/webpackaging/signed-http-exchange-b2/validity-data \ # 検証用の URL
  -o           mozaic.sxg # 成果物
```

生成した mozaic.sxg は、 `Content-Type: application/signed-exchange;v=b2` で CDN から配布する。


### Experimental Features

現状 Chrome では、 sxg を表示するには 2 つの方法がある。

- Signed HTTP Exchange の Origin Trials に登録する
- Chrome の chrome://flags/#enable-signed-http-exchange を有効にする

つまり、 Origin Trials に登録し、正規の拡張付き証明書を使っていれば、 Chrome Canary などではそのまま表示できるだろう。

自己署名証明書の場合には、 Chrome にその証明書に関するエラーを無視させる必要がある。

cert.pem を以下のように base64 形式に変換し、それを `--ignore-certificate-errors-spki-list` に指定する。


```shell
# 証明書の base64 の生成
export BASE64 = openssl x509 -noout -pubkey -in cert.pem | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | base64

# Mac で Canary を起動する場合
open -a Google\ Chrome\ Canary --args --ignore-certificate-errors-spki-list=$BASE64
```


### DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/webpackaging/signed-http-exchange-b2/>

ただし

- 生成された sxg は expire している可能性があるため、時間が経つとアクセスしても表示できない
- 自己証明書であるため、遷移先に書かれたフラグをつけて Chrome を起動する必用がある
- Origin Trials には Opt-In している

まず遷移先のページは以下だ。

![sxg へ遷移する前のページ](1-index.png#748x457 "index page")

ページ下部のリンクから sxg に遷移する。

- https://labs.jxck.io/webpackaging/signed-http-exchange-b2/mozaic.sxg

このファイルに Origin-Trial Token を付与しており、 content-type は application/signed-exchange;v=b2 である。

![sxg のレスポンスヘッダ](2-sxg-response.png#748x457 "sxg response")

このファイルを展開したブラウザは、ファイルをパースし、必要な情報を取得する。

オリジナルの URL やコンテンツ、署名と証明書などが確認できる。

![sxg の署名部分の詳細](3-sxg-signing-detail.png#748x457 "sxg signing detail")

ここで取得した Certificate URL から証明書を取得する。

cbor は `application/cert-chain+cbor` で配布する。

![証明書チェインの詳細](4-cert-chain-cbor.png#748x457 "cert chain cbor")

これを用いて署名の検証が完了したら、ブラウザは Original の URL でコンテンツを表示する。

![Logical URL で表示された HTML](5-rendered-contents.png#748x457)

内部的には改めてリクエストが発生しているように見えるが、サーバにはリクエストは飛んでいない。

また、ブラウザの URL バーには mozaic.fm として表示されていることがわかる。

ただし、今回 Signing の対象は index.html だけであり、サブリソースは署名していない。したがって CSS や JS などは実際のサーバにリクエストが発生している。

これらを対象に含むには、サブリソース全体を bundling で 1 つにまとめ、その結果に signing で署名することになる。そちらは、いずれ実装が進んだら解説したい。


## Signed HTTP Exchange Format

Signed HTTP Exchange のフォーマットについて解説する。


### Request/Response

Signing の対象は、単にファイルに署名するのではなく、そのファイルの Request/Response 全体に対して署名を行う。

今回の場合は、 HTML の Body を含め以下の Request/Response が対象となる。


```http
GET /index.html HTTP/1.1
Host: mozaic.fm


HTTP/1.1 200
Digest: mi-sha256-03=QoknwRIxGYJmcmv9frzldV13WWirCG5zY4DyU2eu5n8=
Content-Type: text/html; charset=utf-8
Content-Encoding: mi-sha256-03

<!doctype html>\r\n<html>...
```


### Digest Header

Digest ヘッダは、コンテンツのダイジェストが含まれる。

この場合 Digest のアルゴリズムは Content-Encoding で指定された `mi-sha256-03` となっている。

これは Merkle Integrity Content Encoding のドラフトを指しており、仕様上 `mi-sha256` は実装必須となっている。

[draft-thomson-http-mice-03 - Merkle Integrity Content Encoding](https://tools.ietf.org/html/draft-thomson-http-mice-03)

Digest のアルゴリズムは既にあるが、それらは基本的にコンテンツが全て揃わないと Digest を生成することができない。そこで、 Partial Fragment ごとに Digest が計算できるように Merkle Integrity を用いた方法として提案されているのがこの仕様だ。


### Signature Header

Signature Header は、実際の署名および関連するパラメータが含まれる。

- sig: パラメータとヘッダを含んだ署名
- integrity: レスポンスの完全性を保証するダイジェストを含むヘッダの名前とアルゴリズムの組
- cert-url: 証明書への URL
- cert-sha256: cert-url で取得した証明書チェーンの最初の証明書の sha256 ハッシュ
- ed25519key: Ed25519 公開鍵
- validity-url: 証明書の期限が切れた後に、新しい証明書を取得する方法が得られる URL
- date: 生成時間の Unixtime
- expires: 期限時間の Unixtime


```http
Signature: label;
  sig=*MEUCICiUdi2JhgJwmzPfWu8PVIC/eBOeHMkAcUN5aetK9PxZAiEAgOF6IajUh6TIHYLZk7cin1bLXLKc6jkKA6RIR6cJOEE=*;
  integrity="digest/mi-sha256-03";
  cert-url="https://labs.jxck.io/webpackaging/signed-http-exchange-b2/cert.cbor";
  cert-sha256=*Wiqh2cLTl2rVqZCuAH0OBJoXs7ZRv4w9aV771Balils=*;
  validity-url="https://labs.jxck.io/webpackaging/signed-http-exchange-b2/validity-data";
  date=1543482268;
  expires=1543568668
```

基本は sig の値を cert-url にある証明書チェーンで検証することになる。

cert-url の証明書が Expire した場合は、新たなる証明書を validity-url に対して取得しに行く。

すると新たなる Signature の値が取得でき、同じ label (ここでは `label`) の値を置き換える。

これにより、コンテンツがそのまま利用できる場合は、署名のみを更新することが可能になる。

update は、新たなるコンテンツがある場合に、そのサイズを示している。

もし signature が無く、 update しかない場合は、コンテンツを更新する必要がある。

両方存在する場合は、 update の size などを考慮して、コンテンツを継続利用するか更新するかを選べる。


```
{
  "signatures": [
    'label; '
    'sig=*MEQCIC/I9Q+7BZFP6cSDsWx43pBAL0ujTbON/+7RwKVk+ba5AiB3FSFLZqpzmDJ0NumNwN04pqgJZE99fcK86UjkPbj4jw; '
    'validity-url'="https://labs.jxck.io/webpackaging/signed-http-exchange-b2/cert.cbor";
    'integrity'="digest/mi-sha256-03";
    'cert-url'="https://labs.jxck.io/webpackaging/signed-http-exchange-b2/cert.cbor";
    'certSha256=*J/lEm9kNRODdCmINbvitpvdYKNQ+YgBj99DlYp4fEXw; '
    'date=1511733180; expires=1512337980'
  ],
  "update": {
    "size": 5557452
  }
}
```


## 課題

SignedHTTPExchange はまだいくつかの課題がある。筆者が把握している範囲で記録する。


### offline 対応

現時点では certURL と validitiURL にアクセスし、署名を検証できなければいけない。

つまり、 sxg 自体がオフラインで共有できても、署名検証が offline で実施できない。

これについては、まだ作業中だと認識している。


### CanSignHttpExchanges

Mozilla は少し前に Standard Position の中で、 Signed HTTP Exchange を considered harmful と表明した。

- <https://mozilla.github.io/standards-positions/>

簡単に言えば、証明書が漏洩した場合、それを取得した攻撃者は自由に Origin を語れるということに対する懸念によるものだが、ユースケース自体は認めており、仕様のセキュリティモデルが改善すれば、この表明は見直されるだろうと考えられる。

具体的には、サーバが利用する HTTPS 用の証明書をそのまま sxg の署名に使うといった、運用の変更の隙間に、漏洩の懸念が生まれるため、基本的には HTTPS とは別の証明書を用意させる方が安全だろうという議論になっている。

結果、 sxg には「既存の証明書を利用させない」ために、新しい拡張を定義し、その拡張が入ったものでなければ利用できないように仕様を変更した。ここで X.509 の拡張として導入されたのが CanSignHttpExchanges である。

現時点で、この拡張に対応した証明書を発行する CA は、現時点では DigiCert のみだ。

- [Adding CanSignHttpExchanges Extension :: DigiCert](https://www.digicert.com/account/ietf/http-signed-exchange.php)

DigiCert の証明書はもちろん有料であるため、無料で試すには自己証明書しかない。

Let's Encrypt や他の商用 CA がどの程度この拡張に対応するのかは未定だが、個人的には Let's Encrypt に期待したい。

また、この拡張によって、既存の発行済証明書は sxg では使えないが、逆に CanSignHttpExchanges がある証明書がサイトの HTTPS 化のための証明書として使えないかと言うと、そうではないという理解だ。

つまり Let's Encrypt で発行した証明書が拡張を含むと、利便性の観点から HTTPS / sxg 両方に使われると思うが、そのリスクは運用側ということになる。

CanSignHttpExchanges がある証明書は、 HTTPS のために使えないようなサーバの実装が普及するのか、単に啓蒙として併用の抑止を訴えるのか、などといった流れは、まだ把握できてないので、普及フェーズに入ったら注視したい。


### Access Log

Physical URL と Logical URL が分離されたことにより、実際にオリジンサーバにアクセスする必要が無くなる。

これは同時に、コンテンツのアクセスログがオリジンサーバで収集できなくなることを意味する。

sxg を代理配信する CDN がログを提供するなら良いが、現状の仕様では配布する CDN を制限することは出来ないように思う。

したがって、野良 CDN や単純なファイル共有などで表示された場合は完全に収集することは出来ないだろう。

署名を検証する際に、 cert_url や validity_url へのアクセスが発生するために、ここにパラメータを含むことで収集できそうな気もするが、オフライン対応やパフォーマンス改善のためにキャッシュの仕組みが入るだろうことを考えると難しそうだ。

これは、従来の AMP でも発生していたことなので、同様にコンテンツ自体に Analytics を導入するか、自前で `<img>` や Beacon を用いた収集行われるかもしれない。

筆者は、 [Navigation 時に Reporting で Ping を行うような仕様](https://discourse.wicg.io/t/proposal-html-ping-for-navigation/2839) があれば Opt-Out も可能な状態でアクセスログ収集ができるのではと思っている。


### Validity URL の運用

コンテンツが更新された場合に、キャッシュされた sxg を更新させるために、 Certificate に有効期限を設ける仕様になっている。

そして、期限が切れた場合に Validity URL にアクセスすることで、新たな Certificate だけを取得してコンテンツは継続して使うか、コンテンツそのものを更新するかを選択させる。

コンテンツが頻繁に更新するのは sxg のメリットを損ねるため、なるべくなら継続してコンテンツを使わせたいのが普通だろう。

しかし、キャッシュ済みのコンテンツにバグなどがあった場合は、できるだけ素早く更新をして欲しい。

つまり、従来の時間ベースのキャッシュヘッダだけでなく、証明書も含めてコンテンツのフレッシュネスを管理する必要があるのだ。

検証に失敗したら、実際にオリジンサーバにアクセスするだけなので、オンラインであったり、 AMP のように、静的な作りに限定するのであれば、まだ問題は少なそうだ。

しかし、 PWA のオフラインインストールのような用途で利用が始まると考えることが増えそうだ。

その辺は、まったく想像できてないので、今後考えていきたい。


## 本サイトへの適用

この記事を書き始めた時は、 DigiCert で証明書を買って全ページの SXG を配布しようと考えていたが、以下の理由から見送った。

- 証明書がちょっと高い(一番の理由)
- Validity URL をどうするのかよくわからない
- expire が短時間しか設定できないため、継続した配布をどうするか考えて手を入れる必要がある
- アクセスログの集め方が定まってない
- etc

全部解決するまでブログの公開を遅らせるといつになるかわらないので、デモだけ作り先に記事を公開することとした。

引き続き色々考え、実装ができたら本サイトに適用したい。


## Link

- draft-yasskin-http-origin-signed-responses-04 - Signed HTTP Exchanges
  - <https://tools.ietf.org/html/draft-yasskin-http-origin-signed-responses-04>
- draft-yasskin-wpack-bundled-exchanges-00 - Bundled HTTP Exchanges
  - <https://tools.ietf.org/html/draft-yasskin-wpack-bundled-exchanges-00>
- Loading Signed Exchanges
  - <https://wicg.github.io/webpackage/loading.html>
- Signed HTTP Exchanges \| Web \| Google Developers
  - <https://developers.google.com/web/updates/2018/11/signed-exchanges>
- Signed Exchanges · Issue #235 · w3ctag/design-reviews
  - <https://github.com/w3ctag/design-reviews/issues/235>
- draft-yasskin-httpbis-origin-signed-exchanges-impl-02 - Signed HTTP Exchanges Implementation Checkpoints
  - <https://tools.ietf.org/html/draft-yasskin-httpbis-origin-signed-exchanges-impl-02>
  - <https://lists.w3.org/Archives/Public/ietf-http-wg/2018JanMar/att-0212/HTTP_Signed_Exchange_side_meeting_notes.txt>
  - <https://lists.w3.org/Archives/Public/ietf-http-wg/2018JanMar/att-0212/HTTP_Signed_Exchange_side_meeting_notes.txt>
- Intent to Implement: Origin-Signed HTTP Exchanges (Part of Web Packaging)
  - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/n7cZXSTwBTY/l7rXucIwBAAJ>
- Intent to Experiment: Signed HTTP Exchanges
  - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/MKHe54W996c/1E51GLbvAQAJ>
- WICG/webpackage: Web packaging format
  - <https://github.com/WICG/webpackage>
- sxg/ - Code Search
  - <https://cs.chromium.org/chromium/src/content/test/data/sxg/>
- Web OverPackaging
  - <https://speakerdeck.com/jxck/web-over-packaging>
