---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep209.mp3
published_at: 2026-06-30
guests:
  - name: "@saku"
    url: https://x.com/sakupi01
  - name: "@petamoriken"
    url: https://x.com/petamoriken
---

# ep209 Monthly Platform 202606

## Theme

第 209 回のテーマは 2026 年 6 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 149

#### Updates

- New in Chrome 149
  - https://developer.chrome.com/blog/new-in-chrome-149
  - **CSS gap decorations**
  - Disconnect WebSockets on bfcache entry
  - `Intl.Locale.prototype.variants`
- Chrome 150 beta
  - https://developer.chrome.com/blog/chrome-150-beta
  - CSS and UI
    - AccentColor and AccentColorText system colors
    - Allow optional rounding parameter for `polygon()`
    - Animatable zoom
    - CSS URL request modifiers
    - **CSS `text-fit` property**
    - **CSS `background-clip: border-area`**
    - CSS `image(<color>)` function
    - **CSS `light-dark()` with image values**
    - **Clone into all descendant selectedcontent elements**
    - **Comma-separated container queries**
    - Expose unprintable areas to CSS
    - **The `focusgroup` attribute**
    - **Media element pseudo-classes**
    - **popover=hint behavior changes**
    - **Relative alpha colors**
    - **`flex-wrap:balance`**
    - **`named-feature()` function for CSS `@supports`**
    - `overscroll-behavior: chain`
  - Web APIs
    - Disable SVG filters on plugins and cross-origin or restricted iframes
    - **IndexedDB: SQLite backend**
    - MediaStreamTrackProcessor frame counters
    - Opaque origin for data: URLs
    - PWA origin migration
    - Parse processing instructions in HTML
    - **Out-of-order streaming**
    - Programmatic scroll promises
    - WebGPU Immediates
    - Web Speech API: On-device recognition quality
  - New origin trials
    - Email Verification Protocol (EVP)
  - Deprecations and removals
    - Remove [LegacyNoInterfaceObject] from FontFaceSet IDL
- What's new in DevTools (Chrome 149)
  - https://developer.chrome.com/blog/new-in-devtools-149
  - DevTools for agents
  - AI assistance
  - WebMCP
  - Code completion for CSS
  - APCA color contrast guidelines promoted to stable
  - Dynamic Device Mode user agent
- What's New in WebGPU (Chrome 149-150)
  - https://developer.chrome.com/blog/new-in-webgpu-149-150

  #### Intents

