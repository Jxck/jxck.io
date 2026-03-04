---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep170.mp3
published_at: 2025-01-28
guests:
  - name: "@myakura"
    url: https://twitter.com/myakura
  - name: "@saku"
    url: https://x.com/sakupi01
---

# ep170 Monthly Platform 202501

## Theme

第 170 回のテーマは 2024 年 12 月と 2025 年 1 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 132

#### Updates

- **New in Chrome 132**
  - https://developer.chrome.com/blog/new-in-chrome-132
  - Dialog element toggle events
  - Element capture
  - The File System Access API on Android and WebView
- What's new in DevTools, Chrome 132
  - https://developer.chrome.com/blog/new-in-devtools-132
- Coming soon: What's new in DevTools, Chrome 133
  - https://developer.chrome.com/blog/new-in-devtools-133
- **Chrome 133 beta**
  - https://developer.chrome.com/blog/chrome-133-beta
  - CSS and UI
    - **CSS advanced `attr()` function**
    - CSS :open pseudo-class
    - **CSS scroll state container queries**
    - CSS text-box, text-box-trim, and text-box-edge
    - The hint value of the popover attribute
    - Popover invoker and anchor positioning improvements
    - Popover nested inside invoker shouldn't re-invoke it
  - Web APIs
    - Animation.overallProgress
    - The `pause()` method of the Atomics object
    - CSP hash reporting for scripts
    - **DOM state-preserving move**
    - Expose attributionsrc attribute on `<area>`
    - Expose coarsened cross-origin renderTime in element timing and LCP (regardless of Timing-Allow-Origin)
    - Revert responseStart and introduce firstResponseHeadersStart
    - The FileSystemObserver interface
    - Freezing on Energy Saver
    - Multiple import maps
    - Storage Access Headers
    - Support creating ClipboardItem with `Promise<DOMString>`
    - WebAssembly Memory64
    - ​​Web Authentication API: PublicKeyCredential `getClientCapabilities()` method
    - WebGPU: 1-component vertex formats (and unorm8x4-bgra)
    - X25519 algorithm of the Web Cryptography API
  - New origin trials
    - Opt out of freezing on Energy Saver
  - Deprecations and removals
    - Deprecate the WebGPU maxInterStageShaderComponents limit
    - **Remove `<link rel=prefetch>` five-minute rule**
    - Remove Chrome Welcome page triggering with initial prefs first run tabs

  #### Intents

- Ship: CSS dynamic-range-limit property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cG_ZCeQaWQs
- Ship: `FileSystemFileHandle.move()` for local files
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ogS8CeyZ3n8
- **Ship: removing the five-minute rule for `<link rel=prefetch>`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Zdo71C0k9C0
- Ship: Send "Referer" header in reportEvent/automatic beacons
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_BT8FC4PVYI
- Ship: CSP hash reporting for scripts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zPaPnwLZ1fc
- Ship: CSS :open pseudo-class
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Pdo4oOXYKcA
- Ship: Document-Policy: expect-no-linked-resources
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XJJq2VEpAvY
- Ship: CSS text-box, text-box-trim and text-box-edge
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4NeTpgsi64A
- Ship: Protected Audience (B&A) - Selectable Reporting IDs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/saFkCnhdfAs
- Ship: Protected Audience (B&A) - Private Aggregation & downsampling forDebuggingOnly reporting
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5CZ9X8htGeg
- Ship: Add MediaStreamTrack support to the Web Speech API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4ibjEVQ-i0s
- Ship: FileSystemObserver
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6oOaFmia2dc
- Ship: Allow Reading Interest Groups in Shared Storage Worklet
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6UGf5PAt8eY
- Ship: Adding Web Locks Support to Shared Storage
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8kNUZpULS-I
- Ship: Storage Access Headers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gERgwZfN_-E?pli=1
- Ship: Error.isError
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZJDm9ejcNLw?pli=1
- Ship: WebGPU Subgroups experimentation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xteMk_tObgI?pli=1
- **Ship: On-device Web Speech API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VNOok2dbmHM
- Ship: Protected Audience: Trusted Key-Value Server Support
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fH8u7ZTNZg8
- Ship: :has-slotted pseudo selector
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/o3ja7zaKuls
- **Ship: Dialog light dismiss**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_pIOAyg1_E0/m/DnkvfQLVDgAJ
- **Ship: Customizable select**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kN5LTzuTLVs/m/6HqTsmk3EQAJ
- **Prototype: Signature-based Integrity**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XSGk_MqZAuQ
- **Prototype: ShadowRealm**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xcfT92S2Xno
- **Prototype: CSS `shape()` function**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hEa24Qll3dg
- **Prototype: contentEncoding in resource-timing**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fTt7dGZcQ80
- **Prototype: Language support for CanvasTextDrawingStyles**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WEjhPwI6lLc
- Prototype: Bounce Tracking Mitigations on HTTP Cache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xQRlzH0xbP4
- **Prototype: HSTS Tracking Prevention**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cvzGZoulIeY
- Prototype: Handwriting keyword for "touch-action" CSS property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/P54AK0xznhQ?pli=1
- Prototype: Clipboard contentsID
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wBqYb_rUHes
- Prototype: getContextAttributes for OffscreenCanvasRenderingContext2D
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SHqWTBC8B2Y
- Extend Experiment: FedCM multi IDP in single `get()` call
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ggf21aIkn18
- Extend Experiment: Storage Access Headers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5-SQmyp95U0
- Ready for Developer Testing: Delegation-oriented FedCM
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/n02b34dFACc
- PSA: New WebView webexposed tests to run on CQ
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hQHeD2u-IEY
- PSA: CSS view transitions: match-element is temporarily disallowed as a view-transition-name
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-JZw13OoquU
- PSA: ReportEcn for QUIC on by default
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8iqtb0yFvCM?pli=1
- Web-Facing Change PSA: Fix mouse focus for slotted elements in Shadow DOM
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GZxloVdjdgU
- Web-Facing Change PSA: Predictable reported storage quota
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7q0YGQNVkjs
- Web-Facing Change PSA: Support ImageSmoothingQuality in PaintCanvas
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jDvKH3Ib3ZI?pli=1
- Web-Facing Change PSA: Expose CSSFontFeaturesValueRule
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zqC2dYxKpQw
- FYI: Planning to change layout tests on Mac-ARM from using Skia-Ganesh to using Skia-Graphite imminently
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/p96GK5F89QA

  #### Other

- web.dev
  - New to the web platform in November
    - https://web.dev/blog/web-platform-11-2024
  - What do the State of CSS and HTML surveys tell us?
    - https://web.dev/blog/state-of-css-html-2024
  - **Baseline 2024: more tools to help web developers**
    - https://web.dev/blog/baseline-project-2024
  - New to the web platform in December
    - https://web.dev/blog/web-platform-12-2024
  - Build local and offline-capable chatbots
    - https://web.dev/blog/build-ai-chatbot-series
  - Build a local and offline-capable chatbot with WebLLM
    - https://web.dev/articles/ai-chatbot-webllm
  - Build a local and offline-capable chatbot with the Prompt API
    - https://web.dev/articles/ai-chatbot-promptapi
  - Benefits and limits of large language models
    - https://web.dev/articles/ai-llms-benefits
  - Simpler WebAuthn feature detection with `getClientCapabilities()`
    - https://web.dev/articles/webauthn-client-capabilities
