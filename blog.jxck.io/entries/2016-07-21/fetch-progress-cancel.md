# [fetch][stream][promise][whatwg] Fetch での Stream を用いたプログレス取得とキャンセル

## Intro

WHATWG が定義する Fetch API は、出たばかりの仕様では、途中でのキャンセルや、プログレスイベントの取得が含まれていなかった。

しかし、後の更新で fetch 結果の Response Body が WHATWG Stream API を実装することになったため、現在の仕様ではプログレスを取ることもキャンセルをすることも可能となっている。

今回は、こうした API のアップデートについて記す。


## Update

最初の公開時には、以下のように書いていた。

「XHR ではできるが Fetch ではできない」ことが、仕様上は無くなったことを意味する。

しかし、現時点で仕様としてまだ出来ないことがあることが判明した。

- Upload の Progress

これに伴い、記事の一部を修正した。


## Fetch

最新の Fetch の仕様は以下で確認できる。

- [Fetch Spec](https://fetch.spec.whatwg.org/)

仕様が出たばかりの頃の解説は以前のブログに書いた、本エントリはここからの差分を記す。

- [Fetch API 解説、または Web において "Fetch する" とは何か?](https://jxck.hatenablog.com/entry/whatwg-fetch)


## Promise API

まず、 `fetch()` は当初から Promise ベースの API となっている。

- [Promise](https://tc39.github.io/ecma262/#sec-promise-constructor)

例えば、なんらかの Text を取得する場合、基本は以下のようになる。


```js
fetch('foo.txt').then((res) => {
  return res.text();
}).then((text) => {
  console.log(text);
});
```

- [Fetch Basic DEMO](https://labs.jxck.io/fetch/basic.html)

`res.text()` が body を resolve する Promsie を返していることが分かる。

この API では、以下の二つができない。

- `foo.txt` が大きかった場合、 fetch を中断(キャンセル)する。
- `foo.txt` が大きかった場合、ダウンロードの進捗(プログレス)を得る。

現在の Promise の仕様では、非同期処理に対してあくまで *fullfilled(完了した)* か *rejected(失敗した)* の二つの状態を返すことしかできない。

このため、その途中の状態に処理を挟む余地がないためである。


## Stream API

現在は `fetch()` が返す Response が、 WHATWG の Stream を返すように変更されている。

- [Streams Spec](https://streams.spec.whatwg.org/)

Stream は、 I/O 処理を chunk ごとに返し、非同期処理の *途中* に処理を挟むための仕様である。

先の例を Stream で取得する場合、以下のように書くことができる。


```js
fetch('foo.txt').then((res) => {
  // foo.txt の全体サイズ
  const total = res.headers.get('content-length');

  // body の reader を取得する
  let reader = res.body.getReader();
  let chunk = 0;

  // read() を呼ぶことで chunk を resolve する Promise が返る
  reader.read().then(function processResult(result) {
    // done が true なら最後の chunk
    if (result.done) {
      return log('Fetch complete');
    }

    // chunk の値
    console.log(result.value);

    // 再帰する
    return reader.read().then(processResult);
  });
});
```

コードを見れば分かるように、 WHATWG の Stream は Chunk を resolve する Promise を返す。

従って EventEmitter ベースである Node.js の Stream とは少々使い勝手が異なる。


## Progress の取得

Stream の返す各 Chunk から、その Chunk のサイズを取得することができるため、取得するリソースの合計サイズがわかれば進捗率の取得などが可能になる。

リソースの合計サイズは HTTP レスポンスヘッダの `Content-Length` から取得することができる。

fetch の返す Response オブジェクトからは以下のように取ることができる。


```js
fetch('foo.txt').then((res) => {
  const total = res.headers.get('content-length');
});
```

(クロスオリジンのリソースを CORS を使わずに取得する `mode: no-cors` の場合は、 Opaque な Response となりヘッダは取れない。しかし基本的にキャッシュのために使うものであり、 body も取れないためプログレスを出す用途はないだろう)

これを用いれば、以下のように Progress を得ることができる。

(進捗率の数値を使えば、 CSS でプログレスバーを表示することも可能だろう)


```js
fetch('foo.txt').then((res) => {
  // foo.txt の全体サイズ
  const total = res.headers.get('content-length');

  // body の reader を取得する
  let reader = res.body.getReader();
  let chunk = 0;

  // read() を呼ぶことで chunk を resolve する Promise が返る
  reader.read().then(function processResult(result) {
    // done が true なら最後の chunk
    if (result.done) {
      return log('Fetch complete');
    }

    // chunk の長さの蓄積を total で割れば進捗が分かる
    chunk += result.value.length;
    log(`received: ${chunk}(${Math.round(chunk/total * 100)} %)`);

    // 再帰する
    return reader.read().then(processResult);
  });
});
```

- [Fetch Stream Progress DEMO](https://labs.jxck.io/fetch/stream-progress.html)


## Fetch の cancel

Stream 、もしくはそこから取得した Reader はキャンセルすることができる。

- `res.body.cancel()`
- `reader.cancel()`

これを用いることで、サイズの大きなファイルのダウンロードを途中で止めるといった実装が可能となる。


```js
fetch(url).then((res) => {
  const total = res.headers.get('content-length');

  let reader = res.body.getReader();
  let chunk = 0;

  $stop.addEventListener('click', () => {
    // stream をキャンセルする
    // res.body.cancel(); でも良い
    reader.cancel();
  });

  reader.read().then(function processResult(result) {
    if (result.done) {
      return log('Fetch complete');
    }

    console.log(result.value);

    return reader.read().then(processResult);
  });
});
```

- [Fetch Stream Cancel DEMO](https://labs.jxck.io/fetch/stream-cancel.html)


## Promise の cancel

現在の仕様では、 Stream を経由せず Promise のレベルで fetch をキャンセルすることはできない。

これは Promsie そのものにキャンセルという概念が含まれていないためである。

もし Promise 自体にキャンセルの概念が入れば、 Stream の取得は不要となる。

fetch を含めて Promise を返す API は増加しつつあるため、 Cancelable Promise の議論は現在も続いている。

- [cancelable promises slide](https://docs.google.com/presentation/d/1V4vmC54gJkwAss1nfEt9ywc-QOVOfleRxD5qtpMpc8U/preview?slide=id.gc6f9e470d_0_0)
- [cancelable promises draft](https://domenic.github.io/cancelable-promise/) (現在は取り下げられている)

まだ、はっきりとした結論が出ているわけではないので、もう少し仕様が固まれば別途エントリを書きたい。


## 結論

Stream での progress と cancel は可能になったが、まだ *ブラウザが実装しているか* という問題もある。

- [Fetch \| canuise](https://caniuse.com/#feat=fetch)

一方 XHR が無くなることはないため、今後も利用可能である。

以上のような仕様と現状を踏まえた上で、何を採用するか検討するのが良いだろう。


## Special Thanks

- [@hirano_y_aa](https://twitter.com/hirano_y_aa)
- [@ykzts](https://twitter.com/ykzts)
