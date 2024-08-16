---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep97.mp3
published_at: 2022-06-05
guest: [@myakura](https://twitter.com/myakura)
---

# ep97 Monthly Web 202205

## Theme

第 97 回のテーマは 2022 年 5 月の Monthly Web です。

## Show Note

### Chrome 動向

#### Stable: 102

#### Updates

- New in Chrome 101
  - https://developer.chrome.com/en/blog/new-in-chrome-101/
  - hwb() color notation
  - Priority Hints
- What's New In DevTools (Chrome 102)
  - https://developer.chrome.com/en/blog/new-in-devtools-102/
- Deprecations and removals in Chrome 103
  - https://developer.chrome.com/en/blog/deps-rems-103/
- **Chromium Blog: Chrome 103 Beta: Early Navigation Hints, a Host of Completed Origin Trials, and More**
  - https://blog.chromium.org/2022/05/chrome-103-beta-early-navigation-hints.html
  - Early Hints for Navigation
  - Origin Trials
    - New Origin Trials
      - Federated Credentials Management
    - Completed Origin Trials
      - Local Font Access
      - Same-Origin Prerendering Triggered by the Speculation Rules API
      - Update User-Agent Client Hints GREASE Implementation
  - Other Features in this Release
    - AbortSignal.timeout() Static Method
    - ARIA Attribute Reflection for the role Attribute
    - avif is Now a Permitted Web Share File Extension
    - "deflate-raw" Compression Format
    - form rel Attribute
    - popstate Fires Before Load
    - Restrict Gamepad Usage
    - SerialPort `forget()`
    - Support visual-box on overflow-clip-margin
    - User Activation Required for SPC Credential Enrollment
  - Deprecations, and Removals
    - Block External Protocol in Sandboxed iframe
    - Remove Battery Status API on Insecure Origins
    - Remove `<param>` Element
- Google I/O
  - Google I/O 2022: That's a wrap!
    - https://web.dev/googleio22-recap/

#### Intents

- Ship: "deflate-raw" on compression and decompression streams
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/t7NX_-RH9nE
- **Ship: Container Queries**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gwzxnTJDLJ8
- **Ship: Element.isVisible method**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fvpRgcE8_Yg
- **Ship: Opaque Response Blocking (ORB, aka CORB++) v0.1**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ScjhKz3Z6U4
- **Ship: Subresource Loading with Web Bundles**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VS9UgOC7Wqc
- **Ship: User Agent Client Hints GREASE Update**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zdFNms0Nxqg
- Ship: form rel attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ram6i7ffgkM
- Ship: `:has()` pseudo class
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bRsbl3wLuyk
- Ship: CSS object-view-box
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-s-nu3A-qAo
- Ship: WebGL canvas color management
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/G2hKM5GnERQ
- Ship: 'blocking=rendering' attribute on scripts and style sheets
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ydpc6Lfx_7k
- **Ship: CSS `:modal` Pseudo Class**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kGHVBtVS1X8
- Ship: Default SVG cursor size set from OS settings
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AeJt7SUA5lQ
- Ship: DisplayMediaStreamConstraints.selfBrowserSurface
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1k6RDe6iFmg
- Ship: DisplayMediaStreamConstraints.systemAudio
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bIGZVdkZ4OE
- Ship: MediaTrackConstraintSet.displaySurface
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0ty163w9348
- Ship: MediaTrackSupportedConstraints.suppressLocalAudioPlayback
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Fm1nz7Hs7Xo
- Ship: Sanitizer API MVP
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KOpwkS-bgl0
- Ship: Prevent fixed elements from moving during elastic overscroll.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ldUEhY-C3OE
- Prototype and Ship: User Activation Requirement for SPC Credential Enrollment
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GSoWLFb_jF0
- Prototype and Ship: Multi-Screen Window Placement: Fullscreen Companion Window
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Fv63upuTXMA
- Prototype and Ship: Support visual-box on overflow-clip-margin
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/znbNAoUFoR8
- Prototype and Ship: CSS grid-template properties interpolation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ll7br0giMk8
- **Prototype and Ship: `Response.json()`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/buq5vsaTh5Q
  - Body が JSON な response を簡単に作る API
- Prototype: Back/forward cache NotRestoredReason API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/os3qUVtqyWo
- **Prototype: HTTP/3 protocol upgrade for HTTPS DNS records with h3 alpn parameter**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hqvk-XxBIN0
- **Prototype: Reduce fingerprinting in the Accept-Language header and support for HTTP Variants**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/V4FS3zMbZ08
- Prototype: Secure Payment Confirmation - Opt-Out Support
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2HBw2uw1mOM
- Prototype: User Agent Launch Type in PerformanceNavigationTiming
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/o0F7nBKsgg0
- **Prototype: `AbortSignal.any()`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FSH6hrJMaxM
- **Prototype: COEP reflection API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CS8S90_4djA
- Prototype: DisplayMediaStreamConstraints.selfBrowserSurface
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/COid122-_AE
- Prototype: DisplayMediaStreamConstraints.systemAudio
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zUJh3aXAC3k
- Prototype: MediaTrackConstraintSet.displaySurface
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bVVEn-TOTYs
- Prototype: MediaTrackSupportedConstraints.suppressLocalAudioPlayback
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cANVKeNMHyE
- **Prototype: Origin-Bound Cookies**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xKTem_X2LU8
- **Prototype: Prerender2 for Desktop**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cQZddR4izx4
- **Prototype: Stack Switching Promise Integration**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hXJHsmUFIHU
- Prototype: Tabbed web apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IvfIkjvQYuY
- Experiment: Fenced frames
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/y6G3cvKXjlg
- Experiment: Focusgroup
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4vVuaMwMCTQ
- Extend Experiment: Dark mode support for web apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZaSMZ1yU1l0
- Extend Experiment: Cookies Having Independent Partitioned State (CHIPS)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kZRtetS8jsY
- Extend Origin Trial: Subresource loading with Web Bundles
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RdcbaO16G6Q
- Change:
- Unship:
- Remove:
- Deprecate: RTCPeerConnection's googIPv6 constraint
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kyFuSzObC-Y
- Deprecate: SMIL
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5o0yiO440LM
- Deprecate and Remove: WebSQL in non-secure contexts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xdcl4yc8Ihk
- Deprecate and Remove: navigation to filesystem: URLs in iframes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2V7lIYDkdtI
- Deprecate and Remove: Non-ASCII characters in cookie domain attributes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/x3DY-PuZhNw
- **Sign up to host a breakout talk @ BlinkOn16!**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_HnlcMRADpw
- The countdown to BlinkOn 16 is on!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gJQeiRABcUo
- Intent stage "Evaluate readiness to ship": web-share permission policy
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fgme9KOd8CU
- Process survey results
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FrFiBUzAYiE
- PSA: pylint changes in depot_tools, affecting some presubmit checks
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bR1l_hqJadA
- PSA: Event.path has been disabled in pre-Beta channels
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iackFPNoBaI
- Developer pain as a result of "introducing blink_wpt_tests"
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4svjhuokDCY
- FW: [blink-dev] Abridged summary of blink-dev@chromium.org - 18 updates in 8 topics
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/trvo7KbukPQ
- FYI: Remove the service worker requirement for WebAPKs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0uhGufIFLeo

#### V8

#### Other

- web.dev
  - https://web.dev/
  - Don't fight the browser preload scanner
    - https://web.dev/preload-scanner/
  - State of CSS 2022
    - https://web.dev/state-of-css-2022/
  - Bridging the gap
    - https://web.dev/bridging-the-gap/
  - **Yahoo! JAPAN's password-free authentication reduced inquiries by 25%, sped up sign-in time by 2.6x**
    - https://web.dev/yahoo-japan-identity-case-study/
  - Finding courage and inspiration in the developer community
    - https://web.dev/gde-mentoring/
  - Variable fonts in real life
    - https://web.dev/variable-fonts-in-real-life/
  - Quickly create nice CSS gradients with the CSS Gradient Creator
    - https://web.dev/css-gradient-generator/
  - New to the web platform in April
    - https://web.dev/web-platform-04-2022/
  - An API for fast, beautiful web fonts
    - https://web.dev/api-for-fast-beautiful-web-fonts/
  - GOV.UK drops jQuery from their front end.
    - https://web.dev/gov-uk-drops-jquery/
  - Building a button component
    - https://web.dev/building-a-button-component/
  - **How do modern frameworks perform on the new INP metric**
    - https://web.dev/inp-in-frameworks/
  - Synchronize audio and video playback on the web
    - https://web.dev/audio-output-latency/
  - New to the web platform in May
    - https://web.dev/web-platform-05-2022/
  - Use conic gradients to create a cool border
    - https://web.dev/conic-gradient-border/
- google developer blog
  - https://developers.googleblog.com/
- google developer japan blog
  - Google Developers Japan: 改ざんできないビルドでソフトウェア サプライ チェーンのセキュリティを改善する
    - https://developers-jp.googleblog.com/2022/05/improving-software-supply-chain.html
  - Google Developers Japan: ウェブサイト、アプリ、サーバーで OAuth 2.0 トークンを使用する
    - https://developers-jp.googleblog.com/2022/05/oauth-20.html
  - Google Developers Japan: Chrome 102: ウィンドウ コントロール オーバーレイ、さまざまなオリジン トライアルの終了、ファイル ハンドラとしての PWA など
    - https://developers-jp.googleblog.com/2022/05/chrome-102.html
- chrome developer blog
  - Private prefetch proxy in Chrome
    - https://developer.chrome.com/en/blog/private-prefetch-proxy/
  - Speeding up LCP with cross-site prefetching
    - https://developer.chrome.com/en/blog/cross-origin-prefetch/
  - Debugging WebAssembly Faster
    - https://developer.chrome.com/en/blog/faster-wasm-debugging/
  - Advanced Web Apps Fund
    - https://developer.chrome.com/en/blog/advanced-web-apps-fund/
  - Better Tab Sharing with Capture Handle
    - https://developer.chrome.com/en/blog/capture-handle/
  - **Interaction to Next Paint (INP) tool support**
    - https://developer.chrome.com/en/blog/inp-tools-2022/
  - Progress in the Privacy Sandbox (March - April 2022)
    - https://developer.chrome.com/en/blog/progress-in-the-privacy-sandbox-2022-04/
  - Cookies Having Independent State (CHIPS) origin trial extended
    - https://developer.chrome.com/en/blog/chips-origin-trial-extended/
- chromium blog
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- search central
  - Event recap: Search Central Virtual Unconference Japan 2022
    - https://developers.google.com/search/blog/2022/05/recap-search-central-unconference-japan-2022
  - Spring cleaning: some sitemap extension tags are going away
    - https://developers.google.com/search/blog/2022/05/spring-cleaning-sitemap-extensions
  - May 2022 core update releasing for Google Search
    - https://developers.google.com/search/blog/2022/05/may-2022-core-update
- other
  - One step closer to a passwordless future
    - https://blog.google/technology/safety-security/one-step-closer-to-a-passwordless-future/
  - Apple, Google and Microsoft Commit to Expanded Support for FIDO Standard to Accelerate Availability of Passwordless Sign-Ins - FIDO Alliance
    - https://fidoalliance.org/apple-google-and-microsoft-commit-to-expanded-support-for-fido-standard-to-accelerate-availability-of-passwordless-sign-ins/

### Firefox 動向

#### Stable: 101

#### Updates

- **Firefox 100 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/100
    - dynamic-range/video-dynamic-range media features
    - WritableStream
    - pipeTo()
    - AbortSignal.timeout()
- **Firefox 100.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/100.0/releasenotes/
    - captions support in PiP window
    - overlay scrollbars on Windows 11 and LInux
    - new focus indicator for links
    - > Firefox now ignores less restricted referrer policies-including unsafe-url, no-referrer-when-downgrade, and origin-when-cross-origin-for cross-site subresource/iframe requests to prevent privacy leaks from the referrer.
    - > Soft-reloading a web page will no longer cause revalidation for all resources.
- **Firefox 101 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/101
    - prefers-contrast
    - small/large/dynamic viewport units
    - vb/vi viewport units
    - input.showPicker()
    - Constructable stylesheets
    - WebDriver BiDi
- Firefox 101.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/101.0/releasenotes/
- Celebrating Firefox: How we got to 100
  - https://blog.mozilla.org/en/mozilla/celebrating-firefox-100/
- Improved Process Isolation in Firefox 100 - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2022/05/improved-process-isolation-in-firefox-100/
- These Weeks in Firefox: Issue 115 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/05/20/these-weeks-in-firefox-issue-115/
- These Weeks in Firefox: Issue 116 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/05/25/these-weeks-in-firefox-issue-116/
- These Weeks In Firefox: Issue 117 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/06/02/these-weeks-in-firefox-issue-117/
- **Upgrading Mozilla's Root Store Policy to Version 2.8 - Mozilla Security Blog**
  - https://blog.mozilla.org/security/2022/05/23/upgrading-mrsp-to-v-2-8/
- Prioritized Task Scheduling API is Prototyped in Nightly - Mozilla Performance
  - https://blog.mozilla.org/performance/2022/06/02/prioritized-task-scheduling-api-is-prototyped-in-nightly/

#### Intents

- Ship: Web Animations Animation.timeline setter
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/eVCC6hqgaeE
- Ship: WebDriver-BiDi
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Rf58oKI4leM
- Ship: User Defined Byte Streams
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/aGz_MUa-nJg
- Ship: TransformStreams and ReadableStream.pipeThrough
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/v-3ABR6oAnY
- **Ship: URL Query String Stripping (ETP Strict and Private Browsing Mode)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/YsG7Hax_VJ4
- Ship: CSS constructable stylesheets.
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/nGCnIvYEUd0
- Prototype: Storage Access API, Always Partition Storage
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/60jgfMsWmvY
- Prototype: Transferable streams
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ACDDMOE-PPM
- Experiment:
- Change:
- Remove:
- **Unship: window.sidebar**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/5Yp3hPu3mZc
- Unship: `IDBDatabase.createMutableFile()` and the relevant classes
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/jDrDstL2MGU
- Unship: network.cookie.lifetimePolicy
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Otdhy3mfQt8

#### Other

- SpiderMonkey Newsletter (Firefox 100-101)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/VRX5WyXe_k0
- Credit card autofill now enabled in the United Kingdom, France and Germany
  - https://blog.mozilla.org/en/products/firefox/firefox-credit-card-autofill-uk-france-germany/
- Firefox's Picture-in-Picture rolls out subtitles - a Mozilla Connect community requested feature
  - https://blog.mozilla.org/en/products/firefox/firefox-picture-in-picture-rolls-out-subtitles/
- **Revocation Reason Codes for TLS Server Certificates - Mozilla Security Blog**
  - https://blog.mozilla.org/security/2022/05/16/revocation-reason-codes-for-tls-server-certificates/
- Manifest v3 in Firefox: Recap & Next Steps | Mozilla Add-ons Community Blog
  - https://blog.mozilla.org/addons/2022/05/18/manifest-v3-in-firefox-recap-next-steps/
- **Marketing our privacy products while preserving privacy**
  - https://blog.mozilla.org/en/products/mozilla-vpn/marketing-our-privacy-products-while-preserving-privacy/

### Safari 動向

#### Stable: 15.5

#### Updates

- **Release Notes for Safari Technology Preview 144**
  - https://webkit.org/blog/12621/release-notes-for-safari-technology-preview-144/
  - **Added Typed OM support for container units (r291524)**
  - Enabled support for mutable timelines by default (r291868)
  - Added getAssertion support for virtual HID authenticators (r291624)
  - Added support for focused and visible ServiceWorkerWindowClient states (r291888)
  - Added a check for whether the origin can access storage in the Storage API (r291726)
  - **Included initial accessibility support for display: contents (r291570)**
- Release Notes for Safari Technology Preview 145
  - https://webkit.org/blog/12629/release-notes-for-safari-technology-preview-145/
  - Allowed Response Local Overrides to map to a file on disk
  - `:has()` pseudo-class
    - Added invalidation support for the pseudo-classes `:autofill`, `:placeholder-shown`, `:indeterminate1`, `:read-only`, `:read-write`, `:required` and `:optional`
  - Container Queries and Containment
    - Added CSSOM support (r292045)
    - Added support for contain: inline-size (r292394, r292416, r292465)
    - Added support for containment to disable the special handling of the HTML body element for overflow viewport propagation (r292127, r292157)
  - Added support for transitions and animations on grid-template-columns and grid-template-rows (r292432)
  - calc() functions
    - Added NaN propagation for min, max, clamp, and hypot (r292732)
    - Serialized top level min, max, hypot as calc() (r292893)
  - resize property
    - Added support for block/inline CSS values (r292222)
    - Corrected minimum size computation to allow resizing below initial size (r292559)
  - Added support for rendering `url()`, CSS basic shapes other than `path()`, and coord-box for offset-path (r292382)
  - Dialog element now adapts to dark mode by default (r292029)
  - Allowed Wasm import from a JS Worker module behind the feature flag (r292799)
  - Added support for all CTAP transports and remove gesture requirement for virtual authenticators (r292593)
  - Implemented `getTransports()` and getAuthenticatorData() (r292913)
  - Added support for ServiceWorkerClients.openWindow (r291979)
  - Implemented ServiceWorkerWindowClient.navigate (r292459)
- Safari 15.5 Release Notes | Apple Developer Documentation
  - https://developer.apple.com/documentation/safari-release-notes/safari-15_5-release-notes
- **New WebKit Features in Safari 15.5**
  - https://webkit.org/blog/12669/new-webkit-features-in-safari-15-5/
  - support for the inert property in HTML;
  - support for the worker-src Content Security Policy directive;
  - new minimumViewportInset and maximumViewportInset APIs for implementing new CSS Viewport Units in WKWebView-based apps.
- Release Notes for Safari Technology Preview 146
  - https://webkit.org/blog/12745/release-notes-for-safari-technology-preview-146/
  - Bugfix
- Happy birthday, WPE WebKit!
  - https://webkit.org/blog/12733/happy-birthday-wpe-webkit/
- Customizing Color Fonts on the Web
  - https://webkit.org/blog/12662/customizing-color-fonts-on-the-web/

#### Position

- [webkit-dev] Request for position: Response.json() static method
  - https://lists.webkit.org/pipermail/webkit-dev/2022-May/032250.html

#### Other

### Edge 動向

#### Stable: 102

#### Updates

- Microsoft Edge の更新制御とサポート範囲について | Japan Developer Support Internet Team Blog
  - https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/how-and-why-to-update-edge/

#### Chakra

#### Other

- IIS の基本的な情報の自動採取について | Japan Developer Support Internet Team Blog
  - https://jpdsi.github.io/blog/web-apps/iis-log-auto-collection/
  - > なお、本ブログは弊社の公式見解ではなく、予告なく変更される場合があります。
- Find and manage your installed apps and sites
  - https://blogs.windows.com/msedgedev/2022/05/18/find-and-manage-your-installed-apps-and-sites/
- **Styling `select` elements for real**
  - https://blogs.windows.com/msedgedev/2022/05/05/styling-select-elements-for-real/
- **What's new for Microsoft Edge at Build 2022**
  - https://blogs.windows.com/msedgedev/2022/05/24/microsoft-edge-build-2022/
- **Introducing Microsoft Edge Secure Network - Microsoft Tech Community**
  - https://techcommunity.microsoft.com/t5/articles/introducing-microsoft-edge-secure-network/m-p/3367243
  - Microsoft Edge Secure Network という VPN を搭載
  - Cloudflare と提携、 1GB まで無料
- Use the Microsoft Edge Secure Network to protect your browsing
  - https://support.microsoft.com/en-us/topic/use-the-microsoft-edge-secure-network-to-protect-your-browsing-885472e2-7847-4d89-befb-c80d3dda6318
- Unexpectedly HTTPS? - text/plain
  - https://textslashplain.com/2022/05/16/unexpectedly-https/
- Chromium Internals: PAK Files - text/plain
  - https://textslashplain.com/2022/05/03/chromium-internals-pak-files/
- Losing your cookies - text/plain
  - https://textslashplain.com/2022/05/26/losing-your-cookies/

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - Viewport Capture
    - https://www.w3.org/blog/news/archives/9563
  - Event Timing API, Largest Contentful Paint
    - https://www.w3.org/blog/news/archives/9559
- Chartering

#### Other

- **W3C Strategic Highlights, April 2022**
  - https://www.w3.org/blog/news/archives/9532
- Judy Brewer receives ACM award for her leadership of the Web Accessibility Initiative
  - https://www.w3.org/blog/news/archives/9523
- **W3C opens Advisory Board (AB) election**
  - https://www.w3.org/blog/news/archives/9521
- ARIA Authoring Practices Guide | APG | WAI | W3C
  - https://www.w3.org/WAI/ARIA/apg/
- Redesigning ARIA Authoring Practices Guide - Bocoup
  - https://bocoup.com/blog/redesigning-aria-apg

### TC39 動向

#### Meeting

- 2021-06
  - https://github.com/tc39/agendas/blob/main/2022/06.md
  - https://github.com/tc39/notes

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2022-05-01}...main@{2022-06-01}
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
  - I-D Action: draft-ietf-httpbis-retrofit-02.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0090.html
  - I-D Action: draft-ietf-httpbis-binary-message-03.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0087.html
  - Usage of HTTP/2 PROTOCOL_ERROR and INTERNAL_ERROR
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0082.html
  - ABNF and Structured fields
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0076.html
  - **Title change for QPACK: Field Compression**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0091.html
  - Signing Set-Cookie
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0124.html
  - **DRAFT minutes for the May interim meeting**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0121.html
    - https://httpwg.org/wg-materials/interim-22-05/minutes.html
  - Message signatures, structured fields and ABNF
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0112.html
  - I-D Action: draft-ietf-httpbis-message-signatures-10.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0111.html
  - Second Working Group Last Call: draft-ietf-httpbis-digest-headers-09
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0109.html
  - I-D Action: draft-ietf-httpbis-client-cert-field-02.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0107.html
  - I-D Action: draft-ietf-httpbis-digest-headers-09.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0106.html
  - I-D Action: draft-ietf-httpbis-retrofit-03.txt from
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0102.html
  - Genart last call review of draft-ietf-httpbis-binary-message-04
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0101.html
  - I-D Action: draft-ietf-httpbis-binary-message-04.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0100.html
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

