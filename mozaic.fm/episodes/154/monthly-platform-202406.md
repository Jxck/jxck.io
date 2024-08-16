---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep154.mp3
published_at: 2024-06-30
guest: [@myakura](https://twitter.com/myakura)
---

# ep154 Monthly Platform 202406

## Theme

第 154 回のテーマは 2024 年 6 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 126

#### Updates

- **Chrome 126**
  - https://developer.chrome.com/release-notes/126
  - CSS
    - **Cross-document view transitions for same-origin navigations**
  - Web APIs
    - Gamepad API trigger-rumble extension
    - **ChromeOS tabbed web apps**
    - toJSON() method for GeolocationCoordinates and GeolocationPosition
    - WebGLObject Web IDL superinterface
    - Re-enabling the CloseWatcher API and close requests for dialog and popover=""
  - Attribution Reporting API: Referrer policy for attributionsrc requests
  - Media
    - MP4 container support for MediaRecorder
    - OpusEncoderConfig signal and application parameters
  - JavaScript
    - visualViewport onscrollend support
  - Privacy
    - **Align navigator.cookieEnabled with spec**
  - Accessibility
    - Support for the UI Automation Accessibility Framework on Windows
  - New origin trials
    - FedCM as a trust signal for the Storage Access API
    - Media previews opt-out
    - FedCM: Continuation API, Parameters API, Fields API, Multiple configURLs, Custom Account Labels
    - Page-Embedded Permission Control
  - Deprecations and removals
    - **Dreprecate and remove import assertion 'assert' syntax**
- New in Chrome 126
  - https://developer.chrome.com/blog/new-in-chrome-126
  - Cross-document view transitions for same-origin navigations
  - CloseWatcher API re-enabled
  - Gamepad API trigger-rumble extension
- **Chrome 127 beta**
  - https://developer.chrome.com/blog/chrome-127-beta
  - CSS
    - **CSS font-size-adjust**
    - **Multi-argument alt text in CSS generated content**
    - **Support for view transitions in iframes**
  - Web APIs
    - Additions to Attribution Reporting
    - Automatic fullscreen content setting
    - **Document picture-in-picture: propagate user activation**
    - **Importmap integrity**
    - Keyboard focusable scroll containers
    - No-Vary-Search support for prerender
    - Video Chapter in MediaMetadata
    - WebGPU: GPUAdapter info attribute
  - Origin trials in progress
    - **Compression dictionary transport with Shared Brotli and Shared Zstandard**
    - **Deprecate 0.0.0.0 for Private Network Access (PNA)**
    - Deprecate third-party cookies
    - Partitioning Storage, Service Workers, and Communication APIs
    - Keyboard focusable scroll containers deprecation trial
  - Deprecations and removals
    - Mutation events
    - **Restrict "private network requests" for subresources from public websites to secure contexts**
    - **Remove old CSS custom state syntax**
- **What's new in DevTools, Chrome 126**
  - https://developer.chrome.com/blog/new-in-devtools-126
  - Performance panel improvements
    - Move and hide tracks with updated track configuration mode
    - Ignore scripts in the flame chart
    - **Throttle down the CPU by 20 times**
  - Performance insights panel will be deprecated
  - Paste entire header strings to override them
  - Find excessive memory usage with new filters in heap snapshots
  - Inspect storage buckets in Application > Storage
  - **Disable self-XSS warnings with a command-line flag**
  - Lighthouse 12.0.0
    - **PWA の項目が削除**
- What's New in WebGPU (Chrome 126)
  - https://developer.chrome.com/blog/new-in-webgpu-126

#### Intents

- Ship: Deprecation of non-standard declarative shadow DOM serialization
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vMqW3pfItl0
- Ship: Protected Audience: Allow trusted bidding signals to trigger interest group updates
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eXJLbFAuSU8
- **Ship: Snap Events**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-naLTco_PEo
- Ship: WebAuthn hints
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6g4USgLL7m4
- Ship: WebGPU: GPUAdapter info attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eZqMmX7q_bA
- Ship: CSS ruby-align property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_ty_-6f0u-Q
- Ship: No-Vary-Search Hint for Prerender Speculation Rules
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/n_OnfEwd8s0
- Ship: No-Vary-Search support for prerender
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fKPnoCqD5OQ
- **Ship: document.caretPositionFromPoint API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Rc1ZkD9ScTQ
- Ship: Attribution Reporting Feature: Aggregate Debug Reporting
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LAgnyPsJyJg
- Ship: Protected Audience - Fix implementation and spec for renderSize
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/d0nLVZ_KrEc
- Ship: Support 'color-interpolation: linearrgb' on SVG gradients
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/f4G79ZZX_tE
- **Implement and Ship: Line-breakable ruby**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vkWGs7_yWZM
- **Implement and Ship: `aria-rowindextext` and `aria-colindextext`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qEao9pwW-uQ
- Prototype and Ship: Compute Pressure WebDriver endpoints
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5Q9m4kNnhOY
- **Prototype: Full and unprefixed box-decoration-break support**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PyIR0yUMYsM
- **Prototype: CSS Masonry**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/27RxGVTrlrU
- Prototype: CSS ruby-align property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wyzfiAi1pVg
- Prototype: RTPTransport WebRTC API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7nWHhgNTGG8
- Prototype: ServiceWorkerAutoPreload
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vp83zL5uomg
- **Prototype: Sideways writing modes**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UxztgOj6A_M
- Prototype: noopener-allow-popups COOP value
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7j5YYggxEz4
- **Prototype: Background Mask/Segmentation**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nWEqxi83rus
- **Prototype: canvas `placeElement()`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ingR7ZCigUA
  - 任意の HTML 要素の描画状態を canvas に渡す
  - canvas のテキストレンダリングを改善したい目的
  - DOM 側でやって canvas に転送することで HTML のスタックを再利用
- **Prototype: headingstart attribute.**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FeGCYqxpOO4
  - ElementInternals#connectedSignal _not_ headingstart のミス
- Experiment: WebGPU Subgroups experimentation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9SPlKwQRxxc
- **Experiment: Digital Credential API[a]**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ak8HvMr-GR4
- **Experiment: Reverse origin trial for Standardized CSS zoom**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yAMkrSNMxuY
- Extend Deprecation Trial: Restrict "private network requests" for subresources from public websites to secure contexts.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NCV3anf1KtU
- Extend Experiment: Compression Dictionary Transport
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9iMl0kAA2LE
- Extend Experiment: Tabbed web apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oPeHkcg6lU8
- Extend Experiment: Cookie Deprecation Label
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/v3PiIzm1M-Y
- Extend Experiment: JavaScript Promise Integration
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nk5CV32U-BU
- Ready for Developer Testing: Web Authentication API: JSON serialization methods
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/A7qVOvCAw0I
- Change:
- Unship:
- **Deprecate and Relaunch: CHIPS on WebView**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_hHg5MASz4s
- **Deprecate and Remove: 0.0.0.0 for Private Network Access**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9uymCQNGVgw
- Web-Facing Change PSA: View Transitions in iframes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VlAubz58zho
- Web-Facing Change PSA: Minimum size of `<option>` within `<select>` dropdown
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hGtkC0lDp6E
- Web-Facing Change PSA: Write `image/svg+xml` content in UTF-8 format on Windows.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bsjnNMEslYU
- **Web-Facing Change PSA: Support currentcolor in Relative Color Syntax**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pgmTJgcZPlI
- **PSA: Windows default CJK fonts changes**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/t1Mc7oJdNQY
  - Windows のデフォルトのフォントを Noto Sans CJK にするという提案
- **Upcoming roll-out plans for the Rust-based secure font stack in Blink**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4xUt73fxCrU
- **Save the date for BlinkOn 19!**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/W4qzV8JDLoE
  - 2024/10/8 ~ 10 まで、 Mountain View で開催

#### Other

- web.dev
  - blog
    - New to the web platform in May
      - https://web.dev/blog/web-platform-05-2024
    - The JavaScript Set methods are now part of Baseline
      - https://web.dev/blog/set-methods
  - article
    - Optimize Largest Contentful Paint
      - https://web.dev/articles/optimize-lcp
    - Optimize Time to First Byte
      - https://web.dev/articles/optimize-ttfb
    - Practical prompt engineering for smaller LLMs
      - https://web.dev/articles/practical-prompt-engineering
    - Understand LLM sizes
      - https://web.dev/articles/llm-sizes
    - Time to First Byte (TTFB)
      - https://web.dev/articles/ttfb
    - Modify DOM order with tabindex
      - https://web.dev/articles/using-tabindex
    - Find slow interactions in the field
      - https://web.dev/articles/find-slow-interactions-in-the-field
    - Manually diagnose slow interactions in the lab
      - https://web.dev/articles/manually-diagnose-slow-interactions-in-the-lab
    - Customize media notifications and playback controls with the Media Session API
      - https://web.dev/articles/media-session
    - Best practices for cookie notices
      - https://web.dev/articles/cookie-notice-best-practices
    - Web permissions best practices
      - https://web.dev/articles/permissions-best-practices
    - Debug performance in the field
      - https://web.dev/articles/debug-performance-in-the-field
    - Measure and debug performance with Google Analytics 4 and BigQuery
      - https://web.dev/articles/vitals-ga4
- google for developers
  - How it's Made: GenType Alphabet Creator - Google Developers Blog
    - https://developers.googleblog.com/en/how-its-made-gentype-alphabet-creator/
  - How We Built It: The I/O Crossword - Google Developers Blog
    - https://developers.googleblog.com/en/how-we-built-the-io-crossword/
- google developer japan blog
  - https://developers-jp.googleblog.com/
  - Google Developers Japan: セキュリティ レポートを活用してウェブ アプリケーションへの潜在的な脅威を明らかにする
    - https://developers-jp.googleblog.com/2024/06/uncovering-potential-threats-to-your.html
  - Google Developers Japan: 共有メモリのバージョニングを導入して遅いインタラクションを改善する
    - https://developers-jp.googleblog.com/2024/06/introducing-shared-memory-versioning-to.html
  - **Google Developers Japan: Manifest V2 の段階的廃止を開始**
    - https://developers-jp.googleblog.com/2024/06/manifest-v2-phase-out-begins.html
    - > 現在、 Chrome ウェブストアで活発にメンテナンスが行われている拡張機能の 85% 以上が Manifest V3 で動作しています
  - **Google Developers Japan: カスタムタブの最小化でマルチタスクが簡単に**
    - https://developers-jp.googleblog.com/2024/06/multi-tasking-with-minimized-custom-tabs.html
- chrome developer blog
  - https://developer.chrome.com/blog/
  - Skip review for eligible changes to extensions
    - https://developer.chrome.com/blog/extensions-skip-review-eligible-changes
  - 3 new features to customize your performance workflows in DevTools
    - https://developer.chrome.com/blog/devtools-customization
  - The latest in CSS and web UI: I/O 2024 recap
    - https://developer.chrome.com/blog/new-in-web-ui-io-2024
  - **An origin trial for a new HTML `<permission>` element**
    - https://developer.chrome.com/blog/permission-element-origin-trial
    - Permission Prompt はブラウザが出していた
      - 出すタイミングをブラウザが知るのが難しい
      - 操作した UI と離れた場所に出てしまう
      - 戻す UI を探すのがユーザにとって難しい
    - `<permission>` 要素
      - 小要素なし
      - テキストは lang 属性で言語だけ指定できる
      - 現在の設定を踏まえて、追加や削除ができる UI が出る
      - CSS で細かくスタイルできる
    - Origin Trial
      - 仕様についてフィードバック募集中
      - 特に CSS とか
  - **Maximum IndexedDB performance with Storage Buckets**
    - https://developer.chrome.com/blog/maximum-idb-performance-with-storage-buckets
  - Behind the Chrome Web Store: Asking Trust & Safety your questions
    - https://developer.chrome.com/blog/behind-chrome-webstore-interview
  - The Long Animation Frame API has now shipped
    - https://developer.chrome.com/blog/loaf-has-shipped
- chromium blog
  - Chromium Blog: Multi-tasking with Minimized Custom Tabs
    - https://blog.chromium.org/2024/05/multi-tasking-with-minimized-custom-tabs.html
  - Chromium Blog: Manifest V2 phase-out begins
    - https://blog.chromium.org/2024/05/manifest-v2-phase-out-begins.html
  - **Chromium Blog: Introducing Shared Memory Versioning to improve slow interactions**
    - https://blog.chromium.org/2024/06/introducing-shared-memory-versioning-to.html
  - Chromium Blog: How Chrome achieved the highest score ever on Speedometer 3
    - https://blog.chromium.org/2024/06/how-chrome-achieved-highest-score-ever.html
  - Chromium Blog: Building a faster, smarter, Chromebook experience with the best of Google technologies
    - https://blog.chromium.org/2024/06/building-faster-smarter-chromebook.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
  - On Fire Drills and Phishing Tests
    - https://security.googleblog.com/2024/05/on-fire-drills-and-phishing-tests.html
  - Staying Safe with Chrome Extensions
    - https://security.googleblog.com/2024/06/staying-safe-with-chrome-extensions.html
  - **Sustaining Digital Certificate Security - Entrust Certificate Distrust**
    - https://security.googleblog.com/2024/06/sustaining-digital-certificate-security.html
    - CA の老舗である Entrust が複数回のインシデントを短期間で発生
    - かつ、対応も悪く、インシデントレポートも適当だった
    - そこで 2024/11/1 以降は Chrome は Entrust の証明書を信用しない
    - `--test-crs-constraints` でエミュレートできるので対応が必要
- search blog
  - https://developers.google.com/search/
  - Adding markup support for organization-level return policies
    - https://developers.google.com/search/blog/2024/06/structured-data-return-policies
  - Search Central Live Bangkok 2024
    - https://developers.google.com/search/blog/2024/06/search-central-live-bangkok-2024
- v8
  - **WebAssembly JSPI has a new API · V8**
    - https://v8.dev/blog/jspi-newapi
- other
  - **How Chromium's cookies get evicted**
    - https://blog.yoav.ws/posts/how_chromium_cookies_get_evicted/
  - **「Chrome Tech Talk Night #16 〜 パスキー」まとめ - @\_Nat Zone**
    - https://www.sakimura.org/2024/06/5901/

### Firefox 動向

#### Stable: 127.0

#### Updates

- **Firefox 127.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/127.0/releasenotes/
  - HTTPS 文書への rel=dns-prefetch をサポート
  - > Links and other focusable elements are now tab-navigable by default on macOS
- **Firefox 127.0.1, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/127.0.1/releasenotes/
- **Firefox 127 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/127
  - グラデーションの interpolation method
  - Set methods
  - サブリソースの自動アップグレード
  - `clipboard.read()`/`write()`
- In a nutshell - These Weeks in Firefox: Issue 162 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2024/06/03/in-a-nutshell-these-weeks-in-firefox-issue-162/
- Here's what we're working on in Firefox
  - https://blog.mozilla.org/en/mozilla/heres-what-were-working-on-in-firefox/
  - 先月分で取り上げた UI の拡張などを行っていくよというフォーラムのポストがブログとしても掲載
- CSS Rules in your Firefox DevTools - These Weeks in Firefox: Issue 163 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2024/06/18/css-rules-in-your-firefox-devtools-these-weeks-in-firefox-issue-163/
- **Experimenting with AI services in Nightly - Firefox Nightly News**
  - https://blog.nightly.mozilla.org/2024/06/24/experimenting-with-ai-services-in-nightly/
  - 選択したテキストを AI で要約しサイドバーに表示する機能を Nightly に追加

#### Intents

- **Ship: CSS @property / properties-and-values API**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/UhQSvl_v6xk
- Ship: MediaKeys::getStatusForPolicy() on Firefox 128
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/mWvxWDI1KD0
- **Ship: Relative Color Syntax support**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/xph2-4tjGLs
- Ship: encryptionScheme in MediaKeySystemMediaCapability
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/lkV2Exx4pPE
- Ship: MediaCapabilitiesKeySystemConfiguration within MediaDecodingConfiguration on Firefox 129
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/DuHpZ5g6z1A
- **Ship: Float16Array**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/2LViBkDMtdk
- Ship: Duplicate Named Capturing Groups
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/EDxO0MD1zkA
- Ship: transition-behavior property
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/qspmx5MnGX0
- Ship: @starting-style rule
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/bxSic3XP7oM
- **Prototype and Ship: (non-standard) CSS -webkit-font-smoothing property**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/zQ4bhw78uac
  - -moz-osx-font-smoothing と同等の挙動をとる -webkit-font-smoothing プロパティを実装
- Prototype and Ship: CSS content property alt text
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/y1be24jf_2o
- Prototype and Ship: Ignore target names which contain both \n and \< characters
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/0ljuu0zhM8s
- Prototype and Ship: text-align: -webkit-{left,right,center} aliases
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/_COZqI70HGc
- **Prototype: Popover=hint**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/vaT1aQGETLM
  - Add AbortSignal for popover.showPopover() for initialize internal CloseWatcher · Issue #10428 · whatwg/html
    - https://github.com/whatwg/html/issues/10428
- **Prototype: field-sizing CSS property**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/btnfPFh2gNE
- **Prototype Javascript "Explicit Resource Management" proposal**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/8idU6OGNajI
  - https://github.com/tc39/proposal-explicit-resource-management
- Unship: disable 'media.hls.enable' on Android
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/7DOnZqybtG4
- Change: Change `click`, `auxclick` and `contextmenu` event class from `MouseEvent` to `PointerEvent`
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/sk-o4YFMqaI
- **Experiment: Privacy-Preserving Attribution**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/D6GZiXW_Da8
  - Mozilla 版 Attribution Reporting, Private Ad Measurement API
- **Unship: `navigator.vibrate()` and Notification.vibrate on Android**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/UEZ753bKK1Q
  - この 4 年間動いていなかった
  - 動いていない API が生えていると feature detection に影響する
- **Planned Deprecation of CDP in Firefox**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Z6Qu3ZT1MJ0
  - Firefox Devtools が Chrome DevTools Protocol のサポートをやめる
  - WebDriver BiDi への移行を促す
- **FYI: HTTPS-First / HTTPS Upgrades in Firefox Nightly**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/yt6Kc8cAHag
- Windows content process sandbox strengthening
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/7M4p9p0msJI
- Searchfox Update: WebIDL indexing and some more
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ZK380LTLbTQ

#### Newsletter

- Deprecating CDP Support in Firefox: Embracing the Future with WebDriver BiDi - Firefox Developer Experience
  - https://fxdx.dev/deprecating-cdp-support-in-firefox-embracing-the-future-with-webdriver-bidi/
- Engineering Effectiveness Newsletter (April and May 2024 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/S1W83XRTk2E
- Firefox WebDriver Newsletter - 127 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-127/
- Firefox DevTools Newsletter - 127 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-127/

#### MDN / Open Web Docs

- A year of publishing the MDN Blog
  - https://developer.mozilla.org/en-US/blog/mdn-blog-one-year-on/
- New JavaScript Set methods | MDN Blog
  - https://developer.mozilla.org/en-US/blog/javascript-set-methods/

#### Standard Position

- 今月 Close された Issue と PR ものをみる
  - https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2024-06-01+
  - Positive
    - Partitioned :visited links history · Issue #1040
      - https://github.com/mozilla/standards-positions/issues/1040
    - Prioritized Task Scheduling: scheduler.yield() · Issue #1039
      - https://github.com/mozilla/standards-positions/issues/1039
    - improved styling of `<details>` and `<summary>` elements · Issue #1027
      - https://github.com/mozilla/standards-positions/issues/1027
  - Nutral
    - Unsanitized HTML read/write in Async Clipboard API · Issue #769
      - https://github.com/mozilla/standards-positions/issues/769
  - Defer
    - Request for Mozilla Position on Interoperable Private Attribution · Issue #753
      - https://github.com/mozilla/standards-positions/issues/753
  - N/A
    - Request for Position: Fullscreen Popup Windows · Issue #714
      - https://github.com/mozilla/standards-positions/issues/714
      - ただ close された

#### Other

- Experimenting with local alt text generation in Firefox Nightly - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2024/05/experimenting-with-local-alt-text-generation-in-firefox-nightly/
- **Help Improve the Mozilla Root Store Policy**
  - https://www.mail-archive.com/dev-security-policy@mozilla.org/msg01587.html
  - Mozilla Root Store Policy を改善するためのアップデート案を募集
- **Mozilla Root Policy: ECC Curves and Signature Length (Mass Certificate Problem Report)**
  - https://www.mail-archive.com/dev-security-policy@mozilla.org/msg01575.html
- Mozilla Corporation org changes to accelerate our path to the future
  - https://blog.mozilla.org/en/mozilla/mozilla-corporation-org-changes-to-accelerate-our-path-to-the-future/
- Building open, private AI with the Mozilla Builders Accelerator
  - https://blog.mozilla.org/en/mozilla/mozilla-builders-accelerator/
- **Firefox will upgrade more Mixed Content in Version 127 - Mozilla Security Blog**
  - https://blog.mozilla.org/security/2024/06/05/firefox-will-upgrade-more-mixed-content-in-version-127/
- Firefox tips and tricks for creatives
  - https://blog.mozilla.org/en/products/firefox/firefox-tips/creatives/
- **Mozilla Welcomes Anonym: Privacy Preserving Digital Advertising**
  - https://blog.mozilla.org/en/mozilla/mozilla-anonym-raising-the-bar-for-privacy-preserving-digital-advertising/
- Firefox tips and tricks for online shopping
  - https://blog.mozilla.org/en/products/firefox/firefox-tips/online-shopping-tips/
- Choose how you want to navigate the web with Firefox
  - https://blog.mozilla.org/en/products/firefox/firefox-news/ai-services-on-firefox/
- **Recent Entrust Compliance Incidents**
  - https://groups.google.com/a/mozilla.org/g/dev-security-policy/c/LhTIUMFGHNw
  - 先月の取りこぼし
  - Entrust のコンプライアンス違反についてのスレッド
  - なにがあったのかについてまとめた Wiki が作られている
  - CA/Entrust Issues - MozillaWiki
    - https://wiki.mozilla.org/CA/Entrust_Issues
    - A. Incidents related to Missing CPS URI in EV Certificates
    - B. Certificates without serverAuth EKU and Delayed Revocation
    - C. Policy-Procedure Failure: CPS
    - D. OCSP and CRL Issues
    - E. Issues in Recent History

### Safari 動向

#### Stable: 17.5

#### Updates

- Safari Technology Preview 196 Release Notes
  - https://webkit.org/blog/15429/safari-technology-preview-196-release-notes/
  - Bugfix only
- **Improving Web Accessibility with Web Platform Tests**
  - https://webkit.org/blog/15400/improving-web-accessibility-with-web-platform-tests/
- **Web technology sessions at WWDC24**
  - https://webkit.org/blog/15494/web-technology-sessions-at-wwdc24/
  - Optimize for the spatial web
  - Streamline sign-in with passkey upgrades and credential managers
  - Build immersive web experiences with WebXR
- **News from WWDC24: WebKit in Safari 18 beta**
  - https://webkit.org/blog/15443/news-from-wwdc24-webkit-in-safari-18-beta/
  - Contents
  - WebXR
  - CSS
    - **View Transitions**
    - **Style Queries**
    - **currentcolor and system color keywords in Relative Color Syntax**
    - Animating display
    - Shaping interaction regions on visionOS
    - **Backdrop Filter**
    - safe in Flexbox
    - **Content visibility**
  - Web apps for Mac
    - Opening links
    - Extension support
  - Safari Extensions
  - Spatial media
  - HTML
    - **Writing Suggestions**
    - **Switch**
      - **haptic feedback**
    - Date and time inputs
    - ARIA
  - Media
    - Video on visionOS
    - Managed Media Source
  - WebRTC
  - Passkeys
  - HTTPS
  - JavaScript
  - Web API
  - Canvas
  - WebGL
  - Web Inspector
  - WKWebView
  - Apple Pay
  - Deprecations
    - Canvas
    - CSS
    - Images
    - Media
    - Storage
    - SVG
    - Web API
  - Bug Fixes and more
    - Accessibility
    - Animations
    - Authentication
    - Canvas
    - CSS
    - Forms
    - History
    - HTML
    - JavaScript
    - Loading
    - Media
    - Networking
    - PDF
    - Rendering
    - Scrolling
    - SVG
    - Web Animations
    - Web API
    - Web Apps
    - Web Assembly
    - Web Inspector
    - Web Views
    - WebRTC
- **Try out your website in the spatial web**
  - https://webkit.org/blog/15421/try-out-your-website-in-the-spatial-web/
  - visionOS 2 での spatial web の開発とデバッグ
- **Release Notes for Safari Technology Preview 197**
  - https://webkit.org/blog/15687/release-notes-for-safari-technology-preview-197/
  - Fix only

#### Standard Positions

- 今月 Close されたものをみる
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2024-06-01+
  - Support
    - improved styling of `<details>` and `<summary>` elements · Issue #351
      - https://github.com/WebKit/standards-positions/issues/351
    - View Transition Classes · Issue #321
      - https://github.com/WebKit/standards-positions/issues/321
  - Withdrawn
    - Interoperable Private Attribution (IPA) · Issue #142
      - https://github.com/WebKit/standards-positions/issues/142
    - Fullscreen Popup Windows · Issue #101
      - https://github.com/WebKit/standards-positions/issues/101

#### Other

- Blog - Private Cloud Compute: A new frontier for AI privacy in the cloud - Apple Security Research
  - https://security.apple.com/blog/private-cloud-compute/
  - Apple Intelligence でクラウドで行う処理
  - RSA Blind Signatures や OHTTP relay を使用

### Edge 動向

#### Stable:

#### Updates

- **An even faster Microsoft Edge - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2024/05/28/an-even-faster-microsoft-edge/
  - React で作られていた Edge の UI をウェブコンポーネントに置き換え
  - 低メモリな環境で大きくパフォーマンスが向上

#### Other

- Attack Techniques: Trojaned Clipboard - text/plain
  - https://textslashplain.com/2024/06/04/attack-techniques-trojaned-clipboard/
- Attack Techniques: PayPal Invoice Scams - text/plain
  - https://textslashplain.com/2024/06/05/attack-techniques-paypal-invoice-scams/
- **Memento Mori - Farewells - text/plain**
  - https://textslashplain.com/2024/06/10/memento-mori-farewells/
  - IE の XSS Filter をはじめマイクロソフトのウェブセキュリティに尽力した David Ross が亡くなったことを受け、この数年で亡くなった知人を偲ぶ
- Mitigating RIDL Side-Channel Attack in Microsoft Edge on Windows | Microsoft Browser Vulnerability Research
  - https://microsoftedge.github.io/edgevr/posts/Mitigating-RIDL-Side-Channel-Attack-in-Microsoft-Edge-on-Windows/

### WHATWG/W3C 動向

#### Draft

- Recommendation
  - Updated W3C Recommendation: CSS Containment Module Level 1
    - https://www.w3.org/news/2024/updated-w3c-recommendation-css-containment-module-level-1/
- Proposed Recommendation
  - Data Catalog Vocabulary (DCAT) - Version 3 is a W3C Proposed Recommendation
    - https://www.w3.org/news/2024/data-catalog-vocabulary-dcat-version-3-is-a-w3c-proposed-recommendation/
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - First Public Working Draft: Accessibility Conformance Testing (ACT) Rules Format 1.1
    - https://www.w3.org/news/2024/first-public-working-draft-accessibility-conformance-testing-act-rules-format-1-1/
  - Draft Notes: Uighur, Urdu, and Perso-arabic Kashmiri Layout Requirements
    - https://www.w3.org/news/2024/draft-notes-uighur-urdu-and-perso-arabic-kashmiri-layout-requirements/
  - Group Note: Verifiable Credentials Overview
    - https://www.w3.org/news/2024/group-note-verifiable-credentials-overview/
  - Draft Note: Adlam Layout Requirements
    - https://www.w3.org/news/2024/draft-note-adlam-layout-requirements/
  - Group Note: EPUB Fixed Layout Accessibility
    - https://www.w3.org/news/2024/group-note-epub-fixed-layout-accessibility/

#### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- 5/30
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-05-30.md
  - **[invokers] bikeshed the attribute names. #998**
  - **Toggle Button Proposal #1058**
- 6/27
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-06-27.md
  - Welcome back... and, no meeting next week due to holiday conflicts
  - **[select] as an alternative to split buttons and `<button type=popover>` #1063**
  - **[interest invokers] How to define/control the action on "losing interest" #1064**
  - **Introduction to Foundation for the Global Design System component library #1066[b]**
- #### Other
- Web Accessibility: removing barriers, designing a web for everyone | 2024 | Blog | W3C
  - https://www.w3.org/blog/2024/web-accessibility-removing-barriers-designing-a-web-for-everyone/
- **Compression Standard**
  - https://compression.spec.whatwg.org/
  - CompressionStream の仕様が WHATWG に移管
- Authorized Translation of WCAG 2.2 in Dutch
  - https://www.w3.org/news/2024/authorized-translation-of-wcag-2-2-in-dutch/
- **W3C Advisory Committee Elects Advisory Board**
  - https://www.w3.org/news/2024/w3c-advisory-committee-elects-advisory-board/

### TC39 動向

#### Meeting

- 2024-06
  - https://github.com/tc39/agendas/blob/main/2024/06.md
  - https://github.com/tc39/notes
    - まだ

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2024-01-01}...main@{2024-02-01}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->2.7
- 2.7->3
- 3->4

#### New Proposals

#### Other

- **ECMAScript ® 2024 Language Specification**
  - https://tc39.es/ecma262/2024/
  - RegExp v flag
  - Promise.withResolvers
  - Object/Map.groupBy
  - Atomics.waitAsync
  - String.prototype.isWellFormed
  - String.prototype.toWellFormed

### WinterCG

#### Meeting

- 2024-06
  - https://github.com/wintercg/admin/issues
  - 5, 6 月は meeting なし

### IETF 動向

#### WG

- RFC
  - RFC 9576 on The Privacy Pass Architecture
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/f5Kh03veJwVdJndFDzMc8WSrwR8/
  - RFC 9577 on The Privacy Pass HTTP Authentication Scheme
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/aPm9rPvPwwXd6kvEVLgkbz7yeXM/
  - RFC 9578 on Privacy Pass Issuance Protocols
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/DhtDvBaItq3icWJKSNvKV5xJ24g/
  - RFC 9583 on Application Scenarios for the Quantum Internet
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/nfAtJNR1ZQFTf3w4Sg55UTTiKMw/
- Work
  - Working Group Last Call: Compression Dictionary Transport
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024AprJun/0089.html
  - Working Group Last Call: The Concealed HTTP Authentication Scheme
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024AprJun/0080.html
  - [httpapi] I-D Action: draft-ietf-httpapi-deprecation-header-04.txt
    - https://mailarchive.ietf.org/arch/msg/httpapi/US5958XkHNG-Aq6dvSFvFhdujFE/
- Meeting

#### Other

### CDN 動向

#### Cloudflare

- Extending local traffic management load balancing to Layer 4 with Spectrum
  - https://blog.cloudflare.com/extending-local-traffic-management-load-balancing-to-layer-4-with-spectrum/
- Cloudflare incident on June 20, 2024
  - https://blog.cloudflare.com/cloudflare-incident-on-june-20-2024/
- **Automatically replacing polyfill.io links with Cloudflare's mirror for a safer Internet**
  - https://blog.cloudflare.com/automatically-replacing-polyfill-io-links-with-cloudflares-mirror-for-a-safer-internet/

#### Fastly

- **Fastly drives improved internet routing security with global push to adopt RPKI | Fastly[c]**
  - https://www.fastly.com/blog/fastly-drives-improved-internet-routing-security-with-global-push-to-adopt/
- **Time's up! How RPKI ROAs perpetually are about to expire | Fastly**
  - https://www.fastly.com/blog/times-up-how-rpki-roas-perpetually-are-about-to-expire/
- **Fastly and Google partner to enhance your privacy while protecting Chrome users from online threats in real-time | Fastly**
  - https://www.fastly.com/blog/fastly-and-google-partner-to-enhance-your-privacy-while-protecting-chrome/
  - セーフブラウジングで Fastly の OHTTP と統合
  - Edge 上の WASM で実装されている
- Everything we announced at our first Fastly Special Event | Fastly
  - https://www.fastly.com/blog/everything-we-announced-at-our-first-fastly-special-event/
  - The big one: Free Fastly accounts!
  - AI, but make it instant!
  - Glitch opens up
  - Sustainability Dashboard
  - Fanout, Domainr, Fastly KV Store, and much more!
- **Fast Forward: We're here for the maintainers | Fastly**
  - https://www.fastly.com/blog/fast-forward-were-here-for-the-maintainers/
  - Linux Foundation に 4000 万ドルの寄付
- **It's free, instant, and yours! Fastly's free developer accounts are here | Fastly**
  - https://www.fastly.com/blog/its-free-instant-and-yours-fastlys-free-developer-accounts-are-here/
  - 開発者向けの無料アカウント開始
  - CDN, DDoS mitigation, Compute, WebSocket, Push Notification, Storage, Logging, Image Optimize, etc

#### Other

### セキュリティ動向

- Notes on Post-Quantum Cryptography for TLS 1.2
  - https://educatedguesswork.org/posts/pq-tls12/
- **KADOKAWA グループの複数ウェブサイトにおける障害の発生について | 株式会社 KADOKAWA のプレスリリース**
  - https://prtimes.jp/main/html/rd/p/000014844.000007006.html
  - 当社サービスへのサイバー攻撃に関するご報告とお詫び | 株式会社ドワンゴ
    - https://dwango.co.jp/news/5131439897051136/
  - 当社サービスへのサイバー攻撃に関する FAQ | 株式会社ドワンゴ
    - https://dwango.co.jp/news/5088891233107968/
  - ランサムウェア攻撃による情報漏洩に関するお知らせとお詫び
    - https://tp.kadokawa.co.jp/.assets/240628_release_f1wyy3RN.pdf
  - ニコニコチャンネルプラス Portal
    - https://nicochannel.jp/portal/notification_detail?id=195
    - 28 日からニコニコチャンネルプラスのサービスを一部再開
- **Polyfill supply chain attack hits 100K+ sites**
  - https://sansec.io/research/polyfill-supply-chain-attack
  - 中国資本になった polyfill.io が悪意あるスクリプト入れ始める
- **国民のためのサイバーセキュリティサイト**
  - https://www.soumu.go.jp/main_sosiki/cybersecurity/kokumin/
  - 5/24 リニューアル
  - 安全なパスワードの設定・管理 | 国民のためのサイバーセキュリティサイト
  - https://www.soumu.go.jp/main_sosiki/cybersecurity/kokumin/security/business/staff/06/
  - 迷惑メールは「meiwaku@dekyo.or.jp」に転送しちゃうといいぞ! - やじうまの杜 - 窓の杜
    - https://forest.watch.impress.co.jp/docs/serial/yajiuma/1603696.html

### 周辺動向

- **Masonry and reading order - Rachel Andrew**
  - https://rachelandrew.co.uk/archives/2024/05/26/masonry-and-reading-order/
  - reading-order-items の話
- **(令和 6 年 6 月 12 日)「スマートフォンにおいて利用される特定ソフトウェアに係る競争の促進に関する法律」の成立について | 公正取引委員会**
  - https://www.jftc.go.jp/houdou/pressrelease/2024/jun/240612_digitaloffice.html
  - 公布から 1 年半以内の施行
  - > 指定事業者以外の ブラウザエンジンの利用禁止
  - > 自社のブラウザエンジンの利用を条件とするなど、他のブラウザエンジンの利用を妨げてはならない。【第 8 条第 3 号】
  - > ※正当化事由あり
  - > 指定事業者のサービスのデフォルト設定
  - > ブラウザや検索等について、他の同種のサービスの選択肢を示す選択画面を表示しなければならない。【第 12 条第 1 号ロ、第 2 号ロ】
- **State of JavaScript 2023**
  - https://2023.stateofjs.com/en-US
- **Perplexity AI CEO Aravind Srinivas on plagiarism accusations - Fast Company**
  - https://www.fastcompany.com/91144894/perplexity-ai-ceo-aravind-srinivas-on-plagiarism-accusations
  - Perplexity が robots.txt で AI を拒否しているページを RAG でとってくることがわかり荒れる
  - CEO がクローラーはサードパーティのものであること、そして robots.txt が法的な拘束力がないと言ってさらに荒れている
- **So You Want To Build A Browser Engine**
  - https://robert.ocallahan.org/2024/06/browser-engine.html
  - 元 Mozilla の Robert O'Callahan によるポスト
  - ブラウザを作るにも、セキュリティやパフォーマンスの要件が厳しいよと
  - Site Isolation 、メインスレッドでの JavaScript 実行、ページ読み込み、スクロールなど様々な課題がある

### Cookie 動向

### イベント

- 6 月
  - 3-5: Web Engine Hackfest
    - https://webengineshackfest.org/
  - 10-14: WWDC
    - https://developer.apple.com/wwdc24/
    - Web の話なし
- 7 月
  - 20-26: IETF 120 Vancouver
    - https://www.ietf.org/meeting/120/
- 8 月
- 9 月
  - 7: Web Developer Conference 2024 - connpass
    - https://web-study.connpass.com/event/321711/
    - https://fortee.jp/web-dev-conf-2024/proposal/all
  - 23-27: TPAC 2024 Anaheim
    - https://www.w3.org/2024/09/TPAC/

### Wrap Up

- Chrome
  - 126
    - cross-document view transitions
    - chromeos tabbed web apps
    - navigator.cookieEnabled spec alignment
    - deprecate import assertions 'assert'
  - 127 beta
    - multi-argument alt text in css content
    - view transitions in iframes
    - importmap integrity
    - compression dictionary transport with shared brotli and shared zstandard
    - deprecate 0.0.0.0 for PNA
  - Ship
    - snap events
    - document.caretPositionFromPoint
    - line-breakable ruby
    - aria-rowindextext/aria-colindextext
  - Prototype
    - CSS Masonry
    - sideways writing modes
    - background mask/segmentation
    - canvas placeElement()
  - Experiment
    - digital credential API
    - reverse origin trial for CSS zoom
  - PSA
    - Windows default CJK fonts
  - other intents
    - Rust-based font stack
    - BlinkOn 19 in October
  - web.dev
  - Google Developer Blog
  - Chrome Developers
    - PEPC
  - Chromium blog
    - Manifest V2 deprecation
  - other blogs
    - Entrust cert distrust
  - other
    - how chromium's cookies get evicted
    - Chrome tech talk night (passkeys)
- Firefox
  - 127
    - Set methods
    - Mixed content autoupgrade
    - clipboard.read()/write()
  - Ship
    - @property
    - relative color syntax
    - Float16Array
    - -webkit-font-smoothing
  - Prototype
    - popover=hint
    - field-sizing
    - Privacy-preserving attribution
  - unship
    - navigator.vibrate()
  - other intents
  - MDN Blog
  - Standard Position
    - positive
      - :visited partitioning
      - scheduler.yield()
      - styling details
    - neutral
      - unsanitized HTML in clipboard
    - defer
      - IPA
  - other
    - AI sidebar in Nightly
    - HTTPS Upgrade in Nightly
    - planned deprecation of Chrome DevTools Protocol
    - help improve Mozilla Root Store Policy
    - Privacy Priserving Digital Advertising
    - Entrust incidents
- Safari
  - WWDC
    - Spatial Web
    - Passkey
  - 18 beta
    - View Transitions
    - Stile Queries
    - animating display
    - content-visibility
    - writingsuggestion
    - input date/datetime-local
    - deprecations
  - TP 196, 197
    - bugfix
  - blog
    - Spatial Web on visionOS 2
  - Standard Position
    - Support
      - details/summary CSS
      - View Transition Classes
    - Withdrawn
      - IPA
      - Fullscreen popup
  - other
    - Apple Intelligence をクラウドで使う処理
    - Blind Signature / OHTTP を使用
- Edge
  - Edge の React UI を WebComponents に置き換え
- W3C/WHATWG
  - Draft
  - Open/UI
    - invoker の command への rename
    - Toggle Button Proposal
    - Global Design System
  - Other
    - Compression Standard
    - W3C AB election result
- TC39
  - ES2024
- WinterCG
- IETF
  - Compression Dictionary Transport の WGLC
- CDN 動向
  - Cloudflare
    - polyfill.io の URL 自動書き換え
  - Fastly
    - RPKI の話
    - Chrome の Safe Browsing で OHTTP
    - Linux Foundation に 4000 万ドル寄付
    - 開発者向け無料アカウント
- セキュリティ動向
  - KADOKAWA のランサムウェア
  - Polyfill.io のサプライチェインアタック
  - 国民のためのサイバーセキュリティサイト
- 周辺動向
  - Masonry の説明と reading-order-items の話
  - 公正取引委員会によるスマホの独占禁止法制定
  - State of JS 2023
  - Perplexity が robots.txt を無視して炎上
  - ブラウザを作りたい人へのアドバイス
- Cookie 動向
