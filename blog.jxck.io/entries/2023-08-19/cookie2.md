# [cookie] Cookie2 とは何か

## Intro

タイトルを見て「Cookie の新しい仕様か、キャッチアップしよう」と思って開いたのなら、以降を読む必要はない。


## Cookie History

2000 年に発行された Cookie の仕様である RFC 2965 では、仕様中に `Set-Cookie2`/`Cookie2` (以下 Cookie2) という 2 つのヘッダが定義されている。しかし 2011 年に改定された現行の RFC 6265 ではそれらヘッダは deprecate されており、実際の Web でこれらのヘッダが交換される場面を、少なくとも筆者は見たことがない。存在すら知らない開発者も多いだろう。

筆者はずっと、この仕様がどのように出てきて、どうして消えていったのかが気になっていた。 Web 上にも情報が少なく、「歴史上の理由で」とか分かったようなことを言ってる人がたまにいるくらいだ。四半世紀前のことなので経緯を知っている人は少なくなりつつあるだろう。

そんな中、以下のドキュメントを教えてもらった。

- HTTP Cookies: Standards, Privacy, and Politics
  - https://arxiv.org/pdf/cs/0105018.pdf
  - https://arxiv.org/abs/cs.SE/0105018
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2008JulSep/0301.html

この資料は、当時 RFC 2109 および RFC 2965 を策定した David Kristol が、 2008 年に「そろそろ過去の議論の経緯がわからない人も WG に増えたので」と、そこまでの Cookie の策定経緯をまとめたものだ。 RFC を出して終わりな人が多い中、標準化における過去の議論の経緯をまとめることの重要性を意識した、非常に尊い仕事だと言える。

内容は 1994 年頃に HTTP/1.0 策定が始まったころから、Cookie そのものが標準化されるに至った経緯と、第二版にあたる RFC 2965 が出る 2000 年までの議論の記録を振り返ったものだ。 Cookie2 の話は後半まで出てこないが、そこまでの背景と時代状況などがわかることで、より深く理解することができる。単なる昔話ではなく、今話題になっている Cookie を取り巻く様々な議論の解像度を上げる意味でも、非常に有用な文書と言える。

古文書を発掘した気持ちで、夏休みの自由研究として考古学に勤しむことにした。


## Netscape の仕様

Stateless なプロトコルとして設計されていた、TBL オリジナルの HTTP (いわゆる HTTP/0.9) の時代から、 State Management を持ち込みたいユースケースは多くあった。わかりやすいところでは、 EC のショッピングカート実装だ。

そこで、 Netscape が独自に実装したのが Cookie の始まりだ。 Netscape で Cookie が作られた経緯は Cookie の作者本人である Lou Montulli が以下に書いている。

- The irregular musings of Lou Montulli: The reasoning behind Web Cookies
  - https://montulli.blogspot.com/2013/05/the-reasoning-behind-web-cookies.html

これを見ると、当時 Netscape でも EC にカートを実装する要件があり、彼が「端末固有番号」のような仕様を避けるために Cookie を思いついたこと、名前の由来は OS の "magic cookie" だったことなどがわかる。

Netscape が公開していた仕様は以下だ。今の仕様と比べれば非常に短い、 README 程度のこの仕様から全ては始まった。

- PERSISTENT CLIENT STATE HTTP COOKIES Preliminary Specification
  - https://web.archive.org/web/20020803110822/http://wp.netscape.com/newsref/std/cookie_spec.html

あくまで Netscape の独自仕様であり、最初は IETF RFC ではなかった。しかし、その利用が広がり「State Management の標準仕様が必要だ」という流れから、 1995 年 IETF に "State Management Subgroup" が作られ、そこで議論が開始される。

このとき、それこそ Server が割り振るのではなく Client が割り振る "Session-ID" なる対案もあったようだ。今で言う HTTP State Token と同じ発想が、 Cookie の初期 RFC 策定段階にあったことは興味深い。

