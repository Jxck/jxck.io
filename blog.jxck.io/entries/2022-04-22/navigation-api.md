# [history][navigation][spa] Navigation API による「JS での画面遷移」と SPA の改善

## Intro

従来の History API を改善する Navigation API の仕様策定と実装が進んでいる。

これは、 History API の使いにくかった部分を補うだけではなく、「JS で画面遷移をする」という現状のミッシングピースに取り組み、 SPA が抱える多くの問題だけでなく MPA すら改善する可能性がある。

この API の目的と仕様を解説しつつ、実装のメモを残す。


## 画面遷移と SPA の軌跡

Web は HTML の取得と描画を繰り返す、画面遷移(Navigation)を前提としたアーキテクチャ(のちに SPA からの逆算で MPA と呼ばれる)が基本であり、ブラウザなどの実装もそれに最適化されている。

一方「アプリケーション」の設計手法をそのまま Web に持ち込んだ SPA は、この Navigation によってもたらされる UX の低下を防ぐ部分がある一方、既存の Web のアーキテクチャからすると必ずしも相性が良いとは言えなかった。

特に、表示されている状況を完全に把握し対応できる健常者には使いやすくとも、 JS に閉じて UA に伝わらない状態の変化が多々あるため、支援技術を用いてアクセスしているユーザにはしばしば問題となる。

また、究極的には単一の URL 上で擬似的な画面遷移を全て完結することができる SPA には、特定の状態に URL が振られないため Linkability を損ねていた。こちらは SEO の問題として捉えられることも多い。

まずは、これまで開発者が歩んできた SPA 開発手法の軌跡を簡単に振り返る。


### SPA 第原始期: 単一 Path での実装

2005 年に Ajax が発見されてからは、表示されている画面をそのまま JS で更新し、疑似的に画面の遷移を演出することができるようになった。

それが Web2.0 と相まって世界をガラッと変えたのは事実だが、実際にはルートパス上で見た目が変わっているだけで、 SPA というよりも Single Path App だった。

これでは、状態を変化させたことをアプリで管理することも難しく、リロードへの耐性すらも怪しい。この原始的な SPA から、どのように状態とパスを紐づけるかというのが SPA の辿る歴史となる。


### SPA 第一期: fragment による実装

URL の fragment 部 (`https://example.com#foo` の `#foo`)は、サーバには送られない、クライアントでのみ使われる URL Component だ。

基本は `<pre id="sample_code">` のようにした場合 `https://example.com#sample_code` でサンプルコードまでスクロールするといったユースケースで用いられる。そこで、サーバにリクエストをせずにクライアントの状態を変えるという部分だけに着目し、 SPA のルーティングを fragment にエンコードするという実装が考えられた。

クライアントの状態であるため、直接アクセスしてもその状態を復元できるのはブラウザのみだ。したがって、当時はそのような構成のサイトが正しく検索できないという問題があった。そこで、 Google Bot は `#!` で始まるフラグメントの利用を推奨し、 `https://example.com#!foo` を発見した場合はサーバに対して `https://example.com/_escaped_fragment_=foo` を代わりにリクエストすることで、サーバは `#!foo` で表示されるべき画面を SSR して返すように求めるというサポートを行っていた。

- A proposal for making AJAX crawlable  |  Google Search Central Blog  |  Google Developers
  - https://developers.google.com/search/blog/2009/10/proposal-for-making-ajax-crawlable

今見ると(当時見ても)なかなか強引なワークアラウンドだが、 2009 年といえばまだフロントエンドという言葉自体が黎明期で、 SPA ではなく Ajax という名で呼ばれていたような時代だ。

このサポートが deprecate になったのが 2015 年であるため、 2008 ~ 2015 くらいが *第一期: SPA(fragment)* の時代と言えるだろう。

- Deprecating our AJAX crawling scheme  |  Google Search Central Blog  |  Google Developers
  - https://developers.google.com/search/blog/2015/10/deprecating-our-ajax-crawling-scheme


