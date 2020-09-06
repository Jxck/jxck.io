# [jsonld][open graph][schema.org][semantics] JSON-LD と Open Graph で構造化メタデータ対応


## Intro

本サイトのメタ情報を整理するため、 HTML のメタタグの整理、 JSON-LD による schema.org 対応、 Facebook, Twitter を主とした Open Graph 対応を実施した。

これにより、既に AMP 対応していた本サイトが、 Google のモバイル検索でキャッシュの対象となる(クロール待ち)。


## Meta Tag

まず HTML の仕様に従い、基本的なメタ情報を `<meta>` により定義した。

<https://dev.w3.org/html5/spec-preview/the-meta-element.html>

各要素は、テンプレート生成時に利用した値を埋め込んでいるため、 [本サイトの Atom RSS-feed](https://blog.jxck.io/entries/2016-02-09/atom-feed.html) などと同じ値である。


```html
<meta name=author content=Jxck>
<meta name=description content=${this.description}>
<meta name=keywords content="${this.tags}">

<title>${this.title} | blog.jxck.io</title>
```

これで、 [Google がサポートしているメタタグ](https://support.google.com/webmasters/answer/79812?hl=ja) についてもカバーされている。


## schema.org

[schema.org](http://schema.org) には、メタ情報を表現するボキャブラリが定義されている。

そのボキャブラリを、サイト内に表現する方法として RDFa, Microdata, JSON-LD の三種類がある。

それぞれのフォーマットの詳細は割愛するが、基本的には Microdata で HTML の該当タグにボキャブラリを埋め込むか、 JSON-LD を用いて JSON 形式で一箇所に埋め込むかのいずれかが候補に挙がった。

結果として、本サイトでは以下を考慮し JSON-LD を採用した。

- 本サイトが対応している AMP HTML では JSON-LD が許可(推奨)されている。
- 単なる JSON にボキャブラリを埋めるだけなので、作成が容易。
- HTML への修正が少ないため、導入が容易。


### JSON-LD

結果、以下のような `<script>` を埋め込んでいる。


```html
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage":{
    "@type":"WebPage",
    "@id":"https://blog.jxck.io"
  },
  "headline": "${this.title} | blog.jxck.io",
  "image": {
    "@type": "ImageObject",
    "url": "https://jxck.io/assets/img/jxck.png",
    "height": 700,
    "width": 700
  },
  "datePublished": "${this.created_at}",
  "dateModified": "${this.updated_at}",
  "author": {
    "@type": "Person",
    "name": "Jxck",
    "image": "https://jxck.io/assets/img/jxck.png"
  },
   "publisher": {
    "@type": "Organization",
    "name": "Jxck",
    "logo": {
      "@type": "ImageObject",
      "url": "https://jxck.io/assets/img/jxck.png",
      "height": 60,
      "width": 257
    }
  },
  "description": "${this.description}"
}
</script>
```

フォーマットは Google の検証ツールを用いてチェックしながら作成した。

[Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/)

悩んだ点として、 Google の Validator では `publisher` が必須なのだが、 `publisher` の `@type` は `Person` だと怒られる。

実際には、本サイトは個人運営なのだが、しかたなく `Organization` を選択した。問題があったり、回避方法が見つかったら修正する。


### JSON-LD と LD-JSON

JSON-LD と紛らわしいものに [LD-JSON (Line Delimitered JSON)](https://en.wikipedia.org/wiki/JSON_Streaming#Line_delimited_JSON) がある。

それだけなら、実際全く関係ない仕様なのでまあ問題ない。

しかし、 JSON-LD の HTML 内の記述は script type が *application/ld+json* なのが微妙に引っかかる。


## Open Graph

Twitter と Facebook だけ、以下を参考に対応した。

内容はほとんど重複なので、 JSON-LD に対応してくれれば、これらは消したいところだ。

いずれも、仕様と同時にバリデータが提供されているため、それで確認をしている。


### Twitter

- [twitter cards](https://dev.twitter.com/ja/cards/types/summary)
- [Card validator](https://cards-dev.twitter.com/validator)


```html
<meta name=twitter:card        content=summary>
<meta name=twitter:site        content=@jxck_>
<meta name=twitter:url         content=${this.canonical}>
<meta name=twitter:title       content="${this.title} | blog.jxck.io">
<meta name=twitter:description content="${this.description}">
<meta name=twitter:image       content=https://jxck.io/assets/img/jxck.png>
```


### Facebook

- [facebook open graph](https://developers.facebook.com/docs/sharing/webmasters)
- [fecebook URL Debugger](https://developers.facebook.com/tools/debug/)


```html
<meta property=og:type        content="article">
<meta property=og:url         content=${this.canonical}>
<meta property=og:title       content="${this.title} | blog.jxck.io">
<meta property=og:site_name   content=blog.jxck.io>
<meta property=og:description content="${this.description}">
<meta property=og:image       content=https://jxck.io/assets/img/jxck.png> 
```


## Outro

そもそも schema.org と Open Graph で内容が重複している部分が多いため、 Twitter, Facebook が schema.org に対応してくれるとそれだけでもペイロードサイズがだいぶ削減されそうである。

また、 schema.org も JSON-LD で記述することで、重複が発生し、サイズが増えてしまう。

これは Microdata などで行えば、 HTML 内に記述されている内容は、そのタグにプロパティを付けることで表現できるため、重複を避けることができる。

しかし、一方で本サイトが対応している [AMP HTML](https://blog.jxck.io/entries/2016-02-01/amp-html.html) は、 JSON-LD は許容しており、通常の HTML と AMP 用 HTML 両方を対応する上でも JSON-LD を使った方が楽だろうと判断し、 JSON-LD での記述とした。
