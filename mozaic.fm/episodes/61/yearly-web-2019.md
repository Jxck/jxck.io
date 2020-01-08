# [monthly-web][mozaic.fm] ep61 Yearly Web 2019

## Info

audio: https://files.mozaic.fm/mozaic-ep61.mp3

published_at
: 2019-12-29

guest
: [@myakura](https://twitter.com/myakura)


## Theme

第 61 回のテーマは 2019 年の Yearly Web です。

今年行った Monthly Web を振り返ります。


## Show Note


### 2019 年キーワード


#### Jxck

- WebTransport
- SXG/WBN
- ITP/SameSIte Default Lax
- DarkMode/HighContrast
- DesignSystem
- Document Policy
- Portal
- DoH


#### myakura

- doh
- cookie
- firefox css support
  - subgrid
  - aspectratio
- apple/mozilla -> google
- chromium への不安


### 1 月

- Chrome
  - Intent to Ship: Signed HTTP Exchanges (SXG)
  - Intent to Implement: High Contrast support
  - Intent to Deprecate and Remove: Shadow DOM V0, Custom Elements V0, HTML Imports
  - Extensions Manifest v3 の WebRequest to declarativeNetRequest API
- Firefox
  - WebP / AVI1 Support
  - Intent to Ship: default noopener for `_blank`
  - Anti Tracking Policy
- Safari
  - TP74 U2F HID Authenticators
  - TP74 Disable WebSQL default
  - Remove Legacy SPDY Support
  - TP73 -> iOS 12.1
- Edge
- W3C
  - Alex / Travis が TAG を抜け Alice Boxhall が join
  - WICG や Chrome チームの explainer プロセスについて問題視
  - Edge チームから HTML Modules の提案
- TC39
  - ES2019 に入る 8 つの機能(現 Stage 4)が確定
    - Optional catch binding
    - JSON superset
    - Symbol.prototype.description
    - Function.prototype.toString
    - Object.fromEntries
    - Well-formed JSON.stringify
    - String.prototype.{trimStart,trimEnd}
    - Array.prototype.{flat,flatMap}
- IETF
  - Cache Digests が実装無くて終わりそう
  - H2 Priority みんなちゃんと実装できてない問題
- Security
  - Github で TLS1.3 ロールアウト
  - LE が証明書提供前に Google Safe Browsing を見るのをやめた
    - 証明書の担保する安全(コンテンツを含まない)の議論
- Other
  - `<pinch-zoom>` のデモ
  - twitter の .well-known/change-password サポート


### 2 月

- Chrome
  - TWA for Android
  - passive event for scroll by default
  - BF Cache 実装
  - Ship: Private Class Field
  - V8/Blink 統合 GC の Oilpan が Finch 開始
  - Intent to Impl: import maps
  - Intents のフォーマット統一開始
  - .dev 提供開始
  - Android が FIDO2 認証取得
- Firefox
  - BigInt, prefers-color-scheme ettc
  - Rust で Style Component 書き直す話
- Safari
  - TP75,76
  - Safari 12.1 Release
    - Push prompt に user gesture
    - prefers-color-scheme: dark
    - Do Not Track 削除
    - default noopener for `_blank`
    - ITP2.1
- Edge
  - IE やめよう論争
    - MS の声明が雑に翻訳されてそうなった
  - MicrosoftEdge/wptest より簡単に WPTest 各仕組み
- W3C
  - Salesforce が W3C に参加
  - W3C が中規模企業プラン用意
  - W3C Process 更新、 AB メンバの席や、 Contribution ライセンスの整備
- TC39
  - Single-Chair + Vice Chair 構成から Flat 3 Chair にし責任分散
  - ES2020 開始
- IETF
  - Github を IETF で使う流れを整備
  - Fake SNI (security で詳しく)
- Security
  - 韓国で SNI Blocking
  - ESNI と ESNI Block と Fake SNI
- Other


### 3 月

- Chrome
  - Implement: Subresource prefetching+loading via Signed HTTP Exchange
  - Implement: Alternative Text in CSS Generated Content
  - Experiment: KV storage built-in module + import maps
  - JIT-less V8
  - AMP for Email
- Firefox
  - Ship: Dynamic module imports (JS `import()` syntax)
  - Ship: String.prototype.matchAll
  - Ship: CSS Containment
  - Implement: cryptomining and fingerprinting resource blocking
    - コンテンツブロッキングのリストに Mining/Fingerprint が追加された
    - Coinhive なども入っている
  - Unship: Some Shadow DOM v0 APIs
- Safari
  - TP77
    - Made navigator.mediaDevices SecureContext (r241602)
  - TP78
    - Enabled support for Pointer Events by default (r242232)
    - Added support for the referrerpolicy attribute (r242534)
  - On the Road to WebRTC 1.0, Including VP8
- Edge
  - Japan Support Blog がついにアクセスできなくなる
- WHATWG/W3C
  - #web30
  - webauthn recommendation
  - Patents and Standards Interest Group (PSIG)+
  - [ External ] Moving Delivered JavaScript Forward
  - Upcoming: W3C Workshop on Web Games, 27-28 June
  - 「標準化ってぶっちゃけどう思う?」 by littledan
- TC39
  - A Homepage for the JavaScript Specification
    - <https://tc39.github.io/>
- IETF
  - RFC 8555 - Automatic Certificate Management Environment (ACME)
- Security
  - Coinhive
    - <https://twitter.com/moro_is/status/1110748839831470081>
    - 無罪判決
    - Coinhive 自体も 3 月で終了
  - #alertloop
    - <https://www.hacker.or.jp/>
    - 一般社団法人日本ハッカー協会で寄付を募り 6,934,471 円の寄付を集めた
    - 法的支援や転職支援を行う協会の会員有志が始めた
- Other
  - OpenJS Foundation
    - <https://openjsf.org/>
  - NGINX to Join F5: Proud to Finish One Chapter and Excited to Start the Next - NGINX
    - <https://www.nginx.com/blog/nginx-joins-f5/>
    - <https://www.publickey1.jp/blog/19/nginxf5f5nginx.html>


### 4 月

- Chrome
  - Data Saver が Light Mode に
  - Chromium Chronicle 開始
  - BlinkOn10
    - New Speed Metrics (Layout Stability, LCP etc)
  - AMP Conf 2019
    - <https://amp.dev/ja/events/amp-conf-2019/>
  - Ship: Lazyload
  - Implement and Ship : Support "noreferrer" for window.open()
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/K8_-u7mK688/rK7FrIOLBQAJ>
  - 日付系 input の元号に令和追加
  - isInputPending: Facebook's first browser API contribution - Facebook Code
  - Announcing AMP Real URL
- Firefox
  - Reducing Notification Permission Prompt Spam in Firefox
    - <https://blog.nightly.mozilla.org/2019/04/01/reducing-notification-permission-prompt-spam-in-firefox/>
    - Web Push のプロンプトについて 2018 年 12 月 25 日からひと月調査した
    - 1800 万以上のプロンプトが表示され、許可されたのが 3% 未満、表示されたら即離脱したケースが 19% も
    - カメラの許可が 85% 以上なので、これは多すぎる
    - 4 月の 1 ヶ月間、 Nightly でユーザージェスチャーのないプロンプトを拒否する実験をする
    - リリース版においても、プロンプトに関する情報を限定的に集めるとも
  - Implement and Ship: Support "noreferrer" feature for window.open()
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/eTt1nd1Ia_Y/x-8JIf2TCwAJ>
  - Standardizing WASI: A system interface to run WebAssembly outside the web
    - <https://hacks.mozilla.org/2019/03/standardizing-wasi-a-webassembly-system-interface/>
- Safari
  - New WebKit Features in Safari 12.1
    - TP59-76
  - TP80
    - Added support for "noreferrer" window feature to window.open() (r243705)
  - Intelligent Tracking Prevention 2.2
    - <https://webkit.org/blog/8828/intelligent-tracking-prevention-2-2/>
    - QueryParameter でトラッキングしているっぽい場合
    - JS で付与された Cookie は 1 日で消える
    - (2.1 では document.cookie は 7 日になった)
    - SSO は ID Provider の 1st party Cookie が Header から出ていれば大丈夫ということか
  - Link Click Analytics and Privacy
    - ping 属性を無効にする設定を入れない話
    - 代わりに ITP / Content Blocker
- Edge
  - new Edge Dev/Canary 公開
  - UA に Edg/version が追加
  - コードは Redmond に 5$ 送ったらもらえる?
- WHATWG/W3C
  - DRAFT Memorandum of Understanding Between W3C and WHATWG
    - HTML と DOM 仕様を WHATWG で策定し、 W3C がその Review Drafts を REC に持って行くという方針のドラフト
  - W3C が standardize a Full TV Experience on the Web で Emmy 賞
  - Apple の John Wilander による Signed Exchange のプライバシーにおける考察
    - リソースのないニュースサイトにアドテクが Signed Exchange を提供するようになるとどうなるか?
    - トラッキング入りの個別の Signed package を送られやしないか?
- TC39
  - Standard-lib をどういう粒度で入れるかの議論
  - smooshgate の反省とアップデート (flattern)
- IETF
  - (Joke) RFC 8565 - Hypertext Jeopardy Protocol
    - <https://tools.ietf.org/html/rfc8565>
  - RFC 8586 - Loop Detection in Content Delivery Networks (CDNs)
    - <https://tools.ietf.org/html/rfc8586>
  - HTTP State Tokens
    - <https://tools.ietf.org/html/draft-west-http-state-tokens-00>
  - The QUIC Loss Bits
    - <https://tools.ietf.org/html/draft-ferrieux-hamchaoui-quic-lossbits-00>
  - HTTP Testing Resources - httpwg/wiki Wiki
    - <https://github.com/httpwg/wiki/wiki/HTTP-Testing-Resources>
  - コインハイブ事件のご報告とこれからのこと
    - <https://note.mu/morois/n/n7210db925aa1>
  - 2019/7/8 からは CrossRoot ではなく ISRG Root X1 で証明書を配布するようになる
    - <https://letsencrypt.org/2019/04/15/transitioning-to-isrg-root.html>
  - Google 7 割くらい CSP をデプロイし、 nonce only は 1 割程度までデプロイ済み
    - <https://speakerdeck.com/mikispag/content-security-policy-a-successful-mess-between-hardening-and-mitigation>
- Other
  - Fastly Lucet
    - <https://www.fastly.com/blog/announcing-lucet-fastly-native-webassembly-compiler-runtime>
    - Mozilla Cranelift 上の WASM/WASI runtime で
  - Cloudflare WARP
    - 無料 VPN サービス、有料版 Warp+ は Argo (輻輳最適化)
  - WAPM
    - <https://wapm.io/>
    - WASM のパッケージマネージャー/リポジトリ


### 5 月

- Google
  - mozaic bootcamp 2019
    - <https://blog.jxck.io/entries/2019-05-12/mozaic-bootcamp-2019.html>
  - Google I/O
    - <https://blog.chromium.org/2019/05/google-io-2019-whats-new-with-chrome.html>
  - Paint Holding
    - <https://developers.google.com/web/updates/2019/05/paint-holding>
    - ページ遷移のときに一度白でペイントしていたのをやめて前の画面を残す
  - Chromium Blog: Improving privacy and security on the web
    - <https://blog.chromium.org/2019/05/improving-privacy-and-security-on-web.html>
    - SameSiteCookie や Fingerprint 対策など、プライバシー保護を強化していく
  - Ship: Media Queries: prefers-color-scheme feature
  - Ship: Form-associated custom elements
  - Ship: `formdata` event
  - Implement and Ship: form.requestSubmit()
  - Implement: Periodic Background Sync
  - Implement: Picture-in-Picture for arbitrary content
    - 任意のコンテンツを PiP
  - Implement (meta): Bundled HTTP Exchanges
  - PSA: Turning on LayoutNG
    - LayoutNG が Chrome76 から有効
  - OOR-CORS is enabled by default on HEAD
    - このあと色々大変で 1 年くらい続いた
  - Flutter for Web
    - <https://developers.googleblog.com/2019/05/Flutter-io19.html>
- Firefox
  - Firefox 67 for developers
    - prefers-color-scheme
    - String.matchAll()
    - Dynamic import()
    - hashbang grammar
    - CSS revert keyword
    - word-break: break-word
  - TLS 1.0 and 1.1 Removal Update
    - 10 月には Nightly で無効にする予定
  - Firefox 67: Dark Mode CSS, WebRender, and more
    - prefers-color-scheme
  - Implement: Cookie SameSite=lax by default and SameSite=none only if secure
  - 拡張の中間証明書が失効したため拡張が一時使えない状況に
    - <https://hacks.mozilla.org/2019/05/technical-details-on-the-recent-firefox-add-on-outage/>
  - Browser Compat Data のガバナンス強化
    - <https://hacks.mozilla.org/2019/05/browser-compatibility-data-and-open-source-governance/>
    - 2019 年はデータを完全なものにしたいという野望も持っていると
  - UA 文字列から OS のアーキテクチャなど(WOW64 とか)を削ろうという提案
    - <https://groups.google.com/d/topic/mozilla.dev.platform/vEMIqgnMxRw/discussion>
    - ソフトウェアのダウンロードページなどに影響が出ないかなどの疑問が出ている
- Safari
  - TC81
    - supported-color-scheme が color-scheme に
    - Ad Click Attribution(後述)
  - TC82
    - Fetch API の keep-alive が有効に
  - Privacy Preserving Ad Click Attribution For the Web
    - 広告のコンバージョンを測る Cookie を無効にしたい
    - かわりに adcampaignid と addestination 属性を a 要素に追加
    - `/.well-known/ad-click-attribution/`
- Edge
  - MS Build
  - EdgeHTML17
    - First Edge Preview for macOS
- WHATWG/W3C
  - Privacy Preserving Ad Click Attribution
    - 現時点の提案は adcampaignid と addestination 属性を a 要素に追加する
  - JSON module support
    - import 文で JSON を読み込めるように
  - Add form.requestSubmit()
    - submit ボタンを押した時の挙動(バリデーション、 submit イベント発火)と同様のメソッド
  - tkent-google/std-switch
    - スイッチコントロールを標準コンポーネント化する試み
- TC39
- IETF
  - RFC 8594 - The Sunset HTTP Header Field
    - サービスが落ちる時間を前もって知らせるヘッダ
  - RFC 8615 - Well-Known Uniform Resource Identifiers (URIs)
    - "/.well-known/" のこと
  - The WebTransport Protocol Framework
    - <https://tools.ietf.org/html/draft-vvv-webtransport-overview-00>
  - Incrementally Better Cookies
    - <https://tools.ietf.org/html/draft-west-cookie-incrementalism-00>
    - Cookie を徐々に改善していく話
    - まずは SameSite=Lax をデフォルトに
    - SameSite=None にするには Secure を強制
  - First-Party Sets and SameSite Cookies
    - <https://tools.ietf.org/html/draft-west-cookie-samesite-firstparty-01>
- Other
  - 日本ハッカー協会セミナー「不正指令電磁的記録罪の傾向と対策」
    - <https://www.youtube.com/watch?v=umYIqISRIbg>
  - Google Online Security Blog: New research: How effective is basic account hygiene at preventing hijacking
    - <https://security.googleblog.com/2019/05/new-research-how-effective-is-basic.html>
  - A Conspiracy To Kill IE6
    - 元 YouTube エンジニアによる YouTube が IE6 サポートを打ち切るための策略についての回顧録
    - 買収前の古い YouTube 社員によって作られた "OldTuber" という、 Google のインフラチェックをバイパスする権限を悪用しバナーを表示


### 6 月

- TODO


### 7 月

- TODO


### 8 月

- TODO


### 9 月

- TODO


### 10 月

- TODO


### 11 月

- TODO


### 12 月

- TODO


### Similar Yearly

- How the internet changed in 2019 (and what to expect in 2020)
  - <https://www.fastly.com/blog/how-the-internet-changed-in-2019>
- Web Design And Development Advent Roundup For 2019 - Smashing Magazine
  - <https://www.smashingmagazine.com/2019/12/web-design-development-advent-roundup-2019/>
- The Web in 2020: wohin sich das Web bewegt - Speaker Deck
  - <https://speakerdeck.com/christianliebel/the-web-in-2020-wohin-sich-das-web-bewegt>
- Six Web Performance Technologies to Watch in 2020 - Simon Hearne
  - <https://simonhearne.com/2019/2020-predictions/>
- Mozilla Hacks' 10 most-read posts of 2019 - Mozilla Hacks - the Web developer blog
  - <https://hacks.mozilla.org/2019/12/mozilla-hacks-most-read-blog-posts-of-2019/>
  - 1.Pyodide, 2.WASI, 3.WebThings
