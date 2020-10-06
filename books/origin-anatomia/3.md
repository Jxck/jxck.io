---
title: "CORS はなぜ安全に Origin をまたげるのか"
emoji: "📝"
type: "tech"
topics: ["cors", "origin", "web"]
published: false
---

# CORS はなぜ安全に Origin をまたげるのか

ここまでは、社内サイト(Intra)と攻撃者サイト(Attack)の 2 つで解説したため、ブラウザは単に異なる Origin へのリクエストをブロックしてもよかったかもしれない。しかし、異なる Origin へはリクエストを投げないと一律に決めてしまうと、許可されたサーバにならリクエストを投げても良い、という制限の緩和をする余地が無くなってしまう。

サーバが 「**他の Origin からアクセスしてきてもよい**」 と明示的に許可する方法を、どうすれば実現できるか見ていこう。


## 異なる Origin との連携

例えば、社内に `sns.example` という社内 SNS があり、そこに Intra から取得した社員情報が表示されるとする。ところが、`https://sns.example` と `https://intra.example` は Origin が異なるため、 SNS から Intra にリクエストしても SOP 違反で情報が取得できない。

Intra はその情報を SNS に提供したい、でも Attack からの取得は拒否したい。このような場面で、明示的に **アクセスしてもよい Origin を指定する** のが **CORS** という仕組みだ。


### Access-Control-Allow-Origin

異なる Origin にリクエストを送信するとき、ブラウザは必ず `Origin` ヘッダに現在の Origin を自動で付与する。 SNS から Intra へのリクエストの場合は、次のようになる。


```http
GET / HTTP/1.1
Host: intra.example
Origin: https://sns.example
```

Intra は Origin ヘッダを確認することで、どの Origin からのリクエストか把握することができ、その Origin からのアクセスを許可する場合は、レスポンスの `Access-Control-Allow-Origin` ヘッダに許可する Origin を付与して返す。


```http
HTTP/1.1 200 OK
Content-Length: 1024
Content-Type: text/html
Access-Control-Allow-Origin: https://sns.example

<!DOCTYPE html>
...
```

レスポンスを受信したブラウザは、 `Access-Control-Allow-Origin` ヘッダを確認し、ここに現在の Origin が許可されていれば、レスポンスを JS に渡す。


```js
// SNSからIntraの情報を取得する
// (Originが許可されているため成功)
const res = await fetch("https://intra.example")
const text = await res.text()
console.log(text) // 情報が取得できる
```

もし **異なる Origin へのリクエストは送信されない** という制約にしてしまうと、こうしたサーバによる明示的な許可を可能にする余地が無くなってしまう。かといって、どんなサーバからもレスポンスを取得できるとすると、前述のように Attack が攻撃し放題になる。そこで、ブラウザはどんな Origin へのリクエストでも全てサーバに送信し、サーバが返す `Access-Control-Allow-Origin` ヘッダをブラウザが見て、その Origin がレスポンスの取得を許可されているか判断する方式が採用されたのだ。

送られてくる Origin ヘッダを元に、サーバ側でレスポンスを返すかどうかを分岐すれば良いと思うかもしれないが、その場合もレスポンスに何かしら「このレスポンスは Origin ヘッダを考慮して返した」ということを伝える必要がある。なぜなら、 CORS が策定されるよりも前に作られたサーバは Origin ヘッダの存在など知らず、分岐など実装してないからだ。

仮に CORS に対応している事だけを伝えるフラグのようなヘッダを導入しても、全ての URL で Origin ヘッダでの分岐を実施してからでないと付与できず、そのやり方は実装負荷が高いこと、パフォーマンス劣化を招くこと、実装不備による漏洩が起きやすそうなことが想像できる。

新しく  `Access-Control-Allow-Origin` ヘッダを導入することは、 CORS に対応していることを明示し互換性を保つちつつ、単なるフラグのではなく許可する Origin を値にすることで、既存の URL にもヘッダを付与するだけで CORS 対応を実現できるのだ。

例えば Intra が CORS 策定よりも前に作られていた場合は、 Intra がヘッダを返すことはないため、 Attack が JS からのリクエストで情報を盗むことはできない。もし後から SNS に対してのみ CORS を許可したければ、 `Access-Control-Allow-Origin` に SNS を指定するように Intra を変更するだけで、引き続き Attack への漏洩は発生しない。

