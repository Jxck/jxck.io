# fetch でのプログレス取得とキャンセル

## Intro

WHATWG が定義する Fetch API は、出たばかりの仕様では、途中でのキャンセルや、プログレスイベントの取得が規定されていなかった。

しかし、後の仕様で fetch 結果の Response Body が WHATWG Stream API を実装することになったため、現在の仕様ではプログレスを取ることもキャンセルをすることも可能となっている。

これは API の面で 「XHR ではできるが Fetch ではできない」ことが、仕様上は無くなったことを意味する。

つまり、今 Fetch を使うか XHR を使う上での問題はあくまで「ブラウザが実装しているか」が基本となる。

今回は、こうした API のアップデートについて記す。


## Promise API

まず、 `fetch()` は当初から Promise ベースの API となっている。

例えば、なんらかの Text を取得する場合、基本は以下のようになる。

```js
fetch('/foo.txt').then((res) => {
  res.body.text();
}).then(text) =>
  console.log(text);
});
```

`res.body` が body を resolve する Promsie を返していることがわかる。


この API では、以下の二つができない。

- `foo.txt` が大きかった場合、 fetch を中断(キャンセル)する。
- `foo.txt` が大きかった場合、ダウンロードの進捗(プログレス)を得る。

現在の Promise の仕様は、非同期処理に対してあくまで **fullfilled(完了した)** か **rejected(失敗した)** の二つの状態を返すことしかできない。

このため、その途中の状態に処理を挟む余地がないためである。


## Stream API

現在は `fetch()` が返す Response が、 WHATWG の Stream を返すように変更されている。

Stream は、 I/O 処理を chunk ごとに返し、非同期処理の **途中** に処理を挟むための仕様である。

先の例を Stream で取得する場合以下のように書くことができる。


```js
TODO: stream
```

コードを見れば分かるように WHATWG の Stream は、 Chunk を返す Promise の Generator のような挙動になる。

従って EventEmitter ベースである Node.js の Stream とは使い勝手が少し違う。


## Progress の取得

Stream の返す各 Chunk から、その Chunk のサイズを取得することができるため、取得するリソースの合計サイズがわかれば進捗率の取得などが可能になる。

リソースの合計サイズは HTTP レスポンスヘッダの `Content-Length` から取得することができる。

fetch の返す Response オブジェクトからは以下のように取ることができる。

```js
fetch('foo.txt').then((res) => {
  const total = res.headers.get('content-length');
});
```

これを用いれば、以下のように Progress を得ることができる。
(進捗率の数値を使えば、 CSS でプログレスバーを表示することも可能だろう)

```js
TODO: progress
```


## Fetch の cancel

Stream はキャンセルすることができる。

これを用いれば、大きなファイルのダウンロードを途中で止めるといった実装が可能となる。

```js
TODO: stream cancel
```


## Promise の cancel

現在の仕様では Stream を経由せず Promise のレベルで fetch をキャンセルすることはできない。

これは Promsie そのものにキャンセルという概念がまだ入っていないからである。

もし Promise 自体にキャンセルの概念が入れば、 Stream を取得する必要もなくなる。

現在は fetch 以外にも Promise を返す API は増えて来ているため、 Cancelable Promise の議論は現在も続いている。

まだ、はっきりとした結論が出ているわけではないので、もう少し仕様が固まれば別途エントリを書きたい。



