# sendBeacon, fetch() keepalive, fetchLater()

## Intro

ブラウザで、ページを閉じる際に何かしらの情報をサーバで収集したいケースがある。

これを Beacon の送信(Beaconing)と呼び、ブラウザではページ表示中に収集したパフォーマンス統計の収集や、広告タグによるトラッキングなどに用いられる。

しかし、「**ページが閉じる直前に、サーバにリクエストを送信する**」というユースケースは実は非常に難しく、これを標準技術で実現する過程で、複数の API が生まれるに至った。

各 API の経緯と違いを解説していく。

## `<img>` での送信

もっとも Primitive な Beacon の送信は、 `<img>` を用いたものだった。

```js
window.addEventListener("unload", () => {
  const beaconImage = new Image(1, 1)
  beaconImage.src = "https://telemetory.example/beacon?a=10&b=20"
  document.body.appendChild(beaconImage)
})
```

このように、 URL のクエリに情報を詰め込んだタグを body に追加すると、画像取得のために GET リクエストを送信できる。

DOM の追加は同期処理であるため、 `unload` 時に行うことで、画像の取得完了まで `unload` を遅延する実装が多くあったからだ。

`unload` でなくとも、サーバはレスポンスとして 1x1 px の白い画像を返すことで、ユーザには気づかれずにクエリから情報を収集できるのだ。

また、この方法であれば CORS の制約なく任意のサーバに情報を送れるため、 XHR 以前からよく用いられていた。

今でも、アナリティクスサービスなどで、この実装の名残を見ることは少なくない。

しかし、 URL にシリアライズすると、ブラウザの制限などによって送信できるデータ量にも制限が出る。なにより GET しかできないのも強い制限だ。

そこで、次に目をつけられたのが XHR の同期送信だ。

## Sync XHR

ブロックを伴う同期の送信が XHR では可能だ。 `unload` などの中で呼べば、そこでメインスレッドをブロックして送信し、 POST もできる。

```js
window.addEventListener("unload", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://telemetory.example/beacon", false /*sync*/);
  xhr.send(data) // 送り終わるまでブロック
})
```

JSON もそのまま送れるため、自由度が高まったように思えるだろう。

しかし、 CORS で JSON を POST すると Preflight が発生し、リクエストが一回では終わらず、きちんと送しきれない場合が出てくる。

なにより、同期 API の利用は、ブラウザとしては無くしていくべきものだ。 `unload` をブロックすると画面遷移を阻害し、ユーザの体験が悪化する原因になる。

ユースケースはあるのに API が無いばかりに、こうした行儀の悪い実装が横行するのであれば、それを API 化するべきだ。

そこで策定されたのが Beacon API だ。

## Beacon API

`navigator.sendBeacon()` は、メインスレッドをブロックせず、ページ遷移にも影響しないが、ページが閉じたあとでも 非同期に Beacon を送信できる方法として策定された。

2014 年ごろのことだ。

```js
window.addEventListener("unload", () => {
  navigator.sendBeacon("https://telemetory.example/beacon", data);
})
```

非常にシンプルな API だが、要は渡したデータを URL に対して POST で送信する。ページが閉じようが送信中のものは完了までハンドルされるため、取りこぼしを気にする必要が減るのだ。

しかし、代わりに制限が非常に大きい API でもある。

例えば、Preflight や Redirect が挟まると、送信に時間がかかるため、こうしたリクエストは最初からサポート外なのだ。ヘッダは触れないし、 `fetch()` に指定できるオプションも無い。

つまり `sendBeacon` は意図して非常に不自由な API となっており、それゆえに拡張性が乏しい。

また Chrome については、正規のパスを通さずにレイヤをまたいだ無作法な実装で載せられていた。これは、将来的に `fetch()` を様々な側面で改善していっても、その成果が `sendBeacon()` には反映できないため、いつまでも負債として残り続けることを意味する。現に CSP や Mixed Contents Check などはバイパスされていた。

このあたりは、以下にまとまっている。

- Implementing keepalive on Fetch API #Chromium - Qiita
  - https://qiita.com/hirano_y_aa/items/ee73bdd74f70f1d36b01

