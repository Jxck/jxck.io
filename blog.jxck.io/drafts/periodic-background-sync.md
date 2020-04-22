# [periodic background sync][service worker] Periodic Background Sync


## Intro

RSS Reader のようなユースケースを PWA で実現する場合、定期的にタスクを実行するユースケースが発生する。

そこで、定期的に実行することに特化した API として提案されているのが Periodic Background Sync(PBS) だ。

しかし、この API を取り巻く議論は「Web にアプリのような API を持ち込む上での難しさ」を物語っている。

この API が Web において正当化できるかどうかは、 Project Fugu に代表される Application Capabilities を Web に持ち込むという方針の命運を占うだろう。

現時点での、仕様、実装、議論について解説する。


<!--


しかし、この API には、トラッキングや Bot Net 構築といったセキリュティ上の懸念もあがっており、実装している Chrome は非常に特殊な条件を課している。

また、その議論の過程で見つかった「広義の Background Sync」が持つ性質により、 Mozilla は現在 Considered Harmful と表明している。

-->


## Periodic Background Sync

Web で定期的なタスクを実行する場合、タブが開いていれば `setInterval()` などで行うことが可能だ。

しかし、 RSS Reader のフィード更新のように、バックグラウンドで定期的にタスクを実行したい場合がある。

Service Worker の Background Sync は、 Offline 中に失敗したタスクを Online 復帰時に再実行するというユースケースに寄せて設計しているため、この用途では使いにくかった。

そこで、定期的に実行することに特化した API として提案されているのが Periodic Background Sync(PBS) だ。


### API

現在提案されている API は非常にシンプルだ。

まず ServiceWorkerRegistration 経由で task を登録する。


```js
const registration = await navigator.serviceWorker.ready
await registration.periodicSync.register('update-feed', {
  minInterval: 12 * 60 * 60 * 1000 // 12h
})
```

すると、 Service Worker 上で定期的にイベントが発火する。


```js
self.addEventListener('periodicsync', (e) => {
  console.log('periodicsync', e)
  e.waitUntil(async function() {
    // DO TASK
  }())
})
```

このイベントをフックして、タスクを実行すれば良い。

コードは単純だ、ただしこの API がそのまま制限なく使えてしまうと、セキュリティ上の問題が生まれる。


## Security Consideration

まず、  PBS で Server に対して Fetch を行えば、 Server は Client の IP を定期的に知ることができる。

一度 SW が登録されたら、ユーザがアプリを開いてないところでも、ユーザが認識できない形でトラッキングが可能ということになってしまう。

TODO: 図

また、 PBS 内での fetch 先を特定の攻撃対象に設定すれば、発生タイミングをある程度指定して DOS を行う、 Bot Net の構築に応用可能だろう。

これらは、 Periodic ではない従来の Background Sync でも同様であることが専門家により指摘され、現在 Mozilla は従来の PBS に加え、従来の Background Sync も Considered Harmful と表明している。

TODO: standard position

では、 PBS を実装している Chrome は、これらの問題にどう対応しているのだろうか。


## Chrome での実装

Chrome は PBS の利用について制限を課している。

- Install (Add to Home Screen) されている
- Site Engagement が十分ある
- Known Network に接続している
- Same Site

順番に見ていこう。


### Install (A2HS)

PBS は、サイトに訪れて Service Worker が登録されただけでは使えない。

正確には API は触れても、 Permission が付与されてないためだ。

この PBS を使うための Permission は、 Permission Prompt や Site Settings ではなく Install (Add to Home Screen) によって付与される。

本来 Web は、インストールのような操作なく、 URL にアクセスするだけでページが読み込まれ、スクリプトが実行される。

ここで強力な機能(Powerful Features)がユーザの同意なく実行されると、意図しない問題が発生する可能性がある。

そのため、ここまでの機能は、その API の重要性に応じて User Gesture, Feature Policy, Permission Prompt などを使い分けてきた。

一方、 Native App は、強力な OS 機能を利用を、ユーザによる明示的なインストールという操作(とそこで発生する認証や追加許諾)によって許可してきた。

この考え方に合わせれば、 「Web もユーザが明示的に Install すれば、 Native と同等の機能を許可できるのではないか」という発想に至る。

すでに MS は PWA を Store に並べるといったこともしており、 Install が OS ネイティブの Prompt を経由するのであれば、ある一定の説得力は有るだろう。

Android Chrome はこの方針を採用し始め、 PBS もこの方針に則っている。

ただし、だから Install すれば何でもできるか、というとそうはならないため、 Install だけでは PBS は発生しない。


### Site Engagement

全てのサイトが、無制限に PBS を発火するのは、 Tracking だけでなくバッテリーやネットワークリソース(俗にいうギガ)の消費の問題も出る。

そこで、








Add to Home Screen するには Chrome の場合 [install criteria](https://web.dev/install-criteria/) をクリアする必要がある。
