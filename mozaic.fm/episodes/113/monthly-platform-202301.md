---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep113.mp3
published_at: 2023-01-31
guest: [@myakura](https://twitter.com/myakura)
---

# ep113 Monthly Platform 202301

## Theme

第 113 回のテーマは 2023 年 1 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 109

#### Updates

- **New in Chrome 108**
  - https://developer.chrome.com/en/blog/new-in-chrome-108/
  - New viewport size units
  - Variable fonts now supported in COLRv1.
  - **FileSystemSyncAccessHandle methods are now synchronous.**
- **Chrome 109 beta**
  - https://developer.chrome.com/en/blog/chrome-109-beta/
  - CSS
    - Auto range support for font descriptors inside @font-face rule
    - CSS lh Length Unit
    - CSS hyphenate-limit-chars property
    - Snap border, outline and column-rule widths before layout
  - **MathML**
  - Web APIs
    - Secure Payment Confirmation on Android Chrome
    - Conditional Focus
    - MediaTrackSupportedConstraints.suppressLocalAudioPlayback
    - HTTP response status code in the Resource Timing API
  - Origin Private File System (OPFS) on Android
    - Same-site cross-origin prerendering triggered by the speculation rules API
    - WebTransport BYOB readers
  - Origin trials in progress
    - **Back/forward cache NotRestoredReason API**
    - Private Network Access preflight requests for subresources
  - Deprecations and removals
    - Removals
    - Remove Event.path
- **New in Chrome 109**
  - https://developer.chrome.com/en/blog/new-in-chrome-109/
  - OPFS on Android
  - New in CSS.
  - MathML Core support.
- **What's New In DevTools (Chrome 109)**
  - https://developer.chrome.com/en/blog/new-in-devtools-109/
  - Recorder: Copy as options for steps, in-page replay, step's context menu
  - Show actual function names in performance's recordings
  - New keyboard shortcuts in the Console & Sources panel
  - **Improved JavaScript debugging**
  - Miscellaneous highlights
  - [Experimental] Enhanced UX in managing breakpoints
  - [Experimental] Automatic in-place pretty print
  - Download the preview channels
  - Getting in touch with the Chrome DevTools team
- **Chrome 110 beta**
  - https://developer.chrome.com/en/blog/chrome-110-beta/
  - CSS
    - CSS Initial Letters
    - **CSS pseudo-class :picture-in-picture**
  - Web APIs
    - AudioContext.setSinkId()
    - FedCM within cross-origin iframe
    - **IFrame credentialless**
    - FileSystemHandle::remove() method
    - **Prefetching triggered by the speculation rules API**
    - Use Non-Transitional IDNA Processing in URLs
    - Web app launch handler
    - web-share permission policy
  - Origin trials in progress
    - **No-Vary-Search support in navigation prefetch cache**
    - PerformanceResourceTiming.deliveryType
    - SoftNavigation performance entry
    - **Speculation rules: delivery via Speculation-Rules header**
    - **Speculation rules: document-sourced rules**
    - X-Requested-With in WebView
  - Deprecations and removals
    - **Remove Web SQL in non-secure contexts**
    - Remove window.webkitStorageInfo

#### Intents

- Ship: CSS Trigonometric functions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UiUVU722BbU
  - CSS での三角関数
- Ship: FedCM on cross-origin iframes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IGvFrHYMH7A
- Ship: FileSystemHandle `remove()` method
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tESXuOfqQMQ
- **Ship: Network State Partitioning**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Oj9cS6p40Ws
  - Network State を isolate
    - connections (H1, H2, H3, websocket)
    - DNS cache
    - ALPN/H2 support data
    - TLS/H3 resumption information
    - Reporting/NEL configuration and uploads
- **Ship: Style Container Queries for CSS Custom Properties**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ACL23q_nbK0
  - `style()` を Container Queries で Custom Properties の値を条件にできる
- Ship: Unprefix -webkit-image-set
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JXcRP4MJc9I
- **Ship: Use Non-Transitional IDNA Processing in URLs**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8pxRArGQlS4
  - URL に `ß`, `ς`, ZWJ, ZWNJ などが入った時の挙動が Chrome と Safari/Firefox で異なった
  - https://fa ß.de へのアクセスはブラウザによって違う
  - これを合わせる修正
- **Ship: WebGPU**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VomzPhvJCxI
- Ship: font-variant-alternates and the @font-feature-values at-rule
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IDXErld2g04
- **Ship: CSS Root Font Units: 'rex', 'rch', 'ric', 'rlh'**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uTbFlDLATho
- **Ship: CSS Selectors 4 Pseudo-Class :nth-child(an + b of S)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6zLouMDG4Eg
  - p:nth-child(2n) は p p p なら 2 つ目の p だが、 p h2 p のような順では拾えない
  - :nth-child(2n p) なら p h2 p でも 2 つ目の p が拾える
- Ship: Secure Payment Confirmation - Opt-Out Support
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/08KdhA66MyA
- Ship: Speculation rules: referrer policy key
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/u6V9hMIsTiU
- **Ship: String.prototype.isWellFormed and toWellFormed**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ieg6Od--og8
  - サロゲートペアが欠けた文字列などを検出修正し WASM とやりとりするメソッド
- Ship: baseline-source
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gLNyu0lTRS0
- Ship: removing the five-minute rule for `<link rel=prefetch>`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Zdo71C0k9C0
- **Ship: Add containerName and containerQuery, update conditionText**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iqsvfdX5NcI
- **Ship: CSS Nesting**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eFCrkiLynfU
  - WebKit blog における Option 3 で実装される
  - ただし、まだ議論は終わってない中での Ship に対する反論もあり
- Ship: FileSystemFileHandle.move() for local files
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ogS8CeyZ3n8
- Ship: Font shorthand property resetting its subproperties
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/22MU6QJK7l0
- Ship: Remove quirks mode behavior for option label attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KJ7UI89UPpM
- **Ship: Streaming declarative shadow DOM**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xzT-vN-bx0s
- Ship: Updated dialog initial focus algorithm
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CEL3wWHrTAQ
- **Ship: View Transitions: single-page apps**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AJJiH6Pjr50
- Ship: RegExp v flag with set notation + properties of strings
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6eR_ePP0cCU
- Ship: animation-composition property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5Lg0kHOUZ8Y
- Prototype and Ship: WebXR enabledFeatures attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7NwzIE-bZnk
- **Implement and Ship: User-Agent Reduction Phase 6 (deviceModel and androidVersion reduction in Android)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zVOEHwgyyu4
    - Android 版 Chrome の UA 文字列の削減
    - バージョンが 10 に、デバイス名が `K` に固定される
- **Implement and Ship: Allow as=fetch in navigation early hints preload**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ug6PODP-E1g
- Prototype: **Streaming** declarative shadow DOM
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ovz-6Dte-qA
- **Prototype: Additional Windowing Controls**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oCxWg8q_OQY
- Prototype: Display and content-visibility animations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uz9ySl61bBE
- Prototype: GamePad multitouch extension
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4q_k23rPMos
- **Prototype: HTTPS Upgrades**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mgJqym5-Xek
  - デフォルトを HTTPS でアクセスし、ダメなら HTTP にフォールバックする
- Prototype: PointerEvent.deviceId for Mult-Pen Inking
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_s7rj-CuMF8
- **Prototype: Remove Prefetch 5-minute Rule**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eduycCpm5ws
  - Prefetch したリソースが max-age や no-cache でヒットしないことを防ぐために 5 分間はその設定を無視してた
  - その無視をやめる
- Prototype: Transitions on specified discrete properties
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CIrhWeBc-y0
- Prototype: Web Authentication API: JSON serialization methods
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ePTIazJJ2TA
- Prototype: WebRTC encoded transform - Clone and Modify functions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/x2ZACgXrqp0
- Prototype: baseline-source
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IKVUwMNmDgM
- Prototype: Open popups as fullscreen windows
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/t8lL5RvfLJY
- **Prototype: 'priority' HTTP request header**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eEeDzwtw5v0
- Prototype: WebXR Front Facing Camera API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Lq0tn6WAGsQ
- Experiment: No-Vary-Search support in navigation prefetch cache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6gsc52WQgrU
- Experiment: SoftNavigation performance entry
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IK-IZTBo59U
- Experiment: Speculation Rules - Document rules, response header, deliveryType
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3-0rLTZePzc
- **Experiment: Document picture-in-picture**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Tz1gUh92dXs
- Ready for Trial: Compute Pressure
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-1ciwdn23J4
- Ready for Trial: First-Party Sets
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-_kPNC3tF2s
- Extend Origin Trial: Popover API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kZXexHhH7EA
- Extend Origin Trial: WebGPU
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/46el9iRONFk
- Extend origin trial: Pending Beacon API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/b-XAY59jj0c
- Extend Experiment: Privacy Sandbox Ads APIs through M113
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gpmaOi3of_w
- Extend experimentation: Back/forward cache NotRestoredReason API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/98zjr6wY2cw
- Extend experimentation: Permissions-Policy: unload
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SFWYCfjJNhs
- Request for Deprecation Trial: Unpartitioned 3rd party Storage, Service Workers, and Communication APIs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FNi-nNC8fiw
- **Deprecate: X-Requested-With in WebView**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/k9HL9muJPxs
- Deprecate and Remove: Secure Payment Confirmation: Rename rp --> rpId in CollectedClientAdditionalPaymentData
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_KGnT-jJyPA
- Deprecate and Remove: data: URL in SVGUseElement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Q9dLyBhtZTw
- Deprecate and Remove: WebRTC's RTCStats of type "track" and "stream".
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NZVXsJQ7tV8
- Deprecated "track" and "stream" stats are unshipped in M109.
  - https://groups.google.com/g/discuss-webrtc/c/Bxrxr8gw08Y
- Extend Deprecation Trial: Restrict "private network requests" for subresources from public websites to secure contexts.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IK-Q7wnLqvo
- Remove: Calling `getDisplayMedia()` without user activation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YGmuAVOqftI
- **Remove: Rename User-Agent Client Hint ACCEPT-CH tokens**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/t-S9nnos9qU
- **Remove: Shortened IPv4 addresses in the URL**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dKzd-FKYClc
- **PSA: Changing `Accept` Header for prefetch (and SXG)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aItPLywIGLw
- PSA: Use Origin header instead of Referer in FedCM requests
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Tq2ZToSRBKg
- PSA: Add "window-management" as an alias for permission and permission policy "window-placement"
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Hf2b1-S39Uw
- PSA Resource-Timing for cross-origin iframes: change in behavior
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/b0-4JXb3kuo

#### V8

- **Introducing the WebAssembly JavaScript Promise Integration API · V8**
  - https://v8.dev/blog/jspi
- Pointer compression in Oilpan · V8
  - https://v8.dev/blog/oilpan-pointer-compression

#### Other

- web.dev
  - The large, small, and dynamic viewport units
    - https://web.dev/viewport-units/
  - New to the web platform in November
    - https://web.dev/web-platform-11-2022/
  - Optimize Interaction to Next Paint
    - https://web.dev/optimize-inp/
  - **Interop 2022: end of year update**
    - https://web.dev/interop-2022-wrapup/
  - New to the web platform in December
    - https://web.dev/web-platform-12-2022/
  - Our top Core Web Vitals recommendations for 2023
    - https://web.dev/top-cwv-2023/
  - **All of Learn Accessibility! is available**
    - https://web.dev/learn-accessibility-available/
  - Optimize Time to First Byte
    - https://web.dev/optimize-ttfb/
- google developer blog
  - https://developers.googleblog.com/
- google developer japan blog
  - Chrome Developer Relations チームのリーダー Paul Kinlan が ウェブ開発への情熱を語る
    - https://developers-jp.googleblog.com/2022/12/chrome-developer-relations-paul-kinlan.html
  - Chrome がパスキーに対応しました
    - https://developers-jp.googleblog.com/2022/12/chrome.html
  - Google Developers Japan: Google Ads API v10 の提供終了に関するお知らせ
    - https://developers-jp.googleblog.com/2023/01/google-ads-api-v10-sunset-reminder.html
- chrome developer blog
  - What developers need to know about Chrome's Memory and Energy Saver modes
    - https://developer.chrome.com/en/blog/memory-and-energy-saver-mode/
  - DevTools Tips: Device Mode
    - https://developer.chrome.com/en/blog/devtools-tips-19/
  - Maximize ad relevance
    - https://developer.chrome.com/en/blog/maximize-ad-relevance/
  - First-Party Sets testing instructions
    - https://developer.chrome.com/en/blog/first-party-sets-testing-instructions/
  - Chrome Extensions: Extending API to support Instant Navigation
    - https://developer.chrome.com/en/blog/extension-instantnav/
  - Passwordless sign-in on forms with WebAuthn passkey autofill
    - https://developer.chrome.com/en/blog/webauthn-conditional-ui/
  - Screen sharing improvements in Chrome 109
    - https://developer.chrome.com/en/blog/screen-sharing-improvements-in-chrome-109/
  - Secure Payment Confirmation on Chrome Android
    - https://developer.chrome.com/en/blog/spc-on-android/
  - **Participate in origin trial for Accept-Language Reduction**
    - https://developer.chrome.com/en/blog/origin-trial-for-accept-language-reduction/
  - Prerender pages in Chrome for instant page navigations
    - https://developer.chrome.com/en/blog/prerender-pages/
  - Chrome Dev Insider: The year that was
    - https://developer.chrome.com/en/blog/insider-dec-22/
  - Chrome Web Store Policy Updates
    - https://developer.chrome.com/en/blog/cws-policy-revamp-jan23/
  - **Help choose the syntax for CSS Nesting**
    - https://developer.chrome.com/en/blog/help-css-nesting-again/
  - **Change in release schedule from Chrome 110**
    - https://developer.chrome.com/en/blog/early-stable/
    - 一部のユーザーに対して 1 週間 Stable が早く届くようになる
  - DevTools Tips: Debugging Project Fugu APIs
    - https://developer.chrome.com/en/blog/devtools-tips-17/
  - Change the destination output device in Web Audio
    - https://developer.chrome.com/en/blog/audiocontext-setsinkid/
  - SQLite Wasm in the browser backed by the Origin Private File System
    - https://developer.chrome.com/en/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system/
  - Iframe credentialless: Easily embed iframes in COEP environments
    - https://developer.chrome.com/en/blog/iframe-credentialless/
  - **Cookie Expires and Max-Age attributes now have upper limit**
    - https://developer.chrome.com/en/blog/cookie-max-age-expires/
  - Discovering the capable web
    - https://developer.chrome.com/en/blog/how-fugu-is-my-browser-and-how-fugu-is-the-web/
  - Control your drop caps with CSS initial-letter
    - https://developer.chrome.com/en/blog/control-your-drop-caps-with-css-initial-letter/
  - Basic offline page for web apps on Chrome Android
    - https://developer.chrome.com/en/blog/default-offline/
  - Offscreen Documents in Manifest V3
    - https://developer.chrome.com/en/blog/Offscreen-Documents-in-Manifest-v3/
  - **Scrollend, a new JavaScript event**
    - https://developer.chrome.com/en/blog/scrollend-a-new-javascript-event/
- chromium blog
  - **Chromium Blog: Introducing passkeys in Chrome**
    - https://blog.chromium.org/2022/12/introducing-passkeys-in-chrome.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- other
  - **Stadia Bluetooth mode**
    - https://stadia.google.com/controller/
      - サービスが終了した Stadia のコントローラーを普通の Bluetooth コントローラーにする
      - WebUSB を使っているらしい
  - A difficult decision to set us up for the future
    - https://blog.google/inside-google/message-ceo/january-update/

### Firefox 動向

#### Stable: 109.0

#### Updates

- Firefox 108.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/108.0/releasenotes/
- **Firefox 108 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/108
    - **`<source width/height>`**
    - **CSP `style-src-elem`/`style-src-attr`/`script-src-elem`/`script-src-attr`**
    - **Import Maps**
    - **add-on gated Web MIDI API**
      - https://support.mozilla.org/en-US/kb/site-permission-add-ons
- **Firefox 109.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/109.0/releasenotes/
    - Manifest V3 が有効に
- Firefox 109 for developers - Mozilla | MDN
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/109
    - `scrollend` event

#### Intents

- **Ship: scrollend events**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/MtRimnadWME
- **Ship: CSS named pages**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/bazhFYQH6C8
  - @page で
  - Google Docs 印刷の互換性をあげたい
- Ship: autocapitalize attribute
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/4s_5fRGO38k
- **Ship: Always Partition Storage**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/qXbgQc7WoxM
- Prototype and Ship: CSP unsafe-hashes keyword
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/iFVK_N86tIs
- **Prototype and Ship: Size container queries**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/L3SjAs3xV6c
- Prototype and Ship: focus fix up rule
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/o69QCIYoxpU
- Prototype: CSS named pages
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/w-ddRvzGiTI
- Prototype: Autoplay Policy Detection API
  - https://groups.google.com/g/mozilla.dev.platform/c/W7HR5oIA9vA
- **Prototype: WebGPU**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/eKyeqjCa_co
- Deprecating and removing legacy l10n formats: DTDs, .inc & PluralForm
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/DnpKUnDmHa0
- SpiderMonkey Newsletter (Firefox 108-109)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/zpwaNXtgd0s
- Change:
- Remove:

#### Other

- **1805967 - Freeze `rv:` segment in the User Agent string to `rv:109.0` to avoid erroneous IE11 detection**
  - https://bugzilla.mozilla.org/show_bug.cgi?id=1805967
    - Firefox 110 以降で IE11 と誤検知され動かないサイトが出た
      - UA 文字列に含まれる `rv:110` が原因
    - IE11 の UA 文字列に `rv:11.0` という部分があり、 IE11 を検出しようと`/rv:11/.test(navigator.userAgent)` のように書いてたコードに引っかかった
    - 回避策として 110 台のバージョンは `rv:109` に固定する
- 1806690 - Remove the frozen `rv:109.0` IE11 UA workaround after Firefox reaches version 120 (desktop and Android)
  - https://bugzilla.mozilla.org/show_bug.cgi?id=1806690
- **How the Mozilla Community helps shape our products - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2022/12/how-the-mozilla-community-helps-to-shape-our-products/
- **Servo to Advance in 2023**
  - https://servo.org/blog/2023/01/16/servo-2023/
- **Igalia plans around Servo**
  - https://people.igalia.com/mrego/servo/igalia-servo-tsc-2022/
    - Servo のスポンサーは Igalia らしい
    - 2023 年 1 月から 4 人のメンバーを投入し、プロジェクトを復活させる
    - 短期的には基本的な CSS レイアウトの実装、中期的には IoT デバイスなど用途が絞られたところのエンジンにしていきたい
- project/tsc-2023-01-23.md at master · servo/project · GitHub
  - https://github.com/servo/project/blob/master/governance/tsc/tsc-2023-01-23.md
- **New year, new updates to Firefox - These Weeks in Firefox: Issue 130 - Firefox Nightly News**
  - https://blog.nightly.mozilla.org/2023/01/24/new-year-new-updates-to-firefox-these-weeks-in-firefox-issue-130/
- **Firefox Security & Privacy Newsletter for Q4 of 2022**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/dyiRVtqjock
  - Safety for New Capabilities with Site Permission Add-Ons
- **SpiderMonkey Newsletter (Firefox 108-109) | SpiderMonkey JavaScript/WebAssembly Engine**
  - https://spidermonkey.dev/blog/2022/12/20/newsletter-firefox-108-109.html
- Introducing about:logging
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/2Xv74MmiYpI/m/sIrino8gAwAJ

### Safari 動向

#### Stable: 16.3

#### Updates

- **Release Notes for Safari Technology Preview 159**
  - https://webkit.org/blog/13587/release-notes-for-safari-technology-preview-159/
  - 特になし
- **WebKit Features in Safari 16.2**
  - https://webkit.org/blog/13591/webkit-features-in-safari-16-2/
  - Interop 2022
  - Font Features
  - Last Baseline
  - Fixes and Polish
    - CSS
    - Rendering
    - Media
    - Web API
    - WebDriver
- **Release Notes for Safari Technology Preview 160**
  - https://webkit.org/blog/13639/release-notes-for-safari-technology-preview-160/
  - Web Inspector
  - CSS
    - **Added support for media queries level 4 including range queries (257252@main)**
  - Rendering
    - Added width and height content attributes to `<model>` (257294@main)
  - Web Animations
    - Implement KeyframeEffect.iterationComposite (257059@main)
    - Implemented correct accumulation support for the filter property (256952@main)
    - Implemented correct additivity support for the filter property (256955@main)
  - SVG
    - Changed the default for the x1, y1, and y2 attributes to 0% for LinearGradient (257032@main)
  - Media
  - JavaScript
    - **Enabled resizable ArrayBuffer (257005@main, 256998@main, 256826@main)**
    - Added JIT optimizations for ResizableArrayBuffers (257001@main)
    - **Added support for Atomics.waitAsync (257061@main)**
    - **Added binding generator support for async iterable (257021@main)**
    - Aligned Function#name behavior with spec (257114@main)
    - Relaxed Date parsing to accept narrow-no-break-space (256754@main)
    - Implemented Array.fromAsync (257177@main)
    - Implemented growable SharedArrayBuffer (256524@main, 256766@main)
    - **Implemented String#isWellFormed and String#toWellFormed (257250@main)**
  - WebAssembly
    - Added support for subtyping declarations (256243@main)
  - Service Workers
  - Accessibility
  - Editing
  - Web API
    - **Enabled UserActivation API (257214@main, 256572@main)**
    - Implemented input validation for CSSColorValues (256229@main)
    - Implemented messageerror event (256896@main)
    - Implemented support for StylePropertyMap.append() (257123@main)
    - Improved the speed of setting the value of `<textarea>` (256596@main)
- **Release Notes for Safari Technology Preview 161**
  - https://webkit.org/blog/13686/release-notes-for-safari-technology-preview-161/
  - Added emulation toggles for prefers-reduced-motion and prefers-contrast in the Elements tab (257383@main)
  - Implemented WASM GC packed array types (257597@main)
  - Added experimental support for AudioSession Web API (257552@main)
  - **Added experimental WebCodecs AV1 support (257404@main)**
  - **Enabled the unprefixed version of the Fullscreen API (257658@main)**
  - Added support for the ::backdrop pseudo-element on fullscreen elements (257337@main)
  - Implemented the unprefixed :fullscreen pseudo-class (257542@main)
  - Implemented ShadowRoot.fullscreenElement (257457@main)
  - Added support for `<model src>` and honor `<source type>` attributes (257518@main)
  - Added a non-breaking space at the the end of text when the next text has a leading space (257622@main)
  - **Enabled 2D OffscreenCanvas (257672@main, 258237@main)**
  - **Added an iframe depth limit (257550@main)**
    - 32 以下に制限
  - Added support to return an adjusted URL when accessed from JavaScript bindings (257490@main)
  - Improved `<textarea>` validation performance (257417@main)
  - Added support for creating WebGL contexts for OffscreenCanvas in a web worker (257541@main)
  - **Enabled @property support (258246@main, 257525@main)**
  - **Enabled CSS Typed OM (258269@main)**
  - **Added support for :user-invalid and :user-valid pseudo-classes (257997@main)**
  - **Added support for RegExp lookbehind assertions (257823@main)**
- **WebKit Features in Safari 16.3**
  - https://webkit.org/blog/13691/webkit-features-in-safari-16-3/
  - **Added support for the `prefetch-src` directive.**
  - 他はバグ修正
- **Release Notes for Safari Technology Preview 162 | WebKit**
  - https://webkit.org/blog/13703/release-notes-for-safari-technology-preview-162/
  - CSS
    - Enabled CSS Nesting (258564@main, 258560@main)
    - Enabled CSS relative color syntax (258519@main)
    - Enabled CSS margin-trim property (258588@main)
    - Implemented margin-trim for flexbox (258563@main)
    - Implemented margin-trim for grid containers (258587@main)
  - Web API
    - Enabled declarative Shadow DOM by default (258566@main, 258568@main)
    - Enabled form-associated custom elements with ElementInternals by default (258574@main, 258561@main)
  - Accessibility
    - Enabled default ARIA for custom elements (258743@main)

#### Other

- **Help choose the syntax for CSS Nesting**
  - https://webkit.org/blog/13607/help-choose-from-options-for-css-nesting-syntax/

### Edge 動向

#### Stable: 109

#### Updates

#### Chakra

#### Other

- **Subject: Focusing on our short- and long-term opportunity - The Official Microsoft Blog**
  - https://blogs.microsoft.com/blog/2023/01/18/subject-focusing-on-our-short-and-long-term-opportunity/
    - Microsoft が全体の 5%弱の 1 万人をレイオフ
- Microsoft announces big layoffs that will affect 10,000 employees - The Verge
  - https://www.theverge.com/2023/1/18/23560315/microsoft-job-cuts-layoffs-2023-tech
    - HoloLens や Edge 、マーケティング、ベセスダが対象になっているらしい
- **The truth about CSS selector performance**
  - https://blogs.windows.com/msedgedev/2023/01/17/the-truth-about-css-selector-performance/
  - selector のパフォーマンスを devtools で計測する方法
- Microsoft Edge のロールバック方法について | Japan Developer Support Internet Team Blog
  - https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/how-to-rollback-edge/
- Eric 先生の攻撃/防御テクニックシリーズ
  - Attack Techniques: Priming Attacks on Legitimate Sites - text/plain
    - https://textslashplain.com/2023/01/11/attack-techniques-priming-attacks-on-legitimate-sites/
  - Attack Techniques: Phishing via Mailto - text/plain
    - https://textslashplain.com/2023/01/11/attack-techniques-phishing-via-mailto/
  - Attack Techniques: Phishing via Local Files - text/plain
    - https://textslashplain.com/2023/01/11/attack-techniques-phishing-via-local-files/
  - Defense Techniques: Reporting Phish - text/plain
    - https://textslashplain.com/2023/01/19/defense-techniques-reporting-phish/
- **TLS Certificate Verification Changes in Edge - text/plain**
  - https://textslashplain.com/2022/12/06/tls-certificate-verification-changes-in-edge/
- **Microsoft Edge に「ウィンドウの分割」機能が導入。 2 つのページを同時に閲覧可能に | ソフトアンテナ**
  - https://softantenna.com/blog/microsoft-edge-split-window/
    - Edge の Canary に分割表示のフラグがあるらしい

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
  - Call for Review: Web Share API is a W3C Proposed Recommendation | W3C News
    - https://www.w3.org/blog/news/archives/9773
- Candidate Recommendation
  - W3C Invites Implementations of WAI-Adapt: Symbols Module | W3C News
    - https://www.w3.org/blog/news/archives/9803
  - W3C invites implementations of WoT Thing Description 1.1, WoT Discovery and WoT Architecture 1.1
    - https://www.w3.org/blog/news/archives/9819
- Working Draft
- First Public Working Draft
  - First Public Working Draft: Contact Picker API | W3C News
    - https://www.w3.org/blog/news/archives/9797
  - First Public Working Draft: Compute Pressure Level 1 | W3C News
    - https://www.w3.org/blog/news/archives/9799
  - First Public Working Draft: Web Locks API | W3C News
    - https://www.w3.org/blog/news/archives/9806
- Chartering

#### Other

- **Dr. Jeffrey Jaffe steps down as W3C CEO; Ralph Swick appointed Interim CEO | W3C News**
  - https://www.w3.org/blog/news/archives/9776
- **W3C Advisory Committee Elects Technical Architecture Group | W3C News**
  - https://www.w3.org/blog/news/archives/9787
- **W3C Board of Directors successfully brokered MIT Asset Transfer Agreement | W3C News**
  - https://www.w3.org/blog/news/archives/9801
- **W3C accepting proposals for an Executive Search Firm | W3C News**
  - https://www.w3.org/blog/news/archives/9810
- **W3C Advisory Committee Elects Advisory Board in Special Election | W3C News**
  - https://www.w3.org/blog/news/archives/9817
- **[selectors] The forgiving nature of :has breaks jQuery when used with a complex :has selector · Issue #7676 · w3c/csswg-drafts**
  - https://github.com/w3c/csswg-drafts/issues/7676#issuecomment-1341347244
    - `:has()` で jQuery が壊れる問題を修正するため仕様が変わった
    - 引数が forgiving に解釈されると定義されていたが、普通のセレクタと同じように unforgiving に変更する
    - forgiving な挙動が欲しい場合は `:has(:is())` か `:has(:where())` を使う
  - jQuery 3.6.2 Released! | Official jQuery Blog
    - https://blog.jquery.com/2022/12/13/jquery-3-6-2-released/
  - jQuery 3.6.3 Released: A Quick Selector Fix | Official jQuery Blog
    - https://blog.jquery.com/2022/12/20/jquery-3-6-3-released-a-quick-selector-fix/

### TC39 動向

#### Meeting

- **2022-11**
  - https://github.com/tc39/agendas/blob/main/2022/11.md
  - https://github.com/tc39/notes/tree/main/meetings/2022-11
  - https://twitter.com/mozaicfm/status/1608087053002235905

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2022-01-01}...main@{2022-02-01}
- https://tc39.github.io/beta/
- 0->1
  - Intl.MessageResource
  - Intl.Era and MonthCode
  - Mass Proxy Revocation
