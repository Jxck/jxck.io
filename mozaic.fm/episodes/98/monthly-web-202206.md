---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep98.mp3
published_at: 2022-07-04
guest: [@myakura](https://twitter.com/myakura)
---

# ep98 Monthly Web 202206

## Theme

第 98 回のテーマは 2022 年 6 月の Monthly Web です。

## Show Note

### Chrome 動向

#### Stable: 103

#### Updates

- **New in Chrome 102 - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-chrome-102/
  - File Handling API
  - The inert property
  - Navigation API
- **New in Chrome 103 - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-chrome-103/
  - HTTP 103 status code 103 - early hints
  - Local Font Access API
  - Easier Timeouts with `AbortSignal.timeout()`
- **What's New In DevTools (Chrome 103) - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-devtools-103/
  - Capture double-click and right-click events in the Recorder panel
  - New timespan and snapshot mode in the Lighthouse panel
  - Performance Insights updates
  - Improved zoom control in the Performance Insights panel
  - Confirm to delete a performance recording
  - Reorder panes in the Elements panel
  - Picking a color outside of the browser
  - Improved inline value preview during debugging
  - Support large blobs for virtual authenticators
  - New keyboard shortcuts in the Sources panel
  - Sourcemaps improvements
- **New syntax for range media queries in Chrome 104 - Chrome Developers**
  - https://developer.chrome.com/en/blog/media-query-range-syntax/
- **Chromium Blog: Chrome 104 Beta: New Media Query Syntax, Region Capture, and More**
  - https://blog.chromium.org/2022/06/chrome-104-beta-new-media-query-syntax.html
  - Origin Trials
    - New Origin Trials
      - Focusgroup
      - Opt Out of Credit Card Storage
      - Shared Element Transitions
    - Completed Origin Trials
      - Speculation Rules
      - Subresource Loading with Web Bundles
      - Window Controls Overlay for Installed Desktop Web Apps
  - Other Features in this Release
    - Cookie Expires/Max-Age Attribute Upper Limit
    - CSS object-view-box
    - Fullscreen Capability Delegation
    - Multi-Screen Window Placement: Fullscreen Companion Window
    - Permissions Policy for Web Bluetooth API
    - visual-box on overflow-clip-margin
    - Web Custom Formats for Async Clipboard API
      - https://github.com/w3c/editing/blob/gh-pages/docs/clipboard-pickling/explainer.md#custom-format-read
      - `const custom_markup = await (await clipboardItem.getType("web text/custom")).text()`
    - WebGL Canvas Color Management
  - Deprecations, and Removals
    - Block Third-Party Contexts Navigating to Filesystem URLs
    - Remove Non-Standard Client Hint Mode
    - Remove U2F API (Cryptotoken)
- Deprecations and removals in Chrome 104 - Chrome Developers
  - https://developer.chrome.com/en/blog/deps-rems-104/
  - Block third-party contexts navigating to filesystem URLs
  - Remove non-standard client hint mode
  - Remove U2F API (cryptotoken)

#### Intents

- Ship: DisplayMediaStreamConstraints.surfaceSwitching
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YJ0FmnFCKY0
- **Ship: `navigateEvent.intercept()`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jyWqjAEv5LU
- Ship: Picture-in-Picture (Android)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jXkQiIVpxr8
- Ship: Writable directory prompts for the File System Access API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gvll5HyR5ps
- Ship: Custom Highlight API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pxgVrAzMfyk
- Ship: MathML
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/n4zf_3FWmAA
- **Ship: `import.meta.resolve()`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZVODFsnIf74
  - 相対パスを渡すとコンテキストに応じて絶対パスに解決する
- Ship: Viewport-height client hint
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/17Z300KxrQM
- Prototype & Ship: Syntax changes to markup based Client Hints delegation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cGOjmfOamsE
- Implement & Ship: WebUSB Interface Class Filtering
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LZXocaeCwDw
- Prototype: DisplayMediaStreamConstraints.surfaceSwitching
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2wBykF4dgz8
- Prototype: CSS Color Level 4
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tr4efbeV4PM
- **Prototype: CSS :lang pseudo class level 4**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EPvTLPs2yws
- **Prototype: Background Blur API.**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3ke9hgaREwM
  - ビデオ会議などで映像の人物の背景をぼかす API
- Prototype: CSS Overflow for replaced elements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iCbr1QLRLPw
- **Prototype: CSS Trigonometric functions**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-c9p-Sq_gWg
  - CSS で三角関数
- Prototype: Gamepad API Trigger-Rumble Extension
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ncvmDRl0AzM
- Prototype: Implement requestPermission() for DeviceOrientationEvent and DeviceMotionEvent
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/j7sGtCBGaxA
- Prototype: WebHID in Extension Service Workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/U1B81QRAQ34
- Prototype: Gamepad API vibration on Android 12+
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wU9y_UEN3NI
- **Prototype: Private Network Access permission to relax mixed content**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6MczoSFGiHo
  - TLS で暗号化できない、ドメインのないローカルサーバで mixed contents を緩和したい
  - 明示的に要件を緩和する API の追加
- Prototype: Render blocking status in Resource Timing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KD_Z1mObs_8
- Experiment: Shared Storage API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jDx8z5a6ovk
- Experiment: Shared Element Transitions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ircRbiGEkEE
- Experiment: Secure Payment Confirmation - Opt-Out Support
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/V6yrEWtuI78
- Experiment: Declarative Beacon API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Vd6RTIfxkiY
- Experiment: LazyEmbeds
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PhLkO3KITyw
- Extend Experiment: Web app launch handler
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BzwopwOFzFw
- **WebView Origin Trials enabled on 103 beta**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pb-UsysjHME
  - OT が WebView でも使えるようになる
- Change:
- Unship:
- **Deprecate and Remote: `navigateEvent.transitionWhile()`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/W7fivudG21c
- Deprecate and Remove: Gesture Scroll DOM events
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dJ939dfV234
- Ready for Trial: Intl.NumberFormat v3 API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vy6rCuh3r_0
- PSA: Simultaneous touch-drag and context-menu is getting enabled on Android 100+
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KnfFsL2dM8w
- PSA: `--ignore-testharness-expected-txt` for run_web_tests.py
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2JNZauywllM
- PSA: Adding 'Set-Cookie' header to Fetch's forbidden header names
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SyHAsPfO004
- **PSA: change to process for WebKit signals**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qO38-AfQ2AE/
  - Webkit 版の Standard Position 公開
  - http://bit.ly/blink-signals
  - https://github.com/WebKit/standards-positions/

#### V8

- **Discontinuing release blog posts · V8**
  - https://v8.dev/blog/discontinuing-release-posts
- Retrofitting Temporal Memory Safety on C++ · V8
  - https://v8.dev/blog/retrofitting-temporal-memory-safety-on-c++

#### Other

- web.dev
  - **First-party cookie recipes**
    - https://web.dev/first-party-cookie-recipes/
  - New to the web platform in June
    - https://web.dev/web-platform-06-2022/
  - **Farewell to HTML5Rocks**
    - https://web.dev/farewell-html5rocks/
  - TransformStream is now supported cross-browser
    - https://web.dev/transformstream/
- google developer blog
  - Google Developers Blog: From Developer to Teacher, How a Computer Science Professor Found Career Support with Google Developer Groups
    - https://developers.googleblog.com/2022/06/gdg-jennifer-bailey.html
  - Google Developers Blog: Using research to make code review more equitable
    - https://developers.googleblog.com/2022/06/Using-research-to-make-code-review-more-equitable.html
  - アイテムの分類を更新して Search Console レポートを簡素化 | Google 検索セントラル ブログ | Google Developers
    - https://developers.google.com/search/blog/2022/06/search-console-item-classification
  - **Googlebot and the 15 MB thing | Google Search Central Blog | Google Developers**
    - https://developers.google.com/search/blog/2022/06/googlebot-15mb
    - Bot が HTML を 15MB しかみてない話
- google developer japan blog
  - Google Developers Japan: Chrome 103: ナビゲーションの Early Hints 、さまざまなオリジン トライアルの終了など
    - https://developers-jp.googleblog.com/2022/06/chrome-103.html
- chrome developer blog
  - Attribution Reporting updates in June 2022 - Chrome Developers
    - https://developer.chrome.com/en/blog/attribution-reporting-updates-june-2022/
  - **Faster page loads using server think-time with Early Hints - Chrome Developers**
    - https://developer.chrome.com/en/blog/early-hints/
  - Generate summary reports with the aggregation service - Chrome Developers
    - https://developer.chrome.com/en/blog/generate-summary-reports/
  - DevTools Tips: How to inspect CSS container queries
    - https://developer.chrome.com/en/blog/devtools-tips-9/
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel

### Firefox 動向

#### Stable: 102

#### Updates

- **Firefox 102.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/102.0/releasenotes/
  - ETP Strict モードでトラッキング用のクエリーを削除
- **Firefox 102 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/102
  - TransformStream
  - Readable byte streams
- These Weeks In Firefox: Issue 119 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/06/30/these-weeks-in-firefox-issue-119/
- **SpiderMonkey Newsletter (Firefox 102-103) | SpiderMonkey JavaScript/WebAssembly Engine**
  - https://spidermonkey.dev/blog/2022/06/30/newsletter-firefox-102-103.html
  - 👷🏽‍♀️ New features
    - We've implemented the array findLast/findLastIndex proposal (disabled by default).
    - We've added support for structured cloning of Error objects.
    - We've implemented WebAssembly relaxed SIMD dot-instructions.
  - ⚙️ Modernizing JS modules
    - See the ESMification update sent to dev-platform for the status of that project.
      - We removed use of globalThis to prepare for moving to ESM.
      - We added support for ESMs in ChromeUtils.registerWindowActor.
      - We added support for lazy loading ESMs.
      - We added linting and cleaned up use of this for lazy getters.
      - We introduced a shim to make the transition to ESM as painless as possible.
    - We implemented a prototype of ImportMaps.
    - We refactored both the representation of scripts and the loader itself.
  - ⏱️ Profiler support
  - 🚀 JS Performance
  - 🏎️ WebAssembly Performance
  - 📚 Miscellaneous

#### Intents

- **Ship: Transferable streams**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/a18PTC0vumI
- **Ship: scroll-snap-stop**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Ot7a8Xgtxrg
- Ship: disabled property on SVGStyleElement
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/qMoKScceGac
- **Ship: `Array.{findLast,findLastIndex}`**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/aHdalM9Dveo
- **Prototype: `linear()` easing function**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/vaniCZs9oBo
- **Prototype: Atomics.waitAsync**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Z5TPivxh1Xs
- Experiment:
- Change:
- Remove:
- Firefox Security & Privacy Newsletter - 2022 Q1
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/_cDmbksiJu4
- **Make `<embed>` and `<object>` behave more like `<iframe>` for image loading.**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/UwO49Fu-F2s

#### Other

- **The JavaScript Specification has a New License - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2022/06/the-specification-for-javascript-has-a-new-license/
  - ECMA-262/402 のライセンスを変更することに
  - ECMA は W3C とライセンスが違い、法的レビューのオーバーヘッドがあった
  - また二次的著作物作成に一部制限があった

### Safari 動向

#### Stable: 15.5

#### Updates

- Web technology sessions at WWDC22
  - https://webkit.org/blog/12840/web-platform-and-web-extensions-features-highlighted-at-wwdc22/
  - Tuesday, June 7
    - **What's new in Safari and WebKit**
    - **Meet Web Push for Safari**
    - **Meet Passkeys**
      - https://support.apple.com/en-us/HT213305
  - Wednesday, June 8
    - What's new in Safari Web Extensions
    - Replace CAPTCHAs with Private Access Tokens
  - Thursday, June 9
    - Create Safari Web Inspector Extensions
    - What's new in web accessibility
    - Enhance your Sign in with Apple experience
  - Friday, June 10
    - What's new in WKWebView
    - Improve DNS security for apps and servers
- **News from WWDC22: WebKit Features in Safari 16 Beta**
  - https://webkit.org/blog/12824/news-from-wwdc-webkit-features-in-safari-16-beta/
  - Web Inspector Extensions
  - Container Queries
  - Web Push for macOS
  - Subgrid
  - Flexbox Inspector
  - Accessibility Improvements
  - Animation Improvements
  - Overscroll Behavior
  - Shared Worker
- **Meet Web Push**
  - https://webkit.org/blog/12945/meet-web-push/
  - 2023 年の iOS / iPadOS で WebPush が有効に
  - 他と同様 `userVisibleOnly` のみ
  - webpushd というデーモンが push を受け取る
- **Release Notes for Safari Technology Preview 147 with Safari 16 Features**
  - https://webkit.org/blog/12960/release-notes-for-safari-technology-preview-147-with-safari-16-features/
  - Live Text
  - Web technologies
  - Web Push
  - Passkeys
  - Improved Safari Web Extensions
  - Web Inspector Extensions
  - Flexbox Inspector
- **Release Notes for Safari Technology Preview 148**
  - https://webkit.org/blog/12992/release-notes-for-safari-technology-preview-148/
  - Web Inspector
  - `:has()` pseudo-class
    - Added support for invalidating :target pseudo-class
    - Added partial support for invalidating :in-range and :out-of-range
  - **CSS Container Queries**
  - CSS
    - Added support for each-line keyword in text-indent
    - Implemented `:modal` pseudo-class
    - Implemented `ray()` shape in offset-path
    - Implemented contain flag for `ray()` in `offset-path`
  - Forms
  - Animations
  - inert attribute
  - JavaScript
  - Rendering
  - Web API
  - Media
  - Security
    - **Added support for Link nonces**
  - Loading
  - WebDriver

#### Position

- 来月からここはなし。 Standard Position の Repo から拾う。

#### Other

- **[webkit-dev] WebKit is now on GitHub**
  - https://lists.webkit.org/pipermail/webkit-dev/2022-June/032312.html
  - WebKit のレポジトリが GitHub に移行
- **[webkit-dev] new standards-positions repo**
  - https://lists.webkit.org/pipermail/webkit-dev/2022-June/032319.html
  - standards position も GitHub に移動
  - https://github.com/WebKit/standards-positions

### Edge 動向

#### Stable: 103

#### Updates

- **Internet Explorer 11 has retired and is officially out of support -what you need to know | Windows Experience Blog**
  - https://blogs.windows.com/windowsexperience/2022/06/15/internet-explorer-11-has-retired-and-is-officially-out-of-support-what-you-need-to-know/
- **Internet Explorer 11 はサポートを終了しました。長年のご愛顧ありがとうございました。 - Windows Blog for Japan**
  - https://blogs.windows.com/japan/2022/06/15/internet-explorer-11-is-no-longer-supported/
- IE モードのよくあるご質問 | Japan Developer Support Internet Team Blog
  - https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/ie-mode-faq/
- The end of Internet Explorer
  - https://web.dev/the-end-of-ie/
- Good riddance, Internet Explorer! | Vivaldi Browser
  - https://vivaldi.com/blog/good-riddance-internet-explorer/
- Internet Explorer, we hardly knew ye
  - https://blog.cloudflare.com/internet-explorer-retired/
- 「Internet Explorer」サポート終了に自治体「なんで急に」報道 Twitter で「さすがに草」などの声(ITmedia ビジネスオンライン) - Yahoo!ニュース
  - https://news.yahoo.co.jp/articles/51c133f4a6b7e3ff77d1e6b1de2ea8756271838e
- Internet Explorer のサポートが終了:今後も続く脅威とは? | WIRED.jp
  - https://wired.jp/article/internet-explorer-dead-security-risks/
- 「Internet Explorer」サポート終了も「IE モード」で"ゾンビ化" 本当の混乱は 7 年後? - ITmedia ビジネスオンライン
  - https://www.itmedia.co.jp/business/articles/2206/16/news102.html

#### Chakra

#### Other

- A Story of a Bug Found Fuzzing | Microsoft Browser Vulnerability Research
  - https://microsoftedge.github.io/edgevr/posts/a-story-of-a-bug-found-fuzzing/
- Debug the web in 3D with the 3D View tool
  - https://blogs.windows.com/msedgedev/2022/06/21/debug-the-web-in-3d-with-the-3d-view-tool/
- Delivering the Microsoft Edge WebView2 Runtime to Windows 10 Consumers
  - https://blogs.windows.com/msedgedev/2022/06/27/delivering-the-microsoft-edge-webview2
  - -runtime-to-windows-10-consumers/
- Captive Portals - text/plain
  - https://textslashplain.com/2022/06/24/captive-portals/
- "Batteries-Included" vs "Bloated" - text/plain
  - https://textslashplain.com/2022/06/16/batteries-included-vs-bloated/
- Chromium Startup - text/plain
  - https://textslashplain.com/2022/06/15/chromium-startup/
- Microsoft Edge Tips and Tricks - text/plain
  - https://textslashplain.com/2022/06/03/microsoft-edge-tips-and-tricks/

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - First Public Working Draft: Multi-Screen Window Placement
    - https://www.w3.org/blog/news/archives/9599
  - Draft Note: Ethical Principles for Web Machine Learning
    - https://www.w3.org/blog/news/archives/9592
- Chartering
  - Call for Participation: HTML Working Group Charter Approved;
    - https://lists.w3.org/Archives/Public/public-new-work/2022Jun/0002.html
  - JavaScript Web Framework Interoperability Community Group Proposed
    - https://lists.w3.org/Archives/Public/public-new-work/2022Jun/0003.html
  - Semantic HTML-vocabulary Community Group created
    - https://lists.w3.org/Archives/Public/public-new-work/2022Jun/0005.html
  - Call for Participation: Web Application Security Working Group Charter Approved
    - https://lists.w3.org/Archives/Public/public-new-work/2022Jun/0004.html
  - Advance notice: Work in progress on a Web Real-Time Communications Working Group Charter
    - https://lists.w3.org/Archives/Public/public-new-work/2022Jun/0010.html
  - Advance notice: Work in progress on Accessibility Guidelines Working Group Charter
    - https://lists.w3.org/Archives/Public/public-new-work/2022Jun/0012.html
  - Call for Participation: Dataset Exchange Working Group Charter Approved
    - https://lists.w3.org/Archives/Public/public-new-work/2022Jun/0013.html
  - Call for Participation: Verifiable Credentials Working Group Charter Approved
    - https://lists.w3.org/Archives/Public/public-new-work/2022Jun/0006.html

#### Other

- **W3C Media Advisory: W3C to become a public-interest non-profit organization**
  - https://www.w3.org/2022/06/pressrelease-w3c-le.html.en
  - https://www.w3.org/blog/news/archives/9594
  - W3C が NPO になる
- W3C overrules Google, Mozilla's objections to identifiers • The Register
  - https://www.theregister.com/2022/07/01/w3c_overrules_objections/
- **W3C Advisory Committee Elects Advisory Board**
  - https://www.w3.org/blog/news/archives/9568
- W3C Invites Implementations of CSS Custom Properties for Cascading Variables Module Level 1
  - https://www.w3.org/blog/news/archives/9580
- **W3C joins leading standards organizations and companies to coordinate interoperability standards for an open and inclusive metaverse**
  - https://www.w3.org/blog/news/archives/9584
  - Metaverse Standards Forum に Join
  - https://metaverse-standards.org/
- Page Visibility Level 2 Published as a Discontinued Draft
  - https://www.w3.org/blog/news/archives/9589
- **Replace the outline algorithm with one based on heading levels · whatwg/html@6682bde**
  - https://github.com/whatwg/html/commit/6682bdeee6fb08f5972bea92064fe250f1b4ec9c
  - Outline algorithm がなくなる
  - セクションの入れ子ではなく見出しでアウトラインができる
  - hgroup のアルゴリズムが変わる
    - `<p>` が sub-headding

### TC39 動向

#### Meeting

- 2022/06/06 - 09
  - Agenda
    - https://github.com/tc39/agendas/blob/main/2022/06.md
  - Note
    - note が出たら来月やる

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2022-06-01}...main@{2022-07-01}
- https://tc39.github.io/beta/
- 0->1
  - Duplicate named capture groups
  - Faster Promise Adoption
  - RegExp Atomic Operators
