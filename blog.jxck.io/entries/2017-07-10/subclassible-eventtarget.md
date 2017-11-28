# [event target][event emitter] EventTarget の継承可能化による EventEmitter の代替

## Intro

[念願](https://twitter.com/Jxck_/status/826004140211843072) だった EventTarget の constructible/subclassable が DOM の仕様にマージされた。

これにより、いわゆる EventEmitter のブラウザ移植が不要になることが期待される。

[Allow constructing and subclassing EventTarget](https://github.com/whatwg/dom/commit/c4c1c8b47340a1e5ecc1a07670927b831f240586)


## Update

Chrome Canary 64 で実装が確認できたため、 DEMO を追加した。


## EventTarget

[EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) には `addEventListener`, `removeEventListener`, `dispatchEvent` が定義されている。

これは、ブラウザが内部で生成する Event や、任意に生成された CustomEvent を発火/補足するために利用される。


```js:et.js
```

この場合、 `$div` は `Element < Node < EventTarget` と、祖先に EventTarget を持っている。

同様に EventTarget を祖先に持つ要素では、このパターンのハンドリングが可能であるが、任意のクラスを EventTarget にすることができなかった。


## EventEmitter

Node では EventEmitter が、メソッド名は違えど同等の役割を果たしていると言える。

例えば `process` は EventEmitter を継承している。


```js:ee.js
```

大きな違いは、 EventEmitter が任意のクラスで継承できる点だ。

したがって、非同期処理をクラスに閉じ込め、加工したイベントとして外に公開するといった設計が可能になる。

以下は `setInterval` を抽象化したタイマの例だ。


```js:timer-ee.js
```

またこうしたイベントの抽象化の先に stream がある。


## EventEmitter porting

これまでは、ブラウザ上で任意の class を EventTarget にすることができなかった。

そこで、 Node における EventEmitter を用いた設計と同等のことを行うためには、 EventEmitter のポーティングなどが利用されていた。

例えば browserify は [https\://github.com/Gozala/events](https://github.com/Gozala/events) を使っており、筆者も[同じようなこと](https://github.com/jxck/events) をしたことがある。

しかし、こうした汎用的な処理をより効率よく実現するために、 EventTarget が継承可能となる仕様が追加された。

- [Allow constructing and subclassing EventTarget](https://github.com/whatwg/dom/commit/c4c1c8b47340a1e5ecc1a07670927b831f240586)
- [Make EventTarget subclassable #441](https://github.com/whatwg/dom/issues/441)

実装されれば、メソッド名をすり合わせる目的以外で EventEmitter porting は不要となるだろう。


## constructible/subclassable EventTarget

具体的には以下のようなコードが書けるようになる。


```js:timer-et.js
```

EventTarget を元に EventEmitter とメソッド名をすり合わせた shim を書く場合は以下のような感じだろうか。


```js
class EventEmitter extends EventTarget {
  constructor() {
    // snip
  }

  on(type, listener) {
    this.addEventListener(type, listener)
  }


  emit(type, val) {
    this.dispatchEvent(new CustomEvent(type, {detail: val}));
  }

  // ... and more
}
```

ただし、 EventEmitter は EventTarget よりも機能が多く、例えば `listeners()` や `eventNames()` などは、 EventTarget への移譲だけでは実装できない。

それらが必要な場合は、別途イベントとリスナの管理が必要になるだろう。こうした機能が必要な場合は、要するに EventEmitter そのものを必要としてるということなので、 porting は依然必要になる。

しかし、 EventTarget 相当を実現するためだけに EventEmitter を導入していた場合は、 EventTarget が継承できるだけで十分な場合も少なくはないだろう。

その場合はネイティブの実装だけで足りるようになるため、実装が進むことに期待したい。


## DEMO

動作する DEMO を以下に用意した。

[EventTarget DEMO](http://labs.jxck.io/event-target/)
