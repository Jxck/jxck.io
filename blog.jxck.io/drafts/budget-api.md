# [budget api][service worker] Budget API と Web に導入されつつある Budget と Cost の概念

## Intro

PWA 化により、バックグラウンド処理を如何に制限するかといった課題が生まれた。
その対策として、バックグラウンド処理における Budget と Cost の概念が提案され、それを扱う Budget API の策定が進んでいる。

基本概念と現時点での API 外観について解説する。


## Budget API

Push API と Background Fetch が入った事で、 Web アプリはユーザ操作への応答のみだけでなく、バックグラウンドでの動作の可能性が増えた。

しかし、これまでの Web のライフサイクルとの乖離が大きいため、潜在的な問題が露見する可能性もある。そこで、例えば Chrome は Push API は必ず User Visible な通知(notification)を伴うものに制限されていた。

一方 Firefox は処理にたいして Cost を定義し、アプリに対して Budget を付与することで、処理を制限する方式を模索していた。
Chrome もこの方式にシフトしている。


## Cost & Budget

Web Push は、現状ユーザに通知を表示する目的で使われている。

しかし、ユーザへの通知ではなく、例えばデータの同期などの処理をバックグラウンドで行うなど Silent Push のユースケースも考えられる。
 Service Worker が登録されて、そこにユーザへの通知なく Push を自由に送ることができてしまうと、 Push が乱用される可能性がある。

Silent Push が乱用されると、ユーザの知らないところで著しくバッテリーが消費されるなどにリスクもあるため、何らかの方法で制限をかける必要がある。

そこで、バックグラウンド実行できる処理それぞれに対して **Cost** を割り当て、そのページが実行できる **Budget** を定義することで、 Budget の範囲内でしか処理できないように制限する方式が提案されている。

例えば Silent Push の Cost が `2` であったとし、ページに付与された Budget が `6` だとしたら、 3 回しか Silent Push を送れないといったイメージだ。



## Budget API

Budget API は、この Budget と Cost を扱うための API である。
基本は `navigator.budget` に定義される。


### budget.getBudget()

現在の budget を取得する。

```js
navigator.budget.getBudget().then((budgets) => {
  budgets.forEach((budget) => {
    console.log(budget.time, budget.budgetAt);
  });
});
```

Budget の値は仕様では定義せず、 User Agent に委ねられている。これにより、 UA にヒューリスティックな値の算出や、ニーズに応じた増減などの余地を与えている。

使い尽くした Budget は Profile が更新されるタイミングで回復する。


### budget.getCost()

処理の Cost を取得する。
引数には、対象となる処理の名前を与えるが、この値は仕様に定義される。
執筆時点では `silent-push` のみ定義されている。

```js
navigator.budget.getCost('silent-push').then((cost) => {
  console.log(cost); // 2
});
```

ここで返される Cost は、上限値であり、実際の UA やデバイスの状況によっては、より低い Cost しか実行時に消費されない可能性がある。

例えば、デバイスが充電状態である場合、強い Wifi ネットワークに繋がっている場合などは、デバイスは Cost を下げることを許されている。