- google for developers
  - https://developers.googleblog.com/
  - Unlocking the Potential of Quantum Computing: A Developer's Guide to Error Correction
    - https://developers.googleblog.com/en/unlocking-the-potential-of-quantum-computing-a-developers-guide-to-error-correction/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - **Preserve state during DOM mutations with `moveBefore()`**
    - https://developer.chrome.com/blog/movebefore-api
  - Deprecation of the Performance Insights panel
    - https://developer.chrome.com/blog/insights-panel-deprecation
  - CSS Wrapped 2024
    - https://developer.chrome.com/blog/css-wrapped-2024
  - Record and analyze a performance trace with DevTools
    - https://developer.chrome.com/blog/devtools-tips-39
  - Chrome's 2024 recap for devs: Re-imagining the web with AI in DevTools, built-in Gemini, and new UI capabilities
    - https://developer.chrome.com/blog/chrome-2024-recap
    - Built-in AI in Chrome helps developers deliver powerful features with Gemini
    - On-device AI gets a boost with WebAssembly (Wasm) and WebGPU enhancements
    - View Transition API makes sites feel more connected than ever with frictionless navigation
    - CSS popover and anchor positioning enables interactive overlays without JavaScript
    - Speculation Rules API unlocks near-instant navigation by prerendering pages
    - Interaction to Next Paint (INP) becomes a Core Web Vital
    - Autofill lets you delight users with smoother online checkouts
    - Chrome DevTools levels up with AI-powered solutions
    - Baseline 2024 brings developers new cross-browser web features
    - Major browsers make more features Baseline with Interop 2024
  - **Findings from the customizable select request for developer feedback form**
    - https://developer.chrome.com/blog/rfc-customizable-select-findings
  - **Autofill in action: real-world insights**
    - https://developer.chrome.com/blog/autofill-insights-2024
  - How we introduced Gemini to Chrome DevTools
    - https://developer.chrome.com/blog/how-we-introduced-gemini-to-devtools
  - **CSS text-box-trim**
    - https://developer.chrome.com/blog/css-text-box-trim
  - Support for the Web Vitals extension has ended
    - https://developer.chrome.com/blog/web-vitals-extension-merged
  - Winners of the Built-in AI Challenge
    - https://developer.chrome.com/blog/ai-challenge-winners
  - What's New in WebGPU (Chrome 132)
    - https://developer.chrome.com/blog/new-in-webgpu-132
- chromium blog
  - Chromium Blog: How Chrome doubled its Speedometer scores on Android
    - https://blog.chromium.org/2024/12/doubling-speedometer-scores-android.html
  - Chromium Blog: Making Chrome QUICer
    - https://blog.chromium.org/2024/12/making-chrome-quicer.html
  - **Chromium Blog: Announcing Supporters of Chromium-based Browsers**
    - https://blog.chromium.org/2025/01/announcing-supporters-of-chromium-based.html
    - Linux Foundation とパートナーシップをむすび Supporters of Chromium-based Browsers を設立
    - **Supporters of Chromium-Based Browsers**
      - https://www.linuxfoundation.org/supporters-of-chromium-based-browsers
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
- google bug hunters
  - **The Great Google Password Heist: 15 years of hacking passwords to test our security (and build team culture!) - Google Bug Hunters**
    - https://bughunters.google.com/blog/6355265783201792/the-great-google-password-heist-15-years-of-hacking-passwords-to-test-our-security-and-build-team-culture
    - チームメイトが Google をやめるとき、その人のパスワードを攻撃によって探り当てる文化
    - それにより判明した脆弱性などにより、サービスが改善されていく
- search blog
  - https://developers.google.com/search/
  - Crawling December: The how and why of Googlebot crawling
    - https://developers.google.com/search/blog/2024/12/crawling-december-resources
  - Crawling December: HTTP caching
    - https://developers.google.com/search/blog/2024/12/crawling-december-caching
  - Crawling December: CDNs and crawling
    - https://developers.google.com/search/blog/2024/12/crawling-december-cdns
  - Crawling out of December: the 2024 recap
    - https://developers.google.com/search/blog/2024/12/crawling-out-of-december
- v8
  - https://v8.dev/
- other
  - Introducing Eclipsa Audio: immersive audio for everyone | Google Open Source Blog
    - https://opensource.googleblog.com/2025/01/introducing-eclipsa-audio-immersive-audio-for-everyone.html
    - AOMedia の空間オーディオフォーマット

  ### Firefox 動向

  #### Stable: 134.0.2

  #### Updates

- **Firefox 134 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/134
    - `RegExp.escape()`
    - `Promise.try()`
- Firefox 134.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/134.0/releasenotes/
    - HEVC playback on Windows
- Learning and Improving Every Day - These Weeks in Firefox: Issue 173
  - https://blog.nightly.mozilla.org/2024/12/06/learning-and-improving-every-day-these-weeks-in-firefox-issue-173/
- **Key Improvements - These Weeks in Firefox: Issue 174 - Firefox Nightly News**
  - https://blog.nightly.mozilla.org/2025/01/13/key-improvements-these-weeks-in-firefox-issue-174/
  - コンソールのコマンドに Shadow DOM を含めた要素を取得する `$$$` が追加
- New Year New Tab - These Weeks in Firefox: Issue 175
  - https://blog.nightly.mozilla.org/2025/01/24/new-year-new-tab-these-weeks-in-firefox-issue-175/

  #### Intents

- **Ship: High-precision coordinates, i.e., fractional coordinates, of PointerEvents in Nightly builds**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/eXuAe5aDsLU
- Ship: :has-slotted pseudo class
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/-CXs-Hbt4ws
- Ship: Standardized pointer boundary event behavior when the last `pointerover` target is removed
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/5b-V-dkiMwI
- Ship: Intl.DurationFormation
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/XHbEboeb0G0
- Prototype: SVG new path data API
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/i-F57-F7--4
- Prototype and Ship: Referrer from refresh
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Eohf1MXoaT4
- Unship: -moz-user-input
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/1Jj_20G7ESc
- Introducing the Chrome Extension for the Firefox Profiler
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/W4fdQNmdjzs
- Landed again the patches for cleaning bogus `<br>`'s up when unnecessary
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/UH-wF4dY7Mc
- PSA: Avoid Inline event handlers in the Firefox UI
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/xPUwmty-xp0
- Inquiry Regarding Firefox's Handling of Multiple CA Certificates in Chain Building
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/zoElyUK20bE

  #### Newsletter

