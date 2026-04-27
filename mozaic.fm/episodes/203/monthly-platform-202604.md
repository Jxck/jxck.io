---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep203.mp3
published_at: 2026-04-28
guests:
  - name: "@saku"
    url: https://x.com/sakupi01
  - name: "@petamoriken"
    url: https://x.com/petamoriken
---

# ep203 Monthly Platform 202604

## Theme

第 203 回のテーマは 2026 年 4 月の Monthly Platform です。


## Show Note

### Chrome 動向

#### Stable: 148


#### Updates

- New in Chrome 147
  - https://developer.chrome.com/blog/new-in-chrome-147
  - Element-scoped view transitions
  - CSS `contrast-color()`
  - The CSS border-shape property
- What's new in DevTools (Chrome 147)
  - https://developer.chrome.com/blog/new-in-devtools-147
  - Automatic context selection in AI assistance
  - DevTools for Agents
  - Code generation
  - Refreshed Device Mode toolbar
  - Decoded compressed bodies
  - Regular expression filters for styles
  - Speculative loads enhancements
  - Miscellaneous
  - Accessibility
    - Contribute
    - Related content
    - Follow
- Chrome 148 beta
  - https://developer.chrome.com/blog/chrome-148-beta
  - CSS and UI
    - **Name-only container queries in CSS**
    - Clip text overflow on user interaction
    - Correctly set dropEffect for dragEnter, dragLeave, and dragOver events
    - **Lazy load video and audio elements**
    - CSS `at-rule()` function for feature detection
    - Add the revert-rule keyword
    - Support `text-decoration-skip-ink: all`
  - Web APIs
    - Localize manifest members
    - Support Open Font Format avar2 for text shaping and glyph rendering
    - Web Authentication Immediate UI mode
    - Web Serial API support on Android
    - WebGPU linear_indexing feature
    - SharedWorker support on Android
    - Extended lifetime for shared workers
    - **Prompt API**
    - Get Secure Payment Confirmation capabilities
    - IDNA ContextJ rules
    - Reuse no-store images on same-src reassignment
    - Add the contentType field to Resource Timing
    - Suppress pointer events on drag start
    - WebRTC Datachannel: Always negotiate data channels
  - New origin trials
    - Agentic Federated Login
    - Connection Allowlists
    - Container Timing
    - Declarative CSS module scripts
    - **HTML-in-canvas**
    - Long Animation Frames style duration
    - OpaqueRange
    - Parse processing instructions in HTML
    - Permissions Policy: `focus-without-user-activation`
    - Prompt API sampling parameters
    - **Web app HTML install element**
    - Contribute
    - Related content
    - Follow
- What's New in WebGPU (Chrome 147-148)
  - https://developer.chrome.com/blog/new-in-webgpu-147-148


#### Intents

- Ship : Content-type in Resource Timing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JzYRpqkpQV8
- **Ship: CSS Name-only Container Queries**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2czawrZacS8
  - Safari も今月対応
  - 一部界隈ではスコープに使えるんじゃないかと話題になっていた
  - https://frontendmasters.com/blog/name-only-containers-the-scoping-we-needed/
- Ship: Extended lifetime shared workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gibsFdrin2s
- Ship: Lazy loading for video and audio elements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HoqdJM4Xqjc
- **Ship: Programmatic scroll promises**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tREfIy3hXh0
  - smooth-scroll が終わった時の promise
- Ship: Resource Timing: Add spec-compliant Service Worker Router timing fields
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Nd2x0tbTrLc
- Ship: Support `rect()` and `xywh()` in `shape-outside`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XIpEEwjMon8
- Ship: Prompt API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iR6R7-nQeHI
- Ship: AccentColor and AccentColorText system colors
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/knAC85FErrE
- **Ship: Capability Elements `<usermedia>` MVP**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/V_ef1L9BtHw
- Ship: Support `path()` and `shape()` in `shape-outside`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JcYSSIebjtg
- **Ship: Focusgroup**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/53PP0LgddCQ/m/Be_6nT9VBgAJ
- **Ship: CSS URL request modifiers**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EKkOr6M6A8g
  - fetch のオプションを CSS から指定できる
  - `background-image: url("image.png" cross-origin(anonymous))`
  - CORS: 「表示」は今でもできるが、JS から扱えるようになる
- **Ship: Popover=hint behavior changes**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QkVJ1GYjLKk
  - ネストされた場合の `popover=hint` の仕様に誤謬があり、期待しない挙動が起こっていたことを Jake が指摘して Land
  - hint popover が auto popover の中にネストされると、hint が auto に変換されてしまい、不自然な動作になる仕様だった
  - hintStackParent: auto popover | null で hint が「どの auto popover から分岐したか」を追跡するモデルを新しく定義
  - そもそも hint の中に auto を出すのは禁止
    - hint 内で `showPopover(auto)` は例外、HTML 属性の方は no-op + console warning
    - ただし `<select>` が auto として振る舞うので、hint とネスト時の競合解決は別で議論
  - > there is minimal usage 0.025%
- Prototype and Ship:
- Implement and Ship: Nested dedicated workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KZx0i3e5nZM
- **Prototype: Account for System UI elements in screen.avail properties on Android**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8kgY1xbM_Bk
- Prototype: CSS URL request modifiers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sw9EeY2vA_w
- **Prototype: Element's `matchContainer()`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/70qTl8BnzR4
  - container query に js からアクセスする
- Prototype: FedCM-Allow IDP interception of FedCM Request via Service Worker
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0UPWuAE0QoI
- Prototype: Shared AudioWorklet port
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2aAm_se1VXI
- Prototype: Support `rect()` and `xywh()` in `shape-outside`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9W_yAKiAURo
- **Prototype: `overscroll-behavior: chain`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hC2LUZ3XEBE
  - `overscroll-behavior` はスクロールの「伝搬」と境界での「ブラウザアニメーション」を制御できるが、アニメーションのみオフにするキーワードがなかった
  - サイドメニューで「伝搬」利用しつつ「アニメーション」はオフにしたいユースケースがあった
  - none:伝播なし、ローカル効果なし
  - auto:伝播あり、ローカル効果あり
  - contain:伝播なし、ローカル効果あり
  - chain:伝播あり、ローカル効果なし
- **Prototype: CSS `text-decoration-inset`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fU0_ERirUC8
  - `text-decoration-inset` で%指定をサポート
  - 「ホバーで下線長を 0% → 100% へアニメーションする」といった表現が疑似要素を使わずに実現可能に
  - Firefox 146 では `text-decoration-inset` 自体のサポート
  - `<a>` や `<del>`などが連続した際に、横線の間隔がいい感じに分離できるようになる
- **Prototype: CSS4 `text-decoration-skip-spaces`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/h0xBtGrsu2s
  - 下線や打ち消し線などを空白文字上で描画するか否かを制御するプロパティ
