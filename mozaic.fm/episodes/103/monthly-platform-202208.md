---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep103.mp3
published_at: 2022-09-04
guest: [@myakura](https://twitter.com/myakura)
---

# ep103 Monthly Platform 202208

## Theme

第 103 回のテーマは 2022 年 08 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 105

#### Updates

- **New in Chrome 104**
  - https://developer.chrome.com/en/blog/new-in-chrome-104/
  - Specify a crop area with region capture
  - Easier media queries with level 4 syntax and evaluation
  - Shared Element Transitions start new origin trial
- Chromium Blog: Chrome 105 Beta: Custom Highlighting, Fetch Upload Streaming, and More
  - https://blog.chromium.org/2022/08/chrome-105-beta-custom-highlighting.html
  - Custom Highlight API
  - Container Queries
  - `:has()` Pseudo Class
  - Fetch Upload Streaming
  - Window Controls Overlay for Installed Desktop Web Apps
  - Origin Trials
    - Completed Origin Trials
    - Media Source Extensions in Workers
    - Viewport-height Client Hint
  - Other Features in this Release
    - Accurate Screen Labels for Multi-Screen Window Placement
    - CSS: Preventing Overscroll Effects for Fixed Elements
    - DisplayMediaStreamConstraints.systemAudio
    - Expose TransformStreamDefaultController
    - HTML Sanitizer API
    - `import.meta.resolve()`
    - Improvements to the Navigation API
    - onbeforeinput Global Event Handler Content Attribute
    - Opaque Response Blocking v0.1
    - Picture-in-Picture API Comes to Android
    - `Response.json()`
    - Syntax Changes to Markup Based Client Hints Delegation
    - Writable Directory Prompts for the File System Access API
  - Deprecations, and Removals
    - Remove WebSQL in Non-secure Contexts
    - CSS Default Keyword is Disallowed in Custom Identifiers
    - Deprecations in the Navigation API
    - Deprecate Non-ASCII Characters in Cookie Domain Attributes
    - Remove Gesture Scroll DOM Events
- **New in Chrome 105**
  - https://developer.chrome.com/en/blog/new-in-chrome-105/
  - Container queries and the `:has()` CSS property
  - Sanitizer API
  - Deprecating Web SQL for non-secure contexts
- **Deprecations and removals in Chrome 105**
  - https://developer.chrome.com/en/blog/deps-rems-105/
  - Remove Web SQL in non-secure contexts
  - **CSS default keyword is disallowed in custom identifiers**
  - Deprecations in the Navigation API
  - Deprecate non-ASCII characters in cookie domain attributes
  - Remove Gesture Scroll DOM Events
- **What's New In DevTools (Chrome 105)**
  - https://developer.chrome.com/en/blog/new-in-devtools-105/
  - **Step-by-step replay in the Recorder**
  - Support mouse over event in the Recorder panel
  - Largest Contentful Paint (LCP) in the Performance insights panel
  - Identify flashes of text (FOIT, FOUT) as potential root causes for layout shifts
  - Protocol handlers in the Manifest pane
  - Top layer badge in the Elements panel
  - Attach Wasm debugging information at runtime
  - Support live edit during debugging
  - **View and edit `@scope` at rules in the Styles pane**
  - Sourcemap improvements
  - Miscellaneous highlights
- **Chromium Blog: Chrome 106 Beta: New CSS Features, WebCodecs and WebXR Improvements, and More**
  - https://blog.chromium.org/2022/09/chrome-106-beta-new-css-features.html
  - Origin Trials
    - **Anonymous iframes**
    - **Pop-Up API**
  - Other Features in this Release
    - Client Hints persistency in Android WebView
    - CSS
      - grid-template properties interpolation
      - **'ic' length unit**
      - `preserve-parent-color` value for the `forced-color-adjust` CSS property.
      - Unprefix -webkit-hyphenate-character property
    - **JavaScript: Intl.NumberFormat v3 API**
    - SerialPort BYOB reader support
    - WebCodecs dequeue event
    - WebXR Raw Camera Access
  - Deprecations, and Removals
    - Remove non-ASCII characters in cookie domain attributes
    - **Remove HTTP/2 push**
- **Deprecations and removals in Chrome 106**
  - https://developer.chrome.com/en/blog/deps-rems-106/
  - Remove non-ASCII characters in cookie domain attributes
  - Remove HTTP/2 push
  - **Remove Persistent Quota**

#### Intents

- **Ship: CSS 'ic' Length Unit**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Pw4cLvAUGco
  - "水" 一文字の大きさを基準とした単位
    - 仕様を変えよう運動が起こって intent が止まった
  - > We support the spec change, but since it won't have any impact on implementation details we'll continue to ship in parallel with the spec consideration.
    - 実装は水のままにするらしい
- Ship: ContentVisibilityAutoStateChanged event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/E3RJj4nmWrM
- Ship: Unprefix -webkit-hyphenate-character CSS property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mVlDAHZge5g
- Ship: Prerender2 for Desktop
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cY68NkAqREg
- Ship: Render-blocking status in Resource Timing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0Md9xYf53gs
- Ship: WebXR Raw Camera Access
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LoCH4tthbsI
- Ship: accent-color CSS property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WwYkLjbGhoA
- **Ship: `tech()` function support in @font-face src: descriptor**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_9k-Ne8FRu4
  - font を選択する上で、必要になる機能(tech)をサポートしたものを選ばせるための機能
- Ship: `AudioContext.setSinkId()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mdOF67Z-hXc
- Prototype and Ship: WebCodecs dequeue event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fjC02PGAswo
- Prototype and Ship: Client Hints persistency in Android WebView
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/N_Y40YIHMtI
- Prototype and Ship: SerialPort BYOB reader support
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/M5xrITaEs9o
- **Prototype and Ship: Wildcards in Permissions Policy Origins**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/biH6g79KclA
  - サブドメインをワイルドカードにした Policy 範囲の指定ができる
  - これまではサブドメインを列挙する必要があった
  - これ A-C-A-O でも使えるのでは?
- Implement and Ship: Rich PWA installation dialogs - desktop
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HWXv_04ORyU
- **Implement and Ship: User-Agent Reduction Phase 5 (platform and OsCpu reduction)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kC-AeZ1fSdY
  - 2022 年 10 月から始まる UA Reduction Phase 5(デスクトップ OS のバージョン固定)の展開について
  - 古い Windows で影響が出るかもしれないので影響を見ながら少しずつ展開していく
  - Chrome 107 時点では 1% で、 3 ヶ月ほどかけ徐々に増やす
  - 2023 年 2 月上旬に 100% 予定
- Prototype: PerformanceResourceTiming.deliveryType
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0if9oQR2GCs
- Prototype: PaymentHandler - connect-src CSP policy
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jklZJYcOVyg
- Prototype: FileSystemHandle Unique IDs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gx0LC8yX1W0
- Prototype: Scoped Custom Element Registry
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/um-9YjJWyEQ
- Prototype: WebAuthn devicePubKey extension support
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VT-ESGZ5eME
- Prototype: requestStorageAccessForSite
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Gwb_aTskA88
- Ready for Trial: Quick intensive timer throttling of loaded background pages
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/j095jobY9Qw
- Experiment: Align Timers (including DOM timers) at 125 Hz
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/POCUbyCqnrc
- Experiment: The Pop-Up API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Sp5UI7RaaGg
- Experiment: TLS Encrypted Client Hello (ECH)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KrPqrd-pO2M
- **Origin Trial on WebView moving to 10% stable roll-out**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qxZrsSCYJU0
- Extend Experiment 2: Web app launch handler
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3jO8Ij2UZoI
- Extend Experiment: LazyEmbeds
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DjYa9xaoHhs
- Extend Experiment: User-Agent Reduction Origin Trial
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jjGeFtHhak4
- Extend Experiment: CHIPS
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MKQODOL0Fso
- Extend Experiment: Conditional Focus
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CLmSojRQHoc
- Extend Experiment: Federated Credentials Management API (FedCM)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Juc7ix6UI24
- Change:
- Unship:
- PSA: Chrome will start ignoring touch-action changes at pointerdown, again!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/APeuu5hH8NI
- PSA: Enforce CORS in subresource SignedExchange prefetching
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/86XtR41pNVI
- PSA: History Manipulation Intervention
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/T8d4_BRb2xQ
- Action required: You're invited to BlinkOn 17 on Nov 15-17th!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bmEvNTLNPbU
- Ready for Trial: TLS ClientHello extension permutation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zdmNs2rTyVI
- **Seeking feedback on `<model>` element proposal**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4sw9JYPub_Q
- Reminder: Registration for BlinkOn 17 is open!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0NtqfBwQc6E

#### V8

#### Other

- web.dev
  - CSS border animations
    - https://web.dev/css-border-animations/
  - Finer grained control over CSS transforms with individual transform properties
    - https://web.dev/css-individual-transform-properties/
  - Creative list styling
    - https://web.dev/creative-list-styling/
  - How Nordhealth uses Custom Properties in Web Components
    - https://web.dev/custom-properties-web-components/
  - Why is CrUX data different from my RUM data?
    - https://web.dev/crux-and-rum-differences/
  - **New to the web platform in August**
    - https://web.dev/web-platform-08-2022/
    - Individual transforms
    - New media query syntax
    - Container queries
    - The `:has()` parent pseudo-class
    - Sanitizer API
    - The `findLast()` and `findLastIndex()` methods
  - Is it :modal?
    - https://web.dev/is-it-modal/
- google developer blog
  - https://developers.googleblog.com/
- google developer japan blog
  - Google Developers Japan: Google Chrome のハッシュベース セーフ ブラウジングの仕組み
    - https://developers-jp.googleblog.com/2022/08/hash-based-safe-browsing.html
  - Google Developers Japan: Chrome 105 ベータ版 : カスタム ハイライト、フェッチ アップロード ストリーミングなど
    - https://developers-jp.googleblog.com/2022/08/chrome-105.html
- chrome developer blog
  - **Meet the top layer: a solution to z-index:10000**
    - https://developer.chrome.com/en/blog/what-is-the-top-layer/
  - DevTools Tips: How to inspect CSS grid
    - https://developer.chrome.com/en/blog/devtools-tips-7/
  - Can browsers optimize the loading of third-party resources?
    - https://developer.chrome.com/en/blog/third-party-scripts/
  - Changes to NavigateEvent in Chrome 105
    - https://developer.chrome.com/en/blog/navigateevent-intercept/
  - **`@container` and `:has()`: two powerful new responsive APIs landing in Chromium 105**
    - https://developer.chrome.com/en/blog/has-with-cq-m105/
  - **`:has()`: the family selector**
    - https://developer.chrome.com/en/blog/has-m105/
  - DevTools Tips: Get actionable insights on your website's performance
    - https://developer.chrome.com/en/blog/devtools-tips-8/
  - DevTools Tips: How to inspect and modify CSS animations
    - https://developer.chrome.com/en/blog/devtools-tips-12/
  - Web custom formats for the Async Clipboard API
    - https://developer.chrome.com/en/blog/web-custom-formats-for-the-async-clipboard-api/
  - **Removing HTTP/2 Server Push from Chrome**
    - https://developer.chrome.com/en/blog/removing-push/
  - Open sourcing the FLEDGE Key/Value service
    - https://developer.chrome.com/en/blog/open-sourcing-fledge-key-value-service/
  - FLEDGE services for Chrome and Android
    - https://developer.chrome.com/en/blog/fledge-service-overview/
  - **Prepare for User-Agent Reduction changes in October**
    - https://developer.chrome.com/en/blog/user-agent-reduction-oct-2022-updates/
    - 10 月の M107 から Phase 5 がロールアウトされていく
    - デスクトップの OS バージョンが固定される
  - DevTools Tips: How to speed up your workflow with Console shortcuts
    - https://developer.chrome.com/en/blog/devtools-tips-13/
  - Optimizing Images with the Angular Image Directive
    - https://developer.chrome.com/en/blog/angular-image-directive/
  - Compression and decompression in the browser with the Compression Streams API
    - https://developer.chrome.com/en/blog/compression-streams-api/
  - **Deprecating and removing Web SQL**
    - https://developer.chrome.com/en/blog/deprecating-web-sql/
  - Case Study: Better Angular Debugging with DevTools
    - https://developer.chrome.com/en/blog/devtools-better-angular-debugging/
  - Modern web debugging in Chrome DevTools
    - https://developer.chrome.com/en/blog/devtools-modern-web-debugging/
  - Anonymous iframe origin trial: Easily embed iframes in COEP environments
    - https://developer.chrome.com/en/blog/anonymous-iframe-origin-trial/
  - Participate in early testing for Storage Partitioning
    - https://developer.chrome.com/en/blog/storage-partitioning-dev-trial/
  - DevTools Tips: How to inspect and debug CSS flexbox
    - https://developer.chrome.com/en/blog/devtools-tips-6/
  - Federated Credential Management API (FedCM) origin trial extended
    - https://developer.chrome.com/en/blog/fedcm-origin-trial-extended/
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel

### Firefox 動向

#### Stable: 104

#### Updates

- **Firefox 104.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/104.0/releasenotes/
- **Firefox 104 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/104
    - `Array.findLast()` / `Array.findLastIndex()`
    - `element.focus({ focusVisible })`
- **1750972 - Re-enable same-site schemeful**
  - https://bugzilla.mozilla.org/show_bug.cgi?id=1750972
  - Firefox 104 で Schemeful SameSite が再び有効に

#### Intents

- Prototype and Ship: TextDecoderStream and TextEncoderStream
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/QtcGTx8gJWQ
- **Prototype: COLRv1 (enhanced color font format) support**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/u7gjLLRkfy0
- **Prototype: JavaScript decorators proposal**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/wAomN2An7NQ
- Prototype: OriginPrivateFileSystem
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/gc4BxcgkN7E
- Unship: `contentReadOnly` and `insertBROnReturn` editing commands in early beta builds
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/B5tjHHdfqbw
- Unship: "invalid-markup" error message for invalid MathML markup
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/lGPBzvOIKpk

#### Other

- Engineering Effectiveness Newsleter (July 2022 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/R7ZXzdEXU4Q
- Firefox Security Newsletter/FSN-2022-Q2 - MozillaWiki
  - https://wiki.mozilla.org/Firefox_Security_Newsletter/FSN-2022-Q2
- **Origin Trials - MozillaWiki**
  - https://wiki.mozilla.org/Origin_Trials
- SpiderMonkey Newsletter (Firefox 104-105)
  - https://spidermonkey.dev/blog/2022/08/29/newsletter-firefox-104-105.html
- **Positive, neutral, and negative positions**
  - https://github.com/mozilla/standards-positions/pull/680

### Safari 動向

#### Stable: 15.6.1

#### Updates

- **Release Notes for Safari Technology Preview 151**
  - https://webkit.org/blog/13093/release-notes-for-safari-technology-preview-151/
  - CSS
    - **Enabled support for the color-mix() function (252716@main)**
    - **Enabled support for specifying the interpolation color space in CSS gradients (252716@main)**
    - **Added support for the scan media query (252717@main)**
    - **Added a basic implementation of :dir (252737@main)**
  - Rendering
    - Added dark mode support for plain text documents (252673@main)
    - Added a check for WebGL Extensions in `getIndexedParameter()` and `getSamplerParameter()` (252895@main)
  - Media
    - Added support for legacy VP8 and VP9 codec names (252535@main)
    - Added missing default CSS style for text and background colors for WebVTT (252464@main)
  - JavaScript
    - **Removed ordering check for Intl.NumberFormat, Intl.DateTimeFormat, and Intl.PluralRules range functions (252911@main)**
  - Web API
    - Aligned `StorageEvent.initStorageEvent()` with the HTML specification (252521@main)
    - Aligned XHR aborting with the specification (252611@main)
  - Web Components
    - Updated shadow DOM and dialog element focusing to the latest spec (252959@main)
    - Updated delegatesFocus to match the latest spec (252901@main)
- **Release Notes for Safari Technology Preview 152**
  - https://webkit.org/blog/13137/release-notes-for-safari-technology-preview-152/
  - JavaScript
    - **Enabled and renamed `Array#groupBy` to `Array#group` and `Array#groupByToMap` to `Array#groupToMap` (253101@main)**
  - Web API
    - Implemented Compression Streams API (253093@main)

#### Other

- **Using `:has()` as a CSS Parent Selector and much more**
  - https://webkit.org/blog/13096/css-has-pseudo-class/
  - `:has()` が革命的だという話
- **WebKit on GitHub!**
  - https://webkit.org/blog/13140/webkit-on-github/
  - Git と GitHub へ移行した
  - 時代遅れの CHANGELOG ファイルから git log に移った
  - 新規開発者はみんな git-svn 使ってた
  - GitHub エコシステムを用いて開発が効率化できた
- Speedometer 2.1
  - https://webkit.org/blog/13083/speedometer-2-1/

### Edge 動向

#### Stable: 105

#### Updates

- **Version 104.0.1293.47: August 5 Microsoft Edge release notes for Stable Channel**
  - https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel#version-1040129347-august-5
    - Enhanced security mode が導入
    - Strict にすると JIT が無効になる
    - Browse more safely with Microsoft Edge | Microsoft Docs
    - https://docs.microsoft.com/en-us/deployedge/microsoft-edge-security-browse-safer
- **The new sidebar in Microsoft Edge helps you multitask smarter**
  - https://blogs.windows.com/msedgedev/2022/09/01/microsoft-edge-sidebar-multitask-smarter/

#### Chakra

#### Other

- **"A friendly reminder that OT tokens for Chrome also work in Edge"**
  - https://twitter.com/slightlylate/status/1559623799762407424
  - Chrome の Origin Trial のトークンは Edge でも動くらしい
- Passkeys - Syncable WebAuthN credentials - text/plain
  - https://textslashplain.com/2022/08/05/passkeys/
- Understanding Browser Channels - text/plain
  - https://textslashplain.com/2022/08/04/understanding-browser-channels/
- **Certificate Revocation in Microsoft Edge - text/plain**
  - https://textslashplain.com/2022/08/01/certificate-revocation-in-microsoft-edge/
- Basic Authentication Deprecation in Exchange Online - September 2022 Update - Microsoft Tech Community
  - https://techcommunity.microsoft.com/t5/exchange-team-blog/basic-authentication-deprecation-in-exchange-online-september/ba-p/3609437

### WHATWG/W3C 動向

#### Draft

- Recommendation
  - **Geolocation API is a W3C Recommendation**
    - https://www.w3.org/blog/news/archives/9660
    - Living Standard にしたいので "Level N" といった表記をやめた
- Proposed Recommendation
- Candidate Recommendation
  - W3C Invites Implementations of Web Share API
    - https://www.w3.org/blog/news/archives/9655
- Working Draft
- First Public Working Draft
  - First Public Working Draft: Verifiable Credentials Data Model v2.0
    - https://www.w3.org/blog/news/archives/9650
- Chartering

#### Other

- **TPAC topics -- please contribute to this list**
  - https://lists.w3.org/Archives/Public/public-webappsec/2022Aug/0005.html
- **[css-values-4][css-writing-modes-4] Revisit decision to use 永 instead of 水 as the ic unit**
  - https://github.com/w3c/csswg-drafts/issues/7577
  - `ic` が参照する文字を "水" から "永" に変えようという運動
    - Chrome の intent を見て違和感を持った中国の開発者が SNS で盛り上がった
    - 永字八法(運筆すべてが "永" に入っていること)に馴染み深いこと、タイポグラフィでも基本の文字になっていることから
  - "水" は Writing Modes の縦中横の大きさを決める文字としても使われており、変更すると breaking change になる
    - Level 3 は勧告もしているので、変更にはプロセス的にも負荷のある作業
  - Chromium では仕様の変更には賛成するが、"水" と "永" で幅が変わることはないことから、内部的な実装は "水" のままにするらしい
  - 仕様と実装がばらけるのでそれは避けたいという話になっている
- **[selectors] The forgiving nature of :has breaks jQuery when used with a complex :has selector**
  - https://github.com/w3c/csswg-drafts/issues/7676
  - Chrome 105 で `:has()` が有効になったところ、 jQuery が壊れた
  - jQuery は昔から `:has()` セレクタや、`:contains` などを独自拡張として持っていた
    - `$()` のセレクタはまずブラウザ `querySelectorAll()` に渡され、 fail したら jQuery のエンジンに渡すようになっている
    - `ul:has(li:contains('Item'))` といったセレクタはこれまで jQuery で処理されるようになっていた
  - ネイティブ `:has()` の引数は forgiving selector list をとり、中のセレクタに invalid なものがあっても fail しない
    - なので jQuery 内の `:has()` がネイティブ実装を参照し続け、 jQuery のエンジンにフォールバックしなくなってしまった

### TC39 動向

#### Meeting

- 2022-07
  - https://github.com/tc39/agendas
    - https://github.com/tc39/agendas/blob/main/2022/07.md
  - https://github.com/tc39/notes
    - https://github.com/tc39/notes/blob/main/meetings/2022-07/jul-19.md
    - https://github.com/tc39/notes/blob/main/meetings/2022-07/jul-20.md
    - https://github.com/tc39/notes/blob/main/meetings/2022-07/jul-21.md
    - Change Array By Copy Update (Issue 95)
      - TypedArray には splice がないので、 toSpliced は無くす
      - TA は長さが変えられないから splice できない
      - Bun が Change array by copy を使う最初の platoform
    - Well-formatted PDFs for TC39 Standards in 2022 and Beyond
      - 仕様の PDF をよくしていこう
    - Remove Order Check in NumberFormat v3 and ECMA402 DateTimeFormat
      - 「12 月から 2 月」みたいなレンジが, x > y だとエラーになるような仕様だと invalid になるが、実際には来年の 2 月であることがリアルワールドユースケースなので、レンジの検証を仕様から無くす
    - Temporal Update
      - 細かい修正を無限にやってる
    - Function.pipe & flow for Stage 1
      - 関数の合成系のやつ
      - pipeline operator とは被るが、トレードオフが違うらしい

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2022-08-01}...main@{2022-09-01}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->3
- 3->4

