---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep129.mp3
published_at: 2023-09-03
guest: [@myakura](https://twitter.com/myakura)
---

# ep129 Monthly Platform 202308

## Theme

第 129 回のテーマは 2023 年 8 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 116

#### Updates

- **New in Chrome 116**
  - https://developer.chrome.com/en/blog/new-in-chrome-116/
  - Document Picture-in-Picture API.
  - DevTools missing stylesheets debugging improvements.
  - Motion path allows authors to position any graphical object and animate it along a path specified by the developer.
  - The display and content-visibility properties are now supported in keyframe animations, which allows exit animations to be added purely in CSS.
  - The fetch API can now be used with Bring Your Own Buffer readers, reducing garbage collection overhead and copies, and improving responsiveness for users.
- **Chrome 117 beta**
  - https://developer.chrome.com/en/blog/chrome-117-beta/
  - CSS
    - The @starting-style rule
    - The overlay property
    - CSS transition-behavior property
    - The CSS grid subgrid value
    - CSS text-wrap: pretty
    - contain-intrinsic-size: auto none support
  - Web APIs
    - Array grouping
    - Clear Client Hints via Clear-Site-Data header
    - Clear-Site-Data header wildcard syntax
    - customElements.getName
    - Iterator helpers
    - Make CaptureController derive from the EventTarget interface
    - PerformanceResourceTiming deliveryType
    - Port overflow check in URL setters
    - Private State Token API
    - URL Standard-compatible IPv4 embedded IPv6 host parser
    - URL: Allow "%00" as a valid URL path
    - WebRTC RTP header extension control
    - Per frame quantizer in VideoEncoder
    - WebUSB exclusionFilters option in requestDevice()
  - Origin trials in progress
    - Compression dictionary transport with Shared Brotli
    - WebSQL deprecation trial
    - Tabbed web apps
  - Deprecations and removals
    - Deprecate the unload event
    - Deprecate TLS SHA-1 server signatures
    - [WebRTC] Unship callback-based legacy getStats()
    - Removal of the -1 value for WebRTC getStats datachannelIdentifier
    - Removal of WebRTC getStats encoderImplementation and decoderImplementation "unknown"
    - CSS property -webkit-highlight
- **What's New in DevTools (Chrome 117)**
  - https://developer.chrome.com/en/blog/new-in-devtools-117/
- Network panel improvements
  - Override web content locally even faster
  - Override the content of XHR and fetch requests
  - Hide Chrome extension requests
  - Human-readable HTTP status codes
  - Pretty-print responses for JSON subtypes
- Performance: See the changes in fetch priority for network events
- Sources settings enabled by default: Code folding and automatic file reveal
- Improved debugging of third-party cookie issues
- Debug preloading in the Application panel
- New colors
- Lighthouse 10.4.0
- The C/C++ WebAssembly debugging extension for DevTools is now open source
- Miscellaneous highlights
- New experimental features
  - New rendering emulation: prefers-reduced-transparency
  - Enhanced Protocol monitor

#### Intents

- Ship: Attribution Reporting features (lookback windows, flex-lite)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nWF61c8xu-M
- Ship: CSS cap and rcap font units
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jiuxWVJEmqs
- Ship: CSS logical flow relative values
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bQrq8sgEjFA
- Ship: Clear BFCache during browsing data removal
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1jIrhBN0XTU
- Ship: Consistent minimum font size across languages
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QpQeCiNGhDs
- **Ship: Form Controls Support Vertical Writing Mode**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-QOUpwElepo
- Ship: Storage Access API with Prompts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JHf7CWXDZUc
- Ship: Detect UA Transitions on same-document Navigations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OTGqhEZ7aug
- **Ship: HTML search element**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5CHw-SXYKGc
- Ship: Baselines in New TextMetrics API in Canvas
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AORzxU_ZNTk
- **Ship: Bounce Tracking Mitigations**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Lxi7LfRyI4c
- Ship: :user-valid and :user-invalid CSS pseudo-classes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UpB_u-wvNeA
- Ship: CSS Relative Color Syntax (RCS)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KeKBTjKEdaU
- Ship: Enrollment for Privacy Sandbox
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/J-nlzLKZvA0
- Ship: Fenced Frames - Functionality Updates
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2FKlwNZ0J4Q
- **Ship: Japanese Phrase Line Breaking**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/96q7WtXtWXc
  - `word-break: auto-phrase` で日本語の文節区切りを実現
  - BudouX を用いている
- Ship: Media Queries: scripting feature
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jiCB_twBqnk
  - JS が有効かどうか取得する query
- **Ship: Sec-CH-Prefers-Reduced-Transparency User Preference Media Features Client Hints Header**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KgSc7mn6pws
  - 透明表現を抑止する設定
- Ship: view-timeline shorthand sets view-timeline-inset
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yjfaImiMaXE
- Implement and Ship: Make URL parser to not decode percent-encoded ASCII character in URL's path
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1L8vW_Xo8eY
- Implement and Ship: DisplayMediaStreamOptions monitorTypeSurfaces
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/t3kqlI58U8Q
- Prototype and Ship: Cookie Expires/Max-Age attribute upper limit for prior storage
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/blQFS8L3Drw
  - すでに保存されている Cookie にも 400 日制限を適用
  - M118 以降を起動した初回のマイグレーション時に設定
- Prototype and Ship: Clip-path geometry-box values
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aJ9wzaX-E2g
- Prototype and Ship: Allow transferring ArrayBuffer into VideoFrame, AudioData, EncodedVideoChunk, EncodedAudioChunk, ImageDecoder constructors
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yZS0DLCwl6w
- Prototype and Ship: Generic Sensor WebDriver endpoints
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cEp5jLjWDu8
- Implement and Ship: User-Agent Client Hints on Android WebView
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HllilgilEso
- Implement and Ship: AudioEncoderConfig.bitrateMode
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ROW2C8i6g24
- Implement and Ship: SVGImageElement.crossOrigin attribute.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IjZW1CQNNxM
- **Prototype: Document Render-Blocking**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YG70jRdekNs
  - レンダリングをブロックし、最初のペイントを一貫させる
  - ViewTransition でアニメーションする DOM の追加をまたないと UX が一貫しないため
- Prototype: Media Queries: scripting feature
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nf3I6lAuHqo
- Prototype: Snapchanged Events
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AGsZy1WSIS0
- **Prototype: CJK punctuation kerning: the CSS `text-spacing-trim` property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NCUfiS4K32E
  - 日本語フォントの括弧など約物の空きを削る
- **Prototype: CSS Sticky State Container Queries**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/C1D321h3OnA
  - sticky になったことを取得できる
  - state query で取得
- Prototype: FedCM Improvements: Error API, Account Auto Selected Flag, Hosted Domain and Revocation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YfaGM8v-Ocs
- **Prototype: Page-Embedded Permission Control**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TGsrhP4ref0
  - in-content element に権限取得の UI を出したい
- Prototype: Private Network Access restrictions for automotive
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MO2HmKaFe8c
- Prototype: WebDriver commands for triggering Bounce Tracking Mitigations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VMTLpimgZTo
- **Prototype: form-sizing CSS property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cA-cmgrA_QE
  - `<textarea>` を入力した行の高さに自動的に広げる
- Experiment: WebRTC encoded transform - Modify Metadata functions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yqwA-jXv6VY
- **Experiment: X25519Kyber768 key encapsulation for TLS**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xb4JCKhED3k
- **Deprecate: Remove "Sanitizer API MVP"**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PNTt4oFXt8c
  - Sanitizer API のデザインが変わったので、古いものを unship する
- Removing FocuslessSpatialNavigation runtime-enabled-feature
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FVEC1_HfnMY
- PSA: Browser text zoom on Android will now work like it does on desktop
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rTNCw0lHmZk
- PSA: WebSocketStream API change
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/G3VehycqicQ
- PSA: change in default behavior of `content_shell --run-web-tests`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7BT2lM6fSOA
- PSA: Ads Relevance and Measurement APIs ramping up
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SwvkaK-XoOA
- **PSA: Adjacent CDATA sections in XML documents will now be merged**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GhRScWaK1DI
- PSA: Disallowing unknown import attributes keys
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WMhGw7OMvWA
- PSA: Improved covering and nested scroll snap handling
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nrv9MtQ7BDY
- PSA: Opener Storage Partitioning Explainer
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pWbFePTUnB4
- **Save the date for BlinkOn 18!**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/19KSuM7ywhs
- Action required: You're invited to BlinkOn 18 on Oct 17-19th!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wj5NjvyzIXI
- FYI that new Topics Taxonomy (v2) is starting to roll out to Stable soon
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/v5Cl0tecNW4

#### Other

- web.dev
  - New to the web platform in July
    - https://web.dev/web-platform-07-2023/
  - Defining test cases and priorities
    - https://web.dev/ta-test-cases/
  - To test or not to test, a technical perspective
    - https://web.dev/ta-what-to-test/
  - How prefetching helped Terra increase ads click-through rate by 30% and speed up Largest Contentful Paint.
    - https://web.dev/terra-prefetching-case-study/
  - New to the web platform in August
    - https://web.dev/web-platform-08-2023/
- google developer blog
  - Announcing Federated Credential Management (FedCM) Beta for Google Identity Services
    - https://developers.googleblog.com/2023/08/announcing-federated-credential-management-beta-for-gis.html
- google developer japan blog
  - Google Developers Japan: Google Ads API v14 のお知らせ
    - https://developers-jp.googleblog.com/2023/08/google-ads-api-v14.html
- chrome developer blog
  - One-time permissions in Chrome
    - https://developer.chrome.com/en/blog/one-time-permissions/
  - What's New in WebGPU (Chrome 116)
    - https://developer.chrome.com/en/blog/new-in-webgpu-116/
  - Secure popup interactions with `restrict-properties`
    - https://developer.chrome.com/en/blog/coop-restrict-properties/
  - **Deprecating the unload event**
    - https://developer.chrome.com/en/blog/deprecating-unload/
  - Four new CSS features for smooth entry and exit animations
    - https://developer.chrome.com/en/blog/entry-exit-animations/
  - Bringing Safety check to the chrome://extensions page
    - https://developer.chrome.com/en/blog/extension-safety-hub/
  - Debugging speculation rules
    - https://developer.chrome.com/en/blog/debugging-speculation-rules/
  - **Introducing the scheduler.yield origin trial**
    - https://developer.chrome.com/en/blog/introducing-scheduler-yield-origin-trial/
  - What's new in Lighthouse 11
    - https://developer.chrome.com/en/blog/lighthouse-11-0/
  - Craft your Chrome Devtools Protocol (CDP) commands efficiently with the new command editor
    - https://developer.chrome.com/en/blog/cdp-command-editor/
  - **Astro View Transitions**
    - https://developer.chrome.com/en/blog/astro-view-transitions/
  - **Faster Chrome releases (round two!)**
    - https://developer.chrome.com/en/blog/faster-chrome-releases-round2/
  - **Related Website Sets - the new name for First-Party Sets in Chrome 117**
    - https://developer.chrome.com/en/blog/related-website-sets/
  - DevTools Tips: Snippets and live expressions
    - https://developer.chrome.com/en/blog/devtools-tips-26/
- chromium blog
  - **Chromium Blog: Redesigning Chrome downloads, to keep you productive and safe online**
    - https://blog.chromium.org/2023/08/redesigning-chrome-downloads-to-keep.html
    - ダウンロードの UI が改善された
  - Chromium Blog: Smoothing out the scrolling experience in Chrome on Android
    - https://blog.chromium.org/2023/08/smoothing-out-scrolling-experience-in.html
  - **Chromium Blog: Protecting Chrome Traffic with Hybrid Kyber KEM**
    - https://blog.chromium.org/2023/08/protecting-chrome-traffic-with-hybrid.html
  - **Chromium Blog: Towards HTTPS by default**
    - https://blog.chromium.org/2023/08/towards-https-by-default.html
- google security blog
  - **Google Online Security Blog: An update on Chrome Security updates - shipping security fixes to you faster**
    - https://security.googleblog.com/2023/08/an-update-on-chrome-security-updates.html
    - これまで隔週で行っていたセキュリティ修正の更新を Chrome 116 から毎週に変更
  - Android 14 introduces first-of-its-kind cellular connectivity security features
    - https://security.googleblog.com/2023/08/android-14-introduces-first-of-its-kind.html
  - Downfall and Zenbleed: Googlers helping secure the ecosystem
    - https://security.googleblog.com/2023/08/downfall-and-zenbleed-googlers-helping.html
  - **Making Chrome more secure by bringing Key Pinning to Android**
    - https://security.googleblog.com/2023/08/making-chrome-more-secure-by-bringing.html
  - **Toward Quantum Resilient Security Keys**
    - https://security.googleblog.com/2023/08/toward-quantum-resilient-security-keys.html
  - AI-Powered Fuzzing: Breaking the Bug Hunting Barrier
    - https://security.googleblog.com/2023/08/ai-powered-fuzzing-breaking-bug-hunting.html
- v8
  - https://v8.dev/
- Save the date for BlinkOn 18!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/19KSuM7ywhs
  - 10/17 - 10/19
  - Bay Area + virtual
- **Q2 2023 Summary from Chrome Security**
  - https://groups.google.com/a/chromium.org/g/security-dev/c/Ew1r4mHozwg

### Firefox 動向

#### Stable: 117

#### Updates

- Firefox 116.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/116.0/releasenotes/
- Firefox 116 for developers - Mozilla | MDN
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/116
  - CSP3 external hashes
- Firefox 117.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/117.0/releasenotes/
- **Firefox 117 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/117
  - CSS Nesting
  - `ReadableStream.from()`
  - Insertable Streams
- A View to a Better, Faster Web - These Weeks in Firefox: Issue 143
  - https://blog.nightly.mozilla.org/2023/08/10/a-view-to-a-better-faster-web-these-weeks-in-firefox-issue-143/
- Unboxing More DevTools Powers, and Reusable Delights - These Weeks in Firefox: Issue 144
  - https://blog.nightly.mozilla.org/2023/08/10/unboxing-more-devtools-powers-and-reusable-delights-these-weeks-in-firefox-issue-144/

#### Intents

- Ship: Font Visibility Restrictions in private browsing windows
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/VlJ1hvCvFE4/m/uNpfryq3AQAJ
- **Ship: Blob URL Partitioning (Total Cookie Protection)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/1gt1CVIoffc
- Ship: privacy improvements in `enumerateDevices()`
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/AJp9KF5Ml3w
- Ship: Font Visibility Restrictions in private browsing windows
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/VlJ1hvCvFE4
- **Ship: OpaqueResponseBlocking (ORB)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ROU9eDb8alY
- Implement and Ship: CSS `font-synthesis-position` property
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/BBGoz5L8054
- Prototype and Ship: CSS `:first` (first-page pseudo-class)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/gvPfed-oJ6E
- **Prototype and Ship: `<search>` element**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/1Eoh9zcTt08
- **Prototype: `:has` selector**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/cU6CraMlGsA
- Prototype: Global Privacy Control
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/oLcaavM2834
- **Experiment and Ship: Encrypted Client Hello**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/uv7PNrHUagA
- Unship: `:-moz-loading` / `:-moz-broken` pseudo-classes
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Jg0lWvsnCv8
- Unship: `mozactionhint` attribute
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/9i3Hx2eJSGQ
- Soft code freeze for Firefox 118 starts on August 24
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/q-yldubgQZU

#### Newsletter

- SpiderMonkey Newsletter (Firefox 116-117)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/gSza5Y51VNU
- Firefox DevTools Newsletter
  - https://fxdx.dev/firefox-devtools-newsletter-117/
- Firefox WebDriver Newsletter
  - https://fxdx.dev/firefox-webdriver-newsletter-117/

#### MDN / Open Web Docs

- Creating custom easing effects in CSS animations using the `linear()` function | MDN Blog
  - https://developer.mozilla.org/en-US/blog/custom-easing-in-css-with-linear/
- **Announcing the MDN front-end developer curriculum | MDN Blog**
  - https://developer.mozilla.org/en-US/blog/announcing-mdn-front-end-developer-curriculum/
- Micro benevolences
  - https://openwebdocs.org/content/posts/micro-benevolences/

#### Standard Position

- 今月 Close されたものをみる
  - https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2023-08-01+
- **X25519Kyber768 key encapsulation for TLS · Issue #874 · mozilla/standards-positions**
  - https://github.com/mozilla/standards-positions/issues/874
  - Positive

#### Other

- Prepare your Firefox desktop extension for the upcoming Android release | Mozilla Add-ons Community Blog
  - https://blog.mozilla.org/addons/2023/08/10/prepare-your-firefox-desktop-extension-for-the-upcoming-android-release/
- Autogenerating Rust-JS bindings with UniFFI - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2023/08/autogenerating-rust-js-bindings-with-uniffi/
- Mozilla Seeks New Leader for Its Movement-Building Arm
  - https://blog.mozilla.org/en/mozilla/mozilla-seeks-new-leader-for-its-movement-building-arm/
- Welcome Suba Vasudevan, Mozilla's new Senior Vice President of Strategy and Operations
  - https://blog.mozilla.org/en/mozilla/leadership-suba-vasudevan/
- Protect your information with email masks now available in Firefox
  - https://blog.mozilla.org/en/mozilla/protect-your-information-with-email-masks-now-available-in-firefox/
- **The endpoint of Web Environment Integrity is a closed Web**
  - https://educatedguesswork.org/posts/wei/
- **Private Access Tokens, also not great**
  - https://educatedguesswork.org/posts/private-access-tokens/

### Safari 動向

#### Stable: 16.6

#### Updates

- Safari 16.6 Release Notes
  - https://developer.apple.com/documentation/safari-release-notes/safari-16_6-release-notes
- **Safari Technology Preview 176**
  - https://webkit.org/blog/14401/release-notes-for-safari-technology-preview-176/
  - CSS
    - Added support for contain-intrinsic-size: inherit (266100@main)
    - **Implemented `linear(...)` timing function for CSS animations & transitions (266195@main)**
  - Rendering
    - Fixed out-of-flow boxes not showing (266366@main)
    - Fixed canvas not showing the results of CanvasRenderingContext2D.putImageData until a forced re-render (266397@main)
    - Fixed scrollbar not updating on CSS color-scheme change (266176@main)
    - Prevented invalidating columns when the entire table is being destroyed (266344@main)
  - Accessibility
  - Media
    - Implemented automatic text track selection for 'metadata' tracks (266380@main)
  - Web API
    - **Added support for the title attribute for pattern validation errors (266311@main)**
    - Aligned naturalWidth and naturalHeight with spec, changing from int to unsigned (266302@main)
    - Changed to return opaque origin for blob: URL containing inner non-http(s): URL (266247@main)
    - Converted embed hidden into a proper boolean attribute (266399@main)
    - Throttled mousemove events to one per rendering update (266341@main)
- **Updates to Storage Policy**
  - https://webkit.org/blog/14403/updates-to-storage-policy/
  - localStorage, Cache API, IndexedDB, Service Worker, and File System が対象
  - Origin 単位の Quota と Overall の Quota の二軸で管理
  - Origin Quota
    - 制限超えると例外
    - ブラウザ/ Web アプリはディスク空き容量の 60%
    - 他のアプリはディスク空き容量の 20%
    - クロスオリジンはメインフレームの 1/10
  - Overall Quota
    - 制限超えると削除による解放
    - ブラウザ/Web アプリはディスク空き容量 80%
    - 他のアプリはディスク空き容量 15%
  - 基本全てはベストエフォート、永続したい場合はリクエストする
    - `navigator.storage.persist()`
- **Release Notes for Safari Technology Preview 177**
  - https://webkit.org/blog/14412/release-notes-for-safari-technology-preview-177/
  - ほぼ Fix
  - JavaScript
    - Optimized Array#splice to skip result array creation if it is not used at all (266591@main)
- **Building Profiles with new WebKit API**
  - https://webkit.org/blog/14423/building-profiles-with-new-webkit-api/
  - Webkit ではあるがブラウザの話ではない

#### Standard Positions

- 今月 Close されたものをみる
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2023-08-01+
- `content-visibility: auto` forces `contain-intrinsic-size: auto` · Issue #228
  - https://github.com/WebKit/standards-positions/issues/228
  - Support
- Zstandard compression format for Content-Encoding · Issue #168
  - https://github.com/WebKit/standards-positions/issues/168
  - Support
- Update and overflow media features · Issue #146
  - https://github.com/WebKit/standards-positions/issues/146
  - Support
- scrollbar-width CSS Property · Issue #133
  - https://github.com/WebKit/standards-positions/issues/133
  - Support
- **Customized built-in elements · Issue #97**
  - https://github.com/WebKit/standards-positions/issues/97
  - Oppose
- CSS highlight pseudo system · Issue #95
  - https://github.com/WebKit/standards-positions/issues/95
  - Support
- CSS `initial-letter` property · Issue #94
  - https://github.com/WebKit/standards-positions/issues/94
  - Support
- **View Transitions API Level 1 · Issue #48**
  - https://github.com/WebKit/standards-positions/issues/48
  - Support

#### Other

- **Blog - 2024 Apple Security Research Device Program now accepting applications - Apple Security Research**
  - https://security.apple.com/blog/security-research-device-program-2024/

### Edge 動向

#### Stable: 116

#### Updates

- **Collaborating with Open Web Docs for great PWA docs**
  - https://blogs.windows.com/msedgedev/2023/08/09/pwa-documentation-mdn-web-docs-open-web-docs/
- **Publish your PWA to the Microsoft Store on Windows for free with PWABuilder**
  - https://blogs.windows.com/msedgedev/2023/08/16/publish-your-pwa-to-the-microsoft-store-on-windows-for-free-with-pwabuilder/
  - 8/15-9/15 まで無料
- Microsoft Edge for Business is now available, helping organizations maximize productivity and security
  - https://blogs.windows.com/msedgedev/2023/08/22/microsoft-edge-for-business-now-available/
- **Announcing support for HSTS on Exchange Server 2016 and 2019 - Microsoft Community Hub**
  - https://techcommunity.microsoft.com/t5/exchange-team-blog/announcing-support-for-hsts-on-exchange-server-2016-and-2019/ba-p/3912740

#### Other

- **Edge のよくあるご質問 | Japan Developer Support Internet Team Blog**
  - https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/edge-faq/
- Enforcing SmartScreen with Policy - text/plain
  - https://textslashplain.com/2023/08/14/enforcing-smartscreen-with-policy/
- Attack Techniques: QR Codes - text/plain
  - https://textslashplain.com/2023/08/18/attack-techniques-qr-codes/
- SmartScreen Application Reputation, In Pictures - text/plain
  - https://textslashplain.com/2023/08/23/smartscreen-application-reputation-in-pictures/

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
- Chartering
  - Proposed W3C Charter: Decentralized Identifier (DID) Working Group Extended
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0002.html
  - Securing the Internet and WWW Community Group Proposed
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0005.html
  - Financial Services Business Group created
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0007.html
  - Healthcare Services Business Group Proposed
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0008.html
  - Proposed W3C Charter: Web Editing Working Group
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0009.html
  - Computational Intelligence Business Group Proposed
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0010.html
  - Advance notice: Work in progress on Portable Network Graphics Working Group Charter; PNG WG Extended
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0011.html
  - Chinese DID & VC Best Practices Community Group created
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0013.html
  - Proposed W3C Charter: Math Working Group Extended
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0016.html
  - **Service Worker Static Routing API incubation**
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0019.html
  - Proposed W3C Charter: Pointer Events Working Group Extended
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0020.html
  - Advance notice: Work in progress on Web Application Security Working Group Charter; Current Charter Extended
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0021.html
  - Web Performance Working Group Charter Extended
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0022.html

#### Other

- **Web Environment Integrity has no standing at W3C; understanding new W3C work**
  - https://www.w3.org/blog/2023/web-environment-integrity-has-no-standing-at-w3c/
  - WEI はまだ提案に過ぎないよという話と、 W3C で提案はどのように持ち込まれるかという話
  - ワーキンググループのチャータリング、 TAG review などのレビューを経た上で、複数の実装があってはじめて標準になる
- **Add switch attribute to the input element to allow for a two-state switch control. by lilyspiniolas · Pull Request #9546 · whatwg/html**
  - https://github.com/whatwg/html/pull/9546
    - Apple がスイッチコントロールの `<input type="checkbox" switch>` を提案
- **Draft Note: Guidance on Applying WCAG 2.2 to Non-Web Information and Communications Technologies (WCAG2ICT)**
  - https://www.w3.org/news/2023/draft-note-guidance-on-applying-wcag-2-2-to-non-web-information-and-communications-technologies-wcag2ict/
- **Agenda for Aug 31st, 2023 · Issue #400 · web-platform-tests/interop**
  - https://github.com/web-platform-tests/interop/issues/400
  - 2023 年 9 月 14 日からプロポーザルを募集

### TC39 動向

#### Meeting

- Meeting Note が公開された時だけやる、それ以外はやらない。
- 2023-07
  - tc39 minutes を読む
    - https://twitter.com/mozaicfm/status/1696512252130853324
  - notes
    - https://github.com/acutmore/notes/tree/a6592d28f2effcab79551f0fd7422a1229d82683/meetings/2023-07
    - note の PR が閉じられているので、 main ではなくブランチのリンクになっている
  - agenda
    - https://github.com/tc39/agendas/blob/main/2023/07.md
- **Stage 3 update of Intl Locale Info API**
  - https://github.com/tc39/proposal-intl-locale-info/pull/70 PR これ?
  - Date: Number: 0..6 (1 = Monday, 0 = Sunday)
  - Temporal: Number: 1..7 (1= Monday, 7 = Sunday)
  - Intl.Locale: String (three letters): ("mon"... "sun")
  - 3 つとも曜日を表す方法がバラバラ
  - でもコンセンサスできなかった?
- Base64
  - One Shot はいいけど Stream もしたい
  - その場合どうやって状態を持つか
  - 合意には至らず
- Source Phase Imports for Stage 3
  - "source" という言葉についての bikeshed を解決する、という条件付きの Stage 3
  - Dynamic Imports のシンタックスが import.source() に変更された
- Decimal: Open-ended discussion
  - Decimal128 か BigDecimal かで議論
  - 他にも色々
  - どういう方向かまだ結論は出てない
- Optional chaining in assignment LHS for stage 1 or 2
  - Optional Chaining を代入の左辺に指定したい
  - 全部あったら代入する
  - Stage1
- **Reducing wasted effort due to proposal churn**
  - Stage 3 で normative change が発生しまくると、実装者が大変
  - 2 と 3 の間に実装はしないが test262 などを整備し始めるフェーズが欲しい
  - we can call it Stage 2 ¾ for now
  - Stage 3 での実装は推奨しないが、あっても別に良いはず。
  - 実装してわかることもあるだろうし
  - なので、気持ちはわかるがプロセスとしては変更なし
- DataView get/set Uint8Clamped methods for stage 1 or 2 or 3
  - DataView に Uint8Clamped が欲しい
  - Stage1
- Stop Coercing Things
  - at() に文字列を渡すと 0 に丸めてしまう
  - こういう暗黙変換をやめないか? という提案
  - 新たしい仕様については基本そうしていくという合意
- **Meta-review of Stage 3 proposals**
  - Stage3 のものを一個一個サマライズして確認する作業が行われた
  - 一行まとめが非常にわかりやすい
  - JSON Modules: HTML へのインテグレーションを待ってる
  - Legacy RegExp Features in JavaScript: 実装者/チャンピオンが興味を失ってる
  - RegExp modifiers: 進んでる
  - Duplicate Named Capture groups: Safari が Ship 予定、 Mozilla は実装中
  - Shadow Realm: HTML のインテグレーションでブロックされてる、要確認。

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2023-01-01}...main@{2023-02-01}
- https://tc39.github.io/beta/
- 0->1
  - Optional chaining in assignment
  - DataView get/set Uint8Clamped method
