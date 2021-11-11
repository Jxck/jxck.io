# Blog の刷新 v2

## Intro

本サイトは自作の HTML ビルダを使っていたが、色々と気に食わない部分があったのでフルスクラッチで作り直し、それにともなってサイトの刷新を実施した。



## Markdown

本サイトは、一般に使われている Markdown -> HTML の変換結果では要件を満たせないため、パーサから AST だけを取得し、それを Traverser でカスタマイズしてから自前でシリアライズしていた。

このために、最も都合の良い AST を吐く kramdown を使っていたが、それでも微妙に使いにくいところがあったので、パーサから自作することにした。

一応プレビュー用にブラウザでも使えるように JS で書いたが、今の所サーバでの生成しか使ってない。また、汎用性は求めてないのでライブラリとして別リポジトリで公開はせず、組み込んで密結合させている。

メモとして要件を記しておく。

## 要件

### Headding / Sectioning

大抵の Markdown 実装は `#`, `##` は `<h1>`, `<h2>` にそのままシリアライズされる。

```md
# h1

## h2

### h3

### h3
```

```html
<h1>h1</h1>
<h2>h2</h2>
<h3>h3</h3>
<h3>h3</h3>
```

これを `<section>` で階層化し、 `<h1>` だけは `<article>` にする。

```html
<article>
  <h1>h1</h1>
  <section>
    <h2>h2</h2>
    <section>
      <h3>h3</h3>
    </section>
    <section>
      <h3>h3</h3>
    </section>
  </section>
</article>
```

さらに、見出しジャンプを入れる。その際、 ID を振るが、もし被った場合は後ろに連番を振る。

```html
<article>
  <h1 id=h1><a href=#h1>h1</a></h1>
  <section>
    <h2 id=h2><a href=#h2>h2</a></h2>
    <section>
      <h3 id=h3><a href=#h3>h3</a></h3>
    </section>
    <section>
      <h3 id=h3_1><a href=#h3_1>h3</a></h3>
    </section>
</section>
</article>
```

もともと kramdown をカスタマイズしはじめたのも、これを行いたかったからだった。


### TOC の生成

前述で生成した headding とその ID を用いて、ページ内リンクの Table of Contents を生成して吐くようにした。

### h1

h1 には以下のようにタグが書けるようにカスタマイズしている。

```md
# [tag] hello world
```



### 閉じタグとクオートの省略

- 条件を満たした閉じタグと属性のクオートは基本省略
  - https://html.spec.whatwg.org/#a-quick-introduction-to-html
  - 
- きれいなインデント
- 


## blockquote の cite

blockqote の最後に書いた URL を `cite` として埋め込む。

```
> example page
--- https://example.com
```

```
<blockquote cite="https://example.com">
  <p>example page
  <p>&mdash; <cite><a href="https://example.com">example.com</a></cite>
</blockquote>
```

本来は `cite` 属性の方だけで良いが、以前は `<cite>` だったため今は両方にしている。

### 外部 script の読み込み

ブログを書く上で、ソースコードを別ファイルにし、それをサンプルコードとして埋め込めると非常に便利だ。

そこで、 `js:script.js` のような言語指定をすると `./script.js` を読み込んで埋め込む機能をつけている。

### img のカスタマイズ

画像の埋め込みは png や jpeg を一次ソースとしているが、かならず webp を提供している。

これを出し分けるために、画像記法は `<picture>` になるようにカスタマイズしている。 (SVG は単に `<img>` になる)

URL の最後に fragment を `#256x256` のように指定すると width, height として解釈する。

さらに、画像を読み込んで `mtime` から最終更新時を算出し、それをクエリに付与して Cache Busting する。

```md
![alt text](image.png#256x256 'title test')
```

```html
<picture>
  <source type=image/webp srcset=image.webp?211010_101010>
  <img loading=lazy decoding=async src=image.png?211010_101010 alt="jxck" title="jxck logo" width=256 height=256>
</picture>
```

そして、動画を埋め込む記法が Markdown にはないが、これまで gif アニメにしていたものは mp4 に移行しつつあるので、拡張子が mp4 だった場合は `<video>` になるようにしている。こちらは、 webm のフォールバックを入れている。

```
![dummy video](dummy_video.mp4#1000x2000)
```

```html
<video title="dummy video" width=1000 height=2000 controls playsinline>
  <source type=video/mp4 src=dummy_video.mp4?211010_101010>
  <source type=video/webm src=dummy_video.webm?211010_101010>
</video>
```


### adoptive CSS

`<table>` 用の CSS と `<pre>` のシンタックスハイライトは、他の要素に比べて CSS の量が多いのにかかわらず、出現頻度が低い。

そこで、 `<table>` と `<pre>` の CSS はファイルを分け、 HTML に出現する直前に CSS を一度だけ差し込むようにしている。

そのメリットは以下で解説している。

