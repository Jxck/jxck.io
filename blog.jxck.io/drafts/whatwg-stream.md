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
  .catch(e => console.error('cache or upload failed));
```




## readable stream

```js
```






So um, first render is faster, but there's a massive regression when it comes to rendering content.

The fastest way would be to serve the entire page from the cache, but that involves caching all of Wikipedia.
全部キャッシュから出すのが一番早いけど、大きすぎて無理。

Instead, I served a page that contained the CSS, JavaScript and header, getting a fast initial render, then let the page's JavaScript set about fetching the article content.
And that's where I lost all the performance - client-side rendering.

変わりに、初期レンダのために CSS/JS/Header を持つページを返す、そして、 JS で本文を fetch する。
これがパフォーマンスを失う点、クライアントレンダリング。


HTML renders as it downloads, whether it's served straight from a server or via a service worker.
ダウンロードしたら HTML をレンダリング、 sw を素通りしてサーバから


But I'm fetching the content from the page using JavaScript, then writing it to innerHTML, bypassing the streaming parser.
でも JS で fetch してるので、 streaming parser を介さず innerHTML に流す


Because of this, the content has to be fully downloaded before it can be displayed, and that's where the two second regression comes from.
The more content you're downloading, the more the lack of streaming hurts performance, and unfortunately for me, Wikipedia articles are pretty big (the Google article is 100k).

これにより、コンテンツが全部ダウンロードされないと表示できない、これが 2s の遅延の原因
コンテンツをよりダウンロードすれば、ストリームによる遅延が増える、 wikipedia はそれに十分大きい。


This is why you'll see me whining about JavaScript-driven web-apps and frameworks - they tend to throw away streaming as step zero, and performance suffers as a result.

これが JS のフレームワークで辛い理由、最初のステップでストリームを捨てている。


I tried to claw some performance back using prefetching and pseudo-streaming.
prefetching と pseudo-stream で改善


The pseudo-streaming is particularly hacky.
pseudo-streaming はちょっと hacky


The page fetches the article content and reads it as a stream.
page は article を fetch し stream として読む


Once it receives 9k of content, it's written to innerHTML, then it's written to innerHTML again once the rest of the content arrives.
This is horrible as it creates some elements twice, but hey, it's worth it:

9k 読むごとに innerHTML に入れる
いくつかのエレメントを二回作るが、悪く無い