- Prototype: FedCM-Allow IDP interception of FedCM Request via Service Worker
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0UPWuAE0QoI
- **Prototype: Implement `visibility:collapse` for flex items**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/u9d657tnT5c
- **Prototype: Private Verification Tokens**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QDVlI36kE-A
- Prototype: Support `path()` and `shape()` in `shape-outside`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yBAVufkvFC0
- **Prototype: Main thread `Atomics.wait`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xQ5udr_sL7Q
  - 現状ブラウザのメインスレッドの JS/Wasm で `Atomics.wait` を実行すると例外を投げる
  - 本来はメインスレッドをブロックしない方向に開発者を促すための制約だが、性能の悪いスピンロックが広く使われる原因になってしまっている
  - メインスレッドでも `Atomics.wait` を有効にするプロトタイプ
- Prototype: WebAuthn remoteClientDataJSON Extension
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3NthwsxXjDc
- **Experiment: Declarative CSS module scripts**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/I2GOQp3voVg
- **Experiment: HTML-in-canvas**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/t_nGEmJ_v4s
- **Experiment: Parse processing instructions in HTML**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NsT_aLXixXc
- Experiment: Permissions Policy: focus-without-user-activation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GLmp1IrJ4Ig
- Experiment: Prerendering cross-origin iframes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CyGHPL8Z6IY
- Experiment: Prompt API Sampling Parameters
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4KvH5XEBYtE
- **Ready for Developer Testing: Overscroll Gestures**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YYe6ZhaMDrc
  - Overscroll 領域を用いる UI パターンを標準化
  - Hamburger Menu, Pul to refresh など
- Extend Experiment: SoftNavigation performance entry
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/52lo8aY7xzg
- Extend Experiment: Web Install API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jsXI0W8R3Dc
- Extend Experiment: WebAudio: Configurable render quantum
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MlLqosTB0cQ
- Change:
- Unship:
- Remove:
- Deprecate and Remove: Deprecate WebTransport incomingHighWaterMark/outgoingHighWaterMark
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dc9HgoHa74k
- Deprecate and Remove: Top-frame navigations to data URLs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GbVcuwg_QjM
- PSA: Stripping TAB & SPACE from name & value passed to CookieStore methods
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VoLC0ge-FiI
- **Web-Facing Change PSA: Remove explicit border color UA stylesheet rule for tables**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LwOCQA1pOVo
  - これまで Chrome UA スタイルシートに `<table>` に対して `border-color: gray` という独自ルールが入っていた
  - 仕様にはそんなルールは書かれていない
  - Firefox も Safari もこのルールを持っていない
  - そのせいで Chrome だけ table のボーダーが currentColor にならず、ブラウザ間の相互運用性の問題になっていた
- Web-Facing Change PSA: User action pseudo class top layer boundary
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/N1a1ra0BVOo
- **Web-Facing Change PSA: IndexedDB: SQLite backend**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jS0khnC5IWA
- Web-Facing Change PSA: Disconnect WebSockets on BFCache entry
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/52nlr8z3Png


#### Other

- web.dev
  - https://web.dev/
  - New to the web platform in March
    - https://web.dev/blog/web-platform-03-2026
  - February 2026 Baseline monthly digest
    - https://web.dev/blog/baseline-digest-feb-2026
    - Interop 2026 has launched
    - Baseline Newly available features
      - CSS `shape()` function
      - Trusted types
      - Map `getOrInsert()` and `getOrInsertComputed()`
      - Zstandard compression
    - Baseline Widely available features
      - The dirname HTML attribute
  - March 2026 Baseline monthly digest
    - https://web.dev/blog/baseline-digest-mar-2026
    - Baseline Newly available features
      - Math font family
      - `Iterator.concat()`
      - Readable byte streams
      - Reporting API
      - WebTransport
      - `text-indent: each-line` declaration
      - `text-indent: hanging` declaration
    - Baseline Widely available features
      - `contain-intrinsic-size` CSS property
      - `@counter-style` at-rule
      - Device orientation events
      - hyphenate-character CSS property
      - hyphens CSS property
      - `image-set()` CSS function
      - `<link rel="modulepreload">`
      - Overflow media queries
      - navigator.storage
      - update media query
      - **CSS subgrid**
    - Rachel Andrew goes to Web Day Out
    - Adding Baseline status to an Eleventy site
  - New to the web platform in April
    - https://web.dev/blog/web-platform-04-2026
    - The `contrast-color()` CSS function becomes Baseline
    - Scroll-driven animation range properties are now Baseline
    - The `ariaNotify()` method
    - Auto sizes for `lazy-loaded` images
    - Element-scoped view transitions
    - CSS border-shape property
    - SVG `<textPath>` path attribute
    - Modulepreload support for JSON and style
    - Math.sumPrecise
- google for developers
  - https://developers.googleblog.com/
  - Get ready for Google I/O: Livestream schedule revealed
    - https://developers.googleblog.com/get-ready-for-google-io-livestream-schedule-revealed/
    - I/O スケジュールリリース
      - Google I/O 2026
        - https://io.google/2026/
  - Supporting Google Account username change in your app
    - https://developers.googleblog.com/supporting-google-account-username-change-in-your-app/
    - Gmail アドレスを変更しても、データはそのまま維持できるように(US オンリー)
  - A2UI v0.9: The New Standard for Portable, Framework-Agnostic Generative UI
    - https://developers.googleblog.com/a2ui-v0-9-generative-ui/
    - 本当にデザインシステム使って UI 生成できるようになる?
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - https://developer.chrome.com/blog/
  - Chrome 147 enables concurrent and nested view transitions with element-scoped view transitions
    - https://developer.chrome.com/blog/element-scoped-view-transitions
  - Chrome Web Store: A smarter, faster appeals process
    - https://developer.chrome.com/blog/cws-new-appeals-process
  - Take our course about AI evaluations
    - https://developer.chrome.com/blog/announce-ai-evals-course
  - **Improved Japanese phonetic name support in Chrome autofill**
    - https://developer.chrome.com/blog/japanese-phonetic-name-autofill
    - autocomplete で日本語名のサポートが強化された
    - `name` 属性と `<label>` テキストで判定
    - `<label>セイメイ</label>` など
    - ラベルがカタカナかひらがなかを見て、fill する文字を決める
  - **Connection Allowlists origin trial: Secure your web application's network**
    - https://developer.chrome.com/blog/connection-allowlists-origin-trial
    - ネットワーク接続を制御する新しいメカニズム
    - `Connection-Allowlist` に指定された URL パターンのみを許可する
    - 不正流出リスクを低減する目的
  - **Final Soft Navigations origin trial starting in Chrome 147**
    - https://developer.chrome.com/blog/final-soft-navigations-origin-trial
    - Soft Navigations API OT を 147~9
    - SPA でのソフトナビゲーションを検出できる
    - Navigation API 移行など手を加えずに使える
    - 条件
      - User Action で始まる
      - 結果 URL が変わる
      - Visible Paint に反映される
    - この定義の偽陽/陰性の検証を続けてきた
  - Unlock Structured Clone for Chrome Extension Messaging
    - https://developer.chrome.com/blog/structured-clone-messaging
  - What's New in WebGPU (Chrome 147-148)
    - https://developer.chrome.com/blog/new-in-webgpu-147-148
  - Localization support for web app manifests
    - https://developer.chrome.com/blog/manifest-localization