- 1->2
  - deferring module evaluation
- 2->3
  - import attributes
  - Promise.withResolvers
  - Array Grouping
  - Source phase imports
- 3->4

#### New Proposals

- **tc39/proposal-optional-chaining-assignment**
  - `a?.b = c` proposal
  - https://github.com/tc39/proposal-optional-chaining-assignment
- **tc39/proposal-dataview-get-set-uint8clamped**
  - TC39 proposal to add DataView.prototype.getUint8Clamped and DataView.prototype.setUint8Clamped
  - https://github.com/tc39/proposal-dataview-get-set-uint8clamped
- **tc39/proposal-defer-import-eval**
  - A proposal for introducing a way to defer evaluate of a module
  - https://github.com/tc39/proposal-defer-import-eval

#### Other

### WinterCG 動向

- Meeting や大きな動きがあった月だけやる

#### Meeting

- **2023-08-03 Meeting**
  - https://github.com/wintercg/admin/issues/53
  - `import.meta.*` をどう標準化するかの議論
  - `resolve`, `url`, `main` の三つを標準化
  - 拡張は名前空間を切る
  - key には runtime-keys を使う
  - という方向で進める

### IETF 動向

#### IETF117

- IETF117 復習
  - https://twitter.com/mozaicfm/status/1687086573723209729
  - https://docs.google.com/document/d/1Y6VrvIVXCJFWEgmF5hBmXDwYA2yVn3ocm-Ys6MjvNCE/edit#heading=h.xzmznf1v1i1u

