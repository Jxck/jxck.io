---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep136.mp3
published_at: 2023-11-30
guest: [@myakura](https://twitter.com/myakura)
---

# ep136 Monthly Platform 202311

## Theme

第 136 回のテーマは 2023 年 11 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 119

#### Updates

- **New in Chrome 119 - Chrome for Developers**
  - https://developer.chrome.com/en/blog/new-in-chrome-119/
  - Cookies expiration date.
  - CSS updates
  - WebSQL is fully removed as of Chrome 119
  - fullscreen to `window.open()`
- **Chrome 120 beta - Chrome for Developers**
  - https://developer.chrome.com/en/blog/chrome-120-beta/
  - CSS
    - CSS `<image>` syntax for registered custom properties
    - CSS `<transform-function>` and `<transform-list>` syntax for registered custom properties
    - **Media Queries: scripting feature**
    - `:dir()` pseudo-class selector
    - **CSS exponential functions**
    - CSS masking
    - **Relaxed CSS nesting**
  - HTML
    - Accordion pattern using name attribute on details
  - Web APIs
    - Allow transferring ArrayBuffer into VideoFrame, AudioData, EncodedVideoChunk, EncodedAudioChunk, ImageDecoder constructors
    - **CSS Font Loading API FontFaceSet: check() method**
    - **Close requests and CloseWatcher**
    - **Dedicated workers and Storage Access API**
    - FedCM: Error API and AutoSelectedFlag API
    - Fenced Frames functionality updates
    - **Intersection Observer Scroll Margin**
    - Permissions policy violation reports
    - Media Session API: enterpictureinpicture action
    - **WebGPU f16 support**
    - MediaCapabilities: Query HDR support with decodingInfo()
    - MediaStreamTrack Stats (Video)
    - Private Aggregation API: aggregation coordinator selection
    - **The Login Status API in FedCM**
    - View Transitions: making callback non-nullable
    - X25519Kyber768 key encapsulation for TLS
  - Origin trials in progress
    - **'priority' HTTP request header**
    - **Extending the Storage Access API (SAA) to non-cookie storage**
    - Private Network Access permission to relax mixed content
    - Unrestricted access to `performance.measureUserAgentSpecificMemory()`
    - `performance.measureUserAgentSpecificMemory()`
  - Deprecations and removals
    - **Deprecate and remove Theora support**
    - Remove data: URL in SVGUseElement
    - Remove same-origin blanket enforcement in CSPEE
- **What's new in Chrome 120 for Extensions - Chrome for Developers**
  - https://developer.chrome.com/en/blog/chrome-120-beta-whats-new-for-extensions/
  - Closing the platform gap
  - New userScripts API
  - **Higher static DNR ruleset limits**
  - New ReadingList API
  - File handling on ChromeOS
  - Trigger an alarm in 30 seconds
  - Summary
- **What's new in DevTools (Chrome 120) - Chrome for Developers**
  - https://developer.chrome.com/en/blog/new-in-devtools-120/
  - Third-party cookie phaseout
  - **Analyze your website's cookies with the Privacy Sandbox Analysis Tool**
    - https://github.com/GoogleChromeLabs/ps-analysis-tool/wiki
  - Enhanced ignore listing
    - Default exclusion pattern for node_modules
    - Exceptions now stop execution if caught or passing through non-ignored code
    - x_google_ignoreList renamed to ignoreList in source maps
  - **New input mode toggle during remote debugging**
  - The Elements panel now shows URLs for #document nodes
  - Effective Content Security Policy in the Application panel
  - Improved animation debugging
  - **'Do you trust this code?' dialog in Sources and self-XSS warning in Console**
  - Event listener breakpoints in web workers and worklets
  - The new media badge for `<audio>` and `<video>`
  - **Preloading renamed to Speculative loading**
  - Lighthouse 11.2.0
  - Accessibility improvements
  - Miscellaneous highlights

#### Intents

- Ship: Attribution Reporting API feature (further gating for trigger verbose debug reports)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jSk3xpNPzGQ
- Ship: CSS Highlight Inheritance
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/73qlvaSFmfg
- Ship: CSS spelling and grammar features
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hw3jG7fxmqY
- Ship: Clipboard API: Svg
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KYN1ToIjCsM
- **Ship: EditContext API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yOxNDSaviyU
- Ship: No-Vary-Search Hint for Prefetch Speculation Rules
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TZSsl2iCuA4
- Ship: No-Vary-Search support in navigation prefetch cache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XnG5BF3uoeE
- Ship: Interoperable Pointer and Mouse boundary events after DOM changes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JvcRfrwRlcU
- Ship: CSS font-palette property animation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FB1Mgt0hm0A
- Ship: CSS supports() condition for @import
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7eAcLPt6eLU
- Ship: Document rules, response header, eagerness
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CflQ-5__B24
- Ship: Protected Audience - Do Not Disable Cookie Setting in ReportEvent until 3PCD (Chrome - 120)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rMyTWCo-f_I
- **Ship: Remote Playback API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kJLzOeS-l4w
- **Ship: Storage Buckets API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wuJBA0CB7Ko
- Ship: View Transitions: transition types
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bq8u5SREiYE
- **Ship: checkVisibility: contentVisibilityAuto, opacityProperty, and visibilityProperty**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ruNqbP3wDSY
- Ship: Document picture-in-picture: require user gesture for resize APIs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1x4GZ_Rve1A
- Ship: WebGPU default entry points to shader modules
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/k_gcnAUinT0
- Ship: SpeechSynthesis and SpeechSynthesisVoice interface objects
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jFvTG8AJfnQ
- **Ship: Lazy load scroll margin**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cn9_443jGgI
- Ship: WebGL drawingBufferStorage
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tA7Av4fLQFY
- Ship: Multiple Readers and Writers in File System Access API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/c-9erLfX7Ec
- Implement and Ship: VideoEncoderConfig.contentHint
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0115er4HA7Q
- Implement and Ship: Async Clipboard API: Allow empty ClipboardItem during read
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FAchVmgepKM
- Prototype: @page margin boxes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZCPkcu_dSF8
- Prototype: checkVisibility: contentVisibilityAuto, opacityProperty, and visibilityProperty
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qpkOIzNakcI
- Prototype: Allow for WebAuthn credential creation in a cross-origin iframe
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4nU1dxXn-7c
- **Prototype: Deprecate 0.0.0.0 for Private Network Access**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pMyjR_e8U98
- Prototype: Deprecate and remove import assertion 'assert' syntax
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZHvzLaJZRvo
- Prototype: Honoring Android OS-Level bold text setting
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gdM0XowsVNs
- Prototype: MediaStreamTrack Stats (Audio)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vUbD_psbPL8
- **Prototype: NavigationActivation**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EfqxeH3Iwh4
- **Prototype: Opener Protections**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RiNkhQGvmkc
- **Prototype: Snapchanging**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xWvNSRaFMTs
- Prototype: Lazy load scroll margin
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CyG9T4ApdL4
- **Prototype: Deprecate and remove import assertion 'assert' syntax**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZHvzLaJZRvo
- Experiment: fetchLater API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LAKBF5VCPIU
- Experiment: Element Capture
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Q7-6SyXn2RU
- Extend experiment: Long Animation Frame Timing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MClbXXUhOTs/m/1PsNE321BgAJ
- Extend Experiment: ServiceWorker static routing API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gTy-fpBOXDM
- **Deprecate & Remove: Third-Party Cookies**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RG0oLYQ0f2I
- Deprecate: KeyboardEvent.keyIdentifier
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fqnFyoDCOaA
- Web-Facing Change PSA: CSS Highlight Inheritance
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xjhD_YpA5_s
- Web-Facing Change PSA: Discard Input Events To Recently Moved Cross-Origin Iframes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/58JoaBbCao0
- Web-Facing Change PSA: URLPattern: Inherit left, wildcard right
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/89K_jt6O0l4
- Web-Facing Change PSA: URLPattern: RegExp v flag instead of u
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yW453lPWjpc
- Web-Facing Change PSA: Improved CSS masking for SVG
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RwDQ5bTrNqo
- PSA: Web contents will honor the Android OS bold text setting
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/E3vSJcZzOEY
- PSA: you can now generate chrome traces for web_tests on CQ bots
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-cfPT-1IfAo
- Ready for Developer Testing: CSS Highlight Inheritance
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BbvI5VAguvk
- Ready for Developer Testing: Page-Embedded Permission Control
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/D-mE5qIlkWY
- **Request for Deprecation Trial: Deprecate Third-Party Cookies**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yGUdvW_t_y0

#### Other

- web.dev
  - https://web.dev/
  - **How Yahoo! JAPAN increased passkeys adoption to 11% and reduced SMS OTP costs | web.dev**
    - https://web.dev/case-studies/yahoo-japan-passkeys?hl=en
  - How the Kiwix PWA allows users to store Gigabytes of data from the Internet for offline use | web.dev
    - https://web.dev/case-studies/kiwix?hl=en
  - **Join us online from 23-27 October for Passkeys Week | web.dev**
    - https://web.dev/blog/join-us-for-passkeys-week?hl=en
  - Interop 2023 October update | web.dev
    - https://web.dev/blog/interop2023-update?hl=en
  - New to the web platform in October | web.dev
    - https://web.dev/blog/web-platform-10-2023?hl=en
  - Introducing Learn Performance | Articles | web.dev
    - https://web.dev/blog/introducing-learn-performance?hl=en
  - Compression Streams are now supported on all browsers | web.dev
    - https://web.dev/blog/compressionstreams?hl=en
- google for developers
  - https://developers.googleblog.com/
  - Passkeys week is here - Google for Developers
    - https://developers.googleblog.com/2023/10/passkeys-week.html
  - Password manager Dashlane sees 70% increase in conversion rate for signing-in with passkeys compared to passwords - Google for Developers
    - https://developers.googleblog.com/2023/10/password-manager-dashlane-sees-increase-in-conversion-rate-for-signing-in-with-passkeys.html.html
  - Simple and secure sign-in on Android with Credential Manager and passkeys - Google for Developers
    - https://developers.googleblog.com/2023/10/simple-and-secure-sign-in-on-android-with-credential-manager-passkeys.html
  - Updates to Google Identity Services (GIS) and migration to the Credential Manager API - Google for Developers
    - https://developers.googleblog.com/2023/10/pdates-to-google-identity-services-gis-credential-manager-api.html
  - Aligning the user experience across surfaces for Google Pay - Google for Developers
    - https://developers.googleblog.com/2023/11/aligning-user-experience-across-surfaces-google-pay.html
  - **Full-stack development in Project IDX - Google for Developers**
    - https://developers.googleblog.com/2023/11/full-stack-development-in-project-idx.html
  - See what's new & what's possible with Firebase at Demo Day - Google for Developers
    - https://developers.googleblog.com/2023/11/firebase-demo-day-recap.html
- google developer japan blog
  - Google Developers Japan: デベロッパー トークンなしで Google Ads API を利用する
    - https://developers-jp.googleblog.com/2023/11/token-less-experience-for-ads-api.html
  - Google Developers Japan: 動的広告ターゲット レポートの変更について
    - https://developers-jp.googleblog.com/2023/11/blog-post.html
  - Google Developers Japan: Google Ads API が Google Analytics からのコンバージョンのインポートと編集に対応
    - https://developers-jp.googleblog.com/2023/11/google-ads-api-google-analytics.html
- chrome developer blog
  - WebAssembly Garbage Collection (WasmGC) now enabled by default in Chrome - Chrome for Developers
    - https://developer.chrome.com/en/blog/wasmgc/
  - **FedCM updates: Login Status API, Error API, and Auto-selected Flag API - Chrome for Developers**
    - https://developer.chrome.com/en/blog/fedcm-chrome-120-updates/
  - A change to the default durability mode in IndexedDB - Chrome for Developers
    - https://developer.chrome.com/en/blog/indexeddb-durability-mode-now-defaults-to-relaxed/
  - **CSS nesting relaxed syntax update - Chrome for Developers**
    - https://developer.chrome.com/en/blog/css-nesting-relaxed-syntax-update/
  - Capturing the WebGPU ecosystem - Chrome for Developers
    - https://developer.chrome.com/en/blog/webgpu-ecosystem/
  - Service Worker Static Routing API Origin Trial - Chrome for Developers
    - https://developer.chrome.com/en/blog/service-worker-static-routing-api-origin-trial/
  - What's new in the Angular NgOptimizedImage directive - Chrome for Developers
    - https://developer.chrome.com/en/blog/angular_ngoptimizedimage/
  - Automatic picture-in-picture for web apps - Chrome for Developers
    - https://developer.chrome.com/en/blog/automatic-picture-in-picture/
  - **Improving content filtering in Manifest V3 - Chrome for Developers**
    - https://developer.chrome.com/en/blog/improvements-to-content-filtering-in-manifest-v3/
  - **Resuming the transition to Manifest V3 - Chrome for Developers**
    - https://developer.chrome.com/en/blog/resuming-the-transition-to-mv3/
  - **Request additional migration time with the third-party cookie deprecation trial - Chrome for Developers**
    - https://developer.chrome.com/en/blog/third-party-cookie-deprecation-trial/
- chromium blog
  - https://blog.chromium.org/
  - **Chromium Blog: How Core Web Vitals saved users 10,000 years of waiting for web pages to load**
    - https://blog.chromium.org/2023/11/how-core-web-vitals-saved-users-10000.html
  - Chromium Blog: A new way to seamlessly browse across devices with Chrome on iOS
    - https://blog.chromium.org/2023/11/a-new-way-to-seamlessly-browse-across.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
  - Google Online Security Blog: More ways for users to identify independently security tested apps on Google Play
    - https://security.googleblog.com/2023/11/more-ways-for-users-to-identify.html
  - Google Online Security Blog: Qualified certificates with qualified risks
    - https://security.googleblog.com/2023/11/qualified-certificates-with-qualified.html
  - Q3 2023 Summary from Chrome Security
    - https://groups.google.com/a/chromium.org/g/security-dev/c/A6Ckk-tFr1E
  - Google Online Security Blog: Two years later: a baseline that drives up security for the industry
    - https://security.googleblog.com/2023/11/two-years-later-baseline-that-drives-up.html
- v8
  - https://v8.dev/
  - A new way to bring garbage collected programming languages efficiently to WebAssembly · V8
    - https://v8.dev/blog/wasm-gc-porting
- search blog
  - モバイルファースト インデックスが実現 - ご協力に感謝します | Google 検索セントラル ブログ | Google for Developers
    - https://developers.google.com/search/blog/2023/10/mobile-first-is-here?hl=ja
  - A Q&A on Google Search updates | Google Search Central Blog | Google for Developers
    - https://developers.google.com/search/blog/2023/11/q-and-a-on-search-updates
  - 検索品質評価者向けガイドラインの更新 | Google 検索セントラル ブログ | Google for Developers
    - https://developers.google.com/search/blog/2023/11/search-quality-rater-guidelines-update?hl=ja
  - Upcoming deprecation of Crawl Rate Limiter Tool in Search Console | Google Search Central Blog | Google for Developers
    - https://developers.google.com/search/blog/2023/11/sc-crawl-limiter-byebye

### Firefox 動向

#### Stable: 120

#### Updates

- **Firefox 120.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/120.0/releasenotes/
  - Copy Link Without Site Tracking
  - GPC
  - プライベートウインドウで Cookie バナーの自動削除(ドイツのみ)
- **Firefox 120 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/120
  - `<source media>`
  - light-dark()
  - lh/rlh
  - Date.parse() interop
  - Early Hints preconnect
  - User Activation API
- **I Can :has Browser Improvements - These Weeks in Firefox: Issue 148 - Firefox Nightly News**
  - https://blog.nightly.mozilla.org/2023/11/02/i-can-has-browser-improvements-these-weeks-in-firefox-issue-148/
  - `:has()` 有効に
- Getting Better Every Day - These Weeks in Firefox: Issue 149 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2023/11/16/getting-better-every-day-these-weeks-in-firefox-issue-149/
- **Global Privacy Control Empowers Individuals to Limit Privacy-Invasive Tracking - Open Policy & Advocacy**
  - https://blog.mozilla.org/netpolicy/2023/11/21/global-privacy-control-empowers-individuals-to-limit-privacy-invasive-tracking/
  - `Sec-GPC: 1` が送れるように

#### Intents

- **Ship: :has Selector**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/oacuvZ2_hLg
- **Ship: Javascript Promise.withResolvers**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/adYRSmHDfVY
- **Ship: LargestContentfulPaint API**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/BbesXyfu9cs
- **Prototype and Ship: showPicker method for HTMLSelectElement**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/S9cdPUJSyL8
- **Prototype: Invokers**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/iNeYYiRjMaQ
- **Unship: data URL support in SVG use elements**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/jOd-oh6NEhs
- Change:
- Remove:
- Announcement: Decommissioning TMO Measurement Dashboard
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ineTY1uMJgs
- Searchfox Update: Searchfox rust indexing is now position:stickier and search contextier!
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/B5DH1v7ztJY
- PSA: Care needed when looking at use counter data from before Firefox 118
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/NgCjRyn5n3c
- **Firefox Development Is Moving From Mercurial To Git**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/5MrpDdHIr-Y
  - Mercurial と Git を SCM として使っていたが、 Git に一本化
  - GitHub でホストするが、バグトラッカーやレビューツールは既存のものを使う
  - 移行時期は検討中

#### Newsletter

- Firefox WebDriver Newsletter - 120 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-120/
- Firefox DevTools Newsletter - 120 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-120/
- L10n Report: November 2023 Edition | Mozilla L10N
  - https://blog.mozilla.org/l10n/2023/11/03/l10n-report-november-2023-edition/
- What's up with SUMO - Q3 2023 - The Mozilla Support Blog
  - https://blog.mozilla.org/sumo/2023/11/02/whats-up-with-sumo-q3-2023/
- **SpiderMonkey Newsletter (Firefox 118-121)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/PNMmXnB6ba4
  - パフォーマンス向上
  - Wasm GC をサポート
  - Unicode Strings をサポート
  - Array grouping をサポート

#### MDN / Open Web Docs

- Getting started with CSS container queries | MDN Blog
  - https://developer.mozilla.org/en-US/blog/getting-started-with-css-container-queries/

#### Standard Position

- 今月 Close された Issue と PR ものをみる
  - https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2023-11-01+
  - Positive
    - View Transitions: list of types · Issue #905 · mozilla/standards-positions
      - https://github.com/mozilla/standards-positions/issues/905
    - CustomStateSet for custom elements · Issue #688 · mozilla/standards-positions
      - https://github.com/mozilla/standards-positions/issues/688
  - Negative
    - Element Capture · Issue #857 · mozilla/standards-positions
      - https://github.com/mozilla/standards-positions/issues/857

#### Other

- **Down and to the Right: Firefox Got Faster for Real Users in 2023 - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2023/10/down-and-to-the-right-firefox-got-faster-for-real-users-in-2023/
- Why we're renaming 'Firefox accounts' to 'Mozilla accounts'
  - https://blog.mozilla.org/en/mozilla/firefox-accounts-transition-mozilla-accounts/
- Introducing Mozilla's Firefox Nightly .deb Package for Debian-based Linux Distributions - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2023/10/30/introducing-mozillas-firefox-nightly-deb-packages-for-debian-based-linux-distributions/
- **SpiderMonkey Byte-Sized Architectures | SpiderMonkey JavaScript/WebAssembly Engine**
  - https://spidermonkey.dev/blog/2023/11/16/spidermonkey-byte-sized-architectures.html
  - JSConfJP でのトークの話
- **Quick as a Fox: Firefox keeps getting faster**
  - https://blog.mozilla.org/en/products/quick-as-a-fox-firefox-keeps-getting-faster/
  - 2023 年 1 月以降、 Firefox の Speedometer のスコアは 50% 向上

### Safari 動向

#### Stable: 17.1

#### Updates

- **Release Notes for Safari Technology Preview 182**
  - https://webkit.org/blog/14764/release-notes-for-safari-technology-preview-182/
  - CSS
    - **Added the white-space-collapse and text-wrap-mode CSS properties. (269613@main) (117248327)**
  - Forms
    - Added support for the showPicker() method for input type="date". (269257@main) (110099910)
  - HTML
    - Added support for the list of available images for lazy loaded images. (269243@main) (98788086)
  - JavaScript
    - Added TimeZoneOffset format support to Intl.DateTimeFormat. (269497@main) (117124296)
  - Loading
  - Media
    - Added support for H264 L1T2 for WebCodecs. (269297@main) (114940765)
  - Rendering
  - Scrolling
  - Storage
    - Added support for blob partitioning. (269264@main) (116813727)
  - SVG
  - Text
  - Web API
  - Web Assembly
    - Added support for new constant expressions. (269484@main) (107680283)
  - Web Inspector
    - Added support for logging a message to the Console when a page attempts to load a font URL blocked by Lockdown Mode. (269238@main) (114657783)
  - WebRTC
- **Release Notes for Safari Technology Preview 183**
  - https://webkit.org/blog/14769/release-notes-for-safari-technology-preview-183/
  - **Added basic support for text-wrap: balance and text-wrap-style property. (269680@main) (117336969)**
  - Added support for the allow-downloads directive for frames. (109414664)
  - **Added support for ArrayBuffer.prototype.transfer. (269674@main) (117337535)**
  - Aligned the implementation of the internal function IntlMathematicalValue (used in Number.prototype.toLocaleString, and Intl.NumberFormat) with its current specification. (269825@main) (117535507)

#### Standard Positions

- 今月 Close されたものをみる
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2023-06-01+
- Position Support
  - VideoEncoderConfig.contentHint
    - https://github.com/WebKit/standards-positions/issues/274
  - **Cross-Origin Embedder Policies - "credentialless"**
    - https://github.com/WebKit/standards-positions/issues/268
  - HTMLSelectElement `showPicker()`
    - https://github.com/WebKit/standards-positions/issues/258
  - **Auto-expanding details elements**
    - https://github.com/WebKit/standards-positions/issues/247
  - **hidden=until-found attribute and beforematch event**
    - https://github.com/WebKit/standards-positions/issues/246
  - Request for position: WebDriver BiDi
    - https://github.com/WebKit/standards-positions/issues/240
  - CSS Ruby Annotation Layout Module Level 1
    - https://github.com/WebKit/standards-positions/issues/232
  - Resource Timing: Add interim response timings
    - https://github.com/WebKit/standards-positions/issues/109
  - **CSS module scripts**
    - https://github.com/WebKit/standards-positions/issues/77
  - **URLPattern API**
    - https://github.com/WebKit/standards-positions/issues/61
  - **CustomStateSet for custom elements**
    - https://github.com/WebKit/standards-positions/issues/56
  - **Wildcards in Permissions Policy Origins**
    - https://github.com/WebKit/standards-positions/issues/51
  - **Navigation API**
    - https://github.com/WebKit/standards-positions/issues/34
- Position Nutral
  - border-boundary CSS property
    - https://github.com/WebKit/standards-positions/issues/201
- Position Oppose
  - Vibration API (Second Edition)
    - https://github.com/WebKit/standards-positions/issues/267
  - Compute Pressure API
    - https://github.com/WebKit/standards-positions/issues/255
  - Web Preferences API
    - https://github.com/WebKit/standards-positions/issues/252
- Position Withdrawn
  - Web Environment Integrity API
    - https://github.com/WebKit/standards-positions/issues/234

#### Other

### Edge 動向

#### Stable: 119

#### Updates

- Microsoft Edge WebView2 now available for Xbox apps
  - https://blogs.windows.com/msedgedev/2023/11/01/webview2-for-xbox-announcement/

#### Other

- Troubleshooting Edge (or Chrome) Browser Crashes - text/plain
  - https://textslashplain.com/2023/11/09/troubleshooting-edge-or-chrome-browser-crashes/
- Troubleshooting Edge (or Chrome) Broken UI - text/plain
  - https://textslashplain.com/2023/11/14/troubleshooting-edge-or-chrome-broken-ui/
- Attack Techniques: Steganography - text/plain
  - https://textslashplain.com/2023/11/22/attack-techniques-steganography/
- Escaping the sandbox: A bug that speaks for itself | Microsoft Browser Vulnerability Research
  - https://microsoftedge.github.io/edgevr/posts/Escaping-the-sandbox-A-bug-that-speaks-for-itself/
- Latest innovations for Microsoft Edge for Business - your secure enterprise browser optimized for AI
  - https://blogs.windows.com/msedgedev/2023/11/15/ignite-2023-latest-innovations-microsoft-edge/
- Microsoft Defender の報奨金プログラムの紹介 | MSRC Blog | Microsoft Security Response Center
  - https://msrc.microsoft.com/blog/2023/11/introducing-the-microsoft-defender-bounty-program-ja/

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
- Chartering
  - Proposed W3C Charter: Web and Networks Interest Group (until 2023-12-05/06); Current Charter Extended
    - https://lists.w3.org/Archives/Public/public-new-work/2023Nov/0002.html
  - Call for Participation: Media and Entertainment Interest Group Charter Approved
    - https://lists.w3.org/Archives/Public/public-new-work/2023Nov/0000.html
  - Call for Participation: Accessibility Guidelines Working Group Charter Approved
    - https://lists.w3.org/Archives/Public/public-new-work/2023Nov/0001.html
  - Privacy Interest Group Charter Extended until 29 February 2024
    - https://lists.w3.org/Archives/Public/public-new-work/2023Nov/0003.html
  - Proposed W3C Charter: Devices and Sensors Working Group
    - https://lists.w3.org/Archives/Public/public-new-work/2023Nov/0004.html
  - Call for Participation: Pointer Events Working Group Charter Approved; Join the Pointer Events WG
    - https://lists.w3.org/Archives/Public/public-new-work/2023Nov/0005.html
  - Call for Participation: Web Performance Working Group Charter Approved; Join the Web Performance WG
    - https://lists.w3.org/Archives/Public/public-new-work/2023Nov/0007.html
  - Advance notice: Work in progress on Browser Testing and Tools Working Group Charter; Current Charter Extended
    - https://lists.w3.org/Archives/Public/public-new-work/2023Nov/0008.html
  - Proposed W3C Charter: Web Applications Working Group
    - https://lists.w3.org/Archives/Public/public-new-work/2023Nov/0009.html
  - Spatial Data on the Web Working Group Charter extended until 4 April 2024
    - https://lists.w3.org/Archives/Public/public-new-work/2023Nov/0011.html

#### Other

- **Define the privacy-policy link type · whatwg/html@1fc1a14**
  - https://github.com/whatwg/html/commit/1fc1a143e5dfe227a79f4fc3e5dcb0769b7d78c5
  - link 要素の rel 属性の値として `privacy-policy` と `terms-of-service` が追加された
  - Mike West が提案したが、すでに RFC 6903 で同じアイデアが仕様になっていたのでそれを取り込んだ
    - https://datatracker.ietf.org/doc/html/rfc6903
  - .well-known URL で参照可能にもしないかという話も別途進行中
    - Policy Discovery
    - https://mikewest.github.io/privacy-policy-discovery/
- **Thoughts on TAG Design Reviews**
  - https://lowentropy.net/posts/tag2023/
  - Martin Thomson が TAG に立候補
  - TAG レビューが増えている(Chromium の割合が多い)
  - W3C Council の仕事も増えるので仕事量を減らせないか
- **W3C opens Technical Architecture Group (TAG) election | 2023 | News | W3C**
  - https://www.w3.org/news/2023/w3c-opens-technical-architecture-group-tag-election/
- W3C Invites Implementations of RDF Dataset Canonicalization | 2023 | News | W3C
  - https://www.w3.org/news/2023/w3c-invites-implementations-of-rdf-dataset-canonicalization/
- W3C Invites Implementations of VC Data Integrity, Data Integrity EdDSA and ECDSA Cryptosuites, and VC JSON Schema | 2023 | News | W3C
  - https://www.w3.org/news/2023/w3c-invites-implementations-of-vc-data-integrity-data-integrity-eddsa-and-ecdsa-cryptosuites-and-vc-json-schema/

### TC39 動向

#### Meeting

- 2023-09
  - https://github.com/tc39/agendas/blob/main/2023/09.md
  - https://github.com/tc39/notes/tree/main/meetings/2023-09
  - https://docs.google.com/document/d/1qXUf4QRTbexUj0fg2sgYTxWwOT2v_q7lmjR282BOWLU/edit
  - **Withdrawing Symbol.thenable**
    - ずっと Stage 0 だったが、やめることに
    - この仕様ではうまくいかないらしい
    - Promise.result という提案もあったがそっちもなくなった
    - https://scrapbox.io/petamoriken/2019-03_%E3%81%AE_TC39_meeting#5ca2705671283f00008040ac
  - **ShadowRealm: Implementer Feedback and Demotion to Stage 2**
    - https://github.com/tc39/proposal-shadowrealm/issues/331
    - https://docs.google.com/presentation/d/1WJd9g3df_ibVHK3LdoKX2FboDwYQBUBJNxuRAWOYYbM/edit#slide=id.g27ba44aabab_0_57
    - Stage 3 にはなっているが、 HTML 側をどうするか決まってない
    - Worker だけならできるが、 Document を触るには、仕様もテストも足りてない
    - Stage 3 のままにしておくのはおかしいので
      - 1. HTML を諦めて Stage 3 keep
      - 2. Stage 2 に下げて HTML 側の作業をする
      - 3. 完全に諦める
    - 結論は 2
    - JSC も V8 も、 2 が終わった状態の ShadowRealms について Agree してる
    - 二つの明示的サポート、触れる API のリスト、十分なテスト、が揃うとまた Stage 3
  - **Structs and shared structs update**
    - https://github.com/tc39/proposal-structs
    - https://docs.google.com/presentation/d/1iCuezMHZhTN560v9OuoLFIhKfjw5opV8LVilrZzOojw/edit#slide=id.p
    - 構造体の Struct と、共有できる Shared Struct の提案
    - TypeScript has started playing with devtrial
    - Babylon.js
    - Google Workspace
    - あたりで検証してく
    - Stage 1 のまましばらく検証する
  - **Type Annotations: Stage 1 update and discussion**
    - https://github.com/tc39/proposal-type-annotations
    - https://docs.google.com/presentation/d/1rwrWQkYityiK1pf5UpkgRYMKL8euqtDrrrbngMKJusY/edit#slide=id.p
    - アノテーションをコメントとして解釈して無視
    - 今後はシンタックスの簡略化を中心的に行う
    - Stage 1 キープ
  - **Decimal: Stage 1 update and discussion**
    - https://docs.google.com/presentation/d/1xOvWslwKi6evMWMYk1PQv9H0IEIhsifHbEBh2BOqHa0/edit#slide=id.p
    - オペレーターオーバーロードが、実装者の強い反対(難しいし遅くなる)でなくなった
    - すると、プリミティブにする強い意味がなくなったので、プリミティブもやめた
    - なので、リテラル `123m` もやめて、オブジェクトになった。
    - 演算は全部メソッドになる
    - IEEE 754 の Decimal 128 に準拠するのがゴールなのかをはっきりさせよう
    - sine や cosine を必要とするかどうか
    - Stage 1 のまま
  - **Uint8Array-Base64**
    - https://github.com/tc39/proposal-arraybuffer-base64/issues/13
    - Streaming は必要で、それがない限り Stage 3 はブロック
    - もう少し議論が必要
    - (最悪 WHATWG いくかも)
  - **Negated in and instanceof operators for Stage 1**
    - https://docs.google.com/presentation/d/1vwNOjUiUvy6TzK6t0Mb8qgyKwBNszly9HibJJpUa_Eo/edit#slide=id.g248bd1c8bf5_0_0
    - `!in` と `!instanceof` が欲しい
    - typescript の non-null assertion とかぶる
    - 他も懐疑的な姿勢
    - Stage 1
  - **Withdrawing finalization registry cleanupSome**
    - https://docs.google.com/presentation/d/18V56wPFL3TZ2hgvK3b9zQsvLaw4aGdy_asxJ_6at_hs/edit#slide=id.p
    - 明示的に GC が走る cleanupSome がいらないので消そうという話
    - WASM の JS API で入ったので、これはいらないというはなし
    - 消されることに
  - **reducing wasted effort due to proposal churn (continued)**
    - https://docs.google.com/presentation/d/1HtcFY98qWy-LPJLawRIkYzhDEjuEeyArMiNXbCOFcrk/view#slide=id.p
    - Stage 2 と 3 の間が欲しい話
    - 増やすことに決定。番号にするが名前は未定。既存の番号はそのまま。

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2023-09-01}...main@{2023-11-01}
- https://tc39.github.io/beta/
- 0->1
  - Iterator Sequencing
  - Joint Iteration
  - Stable Formatting
  - Nested in and instanceof operators
  - Locale Extensions