#### New Proposals

#### Other

### IETF 動向

#### WG

- IETF 114
  - https://datatracker.ietf.org/meeting/
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - **RFC 9292 on Binary Representation of HTTP Messages**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JulSep/0128.html
  - Draft minutes from IETF 114 from Tommy Pauly
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JulSep/0054.html
  - **Call for Adoption: draft-tus-httpbis-resumable-uploads-protocol-02**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JulSep/0055.html
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
  - Cloudflare の不正利用に対するポリシーとその取り組み
    - https://blog.cloudflare.com/cloudflares-abuse-policies-and-approach-ja-jp/
- Developers
  - **Running Zig with WASI on Cloudflare Workers**
    - https://blog.cloudflare.com/running-zig-with-wasi-on-cloudflare-workers/
- Deep Dive
  - Deep dives & how the Internet works
    - https://blog.cloudflare.com/deep-dives-how-the-internet-works/

#### Fastly

#### Other

### セキュリティ動向

- **「Apple でログイン」によるログイン機能廃止のお知らせ|コインチェック株式会社**
  - https://corporate.coincheck.com/news/Zj9osP2j

### 周辺動向

- **All Change, Still Purple. | by Daniel Appelquist**
  - https://medium.com/@torgo/all-change-still-purple-b7430e84afa

