---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep201.mp3
published_at: 2026-03-27
guests:
  - name: "@saku"
    url: https://x.com/sakupi01
  - name: "@petamoriken"
    url: https://x.com/petamoriken
---

# ep201 Monthly Platform 202603

## Theme

第 201 回のテーマは 2026 年 3 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 147

#### Updates

- New in Chrome 146
  - https://developer.chrome.com/blog/new-in-chrome-146
  - Scroll-triggered animations
  - Scoped custom element registry
  - The Sanitizer API
- What's new in DevTools (Chrome 146)
  - https://developer.chrome.com/blog/new-in-devtools-146
- Chrome 147 beta
  - https://developer.chrome.com/blog/chrome-147-beta
  - Timeline named range scroll
  - **CSS `contrast-color()`**
  - **CSS border-shape**
  - **Element scoped view transitions**
  - **CSS update: decoupling of width and style properties**
  - **CSSPseudoElement interface**
  - **Pseudo target on events**
  - WebXR Plane Detection
  - WebXR Layers
  - XML Parsing in Rust for non XSLT scenarios
  - JSON and style support for link `rel=modulepreload`
  - **Math.sumPrecise**
  - Support path attribute on SVG `<textpath>` element
  - Get Secure Payment Confirmation capabilities
  - Update Device Memory API limits
  - Local Network Access restrictions on Service Worker `WindowClient.navigate()`
  - Local network access restrictions for WebSockets
  - Local network access restrictions for WebTransport
  - **IWA only: Web Printing API**
  - New origin trials
    - Container Timing
    - **Autofill event**
    - **Web app HTML install element**
    - Connection allowlists
  - Deprecations and removals
    - Remove inline XSLT for production of SVG

  #### Intents

- Ship: CSS `border-shape`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zSuB_Tc0-bY
- **Ship: CSS `contrast-color()`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/x6nAOI0kVsg
  - Newly Available
- **Ship: Clip Text overflow on user interaction**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6SIztVcyJ7k
  - ellipsis が出現する場合、テキスト入力中などは ellipsis ではなく文字を clip する
- Ship: Correctly set "dropEffect" for "dragEnter", "dragLeave" and "dragOver" events
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/E-MU1WC2gGQ
- Ship: Manifest Localization
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/C3UvLtvVTjA
- Ship: Web Authentication Immediate UI mode
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iSxAYX0hCwI
- **Ship: `text-decoration-skip-ink: all`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RmfXPNwEESM
  - いかなるグリフを利用していても上/下線が文字に触れないようにする
- Ship: Get Secure Payment Confirmation Capabilities
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wiViFIaNy5I
- **Ship: at-rule: CSS Feature Detection**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iYcuP_HQjDs
  - あくまでも純粋な `at-rule` だけ
  - プレリュードなどは指定できない `@supports at-rule(@container style(…)) { … }` は使えない
- Ship: Respect `autocorrect="off"` for Windows touch keyboard in TSF
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pIecMZqlWA8
- Ship: CSS `ruby-overhang` property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EEdvr9Tv9as
- **Ship: Web App Origin Migration**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kwDE7lh6YiA
  - 既存の PWA のオリジンが変わった時に、移行したい
- Ship: WebGPU: `linear_indexing` feature
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XTP8EdUisMU
- **Ship: IDNA ContextJ rules**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wAys0Jln6ic
- Ship: Web Serial API on Android
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HBJ-uYFvkpM
- **Ship: Open Font Format avar2 text shaping and glyph rendering**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VCQBQlxEaa8
  - avar2 テーブルは、フォントデザイナーに対し、補間の制御を向上させる機能を提供する。
  - 複数の軸にわたるデザイン調整を可能にし、ユーザーの負担を軽減する「メタスライダー」を実現する。
  - Blink は、HarfBuzz でのコンパイルフラグを有効化し、avar2 のサポートを実現する。
- Ship: SharedWorker on Android
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pS1PDOa69CU
- Prototype and Ship:
- **Prototype: HTML Media Capture on Desktop**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Z8MK8Q_7DQI
  - `<input type=file capture=user>` が android で使えていた
  - これを desktop でも対応する
- **Prototype: HTML toolbar element**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jitI6P4LHzc
  - キーボード操作などをネイティブで提供する `<toolbar>` の提案
- **Prototype: Platform-provided behaviors**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ETKzYhB6BbI
  - ElementInternals に標準的な挙動を継承させる機能
  - まずは form submission の機能から
  - WC をネイティブの挙動に近づけられるように
- Prototype: Service Worker soft update after functional events
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GY5O3lj3ujY
- Prototype: Summarizer API performance preference
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rUNBR1PC3JA
- **Prototype: CSS sticky positioning in single-axis scroll containers**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mnATiT8Eu8A
  - 異なるコンテナに対して inline/block スクロールが発生する場合に、`position: sticky` が動作しない問題があった
  - e.g, inline 方向にスクロール可能なコンテナ内のテーブルにおいて、ページを block 方向にスクロールした場合にヘッダを固定したいユースケース
  - https://codepen.io/SimplyPhy/pen/oEZKZo