- 1->2
  - RegExp.escape
  - Uint8Array to/from base64
- 2->3
- 3->4
  - Resizable ArrayBuffer
- Withdrawn
  - Promise.thenable
  - cleanupSome

#### New Proposals

- Iterator Sequencing
  - https://github.com/tc39/proposal-iterator-sequencing
- Joint Iteration
  - https://github.com/tc39/proposal-joint-iteration
- Stable Formatting
  - https://github.com/tc39/proposal-stable-formatting
- Nested in and instanceof operators
  - https://github.com/tc39/proposal-negated-in-instanceof
- Locale Extensions
  - https://github.com/ben-allen/locale-extensions

#### Other

### WinterCG 動向

- Meeting や大きな動きがあった月だけやる

#### Meeting

- 2023-11-02 Meeting
  - https://github.com/wintercg/admin/issues/57
  - 特になし

### IETF 動向

#### WG

- IETF 118
  - https://datatracker.ietf.org/meeting/
  - https://docs.google.com/document/d/1_kgZ7QPUBNH97KSaNROio7011gS_LhJps7WJsMUY5JU/edit
  - tls
    - TLS Encrypted Client Hello (ECH) - Chris Wood - 15 min
      - もうすぐ WGLC
    - KEM-based Authentication for TLS 1.3/KEM-based pre-shared-key handshakes for TLS 1.3 - Thom Wiggers
      - 本題とはずれるが Post Quantum を TLS から始めるのか PKI から始めるのかというう議論があった
    - TLS 1.2 is (still) frozen - Rich Salz - 10 min
      - TLS 1.2 はこれ以上更新されないので Post-Quantum 対応しない
    - TLS Key Share Prediction - David Benjamin - 15 min
      - PQ 移行考えると、 Client は Server のサポートする暗号化方式を先に知りたい
      - supported_group / key_share の候補を、 DNS で先んじて交換しておいて、 Handshake で確実に交換できるようにしたい。
    - TLS Trust Expressions - Devon O'Brien, David Benjamin, Bob Beck - 30 min
      - 証明書を単一ではなく複数送るモデルにしたい場合がある
        - キーロテーション
        - CA のバックアップ
        - PQ 対応
          - PQ だと証明書はでかくなるらしい
  - quic
    - Multipath QUIC
      - issue 閉じてもうすこし interop したら 119 では Last Call できそう?
    - Reliable Stream Resets
      - webtrans 側も +1 なので次 WGLC になりそう
    - QUIC Address Discovery
      - STUN 機能を QUIC に持たせたい?
    - NAT Traversal
      - QUIC で WebRTC とか P2P できるように、 ICE 相当の双方の Traversal をできるようにしたい。
  - httpwg
    - Compression Dictionary Transport - Patrick Meenan (remote)
      - やってますよ
    - Cookies - Steven Bingler (remote)
      - SameSite Cookie の Redirect がブロッカー
      - Chrome/Firefox ではオンにすると壊れた
      - 解決できなければ先に進むために仕様から消す
    - QUERY Method
      - Julian が忙しくてすすでない
      - 協力者募集
    - Retrofit Structured Fields - Mark Nottingham
      - もうすぐ Last Call
    - **The qpack_static_table_version TLS extension - Rory Hewitt (remote)**
      - QUIC の Static Table は 5 年前に仕様に直書きされたもの
      - これを更新する手段がない
      - TLS でこれをできるようにしよう
    - **Reverse HTTP Transport - Ben Schwartz (remote)**
      - サーバからクライアント側につなぎにいく提案
      - 主に Proxy (CDN, FW etc)が Origin にいくためには外からの穴を開ける必要
      - これを中から繋ぐようにすれば穴がいらなくなる
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
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