- 1->2
  - Intl.DateTimeFormat
  - ArrayBuffer transfer split
- 2->3
  - Set Methods
  - Well-Formed Unicode Strings
  - Interator Helpers
  - Explicit Resource Management
- 3->4
  - Intl.Enumeration

#### New Proposals

- Groups
  - groupBy Sugar.js -> group -> Object/Map static
- Is ECMA402 allowed to extend ECMA262 prototypes?
  - Temporal の拡張を 402 側でやってもいいのか?
  - 262 にそういうことをするというメモを残さない限りやってはいけないという前提で許可
  - ただし、どこにどういうノートを書くのかはまだ決まってない
- Temporal status overview and normative changes
  - 実装しながらいくつかの問題が出たので議論
  - 実装も進み割と終わりに近づいている
  - test262 が終わってでかい PR を ECMA262 に出せば stage 4 になれそう
  - IETF 側も IESG レビューまできている
- Records and Tuples
  - 実際に実装すると equality 周りなどの実装が複雑なことがわかった
  - 費用対効果に見合っているのかを再度実装者間で議論するっぽい
- Module and ModuleSource Constructors
  - Module Harmony の layer 0 として提案されている
  - stage 0 だが 2 を目指してる?
- Module Expressions
  - Block から Expression になった
  - Message として worker に渡せるようになった
  - new Worker に module を渡したい時に コンストラクタでわたすとまずいので
  - 空の worker を作って addModule する