こうした問題を解決するために、 `fetch()` そのものがページを閉じても止まらない用にする方が、拡張的にも良いだろうとして提案されたのが `keepalive` だ。

## fetch keepalive

`fetch()` に追加された `keepalive: true` オプションによ、ページが閉じても送信を止めずに `fetch()` できるようになった。2017 年ごろのことだ。

```js
fetch("https://telemetory.example/beacon", {
  keepalive: true,
  body: data,
  // ...
})
```

これで `fetch()` が持つ全ての API がそのまま利用できるため、 POST もできるし `Content-Type` も変えられる。 `sendBeacon` に比べると格段に柔軟な API となったのだ。

また、仕様的にも `sendBeacon()` 自体が、内部的に KeepAlive Fetch で定義されるように更新されている。

これにより、「送信を始めたら終わるまで送ってくれる」点は改善したが、問題はそれを呼び出すタイミングの方に生まれた。

「ページが終わるときにビーコンを送りたい」というユースケースは、 `unload`、 `beforeunload` などのタイミングが考えられる。しかし、モバイルブラウザなどを考えると、「ユーザは閉じる動作は何もしてないが、ずっと使われてないアプリが OS によって消される」など、特にイベントが発火しない場合などもある。

そこで、 `pagehide`、 `visibilitychange` への移行が求められた時期もあるが、長い事互換性がなく、発火の条件やタイミングがモバイルブラウザで揃わなかった。

また、 bfcache のヒットなども考えると、単に別ページに遷移したからと言って、「ページが終わった」と言えるかという問題もある。

結果、「ページの終わり」を意図したタイミングは、何らかのイベントが同様に発火するとも、確実に発火するとも保証がないのだ。

- The spec's definition of hidden is unclear and should be updated to better account for mobile use cases · Issue #59 · w3c/page-visibility
  - https://github.com/w3c/page-visibility/issues/59

そこで、提案された「送るタイミング自体も、ブラウザに任せよう」という API が Pending Beacon API だ。

### Pending Beacon API

Pending Beacon は、「送信」ではなく「登録」のみを行う API として提案された。 2022 年頃だ。

```js
beacon = new PendingBeacon(url, {backgroundTimeout: 1000});
beacon.setData(data);
```

このように送信したい情報を登録すると、それがブラウザ内に保存され、「閉じる」に相当するとブラウザが判断したタイミングで、内部的に送られることになる。

逆を言うと、開発者にとってはいつ送信されるかはわからないため、コード上は「常に最新のデータを PendingBeacon に登録し続ける」といったものになる。

つまり開発者は、「送る情報」だけに集中し、「送られるタイミング」について気にする必要が無くなったのだ。

しかし、前述の通り Pending Beacon は Keep Alive Fetch よりも後の提案でありながら、 Beacon API の方をベースに策定されている。

そんなことをしたら、「不自由な API」になるだけだろうというのは明白かもしれないが、 `fetch()` は `Request` を受取 `Response` の Promise を返す API だ。

そんな `fetch()` に「Request を登録するだけ」という概念を持ち込むのは、そのままでは難しかったという問題がある。

それでも、無理やり `fetch()` でやろうという提案はあった。それが Fetch with Pending Request と呼ばれる API だ。

### Fetch with Pending Request

`fetch()` を強引に拡張して、 Defer を実現するための提案だ。2023 年頃だ。

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

見ての通り、 `AbortSignal` の要領で、新しく `DeferSend` クラスを導入している。

この仕様があった期間はとても短く、 Intents も出ていなかったため、実装されたのかもよくわからない。

確かに `fetch()` ベースではあるが、この方針もそこまで上手く行かず、議論は長引いていた。

## fetchLater API

`fetch()` を拡張する方針は複雑になりすぎるため、別途提案されたのが `fetchLater()` だ。 2023 年だ。

議論を見ると、前述の議論の途中に Safari の内部から出てきたもののようだ。

- Fetch-based design · Issue #70 · WICG/pending-beacon
  - https://github.com/WICG/pending-beacon/issues/70#issuecomment-1525821663
