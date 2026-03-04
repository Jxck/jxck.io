---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep140.mp3
published_at: 2024-01-28
guest:
  - [@myakura](https://twitter.com/myakura)
---

# ep140 Monthly Platform 202401

## Theme

第 140 回のテーマは 2023 年 12 月と 2024 年 1 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 120

#### Updates

- New in Chrome 120 | Blog | Chrome for Developers
  - https://developer.chrome.com/blog/new-in-chrome-120?hl=en
  - CloseWatcher API.
  - `<details>` name attribute
  - Permission policy violation reports
  - And more!
  - Further reading
  - Subscribe
- **Chrome 121 beta**
  - https://developer.chrome.com/blog/chrome-121-beta
  - CSS
    - **CSS Highlight Inheritance**
    - CSS Scrollbars: scrollbar-color and scrollbar-width
    - CSS font-palette animation for color fonts
    - CSS spelling and grammar features
    - Improved CSS masking for SVG
    - Ruby-specific display values
  - Web APIs
    - Attribution Reporting Feature Bundle: Reduced Aggregate Delays, Event-Level Report Epsilon Field, Reserved Keys
    - Back/forward cache notRestoredReason API
    - Require user gesture for resize APIs in Document picture-in-picture
    - EditContext API
    - Feature detection for supported clipboard formats
    - HTMLSelectElement showPicker()
    - MediaCapabilities: Query HDR support with decodingInfo()
    - Private Aggregation API: aggregation coordinator selection
    - Remote Playback API on desktop
    - Speculation Rules API
    - SpeechSynthesis and SpeechSynthesisVoice interface objects
    - Storage Buckets API
    - URLPattern: Inherit left, wildcard right
    - URLPattern: RegExp v flag instead of u
    - Additions to WebGPU
    - X25519Kyber768 key encapsulation for TLS
  - Origin trials in progress
    - The Element Capture API
  - Changes to existing behavior
    - Discard Input Events To Recently Moved Cross-Origin Iframes
- What's new in DevTools (Chrome 121)
  - https://developer.chrome.com/blog/new-in-devtools-121
  - Elements improvements
    - @font-palette-values support
    - Supported case: Custom property as a fallback of another custom property
  - Improved source map support
  - Performance panel improvements
    - Enhanced Interactions track
    - Advanced filtering in Bottom-Up, Call Tree, and Event Log tabs
  - Indentation markers in the Sources panel
  - Helpful tooltips for overridden headers and content in the Network panel
  - New Command Menu options for adding and removing request blocking patterns
  - The CSP violations experiment is removed
  - Lighthouse 11.3.0

#### Intents

- Ship: Async Clipboard API: Read unsanitized HTML format
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jepMbayI0UM
- Ship: Attribution Reporting Features (Reduced Aggregate Delays, Event-Level Report Epsilon Field, Reserved Keys)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/g9KiC6Rg_mA
- Ship: Auto Sizes for Lazy Loaded Images with Srcset
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OAsmCbjPJz0
- Ship: CSSKeyframesRule.length
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GMf6rlVEDaM
- Ship: Extension of WebDriver command for clicking on FedCM dialogs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kRzq0JVkfNw
- Ship: FedCM: domain hint and disconnect
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CY54qsjcKfU
- Ship: Fenced Frames - Enable Leaving IGs, and Ads Report at Top Level Navigation Start (Chrome - 120)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1YXDYY9Ib2A
- **Ship: field-sizing CSS property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MjCCRQo9Qk0
  - textarea の入力行に合わせて拡大するプロパティ
- Ship: Interoperable mousemove default action
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fyVzOAmQHzU
- Ship: MediaStreamTrack Stats (Audio)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xcGJyic7ttI
- Ship: Navigational prefetch: follow redirects
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YBfIntsxMuk
- **Ship: Third-party cookie deprecation exemption heuristics**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yGhI6iTAfeA
  - Bugs
    - https://issuetracker.google.com/issues?q=status:open%20componentid:1306484
- Ship: URLPattern: hasRegExpGroups
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JGyGWM1x3Js
- Ship: CSS custom state new :state() syntax
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GDmNaxAuCY4
- Ship: Protected Audience Ad slot size in real-time bidding signals fetch and update more interest group fields
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xl4fIl60JtY
- Ship: Set methods
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JiGDyWroyng
- **Ship: Use specific fetch destination for JSON/CSS modules**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8BbZ_NUVZ5Q
- Ship: WGSL: packed 4x8 integer dot product (DP4)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JxQT5bIlet8
- Ship: WGSL: pointer composite access
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6Toiv4xPaJ0
- Ship: WGSL: unrestricted pointer parameters
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PS_Ttg01m7k
- Ship: WebGPU: read-write storage textures
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TuXMeKTlVZc
- Ship: WebGPU: render to slice of 3D texture
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GGJx9TM2y_k
- Ship: WebGPU: separate Read-only depth-stencil
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IOnc46Q6A90
- Ship: WebSocket: Allow http(s) scheme and relative URLs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/f10-tDq6EUY
- Ship: Allow Cross-Origin Subframes to Send Automatic Beacons
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/byT9ygyWlo0
- **Ship: CSS Pseudo Element ::backdrop inheriting from Originating Element**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yXTxBfLthzc
- **Ship: Import attributes 'with' syntax**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/at-bKcdakOo
- Ship: Long Animation Frame Timing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5IzAuV4WtfU
- Ship: New ALPS code point
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yGdMW_gsGS4
- Ship: RTCRtpSender setParameters() extensions for requesting the generation of a key frame
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pd3Hksi3jq0
- Ship: Allow for WebAuthn credential creation in a cross-origin iframe
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Sq2WAVbPz6g
- **Ship: CSS Highlight Inheritance**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/73qlvaSFmfg
  - 10 月に出た intent だが、WordPress のエディターが壊れることがわかり延期に
- Prototype and Ship: MessagePort.onclose
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/enQs5VEdOmU
- Implement and ship: blocking=render on inline scripts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bMzZvBSmSOk
- **Implement and Ship: Allow elements with CSS display:contents to be focusable**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9hvYiSZy868
- **Prototype: Confirmation of Action API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JBpUXKsJ5qg
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/Accessibility/AriaNotify/explainer.md
  - 元スレは古いがこれに繋がったらしい
- **Prototype: Eye Gaze Correction API.**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EMiN_hyfZ0Y
  - ビデオ通話で視線が合わないのを修正するプラットフォーム API があるらしい
- Prototype: FedCM Button Mode API and Add Account API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hZg8ice8f0A
- prototype: fenced frames with local unpartitioned data access
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ofii__csdOY
- **Prototype: Locked Mode API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2fqPL6OhmUs
- Prototype: Unprefixed cross-fade()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XRdTX1fOa7Q
- Prototype: Unrestricted WebUSB (available only to Isolated Web Apps)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0mkX3q2UfEQ
- Prototype: CSS calc-size() function
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YSc-ri5O32I
- Prototype: document.caretPositionFromPoint API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MeM7TRtTsOs
- Prototype: CSS view-transition-class and class VT argument syntax
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1-1weImG02I
- **Prototype: Declarative shadow DOM serialization**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PE4VwMjLVTo
  - getInnerHTML が getHTML に更新される
- Extend Experiment: Compute Pressure API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/s83S7wXxa6E
- **Deprecate: SMIL**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5o0yiO440LM
  - SVG で宣言的なアニメーションを記述するやつ
  - 2015 年に intent to deprecate が出たが批判がでた
  - その後も消されず、利用率も 2.0%を超えている
- Deprecate non-standard declarative shadow DOM serialization
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/it0X7BOimKw
- Request for Deprecation Trial : HTMLVideoElement-specific Prefixed Fullscreen API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jrkCYeUSusg
- Experiment - Wasm JavaScript Promise Integration
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YNuYkzmxlOY
- Experiment - WebAssembly JavaScript Promise Integration (update)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Fu79zrp7MoE
- Experiment: Captured Surface Control
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7MbIEBdHMck
- Extend Experiment: Soft Navigation Heuristics
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xxrmKr-6X38
- Extend Reverse Origin Trial: Trial for SharedArrayBuffers in non-isolated pages on Desktop platforms
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UospzV3lZMk
- Change:
- Unship:
- Remove:
- PSA: Changing File System Access API interaction with the back/forward cache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/A7VSJ3KuhFQ
- PSA: chrome_wpt_tests has been added to CI/CQ
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/s8GHsUokXnc
- PSA: depot_tools migrated to python 3.11
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GNF8NoTC9wI
- PSA: FedCM: Chrome relaxes explicit mediation requirement if IdP has third party cookies access
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aZdqfifYnNI
- **PSA: Fix handling invalid date "0" for Expires header value as expired**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Pk-L56RLfG4
- PSA: Bug fix in permissions policy parser to correctly handle newlines
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GbQCEIHk4ZU
- **Web-Facing Change PSA: align-content CSS property for blocks**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RZILN94pAqk
  - 普通のブロックでも上下中央寄せができるようにしたい
  - Netflix が壊れたので一旦 revert
    - https://bugs.chromium.org/p/chromium/issues/detail?id=1512036
  - `supports()` でサポート状況を判別できない問題も
- Web-Facing Change PSA: Async Clipboard API: Write well-formed HTML document.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/t57q9Sz8evg
- Web-Facing Change PSA: Do not delete File kind objects in dataTransfer.clearData()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zFvrMpt8hyw
- Web-Facing Change PSA: CSS @container with unsupported Features never match
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ax1x6SqwY_0
- Web-Facing Change PSA: Enable clipboard access via Async Clipboard API in event handlers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ogthZ-gQwFE
- Web-Facing Change PSA: Interoperable mousedown event cancellation in iframe
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RYzJrvPzHss
- Web-Facing Change PSA: Speculation rules: infer "source" if possible
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lyY10E6yLsY
- FYI that Top Topics Selection with Prioritization is starting to roll out to Stable soon
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AbhTNZyC73c
- As a web feature author, which Chrome Status changes would help you?
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yp8oX0quYi4
- Ready for Developer Testing: SetRPHRegistrationMode WebDriver extension comnand
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zOFuMCJgM8M
- Exploring a commons fund for Chromium
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8Snmt35TjhY
- Request for API OWNERs' feedback for microwaiting in JS
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0D4H4e_NpVM
- PSA: FedCM will skip well-known file checks when the IDP and RP are same-site
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/U28tSlosPkE
- RuntimeEnabledFeatures flags that we might be able to remove
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ScIKVcPF5Yw
- [PSA] python 2 removed from depot_tools, vpython still available
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KRUgJBFVbqQ
- **New API owner: Domenic Denicola**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IBBUEIpi0k4

#### Other

- web.dev
  - **A definition update for Baseline**
    - https://web.dev/blog/baseline-definition-update
    - 全ブラウザに実装されると Newly Available
    - そこから 30 ヶ月経過すると Widely Available
    - 世界の 95% のユーザに浸透するまで 30 ヶ月かかるという調査から
    - こっちは古そう
      - https://github.com/web-platform-dx/web-features/blob/main/docs/baseline.md
  - Avoid invisible text during font loading
    - https://web.dev/articles/avoid-invisible-text
  - Baseline
    - https://web.dev/baseline
  - **Baseline 2023**
    - https://web.dev/blog/baseline2023
  - Content delivery networks (CDNs)
    - https://web.dev/articles/content-delivery-networks
  - First Contentful Paint (FCP)
    - https://web.dev/articles/fcp
  - How Trendyol reduced INP by 50%, resulting in a 1% uplift on click-through rate
    - https://web.dev/case-studies/trendyol-inp
  - It's time to lazy-load offscreen iframes!
    - https://web.dev/articles/iframe-lazy-loading
  - Largest Contentful Paint (LCP)
    - https://web.dev/articles/lcp
  - New to the web platform in November
    - https://web.dev/blog/web-platform-11-2023
  - New to the web platform in December
    - https://web.dev/blog/web-platform-12-2023
  - OffscreenCanvas-speed up your canvas operations with a web worker
    - https://web.dev/articles/offscreen-canvas
  - Optimize the encoding and transfer size of text-based assets
    - https://web.dev/articles/optimizing-content-efficiency-optimize-encoding-and-transfer
  - Preload modules
    - https://web.dev/articles/modulepreload
  - Rendering performance
    - https://web.dev/articles/rendering-performance
  - ResizeObserver: it's like document.onresize for elements
    - https://web.dev/articles/resize-observer
  - The inert attribute
    - https://web.dev/articles/inert
  - **What makes for a good sign-out experience?**
    - https://web.dev/articles/sign-out-best-practices
  - **Discoverable credentials deep dive**
    - https://web.dev/articles/webauthn-discoverable-credentials
  - 5 CSS snippets every front-end developer should know in 2024
    - https://web.dev/articles/5-css-snippets-every-front-end-developer-should-know-in-2024
  - What are the parts of a URL?
    - https://web.dev/articles/url-parts
  - Working with IndexedDB | Articles | web.dev
    - https://web.dev/articles/indexeddb
- google for developers
  - https://developers.googleblog.com/
  - YouTube Ads Creative Analysis
    - https://developers.googleblog.com/2024/01/youtube-ads-creative-analysis.html
  - Create smart chips for link previewing in Google Docs
    - https://developers.googleblog.com/2023/12/create-smart-chips-for-link-previewing-in-google-docs.html
- google developer japan blog
  - Google Developers Japan: Google Ads API の 2024 年のリリースと提供終了のスケジュール
    - https://developers-jp.googleblog.com/2024/01/google-ads-api-2024.html
- chrome developer blog
  - Participate in the origin trial for non-cookie storage access through the Storage Access API
    - https://developer.chrome.com/blog/saa-non-cookie-storage
  - DevTools Tips: Debugging bfcache
    - https://developer.chrome.com/blog/devtools-tips-29
  - **Revisiting Chrome's installability criteria**
    - https://developer.chrome.com/blog/update-install-criteria
    - Chrome でサイトが PWA としてインストール可能になる条件が変わっている
  - How Chrome DevTools helps to defend against self-XSS attacks
    - https://developer.chrome.com/blog/self-xss
  - DevTools Tips: What is DOM? HTML versus DOM
    - https://developer.chrome.com/blog/devtools-tips-28
  - CSS Wrapped: 2023!
    - https://developer.chrome.com/blog/css-wrapped-2023
  - Download old Headless Chrome as chrome-headless-shell
    - https://developer.chrome.com/blog/chrome-headless-shell
  - What's New in WebGPU (Chrome 120)
    - https://developer.chrome.com/blog/new-in-webgpu-120
  - **Chrome enables desktop mode by default on premium tablets**
    - https://developer.chrome.com/blog/desktop-mode
    - Pixel Tablet の Chrome の UA が変更
    - Linux デスクトップと違いがなくなる
    - > In addition, the `SEC-CH-UA-MODEL` and `SEC-CH-UA-PLATFORM` HTTP headers will no longer report "Pixel Tablet" and "Android", and instead will report "" and "Linux" respectively.
  - Harness the power of WebDriver BiDi: Chrome and Firefox automation with Puppeteer
    - https://developer.chrome.com/blog/puppeteer-webdriver-bidi-2023
  - DevTools Tips: Debugging fetch priority
    - https://developer.chrome.com/blog/devtools-tips-30
  - DevTools Tips: Authoring colors
    - https://developer.chrome.com/blog/devtools-tips-03
  - Persistent permissions for the File System Access API
    - https://developer.chrome.com/blog/persistent-permissions-for-the-file-system-access-api
  - CSS vertical writing mode for form control elements
    - https://developer.chrome.com/blog/vertical-form-controls
  - Supercharge Web AI model testing: WebGPU, WebGL, and Headless Chrome | Blog | Chrome for Developers
    - https://developer.chrome.com/blog/supercharge-web-ai-testing
  - Test Web Bluetooth with Puppeteer | Blog | Chrome for Developers
    - https://developer.chrome.com/blog/test-web-bluetooth-with-puppeteer
  - Safely accessing the DOM with Angular SSR | Blog | Chrome for Developers
    - https://developer.chrome.com/blog/angular-dom-safety-ssr
  - What's New in WebGPU (Chrome 121) | Blog | Chrome for Developers
    - https://developer.chrome.com/blog/new-in-webgpu-121
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
- search blog
  - 振り返り | Google 検索セントラル ブログ | Google for Developers
    - https://developers.google.com/search/blog/2023/12/definitely-not-ai-generated-post?hl=ja
- v8
  - Maglev - V8's Fastest Optimizing JIT · V8
    - https://v8.dev/blog/maglev
    - Sparkplug と TurboFan
  - V8 is Faster and Safer than Ever! · V8
    - https://v8.dev/blog/holiday-season-2023
- other
  - **[scroll-customization-api] is there still interest/ongoing discussions for scroll customization? · Issue #1118 · w3c/css-houdini-drafts**
    - https://github.com/w3c/css-houdini-drafts/issues/1118#issuecomment-1854163406
    - Rick Byers が Extensible Web Manifest について言及
    - > I still agree with what I said about higher-level APIs being fundamentally limited and low-level primitives being more powerful. But I also now think it was a grave error for me to argue against prioritizing such APIs like snap points in favour of getting scroll customization primitives (I just underestimated the challenge by at least an order of magnitude). While I still agree with much of the philosophy of the extensible web manifesto, I think we got the priority wrong then. IMHO in a world of quite limited resources for browser engine investment (especially considering across WebKit/Gecko/Chromium) the first priority should be to ensure the 95% use cases can be done easily and (crucially) in a highly-performant way with declarative APIs. Making the remaining 5% possible in some way is also important probably less so.
    - 低レイヤーの API の重要性は認めるも、実装としては 95% のユースケースを満たせる宣言的な API を優先した方が良い
  - **Google Chrome December update: New performance and security features**
    - https://blog.google/products/chrome/google-chrome-december-2023-update/
    - タブにメモリの消費量が表示されるように
  - **Explainers by Googlers**
    - https://github.com/explainers-by-googlers
    - いつの間にかできていた
  - Bramus: "Frontend Mastodon, I need your help!🪆 How would you like to see Chrome DevTools handle Nesting?" - Front-End Social
    - https://front-end.social/@bramus/111561967310461072
    - DevTools で CSS Nesting の UI をどうするか
  - **An update on our preparations for the DMA**
    - https://blog.google/around-the-globe/google-europe/an-update-on-our-preparations-for-the-dma/
    - 2024 年 3 月から検索エンジンやブラウザの選択画面がヨーロッパ圏で提供される
  - DMA Choice Screen
    - https://www.android.com/choicescreen/dma/
  - Chrome Browser Choice Screen - Google Chrome
    - https://www.google.com/chrome/choicescreen/

### Firefox 動向

#### Stable: 122

#### Updates

- **Firefox 122.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/122.0/releasenotes/
  - macOS で Passkey サポート
- **Firefox 122 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/122
  - `<hr>` in `<select>`
  - `select.showPicker()`
  - offset-path
  - `ArrayBuffer.prototype.transfer()`
  - LargestContentfulPaint API
- **"URL" Gonna Want To Check This Out - These Weeks in Firefox: Issue 150 - Firefox Nightly News**
  - https://blog.nightly.mozilla.org/2023/12/04/url-gonna-want-to-check-this-out-these-weeks-in-firefox-issue-150/
  - DevTools で遅い `:has()` に警告アイコンがが表示されるようになった
  - DevTools に難読化ツールが入れる `debugger` 文を無効にするトグルがついた
- Better Searching in Firefox to close out 2023 - These Weeks in Firefox: Issue 151 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2023/12/14/better-searching-in-firefox-to-close-out-2023-these-weeks-in-firefox-issue-151/
- Happy New Year - These Weeks in Firefox: Issue 152 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2024/01/22/happy-new-year-these-weeks-in-firefox-issue-152/

#### Intents

- Ship: HTML editor respects CSS display property to consider inline vs. block
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/mTdHrYtsMPU
- **Ship: Declarative ShadowDOM**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/P-ZBI_7fEaE
- Ship: Screen Wake Lock API
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/aN9u94_d3r8
- Prototype and ship: content-visibility
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/kXp-yUvkNKQ
- Prototype and ship: http(s) and relative URLs for WebSocket
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/1je37gGZel0
- **Prototype and ship: AbortSignal.any**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/p84BwYsBdOg
- Prototype:
- Change:
- Remove:

#### Newsletter

- Firefox DevTools Newsletter - 121 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-121/
- Firefox WebDriver Newsletter - 121 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-121/

#### MDN / Open Web Docs

- Developer essentials: JavaScript console methods | MDN Blog
  - https://developer.mozilla.org/en-US/blog/learn-javascript-console-methods/
- **Baseline's evolution on MDN | MDN Blog**
  - https://developer.mozilla.org/en-US/blog/baseline-evolution-on-mdn/
- **Saying goodbye to third-party cookies in 2024 | MDN Blog**
  - https://developer.mozilla.org/en-US/blog/goodbye-third-party-cookies/
- Build AI-powered applications using OpenLLM and Vultr Cloud GPU | MDN Blog
  - https://developer.mozilla.org/en-US/blog/build-ai-powered-apps-openllm-vultr-gpu/
- Border images in CSS: A key focus area for Interop 2023 | MDN Blog
  - https://developer.mozilla.org/en-US/blog/border-images-interop-2023/
- Thanks to all our 2023 and 2024 sponsors
  - https://openwebdocs.org/content/posts/thanks-2023/
- Technical review: Update cookie docs by chrisdavidmills · Pull Request #31848 · mdn/content
  - https://github.com/mdn/content/pull/31848
  - MDN の Cookie ドキュメントを更新する
- Proposal: Updating cookie docs on MDN - Google Docs
  - https://docs.google.com/document/d/1Ipc9onwOssCMz6cVdlpvRVdhGbaC0gAjqFwib-aeUoU/preview

#### Standard Position

- 今月 Close された Issue と PR ものをみる
  - https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2024-01-01+
- positive
  - WebSockets: Allow http(s) scheme and relative URLs
    - https://github.com/mozilla/standards-positions/issues/966
  - WebAssembly JS Promise Integration
    - https://github.com/mozilla/standards-positions/issues/944
  - `navigation.activation`
    - https://github.com/mozilla/standards-positions/issues/928
  - Focusability of elements with display:contents
    - https://github.com/mozilla/standards-positions/issues/772
- negative
  - Private Access Tokens
    - https://github.com/mozilla/standards-positions/issues/954
  - Private State Token API
    - https://github.com/mozilla/standards-positions/issues/262

#### Other

- **Platform Tilt: Documenting the Uneven Playing Field for an Independent Browser Like Firefox - Open Policy & Advocacy**
  - https://blog.mozilla.org/netpolicy/2024/01/19/platform-tilt/
  - ブラウザの競争の妨げになる要因をプラットフォームごとにまとめ公開
- **Platform Tilt - Mozilla**
  - https://mozilla.github.io/platform-tilt/
  - https://github.com/mozilla/platform-tilt/
- Introducing llamafile - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2023/11/introducing-llamafile/
  - ローカル LLM を実行ファイルにするフォーマット
- Firefox Developer Edition and Beta: Try out Mozilla's .deb package! - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2023/11/firefox-developer-edition-and-beta-try-out-mozillas-deb-package/
- Puppeteer Support for the Cross-Browser WebDriver BiDi Standard - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2023/12/puppeteer-webdriver-bidi/
  - Puppeteer が WebDriver BiDi をサポート
  - Firefox の CDP 部分実装よりもできることが増えた
- **PSA: PromiseUtils.defer() has been replaced by Promise.withResolvers()**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/FqOnd1J4-YI
  - 内部で使ってたユーティリティ関数が標準に置き換わった
- Advancing Mozilla's mission through our work on localization standards | Mozilla L10N
  - https://blog.mozilla.org/l10n/2024/01/18/advancing-mozillas-mission-through-our-work-on-localization-standards/
- Mozilla Localization in 2023 | Mozilla L10N
  - https://blog.mozilla.org/l10n/2024/01/15/mozilla-localization-in-2023/
- **This year in Servo: over 1000 pull requests and beyond - Servo, the embeddable, independent, memory-safe, modular, parallel web rendering engine**
  - https://servo.org/blog/2023/12/18/this-year-in-servo/
  - https://gigazine.net/news/20231220-servo-is-well-and-truly-back/
- 1423593 - Add Intl.Segmenter API
  - https://bugzilla.mozilla.org/show_bug.cgi?id=1423593
  - 122 の Nightly に Intl.Segmenter が入った
- **www.google.com - The page is blank when accessed · Issue #131916 · webcompat/web-bugs**
  - https://github.com/webcompat/web-bugs/issues/131916
  - Android 版 Firefox で Google 検索が真っ白になっていた
    - https://status.search.google.com/incidents/hySMmncEDZ7Xpaf9i32C
- **Update Serial position (#959) · mozilla/standards-positions@5e6937f**
  - https://github.com/mozilla/standards-positions/commit/5e6937f1e68adac03628f2df80b9490b31cf45d6
  - Add-on gated なパーミッションモデルなら Web Serial も negative ではない
  - 実装する予定はないがパッチがあれば受け取るとも
    - https://github.com/mozilla/standards-positions/issues/687#issuecomment-1879160383
- Geckodriver 0.34.0 Released - Firefox Developer Experience
  - https://fxdx.dev/geckodriver-0-34-0-released/
- Fixing keyboard navigation in Inspector Rules view - Firefox Developer Experience
  - https://fxdx.dev/rules-view-enter-key/
- **What's next for Mozilla? | TechCrunch**
  - https://techcrunch-com.cdn.ampproject.org/c/s/techcrunch.com/2024/01/03/whats-next-for-mozilla/amp/

### Safari 動向

#### Stable: 17.3

#### Updates

- Release Notes for Safari Technology Preview 184
  - https://webkit.org/blog/14780/release-notes-for-safari-technology-preview-184/
  - Added support for CSS custom properties on dialog ::backdrop (270246@main) (117949961)
  - Added support for ArrayBuffer.prototype.detached, ArrayBuffer.prototype.transfer, and ArrayBuffer.prototype.transferToFixedLength. (270349@main) (118037759)
  - Added support for all of HTML's character entities in WebVTT. (270240@main) (51064890)
  - **Added support for AbortSignal.any(). (270268@main) (117985827)**
  - **Added support for element.checkVisibility(). (270425@main) (118157977)**
  - Enabled extended constant expressions. (270475@main) (118190467)
  - Added support for grouping source map load errors. (270834@main) (109239646)
  - Added an editor for the CSS linear() timing function. (270855@main) (115095425)
- WebKit Features in Safari 17.2
  - https://webkit.org/blog/14787/webkit-features-in-safari-17-2/
  - HTML
    - Exclusive accordions
    - One time codes
  - CSS
    - Nesting
    - New units
    - Motion Path and Shapes
    - Animation
    - Math functions
    - Counters
    - Mask border
    - Custom Highlights
  - Images and video
    - Responsive images
    - Image Orientation
    - SVG
    - WebCodecs
    - Media element
  - JavaScript
    - Import attributes
    - Number Format
  - Web API
    - Fetch Priority
    - Forms validation
    - Canvas
    - DOM Events
  - Web Apps
    - Login cookies
    - Web App icons
    - User options
  - WebGL
  - Privacy
  - Web Inspector
    - Color Palette with color variables
    - Animation
  - Fixes for Interop 2023 and more
  - Updating to Safari 17.2
- Release Notes for Safari Technology Preview 185
  - https://webkit.org/blog/14885/release-notes-for-safari-technology-preview-185/
  - **Added support for align-content on block containers. (271818@main) (114740670)**
  - Added percentage values support for letter-spacing and word-spacing. (271357@main) (116562262)
  - **Added support for scroll anchoring with overflow-anchor. (271790@main) (118365809)**
  - **Added support for @scope. (271670@main) (119261250)**
  - Added WebCodecs VP9 profile 2 support. (271238@main) (118879753)
  - **Added Element.prototype.setHTMLUnsafe(), ShadowRoot.prototype.setHTMLUnsafe(), and Document.parseHTMLUnsafe() methods. (271423@main) (115345128)**
  - Expanded OffscreenCanvas support for bitmaprenderer, webgl, and webgl2. (271300@main) (109594232)
  - Added Grid overlay support for Masonry layout. (271332@main) (118833618)
  - Added support for getClientCapabilities(). (271584@main) (119058559)
  - Enabled WebGPU to be testable via the Develop menu. (271725@main) (119262908)
- Release Notes for Safari Technology Preview 186
  - https://webkit.org/blog/14916/release-notes-for-safari-technology-preview-186/
  - CSS
    - Added support for invalidating :any-link, :link, and :-webkit-any-link inside :has() (271919@main) (116616425)
    - Added support for @scope invalidation. (271897@main) (119313058)
    - Added support for an implicit scoping root when there is no scope-start. (272390@main) (119659940)
    - Added support for :scope inside @scope prelude. (272065@main) (119661541)
    - Added support for align-content on table cells. (272373@main) (119701629)
    - Added support for content-visibility to be animate-able. (272364@main) (119940258)
  - Forms
    - **Added focus ring support for \<input type="checkbox" switch>. (271884@main) (119499785)**
    - Added vertical rendering support for input type="checkbox" switch. (272405@main) (119940157)
  - Web API
    - Added a "gamepad" permission policy defaulting to `*` for the allow list. (272199@main) (83219098)
    - Added ShadowRoot clonable attribute. (272096@main) (119707278)
- WebGPU now available for testing in Safari Technology Preview
  - https://webkit.org/blog/14879/webgpu-now-available-for-testing-in-safari-technology-preview/
  - WebGPU JavaScript API
    - Creating a GPUDevice
    - Configuring a GPUCanvasContext
    - Creating a GPURenderPipeline
    - Issuing draw calls
  - WebGPU Shading Language
  - Try WebGPU and file bugs!
- Announcing MotionMark 1.3
  - https://webkit.org/blog/14908/motionmark-1-3/
  - ブラウザのグラフィックベンチマークの MotionMark を 1.3 に更新
- WebKit Features in Safari 17.3
  - https://webkit.org/blog/14919/webkit-features-in-safari-17-3/
  - Bugfix のみ

#### Standard Positions

- 今月 Close されたものをみる
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2023-12-01+
- Support
  - CSS transition-behavior property · Issue #148 · WebKit/standards-positions
    - https://github.com/WebKit/standards-positions/issues/148

#### Other

- **Nicole Sullivan: "Today was my first day working on WebKit at Apple. Squeee! I'm the Eng Manager for Layout and Rendering." - Front-End Social**
  - https://front-end.social/@stubbornella/111565293257301386
  - 先日 Google をやめた Nicole Sullivan が Apple に

### Edge 動向

#### Stable: 120

#### Updates

- **Microsoft Edge: Looking back at an unforgettable 2023**
  - https://blogs.windows.com/msedgedev/2023/12/28/microsoft-edge-looking-back-at-an-unforgettable-2023/
- **Inside the all-new Edge DevTools user interface**
  - https://blogs.windows.com/msedgedev/2023/12/20/inside-the-all-new-edge-devtools-ui/
  - アクティビティバーがアイコン導入によりコンパクトに

#### Other

- Browser Security Bugs that Aren't - #1: Local Attacks | Microsoft Browser Vulnerability Research
  - https://microsoftedge.github.io/edgevr/posts/Browser-Security-Bugs-that-Aren-t-part-1/
- Coding at Google - text/plain
  - https://textslashplain.com/2024/01/02/coding-at-google/

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - **First Public Working Draft: Accessible Rich Internet Applications (WAI-ARIA) 1.3**
    - https://www.w3.org/news/2024/first-public-working-draft-accessible-rich-internet-applications-wai-aria-1-3/
- Chartering
  - Web Accessibility Initiative (WAI) Interest Group Charter extended until 2024-06-30
    - https://lists.w3.org/Archives/Public/public-new-work/2024Jan/0001.html
  - Web & Networks Interest Group Charter
    - https://www.w3.org/2023/11/proposed-web-networks-charter.html
  - **JSX as markup language Community Group created**
    - https://lists.w3.org/Archives/Public/public-new-work/2024Jan/0003.html

#### Open/UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- 気になるのがあったときだけ

#### Other

- Hiring: Privacy Lead
  - https://www.w3.org/news/2024/hiring-privacy-lead/
  - Privacy Lead job posting
    - https://www.w3.org/careers/2024-privacy-lead-job-posting/
- **Seeking W3C community input for TAG appointees | 2023 | Blog | W3C**
  - https://www.w3.org/blog/2023/seeking-w3c-community-input-for-tag-appointees/
  - 新しい W3C Process では TAG の多様性を上げるため外部から人を招聘するルールが追加されたらしい
  - つよい人を募集中
- **Change of list purpose for public-new-work; creation of public-review-comments**
  - https://lists.w3.org/Archives/Public/public-new-work/2024Jan/0002.html
  - public-new-work はアナウンス用になった
  - レビューは public-review-comments に流れる
    - https://lists.w3.org/Archives/Public/public-review-comments/
- **selectlist feedback from apple · Issue #970 · openui/open-ui**
  - https://github.com/openui/open-ui/issues/970
  - Apple のフィードバックにより selectlist が stylable select element に変わった
  - `<select>` の中に `<button>` や `<datalist>` を入れられるようにする
- **w3c/breakouts-day-2024: Remote event for the W3C community to share new ideas**
  - https://github.com/w3c/breakouts-day-2024
  - 2024 年 3 月 12 日開催
- WC Face-to-Face: Y23Q1 - Google Docs
  - https://docs.google.com/document/d/1NRI_Ns8dw33LA21Fj2F21J-aTI-QbXW6jKWkiwsQA_Q/preview

### TC39 動向

#### Meeting

- 2023-11
  - https://github.com/tc39/agendas
  - https://github.com/tc39/notes
  - 11 月のミーティングノートがまだ公開されない

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2024-01-01}...main@{2024-02-01}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->3
- 3->4

#### New Proposals

#### Other

### WinterCG 動向

- Meeting や大きな動きがあった月だけやる

#### Meeting

- 2024-01-04 Meeting · Issue #60 · wintercg/admin
  - https://github.com/wintercg/admin/issues/60
  - 特になさそう

### IETF 動向

#### WG

- RFC
  - **[Ohai] RFC 9458 on Oblivious HTTP**
    - https://mailarchive.ietf.org/arch/msg/ohai/iZlxEqrYuS__roEq9nhGJbgszCY/
- Work
  - [httpapi] Idempotency Key - Are we ready for last call?
    - https://mailarchive.ietf.org/arch/msg/httpapi/jPlNZLC_0O4xilcYrsLhp9ygoz0/
  - [httpapi] I-D Action: draft-ietf-httpapi-rest-api-mediatypes-05.txt
    - https://mailarchive.ietf.org/arch/msg/httpapi/Y8QguGHJ0HojAeTfBkRJEwqkIhw/
  - [quic] I-D Action: draft-ietf-quic-qlog-h3-events-06.txt
    - https://mailarchive.ietf.org/arch/msg/quic/7T93Cr2_cBlmRvqkLgKf7NVGdFA/
  - [quic] I-D Action: draft-ietf-quic-reliable-stream-reset-04.txt
    - https://mailarchive.ietf.org/arch/msg/quic/GXnMtomv8lqzoMqeqvQSiz41PSg/
  - [quic] I-D Action: draft-ietf-quic-load-balancers-18.txt
    - https://mailarchive.ietf.org/arch/msg/quic/eImgeDALpbgHuqGxAvb-fjib6oI/
  - [TLS] I-D Action: draft-ietf-tls-8773bis-01.txt
    - https://mailarchive.ietf.org/arch/msg/tls/VyOsR6iNXX82xN6GfIfP1lH9Ayg/
- Meeting

#### Other

- **RFC 9518 - What Can Internet Standards Do About Centralisation?**
  - https://www.mnot.net/blog/2023/12/19/standards-and-centralization
- **Exploiting QUIC's Path Validation | Marten Seemann**
  - https://seemann.io/posts/2023-12-18-exploiting-quics-path-validation/
  - QUIC の脆弱性の話
  - 仕様のまま実装するとメモリが無限に使えてしまう

### CDN 動向

#### Cloudflare

- Cloudflare 2023 Year in Review
  - https://blog.cloudflare.com/radar-2023-year-in-review/
- Introducing Cloudflare's 2024 API security and management report
  - https://blog.cloudflare.com/2024-api-security-report/
- DDoS threat report for 2023 Q4
  - https://blog.cloudflare.com/ddos-threat-report-2023-q4/

#### Fastly

#### Other

- Weaponizing DHCP DNS Spoofing - A Hands-On Guide | Akamai
  - https://www.akamai.com/blog/security-research/2023/dec/weaponizing-dhcp-dns-spoofing-hands-on-guide
- A Retrospective on DDoS Trends in 2023 and Actionable Strategies for 2024 | Akamai
  - https://www.akamai.com/blog/security/2024/jan/a-retrospective-on-ddos-trends-in-2023
- HTTPS DNS records are now supported in Vercel DNS - Vercel
  - https://vercel.com/changelog/https-dns-records-are-now-supported-in-vercel-dns

### セキュリティ動向

- A hard look at Certificate Transparency: CT in Reality
  - https://educatedguesswork.org/posts/transparency-part-2/
- **パスキーの基本とそれにまつわる誤解を解きほぐす**
  - https://blog.agektmr.com/2023/12/passkey-mythbusting
- The Last Mile of Encrypting the Web: 2023 Year in Review | Electronic Frontier Foundation
  - https://www.eff.org/deeplinks/2023/12/year-review-last-mile-encrypting-web
- Our role in supporting the nonprofit ecosystem - Let's Encrypt
  - https://letsencrypt.org/2023/12/13/ngos.html
- Terrapin Attack
  - https://terrapin-attack.com/
- **2023.12.11 【お知らせ】[お名前.com]「ネット de 診断」自動診断の提供開始のお知らせ|お知らせ|ドメイン取るならお名前.com**
  - https://www.onamae.com/news/domain/20231211_3/
- 2023.12.22 【お知らせ】[お名前.com] 「ネット de 診断」自動診断のご提供について|お知らせ|ドメイン取るならお名前.com
  - https://www.onamae.com/news/domain/20231222_1/
  - > 「自動診断」についてのご案内開始以降、お客様から多くのご意見・ご要望を頂戴し、ご提供にあたり本サービスの改善が必要と判断し、機能等のアップデートの実施後、診断開始のご案内を行うことといたしました。
- Warning As 1Password, DashLane, LastPass And 3 Others Leak Passwords
  - https://www-forbes-com.cdn.ampproject.org/c/s/www.forbes.com/sites/daveywinder/2023/12/11/android-warning-1password-dashlane-lastpass-and-others-can-leak-passwords/amp/
  - Android のパスワード自動入力機能の脆弱性
- A quick look inside the HSTS file - Terence Eden's Blog
  - https://shkspr.mobi/blog/2024/01/a-quick-look-inside-the-hsts-file/
  - HSTS の preload list の解析

### Cookie 動向

2024 年新設

- Third-party cookies restricted by default for 1% of Chrome users | Privacy Sandbox | Google for Developers
  - https://developers.google.com/privacy-sandbox/blog/cookie-countdown-2024jan
- Issues · GoogleChromeLabs/privacy-sandbox-dev-support
  - https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support/issues?q=is%3Aissue+is%3Aopen+label%3Athird-party-cookie-deprecation
- componentid:1306484 - Issue Tracker
  - https://issuetracker.google.com/issues?q=componentid:1306484
- グーグルのクッキー廃止、業界は対応追い付かず - WSJ
  - https://jp.wsj.com/articles/google-is-finally-killing-cookies-advertisers-still-arent-ready-1c2dd6ce
- サードパーティークッキー廃止に向けて--2024 年にマーケターが知るべきこと - ZDNET Japan
  - https://japan.zdnet.com/article/35212980/
- Trial for Third Party Cookie Deprecation for Top Level Sites
  - https://developer.chrome.com/origintrials/#/view_trial/4360047389248061441
  - 3rd Party Cookie の修正猶予を得る Deprecation Trials
- **「Cookie 等の利用に関するガイドライン」改訂のご案内|ニコニコインフォ**
  - https://blog.nicovideo.jp/niconews/210274.html
  - Cookie からハッシュベースのトラッキングに移行
  - 特に Banner は出してなさそう?
- **Google shares update on next step toward phasing out third-party cookies in Chrome**
  - https://blog.google/products/chrome/privacy-sandbox-tracking-protection/
  - 3PCD ロールアウトスタート
  - ブロックされたページでは Omnibox にアイコンが表示され、一時的に解除できる

### 周辺動向

- Vulkan Video Extensions for H.264 and H.265 Encoding Published | Igalia
  - https://www.igalia.com/2023/12/20/Vulkan-Video-Extensions-for-H.264-and-H.265-Encoding-Published.html
- Igalia at CES ® 2024 | Igalia
  - https://www.igalia.com/2024/01/03/Igalia-at-CES(r)-2024.html
- Lazy is the new fast: How Lazy Imports and Cinder accelerate machine learning at Meta - Engineering at Meta
  - https://engineering.fb.com/2024/01/18/developer-tools/lazy-imports-cinder-machine-learning-meta/
- Why Are Tech Reporters Sleeping On The Biggest App Store Story? - Infrequently Noted
  - https://infrequently.org/2024/01/the-web-is-the-app-store/
- **政府 巨大 IT 企業を規制する新たな法律を制定する方向で検討 | NHK | IT ・ネット**
  - https://www3-nhk-or-jp.cdn.ampproject.org/c/s/www3.nhk.or.jp/news/html/20240117/amp/k10014323591000.html
  - > アップルやグーグルといった巨大 IT 企業は、スマートフォンの基本ソフトの分野で寡占状態にあるなど、優越的な地位にあり、新規参入の妨げや利用する事業者のコスト上昇を懸念する声も出ています。
  - >
  - > こうしたことから、政府は巨大 IT 企業を規制する新たな法律を制定する方向で検討していることが関係者への取材でわかりました。
  - >
  - > 具体的には独占禁止法と同様に、公正取引委員会が所管し、主な規制対象は、
  - > ▽アプリストアや決済
  - > ▽検索
  - > ▽ブラウザー
  - > ▽基本ソフト
  - > の分野になるということです。
- **Brave browser simplifies its fingerprinting protections | Brave**
  - https://brave.com/privacy-updates/28-sunsetting-strict-fingerprinting-mode/
  - Brave が Strict のフィンガープリンティング防止モードを削除する
  - サイトがうまく動かないことがあり、またユーザーも少なくモードの存在自体がフィンガープリンティングのベクターになりうることから
- The New York Times now has a web Flash player - eagereyes.org
  - https://eagereyes.org/blog/2024/nytimes-web-flash-player
  - 古い記事で使われていた Flash コンテンツの再生用に Web ベースのランタイムを使い始めたらしい
- **カンファレンスイベントで会場回線を過信してはいけない - notoken の覚書**
  - https://notoken.hatenadiary.com/entry/2023/12/06/233552
  - > QUIC とは、本来 TCP で通信を行うべき HTTPS の通信をお気持ち実装の UDP で通すトンデモ通信規格 である。
- **Free Wi-Fi(00000JAPAN)は安全なのか? #初心者 - Qiita**
  - https://qiita.com/ngkwtys/items/3756edcd690d5b6221cb
- BFCache を利用して Next.js で実装した無限スクロールの UX 改善をした話 | PR TIMES 開発者ブログ
  - https://developers.prtimes.jp/2023/12/15/enhancing-ux-with-bfcache-in-infinite-scrolling-implemented-with-nextjs/
- JPEG XL Image Codec - Samsung Members
  - https://r2.community.samsung.com/t5/CamCyclopedia/JPEG-XL-Image-Codec/ba-p/15356525
  - Galaxy S24 で JPEG XL の撮影に対応するらしい
- Google で 18 年間勤務した元社員が「Google の文化は変わってしまった」と嘆く長文を投稿して話題に - GIGAZINE
  - https://gigazine.net/news/20240122-gooele-changed/

### イベント

- 1 月
  - 22: Web 技術年末試験 2023 - connpass
    - https://web-study.connpass.com/event/308040/
- 2 月
- 3 月
  - 12: W3C Breakouts Day 2024
    - https://github.com/w3c/breakouts-day-2024
    - 2024 年 3 月 12 日開催
  - 19-22: IETF | IETF 119 Brisbane
    - https://www.ietf.org/how/meetings/119/
- 4 月

### Wrap Up

- Chrome
  - 121
    - CSS Hightlight Inheritance
    - CSS scrollbars
    - CSS masking (unprefixed)
    - BFCache NotRestoredReason
    - Storage Buckets API
    - X25519Kyber768
  - Ship
    - CSS field-sizing property
    - 3PC deprecation exemption heuristics
    - CSS ::backdrop inheritance
    - Import Attributes `with` syntax
    - allow display: contents to be focusable
  - Prototype
    - Confirmation of Action API → aria-notify
    - Locked Mode API
  - Deprecate and Remove
    - SMIL → deprecate されません
  - PSA
    - fix Expires: 0 handling
    - CSS align-content for blocks
  - web.dev
    - Baseline
    - good sign-out experience
    - Discoverable credentials deep dive
  - Chrome Developers
    - revisiting installablity criteria
    - Desktop UA on premium Android tablets
  - other
    - Rick Byers on Extensible Web Manifesto
    - github/explainers-by-googlers
    - update on DMA
- Firefox
  - 122
    - Passkeys (iCloud Keychain)
    - hr in select
    - LCP API
  - Ship
    - Declarative Shadow DOM
    - AbortSignal.any
  - MDN Blog
    - Baseline
    - 3PCD
    - update Cookie docs
  - Standard Position
    - Web Serial → neutral (addon gated)
  - other
    - Platform Tilt
    - Promise.withResolvers() used in DevTools
    - Servo in 2023
    - What's next for Mozilla
- Safari
  - TP 184
    - AbortSignal.any()
    - element.checkVisibility()
  - Safari 17.2
    - Exclusive accordions
    - Relaxed Nesting
    - Import attributes
    - Fetch priority
    - Fixed for Interop 2023
  - TP 185
    - align-content on block container
    - scroll anchoring with overflow-anchor
    - @scope
    - Sanitizer API
  - TP 186
  - Safari 17.3
  - blog
  - Standard Position
    - Support CSS transition-behavior property
  - other
    - Nicole Sullivan が Apple に
- Edge
  - Looking back 2023
  - all-new Edge DevTools UI
- W3C/WHATWG
  - Draft
    - WAI-ARIA 1.3 FPWD
    - JSX as markup langage CG created
  - Open/UI
  - Other
    - TAG を外部から招聘する appointees
    - public-new-work がアナウンス専用に
    - レビューは public-review-comments
    - selectlist が stylable select element に
    - breakout-day-2024 開催告知
- TC39
- WinterCG
- IETF
  - OHTTP RFC
  - What Can Internet Standards Do About Centralisation RFC
- CDN 動向
- セキュリティ動向
  - パスキーの基本と FAQ
  - お名前.com ネット de 診断自動提供炎上
- Cookie 動向
  - Breakage の Issue が 150 くらい
  - ニコ動の Cookie ガイドライン改訂
- 周辺動向
  - 政府 巨大 IT 企業を規制する新たな法律を制定する方向で検討 | NHK
  - Brave が Strict の Fingerprinting 防止モードを削除
  - カンファレンスイベントで会場回線を過信してはいけない
  - 00000JAPAN は安全なのか?
