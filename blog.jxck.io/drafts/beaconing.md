# fetch() keep-alive, sendBeacon, fetchLater() の違い

## Intro

ブラウザで、 Window を閉じる際に何かしらの情報をサーバに送信したいケースがある。

これを Beacon の送信(Beaconing)と呼び、特にページ表示中に収集したパフォーマンスなどを、テレメトリサーバに送る場合などに用いられる。

しかし、「ブラウザが閉じる直前に、サーバにリクエストを送信する」のは、実は非常に難しく、これを標準技術で実現する過程で、複数の API が生まれるに至った。

各 API の違いを解説していく。

いつも歴史を深堀りすぎて長くなるので、今回はある程度簡潔にまとめることにする。

## `<img>` での送信

もっとも原始的な Beacon の送信は、 `<img>` を用いたものだろう。


```js
window.addEventListener("unload", () => {
  const beaconImage = new Image(1, 1)
  beaconImage.src = "https://telemetory.example/beacon?a=10&b=20"
  document.body.appendChild(beaconImage)
})
```

このように、 URL のクエリに情報を詰め込んだタグを body に追加すると、 GET リクエストを送信できる。

DOM の追加は同期処理であるため、 `unload` 時に行うと、画像の取得のために `unload` が遅延される実装が多くあった。

`unload` でなくとも、サーバはレスポンスとして 1x1 px の白い画像を返すことで、ユーザには気づかれないでクエリから情報を収集できるのだ。

また、この方法であれば CORS の制約なく任意のサーバに情報を送れるため、 XHR 以前からアナリティクスなどの実装に用いられていた。

今でも、この実装の名残を見ることは少なくない。

しかし、ページ遷移の直前に追加した場合に、本当に情報が送信されたかどうかを保証することができない。

また、 URL にシリアライズすると、ブラウザの制限などによって送信できるデータ量にも制限が出る。

そこで、次に目をつけられるのが XHR の同期送信だ。

## Sync XHR

fetch ではできない、ブロックを伴う同期の送信が XHR では可能だ。 `unload` などの中で呼べば、そこでメインスレッドをブロックし、送信の確度を上げられそうだ。

```js
window.addEventListener("unload", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://telemetory.example/beacon", false /*sync*/);
  // body に情報を追加
  xhr.send() // 送り終わるまでブロック
})
```

XHR にすれば POST もできるし、 JSON もそのまま送れる。自由度が高まったように思えるだろう。

しかし、 CORS で JSON を POST すると Preflight が発生し、結局ちゃんと送れない場合が多くなる。

なにより、同期 API の利用は、ブラウザとしては無くしていくべきものだ。この実装も、画面遷移を阻害し、ユーザの体験が悪化する原因になる。

ユースケースはあるのに API が無いばかりに、こうした行儀の悪い実装が横行するのであれば、それを API 化するべきだ。

そこで策定されたのが Beacon API だ。

## Beacon API

`navigator.sendBeacon()` は、メインスレッドをブロックせず、ページ遷移にも影響しないが、ページが閉じたあとでも Beacon を送信できる方法として策定された。

```js
window.addEventListener("unload", () => {
  navigator.sendBeacon("/log", );

})
```



## Outro

deadbeef


## DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/>


## Resources

- Spec
- Explainer
-
  - Pending Beacon
    - https://github.com/WICG/pending-beacon/blob/main/README.md#motivation
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