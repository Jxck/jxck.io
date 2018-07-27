# [web budget api][service worker][pwa] Web Budget API と Web に導入されつつある Budget と Cost の概念

## Intro

PWA の普及により、バックグラウンド処理をいかに制限するかといった課題が生まれた。

その対策として、バックグラウンド処理における Budget と Cost の概念が提案され、それを扱う Budget API の策定が進んでいる。

基本概念と現時点での API 外観について解説する。


## Budget API

Push API と Background Fetch が入った事で、 Web アプリはユーザ操作への応答のみだけでなく、バックグラウンドでの動作の可能性が増えた。

しかし、これまでの Web のライフサイクルとの乖離が大きいため、潜在的な問題が露見する可能性もある。

そこで、例えば Chrome は Push API は必ず User Visible な通知(notification)を伴うものに制限していた。

一方 Firefox は処理に対して Cost を定義し、アプリに対して Budget を付与することで、処理を制限する方式を模索していた。

これが、 Web Budget API として整備され、 Chrome もこの方式にシフトしている。

[Web Budget API](https://wicg.github.io/budget-api/)


## Cost & Budget

Web Push は、現状ユーザに通知を表示する目的で使われている。

しかし、ユーザへの通知ではなく、例えばデータの同期等の処理をバックグラウンドで行うなど Silent Push のユースケースも考えられる。

Service Worker が登録されて、そこにユーザへの通知なく Push を自由に送ることができてしまうと、 Push が乱用される可能性がある。

Silent Push が乱用されると、ユーザの知らないところで著しくバッテリーが消費されるなどのリスクもあるため、何らかの方法で制限をかける必要がある。

そこで、バックグラウンド実行できる処理それぞれに対して *Cost* を割り当て、その Origin が実行できる *Budget* を定義することで、 Budget の範囲内でしか処理できないように制限する方式が提案されている。

例えば Silent Push の Cost が `2` であったとし、 Origin に付与された Budget が `6` だとしたら、 3 回しか Silent Push を送れないといったイメージだ。


## Budget API

Budget API は、この Budget と Cost を扱うための API である。

基本は `navigator.budget` に定義される。


### budget.getBudget()

現在から、将来に渡り利用できる budget のリストを取得する。


```js
navigator.budget.getBudget().then((budgets) => {
  budgets.forEach((budget) => {
    console.log(budget.time, budget.budgetAt);
  });
});
```

Budget の値は仕様では定義せず、 User Agent に委ねられている。これにより、 UA にヒューリスティックな値の算出や、ニーズに応じた増減などの余地を与えている。


### budget.getCost()

処理の Cost を取得する。

引数には、対象となる処理の名前を与えるが、この値は仕様に定義される。

執筆時点では `"silent-push"` のみ定義されている。


```js
navigator.budget.getCost('silent-push').then((cost) => {
  console.log(cost); // 2
});
```

ここで返される Cost は、上限値であり、実際の UA やデバイスの状況によっては、より低い Cost しか実行時に消費されない可能性がある。

例えば、デバイスが充電状態である場合、強い Wifi ネットワークに繋がっている場合などは、デバイスは Cost を下げることを許されている。


### budget.reserve()

実際に処理を実行する際に、 Budget を Cost 分消費する。

戻る Promise は、コストが足りたかどうかを bool で解決する。

`silent-push` の場合は、コストが足りればそのまま処理を進められ、足りなかった場合は notification によってユーザに通知する必要が出る。


```js
self.addEventListener('push', (e) => {
  return e.waitUntil(navigator.budget.reserve('silent-push').then((reserved) => {
    if (reserved) {
      // budget が足りている
      return Promise.resolve(reserved);
    }

    // budget が不足している
    // notification をあげる必要がある
    return registration.showNotification();
  }))
});
```


### DEMO

以下に、簡単な DEMO を用意した。

[Budget API DEMO](https://labs.jxck.io/budget/basic.html)


### Budget の導入と Cost 管理

Budget のような概念が無いと、ユーザが気づかないうちに実行環境が乱用される可能性があるため、 PWA によってアーキテクチャが変わった Web にとっては、こうした制限はある程度必要だろう。

一方で、 Silent Push を積極的に利用して、バックグラウンドでデータの同期を行うといったアプリでは、ユーザの状態として考慮すべき状態変数が一つ増える結果となる。

今後定義されるバックグラウンド系の処理も、 Budget 管理の対象になる可能性があるため、 PWA を真剣にやる上では無視できないものになっていく可能性がある。

まだ策定が始まったばかりではあるが、バックグラウンド処理を多用するユースケースに期待を寄せている開発者は、今のうちに Origin Trials 経由などで積極的なフィードバックをするといいだろう。
