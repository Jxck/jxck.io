# [gpc][privacy] Global Privacy Control という法的効力を持つヘッダ

## Intro

GPC (Global Privacy Control) の策定と実装が進んでいる。

このヘッダは、サービス、ユーザ、ブラウザ、全てにとって「無視することができない特別なヘッダ」となりつつある。

たかだか `1` という値を送るだけのヘッダに、何の意味があるのか?

失敗して歴史に消えつつある DNT と何が違うのか?

解説していく。


## DNT

長らく問題視されていた "3rd Party Cookie" は、技術そのものではなく、「トラッキング」というユースケースに問題があった。

したがって、Web の歴史の前半では「トラッキングからの Opt-Out」という手段を、ユーザが手に入れるための戦いが繰り広げられていた。

GDPR などが求めた Cookie Banner などが、その最たる例の 1 つだ。しかし、どうしても UI は邪魔になるし、毎回 Deny を押すのも不便だ。

それより遡れば、ブラウザは DNT (Do Not Track) というヘッダを送ることで、ユーザが Opt-Out したいという意思を表明する手段を得た。

```http
DNT: 1
```

これを送るだけで、トラッキングを行っているサイトは(それが 3rd Party Cookie を用いるかは関係なく)、Opt-Out できるという想定だ。

US ではもともと "Do Not Call" という、そこに自分の電話番号を登録すれば、一切の営業電話がかかってこなくなるという仕組みがあり、それになぞらえたものだ。

ところが、このヘッダには一切の「法的強制力」はなく、紳士協定のようなものだった。

広告ベンダからすれば、自分だけがサポートすると、競合に対して不利になる。対応するなら業界全体である必要があるが、そこまでの法的根拠がない。

結果、送っても誰もサポートしない。ただ無駄なペイロードを増やすヘッダになってしまった。P3P も同じだ。

- 3PCA 9 日目: DNT | blog.jxck.io
  - https://blog.jxck.io/entries/2023-12-09/3pca-dnt.html


## GPC

GPC は WC3 の Privacy WG によって、2020 年頃から策定が進められてきた仕様だ。

メンバーには大学やメディア、EFF(電子フロンティア財団)などのメンバーが名を連ねている。

- Global Privacy Control - Take Control Of Your Privacy
  - https://globalprivacycontrol.org/

Chrome が進めてきた Privacy Sandbox とは異なり、3rd Party Cookie の代替といった文脈より、完全にオプトアウトの手段を求めるものだ。つまり 3rd Party Cookie を使わないトラッキングなどでも、効果が期待できる。

仕様は非常にシンプルだ。

```http
Sec-GPC: 1
```

DNT と何も変わっていない。

最大の違いは、このヘッダは最初から「**法的な効力**」を念頭に策定されている点だ。

つまり、大事なのはこのヘッダ仕様そのものというより、それを参照する各プライバシー法案の方にある。


## 法的な効力

GPC には、各種法律との連携についてのガイドラインが公開されている。

- Global Privacy Control (GPC) Legal and Implementation Considerations Guide
  - https://w3c.github.io/gpc/explainer#411-the-california-consumer-privacy-act

要点をまとめると以下のようなものだ。

- GPC は、すべての法律で効力を持つわけではない
- しかし、各種法律側が GPC を採用する場合、効力を持つことがある
- すでに US では複数の州が、GPC を法的根拠のあるオプトアウト表明手段として採用している

つまり、法律側が「GPC にユーザの意図を表明する効力がある」と宣言することで、その法の適用範囲で事業者は GPC を遵守することが求められることになる。

筆頭として、この界隈で業界を牽引する CCPA(カリフォルニアのプライバシー法)は、ガイドラインの中でこのことを明示している。

> Opting out of the sale or sharing of personal information should be easy for consumers,
> and the GPC is one option for consumers who want to submit requests
> to opt-out of the sale or sharing of personal information via a user-enabled global privacy control.
> Under law, it must be honored by covered businesses as a valid consumer request
> to stop the sale or sharing of personal information.
>
> 個人情報の販売または共有をオプトアウトすることは、消費者にとって容易であるべきであり、
> GPC は、ユーザが有効にできる Global Privacy Control を介して、
> 個人情報の販売または共有のオプトアウトをリクエストしたい消費者のための選択肢の 1 つです。
> 法律に基づき、対象となる企業は、個人情報の販売または共有を停止するための
> 有効な消費者リクエストとして、GPC を尊重しなければなりません。
>
> --- https://oag.ca.gov/privacy/ccpa/gpc

すでに 2022 年には、Sephora 社は GPC を無視したとして $1.2 億ドルの罰金を求められた事例がある。

- https://oag.ca.gov/news/press-releases/attorney-general-bonta-announces-settlement-sephora-part-ongoing-enforcement

まだ Working Draft で、全てのブラウザで実装が済んだわけでもないが、運用が始まっているのだ。


## 誰が遵守すべきか?

筆者は Web の専門家であって、法律は専門ではない。

