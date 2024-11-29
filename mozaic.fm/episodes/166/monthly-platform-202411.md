---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep166.mp3
published_at: 2024-11-29
guest: [@myakura](https://twitter.com/myakura)
---

# ep166 Monthly Platform 202411

## Theme

第 166 回のテーマは 2024 年 11 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 131

#### Updates

- New in Chrome 131
  - https://developer.chrome.com/blog/new-in-chrome-131
  - CSS highlight inheritance
  - Styling Improvements to `<details>` and `<summary>`
  - @page margin boxes
- What's New in WebGPU (Chrome 131)
  - https://developer.chrome.com/blog/new-in-webgpu-131
- What's new in DevTools, Chrome 131
  - https://developer.chrome.com/blog/new-in-devtools-131
- Chrome 132 beta
  - [https://developer.chrome.com/blog/chrome-132-beta](https://developer.chrome.com/blog/chrome-132-beta?hl=en)
  - CSS
    - **CSS Anchor Positioning: allow anchor-size() in inset and margin properties**
    - CSS sideways writing modes
  - Web APIs
    - Capture all screens
    - **Dialog toggle events**
    - Element Capture
    - FedCM authorization features
    - FedCM Mode API and Use Other Account API
    - **Fetch: Request.bytes() and Response.bytes()**
    - File System Access for Android and WebView
    - **Ignore Strict-Transport-Security for localhost**
    - Keyboard focusable scroll containers
    - Private State Token API Permissions Policy default allowlist wildcard
    - PushMessageData::bytes()
    - Saved queries in sharedStorage.selectURL
    - Throw exception for popovers and dialogs in non-active documents
    - **WebAuthn Signal API**
    - WebGPU: 32-bit float textures blending
    - WebGPU: Expose GPUAdapterInfo from GPUDevice
    - WebGPU: Texture view usage
  - New origin trials
    - Document-Isolation-Policy
    - **Explicit Compile Hints with Magic Comments**
  - Deprecations and removals
    - navigator.storage no longer an EventTarget
    - Remove Prefixed HTMLVideoElement Fullscreen APIs

#### Intents

- Ship: Saved queries in sharedStorage.selectURL
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rvYQWbjy-gE
- Ship: Remove Prefixed HTMLVideoElement Fullscreen APIs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/srGFORpjjI8
- Ship: Blob URL Partitioning: Fetching/Navigation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/erVBugcYwRc
- Ship: Attribution Reporting Feature: Remove ar_debug Requirement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/T6i4a_hNeXk
- Ship: Attribution Reporting Feature: Aggregatable Named Budgets
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pc6n8o-S_Ns
- **Ship: Nested pseudo elements styling**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3ajPvI80gE8
  - `::before::marker` と `::after::marker` のスタイルがサポート
- Ship: WebGPU: Expose GPUAdapterInfo from GPUDevice
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/q4tpIeEydRI
- **Ship: CSS Scroll State Container Queries**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QelenpbN0Uc
  - Sticky や Snap な状態が取れる
- Ship: Deprecate getters of Intl Locale Info
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fwnEjShxvmo
- **Ship: Element Capture**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WYQ4juHM4HM
- Ship: Expose coarsened cross-origin renderTime in elment timing/LCP (regardless of TAO)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cju9Lw-dcMc
- Ship: FedCM authorization features (fka Bundle 6: Continuation API, Parameters API, Fields API, Multiple configURLs, Custom account labels)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4arGqVW6V_Y
- Ship: Resource timing: revert responseStart change and introduce firstResponseHeadersStart
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7Oiu59G4qcY
- **Ship: popover=hint**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2N6dnbgjzLs
- **Ship: Atomics.pause**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/32a9xh_e9AU
- Ship: DOM `moveBefore()` method, for state-preserving atomic move
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YE_xLH6MkRs
- **Ship: Popover invoker and anchor positioning improvements**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Dn8UfPtFjks
  - Implicit invoker relationship
- Ship: SharedWorker script inherit controller for blob script URL
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9XqHRVPy710
- Ship: Web Authentication API: PublicKeyCredential's getClientCapabilities() method
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-u_7GCYU0sY
- Ship: WebGPU: 1-component vertex formats (and unorm8x4-bgra)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oluuJZda_yY
- **Ship: Multiple import maps**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4JWXZilDG6w
- **Ship: Explicit resource management (async)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4Wqy-H9J7Ic
- **Ship: Explicit resource management (sync)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9nEzEe8h8sY
- Ship: Expose attributionsrc attribute on `<area>`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NkWgWmJOBlU
- **Ship: Popover nested inside invoker shouldn't re-invoke it**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/98wlmgA9Glo
- Ship: Protected Audience Bidding and Auction Services: Allow trusted bidding signals to trigger interest group updates
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tWaKLzORtM4
- Ship: Protected Audience: Auction Nonce Hardening
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jjFGRDm2Dr4
- Ship: X25519 algorithm of the Web Cryptography API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/A7lbRONS1lY
- **Ship: CSS advanced attr() function**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2dNLhQN9SNs
- Ship: WebAssembly Memory64
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5vTbd1dttwc
- Ship: Animation.overallProgress
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WyDItBnS9mc
- Ship: Freezing on Energy Saver
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OVoSqEhtpNI
- **Prototype and Ship: scroll-start-target**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QU-c0jN6nr0
- **Prototype: Dialog light dismiss**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eDXEmWB7Xo8
- Prototype: `::column` pseudo element for Carousel
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hoBT5TPKRrw
- Prototype: `::scroll-*-button` for Carousel
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZPXC1I9E1Vw
- **Prototype: CSS Inertness**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Xuo6HpkN1xQ
- Prototype: IndexedDB getAllRecords()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zLHOayUfTcw
- **Prototype: aria-actions**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cYs7hgcwgcU
  - タブの「閉じる」ボタンのようなアクションがあることを知らせる
- **Prototype: Lightweight Mode For FedCM**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FNliogpwaBA
- Prototype: Camera Effects Status: Background Blur
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fG8V4YeLByM
- Prototype: User-defined entry points in long animation frame timing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KCKOORJ8vlY
- Prototype: Subresource Reporting for scripts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FAnsVyszxQ4
- **Prototype: Container Timing**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/J-WxY0w7bNk
- Prototype: Delegation-oriented FedCM
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rwu9wFl0mF4
- Extend Experiment: Captured Surface Control
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LqqRTfDIr78
- Prototype: Use the same paint-related timing values in all relevant performance entries
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qNlXvvb3i6g
- Prototype: Web Authentication Conditional Create (Passkey Upgrades)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XFJmqtQpMds
- **Prototype: Clipboardchange event**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-8e6sSS5ztw
- Prototype: By default, custom elements will not appear in the accessibility tree
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Qqm1EU0noX4
- **Experiment: Document-Isolation-Policy**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/p52-T7m3rOM
- Experiment: ServiceWorkerStaticRouterTimingInfo
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TRm-UcemAas
- Experiment: Reference Target for Cross-root ARIA
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/C3pELgMqzCY
- Experiment: ServiceWorkerAutoPreload
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AkA4s1_R8H4
- Experiment [more]: Explicit Compile Hints with Magic Comments
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/m1_OToPrW0k
- Extend Experiment: Keyboard-focusable scroll containers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4VV_74HxP3k
- Extend Experiment: WebRTC encoded transform - Constructor with custom Metadata (originally Modify Metadata functions)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CLysO1pVZiE
- Extend Experiment: Origin Trial for Third Party Cookie Deprecation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CZ2YCFKNVGs
- Extend Deprecation Trial (Again): Partitioning Storage, Service Workers, and Communication APIs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JgJbznHW1rk
- Deprecate and Remove: Nonstandard getUserMedia audio constraints
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zspUbShiW-8
- Deprecate and Remove: Remove WebGPU limit maxInterStageShaderComponents
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/i5oJu9lZPAk
- Deprecate and Remove: Protected Audience Subresource bundle directFromSellerSignals
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/t9gHiTwV370
- Web-Facing Change PSA: Throw exception for popovers/dialogs in non-active documents
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jRFiIIkXv_k
- Web-Facing Change PSA: navigator.storage no longer an EventTarget
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rybi31P2DhE
- Web-Facing Change PSA: NotRestoredReasons name change
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/keA8QE_uFxo
- Web-Facing Change PSA: Private Aggregation API: ignoring site exceptions for debug mode
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YqdnsrLpuXI
- Web-Facing Change PSA: Fix text selection on Shadow DOM with delegatesFocus
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/egWmzZ4MNuU
- PSA: "Available" hotlist has not been re-triaged
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eaCt7xB92fI
- PSA: Chrome getUserMedia "ideal" Constraint Change
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/El5jaGnhVu4
- **PSA Web Platform Telemetry**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hB8N6rFcLF4
  - 全ての新機能に WebDXFeature use counter を適用していく
  - 2020 年以降にリリースした機能も対象
  - https://docs.google.com/document/d/1iiat-77KuFxEWLqSXvC754LG36H_vcbF5A0Y5bwQzVg
  - https://webstatus.dev で表示
- PSA: Enabling 5 Protected Audience and Fenced Frame features in Mode A/B
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WgGGPElrG9o
- Dev Trial: Partitioned Popins
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0KHYC3wLay8
- Ready for Developer Testing: Web Authentication API: PublicKeyCredential's `getClientCapabilities()` method
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YTkGIdlQMAw
- Ready for Developer Testing: Deprecate getters of Intl Locale Info
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/INf1aE8H4-c

#### Other

- web.dev
  - New to the web platform in October
    - [https://web.dev/blog/web-platform-10-2024](https://web.dev/blog/web-platform-10-2024?hl=en)
  - **Watch the Web AI Summit 2024 videos**
    - https://web.dev/blog/web-ai-summit-2024-recap
- google for developers
  - Sharing our latest differential privacy milestones and advancements - Google Developers Blog
    - https://developers.googleblog.com/en/sharing-our-latest-differential-privacy-milestones-and-advancements/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - https://developer.chrome.com/blog/
  - Removing --headless=old from Chrome
    - https://developer.chrome.com/blog/removing-headless-old-from-chrome
  - Add content to the margins of web pages when printed using CSS
    - https://developer.chrome.com/blog/print-margins
  - **Help your users sign-in smoothly with seamless credential sharing**
    - https://developer.chrome.com/blog/seamless-credential-sharing
  - Join the Prompt API for Chrome Extensions origin trial
    - https://developer.chrome.com/blog/prompt-api-origin-trial
  - Join the Summarizer API origin trial
    - https://developer.chrome.com/blog/ai-summarizer-origin-trial
  - Join the Translator API origin trial
    - https://developer.chrome.com/blog/ai-translator-origin-trial
  - Monitor live Core Web Vitals metrics in the Performance panel
    - https://developer.chrome.com/blog/devtools-tips-38
  - More options for styling `<details>`
    - https://developer.chrome.com/blog/styling-details
  - New scroll badge in DevTools: Find scrollable elements faster
    - https://developer.chrome.com/blog/swe-devtools-scroll-badge
  - Annotate traces directly in the Performance pane
    - https://developer.chrome.com/blog/devtools-annotations
  - Signal API for passkeys on Chrome desktop
    - https://developer.chrome.com/blog/passkeys-signal-api
  - Prepare your extension as we begin testing a new extensions menu
    - [https://developer.chrome.com/blog/new-extensions-menu-testing](https://developer.chrome.com/blog/new-extensions-menu-testing?hl=en)
  - What's next for WebGPU
    - https://developer.chrome.com/blog/next-for-webgpu?hl=en
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
- search blog
  - https://developers.google.com/search/
- v8
  - https://v8.dev/
- **Q3 2024 Summary from Chrome Security**
  - https://groups.google.com/a/chromium.org/g/chromium-dev/c/KOmfh5BW6Mw
  - Q3 のセキュリティ周りのまとめ
  - Device Bound Session Credentials
  - RootCA の削除
  - Chrome Root Store の改善
  - HTTPS-First Mode
  - Document-Isolation-Policy
  - Post Quantum Crypt
  - Trust Anchor Agility
  - Rust 化が進んでる話
  - などなど
- Project Zero: From Naptime to Big Sleep: Using Large Language Models To Catch Vulnerabilities In Real-World Code
  - https://googleprojectzero.blogspot.com/2024/10/from-naptime-to-big-sleep.html
- **米グーグルに「クローム」売却要求へ、独占解消に向け司法省－関係者 - Bloomberg**
  - https://www.bloomberg.co.jp/news/articles/2024-11-18/SN63GPT1UM0W00
  - https://www.bloomberg.com/news/articles/2024-11-18/doj-will-push-google-to-sell-off-chrome-to-break-search-monopoly

### Firefox 動向

#### Stable: 133

#### Updates

- **Firefox 133.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/133.0/releasenotes/
  - Bounce Tracking Protection
- **Firefox 133 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/133
  - Uint8Array base64/hex
  - `<dialog>` toggle events
  - Fetch keepalive
- Experimental address bar deduplication, better auto-open Picture-in-Picture, and more - These Weeks in Firefox: Issue 170
  - https://blog.nightly.mozilla.org/2024/11/19/experimental-address-bar-deduplication-better-auto-open-picture-in-picture-and-more-these-weeks-in-firefox-issue-170/
- **Celebrating 20 years of Firefox - These Weeks in Firefox: Issue 171**
  - https://blog.nightly.mozilla.org/2024/11/19/celebrating-20-years-of-firefox-these-weeks-in-firefox-issue-171/
- New Address Bar Updates are Here - These Weeks in Firefox: Issue 172
  - https://blog.nightly.mozilla.org/2024/11/19/new-address-bar-updates-are-here-these-weeks-in-firefox-issue-172/

#### Intents

- **Ship: Bounce Tracking Protection in ETP "strict"**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/f5r_AEwon4A
  - ETP が strict な人に Bounce Tracking Protection を有効
- **Ship: Promise.try**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/egml7VXPStE
- Ship: WebAssembly js-string-builtins
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/q9iWiQMO1y8
- Ship: WebAssembly 64-bit mode (memory64)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/I-MywEnFxKc
- **Ship: RegExp escaping proposal**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/yWsLDyVI044
- Ship: Redeclarable global eval-introduced vars proposal
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/OUalagN75R8
- **Prototype: Scoped custom element registries**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/4UoaI67Awcg
- Change:
- Remove:

#### Newsletter

- Performance Testing Newsletter (Q3 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/PIsXTjKPnw8
- Firefox WebDriver Newsletter 132 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-132/
- Firefox DevTools Newsletter - 132 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-132/
- Firefox WebDriver Newsletter 133 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-133/

#### MDN / Open Web Docs

- How to land your first developer job
  - https://developer.mozilla.org/en-US/blog/how-to-land-your-first-developer-job/
- **Self-experimentation with CSP**
  - https://openwebdocs.org/content/posts/self-experimentation-with-csp/
- Monitoring and optimizing website performance
  - https://developer.mozilla.org/en-US/blog/optimize-web-performance/

#### Standard Position

- 今月 Close された Issue と PR ものをみる
  - https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2024-11-01+
- Positive
  - ContentVisibilityAutoStateChanged event
    - https://github.com/mozilla/standards-positions/issues/664
  - PerformanceEventTiming.interactionId
    - https://github.com/mozilla/standards-positions/issues/1069
- Newtral
  - Document Subtitle
    - https://github.com/mozilla/standards-positions/issues/749
- Negative
  - Page Embedded Permission Control
    - https://github.com/mozilla/standards-positions/issues/908

#### Other

- **Firefox の開発元である Mozilla が従業員の約 5%に当たる約 60 人を解雇 - GIGAZINE**
  - https://gigazine.net/news/20240214-mozilla-lay-off/
- POSIX signals and the Firefox Profiler
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/kRle2nH1lFo
- Exploring the Firefox Community on r/firefox
  - https://blog.mozilla.org/en/products/firefox/firefox-subreddit/
- We asked why you love Firefox. Here's what you said.
  - https://blog.mozilla.org/en/products/firefox/firefox-features-fan-favorites/
- The Pwnedkeys Revokinator is back!
  - https://www.mail-archive.com/dev-security-policy@mozilla.org/msg01875.html
- **20 years of Firefox: How a community project changed the web**
  - https://blog.mozilla.org/en/products/firefox/firefox-milestones/

### Safari 動向

#### Stable: 18.1

#### Updates

- **WebKit Features in Safari 18.1**
  - https://webkit.org/blog/16188/webkit-features-in-safari-18-1/
  - Summaries in Reader
  - Writing Tools
- **Release Notes for Safari Technology Preview 207**
  - https://webkit.org/blog/16205/release-notes-for-safari-technology-preview-207/
  - Added enhancements to `<input type=color>` to support alpha and colorspace attributes.
  - Added support for `Atomics.pause`.
  - Added `noopener-allow-popups` support in Cross-Origin-Opener-Policy.
  - Added Brotli support for Compression Streams.
  - Added support for documentId to the sender message object.
  - Added support for documentId to `tabs.sendMessage()` and `tabs.connect()`.
- Make creative borders with background-clip border-area
  - https://webkit.org/blog/16214/background-clip-border-area/
- Release Notes for Safari Technology Preview 208
  - https://webkit.org/blog/16285/release-notes-for-safari-technology-preview-208/
  - CSS
    - Added `attr()` fallback support.
  - JavaScript
    - Added support for Iterator.concat.
    - Implemented relaxed laneselect SIMD instructions.
    - Enabled support for Iterator Helpers.
    - Added support for `Map.prototype.getOrInsert` and `WeakMap.prototype.getOrInsert`.
  - Rendering
  - Scrolling
  - Web API
  - Web Authentication
  - Web Extensions
    - Added declarativeNetRequest support for initiatorDomains and excludedInitiatorDomains.
    - Added support for unless-frame-url to content blockers.
  - Web Inspector
  - WebRTC

#### Standard Positions

- 今月 Close されたものをみる
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2024-11-01+
- Support
  - dispatch toggleevents for dialog open/close
    - https://github.com/WebKit/standards-positions/issues/418
  - `focus-without-user-activation` feature policy
    - https://github.com/WebKit/standards-positions/issues/406
  - Web Authentication's PublicKeyCredential signal\* methods
    - https://github.com/WebKit/standards-positions/issues/400
  - WebXR Hand Input Module
    - https://github.com/WebKit/standards-positions/issues/395
  - Multiple Import Maps
    - https://github.com/WebKit/standards-positions/issues/381
  - Selection API: getComposedRanges
    - https://github.com/WebKit/standards-positions/issues/376
  - DOM State-preserving move (`Node.prototype.moveBefore`)
    - https://github.com/WebKit/standards-positions/issues/375
  - CSS Nesting: The Nested Declarations Rule
    - https://github.com/WebKit/standards-positions/issues/369
  - New `trusted-types-eval` keyword for CSP script-src
    - https://github.com/WebKit/standards-positions/issues/355
  - Support Skip-Ad media session action
    - https://github.com/WebKit/standards-positions/issues/350

#### Other

- Igalia and WebKit: status update and plans (2024) | mariospr.org
  - https://mariospr.org/2024/11/03/igalia-and-webkit-status-update-and-plans-2024/
  - https://www.slideshare.net/slideshow/igalia-and-webkit-status-update-and-plans-72bd/272669557
- Igalia WebKit Team | WebKit Igalia Periodical #3
  - https://blogs.igalia.com/webkit/blog/2024/wip-3/
- **CMA publishes provisional findings in Mobile Browsers and Cloud Gaming market investigation - GOV.UK**
  - https://www.gov.uk/government/news/cma-publishes-provisional-findings-in-mobile-browsers-and-cloud-gaming-market-investigation
  - モバイルでの寡占に関する調査に Safari が追加

### Edge 動向

#### Stable: 131

#### Updates

- https://blogs.windows.com/msedgedev/
  - ここがメイン
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見れる
- https://twitter.com/MSEdgeDev
  - これを見るしか無い
- Ignite 2024: Transform your workday with the latest Edge for Business features - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2024/11/19/microsoft-edge-for-business-transform-your-workday-ignite-2024/

#### Other

- Lenovo P1, Gen7: Meh - text/plain
  - https://textslashplain.com/2024/10/28/lenovo-p1-gen7/
- On Politics - text/plain
  - https://textslashplain.com/2024/11/11/on-politics/
- Defensive Technology: Controlled Folder Access - text/plain
  - https://textslashplain.com/2024/11/15/defensive-technology-controlled-folder-access/
- Best Practices for SmartScreen AppRep - text/plain
  - https://textslashplain.com/2024/11/15/best-practices-for-smartscreen-apprep/
- Security Software - An Overview - text/plain
  - https://textslashplain.com/2024/11/18/security-software-an-overview/
- Parallel Downloading - text/plain
  - https://textslashplain.com/2024/11/22/parallel-downloading/
- **Fiddler - My Mistakes - text/plain**
  - https://textslashplain.com/2024/11/24/fiddler-my-mistakes/
  - Fiddler の開発秘話
- **Announcing Windows 11 Insider Preview Build 22635.4440 (Beta Channel) | Windows Insider Blog**
  - https://blogs.windows.com/windows-insider/2024/11/01/announcing-windows-11-insider-preview-build-22635-4440-beta-channel/
  - Windows Hello がリブランド
  - Passkey がより密接に

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
  - UI Events KeyboardEvent code and key Values are W3C Proposed Recommendations
    - https://www.w3.org/news/2024/ui-events-keyboardevent-code-and-key-values-are-w3c-proposed-recommendations/
- Candidate Recommendation
  - W3C Invites Implementations of Device Orientation and Motion
    - https://www.w3.org/news/2024/w3c-invites-implementations-of-device-orientation-and-motion/
  - Updated Candidate Recommendation: Core Accessibility API Mappings 1.2
    - https://www.w3.org/news/2024/updated-candidate-recommendation-core-accessibility-api-mappings-1-2/
  - W3C Invites Implementations of Device Posture API
    - https://www.w3.org/news/2024/w3c-invites-implementations-of-device-posture-api/
- Working Draft
  - Four Group Notes published by the Decentralized Identifier Working Group
    - https://www.w3.org/news/2024/four-group-notes-published-by-the-decentralized-identifier-working-group/
- First Public Working Draft
  - Audio Session
    - https://www.w3.org/news/2024/first-public-working-draft-audio-session/
  - Web Audio API 1.1
    - https://www.w3.org/news/2024/first-public-working-draft-web-audio-api-1-1/
  - First Public Working Draft: WebDriver BiDi
    - https://www.w3.org/news/2024/first-public-working-draft-webdriver-bidi/
  - First Public Working Draft: Global Privacy Control (GPC)
    - https://www.w3.org/news/2024/first-public-working-draft-global-privacy-control-gpc/

#### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- open-ui/meetings/telecon/2024-11-06.md at main · openui/open-ui
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-11-06.md
  - The utility of the popover=hint feature #1114
  - [interest invokers] Touch inputs #1052
- open-ui/meetings/telecon/2024-11-14.md at main · openui/open-ui
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-11-14.md
  - select: use cases for opening the picker without user activation #1127
  - select: provide a way for authors to define the string value of rich options #1118
  - select: clarifying what should be used as the chosen value #1117
- open-ui/meetings/telecon/2024-11-21.md at main · openui/open-ui
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-11-21.md
  - Design System Update
  - select: clarifying what should be used as the chosen value #1117

#### WHATNOT

- https://github.com/whatwg/html/issues?q=is%3Aissue+is%3Aopen+WHATNOT+meeting
- Upcoming WHATNOT meeting on 2024-11-7 · Issue #10734 · whatwg/html
  - https://github.com/whatwg/html/issues/10734
  - Review past action items
    - Domenic will ping Dom Farolino in case he has context around [[images] Lazy loading and out of band loads](https://github.com/whatwg/html/issues/10671).
      - Done. Adding more WPT tests will help.
      - [There are some already](https://wpt.fyi/results/html/semantics/embedded-content/the-img-element/update-the-image-data/lazy-out-of-band-load.html?label=experimental&label=master&aligned)
  - Carryovers from last time
    - Anne will check with Ryosuke on his concern in [Atomic move operation for element reparenting & reordering](https://github.com/whatwg/dom/issues/1255).
      - The concern was not a strong one. Agreement from the group to not fire any other events after the move.
    - Khushal will incorporate the feedback to the [Canvas Place Element](https://github.com/whatwg/html/issues/10650) explainer.
      - No updates.
  - New topics
    - [Joey] [Customizable \<select> element](https://github.com/whatwg/html/issues/9799)
      - Anne will take a closer look at the PR. We will reconsider the question of whether this is ready for stage 3 in 2 weeks.
    - [Alex] [Add expect-no-linked-resources Document-Policy to Speculative parsing](https://github.com/whatwg/html/pull/10718)
      - Olli and Anne will review Alex's latest comment and we'll discuss it again in the future.
    - [Dom/Noam]: Proposal to move [atomic move](https://github.com/whatwg/dom/pull/1307) to stage 3
      - Carry over.
- Upcoming WHATNOT meeting on 2024-11-14 · Issue #10750 · whatwg/html
  - https://github.com/whatwg/html/issues/10750
  - Review past action items
    - Domenic will ping Dom Farolino in case he has context around [[images] Lazy loading and out of band loads](https://github.com/whatwg/html/issues/10671).
      - Done. Adding more WPT tests will help.
      - [There are some already](https://wpt.fyi/results/html/semantics/embedded-content/the-img-element/update-the-image-data/lazy-out-of-band-load.html?label=experimental&label=master&aligned)
  - Carryovers from last time
    - Anne will check with Ryosuke on his concern in [Atomic move operation for element reparenting & reordering](https://github.com/whatwg/dom/issues/1255).
      - The concern was not a strong one. Agreement from the group to not fire any other events after the move.
    - Khushal will incorporate the feedback to the [Canvas Place Element](https://github.com/whatwg/html/issues/10650) explainer.
      - No updates.
  - New topics
    - [Joey] [Customizable \<select> element](https://github.com/whatwg/html/issues/9799)
      - Anne will take a closer look at the PR. We will reconsider the question of whether this is ready for stage 3 in 2 weeks.
    - [Alex] [Add expect-no-linked-resources Document-Policy to Speculative parsing](https://github.com/whatwg/html/pull/10718)
      - Olli and Anne will review Alex's latest comment and we'll discuss it again in the future.
    - [Dom/Noam]: Proposal to move [atomic move](https://github.com/whatwg/dom/pull/1307) to stage 3
      - Carry over.
- Upcoming WHATNOT meeting on 2024-11-21 · Issue #10765 · whatwg/html
  - https://github.com/whatwg/html/issues/10765
  - Review past action items
    - Panos will file a meta issue to clarify what stage 3 means. Domenic will add some examples of how he imagines this should work.
      - [Done](https://github.com/whatwg/meta/issues/336).
    - Di will add a comment with the current consensus to [Discussing how to focus navigate absolute position elements that are focusable in CSS reading-flow](https://github.com/whatwg/html/issues/10539).
      - [Done](https://github.com/whatwg/html/issues/10539#issuecomment-2477750095). [PR](https://github.com/whatwg/html/pull/10613) review feedback would be appreciated as well as vendor position statements. Anne & Dom will take a look next week.
    - Domenic will add some thoughts to [Deferring (same-origin) navigation commit](https://github.com/whatwg/html/issues/10716).
      - More feedback is welcome.
  - Carryovers from last time
    - Olli and Anne will review Alex's latest comment in [Add expect-no-linked-resources Document-Policy to Speculative parsing](https://github.com/whatwg/html/pull/10718).
      - Olli commented.
  - New topics
    - [Stephen] [Canvas TextMetrics additions for editing and text styling](https://github.com/whatwg/html/issues/10677)
      - Stephen will look into consistency with the intl.Segmenter API and update the explainer.
    - [Dom] [Atomic move](https://github.com/whatwg/dom/pull/1307) stage 3
      - Existing comments have been addressed. Do we agree on the processing model enough to bump to stage 3? Olli will review the PR this week.
- Upcoming WHATNOT meeting on 2024-11-28 · Issue #10789 · whatwg/html
  - https://github.com/whatwg/html/issues/10789
- Meeting 10 for joint OpenUI-WHATWG/HTML-CSSWG task force on styleable form controls · Issue #10730 · whatwg/html
  - https://github.com/whatwg/html/issues/10730
  - [[css-ui] Colors to use for appearance:base \<select> w3c/csswg-drafts#10909](https://github.com/w3c/csswg-drafts/issues/10909)
  - [[css-ui] UA stylesheet for appearance:base \<select> w3c/csswg-drafts#10857](https://github.com/w3c/csswg-drafts/issues/10857)
  - [[select] keyboard behavior openui/open-ui#1087](https://github.com/openui/open-ui/issues/1087)
  - [[selectors-4] Should we have :open and :closed? w3c/csswg-drafts#11039](https://github.com/w3c/csswg-drafts/issues/11039)
- Meeting 11 for joint OpenUI-WHATWG/HTML-CSSWG task force on styleable form controls · Issue #10778 · whatwg/html
  - https://github.com/whatwg/html/issues/10778
  - [[selectors-4] Should we have :open and :closed? w3c/csswg-drafts#11039](https://github.com/w3c/csswg-drafts/issues/11039)
  - [[css-ui] Colors to use for appearance:base \<select> w3c/csswg-drafts#10909](https://github.com/w3c/csswg-drafts/issues/10909)
  - [[css-ui] UA stylesheet for appearance:base \<select> w3c/csswg-drafts#10857](https://github.com/w3c/csswg-drafts/issues/10857)

#### Other

- **W3C opens Technical Architecture Group (TAG) election**
  - https://www.w3.org/news/2024/w3c-opens-technical-architecture-group-tag-election/
- **W3C receives Ford Foundation core funding toward development of web accessibility work**
  - https://www.w3.org/news/2024/w3c-receives-ford-foundation-core-funding-toward-development-of-web-accessibility-work/
- **TPAC 2025**
  - https://www.w3.org/events/tpac/2025/tpac-2025/

### TC39 動向

#### Meeting

- Meeting Note が公開された時だけやる、それ以外はやらない。
- 2024-10
  - https://github.com/tc39/agendas/blob/main/2024/10.md
  - https://github.com/tc39/notes/tree/main/meetings/2024-10
  - https://docs.google.com/document/d/1qXUf4QRTbexUj0fg2sgYTxWwOT2v_q7lmjR282BOWLU/edit
- TG4
  - Source Map 2024 の spec 完了
    - https://tc39.es/source-map/2024/
  - 60 日間レビュワーに見てもらう
  - Google / Mozilla のライセンスを Ecma に移す
  - その後、Ecma で GA にする Approval をもらう
- JSSugar/JS0
  - TC39 の仕様が増えてきた
  - 全部をエンジンに入れていくのは負荷が高い
  - Tool で解決できるものもある
  - 仕様を分けてはどうか?
  - JSSugar
    - Transpile/Polyfill できる機能
    - Tool 間互換のため標準自体は作る
  - JS0
    - エンジンに実装する機能
- Temporal
  - Champion から Ship するように実装に伝えている
  - Firefox Nightly は ICU4X 少し直したら出る
- Map.getOrInsert
  - Map.emplace から rename
- Decimal
  - 有効数字の概念を消す
  - 精度付き計算は別 proposal
    - https://github.com/nicolo-ribaudo/proposal-numeric-with-precision
- Restricting subclassing of built-ins
  - [Symbol.species]を消せるかどうかの話
  - TypedArray、ArrayBuffer、SharedArrayBuffer では消すことになった

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2024-09-01}...main@{2024-11-01}
- 0->1
  - Array.zip
  - Immutable ArrayBuffers
  - Representing Measures
- 1->2
  - Structs
  - Extractors
  - Iterator chunking
- 2->2.7
  - Iterator Sequencing
  - Error.isError
- 2.7->3
  - Atomics.pause
- 3->4
  - RegExp Modifiers
  - Import Attr & JSON Modules
  - Sync Iterator Helpers
  - Promise.try

#### New Proposals

#### WinterCG

- https://github.com/wintercg/admin/issues
- 2024-11-14 meeting agenda · Issue #77 · wintercg/admin
  - https://github.com/wintercg/admin/issues/77
  - Cancel
- 2024-11-21 Standardization meeting · Issue #78 · wintercg/admin
  - https://github.com/wintercg/admin/issues/78
  - runtime keys
  - navigator registry
  - Import.meta
  - function api

#### Other

- Summary of the October-2024 TC39 plenary
  - https://blogs.igalia.com/compilers/2024/11/13/summary-of-the-october-2024-tc39-plenary/
- **Deno v. Oracle: Canceling the JavaScript Trademark**
  - https://deno.com/blog/deno-v-oracle
  - https://www.publickey1.jp/blog/24/javascriptdeno.html

### IETF 動向

#### IETF121

- HTTP Working Group Minutes - IETF 121
  - https://httpwg.org/wg-materials/ietf121/minutes.html
  - [Monday, 4 November 2024](https://httpwg.org/wg-materials/ietf121/minutes.html#monday-4-november-2024)
    - [Active Drafts](https://httpwg.org/wg-materials/ietf121/minutes.html#active-drafts)
      - [Resumable Uploads](https://httpwg.org/wg-materials/ietf121/minutes.html#resumable-uploads)
      - [QUERY Method](https://httpwg.org/wg-materials/ietf121/minutes.html#query-method)
      - [Cache Groups](https://httpwg.org/wg-materials/ietf121/minutes.html#cache-groups)
    - [Other Topics](https://httpwg.org/wg-materials/ietf121/minutes.html#other-topics)
      - [Incremental HTTP Messages](https://httpwg.org/wg-materials/ietf121/minutes.html#incremental-http-messages)
      - [The HTTP Wrap Up Capsule](https://httpwg.org/wg-materials/ietf121/minutes.html#the-http-wrap-up-capsule)
      - [Guidance for HTTP Capsule Protocol Extensibility](https://httpwg.org/wg-materials/ietf121/minutes.html#guidance-for-http-capsule-protocol-extensibility)
      - [Cookie eviction](https://httpwg.org/wg-materials/ietf121/minutes.html#cookie-eviction)
  - [Thursday, 7 November 2024](https://httpwg.org/wg-materials/ietf121/minutes.html#thursday-7-november-2024)
    - [AD-Requested Feedback](https://httpwg.org/wg-materials/ietf121/minutes.html#ad-requested-feedback)
    - [Active Drafts](https://httpwg.org/wg-materials/ietf121/minutes.html#active-drafts-1)
      - [Template-Driven CONNECT for TCP](https://httpwg.org/wg-materials/ietf121/minutes.html#template-driven-connect-for-tcp)
      - [Security Considerations for Optimistic Use of HTTP Upgrade](https://httpwg.org/wg-materials/ietf121/minutes.html#security-considerations-for-optimistic-use-of-http-upgrade)
      - [No-Vary-Search](https://httpwg.org/wg-materials/ietf121/minutes.html#no-vary-search)
    - [Other Topics](https://httpwg.org/wg-materials/ietf121/minutes.html#other-topics-1)
      - [The IP Geolocation HTTP Client Hint](https://httpwg.org/wg-materials/ietf121/minutes.html#the-ip-geolocation-http-client-hint)

#### WG

- RFC
  - RFC 9649 on WebP Image Format
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/HdFhz6d0gj17_i1ymRTjux1z8vI/
- Work
  - [httpapi] I-D Action: draft-ietf-httpapi-api-catalog-06.txt
    - https://mailarchive.ietf.org/arch/msg/httpapi/6lAqDoH4s2Cy76Qxpnx0984i0YQ/
- Meeting

#### Other

### CDN 動向

#### Cloudflare

- A look at the latest post-quantum signature standardization candidates
  - https://blog.cloudflare.com/another-look-at-pq-signatures/

#### Fastly

- What Fastly saw on election night | Fastly
  - https://www.fastly.com/blog/what-fastly-saw-on-election-night
- Speeding up JavaScript on Compute | Fastly
  - https://www.fastly.com/blog/speeding-up-javascript-on-compute
- War story: RPKI is working as intended | Fastly
  - https://www.fastly.com/blog/war-story-rpki-is-working-as-intended
- **The History of DDoS | Fastly**
  - https://www.fastly.com/blog/the-history-of-ddos

#### Other

### セキュリティ動向

- **Okta AD/LDAP Delegated Authentication - Username Above 52 Characters Security Advisory**
  - https://trust.okta.com/security-advisories/okta-ad-ldap-delegated-authentication-username/
- **パスワード漏洩、3 年で 7 割増 「123456」なお最多 - 日本経済新聞**
  - https://www.nikkei.com/article/DGXZQOUC035700T01C24A0000000/
- **Top 200 Most Common Passwords | NordPass**
  - https://nordpass.com/most-common-passwords-list/
- **Phishing emails increasingly use SVG attachments to evade detection**
  - https://www.bleepingcomputer.com/news/security/phishing-emails-increasingly-use-svg-attachments-to-evade-detection/
- **高市氏、通信傍受の強化検討を 闇バイト強盗事件の対策巡り|47NEWS(よんななニュース)**
  - https://www.47news.jp/11816046.html
- **「Bing Wallpaper」の動きがどうも怪しい ～海外のオンラインソフト作家が注意喚起 - やじうまの杜 - 窓の杜**
  - https://forest.watch.impress.co.jp/docs/serial/yajiuma/1642305.html

### 周辺動向

- When is the right time to share our excitement about new web features? - Rachel Andrew
  - https://rachelandrew.co.uk/archives/2024/11/15/when-is-the-right-time-to-share-our-excitement-about-new-web-features/
- **The `<details>` and `<summary>` elements are getting an upgrade - Stephanie Stimac's Blog**
  - https://blog.stephaniestimac.com/posts/2024/10/html-details-and-summary-update/
  - ::details-content で details の summary 以外を選べる
  - display の制限をなくして flex/grid を使いやすくする
  - ::marker で三角の開閉アイコンを変えられるようにする
- Caret Customization on the Web
  - https://blogs.igalia.com/schenney/caret-customization-on-the-web/
  - `caret-animation` の話
- **We're forking Flutter. This is why.**
  - https://getflocked.dev/blog/posts/we-are-forking-flutter-this-is-why/
  - Flutter をフォークしメンテする
  - Google はもう AI などにフォーカスして Flutter に投資してなさそう
  - メンテナも少なくてレビューも滞りがち
  - フォークして改善したい
- Igalia WebKit Team | WebKit Igalia Periodical #1
  - https://blogs.igalia.com/webkit/blog/2024/wip-1/
- Igalia WebKit Team | WebKit Igalia Periodical #2
  - https://blogs.igalia.com/webkit/blog/2024/wip-2/
- The 2024 Web Almanac
  - https://almanac.httparchive.org/en/2024/
- State of HTML 2024
  - https://2024.stateofhtml.com/
- **The State of ES5 on the Web - Philip Walton**
  - https://philipwalton.com/articles/the-state-of-es5-on-the-web/
  - トランスパイル結果が ES5 デフォルトで無駄なコードを含むライブラリが多い
  - CrUX で上位 10000 サイトの 89%が ES6+コードを含む
  - 68%では ES5 ヘルパーコードと ES6 が混在してる
  - ライブラリが Baseline 対応すれば、これが消していけるはず
- ドメイン名の終活について - JPAAWG 7th - - Speaker Deck
  - https://speakerdeck.com/mikit/domeinming-nozhong-huo-nituite-jpaawg-7th
- **The Chagos Archipelago and the .io domain**
  - https://www.icann.org/en/blogs/details/the-chagos-archipelago-and-the-io-domain-14-11-2024-en
- **日本の IPv6 採用状況が 50%を超えている件について:Geek なぺーじ**
  - https://www.geekpage.jp/blog/?id=2024-11-23-1
- **The Browser Choice Alliance**
  - https://browserchoicealliance.org/
  - MS が Windows のデフォルトブラウザを設定しにくくしている
  - 公平な競争を求める非公式のアライアンスを設立
  - Vivaldi、Opera、Chrome、Wavebox、Waterfox が参加
  - Browser Choice Alliance | Vivaldi Browser
    - https://vivaldi.com/blog/browser-choice-alliance-launch/
- **100 patches to 5 browsers in 18 months - Keith Cirkel**
  - https://www.keithcirkel.co.uk/100-patches-to-5-browsers-in-18-months/

### Cookie 動向

- **Investigation into Google's 'Privacy Sandbox' browser changes - GOV.UK**
  - https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes
  - https://assets.publishing.service.gov.uk/media/62052c6a8fa8f510a204374a/100222_Appendix_1A_Google_s_final_commitments.pdf
  - https://assets.publishing.service.gov.uk/media/6731ffb00d90eee304badaff/CMA_s_Q2_to_Q3_2024_report.pdf
  - https://assets.publishing.service.gov.uk/media/6731fad40d90eee304badaf6/Google_s_Q2_to_Q3_2024_report.pdf
  - CMA の Q2-Q3 レポートが公開された
  - Google がアプローチ変更を公開した件も触れている
  - 具体的な内容が出てないので、CMA としてもそれ以前の話しか触れてない
  - 「ここまでのコミットメントについては守られてた、今後はコミットメント自体の更新も必要」
  - 「競争上の懸念は依然あるので、引き続き監視を続ける」
  - UI などの具体的な話はまだなし
- **STRIGHT | クッキーバナーを出さない新しいプライバシーツール**
  - https://www.bizris.com/stright/jp
  - https://www.iij.ad.jp/news/pressrelease/2024/1029.html
  - https://forest.watch.impress.co.jp/docs/news/1635467.html

### イベント

- 11 月
  - 11: CMA の Q2-Q3 レポート
    - https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes
  - 02-08: IETF 121 Dublin
    - https://www.ietf.org/meeting/121/
- 12 月
  - 2-5: TC39 Remote
    - https://github.com/tc39/agendas/blob/main/2024/12.md
- 1 月
  - 20: Web 技術年末試験 2024
    - TODO

### Wrap Up

- Chrome
  - 131
    - `<details>` styling improvements
    - @page margin boxes
  - 132 beta
    - CSS anchor-size() in inset/margin
    - CSS sideways writing modes
    - dialog toggle events
    - Request/Response.bytes()
    - Ignore Strict-Transport-Security for localhost
    - WebAuthn Signal API
    - OT: Explicit Compile Hints with Magic Comments
  - Ship
    - CSS nested pseudo elements styling (::before::marker)
    - CSS Scroll State CQ
    - Element Capture
    - popover=hint
    - Atomics.pause
    - Popover invoker
    - multiple import maps
    - Explicit resource management sync/async
    - CSS advanced attr()
    - scroll-snap-target
  - Prototype
    - dialog light dismiss
    - CSS inertness
    - aria-actions
    - Lightweight FedCM
    - clipboardchange event
  - Experiment
    - Document-Isolation-Policy
  - PSA
    - Web Platform Telemetry
  - Chrome Developers
    - seamless credential sharing
  - other
    - Q3 Security summary
    - Chrome 売却要求
- Firefox
  - 133
    - Bounce Tracking Protection
    - Uint8Array base64/hex
    - dialog toggle events
    - Fetch keepalive
  - Ship
    - Bounce Tracking Protection
    - Promise.try
    - RegExp escaping
  - Prototype
    - Scoped custom element registries
  - MDN Blog
    - OWD self-experimentation with CSP
  - Standard Position
    - positive: contentvisibilityautostatechange event
    - neutral: document subtitle
    - negative: page embedded permission control
  - other
    - Firefox 20 周年
    - Mozilla レイオフ
- Safari
  - TP207
    - input type=color の alpha 対応
    - Atomics.pause
    - Brotli Compression Stream
  - TP208
    - attr() fallback
    - Map.prototype.getOrInsert
  - Standard Position
    - DOM State-preserving move
    - Nested Declaration
  - Other
    - モバイル寡占に関する調査に Safari 追加
- Edge
  - Fiddler の開発秘話
  - Windows Hello がリブランド
- W3C/WHATWG
  - Draft
  - Open/UI
    - Select 周りの議論
  - WHATNOT meeting
    - Select 周りの議論
  - Other
    - TAG election start
    - Ford Foundation
    - TPAC2025 神戸
- TC39
  - Source Map の仕様完成
  - JSSugar/JS0
  - Temporal Ship 間近
  - Map.getOrInsert
  - Deno が Oracle に JS 商標削除要請
- WinterCG
- IETF
  - IETF121
- CDN 動向
- セキュリティ動向
  - Okta 52 文字脆弱性
  - 漏洩パスワードランキング
  - Phishing email using SVG
  - 高市氏、通信傍受強化検討
  - Bing Wallpaper
- 周辺動向
  - ::details-content blog
  - Forking Flutter
  - State of ES5 on the Web
  - .io domain の続報
  - 日本の IPv6 採用が 50%
  - Keith の 100patch to 5 browser in 18month
- Cookie 動向
  - CMA Q2-3 report
  - STRIGHT