かつて、マッシュアップと呼ばれるような、サービス同士が連携するモデルが注目された時期に、既存のサーバ実装との互換性を保ちながらも、サービス側が許可した場合だけ異なる Origin と連携し、情報(リソース)を共有できるようにと考えられたのが CORS なのだ。


### 副作用のある処理

`Access-Control-Allow-Origin` ヘッダを確認するために、異なる Origin であれリクエストを送信しレスポンスを受け取っているということは、サーバ側でそのリクエストに対する処理が行われていることを意味する。ここまでの例は GET だったため、ページが取得されたり、 DB の検索が実行されたりといった処理が実行されるのみで、ブラウザ側で結果を取得できなければ、サービスとしては軽微な影響しかない場合が多い。しかし、 GET 以外のリクエスト、 POST/PUT/DELETE などサービス側に変更(副作用)が発生するリクエストの場合は問題がある。

例えば、社内 SNS 上に DELETE リクエストで投稿を削除できる API があり、 Attack がそこへの攻撃を試みているとする。


```js
// Attackからのリクエスト
// (CORS違反で失敗する)
const res = await fetch("https://sns.example/jxck/123456", {
  method: "delete"
})
```

これにより、次のような DELETE リクエストが発生したとする。


```http
DELETE /jxck/123456 HTTP/1.1
Host: sns.example
Origin: https://intra.example
```

もし SNS が CORS に対応しておらず、 `Origin` ヘッダを制限する実装になっていなかったら、このリクエストを受け入れ、削除を実行してしまうだろう。ただし、 CORS に対応していないためレスポンスに `Access-Control-Allow-Origin` ヘッダはない。


```http
HTTP/1.1 204 No Content
```

すると、ブラウザはレスポンスを確認して CORS 違反と判断しエラーにするが、サーバ側での削除処理はすでに成功している。

つまり、副作用のある操作は、 `Access-Control-Allow-Origin` ヘッダを確認したブラウザが JS に渡すかを判断するなどと悠長なことは言ってられず、リクエストそのものを止めなければならない。ここで、「CORS は GET しかできない」などと制限しても、開発者は GET で副作用のある処理を実装するだけで、本質的な解決にはならないだろう。不便なだけだ。

副作用のあるリクエストも許可したいが、先ほどのように CORS に未対応のサーバが処理をそのまま受け入れてしまっては困る。これを解決するために、副作用のあるリクエストを送信する前に、 **サービスが今から送ろうとしている CORS リクエストを許可しているのか** を確認する方式が提案された。それが **Preflight** だ。


## Preflight Request

Preflight は、その名のとおり **先立って送られる** リクエストのことを指す。サーバに事前確認を行うために、ブラウザによって自動で送られる。

この Preflight に POST/PUT/DELETE などの副作用があるメソッドを用いては堂々巡りだ。そこで、副作用が無く、かつ GET ではない、 OPTIONS リクエストを用る。 OPTIONS は、「サーバが持つリソースに対する、関連情報の取得を行うためのメソッド」であるため、この目的にぴったりと言える。

:::message
OPTIONS は Preflight 専用ではなく、使用可能な HTTP メソッドを問い合わせるといった他の目的にも使われるため、サーバに実装する際には Preflight だけを想定した実装にならないように注意。
:::


### OPTIONS メソッド

Intra から SNS の投稿を削除する場合、 Intra が DELETE を`fetch()`で送信しようとすると、ブラウザは先立って次のような OPTIONS メソッドのリクエストを送信する。


```http
OPTIONS /jxck/123456 HTTP/1.1
Host: sns.example
Access-Control-Request-Method: DELETE
Origin: https://intra.example
```

これが Preflight の実体だ。`Access-Control-Request-Method` ヘッダには、これから送信するメソッドが含まれる。これにより、ブラウザからサーバに対して、「Intra が `/jxck/123456` を DELETE するリクエストを CORS で送信しようとしているが、許可されているだろうか?」と問い合わせているのだ。


### Access-Control-Allow-Methods

SNS がこれを許可する場合、次のようにレスポンスを返す。


