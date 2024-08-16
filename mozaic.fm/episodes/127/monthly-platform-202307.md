---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep127.mp3
published_at: 2023-07-31
guest: [@myakura](https://twitter.com/myakura)
---

# ep127 Monthly Platform 202307

## Theme

第 127 回のテーマは 2023 年 7 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable:115

#### Updates

- New in Chrome 115 - Chrome Developers
  - https://developer.chrome.com/en/blog/new-in-chrome-115/
  - Scroll driven animations
  - Fenced Frames
  - Topics API
  - And more!
  - Further reading
- **Chrome 116 beta - Chrome Developers**
  - https://developer.chrome.com/en/blog/chrome-116-beta/
  - CSS
    - CSS Motion Path
    - Display and content-visibility animations
  - Web APIs
    - AbortSignal.any()
    - BYOB support for Fetch
    - Back/forward cache NotRestoredReason API
    - Document Picture-in-Picture
    - Expanded Wildcards in Permissions Policy Origins
    - FedCM bundle: Login Hint API, User Info API, and RP Context API
    - Non-composed Mouse and Pointer enter/leave events
    - Remove document.open sandbox inheritance
    - Report Critical-CH caused restart in NavigationTiming
  - Origin trials in progress
    - COOP: restrict-properties
    - FedCM Sign-in Status API
    - EditContext API
    - Long Animation Frame Timing
  - What's new in Chrome 116 for Extensions - Chrome Developers
    - https://developer.chrome.com/en/blog/chrome-116-beta-whats-new-for-extensions/
    - Programmatically open a Sidepanel
    - WebSocket support in Service Workers
    - Strong keepalive for Service Workers
    - Recording audio and video in the background
    - New API: runtime.getContexts()
    - New offscreen reason: GEOLOCATION
    - chrome.action.setBadgeText()
    - Summary: another step towards Manifest V3

#### Intents

- **Ship: Array grouping**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DaKH9F7X3Lc
  - Object.map/Map.map で実装
- **Ship: Back/forward cache NotRestoredReasons API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/G5tPtziBkEA
- Ship: Inherit Base URL snapshot for about:blank and about:srcdoc, with about:blank inheriting from initiator, not parent.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qhl64uMLjGA
- **Ship: Media Queries: prefers-reduced-transparency feature**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EiZ2vlPy9xs
- Ship: Opaque Response Blocking (ORB, aka CORB++) v0.2
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RcuAzHEI2CU
- **Ship: Permissions-Policy: unload**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4y0mb_hbGk8
- Ship: Protected Audience features: recency, rounding bids & scores
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-bQKNLit6nw
- Ship: Read Chrome device attributes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/y4rzN_7RWA4
- **Ship: Remove non-standard appearance keywords**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gfxScdL8O3g
- Ship: Support stroke-box, content-box and border-box in the transform-box CSS property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FEOVeDh4QXM
- Ship: Web Serial support for Bluetooth RFCOMM services
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/P4YwDCcvdvs
- Ship: [URL] Allow "%00" as a valid URL path
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/e1XDduDDM9w
- Prototype and Ship: Clear Client Hints via Clear-Site-Data header
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sLgLB3KpBDo
- Prototype and Ship: Clear-Site-Data header wildcard syntax
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gAH_zIeU-wE
- Prototype and Ship: content-visibility: auto implies contain-intrinsic-size: auto
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aYpmS8hP2UQ
- Implement and Ship: Per-frame quantizer in VideoEncoder
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UZWH1LuwBas
- **Prototype: CSS font-variant-emoji**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MaXgbE4vTbk
- **Prototype: Captured Surface Control**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MWH1Y4Cerog
- **Prototype: Element Capture**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EbLKSf3_FHI
- **Prototype: Insert CJK Inter-script Spacing: the CSS `text-autospace` property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/my9MyWxa2ns
- **Prototype: Japanese Phrase Line Breaking**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YK51qPdjM4A
- **Prototype: Media Queries: prefers-reduced-transparency feature**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pWonDP0g9Q4
- **Prototype: Sec-CH-Prefers-Reduced-Transparency User Preference Media Features Client Hints Header**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GFHrc2-lOo8
- **Prototype: fetchLater API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KXnqpUpVwPQ
  - 元 PendingBeacon
- Prototype: inverted-colors media query
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0ugmlt_SLIw
- **Experiment: Compression dictionary transport with Shared Brotli**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NgH-BeYO72E
- **Experiment: HTTPS Upgrades**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NE8_exBpmOI
- Experiment: MathML columnspan/rowspan attributes on `<mtd>` element
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SqIQf6nKxxk
- **Experiment: ServiceWorker static routing API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_H8rqHW9ERQ
- Experiment: Tabbed web apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/m16m2TEq-NM
- **Experiment: Zstd Content-Encoding**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/I6IWfl95gRU
- Extend Experiment: SoftNavigation performance Entry
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pSD2HBnd720
- Extend Experiment: WebAssembly Garbage Collection (WasmGC), plus stringref
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7F_daEqGQAY
- Change:
- Unship:
- Remove:
- PSA: Warning on Insecurely-Delivered Downloads
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NUVxYfvEqCI
- Clear Client Hints via Clear-Site-Data header
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lJY86eTPQ0s

#### Other

- web.dev
  - https://web.dev/
  - New to the web platform in June
    - https://web.dev/web-platform-06-2023/
  - 3 common types of test automation
    - https://web.dev/ta-types/
  - **How Back/forward Cache Helped Yahoo! JAPAN News Increase Revenue by 9% on Mobile**
    - https://web.dev/yahoo-japan-news-bfcache/
  - Pyramid or Crab? Find a testing strategy that fits
    - https://web.dev/ta-strategies/
  - Designing the user experience of passkeys on Google accounts
    - https://web.dev/passkey-google-ux/
  - Adapting typography to user preferences with CSS
    - https://web.dev/adapting-typography-to-user-preferences-with-css/
- google developer blog
  - https://developers.googleblog.com/
  - Designing the user experience of passkeys on Google accounts
    - https://developers.googleblog.com/2023/07/bringing-passkeys-to-googledotcom.html
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - https://developer.chrome.com/blog/
  - DevTools Tips: Local and session storage - Chrome Developers
    - https://developer.chrome.com/en/blog/devtools-tips-21/
  - WebRTC: Legacy getStats() migration guide - Chrome Developers
    - https://developer.chrome.com/en/blog/getstats-migration/
  - DevTools Tips: Record and replay user flows with the Recorder - Chrome Developers
    - https://developer.chrome.com/en/blog/devtools-tips-4/
  - A case study on scroll-driven animations performance - Chrome Developers
    - https://developer.chrome.com/en/blog/scroll-animation-performance-case-study/
  - What's happening in Chrome Extensions? - Chrome Developers
    - https://developer.chrome.com/en/blog/extension-news-july-2023/
  - Debugging websites in Chrome on iOS 16.4+ - Chrome Developers
    - https://developer.chrome.com/en/blog/debugging-chrome-on-ios/
  - WebGPU: the cross-platform graphics API of tomorrow - Chrome Developers
    - https://developer.chrome.com/en/blog/webgpu-cross-platform/
  - Shipping the Privacy Sandbox relevance and measurement APIs - Chrome Developers
    - https://developer.chrome.com/en/blog/privacy-sandbox-launch/
  - FedCM updates: IdP Sign-In Status API, Login Hint, and more - Chrome Developers
    - https://developer.chrome.com/en/blog/fedcm-chrome-116-updates/
  - DevTools Tips: Breakpoints and logpoints - Chrome Developers
    - https://developer.chrome.com/en/blog/devtools-tips-25/
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- v8
  - Speeding up V8 heap snapshots · V8
    - https://v8.dev/blog/speeding-up-v8-heap-snapshots
- other
  - An update on site names | Google Search Central Blog | Google for Developers
    - https://developers.google.com/search/blog/2023/07/sitenames
  - **Google Online Security Blog: An important step towards secure and interoperable messaging**
    - https://security.googleblog.com/2023/07/an-important-step-towards-secure-and.html
  - **Google Online Security Blog: A look at Chrome's security review culture**
    - https://security.googleblog.com/2023/07/a-look-at-chromes-security-review.html
  - **Google Online Security Blog: The Ups and Downs of 0-days: A Year in Review of 0-days Exploited In-the-Wild in 2022**
    - https://security.googleblog.com/2023/07/the-ups-and-downs-of-0-days-year-in.html
  - **So, you don't like a web platform proposal**
    - https://blog.yoav.ws/posts/web_platform_change_you_do_not_like/
  - **Web-Environment-Integrity/explainer.md at main · RupertBenWiser/Web-Environment-Integrity**
    - https://github.com/RupertBenWiser/Web-Environment-Integrity/blob/main/explainer.md
    - https://github.com/RupertBenWiser/Web-Environment-Integrity/issues/28#issuecomment-1651129388

### Firefox 動向

#### Stable: 115.0

#### Updates

- Firefox 115.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/115.0/releasenotes/
  - Windows 7 、 Windows 8 、 macOS 10.12 、 10.13 、 10.14 のサポートがこのバージョンで終了
- **Firefox 115 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/115
  - `link rel="modulepreload"`
  - `@import supports()`
  - `Array.fromAsync()`
  - Change array by copy
  - `Response.json()`
  - `URL.canParse()`
  - `URLSearchParams.has({ value })/URLSearchParams.delete({ value })`
- **The Firefox Unleashed - These Weeks in Firefox: Issue 141 - Firefox Nightly News**
  - https://blog.nightly.mozilla.org/2023/07/05/the-firefox-unleashed-these-weeks-in-firefox-issue-141/
  - Nightly で Spectre/Meltdown 用のミティゲーションを無効に
  - JetStream 2 で 6%, TodoMVC の Speedmeter 3 で 2-3% パフォーマンスが改善
- **Full Speed Into The Future - These Weeks in Firefox: Issue 142 - Firefox Nightly News**
  - https://blog.nightly.mozilla.org/2023/07/14/full-speed-into-the-future-these-weeks-in-firefox-issue-142/
  - Firefox がついに Chrome よりも高速なブラウザに - GIGAZINE
    - https://gigazine.net/news/20230720-firefox-surpassed-chrome-speedometer/
  - Firefox has surpassed Chrome on Speedometer | Hacker News
    - https://news.ycombinator.com/item?id=36770883
- L10n Report: July 2023 Edition | Mozilla L10N
  - https://blog.mozilla.org/l10n/2023/07/27/l10n-report-july-2023-edition/

#### Intents

- Ship: math-style, math-depth, font-size: math
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Uk39hvO910w
- Ship "camera" & "microphone" in permissions.query()
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/auH04v5gGk8
- **Ship RTCRtpScriptTransform**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Gowr5Fx5jng
  - 元 Insertable Streams
- Implement and Ship: canvas2d getContextAttributes method
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/7mBq-97ohA0
- Prototype: text-transform: math-auto
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/XRQCUSXg6q8
- **Change: Align `KeyboardEvent.key` and `KeyboardEvent.code` values of Windows logo key and its modifier state**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/S859KrLKSBU
- Unship: MathML scriptminsize and scriptsizemultiplier attributes
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/NsIN22F8pbQ
- Unship: mathvariant other than `<mi mathvariant=normal>`
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/rr403BgAA0s

#### Newsletter

- Necko Newsletter #4 - 2023 H1 Recap
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/hvd--aoDjzo
- Engineering Effectiveness Newsletter (June 2023 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/7WG0NNm8HG8
- Firefox DevTools Newsletter - 115 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-115/
- Firefox WebDriver Newsletter - 115 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-115/

#### MDN / Open Web Docs

- **Introducing AI Help: Your Trusted Companion for Web Development | MDN Blog**
  - https://developer.mozilla.org/en-US/blog/introducing-ai-help/
- **Reflections on AI Explain: A postmortem | MDN Blog**
  - https://developer.mozilla.org/en-US/blog/ai-explain-postmortem/
- Scroll progress animations in CSS | MDN Blog
  - https://developer.mozilla.org/en-US/blog/scroll-progress-animations-in-css/
- Securing your CDN: Why and how should you use SRI | MDN Blog
  - https://developer.mozilla.org/en-US/blog/securing-cdn-using-sri-why-how/
- **Maximizing impact of open documentation for the web platform**
  - https://openwebdocs.org/content/posts/open-docs/
- **OWD projects in H1 2023**
  - https://openwebdocs.org/content/posts/owd-projects-h1-2023/

#### Standard Position

- 今月 Close されたものをみる
  - https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2023-07-01+
- **Request for Position: Web Environment Integrity API · Issue #852 · mozilla/standards-positions**
  - https://github.com/mozilla/standards-positions/issues/852
- Request for position update on Web Serial with add-on gating · Issue #847 · mozilla/standards-positions
  - https://github.com/mozilla/standards-positions/issues/847
- Positive: Managed Media Source by padenot · Pull Request #846 · mozilla/standards-positions
  - https://github.com/mozilla/standards-positions/pull/846
- ManagedMediaSource API · Issue #845 · mozilla/standards-positions
  - https://github.com/mozilla/standards-positions/issues/845
- contenteditable="plaintext-only" · Issue #839 · mozilla/standards-positions
  - https://github.com/mozilla/standards-positions/issues/839
- **`dialogmodaltarget` attribute · Issue #834 · mozilla/standards-positions**
  - https://github.com/mozilla/standards-positions/issues/834
- Tabbed web apps · Issue #811 · mozilla/standards-positions
  - https://github.com/mozilla/standards-positions/issues/811

#### Other

- **MDN can now automatically lie to people seeking technical information · Issue #9208 · mdn/yari**
  - https://github.com/mdn/yari/issues/9208
  - AI Help の hallucination が技術ドキュメントにふさわしくないという批判
  - MDN の Steering Commitee にも伝えられず機能が追加されたという情報も
- **Responsibly empowering developers with AI on MDN**
  - https://blog.mozilla.org/en/products/mdn/responsibly-empowering-developers-with-ai-on-mdn/
- **Messaging Layer Security is now an internet standard**
  - https://blog.mozilla.org/en/mozilla/messaging-layer-security-is-now-an-internet-standard/
- Minimum issuance volume for established CAs?
  - https://www.mail-archive.com/dev-security-policy@mozilla.org/msg01382.html

### Safari 動向

#### Stable: 16.6

#### Updates

- Safari 16.6 Beta Release Notes | Apple Developer Documentation
  - https://developer.apple.com/documentation/safari-release-notes/safari-16_6-release-notes
- **Release Notes for Safari Technology Preview 174**
  - https://webkit.org/blog/14390/release-notes-for-safari-technology-preview-174/
  - Added support for `contain-intrinsic-size: auto none` property syntax (265617@main)
  - Added support for WebCodecs temporal scalabilityMode for software codecs, including parsing and error handling (265561@main)
  - Added support for WebM files with no track ID (265425@main)
- **Release Notes for Safari Technology Preview 175**
  - https://webkit.org/blog/14398/release-notes-for-safari-technology-preview-175/
  - Added WebCodecs HEVC support (266044@main)
  - Added support for priority to CSS Highlight API (265812@main)
  - Aligned `<script type language>` with the HTML Standard (265977@main)

#### Standard Positions

- 今月 Close されたものをみる
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2023-07-01+
- **exclusive accordions with `<details name="">` · Issue #209 · WebKit/standards-positions**
  - https://github.com/WebKit/standards-positions/issues/209
- **Removing the zoom CSS property · Issue #170 · WebKit/standards-positions**
  - https://github.com/WebKit/standards-positions/issues/170
- **Content-type in Resource Timing · Issue #88 · WebKit/standards-positions**
  - https://github.com/WebKit/standards-positions/issues/88

#### Other

### Edge 動向

#### Stable: 115

#### Updates

- Sidebar Extensions: Boost your users' productivity with Microsoft Edge Add-ons
  - https://blogs.windows.com/msedgedev/2023/07/20/sidebar-extensions-boost-productivity-edge-add-ons/
- Fighting notification spam in Microsoft Edge
  - https://blogs.windows.com/msedgedev/2023/07/06/fighting-notification-spam-microsoft-edge/

#### Other

- 🎻 Eric Lawrence on Twitter: "https://t.co/SwtGWnHsVe" / X
  - https://twitter.com/ericlaw/status/1685097282452983808
  - Twitter の Web App マニフェストが更新され、アイコンが X になったので Edge がアイコンが変わったけど大丈夫かというポップアップを出した

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
  - Call for Review: WoT Architecture 1.1, Thing Description 1.1 and WoT Discovery are W3C Proposed Recommendations
    - https://www.w3.org/news/2023/call-for-review-wot-architecture-1-1-thing-description-1-1-and-wot-discovery-are-w3c-proposed-recommendations/
  - **Web Content Accessibility Guidelines (WCAG) 2.2 is a W3C Proposed Recommendation**
    - https://www.w3.org/news/2023/web-content-accessibility-guidelines-wcag-2-2-is-a-w3c-proposed-recommendation/
- Candidate Recommendation
- Working Draft
- First Public Working Draft
- Chartering
  - Managed Components Community Group Proposed
    - https://lists.w3.org/Archives/Public/public-new-work/2023Jul/0001.html
    - Managed Components (3rd Party Script を読み込むフォーマット)
    - これをサンドボックス上で読み込むための標準化

#### Other

- Draft Note: Korean Layout Gap Analysis
  - https://www.w3.org/news/2023/draft-note-korean-layout-gap-analysis/
- **Draft Note: Vision for W3C**
  - https://www.w3.org/news/2023/draft-note-vision-for-w3c/
- **Vision for W3C**
  - https://www.w3.org/TR/2023/DNOTE-w3c-vision-20230725/
  - The Web is for all humanity.
  - The Web is designed for the good of its users.
  - The Web must be safe for its users.
  - There is one interoperable world-wide Web.
- **domfarolino/observable**
  - https://github.com/domfarolino/observable
  - EventTarge をベースに Observable をやり直したい
- **WC F2F DOM Parts - Summer 2023 - Google Docs**
  - https://docs.google.com/document/d/1nsY35OMiYVufEXnhHl8v0nPXxvYXfdNBI3XNZws4VYA/preview
  - https://github.com/WICG/webcomponents/issues/999
- **Do we need WCAG 3 (now)? · Eric Eggert**
  - https://yatil.net/blog/do-we-need-wcag-3-now

### TC39 動向

### ES2023

- Release ES2023 · tc39/ecma262
  - https://github.com/tc39/ecma262/releases/tag/es2023
  - `Array.prototype.findFromLast()`
  - Change Array by Copy
  - Hashbang Grammar
  - Symbols as WeakMap keys

#### Meeting

- Meeting Note が公開された時だけやる、それ以外はやらない。

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2023-01-01}...main@{2023-02-01}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->3
- 3->4

#### New Proposals

#### Other

- What's Next for JavaScript: New Features to Look Forward to - The New Stack
  - https://thenewstack.io/whats-next-for-javascript-new-features-to-look-forward-to/

### WinterCG 動向

- Meeting や大きな動きがあった月だけやる

#### Meeting

- 2023-07-06 Meeting · Issue #52 · wintercg/admin
  - https://github.com/wintercg/admin/issues/52
  - 特になし

### IETF 動向

#### WG

- IETF
  - https://datatracker.ietf.org/meeting/
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - **RFC 9440 on Client-Cert HTTP Header Field**
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/GXQmWULq0-sM28WOfA5XjjV0dVQ/
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

- Last Call: draft-ietf-lake-edhoc-20.txt (Ephemeral Diffie-Hellman Over COSE (EDHOC)) to Proposed Standard
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/GnqVhxk6dwhLMnVKtFr8_56NGyY/
- Last Call: draft-ietf-emu-aka-pfs-11.txt (Forward Secrecy for the Extensible Authentication Protocol Method for Authentication and Key Agreement (EAP-AKA' FS)) to Informational RFC
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/pZMAmxf3y5gY2W3igmXqcUbzAtA/
- **Last Call: \<draft-ietf-uuidrev-rfc4122bis-08.txt> (Universally Unique IDentifiers (UUID)) to Proposed Standard**
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/Ke8R-5S8ILtmRRJaakBfoUoFZ6o/
- **Last Call: \<draft-ietf-wish-whip-09.txt> (WebRTC-HTTP ingestion protocol (WHIP)) to Proposed Standard**
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/8tv9mYhoxEF3IPaeGFq_aMzQPZQ/
- **Last Call: \<draft-ietf-jsonpath-base-16.txt> (JSONPath: Query expressions for JSON) to Proposed Standard**
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/cMykgfMBMzGXDFU7FhYGug8V-eI/

### CDN 動向

#### Cloudflare

- **2023 年第 2 四半期インターネットの混乱のまとめ**
  - https://blog.cloudflare.com/ja-jp/q2-2023-internet-disruption-summary-ja-jp/
  - 2023 Q2 に起こったインターネットの混乱を要因ごとにまとめた記事
  - 政府主導の遮断、悪天候、ケーブル損傷、停電、技術的問題、サイバー攻撃、軍事行動、インフラメンテナンスなど
- Cloudflare Radar's new BGP origin hijack detection system
  - https://blog.cloudflare.com/bgp-highjack-detection/
- Measuring the Internet's pulse: trending domains now on Cloudflare Radar
  - https://blog.cloudflare.com/radar-trending-domains/

#### Fastly

#### Other

### セキュリティ動向

### 周辺動向

- **Web ブラウザ開発エンジニア(ゲーム専用機) - ニンテンドーシステムズ株式会社**
  - https://herp.careers/v1/nscareer/ljtoD4vi5j2g
- Bringing HDR video to Reels - Engineering at Meta
  - https://engineering.fb.com/2023/07/17/video-engineering/hdr-video-reels-meta/
- Cross-Platform Mobile App Frameworks in 2023 | Igalia
  - https://www.igalia.com/2023/07/18/Cross-Platform-Mobile-App-Frameworks-in-2023.html
  - mobile cross platform 開発のフレームワークを調査したペーパー
  - Capacitor, React Native, NativeScript, Flutter, and Ark を比較
- **Unpacking Google's new "dangerous" Web-Environment-Integrity specification**
  - https://vivaldi.com/blog/googles-new-dangerous-web-environment-integrity-spec/
- Happy 50th birthday, Ethernet | APNIC Blog
  - https://blog.apnic.net/2023/06/29/happy-50th-birthday-ethernet/

### イベント

- 7 月
  - IETF | IETF 117 San Francisco
    - https://www.ietf.org/how/meetings/117/
- 8 月
- 9 月
  - 7: WEB+DB PRESS 創刊 22.9 周年パーティ(副題 うまい肉と IPA) - connpass
    - https://connpass.com/event/285724/
  - 11-15: TPAC 2023
    - https://www.w3.org/2023/09/TPAC/
  - 26-28: W3C Workshop Secure the Web Forward
    - https://www.w3.org/2023/03/secure-the-web-forward/

### Wrap Up

- Chrome
  - 115
    - Scroll driven animations
    - Privacy Sandbox Ads API
  - 116 Beta
    - display and content-visibility animations
    - BFCache NotRestoredReason API
    - Document PiP
    - Wildcards in Permission-Policy origins
  - Ship
    - Array grouping
    - BFCache NotRestoredReason API
    - prefers-reduced-transparency
    - Permissions-Policy: unload
  - Prototype
    - CSS CJK enhancements (text-autospace, line breaking)
    - Screen Capture enhancements (Captured Surface Control, Element Capture)
    - fetchLater()
  - Experiment
    - Compression dictionary transport with Shared Brotli
    - HTTPS Upgrades
    - ServiceWorker static routing API
    - Zstd Content-Encoding
  - web.dev
    - Yahoo Japan BFCache
  - other blogs
    - Chrome's security review culture
  - other
    - Web Environment Integrity on fire
- Firefox
  - 115
    - link rel=modulepreload
    - Array.fromAsync()
    - Change array by copy
    - URL.canParse()
  - Ship
    - RTCRtpScriptTransform (Insertable Streams)
  - MDN Blog
    - Responsibly empowering developers with AI on MDN
  - other
    - MDN AI に関する批判 issue
    - Messaging Layer Security is now an internet standard
- Safari
  - TP174
    - `contain-intrinsic-size: auto none`
    - WebCodecs temporal scalabilityMode for software codecs, including parsing and error handling
    - WebM files with no track ID
  - TP175
    - WebCodecs HEVC support
    - support for priority to CSS Highlight API
    - Aligned `<script type language>` with the HTML Standard (265977@main)
  - Position
    - exclusive accordions with `<details name="">`
    - Removing the zoom CSS property
    - Content-type in Resource Timing
- Edge
- W3C/WHATWG
  - Spec
    - WCAG 2.2 is a W3C Proposed Recommendation
  - other
    - Vision for W3C
    - domfarolino/observable
    - WC F2F DOM Parts - Summer 2023 - Google Docs
    - Do we need WCAG 3 (now)? · Eric Eggert
- TC39
- WinterCG
- IETF
  - RFC9440 Client-Cert HTTP Header Field
  - WebRTC-HTTP ingestion protocol Last Call
  - JSONPath Last Call
- CDN 動向
  - 2023 年第 2 四半期インターネットの混乱のまとめ
- セキュリティ動向
- 周辺動向
  - ニンテンドーでブラウザ開発者募集
  - Vivaldi から WEI へのコメント