- **RFC 9239 - Updates to ECMAScript Media Types**
  - https://datatracker.ietf.org/doc/html/rfc9239
- draft-fabbrini-algorithm-post-alien-cryptography-00
  - https://datatracker.ietf.org/doc/html/draft-fabbrini-algorithm-post-alien-cryptography-00
  - 高度な知能のエイリアンが襲来しても大丈夫な暗号化技術

### CDN 動向

#### Cloudflare

- How we built config staging and versioning with HTTP applications
  - https://blog.cloudflare.com/version-and-stage-configuration-changes-with-http-applications/
- Announcing Pub/Sub: Programmable MQTT-based Messaging
  - https://blog.cloudflare.com/announcing-pubsub-programmable-mqtt-messaging/
- Magic NAT: everywhere, unbounded, and lower cost
  - https://blog.cloudflare.com/magic-nat/
- Introducing Workers Analytics Engine
  - https://blog.cloudflare.com/workers-analytics-engine/
- **Announcing D1: our first SQL database**
  - https://blog.cloudflare.com/introducing-d1/
  - SQLite ベースのクラウド SQL DB
  - Cloudflare 上でリードレプリカが自動作成
  - バッチ処理あり
- Introducing Cache Reserve: massively extending Cloudflare's cache
  - https://blog.cloudflare.com/introducing-cache-reserve/
