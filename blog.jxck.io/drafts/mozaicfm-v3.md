# [mozaic.fm][podcast] mozaic.fm v3 リリースと Podcast の PWA 化


## Intro

mozaic.fm をリニューアルし v3 としてリリースした。

今回の更新は以下のような変更/修正を実施している。

- PWA 化
  - before install prompt
  - Background Fetch
  - Periodic Background Sync
  - Content Index API
  - Badging API
- Player UI の刷新
  - Pure Webcomponents
  - Media Session API
  - WAI-ARIA
  - Portal Preview
  - Screen Wake Lock
- Security
  - CSP v3 (not Report-Only)
  - Cross Origin Resource Policy
  - Cross Origin Opener Policy
  - Cross Origin Embedder Policy
  - Expect-CT
  - NEL
  - Referer Policy
- その他
  - Transpile Less
  - Scroll To Text Fragment Search
  - SXG
  - Spotify
- WIP
  - Silent Push
  - id3 info by WASM

実施したモチベーションおよび、実施内容について記す。


## Podcast over Web

mozaic.fm は Podcast であるため、 Podcast アプリで聴くのが基本となる。

しかし、サイト上ですぐに聞けるように Audio Player を設置していた。

これをそのまま PWA としてアプリのような挙動にするという構想は、 PWA が始まったときからあった。

ところが、いざ Podcast を PWA として実現しようとすると、足りてないパーツがあまりにも多く、実現できずにいた。

そもそも Podcast とは、「自動で音声ファイルをダウンロードし、オフラインで再生できる RSS リーダー」とみなすことができる。

そこには以下が必要不可欠となる。

- RSS を自動で更新する
- 大きめな音声ファイルを自動でダウンロードする
- オフラインで再生できる

これらが、最近特に Chrome チームから提案されている API 群によって徐々に実現しつつある。

一方で、こうしたことを実現することは、従来の Web の前提とは違い、様々な懸念があり、議論が行われている。

特に今後 Powerful Features は「Install した後の Web」という新たな世界観によって実現されていく可能性があるのだ。

そこで、「Podcast を Installable Web で実現する」という一つのユースケースを実装することで、そうした議論の土台となる検証を行うことを目的として改良を行った。

まだ Origin Trial な API も多いが、あえて新しい API をふんだんに盛り込んでいるのは、そうしたモチベーションがある。

ついでに、これまで使っていなかった新たな機能をとにかく入れ込んでいる。

次節以降、各変更の詳細を解説する。


## PWA 化

従来の mozaic.fm にも Service Worker は入れていたが、 Install するところまでは想定した実装をしていなかった。

今回は、 Install 可能にしつつ以下の API を入れることで、いわゆる Native Podcast App に挙動を近づけることを目指した。

- Before Install Prompt
- Periodic Background Sync
- Background Fetch
- Badging API
- Content Indexing API


### Periodic Background Sync(PBS)

Podcast アプリの実態は、音声が再生できる RSS リーダーであり、定期的にフィードを取得し Podcast の更新を取得する。

Service Worker は background sync が従来からあるが、これは「オフライン中に発生したリクエストを、オンライン復帰時に再送する」といったユースケースをカバーしている。

サーバ側でフィードを更新したときに Push を送る方法もあるが、 Push は届くとは限らない上に、 Permission の問題もある。

そこで、 Slient Push を待っていたのだが、先に Periodic Background Sync(PBS) が提案された。