```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://intra.example
Access-Control-Allow-Methods: DELETE
```

これを受け取ったブラウザは、「このサーバは CORS に対応しており、この Origin からの DELETE を許可している」と判断し、実際の DELETE リクエストを送信する。これは、 Origin が含まれる以外は普通の DELETE リクエストだ。


```http
DELETE /jxck/123456 HTTP/1.1
Host: sns.example
Origin: https://intra.example
```

`Origin` ヘッダがあり CORS であるため、レスポンスには GET のときと同様に `Access-Control-Allow-Origin` ヘッダを付与する。


```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://intra.example
```

ブラウザは、これを確認して CORS の条件を満たしているとみなし、レスポンスを JS に渡す。

このようにすれば互換性を担保することが可能だ。例えば Intra が CORS 策定よりも前に作られていた場合、 Preflight に対して `Access-Control-Allow-Origin` ヘッダを返さないため、ブラウザは CORS が許可されてないと判断し、実際の DELETE リクエストを送らずエラーにする。これにより、意図しない副作用がサーバで発生するのを防ぐことができるのだ。


### Access-Control-Max-Age

しかし、副作用のある処理を行うために毎回 Preflight を送ると、 RTT (Round Trip Time) が一回増えるため、オーバーヘッドが大きすぎる。サーバとしても一度許可したリクエストとまったく同じリクエストが連続して送られてきた場合、先ほど許可した情報をしばらくはキャッシュして欲しいだろう。

そこで、サーバは Preflight のレスポンスに対して `Access-Control-Max-Age` ヘッダを指定することができる。このヘッダに秒数を指定すると、その期間内は同じレスポンスに含まれる `Access-Control-Allow-Methods` と `Access-Control-Allow-Headers` の情報をキャッシュ可能にし、 Preflight の省略を許可できるのだ。


```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://intra.example
Access-Control-Allow-Methods: DELETE
Access-Control-Max-Age: 600
```

