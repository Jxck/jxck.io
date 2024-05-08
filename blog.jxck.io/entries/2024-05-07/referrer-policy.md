# [referer][security] Referrer-Policy の制限を強めると安全になるという誤解

## Intro

`Referrer-Policy` は、送信される `Referer` の値を制御することが可能だ。

このヘッダの副次的な効果をよく理解していないと、「`no-referrer` にして送らないのが最も安全だ」という誤解を生むことになる。

では、複数あるポリシーの中でどのような観点で、どのディレクティブを採用するのが良いのだろうか?

前提として前回の記事の「*リクエストの出自をチェックすることは現代の実装のベースプラクティスである*」という点を踏まえて考えてみる。

- 令和時代の API 実装のベースプラクティスと CSRF 対策 | blog.jxck.io
  - https://blog.jxck.io/entries/2024-04-26/csrf.html


## Referer とアナリティクス

Referer は、リクエストに対してその前のページの URL を送るところから始まった。

```http
GET / HTTP/1.1
Host: example.com
Content-Type: text/html
Referer: https://blog.example/entries/2099-12-12/referer.html
```

この情報によって、 example.com はユーザが blog.example の記事から遷移してきたことがわかる。

これが検索エンジンの URL であれば、検索からの流入であることがわかり、 SNS であれば拡散されたポストからであることもわかる。

従って、多くの場合 Referer はマーケティング用途が想像されやすく、実際アナリティクスなどはこの情報を重要視している。


## Referer による情報漏洩

例えば、ユーザが VPN などでアクセスする社内サイトから遷移した場合も、ブラウザは自分が VPN 以下にいることなど知らないため、 Referer に社内サイトの URL が付与されることになる。

```http
GET / HTTP/1.1
Host: example.com
Content-Type: text/html
Referer: https://wiki.company.example/secret/new-product.html
```

URL は雄弁であるため、そこから読み取れる情報は決して少なくない。特に新製品の名前がパスやサブドメインに使われれば、未公開の情報が推測できるかもしれない。

もし社内の Issue Tracker が、タイトルの内容をそのまま URL に入れるタイプのものであれば、まるっと脆弱性情報が漏洩する可能性もある。

```
GET / HTTP/1.1
Host: blog.jxck.io
Content-Type: text/html
Referer: https://issues.company.example/bugs/csrf-reported-on-admin-page.html
```

社外からの接続をきっちりブロックしていても、 Referer は社員のブラウザを経由して送られていくため、意図しない漏洩に繋がる可能性があるのだ。

また、「URL を知っている人のみ見られる」系のアクセス制御も、その URL のフルパスが Referer で飛んでしまうと、意図した制御として使えないことにもなる。


## Referer によるプライバシーのリスク

例えば、 EC サイトに書かれたレビューのリンクから、ログイン済みの SNS に遷移したとしよう。

```
GET / HTTP/1.1
Host: sns.example
Content-Type: text/html
Referer: https://ec.example/product/0230596283
Cookie: ${login-cookie}
```

この場合、 SNS サイトはユーザの情報を持っているため、追加でユーザが何に興味を持っているのかを知ることができる。

この構造は、送信元/送信先サイトの組み合わせによってリスクが多様化する。趣味趣向、政治宗教感、疾病障害などのセンシティブな情報の漏洩リスクもゼロではない。

このため、個人のレベルでも Referer を送らないような設定を行うユーザもおり、特にブラウザに Private Mode が搭載されるようになる前は、プライバシーリテラシーが高いユーザは拡張などで Referer を落としていた。


## Referrer-Policy

デフォルトであった Referer の送信を制御するために、 Referrer-Policy が整備された。

ポリシーの観点は「送信対象」と「情報の粒度」だ。基本的には 3 つの観点がある。

- 送る情報は Full Path か Origin か
- 別 Origin に送るか
- HTTP (平文通信)に送るか

さて、前述のようなリスクを考えると、多くの人はこう考えるだろう。

> Referer は一切送らないのがセキュリティ上のプラクティスだ。つまり必ず `no-referrer` を設定すべきだ。

いわゆるセキュリティ専門家のような人も、それを推奨している場合がある。

では本当にそうだろうか?


## no-referrer の副作用

`Referrer-Policy: no-referrer` は、それを付与することでブラウザが一切の Referer を送らなくなる。つまり、遷移先に対して遷移元の URL が何であったかは、全て送られなくなるのだ。それが Same Origin、つまり今アクセスしているサイトであってもだ。

従って、社内システムなどにはこれを付与し、 URL の情報が外に漏れないように設定している人もいるだろう。

しかし、このディレクティブには副作用がある。