- **Prototype: Relative Alpha Colors (CSS Color 5 `alpha()` function)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/E6mcKG39EN8
  - Color の Alpha 値を相対的に書ける
- **Prototype: CSS `light-dark()` with image values**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/We0pqxS4IcQ
- **Prototype: CSS `background-clip: border-area`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vZAviXlkh9A
- **Prototype : Classifier API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5dQNl-gyjgU
- **Prototype: CSS `fit-content()` function for sizing properties**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RtqvX4CCnoI
  - Flex や Grid に限らない Box Model で、「`min-content` 以上、`max-content` 以下の範囲で、できるだけ 基準値に近づける」といったサイズ指定ができる
  - イメージとしては `clamp(min-content, 200px, max-content)` (clamp に intrinsic size は指定できない) や `min(max-content, max(min-content, 200px))`
- Experiment: CPU Performance API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rVLczKjsjW0
- Experiment: Connection Allowlists
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lRMJ8iwaKbM
- Experiment: Long Animation Frames style/layout duration
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qvGqBcSOFTQ
- Experiment: Speculation rules: `form_submission` field
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Py0vdYAtSD4
- Experiment: Container Timing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1uvAGNd2uME
- Experiment: OpaqueRange
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jrIXiBUbQm0
- **Experiment: Agentic Federated Login**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FLaenhru3zo
  - Agent 型のブラウザ用に FedCM を拡張して AI が安全に使える形にする
- **Experiment: Web app HTML install element**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/N1AjeFmVF4U
  - `navigator.install` 相当の `<install>` 要素の提案
  - https://blogs.windows.com/msedgedev/2025/11/24/the-web-install-api-is-ready-for-testing/
- Ready for Developer Testing: Web App Origin Migration
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MUE30sV8S5Y
- Ready for Developer Testing: js-profiling in dedicated workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/idttR6PhdLU
- Ready for Developer Testing: Exposing a string targetSelector attribute to EventTiming performance entries.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Sgj4s6xbKzY
- Ready for Developer Testing: Declarative Document Patching
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XHv8xd3MBdQ
  - HTML コンテンツを順不同でストリーミングし、既存のドキュメントをエンコードされた「パッチ」のストリームで更新する。
  - この機能は全ての Blink プラットフォームでサポートされない。
  - Web 開発者からは肯定的な反応が得られている。
- Ready for Developer Testing: Renewed HTML insertion&streaming methods
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Gt5JwBkFKYI
  - 複数の HTML 設定メソッドを公開し、動的にマークアップを挿入するための一貫したストーリーを提供する。
  - 位置指定メソッドとストリーミングメソッドを導入し、既存の insertAdjacentHTML を置き換える。
  - セキュリティ上の考慮として、XSS の管理とサニタイザーとの統合が重要である。
- **Extend Experiment: Extend CSP script-src (aka script-src-v2)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ouewB4MsIDc
  - CSP script-src で `eval` に渡す文字列のハッシュを指定できるようにする。
  - 対応するために TC39 でも Stage 3 Dynamic Code Brand Checks が進行中。
- Extend Experiment: Digital Credentials API (issuance support)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bskHkIrjjms
- Request to retain XSLT support due to telecom CPE architecture and non‑upgradable device ecosystem
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZI5UpakOBZQ
- Change:
- Unship:
- Remove:
- PSA: Re-adding `Credential.isConditionalMediationAvailable()` to the Credential interface
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sECA9TE7jq8
- Web-Facing Change PSA: LCP: Match specced behavior for emitting candidates
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jg2FVToNxro
- Web-Facing Change PSA: Reuse no-store images on same-src reassignment
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PM5W04h8-PM

  #### Other

- web.dev
  - https://web.dev/
  - January 2026 Baseline monthly digest
    - https://web.dev/blog/baseline-digest-jan-2026
