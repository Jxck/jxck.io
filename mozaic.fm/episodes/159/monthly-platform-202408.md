---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep159.mp3
published_at: 2024-08-30
guest: [@myakura](https://twitter.com/myakura)
---

# ep159 Monthly Platform 202408

## Theme

第 159 回のテーマは 2024 年 8 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 128

#### Updates

- **New in Chrome 128**
  - https://developer.chrome.com/blog/new-in-chrome-128
  - Line breakable `<ruby>`
  - Promise.try
  - PointerEvent.deviceProperties for multi-pen inking
- What's new in DevTools, Chrome 128
  - https://developer.chrome.com/blog/new-in-devtools-128
- What's New in WebGPU (Chrome 128)
  - https://developer.chrome.com/blog/new-in-webgpu-128
- **Chrome 129 beta**
  - https://developer.chrome.com/blog/chrome-129-beta
  - CSS
    - CSS `interpolate-size` property and `calc-size()` function
    - Rename CSS anchor positioning `inset-area` to `position-area`
    - CSS Anchor Positioning: Unwrapped `inset-area()`
    - Update CSS `backdrop-filter` to use mirror edgeMode
  - Web APIs
    - Blob support in WebRTC data channels
    - Compute Pressure WebDriver extension commands
    - Intl.DurationFormat
    - Private Aggregation API: client-side contribution merging
    - `scheduler.yield()`
    - Web Authentication API: JSON serialization methods
    - WebGPU extended range (HDR) support
  - Origin trials in progress
    - FileSystemObserver interface
  - Deprecations and removals
    - Deprecate 0.0.0.0 for Private Network Access
    - Remove the includeShadowRoots argument on DOMParser
    - Remove non-standard declarative shadow DOM serialization
    - Remove `PointerEvent.getCoalescedEvents()` from insecure contexts

#### Intents

- Ship: Document picture-in-picture: add option to ignore window bounds cache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hRY1bb-WlsQ
- **Ship: Intl.DurationFormat**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lnv7whm5mXY
- Ship: Protected Audience: Real Time Monitoring API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9_dR-BdyeWE
- **Ship: Support non-special scheme URLs**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/svzicLXbKjw
- **Ship: The Nested Declarations Rule**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Do1Xyu-PzyU
  - CSS Nesting の hoisting 問題を解決する仕様変更
  - hoist せず書いたままの順序を維持する
- Ship: Web Share API (Windows & Chrome OS)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fJ8n9kTbna4
- Ship: scheduler.yield()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DHgWeqFOCXQ
- Ship: meter element fallback styles
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UquTxWTNON0/m/VD_-AWz6AwAJ
- **Ship: Direct Sockets API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5R0P_aYBWQI
  - Isolated Web Apps にのみ展開
- **Ship: FedCM (was WebID)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/URpYPPH-YQ4
  - 古いスレへの Chrome FedCM チームの人の追記
  - 「3rd Party Cookie 色々あったけど FedCM の作業は続けていく」というアナウンス
  - 今 FedCM は Chrome ページロードの 1 % で使われている
- Ship: CSS Container Queries flat tree lookup
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FF4xfC2wLJk
- Ship: Private Aggregation API: client-side contribution merging
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HoHdbB9ageE
- Ship: Update the syntax of `text-wrap` to match the new spec
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/x4x_38sJhbk
- Ship: Web Serial: connected attribute and RFCOMM connection events
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KPN62vo5Pp4
- Ship: relaunch Intl Locale Info feature in newly added functions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EJpu62XE_Ss
- Ship: WebGPU: Dual source blending
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/C3VH1EMrs1Y
- **Ship: Compression dictionary transport with Shared Brotli and Shared Zstandard**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MuaRf28nExk
- Ship: Add bugfix version number to User-Agent string on Bling
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/48CxiznVeaI
- Ship: Shared Storage: Allowing Cross-Origin Script in addModule & Aligning createWorklet
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CBZUoaQEgRU
- Ship: allow more `pseudo-elements` and `pseudo-classes` after `::part()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RVTu-WnJKeo
- Implement & Ship: Transferable RTCDataChannel to dedicated workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8CZbYcvQJAY
- **Prototype: CSS Gap Decoration**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MOZHKdD61uI
- Prototype: Dynamic import maps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/t1AdHiN2Rkc
- Prototype: RTCDataChannel.priority
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qv7tEKGuYPg
- **Prototype: Summarizer API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rCpcU0ZTgTk
  - AI を用いて要約するための API
- Prototype: WebXR/WebGPU integration
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wOQs_vVnKRo
- **Prototype: Writer API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/U_4jtNS4aDY
  - AI でのテキスト生成
- **Prototype: Rewriter API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9qR53S0QCbE
  - AI での入力テキストのリライト
- **Prototype: View transitions: layered capture**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aQEthoSSmzo
- Prototype: Realms Initialization Control
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-mdLv7f_ZN4
- **Experiment: Reduce Accept-Language**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YTn8pqJDVBg
  - Fingerprint 対策のため送るのを単一言語に減らす
  - M128 - 131 で Finch 1 % を予定
  - WebKit は Ship 済み
  - バイリンガルなどが不便になる可能性もあるので反対も
  - https://github.com/explainers-by-googlers/reduce-accept-language/issues/10
- Experiment: Mesh2D Canvas API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yhrE2sIg3j8
- **Experiment: Language Detector API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XTy-FmWjW3g
- Experiment: WebAuthn attestationFormats
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lLJJ74EiDxY
- Prototype: Web Authentication API: PublicKeyCredential's getClientCapabilities() method
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Wb8VjXe_zT8
- Extend Experiment: Captured Surface Control
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/K5qB1kT6KBs
- Change:
- Unship:
- Remove:
- Deprecate and Remove: Remove CanvasRenderingContext2D method scrollPathIntoView
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7q_9PrtkWgI
- Deprecate and Remove: Remove expectedImprovement in DelegatedInkTrailPresenter
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Gtbh2fkpdxI
- PSA: Throw exception when text encode alloc memory fail.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/duKL2xRvIaw
- Reminder: Registration for BlinkOn 19 is open!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZDd5jSxXmPQ
- Ready for Developer Testing: relaunch Intl Locale Info feature in newly added functions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fIZhzp4AWbk
- Ready for Developer Testing: Escape "" and "" in attributes on serialization
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2mZ02nk2cxU
- Ready for Developer Testing: Future browsing context group dependency hint
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/31sMpCYJ0RU
- Web-Facing Change PSA: Concurrent Smooth scrollIntoViews
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vnEtycmNGM4

#### Other

- web.dev
  - Interop 2024: Chrome at 100% for the accessibility focus area
    - https://web.dev/blog/interop-2024-a11y
  - Now in Baseline: animating entry effects
    - https://web.dev/blog/baseline-entry-animations
  - Choose the right image format
    - https://web.dev/articles/choose-the-right-image-format
  - Browser-level image lazy loading for the web
    - https://web.dev/articles/browser-level-image-lazy-loading
  - It's time to lazy-load offscreen iframes!
    - https://web.dev/articles/iframe-lazy-loading
  - Common misconceptions about how to optimize LCP
    - https://web.dev/blog/common-misconceptions-lcp
  - Allow passkey reuse across your sites with Related Origin Requests
    - https://web.dev/articles/passkey-related-origin-requests
- google for developers
  - https://developers.googleblog.com/
- google developer japan blog
  - Google Developers Japan: Chrome が Speedometer 3 史上最高スコアを達成
    - https://developers-jp.googleblog.com/2024/08/chrome-speedometer-3.html
  - Google Developers Japan: Windows 版 Chrome で Cookie のセキュリティを向上させる
    - https://developers-jp.googleblog.com/2024/08/improving-security-of-chrome-cookies-on.html
- chrome developer blog
  - **Beyond regular expressions: Enhancing CSS value parsing in Chrome DevTools**
    - https://developer.chrome.com/blog/devtools-css-value-parsing
  - Automation with WebDriver BiDi now available on BrowserStack
    - https://developer.chrome.com/blog/webdriver-bidi-support-in-browserstack
  - **Participate in the Chrome built-in AI experiment**
    - https://developer.chrome.com/blog/august2024-built-in-ai
  - **Passkeys UX updates on Chrome on Android**
    - https://developer.chrome.com/blog/passkeys-on-credential-manager
  - WebDriver BiDi production-ready in Firefox, Chrome and Puppeteer
    - https://developer.chrome.com/blog/firefox-support-in-puppeteer-with-webdriver-bidi
  - Scroll Snap Events
    - https://developer.chrome.com/blog/scroll-snap-events
  - Gemini Nano summarization API available for early preview
    - https://developer.chrome.com/blog/august2024-summarization-ai
  - The File System Observer API origin trial
    - https://developer.chrome.com/blog/file-system-observer
  - Improving the performance of Chromium accessibility
    - https://developer.chrome.com/blog/chromium-accessibility-performance
  - 4 ways to capture screenshots with DevTools
    - https://developer.chrome.com/blog/devtools-tips-33
- chromium blog
  - **Chromium Blog: Seamlessly use your passwords and addresses in Chrome across all devices**
    - https://blog.chromium.org/2024/08/seamlessly-use-your-passwords-and.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - **Google Online Security Blog: Improving the security of Chrome cookies on Windows**
    - https://security.googleblog.com/2024/07/improving-security-of-chrome-cookies-on.html
    - Cookie がマルウェアから盗まれないように、 macOS は Keychain, Linux は kwallet などで保護している
    - Windows は DPAPI があるが、ログインユーザで実行された他のアプリからも盗むことができてしまう
    - App-Bound Encryption により、 Keychain のように App ID が一致(つまり Chrome から)しないと読めないようにする
    - Chrome 127 の Cookie から順に Password や Payment にも適用していく
  - **Google Online Security Blog: Post-Quantum Cryptography: Standards and Progress**
    - https://security.googleblog.com/2024/08/post-quantum-cryptography-standards.html
    - NIST が PQC(Post Quantum Cryptography) の策定を完了
    - ML-KEM
      - Module-Lattice Key Encapsulation Mechanism
    - ML-DSA
      - Module-Lattice Digital Signature Algorithm
    - SLH-DSA
      - Stateless Hash-based Digital Signature Algorithm
    - 公開鍵のカプセル化とデジタル署名二つ
    - 今後移行を進めていく
- search blog
  - Introducing recommendations in Google Search Console
    - https://developers.google.com/search/blog/2024/08/search-console-recommendations
  - What to know about our August 2024 core update
    - https://developers.google.com/search/blog/2024/08/august-2024-core-update
- v8
  - https://v8.dev/
- Other
  - **米司法省がグーグル分割要求を検討、独禁法訴訟で勝訴後－関係者 - Bloomberg**
    - https://www.bloomberg.co.jp/news/articles/2024-08-13/SI6BZ7T1UM0W00
  - **Chrome iOS Browser on Blink | Gyuyoung Weblog**
    - https://blogs.igalia.com/gyuyoung/2024/08/08/chrome-ios-browser-on-blink/
    - iOS 版の Chromium Chrome のアーキテクチャなどについて
  - **【Chrome】128 アップデートでフォントが変わった・太字になる問題の詳細と対処(2024 年版) | SBAPP**
    - https://sbapp.net/appnews/iphone/google/128update-font-161460
    - [User Feedback - Stable] M128 Desktop - Chinese and Japanese fonts are bold [361595063] - Chromium
      - https://issues.chromium.org/issues/361595063
  - **ブラウザはどのようにしてテキストを描画しているのか?――Chromium にみるテキスト描画の深淵 - Google Slides**
    - https://docs.google.com/presentation/d/1-OyytTBfOI9vs22Xbqx3PkvUcnFQEJEOWKiJzh1h_RY/edit

### Firefox 動向

#### Stable: 129

#### Updates

- **Firefox 129.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/129.0/releasenotes/
  - HTTPS デフォルト化
  - HTTPS RR レコード
  - コミュニティコントリビューターに Masataka Yakura
- **Firefox 129 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/129
  - @starting-style / transition-behavior
  - Float16Array
- Firefox Sidebar and Vertical tabs: try them out in Nightly Firefox Labs 131 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2024/08/07/firefox-sidebar-and-vertical-tabs-try-them-out-in-nightly-firefox-labs-131/
- Streamline your screen time with auto-open Picture-in-Picture and more - These Weeks in Firefox: Issue 166 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2024/08/26/streamline-your-screen-time-with-auto-open-picture-in-picture-and-more-these-weeks-in-firefox-issue-166/

#### Intents

- **Ship: Web Codec API**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ax5NcNNgGwY/m/U2zzLK26AAAJ
- **Ship: `PointerEvent.altitudeAngle` and `PointerEvent.azimuthAngle`**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/oK7Bbp71RyA
- Ship: WebAssembly exception-handling (V2)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/3RviH3g05wg
- Ship: JSON.parse with source
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/03kWslwFO6U
- **Prototype: Network Error Logging**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/aJgS0vUCYAE
- **Prototype: View Transitions Module Level 1**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/l4g8JgaBPPw
- Change:
- Remove:
- Unship: overflow/underflow events
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/tSWGtR7_YJA
- **Intent-to-prototype: Text fragments**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/1F1vsI0Q1dI/m/LrCGgCuFDgAJ
  - フォローアップで Nightly だけではなくすべてのチャンネルで有効にした
  - 実質 I2S

#### Newsletter

- Performance Testing Newsletter (Q2 Edition) + MozWeek Workshops
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/RhGBFIbhPwg/m/oCiOllCQAgAJ
- Firefox WebDriver Newsletter 129 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-129/
- Geckodriver 0.35.0 Released - Firefox Developer Experience
  - https://fxdx.dev/geckodriver-0-35-0-released/
- Engineering Effectiveness Newsletter (June & July 2024 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/XpUafEc-ATk

#### MDN / Open Web Docs

- Exclusive accordions using the HTML details element | MDN Blog
  - https://developer.mozilla.org/en-US/blog/html-details-exclusive-accordions/
- How to debug mobile apps across devices | MDN Blog
  - https://developer.mozilla.org/en-US/blog/debug-mobile-apps-across-devices/

#### Standard Position

- 今月 Close された Issue と PR ものをみる
  - https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2024-08-01+
  - Positive
    - [css-sizing-4] `stretch` keyword for sizing properties · Issue #1054 · mozilla/standards-positions
      - https://github.com/mozilla/standards-positions/issues/1054
    - Backdrop filter mirror edgeMode · Issue #1051 · mozilla/standards-positions
      - https://github.com/mozilla/standards-positions/issues/1051
    - Transferable MediaStreamTrack (Media Capture and Streams Extension) · Issue #1044 · mozilla/standards-positions
      - https://github.com/mozilla/standards-positions/issues/1044
    - CSS Anchor Positioning · Issue #794 · mozilla/standards-positions
      - https://github.com/mozilla/standards-positions/issues/794

#### Other

- Mozilla's Decision on Entrust's Root CA Certificates used for TLS
  - https://www.mail-archive.com/dev-security-policy@mozilla.org/msg01763.html
- **Announcing Official Puppeteer Support for Firefox - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2024/08/puppeteer-support-for-firefox/
- Browsers, cookies and surfing the web: The quirky history of internet lingo
  - https://blog.mozilla.org/en/internet-culture/history-of-internet-terms/
- **Mozilla wants you to love Firefox again - Fast Company**
  - https://www.fastcompany.com/91167564/mozilla-wants-you-to-love-firefox-again
- **Shared post - Mozilla Faces Financial Uncertainty After Google Loses Lawsuit**
  - https://lunduke.locals.com/post/5985554/mozilla-faces-financial-uncertainty-after-google-loses-lawsuit

### Safari 動向

#### Stable: 17.6

#### Updates

- Release Notes for Safari Technology Preview 200 🎉 | WebKit
  - https://webkit.org/blog/15779/release-notes-for-safari-technology-preview-200/
  - Implemented Uint8Array.prototype.toHex in SIMD. (280719@main) (131249821)
- Release Notes for Safari Technology Preview 201 | WebKit
  - https://webkit.org/blog/15790/release-notes-for-safari-technology-preview-201/
  - Added auxclick event support for Pointer Events. (281169@main) (25988904)
  - Added support for text-underline-position: left and text-underline-position: right. (281446@main) (130621143)
  - Added auxclick event support for Pointer Events. (281169@main) (25988904)
- **Release Notes for Safari Technology Preview 202 | WebKit**
  - https://webkit.org/blog/15798/release-notes-for-safari-technology-preview-202/
  - Accessibility
  - CSS
    - Added support for `background-clip: border-area`. (282202@main) (133788384)
    - Added support for `line-fit-edge` and updated `text-box-edge`. (282228@main) (133834296)
    - Added support for the `text-box` shorthand. (282282@main) (133942602)
    - Added support for `ruby-align`. (282106@main) (133656625)
    - Added support for unprefixed `ruby-position`. (281804@main) (86128259)
    - Added support for `scrollbar-width`. (282068@main) (133019206)
    - Added support for view transition types. (282344@main) (133610087)
    - Added support for the `shape()` function. (281924@main) (133322584)
    - Added support for `closest-corner` and `farthest-corner` in circle and ellipse shapes. (281808@main) (132936677)
    - Added support for the `color-layers()` function. (282334@main) (134013898)
    - Added support for `@property <string>` syntax. (281872@main) (133250776)
    - Added support for `::target-text`. (282356@main) (134010063)
    - Added support for `@page` margin descriptors. (282048@main) (118773100)
    - Added support for jis-b4 and jis-b5 sizes for `@page`. (281814@main) (133138325)
  - Editing
  - JavaScript
    - Implemented Float16Array. (281870@main) (109883982)
    - Added support for firstDayOfWeek for Intl.Locale info API. (281510@main) (132731533)
    - Enabled Base64 and Hex features. (281910@main) (133312461)
    - Added support for type reflection for WebAssembly.Module.imports and WebAssembly.Module.exports. (281974@main) (133429946)
  - Media
  - Rendering
  - SVG
  - Web Animations
  - Web API
    - Added support for the getPredictedEvents API to PointerEvent. (281756@main) (117767174)
    - Added support for Scroll To Text Fragment Generation. (282379@main) (131712706)
    - Added support for altitudeAngle and azimuthAngle to PointerEvent. (282017@main) (131974392)
    - Added support for the getCoalescedEvents API to PointerEvent. (281520@main) (132210576)
  - Web Assembly
    - Added support for JIT-less Wasm. (281726@main) (113768974)
    - Added support for garbage collection. (281975@main) (126103011)
    - Added support for Wasm Tail Calls. (281716@main) (131410516)
  - WebDriver

#### Standard Positions

- 今月 Close されたものをみる
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2024-08-01+
  - Positive
    - Add a noopener-allow-popups value to COOP · Issue #360 · WebKit/standards-positions
      - https://github.com/WebKit/standards-positions/issues/360
    - CSS query container flat tree lookup · Issue #382 · WebKit/standards-positions
      - https://github.com/WebKit/standards-positions/issues/382
    - CSS same-origin cross-document view-transition · Issue #193 · WebKit/standards-positions
      - https://github.com/WebKit/standards-positions/issues/193
    - **SVG favicons · Issue #367 · WebKit/standards-positions**
      - https://github.com/WebKit/standards-positions/issues/367
    - The pageswap event (part of cross-document view-transitions) · Issue #313 · WebKit/standards-positions
      - https://github.com/WebKit/standards-positions/issues/313
    - View Transitions: list of types · Issue #266 · WebKit/standards-positions
      - https://github.com/WebKit/standards-positions/issues/266
    - `pagereveal` event · Issue #303 · WebKit/standards-positions
      - https://github.com/WebKit/standards-positions/issues/303
  - Neutral
    - Support for PointerEvent getCoalescedEvents() API · Issue #374 · WebKit/standards-positions
      - https://github.com/WebKit/standards-positions/issues/374

#### Other

- Upcoming changes to the browser choice screen, default apps, and app deletion for EU users - Latest News - Apple Developer
  - https://developer.apple.com/news/?id=zglax7gc

### Edge 動向

#### Stable: 128

#### Updates

- https://blogs.windows.com/msedgedev/
  - ここがメイン
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見れる
- https://twitter.com/MSEdgeDev
  - これを見るしか無い

#### Other

### WHATWG/W3C 動向

#### Draft

- Recommendation
  - Updated W3C Recommendation: WOFF File Format 2.0
    - https://www.w3.org/news/2024/updated-w3c-recommendation-woff-file-format-2-0/
- Proposed Recommendation
- Candidate Recommendation
  - W3C Invites Implementations of Payment Request API
    - https://www.w3.org/news/2024/w3c-invites-implementations-of-payment-request-api/
- Working Draft
- First Public Working Draft
  - **First Public Working Draft: Federated Credential Management API**
    - https://www.w3.org/news/2024/first-public-working-draft-federated-credential-management-api/

#### Open/UI

- open-ui/meetings/telecon/2024-08-15.md
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-08-15.md
  - [select] Removing the capability for the author to provide a datalist element #1082
- open-ui/meetings/telecon/2024-08-29.md
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-08-29.md
  - [interest invokers] Touch inputs #1052

#### WHATNOT

- https://github.com/whatwg/html/issues?q=is%3Aissue+is%3Aopen+WHATNOT+meeting
- Upcoming WHATNOT meeting on 2024-08-01
  - https://github.com/whatwg/html/issues/10534
- Upcoming WHATNOT meeting on 2024-08-08
  - https://github.com/whatwg/html/issues/10538
- Upcoming WHATNOT meeting on 2024-08-15
  - https://github.com/whatwg/html/issues/10556
- Upcoming WHATNOT meeting on 2024-08-22
  - https://github.com/whatwg/html/issues/10560
- Upcoming WHATNOT meeting on 2024-08-29
  - https://github.com/whatwg/html/issues/10574

#### Other

- **W3C opens community-wide survey**
  - https://www.w3.org/news/2024/w3c-opens-community-wide-survey/
  - W3C の運営やプロセスについてのアンケート
  - 日本語訳あり
- Hiring: W3C Director of Legal and Compliance
  - https://www.w3.org/news/2024/hiring-w3c-director-of-legal-and-compliance/
- **Nominations and statements for the election for the Board of Directors of W3C, Incorporated**
  - https://www.w3.org/2024/08/bod-nominations.html
- Theresa O'Connor's candidate statement for the 2024 W3C Board of Directors election
  - https://tess.oconnor.cx/2024/08/board
- **Societal, ethical, and technical impacts of digital identities**
  - https://www.w3.org/blog/2024/societal-ethical-and-technical-impacts-of-digital-identities/
- **Identity & the Web**
  - https://www.w3.org/reports/identity-web-impact/
- **2024 TPAC planning · Issue #1065 · WICG/webcomponents**
  - https://github.com/WICG/webcomponents/issues/1065#issuecomment-2284597499
  - > DOM Parts, especially goals and constraints. Chrome's experimentation is ongoing, but so far a native implementation doesn't look like a slam-dunk performance win. Are there DX goals that justify the feature, or higher level features (like templating) that we should pursue?
- **[templates] A declarative JavaScript templating API · Issue #1069 · WICG/webcomponents**
  - https://github.com/WICG/webcomponents/issues/1069
- **Planning TPAC. · Issue #654 · w3c/webappsec**
  - https://github.com/w3c/webappsec/issues/654
- **Early Design Review: Lightweight FedCM · Issue #986 · w3ctag/design-reviews**
  - https://github.com/w3ctag/design-reviews/issues/986
  - Comparing FedCM and Lightweight FedCM · fedidcg/LightweightFedCM Wiki
  - https://github.com/fedidcg/LightweightFedCM/wiki/Comparing-FedCM-and-Lightweight-FedCM
- Issues · w3c/tpac2024-breakouts
  - https://github.com/w3c/tpac2024-breakouts/issues?q=is%3Aopen+is%3Aissue

### TC39 動向

#### Meeting

- Meeting Note が公開された時だけやる、それ以外はやらない。
- 2024-07
  - https://github.com/tc39/agendas/blob/main/2024/07.md
  - https://github.com/tc39/notes/pull/337
  - TC39 Minutes を読む
    - https://docs.google.com/document/d/1qXUf4QRTbexUj0fg2sgYTxWwOT2v_q7lmjR282BOWLU/edit
  - Concurrency Control Presenter: MF and LCA
    - Async Iter Helper で Concurrency を分離した
      - concurrency control
      - unordered async iterator helpers
    - その片割れ
    - Governor とは??
      - Mozilla と Igalia が懐疑的
  - unordered async iterator helpers for Stage 1
- Iterator Helper の concurrency じゃない方の片割れ
- AsyncIterator.prototype.unordered から別の世界に分岐する
  - Normative: fully define Math.sqrt
- https://github.com/tc39/ecma262/pull/3345
- Implementation Approximate
- 仕様ではなく実装で精度が決まっている
- これを仕様側で精度を決めるように
- きっかけは WASM
  - Error.isError for Stage 2.7
- Array.isArray は Array を Proxy してるものも判定するが
- Error はそうではない
  - これが Piercing
- 次回 2.7 にしたいかも

#### Proposals Diff

- [https://github.com/tc39/proposals/compare/main@{2024-08-01}...main@{2024-09-01}](https://github.com/tc39/proposals/compare/main@{2023-01-01}...main@{2023-02-01})
- https://tc39.github.io/beta/
- 0->1
  - Unordered Async Iterator Helpers
  - concurrency control
- 1->2
  - Propagate active ScriptOrModule with JobCallback Record
- 2->2.7
- 2.7->3
  - RegExp.escape
  - Time Zone Canonicalization
- 3->4
- Inactive
  - UUID

#### New Proposals

#### WinterCG

- 2024-08-01 meeting · Issue #66 · wintercg/admin
  - https://github.com/wintercg/admin/issues/66

#### Other

### IETF 動向

#### WG

- RFC
  - Document Action: 'Window Sizing for Zstandard Content Encoding' to Informational RFC
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JulSep/0192.html
- Work
  - Last Call: (The Deprecation HTTP Header Field) to Proposed Standard
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/lNGhkKCWD-EfkpPwYfwGN9JnohQ/
  - I-D Action: draft-ietf-httpbis-compression-dictionary-17.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JulSep/0203.html
  - I-D Action: draft-ietf-httpbis-zstd-window-size-03.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JulSep/0190.html
- Meeting

#### Other

- The Nature of Internet Standards
  - https://www.mnot.net/blog/series/internet-standards/
  - mnot の一連の投稿のシリーズページがあった

### CDN 動向

#### Cloudflare

#### Fastly

- Andrew Betts が Fastly 辞めた
  - https://x.com/triblondon/status/1825944420321210469

#### Other

### セキュリティ動向

- Certificate Revocation Incident | DigiCert
  - https://www.digicert.com/support/certificate-revocation-incident
  - Digicert が DV 用の CNAME レコードに入れる乱数を `_` で始めるのを忘れた
  - 全体の 0.4% を 24 時間以内に失効が必要

### 周辺動向

- **Rust 製ブラウザエンジン「Servo」搭載、新たな Web ブラウザ「Verso」の開発プロジェクトが立ち上がる － Publickey**
  - https://www.publickey1.jp/blog/24/rustservowebverso.html
- NLnet; Servo improvements for Tauri
  - https://nlnet.nl/project/Verso/
- Verso Browser - Versotile
  - https://versotile.org/verso/
- **Andreas Kling on X: "We've been evaluating a number of C++ successor languages for @ladybirdbrowser, and the one best suited to our needs appears to be @SwiftLang 🪶 Over the last few months, I've asked a bunch of folks to pick some little part of our project and try rewriting it in the different" / X**
  - https://x.com/awesomekling/status/1822236888188498031
  - Ladybird が Swift を採用していく
- **Chrome's secretly installed extensions - Off The Main Thread**
  - https://offthemainthread.tech/episode/chromes-secretly-installed-extensions/
  - 拡張の件について Jake と Surma が調べた
- Reckoning: Part 1 - The Landscape - Infrequently Noted
  - https://infrequently.org/2024/08/the-landscape/
- Reckoning: Part 2 - Object Lesson - Infrequently Noted
  - https://infrequently.org/2024/08/object-lesson/
- Reckoning: Part 3 - Caprock - Infrequently Noted
  - https://infrequently.org/2024/08/caprock/
- Reckoning: Part 4 - The Way Out - Infrequently Noted
  - https://infrequently.org/2024/08/the-way-out/
-
- The European Union must keep funding free software | Igalia
  - https://www.igalia.com/2024/08/05/The-European-Union-must-keep-funding-free-software.html
- **Improving language negotiation**
  - https://blog.yoav.ws/posts/improving_language_negotiation/
  - Chrome の Language の変更について
  - Fingerprint 対策にはなるが、Perf と Intl 的にはよくない
  - どうすればいいかとして Original-Language の提案
- **My response to the UK Competition and Markets Authority**
  - https://blog.tomayac.com/2024/08/26/my-response-to-the-cma/
  - CMA に送った Web Install API の有用性を訴えるメール
- **Meta is getting ready for post-quantum cryptography - Engineering at Meta**
  - https://engineering.fb.com/2024/08/28/security/post-quantum-cryptography-meta/
- 「Chrome は HTTPS RR をまともに実装できているとは言い難い」各ブラウザーの対応状況を調べた結果が報告される【DNS Summer Day 2024】 - INTERNET Watch
  - https://internet.watch.impress.co.jp/docs/event/1617586.html

### Cookie 動向

- Google Breaks Promise to Block Third-Party Cookies | Electronic Frontier Foundation
  - https://www.eff.org/deeplinks/2024/08/google-breaks-promise-block-third-party-cookies

### イベント

- 8 月
- 9 月
  - 7: Web Developer Conference 2024 - connpass
    - https://web-study.connpass.com/event/321711/
    - https://fortee.jp/web-dev-conf-2024/proposal/all
  - 23-27: TPAC 2024 Anaheim
    - https://www.w3.org/2024/09/TPAC/
- 10 月
  - 8-10: BlinkOn19
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/XZPgZ3DymqY
  - ?: CMA の Q3 レポート

### Wrap Up

- Chrome
  - 128
    - line breakable ruby
    - Promise.try
  - 129 beta
    - interpolate-size / calc-size()
    - Intl.DurationFormat
    - scheduler.yield()
  - Ship
    - Intl.DurationFormat
    - non-special scheme URLs
    - CSS Nested Declaration Rules
    - Direct Sockets API for IWA
    - FedCM updates
    - Compression dictionary transport
  - Prototype
    - CSS gap decoration
    - Summarizer API
    - Writer API
    - Rewriter API
    - View Transitions layered capture
  - Experiment
    - Reduce Accept-Language
    - Language Detector API
  - Chrome Developers
    - Chrome built-in AI experiment
  - other blogs
    - Improvint security of Chrome cookies on Windows
    - Post-Quantum Cryptography
  - other
    - DOJ vs Google
    - Blink in iOS by Igalia
    - Windows 版 Chrome 128 でフォントが変わった件
    - Chromium のテキスト処理のスライド
- Firefox
  - 129
    - HTTPS by default
    - HTTPS RR
    - @starting-style / transition-behavior
    - Float16Array
  - Ship
    - WebCodecs
    - Text Fragments
  - Prototype
    - Network Error Logging
    - View Transitions L1
  - Standard Position
    - positive: Anchor Positioning
- Safari
  - TP 200
  - TP 201
  - TP 202
    - background-clip: border-area
    - text-box / line-fit-edge / text-box-edge
    - ruby-align / unprefixed ruby-position
    - scrollbar-width
    - shape()
    - color-layers()
    - Float16Array
  - Standard Position
    - positive on SVG favicons
- W3C/WHATWG
  - Draft
    - FedCM
  - Open/UI
  - Other
    - community-wide survey
    - Board of Directors election
- TC39
  - Iterator Helpers が二つに分離
- WinterCG
- IETF
- CDN 動向
- セキュリティ動向
  - Digicert が DV に使う値をミスって 0.4% を 24h で失効
- 周辺動向
  - Tauri が Servo 製の Verso を開発
  - 拡張について Jake と Surma が調査
  - Chrome の Language の変更について yoav の提案
  - Tomayac が CMA に送ったメール
- Cookie 動向
  - EFF による Chrome への批判
