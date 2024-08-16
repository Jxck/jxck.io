---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep115.mp3
published_at: 2023-03-06
guest: [@myakura](https://twitter.com/myakura)
---

# ep115 Monthly Platform 202302

## Theme

第 115 回のテーマは 2022 年 2 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 110

#### Updates

- **New in Chrome 110**
  - https://developer.chrome.com/en/blog/new-in-chrome-110/
  - :picture-in-picture pseudo class
  - launch_handler manifest member.
  - credentialless iframes.
- **What's New In DevTools (Chrome 110)**
  - https://developer.chrome.com/en/blog/new-in-devtools-110/
  - **Clearing Performance Panel on reload**
  - Recorder updates
    - View and highlight the code of your user flow in the Recorder
    - Customize selector types of a recording
    - Edit user flow while recording
  - Automatic in-place pretty print
  - Better syntax highlight and inline preview for Vue, SCSS and more
  - Ergonomic and consistent Autocomplete in the Console
  - Miscellaneous highlights
- **Chrome 111 beta**
  - https://developer.chrome.com/en/blog/chrome-111-beta/
  - CSS
    - New CSS color types and spaces
    - The color-mix() function
    - CSS Selectors 4 Pseudo-Class :nth-child(an + b of S)
    - CSS root font units
    - CSS trigonometric functions
    - **Style Container Queries for CSS Custom Properties**
    - The baseline-source property
  - Web APIs
    - The window-management permission and permission policy string
    - Media Session API: Presenting slides actions
    - Resizable ArrayBuffer and growable SharedArrayBuffer
    - Speculation rules: referrer policy key
    - **Streaming declarative shadow DOM**
    - **View Transitions API**
    - WebRTC Scalable Video Coding extensions
    - WebXR enabledFeatures attribute
  - Origin trials in progress
    - Deprecation trial for removal of the connect-src CSP bypass in Web Payment API
    - **Document Picture-in-Picture**
  - Deprecations and removals
    - Remove PaymentInstruments
    - Remove connect-src CSP bypass in Web Payment API
    - Merchant identity in canmakepayment event
- **What's New in DevTools (Chrome 111)**
  - https://developer.chrome.com/en/blog/new-in-devtools-111/
  - Debugging HD color with the Styles pane
  - Enhanced breakpoint UX
  - Customizable Recorder shortcuts
  - Better syntax highlight for Angular
  - Reorganize caches in the Application panel
  - > To better facilitate debugging, DevTools now supports evaluating expressions with private class members.

#### Intents

- **Ship: CSS "overflow" media features**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RbaW9X_hML4
- **Ship: CSS "update" media feature**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HxqAcgnTs8o
- Ship: CSS font-variant-position property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wQ_8T-AXLFA
- **Ship: CSS headline balancing**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/f5eLz6PIXaI
- **Ship: Change beforeunload handler dialog condition**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yi3GzzB6AtI
  - beforeunload で preventDefault を呼ぶと確認ダイアログが出るように
  - 以前は何も出ずに遷移しなかった
- **Ship: Fetch: Headers.getSetCookie()**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5cDEf6LjReg
  - Set-Cookie は複数現れてもそれらを結合してはいけないという歴史的な事情がある
  - しかし Headers は他と同様 Set-Cookie も結合していた
  - 結合せずに取得できる仕様の追加
- Ship: Linear easing function
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Q7fjvM9Mn0c
- Ship: Port overflow check in URL setters
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xsITedSTDnM
- **Ship: Remove Authorization header upon cross-origin redirect**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3Zt4UHbynYA
  - Authorization header が cross origin redirect にもついてしまうのを修正
- **Ship: Resource Hint "Least Restrictive" CSP**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lJhBa8-eo30
  - prefetch-src の提案がうまくいかず削除された
  - 代わりに他のなんらかのルールで許可されたリソースは prefetch/preconnect できるようにする
- Ship: Support URLs with non-special schemes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wYuPrIQzDTA
- Ship: URL Standard-compatible IPv4 embedded IPv6 host parser
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4Fkgx4rh574
- Ship: WebAssembly Tail Call
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6VEOK4WZ7Wk
- Ship: WebAuthn: Large blob storage extension (largeBlob)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/guUJ9FuOIfc
- Prototype and Ship: WebGLContextEvent on Web Workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5YxE-vT4j_Q
- Implement and Ship: Display-Capture Capability Delegation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jag07miwY2g
- Implement and Ship: URLSearchParams.size
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-hZLBj9dnfA
- Prototype: Battery status API gated by permissions policy
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JkYewB8Tv0U
- Prototype: CSS :initial pseudo class
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/s3dqBLX6gVo
- Prototype: CSS headline balancing (`text-wrap: balance`)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yEwHDXaRIF8
- **Prototype: CSS top-layer property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nx2P-B8Rhx4
- Prototype: Linear easing function
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eEb9q68xysU
- **Prototype: Long Animation Frame Timing (LoAF)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XoLIn3elXqM
- Prototype: No-Vary-Search Hint for Prefetch Speculation Rules
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HX2iHMBjg7s
- Prototype: URL Standard-compatible IPv4 embedded IPv6 host parser
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0aoNC-8n2ic
- Prototype: mdoc presentation API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/O9A9fq-0IdI
- **Prototype: Interoperable Private Attribution**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4gke9xmv45w/
  - Meta と Mozilla が提案しているアトリビューション API
- Prototype: Local Network Access allowing same-origin fetches to potentially trustworthy origins
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ArrhiKB8XF0
- Experiment: FedCM Auto Re-Authentication API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JM-ILfXvqXs
- Experiment: Payment handler minimal header UX
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NQ-WLvfmPs8
- Experiment: ServiceWorkerBypassFetchHandlerForMainResources
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xAL5UoXD19E
- Experiment: WebAssembly Garbage Collection (WasmGC), plus stringref
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HDbvHCVFSW0
- Experiment: WebGPU WebCodecs integration
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/O73ihkXRa6Q
- Extend Origin Trial: Popover API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/r3IwTXB8MG8
- **Deprecate and Remove: Block-all-mixed-content CSP directive**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3VB5aDx6hBQ
- Deprecate and Remove: Legacy callback-based RTCPeerConnection.getStats() API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PxQQtEM7za0
- Deprecate and Remove: webkitConvertPointFromPageToNode() and webkitConvertPointFromNodeToPage()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KS5GAM7JXtg
- **Deprecate and remove: CSP prefetch-src directive**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9r2SuJQuWBM
- **Deprecate: non-standard `shadowroot` attribute for declarative shadow DOM**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1n0MLr8G5NQ
- Remove: KeyboardEvent.prototype.keyLocation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lqknEaUYCJM
- **Remove: prefetch-src**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WZkLdXd2ISA
- PSA: A Blink runtime feature generates a base::Feature by default
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4TFsHs56tOs
- PSA: Cursor support for FileSystemSyncAccessHandles
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VKP3HLT0e1Y
- PSA: WebHID in Extension Service Workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BVeLvYX7oEY
- **PSA: re Iframe Render Throttling**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/op-z7fMMmWY

#### V8

#### Other

- web.dev
  - Learn Images!
    - https://web.dev/learn-images/
  - New to the web platform in January
    - https://web.dev/web-platform-01-2023/
  - **Interop 2023: continuing to improve the web for developers**
    - https://web.dev/interop-2023/
    - Border Image in CSS
    - Color Spaces and Functions in CSS
    - Container Queries in CSS
    - Containment in CSS
    - CSS Pseudo-classes
    - Custom Properties in CSS
    - Flexbox
    - Font feature detection and palettes
    - Forms
    - Grid
    - :has()
    - Inert
    - Masking in CSS
    - Math Functions in CSS
    - Media Queries
    - Modules in Web Workers
    - Motion Path in CSS Animations
    - Offscreen Canvas
    - Pointer and mouse Events
    - URL
    - Web Compat 2023: A catchall focus area for small bugs that cause known site compatibility issues
    - Web Codecs (video)
    - Web Components
  - Container queries land in stable browsers
    - https://web.dev/cq-stable/
  - Last baseline alignment
    - https://web.dev/last-baseline/
  - All of Learn HTML! is available
    - https://web.dev/learn-html-available/
  - Introducing Learn Privacy
    - https://web.dev/introducing-learn-privacy/
  - New to the web platform in February
    - https://web.dev/web-platform-02-2023/
- google developer blog
  - https://developers.googleblog.com/
  - Chrome 110
    - https://developers-jp.googleblog.com/2023/02/blog-post.html
  - Chrome 111 ベータ版 : 新しい CSS カラータイプとカラースペース、 CSS 三角関数、 View Transitions API
    - https://developers-jp.googleblog.com/2023/02/chrome-111-beta.html
- google developer japan blog
  - **デジタル証明書のセキュリティを保つ - TrustCor の証明書の削除について**
    - https://developers-jp.googleblog.com/2023/02/sustaining-digital-certificate-security13.html
    - TrustCor が証明書が信頼できないものとして削除されることに
    - このエントリには詳細が書かれてないが別のニュースに詳細がある
    - ルート認証局がスパイウェアの開発元? 「Google Chrome」が「TrustCor」を削除へ - 窓の杜
      - https://forest.watch.impress.co.jp/docs/news/1470651.html
  - **Chromium プロジェクトが Rust の利用をサポート**
    - https://developers-jp.googleblog.com/2023/02/supporting-use-of-rust-in-chromium.html
- chrome developer blog
  - FLEDGE Bidding and Auction services availability
    - https://developer.chrome.com/en/blog/bidding-and-auction-services-availability/
  - Talking to the Stadia controller with WebHID
    - https://developer.chrome.com/en/blog/talking-to-the-stadia-controller-with-webhid/
  - New requirements for the Web Share API in third-party iframes
    - https://developer.chrome.com/en/blog/web-share-api-in-third-party-iframes/
  - **The Chromium Chronicle #32: Mind the patch gap**
    - https://developer.chrome.com/en/blog/chromium-chronicle-32/
  - **The future of Picture-in-Picture**
    - https://developer.chrome.com/en/blog/the-future-of-picture-in-picture/
  - DevTools Tips: Debugging PWA
    - https://developer.chrome.com/en/blog/devtools-tips-18/
  - **Experimenting with measuring soft navigations**
    - https://developer.chrome.com/en/blog/soft-navigations-experiment/
  - Meet the new CSS color spaces
    - https://developer.chrome.com/en/blog/meet-the-new-css-color-spaces/
  - **Introducing historical web performance data via the CrUX History API**
    - https://developer.chrome.com/en/blog/chrome-ux-report-history-api/
  - Private Network Access update: Announce extension of the Deprecation Trial
    - https://developer.chrome.com/en/blog/private-network-access-update-2023-02-02/
  - Improved font fallbacks
    - https://developer.chrome.com/en/blog/font-fallbacks/
  - DevTools Tips: Discover CSS issues
    - https://developer.chrome.com/en/blog/devtools-tips-20/
  - **Getting Started with Style Queries**
    - https://developer.chrome.com/en/blog/style-queries/
  - Framework tools for font fallbacks
    - https://developer.chrome.com/en/blog/framework-tools-font-fallback/
  - **Prepare for Chrome's user ‑ agent reduction**
    - https://developer.chrome.com/en/blog/user-agent-reduction-android-model-and-version/
  - Improving standards of behavior in standards discussions
    - https://developer.chrome.com/en/blog/standards-behavior/
  - Working with the industry to evolve CHIPS
    - https://developer.chrome.com/en/blog/working-with-the-industry-to-evolve-chips/
  - **Tether elements to each other with CSS anchor positioning**
    - https://developer.chrome.com/en/blog/tether-elements-to-each-other-with-css-anchor-positioning/
  - Privacy win! Users now share their screens more wisely
    - https://developer.chrome.com/en/blog/media-picker-reorder/
  - **What's new in Lighthouse 10**
    - https://developer.chrome.com/en/blog/lighthouse-10-0/
    - スコアの指標から TTI が削除
    - その分 CLS のウエイトが上乗せされる
- chromium blog
  - **Chromium Blog: Do more with Chrome on a single charge on MacBooks**
    - https://blog.chromium.org/2023/02/do-more-with-chrome-on-single-charge-on.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- v8
  - https://v8.dev/
- other
  - **Chromium Flag Updates (@ChromiumFlags) / Twitter**
    - https://twitter.com/ChromiumFlags
    - Chromium の flags の変更を伝えるボット(非公式)
    - 2021 年から存在するらしい
  - **Add a warning to web-bundles article by irori · Pull Request #9579 · GoogleChrome/web.dev**
    - https://github.com/GoogleChrome/web.dev/pull/9579
    - Web Bundles へのナビゲーション機能を削除する
    - フォーカスが subresource と Isolated Web Apps に移ったからとのこと
    - https://bugs.chromium.org/p/chromium/issues/detail?id=994700#c8
  - **Moving Forward, Together**
    - https://www.chromium.org/Home/chromium-security/root-ca-policy/moving-forward-together/
    - Chrome の Root Program Policy が更新される
    - Root CA 証明書は、 30 年信頼されるべきとされていたが、 7 年にする
    - 中間 CA は 3 年にする
    - サーバ証明書は 398 日から 90 日に短縮する
    - Chrome の Root は TLS 専用とし、多目的 CA は段階的に外していく
    - extendedKeyUsage 値を id-kp-serverAuth に制限し TLS 以外の証明書発行はしない
    - 参加する PKI は ACME の運用を求める
    - OCSP はオプションにする
    - domain validation の有効期限を 397 日から 90 日にする
    - CA には CAA を見るように求める
  - Heads up that we're taking a break from the Web Almanac this year, but we plan to be back in 2024 bigger and better. Thank you to all of the contributors and readers for your support through the years!
    - https://twitter.com/HTTPArchive/status/1630178203871395848
    - Web Almanac 2023 はやらない

### Firefox 動向

#### Stable: 110.0.1

#### Updates

- Firefox 110.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/110.0/releasenotes/
- **Firefox 110 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/110
  - Container Queries (size)
  - `color-gamut` media feature
  - AsyncIterator on ReadableStream
- Let's Give You More Control(s) - These Weeks in Firefox: Issue 132 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2023/02/08/lets-give-you-more-controls-these-weeks-in-firefox-issue-132/
- Engineering Effectiveness Newsletter (December 2022 & January 2023 Edition) Inbox
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/rZHS3rzUg4k
- SpiderMonkey Newsletter (Firefox 110-111)
  - https://spidermonkey.dev/blog/2023/02/16/newsletter-firefox-110-111.html

#### Intents

- **Ship: Forced color adjust**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/HCTHp4XMCKk
- Ship: Windows Native Notifications
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Hr1u9GQ10e8
- **Ship: `linear()` Easing Function**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/BxEIDf22HmM
- Prototype: screen.orientation.lock() is turned on Nightly
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/9FkNumU5X44
- Change:
- Remove:

#### Other

- **Interop 2022: Outcomes - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2023/01/interop-2022-outcomes/
- **Announcing Interop 2023 - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2023/02/announcing-interop-2023/
  - Interop プロジェクト自体の説明が詳しい
- **JavaScript Import maps, Part 1: Introduction**
  - https://spidermonkey.dev/blog/2023/02/23/javascript-import-maps-part-1-introduction.html
- **JavaScript Import maps, Part 2: In-Depth Exploration**
  - https://spidermonkey.dev/blog/2023/03/02/javascript-import-maps-part-2-in-depth-exploration.html
- **Open Web Docs meetup with Mozilla's MDN team**
  - https://openwebdocs.org/content/posts/london-meetup/
- **project/index.md at main · openwebdocs/project · GitHub**
  - https://github.com/openwebdocs/project/blob/main/steering-committee/meetups/london-2023/index.md
  - OWD と MDN のミーティング議事録

### Safari 動向

#### Stable: 16.3

#### Updates

- **Release Notes for Safari Technology Preview 163**
  - https://webkit.org/blog/13839/release-notes-for-safari-technology-preview-163/
  - Masonry Layout
    - **Enabled Masonry layout by default (258694@main, 259308@main)**
  - :has() pseudo-class
    - **Made `:has()` require valid selectors for all selectors in the selector list (258712@main)**
  - CSS
    - **Added support for `leading-trim` (258766@main)**
  - Web API
    - **Enabled default ARIA for custom elements (258743@main)**
    - Implemented `StorageManager.estimate()` (258610@main)
    - Added support for Ed25519 keys to Web Crypto (259277@main, 259489@main)
    - Updated Content Security Policy when the header is sent as part of a 304 response (258931@main)
- **Release Notes for Safari Technology Preview 164**
  - https://webkit.org/blog/13902/release-notes-for-safari-technology-preview-164/
  - JavaScript
    - **Disabled import-assertion based on TC39's stage-2 downgrade (259795@main)**
  - HTTP
    - **Enabled `Clear-Site-Data` HTTP header support (259970@main)**
    - **Added support for `Clear-Site-Data: "executionContext"` (259940@main)**
- **Safari 16.4 Beta Release Notes | Apple Developer Documentation**
  - https://developer.apple.com/documentation/safari-release-notes/safari-16_4-release-notes
  - CSS
    - **Added support for `:user-invalid` and `:user-valid` pseudo-classes.**
    - Added support for `currentColor` with `color-mix()`.
    - **Added support for `margin-trim`.**
    - **Added support for `outline` following the curve of `border-radius`.**
    - **Added support for CSS Properties and Values API with support for `@property`.**
    - Added support for CSS relative color syntax.
    - Added support for new named colors to match CSS Color Level 4.
    - Added support for the `:dir()` pseudo-class.
    - **Added support for the `:modal` pseudo-class to match fullscreen elements.**
    - **Added support for the `lh` and `rlh` units.**
    - **Added support for the range syntax from Media Queries level 4.**
    - Added support for the unprefixed `:fullscreen` pseudo-class.
    - Added support for the unprefixed absolute size keyword `xxx-large`.
  - CSS API
    - **Added support for CSS Typed OM.**
    - Added support for constructible and adoptable CSSStyleSheet objects.
    - Added support for input validation for `CSSColorValues` as part of CSS Typed OM.
  - Custom Elements
    - **Added support for Declarative Shadow DOM.**
    - **Added support for ElementInternals.**
    - **Added support for form-associated custom elements.**
    - **Added support for Imperative Slot API.**
  - JavaScript
    - **Added support for RegExp lookbehind assertions.**
    - **Added support for `Array.fromAsync`.**
    - **Added support for `Array#group` and `Array#groupToMap`.**
    - Added support for `Atomics.waitAsync` .
    - **Added support for `import.meta.resolve()`.**
    - Added support for `Intl.DurationFormat`.
    - **Added support for `String#isWellFormed` and `String#toWellFormed`.**
    - Added support for class static initialization blocks.
    - Added support for growable SharedArrayBuffer.
    - **Added support for Import Maps.**
    - Added support for resizable ArrayBuffer.
    - **Added support for using `Symbols` in `WeakMap` and `WeakSet`.**
  - HTML
    - **Added support for lazy loading iframes.**
  - HTTP
    - **Added support for the `Clear-Site-Data` HTTP header.**
  - Images
    - **Added support for AVIF on macOS Monterey and macOS Big Sur.**
  - Lockdown Mode
    - Disabled binary fonts in the CSS Font Loading API.
    - Disabled Cache API.
    - Disabled CacheStorage API.
    - Disabled ServiceWorkers.
    - Disabled SVG fonts.
    - Disabled the WebLocks API.
    - Disabled WebSpeech API.
    - Fixed common cases of missing glyphs due to custom icon fonts.
  - Media
    - Added improvements to audio quality for web video conferencing.
    - Added support for a subset of the AudioSession Web API.
    - Added support for AVCapture virtual cameras.
    - Added support for inbound rtp `trackIdentifier` stat field.
    - Added support for video stats overlay with developer tools enabled.
    - Added support for VTT-based extended audio descriptions.
    - Added support to allow a site to provide an "alternate" URL to be used during AirPlay.
    - Added video-only support for Web Codecs.
  - Text
    - Added support for `font-size-adjust`.
  - WebAssembly
    - **Added support for WASM SIMD.**
  - Web Animations
    - Added animation support for `align-tracks` and `justify-tracks`.
    - Added support for `KeyframeEffect.iterationComposite`.
    - Added support for animating custom properties.
    - Added support for blending of mismatched filter lists.
  - Web API
    - **Added support for 2D-only OffscreenCanvas.**
    - Added support for `gamepad.vibrationActuator`.
    - Added support for a submitter parameter in the FormData constructor.
    - Added support for COEP violation reporting.
    - Added support for COOP/COEP navigation violation reporting.
    - Added support for Fetch Initiator.
    - Added support for Fetch Metadata Request Headers.
    - Added support for importing compressed EC keys in WebCrypto.
    - Added support for loading scripts for nested workers.
    - Added support for non-autofill credential type for the `autocomplete` attribute.
    - Added support for revoking Blob URLs across same-origin contexts.
    - **Added support for Scroll to Text Fragment**
    - Added support for Service Workers and Shared Workers to the Permissions API.
    - Added support for the `isComposing` attribute on InputEvent.
    - **Added support for the Compression Streams API.**
    - Added support for the Notification API in dedicated workers.
    - **Added support for the Reporting API.**
    - Added support for the Screen Orientation API.
    - Added support for the Screen Wake Lock API.
    - Added support for the termination of nested workers.
    - Added support for the unprefixed Fullscreen API on macOS and iPadOS.
    - **Added support for the UserActivation API.**
    - Added support for transfer size metrics for first parties in `ServerTiming` and `PerformanceResourceTiming`.
  - Added support to the Permissions API for dedicated workers.
  - Web Apps
    - **Added support for Web Push in web apps saved to the home screen on iOS.**
    - Added support for the `"id"` member in Web App Manifest files.
    - **Added support for the Badging API.**
    - Added support for third-party browsers to offer Add to Home Screen from the Share menu.
- **Web Push for Web Apps on iOS and iPadOS**
  - https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/
  - iOS 16.4 で追加される Web Push について
  - ホームスクリーンに追加された状態で使える
- ElementInternals and Form-Associated Custom Elements
  - https://webkit.org/blog/13711/elementinternals-and-form-associated-custom-elements/
- Allowing Web Share on Third-Party Sites
  - https://webkit.org/blog/13708/allowing-web-share-on-third-party-sites/
- **Pushing Interop Forward in 2023**
  - https://webkit.org/blog/13706/interop-2023/
  - 各機能を詳しく取り上げている
- **Try out CSS Nesting today**
  - https://webkit.org/blog/13813/try-css-nesting-today-in-safari-technology-preview/
- **Declarative Shadow DOM**
  - https://webkit.org/blog/13851/declarative-shadow-dom/
- **The User Activation API**
  - https://webkit.org/blog/13862/the-user-activation-api/

#### Other

- **Safari 16.4 Is An Admission - Infrequently Noted**
  - https://infrequently.org/2023/02/safari-16-4-is-an-admission/

### Edge 動向

#### Stable: 110

#### Updates

- **Reinventing search with a new AI-powered Microsoft Bing and Edge, your copilot for the web - The Official Microsoft Blog**
  - https://blogs.microsoft.com/blog/2023/02/07/reinventing-search-with-a-new-ai-powered-microsoft-bing-and-edge-your-copilot-for-the-web/
  - Edge のサイドバーに AI 搭載 Bing チャットを組み込む
  - UI もリデザイン
- **Microsoft Edge and Interop 2023 - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2023/02/01/microsoft-edge-and-interop-2023/
- Adobe and Microsoft Bring Industry-Leading Acrobat PDF Experience to 1.4 Billion Windows Users through Microsoft Edge - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2023/02/08/adobe-acrobat-microsoft-edge-pdf/

#### Chakra

#### Other

- Behind the Scenes: How we are securing our new PDF stack | Microsoft Browser Vulnerability Research
  - https://microsoftedge.github.io/edgevr/posts/How-we-are-securing-our-new-PDF-stack/
- **Eric Lawrence on Twitter: "Recently, the TLD "office" was added to the HSTS preload list, meaning that everything in that namespace (e.g. www.office, example.office, blah.office) now must use HTTPS to load in a browser. This has a surprising consequence for anyone who..."**
  - https://twitter.com/ericlaw/status/1631383581980229632
  - .office という TLD が最近 HSTS Preload List に追加され、それがイントラのサイトに影響したらしい
- Adobe and Microsoft Bring Industry-Leading Acrobat PDF Experience to 1.4 Billion Windows Users through Microsoft Edge
  - https://blogs.windows.com/msedgedev/2023/02/08/adobe-acrobat-microsoft-edge-pdf/
- Slow Seaside Half - text/plain
  - https://textslashplain.com/2023/03/01/slow-seaside-half/
- Q: "Remember this Device, Doesn't?!?" - text/plain
  - https://textslashplain.com/2023/02/10/q-remember-this-device-doesnt/
- Attack Techniques: Blended Attacks via Phone - text/plain
  - https://textslashplain.com/2023/02/09/attack-techniques-blended-attacks-via-phone/
- **A New Era: PM -> SWE - text/plain**
  - https://textslashplain.com/2023/02/06/a-new-era-pm-swe/
- A Year of Intention - text/plain
  - https://textslashplain.com/2023/02/04/a-year-of-intention/

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
  - **CSS Box Model Module Level 3**
    - https://www.w3.org/TR/2023/PR-css-box-3-20230216/
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - CSS Animations Level 2
    - https://beta.w3.org/TR/2023/WD-css-animations-2-20230302/
- Note
  - CSS Snapshot 2023
    - https://www.w3.org/TR/2023/DNOTE-css-2023-20230214/
- Chartering

#### Other

- W3C re-launched as a public-interest non-profit organization - W3C
  - https://beta.w3.org/news/2023/w3c-re-launched-as-a-public-interest-non-profit-organization/
- **W3C の新しいサイトのベータ版が公開**
  - W3C launches beta of its new website | W3C Blog
    - https://www.w3.org/blog/2023/02/w3c-launches-beta-of-its-new-website/
  - W3C welcomes feedback on the beta of its new website - W3C
    - https://beta.w3.org/news/2023/w3c-welcomes-feedback-on-the-beta-of-its-new-website/
  - We believe in one web for all - W3C
    - https://beta.w3.org/
- W3C sun-setting online unified validator; community may fork Unicorn - W3C
  - https://beta.w3.org/news/2023/w3c-sun-setting-online-unified-validator-community-may-fork-unicorn/
- **W3C Workshop on Permissions**
  - https://www.w3.org/Privacy/permissions-ws-2022/report
    - Permissions のワークショップレポート
    - Artifacts
      - Agenda
      - Participants
      - Minutes
    - Session summaries
      - Permissions & Consent
      - Cross-platform Comparison of Permission Models
      - Permission Misuse & Dark Patterns
      - User-centric Questions & Meaningful Choices
      - Transparency and Auditing
      - Beyond Prompts
      - Permissions UX Across Form Factors
      - New Web Experiences and App Models
    - Breakout summaries
      - Novel building blocks for capability control
      - Keying permissions to tasks vs origin vs app
      - Prompting for purpose & permission grouping
      - Accessibility considerations
      - Incentivizing developers to use good patterns / How to design 'good' friction?
      - How to involve UX more in standards processes?
      - Useful attestations / promises / policies; Operationalising 'Contextual Integrity'
      - Use case driven spec work / Updating specs
- **2023 年 01 月 W3C 活動概要 | w3ckeio.github.io**
  - https://w3ckeio.github.io/monthly-summary/202301.html
    - > Ministry of Digital Affairs, Taiwan
    - 台湾のデジタル発展部が W3C に入った

### TC39 動向

- ミーティングが終わって Minutes が出た月のみ実施
- それ以外の月はスキップ

#### Meeting

- 2023/01
  - https://github.com/tc39/notes/tree/main/meetings/2023-01
  - https://github.com/tc39/agendas/blob/main/2023/01.md
- TC39 Minutes を読む
  - https://docs.google.com/document/d/1qXUf4QRTbexUj0fg2sgYTxWwOT2v_q7lmjR282BOWLU/edit
  - https://twitter.com/mozaicfm/status/1629104591261564928
- **Problems with import assertions for module types and a possible general solution + downgrade to Stage 2**
  - import assertions で assert { type: "css" } とかしても実際は script として読み込まれる
  - すると CSP の script-src が適用されるが、それでいいのか?
  - という HTML の issue から始まった
  - assert が制御してるのは読み込みと評価のみで、どう取得するかは定義してない
  - これをどうするか
  - with とか as とかで色々構文を直す? 構文は同じで semantics だけ変える?
  - Stage 3 -> 2 に落として、構文(assert)は考え直すことに
- **Prototype pollution mitigation / Symbol.proto**
  - https://github.com/tc39/proposal-symbol-proto
  - Prototype 汚染攻撃を防ぎたい
  - Prototype に文字列でアクセスできなくするモードを用意する
  - アクセスしたい場合はシンボルを使う
  - 導入方法は
    - 1. HTTP ヘッダ
    - 2. "use secure-mode" か Object.enableSecureMode()
    - 3. 一回でも Symbol.proto/constructor を呼んだら
  - Stage 1
- **A procedure for multiple active supporters in committee to achieve consensus**
  - コンセンサスのとり方を変えよう
  - 現状は強い反対意見のあるものだけが表面化しがち
  - だれも反対してないものもあるが、それが興味がないだけか、賛成なのかはっきりしない
  - そのへんをはっきりさせつつ、コンセンサスの取り方を how-we-work として明確にしよう

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2023-01-01}...main@{2023-02-01}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->3
- 3->4