- google for developers
  - https://developers.googleblog.com/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - https://developer.chrome.com/blog/
  - **Get features faster with Chrome's two-week release cycle**
    - https://developer.chrome.com/blog/chrome-two-week-release
    - 2026 年 9 月からリリースサイクルを 4 週から 2 週間に移行
    - 全プラットフォームで 2 週間ごとに Beta, Stable をリリース
    - Extended Stable は引き続き 8 週間サイクル
    - Chromebook 向けの拡張リリースオプションも継続される
  - Device Bound Session Credentials now available on Windows
    - https://developer.chrome.com/blog/dbsc-windows-announcement
    - DBSC が Chrome 145 で Windows に対応
  - **Request for developer feedback: focusgroup**
    - https://developer.chrome.com/blog/focusgroup-rfc
    - `focusgroup` 属性は複合 Widget に矢印移動を追加する
    - toolbars, tablists, menus, listboxes などを想定
    - フィードバック募集中
  - **Make custom elements behave with scoped registries**
    - https://developer.chrome.com/blog/scoped-registries
    - 異なるカスタム要素のライブラリを、独立して使用できるようになる。
    - Microsoft Edge と Chrome 146 以降でデフォルト
    - 新しいレジストリを作成しスコープを分け、カスタム要素の衝突を回避できる。
  - **When to use WebMCP and MCP**
    - https://developer.chrome.com/blog/webmcp-mcp-usage
    - WebMCP と MCP は異なるニーズに対応し、互いに補完し合う関係である。
    - MCP はバックエンド向けであり、WebMCP はフロントエンド向けのブラウザ標準である。
    - 効率的なエージェントアプリケーションは、MCP と WebMCP の両方を利用することでその強みを活かす。
  - Enter video Picture-in-Picture automatically on more sites
    - https://developer.chrome.com/blog/automatic-picture-in-picture-initiated-by-the-browser
- chromium blog
  - https://blog.chromium.org/
  - **Chromium Blog: Bringing Chrome to ARM64 Linux Devices**
    - https://blog.chromium.org/2026/03/bringing-chrome-to-arm64-linux-devices.html
    - Chrome が ARM64 Linux に対応
    - 背後には NVIDIA との連携
    - Google will soon bring Chrome to ARM64 Linux - The New Stack
      - https://thenewstack.io/google-will-soon-bring-chrome-to-arm64-linux/
  - Chromium Blog: Android Sets New Record for Mobile Web Performance
    - https://blog.chromium.org/2026/03/android-sets-new-record-for-mobile-web.html
    - Speedometer と LoadLine を用いたパフォーマンスの最適化により、Android は競合を上回るスコアを達成し。
    - 新しいフラッグシップモデルは、ページロードが 4-6%、インタラクションが 6-9%速くなる。
- canary
- google security blog
  - https://security.googleblog.com/
  - **Cultivating a robust and efficient quantum-safe HTTPS**
    - https://security.googleblog.com/2026/02/cultivating-robust-and-efficient.html
    - PQC の新プログラム発表
    - X.509 を Merkle Tree Certificates (MTCs) に置き換える
    - TLS ハンドシェイクの認証データを最小限に縮小し、パフォーマンスを維持しつつ量子耐性を提供
  - Streamlining Google's OSS VRP: Key Rule Updates - Google Bug Hunters
    - https://bughunters.google.com/blog/ossvrp-rule-updates-2026
    - OSS VRP のルール更新により、低品質なレポートを排除することを目指す。
    - 本更新は、実世界への影響に焦点を当てたものである。
    - 効率的な報告プロセスの実現を図る。
- search blog
  - https://developers.google.com/search/
- v8
  - https://v8.dev/
- other
  - **Google completes acquisition of Wiz**
    - https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/wiz-acquisition/
    - Google が Wiz を買収
    - It's Official: Wiz Joins Google! | Wiz Blog
      - https://www.wiz.io/blog/google-closes-deal-to-acquire-wiz
    - Welcoming Wiz to Google Cloud: Redefining security for the AI era
      - https://cloud.google.com/blog/products/identity-security/google-completes-acquisition-of-wiz

  ### Firefox 動向

  #### Stable: 149

  #### Updates

- https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases
- Firefox 149
  - https://www.firefox.com/en-US/firefox/149.0/releasenotes/
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/149
  - `popover="hint"`
  - CloseWatcher
  - Experimental
    - Typed `attr()`
    - `color-mix()`
    - alpha & colorspace for input type="color"
    - Container Style Query
    - Rust-based JPEG XL decoder
- AI Controls - These Weeks in Firefox: Issue 196
  - https://blog.nightly.mozilla.org/2026/03/10/ai-controls-these-weeks-in-firefox-issue-196/
- Firefox Profiler Dark Mode and Updated Smart Window Prompts - These Weeks in Firefox: Issue 197
  - https://blog.nightly.mozilla.org/2026/03/17/firefox-profiler-dark-mode-and-updated-smart-window-prompts-these-weeks-in-firefox-issue-197/
- Extension Theming Improvements and More - These Weeks in Firefox: Issue 198
  - https://blog.nightly.mozilla.org/2026/03/20/extension-theming-improvements-and-more-these-weeks-in-firefox-issue-198/
- Ajit Varma on Firefox's new AI controls: 'We believe in user choice'
  - https://blog.mozilla.org/en/firefox/outside-the-fox-ai-controls/
- Hardening Firefox with Anthropic's Red Team
  - https://blog.mozilla.org/en/firefox/hardening-firefox-anthropic-red-team/
- The web should remain anonymous by default
  - https://blog.mozilla.org/en/privacy-security/web-anonymity/
