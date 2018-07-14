# [monthly-web][mozaic.fm][podcast] Monthly Web の作り方 2018 年版

## Intro

自分がやっている Podcast である mozaic.fm の中で、 Monthly Web という月ごとの Web をまとめるという回をやっている。

未だに落ち着いたとはいえないが、 2017 年 7 月に初めてから 1 年続けたので、結果として現状どうなっているかをログに残す。


## Monthly Web

mozaic.fm は、 Web について「**今何が起こっているのか**」「**これからどうなっていくのか**」を議論するための Podcast である。

そこでは、ゲストをお呼びし、特定のテーマについて議論をするということを行ってきた。

しかし、このテーマの設定と消化よりもよほど早い勢いで、多くの重大なトピックが日々生まれており、その大局的な流れを扱うことはできないかずっと考えていた。

通常回が「**縦を深く掘る**」議論であるとすれば、「**横の流れを繋ぐ**」部分の議論を行うことができれば、議論するコンテキストをより補完することができるだろう。

そこで、月に 1 度、その月の流れをまとめるということを始めた。

目的は、速報ではないため、単なるニュースのまとめをするというよりも、そこまでにあった流れをまとめながら *Web のスナップショット を取っていく* ようなイメージだ。

最初の公開で、当時のモチベーションをまとめている。