- 1->2
  - String.dedent
- 2->3
  - Symbols as WeakMap keys
- 3->4
  - Array.findFromLast

#### New Proposals

- **FrankYFTang/proposal-intl-temporal**
  - https://github.com/FrankYFTang/proposal-intl-temporal
  - temporal と intl の間を埋める提案

#### Other

- Ecma International approves new standards - Ecma International
  - https://www.ecma-international.org/news/ecma-international-approves-new-standards-6/
  - ECMAScript 2022 正式リリース

### IETF 動向

#### WG

- IETF
  - https://datatracker.ietf.org/meeting/
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - Publication has been requested for draft-ietf-httpbis-digest-headers-10
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0231.html
  - I-D Action: draft-ietf-httpbis-digest-headers-10.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0230.html
  - I-D Action: draft-ietf-httpbis-binary-message-05.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0156.html
  - I-D Action: draft-ietf-httpbis-origin-h3-00.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0159.html
  - I-D Action: draft-ietf-httpbis-retrofit-04.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0148.html
  - Draft v1 Update for Resumable Uploads
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0195.html
  - A structured format for dates?
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0174.html
  - URL, URI and the w3c
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0161.html
  - IETF 114: Call for topics
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0154.html
  - **RFC 9110: HTTP Semantics**
    - https://rfc-editor.org/rfc/rfc9110
  - **RFC 9111: HTTP Caching**
    - https://rfc-editor.org/rfc/rfc9111
  - **RFC 9112: HTTP/1.1**
    - https://rfc-editor.org/rfc/rfc9112
  - **RFC 9113: HTTP/2**
    - https://rfc-editor.org/rfc/rfc9113
  - **RFC 9114: HTTP/3**
    - https://rfc-editor.org/rfc/rfc9114
  - **RFC 9163: Expect-CT Extension for HTTP**
    - https://rfc-editor.org/rfc/rfc9163
  - **RFC 9204: QPACK: Field Compression for HTTP/3**
    - https://rfc-editor.org/rfc/rfc9204
  - **RFC 9205: Building Protocols with HTTP**
    - https://rfc-editor.org/rfc/rfc9205
  - **RFC 9209: The Proxy-Status HTTP Response Header Field**
    - https://rfc-editor.org/rfc/rfc9209
  - **RFC 9211: The Cache-Status HTTP Response Header Field**
    - https://rfc-editor.org/rfc/rfc9211
  - **RFC 9213: Targeted HTTP Cache Control**
    - https://rfc-editor.org/rfc/rfc9213
  - **RFC 9218: Extensible Prioritization Scheme for HTTP**
    - https://rfc-editor.org/rfc/rfc9218
  - **RFC 9220: Bootstrapping WebSockets with HTTP/3**
    - https://rfc-editor.org/rfc/rfc9220
  - **RFC 9230: Oblivious DNS over HTTPS**
    - https://rfc-editor.org/rfc/rfc9230
  - **Please review HTTP performance aspects of Incremental Font Transfer**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022AprJun/0274.html
    - W3C でやってる Incremental Font Transfer (IFT) のレビュー依頼
    - https://w3c.github.io/IFT/Overview.html
    - 二つの方式
      - Patch Subset
      - Range Request
    - Progressive Font Enrichment: Evaluation Report
      - https://www.w3.org/TR/PFE-evaluation/
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

