# [monthly-web][mozaic.fm][podcast] Monthly Web の作り方 2018 年版

## Intro

自分がやっている Podcast である mozaic.fm の中で、 Monthly Web という月ごとの Web をまとめるという回をやっている。

2017 年 7 月に初めてから 1 年続けたので、結果としてどのようにまとめる形に落ち着いたかをログに残す。


## Monthly Web

mozaic.fm は、 Web について「今何が起こっているのか」「これからどうなっていくのか」を議論するための Podcast である。

そこでは、ゲストをお呼びし、特定のテーマについて議論をするということを行ってきた。

しかし、このテーマの設定と消化よりもよほど早い勢いで、多くの重大なトピックが日々生まれており、その流れを扱うことはできないかずっと考えていた。

通常回が「縦に掘る」議論であるとすれば、「横に繋ぐ」部分の議論を行うことができれば、 Web を議論するコンテキストをより補完することができるだろう。

そこで、月に 1 度、その月の流れをまとめるということを始めた。

速報やニュース的な目的であれば、より細かい粒度で行うべきであるが、この目的であれば月に 1 度で十分と判断したためだ。

最初は、それをこのブログで始めたのだが、コメントを入れる負荷も高く、入れたところでただのリンク集にしかならないため、これを Podcast に移すことにした。




## 対象

厳密な基準は無いが、主眼としては **仕様の変化** と **実装の変化** の 2 つの側面に絞ることにした。

これに加えて、特に最近目立っているセキュリティの動向と、その他周辺動向、イベントの予定をまとめている。

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


各動向の簡単な追い方などについて記す。



## Chrome 動向

### Overview

Chrome は Intents や Blog など、アウトプットが充実しているので追いやすい。

また、他のベンダと比べても、投入するリソースやバジェットが多いためか、アップデートも多く出てくるので Monthly Web の中では自然と扱う量が増える。

大きなイベントとしては、 Google I/O や Chrome Dev Summit があるが、 Web はプロダクトではないため、初めて聞く話はあまりない。

Chrome の Stable は 6~8 週間程度でリリースされるため、 Montly Web には入らない月もある。


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


Intents を追うことで、「この機能はそろそろ試せるな」とか「この機能は実装できるところまで仕様が仕上がったんだな」「Origin Trials 始まったな」などといった進捗がわかる。

また、本文にはモチベーションや仕様へのリンク、他ブラウザのシグナルなどもまとまっており、フィードバックのレスもつくため、議論も追いやすい。

(シグナルの中には他のブラウザ以外に developers という項目が有るが、基準がよくわからないのであまり好きではない)

Intents の存在によって、コミットログをつぶさに追わなくとも、仕様と実装のチェックポイントが把握できるため、負荷が下がる。


### Team Weekly Snippet

Blink の開発は、スコープごとにいくつかのチームに分かれている。

