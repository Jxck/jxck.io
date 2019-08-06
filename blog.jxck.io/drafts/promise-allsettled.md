# [promise] Promise.allSettled 及び Promise.any について

## Intro

`Promise.allSettled()` と `Promise.any()` の仕様策定が進んでいる。

なお、近いレイヤの仕様では有るが、作業の進捗には差がある。

- [allSettled](https://github.com/tc39/proposal-promise-allSettled) は Stage 4 であり、 Chrome や Safari TP には実装もされている
- [any](https://github.com/tc39/proposal-promise-any) は Stage 2 であり、まだ実装はない

ここでは、これらがあると何が嬉しいのかを `Promise.all()`, `Promise.race()` の特徴を踏まえて解説する。


## Promise.all()/race()

`Promise.all()`, `Promise.race()` は、いずれも複数の Promise をまとめて処理する Utility Method のようなものである。

all は全ての Promise が Resolve したら Resolve し、 race はどれか 1 つでも Resolve したら Resolve する Promise をそれぞれ返す。

```js
const fetches = [
  fetch("./page1.html"),
  fetch("./page2.html"),
  fetch("./page3.html"),
  fetch("./page4.html"),
  fetch("./page5.html"),
]

// 全ての fetch が Resolve したら Resolve する
await Promise.all(fetched)

// 最初の一つが Resolve したら Resolve する
await Promise.all(fetched)
```

ただし、それは全ての Promise が Resolve することを前提とした場合である。

all/race ともに、そのうちの一部が Reject した場合を考えると意外と面倒くさい。


### all + reject

all は、その中の一つでも Reject すると、全体が Reject してしまう。

```js
try {
  const fetches = [
    fetch("./page1.html"),
    fetch("./page2.html"),
    fetch("./page3.html"),
    fetch("./page4.html"),
    new Promise((done, fail) => {
    setTimeout(() => fail('abort'), 10)
    })
  ]

  // 全ての fetch が Resolve したら Resolve する
  await Promise.all(fetched)
} catch(err) {
  // 一つでも Reject すると Reject する
  cosnole.error(err) // abort
}
```

すると、「*全ての処理が完了してほしい*」という要件を満たすためには、リトライする必要がある。

しかし、上で言う catch された err は Reject されたエラーしか入ってないため、どこまでが成功しているのかはわからない。

そこで、どこまで成功したかがわかるように設計するか、諦めて全部やり直すなどを行う必要がある。


## allSettled

allSettled は、 all とは違い、個々が Resolve/Reject どちらになっても、最後までとにかく全て実行する。
実行した結果を配列として Resolve するため、基本的に allSettled 自体は Reject しない。


```js
const fetches = [
  fetch("./page1.html"),
  fetch("./page2.html"),
  fetch("./page3.html"),
  fetch("./page4.html"),
  new Promise((done, fail) => {
    setTimeout(() => fail('abort'), 10)
  })
]

try {
  console.log(await Promise.allSettled(fetches))
  // 0: {status: "fulfilled", value: Response}
  // 1: {status: "fulfilled", value: Response}
  // 2: {status: "fulfilled", value: Response}
  // 3: {status: "fulfilled", value: Response}
  // 4: {status: "rejected", reason: "abort"}
} catch(err) {
  // 基本的に reject はしない
  console.error(err)
}
```

したがって、 `status: "rejected"` な結果だけをリトライすれば良い。

完了したものを無駄にせず、効率よく簡単に実装することができるだろう。


## race + reject

race の場合は、最初の一つが Resolve する前に Reject した Promise があると、そこで全体が Reject してしまう。

```js
const fetches = [
  fetch("./abort"),
  fetch("./async-await"),
  fetch("./finally"),
  fetch("./index.html"),
  new Promise((done, fail) => {
    setTimeout(() => fail('abort'), 10)
  })
]

try {
  console.log(await Promise.race(fetches))
} catch(err) {
  console.error(err) // abort
}
```

従って、「*最初に Resolve する Promise を待ちたい*」という要件を満たす場合は、リトライする必要がある。



## any

any は rece とは違い、 Resolve する前に Reject する Promise があっても無視し、最初にいずれかが Resolve するまで待つ。
そして、全ての Promise が Reject した場合にのみ全体を Reject する。

```js
const fetches = [
  fetch("./abort"),
  fetch("./async-await"),
  fetch("./finally"),
  fetch("./index.html"),
  new Promise((done, fail) => {
    setTimeout(() => fail('abort'), 10)
  })
]

try {
  console.log(await Promise.any(fetches)) // Response
} catch(err) {
  console.error(err) // 全部 reject した場合
}
```

従って、「*最初に Resolve する Promise を待ちたい*」という要件を満たす場合は、 any を使えばそれだけで良い。


## 補足

Promise が Resolved/Rejected のどちらかになった状態、つまり成功失敗に関わらず「処理が終わった状態」を Settled と言う。

そして、まだ処理中の Promise が有っても、中断して全体を Settled させることを Short-Circuit と言う。

これを踏まえて分類すると、以下のようになる。

- Promise.all: 一つでも reject すると Short-Circuit する
- Promise.allSettled: 全部 Settled になるまで続けるので Short-Circuit しない
- Promise.race: 一つでも settled すると Short-Circuit する
- Promise.any: 一つでも resolved すると Short-Circuit する

つまり、終わる条件が Settled なのかどうかで分類できることがわかる。

(race は [anySettled](https://github.com/tc39/proposal-promise-any/issues/10#issuecomment-459134703) ということになる)