```
To append a request `Origin` header, given a request request, run these steps:

1. Let serializedOrigin be the result of byte-serializing a request origin with request.
2. If request's response tainting is "cors" or request's mode is "websocket", then append (`Origin`, serializedOrigin) to request's header list.
3. Otherwise, if request's method is neither `GET` nor `HEAD`, then:
  1. If request's mode is not "cors", then switch on request's Referer policy:
    - "no-referrer": Set serializedOrigin to `null`.
    - "no-referrer-when-downgrade"
    - "strict-origin"
    - "strict-origin-when-cross-origin": If request's origin is a tuple origin, its scheme is "https", and request's current URL's scheme is not "https", then set serializedOrigin to `null`.
    - "same-origin": If request's origin is not same origin with request's current URL's origin, then set serializedOrigin to `null`.
    - Otherwise: Do nothing.

Note: A request's Referer policy is taken into account for all fetches where the fetcher did not explicitly opt into sharing their origin with the server, e.g., via using the CORS protocol.

--- https://fetch.spec.whatwg.org/#append-a-request-origin-header
```

つまり、 CORS のように明示的に Origin を確認させる場合はそちらを優先するが、「CORS ではない」かつ「GET/HEAD でない」場合は、 `Referrer-Policy: no-referrer` を受けていた場合、 `Origin: null` になってしまう。これは、 「Referer を送らない」と設定しているのに、同等の情報が Origin ヘッダで送られては意味がないからだ。

これは、いわゆる別サイトに出ていくリクエストだけでなく、同じサイト内でも送られなくなるため、 form の POST ようなケースで Origin ヘッダが `null` になってしまい、同じサイトからのリクエストなのにその事実をサービスが確認できなくなるのだ。

```http
POST /post HTTP/1.1
Host: example.com
Origin: null
Content-Type: application/x-www-form-urlencoded
# Referer 無し

body=こんにちはこんにちは
```

近年は `fetch()` でのリクエストが一般的で、それ以外のリクエストは減ってきてはいる。であれば、 `Origin: null` も含めて全部落としてしまえばどちらにせよ安全である、と思うかもしれない。

一方で、 Progressive Enhancement として生の form によるリクエスト「も」使えるようにする場合もある。そうでなくても、例えばレガシーなアプリを Origin を検査する簡単なミドルウェアや WAF/CDN 相当のレイヤ追加だけで格段に安全にできるはずのものを、「Referer は送らない方が安全」によって毀損する結果になるのだ。


## RFC 7231 における Referer の扱い

そもそも、「*送らない方が安全*」というのは「*どこに対して*」だろうか?

HTTP/1.1 の RFC が更新された際に、 Referer の節には以下のような注意書きが追加された。

> Some intermediaries have been known to indiscriminately remove Referer header fields from outgoing requests.
> This has the unfortunate side effect of interfering with protection against CSRF attacks, which can be far more harmful to their users.
> Intermediaries and user agent extensions that wish to limit information disclosure in Referer ought to restrict their changes to specific edits,
> such as replacing internal domain names with pseudonyms or truncating the query and/or path components.
> An intermediary SHOULD NOT modify or delete the Referer header field when the field value shares the same scheme and host as the request target.
>
> 一部の中継者は、外向けのリクエストから Referer ヘッダを無差別に除去することが知られている。
> これは CSRF 攻撃に対する保護に干渉するような望ましくない副作用を及ぼし、それは、ユーザにとってはるかに有害となる。
> Referer 内への情報開示を制限したい中継者/UA 拡張はそれらの変更を、内部ドメイン名を匿名化したり、 query や path を切り落とすなどの、特定の編集に制約するべきである。
> 中継者は、ヘッダがリクエストターゲットと同じ scheme / host であれば、 Referer ヘッダを改変したり削除するべきでない。
>
> --- https://www.rfc-editor.org/rfc/rfc7231.html#section-5.5.2

なんでもかんでも「消せばいい」とは限らないということが、この文章からもわかるだろう。

近年は HTTPS が普及したため、 Proxy がヘッダを落とすということは構成的にレアになった。従って消すとすればクライアントの設定や拡張、サービスごとの `Referrer-Policy` のデプロイくらいしかない。この記述を無視した拡張やサービスを実装することは、自身が「行儀の良い実装」から逸脱していることを意味すると言っても良いだろう。

補足しておくと、本エントリは「CSRF 対策のために Referer を受け取り確認すべきだ」と言っているわけではない。前述の通り、既に Referer を送らないクライアントは多いため、受信側がセキュリティ対策のために依存するうえで的確なヘッダとは言えないからだ。

しかし、特に最後の一行にあるように、 Same Origin でのリクエストであれば、サーバは Referer が無くてもユーザがどのページからどのページに遷移しているかを知るのは容易だ。つまり、わざわざ Referer を落とすことのメリットはない。外部に送るリスクはわかるが、同一サイトで送ることにリスクを感じるのは、見積もり方として間違っていると言える。

従って、 `no-referrer` にすることで `Referer` ヘッダを Same Origin にすら送らず、あまつさえ、セキュリティ対策のために Web プラットフォームがが時間をかけて手に入れた `Origin` ヘッダを `null` にしてしまい、「リクエストの出自が検証できなくなる == 外からの工作されたリクエストではないと検査できない」という状態になるのは、セキュリティの面から見ると必ずしもプラスとは言えないのだ。

