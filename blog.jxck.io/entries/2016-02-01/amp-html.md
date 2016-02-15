# [performance][amp] AMP HTML 対応

## Intro

Google が推奨する仕様である [AMP HTML](https://www.ampproject.org/) に、このブログのエントリページのみ対応してみた。

[ACCELERATED MOBILE PAGES PROJECT](https://www.ampproject.org/)

タイトルは識別しやすいよう AMP HTML としたが、実際には AMP という仕様(方針)があり、 HTML 以外にも手を入れている。

## AMP

AMP は、特にモバイル向けに **静的コンテンツ** を最適化し、高速に表示できるようにすることを目的としている。

実際は、高速化するというより、「遅くなる原因を排除する」という制約を課す仕様という作りになっている。

AMP は以下の三つの要素からなる。

- AMP HTML
- AMP JS
- AMP CDN


各要素を細かく説明し、 AMP への対応方法を書いたエントリは他にも多くあるので、対応してみた結果と、この仕様に対する感想を交えて、重要そうなところだけ拾って書く。


### AMP HTML

本サイトの HTML は、 [HTML の省略によるサイズ最適化](http://localhost:3000/entries/2016-01-28/html-compression.html) に書いた通り、極力タグを省略した作りにしている。

しかし、 AMP の仕様では `<head>`, `<body>` などの記述は必須となっているため、追加した。


### discovery (相互参照)

本サイトでは、普通の HTML と AMP 対応の HTML は別にビルドしており、 URL の末尾が `.html` か `.amp.html` かで分けている。

こうした場合は `<link>` タグで、クローラなどに相互のページの参照を伝えることができる。

このサイトでは `.html` に AMP 対応があることを伝える以下を追記した。

```html
<link rel=amphtml href=${path}.amp.html>
```

一方 `.amp.html` では、ブックマークなどが統一できるように `canonical` を追加している。

```html
<link rel=canonical href=${path}.html>
```

access_log で UA などを追えば、 apmhtml を見るクローラが追えるかもしれない。


### Google Analytics

AMP での Google Analytics の設定は `<amp-analytics>` カスタムタグで行う。

[Adding Analytics to your AMP pages](https://developers.google.com/analytics/devguides/collection/amp-analytics/)


収集したい情報に応じてやり方がいくつか有るようだが、一番スタンダードな Page Tracking だけ設定した。

AMP Analytics のコードの読み込みは、 AMP JS Library よりも前に行う必要があるとドキュメントに書かれているので、このようになった。


```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
<script async src="https://cdn.ampproject.org/v0.js"></script>

<amp-analytics type="googleanalytics" id="analytics1">
<script type="application/json">
{
  "vars": {
    "account": "UA-XXXXX-Y"  // Replace with your property ID.
  },
  "triggers": {
    "trackPageview": {  // Trigger names can be any string. trackPageview is not a required name.
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
```
