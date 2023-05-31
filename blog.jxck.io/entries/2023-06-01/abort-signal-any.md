# [timeout][abortsignal][promise] AbortSignal.any(), AbortSignal.timeout(), そして addEvnetListener の Signal

## Intro

最近 `AbortSignal.any()` が提案され、急速に実装が進んでいる。

すでに定義されている `AbortSignal.timeout()` や `addEventListener` への Signal なども含め、非同期処理の中断を実装する際の API はかなり整備されてきた。

これら API のモチベーションと設計を中心にまとめる。


## Abort 後のリソース解放

AbortSignal によって、非同期処理のキャンセルが可能になった。例として、 Server 上での Fetch のタイムアウトの例を考えよう。

```js
app.get("/entries", (req, res) => {
  const perRequestController = new AbortController()
  const perRequestSignal = perRequestController.signal

  // 1s でタイムアウト
  const timeoutId= setTimeout(() => {
    perRequestController.abort()
  }, 1000)

  const entries = await fetch("https://api.example/entries", { signal: perRequestSignal })
  clearTimeout(timeoutId)

  /* ~~~~~ */

  res.send(/*response*/)
})
```

ここで `perRequestController` はあくまで Request のハンドラに閉じているため、 Response を返したら全て消える。

次に、この Server プロセスが `SIGINT` 時に、連動して実行中の Fetch を止めたい場合を考えてみよう。

```js
const rootController = new AbortController()
const rootSignal = rootController.signal

process.on("SIGINT", () => {
  rootController.abort()
})


app.get("/entries", (req, res) => {
  const perRequestController = new AbortController()
  const perRequestSignal = perRequestController.signal

  // 1s でタイムアウト
  const timeoutId = setTimeout(() => {
    perRequestController.abort()
  }, 1000)

  // SIGINT と連動
  rootController.on("abort", () => {
    perRequestController.abort()
  })

  const entries = await fetch("https://api.example/entries", { signal: perRequestSignal })
  clearTimeout(timeoutId)

  /* ~~~~~ */
  res.send(/*response*/)
})
```

さて、この実装には問題がある。

Request の処理が終わっても `rootController` のハンドラはクリーンアップされないため、このコードでは Request ごとにハンドラを付与し続けることになる。そこに `perRequestController` の参照も残り続けるため、メモリーリークすることになる。

`rootController.once()` にしても `SIGINT` が発火しない限り残るので意味はない。正しくは Response が正常に返された後に `rootController` (と、本来なら `setTimeout`) のハンドラを削除する必要がある。

ところが、このミスは非常に多く発生し、特に `AbortSignal` を連携する場面では、親が子の参照を保持することによるメモリーリークは珍しいことではないようだ。

実際 Node も `timer` の中で発生しており、それを直すと同時に、こうしたバグを防ぐため `maxListeners` というスレッショルドを実装したいという Issue が MS の Benjamin によって立てられた。

- Warn on EventTarget maxListeners > THRESHOLD · Issue #35990 · nodejs/node
  - https://github.com/nodejs/node/issues/35990


## AbortController.prototype.follow(signal)

スレッショルドを実装したところで、根本の問題は解決しない。そこで、標準の API でこの問題を解決できる方法へと議論が発展した。

- Consider adding AbortController.prototype.follow(signal) · Issue #920 · whatwg/dom
  - https://github.com/whatwg/dom/issues/920

理想的には、 Abort を連携する際に以下のようなコードが使われれば、メモリーリークは防ぐことができるというものだ。

Issue で提示されたコードを、先ほどのサンプルに合わせて書くと以下のようになる。

```js
function follow(perRequestController, rootSignal) {
  // 1. 子がすでに Abort してたらリターン
  if (perRequestController.signal.aborted) {
    return
  }

  // 2. 親がすでに Abort していたら子を Abort してリターン
  if (rootSignal.aborted) {
    perRequestController.abort()
    return
  }

  // 3. 親と子の連携
  // 3.1. remove 用にハンドラの参照を残す
  const onAbort = () => {
    perRequestController.abort()
  }

  // 3.2. 親が Abort したら、子も Abort
  // once にすることで、 Abort 時は自動でハンドラを削除
  rootSignal.addEventListener("abort", onAbort, { once: true })

  // 3.3. 子が Abort したら親からハンドラを削除
  perRequestController.signal.addEventListener("abort", () => {
    rootSignal.removeEventListener("abort", onAbort)
  })
}
```