- Durable Objects Alarms - a wake-up call for your applications
  - https://blog.cloudflare.com/durable-objects-alarms/
- **A New Hope for Object Storage: R2 enters open beta**
  - https://blog.cloudflare.com/r2-open-beta/
  - S3 互換のオブジェクトストレージ
  - とにかく安くて安心して使える
  - TTL, Public Bucket, 署名付き URL etc
- Announcing Workers for Platforms: making every application on the Internet more programmable
  - https://blog.cloudflare.com/workers-for-platforms/
- Workers visibility: announcing Logpush for Worker's Trace Events
  - https://blog.cloudflare.com/logpush-for-workers/
- A new era for Cloudflare Pages builds
  - https://blog.cloudflare.com/cloudflare-pages-build-improvements/
- Introducing Direct Uploads for Cloudflare Pages
  - https://blog.cloudflare.com/cloudflare-pages-direct-uploads/
- Welcome to Platform Week
  - https://blog.cloudflare.com/platform-week-2022/
  - このあとの発表群の前振り
- **The next chapter for Cloudflare Workers: open source**
  - https://blog.cloudflare.com/workers-open-source-announcement/
  - Cloudflare Workers のコードを OSS に
  - この Worker へのロックインを避ける意味で WinterCG が同時に発表されている
- **A Community Group for Web-interoperable JavaScript runtimes**
  - https://blog.cloudflare.com/introducing-the-wintercg/
  - https://wintercg.org/
  - WHATWG はブラウザに特化した API を策定してきた
  - Node や Deno 、 Edge コンピューティングのランタイムでは合わない場合もある
  - その差分をうめるための WinterCG を設立 W3C みたいなプロセスだが参加は自由
  - Cloudflare, Vercel, Shopify, Node.js, Deno などが参加
