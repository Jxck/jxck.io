---
title: "Same Origin Policy を迂回する危険なハック"
emoji: "📝"
type: "tech"
topics: ["jsonp", "origin", "web"]
published: false
---

# SOP を迂回する危険なハック

Ajax の発見により XHR の利用が増えて以降、 CORS が定義されるまでの間は SOP のみが適用され、「Origin をまたぐリクエストはできない」という単純なルールだけがあった。複数のサービスを連携させるにはブラウザではなくサーバサイドでデータを取得し連携する必要があったが、「なんとかして SOP を迂回してクライアントで完結できないか?」という要求も絶えず、その結果 CORS が策定され普及される前に生み出された **SOP を迂回するハック** がいくつか存在する。本節では、代表的なハックとその危険性を解説する。

先に言っておくと、 **SOP を迂回するハックはなんであれ推奨されない** ため、 CORS を正しく用いた安全で正しい設計を心がけるべきである。


## JSONP による迂回

`<script>` タグは JS を取得するために GET を発生するが、異なる Origin を記述しても CORS の対象にはならない。これを利用して SOP を迂回する方法が JSONP だ。実際に JSONP を用いて、 CORS を使わずに Intra の情報を SNS で取得してみよう。


### \<scirpt\>によるデータ連携

まず、 SNS に次のような HTML を設置する。


```html
<!-- SNS 上で Intra の JS を読み込む -->
<script src="https://intra.example/script.js"></script>
```

この `<script>` から発生するリクエストは次のようになり、 Preflight はもちろん Origin ヘッダも付与されない。


```http
GET /script.js HTTP/1.1
Host: intra.example
```

レスポンスにも、 `Access-Control-Allow-Origin` ヘッダは必要ない。


```http
HTTP/1.1 200 OK
Content-Type: application/javascript

console.log("hello")
```

Intra から返った JS は普通に実行される。これを応用すると、次のようなことができる。

SNS が Intra の情報を取得したいと思った場合、 Intra はその情報を次のような JS で提供する。


```js
// data.js
const data = {
  username: "Jxck",
  email: "jxck@mail.example"
}
```

SNS は、これを次のように利用する。


```html
<script src="https://intra.example/data.js"></script>
<script>
  console.log(data) // 表示可能
</script>
```

するとブラウザ上では 2 つの JS は同じスコープで評価され、取得したデータが表示できる。


```js
// 2つのJSは結合したように実行される

// https://sns.example/data.js
const data = {
  username: "Jxck",
  email: "jxck@mail.example"
}

// https://intra.example/app.js
console.log(data) // 表示可能
```

これによって、 SNS の JS は別 Origin である Intra が提供するデータを取得できた。


### Callback 関数の指定

しかし、このままでは、検索クエリが決まってから動的に読み込むといったことができない。そこで、変数名を共有するのではなく、コールバック関数名を共有するようにする。

例として、コールバック関数を `callback` という名前にしたら、 Intra はデータを `callback` という関数の引数として渡すように囲んだ `data.js` を提供する。


```js
callback({
  username: "Jxck",
  email: "jxck@mail.example"
})
```

SNS では、データを受け取る `callback()` 関数を定義し、この `<script>` タグを動的に生成し追加すれば、任意のタイミングで任意のデータを任意の Origin から取得できるのだ。


```html
<script>
  function callback(data) {
    // データがこの関数に渡ってくる
    console.log(data)
  }
</script>

<script src="https://intra.example/data.js"></script>
<!-- これが関数を実行する -->
```

もし複数回呼び出す場合、コールバック関数名が決め打ちだと困るため、コールバック関数名は呼び出し側がクエリパラメータで指定できる API が多い。


```html
<script>
  // コールバック関数を fn としたい場合
  function fn(data) {
    // データがこの関数に渡ってくる
    console.log(data)
  }
</script>

<!-- クエリパラメータにコールバック関数名を fn として指定する -->
<script src="https://intra.example/data.js?callback=fn"></script>
<!-- これが関数を実行する -->
```

この場合サーバからは以下のような JS が返る。


```js
fn({
  username: "Jxck",
  email: "jxck@mail.example"
})
```

このように、取得したいデータを関数実行で囲んで(Padding)、 JS として返すことで Origin をまたいだデータのやりとりを CORS なしで行う手法が JSONP(JSON Padding)だ。 JSONP は実装が手軽だったため、 CORS が普及する以前に広まった。

しかし、任意の Origin から取得できるということは、攻撃サイトからも同じ方法で情報が取得できることを意味する。 Cookie で制限しているつもりでも、リクエストには Cookie が自動で付与され、防御にはならない。実際に、サービス内で個人情報を JSONP で取得していた大手 Web メールサービスで、その情報が抜き取られる脆弱性が報告されたこともある。

Origin をまたいだデータを提供する場合は、 `Origin` ヘッダをもとに `Access-Control-Allow-Origin` ヘッダを正しく返すことで取得元を制限するように、 CORS をきちんと設定して使うべきだ。

主要なブラウザが CORS に対応している今、 JSONP は基本的に採用するべきものではない。


