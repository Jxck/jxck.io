# [cache][cookie][security][http] Clear-Site-Data Header


## Intro

Clear-Site-Data Header の実装が進んでいる。

このヘッダについて解説する。


## Clear-Site-Data

例えばログアウト処理を実施する場合は、レスポンスヘッダで Cookie を無効にするといった形で実現されるだろう。

しかし、最近では Cookie 以外にも多くのストレージがあり、アカウント特有のデータが保存されていることが多い。

- local storage
- session storage
- indexed db
- service worker
- cache api

これらを、ログアウト処理の中で各 API を適切に呼び出し、全て確実に削除するのは簡単ではない。

また、 httponly の Cookie や browser cache などは、 JS からの削除もできない。

SPA のように実装されている場合は、その状態を含めて初期化しないと不整合が発生する場合もある。

こうした問題に対して策定されたのが、 Clear-Site-Data Header である。

- <https://w3c.github.io/webappsec-clear-site-data/#http-headerdef-clear-site-data>

ブラウザにあるデータ削除機能が、 API として出たというイメージだ。

ページを遷移しなくても、 `fetch()` などで受信したレスポンスヘッダに含まれれば、そのコンテキストで削除が実施される。


## Claer-Site-Data Header

ヘッダの値に Type を列挙するだけである。


```http
Clear-Site-Data: "cache"
Clear-Site-Data: "cache", "cookies", "storage", "executionContexts"
Clear-Site-Data: "*"
```

Type は現時点では以下が定義されている。

- `cookies`
- `cache`
- `storage`
- `executionContexts`
- `*`

各 Type で解説する。


### cookies

httponly, secure の有無に関わらず、全ての Cookie が消える。

(`document.cookie` や [Cookie Store API](https://wicg.github.io/cookie-store/explainer.html) も全て同じ Cookie を見ているため、 storage ではなく cookie である)

また Basic Auth の Authorization Header や TLS の Channel ID 、 Token Binding なども対象になっている。


### cache

ブラウザキャッシュのみであり、 Cache API は storage 扱いとなる。


### storage

対象は以下

- localStorage
- sessionStorage
- indexedDB
- service worker
- cache api
- file system api (未確認)
- web sql db (未確認)
- application cache (未確認)
- flash plugin data (未確認)

例えば service worker だけは残したい、といった細かい調節はできない。


### executionContext

実行コンテキストをクリアする、つまりリロードを行う。

挙動は `location.reload()` を実行するのと同等だが *開いている他のタブも全てリロード* される。

これにより、メモリ上の値なども全てクリアされるため、アプリケーションが持つステートなどを初期化できる。

挙動がわかりにくいところがあるが、執筆時点で唯一実装している Firefox Nightly 63.0a1 では、遷移したページがこれを返すと無限にリロードしてしまう。

JS でリクエストした場合は、そうはならないので、提供方法は注意が必要だろう。


### * (all)

全てを消す。

しかし、将来に Type が追加された場合は、それらを全て含むことになる。

よって、ショートハンドとして安易に `*` を使うと、前方互換性が保たれない可能性がある。

それを踏まえて、セーフリストを選択するべきかどうかは考慮が必要となる。


## User Case

一番わかりやすい例は Logout の処理だろう。

ヘッダは以下のように提供できる。

- logout ページに遷移する際のヘッダに載せる
- logout 用の API を JS からリクエストする

Type は `cache, cookie, storage, executionContext` を全て載せることになるだろう。

executionContext は他の Tab を含めて対応するために

他にも、脆弱性が判明した場合に、開いているタブなども含め確実に修正版を表示させるといった用途にも使える。

強制的なログアウトが可能な運用をしている場合は、そのタイミングで提供できるだろう。


## JS API

現状削除されているが、もともとは JS の API も合わせて定義されていた。


```js
navigator.storage.clear("cache")
```

しかし、 `navigator.storage.clear("executionContexts")` を実行した場合、開いている全てのタブにおいて `location.reload()` 相当が実行されるという API の設計に疑問が出た。

- [storage.clear("executionContexts") ends up doing a reload across tabs - Issue #21 - w3c/webappsec-clear-site-data](https://github.com/w3c/webappsec-clear-site-data/issues/21)

結果、一旦これは Drop され、ニーズがあれば再度議論することとなった。


## DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/clear-site-data/>


## Link

- <https://github.com/mozilla/standards-positions/issues/90>
- <https://bugzilla.mozilla.org/show_bug.cgi?id=1268889>
- <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Clear-Site-Data>