- **Zaraz use Workers to make third-party tools secure and fast**
  - https://blog.cloudflare.com/zaraz-use-workers-to-make-third-party-tools-secure-and-fast/
  - タグマネージャの Zaraz を買収
  - ブラウザでやっていたタグマネージャの処理を Edge 上でやろうとしている
- The Cloudflare Bug Bounty program and Cloudflare Pages
  - https://blog.cloudflare.com/pages-bug-bounty/
- Tracking shifts in Internet connectivity in Kherson, Ukraine
  - https://blog.cloudflare.com/tracking-shifts-in-internet-connectivity-in-kherson-ukraine/
  - ウクライナのネット事情
- Cloudflare achieves key cloud computing certifications - and there's more to come
  - https://blog.cloudflare.com/iso-27018-second-privacy-certification-and-c5/
- Monitoring our monitoring: how we validate our Prometheus alert rules
  - https://blog.cloudflare.com/monitoring-our-monitoring/
- Eurovision 2022, the Internet effect version
  - https://blog.cloudflare.com/eurovision-2022-internet-trends/
- How Ramadan shows up in Internet trends
  - https://blog.cloudflare.com/how-ramadan-shows-up-in-internet-trends/
- Network performance update: Platform Week
  - https://blog.cloudflare.com/network-performance-update-platform-week/