[HTTP2 を前提とした HTML+CSS コンポーネントのレンダリングパス最適化について | blog.jxck.io](https://blog.jxck.io/entries/2016-02-15/loading-css-over-http2.html)

### <table>

kramdown は、文の途中で `|` が来ると `<table>` が始まったと解釈する。

しかし、以下のようなリンクのタイトルは `|` を含むことが多く、エスケープが必要だった。

```
- [HTTP2 を前提とした HTML+CSS コンポーネントのレンダリングパス最適化について \| blog.jxck.io](https://blog.jxck.io/entries/2016-02-15/loading-css-over-http2.html)
```

mozaic.fm の Monthly Web では、 Show Note に大量のリンクを張り、そこに出てくる `|` を全てエスケープするのは面倒だった。

一方、文の途中で `<table>` を始めることなどないため、 `|` は行頭にきた場合のみ `<table>` と解釈することに限定し、エスケープしないで良いようにした。

また、 `<table>` の align は `align` 属性で指定も可能だが、もう deprecate されているため、 CSS で align するために `class` をつけるようにしている。


### <dl>

定義リスト記法もサポートしている。

さらに `<dl>` の下の `<dt>` `<dd>` は `<div>` で囲むことが許されており、これがあるとスタイルがちょっと楽になる。

また、 1 dt: n dd もサポートしている。

```
key1
: val1
key2
: val2
: val3
```

```html
<dl>
  <div>
    <dt>key1
    <dd>val1
  </div>
  <div>
    <dt>key2
    <dd>val2
    <dd>val3
  </div>
</dl>
```

個人的には Markdown のこの定義リスト記法はあまり気に入ってない。

特に、 dd が来ないとその手前が dt だったことがわからないというパースのしにくさもある。

いっそ以下のような独自記法を入れてしまってもよいかと考えている。

```
:key1
  :val1
:key2
  :val2
  :val3
```

### 余計な空白はエラー

以前はビルドとは別に linter のようなものを雑に作ってフォーマットを確認していた。

しかし、せっかくパーサを書いたので、パースの際に気に食わないところは、すべてエラーにすることにした。

```
以下全部エラー

a  **b** c
a **b**  c
a ** b** c
a **b ** c

-  aaa
 - bbb
```

これを formatter にしてもよいが、意図しないところが変更されると面倒なのでやってない。


### URL link

URL は以下の 3 つ全てサポートしてる。

```
[title](https://example.com)
<https://example.com>
https://example.com
```

最後の何も記法がないものは、とりあえず `http://` と `https://` で始まるものだけに絞ることで誤発動を防いでいるが、 `about:`, `chrome:`, `file:` をサポートするかは考え中。


### Front Matter

特に moziac.fm のエピソードページでは、 mp3 ファイルの場所や guest 一覧など、いくつかのメタデータを Markdown 内に独自ルールで書いて、それを雑に正規表現で処理していた。

しかし、 Markdown の先頭に YAML でメタデータを記述する Front Matter のサポートを入れることで、そうしたメタデータをそちらに移した。

```md
---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep89.mp3
published_at: 2021-10-26
guest: [@myakura](https://twitter.com/myakura)
---

# ep89 Monthly Web 202110

## Theme

第 89 回のテーマは 2021 年 10 月の Monthly Web です。
```

YAML は YAML パーサを入れるほど複雑なものを書いてないので、 YAML パーサを自作するのをぐっとこらえて雑に処理している。


### 使わない記法は実装しない

- `<del>` や `<i>` は使わないので実装してない
- Math も使わないので実装しない
- `<ul>` は `-` しか使わないので `*` は実装しない
- `<ol>` は `n.` しか使わないので `+` は実装しない



## traverser plugin

ここまでに上げたような本サイトに必要な機能は、 1 つに盛り込んでも良かったが、最終的にはブラウザでの挙動も想定して作っておきたかった。

ブラウザで挙動させると問題になるのは、 Cache Busting のためのファイル更新時間確認や、 `<pre>` への外部ファイル埋め込みなどが動かない。

やはり、 Markdown ファイルだけを見て生成できる HTML と、そこに対するカスタマイズを分離することで、ブラウザ上でもプレビューなどが動くように保つ方が後々良いだろう。

そこで、 AST を生成した後に、そこを Traverse する機能を用意し、 Node をたどりながら好きな変更を入れられるようにし、そこを Plugin のフックポイントとすることにした。

特に Node の `fs` を使わないと実現できないものは Plugin 側に寄せ、責務を分離できるようにしている。

## 効果

実装を置き換えてからの効果は以下。

- Markdown - HTML 変換速度が上がった。(ちゃんと測ってないが体感 1.5 倍)
- コード量を大幅に減らし、見通しをよくできた。
- 記法エラーを実装したことで、これまでの原稿を整形できた
- これまでの HTML の細かな問題、気に入らなかったところも全て精算できた
- kramdown という依存が無くなったので、 dependbot から警告が来ることが無くなった。
- ビルドプロセスから Ruby をなくせた
