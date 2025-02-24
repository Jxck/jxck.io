# Web における Beacon の変遷(sendBeacon(), fetch() keepalive, fetchLater())

## Intro

ページを閉じる際に何かしらの情報をサーバで収集したいケースがある。

これを Beacon の送信(Beaconing)と呼び、ブラウザではページ表示中に収集したパフォーマンス統計の収集や、広告タグによるトラッキングなどに用いられる。

しかし、「**ページが閉じる直前に、サーバにリクエストを送信する**」を確実に実行するのは実は難しく、これを標準技術で実現する過程で、複数の API が生まれるに至った。

各 API の策定経緯と、挙動の違いについて解説していく。


## `<img>` での送信

最も Primitive な Beacon の送信は、`<img>` を用いたものだった。

```js
window.addEventListener("unload", () => {
  const beaconImage = new Image(1, 1)
  beaconImage.src = "https://telemetory.example/beacon?a=10&b=20"
  document.body.appendChild(beaconImage)
})
```

このように、URL のクエリに情報を詰め込んだタグを body に追加すると、画像取得のために GET リクエストを送信できる。

この追加を `unload` 時に行うことで、画像の取得完了まで `unload` を遅延する実装が多くあったため、送信の確度も高かった。

また、この方法であれば CORS の制約なく任意のサーバに情報を送信できるため、XHR 以前からよく用いられていた。

サーバはレスポンスとして 1x1 px の白い画像を返すことで、仮に画面に表示してもユーザには気づかれないため、今でもアナリティクスサービスなどで、この実装の名残を見ることが少なくない。

しかし、GET しかできない、送信できるデータ量が限られるといった、かなり強い制約を伴う。

そこで、次に目をつけられたのが XHR の同期送信だ。


## Sync XHR

`fetch()` では禁止されているが、XHR ではブロックを伴う同期の送信が可能だ。`unload` の中で呼べば、そこでメインスレッドをブロックして送信できるし、POST により JSON も送れる。

```js
window.addEventListener("unload", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://telemetory.example/beacon", false /*sync*/);
  xhr.send(data) // 送り終わるまでブロック
})
```

API の自由度が高まったように思えるだろう、しかし、CORS で JSON を POST すると Preflight が発生し、リクエストが一回では終わらず、きちんと送信しきれない場合が出てくる。

なにより、同期 API の利用は、ブラウザとしては無くしていくべきものだ。`unload` をブロックすると画面遷移を阻害し、ユーザの体験が悪化する原因になる。こうした行儀の悪い実装がはびこった結果や、BFCache との相性の悪さもあり、後には `unload` 自体を限定的にしか発火しなくなる動きも出てきた。

ユースケースはあるのに API が無いばかりに、ワークアラウンドが負債になるのであれば、それを API として標準化するのがプラットフォームの役目だろう。

そこで策定されたのが Beacon API だ。


## Beacon API

`navigator.sendBeacon()` は、メインスレッドをブロックせず、ページ遷移にも影響しないが、ページが閉じたあとでも 非同期に Beacon を送信できる方法として 2014 年頃提案された。

```js
window.addEventListener("unload", () => {
  navigator.sendBeacon("https://telemetory.example/beacon", data);
})
```

非常にシンプルな API だが、要は渡したデータを URL に対して POST で送信する。その際、ページが閉じようが送信中のものは完了までハンドルされるため、取りこぼしを気にする必要が減るのだ。

一方、XHR と比べれば制限が非常に大きい API でもある。

例えば、Preflight や Redirect が挟まると送信に時間がかかるため、そのようなリクエストは最初からサポート外となっている。ヘッダには触れないし、`fetch()` に指定できるオプションも無い。

つまり `sendBeacon()` は意図して非常に不自由な API となっており、それゆえに拡張性が乏しい。

また、これまではページの上で発生したリクエストは、ページが閉じれば終わるものだったが、これをタブが閉じた後にも延命するには、ブラウザのアーキテクチャにも変更が必要となる。Chromium の場合は、従来の Fetch のパスを通さずにレイヤをまたぐ、少し強引な実装がされていた。特に CSP や Mixed Contents Check など、ブラウザから発生する Fetch に関する共通処理も、例外的な適用になっていたのだ。

このあたりは、以下にまとまっている。

- Implementing keepalive on Fetch API #Chromium - Qiita
  - https://qiita.com/hirano_y_aa/items/ee73bdd74f70f1d36b01

こうした問題を解決するために、`fetch()` そのものがページを閉じても止まらないようにする方が、将来への API の拡張性にも良いだろうとして提案されたのが `fetch()` の `keepalive` だ。


## Fetch KeepAlive

`fetch()` に追加された `keepalive: true` オプションは、ページが閉じても送信を止めずに `fetch()` を完了できるようにするオプションとして、2017 年頃提案された。

```js
fetch("https://telemetory.example/beacon", {
  keepalive: true,
  body: data,
  // ...
})
```