- Module declarations
  - Module Fragments が rename されたもの
  - Stage 2 まだ議論はたくさん必要
- Deferred Module Evaluation
  - dynamic import だと async になるので
  - 非同期に読み込む import を定義したい

#### Other

### IETF 動向

#### WG

- **IETF116 Yokohama**
  - https://www.ietf.org/how/meetings/116/
  - IETF116 予習
    - https://twitter.com/mozaicfm/status/1618596063245656065
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - HTTP Testing Hackathon in Yokohama?
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023JanMar/0047.html
  - Last Call: `<draft-ietf-httpbis-origin-h3-03.txt>` (The ORIGIN Extension in HTTP/3) to Proposed Standard from The IESG
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023JanMar/0046.html
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

- **mikewest/baseline-header**
  - https://github.com/mikewest/baseline-header
  - セキュリティ関連のヘッダをまとめて指定できる提案

### CDN 動向

#### Cloudflare

- **The state of HTTP in 2022**
  - https://blog.cloudflare.com/the-state-of-http-in-2022/
- **Cyberattacks on Holocaust educational websites increased in 2022**
  - https://blog.cloudflare.com/cyberattacks-on-holocaust-educational-websites-increased-in-2022/

#### Fastly

#### Other

- **RFC に準拠しない HTTP ヘッダーに関するセキュリティ脆弱性への対処とお客様影響につきまして | Akamai**
  - https://support.ntt.com/cdn-akamai/information/detail/pid2500001rg9
