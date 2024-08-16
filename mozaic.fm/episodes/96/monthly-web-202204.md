---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep96.mp3
published_at: 2022-05-01
guest: [@myakura](https://twitter.com/myakura)
---

# ep96 Monthly Web 202204

## Theme

第 96 回のテーマは 2022 年 4 月の Monthly Web です。

## Show Note

### Chrome 動向

#### Stable: 101

#### Updates

- **New in Chrome 100**
  - https://developer.chrome.com/en/blog/new-in-chrome-100/
  - 100 Cool Web Moments
  - Reduced User-Agent string
  - Multi-screen window placement API
- Celebrate Chrome 100 with #100CoolWebMoments
  - https://developer.chrome.com/en/blog/100-web-moments/
- **Chromium Blog: Chrome 101: Federated Credential Management Origin Trial, Media Capabilities for WebRTC, and More**
  - https://blog.chromium.org/2022/03/chrome-101-federated-credential.html
  - Reduce User Agent String Information
  - Origin Trials
    - New Origin Trial
      - Federated Credential Management API
    - Completed Origin Trials
      - Priority Hints
  - Other Features in this Release
    - AudioContext.outputLatency
    - font-palette and Custom `@font-palette-values` Palettes
    - `hwb()` CSS function
    - Make Popup Argument for `window.open()` Evaluate to 'true'
    - MediaCapabilities API for WebRTC
    - Secure Payment Confirmation API V3
    - USBDevice `forget()`
    - WebUSB sameObject Behavior
  - Deprecations, and Removals
    - Remove WebSQL in Third-Party Contexts
- **What's New In DevTools (Chrome 101)**
  - https://developer.chrome.com/en/blog/new-in-devtools-101/
  - Import and export recorded user flows as a JSON file
  - View cascade layers in the Styles pane
  - Support for the `hwb()` color function
  - Improved the display of private properties
  - Miscellaneous highlights
  - [Experimental] New timespan and snapshot mode in the Lighthouse panel
- **Deprecations and removals in Chrome 101**
  - https://developer.chrome.com/en/blog/deps-rems-101/
  - Reduce user agent string information
  - Remove WebSQL in third-party contexts
- **Chromium Blog: Chrome 102: Window Controls Overlay, a Host of Finished Origin Trials, PWAs as File Handlers and More**
  - https://blog.chromium.org/2022/04/chrome-102-window-controls-overlay-host.html
  - Window Controls Overlay for Installed Desktop Web Apps
  - Completed Origin Trials
    - Capture Handle
    - Network State Partitioning
    - Speculation Rules
    - Subresource loading with Web Bundles
  - Other Features in this Release
    - File Handlers Web App Manifest Member
    - inert Attribute
    - Local Font Access
    - Navigation API
    - New until-found Value for the hidden Attribute
    - Origin Private File System extension: AccessHandle
    - Private Network Access Preflight Requests for Subresources
    - Secure Payment Confirmation API Changes
    - WebHID exclusionFilters Option in requestDevice()
  - Deprecations, and Removals
    - Deprecate PaymentRequest.show() without User Activation
    - Remove SDP Plan B

#### Intents

- Ship: Digital Goods API 2.1
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2lJD-MYZWBs/m/M5WaWqNLEwAJ
- **Ship: Media Queries Level 4 Syntax & Evaluation**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/E4Vd7w70OsU/m/Q43yNphBEwAJ
  - Lv3 まで `@media (min-width: 300px) and (max-width: 750px)`
  - Lv4 では `@media (300px <= width <= 750px) {`
- Ship: SerialPort `forget()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aBSGxh0LJVA/m/_pOq-q04EwAJ
- Ship: Local Fonts Access API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xTUSN930_gM/m/ED3pHltrEgAJ
- Ship: Cookie Expires/Max-Age attribute upper limit
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tZ52DF6uoBU/m/eL9UpEPIEQAJ
- **Ship: Speculation Rules (Prefetch)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3Ga0Y2BEz7E/m/3U5zwXjWGwAJ
  - Prefetch 限定での Speculation Rules のリリース
  - prerendering のトライアルをしている publisher のために gapless launch したいらしい
- **Ship: Same-origin prerendering triggered by the speculation rules API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EdW7O8yG7Jc
  - Speculation Rule で書かれた Same Origin での Prerendering のみ ship
- **Ship: Subresource Loading with Web Bundles**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VS9UgOC7Wqc/m/P0vG6qfEEwAJ
  - v1 ~ v3 に分割リリースの予定。今回は v1 でコアの機能のみをリリースする。
  - v2 はキャッシュ対応, bundle preload, bundle dependencies など
- **Ship: Navigation API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5iuGWgO8aMo/m/A9vvTY61AQAJ
  - History API を改善したもの
  - [blog](https://blog.jxck.io/entries/2022-04-22/navigation-api.html)
- **Ship: Early Hints preload/preconnect during Navigation**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8iIvkmZNUhU
  - Navigation 中の 103 による preload/preconnect をサポート
  - CDN 向けだった機能がブラウザでも動くように
- Ship: Restrict Gamepad usage
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/B1QUuICApvc
- Ship: Allow popstate to fire before load
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HXRHWirKarU
- Ship: File Handling
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Wxuo4lZi4vM
- Ship: ARIA Attribute Reflection for role attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cCB8F0ut6cU
- Ship: `AbortSignal.timeout()` Static Method
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pfiJqsImPtQ
- **Prototype and Ship: RFC 9225**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qRzX_B5OByA/m/XE6B4s1OEAAJ
  - Joke RFC : Software Defects Considered Harmful の intents
- Prototype and Ship: Permissions Policy for Web Bluetooth API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5GnbyWBm04c
- Implement and Ship: Fullscreen Capability Delegation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7YkubntWi3Y
- Prototype: WebAuthn remote desktop support
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3EFGXppjkWo/m/3o-pDPDeEQAJ
- Prototype: Add .avif to permitted Web Share file extensions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zQqZIzZv-a8/m/A2kMhCXMEQAJ
- Prototype: IndexedDB: batchGetAll()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4_P-do5nY_c
- **Prototype: CSS toggles**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/06dTetmFjEU/m/NdkJtoVYHAAJ
  - CSS に toggle 可能な state を持たせる
  - これをクエリできるようにし、状態でクエリしたり、状態に紐づいたスタイルを定義可能に
- Prototype: "deflate-raw" compression format
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-Qghy4VUznA
- **Prototype: Isolated Web Apps**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9r7YaFuASec
  - メッセージングアプリでは、サーバが侵害され悪意のあるコードが提供される脅威がある
  - バージョン管理され、署名されたパッケージをストアで配布したい
  - そこで Signal や WhatsApp は Chrome Apps が無くなり、ダウンロードする Electron に移行
  - このケースを WebBundle + CSP などを用いて Web で実現するのが IWA
- **Prototype: Element.isVisible method**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IH33LShRgt0
  - あらゆる要因を考慮して visible かを返す API
- Experiment: Viewport-height client hint
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kftmeKVDjE8/m/GlaCr5PYEQAJ
- Experiment: Network State Partitioning (again)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WQtp7Ixd1RU/m/kpwD3E00EQAJ
- Experiment: Remove clamping of `setTimeout(..., 0)`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7xXO407jFPA/m/S-p7NlUUEAAJ
- Experiment: Increased max nesting level for `setTimeout(0)`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iT0CpRXs4TE/m/kGHTXVqwAAAJ
- Experiment: Load common payloads from privacy-preserving single-keyed cache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9xWJK3IgJb4
- Experiment: Deprecate and remove merchant identity in "canmakepayment"
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AM2bwKxXacQ
- Extend Experiment (2nd): Same-origin prerendering triggered by the speculation rules API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Kpp6uJJRrqI/m/GTo_aF0qEQAJ
- Extend Experiment: User-Agent Reduction
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6x6WH2Odzfo
- Extend Origin Trial: Trial for SharedArrayBuffers in non-isolated pages on Desktop platforms
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OLbI-axDyH0
- Continue Experimenting: Digital Goods API v2 (M100, Android)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DqnurOUBA9s/m/5H18GilKEQAJ
- **Ready for Trial: Focusgroup**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ssexbn7P0lU
- Change:
- Unship:
- Remove:
- Deprecate and Remove: Deprecate `<param>` element's functionality
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dDu4CgAwRwQ/m/--LdmX3vEwAJ
- PSA
  - FYI Privacy Sandbox Ads APIs origin trial
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/Vi-Rj37aZLs/m/wzeBWfxxEgAJ
  - **some tweaks to the Intent process**
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/zXspYC0DFco

#### V8

- Faster initialization of instances with new class features · V8
  - https://v8.dev/blog/faster-class-features

#### Other

- web.dev
  - New to the web platform in March
    - https://web.dev/web-platform-03-2022/
  - Deep dive into top web developer pain points
    - https://web.dev/deep-dive-into-developer-pain-points/
  - Make your site picture perfect with images.tooling.report
    - https://web.dev/images-tooling-report/
  - A modern web experience on Adobe Experience Manager with WorkBox
    - https://web.dev/aem-with-workbox/
- google developer blog
  - https://developers.googleblog.com/
- google developer japan blog
  - Google Developers Japan: Google ログイン JavaScript プラットフォーム ライブラリにおける認可サポートの終了について
    - https://developers-jp.googleblog.com/2022/04/gis-jsweb-authz-migration.html
  - Google Developers Japan: Chrome の新しいスピード マイルストーン
    - https://developers-jp.googleblog.com/2022/04/new-speed-milestone-chrome.html
  - Google Developers Japan: Chrome 101: Federated Credential Management のオリジン トライアル、 WebRTC の MediaCapabilities など
    - https://developers-jp.googleblog.com/2022/04/chrome-101-federated-credential.html
  - Google Developers Japan: プライバシー サンドボックスのテストで期待されること
    - https://developers-jp.googleblog.com/2022/04/privacy-sandbox.html
  - Google Developers Japan: Chrome の 100 個のバージョンを経て: その過程で学んだこと
    - https://developers-jp.googleblog.com/2022/04/100-versions-chrome-later.html
  - Google Developers Japan: Chrome が Speedometer で史上最高スコアを獲得したブラウザになれた理由
    - https://developers-jp.googleblog.com/2022/04/chrome-speedometer.html
- chrome developer blog
  - Testing the Privacy Sandbox ads relevance and measurement APIs
    - https://developer.chrome.com/en/blog/privacy-sandbox-unified-origin-trial/
  - **Making collapsed content accessible with hidden=until-found**
    - https://developer.chrome.com/en/blog/hidden-until-found/
  - **Introducing inert**
    - https://developer.chrome.com/en/blog/inert/
  - Participate in a Federated Credential Management API origin trial for IdPs
    - https://developer.chrome.com/en/blog/fedcm-origin-trial/
  - **Project Fugu API showcase**
    - https://developer.chrome.com/en/blog/fugu-showcase/
  - Optimizing LCP using Signed Exchanges
    - https://developer.chrome.com/en/blog/optimizing-lcp-using-signed-exchanges/
  - **RenderingNG deep-dive: BlinkNG**
    - https://developer.chrome.com/en/blog/blinkng/
  - Join Privacy Sandbox developer office hours #1: learn about Chrome Origin Trials
    - https://developer.chrome.com/en/blog/privacy-sandbox-office-hours-1/
  - Securely embed content on your site
    - https://developer.chrome.com/en/blog/embed-content/
  - Introducing Chrome Dev Insider
    - https://developer.chrome.com/en/blog/insider-april-2022/
- chromium blog
  - Chromium Blog: What to Expect from Privacy Sandbox Testing
    - https://blog.chromium.org/2022/03/what-to-expect-from-ps-testing.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel

### Firefox 動向

#### Stable: 99.0.1

#### Updates

- Firefox 99.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/99.0/releasenotes/
- Firefox 99 for developers - Mozilla | MDN
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/99
    - navigator.pdfViewerEnabled
    - RTCPeerConnection.setConfiguration()
- **MDN Plus now available in more countries - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2022/04/mdn-plus-now-available-in-more-markets/
  - 日本はまだ
- Adopting users' design feedback - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2022/04/adopting-users-design-feedback/
- Performance Tool in Firefox DevTools Reloaded - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2022/03/performance-tool-in-firefox-devtools-reloaded/
- Mozilla partners with the Center for Humane Technology - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2022/04/mozilla-partners-with-the-center-for-humane-technology/
- Common Voice dataset tops 20,000 hours - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2022/04/common-voice-dataset-tops-20000-hours/

#### Intents

- **Ship: small/large/dynamic/logical viewport units**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/dBTGmEfg8_8
- **Ship: prefers-contrast**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/dtdrmhIjjfM
- Prototype: TransformStreams and ReadableStream.pipeThrough
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/fXJYs75ijoQ
- Prototype: LargestContentfulPaint API
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/aL0gvvDxhwI
- **Prototype: Import maps**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/tiReRwpIT30
- Prototype and ship: Block external protocols in sandboxed iframes
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/41BviX-s6T4
- Prototype and ship: wasm-unsafe-eval Content-Security-Policy directive
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/XzIMEc9_KAY
- **Prototype and ship: HTMLInputElement `showPicker()`**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/bqYnYxOQhww
- Implement: RTCRtpSendParameters.transactionId
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/q3BVRRN1wbQ
- Unship: mozPreservesPitch
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/rUVd4sPQ5Tc
- Experiment:
- Change:
- Remove:

#### Other

- **Internet spring cleaning: How to delete Instagram, Facebook and other accounts**
  - https://blog.mozilla.org/en/internet-culture/how-to-delete-instagram-facebook-online-accounts/
  - 春だしいらないアカウントは削除しようシリーズ
- How to delete your Spotify account
  - https://blog.mozilla.org/en/internet-culture/how-to-delete-spotify/
- How to delete your Facebook account
  - https://blog.mozilla.org/en/internet-culture/how-to-delete-facebook/
- How to delete your Instagram account
  - https://blog.mozilla.org/en/internet-culture/how-to-delete-instagram/
- How to delete your Snapchat account
  - https://blog.mozilla.org/en/internet-culture/how-to-delete-snapchat/
- How to delete your Twitter account
  - https://blog.mozilla.org/en/internet-culture/how-to-delete-twitter/
- How to delete your Google account
  - https://blog.mozilla.org/en/internet-culture/how-to-delete-google/
- How to delete your Amazon account
  - https://blog.mozilla.org/en/internet-culture/how-to-delete-amazon/
- How to delete your Venmo account
  - https://blog.mozilla.org/en/internet-culture/how-to-delete-your-venmo-account/
- How to delete your TikTok account
  - https://blog.mozilla.org/en/internet-culture/how-to-delete-tiktok/
- How to delete your Spotify account
  - https://blog.mozilla.org/internet-culture/how-to-delete-spotify/
- These Weeks In Firefox: Issue 113 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/04/11/these-weeks-in-firefox-issue-113/
- These Weeks In Firefox: Issue 114 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/04/26/these-weeks-in-firefox-issue-114/
- **[Article] 0. Firefox UI UX history · black7375/Firefox-UI-Fix Wiki**
  - https://github.com/black7375/Firefox-UI-Fix/wiki/%5BArticle%5D-0.-Firefox-UI-UX-history
- **Platform/2022PlannedWork - MozillaWiki**
  - https://wiki.mozilla.org/Platform/2022PlannedWork

### Safari 動向

#### Stable: 15.4

#### Updates

- **Release Notes for Safari Technology Preview 143**
  - https://webkit.org/blog/12563/release-notes-for-safari-technology-preview-143/
  - Web Inspector
  - **CSS Container Queries**
    - Added support for nested container queries (r290257)
    - Added basic support for container units (r291474)
  - CSS Cascade Layers
    - Added support for revert in @keyframes (r290457)
    - Added support for revert-layer in @keyframes (r290729)
  - **Subgrid**
  - CSS
    - Implemented text-decoration as a shorthand (r290756, r291244)
    - Implemented logical properties for CSS overscroll-behavior (r290422)
  - JavaScript
    - **Added CalendarDateTime parsing (r290248)**
  - Rendering
  - Web Animations
    - Added support for passing an optional timeline to Element.animate() (r290655)
    - Added support for discrete animation to:
      - background-blend-mode (r291041)
      - clip-rule (r291042)
      - color-interpolation (r291008)
      - color-interpolation-filters (r291043)
      - counter-increment (r291090)
      - counter-reset (r291099)
      - dominant-baseline (r291068)
      - fill-rule (r291100)
      - font-family (r291040)
      - font-feature-settings (r291039)
      - font-kerning (r291037)
      - font-synthesis (r291103)
      - font-variant-alternates (r291104)
      - font-variant-caps (r291119)
      - font-variant-east-asian (r291109)
      - font-variant-ligatures (r291114)
      - font-variant-numeric (r291147)
      - font-variant-position (r291115)
      - grid-template-areas (r291122)
      - line-break (r290885)
      - marker-end (r291226)
      - marker-mid (r291227)
      - marker-start (r291228)
      - mask-clip (r291130)
      - mask-composite (r291159)
      - mask-mode (r291160)
      - mask-origin (r291148)
      - mask-repeat (r291161)
      - mask-type (r291158)
      - quotes (r291128)
      - scroll-behavior (r291129)
      - shape-rendering (r291171)
      - stroke-linecap (r291163)
      - stroke-linejoin (r291164)
      - text-anchor (r291166)
      - text-decoration-skip-ink (r290886)
      - text-emphasis-style (r290888)
      - text-rendering (r291157)
      - vector-effect (r291170)
  - SVG
  - Scrolling
    - Allowed history swipe in scroller with overscroll-behavior (r291497)
  - WebAuthn
    - Added support for authenticatorSelection.residentKey (r291176)
    - Added fallback to attestation=none if requested but unavailable for platform authenticator (r290539)
    - Enabled using WebAuthn within cross-origin iframe elements (r291018)
    - Improved virtual authenticator support ( r291423 , r291321)
  - WebGL
  - HTML
    - **Enabled the inert attribute by default (r290587)**
  - Web API
    - **Enabled the Permissions API by default (r291116, r290301)**
    - **Removed the 1ms minimum for setTimeout (r291476)**
  - Media
    - Implemented remote-inbound-rtp packetsLost (r290865)
  - Accessibility
  - File System Access
  - Web Extensions
- **Safari 15.5 Beta Release Notes | Apple Developer Documentation**
  - https://developer.apple.com/documentation/safari-release-notes/safari-15_5-release-notes
    - inert

#### Position

- **[webkit-dev] ChangeLog Deprecation Plans**
  - https://lists.webkit.org/pipermail/webkit-dev/2022-April/032189.html
  - svn から git に移行するにあたり毎回 conflict する CHANGELOG をやめたいという議論
- [webkit-dev] WebKit and GitHub Update
  - https://lists.webkit.org/pipermail/webkit-dev/2022-April/032180.html
  - GitHub にミラーがあるが、単なるミラーではなく正式に運用していく作業中
- [webkit-dev] Position on new syntax in mediaqueries-4
  - https://lists.webkit.org/pipermail/webkit-dev/2022-April/032179.html
  - supportive
- [webkit-dev] Request for position: Local Font Access
  - https://lists.webkit.org/pipermail/webkit-dev/2022-April/032176.html
- [webkit-dev] Request for position: Topics API
  - https://lists.webkit.org/pipermail/webkit-dev/2022-April/032175.html
  - negative

#### Other

- Private Click Measurement: Conversion Fraud Prevention and Replacement For Tracking Pixels
  - https://webkit.org/blog/12566/private-click-measurement-conversion-fraud-prevention-and-replacement-for-tracking-pixels/
- **Non-interactive Elements with the inert attribute**
  - https://webkit.org/blog/12578/non-interactive-elements-with-the-inert-attribute/

### Edge 動向

#### Stable: 101

#### Updates

- 30 days of PWA: Fall in love with Progressive Web Apps
  - https://blogs.windows.com/msedgedev/2022/04/14/30-days-of-pwa-fall-in-love-with-progressive-web-apps/
- Retrieve source maps securely in production in Microsoft Edge DevTools
  - https://blogs.windows.com/msedgedev/2022/04/12/retrieve-source-maps-securely-in-production-in-microsoft-edge-devtools/
- Sleeping tabs in Microsoft Edge: Save even more resources with recent updates
  - https://blogs.windows.com/msedgedev/2022/04/07/sleeping-tabs-edge-100-improvements/

#### Chakra

#### Other

- Chromium's DNS Cache - text/plain
  - https://textslashplain.com/2022/03/31/chromiums-dns-cache/
- The "Magical" Back Button - text/plain
  - https://textslashplain.com/2022/03/31/the-magical-back-button/

### WHATWG/W3C 動向

#### Draft

- Recommendation
  - Last Call for Review of Proposed Corrections: Media Queries Level 3
    - https://www.w3.org/blog/news/archives/9494
  - **Preload Published as a Discontinued Draft**
    - https://www.w3.org/blog/news/archives/9488
- Proposed Recommendation
  - Call for Review: Geolocation API is a W3C Proposed Recommendation
    - https://www.w3.org/blog/news/archives/9501
- Candidate Recommendation
  - W3C invites implementations of WebXR Device API
    - https://www.w3.org/blog/news/archives/9485
- Working Draft
- First Public Working Draft
  - WebAssembly 2.0 First Public Working Drafts
    - https://www.w3.org/blog/news/archives/9509
  - First Public Working Draft: Region Capture
    - https://www.w3.org/blog/news/archives/9492
- Group Note
  - **Fonts for the Web: Rationale, 1996**
    - https://www.w3.org/TR/2022/NOTE-font-rationale-20220414/
    - 1996 年にまとめられた Web フォント実現に向けての要件
    - W3C Member 限定のメーリングリストに残っていたドラフトを公開
- Chartering
  - HTML Working Group Charter Extended until 30 June 2022
    - https://lists.w3.org/Archives/Public/public-html/2022Apr/0002.html

#### Other

- **W3C TPAC 2022 will be a hybrid meeting**
  - https://www.w3.org/blog/news/archives/9503
    - バンクーバーで開催
    - 中国にハブを設けてそこで少しセッションもやる
- **replace current outline algorithm with one based on heading levels**
  - https://github.com/whatwg/html/pull/7829

### TC39 動向

#### Meeting

- 2022-03
  - agendas/03.md at main · tc39/agendas
    - https://github.com/tc39/agendas/blob/main/2022/03.md
  - notes/meetings/2022-03 at main · tc39/notes
    - https://github.com/tc39/notes/tree/main/meetings/2022-03

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2022-04-01}...main@{2022-05-01}
- 0->1
  - Function once
  - Type Annotations
- 1->2
- 2->3
  - Decorators
  - RegExp v flag with set notation + properties of strings
  - Change Array by Copy
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
  - **httpbis - New Meeting Session Request for IETF 114**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0073.html
  - HTTP (httpbis) WG Virtual Meeting: 2022-05-31 CHANGED
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0072.html
  - I-D Action: draft-ietf-httpbis-rfc6265bis-10.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0069.html
  - I-D Action: draft-ietf-httpbis-retrofit-01.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0067.html
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

- **http-core spec publication soonish from Julian Reschke**
  - https://www.rfc-editor.org/auth48/C430
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JanMar/0234.html
  - > the http core specs are very very very close to be published.
  - RFC9110 AUTH48-DONE\*R draft-ietf-httpbis-semantics-19.txt
  - RFC9111 AUTH48-DONE\*R draft-ietf-httpbis-cache-19.txt
  - RFC9112 AUTH48-DONE\*R draft-ietf-httpbis-messaging-19.txt
  - RFC9113 AUTH48-DONE\*R draft-ietf-httpbis-http2bis-07.txt
  - RFC9114 AUTH48\*R draft-ietf-quic-http-34.txt
  - RFC9163 AUTH48-DONE\*R draft-ietf-httpbis-expect-ct-08.txt
  - RFC9180 PUB draft-irtf-cfrg-hpke-12.txt
  - RFC9193 AUTH48-DONE\*R draft-ietf-core-senml-data-ct-07.txt
  - RFC9204 AUTH48\*R draft-ietf-quic-qpack-21.txt
  - RFC9205 AUTH48-DONE\*R draft-ietf-httpbis-bcp56bis-15.txt
  - RFC9209 AUTH48\*R draft-ietf-httpbis-proxy-status-08.txt
  - RFC9211 AUTH48-DONE\*R draft-ietf-httpbis-cache-header-10.txt
  - RFC9213 AUTH48-DONE\*R draft-ietf-httpbis-targeted-cache-control-04.txt
  - RFC9218 AUTH48\*R draft-ietf-httpbis-priority-12.txt
  - RFC9220 AUTH48-DONE\*R draft-ietf-httpbis-h3-websockets-04.txt
  - RFC9230 AUTH48-DONE\*R draft-pauly-dprive-oblivious-doh-11.txt

### CDN 動向

#### Cloudflare

- **Cloudflare blocks 15M rps HTTPS DDoS attack**
  - https://blog.cloudflare.com/15m-rps-ddos-attack/
  - 今月はじめ 15.3 million request-per-second (rps) の HTTPS DDoS を検出
  - 記録的な規模の攻撃でこれを自動で防いだ
  - 世界中の bot net を使った攻撃で多くはインドネシアから

#### Fastly

- **Trusted services for a privacy-preserving internet: iCloud Private Relay and what it means for customers | Fastly**
  - https://www.fastly.com/blog/icloud-private-relay-and-a-privacy-preserving-internet
  - iCloud の Private Relay の Egress に Fastly が使われていることの記事
  - 先月の Akamai / Cloudflare に続いて 3 つ目の記事

#### Other

### セキュリティ動向

### 周辺動向

- **Introducing DuckDuckGo for Mac: A Private, Fast, and Secure Browsing App**
  - https://spreadprivacy.com/introducing-duckduckgo-for-mac/
  - WebView ベース
- CSS-Tricks joins DigitalOcean, expanding our commitment to community
  - https://www.digitalocean.com/blog/css-tricks-joins-digitalocean
- **ロシア情勢が Web / Internet / Tech に与えた影響の記録 2022 年 4 月**
  - https://zenn.dev/jxck/scraps/bccc75a5d7fbd1

### イベント

- 4 月
- 5 月
  - 11-12: Google I/O
    - https://io.google/2022/
  - 17-18: BlinkOn 16
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/tvOHmMflQy4/m/c5NXpLFoAgAJ
  - 24-26: Microsoft Build
    - https://mybuild.microsoft.com/
  - 26: SecWeb Workshop 2022
    - https://secweb.work/2022.html
- 6 月
  - 6-10: WWDC
    - https://developer.apple.com/wwdc22/
- 7 月
  - 23-29: 114 Philadelphia
    - https://www.ietf.org/how/meetings/114/

### Wrap Up

- Chrome
  - 100
  - 101
    - Reduced UA string (MAJOR.0.0.0)
    - FedCM OT
    - Priority Hints
  - 102
    - Network State Partitioning
    - Speculation Rules
    - Subresource loading with Web Bundles
    - inert
    - Local Font Access
    - Navigation API
    - hidden=until-found
  - Ship
    - Media Queries 4 syntax
    - Speculation Rules (prefetch)
    - Speculation Rules (same-origin prerendering)
    - Subresource loading with Web Bundles
    - Navigation API
    - Early Hints preload/preconnect
  - Prototype
    - CSS toggles
    - Isolated Web Apps
    - Element.isVisible
  - developer.chrome.com
    - hidden=until-found
    - inert
    - BlinkNG
- Firefox
  - 99
  - Ship
    - small/large/dynamic viewport units
    - prefers-contrast
  - Prototype
    - Import maps
    - input.showPicker()
  - Other
    - Platform 2022 planned work
- Safari
  - TP 143
    - Container Queries
    - Subgrid
    - inert by default
    - Permissions API by default
  - 15.5 Beta
    - inert
  - Position request
    - Topics API: negative
    - Media Queries 4 syntax: supportive
  - Other
    - Private Click Measurement の Fraud Prevention blog
    - Inert blog
    - GitHub 移行に向けた話
- Edge
  - 30 days of PWA tutorial
- W3C/WHATWG
  - Fonts for the Web Rationale 1996 公開
  - TPAC 2022 バンクーバーで hybrid のアナウンス
  - HTML Outline Algorithm の削除
- TC39
  - 2022/3 の meeting minutes
  - Type Annotation to Stage 1
  - Decorators to Stage 3
- IETF
  - httpwg が IETF114 でひさびさのミーティングのアナウンス
- CDN 動向
  - Cloudflare 1500 万 rps の記録的な HTTPS DOS を確認
  - Fastly iCloud Private Relay のブログ
- セキュリティ動向
- 周辺動向
  - DuckDuckGo mac 向けブラウザ
  - Digital Ocean が CSS-Tricks を買収
