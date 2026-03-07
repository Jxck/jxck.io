---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep186.mp3
published_at: 2025-09-30
guests:
  - name: "@myakura"
    url: https://github.com/myakura
  - name: "@saku"
    url: https://x.com/sakupi01
---

# ep186 Monthly Platform 202509

## Theme

第 186 回のテーマは 2025 年 9 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 141

#### Updates

- **New in Chrome 140**
  - https://developer.chrome.com/blog/new-in-chrome-140
  - `ToggleEvent.source`
  - Use `counter()` and `counters()` in the alt text of the content property
  - The font-variation-settings descriptor is now supported in the `@font-face` rule
- What's new in DevTools, Chrome 140
  - https://developer.chrome.com/blog/new-in-devtools-140
- **Chrome 141 beta**
  - https://developer.chrome.com/blog/chrome-141-beta
  - CSS and UI
    - **ARIA Notify API**
    - Update hidden=until-found and details ancestor revealing algorithm
    - Support width and height as presentation attributes on nested `<svg>` elements
  - Web APIs
    - **Digital Credentials API (presentation support)**
    - **Navigation API: deferred commit (precommit handlers)**
    - Support restrictOwnAudio
    - echoCancellationMode for `getUserMedia()`
    - windowAudio for `getDisplayMedia()`
    - FedCM: Alternative Fields in Account Selection
    - IndexedDB `getAllRecords()` and direction option for `getAll()` and `getAllKeys()`
    - Speculation rules: desktop "eager" eagerness improvements
    - Strict Same Origin Policy for Storage Access API
    - Signature-based integrity
    - WebRTC Encoded Transform (Version 2)
  - Managed ChromeOS devices only
    - Permissions Policy for the Device Attributes API
  - New origin trials
    - Local network access restrictions
    - **Proofreader API**
    - Extend CSP script-src (also known as script-src-v2)
    - WebAssembly custom descriptors

  #### Intents