## document.domain による迂回

SOP の実体は、 **ある Origin のコンテンツからは、同じ(Same)Origin のコンテンツにしかアクセスできない** という制限のことだった。これは `fetch()` のようなネットワークアクセスだけではなく、 `<iframe>` などでも同じように適用される。


### document.domain の書換え

例えば index.html が同じ Origin の child.html を `<iframe>` で埋め込んでいる場合、 index.html 側の JS は child.html の DOM にアクセスすることができる。


```html
<title>index.html</title>
<iframe src=child.html></iframe>

<script>
  // child の DOM にアクセスできる
  const child_frame = window.frames[0]
  console.log(child_frame.document.title)
</script>
```

Origin が異なれば Same Origin Policy が適用されアクセスできないため Attack が Intra を `<iframe>` に埋め込んでも、 Intra の DOM を取得し情報を盗み出すことはできない。

しかし、ここには一つ例外が存在する点に注意が必要だ。


### document.domain を用いた CORS の迂回

例えば `a.intra.example` に `b.intra.example` を `<iframe>` で埋め込んだ場合、 Origin が違うので `<iframe>` 間の DOM の参照はできない。ところが、両方のページで、共通する親ドメインの `intra.example` に `document.domain` を変えると、両者は同じ Origin とみなされ、双方にアクセスすることが可能だ。


```html
<title>b.intra.example</title>
<script>
  document.domain = "intra.example"
</script>
```


```html
<title>a.intra.example</title>
<iframe src=https://b.intra.example></iframe>

<script>
  document.domain = "intra.example"

  // child の DOM にアクセスできる
  const child_frame = window.frames[0]
  console.log(child_frame.document.title)
</script>
```

これは古くから、 SOP を迂回する手段の一つとして使われてきた。そのため、ブラウザにおいては Origin を考えるときに、 `document.domain` の存在を無視できない。

その結果、 Origin の定義は、主にプロトコルを策定している IETF と、ブラウザ API を策定している WHATWG それぞれにドキュメントがあり、双方で異なる。

- [RFC 6454 The Web Origin Concept](https://tools.ietf.org/html/rfc6454#section-4)
- [HTML Standard](https://html.spec.whatwg.org/multipage/origin.html)

RFC 6454 での Origin の定義は本稿前半で解説したように Scheme 、 Host 、 Port の 3 つだが、 WHATWG では 4 つ目として Domain という要素が追加されている。 Domain は、 `document.domain` が Origin に与える影響を明確にするために追加されたものだ。


### document.domain の危険性

`document.domain` を変えることで SOP を迂回する実装は、 XSS などの脆弱性があったときに問題になり得る。例えば、 SNS が社員ごとにサブドメインを分ける作りになっていたとする。

- alice.sns.example
- eve.sns.example

もし、 SNS に XSS の脆弱性があり、両方の `document.domain` を `sns.example` にできてしまうと、例えば Eve は Alice の情報を `<iframe>` 経由で読める可能性がある。

こうした問題から、 この[仕様](https://html.spec.whatwg.org/multipage/origin.html#relaxing-the-same-origin-restriction)は **削除され非推奨** とされており、もし既存のコード内で発見した場合は、すぐに修正を行うべきである。代替手段として `<iframe>` 間のコミュニケーションには、 `postMessage()` を用いた方法が標準化されており、これは受信側が明示的にハンドラを実装していない限り余計な情報を漏洩する心配がないため、安全に使用することができる。

しかし、すでに `document.domain` を使用したサービスが存在する以上、ブラウザの実装がすぐに消えるわけではなく、削除に向けた作業は時間を要するだろう。その間に、 `document.domain` を使用した攻撃に対する事前の対策としては、 HTTP の `Permission-Policy` (旧 `Feature-Policy`) ヘッダを用いて `document.domain` の書き換えを制限する[仕様の提案](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy/document-domain) がされている。


```http
Permission-Policy: document-domain <allowlist>;
```

また後述する `Cross-Origin-Embedder-Policy` や `Origin-Isolation` ヘッダもこの機能を無効にすることができるようになる予定だ。いずれのヘッダも、全てのブラウザで実装されているわけではないため、可能であればサイト自体が埋め込まれることを `X-Frame-Option` ヘッダを用いて制限するといった方法も、対策としては有効だろう。

:::details [コラム] Same Origin Policy を迂回するバグの重大さ
ここまで Same Origin Policy の重要性と、それを迂回するハックの危険性を解説した。つまり、 Origin とはユーザを保護するために本当に重要な仕組みであり、あらゆる場面でこの仕組が遵守されている必要があるのだ。

もし仮に、ブラウザの実装において、この Same Origin Policy を迂回して別オリジンの情報を盗み出すことができるようなバグがあれば、それは Web の安全の前提が脅かされることを意味する。報奨金制度を実施しているブラウザも、「Same Origin Policy を迂回できるバグ」の報告に対しては、高額な報奨金を設定している場合が多い。

このことからも、 Origin というものの重要性が感じ取れるだろう。
:::