書いてみればそのままだが、徹底するのは難しいタイプのコードだ。 API として提供するのは一定の価値があるだろう。

このころは、 `AbortController.prototype.follow(signal)` という名前がついていた。


## AbortSignal in addEventListener

この議論と同じ頃、並行して `addEventListener` に `AbortSignal` を渡せるようにする提案が、同じく Benjamin から上がった。

- Support `AbortSignal`s in `addEventListener`s options to unsubscribe from events? · Issue #911 · whatwg/dom
  - https://github.com/whatwg/dom/issues/911

読んだ通り `AbortSignal` が `abort` したら、 EventListener を削除するという提案だ。

```js
const controller = new AbortController()
const signal = controller.signal

eventTarget.addEventListener("foo", (e) => {
    // signal が abort したらこのハンドラは削除される
}, { signal })
```

この提案は有用と認められ、 Node で試しながら DOM にバックポートされた。

- add signal to addEventListener by benjamingr · Pull Request #919 · whatwg/dom
  - https://github.com/whatwg/dom/pull/919

結果、 EventEmitter でも EventTarget でも使える API になり、 Node および全メジャーブラウザで実装されている。

これを使うと、先ほどの `follow` は以下のように書き直せる。

```js
function follow(perRequestController, rootSignal) {
  // 1. 子がすでに Abort してたらリターン
  if (perRequestController.signal.aborted) {
    return
  }

  // 2. 親がすでに Abort していたら子を Abort してリターン
  if (rootSignal.aborted) {
    perRequestController.abort()
    return
  }

  // 3. 親と子の連携
  // 3.1. 親が Abort したら、子も Abort
  rootSignal.addEventListener("abort", () => {
    perRequestController.abort()
  }, {
    // once にすることで、 Abort 時は自動でハンドラを削除
    once: true
    // 子が Abort したら親からハンドラを削除
    signal: perRequestController.signal
  })
}
```

さて、これで良さそうだが、これも実は問題を半分しか解決してない。

このコードでは、親か子のどちらかが Abort する場合はクリーンアップできるが、全てがうまくいってしまった場合(最初の例で言えば、 Timeout も SIGINT もない場合)はクリーンアップされない。

正常処理時のクリーンアップは、 Signal だけをみても不可能なので、結局ユーザランドで気をつけて実装するしかない。もし `follow()` 側でやるなら、 `rootSignal.addEventListener()` が Weak な参照を持つでもない限り不可能なのだ。

そこで、「本当に必要なものは何か」を整理した結果、ユーザランドでは難しい「Signal の連結」を行う API の必要性が浮き彫りになった。

しかし、このあたりで一旦議論が止まり、並行して別の議論が進むことになる。


## AbortSignal.timeout()

ところで、ずっと気になっているであろうタイムアウトの処理の方をもう少し見てみよう。

```js
app.get("/entries", (req, res) => {
  const perRequestController = new AbortController()
  const perRequestSignal = perRequestController.signal

  // 1s でタイムアウト
  const timeoutId = setTimeout(() => {
    perRequestController.abort()
  }, 1000)

  const entries = await fetch("https://api.example/entries", { signal: perRequestSignal })
  clearTimeout(timeoutId)

  /* ~~~~~ */

  res.send(/*response*/)
})
```

この `fetch()` のタイムアウト、かなり頻出処理でありながら、毎回書くのは非常に面倒だ。本来なら `fetch(url, {timeout: 1000})` などと書きたいところで、そのような要望は定期的にあった。

しかし、 `fetch()` だけタイムアウトできても汎用的にはならないため(というか、それもあって `fetch()` 策定中に `AbortSignal` が生まれた)、より汎用的なのはタイムアウト用の `AbortSignal` を生成することだ。

