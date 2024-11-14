# [cookie store][cookie] Cookie Store API による document.cookie の改善

## Intro

JS から Cookie を操作する `document.cookie` の改善を目的とした Cookie Store API についてまとめる。


## document.cookie

`document.cookie` は、ブラウザの API における代表的な技術的負債の一つと言える。

- HTML Standard
  - https://html.spec.whatwg.org/multipage/dom.html#dom-document-cookie

基本的な使い方は以下だ。

```js
document.cookie = "a=b"
console.log(document.cookie) // a=b
```

まず、この API の問題を振り返る。


### 同期 API

最も深刻なのは、I/O を伴いながら、同期 API として定義されているところだ。

この API は古くから実装されているため、I/O は非同期 API として実装するという現在の大前提に反していながらも、互換性維持のためにそのままになっている。

しかし、後発の Service Worker は、その中で同期の I/O API の提供を許可しない。document.cookie や LocalStorage が使えないのはそのためだ。

LocalStorage は IndexedDB で代替できるが、Cookie へのアクセスは代替がない。しかし、SW からも Cookie にアクセスしたい要求があった。

- Add cookie accessor/setter methods? · Issue #707 · w3c/ServiceWorker
  - https://github.com/w3c/ServiceWorker/issues/707


### Cookie の Encode/Decode

document.cookie は単なる setter/getter であるため、値をシリアライズした文字列で扱う。

文字列のパース/シリアライズは、全てユーザランドで実装する必要があるのだ。

ちゃんとやるなら RFC に書かれた BNF をベースに実装することになるが、多くの場合 `;` と `=` で Split する手軽な実装で間に合わせられているだろう。

```js
const cookie = new Map(
  document
    .cookie
    .split(`;`)
    .map((e) => e.trim().split("="))
)
```

逆も同様だ。

```js
document.cookie = [
  `__Host-session_id=deadbeef`,
  `Max-Age=${60 * 60 * 24}`,
  `Secure`
].join("; ")
```

また、例えば `document.cookie` 経由で `HttpOnly` な Cookie を Set しようとしたりしても、特にエラーにはならない。

もちろん、ブラウザの中には Battle Tested な Cookie のパース/シリアライズロジックが入っているにもかかわらず、それを叩く API が提供されていなかった。


### Cookie の削除

Cookie を明示的に削除する API は存在せず、`Expires` を過去にするか `Max-Age=0` にするといった方法が必要になる。これは、`Set-Cookie` ヘッダでも同様だ。

`Clear-Site-Data` を用いればスコープ内の Cookie 全てを消すことは可能だが、こちらは特定の値を狙って消すことはできない。


## Cookie Store API

そこで、Cookie にアクセス可能な非同期 API として *Async Cookie API* の策定が始まり、そこに様々な負債を解消するためのプリミティブが詰め込まれ、*Cookie Store API* と名前を変えて今に至る。

- WICG/cookie-store: Asynchronous access to cookies from JavaScript
  - https://github.com/WICG/cookie-store


### set

基本的な Set は以下のようになる。

```js
await cookieStore.set("__Host-session_id", "deadbeef")
```

属性を指定する場合は Object を渡す。

```js
await cookieStore.set({
  name: "__Host-session_id",
  value: "deadbeef",
  expires: Date.now() + 1000 * 60 * 60 * 24,
  path: "/",
})
```

設定していない属性はデフォルト値になる。


### get

取得は名前を指定して行う。

```js
await cookieStore.get("__Host-session_id")
// {
//   name: "__Host-session_id",
//   value: "deadbeef",
//   expires: Date.now() + 1000 * 60 * 60 * 24,
//   domain: null,
//   path: "/",
//   secure: true,
//   sameSite: "lax"
// }
```

同一名で複数の Cookie が付与されている場合は、`getAll` で全て取得できる。

```js
await cookieStore.getAll("__Host-session_id")
```

また、Cookie が `Path` のスコープであるため、URL ベースでクエリすることもできるようになっている。

```js
await cookieStore.getAll({ url: "/admin" })
```


### delete

Cookie には HTTP にも `document.cookie` にも「削除」の API はなく、過去の日付で上書きするといった方法が取られていた。

この仕様には、明示的な `delete()` が定義されている。

```js
await cookieStore.delete("__Host-session_id")
```

名前以外に、`domain` / `path` でもできる。

```js
await cookieStore.delete({ path: "/admin" })
```


### onchange

ドキュメント内での Cookie の変更をイベントで取得できる。

```js
cookieStore.addEventListener("change", (event) => {
  const changed = event.changed // 変更された Cookie のリスト
  const deleted = event.deleted // 削除された Cookie のリスト
})
```

