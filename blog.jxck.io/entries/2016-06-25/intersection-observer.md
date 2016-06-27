# [intersection observer][scroll][performance] Intersection Observer を用いた要素出現検出の最適化

## Intro

スクロールによる DOM 要素の出現などを効率よく検知するため、新しく Intersection Observer という API が追加された。

この API の使い方と、本サイトへの適用について記す。


## 要素交差(intersection)の検出

ページをスクロールしていく過程で、特定の DOM が画面に出現したことをフックしたいケースがある。

代表例は **画像の遅延読み込み** であり、初期ロードでは画像の取得を行わずスクロールしていく過程で順次取得する手法である。特に画像の多いページで、初期表示の高速かに寄与する場合がある。

これを実装するのに必要なのは、「 `<img>` 要素が出現しているかどうか」であるが、見た方を変えれば「画面外にあった `<img>` が viewport と交差したか」と言える。

つまり、 **要素出現の取得** は、 **要素同士の交差取得** として汎用化し、その一例と見ることができる。

新しく追加された、 Intersection Observe は「対象の親要素」と「対象の要素」が **交差(Intersect)したことを取得する API** である。


## 従来の方法

従来は、どのようにして要素の交差を取得していたかを振り返ろう。

まず、要素の位置に関する API は以下のようになっている。

**ただし、これは互換性の問題を多く含んでいるため、厳密には色々あるが、調べるのが面倒だったので単なる参考として載せる**


### 図

先に全体図を示す。今回は上下方向にのみ注目する。

