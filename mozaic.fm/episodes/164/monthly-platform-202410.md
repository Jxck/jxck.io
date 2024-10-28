---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep164.mp3
published_at: 2024-10-29
guest: [@myakura](https://twitter.com/myakura)
---

# ep164 Monthly Platform 202410

## Theme

第 164 回のテーマは 2024 年 10 月の Monthly Platform です。


## Show Note

### Chrome 動向

#### Stable: 130


#### Updates

- New in Chrome 130
  - https://developer.chrome.com/blog/new-in-chrome-130
  - Document Picture-in-Picture
  - CSS nested declarations
  - box-decoration-break
- What's new in DevTools, Chrome 130
  - https://developer.chrome.com/blog/new-in-devtools-130
- **Chrome 131 beta**
  - https://developer.chrome.com/blog/chrome-131-beta
  - CSS
    - CSS Anchor Positioning: anchor-scope
    - ​CSS font-variant-emoji
    - CSS highlight inheritance
    - Improvements to styling structure of `<details>` and `<summary>` elements
    - @page margin boxes
    - @property support `<string>` syntax
    - Support currentcolor in relative color syntax
    - Support external SVG resources for clip-path, fill, stroke, and marker-\* properties
  - Web APIs
    - Direct Sockets API (Isolated Web Apps)
    - Exempt Speculation-Rules header from CSP restrictions
    - FedCM as a trust signal for the Storage Access API
    - COOP value `noopener-allow-popups`
    - Private Aggregation API: increase contribution limit to 100 for Protected Audience callers
    - Select parser relaxation
    - WebGPU: Clip distances
    - WebGPU: GPUCanvasContext `getConfiguration()`
    - WebHID on dedicated workers
    - WebRTC RTCRtpEncodingParameters.scaleResolutionDownTo
  - New origin trials
    - Playout statistics for WebAudio
    - Summarizer API
  - Deprecations and removals
    - Remove the CSS Anchor Positioning property inset-area
    - Remove the ability to disable BeforeunloadEventCancelByPreventDefault
    - Remove non-standard GPUAdapter `requestAdapterInfo()` method
- What's New in WebGPU (Chrome 130)
  - https://developer.chrome.com/blog/new-in-webgpu-130


#### Intents

- **Ship: Device Posture API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Xbhdn0u6Z9A
  - Foldable などをフックする mediaquery
- Ship: Disallow spaces in non-file:// URL hosts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/l3vqRy161Rs
- **Ship: Explicit Compile Hints with Magic Comments**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uNUWZ14SYJI
  - `//# eagerCompilation=all`
  - など書いてコンパイル最適化
- **Ship: FedCM as a trust signal for the Storage Access API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jebGC3CE3CM
- **Ship: Fetch: `Request.bytes()` and `Response.bytes()`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nuDazjj_eaM
- **Ship: Improvements to styling structure of `<details>` and `<summary>` elements**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UCOPneyEk-I
- Ship: Protected Audience Bidding & Auction Services
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CyXJz3xOEcc
- Ship: Support external SVG resources for 'clip-path', 'fill', 'stroke' and 'marker-\*' properties
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hEXoar4T888
- Ship: WebGPU: GPUCanvasContext getConfiguration()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9DV5wt-GLhE
- Ship: Exempt Speculation-Rules Header from CSP restrictions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5tRvEbps5JU
- **Ship: CSS Anchor Positioning: allow anchor-size() in inset and margin Properties**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jOFmnMHfTUs
- **Ship: CSS caret-animation property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OcliQ_XqUOI
- **Ship: Dialog Toggle Events**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PxluqSXWXD4
- Ship: Protected Audience: Selectable Reporting IDs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1cWqBPHngd0
- **Ship: Select parser relaxation**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5_9-Qkvlj2M
- Ship: WebGPU: Texture view usage
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-pKliCSI_0I
- ship: WebGPU: 32-bit float textures blending
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Lr5iL7qDlkU
- Ship: Ignore Strict-Transport-Security for localhost
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WJnjKYY2iSs
- **Ship: Sideways writing modes**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vJ5F2Di0v-k
  - 縦書き中に出てくる横書き文字を右 90 度か左 90 度どっちに傾けるか
- Ship: Support creating ClipboardItem with `Promise<DOMString>`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/w5kAP-CUyIU
- Implement and Ship: `PushMessageData::bytes()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SCWQ0Tm2CFw
- Prototype: :has-slotted pseudo selector.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kt97lRohAFk
- Prototype: :local-link pseudo selector.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/z2Y7O5ZCxgc
- Prototype: Auto-generated view transition names
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lz4YqLnvCUI
- **Prototype: Progress Notification API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/838MAAGCbuc
- Prototype: Expose coarsened cross-origin renderTime in elment timing/LCP (regardless of TAO)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Wzdkg4S3BCU
- Prototype: SelectAudioOutput API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/u3btAIOwhsQ
- **Prototype: Allow SameSite=None Cookies in First-Party Sandboxed Contexts**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PfTbJ2Qi1Jk
- Prototype: AudioContext Interrupted State
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GgSvU1BZZRU
- **Experiment: Storage Access Headers**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/99MNp6gMDUk
  - `Sec-Fetch-Storage-Access`
- Experiment: Summarizer API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/X-VxVeiJgtM
- Experiment: Playout Statistics API for WebAudio
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1OsaHjv2JsI
- Experiment: Translator API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/veAPJipOEy8
- Extend Experiment: Cookie Deprecation Label
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0_dR-ffA2LA
- Extend Experiment: FedCM Button Mode API and Use Other Account API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/q6o8Ic7gbTo
- Extend Experiment: WebGPU Subgroups experimentation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/c0M_cZZk1XA
- Extend Experiment: JavaScript Promise Integration
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EooQhjpwK-U
- Extend Reverse Origin Trial: Trial for SharedArrayBuffers in non-isolated pages on Desktop platforms
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/A4CR6MIVzds
- Change:
- Unship:
- Remove:
- Ready for Developer Testing: Freezing on Energy Saver
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Xu1C7WhoGm4
- Ready for Developer Testing: WebGPU: Texture view usage
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OnIh-mzFfQI
- Web-Facing Change PSA: Document picture-in-picture: copy document mode
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IR7qdNj4Zyw
- Web-Facing Change PSA: Relax `<select>` parser
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kvv5hLyjtEc
- Web-Facing Change PSA: Fix Selection isCollapsed in Shadow DOM
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/a4luSiYQ2zs
- Web-Facing Change PSA: Attribution Reporting API remove aggregation key identifier size limit for trigger registrations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HJ8XA6pP6pA
- PSA: Web Bluetooth and WebUSB changing detached buffer handling
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/J-TLOuPPujQ
- Proposal: Ignore Strict-Transport-Security headers for Localhost responses
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gGHOmFGEzQ0


#### Other

- web.dev
  - Benchmarking the performance of CSS @property
    - https://web.dev/blog/at-property-performance
  - New to the web platform in September
    - https://web.dev/blog/web-platform-09-2024
  - CSS nesting improves with CSSNestedDeclarations
    - https://web.dev/blog/css-nesting-cssnesteddeclarations
  - **Show Baseline status on your blog posts and presentations**
    - [https://web.dev/blog/show-baseline-status](https://web.dev/blog/show-baseline-status?hl=en)
- google for developers
  - **Chrome on Android to support third-party autofill services natively - Google Developers Blog**
    - https://developers.googleblog.com/en/chrome-3p-autofill-services/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - https://developer.chrome.com/blog/
  - 5 Cool Things To Do with DevTools AI Assistance
    - https://developer.chrome.com/blog/5-cool-things-to-do-with-ai-assistance
  - **Inheritance changes for CSS selection styling**
    - https://developer.chrome.com/blog/selection-styling
  - Private Network Access on hold
    - https://developer.chrome.com/blog/pna-on-hold
  - **The box-decoration-break property in Chrome 130**
    - https://developer.chrome.com/blog/box-decoration-break
  - Translation API available for early preview
    - https://developer.chrome.com/blog/translation-api-available-for-early-preview
  - What's happening in Chrome Extensions, October 2024
    - https://developer.chrome.com/blog/extension-news-october-2024
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
- Other
  - CrUX Vis
    - https://cruxvis.withgoogle.com/#/
    - CrUX のデータを可視化して Vital などを表示するサイト
    - インターンが作ったらしい
  - Google Chrome Built-in AI Challenge
    - https://googlechromeai.devpost.com/
    - Develop a web application or Chrome Extension that uses one or more Chrome built-in AI APIs to interact with integrated models such as Gemini Nano. - Devpost


### Firefox 動向

#### Stable: 131.0.3


#### Updates

- Firefox 131.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/131.0/releasenotes/
- **Firefox 131 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/131
  - position-area
  - Iterator Helpers
  - CHIPS
  - Text fragments
- Search Improvements Are On Their Way - These Weeks in Firefox: Issue 169 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2024/10/09/search-improvements-are-on-their-way-these-weeks-in-firefox-issue-169/


#### Intents

- **Ship: Uint8Array to/from base64 and hex**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/cnY_Tu0tFos
- **Ship: Dialog Toggle Events**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/I1pLMEAcFXA
- **Ship Fetch Keepalive**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/IN7wT_r1jJI
- **Prototype: :has-slotted pseudo**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/s9kgSMrbo0U
- **Prototype: :local-link pseudo**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/mQNT-5RxHVM
- Prototype: contenteditable=plaintext-only
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Fv6E15vuAGY
- Change:
- Remove:


#### Newsletter

- Engineering Effectiveness Newsletter (August & September 2024 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/n2bRJpVKtH4
- Firefox WebDriver Newsletter 131 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-131/
- Firefox DevTools Newsletter - 131 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-131/
- **75x faster: optimizing the Ion compiler backend**
  - https://spidermonkey.dev/blog/2024/10/16/75x-faster-optimizing-the-ion-compiler-backend.html
  - Spidermonkey の性能改善


#### MDN / Open Web Docs

- Fixing your website's JavaScript performance | MDN Blog
  - https://developer.mozilla.org/en-US/blog/fix-javascript-performance/
- Introducing the new MDN Community page | MDN Blog
  - https://developer.mozilla.org/en-US/blog/new-community-page/
- **Security documentation at TPAC 2024**
  - https://openwebdocs.org/content/posts/swag-at-tpac-anaheim/


#### Standard Position

- 今月 Close された Issue と PR ものをみる
  - [https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2024-10-01+](https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2024-07-01+)
- Positive
  - CSS Layout API
    - https://github.com/mozilla/standards-positions/issues/1088
  - CSS Painting API
    - https://github.com/mozilla/standards-positions/issues/1089
  - CSS Properties and Values API
    - https://github.com/mozilla/standards-positions/issues/1090
  - CSS Typed OM
    - https://github.com/mozilla/standards-positions/issues/1091
  - CSS Values 5: random()
    - https://github.com/mozilla/standards-positions/issues/809
  - Custom elements
    - https://github.com/mozilla/standards-positions/issues/1092
  - Dialog BeforeToggle/Toggle events
    - https://github.com/mozilla/standards-positions/issues/1101
  - FedCM as a trust signal for the Storage Access API
    - https://github.com/mozilla/standards-positions/issues/1065
  - Programatically disabling hardware encoding/decoding in WebRTC
    - https://github.com/mozilla/standards-positions/issues/728
  - Scripting media feature
    - https://github.com/mozilla/standards-positions/issues/765
  - Selection API: getComposedRanges
    - https://github.com/mozilla/standards-positions/issues/1055
  - Shadow trees (formerly known as Shadow DOM)
    - https://github.com/mozilla/standards-positions/issues/1094
  - Submitting element directionality via the dirname attribute
    - https://github.com/mozilla/standards-positions/issues/782
  - Worklets
    - https://github.com/mozilla/standards-positions/issues/1097
  - contain-intrinsic-size auto & longhands
    - https://github.com/mozilla/standards-positions/issues/512
  - popover=hint
    - https://github.com/mozilla/standards-positions/issues/965
  - template element
    - https://github.com/mozilla/standards-positions/issues/1098
- Negative
  - HTML Imports · Issue #1093 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/1093
  - Protected Audience API · Issue #770 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/770
- Defer
  - Local Peer-to-Peer API
    - https://github.com/mozilla/standards-positions/issues/1029
  - PWAs as URL Handlers
    - https://github.com/mozilla/standards-positions/issues/550
  - The `model` element
    - https://github.com/mozilla/standards-positions/issues/674
  - URL Protocol Handler Registration for web apps
    - https://github.com/mozilla/standards-positions/issues/340
  - Window Controls Overlay
    - https://github.com/mozilla/standards-positions/issues/529


#### Other

- Behind the Scenes: Fixing an In-the-Wild Firefox Exploit - Mozilla Security Blog
  - https://blog.mozilla.org/security/2024/10/11/behind-the-scenes-fixing-an-in-the-wild-firefox-exploit/
- A free and open internet shouldn't come at the expense of privacy
  - https://blog.mozilla.org/en/mozilla/digital-advertising-privacy/
- Improving online advertising through product and infrastructure
  - https://blog.mozilla.org/en/mozilla/improving-online-advertising/
- Privacy-preserving digital ads infrastructure: An overview of Anonym's technology
  - https://blog.mozilla.org/en/products/anonym-technology-overview/


### Safari 動向

#### Stable: 18.0.1


#### Updates

- Release Notes for Safari Technology Preview 204 | WebKit
  - https://webkit.org/blog/15978/release-notes-for-safari-technology-preview-204/
  - Accessibility
  - CSS
    - **Added support for cross-document view-transitions.**
    - **Added preview support for line-clamp.**
  - Forms
  - JavaScript
    - Removed obsoleted methods for Temporal.PlainTime and Temporal.PlainDateTime to align with specification changes.
  - Service Workers
  - Web API
  - Web Driver
    - Added support for icon_variants in Web Extensions.
  - Web Extensions
  - Web Inspector
- Release Notes for Safari Technology Preview 205 | WebKit
  - https://webkit.org/blog/15999/release-notes-for-safari-technology-preview-205/
  - HTML
  - JavaScript
    - Added support for Math.sumPrecise.
    - Added support for Iterator.prototype.reduce.
  - Lockdown Mode
    - Enabled Lockdown Mode Safe Fonts to try parsing web fonts with a safe font parser in Lockdown Mode. While the safe parser is enabled the list of allowed fonts won't be used. (283951@main) (125621507)
  - SVG
  - Tables
  - Text
  - Web API
  - Web Driver
  - Web Extensions
  - WebAssembly
    - Added support for the new Wasm Exception Specification. (283954@main) (131409318)
- Release Notes for Safari Technology Preview 206 | WebKit
  - https://webkit.org/blog/16186/release-notes-for-safari-technology-preview-206/
  - CSS
  - Editing
    - Implemented ClipboardItem.support()
  - JavaScript
    - Completed the Iterator Helpers proposal
  - Media
    - Added support for the Image Capture API.
  - Rendering
  - SVG
  - Tables
  - Web Extensions
    - Added support for getKeys() in storage areas.
    - Added support for i18n.getSystemUILanguage and i18n.getPreferredSystemLanguages.
  - WebDriver
  - WebRTC
    - Added support for enumerated visible network interfaces.
- **Safari 18.0.1 Release Notes | Apple Developer Documentation**
  - https://developer.apple.com/documentation/safari-release-notes/safari-18_0_1-release-notes
  - Fixed `SameSite` default behavior. だがバグリンクなし


#### Standard Positions

- 今月 Close されたものをみる
  - [https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2024-10-01+](https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2024-06-01+)
  - Support
    - Generate CSS `view-transition-name` from element
      - https://github.com/WebKit/standards-positions/issues/408
    - CSS Scoping :has-slotted pseudo
      - https://github.com/WebKit/standards-positions/issues/404


#### Other

- Help us choose the final syntax for Masonry in CSS | WebKit
  - https://webkit.org/blog/16026/css-masonry-syntax/
  - Webkit としては grid の拡張にしたい
  - `display: masonry` ならコード量は減るように見えるが、それだけで使うことはあまりなさそう
  - フィードバック求
    - https://github.com/w3c/csswg-drafts/issues/11060


### Edge 動向

#### Stable: 130


#### Updates

- https://blogs.windows.com/msedgedev/
  - ここがメイン
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見れる
- https://twitter.com/MSEdgeDev
  - これを見るしか無い


#### Other

- Enhancing the security of Microsoft Edge extensions with the new Publish API - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2024/09/30/enhanced-security-for-extensions-with-new-publish-api/
- **Limited Preview of Privacy-Preserving Ads API coming to Microsoft Edge - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2024/10/08/ad-selection-api-limited-preview/
- Attack Techniques: Encrypted Archives - text/plain
  - https://textslashplain.com/2024/10/02/attack-techniques-encrypted-archives/
- Content-Blocking in Manifest v3 - text/plain
  - https://textslashplain.com/2024/10/13/content-blocking-in-manifest-v3/
- Browser Security Bugs that Aren't - #2: Web Attacks | Microsoft Browser Vulnerability Research
  - https://microsoftedge.github.io/edgevr/posts/Browser-Security-Bugs-that-Aren-t-part-2/
- Defensive Technology: Antimalware Scan Interface (AMSI) - text/plain
  - https://textslashplain.com/2024/10/25/defensive-technology-antimalware-scan-interface-amsi/
- Passkeys on Windows: Authenticate seamlessly with passkey providers - Windows Developer Blog
  - https://blogs.windows.com/windowsdeveloper/2024/10/08/passkeys-on-windows-authenticate-seamlessly-with-passkey-providers/
- **How Microsoft Edge Is Replacing React With Web Components - The New Stack**
  - https://thenewstack.io/how-microsoft-edge-is-replacing-react-with-web-components/


### WHATWG/W3C 動向

#### TPAC2024

- WebPerf
  - https://docs.google.com/document/d/1wL8Re4atVHVpfKTxhFfh8TNkkK4VCBbVJ-U70q5PWjo
- WebAppSec
  - https://github.com/w3c/webappsec/blob/main/meetings/2024/2024-09-23-TPAC-Minutes.md
  - https://github.com/w3c/webappsec/blob/main/meetings/2024/2024-09-26-TPAC-minutes.md
    - 11:45 - 12:20: Cookies
      - (~10m) sandbox="allow-same-site-none-cookies" (https://github.com/explainers-by-googlers/csp-sandbox-allow-same-site-none-cookies) (@aamuley)
      - (~5m) NOTE for [standardizing cross-site cookie semantics](https://dcthetall.github.io/webappsec-standardizing-security-semantics-of-cross-site-cookies/) (@dcthetall)
      - (~10m) [Cookie Layering](https://github.com/httpwg/http-extensions/issues/2084) / [RFC6265ter](https://johannhof.github.io/draft-annevk-johannhof-httpbis-cookies/draft-annevk-johannhof-httpbis-cookies.html) (@johannhof, @annevk)
      - (~10m) [CHIPS](https://github.com/privacycg/CHIPS) (@johnwilander, @dcthetall)
- Web App
  - https://docs.google.com/document/d/1EtEFfQ3sJ6lECF3ojmbLKIH7iKN4RdGrapVosQB-wqI
  - https://github.com/w3c/webappswg/wiki/TPAC-2024#-monday-23-september-2024
- WHATUP
  - https://github.com/whatwg/meta/issues/326
  - customizable `<select>`
  - Tooltips, Hovercards, and Menus
  - [Rich Inputs explainer openui/open-ui#1090](https://github.com/openui/open-ui/pull/1090)
- PING
  - https://docs.google.com/document/d/1qKADVLZd8wxep0NWxHVmMXoJipdKn4ACxcJbNBBLF7g
  - https://github.com/w3cping/administrivia/issues/49#issuecomment-2359279913
- CSSWG
  - https://github.com/orgs/w3c/projects/122/views/1?layout=board


#### Draft

- Recommendation
- Proposed Recommendation
  - Last Call for Review of Proposed Amendments: WebRTC: Real-Time Communication in Browsers
    - https://www.w3.org/news/2024/last-call-for-review-of-proposed-amendments-webrtc-real-time-communication-in-browsers/
- Candidate Recommendation
- Working Draft
- First Public Working Draft


#### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- 2024-10-03
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-10-03.md
  - [select] rendering elements which don't fit the content model #1099
  - Does `<select multiple>` need a button and popup by default? #1102
  - [switch]: Does the "on" position change between rtl and ltr? #1098
- 2024-10-10
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-10-10.md
  - [Deferred indefinitely] Link delegation to descendant #1104
  - [switch]: Does the "on" position change between rtl and ltr? #1098
- 2024-10-24
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-10-24.md
  - selectlist: Should `<selectedoption>` respond to mutations in the selected `<option>` #825
  - The utility of the popover=hint feature #1114


#### WHATNOT

- https://github.com/whatwg/html/issues?q=is%3Aissue+is%3Aopen+WHATNOT+meeting
- 2024-10-03
  - https://github.com/whatwg/html/issues/10652
- 2024-10-10
  - https://github.com/whatwg/html/issues/10666
  - [Joey] [Customizable `<select>` element](https://github.com/whatwg/html/issues/9799)
    - Anne and Olli feel that the timing issues are not sufficiently resolved for moving to stage 3. Joey will reply to the timing questions on the PR. Dominic and Anne will review the PRs.
  - [Anne] [Enhance `<input type=color>` with alpha and colorspace=display-p3](https://github.com/whatwg/html/pull/10456)
    - WebKit & Blink are now in support. No opposition from Gecko.
  - [Guy] [HTML Integration with ESM Source Phase](https://github.com/whatwg/html/issues/10617)
    - Guy's [slide deck](https://docs.google.com/presentation/d/1oeHnhGsVfc_b9XJ3aMi5M2lR6wSopMXl8FI-xPSZ87I/edit#slide=id.g305421a9f36_0_11). No opposition to the proposal from any of the participants.
  - [Khushal] [Canvas Place Element](https://github.com/whatwg/html/issues/10650)
    - WebKit and Gecko are OK with stage 1. Khushal will incorporate the feedback to the explainer.
  - [Keith] [Consider throwing for showModal() and showPopover() in non-fully-active documents](https://github.com/whatwg/html/issues/10659)
    - Briefly discussed, it looks good to everyone.
  - [Emilio] [[images] Lazy loading and out of band loads](https://github.com/whatwg/html/issues/10671)
    - Carry over.
  - [Dom] [Atomic move operation for element reparenting & reordering](https://github.com/whatwg/dom/issues/1255)
    - Dom will follow up with Noam and loop in ARIA folks.
  - [Anne] [Prevent currentScript from being overridden on document via name=''](https://github.com/whatwg/html/issues/10687)
    - Consensus in the room is that we are open to this.
- 2024-10-17
  - https://github.com/whatwg/html/issues/10692
  - [Kurt] [Declarative CSS Modules and Declarative Shadow DOM adoptedstylesheets attribute](https://github.com/whatwg/html/issues/10673)
    - Consensus to move to stage 1; Kurt to start working on filing issues and drafting incubation.
  - [Dan] [Reference Target](https://github.com/whatwg/html/issues/10707)
    - Consensus to move to stage 1, for phase 1 and phase 2; phase 1 might be nearing stage 2, but concern that some amount of phase 2 needs to be understood first.
- Upcoming WHATNOT meeting on 2024-10-24 · Issue #10709 · whatwg/html
  - https://github.com/whatwg/html/issues/10709
  - New topics
    - [Di] [tabindex vs reading-flow property](https://github.com/whatwg/html/issues/10642)
      - Di will add an example with a shadowdom and update the spec as well. Anne and Olli will look at the open standards positions for WebKit and Gecko respectively.
    - [Domenic] [Add expect-no-linked-resources Document-Policy to Speculative parsing](https://github.com/whatwg/html/pull/10718)
      - Olli will discuss this with Henri. Mason will ask Alex to come to a future meeting to give us more context.
    - [Keith] [Add an event for when a user attempts to submit](https://github.com/whatwg/html/issues/10694)
      - Noam suggested an interesting direction in the issue.


#### Other

- WCAG2ICT Published as W3C Group Note
  - https://www.w3.org/news/2024/wcag2ict-published-as-w3c-group-note/
- How should `<selectedoption>` work? - JakeArchibald.com
  - https://jakearchibald.com/2024/how-should-selectedoption-work/
  - `<selectedoption>` の仕様についてフィードバック募集
  - `<option>`変更されると `<selectedoption>` にクローンが表示される
  - そういう挙動は今までの DOM にはなかった
  - `cloneNode(true)` 相当だが、リスナやどは含まれないし、 `<canvas>` は空になるし、 `<iframe>` はリロードになる。
  - `<selectedoption>` 側の変更は `<option>` には反映されない
  - どうするのがいいか?
  - Option1
    - Nothing by default, but provide a way to trigger an update
  - Option2
    - Automatically reset the content when anything in the selected `<option>` changes
  - Option3
    - Automatically reset the content when anything in the selected `<option>` changes… debounced
  - Option4
    - Perform targeted DOM changes when something in the selected `<option>` changes
  - https://github.com/whatwg/html/issues/10520
  - **Option 1 になった**
- CSS masonry will take time, and that's just fine | Sean Voisen
  - https://sean.voisen.org/blog/figuring-out-css-masonry-takes-time


### TC39 動向

#### Meeting

- Meeting Note が公開された時だけやる、それ以外はやらない。
- 2024-01
  - https://github.com/tc39/agendas
  - https://github.com/tc39/notes


#### Proposals Diff

- [https://github.com/tc39/proposals/compare/main@{2024-01-01}...main@{2024-02-01}](https://github.com/tc39/proposals/compare/main@{2023-01-01}...main@{2023-02-01})
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->2.7
- 2.7->3
- 3->4


#### New Proposals


#### WinterCG

- 2024-10-17 meeting · Issue #76 · wintercg/admin
  - https://github.com/wintercg/admin/issues/76
  - Cancel


#### Other

- Language Evolution
  - https://docs.google.com/presentation/d/1ylROTu3N6MyHzNzWJXQAc7Bo1O0FHO3lNKfQMfPOA4o/edit
- Dan's feedback on JSSugar
  - https://gist.github.com/littledan/a590784a72f2e1b8cc633ff5ff8a9dc2


### IETF 動向

#### WG

- RFC 9651 on Structured Field Values for HTTP
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JulSep/0316.html
  - Structured Field Values の更新版が出た
  - Date 型と UTF8 型の追加
  - ABNF が Appendix になった
- Work
  - [TLS] Last Call: (The Transport Layer Security (TLS) Protocol Version 1.3) to Proposed Standard
    - https://mailarchive.ietf.org/arch/msg/tls/1HrifAiGTGukyRkQO_kaaaEH4kU/
  - [TLS] Last Call: (Bootstrapping TLS Encrypted ClientHello with DNS Service Bindings) to Proposed Standard
    - https://mailarchive.ietf.org/arch/msg/tls/7fT-Blhu25qCZ8XjntboSNfBCNk/
  - draft-ietf-lamps-rfc6712bis-07 - Internet X.509 Public Key Infrastructure -- HTTP Transfer for the Certificate Management Protocol (CMP)
    - https://datatracker.ietf.org/doc/draft-ietf-lamps-rfc6712bis/
  - Working Group Last Call: draft-ietf-httpbis-cache-groups-02 from Tommy Pauly on 2024-10-18 (ietf-http-wg@w3.org from October to December 2024)
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024OctDec/0065.html
- Meeting


#### Other


### CDN 動向

#### Cloudflare


#### Fastly


#### Other


### セキュリティ動向


### 周辺動向

- Announcing BCD Watch - Eric's Archived Thoughts
  - https://meyerweb.com/eric/thoughts/2024/09/23/announcing-bcd-watch/
- **Web の同意を考えようプロジェクト|さよなら、ダークパターン。**
  - https://www.non-deceptivedesign.jp/
  - https://prtimes.jp/main/html/rd/p/000000001.000150490.html
  - IIJ が主導し「非ダ―クパターン Web サイト(Non-Deceptive Design Accreditation)」制度を運用する一般社団法人ダークパターン対策協会を発足
  - 「Web の同意を考えようプロジェクト」からの流れ
  - 「形骸化した同意」問題や、「同意疲れ」に対応していく
  - 年末までに有識者/政府とガイドライン v1.0 構築
  - 2025/7 から審査を開始予定
- October Conference News | Igalia
  - https://www.igalia.com/2024/10/01/October-Conference-News.html
- **ACF | ACF Plugin no longer available on WordPress.org**
  - https://www.advancedcustomfields.com/blog/acf-plugin-no-longer-available-on-wordpress-org/
  - Advanced Custom Field というプラグインを WP Engine が運営していた
  - WP Engine という名前が WP 公式っぽいと、公式が方的に訴える
  - WP が ACF をフォークした Secure Custom Field として公開
  - WP Engine の WP.com アクセス権限を削除した
  - セキュリティガイドラインに則った措置としている
  - ACF は広く使われているので問題に
- Bringing WebKit back to Android: Internals
  - https://blogs.igalia.com/jani/bringing-webkit-back-to-android-internals/
- **Blink でも WebKit でもない新開発ブラウザエンジン「Gosub」 - GIGAZINE**
  - https://gigazine.net/news/20241020-gosub-web-browser-engine/
- State of CSS 2024
  - https://2024.stateofcss.com/en-US
- CSS Highlight Inheritance has Shipped!
  - https://blogs.igalia.com/schenney/css-highlight-inheritance-has-shipped/
- Platform Strategy and Its Discontents - Infrequently Noted
  - https://infrequently.org/2024/10/platforms-are-competitions/
- **SC-081: Introduce Schedule of Reducing Validity and Data Reuse Periods by clintwilson · Pull Request #553 · cabforum/servercert**
  - https://github.com/cabforum/servercert/pull/553
  - > Expand section 6.3.2 to detail schedule of reducing maximum validity periods in coming years
  - > - Overall reduction of maximum validity period from 398 days to 45 days
- **Home | Passkey Central**
  - https://www.passkeycentral.org/home
- **New FIDO Alliance Specs: Importing and Exporting Passkeys | 1Password**
  - https://blog.1password.com/fido-alliance-import-export-passkeys-draft-specs/
- **FIDO Alliance Publishes New Specifications to Promote User Choice and Enhanced UX for Passkeys - FIDO Alliance**
  - https://fidoalliance.org/fido-alliance-publishes-new-specifications-to-promote-user-choice-and-enhanced-ux-for-passkeys/
- **The Disappearance of an Internet Domain**
  - https://every.to/p/the-disappearance-of-an-internet-domain
  - .io ドメインが消えるかもしれないらしい。
  - イギリス領インド洋地域(チャゴス諸島の周辺地域)に割り当てられた ccTLD だった
  - イギリスがこの地域の返還を決定したので、.io ドメインがなくなるのでは?という話。


### Cookie 動向


### イベント

- 10 月
  - 8-10: BlinkOn19
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/XZPgZ3DymqY
  - 22-23: WebKit Contributors Meeting
    - https://webkit.org/meeting/
- 11 月
  - ?: CMA の Q3 レポート
    - https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes
  - 02-08: IETF 121 Dublin
    - https://www.ietf.org/meeting/121/
- 12 月
  - 2-5: TC39 Remote
    - https://github.com/tc39/agendas/blob/main/2024/12.md


### Wrap Up

- Chrome
  - 130
    - Document PiP
    - CSS Nested Declarations
    - box-decoration-break
  - 131 beta
    - CSS font-variant-emoji
    - ::details-content
    - currentcolor in RCS
    - ISA Direct Sockets API
    - FedCM as a trust signal for SAA
    - Select parser relaxation
  - Ship
    - Device Posture API
    - Explicit Compile Hints with Magic Comments
    - Request/Response.bytes()
    - `<details>`/`<summary>` styling
    - CSS caret-animation property
    - Dialog Toggle Events
    - Select parser relaxation
    - Sideways writing modes
  - Prototype
    - Progress Notification API
    - Allow SameSite=None Cookies in FP Sandboxed contents
  - Experiment
    - Storage Access Headers
  - web.dev
    - show Baseline status
  - Google Developer Blog
    - Chrome on Android to support 3p autofill services
  - other
    - CrUX Vis
    - Chrome Built-in AI challenge
- Firefox
  - 131
    - Iterator Helpers
    - CHIPS
    - Text fragments
  - Ship
    - Uint8Array Base64/hex
    - Dialog Toggle Events
    - Fetch Keepalive
  - Prototype
    - :has-slotted
    - :local-link
  - MDN Blog
    - Security documentation at TPAC 2024
  - Standard Position
    - Houdini/WC 系の分割・棚卸し
    - positive
      - popover=hint
      - CSS random()
    - negative
      - Protected Audience
  - other
- Safari
  - TP 204
    - cross-document view transitions
    - preview support for line-clamp
  - TP 205
    - Math.sumPrecise
    - Iterator.prototype.reduce
    - Lockdown Mode Safe Fonts
  - TP 206
    - Implemented ClipboardItem.support()
    - Completed the Iterator Helpers proposal
    - Added support for the Image Capture API.
  - 18.0.1
    - fix SameSite default behavior
  - Standard Position
    - Support
      - Generate CSS `view-transition-name` from element
      - CSS Scoping :has-slotted pseudo
  - Other
    - Masonry 仕様のフィードバック
- Edge
  - Privacy Preserving Ads が OT
  - React を WebComponent に刷新した記録
- W3C/WHATWG
  - TPAC2024
    - WHATUP でも `<select>` 系議論多い
  - Draft
  - Open/UI
    - `<select>` 系の議論多い
  - WHATNOT meeting
    - `<select>` 系の議論多い
  - Other
    - `<selectedoption>` の仕様議論
- TC39
- WinterCG
- IETF
  - RFC9651 で SFV の date/unicode 更新
- CDN 動向
- セキュリティ動向
- 周辺動向
  - Web の同意の非ダークパターン認定
  - WordPress が ACF をフォークして問題に
  - 新しいブラウザエンジン Gosub
  - 証明書の期限を 45 日にする提案が炎上
  - Passkey Central
  - .io ドメイン消えるかも
- Cookie 動向