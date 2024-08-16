---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep94.mp3
published_at: 2022-02-20
guest: [@myakura](https://twitter.com/myakura)
---

# ep94 Monthly Web 202202

## Theme

第 94 回のテーマは 2022 年 2 月の Monthly Web です。

## Show Note

### Chrome 動向

#### Stable: 98

#### Updates

- **Chromium Blog: Chrome 99: CSS Cascade Layers, a New Picker for Input Elements, and More**
  - https://blog.chromium.org/2022/02/chrome-99-css-cascade-layers-new-picker.html
  - Preparing for Chrome 100
  - CSS Cascade Layers
  - New `showPicker()` Method on HTMLInputElement Objects
  - Origin Trials
    - New Origin Trials
      - Dark Mode Support for Web Apps
    - Completed Origin Trials
      - Handwriting Recognition API
      - Window Controls Overlay for Installed Desktop Web Apps
  - Other Features in this Release
    - Allow infinity, -infinity and NaN in CSS calc()
    - CSS Color Adjust: 'only' Keyword for color-scheme
    - document.adoptedStyleSheets is Now Mutable
    - Improve Alignment with Spec for Exposing nextHopProtocol Across Origin Boundaries
    - New Canvas 2D Features
    - Unprefixed text-emphasis Properties
  - Deprecations, and Removals
    - Remove Battery Status API on Insecure Origins
    - Remove font-family -webkit-standard
    - Remove GamepadList
    - Update WebCodecs to Match Spec
- **Deprecations and removals in Chrome 99 - Chrome Developers**
  - https://developer.chrome.com/en/blog/deps-rems-99/
  - Remove Battery Status API on insecure origins
  - Remove font-family -webkit-standard
  - Remove GamepadList
  - Update WebCodecs to match the specification
- **New in Chrome 98 - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-chrome-98/
  - Opting out of auto-dark themes on Android
  - COLRv1 font support
  - Emulate Chrome 100 in the UA string
- Google Developers Japan: Chrome 98 ベータ版: カラー グラデーション ベクター フォント、リージョン キャプチャのオリジン トライアルなど
  - https://developers-jp.googleblog.com/2022/01/chrome-98-beta.html
- **Chrome and Firefox soon to reach major version 100**
  - https://web.dev/chrome-firefox-100/
  - Chrome: 2022 年 3 月 29 日
    - backup に Major を 99 に固定する flag をリリース
  - Firefox 2022 年 5 月 3 日
    - backup に site intervention mechanism などが利用可能
  - 壊れるサイトの報告
    - https://github.com/webcompat/web-bugs/labels/version100

#### Intents

- Ship: Multi-Screen Window Placement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/i6Zoc7jU0dM/m/W5g_ze2WAgAJ
- **Ship: Autofill in ShadowDOM**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RY9leYMu5hI/m/hXkUj8J6AgAJ
  - これまで ShadowDOM 内の input は Autofill 対象外だった
- Ship: Omnibox Prerendering
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ogegRwcRlcs/m/abCQpUFpAQAJ
- **Ship: AbortSignal.prototype.throwIfAborted**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bpiezft1AIc/m/62I9XS5UAQAJ
  - signal が abort されたら reason を含む AbortError を Throw する
  - Safari も Mozilla も Ship 予定
- Ship: `hwb()` color notation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7SKzObJ9IBI/m/ytS_fS6jBgAJ
- Ship: HIDDevice `forget()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Fk-IJF63UWc/m/4yuIF66cBgAJ
- **Ship: Network State Partitioning**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tJa6uzXu_IA/m/IN6UhwKtAwAJ
- Ship: Digital Goods API v2.0
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2pjQ3O2GzDA/m/BqQ7UL6gAwAJ
- Ship: NDEFReader makeReadOnly()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DXGl7Z-i96I/m/Ga1KHsx_AQAJ
- Ship: Capability Delegation with Payment Request
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PHT_2X7oRBE/m/gR9UiZxBAQAJ
- Ship: Allow cookie domain attributes to be the empty string
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IYWGbLV-1hU/m/Uvh4XvBfAQAJ
- Prototype and Ship: SerialPort integration with WritableStream controller AbortSignal
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/R0av-FJ0hog/m/dYS7KhJMAQAJ
- **Prototype and Ship: User-Agent Reduction Phase 4 (minor version reduction)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dcTStiBZVoQ/m/KyomPLOnAwAJ
- **Prototype and Ship: Sec-CH-UA-WoW64 Client Hint**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/i5_4MveUsjs/m/KClXu8woAQAJ
- **Prototype + PSA: making Back/Forward Cache work despite Cache-control: no-store**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mcOiteClYSo/m/rElGuT2IAAAJ
- Prototype: Confirmation of Action API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JBpUXKsJ5qg/m/MRK2dbSHAgAJ
- **Prototype: `AbortSignal.timeout()` Static Method**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9Y290P1WimY/m/bru989iAAgAJ
- Implement: Fluent Scrollbars.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SomQdLx6aEk/m/uwK_pqZ4AgAJ
- Prototype: Digital Goods API v2.1
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JaNDPCUr1ws/m/JFt-E7ePAQAJ
- **Prototype: Document picture-in-picture**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jr2fQUh6xEI/m/Oqge6pPtAAAJ
- **Prototype: AbortSignal.prototype.throwIfAborted**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/I1pn9OIe8-A/m/C7lzzd7qAAAJ
- **Experiment: Cookies Having Independent Partitioned State (CHIPS)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_dJFNJpf91U/m/OXzFi_6wAwAJ
- Experiment: User-Agent Client Hints GREASE Update
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/G-ouYoNY9Hs/m/5dZQWvqRAQAJ
- Extend Origin Trial: MSE in Workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WETrrUYLrTM/m/BUSbStwoAwAJ
- **Ready for Trial: Federated Credentials Management API (was WebID)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jlV_1m7uUAg/m/fPC4mLjJAgAJ
- Continue Experimenting: Speculation Rules (Prefetch)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XlAW8MDdHbg/m/XBIJYgvgAAAJ
- Extend Experiment: Digital Goods API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Jr08CyLtDC4/m/LBMnKLRcAQAJ
- Change:
- Unship:
- Deprecate and Remove: Event.path
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UYY2TRSL8_k/m/rbgamivQBgAJ
- Deprecate and Remove: Support for filesystem URLs on Android media
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/N4jYcGmGyEA/m/6NNZakNCAQAJ
- Request for deprecation trial (I2E): Sending the full User-Agent string after User-Agent reduction
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-2OW78CB1-A/m/N0lz8F0qAQAJ

#### V8

- V8 release v9.9 · V8
  - https://v8.dev/blog/v8-release-99
  - Intl.Locale extensions
  - Intl Enumeration

#### Other

- web.dev
  - Improve security and privacy by updating HTTP Cache
    - https://web.dev/http-cache-security/
  - Drawing to canvas in Emscripten
    - https://web.dev/drawing-to-canvas-in-emscripten/
  - **New to the web platform in January**
    - https://web.dev/web-platform-01-2022/
  - Porting USB applications to the web. Part 2: gPhoto2
    - https://web.dev/porting-gphoto2-to-the-web/
  - WebAssembly feature detection
    - https://web.dev/webassembly-feature-detection/
- google developer blog
  - https://developers.googleblog.com/
- google developer japan blog
  - Google Developers Japan: 安全なオンライン エコシステムを作るための差分プライバシーへのアクセスの拡大について
    - https://developers-jp.googleblog.com/2022/02/differential-privacy.html
- chrome developer blog
  - The Chromium Chronicle #28: Getting started with Chrome on iOS - Chrome Developers
    - https://developer.chrome.com/en/blog/chromium-chronicle-28/
  - **Permissions request chip - Chrome Developers**
    - https://developer.chrome.com/en/blog/permissions-chip/
    - Allow: 6.69%
    - Block: 9.20%
    - Dismiss: 35.76%
    - Ignore: 47.19%
  - **Cascade layers are coming to your browser - Chrome Developers**
    - https://developer.chrome.com/en/blog/cascade-layers/
  - Show a browser picker for date, time, color, and files - Chrome Developers
    - https://developer.chrome.com/en/blog/show-picker/
  - **FLEDGE API developer guide - Chrome Developers**
    - https://developer.chrome.com/en/blog/fledge-api/
  - **Topics API - Chrome Developers**
    - https://developer.chrome.com/ja/docs/privacy-sandbox/topics/
- chromium blog
  - Project Zero: A walk through Project Zero metrics
    - https://googleprojectzero.blogspot.com/2022/02/a-walk-through-project-zero-metrics.html
- google japan blog
  - Google Japan Blog: プライバシー サンドボックスの新しい Topics API について
    - https://japan.googleblog.com/2022/01/topics-api.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- other
  - Introducing the Privacy Sandbox on Android
    - https://blog.google/products/android/introducing-privacy-sandbox-android/
  - Privacy Sandbox on Android
    - https://developer.android.com/design-for-safety/ads

### Firefox 動向

#### Stable: 97.0.1

#### Updates

- **Firefox 97.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/97.0/releasenotes/
  - Windows 11 のオーバーレイスクロールバーに対応
- **Firefox 97 for developers**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/97
  - CSS `cap` and `ic` unit
  - Cascade Layers
  - CSS `scroll-gutter` プロパティ
  - CSS `d` プロパティ
  - `AbortSignal.reason`
  - `AbortSignal.throwIfAborted()`
- **These Weeks in Firefox: Issue 109**
  - https://blog.nightly.mozilla.org/2022/02/10/these-weeks-in-firefox-issue-109/
    - Firefox 98 で新しい Performance パネルが有効に
    - 拡張の Event Page の実装スタート
- **These Weeks in Firefox: Issue 108**
  - https://blog.nightly.mozilla.org/2022/01/28/these-weeks-in-firefox-issue-108/
    - DevTools の Compatibility パネル

#### Intents

- **Ship: OffscreenCanvas on limited domains**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/kp9SZL-0wW0
  - 現状は WebGL のみを OffscreenCanvas でサポートしており、 Canvas2D はこれから
  - 部分的な実装を Nightly で有効にしてみたら壊れるサイトが出たのでバックアウト
  - WebGL だけでもいいので使いたいというパートナーが出てきた
  - Firefox 99 で Zoom にのみ有効にする
- (re-)Ship: Readable Streams
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/5JS0Kbs41-Q
- **Ship: Changing cache re-validation on a soft reload**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/PMla_a7HYKY
- Ship: CSS property `hyphenate-character`
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/jFUODfQPhTw
- Implement and Ship:
- Experiment:
- Change:
- Remove:

#### Other

- **Retrospective and Technical Details on the recent Firefox Outage**
  - https://hacks.mozilla.org/2022/02/retrospective-and-technical-details-on-the-recent-firefox-outage/
  - H3 に対応したところテレメトリ収集部分に `Content-Length` の大文字小文字の差が吸収できないバグがあり障害につながった
- Improving the Storage Access API in Firefox
  - https://hacks.mozilla.org/2022/02/improving-the-storage-access-api-in-firefox/
- Version 100 in Chrome and Firefox
  - https://hacks.mozilla.org/2022/02/version-100-in-chrome-and-firefox/
- **1751465 - [Experiment] Staged Rollout: Disable cookie sameSite=lax and sameSite noneRequiresSecure in Firefox 96 Fx 96.0 to 96.0 Release**
  - https://bugzilla.mozilla.org/show_bug.cgi?id=1751465
  - Schemeful SameSite に続き SameSite=Lax デフォルト化もバックアウト
- **Privacy Preserving Attribution for Advertising**
  - https://blog.mozilla.org/en/mozilla/privacy-preserving-attribution-for-advertising/

### Safari 動向

#### Stable: 15.3

- マイナーが奇数ならセキュリティリリース
- メジャーで機能追加
- Version History
  - https://en.wikipedia.org/wiki/Safari_version_history
  - 15.0: September 20, 2021
  - 15.1: October 25, 2021
  - 15.2: December 13, 2021
  - 15.3: January 26, 2022
  - 6~8 週くらいになった?

#### Updates

- **Safari 15.4 Beta Release Notes | Apple Developer Documentation**
  - https://developer.apple.com/documentation/safari-release-notes/safari-15_4-release-notes
    - CSS
      - Containment contain property
      - Cascade Layers
      - `accent-color`
      - `:has()`
      - `text-decoration-skip-ink`
      - small/large/dynamic viewport units (`svw`, `svh` etc.)
      - `:focus-visible`
      - `ic` unit
      - `calc()` math functions (`sin`, `cos`, `tan`, `log` etc.)
      - unprefix `appearance`, `mask`, `backface-visibility`, `text-combine-upright` etc.
    - HTML
      - `<dialog>`
      - `<img loading>`
    - Web API
      - BroadcastChannel
      - ServiceWorker Navigation Preload
      - `scroll-behavior` and `ScrollOptions`
      - Web Locks
      - removed XSS Auditor
    - JavaScript
      - `Object.hasOwn()`
      - `self.structuredClone()`
      - `Array.prototype.findLast()` and `Array.prototype.findLastIndex()`
      - `at()`
      - Intl enhancements
    - Security
      - CSP3 improvements
- **Release Notes for Safari Technology Preview 139 | WebKit**
  - https://webkit.org/blog/12193/release-notes-for-safari-technology-preview-139/
  - Web Inspector
  - CSS
  - :has()
    - Added style invalidation for :disabled, :enabled, :valid, and :invalid (r287445, r287551)
  - Web Animations
    - Added support for the animation shorthand property in the computed style (r287535)
  - Rendering
    - Changed to pre-layout orthogonal children to compute the preferred logical width inside a flexbox (r287263)
  - SVG
  - WebAuthn
  - Web API
    - Added support for using a user-specified preference before using the system's preferred color scheme (r287030)
  - JavaScript
    - Aligned Array.prototype.toLocaleString to ECMA402 definition (r287560)
  - Content Security Policy
    - Changed to always use UTF-8 encoded content when checking hashes (r287270)
    - Implemented CSP strict-dynamic for module scripts (r287756)
  - Media
    - Added MediaRecorder support for the bitsPerSecond option (r287613)
  - Service Workers
    - Added full support for Service Worker interception of fetch requests with FormData body (r287612)
  - Web Extensions
    - Added support for the redirect rule type in declarativeNetRequest, which requires host permissions to be granted for the host of the URL being redirected
    - Added support for declarativeNetRequest.getMatchedRules, which requires host permissions to be granted to view the URLs of blocked resources
- **Release Notes for Safari Technology Preview 140 | WebKit**
  - https://webkit.org/blog/12255/release-notes-for-safari-technology-preview-140/
  - Web Inspector
  - :has() Pseudo-Class
    - **Added support for :has(:not(foo)) (r288303)**
    - Avoided complex style invalidation with repeated DOM mutations (r288012, r287973)
  - CSS
    - Added support for intrinsic sizes in flex-basis (r288113)
    - Added support for intrinsic sizes to the flex shorthand (r288184)
    - Added support for "missing"/"none" color components (r288143)
    - Added support for interpolating colors with "missing"/"none" components via color-mix() (r288427)
    - Added support for preloading of layered @import rules (r288099)
  - Web API
    - Added support for FetchEvent.handled API for Service Workers (r287915)
    - **Enabled form.requestSubmit() (r288179)**
  - Web Animations
    - Added support for animation-composition CSS property (r288433)
  - JavaScript
  - WebAssembly
  - Dialog Element
    - Added visibility: visible to modal dialogs in the user-agent stylesheet (r288233)
  - HTML
  - Media
  - WebAuthn
    - Allowed single use of WebAuthn without user gesture for all relying parties (r287957)
  - Accessibility
    - **Exposed toggle buttons using role="button" as form controls (r288100)**
    - Improved support for aria-owns in ARIA trees (r288117)
  - Content Security Policy
    - Improved handling of multiple policies (r288132)
  - Privacy
    - Fixed an issue where a website may be able to track sensitive user information (r288078)
  - SVG
  - Scrolling
  - Web Extensions
- **The File System Access API with Origin Private File System | WebKit**
  - https://webkit.org/blog/12257/the-file-system-access-api-with-origin-private-file-system/
- **Introducing the Dialog Element | WebKit**
  - https://webkit.org/blog/12209/introducing-the-dialog-element/
- **The Focus-Indicated Pseudo-class :focus-visible | WebKit**
  - https://webkit.org/blog/12179/the-focus-indicated-pseudo-class-focus-visible/

#### Position

- 特になし

#### Other

- **No, Apple Did Not Crowdfund :focus-visible in Safari - Eric's Archived Thoughts**
  - https://meyerweb.com/eric/thoughts/2022/01/24/no-apple-did-not-crowdfund-focus-visible-in-safari/
  - Safari TP で `:focus-visible` が有効になったことを Apple の人がツイート
  - Igalia の貢献とクラウドファンディングについて言及したところ、 Apple が自分で実装せずにクラウドファンディングに頼ったと見られちょっと炎上
  - Igalia の Eric Meyer が、 Apple が Igalia に実装を頼んだわけではないこと、 Open Prioritization プロジェクトの目的について改めて説明

### Edge 動向

#### Stable: 98

#### Updates

- **Introducing Enhanced Security for Microsoft Edge | Microsoft Browser Vulnerability Research**
  - https://microsoftedge.github.io/edgevr/posts/Introducing-Enhanced-Security-for-Microsoft-Edge/
- Memory tooling improvements in DevTools for Retainers - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2022/02/16/memory-tooling-improvements-retainers/
- Unminifying function names in DevTools performance profiles - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2022/02/03/unminifying-function-names-in-devtools-performance-profiles/
- **Test IE mode in Microsoft Edge with Internet Explorer Driver - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2022/02/01/test-ie-mode-in-microsoft-edge-internet-explorer-driver/

#### Chakra

#### Other

- Smarter Defaults by Paying Attention - text/plain
  - https://textslashplain.com/2022/02/15/smarter-defaults-by-paying-attention/
- MHTML in Chromium - text/plain
  - https://textslashplain.com/2022/02/09/mhtml-in-chromium/
- Adding Protocol Schemes to Chromium - text/plain
  - https://textslashplain.com/2022/01/21/adding-protocol-schemes-to-chromium/
- Microsoft Edge Add-ons: NEW features to improve extension discoverability - Microsoft Tech Community
  - https://techcommunity.microsoft.com/t5/articles/microsoft-edge-add-ons-new-features-to-improve-extension/m-p/3109094#M6391

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
  - CSS Conditional Rules Module Level 4
    - https://www.w3.org/TR/2022/CR-css-conditional-4-20220217/
  - CSS Color Adjustment Module Level 1
    - https://www.w3.org/TR/2022/CR-css-color-adjust-1-20220210/
- Working Draft
- First Public Working Draft
  - First Public Working Draft: MediaStreamTrack Insertable Media Processing using Streams | W3C News
    - https://www.w3.org/blog/news/archives/9411
  - First Public Working Draft: Incremental Font Transfer via Range Request | W3C News
    - https://www.w3.org/blog/news/archives/9398
- Chartering
  - Call for Participation: Accessible Rich Internet Applications Working Group; Join ARIA WG
    - https://lists.w3.org/Archives/Public/public-new-work/2022Feb/0004.html
  - W3C invites implementations of CSS Color Adjustment Module Level 1 | W3C News
    - https://www.w3.org/blog/news/archives/9409

#### Other

### TC39 動向

#### Meeting

- 2021-01
  - https://github.com/tc39/agendas
  - notes
    - https://github.com/tc39/notes/blob/main/meetings/2022-01/jan-24.md
    - https://github.com/tc39/notes/blob/main/meetings/2022-01/jan-25.md
    - https://github.com/tc39/notes/blob/main/meetings/2022-01/jan-26.md
- 2022-03
  - agenda
    - https://github.com/tc39/agendas/blob/main/2022/03.md

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2022-01-20}...main@{2022-03-01}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->3
- 3->4

#### New Proposals

#### Other

### IETF 動向

#### WG

- IETF
  - https://datatracker.ietf.org/meeting/
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - **Interim Minutes**
    - https://github.com/httpwg/wg-materials/blob/gh-pages/interim-22-02/minutes.md
    - The Geohash HTTP Client Hint
      - https://httpwg.org/wg-materials/interim-22-02/geohash.pdf
    - Retrofit Structured Fields for HTTP
      - https://mnot.github.io/I-D/draft-nottingham-http-structure-retrofit.html
  - draft-ietf-httpbis-client-cert-field-01 - Client-Cert HTTP Header Field
    - https://datatracker.ietf.org/doc/draft-ietf-httpbis-client-cert-field/
  - Working Group Last Call for draft-ietf-httpbis-binary-message-01
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JanMar/0118.html
  - DRAFT minutes from this week's interim from Mark Nottingham
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JanMar/0117.html
  - Protocol Action: 'Targeted HTTP Cache Control' to Proposed Standard
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JanMar/0097.html
- quicwg
  - https://mailarchive.ietf.org/arch/browse/quic/
  - https://github.com/quicwg/wg-materials
  - draft-ietf-quic-multipath-00 - Multipath Extension for QUIC
    - https://datatracker.ietf.org/doc/draft-ietf-quic-multipath/
  - draft-ietf-avtcore-rfc7983bis-02 - Multiplexing Scheme Updates for QUIC
    - https://datatracker.ietf.org/doc/draft-ietf-avtcore-rfc7983bis/
  - draft-dawkins-avtcore-sdp-rtp-quic-00 - SDP Offer/Answer for RTP using QUIC as Transport
    - https://datatracker.ietf.org/doc/draft-dawkins-avtcore-sdp-rtp-quic/
  - draft-shi-quic-dtp-05 - Deadline-aware Transport Protocol
    - https://datatracker.ietf.org/doc/draft-shi-quic-dtp/
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
- Other
  - draft-thomson-httpapi-date-requests-00 - Using The Date Header Field In HTTP Requests
    - https://datatracker.ietf.org/doc/draft-thomson-httpapi-date-requests/
  - draft-pauly-privacypass-auth-scheme-00 - The Privacy Pass HTTP Authentication Scheme
    - https://datatracker.ietf.org/doc/draft-pauly-privacypass-auth-scheme/

#### Other

- **AUTH48 status page for C430 > RFC Editor**
  - https://www.rfc-editor.org/auth48/C430
    - HTTP/3 と QPACK に割り当てられていた RFC 番号が変更
      - HTTP3: 9113 -> 9114
      - QPACK: 9114 -> 9204
    - bcp56bis に RFC 9205 が割当てられた
    - 9110 draft-ietf-httpbis-semantics-19.txt
    - 9111 draft-ietf-httpbis-cache-19.txt
    - 9112 draft-ietf-httpbis-messaging-19.txt
    - 9114 draft-ietf-quic-http-34.txt
    - 9163 draft-ietf-httpbis-expect-ct-08.txt
    - 9180 draft-irtf-cfrg-hpke-12.txt
    - 9193 draft-ietf-core-senml-data-ct-07.txt
    - 9204 draft-ietf-quic-qpack-21.txt
    - 9205 draft-ietf-httpbis-bcp56bis-15.txt
- AUTH48 for HTTP/3 and QPACK from Mike Bishop
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JanMar/0146.html

### CDN 動向

#### Cloudflare

- Announcing the public launch of Cloudflare's bug bounty program
  - https://blog.cloudflare.com/cloudflare-bug-bounty-program/

#### Fastly

#### Other

### セキュリティ動向

### 周辺動向

- **Welcome to Wolvic**
  - https://wolvic.com/
  - Igalia が Mozilla Reality を fork したブラウザ実装
  - WebXR にフォーカスしている
- Enter: Wolvic
  - https://bkardell.com/blog/wolvic.html
- Amazon Prime Video が動画再生に WebAssembly を採用。再生デバイス上に Wasm VM をデプロイ、高フレームレートなど実現 - Publickey
  - https://www.publickey1.jp/blog/22/amazon_prime_videowebassemblywasm_vm.html
- Minimum Standards for iOS Browser Competition - Infrequently Noted
  - https://infrequently.org/2022/02/minimum-standards/
- A Week to Define the Web for Decades - Infrequently Noted
  - https://infrequently.org/2022/01/carpe-diem/
- **Server-Sent Events, WebSockets, and HTTP**
  - https://www.mnot.net/blog/2022/02/20/websockets
- **ヤフーの IE11 サポート終了の進め方 - Yahoo! JAPAN Tech Blog**
  - https://techblog.yahoo.co.jp/entry/2022021630265506/

### イベント

- 2 月
  - 1-3: httpwg interim
    - https://github.com/httpwg/wg-materials/blob/gh-pages/interim-22-02/agenda.md
- 3 月
  - 28-31: 89th meeting of Ecma TC39
    - https://github.com/tc39/agendas/blob/main/2022/03.md
  - 19-25: IETF | IETF 113 Vienna
    - https://www.ietf.org/how/meetings/113/
- 4 月
- 5 月
  - 17-18 BlinkOn 16
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/tvOHmMflQy4/m/c5NXpLFoAgAJ

### Wrap Up

- Chrome
  - 98
    - COLRv1
  - 99
    - Cascade Layers
    - `input.showPicker()`
    - Window Controls Overlay
  - Ship
    - Autofill in ShadowDOM
    - `AbortSignal.throwIfAborted()`
    - Network State Partitioning
    - UA reduction phase 4 (MAJOR.0.0.0)
    - Sec-CH-UA-WoW64
  - Prototype
    - bfcache on Cache-Control: no-store
    - `AbortSignal.timeout()`
    - Document Picture-in-Picture
  - Ready for Trial
    - FedCM
  - Other
    - Version 100 on March 29
- Firefox
  - 97
    - CSS `cap`/`ic` unit
    - Cascade Layers
    - `scroll-gutter`
    - CSS `d`
    - `AbortSignal.throwIfAborted()`
  - Ship
    - OffScreenCanvas (WebGL only) for Zoom
    - Soft reload cache revalidation
  - Other
    - SameSite=Lax デフォルト化のバックアウト
    - Privacy Preserving Attributes for Advertising
- Safari
  - 15.4 Beta
    - CSS
      - Containment `contain` property
      - Cascade Layers
      - `:has()`
      - new viewport units
      - `:focus-visible`
      - CSS `sin()`/`cos()`/`tan()` etc.
      - unprefix
    - HTML
      - `<dialog>`
      - `<img loading>`
    - Web API
      - BroadCastChannel
      - Navigation Preload
      - Web Locks
    - JavaScript
      - `Object.hasOwn()`
      - `self.structuredClone()`
      - `Array.findLast()`/`Array.findLastIndex()`
      - `at()`
    - Security
      - CSP3
  - TP 139
  - TP 140
    - `:has(:not(foo))`
    - `form.requestSubtmit()`
  - Origin Private File System
  - Intro Dialog Element
  - Other
    - `:focus-visible` のための Igalia のクラファンが Apple によるものという勘違い炎上
- Edge
  - 88 から Guard 系のセキュリティ強化
  - IE を Selenium でテストする方法
- WHATWG/W3C
- TC39
- IETF
  - HTTPWG interim
    - Retrofit Structured Fields for HTTP
    - The Geohash HTTP Client Hint
  - Auth48 で番号が変わった
    - HTTP3: 9113 -> 9114
    - QPACK: 9114 -> 9204
- CDN 動向
- セキュリティ動向
- 周辺動向
  - Igalia が Firefox Reality を Fork した Wolvic ブラウザ