- Ship: Custom property enumeration in `getComputedStyle()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ELhr0cJgb7E
- Ship: `:target-before` and `:target-after` pseudo-classes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nbaExdcdszA
- Ship: Local network access restrictions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cwu_RUmBpzY
- **Ship: Mobile and desktop parity for select element rendering modes**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IYo0HgnfKwg
  - デスクトップとモバイルで、複数選択時の Customizable Select Element の見た目を標準化
- Ship: FedCM-Support Structured JSON Responses from IdPs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PZEUc-oxTVU
- **Ship: Removal of `X-Requested-With` in WebView**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Z70s8CQ8PbU
  - スレッドが更新
  - > We've ended the experiments removing the HTTP header as we were unable to provide a sufficient alternative, resulting in breakage to important abuse and fraud prevention use cases.
- Ship: Respect `overscroll-behavior` on `non-scrollable` scroll containers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OSq1yVSSdDE
- Ship: Support `download` attribute in SVG `<a>` element
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UQKcauCa8-o
- Ship: Interoperable pointerrawupdate events exposed only in secure contexts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KLXAD2tozQY
- Ship: FedCM-Support showing third-party iframe origins in the UI
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/96evJJzYWXk
- Ship: CSS ruby-overhangIntent to Prototype: CSS ruby-overhang property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cDjEhUgDiW8
- Ship: Interoperable pointerrawupdate events exposed only in secure contexts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KLXAD2tozQY
- **Ship: Interest Invokers (the `interestfor` attribute)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bX1G_yDt6W4
  - Anne (WebKit) が Oppose のコメントをしている状態
- Ship: WebTransport Application Protocol Negotiation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PfPf23iI0n0
- Ship: WebGPU: Texture formats tier1 and tier2
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4RXrc7Z5rto
- **Ship: ICU 77 (supporting Unicode 16)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zzN7erylAc4
  - CU ライブラリのバージョンが 74.2 から 77.1 にアップグレードされ、Unicode 16 のサポートが追加される。
  - 主な変更点は Intl および RegExp API、IDNA ルール、テキストセグメンテーションに関するもので、特に日本語の行分けが改善される。
  - イタリアの数値フォーマットの変更がリスクとされ、専用のフラグが設けられている。
- Ship: Stricter `*+json` MIME token validation for JSON modules
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nvLmxEkWdCU
- Ship: Implement CSS property `font-language-override`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UNoijyJrMmE
- Ship: Media session: add reason to enterpictureinpicture action details
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/R14R94qJerU
- Ship: ScrollIntoView container option
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bfnPvqLfVi4
- **Ship: Temporal in ECMA262**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/s58GKzoQZFg
  - Temporal は、ECMAScript における日付と時刻を扱うための新しい API であり、Math のようなグローバルオブジェクトとして機能する。
  - 現在、Safari を除くすべての実装者は、非 ISO カレンダー実装に ICU4X を使用しており、Safari はまだ非 ISO 部分をサポートしていない。
  - この API は Rust ライブラリの ICU4X を呼び出し、全ての Blink プラットフォーム(Windows、Mac、Linux、ChromeOS、Android、および Android WebView)でサポートされる予定である。
- Ship: WebGPU: Texture formats tier1 and tier2
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4RXrc7Z5rto
- Ship: WebTransport Application Protocol Negotiation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PfPf23iI0n0
  - WebTransport でアプリケーションの negotiation ができる
- **Ship: No-Vary-Search support for the HTTP disk cache**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_G2dhImS2yw/m/-YLVE3vIAgAJ
  - クエリを無視してキャッシュを使い回せるようにするヘッダ
  - ここまでは Speculation rules 周りでのみ有効になっていた
  - 全ての Disk Cache で有効になる。
- Ship: IDNA ContextJ rules
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wAys0Jln6ic
- Ship: contentEncoding in resource-timing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vQS7Ha59VtY
- Prototype: Prerendering cross-origin iframes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KP1f2UTqCgM
- Prototype: Local network access restrictions for WebSockets
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7v-JbvYUClg
- **Prototype: Email Verification Protocol**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pWfWupaOtJw
  - メールに magic link を送り、所有検証するフローの標準化
- Prototype: Overscroll Gestures
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/I2MWJNIZOn4
- Prototype: Delegation-oriented FedCM
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rwu9wFl0mF4
- **Prototype: Focusgroup**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DGFYzid2Qw8
  - focusgroup を Scoped Focusgroup として再出発。focusgroup は Non-active proposal に。
    - https://open-ui.org/components/scoped-focusgroup.explainer/
    - https://open-ui.org/components/focusgroup.explainer/
  - キーワードをつけることで自動で role を推論するようにし、role に基づいて正しく focus 利用できるように API デザインを変更
  - 従来の提案では任意の HTMLElement に適用可能な focusgroup だったため、結果的に role に整合しない不適切な focus の挙動を招く可能性があった
  - `focusgroup="toolbar wrap"`など
  - HTMLAttributes のみ、CSS 対応は将来的に
  - 2D Grid は一旦サポートしない
  - 最後にフォーカスされた要素を記憶する no-memory を追加
  - 特定の子要素をフォーカス除外にする `focusgroup="none"`を追加
- Prototype: Two-phase cross-document view transition
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Fxubib5QryQ
- Prototype: CSSOM Document.nodesFromRect API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WObIoIBCxrE
- Prototype: Local network access restrictions for WebTransport
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DAIKnQ12YNU
- Prototype: Exposing a string targetIdentifier attribute to EventTiming performance entries.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uFvDpA1DMGY
- Prototype: side-relative syntax for `background-position-x/y` longhands
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0pLmHZ4IbH0
- Prototype: CSSOM `Document.nodesFromRect` API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WObIoIBCxrE
- Prototype: Exposing a string targetIdentifier attribute to EventTiming performance entries.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uFvDpA1DMGY
- Prototype: Local network access restrictions for WebTransport
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DAIKnQ12YNU
- Prototype: Navigation API: expose destination in navigation.transition
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OT9eNXGb1AI
- Prototype: Policy-controlled feature `autofill`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xT5ZVuSo4HY
- **Prototype: Two-phase cross-document view transition**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Fxubib5QryQ
  - 新しいドキュメントの応答が到着した際にのみキャプチャされ、フレームのレンダリング準備が整ったときにのみ有効化される。
  - この遅延が長い場合、ユーザー体験が損なわれる可能性がある。
  - tow-phase を使用することで、ナビゲーション開始時に同一ドキュメントのビュー遷移を開始でき、commit との競合による突然のキャンセルを避けることができる。
  - この機能が仕様変更を必要とするか、内部スケジューリングの改善で実現可能かは不明であり、プロトタイピングが必要である。
- **Prototype: meta `name="text-scale"`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2F5g2dqy9_Q
  - OS-level font-size をドキュメント全体にオプトインする
- Prototype: side-relative syntax for `background-position-x/y` longhands
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0pLmHZ4IbH0
- Prototype: Gamepad `ongamepadconnected` and `ongamepaddisconnected` event handler attributes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Bx4wNGPiT7E
- **Experiment: Proofreader API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Gboyyec4qmg
  - `input type="text"` や `<textarea>` に内容の校閲を適用する
- Experiment: TCP Socket Pool per-Top-Level-Site
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DStqis1UcXo
- **Experiment: Extend CSP script-src (aka script-src-v2)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ftgVb8d091M
  - URL や`eval()`のハッシュに基づくスクリプトソースの許可メカニズムが導入される。
  - これにより、開発者は頻繁に変更されるスクリプト内容に対しても厳格なセキュリティポリシーを設定できるようになる。
  - 新しいキーワードは、ホストベースの script-src を上書きすることで、互換性を保つ。
- Extend Experiment: Web Authentication immediate mediation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hxF_-INNaYA
- Ready for Developer Testing: HTML in Canvas: drawElement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LYJyOdLbOfY
- Ready for Developer Testing: Local network access restrictions for WebSockets
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4gx2y5jPGbU
- Ready for Developer Testing: Compression Dictionary TTL
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pW8bjRXGNKs
  - 辞書の有効期限を指定する方法
- Ready for Developer Testing: Local network access restrictions for WebSockets
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4gx2y5jPGbU
- Change:
- Unship:
- Remove:
- PSA: Preventing User Dictionary Leaks via
  - `::spelling-error` and `::grammar-error` CSS Pseudo-Elements Explainer
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vF5Uc8Ltga8
- PSA: Respect overscroll-behavior on non-scrollable scroll containers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/p2edIq4J-eQ
- PSA: Cross-Tab Region Capture
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lMJIhP8D7Zs
- **Early PSA: Separate Defer Module Script Tasks**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5mEcZ8myqBw
  - 複数の遅延スクリプトが同一タスク内で実行される問題に対する修正が行われ、現在は実験的な「SeparateDeferModuleScriptTasks」フラグの下で利用可能である。
  - 修正により、特にインラインモジュールスクリプト間で`requestAnimationFrame` が実行可能となり、長いタスクの発生を抑制することが期待される。
  - HTML 仕様の変更が必要かどうかについての意見が求められており、修正はフラグの下で迅速にロールバック可能である。
- Web-Facing Change PSA: `::view-transition` position absolute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/a3ogwwiBFGQ
- Web-Facing Change PSA: Cross-Tab Region Capture
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lMJIhP8D7Zs

  #### Other

- web.dev
  - https://web.dev/
  - New to the web platform in August
    - https://web.dev/blog/web-platform-08-2025?hl=en
  - **Make your proposals for Interop 2026**
    - https://web.dev/blog/interop-2026-proposals
    - 🚀 Interop 2026 Reactions
      - https://foolip.github.io/interop-reactions/
  - The Baseline Tooling Hackathon starts now!
    - https://web.dev/blog/baseline-hackathon-2025?hl=en
  - August 2025 Baseline monthly digest
    - https://web.dev/blog/baseline-digest-aug-2025?hl=en
  - A refresh of Learn CSS with nine new modules
    - https://web.dev/blog/learn-css-refresh
    - Learn シリーズの CSS に新しいモジュールが追加
    - Baseline に到達したて・到達が見込まれる機能を中心に拡充
  - Browserslist now supports Baseline
    - https://web.dev/blog/browserslist-supports-baseline?hl=en
  - Join the WebDX CG for an AMA on Reddit
    - https://web.dev/blog/baseline-ama
  - Create Baseline tools with the web-features package
    - https://web.dev/articles/baseline-tools-web-features
- google for developers
  - https://developers.googleblog.com/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - https://developer.chrome.com/blog/
  - Origin trial: WebAuthn immediate mediation for frictionless sign-in
    - https://developer.chrome.com/blog/webauthn-immediate-mediation-ot
  - Check out the web AI demo collection
    - https://developer.chrome.com/blog/ai-demos
  - Build a helpful, powerful web in the Google Chrome Built-in AI Challenge 2025
    - https://developer.chrome.com/blog/ai-challenge-2025
  - CrUX Dashboard deprecation
    - https://developer.chrome.com/blog/crux-dashboard-deprecation
  - **Ready for developer testing: Scoped view transitions**
    - https://developer.chrome.com/blog/scoped-view-transitions-feedback
  - **Prevent clipping issues (and more) in view transitions by using nested view transition groups**
    - https://developer.chrome.com/docs/css-ui/view-transitions/nested-view-transition-groups
  - Join the Proofreader API origin trial
    - https://developer.chrome.com/blog/proofreader-api-ot
  - **Chrome DevTools (MCP) for your AI agent**
    - https://developer.chrome.com/blog/chrome-devtools-mcp
    - DevTools の MCP 対応
    - Verify code changes in real-time
    - Diagnose network and console errors
    - Simulate user behavior
    - Debug live styling and layout issues
    - Automate performance audits
    - ChromeDevTools/chrome-devtools-mcp: Chrome DevTools for coding agents
      - https://github.com/ChromeDevTools/chrome-devtools-mcp
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
- search blog
  - https://developers.google.com/search/
- v8
  - https://v8.dev/
- other
  - **Google's statement on DOJ proposed remedies in ad tech case**
    - https://blog.google/outreach-initiatives/public-policy/doj-ad-tech-case-sept-2025/
    - 司法省の判断に対してのコメント
  - **AddyOsmani.com - Google Chrome at 17 - A history of our browser**
    - https://addyosmani.com/blog/chrome-17th/
  - Beyond Sandbox Domains: Rendering Untrusted Web Content with SafeContentFrame - Google Bug Hunters
    - https://bughunters.google.com/blog/6715529872080896/beyond-sandbox-domains-rendering-untrusted-web-content-with-safecontentframe
  - **Go behind the browser with Chrome's new AI features**
    - https://blog.google/products/chrome/new-ai-features-for-chrome/
    - 米国で Gemini in Chrome が全ユーザーに提供開始
    - エージェントモード(Project Mariner)も今後数ヶ月以内に提供予定
  - Chrome: The browser you love, reimagined with AI
    - https://blog.google/products/chrome/chrome-reimagined-with-ai/
  - **Onward | Domenic Denicola**
    - https://domenic.me/retirement/
    - Domenic が Google を退社
    - リタイアなので別の会社に行くとかではなさそう

  ### Firefox 動向

  #### Stable: 143

  #### Updates

- Firefox 143.0, See All New Features, Updates and Fixes
  - https://www.firefox.com/en-US/firefox/143.0/releasenotes/
- Firefox 143 for developers - Mozilla | MDN
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/143
  - `<input type="color">` が #RRGGBB 以外の値も受け取れるように
  - `::details-content`
- Webcam previews and more! - These Weeks in Firefox: Issue 187
  - https://blog.nightly.mozilla.org/2025/09/12/webcam-previews-and-more-these-weeks-in-firefox-issue-187/
- Add-ons, Fixes, and DevTools Snacks - These Weeks in Firefox: Issue 188 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2025/09/19/add-ons-fixes-and-devtools-snacks-these-weeks-in-firefox-issue-188/
- Firefox 144 Highlights: Faster Add-ons, Smarter DevTools, and Tab Group Boosts
  - https://blog.nightly.mozilla.org/2025/09/22/firefox-144-highlights-faster-add-ons-smarter-devtools-and-tab-group-boosts-these-weeks-in-firefox-issue-189/

  #### Intents

- Ship: Framebusting Intervention
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/c6SJ4fEnTQQ/m/6w7zabvuAAAJ
- Ship: JavaScript Symbols as WeakMap keys
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/2bgW_e3ZZkU/m/qVIjg5G4AQAJ
- **Ship: CSS `-webkit-fill-available` sizing keyword in the `height` and `width` properties**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/JCUC9RJ74M8
  - `stretch` として標準化されたが、接頭辞に依存するサイトが多いのでまず接頭辞付きの値をリリースする
- Prototype:
- Change:
- Remove:
- Unship: `beforescriptexecute` and `afterscriptexecute` events
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/UNiabGqQ1YQ
  - Gecko 独自のイベントで標準にもならなかったため削除
- Unship: `PointerEvent.getCoalescedEvents()` in insecure context
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/dueCVbcrdKQ

  #### Newsletter

- Firefox WebDriver Newsletter 143 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-143/

  #### MDN / Open Web Docs

  #### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2025-09-01+
- Positive
  - Add IndexedDB getAllRecords() method and update getAll()/getAllKeys() to support direction option
    - https://github.com/mozilla/standards-positions/issues/1261
  - CSS Gap Decorations
    - https://github.com/mozilla/standards-positions/issues/1158
  - Change definition of select element list box and drop-down box rendering
    - https://github.com/mozilla/standards-positions/issues/1274
  - Change focus delegate for dialog to use flat tree to find focusable descendant
    - https://github.com/mozilla/standards-positions/issues/1292
  - Headingoffset & Headingreset attributes
    - https://github.com/mozilla/standards-positions/issues/1263
  - ScrollIntoViewOptions container attribute
    - https://github.com/mozilla/standards-positions/issues/1237
  - Storage Access Headers
    - https://github.com/mozilla/standards-positions/issues/1084
  - Updating QuotaExceededError to a DOMException derived interface
    - https://github.com/mozilla/standards-positions/issues/1223
  - WebGL drawingBufferStorage
    - https://github.com/mozilla/standards-positions/issues/943
  - WebGPU: ServiceWorker and SharedWorker support
    - https://github.com/mozilla/standards-positions/issues/971
  - [css-variables-1] Short-circuiting `var()`, `attr()`, `env()`
    - https://github.com/mozilla/standards-positions/issues/1224
  - ariaNotify API
    - https://github.com/mozilla/standards-positions/issues/1049
- Negative
  - Probabilistic Reveal Tokens
    - https://github.com/mozilla/standards-positions/issues/1273
  - Captured Surface Control
    - https://github.com/mozilla/standards-positions/issues/1061
- Defer
  - Realms Initialization Control
    - https://github.com/mozilla/standards-positions/issues/1062
  - CSS Import Once
    - https://github.com/mozilla/standards-positions/issues/939

  #### Other

- **Defending an open web: What the Google search ruling means for the future**
  - https://blog.mozilla.org/en/mozilla/internet-policy/defending-an-open-web/
  - 米国対グーグルの裁判において、裁判所はグーグルの検索契約に変更を命じ、ブラウザが異なる検索エンジンや生成 AI サービスを提供する柔軟性を持つことを認めた。
  - 小規模な独立ブラウザへの検索支払い禁止案は却下され、これにより競争が促進され、イノベーションが守られることが強調された。
  - データ共有の救済措置が求められ、ユーザーのプライバシーとセキュリティの保護が重要視され、真の競争が実現するための健全な市場の必要性が強調された。
- On Firefox for iOS, summarize a page with a shake or a tap
  - https://blog.mozilla.org/en/firefox/shake-to-summarize/
- **Firefox DNS privacy: Faster than ever, now on Android**
  - https://blog.mozilla.org/en/firefox/dns-android/
  - Firefox は、Android 向けに DNS-over-HTTPS(DoH)の機能を導入し、ユーザーはデスクトップと同様のプライバシー保護を享受できる。
  - 2025 年には、DoH のパフォーマンスが向上し、DNS 解決速度が前年比で 61%向上し、ネイティブ DNS 解決に近い速度を実現した。
  - Firefox は、ユーザーに DNS トラフィックの管理に関する選択肢を提供し、プライバシーとパフォーマンスの両立を重視している。
- Young people are outsmarting period tracking apps
  - https://blog.mozilla.org/en/internet-culture/period-tracking-apps/
- Mozilla Welcomes Raffi Krikorian as Chief Technology Officer
  - https://blog.mozilla.org/en/mozilla/leadership/mozilla-welcomes-raffi-krikorian-chief-technology-officer/
- 気づけば Firefox のコア開発者になっていた。「修正されないバグの報告」から始まった 25 年間
  - https://levtech.jp/media/article/focus/detail_725/
  - 中野さんインタビュー
- Extended Firefox ESR 115 Support for Windows 7, 8, and 8.1 and macOS 10.12-10.14 - Future Releases
  - https://blog.mozilla.org/futurereleases/2025/09/04/firefox-esr-115-support-for-windows-7-8-and-8-1-and-old-mac-os-versions-extended-until-march-2026/
  - Firefox ESR 115 が古い Windows や macOS のサポートを 2026 年 3 月まで延長
- Fast UDP I/O for Firefox in Rust | Max Inden
  - https://max-inden.de/post/fast-udp-io-in-firefox/

  ### Safari 動向

  #### Stable: 26

  #### Updates

- Submit your ideas for Interop 2026 | WebKit
  - https://webkit.org/blog/17320/submit-your-ideas-for-interop-2026/
  - Interop 2026 への提案募集が開始され、ウェブ開発者は互換性の課題に対する具体的な焦点エリアを提案することが求められている。
  - 提案は、テスト可能性とウェブ標準に基づくものである必要があり、具体的で影響力のある内容が求められる。
  - 提案の提出は GitHub で行い、他の人と協力して既存の提案を支援することが推奨されている。
- **Release Notes for Safari Technology Preview 227 | WebKit**
  - https://webkit.org/blog/17324/release-notes-for-safari-technology-preview-227/
  - Accessibility
    - **Added support for automatically scrolling off-screen `<input type="radio">` elements into view when they are focused, improving accessibility for users navigating with screen readers or keyboard shortcuts.**
  - Animations
    - Added support for endpoint-inclusive active intervals in `Animation.commitStyles()` to correctly persist styles for completed animations.
  - CSS
    - Added support for the cursor property on pseudo-elements.
    - Added support for the `position-visibility` property.
    - Added support for the new math-shift CSS property to control compact or "cramped" rendering of MathML formulas, reducing vertical shifts for superscripts.
    - Added support for remembering the last successful position-try fallback in CSS anchor positioning to reduce layout jumps when styles change.
    - Added support for position-try on pseudo-elements like `::before`, `::after`, and `::backdrop`.
    - Added support for non-integral decimal values in the initial-letter CSS property to allow fractional sizes.
    - **Added support for the field-sizing property.**
    - Added support for `@scope` implicit scoping roots with constructed and adopted stylesheets to correctly apply styles in shadow DOM.
    - **Added support for the scrollbar-color property.**
    - Added support for the generic math font family in font-family allowing better default rendering for MathML content.
  - Editing
  - Forms
    - Added support for normalizing full-width digits, minus signs, and full-width dots to ASCII in `<input type="number">` fields, immediately rejecting disallowed characters.
  - HTML
    - **Added support for command and commandfor attributes on buttons to provide a declarative way to control popovers and dialogs.**
  - Images
  - JavaScript
  - Networking
  - Rendering
  - SVG
    - Added support for the repeatEvent in SVG animations to align with the SMIL specification and match other browsers.
    - Added support for relative units in SVG.
  - Storage
  - Tables
  - Web API
    - **Added support for enforcing cookie name prefix checks in the CookieStore API to reject invalid `__Host-Http-` and `__Http-` names.**
    - Added support for document.activeViewTransition to expose the current active view transition.
    - **Added support for the `scrollend` event.**
    - **Added support in the Cookie Store API for handling cookieStore.set calls with an empty string `path`, defaulting to the current URL path.**
    - **Added support for the Navigation API.**
  - Web Inspector
  - WebAssembly
    - New Features
- **Subgrid: how to line up elements to your heart's content | WebKit**
  - https://webkit.org/blog/17339/subgrid-how-to-line-up-elements-to-your-hearts-content/
  - Subgrid は、親グリッドの行と列を子要素に適用し、異なる高さの要素を整列させるための機能である。
  - Subgrid を使用することで、複雑なレイアウトでも一貫した行と列のシステムを利用できる。
  - この機能は、特に異なる内容の要素を整列させたい場合に有用であり、主要なブラウザでのサポートがあるため、安全に使用できる。
- **WebKit Features in Safari 26.0 | WebKit**
  - https://webkit.org/blog/17333/webkit-features-in-safari-26-0/
  - CSS
    - Anchor Positioning
    - Scroll-driven animations
    - Pretty text
    - Contrast Color
    - Progress function
    - And more CSS
  - Every site can be a web app on iOS and iPadOS
  - HDR images
  - Immersive video and audio on visionOS
  - `<model>` on visionOS
    - Basic usage
    - Lighting
    - Animation and playback
    - Rotation and interaction
  - Digital Credentials API
  - Web API
  - JavaScript
  - SVG icons
  - WebGPU
  - Media
  - WebRTC
  - Editing
  - HTTP
  - SVG
  - Website compatibility
    - Report a website issue
    - Update to UA String
      - > It was back in 2017 when Safari on Mac first started freezing the Mac OS string. Now the behavior on iOS, iPadOS, and visionOS does the same in order to minimize compatibility issues.
  - Web Inspector
    - Automatic inspection of Service Workers
    - Recording Workers in the Timelines tab
    - Slotted badge
    - Improved async debugging experience
    - New in Web Inspector since Safari 26 beta 1
  - WebKit in SwiftUI
    - WebView
    - WebPage
  - WebKit API
  - Web Extensions
  - Content Blockers
  - WebAssembly
  - Networking
  - Privacy
  - Lockdown Mode
  - Device management
  - Security
  - Bug fixes and more
    - Accessibility
    - Browser
    - CSS
    - Canvas
    - DOM
    - Editing
    - Forms
    - Images
    - JavaScript
    - Media
    - PDF
    - Rendering
    - SVG
    - Safari View Controller
    - Scrolling
    - Service Workers
    - Spatial Web
    - Text
    - URLs
    - Web API
    - Web Animations
    - Web Apps
    - Web Extensions
    - Web Inspector
    - WebKit API
    - WebRTC
- Release Notes for Safari Technology Preview 228 | WebKit
  - https://webkit.org/blog/17386/release-notes-for-safari-technology-preview-228/
  - Accessibility
    - **Added support for auto-expanding details and `hidden="until-found"` elements for text searches done via assistive technologies.**
  - CSS
    - Added support for :scope when the scoping root is :visited.
    - Added support for using `color-mix()` without a color space, defaulting to oklab.
    - Added support for `display-p3-linear` colors in CSS.
  - DOM
  - Editing
  - Forms
  - JavaScript
    - Added support for Wasm Memory buffer APIs.
    - Added support for Wasm JS String Builtins.
  - Media
  - PDF
  - Rendering
  - SVG
  - Service Worker
  - Web API
  - Web Extensions
  - Web Inspector
  - WebGPU
  - WebRTC
    - Added encrypted field to RTCRtpHeaderExtensionParameters.

  #### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2025-09-01+
- Support
  - Customizable select element
    - https://github.com/WebKit/standards-positions/issues/386
  - Headingoffset & Headingreset attributes
    - https://github.com/WebKit/standards-positions/issues/523
  - Support `download` attribute in SVG `<a>` element
    - https://github.com/WebKit/standards-positions/issues/543
  - ariaNotify API
    - https://github.com/WebKit/standards-positions/issues/370
  - expose contentEncoding in resourceTiming
    - https://github.com/WebKit/standards-positions/issues/467
- Withdrawn
  - Add `getSelectionBoundingClientRect()` for `<textarea>` and `<input>` elements
    - https://github.com/WebKit/standards-positions/issues/512

  #### Other

- iOS User Agent String will be frozen for the OS part to 18_6. · Issue #283 · whatwg/compat
  - https://github.com/whatwg/compat/issues/283#issue-3382725784

  ### Edge 動向

  #### Stable: 141

  #### Updates

- https://blogs.windows.com/msedgedev/
  - **Unlock text editing use cases with highlightsFromPoint and other FromPoint APIs**
    - https://blogs.windows.com/msedgedev/2025/09/25/unlock-text-editing-use-cases-with-highlightsfrompoint/
    - 特定の DOM 範囲内のホバーやクリック位置の座標を、リスナなしで検知できる `*FromPoint` API
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見られる
- https://twitter.com/MSEdgeDev
  - これを見るしかない

  #### Other

- Calling for Interop 2026 proposals - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2025/09/04/calling-for-interop-2026-proposals/
- Apple's Assault on Standards - Infrequently Noted
  - https://infrequently.org/2025/09/apples-crimes-against-the-internet-community/
  - 市場競争は標準の重要な要素であり、競争がなければ標準機関はその存在意義を失う。
  - Apple は独占的な影響力を行使し、ブラウザの選択肢を抑圧することで、ウェブとインターネットの標準を無効化する脅威をもたらしている。
  - インターネット標準機関はこの脅威を認識し、適切な対応を取る必要がある。

  ### WHATWG/W3C 動向

  #### Draft

- https://www.w3.org/news/
- Recommendation
- Candidate Recommendation
  - Call for implementations: Accessibility Conformance Testing (ACT) Rules Format 1.1
    - https://www.w3.org/WAI/news/2025-08-19/act-rules-format-1.1-CR/
- Working Draft
- First Public Working Draft
  - **First Public Working Draft: CSS Environment Variables Module Level 1**
    - https://www.w3.org/news/2025/first-public-working-draft-css-environment-variables-module-level-1/
    - `env()`, `preferred-text-scale`

  #### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
  - **​​[interest invokers] Consider alternative approaches given WebKit opposition · Issue #1279 · openui/open-ui**
  - https://github.com/openui/open-ui/issues/1279
  - > colleagues and I think trying to standardize something around it is very much premature. As mentioned previously there's also no great way to expose this particular solution on spatial computing platforms without compromising end user privacy. We therefore remain opposed to this feature.
  - interest invokers に対して WebKit が oppose.

  #### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
  - 2025-09-04
    - https://github.com/whatwg/html/issues/11622
    - interestfor
      - > Should we say stage 2?
      - > We can give it one week. I'll also comment on the tracking issues, and on WebKit SP.
      - この後、WebKit SP で Anne が opposed のコメントを残す
      - Mozilla も neutral なので、Stage は進んでいない
  - 2025-09-11
    - https://github.com/whatwg/html/issues/11648
  - 2025-09-18
    - https://github.com/whatwg/html/issues/11664#event-19901767241
    - Focus Group for Keyboard Navigation
      - > The group agreed to move the proposal to stage one, with Chris Wilson marking the issue accordingly.
    - Element Internals Type Proposal Refinement
      - > The proposal was then moved to stage one, with no objections.
  - 2025-09-25
    - https://github.com/whatwg/html/issues/11696
    - Declarative CSS Modules

  #### CSSWG

- https://www.w3.org/blog/CSS/
  - CSS WG Blog - Masonry Spec Update and Open Issues
    - https://www.w3.org/blog/CSS/2025/09/18/masonry-update-issues/
    - display の値の名前をどうするか
    - row / column の解釈が残る問題
- https://lists.w3.org/Archives/Public/www-style/
  - [css-forms-1] Password visibility toggle
    - https://github.com/w3c/csswg-drafts/issues/11845
    - > Go with `::clear-icon` and `::reveal-icon`
    - パスワードの表示/非表示トグル機能の標準化も`appearance: base;に含まれていきそう`
  - [css-flexbox-2] Add `flex-wrap: balance;`
    - https://github.com/w3c/csswg-drafts/issues/3070
    - `flex-wrap` で、アイテムが不均等に配置される問題を解消するもの
    - `text-wrap: balance` の flex 版として位置付け
    - これが Flexbox Level2 に入りそう
    - > Add a flexbox level 2 with flex balance feature, syntax TBD
    - Balanced packing - Item Flow, Part 1: A new unified concept for layout | WebKit
      - https://webkit.org/blog/16587/item-flow-part-1-a-new-unified-concept-for-layout/#item-pack

  #### Other

- **Request For Comments: new Resolver specification, groups & Aliases updates | Design Tokens Community Group**
  - https://www.w3.org/community/design-tokens/2025/09/12/request-for-comments-new-resolver-specification-groups-aliases-updates/
- **Patent Advisory Group for Second Screen Working Group Launched**
  - https://www.w3.org/blog/2025/patent-advisory-group-for-second-screen-working-group-launched/
  - Remote Playback API の特許
- **implement headingoffset & headingreset attributes**
  - https://github.com/whatwg/html/pull/11086
  - `headingoffset` と `headingreset` 属性が HTML に追加
- **Group Note: CSS Snapshot 2025**
  - https://www.w3.org/news/2025/group-note-css-snapshot-2025/
  - CSS Snapshot 2025
    - https://www.w3.org/TR/css-2025/
  - Diff:
    - Reliable Candidate Recommendation
      - Cascade Layers を含む Cascading and Inheritance 5
      - セレクタのチェックを含む Conditional Rules 4
    - Safe to Release pre-CR Exceptions
      - Selector Level4 の `:is()`, `:where()`, `:has()`
      - Media Queries 5 の `prefers-reduced-motion`, `prefers-contrast`, `forced-colors`
    - など
- **ISO/IEC 40500:2025 - Information technology - W3C Web Content Accessibility Guidelines (WCAG) 2.2**
  - https://www.iso.org/standard/91029.html
  - ISO/IEC 40500 が WCAG2.2 を採用するものとなった
  - WCAG2.0 を採用していたものから 13 年ぶりの改訂
- **Update on Project to Enhance Community Groups - 03 September 2025**
  - https://www.w3.org/2025/09/03-council-minutes.html
  - Community Group の仕組みを強化し、WG への移行をスムーズにさせるなどを検討中
- WHATUP at TPAC 2025: agenda suggestions · Issue #11711 · whatwg/html
  - https://github.com/whatwg/html/issues/11711
  - TPAC 2025 での F2F

  ### TC39/TC55 動向

  #### Meeting

- 2025-01
  - https://github.com/tc39/agendas
  - https://github.com/tc39/notes

  #### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2025-01-01}...main@{2025-02-01}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->2.7
- 2.7->3
- 3->4

  #### New Proposals

  #### WinterTC

- https://github.com/WinterTC55/admin/tree/main/meetings
- admin/meetings/2025-09-04.md
  - https://github.com/WinterTC55/admin/blob/main/meetings/2025-09-04.md
  - Runtime Keys
  - Conference attendance
    - W3C TPAC
    - Other events
    - JSConf JP
      - Andreu Botella has proposed a TC55-related talk at JSConf JP in November.
  - **HTTP Server API**
    - Fetch API が一段落したので Server API の議論を始めるタイミング
    - https://github.com/WinterTC55/admin/issues/137
  - import.meta.url

  #### Other

  ### IETF 動向

  #### WG

- RFC
- Work
  - I-D Action: draft-ietf-httpbis-rfc6265bis-21.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2025JulSep/0176.html
    - CookieBis 更新される、、
- Meeting

  #### Other

  ### 周辺動向

  #### ベンダー動向

- **Welcoming The Browser Company to Atlassian - Work Life by Atlassian**
  - https://www.atlassian.com/blog/announcements/atlassian-acquires-the-browser-company
  - Arc、Dia を開発している The Browser Company が Atlassian に買収。独立性は維持する
  - Dia をベースにエンタープライズ向けの機能を統合していく
- September Conference News | Igalia
  - https://www.igalia.com/2025/09/04/September-Conference-News.html
- Igalia WebKit Team | WebKit Igalia Periodical #36
  - https://blogs.igalia.com/webkit/blog/2025/wip-36/
- Igalia WebKit Team | WebKit Igalia Periodical #37
  - https://blogs.igalia.com/webkit/blog/2025/wip-37/
- Igalia WebKit Team | WebKit Igalia Periodical #38
  - https://blogs.igalia.com/webkit/blog/2025/wip-38/
- Igalia WebKit Team | WebKit Igalia Periodical #39
  - https://blogs.igalia.com/webkit/blog/2025/wip-39/
- Call for Proposals: Interop 2026 | Igalia
  - https://www.igalia.com/2025/09/04/Call-for-Proposals-Interop-2026.html
- Interop 2026: The Call for Proposals is Open! - Bocoup
  - https://www.bocoup.com/blog/interop-2026-the-call-for-proposals-is-open
- The impact of the Salesloft Drift breach on Cloudflare and our customers
  - https://blog.cloudflare.com/response-to-salesloft-drift-incident/
  - Cloudflare が社内で顧客管理に使ってる Salseforce が GRUB1 攻撃を受けた
  - サポートチケットのデータが漏洩した可能性
- **Addressing the unauthorized issuance of multiple TLS certificates for 1.1.1.1**
  - https://blog.cloudflare.com/unauthorized-issuance-of-certificates-for-1-1-1-1/
  - Fina CA が内部テストのために無許可で 1.1.1.1 の証明書を発行していた
  - 2024/2 ~ 2025/8 まで 11 回発行されていた
  - CT の監視をしていたが、IP 証明書は漏れていた。また数が多くフィルタリングが機能してなかった。
- Help build the future: announcing Cloudflare's goal to hire 1,111 interns in 2026
  - https://blog.cloudflare.com/cloudflare-1111-intern-program/
  - Cloudflare は 2026 年に 1111 人のインターンを採る
  - 12 週間報酬あり、AI 活用で新しいアイデアや解決策の発見を重視
- Supporting the future of the open web: Cloudflare is sponsoring Ladybird and Omarchy
  - https://blog.cloudflare.com/supporting-the-future-of-the-open-web/
  - Ladybird と DHH の Omarchy を支援する
- Automatically Secure: how we upgraded 6,000,000 domains by default to get ready for the Quantum Future
  - https://blog.cloudflare.com/automatically-secure/
  - 600 万ドメインに自動 TLS を有効化
  - TLS1.3 の採用率は 60 %
  - 今後これを PQC にしていく
- Giving users choice with Cloudflare's new Content Signals Policy
  - https://blog.cloudflare.com/content-signals-policy/
  - robots.txt を拡張し、AI の学習、検索、RAG などそれぞれを許可・禁止するかのポリシーを指定する Content Signals を提案
- Content Signals
  - https://contentsignals.org/

  #### セキュリティ動向

- Mis-issued TLS Certificates for 1.1.1.1 DNS Service Enable Attackers to Decrypt Traffic
  - https://cybersecuritynews.com/tls-certificates-1-1-1-1-dns-service/
- Incident Report: Mis-issued Certificates for SAN iPAddress:1.1.1.1 by Fina RDC 2020
  - https://www.mail-archive.com/dev-security-policy@mozilla.org/msg02229.html
  - Cloudflare の 1.1.1.1 誤発行についてのレポート

  #### Other

- グーグルは「クローム」売却不要、データは共有を－独禁法訴訟で判事 - Bloomberg
  - https://www.bloomberg.co.jp/news/articles/2025-09-02/T1Z9YIGOYMTN00
- スマホ新法、12 月施行へ 改正ガイドライン公開 - Impress Watch
  - https://www.watch.impress.co.jp/docs/news/2034970.html
  - 8 月の取りこぼし
  - スマホ新法の運用ガイドラインが公開された
  - DroidKaigi 2025 - [JA] スマホ新法って何?１２月施行?アプリビジネスに影響あるの?
    - https://www.youtube.com/watch?v=GxMjoQ_pIr4
- Japan: Apple Must Lift Browser Engine Ban by December - Open Web Advocacy
  - https://open-web-advocacy.org/blog/japan-apple-must-lift-engine-ban-by-december/
  - DMA とスマホ新法の違い
  - 代替エンジンの採用を妨げる行為に対しても踏み込んでいる
- **Fetch streams are great, but not for measuring upload/download progress - JakeArchibald.com**
  - https://jakearchibald.com/2025/fetch-streams-not-for-progress/
  - fetch の stream をプログレス計算に使うことの問題提起
  - Request/ResponseObserver を提案中で Interop 2026 に入れたい
  - WIP: Add a mechanism to fetch to track progress
    - https://github.com/whatwg/fetch/pull/1843
- **Geedge & MESA Leak: Analyzing the Great Firewall's Largest Document Leak**
  - https://gfw.report/blog/geedge_and_mesa_leak/en/
  - Great Firewall のコードが漏洩した
  - 解析内容
- **Apple has a private CSS property to add Liquid Glass effects to web content**
  - https://alastair.is/apple-has-a-private-css-property-to-add-liquid-glass-effects-to-web-content/
  - Apple が Liquid Glass のためのプライベートな CSS を追加していた
  - ただし、WebView でプライベートな設定をオプトインした時のみ利用可能なもの
- Web Standards and the Fall of the House of Iamus - Infrequently Noted
  - https://infrequently.org/2025/09/standards-and-the-fall-of-iamus/
  - ウェブ標準とその開発プロセスは、既存のデザインの採用を促進することに重点を置いており、新しい問題解決やデザインの創出には適していない。
  - 標準化は必ずしも相互運用性や責任を意味するわけではなく、品質はデザインの状態や実装の広がりに依存する。
  - WebP の例からもわかるように、非公式な仕様でも広く採用されることが可能であり、標準化の前に既に相互運用性が確立されることがある。
- Web Standards and the Fall of the House of Iamus - Infrequently Noted
  - https://infrequently.org/2025/09/standards-and-the-fall-of-iamus/
  - Apple は、iOS 上のブラウザにおける競争を抑制し、WebKit を通じて他のブラウザの機能拡張を妨げているため、Web の進化に悪影響を及ぼしている。
  - Safari は他のブラウザに比べて新機能の導入が遅れがちであり、Apple は問題となる API に対して建設的な再設計を行っていない可能性が高い。
  - Apple のスタンスは、Web 技術の進化を促進するための協力的な姿勢ではなく、独自のプラットフォームを維持するための防御的な戦略に見える。
- Apple's Antitrust Playbook - Infrequently Noted
  - https://infrequently.org/2025/09/apples-antitrust-playbook/
  - Apple は EU に対して、デジタル市場法(DMA)の施行を放棄するよう要求し、自社の不遵守を隠蔽するための誤解を招くプレスリリースを発表した。
  - Apple は、規制当局に対して自社の行動の結果を他者に転嫁し、競争を妨げるための技術的および法的障壁を構築している。
  - 同社は、ロビー活動や偽情報を利用し、規制を回避するための戦略を展開しており、これにより業界全体の競争とユーザーの利益が損なわれている。
- Bridging the Gap Between Standards and Policy
  - https://www.mnot.net/blog/2025/09/20/configuration
  - インターネット標準の策定は専門家の合意に基づくものであり、政策決定者が技術的な提案を直接行うことは問題を引き起こす可能性がある。
  - 政策決定者は、標準の開発が市場での採用によって実証されるまで、具体的な技術仕様を規定しない方が良いとされる。
  - 新たに提案された「構成層」を用いることで、政策目標と技術設計の間のギャップを埋めることができ、より効果的な協力が期待される。
- **State of JavaScript 2025**
  - https://survey.devographics.com/en-US/survey/state-of-js/2025
  - State of JS が 10/1 から開始
- **About This Is For Everyone by Sir Tim Berners-Lee**
  - https://thisisforeveryone.timbl.com/about-the-book.html
  - Tim Berners-Lee の回顧録が出版
- Why I gave the world wide web away for free | Technology | The Guardian
  - https://www.theguardian.com/technology/2025/sep/28/why-i-gave-the-world-wide-web-away-for-free
    - World Wide Web をパテントフリーにした背景など
- **AOMedia Announces Year-End Launch of Next Generation Video Codec AV2 on 10th Anniversary | Alliance for Open Media**
  - https://aomedia.org/press%20releases/AOMedia-Announces-Year-End-Launch-of-Next-Generation-Video-Codec-AV2-on-10th-Anniversary/
  - AV2 が年末までにリリースされるとアナウンス
- 🚀 Interop 2026 Reactions
  - https://foolip.github.io/interop-reactions/

  ### イベント

- 9 月
  - 22-25: TC39 110th
    - https://github.com/tc39/agendas/blob/main/2025/09.md
- 10 月
  - 28-29 WebKit Contributors Meeting
    - https://webkit.org/meeting/
- 11 月
  - 1-7: IETF | IETF 124 Montreal
    - https://www.ietf.org/meeting/124/
  - 10-14: TPAC 2025
    - https://www.w3.org/events/tpac/2025/tpac-2025/
  - 16: JSConfJP
    - https://jsconf.jp/2025/en
  - 18-20: TC39 111th
    - https://github.com/tc39/agendas/blob/main/2025/11.md

  ### Wrap Up

- Chrome
  - 140
  - 141
    - ARIA Notify API
    - Digital Credentials API
    - Navigation API deferred commit
    - Proofreader API origin trial
  - Ship
    - Interest Invokers
    - ICU 77
    - Temporal
    - No-Vary-Search for HTTP disk cache
  - Prototype
    - Email Verification Protocol
    - Scoped Focusgroup
    - Two-phase cross-document VT
    - `<meta name="text-scale">`
  - Experiment
    - Extend CSP script-src
  - PSA
    - Separate Defer Module Script Tasks
  - web.dev
    - Interop 2026
  - Chrome Developers
    - Scoped View Transitions
    - Nested View Transition groups
    - DevTools MCP
  - other
    - Chrome 売却無くなった
    - Chrome at 17
    - Chrome's new AI features
    - Domenic リタイア
- Firefox
  - 143
    - `::details-content`
  - Ship
    - `-webkit-fill-available`
- Safari
  - 26.0
    - anchor positioning
    - scroll-driven animations
    - `text-wrap: pretty`
    - `progress()`
    - Digital Credentials API
    - URLPattern
    - SVG icons
    - WebGPU
    - WebSocket over h2/h3
  - TP 227
    - `field-sizing`
    - `scrollbar-color`
    - `command`/`commandfor`
    - `scrollend`
    - Cookie Store API
    - Navigation API
  - TP 228
    - `hidden="until-found"` のアクセシビリティ
  - Standard Position
  - other
    - iOS の UA 文字列も OS 部分がフリーズ
- Edge
  - FromPoint APIs
- W3C/WHATWG
  - Draft
    - FPWD
      - CSS Environment Variables Module Level 1
      - `env()`, `preferred-text-scale`
  - Open UI
    - Interest Invokers API に対して WebKit が慎重な姿勢を示している
  - WHATNOT meeting
    - Focus Group, Element Internals Type が Stage 1 に
  - CSS WG meeting
    - `::clear-icon` と `::reveal-icon` が `appearance: base`; のオプトインで実現しそう
    - `flex-wrap: balance;` が Flexbox Level 2 に入る方向で Resolve
  - Other
    - Design Tokens Community Group から、テーマ・モードのフォーマットを定義する Resolver/Groups&Aliases
    - headingoffset & headingreset HTML attributes
    - CSS Snapshot 2025 の公開
    - ISO/IEC 40500:2025 として WCAG2.2 が採用される。13 年ぶりの改訂
    - Community Group の提案を強化する検討
- TC39
  - WinterTC
    - Fetch が落ち着いたので Server API の議論
- IETF
  - CookieBis が更新され RFC が遠のく
- 周辺動向
  - ベンダー動向
    - The Browser Company が Attlassian に買収
    - Cloudflare で 1.1.1.1 の誤発行インシデント
    - Cloudflare が 1111 人のインターンを 2026 年にとる
  - セキュリティ動向
  - Other
    - Chrome 売却不要
    - スマホ新法 12 施行
    - fetch の progress 用に Observer を入れる
    - Great Firewall のコード漏洩
    - Apple が Liquid Galss 用コードを WebView 向けに入れいていた
    - State of JS 開始
    - Tim Berners-Lee の回顧録が出版
    - AV2 が年末までにリリースされるとアナウンス
