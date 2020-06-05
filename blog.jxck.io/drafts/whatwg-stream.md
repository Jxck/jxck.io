# [stream][node.js][whatwg] Stream API にみる WHATWG と Node.js 設計方針の違い

## Intro

Stream は、連続するデータの流れを抽象化するインタフェースとして Node.js の世界では中心的存在であった。

現在 WHATWG が DOM のインタフェースに、この Stream の概念を取り込むべく、仕様を策定している。

しかし、この二つは互換が無く、全く別の API となっている。

この違いは、 WHATWG と Node.js が「非同期 I/O 処理の抽象化」に対する思想の違いから現れていると考える。

今回は、この API 設計から見えてくる両者の設計思想の違いについて解説する。


## Stream

まず汎用的な Stream の概念について確認する。

JS に限らず、 Stream 処理といえば一般的に「連続するデータの流れに処理を挟む」というような認識があるだろう。

一番身近な例として Linux における Pipe が上げられる。

```sh
$ cat access.log | grep 404 | cut -f1,4
```

`cat` がデータを標準出力に書き出したら、それは書き出されるごとに `grep` に渡る。
`grep` はそれを



## GET without stream

node.js (using request)

```js
let request = require('request');
request('http://example.com', (err, res, body) => {
  console.log(body);
});
```

レスポンスを受信し終えてからコールバックを一度呼ぶ。
Body が大きい場合、次の処理に進むまで時間がかかる。


## GET with strem

node.js

```js
let http = require('http');
http.get({
  hostname: 'example.com'
}, (res) => {
  res.on('data', (data) => {
    console.log(data.toString());
  });
});
```

Header を受信したところで、一度コールバックを呼ぶ。
Body は届いた順に chunk としてユーザランドに渡される。


## Node.js の Stream

Stream is-a EventEmitter

- EventEmitter の I/F でイベントが得られる
- 複数のリスナが設定できる
- Push/Pull 両方できる
- 終了は `.on('end')`
- エラーは `.on('error')`
- `pipe()` で繋げる


```js
readable
  .pipe(transform) // return readable
  .pipe(transform) // return readable
  .pipe(writable) // return readable
  .on('end')
  .on('error');
```


## WHATWG の Stream

Stream is a sequence of Promise

- EventTarget ではない
- 同じ chunk は一度しか取れない(w/o tee())
- Push/Pull 両方できる
- 終了は Promise か done
- エラーは Promise の catch
- `pipeThrough()` で繋げる
- `pipeTo()` で終わる

```js
fetch('https://example.com').then((res) => {
  let reader = res.body.getReader();

  // read() を呼ぶと chunk を resolve する promise が返る
  reader.read().then(function processResult({done, value}) {
    if (done) return;
    console.log(value);
    // read() の呼び出しを再帰する
    return reader.read().then(processResult);
  });
});
```

次々と Promse が取り出されるイメージ。
同じ Chunk を返す Promise は取れないので、実質 consumer は一つ。

```js
readable
  .pipeThrough(transform1) // return readable
  .pipeThrough(transform2) // return readable
  .pipeTo(writable)       // return promise
  .then(done)
  .catch(fail);
```

`pipeTo()` -> readable stream を返すので次に続く
`pipeThrough()` -> promise を返すのでここで終わる


## tee()

stream を二つに分割する。
二つの、速度の違う Writable に渡すことができる。
ただし、二つの stream が取得する chunk は同一のもの。

```js
const [forLocal, forRemote] = readableStream.tee();
Promise.all([
  forLocal.pipeTo(cacheEntry),
  forRemote.pipeTo(httpRequestBody)
])
  .then(() => console.log('cached and uploaded'))
  .catch(e => console.error('cache or upload failed'));
```



## Stream の作成

ReadableStream / WritableStream を独自に生成することができる。

しかし、



## Readable Stream


ReadableStream 自体はブラウザが提供しており、自作する場合はここに Underlying Source を渡すことになる。


- start():
  - push source への event handler をセットする
  - promise を返すことで非同期初期化も可能
- pull():
  - 内部 Queue に空きが出たら呼ばれる
  - pull source であればこれが呼ばれるたびに chunk を返す
  - push の場合は resume に使う
  - promise を返すと次の pull を待たせる
- cancel():
  - リソースの開放
  - promise を返すこともできる
- type:
- autoAllocateChunkSize:


```js
class Source {
  get type() {
  }

  get autoAllocateChunkSize() {
  }

  start(controller) {
  }

  pull(controller) {
  }

  cancel(reason) {
  }
}

const readable = new ReadableStream(new Source())
```

```js
class ReadableStreamDefaultController {
  constructor()
  get desiredSize()
  close()
  enqueue(chunk)
  error(e)
}
```


## WritableStream

```js
class Sink {
  start(controller) {
  }

  write(chunk, controller) {
  }

  close() {
  }

  abort() {
  }
}

const writable = new WritableStream(new Sink())
```



```js
class WritableStreamDefaultController {
  constructor()
  error(e)
}
```

