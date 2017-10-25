# AsyncGenerator 以降の setTimeout/setInterval

## Intro

async/await を導入して以降、一層 setTimeout/setInterval が使いにくいものとなった。
現在実装されている AbortingController と AsyncGenerator を踏まえた上で、
今後どういう形だと使いやすいかを考察し、モジュールとして公開した。

https://github.com/jxck/async-timer


## setTimeout/setInterval

一応復習すると、既存の API は setXX と clearXX が定義されている。

```js
const id = setTimeout(() => console.log('done'), 100)
clearTimeout(id)

// same for timeout
```

また、引数はコールバックが先で秒数が後となっている。
(この点でも、 Node.js のコールバックラストスタイルとも相性が悪かった)

これを async の世界に持ち込むと単純にはこうなる。
(clear したい場合は、もう一枚関数を被せれば良い)

```js
await new Promise(done => setTimeout(() => {
  console.log('done')
  done()
}, 1000))
```

ただ、コールバックを書けばいいのなら、後続の処理を全部 `setTimeout()` のコールバックにすればよくなる。
ならば Async にする意味はあまりない。

本当は全てが Promise に揃った上で await を縦に連ねたかったのであれば、こうなる。


```js
await new Promise(done => setTimeout(done, 100))
console.log('done')
```

つまり、 Async な世界では timeout は「時間をそこで止める」だけで良かったと考えられる。

ところが、これだと `clearTimeout()` をどすうるかという話になる。
もしユーザインタラクションがあったら 100ms 経過しなくても次に進んでほしいという場合に対応できない。

また、同じことを `setInterval()` の場合どうするかという点はより複雑だ。
async の世界であれば、 interval は縦に連続するタスクの実行と考えられそうだ。


## timeout with aborting promise

以前解説した、 Aborting Fetch で導入された AbortController と AbortSignal は、 DOM の仕様には追加されている。

TODO: url

つまり、ブラウザ であれば Fetch 以外でも使うことができるということだ。

なお、執筆時点では Firefox に flag 付きで実装されている。

TODO: caniuse

`setTimeout()` を Promise で Wrap するということは、それを止めるのは Aborting の流儀に乗るのが良いだろう。

するとこうなる。


```js
// 時間と AbortingSignal を受取り
// Promise を返す関数
export function timeout(time, signal) {
  return new Promise((done, fail) => {
    const timer = setTimeout(done, time)
    signal.addEventListener('abort', (e) => {
      clearTimeout(timer)
      done(e) // ** fail(e) にすると Error を伝搬**
    })
  })
}
```

使う側はこうなる。

```js
import {timer} from "./timer.mjs"

async function main() {
  // Aborting Style Setup
  const controller = new AbortController()
  const signal = controller.signal

  // クリックされたら止める
  button.onclick = () => {
    controller.abort()
  }

  await timeout(1000, signal)
  console.log('done')
}
```

もし `abort()` によって中断したか、タイムアウトしたのかを識別したい場合は、 `timer()` の中で `abort` イベントを取った時 Reject すればよい。
しかし、これだと呼ぶ側が try-catch をする必要があり、処理もジャンプしてしまう。
また従来の API では、そこを識別することすらできなかったはずなので、従来の使用感を維持するためここは Resolve している。



## interval with async generator

`setInterval()` の場合は、処理を繰り返し行うわけだが、これは `setTimeout()` を再起させていると捉えられそうだ。
すると、 Async の世界では Timeout Promise の連続と捉えるのが自然と言えるだろう。

Promise の連続というと WHATWG Stream が思い起こされるが、 Stream は主に I/O 時の Chunk についての抽象化が主用途と言える。

単にイベントとしての Promise を連続して生成するだけなら、 Generator での生成が妥当そうだ。

Async Generator として timer を生成すると以下のようになる。


```js
// Async Generator
export async function* interval(time, signal) {
  // timeout に入る前に abort されてれば終わる
  while (!signal.aborted) {
    // timeout に入った後に abort されても終わる
    yield await timeout(time, signal)
  }
}
```

利用側は Async Iterator を使うことができるだろう。
`setInterval()` に渡していたコールバックの処理が、 `for-await-of` に入ることになる。

```js
import {interval} from "./timer.mjs"

let i = 0
for await (const _ of interval(100, signal)) {
  console.log(i)
  if (++i === 5) {
    controller.abort()
  }
}
console.log('done')
```

しかし、 interval が undefined しか resolve しないのは勿体無い気もする。
もし色気を出すとすれば、カウンタくらい返してもバチは当たらないのではないだろうか。

```js
export async function* interval(time, signal) {
  let i = 0;
  while (!signal.aborted) {
    await timeout(time, signal)
    yield  i++;
  }
}
```

すると回数ベースでの停止は簡単にできる。

```js
for await (const i of interval(100, signal)) {
  console.log(i)
  if (i === 5) {
    controller.abort()
  }
}
```


## モジュール構成


この方法は呼び出す側のスタイルにも変更を強制する。

例えば DOM にカウンタを並行して表示する場合、以下のように書いた。

```js
let $a = document.querySelector('#a')
let $b = document.querySelector('#b')

let i = 0
let ida = setInterval(() => {
  $a.textContent = ++i
  if (i >= 10) return clearInterval(ida)
}, 500);

let j = 0
let idb = setInterval(() => {
  $b.textContent = ++j
  if (j >= 10) return clearInterval(idb)
}, 600);
```

しかし、 `for-await-of` で書いた場合は、片方のループ中に止まってしまう。
方法としては、 async で分けることになる。


```js
import {interval} from "./timer.mjs"
(async () => {
  const controller = new AbortController()
  const signal = controller.signal

  let $c = document.querySelector('#c')
  for await (const i of interval(700, signal)) {
    $c.textContent = i
    if (i >= 10) {
      controller.abort()
    }
  }
})()

(async () => {
  const controller = new AbortController()
  const signal = controller.signal

  let $d = document.querySelector('#d')
  for await (const i of interval(800, signal)) {
    $d.textContent = i
    if (i >= 10) {
      controller.abort()
    }
  }
})()
```

これだけだと、本来より複雑になっただけになってしまう。

そこで、これらをモジュールに分ける。


```js
// c.mjs
import {interval} from "./timer.mjs"

(async () => {
  const controller = new AbortController()
  const signal = controller.signal

  let $c = document.querySelector('#c')
  for await (const i of interval(700, signal)) {
    $c.textContent = i
    if (i >= 10) {
      controller.abort()
    }
  }
})()
```

結果モジュールを読み込むだけにはできる。


```js
import "./c.mjs"
import "./d.mjs"
```

もし Module 内の top-level await が可能になれば Async は不要になる。


```js
// c.mjs
import {interval} from "./timer.mjs"

const controller = new AbortController()
const signal = controller.signal

let $c = document.querySelector('#c')
for await (const i of interval(700, signal)) {
  $c.textContent = i
  if (i >= 10) {
    controller.abort()
  }
}
```

コンテキストを分ける場合は、 Module を分けることになるだろうか。


こうすると `setImmediate()` や `requestIdleCallback()` のように、繰り返し相当が無いものについても Promise 化したものを用意すれば同じように繰り返すことができる。