- **Internet Explorer, we hardly knew ye**
  - https://blog.cloudflare.com/internet-explorer-retired/
- Network performance update: Cloudflare One Week June 2022
  - https://blog.cloudflare.com/network-performance-update-cloudflare-one-week-june-2022/
- Cloudflare One vs Zscaler Zero Trust Exchange: who is most feature complete? It's not who you might expect
  - https://blog.cloudflare.com/cloudflare-one-vs-zscaler-zero-trust-exchange/
- How Cloudflare Security does Zero Trust
  - https://blog.cloudflare.com/how-cloudflare-security-does-zero-trust/
- HTTP/3 inspection on Cloudflare Gateway
  - https://blog.cloudflare.com/cloudflare-gateway-http3-inspection/
- **Early Hints update: How Cloudflare, Google, and Shopify are working together to build a faster Internet for everyone**
  - https://blog.cloudflare.com/early-hints-performance/
- Using Cloudflare Tunnel and Access with Postgres
  - https://blog.cloudflare.com/cloudflare-tunnel-for-postgres/
- Cloudflare Gateway dedicated egress and egress policies
  - https://blog.cloudflare.com/gateway-dedicated-egress-policies/
- Announcing the Cloudflare One Partner Program
  - https://blog.cloudflare.com/cloudflare-one-partner-program/