### イベント

- 9 月
  - 12-16: TPAC 2022 Vancouver
    - https://www.w3.org/wiki/TPAC/2022
  - 13-16: TC39 Tokyo
    - https://github.com/tc39/agendas/blob/main/2022/09.md#agenda-for-the-92nd-meeting-of-ecma-tc39
- 10 月
- 11 月
  - 15-17: BlinkOn17
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/16LQXKmAD4s

### Wrap Up

- Chrome
  - 105
    - Container Queries
    - `:has()`
    - Fetch Upload Streaming
    - Sanitizer API
    - `import.meta.resolve()`
    - `Response.json()`
    - Remove SQL in non-secure contexts
  - 106 Beta
    - Anonymous iframes
    - Pop-up API
    - Intl.NumberFormat v3 API
    - Remove HTTP/2 Server Push
  - Ship
    - `ic` length unit
      - 水か永か
    - `@font-face` `tech()` function
    - Permissions Policy Origins にワイルドカード
    - UA Reduction Phase 5 (freezing desktop platform version)
  - other intents
    - Apple から `<model>` のフィードバック
  - Chrome Developers
    - top layer
    - Container Queries
    - `:has()`
    - Removing HTTP/2 Server Push
    - Deprecating and removing Web SQL
- Firefox
  - 104
    - `Array.findLast()`/`Array.findLastIndex()`
    - `element.focus({ focusVisible })`
  - Prototype
    - COLRv1
    - JavaScript decorators
  - other intents
  - other
    - Origin Trials (OffscreenCanvas and COEP: credentialless)
    - position signals が positive, neutral, negative に
- Safari
  - TP 151
    - `color-mix()`
    - scan media query
    - `:dir`
    - Range の ordering check 削除
  - TP 152
    - Array の rename #groupBy -> #group と #groupByToMap -> groupToMap
  - Blog
  - Other
    - `:has()` のブログ
    - Webkit on GitHub
- Edge
  - 104 で Enhanced Security Mode 導入
  - Chrome の OT Token が Edge でも動く
- W3C/WHATWG
  - Spec
    - Geolocation API in W3C Recommendation
      - Living Standard にして Level N を無くす
  - Other
    - `ic` での "水" か "永" か問題
    - `:has()` と forgiving selector list で jQuery の独自拡張 `:has()` が壊れる
- TC39
  - Meeting 2022-07
    - Change Array by Copy の toSplice 廃止
    - NumberFormat v3 の Range order check 廃止
- IETF
  - IETF 114
  - RFC 9292 Binary Representation of HTTP Messages
- CDN 動向
  - Zip with WASI on Cloudflare Workers
- セキュリティ動向
  - Coincheck が Sign in with Apple の廃止
- 周辺動向
