# Service Worker Bootcamp

## Registration

ここでスクリプトを取得し、登録する。
既に登録されていれば何も起こらないので、気にしないで良い。

```
console.log('master');
navigator.serviceWorker.register('worker.js').then((registration) => {
  console.log('registration');
}).catch(console.error.bind(console));
```

```
console.log('worker');
```


## onfetch

ブラウザ(client) が発行したリクエストをフックする。

```js
console.info(' worker');

self.addEventListener('fetch', (e) => {
  let path = new URL(e.request.url).pathname;
  if (path === '/registration/test') {
    e.respondWith(new Response('test'));
  }
  return;
});
```

存在しないページへのリクエストで、 SW からレスポンスが返る。

```html
<a href=test>test</a>
```

しかし、登録直後に、以下のようなボタンをクリックしても、リクエストがフックされない。

```html
<a href=test>test</a>
<input id=test type=button value=test />
```

```js
document.getElementById('test').addEventListener('click', () => {
  fetch('test').then((e) => {
    console.log(e);
  });
});
```

SPA などで引っかかりやすい。
これはライフサイクルと関係している。


## lifecycle

install と active イベントがある。

```js
console.info(' worker');

self.addEventListener('install', (e) => {
  console.info(' install', e);
});

self.addEventListener('activate', (e) => {
  console.info(' activate', e);
});
```

ログをみると、 master.js で register の Promise が resolve してから、 `install` イベントが起きてる。

ただし、 active になっているが、 controller になっていない。
これは、すでにページでインタラクションがおこっていた場合などに、
不整合をおこしたりしないため。

ページを表示するときに controller になれば、問題は少ないので、
リロードすると contoller になる。


## claim

active イベントの発火直後に controller にしたいなら
claim() を呼ぶ

```js
self.addEventListener('activate', (e) => {
  console.info(' activate', e);
  e.waitUntil(self.clients.claim());
});
```

すると、すぐさま controller になる。
ボタンクリックの fetch もすぐ proxy されるようになる。


なお、 master.js の方で registration が終わったらすぐに fetch したいような場合。

`navigator.serviceWorker.ready` の resolve を待てば activate は待てる。
しかし、 controller の設定はそれよりも遅れるので、これではできない。

```js
navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then(() => {
  return fetch('test'); // 404
});
```


fetch が proxy されるのは、 controller が設定されてから。
つまり controller change イベントがおこってから。

```js
navigator.serviceWorker.addEventListener('controllerchange', () => {
  fetch('test'); // 200
});
```

しかし、一旦 controller が設定されるともう発火しない。
すでに controller が設定されているかは

`navigator.serviceWorker.controller`

でわかる。

つまり、こう書けば初回を含め毎回かならず fetch ヒットする。


```js
let controller = new Promise((resolve, reject) => {
  navigator.serviceWorker.addEventListener('controllerchange', resolve);
});

navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then(() => {
  if (navigator.serviceWorker.controller) {
    return navigator.serviceWorker.controller;
  }
  return controller;
}).then((controller) => {
  return fetch('test');
}).then((res) => {
  console.log(res);
}).catch(console.error.bind(console));
```


## 更新

ライフサイクルの理解は、 sw をアップデートするときにより重要になる。

master.js はいくら更新しても変わらないが、 worker.js が 1byte でも変わると
register 時に sw のアップデートプロセスが走る。

例えば、 v1 でインストールしておく。

```js
const v = 1;
console.info(` worker${v}`);

self.addEventListener('install', (e) => {
  console.info(` install${v}`);
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info(` activate${v}`);
});
```

1byte 変更して v2 に変える。

リロードすると、 install2 が発火するが activate2 はすぐには発火しない。

実はこの時点では v1 が active で v2 は waiting の状態。

すでに controller がいる場合は、その controller をいきなり置き換えると不整合が発生するかもしれない。

そこで、ページを閉じて次に開いたとき、完全に置き換えて大丈夫なタイミングで置きかわる。


skipWaiting() を使うと、一気に activate2 までいける。

```js
console.info(' worker');
const v = 2;
console.info(` worker${v}`);

self.addEventListener('install', (e) => {
  console.info(` install${v}`);
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info(` activate${v}`);
});
```

ただし、 active になっても controller ではないので、更新後すぐ使いたいなら、 claim と併用する。

なお、今どの状態にあるかは、 registration object に入ってる。

```js
navigator.serviceWorker.register('worker.js').then((registration) => {
  console.log('installing', registration.installing);
  console.log('waiting', registration.waiting);
  console.log('active', registration.active);
}).catch(console.error.bind(console));
```

###

