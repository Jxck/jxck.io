# [signed-http-exchange] SXG 対応

## Intro

本サイトを (Non AMP) SXG に対応した。その作業ログを記す。


## (Non AMP) SXG

SXG については過去に解説した。

- [WebPackaging の Signed HTTP Exchanges](https://blog.jxck.io/entries/2018-12-01/signed-http-exchanges.html)

本サイトでは AMP SXG に対応しており、 Google Search からの AMP ページへの遷移には SXG が取得され、本サイトのドメインが表示される。

- [AMP SXG 対応](https://blog.jxck.io/entries/2020-12-25/amp-signed-http-exchange.html)

今年の 4 月に AMP だけでなく、通常のコンテンツであっても SXG を配信すれば Google Bot がそれを取得し、 Google Search の検索結果で配信されるようになった。


## SXG の配信

SXG の配信は、コンテンツを SXG に変換するだけではなく、 Content Negotiation の対応や Validity URL の提供など、いくつか対応が必要となる。

また、 SXG はファイル自体に期限があるため、 [gen-signedexchange](https://github.com/WICG/webpackage/tree/main/go/signedexchange/cmd/gen-signedexchange) といったツールで静的に作る場合は更新が必要となる。

今回はこうした処理を全て肩代わりしてくれる Web Packager Server を用いることにした。

- [Web Packager Server - google/webpackager](https://github.com/google/webpackager/tree/master/cmd/webpkgserver)


## Web Packager Server

Web Packager Server は Web Packager に含まれる webpkgserver コマンドを用いる。

このコマンドはサーバを起動し、リクエストに応じて SXG を生成して返すため、フロントサーバから Proxy するように構成する。


### webpkgserver

webpkgserver は `go get` ではうまく動かなかったため、 README にある通りソースからビルドした。

```sh
git clone --depth 1 https://github.com/google/webpackager
cd webpackager/cmd/webpkgserver
go build .
```

これで `webpkgserver` コマンドが生成される。

実行には設定ファイルの toml を引数に渡す。

```sh
$ webpkgserver --config webpkgserver.toml
```

### webpkgserver.toml

設定ファイルは、同梱されている webpkgserver.example.toml を修正する。　

ほとんどデフォルトで良く、 Port と SXG 用の証明書、 Domain あたりを気をつければ良いだろう。


```yaml
[Listen]
  Port = 11000

[Server]
  DocPath = '/priv/doc'

[SXG.Cert]
  PEMFile = '/keys/sxg/blog_jxck_io_full.crt'
  KeyFile = '/keys/sxg/blog_jxck_io.key'
  CacheDir = '/tmp/webpkg'

[SXG.ACME]
  Enable = false

[[Sign]]
  Domain = 'blog.jxck.io'
```

これを引数にするだけでサーバは起動する。

ローカルで起動した時点で、動作の確認はいかのように行うことができる。

```sh
export URL="https://blog.jxck.io/"
curl -s --output - -H 'accept: application/signed-exchange;v=b3,*/*;q=0.1' http://127.0.0.1:11000/priv/doc/$URL > dump.sxg
dump-signedexchange -i dump.sxg
```

## Routing

このサービスに対して行うべきルーティングは 3 つだ。

- webpkgserver に直接アクセスできないようポートを閉じる
- `/webpkg` を webpkserver に転送
- Content Negotiation で SXG を返す場合は `/priv/doc` をつけて proxy
- それ以外は proxy しない。



## Content Negotiation

基本的にはリクエストヘッダに `Accpet: application/signed-exchange;v=b3` が付与されている場合、 Web Package Server に転送すれば良い。

しかし、 Google の Bot だけでなく、 Chrome も現状このヘッダをデフォルトで付与しているため、単にこのヘッダの有無だけを見てルーティングすると、ブラウザでの表示にも SXG を返すことになる。

これについては Q value を参照するように [ドキュメント](https://github.com/google/webpackager/blob/master/cmd/webpkgserver/README.md#content-negotiation) に書かれている。

具体的には Chrome と Google Bot の付与する Accept は以下のように異なる。(どちらも前後に別の値もくるが省いている)

```http
# Google Bot
text/html,application/xhtml+xml,application/signed-exchange;v=b3,application/xml;q=0.9,*/*;q=0.8

# Chrome 90
text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
```

SXG に注目すると Chrome は Q value を HTML などよりも下げているが、 Google Bot は Q value を下げずに HTML と同等にしていることがわかる。

ドキュメントでは、 Google Bot は Q value を付与しないことで優先度を下げないため、 Q value の有無が判断材料になると書かれており、それを Nginx で実現する正規表現の例が書かれている。

本サイトでは h2o の mruby handler で対応するため、以下のように否定先読みで実現した。


```ruby
if /application\/signed-exchange;v=b3(?!;q=)/.match(env["HTTP_ACCEPT"])
  # reproxy to backend wepkgserver
  next [307, {"x-reproxy-url" => "http://127.0.0.1:11000/priv/doc/https://blog.jxck.io#{path}"}, []]
else
  # fallthrough
  next [399, {}, []]
end
```

ここまでが成功しているかは、以下のようにテストをすることができる。

```sh
export URL="https://blog.jxck.io/"
curl -s --output - -H 'accept: application/signed-exchange;v=b3,*/*;q=0.1' $URL > dump.sxg
dump-signedexchange -i dump.sxg -signature
```


### `/webpkg`

webpkgserver は SXG に必要な Certificate URL を自動で提供してくれる。

そのパスは `/webpkg/cert/#{base64}` となっているため、ここへのリクエストはそのまま転送すれば良い。

```h2o
"/webpkg":
  proxy.reverse.url: "http://127.0.0.1:11000/webpkg"
```

dump した sxg の中に cert url があるためそこから URL を取得すると以下のようにテストできる。

```sh
# dump certurl
curl -s --output - https://blog.jxck.io/webpkg/cert/g8zY1NBH4DQt9qIWOWBqLWvs6jAnJmURAtNRc2WChDE > cert.cbor
dump-certurl -i cert.cbor
```


## Debug

curl でテストしても良いが、デプロイした後ならば Chrome でアクセスして Devtool で確認すると詳細がデバッグできる。

しかし、今回の設定では Chrome のデフォルトの Q value がついた `Accept` ヘッダでは SXG が取得できないため、 [ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj) などを用いて Q value を無くすよう上書きする必要がある。

その状態でアクセスると、成功すれば以下のように SXG が確認できる。






## Test

https://signed-exchange-testing.dev/sxgs/valid.html
http://signed--exchange--testing-dev.webpkgcache.com/doc/-/s/signed-exchange-testing.dev/sxgs/valid.html


https://blog.jxck.io/entries/2016-07-12/cache-control-immutable.html
http://blog-jxck-io.webpkgcache.com/doc/-/s/blog.jxck.io/entries/2016-07-12/cache-control-immutable.html

https://blog-jxck-io.webpkgcache.com/doc/-/s/blog.jxck.io/entries/2019-08-14/nullish-coalescing-optional-chaining.html

## Outro

deadbeef


## DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/>


## Resources

- Spec
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
- Other
  - Privacy-preserving instant loading for all web content – The AMP Blog
    - https://blog.amp.dev/2019/05/22/privacy-preserving-instant-loading-for-all-web-content/
  - Get started with signed exchanges on Google Search - 検索セントラル
    - https://developers.google.com/search/docs/advanced/experience/signed-exchange?hl=ja#debug-the-google-sxg-cache
  - ページ エクスペリエンスの更新に対応するための期間、ツール、詳細情報 - Google 検索セントラル ブログ
    - https://developers.google.com/search/blog/2021/04/more-details-page-experience?hl=ja
