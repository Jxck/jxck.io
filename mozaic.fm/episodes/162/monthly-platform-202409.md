---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep162.mp3
published_at: 2024-09-30
guest: [@myakura](https://twitter.com/myakura)
---

# ep162 Monthly Platform 202409

## Theme

第 162 回のテーマは 2024 年 9 月の Monthly Platform です。


## Show Note

### Chrome 動向

#### Stable: 129


#### Updates

- **New in Chrome 129**
  - https://developer.chrome.com/blog/new-in-chrome-129
  - Break up long tasks with `scheduler.yield()`
  - Animations with intrinsic sizes
  - Changes to CSS anchor positioning
- **What's new in DevTools, Chrome 129**
  - https://developer.chrome.com/blog/new-in-devtools-129
  - Recorder supports export to Puppeteer for Firefox
  - Performance panel improvements
    - Live metrics observations
    - Search requests in the Network track
    - See stack traces of performance.mark and performance.measure calls
  - Use test address data in the Autofill panel
  - Elements panel improvements
    - Force more states for specific elements
    - Elements > Styles now autocompletes more grid properties
  - Lighthouse 12.2.0
  - Miscellaneous highlights
- What's New in WebGPU (Chrome 129)
  - https://developer.chrome.com/blog/new-in-webgpu-129
- **Chrome 130 beta**
  - https://developer.chrome.com/blog/chrome-130-beta
  - CSS
    - CSS Container Queries flat tree lookup
    - CSS Nesting: The nested declarations rule
    - Full and unprefixed box-decoration-break support
    - Allow more pseudo-elements and pseudo-classes after `::part()`
  - Web APIs
    - Attribution Reporting API feature (Attribution Scopes)
    - Attribution Reporting API feature (debug key privacy improvement)
    - **Compression dictionary transport with shared Brotli and shared Zstandard**
    - Concurrent smooth scrollIntoView()
    - Document picture-in-picture: add option to ignore window bounds cache
    - Improved error reporting in IndexedDB for large value read failures
    - Keyboard focusable scroll containers
    - Protected Audience Bidding and Auction Services
    - Support non-special scheme URLs
    - WebAssembly JavaScript String Builtins
    - WebGPU: Dual source blending
    - **Web Serial: connected attribute and RFCOMM connection events**
  - Origin trials in progress
    - **Language Detector API**
    - WebAuthn attestationFormats
  - Deprecations and removals
    - Remove expectedImprovement in DelegatedInkTrailPresenter
    - Deprecate non-standard GPUAdapter requestAdapterInfo() method


#### Intents

- Ship: @property support `<string>` syntax
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZJIHKcr62Q4
- Ship: Attribution Reporting Feature: Attribution Scopes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-K2xDYuvmmA
- Ship: Attribution Reporting Feature: Debug Key Privacy Improvement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3shaVsvEfjc
- **Ship: CSS `font-variant-emoji`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/i5AeH4ZE2RY
- Ship: Capture all screens
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HtBrZ9r_ZHU
- Ship: Dynamic safe area insets
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hXkimpjYaMg
- Ship: File System Access on Android and WebView
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/x3IcFv2jY6c
- Ship: Full and unprefixed box-decoration-break support
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Eok0ycu_Pic
- Ship: WebAssembly JS String Builtins
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zww0CT9PRVw
- Ship: WebXr hand input module - Level 1
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oHOA9-0Tyro
- Ship: RTCRtpEncodingParameters.scaleResolutionDownTo
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vTA2unU6mDk
- Ship: noopener-allow-popups COOP value
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5wae0r2uCag
- Ship: `@page` margin boxes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XKb6IQZXNks
- Ship: SVG foreignObject does not taint the canvas for blob URLs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JpA2vmA9XT8
- **Ship: Support currentcolor in Relative Color Syntax**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uiom-biaSWY
- **Ship: WebAuthn signal API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NslvHJ9sbMo
- Ship: WebHID on Dedicated Workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0fsOSvHrxf4
- Ship: Private Aggregation API: increase contribution limit to 100 for Protected Audience callers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Dpg9N9rcFKM
- Ship: WebGPU: Clip Distances
  - [https://groups.google.com/a/chromium.org/g/blink-dev/c/\_eetFP94I8c](https://groups.google.com/a/chromium.org/g/blink-dev/c/_eetFP94I8c)
- **Prototype and Ship: Private State Token API Permissions Policy Default Allowlist Wildcard**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5jI8kLLdIFw
- **Prototype: `Document-Policy: expect-no-linked-resources`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/a44aH4Xt2lw
- **Prototype: Popover invoker and anchor positioning improvements**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Z5wK8e1f1g4
  - Invoker relationship が implicit な anchor 作るとこまでが入る
  - つまり anchor 指定しなくても invoker は anchor になる
  - popover 以外の anchor の話はまだ
  - https://github.com/whatwg/html/pull/9144
  - https://www.w3.org/2024/06/27-css-minutes.html#t02
- Prototype: Canvas Formatted Text
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CURnzae5yOE
- **Prototype: highlightsFromPoint API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/L52hSlKI_ak
- Prototype: WebHID on Dedicated Workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/y__BOYfZWzI
- **Prototype: CSS 'stretch' sizing keyword**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fxGpXGV0hYc
- **Prototype: JPEG XL decoding support (image/jxl) in blink**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WjCKcBw219k
  - iPhone でのサポートや Firefox の position が代わりそうという報を受けて現状どうなってる?という質問が上がった
- Experiment: "is-cross-site" bit in the HTTP Cache Partitioning Key
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cG65eYPYf9w
- Experiment: Incorporating navigation initiator into the HTTP cache partition key
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YpxpzceGw68
- Extend Experiment 2: Capture all screens
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IFDO5YOjXaU
- Extend Experiment: FedCM Bundle 6: Continuation API, Parameters API, Fields API, Multiple configURLs, Custom account labels
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fymcArf7c_M
- Extend Experiment: fetchLater API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0l3r3v3xJpg
- Extend Experiment: Page-Embedded Permission Control
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ol3ufc7vyNs
- **Deprecate and Remove: Remove non-standard GPUAdapter `requestAdapterInfo()` method**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HxOgGf4NzQ4
- PSA: Add Permission modals for Keyboard and Pointer Lock
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VVXBah4qOpA
- PSA: migration to Wptrunner has started
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JOu9l2hu1U8
- **PSA: Exposing "duplex" on Request**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HPhATidOhuw
- Web-Facing Change PSA: Improved error reporting in IndexedDB for large value read failures
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JmDqNNWGm20
- Ready for Developer Testing: Deprecate getters of Intl Locale Info
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JE2ZUxqmsvM


#### Other

- web.dev
  - Accessing hardware devices on the web
    - https://web.dev/articles/devices-introduction
  - Allow passkey reuse across your sites with Related Origin Requests
    - https://web.dev/articles/webauthn-related-origin-requests
  - **Chrome ends support for First Input Delay**
    - https://web.dev/blog/fid
  - New to the web platform in August
    - https://web.dev/blog/web-platform-08-2024
  - Passkeys hackathon in Tokyo: Passkeys on IoT devices and more
    - https://web.dev/blog/passkeys-hackathon-tokyo
  - Tell us how you use CSS with the State of CSS survey
    - https://web.dev/blog/state-of-css-2024
  - Build responsible web experiences with generative AI
    - https://web.dev/blog/generative-ai-best-practices
  - **Submit your proposals for Interop 2025**
    - https://web.dev/blog/interop2025-proposals
    - interop/2025/selection-process.md at main · web-platform-tests/interop · GitHub
      - https://github.com/web-platform-tests/interop/blob/main/2025/selection-process.md
  - Mitigate cross-site scripting (XSS) with a strict Content Security Policy (CSP)
    - https://web.dev/articles/strict-csp
  - Storage for the web
    - https://web.dev/articles/storage-for-the-web
- google for developers
  - Updates to the Google Photos APIs: Picker API launch and Library API changes - Google Developers Blog
    - https://developers.googleblog.com/en/google-photos-picker-api-launch-and-library-api-updates/
- google developer japan blog
  - Google Developers Japan: ポスト量子暗号: 標準と進展
    - https://developers-jp.googleblog.com/2024/09/post-quantum-cryptography-standards.html
- chrome developer blog
  - **What's missing from HTML and CSS?**
    - https://developer.chrome.com/blog/missing-from-css
    - The top ten requests
      - Support for styling inputs
      - Visually hidden
      - position: sticky inside overflow:hidden
      - Animate to height: auto
      - Additional input types
      - Real random numbers in CSS
      - Mixin style classes
      - Global styles in shadow DOM
      - Dividing mixed units
      - nth-letter
    - 賛成かどうかのフォーム
      - https://forms.gle/PnLGzcB2va1am8qu5
  - Introducing hints, Related Origin Requests and JSON serialization for WebAuthn in Chrome
    - https://developer.chrome.com/blog/passkeys-updates-chrome-129
  - **Anchor positioning syntax changes**
    - https://developer.chrome.com/blog/anchor-syntax-changes
    - `inset-area` は `position-area` に改名
    - `position-try-options` は `position-try-fallback` に改名
    - `position-try-fallbacks: inset-area(top)` は `position-try-fallbacks: top`
  - Introducing the Digital Credentials API origin trial
    - https://developer.chrome.com/blog/digital-credentials-api-origin-trial
  - The Keyboard Lock and the Pointer Lock APIs require permission from Chrome 130
    - https://developer.chrome.com/blog/keyboard-lock-pointer-lock-permission
  - **Request for developer feedback: customizable select**
    - https://developer.chrome.com/blog/rfc-customizable-select
    - Try it out and give us your feedback
    - Opting-in to the new `<select>`
    - Breaking down the parts
    - Enhance the existing `<select>` element
      - Basic styling
      - Complex content within options
      - Style the selected option
      - Interactive options
    - Limitations and accessibility notes
  - Bluetooth RFCOMM updates in Web Serial
    - https://developer.chrome.com/blog/bluetooth-rfcomm-updates-web-serial
  - Chrome Experiment: Process sharing
    - https://developer.chrome.com/blog/process-sharing-experiment
  - Freeze screen & inspect disappearing elements
    - https://developer.chrome.com/blog/devtools-tips-35
  - Monitor your local and real-user Core Web Vitals performance in DevTools
    - https://developer.chrome.com/blog/devtools-realtime-cwv
  - **Feedback needed: How should we define CSS masonry?**
    - https://developer.chrome.com/blog/masonry-syntax
  - Writer and rewriter APIs available for early preview
    - https://developer.chrome.com/blog/sept2024-writer-ai
  - Sign up for the Language Detection API origin trial
    - https://developer.chrome.com/blog/language-detection-origin-trial
    - 読み込む AI Model の選択などのための言語の検出
  - The Web Vitals extension, now in DevTools
    - https://developer.chrome.com/blog/web-vitals-extension
    - WebVitals の拡張の全機能が DevTools に入った
  - Caching Demystified: Inspect, Clear, and Disable Caches
    - https://developer.chrome.com/blog/devtools-tips-36
  - **Chrome to sync passkeys on Google Password Manager between desktop and Android**
    - https://developer.chrome.com/blog/passkeys-gpm-desktop
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
  - Google Online Security Blog: Deploying Rust in Existing Firmware Codebases
    - https://security.googleblog.com/2024/09/deploying-rust-in-existing-firmware.html
  - **Google Online Security Blog: A new path for Kyber on the web**
    - https://security.googleblog.com/2024/09/a-new-path-for-kyber-on-web.html
- search blog
  - https://developers.google.com/search/
  - **Supporting AVIF in Google Search**
    - https://developers.google.com/search/blog/2024/08/happy-avifriday
- v8
  - https://v8.dev/
- other
  - **Rick Byers: "The Chromium commit tracker ca…" - Toot Café**
    - https://toot.cafe/@RickByers/113147935000806939
    - Chromium へのコントリビューターの推移


### Firefox 動向

#### Stable: 130.0


#### Updates

- **Firefox 130.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/130.0/releasenotes/
  - 選択範囲の翻訳
  - Firefox Labs で実験機能の UI を提供
- **Firefox 130 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/130
  - `<details name>`
  - WebCodecs
- Fantastic Firefox Fixes - These Weeks in Firefox: Issue 167
  - https://blog.nightly.mozilla.org/2024/09/13/fantastic-firefox-fixes-these-weeks-in-firefox-issue-167/
- From ESR to Address Bar - These Weeks in Firefox: Issue 168
  - https://blog.nightly.mozilla.org/2024/09/24/from-esr-to-address-bar-these-weeks-in-firefox-issue-168/
- **Take control of your browsing with Firefox's privacy and security features**
  - https://blog.mozilla.org/en/products/firefox/firefox-privacy-security-features/
  - Total Cookie Protection
  - Fingerprinting protection
  - DNS over HTTPS
  - HTTPS-Only mode
  - Phishing and malware protection
  - Alerts for breached websites
  - Firefox Multi-Account Containers
  - Firefox Relay
    - Get Firefox
  - Related Articles
  - Creating a public counterpoint for AI
  - Firefox hacks for everyone: From cozy gamers to minimalists and beyond
  - Browsers, cookies and surfing the web: The quirky history of internet lingo
    - Keep up with all things Firefox


#### Intents

- **Ship: Regular Expression Modifiers**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Is8vjI5deb8
- **Ship: CHIPS(Cookies Having Independent Partitioned State)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/dJsnN2uxweY
- **Ship: HTMLVideoElement's requestVideoFrameCallback**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/lp_5RctznkM
- Ship: WebRender accelerated SVG filter graphs
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/-M0HVkCWjx0
- Ship: MediaStreamTrack::getCapabilities
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/zFDmKqw8A2U
- **Ship: fetch priority**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ORD5HBRVpPQ
- **Prototype: Blocking third-party cookies**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/9ILA7dMn_XA/m/14IfWWvADwAJ
  - Spec として TAG の Finding が引用されている
    - https://www.w3.org/2001/tag/doc/web-without-3p-cookies/
  - 2019 から Anti Tracking Policy に基づいて Known Tracker をブロックしてきたのが ETP
  - 2022 から 3PC Partition したのが TCP
  - しかしベンダ間でやってることは微妙に違った
  - 全部ブロック + CHIPS がブラウザが目指す方向
  - その互換性を高めるため、 CHIPS を出した
  - これを踏まえ、いよいよ全部ブロックする
- **Prototype: CookieStore API**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/OkoMESRn_uc
  - > We plan to land a prototype that diverges from the official spec by the following points:
  - > 1. Only cookie names and values are shared via `CookieStore.get()`/`getAll()` methods. In this way, we do not expose more than what `document.cookie` already offers.
  - > 2. We don't implement the `CookieStoreManager` and the `ServiceWorkerGlobalScope.oncookiechange` event handler, with its `ExtendableCookieChangeEvent` event because we don't want to spawn ServiceWorkers at any cookie change
  - > 3. Following up on the previous point, `CookieStore.onchange` event handler is also exposed to ServiceWorkers.
- Prototype: Redeclarable global eval-introduced vars proposal
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/6dCNVKYLlDE
- **Prototype: autocorrect HTML attribute**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/2r2ZMAC8ESE
- **Prototype: Promise.try**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ebt3yMBnUFA
- **Prototype and ship: CSS nested declarations rule**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Z8j4yr2lQ0o
- Prototype and ship: CSS text-emphasis-position:auto
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/SfrpUsp1_n8
- **Prototype and ship: interactive-widget**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/eHOyzgByhUk
- **Unship: HTTP/2 Push**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/vU9hJg343U8
  - Firefox で HTTP/2 Push を利用しているサーバーが表示されないという報告がでた
  - ヘッダーに大文字が入っていたのが原因
  - 互換性の問題も出てきたこと、Chrome も削除したので Firefox でも削除する
- Unship: -moz-user-modify
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/7xFL1M-0eK0
- Changes to planned ESR 115 end-of-life
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ffRCWVVHvAQ
- Anti-Fingerprinting Telemetry
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/K5ycPJ6ngrw


#### Newsletter

- Firefox WebDriver Newsletter 130 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-130/
- Firefox DevTools Newsletter 130 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-130/


#### MDN / Open Web Docs

- Locale-sensitive text segmentation in JavaScript with Intl.Segmenter
  - https://developer.mozilla.org/en-US/blog/javascript-intl-segmenter-i18n/
- Efficient data handling with the Streams API
  - https://developer.mozilla.org/en-US/blog/efficient-data-handling-with-the-streams-api/
- Get back to school! Supercharge your learning with MDN and Scrimba
  - https://developer.mozilla.org/en-US/blog/mdn-scrimba-back2school/


#### Standard Position

- 今月 Close された Issue と PR ものをみる
  - https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2024-09-01+
- Positive
  - DOM State-preserving move (`Node.prototype.moveBefore`)
  - FileSystemObserver
  - MediaStreamTrackProcessor and VideoTrackGenerator
  - **No-Vary-Search**
  - **Style Container Queries (for custom properties)**
  - Transferable RTCDataChannel
  - WebRTC Codec selection API
  - css-ui `field-sizing` property
  - **fetchLater() API**
- Negative
  - FYI Private State Token API Permissions Policy Default Allowlist Wildcard
  - **Isolated Web Apps**
- Other
  - Firefox will consider a Rust implementation of JPEG-XL by bholley · Pull Request #1064 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/pull/1064
    - JPEG XL の実装を再検討する
    - Google の JPEG XL のチームが Rust によるデコーダーの実装を提案したため


#### Other

- **1.3 Million Subtests**
  - https://bkardell.com/blog/1_3M-WPTMilestone.html
  - Servo が WPT 73% を突破
  - 他と異なり Gecko / KHTML 由来ではないエンジンとして急成長中


### Safari 動向

#### Stable: 18.0


#### Updates

- **Release Notes for Safari Technology Preview 203 | WebKit**
  - https://webkit.org/blog/15860/release-notes-for-safari-technology-preview-203/
  - CSS
    - **Added support for scrollbar-gutter.**
    - **Added support for cursor in ::marker.**
    - **Added support for ruby-overhang.**
  - JS
    - Added support for Iterator.prototype.constructor and Iterator.prototype[@@toStringTag].
    - **Added support for Iterator.from from Iterator Helpers Proposal.**
    - Remove obsoleted Temporal.Instant API.
  - Media
    - Added support for allowing websites to override the system-default accessibility caption styling.
  - WebApps
    - Parse dir member of Web Application Manifest.
  - WebAssembly
    - Added support for return_call_ref.
  - Web Inspector
    - Added support for sourcemaps to be blackboxed.
    - Added support for showing boundThis for arrow functions in the console.
- **WebKit Features in Safari 18.0 | WebKit**
  - https://webkit.org/blog/15865/webkit-features-in-safari-18-0/
  - New in Safari 18
    - **Distraction Control**
      - 邪魔なバナーやポップアップを非表示にする
    - Viewer
      - 動画をフルスクリーンで見れたり
    - iPhone Mirroring and remote inspection
      - Mac から iPhone を使ってデバッグが簡単に
  - **Web apps for Mac**
    - Opening links
      - インストールされたアプリが優先で開く
    - Extension support
      - アプリでも拡張が使える
  - CSS
    - View Transitions
    - Style Queries
    - currentcolor and system color keywords in Relative Color Syntax
    - Translucent accent colors
      - アクセントカラーでアルファの指定
    - Animating display
    - Backdrop Filter
    - Content visibility
    - And more
      - prefers-contrast
  - Spatial Web
    - WebXR
    - Spatial photos and panoramas
    - Shaping interaction regions on visionOS
    - Video on visionOS
  - HTML
    - Writing Suggestions
    - Switch
      - `<input switch>` で触覚フィードバック
    - Date and time inputs
    - ARIA
      - aria-braillelabel
      - aria-brailleroledescription
  - JavaScript
    - RegExp の v flag
    - PopStateEvent's hasUAVisualTransition
    - subresource integrity in imported module
    - Request, Response, Blob, PushMessageDate に `byets()`
    - `​​document.fragmentDirective`
  - Web API
    - URL.parse
  - Canvas
  - Managed Media Source
    - MMS, MSE の worker サポート
  - WebRTC
  - HTTPS
    - Auto Upgrade Mixed Contents (lv2)
  - WebGL
  - Web Inspector
  - Passkeys
  - Safari Extensions
  - Apple Pay
  - Deprecations
    - Canvas
    - CSS
    - Images
      - deprecate JPEG2000
      - UA 見て返してる CDN は注意
    - JavaScript
    - Media
    - Storage
      - AppCache 削除
    - SVG
    - Web API
    - WebView
  - Bug Fixes and more
    - Accessibility
    - Animations
    - Apple Pay
    - Authentication
    - Canvas
    - CSS
    - Editing
    - Forms
    - History
    - HTML
    - JavaScript
    - Loading
    - Media
    - Networking
    - PDF
    - Rendering
    - Scrolling
    - Security
    - SVG
    - Text
    - Web Animations
    - Web API
    - Web Apps
    - Web Assembly
    - Web Extensions
    - Web Inspector
    - Web Views
    - WebDriver
    - WebRTC
- Get Ready for Interop 2025: Your Chance to Shape the Web | WebKit
  - https://webkit.org/blog/15942/get-ready-for-interop-2025-your-chance-to-shape-the-web/


#### Standard Positions

- 今月 Close されたものをみる
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2024-09-01+
- Support
  - CSS background-clip
    - https://github.com/WebKit/standards-positions/issues/379
  - CSS Shape function
    - https://github.com/WebKit/standards-positions/issues/377


#### Other

- **iPhone 16 Pro Supports JPEG-XL Format - MacRumors**
  - https://www.macrumors.com/2024/09/09/iphone-16-pro-supports-jpeg-xl-format/
  - iPhone 16 Pro シリーズでは ProRaw フォーマットで JPEG XL が使えるようになった


### Edge 動向

#### Stable: 129


#### Updates

- https://blogs.windows.com/msedgedev/
  - ここがメイン
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見れる
- https://twitter.com/MSEdgeDev
  - これを見るしか無い
- **Looking forward to an Interop 2025 that addresses your top needs - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2024/09/17/interop-2025-call-for-proposals/
- Taking control of your browser performance when using extensions with Microsoft Edge - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2024/09/19/extension-performance-detector/
- Tame your workday with Microsoft Edge for Business - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2024/09/25/tame-your-workday-with-microsoft-edge-for-business/


#### Other

- **Welcome to Fall, I guess? - text/plain**
  - https://textslashplain.com/2024/09/16/welcome-to-fall-i-guess/
  - > Two months without a blog post? Sheesh. A lot has happened in two months, although perhaps nothing especially interesting.


### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - CSS Grid Layout Module Level 3
    - https://www.w3.org/news/2024/first-public-working-draft-css-grid-layout-module-level-3/
  - CSS Values and Units Module
    - https://www.w3.org/news/2024/first-public-working-draft-css-values-and-units-module-level-5/


#### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- open-ui/meetings/telecon/2024-09-05.md at main · openui/open-ui
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-09-05.md
  - [interest invokers] Touch inputs #1052
  - [select] removing pseudo element for fallback button #1086
- open-ui/meetings/telecon/2024-09-12.md at main · openui/open-ui
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-09-12.md
  - [interest invokers] Touch inputs #1052
  - Extend popovertarget to support custom elements #1088
  - [select] keyboard behavior #1087
- [CSSWG]OpenUI-WHATWG/HTML-CSSWG Meeting 2024-09-19
  - https://lists.w3.org/Archives/Public/www-style/2024Sep/0019.html
  - RESOLVED: Add the principles and examples of use to css-forms-1
  - RESOLVED: Add fantasai and ntim as editors of css-forms-1
  - RESOLVED: Do not add a pseudo-element for the user-agent fallback
  - RESOLVED: Font properties won't be set in the UA style sheet (Issue
  - There was interest in expanding the PR for WHATWG issue #10317
- Meeting 7 for joint OpenUI-WHATWG/HTML-CSSWG task force on styleable form controls
  - https://github.com/whatwg/html/issues/10582
  - Stylable form control


#### WHATNOT meeting

- https://github.com/whatwg/html/issues?q=is%3Aissue+is%3Aopen+WHATNOT+meeting
- Upcoming WHATNOT meeting on 2024-09-05 · Issue #10589 · whatwg/html
  - https://github.com/whatwg/html/issues/10589
  - Stylable Select
  - `<selectedoption>`
- Upcoming WHATNOT meeting on 2024-09-12 · Issue #10601 · whatwg/html
  - https://github.com/whatwg/html/issues/10601
  - Dynamic import maps
  - Stylable Select
  - `<selectedoption>`
- Upcoming WHATNOT meeting on 2024-09-19 · Issue #10622 · whatwg/html
  - https://github.com/whatwg/html/issues/10622
- TPAC 2024 meeting · Issue #326 · whatwg/meta
  - https://github.com/whatwg/meta/issues/326
  - 来月 minutes を見る


#### Other

- Consortium Members elect Board of Directors
  - https://www.w3.org/news/2024/consortium-members-elect-board-of-directors/
- W3C announces Sylvia Cadena as inaugural Chief Development Officer
  - https://www.w3.org/news/2024/w3c-announces-sylvia-cadena-as-inaugural-chief-development-officer/
- **Fonts, Privacy, and Not Breaking the Web**
  - https://lists.w3.org/Archives/Public/www-style/2024Sep/0023.html
  - ローカルフォントを読まないと表示できない言語などについてのレポート


### TC39 動向

#### Meeting

- Meeting Note が公開された時だけやる、それ以外はやらない。


#### Proposals Diff

- 0->1
- 1->2
- 2->2.7
- 2.7->3
- 3->4


#### New Proposals


#### WinterCG

- https://github.com/wintercg/admin/issues?q=is%3Aissue+label%3Ameeting
- 2024-09-19 meeting · Issue #72 · wintercg/admin
  - https://github.com/wintercg/admin/issues/72
- 2024-09-05 meeting · Issue #67 · wintercg/admin
  - https://github.com/wintercg/admin/issues/67


#### Other

- **JavaScript™**
  - https://javascript.tm/
  - Oracle は JS の商標を持っている
  - しかし JS は一般用語になった
  - ちゃんと放棄してくれないと面倒だからパブリックにしろ
  - という署名
- Summary of the July-August 2024 TC39 plenary
  - https://blogs.igalia.com/compilers/2024/09/11/summary-of-the-july-august-2024-tc39-plenary/


### IETF 動向

#### WG

- RFC 9659 on Window Sizing for Zstandard Content Encoding
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JulSep/0314.html
- Work
- Protocol Action: 'Compression Dictionary Transport' to Proposed Standard
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JulSep/0226.html
- Meeting


#### Other


### CDN 動向

#### Cloudflare

- **NIST's first post-quantum standards**
  - https://blog.cloudflare.com/nists-first-post-quantum-standards
- **Introducing Speed Brain: helping web pages load 45% faster**
  - https://blog.cloudflare.com/introducing-speed-brain/
  - Speculation Rules


#### Fastly

- **A Look at Global CDN Performance in China | Fastly**
  - https://www.fastly.com/blog/a-look-at-global-cdn-performance-in-china


#### Other


### セキュリティ動向

- **gaining access to anyones browser without them even visiting a website - eva's site**
  - https://kibty.town/blog/arc/
  - Arc の脆弱性
  - CVE-2024-45489 Response - Arc
  - https://arc.net/blog/CVE-2024-45489-incident-response


### 周辺動向

- **What RSS Needs**
  - https://www.mnot.net/blog/2024/08/25/feeds
- **Home | International World Wide Web Conference 2024 ( WWW2024 | The Web Conf 2024 )**
  - https://www2024.thewebconf.org/
  - **QUIC is not quick enough over fast internet | Hacker News**
    - https://news.ycombinator.com/item?id=41484991
  - QUIC is not Quick Enough over Fast Internet
    - https://arxiv.org/pdf/2310.09423
- [Video] Nix explained from the ground up - surma.dev
  - https://surma.dev/things/nix-explained/
- **The State of ES5 on the Web - Philip Walton**
  - https://philipwalton.com/articles/the-state-of-es5-on-the-web/
  - もう ES5 へのトランスパイルなんかする必要ないよ
- Generated Web Apps
  - https://paul.kinlan.me/generated-web-apps/
- Masonry and good defaults - Rachel Andrew
  - https://rachelandrew.co.uk/archives/2024/09/21/masonry-and-good-defaults/
- Interop 2025 Opens for Proposals | Igalia
  - https://www.igalia.com/2024/09/17/Interop-2025-Opens-for-Proposals.html
- Maintaining Chromium downstream: update strategies - José Dapena blog
  - https://blogs.igalia.com/dape/2024/09/13/maintaining-chromium-downstream-update-strategies/
- **My recent contributions to Gecko (3/3) · Frédéric Wang**
  - https://frederic-wang.fr//2024/09/05/my-recent-contributions-to-gecko-fetch-priority/
  - Gecko に Fetch Priority を実装した
- Graphics improvements in WebKitGTK and WPEWebKit 2.46 | Carlos Garcia Campos
  - https://blogs.igalia.com/carlosgc/2024/09/27/graphics-improvements-in-webkitgtk-and-wpewebkit-2-46/
- **Igalia: 2024 Mid-season Power Rankings**
  - https://bkardell.com/blog/2024-Midseason.html
  - Igalia がどのくらい貢献したか
- Announcing BCD Watch - Eric's Archived Thoughts
  - https://meyerweb.com/eric/thoughts/2024/09/23/announcing-bcd-watch/
- **Rauchg が Ladybird に 5 万ドルを寄付**
  - https://x.com/ladybirdbrowser/status/1839620997680431336
- **\[作って学ぶ\] ブラウザのしくみ──HTTP、HTML、CSS、JavaScript の裏側
  - https://www.amazon.co.jp/dp/4297145464
  - https://x.com/d0iasm/status/1840376364832289040


### Cookie 動向


### イベント

- 9 月
  - 7: Web Developer Conference 2024 - connpass
    - https://web-study.connpass.com/event/321711/
    - https://fortee.jp/web-dev-conf-2024/proposal/all
  - 23-27: TPAC 2024 Anaheim
    - https://www.w3.org/2024/09/TPAC/
- 10 月
  - 8-10: BlinkOn19
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/XZPgZ3DymqY
  - ?: CMA の Q3 レポート
    - https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes
- 11 月
  - 02-08: IETF 121 Dublin
    - https://www.ietf.org/meeting/121/


### Wrap Up

- Chrome
- 129
  - scheduler.yield()
  - animations with intrinsic sizes
- 130 beta
  - CSS Nesting: Nested Declarations rule
  - Compression dict with shared Brotli/Zstandard
- Ship
  - font-variant-emoji
  - currentcolor in RCS
- Prototype
  - Document-Policy: expect-no-linked-resources
  - Popover invoker and anchor positioning
  - highlightsFromPoint
  - CSS `stretch`
- web.dev
  - Chrome ends support for FID
  - Interop 2025
- Chrome Developers
  - What's missing from HTML and CSS
  - Customizable select
  - CSS masonry
- Google Security Blog
  - new path for Kyber
- other blogs
  - AVIF in Google Search
- other
  - Chromium contributors chart
- Firefox
  - 130
    - `<details name>`
    - WebCodecs
  - Ship
    - Regex modifiers
    - CHIPS
    - requestVideoFrameCallback
    - Fetch Priority
  - Prototype
    - blocking third-party cookies
    - CookieStore API
    - autocorrect
    - Promise.try
    - CSS Nested Declarations Rule
    - interactive-widget
  - other intents
    - unship HTTP/2 Push
  - Standard Position
    - positive
      - No-Vary-Search
      - Style Queries
      - fetchLater()
    - negative
      - ISA
  - other
    - Servo passing 1.3M wpt tests
- Safari
  - TP 203
    - scrollbar-gutter
    - ruby-overhang
    - Iterator helpers
  - 18.0
    - New in Safari 18
      - Distraction Control
    - Web apps
    - CSS
      - View Transitions
      - Style Queries
      - currentcolor in RCS
      - Animating display
      - content-visibility
    - Spatial Web
      - WebXR
    - HTML
      - writingsuggestion
    - JavaScript
      - bytes()
      - document.fragmentDirective
    - API
      - URL.parse()
  - Standard Position
    - Positive
      - CSS background-clip
      - Shape function
  - Other
    - iPhone 16 で JPEG-XL サポート
- Edge
  - Interop 2025
- W3C/WHATWG
  - TPAC
    - 来月
  - Draft
    - CSS Grid Layout Module Level 3
    - CSS Values and Units Module
  - Open/UI
    - Invoker touch events
  - WHATNOT meeting
    - Stylable Select 周り
  - Other
    - Fonts, Privacy, and Not Breaking the Web
- TC39
  - Oracle が持つ JavaScript の商標の話
  -
- WinterCG
- IETF
  - RFC 9659 on Window Sizing for Zstandard Content Encoding
- CDN 動向
  - Cloudflare が Speculation Rules を入れた話
- セキュリティ動向
  - Arc の脆弱性
- 周辺動向
  - Mnot による RSS の話
  - 特定環境で QUIC は遅いという論文
  - The State of ES5 on the Web
  - Igalia が Gecko に fetchpriority を入れた
  - Igalia: 2024 Mid-season Power Rankings
  - Rauchg が Ladybird に 5 万ドルを寄付
  - [作って学ぶ] ブラウザのしくみ
- Cookie 動向