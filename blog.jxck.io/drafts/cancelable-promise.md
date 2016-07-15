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