- chromium blog
  - https://blog.chromium.org/
  - Chromium Blog: JetStream 3: A modern benchmark for high-performance, compute-intensive Web applications
    - https://blog.chromium.org/2026/03/jetstream-3-a-modern-benchmark.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
  - VRP 2025 Year in Review
    - https://security.googleblog.com/2026/03/vrp-2025-year-in-review.html
  - Google Workspace's continuous approach to mitigating indirect prompt injections
    - https://security.googleblog.com/2026/04/google-workspaces-continuous-approach.html
  - **Protecting Cookies with Device Bound Session Credentials**
    - https://security.googleblog.com/2026/04/protecting-cookies-with-device-bound.html
  - **Bringing Rust to the Pixel Baseband**
    - https://security.googleblog.com/2026/04/bringing-rust-to-pixel-baseband.html
  - **AI threats in the wild: The current state of prompt injections on the web**
    - https://security.googleblog.com/2026/04/ai-threats-in-wild-current-state-of.html
- search blog
  - https://developers.google.com/search/
  - **Introducing a new spam policy for "back button hijacking"**
    - https://developers.google.com/search/blog/2026/04/back-button-hijacking
    - back button hijacking(戻るボタンで広告出るなど)が Google 検索でスパム扱いになる
  - **Q1 2026 Summary from Chrome Security**
    - https://groups.google.com/a/chromium.org/g/security-dev/c/QKaLsEZBITQ
    - Counter-Abuse チーム、Windows Chrome 向け Device Bound Session Credentials を一般提供
    - AI Security、エージェント型ブラウジングの多層防御を実運用データで調整しつつ、新たな攻撃データセットも構築。
    - Chrome Root Program と Secure Web and Net、Merkle Tree Certificates によるポスト量子証明書導入を計画し、Cloudflare と初期実装を検証、Real World Cryptography conference で実用性報告。
    - Exploit Defense チーム、メモリ安全性強化として Rust 導入を進め、ChildProcessSecurityPolicy の移行と Canary 実験でチェック失敗をほぼ解消、Rust 製 Mojo クライアントも実装。
    - PartitionAlloc を Skia で有効化し、MiraclePtr や UBSan(`-fsanitize=return`)など防御を強化。
    - process isolation の初期実装を追加(`#enable-process-isolation-ui`で利用可)、Windows でのネットワークサービスサンドボックス検証や macOS のプロセス起動改善も推進。
    - Product Security チーム、AI 進化で増加する脆弱性に対応し、トリアージ拡張やツール改善、設計的防御強化、VRP ガイド更新と security-for-agents.md 公開を実施。
- v8
  - https://v8.dev/
- other
  - **[RFC] JSIR: A High-Level IR for JavaScript - MLIR - LLVM Discussion Forums**
    - https://discourse.llvm.org/t/rfc-jsir-a-high-level-ir-for-javascript/90456
    - https://github.com/google/jsir
    - JS の中間表現の標準化を提案
    - 実装として、Google がデコンパイルや難読化に使ってる JSIR を公開
    - ツールを AST ベースから、IR ベースへの移行を提案
  - Passkeys are Your New Best Friend - Google Bug Hunters
    - https://bughunters.google.com/blog/passkeys-are-your-new-best-friend
  - **Standardizing Rewards in Google VRP: Introducing Information Tiers and Action Criticality - Google Bug Hunters**
    - https://bughunters.google.com/blog/standardizing-rewards-in-google-vrp
    - 報酬モデルを進化させ、情報の階層と行動の重要性を導入する。
    - 新しい次元がセキュリティの変化に対応する。
    - これにより、報酬の標準化が図られる。
  - Get more done with new vertical tabs and immersive reading mode in Chrome
    - https://blog.google/products-and-platforms/products/chrome/new-chrome-productivity-features/
  - Turn your best AI prompts into one-click tools in Chrome
    - https://blog.google/products-and-platforms/products/chrome/skills-in-chrome/
    - Skills と呼ばれるプロンプト保存機能
  - Google upgrades AI Mode in the Chrome browser
    - https://blog.google/products-and-platforms/products/search/ai-mode-chrome/
  - **Gemini in Chrome expanding to Asia-Pacific markets**
    - https://blog.google/products-and-platforms/products/chrome/chrome-expands-apac/
    - Gemini in Chrome が日本で順次ロールアウト開始
  - **BlinkOn 21 - YouTube**
    - https://www.youtube.com/playlist?list=PL9ioqAuyl6UIc-S8EuPjqkNvsMMmL1flZ
    - Keynote
    - Closing the Loop Agentic Engineering in Chromium
    - Categorizing the Web LLMs and BigQuery ML
    - WPT Gen Automating Web Platform Tests with AI
    - AI and the Web AI as Tech, Opportunity, and Thar be Dragons
    - The past, present, and future of Web standards Chris Wilson AMA
    - WebMCP and the Agentic Web
    - Browser Agent Security
    - Lightning Talks #1
    - **HTML in Canvas Rendering the DOM into Canvas**
    - Explorations on a WebUI Browser
    - Network Efficiency Guardrails
    - Composition of CSS Animations
    - **Declarative Text Animations [BlinkOn21]**
    - Improving Blink Performance with Oilpan 1
    - Automagic Testing with MojoLPM


### Firefox 動向

#### Stable: 150


#### Updates

- https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases
- Firefox 150 release notes for developers (Stable)
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/150
  - https://www.firefox.com/en-US/firefox/150.0/releasenotes/
  - **`ariaNotify`**
  - media element pseudo-classes (e.g., `:playing`, `:paused`)
  - `highlightsFromPoint()`
  - `light-dark()` on images
  - `color-mix()` with an arbitrary number of colors
  - The `revert-rule` CSS keyword
  - `sizes="auto"` for lazy loaded responsive images
    - lazy load される画像はレイアウトが確定しているので、その場合に限って `sizes` 属性にわざわざメディアクエリらしきものを書く必要がなくなった
  - `@container style()` queries (Nightly)
  - Scoped custom element registries(Experimental)
  - Multiple import maps(Experimental)
- QR Codes, Speed Calculators, Better RAM Usage - These Weeks in Firefox: Issue 199
  - https://blog.nightly.mozilla.org/2026/04/15/qr-codes-speed-calculators-better-ram-usage-these-weeks-in-firefox-issue-199/


#### Intents

- **Ship: Document Picture-in-Picture API**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ZYhF7VNXwQU
- Ship: Add-On-Gated Web Serial
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/rwTxmEBoAvM
- **Implement and Ship: CSS container style queries**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/WpRW4SetBL8/m/HN1yyFWpAgAJ
  - Style Query も Baseline NA 入り