- Introducing Private Network Discovery
  - https://blog.cloudflare.com/introducing-network-discovery/
- Cloudflare recognized by Microsoft as a Security Software Innovator
  - https://blog.cloudflare.com/cloudflare-recognized-by-microsoft-as-a-security-software-innovator/
- Introducing Cloudforce One: our new threat operations and research team
  - https://blog.cloudflare.com/introducing-cloudforce-one-threat-operations-and-threat-research/
- Welcome to Cloudflare One Week
  - https://blog.cloudflare.com/cloudflare-one-week-2022/
- Cloudflare mitigates 26 million request per second DDoS attack
  - https://blog.cloudflare.com/26m-rps-ddos/
- **Private Access Tokens: eliminating CAPTCHAs on iPhones and Macs with open standards**
  - https://blog.cloudflare.com/eliminating-captchas-on-iphones-and-macs-using-new-standard/
- **HTTP RFCs have evolved: A Cloudflare view of HTTP usage trends**
  - https://blog.cloudflare.com/cloudflare-view-http3-usage/
- Cloudflare observations of Confluence zero day (CVE-2022-26134)
  - https://blog.cloudflare.com/cloudflare-observations-of-confluence-zero-day-cve-2022-26134/
- In Ukraine and beyond, what it takes to keep vulnerable groups online
  - https://blog.cloudflare.com/in-ukraine-and-beyond-what-it-takes-to-keep-vulnerable-groups-online/
