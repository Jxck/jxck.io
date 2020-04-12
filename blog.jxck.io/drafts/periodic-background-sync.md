# [periodic background sync][service worker] Periodic Background Sync

## Intro

RSS Reader のフィード更新のように、定期的にタスクを実行したい場合がある。

Service Worker の Background Sync は、 Offline 中に失敗したタスクを Online 復帰時に再実行するというユースケースに寄せて設計しているため、この用途では使いにくかった。

そこで、定期的に実行することに特化した API として提案されているのが Periodic Background Sync(PBS) だ。

しかし、この API を取り巻く議論は「Web にアプリのような API を持ち込む上での難しさ」を物語っている。

また、その議論の過程で見つかった「広義の Background Sync」が持つ性質により、 Mozilla は現在 Considered Harmful と表明している。

この API が Web において正当化できるかどうかは、 Project Fugu に代表される Application Capabilities を Web に持ち込むという方針の命運を占うだろう。


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

コードは単純だ、ただしこの API の使用、およびイベントの発火には条件がある。


## API 利用の条件

API 利用の条件は以下の 2 つだ

- Install されている
- Site Engagement が十分ある


### Install されている

PBS は、サイトに訪れて Service Worker が登録されただけでは使えない。

正確には API は触れても、 Permission が付与されてないためだ。

この PBS を使うための Permission は、 Permission Prompt や Site Setting ではなく Install によって付与される。

Chrome の場合は Add to Home Screen が必要になるということだ。

Add to Home Screen するには Chrome の場合 [install criteria](https://web.dev/install-criteria/) をクリアする必要がある。

- 




### Site Engagement が十分ある
