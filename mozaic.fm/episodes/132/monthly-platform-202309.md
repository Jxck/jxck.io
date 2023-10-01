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

- *New in Chrome 117*
  - https://developer.chrome.com/en/blog/new-in-chrome-117/
  - New CSS features for entry and exit animations.
  - Array grouping
  - Local overrides streamlined in DevTools.
  - And more!
    - The much anticipated subgrid value for grid-template-columns and grid-template-rows is now implemented in Chrome.
    - There is a WebSQL deprecation trial and a developer trial for the unload event deprecation.
    - The notRestoredReasons API for bfcache, mentioned in the video for Chrome 116, should be launching in this version.
- *Chrome 118 beta*
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
- *What's New in DevTools (Chrome 118) - Chrome for Developers*
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

- *Ship: :user-valid and :user-invalid CSS pseudo-classes*
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
- *Ship: HTML search element*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5CHw-SXYKGc
- *Ship: Japanese Phrase Line Breaking*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/96q7WtXtWXc
- Ship: Media Queries: scripting feature
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jiCB_twBqnk
- Ship: Payment handler minimal header UX
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FJegKzRBcDY
- Ship: Protected Audience directFromSellerSignals via HTTP response headers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JpWOdoPi5Wo
- Ship: Sec-CH-Prefers-Reduced-Transparency User Preference Media Features Client Hints Header
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KgSc7mn6pws
- *Ship: TLS Encrypted Client Hello (ECH)*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CmlXjQeNWDI
- Ship: view-timeline shorthand sets view-timeline-inset
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yjfaImiMaXE
- Ship: WebAssembly Garbage Collection (WasmGC)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/K_GpDF0y5Q8
- Ship: Change SVGClipPathElement to inherit from SVGElement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Hq3r7dB6yoc
- Ship: DTLS ClientHello extension permutation (WebRTC)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1CIKec0W1fg
- *Ship: Deprecate TLS SHA-1 server signatures*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aFBsv39UqGE
- *Ship: Horizontal rules inside select elements*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fklS2qR8Wm4
- Ship: Partitioning Storage, Service Workers, and Communication APIs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/24hK6DKJnqY
- Ship: Private Network Access restrictions for automotive
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fCz5k9OPFAA
- *Ship: Promise.withResolvers*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JL4uXtfrCdU
- Ship: Protected Audiences Negative Targeting
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xzrWfs-BwFk
- Ship: WebRTC Codec Selection API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-RicKxNXe4U
- Ship: Intersection Observer Scroll Margin
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ax8rTBusZ4s
- Ship: Private Aggregation API bundled enhancements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cNK_uuCaNMs
- *Ship: Unprefix -webkit-background-clip for "text" and make it an alias*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/szcfsqyaFsg
- *Ship: Close requests for CloseWatcher, `<dialog>`, and popover=""*
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
- *Prototype: CJK punctuation kerning: the CSS `text-spacing-trim` property*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NCUfiS4K32E
- Prototype: CSS Sticky State Container Queries
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/C1D321h3OnA
- Prototype: FedCM Improvements: Error API, Account Auto Selected Flag, Hosted Domain and Revocation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YfaGM8v-Ocs
- Prototype: Initiator Info in Resource Timing API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ew98DDMuD9U
- Prototype: Media Queries: scripting feature
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nf3I6lAuHqo
- *Prototype: Page-Embedded Permission Control*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TGsrhP4ref0
- Prototype: Private Network Access restrictions for automotive
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MO2HmKaFe8c
- *Prototype: Sec-CH-UA-Form-Factor client hint*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RL7nmVio2PM
- Prototype: Third-Party Cookie Phaseout
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8mlWTOcEzcA
- Prototype: Web Preferences API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UNfjkjHAPOM
- Prototype: WebDriver commands for triggering Bounce Tracking Mitigations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VMTLpimgZTo
- *Prototype: form-sizing CSS property*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cA-cmgrA_QE
- Prototype: Snapchanged Events
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AGsZy1WSIS0
- *Prototype: CSS dynamic-range-limit property*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jzSeH70To2s
- Prototype: ExportID for cross ShadowRoot ARIA
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CEdbbQXPIRk
- *Prototype: HTMLSelectElement showPicker()*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6MUAqY2r3Hg
- Prototype: Intersection Observer Scroll Margin
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oyarD9dGSUk
- Prototype: Face-Framing API.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LyQu9L_Iv58
- *Prototype: Mesh2D Canvas API*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bqKJhWf6Lgk
- Prototype: NavigateEvent sourceElement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fJhFQV-2v38
- *Prototype: Observable API*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kPoFF2SREq8
- *Prototype: 'firstrender' event*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ujfh4GwHn4E
- *Prototype: Device Bound Session Credentials (DBSC)*
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
- *PSA: Fire beforeinput event before compositionupdate event during IME composition.*
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
  - *Submit your proposals for Interop 2024*
    - https://web.dev/interop-2024-proposals/
  - *CSS Subgrid*
    - https://web.dev/css-subgrid/