- Under the hood: The AI powering Firefox's Shake to Summarize
  - https://blog.mozilla.org/en/firefox/firefox-ai/ai-powering-firefox-shake-to-summarize/
- **Meet Kit, your companion for a new internet era**
  - https://blog.mozilla.org/en/firefox/meet-kit/
- **More reasons to love Firefox: What's new now, and what's coming soon**
  - https://blog.mozilla.org/en/firefox/firefox-148-149-new-features/
  - VPN の無償提供(U.S., France, Germany and U.K)
  - AI Window
  - Split View
  - Tab Notes
  - new mascot: Kit, リリースノートなどもデザインリニューアル
- **Split View in Firefox: Two tabs side by side, right where you need them**
  - https://blog.mozilla.org/en/firefox/split-view/
- **Try Tab Notes in Firefox to leave a note on any page**
  - https://blog.mozilla.org/en/firefox/tab-notes/
- Competition, Innovation, and the Future of the Web - Why Independent Browser Engines Matter - Open Policy & Advocacy
  - https://blog.mozilla.org/netpolicy/2026/03/23/competition-innovation-and-the-future-of-the-web/
- **A free VPN you can trust, now built into Firefox**
  - https://blog.mozilla.org/en/firefox/built-in-vpn/

  #### Intents

- **Ship: `light-dark()` for CSS images**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/R9ksQx372_g
- **Ship: multi-color `color-mix()`**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/FHaw59qr3EM
  - 2 値以上の混合色を生成する
- Ship: limited `::-webkit-scrollbar` support
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/nWavQcfFpYg
- **Prototype and Ship: CSS `revert-rule` keyword**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/AGNjop6xRd0
- **Prototype and Ship: Canvas2D 'lang' attribute**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/YB7E7y76cEY
  - DOM 内の `<canvas>` はドキュメントの設定を継承して言語設定され、それを元にテキストをレンダリングするが、不明瞭な挙動であることと OffscreenCanvas で設定できなかったのを解消する
- Prototype: Use SkPDF as our default print-to-pdf back-end
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/zZGVnpTDpbI
- Change:
- Remove:

  #### Newsletter

- https://fxdx.dev/
- Firefox WebDriver Newsletter 149 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-149/
  - WebDriver はユーザーエージェントの制御と調査を可能にするリモートコントロールインターフェースである。
  - W3C によって標準化され、WebDriver classic(HTTP)と WebDriver BiDi(双方向)の 2 つの仕様から構成されている。
  - Firefox 149 リリースサイクルにおける作業の概要が提供されている。
  - 外部のコード貢献を歓迎し、バグ報告やパッチ提出者に感謝の意を表している。
  - Firefox 149 では複数の WebDriver バグが修正された。
    - スクリーンショットの実装が更新され、最大サポート寸法を超えるリクエストに対してエラーを正しく返すようになった。
    - WebDriver BiDi のネットワークテストにおいて、期待されるイベントのオブジェクトを単一のものに更新。
  - WebDriver コードは JavaScript、Python、Rust で書かれており、ウェブ開発者が貢献可能。
  - WebDriver BiDi では、ユーザープロンプトの自動処理、ダウンロード動作の設定、ワーカー領域のイベント追加などが行われた。
  - Marionette では、暗黙的およびページロードのタイムアウトをスクリプトタイムアウトに沿って処理する改善が行われた。

  #### MDN / Open Web Docs

- https://developer.mozilla.org/en-US/blog/

  #### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2026-03-01+
- Support
  - Allow `infinity`, `-infinity` and NaN in CSS `calc()`
    - https://github.com/mozilla/standards-positions/issues/602
  - WebGPU timestamp queries
    - https://github.com/mozilla/standards-positions/issues/918
  - WebAuthn related origins
    - https://github.com/mozilla/standards-positions/issues/1052
  - Base appearance for select multiple drop-down
    - https://github.com/mozilla/standards-positions/issues/1349
- Neutral
  - Serial API
    - https://github.com/mozilla/standards-positions/issues/336
- Oppose

  #### Other

- Firefox Developer Edition and Beta: Try out Mozilla's .rpm package! - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2026/03/firefox-developer-edition-and-beta-try-out-mozillas-rpm-package/

  ### Safari 動向

  #### Stable: 26.4

  #### Updates

- https://webkit.org/blog/
- Release Notes for Safari Technology Preview 239
  - https://webkit.org/blog/17852/release-notes-for-safari-technology-preview-239/
  - Accessibility
    - Resolved Issues
  - CSS
    - Added support for the `:open` pseudo-class for `<input>` elements.
  - Editing
  - Forms
  - MathML
  - Media
  - PDF
  - Rendering
  - Scrolling
  - Web API
  - Web Inspector
    - Added color contrast information within the Color Picker in Web Inspector.
  - WebAssembly
  - WebRTC