- **Technical Standards Bodies are Regulators**
  - https://www.mnot.net/blog/2023/11/01/regulators
- **How to Run an Australian Web Site in 2024**
  - https://www.mnot.net/blog/2023/11/27/esafety-industry-standards
- **Introducing httpbisGPT**
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2023OctDec/0163.html
  - httpbisGPT を作ったよという人

### CDN 動向

#### Cloudflare

- Cloudflare incident on October 30, 2023
  - https://blog.cloudflare.com/cloudflare-incident-on-october-30-2023/
- Do hackers eat turkey? And other Thanksgiving Internet trends
  - https://blog.cloudflare.com/do-hackers-eat-turkey-and-other-thanksgiving-internet-trends/
- 2024, the year of elections
  - https://blog.cloudflare.com/2024-the-year-of-elections/

#### Fastly

- Fastly 、基幹イベント「Yamagoya 2023」を開催 | Fastly
  - https://www.fastly.com/jp/press/press-releases/yamagoya-2023

#### Other

- Improve User Experience with Parallel Execution of HTTP/2 Multiplexed Requests | Akamai
  - https://www.akamai.com/blog/performance/2023/nov/improve-ux-with-http2-multiplexed-requests
- InfectedSlurs Botnet Spreads Mirai via Zero-Days | Akamai
  - https://www.akamai.com/blog/security-research/2023/nov/new-rce-botnet-spreads-mirai-via-zero-days

