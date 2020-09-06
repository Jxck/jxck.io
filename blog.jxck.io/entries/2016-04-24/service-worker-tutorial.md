# [service worker][tutorial] 中級者向け Service Worker Tutorial


## Intro

Service Worker の初心者向けのチュートリアルや、使ってみた系のエントリも増えてきました。

しかし、 Service Worker は通常のブラウザ用 JS の開発と少し経路が違い、慣れるまで開発やデバッグもなかなか難しいと思います。

そこで特に難しい部分、そして分かっていないと実際にデプロイした際に難しいと思う部分について、実際に動きを確認しながら解説したいと思います。

なお、 Service Worker の基本的な概念などについては、他のチュートリアルなどを見て理解している前提で進めます。

思いつきで撮ったので色々ミスも有ります、また Chrome Dev Tools の UI はどうせ変わるのでそのつもりで見てください。

TODO になっている動画は、そのうち撮って追加します。


## List

1. [#claim](#claim)
2. [#controllerchange](#controllerchange)
3. [#updatefound](#updatefound)
4. [#update()](#update())
5. [#backgroundsync](#backgroundsync)
6. [#push](#push)
    1. [#1. Google Developer Console](#1.+Google+Developer+Console)
    2. [#2.master.js](#2.master.js)
    3. [#3.worker.js](#3.worker.js)
    4. [#4.push.js](#4.push.js)


## claim

controller とは何か、いつ controller になるか、 `claim()` で何が起こるのかなどについて。


<iframe src="https://www.youtube.com/embed/m6qBg4M3RTA" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



```html
<!DOCTYPE html>
<meta charset=utf-8>
<title>Service Worker</title>

<h1>Service Worker</h1>

<a href=test>test</a>

<input id=test type=button value=test>

<script src=master.js></script>
```


```js
console.log('master');

document.getElementById('button').addEventListener('click', () => {
  fetch('/test');
});

navigator.serviceWorker.register('worker.js').then((registration) => {
  console.log(registration);
});
```


```js
console.info('worker');

self.addEventListener('activate', (e) => {
  console.info('activate', e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  let path = new URL(e.request.url).pathname;
  console.log(path);
  if (path === '/test') {
    e.respondWith(new Response('test'));
  }
  return;
});
```

- DEMO: <https://labs.jxck.io/service-worker/claim/index.html>


## controllerchange

register が終わった後、「新しく登録された controller が使えるようになったら」または「既に登録されている controller が使えるようになったら」という状態をとる方法と `controllerchange` イベント。


<iframe src="https://www.youtube.com/embed/XoI0FPDV8Xo" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



```js
console.log('master');

let controllerChange = new Promise((resolve, reject) => {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    resolve(navigator.serviceWorker.controller);
  });
});

navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then(() => {
  if (navigator.serviceWorker.controller) {
    return navigator.serviceWorker.controller;
  }
  return controllerChange;
}).then((controller) => {
  console.log(controller);
  fetch('/test');
});
```


```js
console.info('worker');

self.addEventListener('activate', (e) => {
  console.info('activate', e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  let path = new URL(e.request.url).pathname;
  console.info(path);
  if (path === '/test') {
    e.respondWith(new Response('test'));
  }
  return;
});
```

- DEMO: <https://labs.jxck.io/service-worker/controllerchange/>


## updatefound

Service Worker が更新される際の動きと、 `skipWaiting()` が何をスキップするのか?

`install`, `activate` イベントの用途。


<iframe src="https://www.youtube.com/embed/AMbQ7d9rjao" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



```js
console.log('master');

navigator.serviceWorker.register('worker.js').then((registration) => {
  registration.addEventListener('updatefound', (e) => {
    console.info('update', e);
  });
  return navigator.serviceWorker.ready;
});
```


```js
console.info('worker');

const ver = 1;

self.addEventListener('install', (e) => {
  console.info(` install${ver}`, e);
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info(` activate${ver}`, e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  let path = new URL(e.request.url).pathname;
  console.info(path);
  if (path === '/service-worker/updatefound/test') {
    e.respondWith(new Response('test'));
  }
  return;
});
```

- DEMO: <https://labs.jxck.io/service-worker/registration/>


## update()

`registration.update()` による worker の更新と、ブラウザキャッシュにヒットする場合の挙動。


<iframe src="https://www.youtube.com/embed/7uRVh9PzV5o" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



```js
console.log('master');

navigator.serviceWorker.register('worker.js').then((registration) => {
  registration.addEventListener('updatefound', (e) => {
    console.info('update', e);
  });

  return navigator.serviceWorker.ready;
}).then((registration) => {
  setInterval(() => {
    console.log('update()');
    registration.update();
  }, 1000);
});
```


```js
console.info('worker');

const ver = 1;

self.addEventListener('install', (e) => {
  console.info(` install${ver}`, e);
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info(` activate${ver}`, e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  let path = new URL(e.request.url).pathname;
  console.info(path);
  if (path.indexOf('test') > -1) {
    e.respondWith(new Response('test'));
  }
  return;
});

self.addEventListener('push', () => {
  self.registration.update();
});
```

- DEMO: <https://labs.jxck.io/service-worker/update/>


## backgroundsync

sync の発火タイミングと fetch を sync で送る場合の考え方。


<iframe src="https://www.youtube.com/embed/b7ZM7uzkykA" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



```js
// master.js
navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then((registration) => {
  // register sync
  document.getElementById('button').addEventListener('click', () => {
    registration.sync.register('sync-data').then(() => {
      console.log('sync registered');
    }).catch(console.error.bind(console));
  });
}).catch(console.error.bind(console));
```


```js
// worker.js
self.addEventListener('install', (e) => {
  console.info('install', e);
  e.waitUntil(skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info('activate', e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('sync', (e) => {
  console.log('sync', e);
});
```

- DEMO: <https://labs.jxck.io/service-worker/background-sync/>


## push

push に必要な情報とその取り方、投げ方。

*デモで作った API KEY は当たり前ですが無効にしてあります、全く同じ値を入れても動きません*


### 1. Google Developer Console

Console の UI はコロコロ変わります。以下の情報を頑張って探してください。

- プロジェクトを作る
- プロジェクト ID の数字を探す
- Google Cloud Messaging の API Key を探す
- manifest.json を作って HTML にリンクスする


<iframe src="https://www.youtube.com/embed/MlCZWVvUiXM" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



```json
{
  "name": "labs.jxck.io push demo",
  "short_name": "labs.jxck.io",
  "icons": [{
    "src": "/service-worker/push/jxck.png",
    "sizes": "256x256",
    "type": "image/png"
  }],
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#ccc",
  "gcm_sender_id": "************"
}
```

(`gcm_user_visible_only` は今はもういりません)


```html
<!DOCTYPE html>
<meta charset=utf-8>
<title>Service Worker Push Demo | labs.jxck.io</title>

<link rel=manifest href=manifest.json>

<script src=master.js></script>

<h1>Push DEMO</h1>
```


### 2.master.js

`endpoint`, `userAuth`, `userPublickKey` をなんらかの方法でサーバに送ります。


<iframe src="https://www.youtube.com/embed/f-ney12qAEI" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



```js
'use strict';
let p = console.log.bind(console);

navigator.serviceWorker.register('worker.js').then((registration) => {
  return navigator.serviceWorker.ready;
}).then((registration) => {
  return registration.pushManager.subscribe({ userVisibleOnly: true });
}).then((subscription) => {
  console.log(subscription);

  const endpoint = subscription.endpoint;
  const auth = subscription.getKey('auth');
  const p256dh = subscription.getKey('p256dh');

  const userAuth = btoa(String.fromCharCode(...new Uint8Array(auth)));
  const userPublicKey = btoa(String.fromCharCode(...new Uint8Array(p256dh)));

  // send to server
  const body = {endpoint, userAuth, userPublicKey};

  console.log(body);

}).catch(console.error.bind(console));
```


### 3.worker.js


<iframe src="https://www.youtube.com/embed/k939NlThH4E" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



```js
self.addEventListener('install', (e) => {
  console.info('install', e);
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (e) => {
  console.info('activate', e);
  e.waitUntil(self.clients.claim());
});

self.addEventListener('push', (e) => {
  console.info('push', e);
  const message = e.data.text();

  e.waitUntil(self.registration.showNotification('title', {
    body: message,
    icon: '/service-worker/push/jxck.png',
    tag:  'push-demo',
  }));
});

self.addEventListener('notificationclick', (e) => {
  console.info('notificationclick', e.notification.tag);
  e.notification.close();
  const URL = 'https://labs.jxck.io/service-worker/push/';
  e.waitUntil(clients.matchAll({
      type: 'window'
    }).then((windowClients) => {
      let target = windowClients.filter((client) => {
        return client.url === URL;
      });
      console.log(target, target.length);
      if (target.length > 0) {
        // タブが開いているので、最初のものにフォーカスする
        return target[0].focus();
      }
      // タブが開いてないので開く
      return clients.openWindow(URL);
  }));
});
```


### 4.push.js

使用したモジュール: <https://github.com/web-push-libs/web-push>


<iframe src="https://www.youtube.com/embed/hIliK4l4wqw" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



```js
'use strict';

let push = require('web-push');

const GCM_API_KEY = '*******';
push.setGCMAPIKey(GCM_API_KEY);

const data = {
  "endpoint": "********",
  "userAuth": "********",
  "userPublicKey": "******"
}

push.sendNotification(data.endpoint, {
  payload:       'push test for service worker',
  userAuth:      data.userAuth,
  userPublicKey: data.userPublicKey,
})
.then((result) => {
  console.log(result);
})
.catch((err) => {
  console.error('fail', err);
});
```

- DEMO(push は飛ばしていません): <https://labs.jxck.io/service-worker/push/>


## 図

映像中で使用した図です

![service worker のライフサイクル (installing -> waiting -> active -> redundunt) の遷移図](service-worker-lifecycle.svg#840x450 "service worker lifecycle")
