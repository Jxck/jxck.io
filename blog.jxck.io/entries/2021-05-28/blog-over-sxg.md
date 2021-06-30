# [prefetch][amp][signed-http-exchange][webpackaging] Non AMP SXG による Prefetch 対応と AMP 提供の停止


## Intro

本サイトを (Non AMP) SXG に対応した。

これにより、 Google のモバイル検索では、結果を表示した時点でこのサイトの SXG が Prefetch され、結果を選択したら Cache から素早く表示されつつ、 アドレスバーにも本サイトのものとして表示される。

この、 Non AMP SXG 対応にあたって、本サイトの AMP の提供も停止することになった。

移行の作業ログと、関連する流れについて記す。


## (Non AMP) SXG

SXG については過去に解説した。

- [WebPackaging の Signed HTTP Exchanges](https://blog.jxck.io/entries/2018-12-01/signed-http-exchanges.html)

本サイトでは AMP SXG に対応しており、 Google Search からの AMP ページへの遷移には SXG が取得され、本サイトのドメインが表示される。

- [AMP SXG 対応](https://blog.jxck.io/entries/2020-12-25/amp-signed-http-exchange.html)

今年の 4 月に、 AMP だけでなく通常のコンテンツであっても SXG を配信すれば Google Bot がそれを取得し、 Google Search のモバイル検索結果で Prefetch が行われるようになった。

これにより、モバイル検索結果を表示した時点で SXG がブラウザに読み込まれ、結果をクリックしたら、リクエストを投げる代わりにキャッシュから HTML を表示するだけで済むため、検索流入のユーザに対して、初期表示のパフォーマンス向上が期待される。

Google はこれを AMP SXG と対比して [Non AMP SXG](https://developers.google.com/search/docs/advanced/experience/signed-exchange#:~:text=non-,amp,-results) と称しており、本サイトでもその使い分けを採用するが、実態はまさしく SXG そのものだ。


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


```shell
git clone --depth 1 https://github.com/google/webpackager
cd webpackager/cmd/webpkgserver
go build .
```

これで `webpkgserver` コマンドが生成される。

実行には設定ファイルの toml を引数に渡す。


```shell-session
$ webpkgserver --config webpkgserver.toml
```


### webpkgserver.toml

設定ファイルは、同梱されている [webpkgserver.example.toml](https://github.com/google/webpackager/blob/master/cmd/webpkgserver/webpkgserver.example.toml) を修正する。

ほとんどデフォルトが使えるため、 Port と SXG 用の証明書、 Domain あたりを気をつければ良いだろう。


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

ローカルで起動した時点で、動作の確認は以下のように行うことができる。


```shell
export URL="https://blog.jxck.io/"
curl -s --output - -H 'accept: application/signed-exchange;v=b3,*/*;q=0.1' http://127.0.0.1:11000/priv/doc/$URL > dump.sxg
dump-signedexchange -i dump.sxg
```


## Routing

このサービスに対して行うべきルーティングは 3 つだ。

- webpkgserver に直接アクセスできないようポートを閉じる
- `/webpkg` を webpkserver に転送
- Content Negotiation で SXG を返す場合は `/priv/doc` をつけて proxy
- それ以外は proxy しない


## Content Negotiation

基本的にはリクエストヘッダに `Accpet: application/signed-exchange;v=b3` が付与されている場合、 Web Package Server に転送すれば良い。

しかし、 Google の Bot だけでなく、 Chrome も現状このヘッダをデフォルトで付与しているため、単にこのヘッダの有無だけを見てルーティングすると、ブラウザからのリクエストにも SXG を返すことになる。

これについては Q value を参照するように [ドキュメント](https://github.com/google/webpackager/blob/master/cmd/webpkgserver/README.md#content-negotiation) に書かれている。

具体的には Chrome と Google Bot の付与する Accept は以下のように異なる。


```http
# Google Bot
Accept: text/html,application/xhtml+xml,application/signed-exchange;v=b3,application/xml;q=0.9,*/*;q=0.8

# Chrome 90
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
```

SXG に注目すると Chrome は Q value を HTML などよりも下げているが、 Google Bot は Q value を下げずに HTML と同等にしていることがわかる。

ドキュメントでは、 Google Bot は Q value を付与しないことで優先度を下げないため、 Q value の有無が判断材料になると書かれており、それを Nginx で実現する正規表現の例が書かれている。

しかしドキュメントの正規表現が気に入らず、また本サイトでは h2o の mruby handler で対応するため、以下のように否定先読みで実現することとした。


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


```shell
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


```shell
# dump certurl
curl -s --output - https://blog.jxck.io/webpkg/cert/g8zY1NBH4DQt9qIWOWBqLWvs6jAnJmURAtNRc2WChDE > cert.cbor
dump-certurl -i cert.cbor
```

## 動作検証

### Debug

curl でテストしても良いが、デプロイした後ならば Chrome でアクセスして Devtools で確認すると詳細がデバッグできる。

しかし、今回の設定では Chrome のデフォルトの Q value がついた `Accept` ヘッダでは SXG が取得できないため、 [ModHeader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj) などを用いて Q value を無くすよう上書きする必要がある。

その状態でアクセスし、成功すれば以下のように SXG が確認できる。

まず、 Network の Timeline 上は SXG のレスポンスと CBOR リクエストが続き、 SXG から取り出された HTML が取得されている。

![SXG レスポンス、 CBOR レスポンス、 SXG から取り出された HTML の順に取得されている Devtools Timeline の図](sxg-timeline.png#2390x300)

SXG の Preview タブを見ると、 Signature や Certificate も正しく解釈されていることが確認できる。

![SXG の Signature や Certificate が正しく解釈されている Devtools の Preview の図](sxg-response.png#2128x1192)


### Google Bot

この状態で放置しておくと GoogleBot がクロールしに来た際に、 SXG の Content Negotiation に成功して SXG をクロールしていく。

SXG が Google の Cache に乗ったかは、以下のような規則で生成したキャッシュ URL に直接アクセスすれば確認できる。

- (before): <https://blog.jxck.io/entries/2016-07-12/cache-control-immutable.html>
- ( after): <https://blog-jxck-io.webpkgcache.com/doc/-/s/blog.jxck.io/entries/2016-07-12/cache-control-immutable.html>


### AMP SXG と Non AMP SXG

本来はこれで Google Search Result に反映されて、 Prefetch が埋め込まれるはずだった。

しかし、本サイトは既に [AMP](https://blog.jxck.io/entries/2016-02-01/amp-html.html) と [AMP SXG](https://blog.jxck.io/entries/2020-12-25/amp-signed-http-exchange.html) に対応しているため、モバイルの検索結果では AMP がヒットし、 AMP SXG がリンクされている。

![AMP SXG と Non AMP SXG を両方デプロイした場合、 Google Search Result では AMP が優先される](gsrp-amp.jpg#2322x684)

どうやら Non AMP SXG がクロールされても、同時に AMP および AMP SXG に対応している場合は、現状 AMP 側が優先されるようだ。

おそらく両方に対応しているサイト自体が他に無いため、ここをコントロールする情報は無く、今後 Non AMP SXG の方が優先されたりする可能性も無くはないが、まったく未定な状態となりいつまでたっても動作検証ができない。

CWV や SXG 、さらにこれから展開される予定の Prerender2 などを見据えれば、 AMP 自体は特別扱いされなくなっていくと理解しているため、そもそも AMP はどこかでやめるつもりでいた。

Bento AMP が気にるので、念のためにコンテンツは残すが、これを機に AMP の提供を停止することにした。


### AMP の停止

AMP をやめる方法は基本は以下だ。

- canonical html から `<link rel=amphtml>` を削除
- amp html へのリクエストは canonical html にリダイレクト

デプロイ上はこれだけで、後はクローラが来ればしばらくして消えるかと思ったが、なかなか検索結果からは消えなかった。

試しに 1 つ Search Console から AMP URL を削除するようにリクエストしたが、それでもなかなか反映されなかった。

結果、以下にある削除リクエストを実施した。

- [Update AMP Content](https://developers.google.com/amp/cache/update-cache)

一晩放置したところ、検索結果から AMP が消え始めた。


### Search Result

検索結果から AMP が消え、モバイルでも通常の HTML が表示されるようになった。

また、ページの DOM 中に `<link rel=prefetch>` が挿入されていることが確認できる。

![Non AMP SXG が Prefetch されている](gsrp-sxg.jpg#2406x774)

これにより、検索結果を表示した時点で HTML は Google の SXG Cache から取得されている。

![検索結果を表示した時点で HTML は Google の SXG Cache から取得されている](sxg-prefetch.png#3030x742)

実際に検索結果に遷移すると、 HTTP Request は筆者のサーバには発生せず、 Prefetch された HTML から展開されていることがわかる。

![検索結果に遷移すると Prefetch した HMTL が展開されている](sxg-navigate.png#3044x736)

このとき(スクショでは切れているが)、アドレスバーには SXG Cache の URL である `https://blog-jxck-io.webpkgcache.com/` ではなく、 SXG を検証した結果として `https://blog.jxck.io` が表示されている。


## Outro

本サイトを Non AMP SXG に対応し、 Google のモバイル検索結果で Prefetch されることを確認した。

本来、そこで発生したパフォーマンスの改善を CWV を指標として測るべきでもあるが、ローカルの Lighthouse はリロードベースでの測定しかできず、本サイトのアクセス数では Field Data が得られないため Page Speed Insight などでの変化も見ることができない。

各 API で色々工夫すれば測れるかもしれないが、本サイトは Origin が十分に速いため、有意な数値差も期待できず、検証はここまでとした。

また、今回ここで AMP をやめることは本来意図してなかったが、ここで不要になったように SXG も AMP の遺産の 1 つとも言え、すでに AMP はある程度の役目を終えつつあるだろう。

それについて書いたところ長くなったので、いずれ別途記事にまとめたいと思う。


## Resources

- Spec
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
  - <https://github.com/w3ctag/design-reviews/issues/235>
- Intents
  - Intent to Ship: Signed HTTP Exchanges (SXG)
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/gPH_BcOBEtc>
- Chrome Platform Status
  - <https://www.chromestatus.com/feature/5745285984681984>
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
- Other
  - Privacy-preserving instant loading for all web content – The AMP Blog
    - <https://blog.amp.dev/2019/05/22/privacy-preserving-instant-loading-for-all-web-content/>
  - Get started with signed exchanges on Google Search - 検索セントラル
    - <https://developers.google.com/search/docs/advanced/experience/signed-exchange?hl=ja#debug-the-google-sxg-cache>
  - ページ エクスペリエンスの更新に対応するための期間、ツール、詳細情報 - Google 検索セントラル ブログ
    - <https://developers.google.com/search/blog/2021/04/more-details-page-experience?hl=ja>