#### WG

- IETF
  - https://datatracker.ietf.org/meeting/
  - RFC 9380 on Hashing to Elliptic Curves
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/Ss-khj93IyXsn_K8toK1bM4uaCQ/
  - RFC 9381 on Verifiable Random Functions (VRFs)
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/gDLTTYF2aJFzlZsKoLB3jW4OevE/
  - RFC 9439 on Application-Layer Traffic Optimization (ALTO) Performance Cost Metrics
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/mJmiy8v_yBpXxHc8g3Jg-m3VAaE/
  - RFC 9444 on Automated Certificate Management Environment (ACME) for Subdomains
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/2fQq86QrVOroW9LeTxnqwHB0cvk/
  - Protocol Action: 'Certification Authority Authorization (CAA) Processing for Email Addresses' to Proposed Standard (draft-ietf-lamps-caa-issuemail-07.txt)
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/MWDpe-DiBi6X4lpRfmze8V9m3iA/
  - Protocol Action: 'Ephemeral Diffie-Hellman Over COSE (EDHOC)' to Proposed Standard (draft-ietf-lake-edhoc-22.txt)
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/hjUNBxzPHTJj-fPsEFfluuedpH8/
  - Protocol Action: 'HTTP Message Signatures' to Proposed Standard (draft-ietf-httpbis-message-signatures-19.txt)
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/4u6ZgquMXu-oa2f23mUgSLuXozI/
  - **Protocol Action: 'Oblivious HTTP' to Proposed Standard (draft-ietf-ohai-ohttp-09.txt)**
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/B-ba3ZiZGEMFTMaKkvPe1Oyfh4Q/
  - Protocol Action: 'Service Identity in TLS' to Proposed Standard (draft-ietf-uta-rfc6125bis-15.txt)
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/l64ClCLcUWrcSZ0nsOdSb1s2NdU/
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - Structured Field Values Bis - Mark Nottingham
    - Authentication に影響??
  - WebSockets Design Team Report - Lucas Pardue
    - DNS でいいんじゃないかという提案
    - 他のバージョンでもつながるようにデプロイされてないことの問題では?
  - Secondary Cert
    - 引き続き要検討
  - Compression Dictionary Transport - Patrick Meenan
    - Adoption
  - HTTP Availability Hints - Mark Nottingham
    - Cloudflare を始め interest がちらほら
  - HTTP Cache Groups / An HTTP Cache Invalidation API - Mark Nottingham
    - やっていきそう
  - **Request-OTR Header**
    - サーバから Private Mode を強制できる
    - WebAppSec とか Privacy CG が興味あってやっていく
