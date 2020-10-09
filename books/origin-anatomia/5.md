---
title: "Origin をまたぐその他の仕様"
emoji: "📝"
type: "tech"
topics: ["service worker", "websocket", "origin", "web"]
published: false
---

# Origin をまたぐその他の仕様

CORS 以外にも Origin をまたいだやり取りが可能な API がいくつかある。

それらの API を大きく以下の 2 つにわける。

- Origin が策定されて以降に仕様が作られ、 Origin を安全にまたぐ仕様
- Origin が策定される以前から存在し、 Origin に準拠してない仕様

これらを解説することにより、古い仕様を改善するための提案がなぜ必要なのか、新しい仕様が策定される場合何を意識して作られるのかを把握し、 Origin への理解を深める。


## Origin を安全にまたぐ仕様

CORS 以外にも、異なる Origin と安全にやりとりを行える仕様がいくつか存在する。

ここでは、それらが **どのように安全に Origin をまたぐのか** を解説することで、 Origin に対する理解を深めていく。


### `<iframe>` と MessageChannel

前説では `<iframe>` と `document.domain` の危険性について解説し、代替として MessageChannel が推奨されていることを紹介した。

以下は https://a.example が別 Origin である https://b.example を埋め込み MessageChannel を用いてメッセージを送る例だ。 


```html
<title>a.example</title>
<iframe src=b.example>

<script>
  const $ = document.querySelector.bind(document)
  $('iframe')
    .contentWindow
    .postMessage(JSON.stringify({action: "increment"}), "https://b.example") // 送信先の Origin を指定
</script>
```


```html
<title>b.example</title>

<script>
  const counter = {value: 0}
  window.on('message', (e) => {
    // 受信元の Origin を検証
    if (e.origin !== "https://a.example") return
    const action = JSON.parse(e.data).action
    switch (action) {
      case "increment":
        counter.value ++
        break
      case "decrement":
        counter.value --
        break
      default:
        break
    }
  })
</script>
```

a.example が送ったメッセージは、 b.example がハンドラを実装して受信しようとしない限り受信されない。これにより、任意のページを埋め込んで好きなように情報を抜き出すことはできないようになっている。仮に受信しても、そのメッセージの内容を正しく理解しないと処理できないため、メッセージにルールを設ければ無差別なメッセージの送信による攻撃は無意味になる。メッセージのルールが知られたとしても、 **送信先** および **受信元** を Origin ベースで検証できるため、意図しない場所への送信による漏洩や、意図しない相手からのメッセージに反応してしまうことを防ぐことができる。

Origin をまたぐ仕様は、またいだ双方に合意があればよく、また Origin の概念が生まれる前に実装されたサーバやページが、誤って反応してしまい、情報が漏洩することを防ぐように実装されている必要がある。 Message Channel は `document.domain` には無かったそうした部分を改善しており、より安全に使用することができる。

:::message alert
受信側にハンドラを書くのが面倒に感じると、任意のコードを文字列として送り、 `eval()` などで動的に実行させたくなる誘惑に駆られるかも知れない。
そうしたメッセージの受信を許容する実装は、送信側に XSS などがあった場合にその影響が受信側にも影響する可能性があるため、危険と考えられる。
メッセージの送受信双方が、明示的にコードを記述していることが安全につながっているため、仮に送信先/受信元を検証していたとしても、横着してそのような実装を行うのは避けるべきだろう。
:::


### WebSocket と Origin

WebSocket は、最初から Origin をまたぐ仕様として考えられている。こうした新しい仕様によって、既存のサーバと CORS を迂回するために利用できては問題があるため、 WebSocket も工夫した実装がされている。

通常こうした新しいプロトコルは、そもそもポートを変えたり、プロトコルフォーマットを全く変えることで、既存のサーバと誤って接続が確立しないように作られる場合が多いが、 WebSocket は既存のミドルボックスにより防がれないように、最初は HTTP のフォーマットを用いたハンドシェイクを行う設計になっている。すると、以下のような場合に CORS の迂回などが発生する懸念が生まれる。

