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





本サイトに Service Worker を導入し、リソースのキャッシュによる最適化を実施した。

この最適化は、キャッシュの鮮度を極力損ねないために、ロード完了後にキャッシュをリフレッシュし、実際にキャッシュストレージからは一回しか取り出さない方式を採用した。

本エントリではこれを One Time Cache と呼ぶ。

またそれをライブラリとして切り出したため、入れるだけでサイトのキャッシュが効くようになる。

合わせて、オフライン対応にもなる。





## Service Worker

Service Worker については、もう特に解説は必要ないだろう。

今回はこれを登録し、透過プロキシとして動作させる。

透過として扱うことで、これが利用可能なブラウザでは閲覧が改善する一方、 SW が使えないブラウザや、 JS が利用できない AMP 対応ページでの動作も、閲覧が可能になる。


## One Time Cache

Service Worker の用途の一つに、キャッシュへの保存がある。

onfetch イベントを補足し、リクエストとレスポンスの対を Cache に保存することで、以降のリクエストではそのキャッシュから中身を取り出す。


```js



```

ただし、このキャッシュの内容はブラウザキャッシュとは別であるため、スクリプト内で管理する必要がある。

キャッシュが効くことでコンテンツの取得を高速化できる一方で、キャッシュの中身が古くなると、サイト側でコンテンツを更新しても、ユーザには古い情報が表示されてしまう。

そこで本サイトでは、キャッシュのライフサイクルを以下のように設計した。

1. キャッシュが空の場合 fetch する。それをブラウザに返し、キャッシュに追加する。
2. キャッシュがある場合は、それを返し、裏で fetch してキャッシュを更新する。

表示を高速化するため、一度だけキャッシュを使い、裏でそれをリフレッシュする。

これによって、リアルタイムに変更されていくリソースでも、キャッシュがある場合は表示が早くなり、そのキャッシュも、すぐに更新することができる。

本サイトは、読むのに多少時間をとるコンテンツが中心であるため、ユーザが滞在している時間に裏で fetch を行うという戦略である。

ページを表示すれば必ず fetch が走るため、同じキャッシュが使われるのは高々一回となるはずである。

本サイトでは、便宜上これをワンタイムキャッシュと呼ぶことにする。

これは、ブラウザの Cache-Control や ETag では実現が難し処理である。




## Claim

Service Worker は、最初の画面遷移時にインストールされ、通常は次の遷移で有効になる。

しかし、最初のページから次のページへ遷移する時点で、次のページのレスポンスはキャッシュしておきたい。

そこで、すぐにそのページからの fetch イベントをキャプチャできるように、 Service Worker がインストールされたら、すぐにページをコントロール下に置くようにする。

それを実現する API として、 Claim が提供されているためこれを利用する。