- **Cloudflare outage on June 21, 2022**
  - https://blog.cloudflare.com/cloudflare-outage-on-june-21-2022/

#### Fastly

- **Private Access Tokens: stepping into the privacy-respecting, CAPTCHA-less future we were promised | Fastly**
  - https://www.fastly.com/blog/private-access-tokens-stepping-into-the-privacy-respecting-captcha-less
- OpenTelemetry Part 1: Making the Edge less distant | Fastly
  - https://www.fastly.com/blog/opentelemetry-part-1-making-the-edge-less-distant

#### Other

### セキュリティ動向

- **クレジットカード番号等取扱業者に対する行政処分を行いました(メタップス)**
  - https://www.meti.go.jp/press/2022/06/20220630007/20220630007.html
- **個人情報を含む USB メモリーの紛失事案について|尼崎市公式ホームページ**
  - https://www.city.amagasaki.hyogo.jp/kurashi/seikatusien/1027475/1030947.html

### 周辺動向

- No Neutral Map - Bocoup
  - https://bocoup.com/blog/no-neutral-map
- Igalia at Embedded World Conference 2022 | Igalia
  - https://www.igalia.com/2022/06/20/Igalia-at-Embedded-World-Conference-2022.html
- Intent to Ship: MathML | Igalia
  - https://www.igalia.com/2022/06/22/Intent-to-Ship-MathML.html