- google developer blog
  - Celebrating 25 years of Google Search: developer trends and history - Google for Developers Blog - News about Web, Mobile, AI and Cloud
    - https://developers.googleblog.com/2023/09/25-years-google-search-developer-trends.html
- google developer japan blog
  - *Google Developers Japan: BudouX: 読みやすい改行のための軽量な分かち書き器*
    - https://developers-jp.googleblog.com/2023/09/budoux-adobe.html
- chrome developer blog
  - https://developer.chrome.com/blog/
  - Google Summer of Code and Chrome Extensions
    - https://developer.chrome.com/en/blog/google-summer-of-code-and-chrome-extensions/
  - What's New in WebGPU (Chrome 117)
    - https://developer.chrome.com/en/blog/new-in-webgpu-117/
  - From WebGL to WebGPU - Chrome for Developers
    - https://developer.chrome.com/en/blog/from-webgl-to-webgpu/
  - *We are Chrome for Developers - Chrome for Developers*
    - https://developer.chrome.com/en/blog/we-are-chrome-for-developers/
  - *Seamless navigation made possible with view transitions - Chrome for Developers*
    - https://developer.chrome.com/en/blog/view-transitions-case-studies/
- chromium blog
  - Chromium Blog: Unveiling the Chrome Web Store's Redesign
    - https://blog.chromium.org/2023/09/unveiling-chrome-web-stores-redesign.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - Google Online Security Blog: Capslock: What is your code really capable of?
    - https://security.googleblog.com/2023/09/capslock-what-is-your-code-really.html
  - *Google Online Security Blog: Scaling Rust Adoption Through Training*
    - https://security.googleblog.com/2023/09/scaling-rust-adoption-through-training.html
  - Google Online Security Blog: SMS Security & Privacy Gaps Make It Clear Users Need a Messaging Upgrade
    - https://security.googleblog.com/2023/09/sms-security-privacy-gaps-make-it-clear.html
- v8
  - https://v8.dev/
- other
  - *ブラウザで Gmail の最新バージョンを使用する - Gmail ヘルプ*
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

- *Ship: ARIA reflection (non-IDREF) and default Accessibility Semantics for Custom Elements*
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/1IvZq_uK9Ho
  - `element.ariaSelected` など `aria-*` 属性に対応するプロパティ
- *Ship: Well-Formed Unicode Strings*
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/vkTeclv4uL8
- Ship: fdlibm Math in Nightly/Early Beta
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/wBpkmbmyzqw
- *Ship: COEP: credentialless*
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/NyzahidY5bw
- *Ship: Javascript Array grouping proposal*
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/1pnEwgLPxtQ
- *Ship: WebAssembly GC*
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Rk_c6X1oj24
- *Prototype: CSS text-wrap:balance*
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/O0U9UuhK90o
- *Prototype: start transitions on discrete animation types*
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/jVSRE6JommI
- *Prototype: Text fragments*
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/1F1vsI0Q1dI
- Prototype: Origin-keyed Agent Clusters
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/UmfbTsiFl_g
- *Prototype: Early Hints*
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/GNp44ffmGGs
- Prototype: Screen Wake Lock API
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/tWuBjgtfItA
- Prototype: Symbols as WeakMap keys (ECMA 262)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/NNpke-yy9uQ
- *Prototype: CSS zoom*
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/n2qHmrAdta4
  - IE 独自拡張で WebKit/Blink にも実装された `zoom` プロパティ
  - 仕様もないので互換性に問題が出ている
  - フォールバックとして使われる `-moz-transform` の削除を含めなんとか実装できないか検討中
- Prototype and Ship: CSS `attr()` fallback
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/SsXXqvp8O3s
- *Prototype and Ship: Make ::backdrop inherit from its originating element.*
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/_MTabf8-omg
- Unship: `-moz-image-rect()`
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/zNzYpD2UcRE
- *Change: HTML editor respects CSS display property to consider inline vs. block*
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
  - *URLPattern API (positive) #893*
  - *Service Worker Static Routing API #894*


#### Other

- *Faster Vue.js Execution in Firefox - Mozilla Hacks - the Web developer blog*
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

- *Release Notes for Safari Technology Preview 178*
  - https://webkit.org/blog/14435/release-notes-for-safari-technology-preview-178/
  - CSS
    - Implemented counter-set property (267137@main)
  - JavaScript
    - *Enabled import attributes (266957@main)*
    - Added support for Intl.NumberFormat's FormatApproximately operation (266645@main)
    - Changed Intl.DurationFormat digital's default from narrow to short (266891@main)
  - Web API
    - *Enabled Fetch Priority by default (267196@main)*
    - *Enabled requestIdleCallback (267023@main, 266750@main)*
    - Enabled responsive images in `<link rel=preload>` (266787@main)
    - *Added the change event for the Cookie Store API (266850@main)*
    - Added more restrictions for top-frame navigations by a third-party iframe (266666@main)
    - Added support for from-image to ImageBitmapOptions (266893@main)
    - Added the support for key pair checks for Ed25519 in WebCrypto (267184@main)
