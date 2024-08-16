---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep89.mp3
published_at: 2021-10-26
guest: [@myakura](https://twitter.com/myakura)
---

# ep89 Monthly Web 202110

## Theme

第 89 回のテーマは 2021 年 10 月の Monthly Web です。

## Show Note

### Chrome 動向

#### Stable: 95

#### Updates

- **Chromium Blog: Chrome 96 Beta: Conditional Focus, Priority Hints, and More**
  - https://blog.chromium.org/2021/10/chrome-96-beta-conditional-focus.html
  - **Preparing for a Three Digit Version Number**
  - Origin Trials
    - New Origin Trials
      - Conditional Focus
      - Priority Hints
  - Other Features in this Release
    - **Allow Simple Range Header Values Without Preflight**
    - **Back-forward Cache on Desktop**
    - **Cross-Origin-Embedder-Policy: credentialless**
    - CSS
      - :autofill Pseudo Class
      - Disable Propagation of Body Style to Viewport when Contained
      - font-synthesis Property
    - EME MediaKeySession Closed Reason
    - **HTTP to HTTPS Redirect for HTTPS DNS Records**
    - InteractionID in EventTiming
    - **New Media Query: prefers-contrast**
    - Unique id for Desktop PWAs
    - URL Protocol Handler Registration for PWAs
    - WebAssembly
      - Content Security Policy
      - Reference Types
  - Deprecations and Removals
    - The "basic-card" Method of PaymentRequest API
- **Deprecations and removals in Chrome 96 - Chrome Developers**
  - https://developer.chrome.com/en/blog/deps-rems-96/
  - The "basic-card" method of PaymentRequest API
  - Chrome 96: The basic-card method is deprecated in the Reporting API.
  - Chrome 100: The basic-card method will be removed.
- **New in Chrome 95 - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-chrome-95/
  - Routing with URLPattern
  - Picking colors with the Eye Dropper API
  - PWA Summit
  - User-agent reduction origin trial

#### Intents

- Ship: App Shortcuts Menu (Mac/Linux)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nTgQWwKT1Ss
- Ship: App Shortcuts Menu
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FgzYX7AFbUQ
- Ship: Array and TypedArray findLast and findLastIndex
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/r6yl8pfmf9s
- Ship: COLRv1 Color Gradient Vector Fonts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kDfj3rcA6sc
- **Ship: CORS non-wildcard request-header**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yXxYCo3ytQU
- Ship: CSS font-synthesis property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vnWtdEDa61k
- Ship: Do not invert selection background color when it matches text color
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OzgkJXjxpGs
- Ship: HDR CSS Media Queries
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OpUsOWnnN6c
- **Ship: Independent/Individual Properties for CSS Transforms**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hu8e23c7tzg
- **Ship: Late newline normalization in form submission**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XULXQrbFznw
  - https://blog.whatwg.org/newline-normalizations-in-form-submission
  - form submit 時の CRLF の正規化が 2 段階あり form-url-encode だけ二回実施されていた
  - 全エンコーディングで 1 段階になるように修正
- Ship: New Canvas 2D API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZpDFeQeLTrg
- Ship: PWA manifest unique id - desktop
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oDs8gWeuRiw
- Ship: URL Protocol Handler Registration for PWAs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qKj5nz1OGKE
- Ship: Window Controls Overlay for Installed Desktop Web Apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/guI1QCPJTAA
- Ship: [WebAuthn] Authenticator Attachment in Public Key Credential
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-ZGzT6ci1LU
- Ship: interactionID in Event Timing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/a5cInmNh0Ro
- Implement and Ship : onsecuritypolicyviolation event handler IDL attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dscqiFc-iJA
- Implement and Ship: Add support for Promise to Blobs in clipboard item
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8z0qWJ5Fztc
- **Implement and Ship: Allow simple Range header values without preflight**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0f1zQ4hjoyQ
- Implement and Ship: Feature policy for Keyboard API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SJD5Z4_E5TQ
- **Implement and Ship: transform: perspective(none)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qbFBtbzuW2Q
- **Implement: Import maps, basic support**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qYeQFqgFOyA
- Prototype: Region Capture
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dib14W1B0Xc
- **Prototype: User-Agent Client Hints GREASE Update**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ueudFsZzT1M
- Prototype: Web app handle links
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fXASFrrFnps
- Prototype: Web app scope extensions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-iySPmw8o34
- **Ready for Trial: Block external protocol in sandboxed iframe**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yF9j_5gxLgo
- **Experiment: Auto Dark Mode & the CSS color-scheme "only" keyword**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/E29o9uJ8VRs
- Experiment: Digital Goods API v2.0
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wIYqo3F_Vmo
- Experiment: Region Capture
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yFUX0KfuUlo
- Experiment: WebAssembly Dynamic Tiering
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Xzr6PQflTFA
- Extend Experiment: Storage Foundation API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/enA3o1UvzcE
- Extend Origin Trial: Conversion Measurement API (Attribution Reporting API)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DdjaFmsb4fA
- Extend Origin Trial: Early Hints preload/preconnect during Navigation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nHoJYuUf9W8
- Extend Origin trial: WebTransport over HTTP/3
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JHZLOnRkRhk
- Deprecate: WebRTC's Plan B SDP semantics
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IY2amIigFFs
- Call for Lightning Talks at BlinkOn15!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/y4te95Sj7wE
- PSA: Readable Byte Streams updates in Blink Implementation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zNzQ3PwZ8yA
- PSA: Renamed debug helper functions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5Y6EkkTJa_I
- [BlinkOn 15] Action required: Call for content: Breakout Talks
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uoiH4Yy5JnQ
- [blink-dev] Action Required: BlinkOn 15 Registration and Call for Content REMINDER!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wfd_6GPXVJc
- BlinkOn 15 - The Chromium Projects
  - https://www.chromium.org/events/blinkon-15
  - https://docs.google.com/spreadsheets/d/1FzxhGtmfaEP_yO8ePmWoYuvFS0qk44hQA5Mui06E9Rk/edit#gid=0
- [RESPONSE REQUESTED] What's in Chrome 96?
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Hxa-am41JLw
- [blink-dev] Action Required: You're invited to BlinkOn 15 in 2H 2021!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rhGCyw8aO5o
- [blink-dev] Intent to Ship: Standardize existing client hint naming
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Y42bZ66L6Zo
- [blink-dev] UPDATE... PLEASE READ: NEW DATES, Registration and Call for Content!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ITrieVlnyys
- Remove:
  - https://bit.ly/blinkintents
  - https://groups.google.com/a/chromium.org/forum/#!forum/blink-dev

#### V8

- V8 release v9.6 - V8
  - https://v8.dev/blog/v8-release-96

#### Other

- web.dev
  - **Optimizing resource loading with Priority Hints**
    - https://web.dev/priority-hints/
    - `importance` 属性による優先度制御の話
  - Assessing loading performance in the field with Navigation Timing and Resource Timing
    - https://web.dev/navigation-and-resource-timing/
  - **Monitor your web application with the Reporting API**
    - https://web.dev/reporting-api/
    - `Reporting-Endpoints` をデプロイする話
  - **Migrate to Reporting API v1**
    - https://web.dev/reporting-api-migration/
    - `Report-To` (v0) から `Reporting-Endpoints` (v1) に移行する話
    - その前は report-uri 属性だった
  - Building a multi-select component
    - https://web.dev/building-a-multi-select-component/
  - How Renault improved its bounce and conversion rates by measuring and optimizing Largest Contentful Paint
    - https://web.dev/renault/
  - **Safe DOM manipulation with the Sanitizer API**
    - https://web.dev/sanitizer/
    - DOMPurify 的なサニタイズ処理の標準化 API
  - **Best practices for using third-party embeds**
    - https://web.dev/embed-best-practices/
- google developer blog
  - Extend Google Apps Script with your API library to empower users
    - https://developers.googleblog.com/2021/10/extend-google-apps-script-with-your-api.html
  - **Announcing DevFest 2021**
    - https://developers.googleblog.com/2021/10/announcing-devfest-2021.html
  - "Bowling" automatic disapproved ads remover
    - https://developers.googleblog.com/2021/10/Bowling-automatic-disapproved-ads-remover.html
  - **Announcing the Google Forms API**
    - https://developers.googleblog.com/2021/10/announcing-google-forms-api_01768004272.html
  - Google OAuth incremental authorization improvement
    - https://developers.googleblog.com/2021/10/granular-google-account-update.html
  - What is Google's Dev Library -- a new open-source platform for developers
    - https://developers.googleblog.com/2021/10/what-is-the-dev-library.html
- google developer japan blog
  - **DevFest 2021 が日本各地で開催されます**
    - https://developers-jp.googleblog.com/2021/10/devfest21.html
    - DevFest Tokyo 2021 2021/12/11
  - ユーザーのウェブ検索と重要なタスクの継続をサポートする Chrome の試験機能について
    - https://developers-jp.googleblog.com/2021/10/chrome01243979301.html
  - Chrome のメモリの安全性に関するアップデート
    - https://developers-jp.googleblog.com/2021/10/chrome.html
  - **Chrome 95 ベータ版: Secure Payment Confirmation 、 WebAssembly の例外ハンドリングなど**
    - https://developers-jp.googleblog.com/2021/10/chrome-95-webassembly.html
  - Web Stories の行動喚起ボタンをアップグレード
    - https://developers-jp.googleblog.com/2021/10/web-stories.html
- chrome developer blog
  - **Auto Dark Theme - Chrome Developers**
    - https://developer.chrome.com/en/blog/auto-dark-theme/
  - **RenderingNG deep-dive: LayoutNG - Chrome Developers**
    - https://developer.chrome.com/en/blog/layoutng/
  - The Chromium Chronicle #25: Thread Safety Annotations - Chrome Developers
    - https://developer.chrome.com/en/blog/chromium-chronicle-25/
  - Progress in the Privacy Sandbox (September 2021) - Chrome Developers
    - https://developer.chrome.com/en/blog/progress-in-the-privacy-sandbox-2021-09/
  - Chrome Web Store policy updates for Q3 2021 - Chrome Developers
    - https://developer.chrome.com/en/blog/policy-update-kwspam-and-circumvention/
- chromium blog
  - **Chromium Blog: Sunsetting the "basic-card" payment method in the Payment Request API**
    - https://blog.chromium.org/2021/10/sunsetting-basic-card-payment-method-in.html
  - Chromium Blog: Extending Chrome App Support on Chrome OS
    - https://blog.chromium.org/2021/10/extending-chrome-app-support-on-chrome.html
  - **Chromium Blog: RenderingNG: an architecture that makes and keeps Chrome fast for the long term**
    - https://blog.chromium.org/2021/10/renderingng.html
  - Chromium Blog: Helping users explore the web and continue prior tasks
    - https://blog.chromium.org/2021/10/helping-users-explore-web-and-continue.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- Aligning Search Console testing tools and the URL Inspection tool
  - https://developers.google.com/search/blog/2021/10/search-console-tools-alignment
- **Google 検索、 Internet Explorer の公式サポートを終了 - iPhone Mania**
  - https://iphone-mania.jp/news-407777/
  - https://twitter.com/cramforce/status/1443962459723755533
- **長くいたチームから移る日のこと | Kinuko Yasuda | note**
  - https://note.com/kinuko/n/n49b10ae1487c
- **ImperialViolet - Phones as security keys in Chrome**
  - https://www.imperialviolet.org/2021/10/20/cablev2.html
- Postpone SAB deprecation trial to Chrome 103 (#1576)
  - https://github.com/GoogleChrome/developer.chrome.com/commit/b53c9ee805ad9afac170bd67708155fb529134aa
- PWA Summit, October 6-7
  - https://pwasummit.org/

### Firefox 動向

#### Stable: 93

#### Updates

- **Firefox 93 features an improved SmartBlock and new Referrer Tracking Protections - Mozilla Security Blog**
  - https://blog.mozilla.org/security/2021/10/05/firefox-93-features-an-improved-smartblock-and-new-referrer-tracking-protections/
- **Firefox 93 protects against Insecure Downloads - Mozilla Security Blog**
  - https://blog.mozilla.org/security/2021/10/05/firefox-93-protects-against-insecure-downloads/
- **Securing Connections: Disabling 3DES in Firefox 93 - Mozilla Security Blog**
  - https://blog.mozilla.org/security/2021/10/05/securing-connections-disabling-3des-in-firefox-93/
- **Lots to see in Firefox 93! - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2021/10/lots-to-see-in-firefox-93/
  - AVIF Image Support
  - Static initialization blocks
  - Custom Elements & Shadow DOM
- **Tab Unloading in Firefox 93 - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2021/10/tab-unloading-in-firefox-93/
- Implementing form filling and accessibility in the Firefox PDF viewer - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2021/10/implementing-form-filling-and-accessibility-in-the-firefox-pdf-viewer/
- These Weeks in Firefox: Issue 101 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2021/09/30/these-weeks-in-firefox-issue-101/
- These Weeks in Firefox: Issue 102 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2021/10/21/these-weeks-in-firefox-issue-102/

#### Intents

- Prototype: Prioritized Scheduling API
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/QlRjFA6XiZY
- **Prototype: URL Query String Stripping**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/1vOSas0ptVQ
  - Facebook の fbclid のような追跡クエリを自動で削除する機能のプロトタイプ
  - ブロックリストで管理
- **Prototype and ship: input-security css property**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/vikcWAyyAnc
  - `input-security: none;` で `<input type=password>` が User Visible になる
- Prototype and ship: Implement self.structuredClone()
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/VLCUezPWGS4
- **Unship: Cache clearing via the Clear-Site-Data header**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/I939w1yrTp4
  - サイト上の Cross Origin なキャッシュも含めて消せる機能を削除
  - storage partition されている場合にそれをまたぐことになる
  - 消せるのが cookie, storage のみに絞られる
- Incoming production taskcluster livelog SSL cert fix: Sat 9 Oct
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/B-y74IRU4hI
- Engineering Effectiveness Newsletter (September 2021 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/8I0z45_0Xoo
- PSA: Renaming `taskcluster/taskgraph` -> `taskcluster/gecko_taskgraph`
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/k5emLfxmEMQ
- **In-browser annotation**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/NXvLZHeIqQw
  - ページ中の特定の選択へのメモみたいなものを実現したい
  - Scroll-to-Text Fragment を拡張して実現する方式
  - Mosaic のころから繰り返されている話
- Soft code freeze for Firefox 94 starts September 30
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/-T1zpAhVZOk

#### Other

- Hacked! Unravelling a data breach - The Mozilla Blog
  - https://blog.mozilla.org/en/internet-culture/hacked-unravelling-a-data-breach/
- How does HTTPS protect you (and how doesn't it?) - The Mozilla Blog
  - https://blog.mozilla.org/en/products/firefox/https-protect/
- News from Firefox Focus and Firefox on Mobile
  - https://blog.mozilla.org/en/mozilla/news/news-from-firefox-focus-and-firefox-on-mobile/
- **Analysis of Google's Privacy Budget Proposal**
  - https://blog.mozilla.org/en/mozilla/google-privacy-budget-analysis/
- Superhero passwords may be your kryptonite wherever you go online
  - https://blog.mozilla.org/en/mozilla/news/superhero-passwords-may-be-your-kryptonite-wherever-you-go-online/

### Safari 動向

#### Stable: 15.0

#### Updates

- Release Notes for Safari Technology Preview 133
  - https://webkit.org/blog/11975/release-notes-for-safari-technology-preview-133/
  - CSS
- **Added support for self-start, self-end, start, end, left, and right values in positional alignment (r282267, r282078, r281840)**
- Added support for percentages in the scale() transform functions, and the scale property (r282144)
- **Added support for sin(), cos(), tan(), e, and pi in calc() (r282162)**
- CSS Cascade Layers
- Added initial support for CSS Cascade Layers in Experimental Features:
  - Added support for computing the order correctly for late added sublayers (r281798)
  - Supported layer argument in @import rules (r281928)
- CSS Font Loading API
- Updated the implementation of the CSS Font Loading API to be closer to the spec and other browsers:
- Accessibility
  - Fixed blank braille display in contenteditable elements when the field is followed by another element (r281920)
  - Made PDFs loaded via `<embed>` accessible (r282358)
- JavaScript
- **Enabled Object.hasOwn (r281835)**
- **Implemented Temporal.PlainTime behind the flag `--useTemporal=1` (r282125)**
- **Implemented Temporal.TimeZone behind the flag `--useTemporal=1` (r282018)**
- **Implemented Temporal.Duration behind the flag `--useTemporal=1` (r281838)**
- **Implemented `self.structuredClone()` (r281808)**
- **Implemented `Object.hasOwn()` (r281799)**
- Web API
  - **Added basic support for Storage API (r282130)**
  - Added support for ServiceWorkerGlobalScope.serviceWorker (r281854)
  - Added handling for non-fully active documents in `navigator.share()` / `navigator.canShare()` (r282282)
  - **Enabled `Cross-Origin-Opener-Policy` / `Cross-Origin-EmbedderPolicy` headers support (r282105, r282246)**
  - **Enabled SharedArrayBuffer support when COOP/COEP headers are used (r281832)**
  - Fixed scrollbars on pointer-events: none element still intercepting events (r281991)
  - Implemented top-origin and frame-origin partitioning for BroadcastChannel (r282105)
  - Implemented navigation reporting for Cross-Origin-Opener-Policy (r282305)
  - Implemented getClientRects() for SVG elements (r282316)
  - Updated to always fetch the first manifest if provided (r282026)
- WebRTC
  - Added support for RTCError and RTCErrorEvent (r282199)
  - Added support for RTCDataChannel closing event (r282198)
  - Added support for RTCSctpTransport (r282197)
- Media
  - Fixed an incorrect number of frames returned if the decoding frame rate doesn't match the original in WebM (r282196)
  - Removed Web Audio `canPlayType()` workaround that made it reports false negatives (r282137)
- Web and App Extensions
  - Added the extension's icon to extension URL tabs for both app and web extensions
  - Added the extension name as the title of tabs when an app extension page and does not specify a title

#### Position

- **[webkit-dev] Request for position: WEBRTC-SVC**
  - https://lists.webkit.org/pipermail/webkit-dev/2021-October/032007.html

#### Other

- **Add support for ServiceWorkerGlobalScope push event handler**
  - https://trac.webkit.org/changeset/283438/webkit
  - Service Worker の push イベント実装

### Edge 動向

#### Stable: 95

#### Updates

- **Improved authoring and debugging experiences in Microsoft Edge DevTools and Visual Studio Code**
  - https://blogs.windows.com/msedgedev/2021/10/21/improved-authoring-debugging-devtools-visual-studio-code/
- **Learn to build great Progressive Web Apps**
  - https://blogs.windows.com/msedgedev/2021/10/19/pwa-summit-learn-progressive-web-apps-documentation/
- Improving how Microsoft Edge processes appear in Task Manager
  - https://blogs.windows.com/msedgedev/2021/10/12/improving-edge-processes-task-manager/
- **Save time by automatically filling your addresses and credit cards with Microsoft Autofill | Windows Experience Blog**
  - https://blogs.windows.com/windowsexperience/2021/10/18/save-time-by-automatically-filling-your-addresses-and-credit-cards-with-microsoft-autofill/

#### Chakra

#### Other

- **Windows 11 の仕様とシステム要件 | Microsoft**
  - https://www.microsoft.com/ja-jp/windows/windows-11-specifications
  - > Windows 11 では Internet Explorer 11 デスクトップアプリケーションに代わり、 Microsoft Edge の IE モードが導入されます。
- **Bug bounty hunter to working at Microsoft | Microsoft Browser Vulnerability Research**
  - https://microsoftedge.github.io/edgevr/posts/bug-bounty-hunter-to-working-at-microsoft/
- Spooky: Enhancing Dark Mode in Chromium - text/plain
  - https://textslashplain.com/2021/10/17/spooky-enhancing-dark-mode-in-chromium/
- MoarTLS: Non-Secure Download Blocking - text/plain
  - https://textslashplain.com/2021/10/14/moartls-non-secure-download-blocking/
- Accessibility (UIA) Troubleshooting - text/plain
  - https://textslashplain.com/2021/10/12/accessibility-uia-troubleshooting/
- Practical Time Machines - text/plain
  - https://textslashplain.com/2021/10/01/practical-time-machines/
- **vscode.dev**
  - https://code.visualstudio.com/blogs/2021/10/20/vscode-dev

### WHATWG/W3C 動向

#### Draft

- Recommendation
  - **DOM Review Draft Published 15 June 2020 is a W3C Recommendation**
    - https://www.w3.org/blog/news/archives/9262
- Proposed Recommendation
  - Call for Review: Payment Request API and Payment Method Identifiers are W3C Proposed Recommendations
    - https://www.w3.org/blog/news/archives/9269
  - Call for Review: ARIA in HTML is a W3C Proposed Recommendation
    - https://www.w3.org/blog/news/archives/9272
- Candidate Recommendation
  - W3C Invites Implementations of CSS Multi-column Layout Module Level 1
    - https://www.w3.org/blog/news/archives/9277
- Working Draft
- First Public Working Draft
  - Updated Candidate Recommendation: Media Capture and Streams
    - https://www.w3.org/blog/news/archives/9280
  - First Public Working Draft: Media Source Extensions (TM)
    - https://www.w3.org/blog/news/archives/9265
  - First Public Working Draft: Synchronization Accessibility User Requirements
    - https://www.w3.org/blog/news/archives/9260
- Chartering
  - Call for Participation: Spatial Data on the Web Working Group Charter Approved; Join SDW WG
    - https://lists.w3.org/Archives/Public/public-new-work/2021Oct/0007.html
  - **Private Advertising Technology Community Group created**
    - https://lists.w3.org/Archives/Public/public-new-work/2021Oct/0006.html
  - Private Advertising Technology Community Group Proposed
    - https://lists.w3.org/Archives/Public/public-new-work/2021Oct/0005.html
  - Decentralized Identifier Working Group charter extended until 31 December 2021 (Fwd)
    - https://lists.w3.org/Archives/Public/public-new-work/2021Oct/0003.html
  - Web Application Security Working Group charter extended until 31 December 2021 (Fwd)
    - https://lists.w3.org/Archives/Public/public-new-work/2021Oct/0002.html
  - Web Applications Working Group charter extended until 31 December 2021 (Fwd)
    - https://lists.w3.org/Archives/Public/public-new-work/2021Oct/0001.html
  - [wbs] response to 'Call for Review: Web Authentication Working Group Charter'
    - https://lists.w3.org/Archives/Public/public-new-work/2021Oct/0000.html
  - Call for Participation: Internationalization Working Group and Interest Group Charters Approved; Join i18n Groups
    - https://lists.w3.org/Archives/Public/public-new-work/2021Sep/0009.html

#### Other

- **TPAC privacy and security related meetings (fwd)**
  - https://lists.w3.org/Archives/Public/public-webappsec/2021Oct/0005.html
- W3C Strategic Highlights, October 2021
  - https://www.w3.org/blog/news/archives/9295
- WebAppSec Teleconference Agenda
  - https://lists.w3.org/Archives/Public/public-webappsec/2021Oct/0003.html
- W3C and Yubico offer first online Web Authentication course for developers
  - https://www.w3.org/blog/news/archives/9282
- **Hacktober fest spam 2021**
  - https://twitter.com/domenic/status/1444103114072727553?s=20
  - https://github.com/Jxck/html2json/pull/44

### TC39 動向

#### Meeting

- 2021-10
  - https://github.com/tc39/agendas
  - https://github.com/tc39/notes

#### Proposals Diff

- https://github.com/tc39/proposals/compare/master@{2021-10-01}...master@{2021-11-01}
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
  - Protocol Action: 'The Proxy-Status HTTP Response Header Field' to Proposed Standard (draft-ietf-httpbis-proxy-status-08.txt)
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0055.html
  - **Advertising WebSocket support in the HTTPS resource record**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0052.html
  - I-D Action: draft-ietf-httpbis-rfc6265bis-09.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0051.html
  - **WGLC for Targeted HTTP Cache Control**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0044.html
  - I-D Action: draft-ietf-httpbis-targeted-cache-control-02.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0043.html
  - Registration request for the Configuration-Context field
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0041.html
  - I-D Action: draft-ietf-httpbis-proxy-status-08.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0040.html
  - cookie-radius / http-equiv="cookie"
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0034.html
  - Media type parameters optional between semicolons
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0027.html
  - Standard for upgrading based on URL?
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0020.html
  - I-D Action: draft-ietf-httpbis-proxy-status-07.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0018.html
  - Distributed Origins and Alt-Svc
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0012.html
  - [Editorial Errata Reported] RFC7616 (6704)
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0005.html
  - **WGLC for HTTP Priorities**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0004.html
  - Weekly github digest (HTTP Activity Summary)
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0003.html
  - I-D Action: draft-ietf-httpbis-priority-06.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021OctDec/0000.html
  - **DRAFT minutes for the Interim**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0459.html
    - https://httpwg.org/wg-materials/interim-21-09/minutes.html
  - HTTP Experiments: a bit of housekeeping (moving documents to Historic)
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0458.html
  - **Working Group Last Call: Bootstrapping WebSockets with HTTP/3**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0456.html
  - TCP RST code for websockets in h3
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0454.html
  - Reminder: interim in ~12 hours
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0447.html
  - Publication has been requested for draft-ietf-httpbis-http2bis-05
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0446.html
  - I-D Action: draft-ietf-httpbis-digest-headers-06.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0445.html
  - **draft-damjanovic-websockets-https-rr-00 - Advertising WebSocket support in the HTTPS resource record**
    - https://datatracker.ietf.org/doc/draft-damjanovic-websockets-https-rr/
- quicwg
  - https://mailarchive.ietf.org/arch/browse/quic/
  - https://github.com/quicwg/wg-materials
  - draft-ietf-quic-bit-grease-01 - Greasing the QUIC Bit
    - https://datatracker.ietf.org/doc/draft-ietf-quic-bit-grease/
  - draft-dawkins-sdp-rtp-quic-questions-00 - SDP Offer/Answer for RTP using QUIC as Transport - Design Questions
    - https://datatracker.ietf.org/doc/draft-dawkins-sdp-rtp-quic-questions/
  - draft-retana-idr-bgp-quic-stream-00 - Use of Streams in BGP over QUIC
    - https://datatracker.ietf.org/doc/draft-retana-idr-bgp-quic-stream/
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

- **Secure Credential Transfer**
  - https://www.ietf.org/archive/id/draft-secure-credential-transfer-01.html

### CDN 動向

#### Cloudflare

- Multi-User IP Address Detection
  - https://blog.cloudflare.com/multi-user-ip-address-detection/
- Privacy-Preserving Compromised Credential Checking
  - https://blog.cloudflare.com/privacy-preserving-compromised-credential-checking/
- Research Directions in Password Security
  - https://blog.cloudflare.com/research-directions-in-password-security/
- Cloudflare and the IETF
  - https://blog.cloudflare.com/cloudflare-and-the-ietf/
- Exported Authenticators: The long road to RFC
  - https://blog.cloudflare.com/exported-authenticators-the-long-road-to-rfc/
- Privacy Pass v3: the new privacy bits
  - https://blog.cloudflare.com/privacy-pass-v3/
- **What happened on the Internet during the Facebook outage**
  - https://blog.cloudflare.com/during-the-facebook-outage/
- Understanding How Facebook Disappeared from the Internet
  - https://blog.cloudflare.com/october-2021-facebook-outage/
- **Web3 - A vision for a decentralized web**
  - https://blog.cloudflare.com/what-is-web3/
- A Better Internet with UN Global Compact
  - https://blog.cloudflare.com/cloudflare-and-un-global-compact/

#### Fastly

#### Other

### セキュリティ動向

- **Help thread for DST Root CA X3 expiration (September 2021) - Help - Let's Encrypt Community Support**
  - https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190
- Root Certificate Program - Apple
  - https://www.apple.com/certificateauthority/ca_program.html
- **Revisiting BetterTLS: Certificate Path Building | by Netflix Technology Blog**
  - https://netflixtechblog.com/revisiting-bettertls-certificate-path-building-4c978b79843f
- **WIP: master QUIC support by tmshort - Pull Request #8797 - openssl/openssl**
  - https://github.com/openssl/openssl/pull/8797

### 周辺動向

- **Facebook が落ちた話**
  - Understanding How Facebook Disappeared from the Internet
    - https://blog.cloudflare.com/october-2021-facebook-outage/
  - Update about the October 4th outage - Facebook Engineering
    - https://engineering.fb.com/2021/10/04/networking-traffic/outage/
  - More details about the October 4 outage - Facebook Engineering
    - https://engineering.fb.com/2021/10/05/networking-traffic/outage-details/
  - Facebook がダウンしたが、単なるサーバのダウンと言うより、 Facebook 自体がインターネット上から消えたという珍しい現象だった
  - DC のメンテナンスのために一部をオフラインにするコマンドを発行したところ、評価ツールの投げた危険なコマンドが、監査ツールのバグをすり抜けて実行された。
  - 結果 DC 全体がオフラインになり、ネットワークから切断された。
  - そこで DNS も DC にアクセスできないため、縮退のため BGP のアドバタイズを取りやめ、結果 Facebook がインターネット上から完全に隔離された
  - DNS に繋がらなくなった結果、あらゆるツールが動かなくなり検証もままならなくなり、リモート接続ができないため、復旧も難しくなった。
  - DC のセキュリティが高いため、物理的なアクセスも難しく、ハードウエアは手作業による変更も難しくできているため、難易度が高かった。
  - 急に全部を戻すとスパイクによって新たなクラッシュが起こることもわかっていた。
  - 普段から "strom" という訓練をしていたため、大規模障害を模したストレステストを走らせる準備はできていた。
  - 結果、なんとかもとに戻した。
  - こうした事象のシミュレート方法も模索して今後に活かしたい。
- **Web のルビ仕様にはアクセシビリティを阻害している面がある。「日本 DAISY コンソーシアム」が改善を求めてブラウザベンダ、 WHATWG 、 W3C らに公開書簡 - Publickey**
  - https://www.publickey1.jp/blog/21/webdaisywhatwgw3c.html
  - https://www.normanet.ne.jp/~jdc/tech/index.html
  - https://www.youtube.com/watch?v=S4xE8hCOmK8
- **The State of CSS 2021 Survey is Now Open**
  - https://dev.to/sachagreif/the-state-of-css-2021-survey-is-now-open-167n

### イベント

- 11 月
  - 6-12: IETF112 Online
    - https://www.ietf.org/how/meetings/112/
  - 16-18: BlinkOn 15
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/w1ChUGMhO58/m/_6mgHrfgAwAJ
    - BlinkOn 15 - The Chromium Projects
      - https://www.chromium.org/events/blinkon-15
      - https://docs.google.com/spreadsheets/d/1FzxhGtmfaEP_yO8ePmWoYuvFS0qk44hQA5Mui06E9Rk/edit#gid=0
  - 25-28: TC39 86th
    - https://github.com/tc39/agendas/blob/master/2021/10.md

### Wrap Up

- Chrome
  - 3 digit version number
  - Simple Range Header without Preflight
  - BFCache on Desktop
  - COEP credentialless
  - HTTPS DNS Records
  - Ship: Non wildcard request header
  - Ship: Late new line normalization
  - Proto: UA-CH Grease Update
  - Exp: Auto Dark Mode
  - Rendering/Layout NG
  - Google Search IE Support 終了
- Firefox
  - Referrer Tracking Protection
  - 3DES 終了
  - AVIF Support
  - Proto: URL Query Stripping
  - Proto: input-security: none/auto
  - Unship: Clear-Site-Data: cache
  - In Browser Annotation
- Safari
  - hasOwn
  - Temporal
  - Storage API
  - COOP/COEP + Shared Array Buffer 復活
  - Web Push 実装開始
- Edge
  - VSCode + DevTools Debuggability
  - vscode.dev
- W3C
  - Private Ads Technology CG
  - TPAC now
- TC39
- IETF
  - WebSocket in HTTP RR Record
  - WGLC: Target Cache-Control
  - WGLC: HTTP Priorities
  - WGLC: WebSocket over H3
- CDN
  - Web3
- Security
  - Let's Encrypt Root Expiration
  - Openssl QUIC Support Discussion
- Other
  - Facebook Disconnected from Internet
  - Web のルビと a11y
  - State of CSS 2021
