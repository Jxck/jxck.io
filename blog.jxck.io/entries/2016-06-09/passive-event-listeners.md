# [rendering][performance] Passive Event Listeners によるスクロールの改善

## Intro

DOM のイベントリスナの仕様に Passive Event Listeners というオプションが追加された。

このオプションは、主にモバイルなどでのスクロールの詰まり(Scroll Jank) を解決するために導入されたものである。

今回は、この仕様が解決する問題と、本サイトへの適用を解説する。

[Passive Event Listeners Spec](https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md)


## Scroll Event の PreventDefault()

画面のスクロールに合わせたインタラクションを実装する場合、 Scroll Event にイベントリスナを登録する。

典型的な例では `touchstart` や `touchend` をフックし、その中で DOM の操作などを実施するなどがある。

場合によってはイベントリスナ内で `preventDefault()` を呼ぶことで、スクロールそのものを止めることもできる。

実はこれが Scroll Jank の原因となることが非常に多いことがわかっている。


## Scroll Jank

ブラウザは、単純なドキュメントであれば、そのスクロールがスムーズになるように最適化することができる。

しかし、 Scroll Event にイベントリスナが登録された場合、そのイベントリスナの中で `preventDefault()` が呼ばれる場合は、スクロールを止めなくてはいけない。

ところが、登録されたイベントリスナの中で `preventDefault()` が実行されるかどうかは、実際にイベントリスナを実行してみないとわからない。

つまりブラウザは、 Scroll Event にイベントリスナが登録されている場合、ハンドラの実行が終了し `preventDefault()` が呼ばれなかったことを確認してからでないと、スクロールすることができない。

これが Scroll Jank が発生する原因となる。


## 影響

イベントリスナを実際に実行し、その処理が終わるまで `preventDefault()` が呼ばれるかどうかわからないため、 Scroll Jank がおこる。

つまり、 Scroll Event に登録されたイベントリスナの実行時間が長ければ長いほど、 Scroll Jank の影響が大きくなる。

Chrome は現在、実行時間の長いリスナが登録された場合、以下のような警告を devtools に表示する。

> explainer.md#the-problem:1 Deferred long-running timer task(s) to improve scrolling smoothness. See crbug.com/574343.

ただし、イベントリスナの実行自体にも多少のオーバーヘッドがあるため、空のイベントリスナを登録しただけでも、ブラウザのスクロール最適化を邪魔するには十分であり、影響がでることも確認されている。

仕様には Scroll Event にイベントリスナを登録したサイトの中で、実際に `preventDefault()` を呼ぶのは 20% 程度という調査結果が記載されている。

これは 80% のケースで、ブラウザがリスナの完了を待つことなくスクロールしても問題がなかったということを意味している。


## Passive Event Listeners

もし、ブラウザがリスナを実行する前に、リスナが `preventDefault()` を呼ばないことを保障できればこの問題は解決する。

この `preventDefault()` を呼ばないリスナを **Passive Listener** と表現する。

そして、登録したリスナが **Passive Listener** であることを明示するのが、今回追加された `passive` フラグである。

この値は、同じく今回追加された `addEventListener()` の第三引数に渡す **Event Listener Options** で指定する。


```js
document.addEventListener('touchstart', handler, {passive: true});
```


開発者がこれを明示的に指定することで、ブラウザはリスナが `preventDefault()` を呼ばないことを前提とできるため、リスナの完了を待たずにスクロールすることができ、それを最適化できる余地が生まれる。

なお Passive Listener 内で `preventDefault()` を呼んだ場合は無視されるため、呼んだとしても `defaultPrevented=false` のままになる。

Listener 内で `preventDefault()` を呼べるかどうかは、 `cancelable=true` となっているかどうかでわかる。


| listener | cancelable  | preventDefault | defaultPrevented |
|:---------|:------------|:---------------|:-----------------|
| normal   | true        | cancel default | false - true     |
| passive  | false       | ignored        | false - false    |



## Event Listener Options

`addEventListener` の第三引数は、すでに `useCapture` として boolean が定義されている。

これが `true` の場合は、イベントはバブリングフェーズではなく、キャプチャリングフェーズで発火されることになる。

Event Listener Options 対応以降は、ここにオブジェクトを渡すことになるため、 `useCapture` フラグ相当は、 `{capture: true}` としてプロパティによる定義を行う。


```js
// before
document.addEventListener('touchstart', handler, true);

// after
document.addEventListener('touchstart', handler, {capture: true});
```

引数をオブジェクトにしたことにより、フラグの追加に対して開いた設計となるため、ここに Passive フラグを付け加えることができるわけである。

今後リスナに対する新たなオプション(ブラウザが実行前に知りたい内容)を追加する場合にも、同様に追加が可能となる。


## Feature Detection

引数をオブジェクトにした結果、 Passive 用に引数を追加するよりも柔軟な設計となったが、互換性の問題が発生してしまう結果となった。

これは `{passive: true}` は JS としては trusy であるため、第三引数が Event Listener Option に対応してないブラウザにおいて単に `useCapture` を有効にしたと解釈されてしまうためにおこる。

例えばキャプチャリングフェーズでの補足を `false` にする指定を Event Listener Options で指定した場合、古いブラウザでは意図に反して `useCapture` を `true` にしたと解釈されてしまうのである。


```js
document.addEventListener('touchstart', handler, {capture: false});
```


これを避けるためには Feature Detection が必要となる。

スペックにサンプルが掲載されているので、引用しコメントで解説を追記する。

```js
var supportsPassive = false;
try {
  // getter として opt.get を定義して、 addEventListener 内で呼ばれたことがわかるようにする
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      // 内部で opts.capture が呼ばれたら対応ブラウザ
      // 用意しておいたフラグを有効にする
      supportsPassive = true;
    }
  });
  // ためにし適当なイベントを補足し、 opts.get が呼ばれるか試す
  window.addEventListener("test", null, opts);
} catch (e) {}

function addEventListenerWithOptions(target, type, handler, options) {
  var optionsOrCapture = options;
  if (!supportsPassive) {
    // 非対応ブラウザでは、他のオプションは全て捨て
    // { capture: bool } の値を useCapture の値として採用する
    optionsOrCapture = options.capture;
  }
  //
  target.addEventListener(type, handler, optionsOrCapture);
}
```

https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection


## Demo

長いドキュメントで、 touchstart イベントにあえて遅延を入れたデモを用意した。
ここに、 Passive オプション指定の有無による挙動の変化を試すことができる。

- http://labs.jxck.io/passive-event-listener/index.html


## 本サイトへの適用

特に scroll event を使ってはおらず、また別途 passive にすることでメリットのある JS も無いため、現時点での採用は無い。

採用した場合はここを更新する。


## Intersection Observer

Scroll にハンドラを補足するユースケースの一つに、画面のスクロール位置取得がある。

画面のどの分が表示されているかを `scrollTop()` などを用いて測定することで、インタラクションを実施する手法として知られている。

こうした場面で、 Passive Listenr を指定する効果が予想される。

しかし、この場面では要素の出現と位置をより効率的に取得する Intersection Observer という仕様が提案されている。

実装されれば、こちらを用いる方が Scroll を監視するよりも正確かつ効率がよく実装が可能となる。

本サイトでも追って解説を行う予定である。

- https://github.com/WICG/IntersectionObserver/blob/gh-pages/explainer.md


## Links

- https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
- https://blog.chromium.org/2016/05/new-apis-to-help-developers-improve.html
