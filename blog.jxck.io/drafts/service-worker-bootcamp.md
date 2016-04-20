# Service Worker Bootcamp

## Registration

登録する。


```
navigator.serviceWorker.register('/worker.js', { scope: '/' }).then((registration) => {
  console.log('master');
});
```

```
console.log('worker');

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

controller が変化すると controllerchange event が発火するため、 master 側でそれを捕捉できる。

```js
navigator.serviceWorker.addEventListener('controllerchange', (e) => {
  console.log('controllerchange', e);
});
```


なので、 contoller が登録された後であれば、 sw を使える。

```js
// master
navigator.serviceWorker.register('worker.js').then((registration) => {
  console.log(navigator.serviceWorker.controller);
  return navigator.serviceWorker.ready;
}).then((registration) => {
  if (navigator.serviceWorker.controller) {
    return registration;
  }
  return new Promise((resolve, reject) => {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      resolve(registration);
    });
  });
}).then((registration) => {
  console.log(registration);
  fetch('hello.html').then((res) => {
    res.text().then((text) => {
      console.log(text);
    });
  });
}).catch(console.error.bind(console));
```


```js
// worker
self.addEventListener('activate', (e) => {
  console.log('activate', e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  if (e.request.url === 'http://localhost:3000/hello.html') {
    e.respondWith(new Response('world'));
  } else {
    return
  }
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