したがって、自分のサービスが GPC を遵守すべきか? については、Ask your Lawyer ということになるだろう。

サービスの運営元が日本でも、一般的にアクセスするユーザいる地域の法律が適用されるからだ。

提供範囲や、ユーザデータの扱い方などによって、事情は変わってくるだろう。

ちなみに、GDPR は明示的に GPC の採用を宣言しているわけではない。しかし、ePrivacy の策定が進めば、言及される可能性がある。日本の個人情報保護法や電気通信事業者法も、現状 GPC に直接言及しているわけではない。

しかし、こうしたプライバシー関連法案が、明示的に "GPC" に言及しなくても、「オプトアウトの手段の提供」などの言及があれば、GPC がそれに該当すると判断される可能性は、法律を更新しなくてもあり得ると考えられる。

そうした判断は裁判次第なので、判例がなければ誰にもわからない。

しかし、エンジニアの視点として「軽視していいヘッダではない」という点は言えるだろう。


## どう遵守すべきか

ここで勘違いしないほうがいいのは、「GPC が送られてきたら 3rd Party Cookie でトラッキングしなければいい」ではないという点だ。

目的は 3rd Party Cookie やその使い方という「技術」や「実装」からのオプトアウトではないからだ。

そのユーザが置かれている状況で、適用される法律が保証するプライバシーのコントロールを、ユーザが行使できているかどうかだ。

「収集」や「共有」や「販売」と記された条文が、どの処理にあたるのかも、Ask your Lawyer になるだろう。

サービスが保有しているユーザデータももちろん対象になるため、例えばサードパーティーのアナリティクスツールを入れている場合「ツールが対応するのを待つだけで、自分たちがやることはない」とも限らないのだ。


## ユースケースの規制再び

何度も言うが、3rd Party Cookie という技術自体が問題なのではなく、そのユースケースが問題だった。そのため、ユースケースを規制するために DNT や法律の整備が行われた。

それでも守られない事例があったため、技術としての 3rd Party Cookie 自体を無効にすることで、根本的な対処を求めたのが過去 6 年ほどの動きだった。

しかし、やはり壊れる Web の影響を踏まえ、無効化自体は断念した。

そこでまた、ユースケースを規制する方向に戻ってきたことになる。

今度は、その間に整備の進んだ各法律を後ろ盾として、企業への強制力を持って戻ってきた形だ。

もちろん、守らない企業もいるだろう。そうした企業が発覚し、消費者から訴えられる形で是正されていくという、この問題の初期の解決モデルが、また試されるフェーズが巡ってきた。


## Opt Me Out Act

GPC を送ることが、法的な効力を持つ Opt Out の表明となったとしても、ブラウザが対応していなければユーザはそれを表明する術がない。

そこで、ユーザ(消費者)がその手段を容易に手に入れ、容易に有効化できるよう、ブラウザベンダに要求するという法案が合わせて作られた。

これが、カリフォルニアで 2025 年 10 月に署名された **Opt Me Out Act** だ。

- AB-566 California Consumer Privacy Act of 2018: opt-out preference signal.
  - https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB566

条文の最初はこう書かれている。

> A business shall not develop or maintain a browser that does not include functionality configurable
> by a consumer that enables the browser to send an opt-out preference signal
> to businesses with which the consumer interacts through the browser.
>
> 事業者は、消費者がブラウザを通じてやり取りする事業者に対し
> オプトアウトの意思表示シグナルを送信できるように
> 消費者が設定可能な機能を搭載していないブラウザを
> 開発または維持してはならない。

この法律は 2027 年 1 月 1 日に施行される。つまり、少なくとも CCPA の範囲内では、全てのブラウザは GPC を今年中に実装しないといけないということだ。

- California's Opt Me Out Act is a Win for Privacy - Open Policy & Advocacy
  - https://blog.mozilla.org/netpolicy/2025/10/29/californias-opt-me-out-act-is-a-win-for-privacy/

執筆時点で GPC は、まだ Brave や Firefox でしか実装されておらず、他のブラウザは拡張などで使われている。しかし、それではこの要件を満たしたとは言えないため、Chrome には Intent to Prototype が出ている。

Safari からはまだ情報はなく、Standard Position も出ていなかったが、カリフォルニアにある以上実装せざるを得ないだろう。

今はカリフォルニアに限定したものだが、これも全米や他国に伝搬していく可能性もある。

これまで、サービスを提供する事業者に対する強制力を持つ法案はあった。しかし、Opt Me Out Act はついに「ブラウザ実装に対する強制」まで法律が関与するようになった、非常にエポックメイキングなものだった。


## 仕様

もともとは、DNT と同じ以下のような形だった。

```
GPC: 1
```

しかし、この設計には現代では 2 つの問題がある。

まず、このヘッダはユーザの意図(設定)を反映してブラウザが付与するべきだ。それを JS から変更できてしまうのは問題なので、JS から触れないように `Sec-` があるのが望ましい。

また、このヘッダは実質 Boolean を意図しているので、Structured Field Values を用いて `?1` を送るのが望ましい。

