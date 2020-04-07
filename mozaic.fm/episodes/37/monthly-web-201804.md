# [monthly-web][mozaic.fm] ep37 Monthly Web 201804

## Info

audio: https://files.mozaic.fm/mozaic-ep37.mp3

published_at
: 2018-05-05

guest
: [@myakura](https://twitter.com/myakura)


## Theme

第 37 回のテーマは 2018 年 4 月の Monthly Web です。


## Show Note


### Chrome 動向

- Stable: 66
- Updates
  - *New in Chrome 66*
    - <https://developers.google.com/web/updates/2018/04/nic66>
    - CSS Typed Object Model
    - Async Clipboard API
    - CSS Paint API
    - autocomplete in TextArea and Select
    - autocapitalize for form (compat with safari)
    - trimStart() and trimEnd()
  - *What's New In DevTools (Chrome 67)*
    - <https://developers.google.com/web/updates/2018/04/devtools>
    - Search across all network headers
    - Copy as fetch
    - New audits, desktop configuration options, and viewing traces
    - Stop infinite loops
    - JavaScript VM instances clearly listed in the Memory panel
    - The Network tab in the Sources panel has been renamed to the Page tab
    - Dark theme updates
    - Certificate transparency information in the Security panel [blog](https://blog.jxck.io/entries/2018-03-27/certificate-transparency.html)
    - Site isolation features in the Performance panel
  - Present web pages to secondary attached displays
    - <https://developers.google.com/web/updates/2018/04/present-web-pages-to-secondary-attached-displays>
  - Loading WebAssembly modules efficiently
    - <https://developers.google.com/web/updates/2018/04/loading-wasm>
  - *Enabling publishers to implement user controls on AMP pages*
    - <https://amphtml.wordpress.com/2018/04/02/enabling-publishers-to-implement-user-controls-on-amp-pages/>
    - AMP でユーザ制御 (Cookie 仕様の許可ダイアログなど) を実装できるように
- *Blink on 9*
  -  LT List
    - <https://docs.google.com/spreadsheets/d/1DovPnWWSXuG8PRyN-HT7R9gZ4PLihly5ZepqZJ3vmAc/edit#gid=0>
  - Tricium (code analyzer for chromium)
    - <https://docs.google.com/presentation/d/1_iJGKqdeV4lyUsTTCrU7xSmCs9xz3Xe9qjHRFVF1tc0/edit>
    - <https://chromium.googlesource.com/infra/infra/+/master/go/src/infra/tricium>
  - Mojo (Service Worker IPC)
    - <https://docs.google.com/presentation/d/1ih5Dp39eGrfWKhtMLk2ZEibv2-t30kReiXGGgtt_TDM/edit>
  - Lazyload
    - <https://docs.google.com/presentation/d/14chb-DUlP6uofSL5aDTXceEVeKehd__9qqknRRC41qw/edit>
  - Optimized functions are not crucial for the performance in our cases
    - <https://docs.google.com/presentation/d/1fjuAcjopk726cXKmmKOUl_IQQ3_2Ih_Vt15tgjcr4jU/edit>
  - Server Push
    - <https://docs.google.com/presentation/d/1O-hZEewKwPHPrcucLUE2MRQhBiekhMtWm-eHS49XVhs/edit>
  - *Layered APIs*
    - Layered APIs: an overview and update
      - <https://docs.google.com/presentation/d/1_5EVAiuragdEqop8V9b1hJkOW38y4EsXYgNBKdpSHmA/edit>
    - [blog](https://blog.jxck.io/entries/2018-05-01/layered-apis.html)
- Intents
  - Ship: [Intervention] Stop loading in background, on mobile
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/83sXW-6caZ0/GzidYguJCgAJ>
  - Ship: RTCPeerConnection.id
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/4ZKccJozMuU/So_uEJbLCgAJ>
  - Ship: Provide network quality estimates to web servers via Client Hints
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/G_rkd0yo2AM/IGXDxRl9CwAJ>
  - *Ship: fetch() credentials default to "same-origin"*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/WOAtshyL2As/wITX3abkAQAJ>
    - fetch の cookie 付与などのデフォルトが same-origin になり、送られるようになった
    - 送られたくない人は明示的に omit する必要
  - Implement and Ship: WebAudio: Selectable automation rate for AudioParam
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/extLjVzLw7s/9XUZvQqcBQAJ>
  - *Implement and Ship: Cross-Origin Read Blocking (CORB)*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/hnAWBzq1qys/DhyRSDKKBQAJ>
    - <https://chromium.googlesource.com/chromium/src/+/master/services/network/cross_origin_read_blocking_explainer.md>
    - <https://anforowicz.github.io/xsdb-demo/index.html>
  - Implement and Ship: ping, rel, referrerPolicy, relList, hreflang, type and text properties on SVG elements
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/LXzY4gwaZFU/fVJIr55OAwAJ>
  - Implement and Ship: Case-insensitive DOMTokenList.supports
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/F3gn1sjq_mw/wJrBfeu5BwAJ>
  - Implement and Ship: Blocking FTP subresources
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/HzumeW2JQW8/TtbNkXw8AwAJ>
  - Implement and Ship: Accept two values in the overflow shorthand
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/4qF8XPQ1z2s/q2MFDxHxCAAJ>
  - Implement and Ship: CSS: "grab" and "grabbing" values for cursor property
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/1kWStcPD2yg/wrQvtTKEAAAJ>
  - Implement and Ship: user activation through long-press gesture
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/-2AyrUFwXvY/Q_wCUmKSAgAJ>
  - Implement: customElements.upgrade()
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/zCQe7UkR07w/8In0oinBAgAJ>
  - *Implement: Event Timing*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/QNE6TVQve-0/y3KfnxOaBAAJ>
  - Implement: Wake Lock API based on Promise
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/KMNZmMF1_H4/U6EGekDrBwAJ>
  - Implement: Keyboard Map
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/m0OOlPJGNTY/Mofa0PzxBwAJ>
  - Implement: Add FullscreenOptions
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/XdRp1DXmUFs/5vda0YM6CAAJ>
  - *Implement: User Timing L3*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/T-DgYf79sFU/Kuu6Ltt6CAAJ>
  - Implement: WebUSB on Web Workers
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/MReOVYgRpKk/1jY8MiyACQAJ>
    - USB のヘビーな I/O をワーカに
  - *Implement: Priority Hints API*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/65lfM2f0eeM/-1ttGbZmCQAJ>
    - critical, high, medium, low, unimportant で優先度付け
    - H2 の dependency/weight に反映するなど
  - Implement: WebXR Hit-test
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/HYTqcRJu_aU/Dz0QTOGWCgAJ>
  - Implement: Worker's RequestAnimationFrame and new OffscreenCanvas.commit()
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/3dAVa13THa8/VeBUAmW5CwAJ>
  - Experiment: Kaby Lake VP8/VP9 acceleration on ChromeOS
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/S1l48d1NVsk/AfmkIuCcAgAJ>
    - Kaby Lake 以降に入ったハードウェアデコーダーを Chrome OS で利用する
  - Unship: DOMCursor
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/78CbWoEUO7M/_yxxnMFIAgAJ>
  - Unship: SVGSVGElement.{pixel, screenPixel}UnitToMillimeter{X, Y}
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/-Vhlz6uEVOA/Z1wt0yEQBQAJ>
  - Remove: PointerEvent.fromElement and PointerEvent.toElement
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/G2s1Ol3qcgA/7J1i-WctCAAJ>
  - Deprecate and Remove: CSS filter should reject negative brightness
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/eIVnLFD_tPM/4tZUiyyBAwAJ>
  - Deprecate and Remove: 'stalled' events for HTMLMediaElements using MediaSource
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/x54XtrTyOP8/4-5QZlZzDAAJ>
  - *Deprecate: Nonsecurely delivered cookies.*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/r0UBdUAyrLk/Pqg-fu6WBAAJ>
    - 平文で Cookie を送る場合、その Cookie が古いものなら消してしまうという提案
  - *Request to Deprecate and Remove: Trust in existing Korean GPKI certificates*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/ujIKn9HUCF4/sRruM1LeBAAJ>
    - 韓国の GPKI も色々やらかしてるから symantec みたいに外してくれというリクエスト
  - Site Isolation Status - Making progress towards M67
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/_T0bC1X_fCI/nFv3yH5TBAAJ>
  - Request for comment: `>>>` (a shadow-piercing combinator) in static profile (under experimental flag)
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/ScMLN_Hj52E/v0ETd6NpBQAJ>
  - PSA: Deprecating notification badges on Android M for Samsung devices
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/8OxBupjBBbE/gqH5qd6NBQAJ>
- Team Weekly Snippet
  - Loading (3/12 - 30)
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/d4bzIzZXzxo/WEeU6xJZCAAJ>
  - Platform Architecture
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/TeEabAw5Msc/aYPTZXCQCwAJ>
- v8
  - V8 JavaScript Engine: Improved code caching
    - <https://v8project.blogspot.jp/2018/04/improved-code-caching.html>
- Other
  - *Official Google Webmaster Central Blog: Distrust of the Symantec PKI: Immediate action needed by site operators*
    - <https://webmasters.googleblog.com/2018/04/distrust-of-symantec-pki-immediate.html>
    - <https://developers-jp.googleblog.com/2018/04/distrust-of-symantec-pki-immediate.html>
    - Chrome 66: 2018/4/17 に 2016/6 以前の証明書が無効
    - Chrome 70: 2018/10/16 に全て無効
  - *Migrate a GCM Client App for Android to Firebase Cloud Messaging*
    - <https://developers.google.com/cloud-messaging/android/android-migrate-fcm>
    - GCM での Push は 2018/4/10 で deprecate 2019/4/11 で remove
  - Bookmarklet: Chrome DevTools trace page
    - <https://paul.kinlan.me/bookmarklet-trace-page/>
    - <https://puppeteeraas.com/> で取得したトレースを
    - <https://chromedevtools.github.io/timeline-viewer/> で表示する
    - という bookmarklet が便利という話
  - New tools for building user controls in AMP pages
    - <https://amphtml.wordpress.com/2018/04/18/new-tools-for-building-user-controls-in-amp-pages/>
  - Chromium Blog: Protecting users from extension cryptojacking
    - <https://blog.chromium.org/2018/04/protecting-users-from-extension-cryptojacking.html>


### Firefox 動向

- Stable: 59
- Updates
  - These Weeks in Firefox: Issue 36
    - <https://blog.nightly.mozilla.org/2018/04/11/these-weeks-in-firefox-issue-36/>
  - Improving DevTools' performance, one iteration at a time
    - <https://blog.nightly.mozilla.org/2018/04/10/improving-devtools-performance-one-iteration-at-a-time/>
- Intents
  - Ship: Allow the overflow shorthand to accept two values.
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/4vy-a5_a35o/FH_KnQFGBQAJ>
  - Ship: DOMPoint interface from its latest spec
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/jwmkVmU4DNM/IpF5K5epBAAJ>
  - *Ship: PerformanceServerTiming*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/MSzaY7_4mvg/hGpUlTzxAgAJ>
  - *Implement and Ship: same-site cookies*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/7hOKZDuO3qI/w9FVLatSAAAJ>
    - *収録中 Jxck が "CORS" と言ってるのは "CSRF" の間違いです*
  - Implement: CSS subgrid
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/-1SfS4jWqd8/D6aJ7XprBQAJ>
  - Implement: Early, experimental support for application/javascript+binast
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/1ZrtZlcI888/jOr1cTRHBQAJ>
  - Unship nsIDOMEvent:
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/5qNZRTZrhLE/TkTRLIHHBwAJ>
  - *Unship: URL.createObjectURL(MediaStream)*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/o_0RoYoCmM4/vpspAxCVCAAJ>
  - Unship constructors on SVGNumber
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/1jEXK-Ctbng/T_AOEyyRCAAJ>
  - Unship: SVGViewElement.viewTarget
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/3rbtcFOcVjI/vC-oG_uQCAAJ>
  - Require Node 8.9.1/npm 5.5.1 for ESLint
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/OlPUPJ9x38s/CF3vzI2gCAAJ>
  - Deprecate: JS-Implemented WebIDL
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/0GE0VDS1RNg/WDBaAehxAgAJ>
- Site Compat
  - *Basic auth credentials are now encoded in UTF-8 instead of ISO-8859-1 (Affecting)*
    - <https://www.fxsitecompat.com/en-CA/docs/2018/basic-auth-credentials-are-now-encoded-in-utf-8-instead-of-iso-8859-1/>
  - *URL.createObjectURL() no longer accepts MediaStream as argument*
    - <https://www.fxsitecompat.com/en-CA/docs/2018/url-createobjecturl-no-longer-accepts-mediastream-as-argument/>
  - SVGViewElement.prototype.viewTarget has been removed
    - <https://www.fxsitecompat.com/en-CA/docs/2018/svgviewelement-prototype-viewtarget-has-been-removed/>
  - Touch event listeners are now passive by default, making scrolling faster on mobile
    - <https://www.fxsitecompat.com/en-CA/docs/2018/touch-event-listeners-are-now-passive-by-default-making-scrolling-faster-on-mobile/>
  - SVGNumber no longer comes with constructor
    - <https://www.fxsitecompat.com/en-CA/docs/2018/svgnumber-no-longer-comes-with-constructor/>
- Other
  - JavaScript to Rust and Back Again: A wasm-bindgen Tale
    - <https://hacks.mozilla.org/2018/04/javascript-to-rust-and-back-again-a-wasm-bindgen-tale/>
  - *Compatibility/Unshippables*
    - <https://wiki.mozilla.org/Compatibility/Unshippables>
    - ship すると web の互換性が壊れる機能のリスト
  - *MDN Changelog for March 2018*
    - <https://hacks.mozilla.org/2018/04/mdn-changelog-for-march-2018/>
    - Brotli を使う実験をしてみたら圧縮率は高かったけど時間がかかるという結果に
      - エンコードのレベルなどを変えて向上はした
    - CloudFront (Brotli 非サポート) を使うようにするので、実験は終了
    - そもそも Python のミドルウェアで動的なエンコードをかますような実装だったので、使い方が間違っていた感も否めない
    - Brotli については Akamai や Cloudflare も過去に実験している
      - <https://blog.cloudflare.com/results-experimenting-brotli/>
      - <https://blogs.akamai.com/2016/02/understanding-brotlis-potential.html>
  - *A new video series: Web Demystified*
    - <https://hacks.mozilla.org/2018/04/a-new-video-series-web-demystified/>
    - Web の基礎技術を解説するビデオシリーズ
  - *Hello wasm-pack!*
    - <https://hacks.mozilla.org/2018/04/hello-wasm-pack/>
    - WASM と JS をいい感じ混ぜて使うツール
    - Rust (Cargo) と Node (NPM) を透過的に使えるように
  - Testing Strategies for React and Redux
    - <https://hacks.mozilla.org/2018/04/testing-strategies-for-react-and-redux/>
  - *Sneak Peek at WebAssembly Studio*
    - <https://hacks.mozilla.org/2018/04/sneak-peek-at-webassembly-studio/>
    - <https://webassembly.studio/>


### Safari 動向

- Stable: 11.1
- *New WebKit Features in Safari 11.1*
  - <https://webkit.org/blog/8216/new-webkit-features-in-safari-11-1/>
- *Release Notes for Safari Technology Preview 53*
  - <https://webkit.org/blog/8179/release-notes-for-safari-technology-preview-53/>
  - Added Fullscreen API as an Experimental Feature (r229680)
  - Added support for VCP encoder on macOS and iOS (r229920)
- *Release Notes for Safari Technology Preview 54*
  - <https://webkit.org/blog/8232/release-notes-for-safari-technology-preview-54/>
  - Fixing Clipboard API
  - Fixing Beacon API
  - Implement createImageBitmap(Blob)
  - Fixing WebRTC
  - Fixing Web Inspector
- Other
  - *Introducing the Payment Request API for Apple Pay*
    - <https://webkit.org/blog/8182/introducing-the-payment-request-api-for-apple-pay/>
  - Web Inspector Styles Sidebar Improvements
    - <https://webkit.org/blog/8239/web-inspector-styles-sidebar-improvements/>
  - *Safari の UA 文字列が固定されて固定されなくなったおはなし \- fragmentary*
    - <https://myakura.hatenablog.com/entry/2018/04/16/083000>
  - itp_study
    - <https://web-study.connpass.com/event/84158/>


### Edge 動向

- Stable: EdgeHTML 16
- Status Updates
  - <https://github.com/MicrosoftEdge/Status/compare/production@{2018-04-01}...production@{2018-05-01}>
- EdgeHTML
  - 17 が出そうで出なかった
  - <https://aka.ms/devguide_edgehtml_16>
- Build Changelog
  - <https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/>
- ChakraCore
  - Release ChakraCore v1.8.3 · Microsoft/ChakraCore
  - <https://github.com/Microsoft/ChakraCore/releases/tag/v1.8.3>
  - <https://github.com/Microsoft/ChakraCore/wiki/Roadmap#v183>
- Other
  - First wave of Progressive Web Apps hits the Microsoft Store
    - <https://www.neowin.net/news/first-wave-of-progressive-web-apps-hits-the-microsoft-store>
  - 2018 年 4 月の Internet Explorer / Microsoft Edge の累積的なセキュリティ更新プログラムを公開しました - Japan IE Support Team Blog
    - <https://blogs.technet.microsoft.com/jpieblog/2018/04/11/securityupdate201804/>
  - *Introducing sonarwhal v1: The linting tool for the web*
    - <https://blogs.windows.com/msedgedev/2018/04/19/sonarwhal-v1-linting-tool-for-web/>
    - Web を lint するツールの v1 がリリース
  - *Introducing the Microsoft Edge DevTools Preview app*
    - <https://blogs.windows.com/msedgedev/2018/04/25/introducing-the-microsoft-edge-devtools-preview-app/>


### WHATWG/W3C 動向

- Recommendation
  - TTML Profiles for Internet Media Subtitles and Captions 1.0.1 (IMSC1) is now a W3C Recommendation
    - <https://www.w3.org/blog/news/archives/6975>
- Proposed Recommendation
  - Call for Review: Web Content Accessibility Guidelines (WCAG) 2.1
    - <https://www.w3.org/blog/news/archives/6972>
- Candidate Recommendation
  - Login with no password - Major Standards Milestone in Global Effort Towards Simpler, Stronger Authentication on the Web
    - <https://www.w3.org/blog/news/archives/6948>
  - W3C Invites Implementations of Timed Text Markup Language 1 (TTML1) (Third Edition)
    - <https://www.w3.org/blog/news/archives/6967>
- Working Draft
  - Call for Consensus: ICE Transport Extensions for WebRTC
    - <https://lists.w3.org/Archives/Public/public-webrtc/2018Apr/0058.html>
  - Call for Consensus: MediaStreamTrack Content Hints
    - <https://lists.w3.org/Archives/Public/public-webrtc/2018Apr/0059.html>
  - Call for Consensus: DSCP Control API
    - <https://lists.w3.org/Archives/Public/public-webrtc/2018Apr/0060.html>
- First Public Working Draft
  - Web of Things Protocol Binding Templates; updated WoT drafts
    - <https://www.w3.org/blog/news/archives/6945>
  - *CSS Layout API Level 1*
    - <https://www.w3.org/blog/news/archives/6953>
- Chartering
  - Work in Progress on Web Fonts Working Group Charter
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Apr/0000.html>
  - AppsDesignLab Community Group created
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Apr/0007.html>
  - Audio Description Community Group created
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Apr/0006.html>
  - Proposed W3C Charter: Distributed Tracing Working Group
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Apr/0005.html>
  - Proposed W3C Charter: Timed Text Working Group
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Apr/0003.html>
  - Proposed W3C Charter: Web Real-Time Communications Working Group
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Apr/0008.html>
- *TAG Review*
  - *CSS Layout API*
    - <https://github.com/w3ctag/design-reviews/issues/224>
  - *Signed Exchanges*
    - <https://github.com/w3ctag/design-reviews/issues/235>
  - *Web Components Guidelines Doc?*
    - <https://github.com/w3ctag/design-reviews/issues/227>
  - *Find-in-page API(s)*
    - <https://github.com/w3ctag/design-reviews/issues/236>
- Other
  - *TAG の election で Intel の @kennethrohde が Join*
    - <https://twitter.com/w3cdevs/status/981159615013498880>
    - <https://www.w3.org/2018/03/05-tag-nominations>
    - <https://www.w3.org/blog/news/archives/6939>
  - *Proposal: <https://example.com/.well-known/modify-credentials*>
    - <https://lists.w3.org/Archives/Public/public-webappsec/2018Apr/0003.html>
  - Audio Description Community Group Proposed
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Apr/0001.html>
    - To create an open standard file format to support audio description all the way from scripting to mixing
  - *Requirements for Secondary Certificates*
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2018AprJun/0052.html>
  - *`Accept-CH` header is weird · Issue #206 · w3ctag/design-reviews*
    - <https://github.com/w3ctag/design-reviews/issues/206#issuecomment-379422513>
    - 先月話した Client Hints 、 TAG 的にはやってくことになった
  - *CSS2 maintenance proposal · Issue #2553 · w3c/csswg-drafts*
    - <https://github.com/w3c/csswg-drafts/issues/2553>
    - CSSWG の F2F で、 CSS Level 2 仕様の現状まとめと今後のメンテ計画について議論
  - *A short update on the web-platform-test project invitation*
    - <https://www.w3.org/blog/2018/04/a-short-update-on-the-web-platform-test-project-invitation/>
    - WTP の organization を移した話


### TC39 動向

- minutes
  - *3 月の minutes*
  - <https://github.com/tc39/tc39-notes/tree/master/es9/2018-03>
- Proposals Diff
  - <https://github.com/tc39/proposals/compare/master@{2018-01-01}...master@{2018-02-01}>
  - 0->1: N/A
  - 1->2: N/A
  - 2->3: N/A
  - 3->4: N/A
- New Proposals
- Other
  - *「TC39 のリリースは 5-10 年サイクルに戻した方がいいのかもなぁ」 by @awbjs*
    - <https://twitter.com/awbjs/status/984546160277794816>
    - TC39 の大きなゴールが無い問題


### IETF 動向

- IETF
- RFC
- IETF Last Call
- WG Last Call
  - 2nd Working Group Last Call: draft-ietf-httpbis-rand-access-live-03
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2018AprJun/0023.html>
    - 大きめの変更が入ったので 2 回目
- Call for Adoption
- I-D Action
- Draft
  - *HTTP Server *ush*
    - <https://tools.ietf.org/html/draft-pardue-server-ush-00>
    - April Fools' Draft
  - HTTP Representation Variants
    - <https://tools.ietf.org/html/draft-ietf-httpbis-variants-00>
  - *HTTPtre: HTTP の改定が各仕様でドラフトに*
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2018AprJun/0024.html>
    - Authentication
      - <https://tools.ietf.org/html/draft-ietf-httpbis-auth-00>
    - Caching
      - <https://tools.ietf.org/html/draft-ietf-httpbis-cache-00>
    - Conditional Requests
      - <https://tools.ietf.org/html/draft-ietf-httpbis-conditional-00>
    - Range Requests
      - <https://tools.ietf.org/html/draft-ietf-httpbis-range-00>
    - Semantics and Content
      - <https://tools.ietf.org/html/draft-ietf-httpbis-semantics-00>
    - Message Syntax and Routing
      - <https://tools.ietf.org/html/draft-ietf-httpbis-messaging-00>
  - *The 'payto' URI scheme for payments*
    - <https://tools.ietf.org/html/draft-dold-payto-01>
    - 支払いのための URI scheme の提案
    - `payto://sepa/CH9300762011623852957?amount=EUR:200.0&message=hello`
  - Referring to Internet Drafts as 'Internet Drafts' Rather Than 'Works in Progress'
    - <https://tools.ietf.org/html/draft-roach-id-cite-00>
    - 'Works in Progress' という用語を 'Internet Drafts' で統一する
  - Geneve Extensions
    - <https://tools.ietf.org/html/draft-worley-nvo3-geneve-misc-00>
  - Too Many Requests Response Code for the Constrained Application Protocol
    - <https://tools.ietf.org/html/draft-ietf-core-too-many-reqs-00>
  - *Signed HTTP Exchanges Implementation Checkpoints*
    - <https://tools.ietf.org/html/draft-yasskin-httpbis-origin-signed-exchanges-impl-00#section-3.1.1>
  - Usage of SPAKE with TLS 1.3
    - <https://tools.ietf.org/html/draft-barnes-tls-pake-00>
  - Elliptic curve 2y^2=x^3+x over field size 8^91+5
    - <https://tools.ietf.org/html/draft-brown-ec-2y2-x3-x-mod-8-to-91-plus-5-01>
  - HTTP Overload Control Mechanism
    - <https://tools.ietf.org/html/draft-asveren-dispatch-http-overload-control-00>
  - Poll-Based SET Token Delivery Using HTTP
    - <https://tools.ietf.org/html/draft-ietf-secevent-http-poll-00>
    - Security Event Token (jwt etc) を Polling で取得する
  - Push-Based SET Token Delivery Using HTTP
    - <https://tools.ietf.org/html/draft-ietf-secevent-http-push-00>
    - Security Event Token (jwt etc) を Push(HTTP POST) で配布す
- Other
  - Tests for HTTP Structured Headers
    - <https://github.com/httpwg/structured-header-tests>
    - 実装者向け test case のリポジトリ


### 周辺動向

- *Announcing 1.1.1.1: the fastest, privacy-first consumer DNS service*
  - <https://blog.cloudflare.com/announcing-1111/>
  - <https://labs.apnic.net/?p=1127>
  - <https://1.1.1.1/>
  - <https://1.1.1.1/ja-jp/>
- ImperialViolet - Post-quantum confidentiality for TLS
  - <https://www.imperialviolet.org/2018/04/11/pqconftls.html>
  - 耐量子コンピュータ TLS
- Submit final certs to CT logs (#3640)
  - <https://github.com/letsencrypt/boulder/commit/1271a15be79b9717ee5b98e707b76e7ac86a9a0e>
  - SCT を埋め込んだ証明書も Submit するように
- *ブロッキング騒動に対する声明*
  - ISOC-JP
    - 著作権侵害サイトに対するブロッキングについて
    - <https://www.isoc.jp/wiki.cgi?page=20180412_Blocking_Statement>
  - JPNIC
    - 政府によるサイトブロッキング要請報道への当センターの見解 - JPNIC
    - <https://www.nic.ad.jp/ja/topics/2018/20180412-01.html>
  - WIDE
    - 漫画・アニメの海賊版サイトに関する WIDE プロジェクトの意見
    - <http://www.wide.ad.jp/News/2018/20180411.html>
  - NTT
    - インターネット上の海賊版サイトに対するブロッキングの実施について
    - <http://www.ntt.co.jp/news2018/1804/180423a.html>
  - その他多数
  - mangamura.org で言えば、 Cloudflare を使ってるので DNS A レコード削除で対応
  - ISP なら、外の DNS を設定してる人にもブロックを適用できる
  - 外 DNS を DoH で使うとブロックできないので、 DoH 普及するとこの方法はできなさそう
- *Wizard Bible*
  - <http://wizardbible.org/>
  - セキュリティ系の情報まとめサイトが閉鎖された。
  - 警察/検察からの圧力があったらしい
- Announcing NGINX Unit 1.0 \| NGINX
  - <https://www.nginx.com/blog/nginx-unit-1-0-released/>
  - 軽量アプリケーションコンテナ実装
- April 22, 1993: Mosaic Browser Lights Up Web With Color, Creativity \| WIRED
  - <https://www.wired.com/2010/04/0422mosaic-web-browser/>
  - Mosaic 1.0 リリースから 25 年
- *Yahoo! Japan が TLS1.0, TLS1.1 を 2018 年 6 月 1 日で切る*
  - <https://security.yahoo.co.jp/news/tls12.html>


### イベント

- 4 月
  - 18-19: BlinkOn 9
- 5 月
  - 7-9: Microsoft Build
    - <https://developer.microsoft.com/en-us/events/build>
  - 8-10: Google I/O 2018
    - <https://events.google.com/io/>
  - 10-11: Web5G Workshop
    - <https://www.w3.org/2017/11/web5g-workshop/sponsorship>
  - build
- 6 月
  - 4-8: WWDC
    - <https://developer.apple.com/wwdc/>
- 10 月
  - 22-26: TPAC 2018 Lyon
    - <https://www.w3.org/2018/10/TPAC/Overview.html>