### SPA 第二期: History API による Pjax

実際にリンクのクリックや Form の Submit を全て `preventDefault` して fragment に状態をエンコードする実装は、 Navigation が発生せずブラウザに History が積まれない。そこで JS から実際に Navigation をせずに URL を History に積むために作られたのが History API だ。

実際には、擬似遷移に URL を付与し、その遷移を復元するための状態を紐づけて `history.pushState` で保存するというものだ。画面が遷移した場合は、 `popstate` イベントでその状態が取得できるため、それを画面に反映することで遷移が再現される。

```js
// 画面表示に必要な状態を state として保存
history.pushState(state, null, "foo.html")

window.on('popstate', (e) => {
  const { state } = e
  // state を用いて画面を復元
})
```

`history` は実際に履歴のリストを持っているが、ここにアクセスできるとプライバシー上の問題があるため、直接リストにアクセスすることはできない。代わりに、遷移するための方法が提供されている。

```js
history.back() // 戻る
history.forward() // 進む
history.go(-2) // ページを引数で指定し遷移
```

大きなところでは、 Twitter が 2012 年に対応をアナウンスしている。これはそれなりに早い方の移行だったと思う。

- Improving performance on twitter.com
  - https://blog.twitter.com/engineering/en_us/a/2012/improving-performance-on-twittercom
- Implementing pushState for twitter.com
  - https://blog.twitter.com/engineering/en_us/a/2012/implementing-pushstate-for-twittercom

History API により、 URL fragment ではなく path を変えることができるようになった。

```
before
- https://example.com#!login
- https://example.com#!main
- https://example.com#!config

after
- https://example.com/login
- https://example.com/main
- https://example.com/config
```

これにより、 Google は 2015 年に先ほどの `#!` サポートを終了した。これは、標準の方法が普及したことだけでなく、 Google Bot 自体が JS や CSS をある程度読めるようになり、ブラウザの挙動の再現率があがりはじめたこともあったと思う。

- Building Indexable Progressive Web Apps  |  Google Search Central Blog  |  Google Developers
  - https://developers.google.com/search/blog/2016/11/building-indexable-progressive-web-apps

ちなみに、この頃は今で言う「React をサーバでレンダリングする SSR」とは違い、元々 MPA で作られたものを、クライアントルーティングもできるというような作りでクローラをサポートしていた。

`<a>` の click をキャンセルして HTML 取得し、 `<body>` と `<title>` を取り出して現在の DOM に差し込むといった実装は、特に Rails 界隈では Pjax などと呼ばれていた。

この 2011~2015 年前後が *第二期: SPA(Pjax)* だったといえるだろう。


### SPA 第三期: Router Library と SSR

しかし、 History API には多くの問題があったことは、この API と向き合った開発者なら一度は感じたことがあるだろう。

この API の問題点は以下にまとまっている。

- The case for the new Web History API
  - https://github.com/dvoytenko/web-history-api/blob/master/problem.md

要約すると以下だ。

- History は `iframe` の中の遷移も含むため、 Top Level Frame での履歴を管理したい場合に、意図せず履歴が壊れる場合がある。
- ページ上で発生する Navigation をフックする方法がないため、全てのリンクのクリックを監視するといったことをしないといけない。それでも完璧にはインタラプトしきれない。
- 遷移をインデックス(`history.go(-2)`)で管理するために、どのインデックスがどの状態か、別途マッピングを管理する必要がある。
- History API とブラウザの履歴との連携は、ブラウザによって差異がある。
- `pushState` で保存する state には制限が多く、かつ壊れやすい。

したがって、とても生で使えるものではなかった。多くのワークアラウンドが知見として集まり、それが現在に続く Router 系ライブラリとして進化していくことになる。

後に Backbone などを踏み台に React/Vue/Angular が台頭したのち、 JS による画面構築をそのままサーバ側で再現する現代の SSR につながり、俗に言う SEO 問題の解決手段自体は用意された。