- [explainer] Add explainer for `fetchLater()` API by mingyc · Pull Request #80 · WICG/pending-beacon
  - https://github.com/WICG/pending-beacon/pull/80

`fetch()` は Request を取り Response (の Promise)を返す API であるという点を変えるのは難しかった。

そこで、 `fetch()` とほぼ同じ引数を取るが、送信キューへの登録が完了したことだけを変えす API にしたものが `fetchLater()` となる。

追加されたのは `activeAfter` という、送信イベント発火後の遅延時間の指定だけだ。

```js
const fetchLaterResult = await fetchLater({
  url,
  method: 'POST'
  body,
}, {
  activateAfter: 60000 /* 1 min */
})
```

返すのは `FetchLaterResult` を返し、そこには `activated` という送信済みかどうかのフラグだけがある。

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

これにより、ここまでの全ての要件を満たし、 `fetch()` の最小限のラッパーによって実装が可能な API が出来たのだ。

## Outro

様々な議論の紆余曲折があり、結局どうなるのかとウォッチしてきたが、先日とうとう Chrome で `fetchLater()` の Ship が出たため、ここまでの経緯をまとめることにした。

## DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/>

## Resources

### Beacon

- Intent to implement: Beacon (2014/04/11)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Vdi7F7Mk_rM/m/hSFI2NQ_z14J
- Intent to Ship: Beacon (2014/07/25)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lpMtr_-2yYw/m/FNnMpiJA2mAJ
- w3c/beacon: Beacon
  - https://github.com/w3c/beacon

### Fetch Keepalive

- Intent to Implement: Fetch API: keepalive
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AUAIHVF63SM/m/naGVAnoBAwAJ
- Intent to Ship: Fetch API: keepalive
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8vqcABTnDF4/m/ykhzwcggDgAJ
- Design Doc
  - https://docs.google.com/document/d/1iHJtFa3jOo5n9QXHb6Ok5nK8kavXSk2DrLoubPWi9ys

### Pending Beacon

- Intent to Prototype: Declarative PendingBeacon API (2022/05/09)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tPTRZkSmlbg/m/5vGhjrEsAgAJ
- Explainer
  - https://github.com/WICG/pending-beacon/blob/main/docs/pending-beacon-api.md
- Desing Doc
  - https://docs.google.com/document/d/1QIFUu6Ne8x0W62RKJSoTtZjSd_bIM2yXZSELxdeuTFo/edit?pli=1&tab=t.0

### fetch Later

- Intent to Prototype: fetchLater API (2023/07/18)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KXnqpUpVwPQ/m/0vGKd1r8AAAJ
- Intent to Ship: fetchLater API (2025/02/12)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Nd8Y3BVEoDs/m/YAt18AlHAAAJ
- Explainer
  - https://github.com/WICG/pending-beacon/blob/main/docs/fetch-later-api.md
- Design Doc

  - https://docs.google.com/document/d/1U8XSnICPY3j-fjzG35UVm6zjwL6LvX6ETU3T8WrzLyQ

- Spec
- Explainer
  - Pending Beacon
    - https://github.com/WICG/pending-beacon/blob/main/README.md#motivation
  - WICG/pending-beacon
    - https://github.com/WICG/pending-beacon/blob/main/docs/pending-beacon-api.md
  - fetchLater()
    - https://github.com/WICG/pending-beacon/blob/main/docs/fetch-later-api.md
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
  - Specification Review: FetchLater API · Issue #887 · w3ctag/design-reviews
    - https://github.com/w3ctag/design-reviews/issues/887
  - pending-beacon/docs/alternative-approaches.md at main · WICG/pending-beacon
    - https://github.com/WICG/pending-beacon/blob/main/docs/alternative-approaches.md
  - Specify restriction for requests with keepalive set · Issue #679 · whatwg/fetch
    - https://github.com/whatwg/fetch/issues/679
  - keepalive: Do we need to restrict the number of requests at a time? · Issue #662 · whatwg/fetch
    - https://github.com/whatwg/fetch/issues/662
- Other
