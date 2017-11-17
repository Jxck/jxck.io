# AsyncGenerator/AbortingController 以降の非同期 API 設計例

## Intro

async/await 以降、非同期 API は Promise ベースへと移行しつつある。
ユーザランドでも API を Promise に寄せる方針で設計を行う場合も増えただろう。

今回は、古き良きコールバックスタイルの代表として setTimeout/setInterval を題材にし、
現在実装が進む AbortingController と AsyncGenerator を踏まえた上で、
Async Friendly な API の設計パターンを解説する。
また、それを呼び出す側への影響を踏まえ、本当にそこまでやるのか?という点に触れたい。


## setTimeout/setInterval

一応復習すると、既存の API は setXX と clearXX が定義されている。

```javascript
const id = setTimeout(() => console.log('done'), 100)
clearTimeout(id)

// same for timeout
```

引数はコールバックが先で秒数が後となっている。
(この点でも、 Node.js のコールバックラストスタイルとも相性が悪かった)

また、戻り値がタイマーの ID となっており、これを経由してキャンセルする関数が別途あるという点が特徴と言える。

以降の方法は、 `setImmediate()` や `requestIdleCallback()` についても、同様に適用できる。

## Simple Async

これを async の世界に持ち込むと単純にはこうなる。

```javascript
console.log('before')

await new Promise(done => setTimeout(() => {
  console.log('timeout')
  done()
}, 1000))

console.log('after')

// before
// timeout
// after
```

ただ、コールバックを書けばいいのなら、後続の処理を全部 `setTimeout()` のコールバックにすればよくなる。
この場合、 Async にする意味はあまりない。

本当は全てが Promise に揃った上で await を縦に連ねたかったのであれば、こうなる。


```javascript
console.log('before')
await new Promise(done => setTimeout(done, 100))
console.log('after')
```

つまり、 Async な世界では timeout は「時間をそこで止める」だけで良い。


また、同じことを `setInterval()` の場合どうするかという点はより複雑だ。
async の世界であれば、 interval は縦に連続するタスクの実行と考えられそうだ。


## timeout with aborting promise

ところが、これだと `clearTimeout()` をどすうるかという話になる。
ユーザインタラクションなどにより Promise を reject してでも先に進みたい場合がある。

以前解説した、 Aborting Fetch で導入された AbortController と AbortSignal は、 DOM の仕様には追加されている。

TODO: url

つまり、ブラウザ であれば Fetch 以外でも使うことができるということだ。

なお、執筆時点では Firefox に flag 付きで実装されている。

TODO: caniuse

`setTimeout()` を Promise で Wrap するということは、それを止めるのは Aborting の流儀に乗るのが良いだろう。

するとこうなる。


```javascript
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

```javascript
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

もし Reject にしたい場合は、呼ぶ側は同じく実装が進む try-cache-finally を使うことになるだろう。

```javascript
import {timer} from "./timer.mjs"

async function main() {
  // Aborting Style Setup
  const controller = new AbortController()
  const signal = controller.signal

  // クリックされたら止める
  button.onclick = () => {
    controller.abort()
  }

  try {
    await timeout(1000, signal)
  } catch(err) {
    console.error(err.type)
  } finally {
    console.log('done')
  }
}
```


## interval with async generator

`setInterval()` の場合は、処理を繰り返し行うわけだが、これは `setTimeout()` を再起させていると捉えられそうだ。
すると、 Async の世界では Timeout Promise の連続と捉えるのが自然と言えるだろう。

Promise の連続というと WHATWG Stream が思い起こされるが、 Stream は主に I/O 時の Chunk についての抽象化が主用途と言える。

連続するイベントの抽象化は、どちらかというと Observable になるが、これはまだ無い。

そこで、単にイベントとしての Promise を連続して生成するだけなら、現時点では Generator での生成が妥当そうだ。

Async Generator として timer を生成すると以下のようになる。


```javascript
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

```javascript
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

```javascript
export async function* interval(time, signal) {
  let i = 0;
  while (!signal.aborted) {
    await timeout(time, signal)
    yield  i++;
  }
}
```

すると回数ベースでの停止は簡単にできる。

```javascript
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

```javascript
const $a = document.querySelector('#a')
const $b = document.querySelector('#b')

let i = 0
const ida = setInterval(() => {
  $a.textContent = ++i
  if (i >= 10) return clearInterval(ida)
}, 500);

let j = 0
const idb = setInterval(() => {
  $b.textContent = ++j
  if (j >= 10) return clearInterval(idb)
}, 600);
```

しかし、 `for-await-of` で書いた場合は、片方のループ中に止まってしまう。
方法としては、 async で分けることになる。


```javascript
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


```javascript
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


```javascript
import "./c.mjs"
import "./d.mjs"
```

もし Module 内の top-level await が可能になれば Async は不要になる。


```javascript
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