前者はなんとか仕様に間に合ったが、後者は間に合わなかった。この策定が始まった頃には、まだ SFV は策定中で浸透しておらず、そのまま `1` を前提とした採用が先に進んでしまったのだ。

Privacy に関する仕様は、「Privacy First」を標榜する製品などが、他との差別化としていち早く提案段階のものをサポートし、それを告知することが多い。

結果、多くのサイトが以下を前提に、すでに対応をデプロイし始めている。

```
GPC: 1 // 非標準だが互換のため
Sec-GPC: 1
```

今から仕様を変更すると、`=== "1"` で判定している多くのサービスが「法律違反」な実装とみなされるリスクを考えると、やるとしても別のヘッダを作るしかなくなる。

するとまた、法との兼ね合いも増えてくる。もういじることはできないだろう。

- Use HTTP structured field values · Issue #6 · w3c/gpc
  - https://github.com/w3c/gpc/issues/6

`1` だと拡張が難しく、例えば「CCPA に対する選択的な表明」などができない、という話もあるが、GPC 自体は拡張を想定していない。

これは、様々な条件ごとに細かく設定できる P3P が失敗したことからも、ユーザがそれを判断することは現実的ではないという表れでもある。

結果、ユーザはあくまで Opt-Out を表明する手段を得た。それを、どう解釈するかは法律側が決め、その法律に則り適用範囲の企業が対応するという構図だ。

表明しない場合に `0` を明示的に送ることもない。その場合は `Sec-GPC` 自体を送らなければ良いからだ。

つまり、基本的に `1` 以外の値になる予定はなく、`1` 以外だったらヘッダまるごと無視するべきという仕様になっている。


## API

ブラウザに設定されている情報を取得する JS API も定義されている。

トラッキングスクリプトなどを無効にする場合は、この判定を利用することができる。

```js
if (navigator.globalPrivacyControl === false) {
  // opt-out していないため実行
  analytics()
  tracking()
}
```

また、GPC の有効/無効を切り替えて自動テストを走らせることになるだろう。

そのための WebDriver 拡張コマンドも定義されている。

```
# GPC を有効にする
POST /session/{session_id}/privacy

# GPC 状態の確認
GET /session/{session_id}/privacy
```


## GPC Support Resource

ユーザからすればサービスが「送っている GPC をちゃんと見ているか」は分からない。

そこで、GPC をサポートするサービスは、「サポートしている」という宣言を Support Resource で表明できる。

具体的には、以下のような JSON を `/.well-known/gpc.json` でレスポンスする。

```json
{
  "gpc": true,
  "lastUpdate": "2026-01-01"
}
```

これにより、規約などを確認しなくても、機械的に対応を確認することができる。

「GPC に対応すること」に言及する法律によっては、この設置は実質義務となる可能性があるだろう。


## Outro

法律にガイドラインが参照される事例がなかったわけではない。しかし、単体の Web 標準 API が法律で言及され、ましてやブラウザベンダの実装が、法的に強制された API は、これが初めてだろう。

W3C の Recommendation プロセス自体は、現実の運用と乖離があるとはいえ、Working Draft の段階で実装され始め、使われ、全ブラウザの実装が確約されるのも、Web のプラットフォームにとってみれば新しい展開だ。

Web および Web ブラウザ自体が、ユーザ(消費者)とサービス(事業者)を繋ぐ存在として、法律上も重要な立ち位置になる時代まで来たという現れだろう。

そして 2027 年までに、そのまま「全てのブラウザが実装」した場合、サービスは「全てのユーザは Opt-Out の手段を有している」という世界になる。それはもともと Web が求めていた、「あるべき姿」だったと言えるかもしれない。

`Sec-GCP: 1` というシンプルな文字列は、人類が Web のプライバシーについて取り組んできた歴史の、集大成が詰まっていると言っても過言ではない。


## Resources

- Spec
  - Global Privacy Control (GPC)
    - https://w3c.github.io/gpc/
  - Global Privacy Control (GPC) Legal and Implementation Considerations Guide
    - https://w3c.github.io/gpc/explainer
- Explainer
  - gpc/explainer.md
    - https://github.com/w3c/gpc/blob/main/explainer.md
- Requirements Doc
- Mozilla Standard Position
  - Global Privacy Control (GPC)
    - https://github.com/mozilla/standards-positions/issues/867
- WebKit Position
- TAG Design Review
- Intents
  - Intent to Prototype: Global Privacy Control
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/ztV1otnl_NQ/m/4S-V4iXWBgAJ
- Chrome Platform Status
  - Global Privacy Control - Chrome Platform Status
    - https://chromestatus.com/feature/5137324344213504
- WPT (Web Platform Test)
  - web-platform-tests dashboard
    - https://wpt.fyi/results/gpc?label=master&label=experimental&aligned&q=gpc
- DEMO
- Blog
- Presentation
- Issues
  - Add Global Privacy Control (GPC) support to Chrome (feature request) [40745270]
    - https://bugs.chromium.org/p/chromium/issues/detail?id=40745270
- Other