- `fetch()` やその他既存の Web の機能を用いて、 WebSocket のネゴシエーションヘッダが偽装できてしまう
- Person in the Middle (中間者攻撃) によって HTTP のリクエストが WebSocket のものに書き換えられてしまう
- WebSocket を実装してない既存のサーバが、 WebSocket のリクエストを HTTP だと思って受け入れてしまう

これを踏まえて [RFC6455](https://tools.ietf.org/html/rfc6455#section-1.2) から抜粋した WebSocket のネゴシエーションを見てみよう。

まずリクエストは以下のようになっており、単なる GET リクエストのように見えるが、必須のヘッダとして `Sec-WebSocket-Key` が付いている。`Sec-` が付くヘッダは JS からはつけることができないので、これにより fetch や XHR でこのヘッダを再現することはできない。また Origin ヘッダが付与されることで、サーバ側も許可する Origin を検証することができる。


```http
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
```

レスポンスは 101 を用いており、 200 のようにブラウザが通常のレスポンスと誤解しないようになっている。また `Sec-WebSocket-Accept` は `Sec-WebSocket-Key` で送った値から計算して算出されるため、サーバ側が WebSocket プロトコルを知った上で実装してないと絶対に付与されない値になっている。これにより、既存のサーバが(仮に多少の脆弱性などがあったとしても)、`new WebSocket()` で発生した GET にうっかり反応してレスポンスを返してしまうようなことはなく、返してもブラウザがプロトコルエラーとして捨てることになる。


```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
Sec-WebSocket-Protocol: chat
```

WebSocket より後にも、 WebTransport といった新しいプロトコルが設計されているが、そうしたプロトコルは HTTPS を前提とすることでミドルボックスによる疎通をあまり気にする必要がなく、 TLS の ALPN 拡張を用いたネゴシエーションを用いて、こうしたハンドシェイクをよりシンプルに実装している。 WebSocket は HTTPS EveryWhere よりも前に実装されたプロトコルなので、平文通信もサポートする必要があり、こうした工夫が必要だったのだ。


### Service Worker と Opaque Response

Service Worker は、ページのバックグラウンドで動作し、 onfetch ハンドラを実装すると、そのページで発生する全てのリクエスト/レスポンスに JS からアクセスでき、それらを Cache API に保存したりできる。異なる Origin への no-cors なレスポンスにも自由に触れてしまうということは、 CORS に違反してないのだろうか?


```js
self.addEventListener('fetch', (e) => {
  console.log(e.request) // ページで発生した全てのリクエストを取得できる
  const res = fetch(e.request) // レスポンスも取得できる
})
```

実は、 Service Worker から触れる Response には [Opaque Filtered Response](https://fetch.spec.whatwg.org/#concept-filtered-response-opaque) という概念がある。これは、 Response Object 自体は扱うことができるが、その内部 (Header/Body) は隠蔽されているというものだ。具体的には以下のように値が置き換えられる。

- type を "opaque" に
- url が "" に
- status が 0 に
- status text が "" に
- headers が空に
- body が "" に

これにより、オブジェクト自体は存在し、キャッシュも可能だが、その body を取得するどころかエラーだったのかすらわからないようになっている。これにより、 no-cors で発生したリクエスト(例えば crossorigin 属性のついてない `<img>` など)も、 Service Worker 内で安全に扱うことが可能になるのだ。


## Origin に準拠してない仕様


### crossorigin 属性

CORS が策定される以前からある `<script>` や `<img>` などは、異なる Origin からリソースを取得する場合に no-cros mode 、つまり Simple Request として CORS 無しで取得できることは既に解説した。

こうした HTML の要素に `crossorigin` 属性を付与すると、 Simple Request ではなく明示的に cors mode にすることもでる。

- https://html.spec.whatwg.org/multipage/urls-and-fetching.html#cors-settings-attributes

例えば、 picture.example がサイト上に公開している画像ファイルがあったとする。


```html
<!-- picture.example -->
<img src=sample.png alt="sample picture">
```

spam.example は、直接この URL を指定することで、画像を無断で転載することができてしまう。


```html
<!-- spam.example -->
<img src=https://picture.example/sample.png alt="sample picture">
```

そこで、 picture.example は公開している画像全てに CORS 対応を行いつつ自サイト内の `<img>` タグ全てに `crossorigin` 属性をつけることで、自サイト以外が直接画像を埋め込むことを拒否することが可能だ。


```html
<!-- picture.example -->
<img crossorigin src=sample.png alt="sample picture">
```

もちろんレスポンスには、 `Access-Control-Allow-Origin: https://picture.example` 付与する必要がある。

Origin ヘッダを見て、そもそも画像を返さないことも可能だろう、代わりに返すならステータスコード 403 Forbidden が妥当と思われる。


```js
app('/sample.png', (req, res) => {
  // 1. Origin ヘッダを必須とし存在しない場合は弾く
  if (req.headers.origin) {
    return res.send(403)
  }
  // 2. Origin ヘッダが存在しても外からのリクエストは弾く
  if (req.headers.origin !== 'https://picture.example') {
    return res.send(403)
  }
  // 3. CORS に対応する
  res.headers.set('Access-Control-Allow-Origin', 'https://picture.example')
  res.send(picture)
})
```

なお、単に `crossorigin` 属性のデフォルト値は `anonymous` であり、この場合のリクエストは Mode が cors で Credentials が same-origin となる。 picture.example が別の Origin も許可しつつ、 picture.example の Cookie を必要とするのであれば、利用側は `crossorigin=use-credentials` を指定すれば、 Credentials が include になる。

- `anonymous`: mode cors かつ credentials mode を "same-origin" とするため、同一 Origin にのみ Credentials を付与する(デフォルト値)
- `use-credentials`: mode cors かつ credentials mode を "include" とするため、常に Credentials を付与する

crossorigin 属性が許可されている要素は、以下の仕様から確認できる。(特に `<iframe>` には付与できない点に注意)

- https://html.spec.whatwg.org/multipage/indices.html#elements-3


### Form

前節 で`<form>` の `action` 属性には任意の Origin が指定でき、 no-cors なリクエストが送れることを解説した。

これが引き起こす典型的な脆弱性の一つが CSRF (Cross Origin Request Forgeries) だ。例えばあるブログサイト(https://blog.example)が以下のような投稿フォームを持っていたとする。


```html
<!-- ブログサイト内にある正規の投稿フォーム(簡略) -->
<form action=/entries method=post>
  <input name=title type=text>
  <textarea name=article></textarea>
  <button type=submit>投稿</button>
</form>
```

ここから発生する HTTP ペイロードは、概ね以下のようになる。


```http
POST /entries HTTP/1.1
Host: blog.example
Content-Length: 256
Content-Type: application/x-www-form-urlencoded
Cookie: session_id=deadbeef

title=hello&article=world
```

このリクエストを受け取るエンドポイントが、 URL と HTTP Method でリクエストをルーティングし、 Cookie でログインを確認する以下のような実装になっていたとする。


```js
// 1. Method と Path でルーティングする
app.post('/entries', (req, res) => {
  // 2. req.header.cookie で session を確認する(通常ミドルウェアで行う)
  // 3. 投稿を保存
  const title = req.body.title
  const article = req.body.article
  db.save(titile, article)
  res.send(201)
})
```

ここで、攻撃者は以下のような `<form>` を埋め込んだ罠サイト(https://attack.example)を作り、そこにユーザを誘導した場合を考えよう。


```html
<!-- 攻撃サイト内にある隠し投稿フォーム(簡略) -->
<form action=https://blog.example/entries method=post>
  <input name=title type=hidden value=${嫌がらせのタイトル}>
  <input name=title type=hidden value=${嫌がらせの本文}>
  <button type=submit>今すぐここをクリック!!!</button>
</form>
```

このフォームは、入力項目を予め hidden で隠しておき、誘導したユーザにボタンをクリックさせる。もしくは JS で `submit()` しても良い。いずれにせよリクエストが発生するとペイロードは以下のようになるだろう。


```http
POST /entries HTTP/1.1
Host: blog.example
Content-Length: 256
Content-Type: application/x-www-form-urlencoded
Cookie: session_id=deadbeef

title=嫌がらせタイトル&article=嫌がらせ本文
```

注目すべき点は、 form からのリクエストは Origin をまたげるため、ブラウザによってブロックされたりはせず、またリクエストには Cookie が自動で付与されるため、ユーザがブログサイトにログイン済みのブラウザでこの罠を踏むとリクエストが送信さることだ。

サーバ側の実装でみると、 HTTP Method, Path, Cookie, Requst body 全てが一致するため、このリクエストを受け入れてしまい、攻撃者はユーザに任意のブログを投稿させることができてしまうのだ。

問題は、サーバがリクエストの発生元を正しく識別できないことに起因する。そこでこのような CSRF の対策には、 Form に One Time Token を隠し、それが一致することを確認するという方法が一般的だ。


```html
<!-- ブログサイト内にある正規の投稿フォーム(簡略) -->
<form action=/entries method=post>
  <input name=title type=text>
  <textarea name=article></textarea>
  <input name=csrf_token type=hidden value=aksd3kjfpaog0yu8sdfjas123wq9ujag9f2u48aejrwlerj>
  <button type=submit>投稿</button>
</form>
```

サーバ側では以下の様にハンドリングする。

:::message alert
あくまでも概要でありそのまま使えるコードではない
:::


```js
// 0. 投稿 form を返す URL
app.post('/entries/new', (req, res) => {
  const csrf_token = generate_token() // 十分に安全な疑似乱数で One Time Token を生成
  req.session.set('csrf_token', csrf_token) // ユーザのセッションに紐付けてサーバ側に保存
  const form = build_template({csrf_token: csrf_token}) // csrf_token を埋め込んだ HTML を生成
  res.send(form) // form をユーザに表示
})

// 1. Method と Path でルーティングする
app.post('/entries', (req, res) => {
  // 2. req.header.cookie で session を確認する(通常ミドルウェアで行う)
  const expected_token = req.session.get('csrf_token')
  // 3. csrf_token を確認する
  const actual_tokne = req.body.csrf_token
  if (!actual_tokne || actual_tokne !== expected_token) {
    // token が無いか不正なため棄却
    return res.send(400)
  }
  // 4. req.body.title と req.body.article を受理する
  const title = req.body.title
  const article = req.body.article
  db.save(titile, article)
  res.send(201)
})
```

こうすれば、攻撃者は都度生成される csrf_token をなんとかして盗み出せない限り、 CSRF 攻撃を成立させることはできない。

もちろん、このように全ての form に対して csrf_token を埋め込めば CSRF 対策としては十分だろう。しかし、現在では HTTP のリクエスト中に情報を増やし、リクエストがどこから発生したのかを識別できるようにする流れがある。具体的には Origin, Referer, Fetch Metadata だ。

まず、 CORS な `fetch()` を行う場合に付与されていた Origin ヘッダが、 Form からのリクエストにも付与されるようになった。 Firefox 以外はだいぶ前からサポートしていたが、去年くらいに Firefox もサポートを始めたため、モダンブラウザの範囲であれば基本的には送られている。

また、新しい仕様としてより詳細にリクエストの性質を付与する Fetch Metadata という仕様が提案されており、すでに送信するブラウザも存在する。種類や組み合わせが多いが、他の Origin からのリクエストを弾くという目的であれば `Sec-Fetch-Site` にその情報がある。そして、 `Sec-` というプレフィックスが付与されたヘッダは JS などでは付与できないため偽装が難しい。

従来からあるヘッダとして、 Referer はリクエスト発生元の URL を含めていたが、プライバシー保護のためにユーザ拡張や設定により無効にされている場合があり、不十分だとされてきた。しかし、そうしたプライバシーの懸念は基本的には Origin をまたいで別のサイトに遷移するような場面での問題で、サイト内の遷移では問題ない(別の方法でもトラックが可能)。そうした状況を踏まえ、 Referer がより CSRF 対策に利用できるよう、現状の [RFC7231](https://tools.ietf.org/html/rfc7231#section-5.5.2) では、同一 Scheme/Host へのリクエストについて Referer を勝手に消したり改変してはならないとされているため、それに準拠した拡張や設定などであれば、 Referer は正しく付与されるはずだ。

以上のことを踏まえると、これらが全て乗ったリクエストは以下のようになる。


```http
POST /entries HTTP/1.1
Host: blog.example
Content-Length: 256
Content-Type: application/x-www-form-urlencoded
Cookie: session_id=deadbeef
Origin: https://blog.example
Referer: https://blog.example/entries
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: same-origin
Sec-Fetch-User: ?1

title=hello&article=world
```

もちろん、これら全てが付与されているとは限らないため、「 **ヘッダがあることを前提** 」に処理を書くことはできない。しかし、「 **ヘッダがあった場合にその内容を検証する** 」処理は書くことができ、それは全てのヘッダを偽装しきった攻撃以外は防ぐことができる。しかし、「 **これで CSRF Token は不要なのか** 」というと、それを確信できるほどの実績は現時点ではない。しばらくは、こうした付加情報を CSRF Token チェックの前段に置き、多重防御として採用するのが良いだろう。


```js
// 1. Method と Path でルーティングする
app.post('/entries', (req, res) => {
  // 2. req.header.cookie で session を確認する(通常ミドルウェアで行う)
  // 3. Origin ヘッダがあった場合、想定した値かを検証
  if (req.headers.origin && req.headers.origin !== 'https://blog.example') {
    return res.send(400)
  }
  // 4. Referer ヘッダがあった場合、想定した値かを検証
  if (req.headers.referer && req.headers.referer !== 'https://blog.example/posts/new') {
    return res.send(400)
  }
  // 5. Sec-Fetch-Site ヘッダがあった場合、想定した値かを検証
  if (req.headers['sec-fetch-site'] && req.headers['sec-fetch-site'] !== 'same-origin') {
    return res.send(400)
  }
  // 6. CSRF Token を検証 (略)
  // 7. Body の処理 (略)
})
```

逆に、静的サイトに埋め込んだ `<form>` など、 CSRF Token を導入するのが難しいサイトでも、サーバ側で前段にこうした処理を挟むことで、何もしないよりはよっぽど安全な実装になると考えられる。また、既に CSRF Token 対策しているサイトでも、 CSRF Token を共有ストレージにセッションに紐付けて保存している場合は、ストレージへの I/O を減らせる可能性があることや、なんらかの方法で攻撃に正しい CSRF Token が埋め込まれているようなケースへの対応も期待できる。ほとんど定型処理であるためミドルウェアなどで対応しやすいため、いずれフレームワークなどがこうした処理を隠蔽して自動で検証してくれるようになれば、意識することなく安全性が向上するかもしれない。


### Cookie

Cookie も Origin という概念が生まれる前から存在しているため、リクエストの送信先がどんな Origin であれ、そのサイトで付与された Cookie を保存していれば自動で付与される。これによって、例えば Facebook に Twitter のリンクが流れて来た場合、そのリンクをクリックすると Facebook から Twitter への Origin をまたいだリクエストであるにも関わらず Twitter の Cookie が付与され、 Twitter にログインした状態で画面を表示できるのだ。もし Cookie が同じ Origin にしか送られなかったら、 Web はとても不便になるだろう。

一方、先の Form を用いた CSRF は、リクエストが Origin をまたげること以外に、そのリクエストに Cookie が付与されることも、攻撃成立の要件としてある。つまり、 https://blog.example にログイン済みでなければ、そもそも投稿は成立しないのだ。

SameSite Cookie は、 Cookie が送信される先を制限する仕様だ。どちらかというと、 3rd Party Cookie によりトラッキング対策などがモチベーションとしては大きかったが、これを用いると CSRF の対策にもなる。


```http
Set-Cookie: session_id=deadbeef; SameSite=Lax
```

Cookie の詳細については別の章で解説するが、 `SameSite=Lax` な Cookie であれば、攻撃者の form からのリクエストにはそもそも Cookie が付与されないため、そもそもこれだけで大抵の CSRF を防ぐことができる。多くのブラウザが対応しており、全ての Cookie をデフォルトで Lax にするブラウザもある。もちろん、 Cookie の有無に限らず受け入れる form に対しては無力だが、そうした form に対する CSRF は、攻撃者にとって攻撃するメリットが無い場合が多い。

:::details CSRF Token と代替手段
Cookie を SameSite にし、 Origin/Referer/Fetch Metadata などのヘッダを検証すれば、もう殆どの CSRF は不可能ではないかと考えられる。しかし、これら全てのヘッダは、対応してないブラウザを考えると従来の通り CSRF Token を導入する必要が、少なくとももうしばらくはあるだろう。

また、 Origin/Referer/Fetch Metadata などのヘッダ値は予測可能なので、それを防御の根拠にすると、ブラウザに任意のヘッダを改ざんできる脆弱性があった場合に偽装ができてしまうという指摘が必ずある(それが CSRF Token を含める理由でもある)。しかし、これら全てのヘッダを任意の値に偽装しきれるような脆弱性が本当に発生したら、それは Web の根幹を揺るがすような大事件だ。そのような重要度の高い脆弱性が簡単に起きるとは考えにくく、もし発生してもブラウザ側で迅速に修正されリリースされることが期待できる。

通常はそうしたリスクを踏まえた上で、実装コストや利便性との天秤で技術を選択するため、ここまでに紹介したような仕様が普及すると、 CSRF Token を提供する必要も徐々に薄れるかもしれない。

一方、既に CSRF Token が枯れた技術となりつつあり実装コストが十分下がっている現在は、この方法に急いで乗り換える必要や、乗り換えた上で CSRF Token を捨てる必要などはない。どうしても CSRF Token の実装が難しい場面での導入や、多層防御としての利用が、現時点での推奨となるのではないだろうか。(あくまで筆者の見解)
:::


### --disable-web-security

実は SOP そのものをオフにするフラグがついているブラウザもある。 Chrome には `--disable-web-security` というフラグで、条件があるが SOP をオフにして好きな Origin に対していくらでもアクセスできるようになる。

といっても、おそらくこのフラグをわざわざ有効にしているユーザは、特殊な検証でもしている開発者くらいしかいないだろう。しかし、同等のオプションが付いている環境は他にも存在する。代表的な例が Electron や Cypress などといった Chromium ベースの環境だ。

Electron の [webSecurity](https://www.electronjs.org/docs/tutorial/security#5-do-not-disable-websecurity) や Cypress の [chromeWebSecurity](https://docs.cypress.io/guides/guides/web-security.html#Disabling-Web-Security) は `false` にすることで `--disable-web-security` と同等になる。 Cypress はテストフレームワークなので影響は限定的かもしれないが、 Electron 製のアプリは一般に配布される場合もあるだろう。

そこでこのオプションを使用することのリスクは本書で解説してきた通りだ。ここまで解説してきたようなユーザを守る機能が無いことは、その安全を **開発者が全て担保しないといけない** ことを意味する。その難易度は非常に高いため、 Electron のドキュメントでもオフにするのは非推奨になっている。

:::details Web とアプリの境目
Electron は Web アプリと同様に、ブラウザ環境で HTML, CSS, JS を用いる、俗に言う「Web の技術」を用いた開発が可能と謳われ人気を博した。しかし、この機能をオフにした瞬間「ただ HTML, CSS, JS を使ってネイティブアプリを作っているだけ」になったと捉えられるのではないだろうか?

Web でできることが増えネイティブアプリとの差が希薄になりつつある現在、「どうあれば Web で、どうあればアプリなのか?」という議論では、その根拠を「できること」の差にに求めがちだ。しかしプラットフォームとは、その「できることを正当化(安全に)するために定義される **できないこと**」によって特徴づけられていると考えることもできる。

今 Web はさらに様々なデバイスにアクセスするための API を議論しているが、そこでの議論の論点を「そのデバイスへのアクセスが Web に必要なのかどうか?」だと捉えている人も多いだろう。しかし実際の論点は「そのデバイスへのアクセスを正当(安全に)するために何が **できなければいいのか**」であり、そこで議論されているのが Permission だ。

執筆時点ではまだ議論中だが、もし Web における Permission モデルが固まれば、 Origin と同じようにユーザを守るための仕組みとなり、 Electron などがそれを迂回できるオプションを持つと、有効にした場合に一気に「ネイティブアプリ」のようになるのかもしれない。
:::