- **Proof of Stake and our next experiments in web3**
  - https://blog.cloudflare.com/next-gen-web3-network/
- **Public access for our Ethereum and IPFS gateways now available**
  - https://blog.cloudflare.com/ea-web3-gateways/
- **Serving Cloudflare Pages sites to the IPFS network**
  - https://blog.cloudflare.com/cloudflare-pages-on-ipfs/
- Gaining visibility in IPFS systems
  - https://blog.cloudflare.com/ipfs-measurements/
- Part 1: Rethinking Cache Purge, Fast and Scalable Global Cache Invalidation
  - https://blog.cloudflare.com/part1-coreless-purge/
- Announcing the Cloudflare Images Sourcing Kit
  - https://blog.cloudflare.com/cloudflare-images-sourcing-kit/
- Send email using Workers with MailChannels
  - https://blog.cloudflare.com/sending-email-from-workers-with-mailchannels/
- Route to Workers, automate your email processing
  - https://blog.cloudflare.com/announcing-route-to-workers/
- Stream with sub-second latency is like a magical HDMI cable to the cloud
  - https://blog.cloudflare.com/magic-hdmi-cable/
- Bring your own ingest domain to Stream Live
  - https://blog.cloudflare.com/bring-your-own-ingest-domain-to-stream-live/