これなら `fetch()` が持つ全ての API がそのまま利用できるため、POST もできるし `Content-Type` も変えられる。`sendBeacon()` に比べると格段に柔軟な API となったのだ。仕様的にも `sendBeacon()` が、内部的に KeepAlive Fetch で定義されるように更新されている。

これにより、「送信を始めたら終わるまで送ってくれる」点は改善した。

しかし、問題はそれを呼び出すタイミングの方に移っていく。

「ページが終わるときにビーコンを送りたい」というユースケースを実現するための送信タイミングは、`unload`、`beforeunload` などのイベントが考えられる。しかし、モバイルブラウザなどを考えると、「ユーザは閉じる動作は何もしてないが、ずっと使われてないアプリが OS によって消される」など、特にイベントが発火しない場合などもあるのだ。

そこで、`pagehide`、`visibilitychange` への移行が求められた時期もあるが、長い事互換性がなく、発火の条件やタイミングがモバイルブラウザで揃わなかった。

その後、BFCache が重要視される時代になると、BFCache への保存やキャッシュヒットを考えたときに「いつページが終わったか」という指標はより複雑になった。

結果、「ページの終わり」を意図したタイミングは、何らかのイベントが全ブラウザ同様に発火するとも、意図したタイミングで確実に発火するとも保証がないことが浮き彫りになった。

- The spec's definition of hidden is unclear and should be updated to better account for mobile use cases · Issue #59 · w3c/page-visibility
  - https://github.com/w3c/page-visibility/issues/59

そこで、提案された「送るタイミング自体も、ブラウザに任せよう」という API が Pending Beacon API だ。


### Pending Beacon API

Pending Beacon は、「送信」ではなく「登録」のみを行う API として 2022 年頃提案された。

```js
beacon = new PendingBeacon(url, {backgroundTimeout: 1000});
beacon.setData(data);
```

このように送信したい情報を登録すると、それがブラウザの送信キューに保存され、「閉じる」に相当するとブラウザが判断したタイミングで、内部的に送信されることになる。逆を言うと、開発者にとってはいつ送信されるかはわからないため、コード上は「常に最新のデータを PendingBeacon に登録し続ける」といった使い方だ。

つまり開発者は、「送る情報」だけに集中し、「送られるタイミング」について気にする必要が無くなったのだ。

しかし、前述の通り Pending Beacon は Keep Alive Fetch よりも後の提案でありながら、「不自由な API」だった Beacon API の方をベースに策定されている。

そもそも、`fetch()` とは「`Request` を受取り `Response` を Resolve する API」だ。送ってない Response を Resolve することは想定されてない。そんな `fetch()` に「Request を登録するだけ」という概念を持ち込むのは、そのままでは難しかったのだ。

それでも、無理やり `fetch()` でやろうという提案はあった。それが Fetch with Pending Request と呼ばれる API だ。


### Fetch with Pending Request

`fetch()` を強引に拡張して、Defer を実現するための提案が 2023 年頃なされた。

- pending-beacon/docs/fetch-with-pending-request-api.md at main · WICG/pending-beacon
  - https://github.com/WICG/pending-beacon/blob/main/docs/fetch-with-pending-request-api.md
- Fetch-based design · Issue #70 · WICG/pending-beacon
  - https://github.com/WICG/pending-beacon/issues/70

```js
pending = true;
abort = new AbortController();
let sentSignal = new SentSignal();
fetch(data, {
  deferSend: new DeferSend(),
  signal: abortController.signal,
  sentSignal: sentsentSignal
});

sentSignal.addEventListener("sent", () => {
  pending = false;
});
```

見ての通り、`AbortSignal` の要領で、新しく `DeferSend` クラスを導入している。

この提案があった期間はとても短く、Intents も出ていなかったため、実装されたのかもよくわからない。

確かに `fetch()` ベースではあるが、この方針もそこまで上手く行かず、議論は長引いていた。


## fetchLater API

`fetch()` を拡張する方針は複雑になりすぎるため、同じく 2023 年に代替案として提案されたのが `fetchLater()` だ。

議論を見ると、前述の議論の途中に Safari の内部から出てきたのが出自のようだ。

- Fetch-based design · Issue #70 · WICG/pending-beacon
  - https://github.com/WICG/pending-beacon/issues/70#issuecomment-1525821663
- [explainer] Add explainer for `fetchLater()` API by mingyc · Pull Request #80 · WICG/pending-beacon
  - https://github.com/WICG/pending-beacon/pull/80

`fetch()` の Request を受け Response を Resolve するという設計は変えず、`fetch()` とほぼ同じ引数を取るが、送信キューへの登録が完了したことだけを Resolve する API にしたものが `fetchLater()` となる。

追加されたのは `activeAfter` という、送信イベント発火後の遅延時間の指定だけだ。

```js
const fetchLaterResult = await fetchLater({
  url,
  method: 'POST'
  body,
}, {
  activateAfter: 60000 // 1min
})
```

