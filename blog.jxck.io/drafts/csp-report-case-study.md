[csp][security] ブログで CSP Report を集めてみた結果

## Intro

このブログで CSP レポートの収集を開始してしばらく経つ。
ここまでに収集されたレポートには、盲点だったものなどもあるため、ここで紹介する。


## 基本構成


まず、設定および構成について


本サイトは `*.jxck.io` ドメインを使い、複数のサブドメインを運用している。
基本的にリソースは全てこのドメイン範囲内で提供しており、 google analytics のみ




### CSP ヘッダ


```
"jxck.io:443":
  header.add: "Content-Security-Policy-Report-Only: default-src 'self' https://*.jxck.io https://www.google-analytics.com; report-uri https://jxck.report-uri.io/r/default/csp/reportOnly"
  header.add: "Public-Key-Pins-Report-Only: pin-sha256=\"7JT7NhX2St/VBBkRi4BO427M7ytLy7p3CRYPtHpSm7c=\"; pin-sha256=\"+WpRHNpAId2FIOvVgwmS3HsG+eJtERKC4/qM1tQaeRk=\"; report-uri=\"https://jxck.report-uri.io/r/default/hpkp/reportOnly\""
"/humans.txt":
  header.unset: "Content-Security-Policy-Report-Only"
  file.file: ./www.jxck.io/humans.txt
```

- CSP
 - rss, text, md ページ
 - firefox view:source
  - block してると source 見れない？
  - 見れた。オリジンが view-source: だからっぽい


https://twitter.com/Jxck_/status/715748823713185792

ブログで CSP を有効にしたので report-uri.io を覗いてみたら、意外にも RSS や text/plain なページが引っかかってた。ブラウザでは表示のために HTML に入れてそこのインラインスタイルが引っかかる。

まあこういうページに CSP ヘッダはいらないので、ドメイン以下一括でつけてたから、除外設定すればいいんだけど。他にはどんなフォーマットが HTML に埋め込まれるのか、どっかにまとまってないだろうか。

あと、 Firefox の view:source からも送られてきてる。つまり Report Only じゃなくてブロックしてたら、ソース見れないってこと???あとで試そう。

CSP でインラインスクリプト無効にしてると、 dev console からの DOM の変更が Chrome では OK だけど Firefox ではエラーらしい。


##
