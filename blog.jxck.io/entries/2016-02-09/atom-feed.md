# [atom][rss] Atom の RSS Feed 対応

## Intro

このブログの Atom feed を吐くようにしてみた。

右上の [feed アイコン](//blog.jxck.io/feeds/atom.xml) から登録できる。


## RSS のフォーマット

RSS の主な仕様は三つある

- RSS 1.0
- RSS 2.0
- Atom

どれも順番に進化したというよりは、混乱する仕様編成を経て出て来たということらしい。

一方で、標準的な RSS(feed)リーダならどのフォーマットも基本的には対応しているとのこと。

中でも Atom は一番シンプルな仕様であるようなので、これで吐くことにした。


## Atom

このサイトの、ここまでのエントリのフィードは以下のようになった。

### 完成型

```xml
<?xml version='1.0' encoding='UTF-8'?>
<feed xmlns='http://www.w3.org/2005/Atom' xml:lang='ja'>
 <title>blog.jxck.io</title>
 <link href="https://blog.jxck.io/"/>
 <link rel="self" type="application/atom+xml" href="https://blog.jxck.io/feeds"/>
 <updated>2016-01-28T18:30:02Z</updated>
 <author>
   <name>Jxck</name>
 </author>
 <id>tag:blog.jxck.io,2016:feed</id>
  <entry>
   <title>h2o で https/2 のデプロイと設定</title>
   <link href="https://blog.jxck.io/entries/2016-02-08/h2o-http2-deploy.html"/>
   <id>tag:blog.jxck.io,2016:entry://2016-02-08</id>
   <updated>2016-02-08T00:00:00Z</updated>
   <summary>土台がだいたいできたので、このサイトを h2o にデプロイした話。</summary>
  </entry>

  <entry>
   <title>AMP HTML 対応</title>
   <link href="https://blog.jxck.io/entries/2016-02-01/amp-html.html"/>
   <id>tag:blog.jxck.io,2016:entry://2016-02-01</id>
   <updated>2016-02-01T00:00:00Z</updated>
   <summary>Google が推奨する仕様である [AMP HTML](https://www.ampproject.org/) に、このブログのエントリページのみ対応してみた。

[ACCELERATED MOBILE PAGES PROJECT](https://www.ampproject.org/)

タイトルは識別しやすいよう AMP HTML としたが、実際には AMP という仕様(方針)があり、 HTML 以外にも手を入れている。</summary>
  </entry>

  <entry>
   <title>HTML の省略によるサイズ最適化</title>
   <link href="https://blog.jxck.io/entries/2016-01-28/html-compression.html"/>
   <id>tag:blog.jxck.io,2016:entry://2016-01-28</id>
   <updated>2016-01-28T00:00:00Z</updated>
   <summary>とりあえず [blog.jxck.io](https://blog.jxck.io) 以下については、基本的には静的ファイルを生成するスタイルで作ろうと思っている。

手元に書いた Markdown を HTML に変換するスタイルで、これを行うツールは星の数ほどあるが、この変換時に前から思っていた HTML の最適化をやってみようと思った。

結局そういうことができるツールはなさそうなので、 Markdown のパーサだけ借りてきて、 AST から構築する過程で省略を施した。

単なる実験としてその結果を書いておく。(なお、今はまだ CSS も圧縮していない)</summary>
  </entry>

  <entry>
   <title>Blog を移転しました</title>
   <link href="https://blog.jxck.io/entries/2016-01-27/new-blog-start.html"/>
   <id>tag:blog.jxck.io,2016:entry://2016-01-27</id>
   <updated>2016-01-27T00:00:00Z</updated>
   <summary>長いこと [はてな](http://jxck.hatenablog.com/) をメインにし、他にも [Qiita](http://qiita.com/jxck_) や [Tumblr](http://jxck.tumblr.com/) を使って色々書いて来たけど、そろそろ自分のドメインに全部集約していこうかなと思います。</summary>
  </entry>

</feed>
```

必須項目くらいしか書いていない、シンプルな形にしている。

悩んだ項目が ID だった。


### id

まず feed 自体の id と、エントリごとの id がある。

feed の id は、 feed を生成し直すたびに振るのかと思ったが、そうではなく、この feed 自体に一度振ったら二度と変えないらしい。

エントリの id は、エントリ自体に振る。エントリを更新しても振りなおしたりはしない。

どちらも URI でいいのでは？という気がするが、例えばエントリの id は、 URI が変わっても変わってはいけないらしい。そのため、エントリの URI を変える可能性を考え、別途振ることが多いらしい。

そこで、 URI の一部や、 UUID などを織り交ぜ、 [The 'tag' URI Scheme](https://www.ietf.org/rfc/rfc4151.txt) というフォーマットを使うことが多い。

ということで、このサイトの feed も、その辺を参考に作ってみた。


### validate

生成した Atom Feed は w3c のバリデータで確認した。

[Feed Validator](https://validator.w3.org/feed/check.cgi?url=https%3A%2F%2Fblog.jxck.io%2Ffeeds%2Fatom.xml)


### meta

サイトの HTML に、 Feed を持つことを `<meta>` タグで記述した。

```html
<link rel=alternate type=application/atom+xml title=blog.jxck.io href=/feeds/atom.xml />
```


## Outro

[W3C の Validator](https://validator.w3.org/feed/) を通して、 firefox がデフォルトで持ってる feed reader でチェックしたところ普通に動いた。

追加の属性については、必要に応じて足して行く。
