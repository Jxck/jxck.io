# [mozaic.fm][podcast] mozaic.fm v3 リリースと Podcast の PWA 化

## Intro

mozaic.fm をリニューアルし v3 としてリリースした。

今回の更新は以下のような変更/修正を実施した。

- PWA 化
  - before install prompt
  - Background Fetch
  - Periodic Background Sync
  - Content Index API
  - Badging API
  - (Silent Push)
  - Media Feeds (Web App Manifest)
- Player UI の刷新
  - Pure Webcomponents
  - Media Session API
  - WAI-ARIA
  - Portal Preview
  - Screen Wake Lock
  - id3 info by WASM
- Security
  - CSP v3 (not Report-Only)
  - Cross Origin Resource Policy
  - Cross Origin Opener Policy
  - Cross Origin Embedder Policy
  - Referer Policy
- その他
  - Transpile Less
  - Scroll To Text Fragment Search
  - SXG
  - Spotify

実施したモチベーションおよび、実施内容について記す。


## Podcast over Web

mozaic.fm は Podcast であるため、 Podcast アプリで聴くのが基本となる。

しかし、サイト上ですぐに聞けるように Audio Player を設置していた。

これをそのまま PWA としてアプリのような挙動にするという構想は、 PWA が始まったときからあった。

ところが、いざ Podcast を PWA として実現しようとすると、足りてないパーツがあまりにも多く、実現できずにいた。

そもそも Podcast とは、「自動で音声ファイルをダウンロードし、オフラインで再生できる RSS リーダー」とみなすことができる。

そこにはいかが必要不可欠となる。

- RSS を自動で更新する
- 大きめな音声ファイルを自動でダウンロードする
- オフラインで再生できる

これらが、最近特に Chrome チームから提案されている API 群によって徐々に実現しつつある。

一方で、こうしたことを実現することは、従来の Web の前提とは違い、様々な懸念があり、議論が行われている。

そこで、「Podcast を Web で実現する」という一つのユースケースを実現することで、そうした議論の土台となる検証を行うことを目的として実装を行った。

まだ Origin Trial な API も多いが、あえて新しい API をふんだんに盛り込んでいるのは、そうしたモチベーションがある。

次節以降、各変更の詳細を解説する。


## PWA 化

従来の mozaic.fm にも Service Worker は入れていたが、 Install するところまでは想定した実装をしていなかった。

今回は、 Install 可能にしつつ以下の API を入れることで、いわゆる Podcast アプリに挙動を近づけた。

- Periodic Background Sync
- before install prompt
- Background Fetch
- Content Indexing API
- Badging API
- Media Feeds (Web App Manifest)
- (Silent Push)


### Periodic Background Sync

Podcast アプリの実態は、音声が再生できる RSS リーダーであり、定期的にフィードを取得し Podcast の更新を取得する。

Service Worker は background sync が従来からあるが、これは「オフライン中に発生したリクエストを、オンライン復帰時に再送する」といったユースケースをカバーしている。

サーバ側でフィードを更新したときに Push を送る方法もあるが、 Push は届くとは限らない上に、 Permission の問題もある。

そこで、定期的な fetch をバックグラウンドで行うために提案されたのが Periodic Background Fetch だ。

ただし、この API の Permission は、サイトを Add to Home Screen (A2HS) しないと得られない、つまりインストールが必須だ。

mozaic.fm の更新は多くて月2回だが、 Show Note の修正などが入る場合があるため、一日に一回フィードを取りに行くようにしている。


### before install prompt

Periodic Background Sync のために、性能をフルに発揮するにはインストールが必要になった。

これを、自動で出てくるインストールバナーにまかせては、ユーザに対して体験が良くない。

そこで、内容を理解した上で Opt-In でインストールできるような UI を用意し、クリックすると Install Prompt が出るように実装した。


### Background Fetch

Service Worker の Cache は Cache API で行うのが基本だ。

しかし、 mozaic.fm の音声ファイルはサイズも大きいため、 Service Worker の Install 中に行うのは適切ではない。

また、音声は Range リクエストであるため、再生中に裏でキャッシュするのも適さず、そもそも寝てる間に落としておいてほしい。

Background Fetch は、ユーザの操作とは非同期に裏でダウンロードが可能な API だ。

これを利用すると、フィード取得時に音声をダウンロードし、 Cache API に追加することができる。

夜中にダウンロードすれば、通勤通学の地下鉄でも聴くことが可能になる。


### Badging API

バックグラウンドで更新されたなら、更新を知らせる UI が必要となり、アプリの場合はバッジが代表格だろう。

これも Badging API として提案されているため、導入した。


### Content Indexing API

Badge のみでなく、更新されたコンテンツの概要をユーザに伝える UI があることが望ましい。