このイベントは Service Worker からも取得できる。

しかし、すべての Cookie の変更のたびに SW を起動するとコストが高いため、特定の Cookie の変更をあらかじめ Subscribe する必要がある。

```js
self.addEventListener("install", (event) => {
  event.waitFor(async () => {
    await cookieStore.subscribeToChanges([
      {
        // "session" で始まる Cookie の変更を Subscribe
        name: "session",
        matchType: "starts-with"
      }
    ])
  })
})

self.addEventListener("cookiechange", (event) => {
  const changed = event.changed // 変更された Cookie のリスト
  const deleted = event.deleted // 削除された Cookie のリスト
})
```


## 仕様の論点

現在 Chrome は Ship 済みだが、Firefox / Safari は実装しておらず、Position も blocked になっている。

- Cookie-Store API · Issue #94 · mozilla/standards-positions
  - https://github.com/mozilla/standards-positions/issues/94
- Cookie Store API · Issue #36 · WebKit/standards-positions
  - https://github.com/WebKit/standards-positions/issues/36

論点としては、そもそも Cookie についてまだ解決されてない互換性上の問題があり、それが Cookie Store API によって解決し切れているとはいいきれないという主張のようだ。

それがはっきりしない限り Firefox / Safari のスタンスは変わらなそうだ。しかし、関連する Issue の議論も止まっているようだ。


## Outro

そもそも、Storage 系の API が整備されており他にも選択肢があるため、Cookie は `HttpOnly` を付与するのが基本で、JS からアクセスする機会はかなり減っている。

そして、`HttpOnly` な Cookie は `document.cookie` 同様 Set はできても Get/Subscribe できないため、ユースケースはかなり絞られたものになるだろう。

Cookie 周りのプリミティブが整理され、ぽっかり空いていた穴が埋められている点に一定の価値はあるが、他のブラウザの実装は進んでおらず、議論もしばらく止まっているようなので、今後どうなるのかは不明だ。


## Resources

- Spec
  - WICG/cookie-store: Asynchronous access to cookies from JavaScript
    - https://github.com/WICG/cookie-store
  - cookie-store/explainer.md at main · WICG/cookie-store · GitHub
    - https://github.com/WICG/cookie-store/blob/main/explainer.md
- Explainer
- Requirements Doc
  - Asynchronous Cookie Access on the Web
    - https://docs.google.com/document/d/1ak6JzOMMO5q3dXvu4mHFWR-LLvaDc09XDvdeJZLtZd4/edit
- Mozilla Standard Position
  - Cookie-Store API · Issue #94 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/94#issuecomment-1058080027
  - Mozilla Specification Positions
    - https://mozilla.github.io/standards-positions/#cookie-store
- Webkit Position
  - Cookie Store API · Issue #36 · WebKit/standards-positions
    - https://github.com/WebKit/standards-positions/issues/36
- TAG Design Review
- Intents
  - Intent to Ship: Cookie Store API
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/zOsGZGMGiM4
- Chrome Platform Status
  - Cookie Store API - Chrome Platform Status
    - https://chromestatus.com/feature/5658847691669504
- WPT (Web Platform Test)
- DEMO
- Blog
  - Chromium Blog: Chrome 87 Beta: WebAuthn in DevTools, Pan/Tilt/Zoom, Flow Relative Shorthands and More
    - https://blog.chromium.org/2020/10/chrome-87-beta-webauthn-in-devtools.html
  - Using the Cookie Store API
    - https://www.raymondcamden.com/2023/04/12/using-the-cookie-store-api
- Presentation
- Issues
  - Deal with non-UTF-8 cookies · Issue #189 · WICG/cookie-store
    - https://github.com/WICG/cookie-store/issues/189
  - [rfc6265bis] Cookie parser - UTF-8 chars · Issue #1073 · httpwg/http-extensions
    - https://github.com/httpwg/http-extensions/issues/1073#issuecomment-710012476
  - Cookie Store API · Issue #36 · WebKit/standards-positions
    - https://github.com/WebKit/standards-positions/issues/36
  - Cookie Store API · Issue #290 · w3ctag/design-reviews
    - https://github.com/w3ctag/design-reviews/issues/290
- Other
  - RFC: Proposal for an asynchronous cookies API - APIs - WICG
    - https://discourse.wicg.io/t/rfc-proposal-for-an-asynchronous-cookies-api/1652
  - ep74 Monthly Web 202009 | mozaic.fm
    - https://mozaic.fm/episodes/74/monthly-web-202009.html