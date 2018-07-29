# [origin trials][service worker][offline] Link rel=serviceworker ヘッダによる API やアセットの Offline 対応

## Intro

Service Worker を登録する方法は現状 3 つある。

HTML meta タグでの追加ならば、 Service Worker を追加するためだけの JS であれば不要になる。

HTTP ヘッダでの追加ならば、 HTML を持たない API にも Service Worker を追加した対応が可能である。

次の記事で foreign fetch について解説する予定であるため、その前提知識として本機能を分離し紹介する。


## JS での登録

ページ上で実行されている JS (`main.js` とする) の中で Service Worker のコード(`sw.js` とする)を登録する場合は、以下のようになる。


```js
// main.js
navigator.serviceworker.register("/sw.js", { scope: "/" });
```

Service Worker は、その処理(ここでいう `sw.js` の中身)をインラインで登録することはできず、必ず別のファイルに分けて Registration 処理の中で読み込む必要がある。

これは、たとえそのページが `sw.js` の登録以外に JS を一切利用しないような場合でも、この 1 行のためだけにページ上で動く `main.js` を読み込ませる必要があることを意味する。

もし他の JS があったとしても、そのファイルへの変更が難しい場合や、 Service Worker の登録ロジックを分離するためにファイルを分けたい場合などもある。


## HTML link tag での登録

`sw.js` を登録するだけであれば、 HTML のメタタグを用いて行うことができる。

(`registrer()` の引数相当は、 HTML attributes で表現する)


```js
<link rel="serviceworker" href="sw.js" scope="/">
```

これによって登録のためだけの `main.js` を読み込むオーバーヘッドがなくなる。

もしくは、別の JS から登録の処理を分離できるため、ページ(URL)単位でのハンドリングで有利な場合もあるだろう。

(なお、 [AMP](https://blog.jxck.io/entries/2016-02-01/amp-html.html) では現在 `<link>` の `rel` には `serviceworker` が許容されていないため、この方法は使えない。

代わりに [amp-install-serviceworker](https://www.ampproject.org/docs/reference/components/amp-install-serviceworker) が提供されているが、 `<link>` がサポートされていればこれは不要と考えているので [issue](https://github.com/ampproject/amphtml/issues/6601) を登録しておいた。)


## HTTP Link Header での登録

同じことを HTTP のレスポンスだけで行うこともできる。

(`registrer()` の引数相当は、 HTTP Header の attribute で表現する)


```http
Link: <sw.js>; rel="serviceworker"; scope="/"
```

このヘッダをレスポンスに付与すれば Service Worker を登録することができる。

これによって、コンテンツを一切いじらずにサーバの設定だけで、 Service Worker の登録が可能になる。

(ちなみに、この方法は AMP でも使える)

それだけに留まらず、そもそも Service Worker の登録に Web ページが不要になることをも意味する。


## DEMO

基本は次回の記事で解説する foreign-fetch と合わせた利用が主なユースケースになるため、 「Link ヘッダで Service Worker を登録する」という一点に絞ったデモを用意した。

以下のリンクは、ボタンが 1 つあるページに遷移し、ボタンをクリックすると、同じオリジンの `./random` を fetch する。 `./random` はランダムな数字を返すと同時に Service Worker を Link ヘッダで提供する。

この Service Worker を登録した後は、ページをオフラインにしても Service Worker にフォールバックして引き続き乱数を取得できることに注目したい。

[Link rel=serviceworker DEMO](https://labs.jxck.io/service-worker/link-rel-service-worker/)

ただし、ページそのものはオフライン対応してないため、リロードはできない点に注意。

これは、 1 つのページの controller になれる Service Worker は同時に 1 つという制限があるためである。


## そして foreign fetch へ

Link ヘッダや、タグを用いた Service Worker の登録が可能になったことについて解説した。

しかし、ここでは、 `./index.html` も `./random` も同じドメインであったため、ページと `./random` の API を両方オフライン対応するためには、両方を 1 つの Service Worker で処理する。

ところが、もし `./random` のような API が 3rd Party API つまり 別のオリジンだった場合はどうだろうか。

そこで出て来るのが、次に解説する [foreign fetch](https://blog.jxck.io/entries/2016-12-12/foreign-fetch.html) である。