- WebKit Features in Safari 17.0
  - https://webkit.org/blog/14445/webkit-features-in-safari-17-0/
  - see release note
- *Safari 17 Release Notes | Apple Developer Documentation*
  - https://developer.apple.com/documentation/safari-release-notes/safari-17-release-notes
  - Accessibility
    - Added support for code ARIA role. (106621574)
    - Fixed display: contents elements to be able to return selected accessibility children. (108428630)Fixed display: contents elements sometimes missing their children. (113044333)
  - Apple Pay
    - Added support for Apple Pay in cross-origin iframes with the allow="payment" attribute. (88969594)
  - Authentication
    - Added support for largeBlob extension for the local authenticator. (105237759)
  - CSS
    - *Added support for `@counter-style`. (30318695)*
    - Added support for the update Media Query. (35799713)
    - Added support for optional resolution and type arguments in image-set(). (77598590)
    - *Added support for `contain-intrinsic-size`. (89358231)*
    - Added support for full-width and full-size-kana values for text-transform. (100310853)
    - Added support for multiple text-transform values. (105381249)
    - *Added support for `@supports font-tech()` and `@font-face { src: tech() }`. (105665900)*
    - Added support for the @font-face size-adjust descriptor. (106349717)
    - Added support for containerName and containerQuery and updated conditionText to be "containerName containerQuery". (106505281)
    - Added support for overflow-block and overflow-inline media query features. (106511968)
    - Added support for the two-value syntax of font-size-adjust. (107290850)
    - Added support for @supports font-format(). (107381176)
    - Added support for the from-font value for font-size-adjust. (107735982)
    - Added nowrap white-space to the User-Agent Stylesheet for the option element. (110019702)
    - *Added support for the scripting media query. (110949545)*
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
    - *Added support for `<hr>` inside `<select>`. On macOS this is rendered as a separator. (107656886)*
    - *Fixed `<input pattern>` to use the regular expression v flag rather than u. (105268069)*
  - HTML
    - *Added experimental support for the `<model>` element. (100595523)*
    - *Added support for the `popover` attribute. (104204093)*
    - *Added support for the `<search>` element. (107175819)*
  - HTTP
    - *Added support for preconnect via HTTP early hints. (106055702)*
    - Fixed respecting Content-Type header for MIME type determination. (73343155)
    - Fixed a bug with empty header values in Headers objects with "request-no-cors" guard. (105207779)
    - Fixed Cross-Origin-Embedder-Policy incorrectly blocking an iframe on a cache hit. (107002434)
    - Fixed vary header behavior for opaque responses. (107769146)
  - Images
    - *Added support for HEIC/HEIF images. (99517108)*
    - *Added support for JPEG XL. (100641584)*
  - JavaScript
    - *Added support for RegExp duplicate named capture groups. (100335581)*
    - *Added support for the RegExp v flag. (100337109)*
    - *Added support for new Set.prototype methods. (105190165)*
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
    - *Added support for mitigating trackers that map subdomains to third-party IP addresses. (99360259)*
    - *Added blocking for known tracking query parameters in links in Private Browsing. (99360362)*
    - Added noise to fingerprintable web APIs. (99360413)
    - Added console log messages when blocking requests to known trackers. (100523322)
    - *Added support for blocking trackers that use third-party CNAME cloaking. (101612742)*
    - Added support for Private Click Measurement. (106245330)
  - Profiles
    - *Added support for enabling Safari Extensions per-profile. (99399845)*
    - *Added support for Web Push subscriptions per profile. (100194363)*
  - Storage
    - *Added complete support for the Storage API. (84280909)*
    - Added support for overwriting the move method for FileSystemHandle. (105858983)
    - Added support for `StorageManager.estimate()`. (106169267)
    - Added support for calculating quota based on disk space. (107711361)
  - Web API
    - *Added support for 3D OffscreenCanvas WebGL support. (39882956)*
    - Added canvas.drawImage support for SVGImageElement as an image source. (79555760)
    - *Added support for `<link rel="modulepreload">`. (88670991)*
    - Added support for the focus fixup rule. (89902824)
    - Added support for using relative URLs in the WebSocket constructor and HTTP(S) schemes. (101929623)
    - Added support for Ed25519 cryptography. (105264767)
    - *Added support for `URL.canParse()`. (106934916)*
    - Added support for customElements.getName method. (108411398)
    - Added support for two-parameter delete() and has() on URLSearchParams. (108949109)
    - Added experimental support for priority to CSS Highlight API. (110125853)
  - Web apps
    - *Added support for web apps on macOS Sonoma. Add any website to the Dock from the File menu or Share Sheet to get to them even faster. Web apps open in their own window, and integrate with system features like Stage Manager, Screen Time, Notifications, and Focus. (68606770)*