#### New Proposals

#### Other

### IETF 動向

- RSS が軒並み止まっていくので追うのが難しくなってる。
- ML は RSS がないものもあって日常的にスレッドを全部追うのが難しい
- いくつかの WG に絞り、ミーティングベースで追いかける感じにする
- それ以外は試行錯誤中

#### WG

- IETF
  - https://datatracker.ietf.org/meeting/
- httpwg
  - https://datatracker.ietf.org/wg/httpbis/meetings/
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
- quicwg
  - https://datatracker.ietf.org/wg/quic/meetings/
  - https://mailarchive.ietf.org/arch/browse/quic/
  - https://github.com/quicwg/wg-materials
- webtrans
  - https://datatracker.ietf.org/wg/webtrans/meetings/
  - https://mailarchive.ietf.org/arch/browse/webtransport/
  - https://github.com/DavidSchinazi/webtrans-wg-materials
- tlswg
  - https://mailarchive.ietf.org/arch/browse/tls/
  - https://github.com/tlswg/wg-materials
  - https://datatracker.ietf.org/wg/tls/meetings/
- wpack
  - https://datatracker.ietf.org/wg/wpack/meetings/
- masque
  - https://datatracker.ietf.org/wg/masque/meetings/
- pearg
- privacypass
  - https://datatracker.ietf.org/wg/privacypass/meetings/