- Ship: Allow optional rounding parameter for `polygon()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zURJF7ODxws
- **Ship: Relative Alpha Colors (CSS Color 5 `alpha()` function)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fl5TIBDLHuo
- Ship: Web Speech API: Unspoken Punctuation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cD_-fohuHrs
- **Ship: `flex-wrap:balance`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Z8Rb8Q4W2jM
- **Ship: `named-feature()` function for CSS `@supports`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jRufi9adKY0
- Ship: MediaStreamTrackProcessor frame counters
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VEWxjnESgho
- Ship: Animation accessor on animation and transition events
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Us8Nbi31ALI
- Ship: CPU Performance API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/igPwzkxhQtk
- Ship: Deprecate and Remove Digital Credential API support for unspecified exchange protocols
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fc7awi_7hYo
  - もともと任意プロトコル向けだったが絞ることにした
  - UseCounter は 2026/4 からほぼゼロ
  - 2027 年に Deprecate 開始
  - Mozilla は DC API に否定的で、WebKit は既に org-iso-mdoc プロトコルのみをサポート
- **Ship: Speculation rules: form_submission field**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/R--5UZkpwZk
  - form submission で prerender できなかったのを可能にする
- **Ship: Support `hreflang` and `type` for HTMLAreaElement**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FEeoLfm2yg4
  - `<svg>` の `<a>` に揃えて、`<area>` にも `hreflang` と `type` を付与
- **Ship: XML Parsing in Rust for non XSLT scenarios**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/A-EM4e-JrTA
  - XSLT 無き世界の XML パーサとして libxml2 の代替を Rust で書いた
  - DOMParser, XHR, SVG などが対象
  - 従来よりパフォーマンスが悪化するが、メモリ安全になる
- Ship: `textStream()` for response/request/blob
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Jr2Ye0dCuRw
  - TextDecoderStream を使わなくても text でストリームできる
- **Ship: window-drag**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vs0G2K93CQw
  - PWA などで、独自タイトルバーなどを、Window 全体をドラッグできる領域に指定する
  - `app-region` プロパティの標準化
  - Chromium は `app-region`/`-webkit-app-region`をサポートし続ける
- Ship: DeviceOrientation Events permission request API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ckd2rFmT3PA
- **Ship: Wheel event momentum**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GEdIlHNm7mM
  - 指を離したあとの慣性(fling)イベントを区別するための属性
- **Ship: aria-actions**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DNE6dB1AS0Y
  - 古い Prototype を MS の人が resume
  - インタラクティブな要素の二次アクションの存在を伝える
    - 要素の中まで細かく見なくても良い
  - Tab にある close button など
  - Firefox 実装済み
  - Over Scroll Areas 文脈でも有用性がある
- Ship: Connection Allowlists
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rFiZF7fPIv4
- Ship: Cross-origin redirect timing opt-in
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BDdFJLzB4Do
- Ship: PerformanceSoftNavigation and InteractionContentfulPaint performance entry
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BfSsaY2b_y8
- **Ship: Reference Target**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eBx3sXIfJnw
- Ship: WebGPU: Subgroup Size Control
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Lx06y9Rdzvs
- **Ship: Declarative shadow DOM: shadowrootslotassignment attribute**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RO1Szfhu3mA/
  - `shadowrootslotassignment`属性が HTMLTemplateElement に追加され、宣言的 shadow root での手動スロット割り当てが可能になる。
  - これまで手動割り当ては`attachShadow({slotAssignment: "manual"})`を介してのみ利用可能だった。
  - 属性は"named"(デフォルト)と"manual"を受け入れ、`shadowRootSlotAssignment`プロパティで反映される。
  - 既存のコンテンツには影響を与えず、Gecko と WebKit が既に実装済みで、Chromium でのサポートが完了する。
- Ship: CSS Image Animation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NOLPwZpc4CY
- Prototype and Ship:
- Prototype:
- Prototype: Support `visibility:collapse` on flex items
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/p9BjWhy32m4
- Prototype: aria-actions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cYs7hgcwgcU
- Prototype - SVG Path Data API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TVIVah_HHcg
- Prototype: Application context media feature
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XuNJTOo2jYs
- Prototype: Cross-origin redirect timing opt-in
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GOPn8-wQlsk
- Prototype: FedCM Native IdPs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BipcxLjvFDE
- Prototype: Connection Allowlists Embedded Enforcement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QHhBWQ0oUrA
- Prototype: Implement MathML `<a>` element
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kmtYoVZjtZE
- Prototype: InputTypeColorEnhancements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-vt_K4rzb6M
- **Prototype: Multi-Range Selection**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/it0aKKGD5A0
  - Selection API で同時に複数の選択ができるように拡張する提案
  - Chrome の実装が一箇所限定らしい
- **Prototype: Sub apps**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Z-PeHA85DcI
  - 単一の Isolated Web Apps(IWA) で複数の名前/アイコンのアプリをインストール
- Experiment: Algorithm Updates in WebCrypto
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TF8y175J3YU
- Experiment: IncognitoStaticStorageQuota
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7z4bZXoe-hU
- Experiment: WebRTC Diagnostic Logging API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/L2kX7raIUCE
- Ready for Developer Testing: Algorithm Updates in WebCrypto
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WKF2N040tGM
- Ready for Developer Testing: Sub apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3fAAcLVxA3Y
- Extend Experiment: Speculation Rules: prerender-until-script Action
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jG8vcT9bDGc
- Extend Experiment: HTML-in-canvas
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BpWbzJ9P22s
- Extend Experiment: WebAudio: Configurable render quantum
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ogCIG5p7mB8
- Extend Experiment: Digital Credentials API (issuance support)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/27cnix030V4
- Request for Deprecation Trial: Deprecate and remove XSLT
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/V6Gj-MM4WVY
- Change:
- Unship:
- Remove:
- PSA:
- Web-Facing Change PSA: Clone into all descendant `selectedcontent` elements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AD060pFNeZU
- Web-Facing Change PSA: Update text selection on `mouseup` before dispatching click event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YUXe7QEQAc8
- Web-Facing Change PSA: Change the `"position-anchor"` initial value to `"normal"`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uYsK4bwvK24
- Web-Facing Change PSA: LanguageDetector support for Traditional vs. Simplified Chinese
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jzHYvmyjTYM
- Web-Facing Change PSA: Permission policies for Direct Sockets API in Isolated Web Apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5cSZjgnJelk
- **Web-Facing Change PSA: Reject cookies with empty name and ambiguous serialization**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SQUdQBMJqDk
- Web-Facing Change PSA: `shadowrootslotassignment` attribute for declarative shadow DOM
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FtPdJzVvnIA
- Web-Facing Change PSA: No Auto-Rewind for AnimationTrigger Play Methods
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gBz0Mp1v8II
- Web-Facing Change PSA: Remove [LegacyNoInterfaceObject] from FontFaceSet IDL
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mqvr2uSJ1Wc
- Web-Facing Change PSA: Navigations can now be captured into an installed PWA
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xl1hGAfxlA0
- Web-Facing PSA: Remove 64k Text Node Splitting
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6KcNuIEHyZ0

  #### Other

- web.dev
  - https://web.dev/
  - May 2026 Baseline monthly digest
    - https://web.dev/blog/baseline-digest-may-2026
  - Effortlessly get Baseline target data with the updated Baseline Checker tool
    - https://web.dev/blog/baseline-ga-checker-update
- google for developers
  - https://developers.googleblog.com/
  - A2UI + MCP Apps: Combining the best of declarative and custom agentic UIs
    - https://developers.googleblog.com/a2ui-and-mcp-apps/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - https://developer.chrome.com/blog/
  - Join the WebMCP origin trial
    - https://developer.chrome.com/blog/ai-webmcp-origin-trial
  - Seamless PWA origin migration: Change domains without losing users
    - https://developer.chrome.com/blog/seamless-pwa-origin-migration
  - **Unlock runtime insights: Introducing third-party developer tools for Chrome DevTools for agents**
    - https://developer.chrome.com/blog/devtools-for-agents-3p-tools
    - フレームワークのコンポーネントの依存関係や内部状態をエージェントに伝えるツールを実装するための Discovery API
    - Chrome DevTools for agents 関連の JS API で、フレームワーク側がこれを使ってツールを実装することで DevTools for agents を介して利用できる
    - Angular は対応
  - A developer toolkit to make your website agent-ready
    - https://developer.chrome.com/blog/agent-ready-toolkit
    - Lighthouse に Agentic browsing が導入され、AI にとっての使いやすさを計測する
      - アクセシビリティ
      - CLS
      - Web MCP の利用状況
- chromium blog
  - https://blog.chromium.org/
  - デザイン変わった?
  - A Double Victory for Web Speed: Chrome Breaks Records Again on Speedometer 3.1 and Jetstream 3
    - https://blog.google/chromium/a-double-victory-for-web-speed-chrome-breaks-records-again-on-speedometer-31-and-jetstream-3/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
- search blog
  - https://developers.google.com/search/
- v8
  - https://v8.dev/
- other
  - A Look at Hardware Security Keys for Passkeys - Google Bug Hunters
    - https://bughunters.google.com/blog/hardware-security-keys-for-passkeys
    - Passkeys をハードウェアセキュリティキーで使う話
    - 欠点もあるが、特に強固なセキュリティ戦略が必要な場合に有効な場合も
  - Where to Go Next with Quantum-Safe Certificates - Google Bug Hunters
    - https://bughunters.google.com/blog/next-with-quantum-safe-certificates
  - Bug Hunting on Gemini Spark - Google Bug Hunters
    - https://bughunters.google.com/blog/spark-release
    - Gemini Spark において、持続的エージェントが Gemini アプリに追加された。
    - 新しいパラダイムに対するセキュリティテストのアプローチを学ぶ必要がある。
    - 高影響のバグに焦点を当てることが重要である。
  - Bit Rot Doesn't Always Increase Entropy - A Story from the Archives - Google Bug Hunters
    - https://bughunters.google.com/blog/bit-rot-doesnt-always-increase-entropy
    - 2010 年の事例を振り返る。
    - 統計的異常がセキュリティクリティカルライブラリの微細な欠陥を発見。
    - Bit Rot が常にエントロピーを増加させるわけではない。
  - How Google used Gemini and other AI products to build I/O 2026
    - https://blog.google/innovation-and-ai/technology/ai/io-2026-google-ai/
    - I/O のブランドカラーやアイコンも Gemini で作られていた
  - Read Sundar Pichai's Stanford commencement speech
    - https://blog.google/company-news/inside-google/message-ceo/stanford-commencement-speech-2026/
  - Meet Dreambeans, an app that connects you with what matters
    - https://blog.google/innovation-and-ai/models-and-research/google-labs/dreambeans/
  - Google AI announcements from May 2026
    - https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-may-2026/
  - Google's June 2026 frauds and scams advisory
    - https://blog.google/innovation-and-ai/technology/safety-security/fraud-scams-advisory-june-2026/
  - How Google is combatting AI scams and dismantling the "Outsider Enterprise"
    - https://blog.google/innovation-and-ai/technology/safety-security/combatting-ai-scams/
  - **Introducing Google AI Threat Defense to help you outpace the adversary**
    - https://cloud.google.com/blog/products/identity-security/introducing-google-ai-threat-defense
  - Verifiable trust in the AI era: What's new in Confidential Computing
    - https://cloud.google.com/blog/products/identity-security/verifiable-trust-in-the-ai-era-whats-new-in-confidential-computing
  - Public and Private Medical Community Targeted by China-Nexus Threat Actor Pursuing Artificial Intelligence, Cyber, Medical, and National Defense Research
    - https://cloud.google.com/blog/topics/threat-intelligence/prc-targets-us-medical-research
  - **Addy Osmani が Google 退職**
    - https://www.linkedin.com/feed/update/urn:li:activity:7473623133363666944/

  ### Firefox 動向

  #### Stable: 152

  #### Updates

- https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases
- Backup for a Rainy Day - These Weeks in Firefox: Issue 202
  - https://blog.nightly.mozilla.org/2026/06/01/backup-for-a-rainy-day-these-weeks-in-firefox-issue-202/
- More Kit, More Control - These Weeks in Firefox: Issue 203
  - https://blog.nightly.mozilla.org/2026/06/03/more-kit-more-control-these-weeks-in-firefox-issue-203/
- Giving You More Control - These Weeks in Firefox: Issue 204
  - https://blog.nightly.mozilla.org/2026/06/15/giving-you-more-control-these-weeks-in-firefox-issue-204/
- Eyedropper Quick Action, geckodriver 0.37, and Tighter File Permissions - These Weeks in Firefox: Issue 205
  - https://blog.nightly.mozilla.org/2026/06/22/eyedropper-quick-action-geckodriver-0-37-and-tighter-file-permissions-these-weeks-in-firefox-issue-205/
  - Eyedropper の新しいクイックアクションが追加された。
  - geckodriver 0.37.0 がリリースされ、新しい API のサポートやバグ修正が含まれる。
  - Firefox 153 からローカルファイルへのアクセスがデフォルトで制限され、拡張機能は明示的な権限が必要となる。
- What's new in Firefox this June, and what's next on the Firefox roadmap
  - https://blog.mozilla.org/en/firefox/firefox-roadmap-152/
  - Firefox は生産性、プライバシー、AI に関するアップデートを導入。
  - Project Nova とブラウザ全体の AI コントロールを展開中。
  - プライバシー保護の強化と整理の新しい方法を提供。
  - Firefox のロードマップを発表し、Mozilla Connect でのフィードバック募集
  - 6 月 24 日に Reddit AMA を開催予定。

  #### Intents

- Ship: IndexedDB `getAllRecords()` and `IDBGetAllOptions` for `getAll()`/`getAllKeys()`
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/yJLlEvNHws0
- Ship: WebAssembly JS-Promise-Integration
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/8cOxM-dWaNs
- **Ship: `sibling-index()` and `sibling-count()`**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ETcS1koo7J0/
  - Chrome 138, Safari 26.2 から実装済み
- **Prototype and Ship: Source Phase Imports**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/yaGHBIugfQA
- Prototype and Ship: Iterator Chunking
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/A8pO8KEX1xA
- Prototype and Ship: Iterator Includes
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/0jpOlrtPyAE
- Prototype and Ship: Iterator Join
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/i4YmlIMXDVo
- Prototype: `sibling-index()` and `sibling-count()`
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/6Pmh63BB1bc
- **Prototype: CSS `progress()` function**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/giHoV_7PxfY
- Prototype and Ship: Intl.LocaleInfo
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/l13xKAR6jpw
- **Prototype: `alpha()` relative color function**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/3jC_H0oP5f8
- **Prototype: `text-box-trim` / `text-box-edge`**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Ys0yVWrjo_E
  - テキストの上下のスペースを制御し垂直間隔と整列を実現
  - block/inline-box trimming は実装済み、multi-col は進行中
  - Chrome 133, Safari 18.2 は実装済み
- Change:
- Remove:
- Unship: cookieBehavior LIMIT_FOREIGN (3) and REJECT_TRACKER (4)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/_5YW8hRfORc
- Updates to Firefox Sec Approval, Rating Process, and Keywords
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/LyqopJFkPLs/m/3colW9MZBQAJ
- What's new in Firefox this June, and what's next on the Firefox roadmap
  - https://blog.mozilla.org/en/firefox/firefox-roadmap-152/

  #### Newsletter

- https://fxdx.dev/
- Firefox WebDriver Newsletter 152 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-152/
  - WebDriver はユーザーエージェントの制御と検査を可能にするリモートコントロールインターフェースである。
  - Firefox 152 では、複数の WebDriver バグが修正され、特に webExtension.install コマンドやスナップショットコマンドの改善が行われた。
  - 開発者は JavaScript、Python、Rust で書かれた WebDriver コードに貢献でき、設定方法やメンター付き課題のリストも提供されている。

  #### MDN / Open Web Docs

- https://developer.mozilla.org/en-US/blog/
- **Introducing the MDN MCP server**
  - https://developer.mozilla.org/en-US/blog/introducing-mdn-mcp-server/
  - MDN MCP サーバーがリリースされた。
  - MCP は AI ツールが外部データソースに接続できるオープンスタンダードである。
  - MDN MCP を使用すると、最新のウェブプラットフォーム情報にアクセス可能で、開発効率が向上する。
- **Web Security docs on MDN**
  - https://openwebdocs.org/content/posts/security-docs-sovereign-tech-agency/
  - MDN の Web セキュリティに関する docs 大幅アップデート
  - ４項目に分けて構成
    - Attacks
    - Defenses
    - Threat Modeling
    - Authentication
  - 今後はプライバシーに関する docs に注力していく予定

  #### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2026-06-01+
- Positive
  - `line-clamp` CSS property (collapse variant)
    - https://github.com/mozilla/standards-positions/issues/984
  - **Text-Scale `<meta>` element**
    - https://github.com/mozilla/standards-positions/issues/1326
  - **`named-feature()` function for CSS `@supports`**
    - https://github.com/mozilla/standards-positions/issues/1340
  - **Out of order streaming**
    - https://github.com/mozilla/standards-positions/issues/1369
  - **[css-sizing] `fit-content(<length-percentage>)` value of width/min-width/max-width property**
    - https://github.com/mozilla/standards-positions/issues/1378
  - `overscroll-behavior: chain`
    - https://github.com/mozilla/standards-positions/issues/1406
  - [html] `<input type="color">` alpha and colorspace attributes
    - https://github.com/mozilla/standards-positions/issues/1424
- Withdrawn
  - TextTrackCue enhancements for programmatic subtitle and caption presentation
    - https://github.com/mozilla/standards-positions/issues/891

  #### Other

- April in Servo: new Android UI, focus, forms, security fixes, and more! - Servo aims to empower developers with a lightweight, high-performance alternative for embedding web technologies in applications.
  - https://servo.org/blog/2026/05/31/april-in-servo/
- **Session History Diagrams in Firefox DevTools | farre's blog**
  - https://blog.farre.se/posts/2026/06/01/session-history-diagrams/
  - 閲覧履歴の History について深堀った知見をまとめた記事
- **Keeping the Web Open and Private in the Bot Era**
  - https://blog.mozilla.org/en/privacy-security/keeping-the-web-open-and-private-in-the-bot-era/
  - 特定のベンダに依存する「デバイス証明」(Private Verification Tokens)やメアド登録や VPN 禁止による「プライバシーの侵害」を避けつつ、レート制限付きの匿名クレデンシャルを用いて、サイト側がボットの大量アクセスを防げるようにする仕組み PACT(Private Access Control Tokens) を発表
  - Mozilla と Cloudflare や Chrome を含む他ブラウザベンダー、IETF などと連携していく予定
  - Moderation-of-unLinkable-Endorsements
    - https://github.com/Moderation-of-unLinkable-Endorsements
- **PACT: Anonymous Credentials for the Web - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2026/06/pact-anonymous-credentials-for-the-web/
  - 匿名の認証情報を提供する新しいシステム
  - 現在の Web は、Bot による悪用が増加しておりサイトはユーザーを識別するために侵入的な手段を用いることが多い。
  - プライバシー保護ブラウザの普及により、従来のボット識別手法が効果を失いつつある。
  - 大手企業が提案したデバイス認証に基づくソリューションは、ユーザーのプライバシーを損なう可能性がある。
  - PACT では、スカースシグナル(稀少性のシグナル)を利用し、ユーザーのプライバシーを保護しつつ、Bot を防止できる仕組みを目指す。
  - ユーザーは、信頼できるサイトからエンドースメントを受け取り、それを基にクレデンシャルを取得する。
  - クレデンシャルは、ユーザーの行動に応じて更新され、ボット対策としてのレート制限を実施する。
  - PACT の実装には、プライバシーとセキュリティの厳格な分析が必要であり、オープンな形で開発を進める予定である。
  - このシステムは、ウェブのオープン性とプライバシーを両立させることを目指している。
- The web is evolving. So are we
  - https://blog.mozilla.org/en/mozilla/news/announcing-mozilla-org-new-non-profit/
  - Mozilla の長期的成功を支える非営利団体として [Mozilla.org](http://Mozilla.org) を設立
  - AI が Web を再形成している中で、オープンインターネットを守る必要性が強調された。
  - Mozilla は、ユーザの選択を尊重するブラウザ、プライバシー重視のメーラ、OSS の AI、データ共有を促進する場として進化
  - [Mozilla.org](http://Mozilla.org) は、Mozilla のさまざまな要素を統合し、資金の配分やブランド管理、長期戦略の形成を行う戦略的基金として機能する。
  - Mozilla の使命と非営利所有のコミットメントは変わらない。
  - Mozilla の各組織は、501(c)(3)の Mozilla Foundation の傘下に留まる。
  - 新しい構造により、リソースを柔軟に指揮し、行動を調整することが容易になる。
- **Building Competitive Digital Markets: From Rules to Results - Open Policy & Advocacy**
  - https://blog.mozilla.org/netpolicy/2026/06/23/building-competitive-digital-markets-from-rules-to-results/
  - Digital Markets Act は、競争を促進し、イノベーションを支援するための先行的な競争フレームワークである。
  - Firefox は、選択画面を通じて 600 万回以上選ばれ、EU における日々のアクティブユーザー数が増加した。
  - 各国の政策立案者は、デジタル市場における集中した権力に対処し、競争と選択肢の拡大を認識している。
- Firefox is easier than ever to customize
  - https://blog.mozilla.org/en/firefox/firefox-settings/
  - 設定画面を刷新しカスタマイズが容易になった
- May highlights: Contributor spotlight, Web Serial support, and more - about:community
  - https://blog.mozilla.org/community/2026/06/12/newsletter-may-2026/
  - 現在、少数のテック企業がアメリカの 3 億人以上のインターネットユーザーのオンライン体験を支配している。
  - アメリカのイノベーションと選択オンライン法(AICOA)は、主要テックプラットフォームの有害なゲートキーパー行動を抑制することを目的としている。
  - AICOA は、ユーザーが自らの選択を行い、競争が製品の質に基づくようにすることを目指している。
- Browse more privately all summer with Firefox's free built-in VPN
  - https://blog.mozilla.org/en/firefox/firefox-built-in-vpn-summer/
- Make Firefox your World Cup sidekick this summer
  - https://blog.mozilla.org/en/firefox/firefox-world-cup/
- Launching the Rust Foundation Maintainers Fund | Rust Blog
  - https://blog.rust-lang.org/2026/06/02/launching-the-rust-foundation-maintainers-fund/

  ### Safari 動向

  #### Stable: 26.5

  #### Updates

- https://webkit.org/blog/
- Safari Technology Preview NN
- **News from WWDC26: WebKit in Safari 27 beta | WebKit**
  - https://webkit.org/blog/17967/news-from-wwdc26-webkit-in-safari-27-beta/
  - **Customizable Select**
    - `<selectedcontent>`, `appearance: base-select`, `::picker-icon` and `::checkmark`
    - Additional bug fixes:
  - Animations
    - Additional bug fixes:
  - CSS
    - Transform-aware anchor positioning
    - **`:heading` pseudo-class**
    - **revert-rule keyword**
    - stretch keyword for box sizing
    - Dutch IJ digraph in `text-transform: capitalize` and `::first-letter`
    - `position-anchor: normal` and `none`
    - `anchor-valid` and `anchor-visible`
    - Style containment for quotes
    - `insert` keyword for `text-autospace`
    - Additional Bug Fixes:
  - Scroll Anchoring
    - Additional bug fixes:
  - HTML
    - **`sizes="auto"` on img**
    - `shadowrootslotassignment` attribute
    - Additional bug fixes:
  - JavaScript
    - Top-Level Await
    - Additional bug fixes:
  - WebAssembly
    - JavaScript Promise Integration (JSPI)
    - Additional bug fixes:
  - MathML
    - Multiple-character operators in MathML
    - `tabindex`, `focus()`, `blur()`, and `autofocus` on MathML
    - Additional bug fixes:
  - Spatial Web
    - Immersive website environments in visionOS
    - img controls on spatial and panorama photos
    - model on iOS, iPadOS, and macOS
    - dynamic-range-limit on model
    - Additional bug fixes:
  - WebGPU
    - Additional bug fixes:
  - Media
    - `TextTrackCue.endTime` = Infinity
    - Additional bug fixes:
  - Web API
    - Service Worker static routing API
    - Dedicated workers inside shared workers
    - ReadableStream improvements
    - Additional bug fixes:
  - Rendering
    - `srgb-linear` and `display-p3-linear`
    - Subpixel inline layout
    - Additional bug fixes:
  - WebRTC
    - Additional bug fixes:
  - Web Extensions
    - Additional bug fixes:
  - Networking
    - Secure cookies on loopback
    - Additional bug fixes:
  - Storage
    - maxAge in the Cookie Store API
    - Additional bug fixes:
  - Editing
    - Additional bug fixes:
  - SVG
    - Additional bug fixes:
  - WKWebView
  - Web Inspector
    - Additional bug fixes:
  - Accessibility
  - Forms
  - Printing
  - Updating to Safari 27
- **Web Technology Sessions at WWDC26 | WebKit**
  - https://webkit.org/blog/17974/web-technology-sessions-at-wwdc26/
  - What's New in Safari 27
  - **Grid Lanes**
  - **Customizable Select**
  - model element
  - Immersive website environments
  - Web Extensions
- Release Notes for Safari Technology Preview 245 | WebKit
  - https://webkit.org/blog/17970/release-notes-for-safari-technology-preview-245/
  - Accessibility
  - CSS
    - New Features
    - Added support for the case-sensitive modifiers in CSS attribute selectors.
    - Added support for the :host:has() compound selector in CSS.
  - Editing
  - HTML
  - Images
  - JavaScript
    - New Features
    - Added support for static import defer semantics.
  - MathML
    - New Features
    - Added support for operator dictionary entries for multi-character operators to align with the MathML Core specification.
  - Media
  - Rendering
  - SVG
  - Web API
  - Web Extensions
  - Web Inspector
    - New Features
    - Added unique colors for style events such as "Style Invalidated" and "Style Recalculated" in the Timeline view to distinguish them from layout events.
  - WebGPU
  - WebRTC
- Release Notes for Safari Technology Preview 246 | WebKit
  - https://webkit.org/blog/18128/release-notes-for-safari-technology-preview-246/
  - Accessibility
  - CSS
    - **Added support for `<image>` values in `light-dark(<image>, <image>)`.**
    - Added support for using the CSS `attr()` substitution function on pseudo-elements with non-trivial originating elements.
    - Added support for `image(<color>)` in the `<image>` value type.
    - Enabled the `font-variant-emoji` property in preview.
    - **Enabled `word-break: auto-phrase` in preview.**
    - Added support for `color-mix()` with more than two colors.
    - **Added support for the `alpha()` relative color function.**
  - Canvas
  - Editing
  - Forms
  - HTML
    - **Added support for popover close watcher integration.**
    - Added support for SVG `<a>` as an argument to `Origin.from()`.
  - Images
  - JavaScript
  - Media
  - Networking
  - Rendering
  - SVG
    - Made SVG `<use>` work without specifying a fragment identifier.
    - Removed support for the non-standard `glyph-orientation-horizontal` property.
  - Scrolling
  - Storage
    - Added support for storing `FileSystemHandle` objects in IndexedDB.
  - Web API
    - **Added support for the `Origin-Agent-Cluster` HTTP response header.**
  - Web Extensions
  - Web Inspector
    - Added a separate column to show the node associated with layout and rendering events.
  - WebGPU
  - WebRTC
- Discover MapKit JS 6: Rebuilt for Today's Web Developer | WebKit
  - https://webkit.org/blog/18027/discover-mapkit-js-6-rebuilt-for-todays-web-developer/
  - 地図ライブラリの刷新
  - npm, ts, event target, promise ベースなど
- **Introducing the Field Guide to Grid Lanes | WebKit**
  - https://webkit.org/blog/18098/introducing-the-field-guide-to-grid-lanes/
  - Grid Lanes のフィールドガイドが gridlanes.webkit.org で公開された。
  - インタラクティブなプレイグラウンドで、レイアウトの編集や CSS の直接編集が可能。
  - 参考ガイドには、プロパティや値の詳細が含まれ、さまざまなデモが用意されている。
- **The golden rule of Customizable Select | WebKit**
  - https://webkit.org/blog/18117/the-golden-rule-of-customizable-select/
  - Safari 27 で CSE がくる
  - アクセシビリティやキーボードナビゲーションを妥協する必要がない。
  - 重要なルールは、オプション要素にテキストコンテンツまたはアクセシブルなテキスト属性を常に提供すること。
  - このルールを破ると、ユーザー体験が悪化し、アクセシビリティツールとの互換性が損なわれ、未対応のブラウザでは機能しなくなる。
  - アイコンのみで表現されたオプションは、ユーザーにとってわかりにくい。

  #### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2026-06-01+
- Support
  - CSS anchor positioning with transforms
    - https://github.com/WebKit/standards-positions/issues/558
- Oppose
  - **WebMCP**
    - https://github.com/WebKit/standards-positions/issues/670
    - 人間と AI で UI を分けるべきではない
    - HTML やアクセシビリティをもっと AI にも人間にもわかりやすく洗練させていくのがウェブとしての正しい進化の方向性では
    - TPAC 2026 でのトピックの一つになりそう
- Duplicate
  - Cross App and Web Attribution Measurement
    - https://github.com/WebKit/standards-positions/issues/307

  #### Other

- Igalia WebKit Team | WebKit Igalia Periodical #66
  - https://blogs.igalia.com/webkit/blog/2026/wip-66/
- **Shared-memory threads for JavaScriptCore**
  - [https://github.∂com/oven-sh/WebKit/pull/249](https://github.com/oven-sh/WebKit/pull/249)
  - Bun が experimental な実装として JSC に Thread クラスを入れるのを試みている
    - Worker と違いオブジェクトのシリアライズ、デシリアライズを必要としない
  - 2017-08 filpizlo による WebKit ブログが元の提案らしい
    - https://webkit.org/blog/7846/concurrent-javascript-it-can-work/
  - Stage 1 Shared Structs にフィードバックされそう
    - https://es.discourse.group/t/new-thead-for-shared-memory-isolation/2604

  ### Edge 動向

  #### Stable: 149

  #### Updates

- https://blogs.windows.com/msedgedev/
- Faster updates, enterprise-friendly schedule: the new Microsoft Edge release cycle - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2026/06/11/faster-updates-enterprise-friendly-schedule-the-new-microsoft-edge-release-cycle/
  - Edge も Chrome と同じくリリースサイクルを短縮
  - Stable は 2 週間、Extended Stable は 8 週間
  - 8 月末なので Chrome よりも早く変更
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見れる
- https://twitter.com/MSEdgeDev
  - これを見るしか無い

  #### Other

- **Webwright: A Terminal Is All You Need For Web Agents - Microsoft Research**
  - https://www.microsoft.com/en-us/research/articles/webwright-a-terminal-is-all-you-need-for-web-agents/
  - エージェントが使うための Playwright の Bash コマンド
- Expanding on‑device AI in Microsoft Edge: New models and APIs for the web - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2026/06/02/expanding-on-device-ai-in-microsoft-edge-new-models-and-apis-for-the-web/
  - Aion-1.0-Instruct 小型言語モデルの開発者プレビューを Edge Canary および Dev チャネルで提供。
  - Language Detector および Translator APIs が Edge 148 で利用可能、オンデバイスのタスク特化型モデルを活用。
  - 新しいオンデバイス音声認識機能が Web Speech API で導入、プライバシー向上とレイテンシ低減を実現。
  - AI を活用した Web 体験の構築が可能で、特別なハードウェアやクラウドサービスに依存しない。
- A Quarter Century in Tech - text/plain
  - https://textslashplain.com/2026/06/18/a-quarter-century-in-tech/
  - Eric 先生、業界に四半世紀いる記念

  ### WHATWG/W3C 動向

  #### Draft

- https://www.w3.org/news/
- Recommendation
- Candidate Recommendation
  - W3C Invites Implementations of HTML Ruby Markup Extensions
    - https://www.w3.org/news/2026/w3c-invites-implementations-of-html-ruby-markup-extensions/
- Working Draft
- First Public Working Draft
  - **Quantum-Resistant Cryptosuites v1.0**
    - https://www.w3.org/news/2026/first-public-working-draft-quantum-resistant-cryptosuites-v1-0/
    - Verifiable Credentials Working Group が Quantum-Resistant Cryptosuites v1.0 の First Public Working Draft を発表した。
    - ドキュメントは、量子耐性デジタル署名アルゴリズムを使用したデジタル署名生成のためのデータ整合性 Cryptosuites を定義している。
    - 最近の研究結果により、楕円曲線鍵が 2030 年代初頭に破られる可能性が示唆されている。
    - 組織は量子耐性暗号アルゴリズムへの移行を開始しており、2029 年までに実施予定である。
  - **CSS Linked Parameters Module Level 1**
    - https://drafts.csswg.org/css-link-params-1/
    - SVG などの外部ファイルに対して、スタイルを渡せるようにする
    - ホバー時などの外部 SVG にスタイルできるようになる
    - 受け取る側:
      - `<svg>`
      - `<path fill="env(--color, black)" d="..." />`
      - `</svg>`
    - パラメータを渡す側:
      - `<img src="image.svg#param(--color, blue)">`
      - `background-image: url("image.svg" param(--color, var(--primary-color)));`
    - Firefox は実装ずみ:
      - https://bugzilla.mozilla.org/show_bug.cgi?id=2022783
- Group Note Draft
- Diversity report 2026
  - https://www.w3.org/news/2026/diversity-report-2026/
- W3C opens Inclusion Fund and Invited Expert Fund for TPAC 2026
  - https://www.w3.org/news/2026/w3c-opens-inclusion-fund-and-invited-expert-fund-for-tpac-2026/
  - W3C は TPAC 2026 のために TPAC Inclusion Fund と Invited Experts Support Fund の申請を開始した。
  - これらのファンドは参加の障壁を減らし、多様性を高めることを目的としている。
  - TPAC 2026 は 2026 年 10 月 26 日から 30 日までダブリンで開催される。
  - 申請は 2026 年 7 月 31 日まで受け付けている。

  #### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- 2026-06-04
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2026-06-04.md
- 2026-06-11
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2026-06-11.md
- 2026-06-25
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2026-06-25.md
- Overscroll Areas feel like they should be done through CSS
  - https://github.com/openui/open-ui/issues/1457
  - HTML でやるか CSS でやるか
  - HTML でやる方向だったけど、議論の中で「これはスタイルマターではないのか?」という意見が出て再検討
  - CSS でやると `@media` などと組み合わせやすい。モバイル・デスクトップでの UI の切り替えが容易になる
  - HTML 案はアクセシビリティを担保しやすい。ボタン UI などと紐づけることで AT への動線が張りやすい
  - タッチ・ジェスチャー操作だけで利用できる機能にならないように議論されている

  #### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
- 2026-05-28
  - https://github.com/whatwg/html/issues/12476
  - Stage2 (postpone)
    - Menu elements
      - https://github.com/whatwg/html/issues/11729
      - Stage2 への議論
      - Menu API を Popover みたいに id で参照する方式からネスト方式に変更した方が良いのでは
      - Command Invokers で紐付ける必要がなくなるので `toggle-menu` command がなくなりそう
  - Stage3(postpone)
    - HTML in Canvas
    - Opaque Range Interface
- 2026-06-04
  - https://github.com/whatwg/html/issues/12510
  - Stage2 (postpone)
    - Menu elements
  - Stage3(postpone)
    - Reference Target
- 2026-06-11
  - https://github.com/whatwg/html/issues/12520
  - Responsive iframe meta tag
- Extraordinary WHATNOT meeting on 2026-06-17
  - https://github.com/whatwg/html/issues/12441
  - Web Engines Hackfest 期間臨時開催の WHATNOT
  - Stage 1
    - Localized time formatting without JavaScript
      - https://github.com/whatwg/html/issues/12591
      - Luca Casonato の提案
      - まず ZonedDateTime を扱えるよう、datetime 属性を拡張する必要がある
        - Extend `datetime` attribute on `<time>` to support Temporal ZonedDateTime timezone syntax
          - https://github.com/whatwg/html/issues/12334
    - DOM Localization
      - https://github.com/whatwg/html/issues/12584
      - Incubation: https://github.com/whatwg/proposal-dom-localization
      - 多言語対応 without JS
      - 翻訳データを head に埋め込んで、属性に key を指定して文言の value を受け取る
      - 翻訳データに HTML tag 含めることも検討されてそう
- 2026-06-25
  - https://github.com/whatwg/html/issues/12616
- **Filtering support for customizable select · Issue #12050 · whatwg/html**
  - https://github.com/whatwg/html/issues/12050
  - 歴史的互換性の背景から select の中に input を入れると既存のページが多く壊れることがわかった
  - input を select と IDREF で紐づける設計に変更
  - https://codepen.io/sakupi01/pen/raLOoEJ?editors=1100

  #### CSSWG

- https://www.w3.org/blog/CSS/
- https://lists.w3.org/Archives/Public/www-style/
- [https://www.w3.org/YYYY/MM/DD-css-minutes.html](https://www.w3.org/2026/06/17-css-minutes.html)
- Agenda for Animations breakout on June 3 from Alan Stearns on 2026-06-02
  - https://lists.w3.org/Archives/Public/www-style/2026Jun/0001.html
- 2026-06-02
  - https://lists.w3.org/Archives/Public/www-style/2026Jun/0002.html
- 2026-06-10
  - https://lists.w3.org/Archives/Public/www-style/2026Jun/0003.html
- 2026-06-16
  - https://lists.w3.org/Archives/Public/www-style/2026Jun/0004.html
- 2026-06-24
  - https://lists.w3.org/Archives/Public/www-style/2026Jun/0005.html
- **Should `::interest-button` be opt-in, opt-out, or enabled via media query?**
  - https://github.com/w3c/csswg-drafts/issues/13980#issuecomment-4682270794
  - > RESOLVED: use an inline media condition (display: if(media())) to enable the pseudo element on systems where it makes sense, such as touchscreen.
  - タッチスクリーンなどのディスプレイでは、デフォルトで `::interest-button` をつけようという resolution を起点に議論が再燃
  - つけよう側:デフォルトでアクセシビリティは担保しておくべき
  - つけない側:多くのページでレイアウト崩れが発生する可能性
    - リセット CSS に `display: if(media(hover:hover): none; else: inline-block)` という記述が足されるだけ
- **[css-mixins-1] Split CSS Mixins Level 1 into levels**
  - https://github.com/w3c/csswg-drafts/issues/13722
  - Custom Functions の仕様とその他の安定度合いが離れてきたので、CF を進められるように仕様を分割
    - Lv1: CF
    - Lv2: Mixins / Macros
- **[css-fonts-5] `<meta text-scale>` limits**
  - https://github.com/w3c/csswg-drafts/issues/13557
  - > RESOLVED: Revert previous resolution and don't have a limit on meta text-scale for now
  - 極端に文字サイズが大きくなる場合にレイアウト破綻が懸念される。その場合に、著者側が scale の上限を設定できるようにしてはどうか
  - 初回 resolution では scale keyword を廃止して、上限を指定するように変更する予定だった
  - 一方、上限以上に拡大したいというユーザの欲求を著者側が制限指定しまうことになるという理由で反対されていた
- [mediaqueries-5] Introduce prefers-reduced-ai media feature and PreferenceManager integration
  - https://github.com/w3c/csswg-drafts/issues/14045
- [css-link-params-1] Time for FPWD
  - https://github.com/w3c/csswg-drafts/issues/14028

  #### Other

- **CSS Day**
  - https://cssday.nl/schedule.html
  - Slides up
- Thank you, Jina and Val
  - https://www.w3.org/community/design-tokens/2026/06/17/thank-you-jina-and-val/
  - > Jina Anne and Val Head are stepping back as co-chairs of the Design Tokens Community Group and becoming chairs emerita.
  - DTCG を立ち上げた Jina Anne らが Co-chair を退き、名誉 Chair へ
- W3C initiates leadership transition
  - https://www.w3.org/news/2026/w3c-initiates-leadership-transition/
- W3C leadership transition
  - https://www.w3.org/press-releases/2026/w3c-leadership-transition/
  - Seth Dobbs に変わり、Dominique Hazael-Massieux W3C 暫定 CEO
- Upcoming: W3C/GS1 Workshop on E-commerce for Humans and AI Agents
  - https://www.w3.org/news/2026/upcoming-w3c-gs1-workshop-on-e-commerce-for-humans-and-ai-agents/
  - AI エージェントにとっても使いやすいウェブにするにはどうすべきか考えるワークショップ
  - 招待制で参加可能
- Diversity report 2026
  - https://www.w3.org/news/2026/diversity-report-2026/
  - https://www.w3.org/about/diversity/diversity-report-2026/
- Human rights and ICT standardization: What is W3C doing about this?
  - https://www.w3.org/blog/2026/human-rights-and-ict-standardization-what-is-w3c-doing-about-this/
- International Women in Engineering Day spotlight: Carine Bournez, W3C
  - https://www.w3.org/blog/2026/international-women-in-engineering-day-spotlight-carine-bournez-w3c/
- W3C opens Inclusion Fund and Invited Expert Fund for TPAC 2026
  - https://www.w3.org/news/2026/w3c-opens-inclusion-fund-and-invited-expert-fund-for-tpac-2026/
- W3C Japan 30 年の軌跡、そして次世代へ: 村井先生×青野社長が問う、日本が人類に果たすべき役割とは? - Cybozu Inside Out | サイボウズエンジニアのブログ
  - https://blog.cybozu.io/entry/w3c-cybozu-discussion-jp-meeting
- Episode 100: Web Standards at the Web Engines Hackfest
  - https://www.igalia.com/chats/episode-100
  - Dominique Hazael-Massieux W3C 暫定 CEO との Igalia 陣の対談

  ### TC39/TC55 動向

  #### Meeting

- 2026-05
  - https://github.com/tc39/agendas/blob/main/2026/05.md
  - https://github.com/tc39/notes/pull/411
  - Temporal は全てのモダンブラウザ JS エンジンに実装済み(WebKit は --useTemporal フラグが必要)だが、fuzzing でいくつか仕様や実装の穴が見つかっており、Normative Changes が必要な状態になっている
    - 今月は 2 件 Normative Changes が入った
  - ビルトイン Iterator API の提案がいくつか進行している
    - https://gist.github.com/michaelficarra/34c47e1161b9ba2526ee197e1f5cb624
  - 2022-03 に Stage 3 になっていた Decorators が Stage 2.7 に降格
    - どのブラウザも ship 出来ていない
    - Test262 が不十分
    - アクティブな champion がいない
  - EU Cyber Resilience Act により 2027-12 から EU にデバイス、ソフトウェアを輸出する企業は適切なセキュリティ管理、脆弱性報告が求められるようになる。今後 ECMA-262 内に脆弱性が見つかった際に報告する場所が必要かもしれない

  #### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2026-05-01}...main@{2026-06-01}
- https://tc39.github.io/beta/
- withdrawn
  - isTemplateObject
- 0->1
  - Comparisons
  - "export all from"
  - Intl Sequence Units
  - Default Behaviours for some Intl APIs (und locale)
- 1->2
  - Amount
  - **Intl Stable Formatting (zxx locale)**
- 3->2.7(降格)
  - Decorators
  - Decorator Metadata
- 2.7->3
  - RegExp Buffer Boundaries
  - Error Stack Accessor
  - Iterator Join
  - Iterator Includes
  - Iterator chunking
  - Intl Keep Trailing Zeros
- 3->4
  - Explicit Resource Management
  - Joint Iteration
  - Atomics.pause

  #### New Proposals

  #### WinterTC

- https://github.com/WinterTC55/admin/tree/main/meetings
- 特になし

  #### Other

- Web 標準の議論を LLM-Wiki で追う | blog.jxck.io
  - https://blog.jxck.io/entries/2026-06-29/tc39-llm-wiki.html
  - Jxck/tc39-llm-wiki
    - https://github.com/Jxck/tc39-llm-wiki

  ### IETF 動向

  #### IETF

  #### WG

- RFC
  - RFC 10008: The HTTP QUERY Method | RFC Editor
    - https://www.rfc-editor.org/info/rfc10008/
- Work
- Meeting

  #### Other

- So You Want To Define a Well-Known URI
  - https://mnot.net/blog/2026/well_known_uris
  - Well-known locations は、クライアントがサイトを知っている場合に有効で、全体に関する情報を効率的に発見する手段である。
  - 不適切な使用は、新たな問題を引き起こす可能性があり、プロトコルが本当に必要とする場合にのみ利用すべきである。
  - コンテンツメタデータを扱う際は、利便性と細分化のトレードオフを考慮し、適切なメカニズムを検討する必要がある。

  ### 周辺動向

  #### ベンダー動向

- Five years of JavaScript on WebAssembly
  - https://blogs.igalia.com/compilers/2026/05/25/five-years-of-javascript-on-webassembly/
  - JavaScript on WebAssembly は 2021 年に実験から生産ツールチェーンに進化した。
  - Javy は 2022 年に生産準備完了版がリリースされ、実際の使用例に対応した。
  - 2026 年には、パフォーマンス向上のための最適化が進行中で、実験的機能としてのコンパイラの導入が計画されている。
- WASI 0.3 が正式版に。WebAssembly Component の非同期処理が共通基盤に － Publickey
  - https://www.publickey1.jp/blog/26/wasi_03webassembly_component.html
- **Build your own vulnerability harness**
  - https://blog.cloudflare.com/build-your-own-vulnerability-harness/
  - Glasswing の初期結果を発表し、企業コードベースに対するフロンティアセキュリティモデルの適用を検討した。
  - フロンティア AI による脅威からインフラと顧客を保護するための防御構造の適応を探求した。
  - 単一モデルに依存することのリスクを強調し、モデルを頻繁に入れ替え、クロステストを行うことの重要性を述べた。
  - 脆弱性を特定するための真の企業規模のハーネスは、孤立したリポジトリを超えて依存関係を追跡する必要がある。
  - モデルに依存しないアーキテクチャを構築することが推奨され、モデルの選択に制約がない自由を得ることができる。
  - セキュリティ分析には、持続性、重複排除、再開可能性、フリート全体の依存関係追跡が必要である。
  - 脆弱性発見ハーネス(VDH)と脆弱性検証システム(VVS)の二段階の運用フレームワークを採用。
  - VDH はコードベースを積極的にスキャンし、潜在的なセキュリティ問題を浮き彫りにする役割を果たす。
  - VVS は発見された脆弱性を整理し、重複を排除し、修正を生成するプロセスを管理する。
  - 脆弱性の発見と検証には異なるモデルを使用し、相互にチェックすることでセキュリティの信頼性を向上させる。
  - ハーネスは、単一のモデルに依存せず、下流の変動を吸収できる設計が求められる。
  - 具体的な実装例やプロセスの詳細が提供され、開発者が自分の脆弱性ハーネスを構築するための出発点を示している。
- **Changing How We Develop Ladybird - Ladybird**
  - https://ladybird.org/posts/changing-how-we-develop-ladybird/
  - > We will no longer accept public pull requests. From now on, code changes to the Ladybird codebase will only be introduced by project maintainers.
  - AI Slop により Ladybird が外部コントリビュータからの PR 受付を取りやめ
- **2026 Web Engines Hackfest**
  - https://webengineshackfest.org/
  - **That's a Wrap on the 2026 Web Engines Hackfest | Igalia**
    - https://www.igalia.com/2026/webengineshackfest.html
  - agenda: Home · Igalia/webengineshackfest Wiki
    - https://github.com/Igalia/webengineshackfest/wiki
  - Web Engines Hackfest 2026 - YouTube
    - https://www.youtube.com/live/EFp-A7T4c0U
- Igalia WebKit Team | WebKit Igalia Periodical #67
  - https://blogs.igalia.com/webkit/blog/2026/wip-67/
- Igalia WebKit Team | WebKit Igalia Periodical #68
  - https://blogs.igalia.com/webkit/blog/2026/wip-68/
- Fine. What Is the Web?
  - https://bkardell.com/blog/FWIW.html
- This Month in Ladybird - May 2026 - Ladybird
  - https://ladybird.org/newsletter/2026-05-31/
- New Brave Origin premium experience offers users a minimalist version of the Brave browser
  - https://brave.com/blog/brave-origin/
  - 買い切り制プレミアム版
  - 機能を削ってプレミアムとして出す

  #### セキュリティ動向

- A Post-Quantum Future for Let's Encrypt - Let's Encrypt
  - https://letsencrypt.org/2026/06/03/pq-certs.html
  - Let's Encrypt はポスト量子安全な Web PKI に取り組んでいる。
  - Merkle Tree Certificates(MTCs)を採用し、ポスト量子認証を実現する計画である。
  - 2026 年末に MTC の試験運用を開始し、2027 年に本運用を目指す。
- **トランプ大統領、耐量子暗号(PQC)移行を義務付ける大統領令に署名 2030 年末期限 - ITmedia NEWS**
  - https://www.itmedia.co.jp/news/articles/2606/23/news103.html
  - https://www.whitehouse.gov/presidential-actions/2026/06/securing-the-nation-against-advanced-cryptographic-attacks/
  - Harvest Now, Decrypt Later 対策で PQC 移行を進める
  - 具体的な期日が明示され、大統領が署名した
  - 鍵共有が 2030 年末、署名を 2031 年末までに移行
- The White House's post-quantum executive order is an important milestone. It's time to get to work
  - https://blog.cloudflare.com/post-quantum-eo-2026/
  - 2026 年 6 月 22 日、トランプ大統領が「高度な暗号攻撃から国を守る」ための行政命令を署名した。
  - 2030 年 12 月 31 日までに連邦機関はポスト量子暗号に移行する必要がある。
  - ポスト量子認証は 2031 年 12 月 31 日までに完了しなければならない。
  - 連邦契約者は 2030 年末までにポスト量子の FIPS に準拠することが求められる。
- TLS Configurator
  - https://configurator.tlsref.org/
  - TLS の設定を生成するサービス
  - 以前は Mozilla が SSL Configuration Generator を公開していた
  - 5 月にそれが終了した後継

  #### Other

- **State of CSS 2026**
  - https://survey.devographics.com/en-US/survey/state-of-css/2026
  - 今月末まで!
- 2026 Shader Ecosystem Survey
  - https://www.surveymonkey.com/r/LKWFQ3M
  - Khronos Group が SIGGRAPH 2026 内の SIGGRAPH Real-Time Shading BOF のためにシェーダー言語についてのサーベイをしている
    - https://www.khronos.org/events/siggraph-2026#real-time-shading-bof-building-a-community-around-shaders-sh
    - BOF: Birds Of a Feather (交流会)
    - Khronos Group としてはあらゆるシェーダー言語を出力できる Slang を進めている
      - https://shader-slang.org/
  - 7 月 10 日まで!

  ### イベント

- 7 月
  - 11: Google I/O Extended Tokyo
    - https://gdgs.jp/ioe-tokyo-2026
  - 18: Google I/O Extended Osaka
    - https://gdgkwansai.connpass.com/event/391029/
  - 18-24: IETF 126 Vienna
    - https://www.ietf.org/meeting/126/
  - 20-23: TC39 Remote
    - https://github.com/tc39/agendas
  - 27: 雑 LT 会
    - https://web-study.connpass.com/event/396644/
- 8 月
- 9 月
  - 12: フロントエンドカンファレンス福岡
    - [https://frontend-conf.fukuoka.jp/2026/](https://frontend-conf.fukuoka.jp/2026/?hl=ja)
  - 29-01: TC39 Tokyo
    - https://github.com/tc39/agendas

  ### Wrap Up

- Chrome
  - 150 beta
  - Ship
    - Relative Alpha Colors( alpha() function)
    - CSS light-dark() with image values
    - The focusgroup attribute
    - flex-wrap:balance
    - named-feature() function for CSS @supports
    - IndexedDB が SQLite backend に
    - Out-of-order streaming
    - XML Parsing in Rust for non XSLT scenarios
    - wheel イベントで指を離した後の慣性 fling を区別する
    - Declarative shadow DOM: shadowrootslotassignment attribute
    - Multi-Range Selection
  - Prototype
    - Multi-Range Selection
  - Experiment
  - Deprecate and Remove
  - PSA
    - 名前が空の Cookie をリジェクトするかどうか?
  - other intents
  - web.dev
  - Google Developer Blog
  - Chrome Developers
    - Chrome DevTools for agents 関連の JS API で、フレームワーク側がこれを使ってツールを実装することで DevTools for agents を介して利用できる
  - Chromium blog
  - other blogs
  - other
    - Google AI Threat Defense
    - Addy Osmani が Google 退職
- Firefox
  - 152
  - Ship
    - sibling-index() and sibling-count()
    - Source Phase Imports
  - Prototype
    - CSS progress() function
    - alpha() relative color function
    - text-box-trim / text-box-edge
  - other intents
  - MDN Blog
    - MDN MCP server
    - Web Security docs on MDN
  - Standard Position
    - Text-Scale meta element
    - named-feature() function for CSS @supports
    - Out of order streaming
  - other
    - 閲覧履歴を可視化できる Session History Diagrams
    - PACT(Private Access Control Tokens)
- Safari
  - WWDC26
    - Customizable Select
    - :heading pseudo-class
    - revert-rule keyword
    - sizes="auto" on img
    - Grid Lanes
    - Customizable Select
  - TP245
  - TP246
    - Added support for image values in light-dark(image, image).
    - Enabled word-break: auto-phrase in preview.
    - Added support for the alpha() relative color function.
    - Added support for popover close watcher integration.
    - Added support for the Origin-Agent-Cluster HTTP response header.
  - Standard Position
    - Oppose: WebMCP
  - other
    - Grid Lanes guide
    - CSE golden rule
    - Bun が JSC に Thread を実装
- Edge
  - Stage Release 2 週間に短縮
  - Webwright
- W3C/WHATWG
  - Draft
    - Quantum-Resistant Cryptosuites
    - CSS Linked Parameters Module
  - Open UI
    - Overscroll Areas
  - WHATNOT meeting
    - Menu elements
    - HTML in Canvas
    - Opaque Range Interface
    - Reference Target
    - Localized time formatting without JS
    - DOM Localization
    - Filtering support for CSE
  - CSSWG
    - ::interest-button をデフォルトで UA Style に入れるかどうか
    - Split CSS Mixins Level 1
    - meta text-scale の制限はなし
  - Other
    - CSS Day
- TC39
  - Temporal モダンブラウザ実装完了
  - Iterator API Family 進んでる
  - Decorators 2.7 降格
  - WinterTC
- IETF
  - RFC 10008 HTTP Query 初の 5 桁
- 周辺動向
  - ベンダー動向
    - Cloudflare Vulnerability Harness 作り方まとめ
    - Web Engine Hackfest
  - セキュリティ動向
    - NIST で PQC 移行期限に大統領令
  - Other
    - State of CSS 2026
