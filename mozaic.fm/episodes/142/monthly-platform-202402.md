---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep142.mp3
published_at: 2024-02-27
guest: [@myakura](https://twitter.com/myakura)
---

# ep142 Monthly Platform 202402

## Theme

第 142 回のテーマは 2024 年 2 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 122

#### Updates

- New in Chrome 121
  - https://developer.chrome.com/blog/new-in-chrome-121
  - CSS updates.
    - scrollbar-color
    - scrollbar-width
    - font-palette
    - ::spelling-error
    - ::grammar-error
    - mask-mode
    - mask-composite
    - mask-position
    - mask-repeat
  - Speculation Rules API updates
  - Element Capture API origin trial
  - And more!
    - `resizeBy()` and `resizeTo()` in DPinP
    - `<select>` `showPicker()`
    - **scope_extensions OT**
- Chrome 122 beta
  - https://developer.chrome.com/blog/chrome-122-beta
  - CSS
    - CSS @container queries with unsupported features never match
    - CSS pseudo-element ::backdrop inheriting from originating element
    - CSS supports() conditions for @import
  - Web APIs
    - Async Clipboard API: Read unsanitized HTML
    - Do not delete File kind objects in dataTransfer.clearData()
    - FedCM: disconnect
    - Interoperable mousedown event cancellation in iframe
    - **Iterator helpers**
    - MessagePort.onclose
    - RTCRtpSender setParameters() extensions for requesting the generation of a key frame
    - **Set methods**
    - **Storage Buckets API**
    - URLPattern: hasRegExpGroups
    - WebGL drawingBufferStorage
    - X25519Kyber768 key encapsulation for TLS
  - Origin trials in progress
    - Web app scope extensions
    - Captured Surface Control
- New in Chrome 122
  - https://developer.chrome.com/blog/new-in-chrome-122
  - Storage Buckets API.
  - DevTools improvements in the Performance Panel
  - Async Clipboard API unsanitized option
  - And more!
- What's new in DevTools (Chrome 122)
  - https://developer.chrome.com/blog/new-in-devtools-122
  - The official collection of Recorder extensions is live
  - Network improvements
    - Failure reason in the Status column
    - Improved Copy submenu
  - Performance improvements
    - **Breadcrumbs in the Timeline**
    - Event initiators in the Main track
    - JavaScript VM instance selector menu for Node.js DevTools
  - Elements improvements
    - The ::view-transition pseudo-element is now editable in Styles
    - The align-content property support for block containers
  - New shortcut and command in Sources
  - Posture support for emulated foldable devices
  - Dynamic theming
  - Third-party cookies phaseout warnings in the Network and Application panels
  - Lighthouse 11.4.0
  - Accessibility
  - Miscellaneous highlights
- What's New in WebGPU (Chrome 122)
  - https://developer.chrome.com/blog/new-in-webgpu-122
- Chrome 123 beta
  - https://developer.chrome.com/blog/chrome-123-beta
  - CSS
    - **CSS light-dark() color function**
    - CSS picture-in-picture display mode
    - **align-content CSS property for blocks**
    - The field-sizing CSS property
    - **The CSS text-spacing-trim property**
  - Web APIs
    - Allow for WebAuthn credential creation in a cross-origin iframe
    - Attribution reporting feature bundle
    - Cross App and Web Attribution Measurement
    - blocking=render on inline module scripts
    - Document picture-in-picture: allow the focus() API to focus the opener
    - **Import attributes with syntax**
    - jitterBufferTarget
    - Long Animation Frame Timing
  - **NavigationActivation**
  - pagereveal event
  - PointerEvent.deviceId for Multi-Pen Inking
  - Private network access checks for navigation requests: warning-only mode
  - Private Network Access permission to relax mixed content
  - **Sec-CH-UA-Form-Factor client hint**
  - **Service Worker Static Routing API**
  - Shared Storage update
  - **zstd Content-Encoding**
  - New origin trials
    - **WebAssembly JavaScript promise integration**
  - Removals
    - The window-placement alias for permission and permission policy window-management
- What's happening in Chrome Extensions?
  - https://developer.chrome.com/blog/extension-news-january-2024
  - User Scripts API
  - Reading List API
  - **Declarative Net Request API safe rules**
    - **静的ルールが 50->10 個に**
  - Other API launches
    - Cookies API
    - File Handling API
    - Push API
    - Cross-browser compatibility enhancements
  - Upcoming features...
  - Documentation updates
    - Upcoming guides
    - New video: exploring the platform evolution with Simeon
    - More updates
- **The deprecation trial for SharedArrayBuffer on desktop Chrome is extended to Chrome 124**
  - https://developer.chrome.com/blog/shared-array-buffer-origin-trial-extension-124

#### Intents

- Ship: 'pagereveal' event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/S67zJ1AYW2U
- **Ship: CJK punctuation kerning: the CSS `text-spacing-trim` property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jVUR2ebE3e0
- **Ship: CSS light-dark() Color Function**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IsXAWrFLUHE
- **Ship: Element Reflection**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/j8nZWueWc1s
- **Ship: NavigationActivation**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7dVHYZ-t79I
- Ship: Private Network Access permission to relax mixed content
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LHwLhTlyamM
- Ship: Support in Chrome for the VoiceIsolation getUserMedia constraint
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hPMvCu-3iPA
- Ship: Cross App and Web Attribution Measurement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lG0O_jXbiws
- Ship: CSS paint-order for non-SVG text
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-eflVqNCtDY
- Ship: Remove "window-placement" alias for permission and permission policy "window-management"
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gSOZcL0o3oI
- **Ship: ServiceWorker static routing API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-SEMMttEqz4
- **Ship: WebSocketStream**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wRRCnNLCZs0
  - Origin Trial に参加したパートナーはいないらしい
- Ship: Attribution Reporting API Features (Trigger Data Customization and Aggregatable Value Filters)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NE7VGke1Bjc
- Ship: CSS picture-in-picture display mode
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_Ml1o8xYZc8
- Ship: Document picture-in-picture: allow Window's focus() API to focus opener
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eu2Vyh176wM
- Ship: jitterBufferTarget
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bReU8otUmdk
- Ship: RTCIceCandidate url and relayProtocol attributes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/soL53ANRXpw
- **Ship: Zstd Content-Encoding**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GFFOLCF12a4
- **Ship: setHTMLUnsafe and parseHTMLUnsafe**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6D8RO9F6I04
- Ship: Shadow root clonable attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/u2BMTagIHf4
- **Ship: 'priority' HTTP request header**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/U-XvxP0ZQJ0
- Ship: CSSImportRule.styleSheet
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ku3YsLTllY4
- Ship: Do not invert selection background color when it matches text color
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OzgkJXjxpGs
- Ship: Form Controls Support Vertical Writing Mode Direction Support
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1CpLARiU1LE
- **Ship: MP4 container support for MediaRecorder**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/p1OMVj1FrMI
- Ship: Protected Audience: Downsampled forDebugOnly & Increase number of component ads
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3RUQk0GCC9Q
- **Ship: Sec-CH-UA-Form-Factor client hint**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CVOCZ26iqMY
- Prototype and Ship: Private network access checks for navigation requests: warning-only mode
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UybqE4On0yo
- **Prototype and Ship: Standardized CSS zoom**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/W8j6RKDeRoM
- Implement and Ship: WebAuthn WebDriver backup flags settings
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/p6fqbxRQkxY
- **Prototype and Ship: Streams API: ReadableStream async iteration**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EseAQMDRppM
- **Prototype: CSS functions**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/b-BTxKD-Ldc
- **Prototype: 'writingsuggestions' attribute**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rHyRCx-hJhE
  - on/off のみ
- Prototype: Automatic Fullscreen Content Setting
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CuIqA2v3cvs
- **Prototype: CSS text-box-trim and text-box-edge**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Sn8TF5KHrRU
- Prototype: Call stacks in crash reports from unresponsive web pages
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jKk5OV0FIsY
- Prototype: Delayed clipboard rendering
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZZpEMv0_UXA
- Prototype: Shadow root clonable attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nZhPt0ePCAA
- Prototype: WebGPU: ServiceWorker and SharedWorker support
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/t3V3J7a-lwc
- Prototype: WebXR Spec Parity
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OanB0PaEeCM
- Prototype: Used color scheme root scrollbars
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9gZGGB38LvI
- **Prototype: :open and :closed pseudo-classes**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jESpcXVA8ns
- Prototype: 'pageconceal' event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/skVFFnZgVlY
- **Prototype: CSS line-clamp property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CWP5rb--Gyk
- **Prototype: CSS picture-in-picture display mode**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OE1rXYv126c
- **Prototype: Web Monetization**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4Rqw4SbjO88
- **Prototype: Accessibility and Display: the CSS `reading-order-items` property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/d9jIhcVw8zQ
- Prototype: CSSImportRule.styleSheet
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1i7nqFaNrEo
- **Prototype: Interest Invokers**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UO30brSlWhs
- Experiment: Add JavaScript timer wake up alignment for unimportant cross-origin frames
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/z3A3J3OZRvQ
- Experiment: Document Subtitle (Fix PWA app titles)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kaqecR-ED0A
- Experiment: FedCM multi IDP in single get() call
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xMgHxJ0EdzY
- Extend Experiment: WebRTC encoded transform - Modify Metadata functions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dA4TndGG4VQ
- Extend Origin Trial: Compression Dictionary Transport
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7YdP2YxRQn4
- Ready for Developer Testing: Document Subtitle (Fix PWA app titles)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6srkJ2-HFUg
- PSA: Protected Audience k-Anonymity Enforcement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/exVncc_qAME
- PSA: the feedback survey requirement from Origin Trials will be removed
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/POukyW_tNWM
- PSA: vpython (2.7) to be removed from depot_tools
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/o7XvlLTHpW0
- Web-facing PSA: Allow setting IDP login status from same-site subresources
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/e-ywgfXwai0
- Web-Facing Change PSA: InputDeviceInfo.getCapabilities() for unavailable devices
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LQfs0u-Idns
- Request for Deprecation Trial: Deprecate Mutation Events
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/z-VIfSOco4k
- Deprecate and Remove: fetches for script tags with invalid type/language attributes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eu57SCNltls
- 2 days until Chromium's migration to the new issue tracker begins (Feb 2)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iuK8nF97IHA
- **Chromium Issue Tracker migration begins in less than 24 hours!**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/X1cOhpxdESc
- Chromium's migration to the new issue tracker begins Feb 2
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fG-7CGoAaZ0
- Changes to release workflows in the new Chromium Issue Tracker
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rwnQTzWE4oQ
- Chromium Issue Tracker migration begins now!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GX-nWGDOQEg
- Chromium Issue Tracker migration complete!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9oM14-qTcuM
- Code Search Indexer changing, should be transparent to users
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/W_TU-_lG2R8
- Change:
- Unship:
- Remove:

#### Other

- web.dev
  - blog
    - New to the web platform in January
      - https://web.dev/blog/web-platform-01-2024
    - **Celebrate a more interoperable web with Interop 2023**
      - https://web.dev/blog/interop-2023-wrapup
    - Introducing Learn Performance
      - https://web.dev/blog/introducing-learn-performance
    - Compression Streams are now supported on all browsers
      - https://web.dev/blog/compressionstreams
    - New to the web platform in January
      - https://web.dev/blog/web-platform-01-2024
    - Introducing Learn Testing
      - https://web.dev/blog/introducing-learn-testing
    - **Interaction to Next Paint becomes a Core Web Vital on March 12**
      - https://web.dev/blog/inp-cwv-march-12
    - **Interop 2024**
      - https://web.dev/blog/interop-2024
      - Accessibility
      - CSS Nesting
      - Custom Properties
      - Declarative Shadow DOM
      - font-size-adjust
      - HTTPS URLs for WebSocket
      - IndexedDB
      - Layout
      - Pointer and Mouse Events
      - Popover
      - Relative Color Syntax
      - requestVideoFrameCallback
      - Scrollbar Styling
      - @starting-style and transition-behavior
      - Text Directionality
      - text-wrap: balance
      - URL
      - Investigation
        - Accessibility (carried over from 2023)
        - Mobile Testing (carried over from 2023)
        - Running WebAssembly Spec Tests in WPT
    - Immutable array updates with Array.prototype.with
      - https://web.dev/blog/array-with
    - **Announcing web.dev for China**
      - https://web.dev/blog/web-dev-for-china
      - web.dev for China at web.developers.google.cn.
  - articles
    - Prevent creation of a new passkey if one already exists
      - https://web.dev/articles/webauthn-exclude-credentials
    - Optimize Largest Contentful Paint
      - https://web.dev/articles/optimize-lcp
    - Optimize Cumulative Layout Shift
      - https://web.dev/articles/optimize-cls
    - Web Vitals
      - https://web.dev/articles/vitals
    - Cumulative Layout Shift (CLS)
      - https://web.dev/articles/cls
    - **Loading Third-Party JavaScript**
      - https://web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript
- google for developers
  - The SEO Starter Guide got a makeover
    - https://developers.google.com/search/blog/2024/02/ssg-gets-a-makeover
  - EEA で提供される新しい検索エクスペリエンス: リッチリザルト、アグリゲータ ユニット、絞り込みチップ | Google 検索セントラル ブログ
    - https://developers.google.com/search/blog/2024/02/search-experiences-in-eea
  - バリエーション商品の構造化データのサポート追加 | Google 検索セントラル ブログ
    - https://developers.google.com/search/blog/2024/02/product-variants
- google developer japan blog
  - Google Developers Japan: P-MAX: Google Ads API による検索テーマ(ベータ版)の作成について
    - https://developers-jp.googleblog.com/2024/02/p-max-google-ads-api.html
- chrome developer blog
  - https://developer.chrome.com/blog/
  - DevTools Tips: Debugging speculative navigations for faster page loads
    - https://developer.chrome.com/blog/devtools-tips-31
  - **Introducing a new way to build custom web editing experiences using the EditContext API**
    - https://developer.chrome.com/blog/introducing-editcontext-api
  - Chromium Issue Tracker migration beginning Feb 2, 2024 at 5pm PST
    - https://developer.chrome.com/blog/chromium-issue-tracker-migration-2024
  - Chromium Issue Tracker migration is complete
    - https://developer.chrome.com/blog/chromium-issue-tracker-migration-complete
  - **A 400% faster Performance panel through perf-ception**
    - https://developer.chrome.com/blog/perf-panel-4x-faster
  - **Changes to CSS ::backdrop inheritance**
    - https://developer.chrome.com/blog/css-backdrop-inheritance
  - Announcing Chrome for Developers in China
    - https://developer.chrome.com/blog/chrome-for-developers-china
    - developer.chrome.google.cn
  - **Support for align-content in block and table layouts**
    - https://developer.chrome.com/blog/align-content
  - Changes to BFCache behavior with extension message ports
    - https://developer.chrome.com/blog/bfcache-extension-messaging-changes
- chromium blog
  - Chromium Blog: Chromium Issue Tracker migration beginning Feb 2, 2024 at 5pm PST
    - https://blog.chromium.org/2024/02/chromium-issue-tracker-migration.html
  - Chromium Blog: Chromium Issue Tracker migration is complete
    - https://blog.chromium.org/2024/02/chromium-issue-tracker-migration-is.html
  - **Chromium Blog: Optimizing Safe Browsing checks in Chrome**
    - https://blog.chromium.org/2024/02/optimizing-safe-browsing-checks-in.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
  - Google Online Security Blog: Effortlessly upgrade to Passkeys on Pixel phones with Google Password Manager
    - https://security.googleblog.com/2024/01/upgrade-to-passkeys-on-pixel-with-google-password-manager.html
  - Google Online Security Blog: Scaling security with AI: from detection to solution
    - https://security.googleblog.com/2024/01/scaling-security-with-ai-from-detection.html
  - Google Online Security Blog: UN Cybercrime Treaty Could Endanger Web Security
    - https://security.googleblog.com/2024/02/un-cybercrime-treaty-could-endanger-web.html
  - **Q4 2023 Summary from Chrome Security**
    - https://groups.google.com/a/chromium.org/g/security-dev/c/XCJXKNc2Auk
  - Google Online Security Blog: Improving Interoperability Between Rust and C++
    - https://security.googleblog.com/2024/02/improving-interoperability-between-rust-and-c.html
  - **Federated Credential Management (FedCM) Migration for Google Identity Services - Google for Developers**
    - https://developers.googleblog.com/2024/02/federated-credential-management-migration-for-google-identity-services.html
- search blog
  - https://developers.google.com/search/
- v8
  - Static Roots: Objects with Compile-Time Constant Addresses · V8
    - https://v8.dev/blog/static-roots
- Other
  - **Google がついに検索結果ページでのキャッシュ提供を終了 - GIGAZINE**
    - https://gigazine.net/news/20240205-google-search-kills-off-cached/
    - https://twitter.com/searchliaison/status/1753156161509916873
    - ページ読み込みに失敗してた時代にアクセスできるようにする最古の機能の一つ
    - 今後は Internet Archive へのリンクを考えている
    - これで Google から Internet Archive に資金援助とかあれば、財政難が解決するのでは?
  - Rick Byers on X: "@Rich*Harris @dummdidumm* Lots of us on Chrome have been really interested in that idea too. It's partly where feature policy came from. Maybe we just didn't try hard enough, but I think there's some fundamental differences with web we'd have to account for:" / X
    - https://twitter.com/RickByers/status/1756368036901056812
    - ウェブにバージョニングがあればいいのにという開発者のポストに Rick Byers が反応
    - Chrome でも検討したことがあり、それが Feature Policy に繋がった

### Firefox 動向

#### Stable: 123

- Firefox 123.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/123.0/releasenotes/
- **Firefox 123 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/123
    - Declarative Shadow DOM
    - Early Hints preload

#### Updates

- A Preview of Tab Previews - These Weeks in Firefox: Issue 153 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2024/02/06/a-preview-of-tab-previews-these-weeks-in-firefox-issue-153/
- Monitor, Plus More Improvements - These Weeks in Firefox: Issue 154 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2024/02/15/monitor-plus-more-improvements-these-weeks-in-firefox-issue-154/
- [Reverted] Fixing keyboard navigation in Inspector Rules view - Firefox Developer Experience
  - https://fxdx.dev/rules-view-enter-key/#2024-02-03-update
  - 122.0 で CSS の rules view で Enter を押した時の挙動が変わったが 122.0.1 で取りやめ
  - 元の挙動に慣れていた人の体験を損ねたから

#### Intents

- Ship: Enable pointer events on disabled form elements
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/wl66hiVSWj0
- Ship: Early Hints Preload and Modulepreload for Fx123
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/DgmxpzaZyhQ
- **Ship: Gamepad API outside SecureContext**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/RFiv1oCsAvY
  - Secure Context に限定していた Gamepad API を非 Secure Context にも解放
  - HTTPS が普及したことで限定する必要も無くなったこと、 Chrome との互換性のため
- **Prototype: Float16Array**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Qept1eJ3A9s
- **Prototype: Observable**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/wlikxjO2EbY
- **Prototype: user-find CSS property**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/XGxT2duSlW8
  - 要素をページ内検索 UI の対象から外すためのプロパティを提案
- Prototype: Post-quantum key agreement for TLS using X25519Kyber768
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/xlLoQdgJy-I
- Unship: application/http-index-format
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/7aZ60jqcHFw
- Unship: SVGAElement.prototype.text
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/yT-5Lvuan3M
- Unship: DOMRequest
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Uzl_2JcVn2c
- Change:
- Remove:

#### Newsletter

- Engineering Effectiveness Newsletter (December & January 2023-2024 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/2BQDWPvHzE8
- Firefox WebDriver Newsletter - 122 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-122/
- Firefox DevTools Newsletter - 122 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-122/
- **SpiderMonkey Newsletter (Firefox 122-123) | SpiderMonkey JavaScript/WebAssembly Engine**
  - https://spidermonkey.dev/blog/2024/01/30/newsletter-firefox-122-123.html
- L10n Report: February 2024 Edition | Mozilla L10N
  - https://blog.mozilla.org/l10n/2024/02/02/l10n-report-february-2024-edition/
- Firefox WebDriver Newsletter - 123 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-123/

#### MDN / Open Web Docs

- **Using Web IDL for better web docs**
  - https://openwebdocs.org/content/posts/securecontext-webidl/
- Option Soup: the subtle pitfalls of combining compiler flags - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2024/01/option-soup-the-subtle-pitfalls-of-combining-compiler-flags/
- Announcing Interop 2024 - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2024/02/announcing-interop-2024/
- **interop/2024/README.md at main · web-platform-tests/interop**
  - https://github.com/web-platform-tests/interop/blob/main/2024/README.md
  - Focus areas
    - Accessibility
    - CSS Nesting
    - Custom Properties
    - Declarative Shadow DOM
    - font-size-adjust
    - HTTP(S) URLs for WebSocket
    - IndexedDB
    - Layout
    - Pointer and mouse events
    - Popover
    - Relative Color Syntax
    - HTMLVideoElement.requestVideoFrameCallback()
    - Scrollbar styling
    - @starting-style and transition-behavior
    - Text directionality
    - text-wrap: balance
    - URL
  - Investigation Efforts
    - Accessibility Testing
    - Mobile Testing
    - WebAssembly Testing
- Creating effective technical documentation
  - https://developer.mozilla.org/en-US/blog/technical-writing/

#### Standard Position

- 今月 Close された Issue と PR ものをみる
  - https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2024-02-01+
- Positive
  - :has() selector (Positive)
    - https://github.com/mozilla/standards-positions/pull/986
    - 皆が望んでいた機能であることは認めつつ、パフォーマンスの懸念があると注意書き
  - Add position on ARIA Element Reflection.
    - https://github.com/mozilla/standards-positions/pull/983
  - Add CSS Scoped Styles (positive)
    - https://github.com/mozilla/standards-positions/pull/981
  - Make computation of directionality account for Shadow DOM
    - https://github.com/mozilla/standards-positions/issues/974
  - The `pageconceal` event (part of cross-document view-transitions)
    - https://github.com/mozilla/standards-positions/issues/969
  - WebAuthn: Allow for credential creation in a cross-origin iframe
    - https://github.com/mozilla/standards-positions/issues/964
  - WebAuthn PRF extension
    - https://github.com/mozilla/standards-positions/issues/798
  - Request for position: minPinLength in WebAuthn
    - https://github.com/mozilla/standards-positions/issues/595
  - :has() pseudo class
    - https://github.com/mozilla/standards-positions/issues/528
  - CSS @scope
    - https://github.com/mozilla/standards-positions/issues/472
  - Web Authentication ResidentKeyRequirement and credProps
    - https://github.com/mozilla/standards-positions/issues/456
  - Reflecting IDREF/IDREF list ARIA attributes to element references
    - https://github.com/mozilla/standards-positions/issues/200
- Negative
  - Add Locale Extensions (negative)
    - https://github.com/mozilla/standards-positions/pull/985
  - **Page Embedded Permission Control**
    - https://github.com/mozilla/standards-positions/issues/908
  - Locale Extensions
    - https://github.com/mozilla/standards-positions/issues/844

#### Other

- **Introducing Mozilla Monitor Plus, a new tool to automatically remove your personal information from data broker sites**
  - https://blog.mozilla.org/en/mozilla/introducing-mozilla-monitor-plus-a-new-tool-to-automatically-remove-your-personal-information-from-data-broker-sites/
  - Have I been pownd みたいなサービスを Firefox Monitor としてやっていた
  - それをリブランディング
  - $8.99/month で Monitor Plus も
- Retirement Announcement & Thank You!
  - https://www.mail-archive.com/dev-security-policy@mozilla.org/msg01510.html
  - 2008 年から 16 年 Moziila の Root Store を運営していた Kathleen Wilson が定年退職
- **Next steps for Mozilla and Trustworthy AI**
  - https://blog.mozilla.org/en/mozilla/ai/next-steps-for-mozilla-and-trustworthy-ai/
- A New Chapter For Mozilla
  - https://blog.mozilla.org/en/mozilla/a-new-chapter-for-mozilla-laura-chambers-expanded-role/
  - Mozilla CEO の Mitchell Baker が退任
- **Daniel Holbert on X: "@luke_warlow @ryanflorence I chatted with some folks on Firefox's DOM team - it's on their roadmap for this year, regardless of interop-2024 (not-)inclusion." / X**
  - https://twitter.com/CodingExon/status/1754553898126520572
  - Interop 2024 のスコープにはないので一部でがっかりされた Navigation API だが、 Mozilla の今年のロードマップにはあるらしい
- Can browser choice screens be effective? - Over-the-Edge-Report-January-2024.pdf
  - https://research.mozilla.org/files/2024/01/Over-the-Edge-Report-January-2024.pdf
  - Microsoft 製品の UI デザインが他の検索エンジンとブラウザーを選択させるのを阻害し、 Edge に誘導している
- Mozilla downsizes as it refocuses on Firefox and AI: Read the memo | TechCrunch
  - https://techcrunch-com.cdn.ampproject.org/c/s/techcrunch.com/2024/02/13/mozilla-downsizes-as-it-refocuses-on-firefox-and-ai-read-the-memo/amp/

### Safari 動向

#### Stable: 17.3

#### Updates

- **Apple announces changes to iOS, Safari, and the App Store in the European Union - Apple**
  - https://www.apple.com/newsroom/2024/01/apple-announces-changes-to-ios-safari-and-the-app-store-in-the-european-union/
  - https://blog.jxck.io/entries/2024-01-28/apple-sideloading.html
  - Apple によるサイドローディングの緩和が EU 限定で実施される発表
- Mozilla says Apple's new browser rules are 'as painful as possible' for Firefox - The Verge
  - https://www.theverge.com/2024/1/26/24052067/mozilla-apple-ios-browser-rules-firefox
  - WebKit / Gecko 版 Firefox の 2 種類を同時に維持しなければならないため Mozilla は不満
- **Why don't users in the EU have access to Home Screen web apps?**
  - https://developer.apple.com/support/dma-and-apps-in-the-eu#8
  - iOS 17.4 で EU のみ PWA (Home Screen web apps) のサポートがオフになる
  - これまで WebKit と iOS が密に結合していることで、権限取得やストレージ分離などが機能していたから提供できた
  - 任意のブラウザが入ることで、ユーザの同意をバイパスしたデバイスアクセスや、インストールが発生する危険性がある
  - DMA の要件を満たしながら、ここにセキュリティモデルを構築するには Home Screen web apps は使われてない
  - 従って EU では PWA を削除せざるをえなかった
- The web just gets better with Interop 2024
  - https://webkit.org/blog/14955/the-web-just-gets-better-with-interop/
- Bringing Back Horizontal Rules in Select Elements
  - https://webkit.org/blog/14933/bringing-back-horizontal-rules-in-select-elements/
- Release Notes for Safari Technology Preview 187
  - https://webkit.org/blog/14931/release-notes-for-safari-technology-preview-187/
  - Bugfix 少し
- **Release Notes for Safari Technology Preview 188**
  - https://webkit.org/blog/15026/release-notes-for-safari-technology-preview-188/
  - **Added support for the new CSS content alternative text syntax. (272455@main) (26942023)**
  - Added supports() syntax for @import rules. (273591@main) (109060734)
  - **Made -apple- prefixed pseudo-elements no longer valid. (272538@main) (120268884)**
  - **Removed support for AppCache. (273297@main) (113343269)**
  - Added support for CustomStateSet in custom elements and :state() pseudo-class. (272474@main) (120072599)
- **How to use Media Source Extensions with AirPlay | WebKit**
  - https://webkit.org/blog/15036/how-to-use-media-source-extensions-with-airplay/
  - AirPlay で MSE を使う方法
- Release Notes for Safari Technology Preview 189 | WebKit
  - https://webkit.org/blog/15050/release-notes-for-safari-technology-preview-189/
  - **Added support for light-dark() function for color values. (273634@main) (117033939)**
  - **Added support for @starting-style. (273740@main) (121918611)**
  - Added a Media details panel to Web Inspector when selecting a video or audio element in the Elements tab. (273777@main) (118865793)
  - Added support for missing WebRTC stats. (273643@main) (121594743)
- **Safari 17.4 Beta Release Notes | Apple Developer Documentation**
  - https://developer.apple.com/documentation/safari-release-notes/safari-17_4-release-notes
  - Accessibility
    - Added support for the new CSS content alternative text syntax. (26942023)
  - AutoFill
    - Added support for Apple Cash virtual card numbers and showing the user their Apple Cash balance when using AutoFill. (107634154)
  - CSS
    - Added support for @scope. (82359096)
    - Added support for percentages to letter-spacing and word-spacing. (114538918)
    - Added support for align-content on block containers. (114740670)
    - Added support for invalidating :any-link, :link, and :-webkit-any-link inside :has(). (116616425)
    - Added the white-space-collapse and text-wrap-mode CSS properties. (117248327)
    - Added support for CSS custom properties of ::backdrop. (117949961)
    - Added support for ::grammar-error and ::spelling-error (119314048)
    - Added support for align-content on table cells. (119701629)
  - Forms
    - Added support for vertical writing mode support for form controls. (12072686)
    - Added support for `<hr>` inside `<select>` rendered as a separator on iOS. (108783915)
    - Added support for the `showPicker()` method for `<input type="date">`. (110099910)
    - Added support for `<input type="checkbox" switch>`. (119378678)
  - JavaScript
    - Added support for Promise.withResolvers. (116473362)
    - Added TimeZoneOffset format support to Intl.DateTimeFormat. (117124296)
    - Added support for ArrayBuffer.prototype.transfer. (117337535)
    - Aligned the implementation of the internal function IntlMathematicalValue (used in Number.prototype.toLocaleString, and Intl.NumberFormat) with its current specification. (117535507)
  - Enabled Array group methods. (118037635)
    - Added support for ArrayBuffer.prototype.detached, ArrayBuffer.prototype.transfer, and ArrayBuffer.prototype.transferToFixedLength. (118037759)
  - Media
    - Added support for all of HTML's character entities in WebVTT. (51064890)
    - Added support for VP8/VP9 and WebM on iOS and iPadOS. (64825245)
    - Added WebCodecs HEVC support. (112067287)
    - Added MediaStream support for whiteBalanceMode. (115552800)
    - Added support for the Vorbis audio codec on iOS. (116776158)
    - Added prioritizing video sources with power efficient hardware-decoded codecs before software-decoded codecs. (120679553)
  - Safari Extensions
    - Extensions that haven't been granted permission to Private Browsing can now open Private Browsing windows. (105983371)
  - SVG
    - Added support for kernelUnitLengthX and kernelUnitLengthY for SVGFESpecularLightingElement. (118768259)
  - Web Animations
    - Added support for transition-behavior: allow-discrete. (108703206)
  - Web API
    - Added Element.prototype.setHTMLUnsafe(), ShadowRoot.prototype.setHTMLUnsafe(), and Document.parseHTMLUnsafe() methods. (115345128)
    - Added scaleNonUniform in DOMMatrixReadOnly. (117875678)
    - Added support for AbortSignal.any(). (117985827)
    - Added support for element.checkVisibility(). (118157977)
    - Added ShadowRoot clonable attribute. (119707278)
    - Added support for CustomStateSet in custom elements and :state() pseudo-class. (120072599)
  - Web Apps
    - Added support for the shortcuts manifest member on macOS. Shortcuts are available in the File menu and the Dock context menu. Users can set up custom keyboard shortcuts for them in System Settings > Keyboard > Keyboard Shortcuts > App Shortcuts. (106137954)
    - Added support for the categories manifest member on macOS. When creating a Launchpad folder containing web apps, the folder is automatically named accordingly. (116480550)
  - Web Assembly
    - Enabled extended constant expressions. (118190467)
  - Web Inspector
    - Added support for grouping source map load errors. (109239646)
    - Added support for logging a message to the Console when a page attempts to load a font URL blocked by Lockdown Mode. (114657783)
  - WebAuthn
    - Added support for getClientCapabilities(). (119058559)
  - WebGL
    - Added support for new WebGL extensions:
    - EXT_clip_control
    - EXT_depth_clamp
    - EXT_polygon_offset_clamp
    - WEBGL_polygon_mode (118110035)

#### Standard Positions

- 今月 Close されたものをみる
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2024-02-01+
- Support
  - New attribute to control UA-provided writing assistance
    - https://github.com/WebKit/standards-positions/issues/308
  - @starting-style CSS Rule
    - https://github.com/WebKit/standards-positions/issues/210
- Invalid
  - Deprecation of prefixed HTMLVideoElement-specific Fullscreen APIs
    - https://github.com/WebKit/standards-positions/issues/306

#### Other

### Edge 動向

#### Stable: 122

#### Updates

- Microsoft Edge and Interop 2024
  - https://blogs.windows.com/msedgedev/2024/02/01/microsoft-edge-and-interop-2024/
- Edge is faster than ever before on Macs with M2
  - https://blogs.windows.com/msedgedev/2024/02/02/edge-is-faster-than-ever-before-on-macs-with-m2/
- Dev Channel update to 123.0.2400.1 is live. - Microsoft Community Hub
  - https://techcommunity.microsoft.com/t5/articles/dev-channel-update-to-123-0-2400-1-is-live/m-p/4058807
- **A new way to build custom web editing experiences with EditContext - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2024/02/13/custom-web-editing-experiences-with-editcontext/

#### Other

- How Downloads Work - text/plain
  - https://textslashplain.com/2024/01/29/how-downloads-work/
- Cloaking, Detonation, and Client-side Phishing Detection - text/plain
  - https://textslashplain.com/2024/02/20/cloaking-detonation-and-client-side-phishing-detection/
- The Importance of Feedback Loops - text/plain
  - https://textslashplain.com/2024/02/22/the-importance-of-feedback-loops/

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
  - W3C Invites Implementations of Verifiable Credentials Data Model v2.0
    - https://www.w3.org/news/2024/w3c-invites-implementations-of-verifiable-credentials-data-model-v2-0/
- Working Draft
- First Public Working Draft
  - First Public Working Draft: MiniApp Addressing | 2024 | News | W3C
    - https://www.w3.org/news/2024/first-public-working-draft-miniapp-addressing/
- Chartering
  - Proposed W3C Charter: Federated Identity Working Group
    - https://lists.w3.org/Archives/Public/public-new-work/2024Jan/0006.html
  - Proposed W3C Charter: Web Application Security Working Group
    - https://lists.w3.org/Archives/Public/public-new-work/2024Feb/0000.html
  - Update robots.txt standards Community Group created
    - https://lists.w3.org/Archives/Public/public-new-work/2024Feb/0001.html
  - Advance notice: Work in progress on SVG Working Group Charter; Current Charter Extended
    - https://lists.w3.org/Archives/Public/public-new-work/2024Feb/0002.html
  - Advance notice: Work in progress on Immersive Web Working Group Charter
    - https://lists.w3.org/Archives/Public/public-new-work/2024Feb/0006.html
  - Advance notice: Work in progress on Web Authentication Working Group Charter
    - https://lists.w3.org/Archives/Public/public-new-work/2024Feb/0007.html

#### OpenUI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
  - 気になるのがあったときだけ
- **Open UI Telecon: February 15, 2024**
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-02-15.md
  - Discussion regarding `popup=hint` and WHATWG meeting
  - https://github.com/openui/open-ui/issues/532
- **Stylable `<select>` element · Issue #9799 · whatwg/html**
  - https://github.com/whatwg/html/issues/9799#issuecomment-1922200654
  - カスタマイズできる select にするときには属性をつけると Open UI で決定するも WHATWG は納得せず

#### Other

- Old spec under [https://www.w3.org/html/wg/spec/\*](https://www.w3.org/html/wg/spec/*) from Jeffrey Yasskin
  - https://lists.w3.org/Archives/Public/public-html/2024Feb/0002.html
- **Internationalization (I18N) leadership change and goals for the future | 2024 | Blog | W3C**
  - https://www.w3.org/blog/2024/internationalization-i18n-leadership-change-and-goals-for-the-future/
- **ARIA Automation Launch - Bocoup**
  - https://bocoup.com/blog/aria-automation-launch
- **`<callout>` element for callouts/alerts/admonitions · Issue #10100 · whatwg/html**
  - https://github.com/whatwg/html/issues/10100
  - 注釈や警告を囲む要素はどうという思いつきの提案
  - ARIA WG でも話され、特に必要ないという話になっている
- **Meeting Planning Pages [CSS Working Group Wiki]**
  - https://wiki.csswg.org/planning#section2025
  - 2025 年の TPAC は神戸らしい

### TC39 動向

#### Meeting

- 2023-11
  - agendas
    - https://github.com/tc39/agendas/blob/main/2023/11.md
  - minutes
    - https://github.com/tc39/notes/tree/main/meetings/2023-11
  - mozaicfm spaces
    - https://twitter.com/mozaicfm/status/1752315859534819754
    - https://twitter.com/mozaicfm/status/1754489329991450756
  - TC39 Minutes を読む
    - https://docs.google.com/document/d/1qXUf4QRTbexUj0fg2sgYTxWwOT2v_q7lmjR282BOWLU/edit#heading=h.bwmy7hyqh5e6
  - **Array Grouping for Stage 4**
    - Stage 4 なった
  - **Promise.withResolvers for Stage 4**
    - https://docs.google.com/presentation/d/1UvJSnt5B6tsXs-5A0zgg01cdFCtk6X2rAok6Z4Wp4Mo/edit#slide=id.p
    - Stage 4 になった
  - **ShadowRealm Stage 2 update**
    - https://docs.google.com/presentation/d/17esbBbAlKe1nZzWx47ItpVP1XovIupxKEAL1PgUDFrk/edit#slide=id.g26255f6e788_0_0
    - https://github.com/tc39/proposal-shadowrealm/issues/393 にて API を議論中
    - `[Exposed=Window,Worker]` だったのが `[Exposed=*]` と変更されたものが入る
    - Salesforce が Igalia をスポンサーして WebKit に実装中
    - CSP も議論中
    - Stage2 keep
  - Provide source text to HostEnsureCanCompileStrings PR #3222
    - https://docs.google.com/presentation/d/1MRItYS_b1hwKstlqlfoD8mgbecS2OkTSiPFVWHs3Y_8/edit#slide=id.p
    - eval に限らず、文字列リテラルを渡す時に、そのハッシュを CSP で制御したい
    - ユースケースがほしい
  - **Base64 Uint8Arrays discussion**
    - https://docs.google.com/presentation/d/1kq4AyZquZAObuG4Z4099FZo7emYUi7JnR07SZ4sue6k/edit#slide=id.g106f4536d9_0_109
    - Stream 対応のために、 Base64 できたやつと、残りのチャンクを返す API の提案
    - Variation どれがいい?
  - Decimal Stage 1 Update & Request for feedback
    - https://docs.google.com/presentation/d/1ecK7CzrgSO5t8-gYQnNWUSHcnWltJKWqTolgJsAIwqI/edit#slide=id.p
    - Stage 1 Keep
  - **Temporal normative PR #2718 & general update**
    - https://ptomato.name/talks/tc39-2023-11/
    - Igalia in partnership with Bloomberg
    - IETF の標準化問題は解消
    - あとは実装するだけ
  - **Math.sum**
    - https://github.com/tc39/proposal-math-sum
    - 誤差をいい感じにしたアルゴリズムで足したい
  - Iterator helpers web compat continuation
    - https://zenn.dev/pixiv/articles/6f406804f6a820
    - Iterator.prototype.constructor はアクセサプロパティになった
  - Joint iteration stage 1 update
    - https://docs.google.com/presentation/d/1sgqXgWBsDF0S43wVuFgIyOC8Y3AMFt1qxBIFbzEq9Vg/edit#slide=id.p
    - Iterator.zip になった
    - 次の会議で Stage2 にしたい
  - Iterator sequencing
    - ​​ https://docs.google.com/presentation/d/1wMUfikXIIz7woLN-5MbYbW8an40c8ZPrN1ehzWVf4zw/edit#slide=id.p
    - こっちはまだ API が決まってない
    - Stage1 keep
  - **Withdrawing Operator Overloading**
    - https://docs.google.com/presentation/d/1mT2VmZlC3YmhDsqdxrCxQ5GpLFHFntsb3XCM762eDvg/edit#slide=id.p
    - https://www.docswell.com/s/jxck/57V8J1-operator-overloading-is-hard
    - コストとベネフィットのトレードオフが明確でない
    - SpiderMonkey と V8 がやりたくない
    - withdrawn した
  - **JSON.tryParse**
    - canParse をやめて、パースしたら値返せばよくね?
    - それなら try-catch でよくね?
    - 却下された
  - Module sync assert for stage 1
    - Top Level Await が入ってると async module になるが
    - 依存の中に async がなければ同期で読める
    - っていう assert をしたい
    - Stage 1
  - **Slice notation stage 1 update and `[^a]`**
    - https://johnhax.net/2023/slice/slide#0
    - https://github.com/hax/proposal-index-from-end
    - Speaker's Summary of Key Points
    - Conclusion
    - https://github.com/tc39/proposal-slice-notation
    - array を slice する notation
    - 昔 2018 に出て、 2020 に stage 1 になったが、色々あって停滞中だった
    - マイナス渡した時の基準が他の API と違う
    - ので、 `^` がついたら後ろからにする
    - ついでに `a[^1]` が `a.at(-1)` も一緒に入れる
    - などして、もう一度やりたい
  - Stop Coercing Things (pt 3)
    - https://docs.google.com/presentation/d/1AFzFeVtbUCpPcMXTER0Zzb5l5c5oPdXCF4Yi_9B1EEM/edit#slide=id.g106f4536d9_0_109
    - 今後勝手に型変換しないようにしよう、の part 3
    - bool じゃない primitive を受けるところに object / function 渡したら例外
  - **continuation of the new stage discussion**
    - https://docs.google.com/presentation/d/1vdps2Ga2eHYhCSDN6pmYYWtPKfAsgP_i88sLlqEq-Xo/edit#slide=id.p
    - https://blog.jxck.io/entries/2024-02-06/tc39-stage-2.7.html
    - 2.7 ができた
    - decorator metadata とか 2.7 に戻す

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2023-11-01}...main@{2023-12-01}
- https://tc39.github.io/beta/
- 0->1
  - Math.sum
  - Module sync assert
- 1->2
- 2->2.7
  - decorator metadata
- 2.7->3
- 3->4
  - Array Grouping
  - Promise.withResolvers

#### New Proposals

#### Other

- Operator Overloading withdrawn
- JSON.tryParse rejected

### WinterCG 動向

#### Meeting

- **2024-02-01**
  - https://github.com/wintercg/admin/issues/61
  - ECMA に WinterTC を設立するための書類を出したらしい

### IETF 動向

#### WG

- RFC
  - RFC 9532 on HTTP Proxy-Status Parameter for Next-Hop Aliases
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JanMar/0053.html
  - **RFC 9530 on Digest Fields**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JanMar/0074.html
  - **RFC 9421 on HTTP Message Signatures**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JanMar/0073.html
  - [httpapi] RFC 9512 on YAML Media Type
    - https://mailarchive.ietf.org/arch/msg/httpapi/sp-wLsBgcJRzOb5D0jNFoIeUVuw/
  - [Ohai] RFC 9540 on Discovery of Oblivious Services via Service Binding Records
    - https://mailarchive.ietf.org/arch/msg/ohai/Dt7-bDkrz6cXfdh6BvPSa2Fp2lM/
- Work
  - Last Call: draft-ietf-httpbis-sfbis-05.txt (Structured Field Values for HTTP) to Proposed Standard
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/RarXKiStUPM4JxOIYKaLJcz1H0Q/
  - [httpapi] I-D Action: draft-ietf-httpapi-link-template-03.txt
    - https://mailarchive.ietf.org/arch/msg/httpapi/zaBiq9EEDcoiphjQ3mqCIUNKN0I/
  - [TLS] I-D Action: draft-ietf-tls-keylogfile-00.txt
    - https://mailarchive.ietf.org/arch/msg/tls/dMeDM6yNAXXogbooEtWL2poRVag/
  - [TLS] I-D Action: draft-ietf-tls-rfc8447bis-08.txt
    - https://mailarchive.ietf.org/arch/msg/tls/WsOyW60rs9yt2WJTKpO2xQacjPg/
  - [TLS] Completion of Update Call for RFC 8773bis
    - https://mailarchive.ietf.org/arch/msg/tls/YLDjIzpwNB17dYlxmCPv-G3IdSk/
  - WGLC for draft-ietf-httpbis-connect-tcp
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JanMar/0025.html
  - [Ohai] I-D Action: draft-ietf-ohai-chunked-ohttp-00.txt
    - https://mailarchive.ietf.org/arch/msg/ohai/qNGlcFdN1nxR5-UkGX-lEyxyTTs/
  - No-Vary-Search from Jeremy Roman
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JanMar/0110.html
  - Cache varying on particular cookies
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JanMar/0109.html
  - Call for Adoption: draft-egorbaty-httpbis-secondary-server-certs-01
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JanMar/0100.html
  - Secdir last call review of draft-ietf-httpbis-sfbis-05
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JanMar/0069.html
  - **Proposal for Creating Reverse Tunnels, for HTTP and TCP**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JanMar/0105.html
    - https://www.ietf.org/archive/id/draft-kazuho-httpbis-reverse-tunnel-00.html
    - kazuho さんの新作
- Meeting

#### Other

### CDN 動向

#### Cloudflare

- Q4 2023 Internet disruption summary
  - https://blog.cloudflare.com/q4-2023-internet-disruption-summary/
- How Cloudflare's AI WAF proactively detected the Ivanti Connect Secure critical zero-day vulnerability
  - https://blog.cloudflare.com/how-cloudflares-ai-waf-proactively-detected-ivanti-connect-secure-critical-zero-day-vulnerability/
- Reflecting on the GDPR to celebrate Privacy Day 2024
  - https://blog.cloudflare.com/reflecting-on-the-gdpr-to-celebrate-privacy-day-2024/
- Cyber attacks targeting Jewish and Holocaust educational websites surge by 872% in 2023
  - https://blog.cloudflare.com/cyber-attacks-targeting-jewish-and-holocaust-educational-websites-surge-by-872-in-2023/
- Thanksgiving 2023 security incident
  - https://blog.cloudflare.com/thanksgiving-2023-security-incident/
- connect() - why are you so slow?
  - https://blog.cloudflare.com/linux-transport-protocol-port-selection-performance/

#### Fastly

#### Other

- The Web Scraping Problem, Part 2: Use Cases that Require Scraping | Akamai
  - https://www.akamai.com/blog/security/2024/feb/the-web-scraping-problem-part-2
- The Web Scraping Problem, Part 3: Protecting Against Botnets | Akamai
  - https://www.akamai.com/blog/security/2024/feb/the-web-scraping-problem-part-three-protecting-against-botnets

### セキュリティ動向

- **apernet/OpenGFW: OpenGFW is a flexible, easy-to-use, open source implementation of GFW (Great Firewall of China) on Linux**
  - https://github.com/apernet/OpenGFW
- **polyfill.io サービスが売却された**
  - https://twitter.com/triblondon/status/1761852117579427975
  - Andrew Betts が作ったライブラリ
  - 別に、それを配信するドメインを持ってる人がいた
  - そのドメインが売却された
  - 依存している場合は取り除くことが推奨された
- **E2EE on the web: is the web really that bad? | Emily M. Stark**
  - https://emilymstark.com/2024/02/09/e2ee-on-the-web-is-the-web-really-that-bad.html
- **「Avast」がブラウザの閲覧データを販売したとして約 25 億円の罰金を科される - GIGAZINE**
  - https://gigazine.net/news/20240226-ftc-ban-avast-selling-browsing-data/

### 周辺動向

- The Performance Inequality Gap, 2024 - Infrequently Noted
  - https://infrequently.org/2024/01/performance-inequality-gap-2024/
- February Conference News
  - https://www.igalia.com/2024/01/29/February-Conference-News.html
- Interop 2024 Launches
  - https://www.igalia.com/2024/interop-2024-launches.html
- Interop 2024 Launch - Bocoup
  - https://bocoup.com/blog/interop-2024
- Vivaldi presents: "Browser choices. A tale of two Gatekeepers."
  - https://vivaldi.com/blog/technology/vivaldi-browser-choices-a-tale-of-two-gatekeepers/
- JavaScript Bloat in 2024 @ tonsky.me
  - https://tonsky.me/blog/js-bloat/
- **awslabs/llrt: LLRT (Low Latency Runtime) is an experimental, lightweight JavaScript runtime designed to address the growing demand for fast and efficient Serverless applications.**
  - https://github.com/awslabs/llrt

### Cookie 動向

- **nintendo.co.jp が nintendo.com/jp にリダイレクト**
  - https://twitter.com/nintendo/status/1761632118533415020
  - Nintendo の認証が壊れるという話もあったので、そのためではないか
  - https://issuetracker.google.com/issues/268390722?pli=1

### イベント

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
    - scope_extensions Origin Trial
  - 122
    - Iterator Helpers
    - Set methods
    - Storage Buckets API
    - DevTools: breadcrumbs in Timeline
  - 123 Beta
    - light-dark()
    - align-content for blocks
    - text-spacing-trim
    - Import attributes `with` syntax
    - NavigationActivation
    - Sec-CH-UA-Form-Factor
    - SW Static Routing API
    - zstd Content-Encoding
  - Ship
    - text-spacing-trim
    - light-dark()
    - Element reflection
    - SW Static Routing API
    - WebSocketStream (w/o OT partners)
    - Zstd Content-Encoding
    - setHTMLUnsafe()
    - `priority` header
    - Sec-CH-UA-Form-Factor
    - standardized CSS zoom
    - ReadableStream async iteration
  - Prototype
    - CSS functions
    - writingsuggestions attribute
    - text-box-trim/text-box-edge
    - line-clamp
    - Web Monetization
    - reading-order-items
    - Interest Invokers
  - PSA
    - Chromium Issue Tracker migration
  - web.dev
    - Interop 2023 wrapup
    - Interop 2024
      - Accessibility
      - CSS Nesting
      - Declarative Shadow DOM
      - Popover
      - Relative Color Syntax
      - Scrollbar Styling
      - @starting-style / transition-behavior
      - text-wrap: balance
  - Chrome Developers
    - EditContext
    - CSS ::backdrop inheritance
    - align-content for blocks
  - other
    - Google shuts down search cache
- Firefox
  - 123
    - Declarative Shadow DOM
    - Early Hints preload
  - Ship
    - Gamepad API for non-secure context
  - Prototype
    - Float16Array
    - Observable
    - user-find
  - Standard Position
    - :has()
    - @scope
    - Element reflection
  - other
    - Mozilla Monitor Plus
    - Next steps
      - Trustworthy AI
      - CEO step down
      - layoff
    - Navigation API on roadmap
- Safari
  - TP 188
    - CSS content alt text
    - Remove AppCache
  - TP 189
    - light-dark()
    - @starting-style
  - Safari 17.4 Beta
    - @scope
    - align-content for blocks
    - ::backdrop inheritance
    - ::grammar-error/::spelling-error
    - hr in select
    - input type="checkbox" switch
    - Promise.withResolvers()
    - Array grouping
    - transition-behavior
    - AbortSignal.any()
    - element.checkVisibility()
  - blog
  - Standard Position
  - other
    - EU で iOS アプリのサイドローディングが可能に
    - EU で WebKit 以外のブラウザエンジンも可能に
      - wpt のパス率など条件あり
    - EU の iOS 17.4 で PWA サポート削除
      - iOS との密結合による安全性の担保ができなくなった
      - ユーザーもあまりいない
- Edge
  - EditContext のブログ
- W3C/WHATWG
  - Draft
  - Open/UI
    - popup=hint の議論
    - Stylable `<select>` には属性をつける OpenUI の提案が WHATWG で納得されず
  - Other
    - Internationalization (I18N) leadership change
    - ARIA Automation Launch - Bocoup
    - `<callout>` (callouts/alerts/admonitions) 提案
    - TPAC 2025 は神戸
- TC39
  - Array Grouping for Stage 4
  - Promise.withResolvers for Stage 4
  - ShadowRealm あとは実装するだけ
  - Base64 の stream どうする
  - Temporal あとは実装するだけ
  - Math.sum で精度を保証した計算
  - Withdrawing Operator Overloading (レコタプやばい)
  - JSON.tryParse 却下
  - Slice Notation update `a[^1]`
  - Stage 2.7 設立
- WinterCG
  - ECMA に WinterTC 設立の書類提出
- IETF
  - RFC 9530 Digest Field
  - RFC 9421 HTTP Message Signature
  - draft-kazuho-httpbis-reverse-tunnel-00
- CDN 動向
- セキュリティ動向
  - OpenGFW (Great Firewall 実装)
  - polyfill.io 売却
  - E2EE by Emily Stark
  - Avast が閲覧データ売却で罰金
- 周辺動向
  - AWS Serverless 用ランタイム LLRT
- Cookie 動向
  - nintendo.co.jp -> nintendo.com/jp リダイレクト
