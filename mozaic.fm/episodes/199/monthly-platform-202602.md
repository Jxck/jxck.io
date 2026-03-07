---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep199.mp3
published_at: 2026-02-27
guests:
  - name: "@saku"
    url: https://x.com/sakupi01
  - name: "@petamoriken"
    url: https://x.com/petamoriken
---

# ep199 Monthly Platform 202602

## Theme

第 199 回のテーマは 2026 年 2 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 146

#### Updates

- Get ready for Google I/O 2026
  - https://developers.googleblog.com/get-ready-for-google-io-2026/
  - May 19-20
- New in Chrome 145
  - https://developer.chrome.com/blog/new-in-chrome-145
  - Column wrapping for multicol
  - The Origin API
  - Device Bound Session Credentials
- What's new in DevTools (Chrome 145)
  - https://developer.chrome.com/blog/new-in-devtools-145
  - DevTools MCP server updates
  - Soft Navigations are now visible in trace view
  - Line-level profiler timings now far more precise
  - Faster trace interaction
  - Identify render-blocking resources
  - **Individual network request throttling**
  - Debugging improvements for @starting-style
  - AI Assistance updates
  - Miscellaneous highlights
- Chrome 146 beta
  - https://developer.chrome.com/blog/chrome-146-beta
  - CSS and UI
    - Scroll-triggered animations
    - The trigger-scope property
    - Timeline Named Range "scroll"
    - Support the hanging and each-line for the text-indent property
  - Web APIs
    - **Navigation API: add post-commit handler from precommit**
    - Populate targetURL during file handling
    - WebGPU: Texture and sampler lets
    - **WebGPU Compatibility mode**
    - WebGPU: Transient attachments
    - `Intl.Locale.prototype.variants`
    - **Iterator Sequencing**
    - **meta `name="text-scale"`**
    - Preserve dropEffect values from dragover to drop events
    - Data URL MIME type parameter preservation
    - **Sanitizer API**
  - New origin trials
    - **WebNN**
- What's New in WebGPU (Chrome 146)
  - https://developer.chrome.com/blog/new-in-webgpu-146

#### Intents

- **Ship: Device Bound Session Credentials**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Y-_oBoAsWy0
- Ship: Navigation API: add post-commit handler from precommit
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4XdcC-zpE8Q
- Ship: Support path attribute for SVG `<textpath>` element
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/quAMOrBzUrw
- Ship: WebXR Layers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dsM9xXc-4Ro
- Ship: Local Network Access restrictions on Service Worker WindowClient.navigate()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8AK8V4fSZFU
- **Ship: Web Printing API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6MmqQj3mzcY
- Ship: WebXR Plane Detection
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FaVm-dsox4U
- Ship: Request.isReloadNavigation attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tC_Xf3pxWNg
- **Ship: Web app scope system accent color**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uSDN66x2nHc
  - `accent-color: auto` と `AccentColor[Text]`キーワードはシステムアクセントカラーを取得可能
  - ただし、`AccentColor[Text]` の方は PWA の場合のみに限定されている
  - フィンガープリンティングのリスクがあるため、`accent-color: auto` も PWA のみに限定し、UA 既定色にフォールバックしよう
  - Firefox はもともとシステムアクセントカラーを公開していないので positive
- Ship: `hidden=until-found` HTML attribute and beforematch event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/e8n8Z5dzMs0
- **Ship: The revert-rule Keyword**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ieQj5bt-wA8
  - IACVT(Invalid at computed value time) になって戻り先がなくなる宣言を、カスケードで棄却される前のルールにフォールバックできる
  - `color: var(--unknown, revert-rule);`
  - カスタムプロパティ関連のフォールバック改善の話の一環
- **Ship: CSSPseudoElement interface**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/l20Dc3XMo0c
  - 新めの CSS (`::scroll-marker、::column` とか)が疑似要素に大きく依存するようになった
  - JS から疑似要素を扱う必要性が一気に高まった
    - [css-pseudo] Can we make pseudo-elements first-class citizens in the DOM? · Issue #11559 · w3c/csswg-drafts https://github.com/w3c/csswg-drafts/issues/11559
  - `CSSPseudoElement` は CSS Pseudo-Elements Level 4 の仕様に最初から定義されてたけど、ユースケースが限られていて(ユースケース自体はあったけど、代替手段ですんでいた)、優先度がずっと上がっていなかったぽい
- Ship: Element-scoped view transitions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/n1-oZUKaXHY
- Ship: Local network access restrictions for WebSockets
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/O6GMKt44Ups
- **Ship: Pseudo target on events**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Xhg02ya-kro
  - 実質 Pseudo にイベントリスナーを登録できるように
  - https://github.com/danielsakhapov/CSSPseudoElementDoc
- **Ship: image-rendering: crisp-edges**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dqAs7zmriQQ
- **Ship: Math.sumPrecise**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/u-efLrJfh6g
- **Ship: Pointer event suppression on drag start**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UEmtHDPS68A
- **Ship: Selective Permissions Intervention**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4gbiz0mrW_0
  - API 権限を許可する際、同意はサイトに対してであり、第三者のスクリプトには適用されないべき。
  - この介入で、広告が API 許可を利用できないようにしユーザーの意図と整合性を高める
  - Chrome の内部ロジックに関するもので、他のブラウザでの実装は期待されていない。