- WebKit Features for Safari 26.4
  - https://webkit.org/blog/17862/webkit-features-for-safari-26-4/
  - CSS
    - **Grid Lanes**
    - Name-Only Container Queries
    - Custom Cursors on `::marker`
    - **Math Typography**
    - Zoom
    - Threaded Scroll-driven Animations
    - Positioning
      - many refinements for Anchor Positioning
    - Layout Engine Improvements
    - Table Layout
    - Additional changes to CSS
  - WebTransport
  - Web API
    - Keyboard Lock API
    - ReadableByteStream
    - ReadableStream Async Iteration
    - Improvements to Scoped Custom Element Registries
    - Auxiliary Mouse Button Support
    - Resource Timing
    - MediaDeviceInfo in Secure Contexts Only
    - Resolved issues
  - JavaScript
    - Resolved issues
  - HTML
    - Resolved issues
  - SVG
    - Resolved issues
  - Safari Compact tabs
  - Web Authentication
  - Resolved issues
  - Web Inspector
    - Layer Visualization
    - Developer Experience
    - Worker Debugging
  - Additional Improvements
    - Resolved issues
  - Media Captions
    - Resolved issues
  - WebRTC
    - Resolved issues
  - Additional resolved issues
    - Accessibility
    - Browser
    - Canvas
    - Clipboard
    - Editing
    - Events
    - Privacy
    - Rendering
    - Spatial Web
    - Storage
    - WKWebView
    - Web Extensions
    - WebAssembly
    - WebGPU

  #### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2026-03-01+
- Support
  - Add support for video and audio element lazy-loading via the loading attribute
    - https://github.com/WebKit/standards-positions/issues/586
- Negative
- Withdrawn
  - Canvas place element
    - https://github.com/WebKit/standards-positions/issues/403

  #### Other

- 50 Years of Thinking Different - Apple
  - https://www.apple.com/50-years-of-thinking-different/
  - Apple 50 周年
- WWDC26 - Apple Developer
  - https://developer.apple.com/wwdc26/
  - June 8-12, 2026

  ### Edge 動向

  #### Stable:

  #### Updates

- https://blogs.windows.com/msedgedev/
  - Making keyboard navigation effortless - Microsoft Edge Blog
    - https://blogs.windows.com/msedgedev/2026/03/05/making-keyboard-navigation-effortless/
    - `focusgroup` の解説
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見れる
- https://twitter.com/MSEdgeDev
  - これを見るしか無い

  #### Other