そこで提案されたのが `AbortSignal.timeout()` だ。

- Introduce AbortSignal.timeout() by domenic · Pull Request #1032 · whatwg/dom
  - https://github.com/whatwg/dom/pull/1032

これを使うと、以下のようにかなりすっきり実装できる。

```js
app.get("/entries", (req, res) => {
  // 1s でタイムアウト
  const timeoutSignal = AbortSignal.timeout(1000)

  const entries = await fetch("https://api.example/entries", { signal: timeoutSignal })

  /* ~~~~~ */

  res.send(/*response*/)
})
```

さて、これを踏まえて先ほどの `SIGINT` との連携を見てみよう。

```js
// SIGINT と連動
rootController.on("abort", () => {
  perRequestController.abort()
})
```

直接 `timeoutSignal` を作っているため `perRequestController` 相当がなくなっている。これでは、 `SIGINT` とタイムアウトが連携できない。

実は、この `AbortSignal.timeout()` の策定の時点で、前述の「Signal の連結」を行う API の構想が進みつつあったのだ。


## AbortSignal.prototype.any()

結局必要なのは、「Signal の連結」を行う API だったが、その API をどうデザインするかの段階で多少議論が止まっていた。

それが今年になって急速に進み、提案されたのが `AbortSignal.any()` だ。

- abort-signal-any/README.md at main · shaseley/abort-signal-any · GitHub
  - https://github.com/shaseley/abort-signal-any/blob/main/README.md

これは、 Signal の配列を渡すと、連結された Signal が返る API であるため、先のサンプルは以下のように書き換えられる。

```js
const rootController = new AbortController()
const rootSignal = rootController.signal

process.on("SIGINT", () => {
  rootController.abort()
})


app.get("/entries", (req, res) => {
  const perRequestController = new AbortController()
  const perRequestSignal = perRequestController.signal

  // 1s でタイムアウト
  setTimeout(() => {
    perRequestController.abort()
  }, 1000)

  // SIGINT と連結した Signal を生成
  const combinedSignal = AbortSignal.any([rootSignal, perRequestSignal])

  const entries = await fetch("https://api.example/entries", { signal: combinedSignal })

  /* ~~~~~ */

  res.send(/*response*/)
})
```

`combinedSignal` は、`SIGINT` とタイムアウトどちらが発生しても `fetch()` を Abort できる。

しかし、 Request のハンドラから `rootController` の参照が消え、ハンドラのクリーンアップについて気にする必要がなくなった。

そして、これを `AbortSignal.timeout()` にするとこうなる。

```js
const rootController = new AbortController()
const rootSignal = rootController.signal

process.on("SIGINT", () => {
  rootController.abort()
})


app.get("/entries", (req, res) => {
  // 1s でタイムアウト
  const timeoutSignal = AbortSignal.timeout(1000)

  // SIGINT と連結した Signal を生成
  const combinedSignal = AbortSignal.any([rootSignal, timeoutSignal])

  const entries = await fetch("https://api.example/entries", { signal: combinedSignal })

  /* ~~~~~ */

  res.send(/*response*/)
})
```

`perRequestController` も消えていることがわかる。


## Status

Chrome は M116 で Ship のアナウンスが出ている。

- Intent to Ship: AbortSignal.any()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-tY85-WOCD8/m/QaG6qaVSBgAJ

Safari も実装済。

- 256176 - Implement AbortSignal.any()
  - https://bugs.webkit.org/show_bug.cgi?id=256176

Firefox は Positive だが実装はまだのようだ。

- Request for Mozilla Position: AbortSignal.any() · Issue #774 · mozilla/standards-positions
  - https://github.com/mozilla/standards-positions/issues/774


## Abort Handling Practice

今回紹介しただけでも、かなり重要な API がいくつか追加されていることがわかる。

あと、今回は解説しなかったが `AbortSignal.prototype.throwIfAborted()` もある。

