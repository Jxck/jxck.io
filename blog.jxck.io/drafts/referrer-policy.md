# Referrer-Policy の制限を強めると安全になるという誤解

## Intro

`Referrer-Policy` は、送信される `Referer` の値を制御することが可能だ。

このヘッダの副次的な効果がよくわかってないと、「`no-referer` にして送らないのが最も安全だ」という勘違いを産むことになる。


## Referer とアナリティクス

Referer は、リクエストに対してその前のページの URL を送るところかた始まった。

```http
GET / HTTP/1.1
Host: example.com
Content-Type: text/html
Referer: https://blog.jxck.io/entries/2099-12-12/referer.html
```

この情報によって、 example.com はユーザが blog.jxck.o の記事から遷移してきたことがわかる。

これが検索エンジンの URL であれば、検索からの流入であることがわかり、 SNS であれば拡散されたポストからであることがわかる。

従って、多くの場合はマーケティングてきな用途が想像されやすく、実際アナリティクスなどはこの情報を重要視している。

## Referer による情報漏洩

例えば、ユーザが VPN などでアクセスする社内のポータルに貼られた URL から遷移した場合、以下のように外部からアクセスできない URL が付与されることになる。

```http
GET / HTTP/1.1
Host: example.com
Content-Type: text/html
Referer: https://wiki.company.example/secret/new-product.html
```

URL は雄弁であるため、そこから読み取れる情報は決して少なく無い。特に新製品の名前がパスに使われれば、未公開の情報が取得できるかもしれない。

もし Issue トラッカーが、タイトルの内容をそのまま URL に入れるタイプのものであれば、まるっと脆弱性情報が漏洩する可能性もある。

```
GET / HTTP/1.1
Host: blog.jxck.io
Content-Type: text/html
Referer: https://issues.company.example/bugs/csrf-reported-on-admin-page.html
```

これは、どんなにそのサイトを VPN や認証などで隠しても、閲覧社のブラウザを経由して送られるため、意図しない漏洩に繋がる可能性もあるのだ。


## Referrer-Policy

これを制御するために Referrer-Policy が整備された。

このポリシーは基本的に送信する条件と、その粒度を制御できる。基本的には 3 つの観点がある。

- 送る情報は Full Path か Origin のみか
  - Full Path: `https://example.com/path/to/html`
  - Origin: `https://example.com`
- 別 Origin に送るのか
- HTTP (平文通信)で送るのか

さて、前述のようなリスクを考えると、多くの人はこう考えるだろう。

> Referrer は一切送らないのがセキュリティ上のプラクティスだ。つまり必ず `no-referrer` を設定すべきだ。

いわゆるセキュリティ専門家のような人も、それを推奨している場合がある。

**それは勘違いだ。**


## Referrer と Origin

前回の記事で、リクエストに Origin ヘッダが付与されるようになったことの、セキュリティ対策への効能について解説した。

- 令和時代の API 実装のベースプラクティスと CSRF 対策 | blog.jxck.io
  - https://blog.jxck.io/entries/2024-04-26/csrf.html

これまで「どこからリクエストされたものかわからない」ことが原因で発生していた CSRF のような攻撃は、 Origin ヘッダが付与されることで根本的に対策することが可能になった。逆を言えば、「*そのために人類は Origin ヘッダというリクエストの出自を知る解決策を手に入れた*」という話だった。

ところが、リクエストの出自を知る方法は、 Origin 以前からあった。それが Referer だ。

では、なぜ Referer をそのまま活用しないのかというと、「Referer はプライバシーの侵害につながるのでブラウザの設定で無効にする」というプラクティスが、特にハイリテラシー層に十分に浸透していたからだ。ブラウザもその機能をプライバシー重視であることのコマーシャルと共に提供し、無いブラウザでも探せばだいたいは拡張が手に入る状況だ。

その状況で、 Referer に依存してリクエストのフィルタリングを行うことはできない。そこで、 CORS の策定時に「最低限の出自情報」として Origin ヘッダが定義された。 Origin には Path 情報がないため、最小限の情報のみが提供される。そして CORS で連携するというのは、 `Access-Control-Allow-Oring` でその Origin との連携を明示的に許可することで実現するものであり、連携情報としての Origin 提供は漏洩とは見做されない(それも許せないなら、連携は使わないべき)という仕組みになっている。 Referer を落としているユーザであっても、新設された Origin は正しく送られていると想定すべきであり、それが送られてないのであれば、安全な連携は提供できないとして扱うべきなのだ。

その Origin ヘッダを、 Form の POST でも提供するようにし、「POST はどこから来たのか？」を確認することで「意図した連携」なのか「意図しない連携(これが CSRF の実態」なのかを識別できるように、やっと仕様を整備し互換性を担保して今にいたるのだ。つまり、現行の Web のルール上「Origin を確認しないということは、セキュアな実装ができてない」とみなして良く、このインフラとしての Origin ヘッダは慎重に扱われるべきものなのだ。

## Referrer-Policy: no-referrer

`Referer-Policy: no-referrer` は、それを付与することでブラウザが一切の Referer を送らなくなる。つまり、遷移先に対して遷移元の URL がなんであったかは、全て送られなくなるのだ。

このディレクティブは強力で、副作用がある。 Referer ヘッダを送らなくなるだけではなく、 Origin ヘッダも `null` にしてしまうのだ。

```
3. Otherwise, if request’s method is neither `GET` nor `HEAD`, then:
  1. If request’s mode is not "cors", then switch on request’s referrer policy:
    - "no-referrer": Set serializedOrigin to `null`.
    - "no-referrer-when-downgrade"
    - "strict-origin"
    - "strict-origin-when-cross-origin": If request’s origin is a tuple origin, its scheme is "https", and request’s current URL’s scheme is not "https", then set serializedOrigin to `null`.
    - "same-origin": If request’s origin is not same origin with request’s current URL’s origin, then set serializedOrigin to `null`.
    - Otherwise: Do nothing.

--- https://fetch.spec.whatwg.org/#append-a-request-origin-header
```


これはつまり、自分のサイト内に設置した form からのリクエストにも、

Referrer は 1 つ前のページ、つまり「リクエストの出自」を表現している。

「リクエストの出自」


















`Referrer-Policy` には複数のディレクティブがある。

- no-referrer
- no-referrer-when-downgrade
- origin
- origin-when-cross-origin
- same-origin
- strict-origin
- strict-origin-when-cross-origin
- unsafe-url

しかし全部を覚える必要はない。

- no-referrer
  - 常に送らない
- no-referrer-when-downgrade
  - 常に path を送る
  - downgrade では送らない
- strict-origin-when-cross-origin
  - same origin の時は path
  - cross origin の時は　origin
  - downgrade では送らない
- same-origin
  - same origin の時だけ path


ポリシーの観点は以下だ。

- Same Origin なら Path が送られても問題はない
- 平文通信では送るべきではない

この上で Cross Origin への送信をどうするかを考えることになる。