- **[Update] RFC に準拠しない文字列を含むヘッダを持つリクエストの扱いについて | Akamai**
  - https://support.ntt.com/cdn-akamai/information/detail/pid2500001s7v
- **RFC に準拠しない文字列を含むヘッダを持つリクエストの扱いについて | Akamai**
  - https://support.ntt.com/cdn-akamai/information/detail/pid2500001rtv
- **Improving Popularity Rankings for Better Threat Intelligence, Part 1 | Akamai**
  - https://www.akamai.com/blog/security/improving-popularity-rankings-for-better-threat-intelligence-part-1
  - Alexa の代わりに、特にセキュリティ周りで使えるランキングが必要
  - AkaRank を作り、このシリーズで他と比較していく
- **CWV 系パフォーマンス改善シリーズ(3/5 まで)**
  - Boost Your Page Load Times with Performance Engineering, Part 1 of 5 | Akamai
    - https://www.akamai.com/blog/developers/performance-engineering-part-1-of-5
  - SEO Need-to-Knows: Google's Core Web Vitals, Part 2 of 5 | Akamai
    - https://www.akamai.com/blog/developers/seo-google-core-web-vitals-part-2-of-5
  - Beyond CWV: 11 More Performance Metrics to Monitor, Part 3 of 5 | Akamai
    - https://www.akamai.com/blog/developers/beyond-cwv-more-performance-metrics-to-monitor-part-3-of-5

