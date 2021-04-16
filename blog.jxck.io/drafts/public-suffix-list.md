# [tag] Public Suffix List とな何か、なぜ今問題になっているのか

## Intro

Public Suffix List (PSL) は、現在の Web セキュリティの一旦を支えている非常に重要な要素だ。

実は、これが少数のボランティアにより Github でメンテナンスされた、単なるテキストリストであることはあまり知られてないかもしれない。

最近、このリストへの追加リクエストがあとを絶たず、問題になっている。

今何が起こっているのか、そして "Public Suffix List" で検索してたどり着いた読者がもしやろうとしてるなら、絶対にすべきでないことについて解説する。


## Public Suffix List とは何か

PSL を解説するにはまずドメインの用語について整理する。

### Top Level Domain (TLD)

例えば、このブログのドメインは `blog.jxck.io` であり、これは筆者が取得したドメイン `jxck.io` のサブドメインだ。

`jxck.io` は、 `.io` という TLD を販売しているレジストラから購入できる。もちろん `io` そのものをドメインとして例えば `https://io` というサイトを建てることはできない。

我々がレジストラから割当を受けられるドメインを Registerable Domain と言う。

すると、 Registerable Domain とは、 TLD の一個下の階層、つまり **TLD + 1** と思うかもしれない。しかしここには例外がある。


### Effective Top Level Domain (eTLD)

例として `example.co.jp` というドメインを考えよう。

このドメインの TLD は `.jp` だ。しかしこのドメインは `.co.jp` という組み合わせの下で取得している。

`example.jp` 自体も取得できるため、 `.jp` は必ず何かと 2 つ組み合わせないと取得できないわけではない。

まとめるとこうなる。

- `.jp` のサブドメインを取得することは可能 (ex. `example.jp`)
- `.co.jp` のサブドメインを取得することも可能 (ex. `example.co.jp`)
- `co.jp` というドメイン自体は取得できない (ex. `https://co.jp` というサイトは建てられない)


つまり `.co.jp` とは、それ自体が TLD ではないにも関わらず、 TLD のように扱われるという、例外的な存在なのだ。

このようなドメインの組み合わせを Effective Top Level Domain (eTLD) と呼ぶ。


### Public Suffix List

`.jp` は TLD なのは機械的にわかる。ドメインを `.` で区切った一番右は常に TLD だ。

しかし、 `co.jp` が eTLD で `example.jp` が Registerable Domain であるというのは、どう見分ければ良いのだろうか？

実はここには機械的な処理方法がない。

そこで、「この組み合わせは eTLD だ」という判別のために存在するのが Public Suffix List だ。

- https://publicsuffix.org/

今は Github で管理されており、全体は以下のリンク先に 1.3 万行のテキストファイルとして存在する。

これはもともと Mozilla が管理を始めたものだ、しかし今ではこのファイルが多くのブラウザで使われている。


### PSL と Cookie の Domain 属性

昔は同様のファイルを各ベンダが別々に管理していたが、それが問題を起こしたことがある。

`tokyo.jp` というドメインは、 "都道府県型 JP ドメイン" という種類の東京版だ。 `tokyo.jp` が eTLD であるため取得できず、 `${好きな単語}.tokyo.jp` は取得できる。これは `tokyo.jp` をレジストラがそう運用しているからという、仕様ではなく運用の都合なのだ。

ところが、「そう運用されている」という事実を知らないブラウザがあったらどうなるだろうか？

例として `example.tokyo.jp` というドメインが取得され、なんらかのログインを伴うサービスがデプロイされていたとする。

ここで以下のような Cookie について考えてみよう。

```http
Set-Cookie: session_id=deadbeef;
```

この Cookie は `example.tokyo.jp` にしか送られない。しかし以下はどうだろうか？


```http
Set-Cookie: session_id=deadbeef; Domain=tokyo.jp
```

この Cookie はブラウザが `tokyo.jp` が eTLD だと知っているかどうかに応じて挙動が変わる。

もし知っているのであれば、 `Domain=com` などと指定したのと同じで、不正な設定として扱われるだろう。

しかし、知らなければ `tokyo.jp` のサブドメイン全てに送られる Cookie として扱われ、 `.tokyo.jp` 以下でデプロイされた他のサイトにも送られることになる。

これは実際に IE で発生した Cookie Monster バグとして知られ、 Session Fixation などに応用可能な脆弱性として問題になった。

まるで IE が悪いかのように喧伝されがちなこの問題だが、そもそも `tokyo.jp` を eTLD として運用するというのはレジストラの都合だ。 IE からすれば、言われなければ知ったことではない話でもある。

同じことは、都道府県型 JP ドメインの話だけではない。

例えば Github Pages が使う `github.io` は、 `jxck.github.io` のようにユーザごとにサブドメインが割り当てられる。ホスティングサービスの Glitch が使う `glitch.me` もアプリごとにサブドメインが振られる。

こうしたサブドメインのサービスが Cookie を持つ場合同じ問題がおこるので、 `github.io` や `glitch.me` も eTLD として扱わなければならないのだ。これはいちサービスが提供する機能の都合だ。

さらに、少し前に TLD 自体が爆発的に増え、その上で運用される同様のサービスも増えたが、それらすべての eTLD 運用を把握できてないと、そのブラウザではバグとされてしまう。

そこで、最も現実を追従できている Mozilla の PSL が他のブラウザでも徐々に採用されるようになり、 IE の都道府県型 JP ドメインの問題も PSL への移行をもって解決した。


### PSL のその他の用途

PSL の説明によれば、 Cookie 以外にもブラウザが「履歴をドメインごとに並べる」「URL バーで重要なドメインを表示する」など、 UI がドメインを扱う上で活用されている。

