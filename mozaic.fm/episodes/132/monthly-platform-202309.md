---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep132.mp3
published_at: 2023-10-01
guest: [@myakura](https://twitter.com/myakura)
---

# ep132 Monthly Platform 202309

## Theme

第 132 回のテーマは 2023 年 9 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 117

#### Updates

- **New in Chrome 117**
  - https://developer.chrome.com/en/blog/new-in-chrome-117/
  - New CSS features for entry and exit animations.
  - Array grouping
  - Local overrides streamlined in DevTools.
  - And more!
    - The much anticipated subgrid value for grid-template-columns and grid-template-rows is now implemented in Chrome.
    - There is a WebSQL deprecation trial and a developer trial for the unload event deprecation.
    - The notRestoredReasons API for bfcache, mentioned in the video for Chrome 116, should be launching in this version.
- **Chrome 118 beta**
  - https://developer.chrome.com/en/blog/chrome-118-beta/
  - CSS
    - Scoped styles
    - CSS logical flow-relative values
    - Media Queries: prefers-reduced-transparency feature
    - Media Queries: scripting feature
    - Support stroke-box, content-box, and border-box in the transform-box CSS property
  - HTML
    - Keyboard-focusable scroll containers
    - Remove quirks mode behavior for option label attribute
  - Web APIs
    - Enrollment for Privacy Sandbox (PSB)
    - Block all cookies set via JavaScript that contain control characters
    - Consistent minimum font size across languages
    - Detect UA transitions on same-document navigations
    - URL parser will not decode percent-encoded ASCII characters in URL's path
    - Protected Audiences negative targeting
    - Remove payment user activation requirement
    - WebUSB in Extension Service Workers
    - XML documents merge consecutive CDATA sections into single node
    - Change beforeunload handler dialog condition
  - Origin trials in progress
    - WebRTC encoded transform: modify metadata functions
  - Deprecations and removals
    - Removal of some non-standard appearance keywords
  - Background
- **What's New in DevTools (Chrome 118) - Chrome for Developers**
  - https://developer.chrome.com/en/blog/new-in-devtools-118/
  - New section for custom properties in Elements > Styles
  - More local overrides improvements
  - Enhanced search
  - Improved Sources panel
    - Streamlined workspace in the Sources panel
    - Reorder panes in Sources
    - Syntax highlighting and pretty-printing for more script types
  - Emulate prefers-reduced-transparency media feature
  - Lighthouse 11
  - Accessibility improvements

#### Intents

- **Ship: :user-valid and :user-invalid CSS pseudo-classes**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UpB_u-wvNeA
- Ship: Attribution Reporting features (change registration limit, remove 1hr delay)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Mh-mJiyJZFk
- Ship: Baselines in New TextMetrics API in Canvas
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AORzxU_ZNTk
- Ship: Bounce Tracking Mitigations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Lxi7LfRyI4c
- Ship: CSS Relative Color Syntax (RCS)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KeKBTjKEdaU
- Ship: Detect UA Transitions on same-document Navigations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OTGqhEZ7aug
- Ship: Enrollment for Privacy Sandbox
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/J-nlzLKZvA0
- Ship: Fenced Frames - Functionality Updates
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2FKlwNZ0J4Q
- **Ship: HTML search element**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5CHw-SXYKGc
- **Ship: Japanese Phrase Line Breaking**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/96q7WtXtWXc
- Ship: Media Queries: scripting feature
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jiCB_twBqnk
- Ship: Payment handler minimal header UX
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FJegKzRBcDY
- Ship: Protected Audience directFromSellerSignals via HTTP response headers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JpWOdoPi5Wo
- Ship: Sec-CH-Prefers-Reduced-Transparency User Preference Media Features Client Hints Header
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KgSc7mn6pws
- **Ship: TLS Encrypted Client Hello (ECH)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CmlXjQeNWDI
- Ship: view-timeline shorthand sets view-timeline-inset
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yjfaImiMaXE
- Ship: WebAssembly Garbage Collection (WasmGC)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/K_GpDF0y5Q8
- Ship: Change SVGClipPathElement to inherit from SVGElement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Hq3r7dB6yoc
- Ship: DTLS ClientHello extension permutation (WebRTC)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1CIKec0W1fg
- **Ship: Deprecate TLS SHA-1 server signatures**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aFBsv39UqGE
- **Ship: Horizontal rules inside select elements**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fklS2qR8Wm4
- Ship: Partitioning Storage, Service Workers, and Communication APIs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/24hK6DKJnqY
- Ship: Private Network Access restrictions for automotive
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fCz5k9OPFAA
- **Ship: Promise.withResolvers**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JL4uXtfrCdU
- Ship: Protected Audiences Negative Targeting
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xzrWfs-BwFk
- Ship: WebRTC Codec Selection API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-RicKxNXe4U
- Ship: Intersection Observer Scroll Margin
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ax8rTBusZ4s
- Ship: Private Aggregation API bundled enhancements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cNK_uuCaNMs
- **Ship: Unprefix -webkit-background-clip for "text" and make it an alias**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/szcfsqyaFsg
- **Ship: Close requests for CloseWatcher, `<dialog>`, and popover=""**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jM5au7yYzHM
- Ship: Shared Storage API Enhancements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QWC8SnyOdzI
- Implement: WebGL drawingBufferStorage
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KhHQFVladnQ
- Prototype and Ship: Allow transferring ArrayBuffer into VideoFrame, AudioData, EncodedVideoChunk, EncodedAudioChunk, ImageDecoder constructors
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yZS0DLCwl6w
- Prototype and Ship: Clip-path `xywh()` and `rect()` values
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_ur5SByM_rg
- Prototype and Ship: Generic Sensor WebDriver endpoints
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cEp5jLjWDu8
- Implement and Ship: AudioEncoderConfig.bitrateMode
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ROW2C8i6g24
- Implement and Ship: DisplayMediaStreamOptions monitorTypeSurfaces
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/t3kqlI58U8Q
- Implement and Ship: SVGImageElement.crossOrigin attribute.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IjZW1CQNNxM
- Implement and Ship: User-Agent Client Hints on Android WebView
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HllilgilEso
- Implement and Ship: CaptureStartFocusBehavior enum value "focus-capturing-application"
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/B2jT8PG8Lww
- Implement and Ship: Feature detection for supported clipboard formats
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pjpN9Lwv5Tk
- **Prototype: CJK punctuation kerning: the CSS `text-spacing-trim` property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NCUfiS4K32E
- Prototype: CSS Sticky State Container Queries
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/C1D321h3OnA
- Prototype: FedCM Improvements: Error API, Account Auto Selected Flag, Hosted Domain and Revocation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YfaGM8v-Ocs
- Prototype: Initiator Info in Resource Timing API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ew98DDMuD9U
- Prototype: Media Queries: scripting feature
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nf3I6lAuHqo
- **Prototype: Page-Embedded Permission Control**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TGsrhP4ref0
- Prototype: Private Network Access restrictions for automotive
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MO2HmKaFe8c
- **Prototype: Sec-CH-UA-Form-Factor client hint**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RL7nmVio2PM
- Prototype: Third-Party Cookie Phaseout
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8mlWTOcEzcA
- Prototype: Web Preferences API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UNfjkjHAPOM
- Prototype: WebDriver commands for triggering Bounce Tracking Mitigations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VMTLpimgZTo
- **Prototype: form-sizing CSS property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cA-cmgrA_QE
- Prototype: Snapchanged Events
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AGsZy1WSIS0
- **Prototype: CSS dynamic-range-limit property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jzSeH70To2s
- Prototype: ExportID for cross ShadowRoot ARIA
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CEdbbQXPIRk
- **Prototype: HTMLSelectElement showPicker()**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6MUAqY2r3Hg
- Prototype: Intersection Observer Scroll Margin
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oyarD9dGSUk
- Prototype: Face-Framing API.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LyQu9L_Iv58
- **Prototype: Mesh2D Canvas API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bqKJhWf6Lgk
- Prototype: NavigateEvent sourceElement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fJhFQV-2v38
- **Prototype: Observable API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kPoFF2SREq8
- **Prototype: 'firstrender' event**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ujfh4GwHn4E
- **Prototype: Device Bound Session Credentials (DBSC)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xvZJPpXNS8Y
- Prototype: Third-party cookie deprecation exemption heuristics
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Eeh2pE0DRaE
- Experiment: X25519Kyber768 key encapsulation for TLS
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xb4JCKhED3k
- Experiment: WebAssembly JS String Builtins
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GAiSZ-13cas
- Experiment: Partitioning :visited links history Phase 1
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/U5AX0OXaxM8
- Experiment: Open popups as fullscreen windows
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nYd8lBVannY
- Extend Experiment: Speculation Rules - Document rules, response header
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7nE9rGwpXGc
- Deprecate and Remove: Dangling markup in target name
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UKk_LnqinxA
- Deprecate and Remove: Same-origin blanket enforcement in CSPEE
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VtKJHVgQRzE
- Experiment:
- Change:
- Unship:
- Remove:
- PSA: Add missing unit value functions to numeric factory for the CSS typed OM api
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/G2FRzCW21DA
- PSA: Adjacent CDATA sections in XML documents will now be merged
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GhRScWaK1DI
- PSA: Disallowing unknown import attributes keys
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WMhGw7OMvWA
- PSA: Improved covering and nested scroll snap handling
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nrv9MtQ7BDY
- PSA: Largest Contentful Paint now includes videos
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BvXwybMPvTw
- PSA: Extending Storage Access API (SAA) to non-cookie storage Explainer
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Mfkj1VqsKX0
- PSA: Opener Storage Partitioning Explainer
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pWbFePTUnB4
- PSA: Minor additions to WebGPU
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DP55Uadw7-o
- PSA: CSS Counters rework
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/a76jqhavMno
- **PSA: Fire beforeinput event before compositionupdate event during IME composition.**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/spwtbdODC3Q
- PSA: Enabling partitioned 3rd party storage when "Block 3rd Party Cookies" setting is enabled
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uppiYp7lIpY
- Launching streamlined intent process
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bqvB1oap0Yc
- Are you interested in hosting a talk at BlinkOn 18? Sign up now!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lrniskJOlJg
- Action required: You're invited to BlinkOn 18 on Oct 17-19th!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wj5NjvyzIXI
- Call for lightning talks at BlinkOn18!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zDwHtJY2vJg
- FYI that new Topics Taxonomy (v2) is starting to roll out to Stable soon
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/v5Cl0tecNW4
- We've opened up more space for Lightning Talks
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/V8B18YjODy8

#### Other

- web.dev
  - Four common types of code coverage
    - https://web.dev/ta-code-coverage/
  - **Submit your proposals for Interop 2024**
    - https://web.dev/interop-2024-proposals/
  - **CSS Subgrid**
    - https://web.dev/css-subgrid/
- google developer blog
  - Celebrating 25 years of Google Search: developer trends and history - Google for Developers Blog - News about Web, Mobile, AI and Cloud
    - https://developers.googleblog.com/2023/09/25-years-google-search-developer-trends.html
- google developer japan blog
  - **Google Developers Japan: BudouX: 読みやすい改行のための軽量な分かち書き器**
    - https://developers-jp.googleblog.com/2023/09/budoux-adobe.html
- chrome developer blog
  - https://developer.chrome.com/blog/
  - Google Summer of Code and Chrome Extensions
    - https://developer.chrome.com/en/blog/google-summer-of-code-and-chrome-extensions/
  - What's New in WebGPU (Chrome 117)
    - https://developer.chrome.com/en/blog/new-in-webgpu-117/
  - From WebGL to WebGPU - Chrome for Developers
    - https://developer.chrome.com/en/blog/from-webgl-to-webgpu/
  - **We are Chrome for Developers - Chrome for Developers**
    - https://developer.chrome.com/en/blog/we-are-chrome-for-developers/
  - **Seamless navigation made possible with view transitions - Chrome for Developers**
    - https://developer.chrome.com/en/blog/view-transitions-case-studies/
- chromium blog
  - Chromium Blog: Unveiling the Chrome Web Store's Redesign
    - https://blog.chromium.org/2023/09/unveiling-chrome-web-stores-redesign.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - Google Online Security Blog: Capslock: What is your code really capable of?
    - https://security.googleblog.com/2023/09/capslock-what-is-your-code-really.html
  - **Google Online Security Blog: Scaling Rust Adoption Through Training**
    - https://security.googleblog.com/2023/09/scaling-rust-adoption-through-training.html
  - Google Online Security Blog: SMS Security & Privacy Gaps Make It Clear Users Need a Messaging Upgrade
    - https://security.googleblog.com/2023/09/sms-security-privacy-gaps-make-it-clear.html
- v8
  - https://v8.dev/
- other
  - **ブラウザで Gmail の最新バージョンを使用する - Gmail ヘルプ**
    - https://support.google.com/mail/answer/15049?hl=ja
    - > 重要: 2024 年 1 月までは、簡易 HTML 形式を使用してブラウザで Gmail を表示できます。この日を過ぎると、 Gmail は自動的に標準 HTML 形式に変更されます。
    - TenFourFox Development: Google ending Basic HTML support for Gmail in 2024
      - https://tenfourfox.blogspot.com/2023/09/google-ending-basic-html-support-for.html

### Firefox 動向

#### Stable: 118.0

#### Updates

- Firefox 118.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/118.0/releasenotes/
- Firefox 118 for developers - Mozilla | MDN
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/118
  - `<search>`
  - CSS `abs()`, `sign()`, `round()`, `mod()`, `rem()`, `pow()`, `sqrt()`, `hypot()`, `log()`, `exp()`
  - ORB

#### Intents

- **Ship: ARIA reflection (non-IDREF) and default Accessibility Semantics for Custom Elements**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/1IvZq_uK9Ho
  - `element.ariaSelected` など `aria-*` 属性に対応するプロパティ
- **Ship: Well-Formed Unicode Strings**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/vkTeclv4uL8
- Ship: fdlibm Math in Nightly/Early Beta
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/wBpkmbmyzqw
- **Ship: COEP: credentialless**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/NyzahidY5bw
- **Ship: Javascript Array grouping proposal**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/1pnEwgLPxtQ
- **Ship: WebAssembly GC**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Rk_c6X1oj24
- **Prototype: CSS text-wrap:balance**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/O0U9UuhK90o
- **Prototype: start transitions on discrete animation types**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/jVSRE6JommI
- **Prototype: Text fragments**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/1F1vsI0Q1dI
- Prototype: Origin-keyed Agent Clusters
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/UmfbTsiFl_g
- **Prototype: Early Hints**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/GNp44ffmGGs
- Prototype: Screen Wake Lock API
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/tWuBjgtfItA
- Prototype: Symbols as WeakMap keys (ECMA 262)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/NNpke-yy9uQ
- **Prototype: CSS zoom**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/n2qHmrAdta4
  - IE 独自拡張で WebKit/Blink にも実装された `zoom` プロパティ
  - 仕様もないので互換性に問題が出ている
  - フォールバックとして使われる `-moz-transform` の削除を含めなんとか実装できないか検討中
- Prototype and Ship: CSS `attr()` fallback
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/SsXXqvp8O3s
- **Prototype and Ship: Make ::backdrop inherit from its originating element.**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/_MTabf8-omg
- Unship: `-moz-image-rect()`
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/zNzYpD2UcRE
- **Change: HTML editor respects CSS display property to consider inline vs. block**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/YsAgwshXXms
- Change:
- Remove:

#### Newsletter

- Engineering Effectiveness Newsletter (Summer 2023 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/hsOtyjVLAgw/m/EYGWjKM3AAAJ
- Firefox DevTools Newsletter - 118 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-118/
- Firefox WebDriver Newsletter - 118 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-118/

#### MDN / Open Web Docs

- OWD at TPAC Sevilla
  - https://openwebdocs.org/content/posts/tpac-sevilla/

#### Standard Position

- 今月 Close されたものをみる
  - https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2023-09-01+
- positive
  - Multiple Readers and Writers in File System Access API #861
  - Policy container #863
  - X25519Kyber768 key encapsulation for TLS #874
  - Remove same-origin blanket enforcement from CSP Embedded Enforcement #878
  - CSS Values 5: attr() fallback #885
  - CaptureStartFocusBehavior enum value "focus-capturing-application" #888
  - MediaStreamTrack Statistics #895
  - **URLPattern API (positive) #893**
  - **Service Worker Static Routing API #894**

#### Other

- **Faster Vue.js Execution in Firefox - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2023/09/faster-vue-js-execution-in-firefox/
  - ベンチマークの Vue.js が v3 になってスコアが下がった
  - Vue 3 では Proxy を使っていて、そのパフォーマンスがよくなかった
  - Proxy のパフォーマンスを改善し、 Vue.js の TodoMVC のパフォーマンスが 40% 向上した
- Dani Chehak, Mozilla's new chief people officer
  - https://blog.mozilla.org/en/mozilla/leadership/dani-chehak-mozillas-new-chief-people-officer/
- A year after the disastrous breach, LastPass has not improved | Almost Secure
  - https://palant.info/2023/09/05/a-year-after-the-disastrous-breach-lastpass-has-not-improved/
- Ownership change for Mozilla CA Certificate Policy module
  - https://www.mail-archive.com/dev-security-policy@mozilla.org/msg01422.html
- Version 2.9 of the Mozilla Root Store Policy - Mozilla Security Blog
  - https://blog.mozilla.org/security/2023/09/13/version-2-9-of-the-mozilla-root-store-policy/
- Google Meet and the rest of G Workspace are working better than ever on Firefox
  - https://blog.mozilla.org/en/products/firefox/google-meet-firefox/
- Heads-up: unshipping plugin-container in Firefox 119 (Linux/Unix but not Mac or Windows)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/yOb2valM9Po

### Safari 動向

#### Stable: 17.0

#### Updates

- **Release Notes for Safari Technology Preview 178**
  - https://webkit.org/blog/14435/release-notes-for-safari-technology-preview-178/
  - CSS
    - Implemented counter-set property (267137@main)
  - JavaScript
    - **Enabled import attributes (266957@main)**
    - Added support for Intl.NumberFormat's FormatApproximately operation (266645@main)
    - Changed Intl.DurationFormat digital's default from narrow to short (266891@main)
  - Web API
    - **Enabled Fetch Priority by default (267196@main)**
    - **Enabled requestIdleCallback (267023@main, 266750@main)**
    - Enabled responsive images in `<link rel=preload>` (266787@main)
    - **Added the change event for the Cookie Store API (266850@main)**
    - Added more restrictions for top-frame navigations by a third-party iframe (266666@main)
    - Added support for from-image to ImageBitmapOptions (266893@main)
    - Added the support for key pair checks for Ed25519 in WebCrypto (267184@main)
- WebKit Features in Safari 17.0
  - https://webkit.org/blog/14445/webkit-features-in-safari-17-0/
  - see release note
- **Safari 17 Release Notes | Apple Developer Documentation**
  - https://developer.apple.com/documentation/safari-release-notes/safari-17-release-notes
  - Accessibility
    - Added support for code ARIA role. (106621574)
    - Fixed display: contents elements to be able to return selected accessibility children. (108428630)Fixed display: contents elements sometimes missing their children. (113044333)
  - Apple Pay
    - Added support for Apple Pay in cross-origin iframes with the allow="payment" attribute. (88969594)
  - Authentication
    - Added support for largeBlob extension for the local authenticator. (105237759)
  - CSS
    - **Added support for `@counter-style`. (30318695)**
    - Added support for the update Media Query. (35799713)
    - Added support for optional resolution and type arguments in image-set(). (77598590)
    - **Added support for `contain-intrinsic-size`. (89358231)**
    - Added support for full-width and full-size-kana values for text-transform. (100310853)
    - Added support for multiple text-transform values. (105381249)
    - **Added support for `@supports font-tech()` and `@font-face { src: tech() }`. (105665900)**
    - Added support for the @font-face size-adjust descriptor. (106349717)
    - Added support for containerName and containerQuery and updated conditionText to be "containerName containerQuery". (106505281)
    - Added support for overflow-block and overflow-inline media query features. (106511968)
    - Added support for the two-value syntax of font-size-adjust. (107290850)
    - Added support for @supports font-format(). (107381176)
    - Added support for the from-font value for font-size-adjust. (107735982)
    - Added nowrap white-space to the User-Agent Stylesheet for the option element. (110019702)
    - **Added support for the scripting media query. (110949545)**
    - Added support for word-break: auto. (111507205)
    - Added support for contain-intrinsic-size: auto none. (111510558)
    - Added support for contain-intrinsic-size: inherit. (112409855)
    - Fixed: Improved image-set compatibility. (105097744)
    - Fixed transition-property: all to include custom properties. (105556538)
    - Fixed #x, such as 1x, to be recognized a resolution calc unit category. (105700660)
  - Editing
    - Improved interoperability for the Range API and Selection API. (100579464)
    - Added a new appearance for marked text. (101869724)
    - Added support for the caret color to match the accent color of the system on macOS. (102450017)
  - Forms
    - **Added support for `<hr>` inside `<select>`. On macOS this is rendered as a separator. (107656886)**
    - **Fixed `<input pattern>` to use the regular expression v flag rather than u. (105268069)**
  - HTML
    - **Added experimental support for the `<model>` element. (100595523)**
    - **Added support for the `popover` attribute. (104204093)**
    - **Added support for the `<search>` element. (107175819)**
  - HTTP
    - **Added support for preconnect via HTTP early hints. (106055702)**
    - Fixed respecting Content-Type header for MIME type determination. (73343155)
    - Fixed a bug with empty header values in Headers objects with "request-no-cors" guard. (105207779)
    - Fixed Cross-Origin-Embedder-Policy incorrectly blocking an iframe on a cache hit. (107002434)
    - Fixed vary header behavior for opaque responses. (107769146)
  - Images
    - **Added support for HEIC/HEIF images. (99517108)**
    - **Added support for JPEG XL. (100641584)**
  - JavaScript
    - **Added support for RegExp duplicate named capture groups. (100335581)**
    - **Added support for the RegExp v flag. (100337109)**
    - **Added support for new Set.prototype methods. (105190165)**
    - Updated Intl.Locale to replace info getters with individual get... methods. (105570888)
    - Added support for `Set.prototype.difference`. (106031487)
  - Lockdown Mode
    - Disabled IndexedDB. (101187278)
    - Disabled the File API and FileReader API. (101187306)
    - Disabled support for the `<embed>` element. (101187413)
    - Added support for select web fonts. (101523138)
    - Added Lockdown Mode support to WebKit on watchOS. (101525499)
    - Disabled support for experimental APIs. (101969455)
    - Disabled the WebSpeech (SpeechSynthesis) API. (103316392)
    - Disabled the WebLocks API. (103316423)
  - Private Browsing
    - Added blocking for known trackers and fingerprinting. (99360202)
    - **Added support for mitigating trackers that map subdomains to third-party IP addresses. (99360259)**
    - **Added blocking for known tracking query parameters in links in Private Browsing. (99360362)**
    - Added noise to fingerprintable web APIs. (99360413)
    - Added console log messages when blocking requests to known trackers. (100523322)
    - **Added support for blocking trackers that use third-party CNAME cloaking. (101612742)**
    - Added support for Private Click Measurement. (106245330)
  - Profiles
    - **Added support for enabling Safari Extensions per-profile. (99399845)**
    - **Added support for Web Push subscriptions per profile. (100194363)**
  - Storage
    - **Added complete support for the Storage API. (84280909)**
    - Added support for overwriting the move method for FileSystemHandle. (105858983)
    - Added support for `StorageManager.estimate()`. (106169267)
    - Added support for calculating quota based on disk space. (107711361)
  - Web API
    - **Added support for 3D OffscreenCanvas WebGL support. (39882956)**
    - Added canvas.drawImage support for SVGImageElement as an image source. (79555760)
    - **Added support for `<link rel="modulepreload">`. (88670991)**
    - Added support for the focus fixup rule. (89902824)
    - Added support for using relative URLs in the WebSocket constructor and HTTP(S) schemes. (101929623)
    - Added support for Ed25519 cryptography. (105264767)
    - **Added support for `URL.canParse()`. (106934916)**
    - Added support for customElements.getName method. (108411398)
    - Added support for two-parameter delete() and has() on URLSearchParams. (108949109)
    - Added experimental support for priority to CSS Highlight API. (110125853)
  - Web apps
    - **Added support for web apps on macOS Sonoma. Add any website to the Dock from the File menu or Share Sheet to get to them even faster. Web apps open in their own window, and integrate with system features like Stage Manager, Screen Time, Notifications, and Focus. (68606770)**
- **Release Notes for Safari Technology Preview 179**
  - https://webkit.org/blog/14532/release-notes-for-safari-technology-preview-179/
  - CSS
    - Added support for mask-border properties. (267460@main)
    - **Added support for the cap unit. (267315@main)**
    - Added support for the position parameter in ray(). (267459@main)
    - **Added new relaxed parsing behavior for CSS Nesting. (267549@main)**
    - Added support for xywh() shape. (267789@main)
    - Added support for offset-position: normal for CSS Motion Path. (267657@main)
    - Added support for the rcap, rex, ric, and rch units. (267321@main)
    - Added new typed OM factory functions for font and root font relative units. (267437@main)
    - Added support for the coord-box parameter in ray(). (267566@main)
    - Added offset-position support for circle() and ellipse(). (267810@main)
  - HTML
    - **Added support for the name attribute in the \<details> element. (267756@main)**
- Safari 17.1 Beta Release Notes | Apple Developer Documentation
  - https://developer.apple.com/documentation/safari-release-notes/safari-17_1-release-notes
    - バグ修正
- **CSS Nesting and the Cascade**
  - https://webkit.org/blog/14571/css-nesting-and-the-cascade/
  - `&` がいらなくなった
  - ネストされたブロックの後に宣言がある場合どうするか poll
    - ネストされたブロック後の宣言を hoist するかしないか

#### Standard Positions

- 今月 Close されたものをみる
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2023-09-01+
  - Support
    - SVGImageElement.crossOrigin attribute. #241
    - **css-ui form-sizing property #231**
    - Re-introduction of Media Queries (and srcset/sizes) in Source Elements #190
    - Motion Path #187
    - **Scroll-driven animations #152**
    - scrollend event #150
    - **text-wrap: balance CSS property #143**
    - **scrollbar-color CSS property #134**
    - **Sanitizer API #86**
    - Style Container Queries (for custom properties) #57
    - ContentVisibilityAutoStateChanged event #33
  - Withdrawn
    - **Request for position: dialogmodaltarget attribute #213**
    - MathML colspan attribute for the mtd element #126

#### Other

### Edge 動向

#### Stable: 117

#### Updates

#### Other

- Web Weirdness: Probing Localhost - text/plain
  - https://textslashplain.com/2023/09/14/web-weirdness-probing-localhost/
- Web Platform Weirdness: Babies and Bathwater - text/plain
  - https://textslashplain.com/2023/09/14/web-platform-weirdness-babies-and-bathwater/
- Security: Tradeoffs - text/plain
  - https://textslashplain.com/2023/09/15/security-tradeoffs/
- A new wave of innovation with Edge, your AI-powered browser | Windows Experience Blog
  - https://blogs.windows.com/windowsexperience/2023/09/22/a-new-wave-of-innovation-with-edge-your-ai-powered-browser/

### WHATWG/W3C 動向

#### TPAC

- **"Unique" Origins @ webappsec**
  - https://github.com/w3c/webappsec/blob/main/meetings/2023/2023-09-14-TPAC-minutes.md#unique-origins-explainer
  - メールに添付されたファイルの展開などで、スクリプトが実行されてもいいように
  - サンドボックスドメインを分けたりするが、それは面倒。
  - 他にも、ドメインないで 3rd Party のコンテンツを展開したい場合にもつかえる。
  - Sandbox されつつ Origin が独立する iframe
- **Source Code Transparency proposal @ webappsec**
  - CT みたいな仕組みで、全てのコンテンツのハッシュを検証できるようにしたい
  - https://github.com/w3c/webappsec/issues/627#issuecomment-1673637611
    - source-code-transparency/explainer.md at main · twiss/source-code-transparency · GitHub
    - https://github.com/twiss/source-code-transparency/blob/main/explainer.md
- **Page Embedded Permission Control @ webappsec**
  - https://github.com/w3c/webappsec/blob/main/meetings/2023/2023-09-15-TPAC-minutes.md#page-embedded-permission-control-explainer
  - Permission Prompt を出す `<permission>` タグが欲しい
- **Compression Dictionaries @ webperf**
  - https://docs.google.com/presentation/d/1QiONfo4rnrGrZYGKfpkFvo6oDxPa_ualDCmf5a6bHw8/edit
  - 内容紹介。ベンチマークがすごい。
- **Soft Navigation @ webperf**
  - https://docs.google.com/presentation/d/1p3fmHy1tai7WabGt3S7bOj_rr1HXdmwdw3nx8mTnncw/edit
  - CSS だけで soft nav してるっぽいページがある
  - それを踏まえて soft nav とは何か?どう定義するか?という議論
- **WebComponents**
  - https://twitter.com/EisenbergEffect/status/1701978860143673474
  - Firefox が Declarative Shadow DOM をもうすぐ Ship
  - Scoped Custom Element Registries の未解決問題が片付いて MS が Chromium に実装中
  - Google は DOM Parts のプロトタイプを flag で実施中
  - HTML に custom attributes/behaviors/enhancements/mixins を持ち込む議論が盛り上がっている
  - Cross Root ARIA の提案が洗練されてきてる
- **TPAC Web Components Community Group Breakout Takeaways · Issue #1026 · WICG/webcomponents**
  - https://github.com/WICG/webcomponents/issues/1026
- **Consider adding a headinglevelstart attribute · Issue #5033 · whatwg/html**
  - https://github.com/whatwg/html/issues/5033#issuecomment-1721308852
  - 見出しレベルのスコープを変える属性の提案
  - https://github.com/whatwg/html/issues/5033#issuecomment-1738394747
- **explainers/DeclarativeWebPush at main · WebKit/explainers**
  - https://github.com/WebKit/explainers/tree/main/DeclarativeWebPush
  - Service Worker を使わないプッシュ通知

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
- Chartering
  - Generative AI Community Group created
    - https://lists.w3.org/Archives/Public/public-new-work/2023Sep/0014.html
  - Computational Intelligence Community Group created
    - https://lists.w3.org/Archives/Public/public-new-work/2023Sep/0020.html
  - Proposed W3C Charter: Media and Entertainment Interest Group
    - https://lists.w3.org/Archives/Public/public-new-work/2023Sep/0002.html
  - Proposed W3C Charter: PNG Working Group
    - https://lists.w3.org/Archives/Public/public-new-work/2023Sep/0004.html
  - Proposed W3C Charter: Solid Working Group
    - https://lists.w3.org/Archives/Public/public-new-work/2023Sep/0007.html
  - Proposed W3C Charter: Web Performance Working Group
    - https://lists.w3.org/Archives/Public/public-new-work/2023Sep/0021.html
  - New incubation: Controlled-Frame from Chris Wilson
    - https://lists.w3.org/Archives/Public/public-new-work/2023Sep/0017.html
  - Advance Notice: Working in progress on a Web-based Digital Twins for Smart Cities Interest Group Charter
    - https://lists.w3.org/Archives/Public/public-new-work/2023Sep/0003.html
  - Advance notice: Work in progress on Accessibility Education and Outreach Working Group Charter
    - https://lists.w3.org/Archives/Public/public-new-work/2023Sep/0005.html
  - Advance notice: Work in progress on Web Identity Credential Working Group Charter
    - https://lists.w3.org/Archives/Public/public-new-work/2023Sep/0006.html
  - Call for Participation: Web Editing Working Group Charter Approved; Join the Web Editing WG
    - https://lists.w3.org/Archives/Public/public-new-work/2023Sep/0023.html
  - Accessible Notifications incubation from Chris Wilson
    - https://lists.w3.org/Archives/Public/public-new-work/2023Sep/0015.html
  - Reminder: W3C Virtual Workshop on Secure the Web Forward
    - https://lists.w3.org/Archives/Public/public-new-work/2023Sep/0019.html
  - Observable incubation from Chris Wilson
    - https://lists.w3.org/Archives/Public/public-new-work/2023Sep/0013.html

#### Other

- **Specification Acceptance Stages · Issue #290 · whatwg/meta**
  - https://github.com/whatwg/meta/issues/290
- **W3C Technical Plenary and Advisory Committee (TPAC) Meetings 2023 - Tantek**
  - https://tantek.com/2023/262/b1/w3c-technical-plenary-tpac
- **W3C TPAC 2023 Trip Report**
  - https://blog.tomayac.com/2023/09/25/w3c-tpac-2023-trip-report/
- Interop 2024 Call For Proposals - Bocoup
  - https://bocoup.com/blog/interop-2024-call-for-proposals

### TC39 動向

#### Meeting

- Meeting Note が公開された時だけやる、それ以外はやらない。

#### Proposals Diff

#### New Proposals

#### Other

- Web incompatibility discovered in theathletic.com · Issue #286 · tc39/proposal-iterator-helpers
  - https://github.com/tc39/proposal-iterator-helpers/issues/286

### WinterCG 動向

- Meeting や大きな動きがあった月だけやる

#### Meeting

- 2023-09-07 Meeting
  - https://github.com/wintercg/admin/issues/55

### IETF 動向

#### WG

- IETF
  - https://datatracker.ietf.org/meeting/
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - Content-Disposition missing from IANA HTTP field name registry
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023JulSep/0169.html
  - HTTP zstd accept-encoding window size
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023JulSep/0178.html
  - Httpdir last call review of draft-ietf-alto-new-transport-14
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023JulSep/0202.html
  - Httpdir last call review of draft-ietf-privacypass-protocol-12
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023JulSep/0157.html
  - I-D Action: draft-ietf-httpbis-compression-dictionary-00.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023JulSep/0176.html
  - **New Internet Draft: The qpack_static_table_version TLS extension**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023JulSep/0206.html
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

#### Other

- Last Call: draft-ietf-alto-oam-yang-12.txt (YANG Data Models for the Application-Layer Traffic Optimization (ALTO) Protocol) to Proposed Standard
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/YWgon0Hz3xY0gsG_fAv3-aGdMhw/
- Last Call: draft-ietf-cellar-flac-11.txt (Free Lossless Audio Codec) to Proposed Standard
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/u7PR8ZQ4XYx_fMcV8PZ0apDs940/
- RFC 9447 on Automated Certificate Management Environment (ACME) Challenges Using an Authority Token
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/-OxHO9ELS_bMHXYSt3d_L3ITFCI/
- RFC 9448 on TNAuthList Profile of Automated Certificate Management Environment (ACME) Authority Token
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/i4n0rKJPHHsMDRQw_XfadAE6Phw/
- RFC 9459 on CBOR Object Signing and Encryption (COSE): AES-CTR and AES-CBC
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/Fo98MA4muKvkbi76qCTif13GYIU/
- **RFC 9476 on The .alt Special-Use Top-Level Domain**
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/hw988PUREYeqjP5-7WphO6tBuV4/
- Second Last Call: draft-uberti-rtcweb-rfc8829bis-04.txt (JavaScript Session Establishment Protocol (JSEP)) to Proposed Standard
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/UiLoUkDwDMC9vmaM5j3ZbBwSlnk/
- **Stepping down as IETF Chair in March 2024**
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/XQYoVIiC9XEg3XzGC_kY7s67dQg/
- Protocol Action: 'DNS Terminology' to Best Current Practice (draft-ietf-dnsop-rfc8499bis-10.txt)
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/oXYwOBwJMTg0aIH9w1UTv-GM920/
- Protocol Action: 'JSONPath: Query expressions for JSON' to Proposed Standard (draft-ietf-jsonpath-base-21.txt)
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/bkiGDUtUtrxK6XYK8rlrmrC56MA/
- Protocol Action: 'Negative Caching of DNS Resolution Failures' to Proposed Standard (draft-ietf-dnsop-caching-resolution-failures-08.txt)
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/FyupseKXgA6ozElvG_PVxzsHKXc/
- Protocol Action: 'Update to the IANA SSH Protocol Parameters Registry Requirements' to Proposed Standard (draft-yee-ssh-iana-requirements-03.txt)
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/1-m11RaD_aITtJ-LJLhUYDLNHDc/
- Protocol Action: 'X.509 Certificate Extended Key Usage (EKU) for 5G Network Functions' to Proposed Standard (draft-ietf-lamps-nf-eku-05.txt)
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/paF-Xlez5yZKfSq6iiA9un-3zpY/

### CDN 動向

#### Cloudflare

- **Cloudflare Fonts: enhancing website font privacy and speed**
  - https://blog.cloudflare.com/cloudflare-fonts-enhancing-website-privacy-speed/
- You can now use WebGPU in Cloudflare Workers
  - https://blog.cloudflare.com/webgpu-in-workers/
- **Post-quantum cryptography goes GA**
  - https://blog.cloudflare.com/post-quantum-cryptography-ga/
- Cloudflare now uses post-quantum cryptography to talk to your origin server
  - https://blog.cloudflare.com/post-quantum-to-origins/
- **Encrypted Client Hello - the last puzzle piece to privacy**
  - https://blog.cloudflare.com/announcing-encrypted-client-hello/

#### Fastly

- **Announcing Certainly: Fastly's own TLS Certification Authority | Fastly**
  - https://www.fastly.com/blog/announcing-certainly-fastlys-own-tls-certification-authority
- How we built a better TLS certification authority | Fastly
  - https://www.fastly.com/blog/how-we-built-a-better-tls-certification-authority

#### Other

- A QUIC Shutdown: DoS Vulnerability in Windows Servers Running SMB over QUIC | Akamai
  - https://www.akamai.com/blog/security-research/2023/sep/smb-over-quic-dos-windows-servers

### セキュリティ動向

- A year after the disastrous breach, LastPass has not improved | Almost Secure
  - https://palant.info/2023/09/05/a-year-after-the-disastrous-breach-lastpass-has-not-improved/
- パスワード管理アプリ「LastPass」がマスターパスワードの変更をユーザーに強制しているのは責任転嫁であるという批判 - GIGAZINE
  - https://gigazine.net/news/20230925-lastpass-master-password-iterations/
- Critical WebP bug: many apps, not just browsers, under threat
  - https://stackdiary.com/critical-vulnerability-in-webp-codec-cve-2023-4863/
- **Save and Sign In with Passkeys Using 1Password on the Web and iOS | 1Password**
  - https://blog.1password.com/save-use-passkeys-web-ios/
- **Passkeys are generally available - The GitHub Blog**
  - https://github.blog/2023-09-21-passkeys-are-generally-available/
- **d アカウントの認証、かんたんログインやスマホ認証を廃止し「パスキー」に統一 - ケータイ Watch**
  - https://k-tai.watch.impress.co.jp/docs/news/1529344.html
- **パスキー|ニンテンドーアカウント サポート|Nintendo**
  - https://www.nintendo.co.jp/support/nintendo_account/passkey/index.html
- **The most personal Windows 11 experience begins rolling out today | Windows Experience Blog**
  - https://blogs.windows.com/windowsexperience/2023/09/26/the-most-personal-windows-11-experience-begins-rolling-out-today/
- **Google Online Security Blog: SMS Security & Privacy Gaps Make It Clear Users Need a Messaging Upgrade**
  - https://security.googleblog.com/2023/09/sms-security-privacy-gaps-make-it-clear.html
- 「ドコモ口座」のドメインが第三者から購入可能な状態に 「本当にヤバい」「悪用される」と話題に - ITmedia NEWS
  - https://www.itmedia.co.jp/news/articles/2309/25/news118.html
- 「ドコモ口座」のドメイン、ドコモが取り戻す 出品の経緯を GMO 含め聞いた(1/2 ページ) - ITmedia NEWS
  - https://www.itmedia.co.jp/news/articles/2309/26/news117.html

### 周辺動向

- **State of HTML**
  - https://stateofhtml.com/en-US
- **Tucson's Molly Holzschlag, known as 'the fairy godmother of the web,' dead at 60 | Obituary**
  - https://www.tucsonsentinel.com/local/report/090523_molly_holzschlag/tucsons-molly-holzschlag-known-as-the-fairy-godmother-web-dead-60/
  - Molly を偲んで | 覚え書き | @kazuhito
    - https://kidachi.kazuhi.to/blog/archives/042166.html
- The Servo project is joining Linux Foundation Europe | Igalia
  - https://www.igalia.com/2023/09/07/The-Servo-project-is-joining-Linux-Foundation-Europe.html

### イベント

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
- 11 月
  - 7-10: IETF 118 Prague
  - 19: JSConf JP
    - https://jsconf.jp/2023/
  - 27-30: TC39 meeting SF (remote)
- 12 月
  - 16: TBD

### Wrap Up

- Chrome
  - 117
    - entry/exit animations
    - array grouping
    - Subgrid
  - 118 beta
    - @scope
    - media queries: prefers-reduced-transparency/scripting
    - Enrollment for Privacy Sandbox
  - Ship
    - :user-valid/:user-invalid
    - `<search>`
    - Japanese Phrase Line Breaking
    - ECH
    - `<hr>` in `<select>`
    - Promise.withResolvers
    - unprefix `-webkit-background-clip: text`
    - Close Watchers
  - Prototype
    - `text-spacing-trim`
    - Page-Embedded Permission Control
    - Sec-CH-UA-Form-Factor
    - `form-sizing`
    - select.showPicker()
    - Canvas Mesh2D
    - Observable API
    - `firstrender` event
    - Device Bound Session Credentials
  - web.dev
    - Interop 2024 proposals
    - Subgrid
  - Google Developer Blog
    - BudouX
  - Chrome Developers
    - Chrome for Developers
    - View Transitions case studies
  - other
    - Gmail Basic HTML gone in 2024
- Firefox
  - 118
    - `<search>`
    - CSS math functions
    - ORB
  - Ship
    - ARIA reflection
    - Array Grouping
  - Prototype
    - `text-wrap: balance`
    - Scroll to Text Fragment
    - Early Hints
    - CSS `zoom`
  - other
    - positive on URLPattern
- Safari
  - TP 178
    - Import Attributes
    - Fetch Priority
    - requestIdleCallback
    - Cookie Store API
  - 17
    - `@counter-style`
    - media query `scripting`
    - `<hr>` in `<select>`
    - `<model>`
    - `<search>`
    - Popover API
    - HEIC/HEIF
    - JPEG XL
    - RegExp named capture groups/ v flag
    - new Set methods
    - 3D OffscreenCanvas
    - `<link rel="modulepreload">`
    - Web Apps in Sonoma
  - TP 179
    - CSS `cap` unit
    - CSS Nesting parsing relaxed
    - `<details name>` exclusive accordion
  - blog
    - CSS Nesting relaxed / hoisting
  - Standard Position
    - form-sizing
    - Scroll-driven Animations
    - text-wrap: balance
    - scrollbar-color
    - Sanitizer API
    - dialogmodaltarget attr withdrawn
  - other
- Edge
- W3C/WHATWG
  - TPAC
    - Unique Origins
    - Source Code Transparency
    - Page Embedded Permission Control (`<permission>`)
    - Compression Dictionaries
    - CSS での Soft Navigation
    - WebComponents 周りの更新
  - other
    - headinglevelstart attr
    - DeclarativeWebPush
    - Specification Acceptance Stage
    - Interop2024 Call for Proposals
- TC39
- WinterCG
- IETF
  - qpack_static_table_version
  - .alt Top Level Domain
  - IETF Chair 雇用主事情で退任
- CDN 動向
  - Cloudflare
    - Cloudflare Fonts
    - Post-quantum Crypto GA
    - ECH
  - Fastly
    - CA 開始
- セキュリティ動向
  - LastPass の現状
  - Passkey 対応進む
    - 1password
    - GitHub
    - D アカウント
    - Windowns 11
  - ドコモ口座ドメインオークション
- 周辺動向
  - State of HTML
  - Molly Holzschlag 追悼