### セキュリティ動向

- **LastPass / Slack / Circle CI / Twitter / Paypal 内で相次いでインシデント**
  - Notice of Recent Security Incident - The LastPass Blog
    - https://blog.lastpass.com/2022/12/notice-of-recent-security-incident/
    - LastPass の情報公開をセキュリティ専門家が「嘘でいっぱいだ」と批判 | ソフトアンテナ
      - https://softantenna.com/blog/lastpass-disclosure/
  - Slack security update | Slack
    - https://slack.com/intl/en-gb/blog/news/slack-security-update
  - CircleCI セキュリティアラート: CircleCI 内に保存されているシークレットのローテーションをお願いいたします[1 月 12 日更新]
    - https://circleci.com/ja/blog/january-4-2023-security-alert/
  - Twitter から流出したとみられる約 2 億件のデータについてまとめてみた - piyolog
    - https://piyolog.hatenadiary.jp/entry/2023/01/07/000622
  - paypal_breach_notification.pdf
    - https://regmedia.co.uk/2023/01/19/paypal_breach_notification.pdf
    - PayPal でサイバー攻撃が発生し約 3 万 5000 人分の個人情報が流出していたことが判明 - GIGAZINE
    - https://gigazine.net/news/20230120-paypal-account-leaked/
- 要人警護に特化したサイバーパトロール開始、「襲撃の予兆」 SNS から収集 : 読売新聞オンライン
  - https://www.yomiuri.co.jp/national/20230107-OYT1T50303/