この 2014~現在までを *第三期: SPA(SSR)* としよう。

ここまででフロントエンドの文脈で得られたのは以下だ。

- History API を隠蔽した Router ライブラリ
- SEO 対策としての SSR

しかし、それで SPA の構造上の問題が解決したわけではない。

例えば、ブラウザは `pushState` によって「擬似的な遷移が行われたらしい」ことはわかっても、その画面構築を行うのは全てフロントエンドの JS だ。そこから「戻る」時に、どこに focus を戻し、どこに scroll を戻すのが正しいのか、画面の構築に関わってないブラウザには「開発者が何をしたいのか」が伝わらない部分が多い。

SPA として質の高い UX を実装したと思っている開発者を尻目に、支援技術を通じてアクセスしているユーザには、使いにくい実装が多々ある。これは、ある一定の「課題の解決」はしたが、「問題の解決」には至ってない典型例といえる。

この根本的な問題は、 SPA を表示する際にブラウザが知るべき情報を、ブラウザに提供するためのセマンティクスが不足していたことにある。ここをカバーするために提案されたのが Navigation API だ。


## Navigation を用いた SPA

### NavigationHistoryEntry

まず、これまで History API の中に隠されていた履歴に関する情報が、 NavigationHistoryEntry として Interface 化されたことが、この API の有意な点の 1 つだろう。

これは、履歴内での Index や URL の他に、ブラウザが生成する Key と ID という 2 つの UUID を持つ。

```js
console.log(navigation.currentEntry)
// id: "bb1bfee7-be94-45e7-9c0f-bc4b3be15901"
// index: 5
// key: "6b73c48f-591a-4b13-8634-598fd640754a"
// ondispose: null
// sameDocument: true
// url: "https://labs.jxck.io/navigation/2.html"
```

`id` はエントリの内容が更新されると変更するが、 `key` は変更しない。

History API にはこうした値がなく、複雑な状態の同期は URL か Index で行うしかなかった。しかし、 URL が同じでも状態が同じとは限らず、 Index はキーにするほど安定してない。 `id` か `key` を用途に応じて選択すれば、複雑な状態をシリアライズし Storage に保存するような場面でキーとして使うことができる。

この Entry が、以降の API を用いる上での基準となる。


### navigation.entries()

History API では、履歴は `iframe` の中での遷移も含めた Joint Session になっており、かつプライバシーの理由から履歴そのものにはアクセスできない。見られるのは `history.length` 程度で、その情報だけから `history.go()` などをしないといけなかった。

Navigation API では、 Entry List を取得することができる。内容は Current Origin に制限されるためプライバシーの問題はなく、 `iframe` 内での遷移に影響されないため、アプリケーションで管理しやすい。

```js
navigation.entries()
```

これを用いれば、いわゆる「戻る」「進む」的な UI を DOM 上に作ることもできる。その場合、選択した Entry への遷移も、後述の API を使って行うことが可能だ。


### navigation.navigate()

History API でいう `history.pushState()` に相当するのが `navigation.navigate()` だ。 URL に紐づけて State を保存し、 Entry List を操作する。

```js
await navigation.navigate("/foo", { state: {count: 1}, info: "shortcut", history: "push" }).finish
```

`state` は any だが、シリアライズ可能なものに限る。 `history` は `"push"` なら追記、 `"replace"` なら現在の Entry を置き換える。その遷移だけで用いるエフェメラルな値は `info` で送ることができる。

戻り値は `{ committed, finished }` という 2 つの Promise だ。 `committed` は `navigate()` 開始と共に即座に Resolve し、 `finished` は `navigate()` が完了したら Resolve する。


### currentEntry.getState()

`navigation.navigate()` で Entry に保存した State は `entry.getState()` で取得できる。

```js
navigation.currentEntry.getState() // {count: 1}
```

`entry.getState()` は `history.state` と類似するが、既存の問題をいくつか解決している。

