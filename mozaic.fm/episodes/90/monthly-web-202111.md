---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep90.mp3
published_at: 2021-12-13
guest: [@myakura](https://twitter.com/myakura)
---

# ep90 Monthly Web 202111

## Theme

第 90 回のテーマは 2021 年 11 月の Monthly Web です。

## Show Note

### Chrome 動向

#### Stable: 96

#### Updates

- **New in Chrome 96 - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-chrome-96/
  - Manifest id for PWAs
  - URL protocol handlers for PWAs
  - Priority hints (origin trial)
  - Emulate Chrome 100 in the UA string
  - Chrome Dev Summit
  - And more!
    - bfcache is available
- **What's New In DevTools (Chrome 96) - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-devtools-96/
  - Preview feature: New CSS Overview panel
  - Rendering tab updates
    - Emulate the CSS prefers-contrast media feature
    - Emulate the Chrome's Auto Dark Theme feature
  - Copy declarations as JavaScript in the Styles pane
  - New Payload tab in the Network panel
  - Improved the display of properties in the Properties pane
  - Console updates
    - Option to hide CORS errors in the Console
    - Proper Intl objects preview and evaluation in the Console
    - Consistent async stack traces
    - Retain the Console sidebar
  - Deprecated Application cache pane in the Application panel
  - [Experimental] New Reporting API pane in the Application panel
- **Chromium Blog: Chrome 97: WebTransport, New Array Static Methods and More**
  - https://blog.chromium.org/2021/11/chrome-97-webtransport-new-array-static.html
  - Preparing for a Three Digit Version Number
  - Features in this Release
    - Auto-expand Details Elements
    - Content-Security-Policy Delivery via Response Headers for Dedicated Workers.
    - CSS
      - font-synthesis Property
      - transform: perspective(none)
    - Feature Policy for Keyboard API
    - **HTMLScriptElement.supports() Method**
    - Late Newline Normalization in Form Submission
    - Standardize Existing Client Hint Naming
    - WebTransport
  - JavaScript
    - **Array and TypedArray findLast() and findLastIndex()**
  - Deprecations and Removals
    - Remove SDES Key Exchange for WebRTC
    - Remove WebSQL in Third-Party Contexts
    - Remove SDP Plan B
- **What's New In DevTools (Chrome 97) - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-devtools-97/
  - **Preview feature: New Recorder panel**
  - Refresh device list in Device Mode
  - **Autocomplete with Edit as HTML**
  - Improved code debugging experience
  - [Experimental] Syncing DevTools settings across devices
- Deprecations and removals in Chrome 97 - Chrome Developers
  - https://developer.chrome.com/en/blog/deps-rems-97/
  - Remove SDES key exchange for WebRTC
  - Remove WebSQL in third-party contexts
  - Remove SDP Plan B
- Chrome Dev Summit
  - https://www.youtube.com/watch?v=lNecNY6vDek
  - Keynote で Flash を HTML5 に終わらせられた Adobe の VP が Photoshop PWA で、 「Web でなんでもできる」って話をしてて感慨深い。

#### Intents

- **Prototype: Capability Delegation**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9CeLYndESPE
  - `targetWindow.postMessage("process_payment", {delegate: "payment"});`
  - 的な感じに特定のフレームに Policy を delegate できる
- **Prototype: HTMLInputElement showPicker()**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fEebe5uXQ1I
  - 日付、色、ファイルなどのピッカーを JS から読み出せる
- **Prototype: LCP support for animated images/auto-playing videos**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/c7AbRQiHh6g
- **Prototype: Sec-CH-UA-Full-Version-List user-agent client hint**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2V3kubJSOU0
  - Ship で解説
- Prototype: State extension for JS Self-Profiling API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/m1hp39BMNcQ
- Prototype: Web app translations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RweGN8hSvUg
- **Prototype: 'blocking=rendering' attribute on scripts and link resources**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ujX8Vbr_VFE/m/Z61eyTcoBAAJ
  - 明示的に blocking を要求する属性
  - Flash of Unstyled Contents (FOUC) などを防ぐ
- **Prototype: Dark mode support for web apps**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Y6zNtG0f-6A/m/cOhkfVGSBAAJ
  - manifest に theme と background の color を指定できる
- Prototype: High Dynamic Range Support for HTMLCanvasElement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/S609KGTkSSk/m/1EW4CWn3BgAJ
- Prototype: Web Neural Network API (WebNN)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PD6TDMDS9mg/m/N3MrigMyCAAJ
- Prototype: Web Machine Learning: Model Loader API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/w7Oq2_x2D8U
- **Prototype: NDEFReader makeReadOnly()**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iyljeGnIct8/m/tonTVszmCAAJ
  - NFC を永久に読み取り専用にする
  - 悪意のある上書きを防ぐための手段
- **Prototype: Allow cookie domain attributes to be the empty string**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kcvn81WtlvM
  - 今の Chrome は Cookie の Domain 属性が空文字だと仕様と違う動きをする
  - これを仕様(RFC6265bis) に準じるように直す。
  - 互換性もあがり、 WPT も通る。
- Prototype: Presentation API: Site-initiated mirroring
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IYgoj9avvK0
- Prototype: Declarative Link Capturing for PWAs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2ZnA1IrSpS8
- Prototype: OffscreenCanvas
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/4Fh79qw7mV0
- Prototype and Ship: self.structuredClone
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qerisCd3Qmo
- Ship: CSS Color Adjust: 'only' keyword for color-scheme
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Et7c6cWND3Q
- Ship: WebRTC Scalable Video Coding extensions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XzygOFuas2A
- Ship: auto keyword for contain-intrinsic-size
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TNggXYeJEQs
- Ship: forced-color-adjust: preserve-parent-color
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zEDgmKsyjTY
- Ship: AudioContext.outputLatency
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dTQniJNVVMY/m/hPFwY1fbBQAJ
- Ship: New window.open() popup vs. window behavior
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/q6ybnmxxvpE/m/2snoh6wkAgAJ
- Ship: Remove font-family -webkit-standard
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Cled-obRi6M/m/O1OzCtVfBwAJ
- Ship: Pickling for Async Clipboard API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/k2rgX-4Cigc/m/P0RijrpzBAAJ
- **Ship: Propagate request origin and redirect chain in passthrough service workers.**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ioyd2SfcqCI/m/tlIS4cZLBgAJ
  - これまでは SW で `fetch(e.request)` したら、リダイレクトでも Origin が SW の Origin になった。
  - Origin ヘッダと SameSite Cookie の挙動を正すためにこれを直す。
- **Ship: Private Network Access preflight requests for subresources**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/72CK2mxD47c/m/Tl59oNfABwAJ
  - Private Network に対する subresource request に preflight を必須にする
  - 展開のフェーズは 4 段階
  - 1: Preflight を送るが結果は無視しエラー表示、本来のリクエストも送る。
  - 2: 3 リリース様子見
  - 3: Preflight の結果を遵守。かつ deprecation trial を開始。
  - 4: 4 リリース後に deprecation trial を終了
- Ship: Convert adoptedStyleSheets to use ObservableArray
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8p7QvGn3Ezo/m/j-nO6azUBwAJ
- **Ship: CSS cascade layers**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZCN2tBZ2cUY/m/BQAcIIjFCAAJ
  - `@layer {}` block を定義し、 CSS のブロックをレイヤーに分けられるように
  - `@layer` rule でレイヤーの優先順位を決められる
  - カスケードはレイヤー内で行われ、別の(優先度の低い)レイヤーによる意図しない上書きを予防できるようになる
  - Gecko: [In development](https://bugzilla.mozilla.org/show_bug.cgi?id=1699215)
  - WebKit: [Shipped/Shipping](https://bugs.webkit.org/show_bug.cgi?id=220779)
  - Web developers: [Strongly positive](https://bugs.chromium.org/p/chromium/issues/detail?id=1095765)
- **Ship: Sec-CH-UA-Full-Version-List user-agent client hint**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yZh8Lwr34Ro
  - https://github.com/WICG/ua-client-hints/issues/196
  - major version 以下のシリアライズ方法(桁数)がブランドによるので全部必要な場面がある
- Ship: Pickling for Async Clipboard API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/k2rgX-4Cigc
- Ship: Supports keyword format in @font-face src descriptor
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/19baTRo2v4M
- Ship: Allow `infinity`, `-infinity` and `NaN` in CSS `calc()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/C-qitIHpE9o/m/sII-53WYDAAJ
- Ship: replace GamepadList with sequence for `navigator.getGamepads()` return value
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JG5ffk-itJk/m/nW0u1WxmDAAJ
- Ship: Handwriting Recognition API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/s3n3bGl6i1M/m/-WWoNcZTDAAJ
  - Question about Shipping vs Continue Experimenting
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/OXnXteNYQQQ
- Ship: Intl Enumeration API (for m99)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/I0Y4FrRMNSY/m/XIN_fgA5DAAJ
- Ship: Intl Locale Info in ECMA402 (for m99)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4ZMt5ukQNRs/m/0flHnuaBBgAJ
- Experiment: Web app launch handler
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wNOClobsLrs
- Experiment: Dark mode support for web apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ftoKq32Baz4/m/MWjC841eDAAJ
- Experiment: Intl Enumeration API (for m99)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EI0musnzc-I/m/9ZLVatQ4DAAJ
- Extend Origin Trial: Subresource loading with Web Bundles
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lv2JQjDdyhM
- Extent Origin Trial: WebGPU
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/l-QcZ7qOcUQ
- Deprecate: Standardize existing client hint naming
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TjLu0NSvSL8
- Deprecate and Remove: Calling PaymentRequest.show without user activation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xCW746n6XJI/m/KYIdsFteCAAJ
- Request for (Extending) Deprecation Trial: [WebRTC] Deprecate and Remove Plan B
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Zyvaa5VNijg/m/tAgoASxRBAAJ

#### V8

- WebAssembly Dynamic Tiering ready to try in Chrome 96 · V8
  - https://v8.dev/blog/wasm-dynamic-tiering
- Oilpan library · V8
  - https://v8.dev/blog/oilpan-library

#### Other

- web.dev
  - **Everything announced at Chrome Dev Summit 2021**
    - https://web.dev/cds2021-updates/
    - Make the web more interoperable #
    - Allow new classes of applications to run on the web #
    - Ensure privacy #
    - Improve Core Web Vitals #
    - Enable new web platform features #
    - Help you to create beautiful and responsive sites #
    - Provide courses to help you learn web technology #
  - What's new in PageSpeed Insights
    - https://web.dev/whats-new-pagespeed-insights/
  - Lighthouse user flows
    - https://web.dev/lighthouse-user-flows/
  - **Towards an animation smoothness metric**
    - https://web.dev/smoothness/
  - **Feedback wanted: An experimental responsiveness metric**
    - https://web.dev/responsiveness/
  - Picking colors of any pixel on the screen with the EyeDropper API
    - https://web.dev/eyedropper/
  - **Building an effective Image Component**
    - https://web.dev/image-component/
  - Photoshop's journey to the web
    - https://web.dev/ps-on-the-web/
  - **The UI fund**
    - https://web.dev/ui-fund/
  - SVGcode: a PWA to convert raster images to SVG vector graphics
    - https://web.dev/svgcode/
  - Building a 3D game menu component
    - https://web.dev/building-a-3d-game-menu-component/
  - Kapwing: Powerful video editing for the web
    - https://web.dev/kapwing/
  - **Building a toast component**
    - https://web.dev/building-a-toast-component/
- google developer blog
  - Google Developers Blog: Improve your development workflow with Interactive Canvas DevTools
    - https://developers.googleblog.com/2021/11/improve-your-development-workflow-with-interactive-canvas-devtools.html
- google developer japan blog
  - Google Developers Japan: OS ログイン時に PWA を起動する
    - https://developers-jp.googleblog.com/2021/11/os-pwa.html
  - Google Developers Japan: Chrome の検索、ブラウズ、シャットダウン時のパフォーマンスを改善
    - https://developers-jp.googleblog.com/2021/11/chrome-performance-improvements.html
  - Google Developers Japan: Chrome 96: 条件に応じたフォーカスや優先度ヒントなどの新機能
    - https://developers-jp.googleblog.com/2021/11/chrome-96.html
  - Google Developers Japan: Payment Request API で "basic-card" 支払い方法の提供が終了
    - https://developers-jp.googleblog.com/2021/11/payment-request-api-basic-card.html
  - Google Developers Japan: Google OAuth の段階的な認証の改善について
    - https://developers-jp.googleblog.com/2021/11/google-oauth.html
  - Google Developers Japan: Chrome OS での Chrome アプリのサポートを延長
    - https://developers-jp.googleblog.com/2021/11/chrome.html
- chrome developer blog
  - **Force Chrome major version to 100 in the User-Agent string - Chrome Developers**
    - https://developer.chrome.com/en/blog/force-major-version-to-100/
  - Progress in the Privacy Sandbox (October 2021) - Chrome Developers
    - https://developer.chrome.com/en/blog/progress-in-the-privacy-sandbox-2021-10/
  - Implementing CSP and Trusted Types debugging in Chrome DevTools - Chrome Developers
    - https://developer.chrome.com/en/blog/csp-issues/
  - Helping developers build powerful, installable web apps - Chrome Developers
    - https://developer.chrome.com/en/blog/pwa-install-features/
  - What's new in Lighthouse 9.0 - Chrome Developers
    - https://developer.chrome.com/en/blog/lighthouse-9-0/
- chromium blog
  - Chromium Blog: Chrome Dev Summit 2021: Moving toward a more powerful and private web
    - https://blog.chromium.org/2021/11/chrome-dev-summit-2021-moving-toward.html
  - Chromium Blog: Run on OS Login
    - https://blog.chromium.org/2021/11/run-on-os-login.html
  - Chromium Blog: Searching, browsing, and shutdown Chrome performance improvements
    - https://blog.chromium.org/2021/11/searching-browsing-shutdown-chrome-performance-improvements.html
  - Chromium Blog: Chrome on Windows performance improvements and the journey of Native Window Occlusion
    - https://blog.chromium.org/2021/12/chrome-windows-performance-improvements-native-window-occlusion.html
  - Chromium Blog: Faster Chrome - Let The Compiler do the work
    - https://blog.chromium.org/2021/12/faster-chrome-let-the-compiler-do-the-work.html
  - Chromium Blog: Simplified Storage Controls
    - https://blog.chromium.org/2021/11/simplified-storage-controls.html
  - Chromium Blog: Partitioning Chrome's Code for Faster Launch Times on Android
    - https://blog.chromium.org/2021/11/chrome-android-faster-launch-times-less-memory.html
- search central
  - 2021 年におけるモバイル インデックス登録に関する最新情報 | Google 検索セントラル ブログ | Google Developers
    - https://developers.google.com/search/blog/2021/11/update-on-mobile-indexing
  - Google 検索セントラル 1 周年 | Google 検索セントラル ブログ | Google Developers
    - https://developers.google.com/search/blog/2021/11/one-year-of-search-central
  - **パソコン向けページ エクスペリエンスによるランキングの導入スケジュール | Google 検索セントラル ブログ | Google Developers**
    - https://developers.google.com/search/blog/2021/11/bringing-page-experience-to-desktop
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- **Introducing Bento - The AMP Blog**
  - https://blog.amp.dev/2021/12/08/introducing-bento/
  - `<bento-fit-text>Hello World!</bento-fit-text>` | bentojs.dev
  - https://bentojs.dev/blog/introducing-the-bento-components-library/
- BlinkOn 15
  - https://www.chromium.org/events/blinkon-15/
  - https://www.youtube.com/playlist?list=PL9ioqAuyl6UL_1DiG1tPRHbGJlGQ_gQJW
  - https://docs.google.com/spreadsheets/d/1x2MXoLaYENQg7WKHWspzwAuttDB38T5pc74ZHRYEKgo/edit#gid=0

### Firefox 動向

#### Stable: 95.0

#### Updates

- Firefox 94.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/94.0/releasenotes/
- **Firefox 94 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/94
  - `self.structuredClone()`
  - element.enterKeyHint
  - `script.supports()`
  - ShadowRoot.delegatesFocus
- **Firefox Beta 95.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/95.0/releasenotes/
  - Slack のコール機能を動かすために slack.com に UA Sniffing を導入
    - `Mozilla/5.0 (Windows NT 10.0; Win64; x64) FxQuantum/58.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36`
    - 通常は `Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0`
  - Fission のロールアウト
- **Firefox 95 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/95
  - `crypto.randomUUID()`
- These Weeks in Firefox: Issue 103 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2021/11/10/these-weeks-in-firefox-issue-103/
- These Weeks in Firefox: Issue 104 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2021/11/18/these-weeks-in-firefox-issue-104/
- These Weeks in Firefox: Issue 105 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2021/12/07/these-weeks-in-firefox-issue-105/

#### Intents

- Prototype and Ship: AnimationFrameProvider for DedicatedWorkerGlobalScope
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/cYJTSbMxFCg
- **Prototype and ship: `hwb()` colors**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/929YVWNQsY0
- Prototype: OffscreenCanvas
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/4Fh79qw7mV0/m/KZHhvHCkCgAJ
- **Ship: Cookie "SameSite=Lax by default", "SameSite=None only if secure" and "Schemeful SameSite"**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/6PZtLH7c6JQ
- Ship: CSS page-size
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/fk6UBxxgnII
- Ship: Partitioned Third-party ServiceWorker in dFPI
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/-ReVw4IGhaw
- Ship: inputmode attribute on Firefox Desktop
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/tlnhpsvhp64
- Ship: Web Locks
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Vfe_V9_KvNg
- Ship: CSS reversed() counters
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Holnk7wDCOk
- Unship: SVGPathSeg APIs
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/6TrOO8yxlwo
- Unship: Alt-a works as "Select All" on Linux
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/UnuAphNfcK8
- Engineering Effectiveness Newsletter (November 2021 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/iA1PcfXiqNQ
- Firefox Security & Privacy Newsletter 2021 Q3
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/5RpuDK2tySk

#### Other

- Engineering Effectiveness Newsletter (October 2021 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/TxaBV-CSGqI
- There's more than one way to browse on mobile with Firefox and Firefox Focus
  - https://blog.mozilla.org/en/products/firefox/firefox-focus-or-firefox/
- Firefox brings you a new homepage making it easier to jump back in to the stuff you care about on your mobile devices
  - https://blog.mozilla.org/en/mozilla/news/firefox-brings-you-a-new-homepage/
- **Announcing Firefox 94 New Colorways Themes**
  - https://blog.mozilla.org/en/products/firefox/introducing-new-colorways-for-firefox-94/
- **Mozilla's Firefox named in inaugural Brands That Matter**
  - https://blog.mozilla.org/en/mozilla/mozillas-firefox-named-in-inaugural-brands-that-matter/
  - https://www.fastcompany.com/brands-that-matter/2021
  - Brands That Matter 2021 に Firefox がノミネートされた
- Tired of spam? A burner email account could be the answer.
  - https://blog.mozilla.org/en/products/firefox/burner-email-firefox-relay/
- Announcing Slate & Pocket Partnership Slow Burn Season 6
  - https://blog.mozilla.org/en/products/pocket/slate-pocket-partnership-slow-burn-season-6/
- Hacked Story of Real Estate Scam & Online Security Tips
  - https://blog.mozilla.org/en/internet-culture/hacked-real-estate-scam/
- Securing the proxy API for Firefox add-ons - Mozilla Security Blog
  - https://blog.mozilla.org/security/2021/10/25/securing-the-proxy-api-for-firefox-add-ons/
- **Finding and Fixing DOM-based XSS with Static Analysis - Attack & Defense**
  - https://blog.mozilla.org/attack-and-defense/2021/11/03/finding-and-fixing-dom-based-xss-with-static-analysis/
- Introducing Firefox Relay Premium, allowing more aliases to protect your identity from spammers
  - https://blog.mozilla.org/en/mozilla/firefox-relay-and-premium-service/
- Firefox's Private Browsing mode upleveled for you
  - https://blog.mozilla.org/en/mozilla/firefoxs-private-browsing-mode-upleveled-for-you/
- **WebAssembly and Back Again: Fine-Grained Sandboxing in Firefox 95 - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2021/12/webassembly-and-back-again-fine-grained-sandboxing-in-firefox-95/

### Safari 動向

#### Stable: 15.1

#### Updates

- **New WebKit Features in Safari 15**
  - https://webkit.org/blog/11989/new-webkit-features-in-safari-15/
  - Web Extensions
  - **HTML**
    - `theme-color`
  - **CSS**
    - `aspect-ratio`
    - Color Level 4
    - new `list-style-type`
  - Web Inspector
  - **JavaScript and WebAssembly**
    - support for top-level await
    - Error.cause
    - private class methods and accessors
    - BigInt64Array and BigUint64Array
  - Web APIs
    - WebGL2
    - Web Share API
    - `requestAnimationFrame`
    - `performance.timeOrigin`
  - **Media**
    - Opus in WebM
    - VP9 and WebM in MSE
    - MediaSession API to Share Play
  - Security and Privacy
    - automatic HTTPS upgrade
    - hide IP from known trackers
    - updates to Private Click Measurement
  - **Authentication and Passwords**
    - `autocomplete=one-time-code`
    - `apple-otpauth:`
    - otpauth QR code
    - Secure login with iCloud Keychain verification codes
  - Payments
    - Payment Request API
- Release Notes for Safari Technology Preview 134
  - https://webkit.org/blog/12033/release-notes-for-safari-technology-preview-134/
  - CSS
    - Unprefixed -webkit-appearance and added support for the auto value (r283858, r284098)
    - Added support for the x resolution unit outside of image-set (r282396)
    - **Added support for text-decoration-skip-ink (r282397)**
  - Fonts
    - Added parsing support for font-palette-values (r282806)
    - Added parsing support for font-palette (r282851)
    - Added pushing font-palette-values data into CSSFontSelector (r282838)
    - Added support for CSSFontPaletteValuesRule.name (r283140)
    - Added Web Inspector support for font-palette (r282987)
    - Allowed base-palette can accept "light" or "dark" (r283398)
  - Scrolling
    - Enabled support for ScrollOptions' ScrollBehavior and CSS scroll-behavior properties (r284029)
  - Rendering
    - Enabled 2D canvas color space support on Apple platforms (r283541)
    - Updated converting an SVG image for canvas drawImage to choose an appropriate color space (r283531)
  - **Dialog Element**
    - The `<dialog>` element is now enabled by default (r284155), also including:
      - support for the CSS ::backdrop pseudo element
      - support for the top layer
      - `<form method="dialog">` support
    - The inert attribute is available for testing behind an experimental flag with the same name
  - WebAssembly
    - Allowed WASM to use up to 4GB (r284330)
    - Implemented the WebAssembly exception handling proposal (r283852)
  - JavaScript
    - Enabled unlinked Baseline JIT for performance (r283139)
  - Web API
    - **Enabled BroadcastChannel (r282426)**
    - Implemented top-origin and frame-origin partitioning for BroadcastChannel (r282366)
    - **Enabled Storage API by default (r284273)**
    - **Enabled FileSystemAccess and AccessHandle by default (r284131)**
    - **Implemented FileSystemSyncAccessHandle read() and write() (r284059)**
    - Implemented the borderBoxSize and contentBoxSize parts of ResizeObserver (r282441)
    - **Implemented CSP script-src-elem, style-src-elem, script-src-attr and style-src-attr directives (r284254)**
  - WebRTC
    - Added support for WebRTC media capabilities (r284085, r284236)
    - Changed MediaCapabilities to enqueue a task to resolve promises (r284236)
  - Accessibility
    - **Exposed the URL attribute of `<video>` elements (r283799)**
    - **Made PDFs loaded via `<embed>` accessible (r282358)**
  - Private Click Measurement
    - Allowed measurement of links in nested, cross-site iframes (r283593)
  - Web Extensions
    - Allowed more directives to be included in the content_security_policy of an extension's manifest, such as the sandbox directive
- Release Notes for Safari Technology Preview 135
  - https://webkit.org/blog/12040/release-notes-for-safari-technology-preview-135/
  - CSS
    - Media queries affect Cascade Layer order (r284859)
    - **Enabled accent-color by default (r284634)**
    - **Added support for small svw/svh/svmin/svmax, large lvw/lvh/lvmin/lvmax, and dynamic dvw/dvh/dvmin/dvmax viewport units (r284628)**
    - Added flex-basis: content support (r284440)
    - Added support for contain: style for counters (r284642, r284755)
    - Added support for ::before and ::after pseudo elements after ::slotted (r284973)
    - Added support for more CSS properties for ::marker (r284519)
    - Allowed :is and :where after all pseudo elements (r285054)
    - Made :-webkit-any() a synonym of :is() (r285032)
  - WebAPI
    - **Enabled lazy image loading by default (r284995)**
    - Added support for rel="noopener/noreferrer" on `<form>` elements (r284749)
    - Exposed MediaCapabilities to Workers (r284443)
  - Media
    - Added support for requestVideoFrameCallback API for MediaStreamTrack-based backends (r284528)
- Release Notes for Safari Technology Preview 136
  - https://webkit.org/blog/12137/release-notes-for-safari-technology-preview-136/
  - CSS
    - **Added support for contain: paint (r285583)**
    - Added support for the revert-layer value (r285624)
    - Added flex-basis: content support (r285709)
    - **Implemented Scroll To Text Fragment directive parsing (r285528)**
  - JavaScript
    - Implemented IntlNumberFormat v3 (formatRangeToParts is not implemented yet) (r285418)
    - Implemented Temporal.Instant (r285178)
  - Web API
    - Implemented custom element definition's disable shadow flag (r285740)
  - Media
    - Fixed showing languages and subtitles tracks button and menu for `<audio>` (r285216)
  - Web Animations
    - Added support for composite operations for software animations (r285397)
  - WebAuthn
    - Implemented add_virtual_authenticator and remove_virtual_authenticator for WebDriver (r285267)
  - Web Extensions
    - **Added support for manifest_version 3 and service_worker background scripts, while also supporting the option of using non-persistent background pages**
    - Added support for script and style injection via the browser.scripting APIs
    - Added support for dynamic and session rules via the browser.declarativeNetRequest APIs
- PCM for In-App Direct Response Advertising
  - https://webkit.org/blog/12042/pcm-for-in-app-direct-response-advertising/

#### Position

- https://lists.webkit.org/pipermail/webkit-dev/
- いくつかあるが返事は無し

#### Other

- **Enable :focus-visible pseudo-class by default**
  - https://trac.webkit.org/changeset/286783/webkit

### Edge 動向

#### Stable: 96

#### Updates

- Previewing Citations in Microsoft Edge
  - https://blogs.windows.com/msedgedev/2021/11/04/preview-citations-feature-edge/
- Microsoft Edge celebrates customers moving to IE mode, Linux, and new search innovations
  - https://blogs.windows.com/msedgedev/2021/11/02/edge-ignite-nov-2021/
- Microsoft Edge features help give you the most out of Microsoft 365 to reduce the pain of context switching
  - https://blogs.windows.com/msedgedev/2021/10/28/microsoft-edge-features-microsoft-365-reduce-pain-context-switching/
- Debug memory leaks with the Microsoft Edge Detached Elements tool
  - https://blogs.windows.com/msedgedev/2021/12/09/debug-memory-leaks-detached-elements-tool-devtools/
- Cloud Site List Management experience for IE mode in Microsoft Edge now generally available
  - https://blogs.windows.com/msedgedev/2021/12/07/cloud-site-list-management-experience-for-ie-mode-in-microsoft-edge-now-generally-available/

#### Chakra

#### Other

- \<第一弾> Developer Support Internet (DSI) ってどのような製品の技術サポートをしているの? | Japan Developer Support Internet Team Blog
  - https://jpdsi.github.io/blog/general/career1-dsi-technologies/
- **\<第二弾> インターンから見た Microsoft と Developer Support Internet (DSI) チーム (2021) | Japan Developer Support Internet Team Blog**
  - https://jpdsi.github.io/blog/general/career2-intern-experience/
- Introducing transparent ads in Microsoft Edge Preview - Microsoft Tech Community
  - https://techcommunity.microsoft.com/t5/articles/introducing-transparent-ads-in-microsoft-edge-preview/m-p/3035970#M6283
- **Introducing Buy now, pay later in Microsoft Edge - Microsoft Tech Community**
  - https://techcommunity.microsoft.com/t5/articles/introducing-buy-now-pay-later-in-microsoft-edge/m-p/2967030#M6024
- Microsoft Edge's Many Processes - text/plain
  - https://textslashplain.com/2021/12/01/microsoft-edges-many-processes/
- **Great Bug Reports via "Recreate My Problem" in Microsoft Edge - text/plain**
  - https://textslashplain.com/2021/12/01/great-bug-reports-via-recreate-my-problem-in-microsoft-edge/
- View-Source - text/plain
  - https://textslashplain.com/2021/11/11/view-source/
- **Edge に「Chrome のダウンロードを中止するように必死で促す新機能」が追加、実際の画面はこんな感じ - GIGAZINE**
  - https://gigazine.net/news/20211203-edge-chrome/

### WHATWG/W3C 動向

### TPAC

- TPAC 2021: Overview
  - https://www.w3.org/2021/10/TPAC/Overview.html
  - 10/12: AC meeting (member-only)
  - 10/18 - 22: breakout sessions, social events
    - https://web-eur.cvent.com/event/2b77fe3d-2536-467d-b71b-969b2e6419b5/websitePage:efc4b117-4ea4-4be5-97b4-c521ce3a06db
    - **State of CSS 2021**
      - https://docs.google.com/presentation/d/1FIMa9TXTdGusG_oJBtMmQLSyOuF0xgHsrvn7CKZH7Yw/edit?resourcekey=0-cFnhzvjncEEQaOB426PXnw#slide=id.gf91e504777_0_292
    - **WebViews - Making WebViews Work for the Web**
      - https://www.w3.org/2021/Talks/dhm-tpac-webviews/
    - TPAC_2021_breakout_WebRTC - NV Use cases
      - https://lists.w3.org/Archives/Public/www-archive/2021Oct/att-0003/TPAC_2021_breakout_WebRTC_-_NV_Use_cases.pdf
    - focusgroup_toggle_and_tabs.pdf
      - https://lists.w3.org/Archives/Public/www-archive/2021Oct/att-0005/focusgroup_toggle_and_tabs.pdf
  - 10/25 - 29: group & joint meetings
    - https://web-eur.cvent.com/event/2b77fe3d-2536-467d-b71b-969b2e6419b5/websitePage:efc4b117-4ea4-4be5-97b4-c521ce3a06db
    - Second Screen WG/CG - TPAC 2021 agenda · Issue #3 · w3c/secondscreen-wg
      - https://github.com/w3c/secondscreen-wg/issues/3
      - Multi-Screen WIndow Placemnet
      - Remote Playback
    - Agenda TPAC2021 · w3c/webpayments Wiki
      - https://github.com/w3c/webpayments/wiki/Agenda-TPAC2021
      - Secure Payment Confirmation
      - SPC w/ WebAuthN
      - w/ PING
      - Digital Goods API
    - WebPerf WG @ TPAC 2021 - Google ドキュメント
      - https://docs.google.com/document/d/1GQpM8IvL4feXQ0oQdCQIPKhZZkMLNTYJQhBUntMxPkI/edit#heading=h.odc700in1ypg
      - めっちゃいっぱい
    - TPAC 2021 · w3c/webappswg Wiki
      - https://github.com/w3c/webappswg/wiki/TPAC-2021
    - TPAC 2021 - Web Real-Time Communications Working Group Wiki
      - https://www.w3.org/2011/04/webrtc/wiki/TPAC_2021#Joint_WebRTC.2FMedia.2FAudio_WG_Meeting
    - WebTransport/TPAC 2021 - W3C Wiki
      - https://www.w3.org/wiki/WebTransport/TPAC_2021
      - Multicast Group との discussion
    - Networks/TPAC2021 - W3C Wiki
      - https://www.w3.org/wiki/Networks/TPAC2021
    - **TPAC 2021 initial planning - Cognitive Accessibility Task Force**
      - https://www.w3.org/WAI/GL/task-forces/coga/wiki/TPAC_2021_initial_planning#AG_groups_.28Silver.2C_ACT.29
      - COGA
      - https://w3c.github.io/coga/content-usable/
  - 10/18 - 29: expo space
  - 10/18 - 29: networking
  - webappsec/2021-10-19-minutes.md at main · w3c/webappsec
    - https://github.com/w3c/webappsec/blob/main/meetings/2021/2021-10-19-minutes.md
    - TPAC とは別?
    - CSP の話をしている
  - webappsec/2021-11-16-agenda.md at main · w3c/webappsec
    - https://github.com/w3c/webappsec/blob/main/meetings/2021/2021-11-16-agenda.md
    - XS-Leaks summit の話

#### Draft

- Recommendation
  - **ARIA in HTML is a W3C Recommendation**
    - https://www.w3.org/blog/news/archives/9367
- Proposed Recommendation
- Candidate Recommendation
  - W3C Invites Implementations of CSS Scrollbars Styling Module Level 1
    - https://www.w3.org/blog/news/archives/9370
  - W3C Invites Implementations of User Timing and Performance Timeline
    - https://www.w3.org/blog/news/archives/9353
- Working Draft
- First Public Working Draft
  - **First Public Working Draft: MiniApp Packaging**
    - https://www.w3.org/blog/news/archives/9346
  - First Public Working Draft: Digital Publishing Accessibility API Mappings 1.1
    - https://www.w3.org/blog/news/archives/9349
- Chartering
  - Proposed W3C Charter: Web Payments Working Group
    - https://lists.w3.org/Archives/Public/public-new-work/2021Nov/0009.html
  - Proposed W3C Charter: Accessible Rich Internet Applications Working Group
    - https://lists.w3.org/Archives/Public/public-new-work/2021Nov/0008.html
  - HTML Working Group Charter extended until 31 January 2022
    - https://lists.w3.org/Archives/Public/public-new-work/2021Nov/0005.html
  - Call for Prior Art - Second Screen Working Group PAG
    - https://www.w3.org/blog/news/archives/9355

#### Other

- **The WHATWG Blog - New Living Standards**
  - https://blog.whatwg.org/new-living-standards-2021
  - WHATWG で管理する仕様に以下の 4 つが追加
  - Web IDL Standard
    - https://webidl.spec.whatwg.org/
  - Test Utils Standard
    - https://testutils.spec.whatwg.org/
  - WebSockets Standard
    - https://websockets.spec.whatwg.org/
  - New standard: File System · Issue #176 · whatwg/sg
    - https://github.com/whatwg/sg/issues/176
- **W3C opens Technical Architecture Group (TAG) election | W3C News**
  - https://www.w3.org/blog/news/archives/9338
  - Statements about TAG nominees for 2021 Election
    - https://www.w3.org/2021/11/16-tag-nominations
- **Interoperability Remedies Community Group**
  - https://interop-remedies-cg.github.io/
  - Interoperability Remedies Community Group Charter
  - https://interop-remedies-cg.github.io/charter.html

### TC39 動向

#### Meeting

- **2021-11**
  - https://github.com/tc39/agendas
  - https://github.com/tc39/notes/blob/master/meetings/2021-10/oct-25.md
  - https://github.com/tc39/notes/blob/master/meetings/2021-10/oct-26.md
  - https://github.com/tc39/notes/blob/master/meetings/2021-10/oct-27.md
  - https://github.com/tc39/notes/blob/master/meetings/2021-10/oct-28.md

#### Proposals Diff

- https://github.com/tc39/proposals/compare/master@{2021-11-01}...master@{2021-12-11}
- https://tc39.github.io/beta/
- 0->1
  - String.cooked
  - Bind this operator
  - Evaluator Attributes
  - RegExp Modifiers
  - RegExp Extended Mode and Comments
  - RegExp \R Escape
  - RegExp Buffer Boundaries
- 1->2
  - Array Grouping
  - Destructure Private Fields
- 2->3
- 3->4
  - Error Cause

#### New Proposals

- **tc39/proposal-function-helpers**
  - https://github.com/tc39/proposal-function-helpers
  - lodash 的なやつ
- **tc39/proposal-destructuring-private**
  - https://github.com/tc39/proposal-destructuring-private
  - `const {#foo: foo} = this` する
- FrankYFTang/proposal-intl-segmenter-v2
  - https://github.com/FrankYFTang/proposal-intl-segmenter-v2
- **tc39/proposal-regexp-modifiers: Regular Expression Pattern Modifiers for ECMAScript**
  - https://github.com/tc39/proposal-regexp-modifiers
- tc39/proposal-regexp-x-mode
  - https://github.com/tc39/proposal-regexp-x-mode
- tc39/proposal-regexp-r-escape: Regular Expression `\R` Escape for ECMAScript
  - https://github.com/tc39/proposal-regexp-r-escape
- tc39/proposal-regexp-buffer-boundaries
  - https://github.com/tc39/proposal-regexp-buffer-boundaries

#### Other

### IETF 動向

#### WG

- IETF112
  - https://datatracker.ietf.org/meeting/
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - HTTP PREVIEW method
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0169.html
  - HTTP Signatures Playground
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0164.html
  - Digest Fields: removing id- algorithms
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0124.html
  - I-D Action: draft-ietf-httpbis-binary-message-00.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0167.html
  - I-D Action: draft-ietf-httpbis-http2bis-06.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0159.html
  - I-D Action: draft-ietf-httpbis-priority-10.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0156.html
  - I-D Action: draft-ietf-httpbis-digest-headers-07.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0146.html
  - **Publication has been requested for draft-ietf-httpbis-targeted-cache-control-02**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0147.html
  - **Publication has been requested for draft-ietf-httpbis-priority-09**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0130.html
  - **Working Group Last Call: Digest Fields**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0148.html
  - Last Call: (Extensible Prioritization Scheme for HTTP) to Proposed Standard from The IESG
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0144.html
  - Last Call: (Hypertext Transfer Protocol Version 2 (HTTP/2)) to Proposed Standard from The IESG
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0137.html
  - extensible prioritization scheme review
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0153.html
  - **Hold the Date: February 2022 Interim Meeting**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0149.html
    - February 1, 21:00-23:00 UTC
    - February 3, 21:00-23:00 UTC
- quicwg
  - https://mailarchive.ietf.org/arch/browse/quic/
  - https://github.com/quicwg/wg-materials
  - Multipath Extension for QUIC @ IETF-112, Nov 10, 2021
    - https://datatracker.ietf.org/meeting/112/materials/slides-112-quic-unified-multipath-quic-extension-00
  - QUIC Version 2
    - https://www.ietf.org/archive/id/draft-ietf-quic-v2-00.html
- webtrans
  - https://mailarchive.ietf.org/arch/browse/webtransport/
  - https://github.com/DavidSchinazi/webtrans-wg-materials
  - IETF112_WEBTRANS_WG
    - https://datatracker.ietf.org/meeting/112/materials/slides-112-webtrans-webtrans-wg-slides-04
- tlswg
  - https://mailarchive.ietf.org/arch/browse/tls/
  - https://github.com/tlswg/wg-materials
- wpack
  - **WPACK@IETF112**
    - https://datatracker.ietf.org/meeting/112/materials/slides-112-wpack-wpack-chairs-slides-ietf112-00
    - Bundle Preload と WebBundle をマージしようという話
  - slides-112-wpack-bundle-preload-00
    - https://datatracker.ietf.org/meeting/112/materials/slides-112-wpack-bundle-preload-00
  - Web Bundles and Bundle Preloading (2 つの仕様の差分)
    - https://docs.google.com/document/d/1VxmJv41ZsyPLGxI0Dm4qalyEBZBPEn2sTs1eYTmA4Sc/edit#heading=h.6kknmf22ixwc
- httpapi
  - **Query Method**
    - https://datatracker.ietf.org/meeting/112/materials/minutes-112-httpapi-00
    - httpapi ができる前から httpwg でやってたのでそのままだけど、本来は httpapi なのでこっちで mnot が紹介的な?
- masque
  - **HTTP Dgram Priorities IETF 112**
    - https://datatracker.ietf.org/meeting/112/materials/slides-112-masque-http-datagram-priorities-00
    - QUIC で Datagram をする API の H3 版である Datagram における priority
- pearg
- privacypass
- dispatch
  - **DISPATCH Virtual Meeting @IETF-112 - HedgeDoc**
    - https://datatracker.ietf.org/meeting/112/materials/minutes-112-dispatch-00
    - Secure Credential Transfer
    - iCloud で WebAuthN の鍵共有みたいなケースの標準化
- secdispatch
  - https://mailarchive.ietf.org/arch/browse/secdispatch/
- ohai
  - **OHTTP**
    - ietf112-ohai-chairs-slides
      - https://datatracker.ietf.org/meeting/112/materials/slides-112-ohai-chair-slides-00
    - WG ができて初めてのセッションなのでご紹介
    - Oblivious HTTP
      - https://www.ietf.org/archive/id/draft-ietf-ohai-ohttp-00.html
- priv
  - ユースケースなどの出し合い BoF
    - https://datatracker.ietf.org/meeting/112/materials/minutes-112-priv-02
- other
  - Private Access Tokens
    - https://www.ietf.org/archive/id/draft-private-access-tokens-01.html
    - Trust Token の簡単なやつ well-known で pub key 公開するやつ
  - **Avoiding Internet Centralization**
    - https://www.ietf.org/archive/id/draft-nottingham-avoiding-internet-centralization-00.html

#### Other

### CDN 動向

#### Cloudflare

- **Cloudflare blocks an almost 2 Tbps multi-vector DDoS attack**
  - https://blog.cloudflare.com/cloudflare-blocks-an-almost-2-tbps-multi-vector-ddos-attack/
  - Mirai による 2Tbps の DDoS を検出し軽減した話
  - DNS amplification と UDP floods の組み合わせ
  - 15000 の IoT デバイスとパッチの当たってない GitLab から
  - 最近はネットワーク層の DDoS がトレンドで 44% 増加している
- How Cloudflare security responded to log4j2 vulnerability
  - https://blog.cloudflare.com/how-cloudflare-security-responded-to-log4j2-vulnerability/
- Inside the log4j2 vulnerability (CVE-2021-44228)
  - https://blog.cloudflare.com/inside-the-log4j2-vulnerability-cve-2021-44228/
- CVE-2021-44228 - Log4j RCE 0-day mitigation
  - https://blog.cloudflare.com/cve-2021-44228-log4j-rce-0-day-mitigation/

#### Fastly

- 30 years of the website: meeting the demands of the future | Fastly
  - https://www.fastly.com/blog/30-years-of-the-website-meeting-the-demands-of-the-future
- Web サイトの 30 年 : 未来に向けた Web アプリケーションの構築 | Fastly
  - https://www.fastly.com/jp/blog/30-years-of-the-website-building-web-applications-for-the-future
- Web サイトの 30 年 : より安全な Web の未来に向けて | Fastly
  - https://www.fastly.com/jp/blog/30-years-of-the-website-securing-the-future-of-the-web
- ウェブサイトの 30 年:次の 30 年を構築するための 5 つのレッスン|速く
  - https://www.fastly.com/blog/30-years-of-the-website-five-lessons-for-building-the-next-30-years
- **Digging deeper into Log4Shell - 0Day RCE exploit found in Log4j | Fastly**
  - https://www.fastly.com/blog/digging-deeper-into-log4shell-0day-rce-exploit-found-in-log4j

#### Other

### セキュリティ動向

- **Exploiting CSP in Webkit to Break Authentication & Authorization**
  - https://threatnix.io/blog/exploiting-csp-in-webkit-to-break-authentication-authorization/
  - Webkit の CSP バグを使って認証を盗む
  - DEMO の動画あり

### 周辺動向

- **Sorry Safari team - Modern Web Development with Chrome by Paul Kinlan**
  - https://paul.kinlan.me/sorry-safari-team/
  - Chrome Dev Summit で Compat 2021 の成果報告があった
  - 3 ブラウザそれぞれでスコアが向上していたが、 Safari だけ点数が低かった
    - 実は数ヶ月前の Safari TP でテストしていたことが判明
    - スコアの元になった web-platform-tests はインフラの都合上、新しい Safari TP を入れられていなかった
  - public shaming として扱われて燃えてしまい、 Paul Kinlan が謝罪
- **Top web developer pain points in 2021 - Modern Web Development with Chrome by Paul Kinlan**
  - https://paul.kinlan.me/top-web-developer-pain-points-in-2021/
  - 米国、イギリスとインドの開発者に、 Web 開発の難しいところについて 3 ヶ月ごとにアンケートをとった
  - 上位 5 つの変化はそこまでなかった
    - Keeping up with changes to the web platform/web standards
    - Keeping up with a large number of new and existing tools or frameworks
    - Making a design/experience work the same across browsers
    - Testing across browsers
    - Understanding and implementing security measures
- **2021 Web Almanac**
  - https://almanac.httparchive.org/ja/2021/
- **Open Props: sub-atomic styles**
  - https://open-props.style/
  - Adam Argyle によるユーティリティカスタムプロパティ集

### イベント

- 12 月
  - 14-15: TC39
    - https://github.com/tc39/agendas/blob/master/2021/12.md
- 1 月
- 2 月
  - 1-3: HTTPBis Interim
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0149.html

### Wrap Up

- chrome
  - 96
    - emulate version 100
    - bfcache default on desktop
  - 97
    - WebTransport
    - `scriptElement.support()`
    - `Array.findLast()`, `Array.findLastIndex()`
  - Prototype
    - capability delegation
    - input element `showPicker()`
    - blocking=rendering 属性
    - `NFC.makeReadonly()`
    - Set-Cookie の `Domain=""` を許容
  - Ship
    - Request Origin / Redirect Chain
    - Private Network Access for Preflight
    - Cascade Layer
    - Sec-CH-UA-Full-Version-List
  - CDS
    - animation smoothness metrics
    - resposiveness metrics
  - web.dev
    - UI fund
  - Search Central
    - Page Experience ranking to desktop rollout in Feb 2022
  - Other
    - Bento.js (Bento AMP)
    - BlinkOn 15
- Firefox
  - 94
    - `self.structuredClone()`
    - `scriptElement.supoorts()`
  - 95
    - site isolation rollout
    - `crypto.randomUUID()`
    - UA sniffing for slack.com
  - Ship
    - SameSite=Lax by default
- Safari
  - 15.0
    - `<meta name="theme-color">`
    - `aspect-ratio`
    - top-level await
    - Error.cause
    - Private Class methods/accessors
    - WebGL2
    - `autocomplete="one-time-code"`
  - TP 134
    - `text-decoration-skip-ink`
    - enable `<dialog>` by default
    - `inert` attribute behind flag
    - enable BroadCastChannel by default
    - enable Storage API + FileSystemAccess + AccessHandle by default
    - CSP script-src-elem, script-src-attr, etc.
  - TP 135
    - enable `accent-color` by default
    - CSS small/large/dynamic viewport units
    - enable image lazy-loading by default
  - TP 136
    - `contain: paint`
    - Scroll To Text Fragment parsing
    - manifest_version 3
  - Other
    - enable `:focus-visible` by default
- Edge
  - Developer Support Internet team internship
  - Recreate My Problem ボタンでバグレポート
- WHATWG/W3C
  - TPAC2021
    - Sate Of CSS 2021
    - Making WebViews Work for the Web
    - Cognitive Accessibility Task Force (COGA)
  - XS-Leaks summit
  - Aria Recommendation
  - WHATWG New Living Standards
    - WebIDL
    - Test Utils
    - WebSocket
    - File System
  - TAG Election
  - Interoperability Remedies Community Group
- TC39
  - Error Cause stage 4
  - tc39/proposal-function-helpers
  - tc39/proposal-destructuring-private
  - tc39/proposal-regexp-modifiers
- IETF
  - Publication request: draft-ietf-httpbis-targeted-cache-control-02
  - Publication request: draft-ietf-httpbis-priority-09
  - Working Group Last Call: Digest Fields
  - Bundle Preload と WebBundle のマージ
  - Secure Credential Transfer (iCloud のような鍵共有)
  - Avoiding Internet Centralization
- CDN
  - Cloudflare
    - Mirai による 2Tbps の DDoS
  - Fastly
    - log4j の脆弱性
- 周辺
  - CDS の Compat2021 で Safari TP が古かったことを Paul Kinlan が謝罪
  - Web Almanac 2021
  - Open Props (css variables での css framework)