- `AbortSignal` in `addEventListener`
- `AbortSignal.timeout()`
- `AbortSignal.prototype.any()`
- `AbortSignal.prototype.throwIfAborted()`

まず基本的な使い方として、 Signal を安全に連結する方法が手に入ったため、 `AbortSignal.timeout()` のように、`AbortSignal` を返す API を実装するのは、非常に理にかなったものになる。例えば、先ほどの SIGINT の処理を、以下のように提供するイメージだ。

```js
async function processSIGINT() {
  const controller = new AbortController()
  const signal = controller.signal

  process.once("SIGINT", () => {
    controller.abort()
  }, { signal })

  return signal
}
```

また、フロントエンドで「タイムアウトかユーザのキャンセル操作で止めたい」といった場面は、以下のような書き方ができる。

```js
async function cancelSignal($button, msec) {
  const timoutSignal = AbortSignal.timeout(msec)

  const controller = new AbortController()
  const userSignal = controller.signal

  // タイムアウトかボタンクリックでキャンセル
  const conbinedSignal = AbortSignal.any([timoutSignal, userSignal])

  $button.addEventListener("click", () => {
    controller.abort()
  }, { signal: conbinedSignal }) // どっちでもリスナーを消す
}

function main() {
  const $button = $(".button")
  const signal = cancelSignal($button, 1000)

  const res = await fetch(url, { signal })
  // ...
}
```


## 例外処理

本来は `AbortSignal.Timeout()` は `AbortError` ではなく `TimeoutError` になることを踏まえた、 `fetch()` 中断時の例外処理周りの話もしようと思ったが、 Chrome と Safari が仕様に反して `AbortError` を上げるバグがあるため、それについては今回割愛する。


## Outro

AbortSignal 周りはかなり様々な API が急速に整備されつつある。一方で、まだユーザランドではノウハウの共有が進んでいないようにも思う。

メモリーリークしない適切な実装のためにも、こうした API をうまく取り入れていけると良いだろう。


## DEMO

動作するデモを以下に用意した。

- AbortSignal.any DEMO | labs.jxck.io
  - https://labs.jxck.io/promise/abortsignal-timeout/
- AbortSignal.timeout DEMO | labs.jxck.io
  - https://labs.jxck.io/promise/abortsignal-timeout/


## Resources

- Spec
  - DOM Standard
    - https://dom.spec.whatwg.org/#dom-abortsignal-any
- Explainer
  - abort-signal-any/README.md at main · shaseley/abort-signal-any · GitHub
    - https://github.com/shaseley/abort-signal-any/blob/main/README.md
- Requirements Doc
  - AbortSignal.any() - Chrome Platform Status
    - https://chromestatus.com/feature/5202879349522432
  - Design review: AbortSignal.any() · Issue #737 · w3ctag/design-reviews
    - https://github.com/w3ctag/design-reviews/issues/737
- Mozilla Standard Position
  - Request for Mozilla Position: AbortSignal.any() · Issue #774 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/774
- Webkit Position
  - AbortSignal.any() · Issue #166 · WebKit/standards-positions
    - https://github.com/WebKit/standards-positions/issues/166
- TAG Design Review
  - Design review: AbortSignal.any() · Issue #737 · w3ctag/design-reviews
    - https://github.com/w3ctag/design-reviews/issues/737
- Intents
  - Intent to Ship: AbortSignal.any()
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/-tY85-WOCD8/m/QaG6qaVSBgAJ
  - Intent to Prototype: AbortSignal.any()
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/FSH6hrJMaxM
- Chrome Platform Status
  - AbortSignal.any() - Chrome Platform Status
    - https://chromestatus.com/feature/5202879349522432
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
  - 1323391 - Implement AbortSignal.any()
    - https://bugs.chromium.org/p/chromium/issues/detail?id=1323391
  - Add AbortSignal.any() · whatwg/dom@6c02df2
    - https://github.com/whatwg/dom/commit/6c02df28ffe592dda901fd29a924906c648baa54
- Other
  - once() and on() async utilities for EventTarget · Issue #1038 · whatwg/dom
    - https://github.com/whatwg/dom/issues/1038