- Explainer: Tightening HTTP State Management
  - https://github.com/mikewest/http-state-tokens

また、余談だがこの時点から Privacy に関する議論、特にヨーロッパ圏からのフィードバックが多くあり、来年(2024 年)に予定されている 3rd Party Cookie Deprecation の実に 30 年前、なんなら仕様ができる前から、プライバシーをめぐる議論は始まっていたこともわかる。

Subgroup では、いくつかある提案から Netscape の Cookie をベースに、作業を開始することが決まった。既存デプロイとの互換性を考えても、新しい機構を生み出すより Running Code をとるのが理にかなっているのは IETF のあり方だ。 Netscape の薄っぺらい仕様の曖昧な部分(構文定義、属性値、ドメイン判定など)を厳格にするところから着手することになり、追加で以下のような議論がされた。

- Cookie が送られるドメインの判定
- プライバシーの考慮
- Proxy を経由する際の挙動

ドメインの判定についても、まだ当時は Public Suffix List はなかった。代わりに TLD も今ほど乱立してなかったため、当時のルールは "ドメインに含まれるドットの数" で判定していた。

基本は `Domain=example.co.jp` のようにドットが 2 つ入るが、以下の特別な 7 つの TLD のみ `Domain=example.com` のようにドットが 1 つで良かった。今のように TLD が乱立する前だからできたロジックだ。

- ".com"
- ".edu"
- ".net"
- ".org"
- ".gov"
- ".mil"
- ".int"

これは、 DNS が階層的に管理され、サブドメインの管理者は同じであること、ドメインの末尾は文字数で見分けられること、などに依存した仕組みであり、実際に問題が引き起こされていた。今でもよく問題になる `Domain` 属性についての議論も、当初からあったことがわかる。

同時に Port の分離も議論もされている。結局、同一ドメイン上の別ポートにも共有されることになったが、この頃は今と違って Web ですら 80/443 以外にデプロイされることがあったのだろう。このとき Port が分離されたら、もっと言えば先に CORS があったなら、その後起こる様々な脆弱性が緩和できていたかもしれないが、タラレバでしかない。

プライバシーについての問題は、ユーザが意図しない Cookie の共有、今で言う 3rd Party Cookie の問題そのものだが、当時は "Unverifiable Transactions" つまり、「ユーザが認識/検証できないやり取り」というトピックで議論されていた。

自分が直接アクセスしてないサイトの Cookie が保存されるのは、ユーザにとって直感的ではない。当時は、ユーザがローカルの Cookie ファイルを調べ、知らないドメインのものが保存されているのを見て「侵入された」と騒ぐようなニュースがあったらしい。

そんな議論を経て、最初の RFC 2109 が策定された。


## RFC 2109

RFC 2109 は、 Netscape の仕様をブラッシュアップすると同時に、いくつか新しい機能を追加していた。例えば、 `Set-Cookie` に指定できる属性には、 `Max-Age`, `Comment`, `Version` が追加されている。

`Max-Age` は現在も使われているが、もとの `Expires` による絶対日付指定が持っていたパース困難性によるバグや、クロックずらしによる偽装などに対応するため、相対時間指定ができるようにしたものだ。

`Comment` は、その Cookie の用途をユーザにアドバタイズするためのものだ。同時にこの RFC では 3rd Party Cookie (Unverifiable Transaction) の送信をデフォルトで禁止し、ユーザに検証(Verify)する方法を提供するように求めている。資料の中では「インフォームドコンセント」が EU を中心に要求されていた経緯が書かれており、この属性はそのオプトインを実現するため、今で言う Cookie バナーをブラウザが提供する際に使われる意図があったようだ。

`Version` は対応する Cookie (State Management Mechanism) のバージョンを示すためのものだ。すでに Netscape の古い仕様との互換性も考える必要があるため、この段階で Versioning をし、先々の更新に耐えうるようにしたかったのだろう。 Web で何度か繰り返される代表的な失敗の 1 つだ。