- Cloudflare Stream simplifies creator management for creator platforms
  - https://blog.cloudflare.com/stream-creator-management/

#### Fastly

- Taming third parties with a single-origin website | Fastly
  - https://www.fastly.com/blog/taming-third-parties-with-a-single-origin-website
- Gartner names Fastly Global CDN "Customers' Choice" in 2022 "Voice of the Customer" report | Fastly
  - https://www.fastly.com/blog/gartner-names-fastly-global-cdn-customers-choice-in-2022-voice-of-the-customer-report
- Threat hunting network callbacks in WAF data | Fastly
  - https://www.fastly.com/blog/threat-hunting-network-callbacks-in-waf-data
- Product design at Fastly: How we create useful enterprise experiences | Fastly
  - https://www.fastly.com/blog/product-design-at-fastly-how-we-create-useful-enterprise-experiences
- **HTTP/3 and QUIC are now available for our entire customer base at no additional charge | Fastly**
  - https://www.fastly.com/blog/http-3-and-quic-are-now-available-for-our-entire-customer-base-at-no-additional-charge
- **Fastly announces acquisition of Glitch: A future of "yes code" at the edge | Fastly**
  - https://www.fastly.com/blog/fastly-announces-acquisition-of-glitch-a-future-of-yes-code-at-the-edge
  - https://www.fastly.com/jp/press/press-releases/fastly-announces-acquisition-of-glitch
  - https://blog.glitch.com/post/an-exciting-leap-forward-for-glitch
  - Fastly が Glitch を買収