- *Release Notes for Safari Technology Preview 179*
  - https://webkit.org/blog/14532/release-notes-for-safari-technology-preview-179/
  - CSS
    - Added support for mask-border properties. (267460@main)
    - *Added support for the cap unit. (267315@main)*
    - Added support for the position parameter in ray(). (267459@main)
    - *Added new relaxed parsing behavior for CSS Nesting. (267549@main)*
    - Added support for xywh() shape. (267789@main)
    - Added support for offset-position: normal for CSS Motion Path. (267657@main)
    - Added support for the rcap, rex, ric, and rch units. (267321@main)
    - Added new typed OM factory functions for font and root font relative units. (267437@main)
    - Added support for the coord-box parameter in ray(). (267566@main)
    - Added offset-position support for circle() and ellipse(). (267810@main)
  - HTML
    - *Added support for the name attribute in the \<details> element. (267756@main)*
- Safari 17.1 Beta Release Notes | Apple Developer Documentation
  - https://developer.apple.com/documentation/safari-release-notes/safari-17_1-release-notes
    - バグ修正
- *CSS Nesting and the Cascade*
  - https://webkit.org/blog/14571/css-nesting-and-the-cascade/
  - `&` がいらなくなった
  - ネストされたブロックの後に宣言がある場合どうするか poll
    - ネストされたブロック後の宣言を hoist するかしないか


#### Standard Positions

- 今月 Close されたものをみる
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2023-09-01+
  - Support
    - SVGImageElement.crossOrigin attribute. #241
    - *css-ui form-sizing property #231*
    - Re-introduction of Media Queries (and srcset/sizes) in Source Elements #190
    - Motion Path #187
    - *Scroll-driven animations #152*
    - scrollend event #150
    - *text-wrap: balance CSS property #143*
    - *scrollbar-color CSS property #134*
    - *Sanitizer API #86*
    - Style Container Queries (for custom properties) #57
    - ContentVisibilityAutoStateChanged event #33
  - Withdrawn
    - *Request for position: dialogmodaltarget attribute #213*
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

- *"Unique" Origins @ webappsec*
  - https://github.com/w3c/webappsec/blob/main/meetings/2023/2023-09-14-TPAC-minutes.md#unique-origins-explainer
  - メールに添付されたファイルの展開などで、スクリプトが実行されてもいいように
  - サンドボックスドメインを分けたりするが、それは面倒。
  - 他にも、ドメインないで 3rd Party のコンテンツを展開したい場合にもつかえる。
  - Sandbox されつつ Origin が独立する iframe
- *Source Code Transparency proposal @ webappsec*
  - CT みたいな仕組みで、全てのコンテンツのハッシュを検証できるようにしたい
  - https://github.com/w3c/webappsec/issues/627#issuecomment-1673637611
    - source-code-transparency/explainer.md at main · twiss/source-code-transparency · GitHub
    - https://github.com/twiss/source-code-transparency/blob/main/explainer.md
- *Page Embedded Permission Control @ webappsec*
  - https://github.com/w3c/webappsec/blob/main/meetings/2023/2023-09-15-TPAC-minutes.md#page-embedded-permission-control-explainer
  - Permission Prompt を出す `<permission>` タグが欲しい
- *Compression Dictionaries @ webperf*
  - https://docs.google.com/presentation/d/1QiONfo4rnrGrZYGKfpkFvo6oDxPa_ualDCmf5a6bHw8/edit
  - 内容紹介。ベンチマークがすごい。
- *Soft Navigation @ webperf*
  - https://docs.google.com/presentation/d/1p3fmHy1tai7WabGt3S7bOj_rr1HXdmwdw3nx8mTnncw/edit
  - CSS だけで soft nav してるっぽいページがある
  - それを踏まえて soft nav とは何か?どう定義するか?という議論
- *WebComponents*
  - https://twitter.com/EisenbergEffect/status/1701978860143673474
  - Firefox が Declarative Shadow DOM をもうすぐ Ship
  - Scoped Custom Element Registries の未解決問題が片付いて MS が Chromium に実装中
  - Google は DOM Parts のプロトタイプを flag で実施中
  - HTML に custom attributes/behaviors/enhancements/mixins を持ち込む議論が盛り上がっている
  - Cross Root ARIA の提案が洗練されてきてる
- *TPAC Web Components Community Group Breakout Takeaways · Issue #1026 · WICG/webcomponents*
  - https://github.com/WICG/webcomponents/issues/1026
- *Consider adding a headinglevelstart attribute · Issue #5033 · whatwg/html*
  - https://github.com/whatwg/html/issues/5033#issuecomment-1721308852
  - 見出しレベルのスコープを変える属性の提案
  - https://github.com/whatwg/html/issues/5033#issuecomment-1738394747
