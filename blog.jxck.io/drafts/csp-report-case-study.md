[csp][security] ブログで CSP Report を集めてみた結果

## Intro

このブログで CSP レポートの収集を開始してしばらく経つ。
現状、対象ドメイン内で `input` フォームは一切提供しておらず、大半が静的に生成されたページである。
この条件でも、かなり多くのレポートが集まるという点を中心に、その内容を紹介する。


## 基本構成

まず、設定および構成について述べておく。

本サイトは `*.jxck.io` ドメインを使い、複数のサブドメインを運用している。

`labs.jxck.io` だけは(CSP に違反するデモを含む)、様々なデモを置いているため、対象外として扱う。

CSP は全て Report-Only で HTTP ヘッダから適応しており、 CSP レポートは [report-uri.io](https://report-uri.io) に送信している。

最初は `default-src 'self'` の設定を基本として、レポートを集めながらトライアンドエラーでポリシーを更新している。


今回は、 `default-src 'self'` から始めた時に Report が上がったものの中から、代表的なものを紹介する。



### テキストページ

本サイトでは記事の原稿を markdown で提供したり、 RSS feed を XML で提供したりしている。

こうした `.md`, `.txt`, `.xml`, `.json` などのページをブラウザで表示すると、ブラウザによってはそれを内部的に HTML に整形して表示する。

この時、 HTML の中にある inline の style がポリシー違反と判定されるため、レポートが上がる。

![inline style violation for RSS feed in chrome](inline-style-violation.png "chrome add inline style for display rss feed which violates CSP Policy")


本サイトでは、こうしたページへは CSP を適用しないこととした。


### FireFox view:source

本サイトは技術者向けの内容が多いため、このサイト内の HTML ソースをブラウザで表示する閲覧者も多い。

Firefox ではソースを表示すると、オリジンが view-source://~ となるため、このページが CSP 違反となりレポートが上がる。

Chrome でも同じくオリジンが変わるが、ここではレポートはあがらないようだ。

![view source in firefox](firefox-view-source.png "view-source:// violates csp policy in firefox")


これは対応せず無視することとした。


### DOM change from DevTools

DevTools から DOM を変更する時、 Firefox ではエラーらしい。



### about:blank_




### CSP ヘッダ


```
"jxck.io:443":
  header.add: "Content-Security-Policy-Report-Only: default-src 'self' https://*.jxck.io https://www.google-analytics.com; report-uri https://jxck.report-uri.io/r/default/csp/reportOnly"
  header.add: "Public-Key-Pins-Report-Only: pin-sha256=\"7JT7NhX2St/VBBkRi4BO427M7ytLy7p3CRYPtHpSm7c=\"; pin-sha256=\"+WpRHNpAId2FIOvVgwmS3HsG+eJtERKC4/qM1tQaeRk=\"; report-uri=\"https://jxck.report-uri.io/r/default/hpkp/reportOnly\""
"/humans.txt":
  header.unset: "Content-Security-Policy-Report-Only"
  file.file: ./www.jxck.io/humans.txt
```



https://twitter.com/Jxck_/status/715748823713185792






##
