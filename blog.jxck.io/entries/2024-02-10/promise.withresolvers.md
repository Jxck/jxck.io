# [promise][tc39] Promise.withResolvers によるイベントの Promise 化

## Intro

`Promise.withResolvers()` は、Stage 4 であり ES2024 の候補となった。

すでにブラウザでの実装も進んでいるため、その活用方法を解説する。


## イベントの Promise 化

JS では、非同期処理 API は長らくイベントリスナベースで定義され、それを組み合わせるフロー制御で処理されてきた。

しかし、Promise が定義されて以降は、標準 API も Promise を返すようになり、`async`/`await` によって処理されるのが一般的になってきた。

結果、イベントリスナベースの API を Promise 化するような場面も増えた。

例えば以下のようなものだ。

```js
async function request() {
  return new Promise((resolve, reject) => {
    document.querySelector("button").addEventListener("click", async () => {
      try {
        const res = await fetch("/")
        const body = await res.text()
        resolve(body)
      } catch (err) {
        reject(err)
      }
    })
  })
}
```

`resolve`/`reject` がコールバックの引数で渡されるため、このようにネストしたコードになりがちだ。


## resolve/reject

ここで `resolve`/`reject` を取り出す、以下のような書き方がなされることがある。

```js
async function request() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  document.querySelector("button").addEventListener("click", async () => {
    try {
      const res = await fetch("/")
      const body = await res.text()
      resolve(body)
    } catch (err) {
      reject(err)
    }
  })
  return promise
}
```

この取り出す部分を共通化すると以下のようになる。

```js
function withResolvers() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { resolve, reject, promise }
}
```

このような Utility がよく使われているため、それを標準化しようという提案がなされた。


## Promise.withResolvers()

これを標準化したのが `Promise.withResolvers()` だ。

- tc39/proposal-promise-with-resolvers
  - https://github.com/tc39/proposal-promise-with-resolvers

これを用いると、以下のように書くことができる。

```js
async function request() {
  const { promise, resolve, reject } = Promise.withResolvers()
  document.querySelector("button").addEventListener("click", async () => {
    try {
      const res = await fetch("/")
      const body = await res.text()
      resolve(body)
    } catch (err) {
      reject(err)
    }
  })
  return promise
}
```

例えば以下のように使えば、EventTarget を継承した API の Promise 化もできる。

```js
async function readFile(file: File) {
  const { promise, resolve, reject } = Promise.withResolvers()
  const reader = new FileReader()
  reader.onload = resolve
  reader.onerror = reject
  reader.onabort = reject
  reader.readAsText(file)
  return promise
}
```

既にブラウザへの実装も進んでいる。

なお、Firefox は内部で `PromiseUtils.defer()` という名前で実装していたが、現在は `Promise.withResolvers()` に置き換えられている。

- PSA: PromiseUtils.defer() has been replaced by Promise.withResolvers()
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/FqOnd1J4-YI


## Outro

イベントのハンドリングを Promise でラップして返すパターンは一般的であるため、今後このような処理を書く際に導入を検討できるだろう。

また、同等の Utility を用いている場合は、置き換えを検討できる。


## DEMO

動作するデモを以下に用意した。

- Promise.withResolvers Labs
  - https://labs.jxck.io/promise/withResolvers/


## Resources

- Spec
  - ES Promise.withResolvers (2023)
    - https://tc39.es/proposal-promise-with-resolvers/
- Explainer
  - tc39/proposal-promise-with-resolvers
    - https://github.com/tc39/proposal-promise-with-resolvers
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
- Blog
  - Promise.withResolvers Labs
    - https://labs.jxck.io/promise/withResolvers/
- Presentation
- Issues
- Other