---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep151.mp3
published_at: 2024-05-25
guest: [@myakura](https://twitter.com/myakura)
---

# ep151 Monthly Platform 202405

## Theme

第 151 回のテーマは 2024 年 5 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 125

#### Updates

- **Release notes | Chrome for Developers**
  - https://developer.chrome.com/release-notes/125
  - HTML and DOM
    - Declarative shadow DOM serialization
  - CSS
    - CSS Anchor Positioning
    - CSS stepped value functions-`round()`, `mod()`, and `rem()`
  - **New syntax for CSS custom `:state()`**
  - Remove discontinuity for Oklab and Oklch colors with lightness of nearly 100% or 0
  - Used color scheme root scrollbars
  - view-transitions class
  - Loading
    - Accept HTTP and HTTPS URLs when constructing WebSocket
  - Web APIs
    - Additions to the Attribution Reporting API
    - The Compute Pressure API
    - Extending Storage Access API (SAA) to non-cookie storage
    - FedCM CORS requirement on ID assertion endpoint
    - FedCM credentialed request no longer sends SameSite=Strict cookie
    - Interoperable mousemove default action
    - Regular expression modifiers
    - Regular expression duplicate named capture groups
  - Chrome Apps
    - Direct Sockets API in Chrome Apps
  - New origin trials
  - FedCM Button Mode API and Use Other Account API
  - Foldable APIs
  - Deprecation trial for prefixed HTMLVideoElement Fullscreen properties and methods
  - Skip preload scanning
  - Deprecations and removals
  - Remove "window-placement" alias for permission and permission policy "window-management"
  - Removal of Enterprise policy: NewBaseUrlInheritanceBehaviorAllowed
  - Removal of prefixed HTMLVideoElement Fullscreen properties and methods
  - Further reading
- **New in Chrome 125**
  - https://developer.chrome.com/blog/new-in-chrome-125
  - CSS Anchor Positioning.
  - Compute Pressure API.
  - Storage Access API (SAA) extended to non-cookie storage.
- **What's new in DevTools, Chrome 125**
  - https://developer.chrome.com/blog/new-in-devtools-125
  - Understand errors and warnings in the Console better with Gemini
  - @position-try rules support in Elements > Styles
  - Sources panel improvements
    - Configure automatic pretty-printing and bracket closing
    - Handled rejected promises are recognized as caught
  - Error causes in the Console
  - Network panel improvements
    - Inspect Early Hints headers
    - Hide the Waterfall column
  - Performance panel improvements
    - **Capture CSS selector statistics**
  - Change order and hide tracks
  - Ignore retainers in the Memory panel
  - Lighthouse 11.7.1
  - Miscellaneous highlights
- **Chrome 126 beta**
  - https://developer.chrome.com/blog/chrome-126-beta
  - CSS
    - **Cross-document view transitions for same-origin navigations**
  - Web APIs
    - Gamepad API trigger-rumble extension
    - OpusEncoderConfig signal and application parameters
    - PointerEvent.deviceId for multi-pen inking
    - ChromeOS tabbed web apps
    - toJSON() method for GeolocationCoordinates and GeolocationPosition
    - visualViewport onscrollend support
    - WebGLObject Web IDL superinterface
    - WebRTC encoded transform: Modify Metadata functions
    - SVG support for the Async Clipboard API
    - **Re-enabling the CloseWatcher API and close requests for \<dialog> and popover=""**
    - Support for the UI Automation Accessibility Framework on Windows
  - New origin trials
    - FedCM as a trust signal for the Storage Access API
    - Media previews opt-out
    - FedCM: Continuation API, Parameters API, Fields API, Multiple configURLs, Custom Account Labels
    - Keyboard focusable scroll containers deprecation trial
  - Deprecations and removals
    - Mutation events will be removed from Chrome
- **Google I/O**
  - Google Keynote
    - https://io.google/2024/explore/a6eb8619-5c2e-4671-84cb-b938c27103be
  - Get ready for Google I/O: Program lineup revealed - Google Developers Blog
    - https://developers.googleblog.com/en/get-ready-for-google-io-program-lineup-revealed/
  - 10 updates from Google I/O 2024: Unlocking the power of AI for every web developer
    - https://developer.chrome.com/blog/web-at-io24
  - I/O 2024 Web AI wrap up: New models, tools, and APIs for your next web app
    - https://developer.chrome.com/blog/io24-web-ai-wrapup
  - **The state of CSS and Web UI**
    - https://io.google/2024/explore/83764202-1ca2-4491-a731-c4d3701624d4/
  - Chrome DevTools: From friction to flow
    - https://io.google/2024/explore/5c49e4fb-0b93-4905-9dfa-115bcd4ffc62/
  - Level up your Chrome extensions: Manifest V3 and beyond
    - https://io.google/2024/explore/e5eee6b0-13cc-45f7-8cd3-970e13816b57/
  - Navigating the JavaScript framework ecosystem
    - https://io.google/2024/explore/eb110bcc-2a95-4fa3-be3a-75af00d2f8ff/
  - Write once, run anywhere finally realized with WebAssembly
    - https://io.google/2024/explore/3c810cbb-3f43-4a03-aa6d-d5ef36419687/
  - WebAssembly and WebGPU enhancements for faster Web AI
    - https://io.google/2024/explore/4148a1ac-c3a5-43a9-8a3d-f9c2358282e9/
  - Unleash the web: Build (almost) any app in your browser
    - https://io.google/2024/explore/39476a62-2bbb-4962-848c-e770a6fbfd92/
  - Web AI: New models, tools, and APIs for your next web app
    - https://io.google/2024/explore/d26017f3-9580-43bb-a6b9-c40066eb61b6/
  - What you need to know about third-party cookie deprecation
    - https://io.google/2024/explore/2f6e1e21-3e91-407e-93fc-364c4500cd23/
  - How to use passkeys and FedCM for better sign-in and sign-up experiences
    - https://io.google/2024/explore/3ba88258-12ca-49c0-b482-5ca0c212b807/
  - New field insights for debugging INP
    - https://io.google/2024/explore/ba446093-0036-410b-ba1e-f9016ec21899/
  - **Multi-page application View Transitions are here**
    - https://io.google/2024/explore/8ae18b72-028e-4722-9a05-4a480048e629/
  - No buzz, just build: Practical on-device AI for web developers
    - https://io.google/2024/explore/47fc6e98-8359-4be0-b9b9-4bc7b28bd063/
  - From fast loading to instant loading
    - https://io.google/2024/explore/24c82286-24fd-42b7-b5a8-bbe9c917cbe4/

#### Intents

- Ship: CSSPageRule to inherit from CSSGroupingRule
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GcVSUIG9BGk
- Ship: Document picture-in-picture: propagate user activation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AfzrMoCgccQ
- Ship: Protected Audience: reporting timeouts & multiple-bids
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZdZXN1D-MtI
- Ship: Support Video Chapter in MediaMetadata
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2c3BP_yN0v8
- **Ship: Tabbed web apps**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/L6AfXU0-GOc
- **Ship: View Transitions Same-Origin Navigation**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LsA567xpe7k
  - View Transition が MPA でもできるように
  - 3 行 CSS 足すだけでヌルッと遷移するようになる。
- Ship: WebRTC encoded transform - Constructor with custom Metadata (originally Modify Metadata functions)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pKTAFZBMF_M
- Ship: Automatic Fullscreen Content Setting
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WOch5LPq9RY
- Ship: Multi-argument alt text in CSS Generated Content
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PaUVwmNkfWc
- Ship: Protected Audience ads reporting - allow cross-origin subframes to send reportEvent() beacons
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CrUxPVSscW0
- **Ship: Stop modifying author-defined selection colors**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/olhqI_F8SWE
  - `::selection { color: cyan, background: cyan }` と設定されている場合
  - chrome はこれを無視して背景を反転して red にする
  - この振る舞いをやめて Author の意図をそのまま尊重することで他と互換に
- Ship: Attribution Reporting Feature: Prevent Coalescing of Headers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/G1f_Y6Kl5b4
- Ship: Attribution Reporting Feature: Referrer Policy for Attributionsrc Requests
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7UQR2lPn5KE
- **Ship: CSS font-size-adjust with the two-value syntax**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/l2CiHZ8BArs
  - interop 2024 focus
- **Ship: Deprecate Mutation Events**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jBEISy1p1XU
  - MutationObserver に移行していく
  - Stat は多いので大変そう
  - Gecko: Positive "very strong positive position"
- **Ship: Third-party Cookie Grace Period Opt-Out**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/seEsJTZPnz8
  - 1% の deprecation は始まっており、opt-out する Reverse OT はすでに始まっている
  - しかし、ローカルで検出されなかったテストが 100% でローンチされるのはリスクが高い
  - そこで、サービスが 3PCD のロールアウトをコントロールできる仕組みを提供する
  - 具体的には `.well-known/tpcd/grace-period.json` に
  - `{ "ThirdPartyOptOutPercentage": 50 }` と書ける
- Ship: Dispatch selectionchange event per element
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/d8r15E2j73E
- **Ship: Importmap integrity**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mn0sRHwK7Dc
  - importmap で sunresource integrity を追加できるように
  - PCI-DSS v4 で認証 + integrity が要件に入り、その実現に必要らしい
    - https://www.shopify.com/in/partners/blog/checkout-compliance
- Ship: Unrestricted WebUSB (available only to Isolated Web Apps)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hXgwRCYta-k
- **Ship: CSS Anchor Positioning: anchor-scope**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/D2-NxrsMKe4
  - anchor のスコープを指定する
  - 同じコンポーネントがページ上に複数ある場合に干渉を防ぐ
- Ship: The ServiceWorker static routing API not condition support
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1HxS284iKCE
- Implement and Ship: Conversion to RGB in `VideoFrame.copyTo()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4ZyzUn4meaY
- **Prototype and Ship: Align navigator.cookieEnabled with spec**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xU3gTW4aTfg
  - `navigator.cookieEnabled` は Cookie が有効かを返す
  - Chrome が 3PCD すると、 unpartitioned cookie にアクセスできない場合 false を返すことになる
  - しかし、それは本来 `document.hasStorageAccess` の役目だったはず
  - なので `hasStorageAccess` に任せて、 `cookieEnabled` は元の挙動に戻す
- Prototype: Document picture-in-picture: add option to ignore window bounds cache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/a9nH5pdlgAc
- **Prototype: Find-in-page highlight pseudos**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5FS_4mVQBLc
  - ページ内検索された場所につく擬似要素 (`::search-text`)
  - ハイライトのスタイルを変更できる
  - デフォルトのハイライトだとコントラストが下がってしまう時などに上書き
- **Prototype: Multi-argument alt text in CSS Generated Content**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uCOrwnFuqNA
  - CSS の content で画像などを指定する際に、 alt を指定する記法はサポートされてた
  - `content: url("cat.jpg") / "A cute cat"`
  - 仕様上この alt の方で関数などが使えるので、それに対応
  - `content: url("cat.jpg") / "Cute " attr(data-animal) " number " counter(animal-counter);`
- Prototype: Link rel=payment to support push payments
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dCMLWWdgMgY
  - ページでの支払いに Google Pay を起動するかをユーザに尋ねる
- **Prototype: Trusted Types spec alignment**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KFbpAOttF5U
  - monkey patch として Chrome に実装されたが、他ブラウザも興味を持った
  - そこでこれを HTML に統合することにした
  - その過程で色々と修正された
  - その修正に合わせて Chrome の実装も変更する
  - チェックの実行タイミングなどが変わるため後方互換性への影響もある
- Prototype: AudioContext.onerror
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tADbkn88F5Y
- **Prototype: No-Vary-Search Hint for Prerender Speculation Rules**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wMTc-74B9Ic
- **Prototype: Partitioned Popins**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ApU_zUmpQ2g/
- Prototype: Timing information for ServiceWorker Static routing API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_967Rs7QJRo
- Experiment: FedCM as a trust signal for the Storage Access API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LwgSKPBivuM
- **Experiment: Keyboard-focusable scroll containers Opt Out**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2qwzMaEGWTk
- **Experiment: Origin Trial for Third Party Cookie Deprecation**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3B5dIm_XXLE
  - 3PCD を強制するための OT
- Experiment: Page Embedded Permission Control
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9dANzlI1YgQ
- **Implement and Experiment: Skip Ad in Picture-in-Picture window**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/l6sW0G4jzhE
  - 4 年前に提案されてそのままになっている機能の再掲
  - ChromeOS チームがこの機能(SkipAd action)を再利用する予定があるので
- Extend Experiment: WebRTC encoded transform - Modify Metadata functions (setMetadata method)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SnpGnj6YqgQ
- Extend Deprecation Trial: Partitioning Storage, Service Workers, and Communication APIs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NiqXsIGv01I
- Deprecate and Remove: Deprecate old CSS custom state syntax
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LkeOaFI5xVc
- Request for Deprecation Trial: Media Previews opt-out
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1BSxI6Udblw
- **Request for Deprecation Trial: Unpartitioned 3rd party Storage, Service Workers, and Communication APIs**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FNi-nNC8fiw
  - Partition を進める関連作業をまとめて DT したい?
- PSA: ComputePressure API: Rename of attribute supportedSources to knownSources.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4EvT2Es7aps
- PSA - Privacy Sandbox APIs temporarily unavailable; fix deployed
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wP1UhzkECBM
- Ready for Developer Testing: Call stacks in crash reports from unresponsive web pages
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aVpeVRO1Sy4
- Web-Facing Change PSA: Corrected timing for low-lead-time prefetches
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_HyH7xC9Lo4
- **Web-Facing Change PSA: text-size-adjust improvements**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LBs6mlOrHJo
  - text-size-adjust プロパティのおかしな挙動を直す
  - meta viewport 指定のないページでテキストを拡大する挙動の制御をするプロパティ
- New API owner: Vladimir Levin!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fcvFzlE22NI
  - グラフィック/レンダリング周りをみてた Vlad が API Owner に

#### Other

- web.dev
  - https://web.dev/
  - blog
    - **What's new in the web**
      - https://web.dev/blog/new-in-the-web-io2024
    - New to the web platform in April
      - https://web.dev/blog/web-platform-04-2024
    - Popover API lands in Baseline
      - https://web.dev/blog/popover-api
      - Popover が Baseline 2024 の一部に
    - **Announcing the Web Platform Dashboard**
      - https://web.dev/blog/web-platform-dashboard
    - Baseline integration with RUM Archive and RUMvision
      - https://web.dev/blog/baseline-rum
    - The CSS stepped value math functions are now in Baseline 2024
      - https://web.dev/blog/css-stepped-value-functions
    - Helping you select a passkey library
      - https://web.dev/blog/passkey-lib-criteria
    - The Screen Wake Lock API is now supported in all browsers
      - https://web.dev/blog/screen-wake-lock-supported-in-all-browsers
  - articles
    - WebAssembly performance patterns for web apps
      - https://web.dev/articles/webassembly-performance-patterns-for-web-apps
    - CSS animated grid layouts
      - https://web.dev/articles/css-animated-grid-layouts
  - Baseline
    - https://web.dev/baseline/overview
- google for developers
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - https://developer.chrome.com/blog/
  - **An alternative proposal for CSS masonry**
    - https://developer.chrome.com/blog/masonry
    - Chrome チームによる display: masonry の提案
    - Grid の亜流ではなく独自のレイアウトにすることで、不必要なレイアウトの計算を避けられたり、メイソンリーのために導入されるが Grid では意味のない記述で悩むことなどがないと主張
  - Introducing "Unleash the power of Scroll-Driven Animations"
    - https://developer.chrome.com/blog/scroll-driven-animations-video-course
  - What's New in WebGPU (Chrome 125)
    - https://developer.chrome.com/blog/new-in-webgpu-125
  - Why do CSS and UI capabilities matter for your ecommerce site?
    - https://developer.chrome.com/blog/css-ui-ecommerce
  - DevTools Tips: Override and mock network responses
    - https://developer.chrome.com/blog/devtools-tips-34
  - Implement testing in your enterprise with Chrome
    - https://developer.chrome.com/blog/implement-testing-in-your-enterprise
  - **Introducing UIA support on Windows**
    - https://developer.chrome.com/blog/windows-uia-support
  - Introducing the CSS anchor positioning API
    - https://developer.chrome.com/blog/anchor-positioning-api
  - SVG support for the Async Clipboard API
    - https://developer.chrome.com/blog/svg-support-for-async-clipboard-api
  - Tools from Chrome for frictionless, automated testing
    - https://developer.chrome.com/blog/tools-from-chrome-for-frictionless-testing
  - WebAssembly and WebGPU enhancements for faster Web AI, part 1
    - https://developer.chrome.com/blog/io24-webassembly-webgpu-1
  - WebAssembly and WebGPU enhancements for faster Web AI, part 2
    - https://developer.chrome.com/blog/io24-webassembly-webgpu-2
  - Chrome Extensions at Google I/O 2024
    - https://developer.chrome.com/blog/extensions-io-24
  - What's new in view transitions? (Google I/O 2024 update)
    - https://developer.chrome.com/blog/view-transitions-update-io24
  - What's new in JavaScript Frameworks (May 2024)
    - https://developer.chrome.com/blog/frameworks-may-2024
- chromium blog
  - **Chromium Blog: How Machine Learning improved the Chrome address bar on Windows, Mac and ChromeOS**
    - https://blog.chromium.org/2024/04/how-machine-learning-improved-chrome.html
    - M124 から omnibox でスコアリング関数の代わりに AI が動くようになる
    - 毎日何十億回も使われる機能であるため、変更は難しかった
    - よくソフトウェア開発は「飛行機をそれが飛んでる間に組み立てる」と言われる
    - これは「世界中の飛行機の座席を飛んでる間に交換する」みたいな変更だった
  - **Chromium Blog: Advancing Our Amazing Bet on Asymmetric Cryptography**
    - https://blog.chromium.org/2024/05/advancing-our-amazing-bet-on-asymmetric.html
    - 耐量子暗号への移行を進めており、 Kyber を導入したが問題も多数発生している
    - X25519 鍵交換は 30 倍の鍵サイズで、 ClientHello は分割、ハンドシェイクは 4% 増加
    - ML-DSA 認証では鍵と署名のサイズが 40 倍。レイテンシは 20~40% 増える予想
    - PKI の俊敏性も、新しい仕様を展開する上での足枷になってきた
    - クライアントごとに適切な証明書を提供できる Trust Expression の提案が進んでいる
    - 新しい仕様に何を入れるかと同じくらい、いかに素早くそれを展開できるかの方が重要
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
  - Google Online Security Blog: Detecting browser data theft using Windows Event Logs
    - https://security.googleblog.com/2024/04/detecting-browser-data-theft-using.html
  - Google Online Security Blog: Your Google Account allows you to create passkeys on your phone, computer and security keys
    - https://security.googleblog.com/2024/05/passkeys-on-your-phone-computer-and-security-keys.html
- search blog
  - https://developers.google.com/search/
- v8
  - https://v8.dev/

### Firefox 動向

#### Stable: 126

#### Updates

- **Firefox 126.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/126.0/releasenotes/
  - リンクの右クリックに Copy Without Site Tracking オプションが追加
  - M3 Mac で AV1 のハードウェアデコードアクセラレーションをサポート
  - NVIDIA RTX Video Super Resolution と NVIDIA RTX Video HDR のサポート
- **Firefox 126 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/126
  - CSS zoom / element.currentCSSZoom
  - CustomStateSet
  - zstd
  - `URL.parse()`
  - Screen Wake Lock API
- Screenshots++ - These Weeks in Firefox: Issue 160 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2024/05/09/screenshots-these-weeks-in-firefox-issue-160/
- Today's Forecast: Browser Improvements - These Weeks in Firefox: Issue 161 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2024/05/17/todays-forecast-browser-improvements-these-weeks-in-firefox-issue-161/

#### Intents

- **Ship: `navigator.clipboard.read()` and `navigator.clipboard.write()`**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/lNXj_A-Lllk
  - ずっと flag だったが 127 からデフォルト有効に
- **Ship: New Set Methods**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/MvkV6MI6dMs
  - 127 でデフォルト有効に
- Ship: Mixed Content: upgrading of passive mixed content to HTTPS
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/a8xO7nUIPbk
- **Ship: Resolving HTTPS records using platform DNS APIs**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/oh_Tk0iLT9A/m/k7XztM6hBgAJ
  - DoH じゃなくても HTTPS レコードを解決するようになる
- Ship: Resizable and Growable ArrayBuffers
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/bYpVoogstBA
- Ship: setCodecPreferences
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/nhKKb7obWU8
- **Prototype: CSS Anchor Positioning**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/4cbytMKbHtg
  - WebKit はまだ position が未定だが、Editor をつとめている
    - 大規模な変更が入ったばかりでレビューが足りていない状態として Chromium の ship に反対していた
      - https://groups.google.com/a/chromium.org/g/blink-dev/c/jGTYNuidPRs
- **Prototype: Bounce Tracking Mitigations**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/M6erM0SjPTM
  - これまでは Tracker List ベースだった
  - ヒューリスティックベースのプロトタイプをする
- **Prototype: CHIPS(Cookies Having Independent Partitioned State)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/7p3DC__Wgos
  - Partitioned 属性を実装する
  - WebKit も position は support
    - パーティションされた Cookie のサイズについて議論が多少あるらしい
- Change:
- Remove:
- Unship: HTMLMediaElement.seekToNextFrame
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/cjiXyyFDmrw

#### Newsletter

- Firefox DevTools Newsletter - 125
  - https://fxdx.dev/firefox-devtools-newsletter-125/
- Firefox WebDriver Newsletter - 126
  - https://fxdx.dev/firefox-webdriver-newsletter-126/
- Firefox DevTools Newsletter - 126
  - https://fxdx.dev/firefox-devtools-newsletter-126/
- SpiderMonkey Newsletter (Firefox 126-127)
  - https://spidermonkey.dev/blog/2024/05/15/newsletter-firefox-126-127.html
- L10n report: May 2024 Edition - Mozilla L10N
  - https://blog.mozilla.org/l10n/2024/05/02/l10n-report-may-2024-edition/

#### MDN / Open Web Docs

- Using the Page Visibility API
  - https://developer.mozilla.org/en-US/blog/using-the-page-visibility-api/

#### Standard Position

- 今月 Close された Issue と PR ものをみる
  - https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2024-05-01+
- Positive
  - Allow converting VideoFrame to RGB pixel formats
    - https://github.com/mozilla/standards-positions/issues/1017
  - AudioContext.onerror
    - https://github.com/mozilla/standards-positions/issues/1016
  - document.caretPositionFromPoint API in shadow DOM scenario
    - https://github.com/mozilla/standards-positions/issues/1012
  - IntersectionObserver V2: Detecting occlusion and visual effects
    - https://github.com/mozilla/standards-positions/issues/109
- Negative
  - **Digital Credentials**
    - https://github.com/mozilla/standards-positions/issues/1003
- Defer
  - **Partitioned Popins**
    - https://github.com/mozilla/standards-positions/issues/1023

#### Other

- Manifest V3 Updates - Mozilla Add-ons Community Blog
  - https://blog.mozilla.org/addons/2024/05/14/manifest-v3-updates/
- See what's changing in Firefox: Better insights, same privacy
  - https://blog.mozilla.org/en/products/firefox/firefox-search-update/
- This month in Servo: Acid2 redux, Servo book, Qt demo, and more!
  - https://servo.org/blog/2024/04/26/acid2-servo-book-qt/
- Net Neutrality is Back! - Open Policy & Advocacy
  - https://blog.mozilla.org/netpolicy/2024/04/26/net-neutrality-is-back/
- Work Gets Underway on a New Federal Privacy Proposal - Open Policy & Advocacy
  - https://blog.mozilla.org/netpolicy/2024/04/26/work-gets-underway-on-a-new-federal-privacy-proposal/
- The UK's Digital Markets, Competition, and Consumers Bill will spark the UK's digital economy, not stifle it - Open Policy & Advocacy
  - https://blog.mozilla.org/netpolicy/2024/04/26/dmcc-uk-support/
- 1000+ Firefox for Android extensions now available - Mozilla Add-ons Community Blog
  - https://blog.mozilla.org/addons/2024/05/02/1000-firefox-for-android-extensions-now-available/
- Make your support articles pop: Use the new Firefox Desktop Icon Gallery - The Mozilla Support Blog
  - https://blog.mozilla.org/sumo/2024/05/06/make-your-support-articles-pop-use-the-new-firefox-desktop-icon-gallery/
- Developer Spotlight: Port Authority - Mozilla Add-ons Community Blog
  - https://blog.mozilla.org/addons/2024/05/07/developer-spotlight-port-authority/
- Firefox at the Webbys: Winners talk internet red flags and what they'd rather keep private online
  - https://blog.mozilla.org/en/internet-culture/webbys-red-carpet-event-2024/
- Mozilla Firefox Adds AI-Powered RTX Video | NVIDIA Blog
  - https://blogs.nvidia.com/blog/ai-decoded-rtxvideo-firefox/
- **Here's what we're working on in Firefox - Mozilla Connect**
  - https://connect.mozilla.org/t5/discussions/here-s-what-we-re-working-on-in-firefox/td-p/57694
  - 縦タブなど UI の強化やパフォーマンス向上などに取り組んでいくらしい
  - > We're looking at how we can use local, on-device AI models -- i.e., more private -- to enhance your browsing experience further. One feature we're starting with next quarter is AI-generated alt-text for images inserted into PDFs, which makes it more accessible to visually impaired users and people with learning disabilities. The alt text is then processed on your device and saved locally instead of cloud services, ensuring that enhancements like these are done with your privacy in mind.

### Safari 動向

#### Stable: 17.5

#### Updates

- JetStream 2.2
  - https://webkit.org/blog/15378/jetstream-2-2/
- Release Notes for Safari Technology Preview 194
  - https://webkit.org/blog/15406/release-notes-for-safari-technology-preview-194/
  - バグ修正がメイン
- **WebKit Features in Safari 17.5**
  - https://webkit.org/blog/15383/webkit-features-in-safari-17-5/
  - CSS
    - Text wrap balance
    - Text wrap shorthands and longhands
    - Dark mode and the light-dark() color function
    - Starting style
    - Features queries for importing CSS
      - **@import "nested-styles.css" supports(selector(&));**
  - WebCodecs
  - WebGL
  - WKWebView
  - Bug Fixes and more
    - Accessibility
    - Animations
    - Authentication
    - CSS
    - Forms
    - Media
    - Rendering
    - Web API
    - Web Apps
    - Web Inspector
    - WebRTC
  - Updating to Safari 17.5
    - Ventura / Monterey でなら macOS をアプデしなくても上げられる
- Release Notes for Safari Technology Preview 195
  - https://webkit.org/blog/15417/release-notes-for-safari-technology-preview-195/
  - バグ修正のみ

#### Standard Positions

- 今月 Close されたものをみる
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2024-05-01+
- Support
  - Allow converting VideoFrame to RGB pixel formats by calling VideoFrame.copyTo()
    - https://github.com/WebKit/standards-positions/issues/341
  - **Importmap integrity**
    - https://github.com/WebKit/standards-positions/issues/335
  - **ReadableStream async iteration**
    - https://github.com/WebKit/standards-positions/issues/319
  - **Implement supports() for @import**
    - https://github.com/WebKit/standards-positions/issues/279
  - **ServiceWorker static routing API**
    - https://github.com/WebKit/standards-positions/issues/206
  - WebRTC Codec selection API
    - https://github.com/WebKit/standards-positions/issues/179
  - **Compression Dictionary Transport**
    - https://github.com/WebKit/standards-positions/issues/160
  - **Opaque Response Blocking (ORB, aka CORB++)**
    - https://github.com/WebKit/standards-positions/issues/64
  - Gamepad API Trigger-Rumble Haptics Extension
    - https://github.com/WebKit/standards-positions/issues/1
- Oppose
  - **Gyroscope, Accelerometer, Magnetometer, Motion, Orientation**
    - https://github.com/WebKit/standards-positions/issues/347
    - 長文のお気持ちとともに反対
- Neutral
  - Close requests and close watchers
    - https://github.com/WebKit/standards-positions/issues/215
  - focusability of elements with CSS display:contents
    - https://github.com/WebKit/standards-positions/issues/164

#### Other

### Edge 動向

#### Stable: 125

#### Updates

- Build 2024
  - The Web is AI Ready-maximize your AI web development with WebNN
    - https://build.microsoft.com/en-US/sessions/fe8f0c03-6f31-400a-8954-4e37c935e6e9?source=sessions
  - Learn how to accelerate Stable Diffusion in the web with WebNN
    - https://build.microsoft.com/en-US/sessions/18b8227d-60fa-493b-9000-c71cdef1af7d?source=sessions
  - Dev tools to extend Power Pages websites
    - https://build.microsoft.com/en-US/sessions/812106ec-c88a-4203-bfbb-095c69ce221c?source=sessions
- Deprecating support for -ms-high-contrast and -ms-high-contrast-adjust - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2024/04/29/deprecating-ms-high-contrast/

#### Other

- Control Edge memory usage with resource controls - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2024/05/02/control-edge-memory-usage-with-resource-controls/
- Microsoft Edge for Business: Revolutionizing your business with AI, security and productivity - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2024/05/21/microsoft-edge-for-business-revolutionizing-your-business-with-ai-security-and-productivity/
- ERR_BLOCKED_BY_CLIENT and HTML5 Sandbox - text/plain
  - https://textslashplain.com/2024/05/06/err_blocked_by_client-and-html5-sandbox/
- Spring 2024 Updates - text/plain
  - https://textslashplain.com/2024/05/17/spring-2024-updates/
- Attack Techniques: Full-Trust Script Downloads - text/plain
  - https://textslashplain.com/2024/05/20/attack-techniques-full-trust-script-downloads/
- Attack Techniques: Remote Control Software - text/plain
  - https://textslashplain.com/2024/05/21/attack-techniques-remote-control-software/
- Authenticode in 2024 - text/plain
  - https://textslashplain.com/2024/05/22/authenticode-in-2024/

### WHATWG/W3C 動向

#### Draft

- Recommendation
  - Updated W3C Recommendation: Media Queries Level 3
    - https://www.w3.org/news/2024/updated-w3c-recommendation-media-queries-level-3/
- Proposed Recommendation
- Candidate Recommendation
  - Updated Candidate Recommendation: CSS Multi-column Layout Module Level 1
    - https://www.w3.org/news/2024/updated-candidate-recommendation-css-multi-column-layout-module-level-1/
- Working Draft
  - HTML Ruby Markup Extensions Working Draft Published
    - https://www.w3.org/news/2024/working-draft-html-ruby-markup-extensions/
    - WHATWG HTML では不十分なルビの要件を満たす拡張
  - **The WCAG 3 Working Draft update is ready for your review**
    - https://www.w3.org/blog/2024/the-wcag-3-working-draft-update-is-ready-for-your-review/
  - WCAG 3 Introduction | Web Accessibility Initiative (WAI) | W3C
    - https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/
- First Public Working Draft
  - First Public Working Draft: CSS View Transitions Module Level 2
    - https://www.w3.org/news/2024/first-public-working-draft-css-view-transitions-module-level-2/

#### Open/UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- **CSS WG Blog - Minutes OpenUI-WHATWG/HTML-CSSWG Meeting 2024-05-08**
  - https://www.w3.org/blog/CSS/2024/05/18/minutes-openui-whatwg-html-csswg-meeting-2024-05-08/
  - stylable select や appearance: base の話

#### Other

- **W3C opens Advisory Board (AB) election**
  - https://www.w3.org/news/2024/w3c-opens-advisory-board-ab-election/
  - Nominations and Statements for W3C Advisory Board 2024 Election
    - https://www.w3.org/2024/04/ab-nominations
    - Hiroshi Ota (LY Corporation)
- **Remote (externally-managed) Crypto Keys · Issue #151 · WICG/proposals**
  - https://github.com/WICG/proposals/issues/151
  - > ​​This proposal advocates for the development of a web standard for externally-managed cryptographic keys, specifically designed to facilitate end-to-end encryption in web applications.
- **Cryptographic Message Syntax (CMS) API · Issue #152 · WICG/proposals**
  - https://github.com/WICG/proposals/issues/152
  - > This proposal advocates for the development of a web standard for the Cryptographic Message Syntax (CMS) API, specifically tailored to enhance the security of email communications through S/MIME. CMS, as described in RFC 5652, is fundamental for signing, encrypting, decrypting, and verifying email messages, facilitating end-to-end secure email communication.

### TC39 動向

#### Meeting

- 2024-04
  - https://github.com/tc39/agendas/blob/main/2024/04.md
  - https://github.com/tc39/notes/tree/main/meetings/2024-04
  - https://x.com/mozaicfm/status/1793265693833769281
  - https://docs.google.com/document/d/1qXUf4QRTbexUj0fg2sgYTxWwOT2v_q7lmjR282BOWLU/edit

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2024-01-01}...main@{2024-02-01}
- https://tc39.github.io/beta/
- 0->1
  - Error.isError
    - https://github.com/tc39/proposal-is-error
  - Strict Enforcement of 'using'
    - https://github.com/tc39/proposal-using-enforcement
  - Signals
    - https://github.com/tc39/proposal-signals
- 1->2
- 2->2.7
  - Promise.try
  - Math.sumPrecise
- 2.7->3
  - new Function
  - Make eval-introduced global vars redeclarable
- 3->4
  - Set Methods
  - duplicate named capture groups
- Widthdrawn
  - Array.last

#### New Proposals

#### Other

### WinterCG 動向

- Meeting や大きな動きがあった月だけやる

#### Meeting

- 2024-05-01 Meeting
  - https://github.com/wintercg/admin/issues
  - 特になし

### IETF 動向

#### WG

- RFC
- Work
  - **Working Group Last Call: RFC6265bis (Cookies)**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024AprJun/0024.html
  - **Protocol Action: 'Structured Field Values for HTTP' to Proposed Standard**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024AprJun/0035.html
  - Compression Dictionaries draft 04
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024AprJun/0037.html
  - Adoption call for draft-jaju-httpbis-zstd-window-size
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024AprJun/0050.html
- Meeting

#### Other

- **これからの HTTP - 拡大するセマンティクスと、さらなる高速化 - Google Slides**
  - https://docs.google.com/presentation/d/e/2PACX-1vSg22HuQjGIKjav5A351tPqS3RWpi7VwygeZybM8BadyMvboYmxXzAlqxMSBPNOBZtxJp9OaE_mlq9M/pub
- **『招待講演 3／Ruby で作る最強ゲーミングルータ』奥一穂 - The 30th Anniversary of Ruby**
  - https://www.youtube.com/live/cmd5NdMjHkI?si=ve-3iGDVVpHr1zYI&t=12699
  - (Rubykaigi じゃなかった)
- **Consensus in Internet Standards**
  - https://www.mnot.net/blog/2024/05/24/consensus
  - 「コンセンサス」とは何か?についてと、その優位性や問題点などについて

### CDN 動向

#### Cloudflare

- 2024 年第 1 四半期インターネットの障害のまとめ
  - https://blog.cloudflare.com/ja-jp/q1-2024-internet-disruption-summary-ja-jp/
- **Using Fortran on Cloudflare Workers**
  - https://blog.cloudflare.com/using-fortran-on-cloudflare-workers/

#### Fastly

- Getting started with Fastly CDN is easier than ever with Glitch | Fastly
  - https://www.fastly.com/blog/getting-started-with-fastly-cdn-is-easier-than-ever-with-glitch/

#### Other

- Understand Interaction to Next Paint (INP) with the Vercel Toolbar - Vercel
  - https://vercel.com/changelog/interaction-timing-tool
- Uncover accessibility issues on your deployments from the Vercel Toolbar - Vercel
  - https://vercel.com/changelog/accessibility-tool

### セキュリティ動向

- **Google Chrome's new post-quantum cryptography may break TLS connections**
  - https://www.bleepingcomputer.com/news/security/google-chromes-new-post-quantum-cryptography-may-break-tls-connections/
  - Chrome 124 から Post Quantum な TLS が有効になった
  - X25519Kyber768 なので鍵の長さが 35 倍くらいデカくなる
  - パケットが分割することがあり、ちゃんと実装してないと通らないことがある
  - https://tldr.fail という解説サイトができた
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6xfaov3Z4yo
  - https://medium.com/asecuritysite-when-bob-met-alice/having-your-crypto-handshaking-cake-and-eating-it-x25519-or-kyber-why-not-have-both-18b90f90dbbd
  - https://blog.chromium.org/2023/08/protecting-chrome-traffic-with-hybrid.html
- **【重要】EV 証明書における再発行、ならびに入れ替え手順のご案内**
  - https://knowledge.digicert.com/ja/jp/alerts/ALERT2847
  - 証明書の Business Category フィールドの大文字小文字を間違えたので再発行する
  - "Private Organization" を "Private organization"

### 周辺動向

- **State of HTML 2023**
  - https://2023.stateofhtml.com/en-US/
  - インタラクティブな UI 要素とカスタマイズ性が強く求められている
- **No One Should Have That Much Power**
  - https://www.mnot.net/blog/2024/04/29/power
- **Modularity: Enabling Interoperability and Competition**
  - https://www.mnot.net/blog/2024/05/10/design-rules-vol-one
- **The Web Conf 2024, Singapore: Trip report**
  - https://blog.tomayac.com/2024/05/22/the-web-conf-2024-singapore-trip-report/
- Behind the scenes of Threads for web - Engineering at Meta
  - https://engineering.fb.com/2024/05/14/web/threads-for-web-behind-the-scenes/
- Post-quantum readiness for TLS at Meta - Engineering at Meta
  - https://engineering.fb.com/2024/05/22/security/post-quantum-readiness-tls-pqr-meta/
- Composable data management at Meta - Engineering at Meta
  - https://engineering.fb.com/2024/05/22/data-infrastructure/composable-data-management-at-meta/
- **HTML attributes vs DOM properties - JakeArchibald.com**
  - https://jakearchibald.com/2024/attributes-vs-properties/
  - HTML の属性と DOM 要素のプロパティの違い
  - シリアライズ、大文字小文字の処理、reflection など
  - > In my opinion, attributes should be for configuration, whereas properties can contain state.
- **142001 - innerHTML in XML (XHTML) not supported**
  - https://bugs.kde.org/show_bug.cgi?id=142001#c8
  - Apple がフォークし WebKit の元になった KDE のレンダリングエンジン KHTML がなくなった
- **「twitter .com」から「x .com」へのリダイレクト開始 ～「Firefox」などではトラブルも - 窓の杜**
  - https://forest.watch.impress.co.jp/docs/news/1592486.html
  - twitter.com -> x.com へのリダイレクトが始まった
  - Firefox や Edge のトラッキング防止機能を Strict にしていると一時見られなくなっていた

### Cookie 動向

### イベント

- 6 月
  - 3-5: Web Engine Hackfest
    - https://webengineshackfest.org/
  - 10-14: WWDC
    - https://developer.apple.com/wwdc24/
  - 20-26: IETF 120 Vancouver
    - https://www.ietf.org/meeting/120/
- 7 月

### Wrap Up

- Chrome
  - 125
    - new syntax for custom :state()
    - CSS anchor positioning
    - DevTools の CSS selector stats ツールが Edge から upstream された
  - 126 beta
    - cross-document view transitions for same-origin nav
  - I/O
    - CSS と Web UI
    - マルチページ view transitions
  - Ship
    - tabbed web apps
    - view transitions same-origin navigation
    - stop modifying author-defined selection colors
    - deprecate Mutation Events
    - 3PCD Grace Period opt-out
    - Importmap Integrity
    - Anchor Positioning anchor-scope
    - align navigator.cookieEnabled
  - Prototype
    - find-in-page highlight pseudos
    - multi-arg alt text in CSS `content`
    - align Trusted Types
    - Partitioned Popins
  - Experiment
    - keyboard-focusable scroll containers optout
    - origin trial for 3PCD
    - skip ad in PiP window
  - Deprecate and Remove
    - unpartitioned 3rd party storage, sw and com apis
  - PSA
    - text-size-adjust improvements
  - web.dev
    - What's new in the web
    - webstatus.dev
  - Google Developer Blog
  - Chrome Developers
    - alternate proposal for CSS masonry
  - Chromium blog
    - Chrome address bar ❤️ ML
    - Kyber の鍵サイズで起こった問題から PKI の俊敏性大事という話
- Firefox
  - 126
    - Copy without site tracking
    - M3 Mac AV1 hardware acceleration
    - RTX video super resolution / video HDR
    - CSS zoom
    - zstd
    - URL.parse()
  - Ship
    - navigator.clipboard.read/write
    - New Set methods
    - HTTPS record w/o DoH
  - Prototype
    - CSS anchor positioning
    - Bounse Tracking Mitigations
    - CHIPS
  - Standard Position
    - Negative
      - Digital Credentials
    - Defer
      - Partitioned Popins
  - other
    - 縦タブとかやっていくよという話
- Safari
  - Safari 17.5
    - text-wrap: balance
    - light-dark()
    - query for importing CSS
  - blog
  - Standard Position
    - Support
      - Importmap Integrity
      - ReadbelStream Async Iteration
      - supports() for @import
      - Compression Dictionary Transport
      - ORB
    - Oppose: Gyroscope, Accelerometer, Magnetometer, Motion, Orientation
  - other
- Edge
  - Build 2024
    - Copilot の話が中心
    - WebNN の話ばかり
- W3C/WHATWG
  - Draft
    - WCAG3 update
  - Open/UI
    - Stylable Select / appearance: base の議論
  - Other
    - AB Election に LY の人
    - Apple から E2E 系の API 提案
- TC39
  - Record & Tuple まだ諦めて無かった
- WinterCG
  - 特になし
- IETF
  - Kazuho さんの HTTP とゲーミングルータの話
  - 「コンセンサスとは」 by mnot
- CDN 動向
  - - セキュリティ動向
  - X25519Kyber768 で ClientHello パケットが分かれて障害
  - Digicert が EV の大文字小文字間違えて再発行
- 周辺動向
  - State of HTML 2023
  - Web Conf 2024 Singapore
  - HTML attr vs DOM prop
  - KHTML がなくなった
  - twitter.com -> x.com
- Cookie 動向
