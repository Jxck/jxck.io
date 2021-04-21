# [standards][web] Web 技術の調査方法


## Intro

「新しい API などを、どうやって調べているのか」「仕様などを調べる際に、どこから手をつければ良いのか」などといった質問をもらうことがある。

確かにどこかに明文化されていると言うよりは、普段からやっててある程度慣れてきているだけなものであり、自分としても明文化していなかったため、これを機に解説してみる。

やり方は一つではない上に日々変わっていくだろうが、頻繁にこの記事を更新するつもりはない。また、筆者は実務で必要になるというよりは、ほとんどを趣味でやっているため、このやり方が合わない場面は多々有るだろう。

スコープとしては、ライブラリ、ツール、フレームワークなどではなく、 Web プラットフォーム関連の標準やブラウザの実装状況などに限定している。


## Scope

従来からあり、広く認知された API については、情報も多く調査の敷居はそこまで高くないため、今回は議論が始まって間もない新しめの API になどについて、現時点でどういう状況なのか、仕様の議論はどう進んでいるのか、実装はどうなのか、といった部分を調査するような場面、つまり *点で調べる* 場面にフォーカスする。

直近だと [WebCodecs の記事](https://blog.jxck.io/entries/2020-09-01/webcodecs-webtransport-chat.html) がそのケースにあたるので、これを例に解説する。

一方、普段から流れ(トレンドと言っても良い)を把握するという意味で、 *線で調べる* 方法は以前解説した以下が参考になるだろう。

- [Monthly Web の作り方 2018 年版](https://blog.jxck.io/entries/2018-07-18/how-to-logging-monthly-web.html)


### Chrome Platform Status

まず最初に、現状を把握する意味では Chrome Platform Status のページがある。元々は名前の通り Chrome だけの Status だったが、ここは [Web の Status](https://groups.google.com/a/chromium.org/g/blink-dev/c/R8oZsw6RLGs/m/l0KOUyuWAQAJ) として今後も他のブラウザ実装も含めて整備される流れのようだ。

- <https://www.chromestatus.com/feature/5669293909868544>

これが現状だけを示す意味で最もスッキリまとまっている。

しかし、もう少し議論も含めて把握するために、筆者は Intents からたどることが多い。

(なお、最近の Intents は Chrome Platform Status から生成されるらしい)


### blink-dev

WebCodecs の場合は、 Google が提案/実装を主導しているため、 blink-dev で進捗がわかる。

- [blink-dev \| Google Group](https://groups.google.com/a/chromium.org/g/blink-dev)

この ML は、主に Chrome のエンジンである blink の開発に関するアナウンスが行われている。

大抵の新しい API は Chrome が何かしら作業をしている場合が多いので、まず blink-dev から当たると何かしら取っ掛かりが得られる。

ちなみに、筆者はブラウザのカスタム検索エンジンとして blink-dev を登録しているので、ブラウザに "blink-dev" と打つだけで検索できるようにしている。

![blink-dev をカスタム検索エンジンとして登録](custom-search-engine.png#681x233 'custom-search-engine')

ここで WebCodecs を検索すると関連しそうなスレッドがいくつか見つかる。

![blink-dev で WebCodecs を検索した結果](blink-dev-search.png#748x525 'blink-dev webcodecs search results')

まず、これらスレッドのタイトルについている "Intent to ~" という部分が、マイルストーンを示しており、だいたい以下の順で投稿される。

- *Intent to Prototype/Implement*
  - この機能について実装に着手する
  - 関連するドキュメントや議論に関するリンクがまとめられている。
  - Canary などでは作り途中のものが試せる場合がある
  - 以前は Implement だったが最近 Prototype に名前を変えたのでまだ名残がある。
- *Intent to Experiment*
  - 実装がある程度形になったのでトライアルを開始する
  - Chrome Dev/Beta でフラグ付きで有効にできる
  - Origin Trials が開始される
- *Intent to Extend Origin Trials*
  - Origin Trials を延長する
  - Origin Trials は期限を決めて開始されるが、十分なトライアルが済んでない場合など
- *Intent to Ship*
  - トライアルで十分にフィードバックが集まり実装も固まったので、リリースする
  - コンセンサス、具体的には他の開発者から LGTM が 3 つが得られれば良いというルール
  - その後 Chrome Stable リリースに入る
- *Intent to Deprecate*
  - なんらかの機能を非推奨/無効にする
- *Intent to Remove*
  - Deprecate が完了したためコードを消す

(あくまで Intent なので、例えば Intent to Ship が出たら「Ship された」ではなく、「Ship しようと思う」という意味であることに注意)

もし該当の機能で何かしらヒットすれば、そこから調査を始めるのがわかりやすいだろう。

WebCodecs の場合は、 Intent to Experiment まで出ているので、実装は進みトライアルが始まろうとしていることがわかる。

- [Intent to Experiment: WebCodecs](https://groups.google.com/a/chromium.org/g/blink-dev/c/7OdxQf5HnlQ/m/oyb3oFVaAAAJ)

また、その中で以下のような情報が入っている。

- Explainer:   <https://github.com/WICG/web-codecs/blob/master/explainer.md>
- Design docs: <https://docs.google.com/document/d/1fw3_aMB0-q9hOMuz_lxE8kEd-Z7vjA0wtklpx77m4yw/edit>
- TAG review:  <https://github.com/w3ctag/design-reviews/issues/433>
- Draft Spec:  <https://wicg.github.io/web-codecs/>

これが調べていく起点となり、 Intents が見つからなかった場合は、仕様のリポジトリなどを探すことになる。

中身を順に解説していく。


## Explainer

新しい仕様が提案されるとき、まず最初に「こんな機能が欲しい」という概要とモチベーションを説明する *Explainer* が作られる。

特に置かれる場所もフォーマットも決まってないため、 Google Docs, GitHub, Issue, ML, [Discourse](https://discourse.wicg.io/) の投稿だったりすることもある。

いきなり仕様や実装を読むよりも、その仕様の概要を抑えるという意味では、まずこの Explainer を探して読み、概要を把握するのが良いだろう。

WebCodecs の場合は以下だ。

- Explainer: <https://github.com/WICG/web-codecs/blob/master/explainer.md>


## Design Docs

Chrome の場合、実装に着手する前に、どういう方法で実装を入れる予定なのかを Design Docs という形でまとめることが多い。

これがレビューされてから実装に着手することになるので、作られる場合は Intent to Prototype の時点では用意されているだろう。

ただ、この内容は実際に実装を行う上での話、つまり C++ での設計の話が中心なので、よほど細かい点を調べる場合以外、あまり見る必要は無い。

また、 Google 内部でしか見れないように非公開になっている Docs が多々あり、その場合は権限をリクエストしても付与されることはほとんどない。


## Tag Review

W3C の Tag (Technical Architecture Group) というグループのレビューを指す。

要するに、 Web 標準のエキスパートたちによるレビュープロセスで、これを通すのが基本だ。

- <https://github.com/w3ctag/design-reviews/issues/433>

GitHub の Issue で行われており、セキュリティや互換性など、様々な側面からレビューがされるため、 API にどういう懸念があり、どう解決したのかなどがわかる。


## Positions

最近は新しい API の提案が Chrome から出ることが多いが、標準化と普及のためには、他のブラウザや開発者がどう考えているかという Position も重要であり、 Intents にも書かれることが増えた。

従来は、どこかのミーティングや ML でのログなどのリンクが貼られていたが、最近は情報ソースとして Standard Positon が使われることが多い。


### Mozilla Standard Position

Mozilla の Position についてまとまったダッシュボードがある。

- <https://mozilla.github.io/standards-positions/>

元々は、 Chrome が進めている仕様に対して明確な No(Harmful) を示すために作られた印象があるが、今では様々な仕様のポジションがわかって便利だ。

ポジションのリクエストは誰にでもできるので、まだリストにないもので、 Mozilla がどう考えているかを知りたい場合は、 Issue を立てるところから始めることができる。

- <https://mozilla.github.io/standards-positions/#web-codecs>

逆に Issue を探してログを読めば、 Mozilla のスタンスがより細かく把握できる。


### Webkit Position

Safari の場合は特にページが有るわけではなく、主に webkit-dev の ML で、 Chrome 開発者が "Request for Position" というタイトルの投稿をして聞いているというのが現状だ。

なので、基本的に Chrome 開発者が必要に応じて投げており、網羅性はそこまでない。解答も付いたり付かなかったり、付いても Apple の人間では無いっぽい人のコメントだったりと、気をつけるべき点が多い。

- <https://lists.webkit.org/pipermail/webkit-dev/2020-May/031191.html>

筆者は、キーマンとして "Ryosuke Niwa" さんの返事に注目している。


### Developer Position

よく `Developer: Positive` と書かれている Intents を見るが、誰がどこで賛同したのか不明なものが多い。


## Spec

仕様は、 IETF なのか W3C なのか TC39 なのかによって違うが、ある程度規定されたフォーマットで書かれているだろう。

しかし、決まったフォーマットに落とす前に、例えば API Interface だけを Explainer の延長で GitHub に書いたりすることもあるので、一概にどこにあるとは言い切れない。

IETF, W3C/WHATWG, TC39 それぞれの見方の概要について解説していく。


## IETF

主に Internet Protocol に関する策定を行う組織なため、 HTTP3 や QUIC などのプロトコルはここで議論/策定される。


### RFC

例えば WebSocket の場合で見てみよう。 WebSocket は既に RFC になっており RFC6455 がそれにあたる。

- <https://tools.ietf.org/html/rfc6455>

RFC が出ていればそれを読めば良い。が、読み始める前にかならず確認すべきヘッダが 3 つある。

- Errata Exist
  - GitHub でいう Issue ページ、 RFC が出た後に見つかった誤字脱字や仕様のバグなどが報告されている。
  - RFC 自体は一度出たら修正されないので、ここに Errata が溜まったら、別の RFC として更新版が出るが、なかなか出ないものが多い。
  - 特にこれから実装しようとか、仕様の細部を確認するような場合はかならず確認するべき。仕様が常に正しいとは限らない。
  - 逆に仕様で間違ってたり誤字脱字を見つけたらここから報告する。
- Obsolute by
  - このリンクがある場合は、この仕様の改訂版があり、それによりこの仕様が古くなったことを意味する。
  - 基本は最新版を見ればよい。
- Updated by
  - Obsolute ではないが、部分的に改定したものや、拡張の RFC があることを示す。
  - RFC6455 WebSocket の場合は、 RFC8443 Bootstrapping WebSockets with HTTP/2 などが Update している。
  - 必ずしも Update 先を見るとは限らない。

![RFC6455](RFC6455.png#748x324 'RFC6455')

また、ヘッダ部分 `[draft-...]` のリンクをクリックすると過去のドラフトを見ることができる。新しい技術を調査するのであれば、まだ RFC は出ていないと思われるため、ドラフトの見方も確認しておこう。


### WG Draft

RFC6455 の 1 つ前のドラフトは以下だ。

![draft-ietf-hybi-thewebsocketprotocol-17](hybi-thewebsocketprotocol.png#748x379 'draft-ietf-hybi-thewebsocketprotocol-17')

- <https://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-17>

これは、 WebSocket を策定する Working Group である Hybi (hypertext bidirectional) で議論された RFC になる前のドラフトだ、バージョンが 00 ~ 17 まであり、 18 相当が RFC になったことがわかる。

URL を見ると、 IETF の hybi が策定している the websocket protocol の v17 であることが読み取れるだろう。

ドラフトを見たときにまず最初にやるべきことは、そのドラフトが最新かどうかだ。古いドラフトには新しいドラフトの数字リンクがない場合がある。しかし、ドラフトの URL は最後が必ずバージョン番号で、ここ(`-17`)を省略すると自動で最新にリダイレクトされる仕組みになっている。読んでたのが古かったということがたまにあるので、筆者はとりあえず最初にそれをやる癖をつけている。


### 個人 Draft

そのヘッダ部分には、更に古いドラフトへのリンクがある。

![draft-hixie-thewebsocketprotocol-76](hixie-thewebsocketprotocol.png#748x447 'draft-hixie-thewebsocketprotocol-76')

- <https://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-76>

これは、 Hybi WG で議論する前に WebSocket の最初のデザインを書いた Hixie (Ian Hickson) 個人のドラフトだ。

このようにドラフトは最初個人が書き始め、議論を重ねた結果 WG で扱うべき(みんなで広く議論すべき)となったら、 WG のアイテムとして採用される。


### ドラフトの状態

ここまでのことがわかると、例えば以下のようなドラフトを見たときに読み取れる情報はこうなる。

- <https://tools.ietf.org/html/draft-ietf-quic-http-32>

![draft-ietf-quic-http-32](quic-http.png#748x384 'draft-ietf-quic-http-32')

- QUIC WG で議論されている
- HTTP3 のドラフトで v32 まで更新されいる
- 元々は Google の R Shade が書いていたが、今は Akamai の M Bishop が Author

特に WG の把握は、後述する議論の場所や IETF のまとめを探す際などに重要だ。


### 議論の場所

ヘッダ上部にある `[WG]` というリンクから QUIC WG の作業全体が把握でき、そこにある `[List Archive]` というリンクが ML になる。

IETF は基本的には ML で議論行われ、ここを遡るとどんな議論があるのかわかる。全部見るのが大変な場合は、ドラフトに関わるキーマンを見つけ、その人の返信を見るだけでも役に立つ。

- <https://mailarchive.ietf.org/arch/browse/quic/>

また QUIC のドラフトには、ドラフト内に GitHub へのリンクがあるように、最近は GitHub で管理されることも増えた。

- <https://github.com/quicwg/base-drafts>

GitHub の運用はドラフトによってまちまちで、 Issue / PR を受け付けるものや、単なるホスティングで議論は ML でやるように促すものもあるので、 README をよく読んでから行動したい。


### IETF MTG

IETF は、年に 3 回みんなで集まって議論する総会を開催している。参加料さえ払えば誰でも出られるが、少し追うくらいなら、 WG のミーティングのログを追う方法を抑えておくとよいだろう。

ちょうど今 IETF109 がオンライン開催されており、 IETF のページからそこに飛ぶ。

- <https://www.ietf.org/how/meetings/109/>

そこに `Agenda (HTML)` というリンクがあるので、ここでスケジュールがわかる。 WG によっては IETF でミーティングを開催しないこともあるので、必ずあるとは限らない点には注意したい。

QUIC であれば以下のようにアレンジされていることがわかる。

- <https://datatracker.ietf.org/meeting/109/materials/agenda-109-quic-00>

開催方法も WG によってさまざまだが、基本は開催前に Agenda(予定表) と開催後に Minutes(議事録)が出るのは大体共通している。 Minutes には使われたスライドのリンクなども載るので、とにかく Minutes を探せば直近までの議論のまとめがわかるだろう。


## W3C/WHATWG

主にブラウザ API に関して策定される組織なため、 HTML や CSS から、 Service Worker や CSP といった様々な API が議論策定されている。ここは API が多岐にわたるため、探すのは少し慣れが必要だ。

慣れない人に一番オススメなのは MDN の仕様へのリンクを見ることだ、例えば CSP のページを見てみるとこのように関連仕様へのリンクがまとまっている。

- <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy>

![MDN CSP のページ下部にある仕様へのリンク集](mdn-csp.png#748x398 'MDN Spec Link')

もし MDN にエントリがあるならこれが一番簡単な方法だろう。

新しいドラフトは大抵 GitHub で管理されてるので、 MDN にエントリのないものは、検索して GitHub のリポジトリなどを探すと良い。


### Draft

W3C の Draft には段階があるが、解説すると長くなるので、良くわからなければとりあえず最新を見ておけば良い。(逆に中途半端に古いものを見ても良いことはあまりない)

ドラフトを見るとき、まず最初にするのはヘッダ部分の確認だ。

![CSP v3 Draft の Header 部分](cspv3.png#748x620 'CSP v3 Draft Header')

例えば CSP で言うと、検索すると以下の様にいくつかの URL が見つかるかもしれない。

- <https://www.w3.org/TR/2016/WD-CSP3-20160913/>
- <https://www.w3.org/TR/CSP3/>
- <https://w3c.github.io/webappsec-csp/>

w3c には仕様にスナップショットを打つプロセスがあるが、とにかく最新を見たい場合は、ヘッダにある `[Editor's Draft]` というリンクの URL を見ると良いだろう(上のリストだと最後のもの)。これが、著者が作業している Working Copy となる。

また、ここで GitHub のリポジトリも確認できることが多い。


### WG

CSP の場合は Feedback のところに `public-webappsec` と書かれていたが、これが W3C における Working Group になる。

- <https://www.w3.org/2011/webappsec/>

ここにいくと、他のドラフトや ML のリンクが探せるだろう。

Working Group のリストは以下にある。

- <https://www.w3.org/groups/wg/>

名前からだいたい何をやってそうかわかるだろう。


### WICG

前述の WG にまだ属してないもの、もっと早い段階のものは、個人が提案として書いて、その後に WICG という Incubation のグループで議論されることもある。

例えば WebCodecs はまだ WG が無いため WICG で管理されている。

- <https://wicg.github.io/web-codecs/>

WICG のリポジトリは全部 GitHub にあるため、ここは比較的新しい仕様が集まっていることになる。(Portal, Display Locking, WebUSB etc)

- <https://github.com/wicg/>

WICG でもう 1 つ知っておきたいのが Discourse だ。

- <https://discourse.wicg.io/>

ここは、質問や提案をわりと自由にできるフォーラムになっており、例えば「こういう仕様が欲しい」とか「これについて聞きたいけどどこで聞けばいいかわからない」といった場合に、とりあえずここに投げてみると良いだろう。


### TPAC

TPAC は一年に一度開かれる W3C の総会だ。 W3C は会員じゃないと入れないため、自分の所属する会社が会員だったりしない限り参加は難しい。しかし Minutes や Slide は基本的に公開されるため、議論を追うことは可能だ。

TPAC のスケジュールのページを見つけると良い。

- <https://www.w3.org/2020/10/TPAC/breakout-schedule.html#calendar>

あとは見たいトピックの会議の Minutes を見つければ、スライドのリンクなどもあるだろう。


## TC39

TC39 は ECMA262 の Working Group であり、要するに JS の仕様を議論している。新しい機能という観点では ECMA262 に取り込まれる前の Proposal とその議論を追うことになるだろう。

TC39 は IETF や W3C より規模が小さく、情報もまとまっているため、見るべき場所はシンプルだ。


### Proposals

機能の提案は以下のリポジトリで管理されている。

- <https://github.com/tc39/proposals>

Stage が 0 ~ 4 まであり、以下のようになっている。

- <https://tc39.es/process-document/>

特に Stage 4 になる条件として、最低 2 つの実装が必要なので、例えば v8 だけで動いても 4 にはならない。他のベンダに実装の意図が無ければそこから先に進まないこともありえる。

策定が進まなければ [Inactive](https://github.com/tc39/proposals/blob/master/inactive-proposals.md) として終わっていくので、 Stage に載ってるものが(たとえ Stage 3 でも)そのまま ECMAScript の仕様に入るとは限らないため、記事やブログを書くときは注意したい。


### ECMAScript

Stage 4 を卒業すると、 ECMA262 の仕様に取り込まれる。現在は年 1 回更新され、例えば今年なら ES2020 といて公開された。

この時点では少なくとも 2 つの実装では動いてるはずだが、全てのブラウザで動くといった保証があるわけではない。


### TC39 Meeting

TC39 のミーティングは以前は奇数月に開催されていたが、作業が増えたため人を増やし開催が増えている。

いつ開催するかは、 Agenda のリポジトリを見るとわかる。

- <https://github.com/tc39/agendas>

ここで、議題などが把握できる。

終わったら、 Minutes が以下に公開される。リポジトリが別なこととちょっとラグがあることには注意だ。

- <https://github.com/tc39/notes>

ミーティングで作業が進めば、 Stage の変更がある。そのあたりも note から確認できる。


## 慣れ

正直、ある日突然必要になって調べ始めるにはなかなか難しいところもあるかもしれない。ある程度広まっているものを概要レベルで調べるなら Google 検索で済むだろうが、新しい仕様を細かく調べるには検索はあまり役に立った記憶がない。

そして、慣れれば慣れるほど逆に情報が過多になり、消化しきれなくなる。上手く減らすために、誰の発言かなどのフィルターだったり、どのタイミングでの議論かなど、暗黙知もたくさん有る。

本ブログでは、新しい API について書くような場合は、記事の下部にここで紹介したようなリソースへのリンクを含めるようにテンプレートを作っているので、その辺も参考になるかもしれない。

![記事の下部に含めている参考リンク集](blog-resource-link.png#748x698 'blog-resource-linik')
