---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep107.mp3
published_at: 2022-10-30
guest: [@myakura](https://twitter.com/myakura)
---

# ep107 Monthly Platform 202210

## Theme

第 107 回のテーマは 2022 年 10 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 107

#### Updates

- **New in Chrome 107 - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-chrome-107/
  - New properties in Screen Capture API
  - Identify render blocking resources
  - PendingBeacon API origin trial
- **Chrome 108 beta**
  - https://developer.chrome.com/en/blog/chrome-108-beta/
  - CSS
    - CSS Overflow for replaced elements
    - **Small, Large, Dynamic, and Logical viewport units**
    - CSS break-after, break-before and break-inside support
    - Last baseline item alignment
  - ContentVisibilityAutoStateChanged event
  - **Federated Credentials Management (was WebID)**
  - Media Source Extensions in workers
  - **`Sec-CH-Prefers-Reduced-Motion` User Preference Media Features Client Hints Header**
  - WebTransport BYOB readers
  - **Wildcards in Permissions Policy Origins**
  - **Variable COLRv1 fonts and font feature detection**
    - COLRv1 variable font support
    - `font-tech()` and `font-format()` condition extensions to CSS `@supports`
    - `tech()` function support in `@font-face` src: descriptor
  - Android OSK now resizes the visual viewport by default
  - **Sync methods for AccessHandles in File System Access API**
  - **WebAuthn conditional UI**
  - Origin trials
    - Merchant identity in canmakepayment event
  - **Back/forward cache NotRestoredReason API**
  - Deprecations and removals
    - Deprecate and remove window.defaultStatus and window.defaultstatus
    - ImageDecoderInit.premultiplyAlpha
    - `navigateEvent.restoreScroll()`
    - `navigateEvent.transitionWhile()`
    - WebRTC mediaConstraint's googIPv6
- **What's New In DevTools (Chrome 108) - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-devtools-108/
  - **Hints for inactive CSS properties**
  - **Auto-detect XPath and text selectors in the Recorder panel**
  - Step through comma-separated expressions
  - Improved Ignore list setting
  - Miscellaneous highlights

#### Intents

- Ship: Align Timers (including DOM timers) at 125 Hz
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Di3uO1eMVJ4/m/I3uwiz28AwAJ
- Ship: Auto range support for font descriptors inside @font-face rule
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WU3lxkZFCX4/m/ufEgSmX3AgAJ
- Ship: CSS 'lh' Length Unit
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/E3Q7qOCk7A4/m/kMtu9VlqAQAJ
- Ship: CSS Color Module Level 4 + color-mix()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/r0QATT8-kOw/m/7WdN2Y_sAwAJ
- **Ship: CSS `hyphenate-limit-chars` property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TjuGJ-8TeXk/m/X8gUvSejAwAJ
- Ship: Conditional Focus
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kU5QFsVesyM/m/CLugArV-AQAJ
- **Ship: Cookies Having Independent Partitioned State (CHIPS)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JNOQvsTxecI/m/SOKMCKt_AwAJ
- **Ship: FedCM (was WebID)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/URpYPPH-YQ4/m/E9pgS7GEBAAJ
- Ship: Increased max nesting level for setTimeout(0)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ncLo1AMia5I/m/BNdp42V9AQAJ
- **Ship: Last Baseline Item Alignment**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Y5TN57Sc-lA/m/AXUkdlC0BQAJ
- **Ship: Origin Isolation By Default / Deprecate document.domain on stable**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nrLl0IxSxSI/m/Sm4IH4yNAwAJ
- **Ship: Same-site cross-origin prerendering triggered by the speculation rules API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/egYFQm_FsUY/m/b7c4yraPAQAJ
- Ship: Send Mouse Events to Disabled Form Controls
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9i0H0J0BzE4/m/Ws0deJAhAgAJ
- Ship: Web app launch handler
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hzR6LNu4JFk/m/IYdj3MnaAgAJ
- Ship : HTTP response status code in Resource Timing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kZfaF3F2mbs
- **Ship: Anonymous iframes**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/twjmdCcfHYM/m/JXwfSC_uAwAJ
- Prototype and Ship: WebTransport BYOB readers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/18ZdUE1B_zg
- **Prototype: CSS Initial Letters**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OhYqSeOprBo/m/TRHxFjFLAQAJ
- **Prototype: CSS Nesting**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-GxQ0MIcons
- Prototype: CSS `hyphenate-limit-chars` property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CwUy1UoqyVQ/m/BDKjmMjOAQAJ
- Prototype: Content-type in Resource Timing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Dk2uL_gXpZc
- **Prototype: Document Rules**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/N0psmOztjM0
  - Speculation Rules での Prefetch を URL のリストではなく、ページ内リンクのパターンで指定できる
- **Prototype: No-Vary-Search support in navigation prefetch cache**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pMOT74G9yag/m/JcUEnZ8zBwAJ
- **Prototype: URLPatternList**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QrPrveVyFnA/m/PkaPKfJ4AwAJ
- **Prototype: Speculation-Rules header**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/C3bHhfzf7bY/m/fThW8NnoAwAJ
- **Prototype: scheduler.yield()**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HLGgOhq_yJw/m/bTHea3fzAwAJ
- Prototype: WebUSB & Extension Service Worker Integration
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VnRE2lMkS0g/m/rK9l1rp4BAAJ
- Ready for Trial: BFCache NotRestoredReasons API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7jBZLdt7EsY/m/KiTrSzbSBgAJ
- Ready for Trial: Declarative PendingBeacon API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CE3ngAKFil4/m/P_uD3G1GAQAJ
- Ready for Trial: Partitioning Storage, Service Workers, and Communication APIs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2U4l5NHRTqY/m/N0CBxHFUBQAJ
- Experiment: Back/forward cache NotRestoredReason API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ce4hr99dUDc/m/C4wYpnKiAwAJ
- Experiment: Network State Partitioning (once more, with feeling)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-5lo8I9QT0c/m/L-9XRrLSBAAJ
- Experiment: Private Aggregation API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/576sXtXNeCA/m/mGBpw14WBQAJ
- Experiment: Reduce Accept-Language Origin Trial
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yAOfFp7elrw/m/7WtYP8iXAwAJ
- Experiment: Private Network Access preflight requests for subresources
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/k8osI88QbKs
- **Extend Experiment (again): User-Agent Reduction**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Eji3oX5A4-Q/m/niegCW62AgAJ
- Extend Experiment: Privacy Sandbox Ads APIs through M110
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xm9EvnaVBj8/m/zcx9KO9sBAAJ
- Deprecate and Remove: Private Network Access requests for subresources without proper preflight response
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FlenxUPCDec/m/T2YBn0kEBQAJ
- **Remove: `-webkit-perspective-origin-[x,y]`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wj5WvDcOHho/m/_c-iVBx7AwAJ
- Call for BlinkOn 17 lightning talks!!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uib1bm2S1_E/m/_O7OQ3yfBAAJ
- PSA: Support for network quality client-hints in CORS
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ySqQe_Wyf50/m/qR2viSDnAwAJ

#### V8

#### Other

- web.dev
  - New patterns for amazing apps
    - https://web.dev/new-patterns-for-amazing-apps/
  - Optimize long tasks
    - https://web.dev/optimize-long-tasks/
  - New to the web platform in September
    - https://web.dev/web-platform-09-2022/
  - Introducing Learn Accessibility
    - https://web.dev/introducing-learn-accessibility/
  - **Building a floating action button (FAB) component**
    - https://web.dev/building-a-fab-component/
  - **Sign in with a passkey through form autofill**
    - https://web.dev/passkey-form-autofill/
  - Create a passkey for passwordless logins
    - https://web.dev/passkey-registration/
  - Building a Better Web - Part 1: A faster YouTube on web
    - https://web.dev/better-youtube-web-part1/
  - CSS Animated Grid Layouts
    - https://web.dev/css-animated-grid-layouts/
  - Building a tooltip component
    - https://web.dev/building-a-tooltip-component/
- google developer blog
  - https://developers.googleblog.com/
- google developer japan blog
  - https://developers-jp.googleblog.com/
  - **Google Developers Japan: Chrome Root Program 開始に向けてのお知らせ**
    - https://developers-jp.googleblog.com/2022/10/chrome-root-program.html
  - Google Developers Japan: Chrome 106: 新しい CSS 機能、 WebCodecs と WebXR の改善など
    - https://developers-jp.googleblog.com/2022/09/chrome-106.html
  - Google Developers Japan: フリーズドライ タブで Android 版 Chrome の起動を高速化する
    - https://developers-jp.googleblog.com/2022/10/chrome-on-android-freeze-dried-tabs.html
- chrome developer blog
  - Increasing the Privacy Sandbox Relevance and Measurement origin trial to 5% - Chrome Developers
    - https://developer.chrome.com/en/blog/privacy-sandbox-origin-trial-increase/
  - **Trust Tokens renamed Private State Tokens - Chrome Developers**
    - https://developer.chrome.com/en/blog/rename-trust-tokens/
  - DevTools Tips: Discover and fix low contrast text - Chrome Developers
    - https://developer.chrome.com/en/blog/devtools-tips-5/
  - **Advanced Web Apps Fund - Update Oct 2022 - Chrome Developers**
    - https://developer.chrome.com/en/blog/advanced-web-apps-fund-oct-22/
  - Inside the container query polyfill - Chrome Developers
    - https://developer.chrome.com/en/blog/inside-the-container-query-polyfill/
  - A new way to start your Chrome Extension development journey - Chrome Developers
    - https://developer.chrome.com/en/blog/extensions-getting-started-guides/
  - Chrome Dev Insider: Scaling performance with the framework ecosystem - Chrome Developers
    - https://developer.chrome.com/en/blog/insider-oct-2022/
  - Help pick a syntax for CSS nesting survey results - Chrome Developers
    - https://developer.chrome.com/en/blog/help-css-nesting-results/
  - Customize and automate user flows beyond Chrome DevTools Recorder - Chrome Developers
    - https://developer.chrome.com/en/blog/extend-recorder/
  - **No spooky cookies - Chrome Developers**
    - https://developer.chrome.com/en/blog/no-spooky-cookies/
  - Breaking change: sync methods for AccessHandles - Chrome Developers
    - https://developer.chrome.com/en/blog/sync-methods-for-accesshandles/
  - A change to overflow on replaced elements in CSS - Chrome Developers
    - https://developer.chrome.com/en/blog/overflow-replaced-elements/
  - **Is Project Fugu "done"? - Chrome Developers**
    - https://developer.chrome.com/en/blog/is-project-fugu-done/
  - Update to the CanMakePayment event behavior of the Payment Handler API - Chrome Developers
    - https://developer.chrome.com/en/blog/payment-handler-canmakepayment-update/
  - DevTools Tips: Different ways to open DevTools - Chrome Developers
    - https://developer.chrome.com/en/blog/devtools-tips-15/
  - Prepare for viewport resize behavior changes coming to Chrome on Android
    - https://developer.chrome.com/en/blog/viewport-resize-behavior/
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- other
  - **Revamp CSP policy for DCC / web.dev**
    - https://github.com/GoogleChrome/developer.chrome.com/issues/3964
      - web.dev の CSP ヘッダは 2.8KB あるらしい
      - > CSP headers should also go per route to prevent bloating headers with nonces for scripts not used on every page. For web.dev we ship roughly 2.8KB of CSP headers for every request right now.
  - サイト所有者向けのガイドラインの更新 | Google 検索セントラル ブログ | Google Developers
    - https://developers.google.com/search/blog/2022/10/search-essentials
  - 再開: 検索セントラルのライブイベント | Google 検索セントラル ブログ | Google Developers
    - https://developers.google.com/search/blog/2022/10/search-central-live-is-here
  - Google 検索でのサイト名の表示 | Google 検索セントラル ブログ | Google Developers
    - https://developers.google.com/search/blog/2022/10/introducing-site-names-on-search
  - Search Console のパフォーマンス データのフィルタリングと制限の詳細 | Google 検索セントラル ブログ | Google Developers
    - https://developers.google.com/search/blog/2022/10/performance-data-deep-dive
  - Project Zero: RC4 Is Still Considered Harmful
    - https://googleprojectzero.blogspot.com/2022/10/rc4-is-still-considered-harmful.html

### Firefox 動向

#### Stable:106

#### Updates

- **Firefox 106.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/106.0/releasenotes/
    - macOS の画像認識機能を使って画像から文字を検出する機能が追加
- **Firefox 106 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/106
    - `<source width height>`
    - `@supports font-tech()`/`@supports font-format()`
    - `<meta media>`

#### Intents

- Ship: width and height attributes on `<source>` elements
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/x--KRgIqRvA
- **Ship: Import maps**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/V2M5lYy28wU
- Ship: CSP3 subset of script-src-elem, script-src-attr, style-src-elem and style-src-attr
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/zwY8e68pGmo
- **Ship: `calc()` trigonometric functions and constants**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/-SFV2z-W4Gk
- Prototype: Audio Output Devices API
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/dUvw_czB8Uk
- Prototype: CSS font-variant-emoji
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/F9nrJbPX60A
- **Prototype: Enable Partially Implemented Opaque Response Blocking (ORB) in Nightly**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/BJNAZ-BxcqE
  - > This is partially implemented because it lacks the Javascript validation stuff such that we want to block JSON responses while allowing Javascript to pass through, however we haven't finished the implementation for this part yet.
- Prototype & Ship: CSS font-palette property and @font-palette-values rule
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/2btl0_eIZUE
- Unship: quotes around the MathML `<ms>` element
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ZxXQPGN5m2A
- XUL layout removal progress
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ZNPc1lUUNDQ
- **RFC: Page Collections**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ic7unGjE5UE
  - リンクをクリックしたら複数ページが開くという Chromium からの提案
  - Explainer を共有して興味のある人をさがしている
  - bokand/page-collection: A proposal for links that open multiple URLs
    - https://github.com/bokand/page-collection/
- Changing the way jsdoc is linted via ESLint
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/GApuZhGll0U
- Engineering Effectiveness Newsletter (August and September 2022)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/6ZqWNuVZP0I
- Soft code freeze for Firefox 107 starts on October 13
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/j2sZAJhcfsM

#### Other

- **SpiderMonkey Newsletter (Firefox 106-107)**
  - https://spidermonkey.dev/blog/2022/10/24/newsletter-firefox-106-107.html
    - implemented support for module `import.meta.resolve` (disabled by default).
- **Necko Newsletter - Autumn 2022**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/bsQUnJuYVxQ
    - Early Hints 、 WebTransport 、 Oblivious HTTP などが実装中らしい
- Privacy online just got easier with the new Firefox release
  - https://blog.mozilla.org/en/mozilla/privacy-online-just-got-easier-with-todays-firefox-release/
- **Protect your privacy and your phone number with Firefox Relay**
  - https://blog.mozilla.org/en/privacy-security/hide-your-phone-number-with-firefox-relay/
- Firefox makes browsing more colorful with new 'independent voices'
  - https://blog.mozilla.org/en/products/firefox/firefox-news/independent-voices/
- Keep your family's internet private with Total Cookie Protection on Firefox
  - https://blog.mozilla.org/en/products/firefox/firefox-tips/internet-safety-for-families-total-cookie-protection/
- This Week in Glean: Page Load Data, Three Ways (Or, How Expensive Are Events?) - Data@Mozilla
  - https://blog.mozilla.org/data/2022/10/27/this-week-in-glean-page-load-data-three-ways-or-how-expensive-are-events/
- Improving Firefox responsiveness on macOS - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2022/10/improving-firefox-responsiveness-on-macos/
- A new release, a new button and much more - These Weeks in Firefox: Issue 126 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/10/20/a-new-release-a-new-button-and-much-more-these-weeks-in-firefox-issue-126/
- PiP subtitles, screenshots in 'about' pages & more - These Weeks in Firefox: Issue 125 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/10/10/pip-subtitles-screenshots-in-about-pages-more-these-weeks-in-firefox-issue-125/

### Safari 動向

#### Stable: 16.1

#### Updates

- **Release Notes for Safari Technology Preview 155**
  - https://webkit.org/blog/13338/release-notes-for-safari-technology-preview-155/
  - JavaScript
    - **Disabled ShadowRealm for now (the `--useShadowRealm` flag can enable it) (254483@main)**
    - **Implemented `Temporal.PlainDate[Time].{equals, add, subtract}` (Behind the `--useTemporal` flag) (254366@main)**
    - Implemented `with` and `round` methods for `TemporalPlainDate[Time]` (Behind the `--useTemporal` flag) (254565@main)
  - Web API
    - **Enabled the Reporting API by default (254520@main)**
    - Implemented nested Dedicated Workers (254597@main)
    - Implemented no-quirks mode for media, plugin, and UA-inline documents (254526@main)
    - **Added support for Cross-Origin-EmbedderPolicy (COEP) violation reporting (254466@main)**
- **Release Notes for Safari Technology Preview 156**
  - https://webkit.org/blog/13394/release-notes-for-safari-technology-preview-156/
  - JavaScript
    - **Implemented `Intl.DurationFormat` (254791@main)**
    - **Implemented `Temporal.PlainDate#{since, until}` (Behind the `--useTemporal` flag) (254780@main)**
  - Accessibility
    - **Integrated ARIA element reflection in the Accessibility Tree (254905@main, 254985@main)**
  - Web API
    - **Implemented `import.meta.resolve()` (254691@main)**
    - **Implemented `importmaps` (254987@main)**
    - **Implemented support for the `Clear-Site-Data` HTTP header (254745@main)**
    - **Prototyped declarative Shadow DOM (254964@main)**
    - **Prototyped streaming for declarative Shadow DOM (255020@main)**
- **WebKit Features in Safari 16.1**
  - https://webkit.org/blog/13399/webkit-features-in-safari-16-1/
    - Web Push for macOS 13 Ventura
    - Animated AVIF
    - Passkeys
    - Scroll to Text Fragment
- Safari 16.1 Release Notes
  - https://developer.apple.com/documentation/safari-release-notes/safari-16_1-release-notes

#### Other

- **[webkit-dev] 2022 WebKit Contributors Meeting - Registration Open!**
  - https://lists.webkit.org/pipermail/webkit-dev/2022-October/032371.html
    - 11/9, 11/10 online

### Edge 動向

#### Stable: 107

#### Updates

- **MS Ignite**
  - https://ignite.microsoft.com/ja-JP/sessions
- Inspired by challenges in your workday: latest innovations and updates from Microsoft Edge - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2022/10/12/ignite-2022-innovations-updates-microsoft-edge/
- Website typo protection defends against fraud including phishing, malware, and other scams - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2022/10/17/website-typo-protection-typosquatting/

#### Chakra

#### Other

- HTTPS Goofs: Forgetting the Bare Domain - text/plain
  - https://textslashplain.com/2022/09/30/https-goofs-forgetting-the-bare-domain/
- Cruising Alaska (Alaskan Brews Cruise) - text/plain
  - https://textslashplain.com/2022/10/01/cruising-alaska/
- Capturing Logs for Debugging SmartScreen - text/plain
  - https://textslashplain.com/2022/10/12/capturing-logs-for-debugging-smartscreen/
- Q: Why do tabs sometimes show an orange dot? - text/plain
  - https://textslashplain.com/2022/10/13/q-why-do-tabs-sometimes-show-an-orange-dot/
- Microsoft Employee's Guide to Maximizing Donations - text/plain
  - https://textslashplain.com/2022/10/21/microsoft-employees-guide-to-maximizing-donations/
- Guest Blog Post - Memory corruption vulnerabilities in Edge | Microsoft Browser Vulnerability Research
  - https://microsoftedge.github.io/edgevr/posts/memory-corruption-vulnerabilities-in-edge/
- Efficiency mode in Microsoft Edge: Save even more battery life with recent updates - Microsoft Community Hub
  - https://techcommunity.microsoft.com/t5/articles/efficiency-mode-in-microsoft-edge-save-even-more-battery-life/m-p/3651853#M6586

### WHATWG/W3C 動向

#### Draft

- Recommendation
  - Last Call for Review of Proposed Corrections: CSS Containment Module Level 1
    - https://www.w3.org/blog/news/archives/9727
- Proposed Recommendation
- Candidate Recommendation
  - W3C Invites Implementations of Resource Timing
    - https://www.w3.org/blog/news/archives/9712
- Working Draft
- First Public Working Draft
  - **Portable Network Graphics (PNG) Specification (Third Edition)**
    - https://www.w3.org/TR/2022/WD-png-3-20221025/
    - APNG の仕様と EXIF メタデータの拡張仕様を取り込んだ
    - HDR にも対応
  - First Public Working Draft: Portable Network Graphics (PNG) Specification (Third Edition)
    - https://www.w3.org/blog/news/archives/9718
  - **CSS View Transitions Module Level 1**
    - https://www.w3.org/TR/2022/WD-css-view-transitions-1-20221025/
    - 元 Shared Element Transitions
  - **Scroll-linked Animations**
    - https://www.w3.org/TR/2022/WD-scroll-animations-1-20221025/
  - First Public Working Drafts: CSS View Transitions Module Level 1; Scroll-linked Animations
    - https://www.w3.org/blog/news/archives/9723
- Chartering

#### Other

- **Upcoming: W3C Workshop on Permissions | W3C News**
  - https://www.w3.org/blog/news/archives/9714
- W3C Workshop on Permissions
  - https://www.w3.org/Privacy/permissions-ws-2022/
    - 12/5, 12/6 in Munich
- **W3C Workshop Report: WCG and HDR for the Web**
  - https://www.w3.org/blog/news/archives/9731

### TC39 動向

#### Meeting

- Twitter Spaces
  - https://twitter.com/mozaicfm/status/1576922365174632449
- sep-13
  - Intl.DurationFormat Stage 3 Update
  - Temporal update
    - IXDTF (Internet Extended Date-Time Format)
    - とい RFC が通ろうとしている
    - https://datatracker.ietf.org/doc/html/draft-ietf-sedate-datetime-extended-06
  - String.dedent
    - `\x20` などで空白があった場合にそれをどうするか
    - 結論はよくわからず
  - ShadowRealm Update
    - slide がないのでよくわからん
    - なんか HTML 周りでエラーがあるっぽい
    - それが解決するまで pending
  - **Record and Tuple update**
    - isRecord/isTuple は無くした
    - JSON.parseImmutable は別ドラフト
    - Object を含むのはやめた、 WeakMap 使え
    - TS の型とのインテグレーション
    - WebIDL どうするか
  - Well-formed Unicode strings
    - WASM は Well formed な Unicode のみ扱う
    - Surrogate の片割れだけとかがあったら、 \uFFFD に置き換える
    - \uFFFD = 認識できない文字の置換用に予約された文字
    - `isWellFormed()` と `toWellFormed()` を prototype に提供
    - Stage 2 へ
- sep-14
  - **Iterable functions instead of iterator helper methods**
    - pipe を前提に method ではなく function にしたい
    - 提案ではなく自分のライブラリをプレゼンしてるだけ?
  - Iterator Helpers update
    - 細かい変更の議論
    - 次の mtg で stage 3 を目指す
  - Array.fromAsync for stage 3
    - Stage 3
  - Set Methods, part III
    - union/intersection のアルゴリズムに関する議論
    - 方針だけ決まった
- sep-15
  - Temporal extension
    - "!" は特別らしくその扱いについて議論してる
  - Explicit resource management for stage 3
    - `using` 句で明示的なリソースの確保/解放がしたい
    - ステージ移動は今はなし
  - **Extractor Objects**
    - https://github.com/tc39/proposal-extractors
    - 分割代入時にロジックを挟める
    - Stage 1
  - Refactor of import-related Host Hooks
    - import 時の挙動は Host Hooks を呼ぶように定義されている
    - その中身の実装は platform に決めさせる
    - ここをリファクタリングしたい
    - Module Blocks 周り?
  - R&T revisited
    - さっきの続き
- 次回
  - 11 月にスペインで igalia ホスト

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2022-01-01}...main@{2022-02-01}
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
  - Interim
    - https://github.com/httpwg/wg-materials/tree/gh-pages/interim-22-10
  - Call for Adoption: Structured Fields Revision (RFC8941bis)
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022OctDec/0051.html
  - I-D Action: draft-ietf-httpbis-client-cert-field-03.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022OctDec/0049.html
  - HTTP Unprompted Authentication
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022OctDec/0026.html
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