### セキュリティ動向

- LINE ヤフー 個人情報 40 万件流出か - Yahoo!ニュース
  - https://news.yahoo.co.jp/pickup/6483067

### 周辺動向

- WebKit Contributors Meeting 2023 | Igalia
  - https://www.igalia.com/2023/10/30/WebKit-Contributors-Meeting-2023.html
- November Conference News | Igalia
  - https://www.igalia.com/2023/10/31/November-Conference-News.html
- **Lost in Translation: Tips for Multilingual Web Accessibility | Ben Myers**
  - https://benmyers.dev/blog/multilingual-web-accessibility/
- How Meta built Threads in 5 months - Engineering at Meta
  - https://engineering.fb.com/2023/11/06/android/how-meta-built-threads-in-5-months/
- **Hixie's Natural Log: Reflecting on 18 years at Google**
  - https://ln.hixie.ch/?start=1700627373&count=1
  - Hixie が Google を去った
  - Google の昔の良いカルチャーが変わっていった様を語る
  - カルチャーの変化、レイオフの影響、リーダーシップへの批判
- **State of JavaScript 2023**
  - https://survey.devographics.com/ja-JP/survey/state-of-js/2023

### イベント

- 11 月
  - 7-10: IETF 118 Prague
  - 19: JSConf JP
    - https://jsconf.jp/2023/
  - 27-30: TC39 meeting SF (remote)