しかし、近年これが一番ハイライトされた例に Same Site Cookie がある。 "Same Site" という概念は、 **eTLD+1 が同じ** であると新しく定義されたのだ。

これは、先の例で言えば `github.io` が eTLD で `jxck.github.io` が eTLD+1 にあたる。したがって `jxck.github.io` と `cdn.jxck.github.io` はドメインが違えど eTLD+1 が同じなので Same Site となる。

対して `jxck.github.io` と `www.github.io` は同じ `github.io` のサブドメインであるように見えながら eTLD+1 が違うので Cross Site となる。

すると「`github.io` 自体の Cookie はどうなるのか?」というと、 PSL に登録したドメインは TLD と同じように扱われるため、 `Domain=com` な Cookie が付与できないのと同じく `github.io` な Cookie は付与できない。(したがって https://github.io には何もデプロイされてない)


### PSL の運用

もともとは Mozilla の bugzilla で管理されていたものが Github に移され、今ではそこにリクエストを出せば良くなったという点で事実上一本化されている。

しかし、出す側は良いとしても中にいる人は実はほぼボランティアであり、しかも非常に少ない。

同じように審査と登録をするレジストラや CA のような運用ではなく、人が手作業でボランティアでこの重要なリストをメンテナンスしているのだ。

[Issue](https://github.com/publicsuffix/list/issues) を見てみるとアクティブに Assignee になっている人は 2,3 人しかいないようだ。

ホスティングサービスのように、サービスがユーザにサブドメインを振る形態も増えているため、リクエストは定期的にあるようだ。

さらに、近年は TLD 自体が増えていることもある程度は影響があるのかもしれない。


## PSL 追加リクエストの増加

ここからが本題だ。

近年、そんな厳しい運用によってメンテナンスされている、非常に重要なファイルに対して、追加リクエストが頻発し問題になっている。

- [New interaction between iOS 14 and Facebook Pixel causing increase in PSL inclusion requests - Issue #1245 - publicsuffix/list](https://github.com/publicsuffix/list/issues/1245)

- [High volume of requests to add domains to the PSL - Issue #78 - privacycg/private-click-measurement](https://github.com/privacycg/private-click-measurement/issues/78)

以降、ここでまとめられている問題を順に解説する。


### iOS14 と Facebook Pixel 問題

まず、 iOS 14.5 以降でトラッキングをする際は、 AppTrackingTransparency(ATT) を通じた許諾の取得が必須となった。

- [ユーザーのプライバシーとデータの使用 - App Store - Apple Developer](https://developer.apple.com/jp/app-store/user-privacy-and-data-use/)

周知の通り、この変更は多くのトラッキングサービスに影響を与え、その 1 つに Facebook Pixel がある。

- [AppleのiOS 14リリースが広告やレポートに及ぼしうる影響 \| Facebook Businessヘルプセンター](https://www.facebook.com/business/help/331612538028890?id=428636648170202)

そこで Facebook Pixel は Aggregated Event Measurement(AEM) への以降を促した。

- [合算イベント測定について \| Facebook Businessヘルプセンター](https://www.facebook.com/business/help/721422165168355)

AEM ではドメインごとに 8 つまでしかコンバージョンイベントが設定できないため、多くのイベントを設定してたユーザにとっては厳しい制限となる。

ところが、このドメインの定義は PSL をサポートしているため、 eTLD+1 単位で設定ができることがガイドラインに明記されているのだ。

つまり、保有しているドメインが eTLD+1 だとそのサブドメイン含め 8 個に制限されるが、そのドメインが eTLD になれば、そのサブドメインが各々 8 個のイベントを設定できることを意味する。

FB のアナウンスは「ワークアラウンドとして PSL の追加がある」と、特に PSL をよくわかってないマーケターに示しているような状況になっているのだ。


### PSL リクエストの例

案の定 iOS および Facebook が当該アナウンスをしてから、その対応を理由にした PSL 追加の PR が増えている。

中には、「そのサブドメインにクライアントが何かをデプロイしている」といったプラットフォームからの、いわゆる正統なリクエストもあれば、単にトラッキング制約を回避したいがためだけのリクエストもある。

前者は対応されつつも、後者は棄却されたり、一時的に追加を凍結するといった対応が取られている。

単にリソースが足らず(最近は実質一人で対応しているように見える)手が回ってないという理由もあるが、そもそも PSL への追加は FB が示した

https://github.com/publicsuffix/list/issues/1245#issuecomment-818050711











AppleのiOS 14リリースが広告やレポートに及ぼしうる影響 | Facebook Businessヘルプセンター
https://www.facebook.com/business/help/331612538028890?id=428636648170202
AppTrackingTransparency に基づく Facebook Pixel ユーザへの注意喚起とガイドラインが FB から公開された
https://developer.apple.com/jp/app-store/user-privacy-and-data-use/
ATT の影響があっても効果的な広告が提供できるように Aggregated Event Measurement を提供することに
https://www.facebook.com/business/help/721422165168355
これを使うにはドメイン認証が必要になる
https://www.facebook.com/business/help/245311299870862
ドメイン認証は eTLD + 1 の範囲で Public Suffix List を見る
その結果、 PSL への追加リクエストが急増している
https://github.com/publicsuffix/list/issues/1245
FB も FB Pixel のために PSL 追加リクエストをすることは推奨しないと書いてはいる
PSL のメンテナンスはボランティアベースなので困っている


















## Outro

deadbeef


## DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/>


## Resources

- Spec
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
- Presentation
- Issues
- Other