![dom-size-potision-api](dom-size-potision-api.svg#700x818 'DOM のサイズと位置に関する API')


### スクロール量(scrollTop)

ページがどの程度スクロールされたかという値である。

基本は `document.documentElement.scrollTop` だが、互換モードでは `document.body.scrollTop` を使う。
しかし iPhone には `scrollTop` がないので、 `window.pageYOffset` を使うが、これは `window.scrollY` のエイリアスになってる。

要するに 4 つある。

- `document.documentElement.scrollTop`
- `document.body.scrollTop`
- `window.pageYOffset`
- `window.scrollY`

よくある話だ。


### 絶対位置(offsetTop)

body を親要素とすれば、そこからの offset 位置はドキュメント上の絶対位置と考えることができる。

これは、要素自体が持っている。

```
let target = document.querySelector('.target');
// target.offsetTop;
// target.offsetHeight;
// target.offsetWidth;
// target.offsetLeft;
```


### 相対位置(getBoundingClientRect)

対象の DOM が、現在画面表示(viewport)上どの位置にあるか。
スクロールするたびに変わる値で、常に表示領域の中の位置になる。

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


### 出現取得

ここまでを踏まえると、画面をスクロールし、画面の中に対象の DOM が入っていることは、以下のように判定できる。

```js
   (0 < rect.top && rect.top < clientHeight)       // 対象の上端は表示領域に入っている
|| (0 < rect.bottom && rect.bottom < clientHeight) // 対象の下端は表示領域に入っている
|| (rect.top < 0 && clientHeight < rect.bottom)    // 上端下端も表示されてないがその間が表示されている
```

この三つの論理和が満たされれば、どこかしらが表示されている。

もちろん、計算基準の親要素を変えれば、 viewport 以外の要素でのスクロールによる出現にも対応できる。

### onscroll イベント

上記の判定は、スクロールするたび、つまり onscroll イベントごとに計算すれば DOM の出現監視になる。

ただし、 onscroll は発生頻度が非常に多いため、愚直にコールバックに指定してしまうと、ボトルネックになり Scroll Junk を引き起こす可能性がある。

対策としては、まずコールバックを実行するイベントを間引く throttling がある。

たとえば、 underscore.js の [throttle()](http://underscorejs.org/#throttle) 相当のものや、 Reactive Extension 系のライブラリを使うことで実現できる。

また、計算処理のみでコールバックを抜けるのであれば、 `.preventDefault()` を呼ばないため、別エントリで解説した Passive Event Listener を利用できる。

- [Passive Event Listeners によるスクロールの改善](https://blog.jxck.io/entries/2016-06-09/passive-event-listeners.html)


### Scroll & Position API DEMO

ここまでの API の値の変化を確認するデモを以下に用意した。

- [Scroll & Position API DEMO](https://labs.jxck.io/intersection-observer/size.html)


## 問題点

さて、ここまで見て来た方法には問題が多くあった。

1. scroll event のハンドラが Scroll Junk を引き起こす可能性がある
1. 全 scroll event での実施は回数が多いので、 throttling (まびき)を行う必要がある
1. サイズや位置を取得する API は Forced Synchronous Layout を発生させる
1. API が分かりづらく、互換性も微妙で、単純に実装が面倒くさい

ここでは 3 に注目したい。


### Forced Synchronous Layout

ここまでに紹介した、 `scrollTop`, `offset*`, `getBoundingClientRect()` などの呼び出しは、その時点での DOM の位置を取得するために、 Layout 計算を行う。

この計算は同期処理であり、つまりブロックが発生する。さらにそれを onscroll など頻度の高いイベントの中で行うのは、ブラウザの表示を阻害しスムーズなスクロール表示を阻害してしまう。

そこで、この頻出処理をブラウザのネイティブ API として実装し、より効率良く実装するのが、今回紹介する Intersection Observer である。


## Intersection Observer

Intersection Observer は交点(Intersection) を監視し、指定した要素同士の交差が発生したら、イベントを発火する Observer である。

交点の検出処理は、ブラウザが内部で行っているため、前述のような onscroll 内での同期処理などは一切必要がなくなる。

逆を言えば、スクロール以外による交差の発生も一括して取得することが可能になる。

これにより、 Scroll Junk の原因が除去され効率良く実装することが可能となる。

## API

コールバックとオプションを指定し、 Intersection Observer Class を生成する。
任意の DOM 要素を `observe()` メソッドを指定することで、対象を監視する。

複数要素を同じように監視する場合は、同じ Inetrsection Observer インスタンスで、 observe を複数回呼ぶことができる。

```js
let observer = new IntersectionObserver((changes) => {
  for (let change of changes) {
    console.log(change);
  }
}, option);
observer.observe(target);
```

### callback

複数の DOM を監視した場合は、一つのイベントで複数の変更が取得されるため、コールバックの引数は監視した DOM の数だけ入ってくる。

一つの変更は以下のプロパティを持つ

- `change.time`               : タイムスタンプ
- `change.rootBounds`         : root の `getBoundingClientRect()`
- `change.boundingClientRect` : target の `getBoundingClientRect()`
- `change.intersectionRect`   : 交差領域の `getBoundingClientRect()`
- `change.intersectionRatio`  : 交差している領域の割合
- `change.target`             : target


![intersection-observer](intersection-observer.svg#500x357 'Intersection Observer API')

特に `change.intersectionRect` および `change.intersectionRatio` は、自分で計算するとボトルネックになりがちである。

第二引数には、オプションには三つのプロパティを設定したオブジェクトを指定できる。


```js
let observer = new IntersectionObserver((changes) => {
  // callback
}, {
  root: document.querySelector('.target'),
  threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
  rootMargin: '10px',
});
observer.observe(target);
```

### root

デフォルトでは、 viewport を対象にした交差検出を行うことができるが、これはデフォルトの root が document 自身になっているからである。

root オプションを用いることで、任意の親要素内を指定できるため、例えば `overflow: scroll` になった div の中のリストなどを指定することができる。


### threshold

`change.intersectionRatio` によって、交差している領域の割合を取得することができるが、コールバックが呼ばれるタイミングが交差のタイミングだけだと、 0% や 100% など、あまり約に経たない値しか出ない。

これは、表示が 0 (表示されてない), 100 (全て表示されている) のどちらかしかないためである。

イベント発生頻度を増やすには、 threshold オプションを使うことができる。

例えば、以下のように引数を設定すれば、交差領域が 20% 変化する毎にコールバックを呼ぶことが出来る。

これにより、表示領域の変化に合わせたインタラクションも実装が可能になる。


### rootMargin

画像の遅延読み込みなどを実装したい場合は、 viewport を root として `<img>` を IntersectionObserver で監視するだろう。

これにより、 viewport 上に `<img>` が出現したことを検出し、そこで画像の取得を走らせることができる。

しかし、 viewport 上に表示されてから取得しては少し遅い場合がある。できれば、表示される少し前にそれが分かっていれば、小さい画像なら空の `<img>` を出すことすらなく済むかもしれない。

こうした場合は rootMargin オプションを指定することができる。

値は CSS の margin への指定と同じだ、例えば以下のように設定すれば、上下左右が交差する 10px 手前でイベントが発火する。


### Intersection Observe DEMO

Intersection Observer を用いた、基本的なデモを用意した。
threshold を 10% にし、 intersectionRatio を表示するように実装している。

- [Intersection Observer DEMO](https://labs.jxck.io/intersection-observer/intersection.html)


また以下に Intersecton Observer と、それ以前の API で、要素出現の検出を比較する DEMO を用意した。
こちらは、 `overflow: scroll` な div を親とする出現検出も含めてある。

- [Visibility Change DEMO](https://labs.jxck.io/intersection-observer/visibility-change.html)


## 本サイトへの適用

この機能を用いて、本サイトでも画像の遅延読み込みを実装するつもりでいる。

しかし、本サイトでは Service Worker や HTTP2 Push など他の最適化戦略も併用する予定であるため、検証がまだ追いついていない。

また、現状では最適化した SVG がほとんどであるため、画像の取得がボトルネックと見直すには弱い場合が多く、行ったん見送ることにした。

将来的に最適化戦略がおちついたら、追記する。


## Links

- [Intersection Observer Spec](http://rawgit.com/WICG/IntersectionObserver/master/index.html)
- [Intersection Observers Explained](https://github.com/WICG/IntersectionObserver/blob/gh-pages/explainer.md)
- [What forces layout/reflow. The comprehensive list.](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
