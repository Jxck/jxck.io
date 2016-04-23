# Service Worker Bootcamp

## Registration

登録する。
既に登録されていれば何も起こらないので、気にしないで良い。

```
navigator.serviceWorker.register('/worker.js', { scope: '/' }).then((registration) => {
  console.log('registration');
});
```

```
console.log('worker');
```

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

## 更新

update したらどうなるか。

v1 でインストールして

```js
const v = 1;
console.info(` worker${v}`);

self.addEventListener('install', (e) => {
  console.info(` install${v}`, e);
});

self.addEventListener('activate', (e) => {
  console.info(` activate${v}`, e);
});
```

v2 に変える。

install2 が発火するが、 activate2 が発火するのは
ページが閉じられてから。

skipWaiting() を使うと、一気に activate2 までいける。

```js
console.info(' worker');
const v = 2;

self.addEventListener('install', (e) => {
  console.info(` install${v}`, e);
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info(` activate${v}`, e);
});
```

## controll

```
self.addEventListener('fetch', (e) => {
  let path = new URL(e.request.url).pathname;
  if (path === '/test.html') {
    e.respondWith(new Response('test'));
  }
  return;
});
```


この状態で '/test.html' に移動、してみる。


## ボタンから fetch してみる。


```html
<input type=button id=button value=button>
```

```js
document.getElementById('button').addEventListener('click', () => {
  fetch('/test.html').then((e) => {
    console.log(e);
  });
});
```

一回目は、 fetch できない。
リロードするとできる。

アクティブだが、コントローラーではないから。


## いつコントロールを始めるか

register された worker.js は、 install され active になる。

```js
self.addEventListener('install', (e) => {
  console.log('install', e);
});

self.addEventListener('activate', (e) => {
  console.log('activate', e);
});
```

これを registration 側で知るには。

registration.[installing, waiting, active] のどれかに入ってる。

```js
// master.js
navigator.serviceWorker.register('worker.js').then((registration) => {
  console.log('installing', registration.installing); // sw
  console.log('waiting', registration.waiting);
  console.log('active', registration.active);
}).catch(console.error.bind(console));
```

worker 側で activate イベントは起こっているけど、 master 側で resolve された時点では installing.

installing -> active に移ったかどうかは、 navigator.serviceWorker.ready の resolve() でわかる。

```js
// master.js
navigator.serviceWorker.register('worker.js').then((registration) => {
  console.log('installing', registration.installing); // sw
  console.log('waiting', registration.waiting);
  console.log('active', registration.active);
  console.log('=========================');
  return navigator.serviceWorker.ready;
}).then((registration) => {
  console.log('installing', registration.installing);
  console.log('waiting', registration.waiting);
  console.log('active', registration.active); // sw
}).catch(console.error.bind(console));
```

### controller

activate されても controll されているとは限らない。

すぐに control させたい場合は `activate` のタイミングで `claim()` をする。

```js
// worker.js
self.addEventListener('activate', (e) => {
  console.log('activate', e);
  e.waitUntil(self.clients.claim());
});
```

e.waitUntil によって claim() が終わるまでは activate が終わらなくなる。
つまり、 activate が終わったら reolve する ready を待っていれば、
コントローラが変わるのを待てる。


ちなみに。
controller が変化すると controllerchange event が発火するため、 master 側でそれを捕捉できる。

```js
navigator.serviceWorker.addEventListener('controllerchange', (e) => {
  console.log('controllerchange', e);
});
```


```js
// worker
self.addEventListener('activate', (e) => {
  console.log('activate', e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  let path = new URL(e.request.url).pathname;
  if (path === '/test.html') {
    e.respondWith(new Response('test'));
  }
  return;
});
```


## 更新

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






## quota

TBD

```
navigator.webkitTemporaryStorage.queryUsageAndQuota
webkitStorageInfo.queryUsageAndQuota
navigator.storageQuota.queryInfo 
```
