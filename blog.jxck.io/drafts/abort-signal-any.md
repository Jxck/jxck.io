# AbortSignal.any()

## Intro

AbortSignal.any() が定義され、実装が進んでいる。

## Abort 後のリソース処理

AbortSignal によって、非同期処理のキャンセルが可能になった。例として、ユーザのキャンセル操作がある `fetch()` は以下のように書くことができる。

```js
const controller = new AbortController()
const signal = controller.signal

// ユーザ操作でキャンセル
$cancel.addEventListener("click", () => {
  controller.abort()
})

const res = await fetch("/resources", { signal })
```

ここで、タイムアウトによるキャンセルも同時に実装する。

```js
const controller = new AbortController()
const signal = controller.signal

// ユーザ操作でキャンセル
$cancel.addEventListener("click", () => {
  controller.abort()
})

// タイムアウトによるキャンセル
setTimeout(() => {
  controller.abort()
}, 3000)

const res = await fetch("/resources", { signal })
```

このように 1 つの AbortController を取り回してもよいが、この方法ではユーザのキャンセルやタイムアウトが `fetch()` 以外もコントロールする場合に、取り回しがあまりよくない。

そこで、イベントごとに AbortSignal を生成するようにリファクタリングしてみる。


```js
// ユーザ操作でキャンセル
const userCancelController = new AbortController()
const userCancelSignal = userCancelController.signal
$cancel.addEventListener("click", () => {
  userCancelController.abort()
})

// タイムアウトによるキャンセル
const timeoutController = new AbortController()
const timeoutSignal = timeoutController.signal
setTimeout(() => {
  timeoutController.abort()
}, 3000)
```

しかし、 `fetch` は Signal を 1 つしかとらないため、この 2 つは連携させる必要がある。


```js
const controller = new AbortController()
const signal = controller.signal

// ユーザキャンセルを連携
userCancelSignal.addEventListener("abort", () => {
  controller.abort()
})

// タイムアウトを連携
timeoutSignal.addEventListener("abort", () => {
  controller.abort()
})

// ユーザキャンセル/タイムアウトで Abort
const res = await fetch("/resources", { signal })
```


しかし、この実装には注意点がある。ユーザが何もせずタイムアウトした場合、 `controller` はもう用が済んでいるにもかかわらずコールバックに参照が残るため、これが積もるとメモリリークが起きる可能性がある。

それを防ぐには、 `signal` が `abort()` されたタイミングで、参照を保持するハンドラを全て削除するといった実装が望ましい。

```js
signal.addEventListener("abort", () => {
  // 不要なハンドラを削除する
})
```

もちろん、キャンセルもタイムアウトもなく `fetch()` が終わった場合も、処理を行う必要はある。

## AbortSignal.timeout() と AbortSignal.any()

```js
const controller = new AbortController()

// ユーザ操作でキャンセル
$cancel.addEventListener("click", () => {
  controller.abort()
})

// タイムアウト
const timeout = AbortSignal.timeout(3000)

const signal = AbortSignal.any([contorller.signal, timeout])

const res = await fetch("/resources", { signal })
```

しかし、 AbortSignal を受け取る API は、基本的に 1 つの Signal しか受け取らないため、複数の Abort が関わるコードでは、多少の工夫が必要だった。