#### Other

### セキュリティ動向

- Entropy and Privacy Analysis
  - https://lowentropy.net/posts/entropy-privacy/
- Understanding Online Identity
  - https://educatedguesswork.org/posts/understanding-identity/
  - EKR 先生の記事

### 周辺動向

- **Join us for the 2022 Web Engines Hackfest | Igalia**
  - https://www.igalia.com/2022/05/12/Join-us-for-the-2022-Web-Engines-Hackfest.html
  - https://www.igalia.com/2022/05/23/Web-Engines-Hackfest-2022-Agenda-Announced.html
  - https://www.youtube.com/channel/UCPQ8NaRSfsGei1j1meO4pNg/videos
  - Engines: Chromium/Blink/V8, Safari/WebKit/JSC, Firefox/Gecko/SpiderMonkey, Servo
  - Testing: WPT, Test262
  - Specifications: W3C, WHATWG, TC39
  - などに関わっている人を集めたオフラインイベント
- Igalia at BlinkOn 16 | Igalia
  - https://www.igalia.com/2022/05/11/Igalia-at-BlinkOn-16.html
- **JavaScript Containers**
  - https://tinyclouds.org/javascript_containers
  - Deno では JS コンテナを模索するという Ryan Dahl の記事

### イベント

- 5 月
  - 11-12: Google I/O
    - https://io.google/2022/
  - 17-18: BlinkOn 16
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/tvOHmMflQy4/m/c5NXpLFoAgAJ
  - 22-24:Home - Write the Docs Portland 2022
    - https://www.writethedocs.org/conf/portland/2022/
  - 24-26: Microsoft Build
    - https://mybuild.microsoft.com/
  - 26: SecWeb Workshop 2022
    - https://secweb.work/2022.html
