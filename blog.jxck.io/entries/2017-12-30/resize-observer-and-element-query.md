# [element query][resize observer][performance] ResizeObserver による変更検知と Element Query

## Intro

ResizeObserver の ship が進みつつある。

この仕様の解説および、 ElementQuery / ContainerQuery について解説する。

[Resize Observer 1](https://wicg.github.io/ResizeObserver/)


## ResizeObserver

ResizeObserver は、最近増えつつある ObserverFamily の 1 つであり、要素のリサイズを検知するインタフェースである。

リサイズを検知したい要素をターゲットに `observe()` すると、ターゲットと矩形情報が取得できる。


```javascript
const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach(({target, contentRect}) => {
    console.log(target)
    const {x, y, width, height, top, right, bottom, left} = contentRect
    console.log(x)
    console.log(y)
    console.log(width)
    console.log(height)
    console.log(top)
    console.log(right)
    console.log(bottom)
    console.log(left)
  })
})
resizeObserver.observe(element)    // 検知開始
resizeObserver.unobserve(element)  // 検知終了
resizeObserver.disconnect(element) // 解放
```

基本的な Observer のインタフェースのため、使い方もそこまで難しくない。

DEMO: <https://labs.jxck.io/resize-observer/basic.html>


## onresize

レスポンシブ要件を満たす上で、 window のサイズが変更されたことを取得するため、 `resize` イベントが使われた。

DEMO: <https://labs.jxck.io/resize-observer/onresize.html>

これは window のみに発火するため、 window は不変のまま子要素の変更だけを取ることができなかった。

そこで導入されたのが ResizeObserver であったわけだが、ではなぜ `resize` イベントを子要素に適用しなかったか。

`resize` イベントは、そもそも view-port に対して定義されており、さらに *変更したこと* だけを伝える仕様になっている。

[12.1. Resizing viewports \| CSSOM View Module](https://drafts.csswg.org/cssom-view/#resizing-viewports)

つまり、 resize された結果を取得するためには、 `target` を辿りサイズを取得する必要が出る。


```javascript
window.addEventListener('resize', (e) => {
  const width  = e.target.outerWidth
  const height = e.target.outerHeight
  console.log({width, height})
})
```

DEMO: <https://labs.jxck.io/resize-observer/onresize.html>

また、これを子要素で適用した場合は、 `scrollTop`, `offset`, `getBoundingClientRect()` などを用いることになるだろう。

これらは同期計算のため、 Forced Synchronous Layout を引き起こし、要素のリサイズ処理がガタつくことになってしまう。

Observer を定義することにより、こうした処理を行わずに変更情報のセットを取得できるため、パフォーマンス上の問題を解決できる。

こうしたコンセプトは、 IntersectionObserver が定義されたモチベーションと同じだと考えて良いだろう。

[Intersection Observer を用いた要素出現検出の最適化 \| blog.jxck.io](https://blog.jxck.io/entries/2016-06-25/intersection-observer.html)


## resize event polyfill

仮に、 Observer のインタフェースを Event 側に寄せたいというのであれば、以下のように CustomEvent を定義することもできるだろう。

必要に応じて [Passive Event Listener](https://blog.jxck.io/entries/2016-06-09/passive-event-listeners.html) を検討する必要がある。


```javascript
const $target = document.querySelector('textarea')
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const resize = new CustomEvent('resize', { detail: entry });
    $target.dispatchEvent(resize)
  }
})
resizeObserver.observe($target)

$target.addEventListener('resize', ({detail: entries}) => {
  console.log(entries.contentRect)
}, {passive: true})
```

DEMO: <https://labs.jxck.io/resize-observer/onresize-polyfill.html>


## Element Query

[ElementQuery](http://elementqueries.com/) は MediaQuery の要素版といったコンセプトで作られたライブラリである。

例えば以下のように、 `min-widht` を境に色を変えるといったことが可能になる。


```css
@element .minwidthpixels and (min-width: 500px) {
  .minwidthpixels {
    background: gold;
  }
}
```

DEMO: <http://elementqueries.com/#min-width-in-pixels>

この程度単純な用途であれば ResizeObserver のハンドラ内で CSS の class を toggle するくらいでも実現できる。

しかし、 EQ はあくまでスタイル定義を CSS 側で完結させるためのライブラリであるため、 Media Query に習い Custom at-rule (`@element`) を定義している。

これを実現するため、実装は以下のようなことを行なっている。

- CSS の独自拡張
- CSS パース
- 要素の変更検知

最後の変更検知は、ライブラリ内では Throttling 付きの `setInterval()` で行なっているため、 ResizeObserver を用いた実装でかなり効率化できるだろう。

CSS に持ってくるには、 Houdini で策定中の [CSS Parser API](https://drafts.css-houdini.org/css-parser-api/) と [CSS Typed OM Level 1](https://drafts.css-houdini.org/css-typed-om/#normalize-var) あたりが実装されるとネイティブで `@lement` を Custom At-Rules として実装できるようになるだろう。


## Container Query

[Container Query](https://au.si/css-container-element-queries) は Element Query と似ているが、文字通り対象を親要素に置いている。

例えば、親要素のサイズに応じて子要素のレイアウトを変えたい場合は、 Element Query のスコープで以下のように定義ができる。


```css
@element '#sidebar' and (max-width: 300px) {
  #sidebar .widget {
    font-size: 10pt;
  }
}
```

一方これを Pseudo Element で定義する提案もある。


```css
.element:container(width >= 100px) {
  /* If its container is at least 100px wide */
}

.element:container(height > 100px < 200px) {
  /* If its container is between 100px and 200px high */
}

.element:container(text-align = right) {
  /* If its container has a right text-align */
}
```

擬似要素で行う場合にも、同じように Houdini の API が揃うと、別途自前でパースする必要もなく実装が可能になるだろう。

いずれも提案自体はかなり前からあるが、実装の改善がかのうになりそうだ。


## まとめ

ResizeObserver によって、単一要素のリサイズがとれるようになり、それを起点にしたよりレスポンシブなレイアウトが可能となった。

ここに Parser API や Custom At-Rule, Custom Puesud Element が実装可能になれば、ライブラリとしての Element Query 実装もかなり改善されるだろう。

より広範囲に渡るレイアウトについては、将来的には Layout API によって Worklet に落とした実装が可能なるかもしれないが、部分的な用途ではこうした方法も選択肢に入りそうだ。