- quicwg
  - https://mailarchive.ietf.org/arch/browse/quic/
  - https://github.com/quicwg/wg-materials
- webtrans
  - https://mailarchive.ietf.org/arch/browse/webtransport/
  - https://github.com/DavidSchinazi/webtrans-wg-materials
- tlswg
  - https://mailarchive.ietf.org/arch/browse/tls/
  - https://github.com/tlswg/wg-materials
- wpack
  - https://mailarchive.ietf.org/arch/browse/wpack/
- masque
- pearg
- privacypass
- dispatch
  - https://mailarchive.ietf.org/arch/browse/dispatch/
- secdispatch
  - https://mailarchive.ietf.org/arch/browse/secdispatch/
- ohai
  - Protocol Action: 'Oblivious HTTP' to Proposed Standard (draft-ietf-ohai-ohttp-09.txt)
    - https://mailarchive.ietf.org/arch/msg/ohai/Pv3G-YJkT_1ICR_8gQ09XMmzJTc/
  - I-D Action: draft-ietf-ohai-svcb-config-05.txt
    - https://mailarchive.ietf.org/arch/msg/ohai/04X67rOclRM-QIwypAMWeQx1UFc/
  - draft-ohai-chunked-ohttp-00
    - https://mailarchive.ietf.org/arch/msg/ohai/ZePVyu7vNvIX4GF90PUAzcXv1As/
  - I-D Action: draft-ietf-ohai-ohttp-10.txt
    - https://mailarchive.ietf.org/arch/msg/ohai/Wy0iU6cv3akI5Wt5goMjGpNrbbw/