- 6 月
  - 6-9: TC39
    - https://github.com/tc39/agendas/blob/main/2022/06.md
  - 6-10: WWDC
    - https://developer.apple.com/wwdc22/
  - 13-14: Web Engines Hackfest
    - https://webengineshackfest.org/2022/
- 7 月
  - 23-29: IETF 114 Philadelphia
    - https://www.ietf.org/how/meetings/114/
- 9 月
  - 12-16: TPAC 2022 Vancouver
    - https://www.w3.org/wiki/TPAC/2022

### Wrap Up

- Chrome
  - 101
    - `hwb()`
    - Priority Hints
  - 102
  - Ship
    - Container Queries
    - `Element.isVisible`
    - Subresource loading with Web Bundles
    - `:has()`
    - `:modal` pseudo class
    - `Response.json()`
  - Prototype
    - HTTPS DNS records with h3 ALPN param
    - `Accept-Language` reduce fingerprinting
    - `AbortSignal.any()`
    - COEP reflection API
    - Origin-bound cookies
    - Prerender2 for Desktop
  - I/O
    - INP (Interaction to Next Paint)
    - password-free auth in Yahoo! JAPAN
  - other
    - BlinkOn 16
    - Passkey standardization
- Firefox
  - 100
    - WritableStream
    - `pipeTo()`
    - `AbortSignal.timeout()`
    - soft-reloading not cause cache revalidation
  - 101
    - `prefers-contrast`
    - small/large/dynamic viewport units
    - `input.showPicker()`
    - Constractable stylesheets
  - Ship
    - TransformStreams
    - BYOBStreams
    - URL query stripping (on ETP Strict and Private Browsing modes)
  - Prototype
    - transferable streams
  - other
    - Certificate revocation policy update
- Safari
  - TP 144
    - display: contents accessibility support
  - TP 145
  - 15.5
    - `inert`
  - TP 146
- Edge
  - `select` 要素のスタイルガイド
  - MS Build 2022
  - Edge Secure Network VPN
- W3C/WHATWG
  - W3C Strategic Highlights April 2022
  - AB Election
- TC39
- IETF
  - QPACK が Header Comp から Field Comp に改名
  - RFC 9239 - Updates to ECMAScript Media Types
  - Post Aliahen Crypto
- CDN 動向
  - Cloudflare
    - WinterCG と Worker の OSS 公開
    - D1, R2, Magic Nat, MQTT など新製品公開
    - Web3 系
  - Fastly
    - H3/QUIC available for all user
    - Glitch 買収
- セキュリティ動向
  - Martin の Entropy の記事
  - EKR の Online ID の記事
- 周辺動向
  - WebEngine Hackfest
  - Ryan Dahl の container に関する Blog (WinterCG)