まず、 `history.state` はセッション上ではプロパティアクセスにより更新できたように見えるが、永続化はされていないため誤解を招くような挙動に見える。

```js
// https://github.com/WICG/navigation-api/issues/36

history.pushState({ count: 2 }, null, '');
console.log(history.state.count); // 2
history.state.count = 3;
// 内容が更新できたように見える
console.log(history.state.count); // 3

// リロード

// 実際には pushState してない場合は永続化されない
console.log(history.state.count); // 2
```

`getState()` は、常に Entry の Clone を返すため、そこを変更してもブラウザには反映されない。

```js
await navigation.navigate("/foo", { state: {count: 2}, history: "push" }).finish

// 取得した値はクローンなので直感に反した更新はされない
navigation.currentEntry.getState().count = 3;
console.assert(navigation.currentEntry.getState().count === 2);
```

先ほどの `navigation.entries()` がメソッドなのも、常にコピーを返すことで、その戻り値の変更がブラウザには反映されていないことを明確にする意図もある。


### navigation.traverseTo(key)

History API では、任意の履歴への遷移は `history.go()` にインデックスを指定する方法しかなった。遷移したい先の Index がなんであるかを把握し、 `iframe` 内での履歴変更などがあっても Index が履歴リストの変更と同期していることを保証する必要がある。

Navigation API では、 Entry List から選んだ特定の Entry への遷移は、 Entry が生成されてから変わらない `entry.key` で行う。

```js
await navigation.traverseTo(key).finished;
```


### back()/forward()/reload()

`history.back()` / `history.forward()` / `location.reload()` 相当のメソッドもある。

`navigation.back()` / `navigation.forward()` は `info` を渡すことができ、 back/forward が可能かどうかを知るためのフラグが `navigation.canGoBack` および `navigation.canGoForward` で提供されている。

```js
if (navigation.canGoBack) {
  await navigation.back({info: "click-prev"}).finished
}

if (navigation.canGoForward) {
  await navigation.forward({info: "click-next"}).finished
}
```

`navigation.reload()` は `info` に追加して State の更新も可能だ。

```js
// 状態を更新
await navigation.reload({ state: { ...navigation.currentEntry.getState(), count: 3 } }).finished
```


### navigate イベント

Navigation API の最重要イベントは `navigate` だ。このイベントは、ブラウザが Navigate をする際に発火するため、従来のように `<a>` の click をフックするといったことをする必要がなくなる上に、あらゆる方法で発生した Navigate を残さずフックすることができる。

```js
navigation.on("navigate", async (e) => {
  console.log(e)
  // canTransition: true
  // cancelable: true
  // destination: NavigationDestination {key: null, id: null, url: 'https://labs.jxck.io/navigation/1.html', index: -1, sameDocument: false}
  // downloadRequest: null
  // formData: null
  // hashChange: false
  // info: undefined
  // navigationType: "push"
  // returnValue: true
  // signal: AbortSignal {aborted: false, reason: undefined, onabort: null}
  // userInitiated: true

  e.transitionWhile(/*
    transition のために必要な Promise
  */)
})
```

このイベントオブジェクトには、誰のどういう操作によって発生したかといった情報が、全て込められていることがわかる。特に Form Submit によって生成された FormData や、途中で UI からキャンセルされた場合に発火する AbortSignal などが含まれているあたりは、新しい API ならではだ。


### transitionWhile()

navigate イベントにある `transitionWhile()` は、画面の遷移処理を記述するのに用いることができる。

具体例として、かつて Pjax と呼ばれていたような、「`fetch()` した HTML をパースし、現在の DOM に適用することで、擬似的な遷移とする」という処理を書くと以下のようになる。