そこでコンテンツの概要を登録し、ユーザに更新を伝えるために提案されたのが Content Indexing API だ。

現状 Android Chrome の実装では Download タブの中という、およそ誰も見なさそうな場所でしか表示されない。

しかし、これは標準化が進みユースケースが整理されれば、 UI が改善されより意味のある場所に表示されるだろう。


## Player UI の刷新


音声ファイルを再生する Player の UI も大幅に刷新した。変更は徐々に行っていたが、結果としては以下のようになっている。

- Pure WebComponents
- WAI-ARIA
- Media Session API
- Screen Wake Lock
- WASM ID3
- Portal Preview


### Pure WebComponents

かつては生の `<audio controls>` を入れていたが、「早送り」「巻き戻し」「再生速度変更」など、自分が Podcast アプリに欲しいと思っていた UI が無いため独自実装した。

実装自体は `<mozaic-player>` という Custom Elements で実装し、template の内容を Shadow DOM に展開する完全に Pure な WebComponents にしている。

Audio の API も生で操作し、フレームワークなどは一切利用してない。

HTML Modules は実装されてないため、 fetch で代用しているが、 module は mjs を import している。


### WAI-ARIA

ブラウザが提供する `<audio controls>` を捨てたために UI が使いにくくならないよう、セマンティクスは慎重に設計した。

基本は、 `<audio>` `<progress>` `<button>` などを適切に使うが、足らないと考えられる部分は aria 属性を検討し追加している。

リアルタイムに再生される音声のコントロールという点では、補足できる情報は多いが、そもそもどうあるべきかが定義しづらいため、今後も更新していきたい。


### Media Session API

音声の再生をバックグラウンドにした場合、ロック画面などから共通の UI で操作ができるだろう。

Web の場合も、 Media Session API を利用すると、再生や早送り巻き戻しなどを OS の UI から操作できる。


### Wake Lock API

Media Session とは逆に、ロックがかからないようにする API が Wake Lock API だ。

動画があるわけではないため、ロックしたいモチベーションは音声にはあまりなさそうだが、一応 UI に追加している。


### WASM ID3

mp3 には ID3 というメタデータを付与でき、 mozaic.fm ではここにエピソードやトラックの情報を載せている。

ID3 は仕様がブレブレで、意図した情報を追加する手頃なツールがなかったため、自分で作ることにした。

ついでに、取得できるツールに応用し WASM にすれば、サーバでもフロントでも活用できる。

そこで、サーバでは付与するツール、クライアントでは表示するツールとして WASM を読ませ、 UI に表示している。


### Portal Preview

エピソードごとに付与している Show Note には、 Podcast 内で言及した URL が多く載っている。

あまりに多いため、マウスオーバーによる Preview を `<portal>` により実装した。

これは、正直色気を出しただけなので、あまりいらないかもしれない。


## Security

blog.jxck.io の方に Analytics / Ad を入れたため、 3rd Party のコードが多く、 CSP の設定などもかなり複雑になった。

代わりに、 mozaic.fm にはそうした 3rd Party のコードは一切なく、外部ライブラリなども一切使ってないため、ガチガチに固めることができる。

そこで以下を見直した。

- CSP v3 (not Report-Only)
- Cross Origin Resource Policy
- Cross Origin Opener Policy
- Cross Origin Embedder Policy
- Referer Policy
- Document Policy
- Trusted Types

### CSP v3

Origin ではなく、 nonce と integrity により CSP を設定した。

User Script や拡張などもあるかもしれないが、 Report-Only もそろそろ飽きたので外すことにした。

何かあれば実際にブロックするため、レポートもより慎重に見ていきたい。


### Cross Origin * Policy

現在提案されているものは全て入れている。

これにより、いわゆる Securere Content の状態になるため、今後より高い権限が必要になる強力な機能が入っても、有効にしていける土台になるだろう。


### Referer Policy

普通に必要なものを入れるだけ。

### Document Policy

TODO:


### Trusted Types

TODO:


## その他

### transpile less

近年の Web 開発につきものなコードのトランスパイルを一切行っていない。

ビルドは gz/br の生成ので、 WebPack や Babal のような変換が無く SSR もない。

型の整合性チェックはテストと位置づけているため、 TypeScript ではなく Pure JS だが、JSDoc に型を書きテストで tsc を叩いてる。

Dev Server も不要でリロードすれば反映され、 package.json, babelrc, webpack.config といったファイルのメンテという不毛なタスクが無いのは、開発体験が良い。


### Scroll To Text Fragment Search

blog にも入れた機能だが、よりインタラクティブな Form で実装した。

### Access-Control-Expose-Headers

細かいが Safari が Access-Control-Expose-Headers の `*` 対応をしたのでそれも入れている。

### SXG

TODO:

### Spotify

Spotify も Podcast のサポートを始めたため、登録した。