### CDN 動向

#### Cloudflare

- Speed & Reliability
- Security
- Developers
  - **Goodbye, Alexa. Hello, Cloudflare Radar Domain Rankings**
    - https://blog.cloudflare.com/radar-domain-rankings/
    - Alexa Top 100 の後継
    - 1.1.1.1 のリゾルバ統計データに基づく
    - https://radar.cloudflare.com/domains
  - Introducing post-quantum Cloudflare Tunnel
    - https://blog.cloudflare.com/post-quantum-tunnel/
  - **Stronger than a promise: proving Oblivious HTTP privacy properties**
    - https://blog.cloudflare.com/stronger-than-a-promise-proving-oblivious-http-privacy-properties/
  - Partial Cloudflare outage on October 25, 2022
    - https://blog.cloudflare.com/partial-cloudflare-outage-on-october-25-2022/
  - **Cloudflare Pages gets even faster with Early Hints**
    - https://blog.cloudflare.com/early-hints-on-cloudflare-pages/
  - Privacy Gateway: a privacy preserving proxy built on Internet standards
    - https://blog.cloudflare.com/building-privacy-into-internet-standards-and-how-to-make-your-app-more-private-today/
- Deep Dive

#### Fastly

- Using Client Hints to Detect Disparities | Fastly
  - https://www.fastly.com/blog/using-client-hints-to-detect-disparities
