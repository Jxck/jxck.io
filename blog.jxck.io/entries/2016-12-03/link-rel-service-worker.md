# [fetch][service worker][offline] Link rel=serviceworker による API やアセットの Offline 対応


## Intro

Service Worker を登録する方法は主に三つある。
HTTP ヘッダからも行えるため、 HTML を持たない API も Offline 対応が可能である。
次の記事で foreign fetch について解説する予定であるため、その前提知識として本機能を分離し紹介する。


## JS での登録

Service Worker は、その処理をインラインで登録することはできず、必ず別のファイル(`sw.js` とする)に分けて Registration 処理の中で読み込む必要がある。

基本的には、ページ上で別途実行されている JS (`main.js` とする) の中で、以下のように登録する。


```js
// main.js
navigator.serviceworker.register("/js/sw.js", { scope: "/" });
```

ところが、この場合はページが Service Worker のみ登録できればよく、それ以外に一切 JS を使ってないページがあった場合に、 `sw.js` を登録するこの一行のために `main.js` が必要になるため無駄が多い。

もし他の JS を使っていたとしても、そのファイルへの変更が難しい場合や、ロジックを分離するためにファイルを分けたい場合などもある。


## HTML tag での登録

`sw.js` を登録するだけであれば、 HTML のメタタグを用いて行うことができる。
(`registrer()` の引数相当は、 HTML attributes で表現する)


```js
<link rel="serviceworker" href="sw.js" scope="/">
```

これによって登録のためだけの `main.js` を読み込むオーバーヘッドがなくなる。
もしくは、別の JS から登録の処理を分離できるため、ページ(URL)単位でのハンドリングで有利な場合もあるだろう。


## HTTP Header での登録

同じことを HTTP のレスポンスだけで行うこともできる。
(`registrer()` の引数相当は、 HTTP Header の attribute で表現する)

```
Link: <sw.js>; rel="serviceworker"; scope="/"
```

このヘッダをレスポンスに付与すれば Service Worker を登録することができる。
これによって、コンテンツを一切いじらずにサーバの設定だけで、 Service Worker の登録が可能になる。
それだけに留まらず、そもそも Service Worker の登録に Web ページが不要になることをも意味する。


## DEMO

基本は次回の記事で解説する foreign-fetch と合わせた利用が主なユースケースになるため、 「Link ヘッダで Service Worker を登録する」という一点に絞ったデモを用意した。

以下のリンクは、ボタンが一つあるページに遷移する。

ボタンをクリックすると、同じオリジンの `./random` を fetch する。 `./random` はランダムな数字を返すと同時に Service Worker を Link ヘッダで提供する。

この Service Worker を登録した後は、ページをオフラインにしても Service Worker にフォールバックして引き続き乱数を取得できることに注目したい。

[Link rel=serviceworker DEMO](https://labs.jxck.io/service-worker/link-rel-service-worker/)

(ただし、ページ自体は offline ではない点に注意)


## そして foreign fetch へ

Link ヘッダや、タグを用いた Service Worker の登録が可能になったことについて解説した。
しかし、ここでは、 `./index.html` も `./random` も同じドメインであったため、両方を一つの Service Worker で処理すれば済む話ではある。

しかし、もし `./random` のような API が Third Party API つまり 別のオリジンだった場合はどうだろうか。
そこで出て来るのが、次に解説する foreign fetch である。