#### Other

- **RFC Numbers for Testing and Example Use**
  - https://www.ietf.org/archive/id/draft-eastlake-test-rfc-numbers-00.html

### CDN 動向

#### Cloudflare

- 2022 年に最も悪用された脆弱性を明らかに
  - https://blog.cloudflare.com/ja-jp/unmasking-the-top-exploited-vulnerabilities-of-2022-ja-jp/
- **Cloudflare の「2023 年フィッシング脅威レポート」のご紹介**
  - https://blog.cloudflare.com/ja-jp/2023-phishing-report-ja-jp/
- オンラインセキュリティと 2023 年の攻撃情勢に関する 8 月の読み物リスト
  - https://blog.cloudflare.com/ja-jp/an-august-reading-list-about-online-security-and-2023-attacks-landscape-ja-jp/
- Application Security Report: Q2 2023
  - https://blog.cloudflare.com/application-security-report-q2-2023/
- Cloudflare Radar's 2023 overview of new tools and insights
  - https://blog.cloudflare.com/cloudflare-radars-2023-overview-of-new-tools-and-insights/

#### Fastly

- Join Fastly at Black Hat 2023 | Fastly
  - https://www.fastly.com/blog/join-fastly-at-black-hat-2023
- 脅威インテリジェンスレポート : 数兆件に及ぶリクエストデータに基づく攻撃トレンド | Fastly
  - https://www.fastly.com/jp/blog/network-effect-threat-report-uncovering-the-power-of-collective-threat