- Gatsby on the Edge in under 2 minutes with Fastly | Fastly
  - https://www.fastly.com/blog/gatsby-on-the-edge-in-under-2-minutes-with-fastly
- Yamagoya 2022
  - https://fastly.eventos.tokyo/web/portal/516/event/5941/#schedule

#### Other

### セキュリティ動向

- **Press Release: PayPal Introduces More Secure Payments with Passkeys**
  - https://newsroom.paypal-corp.com/2022-10-24-PayPal-Introduces-More-Secure-Payments-with-Passkeys
  - Passkeys supported sites and apps | MacRumors Forums
  - https://forums.macrumors.com/threads/passkeys-supported-sites-and-apps.2353325/

### 周辺動向

- I turned JS into a compiled language (for fun and Wasm) - surma.dev
  - https://surma.dev/things/compile-js/
- A First Look at the Websites and Software Applications Accessibility Act Bill
  - https://benmyers.dev/blog/a11yact-bill/
- **Launching a new Chromium-based WebView for Android - Engineering at Meta**
  - https://engineering.fb.com/2022/09/30/android/launching-a-new-chromium-based-webview-for-android/
- **MPArch(Multiple Page Architecture) project in Chromium | Gyuyoung Weblog**
  - https://blogs.igalia.com/gyuyoung/2022/10/13/mparchmultiple-page-architecture-project-in-chromium/

