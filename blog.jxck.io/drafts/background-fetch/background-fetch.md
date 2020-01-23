# [background-fetch][service worker] Service Worker の Background Fetch によるメディアのキャッシュ

## Intro

Podcast を PWA 対応するために、待望だった機能の 1 つが Background Fetch だ。

これにより、通常 Range Request で取得するような、大きなファイルをダウンロードしておくことができるようになる。

この API の使い方について解説する。


## background fetch

Podcast は大きな音声ファイルがメインコンテンツとなる。

PWA のキャッシュ戦略典型例としては

- install 時に全てキャッシュする
- request 発生時にキャッシュする

といった方法がある。

しかし、この方法は一般的な Podcast としては少し使いにくい。

- install 時に全てのファイルをキャッシするのは現実的ではない
- request が Range なのでキャッシュが生成しにくい

前者は分かりやすいだろう。後者は少し補足する。


## Range Request と Cache API

音声の再生は、必ずファイルの先頭からリクエストするわけではなく、途中から聞く場合は途中からリクエストを行う。

また、全てのレスポンスが揃ってから開始するわけではなく、届いた順に再生する。

HTTP 上は Range Request と Partial Response が使われ、途中から再生するような場合以下のようになる。


```
GET /mozaic-ep60.mp3 HTTP/1.1
Host: files.mozaic.fm
Range: bytes=54034432-
```

```
HTTP/1.1 206 Partial Content
content-type: audio/mpeg
Content-Range: bytes 54034432-101797887/101797888
Content-Length: 47763456
```

つまり、 1 つの音声ファイルを取得するリクエスト/レスポンスが、一つとは限らないというわけだ。


## Service Worker での Range Request

すると、 Service Worker で onfetch は Range ごとに複数発生する可能性がありそうだ。

HTTP の仕様によれば、 Partial Response は結合して 1 つの Response にすることが許されている。

しかし、 Service Worker の Cache API はそんなことしてくれないから、自分でやるんだろうと予想する。

すると以下のケースが考えられるだろう。

すると、ユーザが頭から最後まで再生し、それを裏でまるっと保存できればよいが、途中から途中まで聞いた場合はどうだろう。

歯抜けのキャッシュをヒットさせつつ、足らない部分はネットワークから取るなどしないといけなさそうだ。

しかも Response オブジェクトには結合なんてメソッドは無いため、自分で ArrayBuffer を結合してそれを返す Reponse を自分で作る必要がありそうだ。

1 byte でもずれてたら音声ファイルとして壊れたりしないだろうか、など色々妄想しつつ onfetch のログを眺めてみたとことがあれば、それどころじゃないことに気付くだろう。

*Service Worker はそもそも Range/Partial には対応してない* というか標準化されてない。


## fetch を通すと消える Range ヘッダ

onfetch で Range になるはずのリクエストを見てみると、レスポンスが必ず 200 で返ってきていることに気付く。

```js
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const req = e.request
    const res = await fetch(req)
    console.log(req, res)
    return res
  })())
})
```

最初は Service Worker が 206 を 200 に変えてしまうバグかと思ったが、 Content-Range もついてない。

もしやと思い、サーバ側のログを見ると、そもそも Range ヘッダが送られていない。

そもそも、 fetch を通すと Range Request が普通のリクエストとして送られているのだ。

最初に試したのが Service Worker の初期の頃だったため、単に実装されてないだけろうと思い、実装されるのを待って漬けていた。


## ブラウザにおける Range/Parcial

以下のブログが出て初めて、実装ではなく仕様の問題だということがわかった。

