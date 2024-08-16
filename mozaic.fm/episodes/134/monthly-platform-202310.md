---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep134.mp3
published_at: 2023-10-31
guest: [@myakura](https://twitter.com/myakura)
---

# ep134 Monthly Platform 202310

## Theme

第 134 回のテーマは 2023 年 10 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 118

#### Updates

- **New in Chrome 118 - Chrome for Developers**
  - https://developer.chrome.com/en/blog/new-in-chrome-118/
  - CSS @scope rule.
  - scripting and prefers-reduced-transparency media features
  - Sources panel improvements in DevTools
- **Chrome 119 beta - Chrome for Developers**
  - https://developer.chrome.com/en/blog/chrome-119-beta/
  - CSS
    - **`:user-valid` and `:user-invalid` CSS pseudo-classes**
    - CSS Relative Color Syntax (RCS)
    - CSS clip-path geometry-box values
    - CSS clip-path xywh() and rect() values
  - Web APIs
    - **Cookie Expires/Max-Age attribute upper limit for prior storage**
    - DisplayMediaStreamOptions monitorTypeSurfaces
    - Fenced Frames functionality updates
    - Intersection Observer scroll margin
    - Keyboard-focusable scroll containers
    - Private Network Access restrictions for automotive
    - **Read Chrome device attributes**
    - **Replace dangling markup in target name to `_blank`**
    - Sec-CH-Prefers-Reduced-Transparency user preference media features Client Hints header
    - **Standard compliant URL host punctuation characters**
    - WebCodecs AudioEncoder bitrateMode
    - X25519Kyber768 key encapsulation for TLS
  - Origin trials in progress
    - Open popups as fullscreen windows
  - Deprecations and removals
    - **Remove Web SQL**
    - **Remove Sanitizer API**
    - Remove data: URL in SVGUseElement
    - **Remove non-standard shadowroot attribute for declarative shadow DOM**
- What's New in DevTools (Chrome 119) - Chrome for Developers
  - https://developer.chrome.com/en/blog/new-in-devtools-119/
  - Improved @property section in Elements > Styles
    - Editable @property rule
    - Issues with invalid @property rules are reported
  - Updated list of devices to emulate
  - Pretty-print inline JSON in script tags in Sources
  - Autocomplete private fields in Console
  - Lighthouse 11.1.0
  - Accessibility improvements
  - Web SQL deprecation
  - Screenshot aspect ratio validation in Application > Manifest
  - Miscellaneous highlights

#### Intents

- **Ship: Accordion pattern using name attribute on `<details>` elements**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Bk6xulOmBn8
- Ship: Attribution Reporting API feature (aggregation coordinator selection)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6e44SBtEtcQ
- Ship: CSS `:dir()` pseudo-class selector
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kLRBZY8Qdd0
- **Ship: CSS `<image>` Syntax for registered Custom Properties**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TaYAeTPkA08
- Ship: Deprecate old CSS custom state syntax
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JvpHoUfhJYE
- Ship: Fire toggle events using microtasks
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9R5Zedd1-LE
- Ship: HTMLSelectElement `showPicker()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qew_ILTXWSY
- Ship: Media Session API: enterpictureinpicture action
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BEhYD8v4zY0
- Ship: PointerEvent.deviceId for Mult-Pen Inking
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3eU-AHH8x4k
- **Ship: Relaxed CSS Nesting**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ods7RbPlCjI
- **Ship: WebGPU f16 support**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AsKn-UwMYAE
- Ship: MediaStreamTrack Stats
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ttzYv-30gY4
- Ship: Implement requestPermission() for DeviceOrientationEvent and DeviceMotionEvent
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jy6QmMeV9gY
- Ship: Web Bluetooth getDevices(), BluetoothDevice.watchAdvertisements(), and BluetoothAdvertisingEvent
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lqCQ63CTKEQ
- Ship: The Login Status API and its use in FedCM
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BcQc001ObDI
- Ship: Async Clipboard API: Read unsanitized HTML
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oiPCXHy9kRE
- Ship: CSS `<transform-function>` and `<transform-list>` Syntax for registered Custom Properties
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sPL08jmYD7s
- Ship: CSS Exponential Functions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oAu01pBscs8
  - `pow()`, `sqrt()`, `hypot()`, `log()`, `exp()`
- **Ship: CSS Scrollbars: `scrollbar-color`, `scrollbar-width`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PkEsMirl2zE
  - webkit 独自だったものを標準化
- Ship: CSS masking
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ihw9gYY2ko0
- **Ship: Deprecate and remove Theora support**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qqDdLkeyk7Y
  - オープンな映像コーデックの Theora を外す
  - セキュリティリスクが高まっているため
  - すでに多くのビデオが VP8/9 などに移行しているため影響は少ないと判断
- Ship: FedCM extensions: Error API and Auto-Selected Flag API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UUCvZ27-gaI
- Ship: Fenced Frame - Functionality Updates
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aLv1yL_FFXw
- Ship: MediaCapabilities: Query HDR support with `decodingInfo()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0neM-5GDn8I
- Ship: Permissions policy violation reports
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ohGv2foP1SY
- Ship: Private Aggregation API: aggregation coordinator selection
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kze4FiMsZTY
- Ship: Protected Audience `clearOriginJoinedAdInterestGroups()` & interest group limit changes & kAnonStatus
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IfmYsMCUoHc
- **Ship: Ruby-specific display values**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UpHRuge9SfQ
- Ship: WebAssembly Multi-Memory
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WSrXwhKeSas
- Ship: WebCodecs support for enabling AV1 screen content coding tools
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BLAW7YO17jE
- Ship: WebGPU maxBindGroupsPlusVertexBuffers limit
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jIevLHrxejE
- Ship: Interoperable Pointer and Mouse boundary events after DOM changes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JvcRfrwRlcU
- **Ship: Array.fromAsync**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8-BdTuYXFH0
- Ship: WebGPU timestamp queries
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dtYJ0MQYMlU
- Ship: WebGPU on Android
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YFWuDlCKTP4
- Prototype: CSS Masking
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/C6hENTlF0NM
- **Prototype: Extending Storage Access API (SAA) to non-cookie storage**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/inRN8tI49O0
- **Prototype: Invokers**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tDanwUCp2cg
  - Popover/dialog を宣言的に開閉するための仕組み
  - ボタンに `invoketarget` 属性を追加し、ダイアログと関連付ける
- **Prototype: View Transitions: transition types**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/roeP_WO4lnc
- Prototype: HTTP method in ResourceTiming
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uAe0xpkPhZA
- **Prototype: Verifying IPFS client**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RPdRi1ZzQKU
- **Prototype: Web Printing API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eqKoitTdHeQ
- Prototype: WebAuthn related origins
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xCxtXr17JLs
- Implement and Ship: Feature detection for supported clipboard formats
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pjpN9Lwv5Tk
- **Implement and Ship: Media query support for video `<source>` elements**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QxNXdcTG0dI
- **Prototype and Ship: URL.canParse**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xYRE__nss_0
- **Re-implement and Ship: CSS Font Loading API - FontFaceSet: `check()` method**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TEgS0cqhZoI
- **Experiment: `'priority'` HTTP request header**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Do3kwLuf02c
- Experiment: Protected Audience Bidding & Auction Services
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2bwMHd3Yz7I
- Experiment: Unrestricted access to performance.measureUserAgentSpecificMemory()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fnQ727eQm9Y
- **Experiment: Web app scope extensions**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rGcbrUBB-5E
- **Experiment: IP Protection Phase 0**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9s8ojrooa_Q
- Experiment: Private Network Access permission to relax mixed content
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sL15TKGmXqM
- **Experiment: Cookie Deprecation Labeling**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3escBQGtIpM
- Experiment: Load common payloads from privacy-preserving single-keyed cache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9xWJK3IgJb4
- Experiment: Extending Storage Access API (SAA) to non-cookie storage
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SEL7N-xIE5s
- Request for Extend Deprecation Trial: Restrict "private network requests" for subresources from public websites to secure contexts.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/I9K_sDEsLPc
- Extend Experiment: No-Vary-Search header, Speculation Rules expects_no_vary_search support in prefetch cache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7oMlGWmVv2Q
- Extend Origin Trial: Cross App and Web Attribution Measurement M120-M123
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0drGQpsOKh0
- PSA: Extra supported format for Protected Audience size macros
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3JfA8EUBEgQ
- PSA: New baseline format for test-harness tests
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rOs0s4Bj3kU
- PSA: Web IDL async iterable now supported in Blink-V8 bindings
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4RHjxafFvFk
- **PSA: request TAG feedback early!**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Op8oYL4rp8k
- PSA: Storage Access API & dedicated workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vD6p7IJqNFA
- PSA: requestAnimationFrame & DocumentTImeline timestamps time are now coarsensed
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vu_BQq4Ay7s
- Web-Facing Change PSA: Set IndexedDB transaction durability to `relaxed` by default
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3jyazaUTJfQ
- Merging a UseCounter addition
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fRShp8GB-oc
- Don't forget to sign up to host a talk at BlinkOn 18!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tvlsVUzjmhY
- We're just 1 week away from BlinkOn 18!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6b3SiWx6FDQ
- [blink-dev] BlinkOn 18 is tomorrow!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-AztTpg9r6A
- Web-Facing Change PSA: View Transitions: making callback non-nullable
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-VYLtD28nHI
- Change:
- Unship:
- Remove:

#### Other

- web.dev
  - Effectively loading ads without impacting page speed
    - https://web.dev/loading-ads-page-speed/
  - New to the web platform in September
    - https://web.dev/web-platform-09-2023/
  - **Changes to the web.dev infrastructure**
    - https://web.dev/blog/webdev-migration?hl=en
- google developer blog
  - Join us online from 23-27 October for Passkeys Week - Google for Developers
    - https://developers.googleblog.com/2023/10/join-us-for-passkeys-week.html
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - What's New in WebGPU (Chrome 118) - Chrome for Developers
    - https://developer.chrome.com/en/blog/new-in-webgpu-118/
  - Chrome starts supporting passkeys on iCloud Keychain on macOS - Chrome for Developers
    - https://developer.chrome.com/en/blog/passkeys-on-icloud-keychain/
  - DevTools Tips: Debugging Chrome extensions - Chrome for Developers
    - https://developer.chrome.com/en/blog/devtools-tips-27/
  - **New origin trial for fullscreen popup windows - Chrome for Developers**
    - https://developer.chrome.com/en/blog/fullscreen-popups-origin-trial/
  - API Improvements for working with files in the browser - Chrome for Developers
    - https://developer.chrome.com/en/blog/new-dev-trial-for-multiple-readers-and-writers/
  - **Preparing for the end of third-party cookies - Chrome for Developers**
    - https://developer.chrome.com/en/blog/cookie-countdown-2023oct/
  - CSS relative color syntax - Chrome for Developers
    - https://developer.chrome.com/en/blog/css-relative-color-syntax/
  - Serial over Bluetooth on the web - Chrome for Developers
    - https://developer.chrome.com/en/blog/serial-over-bluetooth/
  - **Chromium issue tracker migration - Chrome for Developers**
    - https://developer.chrome.com/en/blog/chromium-issue-tracker-migration/
    - 2024 年 1 月に Chromium の issue 管理を bugs.chromium.org から Google Issue Tracker に変更する
  - Sanitizer API deprecation - Chrome for Developers
    - https://developer.chrome.com/en/blog/sanitizer-api-deprecation/
  - **What's happening in Chrome Extensions? - Chrome for Developers**
    - https://developer.chrome.com/en/blog/extension-news-october-2023/
  - Select element: now with horizontal rules - Chrome for Developers
    - https://developer.chrome.com/en/blog/hr-in-select/
  - **CSS text-wrap: pretty - Chrome for Developers**
    - https://developer.chrome.com/en/blog/css-text-wrap-pretty/
  - What's New in WebGPU (Chrome 119) - Chrome for Developers
    - https://developer.chrome.com/en/blog/new-in-webgpu-119/
  - CSS prefers-reduced-transparency - Chrome for Developers
    - https://developer.chrome.com/en/blog/css-prefers-reduced-transparency/
- chromium blog
  - https://blog.chromium.org/
  - **Chromium Blog: Unlocking the power of TLS certificate automation for a safer and more reliable Internet**
    - https://blog.chromium.org/2023/10/unlocking-power-of-tls-certificate.html
  - Chromium Blog: Update to Developers: Chromium Issue Tracker migration
    - https://blog.chromium.org/2023/10/update-to-developers-chromium-issue.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - Google Online Security Blog: Expanding our exploit reward program to Chrome and Cloud
    - https://security.googleblog.com/2023/10/expanding-our-exploit-reward-program-to.html
  - Google Online Security Blog: Scaling BeyondCorp with AI-Assisted Access Control Policies
    - https://security.googleblog.com/2023/10/scaling-beyondcorp-with-ai-assisted.html
  - Google Online Security Blog: Enhanced Google Play Protect real-time scanning for app installs
    - https://security.googleblog.com/2023/10/enhanced-google-play-protect-real-time.html
  - Google Online Security Blog: Joint Industry statement of support for Consumer IoT Security Principles
    - https://security.googleblog.com/2023/10/joint-industry-statement-of-support-for.html
  - Google Online Security Blog: Google's reward criteria for reporting bugs in AI products
    - https://security.googleblog.com/2023/10/googles-reward-criteria-for-reporting.html
  - Google Online Security Blog: Increasing transparency in AI security
    - https://security.googleblog.com/2023/10/increasing-transparency-in-ai-security.html
  - Google Online Security Blog: Android 14 introduces first-of-its-kind cellular connectivity security features
    - https://security.googleblog.com/2023/08/android-14-introduces-first-of-its-kind.html
- v8
  - Control-flow Integrity in V8 · V8
    - https://v8.dev/blog/control-flow-integrity
- other
  - **BlinkOn 18**
    - https://www.chromium.org/events/blinkon-18/
    - https://docs.google.com/spreadsheets/d/1JaGAVGQqFLadHBRDtBiUAEFW2jDfvwQpI3FQD9BknFc/edit
    - https://docs.google.com/spreadsheets/d/1otWvI2raI04IW-xaZVTQV12vr9gnxN9MaSefVxkALpc/edit
    - https://www.youtube.com/playlist?list=PL9ioqAuyl6UKYm7EYVa7FcKCR2kDCudII
  - **Passkeys are now enabled by default for Google users**
    - https://blog.google/technology/safety-security/passkeys-default-google-accounts/
  - How Passkeys work: A Google security expert explains
    - https://blog.google/inside-google/googlers/ask-a-techspert/how-passkeys-work/
  - **5 improvements to Chrome's address bar**
    - https://blog.google/products/chrome/chrome-address-bar-updates/
  - Project Zero: An analysis of an in-the-wild iOS Safari WebContent to GPU Process exploit
    - https://googleprojectzero.blogspot.com/2023/10/an-analysis-of-an-in-the-wild-ios-safari-sandbox-escape.html
  - **PC 版 Chrome で艦これを起動しようとすると画面が真っ白になる!|キニナルベル**
    - https://kininaruberu.com/kancollearekore/chrome_login
    - HTTPS Upgrades により mixed contents となってしまい表示されない?
  - 艦これの表示が壊れた
    - https://twitter.com/KanColle_STAFF/status/1713048810291962131
    - > 「艦これ」開発/運営 on X: "提督の皆さん、お疲れさまです! ブラウザ【 Chrome 】さんの今夏～秋の更新以降、「艦これ」接続時に真っ白い画面で動作しないケースが発生する場合がありますが、この場合は下記の方法などで Chrome でも接続可能です。 Chrome 提督でお困りの方はお試しください。
    - > https 移行も準備していますが、既に使われている一般ではない(そして通信及び機能的には問題のない)ブラウザ環境も留意して、移行は慎重にしています。
  - Google Chrome で Web サイトが表示されなくなったお客様へ | さくらのサポート情報
    - https://help.sakura.ad.jp/notification/n-2624/
    - おそらく HTTPS Upgrade によって表示されないサイトが出ている
  - 公開中の Web サイトに Google Chrome でアクセスできなくなった - よくあるご質問 - さくらのサポート情報
    - https://faq.sakura.ad.jp/s/article/000001530
    - > Google Chrome のアップデートで、 HTTP 接続(http://～ )が自動で HTTPS 接続(https://～)にリダイレクトされるようになり、 SSL の設定が有効になっていないと、正常に表示できなくなってしまう場合があります。
    - 証明書を設定するように誘導している

### Firefox 動向

#### Stable: 119

#### Updates

- Firefox 119.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/119.0/releasenotes/
- **Firefox 119 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/119
  - Array grouping
  - Well-formed Unicode strings
  - COEP: credentialless
  - ARIA reflection (non-IDREF)
- All Lights Green for 119 - These Weeks in Firefox: Issue 145 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2023/10/02/all-lights-green-for-119-these-weeks-in-firefox-issue-145/
- Developments Aplenty for 120 - These Weeks in Firefox: Issue 146 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2023/10/10/developments-aplenty-for-120-these-weeks-in-firefox-issue-146/
- More WebExtensions! Coming to an Android near you soon - These Weeks in Firefox: Issue 147 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2023/10/19/more-webextensions-coming-to-an-android-near-you-soon-these-weeks-in-firefox-issue-147/

#### Intents

- **Ship: CSS `text-wrap: balance`**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/uAscf5sfEdc
- **Ship: Early Hints Preconnect for Fx120**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/RBv4SMie9gA
  - preconnect のみ
- Ship: Storage Access API, update to per-frame model
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/zZGj1sY8DBo
- **Ship: Global Privacy Control**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/373F82Jzcjs
  - `Sec-GPC`, `navigator.globalPrivacyControl`
- **Prototype and Ship: Line-height Units (lh, rlh)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/o0PtsvQMgVI
- Prototype and Ship: CSS text-indent keywords `hanging` & `each-line`
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/z6PaiICBCRg
- **Prototype and Ship: User Activation API**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/YpjKfr4MQIE
- **Prototype and Ship: iframe lazy loading**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/s-Ssm1n14TU
- **Prototype and Ship: `light-dark()` color function**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/18t2jK1FtJA
  - ライトモード、ダークモード時の色を一括指定できる関数
  - eg. `color: light-dark(black, white); background: light-dark(white, black)`
- Change:
- Remove:

#### Newsletter

- Firefox WebDriver Newsletter - 119 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-119/
- Firefox DevTools Newsletter - 119 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-119/

#### MDN / Open Web Docs

- **Docs to Secure the Web Forward**
  - https://openwebdocs.org/content/posts/secure-the-web-forward/
  - Secure the Web Forward に OWD が参加
  - Documentation for web security education が必要という話をした
  - MDN で行ったアンケートで Security 周りの理解が難しいという結果を経て
- **Sovereign Tech Fund invests in Open Web Docs**
  - https://openwebdocs.org/content/posts/sovereign-tech-fund/
  - Sovereign Tech Fund からの援助で BCD(Browser Compat Data) の自動更新や機能のグループ化に取り組む
  - STF はドイツの連邦経済・気候保護省が出資、 SPRIND(ドイツのイノベーション関係の機関)運営
- Migrating from GitHub to GitLab seamlessly: A step-by-step guide | MDN Blog
  - https://developer.mozilla.org/en-US/blog/migrating-from-github-to-gitlab-seamlessly-a-step-by-step-guide/
- **Introduction to web sustainability | MDN Blog**
  - https://developer.mozilla.org/en-US/blog/introduction-to-web-sustainability/
  - Web のパフォーマンス改善が SDG に繋がる
- Optimizing DevSecOps workflows with GitLab's conditional CI/CD pipelines | MDN Blog
  - https://developer.mozilla.org/en-US/blog/optimizing-devsecops-workflows-with-gitlab-conditional-ci-cd-pipelines/
- **Coming Soon: MDN Observatory 2.0 | MDN Blog**
  - https://developer.mozilla.org/en-US/blog/mdn-observatory/

#### Standard Position

- 今月 Close された Issue と PR ものをみる
  - https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2023-10-01+
  - Positive
    - Fire toggle events using microtasks · Issue #901 · mozilla/standards-positions
      - https://github.com/mozilla/standards-positions/issues/901
    - Feature detection for supported clipboard formats · Issue #889 · mozilla/standards-positions
      - https://github.com/mozilla/standards-positions/issues/889
    - **Allow `<hr>` tags inside `<select>` tags · Issue #887 · mozilla/standards-positions**
      - https://github.com/mozilla/standards-positions/issues/887
    - **HTMLSelectElement `showPicker()` · Issue #886 · mozilla/standards-positions**
      - https://github.com/mozilla/standards-positions/issues/886
    - **CSS Color 5: Relative Color Syntax · Issue #841 · mozilla/standards-positions**
      - https://github.com/mozilla/standards-positions/issues/841
    - **Lazy loading for iframes · Issue #840 · mozilla/standards-positions**
      - https://github.com/mozilla/standards-positions/issues/840
    - **UserActivation API · Issue #838 · mozilla/standards-positions**
      - https://github.com/mozilla/standards-positions/issues/838
    - **Request for Mozilla Position: Zstandard compression format for Content-Encoding · Issue #775 · mozilla/standards-positions**
      - https://github.com/mozilla/standards-positions/issues/775
    - Request for Mozilla Position: import conditions - supports() · Issue #761 · mozilla/standards-positions
      - https://github.com/mozilla/standards-positions/issues/761
    - **fetch streaming upload · Issue #663 · mozilla/standards-positions**
      - https://github.com/mozilla/standards-positions/issues/663
    - **Storage Buckets API · Issue #475 · mozilla/standards-positions**
      - https://github.com/mozilla/standards-positions/issues/475

#### Other

- **Say (an encrypted) hello to a more private internet**
  - https://blog.mozilla.org/en/products/firefox/encrypted-hello/
- Mozilla announces 25 honorees for the Rise 25 Awards
  - https://blog.mozilla.org/en/mozilla/rise-25-winners/
- **Built for privacy: Partnering to deploy Oblivious HTTP and Prio in Firefox**
  - https://blog.mozilla.org/en/products/firefox/partnership-ohttp-prio/
- **Built for Privacy: Partnering to Deploy Oblivious HTTP and Prio in Firefox - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2023/10/built-for-privacy-partnering-to-deploy-oblivious-http-and-prio-in-firefox/
- Intent to Approve Commscope's CA Inclusion Request
  - https://www.mail-archive.com/dev-security-policy@mozilla.org/msg01433.html
- Updated Incident Reporting Requirements
  - https://www.mail-archive.com/dev-security-policy@mozilla.org/msg01436.html
- Introducing Mozilla's AI Guide, the developers onboarding ramp to AI
  - https://blog.mozilla.org/en/mozilla/introducing-mozillas-ai-guide-the-developers-onboarding-ramp-to-ai/
- Global Network Fee Proposals are Troubling. Here are Three Paths Forward. - Open Policy & Advocacy
  - https://blog.mozilla.org/netpolicy/2023/10/26/global-network-fee-proposals-are-troubling-here-are-three-paths-forward/

### Safari 動向

#### Stable: 17.1

#### Updates

- **Safari Technology Preview 180**
  - https://webkit.org/blog/14664/release-notes-for-safari-technology-preview-180/
  - Added support for `rect()` shape for `shape-outside`, `clip-path`, and `offset-path`.
  - Removed support for the auto value from alignment-baseline. (268008@main)
  - Added support for CanDeclareGlobalFunction abstract operation and related implementations. (267655@main)
  - Added support for HasVarDeclaration abstract operation. (267891@main)
- **Safari Technology Preview 181 | WebKit**
  - https://webkit.org/blog/14721/release-notes-for-safari-technology-preview-181/
  - **Added support for content-visibility. (268313@main) (114734606)**
  - **Added support for one-time-code as an allowed autocomplete field name. (268097@main) (115684196)**
  - Added MediaStream support for whiteBalanceMode. (268102@main) (115552800)
  - Removed margin-trim behavior for floats to match specification changes. (268227@main) (115794102)
- **WebKit Features in Safari 17.1**
  - https://webkit.org/blog/14735/webkit-features-in-safari-17-1/
  - Managed Media Source API to iPhone

#### Standard Positions

- 今月 Close されたものをみる
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2023-10-01+
  - Support
    - Request for position: WebDriver BiDi · Issue #240 · WebKit/standards-positions
      - https://github.com/WebKit/standards-positions/issues/240
    - **CSS Ruby Annotation Layout Module Level 1 · Issue #232 · WebKit/standards-positions**
      - https://github.com/WebKit/standards-positions/issues/232
    - Resource Timing: Add interim response timings · Issue #109 · WebKit/standards-positions
      - https://github.com/WebKit/standards-positions/issues/109
    - CustomStateSet for custom elements · Issue #56 · WebKit/standards-positions
      - https://github.com/WebKit/standards-positions/issues/56
    - **Wildcards in Permissions Policy Origins · Issue #51 · WebKit/standards-positions**
      - https://github.com/WebKit/standards-positions/issues/51
    - **Navigation API · Issue #34 · WebKit/standards-positions**
      - https://github.com/WebKit/standards-positions/issues/34
  - Neutral
    - border-boundary CSS property · Issue #201 · WebKit/standards-positions
      - https://github.com/WebKit/standards-positions/issues/201
  - Oppose
    - **Compute Pressure API · Issue #255 · WebKit/standards-positions**
      - https://github.com/WebKit/standards-positions/issues/255
    - **Web Preferences API · Issue #252 · WebKit/standards-positions**
      - https://github.com/WebKit/standards-positions/issues/252

#### Other

- **Get ready for Interop 2024 | WebKit**
  - https://webkit.org/blog/14633/get-ready-for-interop-2024/
- **Simplified Responsive Design Mode | WebKit**
  - https://webkit.org/blog/14670/simplified-responsive-design-mode/

### Edge 動向

#### Stable: 118

#### Updates

#### Other

- **Announcing general availability of the new Microsoft Teams app for Windows and Mac - Microsoft Community Hub**
  - https://techcommunity.microsoft.com/t5/microsoft-teams-blog/announcing-general-availability-of-the-new-microsoft-teams-app/ba-p/3934603
- **Rebuilt Microsoft Teams app promises twice the speed and half the RAM usage | Ars Technica**
  - https://arstechnica.com/gadgets/2023/10/rebuilt-microsoft-teams-app-promises-twice-the-speed-and-half-the-ram-usage/
  - Teams アプリが Electron から WebView2 ベースになった
  - macOS の WebView2 もベータで出ているらしい
- **Home - Microsoft Apps**
  - https://apps.microsoft.com/
  - Microsoft Store がリニューアル
  - Judah Gabriel: "Hey! Today we released the new https://t.co/g2dIFhnDWG - app store for Windows. 🎉 Proud of this work! It's built with web components, using @buildWithLit, @shoelace_style, @vite_js, @pwabuilder's PWA template, App Tools router, running on C# ASPNET backend. 😎"
  - https://twitter.com/JudahGabriel/status/1710075338326454390
  - 以前は React だったが、 Vite, PWABuilder, Lit, Shoelace などに移行
- Fiddler Web Debugger Turns 20 - text/plain
  - https://textslashplain.com/2023/10/05/fiddler-turns-twenty/
- **Security Tradeoffs: Privacy - text/plain**
  - https://textslashplain.com/2023/10/04/security-tradeoffs-privacy/
  - DoH や ECH が有効になることでプライバシー保護は向上している
  - しかし、接続先が IP しかわらかなくなるため、セキュリティ製品が機能しなくなる
  - そこで Managed なデバイスではオフにされることがある
  - ここにセキュリティとプライバシーのトレードオフがある
- Beware: URLs are Pointers to Mutable Entities - text/plain
  - https://textslashplain.com/2023/10/13/beware-urls-are-pointers-to-mutable-entities/
- Security: The Impact of Time - text/plain
  - https://textslashplain.com/2023/10/16/security-the-impact-of-time/
- ServiceWorkers vs. Network Filtering - text/plain
  - https://textslashplain.com/2023/10/17/serviceworkers-vs-network-filtering/
- Protecting Auth Tokens - text/plain
  - https://textslashplain.com/2023/10/23/protecting-auth-tokens/

### WHATWG/W3C 動向

#### Draft

- Recommendation
  - **Web Content Accessibility Guidelines (WCAG) 2.2 is a W3C Recommendation**
    - https://www.w3.org/news/2023/web-content-accessibility-guidelines-wcag-2-2-is-a-w3c-recommendation/
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
- Chartering
  - Advance notice: Work in progress on Devices and Sensors Working Group Charter
    - https://lists.w3.org/Archives/Public/public-new-work/2023Oct/0001.html
  - Call for Participation: Math Working Group Charter Approved; Join the Math WG
    - https://lists.w3.org/Archives/Public/public-new-work/2023Oct/0011.html
  - Call for Participation: MiniApps Working Group Charter Approved; Join the MiniApps WG
    - https://lists.w3.org/Archives/Public/public-new-work/2023Oct/0012.html
  - Call for Participation: PNG Working Group Charter Approved; Join the PNG WG
    - https://lists.w3.org/Archives/Public/public-new-work/2023Oct/0014.html
  - Call for Participation: Web of Things Working Group Charter Approved; Join the WoT WG
    - https://lists.w3.org/Archives/Public/public-new-work/2023Oct/0002.html
  - **New incubation: Cross-Origin-Opener-Policy: restrict-properties**
    - https://lists.w3.org/Archives/Public/public-new-work/2023Oct/0004.html
  - Open Cloud Mesh Community Group created
    - https://lists.w3.org/Archives/Public/public-new-work/2023Oct/0005.html
  - Proposed W3C Charter: Private Advertising Technology Working Group (until 2023-11-13/14)
    - https://lists.w3.org/Archives/Public/public-new-work/2023Oct/0013.html
  - Proposed W3C Charter: WebAssembly Working Group (until 2023-11-09/10); Current Charter Extended
    - https://lists.w3.org/Archives/Public/public-new-work/2023Oct/0010.html

#### Other

- **Hiring: Web Security Lead | 2023 | News | W3C**
  - https://www.w3.org/news/2023/hiring-web-security-lead/
  - > W3C is seeking a full-time staff member to lead our Web Security standardization efforts.
  - https://www.w3.org/careers/2023-web-security-lead-job-posting/
- **W3C announces Seth Dobbs as next CEO**
  - https://www.w3.org/news/2023/w3c-announces-seth-dobbs-as-ceo/
- **The WHATWG Blog - The URL Pattern Standard**
  - https://blog.whatwg.org/url-pattern-standard
  - URLPattern が WHATWG の仕様に
- URL Pattern Standard
  - https://urlpattern.spec.whatwg.org/

### TC39 動向

#### Meeting

- 今月の minutes はまだ読み終わってないので来月
- 2023-07
  - https://github.com/tc39/agendas
  - https://github.com/tc39/notes

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2023-01-01}...main@{2023-02-01}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->3
- 3->4

#### New Proposals

#### Other

- TC39-TG4 - Ecma International
  - https://www.ecma-international.org/task-groups/tc39-tg4/
- **6 年を経て Float16Array を Stage 3 にしてもらった - pixiv inside**
  - https://inside.pixiv.blog/2023/10/19/130000

### WinterCG 動向

- Meeting や大きな動きがあった月だけやる

#### Meeting

- 2023-10-05 - Meeting · Issue #56 · wintercg/admin
  - https://github.com/wintercg/admin/issues/56
  - 特になし

### IETF 動向

#### WG

- IETF
  - https://datatracker.ietf.org/meeting/
  - IETF 118 Final Agenda
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/zvZlmz08s8CJkFtDUTDqfx7dJg0/
  - IETF 118 Preliminary Agenda
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/-imxbg08jHQqimCw95uFzwVb1Bs/
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - Artart last call review of draft-ietf-httpbis-alias-proxy-status-05
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023OctDec/0048.html
  - Call for adoption: draft-nottingham-http-cache-groups
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023OctDec/0066.html
  - DRAFT agenda for IETF119 from Mark Nottingham
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023OctDec/0098.html
  - Genart last call review of draft-ietf-httpbis-alias-proxy-status-05
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023OctDec/0043.html
  - Httpdir last call review of draft-ietf-wish-whip-09
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023OctDec/0001.html
  - I-D Action: draft-ietf-httpbis-resumable-upload-02.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023OctDec/0079.html
  - I-D Action: draft-ietf-httpbis-unprompted-auth-05.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023OctDec/0081.html
  - IETF 118 hackathon project for resumable uploads
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023OctDec/0080.html
  - Intdir telechat review of draft-ietf-httpbis-alias-proxy-status-05
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023OctDec/0092.html
  - Last Call: draft-ietf-httpbis-alias-proxy-status-05.txt (HTTP Proxy-Status Parameter for Next-Hop Aliases) to Proposed Standard
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023OctDec/0002.html
  - Opsdir last call review of draft-ietf-httpbis-alias-proxy-status-05
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023OctDec/0022.html
  - Prague side meeting: HTTP/2 concurrency and request cancellation (CVE-2023-44487) from Mark Nottingham
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023OctDec/0025.html
  - Robert Wilton's No Objection on draft-ietf-httpbis-alias-proxy-status-05: (with COMMENT)
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023OctDec/0102.html
  - Secondary Certificates from Mark Nottingham
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023OctDec/0036.html
  - Unprompted Auth and Exported Authenticators
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2023OctDec/0026.html
- quicwg
  - https://mailarchive.ietf.org/arch/browse/quic/
  - https://github.com/quicwg/wg-materials
  - I-D Action: draft-ietf-quic-ack-frequency-07.txt
    - https://mailarchive.ietf.org/arch/msg/quic/lfk2nXXmOWBJSrOiptpw9MXfiIA/
  - I-D Action: draft-ietf-quic-multipath-06.txt
    - https://mailarchive.ietf.org/arch/msg/quic/PkfuVDQpqx3iJTYOfXMyv957d5Q/
  - I-D Action: draft-ietf-quic-qlog-main-schema-07.txt
    - https://mailarchive.ietf.org/arch/msg/quic/fHP75uDHuIeSe6E7M41XJbhoPY4/
  - I-D Action: draft-ietf-quic-qlog-quic-events-06.txt
    - https://mailarchive.ietf.org/arch/msg/quic/y3Rb8UxAQlys385NNaDCfdesx64/
  - I-D Action: draft-ietf-quic-reliable-stream-reset-03.txt
    - https://mailarchive.ietf.org/arch/msg/quic/lfGROBkXcEeD0u5hIGUXirTF2NU/
  - IETF 118 Agenda Items
    - https://mailarchive.ietf.org/arch/msg/quic/cochzXzXDMR6kbt7nDHg04wemE0/
  - Multipath QUIC Interop at Hackathon
    - https://mailarchive.ietf.org/arch/msg/quic/KqPpw4Kmo1BxjkWdIiNkJN9oZkA/
  - QUIC Address Discovery
    - https://mailarchive.ietf.org/arch/msg/quic/nVvJZ1DXnpL6SWTXVQDafBYRuB4/
  - Reliable Stream Resets: Requesting a Reset at a Specific Offset
    - https://mailarchive.ietf.org/arch/msg/quic/pWucz4c5U41avIWjThQcJCAPcro/
  - TSV AD office hours
    - https://mailarchive.ietf.org/arch/msg/quic/7gZU9ECSIahrukJJYN3PHbV_EfU/
  - quic - Requested session has been scheduled for IETF 118
    - https://mailarchive.ietf.org/arch/msg/quic/QAh8DCGPHagJTxORUYo5TwrTPg4/
- webtrans
  - https://mailarchive.ietf.org/arch/browse/webtransport/
  - https://github.com/DavidSchinazi/webtrans-wg-materials
- tlswg
  - https://mailarchive.ietf.org/arch/browse/tls/
  - https://github.com/tlswg/wg-materials
  - Closing out final ECH issues
    - https://mailarchive.ietf.org/arch/msg/tls/jNgf5aZrW5vD-eA91q3dNvcu7K0/
  - I-D Action: draft-ietf-tls-ctls-09.txt
    - https://mailarchive.ietf.org/arch/msg/tls/dorFaXV9SqucLDEumIZ1Un6NbR0/
  - I-D Action: draft-ietf-tls-dtls-rrc-10.txt
    - https://mailarchive.ietf.org/arch/msg/tls/g7GJMwP3V4y5cwThRzV3aKKRTos/
  - I-D Action: draft-ietf-tls-esni-17.txt
    - https://mailarchive.ietf.org/arch/msg/tls/4kJp05RtX--O-6ku8-RfYPi5WJ4/
  - I-D Action: draft-ietf-tls-rfc8447bis-05.txt
    - https://mailarchive.ietf.org/arch/msg/tls/y9-puKzI5Eo1AlFJoNxoNd_NPQs/
  - I-D Action: draft-ietf-tls-wkech-04.txt
    - https://mailarchive.ietf.org/arch/msg/tls/_Tig9bWmSrdUKEQu2nJcbMeobcc/
  - Legacy RSASSA-PKCS1-v1_5 codepoints for TLS 1.3
    - https://mailarchive.ietf.org/arch/msg/tls/D5BxRlH8izgOus9JD_QivmsJ_AE/
  - tls@ietf118
    - https://mailarchive.ietf.org/arch/msg/tls/D0iKZmCQpDbyaCfkoH0pDCt-Uzs/
- wpack
  - https://mailarchive.ietf.org/arch/browse/wpack/
- masque
- pearg
- privacypass
- ohai
  - I-D Action: draft-ietf-ohai-svcb-config-07.txt
    - https://mailarchive.ietf.org/arch/msg/ohai/7XgXPPIdXqPL-g6F1f_LQPYoen8/
  - Protocol Action: 'Discovery of Oblivious Services via Service Binding Records' to Proposed Standard (draft-ietf-ohai-svcb-config-07.txt)
    - https://mailarchive.ietf.org/arch/msg/ohai/FcYXNXgbFAu_KqERxZGNMYvBr-g/
  - Requesting Review of W3C Verifiable Credentials guidance on Oblivious HTTP
    - https://mailarchive.ietf.org/arch/msg/ohai/_tpR1JxF0Tm1YhH3VOnTkFqZ7DE/
- dispatch
  - https://mailarchive.ietf.org/arch/browse/dispatch/
- secdispatch
  - https://mailarchive.ietf.org/arch/browse/secdispatch/

#### Other

- Call for Comment: draft-iab-privacy-partitioning-03 (Partitioning as an Architecture for Privacy)
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/Cj6YzFPvE--9G5Rrm0NQUwqL0Go/
- Constrained RESTful Environments (core) WG Interim Meeting Cancelled (was 2023-10-25)
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/fiAZv3236gcQ5igD6HfuGmAF6pE/
- IAB Statement on the Risks of Attestation of Software and Hardware on the Open Internet
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/fDPnwsNs-lLf4JYoKAf6TansYPU/
- Last Call: draft-ietf-tsvwg-ecn-encap-guidelines-20.txt (Guidelines for Adding Congestion Notification to Protocols that Encapsulate IP) to Best Current Practice
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/UsMcSyOoTGiM-Vw1fbPl94q0dVQ/
- Last Call: draft-ietf-tsvwg-rfc6040update-shim-19.txt (Propagating Explicit Congestion Notification Across IP Tunnel Headers Separated by a Shim) to Proposed Standard
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/MRWWU6ZBBnE88C1a5J-iZ1SpVQA/
- Protocol Action: 'Discovery of Oblivious Services via Service Binding Records' to Proposed Standard (draft-ietf-ohai-svcb-config-07.txt)
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/uPfMc8Wf2P_1nBj7KLeQAW4LpQ4/
- Protocol Action: 'Privacy Pass Issuance Protocol' to Proposed Standard (draft-ietf-privacypass-protocol-16.txt)
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/eI8WJeDDToWHd4NvYdogAokHx_c/
- **RFC 9474 on RSA Blind Signatures**
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/FG_bxAsDZUiTf2HiFIQDCAl8Y4U/
- **RFC 9484 on Proxying IP in HTTP**
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/bcNiP8zKpybSmIE6kNz36tj2wTQ/
- RFC 9495 on Certification Authority Authorization (CAA) Processing for Email Addresses
  - https://mailarchive.ietf.org/arch/msg/ietf-announce/IwM-l3IIZcm1CaebBbA-PrUiv8k/

### CDN 動向

#### Cloudflare

- **1.1.1.1 lookup failures on October 4th, 2023**
  - https://blog.cloudflare.com/1-1-1-1-lookup-failures-on-october-4th-2023/
- 2023 年 10 月 4 日の 1.1.1.1 ルックアップ障害
  - https://blog.cloudflare.com/ja-jp/1-1-1-1-lookup-failures-on-october-4th-2023-ja-jp/
- Announcing General Availability for the Magic WAN Connector: the easiest way to jumpstart SASE transformation for your network
  - https://blog.cloudflare.com/magic-wan-connector-general-availability/
- Birthday Week recap: everything we announced - plus an AI-powered opportunity for startups
  - https://blog.cloudflare.com/birthday-week-2023-wrap-up/
- バースデーウィークの総括:当社のすべての発表、そしておよびスタートアップ企業にとっての AI 活用の機会
  - https://blog.cloudflare.com/ja-jp/birthday-week-2023-wrap-up-ja-jp/
- Cache Reserve goes GA: enhanced control to minimize egress costs
  - https://blog.cloudflare.com/cache-reserve-goes-ga/
- Cache Rules go GA: precision control over every part of your cache
  - https://blog.cloudflare.com/cache-rules-go-ga/
- Cyber attacks in the Israel-Hamas war
  - https://blog.cloudflare.com/cyber-attacks-in-the-israel-hamas-war/
- Empowering our partners with the new Tenant Platform dashboard
  - https://blog.cloudflare.com/tenant-platform-ui-ga/
- HTTP/2 Rapid Reset: deconstructing the record-breaking attack
  - https://blog.cloudflare.com/technical-breakdown-http2-rapid-reset-ddos-attack/
- **HTTP/2 Rapid Reset:記録的勢いの攻撃を無効化**
  - https://blog.cloudflare.com/ja-jp/technical-breakdown-http2-rapid-reset-ddos-attack-ja-jp/
- HTTP/2 Zero-Day vulnerability results in record-breaking DDoS attacks
  - https://blog.cloudflare.com/zero-day-rapid-reset-http2-record-breaking-ddos-attack/
- **HTTP/2 zero-day 脆弱性により史上最大の DDoS 攻撃が発生**
  - https://blog.cloudflare.com/ja-jp/zero-day-rapid-reset-http2-record-breaking-ddos-attack-ja-jp/
- How Cloudflare mitigated yet another Okta compromise
  - https://blog.cloudflare.com/how-cloudflare-mitigated-yet-another-okta-compromise/
- Hyperdrive:データベースをあたかもグローバルであるかのように感じさせる
  - https://blog.cloudflare.com/ja-jp/hyperdrive-making-regional-databases-feel-distributed-ja-jp/
- Internet traffic patterns in Israel and Palestine following the October 2023 attacks
  - https://blog.cloudflare.com/internet-traffic-patterns-in-israel-and-palestine-following-the-october-2023-attacks/
- Introducing the Project Argus Datacenter-ready Secure Control Module design specification
  - https://blog.cloudflare.com/introducing-the-project-argus-datacenter-ready-secure-control-module-design-specification/
- Malicious "RedAlert - Rocket Alerts" Application Targets Israeli Phone Calls, SMS, and User Information
  - https://blog.cloudflare.com/malicious-redalert-rocket-alerts-application-targets-israeli-phone-calls-sms-and-user-information/
- Network flow monitoring is GA, providing end-to-end traffic visibility
  - https://blog.cloudflare.com/network-flow-monitoring-generally-available/
- Q3 2023 Internet disruption summary
  - https://blog.cloudflare.com/q3-2023-internet-disruption-summary/
- Uncovering the Hidden WebP vulnerability: a tale of a CVE with much bigger implications than it originally seemed
  - https://blog.cloudflare.com/uncovering-the-hidden-webp-vulnerability-cve-2023-4863/
- Waiting Room adds multi-host and path coverage, unlocking broader protection and multilingual setups
  - https://blog.cloudflare.com/multihost-waiting-room/
- Waiting Room は、マルチホストとパスのカバレッジを拡充し、より広範な保護と多言語セットアップを実現できる製品です
  - https://blog.cloudflare.com/ja-jp/multihost-waiting-room-ja-jp/
- **ポスト量子暗号が一般利用可能に**
  - https://blog.cloudflare.com/ja-jp/post-quantum-cryptography-ga-ja-jp/

#### Fastly

- **Thriving amidst chaos: Managed security tips for Black Friday weekend | Fastly**
  - https://www.fastly.com/blog/thriving-amidst-chaos-managed-security-tips-for-black-friday-weekend
- Firefox and Fastly take another step toward a privacy upgrade for the internet | Fastly
  - https://www.fastly.com/blog/firefox-fastly-take-another-step-toward-security-upgrade

#### Other

- **Akamai 103 Early Hints Prototype: The Results Are In | Akamai**
  - https://www.akamai.com/blog/performance/2023/oct/akamai-103-early-hints-prototype-the-results-are-in
- Guidance on the Recent Critical libwebp and libvpx Vulnerabilities | Akamai
  - https://www.akamai.com/blog/security-research/2023/oct/guidance-on-critical-chrome-vulnerabilities-libwebp-and-libvpx
- An Open Partnership Ecosystem for Building Solutions at the Edge | Akamai
  - https://www.akamai.com/blog/cloud/2023/oct/an-open-partnership-ecosystem-for-building-solutions-at-the-edge
- How Akamai Protects Customers from HTTP/2 Rapid Reset DDoS Attacks | Akamai
  - https://www.akamai.com/blog/security/2023/oct/akamai-protects-customers-http2-rapid-reset-ddos-attacks
- Strengthening Vercel's Infrastructure against HTTP/2 Rapid Reset Attacks - Vercel
  - https://vercel.com/changelog/strengthening-vercels-infrastructure-against-http-2-rapid-reset-attacks

### セキュリティ動向

- **偽サイトもアドレス欄に鍵マーク、証明書を確認してフィッシング詐欺を見抜こう | 日経クロステック(xTECH)**
  - https://xtech.nikkei.com/atcl/nxt/column/18/02574/090700003/
  - > 証明書には信頼度の高い順に EV 、 OV 、 DV という 3 種類がある(図 33)。このうち詐欺で悪用されるのが DV 証明書。「Let's Encrypt」という認証局では無料で発行しており、フィッシング対策協議会によれば、一部の例外を除いて大半のフィッシングサイトでこの証明書が利用されているという。大手企業が利用するケースは考えにくい。ブラウザーの証明書ビューアーで、発行者が「Let's Encrypt」の場合は用心しよう(図 34)。
- **HTTP/2 Rapid Reset**
  - 仕組み: 新手の HTTP/2 「Rapid Reset」 DDoS 攻撃 | Google Cloud 公式ブログ
    - https://cloud.google.com/blog/ja/products/identity-security/how-it-works-the-novel-http2-rapid-reset-ddos-attack
  - **HTTP/2 Rapid Reset:記録的勢いの攻撃を無効化**
    - https://blog.cloudflare.com/ja-jp/technical-breakdown-http2-rapid-reset-ddos-attack-ja-jp/
    - これが一番わかりやすい
    - HTTP/2 のストリームは多重化できて、それぞれが状態遷移をもつ
    - RST を送ると、そのストリームを閉じることができる
    - ストリーム数の上限は Settings で交換でき、それ以上は落とせる
    - Cloudflare は TLS を解く Proxy と、バックエンドに送るための Proxy がある
    - ここで、一度にたくさんの Stream を開始するようリクエストを送る
    - それぞれをすぐに RST すると、ストリーム数上限にひっかからず無限に送れる
    - しかし、 Proxy は後ろの Origin に forward するためにバッファに貯めている
    - RST されるとリソースを解放し、 Origin に通知するが、早いとここが詰まる
    - 攻撃者は上限にひっからないように、無限にリソースを確保させられる
    - Proxy がさばききれなくなり、 Proxy 上でエラーになる
    - Origin ではエラーがおこらないので、サービス提供者はなぜ落ちたかわからない
    - 対策として、 IP の監視や短時間での RST 数のカウントなどで TLS Proxy 側で対策
    - 今ではおおよそ対策済み

### 周辺動向

- **230610 講演 第 1 部 (登) - 配布資料その 1 - 秘密の NTT 電話局、フレッツ光、インターネット入門.pdf**
  - https://dnobori.cyber.ipa.go.jp/ppt/download/20230610_soumu/230610%20%E8%AC%9B%E6%BC%94%20%E7%AC%AC1%E9%83%A8%20(%E7%99%BB)%20-%20%E9%85%8D%E5%B8%83%E8%B3%87%E6%96%99%E3%81%9D%E3%81%AE1%20-%20%E7%A7%98%E5%AF%86%E3%81%AE%20NTT%20%E9%9B%BB%E8%A9%B1%E5%B1%80%E3%80%81%E3%83%95%E3%83%AC%E3%83%83%E3%83%84%E5%85%89%E3%80%81%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%8D%E3%83%83%E3%83%88%E5%85%A5%E9%96%80.pdf
- **ImperialViolet - Chrome support for passkeys in iCloud Keychain**
  - https://www.imperialviolet.org/2023/10/18/icloudkeychain.html
- October Conference News | Igalia
  - https://www.igalia.com/2023/09/29/October-Conference-News.html
- ARIA-AT Public Data Management Page - Bocoup
  - https://bocoup.com/blog/aria-at-public-data-management-page

### イベント

- 10 月
  - 17-19: BlinkOn18
- 11 月
  - 7-10: IETF 118 Prague
  - 19: JSConf JP
    - https://jsconf.jp/2023/
  - 27-30: TC39 meeting SF (remote)
- 12 月
  - 16: 次世代 Web カンファレンス
    - https://nextwebconf.connpass.com/event/300174/

### Wrap Up

- Chrome
  - 118
    - @scope
  - 119
    - :user-valid/:user-invalid
    - CSS Relative color syntax
    - Replace dangling markup in target to `_blank`
    - Standard compliant URL
    - Remove WebSQL
    - Remove Sanitizer API V0
  - Ship
    - details name
    - Relaxed CSS Nesting
    - WebGPU f16
    - CSS scrollbar-width/scrollbar-color
    - CSS Ruby display values
    - Array.fromAsync
    - source media
    - URL.canParse
  - Prototype
    - Invokers
    - Verifying IPFS client
    - Web Printing API
  - Experiment
    - Priority header
    - IP Protection Phase 0
    - Cookie deprecation labeling
  - Deprecate and Remove
    - Theora
  - web.dev
    - インフラが変わった
    - 機械翻訳が導入された
  - Chrome Developers
    - Chromium issue tracker migration
    - 3rd-party Cookie 終了への準備
  - Chromium blog
    - TLS certificate automation
  - other
    - Passkeys enabled by default for Google users
    - HTTPS Upgrades で壊れる(艦これ、さくらで公開しているサイト)
- Firefox
  - 119
    - Array grouping
    - ARIA reflection
  - Ship
    - text-wrap: balance
    - Early Hints preconnect
    - Global Privacy Control
    - lh/rlh
    - User Activation API
    - iframe lazy loading
    - light-dark()
  - MDN Blog
    - Secure the Web Forward に OWD 参加
    - ドイツ政府系の Sovereign Tech Fund からの援助で BCD を更新していく
    - Web Sustainability
  - Standard Position
    - hr in select
    - select.showPicker()
    - Relative Color Syntax
    - Zstandard
    - Fetch streaming upload
    - Storage Buckets API
  - other
    - ECH
    - OHTTP
- Safari
  - TP 181
    - content-visibility
    - autocomplete="one-time-code"
  - Safari 17.1
    - Managed Media Source API
  - blog
    - Interop 2024
    - Responsive Design Mode
  - Standard Position
    - CSS Ruby
    - Navigation API
    - negative to Compute Pressure API
    - negative to Web Preferences API
  - other
- Edge
  - Teams が WebView2 ベースに
  - Microsoft Store が React から Lit に
  - DoH/ECH によるプライバシーの向上でセキュリティ製品の管理が難しくなっている by ericlaw
- W3C/WHATWG
  - Spec
    - WCAG 2.2 Rec
  - other
    - Web Security Lead 募集中
    - URLPattern が WHATWG に
- TC39
  - Float16Array が Stage 3 に
- IETF
  - RFC 9474 RSA Blind Signatures
  - RFC 9484 Proxying IP in HTTP
- CDN 動向
  - 1.1.1.1 障害
  - HTTP/2 Rapid Reset
- セキュリティ動向
  - Let's Encrypt はフィッシングという残念な記事
  - HTTP/2 Rapid Reset
- 周辺動向
  - 登さんのインターネット入門
  - Chrome の パスキーが iCloud Keychain に