ファイルが 1byte でも変わると、 Update が発生したと認識され updatefound イベントが発火する。
このとき、 install が発生し、 registration.installing に入る。

```js
// master.js
navigator.serviceWorker.register('worker.js').then((registration) => {
  registration.addEventListener('updatefound', (e) => {
    console.log('updatefound', e);
    console.log('installing', registration.installing);
    console.log('waiting', registration.waiting);
    console.log('active', registration.active);
  });

  console.log(navigator.serviceWorker.controller);
  return navigator.serviceWorker.ready;
}).then((registration) => {
```

installing に入ったら、例えばページを移動して戻ったりすれば、コントロールが入れ替わる。

skipWiting を用いると、これを強制的に Controller にできる。

```js
// worker.js
self.addEventListener('install', (e) => {
  console.log('install', e);
  e.waitUntil(skipWaiting());
});
```


fetch を 3 秒後に行うとかすれば、差し代わったことが分かる。

```js
// master.js
fetch('hello.html').then((res) => {
  res.text().then((text) => {
    console.log(text);
  });
});

setTimeout(() => {
  fetch('hello.html').then((res) => {
    res.text().then((text) => {
      console.log(text);
    });
  });
}, 3000);
```

以前は update を呼べば強制できたが、今はそういうことができなくなった。

一番簡単なのは `?ver=1` などのクエリをつける。
キャッシュが切れて updatefound される。

## Cache

cache する。

```js
self.addEventListener('fetch', (e) => {
  let req = e.request.clone();
  caches.open(CACHE_KEY).then((cache) => {
    return cache.match(req).then((res) => {
      if (res) return res;

      return fetch(req).then((res) => {
        cache.put(req, res);
        return res;
      });
    });
  });
});
```


## path

register 時に path を指定できる。
path を変えれば一つのドメイン以下に複数の sw を登録することが可能。
しかし、一つのページ(client) に対して、起動する(controller) となる sw は必ず一つ。
そして、その sw はパスとの最長一致で決まる。

省略すれば `{scope:'.'}` と同じ。

```js
navigator.serviceWorker.register('worker.js')
```

そして、この `'.'` は worker.js のパス階層を意味する。

https://example.com/foo/worker.js を '.' で登録すると、そのパスは
https://example.com/foo を意味する。

この worker.js は `/foo` 以下のパスであれば register できる。
例えば `{scope: '/foo/bar'}` も `{scope: '/foo/bar/index.html'}` も可能

ただし、 `/foo/worker.js` を `/index.html` や `/baz` に登録することはできない。

その場合は Service-Worker-Allowed ヘッダを指定する。

```
Service-Worker-Allowed: `/baz`
```

これで `/assets/js/worker.js` などに sw の js をおける。



ここで

- `/foo/`
- `/foo/bar/`
- `/foo/bar/index.html`

と三つの scope で sw が登録されていたとする。

起動する sw はパスとの最長一致で決まるので、
こうなる

- `/foo/bar/index.html` なら 3
- `/foo/bar/baz/main.html` なら 2
- `/` なら起動しない

逆に scope `/` に sw が登録されていれば、全てのページをコントロールできる。

もし、全てのページの中で一つだけ `/foo/bar/baz/test.html` だけ sw の影響を与えたく無いという場合は、
`/` に登録した sw の中で分岐するか、 `/foo/bar/baz/test.html` の scope に対してピンポイントに
空の sw を登録するという方法もある。


## backgroundsync

chrome://flags/#enable-experimental-web-platform-features

オンラインの場合はすぐに
オフラインの場合は、オンラインになったら発火するイベント
正確にはオンライン/オフラインではなく、「サーバと接続可能になったら」なので、
クライアントがもっと別の要素を持ち込む可能性もある。(バッテリー、電波状態など)

```
return registration.sync.register('update-cache');
```

```
self.addEventListener('sync', (e) => {
  console.info(` sync`, e);
  return fetch('/test.html').then(console.log.bind(console));
});
```


発火タイミングを考えると、サーバに送信して保存したいようなデータは、
fetch して reject でハンドラに設定するのではなく、
必ず sync のハンドラから送ると良い。


```
self.addEventListener('fetch', (e) => {
  self.addEventListener('sync', (e) => {
    fetch(e.request);
  });
});
```

ただし、この e.request はメモリ上のデータであり、送信される前に sw が落ちると消える可能性がある。
よって、一旦 index.db などに保存するのが望ましい。


## quota

TBD

```
navigator.webkitTemporaryStorage.queryUsageAndQuota
webkitStorageInfo.queryUsageAndQuota
navigator.storageQuota.queryInfo 
```