```js
"use strict"
EventTarget.prototype.on = EventTarget.prototype.addEventListener

async function getPage(url, option) {
  const res    = await fetch(url, option)
  const html   = await res.text()
  const parser = new DOMParser()
  const doc    = parser.parseFromString(html, "text/html")
  const title  = doc.title
  const body   = doc.body
  return { title, body }
}

window?.navigation?.on("navigate", async (e) => {
  if (e.canTransition === false) return
  if (e.hashChange === true) return
  if (e.downloadRequest !== null) return

  e.transitionWhile((async () => {
    const url    = e.destination.url
    const signal = e.signal

    signal.on("abort", () => {
      console.log("navigation aborted")
      location.reload()
    })

    const cache   = "no-cache"
    const { title, body } = await getPage(url, { cache, signal })

    document.title = title
    document.body  = body
  })())
})

window?.navigation?.on("navigatesuccess", (e) => {
  console.log(e)
})

window?.navigation?.on("navigateerror", (e) => {
  console.log(e)
})
```

(実装の雰囲気は Service Worker の `fetch` イベントのハンドラに近い)

途中の処理が全て成功(Resolve)すれば `navigatesuccess` イベントを発火し、失敗(Reject)すれば `navigateerror` が発火することで、結果を取得することもできる。

見た目上、同様のことを実現すること自体は従来でもできた。それを踏まえて、この API の何が凄いのかを細かく見ていこう。


### 遷移の「開始」と「完了」

まず、 `transitionWhile()` は、呼び出した瞬間が「*遷移の開始*」で、全て終わったら「*遷移の完了*」であることがわかる。ここが `await` なので、 `transitionWhile()` は渡された Promise が Resolve されるまでを「遷移」と定義していることになる。

この遷移(navigation event)が `navigation.navigate()` によって発火していた場合は、「開始」と「完了」が先ほどの `{ committed, finished }` Promise に対応することになる。

```js
// transitionWhile() による画面遷移が終わるのを待つ
await navigation.navigate(url, state).finished
```

この「開始」と「完了」というセマンティクスは、 JS 上だけではなくブラウザ、支援技術、計測ツール、開発者ツールなど、あらゆる実装に対して有益な情報だ。

例えば、支援技術は MPA の画面が遷移したことを利用者に伝えることができるが、 SPA の場合はそこをヒューリスティクスに頼らざるをえない部分があった。しかし、 Navigation API によって明示的に知ることができるため、これを監視すれば SPA でも「今遷移が起こったこと」を伝えるといった応用が可能だ。

そして、「開始」と「完了」の間は「遷移中」なので、それを知ったブラウザはローディングインジケータ(DOM に開発者が表示するものではなく、タブに表示されるネイティブのもの)の表示に使えるし、「遷移中」にバツボタンに変わったそれをユーザがクリックしたら、渡されてきた AbortSignal を abort することで、 `transitionWhile()` 内に中断処理を実現できる。

これについては、以下に仕様作者のデモがあるので見るとわかりやすいだろう。

- https://twitter.com/domenic/status/1471604621470846979

他にも、 Core Web Vitals に代表される計測指標やツールは、「ページが表示されるまでの時間」に注目して設計されているため、 SPA の途中の遷移におけるパフォーマンスを計測するのは難しかった。これも、「開始」「完了」が分かれば改善が期待できる。


## フォーカスの管理

SPA におけるフォーカスやスクロールの管理は、軽視されがちなポイントの 1 つだ。

例えばボタンクリックによって擬似的な遷移が発生し画面が更新されても、ボタンの DOM 自体が残った場合、フォーカスもそこに残る。これは、画面が遷移したらフォーカスがページの先頭(`<body>`)や、 `autofocus` 属性のある要素へリセットされる MPA と比べて直感的ではない場合がある。

これも `transitionWhile()` で遷移された場合は、ブラウザは「完了」を知ることによって、そのタイミングでフォーカスを `<body>` や `autofocus` にリセットすることができる。もし、特定の要素がフォーカス中だったページに「戻る」「進む」した場合に、その位置が復元されてほしいのであれば、`focusReset: "manual"` にしてリセットを無効化し、Entry に保存しておいた状態を `"traverse"` 時に復元すればよい。

