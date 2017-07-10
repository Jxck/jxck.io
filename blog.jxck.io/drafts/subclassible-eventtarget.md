# [event target]][event emitter] EventTarget の継承可能化による EventEmitter の代替

## Intro

[念願](https://twitter.com/Jxck_/status/826004140211843072) だった EventTarget の constructible/subclassable が DOM の仕様にマージされた。

これにより、いわゆる EventEmitter のブラウザ移植が不要になることが期待される。

[Allow constructing and subclassing EventTarget](https://github.com/whatwg/dom/commit/c4c1c8b47340a1e5ecc1a07670927b831f240586)


## EventTarget

[EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) には `addEventListener`, `removeEventListener`, `dispatchEvent` が定義されている。

これは、ブラウザが内部で生成する Event や、任意に生成された CustomEvent を発火/補足するために利用される。


```js
callback = console.log.bind(console)
$div = document.createElement('div')
$div.addEventListener('foo', callback)
$div.dispatchEvent(new CustomEvent('foo', {detail:'bar'}))
// CustomEvent {type: "foo", detail: 'bar'...
$div.removeEventListener(callback)
```

この場合、 `$div` は `Element < Node < EventTarget` と、祖先に EventTarget を持っている。

同様に EventTarget を祖先に持つ要素では、このパターンのハンドリングが可能であるが、任意のクラスを EventTarget にすることができなかった。


## EventEmitter

Node では EventEmitter が、メソッド名は違えど同等の役割を果たしていると言える。


```js
callback = console.log.bind(console)
process.on('foo', callback)
process.emit('foo', 'bar)
// bar
process.removeListener(callback)
```

大きな違いは、 EventEmitter が任意のクラスで継承できる点だ。
したがって、非同期処理をクラスに閉じ込め、加工したイベントとして外に公開するといった設計が可能になる。

以下は `setInterval` を抽象化したタイマの例だ。

```js
class Timer extends EventEmitter {
  constructor(interval) {
    super()
    setInterval(() => {
      this.emit('tick')
    }, interval)
  }
}

timer = new Timer(100)
timer.on('tick', console.log.bind(console))
```


またこうしたイベントの抽象化の先に stream がある。


## EventEmitter porting

これまでは、ブラウザ上で任意の class を EventTarget にすることができなかった。

そこで、 Node における EventEmitter を用いた設計と同等のことを行うためには、 EventEmitter のポーティングなどが利用されていた。

例えば browserify は [https://github.com/Gozala/events](https://github.com/Gozala/events) を使っており、筆者も[同じようなこと](https://github.com/jxck/events) をしたことがある。

しかし、こうした汎用的な処理をより効率よく実現するために、 EventTarget が継承可能となる仕様が追加された。


- [Allow constructing and subclassing EventTarget](https://github.com/whatwg/dom/commit/c4c1c8b47340a1e5ecc1a07670927b831f240586)
- [Make EventTarget subclassable #441](https://github.com/whatwg/dom/issues/441)


実装されれば、メソッド名をすり合わせる目的以外で EventEmitter porting は不要となるだろう。


## constructible/subclassable EventTarget

具体的には以下のようなコードが書けるようになる。
(実装がないため動作未確認)


```js
class Timer extends EventTarget {
  constructor(interval) {
    super()
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('tick')
    }, interval)
  }
}

timer = new Timer(100)
timer.addEventListener('tick', console.log.bind(console))
```


EventTarget を元に EventEmitter の shim を書く場合も、メソッドのすり合わせを中心としたコードに留めることができるだろう。

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


ブラウザに実装が進むことを期待している。