チームによっては、 [blink-dev の ML](https://groups.google.com/a/chromium.org/d/forum/blink-dev) に週報的なものを投稿している場合があり、そこを見るとどんな仕様/実装に取り組んでいるかが伺える。

最近はこの辺を眺めている。

- Loading Team
- Storage Team
- Platform Architecture Team
- Layout Team

例えば WebPackagin の進行状況などは Loading Team を見てるとなんとなくわかり、コミットまで追わなくてもよくなる。

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

(Intents から追っていると、数カ月間その議論を追うことになり、無意識のうちにとっくに使えるものと錯覚してしまうことがあるため、 Stabel リリースで認識を補正する必要がある)


その他、新しい機能の解説や、挙動の変更などに関するエントリも上がるため、それらもフォローしておく。


### Events

Google の大きめのイベントとしては、年 1 回の Google I/O と Chrome Developer Summit の 2 つがある。

Web 自体は製品ではないため、そこで初めて知る内容は Chrome の機能などの方が多い。

最近、 Android や GCP など大きめなトピックは、 Google I/O とは別に独自の Summit をやるようになり始めた。

Web も同様に、細かい話は Chrome Developer Summit の方が多く感じる。

今、 Google が推したい分野がどこなのか(AMP, PWA, WebPackaging etc)がわかるという役割が強い。


### V8

V8 も、アップデートのタイミングでブログがあがるため、これも含めている。

- <https://v8project.blogspot.jp/>

ES の仕様の実装状況だけでなく、内部のパフォーマンス改善などの解説も面白い。


## Other

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

古くからある機能や挙動が変わる時「そんな機能あったのか」と知ることが多い。


### Event

- https://mozillafestival.org/


### Other


最近、新しい仕様などに対して Mozilla がどういうスタンスを取るのかという表明がまとまったページができた。

- <https://mozilla.github.io/standards-positions/>

ここを見ると、まだ Intent も出ていない仕様がどうなりそうかがなんとなくわかる。

Github に issue を上げると、それについて表明を追加してくれるため、「あの機能はどうなんだろ」と思ったら投げて見ると良い。


他にも Mozilla は広い視点で示唆に富んだブログが上がることがおおいため、必要に応じてフォローしている。



## Safari 動向

### Overview

Safari 自体のメジャーアップデートが年 2 回しかないため、基本は Technology Preview を追う感ことになる。

普段のアウトプットが Chrome などと比べて少ない分、 WWDC なども面白いセッションがぽろっと出たりする。


## Safari Technology Preview NN

Technology Preview は、不定期(月0~3回程度?)にリリースされ、そのブログが主な情報源となる。

- https://webkit.org/blog/
- https://developer.apple.com/safari/technology-preview/release-notes/
- https://developer.apple.com/library/archive/releasenotes/General/WhatsNewInSafari/Introduction/Introduction.html

TP では、仕様の早い段階の実装が突然入ったり、ドラフトすらない実装ががいきなり入ったりと、若干ハイコンテキストなときもある。

(Cross-Origin-Resource-Policy など)

気になるところは、チェンジセットへのリンクを辿ることで補完できるため、チェンジセットをつぶさに追う負荷が減る。


## ChangeSet

Intents などが細かく出ないため、チェンジセットを追う必要がある場合もある。

気になる機能の動向は、担当している人を把握し、その人のアクティビティを追う感じになるだろう。

- https://trac.webkit.org/timeline


## Blog

Safari 特有の実装や、割と細かい機能解説、中の人がみなぎった結果出てきた論文のような文書など、色々とブログが上がるので参考になる。

逆を言えば ITP などは、このブログくらいしか表立ったアウトプットが無く、その次はソースコードレベルとなる場合もある。

Chrome ほどガイドライン的なドキュメントが整備されていないので、ブログの重要度は高い。




https://trac.webkit.org/timeline

https://webkit.org/blog
https://developer.apple.com/safari/technology-preview/release-notes/
https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Introduction/Introduction.html
Other





## Edge 動向

### Overview



またリリースやそれにまつわるアップデートが  Windows とまとめられがちなため、 Windows のアップデートもある程度追う必要がある。

ブラウザの中では一番情報がまばらで追いにくい。

大きなイベントに MS Build 、国内では de:code などがあるが、 Web の話はあまりない印象。



### EdgeHTML

基本的には EdgeHTML というエンジンのバージョンアップを追うことになる。

EdgeHTML のアップデートは、一番新しいバージョンの URL が微妙に違う。

とりあえず、以下の短縮 URL の最後の数字を変えれば目的のものが見えるようなので、それを覚えておくようにしている。

- <https://aka.ms/devguide_edgehtml_16>
- <https://aka.ms/devguide_edgehtml_17>



### status updates

Intents が無い代わりに、現時点での Status がまとまったページがある。

<https://developer.microsoft.com/en-us/microsoft-edge/platform/status/>


- Supported
- Preview build
- In development
- Under consideration
- Deprecated
- Not currently planned

このページはその時点でのステータスしか出ず、変化の部分は取れないため、 github の更新を1ヶ月分出して、それをまとめている。

- https://github.com/MicrosoftEdge/Status/compare/production@{2018-07-01}...production@{2018-08-01}







Stable:

- Status Updates
  - https://github.com/MicrosoftEdge/Status/compare/production@{2018-01-01}...production@{2018-02-01}
- EdgeHTML
  - https://aka.ms/devguide_edgehtml_16
  - https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/
- Build Changelog
  - https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/
- windows experience blog の feed に build update が乗る

もしくは、このページの build を選ぶと、右に learn more on the windows blog から飛べる

### Chakra

Other
https://developer.microsoft.com/en-us/microsoft-edge/platform/
feed で見るのがいい

### WHATWG/W3C 動向

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
- Chartering

https://www.w3.org/blog/news

Other

- [public-webplatform](http://lists.w3.org/Archives/Public/public-webplatform/)
- [public-webappsec](http://lists.w3.org/Archives/Public/public-webappsec/)
- [public-webassembly](http://lists.w3.org/Archives/Public/public-webassembly/)
- [public-webrtc](http://lists.w3.org/Archives/Public/public-webrtc/)
- [public-houdini](http://lists.w3.org/Archives/Public/public-houdini/)
- [ietf-http-wg](http://lists.w3.org/Archives/Public/ietf-http-wg/)


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




### TC39 動向

#### Overview

基本的には提出された Proposal を議論し、奇数月に実施される Meeting で Stage が上がる、 Stage 制を取っている。

新しい Proposal を把握しておき、 Meeting ごとの Stage の変化を追っていく感じになる。

Github だけで、おおよそが把握できる。


#### Stage

Stage は 0~4 があり、大まかに以下のよう意味を持つ。

(詳細: <https://tc39.github.io/process-document/>)


0. Strawman (最初の提案、アイデアレベルでも良く割とカジュアルに提出できる)
1. Proposal (ユースケースやモチベーションなどを詰め、 Polyfill などが作られる)
2. Draft (仕様のフォーマットを整え、ブラウザの Experimental 実装などが求められる)
3. Candidate (仕様が固まり、実装者からのフィードバックなどで細部を慎重に詰める)
4. Finished (ECMA262 に正式に取り込まれ、実装も Ship される)


#### Stage 0

Stage 0 は以下にある、毎月このリストの差分を見ることで、新しい提案を知ることができる。

細部が無いかわりに、趣旨が把握しやすいため、かなり多岐に渡るので、単純に面白い。


- <https://github.com/tc39/proposals/blob/master/stage-0-proposals.md>

stage 0 で終わるものもある。


#### meeting

Meeting は奇数月の月末に実施され、そこで Proposal に対して議論が行われる。

Minutes が出るのは翌月になることが多いので、 Monthly Web では偶数月に前の月の meeting を扱っている。

- <https://github.com/tc39/agendas>

Minutes は長いが、 Proposal に対する Slide などがまとめられるため、その辺を見ておくだけでもだいぶ流れがわかる。


#### Stage 移行

Stage のリストは以下にまとまっている。

- <https://github.com/tc39/proposals>


なので、一ヶ月分の履歴を見ると、その推移がわかる。

- <https://github.com/tc39/proposals/compare/master@{2018-01-01}...master@{2018-02-01}>


Meeting が無い月は、変更はあまりない。



### IETF 動向


#### Overview

かなり枯れたプロセスをもっているため、慣れが必要だが、慣れるとわかりやすい。

基本は ML の議論と、 Draft のアップデート、年三回開催される IETF 会議での Minutes を追う。

WG ごとの F2F や Interop もよくあるため、そのへんも含めると毎回かなりのアプデートがある。

基本が Internet (物理層以上)全般を扱う場所であるため、 Monthly Web には httpwg や quicwg などに絞って載せている。


#### Draft

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

- https://tools.ietf.org/wg/httpbis
- https://tools.ietf.org/wg/quic
- https://tools.ietf.org/wg/tls
- https://tools.ietf.org/wg/rtcweb/
- https://tools.ietf.org/wg/acme/
- https://tools.ietf.org/wg/oauth/
- https://tools.ietf.org/wg/doh/



### セキュリティ動向

このセクションは、次項の周辺動向の中で、セキュリティ系の話題が多くなってしまったため分離したものである。

特に最近では以下のようなものが多い。

- CA insident や証明書周りの動向
- Browser/Openssl など実装脆弱性 (CVE)
- セキュリティ対策ヘッダ(CSP etc)
- etc

他にも、気になるものについては上げているが、特にソースを固定はしていない。


### 周辺動向

ここまでで入らなかったもので、ソースも固定せず、気になったものを上げている。

色々な場所で発生した議論や、気になる blog など、いわゆるその他である。


### イベント

Web に関わる大きめのイベントをリストしている。

もともとは、あとでフォローするのを忘れないようにやっていたが、ここの更新は気まぐれになりがちなところがある。