- **Prototype and Ship: `position-anchor: normal`**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/lzkWZN83ENE
- Prototype and Ship: CSSContainerRule.conditions
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/9NsbuM3nfoI
- Prototype and Ship: Fullscreen Keyboard Lock API
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/UKCVUBRrWQk
- Prototype and Ship: `shadowrootslotassignment` attribute
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/8qxAHE9-Xdo
- **Prototype: Importing text modules**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ODyKcu3PNdc
- Change:
- Remove:
- PSA: Node ownerGlobal changes
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/LKU2-9Bkfc4


#### Newsletter

- https://fxdx.dev/
- Engineering Effectiveness Newsletter (Q1 2026 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/dwCs2JtH0nw
- Firefox Security & Privacy Newsletter Q1 2026
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/QGDKJ7Cekv8


#### MDN / Open Web Docs

- https://developer.mozilla.org/en-US/blog/
- Under the hood of MDN's new frontend
  - https://developer.mozilla.org/en-US/blog/mdn-front-end-deep-dive/
  - React SPA から Lit ベースの SSR 済みサイトに置き換えた話
  - Lit ベース Web Components (DSD) や Baseline も積極的に活用している


#### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2026-04-01+
- Support
  - Fullscreen keyboard lock
    - https://github.com/mozilla/standards-positions/issues/1385
  - Focusgroup
    - https://github.com/mozilla/standards-positions/issues/1348
  - Expose unprintable areas via CSS
    - https://github.com/mozilla/standards-positions/issues/1258
  - Temporal - structured clone
    - https://github.com/mozilla/standards-positions/issues/1045
  - Web custom format for Async Clipboard API
    - https://github.com/mozilla/standards-positions/issues/525
- Neutral
  - controls attribute for img element
    - https://github.com/mozilla/standards-positions/issues/1368
- Negative
  - Keyboard Lock
    - https://github.com/mozilla/standards-positions/issues/196
  - **Observable**
    - https://github.com/mozilla/standards-positions/issues/945
    - RxJS でいうところの hot/cold 管理を ref-counted で行う設計に対して negative
    - その設計以外は、イベント周りで特に有用という扱い
- Defer
  - Notifications API: inline replies
    - https://github.com/mozilla/standards-positions/issues/91
  - Digital Goods API
    - https://github.com/mozilla/standards-positions/issues/349
  - New `onmove` event handler for the Window object
    - https://github.com/mozilla/standards-positions/issues/938


#### Other

- **The zero-days are numbered**
  - https://blog.mozilla.org/en/privacy-security/ai-security-zero-day-vulnerabilities/
  - Opus 4.6 で FF148 の 22 件のセキュリティバグを修正
  - Mythos Preview で FF150 では、初期評価中に特定された 271 件の脆弱性を修正
  - 従来のセキュリティ対策は攻撃者に有利だったが、防御側の優位性も高まってきた
  - 見つかったのは、人間には絶対に見つからなかった脆弱性ではなかった。
- **What's new in Firefox mobile: Less clutter, more control and a free built-in VPN**
  - https://blog.mozilla.org/en/firefox/mobile-updates/
  - Shake to Summarize で振ると要約
  - 内蔵 VPN の無料提供
  - Tab Group
- What would a 2026 CSS Anthology look like? - Rachel Andrew
  - https://rachelandrew.co.uk/archives/2026/04/23/what-would-a-2026-css-anthology-look-like/
- **Firefox browser has started shipping Brave's adblock-rust engine**
  - https://shivankaul.com/blog/firefox-bundles-adblock-rust?ref=itsfoss.com
  - Firefox 149 で実験的に Brave 製 Ad-blocker が入っていた?


### Safari 動向

#### Stable: 26.4


#### Updates

- https://webkit.org/blog/
- Safari Technology Preview NN
- Release Notes for Safari Technology Preview 240 | WebKit
  - https://webkit.org/blog/17896/release-notes-for-safari-technology-preview-240/
  - CSS
    - Added support for the revert-rule CSS keyword, which rolls back the cascade to behave as if the current style rule had not been present.
  - Editing
  - Forms
  - HTML
  - Media
  - PDF
  - Rendering
    - Added support for subpixel inline layout, enabling more precise text and inline element positioning.
  - SVG
    - Removed the non-standard nearestViewportElement and farthestViewportElement properties from SVGGraphicsElement, aligning with the SVG2 specification.
  - Scrolling
  - Web API
    - Added support for a wider range of characters in DOM element and attribute names, aligning with the updated WHATWG specification.
  - Web Extensions
  - Web Inspector
    - Added support for showing contrast information in the Color Picker when editing background color properties.
  - WebAssembly
- Introducing the JetStream 3 Benchmark Suite | WebKit
  - https://webkit.org/blog/17899/introducing-the-jetstream-3-benchmark-suite/
  - クロスブラウザベンチマークスイートの大規模アップデート
  - WebAssembly の性能測定方法が刷新され、全体のライフサイクルをスコアリングする方式に変更された。
  - JSC の WasmGC や BigInt、非同期関数の最適化が行われ、約 10%の性能向上が実現された。
- Release Notes for Safari Technology Preview 241 | WebKit
  - https://webkit.org/blog/17917/release-notes-for-safari-technology-preview-241/
  - Accessibility
  - Animations
  - CSS
    - Added support for the stretch keyword in box sizing properties.
    - **Added stable support for CSS scroll anchoring.**
  - Canvas
  - Forms
  - HTML
    - **Added support for the auto keyword in the sizes attribute on \<img> elements, enabling automatic size calculation based on the rendered layout width.**
  - Images
  - JavaScript
  - MathML
  - Media
  - Networking
  - Printing
  - Rendering
  - SVG
  - Storage
    - **Added support for setting maxAge in the Cookie Store API via cookieStore.set().**
  - Web API
    - Added support for fractional coordinates in PointerEvent and TouchEvent properties such as clientX/clientY, pageX/pageY, offsetX/offsetY, and screenX/screenY, while MouseEvent values remain whole.
  - Web Inspector
  - WebRTC
    - Added support for the RTCRtpCodec dictionary and related constructs.
- Name-only @container queries: A solution to the naming wars
  - https://webkit.org/blog/17923/name-only-container-queries-a-solution-to-the-naming-wars/
  - 消えた?
- Release Notes for Safari Technology Preview 242 | WebKit
  - https://webkit.org/blog/17934/release-notes-for-safari-technology-preview-242/
  - Accessibility
  - CSS
    - **Added support for the CSS attr() function from CSS Values Level 5.**
    - Added support for the oblique-only value for font-synthesis-style as defined in CSS Fonts Level 4.
  - Forms
  - HTML
    - **Added support for the `closedby` attribute on `<dialog>` elements.**
  - Images
    - Resolved Issues
  - JavaScript
    - Resolved Issues
  - Media
    - Resolved Issues
  - Networking
    - Added support for secure cookies on loopback hosts.
  - Rendering
    - Resolved Issues
  - SVG
    - Added support for the lang and xml:lang attribute in SVG.
    - Resolved Issues
  - Scrolling
    - Resolved Issues
  - Tables
    - Resolved Issues
  - Web API
    - **Added support for getAllRecords() and IDBGetAllOptions in the IndexedDB API.**
  - WebRTC
    - Added support for RTCRtpReceiver.jitterBufferTarget.
    - Added support for video source width and height in RTC stats.


#### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2026-04-01+
- Positive
  - ViewTransitions: waitUntil() method
    - https://github.com/WebKit/standards-positions/issues/564
  - Deprecate and remove externally loaded entities in XML parsing
    - https://github.com/WebKit/standards-positions/issues/572
  - Support shadowrootslotassignment= attribute
    - https://github.com/WebKit/standards-positions/issues/631
  - **Import Bytes**
    - https://github.com/WebKit/standards-positions/issues/626
    - 特に懸念なし(現在 Stage 2.7)
- Neutral
  - Modern Algorithms in WebCrypto
    - https://github.com/WebKit/standards-positions/issues/641
- Oppose
  - CPU Performance API
    - https://github.com/WebKit/standards-positions/issues/622


#### Other

- Community Letter from Tim - Apple
  - https://www.apple.com/community-letter-from-tim/
- Tim Cook to become Apple Executive Chairman John Ternus to become Apple CEO - Apple
  - https://www.apple.com/newsroom/2026/04/tim-cook-to-become-apple-executive-chairman-john-ternus-to-become-apple-ceo/
  - Tim Cook が Apple CEO 退任。John Ternus が 9/1 付で新 CEO に就任。


### Edge 動向

#### Stable: 147


#### Updates

- https://blogs.windows.com/msedgedev/
  - Engineering secure passkey sync in Microsoft Password Manager
    - https://blogs.windows.com/msedgedev/2026/04/22/engineering-secure-passkey-sync-in-microsoft-password-manager/
    - MS Password Manager での Passkeys 同期の裏側
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見れる
- https://twitter.com/MSEdgeDev
  - これを見るしか無い


#### Other

- Understanding Defender AV Scans - text/plain
  - https://textslashplain.com/2026/04/10/understanding-defender-av-scans/
  - Microsoft Defender Antivirus は、ユーザーの注意を必要とせず、バックグラウンドで静かに動作することを目的としている。
  - 無料で Windows に含まれているため、他の有料アンチウイルス製品のようにユーザーに煩わしさを与えない。
  - デフォルトのモードは「リアルタイム保護(RTP)」で、ファイルが開かれる際に自動的にスキャンを行う。
  - RTP が有効な場合、ファイルが悪意のあるものであっても即座にブロックされる。
  - Windows Security App の設定で RTP をオフにしても、再起動後や一定の間隔で自動的にオンに戻る。
  - Legacy Context メニューから「Microsoft Defender でスキャン...」を選ぶことができるが、通常は何も起こらないように見える。
  - アーカイブファイル(Zip、7z など)の場合、このスキャンコマンドが有効であり、アーカイブの内容を抽出せずにスキャン可能。
  - 手動スキャンの必要性については誤解が多く、RTP があるため手動スキャンは基本的に不要。
  - 他のスキャンオプションにはクイックスキャン、フルスキャン、カスタムスキャン、オフラインスキャンがある。
  - オフラインスキャンは、Windows が起動する前にスキャンを開始し、特定のマルウェアを検出することができる。
  - 不安なファイルがある場合は、VirusTotal にアップロードして複数のアンチウイルスエンジンでスキャンすることを推奨。
- Attack Techniques: RMM Abuse - text/plain
  - https://textslashplain.com/2026/04/24/attack-techniques-rmm-abuse/
  - 記事は、社会保障局のウェブサイトを模したフィッシング攻撃について述べている。
  - 偽のメールには、受取人に「利益を確認する」よう誘導するリンクが含まれている。
  - リンクをクリックすると、インドの大学のサイトを経由して、悪意のあるファイルをダウンロードするページにリダイレクトされる。
  - ダウンロードされるファイルは、偽の PDF ファイルを装った Windows Installer パッケージである。
  - このファイルは、正当な企業によって認証されており、VirusTotal で「クリーン」と評価されている。
  - 実際には、AteraAgent というリモート監視管理ツールがインストールされ、攻撃者がデバイスを制御できる状態になる。
  - AteraAgent の合法的な使用が多いが、悪用されるとマルウェアのような影響を及ぼす。
  - Atera はインストール時に通知画面を追加しているが、さらなる対策が必要である。
  - 一般ユーザーは、メールやファイルダウンロードに注意を払い、セキュリティ意識を高めるべきである。
  - 企業は、アプリケーション制御ソフトウェアを使用して RMM ツールをブロックすることで、攻撃を防ぐことができる。
- Add Webauthn remoteClientDataJSON extension explainer (#1306)
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/commit/3ab3c8775968d7c37169568dd6e1c639084dd356


### WHATWG/W3C 動向

#### TPAC


#### Draft

- https://www.w3.org/news/
- Recommendation
  - **Proposed Advancement of IMSC Text Profile 1.3 to W3C Recommendation**
    - https://www.w3.org/news/2026/proposed-advancement-of-imsc-text-profile-1-3-to-w3c-recommendation/
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - First Public Working Draft: Linked Web Storage Protocol 1.0
    - https://www.w3.org/news/2026/first-public-working-draft-linked-web-storage-protocol-1-0/
  - First Public Working Draft: Verifiable Credentials Data Model v2.1
    - https://www.w3.org/news/2026/first-public-working-draft-verifiable-credentials-data-model-v2-1/
  - **First Public Working Draft: CSS Image Animation Module Level 1**
    - https://www.w3.org/news/2026/first-public-working-draft-css-image-animation-module-level-1/
    - GIF / PNG / WebP のようなアニメーション画像の再生制御を行う
    - アクセシビリティ上の考慮:https://www.w3.org/TR/2026/WD-css-image-animation-1-20260409/#a11y
    - アニメーションを再生/停止するボタンについて、将来的にブラウザ UI を出す仕組みについても言及
    - HTML 側で検討されている img controls との兼ね合いは不明
  - Five First Public Working Drafts published by the Verifiable Credentials Working Group
    - https://www.w3.org/news/2026/five-first-public-working-drafts-published-by-the-verifiable-credentials-working-group/
  - First Public Working Drafts for the Linked Web Storage (LWS) 1.0 Authentication Suite
    - https://www.w3.org/news/2026/first-public-working-drafts-for-the-linked-web-storage-lws-1-0-authentication-suite/
- Group Note Draft


#### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- 2026-04-02
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2026-04-02.md
- 2026-04-09
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2026-04-09.md


#### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
- 2026-03-26
  - https://github.com/whatwg/html/issues/12317
  - Stage2 (Request): HTML in Canvas
    - DOM のスナップショットが Canvas に描画される仕組みで、それを JS で操作できるようになる。ので、ブラウザは知っているが JS からは取得できなかった情報が読めるようになる
    - ハイコントラストモード、フォント、Form、アクセントカラーなどのプライバシー観点を整理
    - API デザインのレビューが不十分との理由で carryover
  - Popover implicit anchor
    - Chrome 実装に合わせる方向
- 2026-04-02
  - https://github.com/whatwg/html/issues/12322
  - **Chris Wilson が 4/19 で Google を退くため、WHATNOT のチェアを Johnny Stenback が引き継ぐことに**
  - **Tick. | in progress**
    - https://cwilso.com/2026/04/17/tick-2/
  - Stage2 (Carryover): HTML in Canvas
    - ハイコントラストモードは露出する方針
    - 1Password などの拡張が Canvas 内に出すサジェストをホストの JS で読めたりするのでは?との懸念があったが、これらの UI は cross-origin iframe で same-origin policy で隔離されてるので問題なさそう
    - Mozilla が web compat と finger printing の観点で指摘
  - popover=hint の挙動整理
    - Jake と Mason の合意で大幅に整理
    - そもそも hint の中に auto を出すのは禁止
      - hint 内で showPopover(auto) は例外、HTML 属性の方は no-op + console warning
    - ただし select が auto として振る舞うので、hint とネスト時の競合解決は別 issue で議論
  - Platform-provided behaviors for custom elements
    - ElementInternals に submit など挙動を渡せるようにするところから始めていくので合意
- 2026-04-09
  - https://github.com/whatwg/html/issues/12341
  - Stage2 (Confirmed): HTML in Canvas
    - locale 露出(日付入力の並び順などから取れる)など残課題は Stage 3 で対応
    - ARIA WG からの反応も好意的で、Figma などからも強い需要
  - Upstream Document Picture-in-Picture
    - WICG から whatwg/HTML, Fullscreen, CSSWG へ upstream する提案
    - Anne が media working group と相談、モバイル対応が今後の論点
- 2026-04-16
  - https://github.com/whatwg/html/issues/12370
  - Stage3 (Request): Out-of-order HTML streaming/patching
- 2026-04-23
  - https://github.com/whatwg/html/issues/12383
  - Johnny Stenback が初回 Chair。Gemini で議事録生成
  - Stage2: Reference Target
  - Form Control Range が近く Stage3 になる予定


#### CSSWG

- https://www.w3.org/blog/CSS/
- https://lists.w3.org/Archives/Public/www-style/
- [css-conditional] @supports-condition for larger feature queries and named reuse
  - https://github.com/w3c/csswg-drafts/issues/12622
  - @supports を拡張し、任意の CSS を直接テストできる @supports-condition
  - @supports (--foo) で @custom-media 同様カスタム supports condition として利用できるように
- [css-mixins-1] Split CSS Mixins Level 1 into levels
  - https://github.com/w3c/csswg-drafts/issues/13722
  - Custom Functions & Mixin の仕様のレベルを分割
  - Lv1: Custom Functions
  - Lv2: Mixins & Macros
- [css-mixins-1] Using a scoping rule breaks author expectations
  - https://github.com/w3c/csswg-drafts/issues/13727
  - @mixin から @scope の挙動を drop
- Proposal: Declarative Web Haptics
  - https://github.com/w3c/csswg-drafts/issues/13728
  - CSS から宣言的に Haptic フィードバックを指定する
- [css-fonts-5] meta text-scale limits
  - https://github.com/w3c/csswg-drafts/issues/13557
  - iOS などで指定の仕方によっては極端に文字サイズが大きくなり、レイアウトが破綻する可能性が否めない
  - scale の上限を設定する仕組みを導入してはどうか
  - RESOLUTION では scale keyword を廃止し、上限を指定できるように(どこまでスケーリングに対応したかには、責任を持てる)
  - 一方で、「上限以上に拡大したいユーザは一定数いるはずで、それ著者がわで制限すべきではない」という反論が大きく、廃止にはならなそう
- Proposal: CSS Text Transitions & Animations
  - https://github.com/w3c/csswg-drafts/issues/13689
  - 単語の文字自体をアニメーションさせる提案
  - span などで区切って実装していたアニメーションに対する標準側のソリューション
  - 何を"単語"と指定して文字をアニメーションするか
  - BlinkOn のネタ
- [css-conditional] Layout State Container Queries: column-position feature
  - https://github.com/w3c/csswg-drafts/issues/13729
  - flex/grid/multi-column 内で何番目の col/row かを CQ で取得
- Form Controls 系諸々整備


#### Other

- W3C Workshop Report: Smart Voice Agents
  - https://www.w3.org/news/2026/w3c-workshop-report-smart-voice-agents/
- Last Call for Review of Proposed Corrections and Additions to ARIA in HTML
  - https://www.w3.org/news/2026/last-call-for-review-of-proposed-corrections-and-additions-to-aria-in-html/
- W3C Invites Implementations of RDF 1.2 Concepts and Abstract Data Model and RDF 1.2 Semantics
  - https://www.w3.org/news/2026/w3c-invites-implementations-of-rdf-1-2-concepts-and-abstract-data-model-and-rdf-1-2-semantics/
- Advisory Board publishes Position Statement on AI in Standards Work
  - https://www.w3.org/blog/2026/advisory-board-publishes-position-statement-on-ai-in-standards-work/
- The W3C TAG Meeting in London, March 2026
  - https://www.w3.org/blog/2026/the-w3c-tag-meeting-in-london-march-2026/
- The W3C TAG Meeting in London, March 2026
  - https://www.w3.org/blog/2026/the-w3c-tag-meeting-in-london-march-2026/
- Web Content Browser for AI Agents Community Group
  - https://www.w3.org/community/web-content-browser-ai/
  - エージェントが解釈する用の JSON フォーマットを考える CG
  - llms.txt とかとは何が違う?
- Call for Participation in Agent Identity Registry Protocol Community Group
  - https://www.w3.org/community/agent-identity/2026/04/24/call-for-participation-in-agent-identity-registry-protocol-community-group/
  - AI の Identity を検証可能にするインフラ整備をする CG


### TC39/TC55 動向

#### Meeting

- 2026-03
  - https://github.com/tc39/agendas/blob/main/2026/03.md
  - https://github.com/tc39/notes/pull/404/changes
  - Temporal が Firefox と Chrome に ship され Stage 4 に
    - https://maggiepint.com/2017/04/09/fixing-javascript-date-getting-started/ から 8 年 11 か月かかった
    - 今後は Web Platform Integration (構造化複製アルゴリズムや input type=date) を進めていく
  - Import Text が Stage 3 に
    - ECMA-262 では textual data を扱う仕様として明記されたが、WHATWG で特に MIME タイプを見て制限をするようなことはしない
    - application/yaml など明らかにテキストとして扱うべきだが text/ で始まらないものがあり不明瞭、リストを仕様で持つと新しい MIME タイプの普及を阻む
    - UTF-8 として解釈できない部分は � (U+FFFD) に置換される
    - https://github.com/whatwg/html/pull/11933
  - Stage 2.7 ESM Phase Imports の議論
    - 構造化複製アルゴリズムを通すと同一の source key を持つが別オブジェクトの ModuleSource を作ることができる
    - 別オブジェクトの ModuleSource が同じネームスペースオブジェクトを返すのは不自然という議論が起きている
    - https://github.com/tc39/proposal-esm-phase-imports/pull/58
  - Curtailing the power of "Thenables" が Stage 2 に
    - Mozilla DOM チーム協力のもと WebIDL the promises resolution steps をこの仕様に置き換えて WPT を実行した
    - 概ねテストが通ったので互換性の問題はなさそう


#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2026-03-01}...main@{2026-04-01}
- https://tc39.github.io/beta/
- withdrawn
  - Dynamic Import Host Adjustment
- 0->1
  - Error code property
- 1->2
  - Intl Unit Protocol
  - Thenable Curtailment
- 2->2.7
  - Error Stack Accessor
  - Iterator Includes
- 2.7->3
  - Import Text
- 3->4
  - **Temporal**
  - Intl Era and MonthCode


#### New Proposals


#### WinterTC

- https://github.com/WinterTC55/admin/tree/main/meetings
- admin/meetings/2026-04-03.md
  - https://github.com/WinterTC55/admin/blob/main/meetings/2026-04-03.md
  - 1 Welcome, opening and meeting logistics
  - 2 Approval of the minutes of the virtual meeting of 20 March 2026
  - 3 Review of the agenda
  - 4 Discussions
    - 4.1 Video call
    - 4.2 Runtime keys
    - **4.3 Package maps**
  - 5 Any other business
  - 6 Next meetings
    - 6.1 Past and Future Agendas
  - 7 Conclusion
    - Footer
      - Footer navigation


#### Other


### IETF 動向

#### IETF


#### WG

- RFC
- Work
  - Feed Menus
    - https://www.ietf.org/archive/id/draft-nottingham-feed-menu-00.html
    - link による既存のフィード自動検出機能には諸々の使いづらさがある
    - トップに /.well-known/feed-menu.json を配置するだけで、RSS/Atom Feed を簡単に見つけられるようにする提案
    - 既に拡張が公開されている
      - https://github.com/mnot/feedmenu-extension
  - The Preliminary Request Denied HTTP Status Code
    - https://www.ietf.org/archive/id/draft-ietf-httpbis-pre-denied-00.html
    - Speculation Rules などによる投機的取得を明示的に拒否するステータスコード
    - 503 (Service Unavailable) や 403(Forbidden)を返すと、サーバにエラーが発生しているように見えるため、特定のコードを定義したい
    - https://github.com/httpwg/http-extensions/issues/3410
    - 次は 419 が空いてそう
  - [TLS] Working Group Last Call for Use of ML-DSA in TLS 1.3
    - https://mailarchive.ietf.org/arch/msg/tls/0aXUb2aovzclOBLvrHt64pn_KQg/
    - TLS1.3 で ML-DSA を使う
  - Server Monitoring of Merkle Tree Certificates
    - https://www.ietf.org/archive/id/draft-mcmillion-server-monitoring-00.html
    - 元々の Certificate Transparency では、全ログをダウンロードして監視する方法が想定されていましたが、データ量の増大に伴い現実的なコストで運用できなくなりました。
    - 現在は第三者の監査サービスがログをインデックス化して提供することで効率化を図っていますが、その監査人が信頼できるとは限らず、不正な証明書が見落とされるリスク(セキュリティ上のギャップ)が生じています。
    - 発行された証明書の総数に対して、効率的(対数的)な作業量で監視できる新しい手法を提案しています。
    - 認証局や証明書の数が増えても、高い監視効率が維持できる。
    - 新たな信頼主体(第三者)を必要としない。
    - サイト運営者とブラウザ間の過度な調整を必要としない。
    - 本来のセキュリティモデルを維持できる。
  - **Internet Protocol Version 8 (IPv8)**
    - https://www.ietf.org/archive/id/draft-thain-ipv8-00.html
  - Meow
    - https://www.ietf.org/archive/id/draft-meow-mrrp-00.html
- Meeting


#### Other

- What's Missing in the 'Agentic' Story
  - https://www.mnot.net/blog/2026/04/24/agents_as_collective_bargains
  - コンピュータの歴史において、機械が指示通りに動作するという前提があった。
  - かつてのソフトウェアは、明確な機能を持ち、悪意のあるソフトウェアとは区別されていた。
  - 現代の技術では、ユーザーが信頼する相手が多く、信頼関係が成立しにくい。
  - インターネットに接続されたデバイスは、ユーザーの情報を収集し、第三者と共有するリスクがある。
  - テレビやスマートフォンなど、ユーザーのプライバシーを侵害する事例が増加している。
  - クラウドコンピューティングの普及と企業の利益追求が、信頼の低下を招いている。
  - ユーザーエージェント(Web ブラウザ)は、ユーザーの利益を代表し、他者とのバランスを取る役割を果たす。
  - AI エージェントの開発には、ユーザーの権利を尊重する明確な役割が必要である。
  - 現在の AI エージェントは、ユーザーの利益を十分に考慮していない可能性がある。
  - AI エージェントの透明性と規制の必要性が強調されている。


### 周辺動向

#### ベンダー動向

- Our ongoing commitment to privacy for the 1.1.1.1 public DNS resolver
  - https://blog.cloudflare.com/1111-privacy-examination-2026/
- Servo is now available on crates.io - Servo aims to empower developers with a lightweight, high-performance alternative for embedding web technologies in applications.
  - https://servo.org/blog/2026/04/13/servo-0.1.0-release/
  - Rust 製ブラウザエンジンの Servo、Rust 公式レジストリ「Crates.io」でリリース開始。長期サポート版も提供へ － Publickey
    - https://www.publickey1.jp/blog/26/rustservorustcratesio.html
    - 今回、[Crates.io](http://Crates.io)からリリースが公開されたことで、容易に Rust 製アプリケーションへ組み込めるようになることが期待
    - 今後は 6 カ月ごとに Servo の LTS 版がリリース
    - LTS 版は 9 カ月間のサポート期間が設定され、その間は API の仕様変更がないことと脆弱性に対するセキュリティパッチの提供が約束される
- Opera One integrates Gemini to the sidebar
  - https://blogs.opera.com/news/2026/03/opera-one-adds-gemini-and-google-translate-to-the-sidebar/
- Connect Claude & ChatGPT to Opera One
  - https://blogs.opera.com/news/2026/04/opera-new-browser-connector-brings-claude-and-chatgpt-into-the-browser/
  - > Browser Connector is a new feature that lets you connect your Opera browser directly with ChatGPT or Claude AI via Model Context Protocol (MCP).
  - > ChatGPT or Claude can now access your real-time web context
- Opera Neon now supports MCP Connector
  - https://blogs.opera.com/news/2026/03/opera-neon-adds-mcp-connector-to-the-browser/
- Play Your Way on the Opera GX Playground
  - https://blogs.opera.com/news/2026/04/opera-gx-playground/
- Opera adds YouTube and Twitch to the Sidebar - Blog | Opera News
  - https://blogs.opera.com/news/2026/04/opera-best-video-streaming-browser-adds-youtube-and-twitch/
- **The difficulty of making sure your website is broken - Let's Encrypt**
  - https://letsencrypt.org/2026/04/10/test-sites.html
  - 証明書が正常、期限切れ、失効した場合にどう挙動するかをテストする環境が必要
  - これを作るのが意外と大変なので Go で書いた話
  - 実際に試せるリンクが載っている
  - https://valid.x1.test-certs.letsencrypt.org/
  - https://expired.x1.test-certs.letsencrypt.org/
  - https://revoked.x1.test-certs.letsencrypt.org/
- Igalia at BlinkOn 21 | Igalia
  - https://www.igalia.com/2026/04/16/Igalia-at-BlinkOn-21.html
- Igalia WebKit Team | WebKit Igalia Periodical #61
  - https://blogs.igalia.com/webkit/blog/2026/wip-61/
- Igalia WebKit Team | WebKit Igalia Periodical #62
  - https://blogs.igalia.com/webkit/blog/2026/wip-62/
- Post-Quantum Cryptography Migration at Meta: Framework, Lessons, and Takeaways - Engineering at Meta
  - https://engineering.fb.com/2026/04/16/security/post-quantum-cryptography-migration-at-meta-framework-lessons-and-takeaways/
- **Shared Dictionaries: compression that keeps up with the agentic web**
  - https://blog.cloudflare.com/shared-dictionaries/
  - Phase 1: Passthrough Support
    - 最初の段階は、Cloudflare が辞書圧縮レスポンスをそのまま中継できるようにする
  - Phase 2: Edge Recompression / CDN 最適化
    - 次の段階では、Cloudflare エッジが辞書圧縮を理解し、配信を最適化します。
  - Phase 3: Automatic Dictionary Management
    - 最終的には、辞書のライフサイクル管理まで自動化する構想です。


#### セキュリティ動向


#### Other

- The Web Is An Antitrust Wedge - Infrequently Noted
  - https://infrequently.org/2026/04/the-web-is-an-antitrust-wedge/


### イベント

- 5 月
  - 7: World Passkey Day
    - https://x.com/FIDOAlliance/status/2044123049612493232
  - 14: 2026 年第 1 回 W3C 日本会員会議
    - https://www.w3.org/2026/05/14-jp-meeting/
  - 19-20: Google I/O
    - https://io.google/2026/
  - 19-21: TC39 Amsterdam
    - https://github.com/tc39/agendas/blob/main/2026/05.md
  - 21: GAAD JAPAN 2026
    - https://www.gaad.jp/
- 6 月
  - 8-12: WWDC
    - https://developer.apple.com/wwdc26/
  - 11-12: CSS Day 2026
    - https://cssday.nl/
  - 15-17: Web Engines Hackfest
    - https://webengineshackfest.org/
- 7 月


### Wrap Up

- Chrome
  - Chrome 148 beta
  - Ship
    - Name-only container queries in CSS
    - Programmatic scroll promises
    - Capability Elements usermedia MVP
    - Focusgroup
    - CSS URL request modifiers
    - Popover=hint behavior changes
  - Prototype
    - Element's matchContainer()
    - overscroll-behavior: chain
    - CSS text-decoration-inset
    - CSS4 text-decoration-skip-spaces
    - Implement visibility:collapse for flex items
    - Private Verification Tokens
    - Main thread Atomics.wait
  - Experiment
    - Declarative CSS module scripts
    - HTML-in-canvas
    - Parse processing instructions in HTML
  - Ready for Developer Testing
    - Overscroll Gestures
  - Deprecate and Remove
  - PSA
    - Remove explicit border color UA stylesheet rule for tables
    - IndexedDB: SQLite backend
  - other intents
  - web.dev
  - Google Developer Blog
    - Google I/O 2026
      - https://io.google/2026/
  - Chrome Developers
    - name 属性と label テキストで判定で autocomplete をのカタカナ、ひらがなを自動判定
    - Connection-Allowlist
    - Soft Navigations が origin trial
  - other blogs
    - back button hijacking(戻るボタンで広告出る)が Google 検索でスパム扱い
    - Q1 2026 Summary from Chrome Security
    - プロンプトインジェクション on the Web
    - バックボタンハイジャッキングが Google 検索でスパム扱いに
  - other
    - JSIR
    - 報奨金制度見直し
    - Gemini in Chrome が日本でロールアウト開始
    - BlinkOn
      - HTML in Canvas
      - Declarative Text Animations
- Firefox
  - 150
    - ariaNotify()
    - light-dark() on images
    - color-mix() with an arbitrary number of colors
    - The revert-rule CSS keyword
    - sizes="auto" for lazy loaded responsive images
  - Ship
    - Document Picture-in-Picture API
    - Container Style Queries
    - Prototype and Ship: position-anchor: normal
  - Prototype
    - Importing text modules
  - other intents
  - MDN Blog
  - Standard Position
    - Negative : Observable
  - other
- Safari
  - TP 240
  - JetStream 3
  - TP 241
    - Added stable support for CSS scroll anchoring.
    - auto keyword in the sizes attribute on img
    - maxAge in cookieStore.set().
  - Name-only @container queries
    - blog が消える
  - TP 242
    - Added support for the CSS attr() function from CSS Values Level 5.
    - Added support for the closedby attribute on dialog elements.
    - Added support for getAllRecords() and IDBGetAllOptions in the IndexedDB API.
  - Standard Position
    - Positive
      - ViewTransitions: waitUntil() method
      - Deprecate and remove externally loaded entities in XML parsing
      - Support `shadowrootslotassignment` attribute
      - Import Bytes
    - Neutral
      - Modern Algorithms in WebCrypto
    - Oppose
      - CPU Performance API
  - other
    - Tim Cook Retire
      - Tim Cook が Apple CEO 退任。
      - John Ternus が 9/1 付で新 CEO に就任。
- Edge
  - Passkey 同期の開発裏側
- W3C/WHATWG
  - Draft
    - FPWD: CSS Image Animation Module Lv1
  - Open UI
  - WHATNOT meeting
    - Chris Wilson が Google をやめた。新しい Johnny Stenback
    - Stage2 HTML in Canvas
    - Jake と Mason による popover=hint の大幅整理
    - Stage2 Reference Target
    - To-be Stage3 Form Control Range
  - CSSWG
    - @supports-condition の指定方法が @supports (--foo) などで利用できるように
    - Mixin の仕様がめっちゃ大きくなったから分割
    - CSS から宣言的に Haptic フィードバックを指定する
    - RESOLUTION では scale keyword を廃止し、上限を指定できるように
    - 単語の文字自体をアニメーションさせる提案
    - flex/grid/multi-column 内で何番目の col/row かを CQ で取得
  - Other
- TC39
  - WinterTC
    - package maps という仕様について議論している
- IETF
  - RSS を自動検出する /.well-known/feed-menu.json
  - Speculation を拒否するステータス 419
  - ML-DSA in TLS1.3
  - Merkle Tree で CT モニタリングの提案
  - IPv8 の個人ドラフトがなぜか話題に
- 周辺動向
  - ベンダー動向
    - Serve を Crates.io に公開
    - CF Shared Dictionaries サポート予定
    - Let's Encrypt 証明書確認
  - セキュリティ動向
  - Other