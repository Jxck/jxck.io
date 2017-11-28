# [promise][tc39] Promise.prototype.finally

## Intro

Promise.prototype.finally の仕様が TC39 stage 3 となり、 [Safari TP37](https://webkit.org/blog/7862/release-notes-for-safari-technology-preview-release-37/) で先行実装が入った。

[tc39/proposal-promise-finally](https://github.com/tc39/proposal-promise-finally)


## common task in async task

よくあるユースケースとして、 `fetch()` 中にスピナーを表示し、終わったら消すという場合。

スピナーは、 `fetch()` が成功(resolve) しようと失敗(reject)しようと消したいため、これまでの Promise では両方のハンドラに処理が必要だった。


```js
showSpinner()
fetch()
  .then((response) => {
    hideSpinner()
    console.log(response)
  })
  .catch((error) => {
    hideSpinner()
    console.log(error)
  })
```


## finally()

`finally()` は、 resolve/reject どちらでも実行されるので、こう書くことができる。


```js
showSpinner()
fetch()
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })
  .finally(() => {
    hideSpinner()
  })
```

`finally()` には引数は渡って来ない。(来たとしても、それが resolve/reject どちらの結果か判別できないため)


## finally() の戻り値

また、 `finally()` はその前の Promise の結果をそのまま戻す。つまり、以下のように先に書いても問題ない。


```js
showSpinner()
fetch()
  .finally(() => {
    hideSpinner()
  })
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })
```

これで、 response/error の処理に時間がかかるとしても、まず Snipper を消すという処理を完了させられる。


## async/await

なお、 async/await を使った場合は、 try-catch-finally がそのまま使えるため、この仕様とは関係なく以下のように書ける。


```js
(async () => {
  try {
    res = await fetch('/')
    console.log(res)
  } catch (e) {
    console.error(e)
  } finally {
    hideSpinner()
  }
})()
```


## DEMO

- [Promise DEMO](https://labs.jxck.io/promise)
