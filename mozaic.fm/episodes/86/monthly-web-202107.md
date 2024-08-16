---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep86.mp3
published_at: 2021-08-03
guest: [@myakura](https://twitter.com/myakura)
---

# ep86 Monthly Web 202107

## Theme

第 86 回のテーマは 2021 年 7 月の Monthly Web です。

## Show Note

### Chrome 動向

#### Stable: 92

#### Updates

- **New in Chrome 91 - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-chrome-91/
  - New in Chrome 91
    - Suggested names for File System Access API
    - Reading files from the clipboard
    - **Share credentials on affiliated sites**
- **What's New In DevTools (Chrome 92) - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-devtools-92/
  - What's New In DevTools (Chrome 92)
    - CSS grid editor
    - Support for const redeclarations in the Console
    - Source order viewer
    - New shortcut to view frame details
    - Enhanced CORS debugging support
    - Network panel updates
      - Rename XHR label to Fetch/XHR
      - Filter Wasm resource type in the Network panel
      - User-Agent Client Hints for devices in the Network conditions tab
    - Report Quirks mode issues in the Issues tab
    - Include Compute Intersections in the Performance panel
    - Lighthouse 7.5 in the Lighthouse panel
    - Deprecated "Restart frame" context menu in the call stack
    - [Experimental] Protocol monitor
    - **[Experimental] Puppeteer Recorder**
- **Chromium Blog: Chrome 93: Multi-Screen Window Placement, PWAs as URL Handlers, and More**
  - https://blog.chromium.org/2021/07/chrome-93-multi-screen-window-placement.html
  - Origin Trials
    - New Origin Trials
      - **Cross-Origin-Embedder-Policy: credentialless**
      - Multi-Screen Window Placement
      - Window Controls Overlay for Installed Desktop Web Apps
      - PWAs as URL Handlers
    - Completed Origin Trials
      - **Subresource loading with Web Bundles**
      - WebXR Plane Detection API
  - Other features in this release
    - **AbortSignal.abort() Static Method**
    - CSS Flexbox: Support Alignment Keywords start, end, self-start, self-end, left, right
    - **Error.cause Property**
    - Honor Media HTML Attribute for meta name=theme-color
    - noplaybackrate in HTMLMediaElement.controlsList
    - Sec-CH-Prefers-Color-Scheme Client Hint Header
    - **User-Agent Client Hints API Updates**
    - **WebOTP API: Cross-Device Support**
  - JavaScript
    - **Object.hasOwn**
  - Deprecations, and Removals
    - **Block ports 989 and 990**
    - Remove 3DES in TLS
    - WebAssembly Cross-Origin Module Sharing
- **What's New In DevTools (Chrome 93) - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-devtools-93/
  - **Editable CSS container queries in the Styles pane**
  - **Web bundle preview in the Network panel**
  - Attribution Reporting API debugging
  - Better string handling in the Console
  - **Improved CORS debugging**
  - Lighthouse 8.1
  - Display new note URL in the Manifest pane
  - Fixed CSS matching selectors
  - Pretty-printing JSON responses in the Network panel

#### Intents

- Ship: Clipboard API: Svg
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KYN1ToIjCsM/m/blyE-F-bAQAJ
- Ship: Scheduling APIs: Prioritized scheduler.postTask
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/snsxQeTSFHo/m/CughJ2NBAQAJ
- Ship: SpeechSynthesis and SpeechSynthesisVoice interface objects
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jFvTG8AJfnQ/m/Sfs4rZMQAQAJ
- Ship: VirtualKeyboard API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EF9fJTfqoGI/m/K2-QWCNxAgAJ
- Ship: CSS @counter-style rules in shadow trees
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ruFLLkjvzwg/m/9aGteUUlAgAJ
- **Ship: preferCurrentTab**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YoefXLTQsw0/m/NVoV6NcIAgAJ
  - `getDisplayMedia()` でユーザに Tab, Window, Display を選ばせる際に、 Tab を推奨するための属性を追加
  - 別途 `getViewportMedia()` も提案されているがまだ策定初期段階なので属性を追加するもの
  - `getDisplayMedia()` の仕様では「ソースの選択を制限するような実装をしてはいけない」という制約があるので、 Moziila は `harmful`
- **Ship: Feature Policy: `diplay-capture`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pNPotQY92UY/m/thZ3h-zQAQAJ
  - `getDisplayMedia()` のための Policy
  - Safari/Firefox は実装済み
- **Ship: CSS Overflow `scrollbar-gutter`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/71vtc_Xv7jk/m/EezoVS9dBQAJ
  - Scroll Bar が表示されることで表示領域が狭まり Layout Shift が発生することがある
  - Scroll Bar のための領域をコントロールする属性
  - stable だと常に表示、 both-edges だと両方に表示
- **Ship: Note taking new note URL**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tZqSbhmxiGM/m/5iL3gWvpBAAJ
- Ship: MediaStreamTrack Insertable Streams (a.k.a. Breakout Box)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oo6MQoRbDXk/m/7Kjjfe9NAwAJ
- **Ship: Align transform-style: preserve-3d and perspective property with the spec**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4LWMf_tZwtw
  - `preserve-3d` を指定したときの重なりが DOM ではなくコンテナブロックになっていた
  - 仕様が変わったので修正する
- Ship: supports for the @font-face src: descriptor
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bCA9H3eaO3s
- Ship: Idle Detection
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZmHHfrR_jak
- Ship: JS Self-Profiling API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7K7Qt7aRJ8s
- **Prototype and Ship: flex-basis property honors keywords 'content' and 'min/max/fit-content'**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lzcWR4Q97ik/m/GvFidwZtEwAJ
  - CSS の幅や高さには px や em 以外にも `min-content` や `max-content` といったキーワードの値を指定できる
  - `flex-basis` でそのキーワードを解釈するようにする
- **Prototype and Ship: New UA platform version source on Windows for User-Agent Client Hints**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/r0kcHYoK79U/m/uMoD0H8bBQAJ
  - UA-CH における windows の version を細かくする
- **Prototype and Ship: Cookie size limits**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0N5BePVCPVo
  - 全 name, value 合計で 4096, 各 value を 1024 に制限する RFC6265bis でのスペックに準拠
  - Chrome もすでに制限はあったが、ブラウザ間で差異があったのを修正する目的
- **Prototype: CORS non-wildcard request-header**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jEV2VMVjMt8/m/rogFnr6xAgAJ
  - `access-control-request-header: *` などで使われる `*` は `Authorization` を含まないという仕様がある
  - これに準拠してなかったものを準拠するように変える
- **Prototype: Cookies Having Independent Partitioned State (CHIPS)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hvMJ33kqHRo/m/3diUOI0uAQAJ
  - Cross Site Tracking ではない 3rd Party Cookie をカバーする Partitioned Cookie の実装
- Prototype: Shared Storage API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_quChIvPzT8/m/0W7IxD_1AAAJ
- Prototype: CSS @counter-style descriptor 'speak-as'
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9e9q5WAepGk/m/uw_XP5zuFAAJ
- Prototype: Attribution Reporting: support for aggregate reports
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2zA5-TuVSkA/m/GVqUUkhfAwAJ
- Experiment: Read Chrome device attributes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dJQgwZ_1jk0/m/2juPoFDcEwAJ
- Experiment: MSE-in-Workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XZMyanniH9E/m/6LvB0k70AAAJ
- **Experiment: Cross-Origin-Embedder-Policy: credentialless**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Sdc0G1bvKr0/m/YHR8RuWyAAAJ
  - これまで `require-corp` で明示的に CORP で許可されたものだけにしてたが制限がきつかった
  - パーソナライズされてないページであれば盗めるものはないので許しても良いはず
  - Credential を送らないことで読み込みの制限を緩和する提案
- Experiment: Window Controls Overlay for Installed Desktop Web Apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HNHbpxvrECA/m/-HWfaszRBAAJ
- Experiment: Progressive Web Apps as URL Handlers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RGlyGO-3Az8/m/u7oN4N7xAwAJ
- Experiment: User Agent Reduction Origin Trial
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/R0xKm1B7qoQ/m/gw-5JltZAwAJ
- **Experiment: Service Worker subresource filter**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GtR3POPyefM
  - SW をすべてのリクエストが通るとオーバーヘッドが大きい
  - そのパスをコントロールする API が欲しいが、その前に有用かどうかテストしたい
  - `Service-Worker-Subresource-Filter: foo` だと foo を含むパスだけがヒットするように
  - まずこれで試して、有用なら指定方法の詳細なスペックを考える
- Extend Experiment: Conversion Measurement API (Attribution Reporting API)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xCWP1ltlAgw/m/acwN0GIRBQAJ
- Extend Experiment: `getCurrentBrowsingContextMedia()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GwqZhE7ufXU/m/wUu9NV5pAQAJ
- Extend Origin Trial: Secure Payment Confirmation V2
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8j_2oRpPttA/m/gCeoummbAwAJ
- Extend Origin Trial: AppCache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hQ1zGoPthBU
- **Ready for Trial: URLPattern**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WitVII_BzyU/m/mI8lZY4NAgAJ
  - URL のパターンを表現するオブジェクトで Path のルーティングに使える
  - SW での利用が主目的だが、フレームワークにも使えそう
- Ready for Trial: Progressive Web Apps as URL Handlers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7NTGauH8Mxs/m/KiWeFKBVAwAJ
- WebCodecs Origin Trial in Chrome 92: Breaking changes and new features
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/THMWmD7JGFM/m/TM0tb0LdAwAJ
- Request for Deprecation Trial: Restrict "private network requests" for subresources to secure contexts.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vlDZXlPb00k/m/1421ACiuAAAJ
- Deprecate: WebAssembly cross-origin module sharing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nhmP8A61xk8/m/9OLnTyFNAgAJ
- Deprecate and Remove: Persistent Quota
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ziTjKMdOqz8/m/I8Tym8MZAgAJ
- Deprecate and Remove: WebSQL in third-party contexts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TM6YDx1Hh08/m/FxebaDQKAgAJ
- Origin Trial for Early Hints preload
  - https://groups.google.com/a/chromium.org/g/experimentation-dev/c/tN3vke3CQa4
- **Feature: Remove alert(), confirm(), and prompt for cross origin iframes**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/apvWcKHXBmE
  - Cross Origin iframe 内のダイアログが防がれようとしてるが、問題が報告されている
  - https://trailblazer.salesforce.com/issues_view?id=a1p4V000002BRMXQA4
  - Salesforce では Chrome の flag による無効化をアナウンスしてる
  - Intent to Remove: Cross origin subframe JS Dialogs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hTOXiBj3D6A/m/2So3_HlzAgAJ
  - Request for Deprecation Trial: Remove `alert()`, `confirm()`, and prompt for cross origin iframes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VOePv--Qa-4
  - もともと I2R がでていたもの
  - https://developer.chrome.com/origintrials/#/view_trial/2541156089743802369
  - すでに Reverse OT があるので OT が終わる 12/15 までに移行する必要
  - https://portswigger.net/research/alert-is-dead-long-live-print
  - XSS の PoC には `alert()` ではなく `print()` を使おうという話も
  - https://github.com/whatwg/html/issues/5407
  - https://github.com/whatwg/html/issues/6897
  - Chrome 91 、 Chrome 92 リリース前後で問題がでたという報告が HTML の issue にも

#### V8

- V8 release v9.2 · V8
  - https://v8.dev/blog/v8-release-92
  - at method
  - Shared Pointer Compression Cage

#### Other

- web.dev
  - Find your way with field data in the Web Vitals extension update
    - https://web.dev/field-data-in-the-web-vitals-extension/
  - **Compat 2021 mid-year update: Flex gap everywhere**
    - https://web.dev/compat2021-midyear/
    - Compat 2021 の経過報告
    - どのブラウザでも互換性が向上している
    - CSS flexbox
    - CSS Grid
    - CSS position: sticky
    - CSS aspect-ratio property
    - CSS transforms
    - Overall score improvements
  - URLPattern brings routing to the web platform
    - https://web.dev/urlpattern/
  - How committing to Core Web Vitals increased Netzwelt's advertising revenues by 18%
    - https://web.dev/netzwelt/
  - **The performance effects of too much lazy-loading**
    - https://web.dev/lcp-lazy-loading/
    - Lazyloading によってバイト数は減ってるが LCP が下がってるページがある
    - WordPress が ATF も Lazyload しており、それをやめると LCP も上がる
    - なんでも Lazyload はやめたほうが良さそう
    - (ブラウザの実装の問題な気もする)
  - Building a breadcrumbs component
    - https://web.dev/building-a-breadcrumbs-component/
  - Using WebAssembly threads from C, C++ and Rust
    - https://web.dev/webassembly-threads/
  - Resource inlining in JavaScript frameworks
    - https://web.dev/aurora-resource-inlining/
  - Best practices for tags and tag managers
    - https://web.dev/tag-best-practices/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - **WebDriver BiDi - The future of cross-browser automation - Chrome Developers**
    - https://developer.chrome.com/en/blog/webdriver-bidi/
    - ブラウザオートメーションの標準プロトコル
  - **Load cross-origin resources without CORP headers using `COEP: credentialless` - Chrome Developers**
    - https://developer.chrome.com/en/blog/coep-credentialless-origin-trial/
  - Restricting Wasm module sharing to same-origin - Chrome Developers
    - https://developer.chrome.com/en/blog/wasm-module-sharing-restricted-to-same-origin/
  - The Chromium Chronicle #23: Verified builds in Chrome Infra - Chrome Developers
    - https://developer.chrome.com/en/blog/chromium-chronicle-23/
  - Verify a phone number on desktop using WebOTP API - Chrome Developers
    - https://developer.chrome.com/en/blog/cross-device-webotp/
  - **RenderingNG - Chrome Developers**
    - https://developer.chrome.com/en/blog/renderingng/
    - レンダリングのアーキテクチャを整理するプロジェクト
    - 8 年前に開始し今年殆どをリリースする予定
    - 信頼性、パフォーマンス、拡張性を向上
    - HTML, CSS, 2D Canvas, 3D canvas, images, video, and fonts 全てを最適化
    - デバイスの能力を最大限活かす(GPU 、 解像度、リフレッシュレート etc)
  - **Overview of the RenderingNG architecture - Chrome Developers**
    - https://developer.chrome.com/en/blog/renderingng-architecture/
  - The Chromium Chronicle #22: Know Thy (Depot) Tools - Chrome Developers
    - https://developer.chrome.com/en/blog/chromium-chronicle-22/
  - Extension actions in Manifest V3 - Chrome Developers
    - https://developer.chrome.com/en/blog/mv3-actions/
  - **TablesNG Resolves 72 Chromium Bugs for Better Interoperability - Chrome Developers**
    - https://developer.chrome.com/en/blog/tablesng/
    - Table が持つ負債を払い、互換性を向上するプロジェクト
    - row position: sticky, border/background painting, Sub-pixel geometry etc
  - Introducing chrome.scripting - Chrome Developers
    - https://developer.chrome.com/en/blog/crx-scripting-api/
  - How to set browser flags in Chromium - Chrome Developers
    - https://developer.chrome.com/en/blog/browser-flags/
- chromium blog
  - **Chromium Blog: Faster and more efficient phishing detection in M92**
    - https://blog.chromium.org/2021/07/m92-faster-and-more-efficient-phishing-detection.html
    - サイトのカラープロファイルを取得し比較することでフィッシングサイトを割り出す
    - プロファイルの取得アルゴリズムを改善し 50 パーセンタイルで最大 50 倍、 99 パーセンタイルで 2.5 倍に
  - **Chromium Blog: Increasing HTTPS adoption**
    - https://blog.chromium.org/2021/07/increasing-https-adoption.html
    - HTTPS First モードを M94 から導入し HSTS がデフォルトな状態に
    - Lock icon をやめてよりニュートラルなアイコンに
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- **Deprecation of Internet Explorer Support - The AMP Blog**
  - https://blog.amp.dev/2021/07/20/deprecation-of-internet-explorer-support/

### Firefox 動向

#### Stable: 90

#### Updates

- Stopping FTP support in Firefox 90 - Mozilla Security Blog
  - https://blog.mozilla.org/security/2021/07/20/stopping-ftp-support-in-firefox-90/
- **Firefox 90 introduces SmartBlock 2.0 for Private Browsing - Mozilla Security Blog**
  - https://blog.mozilla.org/security/2021/07/13/smartblock-v2/
  - クロスサイトトラッカーをブロックする機能が FB のログインをブロックする
  - 2.0 はブロックはそのままに明示的にログインする UI を提供する
- **Firefox 90 supports Fetch Metadata Request Headers - Mozilla Security Blog**
  - https://blog.mozilla.org/security/2021/07/12/firefox-90-supports-fetch-metadata-request-headers/
  - Fetch Metadata をサポートした話
- Firefox 90 for developers - Mozilla
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/90

#### Intents

- Ship: Object.hasOwn
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/j9lGyixLhpU/m/9QdyTZAtAgAJ
- Ship: Imperative Slotting API
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/u1DpLJyYbSw/m/6WCkr0QAAgAJ
- **Ship: `size-adjust` descriptor, extended `font-size-adjust` syntax**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/RLqcyCotcdo/m/KRrrCfQGDQAJ
- Prototype and Ship: accent-color CSS property
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/wMKRWjyXGfU/m/biUon_ttAgAJ
- **Implement: Use fdlibm for Math.cos, Math.sin, and Math.tan to prevent math-based fingerprinting**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/0dxAO-JsoXI/m/eEhjM9VsAgAJ
- Experiment:
- Change:
- Remove:

#### Other

- **Spring Cleaning MDN: Part 1 - Mozilla Hacks**
  - https://hacks.mozilla.org/2021/07/spring-cleaning-mdn-part-1/
  - MDN wiki の更新に使ってたアカウントが無効になる
  - 今後は Github アカウントで Github からコントリビュート
- **Getting lively with Firefox 90 - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2021/07/getting-lively-with-firefox-90/
  - Classes go private
  - JavaScript `at()` method
  - Conic gradients for Canvas
  - New Request Headers
    - Sec-Fetch-Site
    - Sec-Fetch-Mode
    - Sec-Fetch-User
    - Sec-Fetch-Dest
- SpiderMonkey Newsletter (Firefox 90-91)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/t7oDx8DFGoY/m/U2wUV-b5AQAJ
- Performance Tools Newsletter (H1 2021)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/KoHsOuZ0Gog/m/qYoOzmAgDAAJ
- Engineering Effectiveness Newsletter (June 2021 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Baptlerb9Ow/m/MvwzdpHuDQAJ
- Deprecation plan for Firefox-specific pages on MDN
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/HwRoRUOuyEw/m/ZfYG7oHZDQAJ
- Soft code freeze for Firefox 91 starts July 8
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/NXWRhd5NrrU/m/DKlYPqIKDQAJ
- Making Client Certificates Available By Default in Firefox 90 - Mozilla Security Blog
  - https://blog.mozilla.org/security/2021/07/28/making-client-certificates-available-by-default-in-firefox-90/
- **2021: The year privacy went mainstream**
  - https://blog.mozilla.org/en/internet-culture/deep-dives/2021-the-year-privacy-went-mainstream/
  - タイトルの通りプライバシーが重要トピックの一つになっていった流れのまとめ
- Mozilla responds to the UK CMA consultation on Google's commitments on the Chrome Privacy Sandbox
  - https://blog.mozilla.org/en/mozilla/uk-cma-google-commitments-chrome-privacy-sandbox/
- **Firefox extends privacy and security of Canadian internet users with by-default DNS-over-HTTPS rollout in Canada**
  - https://blog.mozilla.org/en/mozilla/news/firefox-by-default-dns-over-https-rollout-in-canada/
  - CIRA(Canadian Internet Registration Authority) が DoH のプロバイダになった
  - これによりカナダの FF ユーザに徐々に DoH をロールアウトしていく
  - CIRA は TRR(Trusted Recursive Resolver) に参加した最初の Internet Registration Authority

### Safari 動向

#### Stable: 14.1.2

#### Updates

- **Release Notes for Safari Technology Preview 127**
  - https://webkit.org/blog/11736/release-notes-for-safari-technology-preview-127/
  - Added discrete animation support for grid-template-columns and grid-template-rows (r278173)
  - **Added support for `calc()` on components inside relative color syntax colors (r278261, r278304)**
  - **Added support for "relative color syntax" for `color()` (r278364)**
  - Added additional target luminance keywords for color-contrast() (r278262)
  - **Added support for Ergonomic Brand Checks proposal (e.g. #x in object) behind the--usePrivateIn flag (r277926)**
  - Added MediaSession.callActionHandler (r278222)
  - Added support for creating, accessing, and setting non-sRGB ImageData via canvas (r277569)
  - Added support for dispatching wheel events with ctrlKey on pinch gestures, which is commonly used for zooming embedded maps (r277772)
  - **Enabled `<summary>` to be a flex container (r278280)**
- **Release Notes for Safari Technology Preview 128**
  - https://webkit.org/blog/11925/release-notes-for-safari-technology-preview-128/
  - Added support for 12 CSS list-style-type values along with other list style fixes (r279165)
  - Added a mechanism to regenerate text in an image element when it changes dimensions (r278747)
  - Implemented performance.timeOrigin (r278665)
  - **Adjusted fetch port blocking for ports 990, 989 (r279099)**
  - **Implemented width and height attributes on source elements of `<picture>` (r279108)**
- **PCM: Click Fraud Prevention and Attribution Sent to Advertiser**
  - https://webkit.org/blog/11940/pcm-click-fraud-prevention-and-attribution-sent-to-advertiser/
- Optimizing JavaScript Standard Library Functions in JSC
  - https://webkit.org/blog/11934/optimizing-javascript-standard-library-functions-in-jsc/

#### Position

- 返信があるもの一個もない

#### Other

### Edge 動向

#### Stable: 92

- Dev channel update to 93.0.961.2 is live - Microsoft Tech Community
  - https://techcommunity.microsoft.com/t5/discussions/dev-channel-update-to-93-0-961-2-is-live/m-p/2592537

#### Updates

- **Easier browser debugging with Developer Tools integration in Visual Studio Code**
  - https://blogs.windows.com/msedgedev/2021/07/16/easier-debugging-developer-tools-in-visual-studio-code/
- How to opt-in to the Extended Stable release cycle option beginning with Microsoft Edge 94
  - https://blogs.windows.com/msedgedev/2021/07/15/opt-in-extended-stable-release-cycle/

#### Chakra

#### Other

- Easier browser debugging with Developer Tools integration in Visual Studio Code
  - https://blogs.windows.com/msedgedev/2021/07/16/easier-debugging-developer-tools-in-visual-studio-code/
- How to opt-in to the Extended Stable release cycle option beginning with Microsoft Edge 94
  - https://blogs.windows.com/msedgedev/2021/07/15/opt-in-extended-stable-release-cycle/
- **WebView2 and Electron | Electron Blog**
  - https://www.electronjs.org/blog/webview2
  - Chromium を使う WebView2 と Electron はどう違うのかを紹介
  - Electron は Chromium をバンドルするが、 WebView2 ではランタイムも選択できる
  - Electron はデスクトップの UI なども API を提供するが、 WebView2 にはそれがなくアプリケーションフレームワークに任せる

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
  - **Updated Candidate Recommendation: CSS Counter Styles Level 3**
    - https://www.w3.org/blog/news/archives/9169
  - W3C Invites Implementations of ARIA in HTML
    - https://www.w3.org/blog/news/archives/9144
- Working Draft
- First Public Working Draft
  - **CfC to adopt the Sanitizer API, and publish a FPWD**
    - https://lists.w3.org/Archives/Public/public-webappsec/2021Jul/0008.html
  - First Public Working Draft: Internationalization Glossary
    - https://www.w3.org/blog/news/archives/9151
- Chartering
  - Web Application Security Working Group Charter extended until 30 September 2021
    - https://lists.w3.org/Archives/Public/public-new-work/2021Jul/0012.html
  - Call for Participation: Media Working Group Charter Approved; Join Media WG
    - https://lists.w3.org/Archives/Public/public-new-work/2021Jul/0010.html
  - Proposed W3C Charter: Portable Network Graphics (PNG) Working Group (until 2021-08-18/19)
    - https://lists.w3.org/Archives/Public/public-new-work/2021Jul/0008.html
  - Proposed W3C Charter: Spatial Data on the Web Working Group (until 2021-08-16/17)
    - https://lists.w3.org/Archives/Public/public-new-work/2021Jul/0005.html
  - Internationalization Working Group and Interest Group Charters extended until 30 September 2021
    - https://lists.w3.org/Archives/Public/public-new-work/2021Jul/0003.html
  - **Federated Identity Community Group created**
    - https://lists.w3.org/Archives/Public/public-new-work/2021Jul/0002.html

#### Other

- **Trusted Types**
  - Special mtg on Trusted Types: send timing preferences
    - https://lists.w3.org/Archives/Public/public-webappsec/2021Jul/0006.html
    - Trusted Types をこのまま WebAppSec で続けるかと言う議論
  - [trusted-types] Mid 2021 report
    - https://lists.w3.org/Archives/Public/public-webappsec/2021Jul/0003.html
    - https://docs.google.com/document/d/1m91JZWKAGOR3jQoicMVE9Ydcq79gM2BetcRIBemrex8/view
    - Google が TT の導入についてまとめたレポート
  - CfC to publish as an FPWD. · Issue #342 · w3c/webappsec-trusted-types
    - https://github.com/w3c/webappsec-trusted-types/issues/342
    - Trusted Types の FPWD に mozilla が反対し始めた
- Job: Web Accessibility Development and Operations Lead, based in Europe
  - https://www.w3.org/blog/news/archives/9174
- Last call to apply for the TPAC 2021 Inclusion Fund
  - https://www.w3.org/blog/news/archives/9161
- New video introduces TPAC - our annual conference
  - https://www.w3.org/blog/news/archives/9146
- Accessibility accommodations now part of all W3C workshops
  - https://www.w3.org/blog/news/archives/9142
- **Re-add JSON module scripts · whatwg/html@d554d6d**
  - https://github.com/whatwg/html/commit/d554d6de43f6a366d0062c443ec1c7d7b4a310a3
- **Introduce CSS module scripts · whatwg/html@3d45584**
  - https://github.com/whatwg/html/commit/3d45584d286e9455cc24ebae1f3aca3db120dc9d

### TC39 動向

#### Meeting

- 2021-07
  - https://github.com/tc39/agendas/blob/master/2021/07.md

#### Proposals Diff

- https://github.com/tc39/proposals/compare/master@{2021-07-01}...master@{2021-08-01}
- https://tc39.github.io/beta/
- 0->1
  - ArrayBuffer to/from Base64
  - Array Grouping
- 1->2
- 2->3
  - Intl Enumeration API
  - Intl.NumberFormat v3
  - Realms (Callable Boundary)
- 3->4
  - Ergonomic Brand Checks for Private Fields

#### New Proposals

- **Proposal to add argument for .trim(), .trimStart() and .trimEnd() to allow strip the specified characters from strings.**
  - https://github.com/Kingwl/proposal-string-trim-characters
- **TC39 proposal for ArrayBuffer\<->base64 string functions**
  - https://github.com/tc39/proposal-arraybuffer-base64
- **A proposal to make grouping of array items easier**
  - https://github.com/tc39/proposal-array-grouping

#### Other

- Node v16.5.0 (Current) | Node.js
  - https://nodejs.org/en/blog/release/v16.5.0/
  - Experimental Web Streams API

### IETF 動向

#### WG

- IETF111 San Francisco
  - 来月めとめる
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - **Revised HTTP core specifications submitted (drafts 17)**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0114.html
  - **Working Group Last Call: HTTP/2 revision**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0091.html
  - I-D Action: draft-ietf-httpbis-targeted-cache-control-00.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0115.html
  - **Last Call: (The Proxy-Status HTTP Response Header Field) to Proposed Standard**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0089.html
  - #904: Content on GET requirement strength
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0065.html
  - #879: Should servers interpret Transfer-Encoding in 1.0 requests?
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0042.html
  - UDP source ports for HTTP/3 and QUIC
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0053.html
  - I-D Action: draft-ietf-httpbis-http2bis-03.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0041.html
  - I-D Action: draft-ietf-httpbis-priority-04.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0040.html
  - **Last Call: (Building Protocols with HTTP) to Best Current Practice from The IESG**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0037.html
  - I-D Action: draft-ietf-httpbis-cache-header-09.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0030.html
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

#### Fastly

- **Compute@Edge: the JavaScript support you demanded without cold starts or increased security risks | Fastly**
  - https://www.fastly.com/blog/compute-edge-now-supports-javascript
  - https://www.publickey1.jp/blog/21/fastlyjavascriptwebassemblycdncomputeedge.html
  - Fastly 上の WASM 実行環境で JS がサポートされた
  - AssemblyScript で WASM に変換するのではなく、 SpiderMonkey の WASM 版を使う方向に
  - JS もデプロイ時に最適化処理するので高速に起動できる

#### Other

- **一時的なサービス障害の概要について(ステータス:解決済) - Akamai Japan Blog**
  - https://blogs.akamai.com/jp/2021/07/post-24.html

### セキュリティ動向

- **2021.06.08 Certificate Lifetime Incident (valid for an extra one second) - Incidents - Let's Encrypt Community Support**
  - https://community.letsencrypt.org/t/2021-06-08-certificate-lifetime-incident-valid-for-an-extra-one-second/153426
  - Let's Encrypt の証明書が 90 日ではなく 90 日 + 1 秒になっていて修正
  - 有効期間は "not before" と "not after" で定義するが、 "not after" はその時間を含むため
  - 1s 減らした修正を発覚から 8h でデプロイした
  - 1.8 億の証明書に影響するが仕様違反なわけではないため失効はしない
  - **Yeti 2022 not furnishing entries for STH 65569149**
  - https://groups.google.com/a/chromium.org/g/ct-policy/c/PCkKU357M2Q/m/xbxgEXWbAQAJ
  - CT Log の一つが計算の結果エラーになることが発覚
  - オペレーションのエラーではなくハードウェアエラーで 1bit 反転したのが原因の模様
  - 「宇宙線(Cosmic Ray)が原因では」という話があり HN が盛り上がってる
  - https://news.ycombinator.com/item?id=27728287

### 周辺動向

- **WorldWideWeb のソースコードの NFT が約 6 億円で落札**
  - https://www.gizmodo.jp/2021/07/worldwideweb-nft.html
  - https://www.sothebys.com/en/buy/auction/2021/this-changed-everything-source-code-for-www-x-tim-berners-lee-an-nft/source-code-for-the-www
  - 1990/10/3 に書かれた Sir TBL の www のコードが NFT で出品される
  - 約 1 万行のコードと、コードを表示した動画、 SVG 、 TBL のメッセージ README が同梱
  - サザビーズで 543 万ドルで落札(6 万円/行)され、収益はチャリティへ
  - 動画の中の `<>` が何故か `&lt; &gt;` にエンコードされて表示されていた
    - https://github.com/cynthia/WorldWideWeb
- **Chrome 100 - Does it break user agent checking?**
  - https://paul.kinlan.me/chrome-100/
    - Chrome の version が 100 を超えたら UA は壊れるか?
    - M10 のときは "Chrome 10" で始まるかを確認してるサイトがあったらしい
    - HTTP Archive で調べたがそこでは結果は少なかった
- **Encoding data for POST requests - JakeArchibald.com**
  - https://jakearchibald.com/2021/encoding-data-for-post-requests/
    - URLSearchParams / FormData の話
- **The Core Web Platform Loop - Infrequently Noted**
  - https://infrequently.org/2021/07/the-core-web-loop/
- **Hobson's Browser - Infrequently Noted**
  - https://infrequently.org/2021/07/hobsons-browser/

### イベント

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
  - COEP: credentialless
  - Subresource Web Bundle OT 終了
  - Error Cause
  - `Object.hasOwn()`
  - prefer: CurrentTab と mozilla の position
  - UA-CH と windows の version を細かくする話
  - Cookie Size Limits
  - CORS non wildcard に Authorization を追加の話
  - SW Subresource Filter
  - URLPattern
  - Cross iframe の alert()/confirm() prompt と互換性の話
  - Lazyloading しすぎて LCP が遅くなる話
  - RenderingNG, TablesNG
  - Phishing Detection のカラープロファイルの話
  - HTTPS First
- Firefox
  - Smart Block2
  - Fetch Metadata Support
  - Canvas Conic Gradient
  - Canada で DoH 開始
- Safari
  - Ergonomic Brand Check
  - Picture source width
  - PCM の report fraud 対策
- Edge
  - VSCode integration
  - WebView2 と Electron
- W3C
  - Sanitizer API が FPWD
  - Trusted Types の FPWD に Mozilla が反対
  - Federated Identity Community Group created
  - JSON Module, CSS Module が HTML に追加
- TC39
  - Realm to Stage3
  - ArrayBuffer from/to Base64
  - Array grouping to stage 0
  - Node@16.5 WHATWG Stream support
- IETF
  - HTTPbis v17 IESG
  - HTTP2bis WGLC
  - Proxy Status WGLC
  - HTTP BCP WGLC
- CDN
  - Akamai DNS 障害
- セキュリティ
  - Let's Encrypt の 90 日 + 1 秒の話
  - 宇宙線の 1bit 反転で CT が壊れた話
- 周辺動向
  - WWW のコードが NFT で 6 億
  - Jake の URLSearchParams/FormData blog