[ep25 Monthly Web 201707 \| mozaic.fm](https://mozaic.fm/episodes/25/monthly-web-201707.html)





## 対象

厳密な基準は無いが、主眼としては **仕様の変化** と **実装の変化** の 2 つの側面に絞ることにした。

仕様は IETF, WHATWG, TC39 を主とし、実装は Chrome, Firefox, Safari, Edge の 4 ブラウザを主とした。

それ以外の情報は、周辺動向として適宜まとめた。このように雑多に入れられる項目は負荷を下げる上で重要だ。

周辺動向の中で、特にセキュリティ系(インシデント, CVE, 新しいヘッダや API etc) の話題が多く感じられたので、途中でセキュリティ動向にわけることにした。


- 実装の変化
  - Chrome
  - Firefox
  - Safari
  - Edge
- 仕様の変化
  - WHATWG/WC3
  - IETF
  - TC39
- セキュリティ動向
- 周辺動向
- イベント動向

各動向のまとめ方などについて記す。



## Chrome 動向

### Overview

Chrome は Intents や Blog など、アウトプットが充実しているので追いやすい。

また、他のベンダと比べても、投入するリソースやバジェットが多いためか、アップデートの相対流量が多いため Monthly Web の中では自然と扱う量が増える。

Chrome の Stable は 6~8 週間程度でリリースされるため、 Montly Web には入らない月もある。

大きなイベントとしては、 Google I/O や Chrome Dev Summit があるが、 Web はプロダクトではないため、初めて聞く話はあまりない。


### Intents

実装の進み具合については基本的には ML の Intents を追うのが一番手軽だ。

<https://groups.google.com/a/chromium.org/forum/#!forum/blink-dev>

例えばある機能 A の実装に着手する場合は "Intent to Implement A" という投稿があるといった具合だ。

Intents は以下のようなバリエーションがある。

- Ship: (Stabel に Ship する)
- Implement: (実装に着手する)
- Implement & Ship:
- Experiment: (OriginTrial などでフィードバックを集める)
- Change: (仕様への整合などで変更を入れる)
- Unship: (仕様やセキュリティ的な理由で無効化する)
- Remove: (所定のプロセスを経て消せる状態になった機能を削除する)

Intents のまとめは以下にある。

<https://bit.ly/blinkintents>


Intents を追うことで、「この機能は実装できるところまで仕様が仕上がったんだな」「Origin Trials 始まったな」「そろそろリリースか」などといった部分がわかる。

また、本文にはモチベーションや仕様へのリンク、他ブラウザのシグナルなどもまとまっており、フィードバックのレスもつくため、議論も追いやすい。

(シグナルの中には他のブラウザ以外に developers という項目が有るが、基準がよくわからないのであまり好きではない)

Intents がなければ、コミットログをつぶさに追うか、リリースノートで後から知るかのどちらかしかなかったが、 Intents を追えば重要なチェックポイントで現状が把握できるため、追う負荷が下がり助かっている。


### Team Snippet

Blink の開発は、スコープごとにいくつかのチームに分かれている。

チームによっては、 [blink-dev の ML](https://groups.google.com/a/chromium.org/d/forum/blink-dev) に週報的なものを投稿している場合があり、そこを見るとどんな仕様/実装に取り組んでいるかが伺える。

最近はこの辺を眺めている。

- Loading Team(blink-dev)
  - 名前通りの Fetch 周りから派生して SW や WebPackaging などに取り組んでおり、気になる話題が多い
- Platform Architecture Team(blink-dev)
  - OOM と戦ったり、 scheduling 見直したり、 binding を改善しているイメージだが、難しくてわからないことが多い。
  - たまに [Form Lifecycle](https://docs.google.com/presentation/d/1W5f3fEl56EqOuvbgf5-emofV6doy62zX_anmSBL_clE/edit#slide=id.p) や [EventHandler](https://docs.google.com/document/d/1CI04yH8tyVl_GRNyQMvl6UqdZE2GVB4CqeOZQDl4NAs/edit#heading=h.b6lmjg5qipla) など、細かくも重要な改善をしている縁の下の力持ち
- Layout Team(layout-dev)
  - Houdini 周りや LayoutNG などに取り組んでいるはずだが、最近アップデートが無く寂しい。
- HTML/DOM Team(blink-dev)
  - 最近全然更新が無いが、 HTML Tag の実装や WebComponents 系をやっていた気がする。
  - どこかに移って続いてるのだろうか?


ここでは主に blink-dev を中心に見ているが、 [ML](https://www.chromium.org/developers/technical-discussion-groups) 自体が複数あるため、他のチームも他の ML で snippet を出してるかもしれない。

(自主的な運用のようなので、投稿はまばらで来ない週も多い)


### Release Blog

実装された機能は Canary, Dev, Beta を経て Stable リリースされる。

リリーススケジュールは以下で確認できる。

- https://www.chromestatus.com/features/schedule


Beta あたりまで来ると、アップデートエントリが Chromium のブログに来る。

- https://blog.chromium.org/

ここで、 Intents の結果、次の Stable に入るおおよその変更が把握できる。

Stable リリースのタイミングでは、 "New in Chrome" と "Deprecation Removable" エントリが Google Developers Blog に上がる。

- https://developers.google.com


(Intents から追っていると、数カ月間その議論を追うことになり、知らぬ間に「もう普通に使えるもの」と錯覚してしまうことがあるため、 Stabel リリースで認識を補正する必要がある)

ここまでは、主に標準よりの実装に注目しているため Chrome 自体の新しい機能の解説や、挙動の変更などに関しては、エントリでフォローしておく。

ブログは後に日本語翻訳されることもあるが、原典で扱っているため含めていない。



### Events

Web に関わる大きめのイベントとしては、 Google I/O, Chrome Developer Summit, Blink-On などがある。

Web 自体は製品ではないため、 I/O で知る内容は Chrome 新機能や Google が推したい分野がどこなのか、が多い。

最近、 Android や GCP など大きめなトピックは、 I/O とは別でやりはじめ、その流れもあって DevSummit や Blink-On の方が細かい話が多い。

同様に Polymer や AMP なども、独自のサミットを開催する場合があり、細かいものも含めるとイベントは結構多い。

スライドや録画が出た時に、気になるものだけまとめている。


### V8

V8 も、アップデートのタイミングでブログがあがるため、これも含めている。

- <https://v8project.blogspot.jp/>

ES の仕様の実装状況だけでなく、内部のパフォーマンス改善などの解説も面白い。


### Other

他にも気になるものがあれば Other にまとめている。
AMP や Firebase でも、気になるアップデートがある場合は混ぜることもある。

- https://developers-jp.googleblog.com/
- https://www.chromestatus.com/features
- https://developers.google.com/web/updates/
- https://www.chromestatus.com/features/schedule
- https://www.chromium.org/developers/calendar
- https://chromereleases.googleblog.com/
- http://feeds.feedburner.com/GoogleOnlineSecurityBlog
- https://chromestatusdeck.com/
- https://www.chromium.org/getting-involved/dev-channel
- https://amphtml.wordpress.com/



## Firefox 動向

Chrome に次いでアウトプットが多い。

Bugzilla の流量が多いが、全部追うのは時間的に厳しいため、 Intents や Release Note でカバーしている。

Intents は Chrome と似た運用だが、カバー率が低く Intents なしでリリースされることもあるように思う。

ブログでは Web だけでなく Internet の話題、例えば NetNewtrarity なども積極的に出してくるが、政治や法律などレイヤの高い話題は Monthly Web では省いている。



### Intents

Chrome と同じような Intents が運用されている。

Intents のカバー率は低いように感じるが、やはりそこが一番手軽だ。

- https://groups.google.com/forum/#!msg/mozilla.dev.platform/


Experimental な機能は以下にまとまっている。

- https://developer.mozilla.org/en-US/Firefox/Experimental_features
- https://platform-status.mozilla.org/

### Release Blog

リリースのスケジュールなどは以下にある。

- https://www.mozilla.org/en-US/firefox/releases/
- https://wiki.mozilla.org/RapidRelease/Calendar

リリースノートは以下にある

- https://developer.mozilla.org/en-US/Firefox/Releases


メジャーアップデートなどは、以下のブログにエントリが出る

- https://blog.mozilla.org/
- https://hacks.mozilla.org/


Nightly News には、 "These Weeks in Firefox: Issue NN" というシリーズのエントリが上がる。

ここでは Nightly で進行している実装の進捗などがまとまっている。

濃く長いことが多いため、全部読めない月も多いが、 Highlight を眺めるだけでも次の Stable で入りそうな変更などが伺える。

- https://blog.nightly.mozilla.org/



### Site Compat

互換性に関わる変更がある場合 sitecompat というサイトが更新される。

- <https://www.fxsitecompat.com>

ボランティアベースではあるが、 Intent to Remove 系との関わりや影響が確認できる。

古くからある機能の削除や、挙動変更のアナウンスで「そんな機能あったのか」と知ることが多い。


### Event

Mozilla の場合は一番目立つのは Mozilla Festival だろう。

- <https://mozillafestival.org/>

Web に限らず Decentrarization や Net Neutrality といった、レイヤの高い話も多い。

Web についても、 Web Literacy や HTTPS Everywhere のような啓蒙が多いイメージがある。


### Other

最近、新しい仕様などに対して Mozilla がどういうスタンスを取るのかという表明がまとまったページができた。

- <https://mozilla.github.io/standards-positions/>

ここを見ると、まだ Intent も出ていない仕様がどうなりそうかがなんとなくわかる。

Github に issue を上げると、それについて表明を追加してくれるため、「あの機能はどうなんだろ」と思ったら投げて見ると良い。

他にも Mozilla は広い視点で示唆に富んだブログが上がることがおおいため、必要に応じてフォローしている。


## Safari 動向

### Overview

Safari 自体のメジャーアップデートが年 2 回しかないため、基本は Technology Preview を追うことになる。

普段のアウトプットが Chrome, Firefox などと比べて少ない分、 WWDC なども面白いセッションがぽろっと出たりする。

Technology Preview よりももう一段粒度の細かい Intents 的なアウトプットがあると助かるなとは思うが、そうなるとコミットログを全部追うしかいない。


### Safari Technology Preview NN

Technology Preview は、不定期(月0~3回程度?)にリリースされ、そのブログが主な情報源となる。

- https://webkit.org/blog/
- https://developer.apple.com/safari/technology-preview/release-notes/
- https://developer.apple.com/library/archive/releasenotes/General/WhatsNewInSafari/Introduction/Introduction.html

TP では、仕様の早い段階の実装が突然入ったり、ドラフトすらない実装ががいきなり入ったりと、若干ハイコンテキストなときもある。

(Cross-Origin-Resource-Policy など)

気になるところは、チェンジセットへのリンクを辿ることで補完できるため、チェンジセットをつぶさに追う負荷が減る。


### ChangeSet

Intents などが細かく出ないため、チェンジセットを追う必要がある場合もある。

気になる機能の動向は、担当している人を把握し、その人のアクティビティを追う感じになるだろう。

- https://trac.webkit.org/timeline


### Blog

Safari 特有の実装や、割と細かい機能解説、中の人がみなぎった結果出てきた論文のような文書など、色々とブログが上がるので参考になる。

- https://webkit.org/blog

逆を言えば ITP などは、このブログくらいしか表立ったアウトプットが無く、その次はソースコードレベルとなる場合もある。

Chrome ほどガイドライン的なドキュメントが整備されていないので、ブログの重要度は高い。

ブログにはコメント欄が無いため、 Twitter で [書いた人](https://twitter.com/jonathandavis) や、 [答えてくれそうな人](https://twitter.com/rmondello) に質問をしている光景をよく見る。

そのため、派生した議論が Twitter に散らばり、ここを追うのが面倒だったりする。


### Event

中心は WWDC になり、他のイベントにくらべて一番注目されているように思う。

大抵夜だが、朝起きると各メディアや個人がこぞってブログを書いているため、追う負荷は一番低い。

Web にかかわるアウトプットは少ないが、 Safari のアップデートの話がたまに混ざる。

他に Apple 主催で Web に関わるようなイベントは把握していない。


### Other

主催イベントやアウトプットの場、アドボケートのようなアウトプットを専門タスクとする人が少ないため、アウトプットが少ない。

しかし逆を言えば、 Technology Preview や Blog に集約される点で、追う場所が限定的なため、そこを見て入れば良いという部分はある。



## Edge 動向

### Overview

近年アウトプットの場も量も増えているが、全体的には追いにくい印象がある。

特にリリースやそれにまつわるアップデートが  Windows とまとめられがちなため、 Windows のアップデートもある程度追う必要がある。

大きなイベントに MS Build があるが、 Web の話はあまりない印象。


### EdgeHTML

基本は EdgeHTML というエンジンのバージョンアップを追うことになる。

全体的なアップデートのブログは以下に投稿される。

- <https://blogs.windows.com/msedgedev/>

EdgeHTML のアップデートは、 Dev Guide というページの What's New のトップに一番新しいバージョンが載る。

- <https://docs.microsoft.com/en-us/microsoft-edge/dev-guide>


古いバージョンは What's New の中にバージョン付きのリンクができる。

- <https://docs.microsoft.com/en-us/microsoft-edge/dev-guide/whats-new/edgehtml-16>


これでは、最新のものに Deep Link が貼れないが、以下の短縮 URL は目的のものにリダイレクトされるため、これを使っている。

- <https://aka.ms/devguide_edgehtml_17>
- <https://aka.ms/devguide_edgehtml_16>


ここでは、アップデートに関する解説と、 Preview Build ごとの API 単位の変更を Code Pen で埋め込んで表示している。

(個人的にもう少し見やすくまとめられないかなと思う、いかにも MS らしいレイアウトになっている)


### status updates

Intents が無い代わりに、現時点での Status がまとまったページがある。

- <https://status.microsoftedge.com/>


ステータスは以下がブラウザごとに書かれている。

- Supported
- Preview build
- In development
- Under consideration
- Deprecated
- Not currently planned

このページはその時点でのステータスしか出ず、変化の部分は取れない。

(おそらく、細かく変更を追う人よりも、今の時点で使えるのか使えないのかを知りたい、というユーザが多いのでは無いかと推測)

幸いにも、ここのソースが github で管理されているため、 Monthly Web では更新を1ヶ月分出してまとめている。

- <https://github.com/MicrosoftEdge/Status/compare/production@{2018-07-01}...production@{2018-08-01}>

ちなみに、実装されていない機能については、ここから Vote することで要望できる。


### Build Changelog

Edge は Windows の Build に紐づいており、 Windows の build は以下からビルド番号で追う。

- <https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/>

build 番号を選ぶと、その先のページで、 Edge に関する更新がまとまっている場合がある。

もしそのページになくても、ページ右側にある以下の部分に、ブログへのリンクがある。

> Learn more about this release on the Windows blog

ここから build ごとのリンクに飛ぶと、より細かく書かれている場合がある。
(かならずあるとは限らない)

そのブログのトップは Windows Experience Blog になっている。

- <https://blogs.windows.com/windowsexperience/>

このあたりが結構迷子になるが、とりあえず主要な Feed の URL を押さえておけば良い。


### Chakra

Chakra Core 自体のアップデートはリポジトリを見るのが一番良いだろう。

- https://github.com/Microsoft/ChakraCore

Chakra Core だけのブログは無く、 Edge のアップデートブログに含まれている。


### IE Support Team Blog

Monthly Web のソースの中で、唯一の日本語ソースである。

元々は IE/Edge の「累積的なセキュリティ更新プログラム」があるため追っていた。

しかし、 IE ユーザからの様々な要望に対して回答をするエントリがたまに上がることがある。

そこで、いまだに IE を中心としたエコシステムのリアルが垣間みえて、味わい深い。

- <https://blogs.technet.microsoft.com/jpieblog/2018/02/09/ie11-shortcut-key/>

例えば、このエントリの一文を抜粋しよう。

> 昨今では各ベンダーより様々なブラウザーが開発され、ユーザーが利用するブラウザーの大半が Internet Explorer だという時代は残念ながら過ぎ去ってしまっています。
> このような背景から、最近では Web サイトにおいても「相互運用性」という点が非常に重要になってきました。
> 「相互運用性」とは、どのブラウザーで閲覧しても、同じように表示する、同じように動作する、同じような体験ができる、というようなことを言います。



### Other

Edge の中の人の、新しい機能へ追従するモチベーションは高いと思われ、アウトプット自体は多い。

しかし、 Microsoft や Windows の Web サイトで、何かしらを探したり追ったことがある人ならわかると思う。

構造が複雑で迷子になりやすく、レイアウトも見やすいとは言い難い。

後発である Edge も、単体ではなくしっかり Windows に含まれているため、その複雑さをそのまま継承している。

Edge の追い方については未だに慣れない。


## WHATWG/W3C 動向


### Overview

主に Draft を更新する、複数の Working Group があるため、それらアクティビティを ML などで追うことになる。

イベントとしては年 1 回の TPAC とう会議があり、その周辺では F2F も多く開催されることがある。

W3C 自体は会員制だが、多くの情報はパブリックにされるため、困ることはあまりない。

最近は github も多用されているため、 ML の流量が無いものも多い。


### Draft

W3C のドラフトには以下のようなステージがある。

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft


ステージが変わるとアナウンスが出る。

- <https://www.w3.org/blog/news>


一方 WHATWG で Living Standard としてメンテナンスされているものは、ステージを持たないため、コミットを見ることになる。

全てのリポジトリのコミットを見ると github の通知が辛いため、 RSS で見るか、最近はそれを垂れ流すだけの Twitter アカウントもあるので、それを見るのが良いのかもしれない。

- [compatstandard](https://twitter.com/compatstandard)
- [consolelog](https://twitter.com/consolelog)
- [encodings](https://twitter.com/encodings)
- [fetchstandard](https://twitter.com/fetchstandard)
- [fullscreenapi](https://twitter.com/fullscreenapi)
- [htmlstandard](https://twitter.com/htmlstandard)
- [infrastandard](https://twitter.com/infrastandard)
- [mimesniff](https://twitter.com/mimesniff)
- [notifyapi](https://twitter.com/notifyapi)
- [storagestandard](https://twitter.com/storagestandard)
- [streamsstandard](https://twitter.com/streamsstandard)
- [thedomstandard](https://twitter.com/thedomstandard)
- [urlstandard](https://twitter.com/urlstandard)
- [w3cmemes](https://twitter.com/w3cmemes)
- [WHATWG](https://twitter.com/WHATWG)
- [xhrstandard](https://twitter.com/xhrstandard)


### Mailing List

Working Group は非常に多く、その全てを追うことは難しい。

個人的には、以下のような ML を見ることが多い。

- [public-new-work](http://lists.w3.org/Archives/Public/public-new-work)
- [public-html](http://lists.w3.org/Archives/Public/public-html)
- [public-ortc](http://lists.w3.org/Archives/Public/public-ortc)
- [public-webappsec](http://lists.w3.org/Archives/Public/public-webappsec)
- [public-webassemly](http://lists.w3.org/Archives/Public/public-webassemly)
- [public-webplatform](http://lists.w3.org/Archives/Public/public-webplatform)
- [public-webrtc](http://lists.w3.org/Archives/Public/public-webrtc)
- [public-houdini](http://lists.w3.org/Archives/Public/public-houdini)
- [public-webauthn](http://lists.w3.org/Archives/Public/public-webauthn)
- [www-style](http://lists.w3.org/Archives/Public/www-style)
- [ietf-http-wg](http://lists.w3.org/Archives/Public/ietf-http-wg)


ML には標準化に関する提案、議論、 Meeting の Minutes などが上がるため、ここが全てとも言える。

public-webauthn のように、 Github のアクティビティを連携して流す ML もあるが、単に流量が多くなるだけなので、個人的にはやめてほしい。


### News Blog

W3C 全体での出来事については以下のブログが更新される。

- <https://www.w3.org/blog/news>

ここでは、最初に述べた Draft の Status Update や新しい Working Group の設立、 Chartering (方針や目的の変更) などといった情報が得られる。

たまに W3C 自体が特定の問題や動向などについてエントリを出すこともあるが、ここを見て入ればそういう情報も入ってくる。



### Tag Review

W3C には、選挙によって選ばれる TAG というグループがある。

TAG は、各 WG が議論した仕様について、 Web 全体の互換性や安全性を損なわないかといった対局的な観点からレビューを行うタスクがある。

そのタスクが実行されいるのが design-review というリポジトリで、ここに issue で Review がリクエストされ TAG のメンバーがコメントする。

- <https://github.com/w3ctag/design-reviews/issues>


新しく提案されている仕様に対するセカンドオピニオンが見られるため、仕様をより深く理解できる。

どう考えても量に対して TAG が足りて無い気もするが、こうした作業ができるエキスパートも限られているため、止む無いところがある。

TAG の選挙権は W3C 会員にしか無いが、日本の W3C 会員は選挙に対して無関心な票もあるようなので、ここを見てその票の重要性に気づくと良いかと思う。


## WHATWG

whatwg 側で作業されいるスペックは基本的に以下にまとまっている。

- <https://spec.whatwg.org/>

ML ではなく github が使われている場合が多いため、気になるスペックのにある github へのリンクされているリポジトリ追いかければ良い。

余談だが、今ではほとんどのスペックに、筆者が敬愛する triple underscore 氏謹製の翻訳がリンクされている。

triple undersocre 氏の翻訳は、世にある技術翻訳の中で群を抜いて多機能だ。

もし、翻訳文だけが公開される場合、以下のような場合がある

- 翻訳が間違っている可能性があり、原文をすぐに確かめたい
- 例えば "Origin" について書かれた部分をページ内検索した場合、 "Origin" なのか "オリジン" なのか "生成源" なのかわからない
- そもそも筆者は、翻訳をだいたいどの辺に書かれているか知るインデックスとして使い、見つけたらあとは原文を読みたい

triple underscore 氏の翻訳は、独自の UI が付いており、原文を併記することができる。

また、翻訳粒度を「英語主体(origin)」「カナ主体(オリジン)」「漢字主体(生成源)」と切り替えることができる。

他にも、一文が長い英語の訳を、視覚上わかりやすく表示したりなど、細かいところも良き届いている。

なにより、作業量がすごく、翻訳精度も抜群で筆者も何度も助けられた。

個人的には、全ての翻訳がこうあってほしいと思ってしまうが、これは氏にしかできないだろう。

氏の興味分野が Web だったことは、日本の Web にとって幸運だったとしか言いようがない。


### Event

基本は ML で議論されるが、年一回集まる TPAC が大きく、ここでの議論は Minutes として各 ML などに投稿される。

合わせて、プレゼンをした人の資料が多く上がるため、議論の状況を知る上で重要なチェックポイントではある。

また、各 WG が必要に応じて F2F をやっているため、それらも ML を見て入れば知ることができる。

他にも色々なイベントが催されおり、 News Blog を見て入れば知ることができる。


### Othre

W3C は歴史も長く、組織もかなり枯れているため、かなりシステマチックだ。

そのため、一度追い方と追いたいものが決まれば、割と自然に情報が入ってくる流れが作れる。

最近では github などに議論の場を移しているものもあるが、基本は気になる ML を探してそれを見て入れば良い。






## TC39 動向

### Overview

基本的には提出された Proposal を議論し、奇数月に実施される Meeting で Stage が上がる Stage 制を取っている。

新しい Proposal を把握しておき、 Meeting ごとの Stage の変化を追っていく感じになる。

Github が中心の文化だ。


### Stage

Stage は 0~4 があり、大まかに以下のよう意味を持つ。

(詳細: <https://tc39.github.io/process-document/>)


0. Strawman (最初の提案、アイデアレベルでも良く割とカジュアルに提出できる)
1. Proposal (ユースケースやモチベーションなどを詰め、 Polyfill などが作られる)
2. Draft (仕様のフォーマットを整え、ブラウザの Experimental 実装などが求められる)
3. Candidate (仕様が固まり、実装者からのフィードバックなどで細部を慎重に詰める)
4. Finished (ECMA262 に正式に取り込まれ、実装も Ship される)


### Stage 0

Stage 0 は以下にある、毎月このリストの差分を見ることで、新しい提案を知ることができる。

細部が無いかわりに、趣旨が把握しやすいため、かなり多岐に渡るので、単純に面白い。


- <https://github.com/tc39/proposals/blob/master/stage-0-proposals.md>

stage 0 で終わるものもある。


### Meeting

Meeting は奇数月の月末に実施され、そこで Proposal に対して議論が行われる。

Minutes が出るのは翌月になることが多いので、 Monthly Web では偶数月に前の月の meeting を扱っている。

- <https://github.com/tc39/agendas>

Minutes は長いが、 Proposal に対する Slide などがまとめられるため、その辺を見ておくだけでもだいぶ流れがわかる。


### Stage Update

Stage のリストは以下にまとまっている。

- <https://github.com/tc39/proposals>


なので、一ヶ月分の履歴を見ると、その推移がわかる。

- <https://github.com/tc39/proposals/compare/master@{2018-01-01}...master@{2018-02-01}>


Meeting が無い月は、変更はあまりない。


### Event

Event は基本 Meeting になる。


### Other

proposal はかなりカジュアルに提出され、 proposal ごのとのリポジトリで議論が行われることもある。

その proposal の出現は、先に twitter などでアナウンスされているようなので、その出現は気づきにくいものもある。

しかし、最終的に tc39 のリポジトリに集約されるため、そこを追っておけば良いという点で、追うのは非常に楽だ。

Minutes も整理されているので助かる。



## IETF 動向


### Overview

かなり枯れたプロセスをもっているため、慣れが必要だが、慣れるまで時間はかかるかもしれない。

基本は ML の議論と、 Draft のアップデート、年三回開催される IETF 会議での Minutes を追う。

WG ごとの F2F や Interop もよくあるため、そのへんも含めると毎回かなりのアプデートがある。

基本が Internet (物理層以上)全般を扱う場所であるため、 Monthly Web には httpwg や quicwg などに絞って載せている。


### Draft

IETF ではドラフトの提出が通知される RSS がある。

- <https://tools.ietf.org/html/new-ids.rss>

ここで `-00` (たまに `-01`) が新しいドラフトであるため、そこで新しいドラフトの出現が把握できる。

そこからバージョンが上がっていくが、全てを記載すると量が多すぎるため、 Montly Web では、以下のようなチャックポイントの場面で記している。

- RFC
- IETF Last Call
- WG Last Call
- Call for Adoption
- I-D Action
- Draft

### ML

WG は多岐にわたるが、 Web に関連するようなものは、以下のような WG から採用することが多い。

- <https://tools.ietf.org/wg/httpbis>
- <https://tools.ietf.org/wg/quic>
- <https://tools.ietf.org/wg/tls>
- <https://tools.ietf.org/wg/rtcweb/>
- <https://tools.ietf.org/wg/acme/>
- <https://tools.ietf.org/wg/oauth/>
- <https://tools.ietf.org/wg/doh/>



## セキュリティ動向

このセクションは、次項の周辺動向の中で、セキュリティ系の話題が多くなってしまったため分離したものである。

特に最近では以下のようなものが多い。

- CA insident や証明書周りの動向
- Browser/Openssl など実装脆弱性 (CVE)
- セキュリティ対策ヘッダ(CSP etc)
- etc

他にも、気になるものについては上げているが、特にソースを固定はしていない。


## 周辺動向

ここまでで入らなかったもので、ソースも固定せず、気になったものを上げている。

色々な場所で発生した議論や、気になる blog など、いわゆるその他である。


## イベント

Web に関わる大きめのイベントをリストしている。

もともとは、あとでフォローするのを忘れないようにやっていたが、ここの更新は気まぐれになりがちなところがある。