- [I discovered a browser bug - JakeArchibald.com](https://jakearchibald.com/2018/i-discovered-a-browser-bug/)

結論から言うとこうだ。

> They're standardised in HTTP, but not by HTML. We know what the headers look like, and when they should appear, but there's nothing to say what a browser should actually do with them.
> --- <cite>https://jakearchibald.com/2018/i-discovered-a-browser-bug/#range-requests-were-never-standardised</cite>


つまり、 `<audio>` / `<video>` などで Range を使うのはブラウザの実装によるところであるため、 Service Worker/Fetch/Cache のような API に起こす上でどうするかが決まってなかった。

それでも、 200 では取得できるため、全体が得られればキャッシュは出来るし、 Safari などには 206 に置き換えて返すなどもできる。

しかし、基本的に大きなファイルである Podcast をやる上で、標準化されてない仕様と、足りてない実装で、エッジケースだらけの要件を実装し切る必要が有る。

そこまでやっても、途中までしかキャッシュできてない状態でオフラインになると、途中で再生が止まるフラストレーションが溜まるだけだ。

なら Podcast アプリで聞いたほうが体験が良いということになる。

PWA で理想的な Podcast アプリを実現するのは難しそうだ。と諦めてから 4 年近く経った。


## background fetch

Podcast のアプリは基本的に、ネットワークがある間にダウンロードを完了し、地下鉄などを移動する際に聞ける状態になっているだろう。

これと同じことが可能になるのが background fetch だ。

Service Worker に fetch を Task として追加し、バックグラウンドで実行させる。これは大きなファイルをブラウザでダウンロードしているときと同じような UX となる。

もちろん、取得が終われば結果を 1 つの大きな Response として取得できるため、それをそのまま Cache API で保存すれば良い。分割されてないため Cache HIT も普通にできる。

これを用いると Podcast アプリと近い UX を実現できるのだ。


## API

### backgroundFetch registration

取得したい URL とオプションを登録する。

ID はそのタスク自体を識別するために登録し、もし同じ ID のタスクがある状態で再登録しようとすると例外が出る。

また、ダウンロード対象を複数登録して同時にダウンロードさせることができる。

```js
const id   = 'ep01'
const mp3  = 'https://files.example.com/ep01.mp3'
const html = 'https://files.example.com/ep01.html'
const option = {
  title: 'title of download',
  downloadTotal: 65535, // size
  icons: [{src: 'logo.png', sizes: '256x256', type: 'image/webp'}]
}
const registration = await navigator.serviceWorker.ready
const task = await registration.backgroundFetch.fetch(id, [url, mp3], option)
```

### foreground event

ダウンロードの進捗は window 側で progress イベントで上がる

```js
task.addEventListener('progress', (e) => console.log(e.downloaded))
```


### abort()

中断は API から可能であり、 `abort()` を呼べば task が終了する。

```js
task.abort()
```

ただし、 Pause/Resume は API がなく、[提案](https://github.com/WICG/background-fetch/issues/38) はされてるが、その UI は OS 側が提供するというスタンスだ。


## background event

Service Worker 側では以下のイベントが上がる。

- backgroundfetchsuccess
- backgroundfetchfail
- backgroundfetchabort
- backgroundfetchclick


```js
// ダウンロード完了
self.addEventListener('backgroundfetchsuccess', (e) => {
  e.waitUntil(async function() {
    try {
      // 結果を取り出す
      const id = e.registration.id
      const record = await e.registration.match(id)

      // キャッシュ対象
      const request = record.request
      const response = await record.responseReady

      // キャッシュ追加
      const cache = await caches.open(CACHE_NAME)
      await cache.put(request.url, response)

      // 通知
      await e.updateUI({ title: 'download finished' })
    } catch (err) {
      console.error(err)
      e.updateUI({ title: `download failed ${e.registration.id}` })
    }
  }())
})

// download タスクをクリック
self.addEventListener('backgroundfetchclick', (e) => {
  e.waitUntil(async function() {
    const id = e.registration.id
    // 該当ページを開く
    clients.openWindow(`https://files.example.com/${id}.html`)
  }())
})

self.addEventListener('backgroundfetchfail', (e) => {
  // 特に何もする必要ないっぽい
  console.error(e)
})

self.addEventListener('backgroundfetchabort', (e) => {
  // 特に何もする必要ないっぽい
  console.error(e)
})
```

fail/abort は、タスクが消えるため特にリソースの開放などは必要なさそうだ。


## Cache HIT

キャッシュは Range などを気にする必要もなく普通に返せば良い。

実際に `<audio>` タグは途中からでも普通に再生できた。

```js
// ダウンロードしたものを返す
self.addEventListener('fetch', (e) => {
  e.respondWith(async function() {
    const cachedResponse = await caches.match(e.request.url)
    if (cachedResponse) {
      // cache hit
      return cachedResponse
    } else {
      // fallback to fetch
      return fetch(e.request)
    }
  }())
})
```


## DEMO

動作するデモは以下に用意した。

- https://labs.jxck.io/service-worker/background-fetch/


## まとめ

あくまでもキャッシュなので、積極的に保存を考える場合は File API も考慮できるだろう。

しかし、これによってファイルをダウンロードしておくキャッシュ戦略が取れるようになった。

ところが、 Podcast アプリなら、ユーザが操作してないときに自動でダウンロードしておきたい。

ネットワークに繋がっている場合、定期的にサーバに RSS を問い合わせ、更新があれば fetch する。

ここでもう 1 つ待望だった API の [Periodic Background Sync](https://github.com/WICG/periodic-background-sync) が利用できるだろう。

次回はそちらを解説したい。
