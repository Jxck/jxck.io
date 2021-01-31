# [monthly-web][mozaic.fm] ep79 Monthly Web 202101

## Info

audio: https://files.mozaic.fm/mozaic-ep79.mp3

published_at
: 2021-01-31

guest
: [@myakura](https://twitter.com/myakura)

## Theme

第 79 回のテーマは 2020 年 12 月と 2021 年 1 月の Monthly Web です。


### Chrome 動向


#### Stable: 88


#### Updates

- Chromium Blog: Chrome Dev Summit 2020: Building an open web for our users and developers
  - <https://blog.chromium.org/2020/12/chrome-dev-summit-2020-wrap-up.html>
- *Chromium Blog: Manifest V3 now available on M88 Beta*
  - <https://blog.chromium.org/2020/12/manifest-v3-now-available-on-m88-beta.html>
  - 拡張の V3 が Beta に
  - リモートコードホストの禁止
  - Background Page から Service Worker へ
  - API が宣言的に
  - 権限が詳細に
- Chromium Blog: Better content sharing with Custom Tabs
  - <https://blog.chromium.org/2021/01/better-content-sharing-with-custom-tabs.html>
- Chromium Blog: Privacy Sandbox in 2021: Testing a more private web
  - <https://blog.chromium.org/2021/01/privacy-sandbox-in-2021.html>
- *New in Chrome 88 - Chrome Developers*
  - <https://developer.chrome.com/blog/new-in-chrome-88/>
  - maifest v3
  - aspect-ratio for any element
  - throttle chained JavaScript timers for hidden pages
  - Play Billing in Trusted Web Activity.
  - Chrome Dev Summit video are up
- *Chromium Blog: Chrome 89 Beta: Advanced Hardware Interactions, Web Sharing on Desktop, and More*
  - <https://blog.chromium.org/2021/01/chrome-89-beta-advanced-hardware.html>
  - WebHID API
  - Web NFC
  - Web Serial API
  - Web Sharing on Desktop
  - Origin Trials
  - Other features in this release
    - AVIF Image Decode
    - Cross-origin opener policy reporting API
    - Display override in web app manifests
    - Expose ReadableStreamDefaultController interface
    - performance.measureUserAgentSpecificMemory()
    - Potentially trustworthy data: urls
    - Streams API: Byte Streams
    - Support for full 'filter' property syntax on SVG elements
    - WebAuthentication API: ResidentKeyRequirement and credProps extension
  - CSS
    - ::target-text pseudo-element
    - flow-relative Corner Rounding properties
    - Forced colors property
    - Forced colors adjust property
  - JavaScript
    - Top-level await
  - Developer Notes
    - Image Orientation with EXIF
  - Deprecations and Removals
    - Remove prefixed events for `<link rel=prerender>`
    - Stop cloning sessionStorage for windows opened with noopener
    - Labels
    - Archive
    - Feed
- What's New In DevTools (Chrome 89)
  - <https://developers.google.com/web/updates/2021/01/devtools>
  - What's New In DevTools (Chrome 89)
  - Debugging support for Trusted Types violations
    - Breakpoint on Trusted Type violations
    - Link issue in the Sources panel to the Issues tab
  - Capture node screenshot beyond viewport
  - New Trust Tokens tab for network requests
  - Lighthouse 7 in the Lighthouse panel
  - Elements panel updates
    - Support forcing the CSS :target state
    - New shortcut to duplicate element
    - Color pickers for custom CSS properties
    - New shortcuts to copy CSS properties
  - Cookies updates
    - New option to show URL-decoded cookies
    - Clear only visible cookies
    - New option to clear third-party cookies in the Storage pane
  - Edit User-Agent Client Hints for custom devices
  - Network panel updates
    - Persist "record network log" setting
    - View WebTransport connections in the Network panel
    - "Online" renamed to "No throttling"
  - New copy options in the Console, Sources panel, and Styles pane
    - New shortcuts to copy object in the Console and Sources panel
    - New shortcuts to copy file name in the Sources panel and Styles pane
  - Frame details view updates
    - New Service Workers information in the Frame details view
    - Measure Memory information in the Frame details view
  - Provide feedback from the Issues tab
  - *Dropped frames in the Performance panel*
  - *Emulate foldable and dual-screen in Device Mode*
  - Experimental features
    - *Automate browser testing with Puppeteer Recorder*
    - Font editor in the Styles pane
    - CSS flexbox debugging tools
    - *New CSP Violations tab*
    - New color contrast calculation - Advanced Perceptual Contrast Algorithm (APCA)
- Chromium Blog: Easy to build, monetize, and discover: List your web app on Google Play
  - <https://blog.chromium.org/2020/12/pwa-play-billing-support.html>
- Chromium Blog: Seamless payments and password management in Chrome
  - <https://blog.chromium.org/2020/12/seamless-payments-and-password.html>
- *Chromium Blog: Continuing our journey to bring instant experiences to the whole web*
  - <https://blog.chromium.org/2020/12/continuing-our-journey-to-bring-instant.html>
  - Prefetch を頑張ってきたが、 NoState にしても IP がリークする
  - Private prefetch proxy を導入し Google の IP に置き換える
  - という実験をやっている話
- Chromium Blog: Limiting Private API availability in Chromium
  - <https://blog.chromium.org/2021/01/limiting-private-api-availability-in.html>
- *Deprecations and removals in Chrome 88*
  - <https://developers.google.com/web/updates/2020/12/chrome-88-deps-rems>
  - Don't allow popups during page unload (enterprises)
  - Web Components v0 removed
  - FTP support removed
- *Progress update on the Privacy Sandbox initiative - Chrome Developers*
  - <https://developer.chrome.com/blog/privacy-sandbox-update-2021-jan/>
- *How to participate in the Privacy Sandbox initiative - Chrome Developers*
  - <https://developer.chrome.com/blog/privacy-sandbox-participate/>
- *Welcome to the new developer.chrome.com! - Chrome Developers*
  - <https://developer.chrome.com/blog/welcome/>
  - developer.chrome.com がリニューアル
  - Chrome 関連の情報はこちらで更新していく
  - What's new in Chrome など、 Google Developers にあったコンテンツも移動中
- SharedArrayBuffer updates in Android Chrome 88 and Desktop Chrome 91 - Chrome Developers
  - <https://developer.chrome.com/blog/enabling-shared-array-buffer/>
- Heavy throttling of chained JS timers beginning in Chrome 88 - Chrome Developers
  - <https://developer.chrome.com/blog/timer-throttling-in-chrome-88/>
- web.dev
  - Cross-browser paint worklets and Houdini.how
    - <https://web.dev/houdini-how/>
  - Publish, ship, and install modern JavaScript for faster applications
    - <https://web.dev/publish-modern-javascript/>
  - Sign-up form best practices
    - <https://web.dev/sign-up-form-best-practices/>
  - Payment and address form best practices
    - <https://web.dev/payment-and-address-form-best-practices/>
  - *Announcing Squoosh v2*
    - <https://web.dev/squoosh-v2/>
  - *Automating audits with AutoWebPerf*
    - <https://web.dev/autowebperf/>
    - Page Speed Insight, CrUX, WebPageTest からデータを取得するツール
    - SpreadSheet に落としたり Data Studio で可視化できる
  - Extending Workbox
    - <https://web.dev/extending-workbox/>
  - Centering in CSS
    - <https://web.dev/centering-in-css/>
  - Building a sidenav component
    - <https://web.dev/building-a-sidenav-component/>
  - WebRTC is now a W3C and IETF standard
    - <https://web.dev/webrtc-standard-announcement/>
  - *Best practices for carousels*
    - <https://web.dev/carousel-best-practices/>
  - When to use HTTPS for local development
    - <https://web.dev/when-to-use-local-https/>
  - How to use HTTPS for local development
    - <https://web.dev/how-to-use-local-https/>
  - Feedback wanted: The road to a better layout shift metric for long-lived pages
    - <https://web.dev/better-layout-shift-metric/>
  - *Use AMP Components everywhere*
    - <https://blog.amp.dev/2021/01/28/bento/>

#### Intents

- Ship: Web Share Target Level 2 for Chrome OS
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/NDzSW-VlJdg/m/vBzxek5LAgAJ>
- Ship: Expose ReadableStreamDefaultController interface
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/yZuxrW9zhAs/m/pHVHP3_LAQAJ>
- *Ship: Web Serial API*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/RCtZPCQLLOQ/m/pnMErtbFAAAJ>
- Ship: Streams API: Byte Streams
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/AQip4hjqt5U/m/OwPgs9NmAgAJ>
- *Ship: import maps (inline only)*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/rVX_dJAJ-eI/m/17r-6-eiAgAJ>
- *Ship: Web NFC*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/aoj06_plqPc/m/D-6ahhfuAwAJ>
- Ship: Support for full 'filter' property syntax on SVG elements
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/ZdJgwttxnQM/m/zA6ddWonAgAJ>
- Ship: Percent based scrolling
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/5Mt8RZyf-pc>
- Ship: performance.measureMemory()
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/RExJ9a3SmQw>
- Ship: Return empty for navigator.plugins and navigator.mimeTypes
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/bbxAGu90LgM>
- Ship: RegExp match indices
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/RR_dw_ZXtT0>
- Ship: Remove clamping of `setTimeout(..., 0)`
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/HKPTp7C1LwY>
- Ship: AbortSignal in addEventListener
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/8_86NDuVdRk>
- *Ship: Rename Sec-CH-UA-Platform value from "Mac OS X" to "macOS"*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/D1fW7PiPJTM>
  - Apple からの feedback で 100% ship の前に変更
  - legacy "Max OS X" を「セメントで固める」
- Ship: WebAssembly Worker Based Threads on Android (too)
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/LsYYBS3awlo>
- *Prototype and Ship: CSS flow-relative Corner Rounding properties*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/YmWSODSTPS4/m/qx1uXvYxAgAJ>
  - `border-top-left-radius` など四隅ひとつの radius を指定する `border-radius` サブプロパティの論理プロパティ版
- Prototype and Ship: ::file-selector-button pseudo-element
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/d4UdwpPDXJM/m/J-o_C_kqAwAJ>
- Implement and Ship: Fire capture event listeners before bubble event listeners at event target
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/30jv38uD_84/m/q6I8ZXXTAwAJ>
- Implement and Ship: Link element pseudo selectors
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/l3Qw9cWYPUA/m/Yl9siP_8AQAJ>
- Spec, Implement & Ship: CSS Variables: Persistent guaranteed-invalid values
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/0xrbzYe_vxU>
- Implement and Ship: CSS aspect-ratio interpolation
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/NNm3FnMvyZc>
- Implement and Ship: Remove `FileSystemWritableFileStream::close()` implementation
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/98OnGPp1_M8>
- Implement and Ship: StaticRange constructor
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/bqRpC58mtKE>
- Prototype: Canvas Formatted Text
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/CURnzae5yOE/m/yggKMxjGAAAJ>
- Prototype: Reporting API: Isolate reports per-document and support the Reporting-Endpoints header
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/_CIlziJRPME/m/w_4qFmKSAgAJ>
- Prototype: Declarative Link Capturing for PWAs
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/2ZnA1IrSpS8/m/7wx6dENTAwAJ>
- Prototype: Allow infinity, -infinity and NaN in CSS calc()
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/4cT9dMkzVXE/m/aCT8B6PDAwAJ>
- *Prototype: Prerendering*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/4oKgdB26p6g/m/4M2fIR_aAwAJ>
  - 既に Resource Hints の文脈で取り込まれていた機能だが問題があり No State Prefetch に置き換えられていた
  - これをもう一度 Prototype して Prerender2 としてやりなおしたい
- Prototype: EyeDropper API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/cPTMI1i6d7I/m/28mjGLIjBAAJ>
  - カラーピッカーのスポイト機能
- Implement: Web Share API (macOS)
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/GfVrt1CwxK8>
- *Prototype: HTMLPopupElement - `<popup>`*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/9y-Thg9UCxY>
  - MS が提案する新要素
  - `<dialog>` とは light-dismiss の点で違う(バックグラウンドを block しない?)
- Prototype: CSS spelling and grammar features
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/8UEcRJViPEU>
- *Prototype: SameParty cookie attribute*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/-unZxHbw8Pc>
  - First Party Set で作った Party にのみ Cookie を送る
- Prototype: Multi Apps API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/XeELlWkuCgQ>
- *Prototype: ARIA virtual content*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/etQ-LVhY6S4>
  - Twitter のような Infinite Scroll な UI を Assistive Technology に認識させる
  - `<main id="main" aria-virtualcontent="block-end">`
- Prototype: Multi-Screen Window Placement
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/X6rEbWvU7cI>
- *Prototype: ModalCloseWatcher*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/NA5NC16OmsU>
  - ESC や Back Button など Modal を閉じるような操作をすべてフックする Listener
  - このイベントで Modal を閉じる用途に利用する
  - `<popup>` の提案と被る部分があるが、並行して行う。
- Prototype: Suggested file name and location for the File System Access API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/TOaytD6DMWA>
- Prototype: GravitySensor API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/HVO2p0V5OW8>
- Prototype: COLRv1 Color Gradient Vector Fonts
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/XIXudwZdr44>
- Experiment: fetch() upload streaming
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/mNVaRrvBZG0>
- Extend Origin Trial: scheduler.postTask
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/QMQz7rWADO0>
- Extend Origin Trial: Declarative Shadow DOM
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/A1kOJydFI3I>
- Extend Origin Trial: Conversion Measurement API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/C0P7ePjITJQ>
- Extend Origin Trial: AppCache
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/hQ1zGoPthBU>
  - Reverse Origin Trials を M94 まで延期
- Experiment: MediaStreamTrack Insertable Streams (a.k.a. Breakout Box)
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/fyJfqEwP1FY>
- Change:
- Unship:
- Remove:
- *Deprecate and Remove: Special handling of localhost6 and localhost6.localdomain6 hosts*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/bmdcI_q2yWQ/m/HtdNtLTSAQAJ>
  - localhost6 を IPv6 のループバック (`::1`) として扱うという非標準の機能を消す
- Deprecate and Remove: Special handling of localhost.localdomain host
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/hq4iR3UTyNw/m/nju17mXYAgAJ>
- Deprecate and Remove: Payment handlers for standardized payment method identifiers.
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/ZS0JxjApEhI/m/GP1_t04gBAAJ>
- *Remove: Rename User-Agent Client Hint ACCEPT-CH tokens*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/t-S9nnos9qU/m/pUFJb00jBAAJ>
  - `ua-*` を `sec-ch-ua-*` にする
- Deprecate: WebRTC's Plan B SDP semantics
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/IY2amIigFFs>
- Request for Deprecation Trial: Remove Content Security Policy directive 'plugin-types'
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/LPuLxLwhi4o>
- Remove: SpeechRecognitionEvent's interpretation and emma attributes
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/CiAeouP6CJw>
- *PSA: private prefetch proxy proposal*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/gKOby6T2a8k/m/g7jqmxGuAQAJ>
- web-platform-tests quarterly update - Q4 2020
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/uT5Q1uf8BCk/m/OniGAcooAwAJ>
- Request for feedback: required developer signals during an intent-to-ship
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/1aRHNJx_dbU/m/dnE7eWwUAQAJ>
- *Unifying the notions of "secure context" (trustworthy url/origin)*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/qtMVkfpd3_U>
  - igalia の人の提案

#### V8

- An additional non-backtracking RegExp engine · V8
  - <https://v8.dev/blog/non-backtracking-regexp>

#### Other

- Debugging WebAssembly with modern tools
  - <https://developers.google.com/web/updates/2020/12/webassembly>
- Updates to Search Console's API  \|  Google Search Central Blog
  - <https://developers.google.com/search/blog/2020/12/search-console-api-updates>
- Introducing Google News performance report
  - <https://developers.google.com/search/blog/2021/01/google-news-performance-report>
- Index Coverage Data Improvements
  - <https://developers.google.com/search/blog/2021/01/index-coverage-data-improvements>
- Google Developers Blog: 21 websites and apps to make your 2021 better
  - <https://developers.googleblog.com/2021/01/21-websites-and-apps-to-make-your-2021-better.html>
  - Google のドメイン遊び
- Migrating Puppeteer to TypeScript
  - <https://developers.google.com/web/updates/2021/01/puppeteer-typescript>
- *AMP implementation best practices and common pitfalls – The AMP Blog*
  - <https://blog.amp.dev/2020/12/17/amp-implementation-best-practices-and-common-pitfalls/>
- Correlation between Core Web Vitals and AMP – The AMP Blog
  - <https://blog.amp.dev/2021/01/15/correlation-between-core-web-vitals-and-amp/>
- *Form Submit 時に Security Alert が出てしまうようになった件の報告が殺到*
  - HTTP -> HTTPS redirect で HTTPS 対応しているが、 Form Submit 後の Redirect (PRG Pattern) のリダイレクト先(Location)が HTTP になってる場合、`not secure` なエラー画面が出てしまい、 Submit できない。
  - <https://groups.google.com/a/chromium.org/g/security-dev/c/_yE-XITw5nc/m/3cJyqhdBBAAJ>
  - <https://groups.google.com/a/chromium.org/g/security-dev/c/PXuy9aKftG0/m/Nz06ohVBBAAJ>
  - <https://groups.google.com/a/chromium.org/g/security-dev/c/HH_FO5FbiwM/m/t3s_7RRBBAAJ>
  - <https://groups.google.com/a/chromium.org/g/security-dev/c/pBZHburF0C8/m/lnlgoApBBAAJ>
  - <https://groups.google.com/a/chromium.org/g/security-dev/c/5jvJEvL2Wqs/m/l48yvgBBBAAJ>
  - <https://groups.google.com/a/chromium.org/g/security-dev/c/merbn6Oo50g/m/JYERYv1ABAAJ>
  - <https://groups.google.com/a/chromium.org/g/security-dev/c/I67LV39EgEw/m/Ju0khPNABAAJ>
  - Disabling the new HTTP form security check for headless
    - <https://groups.google.com/a/chromium.org/g/security-dev/c/Un8NB6Cb6i0/m/luz9J_OXBAAJ>
    - 影響が広すぎてロールバックすることに
- *1168528 - [User Feedback - Stable] Users report Chrome's clock time measurement doesn't match local time (RU, JA) - chromium*
  - <https://bugs.chromium.org/p/chromium/issues/detail?id=1168528&q=chrome88&can=2#c49>
  - Chrome アップデート後に時刻/タイムゾーンがおかしい、 18 時間ずれる等の不具合発生中(2021 年 1 月 29 日更新)
  - <https://did2memo.net/2021/01/20/chrome-timezone-issue/#2021128>
- *Chromium University 2020: Videos Published*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/YEmcQmpUb1c/m/Z0uc56ohCwAJ>
  - 51 個のビデオ
- Building a privacy-first future for web advertising
  - <https://blog.google/products/ads-commerce/2021-01-privacy-sandbox>

### Firefox 動向


#### Stable: 85.0


#### Updates

- 2020 MDN Web Developer Needs Assessment now available
  - <https://hacks.mozilla.org/2020/12/2020-mdn-web-developer-needs-assessment-now-available/>
  - <https://insights.developer.mozilla.org/reports/mdn-web-developer-needs-assessment-2020.html>
- *And now for ... Firefox 84*
  - <https://hacks.mozilla.org/2020/12/and-now-for-firefox-84/>
  - DevTools gets tab order inspection
  - Web platform additions
    - Complex selector support in :not()
    - PerformancePaintTiming
    - AppCache removal
  - WebExtensions
  - WebRender comes to Linux and Android
  - Localhost improvements
- Firefox 84 for developers
  - <https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/84>
- *January brings us Firefox 85*
  - <https://hacks.mozilla.org/2021/01/january-brings-us-firefox-85/>
  - :focus-visible
  - Preload
  - The Flash is dead, long live the Flash
  - Nightly previews
    - Top-level await
    - What're you pointing `at()` ?
  - WebExtensions
- Firefox 85 for developers
  - <https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/85>
- *Firefox 85 Cracks Down on Supercookies - Mozilla Security Blog*
  - <https://blog.mozilla.org/security/2021/01/26/supercookie-protections/>
  - ネットワークのパーティショニングで supercookie 対策をした
- Welcome Yari: MDN Web Docs has a new platform
  - <https://hacks.mozilla.org/2020/12/welcome-yari-mdn-web-docs-has-a-new-platform/>
- *An update on MDN Web Docs' localization strategy*
  - <https://hacks.mozilla.org/2020/12/an-update-on-mdn-web-docs-localization-strategy/>
  - CJF は機械翻訳ではなくレビュープロセスで行うことに
- Improving Cross-Browser Testing, Part 1: Web Application Testing Today
  - <https://hacks.mozilla.org/2020/12/cross-browser-testing-part-1-web-app-testing-today/>
- Improving Cross-Browser Testing, Part 2: New Automation Features in Firefox Nightly - Mozilla Hacks - the Web developer blog
  - <https://hacks.mozilla.org/2021/01/improving-cross-browser-testing-part-2-new-automation-features-in-firefox-nightly/>
- Porting Firefox to Apple Silicon - Mozilla Hacks - the Web developer blog
  - <https://hacks.mozilla.org/2021/01/porting-firefox-to-apple-silicon/>
- Analyzing Bugzilla Testcases with Bugmon - Mozilla Hacks - the Web developer blog
  - <https://hacks.mozilla.org/2021/01/analyzing-bugzilla-testcases-with-bugmon/>
- Our Year in Review: How we've kept Firefox working for you in 2020
  - <https://blog.mozilla.org/blog/2020/12/15/our-year-in-review-how-weve-kept-firefox-working-for-you-in-2020/>
  - 2020 年に Firefox に追加された機能のまとめ
- *Our Year in Review: How we've made Firefox Faster in 2020*
  - <https://blog.mozilla.org/performance/2020/12/15/2020-year-in-review/>
  - 2020 年 Firefox に加えられたパフォーマンス改善の詳細
- *Encrypted Client Hello: the future of ESNI in Firefox - Mozilla Security Blog*
  - <https://blog.mozilla.org/security/2021/01/07/encrypted-client-hello-the-future-of-esni-in-firefox/>
  - ESNI だけではプロトコル上問題があるため、 ClientHello 全体を暗号化する ECH が提案された
  - Firefox は ESNI を早くから実装していたが、 85 から ECH に移行するという話
- These Weeks in Firefox: Issue 84
  - <https://blog.nightly.mozilla.org/2020/12/08/these-weeks-in-firefox-issue-84/>
- These Weeks in Firefox: Issue 85
  - <https://blog.nightly.mozilla.org/2020/12/18/these-weeks-in-firefox-issue-85/>
- These Weeks in Firefox: Issue 86
  - <https://blog.nightly.mozilla.org/2021/01/19/these-weeks-in-firefox-issue-86/>
- *Guest Blog Post: Leaking silhouettes of cross-origin images – Attack & Defense*
  - <https://blog.mozilla.org/attack-and-defense/2021/01/11/leaking-silhouettes-of-cross-origin-images/>
  - Canvas の `drawImage()` でピクセルの不透明度によって処理速度が変わるのを利用し、 cross origin info leaks が起きる脆弱性があった
  - 利用している Skia で透明度によって処理を分けており、ソフトウェアデコーダの場合に処理速度が特に変わっていた
  - Skia が修正され、 Chromium 、 Firefox ともに対応

#### Intents

- *Ship: Network Partitioning*
  - <https://groups.google.com/g/mozilla.dev.platform/c/uDYrtq1Ne3A/m/QCckV5y-AwAJ>
- *Ship: Setting the default referrer policy to `strict-origin-when-cross-origin'*
  - <https://groups.google.com/g/mozilla.dev.platform/c/K7Dq-0CyT_Q/m/l04RxJinAwAJ>
- Ship: remote-protocol (CDP)
  - <https://groups.google.com/g/mozilla.dev.platform/c/0os0fMkH7QU>
- Ship: Unprefixed :autofill pseudo-class, :-webkit-autofill alias.
  - <https://groups.google.com/g/mozilla.dev.platform/c/ARLg8hqDj2k>
- *Ship: beforeinput event and InputEvent.getTargetRanges()*
  - <https://groups.google.com/g/mozilla.dev.platform/c/C_92-abaiuw>
- *Ship: Block HTTP ports 69, 137, 161, 1719, 1720, 1723, 6566, 10080*
  - <https://groups.google.com/g/mozilla.dev.platform/c/T-uyqcibSdU>
- Prototype: Standard :autofill pseudo-class, :-webkit-autofill alias.
  - <https://groups.google.com/g/mozilla.dev.platform/c/1BUXJV3iCTM>
- Prototype: CanvasRenderingContext2D.createConicGradient.
  - <https://groups.google.com/g/mozilla.dev.platform/c/Pp1N_GCqY0M>
- Experiment:
- Change:
- *Unship: HTML `<menuitem>` element and the context menu feature*
  - <https://groups.google.com/g/mozilla.dev.platform/c/tc11BCenm2c>

#### Other

- *EKR 先生による「投票システム」の難しさの話*
  - Why getting voting right is hard, Part I: Introduction and Requirements
    - <https://blog.mozilla.org/blog/2020/12/08/why-getting-voting-right-is-hard-part-i-introduction-and-requirements/>
  - Why getting voting right is hard, Part II: Hand-Counted Paper Ballots
    - <https://blog.mozilla.org/blog/2020/12/14/why-getting-voting-right-is-hard-part-ii-hand-counted-paper-ballots/>
  - Why getting voting right is hard, Part III: Optical Scan
    - <https://blog.mozilla.org/blog/2021/01/05/why-getting-voting-right-is-hard-part-iii-optical-scan/>
  - Why getting voting right is hard, Part IV: Absentee Voting and Vote By Mail
    - <https://blog.mozilla.org/blog/2021/01/13/why-getting-voting-right-is-hard-part-iv-absentee-voting-and-vote-by-mail/>
  - Why getting voting right is hard, Part V: DREs (spoiler: they're bad)
    - <https://blog.mozilla.org/blog/2021/01/26/why-getting-voting-right-is-hard-part-v-dres-spoiler-theyre-bad/>
- Reimagine Open: Building a Healthier Internet
  - <https://blog.mozilla.org/blog/2021/01/14/reimagine-open-building-a-healthier-internet/>
- SpiderMonkey Newsletter #8
  - <https://mozilla-spidermonkey.github.io/blog/2020/12/18/newsletter-8.html>

### Safari 動向


#### Stable: 14.0.2


#### Updates

- CSS Individual Transform Properties
  - <https://webkit.org/blog/11420/css-individual-transform-properties/>
- *Release Notes for Safari Technology Preview 117*
  - <https://webkit.org/blog/11364/release-notes-for-safari-technology-preview-117/>
  - *Added parse support for aspect-ratio CSS property (r269641)*
  - *Enabled static public class fields (r269922, r269939)*
  - *Enabled static and instance private class fields (r270066)*
  - Added WebRTC SFrame transform (r269830)
  - Added infrastructure for WebRTC transforms (r269764)
  - Added support for RTCPeerConnection.onicecandidateerror event (r270101)
  - Added support for RTCRtpScriptTransform (r270107)
  - *Added skeleton implementation of Media Session API (r268735)*
- *Release Notes for Safari Technology Preview 118*
  - <https://webkit.org/blog/11439/release-notes-for-safari-technology-preview-118/>
  - Added an experimental Font details sidebar panel for showing information about the currently used font of the selected node (r270637)
  - *Added support for intercepting and overriding network requests (r270604)*
  - Implemented Definite and Indefinite Sizes in flexbox (r270578)
  - *Added support for aspect-ratio on replaced and non-replaced elements (r270551, r270618)*
  - Made only the first wheel event in a gesture to be cancelable (r270425)
  - *Enabled "at" methods (r270550)*
  - Implemented WebVTT VTTCue region attribute (r270738)
  - *Exposed an API for enabling or disabling Private Click Measurement (r270710)*
  - Added support for RTCRtpSender::setStreams (r270486)
  - Changed to allow blob URLs with fragments (r270269)
  - Fixed lazy loaded iframe to not lazy load when scripting is disabled (r270300)
  - Fixed VoiceOver not announcing the aria-checked state for ARIA treeitem (r270333)
- *Release Notes for Safari Technology Preview 119*
  - <https://webkit.org/blog/11525/release-notes-for-safari-technology-preview-119/>
  - Speech Recognition
    - *Enabled SpeechRecognition by default (r270854)*
    - Added webkit- prefix to SpeechRecognition (r270868)
    - Added availability check of speech recognition service before requesting permissions (r271031)
    - Changed to fail speech recognition when the page is muted for audio capture (r271154)
    - Implemented recognizer for SpeechRecognition (r270772)
    - Stopped speech recognition if page becomes invisible (r271169, r271205)
  - CSS
    - *Added support for aspect-ratio on positioned elements (r271061)*
    - *Changed to take aspect-ratio into account for percentage resolution (r271293)*
    - *Implemented ::file-selector-button pseudo-element (r270784)*
  - Scrolling
    - Fixed scrolling issues when scrolling on only one axis is enabled (r271090)
    - Sibling element wheel event regions can be wrong (r271054)
  - JavaScript
    - Fixed non-enumerable property to shadow inherited enumerable property from for-in (r270874)
    - Fixed Intl.DateTimeFormat#formatRange to generate the same output to Intl.DateTimeFormat#format if startDate and endDate are "practically-equal" (r271224)
    - Implemented arbitrary-module-namespace-identifier-names (r270923)
    - Improved performance of Object rest and spread (r271343)
  - Media
    - Used low-power audio buffer sizes for more output devices (r270943)
    - Updated the video element to ignore requests to enter or exit fullscreen before the current fullscreen mode change is completed (r271341)
  - WebAssembly
    - Added support for memory.copy, memory.init, and data.drop behind flag (r270948)
    - Added support for memory.fill behind flag (r270855)
    - Added support for type-annotated select behind flag (r270827)
  - Accessibility
    - Fixed aria-orientation getting ignored on input[type="range"] (r271166)
    - *Implemented prefers-contrast: more (r270823)*
  - Web API
    - Adjusted date input placeholder color based on specified text color (r270875)
    - Corrected the intrinsic size stored for SVG images (r271129)

#### Position

- [webkit-dev] Request for position: overflow: clip and overflip-clip-margin
  - <https://lists.webkit.org/pipermail/webkit-dev/2020-December/031634.html>
- [webkit-dev] Request for position: Forced Colors Mode
  - <https://lists.webkit.org/pipermail/webkit-dev/2020-December/031642.html>
- [webkit-dev] Request for position on the Origin-Isolation header
  - <https://lists.webkit.org/pipermail/webkit-dev/2020-December/031644.html>
- [webkit-dev] Request for position on Web Share Target
  - <https://lists.webkit.org/pipermail/webkit-dev/2020-December/031645.html>
- [webkit-dev] Request for position on Reporting API (now with structured headers!)
  - <https://lists.webkit.org/pipermail/webkit-dev/2020-December/031646.html>
- [webkit-dev] Request for position: Support full 'filter' syntax (i.e filter functions/shorthands) on SVG elements
  - <https://lists.webkit.org/pipermail/webkit-dev/2020-December/031653.html>
- [webkit-dev] Request for position: CSS spelling and grammar features
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-January/031660.html>
- [webkit-dev] Request for position on Cascade Layers
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-January/031664.html>
- [webkit-dev] Request for position on import maps
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-January/031669.html>
- [webkit-dev] Request for position: Critical-CH response header, part of Client Hints Reliability proposal
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-January/031673.html>

#### Other


### Edge 動向


#### Stable:88


#### Updates

- <https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel>
  - ここでも見れる
- <https://twitter.com/MSEdgeDev>
  - これを見るしか無い
- *Microsoft Edge 88 Privacy and Security Updates - Microsoft Edge Blog*
  - <https://blogs.windows.com/msedgedev/2021/01/21/edge-88-privacy/>
- How to investigate Microsoft Edge's memory usage on Windows - Microsoft Edge Blog
  - <https://blogs.windows.com/msedgedev/2021/01/13/investigate-microsoft-edge-memory-usage/>
- *Sleeping Tabs in Microsoft Edge: Delivering better browser performance - Microsoft Edge Blog*
  - <https://blogs.windows.com/msedgedev/2020/12/09/sleeping-tabs-beta-performance/>

#### Chakra

- Release ChakraCore v1.11.24 · microsoft/ChakraCore
  - <https://github.com/microsoft/ChakraCore/releases/tag/v1.11.24>

#### Other

- Recent and upcoming changes to the Microsoft Edge Add-Ons store
  - <https://techcommunity.microsoft.com/t5/articles/recent-and-upcoming-changes-to-the-microsoft-edge-add-ons-store/m-p/1992030>
- *Now, autofill your saved passwords from Microsoft Edge on your phone!*
  - <https://techcommunity.microsoft.com/t5/articles/now-autofill-your-saved-passwords-from-microsoft-edge-on-your/m-p/1990161>
- *Sandboxing vs. Elevated Browsing (As Administrator) – text/plain*
  - <https://textslashplain.com/2021/01/07/sandboxing-vs-elevated-browsing-as-administrator/>



### WHATWG/W3C 動向


#### Draft

- Recommendation
  - *WebRTC 1.0 is a W3C Recommendation*
    - <https://www.w3.org/2021/01/pressrelease-webrtc-rec.html.en>
    - <https://www.w3.org/blog/news/archives/8897>
    - <https://lists.w3.org/Archives/Public/public-webrtc/2021Jan/0033.html>
    - <https://www.w3.org/blog/2021/01/whatwg-review-drafts-of-html-and-dom-endorsed-as-w3c-recommendations/>
  - *HTML Review Draft*
    - <https://www.w3.org/blog/news/archives/8909>
    - <https://html.spec.whatwg.org/review-drafts/2020-01/>
- Proposed Recommendation
- Candidate Recommendation
  - Updated Candidate Recommendation: Web Audio API
    - <https://www.w3.org/blog/news/archives/8867>
- Working Draft
- First Public Working Draft
  - First Public Working Draft: The Screen Fold API
    - <https://www.w3.org/blog/news/archives/8807>
  - *First Public Working Draft: W3C Accessibility Guidelines (WCAG) 3.0*
    - <https://www.w3.org/blog/news/archives/8889>
  - *First Public Working Draft: CSS Cascading and Inheritance Level 5*
    - <https://www.w3.org/blog/news/archives/8870>
  - First Public Working Drafts: EPUB 3.3
    - <https://www.w3.org/blog/news/archives/8859>
- Chartering
  - *Call for participation: 12 Working Groups switching to Patent Policy 2020*
    - <https://lists.w3.org/Archives/Public/public-new-work/2020Dec/0009.html>
    - 12 の WG (CSS, HTML, WebApps, WebTransport etc) が Patent Policy v15 (2020/9) で Recharter した
    - WG に継続して参加したい場合は rejoin する必要がある
  - Proposed W3C Charter: Web Performance Working Group
    - <https://lists.w3.org/Archives/Public/public-new-work/2020Dec/0013.html>
  - Service Workers Working Group Charter Extended
    - <https://lists.w3.org/Archives/Public/public-new-work/2020Dec/0012.html>
  - W3C launches MiniApps Working Group
    - <https://www.w3.org/blog/news/archives/8853>

#### Other

- *W3C opens Technical Architecture Group (TAG) election*
  - <https://www.w3.org/blog/news/archives/8792>
  - <https://www.w3.org/2020/12/07-tag-nominations>
- *Election Season 2020, W3C TAG Edition - Infrequently Noted*
  - <https://infrequently.org/2020/12/jeff-yasskin-for-w3c-tag/>
- *W3C Advisory Committee Elects Technical Architecture Group*
  - <https://www.w3.org/blog/news/archives/8846>
- littledan/resource-bundles: Bundles of multiple resources, to improve loading JS and the Web. Eventual hoped-for destination: WICG
  - <https://github.com/littledan/resource-bundles>
- *Happy 2021! New role moving forward. from Ilya Grigorik*
  - <https://lists.w3.org/Archives/Public/public-web-perf/2021Jan/0000.html>
  - WebPerf WG の co-chair だった Ilya Grigorik が charter 更新後に勇退
- Upcoming: W3C Workshop on Wide Color Gamut and High Dynamic Range for the Web
  - <https://lists.w3.org/Archives/Public/public-new-work/2020Dec/0014.html>

### TC39 動向


#### Meeting

- 2020-01
  - agendas/01.md
    - <https://github.com/tc39/agendas/blob/master/2021/01.md>
  - <https://github.com/tc39/agendas>
  - <https://github.com/tc39/notes>

#### Proposals Diff

- <https://github.com/tc39/proposals/compare/master@{2021-01-01}...master@{2021-02-01}>
- <https://tc39.github.io/beta/>
- 0->1
  - async do expressions
  - Class Brand Checks
  - Extend TimeZoneName Option
  - eraDisplay option for `Intl.DateTimeFormat`
  - Regex Set Notation
  - Escaping Strings for RegExps
  - Array Find From Last
  - defer module import eval
  - Intl.LocaleMatcher
- 1->2
  - Module Blocks
  - Intl Locale Info
  - Intl.DisplayNames
- 2->3
  - JSON Modules
  - Ergonomic Brand Checks for Private Fields
- 3->4
  - Intl.DateFormat.prototype.formatRange

#### New Proposals

- *bakkot/proposal-async-do-expressions*
  - <https://github.com/bakkot/proposal-async-do-expressions>
  - do expression の async 対応
  - `async do {}`
- *tc39/proposal-regexp-set-notation*
  - <https://github.com/tc39/proposal-regexp-set-notation>
  - 正規表現の中で集合演算(和/積集合 etc)
- *tc39-transfer/proposal-regex-escaping*
  - <https://github.com/tc39-transfer/proposal-regex-escaping>
  - 正規表現で使える文字列としてエスケープする関数
- *tc39-transfer/proposal-array-find-from-last*
  - <https://github.com/tc39-transfer/proposal-array-find-from-last>
  - `.findLast()`, `.findLastIndex()`
- *tc39-transfer/proposal-defer-import-eval*
  - <https://github.com/tc39-transfer/proposal-defer-import-eval>
  - import したモジュールの評価を遅延する?
  - dynamic import だとコードが非同期になるが、これならならない

#### Other

- *JSCIG/dataset: TC39 Proposal Dataset*
  - <https://github.com/JSCIG/dataset>
  - <https://github.com/tc39/dataset>
  - <https://twitter.com/mathias/status/1334886428640071680>
- ECMAScript proposal: Import assertions
  - <https://2ality.com/2021/01/import-assertions.html>
- *tc39/js-outreach-groups*
  - <https://github.com/tc39/js-outreach-groups>
  - Educators, Frameworks, Tools and transpilers などから feedback をもらうためのミーティング
- *Press Release -  NETSCAPE AND SUN ANNOUNCE JAVASCRIPT, THE OPEN, CROSS-PLATFORM OBJECT SCRIPTING LANGUAGE FOR ENTERPRISE NETWORKS AND THE INTERNET (web archive)*
  - <https://web.archive.org/web/20060111090514/http://wp.netscape.com/newsref/pr/newsrelease67.html>
  - Mathias Bynens on Twitter: "JavaScript was first announced on December 4th, 1995 - exactly 25 years ago today 🤯
  - <https://web.archive.org/web/20060111090514/http://wp.netscape.com/newsref/pr/newsrelease67.html>
  -  "The open, cross-platform object scripting language for enterprise networks and the Internet"" / Twitter
  - 2020 年 12 月 4 日で JavaScript の発表から 25 年

### IETF 動向


#### IETF

- materials
  - <https://datatracker.ietf.org/meeting/>
- httpwg
  - <https://github.com/httpwg/wg-materials/>
- quicwg
  - <https://github.com/quicwg/wg-materials>
- webtrans
  - <https://github.com/DavidSchinazi/webtrans-wg-materials>
- tlswg
  - <https://github.com/tlswg/wg-materials>
- wpack
- privacypass
- dispatch
- secdispatch

#### Spec

- RFC
- IETF Last Call
- WG Last Call
  - *HTTP Core Documents*
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021JanMar/0015.html>
    - 以下の 3 つが WGLC に
    - draft-ietf-httpbis-semantics
    - draft-ietf-httpbis-messaging
    - draft-ietf-httpbis-cache
    - 2/8 に Last Call ending
    - 2/9, 11 に interim meeting
- Call for Adoption
- I-D Action
- Draft
  - <https://tools.ietf.org/html/recent-drafts?days=61>
  - *draft-thomson-http-oblivious-00 - Oblivious HTTP*
    - <https://tools.ietf.org/html/draft-thomson-http-oblivious-00>
    - HTTP を暗号化を解かずに転送する?
  - *draft-thomson-http-binary-message-00 - Binary Representation of HTTP Messages*
    - <https://tools.ietf.org/html/draft-thomson-http-binary-message-00>
    - H2, 3 に習って H1 をバイナリで転送する
  - *draft-ietf-httpbis-http2bis-00 - Hypertext Transfer Protocol Version 2 (HTTP/2)*
    - <https://tools.ietf.org/html/draft-ietf-httpbis-http2bis-00>
    - まずは Editorial から
    - Push の削除などもここで入る予定
  - *draft-duke-masque-other-transport-00 - The Other-Transport Extension: Arbitrary Transports over CONNECT-UDP*
    - <https://tools.ietf.org/html/draft-duke-masque-other-transport-00>
    - CONNECT が TCP の Proxy を行うのに対し UDP で行う拡張
  - draft-ietf-httpapi-linkset-00 - Linkset: Media Types and a Link Relation Type for Link Sets
    - <https://tools.ietf.org/html/draft-ietf-httpapi-linkset-00>
  - draft-ietf-privacypass-architecture-00 - Privacy Pass Architectural Framework
    - <https://tools.ietf.org/html/draft-ietf-privacypass-architecture-00>
  - draft-ietf-privacypass-protocol-00 - Privacy Pass Protocol Specification
    - <https://tools.ietf.org/html/draft-ietf-privacypass-protocol-00>
  - draft-ietf-privacypass-http-api-00 - Privacy Pass HTTP API
    - <https://tools.ietf.org/html/draft-ietf-privacypass-http-api-00>
  - draft-thomson-httpbis-h2-0rtt-00 - Optimizations for Using TLS Early Data in HTTP/2
    - <https://tools.ietf.org/html/draft-thomson-httpbis-h2-0rtt-00>
  - draft-schinazi-masque-h3-datagram-00 - Using QUIC Datagrams with HTTP/3
    - <https://tools.ietf.org/html/draft-schinazi-masque-h3-datagram-00>
  - draft-schinazi-masque-connect-udp-ecn-00 - An ECN Extension to CONNECT-UDP
    - <https://tools.ietf.org/html/draft-schinazi-masque-connect-udp-ecn-00>
  - draft-liu-multipath-quic-00 - Multipath Extension for QUIC
    - <https://tools.ietf.org/html/draft-liu-multipath-quic-00>

#### Other


### CDN 動向


#### Cloudflare



- Welcome to Privacy & Compliance Week: Reflecting Values at Cloudflare's Core
  - <https://blog.cloudflare.com/welcome-to-privacy-and-compliance-week/>
  - 12/6 ～の 1 週間は Cloudflare の Privacy & Compliance Week だった
  - プライバシー関連の技術紹介や、法律順守の話が色々出ている
- Privacy needs to be built into the Internet
  - <https://blog.cloudflare.com/internet-privacy/>
  - お気持ち表明
- Helping build the next generation of privacy-preserving protocols
  - <https://blog.cloudflare.com/next-generation-privacy-protocols/>
- *Good-bye ESNI, hello ECH!*
  - <https://blog.cloudflare.com/encrypted-client-hello/>
  - TLS ハンドシェイクの暗号化と ESNI の課題、 ECH にいたるまでの経緯
- *Improving DNS Privacy with Oblivious DoH in 1.1.1.1*
  - <https://blog.cloudflare.com/oblivious-dns/>
  - Apple, Fastly と共同で Oblivious DoH (ODoH) を進めていることの紹介
  - ODoH はクライアントとターゲットの間のプロキシとして動作する
  - 1.1.1.1 が対応したほか、いくつかのプロキシベンダーとも提携
- Deprecating the `__cfduid` cookie
  - <https://blog.cloudflare.com/deprecating-cfduid-cookie/>
  - ボット検出のために使っていた `__cfduid` という Cookie をやめるというアナウンス
  - 機械学習のモデルを調整し、使わなくても検出できるという目処が立ったため
- Cloudflare Certifications
  - <https://blog.cloudflare.com/cloudflare-certifications/>
- Securing the post-quantum world
  - <https://blog.cloudflare.com/securing-the-post-quantum-world/>
- Privacy and Compliance Reading List
  - <https://blog.cloudflare.com/privacy-and-compliance-reading-list/>
- Network-layer DDoS attack trends for Q4 2020
  - <https://blog.cloudflare.com/network-layer-ddos-attack-trends-for-q4-2020/>
- *Uganda's January 13, 2021 Internet Shut Down*
  - <https://blog.cloudflare.com/uganda-january-13-2021-internet-shut-down/>
  - <https://www.publickey1.jp/blog/21/post_280.html>
  - ウガンダで、総選挙の直前に「インターネットゲートウェイ運用停止命令」が出た
  - 1/13~18 の 5 日にわたり国民がネットから切り離された
- KEMTLS: Post-quantum TLS without signatures
  - <https://blog.cloudflare.com/kemtls-post-quantum-tls-without-signatures/>
- Holistic web protection: industry recognition for a prolific 2020
  - <https://blog.cloudflare.com/cloudflare-named-the-innovation-leader-in-holistic-web-protection/>

#### Fastly

- DDoS attacks grow bigger, but so do responses
  - <https://www.fastly.com/blog/ddos-attacks-grow-bigger-but-so-do-responses>
- When do you need low-latency HTTP live streaming?
  - <https://www.fastly.com/blog/when-do-you-need-low-latency-http-live-streaming>
- *Debugging QUIC with H2O and QLog*
  - <https://www.fastly.com/blog/debugging-quic-with-h2o-and-qlog>

#### Other

- 日本の CDN シェアについて調査結果@2020 年 10 月 \| J-Stream CDN 情報サイト
  - <https://tech.jstream.jp/blog/cdn/cdn-share-oct2020/>

### セキュリティ動向

- *Smooz*
  - 国産ブラウザアプリ Smooz はあなたの閲覧情報をすべて外部送信している \| reliphone (for iPhone)
    - <https://reliphone.jp/post-16195/>
  - 続・国産ブラウザアプリ Smooz はあなたの閲覧情報をすべて外部送信している \| reliphone (for iPhone)
    - <https://reliphone.jp/post-16247/>
  - 続・続・国産ブラウザアプリ Smooz はあなたの閲覧情報をすべて外部送信している \| reliphone (for iPhone)
    - <https://reliphone.jp/post-16289/>
  - Smooz のサービス終了のお知らせ \| Smooz Blog
    - <https://smoozapp.com/blog/2020/12/23/end_of_service/>
  - Smooz サービス終了に寄せて
    - <https://gist.github.com/mala/f443d5d0ba1b46137684e555ade08098>
- Web Deprecation Metrics
  - <https://deprecate.it/>
- 様々なサイバー攻撃に繋がる脆弱性 HTTP リクエストスマグリング \| yamory Blog
  - <https://yamory.io/blog/about-http-request-smuggling/>

### 周辺動向

- *2020 Web Almanac*
  - <https://almanac.httparchive.org/>
- *No cookie for you - The GitHub Blog*
  - <https://github.blog/2020-12-17-no-cookie-for-you/>
  - Github から 3rd Party Cookie を全て無くし、 Session Cookie のみにした
  - 合意を取る必要がなくなったため、 Cookie Banner が無くなった
- *エンドツーエンド暗号化と法規制 – JPNIC Blog*
  - <https://blog.nic.ad.jp/2020/5545/>
  - E2E に関する規制への署名の話の詳細
  - > 声明に署名した 7 ヶ国および EU が言っていることは、バックドアを作るか鍵を預けなさいということだと考えられます。 ISOC が主張するように、 E2EE を破ることは一般の人を脆弱にさらすことになり、声明署名国や EU が主張するような、プライバシーを守りつつ法執行機関が暗号化された通信コンテンツにアクセスできるようにする方法は、両立しないと考えます。とはいえ、犯罪被害者になり、 E2EE のため犯人がつかまらない、となった場合、 E2EE が絶対といえるか、と考えると難しいものがあります。
- `content-visiblity` Without Jittery Scrollbars - Infrequently Noted
  - <https://infrequently.org/2020/12/content-visibility-scroll-fix/>
- Resize-Resilient `content-visiblity` Fixes - Infrequently Noted
  - <https://infrequently.org/2020/12/resize-resilient-deferred-rendering/>
- ソフトバンク・博報堂・トレジャーデータの合弁会社、 3rd パーティクッキー依存しないソリューションを提供開始 | RTB SQUARE
  - <https://rtbsquare.work/archives/34250>
- South Korea kills ActiveX-based government digital certificate service • The Register
  - <https://www.theregister.com/2020/12/10/south_korea_activex_certs_dead/>
  - 韓国政府が ActiveX 依存からの脱却へ
- Vol.49 \| Internet Infrastructure Review(IIR) \| IIJ の技術 \| インターネットイニシアティブ(IIJ)
  - <https://www.iij.ad.jp/dev/report/iir/049.html>
- Releasing Joy-Con WebHID
  - <https://blog.tomayac.com/2020/12/21/releasing-joy-con-webhid/>
  - Switch の Joy-Con を WebHID で使う
- *Chromium's Reduction of Root DNS Traffic - Verisign Blog*
  - <https://blog.verisign.com/domain-names/chromiums-reduction-of-root-dns-traffic/>
  - ブラウザが NXDOMAIN なレコードを勝手に返す ISP などの環境にある場合がある
  - omni bar に単語を入れるたびにそういうサイトが表示されてしまう場合がある
  - これを防ぐためにランダムなドメインの解決を 3 つやって、 IP が同じかどうかを見てた
  - このクエリが多すぎて問題になっていたのが解決したという話
  - M87 がリリースされて以降 41% のクエリが削減している
- *State of JS 2020*
  - <https://2020.stateofjs.com/>
  - 23,765 people in 137 countries
    - 日本語での回答は 27
  - State of JS 2020: Common Criticisms - DEV Community 👩‍💻👨‍💻
    - <https://dev.to/sachagreif/state-of-js-2020-common-criticisms-23id>
    - State of JS の回答者の偏り(米国、白人、男性)についてと、選択肢に入れている技術の選定について
- *Open Web Docs*
  - <https://opencollective.com/open-web-docs/updates/introducing-open-web-docs>
  - <https://github.com/openwebdocs/>
  - Open Collective で立ち上げた、 Web のドキュメンテーションの支援組織
  - MDN を移行したり、別で立ち上げるのではなく、暫くは MDN(Yari) の支援が中心
  - Igalia, Coil, Google, MS, Mozilla, Samsong, W3C などが参加
  - 組織中立なので Mozilla 自身も参加者
  - 寄付は以下から
    - <https://opencollective.com/open-web-docs>
  - Google
    - <https://web.dev/open-web-docs/>
  - Microsoft
    - <https://blogs.windows.com/msedgedev/2021/01/25/welcome-open-web-docs/>
  - Mozilla
    - <https://hacks.mozilla.org/2021/01/welcoming-open-web-docs-to-the-mdn-family/>
  - W3C
    - <https://www.w3.org/blog/2021/01/welcome-to-open-web-docs/>
  - Samsung
    - <https://twitter.com/samsunginternet/status/1353750850729103367>
  - Igalia
    - <https://www.igalia.com/2021/01/25/Open-Web-Docs.html>
  - Coil
    - <https://press.coil.com/press-news/coil-is-proud-to-support-open-web-docs>

### イベント

- 1 月
- 2 月
- 3 月
  - 8-12: IETF \| IETF 110 Online
    - <https://www.ietf.org/how/meetings/110/>
  - TBD: TC39 Meeting

### Wrap Up

- Survey
  - Web Almanac
  - State of JS
  - Mozilla developer needs assessments
- Open Web Doc
- CDS
- chrome.developers 公開
- chrome 87/88 release with incident
  - mixed contents で form submit 失敗
  - タイムゾーンの反映が壊れて時間表示が狂う
- chrome 89 Device 系 API
- privacy sandbox 1 年経過の続報
- privacy preserving preload と prerendering 2
- private prefetch proxy proposal
- <popup> と ModalCloseWacher
- SameParty Cookie
- Firefox 85 で preload
- ESNI to ECH
- Network Partitioning で Super Cookie 対策
- Safari TP aspect-ratio 周り実装中
- prefers-contrast: more
- private click measurement
- WebRTC 1.0 RC
- HTML Review Draft Recommendation
- WCAG 3 FPWD
- TAG Election
- TC39 async do expression
- TC39 Proposal Dataset
- tc39/js-outreach-groups
- IETF oblivious HTTP
- Tunneling と Proxy 系のドラフトが多い
- Cloudflare Oblivious DoH
- ウガンダ Internet Shutdown
- Smooz
- ESE 暗号化と法規制まとめ