- *explainers/DeclarativeWebPush at main · WebKit/explainers*
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

- *Specification Acceptance Stages · Issue #290 · whatwg/meta*
  - https://github.com/whatwg/meta/issues/290
- *W3C Technical Plenary and Advisory Committee (TPAC) Meetings 2023 - Tantek*
  - https://tantek.com/2023/262/b1/w3c-technical-plenary-tpac
- *W3C TPAC 2023 Trip Report*
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
  - *New Internet Draft: The qpack_static_table_version TLS extension*
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
- *RFC 9476 on The .alt Special-Use Top-Level Domain*
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/hw988PUREYeqjP5-7WphO6tBuV4/
- Second Last Call: draft-uberti-rtcweb-rfc8829bis-04.txt (JavaScript Session Establishment Protocol (JSEP)) to Proposed Standard
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/UiLoUkDwDMC9vmaM5j3ZbBwSlnk/
- *Stepping down as IETF Chair in March 2024*
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

- *Cloudflare Fonts: enhancing website font privacy and speed*
  - https://blog.cloudflare.com/cloudflare-fonts-enhancing-website-privacy-speed/
- You can now use WebGPU in Cloudflare Workers
  - https://blog.cloudflare.com/webgpu-in-workers/
- *Post-quantum cryptography goes GA*
  - https://blog.cloudflare.com/post-quantum-cryptography-ga/
- Cloudflare now uses post-quantum cryptography to talk to your origin server
  - https://blog.cloudflare.com/post-quantum-to-origins/
- *Encrypted Client Hello - the last puzzle piece to privacy*
  - https://blog.cloudflare.com/announcing-encrypted-client-hello/


#### Fastly

- *Announcing Certainly: Fastly's own TLS Certification Authority | Fastly*
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
- *Save and Sign In with Passkeys Using 1Password on the Web and iOS | 1Password*
  - https://blog.1password.com/save-use-passkeys-web-ios/
- *Passkeys are generally available - The GitHub Blog*
  - https://github.blog/2023-09-21-passkeys-are-generally-available/
- *d アカウントの認証、かんたんログインやスマホ認証を廃止し「パスキー」に統一 - ケータイ Watch*
  - https://k-tai.watch.impress.co.jp/docs/news/1529344.html
- *パスキー|ニンテンドーアカウント サポート|Nintendo*
  - https://www.nintendo.co.jp/support/nintendo_account/passkey/index.html
- *The most personal Windows 11 experience begins rolling out today | Windows Experience Blog*
  - https://blogs.windows.com/windowsexperience/2023/09/26/the-most-personal-windows-11-experience-begins-rolling-out-today/
- *Google Online Security Blog: SMS Security & Privacy Gaps Make It Clear Users Need a Messaging Upgrade*
  - https://security.googleblog.com/2023/09/sms-security-privacy-gaps-make-it-clear.html
- 「ドコモ口座」のドメインが第三者から購入可能な状態に 「本当にヤバい」「悪用される」と話題に - ITmedia NEWS
  - https://www.itmedia.co.jp/news/articles/2309/25/news118.html
- 「ドコモ口座」のドメイン、ドコモが取り戻す 出品の経緯を GMO 含め聞いた(1/2 ページ) - ITmedia NEWS
  - https://www.itmedia.co.jp/news/articles/2309/26/news117.html


### 周辺動向

- *State of HTML*
  - https://stateofhtml.com/en-US
- *Tucson's Molly Holzschlag, known as 'the fairy godmother of the web,' dead at 60 | Obituary*
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

- *New in Chrome 116*
  - https://developer.chrome.com/en/blog/new-in-chrome-116/
  - Document Picture-in-Picture API.
  - DevTools missing stylesheets debugging improvements.
  - Motion path allows authors to position any graphical object and animate it along a path specified by the developer.
  - The display and content-visibility properties are now supported in keyframe animations, which allows exit animations to be added purely in CSS.
  - The fetch API can now be used with Bring Your Own Buffer readers, reducing garbage collection overhead and copies, and improving responsiveness for users.
- *Chrome 117 beta*
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
- *What's New in DevTools (Chrome 117)*
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
- *Ship: Form Controls Support Vertical Writing Mode*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-QOUpwElepo
- Ship: Storage Access API with Prompts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JHf7CWXDZUc
- Ship: Detect UA Transitions on same-document Navigations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OTGqhEZ7aug
- *Ship: HTML search element*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5CHw-SXYKGc
- Ship: Baselines in New TextMetrics API in Canvas
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AORzxU_ZNTk
- *Ship: Bounce Tracking Mitigations*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Lxi7LfRyI4c
- Ship: :user-valid and :user-invalid CSS pseudo-classes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UpB_u-wvNeA
- Ship: CSS Relative Color Syntax (RCS)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KeKBTjKEdaU
- Ship: Enrollment for Privacy Sandbox
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/J-nlzLKZvA0
- Ship: Fenced Frames - Functionality Updates
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2FKlwNZ0J4Q
- *Ship: Japanese Phrase Line Breaking*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/96q7WtXtWXc
  - `word-break: auto-phrase` で日本語の文節区切りを実現
  - BudouX を用いている
