# Service Worker Bootcamp

## Registration

ここでスクリプトを取得し、登録する。


```js
const registration = await navigator.serviceWorker.register('worker.js')
console.log(registration);
```


```js
console.log('worker');
```


## onfetch

ブラウザ(client) が発行したリクエストをフックする。


```js
console.info(' worker');

self.addEventListener('fetch', (e) => {
  const path = new URL(e.request.url).pathname;
  if (path.endsWith('./test')) {
    // レスポンスを生成して返す
    e.respondWith(new Response('test'));
  }
  // 実際にサーバにリクエストを投げる
  return;
});
```

存在しないページへのリクエストでも、 SW からレスポンスが返る。


```html
<a href=test>test</a>
```

しかし、登録直後に、以下のようなボタンをクリックしても、リクエストがフックされない。


```html
<a href=test>test</a>
<button id=test value=test></button>
```


```js
$('test').on('click', () => {
  const res = await fetch('test')
  console.log(res)
})
```

SPA などで引っかかりやすい。

これはライフサイクルと関係している。


## lifecycle

install と active イベントがある。


```js
console.info(' worker')

self.on('install', (e) => {
  console.info(e.type)
});

self.on('activate', (e) => {
  console.info(e.type);
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
self.on('activate', (e) => {
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
const registration = await navigator.serviceWorker.register('worker.js')
await navigator.serviceWorker.ready;
fetch('test'); // 404
```

fetch が proxy されるのは、 controller が設定されてから。

つまり controller change イベントがおこってから。


```js
navigator.serviceWorker.on('controllerchange', () => {
  fetch('test'); // 200
});
```

しかし、一旦 controller が設定されるともう発火しない。

すでに controller が設定されているかは

`navigator.serviceWorker.controller`

でわかる。

つまり、こう書けば初回を含め毎回かならず fetch ヒットする。


```js
const registration = await navigator.serviceWorker.register(KEY)
console.log(await navigator.serviceWorker.ready)

// controller があればそのまま、なければ controllerchange を待つ
if (!navigator.serviceWorker.controller) {
  await new Promise((done) => {
    navigator.serviceWorker.addEventListener('controllerchange', done)
  })
}
console.log(navigator.serviceWorker.controller)
```

ただし、更新した場合はここは通らない。


## 更新

ライフサイクルの理解は、 sw をアップデートするときにより重要になる。

sw は特定のタイミングで worker.js を取得し、取得しているものと 1byte でも変わると、再度それを取得し、アップデートするプロセスが走る。

この更新確認のタイミングはいくつかある。

- update() を呼んだ時
- 登録から 24h 経過した時
- ブラウザが必要と判断したとき
  - Chrome はイベントなどによる SW 起動時に確認


また、その確認がブラウザのキャッシュを見るか見ないかも違ってくる。

- 24h 毎の確認: 悪意のある sw が永続化しないようにキャッシュを見ない
- それ以外: register の updateViaCache の値に応じる
  - all: 全てキャッシュを見る
  - imports: import() したもののみキャッシュを見る
  - none: 全部キャッシュを無視


### updatefound

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


仮に v1 から v2 にアップデートするとする


```js
self.addEventListener('install', (e) => {
  console.info(e.type)
});

self.addEventListener('activate', (e) => {
  console.info(e.type)
});
```

リロードすると、 install が発火するが activate はすぐには発火しない。

実はこの時点では v1 が active で v2 は waiting の状態。

すでに controller がいる場合は、その controller をいきなり置き換えると不整合が発生するかもしれない。

そこで、ページを閉じて次に開いたとき、完全に置き換えて大丈夫なタイミングで置きかわる。

`skipWaiting()` を使うと、一気に v2 を activate できる。


```js
self.addEventListener('install', (e) => {
  console.info(`install`);
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info(`activate`);
});
```

ただし、 active になっても controller ではないので、更新後すぐ使いたいなら claim と併用する。

なお、今どの状態にあるかは、 registration object に入ってる。


```js
navigator.serviceWorker.register('worker.js').then((registration) => {
  console.log('installing', registration.installing);
  console.log('waiting', registration.waiting);
  console.log('active', registration.active);
}).catch(console.error.bind(console));
```


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


```http
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


```js
return registration.sync.register('update-cache');
```


```js
self.addEventListener('sync', (e) => {
  console.info(` sync`, e);
  return fetch('/test.html').then(console.log.bind(console));
});
```

発火タイミングを考えると、サーバに送信して保存したいようなデータは、

fetch して reject でハンドラに設定するのではなく、

必ず sync のハンドラから送ると良い。


```js
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






## pattern

パターンは以下の三つの組み合わせになる。

- 事前に行うキャッシュの準備
- キャッシュとサーバアクセスの優先順位
- キャッシュの更新




### キャッシュを行うタイミング

コンテンツを static/dynamic の二つに大別した場合、キャッシュをどのタイミングで準備するのかが変わってくる。

- static
  - すでに URL が判明しているなら、 install/activate などのフェーズで取得可能





あらかじめ判明しているアセットのリストがある場合、 SW の install/activate などのタイミングでキャッシュを事前に取得しておくことができる。
ここでどこまでを入れておくか



```js
self.on('install', (e) => {
  async function prepare_cache() {
    const cache = await caches.open('statics-v1')
    await cache.addAll([
      'webfont.woff',
      'hero.png',
    ])
  }
  e.waitUntil(prepare_cache())
})
```

このとき、 SW を更新した場合にキャッシュもバージョンを変えて入れ直す場合は、 install で新しいものを取得し、 activate で消すと良い。





```js
const VERSION = 'statics-v2'
self.on('install', (e) => {
  async function prepare_cache() {
    const cache = await caches.open(VERSION)
    await cache.addAll([
      'webfont.woff',
      'hero.png',
      'bundle.js',
      'style.css',
      'favicon.ico',
    ])
  }
  e.waitUntil(prepare_cache())
})

self.on('activate', (e) => {
  async function clean_cache() {
    const keys = await caches.keys()
    const old_keys = keys.filter((key) => key !== VERSION)
    await Promise.all(old_keys.map((key) => caches.delete(key)))
  }
  e.waitUntil(clean_cache())
})
```



