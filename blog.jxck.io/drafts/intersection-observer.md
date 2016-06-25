# Intersection Observer を用いた要素出現検出の最適化

## Intro

スクロール時における DOM 要素の出現を効率よく検知するため、新しく Intersection Observer という API が追加された。

この API の使い方と、本サイトへの適用について記す。


## 要素出現の検出

ページをスクロールしていく過程で、特定の DOM が画面に出現したことをフックしたいケースがある。

代表例は **画像の遅延読み込み** であり、特に画像の多いページでは、初期ロードでは画像の取得を行わずスクロールしていく過程で順次取得することが、初期表示の高速化に大きく寄与する。

しかし、これを実行するためには、画面全体の scroll event を監視し、その中で画面のサイズと DOM 要素のサイズを計算し、交差判定を行う必要があった。

この実装にはいくつかの問題がある。

1. scroll event のハンドラが Scroll Junk を引き起こす可能性がある
1. サイズや位置を取得する API は Forced Synchronous Layout を発生させる
1. 全 scroll event での実施は回数が多いので、 throttling (まびき)を行う必要がある
1. API が分かりづらく、互換性も微妙で、単純に実装が面倒くさい


## 従来の方法

従来は以下のように、矩形の大きさを取得し、スクロール量から絶対位置を算出していた。




1 については、 undersocre.js の [throttle()](http://underscorejs.org/#throttle) 相当のものや、 Reactive Extension 系のライブラリを使うことで実現できる。

2 については、先日解説した [Passive Event Listener](https://blog.jxck.io/entries/2016-06-09/passive-event-listeners.html) を用いると解決が可能だ。

今回は、現時点で一番大きな問題である 3 について解説する。


### Forced Synchronous Layout

DOM の位置や大きさは、全体の


### 画面への出現判定

ある要素が画面に出現したかを検出する従来の方法は、ある時点での要素の位置が画面の表示範囲内に入っていることを、定期的(スクロールするたびなど)に調べることで実現できる。

要素の位置の調べ方は基本的には以下のようになる。

- scrollTop




これまでは `getBoundingClientRect()` を用いて取得していた。
しかし、 `getBoundingClientRect()` は、その要素を再レイアウト(re-layout)させるため、この処理がオーバーヘッドとなり、 Scroll Junk の原因となっていた。


## 図

先に図を示すと、こんな感じになっている。



## スクロール量(scrollTop)

ページがどの程度スクロールされたかという値である `$(window).scrollTop()` 相当。

基本は `document.documentElement.scrollTop` だが、互換モードでは `document.body.scrollTop` を使う。
しかし iPhone には `scrollTop` がないので、 `window.pageYOffset` を使うが、これは `window.scrollY` のエイリアスになってる。

要するに 4 つある。

- `document.documentElement.scrollTop`
- `document.body.scrollTop`
- `window.pageYOffset`
- `window.scrollY`

よくある話だ。


## 絶対位置(offsetTop)

body を親要素とすれば、そこからの offset 位置はドキュメント上の絶対一と考えることができる。

これは、要素自体が持っている。

```
let target = document.querySelector('.target');
// target.offsetTop;
// target.offsetHeight;
// target.offsetWidth;
// target.offsetLeft;
```


## 相対位置(getBoundingClientRect)

対象の DOM が、現在画面表示上どの位置にあるか。
scroll するたびに変わる値で、常に表示領域の中の位置になる。

これは、対象 DOM の `getBoundingClientRect()` で取れる。

```
let rect = target.getBoundingClientRect();
// rect.top;
// rect.bottom;
// rect.height;
// rect.left;
// rect.right;
// rect.width;
```


## 出現取得

例えば、画面をスクロールし、画面の中に対象の DOM が入っていることは、以下のように判定できる。

- `0 < rect.top && rect.top < clientHeight`       (対象の上端は表示領域に入っている)
- `0 < rect.bottom && rect.bottom < clientHeight` (対象の下端は表示領域に入っている)
- `rect.top < 0 && clientHeight < rect.bottom`    (上端下端も表示されてないがその間が表示されている)

この三つの論理和が満たされれば、どこかしらが表示されている。

これを onscroll イベントごとに行えば、 DOM の出現監視になる。

もちろん、親要素を変えれば、 Body 以外の要素でのスクロールによる出現にも対応できる。


## Intersection Observer

Intersection Observer は交点(Intersection) を監視し、指定した要素同士の交差が発生したら、イベントを発火する Observer である。

これを用いて、親要素内で Scroll している要素が、親要素と交差した時点を取得することで、画面への出現を知ることができる。

交点の検出処理は、ブラウザが内部で行っているため、前述のような Scroll イベント内での同期処理などは一切必要がなくなる。

これにより、 Scroll Junk の原因が除去され効率良く実装することが可能となる。


```js
let observer = new IntersectionObserver((changes) => {
  for (let change of changes) {
    console.log(change);
    console.log(change.time);               // timestamp
    console.log(change.rootBounds);         // root の getBoundingClientRect()
    console.log(change.boundingClientRect); // target の getBoundingClientRect()
    console.log(change.intersectionRect);   // 交差領域の getBoundingClientRect()
    console.log(change.intersectionRatio);  // 交差している領域の割合
    console.log(change.target);             // target
  }
});
observer.observe(target);
```







http://qiita.com/ANTON072/items/32ee03c5d23e6bde73df