- dispatch
  - https://mailarchive.ietf.org/arch/browse/dispatch/
- secdispatch
  - https://mailarchive.ietf.org/arch/browse/secdispatch/

#### Other

### CDN 動向

#### Cloudflare

- One year of war in Ukraine: Internet trends, attacks, and resilience
  - https://blog.cloudflare.com/one-year-of-war-in-ukraine/
- A look at Internet traffic trends during Super Bowl LVII
  - https://blog.cloudflare.com/super-bowl-lvii/
- **Welcome to Wildebeest: the Fediverse on Cloudflare**
  - https://blog.cloudflare.com/welcome-to-wildebeest-the-fediverse-on-cloudflare/
- Manage and control the use of dedicated egress IPs with Cloudflare Zero Trust
  - https://blog.cloudflare.com/gateway-egress-policies/
- Cloudflare's handling of a bug in interpreting IPv4-mapped IPv6 addresses
  - https://blog.cloudflare.com/cloudflare-handling-bug-interpreting-ipv4-mapped-ipv6-addresses/
- Uptick in healthcare organizations experiencing targeted DDoS attacks
  - https://blog.cloudflare.com/uptick-in-healthcare-organizations-experiencing-targeted-ddos-attacks/
- Cloudflare mitigates record-breaking 71 million request-per-second DDoS attack
  - https://blog.cloudflare.com/cloudflare-mitigates-record-breaking-71-million-request-per-second-ddos-attack/