- ISP シェア 2022 | www.kosho.org
  - https://www.kosho.org/blog/net/isp-share-2022/
- **Leaving Mozilla - Anne's Blog**
  - https://annevankesteren.nl/2022/06/leaving-mozilla
- **After Mozilla - Anne's Blog**
  - https://annevankesteren.nl/2022/06/after-mozilla
- The cost of convenience - surma.dev
  - https://surma.dev/things/cost-of-convenience/
- **What ~will~would a Chromium-only Web look like?**
  - https://www.mnot.net/blog/2022/06/22/chromium-only
- Yet More New HTTP Specs
  - https://www.mnot.net/blog/2022/06/08/http-extensions
- A New Definition of HTTP
  - https://www.mnot.net/blog/2022/06/06/http-core
- Apple Is Not Defending Browser Engine Choice - Infrequently Noted
  - https://infrequently.org/2022/06/apple-is-not-defending-browser-engine-choice/
- Web Engines Hackfest 2022 notes - HackMD
  - https://hackmd.io/@tchevalier/HyoJsT4K5
- **「モバイル・エコシステムに関する競争評価 中間報告」及び「新たな顧客接点(ボイスアシスタント及びウェアラブル)に関する競争評価 中間報告」に対する意見募集について|e-Gov パブリック・コメント**
  - https://public-comment.e-gov.go.jp/servlet/Public?CLASSNAME=PCMMSTDETAIL&id=060220427&Mode=0