- Prototype and Ship:
- **Prototype: External `<script type=speculationrules>`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7ph2PcVZm6M
- **Prototype: Lazy loading for video and audio elements**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DNVOVe4VNak
- Prototype: Parse processing instructions in HTML
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5wgLOj97n7Y
- Prototype: Speculative load measurement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4YdngRJU4Fc
- **Prototype: Margin-trim**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ix14Xjg7R7g
- **Prototype: Selective Permissions Intervention**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Zsvf6obPWgQ
- Prototype: js-profiling in dedicated workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dzVg6XzXCiw
- Prototype: baseURL option for `CSSStyleSheet()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LQfrYpDWkfs
- **Prototype: Allowing JS web-requesting APIs to modify the User-Agent header**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GH3D30pY6uQ
- Prototype: Speculation rules: form_submission field
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dbXHb3y2ceQ
- Prototype: `js-profiling-mode=eager|lazy` Document-Policy for JS Self-Profiling API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/y3OkEzcrp24
- **Prototype: Device Bound Session Credentials for SSO**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DXwm9kWq-rk
- Prototype: Get Secure Payment Confirmation Capabilities
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mZ56fo-NdX4
- Experiment: Ship Rust XML Parser to 1% stable for non XSLT scenarios
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/D7BE4QPw0S4
- Experiment: Autofill event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vj1YvUwkXSU
- Experiment: WebAssembly Custom Descriptors
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_uPKlWwz_Lw
- **Ready for Developer Testing: Container Timing**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FnM3lweVssM
- **Ready for Developer Testing: WebMCP**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bhhOmTGzD5Y
  - https://github.com/webmachinelearning/webmcp
- Ready for Developer Testing: Source Specific Multicast for Direct Sockets API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vMmLZVd7rQI
- Extend Experiment:
- Change:
- Unship:
- Remove:
- Deprecate and Remove: Deprecate and remove: non-allowlisted Event interfaces from document.createEvent()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iLxX9ILciME
- PSA: Web Serial API on Android
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yGhvQ6mEmcY
- PSA: Enabling AI Origin Trial APIs for Devtools Extension Panels
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5GsZx0yLtFc
- Web-Facing Change PSA: InputEvent types for deletion commands on non-collapsed selections
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hL4EK_-I7_Y
- Web-Facing Change PSA: Populate targetURL during file handling
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/go7j3TqGwJY
- Web-Facing Change PSA: Stop re-queueing LaunchParams on reload
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/c4oY6o9Ln1s
- Reminder: Registration for BlinkOn 21 is open!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6Q-Y5kTmuIE
  - Date: April 20-21, 2026

#### Other

- web.dev
  - https://web.dev/
  - Start our latest course, Learn AI!
    - https://web.dev/blog/learn-ai-launch
  - **Interop 2026: Continuing to improve the web for developers**
    - https://web.dev/blog/interop-2026
    - Focus Areas
      - Anchor positioning
      - Container style queries
      - Dialogs and popovers
      - Scroll-driven animations
      - View transitions
      - The `attr()` CSS function
      - The `contrast-color()` CSS function
      - Custom highlights
      - Fetch uploads and ranges
      - IndexedDB
      - JSPI for Wasm
      - Media pseudo-classes
      - Navigation API
      - Scoped custom element registries
      - Scroll snap
      - The `shape()` CSS function
      - Web compat
      - WebRTC
      - The WebTransport API
      - The zoom CSS property
  - Navigation API - a better way to navigate, is now Baseline Newly Available
    - [https://web.dev/blog/baseline-navigation-api](https://web.dev/blog/baseline-navigation-api?hl=en)
  - **How pixiv reached 29% higher login success rate for passkey users**
    - [https://web.dev/case-studies/pixiv-passkeys](https://web.dev/case-studies/pixiv-passkeys?hl=en)
- google for developers
  - https://developers.googleblog.com/
  - Get ready for Google I/O 2026 - Google Developers Blog
    - https://developers.googleblog.com/get-ready-for-google-io-2026/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - https://developer.chrome.com/blog/
  - **WebMCP is available for early preview**
    - https://developer.chrome.com/blog/webmcp-epp
    - HTML Form をツールとして扱う Declarative API
    - JS の Imperative API
  - **The corner cases of implementing CSS corner-shape in Blink**
    - https://developer.chrome.com/blog/implementing-corner-shape
  - New enterprise publishing option in the Chrome Web Store: Publish to external organizations
    - https://developer.chrome.com/blog/cws-new-enterprise-publishing-option
  - Throttle individual network requests
    - https://developer.chrome.com/blog/throttle-individual-network-requests
  - What's New in WebGPU (Chrome 146)
    - https://developer.chrome.com/blog/new-in-webgpu-146
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
- other
  - Blog: A Beginners Guide: Cross-Device Passkeys
    - https://bughunters.google.com/blog/passkeys
    - Passkeys は Hybrid transport というメカニズムを使用してデバイス間で利用可能
    - セキュリティが向上し、ユーザー体験が改善される。
    - さまざまなプラットフォーム間での互換性を促進する。

### Firefox 動向

#### Stable: 148

#### Updates

- https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases
- Firefox 148 release notes for developers (Stable)
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/148
  - **Trusted Types API**
  - **Sanitizer API**
  - Document Picture-in-Picture API(Nightly)
  - Nightly で Container Style Query も入る
    - 2014404 - Enable the layout.css.style-queries.enabled pref on Nightly
      - https://bugzilla.mozilla.org/show_bug.cgi?id=2014404
- Firefox 149 release notes for developers(Beta)
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/149
- Firefox 150 release notes for developers (Nightly)
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/150
- Profile, search and wallpaper bug fixes plus more! - These Weeks in Firefox: Issue 195
  - https://blog.nightly.mozilla.org/2026/02/02/profile-search-and-wallpaper-bug-fixes-plus-more-these-weeks-in-firefox-issue-195/
- Launching Interop 2026 - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2026/02/launching-interop-2026/
  - Interop Project は、ユーザーと開発者にとってのウェブ互換性を向上させるためのクロスブラウザイニシアティブである。
  - Interop 2026 では、150 以上の提案から 20 の重点分野と 4 つの調査分野が選定された。
  - 既存機能の信頼性向上に加え、新機能として Cross-document View Transitions や Scroll-driven animations などが導入される。
- **Goodbye innerHTML, Hello setHTML: Stronger XSS Protection in Firefox 148 - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2026/02/goodbye-innerhtml-hello-sethtml-stronger-xss-protection-in-firefox-148/
  - Firefox 148 は、標準化された Sanitizer API を初めて実装し、XSS 攻撃からの保護を強化した。
  - Sanitizer API は、悪意のある HTML を無害な HTML に変換し、setHTML()メソッドで直接挿入を安全に行う。
  - 開発者は、innerHTML の代わりに setHTML()を使用することで、最小限のコード変更で強力な XSS 保護を実現できる。
- **How to turn off AI features in Firefox, or choose the ones you want**
  - https://blog.mozilla.org/en/firefox/how-to-use-ai-controls/
  - Firefox では AI 機能を完全にオフにするか、特定の機能のみを選択できる。
  - AI コントロールでは、サイトの翻訳や代替テキスト、AI チャットボットなどを管理できる。
  - 設定メニューから AI 機能をブロックしたり、個別に管理することが可能である。
- **Making WebAssembly a first-class language on the Web - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2026/02/making-webassembly-a-first-class-language-on-the-web/
  - WebAssembly は第二級言語であり、JavaScript に依存しているため、開発者体験が劣る。
  - WebAssembly Components が導入されることで、WebAssembly の使用が簡素化され、Web API への直接アクセスが可能になる。
  - WebAssembly/component-model: Repository for design and specification of the Component Model
    - https://github.com/WebAssembly/component-model/
  - component-model/design/mvp/WIT.md at main · WebAssembly/component-model
    - https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md
  - WebAssembly CG とともに進めていく

#### Intents

- **Ship: Popover=hint**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/OGdRzK18_Zo
  - Interop 2026
  - Firefox 149 release on March 24
- Ship: font-family: math
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/TUMrZGKn8pI/
- Ship: HTMLMediaElement.captureStream
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/_vdiALgwEjY/m/nP0VmMbiAQAJ
- **Ship: ariaNotify**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/UMLaNzRQ5MI/m/dAs9R4RMAgAJ
- **Ship: CloseWatcher**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/W2TnGrcMz_s
- Prototype & Ship: document.caretRangeFromPoint
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/SjkI6NsOnSQ/m/vk5q3yQiAgAJ
- Change:
- Remove:
- Nightly soft freeze discontinuation and updated Beta schedule starting with Firefox 149
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/cBHUuvg_bPM/m/Q8JpIjQ2BAAJ
- Unship: Adjustment of default MathML operator lspace/rspace when `math-depth > 0`
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/4jCrlRGxIIM

#### Newsletter

- https://fxdx.dev/
- Firefox WebDriver Newsletter 148 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-148/

#### MDN / Open Web Docs

- https://developer.mozilla.org/en-US/blog/
- **Open Web Docs Impact and Transparency Report 2025**
  - https://openwebdocs.org/content/reports/2025/
  - MDN の CSS モジュールや ACD などの取り組み

#### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2026-02-01+
- Positive
  - Picture-in-Picture
    - https://github.com/mozilla/standards-positions/issues/72
  - [cssom-view-1] checkVisibility: contentVisibilityAuto, opacityProperty, and visibilityProperty
    - https://github.com/mozilla/standards-positions/issues/920
  - Coding Independent Code Points (CICP) and PNG cICP
    - https://github.com/mozilla/standards-positions/issues/922
  - Container Timing API
    - https://github.com/mozilla/standards-positions/issues/1155
  - Disable inline XSLT for production of SVG
    - https://github.com/mozilla/standards-positions/issues/1356
- Defer
  - Focusgroup
    - https://github.com/mozilla/standards-positions/issues/631
- No-signal or Close
  - **HTML anchor attribute**
    - https://github.com/mozilla/standards-positions/issues/836
    - Add anchor attribute by josepharhar · Pull Request #9144 · whatwg/html
      - https://github.com/whatwg/html/pull/9144
      - Implicit anchor positioning があるから不要ということで close
  - WebAssembly Phase 3 Proposals
    - https://github.com/mozilla/standards-positions/issues/1350

#### Other

- State of Mozilla 2025
  - https://stateof.mozilla.org/
- Heading to India AI Impact Summit, Mozilla leaders call for investment in open source AI as a path to sovereignty
  - https://blog.mozilla.org/en/mozilla/india-ai-impact-summit/
  - Mozilla はインド AI インパクトサミット 2026 に参加し、オープンソース AI への投資を呼びかけている。
  - 集中化する AI 制御がイノベーションや公正な競争を脅かしており、オープンソース AI が重要な解決策である。
  - 「The Origin of Thought」プログラムを通じて、文化と AI の交差点を探求し、人間中心の AI エコシステムを構築する意義を強調している。
- AI controls are coming to Firefox
  - https://blog.mozilla.org/en/firefox/ai-controls/
  - Firefox 148 に AI コントロール機能が追加され、AI 機能のブロックが可能になる。
    - Translations
    - Alt text in PDFs
    - AI-enhanced tab grouping
    - Link previews
    - AI chatbot in the sidebar
  - ユーザーは AI 機能を個別に管理でき、使用しない場合は AI 機能を無効化できる。
  - AI コントロールはユーザーの選択を重視し、ブラウジング体験を向上させることを目的としている。
- How to turn off AI features in Firefox, or choose the ones you want
  - https://blog.mozilla.org/en/firefox/how-to-use-ai-controls/

### Safari 動向

#### Stable: 26.3

#### Updates

- https://webkit.org/blog/
- Release Notes for Safari Technology Preview 236
  - https://webkit.org/blog/17791/release-notes-for-safari-technology-preview-236/
  - Added support for using the `min()`, `max()`, and `clamp()` math functions in the sizes attribute of `<img>` elements.
- WebKit features for Safari 26.3 | WebKit
  - https://webkit.org/blog/17798/webkit-features-for-safari-26-3/
  - EMPTY
    - Video in visionOS
  - **Zstandard**
  - **Navigation API**
  - Bug fixes and more
    - CSS
    - DOM
    - Media
    - Rendering
    - Safe Browsing
  - Feedback
- Release Notes for Safari Technology Preview 237 | WebKit
  - https://webkit.org/blog/17842/release-notes-for-safari-technology-preview-237/
  - Accessibility
  - CSS
    - **Added support for the `:heading` pseudo-class selector.**
  - DOM
  - HTML
    - **Added support for the `source` attribute on `ToggleEvent` interface.**
  - Networking
  - Rendering
  - SVG
    - Added support for the `color-interpolation` attribute for SVG gradients.
  - Web API
    - **Added support for async iteration over `ReadableStream` objects using `for await...of` loops.**
    - Added support for the Service Worker static routing Resource Timing API.
    - Added `srgb-linear` and `display-p3-linear` to `PredefinedColorSpace`.
  - Web Authentication
  - Web Extensions
    - Added support for `runtime.getDocumentId()` web extension API.
  - Web Inspector
    - Added support to show each individual request when there are redirects in the Network tab.
  - WebRTC
    - Added support for the `targetLatency` attribute in WebRTC.
- Release Notes for Safari Technology Preview 238 | WebKit
  - https://webkit.org/blog/17848/release-notes-for-safari-technology-preview-238/
  - Animations
    - Enabled threaded time-based animation resolution
  - CSS
    - **Added support for the CSS :open pseudo-class, which matches form elements and other elements in an open state.**
  - Editing
    - Added menu items to convert editable text between Simplified and Traditional Chinese characters in the "Transformations" submenu.
  - Forms
    - **Enabled the customizable `<select>` element, allowing custom styling and content in `<select>` dropdowns using `appearance: base-select`.**
  - Networking
  - Rendering
  - SVG
  - Scrolling
    - **Enabled scroll anchoring, which prevents visible jumps in scroll position when content is inserted or removed above the viewport.**
  - Web API
    - **Added support for `ReadableStream.from()` to create a ReadableStream from an async iterable or iterable.**
    - Added support for transferring ReadableStream objects via `postMessage()`.
  - Web Inspector
    - Improved discoverability of color formats and gamuts in the color picker by adding explicit format and gamut toggle controls.
  - WebAssembly
    - Added support for JavaScript Promise Integration (JSPI) for WebAssembly, enabling WebAssembly code to suspend and resume execution while waiting for JavaScript promises.
  - WebRTC

#### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2026-02-01+
- Positive
  - WebXR Layers API
    - https://github.com/WebKit/standards-positions/issues/601
- No-signal or Closed
  - HTML anchor attribute
    - https://github.com/WebKit/standards-positions/issues/216

#### Other

- Interop 2025: A year of convergence
  - https://webkit.org/blog/17808/interop-2025-review/
  - Interop 2025 のまとめ
  - 19 の focus area と 5 つの investigation area が選定された
  - 最終的な合格率は 97% に達した。
  - Safari は 43 から 99 にスコアを向上、全ブラウザ中最多
  - Anchor Positioning, View Transitions, Navigation API を含む
- Announcing Interop 2026 | WebKit
  - https://webkit.org/blog/17818/announcing-interop-2026/
  - Focus Areas for 2026
    - Anchor Positioning
    - Advanced `attr()`
    - Container Style Queries
    - `contrast-color()`
    - Custom Highlights
    - Dialog and popover additions
    - Fetch Uploads and Ranges
    - `getAllRecords()` for IndexedDB
    - JSPI for Wasm
    - Media pseudo-classes
    - Navigation API
    - Scoped Custom Element Registries
    - Scroll-driven Animations
    - Scroll Snap
    - `shape()`
    - View Transitions
    - Web Compat
    - WebRTC
    - WebTransport
    - CSS Zoom
  - Investigation Efforts: A Look Ahead
    - Accessibility testing
    - JPEG XL
      - Safari 17 で既に Ship されている。
      - Google Research が Rust 製のデコーダーを作ったことで Chrome 145 と Firefox 149 にプロトタイプ実装が入った。
      - 将来 Focus Areas になるのを見越してテストスイートを拡充する方針。
    - Mobile testing
    - WebVTT

### Edge 動向

#### Stable: 145

#### Updates

- https://blogs.windows.com/msedgedev/
  - Microsoft Edge and Interop 2026 - Microsoft Edge Blog
    - https://blogs.windows.com/msedgedev/2026/02/12/microsoft-edge-and-interop-2026/
    - attr(), to expand the CSS attr() function so any property can read HTML attributes of any type and unit.
    - contrast-color(), to improve color tooling across the web.
    - Container style queries, to enable styling elements based on the styling of container elements.
    - Custom highlights, to allow styling arbitrary text ranges without modifying the DOM.
    - Dialogs and popovers, to improve the interoperability of the dialog element and the popover API.
    - Fetch, to enhance the fetch() API with support for streaming request bodies and more.
    - IndexedDB, to improve the performance of reading large datasets with the getAllRecords() method.
    - JSPI for Wasm, to integrate Wasm with JavaScript promises.
    - Media pseudo-classes, to implement pseudo-classes such as :playing, :paused, :buffering, and others for audio/video element states across browsers.
    - Navigation API, to continue improving interoperability, including adding support for navigation pre-commit handlers.
    - Scoped custom element registry, to allow multiple custom element registries to coexist safely.
    - Scroll-driven animations, to create advanced animations that are based on the user's scroll position.
    - Scroll snap, to improve the consistency of the CSS scroll snapping behavior.
    - shape(), to add interoperable support for the shape() CSS function to define complex shapes around elements.
    - View Transitions, to improve same-document behavior and implement cross-page transitions.
    - Web compat, to address real-world compatibility issues.
    - WebRTC, to continue improving WebRTC interoperability and resolve remaining issues.
    - WebTransport, to advance support for the WebTransport API for low-latency, bidirectional communication over HTTP/3.
    - Accessibility testing: to make it easier to test the accessibility of web features.
    - JPEG XL: to create a comprehensive test suite, eventually creating the possibility for JPEG XL to be part of a future Interop project iteration as a focus area.
    - Mobile testing: to continue improving the infrastructure that makes it possible to test mobile-specific features.
    - WebVTT: to continue improving the specification and test suite for this feature, opening the possibility for WebVTT to be part of a future Interop project iteration.
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見られる
- https://twitter.com/MSEdgeDev
  - これを見るしかない

#### Other

- Graduating the delayed message timing explainer (#1237)
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/commit/2cdfc6210f198ed9bbd87b7b6ee3b7d947db779c
- Add explainer for Network Efficiency Guardrails (#1244)
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/commit/de406c1cd4ca681b5a6b2f5f50aac306f58e5111
- Address feedback on platform-provided mixins explainer (3) (#1245)
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/commit/3e82e0441a898f4dc96affddecf1676f06d335a2

### WHATWG/W3C 動向

#### TPAC

#### Draft

- https://www.w3.org/news/
- Recommendation
  - Accessibility Conformance Testing (ACT) Rules Format 1.1 is now a W3C Recommendation
    - https://www.w3.org/news/2026/accessibility-conformance-testing-act-rules-format-1-1-is-now-a-w3c-recommendation/
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - **Selectors Level 5**
    - https://www.w3.org/news/2026/first-public-working-draft-selectors-level-5/
    - `:local-link` and `:local-link()`
      - 現在のページ URL とリンク先を比較して、サイト内リンクかどうかを判定する
    - `:state()`
    - `:heading` and `:heading()`
    - `:interest-source` and `:interest-target`
    - `:blank`
    - `|| / :nth-col() / :nth-last-col()`
      - テーブルのような 2 次元グリッドで、列をセレクタで表現するためのもの。
      - `col.selected || td` で特定列のセルを選択したり、`:nth-col(An+B)` で偶数列・奇数列を指定したり
    - `:current` / `:past` / `:future`
      - タイムライン上の現在・過去・未来の要素にマッチする擬似クラス
      - Web Speech API など
  - First Public Working Draft and supporting notes: EPUB Annotations 1.0
    - https://www.w3.org/news/2026/first-public-working-draft-and-supporting-notes-epub-annotations-1-0/
    - EPUB のアノテーション(注釈・ハイライト・メモなど)についてのセット
- Group Note Draft
  - Group Note Draft: W3C Accessibility Guidelines Evaluation Methodology (WCAG-EM) 2.0
    - https://www.w3.org/news/2026/group-note-draft-w3c-accessibility-guidelines-evaluation-methodology-wcag-em-2-0/
  - Group Note Drafts: Cognitive Accessibility Research Modules | 2026 | News | W3C
    - https://www.w3.org/news/2026/group-note-drafts-cognitive-accessibility-research-modules/
  - Group Note Draft: Considerations for Reviewing Differential Privacy Systems (for Non-Differential Privacy Experts)
    - https://www.w3.org/news/2026/group-note-draft-differential-privacy-guidance/

#### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
  - 2026-02-05
    - https://github.com/openui/open-ui/blob/main/meetings/telecon/2026-02-05.md
  - 2026-02-19
    - https://github.com/openui/open-ui/blob/main/meetings/telecon/2026-02-19.md
    - Introduce "Declarative Overscroll Actions"
      - https://github.com/openui/open-ui/issues/1372
      - 宣言的にスワイプアクションを実現する提案
      - Invoker Commands の仕組みを利用する
      - Declarative Overscroll Actions (Explainer) | Open UI
        - https://open-ui.org/components/overscroll-actions.explainer/
    - [switch] Should the explainer be rewritten to support the switch attribute?
      - https://github.com/openui/open-ui/issues/1282

#### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
  - 02-05-2026
    - https://github.com/whatwg/html/issues/12134
    - [focusgroup] Declarative keyboard focus navigation for a scoped set of composite widgets
      - https://github.com/whatwg/html/issues/11641
      - Stage2
  - 2026-02-12
    - https://github.com/whatwg/html/issues/12141
    - `controls` attribute for `<img>` element
      - https://github.com/whatwg/html/issues/11856
      - GIF の制御が目的
    - FormControlRange Interface
      - https://github.com/whatwg/html/issues/11478
      - input/textarea のテキスト選択範囲の取得
      - Stage2

#### CSSWG

- https://www.w3.org/blog/CSS/
- https://lists.w3.org/Archives/Public/www-style/
  - [meta] Overview page on drafts.csswg.org not updating · Issue #12743 · w3c/csswg-drafts
    - https://github.com/w3c/csswg-drafts/issues/12743#issuecomment-3894298496
    - Editor's Draft や Wiki などが管理されている [drafts.csswg.org](http://drafts.csswg.org) や [wiki.csswg.org](http://wiki.csswg.org) について
    - サーバ代は個人が支払っており、200 ドル/month、約 8 年間も運用していた
    - 管理者と連絡が取れない状況が続いていた中、概要ページの更新が止まってしまっていたため、独自で解決しようとしたが、相談なしに解決策を講じたため管理者が怒った
    - > You're all very ready and eager to ping me when something breaks,
      > yet crickets when talking about how to actually fix anything or shift the burden away from me. ..
      > So here's another forcing function: I'm going to stop paying for the servers at the end of this month.
      > You can either find a way to fund them, replace them, or deal with them not being there.
    - 今月末でサーバ代の支払いが止まるので、急ピッチで移行作業が進められている

#### Other

- **CSS Snapshot 2026 published as a Group Note**
  - https://www.w3.org/news/2026/css-snapshot-2026-published-as-a-group-note/
  - https://www.w3.org/TR/2026/NOTE-css-2026-20260226/
  - いったん出して、段階的に完成させていく
- W3C Team appointment to the TAG
  - https://www.w3.org/news/2026/w3c-team-appointment-to-the-tag/
  - W3C Technical Architecture Group (TAG)において、2026-2028 年の任期に Brian Kardell が選任された。
- Second W3C Team appointment to the TAG
  - https://www.w3.org/news/2026/second-w3c-team-appointment-to-the-tag/
  - W3C Technical Architecture Group (TAG)の 2026-2028 年任期の新メンバーに Heather Flanagan が選任された。
- ACD End of Year Report and Roadmap
  - https://lolaslab.co/blog/2025/acd-2025-report/
  - 2025 は ACD が正式に発足した
  - The A11y Project、Open Web Docs、Mozilla からの資金調達
  - Open Web Docs、MS、Tetralogical、Cynthia Shelly の専門家集団からの協力
  - 当初は独自のテストスイートを作る予定だったが、WPT と連携していきたい
  - ARIA-AT とも連携していく
  - WebDX CG とも連携し、Baseline をアクセシビリティの指標としても拡張する方針

### TC39/TC55 動向

#### Meeting

- 2026-01
  - https://github.com/tc39/agendas/blob/main/2026/01.md
  - https://github.com/tc39/notes/pull/389/changes
  - Upsert(`Map`, `WeakMap` の `getOrInsert`, `getOrInsertComputed`)が Stage 4
  - `import.sync` が Stage 2
    - `require` の ES Modules 版
    - 非ブラウザランタイムに非標準ロード API (`import.meta.require` など)が入るのを防ぐ目的
    - ブラウザのメインスレッドでは実行時に例外を投げる
  - `Error` コンストラクタに渡すスタックトレースに関するオプションがそれぞれ Stage 1
    - limit: 行数制限(V8 の `Error.stackTraceLimit` 相当)
    - framesAbove: 上位フレーム隠し(V8 の `Error.captureStackTrace` にある機能)
  - Stage 2 Pipeline Operators が揉めている
    - Hack スタイル派 vs F#スタイル派 vs パイプライン演算子自体要らない派
    - プレースホルダー(トピックトークン)をどうするか

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2026-01-01}...main@{2026-03-01}
- https://tc39.github.io/beta/
- 0->1
  - Error framesAbove
  - Error limit
  - Composable Accessors via built-in Decorators
- 1->2
  - import.sync
- 2->2.7
- 2.7->3
  - Intl Era MonthCode
- 3->4
  - JSON.parse source text access
  - Upsert

#### New Proposals

#### WinterTC

- https://github.com/WinterTC55/admin/tree/main/meetings
- admin/meetings/2026-02-06.md at main · WinterTC55/admin
  - https://github.com/WinterTC55/admin/blob/main/meetings/2026-02-06.md
  - Runtime keys
  - HTTP Server API
    - Luca Casonato 氏のレビュー: 昨年 9 月の HTTP サーバーAPI ブレインストーミング議事録をレビュー。
    - HTTP リクエスト/レスポンスハンドラーの仕様を作成。
    - アップグレード、プロキシ、クッキー、キャッシュ、ストリーミング、メタデータ、ミドルウェアを標準化。
    - 各ランタイム間で共通のシグネチャを目指す。
    - 次の目標: ランタイムがサーバーを起動・実行する方法を一貫したオプションで仕様化。Node.js ウェブサーバーフレームワークを先行事例に挙げる。
    - Ethan Arrowood 氏のコメント: Node.js プロジェクトはパフォーマンス重視で、既存ライブラリは独自サーバー構築のため頓挫。
    - 「サーバーレス」でも HTTP サーバーは複雑すぎる。
    - グループの合意と議論: 機能シグネチャの一貫性を追求する価値あり。
    - リクエストオブジェクトのメタデータとハンドラーシグネチャをブレインストーミング。今後、これらを基にした仕様を議論。

#### Other

### IETF 動向

#### IETF

#### WG

- RFC
- Work
- Meeting

#### Other

- Fwd: New Version Notification for draft-nottingham-httpbis-pre-denied-00.txt
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2026JanMar/0075.html
- [httpapi] draft-ietf-httpapi-digest-fields-problem-types-04 ietf last call Opsdir review
  - https://mailarchive.ietf.org/arch/msg/httpapi/KJnUWlhO3JwaGafbDhHjRHxV2QU/

### 周辺動向

#### ベンダー動向

- Improve global upload performance with R2 Local Uploads
  - https://blog.cloudflare.com/r2-local-uploads/
- 2025 Q4 DDoS threat report: A record-setting 31.4 Tbps attack caps a year of massive DDoS assaults
  - https://blog.cloudflare.com/ddos-threat-report-2025-q4/
- On the Importance of "Hello" and "Thanks" - Let's Encrypt
  - https://letsencrypt.org/2026/02/05/fosdem2026.html
- Igalia's Brian Kardell joins the W3C TAG | Igalia
  - https://www.igalia.com/2026/02/10/Igalias-Brian-Kardell-joins-the-W3C-TAG.html
- Interop 2026 Focus Areas Announced | Igalia
  - https://www.igalia.com/news/interop-2026.html
- Implementing the Temporal proposal in JavaScriptCore
  - https://blogs.igalia.com/compilers/2026/02/02/implementing-the-temporal-proposal-in-javascriptcore/
- Igalia WebKit Team | WebKit Igalia Periodical #55
  - https://blogs.igalia.com/webkit/blog/2026/wip-55/
- Igalia's Compilers Team - A 2025 Retrospective
  - https://blogs.igalia.com/compilers/2026/02/06/igalia-s-compilers-team-a-2025-retrospective/
  - Standards
    - Temporal
    - Decimal
    - Source Maps
    - Modules
    - AsyncContext
    - Unicode standards
    - WinterTC
  - Node.js
  - V8
  - Babel
  - LLVM
  - Mesa/IR3
  - Guile and Whippet
  - FEX
- Igalia WebKit Team | WebKit Igalia Periodical #56
  - https://blogs.igalia.com/webkit/blog/2026/wip-56/
- Container Timing: measuring web components performance
  - https://blogs.igalia.com/dape/2026/02/10/container-timing-measuring-web-components-performance/
- Reference Target: having your encapsulation and eating it too
  - https://blogs.igalia.com/alice/reference-target-having-your-encapsulation-and-eating-it-too/
- Igalia WebKit Team | WebKit Igalia Periodical #57
  - https://blogs.igalia.com/webkit/blog/2026/wip-57/
- **Ladybird adopts Rust, with help from AI - Ladybird**
  - https://ladybird.org/posts/adopting-rust/
  - Ladybird が Rust 移行
  - AI を使って 2 週間で LibJS の移行が完了したらしい
  - LibJS: Add Rust implementation of lexer, parser, AST, and bytecode generator by awesomekling
    - https://github.com/LadybirdBrowser/ladybird/pull/8104

#### セキュリティ動向

- DNS-PERSIST-01: A New Model for DNS-based Challenge Validation - Let's Encrypt
  - https://letsencrypt.org/2026/02/18/dns-persist-01.html
  - 新しい ACME チャレンジタイプ「DNS-PERSIST-01」を実装し、DNS を検証メカニズムとして利用する。
  - DNS-PERSIST-01 は、持続的な承認レコードを使用し、発行ごとに新しいトークンを必要としない。
  - このモデルは、IoT デプロイメントやマルチテナントプラットフォームに特に適している。
- Shorter Certificate Lifetimes and Rate Limits - Let's Encrypt
  - https://letsencrypt.org/2026/02/24/rate-limits-45-day-certs.html
  - 証明書のデフォルトの有効期限が 90 日から 64 日、最終的に 45 日へと短縮される。
  - 更新リクエストが倍増し、将来的には 30 日ごとに更新が期待される。
  - レート制限は新しいドメイン名の発行に影響するが、更新には適用されない。

#### Other

- The Wrong Work, Done Beautifully | Domenic Denicola
  - https://domenic.me/jsdom-claude-code/
  - jsdom は Node.js におけるウェブブラウザの部分実装であり、オープンソースプロジェクトとして 10 年以上維持されている。
  - COVID 以降、メンテナンスモードに移行し、低優先度の課題に取り組むことが多くなったが、最近 AI を利用して新たな改善に取り組んだ。
  - jsdom の人気は依然として高いが、プロジェクトの価値について再考する必要がある。
- The Power of 'No' in Internet Standards
  - https://www.mnot.net/blog/2026/02/13/no
  - インターネット標準における力の最も純粋な表現は「ノー」と言うことである。
  - 標準の実装や採用が重要であり、標準自体にはほとんど力がない。
  - 市場の力と競争規制が企業の行動を形作る主要な要素である。
- The Internet Isn't Facebook: How Openness Changes Everything
  - https://www.mnot.net/blog/2026/02/20/open_systems
  - インターネットの「オープン」は、システムとしての特性が重要であり、その設計や規制に深い影響を与える。
  - クローズドシステムと異なり、オープンシステムは新しい参加者やサービスの導入が容易であるが、管理が困難になる。
  - インターネットのオープン性を維持することで、社会が期待する価値を提供し続けることが可能である。
- Versioning JSON for APIs
  - https://lowentropy.net/posts/versioning-json/
  - バージョンフィールドはバージョニングにおいてほとんど役に立たず、プロトコルの進化には寄与しない。
  - 重要なのは、移行戦略を初期バージョンに組み込むことであり、新しいフォーマットを新しい URL で提供することが効果的である。
  - JSON の進化には、バージョニングを必要とせず、機能を追加するシンプルな方法が存在する。
- Maintaining the Bridges
  - https://bkardell.com/blog/Bridges.html
  - 公共財としての Web を保持するための資金繰り
- What if we just
  - https://bkardell.com/blog/WhatIfYouJustTellMe.html
  - Well-kown URL に特定のフォーマットで Custom Element の情報を記述できるようにする
  - そうすれば、リアルワールドのデータに基づいた標準化作業ができるのでは

### イベント

- 3 月
  - 10-12: TC39 NY
    - https://github.com/tc39/agendas/blob/main/2026/03.md
  - 14-20: IETF 125 Shenzhen
    - https://www.ietf.org/meeting/125/
- 4 月
  - 20-21: BlinkOn
- 5 月
  - 19-20: Google I/O

### Wrap Up

- Chrome
  - Google I/O 開催告知
  - Ship
    - `accent-color: auto` を PWA 限定にする
    - カスケードで棄却される前のルールにフォールバックできる `revert-rule`
    - `CSSPseudoElement` で擬似要素にイベントリスナーを登録できるように
    - Pointer event suppression on drag start
    - Selective Permissions Intervention
  - Prototype
    - 外部ファイルで `<script type=speculationrules>`
    - `<video>`, `<audio>` で Lazy loading
    - `margin-trim`
    - `fetch()` で `User-Agent` ヘッダーの内容を変更できるように
    - Device Bound Session Credentials for SSO
  - Experiment
    - WebMCP
  - Deprecate and Remove
  - PSA
  - other intents
  - web.dev
    - pxiv のパスキー導入でログイン成功率が 99% になった話
  - Google Developer Blog
    - Blink の `corner-shape` 実装について
  - Chrome Developers
  - Chromium blog
  - other blogs
    - Interop 2026
  - other
    - BlinkOn 21
    - Web MCP
- Firefox
  - 148
    - Trusted Types API
    - Sanitizer API
    - Container Style Query
  - WebAssembly a first-class language on the Web
  - Ship
    - ariaNotify
    - CloseWatcher
  - Prototype
  - other intents
  - MDN Blog
    - Open Web Docs 2025 年のレポート
  - Standard Position
    - HTML anchor attribute closed
  - other
    - AI controls in Firefox
- Safari
  - TP 236
    - `<img sizes>` で min/max/clamp
  - Safari 26.3
    - Zstandard
    - Navigation API
  - TP 237
    - `:heading`
    - `ToggleEvent.source`
    - for await of ReadableStream
    - Service Worker Static Routing Resource Timing API
    - Added `srgb-linear` and `display-p3-linear` to `PredefinedColorSpace`.
  - TP 238
    - `:open pseudo-class`
    - CSE
    - **Enabled scroll anchoring**
    - **`ReadableStream.from()`**
  - Standard Position
    - Positive
      - WebXR Layers API
  - other
    - Interop 2025 のまとめ
    - Announcing Interop 2026
- Edge
  - Microsoft Edge and Interop 2026
- W3C/WHATWG
  - Draft
    - Recommendation: ACT
    - FPWD: Selectors Level 5, EPUB Annotations 1.0
  - Open UI
    - Declarative Overscroll Actions
  - WHATNOT meeting
    - `controls` attribute for `<img>`
    - FormControlRange
  - CSSWG
    - [drafts.csswg.org](http://drafts.csswg.org) や [wiki.csswg.org](http://wiki.csswg.org) サーバ管理者問題と移行作業
  - Other
    - CSS Snapshot 2026 が出された
    - Brian Kardell, Heatjer Flanagan が TAG に選任された
    - ACD の 2025 の取り組みについて Lola からレポート
- TC39
  - Upsert Stage 4
  - import.sync Stage 2
  - Error limit/framesAbove
  - Pipeline Operator まだ揉めてる
  - WinterTC
    - Runtime keys
    - HTTP Server API
- IETF
  - New Version Notification for draft-nottingham-httpbis-pre-denied-00.txt
- 周辺動向
  - ベンダー動向
    - Igalia's Compiler チームの 2025 年振り返り
    - Ladybird が 2 週間 Rust 移行
  - セキュリティ動向
    - Let's Encrypt DNS-PERSIST-01
    - Let's Encrypt 証明書 90->64->45 日にしていく
  - Other
    - Domenic が JSDom どうするか悩んでる
    - No が強すぎる話し by mnot
    - Maintaining the Bridges by Brian Kardell