- The Chief Zero Trust Officer: a new role for a new era of cybersecurity
  - https://blog.cloudflare.com/chief-zero-trust-officer/
- **How Rust and Wasm power Cloudflare's 1.1.1.1**
  - https://blog.cloudflare.com/big-pineapple-intro/
- Oxy is Cloudflare's Rust-based next generation proxy framework
  - https://blog.cloudflare.com/introducing-oxy/
- How we built an open-source SEO tool using Workers, D1, and Queues
  - https://blog.cloudflare.com/how-we-built-an-open-source-seo-tool-using-workers-d1-and-queues/

#### Fastly

- **Fastly と Fediverse の未来 : パート 1 | Fastly**
  - https://www.fastly.com/jp/blog/fastly-and-the-fediverse-pt-1
- Chrome の TLS ClientHello のランダム順列機能をご紹介 | Fastly
  - https://www.fastly.com/jp/blog/a-first-look-at-chromes-tls-clienthello-permutation-in-the-wild
- Fastly 、業界初 5 年連続で Web アプリケーション & API 保護部門の「Customers' Choice」に選出 | Fastly
  - https://www.fastly.com/jp/blog/fifth-times-a-charm-fastly-is-the-only-vendor-to-be-named-a-customers-choice
- Fastly の Glitch 、 2023 DEVIES Award を受賞 | Fastly
  - https://www.fastly.com/jp/blog/fastly-wins-2023-devies-award-for-glitch
