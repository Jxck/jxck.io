# [semantics][jsonld][opengraph] Open Graph と JSON-LD の対応

## Intro

本サイトのセマンティクスメタ情報を整理するため、 OpenGraph と JSON-LD による schema.org に対応した。

## Meta Tag

まず HTML の仕様に従い、基本的なメタ情報を `<meta>` により定義した。

https://dev.w3.org/html5/spec-preview/the-meta-element.html

<meta name=author content=Jxck>
<meta name=description content=${this.description}>
<meta name=keywords content="${this.tags}">

<title>${this.title} | blog.jxck.io</title>



なお、 Google がサポートする `<meta>` タグについてもカバーされている。


[Google がサポートしているメタタグ](https://support.google.com/webmasters/answer/79812?hl=ja)


## JSON-LD (schema.org)


schema.org で定義されたメタ情報には、 RDF, Microformat, JSON-LD の三種類がある。

http://json-ld.org/
http://googlewebmastercentral-ja.blogspot.jp/2015/03/easier-website-development-with-web.html
https://developers.google.com/structured-data/rich-snippets/articles

http://hublog.biz/bwpb/writing-in-php-of-schema-org-json-ld-for-wordpress-blog/


<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage":{
    "@type":"WebPage",
    "@id":"https://blog.jxck.io"
  },
  "headline": "#{this.title}",
  "image": {
    "@type": "ImageObject",
    "url": "https://www.jxck.io/assets/img/logo.png",
    "height": 257,
    "width": 257
  },
  "datePublished": "2015-02-05T08:00:00+08:00",
  "dateModified": "2015-02-05T09:20:00+08:00",
  "author": {
    "@type": "Person",
    "name": "Jxck"
  },
   "publisher": {
    "@type": "Person",
    "name": "Google",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.jxck.io/assets/img/logo.png",
      "width": 257,
      "height": 257
    }
  },
  "description": "#{this.description}"
}
</script>


検証ツール

https://developers.google.com/structured-data/testing-tool/

<script type="application/ld+json">
{
  "@context":"http://schema.org",
  "@type":"Person",
  "name": "Jxck",
  "url": "https://jxck.io",
  "image": {
    "@type": "ImageObject",
    "url": "https://jxck.io/assets/img/logo.png"
  }
}
</script>



## Open Graph

Twitter と Facebook だけ、以下を参考に対応した。
内容はほとんど重複なので、 JSON-LD に対応してくれれば、これらは消したいところだ。

https://dev.twitter.com/ja/cards/types/summary

<meta name=twitter:card        content=summary>
<meta name=twitter:site        content=@jxck_>
<meta name=twitter:url         content=${this.canonical}>
<meta name=twitter:title       content="${this.title} | blog.jxck.io">
<meta name=twitter:description content="${this.description}">
<meta name=twitter:image       content=https://www.jxck.io/assets/img/jxck.png>


https://developers.facebook.com/docs/sharing/webmasters

<meta property=og:type        content="article">
<meta property=og:url         content=${this.canonical}>
<meta property=og:title       content="${this.title} | blog.jxck.io">
<meta property=og:site_name   content=blog.jxck.io>
<meta property=og:description content="${this.description}">
<meta property=og:image       content=https://www.jxck.io/assets/img/jxck.png> 
