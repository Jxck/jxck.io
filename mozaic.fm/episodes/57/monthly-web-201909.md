---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep57.mp3
published_at: 2019-10-04
guest: [@myakura](https://twitter.com/myakura)
---

# ep57 Monthly Web 201909

## Theme

第 57 回のテーマは 2019 年 9 月の Monthly Web です。

## Show Note

### Chrome 動向

- Stable: 77
- Updates
  - New in Chrome 77
    - https://developers.google.com/web/updates/2019/09/nic77
    - Largest Contentful Paint
    - The formdata event
    - Form-associated custom elements
    - Native lazy loading
    - Chrome Dev Summit 2019
  - What's New In DevTools (Chrome 78)
    - https://developers.google.com/web/updates/2019/09/devtools
  - **Chromium Blog: Chrome 78 Beta: a new Houdini API, native file system access and more**
    - https://blog.chromium.org/2019/09/chrome-78-beta-new-houdini-api-native.html
    - CSS Properties and Values
    - Native File System
    - Signed Exchange Subresource Prefetching and Loading by Extending the HTTP Link Header.
    - SMS Receiver API
    - Apply Opacity for the Default Style of INPUT/TEXTAREA placeholder
    - Don't Allow Popups During Page Unload
    - **Extend Byte-for-Byte Update Check to all Service Worker importScripts() Resources**
      - これまで importScripts は初期ロードでキャッシュされていた
      - 更新したい場合は URL にハッシュを追加して Top Level Script を更新する必要
      - これからはちゃんと確認しに行く
      - updateViaCache='none' や Cache-Control: max-age=0 (no-store?)等を設定
      - Firefox/Safari と挙動が揃った
      - https://developers.google.com/web/updates/2019/09/fresher-sw#checks_for_updates_to_imported_scripts
    - **Faster Web Sockets**
      - Linux: 7.5 times faster
      - Windows: 4.1 times faster
      - Mac: 7.8 times faster
    - More restrictive hasEnrolledInstrument() for Autofill Instruments
    - PaymentResponse.prototype.retry()
    - Percentage Opacity
    - Redact Address in PaymentRequest.onshippingaddresschange Event
    - Seeking
    - User Timing L3
    - Disallow Synchronous XHR in Page Dismissal
    - XSS Auditor
  - Trusted Web Activities Quick Start Guide
    - https://developers.google.com/web/updates/2019/08/twas-quickstart
  - **Network Service ownership and next steps**
    - https://groups.google.com/a/chromium.org/forum/#!msg/network-service-dev/5HATwq4CE50/JMMOI9QJAAAJ
    - 2.5 年かけて off the main thread を進めてきた
    - 1100 bugs の 3200 行を 150 人が書き 250 人がレビューした
    - セキュリティレイヤを追加し、ジャンクを改善、SW のプロセスホップを 4->0 にした
    - クラッシュの 8% をレンダリングプロセスからブラウザプロセスに移し、回復可能にした
    - この Chrome 史上最大のリファクタリングに貢献した kinuko さんが今後オーナーになる
    - ネットワークサービスに関する全てのデザインレビューは kinuko さんを通すことに
- Intents
  - Ship: mixed content autoupgrading for audio and video
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/XI1otbsuvMw/X_65dN7qAgAJ
  - Implement and Ship: Autofocus support for any focusable HTML/SVG element
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/g8MP8KUf96w/360rLewrDwAJ
  - Implement and Ship: Display alerts for SameSite cookie changes in the developer console
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/O_uF2FBXacA/oclqAWFSDgAJ
  - Implement and Ship: Add frozen or active lifecycleState to ServiceWorker Client
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/5yXXzCrBJ98/1PlnJyT6AQAJ
  - Implement and Ship: Do not resurrect uninstalled service workers
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/r176Lvgxfys/4W4IGM4uAgAJ
  - Implement and Ship: ontransition{run, start, cancel} event handler attributes
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/dxDGBFKvO3A/A2gajDMjAwAJ
  - Implement and Ship: ServiceWorkerGlobalScope#serviceWoker to get a service worker object corresponding to a worker itself
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/pNru6E5rda4/3D0KDY5nBgAJ
  - Implement: IndexedDB relaxed durability transactions
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/aDDJXM8TZnk/xdhSlY-ZDwAJ
  - **Implement: window.isFramePending**
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/brAJpwPoix8/FDmDG9VfDgAJ
  - **Implement: EditContext API**
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/OHqvPx9mFww/ikcYp9K_DwAJ
  - **Implement: Compute img/video aspect ratio from width and height HTML attributes**
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/hbhKRuBzZ4o/pmehGGHKAAAJ
    - intrinsicsize 属性をやめて width/height をそのまま使うように
    - https://github.com/WICG/intrinsicsize-attribute/issues/16#issuecomment-500941775
  - **Implement: Navigation to Bundled Exchanges (Web Packaging)**
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/XQEO617FMhA/LShCefAgAgAJ
  - Implement: WebXR DOM Overlay for Handheld AR
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/QRbZ0ZUjhmI/kdS3S9OtAgAJ
  - **Implement navigation-controls media query**
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/6CllchdqZl8/Cyy7groFAwAJ
    - 旧 back button media query
    - 「戻るボタン」が UI 上表示されているかどうかを知る media query
    - fullscreen や app の webview など、戻るが無い場合に提供する目的
    - 戻るボタンがアプリ/UI 両方で存在する double back button も回避
    - media query で提供することで CSS だけではなく、JS にも API が出る
  - Implement: Navigation-controls media query
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/b5vXvm1bP3s/BDBx92QxAwAJ
  - **Implement: rendersubtree attribute.**
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Bh0bSdkQlbk/7n6b50N6AwAJ
  - **Implement: Screen Enumeration**
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/LDymWZeV7jo/DCcYyBYtAwAJ
  - Implement: ARIA Annotation roles
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/wdWtyA1gyvI/37hqCDu5BgAJ
  - **Implement: [Intervention] Heavy Ad Intervention**
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/pZq73q_Mc-c/chp8ssUKBgAJ
    - CPU やネットワークを使いすぎる Ad を unload
      - Cyptominers
      - Ads that load large uncompressed image files
      - Ads that use javascript to decode video files
    - Ad Tagging を使う
      - https://chromium.googlesource.com/chromium/src/+/master/docs/ad_tagging.md
  - Implement: Adaptive Audio Frame Length
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/ihEtfl4EE7Q/Z0ICh65fBQAJ
  - Implement: [Payments] shipping address and contact info delegation
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Gojq_IyMk04/lAja8XPsBwAJ
  - Implement: Percent-based scrolling
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/U3kH6_98BuY/uiaeS3D2AwAJ
  - Experiment | Deprecation Trial For Disallowing Sync XHR in Page Dismissal
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/cCWNIXB4dzY/o9oJteKiBQAJ
  - Experiment: Native File System API
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/noan0cgEBGQ/t8DuK8_hDwAJ
  - Experiment: WebSocketStream
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/SUaSJzLQ1Yc/jmk7A-maAAAJ
  - Experiment: SMS Receiver API
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/-bdqHhCyBwM/yFoKtQQRAQAJ
  - Experiment: Notification Triggers
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/5dCim99q5hM/-qGaZpUEAQAJ
  - Experiment: Subresource prefetching+loading via Signed HTTP Exchange
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Wy6Hf9ycIKk/Ne8WRN3GAgAJ
  - Experiment: Screen Wake Lock API
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/nrDKOvVl_I4/N9T_Mpu9AgAJ
  - Deprecate and Remove: prefixed 'animationIteration' event handler
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/EFazbHJRmnQ/4l5EUNRxAAAJ
  - Deprecate and Remove: Stop evaluating scripts moved between Documents during fetching
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/KyB2mwOmjrk/mgrtO9BhBgAJ
  - Change:
  - Unship:
  - Remove:
  - **What to do about scroll anchoring?**
    - https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/hjg5X55FnwE/7iIGXDp_BgAJ
    - mozilla.dev.platform からのマルチポスト(そちら参照)
- AMP
  - AMP Advisory Committee midterm election results - The AMP Blog
    - https://blog.amp.dev/2019/09/12/amp-advisory-committee-midterm-election-results/
  - How Developers are Creating WordPress AMP Experiences Content Creators LOVE to Use - The AMP Blog
    - https://blog.amp.dev/2019/09/11/how-developers-are-creating-wordpress-amp-experiences-content-creators-love-to-use/
  - Powerful impact: Why we AMPized the Australian pop culture site - GOAT - The AMP Blog
    - https://blog.amp.dev/2019/09/19/powerful-impact-why-we-ampized-the-australian-pop-culture-site-goat/
- v8
  - A lighter V8 · V8
    - https://v8.dev/blog/v8-lite
    - デバイス向け省メモリの Lite Mode
    - Lazy feedback allocation
    - Lazy source positions
    - Bytecode flushing
    - Additional optimizations
  - V8 release v7.8 · V8
    - https://v8.dev/blog/v8-release-78
    - Script streaming on preload
    - Faster object destructuring
    - Lazy source positions
    - Faster RegExp match failures
    - WebAssembly C/C++ API
    - Improved startup time
- Other
  - Official Google Webmaster Central Blog: Introducing Auto-DNS verification in the new Search Console
    - https://webmasters.googleblog.com/2019/09/auto-dns-verification.html
  - Going beyond images with basic video for the web
    - https://web.dev/video-basics/
  - PSA: WebRTC M77 Release Notes
    - https://groups.google.com/forum/#!topic/discuss-webrtc/b1tdwrXKuHI
  - Official Google Webmaster Central Blog: Saying goodbye to the old Search Console
    - https://webmasters.googleblog.com/2019/09/goodbye-old-search-console.html
  - **Chromium Blog: Experimenting with same-provider DNS-over-HTTPS upgrade**
    - https://blog.chromium.org/2019/09/experimenting-with-same-provider-dns.html
    - DoH の検証を対応しているプラットフォーム(Linux/iOS 以外)で開始
    - サポートしている DNS を使っているユーザのみアップグレードされる
    - DNS 自体は変えないので、ペアレンタルコントロールなどはそのまま
    - flag からオプトアウト可能
    - まずはデプロイし、実装とパフォーマンスなどの影響を検証
  - Google Developers Blog: Flutter news from GDD China: uniting Flutter on web and mobile, and introducing Flutter 1.9
    - https://developers.googleblog.com/2019/09/flutter-news-from-gdd-china-flutter1.9.html
  - Prefetch resources to speed up future navigations
    - https://web.dev/link-prefetch/
  - **Official Google Webmaster Central Blog: Evolving "nofollow" - new ways to identify the nature of links**
    - https://webmasters.googleblog.com/2019/09/evolving-nofollow-new-ways-to-identify.html
    - コメントスパムをクローラが辿らないように `rel=nofollow` が使われてきた
    - Google は nofollow は完全に無視してきたが、そこにも情報が多いことがわかってきた
    - 全て辿ることで、スパムであるかも正確に判定できる場合もある
    - `nofollow` に加え `sponsored` と `ugc` を加え、それらをヒントとして見るようになる
  - Google Developers Blog: Get smart about preparing your app for OAuth verification
    - https://developers.googleblog.com/2019/09/get-smart-about-preparing-your-app-for-OAuth-verfication.html
  - The Chromium Chronicle: Monorail's Grid View!
    - https://developers.google.com/web/updates/2019/09/chromium-chronicle-6
  - Buggy Google Chrome Update Behind Recent Unbootable Macs
    - https://www.bleepingcomputer.com/news/security/buggy-google-chrome-update-behind-recent-unbootable-macs/

### Firefox 動向

- Stable: 69.0
- Updates
  - **Firefox 69 - a tale of Resize Observer, microtasks, CSS, and DevTools**
    - https://hacks.mozilla.org/2019/09/firefox-69-a-tale-of-resize-observer-microtasks-css-and-devtools/
    - New logical properties for overflow
    - @supports for selectors
    - JavaScript gets public instance fields
    - Resize Observer
    - Microtasks
    - Developer tools updates in 69
  - **Firefox 69 for developers**
    - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/69
    - CSS Containment
    - line-break プロパティ
    - @supports の selector()
    - Public Class Fields
    - unhandledrejection
  - **The Baseline Interpreter: a faster JS interpreter in Firefox 70**
    - https://hacks.mozilla.org/2019/08/the-baseline-interpreter-a-faster-js-interpreter-in-firefox-70/
    - Baseline JIT の前段に多くのコードを共有した Interpreter を作ったら少ないコストで大きな効果が出た
  - Today's Firefox Blocks Third-Party Tracking Cookies and Cryptomining by Default
    - https://blog.mozilla.org/blog/2019/09/03/todays-firefox-blocks-third-party-tracking-cookies-and-cryptomining-by-default/
  - **What's next in making Encrypted DNS-over-HTTPS the Default**
    - https://blog.mozilla.org/futurereleases/2019/09/06/whats-next-in-making-dns-over-https-the-default/
    - US で DoH をデフォルト有効に
    - split-horizon などが検出された場合は、OS の設定にフォールバック
  - Firefox's Test Pilot Program Returns with Firefox Private Network Beta
    - https://blog.mozilla.org/blog/2019/09/10/firefoxs-test-pilot-program-returns-with-firefox-private-network-beta/
  - **Moving Firefox to a faster 4-week release cycle**
    - https://hacks.mozilla.org/2019/09/moving-firefox-to-a-faster-4-week-release-cycle/
    - 2020 年 Q1 より Firefox のリリースが 4 週ごとになる
    - それまでのリリースも間隔をだんだん短くしていく
  - These Weeks in Firefox: Issue 64
    - https://blog.nightly.mozilla.org/2019/09/23/these-weeks-in-firefox-issue-64/
  - Firefox 70 Beta 10 Testday, September 27th
    - https://quality.mozilla.org/2019/09/firefox-70-beta-10-testday-september-27th/
- Intents
  - Ship: `|clip-path: path()|`
    - https://groups.google.com/forum/#!msg/mozilla.dev.platform/RM5O36MZ4x4/FV5Tp9y4EQAJ
  - **Ship: Support XCTO: nosniff for navigations**
    - https://groups.google.com/forum/#!msg/mozilla.dev.platform/nC0DLYQsR5w/etyfo4sDAQAJ
  - **Ship: Event-based form participation**
    - https://groups.google.com/forum/#!msg/mozilla.dev.platform/-VDYiEAWjw4/SspRnY1HAQAJ
  - Ship: line-height returns normal as a resolved value.
    - https://groups.google.com/forum/#!msg/mozilla.dev.platform/8uvGB3BCpl8/ThRSVYZdAgAJ
  - **Ship: CSS properties text-decoration-skip-ink, text-decoration-thickness, and text-underline-offset**
    - https://groups.google.com/forum/#!msg/mozilla.dev.platform/2h1Nlx4_WIU/URQBNSN_BAAJ
  - Prototype: Implement the MathMLElement interface and the corresponding content attributes
    - https://groups.google.com/forum/#!msg/mozilla.dev.platform/ssTytf-pT7k/afVBh9vuAQAJ
  - Prototype: Have window.outerHeight/outerWidth lie and report the innerHeight/innerWidth
    - https://groups.google.com/forum/#!msg/mozilla.dev.platform/qvU_vbvBrsI/bhiwOtPTAQAJ
  - **Unship: TLS 1.0 and TLS 1.1**
    - https://groups.google.com/forum/#!msg/mozilla.dev.platform/8EFRYDR3N1c/gPh6v01ABAAJ
  - Unship: MathML menclose notation "radical"
    - https://groups.google.com/forum/#!msg/mozilla.dev.platform/vwAkuZIEhnY/KALRPR3wAQAJ
  - Unship: MathML alignment attributes
    - https://groups.google.com/forum/#!msg/mozilla.dev.platform/JnJVGTmIwPE/xrido8-zAQAJ
  - Unship SVGZoomAndPan interface
    - https://groups.google.com/forum/#!msg/mozilla.dev.platform/2hEP9p6I2Ws/pNnGfmgwCAAJ
  - **Remove: Fennec**
    - https://groups.google.com/forum/#!msg/mozilla.dev.platform/-qWdNVODVTU/UowVBDckAQAJ
    - 現行の Android 版 Firefox がメンテナンスモードになったのでコードベースから削除
    - 後継の Fenix は 2020 年を予定しているらしい
  - [Intent to change] display: -moz-box elements will no longer be forced to display: block (browser chrome only)
    - https://groups.google.com/forum/#!msg/mozilla.dev.platform/IpRMO1A6uwg/s85OeaXPAAAJ
  - New Web IDL constructor syntax
    - https://groups.google.com/forum/#!msg/mozilla.dev.platform/GqNeIzSN2Io/7xlz4d2CBAAJ
  - **What to do about scroll anchoring?**
    - https://groups.google.com/forum/#!msg/mozilla.dev.platform/66jW_XKCZew/Ushg_p3dBwAJ
    - scroll anchoring is really a mess
    - レイアウトが変わったときの追従
    - 仕様にも問題が多く残っておりこれをどうするかという話
    - WebKit は未実装、Blink は実装、Gecko から消すかどうかという話
  - Implement and Ship:
  - Experiment:
  - Change:
  - Remove:
- Site Compat
  - Non-standard DataTransfer APIs have been removed
    - https://www.fxsitecompat.dev/en-CA/docs/2019/non-standard-datatransfer-apis-have-been-removed/
  - Permission requests can no longer be made while in fullscreen mode
    - https://www.fxsitecompat.dev/en-CA/docs/2019/permission-requests-can-no-longer-be-made-while-in-fullscreen-mode/
  - Firefox 70 Beta and Developer Edition are out!
    - https://www.fxsitecompat.dev/en-CA/blog/2019/firefox-70-beta-and-developer-edition-are-out/
  - ontouchstart, ontouchmove event handlers are now passive by default
    - https://www.fxsitecompat.dev/en-CA/docs/2019/ontouchstart-ontouchmove-event-handlers-are-now-passive-by-default/
  - **EV SSL certificate indicator has been removed from location bar**
    - https://www.fxsitecompat.dev/en-CA/docs/2019/ev-ssl-certificate-indicator-has-been-removed-from-location-bar/
  - **TLS 1.0 and 1.1 are now deprecated**
    - https://www.fxsitecompat.dev/en-CA/docs/2019/tls-1-0-and-1-1-are-now-deprecated/
    - 2020/3 に全メジャーブラウザから消えるから備えよ
- Other
  - These Weeks in Firefox: Issue 63
    - https://blog.nightly.mozilla.org/2019/08/30/these-weeks-in-firefox-issue-63/
  - Debugging WebAssembly Outside of the Browser
    - https://hacks.mozilla.org/2019/09/debugging-webassembly-outside-of-the-browser/
  - Stop video autoplay with Firefox
    - https://blog.mozilla.org/firefox/stop-video-autoplay/
  - Recommended Extensions program-where to find the safest, highest quality extensions for Firefox
    - https://blog.mozilla.org/firefox/firefox-recommended-extensions/
  - Mozilla's Manifest v3 FAQ
    - https://blog.mozilla.org/addons/2019/09/03/mozillas-manifest-v3-faq/
    - Chrome 拡張の Manifest v3 について
    - v3 のようにコンテントブロッカーに影響が出るようなことはしない
  - Firefox 69 new contributors
    - https://blog.mozilla.org/community/2019/08/30/firefox-69-new-contributors/
  - Debugging TypeScript in Firefox DevTools
    - https://hacks.mozilla.org/2019/09/debugging-typescript-in-firefox-devtools/
  - **Caniuse and MDN compatibility data collaboration**
    - https://hacks.mozilla.org/2019/09/caniuse-and-mdn-compat-data-collaboration/
    - Caniuse と MDN がそれぞれ Compatibility Data を持っている
    - ここのスキーマなどに互換性を持たせようという取り組みがスタート
    - ただし、両者の目的や粒度の違いによりデータをマージするわけではない
    - caniuse が MDN にクエリを投げて、反映するなどができるようにする
  - Community Involvement in Recommended Extensions
    - https://blog.mozilla.org/addons/2019/09/25/recommended-extensions-community-involvement/

### Safari 動向

- Stable: 13.0.1
- Updates
  - Safari 13 Release Notes
    - https://developer.apple.com/documentation/safari_release_notes/safari_13_release_notes
    - Added Desktop-class Browsing to Safari for iPad
    - Added opt-in dark mode support for websites in Safari for iOS.
    - Added support for aborting Fetch requests.
    - Updated Safari to prompt the user to change weak passwords when signing into a website.
    - Added support for FIDO2-compliant USB security keys with the Web Authentication standard in Safari on macOS.
    - Added support for Sign in With Apple to Safari and to WKWebView.
    - Added support for the `__Secure-` and `__Host-` cookie prefixes in beta 3.
    - Added support for the Pointer Events API enabling consistent access to mouse, trackpad, touch, and Apple Pencil events.
    - Added support for the Visual Viewport API for adjusting web content to avoid overlays, such as the onscreen keyboard.
    - Removed support for WebSQL.
  - **Release Notes for Safari Technology Preview 91**
    - https://webkit.org/blog/9526/release-notes-for-safari-technology-preview-91/
    - Disabled legacy TLS 1.0 and TLS 1.1 (r249019)
    - Added a public API for unhandled promise rejections (r249058)
    - Added support for hashbang in ESNext (r248826)
    - Implemented optional chaining in ESNext (r248829)
    - Implemented StaticRange constructor (r249079)
    - Changed to avoid looking up the join function each time Array.prototype.toString is called (r248906)
    - Ensured `x?.y ?? z` is fast (r249117)
    - etc
  - **Release Notes for Safari Technology Preview 92**
    - https://webkit.org/blog/9568/release-notes-for-safari-technology-preview-92/
    - **Fixed Math.round() which produced a wrong result for value prior to 0.5 (r249597)**
    - **Made Promise implementation faster (r249509)**
    - Implemented GPUUncapturedErrorEvent (r249539)
    - Implemented SampleLevel(), SampleBias(), and SampleGrad() in WSL (r249453)
    - **Changed to respect EXIF orientations by default when images are rendered (r249364)**
    - Fixed document.fonts.ready resolving too quickly (r249295)
    - Fixed responseXML for XMLHttpRequest in some cases returning null if a valid Content-Type ends with +xml (r249361)
    - Added missing origin check for Service-Worker-Allowed header (r249733)
    - Added support for postMessage buffering between the Service Worker and window (r249629)
    - Dropped support for registration resurrection (r249627)
    - Added support to RTCDataChannel.send(Blob) (r249710)
    - Provided a way to view XML, HTML, and SVG resource responses as a DOM tree (r249451)
    - Fixed jarring white box-shadows in the Overview Timeline View in dark mode (r249655)
    - Fixed children cache to be re-computed if the tab index is removed (r249534)
    - **Disabled TLS 1.0 and TLS 1.1 in WebSockets (r249684)**
  - WebGPU and WSL in Safari
    - https://webkit.org/blog/9528/webgpu-and-wsl-in-safari/
  - **Intelligent Tracking Prevention 2.3**
    - https://webkit.org/blog/9521/intelligent-tracking-prevention-2-3/
    - 2.2 では link-decoration については既存サービスへの影響も考え弱くしていた
    - 具体的には JS 書き込みの Cookie を 24h に
    - 2.3 では、スクリプト制御可能なストレージ全部を 7 日で消すことに
    - Refferer に識別子がある場合もあるので、その場合 eTLD+1 (same site) しか取得できなくなる
    - その他 developer tools などの改善
- Other

### Edge 動向

- Beta:79.0
- Status Updates
- EdgeHTML
- Build Changelog
- Chakra
  - Release ChakraCore v1.11.13 · microsoft/ChakraCore
    - https://github.com/microsoft/ChakraCore/releases/tag/v1.11.13
- Other
  - **Update on removing Flash from Microsoft Edge and Internet Explorer - Microsoft Edge Blog**
    - https://blogs.windows.com/msedgedev/2019/08/30/update-removing-flash-microsoft-edge-internet-explorer/

### WHATWG/W3C 動向

- TPAC
  - TPAC/2019/SessionIdeas
    - https://www.w3.org/wiki/TPAC/2019/SessionIdeas
    - Web Packaging
    - JS Built-In Modules
    - WebTransport status and next steps
    - WebCodecs
    - WebGPU
    - Portals (status and next steps)
    - Input for workers/worklets
    - Privacy Budget
    - Trust Tokens
    - Bullet Chatting
    - UndoManager API
    - What is the Future of W3C
  - Breakout Session
    - https://w3c.github.io/tpac-breakouts/sessions.html
    - JS Built-In Modules
      - https://www.w3.org/2019/09/18-jsbuiltin-minutes.html
    - New Module types: JSON, CSS, HTML
      - https://www.w3.org/2019/09/18-new-modules-minutes.html
    - **Bullet Chatting**
      - https://www.w3.org/2019/09/18-bulletchat-minutes.html
    - Portals
      - https://www.w3.org/2019/09/18-portals-minutes.html
    - Privacy Budget
      - https://www.w3.org/2019/09/18-privacybudget-minutes.html
    - **MiniApps**
      - https://www.w3.org/2019/09/18-miniapp-minutes.html
    - Virtual Scroller
      - https://www.w3.org/2019/09/18-virtual-scroller-minutes.html
    - **WebTransport**
      - https://www.w3.org/2019/09/18-webtransport-minutes.html
    - **WebCodecs**
      - https://www.w3.org/2019/09/18-webcodecs-minutes.html
    - Project Fugu
      - https://www.w3.org/2019/09/18-capable-web-minutes.html
    - Web Packaging
      - https://www.w3.org/2019/09/18-wpack-minutes.html
    - UndoManager API
      - https://www.w3.org/2019/09/18-undomanager-minutes.html
    - JS Built-In Modules
      - https://www.w3.org/2019/09/18-jsbuiltin-minutes.html
  - WICG/admin
    - https://github.com/WICG/admin/issues/78
  - Houdini
    - https://github.com/w3c/css-houdini-drafts/wiki/TPAC-2019
  - WebRTC
    - https://lists.w3.org/Archives/Public/public-webrtc/2019Sep/0040.html
    - https://www.youtube.com/playlist?reload=9&list=PL2UmSIIuYq5sMgpa5xrm65Ix_N3FpML6t
    - 録画が配信されている
  - ServiceWorker
    - https://github.com/w3c/ServiceWorker/issues/1460
    - https://docs.google.com/document/d/1q090ovJ4gd8wSfVtvuoZLMZ51YkiFDsEZ0Jiqi41Iys/edit
  - WebPerf
    - https://www.youtube.com/playlist?list=PLy6IMX9VUO0gIuwCwA5ZICpLkBhJLbtxw
    - 録画が配信されている
  - Web Components
    - https://www.w3.org/2019/09/17-components-minutes.html
    - JSON Modules やその他の Synthetic Modules が一旦仕様から外れる
    - MIME タイプによって挙動が変わるので、import する側でどの形式を読むかを指定しなければセキュリティ上問題があるという指摘
      - HTML, CSS, and JSON modules shouldn't solely rely on MIME type to change parsing behavior · Issue #839 · w3c/webcomponents
      - https://github.com/w3c/webcomponents/issues/839
  - Web and TV IG
    - https://www.w3.org/2011/webtv/wiki/Face_to_face_meeting_during_TPAC_2019
  - **WebAppSec**
    - https://github.com/w3c/webappsec/blob/master/meetings/2019/2019-09-TPAC-agenda.md
    - https://github.com/w3c/webappsec/blob/master/meetings/2019/2019-09-TPAC-minutes.md
    - https://www.w3.org/2011/webappsec/
  - Looking back at TPAC 2019; public release of W3C Strategic Highlights
    - https://www.w3.org/blog/2019/09/looking-back-at-tpac-2019-public-release-of-w3c-strategic-highlights/
  - Blog
    - Project Fugu at W3C TPAC - Thomas Steiner - Medium
      - https://medium.com/@tomayac/project-fugu-at-w3c-tpac-a7b74d0271ec
- Recommendation
- Proposed Recommendation
  - Call for Review: Verifiable Credentials Data Model 1.0 is a W3C Proposed Recommendation
    - https://www.w3.org/blog/news/archives/7927
- Candidate Recommendation
  - Updated Candidate Recommendation for CSS Writing Modes Level 3
    - https://www.w3.org/blog/news/archives/7922
- Working Draft
  - First Public Working Draft: MiniApp Standardization White Paper
    - https://www.w3.org/blog/news/archives/7955
  - First Public Working Draft: WebDriver Level 2
    - https://www.w3.org/blog/news/archives/7951
- First Public Working Draft
  - First Public Working Drafts: Pronunciation
    - https://www.w3.org/blog/news/archives/7934
- Chartering
  - Proposed W3C Charter: Web Authentication Working Group (until 2019-09-30)
    - https://lists.w3.org/Archives/Public/public-new-work/2019Sep/0001.html
  - Proposed W3C Charter: Accessibility Guidelines Working Group (AG WG) (until 2019-10-08)
    - https://lists.w3.org/Archives/Public/public-new-work/2019Sep/0006.html
  - **MiniApps Ecosystem Community Group created**
    - https://lists.w3.org/Archives/Public/public-new-work/2019Sep/0015.html
    - MiniApps は Web 技術ベースのモバイルアプリの仕様
    - ネイティブとのハイブリッドを目指す?
    - https://w3c.github.io/mini-app-white-paper/
  - Bitcoin Community Group created
    - https://lists.w3.org/Archives/Public/public-new-work/2019Sep/0017.html
  - Ad Blocker Community Group Proposed
    - https://lists.w3.org/Archives/Public/public-new-work/2019Sep/0021.html
- Other
  - New Resource: Making Audio and Video Media Accessible
    - https://www.w3.org/blog/news/archives/7939
  - **Intent to Migrate trusted-types to W3C Security WG**
    - https://lists.w3.org/Archives/Public/public-webappsec/2019Sep/0003.html
    - Trusted Types を WICG W3C に移す
    - react/lit-html が取り込み作業をしており、JS community は positive と
    - https://wicg.github.io/trusted-types/dist/spec/
    - https://github.com/facebook/react/pull/16157
    - https://github.com/Polymer/lit-html/pull/970
    - https://github.com/WICG/trusted-types/issues/215
  - **Explainer: IsLoggedIn (in preparation for TPAC)**
    - https://lists.w3.org/Archives/Public/public-webappsec/2019Sep/0004.html
    - 謎だった login API の正体の Explainer
    - login/logout などを明示的にブラウザの API で行う
    - 暗黙的に Cookie などで行われていたステートを宣言的に
    - Password Manager との連携も改善される
    - ステートの期限が明白になりストレージ容量も削減できる
    - etc
  - W3C Strategic Highlights - September 2019
    - https://www.w3.org/2019/09/w3c-highlights/

### TC39 動向

- Meeting
- Proposals Diff
  - https://github.com/tc39/proposals/compare/master@{2019-09-01}...master@{2019-10-01}
  - https://tc39.github.io/beta/
  - 0->1
  - 1->2
  - 2->3
  - 3->4
    - BigInt
  - 4->finished
    - BigInt
- New Proposals
  - dcrousso/JS-Declarations-in-Conditionals
    - https://github.com/dcrousso/JS-Declarations-in-Conditionals
- Other
  - domenic が複数 draft の chanpion から降りた
    - https://github.com/tc39/proposals/commit/276456524d0305a922332ab231aed808d0f7fb5e

### IETF 動向

- RFC
- IETF Last Call
- WG Last Call
- Call for Adoption
- I-D Action
- Draft
  - Deprecating MD5 and SHA-1 signature hashes in TLS 1.2
    - https://tools.ietf.org/html/draft-ietf-tls-md5-sha1-deprecate-00
  - OAuth 2.0 Rich Authorization Requests
    - https://tools.ietf.org/html/draft-lodderstedt-oauth-rar-01
  - RTP Payload Format for Versatile Video Coding (VVC)
    - https://tools.ietf.org/html/draft-zhao-payload-rtp-vvc-00
  - RateLimit Header Fields for HTTP
    - https://tools.ietf.org/html/draft-polli-ratelimit-headers-00
    - リクエスト制限のある API などで返す情報の標準化
    - RateLimit-Limit
    - RateLimit-Remaining
    - RateLimit-Reset
  - T.140 Real-time Text Conversation over WebRTC Data Channels
    - https://tools.ietf.org/html/draft-ietf-mmusic-t140-usage-data-channel-00
  - **Report from the IAB Workshop on Exploring Synergy between Content Aggregation and the Publisher Ecosystem (ESCAPE)**
    - https://tools.ietf.org/html/draft-thomson-escape-report-00
    - ESCAPE の成果を informational として
    - https://tools.ietf.org/html/draft-iab-escape-report-00
    - IAB のドラフトに
  - DNS over HTTPS (DoH) Considerations for Operator Networks
    - https://tools.ietf.org/html/draft-doh-reid-operator-00
  - An HTTPS-based Transport for Configured Subscriptions
    - https://tools.ietf.org/html/draft-ietf-netconf-https-notif-00
  - OAuth 2.0 Pushed Authorization Requests
    - https://tools.ietf.org/html/draft-lodderstedt-oauth-par-00
- Other
  - **Change in HTTPbis chairs from Patrick McManus**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2019JulSep/0272.html
    - patrick と mnot が fastly に入ったため 201810 に Apple の tommy を追加し 3 人にした
    - https://mozaic.fm/episodes/44/monthly-web-201810.html
    - patrick が抜け mnot と tommy の 2 人になる

### セキュリティ動向

- Project Zero: A very deep dive into iOS Exploit chains found in the wild
  - https://googleprojectzero.blogspot.com/2019/08/a-very-deep-dive-into-ios-exploit.html
- Livin' on the Edge: Root Causing Regressions
  - https://textslashplain.com/2019/09/03/livin-on-the-edge-root-causing-regressions/
- Browser Architecture: Web-to-App Communication Overview
  - https://textslashplain.com/2019/08/28/browser-architecture-web-to-app-communication-overview/
- How Castle is Building Codeless Customer Account Protection
  - https://blog.cloudflare.com/castle-building-codeless-customer-account-protection/
  - Castle というセキュリティソリューションの紹介
  - 不穏なアタックなどを検知するらしい
- **EV Jurisdiction of Incorporation**
  - https://groups.google.com/forum/#!topic/mozilla.dev.security.policy/DxtWaeIQKfM
  - EV の発行プロセスを外(コミュニティ)から監視する仕組みの提案
- Let's Encrypt makes certs for almost 30% of web domains! RC4/3DES/TLS 1.0 are still used! Certs for hundreds of years! Analyzing hundreds of millions of SSL handshakes
  - https://www.leebutterman.com/2019/08/05/analyzing-hundreds-of-millions-of-ssl-connections.html
- **(CVE-2019-1030) Microsoft Edge - Universal XSS**
  - https://leucosite.com/Microsoft-Edge-uXSS/
  - 印刷 Preview 内の XSS で Cookie を盗む
- **Release DOMPurify 2.0.0 · cure53/DOMPurify**
  - https://github.com/cure53/DOMPurify/releases/tag/2.0.0
  - TrustedTypes が有効になる
  - しかし立て続けに mXSS のバイパスが見つかってリリースが続いてる模様
- Web-to-App Communication: DirectInvoke
  - https://textslashplain.com/2019/09/25/web-to-app-communication-directinvoke/
  - directinvoke ?

### 周辺動向

- Observability in Live Broadcasts and Quality of Experience
  - https://www.fastly.com/blog/observability-in-live-broadcasts
- Cloudflare's Approach to Research
  - https://blog.cloudflare.com/cloudflares-approach-to-research/
- **Can I email ... Support tables for HTML and CSS in emails**
  - https://www.caniemail.com/
  - メールクライアントの HTML メールのサポートの caniuse
- **Wikipedia's JavaScript initialisation on a budget**
  - https://phabricator.wikimedia.org/phame/live/7/post/175/wikipedia_s_javascript_initialisation_on_a_budget/
  - 1 年かけて Wikipedia の JS 初期ロードを 36KB から 28KB に減らし、1 日 4.3TB の転送を削減
  - TCP 初期ウインドウサイズ 14KB の倍数として budget を設定
  - 未使用機能の検出、不要モジュールの削減、測定と可視化を行い計画的に実施
  - 作業資料や Grafana も公開されている
  - https://docs.google.com/document/d/1SESOADAH9phJTeLo4lqipAjYUMaLpGsQTAUqdgyZb4U/edit
  - https://grafana.wikimedia.org/d/BvWJlaDWk/startup-manifest-size?orgId=1
- Inside the Web Browser's Performance API
  - https://blog.cloudflare.com/browser-performance-api/
  - PerformanceAPI と Cloudflare での集め方
- Introducing Browser Insights
  - https://blog.cloudflare.com/introducing-browser-insights/
- WARP is here (sorry it took so long)
  - https://blog.cloudflare.com/announcing-warp-plus/
- **The Technical Challenges of Building Cloudflare WARP**
  - https://blog.cloudflare.com/warp-technical-challenges/
- When TCP sockets refuse to die
  - https://blog.cloudflare.com/when-tcp-sockets-refuse-to-die/
- **HTTP/3: the past, the present, and the future**
  - https://blog.cloudflare.com/http3-the-past-present-and-future/
  - Cloudflare のエッジが HTTP/3 に対応
  - OSS で Rust 実装の quiche を使用
- Cloudflare Workers Sites
  - https://blog.cloudflare.com/workers-sites/
- Workers Sites: Extending the Workers platform with our own serverless building blocks
  - https://blog.cloudflare.com/extending-the-workers-platform/
- vasanthv/jsonbox: A Free HTTP based JSON storage.
  - https://github.com/vasanthv/jsonbox

### イベント

- 9 月
  - 16-20: W3C TPAC 2019 (Fukuoka)
    - https://www.w3.org/wiki/TPAC/2019
- 10 月
  - 1-3 Agenda for the 72nd meeting of Ecma TC39
    - https://github.com/tc39/agendas/blob/master/2019/10.md
  - 8-10: AMP Contributor Summit 2019
    - https://blog.amp.dev/2019/06/03/save-the-date-amp-contributor-summit-2019/
  - 21-27: MozFest 2019
    - https://www.mozillafestival.org/en/
- 11 月
  - 1: WebKit Contributors Meeting
    - https://lists.webkit.org/pipermail/webkit-dev/2019-September/030790.html
  - 5-6: W3C Workshop on Inclusive Design for Immersive Web Standard
    - https://www.w3.org/2019/08/inclusive-xr-workshop/
  - 11-12: Chrome Dev Summit 2019
    - https://developer.chrome.com/devsummit/
  - 14-15: BlinkOn 11
    - http://bit.ly/blinkon11-faq
  - 30-1: JSConf JP
    - https://www.jsconf.jp
- 12 月
  - 末: Yearly Web
- 1 月
