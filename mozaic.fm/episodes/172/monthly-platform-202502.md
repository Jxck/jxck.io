---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep172.mp3
published_at: 2025-03-02
guest: [@myakura](https://github.com/myakura)
guest: [@saku](https://x.com/sakupi01)
---

# ep172 Monthly Platform 202502

## Theme

第 172 回のテーマは 2025 年 2 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 133

#### Updates

- New in Chrome 133
  - https://developer.chrome.com/blog/new-in-chrome-133
  - CSS advanced `attr()` function
  - CSS scroll state container queries
  - CSS `text-box`, `text-box-trim`, and `text-box-edge`

#### Intents

- Ship: CSS Logical Overflow
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/69ggqfzBwaU
- **Ship: Fluent Scrollbars.**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vabF61VwINk
  - Windows、Linux でもフローティングスクロールバーになる
- Ship: NavigateEvent sourceElement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fQOhmzUOzzY
- Ship: CSS interactivity
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/O5ZmbyRh9LE
- Ship: Private Aggregation API: per-context contribution limits for Shared Storage callers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WNvRVhZqfwc
- Ship: Dispatching click events to captured pointer
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/o1fXBdt94iA
- Ship: Create service worker client and inherit service worker controller for srcdoc iframe
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5k1MAbyHvTg
- **Ship: Allow SameSite=None Cookies in First-Party Sandboxed Contexts**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TO4in4jqGdI
  - Sandboxed Iframe から `SameSite=None` を送る `allow-same-site-none-cookies` の追加
  - いきなり Ship にしているが、仕様も Draft だしレビューも不十分で指摘されている
- Ship: Service Worker client URL ignore history.pushState changes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cGgdoHZU85E
- **Ship: Float16Array**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0zw4GWcf-Ig
- Ship: Update ProgressEvent to use double type for 'loaded' and 'total'
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NKF_KvkO3kE
- Ship: Remove clamping of setTimeout(...) to >= 1ms
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EhQpPNb3HvA
- Ship: Custom data origin in sharedStorage.createWorklet
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WLcygs6Cla4
- Ship: Attribution Reporting Feature: Remove Aggregatable report limit when trigger context ID is non-null
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eb8mWlXz-s0
- **Ship: fetchLater API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Nd8Y3BVEoDs
- Ship: H26x Codec support updates for MediaRecorder
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YJ1QijNiHeM
- **Ship: `::scroll-marker` and `::scroll-marker-group` for Carousel, `::column` pseudo element for Carousel and `::scroll-button()` pseudo elements**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7EQ8-VzPZh0
  - CSS でカルーセル
- Ship: Add Remaining Predefined Color Spaces as Interpolation Spaces
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/16PaewGJ_5c
- Ship: CSP require-sri-for for scripts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5la4WIXfpnA
- Ship: CSS Sign-Related Functions: `abs()`, `sign()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NSW2sp4ItoU
- Ship: Fire error event instead of throwing for CSP blocked worker
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZUz_0RDjs8g
- Ship: H26x Codec support updates for MediaRecorder
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YJ1QijNiHeM
- Ship: Interpolation progress functional notations: CSS `*progress()` functions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HthEnSanvhI
- **Ship: Invoker Commands; the command and commandfor attributes**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ctNbl4gWLuk
- Ship: Link rel=payment to support push payments
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nQMGFxnRZU0
- **Ship: Observable API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/stxSgTgMHog
- **Ship: Partitioning `:visited` links history**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8dZqt8JuLdc
  - トリプルキーイング (link URL, top-level site, frame origin)
  - 同一トップレベルサイト・フレームからの移動でないと `:visited` が効かなくなる
- Ship: Partitioning cross-site top-level navigations in the HTTP cache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZpyP6jjCUJE
- Ship: Prevent fixed elements from moving during elastic overscroll.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ldUEhY-C3OE
- Ship: RegExp.escape
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9J0IIfquFZY
- Ship: highlightsFromPoint API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8OpfR1m_zjU
- **Ship: CSS Custom Functions (`@function`)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bvi4D7eD7wI
  - 早すぎないか、という声が出て M139 にずれた
- **Ship: CSS `if()` function**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EOz7NK6Y0cE
- Ship: Timestamps for RTC Encoded Frames
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4tpKaBbuojo
- Ship: Support rel / relList attributes for SVGAElement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IwPL1cB_CkY
- **Ship: Nested view transitions**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gVF8wCsqzIw
- Ship: Bounce Tracking Mitigations on HTTP Cache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZuI_IAX_g2E
- Prototype and Ship: `safe-area-max-inset-*` variables
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/17peoEUyt5k
- **Prototype: Smooth corners (corner-shape, superellipse, squircle)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UKLLVghiHYQ
  - スクワークルなど角の描画形状を変更するプロパティ
  - demo: https://noamr.github.io/squircle-testbed/
- Prototype: CSP require-sri-for
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CdLp5BM2FCQ
- Prototype: Scroll Triggered Animations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IHObRvyiag8
- Prototype: ScrollIntoView container option
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PlRR0FwOEWs
- Prototype: CSS `if()` function
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ySEBHgVlhBM
- Prototype: CSS anchor positioning remembered scroll offset
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3ok2XgVNh1M
- **Prototype: Scoped view transitions**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AGligmIYZfM
  - `view-transition` ツリーを任意の要素配下に構築できる
- Prototype: No-Vary-Search support for the HTTP disk cache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bbALj5JmF_0
- Prototype: Align error type thrown for 'payment' WebAuthn credential creation: SecurityError => NotAllowedError
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/X0c08UCiUGc
- Prototype: CSS Color 4 for Canvas Gradients
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6PhsIK2kxeM
- Prototype: Frame Ancestor Headers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gU27UPHBN3E
  - `Sec-Fetch-Frame-Top` と`Sec-Fetch-Frame-Ancestors` を付与
  - iframe の親子がどういう関係化がわかるようにする
- Prototype: CSS env variable for OS-level font scale
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OmEsGUUenqY
- Experiment: Select parser relaxation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/48G-FYiKEZY
- Experiment: Interest Invokers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LLgsMjTzmAY
- Experiment: Audio Output Device API:setPreferredSinkId
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RQnLvnIBVNs
- Experiment: Incorporating navigation initiator into the HTTP cache partition key
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YpxpzceGw68
- Experiment: Signature-based Integrity
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QSsuBmjlnfk
- Experiment: Summarizer API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/X-VxVeiJgtM
- Extend Experiment: Page-Embedded Permission Control
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nKz89M_CWIo
- Extend Experiment: Cookie Deprecation Label
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TCP6aAFnS4I
- Extend Experiment: JavaScript Promise Integration
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ke9rpIdSTwI
- Extend Experiment: Document-Isolation-Policy
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8-jcFmtrgpI
- Extend Deprecation Trial: Deprecate unload event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cIQexpV5M08
- Remove: `navigator.xr.supportsSession`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cEB-j1rJl60
- Remove: SwiftShader Fallback
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yhFguWS_3pM
- **Remove: Cross origin subframe JS Dialogs**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hTOXiBj3D6A
  - iframe 内の alert()などをブロックしたらサイトが壊れて revert した話
  - その後を聞かれ、Chrome は今のところまた進める気はないと返答
- Ready for Developer Testing: No-Vary-Search support for the HTTP disk cache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jwDT0HanKKM
- Ready For:
- Extend Experiment:
- Change:
- Unship:
- Remove:
- PSA:
- Save the date for BlinkOn 20!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OwhKs-ofakU
  - 2025/4/7-8
- New API owner: Dan Clark
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/E5_Woysw76w
- Web-Facing Change PSA: NotRestoredReasons name change
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/keA8QE_uFxo

#### Other

- web.dev
  - https://web.dev/
  - New to the web platform in January
    - https://web.dev/blog/web-platform-01-2025
  - WasmGC and Wasm tail call optimizations are now Baseline Newly available
    - https://web.dev/blog/wasmgc-wasm-tail-call-optimizations-baseline
  - January 2025 Baseline monthly digest
    - https://web.dev/blog/baseline-digest-jan-2025
  - Ruby on Rails on WebAssembly, the full-stack in-browser journey
    - https://web.dev/blog/ruby-on-rails-on-webassembly
  - CSS scrollbar-color and scrollbar-gutter are Baseline Newly available
    - https://web.dev/blog/baseline-scrollbar-props
  - The Popover API is now Baseline Newly available
    - https://web.dev/blog/popover-baseline
  - **Interop 2025: another year of web platform improvements**
    - https://web.dev/blog/interop-2025
    - Focus Areas for 2025
      - Anchor Positioning
      - Backdrop-filter
      - Core Web Vitals
      - `<details>` Element
      - Layout: Flexbox & Grid
      - Modules: JSON and Import Attributes
      - Navigation API
      - Pointer and Mouse Events
      - Remove Mutation Events
      - @scope
      - scrollend Event
      - Storage Access API
      - Text Decoration
      - URLPattern
      - View Transitions
      - WebAssembly
      - Web Compat
      - WebRTC
      - Writing Modes
    - Investigation Efforts Look Ahead
      - Accessibility Testing
      - Gaming Testing
      - Mobile Testing
      - Privacy Testing
      - WebVTT
- google for developers
  - https://developers.googleblog.com/
  - **Get ready for Google I/O May 20-21**
    - https://developers.googleblog.com/en/get-ready-for-google-io-2025/
- google developer japan blog
  - https://developers-jp.googleblog.com/
  - Google Ads API と Google 広告スクリプトの検索キーワード インサイト レポートのアップデートを 2025 年 3 月 3 日より開始
    - https://developers-jp.googleblog.com/2025/02/google-ads-api-scripts.html
- chrome developer blog
  - https://developer.chrome.com/blog/
  - Simplifying WebAuthn feature detection for passkeys
    - https://developer.chrome.com/blog/passkeys-client-capabilities
  - What's New in WebGPU (Chrome 133)
    - https://developer.chrome.com/blog/new-in-webgpu-133
  - What's happening in Chrome Extensions, January 2025
    - https://developer.chrome.com/blog/extension-news-january-2025
  - Enter picture-in-picture automatically when playing media
    - https://developer.chrome.com/blog/automatic-picture-in-picture-media-playback
  - **Popover = hint**
    - https://developer.chrome.com/blog/popover-hint
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
- search blog
  - https://developers.google.com/search/
  - Robots Refresher: introducing a new series
    - https://developers.google.com/search/blog/2025/02/intro-robots-refresher
- v8
  - **Turbocharging V8 with mutable heap numbers · V8**
    - https://v8.dev/blog/mutable-heap-number
- other
  - Secure by Design: Google's Blueprint for a High-Assurance Web Framework - Google Bug Hunters
    - https://bughunters.google.com/blog/6644316274294784/secure-by-design-google-s-blueprint-for-a-high-assurance-web-framework
  - **A Deep Dive into JS Trusted Types Violations - Google Bug Hunters**
    - https://bughunters.google.com/blog/5850786553528320/a-deep-dive-into-js-trusted-types-violations
  - **Gmail Security Alert: Google To Ditch SMS Codes For Billions Of Users**
    - https://www.forbes.com/sites/daveywinder/2025/02/26/google-confirms-gmail-to-ditch-sms-code-authentication/
    - Google が SMS を辞め、QR コードに移行していく

### Firefox 動向

#### Stable: 135.01

#### Updates

- **Firefox 135.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/135.0/releasenotes/
  - 日本語ページの英語への翻訳に対応(逆はまだ)
  - CT の強制、CRLite のロールアウト
  - DNT の設定が削除
- **Firefox 135 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/135
  - `JSON.parse()` with source

#### Intents

- **Ship: ARIA Element Reflection**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/mxRB48IrMbI
- Ship: Math.sumPrecise
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/4X6v_GhQYm0
- Ship: new SVG path API
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/n5UXNSj5fTE
- Ship: SVG discard element
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/w5oCkquDC9E
- Ship: onmessage content attribute on the body and frameset elements.
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/M6k6vwMfzKQ
- **Ship: CookieStore API**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/oW9WE9RTNi0
- Ship: Atomics.pause
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/w-Fn_1frOiM
- **Ship: Error.captureStackTrace**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/7P_CBjcRrqE
- Prototype: Lifting the restriction on non-constructed style sheets in adoptedStyleSheets
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/7GLuSeyyzYk
- Change:
- Remove:
- Unship: onreadystatechange/onvisibilitychange content attributes on HTML elements.
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/LJC3FnNbmfI
- Certificate Transparency is now enforced in Firefox on desktop platforms starting with version 135
  - [https://groups.google.com/a/mozilla.org/g/dev-platform/c](https://groups.google.com/a/mozilla.org/g/dev-platform/c/ueq_33tA_iQ)

#### Newsletter

- Performance Testing Newsletter (Q4 Edition) - Mozilla Performance
  - https://blog.mozilla.org/performance/2025/01/31/performance-testing-newsletter-q4-edition-2/
- Firefox WebDriver Newsletter 135 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-135/
- Engineering Effectiveness Newsletter - Dec 24/Jan 25 Edition
  - https://groups.google.com/a/mozilla.org/g/firefox-dev/c/nudKuSoO3fI
- Performance Testing Newsletter (Q4 Edition)
  - https://groups.google.com/a/mozilla.org/g/firefox-dev/c/HCPltJZh9dY
- WebDriver BiDi Becomes the Default for Cypress with Firefox - Firefox Developer Experience
  - https://fxdx.dev/webdriver-bidi-becomes-the-default-for-cypress-in-firefox/

#### MDN / Open Web Docs

#### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2025-02-01+
- Positive
  - **Customizable select element**
    - https://github.com/mozilla/standards-positions/issues/1060
  - MediaTrackSupportedConstraints.backgroundBlur
    - https://github.com/mozilla/standards-positions/issues/658
  - **Capability Delegation**
    - https://github.com/mozilla/standards-positions/issues/565
- Negative
  - Fenced frames
    - https://github.com/mozilla/standards-positions/issues/781
  - **Network Error Logging (NEL)**
    - https://github.com/mozilla/standards-positions/issues/99
    - blocker があるらしい
    - それが解決すればよさそう?
- Defer
  - Writing Assistance APIs
    - https://github.com/mozilla/standards-positions/issues/1067
  - Reduce Accept-Language
    - https://github.com/mozilla/standards-positions/issues/1014

#### Other

- **Certificate Transparency is now enforced in Firefox on desktop platforms starting with version 135**
  - https://www.mail-archive.com/dev-security-policy@mozilla.org/msg02009.html
  - Firefox 135 から CT が強制になった
- Spring detox with Firefox for iOS
  - https://blog.mozilla.org/en/products/firefox-ios-spring-detox/
  - iOS 版 Firefox のプライバシーやセキュリティ関連機能おさらい
- Updates on Mozilla's Leadership and Growth Planning
  - https://blog.mozilla.org/en/mozilla/mozilla-leadership-growth-planning-updates/
- **Mozilla's approach to Manifest V3: What's different and why it matters for extension users**
  - https://blog.mozilla.org/en/products/firefox/firefox-manifest-v3-adblockers/
  - Chrome で uBlock Origin が動かなくなったことを受けて Mozilla では Manifest V2 もサポートし続けるという話
- **Introducing a terms of use and updated privacy notice for Firefox**
  - https://blog.mozilla.org/en/products/firefox/firefox-news/firefox-terms-of-use/
  - 新たな利用規約を導入する発表。リリース後 20 年で初
  - 新しい利用規約は、新規ユーザーに対して来月以降に提示される見込み。既存の利用者に対しては、年内に段階的に適用されるとしている。
  - https://www.mozilla.org/en-US/about/legal/terms/firefox/
  - > When you upload or input information through Firefox, you hereby grant us a nonexclusive, royalty-free, worldwide license to use that information to help you navigate, experience, and interact with online content as you indicate with your use of Firefox.

### Safari 動向

#### Stable: 18.3

#### Updates

- WebKit Features in Safari 18.3 | WebKit
  - https://webkit.org/blog/16439/webkit-features-in-safari-18-3/
  - Genmoji in WKWebView
  - Bug Fixes and more
    - Accessibility
    - CSS
    - Editing
    - Media
    - Rendering
    - Scrolling
    - Security
    - SVG
    - Web API
    - Web Extensions
    - Web Inspector
    - WebAssembly
    - WKWebView
  - Updating to Safari 18.3
- Release Notes for Safari Technology Preview 213 | WebKit
  - https://webkit.org/blog/16461/release-notes-for-safari-technology-preview-213/
  - CSS
    - Implemented unicode-bidi text rendering UA rules (except for ruby elements).
    - **Added support for gradients with only one stop.**
  - Editing
  - Forms
  - HTML
    - **Removed the composite attribute on an `<img>` element.**
  - JavaScript
  - Media
    - Enabled MediaSource prefers DecompressionSession by default.
    - Enabled WebCodec's AudioEncoder and AudioDecoder by default.
  - Networking
    - **Changed 3DES cipher to show a warning to users that it is a legacy TLS cipher.**
  - PDF
  - Rendering
  - Storage
  - SVG
    - Added support for the ch length type for character width, but does not include support for upright vertical character width.
  - Tables
  - Text
  - Web Animations
  - Web API
    - Removed wheel event handling for `<input type="number">` to match platform conventions.
  - Web Extensions
  - Web Inspector
  - WebRTC
- Release Notes for Safari Technology Preview 214 | WebKit
  - https://webkit.org/blog/16512/release-notes-for-safari-technology-preview-214/
  - Browser
    - **Added support for SVG favicons.**
    - Added support for data: URL favicons
  - CSS
    - Added support for overflow-block and overflow-inline
  - JavaScript
    - **Added support for Regular Expression Pattern Modifiers**
  - Media
    - Added support for MediaSource prefers DecompressionSession by default
    - Added support for WebCodecs AudioDecoder by default
    - Added support for ALAC and PCM audio in MediaRecorder
  - Networking
    - **Blocked partitioned cookies for known tracking domains**
  - Rendering
  - Web API
  - Web Inspector

#### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2025-02-01+
- Support
  - **CSS logical overflow properties**
    - https://github.com/WebKit/standards-positions/issues/459
  - getContextAttributes for OffscreenCanvasRenderingContext2D
    - https://github.com/WebKit/standards-positions/issues/445
  - [HTML Canvas] lang IDL attribute for CanvasTextDrawingStyles
    - https://github.com/WebKit/standards-positions/issues/439
  - @page margin boxes
    - https://github.com/WebKit/standards-positions/issues/275
  - CSS Corner-shape
    - https://github.com/WebKit/standards-positions/issues/229
  - **CSS Anchor Positioning**
    - https://github.com/WebKit/standards-positions/issues/167

#### Other

- Announcing Interop 2025 | WebKit
  - https://webkit.org/blog/16458/announcing-interop-2025/
  - Focus Areas for 2025
    - Anchor Positioning
    - Backdrop-filter
    - Core Web Vitals
    - `<details>` Element
    - Layout: Flexbox & Grid
    - Modules: JSON and Import Attributes
    - Navigation API
    - Pointer and Mouse Events
    - Remove Mutation Events
    - @scope
    - scrollend Event
    - Storage Access API
    - Text Decoration
    - URLPattern
    - View Transitions
    - WebAssembly
    - Web Compat
    - WebRTC
    - Writing Modes
  - Investigation Efforts Look Ahead
    - Accessibility Testing
    - Gaming Testing
    - Mobile Testing
    - Privacy Testing
    - WebVTT

### Edge 動向

#### Stable: 133

#### Updates

- https://blogs.windows.com/msedgedev/
  - ここがメイン
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見れる
- https://twitter.com/MSEdgeDev
  - これを見るしか無い

#### Other

- **Request for feedback: Incoming call notifications API for web apps - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2025/02/04/request-for-feedback-incoming-call-notifications-api/
- **Control your installed web application title - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2025/02/05/control-your-installed-web-application-title/
  - `<meta name="application-title">`
- **Microsoft Edge and Interop 2025 - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2025/02/13/microsoft-edge-and-interop-2025/
  - > However, we want to acknowledge that we also hear frustration from developers that some long-lived interoperability concerns are still outstanding, and that the process for choosing focus areas in the Interop project is opaque. We are committed to providing better visibility into these ongoing interoperability gaps.
- More Edge features get a performance boost - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2025/02/18/more-edge-features-get-a-performance-boost/
- Introducing our new and improved Edge Add-ons website - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2025/02/20/introducing-our-new-and-improved-edge-add-ons-website/
- Empowering Microsoft Edge Add-ons developers with faster reviews - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2025/02/26/empowering-microsoft-edge-add-ons-developers-with-faster-reviews/

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft

#### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- 2025-02-06.md
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-02-06.md
  - [invokers] add an invoke method?
    - `invoke()` メソッド生やすと、将来的に CE でも使い勝手良さそうだと思うんだけど、どう?
    - invoker commands ではカスタム commands も作れて、それは JS サイドでイベント dispatch するタイプだから、それで対応できるので不要
  - [invokers] add a way to list supported commands?
    - Element に登録されている有効な command をとってこれると安全かつ便利だと思うんだけど、どう?
    - API とかのデザインも決めないといけないので V1 ではやらないけど、確かに便利なので後々やる
  - Press Button Proposal
    - https://open-ui.org/components/press-button.explainer/
    - button が押下された/されていないのバイナリ状態を表現したい
      - これまでだと、aria-label や button の textContent をスイッチする JS を使った手法や、input checkbox とか switch を使ったセマンティクス的に微妙なやり方しかなかった
    - button に type=press と pressed 属性を追加する
    - 押された状態の時のデフォルトのスタイルや擬似クラスの提供も検討されている
  - Consider "toggle" (expand/collapse) attribute
    - https://github.com/openui/open-ui/issues/700#issuecomment-2640877326
    - openable として提案される運びに
- 2025-02-20.md
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-02-20.md
  - [Interest invokers] Keyboard inputs - キーボード操作時の扱いをどうするのかという議論
  - 結論: Revamp the keyboard section with the results of recent discussion
  - https://github.com/openui/open-ui/pull/1170/files
- 2025-02-27.md
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-02-27.md
  - [Interest invokers] Keyboard inputs
    - https://github.com/openui/open-ui/issues/1133#issuecomment-2689101970
    - モーダルダイアログでは interactivity: inert;になる挙動(partial-interest)を呼び出すべきではない
    - サブツリー内の全ての要素が tabindex: -1;になるような新しい CSS が欲しい
    - [https://github.com/openui/open-ui/pull/1172](https://github.com/openui/open-ui/pull/1172/files)/
    - > the special tabindex=-1 behavior will be implemented with a new UA stylesheet rule: :target-has-partial-interest {keyboard-focusable:not-focusable}. See the keyboard-focusable section for more detail.
  - [popover]: event propagation for the escape key
    - https://github.com/openui/open-ui/issues/1147
    - esc で popover を閉じることができるが、現状、event propagation される
    - Close Watcher は内部的に使われているものの、まだ広くサポートされているわけではないので、別の方法が必要
    - popover 内での Esc に対してのみ伝播を止めるような仕様を定める必要がある
  - [Range] Range Input Styling API Proposal
    - https://github.com/openui/open-ui/issues/1165
    - Customizable Input Range Element…?!
  - [Range] Dual Handle Range Input Proposal
    - https://github.com/openui/open-ui/issues/1164
    - 最大値と最小値の value を入力可能にする input type=range の拡張提案
- openable
  - https://open-ui.org/components/openable.explainer/
- others
  - https://github.com/openui/open-ui/pull/1167
    - Graduated Proposal のセクションが爆誕

#### Open UI Design System

- 2025-02-25.md
  - https://github.com/openui/design-system/blob/main/telecon/2025-02-25.md
  - Badge RFC Overview
  - What's the target browser support?
  - MVP list of components

#### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
- Upcoming WHATNOT meeting on 2025-02-06
  - https://github.com/whatwg/html/issues/10972
- Upcoming WHATNOT meeting on 2025-02-13
  - https://github.com/whatwg/html/issues/11010
  - New topics
    - [Joey] Customizable `<select>` element
      - https://github.com/whatwg/html/issues/9799
      - Olli will ask Henri to look at the Mozilla standards position. Olli and Anne will review the User interaction PR. Consensus to move this to stage 3.
    - [Kurt] Support fragment references in the `<link>` tag's href attribute
      - https://github.com/whatwg/html/issues/11019
      - Consensus to mark this as stage 1.
      - **@sheet 関連。適用する親スタイルシートを href で指定できるようにする**
    - [Kurt] Add sheet attribute to the link tag's for CSS @sheet support
      - https://github.com/whatwg/html/issues/11022
      - Carry over.
- Upcoming WHATNOT meeting on 2025-02-20
  - https://github.com/whatwg/html/issues/11026
  - Carryovers from last time
    - [Kurt] [Add sheet attribute to the](https://github.com/whatwg/html/issues/11022) `<link>` [tag's for CSS @sheet support](https://github.com/whatwg/html/issues/11022)
  - New topics
    - [Luke] Add request-close command for dialogs
      - https://github.com/whatwg/html/pull/11045
    - [Luke] Commandfor buttons with missing or invalid type attributes currently work as command buttons
      - https://github.com/whatwg/html/issues/11044
      - command が実装されていないブラウザでは、form の button が submit にフォールバックして、意図せずフォームが submit される可能性がある
- Upcoming WHATNOT meeting on 2025-02-27
  - https://github.com/whatwg/html/issues/11055

#### Other

- 2025 Q1 Face-to-face · Issue #1083 · WICG/webcomponents
  - https://github.com/WICG/webcomponents/issues/1083#issuecomment-2628576643
  - Feb 7
    - https://github.com/WICG/webcomponents/issues/1083#issuecomment-2644052224
  - Feb 14
    - https://github.com/WICG/webcomponents/issues/1083#issuecomment-2660170704
  - meeting notes:
    - https://docs.google.com/document/d/1yfYARhuobQb3lKOGYLhD1D6NlVEYvel-RBzA-mjAPT4/edit?tab=t.0#heading=h.7g7qz45xdamc
- W3C Team appointment to the TAG ratified
  - https://www.w3.org/news/2025/w3c-team-appointment-to-the-tag-ratified/
- **CSS Snapshot 2024 Published as W3C Group Note | 2025 | News | W3C**
  - https://www.w3.org/news/2025/css-snapshot-2024-published-as-w3c-group-note/
  - CSS の仕様を実装者向けに全てまとめたもの
  - モジュール分けされて定義されているが、モジュールごとに安定具合が異なるため、現時点で安定しているものだけを集めたもの
  - 毎年作ってるものの 2024 年版
- **A new API for work during unload · Issue #10997 · whatwg/html**
  - https://github.com/whatwg/html/issues/10997
  - unload 時 に IDB への書き込みなど非同期の処理を行わせたい
  - Shared Worker だとオーバーワークなので新しい API が欲しい
- **W3C Breakouts Day 2025**
  - https://www.w3.org/2025/03/breakouts-day-2025/
  - 2025 年 3 月 26 日
    - Issues · w3c/breakouts-day-2025
    - https://github.com/w3c/breakouts-day-2025/issues

### TC39 動向

#### Meeting

- 2025-02
  - 来月

#### Proposals Diff

- 0->1
- 1->2
- 2->2.7
- 2.7->3
- 3->4

#### New Proposals

#### WinterTC

- https://github.com/wintercg/admin/issues?q=label%3A%22meeting%22%20
- 2025-02-06 meeting agenda
  - https://github.com/wintercg/admin/issues/93
  - Progress on the WinterTC formation process (including discussing the Github organization name)
- 2025-02-20 meeting agenda
  - https://github.com/wintercg/admin/issues/94
  - Review of last meeting's notes
  - Approval of this meeting's agenda

#### Other

### IETF 動向

#### WG

- RFC
  - **Protocol Action: An HTTP Status Code for Indicating Hints to Proposed Standard**
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/Q5L2Hj10Kvi7-TBvod2bRlj-cEY/
    - kazuho さんの書いた RFC8297 Early Hint
    - 実装も増えたので Experimental から Proposed Standard に格上げ
  - RFC 9729: The Concealed HTTP Authentication Scheme
    - https://www.rfc-editor.org/rfc/rfc9729.html
  - New Draft: Forward and Reverse HTTP/3 over WebTransport
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2025JanMar/0156.html
- Work
  - **Last Call: (Cookies: HTTP State Management Mechanism) to Proposed Standard from The IESG**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2025JanMar/0060.html
  - Client Hints Reliability Drafts from Victor Tan
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2025JanMar/0194.html
  - Publication has been requested for draft-ietf-httpbis-cache-groups-03
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2025JanMar/0127.html
  - Last Call: (Bootstrapping TLS Encrypted ClientHello with DNS Service Bindings) to Proposed Standard
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/lFwYIqu0wJvw4rnlQyAdFYRxU2Q/
  - **Last Call: (TLS Encrypted Client Hello) to Proposed Standard**
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/jhwF8fX5mSflUghVOZ1sMsKqSb8/
  - **Last Call: (HTTP Cache Groups) to Proposed Standard**
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/F9E9J7SDOyfi9gZPNy3mSb3TsOk/
  - **Last Call: (TLS 1.2 is in Feature Freeze) to Proposed Standard**
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/XklQvfrXYrnP97_g7yAL_j_pphs/
  - **Document Action: 'Shared Brotli Compressed Data Format' to Informational RFC (draft-vandevenne-shared-brotli-format-14.txt)**
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/uNzsPBVqxNNMH-DX6uf8090lk3M/
  - **[httpapi] Liaison with OpenAPI Initiative**
    - https://mailarchive.ietf.org/arch/msg/httpapi/hpWpp1QMPqch9jMh5VbtMOmZFoU/
- Meeting

#### Other

### 周辺動向

#### ベンダー動向

- Igalia WebKit Team | WebKit Igalia Periodical #11
  - https://blogs.igalia.com/webkit/blog/2025/wip-11/
- Igalia WebKit Team | WebKit Igalia Periodical #12
  - https://blogs.igalia.com/webkit/blog/2025/wip-12/
- Igalia WebKit Team | WebKit Igalia Periodical #13
  - https://blogs.igalia.com/webkit/blog/2025/wip-13/
- Igalia WebKit Team | WebKit Igalia Periodical #14
  - https://blogs.igalia.com/webkit/blog/2025/wip-14/
- ​​The developer of SerenityOS is challenging the browser duopoly
  - https://thenextweb.com/news/serenityos-creator-building-ladybird-browser
- **Ladybird browser update (January 2025) - YouTube**
  - https://www.youtube.com/watch?v=-l8epGysffQ
  - test262 のパスレートが 97.4%で全エンジントップ
- Interop 2025 | Igalia
  - https://www.igalia.com/2025/02/13/Interop-2025.html
- Igalia 2025 Coding Experience Open for Applications | Igalia
  - https://www.igalia.com/2025/02/21/Igalia-2025-Coding-Experience-Open-for-Applications.html
- Maintaining Chromium downstream: keeping it small
  - https://blogs.igalia.com/dape/2025/02/04/maintaining-chromium-downstream-keeping-it-small/
- **Solving Cross-root ARIA Issues in Shadow DOM**
  - https://blogs.igalia.com/mrego/solving-cross-root-aria-issues-in-shadow-dom/
  - Reference Target など Shadow root の範囲を超えて要素を参照する仕組みの紹介
  - NLnet Foundation からの資金援助を受けて Igalia が実装していく
  - https://www.publickey1.jp/blog/24/rustservowebverso.html
- Unmasking Hidden Floating-Point Errors in Chromium's Ozone/Wayland. - Maksim's blog
  - https://blogs.igalia.com/msisov/unmasking-hidden-floating-points-errors-in-ozone-wayland/
- Announcing the Web Engines Hackfest 2025
  - https://blogs.igalia.com/mrego/announcing-the-web-engines-hackfest-2025/
- Canvas Localization Support
  - https://blogs.igalia.com/schenney/canvas-localization-support/
- **Polypane is hiring Igalia to work on Chromium | Polypane**
  - https://polypane.app/blog/polypane-is-hiring-igalia-to-work-on-chromium/
  - 開発者向けブラウザーの Polypane が Igalia のエンジニアを雇用し Chromium のバグ修正をやっていく
  - デバイスのエミュレーション周りをまずやるらしい

#### セキュリティ動向

- **1934361 - ICP-Brasil: Mis-issued certificate**
  - https://bugzilla.mozilla.org/show_bug.cgi?id=1934361
  - google.com の TLS 証明書が ICP-Brasil によって発行されていた
  - CAA を無視した不正発行で CT によって見つかった
  - Mozilla の Root にはないが MS のルートにはあるっぽい
- **We Issued Our First Six Day Cert - Let's Encrypt**
  - https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/
  - 最初の 6 日間証明書を発行した
  - 一般公開は 2025 Q2
- **1950144 - DigiCert: Threat of legal action to stifle Bugzilla discourse**
  - https://bugzilla.mozilla.org/show_bug.cgi?id=1950144
  - 2024 年に DigiCert が起こした問題について、そのプロセスが不透明だったことを Bugzilla で追求した人が訴訟を起こされた
    - 1910322 - DigiCert: Random value in CNAME without underscore prefix
    - https://bugzilla.mozilla.org/show_bug.cgi?id=1910322

#### Cookie 動向

#### Other

- 令和 7 年度「情報通信分野における国際標準化動向調査(標準化人材基盤強化)」調査者募集のお知らせ | お知らせ | NTT データ経営研究所
  - https://www.nttdata-strategy.com/newsrelease/news/250120/
  - 総務省の事業で標準化団体(IETF, W3C etc)の調査をする若手を募集(20,30 代)
  - 今年開催されるものについて渡航/参加費用の補助が出る
  - 締切は 2/19
- Opera introduces a new web browser: Opera Air - Blog | Opera News
  - https://blogs.opera.com/news/2025/02/opera-air-browser/
  - 呼吸法やマインドフルネスなどの機能を搭載
- **Perplexity、独自 Web ブラウザ「Comet」発表 「エージェント検索用ブラウザ」 - ITmedia NEWS**
  - https://www.itmedia.co.jp/news/articles/2502/25/news098.html
- **Apple's Best Option: Decentralize iCloud**
  - https://www.mnot.net/blog/2025/02/09/decentralize-icloud
  - Apple が英国政府から iCloud のクラウドバックアップの暗号化機能にバックドアをつけろと秘密裏に言われ、Apple がその機能を英国で無効にした

### イベント

- 1 月
- 2 月
- 3 月
  - 15-21: IETF 122 Bangkok
    - https://www.ietf.org/meeting/122/
- 4 月
  - 7-8: BlinkOn 20
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/OwhKs-ofakU
- 5 月
  - 20-21: Google I/O

### Wrap Up

- Chrome
  - 133
  - Ship
    - fluent scrollbars
    - Allow SameSite=None Cookies in First-Party Sandboxed Contexts
    - float16array
    - fetchLater()
    - CSS カルーセル系擬似要素
    - Invoker Commands
    - Observable API
    - :visited partiniting
    - CSS @function
    - CSS if()
    - Nested View Transitions
  - Prototype
    - corner-shape
    - Scoped View Transitions
  - Chrome Developers
    - popover=hint
  - other
    - Interop 2025
    - Google I/O
    - SMS やめて QR に
- Firefox
  - 135
    - CT
    - JSON parse with source
  - Ship
    - ARIA Element Reflection
    - Cookie Store API
    - Error.captureStackTrace
  - Standard Position
    - positive
      - customizable select
    - negative
      - Network Error Logging
    - defer
      - Writing Assistance APIs
      - Reduce Accept-Language
  - other
    - Firefox 135 から CT 強制
    - Manifest V3
    - New terms of use と privacy notice
- Safari
  - 18.3
    - バグフィクス
  - TP 213
    - gradients with one color stop
    - 3DES warning
  - TP 214
    - SVG favicon/data: URL favicon
    - RegExp pattern modifiers
    - blocked partitioned cookies for known tracking domains
  - Standard Position
    - positive
      - corner-shape
      - anchor positioning
- Edge
  - Incoming Call notifications
  - application-title metatag
  - Interop 2025 の透明性のなさなどにお気持ち
- W3C/WHATWG
  - Draft
  - Open UI
    - invokers method
    - commands list
    - Press Button
    - openable
    - keyboard inputs behaviour for interest invokers
    - Range Input Styling API
    - Range Input Dual Attribute
  - WHATNOT meeting
    - @sheet
    - sheet(s) attribute for link
    - request-close
  - Other
    - CSS Snapshot 2024
    - fetchLater の task 版のドラフト
    - W3C Breakouts Day 2025
- TC39
  - WinterTC
- IETF
  - Early Hints が Proposed Standard に格上げ
  - Cookiebis Last Call
  - Client Hello Last Call
  - Cache Group Last Call
  - TLS1.2 Feature Freeze Last Call
  - Shared Brotli to Informational
  - HTTPAPI と OpenAPI のリエゾン
- 周辺動向
  - ベンダー動向
    - Ladybird が test262 を 97.4% パス
    - Cross-root ARIA in ShadowDOM
  - セキュリティ動向
    - ICP-Brasil による Google の証明書不正発行
    - Let's Encrypt の 6 日証明書発行開始
    - Digiert の問題について訴訟
  - Cookie 動向
  - Other - Perplexity 製のブラウザ Comet - Apple が UK から iCloud のバックドアを秘密裏に求められてた
