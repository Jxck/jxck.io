# cancelable promise

## motivation


```
> なんか fetch が次世代の Ajax らしいぜ、 XHR オワコンわーい
> ちょっとまて@2015
```


- fetch は XHR の夢を見るのか？@2015
  - キャンセルする方法がない
  - progress イベントがとれない

- 補完されつつある@2016
  - cancel -> cancelable promise
  - event -> stream (done)

- キャンセルしたいのは fetch だけじゃない
  - promise 自体に持ちたい
  - 今後も Promise ベース API は増える
  - Promise.all() の負けた奴ら

## problem

```js
fetch('/index.html')
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// how to cancel request ?
```

```js
Promise.race([p1, p2, p3]);

// if p2 wins, wanna stop p1, p3 but how ?
```










## Canceled as third state

- 今までどうしてたか
  - fullfilled (success)
  - rejected   (fail)
  - bluebird -> reject で型チェック

- Promise は reject か？
  - cacnel を rejected の特殊な例として扱うと JS にはそれを見分けるまともな手段が無い
  - 関数の引数によるパターンマッチ
  - catch での型識別


```js
fetch()
  .catch((err) => {
      if (err instanceof CancelError) {
        // canceled
      }
  });
```

```js
try {
  await fetch();
} catch(err) {
  if (err instanceof CancelError) {
    // canceled
  }
};
```


- そもそもエラーとは限らない
  - fetch しようとしたがネットワークが落ちてた -> エラー処理
  - fetch してる途中でユーザが stop ボタンを押した -> 正常処理


## 今何がおこっているか

- https://domenic.github.io/cancelable-promise/
  - domenic 中心に策定中
  - もう議論は async/await ベースのサンプルでしか書かれてない


- cancelable promise に向けて
  - canceled はもう一つの状態として追加しよう
  - calcel する API を決めよう

## Canceled as the third state

- https://github.com/domenic/cancelable-promise/blob/master/Third%20State.md

- cancel は三つ目のステート
- finally() or finally{} でハンドル
- unhandled cancelation はエラーにしない

## cancel task?

- https://github.com/domenic/cancelable-promise/issues/8

- propagating cancle 問題
- new Promise(resolve, reject, cancel)
- ライブラリ等はアップデートするまで cancel が使えない
- 全ての promise が cancel できるとは限らない
- この変更はあまりしたくない

```
const root = Task.resolve(5);
const generation1 = root.then(() => delay(100));
const generation2 = generation1.then();

generation2.cancel("boo");
```

```
Task = Promise
  .resolve(5)
  .then(() => delay(100))
  .then();

// 150ms after
Task.cancel("boo");
```


## cancel token

- .NET からの知見

```js
const token = new CancelToken((cancel) => {
  button.onclick = cancel;
});
```
















XHR から fetch に積極的に移行しづらかった最大のミッシングピースとして、中断できないという問題があった。

これは、 fetch が選んだ Promise ベースのインタフェースにおいて abort をどうするかと相まって長く決着が付かずにいた根深い問題だった。

最近、やっと話が前進したので解説する。


## fetch における二つの中断

fetch は、ブラウザが発行するリクエストと、取得するレスポンスを扱う低レベルなインタフェースとして策定が始まった。

DOM のインタフェースが Promise ベースに移行しつつある流れを汲み、 fetch もまた Promise を返す関数一発スタイルになった。

クラスからインスタンスを生成しメソッドを呼ぶスタイルだと、メソッドを複数回呼んだ場合の挙動などを含めオブジェクトの死活を考量する必要もあったが、 Request オブジェクトを渡し Response オブジェクトが返る(Resolve) 関数とすることで、実際の挙動との整合したまま全体をシンプルに定義することができた。

XHR のインタフェースに辟易していた開発者の中には fetch へ飛びつき SIM 付きで移行を進めた人もいるかもしれないが、そこにあった一つの落とし穴として中断できないという問題があった。

fetch が返す Promise は、Resolve するか Reject するのをまつしかないため、例えば時間のかかるレスポンスを途中でやめるといったごく普通のことができなかったのだ。

実は Promise を返すというインタフェースは、 progess を出すこともできなくしていた。

ところが、この問題の一端は stream の導入のより解決してる。

# stream の停止

Resolve される response から得られる body が bytestream に対応したため、 chunk の取得が可能となり、実質 progess を出すことができるようになった。
また stream は止めることができるので、これにより中断することも可能になった。

しかし、あくまで中断したのは stream であり、 stream は resolve された後、つまりサーバからレスポンスが届き、ヘッダまでパースされてからだ。
サーバが詰まっていて、リクエストに対するレスポンスが全く来てないような状況では、そもそも Promise  が Resolve されないので、やはり中断ができないのだ。

## abort のインタフェースは誰が持つべきか


fetch は中断できないが、そもそも Promise 一般の話ではないだろうか？

例えば、 Promise.race() は最初に Resolve した Promise の結果を返して終わるが、他の promise が止まるわけではない。裏で動き続ける。

もし fetch を 4 つ渡して、一番早く帰って来た結果を取りたい、と思ったら、一つ結果が取れたら残りの三つは中断で良いだろう。

同じように Promise に処理を抽象化している場合、止めたい場面はあるのだ。つまり Promise 自体に停止の概念を持たせようという発想が自然であり、それが Cancelable Promise だった。

## Cancelable Promise

Promise にキャンセルさせる仕組みを持たせれば、 fetch も同時にキャンセルできるし、今後 Promise を返す全ての API が中断を考量できる。

この API の提案は実は結構前から行われていた。

しかし、結論から言うと喧々諤々の議論の結果頓挫した。

なんで頓挫したかの詳細は、仕様策定の中心だった domenic の悲痛な一言に集約されている。

TODO: tweet

ともあれ、 Cancelable Promise は実現しなかった。

## aborting fetch

Promise がキャンセルできないからといって、 fetch の中断を諦めるわけにはいかない。
XHR であたりまえにできていたことが、できないままでは困る。

そこで fetch の仕様は、 Promise には待った手を入れず、 fetch 側で独自に abort の仕組みを入れることとなった。

今提案されている、そのインタフェースは以下のようなものである。
