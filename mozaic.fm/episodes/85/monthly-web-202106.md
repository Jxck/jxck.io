---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep85.mp3
published_at: 2021-06-29
guest: [@myakura](https://twitter.com/myakura)
---

# ep85 Monthly Web 202106

## Theme

第 85 回のテーマは 2021 年 6 月の Monthly Web です。

## Show Note

### Chrome 動向

#### Stable: 91

#### Updates

- **Chromium Blog: Chrome 92: Web Apps as File Handlers, New JavaScript Features, and More**
  - https://blog.chromium.org/2021/06/chrome-92-web-apps-as-file-handlers-new.html
  - File Handling API
  - Origin Trials
    - New Origin Trials
      - Shared Element Transitions
  - Other features in this release
    - Change in Allowed App Shortcuts
    - CSS
      - size-adjust Descriptor for @font-face
    - Imperative Slot Distribution Behavior
    - JavaScript
      - Add dayPeriod option for Intl.DateTimeFormat
      - Relative Indexing Method for Array, String, and TypedArrays
      - Intl BestFitMatcher by Using ICU LocaleMatcher
      - SharedArrayBuffers on Desktop Platforms Restricted to Cross-Origin Isolated Environments
    - Media Session API: Video conferencing actions
    - Tainted Origin Flag applied to Resource Timing
    - Web Bluetooth Manufacturer Data Filter
  - Deprecations and Removals
    - Payment Handlers for Standardized Payment Method Identifiers

#### Intents

- **Ship: Delegated Ink Trails**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZtqwKR_HIAE/m/t61vWodBBQAJ
- Ship: WebCodecs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7UlTzFMbTFs/m/Rib4ca4-BQAJ
- **Ship: CSS module scripts**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iT0bQjzD04k/m/VkHPoOFLBAAJ
  - CSSStyleSheet を返す
- Ship: Intl BestFitMatcher by using ICU LocaleMatcher
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TpAvyXwHM_c/m/QXJKbClfAwAJ
- Ship: accent-color CSS property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WwYkLjbGhoA/m/EUw_33z_AgAJ
- Ship: Canvas color management
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/epSTNPYkLIs/m/xamWYETxAgAJ
- Ship: Sec-CH-Prefers-Color-Scheme client hint header
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tEZ4RVsP1ms/m/9h-yQpmJAgAJ
- **Ship: Object.hasOwn**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/di9BL9d1CKI/m/G2OM5JG4AQAJ
  - hasOwnProperty の static method 版
- Ship: Re-add 'style' to contain:strict and contain:content CSS properties
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oMVBKemrTDQ/m/seOI23SRAQAJ
- Ship: WebOTP API: cross-device support
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Yy86jN-TjOE/m/tuZim9iCAAAJ
- Ship: supports for the @font-face src: descriptor
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bCA9H3eaO3s/m/gDrJ0Mx-AAAJ
- **Prototype and Ship: `AbortSignal.abort()` static method**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OpiUjfRR4WQ/m/jKdB_mxpAQAJ
  - abort 済みの signal を取得するショートハンド
  - fetch に渡すと何もせずに終わらせることができる
- Prototype and Ship: CSS Flexbox: support alignment keywords start, end, self-start, self-end, left, right
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/j0eVgJCDVBY/m/IIHIJfv8AgAJ
- **Implement and Ship: `:autofill` pseudo-class**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/saobtpGibyA/m/eDN52Gj9BQAJ
  - autofill した要素だけ反応、ユーザが手入力すると外れる
- **Prototype and ship: Honor media HTML attribute for meta name=theme-color**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6I-I3lZWy5k/m/kjqDF1ARBQAJ
  - theme-color を media query で切り替えられる
  - `<meta name="theme-color" media="(prefers-color-scheme: dark)" content="black">`
- Prototype: Auto-expand details for find-in-page, element fragments, and ScrollToTextFragment
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ovNo2kFAgnE/m/IqkRALr6AwAJ
- Prototype: EME MediaKeySession Closed Reason
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Vze-UnN9d3w/m/R_OY5ImmAgAJ
- Prototype: File Handling Icons
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kLrp8eA8ajA/m/mtG3ywzfBQAJ
- Prototype: PWA manifest unique id - desktop
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hlxPHfg9GRc/m/M1jbEffUBQAJ
- **Implement and Ship: Block ports 989 and 990**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3XftxnFhAyI/m/RGNlVV8_AAAJ
  - ALPACA Attack の対策として FTP ポートを落とす
- **Prototype: COOP same-origin-allow-popups-plus-coep**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cC4T4LGdRws/m/IHxDNQ0mAAAJ
  - crossOriginIsolated でありながら popup だけにはアクセスできる
  - SAB 使いたくて isolate すると Auth や Payment の popup が壊れる
  - WebID や WebPayment なら popup がいらなくなるがまだきてないので緩和策
- **Prototype: Temporal in ECMA262**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1NNKDVv1Itc/m/tyDOXvhaAgAJ
- Experiment: URL Protocol Handler Registration for PWAs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AuKUdqTkUAs/m/qZ3V4_YEBAAJ
- Extend Experiment: MediaStreamTrack Insertable Streams (a.k.a. Breakout Box)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OCDJghwLUFw/m/jgG7R1PBBQAJ
- Experiment: Virtual keyboard API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NZLnzSY3wIQ/m/TbVKL-cyAAAJ
- Experiment: Multi-Screen Window Placement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jznxQK1U8ZQ/m/BsDTdhK4AgAJ
- Ready for Trial: URL Protocol Handler Registration for PWAs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GbTdEVNPhng/m/QvrlxYgEBAAJ
- Ready for Trial: Intl.DisplayNames v2
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XOJE7zVlxnI/m/cnkuazxHAwAJ
- Extend Origin Trial: WebCodecs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oisKIPVdLQw/m/KAikvxDQAQAJ
- Deprecate and Remove: U2F API (Cryptotoken)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xHC3AtU_65A/m/yg20tsVFBAAJ
- Request for Deprecation Trial: Remove alert(), confirm(), and prompt for cross origin iframes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VOePv--Qa-4/m/HWLSls0IBAAJ
- Deprecate and Remove: Text encoding detection for XHR JSON response
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FmY3E3-KaYI/m/QPJFiZAkAAAJ
- PSA: New implementations of IDL dictionary types
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/82EfG12unuM/m/sNkVyN6CBAAJ
- **Origin trial timelines with Chrome 4 week releases**
  - https://groups.google.com/a/chromium.org/g/experimentation-dev/c/u4lbxEEnq-Y
  - Chrome が 4 週リリースになることで OT の期間をどうするかの案
  - 1OT: 4 milestone 16 week
  - CAP: 9 milestone 36 week

#### V8

#### Other

- web.dev
  - Observing compute pressure
    - https://web.dev/compute-pressure/
  - PWAs as URL Handlers
    - https://web.dev/pwa-url-handler/
  - Evolving Cumulative Layout Shift in web tooling
    - https://web.dev/cls-web-tooling/
  - CSS for Web Vitals
    - https://web.dev/css-web-vitals/
  - Building multiple Progressive Web Apps on the same domain
    - https://web.dev/building-multiple-pwas-on-the-same-domain/
  - New CSS functional pseudo-class selectors `:is()` and `:where()`
    - https://web.dev/css-is-and-where/
  - Best practices for fonts
    - https://web.dev/font-best-practices/
  - Introducing libSquoosh
    - https://web.dev/introducing-libsquoosh/
  - CSS size-adjust for @font-face
    - https://web.dev/css-size-adjust/
  - Using AVIF to compress images on your site
    - https://web.dev/compress-images-avif/
  - **Building a color scheme**
    - https://web.dev/building-a-color-scheme/
  - Improving Cumulative Layout Shift at Telegraph Media Group
    - https://web.dev/telegraph/
  - **Introducing Aurora**
    - https://web.dev/introducing-aurora/
    - フレームワークやツールとの協業プロジェクト
    - これまで React/Angular/Next/Nuxt などに協力してきた
  - **Conformance for Frameworks**
    - https://web.dev/conformance/
    - strong defaults と actionable rules によってレビューじゃなくてもスケールするように
  - Blibli's PWA generates 10x more revenue per user than their previous mobile website
    - https://web.dev/blibli/
  - **High performance storage for your app: the Storage Foundation API**
    - https://web.dev/storage-foundation/
    - File System Access API よりも権限がゆるいシンプルな API
    - Blob の扱いや DB の構築などもできるように
  - Towards a better responsiveness metric
    - https://web.dev/better-responsiveness-metric/
- google developer blog
  - https://developers.googleblog.com/
- google developer japan blog
  - Google Developers Japan: Google Ads API のフィードベースの拡張機能の提供終了について
    - https://developers-jp.googleblog.com/2021/06/google-ads-api.html
  - Google Developers Japan: Google Ads API v4 および v5 の提供終了に関するお知らせ
    - https://developers-jp.googleblog.com/2021/06/google-ads-api-v4-v5.html
  - Google Developers Japan: Chrome が M91 で最大 23% 高速化し、毎日 17 年以上の CPU 時間を節約
    - https://developers-jp.googleblog.com/2021/06/chrome-m91-23-17-cpu.html
  - Google Developers Japan: Chrome 92 ベータ: ファイル ハンドラとしてのウェブアプリ、新しい JavaScript 機能など
    - https://developers-jp.googleblog.com/2021/06/chrome-92-javascript.html
  - **Google Developers Japan: Chrome の User-Agent 文字列削減に関する最新情報**
    - https://developers-jp.googleblog.com/2021/06/chrome-user-agent.html
  - Google Developers Japan: Google 公式ウェブ開発者向けリソースのご紹介
    - https://developers-jp.googleblog.com/2021/06/google.html
- chromium blog
  - Chromium Blog: Changes to Chrome OS's release cycle
    - https://blog.chromium.org/2021/06/changes-to-chrome-oss-release-cycle.html
- **Our commitments for the Privacy Sandbox**
  - https://blog.google/around-the-globe/google-europe/our-commitments-privacy-sandbox/
  - Ad の最適化に Sync されたデータを使わない
  - Privacy Sandbox を Google だけが有利になるようなものにしない
- **An updated timeline for Privacy Sandbox milestones**
  - https://blog.google/products/chrome/updated-timeline-privacy-sandbox-milestones/
  - サードパーティ Cookie 廃止のタイムラインを更新
  - API 実装が late 2022 、サードパーティ Cookie 廃止を late 2023
- ユーザー アカウント、認証、パスワード管理に関する 13 のベスト プラクティス 2021 年版 | Google Cloud Blog
  - https://cloud.google.com/blog/ja/products/identity-security/account-authentication-and-password-management-best-practices
- canary
  - https://www.chromium.org/getting-involved/dev-channel

### Firefox 動向

#### Stable: 89

#### Updates

- **Firefox 89 blocks cross-site cookie tracking by default in private browsing - Mozilla Security Blog**
  - https://blog.mozilla.org/security/2021/06/01/total-cookie-protection-in-private-browsing/
  - Private Browse の安全性を強固にした話
  - Total Cookie Protection
  - Supercookie protections
  - Cookies and caches are cleared
  - Trackers are blocked
  - Many fingerprinting scripts are blocked
  - SmartBlock
- **Implementing Private Fields for JavaScript - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2021/06/implementing-private-fields-for-javascript/
- **Looking fine with Firefox 89 - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2021/06/looking-fine-with-firefox-89/
  - forced-colors media feature
  - Better control for displayed fonts
  - Top-level await
  - PerformanceEventTiming
- These Weeks in Firefox: Issue 95 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2021/06/04/these-weeks-in-firefox-issue-95/
- These Weeks in Firefox: Issue 96 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2021/06/23/these-weeks-in-firefox-issue-96/

#### Intents

- Ship: CSS `tab-size` property
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/4gjD-sC_AcQ
- Ship: CSS 'content: none' on ::marker
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/CJ6ZRmOMkao
- Ship: CSS 'content: none' on (non-pseudo) elements
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/oWc1K4Uur2Y
- Ship: CSS 'font-synthesis: small-caps'
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/qNG2YLxbmFs

#### Other

- **Privacy analysis of FLoC**
  - https://blog.mozilla.org/en/privacy-security/privacy-analysis-of-floc/
  - EKR による FLoC の調査
  - Fingerprint の精度を上げてしまう可能性などの指摘
  - 詳細なレポート w/ Martin
  - https://mozilla.github.io/ppa-docs/floc_report.pdf
- 11 secret tips for Firefox that will make you an internet pro
  - https://blog.mozilla.org/en/products/firefox/firefox-tips/firefox-secret-tips/
- Feel at home on your iPhone and iPad with Firefox
  - https://blog.mozilla.org/en/products/firefox/feel-at-home-on-your-iphone-and-ipad-with-firefox/
- Screenshots made easy with the Firefox screenshot feature
  - https://blog.mozilla.org/en/products/firefox/how-to-capture-screenshots-with-firefox/
- **A fresh new Firefox is here**
  - https://blog.mozilla.org/en/products/firefox/fresh-new-look-for-firefox/
- Modern, clean new Firefox clears the way to all you need online
  - https://blog.mozilla.org/en/mozilla/news/modern-clean-new-firefox-clears-the-way-to-all-you-need-online/

### Safari 動向

#### Stable: 14.1

#### Updates

- WWDC
  - **Apple's privacy pillars in focus - WWDC 2021 - Videos - Apple Developer**
    - https://developer.apple.com/videos/play/wwdc2021/10085
    - Hide My Email
    - Private Relay
    - etc
  - Platforms State of the Union - WWDC 2021 - Videos - Apple Developer
    - https://developer.apple.com/videos/play/wwdc2021/102
  - **Move beyond passwords - WWDC 2021 - Videos - Apple Developer**
    - https://developer.apple.com/videos/play/wwdc2021/10106
    - Passkeys in iCloud Keychain
  - **Meet privacy-preserving ad attribution - WWDC 2021 - Videos - Apple Developer**
    - https://developer.apple.com/videos/play/wwdc2021/10033
    - Private Click Measurement
    - SK Ad Networks
  - Accelerate networking with HTTP/3 and QUIC - WWDC 2021 - Videos - Apple Developer
    - https://developer.apple.com/videos/play/wwdc2021/10094/
  - Optimize for 5G networks - WWDC 2021 - Videos - Apple Developer
    - https://developer.apple.com/videos/play/wwdc2021/10103/
  - Design for Safari 15 - WWDC21 - Videos - Apple Developer
    - https://developer.apple.com/videos/play/wwdc2021/10029/
- **WebKit Features in Safari at WWDC21**
  - https://webkit.org/blog/11700/webkit-features-in-safari-at-wwdc21/
  - Tuesday, June 8
    - Meet Safari Web Extensions on iOS
  - Wednesday, June 9
    - Explore Safari Web Extension Improvements
    - Explore WKWebView Additions
    - Move beyond passwords
    - Secure login with iCloud Keychain verification codes
  - Thursday, June 10
    - Develop Advanced Web Content
    - Discover Web Inspector Improvements
    - Meet Privacy-Preserving Ad Attribution
  - Friday, June 11
    - Design for Safari 15
    - Coordinate media playback in Safari with Group Activities
- **Release Notes for Safari Technology Preview 126 with Safari 15 Features**
  - https://webkit.org/blog/11727/release-notes-for-safari-technology-preview-126-with-safari-15-features/
  - Streamlined tab bar
  - Live Text
  - Improved Safari Web Extensions
  - Quick Notes
  - WebGL 2
  - Web technologies
- **Safari 15 Beta Release Notes | Apple Developer Documentation**
  - https://developer.apple.com/documentation/Safari-Release-Notes/safari-15-beta-release-notes

#### Position

- [webkit-dev] Request for position: EME MediaKeySession Closed Reason
  - https://lists.webkit.org/pipermail/webkit-dev/2021-June/031880.html
- [webkit-dev] Request for position: preferCurrentTab
  - https://lists.webkit.org/pipermail/webkit-dev/2021-June/031886.html
- [webkit-dev] Request for position: Canvas 2D display-p3 support
  - https://lists.webkit.org/pipermail/webkit-dev/2021-June/031895.html
- [webkit-dev] Removing the ENABLE(CSS_SCROLL_SNAP) flag
  - https://lists.webkit.org/pipermail/webkit-dev/2021-June/031904.html
- [webkit-dev] Request For Position on CSS containment
  - https://lists.webkit.org/pipermail/webkit-dev/2021-June/031913.html

#### Other

- Apple advances its privacy leadership with iOS 15, iPadOS 15, macOS Monterey, and watchOS 8 - Apple
  - https://www.apple.com/newsroom/2021/06/apple-advances-its-privacy-leadership-with-ios-15-ipados-15-macos-monterey-and-watchos-8/
- iOS 15 brings powerful new features to stay connected, focus, explore, and more - Apple
  - https://www.apple.com/newsroom/2021/06/ios-15-brings-powerful-new-features-to-stay-connected-focus-explore-and-more/
- MotionMark 1.2
  - https://webkit.org/blog/11685/motionmark-1-2/

### Edge 動向

#### Stable: 91

#### Updates

- **Dark Mode for HTML Form Controls**
  - https://blogs.windows.com/msedgedev/2021/06/16/dark-mode-html-form-controls/
  - form の default controller に dark mode を導入する
- **Improving contrast in Microsoft Edge DevTools: A bugfix case study**
  - https://blogs.windows.com/msedgedev/2021/06/15/improving-contrast-in-microsoft-edge-devtools-a-bugfix-case-study/
  - DevTools でコントラストが低い UI パーツがあったため、カラーパレットを更新した話
- **Available for preview: Automatic HTTPS helps keep your browsing more secure**
  - https://blogs.windows.com/msedgedev/2021/06/01/available-for-preview-automatic-https-helps-keep-your-browsing-more-secure/
  - 事前にリストした HTTPS 対応済みサイトの場合は HTTP から自動でリダイレクトする機能
  - Preload HSTS にないサイトで MS が集めた情報を元に対応する
- **Improving font rendering in Microsoft Edge**
  - https://blogs.windows.com/msedgedev/2021/06/02/improving-font-rendering-in-microsoft-edge/
  - コントラスト強化とガンマ補正の修正

#### Chakra

#### Other

- List of APIs that will be available due to IE termination
  - https://github.com/progfay/benefit-from-end-of-ie
  - IE サポートを外すと使えるようになる機能
- What Windows 11 Means for Developers - Windows Developer Blog
  - https://blogs.windows.com/windowsdeveloper/2021/06/24/what-windows-11-means-for-developers/
  - Microsoft Store に PWA がくる
- Windows 11 の仕様 - Microsoft
  - https://www.microsoft.com/ja-jp/windows/windows-11-specifications
  - IE11 は Windows 11 ではデフォルト無効に

### WHATWG/W3C 動向

#### Draft

- Recommendation
  - **Call for Exclusions: DOM**
    - https://lists.w3.org/Archives/Public/public-html/2021Jun/0001.html
  - **Web Audio API is a W3C Recommendation**
    - https://www.w3.org/blog/news/archives/9093
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - CfC to publish Trusted Types as an FPWD
    - https://lists.w3.org/Archives/Public/public-webappsec/2021Jun/0000.html
  - Web Neural Network API
    - https://www.w3.org/blog/news/archives/9110
- Chartering
  - **WebExtensions Community Group created**
    - https://lists.w3.org/Archives/Public/public-new-work/2021Jun/0002.html
  - Multicast Community Group created
    - https://lists.w3.org/Archives/Public/public-new-work/2021Jun/0009.html
  - Call for Participation: Web Editing Working Group Charter Approved
    - https://lists.w3.org/Archives/Public/public-new-work/2021Jun/0007.html
  - Accessibility Features Community Group created
    - https://lists.w3.org/Archives/Public/public-new-work/2021Jun/0006.html
  - Proposed W3C Charter: Web Application Security Working Group
    - https://lists.w3.org/Archives/Public/public-new-work/2021Jun/0003.html
  - Proposed W3C Charter: Devices and Sensors Working Group
    - https://lists.w3.org/Archives/Public/public-new-work/2021Jun/0016.html

#### Other

- 証明書有効期限切れで w3.org が落ちる
  - https://news.ycombinator.com/item?id=27363813
  - expires 6/2 9:00 (JST)
  - すぐに復帰
- **W3C Advisory Committee Elects Advisory Board**
  - https://www.w3.org/blog/news/archives/9082
  - Heejin Chung (Samsung Electronics)
  - Avneesh Singh (DAISY Consortium)
  - Eric Siow (Intel)
  - L é onie Watson (TetraLogical)
  - Chris Wilson (Google)
  - Hongru (Judy)
  - Zhu (Alibaba)
  - Tantek Ç elik (Mozilla)
  - Tatsuya Igarashi (Sony)
  - Florian Rivoal (W3C Invited Expert)
  - Tzviya Siegman (Wiley)
  - David Singer (Apple).

### TC39 動向

#### ES2021

- ECMAScript 2021
  - https://www.ecma-international.org/publications-and-standards/standards/ecma-262/

#### Meeting

- 2021-05
  - https://github.com/tc39/agendas/blob/master/2021/05.md
  - https://github.com/tc39/notes/tree/master/meetings/2021-05
  - https://spidermonkey.dev/blog/2021/06/15/tc39.html

#### Proposals Diff

- https://github.com/tc39/proposals/compare/master@{2021-06-01}...master@{2021-07-01}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->3
- 3->4

#### New Proposals

#### Other

- TC39, JavaScript, Podcast
  - https://tc39er.us/posts/episode-12-daniel-ehrenberg/
- stream: implement WHATWG streams by jasnell · Pull Request #39062 · nodejs/node
  - https://github.com/nodejs/node/pull/39062

### IETF 動向

#### WG

- IETF
  - https://datatracker.ietf.org/meeting/
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - Genart last call review of draft-ietf-httpbis-cache-16
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0157.html
  - Port 80 deprecation
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0163.html
  - I-D Action: draft-ietf-httpbis-rfc6265bis-08.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0164.html
  - I-D Action: draft-ietf-httpbis-http2bis-02.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0166.html
  - HTTP/2 revision
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0167.html
  - draft-handte-httpbis-dict-sec
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0173.html
  - Opsdir last call review of draft-ietf-httpbis-cache-16
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0184.html
  - Introducing Content-Digest in digest-headers
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0221.html
  - Alt-Svc-bis / rfc7838bis
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0217.html
  - HTTP Working Group Interim Meeting Agenda - June 2021
    - https://httpwg.org/wg-materials/interim-21-06/agenda.html
    - https://github.com/httpwg/wg-materials/blob/gh-pages/interim-21-06/minutes.md
    - 15 min - Client Cert Header (slides)
    - 15 min - Safe method with body (slides)
    - 20 min - HTTP/2 bis
    - 20 min - RFC6265bis (slides)
    - 20 min - Extensible Prioritization Scheme for HTTP
    - 20 min - Digest Headers (slides)
    - 20 min - Signing HTTP Messages (slides)
    - 20 min - Alt-Svc bis (slides)
    - 10 min - Targeted Cache Control (slides)
    - 10 min - Cache Trailers (slides)
    - 10 min - Binary HTTP Messages (slides)
    - HTTP Interim June 2021 - CodiMD
    - https://codimd.ietf.org/notes-httpbis-21-06
    - New Proposal
      - ALT-SVC bis
        - https://httpwg.org/wg-materials/interim-21-06/altsvcbis.pdf
      - Targeted Cache-Control
        - https://httpwg.org/wg-materials/interim-21-06/targeted-cc.pdf
        - CDN-Cache-Control のように CDN 意外にも特定の実装を対象にしたい場合がある
        - これを標準化したい by mnot
      - Cache-Trailer
        - https://httpwg.org/wg-materials/interim-21-06/cache-trailer.pdf
      - Binary HTTP Messages
        - https://httpwg.org/wg-materials/interim-21-06/bhttp.pdf
        - OHTTP をする際に HTTP Message のバイナリ化が必要らしい
  - I-D Action: draft-ietf-httpbis-client-cert-field-00.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0199.html
  - I-D Action: draft-ietf-httpbis-message-signatures-05.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0198.html
  - I-D Action: draft-ietf-httpbis-safe-method-w-body-01.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0197.html
  - Prioritizing HTTP DATAGRAMs
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0257.html
  - Prioritizing QUIC DATAGRAMs
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0259.html
  - OHTTP status update and next steps
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0253.html
  - Signature Algorithm Identifiers
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0250.html
  - Question regarding HTTP/2, SNI, and IP addresses
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0248.html
  - Digest: defining an additional field for message content
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0245.html
  - Alt-Svc interaction with HTTPS/SVCB DNS records
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0243.html
  - Adoption call for draft-cdn-control-header
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0269.html
  - AD review of draft-ietf-httpbis-cache-header-08
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0274.html
  - Last Call: (The Cache-Status HTTP Response Header Field) to Proposed Standard
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0276.html
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
- privacypass
- dispatch
  - https://mailarchive.ietf.org/arch/browse/dispatch/
- secdispatch
  - https://mailarchive.ietf.org/arch/browse/secdispatch/

#### Other

### CDN 動向

#### Cloudflare

- **Syria's exam-related Internet shutdowns**
  - https://blog.cloudflare.com/syria-exam-related-internet-shutdowns/
- Interconnect Anywhere - Reach Cloudflare's network from 1,600+ locations
  - https://blog.cloudflare.com/interconnect-anywhere/
- Introducing Zero Trust Private Networking
  - https://blog.cloudflare.com/private-networking/

#### Fastly

- Minimizing ossification risk is everyone's responsibility
  - https://www.fastly.com/blog/minimizing-ossification-risk-is-everyones-responsibility
- **Summary of June 8 outage**
  - https://www.fastly.com/blog/summary-of-june-8-outage
  - 特定の構成でバグになるソフトをデプロイし 85% がダウン
  - Amazon, 楽天, GitHub など様々なサービスに影響
  - 9:47 に発生し 11:00 にはおおよそ回復
- How we vetted Cranelift for secure sandboxing in Compute@Edge
  - https://www.fastly.com/blog/how-we-vetted-cranelift-for-secure-sandboxing-in-compute-edge

#### Other

- AKAMAI の PROLEXIC DDOS サービスにおける影響に関する最新情報 (ステータス: 解決済) - Akamai Japan Blog
  - https://blogs.akamai.com/jp/2021/06/akamai-provides-prolexic-ddos-service-impact-update-status-resolved.html.html
  - ルーティングテーブルが溢れたために障害
  - 6/17 AM4: 20 UTC - AM8:47 UTC
- 世界でまたネット障害 メガバンクや航空大手に影響 写真 1 枚 国際ニュース:AFPBB News
  - https://www.afpbb.com/articles/-/3352236
  - (直前の Fastly もふまえ)
  - > 問題が相次いだことで、経済活動で必要不可欠なオンラインプラットフォームの安定性や、ほぼ無名の少数の企業がインターネットの機能維持に重要な役割を担っている実態が露呈し、注目が集まっている。

### セキュリティ動向

- **Investigation into Google's 'Privacy Sandbox' browser changes - GOV.UK**
  - https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes
  - イギリスの公正取引委員会の調査
  - これに対する Google からの声明が blog.google のもの
- Hack Patch!: Trusted Types の概念と背景
  - https://shhnjk.blogspot.com/2021/06/concept-and-background-of-trusted-types.html

### 周辺動向

- **The startups reinventing the web browser - Protocol - The people, power and politics of tech**
  - https://www.protocol.com/browser-company
  - The Browser Company の話
- **The Browser Company**
  - https://thebrowser.company/
  - ブラウザを新しく作ってる会社?
- **mnot's blog: How the Next Layer of the Internet is Going to be Standardised**
  - https://www.mnot.net/blog/2021/06/21/standards-competition-governance
- Making JavaScript run fast on WebAssembly
  - https://bytecodealliance.org/articles/making-javascript-run-fast-on-webassembly
- **Antitrust: Commission opens investigation into possible anticompetitive conduct by Google in the online advertising technology sector**
  - https://ec.europa.eu/commission/presscorner/detail/en/ip_21_3143
  - EU もオンライン広告に関して Google を訴える

### イベント

- 7 月
  - 13-16: TC39 meeting Tokyo
    - https://github.com/tc39/agendas/blob/master/2021/07.md
  - 26-30: IETF 111 Online
    - https://www.ietf.org/how/meetings/111/
- 8 月
- 9 月
  - 7-11: SecWeb
    - https://secweb.work/
- 10 月
  - 18-29: TPAC:
    - 10/18-22 October: Breakout sessions
    - 10/25-29 October: Groups and Joint Meetings
    - https://lists.w3.org/Archives/Public/public-webrtc/2021Apr/0027.html

### Wrap Up

- Chrome
  - OT Shared Element Transition
  - Intents css module script
  - Intents hasOwn
  - Intents theme-color meta=media
  - Intents ALCAPA port blocking
  - Intents Temporal
  - OT Release Cycle 変更
  - web.dev CSS の話多め
  - project AURORA
  - "Conformance" concept
  - privacy sandbox commitment
  - privacy sandbox milestone update
- Firefox
  - Visual refresh
  - EKR/Martin FLoC Report
- Safari
  - WWDC
    - Private Relay
    - passkey in iCloud keychain
    - Safari 15
    - Tab bar
    - meta media
    - web extension
- Edge
  - HTTPS upgrade を広いサイトで
  - Windows 11
- WHATWG/W3C
  - Web Audio API REC
  - Web Extensions Community Group
- TC39
  - es2021
- IETF
  - Targeted Cache Control
  - Cache Trailer
  - OHTTP
  - DATAGRAM Priority
- CDN
  - Fastly / AKAMAI 障害
- セキュリティ
  - CMA のレポート
  - 小勝さん Trusted Types のブログ
- 周辺
  - mnot の Internet Layer に関するブログ
  - EU が Google を検索周りで訴える