ところが、この RFC が出てすぐに、ブラウザの互換性問題が指摘されることになる。当時は Netscape と IE が二大巨頭であり、どちらもこの時点では RFC 2109 の "新仕様" には対応しておらず、 Netscape の "旧仕様" を採用していた。

Subgroup は、 HTTP/1.1 に準拠したクライアントは新仕様を理解し、そうでない HTTP/1.0 では新仕様部分を無視して旧仕様が使われるという想定だった。しかし実際にはそうではなかった。

以下のような `Set-Cookie` を考えてみよう。

```http
Set-Cookie: session_id=iPmVILn7dxCO4n;
  Comment="This cookie is used for establish session between client & server";
  Version=1;
  Max-Age=31536000;
  Path=/;
  Expires=Tue Feb 22 2022 22:22:22 GMT
```

仕様策定者は、最初の属性を Name/Value と扱うと想定していた。実際 Netscape はそうだったが、 IE は最後の認識できない属性を Name/Value ペアとして採用する実装だった。当時 IE のシェアは 20~30% で、無視できない問題だった。

こうして、発行されてすぐの RFC 2109 は改定に向けて議論を始めた。


## RFC 2965

議論は、いかにして新/旧仕様の互換性を維持するかだった。

資料の中では、検討されたいくつかの方式が解説されている。

- 新/旧 2 つの `Set-Cookie` を送る
- IE の挙動に合わせて Name/Value ペアを最初と最後に重複して送ることを強制する
- 最初のレスポンスだけ旧仕様で送り、次のリクエストの `Cookie` に `Version` があればそこから新仕様にする

議論の末に策定されたのが、新仕様を独立したヘッダである `Set-Cookie2` / `Cookie2` に分離したドラフトだった。

最初は `Set-Cookie` と `Set-Cookie2` を返し、クライアントが `Cookie` / `Cookie2` どちらを返すかで後続の処理を分岐する。クライアントが対応していなければ `Set-Cookie2` は無視されるだけだ。

こうして本題だった `Set-Cookie2` が定義された RFC 2965 が発行された。


## RFC 6265

結論から言うと `Set-Cookie2`/`Cookie2` は、その後全くと言ってよいほど使われなかった。

`Set-Cookie` をデプロイしているサービスにとって、 `Set-Cookie2` に移行する強力なインセンティブがなければ、わざわざ重複する 2 つのヘッダを送る移行期を経てまで、刷新するモチベーションがない。旧仕様をサポートしたクライアントも、サーバが両方送る以上旧仕様のままでも困らないので、サポートを広げるインセンティブがない。新仕様デプロイにおける典型的な鶏/卵問題だ。

RFC 2965 の議論の段階から指摘されていた問題は、そもそもこの仕様の策定にブラウザベンダが関わってないこと、そして仕様の策定が「理想の追求」であり「現実世界の反映」ではなかったことだった。

IETF の理念として RFC 策定の目的は _De-jure_ ではなく _De-facto_ 、つまり実世界にはどのようなランニングコードがあるのかを調査し、それらが互換性を保てるように仕様を策定することが求められる。 RFC 2965 は De-jure 策定側に寄ってしまい、結果「_理想的で誰も使わない仕様_」ができてしまった。

そこから 10 年ほど経った 2009 年頃、 Cookie の改定を行うため WG が再始動した。作業を開始するにあたって示される Charter には、以下のように記されている。

- http-state charter
  - https://datatracker.ietf.org/doc/charter-ietf-httpstate/
  - https://mailarchive.ietf.org/arch/msg/http-state/PMcWqtvzhiVLna1fiDnxV4KJ-so/

ここまでの流れを踏まえると、このような Charter になった意味がよくわかる。(意訳付きで引用)

