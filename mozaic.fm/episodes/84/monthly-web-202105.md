---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep84.mp3
published_at: 2021-06-04
guest: [@myakura](https://twitter.com/myakura)
---

# ep84 Monthly Web 202105

## Theme

第 84 回のテーマは 2021 年 5 月の Monthly Web です。

## Show Note

### Chrome 動向

#### Stable: 91

#### Updates

- **New in Chrome 91**
  - https://developer.chrome.com/blog/new-in-chrome-91/
  - Suggested names for File System Access API
  - Reading files from the clipboard
  - Share credentials on affiliated sites
  - Web Assembly SIMD
  - WebTransport (Origin Trial)
  - Form controls refresh on Android
  - `<link>` element's `media` attribute will be honored for link `rel="icon"`
- BlinkOn14
  - https://bit.ly/blinkon-14-schedule
  - Opening Remarks, Keynote & Lightning Talks - Session 1
    - https://docs.google.com/presentation/d/1WxwbecNNXp_5v0yUDR3EolXR5m86siHj4_QWgPnJ7lU/
  - Layout Architecture Progress
    - https://docs.google.com/presentation/d/1MI6_HoblWpiaVIvd6LHpjtNunCh-KOZpfqOUdE2qbuA
  - Fugu for Non-Fishies
    - https://docs.google.com/presentation/d/1y7oEoygH7X7pO1get4ZFCifBcukpp9aNWCHRR4qGOTw
  - History of the Web
    - https://drive.google.com/file/d/1zOcIKvyU8KOZikioRPVoH7B_t7_xmaof/view
  - **Fenced Frames Architecture**
    - https://docs.google.com/presentation/d/18b6jH8HZFjGJh-SU_pxWs4XeTbiqre0kaAgw0rK_654
  - WebTransports
    - https://docs.google.com/presentation/d/1sXofJ8oHRu0IstC6sy6C5uYUsK_4aa3a7vwjHkHfdaI
  - **Prerendering Design**
    - https://docs.google.com/presentation/d/1Rpi-R0wo4r7tgFTfGAMVAqZfiOmqJqEW7kDM-KY6Q-s/edit
  - **WebID**
    - https://docs.google.com/presentation/d/1H1DsncQ_vUvnTwkf2m2GUr1o1tCtxj91H6-yk0C8aaY
  - WebCodecs: Design & Process
    - https://docs.google.com/presentation/d/1LKsv4kr7SSUQHtMTCcQMwAC6-G4IFG9eohIs0_zsUWo
- Google I/O 2021
  - 基調講演
    - https://events.google.com/io/session/88b34a4e-6170-4f18-a321-4260fb559e60?lng=ja
  - ウェブ プラットフォームの最新情報
    - https://events.google.com/io/session/97ea9417-2bba-4383-8eb4-22aee86af034?lng=ja
  - ウェブのプライバシー強化に向けた準備
    - https://events.google.com/io/session/2118f261-1549-41d8-b2ef-e377c2c97019?lng=ja
  - オプトインとしてのセキュリティからデフォルトのセキュリティへ
    - https://events.google.com/io/session/f7a95885-b1e5-4580-afb1-1decfb306b17?lng=ja
  - Project Fugu の API を駆け足で紹介
    - https://events.google.com/io/session/af611a1c-b490-4514-8e0d-0b64200409f4?lng=ja
  - コンポーネント駆動型環境における新しいレスポンシブ ウェブデザイン
    - https://events.google.com/io/session/a1760fa3-879a-4e98-a616-994ca8d3aab5?lng=ja
  - **読み込み後のパフォーマンス**
    - https://events.google.com/io/session/61a0f83e-1d64-4bdc-b5d9-04360db925ec?lng=ja
  - **ページ エクスペリエンス ランキングに向けた準備**
    - https://events.google.com/io/session/165a213a-d593-4ad0-9bee-18615a4757e8?lng=ja
  - **検索の最新情報**
    - https://events.google.com/io/session/6da5bb28-ad54-4cf0-8dc5-4eacb73a660a?lng=ja

#### Intents

- Ship: size-adjust descriptor for @font-face
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1PVr94hZHjU/m/J0xT8-rlAQAJ
- Ship: droppedEntriesCount in PerformanceObserver callback
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nNOU--_vWyI/m/drtfbxihAgAJ
- **Ship: EXIF-based intrinsic image sizing**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RqDYSPYE4lI/m/sxXCWw5dAgAJ
  - 密度をもとに x2 を x1 で表示して崩れるなどを防ぐ
- Ship: `crypto.randomUUID()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zvFUdYCvZew/m/dzH8rJhVAgAJ
- Ship: Error.cause property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qJIix3x5xY8/m/mpvmBnvUAQAJ
- Implement and Ship: Add "matrix" to registerProtocolHandler safelisted schemes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DGt2Iz5qidU/m/28s_1ZqUBQAJ
- **Prototype and Ship: User-Agent Client Hints API Updates**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dafizBGwWMw/m/72l-1zm6AAAJ
  - see chromium blog
- Prototype and Ship: Web Bluetooth manufacturer data filter
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5Id2LANtFko/m/5SIig7ktAgAJ
- Prototype and Ship: noplaybackrate in HTMLMediaElement.controlsList
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/u9jsiarDEOg/m/lpPUQH9VAgAJ
- **Prototype: Fenced Frames for Ads**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ko9UXQYPgUE/m/URRsB-qvAAAJ
  - postMessage, script access, window.top などが使えない frame
  - FLEDGE などで使う予定
- Prototype: Partitioning Storage, Service Workers, and Communications APIs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WXNzM0WiQ-s/m/l10NGhaoAQAJ
- Prototype: HTTP->HTTPS redirect for HTTPS DNS records
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OtjnvZstpLE/m/27NbikirAgAJ
- Prototype: MediaCapabilities API for WebRTC
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lE1qySPAEMs/m/29OgzgyoAgAJ
- **Prototype: `:has()` pseudo class**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hqkcKdDrhXE/m/qzEVzxbfAwAJ
- Prototype: Pickling for Async Clipboard API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Lo7WBM_v_LY/m/LncCKkXeAwAJ
- Prototype: Capture handle
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yLTykllpNmI/m/bnzA4mASBAAJ
- **Prototype: Sec-CH-Prefers-Color-Scheme client hint header**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ejTbFoJF3sQ/m/wRAxkc54AQAJ
- **Prototype: Anonymous iframes**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CjrLTguZuO4/m/kEO65RvCAAAJ
  - COEP が無くても読み込める iframe ?
- **Implement: Secure DNS Enhanced Bootstrap**
  - https://groups.google.com/a/chromium.org/g/net-dev/c/hfozKnhgGfU/m/HaORnLZ0BAAJ
- Experiment: Back-forward cache for desktop
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GJsdwulsGiI/m/7OauT6SjBQAJ
- Experiment: WebGPU
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/K4_egTNAvTs/m/ApS804L_AQAJ
- **Experiment: Shared Element Transitions**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UgZAAElUWzU/m/sBc82Fb2AgAJ
- Experiment: Compute Pressure API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HzVV-sM97T0/m/yHcpZWRQAgAJ
- Experiment: Capture handle
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RKONugfoGwM/m/ZInY8UtXBAAJ
- Experiment: `aria-touchpassthrough`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/w6OKsf4e9-Y/m/OUhROQ9JAAAJ
- **Experiment: 103 Early Hints preload during Navigation**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xb_NHDS3twY/m/Ha1c7Ly9AQAJ
- Continue Experimenting: First-Party Sets and 'SameParty' cookie attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nNdY-qOScBc/m/A5H3mcf5BQAJ
- Continue Experimenting: Idle Detection API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oJE9_77rZZ4/m/5jLDB0PCAQAJ
- Continue Experimenting: Digital Goods API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uoTx_cRuL5o/m/X3U0GpmRAgAJ
- Extend the origin trial period for Battery Savings Meta
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JVn3Ugjvxhw/m/P-SmkF5KAgAJ
- Extend Experiment: Storage Foundation API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/POsYbrXbL6I/m/Yfk5la0fBAAJ
- Extend experiment: `fetch()` upload streaming
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bw7Nh5bfsYE/m/ArLjJ1D7AwAJ
- Experiment: Speculation Rules (Prefetch)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Cw-hOjT47qI/m/EObn9-4MAgAJ
- **Remove: 3DES in TLS**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RShdgyaDoX4/m/JikQYHPuBQAJ
- Ready for Trial: Intl Locale Info in ECMA402
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5spmAncbooE/m/NdwZGjLpAgAJ
- **Update on User-Agent Reduction plans**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/e3pZJu96g6c/m/X9HcrSkVAgAJ
  - see chromium blog
- PSA: New implementations of IDL union types
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YBh8dD9FBb0/m/By7uOTbXAQAJ
- **Starting the journey to standardizing Window Controls Overlay**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8cIRiv-dIms/m/GjF52KmJAQAJ
- **PSA: A clarification on "gapless" origin trials**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/A5fRrs5nZkc/m/f9O7-UUeAgAJ
- **Increased Origin Trial Limits for Upcoming Privacy APIs**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/c4noVavt-uM/m/OhB3cd0EAgAJ
- Request for Conversion Measurement OT page load limit exception
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HSg5vO9R4jI/m/mc6bILjSBAAJ
- Ready for Trial: Extend Intl.DateTimeFormat timeZoneName Option
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/e4Ict1TT9FE/m/aq69ne3rBAAJ

#### V8

- V8 release v9.1 · V8
  - https://v8.dev/blog/v8-release-91
- Short builtin calls · V8
  - https://v8.dev/blog/short-builtin-calls
- **Sparkplug - a non-optimizing JavaScript compiler · V8**
  - https://v8.dev/blog/sparkplug
  - v8 は Interpreter の Ignition と Compiler の TurboFan で成り立っている
  - Interpreter の最適化が限界に来ている
  - より高速化するため中間に Sparkplug を導入
  - Speed Meter のスコアも 5~10% 向上

#### Other

- web.dev
  - Using asynchronous web APIs from WebAssembly
    - https://web.dev/asyncify/
  - Insertable streams for MediaStreamTrack
    - https://web.dev/mediastreamtrack-insertable-media-processing/
  - URL protocol handler registration for PWAs
    - https://web.dev/url-protocol-handler/
  - Orange: New PWA converts 52% better on mobile
    - https://web.dev/orange/
  - Optimizing Web Vitals using Lighthouse
    - https://web.dev/optimize-vitals-lighthouse/
  - Building a media scroller component
    - https://web.dev/building-a-media-scroller-component/
  - ES modules in service workers
    - https://web.dev/es-modules-in-sw/
  - The new responsive: Web design in a component-driven world
    - https://web.dev/new-responsive/
  - **Migrate to User-Agent Client Hints**
    - https://web.dev/migrate-to-ua-ch/
  - Choose how in-scope links open your PWA with Declarative Link Capturing
    - https://web.dev/declarative-link-capturing/
  - The business impact of core web vitals
    - https://web.dev/vitals-business-impact/
  - How to set browser flags in Chromium
    - https://web.dev/browser-flags/
  - Measure and debug performance with Google Analytics 4 and BigQuery
    - https://web.dev/vitals-ga4/
  - Excalidraw and Fugu: Improving Core User Journeys
    - https://web.dev/excalidraw-and-fugu/
  - **Security headers quick reference**
    - https://web.dev/security-headers/
  - Recognize your users' handwriting
    - https://web.dev/handwriting-recognition/
  - Learn CSS
    - https://web.dev/learn/css/
- google developer blog
  - Google Developers Blog: New Dashboard in Google Developer Profiles
    - https://developers.googleblog.com/2021/05/new-dashboard-in-google-developer-profiles.html
  - Google Developers Blog: Updated Google Pay button increases click-through rates
    - https://developers.googleblog.com/2021/05/updated-google-pay-button-increases-click-through-rates.html
  - Google Developers Blog: A new open source content library from Google
    - https://developers.googleblog.com/2021/05/a-new-open-source-content-library-from-google.html
  - Google Developers Blog: Tech Camp introduces Georgia high schoolers to technology careers
    - https://developers.googleblog.com/2021/05/tech-camp-introduces-georgia-high.html
  - Google Developers Blog: Behind the scenes: How the Google I/O photo booth was made
    - https://developers.googleblog.com/2021/05/behind-scenes-how-google-io-photo-booth-was-made.html
  - **Search at Google I/O 2021 | Google Search Central Blog**
    - https://developers.google.com/search/blog/2021/05/search-io-2021
  - Prevent portions of your site from being abused by spam
    - https://developers.google.com/search/blog/2021/05/prevent-portions-of-site-from-spam
  - How we worked with you towards a safe and spam-free Search experience in 2020
    - https://developers.google.com/search/blog/2021/05/working-with-you-for-safe-and-spam-free-search-2020
  - Sunsetting the generic rich results search appearance on Search Console
    - https://developers.google.com/search/blog/2021/05/rich-results-search-appearance-sunsetting
- google developer japan blog
  - Google Developers Japan: Core Web Vitals によるビジネス インパクト
    - https://developers-jp.googleblog.com/2021/05/core-web-vitals.html
  - Google Developers Japan: Chrome における SharedArrayBuffer に関する変更スケジュールの調整について
    - https://developers-jp.googleblog.com/2021/05/chrome-sharedarraybuffer.html
  - Google Developers Japan: 新しい改善版インタラクティブ クエリビルダーのお知らせ
    - https://developers-jp.googleblog.com/2021/05/blog-post_25.html
  - Google Developers Japan: Core Web Vitals を満たすように AMP ページ エクスペリエンスを最適化する
    - https://developers-jp.googleblog.com/2021/05/core-web-vitals-amp.html
  - Google Developers Japan: パフォーマンスの探求: 隠されたパフォーマンスの宝を探す
    - https://developers-jp.googleblog.com/2021/05/blog-post_24.html
  - Google Developers Japan: Product Partition および Listing Group での一時 ID の強制に関する変更予定について
    - https://developers-jp.googleblog.com/2021/05/product-partition-listing-group-id.html
  - Google Developers Japan: Google I/O 2021 での Google Maps Platform に関する発表
    - https://developers-jp.googleblog.com/2021/05/google-io-2021-google-maps-platform.html
  - Google Developers Japan: 2021 年 5 月 12 日以降、 SEARCH QUERY PERFORMANCE REPORT の AdFormat が UNKNOWN に
    - https://developers-jp.googleblog.com/2021/05/2021-5-12-search-query-performance.html
- chromium blog
  - **Chromium Blog: Adjusted timeline for SharedArrayBuffers**
    - https://blog.chromium.org/2021/05/adjusted-timeline-for-sharedarraybuffers.html
    - M91 から M92 に延期した
  - **Chromium Blog: An experiment in helping users and web publishers create deeper connections on Chrome**
    - https://blog.chromium.org/2021/05/an-experiment-in-helping-users-and-web.html
    - Web のフォローボタンが RSS を使う
  - **Chromium Blog: Update on User-Agent String Reduction in Chrome**
    - https://blog.chromium.org/2021/05/update-on-user-agent-string-reduction.html
    - M89 で UA-CH がリリース済み
    - Phase1: M92 から devtools で `navigator.[userAgent|appVersion|platform]` の利用に警告
    - Phase2: 近日中に reduced User-Agent の OT が開始される
    - Phase3: Reverse OT を半年提供開始
    - Phase4: minor 以降の version が "0.0.0" として desktop/mobile に Ship される
    - Phase5: `navigator.[userAgent|appVersion|platform]` の Reduce を desktop に Rollout
    - Phase6: Android にも Rollout
    - Phase7: Reverse OT 終了
    - https://www.chromium.org/updates/ua-reduction
  - Chromium Blog: Chrome is up to 23% faster in M91 and saves over 17 years of CPU time daily
    - https://blog.chromium.org/2021/05/chrome-is-faster-in-m91.html
- google workspace updates
  - **Google Docs will now use canvas based rendering: this may impact some Chrome extensions**
    - https://workspaceupdates.googleblog.com/2021/05/Google-Docs-Canvas-Based-Rendering-Update.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- amp
  - Contributions to Web Platform Interoperability (Second Half of 2020) - The AMP Blog
    - https://blog.amp.dev/2021/04/27/contributions-to-web-platform-interoperability-second-half-of-2020/
  - An Easier Path to Great Page Experiences Using AMP for WordPress - The AMP Blog
    - https://blog.amp.dev/2021/05/27/an-easier-path-to-great-page-experiences-using-amp-for-wordpress/

### Firefox 動向

#### Stable: 88

#### Updates

- Improving Firefox stability on Linux - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2021/05/improving-firefox-stability-on-linux/
- **Introducing Firefox's new Site Isolation Security Architecture - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2021/05/introducing-firefox-new-site-isolation-security-architecture/
- Updates to Firefox's Breach Alert Policy - Mozilla Security Blog
  - https://blog.mozilla.org/security/2021/05/25/updates-to-firefoxs-breach-alert-policy/
- **Introducing Site Isolation in Firefox - Mozilla Security Blog**
  - https://blog.mozilla.org/security/2021/05/18/introducing-site-isolation-in-firefox/

#### Intents

- **ship: Fetch Metadata Request Headers**
  - https://groups.google.com/g/mozilla.dev.platform/c/MO64cIV43ts/m/SPzPLa1TAQAJ
- ship: allow pages with \*unload event listeners to enter bfcache on Android
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/3pQRLPZnQgQ
- **ship: `at()` relative indexing**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/YJv7laP5-8c
- ship: -webkit-image-set() alias to image-set()
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/l74dqVGg6cs
- ship: CanvasRenderingContext2D.createConicGradient.
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/xQYtpdiBFHk
- ship: Changing cache re-validation on a soft reload
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/IiuvO7eHBME
- **ship: Ergonomic Brand Checks**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/vtjtuSjxzuY
- ship: WheelEvent.wheelDelta{,X,Y}
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/u4BaOxspzvw
- ship: visual viewport on desktop platforms
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ThYEXTiQc9g
- **ship: EXIF image density correction**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/w-KLmQ2PQOM
- prototype: JPEG XL decoding
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/wdB1v7sKcdo
- **prototype: Implement path() on d property on SVG path element**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/BTXw4pOfnR4

#### Other

- **Growing the Bytecode Alliance - The Mozilla Blog**
  - https://blog.mozilla.org/blog/2021/04/28/growing-the-bytecode-alliance/
- These Weeks in Firefox: Issue 92 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2021/04/26/these-weeks-in-firefox-issue-92/
- These Weeks in Firefox: Issue 93 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2021/05/14/these-weeks-in-firefox-issue-93/
- **These Weeks in Firefox: Issue 94 - Firefox Nightly News**
  - https://blog.nightly.mozilla.org/2021/05/21/these-weeks-in-firefox-issue-94/
- **Manifest v3 update | Mozilla Add-ons Blog**
  - https://blog.mozilla.org/addons/2021/05/27/manifest-v3-update/

### Safari 動向

#### Stable: 14.1.1

#### Updates

- New WebKit Features in Safari 14.1
  - https://webkit.org/blog/11648/new-webkit-features-in-safari-14-1/
  - **Flexbox Gap Support**
  - **Date & Time Inputs on macOS**
  - CSS Individual Transform Properties
  - Paint Timing API
  - Web Speech API
  - Web Audio API
  - Interoperability Improvements
  - MediaRecorder API
  - **WebM Support**
  - JavaScript Improvements
    - **Class Fields**
    - Internationalization API
    - WeakRef and FinalizationRegistry
  - WebAssembly
    - Threading
    - WebAssembly Sign Extension Operator
    - JavaScript BigInt Integration
  - **Private Click Measurement**
  - Storage Access API Updates
  - Web Inspector Updates
  - Availability
- Release Notes for Safari Technology Preview 124
  - https://webkit.org/blog/11672/release-notes-for-safari-technology-preview-124/
  - Web Inspector
  - CSS
  - JavaScript
  - Web API
    - **Enabled the ability to prevent scrolling in Element.focus() (r274812)**
    - **Implemented AbortSignal.abort() (r274773)**
  - Rendering
  - Wheel Events
  - Web Driver
  - WebGL
  - WebRTC
  - WebCrypto
  - Scrolling
  - Web Extensions
- Release Notes for Safari Technology Preview 125
  - https://webkit.org/blog/11680/release-notes-for-safari-technology-preview-125/
  - Web Inspector
  - CSS
    - **Added parsing for @counter-style descriptors (r276488)**
    - **Added support for CSS display 2-value syntax (e.g. display: inline flex ) (r276293)**
    - **Added support for inline-{start/end} values to float & clear CSS properties (r276216)**
  - Web Animations
    - **Added discrete animation support for border-image-repeat (r276465)**
  - WebAssembly
    - **Added call_ref instruction (r276896)**
  - Storage
  - Web API
    - Implemented `<form>.requestSubmit()` (r277257)
    - Implemented FontFace in Workers for OffscreenCanvas (r276450)
    - Implemented ShadowRoot.prototype.delegatesFocus attribute (r276585)
  - Rendering
  - WebRTC

#### Position

- [webkit-dev] Request for position: New Canvas 2D API
  - https://lists.webkit.org/pipermail/webkit-dev/2021-May/031833.html
- [webkit-dev] Request for position: Declarative Link Capturing
  - https://lists.webkit.org/pipermail/webkit-dev/2021-May/031834.html
- [webkit-dev] Request for opinion: Private Network Access secure context restriction
  - https://lists.webkit.org/pipermail/webkit-dev/2021-May/031836.html
- [webkit-dev] Request for Position: COLR v1 Vector Color Fonts
  - https://lists.webkit.org/pipermail/webkit-dev/2021-May/031839.html
- [webkit-dev] Request for position: CSS @font-face descriptor advance-override
  - https://lists.webkit.org/pipermail/webkit-dev/2021-May/031842.html
- [webkit-dev] Request for Position: Compute Pressure API
  - https://lists.webkit.org/pipermail/webkit-dev/2021-May/031845.html
- [webkit-dev] Request for Position on Delegated Ink Trails
  - https://lists.webkit.org/pipermail/webkit-dev/2021-May/031854.html
- [webkit-dev] Request for Position: User Preference Media Features Client Hints Headers
  - https://lists.webkit.org/pipermail/webkit-dev/2021-May/031856.html
- [webkit-dev] Request for Position: Pickling for Async Clipboard API
  - https://lists.webkit.org/pipermail/webkit-dev/2021-May/031855.html
- [webkit-dev] Request for position: UA-CH API Updates
  - https://lists.webkit.org/pipermail/webkit-dev/2021-May/031857.html
- [webkit-dev] Request for Position on :has() pseudo class
  - https://lists.webkit.org/pipermail/webkit-dev/2021-May/031859.html
- [webkit-dev] Request for position: Allow Navigator.registerProtocolHandler to register FTP related schemes.
  - https://lists.webkit.org/pipermail/webkit-dev/2021-May/031860.html
- [webkit-dev] Request for position: HTTP 103 Early Hints
  - https://lists.webkit.org/pipermail/webkit-dev/2021-May/031861.html
- [webkit-dev] Request for Position: Virtual Keyboard Control
  - https://lists.webkit.org/pipermail/webkit-dev/2021-May/031862.html
- [webkit-dev] Position Request on Window Controls Overlay
  - https://lists.webkit.org/pipermail/webkit-dev/2021-May/031865.html

#### Other

- iOS 14.5 offers Unlock iPhone with Apple Watch, diverse Siri voices, and more - Apple
  - https://www.apple.com/newsroom/2021/04/ios-14-5-offers-unlock-iphone-with-apple-watch-diverse-siri-voices-and-more/
  - Unlock iPhone with Apple Watch
  - Siri Enhancements
  - **More Privacy Controls**
  - New Emoji
  - Report an Incident in Apple Maps
  - Additional iOS 14.5 Features
  - Press Contacts

### Edge 動向

#### Stable: 91

#### MS Build

- MyBuild - Microsoft Edge: State of the platform
  - https://mybuild.microsoft.com/sessions/6f28eb25-8a24-488b-a50c-eab6d087d8a4
  - Form Control Update
  - WebView2
  - IE retirement
  - etc
- MyBuild - Ask the Experts: Microsoft Edge
  - https://mybuild.microsoft.com/sessions/9ae93910-ebb7-47e5-864d-2a268209e796?source=sessions
  - AMA for Edge
- What's new for Microsoft Edge at Microsoft Build 2021
  - https://blogs.windows.com/msedgedev/2021/05/25/whats-new-edge-build-2021/

#### Updates

- **The future of Internet Explorer on Windows 10 is in Microsoft Edge**
  - https://blogs.windows.com/windowsexperience/2021/05/19/the-future-of-internet-explorer-on-windows-10-is-in-microsoft-edge/
  - 「Internet Explorer 11 デスクトップ アプリケーションは 2022 年 6 月 15 日をもってサポートを終了いたします」
  - 2021/05/19: Internet Explorer デスクトップアプリ提供終了発表
  - 2021/08/17: Microsoft 365 及び他アプリでの IE サポート終了
  - 2022/06/15: Internet Explorer デスクトップアプリの提供終了
- Microsoft Edge 組み込みのサイト リスト マネージャーについて
  - https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/edge-ie-mode-site-list-manager/
  - 互換モードに追加する方法
- **Internet Explorer から Microsoft Edge への移行ガイドライン**
  - https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/guidelines-for-migrating-from-ie-to-microsoft-edge/
  - ステージ 1. IE を既定のブラウザーとして運用している
    - 1-1. IE に依存しているサイトの洗い出し
    - 1-2. IE モードでの動作確認
    - 1-3. サイト一覧 (.xml) ファイルの作成とポリシーの設定
    - 1-4. 既定のブラウザーの変更
  - ステージ 2. Edge には移行しているが、 IE モードと IE デスクトップ アプリ (スタンドアロンの IE11) を併用している
    - 2-1. IE デスクトップ アプリ依存サイトの洗い出し
    - 2-2. サイト一覧へのサイトの追加
  - ステージ 3. IE モードを部分的に利用しているが IE デスクトップ アプリはもう使っていない
  - ステージ 4. Edge に完全に移行できており、 IE モード含めて完全に必要ない
- **Internet Explorer 11 デスクトップ アプリのサポート終了へ! IE モードへの移行を進めましょう!**
  - https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/internet-explorer-app-end-of-support/
  - サポート範囲などの日本語での補足
- IE で開いていたページが Microsoft Edge にリダイレクトされる動作について
  - https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/IEtoEdgeRedirection/
- IE モードのよくあるご質問
  - https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/ie-mode-faq/
- Internet Explorer および Microsoft Edge での Flash の今後の対応について
  - https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/flash/
- Top Feedback Summary for May 12 - Microsoft Tech Community
  - https://techcommunity.microsoft.com/t5/articles/top-feedback-summary-for-may-12/m-p/2349483#M5538
- New Update Experience for Mac available in Edge Dev - Microsoft Tech Community
  - https://techcommunity.microsoft.com/t5/articles/new-update-experience-for-mac-available-in-edge-dev/m-p/2200983#M5069
- net-export の使い方 | Japan Developer Support Internet Team Blog
  - https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/how-to-use-net-export/
- Preview Microsoft Math Solver in Microsoft Edge
  - https://blogs.windows.com/msedgedev/2021/05/21/preview-microsoft-math-solver-microsoft-edge/
- New shopping features to help you save money for summer fun and all your back-to-school needs
  - https://blogs.windows.com/windowsexperience/2021/05/27/new-shopping-features-to-help-you-save-money-for-summer-fun-and-all-your-back-to-school-needs/

#### Chakra

#### Other

- Download Blocking by File Type - text/plain
  - https://textslashplain.com/2021/05/19/download-blocking-by-file-type/
- Offline NetLog Viewing - text/plain
  - https://textslashplain.com/2021/05/25/offline-netlog-viewing/
- **Internet Explorer: A Brief History - Ben Slivka**
  - https://benslivka.com/2021/05/27/internet-explorer-a-brief-history/
  - IE の歴史

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
  - Call for Review: Web Audio API is a W3C Proposed Recommendation
    - https://www.w3.org/blog/news/archives/9047
- Candidate Recommendation
  - W3C Invites Implementations of Page Visibility Level 2
    - https://www.w3.org/blog/news/archives/9054
- Working Draft
  - For Wide Review: WCAG 2.2 Working Draft
    - https://www.w3.org/blog/news/archives/9052
- First Public Working Draft
  - First Public Working Draft of MiniApp Manifest
    - https://www.w3.org/blog/news/archives/9050
  - First Public Working Draft of WebTransport
    - https://www.w3.org/blog/news/archives/9043
  - First Public Working Draft of Geolocation API
    - https://www.w3.org/blog/news/archives/9079
  - **First Public Working Draft: Specification for Spoken Presentation in HTML**
    - https://www.w3.org/blog/news/archives/9062
    - SSML なんてあるのね
  - First Public Working Drafts: WebGPU and WebGPU Shading Language
    - https://www.w3.org/blog/news/archives/9059
- Chartering
  - Proposed W3C Charter: Media Working Group
    - https://lists.w3.org/Archives/Public/public-new-work/2021May/0006.html
  - HTML Working Group Charter extended until 1 September 2021
    - https://lists.w3.org/Archives/Public/public-new-work/2021May/0004.html
  - **Advance Notice: Working in progress on a Portable Network Graphics (PNG) Working Group**
    - https://lists.w3.org/Archives/Public/public-new-work/2021May/0002.html

#### Other

- Working Group Note: Making Content Usable for People with Cognitive and Learning Disabilities
  - https://www.w3.org/blog/news/archives/9035
- **W3C opens Advisory Board (AB) election**
  - https://www.w3.org/blog/news/archives/9041
- W3C Strategic Highlights, April 2021
  - https://www.w3.org/blog/news/archives/9029
- Working Group Note: RTC Accessibility User Requirements (RAUR)
  - https://www.w3.org/blog/news/archives/9076
- Interest Group Note: Web of Things (WoT): Use Cases and Requirements
  - https://www.w3.org/blog/news/archives/9066

### TC39 動向

#### Meeting

- 2021-04
  - https://github.com/tc39/agendas/blob/master/2021/04.md
  - https://github.com/tc39/notes/tree/master/meetings/2021-04
  - TC39 meeting, April 19-21 2021
    - https://spidermonkey.dev/blog/2021/05/10/tc39.html
- **2021-05**
  - https://github.com/tc39/agendas/blob/master/2021/05.md

#### Proposals Diff

- https://github.com/tc39/proposals/compare/master@{2021-05-01}...master@{2021-06-01}
- https://tc39.github.io/beta/
- 0->1
  - Limited ArrayBuffer
- 1->2
  - RegExp Set Notation
- 2->3
  - Intl.DisplayNames v2
  - Extend TimeZoneName option
  - Resizable ArrayBuffers
  - Symbols as WeakMap keys
  - Accessible Object.prototype.hasOwnProperty()
  - Realms
- 3->4
  - **RegExp Match Indices**
  - **Top Level await**

#### New Proposals

- tc39/proposal-limited-arraybuffer
  - https://github.com/tc39/proposal-limited-arraybuffer

#### Other

### IETF 動向

#### WG

- IETF
  - https://datatracker.ietf.org/meeting/
  - Consensus on Deploying QUIC v1 with HTTP/3
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0109.html
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - Not having a session at IETF 111
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0105.html
  - WG Virtual Meeting
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0106.html
    - 2021-06-15 from 21:00 to 23:00 GMT (21:00 to 23:00 UTC).
  - WG Virtual Meeting
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0107.html
    - 2021-06-17 from 21:00 to 23:00 GMT (21:00 to 23:00 UTC).
  - **I-D Action: draft-ietf-httpbis-bcp56bis-12.txt**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0080.html
  - **Publication has been requested for draft-ietf-httpbis-bcp56bis-12**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0102.html
    - BCP56 の RFC 発行がリクエストされた
  - draft-ietf-httpbis-proxy-status-05.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0079.html
  - HTTP Signatures Updates
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0075.html
  - **Proposal for new `Partitioned` cookie attribute**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0099.html
    - CHIPS を httpbis に持ち込む話
  - Permitted characters in HTTP/2 fields
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0070.html
  - **Results from adopting HTTP/3 priority**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0068.html
    - Instagram では H3 の Priority を試したところうまく動いたという話。
    - H2 よりもシンプルになってよかった。
  - **HTTP Working Group Interim Meeting Agenda - June 15, 17 2021**
    - https://httpwg.org/wg-materials/interim-21-06/agenda.html
    - 15 min - Client Cert Header
    - 15 min - Safe method with body
    - 20 min - HTTP/2 bis
    - 20 min - RFC6265bis
    - 20 min - Extensible Prioritization Scheme for HTTP
    - 20 min - Digest Headers
    - 20 min - Signing HTTP Messages
  - AD review of draft-ietf-httpbis-semantics-15, draft-ietf-httpbis-cache-15, draft-ietf-httpbis-messaging-15
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0148.html
  - I-D Action: draft-ietf-httpbis-messaging-16.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0149.html
  - I-D Action: draft-ietf-httpbis-semantics-16.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0150.html
  - I-D Action: draft-ietf-httpbis-cache-16.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0151.html
  - **Last Call: (HTTP Caching) to Proposed Standard from The IESG**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0152.html
  - **Last Call: (HTTP/1.1) to Proposed Standard from The IESG**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0153.html
  - **Last Call: (HTTP Semantics) to Proposed Standard from The IESG**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0154.html
- quicwg
  - https://mailarchive.ietf.org/arch/browse/quic/
  - https://github.com/quicwg/wg-materials
  - RFC 8999: Version-Independent Properties of QUIC
    - https://www.rfc-editor.org/rfc/rfc8999.html
    - QUIC では version negotiation が許可されている
    - 新しいバージョンの QUIC が出てきても共通するべき部分などについて
  - **RFC 9000: QUIC: A UDP-Based Multiplexed and Secure Transport**
    - https://www.rfc-editor.org/rfc/rfc9000.html
    - UDP 上の新しいトランスポートプロトコル
  - RFC 9001: Using TLS to Secure QUIC
    - https://www.rfc-editor.org/rfc/rfc9001.html
    - QUIC の暗号化に TLS1.3 を使う部分について
  - RFC 9002: QUIC Loss Detection and Congestion Control
    - https://www.rfc-editor.org/rfc/rfc9002.html
    - 損失検知と輻輳制御
- webtrans
  - https://mailarchive.ietf.org/arch/browse/webtransport/
  - https://github.com/DavidSchinazi/webtrans-wg-materials
- tlswg
  - https://mailarchive.ietf.org/arch/browse/tls/
  - https://github.com/tlswg/wg-materials
- wpack
  - https://mailarchive.ietf.org/arch/browse/wpack/
- privacypass
- dispatch
  - https://mailarchive.ietf.org/arch/browse/dispatch/
- secdispatch
  - https://mailarchive.ietf.org/arch/browse/secdispatch/

#### Other

### CDN 動向

#### Cloudflare

- **Humanity wastes about 500 years per day on CAPTCHAs. It's time to end this madness**
  - https://blog.cloudflare.com/introducing-cryptographic-attestation-of-personhood/
  - CAPTCHA をなくすために Privacy Pass の発行に WebAuthn を使う
  - **Why Cloudflare's CAPTCHA replacement with FIDO2/WebAuthn is a really bad idea**
    - https://herrjemand.medium.com/why-cloudflares-captcha-replacement-with-fido2-webauthn-is-a-really-bad-idea-d5487f6c7566
    - FIDO から見ると bad idea らしい
- **CDN-Cache-Control: Precision Control for your CDN(s)**
  - https://blog.cloudflare.com/cdn-cache-control/
- **QUIC Version 1 is live on Cloudflare**
  - https://blog.cloudflare.com/quic-version-1-is-live-on-cloudflare/

#### Fastly

- **QUIC is now RFC 9000**
  - https://www.fastly.com/blog/quic-is-now-rfc-9000
  - Google の最初の実験から 5 年
  - 26 回の Interim, 1749 の Issue, 何千もの Mail を経て標準化
  - 何十年にもわたり固定化してきた TCP/TLS を更新できた
  - これをベースに unreliable な通信などの提案も出ている
  - 今後も MASQUE / WebTransport などへの展開も見えている
  - QUIC v1 がこれからの技術の発展のベースとなっていく

#### Other

- フィッシング対抗の多要素認証 Akamai MFA - Akamai Japan Blog
  - https://blogs.akamai.com/jp/2021/05/akamai-mfa.html

### セキュリティ動向

- **Publicly Trusted TLS Certificates: Changes - Blog | GlobalSign**
  - https://www.globalsign.com/en/blog/upcoming-changes-publicly-trusted-tls-certificates
  - ドメインと IP の検証結果の再利用を最長 398 日に
  - HTTP domain validation は Subdomain と Wildcard では禁止に
  - 中間証明書の入れ替えを短く
  - ECC Key Usage の変更
  - OU Field を段階的に廃止
- Let's Encrypt のルート認証局移行についてちょっと調べてみた - Qiita
  - https://qiita.com/kjur/items/2fd72b6707497c7fc6c5

### 周辺動向

- **How we use Web Components at GitHub**
  - https://github.blog/2021-05-04-how-we-use-web-components-at-github/

### イベント

- 6 月
  - 7-11: WWDC 2021
    - https://developer.apple.com/wwdc21/
  - 15-17: httpwg interim
    - https://httpwg.org/wg-materials/interim-21-06/agenda.html
  - 24-30: IETF111
    - https://www.ietf.org/how/meetings/111/
- 7 月
  - 13-16: TC39 meeting Tokyo
- 9 月
  - 7-11: SecWeb
    - https://secweb.work/
- 10 月
  - 18-29: TPAC:
    - 10/18-22 October: Breakout sessions
    - 10/25-29 October: Groups and Joint Meetings
    - https://lists.w3.org/Archives/Public/public-webrtc/2021Apr/0027.html

### Wrap Up

- Chrome
  - BlinkOn14
    - Fenced Fame, WebID, Prerendering
  - Google I/O
    - adventure
  - prototype EXIF based density collection
  - prototype fenced frame / anonymous iframe
  - finch experiment Early Hints preloading
  - v8 sparkplug
  - web.dev security header quick reference
  - web.dev learn css
  - UA-CH / UA reduction roadmap
  - Canvas Base Google Docs
- Firefox
  - Site Isolation
  - intents Image density collection
- Safari
  - 14.1 release note
    - flexbox gap
    - date time input
  - Class Field
  - WebM Playback
- Edge
  - MS Build
  - IE11 Support 終了アナウンス
  - IE to Edge 以降ガイドライン
- W3C/WHATWG
  - PNG working group
- TC39
  - meeting
  - Top Level Await to 4
  - regexp match indices to 4
- IETF
  - QUIC RFC9000
  - httpbis last call
  - httpbis bcp last call
  - CHIPS to httpbis
- CDN
  - CDN-Cache-Control
  - Cloudflare の Privacy Pass + WebAuthN に FIDO から反論
- Secruity
  - CAB Forum の update を globalsign がアナウンス
