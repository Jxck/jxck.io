# [monthly-web][mozaic.fm] ep53 Monthly Web 201905

## Info

audio: https://files.mozaic.fm/mozaic-ep53.mp3

published_at
: 2019-05-26

guest
: [@myakura](https://twitter.com/myakura)


## Theme

第 53 回のテーマは 2019 年 5 月の Monthly Web です。


## Show Note


### mozaic bootcamp 2019

- mozaic bootcamp 2019
  - <https://blog.jxck.io/entries/2019-05-12/mozaic-bootcamp-2019.html>
- lmozaic bootcamp に行ってきました - isyumi_net ブログ
  - <https://blog.isyumi.net/entry/2019/05/03/134854>


### Chrome 動向

- Stable: 74
- Google I/O
  - *Web at Google I/O 2019 - YouTube PlayList*
    - <https://www.youtube.com/playlist?list=PLNYkxOF6rcIATmAmz7HcCzongGvQEtx8i>
  - *I/O Web Updates - Slide*
    - <https://docs.google.com/presentation/d/1ogXPs8U3Uxs5sNaXzK3HX6SquP8ZPJCSW6DGBsjUoQw/>
    - LazyLoading [blog](https://blog.jxck.io/entries/2019-05-20/lazyloading.html)
    - Portals
    - SXG
    - Paint Holding
    - Firebase Performance Monitoring for Web
    - New Metrics
      - Layout Stability: どれくらい読み込み中にコンテンツが動いたか
      - Largest Content Paint: 最も大きな画像やテキストが表示されるまでの時間
    - Project Fugu
    - Googlebot to latest chrome
    - Google Fonts Support CSS font-display
    - Trusted Web Activities(TWA)
    - etc, etc, etc
  - *Chromium Blog: Google I/O 2019: What's new with Chrome and the Web*
    - <https://blog.chromium.org/2019/05/google-io-2019-whats-new-with-chrome.html>
- Updates
  - Share files with Web Share
    - <https://developers.google.com/web/updates/2019/05/web-share-files>
  - Deprecations and removals in Chrome 75
    - <https://developers.google.com/web/updates/2019/05/chrome-75-deps-rems>
  - Low-latency rendering with the desynchronized hint
    - <https://developers.google.com/web/updates/2019/05/desynchronized>
  - Chromium Blog: Chrome 75 Beta: low latency canvas contexts, sharing files, and numeric separators
    - <https://blog.chromium.org/2019/05/chrome-75-beta-low-latency-canvas.html>
  - AMP as your web framework
    - <https://blog.amp.dev/2019/05/01/amp-as-your-web-framework/>
  - *Paint Holding - reducing the flash of white on same-origin navigations*
    - <https://developers.google.com/web/updates/2019/05/paint-holding>
    - ページ遷移のときに一度白でペイントしていたのをやめて前の画面を残す
    - FCP まで compositor commit を送られせるなど
  - *Chromium Blog: Improving privacy and security on the web*
    - <https://blog.chromium.org/2019/05/improving-privacy-and-security-on-web.html>
    - SameSiteCookie や Fingerprint 対策など、プライバシー保護を強化していく
  - Official Google Webmaster Central Blog: The new evergreen Googlebot
    - <https://webmasters.googleblog.com/2019/05/the-new-evergreen-googlebot.html>
  - Signed-Exchange: Solving the AMP URLs Display Problem
    - <https://blog.amp.dev/2019/05/15/signed-exchange-solving-the-amp-urls-display-problem/>
  - A year into contributing back lessons learned from AMP to the whole web
    - <https://blog.amp.dev/2019/05/21/contributing-back-lessons-learned-part-1/>
  - Privacy-preserving instant loading for all web content
    - <https://blog.amp.dev/2019/05/22/privacy-preserving-instant-loading-for-all-web-content/>
  - The Chromium Chronicle: Fighting Test Flakiness
    - <https://developers.google.com/web/updates/2019/05/chromium-chronicle-2>
- Intents
  - *Ship: Media Queries: prefers-color-scheme feature*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/sLK1cLgvieg/8bvIdznFAAAJ>
  - Ship: IndexedDB transaction explicit commit API call
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/_-WBHYZ-rBk/yltzslk4DQAJ>
  - Ship: Add formatRange / formatRangeToParts to DateTimeFormat
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Nh-jMn8L8fQ/GQN6wQQVBQAJ>
  - Ship: pointerrawupdate
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/mUW58VMIrTM/gIotA4HwBAAJ>
  - Ship: changePaymentMethod() and payment method change event
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/rNSlkbO5utU/dOQJLHxUAwAJ>
  - Ship: PaymentResponse.retry() and payerdetailchange event
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/JwSN1yEVvnk/9EDQpTZ4BAAJ>
  - *Ship: Form-associated custom elements*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/0w_Z-9_kSNs/QV6ChIapAwAJ>
  - *Ship: 'formdata' event*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/ONvzLM5fPvk/FZDswIOpAwAJ>
  - Ship: Adding ImageBitmapRenderingContext to OffscreenCanvas
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/ufFQ4OvtqxQ/Ib0n6M5nAwAJ>
  - *Ship: Feature Policy 'focus-without-user-activation'*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/pnUiTrLHHmw/CDN1s3F1BQAJ>
    - JS で `focus()` するのを防ぐ FP
- Implement and Ship: IDBCursor request
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/o6mUiI09BUc/25khjTHYAAAJ>
- Implement and Ship: Animation.pending
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Gstf0GA7cbg/711ymCKKAAAJ>
- Implement and Ship: Escape key is not a user activation
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/dFAIZHeNpSs/4WO6f-tcDQAJ>
- Implement and Ship: Scroll Snap Stop
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/bkUwigYHJDM/Bzvm8tkHAgAJ>
- Implement and Ship: Redact address in PaymentRequest.onshippingaddresschange event
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/69dw-4Myc_A/cZRnDjvtBAAJ>
- Implement and Ship: Animation.updatePlaybackRate
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/lTYK1HT47Qk/hmwmGm1ZBAAJ>
- Implement and Ship: RTCRtpSender.setStreams()
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/g5Grj_VtF8Q/pEaGHWVnBAAJ>
- Implement and ship: createOffer/createAnswer constraint to enable RTCPeerConnection simulcast
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/phMAiUN3nco/-6rsfDv8AgAJ>
  - Implement and Ship: Enter Key Hint
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Hfe5xktjSV8/Re-SMF3wAwAJ>
  - *Implement and Ship: form.requestSubmit()*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/CxelaeahNho/aC6Zp8KvAwAJ>
    - `<form>` の `submit()` と `<button type=submit>` を `click()` したのでは挙動が違う
    - interactive validation, submit events etc
    - `<button type=submit>` を作って `click()` したかのように挙動させる API
- Implement and Ship: Entering fullscreen consumes user activation
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Y58tbs-TSgE/MDg7F2uRBQAJ>
- Implement and Ship: Synthetic Modules
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/0UWEnR_rV9E/SOM8xOgfBQAJ>
- Implement: IFrame execution/freezing feature policy
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/VytOh5dHdDo/THj8cgZeDQAJ>
- *Implement: Periodic Background Sync*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/61yC4_xbZRA/mpB5rMBTDwAJ>
    - Background Sync を定期実行するための API
    - 時間設定が厳守されるわけではなく、ネットワーク状況などに応じて
- Implement: JS Self-Profiling API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/cl_WCx9OEcg/9b-6_7DPDAAJ>
- *Implement: Picture-in-Picture for arbitrary content*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/uK0hyACy_fg/XXFsm_4kDAAJ>
    - PinP で Video 以外に任意のコンテンツを再生できるように
- *Implement (meta): Bundled HTTP Exchanges*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/hVszlf4l2_E/1K_ZgQ4lBQAJ>
    - Chrome Tokyo チームから
- Implement: High-risk insecure download blocking in secure contexts
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/mALJa0JM13I/-jxMlOyrBAAJ>
- Implement: "numberingSystem" option for Intl.NumberFormat / "calendar" and "numberingSystem" option for Intl.DateTimeFormat
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/HFOWIjSBKWQ/GkoCkNCrAQAJ>
- Implement: Pause Worklets and Dedicated Workers Execution on document freeze
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/KwDF6Eavfek/Qb48J5ceAwAJ>
- Implement: CSS Color Adjust: color-scheme property
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/xXVJlqlDL_k/pxwluzwSAwAJ>
- Implement: Intl.DisplayNames API Proposal
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/muRQBwyzzPw/FgdwgcbnAgAJ>
  - Implement: Intl.NumberFormat Unified API Proposal
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/q3U7sPOG1uo/M7XZU7fxAwAJ>
  - Implement: Add dayPeriod option for Intl.DateTimeFormat
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/wn5zah2EYXg/kvIhiOPqBQAJ>
  - Implement: Add quarter option for Intl.DateTimeFormat
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/t5vlp94AI5g/va9WtczoBQAJ>
- Extend Origin Trial: HrefTranslate HTMLAnchor attribute
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/LpE_bzcSv5Y/mLEg7wMLDAAJ>
- Extend Origin Trial: Badging API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/VqoLPVSXE4g/7N5veAaeBAAJ>
  - Experiment: Origin Trial: WebXR Device API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/nlMUxXEqMgg/fmiVVcKqAwAJ>
  - QUIC API Original Trial extended to support datagrams
    - <https://lists.w3.org/Archives/Public/public-ortc/2019May/0000.html>
- Change:
- Unship:
- Remove:
- Deprecate and Remove: "_current" special window name
  - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/gVAExzsgjXk/l6yONONQAwAJ>
- PSA: History Manipulation Intervention
  - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/T8d4_BRb2xQ/WSdOiOFcBAAJ>
- PSA: Media Capabilities enabled in Workers
  - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/AJCkCrsauAk/sUpNU8ylAQAJ>
- PSA: blink::UseCounter changes
  - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/j7007MhubK4/c1Wm-5Z3AwAJ>
- *PSA: Turning on LayoutNG*
  - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/88RzfOIZFi8/sB8BmhblBQAJ>
  - LayoutNG が Chrome 76 から有効に
  - Float, Writing Mode, RTL, Text Layout など様々が更新される
  - ページも更新された
  - <https://www.chromium.org/blink/layoutng>
  - <https://docs.google.com/document/d/1uxbDh4uONFQOiGuiumlJBLGgO4KDWB8ZEkp7Rd47fw4>
- FYI: LayoutNG enabled on clusterfuzz & perf bots
  - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/hfJa8eEvjb8/EQgF6BgiAwAJ>
- Team Weekly Snippet
  - Loading (blink-dev)
  - Storage (blink-dev)
  - Platform Architecture (blink-dev)
  - Layout (layout-dev)
- v8
  - v8 blog
    - <https://v8project.blogspot.jp/>
- Other
  - A year into contributing back lessons learned from AMP to the whole web
    - <https://blog.amp.dev/2019/05/21/contributing-back-lessons-learned-part-1/>
  - Privacy-preserving instant loading for all web content
    - <https://blog.amp.dev/2019/05/22/privacy-preserving-instant-loading-for-all-web-content/>
  - *OOR-CORS is enabled by default on HEAD*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/network-service-dev/tM2Yba-G8nU/I7PUAnU5AgAJ>
    - Out Of Renderer CORS がデフォルトに
  - *Google Developers Blog: Flutter: a Portable UI Framework for Mobile, Web, Embedded, and Desktop*
    - <https://developers.googleblog.com/2019/05/Flutter-io19.html>
    - Flutter for web


### Firefox 動向

- Stable: 67
- Updates
  - Firefox 67.0, See All New Features, Updates and Fixes
    - <https://www.mozilla.org/en-US/firefox/67.0/releasenotes/>
  - *Latest Firefox Release is Faster than Ever*
    - <https://blog.mozilla.org/blog/2019/05/21/latest-firefox-release-is-faster-than-ever/>
    - `setTimeout()` のプライオリティ調整など
    - cryptomining, fingerprinting のブロックが設定画面に追加
  - How to block fingerprinting with Firefox
    - <https://blog.mozilla.org/firefox/how-to-block-fingerprinting-with-firefox/>
  - Let Firefox help you block cryptominers from your computer
    - <https://blog.mozilla.org/firefox/block-cryptominers-with-firefox/>
  - Firefox 67: Dark Mode CSS, WebRender, and more
    - <https://hacks.mozilla.org/2019/05/firefox-67-dark-mode-css-webrender/>
  - *Firefox 67 for developers*
    - <https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/67>
    - prefers-color-scheme
    - String.matchAll()
    - Dynamic import()
    - hashbang grammar
    - CSS revert keyword
    - word-break: break-word
  - These Weeks in Firefox: Issue 58
    - <https://blog.nightly.mozilla.org/2019/04/26/these-weeks-in-firefox-issue-58/>
  - These Weeks in Firefox: Issue 59
    - <https://blog.nightly.mozilla.org/2019/05/22/these-weeks-in-firefox-issue-59/>
    - 通知プロンプトの自動ブロックが Beta にも展開されたとの情報
  - *TLS 1.0 and 1.1 Removal Update*
    - <https://hacks.mozilla.org/2019/05/tls-1-0-and-1-1-removal-update/>
    - Firefox 68 からコンソールに警告がでる
    - 10 月には Nightly で無効にする予定
  - *Faster smarter JavaScript debugging in Firefox DevTools*
    - <https://hacks.mozilla.org/2019/05/faster-smarter-javascript-debugging-in-firefox/>
    - Firefox 67 の Firefox DevTools の機能向上について
    - 高速化、オーバーヘッド削減、ソースマップのサポート向上
    - column breakpoints
    - logpoints
  - Graphics Team ships WebRender MVP!
    - <https://mozillagfx.wordpress.com/2019/05/21/graphics-team-ships-webrender-mvp/>
    - Firefox 67 で Windows 10 ＋ NVIDIA なデスクトップで WebRender が有効に
  - Password Manager Improvements in Firefox 67
    - <https://matthew.noorenberghe.com/blog/2019/05/password-manager-improvements-firefox-67>
  - *Firefox 67: Dark Mode CSS, WebRender, and more*
    - <https://hacks.mozilla.org/2019/05/firefox-67-dark-mode-css-webrender/>
    - prefers-color-scheme
    - Enhanced Privacy Controls
    - Support for legacy FIDO U2F APIs
    - AV1 on Windows, Linux, and macOS
    - `String.prototype.matchAll()`
    - Dynamic Imports
  - Latest Firefox Release is Faster than Ever
    - <https://blog.mozilla.org/blog/2019/05/21/latest-firefox-release-is-faster-than-ever/>
  - How to block fingerprinting with Firefox
    - <https://blog.mozilla.org/firefox/how-to-block-fingerprinting-with-firefox/>
    - Fingerprint の block などのオプションが追加
  - Save and update passwords in Private Browsing with Firefox
    - <https://blog.mozilla.org/firefox/save-passwords-in-private-browsing-firefox/>
- Intents
  - Ship: Visual Viewport API on Android
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/Mkw_Toh9Siw/CHiWMZmAAAAJ>
  - Implement and Ship: CSSStyleSheet.rules, CSSStyleSheet.removeRule, CSSStyleSheet.addRule
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/64Hwq_uOgCg/UGoThzV9AAAJ>
  - Implement: CSS line-break property
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/NSpFyh3WBN4/1H1bGmROAQAJ>
  - Implement: Automatically removing replaced filling Web Animations
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/fx-lr1RAOI0/OqHZdo7cAAAJ>
  - Unship: typeMustMatch attribute on elements
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/6dOIeUcHY6g/9aQhmBcxAQAJ>
  - Unship: hasFeature() method on some SVG elements
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/WLNCdEM1x44/P500BuIbAQAJ>
  - Implement: Cookie SameSite=lax by default and SameSite=none only if secure
    - <https://groups.google.com/d/topic/mozilla.dev.platform/nx2uP0CzA9k/discussion>
- Site Compat
  - Part of Shadow DOM v0 API has been removed
    - <https://www.fxsitecompat.com/en-CA/docs/2019/part-of-shadow-dom-v0-api-has-been-removed/>
  - window.localStorage no longer throws SecurityError when blocked due to privacy settings
    - <https://www.fxsitecompat.com/en-CA/docs/2019/window-localstorage-no-longer-throws-securityerror-when-blocked-due-to-privacy-settings/>
  - Notifications API can no longer be used on insecure sites
    - <https://www.fxsitecompat.com/en-CA/docs/2019/notifications-api-can-no-longer-be-used-on-insecure-sites/>
  - Legacy Touch Events API is now disabled on desktop
    - <https://www.fxsitecompat.com/en-CA/docs/2019/legacy-touch-events-api-is-now-disabled-on-desktop/>
  - CSS animation and transition events are now fired on disabled form widgets
    - <https://www.fxsitecompat.com/en-CA/docs/2019/css-animation-and-transition-events-are-now-fired-on-disabled-form-widgets/>
- Other
  - What we do when things go wrong
    - <https://blog.mozilla.org/blog/2019/05/09/what-we-do-when-things-go-wrong/>
  - *Technical Details on the Recent Firefox Add-on Outage*
    - <https://hacks.mozilla.org/2019/05/technical-details-on-the-recent-firefox-add-on-outage/>
    - 拡張の中間証明書が失効したため拡張が一時使えない状況に
    - 2019 年 5 月 4 日前後から発生している Firefox のアドオン無効化問題の詳細な解説 - ククログ(2019-05-07)
    - <https://www.clear-code.com/blog/2019/5/7.html>
  - *Owning it: browser compatibility data and open source governance*
    - <https://hacks.mozilla.org/2019/05/browser-compatibility-data-and-open-source-governance/>
    - BCD のこれまで
    - ガバナンス体制を強化した
    - 2019 年はデータを完全なものにしたいという野望も持っていると
  - *Remove browser and OS architecture from Firefox's User-Agent string?*
    - <https://groups.google.com/d/topic/mozilla.dev.platform/vEMIqgnMxRw/discussion>
    - UA 文字列から OS のアーキテクチャなど(`WOW64` とか)を削ろうという提案
    - ソフトウェアのダウンロードページなどに影響が出ないかなどの疑問が出ている
  - *Become A Beta Testing BugHunter*
    - <https://events.mozilla.org/becomeabetatestingbughunter>
    - Fenix の β テスト


### Safari 動向

- Stable: 12.1
- Updates
  - *Release Notes for Safari Technology Preview 81*
    - <https://webkit.org/blog/8834/release-notes-for-safari-technology-preview-81/>
    - `supported-color-scheme` が `color-scheme` に
    - `requestAnimationFrame()` が次のフレームの前に実行されるように
    - Ad Click Attribution(後述)
    -    * *Release Notes for Safari Technology Preview 82*
    - <https://webkit.org/blog/8921/release-notes-for-safari-technology-preview-82/>
    - Fetch API の keep-alive が有効に
- Other
  - Dark Mode Support in WebKit
    - <https://webkit.org/blog/8840/dark-mode-support-in-webkit/>
  - Dark Mode in Web Inspector
    - <https://webkit.org/blog/8892/dark-mode-in-web-inspector/>
  - Debugging Media in Web Inspector
    - <https://webkit.org/blog/8923/debugging-media-in-web-inspector/>
  - *Privacy Preserving Ad Click Attribution For the Web*
    - <https://webkit.org/blog/8943/privacy-preserving-ad-click-attribution-for-the-web/>
    - 広告のコンバージョンを測る Cookie を無効にしたい
    - かわりに `adcampaignid` と `addestination` 属性を a 要素に追加
    - id には 64 までの整数のみ許可する模様
    - コンバージョン結果は 24~48h の間に wellknown uri に post される
    - `/.well-known/ad-click-attribution/`
    - そして Opt-Out 可能に


### Edge 動向

- *MS Build*
  - <https://www.microsoft.com/en-us/build>
  - Microsoft Edge with Internet Explorer Mode
    - <https://mybuild.techcommunity.microsoft.com/sessions/77794>
  - Moving the web forward with Microsoft Edge
    - <https://mybuild.techcommunity.microsoft.com/sessions/77013>
  - State of the browser: Microsoft Edge
    - <https://mybuild.techcommunity.microsoft.com/sessions/77006>
  - Microsoft Edge and Chromium: A rising tide lifts all boats
    - <https://mybuild.techcommunity.microsoft.com/sessions/77295>
  - Building WebAssembly apps with Microsoft's stack
    - <https://mybuild.techcommunity.microsoft.com/sessions/77176?source=sessions>
- Stable: Edge 42 / EdgeHTML 17 (Preview 76)
  - Introducing the first Microsoft Edge preview builds for macOS
    - <https://blogs.windows.com/msedgedev/2019/05/20/microsoft-edge-macos-canary-preview/>
- Status Updates
  - <https://github.com/MicrosoftEdge/Status/compare/production@{2019-05-01}...production@{2019-06-01}>
  - <https://social.msdn.microsoft.com/Forums/ja-JP/home?forum=edgeiesupportteamja>
- EdgeHTML
  - <https://aka.ms/devguide_edgehtml_18>
  - <https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/>
- Build Changelog
  - <https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/>
- Chakra
  - Release ChakraCore v1.11.9 · microsoft/ChakraCore
    - <https://github.com/microsoft/ChakraCore/releases/tag/v1.11.9>
- Other
  - Developer Tools UI updates for Microsoft Edge Insiders
    - <https://blogs.windows.com/msedgedev/2019/04/26/edge-insiders-devtools-chromium-dark-theme/>
  - Microsoft Edge - All the news from Build 2019
    - <https://blogs.windows.com/msedgedev/2019/05/06/edge-chromium-build-2019-pwa-ie-mode-devtools/>
  - Inside Microsoft's surprise decision to work with Google on its Edge browser
    - <https://www.theverge.com/2019/5/6/18527550/microsoft-chromium-edge-google-history-collaboration>
    - Edge を Chromium ベースにする決断をしたときのインタビュー
  - <https://social.msdn.microsoft.com/Forums/ja-JP/home?forum=edgeiesupportteamja>
  - <https://developer.microsoft.com/en-us/microsoft-edge/platform/>


### WHATWG/W3C 動向

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
  - W3C Invites Implementations of CSS Easing Functions Level 1
    - <https://www.w3.org/blog/news/archives/7735>
  - W3C Invites Implementations of CSS Containment Module Level 1
    - <https://www.w3.org/blog/news/archives/7731>
  - W3C Invites Implementations of Trace Context
    - <https://www.w3.org/blog/news/archives/7741>
  - W3C Invites Implementations of WoT Thing Description and WoT Architecture
    - <https://www.w3.org/blog/news/archives/7745>
- Working Draft
- First Public Working Draft
  - First Public Working Draft: CSS Color Adjust Module Level 1
    - <https://www.w3.org/blog/news/archives/7750>
- Chartering
  - Chemistry for the Web and Publishing Community Group created
    - <https://lists.w3.org/Archives/Public/public-new-work/2019May/0002.html>
  - Web Applications Working Group Charter Approved; Call for Participation
    - <https://lists.w3.org/Archives/Public/public-new-work/2019May/0001.html>
  - Web & Networks Interest Group Charter Approved; Call for Participation
    - <https://lists.w3.org/Archives/Public/public-new-work/2019May/0003.html>
- Other
  - *Privacy Preserving Ad Click Attribution*
    - <https://wicg.github.io/ad-click-attribution/index.html>
    - fingerprinting 避けつつ、クリック元を伝えるためのしくみ
    - 現時点の提案は `adcampaignid` と `addestination` 属性を a 要素に追加する
  - *JSON module support*
    - <https://github.com/whatwg/html/commit/db03474b8b87aab3454ff7d5c1f4a5f044b4395c>
    - `import` 文で JSON を読み込めるように
  - Introduce form-associated custom elements
    - <https://github.com/whatwg/html/commit/ab7344318eed117b94f094b1c564e60527d2257f>
  - *Add form.requestSubmit()*
    - <https://github.com/whatwg/html/commit/e0742f8fdf3b119fdabdcad01d2ebfef1d7a2262>
    - submit ボタンを押した時の挙動(バリデーション、 `submit` イベント発火)と同様のメソッド
  - Define button layout
    - <https://github.com/whatwg/html/commit/6780c22fccb41f5d84aa079d2644c79b1acdc5eb>
    - ボタン周りのレイアウトが厳密に
  - WebComponents F2F Spring 2019
    - <https://github.com/w3c/webcomponents/issues/802>
  - tkent-google/std-switch
    - <https://github.com/tkent-google/std-switch>
    - スイッチコントロールを標準コンポーネント化する試み


### TC39 動向

- Proposals Diff[a]
  - <https://github.com/tc39/proposals/compare/master@{2019-05-01}...master@{2019-06-01}>
  - <https://tc39.github.io/beta/>
  - 0->1
  - 1->2
  - 2->3
  - 3->4
- New Proposals
- Other


### IETF 動向

- IETF
- RFC
  - *RFC 8594 - The Sunset HTTP Header Field*
    - <https://tools.ietf.org/html/rfc8594>
    - サービスが落ちる時間を前もって知らせるヘッダ
  - *RFC 8615 - Well-Known Uniform Resource Identifiers (URIs)*
    - <https://tools.ietf.org/html/rfc8615>
    - "/.well-known/" のこと
    - <https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml>
  - *RFC 8547 - TCP-ENO: Encryption Negotiation Option*
    - <https://tools.ietf.org/html/rfc8547>
    - TCP のネゴシエーションのなかで暗号化ハンドシェークする手法?
  - *RFC 8548 - Cryptographic Protection of TCP Streams (tcpcrypt)*
    - <https://tools.ietf.org/html/rfc8548>
    - TCP-ENO と組み合わせる暗号化手法?
- IETF Last Call
- WG Last Call
- Call for Adoption
- I-D Action
- Draft
  - *The WebTransport Protocol Framework*
    - <https://tools.ietf.org/html/draft-vvv-webtransport-overview-00>
    - WS っぽい API で通信できるようにしたい
    - 多重化、再送なしなども含む
    - Client-Server で ICE なし
    - 今は QUIC や HTTP/3 など
  - WebTransport over HTTP/3
    - <https://tools.ietf.org/html/draft-vvv-webtransport-http3-00>
  - WebTransport over QUIC
    - <https://tools.ietf.org/html/draft-vvv-webtransport-quic-00>
  - The Devil is in the Deployment
    - <https://tools.ietf.org/html/draft-hallambaker-iab-deployment-00>
  - Link relationship types for authentication
    - <https://tools.ietf.org/html/draft-pot-authentication-link-00>
  - HTTP-client suggested Push Preference
    - <https://tools.ietf.org/html/draft-pot-prefer-push-01>
  - JSCalendar: Converting from and to iCalendar
    - <https://tools.ietf.org/html/draft-ietf-calext-jscalendar-icalendar-00>
  - Using NETCONF over QUIC connection
    - <https://tools.ietf.org/html/draft-dai-quic-netconf-00>
  - Changes in the Internet Threat Model
    - <https://tools.ietf.org/html/draft-arkko-arch-internet-threat-model-00>
  - DNS Resolver Information Self-publication
    - <https://tools.ietf.org/html/draft-sah-resolver-information-00>
  - Terminology for DNS Transports and Location
    - <https://tools.ietf.org/html/draft-hoffman-dns-terminology-ter-01>
  - JSON Schema Language
    - <https://tools.ietf.org/html/draft-json-schema-language-00>
  - The Proxy-Status HTTP Header Field
    - <https://tools.ietf.org/html/draft-ietf-httpbis-proxy-status-00>
  - Public Key Authenticated Encryption for JOSE: ECDH-1PU
    - <https://tools.ietf.org/html/draft-madden-jose-ecdh-1pu-00>
  - Change Status of RFC 2675 to Historic
    - <https://tools.ietf.org/html/draft-jones-6man-historic-rfc2675-00>
  - Process for Handling Non-Major Revisions to Existing RFCs
    - <https://tools.ietf.org/html/draft-roach-bis-documents-00>
  - *Incrementally Better Cookies*
    - <https://tools.ietf.org/html/draft-west-cookie-incrementalism-00>
    - other 参照
  - *First-Party Sets and SameSite Cookies*
    - <https://tools.ietf.org/html/draft-west-cookie-samesite-firstparty-01>
  - Importing External PSKs for TLS
    - <https://tools.ietf.org/html/draft-ietf-tls-external-psk-importer-00>
  - Using TLS 1.3 with HTTP/2
    - <https://tools.ietf.org/html/draft-ietf-httpbis-http2-tls13-00>
  - Use of the Walnut Digital Signature Algorithm with CBOR Object Signing and Encryption (COSE)
    - <https://tools.ietf.org/html/draft-atkins-suit-cose-walnutdsa-00>
  - ACME Overview
    - <https://tools.ietf.org/html/draft-moriarty-acme-overview-00>
  - ACME Integrations
    - <https://tools.ietf.org/html/draft-friel-acme-integrations-00>
  - Transactional Authorization
    - <https://tools.ietf.org/html/draft-richer-transactional-authz-00>
  - Network-Based Website Fingerprinting
    - <https://tools.ietf.org/html/draft-wood-privsec-wfattacks-00>
  - Updated Recall Procedures for IETF Leadership
    - <https://tools.ietf.org/html/draft-rescorla-istar-recall-00>
- Other
  - *Incremental improvements to cookies. from Mike West*
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2019AprJun/0125.html>
    - <https://mikewest.github.io/cookie-incrementalism/draft-west-cookie-incrementalism.html>
    - [blog](https://blog.jxck.io/entries/2018-10-26/same-site-cookie.html)
    - Cookie を徐々に改善していく話
    - まずは SameSite=Lax をデフォルトに
    - SameSite=None にするには Secure を強制
  - SameSite cookies explained
    - <https://web.dev/samesite-cookies-explained/>


### セキュリティ動向

- *日本ハッカー協会セミナー「不正指令電磁的記録罪の傾向と対策」*
  - <https://www.youtube.com/watch?v=umYIqISRIbg>
  - <https://www.hacker.or.jp/regist/>
  - 先月紹介した勉強会のビデオ
  - ポスト「意図しない逮捕」時代に Web エンジニアが見ておきたい話
- *Google Online Security Blog: New research: How effective is basic account hygiene at preventing hijacking*
  - <https://security.googleblog.com/2019/05/new-research-how-effective-is-basic.html>
  - 2FA の各手法ががアカウント乗っ取りにどれくらい有効なのかリサーチ
  - セキュリティキーやオンスクリーンプロンプトはかなりブロックできる
  - SMS はまあまあ
- Report from the curl bounty program
  - <https://daniel.haxx.se/blog/2019/05/22/report-from-the-curl-bounty-program/>
  - curl が Hackerone で脆弱性を集めている
  - すでに 2 件来ている
- *Abusing jQuery for CSS powered timing attacks*
  - <https://portswigger.net/blog/abusing-jquery-for-css-powered-timing-attacks>
  - CSS selector で Timing Attack


### 周辺動向

- kkuchta/css-only-chat: A truly monstrous async web chat using no JS whatsoever on the frontend
  - <https://github.com/kkuchta/css-only-chat>
  - CSS だけでチャット
  - chunked encoding で途中まで HTML を返しておく
  - ボタンの :active で background-image をロードする
  - その URL で押された文字を判定しそれを入れた HTML の chunk をまた返す
  - 返された chunk でそこまでに表示されたメッセージを display: none する
  - JS はいらないがサーバで頑張ってる
- *AV1 リアルタイムハードウェアエンコーダを開発しました - dwango on GitHub*
  - <https://dwango.github.io/articles/av1hwencoder/>
- *Fastly CTO に聞く、同社が WebAssembly 実行環境の「Lucet」をエッジコンピューティング環境として開発している理由とは? - Publickey*
  - <https://www.publickey1.jp/blog/19/fastly_ctowebassemblylucet.html>
- WASI の標準化: WebAssembly をウェブの外で使うためのシステムインターフェース (翻訳)
  - <https://inzkyk.github.io/mozilla_hacks/wasi/>
- Lucet's performance and lifecycle
  - <https://www.fastly.com/blog/lucet-performance-and-lifecycle>
- *A Conspiracy To Kill IE6*
  - <https://blog.chriszacharias.com/a-conspiracy-to-kill-ie6>
  - 元 YouTube エンジニアによる YouTube が IE6 サポートを打ち切るための策略についての回顧録
  - IE6 のサポートを段階的に打ち切るバナーを表示
  - 買収前の古い YouTube 社員によって作られた "OldTuber" という、 Google のインフラチェックをバイパスする権限を悪用した
  - バナーを見た Google Docs のエンジニアもそれを理由に同様のバナーを表示
- NGINX structural enhancements for HTTP/2 performance
  - <https://blog.cloudflare.com/nginx-structural-enhancements-for-http-2-performance/>
- Faster script loading with BinaryAST?
  - <https://blog.cloudflare.com/binary-ast/>
- *Better HTTP/2 Prioritization for a Faster Web*
  - <https://blog.cloudflare.com/better-http-2-prioritization-for-a-faster-web/>
- WebAssembly at eBay: A Real-World Use Case
  - <https://www.ebayinc.com/stories/blogs/tech/webassembly-at-ebay-a-real-world-use-case/>


### イベント

- 5 月
  - 6-8: MS Build
    - <https://www.microsoft.com/en-us/build>
  - 7-9: Google I/O
    - <https://events.google.com/io/transmission>
  - 29-30: de:code 2019
    - <https://www.microsoft.com/ja-jp/events/decode/2019/default.aspx>
- 6 月
  - 1-2: JSConf EU
    - <https://2019.jsconf.eu/>
  - 3-7: WWDC
    - <https://developer.apple.com/wwdc19/>
  - TC39 Meeting
    - <https://github.com/tc39/agendas/blob/master/2019/06.md>
- 7 月
  - 20-26: IETF 105 Montreal
    - <https://ietf.org/how/meetings/105/>
- 8 月
- 9 月
  - 16-20: W3C TPAC 2019 (Fukuoka)
    - <https://www.w3.org/wiki/TPAC/2019>
- 10 月
- 11 月
  - 11-12: Chrome Dev Summit 2019
    - <https://developer.chrome.com/devsummit/>
- 12 月