### イベント

- 11 月
  - 5-11 IETF 115 London
    - https://www.ietf.org/how/meetings/115/
  - 9-10: WebKit Contributors Meeting
    - https://lists.webkit.org/pipermail/webkit-dev/2022-October/032371.html
  - 15-17: BlinkOn17
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/16LQXKmAD4s
- 12 月
  - 5-6: W3C Workshop on Permissions
    - https://www.w3.org/Privacy/permissions-ws-2022/

### Wrap Up

- Chrome
  - 107
    - PendingBeacon OT
  - 108 Beta
    - svh/dvh/lvh
    - FedCM
    - Wildcards in Permissions Policy Origins
    - Variable COLRv1
    - Inactive CSS properties in DevTools
  - Ship
    - CHIPS
    - FedCM
    - Origin Isolation by default / deprecate document.domain
    - Same-site cross-origin prerendering
    - Anonymous iframes
  - Prototype
    - CSS Initial Letters
    - CSS Nesting
    - Document Rules
    - scheduler.yield()
  - web.dev
    - Passkeys
  - Chrome Developers
    - No spooky cookies
    - Is Project Fugu Done? → far from it
  - Chromium blog
  - other blogs
  - other
- Firefox
  - 106
    - `@supports font-tech()` / `@supports font-format()`
  - Ship
    - Import maps
    - CSS trigonometric functions
  - Prototype
    - ORB (partial) in Nightly
  - other
    - Page Collections from Chromium
    - import.meta.resolve()
    - Early Hints, WebTransport, OHTTP 実装中