```js
navigation.addEventListener("navigate", e => {
  // 現在の focus を保存
  const focused = document.activeElement.id
  navigation.updateCurrentEntry({state: {focused}})

  e.transitionWhile((async () => {
    // 遷移
  })(), { focusReset: "manual" })
})

navigation.addEventListener("navigatesuccess", () => {
  // 戻るだったら
  if (navigation.transition.navigationType === "traverse") {
    const { focused } = navigation.currentEntry.getState()
    document.getElementById(focused).focus()
  }
})
```


## スクロールの管理

MPA では、「戻る」「進む」の場合に元いたスクロール位置が復元される。これはブラウザが自動で行っているが、 SPA ではうまくいくとは限らない。

SPA でもブラウザはスクロール位置を復元しようとするが、そもそもいつ戻った画面が表示し終わったのかがわからないため、画面構築中にスクロールしてしまったりということが起こる。また、スクロールしようとしても、戻った時に該当の DOM がある保証もない。制御する方法も、 History API では `history.scrollRestoration` に `"auto"` を指定してブラウザに任せるか、 `"manual"` を指定して Opt-Out するしかなかった。

こちらも、 `transitionWhile()` によって「完了」がわかるため、ブラウザはそのタイミングでスクロールの復元を試みる。もし、全ての Promise を待つ必要がない場合は、 `scrollRestoration` を `"manual"` で Opt-Out しつつ、任意のタイミングで `e.restoreScroll()` を呼べば、そのタイミングで復元が行われる。

```js
navigation.addEventListener("navigate", e => {
  e.transitionWhile((async () => {
    const data = await fetchData()
    await render(data)
    // ここで復元したい
    e.restoreScroll()
    await sendMeasurement()
    await sendReporting()
  })(), { focusReset: "manual" })
})
```

もちろん、 `e.restoreScroll()` を呼ばずに、自分で State に保存した要素に `window.scrollTo()` しても良い。


## MPA の改善

Navigation API を用いると、 MPA でも改善できるケースがありそうだ。


### PRG パターンの改善

SPA を MPA に寄せるようなパターンの話が多かったが、 MPA での実装を改善する方向にも可能性がある。例えば MPA で実装された Form の PRG パターンを考えよう。

POST の response をリロードした場合の「フォームを再送信しますか?」が出ることを避けるために、 GET にリダイレクトするのが PRG の目的だが、 History 上は戻れば戻れてしまう問題があり、「フォームを再送信しますか?」の挙動もブラウザごとに違うため、問題が多い。

- How to handle reloading pages created with POST · Issue #6600 · whatwg/html
  - https://github.com/whatwg/html/issues/6600

以下のように、 POST の Entry を GET で `"replace"` してしまえば、 POST の Entry は消えるため、「戻る」による問題がなくなる。この実装も、 Navigation API がないブラウザでは通常の MPA として遷移するだけなので、 Progressive な導入が可能だ。

```js
window?.navigation?.on("navigate", async (e) => {
  console.log(e.type, e)
  const pathname = new URL(e.destination.url).pathname
  console.log({pathname})

  if (pathname === "/navigation/login" && e.formData) {
    e.transitionWhile((async () => {
      const res = await fetch(pathname, {
        method: "POST",
        body: e.formData
      })
      const html  = await res.text()
      const url   = new URL(res.url)
      const state = { html }
      await navigation.navigate(url.pathname, { history: "replace", state }).finished
    })())
  }

  if (pathname === "/navigation/main.html") {
    e.transitionWhile((async () => {
      const { html }      = e.destination.getState()
      const parser        = new DOMParser()
      const {title, body} = parser.parseFromString(html, "text/html")
      document.title      = title
      document.body       = body
    })())
  }
})
```


### メディアの再生

そもそも SPA にする必要があるのかという問題もある。サイトが十分に高速なら MPA として作った方が、作る側も使う側も利がありそうな「とりあえずの SPA」もよく見るように思う。

