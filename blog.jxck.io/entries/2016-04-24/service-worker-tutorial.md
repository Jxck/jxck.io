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



```html:claim.html
```


```js:claim-master.js
```


```js:claim-worker.js
```

- DEMO: <https://labs.jxck.io/service-worker/claim/index.html>


## controllerchange

register が終わった後、「新しく登録された controller が使えるようになったら」または「既に登録されている controller が使えるようになったら」という状態をとる方法と `controllerchange` イベント。


<iframe src="https://www.youtube.com/embed/XoI0FPDV8Xo" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



```js:controllerchange-master.js
```


```js:controllerchange-worker.js
```

- DEMO: <https://labs.jxck.io/service-worker/controllerchange/>


## updatefound

Service Worker が更新される際の動きと、 `skipWaiting()` が何をスキップするのか?

`install`, `activate` イベントの用途。


<iframe src="https://www.youtube.com/embed/AMbQ7d9rjao" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



```js:updatefound-master.js
```


```js:updatefound-worker.js
```

- DEMO: <https://labs.jxck.io/service-worker/registration/>


## update()

`registration.update()` による worker の更新と、ブラウザキャッシュにヒットする場合の挙動。


<iframe src="https://www.youtube.com/embed/7uRVh9PzV5o" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



```js:update-master.js
```


```js:update-worker.js
```

- DEMO: <https://labs.jxck.io/service-worker/update/>


## backgroundsync

sync の発火タイミングと fetch を sync で送る場合の考え方。


<iframe src="https://www.youtube.com/embed/b7ZM7uzkykA" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



```js:backgroundsync-master.js
```


```js:backgroundsync-worker.js
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


```html:push.html
```


### 2.master.js

`endpoint`, `userAuth`, `userPublickKey` をなんらかの方法でサーバに送ります。


<iframe src="https://www.youtube.com/embed/f-ney12qAEI" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



```js:push-master.js
```


### 3.worker.js


<iframe src="https://www.youtube.com/embed/k939NlThH4E" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



```js:push-worker.js
```


### 4.push.js

使用したモジュール: <https://github.com/web-push-libs/web-push>


<iframe src="https://www.youtube.com/embed/hIliK4l4wqw" width="560" height="315" layout="responsive" sandbox="allow-scripts allow-same-origin allow-presentation" allowfullscreen loading="lazy"></iframe>



```js:push.js
```

- DEMO(push は飛ばしていません): <https://labs.jxck.io/service-worker/push/>


## 図

映像中で使用した図です

![service worker のライフサイクル (installing -> waiting -> active -> redundunt) の遷移図](service-worker-lifecycle.svg#840x450 "service worker lifecycle")
