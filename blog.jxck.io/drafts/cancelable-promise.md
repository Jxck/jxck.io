# cancelable promise

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

- fullfilled (success)
- rejected   (fail)

cacnel を rejected の特殊な例として扱うと

JS にはそれを見分けるまともな手段が無い

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


そもそもエラーとは限らない

- fetch しようとしたがネットワークが落ちてた -> エラー処理
- fetch してる途中でユーザが stop ボタンを押した -> 正常処理