> The HTTP State Management Mechanism (aka Cookies) was originally created by Netscape Communications in their informal Netscape cookie specification ("cookie_spec.html"), from which formal specifications RFC 2109 and RFC 2965 evolved. The formal specifications, however, were never fully implemented in practice; RFC 2109, in addition to cookie_spec.html, more closely resemble real-world implementations than RFC 2965, even though RFC 2965 officially obsoletes the former. Compounding the problem are undocumented features (such as HTTPOnly), and varying behaviors among real-world implementations.
> Netscape の独自仕様を RFC 2109、 RFC 2965 と仕様化してきたが、全くと言っていいほど使われなかった。 RFC 2109 は RFC 2965 に Obsolete されたにもかかわらず、リアルワールドは RFC 2109 の方が体現してる。そのうえで、 HTTPOnly のように仕様化されてないけど、使われており、実装によって動作が違うものもある。
> --- https://datatracker.ietf.org/doc/charter-ietf-httpstate/

> Where commonalities exist in the most widely used implementations, the working group will specify the common behavior. Where differences exist among the most widely used implementations, the working group will document the variations and seek consensus to reduce variation by selecting among the most widely used variations.
> WG の仕事は以下
> - 広く使われている実装間に共通点があるなら、その共通部分を仕様にする。
> - 広く使われている実装間に差異があるなら、そのバリエーションをドキュメントにし、その中で最も使われているものを選ぶことでバリエーションを減らすためのコンセンサスを取る。
> --- https://datatracker.ietf.org/doc/charter-ietf-httpstate/

> The working group must not introduce any new syntax or new semantics not already in common use.
> WG は、実際に使われてない新しい構文やセマンティクスを勝手に導入してはならない。
> --- https://datatracker.ietf.org/doc/charter-ietf-httpstate/

同じ過ちを繰り返さないように、作業開始の前にしっかりと釘を打っていることがよくわかる。

この WG には Google 所属の Adam Barth を中心としたブラウザベンダのメンバーが議論に参加し、メジャーブラウザの挙動(2011 年といえばもう Chrome も登場しており、ブラウザの顔ぶれもだいぶ変わっている)や、リアルワールドのデプロイに関する調査を行いながら、何が共通動作で、どこに差異があり、何に合意が必要で、どう実装を修正するかという議論を進めた。

Adam 自身が Cookie についてのテスケースを整理していたことからも、作業の進め方の違いはかなり明白にあらわれている。(仕様とともにテストを作る流れはこのあたりから始まり、実装する上では非常に助かる好ましい文化だ)

- http-state/tests at master · abarth/http-state
  - https://github.com/abarth/http-state/tree/master/tests

結果、誰も使ってない `Set-Cookie2`/`Cookie2` は最初のドラフトの時点から削除され、 `Comment` / `Version` 属性も同様に削除された。新規ではあったが、実装が広まり互換が保たれていた `Max-Age` については仕様に残り、仕様には無かったが実際に使われていた `HttpOnly` が追加されることになる。

"Unverifiable Transaction" が "3rd Party Cookie" に変わるのもここからだ。内容もガラッと変わっている。

Lou のブログの方では、 1996 年ごろから Double Click などが行っていた 3rd Party Cookie による広告のトラッキングが、すでに問題になっていたことが触れられている。ここで Lou は 3rd Party Cookie をブロックするかどうかの決断を委ねられ、数週間悩んだ結果、以下の理由で残すことにしたとしてる。(意訳)

1. 追跡は可能でも、追跡していることを隠すことはできない。一般市民はそれを実施する企業自身、および規制を作り実施する政府双方に圧力をかける、自然なフィードバックメカニズムが機能する。
2. もし 3rd Party Cookie を無効にしても、広告会社は別の方法でトラッキングを実現するだけであり問題の先送りにしかならない。また、その方法は Cookie 以上に観測/無効化が難しいものである可能性がある。

また、3rd Party Cookie 全体を無効にすることで、トラッキング以外のユースケースも壊れるという現実もあり、現時点に続く 3rd Party Cookie のある Web という世界線にシフトした。その現実を反映するため、 RFC 2965 に書かれていた理想的な 3rd Party Cookie のあり方も、現実に即して書き直されている。