- Back to Basics: Directory Traversal | Fastly
  - https://www.fastly.com/blog/back-to-basics-directory-traversal
- Fastly Participates in the EU-US Data Privacy Framework | Fastly
  - https://www.fastly.com/blog/fastly-participates-in-the-eu-us-data-privacy-framework

#### Other

- Private Mobile Connectivity: More Visibility, Security, and Control | Akamai
  - https://www.akamai.com/blog/edge/private-mobile-connectivity-more-visibility-security-control
- Akamai Defends Against the OWASP Top 10 API Security Risks | Akamai
  - https://www.akamai.com/blog/security/akamai-defends-against-owasp-top-10-api-security-risks
- Akamai Develops Real-Time Detections for DNS Exfiltration | Akamai
  - https://www.akamai.com/blog/security/akamais-real-time-detections-for-dns-exfiltration
- 3 Steps to Elevate Your Cybersecurity in a Post-Pandemic World | Akamai
  - https://www.akamai.com/blog/security/3-steps-elevate-cybersecurity-post-pandemic-world
- DDoS Attacks Surge Against Vulnerable Assets: Are You Prepared? | Akamai
  - https://www.akamai.com/blog/security/ddos-attacks-surge-against-vulnerable-assets

### セキュリティ動向

- **Using short-lived certificates to protect TLS secrets - Engineering at Meta**
  - https://engineering.fb.com/2023/08/07/security/short-lived-certificates-protect-tls-secrets/