- [Periodic Background Sync 及び Web を Install するということ \| blog.jxck.io](https://blog.jxck.io/entries/2020-04-23/periodic-background-sync.html)

PBS の発火タイミングで Feed を取得し、更新があればメディアをダウンロードしておくように実装した。


### before install prompt

PBS のために、性能をフルに発揮するにはインストールが必要になった。

これを、自動で出てくるインストールバナーにまかせては、ユーザに対して体験が良くない。

そこで、内容を理解した上で Opt-In でインストールできるような UI を用意し、クリックすると Install Prompt が出るように実装した。


### Background Fetch

Service Worker の Cache は Cache API で行うのが基本だ。

しかし、 mozaic.fm の音声ファイルはサイズも大きいため、 Service Worker の Install 中に全て入れておくのは適切ではない。

また、音声は Range リクエストであるため、再生中に裏でキャッシュするのも適さない。

そこで提案されたのが Background Fetch であり、ユーザの操作とは非同期に裏でダウンロードが可能な API だ。

ユーザが明示的に Download を指定し、アプリをバックグラウンドに回してもキャッシュに入るようにした。

- [Service Worker の Background Fetch によるメディアのキャッシュ \| blog.jxck.io](https://blog.jxck.io/entries/2020-01-24/background-fetch.html)

本当は Periodic Background Sync で Background Fetch を実行する方向で考えていたが、今の Android Chrome では、それをしてもタスクが登録されるだけでダウンロードが実行されない。

ユーザが明示的にタスクを許可しないといけないため、ここは普通に Fetch して Cache に入れるようにした。

PBS + Bgfetch が鉄板の組み合わせだと思っていたので、ここは意外だった。詳細は詰めきれていないが理由などをもう少し調査しておきたい。


### Badging API

バックグラウンドで更新されたなら、更新を知らせる UI が必要となり、アプリの場合はバッジが代表格だろう。

これも Badging API として提案されているため、導入した。

具体的には PBS で更新があったときだけ、無印のバッヂを表示し、 DOMContentLoaded でクリアしている。


### Content Indexing API

Badge のみでなく、更新されたコンテンツの概要をユーザに伝える UI があることが望ましい。

そこでコンテンツの概要を登録し、ユーザに更新を伝えるために提案されたのが Content Indexing API だ。

現状 Android Chrome の実装では Download タブの中という、およそ誰も見なさそうな場所でしか表示されない。

そして Install した PWA では、 Download タブは現状見れないため、あまり意味がない。

しかし、これは標準化が進みユースケースが整理されれば、 UI が改善されより意味のある場所に表示されるだろう。

先行して登録するようにしている。


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

実装自体は `<mozaic-player>` という Custom Elements で実装し、 template の内容を Shadow DOM に展開する完全に Pure な WebComponents にしている。

Audio の API も生で操作し、フレームワークなどは一切利用してない。

HTML Modules は実装されてないため、 fetch で代用しているが、 module は mjs を import している。

Player ではないが、 Bgfetch を行うためのダウンロードアイコンも、アイコン自体に Download 機能をもたせた WebComponents にしている。

これまでは Tempalte をレンダリングした静的ページだったが、今後もこのように UI に機能を統合した WebComponents 群の組み合わせによる実装に移行していきたい。


### Media Session API

音声の再生をバックグラウンドにした場合、ロック画面などから共通の UI で操作ができるだろう。

Web の場合も、 Media Session API を利用すると、再生や早送り巻き戻しなどを OS の UI から操作できる。

自前で実装した Player の API を繋ぎこみ OS からも操作できるようにしている。


### Wake Lock API

Media Session とは逆に、ロックがかからないようにする API が Wake Lock API だ。

動画があるわけではないため、ロックしたいモチベーションは音声にはあまりなさそうだが、一応再生時は Lock するようにした。

とはいえ、ロックされても音声が止まるわけではなく、 Media Session でも操作できるため、あまりいらない気はしている。

邪魔だったら消すつもりだ。


### Portal Preview

エピソードごとに付与している Show Note には、 Podcast 内で言及した URL が多く載っている。

あまりに多いため、マウスオーバーによる Preview を Portal により実装している。

実は Portal が出てすぐに入れた機能で、完全に忘れていたが今回の修正でみつかったものだ。

UI が、特にモバイル対応周りが詰めきれてないが、 Portal もまだまだ過渡期なので、そのうちまた修正する。

機能としては別になくてもいいため、 Portal がデフォルトになってきたら、無効化する UI を入れるか、消す。


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

Origin ベースの CSP をやめ、 nonce と integrity ベースの CSP v3 に移行することにした。

本来 nonce は毎回違う値が必要だが、これを実現するには静的な配信をやめてサーバ側で毎回生成する必要がある。

しかし、アプリサーバをあまり持ちたくなかったため、 integrity ベースだけにしようと考えた。

ところが、 integrity ベースだと CSP のレポート収集を検証する点であまりうれしくない。

そこで、 CSPv3 のアンチパターンである固定 nonce でとりあえず導入することにした、値は integrity と同じである。

このサイト自体が CSP で防御するほど機能がないため、特に問題はないが、もし本番環境で導入する際は、必ず nonce を毎回ランダムに生成するようにするべきだ。

Report については、 User Script や拡張などもあるかもしれないが、 Report-Only もそろそろ飽きたので外すことにした。

何かあれば実際にブロックするため、レポートもより慎重に見ていきたい。


### Trusted Types

これも CSP の機能であり、特定の DOM API の操作を型によって保護する仕組みである。

- [安全な文字列であると型で検証する Trusted Types について \| blog.jxck.io](https://blog.jxck.io/entries/2019-01-27/trusted-types.html)

サイトの中では、保護に該当する DOM API を使ってないが、これを入れることで XSS による DOM の改変を防ぐことが可能になる。

ヘッダから有効にしている。


### Cross Origin * Policy

Site Isolation を固めることで、サイトをより強固に Origin に閉じるための提案が最近色々となされている。

- Cross-Origin Resource Policy
- Cross-Origin Embedder Policy
- Cross-Origin Opener Policy

これら全てを有効にしている。

加えて CSP/Trusted Types を有効にした環境を Securere Context と定義し、そこではさらに強力な機能を有効にできるのではないかという提案がなされている。

- [mikewest/securer-contexts](https://github.com/mikewest/securer-contexts/blob/master/README.md)

全て行っておくことで、今後より高い権限が必要になる強力な機能が入っても、有効にしていける土台になるだろう。


### Referer Policy

Referrer Policy は `no-referrer-when-downgrade` が default とされており、 Cross Origin でも URL 全体が送られる。

本来 Show Note から参照している外部のページには、 Referer を送っても良いため、この値でも問題はない。

しかし、認証を行いパーソナライズされたページなどでは、サイトの外に URL が漏れることを防ぐために、 `strict-origin-when-cross-origin` がより理想とされている。

そこで、本サイトもパーソナライズは一切してないが、 `strict-origin-when-cross-origin` に変更してみることにした。

- [Referrer-Policy によるリファラ制御 \| blog.jxck.io](https://blog.jxck.io/entries/2018-10-08/referrer-policy.html)


## その他


### Scroll To Text Fragment Search

blog にも入れた機能だが、よりインタラクティブな Form で実装した。

- [Scroll to Text Fragment を用いたサイト内検索の実装 \| blog.jxck.io](https://blog.jxck.io/entries/2020-03-27/scroll-to-search-result.html)


### transpile less

近年の Web 開発につきものなコードのトランスパイルを一切行っていない。

ビルドは gz/br の生成ので、 WebPack や Babal のような変換が無く SSR もない。

型の整合性チェックはテストと位置づけているため、 TypeScript ではなく Pure JS だが、 JSDoc に型を書きテストで tsc を叩いてる。

Dev Server も不要でリロードすれば反映され、 package.json, babelrc, webpack.config といったファイルのメンテという不毛なタスクが無いのは、開発体験が良い。


### Spotify

Spotify も Podcast のサポートを始めたため、登録した。

- [mozaic.fm \| Spotify でポッドキャスト](https://open.spotify.com/show/6dDtbcRlUVKssaNmkuFu5K)


## WIP

入れたかったがまだ入れられなかったもの。

全部入れられたら v4 をリリースするかもしれない。


### Template Instantiation

もう少し作業が進むかと思ったが、ちょっと停滞気味なので様子見。


### HTML Modules

話が進んだので入れられるかと思ったら、 Security Issue で止まってしまったのでペンディング。


### Document Policy

入れたいものもあるが、実装がまだ無いっぽいのでペンディング。


### WASM ID3

mp3 には ID3 というメタデータを付与でき、その情報を WASM で取得し表示するようにしようと計画していた。

Rust で ID3 のパース自体は目処がたっていたのだが、そもそも `<audio>` から生のバイナリを取得する方法が無いことに気づいた。

もしそれをやりたければ、先に自分で fetch してそれを `<audio>` に食わせる必要がある。

しかし、お作法として fetch 自体は `<audio>` に任せるべきだろうと考える。

なのでこれを実現するためには、 `<audio>` が取得したバイナリを取得する API を標準化するとこからやないといけない。

ところが、 `<audio>` は Range なので取得と定義すのも難しい `onmetadataloaded` でも良さそうだが、それだけでは済まない。

ということで諦めた。


### SXG

HTML + JS + MP3 で固めた WebPackaging をやろうと考えていたが、 SXG Extension に対応した証明書が一箇所しか提供して無く地味に高い。

そのうち Let's Encrypt がていきょうしてくれることを期待して保留している。