- Engineering Effectiveness Newsletter (October / November Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/7cOaVfhv5mU
- Firefox DevTools Newsletter - 133 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-133/
- Firefox WebDriver Newsletter 134 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-134/

  #### MDN / Open Web Docs

- A new learning experience on MDN
  - https://developer.mozilla.org/en-US/blog/curriculum-learn-web-development/
- Countdown to the holidays with daily coding challenges
  - https://developer.mozilla.org/en-US/blog/daily-holiday-javascript-challenges/
- MDN 2024 content projects
  - https://developer.mozilla.org/en-US/blog/mdn-2024-content-projects/
  - HTTP, MathML, Web Manifest にフォーカスしてコンテンツを更新
  - Temporal の巨大な PR も出ていてレビュー中
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal
- Fix your website's Largest Contentful Paint by optimizing image loading
  - https://developer.mozilla.org/en-US/blog/fix-image-lcp/
- JavaScript Temporal is coming
  - https://developer.mozilla.org/en-US/blog/javascript-temporal-is-coming/

  #### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2025-01-01+
- Positive
  - On-device Web Speech API
    - https://github.com/mozilla/standards-positions/issues/1157
  - CSS Scoping :has-slotted pseudo
    - https://github.com/mozilla/standards-positions/issues/1079

  #### Other

- Announcing Faster, Lighter Firefox Downloads for Linux with .tar.xz Packaging!
  - https://blog.nightly.mozilla.org/2024/11/28/announcing-faster-lighter-firefox-downloads-for-linux-with-tar-xz-packaging/
- Celebrating 20 years of Firefox with 20 red panda cams
  - https://blog.mozilla.org/en/products/firefox/red-panda-cams/
- Using trusted execution environments for advertising use cases
  - https://blog.mozilla.org/en/products/advertising/using-trusted-execution-envrionments-for-advertising-use-cases/
- **Reclaim the internet: Mozilla's rebrand for the next era of tech**
  - https://blog.mozilla.org/en/mozilla/mozilla-brand-next-era-of-tech/
- How do we preserve the integrity of business metrics while safeguarding our users privacy choice? - Data@Mozilla
  - https://blog.mozilla.org/data/2024/12/06/how-do-we-preserve-the-integrity-of-business-metrics-while-safeguarding-our-users-privacy-choice/
- Introducing Uniffi for React Native: Rust-Powered Turbo Modules - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2024/12/introducing-uniffi-for-react-native-rust-powered-turbo-modules/
- **Proposed contractual remedies in United States v. Google threaten vital role of independent browsers**
  - https://blog.mozilla.org/en/mozilla/internet-policy/google-remedies-browsers/
  - 米司法省が Google に対して提示した独占禁止是正措置に対して
  - これは、Firefox のような独立ブラウザに対して資金調達を妨げる
  - 最終的には Web 自体に害を与えることになりかねない
  - 意訳: ブラウザエンジン自体がきちんと公平性に注意を払ってるから素人が余計なことするな
- Mozilla welcomes new executive team members
  - https://blog.mozilla.org/en/mozilla/new-executives/
- Introducing the Chrome Extension for the Firefox Profiler - Mozilla Performance
  - https://blog.mozilla.org/performance/2024/12/12/introducing-the-chrome-extension-for-the-firefox-profiler/
- **Mozilla partners with Ecosia for a better web**
  - https://blog.mozilla.org/en/mozilla/firefox-ecosia-partnership/
- How to get started on open-source development
  - https://blog.mozilla.org/en/mozilla/how-to-get-started-open-source-development/
- Firefox on macOS: now smaller and quicker to install!
  - https://blog.nightly.mozilla.org/2025/01/23/firefox-on-macos-now-smaller-and-quicker-to-install/
- **Announcing the WebExtensions ML API - Mozilla Add-ons Community Blog**
  - https://blog.mozilla.org/addons/2025/01/22/announcing-the-webextensions-ml-api/
- Running Inference In Web Extensions
  - https://blog.mozilla.org/en/mozilla/ai/ai-tech/running-inference-in-web-extensions/

  ### Safari 動向

  #### Stable: 18.2

  #### Updates

- Release Notes for Safari Technology Preview 209 | WebKit
  - https://webkit.org/blog/16296/release-notes-for-safari-technology-preview-209/
  - Browser
  - CSS
  - Rendering
  - Scrolling
    - Added support for Scroll To Text Fragment feature detection with document.fragmentDirective.
  - SVG
  - Text
  - Web API
  - Web Extensions
  - Web Inspector
    - Added the ability to modify only the headers of a request using a Request Local Override.
- WebKit Features in Safari 18.2
  - https://webkit.org/blog/16301/webkit-features-in-safari-18-2/
  - CSS
    - Text box
    - View Transitions
      - @view-transition
    - Backgrounds on borders
    - Division by units and other complex calculations
    - Sidelines
    - Ruby
    - Scrollbars
    - Scroll to Text Fragments
    - And more CSS
  - Spatial videos and photos
  - WebXR
  - Genmoji
  - Media
  - HTML
    - blocking=render
  - WebAssembly
  - Web API
  - JavaScript
    - Promise.try()
    - RegExp.escape()
  - Security and Privacy
  - Web Inspector
  - WebDriver
  - WKWebView
  - Bug Fixes and more
    - Accessibility
    - Browser
    - Canvas
    - CSS
    - Editing
    - Forms
    - History
    - JavaScript
    - Media
    - PDF
    - Rendering
    - Security
    - SVG
    - Web Animations
    - Web API
    - Web Apps
    - WebDriver
    - Web Inspector
    - WebXR
    - WKWebView
- Release Notes for Safari Technology Preview 210 | WebKit
  - https://webkit.org/blog/16406/release-notes-for-safari-technology-preview-210/
  - CSS
    - Added support for the text-autospace property.
  - DOM
    - Added support for the `::details-content` pseudo-element.
  - JavaScript
  - Rendering
    - Implemented `<details>` and `<summary>` disclosure triangle as a list item.
  - Web Animations
    - Added preview support for Scroll-driven Animations.
  - Web API
  - Web Extensions
    - Added support for documentId in webNavigation.
  - Web Inspector
    - Added support for sending Android user agents using the device override menu when Web Inspector is connected to a remote device.
- Release Notes for Safari Technology Preview 211 | WebKit
  - https://webkit.org/blog/16435/release-notes-for-safari-technology-preview-211/
  - Canvas
    - Added CanvasRenderingContext2D support for unprefixed letterSpacing and wordSpacing.
    - Removed support for webKitBackingStorePixelRatio.
    - Removed support for the prefixed webkitImageSmoothingEnabled to use the standard
  - CSS
  - JavaScript
    - Added support for Error.isError.
    - Added "never" and "formalSymbol" to the currencyDisplay option for Intl.NumberFormat.
  - Media
  - Rendering
  - Web API
    - **Added an option to set the popover's invoker from an imperative API.**
    - **Added support for Declarative Web Push.**
    - Added support for X25519 for Web Cryptography.
  - Web Extensions
    - Added support for documentId to webRequest.
    - Added support for documentId to scripting and tabs.
- **The success of Interop 2024! | WebKit**
  - https://webkit.org/blog/16413/the-success-of-interop-2024/
  - 2024 年の成果
  - URL の WPT が 80% 未満だったが 94.5% まで上がった。
  - a11y についても 1500 のテストが追加され 99.7% 通っている
  - font-size-adjust が全ブラウザに実装
  - Pinter/mouse event が 31.9% から 87.2% へ
  - その他
    - HTTP URLs for WebSocket
    - IndexedDB
    - Layout (Grid, Subgrid and Flexbox)
    - requestVideoFrameCallback
    - Scrollbar styling
    - Text Directionality (dir)
    - CSS Nesting
    - Custom Properties (@property)
    - Declarative Shadow DOM
    - Popover
    - Relative Color Syntax
    - text-wrap: balance
    - @starting-style
    - transition-behavior.
- Release Notes for Safari Technology Preview 212 | WebKit
  - https://webkit.org/blog/16445/release-notes-for-safari-technology-preview-212/
  - Authentication
    - Added support for setting a pin on a security key when a registration requires it.
  - Canvas
  - CSS
    - Added support for view-transition-name: match-element.
      - https://github.com/w3c/csswg-drafts/issues/10995
  - Forms
  - JavaScript
    - Added support for an in-place interpreter for Wasm.
  - Loading
  - Networking
    - **Added support for cookies' Partitioned attribute (opt-in partitioned cookies).**
  - PDF
  - Rendering
  - SVG
    - Added support for the lh length type.
  - Text
  - Web API
    - **Added support for element.focus({ focusVisible: true }).**
  - Web Inspector
    - Exposed cookie Partition Key in Web Inspector.

  #### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2025-01-01+
- Supported
  - WebGPU Subgroups
    - https://github.com/WebKit/standards-positions/issues/446
  - CSSPageRule to inherit from CSSGroupingRule
    - https://github.com/WebKit/standards-positions/issues/346

  #### Other

- **Apple Explains Why It Doesn't Plan to Create a Search Engine - MacRumors**
  - https://www.macrumors.com/2024/12/24/apple-explains-why-it-wont-make-search-engine/

  ### Edge 動向

  #### Stable: 132

  #### Updates

- **2024 Year-in-Review: A look back at your year with Microsoft Edge - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2024/12/19/2024-year-in-review-a-look-back-at-your-year-with-microsoft-edge/
  - https://www.microsoft.com/ja-jp/edge/update/year-in-review?ep=895&es=169&form=MO12L1&OCID=MO12L1&cs=866406680
  - 100 億回以上の AI Chat
  - 38 兆文字以上の自動翻訳
  - Drop で 4600 万件のメッセージ/ファイルをシェア
  - ショッピング機能で年平均 400 ドルの節約
  - MSN で 8 億以上の記事が閲覧
  - Bing の DAU が 1.4 億人を超える
  - スリーピングタブで 7 兆 MB 以上のメモリ節約
  - 1.8 兆個以上のトラッカーをブロック
  - 毎月 73 億以上のパスワードをパスワードモニターで保護
  - 14 億件以上のフィッシング/マルウェアをブロック
- **Microsoft joins the Supporters of Chromium-Based Browsers**
  - https://blogs.windows.com/msedgedev/2025/01/09/microsoft-joins-the-collective-to-support-chromium/
  - MS も協賛する
- Enhancing the security of Microsoft Edge Extensions with the new Publish API - What's next?
  - https://blogs.windows.com/msedgedev/2025/01/08/enhanced-security-for-extensions-with-publish-api-next-steps/
- Introducing Microsoft Edge Game Assist (Preview)-a seamless, full-featured in-game browser - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2024/11/22/introducing-microsoft-edge-game-assist-preview/

  #### Other

- **Bing tries to trick you into thinking you're using Google [Video]**
  - https://9to5google.com/2025/01/15/bing-trick-users-google/
  - Edge で Google と検索すると Google っぽい見た目の Bing が表示され、deceptive パターンとして顰蹙を買った

  ### WHATWG/W3C 動向

  #### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft

  #### Open UI

- openui/open-ui:
  - https://github.com/openui/open-ui/tree/main/meetings/telecon
  - open-ui/meetings/telecon/2024-12-12.md
    - https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-12-12.md
    - What should "nested" dialog light dismiss look like? #1128
    - [invokers] Should invokers on dialog have a cancel action? #938
    - Meter element states #1130
  - open-ui/meetings/telecon/2024-12-19.md
    - https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-12-19.md
    - Meter element states #1130
    - [interest invokers] Touch inputs #1052
    - [Interest invokers] Keyboard inputs #1133
  - open-ui/meetings/telecon/2025-01-09.md
    - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-01-09.md
    - Consider "toggle" (e.g., show/hide - expand/collapse) button or attribute #700
    - https://www.w3.org/2025/01/09-openui-minutes.html
  - open-ui/meetings/telecon/2025-01-16.md
    - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-01-16.md
    - [interest invokers] How to define/control the action on "losing interest" #1064
    - https://www.w3.org/2025/01/16-openui-minutes.html
- openui/design-system:
  - https://github.com/openui/design-system/tree/main/telecon
  - design-system/telecon/2025-01-21.md
    - https://github.com/openui/design-system/blob/main/telecon/2025-01-21.md
    - Decided to leverage badge as the first component to go through the process to refine the template and the process further
    - https://www.w3.org/2025/01/21-openui-minutes.html
- **Updates to the customizable select API:**
  - https://una.im/select-updates/
  - Chrome131 で Ship されていた Select parser relaxation が rollout
    - https://chromestatus.com/feature/5145948356083712
    - https://chromium-review.googlesource.com/c/chromium/src/+/6042039
    - https://github.com/whatwg/html/pull/10557#issuecomment-2515300782
  - Option が他のタグで囲まれてたら中身がうまくレンダーされなかったバグが原因
    - https://issues.chromium.org/issues/379034733#comment10
  - 133 から Finch
    - https://chromium-review.googlesource.com/c/chromium/src/+/6092097
  - Self-closing で動作しないバグ
    - https://issues.chromium.org/issues/379612186
  - Selectedcontent が selectedcontentelement 付きの select の後に来た時にうまく初期化されないバグ
    - https://issues.chromium.org/issues/383994653
    - Selectedcontentelement: https://github.com/openui/open-ui/issues/1063
  - Intent to ship: Customizable select
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/kN5LTzuTLVs/m/6HqTsmk3EQAJ
- [meta] Should we have an openui bluesky account? · Issue #1142 · openui/open-ui
  - https://github.com/openui/open-ui/issues/1142

  #### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
- Upcoming WHATNOT meeting on 2024-12-05
  - https://github.com/whatwg/html/issues/10805
  - Review past action items
    - Olli and Domenic to check the Last-Event-ID [PR](https://github.com/whatwg/fetch/pull/1788) with relevant teams
      - [Olli] asked valentin, he didn't have concerns
    - Noam to get web developers to comment on [ShadowRealm](https://github.com/whatwg/html/pull/9893) issues.
      - Noam: didn't receive anything definitive. Recommending that the patrons of the ShadowRealm project evangelise and gather more developer interest.
      - [Olli] FWIW, asked around if anyone knows examples how ShadowRealms would be used in non-trivial cases in order to understand its performance characteristics better, but no examples so far. -
      - [luke] [fix: update near-membrane-dom to use ShadowRealm salesforce/near-membrane#243](https://github.com/salesforce/near-membrane/pull/243) - here's a potentially outdated PR for how Salesforce plan to use ShadowRealm fwiw
      - Panos will ask Shu for a Chromium opinion.
    - ShadowRealm PR to explore the idea of associating ESO with principal realms/globals + ShadowRealms/their globals.
  - Carryovers from last time
    - Olli will review the [Atomic move](https://github.com/whatwg/dom/pull/1307) PR this week. ([explainer](https://github.com/noamr/dom/blob/spm-explainer/moveBefore-explainer.md))
      - [Olli] reviewed it some more, will need to look at also the [HTML part](https://github.com/whatwg/html/pull/10657). (But looking rather good so far)
    - [Canvas Text Metric investigations](https://github.com/whatwg/html/issues/10677) (from time before)
      - Comments on the issue regarding Intl.Segmenter
      - Renaming getIndexFromOffset
      - WebKit implementation under way
  - New topics
    - [Mason] [Dialog light dismiss](https://github.com/whatwg/html/pull/10737) PR.
      - Luke will take a look.
    - [Joey] [customizable select events](https://github.com/whatwg/html/issues/10762)
      - Joey will add the proposed text to the spec PR.
- Upcoming WHATNOT meeting on 2024-12-12
  - https://github.com/whatwg/html/issues/10825
  - Review past action items
    - Luke will take a look at the [Dialog light dismiss](https://github.com/whatwg/html/pull/10737) PR.
      - Done.
    - Joey will add the proposed text to the spec PR for [customizable select events](https://github.com/whatwg/html/issues/10762).
      - Done.
    - Panos will ask Shu for a Chromium opinion on [ShadowRealm](https://github.com/whatwg/html/pull/9893).
      - Done.
  - Carryovers from last time
    - None.
  - New topics
    - [Di] [tabindex vs reading-flow property](https://github.com/whatwg/html/issues/10642)
      - Olli will review or find someone from Gecko to review. It would be great to have Elika's review as well, since she had some concerns previously.
    - [Joey] [How to spec user interaction for select](https://github.com/whatwg/html/issues/10762)
      - Consensus to move forward with mousedown/mouseup events for web compat and consistency with current behavior. Joey will update the PR accordingly.
    - [Anne] [Revamped Scoped Custom Element Registries](https://github.com/whatwg/html/issues/10854)
      - To be discussed in the Dec 19 meeting.
- Upcoming WHATNOT meeting on 2024-12-19
  - https://github.com/whatwg/html/issues/10861
  - Review past action items
    - Olli will review or find someone from Gecko to review [tabindex vs reading-flow property](https://github.com/whatwg/html/issues/10642). It would be great to have Elika's review as well, since she had some concerns previously.
      - [Olli] reviewed some, looks reasonable, needs still s-p both from Gecko and Webkit
      - Followup on CSS side, doesn't need to stay on our agenda.
    - Joey will update his PR per the consensus in [How to spec user interaction for select](https://github.com/whatwg/html/issues/10762).
      - [Olli] Only minor nits from me. Is user-select:none missing?
  - Carryovers from last time
    - [Anne] [Revamped Scoped Custom Element Registries](https://github.com/whatwg/html/issues/10854)
      - Asking for review; haven't prototyped yet
      - Anne to create label to tie issues together
      - Overall positive response, but bikeshedding
      - Carryover
  - New topics
    - [Joey] [Stage 3 for customizable select](https://github.com/whatwg/html/issues/9799)
      - Open question about alt-text in the value for options
      - user-select behavior
      - …that's all that was mentioned. Please review to see if there are others.
      - Carryover: Joey to address alt text issue, bring back for promotion to stage 3
    - [Stephen] [Add an optional lang argument to OffscreenCanvas constructor](https://github.com/whatwg/html/issues/10862) [(Issue)](https://github.com/whatwg/html/issues/10862)
      - Feedback received, will bring back to agenda if necessary; no carryover
    - [Dom] [Introduce moveBefore() state-preserving atomic move API](https://github.com/whatwg/dom/pull/1307) (and stage 3 on the [issue](https://github.com/whatwg/dom/issues/1255))
      - Agreement to move to Stage 3.
- Upcoming WHATNOT meeting on 2025-01-09
  - https://github.com/whatwg/html/issues/10878
  - Review past action items
    - Anne will create a label to tie [Revamped Scoped Custom Element Registries](https://github.com/whatwg/html/issues/10854) issues (and [spec PR](https://github.com/whatwg/html/pull/10869)) together.
      - Carryover.
    - Dom will update [Introduce moveBefore() state-preserving atomic move API](https://github.com/whatwg/dom/pull/1307) with the stage 3 label.
      - Done.
  - Carryovers from last time
    - [Joey] [Stage 3 for customizable select](https://github.com/whatwg/html/issues/9799)
      - There are no known open issues to discuss. Please raise them if you know of one. Tantek will ping Olli and Simon for Mozilla's opinion here.
  - New topics
    - [Joey] [How to spec user interaction for select](https://github.com/whatwg/html/issues/10762)
      - Skipping this week since Olli is out.
    - [Joey] [Rendering \<select> as a listbox is a one-line widget that opens a popup on iOS and Android](https://github.com/whatwg/html/issues/8189)
      - We had a good discussion and will continue the discussion next week to get more perspectives.
    - [Mason / Keith] [Add commandfor & command attributes to HTMLButtonElement](https://github.com/whatwg/html/pull/9841)
      - Carryover.
    - [Mason] [Add popover=hint](https://github.com/whatwg/html/pull/9778)
      - Carryover.
- Upcoming WHATNOT meeting on 2025-01-16
  - https://github.com/whatwg/html/issues/10906
  - Review past action items
    - Tantek will ping Olli and Simon for Mozilla's opinion on [stage 3 for customizable select](https://github.com/whatwg/html/issues/9799).
      - Done.
    - Anne will create a label to tie [Revamped Scoped Custom Element Registries](https://github.com/whatwg/html/issues/10854) issues (and [spec PR](https://github.com/whatwg/html/pull/10869)) together.
      - Will add the label once many more issues are filed.
  - Carryovers from last time
    - [Joey] [Stage 3 for customizable select](https://github.com/whatwg/html/issues/9799)
      - The next issue is still a blocker for Olli and Anne.
    - [Joey] [How to spec user interaction for select](https://github.com/whatwg/html/issues/10762)
      - Olli and Anne will play with the Chromium implementation and review the proposal more closely.
    - [Joey] [Rendering \<select> as a listbox is a one-line widget that opens a popup on iOS and Android](https://github.com/whatwg/html/issues/8189)
      - The discussion will continue in the issue.
    - [Mason] [Add commandfor & command attributes to HTMLButtonElement](https://github.com/whatwg/html/pull/9841)
      - Keith will continue iterating on the PR.
    - [Mason] [Add popover=hint](https://github.com/whatwg/html/pull/9778)
      - Merged!
  - New topics
    - Discussed the need to get explicit implementer support before ticking the relevant checkbox on PRs. This can be either written or verbal, linkable or not, but it needs to be explicit.
    - [Andreu] [TC39 AsyncContext Integration](https://github.com/whatwg/html/issues/10432)
      - Everyone is encouraged to take a look at the issue and add comments.
    - [Noam] [Async css](https://github.com/whatwg/html/issues/3983)
      - Carryover.
    - [Di]: [Composed live ranges](https://github.com/whatwg/dom/pull/1342)
      - Carryover.
    - [Stephen]: [Canvas TextStyles direction getter](https://github.com/whatwg/html/issues/10884)
      - Carryover.
- Upcoming WHATNOT meeting on 2025-01-23
  - https://github.com/whatwg/html/issues/10923
  - 2a [Noam] Async css
  - 2b [Di]: Composed live ranges
  - 2c [Stephen]: Canvas TextStyles direction getter
- Upcoming WHATNOT meeting on 2025-01-30
  - https://github.com/whatwg/html/issues/10941

  #### Other

- [css-ui-4] Add 'interactivity' property, per #10711 by tabatkins · Pull Request #11178 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/pull/11178
- **W3C Advisory Committee Elects Technical Architecture Group**
  - https://www.w3.org/news/2024/w3c-advisory-committee-elects-technical-architecture-group/
- **Collaborating across W3C and Ecma for web-interoperable server runtimes through WinterTC**
  - https://www.w3.org/blog/2025/collaborating-across-w3c-and-ecma-for-web-interoperable-server-runtimes-through-wintertc/
- **WCAG 3 December 2024 Update - Thoughts from the Co-Chair**
  - https://whollyaccessible.org/2024/12/11/wcag-3-december-24-update/
- Draft Note: String Searching
  - https://www.w3.org/news/2025/draft-note-string-searching/
- W3C seeking community input for TAG appointment | 2024 | Blog | W3C
  - https://www.w3.org/blog/2024/w3c-seeking-community-input-for-tag-appointment/
- Loading CSS asynchronously without FoUC · Issue #195 · WICG/proposals
  - https://github.com/WICG/proposals/issues/195

  ### TC39 動向

  #### Meeting

- 2024-12
  - https://github.com/tc39/agendas/blob/main/2024/12.md
  - https://github.com/tc39/notes/pull/360
  - https://x.com/mozaicfm/status/1876963231945634131
  - https://docs.google.com/document/d/1qXUf4QRTbexUj0fg2sgYTxWwOT2v_q7lmjR282BOWLU/edit?tab=t.53o69p5h16mg#heading=h.kli2nc6rzdf
  - ShadowRealms Stage 3 ならず
    - WPT の PR は出てる
    - 温度感が低く、3 にしてもブラウザが実装されない可能性もある
    - 一旦各ブラウザの Signal を確認
    - Mozilla, Webkit はまだ No Signal
    - Stephanie 🔮 Web Witch: "Are you a developer who has a browser use-case for ShadowRealms? …" - Toot Café
      - https://toot.cafe/@seaotta/113833512224477847
      - ブラウザにおいての ShadowRealm のユースケースがないか Igalia の人が聞いている
  - Error.stack 標準化したい
    - アクセサはいいけど構造化スタックは反発もある
    - 2 つを分けてススメそう
    - アクセサだけだとすごく小さくなりそう

  #### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2025-01-01}...main@{2025-02-01}
- 0->1
  - Stabilize
  - Sync Imports
- 1->2
  - More Currency Display Choices
  - Immutable ArrayBuffer
- 2->2.7
- 2.7->3
  - Error.isError
- 3->4
  - Intl.DurationFormat

  #### New Proposals

- Stabilize
  - https://github.com/tc39/proposal-stabilize
- Sync Imports
  - https://github.com/tc39/proposal-import-sync

  #### WinterTC

- https://github.com/wintercg/admin/issues?q=label%3A%22meeting%22%20
- **Goodbye WinterCG, welcome WinterTC**
  - https://deno.com/blog/wintertc
  - 2022 年から W3C に CG として参加していた
  - Minimal Common API に取り組んでいたが CG では標準としての公開はできなかった
  - Ecma International に移管し TC55 になった
  - WinterTC として標準化を行っていく
- 2024-12-12 meeting agenda · Issue #79 · wintercg/admin
  - https://github.com/wintercg/admin/issues/79
  - Workstream updates and triage
    - Minimum Common API
    - CLI
    - Sockets
      - needs a champion
      - [@jasnell](https://github.com/jasnell) put himself forward asynchronously
  - How do we proceed with fetch?
    - needs a champion
  - Where is web crypto streams at?
    - needs a champion
    - [@jasnell](https://github.com/jasnell) says that Cloudflare can start championing this again, otherwise [@twiss](https://github.com/twiss) maybe wants to champion this?
  - Comms around TC55
    - [@andreubotella](https://github.com/andreubotella) and [@lucacasonato](https://github.com/lucacasonato) will coordinate with samina on simultaneous blog post
  - runtime keys move needs to be discussed at next meeting
- 2025-01-09 meeting agenda · Issue #80 · wintercg/admin
  - https://github.com/wintercg/admin/issues/80
  - Workstream updates
    - Minimum Common API
    - Sockets API
    - CLI API
  - Runtime keys
  - Invited experts onboarding
  - Formation comms for TC55
- 2024-01-23 meeting agenda · Issue #92 · wintercg/admin
  - https://github.com/wintercg/admin/issues/92

  #### Other

- Oracle が JavaScript の商標を素直には手放さないとの回答
  - https://fosstodon.org/@deno_land/113793964751001617

  ### IETF 動向

  #### WG

- RFC
- Work
  - Next Generation browser
    - https://datatracker.ietf.org/doc/html/draft-pradeepkumarxplorer-ngenbrowser-00
  - I-D Action: draft-ietf-httpbis-wrap-up-00.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2025JanMar/0013.html
  - I-D Action: draft-ietf-httpbis-rfc6265bis-19.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2025JanMar/0008.html
  - **Publication has been requested for draft-ietf-httpbis-rfc6265bis-19**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2025JanMar/0009.html
  - **Introducing `s://` as a Secure URL Scheme to replace `https://`**
    - https://www.ietf.org/archive/id/draft-aranalvi-s-url-scheme-00.html
    - `https://` を `s://` にしようという提案
- Meeting

  #### Other

- **New Cookies Draft from Johann Hofmann**
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2024OctDec/0278.html
  - https://docs.google.com/presentation/d/17FCT2BuYou7AB_dUzq9u6_q3X8L9CTswmrOMGVnshCM/
  - https://datatracker.ietf.org/doc/draft-annevk-johannhof-httpbis-cookies/
  - RFC6265bis の後の新しい Cookie のドラフト

  ### 周辺動向

  #### ベンダー動向

- Cloudflare 2024 Year in Review
  - https://blog.cloudflare.com/radar-2024-year-in-review/
- **Platform Advantages: Not Just Network Effects**
  - https://www.mnot.net/blog/2024/11/29/platforms
- **You can pay for that: How web browser features get built - Stephanie Stimac's Blog**
  - https://blog.stephaniestimac.com/posts/2024/12/how-browser-features-are-built/
- Announcing a polyfill for the TC39 decimal proposal
  - https://jessealama.net/decimal-proposal-polyfill/index.html
- Using Chromium for Building Apps (2025) - Tiago Vignatti
  - https://vignatti.com/posts/chromium-for-building-apps/
- MathML 2024 | Igalia
  - https://www.igalia.com/2024/12/17/MathML-2024.html
- Using Swarming to run Chromium test suites
  - https://blogs.igalia.com/max/swarming/
- **Igalia Year in Review 2024 | Igalia**
  - https://www.igalia.com/2024/12/31/Igalia-Year-in-Review-2024.html
- **DigiCert 社 OV 証明書及び EV 証明書に関する変更について | NTT Com お客さまサポート**
  - https://support.ntt.com/cdn-akamai/information/detail/pid25000025y5/
  - DigiCert 社の OV 証明書及び EV 証明書を発行するには、ドメイン認証や組織認証といった各種認証を必要とします。
  - その中のドメイン認証は、これまで Whois で公開されているメールアドレス宛、
  - もしくはドメインの 5 つの構築済み E メールアドレス(admin、administrator、webmaster、hostmaster、postmaster @[ドメイン名])宛に認証メールが送られる形で実施されてきました。
  - しかし、証明書の発行プロセスなどを管理する団体「CA/B フォーラム」の決定により、
  - 2025 年 1 月 8 日以降、順次、Whois で公開されているメールアドレスを認証メールの宛先として利用することができなくなります。
- Akamai to end CDN services in China - DCD
  - https://www.datacenterdynamics.com/en/news/akamai-to-end-cdn-services-in-china/
  - Akamai が CDN を中国でやめるらしい
    - 中国でやるのいろいろ面倒だから
  - そもそも CDN (配信)事業は縮小傾向らしい
  - 今はセキュリティとかクラウドに注力している
- **CSS Wish List 2025 - Eric's Archived Thoughts**
  - https://meyerweb.com/eric/thoughts/2025/01/08/css-wish-list-2025/
  - 2025 年に注力したい機能
  - Hanging punctuation
  - Margin and line box trimming
  - Stroked text
  - Expanded `attr()` support
  - Exclusions
  - Masonry layout
  - Grid track and gap styles
  - Custom media queries
  - Unprefix all the things
- Orko Garai - About Me
  - https://garai.ca/about/
  - Igalia に新しく入った人、元 BlackBerry や Ford にいた
  - Chromium 周りをやるらしい
- Orko Garai - What is an Input Method Editor?
  - https://garai.ca/what_is_ime/
  - 早速 Linux の IME 周りを触っているらしく現状のまとめ
- **This month in Servo: `:is()`, `:where()`, grid layout, parallel flexbox, and more! - Servo, the embeddable, independent, memory-safe, modular, parallel web rendering engine**
  - https://servo.org/blog/2024/12/09/this-month-in-servo/
- This month in Servo: dark mode, keyword sizes, XPath, and more! - Servo, the embeddable, independent, memory-safe, modular, parallel web rendering engine
  - https://servo.org/blog/2025/01/10/this-month-in-servo/
- Contributing to CSS Anchor Positioning in WebKit.
  - https://blogs.igalia.com/plampe/contributing-to-css-anchor-positioning-in-webkit/
- WinterCG becomes Ecma's WinterTC | Igalia
  - https://www.igalia.com/2025/01/10/WinterCG-becomes-Ecma's-WinterTC.html
- Igalia's Compilers Team in 2024
  - https://blogs.igalia.com/compilers/2025/01/13/igalia-s-compilers-team-in-2024/
- Igalia WebKit Team | WebKit Igalia Periodical #4
  - https://blogs.igalia.com/webkit/blog/2024/wip-4/
- Igalia WebKit Team | WebKit Igalia Periodical #5
  - https://blogs.igalia.com/webkit/blog/2024/wip-5/
- Igalia WebKit Team | WebKit Igalia Periodical #6
  - https://blogs.igalia.com/webkit/blog/2024/wip-6/
- Igalia WebKit Team | WebKit Igalia Periodical #7
  - https://blogs.igalia.com/webkit/blog/2024/wip-7/
- Igalia WebKit Team | WebKit Igalia Periodical #8
  - https://blogs.igalia.com/webkit/blog/2024/wip-8/
- Igalia WebKit Team | WebKit Igalia Periodical #9
  - https://blogs.igalia.com/webkit/blog/2025/wip-9/
- Igalia WebKit Team | WebKit Igalia Periodical #10
  - https://blogs.igalia.com/webkit/blog/2025/wip-10/
- Multi-Path TCP: revolutionizing connectivity, one path at a time
  - https://blog.cloudflare.com/multi-path-tcp-revolutionizing-connectivity-one-path-at-a-time/
- **The fall and rise of TikTok (traffic)**
  - https://blog.cloudflare.com/the-fall-and-rise-of-tiktok-traffic/
- Open sourcing h3i: a command line tool and library for low-level HTTP/3 testing and debugging
  - https://blog.cloudflare.com/h3i/
- The Open Web is Vibrant, and Vital to 2025 | Fastly
  - https://www.fastly.com/blog/the-open-web-is-vibrant-and-vital-to-2025
- **Erik on X: "Want to work with me on V8? If you have commits under your belt on V8, or perhaps a similar VM, Cloudflare is hiring. DM me." / X**
  - https://x.com/erikcorry/status/1869795043705532466
  - Cloudflare で V8 のエンジニアを募集中

  #### セキュリティ動向

- 1934361 - ICP-Brasil: Mis-issued certificate
  - https://bugzilla.mozilla.org/show_bug.cgi?id=1934361
  - google.com の証明書誤発行が CT で発見された
  - ブラジルの CA による発行だが、関係者からのレスポンスはない
  - Firefox の Root Store には入ってない
  - MS は disallow certificates に追加した
- **A Note from our Executive Director - Let's Encrypt**
  - https://letsencrypt.org/2024/12/11/eoy-letter-2024/
  - 2025 は Let's Encrypt 10 周年、5 億サイトが採用
  - 来年、有効期限が 6 日の新しい証明書サービスを始める予定
  - 現在の 20 倍、500 万枚/日の発行に耐えうる準備を進めている
- **Concerns about very-short-lived certificates**
  - https://www.mail-archive.com/dev-security-policy@mozilla.org/msg01900.html
  - 証明書が 6 日になることへの懸念の投稿
  - 失効は難しいので短命にするのはわかる
  - そして CT による監視が行われている
  - CT の流量は多すぎて監視をするのも大変
  - 監視は crt.sh がほぼ唯一で、みんなそれを使ってる
  - crt.sh は可用性と登録遅延に問題を抱えている
  - CA 業界の単一障害点になりつつある
  - ここからさらに CT の流量が 10 倍になったらどうなるか
  - みんなが CT も辞めてしまうかもしれない
  - さらに量子暗号で証明書も大きくなる
  - そういった点を考慮して欲しい
- **Blog: DoubleClickjacking: A New Era of UI Redressing**
  - https://www.paulosyibelo.com/2024/12/doubleclickjacking-what.html
  - double click jacking という手法の報告
  - 元のサイトから新しい window を開く
  - そこでキャプチャっぽいの出す
  - 「ダブルクリックして」と求める
  - その裏の元 window を OAuth とか支払いのボタンに移動する
  - ユーザがダブルクリックすると
  - 1 click 目で手前の window を閉じ
  - 2 click 目で裏の window の OAuth とか Payment のボタンを押させる
  - 気持ちはわかるが、、
- 中央省庁の一部サイト"不正利用のおそれ" 指摘受け修正 政府ドメイン管理に問題【Q&A で詳しく】 | NHK | IT・ネット
  - https://www3.nhk.or.jp/news/html/20250109/k10014688801000.html
- 国交省 過去に使ったドメイン オンラインカジノ広告に一時流用 | NHK | 国土交通省
  - https://www3.nhk.or.jp/news/html/20250110/k10014689801000.html
- 省庁ウェブサイトのドメイン管理不十分 5 省庁に 厚労省なども | NHK | IT・ネット
  - https://www3.nhk.or.jp/news/html/20250110/k10014689351000.html
- 天気予報専門メディア「tenki.jp」への DDoS 攻撃につきまして | JWA ニュース | 日本気象協会
  - https://www.jwa.or.jp/news/2025/01/25046/
- **Ending Support for Expiration Notification Emails - Let's Encrypt**
  - https://letsencrypt.org/2025/01/22/ending-expiration-emails/
  - Let's Encrypt がメールでの失効通知をやめる
  - メアドを保持するリスク、送信コスト、インフラ整備などが原因
  - 通知が欲しい場合は監視サービスを推奨
- パスワード、パスキー、生体認証...どんなユーザー認証にも"詰み"はあり得る - r-weblife
  - https://ritou.hatenablog.com/entry/2024/12/19/173802
- Hackers target dozens of VPN and AI extensions for Google Chrome to compromise data | The Record from Recorded Future News
  - https://therecord.media/hackers-target-vpn-ai-extensions-google-chrome-malicious-updates

  #### Cookie 動向

  #### Other

- C2PA Is Not Going To Fix Our Misinformation Problem
  - https://lowentropy.net/posts/c2pa/
  - Coalition for Content Provenance and Authenticity
  - https://c2pa.org/specifications/specifications/2.1/specs/C2PA_Specification.html
- A progress update on reading-flow - Rachel Andrew
  - https://rachelandrew.co.uk/archives/2024/12/20/a-progress-update-on-reading-flow/
- Expanding what HTTPS means
  - https://lowentropy.net/posts/local-https/
- WebAssembly as an ecosystem for programming languages
  - https://2ality.com/2025/01/webassembly-language-ecosystem.html
- ChatGPT Operator system prompt
  - https://simonwillison.net/2025/Jan/26/chatgpt-operator-system-prompt/
  - ChatGPT のブラウザーエージェント Operator のシステムプロンプトには CAPTCHA を自動で解くなと書かれている
- Staring into the Void | Internet Archive Blogs
  - https://blog.archive.org/2024/12/25/staring-into-the-void/
- Dia from The Browser Company
  - https://www.diabrowser.com/

  ### イベント

- 1 月
- 2 月
- 3 月
  - IETF 122 Bangkok
    - https://www.ietf.org/meeting/122/

### Wrap Up

- Chrome
  - 132
    - dialog toggle events
    - element capture
  - 133
    - advanced attr()
    - scroll-state()
    - moveBefore()
  - Ship
    - remove 5min rule for link rel=prefetch
    - on-device web speech api
    - dialog light dismiss
    - customizable select
  - Prototype
    - signature-based integrity
    - shadowrealm
    - shape()
    - contentEncoding in Resouce Timing
    - HSTS Tracking Prevention
  - web.dev
    - Baseline 2024
  - Chrome Developers
    - moveBefore()
    - customizable select
    - text-box-trim
  - Chromium blog
    - supporters of cr-baesd browsers
  - other
    - Google セキュリティチームの退職時の password heist 文化
- Firefox
  - 134
    - regexp.escape()
    - Promise.try()
  - Ship
    - Intl.DurationFormat
  - Prototype
  - other intents
  - MDN Blog
    - Temporal くる
  - Standard Position
    - positive: on-device web speech api
  - other
    - ロゴ変わった
    - Google 独占禁止法の悪影響
    - WebExtensions ML API
- Safari
  - TP 209
    - document.fragmentDirective
  - 18.2
    - text-box
    - @view-transition
    - ruby
    - `scrollbar-*`
    - blocking=render
    - Promise.try()
    - RegExp.escape()
  - TP 210
    - text-autospace
    - details styling
    - Scroll-driven animations
  - TP 211
    - Error.isError
    - Declarative web push
  - TP 212
    - view-transition-name: match-element
    - CHIPS
    - element.focus({focusVisible})
  - Standard Position
  - other
    - Success of Interop 2024
    - 検索エンジン作らない
- Edge
  - year-in-review
- W3C/WHATWG
  - Draft
  - Open UI
    - Updates to the customizable select API:
    - Intent to ship: Customizable select
    - Self-closing で動作しないバグ
    - Selectedcontent がうまく初期化されないバグ
    - blsky アカウント開始
  - WHATNOT meeting
    - 2024-12-05
      - ShadowRealm
      - moveBefore
      - Dialog Light Dismiss
      - Canvas Text Metric
      - customizable select events
    - 2024-12-12
      - tabindex vs reading-flow property
      - How to spec user interaction for select
      - Revamped Scoped Custom Element Registries
    - 2024-12-19
      - Stage 3 for customizable select
      - Add an optional lang argument to OffscreenCanvas constructor
    - 2025-01-09
      - How to spec user interaction for select
      - Rendering `<select>` as a listbox is a one-line widget that opens a popup on iOS and Android
      - commandfor & command attributes to HTMLButtonElement
      - popover=hint
    - 2025-01-16
      - AsyncContext
      - Async css
      - Composed live ranges
      - Canvas TextStyles direction getter
  - Other
    - Add 'interactivity' property,
    - AB 選挙
    - WCAG 3 の更新
    - WinterTC
- TC39
  - ShadowRealms の温度感が Chrome 以外不明
  - Error.stack の標準化はプロパティだけ?
  - Stabilize Stage 1
  - Sync Imports Stage 1
  - WinterTC
    - W3C WinterCG が Ecma WinterTC (TC55 に)
- IETF
  - RFC6265bis の Publication request
  - https:// を s:// にする提案
  - RFC6265bis の次の Cookie Draft 作成開始
- 周辺動向
  - ベンダー動向
    - 証明書の更新に Whois のメールは使えなくなる
    - CSS Wish List 2025
    - :is(), :where() などの Servo への実装
    - TikTok アメリカで停止でのトラフィック
    - Cloudflare で v8 エンジニア募集
  - セキュリティ動向
  - Cookie 動向
  - Other
    - Double Click Jacking
    - tenki.jp DDoS
    - Let's Encrypt 6 日証明書アナウンス
    - Let's Encrypt メール通知やめる