逆に SPA でないとならないケースとして筆者が考えるのが「メディアの再生」だ。音楽を聴きながら、ビデオを見ながら、テレビ会議をしながら、という UI では、画面を遷移させることができない。

「本当は MPA でも足りているが、特定の理由のためだけに SPA にせざるをえない場面」は一定数あり、そんな既存の MPA を最小限のコストでカジュアルに SPA (Pjax)化をする上でも、 Navigation API は使えるかもしれない。

例として、筆者の Podcast は MPA というか事前ビルドの HTML だけで作ってあるが、 SPA であれば再生しながら他の Episode の Show Note を見たりできるだろう。これを Navigation API で実装したら 35 行程度で済んだ。

- https://github.com/Jxck/jxck.io/blob/main/www.jxck.io/assets/js/mozaic.js#L261-L296

![mozaic.fm で音声再生しながらエピソード間を遷移する](mozaic-spa-by-navigation.mp4#43584x2240 "mozaic spa by navigation api")


## Outro

以上のように Navigation API は、単に使いにくかった History API を改善するだけでなく、 SPA を標準の API で作りやすくするだけでもなく、 SPA 全盛となった現在の Web において真の意味で「JS で画面を遷移する API」を提供するものといえる。

これにより、Navigation を前提とした Web のあらゆるエコシステムに対して、適切な情報を提供することができると期待できるのだ。

Navigation API は Chrome にて Intent to Ship が出ているものの、 Mozilla / Safari からのリアクションがまだない状態だ。

筆者としては、この API が広く SPA 関連のライブラリに使用され、多くの人にとって MPA のように使いやすい SPA が実装可能な時代が、 *第四期: SPA(Navigation)* として到来することに期待したい。


## DEMO

動作するデモを以下に用意した。

- https://labs.jxck.io/navigation


## Resources

- Spec
  - Navigation API
    - https://wicg.github.io/navigation-api/
- Explainer
  - navigation-api/README.md at main · WICG/navigation-api
    - https://github.com/WICG/navigation-api/blob/main/README.md
- Requirements Doc
- Mozilla Standard Position
  - App history API · Issue #543 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/543
- Webkit Position
  - Request for position on app history API
    - https://lists.webkit.org/pipermail/webkit-dev/2021-September/031987.html
- TAG Design Review
  - App history API · Issue #605 · w3ctag/design-reviews
    - https://github.com/w3ctag/design-reviews/issues/605
  - Navigation API (formerly app history API) · Issue #717 · w3ctag/design-reviews
    - https://github.com/w3ctag/design-reviews/issues/717
- Intents
  - Intent to Prototype: App history API
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/R1D5xYccqb0/m/8ukfzdVSAgAJ
  - Intent to Experiment: App history API
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/ki__L-IiR0Q/m/rG3OgSkKBQAJ
  - Intent to Ship: Navigation API
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/5iuGWgO8aMo
- Chrome Platform Status
  - Navigation API - Chrome Platform Status
    - https://chromestatus.com/feature/6232287446302720
- WPT (Web Platform Test)
  - web-platform-tests navigation-api
    - https://wpt.fyi/results/navigation-api?label=experimental&label=master&aligned
- DEMO
  - Navigation API demo
    - https://gigantic-honored-octagon.glitch.me/
  - Navigation API form submission demo
    - https://selective-heliotrope-dumpling.glitch.me/
- Blog
- Presentation
- Issues
  - Navigation and session history rewrite by jakearchibald · Pull Request #6315 · whatwg/html
    - https://github.com/whatwg/html/pull/6315
  - popstate/hashchange dispatching doesn't match what browsers do. · Issue #1792 · whatwg/html
    - https://github.com/whatwg/html/issues/1792
  - Tracking issue for rebasing on top of the navigation and session history rewrite · Issue #221 · WICG/navigation-api
    - https://github.com/WICG/navigation-api/issues/221
- Other