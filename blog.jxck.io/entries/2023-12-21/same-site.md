# [cookie][3pca] 3PCA 21 日目: SameSite Cookie

## Intro

このエントリは、 3rd Party Cookie Advent Calendar の 21 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

Google が 3rd Party Cookie を Deprecate していく方針を発表してから、最初に始めたのが SameSite Lax by Default だった。

これが何のために行われたのかを解説する。


## eTLD+1 とは

SameSite とは「eTLD+1 が同じ」という説明になる。これを理解するには eTLD を理解する必要がある。

例として example.com ドメインを持ち、そこに以下のような Cookie を付与するところを考える。

```http
Set-Cookie: session_id=deadbeef; Domain=example.com
```

これは、この Cookie が https://example.com とそのサブドメイン全体に送られるように設定するものだ。この Domain 属性をつけなければ、 https://example.com/ にしか送られない。

ここで、以下を考える。

```http
Set-Cookie: session_id=deadbeef; Domain=com
```

これでもし、この Cookie が `.com` のあらゆるサブドメインに送られるようになると問題だ。

従ってドメインの末尾にある Top Level Domain (TLD) である `.com` は指定できないようになっている。

では、次はどうだろう?

```http
Set-Cookie: session_id=deadbeef; Domain=example.co.jp
Set-Cookie: session_id=deadbeef; Domain=co.jp
```

https://example.co.jp を持っているなら、 `*.example.co.jp` に送られるのは問題ない。しかし `Domain=co.jp` を指定できてしまうと、その Cookie があらゆる `*.co.jp` サイトに送られるため問題になる。

この場合 TLD は `.jp` であるが「Domain に TLD は指定できない」ではルールが緩すぎるのだ。

`.jp` のサブドメインでありながら、 https://co.jp/ や https://ne.jp/ はドメインレジストラでは取得できない。 `co.jp` や `ne.jp` は TLD ではないが TLD のように振る舞う。これを Effective Top Level Domain (eTLD) という。

ドメインレジストラで購入できるドメインは、 eTLD の左に 1 単語以上を繋いだ eTLD+1 (co.jp + example) になる。これが eTLD+1 の正体だ。

eTLD である組み合わせは、 Public Suffix List という巨大なテキストファイルで管理されている。


## Same Site とは

https://example.co.jp とそのサブドメインである https://admin.example.co.jp は、通常同じ管理者が運用しているだろうと考えられる。つまり、eTLD+1 (https://example.co.jp/)までが同じであれば、そのサブドメインも同じサイトだと考えることができる。

これを Same Site と言い、 Same Site Cookie とは「eTLD+1 が同じである Same Site にしか送らない Cookie」を意味する。対して Cross Site Cookie は、まさしく 3rd Party Cookie を意味することになるのだ。

