# [semantics][jsonld][opengraph] JSON-LD と Open Graph で構造化メタデータ対応

## Intro

本サイトのセマンティクスメタ情報を整理するため、 HTML のメタタグの整理、 JSON-LD による schema.org 対応、 Facebook, Twitter を主とした Open Graph 対応を実施した。

## Meta Tag

まず HTML の仕様に従い、基本的なメタ情報を `<meta>` により定義した。

[https://dev.w3.org/html5/spec-preview/the-meta-element.html](https://dev.w3.org/html5/spec-preview/the-meta-element.html)


```html
<meta name=author content=Jxck>
<meta name=description content=${this.description}>
<meta name=keywords content="${this.tags}">

<title>${this.title} | blog.jxck.io</title>
```

なお、これで Google がサポートする `<meta>` タグについてもカバーされている。

[Google がサポートしているメタタグ](https://support.google.com/webmasters/answer/79812?hl=ja)


## JSON-LD (schema.org)

[schema.org](schema.org) には、メタ情報を表現するボキャブラリが定義されている。

そのボキャブラリを、サイト内にコードで表現する方法として RDFa, Microdata, JSON-LD の三種類がある。

それぞれのフォーマットの詳細は割愛するが、本サイトでは Microdata と JSON-LD の採用が候補に挙がった。

 TODO:
Microdata は RDFa

また、本サイトが対応している AMP HTML では JS の利用が禁止される一方 JSON-LD は許可されているため、そちらも考慮し JSON-LD を採用した。


<!--
- [JSON-LD](http://json-ld.org/)
http://googlewebmastercentral-ja.blogspot.jp/2015/03/easier-website-development-with-web.html
https://developers.google.com/structured-data/rich-snippets/articles

http://hublog.biz/bwpb/writing-in-php-of-schema-org-json-ld-for-wordpress-blog/
-->

結果、


<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage":{
    "@type":"WebPage",
    "@id":"https://blog.jxck.io"
  },
  "headline": "JSON-LD と Open Graph で構造化メタデータ対応",
  "image": {
    "@type": "ImageObject",
    "url": "https://www.jxck.io/assets/img/jxck.png",
    "height": 700,
    "width": 700
  },
  "datePublished": "2015-02-22T08:00:00+08:00",
  "dateModified": "2015-02-22T09:20:00+08:00",
  "author": {
    "@type": "Person",
    "name": "Jxck",
    "image": "https://www.jxck.io/assets/img/jxck.png"
  },
   "publisher": {
    "@type": "Organization",
    "name": "Jxck",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.jxck.io/assets/img/jxck.png",
      "height": 60,
      "width": 257
    }
  },
  "description": "本サイトのセマンティクスメタ情報を整理するため、 HTML のメタタグの整理、 JSON-LD による schema.org 対応、 Facebook, Twitter を主とした OpenGraph 対応を実施した。"
}
</script>


Google の Validator では publisher が必須なのだが、 publisher の `@type` は Person だと起こられる。

実際には本サイトは個人運営なのだが、しかたなく Organization を選択した。問題があったり、回避方法がみつかったら修正する。


検証ツール

https://developers.google.com/structured-data/testing-tool/


## Open Graph

Twitter と Facebook だけ、以下を参考に対応した。
内容はほとんど重複なので、 JSON-LD に対応してくれれば、これらは消したいところだ。

[twitter cards](https://dev.twitter.com/ja/cards/types/summary)

```html
<meta name=twitter:card        content=summary>
<meta name=twitter:site        content=@jxck_>
<meta name=twitter:url         content=${this.canonical}>
<meta name=twitter:title       content="${this.title} | blog.jxck.io">
<meta name=twitter:description content="${this.description}">
<meta name=twitter:image       content=https://www.jxck.io/assets/img/jxck.png>
```


[facebook open graph](https://developers.facebook.com/docs/sharing/webmasters)

```html
<meta property=og:type        content="article">
<meta property=og:url         content=${this.canonical}>
<meta property=og:title       content="${this.title} | blog.jxck.io">
<meta property=og:site_name   content=blog.jxck.io>
<meta property=og:description content="${this.description}">
<meta property=og:image       content=https://www.jxck.io/assets/img/jxck.png> 
```


## JSON-LD と LD-JSON

JSON-LD と紛らわしいものに LD-JSON (Line Delimitered JSON) がある。

それだけなら、実際全く関係ない仕様なのでまあ問題ない。

しかし、 JSON-LD の HTML 内の記述は Script Type が **application/ld+json** なのが微妙に引っかかる。


## まとめ

そもそも schema.org と Open Graph で内容が重複している部分が多いため、 Twitter, Facebook が schema.org に対応してくれるとそれだけでもペイロードサイズがだいぶ削減されそうである。

また、 schema.org も JSON-LD で記述することで、重複が発生しサイズが増えてしまう。
これは Microdata などで行えば、 HTML 内に記述されている内容は、そのタグにプロパティを付けることで表現できるため、重複を避けることができる。

しかし、一方で本サイトが対応している [AMP HTML](https://blog.jxck.io/entries/2016-02-01/amp-html.html) は、 JSON-LD は許容しており、通常の HTML と AMP 用 HTML 両方を対応する上でも JSON-LD を使った方が楽だろうと判断し、 JSON-LD での記述とした。
