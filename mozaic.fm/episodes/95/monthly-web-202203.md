---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep95.mp3
published_at: 2022-03-29
guest: [@myakura](https://twitter.com/myakura)
---

# ep95 Monthly Web 202203

## Theme

第 95 回のテーマは 2022 年 3 月の Monthly Web です。

## Show Note

### Chrome 動向

#### Stable: 99

#### Updates

- **Chromium Blog: Chrome 100 Beta: Reduced User-Agent Strings, Multi-Screen Window Placement, and More**
  - https://blog.chromium.org/2022/03/chrome-100-beta-reduced-user-agent.html
  - Last Version for Unreduced User-Agent String
  - Multi-Screen Window Placement
  - Origin Trials
    - Continuing Origin Trials
      - Media Source Extensions in Workers
    - Completed Origin Trials
      - Digital Goods API
  - Other Features in this Release
    - AbortSignal.prototype.throwIfAborted()
    - Capability Delegation
    - HIDDevice forget()
    - mix-blend-mode: "plus-lighter"
    - Sec-CH-UA-WoW64 Client Hint
    - SerialPort Integration with WritableStream Controller's Abort Signal
    - TLS ALPN Extension in wss-schemed WebSockets Connections
    - Web NFC: NDEFReader makeReadOnly()
    - WebTransport serverCertificateHashes Option
  - Deprecations, and Removals
- **New in Chrome 99**
  - https://developer.chrome.com/en/blog/new-in-chrome-99/
  - Chrome 100 and Firefox 100
  - CSS Cascade Layers
  - showPicker() for input elements
- **What's New In DevTools (Chrome 99)**
  - https://developer.chrome.com/en/blog/new-in-devtools-99/
  - Throttling WebSocket requests
  - New Reporting API pane in the Application panel
  - Support wait until element is visible/clickable in the Recorder panel
  - Better console styling, formatting and filtering
    - Properly style log messages with ANSI escape code
    - Properly support %s, %d, %i and %f format specifiers
    - More intuitive console group filter
  - Sourcemaps improvements
    - Debug Chrome extension with sourcemap files
    - Improved source folder tree in the Sources panel
    - Display worker source files in the Sources panel
  - Chrome's Auto Dark Theme updates
  - Touch-friendly color-picker and split pane
  - Miscellaneous highlights
  - Download the preview channels
  - Getting in touch with the Chrome DevTools team
  - What's New in DevTools
- What's New In DevTools (Chrome 100)
  - https://developer.chrome.com/en/blog/new-in-devtools-100/
  - View and edit @supports at rules in the Styles pane
  - Recorder panel improvements
    - Support common selectors by default
    - Customize the recording's selector
    - Rename a recording
  - Preview class/function properties on hover
  - Partially presented frames in the Performance panel
  - Miscellaneous highlights
  - Download the preview channels
  - Getting in touch with the Chrome DevTools team
- Deprecations and removals in Chrome 100
  - https://developer.chrome.com/en/blog/deps-rems-100/
  - Last Version for Unreduced User-Agent String

#### Intents

- Ship: Add Save Data Client Hint
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HR7tWmewbSA/m/9UrOsc9AAAAJ
  - [wekit-dev] がついてるがミス
- Ship: Block external protocol in sandboxed iframe.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-t-f7I6VvOI/m/Hu4J1brbDQAJ
- Ship: Make 'true' a truthy value for window.open boolean features
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ePJ4GE6VzVc/m/urs3-4rHDAAJ
- **Ship: Priority Hints**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WS_ZBvTyvM4/m/xi-Xl4u9DAAJ
- Ship: USBDevice forget()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pSM2W0TtKEI/m/LDcq9NhuAgAJ
- Ship: Region Capture
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eZE9LTJMUlk
- **Ship: hidden=until-found HTML attribute and beforematch event**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/e8n8Z5dzMs0
- Ship: MediaCapabilities API for WebRTC
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/loWlekYWswQ
- Ship: Capture handle
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TAsiU_Da-9g
- Ship: Origin Private File System extension: AccessHandle
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OR0poFdzEpo
- Ship: WebHID exclusionFilters option in requestDevice()

  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DPAaLnuaOH4

- Prototype and Ship: font-palette and custom @font-palette-values palettes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/clspafOtM4Y
- Prototype and Ship: WebUSB SameObject
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/F6oKfyeScYA/m/U8eZivGrAgAJ
- Prototype and Ship: Secure Payment Confirmation API V3
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sxZ4iCrdcb0
- Implement and Ship: CSS Values Level 4 Calc Simplification and Serialization
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LCDtbrKnH9M
- **Prototype: Cookie Expires/Max-Age attribute upper limit**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Pm7Or-u27js
- Prototype: Mediacapture-transform VideoTrackGenerator
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/npJUFM5Kn4Y/m/itP_KwFzAgAJ
- Prototype: Topics API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/59uTw_dxM3M/m/vF9lF9BVAgAJ
- Prototype: CSS object-view-box and object-overflow
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0ynSPqb-k04
- **Prototype: @scope**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/O2xZZT_xCZM
  - CSS Cascade Level 6 で追加される Scoped styles の実装
- **Protype: Back/Forward Cache NotRestoredReason API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/leFmfcpSOGM
- Prototype: Range API improvements for rendered text content
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3yKF8pW6r_k
- Experiment: MediaCapabilities API for WebRTC
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5RH1cu1UCfU
- Experiment: Capture handle
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fB3IZDgcoco/m/U1CUdsT_DAAJ
- Experiment: Federated Credentials Management (was WebID)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kws-gltC5us
- Experiment: First "Locally-Executed Decision over Groups" Experiment (FLEDGE)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0VmMSsDWsFg
- Experiment: Attribution Reporting API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jEnNpideO1Y
- Experiment: Topics API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oTwd6VwCwqs
- Extend Experiment: Region Capture
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZqndGb9e1wM
- Extend Origin Trial: WebGPU
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GD0shbDnFuM
- Extend Deprecation Trial: Restrict "private network requests" for subresources to secure contexts.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JPD001kqeck
- Ready for Trial: Increased max nesting level for setTimeout(0)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-TjeYs7shTQ
- **Prototype: HTMLPopupElement - `<popup>`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9y-Thg9UCxY
  - 2021/01 のスレッドへの update
  - 元々は `<popup>` 要素を I2P する予定だった
  - Open UI と議論して a11y の問題を解決した `popup` 属性で進める
  - ただし、 `<selectmenu>` がまだ依存してるので `<popup>` はまだ消さない
  - https://open-ui.org/components/popup.research.explainer
- Change:
- Unship:
- FYI BFCacheing pages with dedicated workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/M7EPNSrzidk/m/nhcNwpNmAAAJ
- Remove: Legacy Client Hint Mode
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PUymAUxfjVg/m/MqxeX7hAAAAJ
  - [wekit-dev] がついてるがミス
- PSA: Secure context fix for dedicated workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PakSG9HrEgo/m/4HGmFZcRBAAJ
- PSA: Enabling BroadcastChannel usage in opaque origin contexts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-Ph_KkAJ24U
- PSA: Updating Chrome's Structured-Fields implementation to match RFC8941
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/n2lseBPyYqk
  - SFV の実装を draft-15 でやっていたが RFC 準拠に直した
  - list と dict の間のセパレータに tab を許容するという小さいもの

#### V8

#### Other

- web.dev
  - **Interop 2022: browsers working together to improve the web for developers**
    - https://web.dev/interop-2022/
  - New to the web platform in February
    - https://web.dev/web-platform-02-2022/
  - Optimizing third-party script loading in Next.js
    - https://web.dev/script-component/
  - Building a loading bar component
    - https://web.dev/building-a-loading-bar-component/
- google developer blog
  - Google Developers Blog: Introducing the Google Forms API
    - https://developers.googleblog.com/2022/03/introducing-google-forms-api.html
- google developer japan blog
  - Google Developers Japan: Google Identity Services API による認可のサポートについてのお知らせ
    - https://developers-jp.googleblog.com/2022/03/google-identity-services-api.html
  - Google Developers Japan: Google Ads API v10 での RMF の更新
    - https://developers-jp.googleblog.com/2022/03/google-ads-api-v10-rmf.html
  - Google Developers Japan: Google Ads API v10 のお知らせ
    - https://developers-jp.googleblog.com/2022/03/google-ads-api-v10.html
  - Google Developers Japan: Chrome 99: CSS カスケード レイヤ、input 要素の新しいピッカーなど
    - https://developers-jp.googleblog.com/2022/02/chrome-99.html
- chrome developer blog
  - Progress in the Privacy Sandbox (January/February 2022)
    - https://developer.chrome.com/en/blog/progress-in-the-privacy-sandbox-2022-02/
  - It's always been you, Canvas2D
    - https://developer.chrome.com/en/blog/canvas2d/
  - User-Agent Reduction deprecation trial
    - https://developer.chrome.com/en/blog/user-agent-reduction-deprecation-trial/
  - Cookies Having Independent Partitioned State (CHIPS) origin trial
    - https://developer.chrome.com/en/blog/chips-origin-trial/
- chromium blog
  - Chromium Blog: A new speed milestone for Chrome
    - https://blog.chromium.org/2022/03/a-new-speed-milestone-for-chrome.html
  - Chromium Blog: How Chrome Became Highest Scoring Browser on Speedometer, Ever
    - https://blog.chromium.org/2022/03/how-chrome-became-highest-scoring.html
- canary

### Firefox 動向

#### Stable: 98.0.2

#### Updates

- Firefox 98.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/98.0/releasenotes/
- Firefox 98 for developers - Mozilla | MDN
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/98
    - `<dialog>`
    - `hyphenate-character`

#### Intents

- **Ship: WritableStreams and ReadableStream's pipeTo method**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ewGRRA4n3As
- Ship: WebAssembly exception-handling
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/8YQ-YKantdk
- **Prototype: content-visibility: hidden**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/kVs-TVhreWQ
- Prototype: WebAssembly tail calls
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/6BIXCsOmJk8
- Experiment:
- Change:
- Remove:
- Deprecate InstallTrigger
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/O8xtLi1W0Q8
- PSA: Theming changes on Nightly (for Firefox 100)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/LRc4tWKKHEg
- **SpiderMonkey Newsletter (Firefox 98-99)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/T3vH107vkuA
    - Contributors Rolf Glomsrud and Sigurd Sesta implemented Array grouping (Nightly-only).
    - Igalia implemented the Tuple.prototype methods from the Record and Tuple proposal (disabled by default).
- **Updates to standardization requirements for new features**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/fdrUZtYyOH0
  - 実装する機能をちゃんと標準化するためにも標準化するグループを明記せよ的な
- Firefox Security & Privacy Newsletter 2021 Q4
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/p6Mad1gtw7g

#### Other

- **A new year, a new MDN - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2022/03/a-new-year-a-new-mdn/
- **Mozilla and Open Web Docs working together on MDN - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2022/03/mozilla-and-open-web-docs-working-together-on-mdn/
- **Announcing Interop 2022 - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2022/03/interop-2022/
- Firefox Extension Helps Bring Movie Magic To Theaters Near You
  - https://blog.mozilla.org/en/products/firefox/extensions-addons/firefox-extension-helps-bring-movie-magic-to-theaters-near-you/
- The pandemic changed everything - even the way we use browser extensions
  - https://blog.mozilla.org/en/uncategorized/the-pandemic-changed-everything-even-the-way-we-use-browser-extensions/
- Latest Firefox Relay includes bigger attachment size and filters for promotional emails
  - https://blog.mozilla.org/en/mozilla/latest-firefox-relay-includes-bigger-attachment-size-and-filters-for-promotional-emails/
- Disney and Pixar's "Turning Red" movie Browser Wallpapers only available on Firefox for Android and iOS
  - https://blog.mozilla.org/en/products/disney-and-pixars-turning-red-movie-browser-mobile-wallpapers/
- Mozilla and the EFF publish letter about the danger of Article 45.2
  - https://blog.mozilla.org/en/security/mozilla-eff-cybersecurity-experts-publish-letter-on-dangers-of-article-452-eidas-regulation/
- How to make sure you aren't spreading misinformation online
  - https://blog.mozilla.org/en/internet-culture/spotting-misinformation-online/
- Documenting outages to seek transparency and accountability - Data@Mozilla
  - https://blog.mozilla.org/data/2022/03/09/mozilla-opens-access-to-dataset-on-network-outages/
- These Weeks in Firefox: Issue 110 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/02/24/these-weeks-in-firefox-issue-110/
- These Weeks In Firefox: Issue 111 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/03/11/these-weeks-in-firefox-issue-111/
- These Weeks In Firefox: Issue 112 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/03/24/these-weeks-in-firefox-issue-112/
- **The web is for everyone: Our vision for the evolution of the web**
  - https://blog.mozilla.org/en/mozilla/mozilla-webvision-future-of-web/
  - https://webvision.mozilla.org/full/
  - Mozilla これまでやってきた活動の方針などを改めて明文化した感じ
    - プライバシー、セキュリティ、暗号化
    - 新しい機能を安全に追加する
    - パフォーマンス、アクセシビリティ
    - 英語以外の言語を使う人にも
    - centralization, monetization については "What We Don't Know"
- **Introducing MDN Plus: Make MDN your own - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2022/03/introducing-mdn-plus-make-mdn-your-own/#countries
  - https://developer.mozilla.org/en-US/plus
  - MDN の有料サブスクサービス
  - Notification, Collections, Offline などの機能がつかえる
  - 無料, $5/月, $10/月の 3 プラン
  - 日本での展開はまだっぽい

### Safari 動向

#### Stable: 15.4

#### Updates

- Safari 15.4 Release Notes | Apple Developer Documentation
  - https://developer.apple.com/documentation/safari-release-notes/safari-15_4-release-notes
- **New WebKit Features in Safari 15.4**
  - https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/
  - HTML
    - lazyload
    - `<dialog>` & `::backdrop`
  - CSS
    - `:has()`
    - Cascade Layers
    - CSS Containment
    - svw, lvw, dvw
    - `:focus-visible`
    - `accent-color`
    - `calc()`
    - `font-palette`
    - `@font-palette-values`
    - text-decoration-skip-ink
    - `ic` unit
    - remove non-standard css
  - Web APIs
    - BroadcastChannel
    - Web Locks API
    - `scroll-behavior`
    - ResizeObserverSize
    - structuredClone
    - File System Access API
  - JavaScript
    - `findLast()` & `findLastIndex()`
    - `at()`
    - `Object.hasOwn()`
    - Intl Enumeration
    - Intl.Locale v2
    - Intl.DisplayNames v2
    - Intl.NumberFormat v2h3
  - Web Apps
    - Navigation Preload
  - Media
    - WebRTC perfect negotiation
    - `requestVideoFrameCallback()`
  - Privacy
    - Private Click Measurement
  - Security
    - CSP Lv3
    - 'strict-dynamic', 'unsafe-hashes', and 'report-sample'
  - WKWebView
    - Fullscreen API
  - Safari Web Extensions
  - Web Inspector
- **Release Notes for Safari Technology Preview 141**
  - https://webkit.org/blog/12434/release-notes-for-safari-technology-preview-141/
  - CSS
    - **Enabled support for overflow: clip (r288973)**
    - **Implemented CSS overscroll-behavior for asynchronous scrolling on macOS (r288777)**
  - JS
    - Added support for the WASM branch hinting proposal (r288758, r288761)
    - **Added support for the import assertion syntax behind a flag (r288473)**
  - WebAPI
    - **Implemented `AbortSignal.timeout()` (r289058)**
  - WebAuthn
    - Added authenticator attachment to PublicKeyCredential (r288622)
  - Content Security Policy
    - Implemented wasm-unsafe-eval (r289022)
- **Release Notes for Safari Technology Preview 142**
  - https://webkit.org/blog/12522/release-notes-for-safari-technology-preview-142/
  - Web Inspector
  - CSS Subgrid
    - **Enabled subgrid by default (r290111)**
    - Added accounting for subgrid margin, border, and padding when sizing (r290096)
    - Added support for parsing subgrid in grid-template-columns and grid-template-row (r289722)
    - Implemented getComputedStyle for subgrids (r289993)
  - CSS Container Queries
    - **Enabled CSS Container Queries by default (r290025)**
    - Added query container tracking so they can be invalidated on size change (r289457)
    - Added support for all size features (r289838)
    - Added support for full range notation in size queries (r290037)
    - Added support for range operators in size queries (r289789)
    - Changed size queries on unsupported axis to evaluate to unknown (r289890)
    - Implemented container name matching (r289617)
    - Implemented full query parser and evaluator (r289742)
    - Implemented inline-size containment (r289466)
    - Implemented container shorthand serialization (r289886)
    - Matched container queries correctly in non-rendered subtrees (r290205
  - CSS
    - Enabled CSS Motion Path by default (r290071)
    - **Enabled overscroll-behavior by default (r289683)**
  - Web Animations
    - Enabled the KeyframeEffect.composite property (r290067)
    - Added composite accumulation support for transform properties (r289599)
    - Added support for logical properties in JS-originated animations (r289216)
    - Aligned animations with different, but compatible, frameRate values (r290121)
    - Allowed setting frameRate as an option passed to Element.animate() (r290123)
    - Allowed setting frameRate as an option passed to document.timeline.animate() (r290125)
    - Implemented parsing and animation support for offset shorthand (r289876)
  - Rendering
  - Forms
    - Changed input elements to return an empty string for an invalid floating-point number that ends with "." (r290124)
  - JavaScript
    - **Enabled Shadow Realms support by default (r290119)**
    - Implemented Temporal.PlainDate behind a flag: `__XPC_JSC_useTemporal=1` (r290209)
  - Shared Workers
    - Added support for sharing Shared Workers (including across WebProcesses) (r289247)
  - Workers
  - Dialog Element
  - Web API
    - Added support for both versions of ScreenCaptureKit API (r289547)
  - Experimental Model Element
    - Improved sizing on macOS (r289495)
  - Web Extensions
    - Added support for the `browser.action.openPopup()` and `browser.browserAction.openPopup()` API to open the extension popup for a specific window (this is a WECG proposal)
    - Added support for the optional_host_permissions manifest key in manifest_version 3 extensions (this is a WECG proposal)
    - Added support for browser.runtime.getFrameId() so it easier to get frame identifiers from content scripts (this is a WECG proposal)
    - Added support for the frameId option that can be passed to browser.tabs.sendMessage()
- **Working together on Interop 2022**
  - https://webkit.org/blog/12288/working-together-on-interop-2022/
  - 以下に focus
  - Cascade Layers
  - Color Spaces and Functions
  - Containment
  - Dialog Element
  - Form Fixes
  - Scrolling
  - Subgrid
  - Typography and Encodings
  - Viewport Units
  - Web Compat

#### Position

- **[webkit-dev] Request for position on FedCM (was WebID)**
  - https://lists.webkit.org/pipermail/webkit-dev/2022-March/032153.html
  - > We are generally supportive and interested in working together to make this coexist well with passkeys.

#### Other

- Taming CSS Variables with Web Inspector
  - https://webkit.org/blog/12303/css-variables-web-inspector/

### Edge 動向

#### Stable: 99

#### Updates

- Improving DevTools together: Announcing the new Edge DevTools feedback repository
  - https://blogs.windows.com/msedgedev/2022/03/09/improving-devtools-together-announcing-the-new-edge-devtools-feedback-repository/
- **Microsoft Edge and Interop 2022**
  - https://blogs.windows.com/msedgedev/2022/03/03/microsoft-edge-and-interop-2022/
- **Appears to say: Microsoft Edge now provides auto-generated image labels**
  - https://blogs.windows.com/msedgedev/2022/03/17/appears-to-say-microsoft-edge-auto-generated-image-labels/
  - Edge で alt のない画像の alt を Cognitive の Computer Vision API で自動生成
  - Computer Vision API でできること
  - https://westcentralus.dev.cognitive.microsoft.com/docs/services/computer-vision-v3-2/operations/56f91f2e778daf14a499f21b
    - face detection
    - dominant, accent color estimation
    - catogorizing
    - describing english sentences
    - etc
  - 対象外
    - decorative image (alt が空、 role=presentation)
    - 50x50 未満の画像
    - 大きすぎる画像
    - 性的な画像
- **Internet Explorer 11 デスクトップ アプリケーションのサポート終了 - 発表に関連する FAQ のアップデート - Windows Blog for Japan**
  - https://blogs.windows.com/japan/2022/02/21/internet-explorer-11-desktop-app-retirement-faq/
  - 2022 年 6 月 15 日に提供終了した後には、IE11 はサポートの提供が終了となります。日本を除くすべての国のユーザーは、2022 年 6 月 15 日以降から Microsoft Edge への移行が開始されます。

#### Chakra

#### Other

- Edge/Chrome Policy Registry Entries - text/plain
  - https://textslashplain.com/2022/03/22/edge-chrome-policy-registry-entries/

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - Autoplay Policy Detection
    - https://www.w3.org/TR/2022/WD-autoplay-detection-20220315/
- Chartering
  - HTML Working Group Charter extended until 30 April 2022
    - https://lists.w3.org/Archives/Public/public-html/2022Mar/0000.html

#### Other

- **Add the `<search>` element by domenic · Pull Request #7320 · whatwg/html**
  - https://github.com/whatwg/html/pull/7320
  - `role=search` に対応する要素がないため `<search>` を追加する
- **The WHATWG Blog - Retro-specifying fetch/performance**
  - https://blog.whatwg.org/retro-specifying-fetch-performance
  - Fetch / Performance API / HTML など仕様が別れている実装の非互換を解消するために取り組む
    - preload の挙動
    - Link ヘッダの処理
- Making WebViews work for the Web | W3C Blog
  - https://www.w3.org/blog/2022/03/making-webviews-work-for-the-web/
  - WebViews Community Group

### TC39 動向

#### Meeting

- 2021-03
  - https://github.com/tc39/agendas/blob/main/2022/03.md
  - 明日から開催
  - Array Grouping Status Update
  - Resizable buffers normative changes for TA#set and TA#subarray
  - Temporal update and normative changes
  - ShadowRealms Updates
  - Destructuring Private Fields for Stage 3
  - RegExp set notation + Unicode properties of strings for Stage 3
  - Change Array by Copy for Stage 3
  - Bikeshedding pipe operator's topic token
  - **Decorators for Stage 3**
  - Bikeshedding call-this syntax
  - **Pattern matching for Stage 2**
  - String.dedent Status Update
  - Units Conversion For stage 1 slides
  - Intl.MessageFormat for Stage 1
  - **Function.prototype.once for Stage 1**
  - **Types as Comments for Stage 1**

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2022-01-03}...main@{2022-02-04}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->3
- 3->4

#### New Proposals

- **Types as Comments**
  - https://github.com/giltayar/proposal-types-as-comments/
  - TS のような型アノテーションをコメントとして無視する提案
  - JSDoc では表現力に限界があるし冗長
  - ランタイムがチェックすることは目的とせず、トランスパイルを無くす目的
- Function.prototype.once for JavaScript
  - https://github.com/js-choi/proposal-function-once
  - 一回だけ実行できて、それ以降評価されない関数

#### Other

### IETF 動向

#### WG

- IETF
  - IETF | IETF 113 Vienna and Online
    - https://www.ietf.org/how/meetings/113/
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - draft-wood-httpbis-ech-coalescing-00 - HTTP Connection Reuse Based on TLS Encrypted ClientHello
    - https://datatracker.ietf.org/doc/draft-wood-httpbis-ech-coalescing/
- quicwg
  - https://github.com/quicwg/wg-materials/blob/main/ietf113/agenda.md
  - https://github.com/quicwg/wg-materials/blob/main/ietf113/minutes.md
  - QUIC Version Negotiation
    - https://github.com/quicwg/wg-materials/blob/main/ietf113/quic-vn.pdf
  - QUIC-LB Update
    - https://github.com/quicwg/wg-materials/blob/main/ietf113/quic-lb.pdf
  - QUIC V2
    - https://github.com/quicwg/wg-materials/blob/main/ietf113/quic-v2.pdf
  - Multipath extension for QUIC
    - https://github.com/quicwg/wg-materials/blob/main/ietf113/IETF-113%20-%20Multipath%20extension%20for%20QUIC.pdf
  - qlog structured event logging the Superman update
    - https://github.com/quicwg/wg-materials/blob/main/ietf113/qlog.pdf
  - draft-ietf-quic-qlog-quic-events-01 - QUIC event definitions for qlog
    - https://datatracker.ietf.org/doc/draft-ietf-quic-qlog-quic-events/
  - draft-ietf-quic-qlog-h3-events-01 - HTTP/3 and QPACK qlog event definitions
    - https://datatracker.ietf.org/doc/draft-ietf-quic-qlog-h3-events/
  - draft-kuhn-quic-bdpframe-extension-00 - BDP Frame Extension
    - https://datatracker.ietf.org/doc/draft-kuhn-quic-bdpframe-extension/
  - draft-kuhn-quic-careful-resume-00 - Carefully Resume QUIC Session
    - https://datatracker.ietf.org/doc/draft-kuhn-quic-careful-resume/
  - draft-banks-quic-cibir-01 - QUIC Connection ID Based Initial Routing
    - https://datatracker.ietf.org/doc/draft-banks-quic-cibir/
  - draft-taps-quic-mapping-00 - A Transport Services Mapping for QUIC
    - https://datatracker.ietf.org/doc/draft-taps-quic-mapping/
- webtrans
  - https://github.com/tlswg/wg-materials/blob/master/ietf113/agenda.md
  - 1. Preliminaries, Chairs (10 minutes)
  - 2. W3C WebTransport Update, Will Law (5 minutes)
  - 3. WebTransport over HTTP/3, Victor Vasiliev (45 minutes)
  - 4. WebTransport using HTTP/2, Eric Kinnear (45 minutes)
  - 5. Hums, Wrap up and Summary, Chairs & ADs (15 minutes)
- tlswg
  - https://github.com/tlswg/wg-materials/blob/master/ietf113/agenda.md
  - https://notes.ietf.org/notes-ietf-113-tls
    - cTLS
    - RFC8447bis
    - Secure Negotiation of Incompatible Protocols in TLS
    - Hybrid key exchange in TLS 1.3 (Note that this may shift to the end of the meeting to accommodate presenter availability.)
    - ECH update
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

### CDN 動向

#### Cloudflare

- Unlocking QUIC's proxying potential with MASQUE
  - https://blog.cloudflare.com/unlocking-quic-proxying-potential/
- **DNSSEC issues take Fiji domains offline**
  - https://blog.cloudflare.com/dnssec-issues-fiji/
  - DNSSec の設定ミスでフィジーのドメインが全て落ちた
- **Announcing experimental DDR in 1.1.1.1**
  - https://blog.cloudflare.com/announcing-ddr-support/
  - DoH, DoT をサポートしているかを知るためのプロトコル
- **Internet traffic patterns in Ukraine since February 21, 2022**
  - https://blog.cloudflare.com/internet-traffic-patterns-in-ukraine-since-february-21-2022/
  - ウクライナでのトラフィック解析
- **iCloud Private Relay: information for Cloudflare customers**
  - https://blog.cloudflare.com/icloud-private-relay/
  - Apple の Private Relay の一部は Cloudflare のインフラだった
  - Ingress は Apple で Egress は Cloudflare
- HPKE: Standardizing public-key encryption (finally!)
  - https://blog.cloudflare.com/hybrid-public-key-encryption/

#### Fastly

- Business continuity amid the invasion of Ukraine | Fastly
  - https://www.fastly.com/blog/business-continuity-amid-the-invasion-of-ukraine

#### Other

- **Akamai Blog | Powering and Protecting Online Privacy: iCloud Private Relay and Information for Akamai Customers**
  - https://www.akamai.com/blog/cloud/powering-and-protecting-online-privacy-icloud-private-relay

### セキュリティ動向

- **Validate all the things: improve your security with input validation! | The GitHub Blog**
  - https://github.blog/2022-03-21-validate-all-things-input-validation/
- **Trusted Types rollouts - w3c**
  - https://gadgets.kotowicz.net/poc/Trusted%20Types%20rollouts%20-%20w3c.pdf
  - Meta, MS, Google による Trusted Types の deploy report
- SoK: SCT Auditing in Certificate Transparency
  - https://arxiv.org/abs/2203.01661

### 周辺動向

- **Open Web Advocacy**
  - https://open-web-advocacy.org/
  - Apple が iOS 上でのブラウザエンジンを webkit に限定していることを批判
  - CMA に対して事態を説明する機会があるため、コメントを集めている
- Coinhive 事件最高裁解説 後編 @IT
  - https://atmarkit.itmedia.co.jp/ait/articles/2203/01/news005.html
- Microsoft Internet Explorer 11.0 および Firefox のサポート終了について - PayPay 銀行
  - https://www.paypay-bank.co.jp/news/2022/0307.html
  - https://www.paypay-bank.co.jp/spec/index.html
  - Windows 10
    - Microsoft Internet Explorer 11.0
    - Microsoft Edge 最新版
    - Google Chrome 最新版
    - Firefox 最新版
  - macOS 10.15
    - 標準の Safari のみ
  - サポートが減るのは Win10 のみで macOS は最初から Safari のみ
  - 「Firefox」サポートしないサービス続々 国内シェア今や 6%足らずに: J-CAST トレンド
    - https://www.j-cast.com/trend/2022/03/26433910.html
- **Interop 2022**
  - Interop 2022: browsers working together to improve the web for developers
    - https://web.dev/interop-2022/
  - Announcing Interop 2022 - Mozilla Hacks - the Web developer blog
    - https://hacks.mozilla.org/2022/03/interop-2022/
  - Working together on Interop 2022
    - https://webkit.org/blog/12288/working-together-on-interop-2022/
  - Microsoft Edge and Interop 2022
    - https://blogs.windows.com/msedgedev/2022/03/03/microsoft-edge-and-interop-2022/
  - Igalia and Interop 2022 | Igalia
    - https://www.igalia.com/news/interop2022.html
  - Bocoup and Interop 2022 - web standards - Bocoup
    - https://bocoup.com/blog/interop-2022
- **Why the World Must Resist Calls to Undermine the Internet - Internet Society**
  - https://www.internetsociety.org/blog/2022/03/why-the-world-must-resist-calls-to-undermine-the-internet/
  - ロシアをインターネットから隔離すべきという主張をすべき人がいる
  - しかし、それはインターネットの基本的な部分を見落としている
  - そもそもインターネットは国境を尊重するような作りではない
  - アクセスする権利を選ぶようなことはしない、インターネットは全ての人のためのものだ
- **ロシア情勢が Web / Internet / Tech に与えた影響の記録 2022 年 3 月**
  - https://zenn.dev/jxck/scraps/80c3e1c272c02b
  - まとめてみたらキリがなかった

### イベント

- 3 月
  - 19-25: IETF | IETF 113 Vienna
    - https://www.ietf.org/how/meetings/113/
  - 28-31: 89th meeting of Ecma TC39
    - https://github.com/tc39/agendas/blob/main/2022/03.md
- 4 月
- 5 月
  - 11-12: Google I/O
    - https://io.google/2022/
  - 17-18: BlinkOn 16
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/tvOHmMflQy4/m/c5NXpLFoAgAJ
  - 26: SecWeb Workshop 2022
    - https://secweb.work/2022.html

### Wrap Up

- Chrome
  - 99
    - Cascade Layers
    - showPicker()
  - 100
    - UA reduction deprecation trial
    - AbortSignal.throwIfAborted()
    - Capability Delegation
  - Ship
    - Priority Hints
    - `hidden=until-found` / beforematch
  - Prototype
    - Cookie age upper limit
    - `@scope`
    - bfcache NotRestoredReason API
    - update on Popup API
  - web.dev
    - Interop 2022
- Firefox
  - 98
    - `<dialog>`
  - Ship
    - `pipeTo()`
  - Prototype
    - `content-visibility: hidden`
  - Other
    - Tuple implementation by Igalia
    - Exposure guidelines update on standardization venue
    - MDN redesign
    - MDN and Open Web Docs
    - MDN Plus
    - Web Vision
    - Interop 2022
- Safari
  - 15.4
    - lazyload
    - `<dialog>`
    - `:has()`
    - Cascade Layers
    - `svw`, `lvw`, `dvw`, etc.
    - `:focus-visible`
    - BroadCastChannel
    - `findLast()`/`findLastIndex()`
    - `hasOwn()`
    - `at()`
    - CSP Level 3
  - TP 141
    - `overscroll-behavior`
    - `AbortSignal.timeout()`
  - TP 142
    - Subgrid
    - Container Queries
  - Position Request
    - positive on FedCM
  - Other
    - Interop 2022
- Edge
  - Interop 2022
  - Cognitive API で alt の自動生成
  - IE11 から Edge への強制移行が「日本を除く」になってる
- W3C/WHATWG
  - Add `<search>` element to html
- TC39
  - 2021/3 の Meeting が盛り上がりそう
    - Decorators for Stage 3
    - Pattern Matching for Stage 2
    - Types as Comments for Stage 1
    - - IETF
  - IETF | IETF 113 Vienna and Online
- CDN 動向
  - Cloudflare
    - DDR サポート on 1.1.1.1
    - ウクライナのトラフィック解析
    - iColud Private Relay の Egress を担当している話
  - Akamai
    - iColud Private Relay の Egress を担当している話
- セキュリティ動向
  - Meta, MS, Google による Trusted Types の Rollout Report
  - SCT Auditing の Paper
- 周辺動向
  - Open Web Advocay
  - PayPay 銀行 Firefox サポート終了
  - Interop 2022 の各社ブログ
  - Internet Society の「国境でアクセスを弾いたりしない」
  - ロシア情勢が Web/Internet/Tech に与えた影響の記録 2022 年 3 月
