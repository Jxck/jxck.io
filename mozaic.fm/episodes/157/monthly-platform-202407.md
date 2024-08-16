---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep157.mp3
published_at: 2024-07-31
guest: [@myakura](https://twitter.com/myakura)
---

# ep157 Monthly Platform 202407

## Theme

第 157 回のテーマは 2024 年 7 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 127

#### Updates

- **New in Chrome 127**
  - https://developer.chrome.com/blog/new-in-chrome-127
  - CSS font-size-adjust
  - Document picture-in-picture: propagate user activation
  - Keyboard focusable scroll containers.
- **What's new in DevTools, Chrome 127**
  - [https://developer.chrome.com/blog/new-in-devtools-127](https://developer.chrome.com/blog/new-in-devtools-127?hl=en)
  - Inspect CSS anchor positioning in the Elements panel
  - Sources panel improvements
    - Enhanced 'Never Pause Here'
    - New scroll snap event listeners
  - Network panel improvements
    - Updated network throttling presets
    - Service worker information in custom fields of the HAR format
  - Send and receive WebSocket events in the Performance panel
- What's New in WebGPU (Chrome 127)
  - https://developer.chrome.com/blog/new-in-webgpu-127
- **Chrome 128 beta**
  - https://developer.chrome.com/blog/chrome-128-beta
  - CSS
    - CSS ruby-align property
    - Line-breakable ruby
    - Minimum size of `<option>` within `<select>` dropdown
    - Standardized CSS zoom property
  - Web APIs
    - Additions to Attribution Reporting
    - AudioContext.onerror
    - Cross-site ancestor chain bit for CookiePartitionKey of partitioned cookies
    - document.caretPositionFromPoint
    - PointerEvent.deviceProperties for Multi-Pen Inking
    - Private Aggregation API: client-side contribution merging
    - Promise.try
    - SkipAd media session action
    - WebAuthn hints
    - Write image/svg+xml content in UTF-8 format on Windows
    - Web Share API on macOS
  - New origin trials
    - Deprecate 0.0.0.0 for Private Network Access (PNA)
    - Digital Credentials API
    - FedCM multiple identity providers in single get() call
    - FedCM: Button Mode for Chrome on Android
    - FedCM: Continuation API bundle for Chrome on Android
    - Disable standardized CSS zoom
    - WebGPU Subgroups experimentation
  - Deprecations and removals
    - There are no deprecations or removals planned for Chrome 128.

#### Intents

- **Ship: CSS Anchor Positioning: Unwrapped inset-area()**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/svDZprJ-LjE
  - `position-try-fallbacks:inset-area(top)` を `position-try-fallbacks:top` って書ける
- **Ship: Intl.DurationFormat**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ft8-RWx0e2Q
- Ship: Promise.try
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1cxpRmqIY44
- Ship: Private Aggregation API: filtering IDs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_04scQwbWhk
- **Ship: Rename inset-area to position-area**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/D-vUkcOSHEg
- **Ship: Rename position-try-options to position-try-fallbacks**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kJwhHYXupWk
- Ship: Attribution Reporting Feature: Changes to source-destination-limit logic
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qlsv7fn0zRE
- Ship: Attribution Reporting Feature: Flexible contributions filtering
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VKGn41wMYlg
- Ship: AudioContext.onerror
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/B0t-BZzs8s4
- **Ship: CSS interpolate-size property and calc-size() function**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FjyMSSaSPEg
- **Ship: Isolated Web Apps**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iMfYonTs414
- Ship: Web Authentication API: JSON serialization methods
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZUbw6XzeJEU
- **Ship: Coalesce selectionchange events**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/H-X3bbS8Ag4
- Ship: Protected Audience: cross-origin trusted signals fetches
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5nvBAjmoO2g
- Ship: Remove PointerEvent.getCoalescedEvents() from insecure contexts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eQ5cQA-Fz30
- **Ship: Web Permissions API on WebView**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aB_5aOGtaGI
- Ship: WebGPU extended range (HDR) support
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rBQIRHUEAe8
- Implement and Ship: WebUSB Interface Class Filtering
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LZXocaeCwDw
- Prototype: Pause media playback on not-rendered iframes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/D0j1igiVHR8
- **Prototype: Selection API across Shadow DOM and Selection.getComposedRanges**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HwQQqrbEfvc
- **Prototype: Support currentcolor in Relative Color Syntax**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bdtHZOUvGTI
- **Prototype: Add bugfix version number to User-Agent string on Bling**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/I5r9cxliL-0
  - iOS 版 Chrome の UA 文字列の OS バージョン部分にパッチバージョンを追加 (`_1` の部分)
  - `Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X)...`
  - `Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X)...`
- Prototype: Nested view transitions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iG4WDZOOzxY
- **Prototype: Sanitizer API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DTyARSjGP4g
- **Prototype: Shared Storage API enhancement (allow cross-origin script in addModule & align createWorklet)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YZ4XGewKVuk
- Prototype: Transferable RTCDataChannel to workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/64yIg0Ya3No
- Prototype: Update the syntax of `text-wrap` to match the new spec
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dDCIG2rQs7Q
- **Prototype: HTML handwriting attribute**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0r_tV6k0NyA
  - `<textarea handwriting></textarea>`
- Deprecate and Remove: Deprecation of CSS Anchor Positioning property `inset-area`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SLOin9wVpZA
- Experiment: Partitioning :visited links history Phase 2
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qbHl0W-75zA
- Experiment: Call stacks in crash reports from unresponsive web pages
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/l3do9tvEGws
- Experiment: Cookies Having Independent Partitioned State (CHIPS)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_dJFNJpf91U
- Experiment: FileSystemObserver interface
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AeztwhhHaYo
- Extend Experiment: WebAssembly JS String Builtins
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lTUazmHwxwI
- Extend Experiment: Cookie Deprecation Label Throughout 3PC Phaseout
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Xgpz_MnjL4k
- Extend Experiment: Explicit Compile Hints with Magic Comments
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mwZYYTBJ12g
- **Ready for Developer Testing: Intl.DurationFormat**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TTdMixrlxfk
- Web-Facing Change PSA: Rename position-try-options to position-try-fallbacks
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zuwwttisa9E
- Web-Facing Change PSA: Rename inset-area to position-area
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GU9zSycWOP8
- Web-Facing Change PSA: Coalesced/predicted events in untrusted PointerEvents will retain original targets
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5UbeICCy4wY
- Web-Facing Change PSA: Update CSS backdrop-filter to use mirror edgeMode
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZtMnFCHZhMQ
- fetch API and filesystem: URLs (a Manifest v3 migration blocker)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2eRqvKcQewk
- Turning off use_v8_context_snapshot in non-production builds by default
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wBFL-m_A-S8
- PSA: H264 profile level changed from 3.1 to 4.2
  - https://groups.google.com/g/discuss-webrtc/c/frk9q-F3XbE/m/JwZoV3tjAAAJ
- Action required: You're invited to BlinkOn 19 on Oct 8-10th!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XZPgZ3DymqY
- Change:
- Unship:
- Remove:

#### Other

- web.dev
  - blog
    - **How to use container queries now**
      - [https://web.dev/blog/how-to-use-container-queries-now](https://web.dev/blog/how-to-use-container-queries-now?hl=en)
    - **Interop 2024 mid-year update**
      - [https://web.dev/blog/interop-2024-midyear](https://web.dev/blog/interop-2024-midyear?hl=en)
    - New to the web platform in June
      - [https://web.dev/blog/web-platform-06-2024](https://web.dev/blog/web-platform-06-2024?hl=en)
    - @property: Next-gen CSS variables now with universal browser support
      - https://web.dev/blog/at-property-baseline
    - CSS font-size-adjust is now in Baseline
      - https://web.dev/blog/font-size-adjust
    - New to the web platform in July
      - https://web.dev/blog/web-platform-07-2024
- google for developers
  - Bringing the I/O magic to Berlin - Google Developers Blog
    - https://developers.googleblog.com/en/bringing-the-io-magic-to-berlin/
  - **Google URL Shortener links will no longer be available - Google Developers Blog**
    - https://developers.googleblog.com/en/google-url-shortener-links-will-no-longer-be-available/
- google developer japan blog
  - Google Developers Japan: Google Ads API v17 のお知らせ
    - https://developers-jp.googleblog.com/2024/07/google-ads-api-v17.html
- chrome developer blog
  - Adding Trusted Types to YouTube
    - [https://developer.chrome.com/blog/trusted-types-on-youtube](https://developer.chrome.com/blog/trusted-types-on-youtube?hl=en)
  - What's happening in Chrome Extensions?
    - https://developer.chrome.com/blog/extension-news-july-2024
  - Chrome Extensions: Important policy updates
    - https://developer.chrome.com/blog/cws-policy-updates-2024
  - **Misconceptions about view transitions**
    - https://developer.chrome.com/blog/view-transitions-misconceptions
  - **How Chrome helps users install the apps they value**
    - https://developer.chrome.com/blog/how_chrome_helps_users_install_the_apps_they_value
  - **Line-breakable `<ruby>` and CSS ruby-align property**
    - https://developer.chrome.com/blog/line-breakable-ruby
  - **Request for developer feedback on reading-flow and elements with display: contents**
    - https://developer.chrome.com/blog/reading-flow-display-contents
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - **Google Online Security Blog: Sustaining Digital Certificate Security - Entrust Certificate Distrust**
    - https://security.googleblog.com/2024/06/sustaining-digital-certificate-security.html
  - Q2 2024 Summary from Chrome Security
    - https://groups.google.com/a/chromium.org/g/security-dev/c/lqwmgK-jlKY
  - **Google Online Security Blog: Building security into the redesigned Chrome downloads experience**
    - https://security.googleblog.com/2024/07/building-security-into-redesigned.html
- search blog
  - Configure your shipping and returns directly in Search Console
    - https://developers.google.com/search/blog/2024/07/configure-shipping-and-returns-search-console
- Project Zero: The Windows Registry Adventure #3: Learning resources
  - https://googleprojectzero.blogspot.com/2024/06/the-windows-registry-adventure-3.html
- v8
  - https://v8.dev/
- **`*.google.com` だけ CPU/GPU/Memory usage をフルで取れる API が Chrome にある話**
  - https://x.com/lcasdev/status/1810696257137959018
  - https://x.com/simonw/status/1810731216796324080
- **Google Workspace Updates: Import and export Markdown in Google Docs**
  - https://workspaceupdates.googleblog.com/2024/07/import-and-export-markdown-in-google-docs.html
  - Docs の Markdown のエクスポートが可能に
  - mozaic.fm 的には待望の神機能

### Firefox 動向

#### Stable: 128

#### Updates

- Firefox 128.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/128.0/releasenotes/
  - ユーザーデータ削除ダイアログの UI 改良
  - Privacy Preserving Attribution API の実験開始
- Firefox 128 for developers - Mozilla | MDN
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/128
  - @property
  - Relative Color Syntax
  - content プロパティの代替テキスト
  - Resizeable ArrayBuffer
  - HTTP Priority ヘッダー
  - Request/Response/Blob.bytes()
- 100% WebDriver BiDi and 101% more! - These Weeks in Firefox: Issue 164 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2024/07/18/100-webdriver-bidi-and-101-more-these-weeks-in-firefox-issue-164/
- Concise and compact - These Weeks in Firefox: Issue 165 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2024/07/30/concise-and-compact-these-weeks-in-firefox-issue-165/

#### Intents

- Ship: screen and viewport options for vector-effect
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/D-7LtjA-kUw
- **Ship: Iterator Helpers**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Y7aNEjKLel4
- Prototype:
- Implement: HTMLVideoElement's requestVideoFrameCallback
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/HcC0OHvYgHc
- **Prototype: CSS 'stretch' sizing keyword (with '-webkit-fill-available' as an alias)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/-pMSV-kgUjA
- Change:
- Remove:

#### Newsletter

- Firefox WebDriver Newsletter - 128 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-128/
  - Support for the "BiDi flag"
- Necko Newsletter Q2 2024
  - [https://groups.google.com/a/mozilla.org/g/dev-platform/c/kfLDXD_M6IA](https://groups.google.com/a/mozilla.org/g/dev-platform/c/kfLDXD_M6IA/m/V8RKsQHhAAAJ)

#### MDN / Open Web Docs

- Static Site Generation (SSG) with Next.js
  - https://developer.mozilla.org/en-US/blog/static-site-generation-with-nextjs/
- Introducing the MDN HTTP Observatory
  - https://developer.mozilla.org/en-US/blog/mdn-http-observatory-launch/
- MDN partners with Scrimba to enhance web development learning
  - https://developer.mozilla.org/en-US/blog/mdn-scrimba-partnership/
- Exploring the Broadcast Channel API for cross-tab communication
  - https://developer.mozilla.org/en-US/blog/exploring-the-broadcast-channel-api-for-cross-tab-communication/

#### Standard Position

- 今月 Close された Issue と PR ものをみる
  - https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2024-07-01+
  - Positive
    - New `trusted-types-eval` keyword for CSP script-src
      - https://github.com/mozilla/standards-positions/issues/1032

#### Other

- Transform Firefox into the ultimate minimalist browser
  - https://blog.mozilla.org/en/products/firefox/firefox-tips/transform-firefox-into-minimalist-workspace/
- Snapshots for IPC Fuzzing - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2024/06/snapshots-for-ipc-fuzzing/
- Draft "Lessons Learned" Wiki Page - Seeking Feedback
  - https://www.mail-archive.com/dev-security-policy@mozilla.org/msg01703.html
- Intent to Approve Cybertrust / JCSI Japan Root Inclusions
  - https://www.mail-archive.com/dev-security-policy@mozilla.org/msg01709.html
- Disclosure of Advisory Role with Entrust
  - https://www.mail-archive.com/dev-security-policy@mozilla.org/msg01711.html
- Firefox tips and tricks for journalists
  - https://blog.mozilla.org/en/products/firefox/firefox-tips/firefox-features-for-journalists/
- Top 5 Firefox features for tab maximalists
  - https://blog.mozilla.org/en/products/firefox/firefox-tips/efficient-tab-management-firefox/
- Picture-in-Picture lets you watch videos while 'working'
  - https://blog.mozilla.org/en/products/firefox/picture-in-picture/
- Privacy-Preserving Attribution | Firefox Help
  - https://support.mozilla.org/en-US/kb/privacy-preserving-attribution
- **A Word About Private Attribution in Firefox : r/firefox**
  - https://www.reddit.com/r/firefox/comments/1e43w7v/a_word_about_private_attribution_in_firefox/
  - Firefox 128 で PPA の実験を開始したところ炎上したことに対し CTO が Reddit で PPA の仕組みを説明

### Safari 動向

#### Stable: 17.6

#### Updates

- Release Notes for Safari Technology Preview 198 | WebKit
  - https://webkit.org/blog/15694/release-notes-for-safari-technology-preview-198/
  - Added support for the :active-view-transition pseudo-class.
- Release Notes for Safari Technology Preview 199 | WebKit
  - https://webkit.org/blog/15735/release-notes-for-safari-technology-preview-199/
  - Added support for Uint8Array.prototype.toBase64 and Uint8Array.prototype.toHex.
- **Private Browsing 2.0 | WebKit**
  - https://webkit.org/blog/15697/private-browsing-2-0/
  - Safari が強化してきたプライバシー保護のまとめ
    - Link Tracking Protection
    - Tracker(CNAME-cloaker も)排除
    - Advanced Fingerprinting Protection
    - Extensions による website や history へのアクセスデフォルト無効
    - 3rd Party IP からの Cookie を短命に
    - Partitioned SessionStorage, blob URL
  - ついでに Topics API を批判
- WebKit Features in Safari 17.6 | WebKit
  - https://webkit.org/blog/15739/webkit-features-in-safari-17-6/
  - **Safe alignment in Flexbox**

#### Standard Positions

- 今月 Close されたものをみる
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2024-07-01+
  - Support
    - Trusted Types
      - https://github.com/WebKit/standards-positions/issues/186
  - Oppose
    - CSS Nesting: @nest
      - https://github.com/WebKit/standards-positions/issues/337

#### Other

- Fifteen Years of Contributing to WebKit
  - https://rniwa.com/2024-07-20/fifteen-years-of-contributing-to-webkit/

### Edge 動向

#### Stable: 127

#### Updates

- https://blogs.windows.com/msedgedev/
  - ここがメイン
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見れる
- https://twitter.com/MSEdgeDev
  - これを見るしか無い

#### Other

- Seamless SVG copy-paste on the web - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2024/07/11/seamless-svg-copy-paste-on-the-web/
- Browser Features: Find in Page - text/plain
  - https://textslashplain.com/2024/07/15/browser-features-find-in-page/

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft

#### Open/UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- OpenUI-WHATWG/HTML-CSSWG Meeting 2024-07-25
  - https://lists.w3.org/Archives/Public/www-style/2024Jul/0011.html
  - How to implement and shape API for `<selectedoption>` element for `<select>`
  - Popover Topics
  - Pseudo-elements for stylable select
- Open UI Telecon, June 27, 2024
  - Welcome back... and, no meeting next week due to holiday conflicts
  - [select] as an alternative to split buttons and `<button type=popover>` #1063
  - [interest invokers] How to define/control the action on "losing interest" #1064
  - Introduction to Foundation for the Global Design System component library #1066
- Open UI Telecon, July 11, 2024
  - Foundation for the Global Design System component library #1066
  - Toggle Button Proposal #1058
  - [invokers] should we pursue proposing method names to match invoke actions? #954
- Open UI Telecon, July 25, 2024
  - [invokers] should we pursue proposing method names to match invoke actions? #954
  - [invokers] Casing for action values #969
  - Foundation for the Global Design System component library #1066

#### WHATNOT

- Upcoming WHATNOT meeting on 7/4/2024
  - https://github.com/whatwg/html/issues/10441
  - Review past action items
    - 1a. Mason to post a proposal for moving forward with Invoker Buttons
    - Done.
  - Carryovers from last time
    - 2a. Emilio to collect compat data and propose a spec PR for min/max in [forms] Number input intrinsic size.
      - The spec has some text to this regard already. Only question is whether we want to make size apply to number inputs. If so, happy to write a PR.
    - 2b. Emilio to work on pulling out the common points for iframe throttling into the issue about Consider improving interoperability of `<iframe>` throttling margins, and maybe a spec PR.
      - Waiting to get review on a Gecko patch that implements what would be my formal proposal, in order to confirm it is web-compatible.
  - New topics
    - [Anne] Severing a document's opener relationship regardless of origin
    - `<input type=color>` enhancements
- Upcoming WHATNOT meeting on 2024-07-11
  - https://github.com/whatwg/html/issues/10463
  - Review past action items
    - None
  - Carryovers from last time
    - None.
  - New topics
    - [Anne] Enhance `<input type=color>` with alpha and colorspace=display-p3
      - Domenic will ping Mason/Joey for implementation interest from Chromium. Kagami will ask Emilio/Olli to chime in.
    - [Keith] Tie in AbortControllers with CustomElements
      - The discussion will continue on the issue. Keith will summarize the proposed options and tradeoffs.
    - [Daniel/Freddy] Upstreaming from the Sanitizer API
      - Consensus in the room that this is ready for stage 2.
- Upcoming WHATNOT meeting on 2024-07-18
  - https://github.com/whatwg/html/issues/10471
  - Review past action items
    - Domenic will ping Mason/Joey for implementation interest from Chromium on Enhance `<input type=color>` with alpha and colorspace=display-p3. Kagami will ask Emilio/Olli to chime in.
      - Joey and Emilio are positive about the proposal.
    - Keith will summarize the options and tradeoffs on Tie in AbortControllers with CustomElements.
      - Done. Anne will move it to the DOM repo and Keith will update the title.
  - Carryovers from last time
    - None.
  - New topics
    - [Yoav] Severing a document's opener relationship regardless of origin
      - Yoav will ask Artur and Arthur to comment on the issue.
    - [Andrew] redact location.ancestorOrigins according to Referrer Policy
      - Chris will find someone from Chromium to look into this. Anne thinks the WebKit behavior can be changed. If Chromium is on board, we will need someone to step up with a concrete proposal to review.
    - [Keith] [Proposal] Invoker Buttons - allowing popover/dialog and more to be invoked without JS
      - Keith will switch to use "source". Discussed various options around naming, and consensus is for the name to start with a single dash. Agreed to only support `<button>` for now.
    - [Michael] "Fragment serializing algorithm" outputs node itself instead of its contents for elements in non-HTML documents
      - Luke has some precursory work that will move things forward here.
- Upcoming WHATNOT meeting on 2024-07-25
  - https://github.com/whatwg/html/issues/10496
  - ???

#### Other

- **Third Party Cookies Must Be Removed**
  - https://www.w3.org/2001/tag/doc/web-without-3p-cookies/
- **Third-party cookies have got to go**
  - https://www.w3.org/blog/2024/third-party-cookies-have-got-to-go/
- **W3C Team appointments to the TAG ratified**
  - https://www.w3.org/news/2024/w3c-team-appointments-to-the-tag-ratified/
- W3C offers an Inclusion Fund for TPAC 2024
  - https://www.w3.org/news/2024/w3c-offers-an-inclusion-fund-for-tpac-2024/
- WebAssembly spec advancement to Candidate Recommendation
  - https://lists.w3.org/Archives/Public/public-webassembly/2024Jul/0000.html

### TC39 動向

#### Meeting

- Meeting Note が公開された時だけやる、それ以外はやらない。
- 2024-06
  - https://github.com/tc39/notes/tree/main/meetings/2024-06
  - JSON Modules
    - assert の unship が終わって with (attributes) がくれば stage 4 になる
  - Float16Array
    - みんな実装中
  - **Decorators and Decorator Metadata**
    - 仕様も Stage3 で test262 もほぼでき
    - 実装があつまるようなら 2.7 に戻す必要も特にない
    - 実装待ち
  - Regex Expression Pattern Modifiers
    - インラインでフラグを部分的に変えるやつ
    - 2 年前に Stage 3, Test262 が完成
    - 実装中
  - Explicit Resource Management
    - 実装中
    - テストも作成中
  - **Promise.try for Stage 3**
    - Test262 完成
    - Stage 3 へ
  - **RegExp Escaping**
    - 2.7 へ
  - **ShadowRealm Update**
    - HTML integration が進んでる
    - more feedback を求めてる
    - "confidentiality" でもめてる
    - WPT 書くのむずそう
  - Joint Iteration for Stage 2.7
    - zipToArrays/zipToObjects
    - zipToArrays は zip に改名
    - "shortest/longest/strinct
    - 2.7 へ
    - Demo
    - https://tc39.es/proposal-joint-iteration/demo/
  - **Temporal Stage 3 update and scope reduction**
    - Temporal.Calendar, Temporal.TimeZone などの仕様を削って範囲を狭める
    - substract()/since() は削除されない
    - Stage 3 キープ
    - Temporal の近況(主に Scope を狭める話)
    - https://zenn.dev/cybozu_frontend/articles/temporal-reduces-scope

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2024-06-01}...main@{2024-08-01}
- https://tc39.github.io/beta/
- 0->1
  - Unordered Async Iterator Helpers
- 1->2
  - Error.isError
  - Iterator Sequencing
  - ESM Phase import
  - Discard (void) Bindings
- 2->2.7
  - Deferring Module Evaluation
  - Joint Iteration
- 2.7->3
  - Promise.try
  - RegExp.escape
  - Time Zone Canonicalization
- 3->4

#### New Proposals

#### Other

- Summary of the June 2024 TC39 plenary in Helsinki
  - https://blogs.igalia.com/compilers/2024/07/18/summary-of-the-june-2024-tc39-plenary-in-helsinki/

### WinterCG 動向

- Meeting や大きな動きがあった月だけやる

#### Meeting

- 2024-06 Meeting
  - [https://github.com/wintercg/admin/issues](https://github.com/wintercg/admin/issues/49)
  - no meeting

### IETF 動向

#### IETF120

- HTTPbis
  - https://httpwg.org/wg-materials/ietf120/minutes.html
  - 20 min - [Communicating Proxy Configurations in Provisioning Domains](https://datatracker.ietf.org/doc/draft-ietf-intarea-proxy-config/) - Tommy Pauly
    - https://datatracker.ietf.org/meeting/120/materials/slides-120-httpbis-pvd-proxy-discovery-00
    - Proxy 自体に新しいプロトコルのサポートとかを問い合わせる?
    - .well-know に JSON
    - connect-udp とか
    - pvd = ProVisioning Domains
    - Apple から (Private Relay 関連?)
  - 20 min - Revising Cookies (again) -- Johann Hofmann
    - https://datatracker.ietf.org/meeting/120/materials/slides-120-httpbis-sessa-cookies-future-00
    - https://github.com/johannhof/draft-annevk-johannhof-httpbis-cookies
    - 6265bis でもカバーできてない話がある
    - から、新しいドラフトを書いたよ
      - Cookie Store とか
      - 3PC blocking とか
      - Non Browser U-A とか
- QUIC
  - https://github.com/quicwg/wg-materials/blob/main/ietf120/minutes.md
- TLS
  - https://notes.ietf.org/notes-ietf-120-tls

#### WG

- RFC
- Work
  - I-D Action: draft-ietf-httpbis-connect-tcp-03.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JulSep/0001.html
  - I-D Action: draft-ietf-httpbis-optimistic-upgrade-00.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JulSep/0004.html
  - I-D Action: draft-ietf-httpbis-resumable-upload-04.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JulSep/0014.html
  - I-D Action: draft-ietf-httpbis-compression-dictionary-06.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JulSep/0007.html
  - I-D Action: draft-ietf-httpbis-unprompted-auth-08.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JulSep/0009.html
  - Working Group Last Call: Window Sizing for Zstandard Content Encoding
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024AprJun/0124.html
  - Publication has been requested for draft-ietf-httpbis-compression-dictionary-05
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JulSep/0006.html
  - **Possible ambiguity in RFC 6265bis**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024JulSep/0125.html
- Meeting

#### Other

- Openness in Internet Standards: Necessary, but Insufficient
  - https://www.mnot.net/blog/2024/07/05/open_internet_standards
- **Are Internet Standards Competitive or Collaborative?**
  - https://www.mnot.net/blog/2024/07/16/collaborative_standards

### CDN 動向

#### Cloudflare

- Cloudflare 1.1.1.1 incident on June 27, 2024
  - https://blog.cloudflare.com/cloudflare-1111-incident-on-june-27-2024/
- Application Security report: 2024 update
  - https://blog.cloudflare.com/application-security-report-2024-update/
- Q2 2024 Internet disruption summary
  - https://blog.cloudflare.com/q2-2024-internet-disruption-summary/
- Exploring Internet traffic during the 2024 U.S. Republican National Convention
  - https://blog.cloudflare.com/exploring-internet-traffic-during-the-2024-us-republican-national-convention/
- Countdown to Paris 2024 Olympics: France leads in web interest
  - https://blog.cloudflare.com/countdown-to-paris-2024-france-leads-in-olympic-web-interest/
- How the Paris 2024 Summer Olympics has impacted Internet traffic
  - https://blog.cloudflare.com/paris-2024-summer-olympics-impacted-internet-traffic/

#### Fastly

- Level up your images: JPEG XL now supported by Image Optimizer | Fastly
  - https://www.fastly.com/blog/level-up-your-images-jpeg-xl-now-supported-by-image-optimizer/
- Is purging still the hardest problem in computer science? | Fastly
  - https://www.fastly.com/blog/is-purging-still-the-hardest-problem-in-computer-science/

#### Other

- Akamai Early Hints: A New Way for Improving User Experience and Core Web Vitals | Akamai
  - https://www.akamai.com/blog/performance/2024/jul/akamai-early-hints-improving-user-experience

### セキュリティ動向

- **Persistent npm Campaign Shipping Trojanized jQuery**
  - https://blog.phylum.io/persistent-npm-campaign-shipping-trojanized-jquery/
  - jQuery に悪意のあるコードを含んで、同梱配布しているパッケージがみつかった
- **Security Alert: Update to the Authy Android (v25.1.0) and iOS App (v26.1.0) | Twilio**
  - [\*\*https://www.twilio.com/en-us/changelog/Security_Alert_Authy_App_Android_iOS\*\*](https://www.twilio.com/en-us/changelog/Security_Alert_Authy_App_Android_iOS)
  - Authy ハッキングで 3,300 万件の電話番号流出
- **Unlawful Access of Customer Data - AT&T Bill & account Customer Support**
  - https://www.att.com/support/article/my-account/000102979
  - AT&T の電話番号がほぼ全て(1.1 億人)流出発覚
- **Intent to End OCSP Service - Let's Encrypt**
  - https://letsencrypt.org/2024/07/23/replacing-ocsp-with-crls.html
  - OCSP の提供をやめ CRL に移行する
  - もともと CRL の改善のために提案されたのが OCSP だった
  - OCSP レスポンダーは訪問者のアクセス先 IP がわかってしまう問題があった
  - LE に限らず OCSP をきちんと運用し続けるのはむずかしく、落ちることも多々ある
  - それでもサイトが見えるように、ブラウザは OCSP がエラーでも閲覧を続けていた
  - それでも OCSP を提供し続けるコストもペイしない、やめればインフラもシンプルになる
  - CAB でも OCSP はオプショナルとして合意された
  - MS だけが反対してるが、おそらくそのうち変わるだろう
  - OCSP はほぼフェイルオープンな扱いなので影響は少ないが、使ってるアプリは確認が必要
- **Windows resiliency: Best practices and the path forward - Microsoft Community Hub**
  - https://techcommunity.microsoft.com/t5/windows-it-pro-blog/windows-resiliency-best-practices-and-the-path-forward/ba-p/4201550
- **Windows Security best practices for integrating and managing security tools | Microsoft Security Blog**
  - https://www.microsoft.com/en-us/security/blog/2024/07/27/windows-security-best-practices-for-integrating-and-managing-security-tools/
- **How Windows 3.1 is saving Southwest's butt | Digital Trends**
  - https://www.digitaltrends.com/computing/southwest-cloudstrike-windows-3-1/
- **Apple、信頼できる企業や人物を装いユーザーの機密データを入手しようとする「ソーシャルエンジニアリング攻撃」に対して注意勧告。**
  - https://applech2.com/archives/20240704-apple-social-engineering-attackers.html
- **ランサムウェア攻撃による情報漏洩に関する さらなる犯行声明および当社グループの対応状況について | 株式会社ドワンゴ**
  - https://dwango.co.jp/news/5129602523463680/
- **～ニコニコ動画が 8/5 に再開、新バージョンに～ ニコニコの復旧状況およびサービス停止に伴う補償について|ニコニコインフォ**
  - https://blog.nicovideo.jp/niconews/225330.html

### 周辺動向

- **Open Internet Governance**
  - https://open-internet-governance.org/
  - An Open Letter to the United Nations
  - https://open-internet-governance.org/letter
  - Press Release
  - https://open-internet-governance.org/press-release
  - 国連の Global Digital Compact のプロセスにオープンな標準化の団体が関われておらず、内容にもオープンとずれてるとこがあると懸念があっての公開書簡
- **Announcing the Ladybird Browser Initiative**
  - https://ladybird.org/announcement.html
  - Serenity OS (90 年代の OS を再現したようなやつ)の HTML Viewer から始まった
  - 他のブラウザからはコードを借りずにゼロから実装する
  - すでに GitHub の Issue や PR は動いてる
  - Ladybird Browser Initiative で寄付ベースで開発をすすめる
  - 企業との取引などによる収益化はしない
- **Why we need Ladybird - Chris Wanstrath**
  - https://ladybird.org/why-ladybird.html
  - Safari / Firefox は、デフォルト検索エンジンを Google にするために年間数億ドルを受け取ってる
  - 新しいブラウザを作るのは不可能で、 Chrome の座は奪えないという人はたくさんいる
  - 完全にゼロから、寄付のみで運用されるブラウザを作ることが非常に重要
- Igalians Celebrated with Prestigious Awards | Igalia
  - https://www.igalia.com/2024/07/10/Igalians-Celebrated-with-Prestigious-Awards.html
- **Marc Andreessen on Building Netscape & the Birth of the Browser - YouTube**
  - https://www.youtube.com/watch?v=8aTjA_bGZO4
  - Netscape ができたころの話
- **Mac OSX support · Issue #1314 · MicrosoftEdge/WebView2Feedback**
  - https://github.com/MicrosoftEdge/WebView2Feedback/issues/1314#issuecomment-2211683486
  - WebView2 の Mac/Linux 展開をやめることに
- **Misfire - Infrequently Noted**
  - https://infrequently.org/2024/07/misfire/
  - 3rd Party Cookie に関する一連の流れについて、の TAG に対する批判
  - 「TAG がやるべきこと」という視点でまとめられている

### Cookie 動向

- How Chromium's cookies get evicted
  - https://blog.yoav.ws/posts/how_chromium_cookies_get_evicted/
- **A new path for Privacy Sandbox on the web**
  - https://privacysandbox.com/news/privacy-sandbox-update/
  - オンラインプライバシーの問題を解決するため Privacy Sandbox などに取り組んできた。
  - その活動は CMA や ICO その他各機関や業界からフィードバックを得てきた。
  - 検証の結果、効果は出ているが、それでも業界の移行に時間がかかりすぎており、影響も大きい。
  - そこで、 3rd Party Cookie の廃止をやめて、ユーザが「informed choice」できるように方針を変更していくことにする。
  - それでも Privacy Sandbox は重要なので投資は続ける。またユーザのプライバシーのために、プライベートモードに IP Protection を入れる。
- **Investigation into Google's 'Privacy Sandbox' browser changes - GOV.UK**
  - https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes
- **Learnings from Privacy Sandbox Testing**
  - https://privacysandbox.com/news/learnings-from-privacy-sandbox-testing/
- **Results from Privacy Sandbox APIs testing**
  - https://support.google.com/admanager/answer/15189422

### イベント

- 7 月
  - 20-26: IETF 120 Vancouver
    - https://www.ietf.org/meeting/120/
  - 28-01: TC39
    - https://github.com/tc39/agendas/blob/main/2024/07.md
- 8 月
- 9 月
  - 7: Web Developer Conference 2024 - connpass
    - https://web-study.connpass.com/event/321711/
    - https://fortee.jp/web-dev-conf-2024/proposal/all
  - 23-27: TPAC 2024 Anaheim
    - https://www.w3.org/2024/09/TPAC/
  - ?: CMA の Q3 レポート
- 10 月
  - 8-10: blinkOn19
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/XZPgZ3DymqY

### Wrap Up

- Chrome
  - 127
  - 128 beta
    - CSS ruby-align / line-breakable ruby
    - `<option>` minimum size
    - CSS zoom
    - Promise.try
  - Ship
    - inset-area -> position-area
    - position-try-options -> position-try-fallbacks
    - interpolate-size property & calc-size()
    - Isolated Web Apps
  - Prototype
    - currentcolor in RCS
    - iOS Chrome の UA 文字列に iOS のパッチバージョンを追加
    - Sanitizer API
    - HTML handwriting attribute
  - other intents
    - Intl.DurationFormat ready for developer testing
  - web.dev
    - Interop 2024 mid-year update
  - Google Developer Blog
    - goo.gl
  - Chrome Developers
    - misconceptions about view transitions
  - Chromium blog
  - other blogs
    - Entrust distrust
    -
  - other
    - Markdown import/export in Google Docs (Workspace)
- Firefox
  - 128
    - PPA experiment
    - @property
    - Relative Color Syntax
    - content プロパティの代替テキスト
  - Ship
    - Iterator Helpers
  - Prototype
    - CSS stretch keyword
  - MDN Blog
    - MDN HTTP Obsevatory
  - other
    - PPA の実験で炎上
- Safari
  - TP 198
  - TP 199
    - Uint8Array.toBase64()
  - 17.6
    - Safe alignment in Flexbox
  - blog
    - Private Browsing 2.0
  - Standard Position
    - support
      - Trusted Types
  - other
    - rniwa さん WebKit contribution 15 年
- Edge
  - 特になし
- W3C/WHATWG
  - Open/UI
    - meetings
    - WHATNOT
  - Other
    - TAG on third-party cookies
- TC39
  - Decorator (Metadata) 実装待ち
  - RegExp.escape / Promise.try Stage 3
  - ShadowRealm がむずそう
  - Temporal スコープ狭めて Stage3
- WinterCG
- IETF
  - IETF120
  - Communicating Proxy Configurations in Provisioning Domains by Apple
  - Revising Cookies (again) で RFC6265bis のカバーできてない話
- CDN 動向
- セキュリティ動向
  - 悪意のあるコードが入った jQuery 同梱パッケージ
  - Authy ハッキング
  - AT&T で大規模情報漏洩
  - Let's Encrypt OCSP 辞める
  - CrowdStrike で世界中の Windows がブルースクリーン
  - Apple ソーシャルエンジニアリング攻撃への啓蒙
  - ニコ動 8/5 再開
- 周辺動向
  - Open Internet Governance
  - Ladybird
  - Netscape ができたころの昔話
  - WebView 2 の Mac/Linux 展開やめる
  - Alex Russel 先生 TAG へん怒りブログ
- Cookie 動向
  - Privacy Sandbox の方針変更
