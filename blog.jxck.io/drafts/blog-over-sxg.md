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

今回はこうした処理を全て肩代わりしてくれる webpkgserver を用いることにした。

- [Web Packager Server - google/webpackager](https://github.com/google/webpackager/tree/master/cmd/webpkgserver)


## webpackager

webpackager は `go get` ではうまく動かなかったため、 README にある通りソースからビルドした。

```sh
git clone --depth 1 https://github.com/google/webpackager
cd webpackager/cmd/webpkgserver
go build .
```


## 



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