- **The death of the line of death | Emily M. Stark**
  - https://emilymstark.com/2022/12/18/death-to-the-line-of-death.html

### 周辺動向

- Open-sourcing Anonymous Credential Service
  - https://engineering.fb.com/2022/12/12/security/anonymous-credential-service-acs-open-source/
- Enabling static analysis of SQL queries at Meta -
  - https://engineering.fb.com/2022/11/30/data-infrastructure/static-analysis-sql-queries/
- Web サーバー「Apache」にアメリカ先住民から名称変更の要請 - GIGAZINE
  - https://gigazine.net/news/20230112-apache-appropriation/
- The Performance Inequality Gap, 2023 - Infrequently Noted
  - https://infrequently.org/2022/12/performance-baseline-2023/
- **数字で振り返る「ABEMA」の「FIFA ワールドカップ カタール 2022」 | 株式会社サイバーエージェント**
  - https://www.cyberagent.co.jp/news/detail/id=28368
  - アプリは GKE マイクロサービス
  - 映像処理は AWS Media Services シリーズ
  - CDN として Akamai と AWS CloudFront を併用
- 楽天グループが「オンプレ回帰」を決断、パブリッククラウドから IT 基盤を戻す狙い | 日経クロステック(xTECH)
  - https://xtech.nikkei.com/atcl/nxt/column/18/00001/07478/
