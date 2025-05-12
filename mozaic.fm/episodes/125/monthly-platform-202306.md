---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep125.mp3
published_at: 2023-06-29
guest: [@myakura](https://twitter.com/myakura)
---

# ep125 Monthly Platform 202306

## Theme

第 125 回のテーマは 2023 年 6 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable:114

#### Updates

- **New in Chrome 114 - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-chrome-114/
  - text-wrap:balance.
  - CHIPS: Cookies Having Independent Partitioned State.
  - The Popover API.
  - And more!
    - DevTools lets you pause and debug C and C++ code in WebAssembly apps with DWARF support.
    - The exclusionFilters option in `navigator.bluetooth.requestDevice()` allows web developers to exclude some devices from the browser picker..
    - There is an origin trial for Background Blur.
- **Chrome 115 beta - Chrome Developers**
  - https://developer.chrome.com/en/blog/chrome-115-beta/
  - CSS
    - Multiple values of the display property
    - Boolean context style container queries
    - **Scroll-driven animations**
    - Fix to regression where elements with display: contents were no longer shown in the accessibility tree
  - Web APIs
    - Increasing the maximum size of a `WebAssembly.Module()` on the main thread to 8 MB
    - FedCM: Support credential management mediation requirements for auto re-authentication
    - **HTTPS upgrades**
    - **Partitioning the Storage, Service Worker, and Communication APIs**
    - Resource Timing: Expose interim response times
    - Update of "xml" prefix handling in `lookupNamespaceURI()` and `createNSResolver()`
    - VisibilityStateEntry
    - WGSLLanguageFeatures for WebGPU
    - WebDriver commands for interacting with FedCM dialogs
  - Origin trials in progress
    - Compute Pressure
    - Explicit compile hints with magic comments
    - **Long Animation Frames API**
    - **Storage Buckets API**
  - Deprecations and removals
    - **Deprecate the document.domain setter**
    - Deprecate mutation events
- What's New in DevTools (Chrome 115) - Chrome Developers
  - https://developer.chrome.com/en/blog/new-in-devtools-115/
  - Elements improvements
    - **New CSS subgrid badge**
    - **Selector specificity in tooltips**
    - **Values of custom CSS properties in tooltips**
  - Sources improvements
    - CSS syntax highlighting
    - Shortcut to set conditional breakpoints
  - **Application > Bounce Tracking Mitigations**
  - Lighthouse 10.2.0
  - **Ignore content scripts by default**
  - **Network > Response pretty-printing by default**
  - Miscellaneous highlights

###Intents

- **Ship: @scope**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OEfGbd74QnQ
- **Ship: CSS Subgrid**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qvfOyAVePfs
- Ship: CustomElementsGetName
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vOadD_Up5B0
- **Ship: Document picture-in-picture**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JTPl7fM64Lc
- Ship: FedCM Improvements: LoginHint, UserInfo, and Context
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nKGUbzcVXt8
- **Ship: Iterator helpers**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UyzwOm9QrxI
- Ship: WebGPU WebCodecs integration
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QLCfazM8XLQ
- Ship: deliveryType (Resource Timing)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kL8RZwq1h4g
- **Ship: Protected Audience**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/igFixT5n7Bs
- Ship: Allow Navigator.registerProtocolHandler to register "ftp"
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ABhlioapE0E
- **Ship: Attribution Reporting API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2Rmj5V6FSaY
- **Ship: CSS @starting-style Rule**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nHEvqrT5wvM
- **Ship: CSS text-wrap: pretty**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rwBWqqOB_ag
- **Ship: Fenced Frames**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tpw8wW0VenQ
- **Ship: Private Aggregation API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8cKaLstq2QQ
- Ship: RFC 7616 Digest auth: Support SHA-256, SHA-512-256 and user hashing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cJH3JJY_tTY
- Ship: Shared Storage API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dZ0NRwh7cvs
- **Ship: Topics API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PN_aE-X-f9U
- Ship: WebRTC RTP header extension control
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KRfPpAB56yk
- Prototype and Ship: Expanded Wildcards in Permissions Policy Origins
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kSknKkiYlZU
- Prototype and Ship: contain-intrinsic-size: auto none support
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mEZVe7MT88k
- Implement and Ship: Remove Payment Request User Activation Requirement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gfgY6doLHsE
- Implement and Ship: WebUSB exclusionFilters option in `requestDevice()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/e1mgO-m8zvQ
- **Prototype: Auto Sizes for Lazy Loaded Images with Srcset**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AYoqvNluyeA
  - Lazyload の場合は Sizes 以外の方法で読み込み前にサイズを決める方法が他にもある
  - なので、そちらに任せる方法がほしい
- **Prototype: Conservative page freezing on desktop**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NOhYFW0rifw
- Prototype: CustomElementsGetName
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EVt2oqzxWH0
- **Prototype: DOM Parts**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wIADRnljZDA
- Prototype: Media Session API: `enterpictureinpicture` action
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UJYc0PoARDg
- **Prototype: ServiceWorker static routing API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fyvsde2ay2A
- Prototype: Web Serial support for Bluetooth RFCOMM services
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kOOZ3RIh0Ik
- Prototype: FedCM AuthZ API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qqrG6yn1u1Q
- Prototype: `FileSystemHandle.getCloudIdentifiers()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Q8XQvA3nC4w
- Prototype: FileSystemObserver
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/P77D6ohrwwg
- **Prototype: Zstd Content-Encoding**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GDsI0Hw-jYk
- Experiment: COOP: restrict-properties
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JBTWXSHE8M0
- Experiment: Capture all screens
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6TRT0XsVOE4
- **Experiment: EditContext API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QZQrESwcK3o
- Experiment: FedCM Sign-in Status API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/y-eie2d-1iU
- Experiment: `scheduler.yield()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gN2zLde-2jI
- Extend Experiment: No-Vary-Search support in navigation prefetch cache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZQzL4l78NOU
- Remove: document.open sandbox inheritance
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/U1zHqauBLkE
- Extend Deprecation Trial: Restrict "private network requests" for subresources from public websites to secure contexts.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Euc4ZnXeuhw
- Generating Extension API documentation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RPHc8j68S48

#### V8

#### Other

- web.dev
  - The origin private file system
    - https://web.dev/origin-private-file-system/
  - New to the web platform in May
    - https://web.dev/web-platform-05-2023/
  - New CSS color spaces and functions in all major engines
    - https://web.dev/color-spaces-and-functions/
- google developer blog
  - https://developers.googleblog.com/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - How vector image editing app Boxy SVG uses the Local Font Access API to let users pick their favorite local fonts - Chrome Developers
    - https://developer.chrome.com/en/blog/how-boxysvg-uses-the-local-font-access-api/
  - Migrate away from data URLs in SVG `<use>` element - Chrome Developers
    - https://developer.chrome.com/en/blog/migrate-way-from-data-urls-in-svg-use/
  - How the game editor Construct 3 uses the File System Access API to let users save their games - Chrome Developers
    - https://developer.chrome.com/en/blog/how-construct3-uses-the-file-system-access-api/
  - Announcing the second Compute Pressure origin trial - Chrome Developers
    - https://developer.chrome.com/en/blog/compute-pressure-origin-trial-2/
  - **Chrome disables modifying `document.domain` - Chrome Developers**
    - https://developer.chrome.com/en/blog/document-domain-setter-deprecation/
  - **Help test bounce tracking mitigations - Chrome Developers**
    - https://developer.chrome.com/en/blog/bounce-tracking-mitigations-dev-trial/
  - Design a superior user experience with the new Side Panel API - Chrome Developers
    - https://developer.chrome.com/en/blog/extension-side-panel-launch/
  - What's New in WebGPU (Chrome 114) - Chrome Developers
    - https://developer.chrome.com/en/blog/new-in-webgpu-114/
  - **Mutation events will be removed from Chrome - Chrome Developers**
    - https://developer.chrome.com/en/blog/mutation-events-deprecation/
  - How Photoshop solved working with files larger than can fit into memory - Chrome Developers
    - https://developer.chrome.com/en/blog/how-photoshop-solved-working-with-files-larger-than-can-fit-into-memory/
  - Support auto-reauthentication in FedCM - Chrome Developers
    - https://developer.chrome.com/en/blog/fedcm-auto-reauthn/
  - Storage partitioning deprecation trial extended - Chrome Developers
    - https://developer.chrome.com/en/blog/storage-partitioning-deprecation-trial-extended/
  - **Chrome for Testing: reliable downloads for browser automation - Chrome Developers**
    - https://developer.chrome.com/en/blog/chrome-for-testing/
  - Enhancements to the Topics API - Chrome Developers
    - https://developer.chrome.com/en/blog/topics-enhancements/
  - What's New in WebGPU (Chrome 115) - Chrome Developers
    - https://developer.chrome.com/en/blog/new-in-webgpu-115/
  - Better full screen mode with the Keyboard Lock API
    - https://developer.chrome.com/en/blog/better-full-screen-mode/
- chromium blog
  - Chromium Blog: How Chrome achieved high scores on three browser benchmarks
    - https://blog.chromium.org/2023/06/how-chrome-achieved-high-scores-on.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- v8
  - https://v8.dev/
- **1451587 - Some sites are reporting compat issues with popover - chromium**
  - https://bugs.chromium.org/p/chromium/issues/detail?id=1451587
  - Popover が Stable に入り壊れるサイトが報告され始めた
  - 一時的に無効にできるフラグを追加
- Google Developers Japan: Web Components を使用してマップ作成時間を短縮
  - https://developers-jp.googleblog.com/2023/06/build-maps-faster-web-components.html
- Google Online Security Blog: Adding Chrome Browser Cloud Management remediation actions in Splunk using Alert Actions
  - https://security.googleblog.com/2023/05/adding-chrome-browser-cloud-management.html
- Google Online Security Blog: Announcing the Chrome Browser Full Chain Exploit Bonus
  - https://security.googleblog.com/2023/06/announcing-chrome-browser-full-chain.html
- Google Online Security Blog: Bringing Transparency to Confidential Computing with SLSA
  - https://security.googleblog.com/2023/06/bringing-transparency-to-confidential.html
- Google Online Security Blog: Protect and manage browser extensions using Chrome Browser Cloud Management
  - https://security.googleblog.com/2023/06/protect-and-manage-browser-extensions.html
- **Understand passkeys in 4 minutes - YouTube**
  - https://www.youtube.com/watch?v=2xdV-xut7EQ
  - Google Chrome Developers チャンネルのパスキー解説動画

### Firefox 動向

#### Stable: 114

#### Updates

- Firefox 114 for developers - Mozilla | MDN
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/114
  - CSS
    - The `:lang()` pseudo-class now uses string-matching semantics (including `*` wildcards) for matching language codes rather than prefix-matching semantics. Additionally, comma-separated lists of languages are now supported for matching multiple languages (Firefox bug 1121792).
    - **The `-webkit-text-security` property that lets you replace characters with shapes is now supported. You can now control the rendering of text security using this property (Firefox bug 1826629).**
    - The infinity and NaN constants are now supported inside the `calc()` function (Firefox bug 1830759).
  - JavaScript
    - **Workers now support loading ECMAScript modules. You can load modules into workers by specifying the `{type: "module"}` option in the Worker and SharedWorker constructors. Worker scripts can also statically or dynamically import modules using `import` and `import()`, respectively (Firefox bug 1812591).**
    - Worklets can now use import to statically import ECMAscript/JavaScript modules (Firefox bug 1812591).
  - SVG
    - The crossorigin attribute is now supported in image and feImage elements (Firefox bug 1240357).
  - APIs
    - `Window.print()` now opens a print dialog on Firefox for Android, allowing the current document to be printed (Firefox bug 1809922).
    - The WebTransport API is now supported, which includes the following interfaces: WebTransport, WebTransportBidirectionalStream, WebTransportDatagramDuplexStream, WebTransportReceiveStream, WebTransportDatagramDuplexStream and WebTransportError. For more information see Firefox bug 1692754, Firefox bug 1818754, and Firefox bug 1791835.
    - CSSImportRule.supportsText can now be used for getting any `supports()` conditions that were specified when using the `@import` at-rule (Firefox bug 1829590).
  - WebDriver BiDi
    - Added support for the commands input.performActions and input.releaseActions, which can be used to emulate user input for interacting with elements on web pages. Similar to Marionette all the available input sources of the WebDriver specification are supported, which are key, pointer, and wheel (Firefox bug 1832380).
    - Added support for custom browser to client messages, which allows to send a script.message event from within a script formerly installed via script.addPreloadScript (Firefox bug 1824187).
    - Added support for the serializationOptions parameter for script.evaluate and script.callFunction to customize the RemoteValue serialization (Firefox bug 1824953).
    - Fixed an issue where both the script.evaluate and script.callFunction commands did not include the stack trace and failed to properly build the exception details for a rejected Promise (Firefox bug 1829630).
    - Fixed an issue where the browsingContext.domContentLoaded and browsingContext.load events did not report the correct url, when the page defined a `<base>` meta tag (Firefox bug 1825634).
  - Marionette
    - Fixed an issue where the command `WebDriver:GetComputedRole` didn't properly return the WAI-ARIA roles (Firefox bug 1822112).
    - Fixed an issue where modifier keys were not reset when they were used again within the same WebDriver:ElementSendKeys command (Firefox bug 1776190).
    - The deprecated and non-standard mozImageSmoothingEnabled property is permanently removed. See the imageSmoothingEnabled property for smoothing in scaled images (Firefox bug 1228850).
- **Firefox Translations and Other Innovations - These Weeks in Firefox: Issue 139 - Firefox Nightly News**
  - https://blog.nightly.mozilla.org/2023/06/01/firefox-translations-and-other-innovations-these-weeks-in-firefox-issue-139/
- Brief and Blissful - These Weeks in Firefox: Issue 140 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2023/06/20/brief-and-blissful-these-weeks-in-firefox-issue-140/
- **SpiderMonkey Newsletter (Firefox 114-115) | SpiderMonkey JavaScript/WebAssembly Engine**
  - https://spidermonkey.dev/blog/2023/06/09/newsletter-firefox-114-115.html
  - Firefox 114 で Module Worker が ship
  - Firefox 115 で `Array.fromAsync()` と Change Array by Copy が ship
- Firefox WebDriver Newsletter - 114 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-114/
- Firefox DevTools Newsletter - 114 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-114/

#### Intents

- Ship: Canvas2d `TextMetrics.*Baseline` attributes
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/VQOR2A6X1NU
- Ship: Canvas2d `TextMetrics.fontBoundingBox*` attributes
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/o8Dda85M40k
- Ship: File paste support in ClipboardEvent
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ysU5Q-uVhlk
- Ship: RegExp /v flag with set notation
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/bQrQC96pl_c
- **Implement: Web Codecs**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/3g0fnn6682A
- Prototype and Ship: CSP support for external hashes (SRI)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/hiYxsfzFuXs
- **Prototype and Ship: Improved CSS Nesting**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/2oBSRgIRf80
  - CSS Nesting のサポート
  - `&` の省略も可能になった新しい仕様を実装
- **Prototype and Ship: `URL.canParse()`**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/BWLpi4dqZOE
- Prototype: Canvas Randomization in private browsing windows in Nightly
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/hPspMnBssEE
- **Prototype: Federated Credential Management (FedCM)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ncmUwK1uO98
- **Allow pages with beforeunload listener to enter BFCache for desktop**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/eu44XlVzcXU
- Deprecating the chrome and resource protocols
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/v5qmEviHAhI
- SpiderMonkey Newsletter (Firefox 114-115)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/sy0UQgutrJY
- Engineering Effectiveness Newsletter (May 2023 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/5R1wabKbGrc

#### MDN Blog

- MDN doc updates: CSS selectors & media queries, WebGPU & WebTransport APIs, Progressive web apps | MDN Blog
  - https://developer.mozilla.org/en-US/blog/mdn-docs-june-2023/
- **Introducing the MDN Playground: Bring your code to life! | MDN Blog**
  - https://developer.mozilla.org/en-US/blog/introducing-the-mdn-playground/

#### Other

- **Eric Rescorla (EKR) 先生 Mozilla をやめる**
  - https://twitter.com/ekr____/status/1664804869121912832
  - そして CDC (Centers for Disease Control) の CFA (Forecasting and Outbreak Analytics) の Chief Technologist に就任
  - https://www.linkedin.com/feed/update/urn:li:activity:7073037304184909824/

### Safari 動向

#### Stable: 16.5

#### Updates

- Release Notes for Safari Technology Preview 171 | WebKit
  - https://webkit.org/blog/14200/release-notes-for-safari-technology-preview-171/
- Release Notes for Safari Technology Preview 172 | WebKit
  - https://webkit.org/blog/14372/release-notes-for-safari-technology-preview-172/
- Safari 16.6 Beta Release Notes | Apple Developer Documentation
  - https://developer.apple.com/documentation/safari-release-notes/safari-16_6-release-notes
  - バグ修正
- **Safari 17 Beta Release Notes | Apple Developer Documentation**
  - https://developer.apple.com/documentation/safari-release-notes/safari-17-release-notes
  - Apple Pay
    - Added support for Apple Pay in cross-origin iframes with the allow="payment" attribute. (88969594)
  - Authentication
    - Added support for largeBlob extension for the local authenticator. (105237759)
  - CSS
    - Added support for `@counter-style`. (30318695)
    - Added support for optional resolution and type arguments in `image-set()`. (77598590)
    - Added support for `contain-intrinsic-size`. (89358231)
    - Added support for `full-width` and `full-size-kana` values for `text-transform`. (100310853)
    - Added support for `:has()` invalidation for the :buffering and :stalled pseudo-classes. (105163364)
    - Added support for multiple text-transform values. (105381249)
    - **Added support for `@supports font-tech()` and `@font-face src tech()`. (105665900)**
    - Added support for the `@font-face size-adjust` descriptor. (106349717)
    - Added support for containerName and containerQuery and updated conditionText to be "containerName containerQuery". (106505281)
    - Added support for `overflow-block` and `overflow-inline` media query features. (106511968)
    - Added support for the two-value syntax of `font-size-adjust`. (107290850)
    - **Added support for `@supports font-format()`. (107381176)**
    - Added support for the `from-font` value for `font-size-adjust`. (107735982)
    - Added support for `:has()` invalidation with the `:defined` pseudo-class. (109896689)
  - Developer Tools
    - Redesigned the Develop menu, including device and application icons for connected devices. (99830772)
    - Add ability to open the current page in a Simulator from Responsive Design Mode or the Develop menu. (99830918)
    - Added Developer settings and Feature Flags to Safari settings. (100420018)
    - Redesigned Responsive Design Mode. (100522676)
    - Added support for pairing with tvOS and visionOS on macOS Sonoma. (103498148)
  - Editing
    - Improved interoperability for the Range API and Selection API. (100579464)
    - Added a new appearance for marked text. (101869724)
    - Added support for the caret color to match the accent color of the system on macOS. (102450017)
  - Forms
    - **Added support for `<hr>` inside `<select>`. On macOS this is rendered as a separator. (107656886)**
  - HTML
    - **Added experimental support for the `<model>` element. (100595523)**
    - **Added support for the popover attribute. (104204093)**
  - HTTP
    - Added support for preconnect via HTTP early hints. (106055702)
  - Images
    - **Added support for HEIC/HEIF images. (99517108)**
    - **Added support for JPEG XL. (100641584)**
  - JavaScript
    - Added support for RegExp duplicate named capture groups. (100335581)
    - Added support for the RegExp v flag. (100337109)
    - Added support for new Set.prototype methods. (105190165)
    - Updated Intl.Locale to replace info getters with individual get... methods. (105570888)
    - Added support for Set.prototype.difference. (106031487)
  - Live Text
    - Added support for vertical text recognition in images and videos. (101314828)
  - Lockdown Mode
    - Disabled IndexedDB. (101187278)
    - Disabled the File API and FileReader API. (101187306)
    - Disabled support for the `<embed>` element. (101187413)
    - Added support for select web fonts. (101523138)
    - Added Lockdown Mode support to WebKit on watchOS. (101525499)
    - Disabled support for experimental APIs. (101969455)
    - Disabled the WebSpeech (SpeechSynthesis) API. (103316392)
    - Disabled the WebLocks API. (103316423)
  - Media
    - Added support for Managed Media Source on macOS and iPadOS, and added support as a preview on iOS. (30320350)
    - Added support for enforcing low-power mode and optimize video streaming setting by tone mapping HDR video to SDR. (100597710)
    - Added "Show Media Stats" when developer features are enabled in Safari. (108558776)
    - Added support for making Managed Media Source available only when an AirPlay source alternative is present or remote playback is explicitly disabled. (109130836)
  - Private Browsing
    - Added blocking for known trackers and fingerprinting. (99360202)
    - Added support for mitigating trackers that map subdomains to third-party IP addresses. (99360259)
    - Added blocking for known tracking query parameters in links in Private Browsing. (99360362)
    - Added noise to fingerprintable web APIs. (99360413)
    - Added console log messages when blocking requests to known trackers. (100523322)
    - Added support for blocking trackers that use third-party CNAME cloaking. (101612742)
    - Added support for Private Click Measurement. (106245330)
  - Profiles
    - Added support for Web Push subscriptions per profile. (100194363)
  - Safari Extensions
    - Added support for turning on and off extensions and content blockers in the Manage Extensions view. (84104594)
    - Added support for syncing the state of Safari App Extensions across multiple macOS devices. (86430510)
    - Added support for showing Content Blockers, the "On Other Devices" section, and a link to the App Store in the Manage Extensions view. (98330674)
    - Added support for regexSubstitution in declarativeNetRequest. (100039848)
  - Storage
    - Added complete support for the Storage API. (84280909)
    - Added support for overwriting the move method for FileSystemHandle. (105858983)
    - Added support for `StorageManager.estimate()`. (106169267)
    - Added support for calculating quota based on disk space. (107711361)
  - Web API
    - Added support for 3D OffscreenCanvas WebGL support. (39882956)
    - Added support for `<link rel="modulepreload">`. (88670991)
    - Added support for the focus fixup rule. (89902824)
    - Added support for using relative URLs in the WebSocket constructor and HTTP(S) schemes. (101929623)
    - Added support for Ed25519 cryptography. (105264767)
    - Added support for pausing and resuming background fetches. (106192062)
    - Added support for `URL.canParse()`. (106934916)
    - Added support for ReadableStream. (107268572)
    - Added support for fetch priority hints. (107630350)
    - Added support for customElements.getName method. (108411398)
    - Added support for two-parameter `delete()` and `has()` on `URLSearchParams`. (108949109)
  - Web apps
    - Added support for web apps on macOS Sonoma. Add any website to the Dock from the File menu or Share Sheet to get to them even faster. Web apps open in their own window, and integrate with system features like Stage Manager, Screen Time, Notifications, and Focus. (68606770)
  - Web Inspector
    - Added pretty-printing support for various modern JavaScript syntax, including optional chaining, private class members, and optional assignment operators. (89097522)
    - Added support for showing grid and flex overlays when in element selection mode. (105041619)
    - Added the Color Scheme toggle to user preferences overrides popover. (105186265)
    - Added support for showing rulers when highlighting elements in element selection mode. (105504143)
    - Added editing controls for variation axes in the Fonts sidebar of the Elements tab. (106110217)
    - Added support for ES2022 Private Fields when inspecting and logging JavaScript objects. (107863310)
    - Added support for viewing the target of a WeakRef. (109475228)
  - WebGL
    - Added support for WEBGL_clip_cull_distance (105178437)
    - Added support for EXT_disjoint_timer_query_webgl2 (105630255)
    - Added support for EXT_polygon_offset_clamp (105987827)
    - Added support for GPUExternalTexture. (108463707)
  - WebRTC
    - Added support for inbound rtp trackIdentifier stat field. (105197543)
    - Added support for exposing zoom in MediaTrackCapabilities. (106498125)
    - Added support for InputDeviceInfo. (106716244)
    - Added support for getDisplayMedia video track clone resizing. (106755005)
  - WKWebView
    - Added support for trying HTTPS for all navigations. (100477884)
    - Added support for the Proxy API. (100583135)
    - Added support for inline predictions for autocomplete. (105197136)
    - Current page is Safari 17 Beta Release Notes

#### Standard Positions

- Closed
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2023-06-01+
- scrollbar-gutter CSS Property
  - https://github.com/WebKit/standards-positions/issues/135
  - neutral
- Permissions Policy: Unload
  - https://github.com/WebKit/standards-positions/issues/127
  - 別 Issue に移動

#### Other

- **Web technology sessions at WWDC23 | WebKit**
  - https://webkit.org/blog/14203/web-technology-sessions-at-wwdc23/
  - Tuesday, June 6
    - Meet Safari for spatial computing
    - What's new in web apps
  - Wednesday, June 7
    - Rediscover Safari developer features
    - What's new in CSS
  - Thursday, June 8
    - Explore media formats for the web
  - Friday, June 9
    - What's new in Web Inspector
    - What's new in Safari extensions
- **News from WWDC23: WebKit Features in Safari 17 beta | WebKit**
  - https://webkit.org/blog/14205/news-from-wwdc23-webkit-features-in-safari-17-beta/
  - Web Apps
    - Add to Home Screen from Safari View Controller
  - Spatial Web
    - Model
    - WebXR
  - Images
    - JPEG XL
    - HEIC
    - Image set
  - Video
    - Managed Media Source
    - Media player stats overlay
    - And more video
  - HTML
    - Popover
    - And more HTML
  - CSS
    - Counter styles
    - Font size adjust
    - Text transform
    - Font support
    - Media Queries 4
    - And more CSS
  - JavaScript and Web API
    - Offscreen Canvas
    - Storage
    - RegEx
    - Set Operations
    - Gamepad API
    - URL API
    - Web Sockets
    - And more JavaScript and Web API
  - Web Developer Tools
    - Redesigned Develop Menu
    - Rethought Feature Flags
    - New Developer settings panel
    - New tab-specific setting overlay
    - Redesigned Responsive Web Design Mode
    - Simulators
    - Web Inspector
  - Security
    - GPU Process
  - WebGL
  - WebKit API
  - Browser changes
    - Safari Profiles
    - Safari Private Browsing
    - Text cursor color
    - Live Text
    - Apple Pay via Payment Request API
    - Authentication
    - Networking
    - Lockdown mode
- MotionMark Moves to Open Governance | WebKit
  - https://webkit.org/blog/14359/motionmark-moves-to-open-governance/

### Edge 動向

#### Stable: 114

#### Updates

#### Chakra

#### Other

- Improving the Microsoft Defender Browser Protection Extension - text/plain
  - https://textslashplain.com/2023/05/31/improving-the-microsoft-defender-browser-protection-extension/
- **Browser SSO / Automatic Signin - text/plain**
  - https://textslashplain.com/2023/06/22/browser-sso-automatic-signin/
- **Announcing Windows 11 Insider Preview Build 23486 | Windows Insider Blog**
  - https://blogs.windows.com/windows-insider/2023/06/22/announcing-windows-11-insider-preview-build-23486/
  - Windows Hello でパスキーのサポート

### WHATWG/W3C 動向

#### Draft

- Recommendation
  - **Accessible Rich Internet Applications (WAI-ARIA) 1.2 is a W3C Recommendation**
    - https://www.w3.org/news/2023/accessible-rich-internet-applications-wai-aria-1-2-is-a-w3c-recommendation/
  - **Web Share API is a W3C Recommendation**
    - https://www.w3.org/news/2023/web-share-api-is-a-w3c-recommendation/
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - First Public Working Draft: Verifiable Credentials JSON Schema Specification 2023
    - https://www.w3.org/news/2023/first-public-working-draft-verifiable-credentials-json-schema-specification-2023/
- Chartering

#### Other

- **W3C updates its Process Document | W3C News**
  - https://www.w3.org/blog/news/archives/9959
  - https://www.w3.org/news/2023/w3c-updates-its-process-document/
  - 数年前から行われていた Director からの権限移行を実施
  - Founding Director の TimBL は名誉職に
- **New W3C website deployed**
  - https://www.w3.org/news/2023/new-w3c-website-deployed/
- Planning new W3C website deployment
  - https://www.w3.org/news/2023/new-w3c-website-deployment/
- The W3C Membership has elected the Advisory Board
  - https://www.w3.org/news/2023/the-w3c-membership-has-elected-the-advisory-board/
- Proposal: Meta Tag for AI Consent Management · Issue #9334 · whatwg/html
  - https://github.com/whatwg/html/issues/9334
  - AI の学習にコンテンツが使われるのを防ぎたい人がオプトアウトできる手段を提案

### TC39 動向

#### Meeting

- 2023/5 (5/15-18)
  - https://github.com/tc39/agendas/blob/main/2023/05.md
  - https://github.com/tc39/notes/tree/main/meetings/2023-05
  - https://twitter.com/mozaicfm/status/1668242601869459457
  - https://docs.google.com/document/d/1qXUf4QRTbexUj0fg2sgYTxWwOT2v_q7lmjR282BOWLU
- **Well-Formed Unicode Strings for Stage 4**
  - Stage 4 へ
  - ES2024 入り
- **Atomics.waitAsync for Stage 4**
  - Stage 4 へ
  - ES2024 入り
- **Base64 for Uint8Array for Stage 2**
  - Base64, Hex の Uint8Array = String したい
  - Stage 2 に(割とサポーティブな人が多そう)
- **Module Harmony: interaction semantics of the different proposals**
  - module 関連の仕様が乱立してるし依存も複雑
  - これらを整理して依存を減らし、独立して進められるようにしたい
  - "Module Harmony Epic" という Repo を作って、懸念などをまとめたい
- **RegExp v flag for Stage 4**
  - Test262, Chrome/Safari, HTML の `<input pattern=>` など進んでる
  - Implementation in SpiderMonkey has started.
  - Stage 4 へ
- **Add Implementation status to proposal pages**
  - Array.grouping みたいなこともあるので Implementation Status や
  - 実装者に Do Not Ship などを伝えられるようにしたい
  - そのための Proposal Template Update を行う
- **Array.prototype.group rename for web compatibility**
  - 名前がヤバくなった
  - 元 Google で Vercel に行った Justine が忙しくなった
  - 名前決まってないし、なにもすすんでない
  - どうしよう?
  - Mozilla: そもそも Array.prototype に足すのが良くないのでは?
  - Map/Object の Static method にしよう
  - JHD が co-champion になって作業してくれる
  - 現時点では Stage 3 だが、一旦 Stage 2 に降格
- Source maps: Should TC39 standardize and improve them?
  - Source Map の作業はどこでやるのが適切か?
  - TC39 に TG4 というタスクグループを作りそこでやることに
- **Source Phase Imports for Stage 3**
  - was import-reflection
  - module harmony で source phase に rename
  - スコープが広いし、まだ不明瞭な点も多い
  - import source from from みたいなのがどうなるか
  - 概ね構文は認めるが意見が割れてる
  - Stage 2 のまま

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2023-05-01}...main@{2023-07-01}
- https://tc39.github.io/beta/
- 0->1
  - Formatting ZonedDateTime object
- 1->2
  - Time Zone Canonicalization
  - Promise.withResolvers
  - **Array.grouping**
- 2->3
  - Float16Array
  - Decorator Metadata
- 3->4
  - Well-formed Unicode Strings
  - Atomics.waitAsync
  - RegExp v flag

#### New Proposals

#### Other

### WinterCG 動向

#### Meeting

- **2023-06-01 Meeting Notes · Issue #51 · wintercg/admin**
  - https://github.com/wintercg/admin/issues/51
  - Raise the discussion about formal support of wintercg by Node.js (@jasnell)
  - Sockets spec w/ list of testable assertions (@jasnell)
  - Add WebAssembly JavaScript API to the Minimum common API (@andreubotella)
  - performance.now/timeOrigin PR needs review Add performance.now/timeOrigin proposal-common-minimum-api#40
  - Add import.meta.url and import.meta.resolve to the Minimum common API
  - Write up draft for pattern-matching dynamic imports for bundlers (@lucacasonato)

### IETF 動向

#### WG

- IETF
  - https://datatracker.ietf.org/meeting/
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - An HTTP Cache Invalidation API
    - https://www.ietf.org/archive/id/draft-nottingham-http-invalidation-00.html
  - HTTP Cache Groups
    - https://www.ietf.org/archive/id/draft-nottingham-http-cache-groups-00.html
  - RFC 9412 on The ORIGIN Extension in HTTP/3
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023AprJun/0263.html
  - 103 Early Hints from Lucas Pardue
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023AprJun/0248.html
    - Early Hints にも Client Hints みたいに Accept-EH 的なものがあった方がいいのではという議論
    - おそらくこの辺の議論
      - https://twitter.com/patmeenan/status/1667141142016663553
  - **HTTP Resumable Uploads on Apple Platforms**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023AprJun/0240.html
    - WWDC での Resumable Upload のデモについて
    - https://developer.apple.com/documentation/foundation/urlsession/building_a_resumable_upload_server_with_swiftnio
  - **Request-Off-The-Record Mode header**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023AprJun/0237.html
    - Brave は `Request-OTR: 1` が Response されると、そのサイトについて何も保存しない。
    - Incognito / Private Mode のようなものをサービス側が設定できる
    - サイトの性質によってはこういう機能の要望がある(例えば DV 被害者の救済サイト)
    - これを標準化しないかという話
    - https://brave.com/privacy-updates/26-request-off-the-record/
- quicwg
  - https://mailarchive.ietf.org/arch/browse/quic/
  - https://github.com/quicwg/wg-materials
  - RFC 9368 on Compatible Version Negotiation for QUIC
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/SkMkQw24J2eaPEOO_sMf-BRX06o/
  - RFC 9369 on QUIC Version 2
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/R-6b0TbssB9wSwmYoqN-0kEnxnc/
- webtrans
  - https://mailarchive.ietf.org/arch/browse/webtransport/
  - https://github.com/DavidSchinazi/webtrans-wg-materials
- tlswg
  - https://mailarchive.ietf.org/arch/browse/tls/
  - https://github.com/tlswg/wg-materials
  - Last Call: draft-ietf-uta-rfc6125bis-13.txt (Service Identity in TLS) to Proposed Standard
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/VDQT2_46mCb2Ex-KUSo0DwFxCQE/
- wpack
  - https://mailarchive.ietf.org/arch/browse/wpack/
- masque
- pearg
- privacypass
  - Last Call: draft-ietf-privacypass-auth-scheme-11.txt (The Privacy Pass HTTP Authentication Scheme) to Proposed Standard
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/612IJDogdcA8UjrvIpfMUl5__fo/
  - Last Call: draft-ietf-privacypass-architecture-13.txt (The Privacy Pass Architecture) to Informational RFC
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/zA9DE86MggK4OQjQq3ii2QReJMY/
- dispatch
  - https://mailarchive.ietf.org/arch/browse/dispatch/
- secdispatch
  - https://mailarchive.ietf.org/arch/browse/secdispatch/
- RFC 9425 on JSON Meta Application Protocol (JMAP) for Quotas
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/_zPVSe3V1b5SYvtwi-pXofcY-5o/
- RFC 9412 on The ORIGIN Extension in HTTP/3
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/js3N4EKzOqr0Uhad8OWhgh16I1k/
- RFC 9396 on OAuth 2.0 Rich Authorization Requests
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/b0yUEhOzg1NKmFrPHuPx-Cwm1T8/
- Protocol Action: 'CBOR Object Signing and Encryption (COSE): AES-CTR and AES-CBC' to Proposed Standard (draft-ietf-cose-aes-ctr-and-cbc-06.txt)
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/ErgYxi-f7Iv4LXpWFjHbcmGKYtk/
- Protocol Action: 'CoAP Transfer for the Certificate Management Protocol' to Proposed Standard (draft-ietf-ace-cmpv2-coap-transport-10.txt)
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/5capVXdu4x1d_m_A8Dtz9OiljMg/

#### Other

- **Reflections on Ten Years Past The Snowden Revelations**
  - https://www.ietf.org/archive/id/draft-farrell-tenyearsafter-05.html
  - スノーデン事件から 10 年のまとめ

### CDN 動向

#### Cloudflare

- **Introducing HTTP/3 Prioritization**
  - https://blog.cloudflare.com/better-http-3-prioritization-for-a-faster-web/
- **Examining HTTP/3 usage one year on**
  - https://blog.cloudflare.com/http3-usage-one-year-on/
- A step-by-step guide to transferring domains to Cloudflare
  - https://blog.cloudflare.com/a-step-by-step-guide-to-transferring-domains-to-cloudflare/
- **INP. Get ready for the new Core Web Vital**
  - https://blog.cloudflare.com/inp-get-ready-for-the-new-core-web-vital/
- Introducing Low-Latency HLS Support for Cloudflare Stream
  - https://blog.cloudflare.com/low-latency-hls-support-for-cloudflare-stream/

#### Fastly

#### Akamai

- Deliver Fast, Reliable, and Secure Web Experiences with HTTP/3 | Akamai
  - https://www.akamai.com/blog/performance/deliver-fast-reliable-secure-web-experiences-http3
- **OWASP Top 10 API Security Risks: The 2023 Edition Is Finally Here | Akamai**
  - https://www.akamai.com/blog/security/owasp-top-10-api-security-risks-2023-edition

### セキュリティ動向

- **Passkeys, iOS 17, and 1Password: A Sneak Peek at What's Coming | 1Password**
  - https://blog.1password.com/apple-passkey-api-wwdc/
- **「通信の秘密の保護」に制限検討 サイバー攻撃への対処、政府が強化 [岸田政権]:朝日新聞デジタル**
  - https://www.asahi.com/articles/ASR6R6W9YR6QUTFK016.html
- 総務省|報道資料|電気通信事業法の一部改正(卸協議の適正性の確保に係る制度整備関係)に係る関係ガイドラインの改定
  - https://www.soumu.go.jp/menu_news/s-news/01kiban03_02000859.html

### 周辺動向

- Vivaldi CEO のテッちゃんとお酒を飲みながら Vivaldi 談義してみた【単独インタビュー】【特集・集中企画】 - 窓の杜
  - https://forest.watch.impress.co.jp/docs/special/1506834.html
- DuckDuckGo's Windows browser now available in public beta
  - https://spreadprivacy.com/windows-browser-open-beta/
- **About the Squarespace purchase of Google Domains registrations**
  - https://support.google.com/domains/answer/13689670
  - Google Domains が Squarespace に事業譲渡
  - TLD ポリシー | Cloudflare
    - https://www.cloudflare.com/tld-policies/
- Squarespace Enters Definitive Agreement to Acquire Google Domains Assets - Squarespace
  - https://www.squarespace.com/press-releases/2023/6/15/squarespace-enters-definitive-agreement-to-acquire-google-domains-assets
- Conference News for June 2023 | Igalia
  - https://www.igalia.com/2023/05/31/Conference-News-for-June-2023.html
- **Web Engines Hackfest 2023 Starts Monday | Igalia**
  - https://www.igalia.com/2023/webengineshackfest.html
- Web Apps on macOS Sonoma 14 Beta
  - https://blog.tomayac.com/2023/06/07/web-apps-on-macos-sonoma-14-beta/
- Secure Curves in the Web Cryptography API - make everything intensely
  - https://blogs.igalia.com/jfernandez/2023/06/20/secure-curves-in-the-web-cryptography-api/
- **モバイル・エコシステムに関する競争評価 最終報告(案)**
  - https://www.kantei.go.jp/jp/singi/digitalmarket/kyosokaigi/dai7/siryou1s.pdf
  - https://www.kantei.go.jp/jp/singi/digitalmarket/kyosokaigi/dai7/siryou2s.pdf

### イベント

- 6 月
  - 5-9: WWDC 2023
    - https://developer.apple.com/wwdc23/
- 7 月
  - IETF | IETF 117 San Francisco
    - https://www.ietf.org/how/meetings/117/
- 9 月
  - 11-15: TPAC 2023
    - https://www.w3.org/2023/09/TPAC/
  - 26-28: W3C Workshop Secure the Web Forward
    - https://www.w3.org/2023/03/secure-the-web-forward/

### Wrap Up

- Chrome
  - 114
    - text-wrap: balance
    - CHIPS
    - Popover
    - DevTools DWARF
  - 115 Beta
    - Scroll-driven Animations
    - HTTPS upgrades
    - Storage Partitioning
    - Long Animation Frames OT
    - Storage Buckets API OT
    - Deprecate document.domain
    - DevTools
  - Ship
    - @scope
    - Subgrid
    - Document Picture-in-Picture
    - Iterator Helpers
    - Protected Audience
    - Attribution Reporting
    - Fenced Frames
    - Private Aggregation API
    - Topics API
    - text-wrap: pretty
  - Prototype
    - DOM Parts
    - Service Worker Static Routing
    - Zstd Content-Encoding
  - Experiment
    - EditContext API
  - Chrome Developers
    - Chrome for Testing
  - other
    - Popover breakage
    - Understanding passkeys video
- Firefox
  - 114
    - -webkit-text-security
    - Module Workers
  - Ship
    - Improved CSS Nesting
    - `URL.canParse()`
  - Prototype
    - WebCodecs
    - FedCM
    - allow beforeunload to enter BFCache
  - other
    - EKR leaving Mozilla for CDC
- Safari
  - 17 Beta
    - `<hr>` inside `<select>`
    - `<model>`
    - Popover
    - HEIC
    - JPEG XL
    - Storage Quota API
  - blog
    - WWDC
- Edge
  - Passkeys support in Windows 11 Insider
- W3C/WHATWG
  - Spec
    - WAI-ARIA1.2 Recommendation
    - Web Share API Recommendation
  - other
    - TimBL は Founding Director の名誉職に
    - New Web site deployed
- TC39
  - Well-Formed Unicode Strings for Stage 4
  - Atomics.waitAsync for Stage 4
  - RegExp v flag for Stage 4
  - Uint8Array to Base64 の Stage2
  - Modules 周りを整理する Module Harmony の作業開始
  - Array.prototype.group を Map/Object の Static にして Stage 2 にダウン
  - Source Map 作業をする TG4 を TC39 以下に作成
  - Import-Reflection を Source Phase に Rename し Harmony で整理
- WinterCG
  - Raise the discussion about formal support of wintercg by Node.js (@jasnell)
  - Add WebAssembly JavaScript API to the Minimum common API (@andreubotella)
  - Add import.meta.url and import.meta.resolve to the Minimum common API
- IETF
  - サーバから Private Mode を適用する Request-OTR by Brave
  - スノーデン事件から 10 年のまとめ
- CDN 動向
  - Cloudflare
    - Introducing HTTP/3 Prioritization
    - Examining HTTP/3 usage one year on
    - INP. Get ready for the new Core Web Vital
  - Akamai
    - OWASP Top 10 API Security Risks: The 2023 Edition Is Finally Here | Akamai
- セキュリティ動向
  - 1Password に Passkey 対応
  - 「通信の秘密の保護」に制限検討 サイバー攻撃への対処、政府が強化 [岸田政権]:朝日新聞デジタル
  - 総務省|報道資料|電気通信事業法の一部改正(卸協議の適正性の確保に係る制度整備関係)に係る関係ガイドラインの改定
- 周辺動向
  - Google Domains が Squarespace に事業譲渡
  - Web Engines Hackfest 2023 Starts Monday | Igalia
  - モバイル・エコシステムに関する競争評価 最終報告(案)