- [CSSGapDecorations] Archive the explainer (#1266)
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/commit/28915c0675a4f76557d2cf1ca837a932e506ea4a
  - Edge が頑張っていた Gap Decorations が Graduate したのでアーカイブ

  ### WHATWG/W3C 動向

  #### TPAC

- なし

  #### Draft

- https://www.w3.org/news/
- Recommendation
  - Updated W3C Recommendation: Geolocation
    - https://www.w3.org/news/2026/updated-w3c-recommendation-geolocation/
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - First Public Working Draft: YAML-LD 1.0
    - https://www.w3.org/news/2026/first-public-working-draft-yaml-ld-1-0/
- Group Note
  - **Group Note: Use of Large Language Models in Standards Work**
    - https://www.w3.org/news/2026/group-note-use-of-large-language-models-in-standards-work/
    - https://www.w3.org/TR/2026/NOTE-llms-standards-20260324/
    - 標準化作業において、どんなケースで LLM が有用で、どんなケースで懸念されるか

  #### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- 2026-03-05
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2026-03-05.md
  - Improvements to default style for base select?
    - https://github.com/openui/open-ui/issues/1375
- 2026-03-12
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2026-03-12.md
  - Overscroll behavior が進んでいる
  - OpenUI Weekly Call - 2026/03/12 10:59 PDT - Notes by Gemini - Google Docs
    - https://docs.google.com/document/d/1EdbZ2S7m60Lmoa2k0S1QOTD0A8jRsly6ktORXu5FSYg/edit?tab=t.2wxxk63mz70f
    - Gemini で minutes が取れるようになった?わかりやすい
- 2026-03-19
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2026-03-19.md
  - [meta] Investigate automated minuting · Issue #1389 · openui/open-ui
    - https://github.com/openui/open-ui/issues/1389
    - gemini の議事録生成をやってみてたけど、過不足が多いので、結局 IRC に戻るらしい

  #### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
- 2026-03-05
  - https://github.com/whatwg/html/issues/12206
  - HTML-in-Canvas
    - https://github.com/whatwg/html/issues/10650
    - Figma が興味を示している
    - 3/19 whatnot で Stage2 in?
- 2026-03-12
  - https://github.com/whatwg/html/issues/12244
  - Stage 1
    - Platform Provided Behaviors for Custom Elements
  - Stage2
    - Out of Order HTML Streaming
  - Stage 3
    - Lazy Loading for Media Elements
- 2026-03-19
  - https://github.com/whatwg/html/issues/12275
  - Stage 1
    - Toolbar
  - Stage 2
    - HTML in Canvas

  #### CSSWG

- https://www.w3.org/blog/CSS/
- https://lists.w3.org/Archives/Public/www-style/
- Add an `::interest-button` pseudo element to interest invokers
  - https://github.com/w3c/csswg-drafts/issues/12437
  - タッチスクリーンユーザ向けの Interest Invokers トリガーとして擬似要素を提供したい(info アイコン的なもの)
  - あくまでフォーカスもホバーもできないタッチユーザ向けの補助機能としての位置付け。フォーカス不可で、アクセシビリティツリーにも露出しない。
    - `<span onclick=showInterest()>` に近いものと表現されている
  - 擬似要素に振る舞いを持たせるパターンを許容すると今後こういった特殊ケースが増大するとして、WebKit(Anne)が反対している
- Meeting 38 for joint OpenUI-WHATWG/HTML-CSSWG task force on stylable form controls
  - https://github.com/whatwg/html/issues/12240
- [css-images-4] Add `light-dark-image()`, or generalize `light-dark()` for images too?
  - https://github.com/w3c/csswg-drafts/issues/12513
  - > RESOLVED: Overload `light-dark()` to accept image pairs
  - `light-dark()` を画像ペアにも対応させる
  - ダークモード対応の画像切り替えが CSS だけで書ける
- **[css3 positioning] support `position:sticky` inside an overflow:hidden|auto on general parents**
  - https://github.com/w3c/csswg-drafts/issues/865
  - コンテナー内で横スクロール可能なテーブルにおいて、縦スクロールしたときにテーブル見出しをページ上部に固定したい場合
- line-clamp がドバっと進んでいる
- Overflow Lv4 を進めるため?

  #### Other

- Past, present and future: An update on W3C's Strategic Objectives on the 37th anniversary of the Web proposal
  - https://www.w3.org/blog/2026/past-present-and-future-an-update-on-w3cs-strategic-objectives-on-the-37th-anniversary-of-the-web-proposal/
- **TAG Associates**
  - https://w3ctag.org/associates/
  - TAG Associates に Igalia の Luke Warlow がジョイン
  - TAG の準メンバーのような立ち位置らしい
- **Web Haptics API · Issue #262 · WICG/proposals**
  - https://github.com/WICG/proposals/issues/262
- W3C Invites Implementations of Geolocation
  - https://www.w3.org/news/2026/w3c-invites-implementations-of-geolocation/
- **Styling underlines**
  - https://w3c.github.io/i18n-drafts/articles/styling/underline.en.html
  - non-Latin 言語の下線スタイリング大全。縦書きのユースケースについてもカバー
  - Out for wide review
- **New article: Number, currency, and unit formatting**
  - https://www.w3.org/International/questions/qa-number-format
- **csskit**
  - https://csskit.rs/
  - OXC インスパイアな Rust 製の CSS Toolkit 集
  - Parser: Spec-compliant CSS parser with full AST support
  - Minifier: Aggressive minification for faster asset delivery
  - Formatting: Beautify your CSS with consistent formatting
  - Transformations: Transform modern syntax to support a wide variety of browsers.
  - LSP: Language server integration for editors and IDEs
  - Highlighting: Syntax highlighting support with Semantic Tokens

  ### TC39/TC55 動向

  #### Meeting

- 2026-01
  - https://github.com/tc39/agendas
  - https://github.com/tc39/notes

  #### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2026-01-01}...main@{2026-02-01}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->2.7
- 2.7->3
- 3->4

  #### New Proposals

  #### WinterTC

- https://github.com/WinterTC55/admin/tree/main/meetings
- 3 月はなし

  #### Other

- We deserve a better streams API for JavaScript | The Cloudflare Blog
  - https://blog.cloudflare.com/a-better-web-streams-api/
  - Node.js コアコントリビューター、Cloudflare Workers メンバーの James Snell による Streams Standards に対する批判記事。
  - 現状の仕様は必要以上に複雑で実装が遅くなりがち。
  - パフォーマンスが出ないため、新しいストリーム API を提案している。
- On the Streams Standard | Domenic Denicola
  - https://domenic.me/streams-standard/
  - Streams Standards の仕様策定を進めていた Domenic Denicola による反論記事。
  - 最適化されたファストパスを実装できるように、内部動作を可能な限り外部から観測できないよう細心の注意を払って設計されているため、パフォーマンスに対する批判は見当違いである。
    - ただし仕様策定から 10 年たって振り返ると BYOB やバックプレッシャーなどの仕様が複雑になってしまったのは反省点だと認める。
  - 現代の Web 標準環境において、基礎的なプリミティブを改善するために予算やリソースを割いてもらうのは、2010 年代よりも遥かに難しい。

  ### IETF 動向

  #### IETF125

- IETF 125 全部録画されている
- https://www.youtube.com/playlist?list=PLC86T-6ZTP5gi5EKPqJf3lneksxOTPetP
- HTTPbis Session Summary
  - https://github.com/httpwg/wg-materials/blob/gh-pages/ietf125/summary.md
  - Agenda / 全体方針:
    - 新機能追加よりも、proxy / tunnel / upload / prefetch など既存周辺仕様の整理と収束が中心。
  - Redirect Header:
    - リダイレクト情報を扱う新ヘッダ案で、必要性や設計の妥当性はまだ継続議論。
  - Signature-Key Header:
    - 鍵情報を HTTP ヘッダで渡す提案で、用途整理と既存方式との関係整理が必要。
  - CONNECT-TCP:
    - TCP トンネル上での trailer 追加は複雑化を招くため、Proxy-Status trailer は採用しない方向。
  - Unbound DATA for HTTP/3:
    - CONNECT 系で途中から raw data に切り替える案で、性能改善の期待は高いが設計は継続中。
  - HTTP Wrap-up Capsule:
    - ストリーム終了時に状態やメタ情報を伝える仕組みとして検討中で、役割整理が必要。
  - Resumable Uploads:
    - HTTP でアップロード再開を標準化する仕様で、機能を広げすぎず最小構成でまとめる方向。
  - Preliminary Request Denied:
    - speculative prefetch などを障害扱いせず拒否する新 status code 案で、強い支持を得て前進。
  - MOQPACK:
    - Media over QUIC 周辺の配送・パッケージング議論で、用途と他仕様との境界整理が課題。
  - まとめ:
    - 全体として「新しい夢」より「実装現場の詰まりを解く」ことに重心が置かれた回。
- TLS
  - https://notes.ietf.org/notes-ietf-125-tls
  - ML-DSA in TLS 1.3
    - ML-DSA を TLS 1.3 で使うための整理 draft で、TLS 1.2 非対応や pre-hash/context string など TLS 向けの運用差分を明文化するのが目的。
    - 大きな方向性は固まっており、WGLC 前に論点を洗い出して収束させる段階。
  - TLS-PAKE / ML-KEM formal analysis
    - PAKE も ML-KEM も、単なる仕様整備より「本当に安全性を示せているか」が最大論点で、特に形式検証・安全性分析の不足が強く指摘された。
    - 結論として、どちらも formal analysis や security analysis を十分に揃えないと前に進めない、という空気がかなり強い。

  #### WG

- RFC
  - RFC 9849 on TLS Encrypted Client Hello
    - https://mailarchive.ietf.org/arch/msg/tls/GpXe0ftisMUCC1NrK4U9Y0AagAY/
- Work
- Meeting

  #### Other

- Using AI to Evaluate Internet Standards (Part Two)
  - https://www.mnot.net/blog/2026/03/25/using_ai
  - mnot 謹製 NotebookLM
    - https://pypi.org/project/ietf-notebook/
  - 膨大な記録を NotebookLM で検索できるようにして、標準化議論への参入障壁を下げる試み

  ### 周辺動向

  #### ベンダー動向

- **About | Bloomberg JS Blog**
  - https://bloomberg.github.io/js-blog/about/
  - https://bloomberg.github.io/js-blog/
  - Bloomberg の JS 活動に関するアウトプットをしていくブログがオープン
- **Temporal: The 9-Year Journey to Fix Time in JavaScript**
  - https://bloomberg.github.io/js-blog/post/temporal/
  - Temporal Stage 4
  - 経緯のまとめと Bloomberg の関与について
  - Bloomberg が Igalia に資金提供して進めていた
  - 実装面では、Google の Internationalization チームと Boa が共同で Rust 製ライブラリ temporal_rs を開発し、複数エンジンが共有するという異例の形がとられている
- **Temporal Reaches Stage 4 | Igalia**
  - https://www.igalia.com/2026/03/13/Temporal-Reaches-Stage-4.html
- Advancing the AT Protocol in Partnership with Eurosky | Igalia
  - https://www.igalia.com/2026/03/18/Advancing-the-AT-Protocol-in-Partnership-with-Eurosky.html
- Source Maps: Shipping Features Through Standards
  - https://bloomberg.github.io/js-blog/post/standardizing-source-maps/
- Look into the future of the web platform - Rachel Andrew
  - https://rachelandrew.co.uk/archives/2026/03/20/look-into-the-future-of-the-web-platform/
  - Baseline の紹介
- Igalia WebKit Team | WebKit Igalia Periodical #58
  - https://blogs.igalia.com/webkit/blog/2026/wip-58/
- Igalia WebKit Team | WebKit Igalia Periodical #59
  - https://blogs.igalia.com/webkit/blog/2026/wip-59/
- Igalia WebKit Team | WebKit Igalia Periodical #60
  - https://blogs.igalia.com/webkit/blog/2026/wip-60/
- Vercel acquires new.website - Vercel
  - https://vercel.com/blog/vercel-acquires-new-website
  - `new.website` を取得
- Opera One integrates Gemini to the sidebar - Blog | Opera News
  - https://blogs.opera.com/news/2026/03/opera-one-adds-gemini-and-google-translate-to-the-sidebar/

  #### セキュリティ動向

- **Bringing more transparency to post-quantum usage, encrypted messaging, and routing security**
  - https://blog.cloudflare.com/radar-origin-pq-key-transparency-aspa/
- Post-Quantum Cryptography Beyond TLS: Remain Quantum Safe | Akamai
  - https://www.akamai.com/blog/security/2026/mar/post-quantum-cryptography-beyond-tls

  #### Other

  ### イベント

- 4 月
  - 20-21: BlinkOn
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/k3qAz6ADbik
- 5 月
  - 19-20: Google I/O
    - https://io.google/2026/
  - 19-21: TC39 Amsterdam
    - https://github.com/tc39/agendas/blob/main/2026/05.md
- 6 月
  - 8-12: WWDC
    - https://developer.apple.com/wwdc26/

  ### Wrap Up

- Chrome
  - Chrome 147 beta
    - CSS `contrast-color()`
    - CSS border-shape
    - Element scoped view transitions
    - CSS update: decoupling of width and style properties
    - CSSPseudoElement interface
    - Math.sumPrecise
    - IWA only: Web Printing API
  - Ship
    - CSS `contrast-color()`
    - Clip Text overflow on user interaction
    - `text-decoration-skip-ink: all`
    - at-rule: CSS Feature Detection
    - PWA でサービスのオリジンが変更されても移行できる
    - OFF の avar2 テーブルをサポートし、バリアブルフォントの補間制御を向上させる
  - Prototype
    - HTML `<toolbar>` element
    - Platform-provided behaviors for Custom Element
    - CSS sticky positioning in single-axis scroll containers
    - Relative Alpha Colors (CSS Color 5 `alpha()` function)
    - CSS `light-dark()` with image values
    - CSS `background-clip: border-area`
    - CSS `fit-content()` function for sizing properties
  - Experiment
    - AI Agent で FedCM
    - Web app HTML `<install>` element
    - Ready for Developer Testing: Declarative Document Patching
    - Ready for Developer Testing: Renewed HTML insertion&streaming methods
  - Deprecate and Remove
  - PSA
  - other intents
  - web.dev
  - Google Developer Blog
    - 2026 年 9 月からリリースサイクルを 4 週から 2 週間に移行
    - focusgroup
    - Scoped Custom Registries が Edge と Chrome でデフォルトサポート
  - Chrome Developers
  - Chromium blog
  - other blogs
  - other
    - PQC の新プログラム発表
    - Google が Wiz を買収
- Firefox
  - 149
    - `popover="hint"`
    - CloseWatcher
    - Experimental
      - Typed `attr()`
      - `color-mix()`
      - alpha & colorspace for input `type="color"`
      - Container Style Query
      - Rust-based JPEG XL decoder
  - Ship
    - `light-dark()` for CSS images
    - multi-color `color-mix()`
  - Prototype and Ship
    - CSS `revert-rule` keyword
    - Canvas2D 'lang' attribute
  - other intents
  - MDN Blog
  - Standard Position
  - other
    - Kit
    - Free VPN (not in Japan)
    - Split View
    - Tab Notes
- Safari
  - TP239
    - `open` pseudo-class for `<input>`
  - Safari 26.4
    - Grid Lanes
    - font-size: math
  - Standard Position
    - Support
      - lazyload audio/video
    - Withdrawn
      - Canvas place element
  - other
    - Apple 50 周年
    - WWDC26 が 6 月
- Edge
  - focusgroup の解説
- W3C/WHATWG
  - Draft
    - Use of Large Language Models in Standards Work
  - Open UI
    - Overscroll Behavior
  - WHATNOT meeting
    - Stage1:
      - Platform Provided Behaviors for Custom Elements
      - Toolbar Element
    - Stage2:
      - Out of Order HTML Streaming
      - HTML in Canvas
    - Stage3:
      - Lazy Loading for Media Elements
  - CSSWG
    - `position: sticky;` for single axis aware
  - Other
    - TAG Associates に Luke Warlow が選出
- TC39
  - WinterTC
  - WHATWG Stream について James / Domenic の議論
- IETF
  - IETF125
    - HTTBis
      - 細かい話のみ
    - TLS
      - ML-DSA, ML-KEM の TLS 対応が安全化は formal analysis が必要
  - RFC 9849 on TLS Encrypted Client Hello
  - mnot 謹製 IETF NotebookLM
- 周辺動向
  - ベンダー動向
    - Bloomberg JS Blog 開始
    - Temporal Stage 4 についての記事が Bloomberg, Igalia から
  - セキュリティ動向
    - PQC に関する記事が CF, Akamai から
  - Other