- The State Of Usability In 2023 🎊 - Smashing Magazine
  - https://www.smashingmagazine.com/2023/01/usability-2023/
- On This Day in History on Twitter: "Today in 1983, 40 years ago: The ARPANET officially changes to using TCP/IP, the Internet Protocol, effectively creating the Internet. #OnThisDay" / Twitter
  - https://twitter.com/OnThisDayHappnd/status/1609635690702143488
  - 2023 年 1 月 1 日で、 ARPANET が TCP/IP に切り替わってから 40 年
    - https://www.ietf.org/rfc/rfc0801.txt
- **What I Learned in Law School**
  - https://www.mnot.net/blog/2023/01/05/law-school
  - インターネットにおける法的規制の影響が大きくなってきた
  - 法律/政策に疎い技術者と、技術に疎い政策担当者のギャップが目立ってきた
  - そこで 25 年前に卒業した mnot が Law school に戻って勉強した
- The State of JS 2022
  - https://2022.stateofjs.com/en-US/
- **Igalia Brings MathML Back to Chromium | Igalia**
  - https://www.igalia.com/2023/01/10/Igalia-Brings-MathML-Back-to-Chromium.html
  - WebKit フォーク後の Blink では消されていた MathML が戻ってくる
- **ウェブアクセシビリティ導入ガイドブック|デジタル庁**
  - https://www.digital.go.jp/resources/introduction-to-web-accessibility-guidebook/