返すのは `FetchLaterResult` で、そこには `activated` という送信済みかどうかのフラグだけがある。

これを用いれば、送信前に Abort して登録し直すといったことも可能だ。

```js
const controller = new AbortController();
const fetchLaterResult = await fetchLater({
  url,
  body,
  signal: controller.signal
})
if (fetchLaterResult.activated === false) {
  controller.abort()
  // fetchLater しなおす
}
```

あとは Stream で送れないといった点を除けば、`keepalive: true` な `fetch()` とほぼそのまま同じ API となっている。

これにより、ここまでの全ての要件を満たし、`fetch()` の最小限のラッパーによって実装が可能な Beaconing API が完成したのだ。


## Outro

様々な議論の紆余曲折があり、結局どうなるのかとウォッチしてきたが、先日とうとう Chrome で `fetchLater()` の Ship が出たため、ここまでの経緯をまとめることにした。

別の観点で、「登録し続けた Beacon が、送信されずに溜まっていくことを考えると、Quota を設定する必要がある」という議論が並行して行われていたが、今回は省略した。使う場合は送信の上限について留意してほしい。


## DEMO

動作するデモを以下に用意した。

- https://labs.jxck.io/fetch/fetchLater.html


## Resources

- Spec
  - Beacon
    - https://w3c.github.io/beacon/
  - Fetch Standard Pull Request #1647 Preview
    - https://whatpr.org/fetch/1647/07662d3...139351f.html
- Explainer
  - Beacon
    - https://github.com/w3c/beacon
  - Pending Beacon
    - https://github.com/WICG/pending-beacon/blob/main/docs/pending-beacon-api.md
  - fetchLater()
    - https://github.com/WICG/pending-beacon/blob/main/docs/fetch-later-api.md
- Requirements Doc
  - Fetch Keep Alive
    - https://docs.google.com/document/d/1iHJtFa3jOo5n9QXHb6Ok5nK8kavXSk2DrLoubPWi9ys
  - Pending Beacon
    - https://docs.google.com/document/d/1QIFUu6Ne8x0W62RKJSoTtZjSd_bIM2yXZSELxdeuTFo
  - fetchLater
    - https://docs.google.com/document/d/1U8XSnICPY3j-fjzG35UVm6zjwL6LvX6ETU3T8WrzLyQ
- Mozilla Standard Position
  - Fetch keepalive · Issue #967 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/967
  - fetchLater() API · Issue #703 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/703
- Webkit Position
  - Fetch keepalive · Issue #967 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/967
  - fetchLater() API (previously: PendingBeacon API) · Issue #85 · WebKit/standards-positions
    - https://github.com/WebKit/standards-positions/issues/85
- TAG Design Review
  - Beacon · Issue #23 · w3ctag/design-reviews
    - https://github.com/w3ctag/design-reviews/issues/23
  - Early Design Review: Pending Beacon API · Issue #776 · w3ctag/design-reviews
    - https://github.com/w3ctag/design-reviews/issues/776
  - Specification Review: FetchLater API · Issue #887 · w3ctag/design-reviews
    - https://github.com/w3ctag/design-reviews/issues/887
- Intents
  - Intent to implement: Beacon (2014/04/11)
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/Vdi7F7Mk_rM/m/hSFI2NQ_z14J
  - Intent to Ship: Beacon (2014/07/25)
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/lpMtr_-2yYw/m/FNnMpiJA2mAJ
  - Intent to Implement: Fetch API: keepalive
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/AUAIHVF63SM/m/naGVAnoBAwAJ
  - Intent to Ship: Fetch API: keepalive
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/8vqcABTnDF4/m/ykhzwcggDgAJ
  - Intent to Prototype: Declarative PendingBeacon API (2022/05/09)
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/tPTRZkSmlbg/m/5vGhjrEsAgAJ
  - Intent to Prototype: fetchLater API (2023/07/18)
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/KXnqpUpVwPQ/m/0vGKd1r8AAAJ
  - Intent to Ship: fetchLater API (2025/02/12)
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/Nd8Y3BVEoDs/m/YAt18AlHAAAJ
- Chrome Platform Status
  - Beacon - Chrome Platform Status
    - https://chromestatus.com/feature/5517433905348608
  - Fetch API: keepalive - Chrome Platform Status
    - https://chromestatus.com/feature/5760375567941632
  - fetchLater API - Chrome Platform Status
    - https://chromestatus.com/feature/4654499737632768
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
  - Specification Review: FetchLater API · Issue #887 · w3ctag/design-reviews
    - https://github.com/w3ctag/design-reviews/issues/887
  - Specify restriction for requests with keepalive set · Issue #679 · whatwg/fetch
    - https://github.com/whatwg/fetch/issues/679
  - keepalive: Do we need to restrict the number of requests at a time? · Issue #662 · whatwg/fetch
    - https://github.com/whatwg/fetch/issues/662
- Other