- Ship: Media Queries: scripting feature
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jiCB_twBqnk
  - JS が有効かどうか取得する query
- *Ship: Sec-CH-Prefers-Reduced-Transparency User Preference Media Features Client Hints Header*
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
- *Prototype: Document Render-Blocking*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YG70jRdekNs
  - レンダリングをブロックし、最初のペイントを一貫させる
  - ViewTransition でアニメーションする DOM の追加をまたないと UX が一貫しないため
- Prototype: Media Queries: scripting feature
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nf3I6lAuHqo
- Prototype: Snapchanged Events
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AGsZy1WSIS0
- *Prototype: CJK punctuation kerning: the CSS `text-spacing-trim` property*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NCUfiS4K32E
  - 日本語フォントの括弧など約物の空きを削る
- *Prototype: CSS Sticky State Container Queries*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/C1D321h3OnA
  - sticky になったことを取得できる
  - state query で取得
- Prototype: FedCM Improvements: Error API, Account Auto Selected Flag, Hosted Domain and Revocation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YfaGM8v-Ocs
- *Prototype: Page-Embedded Permission Control*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TGsrhP4ref0
  - in-content element に権限取得の UI を出したい
- Prototype: Private Network Access restrictions for automotive
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MO2HmKaFe8c
- Prototype: WebDriver commands for triggering Bounce Tracking Mitigations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VMTLpimgZTo
- *Prototype: form-sizing CSS property*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cA-cmgrA_QE
  - `<textarea>` を入力した行の高さに自動的に広げる
- Experiment: WebRTC encoded transform - Modify Metadata functions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yqwA-jXv6VY
- *Experiment: X25519Kyber768 key encapsulation for TLS*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xb4JCKhED3k
- *Deprecate: Remove "Sanitizer API MVP"*
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
- *PSA: Adjacent CDATA sections in XML documents will now be merged*
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GhRScWaK1DI
- PSA: Disallowing unknown import attributes keys
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WMhGw7OMvWA
- PSA: Improved covering and nested scroll snap handling
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nrv9MtQ7BDY
- PSA: Opener Storage Partitioning Explainer
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pWbFePTUnB4
- *Save the date for BlinkOn 18!*
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
  - *Deprecating the unload event*
    - https://developer.chrome.com/en/blog/deprecating-unload/
  - Four new CSS features for smooth entry and exit animations
    - https://developer.chrome.com/en/blog/entry-exit-animations/
  - Bringing Safety check to the chrome://extensions page
    - https://developer.chrome.com/en/blog/extension-safety-hub/
  - Debugging speculation rules
    - https://developer.chrome.com/en/blog/debugging-speculation-rules/
  - *Introducing the scheduler.yield origin trial*
    - https://developer.chrome.com/en/blog/introducing-scheduler-yield-origin-trial/
  - What's new in Lighthouse 11
    - https://developer.chrome.com/en/blog/lighthouse-11-0/
  - Craft your Chrome Devtools Protocol (CDP) commands efficiently with the new command editor
    - https://developer.chrome.com/en/blog/cdp-command-editor/
  - *Astro View Transitions*
    - https://developer.chrome.com/en/blog/astro-view-transitions/
  - *Faster Chrome releases (round two!)*
    - https://developer.chrome.com/en/blog/faster-chrome-releases-round2/
  - *Related Website Sets - the new name for First-Party Sets in Chrome 117*
    - https://developer.chrome.com/en/blog/related-website-sets/
  - DevTools Tips: Snippets and live expressions
    - https://developer.chrome.com/en/blog/devtools-tips-26/
- chromium blog
  - *Chromium Blog: Redesigning Chrome downloads, to keep you productive and safe online*
    - https://blog.chromium.org/2023/08/redesigning-chrome-downloads-to-keep.html
    - ダウンロードの UI が改善された
  - Chromium Blog: Smoothing out the scrolling experience in Chrome on Android
    - https://blog.chromium.org/2023/08/smoothing-out-scrolling-experience-in.html
  - *Chromium Blog: Protecting Chrome Traffic with Hybrid Kyber KEM*
    - https://blog.chromium.org/2023/08/protecting-chrome-traffic-with-hybrid.html
  - *Chromium Blog: Towards HTTPS by default*
    - https://blog.chromium.org/2023/08/towards-https-by-default.html