- Safari
  - TP 155
    - disabled ShadowRealm for now
    - Reporting API
  - TP 156
    - import.meta.resolve()
    - Import Maps
    - Clear-Site-Data
    - prototype Declarative Shadow DOM
  - 16.1
    - Web Push for Ventura
    - Animated AVIF
    - Passkeys
    - Scroll to Text Fragment
- Edge
  - MS Ignite
- W3C/WHATWG
  - Spec
    - PNG の EXIF や HDR 対応更新
    - Shared Element Transition が CSS View Transitions Module に
    - Scroll-linked Animations
  - other
    - 12 月 Permission Workshop 開催
    - WCG/HDR の Workshop report
- TC39
  - 9 月のミーティング
  - Record & Tuple
    - isRecord/isTuple がなくなる
    - JSON.parseImmutable は別ドラフト
    - Obejct を含むのはやめ WeakMap を使え
  - Iterator helpers を method ではなく function にする提案
  - 分割代入時にロジックを挟む Extracotr Objects
- IETF
  - 特になし
- CDN 動向
  - Cloudflare
    - Alex Top100 後継を 1.1.1.1 の統計情報で
    - OHTTP のブログ
    - Early Hints で Cloudflare pages を速く
  - Fastly
    - Yamagoya 2022
- セキュリティ動向
  - PayPal が Passkey 対応
- 周辺動向
  - Facebok が Chromium-based WebView for Android
  - Igalia の MPArch の記事
