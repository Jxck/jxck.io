# [amp][html][performance] AMP HTML 対応

## Intro

Google が推奨する仕様である [AMP HTML](https://www.ampproject.org/) に、このブログを対応した。

言いたいことは色々あるが、とりあえず非常に難しかったため、その対応方法や感想などを残す。


## Update

以下の記事が出たので、古かったフォーマットのアップデートと [JSON-LD によるメタデータの提供](https://blog.jxck.io/entries/2016-02-26/jsonld-opengraph.html) に対応した。

- [Google モバイル検索が Accelerated Mobile Pages に対応しました](http://googledevjp.blogspot.jp/2016/02/google-accelerated-mobile-pages.html)
- [AMP対応 2016.02版](http://ymotongpoo.hatenablog.com/entry/2016/02/25/224159)


## AMP

[ACCELERATED MOBILE PAGES PROJECT](https://www.ampproject.org/)

タイトルは識別しやすいよう AMP HTML としたが、実際には AMP という仕様(方針)があり、 HTML 以外にも手を入れている。

AMP は、特にモバイル向けに **静的コンテンツ** を最適化し、表示を高速化することを目的としている。

実際は、高速化するというより、 **遅くなる原因を排除する** という制約を課す仕様という作りになっている。


### 対応のメリット

AMP への対応は、実際には 「遅くなる原因」=「アンチパターン」が Invalid となる仕様を定義し、それを開発者に強制することで、必然的にボトルネックの少ないコンテンツにする仕様と言える。

具体的には以下のようなアンチパターンを排除する。

- JS の実行: 実際には `document.write` などによるブロックなどがネックになりやすいが、細かくいうと色々あるので、丸っと一括で禁止するという感じ
- 外部 CSS: 全部 HTML 内に書かせることで、 fetch や再描画を防ぐ
- `<img>`: 画像の width x height を明示させ、そこに非同期読み込みする `<amp-img>` を代わりに使わせることで、画像表示を最適化する

まあ、ほとんどが実際は **粗悪なアド** を縛るような仕様になっている。
アドの実装は開発者が手を出しにくいところであるため、こうした外部要因による強制力(AMP 対応が一般化したら、対応してないアドにとっては不利になる)があるのは良いだろう。

もちろん、アドが貼れない訳ではない。

他にも禁止している `<iframe>` やアナリティクス、その他 JS がないと実現できない UI 効果などは `<amp-x>` というコンポーネントによって実現できるようになっている。

逆を言えばこれらコンポーネントに縛ることで、変な実装が入ることを防いでいる。


また、こうした制約を満たしたサイトは、各ベンダがキャッシュしてくれるという効果が強くあるだろう。

AMP に合意したベンダは、サイトをクロールし AMP 対応ページを見つけた際に、それをキャッシュし代わりに配信してくれる。
(AMP に対応していれば、自然とそういうことがしやすいサイトになっている)

現在 Google, Twitter, Pinterest などが対応しているらしく、対応ベンダが増えれば CDN エッジが増え、より最適なルートから素早くページが配信されるという仕組みになっている。

[How do Accelerated Mobile Pages work?](https://www.ampproject.org/docs/support/faqs.html#how-do-accelerated-mobile-pages-work)

クローラに AMP 対応を知らせる方法は後述する。


### 構成要素

AMP は以下の三つの要素からなる。

- AMP HTML
- AMP JS
- AMP CDN


各要素を細かく説明し、 AMP への対応方法を書いたエントリは他にも多くあるので、対応してみた結果と、この仕様に対する感想を交えて、重要そうなところだけ拾って書く。


## HTML 対応

### AMP HTML

本サイトの HTML は、 [HTML の省略によるサイズ最適化](/entries/2016-01-28/html-compression.html) に書いた通り、極力タグを省略した作りにしている。

しかし、 AMP の仕様では `<head>`, `<body>` などの記述は必須となっているため、追加した。


## discovery (相互参照)

本サイトでは、普通の HTML と AMP 対応の HTML は別にビルドしており、 URL の末尾が `.html` か `.amp.html` かで分けている。

こうした場合は `<link>` タグで、クローラなどに相互のページの参照を伝えることができる。

このサイトでは `.html` に AMP 対応があることを伝える以下を追記した。

```html
<link rel=amphtml href=${path}.amp.html>
```

一方 `.amp.html` では、オリジナルコンテンツの存在と、ブックマークなどが統一できるように `canonical` を追加している。

```html
<link rel=canonical href=${path}.html>
```

access_log で UA などを追えば、 apmhtml を見るクローラが追えるかもしれない。


### JS

JS は一切許されない。 JS が必要な表現などは AMP のライブラリとして用意されているカスタムエレメントを経由して実現する必要がある。

特に JS がレンダリングブロックなど、余計なことをしている場合にパフォーマンスへの影響が大きいための制限だろう。

このサイトは現時点では、コードスニペットのシンタックスハイライトと google analytics 以外には JS を使っていない。

ハイライト用の JS は、無ければハイライトされないだけなので、とりあえず AMP 対応ページでは JS 自体を読み込まないようにした。

google analytics については後述するコンポーネントがあるため、それを適用した。


### CSS

`<link>` による CSS の読み込みも禁止されている。

しかし、 `<style>` が禁止されているわけではないので、全ての CSS を結合して HTML 内に埋め込むようにした。

これは、別途対応した以下のコンポーネント単位の読み込みによる最適化と競合しているが、仕様なのでしかたがない。

[HTTP2 を前提とした HTML+CSS コンポーネントのレンダリングパス最適化について](loading-css-over-http2.html)


### amp custom element 対応

### amp-img

AMP-HTML 内では、 `<img>` タグを直接書くことは禁止されており、代わりに、 `<amp-img>` というカスタムタグを使用する。

[amp-img](https://www.ampproject.org/docs/reference/extended/amp-img.html)

このタグには `width` `height` の記述が必須となっており、 `layout=responsive` とすることでそのサイズ比を保ったままレスポンシブ表示してくれる。

この記事では markdown から生成しているため、この指定はいちいち調べて URL の最後に `#widthxheight` などとサイズを付与しておき、 AMP バージョンだけビルド時にそれを読むようにした。

全てのイメージにサイズを付けるのは、特に既存のコンテンツがあるとなかなか難しそうな気がする。


### amp-iframe

AMP-HTML 内では、 `<iframe>` タグを直接書くことは禁止されており、代わりに、 `<amp-iframe>` というカスタムタグを使用する。

[amp-iframe](https://www.ampproject.org/docs/reference/extended/amp-iframe.html)

ただし、このタグもまた制約が多い。一番大きいのは **位置** に対する制約だ。

> They must be either 600px away from the top or not within the first 75% of the viewport when scrolled to the top


要するに above-the-fold に iframe を入れたくないということだろう。これはコンテンツを作る時点で気にしておかないといけないし、自動で変換も難しい。

このサイトは markdown からビルドしているため、 `<iframe>` を埋め込む場合は自分で直接タグを書くことになる。

なので、タグを埋め込む際は、その前に何かしらその埋め込むコンテンツへのリンクを貼っておくルールを強制することで、 AMP-HTML 内では `<iframe>` をまるっと消してしまうことにした。

(将来的にはなんとかしたい。。)


### amp-analytics

AMP での Google Analytics の設定は `<amp-analytics>` カスタムタグで行う。

[Adding Analytics to your AMP pages](https://developers.google.com/analytics/devguides/collection/amp-analytics/)


収集したい情報に応じてやり方がいくつかあるようだが、一番スタンダードな Page Tracking だけ設定した。

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

## debug

AMP として正しい HTML かどうかは、 Chrome Developer Tools で調べることができる。

単に Tools を開けば、そのページの対応している AMP バージョンを知ることができるが、 URL に `#development=1` を付与することでより細かくエラーを見ることができる。

このページのデバッグフラグ付き AMP 対応ページの URL は以下になる。

[amp-html.amp.html#development=1](amp-html.amp.html#development=1)

また、分かりやすいように通常の HTML の右上に AMP のイメージもとである &#x26a1; を模したアイコンを追加し、そこに AMP 版へのリンクを追加した。


## まとめ

AMP は、読み込みが遅くなる原因を徹底的に排除するために、対象となるタグや構成などを強く制限している。

また、各ベンダの CDN からの代理配信が最適化されれば、メリットは強いかもしれない。

本サイトのようにまだ作り途中で、変更も効かせやすいサイトであればまだ別だが、既存のコンテンツをそれなりに持っている場合は、なかなか対応が難しいのではないかと感じる。

それを踏まえて実施するだけのメリットが明確に見えれば、徐々に広がって行くのではないかと思う。

あと、ドキュメントが分かりにくいところがある。

仕様のバージョンもまだ少し動いていくようなので、その辺りも含めてもっと知見と安定感が欲しい。
