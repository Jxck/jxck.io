# [http2][css][performance] HTTP2 を前提とした HTML+CSS コンポーネントのレンダリングパス最適化について


## Intro

Chrome が予定している `<link rel=stylesheet>` の挙動の変更について、Google Chrome チームの Jake が、興味深いブログを上げている。

[The future of loading CSS](https://jakearchibald.com/2016/link-in-body/)

この内容は、単に Chrome に対する変更ではなく、 HTTP2 によって変化する最適化手法と、それを最も活かすための HTML, CSS の構成についてのヒントがある。

今回は、これを解説し、本サイトに適用していく。


## HTTP/1.1 時代の CSS

HTML 自体がコンポーネントを意識した作りになっている場合は、自然と CSS も `class` などを使いコンポーネント単位に作ることができるだろう。

しかし、 HTTP/1.1 ではリクエストの数を減らすために、全ての CSS を一つ(もしくは少数個)に結合する最適化が主流だった。


```html
<head>
  <link rel="stylesheet" href="bundle.css">
</head>
<body>
  <!-- content -->
</body>
```

しかし、リクエストの多重化が可能な HTTP/2 においては、そこを心配する必要がなくなったため、コンポーネントごとに CSS を分割するのは、キャッシュの容易性を考えても良い方法と言える。

```html
<head>
  <link rel="stylesheet" href="/header.css">
  <link rel="stylesheet" href="/main.css">
  <link rel="stylesheet" href="/article.css">
  <link rel="stylesheet" href="/comment.css">
  <link rel="stylesheet" href="/footer.css">
</head>
<body>
  <!-- content -->
</body>
```


しかし、この場合でも二つの懸念が残る。

> <head> を出力する時点で、ページ内に存在する全てのコンポーネントを把握していないといけない

HTML を全て生成してから順次送るのであれば問題ないが、本来 HTML は先頭から、準備ができた順にコンポーネントを送信することも可能であるはずが、それができなくなる。

> footer.css のローディングが遅い場合、サイト全体をブロックする

footer.css が必要なのは、 HTML 中の `<footer>` をレンダリングする時であり、そこまでに出てくる `<header>` などは、先にレンダリングすることも可能だが、実際はそのたった一つの CSS のせいでそこまでに揃っているコンポーネントもレンダリングされず、真っ白のままになる。


## CSS の遅延ロード

この問題に対応するために、以下のような JS を用いて CSS を非同期ロードする方法がある。

https://github.com/filamentgroup/loadCSS

スタイルが当たってない状態で表示されてほしくないコンポーネントには、 `display: none` などをつけておき、ロードされたスタイルの中で `display: visible` されるようにする。

この方法は、クリティカルレンダリングパスの改善方法の一つとして、多くのパフォーマンスエキスパートから推奨されている。


- https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery
- https://www.filamentgroup.com/lab/performance-rwd.html
- http://www.lukew.com/ff/entry.asp?1756


ただし、この方法には JS のライブラリが必須となる。
なぜなら、 Webkit は `<link rel=stylesheet>` が追加されると、それが JS によって追加されたものであれ、レンダリングをブロックしてしまうからである。
Firefox や IE/Edge は、 JS で追加されたものについては非同期に読み込むため、この問題は無い。
Chrome は、現在の Stable では Webkit と同じだが、 Canary では Firefox, IE/Edge の方法に移行している。


## 二段階のロードという制限

前述のパターンでは inline css でスタイルの当たっていない要素を隠し、非同期ロードした CSS でそれを出現させている。

これは、コンポーネントと対する CSS が複数になり、その複数の CSS が非同期に順不同で取得された場合に、要素がランダムに出現することを意味する。

最初の要素が表示され、読んでいる間に新しい要素の出現によりレイアウトが変わり、全部表示されるまで落ち着いて読めない。

こうした Content-Shifting の問題は、公告が後から次々に表示されるページなどで多く発生し、フラストレーションがたまった経験は誰にでもあるだろう。

https://www.youtube.com/watch?v=uPnEZd6wCtk

<iframe width="560" height="315" src="https://www.youtube.com/embed/uPnEZd6wCtk" frameborder="0" allowfullscreen></iframe>

本来なら、最初に見える部分="Above the fold" を最適化したいわけだが、それがどの要素かは viewwport に依存する。従って、どのような viewport でも適切に表示できる方法が求められる。


## HTTP2 時代の最適化

HTTP2 では以下のように書くことが可能になる。

```html
<head>
</head>
<body>
  <!-- HTTP/2 push this resource, or inline it, whichever's faster -->
  <link rel="stylesheet" href="/site-header.css">
  <header></header>

  <link rel="stylesheet" href="/article.css">
  <main></main>

  <link rel="stylesheet" href="/comment.css">
  <section class="comments"></section>

  <link rel="stylesheet" href="/about-me.css">
  <section class="about-me"></section>

  <link rel="stylesheet" href="/site-footer.css">
  <footer></footer>
</body>
```


まず、各`<link rel=stylesheet>` はそれ以降のレンダリングをブロックするが、それ以前のコンテントのレンダリングをブロックしない。
CSS は並列で読み込まれ、直列に適用される。

もし、 Header, Article, Footer の CSS が読み込まれていた場合を考えると、以下のような状態になる。


- Header: レンダリングされる
- Article: レンダリングされる
- Comment: comment.css がブロックしてるのでレンダリングされない
- Aboute me: comment.css がブロックしてるのでレンダリングされない
- Footer: CSS はすでにあるが、 comment.css がブロックしているのでレンダリングされない

以下のメリットがある

- 上から順番に表示され "Above the Fold" がどの部分かは気にしないで良い。
- コンポーネント単位で設計し、そのコンポーネントの直前に `<link>` を書けば良い。
- ストリームで考えられる(`<link>` の有無を先に考えなくて良いのでサーバは完成した順に HTML を送信できる)


ただし、レイアウトシステムを使う場合は、 Content-Shifting が発生しないように意識する必要がある。
特に Table や Flexbox を利用したレイアウトでは、それが発生しやすい。これまでも同じ問題は認識されていたが、前述のような progressive な読み込みではこの問題はより発生しやすい。

Flexbox は小さいコンポーネント単位で使用し、全体のレイアウトには CSS grid を使うのが良いだろう。


## Chrome での変更点

HTML の仕様には、ページのレンダリングが CSS によりどうブロックされるかについては、明確に書かれていない。

また、仕様では `<body>` への `<link rel=stylesheet>` の記述も推奨されていない。

しかし、実際にブラウザはそれぞれの方法でそれを許容している。

- Chrome, Safari: `<link rel=stylesheet>` があるとロードされるまで、直ちにレンダリングを止める。このため、 `<link>` より **上** の要素も、レンダリング途中で止まる場合がよくある。
- Firefox: `<head>` に `<link rel=stylesheet>` があるとブロックするが、 `<body>` では `<head>` の CSS がブロックしていない限りはブロックしない。これは FOUC(flash of unstyled content) を引き起こす。
- IE/Edge: CSS が読み込み終わるまでパーサをブロックする、しかし、 `<link>` 前のコンテンツはレンダリングする

Chrome は IE/Ednge の方式に移ることを検討している。これにより Progressive Rendering パターンが可能になる。
合わせて [<body>内の<link>を許可する仕様](https://github.com/whatwg/html/pull/616) の策定を進めている。

この変更は、後方互換であり、必要になるまでレンダリングされないだけである。


## Firefox での FOUC 対策

Firefox では、以下のように `<script>` をはさむことで CSS がロードされるまでパースをブロックし FOUC を回避できる。
`<script>` には中身が必要だが、これはスペース一つで十分である。

```html
<link rel="stylesheet" href="/article.css"><script> </script>
<main></main>
```


## まとめ

全てをまとめると、現状の Firefox, IE/Edge では Progressive Rendering が可能になる。
現状の Chrome & Safari では CSS がロードされるまで White Screen になるが、従来のように全てを `<head>` に置いていたのと比べれば問題ではない。
そして、数ヶ月以内には Chrome は IE/Edge の方式に移るので、問題は解決する。

これにより、 Just in time CSS が可能になり、レンダリングプロセスが最適化可能になる。