(今世界が直面し、総出で作業を進めている課題を、たった一人で決断しなくてはならなかった当時の Lou の心中は、察するに余りある。)

こうして、現在の Cookie の礎となる「ちゃんとした仕様」が RFC 6265 としてまとめられ、その過程で Cookie2 は消えていった。


## Outro

脱線も多かったが、以上が Cookie という超メジャーな仕様に 10 年以上定義されていたヘッダでありながら、全くと言って良いほど使われなかった Cookie2 という仕様が、どうやって出てきてどうして消えていったかの経緯だ。

この資料からは、本当に定義すべき仕様のありかた、そして実世界を無視した策定の盛大なしくじり、有り体に言えば「*Web における仕様策定の難しさ*」を学ぶことができる。今標準化の文脈で「IETF はどのようなフィロソフィーで仕様を策定するのか」というベストプラクティスはよく語られるが、そうなった背景にこうした失敗があったことを知ると、より深く理解できるだろう。

この RFC 6265 からも 10 年ほど経過し、 Web を取り巻く状況や、そこに求められる基準も大きく変わった今、 Cookie の仕様は RFC 6265bis ("bis" は "もう一回" の意味) として、改定作業が進められている。当時からまたブラウザの顔ぶれは代わり、加えて新たに CDN からのメンバーも目立つようになった。

当時との違い、テストは WPT を中心に拡充され、互換性を上げるために Interop の取り組みも徐々に成果を出している。そして基盤の整備や、エコシステムによる研究の成果もあり、単なる共通部分の合意だけではなく、 SameSite や Cookie Prefix といった新しい仕様の追加も進んでいる。そして、世界はまた 3rd Party Cookie について見直しを強く求め、「壊れるからそのまま」とも言ってられなくなり、 30 年来の Deprecation 実現に向けて、標準化団体、実装者、ユーザ、政府などが、一丸となって作業を進めている。

今また大きな転換期を迎えている Cookie だが、この荒波の中で Cookie2 のような過ちを繰り返すことなく、今の時代が求める新たな Cookie のあり方に着地してくれることを願いたい。

以上をもって、 2023 年夏休みの自由研究とする。


## Resources

- Spec
  - Client Side State - HTTP Cookies
    - https://web.archive.org/web/20020803110822/http://wp.netscape.com/newsref/std/cookie_spec.html
  - RFC 2109 - HTTP State Management Mechanism
    - https://datatracker.ietf.org/doc/html/rfc2109
  - RFC 2965 - HTTP State Management Mechanism
    - https://datatracker.ietf.org/doc/html/rfc2965
  - arXiv:cs/0105018v1 [cs.SE] 9 May 2001
    - https://arxiv.org/pdf/cs/0105018.pdf
    - https://arxiv.org/abs/cs/0105018v1
  - HTTP State Management Mechanism Charter
    - https://datatracker.ietf.org/doc/charter-ietf-httpstate/01/
  - RFC 6265 - HTTP State Management Mechanism
    - https://datatracker.ietf.org/doc/html/rfc6265
  - draft-ietf-httpbis-rfc6265bis
    - https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
- Blog
  - The irregular musings of Lou Montulli: The reasoning behind Web Cookies
    - http://montulli.blogspot.com/2013/05/the-reasoning-behind-web-cookies.html
- Presentation
- Issues
  - Re: Set-Cookie vs list header parsing (i129), was: NEW ISSUE: repeating non-list-type-headers
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2008JulSep/0301.html
  - Unverifiable Transactions / Cookie draft
    - https://lists.w3.org/Archives/Public/ietf-http-wg/1997JanMar/0416.html#replies
  - HTTP-state WG being resurrected?
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2009JulSep/0424.html
- Other
  - http-state/tests at master · abarth/http-state
    - https://github.com/abarth/http-state/tree/master/tests