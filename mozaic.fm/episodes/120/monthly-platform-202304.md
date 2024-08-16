---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep120.mp3
published_at: 2023-05-15
guest: [@myakura](https://twitter.com/myakura)
---

# ep120 Monthly Platform 202304

## Theme

第 120 回のテーマは 2023 年 04 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 113

#### Updates

- Google I/O 2023
  - https://io.google/2023/program/intl/ja/?q=web
  - Developer keynote
    - https://io.google/2023/program/9fe491dd-cadc-4e03-b084-f75e695993ea/
  - What's new in web
    - https://io.google/2023/program/cafbe05a-c19e-4fe5-9e25-61c5c0c2f6cf/
  - What's new in web UI
    - https://io.google/2023/program/0ac6834a-9ed1-4145-ad6e-2b23c02239b8/
  - **How to optimize web responsiveness with Interaction to Next Paint**
    - https://io.google/2023/program/b5c811e9-c025-44f1-8ead-d515370aaca6/
  - How to create personalized web experiences
    - https://io.google/2023/program/6efef725-444a-4f8c-a877-9b40202c01e8/
  - **Partnering for a stable web**
    - https://io.google/2023/program/528a223c-a3d6-46c5-84e4-88af2cf62670/
  - Google I/O 2023 recap: Updates across mobile, web, AI, and cloud - Google for Developers Blog
    - https://developers.googleblog.com/2023/05/io23-developer-keynote-recap.html
  - 10 updates at Google I/O - Chrome Developers
    - https://developer.chrome.com/en/blog/chrome-at-io23/
  - What's new in CSS and UI: I/O 2023 Edition - Chrome Developers
    - https://developer.chrome.com/en/blog/whats-new-css-ui-2023/
- **New in Chrome 112 - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-chrome-112/
  - CSS support for nesting.
  - Algorithm update for `<dialog>` initial focus.
  - Skipping service worker no-op fetch handlers.
- **Chrome 113 beta - Chrome Developers**
  - https://developer.chrome.com/en/blog/chrome-113-beta/
  - CSS
    - CSS overflow media features
    - CSS update media feature
    - The `linear()` easing function
    - The `image-set()` type
  - Web APIs
    - Fetch: `Headers.getSetCookie()`
    - WebAuthn: Large blob storage extension (largeBlob)
    - WebGPU
  - Private State Token API
  - Origin trials in progress
    - Deprecation trial for WebRTC Callback-based legacy `getStats()`
    - WebGPU WebCodecs integration
  - Deprecations and removals
    - Secure Payment Confirmation: Rename rp to rpId in CollectedClientAdditionalPaymentData
    - Deprecate the document.domain setter
- **New in Chrome 113**
  - https://developer.chrome.com/en/blog/new-in-chrome-113/
  - WebGPU is here.
  - Devtools response headers override.
  - First-Party Sets is rolling out.
- What's New in DevTools (Chrome 113) - Chrome Developers
  - https://developer.chrome.com/en/blog/new-in-devtools-113/
  - Override network response headers
  - Nuxt, Vite, and Rollup debugging improvements
  - CSS improvements in Elements > Styles
    - Invalid CSS properties and values
    - Links to key frames in the animation shorthand property
  - New Console setting: Autocomplete on Enter
  - Command Menu emphasizes authored files
  - JavaScript Profiler deprecation: Stage two
- **Chrome 114 beta**
  - https://developer.chrome.com/en/blog/chrome-114-beta/
  - CSS
    - CSS headline balancing
    - Alias overflow: overlay to overflow: auto
  - Web APIs
    - Back/forward cache NotRestoredReason API
    - Cookies Having Independent Partitioned State (CHIPS)
    - The scrollend event
    - The Popover API
    - Web Bluetooth exclusionFilters option in `requestDevice()`
    - WebAssembly extended constant proposal
  - Origin trials in progress
    - Cross App and Web Attribution measurement
    - The Background Blur API
- **What's New in DevTools (Chrome 114) - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-devtools-114/
  - WebAssembly debugging support
    - Improved stepping behavior in Wasm apps
  - Debug Autofill using the Elements panel and Issues tab
  - Assertions in Recorder
  - Lighthouse 10.1.1
  - Performance enhancements
    - `performance.mark()` shows timing on hover in Performance > Timings
    - `profile()` command populates Performance > Main
    - Warning for slow user interactions
  - JavaScript Profiler deprecation: Phase three

#### Intents

- Ship: ArrayBuffer.prototype.transfer
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fs9vzaY1poA
- Ship: JSON.parse source text access
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/K_gwfyX8yg8
- Ship: Scrollend Event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RQA5rYmXiH8
- Ship : Content-type in Resource Timing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JzYRpqkpQV8
- **Ship: 'display' property with multiple values**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4FpvFisJS5Y
- Ship: CSS overlay property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YIgIas5_Q8s
  - もと `top-layer` プロパティ
- Ship: Deprecate module size limit for `WebAssembly.Module()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nJw2zwaiJ2s
- Ship: Keyboard-focusable scroll containers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jzMA5vUqNDs
- Ship: Local Network Access allowing same-origin fetches to potentially trustworthy origins
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hMfzJiqb6d0
- Ship: overflow:overlay aliases overflow:auto
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sxa8e66wQQQ
- **Ship: Partitioning Storage, Service Workers, and Communication APIs**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/24hK6DKJnqY
- Ship: Resource Timing: Expose interim response times
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/S50ufLBErSs
- **Ship: Scroll-driven animations**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RDKAi9JPHwY
- Ship: VisibilityStateEntry
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LA8HTx6tCKY
- Ship: WebAuthn PRF extension
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iTNOgLwD2bI
- Ship: MediaRecorder keyframe configurability
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2ydi1kTIlp0
- Ship: timestamp field on RTCEncodedVideoFrameMetadata
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mCiN7Ad7NU4/
- **Ship: Boolean Context Style Container Queries**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/O4TGz-41xsQ/
- Ship: timestamp field on RTCEncodedVideoFrameMetadata
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mCiN7Ad7NU4
- **Ship: Add value argument to URLSearchParams's `has()` and `delete()`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rDaQdKpWAx8
- Ship: CSS Motion Path
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BemiGubA8AM
- Implement and Ship: Web Bluetooth exclusionFilters option in `requestDevice()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MukeIcVHBas
- **Implement and Ship: Use RegExp v flag instead of u for HTML pattern attribute**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gIyvMw0n2qw
- Implement and Ship: isSecurePaymentConfirmationAvailable API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1pYa8CTib2s
- Implement and Ship: Remove Secure Payment Confirmation user activation requirement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Lz9CFz9YSe0
- Implement and Ship: Update of "xml" prefix handling in `lookupNamespaceURI()` and `createNSResolver()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TiFhaeEXvTk
- Prototype & Ship: Report Critical-CH caused restart in NavigationTiming
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/f28WWMD8HVE
- Prototype: CSS font-size-adjust: two-value syntax
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2FufB-ckycw
- **Prototype: Document Subtitle (Fix PWA app titles)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YbQQdVB19ws
- Prototype: Multi-surface capture with auto-accept (for managed sessions only)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GRLtWsZZZp8
- Prototype: overflow:overlay aliases overflow:auto
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YEWynF2WZBM
- Prototype: 'display' property with two values
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GYdHdU6MoaU
- **Prototype: Accordion pattern using `<details>` elements**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Q1OX6ZA_aaE
- Prototype: BYOB support for Fetch
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Iyt6Ca9PiJQ
- **Prototype: Deprecate TLS SHA-1 server signatures**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rfPtQpqNixk
- **Prototype: Detect UA Transitions on same-document Navigations**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UJMYZXoSQ4A
- **Prototype: Disabling UA transitions on same-document navigations**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0QkItdNLhk8
- Prototype: WGSLLanguageFeatures for WebGPU
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jun5Tix_MiE
- Prototype: Scroll Start
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3zNf7e_yG9g
- Prototype: Add value argument to URLSearchParams's `has()` and `delete()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/U1ClDwit3IM
- **Prototype: Web environment integrity API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ux5h_kGO22g
- Experiment: Background Blur API.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Jr9vE8mSS-8
- **Experiment: Compute Pressure**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QfJ4pngu3gc
- Experiment: Cross App and Web Attribution Measurement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gTvI5x-qex8
- **Experiment: Explicit Compile Hints with Magic Comments**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BmN1Wus8V1s
- **Experiment: Storage Buckets API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LGfcc48qBHY
- **Experiment: "is-cross-site" bit in the HTTP Cache Partitioning Key**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cG65eYPYf9w/
- Extend Experiment: Privacy Sandbox Ads APIs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CBrV-2DrYFI
- Extend Origin Trial (3): Trial for SharedArrayBuffers in non-isolated pages on Desktop platforms
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Sxt3uajsYZM
- Extend Origin Trial: Pending Beacon API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZCVcUEYzVHs
- Change:
- Unship:
- Remove: Support for Web Push Notifications using FCM Sender IDs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-cs6-ARhwnA
- **Remove: zoom CSS property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/V7q43bgutbo
- **Deprecate and Remove Web SQL**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fWYb6evVA-w
  - Target timeline
  - M101 - 123 - Enterprise Policy
  - M115 - Add deprecation message
  - M118-123 - Deprecation trial
  - M119 - Ship removal
- **Deprecate: Deprecate unload event**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dvusqw9-IhI
- **PSA: Risky changes should be guarded by a Runtime Enabled Feature**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jhJLN9drXy4
- PSA: FedCM will start enforcing MIME type checks for JSON responses
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sj0gJb5agfs
- PSA: Make window.screen report the display size when in fullscreen
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6iQ8yNF5npo
- PSA: Support for teeing readable byte streams
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/30KiA9bqvPU
- PSA: Web MIDI Permissions Prompt Change
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nz320H9J6bs
- PSA: WebUSB in Extension Service Workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PxmIa46W0e8
- PSA: Adding WebDriver commands for interacting with FedCM dialogs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rsBIIyLnLeA
- Ready for Trial: Align clipboard async API read/write HTML format with DataTransfer API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BTeksXLobZY
- Ready for Trial: Controlled Frame API (available only to IWAs)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/y7BHD8SL4YA
- Ready for Trial: Open popups as fullscreen windows
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EnDQsWx8cGQ
- Ready for Trial: `scheduler.yield()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3_H90tUG09w
- Question about scroll restoring and missing docs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JglnFZDWqzc
- Questions related to flat tree and layout tree
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NshP0Pt3xzI
- Questions related to Layout and Fragment Tree
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sakXEjQPONA
- allow clipboard-write (clipboard-read) does not work in certain scenario
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fCPkpsCVp34
- Allow Navigator.registerProtocolHandler to register "payto"
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ra856pXE_1c
- Fwd: Intent to Ship: Remove WebGPU limit maxFragmentCombinedOutputResources
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MECDKWsfchA
- **FYI: HSTS preload enforcing continued requirements**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gJZkQN4g17o

#### V8

#### Other

- web.dev
  - **JavaScript import maps are now supported cross-browser**
    - https://web.dev/import-maps-in-all-modern-browsers/
  - Push notifications are now supported cross-browser
    - https://web.dev/push-notifications-in-all-modern-browsers/
  - What are source maps?
    - https://web.dev/source-maps/
  - New functionality for developers-brought to you by WebAssembly
    - https://web.dev/wasm-libraries/
  - How Slow Roads intrigues gamers and developers alike, spotlighting the surprising capabilities of 3D in the browser
    - https://web.dev/slow-roads/
  - Build in-browser WordPress experiences with WordPress Playground and WebAssembly
    - https://web.dev/wordpress-playground/
  - Using the Web Vitals extension to debug Core Web Vitals issues
    - https://web.dev/debug-cwvs-with-web-vitals-extension/
  - New to the web platform in March
    - https://web.dev/web-platform-03-2023/
  - New to the web platform in April
    - https://web.dev/web-platform-04-2023/
  - **Script evaluation and long tasks**
    - https://web.dev/script-evaluation-and-long-tasks/
  - **Client-side rendering of HTML and interactivity**
    - https://web.dev/client-side-rendering-of-html-and-interactivity/
  - **How large DOM sizes affect interactivity, and what you can do about it**
    - https://web.dev/dom-size-and-interactivity/
  - Optimize input delay
    - https://web.dev/optimize-input-delay/
  - Diagnose slow interactions in the lab
    - https://web.dev/diagnose-slow-interactions-in-the-lab/
  - Find slow interactions in the field
    - https://web.dev/find-slow-interactions-in-the-field/
  - How redBus improved their website's Interaction to Next Paint (INP) and increased sales by 7%
    - https://web.dev/redbus-inp/
  - Economic Times quest for fixing INP
    - https://web.dev/economic-times-inp/
  - **Baseline features you can use today**
    - https://web.dev/baseline-features/
  - Advancing Interaction to Next Paint
    - https://web.dev/inp-cwv/
  - **Introducing Baseline**
    - https://web.dev/introducing-baseline/
- google developer blog
  - Google Developers Blog: Get ready for Google I/O
    - https://developers.googleblog.com/2023/04/get-ready-for-google-io.html
- google developer japan blog
  - Google Developers Japan: Chrome 112: CSS のネスト、 animation-composition 、 FormData コンストラクタの submitter パラメータ
    - https://developers-jp.googleblog.com/2023/04/chrome-112.html
  - Google Developers Japan: Chrome 113 ベータ版 : 新しい CSS メディア特性、 `linear()` イージング関数、 WebGPU
    - https://developers-jp.googleblog.com/2023/04/chrome-113-beta.html
  - Google Developers Japan: WebAssembly が新しいウェブ機能を加速する仕組み
    - https://developers-jp.googleblog.com/2023/05/webassembly.html
  - Google Developers Japan: MacBook の 1 度の充電で Chrome ができることを増やす
    - https://developers-jp.googleblog.com/2023/05/do-more-with-chrome-on-single-charge.html
- chrome developer blog
  - DevTools Tips: What are source maps?
    - https://developer.chrome.com/en/blog/devtools-tips-23/
  - Richer UI install available for desktop - Chrome Developers
    - https://developer.chrome.com/en/blog/richer-install-ui-desktop/
  - A look back in time: the evolution of test automation - Chrome Developers
    - https://developer.chrome.com/en/blog/test-automation-evolution/
  - The Chromium Chronicle #33: Views AnimationBuilder - Chrome Developers
    - https://developer.chrome.com/en/blog/chromium-chronicle-33/
  - **Faster Chrome releases - Chrome Developers**
    - https://developer.chrome.com/en/blog/faster-chrome-releases/
  - CSS text-wrap: balance - Chrome Developers
    - https://developer.chrome.com/en/blog/css-text-wrap-balance/
  - Chrome ships WebGPU - Chrome Developers
    - https://developer.chrome.com/en/blog/webgpu-release/
  - **Solving the CSS layout and source order disconnect - Chrome Developers**
    - https://developer.chrome.com/en/blog/reading-order/
  - Developer enrollment for the Privacy Sandbox - Chrome Developers
    - https://developer.chrome.com/en/blog/announce-enrollment-privacy-sandbox/
  - How the new Breakpoints sidebar helps you debug faster - Chrome Developers
    - https://developer.chrome.com/en/blog/breakpoint-ux-redesign/
  - What's New in WebGPU (Chrome 113) - Chrome Developers
    - https://developer.chrome.com/en/blog/new-in-webgpu-113/
  - **CSS update Media Query - Chrome Developers**
    - https://developer.chrome.com/en/blog/css-update-media-query/
  - DevTools Tips: Source maps in DevTools - Chrome Developers
    - https://developer.chrome.com/en/blog/devtools-tips-24/
  - Blur camera background - Chrome Developers
    - https://developer.chrome.com/en/blog/background-blur/
  - Improved video calling with faster AV1 encoding
    - https://developer.chrome.com/en/blog/av1/
  - What's new for web on Android 2023 - Chrome Developers
    - https://developer.chrome.com/en/blog/whats-new-in-web-on-android-io2023/
  - WebDriver BiDi: 2023 status update - Chrome Developers
    - https://developer.chrome.com/en/blog/webdriver-bidi-2023/
  - WebGPU: Unlocking modern GPU access in the browser - Chrome Developers
    - https://developer.chrome.com/en/blog/webgpu-io2023/
  - Find form issues with Chrome DevTools - Chrome Developers
    - https://developer.chrome.com/en/blog/devtools-autofill/
  - Shared autofill across iframes: an initial proposal - Chrome Developers
    - https://developer.chrome.com/en/blog/shared-autofill/
- chromium blog
  - Chromium Blog: How WebAssembly is accelerating new web functionality
    - https://blog.chromium.org/2023/04/how-webassembly-is-accelerating-new-web.html
  - Chromium Blog: More ways we're making Chrome faster
    - https://blog.chromium.org/2023/04/more-ways-were-making-chrome-faster.html
  - **Chromium Blog: An Update on the Lock Icon**
    - https://blog.chromium.org/2023/05/an-update-on-lock-icon.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- v8
  - WebAssembly tail calls · V8
    - https://v8.dev/blog/wasm-tail-call
- Project Zero: Release of a Technical Report into Intel Trust Domain Extensions
  - https://googleprojectzero.blogspot.com/2023/04/technical-report-into-intel-tdx.html
- Google 検索における 2022 年のスパム対策 | Google 検索セントラル ブログ | Google Developers
  - https://developers.google.com/search/blog/2023/04/webspam-report-2022?hl=ja
- **Introducing INP to Core Web Vitals | Google Search Central Blog | Google Developers**
  - https://developers.google.com/search/blog/2023/05/introducing-inp
  - CWV の FID を INP が置き換えるタイムライン
  - 2023/5 から Feedback を集め 2024/3 に置き換え
- How x-default can help you | Google Search Central Blog | Google Developers
  - https://developers.google.com/search/blog/2023/05/x-default
- **See all 8 new top-level domains available this May**
  - https://blog.google/products/registry/8-new-top-level-domains-for-dads-grads-tech/
  - Google Registry が新たな TLD の取り扱いを開始
  - .dad, .phd, .prof, .esq, .foo, .zip, .mov, .nexus
- **Jake Archibald が Google を離れる**
  - https://twitter.com/jaffathecake/status/1656239197898801152

### Firefox 動向

#### Stable: 113

#### Updates

- **Firefox 112.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/112.0/releasenotes/
  - パスワードフィールドの右クリックメニューにパスワードを表示するオプションが追加
- **Firefox 112 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/112
  - `inert`
  - CSS `pow()`, `sqrt()`, `hypot()`, `log()`, `exp()`
  - CSS `linear()`
  - Canvas2D `roundRect()`
- **Firefox 113.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/113.0/releasenotes/
  - Picture-in-Picture の UI 強化
  - 自動生成されるパスワードに記号が追加
  - アクセシビリティエンジンのパフォーマンス改善
  - アニメーション AVIF サポート
  - DevTools で script override のサポート
- **Firefox 113 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/113
  - CSS `color()`, `lab()`, `lch()`, `oklab()`, `oklch()`
  - CSS `color-mix()`
  - CSS `forced-color-adjust`
  - `:nth-child(An+B of S)`
  - CSS `scripting` media feature
  - Compression Streams
- Dropping the Banner Hammer and More - These Weeks in Firefox: Issue 134 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2023/04/14/dropping-the-banner-hammer-and-more-these-weeks-in-firefox-issue-134/
- Jam-packed with Updates - These Weeks in Firefox: Issue 135 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2023/04/14/jam-packed-with-updates-these-weeks-in-firefox-issue-135/
- Harder, Better, Faster, Stronger, Prettier - These Weeks in Firefox: Issue 136 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2023/04/25/harder-better-faster-stronger-prettier-these-weeks-in-firefox-issue-136/
- Short but Sweet - These Weeks in Firefox: Issue 137 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2023/05/05/short-but-sweet-these-weeks-in-firefox-issue-137/

#### Intents

- Ship: `color-mix()`
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/edh4kzqMyKw
- Ship: Scripting media feature
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/BU3zzial8lE
- Ship: extended `:lang()` attribute matching (CSS Selectors 4)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ynb0ZQFk0l4
- Ship: CSS NaN/infinity
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/bQZYfe67KDk
- **Ship: supports conditions for CSS imports**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ee9M0DJrNDQ
- Ship: submitting element directionality via the dirname attribute
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/F6T4y2kQbvk
- **Ship: Module Workers**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/J5zqdaNSpAM
- **Ship: rel=modulepreload**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/0AyoUeje7Zo
- Ship: TimerThread efficiency improvements
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/7BkCk2lcgH0
- Ship: jitterBufferTarget
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/dL198EFkgdE
- Ship: Compatible join and split node direction in HTML editor in all channels
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/yWzfhsC1PAw
- Ship in Early Beta or Earlier: persist Sqlite auxiliary files
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ZQOTTk05EXs/m/ZTJinAK4BAAJ
- Prototype: SVG discard element
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/U4nufgUTdAk
- **Prototype: Well-Formed Unicode Strings**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/lJercpdK6VY
- **Prototype: Array.fromAsync**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Bqvh95ybeSE
- **Prototype: DNS over OHTTP**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/_eozLyFZKXY
- Prototype: inverted-colors media feature
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/knC9tMRu_cw
- Prototype: supports conditions for CSS imports
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/sWJkRYO58dc
- Prototype: start transitions on discrete animation types
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/jVSRE6JommI
- **Prototype: Font Visibility Restrictions in PBM**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/tKOOrYXDoHA
- Change:
- Remove:

#### Other

- **Welcome to the MDN blog | MDN Blog**
  - https://developer.mozilla.org/en-US/blog/welcome-to-the-MDN-blog/
  - MDN のブログが始まった
- **Introducing Baseline: a unified view of stable web features | MDN Blog**
  - https://developer.mozilla.org/en-US/blog/baseline-unified-view-stable-web-features/
- **New functions, gradients, and hues in CSS colors (Level 4) | MDN Blog**
  - https://developer.mozilla.org/en-US/blog/css-color-module-level-4/
- Letting users block injected third-party DLLs in Firefox - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2023/03/letting-users-block-injected-third-party-dlls-in-firefox/
- Amy Keating Joins the Mozilla Foundation Board of Directors
  - https://blog.mozilla.org/en/mozilla/amy-keating-joins-the-mozilla-foundation-board-of-directors/
- Amy Keating: Why I am Joining the Mozilla Board
  - https://blog.mozilla.org/en/mozilla/amy-keating-why-i-am-joining-the-mozilla-board/
- Never Look at the Data: Why did we start getting so many pings from Korea? - Data@Mozilla
  - https://blog.mozilla.org/data/2023/04/27/never-look-at-the-data-why-did-we-start-getting-so-many-pings-from-korea/
- Firefox 113 significantly boosts accessibility performance
  - https://blog.mozilla.org/en/products/firefox/firefox-news/firefox-accessibility-boost/
- Updated GPG key for signing Firefox Releases - Mozilla Security Blog
  - https://blog.mozilla.org/security/2023/05/11/updated-gpg-key-for-signing-firefox-releases/
- SpiderMonkey Newsletter (Firefox 112-113) | SpiderMonkey JavaScript/WebAssembly Engine
  - https://spidermonkey.dev/blog/2023/04/14/newsletter-firefox-112-113.html
- Engineering Effectiveness Newsletter (February and March 2023 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/o6RJwMoOW-E
- Engineering Effectiveness Newsletter (April 2023 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Fp80jrh31C4

### Safari 動向

#### Stable:16.4

#### Updates

- **WebKit Features in Safari 16.4**
  - https://webkit.org/blog/13966/webkit-features-in-safari-16-4/
  - **Web Push on iOS and iPadOS**
  - **Improvements for Web Apps**
  - **Web Components**
  - CSS
    - **Margin Trim**
    - Typography
    - Pseudo-classes
    - **Color**
    - **Media Queries Syntax Improvements**
    - **Custom Properties**
    - Web Animations
    - **Outline + Border Radius**
    - CSS Typed OM
  - **HTML**
  - **JavaScript and WebAssembly**
  - Web API
    - Offscreen Canvas
    - Fullscreen API
    - Screen Orientation API
    - Screen Wake Lock API
    - User Activation API
    - WebGL Canvas Wide Gamut Color
    - Compression Streams API
    - And more
  - Images, Video, and Audio
  - WKWebView
  - Developer Tooling
    - Inspectable WebKit and JavaScriptCore API
    - WebDriver
  - Web Inspector
    - Typography Tooling
    - Tooling for Conditionals in CSS
    - Badging HTML Elements
    - And more
  - Safari Web Extensions
    - Enhancements to Declarative Net Request
    - SVG Icon Support in Web Extensions
    - Dynamic Content Scripts
    - Toggle Reader Mode
    - Session Storage
    - Background Modules
- Safari 16.4 Release Notes | Apple Developer Documentation
  - https://developer.apple.com/documentation/safari-release-notes/safari-16_4-release-notes
- **Release Notes for Safari Technology Preview 167**
  - https://webkit.org/blog/14100/release-notes-for-safari-technology-preview-167/
  - CSS
    - Implemented CSS text-transform with multiple values (261419@main)
    - Added offsets into shape-outside Shapes (261331@main)
    - **Added support for top-level & selector for CSS Nesting (261739@main)**
    - Added support for `counter()` with @counter-style (261985@main)
  - JavaScript
    - Added ClassSetCharacter syntax tests for RegExp v flag and fix issues found (261746@main)
    - Added more tests for RegExp v flag and fix issues found (261714@main)
    - Added ProxyObjectHas IC to optimize "has" trap (261628@main)
  - WebAssembly
    - Added support for anyref behind flag (261711@main)
    - Implemented cast operations behind flag (261445@main)
    - Implemented eqref and ref.eq behind flag (261663@main)
    - Implemented initial minimal JS API for Wasm GC behind flag (261544@main)
  - Media
    - Fixed video in picture-to-picture snaps to incorrect size (261383@main)
    - Fixed a page with one document doing capture and another playing correctly handle remote commands (261414@main)
    - Fixed readyState to change back to HAVE_METADATA when removing a sample at the current playtime (261955@main)
    - Fixed SourceBuffer.buffered to return the same object if it's not modified (261848@main)
    - Fixed video's readyState incorrectly switching between HAVE_CURRENT_DATA and HAVE_METADATA (262112@main)
  - **Popover**
    - Avoided conflicting interactions in the top layer (261317@main)
    - Made `element.togglePopover()` more interoperable (261386@main, 261436@main)
    - Implemented popover focusing steps (261400@main)
    - Implemented popovertarget & popovertargetaction attributes (261346@main)
    - Added an exception when calling `dialog.show()` on an open popover (261351@main)
  - Web API
    - Added support for Apple Pay in cross-origin iframes with allow=payment attribute (262616@main)
    - **Implemented Priority Hints (261689@main)**
    - **Implemented the Response.json static method (261960@main)**
  - Accessibility
    - **Added support for code ARIA role (261640@main)**
    - **Implemented `generic` role mapping (261894@main)**
- **Release Notes for Safari Technology Preview 168**
  - https://webkit.org/blog/14106/release-notes-for-safari-technology-preview-168/
  - CSS
    - **Added CSS Nesting serialization support for CSSOM (262177@main)**
    - **Added support for `@supports font-format()` (262305@main)**
    - Implemented two-value syntax of font-size-adjust (262309@main, 262374@main)
    - Implemented CSSOM `insertRule()` on StyleRule (262394@main)
  - JavaScript
    - Added ImplementationVisibility to Wasm::Callee (262191@main)
    - Aligned RegExp V Flags Syntax errors with V8 (262017@main)
    - Applied the new display computation for digital in Intl.DurationFormat (262682@main)
  - Lockdown Mode
    - Disabled the Web Codecs API (262653@main)
  - Web API
    - **Implemented `URL.canParse()` (262072@main)**
- Release Notes for Safari Technology Preview 169
  - https://webkit.org/blog/14135/release-notes-for-safari-technology-preview-169/
  - CSS
    - Implemented overflow-block and overflow-inline media query features (263088@main)
    - Implemented the from-font value for font-size-adjust (262800@main)
  - JavaScript
    - Added and optimized enumerator_put_by_val (263056@main)
    - Optimized Array#join's toString operation for Objects (263117@main)
    - Implemented megamorphic load IC (262872@main, 263200@main)
  - Popover
    - Renamed :open to :popover-open and removed :closed (262764@main)
  - Web API
    - Added customElements.getName method (263281@main)
    - Added missing service worker content filter check (262972@main)
- Safari 16.5 Beta Release Notes | Apple Developer Documentation
  - https://developer.apple.com/documentation/safari-release-notes/safari-16_5-release-notes
  - CSS
    - Added support for CSS Nesting.
    - Added support for :user-valid and :user-invalid.
    - Added initial support for color-mix CSS values.
- **Badging for Home Screen Web Apps**
  - https://webkit.org/blog/14112/badging-for-home-screen-web-apps/
- A quick introduction to the WPE WebKit Project
  - https://webkit.org/blog/14149/a-quick-introduction-to-the-wpe-webkit-project/
- **Introducing WebKit Documentation**
  - https://webkit.org/blog/14139/introducing-webkit-documentation/

#### Standard Positions

- どうやって追うかまださだまってない
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+created%3A%3E2023-03-20+

#### Other

- **fantasai 71: Change of Affiliation**
  - https://fantasai.inkedblade.net/weblog/2023/affiliation-change/
  - いろんな CSS 仕様の editor を務める fantasai が Apple に

### Edge 動向

#### Stable: 113

#### Updates

#### Chakra

#### Other

- Microsoft Edge Workspaces public preview is now available
  - https://blogs.windows.com/msedgedev/2023/04/05/edge-workspaces-preview/
- Introducing the "Browser essentials" feature in Microsoft Edge
  - https://blogs.windows.com/msedgedev/2023/04/06/introducing-browser-essentials-feature-microsoft-edge/
- Introducing cloud.microsoft: a unified domain for Microsoft 365 apps and services - Microsoft Community Hub
  - https://techcommunity.microsoft.com/t5/microsoft-365-blog/introducing-cloud-microsoft-a-unified-domain-for-microsoft-365/ba-p/3804961
  - Microsoft 365 などサービスのドメインを `*.cloud.microsoft` へ移行する予定
- Explainer: File Types - text/plain
  - https://textslashplain.com/2023/04/05/file-types/
- Auth Flows in a Partitioned World - text/plain
  - https://textslashplain.com/2023/04/12/auth-flows-in-a-partitioned-world/
- (The Futility of) Keeping Secrets from Yourself - text/plain
  - https://textslashplain.com/2023/04/14/the-futility-of-keeping-secrets-from-yourself/
- A Beautiful 10K - text/plain
  - https://textslashplain.com/2023/04/16/a-beautiful-10k/

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - First Public Working Drafts: Verifiable Credentials Status List v2021; Securing Verifiable Credentials using JSON Web Tokens
    - https://www.w3.org/blog/news/archives/9901
  - First Public Working Draft: Dubbing and Audio description Profiles of TTML2
    - https://www.w3.org/blog/news/archives/9896
  - First Public Working Drafts: EdDSA Cryptosuite v2022; ECDSA Cryptosuite v2019
    - https://www.w3.org/blog/news/archives/9888
- Chartering

#### Other

- W3C invites implementations of Trace Context Level 2
  - https://www.w3.org/blog/news/archives/9885
- **World Wide Web Consortium seeking next CEO**
  - https://www.w3.org/blog/news/archives/9891
- **W3C opens Advisory Board (AB) election**
  - https://www.w3.org/blog/news/archives/9903
- **30th anniversary of licensing the Web for general use and at no cost | W3C Blog**
  - https://www.w3.org/blog/2023/04/30th-anniversary-of-licensing-the-web-for-general-use-and-at-no-cost/
- Answering "What ARIA can I use?" | W3C Blog
  - https://www.w3.org/blog/2023/04/answering-what-aria-can-i-use/
- **Spring 2023 DOM Parts F2F · Issue #999 · WICG/webcomponents**
  - https://github.com/WICG/webcomponents/issues/999
- **meetings/2023/04-tokyo at gh-pages · w3ctag/meetings · GitHub**
  - https://github.com/w3ctag/meetings/tree/gh-pages/2023/04-tokyo
  - TAG F2F が Google Japan であったらしい
- **Agenda for Apr 27, 2023 · Issue #323 · web-platform-tests/interop**
  - https://github.com/web-platform-tests/interop/issues/323#issuecomment-1527746305
  - > Having a Logo of Interop #289
  - > Consensus: great idea! Would be a nice-to-have for 2024, if we find a designer, but not a blocker
- **Agenda for May 11, 2023 · Issue #329 · web-platform-tests/interop**
  - https://github.com/web-platform-tests/interop/issues/329#issuecomment-1545819060
- **Interop 2024 brainstorming · Issue #331 · web-platform-tests/interop**
  - https://github.com/web-platform-tests/interop/issues/331
  - focus area を 25 に固定したい
  - proposal の評価を楽にしたい
- CSS Creator H å kon Wium Lie Interview by Evrone
  - https://evrone.com/hakon-wium-lie-interview
  - H å kon Wium Lie へのインタビュー
  - コンピューターとの出会い、 CSS の話、 VR や ChatGPT など最近の流行りなど

### TC39 動向

#### Meeting

- 2023/3 (3/21-3/23)
  - https://github.com/tc39/notes/tree/main/meetings/2023-03
  - https://github.com/tc39/agendas/blob/main/2023/03.md
- tc39 minutes を読む
  - https://twitter.com/mozaicfm/status/1647223716747837440
  - https://docs.google.com/document/d/1qXUf4QRTbexUj0fg2sgYTxWwOT2v_q7lmjR282BOWLU

#### 3/21

- Test262 funding status
  - https://ptomato.name/talks/tc39-2023-03/
  - Google から funding があったが、 4/1 からそれが止まる
  - やばい。でもどうするか具体的ではない。
- **Iterator helpers**
  - 3 つに分割
  - Validate arguments
    - https://github.com/tc39/proposal-iterator-helpers/pull/265/files
    - メソッド呼んだらまず最初に引数の Validation をすうように仕様を修正
    - (最近のはそうなってる)
  - Closing iterators which have not been iterated
    - Iterator を close する処理が入ってなかったので仕様修正
  - Iterator helpers: renaming .take / .drop
    - take は iterator を close するから何度も呼べない
    - これは Rust とかの take と意味が違う
    - take を limit などに rename すると良さそう
    - rename どうするかは意見が割れた
    - 結論としては、いまのままいく、名前/挙動は変えない。
  - Temporal update and normative changes
    - https://docs.google.com/presentation/d/1b74GI-zHrG0wDzmwFs_yPWRli24KyVUNx3GeZt8JouA/edit#slide=id.p
- Set methods: What to do about intersection order?
  - Set には内部的に順序がある
  - 集合の Intercection をしたばあい、 receive の順序を維持したまま後ろに追加されたい
  - V8/SM はそれができるが、 JSC は実装が linked list だからパフォーマンスが出ない
  - どうするか?
  - 引数とレシーバのサイズ(どっちが大きいか)によって結果が変わる
  - ちょっと奇妙な挙動だが、決定論的
- Async Explicit Resource Management
  - 今は using await で提案されている
  - using await, await using, async using, using async で poll 中
  - Champion は await using でいきたい
  - これで stage 3 にいきたい
- **Decorator Metadata Update**
  - Decorator に Metadata を載せたい
  - 複雑なため一度 Decorator からは外された
  - ユースケースによってはこれが必要
  - その実装方法について 3 つの案
  - Option 1 でコンセンサス

#### 3/22

- Import reflection update
  - https://docs.google.com/presentation/d/1F62Jia5erIm6m6nqkm_2pFIlNLOVF0E4ewrVRytSJEs/edit#slide=id.p
  - import したものが resolve ~ eval のどのフェーズで実行されるべきかが不明瞭
  - import XXXX ~~ from "foo" の XXXX に「どのフェーズで実行するか」を書かせたい
  - 議論が伸びて延長戦へ
- **Import assertions/attributes for Stage 3**
  - Import Assertions は loading に関与しないので、例えば CSP は全部 script-src になる
  - これを指定したい。
  - が、そもそもそれはもう assertion ではない
  - import attributes に変えよう
  - でも ship しちゃってる互換性リスクは?
  - assert を非推奨にして with に移っていく予定。
- Iterator.range for Stage 2
  - Number.range から rename
  - 賛否両論、とくに浮動小数の range どうするか
  - Stage 2 にするが引き続き議論
- Float16Array for Stage 2 & 3
  - 2017 に提案されたもの
  - WebGL, WebGPU などで使いたい
  - https://qiita.com/printf_moriken/items/1a16d759cefea1b3210e
  - まだ調査不十分で Stage 2 のまま
  - WASM との interop の調査などが必要
- Decimal Stage 1 Update
  - 金融や科学でもユースケースあり
  - 実装方法がいくつかある
  - もうすこし調査が必要
- **Next steps for RegExp escaping**
  - escape よりも template tag の方が良さそう
- **Type Annotations Proposal Update**
  - Type in JS の方法として二つある
    - 型の消去
    - 型のチェック
  - 二つ目に手を出したい
  - でも、 3 ブラウザが拒否、型消去以外は受け入れられない
- Type Annotations Delimiting Concerns
  - Type Annotation によって間違ったコードが型として消される場合があるよね
    - `< >` がジェネリクスになっちゃうとか
- **Await Dictionary for stage 1**
  - `const obj = { shape: await getShape(), color: await getColor() }`
  - これが waterfall になるから、並行してやりたいけど、 Promise.all は面倒
  - Stage1

#### 3/23

- Shared Structs update
  - worker 間でシェアできる struct
  - GC heap allocatited だから SAB にはできない(?)
  - Google が MS と組んで Chromium にトライアルの開発をしている
- Async Context
  - Async な Context
  - ユースケースをもっと説明する必要がある
  - Stage2
- **Promise.withResolvers**
  - promise で wrap する際に new Promise でくるまないといけない
  - Promise.withResolve が { resolve, reject, promise }を返すようにして
  - resolve, reject は好きな時に呼べるようにしたい
  - Vue, Axios, TS, Vite, Deno, React で使われているテクニック
  - https://github.com/facebook/react/blob/d9e0485c84b45055ba86629dc20870faca9b5973/packages/react-dom/src/__tests__/ReactDOMFizzStaticBrowser-test.js#L95
  - Stage 1
- Quick Regex Escaping update
  - Security Concerns が解決したので RegExp.escape が使えそう
- Temporal nanoseconds precision follow-up
  - nano 秒と micro 秒で議論してたが、基本は nano を返すようにようなった
- Time Zone Canonicalization for Stage 1
  - よくわからん
  - Stage 1
    - Temporal.TimeZone.from('Asia/Calcutta').equals('Asia/Kolkata');
    - // => true
    - らしい
- Class constructor and method parameter decorators
  - Decorator から分割された仕様
  - TS にはある機能なので入れたい
  - Stage 1
  - Stage 2 になるには function decorator を進める必要がある
- Import reflection discussion continuation
  - 次回 Stage 3 をめざす
- Async Explicit Resource Management again
  - 条件付き Stage 3

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2023-01-01}...main@{2023-02-01}
- https://tc39.github.io/beta/
- 0->1
  - Await Dictionary
  - Promise.withResolvers
  - Time Zone Canonicalization
  - Class Method Parameter Decorators
- 1->2
  - Iterator.range
  - Float16Array
  - Async Context
- 2->3
  - Async Explicit Resource Management
- 3->4

#### New Proposals

#### Other

### WinterCG 動向

#### Meeting

- 2023-05-04 Meeting Notes · Issue #50 · wintercg/admin
  - https://github.com/wintercg/admin/issues/50
  - **`AbortSignal.any()`**
    - https://github.com/whatwg/dom/pull/1152
    - 同時に複数の signal を abort できる
    - 完成間近らしい
  - **RedableStream.from(asyncIterable)**
    - https://github.com/whatwg/streams/pull/1083
  - Prioritization of Web Crypto Stream

### IETF 動向

#### IETF116

- IETF 116 Proceedings
  - https://datatracker.ietf.org/meeting/116/proceedings
- IETF116 感想戦(録音)
  - https://twitter.com/mozaicfm/status/1643962835393986560
- IETF116 復習(録音)
  - https://twitter.com/mozaicfm/status/1646499507583225857

#### WG

- httpwg
  - Cookiebis
    - https://github.com/httpwg/http-extensions/labels/6265bis
    - WGLC が近そう
    - これがおわったら CHIPS, Spec Layering をやるらしい
  - Alternative Services
    - https://github.com/httpwg/http-extensions/labels/alt-svc
    - ヘッダで返すとインフラの状況をうまく反映できない
      - e.g. マルチ CDN など
    - なので DNS で返すようにしたい(DNS に紐づいている方が新鮮な情報)
    - Alt-SvcB: HTTPS record でアクセスしたサーバからの Alt-SvcB 以外無効にする(?)
      - https://martinthomson.github.io/alt-svcb/draft-thomson-httpbis-alt-svcb.html
      - Alt-Svc は deprecate に
  - Resumable Uploads
    - https://datatracker.ietf.org/meeting/116/materials/slides-116-httpbis-resumable-uploads
    - Apple が実装に興味あり
    - エラー時のリトライ周りについて議論
    - Upload-Complete を毎回送って ?1(true)だったらリトライしない
    - kazuho: Body に入ってた方がいいのでは?
- sidemeeting
  - HTTP Dictionary Compression
    - https://wiki.ietf.org/meeting/116/sidemeetings

#### Other

- Httpdir early review of draft-ietf-satp-core-00
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2023AprJun/0103.html
- Httpdir early review of draft-ietf-scitt-architecture-01
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2023AprJun/0099.html
- I-D Action: draft-ietf-httpbis-rfc6265bis-12.txt
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2023AprJun/0121.html
- I-D Action: draft-ietf-httpbis-alias-proxy-status-03.txt
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2023AprJun/0119.html
- I-D Action: draft-ietf-httpbis-message-signatures-17.txt
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2023AprJun/0114.html
- I-D Action: draft-ietf-httpbis-alias-proxy-status-02.txt
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2023AprJun/0113.html
- I-D Action: draft-ietf-httpbis-alias-proxy-status-02.txt
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2023AprJun/0113.html
- **Working Group Last Call: Structured Fields Revision (RFC8941bis)**
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2023AprJun/0090.html
- Structure Fields bis: JSON mapping (#2504)
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2023AprJun/0069.html
- I-D Action: draft-ietf-httpbis-digest-headers-12.txt
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2023AprJun/0063.html

### CDN 動向

#### Cloudflare

- Killnet and AnonymousSudan DDoS attack Australian university websites, and threaten more attacks - here's what to do about it
  - https://blog.cloudflare.com/ddos-attacks-on-australian-universities/
- Secure by default: recommendations from the CISA's newest guide, and how Cloudflare follows these principles to keep you secure
  - https://blog.cloudflare.com/secure-by-default-understanding-new-cisa-guide/
- Celebrating Australia's Privacy Awareness Week 2023
  - https://blog.cloudflare.com/celebrating-australia-privacy-awareness-week-2023/
- Effects of the conflict in Sudan on Internet patterns
  - https://blog.cloudflare.com/sudan-armed-conflict-impact-on-the-internet-since-april-15-2023/
- The European Network Usage Fees proposal is about much more than a fight between Big Tech and Big European telcos
  - https://blog.cloudflare.com/eu-network-usage-fees/
- Cloudflare's view of Internet disruptions in Pakistan
  - https://blog.cloudflare.com/cloudflares-view-of-internet-disruptions-in-pakistan/

#### Fastly

- ETags: What they are, and how to use them | Fastly
  - https://www.fastly.com/blog/etags-what-they-are-and-how-to-use-them
- Announcing Mutual TLS from Fastly | Fastly
  - https://www.fastly.com/blog/announcing-mutual-tls-from-fastly
- Join Fastly at RSA Conference 2023 | Fastly
  - https://www.fastly.com/blog/join-fastly-at-rsa-conference-2023

#### Akamai

- AkaRank: Improving Popularity Rankings for Better Threat Intelligence, Part 2 | Akamai
  - https://www.akamai.com/blog/security/improving-threat-intelligence-part-2-introducing-akarank
- Render Pages Faster for Optimized Browsing, Part 5 of 5 | Akamai
  - https://www.akamai.com/blog/developers/render-pages-faster-optimized-browsing-part-5-of-5
- Akamai and the Adoption of Post-Quantum Cryptography | Akamai
  - https://www.akamai.com/blog/security/akamai-and-post-quantum-cryptography
- What's New for Developers: April 2023 | Akamai
  - https://www.akamai.com/blog/developers/whats-new-for-developers-april-2023
- Phishing: The Oldest and Wisest Attack Vector | Akamai
  - https://www.akamai.com/blog/security/phishing-oldest-wisest-attack-vector

#### Other

- Streaming for Serverless Node.js and Edge Runtimes with Vercel Functions - Vercel
  - https://vercel.com/blog/streaming-for-serverless-node-js-and-edge-runtimes-with-vercel-functions

### セキュリティ動向

- 2023 USA | RSA Conference
  - https://www.rsaconference.com/usa

### 周辺動向

- IPA のサイトリニューアルに総ツッコミ 多くの旧ページが「404」、リダイレクトせず 「なぜこんな雑に」 - ITmedia NEWS
  - https://www.itmedia.co.jp/news/articles/2304/03/news086.html
- IPA ウェブサイトリニューアルに係るお詫びと対応について | 新着情報 | IPA 独立行政法人 情報処理推進機構
  - https://www.ipa.go.jp/news/2023/announce/20230403.html
  - > URL 変更の対応にあたっては、安定的なレスポンスの確保を考慮し、リダイレクト対象とするコンテンツの選定を行いました。しかし、今回の対応は、多くのユーザーが IPA ウェブサイトに掲載されたコンテンツへのリンクを自組織のサイトや資料等で活用していることの影響に関して、認識が不十分でした。頂いた多くのご指摘を重く受け止め、ユーザーの皆様のコンテンツへのアクセスを確保するため、リダイレクトの追加対応を早急に進めてまいります。具体的には、「脆弱性対策情報」や「情報処理安全確保支援士」、白書など重要度の高い事業について、原則として全件をリダイレクト対象とし、順次対応してまいります。
- **Open Web Docs**
  - The great renaming of Web/API
    - https://openwebdocs.org/content/posts/web-api-page-titles/
    - `Document.querySelector()` のような表記をしていた
    - プロトタイプメソッドや static なメソッドと区別できないので問題視されていた
  - Documenting missing interoperable web features
    - https://openwebdocs.org/content/posts/complete-interop-features/
- **Can I Use...', but for ARIA! - Bocoup**
  - https://bocoup.com/blog/can-i-use-but-for-aria
  - https://aria-at.w3.org/reports
- Why xHE-AAC is being embraced at Meta - Engineering at Meta
  - https://engineering.fb.com/2023/04/11/video-engineering/high-quality-audio-xhe-aac-codec-meta/
- Build faster with Buck2: Our open source build system
  - https://engineering.fb.com/2023/04/06/open-source/buck2-open-source-large-scale-build-system/
- How Device Verification protects your WhatsApp account
  - https://engineering.fb.com/2023/04/13/security/whatsapp-device-verification-protects-your-account/
- Deploying key transparency at WhatsApp - Engineering at Meta
  - https://engineering.fb.com/2023/04/13/security/whatsapp-key-transparency/
- A fine-grained network traffic analysis with Millisampler - Engineering at Meta
  - https://engineering.fb.com/2023/04/17/networking-traffic/millisampler-network-traffic-analysis/
- The malware threat landscape: NodeStealer, DuckTail, and more
  - https://engineering.fb.com/2023/05/03/security/malware-nodestealer-ducktail/

### イベント

- 4 月
- 5 月
  - 10: Google I/O
    - https://io.google/2023/
  - 23-25: Microsoft Build
    - https://build.microsoft.com/en-US/home
  - 25: SecWeb
    - https://secweb.work/2023.html
- 6 月
  - 5-9: WWDC 2023
    - https://developer.apple.com/wwdc23/
  - 7-8: W3C Workshop Secure the Web Forward
    - https://www.w3.org/2023/03/secure-the-web-forward/
- 7 月
  - IETF | IETF 117 San Francisco
    - https://www.ietf.org/how/meetings/117/
- 9 月
  - 11-15: TPAC 2023
    - https://www.w3.org/2023/09/TPAC/

### Wrap Up

- Chrome
  - 112
    - CSS Nesting
    - Skipping service worker no-op fetch handlers
  - 113
    - CSS `linear()` easing function
    - CSS `image-set()`
    - `Headers.getSetCookie()`
    - WebGPU
    - Private State Token
    - deprecate document.domain
    - First-party Sets
  - 114 Beta
    - CSS `text-wrap: balance`
    - BFCache NotRestored Reason
    - CHIPS
    - Popover
    - Background Blur API Origin Trial
  - DevTools 113
    - override network response headers
  - Ship
    - CSS `display` with multiple values
    - Partitioning Storage, Service Worker, Communication APIs
    - Scroll-driven Animations
    - `URLSearchParams.has()` value argument
    - Regexp v flag for HTML pattern
  - Prototype
    - Detect/Disable UA transitions
  - Experiment
    - Explicit Compile Hints with Magic Comments
    - Storage Buckets API
    - "is-cross-site" HTTP Cache Partitioning key
  - Deprecate and Remove
    - CSS zoom property
    - Remove Web SQL
    - deprecate unload event
  - web.dev
    - INP
    - Baseline
  - Chrome Developers
    - CSS layout and source order
  - Chromium blog
    - update on the lock icon
  - other blogs
    - INO to CWV in 2024
    - new TLDs
  - other
    - Jake Archibald leaving Google
- Firefox
  - 112
    - right click to reveal password
    - inert
    - CSS math functions
    - CSS `linear()`
  - 113
    - Animated AVIF
    - CSS Level 4 color features
    - CSS `color-mix()`
    - :nth-child(of S)
    - scripting media feature
    - Compression Streams
  - Ship
    - Module Workers
    - rel=modulepreload
  - Prototype
    - `String.isWellFormed()`
    - Array.fromAsync
    - DNS over OHTTP
    - Font visibility restrictions in Private Browsing Mode
  - other
    - MDN blog
- Safari
  - 16.4
    - Web Push on iOS
    - PWA improvements
    - Declacative Shadow DOM
    - CSS Color features
    - Media Queries Range syntax
    - @property
    - iframe lazy-loading
  - 16.5 Beta
    - CSS Nesting
  - TP 167
    - CSS Nesting
    - Priority Hints
    - `Response.json()`
  - TP 168
    - CSS Nesting serialization
    - `@supports font-format()`
    - `URL.canParse()`
  - TP 169
    - `customElements.getName()`
  - blog
    - WebKit Documentation
  - other
    - fantasai → Apple
- W3C/WHATWG
  - other
    - seeking next CEO
    - AB election
    - Interop minutes
- TC39
  - 2023/3 meeting
  - Iterator Helpers が三つに分割
  - Decorator Metadata Update
  - Import assertions が attributions に
  - RegExp escape を template tag に
  - Type Annotation を型チェックしたいが反対多数
  - Await Dictionary
  - Promise.withResolvers
- WinterCG
  - `AbortSignal.any()`
  - `ReadableStream.from(asynciterable)`
- IETF
  - IETF116
    - Cookiebis が WGLC 間近
    - Alt-Svc の DNS 版が必要そう
    - Resumable Uploads のエラー周り
    - Sidemeeting で Dictionary Compression
- CDN 動向
- セキュリティ動向
  - RSA Conference
- 周辺動向
  - IPA サイト 404
  - Open Web Docs の API 名 rename
  - ARIA 版の caniuse