- 10 年以上にわたるスーパーボウルの配信サポートで新たな記録を更新 | Fastly
  - https://www.fastly.com/jp/blog/delivering-super-bowl-for-more-than-a-decade-and-breaking-records-in-the
- Brotli is great at making things small (and no, we aren't talking about the Swiss bread!) | Fastly
  - https://www.fastly.com/blog/brotli-is-great-at-making-things-small-and-no-we-arent-talking-about-the
- **Announcing Certainly: Fastly's own TLS Certification Authority | Fastly**
  - https://www.fastly.com/blog/announcing-certainly-fastlys-own-tls-certification-authority
  - Fastly も CA に参加
  - ECDSA などももちろんサポート
  - Boulder で ACME サポート
  - Apple や Google の Root Store にも参加
  - GoDaddy とのクロスルート

#### Other

- Vercel
  - Building a GPT-3 app with Next.js and Vercel Edge Functions - Vercel
    - https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions
  - The Next.js SEO Playbook: Ranking higher with Next.js on Vercel - Vercel
    - https://vercel.com/blog/nextjs-seo-playbook
  - Vercel Cache API: A progressive cache, integrated with Next.js - Vercel
    - https://vercel.com/blog/vercel-cache-api-nextjs-cache
- Akamai
  - Changing Healthcare Delivery Requires Evolving Security Strategies | Akamai
    - https://www.akamai.com/blog/news/changing-healthcare-delivery-requires-evolving-security-strategies
  - The Evolution of DDoS in Financial Services - Much More than a Nuisance | Akamai
    - https://www.akamai.com/blog/security/evolution-ddos-financial-services
  - What's New for Developers: February 2023 | Akamai
    - https://www.akamai.com/blog/developers/whats-new-for-developers-february-2023
  - Akamai Recognized as a 2023 Gartner ® Peer Insights ™ Customers' Choice for Cloud WAAP | Akamai
    - https://www.akamai.com/blog/security/akamai-2023-customers-choice-cloud-waap
  - IDC MarketScape が Akamai を世界的パブリッククラウド IaaS の「競争者」に選出 | Akamai
    - https://www.akamai.com/ja/blog/cloud/idc-marketscape-names-akamai-a-contender
  - 機能不全の危機 - Wininit.exe を使用したリモート DoS 攻撃 | Akamai
    - https://www.akamai.com/ja/blog/security-research/cant-wait-to-shut-you-down-msrpc-wininit

### セキュリティ動向

- **当サイトへの不正アクセスによる個人情報漏えいに関するお詫びとお知らせ|ソースネクスト**
  - https://www.sourcenext.com/support/i/2023/0214_info/
  - > 原因
  - > 弊社が運営するサイトのシステムの一部の脆弱性を利用した第三者の不正アクセスにより、ペイメントアプリケーションの改ざんが行なわれたため。
- **ペイメントアプリケーションの改ざん(Web スキミング)に関する概説と対策手法について - セキュリティ研究センターブログ**
  - https://security.macnica.co.jp/blog/2023/02/web-1.html

### 周辺動向

- **Towards a modern Web stack (PUBLICLY SHARED)**
  - https://docs.google.com/document/d/1peUSMsvFGvqD5yKh3GprskLC3KVdAlLGOsK6gFoEOD0/preview
  - Ian Hickson (Hixie) による新しい Web スタックの提案
  - WebAssembly
  - WebGPU
  - ARIA
  - WebHID
  - の 4 つを用いて、既存の Web 技術スタックから離れて開発する
- **How Shadow DOM and accessibility are in conflict**
  - https://alice.pages.igalia.com/blog/how-shadow-dom-and-accessibility-are-in-conflict/
  - 支援技術が必要とする情報が Shadow DOM の中に隠蔽されたり、 Shadow DOM 間で断絶したりする
  - すると支援技術が正しく DOM の構造を認識でない可能性がある
  - どうすべきかと足りてない仕様などの考察
- 「輻輳」は「アクセス集中」に言い換え...通信障害時の説明わかりやすく、大手 6 社が素案(読売新聞オンライン) - Yahoo!ニュース
  - https://www.yomiuri.co.jp/economy/20230204-OYT1T50285/
  - > 通信が集中して障害の原因になる「輻輳(ふくそう)」は、「アクセス集中」に言い換える。
- Twitter restricted in Turkey in aftermath of earthquake - NetBlocks
  - https://netblocks.org/reports/twitter-restricted-in-turkey-in-aftermath-of-earthquake-oy9LJ9B3
  - トルコの地震後にトルコ国内で Twitter がブロックされているらしい
- **HTTPS by Default | Brave Browser**
  - https://brave.com/privacy-updates/22-https-by-default/
  - Brave に入る HTTPS by Default 機能について
  - リクエストした URL がアップグレードに失敗するサイトのリストになければ HTTPS でのアップグレードを試し、エラーが返ってこなかったら HTTPS のページを読み込む
    - https://github.com/brave/adblock-lists/blob/master/brave-lists/https-upgrade-exceptions-list.txt
- Yahoo! JAPAN 、位置情報や Cookie など個人情報の利用に関する通知について、 Q&A 形式で解説するコンテンツ「とつぜん通知解決ガイド」を公開 - ニュース - ヤフー株式会社
  - https://about.yahoo.co.jp/pr/release/2023/02/15a/
  - > スマートフォンなどを使用している際に表示される"位置情報の利用"や"Cookie の利用"など、さまざまな許可を求めるポップアップ通知について、通知の意味や気を付けるべき点を Q&A 形式でわかりやすく解説し、自分自身の個人情報の扱いに関する疑問や不安を解消するコンテンツ
- 許可しちゃって、だいじょうぶ? とつぜん通知解決ガイド - Yahoo! JAPAN
  - https://events.yahoo.co.jp/noticeguide/
- **WWW-Talk Jan-Mar 1993: proposed new tag: IMG**
  - http://1997.webhistory.org/www.lists/www-talk.1993q1/0182.html
    - Marc Andreessen による img 要素の提案から 2 月 25 日で 30 年経った
  - Dive Into HTML5
    - http://diveintohtml5.info/
    - `<img>` が入るまでのヒストリーがまとまってる
  - How Did We Get Here? - Dive Into HTML5 (日本語訳)
    - https://myakura.github.io/dih5ja/past.html
- How Meta brought AV1 to Reels - Engineering at Meta
  - https://engineering.fb.com/2023/02/21/video-engineering/av1-codec-facebook-instagram-reels/
- **How we Build Platforms**
  - https://www.mnot.net/blog/2023/02/19/platforms
  - FB がメタバースプラットフォームを作ろうとしてることに対して
  - そんなに簡単じゃないという話を書いてる
- BCD - Experimental APIs
  - https://paul.kinlan.me/bcd-experimental-apis/

### イベント

- 3 月
  - 21-23: TC39 at F5
  - 25-31: IETF116 Yokohama
    - https://www.ietf.org/how/meetings/116/
- 4 月
- 5 月
  - 25: SecWeb
    - https://secweb.work/2023.html

### Wrap Up

- Chrome
  - 110
    - :picture-in-picture
    - iframe credentialless
  - DevTools 110
    - Clearing Performance Panel on reload
  - 111
    - new CSS color features
    - :nth-child( of S )
    - Style container queries for Custom props
    - Streaming Declarative Shadow DOM
    - View Transitions API
    - Document Picture-in-Picture Origin trial
  - DevTools 111
    - evaluating expressions with private class members
  - Ship
    - CSS overflow/update media features
    - CSS headline balancing
    - change beforeunload handler dialog condition
    - Headers.getSetCookie()
    - remove Authorization header upon cross-origin redirect
    - Least Restrictive CSP (prefetch-src removal)
  - Prototype
    - CSS top-layer property
    - Long Animation Frame Timing (LoAF)
    - Interoperable Private Attribution (by Meta)
  - Experiment
  - Deprecate and Remove
    - CSP block-all-mixed-content directive
    - CSP prefetch-src directive
    - `shadowroot` attribute
  - other intents
    - iframe render throttling
  - web.dev
    - Interop 2023
    - Learn Images/Privacy/HTML
  - Google Developer Blog
    - TrustCor revocation
    - Chromium + Rust
  - Chrome Developers
    - soft navigation
    - CrUX History API
    - Style Quereis
    - UA reduction
    - CSS anchor positioning
    - Lighthouse 10 (TTI → CLS)
  - Chromium blog
  - other blogs
  - other
    - remove navigation to web-bundles
    - Root Program Policy 更新
- Firefox
  - 110
    - Container Queries (style)
    - AsyncIterator on ReadableStream
  - Ship
    - `forced-color-adjust`
    - `linear()` easing function
  - Prototype
  - other intents
  - other
    - SpiderMonkey で Import Maps の解説
    - MDN と Open Web Docs ミーティング
- Safari
  - TP 163
    - CSS Masonry layout
    - unforgiving `:has()`
    - CSS `leading-trim`
    - ARIA for Custom Elements
  - TP 164
    - Disabled Import Assertions
    - `Clear-Site-Data`
  - Safari 16.4 Beta
    - CSS
      - `:user-valid`/`:user-invalid`
      - `margin-trim`
      - `@property`
      - Media Queries range syntax
      - Typed OM
    - Custom Elements
      - Declarative Shadow DOM
      - ElementInternals
    - JavaScript
      - RegExp lookbehind assertions
      - Array.fromAsync
      - Array.group
      - import.meta.resolve()
      - String.isWellFormed
      - Import Maps
    - HTML lazyloading iframes
    - `Clear-Site-Data`
    - AVIF on Monterey/Big Sur
    - Web API
      - 2D OffscreenCanvas
      - Scroll to Text Fragment
      - Compression Streams
      - Reporting API
      - User Activation API
      - Web Push for iOS
      - Badging API
  - blog
    - iOS16.4 の Web Push について。ホーム追加必須など。
    - Interop 2023 の紹介
    - Declarative Shadow DOM の解説
    - User Activation API の解説
  - other
    - Alex Russel による Safari 16.4 への Admission ブログ
- Edge
  - Edge のサイドバーに Bing チャットを埋め込む
  - Interop のアナウンス
  - .office が HSTS Preload に入り MS の Intra サイトが壊れた話
  - Eric Rawrense 先生の半生ブログ
- W3C/WHATWG
  - Spec
    - CSS Box Model Module Lv3
  - Other
    - 新しい W3C サイトのベータ公開
    - Permission Workshop のレポート
    - 台湾デジタル発展部が W3C 参加
- TC39
  - import assertion の assert が取得方法を定義してないことにより見直しで Stage 2 に down
  - Prototype 汚染を防ぐために文字列アクセスできなくするモードの提案
  - コンセンサスの取り方の見直しとドキュメント化
- IETF
  - やり方の見直し
- CDN 動向
  - 1.1.1.1 での Rust / WASM の利用
  - Cloudflare と Fastly が Fediverse の話
  - Fastly が GoDaddy と Cross Root で CA 参加
- セキュリティ動向
  - ソースネクストでの Web スキミングによる漏洩報告と解説
- 周辺動向
  - Hixi による新しい Web 技術スタック(ほぼ Flatter for Web)の話
  - ShadowDOM によるアクセシビリティ支援技術の影響について
  - Brave に入る HTTPS by Default 機能と、非対応ドメインリストについて
  - img 要素が提案されてから 30 年経った
  - mnot 先生による meta への「Platform を作るのは簡単じゃないよ」って話