- **行政におけるデザインシステムのあり方に関する調査研究 | AIS | 一般社団法人 行政情報システム研究所**
  - https://www.iais.or.jp/reports/labreport/20220601/design2021/

### イベント

- 7 月
  - 23-29: IETF 114 Philadelphia
    - https://www.ietf.org/how/meetings/114/
- 8 月
- 9 月
  - 12-16: TPAC 2022 Vancouver
    - https://www.w3.org/wiki/TPAC/2022

### Wrap Up

- Chrome
  - 102
    - Navigation API
  - 103
    - Early Hints
  - 104
    - range media query syntax
  - Ship
    - navigateEvent.intercept()
    - import.meta.resolve()
  - Prototype
    - Background Blur API
    - CSS trigonometric functions
    - Private Network Access permission
  - Deprecate
    - navigateEvent.transitionWhile()
  - web.dev
    - farewell HTML5Rocks
  - Chrome Developers
    - Early Hints
- Firefox
  - 102
    - TransformStreams
  - SpiderMonkey
    - findLast/findLastIndex
    - ESMification
  - Ship
    - Transferable Streams
    - scroll-snap-stop
    - Array.findLast/findLastIndex
  - Prototype
    - CSS linear() easing function
  - other
    - ECMAScript license
- Safari
  - WWDC
    - Safari 16
    - Web Push
    - Passkeys
  - Safari 16
    - Container Queries
    - Web Push
    - Subgrid
    - Shared Workers
  - TP 147
    - Safari 16 features
  - TP 148
    - :modal pseudo-class
    - Link nonces
  - other
    - WebKit is now on GitHub
    - WebKit standard-position repo on GitHub
- Edge
  - IE11 サポート終了
- W3C/WHATWG
  - legal NPO in 2023
  - AB Election 終了
  - W3C が Metaverse Standards Forum に Join
  - Outline Algorithm がなくなる
- TC39
  - proposal-inlt-temporal
- IETF
  - HTTP RFC 大量公開
  - Incremental Font Transfer レビュー依頼
- CDN 動向
  - Cloudflare
    - Early Hints
    - Private Access Token
    - 6/21 大規模障害
  - Fastly
    - Private Access Token
- セキュリティ動向
  - メタップス行政処分
  - 尼崎市 USB 紛失
- 周辺動向
  - Anne leaving Mozilla
  - What would Chromium-only Web look like by mnot
  - モバイルエコシステムに対するパブコメ募集
  - 行政におけるデザインシステムの在り方