![ドメインの関連: Same Origin/Same Site/Schemeful Same Site/Subset/3rd Party の違い](domain-relation.png#6166x5132)


### SameSite=Strict

たとえば https://example.co.jp で以下のような Set-Cookie を返した場合、この Cookie は厳密(Strict)に SameSite に制限される。つまり https://example.co.jp とそのサブドメインにしか送られないという指定になるのだ。

```http
Set-Cookie: session_id=deadbeef; SameSite=Strict
```

逆を言うと、別サイト、つまり 3rd Party には送られないため、この属性がついていることは、「この Cookie は 3rd Party Cookie ではない」というラベルにもなる。

この https://example.co.jp がどこか別のサイト(つまり Cross Site)に `<iframe>` で埋め込まれた場合、この Cookie は https://example.co.jp/ には送られないということだ。


### SameSite=Lax

ところが、これはあまりにも厳密であり、この Cookie は例えば https://example.com/ という Cross Site からの「画面遷移」でも送られない。もし https://example.co.jp にログイン済みでも、 https://example.com/ 上のリンクをクリックして遷移してたら、 Cookie が送られないためログイン済みにならない。といったことが起こってしまうのだ。

これは流石に制限が強すぎるため、緩和策として画面遷移(Top Level Navigation)だけは、例外的に Cookie を送るようにするための緩和仕様が `Lax` だ。

```http
Set-Cookie: session_id=deadbeef; SameSite=Lax
```

これで、 `<iframe>` などの埋め込みでは送られないが、画面遷移の場合は送られ、認証済みの状態が維持できるようになる。


### SameSite=None

逆に、これらの制限を外し、 Cross Site にも送れるようにする属性が `None` だ。

```http
Set-Cookie: session_id=deadbeef; SameSite=None
```

Cross Site にも送ると言うことは、これは 3rd Party Cookie として使えるということだ。

つまり、 `SameSite=None` は「*これは 3rd Party Cookie だと明示的に示すマーカー*」とみなすことができる。


## Lax by Default

Chrome は、3rd Party Cookie Deprecation の計画を発表した時に、まず Cookie のデフォルトを `Lax` にするという変更を行った。

画面遷移では送られるため、ログインセッションは維持できる。しかし、3rd Party Cookie としては送られない。という非常に重要な破壊的変更だ。

この変更により 3rd Party Cookie がブロックされ、さまざまなユースケースが壊れる。ワークアラウンドとして、3rd Party Cookie に依存している場合は、明示的に `SameSite=None` を付与する必要が出たのだ。

結果、世界中の広告プラットフォームや、認証連携や、 SNS のボタンなどで用いられるあらゆる 3rd Party Cookie には、 `SameSite=None` が付けられた。(対応が難しい場合は、サービスで使っている Cookie を全てにとりあえず `SameSite=None` を付与するといった対応もあった。)

しかし、いずれにせよこの作業を経て「*世界中の 3rd Party Cookie が可視化された*」ことになる。

ブラウザが `SameSite=None` の使用量をメトリクスで監視すれば、世界でどのくらい 3rd Party Cookie が使われているのかを把握でき、事業者は自分たちのコードベースに `SameSite=None` がどのくらい残っているのかを把握することで、どの程度 3rd Party Cookie への対応ができているのかを知ることができるのだ。

そして、 3rd Party Cookie を無くしていく作業は、この `SameSite=None` とマークされている Cookie を無くしていく作業ということになる。つまり、 Chrome が最後に「`SameSite=None` を無視する」という変更をブラウザに入れることが 3rd Party Cookie Deprecation のゴールになるわけだ。


## CSRF の緩和

`SameSite=Lax` がデフォルトになるメリットは、 3rd Party Cookie の可視化だけではない。

CSRF 攻撃は、もともと Cross Site に Cookie が送られることを利用していたため、これも `SameSite=Lax` がデフォルトになることで、かなりのケースで攻撃が成立しなくなる。

しかしこれを理由に、従来の対策方法だった CSRF token ベースの防御が不要になるかと言うと、セキュリティ専門家は懐疑的であるか否定している。OWASP にはその理由が書いてある。

> SameSite Cookie Attribute can be used for session cookies but be careful to NOT set a cookie specifically for a domain.
> This action introduces a security vulnerability because all subdomains of that domain will share the cookie,
> and this is particularly an issue if a subdomain has a CNAME to domains not in your control.
> --- https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html

タラレバな部分もあるような気がするが、万全の対策には従来の手法を最終層に置いた、多層防御が必要となる。

しかし、 `SameSite=Lax` によって大半が落とされ、さらに `Sec-Fetch-Dest`/`Sec-Fetch-Mode`/`Sec-Fetch-Site`/`Sec-Fetch-User` あたりをチェックすれば、ミドルウェアで攻撃リクエストを落とすことができ、 CSRF Token を格納している Redis などの Cookie Storage への I/O の削減に繋がるだろう。


## 理想の Cookie

ちなみに 3rd Party Cookie とは離れるが、 Same Site Cookie を最大限使いこなすには read/write を分離するのがベストプラクティスとされている。

これはつまり、 API への Read 権限を `Lax` にし、 Write 権限を `Strict` にするというものだ。

従来の 1st Party Session Cookie は、それ単体で Read も Write も担っていた。これを 2 つに分けて Read つまり GET で画面を遷移するのには `Lax` を使い、その Cookie だけでは POST/PUT/DELETE はできなくする。

代わりに POST/PUT/DELETE 用に `Strict` な Cookie が付与されるようにするというものだ。

```http
Set-Cookie: __Host-session_read=deadbeef;  Secure; HttpOnly; Path=/; SameSite=Lax
Set-Cookie: __Host-session_write=facefeed; Secure; HttpOnly; Path=/; SameSite=Strict
```

リクエストを受け付ける時は、まずミドルウェアでメソッドの種類と、それに応じた Cookie が送られてきているかをチェックする。

イメージとしては以下のような感じだ。

```js
app.use((req, res, next) => {
  const method = req.method

  // POST/PUT/DELETE は Write Cookie を要求
  if (["POST", "PUT", "DELETE"].includes(method)) {
    const cookie = req.cookies["session_write"]
    // 無ければエラー
    if (cookie === null) return res.send(400)
    // あれば値を Storage に確認
    if (checkCookie(cookie)) return next()
    // 値がおかしければエラー
    return res.send(400)
  }

  // GET は Read Cookie を要求
  if (method === "GET") {
    // 無ければエラー
    if (cookie === null) return res.send(400)
    // あれば値を Storage に確認
    if (checkCookie(cookie)) return next()
    // 値がおかしければエラー
    return res.send(400)
  }

  return res.send(405)
})
```

リファクタリングとしては多少難易度が高いが、この分離が可能であれば、ついでに Cookie Prefix の付与や、ミドルウェアでの Sec-Fetch 系のチェックなども入れられると、より堅牢な実装ができるだろう。

Read/Write 分離の運用は、 GitHub が既に行っているため参考になる。