- **How Meta is improving password security and preserving privacy - Engineering at Meta**
  - https://engineering.fb.com/2023/08/08/security/how-meta-is-improving-password-security-and-preserving-privacy/

### 周辺動向

- **Celebrating Ten Years of Encrypting the Web with Let's Encrypt | Electronic Frontier Foundation**
  - https://www.eff.org/deeplinks/2023/08/celebrating-ten-years-encrypting-web-lets-encrypt

### イベント

- 7 月
  - 11-13: TC39
    - https://github.com/tc39/agendas/blob/main/2023/07.md
  - 22-28: IETF | IETF 117 San Francisco
    - https://www.ietf.org/how/meetings/117/
- 8 月
- 9 月
  - 7: WEB+DB PRESS 創刊 22.9 周年パーティ(副題 うまい肉と IPA) - connpass
    - https://connpass.com/event/285724/
  - 11-15: TPAC 2023
    - https://www.w3.org/2023/09/TPAC/
  - 26-28: TC39
    - https://github.com/tc39/agendas/blob/main/2023/09.md
  - 26-28: W3C Workshop Secure the Web Forward
    - https://www.w3.org/2023/03/secure-the-web-forward/
- 10 月
  - 17-19: BlinkOn18
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/19KSuM7ywhs

### Wrap Up