- 12 月
  - 16: 次世代 Web カンファレンス
    - https://nextwebconf.connpass.com/event/300174/
- 1 月
- 2 月
- 3 月
  - 8: 空けといて

### Wrap Up

- Chrome
  - 119
    - Cookies expiration date
  - 120 beta
    - scripting media feature
    - CSS exponential functions
    - relaxed CSS nesting
    - close watcher
    - WebGPU f16
    - FedCM Login status
  - Ship
    - Editcontext
    - Remote Playback
    - Storage Buckets API
    - Lazy load scroll margin
  - Deprecate and Remove
    - Deprecate 0.0.0.0 for Private Network Access
    - import assertions
    - third-party cookies
  - web.dev
    - Yahoo! JAPAN on passkeys
  - Chrome Developers
    - Manifest V3
    - third-party cookie deprecation trials
- Firefox
  - 120
    - copy link without site tracking
    - GPC
    - light-dark()
    - lh/rlh
  - Ship
    - :has()
    - Promise.withResolvers()
    - LCP
  - Prototype
    - Invokers
  - other
    - moving to Git
    - Firefox getting faster
- Safari
  - TP 182
  - TP 183
    - text-wrap: balance
    - ArrayBuffer.transfer
  - Standard Position
    - positive on
      - COEP credentialless
      - hidden=until-found
      - URLPattern
      - Wildcard in Permission Policy Origins
      - Navigation API
- W3C/WHATWG
  - other
    - TAG election
    - Martin on TAG reviews
    - link rel="privacy-policy"
- TC39
  - ShadowRealm がんばる
  - Type Annotations
  - Decimal ナーフ
  - !in/!instanceof
  - Stage 2 と 3 の間
- IETF
  - IETF118 プラハ
  - tls
    - Post-Quantum の話が多い
    - ECH もうすぐ WGLC
    - PQ のために DNS でサーバの supported_group/key_share を知りたい
    - Multi Certificate
  - quic
    - Multipath QUIC
    - Reliable Stream Resets
    - QUIC Address Discovery
    - NAT Traversal
  - httpwg
    - QUIC Static Table Version TLS extention
    - Reveres HTTP Transport
  - mnot 先生怒りのブログ 2 作
  - httpbisGPT
- CDN 動向
  - Fastly Yamagoya 2023
- セキュリティ動向
  - LINE ヤフー個人情報漏洩
- 周辺動向
  - Hixie Google 退職
  - State of JS 2023 開始