- google security blog
  - *Google Online Security Blog: An update on Chrome Security updates - shipping security fixes to you faster*
    - https://security.googleblog.com/2023/08/an-update-on-chrome-security-updates.html
    - これまで隔週で行っていたセキュリティ修正の更新を Chrome 116 から毎週に変更
  - Android 14 introduces first-of-its-kind cellular connectivity security features
    - https://security.googleblog.com/2023/08/android-14-introduces-first-of-its-kind.html
  - Downfall and Zenbleed: Googlers helping secure the ecosystem
    - https://security.googleblog.com/2023/08/downfall-and-zenbleed-googlers-helping.html
  - *Making Chrome more secure by bringing Key Pinning to Android*
    - https://security.googleblog.com/2023/08/making-chrome-more-secure-by-bringing.html
  - *Toward Quantum Resilient Security Keys*
    - https://security.googleblog.com/2023/08/toward-quantum-resilient-security-keys.html
  - AI-Powered Fuzzing: Breaking the Bug Hunting Barrier
    - https://security.googleblog.com/2023/08/ai-powered-fuzzing-breaking-bug-hunting.html
- v8
  - https://v8.dev/
- Save the date for BlinkOn 18!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/19KSuM7ywhs
  - 10/17 - 10/19
  - Bay Area + virtual
- *Q2 2023 Summary from Chrome Security*
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
- *Firefox 117 for developers - Mozilla | MDN*
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
- *Ship: Blob URL Partitioning (Total Cookie Protection)*
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/1gt1CVIoffc
- Ship: privacy improvements in `enumerateDevices()`
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/AJp9KF5Ml3w
- Ship: Font Visibility Restrictions in private browsing windows
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/VlJ1hvCvFE4
- *Ship: OpaqueResponseBlocking (ORB)*
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ROU9eDb8alY
- Implement and Ship: CSS `font-synthesis-position` property
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/BBGoz5L8054
- Prototype and Ship: CSS `:first` (first-page pseudo-class)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/gvPfed-oJ6E
- *Prototype and Ship: `<search>` element*
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/1Eoh9zcTt08
- *Prototype: `:has` selector*
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/cU6CraMlGsA
- Prototype: Global Privacy Control
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/oLcaavM2834
- *Experiment and Ship: Encrypted Client Hello*
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
- *Announcing the MDN front-end developer curriculum | MDN Blog*
  - https://developer.mozilla.org/en-US/blog/announcing-mdn-front-end-developer-curriculum/
- Micro benevolences
  - https://openwebdocs.org/content/posts/micro-benevolences/


#### Standard Position

- 今月 Close されたものをみる
  - https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2023-08-01+
- *X25519Kyber768 key encapsulation for TLS · Issue #874 · mozilla/standards-positions*
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
- *The endpoint of Web Environment Integrity is a closed Web*
  - https://educatedguesswork.org/posts/wei/
- *Private Access Tokens, also not great*
  - https://educatedguesswork.org/posts/private-access-tokens/


### Safari 動向

#### Stable: 16.6


#### Updates

- Safari 16.6 Release Notes
  - https://developer.apple.com/documentation/safari-release-notes/safari-16_6-release-notes
- *Safari Technology Preview 176*
  - https://webkit.org/blog/14401/release-notes-for-safari-technology-preview-176/
  - CSS
    - Added support for contain-intrinsic-size: inherit (266100@main)
    - *Implemented `linear(...)` timing function for CSS animations & transitions (266195@main)*
  - Rendering
    - Fixed out-of-flow boxes not showing (266366@main)
    - Fixed canvas not showing the results of CanvasRenderingContext2D.putImageData until a forced re-render (266397@main)
    - Fixed scrollbar not updating on CSS color-scheme change (266176@main)
    - Prevented invalidating columns when the entire table is being destroyed (266344@main)
  - Accessibility
  - Media
    - Implemented automatic text track selection for 'metadata' tracks (266380@main)
  - Web API
    - *Added support for the title attribute for pattern validation errors (266311@main)*
    - Aligned naturalWidth and naturalHeight with spec, changing from int to unsigned (266302@main)
    - Changed to return opaque origin for blob: URL containing inner non-http(s): URL (266247@main)
    - Converted embed hidden into a proper boolean attribute (266399@main)
    - Throttled mousemove events to one per rendering update (266341@main)
- *Updates to Storage Policy*
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
- *Release Notes for Safari Technology Preview 177*
  - https://webkit.org/blog/14412/release-notes-for-safari-technology-preview-177/
  - ほぼ Fix
  - JavaScript
    - Optimized Array#splice to skip result array creation if it is not used at all (266591@main)
- *Building Profiles with new WebKit API*
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
- *Customized built-in elements · Issue #97*
  - https://github.com/WebKit/standards-positions/issues/97
  - Oppose
- CSS highlight pseudo system · Issue #95
  - https://github.com/WebKit/standards-positions/issues/95
  - Support
- CSS `initial-letter` property · Issue #94
  - https://github.com/WebKit/standards-positions/issues/94
  - Support
- *View Transitions API Level 1 · Issue #48*
  - https://github.com/WebKit/standards-positions/issues/48
  - Support


#### Other