では、 `Referer-Policy` は何を選べばいいのだろうか?


## Referrer-Policy 値の選定

以上を踏まえて `Referrer-Policy` のディレクティブを確認してみよう。

- no-referrer
- no-referrer-when-downgrade
- origin
- origin-when-cross-origin
- same-origin
- strict-origin
- strict-origin-when-cross-origin
- unsafe-url

全部を覚える必要はない。

重要なのは以下の 3 つの観点だ。

- 送るのは Full Path か Origin か
- 送る対象は Same Origin か Cross Origin か
- 平文 HTTP でも送るか

ここまでの話を適用すると、以下が前提となる。

- Same Origin なら Path が送られても問題はない
- 平文 HTTP では送るべきではない

その上で 「*Cross Origin への送信*」をどうするかだけを比較すると、候補は以下に絞られる。

- no-referrer
  - 常に送らない
  - Origin ヘッダも `null` にする
- no-referrer-when-downgrade
  - 常に Path を送る
  - downgrade では送らない
- strict-origin-when-cross-origin
  - Same Origin の時は Path
  - Cross Origin の時は Origin
  - downgrade では送らない
- same-origin
  - Same Origin の時だけ Path

従来、ブラウザのデフォルトは `no-referrer-when-downgrade` だった。しかし、 Cross Origin にも Full Path を送るのはエントロピーが高くトラッキングベクタにもなり得る。一方で、完全に送らなければ、出自チェックに使えなくなる。そこで、従来の Web における「外部への情報提供」と「自サイト内での出自検証」を両立しつつ、前者には Origin だけ、後者には Full Path を送るという最もバランスが取れた設定として、 `strict-origin-when-cross-origin` を新しくブラウザのデフォルトにする流れがあった。 2018 年ごろからはじまり、 2020 年ごろにはだいたいデフォルトの移行が終わっている。

- A new default Referrer-Policy for Chrome - strict-origin-when-cross-origin  |  Blog  |  Chrome for Developers
  - https://developer.chrome.com/blog/referrer-policy-new-chrome-default

したがって、多くのサイトにとっては、このデフォルトの値が十分にバランスが取れ、互換性の面でも問題を起こしにくい値となっていることがわかる。

その上で、もし「Origin であっても外部に漏洩させたくない」という、企業内サイトなどであれば、選択すべきは `no-referrer` ではなく `same-origin` と考えるべきだろう。これであれば、外に情報は出ず、内部でのリクエストはきっちりと出自の確認ができる。 Origin も `null` にはならない。

まとめると、 2 択だ。

1. 外部に Origin が送られるのは許容するなら `strict-origin-when-cross-origin`
2. 外部に Origin が送られるのも許容できないなら `same-origin`

他のディレクティブは互換性などのために仕様に起こされているだけで、「Referer が Path ごと送られることに依存し、それをチェックする実装」でも残ってない限り、特に明示する理由はないだろう。

また、 1 はモダンブラウザでならデフォルトだ。 Private Gist や Google Docs など「URL を知っている人のみアクセス可能」のアクセス制御も、多くは `strict-origin-when-cross-origin` を使っている。

デフォルトではないブラウザが意識されるケースのために、明示するプラクティスもまだ残っているが、 IE はどちらにせよ `Referer-Policy` 自体に対応していない。 `Referer-Policy` に対応したモダンブラウザでかつ、デフォルトが `no-referrer-when-downgrade` だったくらい古いバージョンのために明示したところで、そうしたブラウザの利用自体がリスクであるため、今日において `strict-origin-when-cross-origin` の明示が必須だとは筆者は考えてない。

(なお、 QPACK の static table にも無いので、 QUIC でもそのまま 48byte の追加データになる)


## Outro

Referer や Origin は、その歴史的な経緯も、重要度も、時代に応じたセキュリティやプライバシーの扱いも含め、 Web プラットフォームにとって非常に重要な要素だ。

だからこそ、 Web プラットフォームは長い時間をかけて、互換性、実装差異、リアルワールドでの使われ方、最新のプラクティスなどを踏まえ、仕様を整備し、それを「ブラウザのデフォルト」にし、適切な追加仕様を策定してきた。

そこをすっ飛ばして「とにかく Referer は送らないのが安全だから、 `no-referrer` がベストプラクティスだ」と考えるのは、こうした背景が分かってない典型的な勘違いだと筆者は考えている。

しかし、セキュリティ専門家による記事の推奨をみると、おそらく今回のような内容と違い「`no-referrer` を設定すべき」と書かれているものも多いだろう。

筆者はセキュリティ専門家ではないので、判断は各自に委ねたい。


## Ack

この記事は [@shhnjk](https://twitter.com/shhnjk) さんにレビューしていただきました。ありがとうございました。