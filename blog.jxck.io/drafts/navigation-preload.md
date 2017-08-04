# [navigation preload][service worker] Navigation Preload による Service Worker 起動の高速化

## Intro

Service Worker で Fetch を Proxy する場合、 Fetch 発生時に SW が起動していなければ、その起動を待つ必要が出る。

そして、この SW の起動には無視できない時間がかかる場合があった。

これを改善する Navigation Preload について解説する。


## SW Bootup

SW が onfetch をハンドルし、キャッシュから Response を返す場合は、ネットワークを使わない分、高速に画面をレンダリングできる。

しかし、 SW が onfetch をフックしていてもなお、実際にネットワークにリクエストを投げる場合は少なくない。

この場合、もしページのコントローラとなっている SW が起動していない場合は、 onfetch ハンドラを実行するために、 SW の起動を待つ必要が出てくる。

SW の起動には、もちろん実行環境によるところが大きいが、 [50~500ms](https://developers.google.com/web/updates/2017/02/navigation-preload) 程度の時間がかかるとされている。

つまり、せっかく表示を最適化しても、 SW を追加することでそれを台無しにしてしまうケースがあるということだ。

これを解決するのが Navigation Preload である。


## Navigation Preload


Navigation Preload を有効にすると、 SW が起動してない状態で発生したリクエストを、 SW をバイパスしてネットワーク側に送ることができる。

つまり、実際の Fetch の実施と、 SW の起動を並行して行うということだ。

しかし、それだけでは、 onfetch のハンドラ内でキャッシュ処理などを実行することができない。

そこで、 SW が起動した後に、並行して行った Fetch の結果に触ることができるため、後からキャッシュに詰める/ヘッダを追加するといったことが可能になる。

ただし、基本的に問題になるのは、しばらくアクセスしてなかったページに遷移して、最初のページを表示する部分になる。

ここで発生するリクエストは Navigation Request と呼ばれ、ブラウザが生成するものであり、ページ構築中/後に JS から発行される XHR などは含まれていない。



## API

### navigationPreload.enable()

`onfetch` に先立って有効化されている必要があるため、 `onactivate` で有効にする。

```js
self.addEventListener('activate', (e) => {
  if (!self.registration.navigationPreload) {
    console.log("navigationPreload not supported")
  }
  console.log("navigationPreload supported")
  e.waitUntil(self.registration.navigationPreload.enable())
})
```

無効化は `disable()` を呼ぶ。


### preloadResponse