:::message
Max-Age のデフォルト値は 5 秒であると[仕様](https://fetch.spec.whatwg.org/#http-access-control-max-age)で定義されているため、 `Access-Control-Max-Age` ヘッダを送信しなくても 5 秒間は Preflight が省略される。
:::


### Preflight の重要性

このように Preflight を導入することによって、 CORS 以前に実装されたサーバとの互換性を保ちつつ、副作用のある処理であっても異なる Origin と連携できるようになった。全てのサービスを CORS を前提とした実装に更新することはできないため、 Preflight なしで CORS を導入すれば、 Web はガタガタに壊れてしまう。かといって、 Origin をまたぐリクエストは一切できないとすれば、 Web の進化はそこで止まってしまっていただろう。

サービス開発者にとって Preflight の対応は面倒に感じるかもしれないが、 Web の互換性を保ちつつ前進させる重要な仕組みだと理解し、適切に対応する必要がある。また、 Preflight が理解できれば、 **副作用のある API を GET で提供するリスク** についてもおのずと理解できるだろう。


## ヘッダと資格情報

JS からの CORS リクエストを想定していないサーバとの互換性を保つため、レスポンスヘッダへのアクセスや Cookie の付与については、デフォルトで制限が課されている。

CORS に対応する場合、明示的なヘッダ設定を行うことで、これらの制限を緩和できる。


### Access-Control-Expose-Headers

CORS に対応した Intra に対して、 SNS からリクエストを送信し、次のようなレスポンスが得られたとする。


```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Connection: Keep-Alive
Date: Sun, 2 Feb 2020 02:02:02 GMT
Access-Control-Allow-Origin: https://sns.example
```

このヘッダ情報に JS からアクセスしてみよう。


```js
// SNSからのリクエスト
// (Originが許可されているため成功)
const res = await fetch("https://intra.example")
for (const header of res.headers) {
  console.log(header)
  // ["content-type", "text/html"]
}
```

実際よりも取得できるヘッダが少ないのがわかるだろう。実は、デフォルトでは全てのヘッダにアクセスできるわけではない。

HTTP ヘッダは様々な中継サーバによって追加されることがあり重要な情報を含むが、その中には JS から取得されることを想定していないものも多く、それが脆弱性の原因になる可能性がある。

そこで、 JS からアクセス可能なヘッダを限定する必要があが、その際、仕様を拒否リストで定義すると漏れる可能性があるため、安全である最小限のヘッダ(`Content-Language` など)を許可リスト([CORS-Safelisted Response Header](https://fetch.spec.whatwg.org/#cors-safelisted-response-header-name))で定義し、それ以外(`Cookie` など)は明示的な許可がないと取得できないよう制限することになった。

もし、許可リスト以外のヘッダを JS に提供したければ、サーバで `Access-Control-Expose-Headers` ヘッダを付与する。ここを`*`にすれば、全てのヘッダを提供することも可能だ。

ただし、認証情報を含む `Authorization` ヘッダだけは別だ。ここにアクセスできると Basic 認証のパスワードを取得できるため `*` には含まれず、もし提供してもよい場合は別途明示的に指定する必要がある。


```http
# 提供するヘッダ列挙
Access-Control-Expose-Headers: X-Author, Etag

# ワイルドカード
Access-Control-Expose-Headers: *

# Authorizationは別途明示
Access-Control-Expose-Headers: *, Authorization
```


### Access-Control-Allow-Credentials

ブラウザからのリクエストには Cookie が自動で付与される。この Cookie により、サーバはリクエストを送った相手が一定の資格を持つと判断するため、 Cookie は Credential(資格情報)とも呼ばれる。

しかし、 CORS の場合は Cookie が自動で付与されると問題になる場合がある。例えば Intra ではログイン済みの Cookie を持っているユーザにだけ重要な情報の閲覧を許可していたとしよう。そして他のサービスと連携するために、 `Access-Control-Allow-Origin` をうっかり `*` にするという雑な設定を行ったとする。この場合、 Intra にログイン済みのユーザを Attack に誘導することができれば、 Cookie で制限されていた情報の取得や、重要な操作が可能になる。 CORS をよく理解してない開発者が CORS 対応を実施した際に、こうした意図せぬ挙動を誘発してしまう可能性は少なくない。

そこで安全側に倒すため、 CORS リクエストには Cookie が自動では付与されないようになっている。


```js
// AttackからIntraへのリクエスト
// IntraのCookieを持っていても付与されない
fetch("https://intra.example")
```

もし Cookie の送信を許可する場合、まず `fetch()` に `credentials` オプションを指定し、明示的に Cookie を送信する必要がある。


```js
// AttackからIntraへのリクエスト
// Cookieが付与される
fetch("https://intra.example", {
  credentials: "include"
})
```

これに対してサーバは、 Cookie を含んだ CORS リクエストへのレスポンスに `Access-Control-Allow-Credentials: true` を付与し、 Cookie を必要とするレスポンスに対するアクセスを明示的に許可する。このヘッダが付与された場合、他の `Access-Control` 系ヘッダの値は `*` ではなく、全て明示的に値を列挙する必要がある。これも、雑に設定して意図しない挙動にならないよう、サービス提供者に設定を強制することで安全側に倒しているのだ。

SNS に対して Intra が Cookie を許可する場合、次のようになる。


```http
Access-Control-Allow-Origin: https://sns.example
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: X-Author, Etag
```

Preflight の場合も同じで、 `Access-Control-Allow-Methods` ヘッダは `*` が許可されない。

ブラウザは、これらのヘッダにより現在の Origin および Credentials が許可されている場合のみ、結果を JS に渡すのだ。


## Preflight Request が送信される条件

ここまでで、 Preflight が不要な GET と、 Preflight が必要な POST/PUT/DELETE の例を解説した。しかし、 **GET でも Preflight が必要な場合** があり、 **逆に POST でも Preflight が不要な場合** がある。

ではいったい、 Preflight が発生するかどうかは、何をもって決まるのだろうか?


### Simple Request とは何か

基本的には、仕様で定義された「許容できる HTTP メソッド」([CORS-Safelisted Method](https://fetch.spec.whatwg.org/#cors-safelisted-method))および「許容できる HTTP ヘッダ」([CORS-Safelisted Request Header](https://fetch.spec.whatwg.org/#cors-safelisted-request-header))を満たしている場合、 Preflight は発生しない。しかし、このリストを覚えるより、 Preflight が送られる理由を理解するほうが重要だ。

Preflight が不要なリクエストは、 Simple Request と呼ばれることがある。 Simple Request は、 CORS が Fetch の仕様から独立していた時代に使われていた用語だ。現在 CORS の仕様は Fetch にマージされ、仕様の中でこの用語は使われていない。ただ、仕様策定の場面では今でも登場することがあり、わかりやすい用語であるため解説に用いる。

まず、次のような POST リクエストが、 Simple Request なのか Preflight が必要なのかを考えてみよう。


```js
// IntraからSNSへのリクエスト
fetch("https://sns.example/jxck", {
  method: "post",
  headers: {
    "content-type": "application/x-www-form-urlencoded"
  },
  body: "message=hello"
})
```

このコードで生成されるリクエストは、おおよそ次のようになる。


```http
POST /jxck HTTP/1.1
Host: sns.example
Content-Length: 13
Content-Type: application/x-www-form-urlencoded
Origin: https://attack.example

message=hello
```

POST リクエストは副作用を起こすため、先ほど解説したのと同じ理由で Preflight を送ったほうがよいと思うかもしれない。しかし、実際にはこのリクエストでは Preflight は送信されない。なぜなら、 `fetch()` でエラーにしても、他の方法で JS から同じリクエストが送ることが可能だからだ。


### \<form\>を使ったリクエスト

例として、 Attack に次のような HTML があったとしよう。


```html
<form method="post" action="https://sns.example/jxck">
  <input type="text" name="message" value="hello">
  <button type="submit">submit</button>
</form>
```

このフォームを submit すると、次のようなリクエストが発行される。


```http
POST /jxck HTTP/1.1
Host: sns.example
Content-Length: 13
Content-Type: application/x-www-form-urlencoded

message=hello
```

`<form>` は CORS 以前から存在し、その `action` 属性には異なる Origin の URL が昔から指定できる。もちろん、このリクエストで Preflight は送信されない。つまり、「異なる Origin への Preflight のない POST リクエスト」は、 CORS 以前から可能だったのだ。他のサイトに `<form>` を設置し、別のサービスに対してリクエストを送る攻撃は CSRF と呼ばれ、 CORS の有無と関係なく対策が必要だ。

CORS 以前から可能だったことに対し、 CORS の場合だけ Preflight を送る制限を設けても意味がない。例えば `fetch()` に Preflight を付与して防いでも、次のように `<form>` を動的に生成し submit する JS を書けば迂回できてしまう。 **画面は遷移し結果を JS で受け取ることはできない** が、リクエストは成功し、サーバで副作用を発生させることは可能だ。


```js
document.body.innerHTML = `
<form id="form" method="post" action="https://sns.example/jxck">
  <input type="text" name="message" value="hello">
  <button type="submit">submit</button>
</form>`
document.querySelector("#form").submit()
```

したがって、ブラウザがすでにデフォルトで送信できるリクエストと同じであれば、同じものを `fetch()` から Preflight 無しで送ることができても問題ないことになる。この **ブラウザがデフォルトで送信できるリクエスト** が Simple Request だ。主だったところでは、次のようなものがる。

- `<a>`、`<img>`、`<script>`、`<link>`などから発生する GET
- `<form>`から発生する GET/POST

例えば次のような `fetch()` は Preflight が発生しない。


```js
// <a>と同じリクエスト
fetch("https://sns.example")

// <form method="post">と同じリクエスト
fetch("https://sns.example/jxck", {
  method: "post",
  headers: {
    "content-type": "application/x-www-form-urlencoded"
  },
  body: "message=hello"
})
```

ただし、 `<form>` では起こり得ないリクエスト、例えば `Content-Type: application/json` や独自ヘッダが付与されれば、 Simple Request ではなくなり Preflight が送信される。 DELETE や PUT をデフォルトで送信する要素もないため、これらも Simple Request ではなく、必ず Preflight が送られる。


```js
// <a>は独自ヘッダを付けられない
fetch("https://sns.example", {
  headers: {
    "x-my-header": "hello"
  }
})

// <form>はapplication/jsonを投げられない
fetch("https://sns.example/jxck", {
  method: "post",
  headers: {
    "content-type": "application/json"
  },
  body: `{"message": "hello"}`
})

// <form>はDELETEを投げられない
fetch("https://sns.example/jxck/post/1234", {
  method: "delete"
})
```

なお、 Simple Request でも CORS ではあるため、 `Origin` ヘッダは付与される。ブラウザはレスポンスの `Access-Control-Allow-Origin` ヘッダをチェックし、結果を JS に渡すかどうかを判断する点も変わらない。


## Fetch での定義

元々ブラウザは、リンクやフォームを操作してページを遷移するか、画像や JS などを読み込む、 iframe を埋め込むといった、前述した言葉で言えば Simple リクエストによる取得(fetching)だけを考えていれば仕様も間に合った。

しかし、 Ajax が発見されて以降、 XHR による動的なリクエストを JS から行うようになってから、 SOP や CORS と言ったブラウザからの何かの取得(fetch)関して、仕様上考えることが増えるようになった。

最初は CORS という、 Origin をまたぐために必要な仕様を策定していたが、 CORS ではない処理でも考えることは多くある。そこで WHATWG では、どういう場合に Cookie が付与されるのか、どういう場合に Cache がヒットするのか、いつ Preflight が必要なのかといった「**ブラウザから何かを取得する(fetcing)とはどういう処理か**」という要件を整理し、それをまとめた **Fetch** という仕様を作った。

- https://fetch.spec.whatwg.org/

この Fetch の仕様をベースにすると、 `<a>` や `<form>` や `<iframe>` から発生するリクエストの挙動も説明でき、 XHR で CORS リクエストを行う挙動も説明ができる(実際今の XHR の仕様は Fetch の仕様をベースに書かれている)。

そして、その **Fetch でまとめた fetching という挙動を API として定義したのが `fetch()` だ**。したがって `fetch()` は単に XHR を簡単にしたというわけではなく、ブラウザが持つ「リソースの取得(Fetching)」に関するオプションを細かくコントロールでき、 XHR を含めブラウザから発生し得るあらゆるリクエストで、 JS から扱えるものは全て再現できる。

- https://fetch.spec.whatwg.org/#fetch-api

この仕様に沿って、本節で解説した内容を仕様に沿って確認してみよう。


### リクエストの種類 (Mode)

Fetch の仕様では、ブラウザから発生する Fetch には大別して [5 つの Mode](https://fetch.spec.whatwg.org/#concept-request-mode) があると定義されている。

- navigate
- same-origin
- no-cors
- cors
- websocket

例えば、同じ Origin への `<img>` の取得は通常 `same-origin` で、別 Origin の場合は `no-cors` (Simple Request) ということになる。

この中で navigate と websocket を除いた 3 つは `fetch()` の引数に指定できる。これは URL と別に指定できるため、例えば以下のようなことができる。


```js
// 同じ Origin に対しての CORS リクエスト
fetch('/', {mode: 'cors'})

// 別の Origin に対して CROS ではないリクエスト
fetch('https://example.com', {mode: 'no-cors'})
```

この語彙を用いて、別の仕様の中でも「この場合は `no-cors` なリクエストを送る」などというように定義の中で使われている。この書籍でも以降はこの語彙を使っていく。

「同じ Origin に cors なリクエストを投げることがあるのか?」や「JS から別の Origin への no-cors ができて何が嬉しいのか」などといったユースケースは、以降の節で解説する。


### Credentials

Cookie が Credential と呼ばれることは解説したが、 Credentials は Cookie だけではない。 Fetch の仕様で [Credentials](https://fetch.spec.whatwg.org/#credentials) は、仕様には以下のように定義されている。

- HTTP cookies
- TLS client certificates
- authentication entries (for HTTP authentication)

Cookie 以外にも、クライアントへの TLS 証明書の要求や、 Basic 認証などによる認証もこの Credentials に含まれる。 Fetch に Credentials を含むかは [Credentials Mode](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) として以下の様に定義されている。

- omit
- same-origin
- include

前述した以下がまさしく "include" を指定した例であり、デフォルトが omit なので明示的に指定する必要があったのだ。


```js
// AttackからIntraへのリクエスト
// Cookieが付与される
fetch("https://intra.example", {
  credentials: "include"
})
```