- Chrome
  - 116
    - Document Picture-in-Picture
  - 117 Beta
    - `@starting-style`, `overlay`, `transition-behavior`
    - Subgrid
    - `text-wrap: pretty`
    - Array grouping
    - Iteerator helpers
    - deprecate `unload`
  - Ship
    - vertical form controls
    - `<search>`
    - Bounce Tracking Mitigations
    - Japanese phrase line breaking
  - Prototype
    - Document Render-Blocking
    - CJK punctuation kerning
    - Sicky state container queries
    - Page-Embedded Permission Control
    - `form-sizing`
  - Experiment
    - X25519Kyber768 for TLS
  - Deprecate and Remove
    - Sanitizer API MVP
  - Chrome Developers
    - deprecating `unload`
    - `scheduler.yield` origin trial
    - Astro View Transitions
    - Faster Chrome releases round two
    - First-Party Sets → Related Website Sets
  - Chromium blog
    - redesigning downloads UI
    - Hybrid Kyber KEM
    - towards HTTPS by default
  - other blogs
    - faster security updates
    - Key Pinning to Android
  - other
    - Chrome Security Q2 summary
- Firefox
  - 116
  - 117
    - CSS Nesting
  - Ship
    - ORB
    - `<search>`
  - Prototype
    - `:has()`
    - Global Privacy Control
  - other intents
    - Encrypted Client Hello
  - MDN Blog
    - MDN front-end developer curriculum
  - other
    - positive on X25519Kyber768
    - ekr on WEI and Private Access Tokens
- Safari
  - TP 176
    - `linear()`
    - `title` for form pattern validation errors
  - TP 177
  - blog
    - updates to Storage Policy
  - other
    - negative on Customized built-in elements
    - support on View Transitions Level 1
- Edge
  - Edge のよくあるご質問
- W3C/WHATWG
  - other
    - Service Worker Static Routing incubation
    - WEI and W3C Process
    - `<input type="checkbox" switch>` proposal from Apple
    - Interop 2024 timeline
- TC39
  - Stage 3 updates on Intl Locale Info API
  - Stage 2 ¾
  - Stage 3 meta-reviews
- WinterCG
  - `import.meta.*` standardization
- IETF
  - OHTTP to Proposed Standard
  - Request-OTR
  - RFC numbers for testing/example
- CDN 動向
  - Cloudflare 2023 phishing report
- セキュリティ動向
  - Meta on short-lived certificates
- 周辺動向
  - 10 years anniv of Let's Encrypt