- *Blog - 2024 Apple Security Research Device Program now accepting applications - Apple Security Research*
  - https://security.apple.com/blog/security-research-device-program-2024/


### Edge 動向

#### Stable: 116


#### Updates

- *Collaborating with Open Web Docs for great PWA docs*
  - https://blogs.windows.com/msedgedev/2023/08/09/pwa-documentation-mdn-web-docs-open-web-docs/
- *Publish your PWA to the Microsoft Store on Windows for free with PWABuilder*
  - https://blogs.windows.com/msedgedev/2023/08/16/publish-your-pwa-to-the-microsoft-store-on-windows-for-free-with-pwabuilder/
  - 8/15-9/15 まで無料
- Microsoft Edge for Business is now available, helping organizations maximize productivity and security
  - https://blogs.windows.com/msedgedev/2023/08/22/microsoft-edge-for-business-now-available/
- *Announcing support for HSTS on Exchange Server 2016 and 2019 - Microsoft Community Hub*
  - https://techcommunity.microsoft.com/t5/exchange-team-blog/announcing-support-for-hsts-on-exchange-server-2016-and-2019/ba-p/3912740


#### Other

- *Edge のよくあるご質問 | Japan Developer Support Internet Team Blog*
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
  - *Service Worker Static Routing API incubation*
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0019.html
  - Proposed W3C Charter: Pointer Events Working Group Extended
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0020.html
  - Advance notice: Work in progress on Web Application Security Working Group Charter; Current Charter Extended
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0021.html
  - Web Performance Working Group Charter Extended
    - https://lists.w3.org/Archives/Public/public-new-work/2023Aug/0022.html


#### Other

- *Web Environment Integrity has no standing at W3C; understanding new W3C work*
  - https://www.w3.org/blog/2023/web-environment-integrity-has-no-standing-at-w3c/
  - WEI はまだ提案に過ぎないよという話と、 W3C で提案はどのように持ち込まれるかという話
  - ワーキンググループのチャータリング、 TAG review などのレビューを経た上で、複数の実装があってはじめて標準になる
- *Add switch attribute to the input element to allow for a two-state switch control. by lilyspiniolas · Pull Request #9546 · whatwg/html*
  - https://github.com/whatwg/html/pull/9546
    - Apple がスイッチコントロールの `<input type="checkbox" switch>` を提案
- *Draft Note: Guidance on Applying WCAG 2.2 to Non-Web Information and Communications Technologies (WCAG2ICT)*
  - https://www.w3.org/news/2023/draft-note-guidance-on-applying-wcag-2-2-to-non-web-information-and-communications-technologies-wcag2ict/
- *Agenda for Aug 31st, 2023 · Issue #400 · web-platform-tests/interop*
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
- *Stage 3 update of Intl Locale Info API*
  - https://github.com/tc39/proposal-intl-locale-info/pull/70 PR これ?
  - Date: Number: 0..6  (1 = Monday, 0 = Sunday)
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
- *Reducing wasted effort due to proposal churn*
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
- *Meta-review of Stage 3 proposals*
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

- *tc39/proposal-optional-chaining-assignment*
  - `a?.b = c` proposal
  - https://github.com/tc39/proposal-optional-chaining-assignment
- *tc39/proposal-dataview-get-set-uint8clamped*
  - TC39 proposal to add DataView.prototype.getUint8Clamped and DataView.prototype.setUint8Clamped
  - https://github.com/tc39/proposal-dataview-get-set-uint8clamped
- *tc39/proposal-defer-import-eval*
  - A proposal for introducing a way to defer evaluate of a module
  - https://github.com/tc39/proposal-defer-import-eval


#### Other


### WinterCG 動向

- Meeting や大きな動きがあった月だけやる


#### Meeting

- *2023-08-03 Meeting*
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
  - *Protocol Action: 'Oblivious HTTP' to Proposed Standard (draft-ietf-ohai-ohttp-09.txt)*
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
  - *Request-OTR Header*
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

- *RFC Numbers for Testing and Example Use*
  - https://www.ietf.org/archive/id/draft-eastlake-test-rfc-numbers-00.html


### CDN 動向

#### Cloudflare

- 2022 年に最も悪用された脆弱性を明らかに
  - https://blog.cloudflare.com/ja-jp/unmasking-the-top-exploited-vulnerabilities-of-2022-ja-jp/
- *Cloudflare の「2023 年フィッシング脅威レポート」のご紹介*
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

- *Using short-lived certificates to protect TLS secrets - Engineering at Meta*
  - https://engineering.fb.com/2023/08/07/security/short-lived-certificates-protect-tls-secrets/
- *How Meta is improving password security and preserving privacy - Engineering at Meta*
  - https://engineering.fb.com/2023/08/08/security/how-meta-is-improving-password-security-and-preserving-privacy/


### 周辺動向

- *Celebrating Ten Years of Encrypting the Web with Let's Encrypt | Electronic Frontier Foundation*
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