- **【 1 月 23 日追記】 12 月 23 日、 24 日に発生しました障害に関するご報告 - skeb_jp - Medium**
  - https://medium.com/skeb-jp/report-36b5608aa867
- **アイルランド、 Meta にまた罰金 GDPR 違反で約 547 億円 - ITmedia NEWS**
  - https://www.itmedia.co.jp/news/articles/2301/05/news137.html
- **Watch Meta's engineers discuss optimizing large-scale networks - Engineering at Meta**
  - https://engineering.fb.com/2023/01/27/networking-traffic/optimizing-large-scale-networks-meta-engineers/
  - Meta が取り組むグローバルレベルでのネットワークの改善に関する紹介
  - 1. 大規模な in-house 社内ネットワークスイッチの開発
  - 2. グローバル光ネットワークのスケーリング
  - 3. ネットワーク トラフィック分析
  - 4. Network SLOs(Service Level Objective)
  - 5. L4 ルーティングの一貫性の向上

### イベント

- 1 月
- 2 月
- 3 月
  - 25-31: IETF116 Yokohama
    - https://www.ietf.org/how/meetings/116/

### Wrap Up

- Chrome
  - 108
    - new viewport size units
    - COLRv1 variable fonts
    - change FileSystemAccessHandle methods to sync
  - 109
    - MathML Core
    - OPFS on Android
    - CSS lh unit
  - Ship
    - Network State Partitioning
    - Style Container Queries for Custom Properties
    - Non-transitional IDNA processing
    - WebGPU
    - Selectors Level 4 `:nth-child()`
    - String isWellFormed/toWellFormed
    - CSS Nesting
    - Streaming Declarative Shadow DOM
    - View Transitions for Single-page apps
    - UA Reduction Phase 6 (Android version/deviceModel reduction)
    - as=fetch in navigation early hints preload
  - Prototype
    - HTTPS Upgrades
    - remove prefetch 5-min rule
    - Priority header
  - Experiment
    - Document PiP
  - Deprecate and Remove
    - X-Requested-With in WebView
    - Shortened IPv4 URL
  - other intents
  - web.dev
    - Interop 2022 wrap-up
    - Learn Accessibility
  - Google Developer Blog
  - Chrome Developers
    - Origin trial for Accept-Language reduction
    - Syntax poll on CSS Nesting
    - Early Stable from Chrome 110
    - Cookie Expires/Max-Age upper limit (400 days)
  - Chromium blog
  - other blogs
  - other
- Firefox
  - 108
    - CSP style-src-enum etc.
    - Import Maps
    - addon gated WebMIDI
  - 109
    - scrollend event
  - Ship
    - CSS @page
    - always partition storage
    - size container queries
  - Prototype
    - WebGPU
  - other intents
  - other
    - frozen UA string `rv:109` for Firefox 110-119
    - Servo to advance in 2023 (Igalia)
- Safari
  - TP159
    - bug fixes
  - Safari16.2
    - Interop2022
    - Font Features
    - Last Baseline
  - TP160
    - Media Queries range syntax
    - resizable ArrayBuffer
    - Atomics.waitAsync
    - generator support for async iterable
    - String.isWellFormed/toWellFormed
    - UserActivation API
  - TP161
    - WebCodecs AV1
    - Unprefixed Fullscreen
    - 2D OffscreenCanvas
    - Iframe depth limit to 32
    - @property support
    - CSS Typed OM
    - :use-invalid/:user-valid
    - RegExp look behind assertion
  - Safari 16.3
    - bug fixes
    - CSP prefetch-src
  - TP162
    - CSS Nesting
    - CSS relative color syntax
    - CSS margin-trim property
    - Declarative Shadow DOM
    - Form-associated custom elements
    - Default ARIA for custom elements
  - blog
    - Nest syntax の選択肢の紹介
  - other
- Edge
  - MS 1 万人レイオフ
  - Selector のパフォーマンスデバッグ方法
  - Eric 先生の攻撃方法講座
  - Root Store が同梱される話
  - 新しいウィンドウ分割機能が便利そう
- W3C/WHATWG
  - other
    - Jeff Jaffe step down as CEO
    - TAG election
    - AB election
    - W3C Inc.
    - :has() selectors list changed to unforgiving parsing
      - jQuery 3.6.2 and 3.6.3
- TC39
  - 262 Temporal の Purotype を 402 が拡張して良いのか問題
  - Modules Harmony という計画があるらしい
  - Record/Tuples の費用対効果が合わないと白紙に戻りそう
- IETF
  - IETF116 横浜の予習
  - mikewest/baseline-header
- CDN 動向
  - Cloudflare の State of HTTP in 2022
  - Cloudflare の教育機関への攻撃が増えている話
  - Akamai Japan の HTTP header 内の RFC 違反文字扱いについて
  - Akamai の Alexa 代替 AkaRank
  - Akamai の CWV 改善シリーズ
- セキュリティ動向
  - LastPass / Slack / Circle CI / Twitter / Paypal 内で相次いでインシデント
  - Emily の dead line of death の話
- 周辺動向
  - Abema の Worldcup の構成
  - mnot が Law School を卒業
  - Igalia が MathML を Chromium に実装した話
  - デジタル庁 a11y ガイドブック
  - skeb_jp の heroku 障害? と対応
  - Meta に GDPR 違反で 547 億円罰金
  - Meta が取り組むグローバルネットワーク最適化の話
