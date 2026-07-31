---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep211.mp3
published_at: 2026-07-31
guests:
  - name: "@saku"
    url: https://x.com/sakupi01
  - name: "@petamoriken"
    url: https://x.com/petamoriken
---

# ep211 Monthly Platform 202607

## Theme

第 211 回のテーマは 2026 年 7 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 151

#### Updates

- New in Chrome 150
  - https://developer.chrome.com/blog/new-in-chrome-150
  - CSS `text-fit` property
  - Focusgroup
  - CSS `background-clip: border-area`
- **Chrome 151 beta**
  - https://developer.chrome.com/blog/chrome-151-beta
  - CSS and UI
    - Animation accessor on animation and transition events
    - CSS `ruby-overhang` property
    - Initial value of `position-anchor` changed to normal
    - No auto-rewind for AnimationTrigger play methods
    - Wheel event momentum attribute
  - Web APIs
    - **Capability elements `<usermedia>`**
    - `LanguageDetector` support for traditional and simplified Chinese
    - Speculation rules `form_submission` field
    - Web Speech API unspoken punctuation
    - **Stream text with `textStream()`**
    - WebGPU: Subgroup size control
  - DOM and HTML
    - Reference target for cross-root ARIA
    - Exposed FontFaceSet global interface
    - **Memory-safe XML parsing in Rust**
    - Performance
    - `PerformanceSoftNavigation` and `InteractionContentfulPaint` timeline entries
    - Cross-origin redirect timing opt-in
  - Accessibility
    - **`aria-actions` attribute**
  - Security and Privacy
    - Direct Sockets permission policy update
  - New origin trials
    - WebCrypto algorithm updates
    - WebRTC Data Channel: SCTP Negotiation Acceleration Protocol
  - Deprecations and removals
    - Support removed for macOS 12
- New in Chrome 151
  - https://developer.chrome.com/blog/new-in-chrome-151
  - Capability element: `<usermedia>` MVP
  - Declarative shadow DOM: `shadowrootslotassignment` attribute
  - Soft Navigations and interaction performance metrics
- **What's new in web UI**
  - [https://developer.chrome.com/blog/new-in-web-ui-io26](https://developer.chrome.com/blog/new-in-web-ui-io26?hl=en)
  - Part 1: Respect user preferences
  - Part 2: Implement natural interactions
  - Part 3: Provide guided navigation
  - Part 4: Maximize content, reduce noise
  - Part 5: Adapt to the form factor
  - Lightning round
- **Chrome 152 beta**
  - https://developer.chrome.com/blog/chrome-152-beta
  - CSS and UI
    - CSSPseudoElement support for `::backdrop`, `::scroll-marker`, and `::view-transition`
    - Expose the `autocorrect` global HTML attribute
    - Media element pseudo-classes
    - Relative alpha colors (CSS Color 5 `alpha()` function)
    - window-drag CSS property
  - Web APIs
    - CPU Performance API
    - Connection Allowlists
    - Notification attribution for PWAs on macOS
    - OpaqueRange
    - Isolated Web Apps (IWA) Sub apps
    - Unframed display mode for Isolated Web Apps
    - WebGPU: Subgroup Size Control
    - Window Shape API
  - Media
    - MediaCapabilities encryptionScheme
    - audioPreferred capture in getDisplayMedia API
  - New origin trials
    - Speculation Rules: moderate viewport heuristics controls
    - **Deprecation trial for client-side XSLT**
  - Deprecations and removals
    - Remove Private Aggregation API

  #### Intents

- **Ship: Navigation: Ignore duplicate navigations**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aXxomXu4_xE
  - 同一のナビゲーションが迅速に開始された場合、進行中のナビゲーションが不必要にキャンセルされるのを防ぐ。
  - 重複リクエストによるリソースの無駄を省き、パフォーマンスとユーザーエクスペリエンスを向上させる。
  - ユーザーは同じ URL に迅速にナビゲートすることがあり、これを考慮して重複ナビゲーションを無視する機能を実装。
  - 初回のナビゲーションを保持し、後続の重複リクエストで置き換えない。
- **Ship: Window shape API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nHAx5UG39_8
  - Window Shape API は ChromeOS 上の Isolated Web Apps がウィンドウの形状をカスタマイズできる機能を提供する。
  - 非矩形および非連続のウィンドウレイアウトを可能にし、独自のユーザー体験を実現できる。
  - window.chromeos.isolatedWebApp.setShape API は、ウィンドウが未フレーム表示モードである必要があり、ウィンドウ管理の権限が必要である。
  - 管理者は既存のウィンドウ管理ポリシーを用いてこの機能を管理できる。
- Ship: Fetch-compliant range handling for blob URLs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2Zu4Z3QAcEI
- **Ship: CSS `scroll-marker-group` modes**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xRezayRFIJ0
  - scroll-marker-group に `links` と `tabs` を追加する
  - `links` はナビゲーションリストとして機能し、デフォルトで使用される。
  - `tabs` はタブリストとして機能し、標準のタブパターンを再現する。
  - 各モードはフォーカス順序とアクセシビリティの動作を変更し、WAI-ARIA パターンに従う。
- Ship: Capability elements: `<camera>` and `<microphone>`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Iaoq0CYadzo
- Ship: MediaCapabilities.decodingInfo.encryptionScheme
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/j7lSJEG9_0M
- **Ship: Renewed HTML insertion&streaming methods**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FAqz78iLGdc
  - HTML の動的更新メソッドがバラバラなので統一する
  - `sanitizer`/`runScripts`/`Streaming` なども適切に扱えるようにする
  - `before`/`after`/`append`/`prepend`/`replaceWith`
  - `stream{Append}HTML{Unsafe}`
- Ship: Sub apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/I7lyLGnBCqo
- Ship: Unframed display mode for Isolated Web Apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ebpqcr66MHA
- **Ship: WebAudio: Configurable render quantum**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/i4c1unRSmcE
  - `AudioContext` / `OfflineAudioContext` の量子化サイズをカスタマイズできる
  - `renderSizeHint` オプションに任意の正整数値を渡せるほか、"default" で 128 フレームに、"hardware" でブラウザに最適サイズを選択させる
- Ship: WebGPU: `buffer_view` feature
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SqlkyufSEpc
- Ship: MediaCapabilities.decodingInfo.encryptionScheme
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/j7lSJEG9_0M
- Ship: audioPreferred capture in getDisplayMedia API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HRDCKw29a_U
- **Ship: Approximate geolocation**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/c0j9-flxVQ4
  - Geolocation API の拡張により、サイトは近似位置データを要求できるようになる。
  - オプションに `accuracyMode: "precise" | "approximate"` を追加し、`"approximate"` の場合 2km 以上の大まかな位置情報を取得できるようにする。
    - カリフォルニア州プライバシー権利法では 564m 以内だと正確な位置情報として扱われる。他の州の法令でもだいたい同じ距離
    - iOS 14 / Android 12 以降で設定から正確な位置情報をオフにすると 2km 以上の大まかな位置情報となる
  - ユーザーのプライバシーを強化しつつ、機能性を損なわない。
  - 現在は Android でのみサポートされており、デスクトップ版の実装は進行中。
- Prototype and Ship: [webdriver] Better signature counter support for WebAuthn virtual authenticators
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HLKgI9WB4Y4
- **Prototype: CSSOM View geometry utilities**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rmKdsKJMfSI
  - CSSOM View GeometryUtils API を Blink でプロトタイプ化する。
  - API は`getBoxQuads()`、`convertQuadFromNode()`、`convertRectFromNode()`、`convertPointFromNode()`を提供。
  - 現在、ウェブ著者は正確なボックスジオメトリを取得するための標準 API を持たない。
  - Visual editors や inspection tools などでの使用が想定される。
- **Prototype: Device Bound Session Credentials (DBSC) JavaScript API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8HaLI4pn7sc
  - Device Bound Session Credentials (DBSC)は、ユーザーのデバイスにセッションをバインドすることでアカウントハイジャックから保護する。
  - 現在は非同期 HTTP ヘッダーに依存しているため、セッション登録の完了が不明である。
  - この API は、アクセスを許可する前にセッション確立の決定的保証を提供する。
  - 主な課題は、早期の Cookie 発行と SSO ハンドオフの脆弱性である。
- **Prototype: Web Authentication Ambient UI**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/przmjjztuGk
  - 新しいモード「Ambient」は、`navigator.credentials.get()`を使用してユーザーをウェブサイトにサインインさせるものである。
  - Ambient は Conditional Mediation(Conditional UI とも呼ばれる)に類似し、ユーザーに資格情報がある場合のみ UI が表示される。
  - サインイン資格情報がない場合、Promise は解決されない。
  - Ambient は autofill UI を使用せず、サインインフォームがページに存在する必要がないため、非モーダルな提案としてサインインオプションを提供する。
- **Prototype: Web Haptics API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QTLE03g25oU
  - Web Haptics API は、CSS と JavaScript を通じてウェブインタラクションのためのセマンティックなハプティックフィードバックを提供する。
  - 開発者はデバイス固有の振動パターンを作成する代わりに、ハプティックインテントを表現できる。
  - API は、宣言的な CSS ベースのハプティクスと、実行時の決定が必要なインタラクションロジックのための命令的な JavaScript 制御をサポートする。
  - 現在の `navigator.vibrate()` API はモバイル中心で、広範なプラットフォームサポートが欠如している。
- **Prototype: `<input type="checkbox" switch>`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QqbOHXhS8Rk
  - Safari が実装しているものを MS の人が Chrome に実装し始めた
  - 元 `<switch>` はもう withdrawn
- **Prototype: Background work API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GoTXujrV3YI
  - バックグラウンドタスクへのリソース制限を緩和する API
  - ページがバックグラウンドにあっても止まって欲しくないタスクを実行し切る目的
  - メディアアップロード、同期、更新など
  - これまでは、音声再生やダミー WebRTC などのハックで行っていた
  - ネイティブで明示的な、ユーザ制御下の API を用意する
- Prototype: BlobOpaqueOriginForInnerNonHttpNonFileScheme
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mS87yfDEzxU
- **Prototype: CSS mixins**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/g0dSC7CvdlA
  - 初期実装は既に行われておりフラグ下で進行中
  - CSSWG に合わせて実装調整するための I2P
  - `@mixin` で再利用可能な宣言を、`@apply` で使い回す
- **Prototype: CSS `shrink-to-fit` container**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/H8iIAHDHijc
  - ラップされたコンテンツの最大行長に合わせてコンテナの幅を縮小する。
  - fit-content のようなキーワードは、テキストがラップされる際に空白を残すが、この CSS プロパティは実際のレンダリングレイアウトに密着する。
  - `max-content-sizing: shrink-to-fit container`
- **Prototype: Declarative fragments**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rjBSVWAGoHo
  - HTML フラグメントを宣言的に定義する機能
  - `<template src>` で import 可能
  - Sanitize が制御しやすいため有用
- Prototype: Gamepad button `type` attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ag_kqADixlo
- Prototype: SpeechRecognitionResult Timestamps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/r78IyGSnclg
- Prototype: SpeechRecognitionResult Timestamps (WebSpeech API)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QTCGk1omVO8
- Prototype: Support Long Animation Frames API in Web Workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Z99Ds3LDkYw
- Prototype: Swap SVGAElement to the new HyperlinkElementUtils
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QPP0wy0FhCY
- Prototype: BlobOpaqueOriginForInnerNonHttpNonFileScheme
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mS87yfDEzxU
- **Prototype: Slotted Options for `<select>`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7OqnTHvZPls
- **Prototype and Ship: `scroll-axis-lock`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hKqC91rcSG0
  - ブラウザがユーザーのスクロールジェスチャーを一つの軸に制約しないよう指示する CSS プロパティである。
  - ブラウザは、ジェスチャーが一つの軸での動きが大きい場合に、ユーザーのスクロールを単一の軸に「ロック」することがある。
  - この動作は、ユーザーの意図が一つの軸でのスクロールである場合、誤って別の軸にスクロールするのを防ぎ、ユーザー体験を向上させる。
  - しかし、要素が常に対角方向にスクロール可能であることを望む場合、このロックはユーザーに不便を強いることがある。
- **Prototype: CSS `symbols()` function**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/F_tR_XiLzGI
  - CSS Counter Styles Level 3 から実装され、Firefox は 2015 年から対応しているが、Chrome、Edge、Safari は未対応である。
  - 匿名のカウンタースタイルをインラインで定義でき、既存の `@counter-style` を宣言する必要がない。
  - 文字列シンボルのリストとオプションのカウントシステム(cyclic、numeric、alphabetic、symbolic、fixed)から匿名のカウンタースタイルを構築する。
  - `list-style-type` や `counter()`/`counters()` で受け入れられ、カスタムリストマーカーの定義が簡素化される。
- Prototype: Language Detector and Translator APIs on Android
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/saJHYqHHPSY
  - Language Detector API と Translator API を Chrome for Android に公開する。
  - モバイルデバイス上でテキスト言語の検出と翻訳をローカルに行う。
  - プライバシーを保護し、オフラインで機械学習モデルを使用する。
  - クラウドエンドポイントに依存せず、デスクトップとモバイル間で機能の均等性を確保する。
- Prototype: Swap SVGAElement to the new HyperlinkElementUtils
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QPP0wy0FhCY
- Experiment: Prefetch activation beacon
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lhpguTF6uos
- Experiment: Speculation Rules - moderate viewport heuristics controls
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RpU2QciBU3Q
  - 現在の viewport heuristics は開発者の実験の余地を与えない。
  - この実験的機能は、異なる heuristics パラメータがデフォルトより良い結果をもたらすかを検証するための制御を提供する。
  - この機能は実験専用であり、現状のまま出荷する計画はない。
  - 開発者がモバイル viewport の heuristic 値を見つけ、報告することを目的としている。
- Experiment: WebRTC Data Channel: SCTP Negotiation Acceleration Protocol
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/U4uet_kov9c
- Experiment: Declarative Performance Observer
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kIp6iF6rhAg
- Ready For:
- Ready for Developer Testing: Gamepad button `type` attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4ovrOY8_7KY
- Extend Experiment: Digital Credentials API (issuance support)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/27cnix030V4
- Extend Experiment: Prerendering cross-origin iframes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0jYzrf5N_H4
- Extend Experiment: Capability Elements `<usermedia>` MVP
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xCxXhY0PofA
- Extend Experiment: WebAudio: Configurable render quantum
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/B3OnsU0V-i4
- Research inquiry: browser-native HTTP Message Signatures beyond Signature-based Integrity
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EQMn2upcl7A
- Change:
- Unship:
- Deprecate & Remove:
  - document.requestStorageAccessFor
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/bqHGZYHWxnQ
- Web-Facing Change PSA: Notification attribution for PWAs on macOS
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1-_VfY1NIQs
- Web-Facing Change PSA: Interoperable dispatch timing for `transitionrun` and media query events
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OC_kIQX66OQ
- **Adding an "Adoption" Gate to ChromeStatus Shipping Stages**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7LlGyWsZs10
  - Feature の Ship とともに Adoption が指定されるようになる
  - MDN や MWG との連携する仕組みで、開発者への機能の普及を促す目的
  - Chrome 150+ の Feature Status より始まっている

  #### Other

- web.dev
  - https://web.dev/
  - May 2026 Baseline monthly digest
    - https://web.dev/blog/baseline-digest-may-2026
  - Effortlessly get Baseline target data with the updated Baseline Checker tool
    - https://web.dev/blog/baseline-ga-checker-update
  - Introducing Baseline Alerts
    - https://web.dev/blog/baseline-alerts
  - New to the web platform in June
    - https://web.dev/blog/web-platform-06-2026
  - June 2026 Baseline monthly digest
    - https://web.dev/blog/baseline-digest-jun-2026
      - Newly
        - field-sizing
      - Widely
        - `:has()`
        - CSS Nesting Selector
        - `pow()` function
  - **The Baseline Features audit is now available in Lighthouse**
    - https://web.dev/blog/baseline-lighthouse-features-audit
    - Baseline Features | Lighthouse | Chrome for Developers
      - https://developer.chrome.com/docs/lighthouse/best-practices/baseline-features
      - ページで利用している機能の Baseline Status を Lighthouse で一覧できるようになった
- google for developers
  - https://developers.googleblog.com/
  - **LiteRT.js, Google's high performance Web AI Inference**
    - https://developers.googleblog.com/litertjs-googles-high-performance-web-ai-inference/
    - LiteRT.js は、AI をウェブブラウザ内で直接実行するための JavaScript バインディングである。
    - 最大性能で ML および AI モデルをローカルで実行し、ユーザープライバシーを強化し、サーバーコストをゼロにする。
    - LiteRT.js は、 `.tflite` モデルのデプロイをスムーズにし、TensorFlow.js からの進化を遂げた。
    - XNNPACK、ML Drift、WebNN を活用し、CPU、GPU、NPU に対するネイティブなハードウェアアクセラレーションを提供する。
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - https://developer.chrome.com/blog/
  - Chrome Web Store policy updates: Enhancing user privacy and platform integrity
    - [https://developer.chrome.com/blog/cws-policy-updates-2026](https://developer.chrome.com/blog/cws-policy-updates-2026?hl=en)
  - Selective format read: A better default for the Async Clipboard API
    - [https://developer.chrome.com/blog/selective-format-read](https://developer.chrome.com/blog/selective-format-read?hl=en)
  - **Test the Email Verification Protocol with an origin trial**
    - https://developer.chrome.com/blog/email-verification-protocol-origin-trial
  - Implementing passkeys just got easier: Introducing the Modern Web Guidance passkey skills
    - [https://developer.chrome.com/blog/passkey-skills](https://developer.chrome.com/blog/passkey-skills?hl=en)
  - Use the built-in Prompt API with the Vercel AI SDK
    - https://developer.chrome.com/blog/prompt-api-with-vercel-ai
  - Native Notification Attribution for Web Apps on macOS
    - [https://developer.chrome.com/blog/notification-attribution-macos](https://developer.chrome.com/blog/notification-attribution-macos?hl=en)
  - Use the Vercel AI SDK UI and AI Elements with the Prompt API
    - https://developer.chrome.com/blog/prompt-ui-ai-elements-with-vercel-ai
  - Lighter notification prompts on Android
    - https://developer.chrome.com/blog/notification-prompts-android
- chromium blog
  - https://blog.chromium.org/
  - Smoother scrolling: How we halved scroll jank in Chrome on Android
    - https://blog.google/chromium/smoother-scrolling-how-we-halved-scroll-jank-in-chrome-on-android/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
  - **Q2 2026 Summary from Chrome Security**
    - https://groups.google.com/a/chromium.org/g/security-dev/c/q2r512CzLio
    - Chrome Counter Abuse チームがデスクトップ向けに「危険なサイトを報告」機能を開始。
    - Merkle Tree Certificates (MTCs)の進捗があり、量子耐性 HTTPS 証明書の統合発行システムを開発中。
    - Enhanced Safe Browsing ユーザー向けに、HTTP 接続の改ざん防止機能がデフォルトで有効に。
    - Chrome AI Security チームが WebMCP を使用するためのベストプラクティスを公開。
    - CAPTCHA スタイルの摩擦を軽減する解決策を検討中。
    - Rust in Chrome チームがメモリ安全性向上に向けた実験を拡大。
    - C++の強化策として、メモリの境界外アクセスを防ぐ機能を追加。
    - プロセス隔離機能が進化し、Chrome の暗号化データを保護。
    - 新しいサンドボックスモデル「basic sandbox」の開発が開始。
    - Chrome の脆弱性報奨プログラム(VRP)が報告の質に基づき報酬構造を調整。
    - 1700 以上のサードパーティ依存関係の更新を維持するための取り組みを強化。
  - **Stronger with every update: How we're making Chrome and the web safer in the AI Era**
    - https://blog.google/security/chrome-stronger-with-every-update/
- search blog
  - https://developers.google.com/search/
- v8
  - https://v8.dev/
- other
  - Gemini Spark updates: macOS launch, connected apps and more
    - https://blog.google/innovation-and-ai/products/gemini-app/gemini-spark-updates-june-2026/
  - Google AI announcements from June 2026
    - https://blog.google/innovation-and-ai/technology/ai/google-ai-updates-june-2026/
  - Google introduces new AI labels for Ads
    - https://blog.google/products/ads-commerce/google-ads-ai-transparency-labels/
  - NotebookLM is now Gemini Notebook
    - https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/
  - Connect more of your apps to Search
    - https://blog.google/products-and-platforms/products/search/connected-apps/
  - What's new in Managed Agents in Gemini API
    - https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api-3-6-flash-hooks/
  - **Now in preview: Find and fix software vulnerabilities with CodeMender**
    - https://cloud.google.com/blog/en/products/identity-security/find-and-fix-software-vulnerabilities-with-codemender
    - Google Cloud、AI が自律的にコードの脆弱性検出からサンドボックス内でのリスク検証、修正までを自動実行。「CodeMender」プレビュー公開 － Publickey
      - https://www.publickey1.jp/blog/26/google_cloudaicodemender.html
  - Why AI apps fail in production
    - https://cloud.google.com/blog/topics/developers-practitioners/why-ai-apps-fail-in-production
  - Automate agent development lifecycles with Gemini Enterprise
    - https://cloud.google.com/blog/topics/developers-practitioners/automate-agent-development-lifecycles-with-gemini-enterprise
  - Cyber Snapshot Report: Enterprise resilience key to toolchain success
    - https://cloud.google.com/blog/products/identity-security/cyber-snapshot-report-enterprise-resilience-key-to-toolchain-success
  - Updated Cyber Threat Actor Naming System
    - https://cloud.google.com/blog/topics/threat-intelligence/updated-cyber-threat-actor-naming-system
  - **Selfie for sign-in: a new, easy way to access your Google Account**
    - https://blog.google/innovation-and-ai/technology/safety-security/selfie-video-sign-in/
    - https://g.co/signin-selfie
  - Alphabet earnings call Q2 2026: Sundar Pichai remarks
    - https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q2-2026/
  - **​​「インターネットの父」ヴィント・サーフ氏、Google を退任へ**
    - https://www.itmedia.co.jp/news/article/2607/02/1260702057/

  ### Firefox 動向

  #### Stable: 153

  #### Updates

- https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases
- **Firefox 153 release notes for developers (Stable)**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/153
  - **Customizable Select Element to allow all nested elements (behind a flag)**
  - **Intl Locale Info API**
  - **import source syntax**
  - **Picture-in-Picture API on desktop**
  - **JPEG XL image support (Nightly)**
  - **`sibling-index()` `sibling-count()` (behind a flag)**
  - **Linked Parameters (behind a flag)**
- Wrexham AFC and Firefox announce a multi-year, front-of-kit partnership
  - https://blog.mozilla.org/en/firefox/wrexham-afc-firefox-partnership/
- **Firefox Containers Preview**
  - https://blog.mozilla.org/en/firefox/firefox-containers-preview/
  - タブ単位でアカウント切り替えできる
  - Brave's latest browser release offers Containers for better and easier workflow | Brave
    - https://brave.com/blog/containers/
- Firefox Quick Answers: Voice-powered answers for iOS
  - https://blog.mozilla.org/en/firefox/firefox-features/quick-answers-ios/
- Firefox Tab Groups for Android
  - https://blog.mozilla.org/en/firefox/tab-groups-android/
- **Try the New Firefox Design in Nightly**
  - https://blog.nightly.mozilla.org/2026/07/27/new-firefox-design/
  - Firefox のデザインシステム刷新プロジェクト Nova が Nightly に
  - ボタンなどが丸っこいデザインになった
- Community Roundup: Project Nova, Tab Groups & more - about:community
  - https://blog.mozilla.org/community/2026/07/29/newsletter-jul-2026/

  #### Intents

- **Ship: `text-box-trim` / `text-box-edge`**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/yCAFcvQ-Tkc
  - Blink や WebKit で非サポートな ideographic(表意文字), ideographic-ink(表意文字・墨跡)のエッジをサポート
  - Webkit 非サポートな複数列のコンテナのトリミングをサポート
  - Blink 非サポートなインラインボックスのトリミングをサポート
  - Gecko does not support trimming of line-clamp-ed boxes (Bug 2043012), which is also not supported by WebKit but which is supported by Blink.
  - Blink でサポートされてる `line-clamp` が適用されたボックスのトリミングは非サポート
- **Ship: Advanced CSS `attr()` function.**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/zIqcGoYKWus
- **Ship: `Promise.allKeyed` (Await Dictionary)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/8hIJOSN16_A
  - Stage 3 になった
- Ship: CSS `progress()` function
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Tnf4TzA2pjY
- Ship: No-Vary-Search HTTP Caching Extension
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/jEPsVhYykwQ
- **Prototype: margin-trim**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/jqKpaVHKs5M
- **Prototype: CSS Typed Arithmetic**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/iG6FI5DosEg
- Prototype: Audio Session API
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/N2tzLR7ngUw
- Change:
- Remove:
- **Heads up: retiring the "early beta" period**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/2MxNM8zmNaI
  - Beta ビルドをリリース候補に近づけるため、early/late beta を廃止し beta 一本に
- **Firefox release cadence experiment: moving to 2 weeks starting in September**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/qlaQ1YSlOP8
  - 2026/09 から 2week release に変更
  - Firefox 155 を 9/15 ではなく 9/1 にリリースするのが目標
  - 作業を早めるのではなくリリースが早くなるだけ
- Research inquiry: native Firefox support for RFC 9421 and RFC 9530
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/gF26xxLaYbk
  - TLS-terminating intermediaries を使用するウェブアプリケーションを調査している話

  #### Newsletter

- https://fxdx.dev/
- Engineering Effectiveness Newsletter (Q2 2026 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/WE0M9ikfuTk
- Firefox Security & Privacy Newsletter 2026 Q2
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/60BsGAfXEew
- Firefox WebDriver Newsletter 153 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-153/

  #### MDN / Open Web Docs

- https://developer.mozilla.org/en-US/blog/

  #### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2026-07-01+
- Positive
  - Display and `content-visibility` animations
    - https://github.com/mozilla/standards-positions/issues/762
  - CSS anchor positioning with transforms
    - https://github.com/mozilla/standards-positions/issues/1302
- Negative

  #### Other

- **Mozilla's Inaugural 'State of Open Source AI' Report Is Here**
  - https://blog.mozilla.org/en/mozilla/mozilla-state-of-open-source-ai-report/
  - The State of Open Source AI - v1.0.1 · July 2026
    - https://stateofopensource.ai/
  - Mozilla が公開したオープンモデルのサーベイ
  - プロプライエタリなモデルとオープンモデルとの性能差はわずか 3% まで縮小。コストは過去 3 年で最大 50 分の 1 に減少
  - 約 3 分の 1 をオープンモデルが占めているが、得られている業界収益は全体のわずか 4%
  - 採用率はアジア(特に中国・東アジア)が 89% でリード
  - 79% がオープンモデルを利用しているものの、商用で運用できているのは 53%。主因はインフラコスト・セキュリティ/コンプラ・保守・デプロイ複雑性といった運用面
  - モデルから、ハーネスに焦点が移動
  - > On July 24, Mozilla signed an open letter alongside NVIDIA, Microsoft, Meta, IBM, Dell, Mistral, Hugging Face, the Linux Foundation, and Andreessen Horowitz that argued that open weights are too important to be ignored.
- Over The Edge 2.0: what independent researchers found about browser choice on Windows
  - https://blog.mozilla.org/en/mozilla/browser-choice-windows-report-over-the-edge-2/
- A new Firefox look, hidden features, and more - about:community
  - https://blog.mozilla.org/community/2026/07/06/newsletter-jun-2026/

  ### Safari 動向

  #### Stable: 26.6

  #### Updates

- https://webkit.org/blog/
- Release Notes for Safari Technology Preview 247 | WebKit
  - https://webkit.org/blog/18133/release-notes-for-safari-technology-preview-247/
  - Accessibility
  - CSS
    - **Added support for `calc-mix()`.**
  - Fonts
  - Forms
  - HTML
  - JavaScript
  - MathML
    - Added support for embellished operator detection through `mrow` for underover layout.
  - Media
    - Added support for overriding color space for hardware video decoders in WebCodecs.
    - Added support for mapping `nextslide` and `previousslide` MediaSession actions to `nexttrack` and `previoustrack` platform commands, so pressing next/previous track invokes a registered slide handler when no direct track handler is registered.
  - Model Element
  - Networking
  - Rendering
  - SVG
  - Scrolling
  - Security
  - Spatial Web
  - Text
  - Web API
  - WebDriver
    - Allow your agent to connect to a Safari browser for development and debugging via the Safari MCP server.
  - WebGL
- Introducing the Safari MCP server for web developers | WebKit
  - https://webkit.org/blog/18136/introducing-the-safari-mcp-server-for-web-developers/
  - Safari MCP server は、ウェブ開発者向けの Model Context Protocol サーバーである。
  - エージェントは、Safari ブラウザウィンドウに接続することで、コードのレンダリングを把握できる。
  - デバッグプロセスを迅速化し、ターミナル内で作業を続けることが可能になる。
  - エージェントは、DOM、ネットワークリクエスト、スクリーンショット、コンソール出力にアクセスできる。
- Release Notes for Safari Technology Preview 248 | WebKit
  - https://webkit.org/blog/18162/release-notes-for-safari-technology-preview-248/
  - Accessibility
  - CSS
    - Added support for forwarding missing color components when interpolating between analogous color spaces.
    - Added support for the `no-clamp` option on the CSS `progress()` function.
  - Editing
  - Forms
  - Images
  - JavaScript
    - Added support for the TC39 BigInt Math proposal, exposing Math-equivalent methods on BigInt such as `BigInt.pow` and `BigInt.sqrt`.
  - Media
  - Navigation
  - Networking
  - Rendering
  - SVG
  - Scrolling
  - Security
  - Storage
  - Web API
  - Web Inspector
  - WebDriver
    - Added WebDriver support for the Digital Credentials API, including commands to simulate wallet payloads, indefinite waits, and user rejection.
  - WebRTC
- WebKit Features for Safari 26.6
  - https://webkit.org/blog/18178/webkit-features-for-safari-26-6/
  - WebAssembly
    - compileOptions
    - Wasm JS String Builtins
  - Bug fixes and more
    - CSS
    - Networking
    - Service Workers
    - Web Extensions
    - WebRTC
- Release Notes for Safari Technology Preview 249 | WebKit
  - https://webkit.org/blog/18182/release-notes-for-safari-technology-preview-249/
  - Accessibility
    - Resolved Issues
  - Animations
    - Resolved Issues
  - CSS
    - **Added support for the `attr()` function.**
    - Added support for `outline-offset: inset`.
    - **Added support for the `@function` custom functions rule.**
    - Added preview support for the `wrap-inside` property.
    - **Added support for the `if()` function.**
    - Added support for `calc-mix()`.
    - Added support for `justify-self` on `block-level` boxes.
    - Added preview support for `text-decoration-inset`.
    - Added preview support for the content property on the `::marker` pseudo-element.
  - Editing
    - Resolved Issues
  - Forms
    - Resolved Issues
  - HTML
    - Added support for `popover=hint`.
  - JavaScript
    - **Added support for the Temporal object.**
  - MathML
    - Resolved Issues
  - Media
    - Resolved Issues
  - Rendering
    - Added support for dark mode in the XML document viewer.
  - Scrolling
    - Resolved Issues
  - Spatial Web
    - Resolved Issues
  - Web API
    - Added support for subgroups in WebGPU.
    - Added support for close watchers, including the `closedby` attribute for dialog elements.
  - Web Audio
    - Resolved Issues
  - Web Inspector
    - Added support for the range mappings proposal in source maps.
    - Added per-element Layout Invalidated events in Web Inspector to reflect the number of elements affected by a layout invalidation.
  - WebAssembly
    - Resolved Issues
  - WebDriver
    - Added WebDriver support for the Digital Credentials API, including commands to simulate wallet payloads, indefinite waits, and user rejection.
  - WebRTC
    - Resolved Issues

  #### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2026-07-01+
- Support
- Withdrawn
  - Request for position: handle_links (Web App Manifest link handling)
    - https://github.com/WebKit/standards-positions/issues/693

  #### Other

  ### Edge 動向

  #### Stable: 151

  #### Updates

- https://blogs.windows.com/msedgedev/
- **New in Edge for developers - Style layout gaps, improve keyboard accessibility and migrate your PWA to a new origin - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2026/07/07/new-in-edge-for-developers-style-layout-gaps-improve-keyboard-accessibility-and-migrate-your-pwa-to-a-new-origin/
  - 「New in Edge for developers」シリーズが開始
  - Style layout gaps
  - Improve keyboard accessibility with focusgroup
  - Migrate your PWA to a new origin
  - And many other features
  - Ready for testing
  - Network Efficiency Guardrails: monitor and improve your site's load performance
  - `<install>`: install web apps with a single HTML element
  - CSS Grid Lanes: space efficient masonry layout
  - **New models and APIs for on-device AI**
  - News from across the web platform
  - Interop 2026 progress
  - Modern web guidance
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見れる
- https://twitter.com/MSEdgeDev
  - これを見るしか無い
- Rustifying Image Codecs in Chromium | Microsoft Browser Vulnerability Research
  - https://microsoftedge.github.io/edgevr/posts/Rustifying-Image-Codecs-in-Chromium/

  #### Other

- Add explainer: slotted options in customizable `<select>` (#1357) · MicrosoftEdge/MSEdgeExplainers@c270d8e
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/commit/c270d8e6744da984643ce02369e72599f2816da0
  - Web Components などで利用される CSE において、option に 要素を slot できるようにする提案

  ### WHATWG/W3C 動向

  #### Draft

- https://www.w3.org/news/
- Recommendation
  - Pointer Events Level 3
    - https://www.w3.org/news/2026/pointer-events-level-3-is-now-a-w3c-recommendation/
  - Proposed: Proposed Advancement of Web Authentication: An API for accessing Public Key Credentials Level 3 to W3C Recommendation
    - https://www.w3.org/news/2026/proposed-advancement-of-webauthn-3-to-w3c-recommendation/
- Candidate Recommendation
  - **W3C Invites Implementations of WebTransport**
    - https://www.w3.org/news/2026/w3c-invites-implementations-of-webtransport/
- Working Draft
- First Public Working Draft
  - Verifiable Credential Forgery Defense v1.0
    - https://www.w3.org/news/2026/first-public-working-draft-verifiable-credential-forgery-defense-v1-0/
  - SHACL 1.2 Profiling
    - https://www.w3.org/news/2026/first-public-working-draft-shacl-1-2-profiling/
  - CSS Linked Parameters Module Level 1
    - https://www.w3.org/news/2026/first-public-working-draft-css-linked-parameters-module-level-1/
    - 外部の SVG 画像などのリソースに対して、CSS から動的にパラメータを渡せるようにする
  - Strings on the Web: Language and Direction Metadata
    - https://www.w3.org/news/2026/first-public-working-draft-strings-on-the-web-language-and-direction-metadata/
    - JSON や WebIDL といったフォーマットで、言語設定や書字方向を設定するベストプラクティス
  - **Character Model for the World Wide Web: String Matching**
    - https://www.w3.org/news/2026/first-public-working-draft-character-model-for-the-world-wide-web-string-matching/
    - Web における文字列マッチングは、これまで仕様がバラバラに扱ってきており、相互運用性が弱くなっていた
    - 仕様策定者向けに一貫したマッチングアルゴリズム・正規化方法を提供する
    - 古くからあるドキュメントが FPWD
- Group Note Draft
  - Group Note Draft: What's New in RDF 1.2
    - https://www.w3.org/news/2026/group-note-draft-whats-new-in-rdf-1-2/
  - Group Note Draft: Linked Web Storage Vocabulary
    - https://www.w3.org/news/2026/group-note-draft-linked-web-storage-vocabulary/
  - **Group Note: WCAG Evaluation Methodology (WCAG-EM) 2.0**
    - https://www.w3.org/news/2026/group-note-wcag-evaluation-methodology-wcag-em-2-0/
    - WCAG Evaluation Methodology (WCAG-EM) 2.0 - Note Published
      - https://www.w3.org/WAI/news/2026-07-23/wcag-em-2/
    - WCAG2 への適合を評価する手順や手法をまとめたガイド
    - 「WCAG 準拠」みたいなものは、評価者ややり方によって適合結果や信憑性がバラバラになってしまうため
    - 評価範囲の定義、代表的なサンプルセットの選択、選択したサンプルセットの評価、評価結果の報告、など
  - Group Note Draft: Verifiable Credentials Overview v1.1
    - https://www.w3.org/news/2026/group-note-draft-verifiable-credentials-overview-v1-1/

  #### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- https://www.w3.org/YYYY/MM/DD-openui-minutes.html
- [2026-07-09](https://www.w3.org/YYYY/MM/DD-openui-minutes.html)
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2026-07-09.md
  - https://www.w3.org/2026/07/09-openui-minutes.html
- [2026-07-16](https://www.w3.org/YYYY/MM/DD-openui-minutes.html)
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2026-07-16.md
- [2026-07-23](https://www.w3.org/YYYY/MM/DD-openui-minutes.html)
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2026-07-23.md
- [2026-07-30](https://www.w3.org/YYYY/MM/DD-openui-minutes.html)
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2026-07-30.md
- [Overscroll Areas](https://www.w3.org/YYYY/MM/DD-openui-minutes.html)
  - https://github.com/openui/open-ui/issues/1457
  - [HTML か CSS のどちらか一方に寄せるのではなく、役割を分担する方向になった](https://www.w3.org/YYYY/MM/DD-openui-minutes.html)
  - [メールのスワイプ削除や Pull-to-Refresh は、サイドメニューと同じ API にまとめず、別のユースケースとして扱う方向](https://www.w3.org/YYYY/MM/DD-openui-minutes.html)
  - [サイドメニューはジェスチャー以外からも操作できるように必須のボタンを提供する方針](https://www.w3.org/YYYY/MM/DD-openui-minutes.html)
  - [コンテナ・領域・操作ボタンの関係は HTML の属性で宣言する](https://www.w3.org/YYYY/MM/DD-openui-minutes.html)
  - [`overlay`、`push`、配置などの表示方法は CSS で制御する](https://www.w3.org/YYYY/MM/DD-openui-minutes.html)
- [ページ内の主要領域をキーボードで移動する Focus Landmark](https://www.w3.org/YYYY/MM/DD-openui-minutes.html)
  - https://github.com/openui/open-ui/issues/1472
  - [ツールバーやサイドバー、本文などの間を移動するショートカットを宣言的な標準 API で実装可能にする](https://www.w3.org/YYYY/MM/DD-openui-minutes.html)
  - [Landmark を自動的に移動対象にするか、`focuslandmark` 属性による明示的な opt-in にするか](https://www.w3.org/YYYY/MM/DD-openui-minutes.html)
  - [iframe を移動順序に含める方法や、領域内のどこへフォーカスを置くか](https://www.w3.org/YYYY/MM/DD-openui-minutes.html)

  #### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
- **WHATNOT meeting notes - Google Docs**
  - https://docs.google.com/document/d/1D90QugzZZM6ga8k0ChMA7llmGFHcH9quDj4oCrgqtkE/edit?tab=t.0
  - 見つけた
  - 今回からこれを参照
- 2026-07-09
  - https://github.com/whatwg/html/issues/12619
  - Menu elements
    - https://github.com/whatwg/html/issues/11729
    - Radio / Checkbox 型の menu item をどう表現するか
    - `checkable` 属性 or `<menuitemcheckable>`
- 2026-07-16
  - https://github.com/whatwg/html/issues/12667
  - **Menu elements**
    - https://github.com/whatwg/html/issues/11729
    - Stage 2
    - 当初の IDREF と command で関連付ける方式から、HTML 要素をネストする方式へ変更
  - **HTML Streaming**
    - XSS 対策
    - Sanitize while parsing
      - https://github.com/whatwg/html/pull/12645
      - HTML をパース・挿入中に sanitize できるように
    - Integrate fragment parser options with trusted types
      - https://github.com/whatwg/html/pull/12583
      - HTML Streaming の Fragment parser と Trusted Types を統合
  - **Canvas Extended Text Metrics**
    - https://github.com/whatwg/html/issues/10677
    - Canvas 2D で文字列を TextCluster 単位に分割してテキストアニメーションや形状回り込みに対応する。Text Clusters はリガチャなども考慮するため
  - Navigation: Add optimization to ignore duplicate navigations
    - https://github.com/whatwg/html/pull/11765
    - 重複した Navigation を無視する最適化の話。ステージ上げるのに Second implementer まち
- 2026-07-23
  - https://github.com/whatwg/html/issues/12693
  - **`<input type="checkbox" switch>`**
    - https://github.com/whatwg/html/issues/4180
    - spec PR: https://github.com/whatwg/html/pull/9546
    - Stage 1
    - Safari Ship 済。Chrome (MS) が実装中。
    - スタイル方法やレンダリングの仕方がよく整理されていなかったため、Chrome は Ship に反対していた。
    - ところが、OpenUI との joint で蓋を開けてみたら、Customizable Forms の流れで switch のカスタマイズ方法が具体化できてきた
    - 実装は進んでいるが、HTML 側の仕様と CSS Forms 側の仕様を整えてから次の Stage に進める
    - スタイリングの opt-in を `appearance: base-switch` にするか、`appearance: base` にするかは CSSWG で議論
- **Resumable File Uploads**
  - https://github.com/whatwg/html/issues/12690
  - IETF の HTTP Resumable Upload を、HTML の form submission に統合して resumable にしようという Anne の提案
  - upload を中断・再開できるだけでなく、通常の `<form>` の一部として使えるかが焦点
  - Upload resource の URL が form action と別 origin になる可能性がある
  - HTTPS 制限、cross-origin checks、Fetch 仕様との連携などを詰める必要がある
- Customizable `<select>` の slotting
  - https://github.com/whatwg/html/issues/12717

  #### CSSWG

- https://www.w3.org/blog/CSS/
- https://lists.w3.org/Archives/Public/www-style/
- https://www.w3.org/YYYY/MM/DD-css-minutes.html
- 2026-07-01
  - https://www.w3.org/2026/07/01-css-minutes.html
- 2026-07-15
  - https://www.w3.org/2026/07/15-css-minutes.html
- 2026-07-22
  - https://www.w3.org/2026/07/22-css-minutes.html
- **[css-variables][css-mixins] In-place hygienic rewriting?**
  - https://github.com/w3c/csswg-drafts/issues/14004
  - `@mixin`や Custom Functions の内部だけでなく、通常の style rule 内でも使えるローカル変数が欲しい、という議論
  - `@locals` の提案
  - custom property と条件規則だけを含められる`@locals` block を置き、その周囲の rule からだけ参照できるようにする
  - イメージ
    - https://github.com/w3c/csswg-drafts/issues/14004#issuecomment-4929271688
- **[selectors] New class prefix selector to facilitate utility classes (`.prefix-*`?)**
  - https://github.com/w3c/csswg-drafts/issues/10001
  - Tailwind の `pt-*`、Bootstrap の utility class、Font Awesome の `fa-*` など、共通 prefix を持つ class token をまとめて選択したいという提案
  - `.prefix-*` のような class wildcard
  - `[class~^="prefix-"]` 相当の新しい attribute selector
  - class name に kv データを持たせる設計自体を CSS が後押ししてよいのか
  - wildcard を class だけに導入するのか、attribute 名や element 名などにも一般化するのか
- **[css-properties-values-api] Mass property registration by prefix**
  - https://github.com/w3c/csswg-drafts/issues/13212
  - descriptor が同じなのに、`@property`を繰り返す必要がある煩雑さに対しての提案
  - 2 つの方向が提案されている
    - comma-separated
    - prefix/namespace
  - CSS として prefix/wildcard primitive を導入するのか?
- 来月 F2F
  - Route matching
  - Mixin

  #### Other

- **css-shrink-to-fit/README.md at main · explainers-by-googlers/css-shrink-to-fit**
  - https://github.com/explainers-by-googlers/css-shrink-to-fit/blob/main/README.md
  - コンテナをテキストに合わせて伸縮する:`shrink-to-fit`
  - テキストをコンテナに合わせて伸縮する:`text-fit`
- **explainers-by-googlers/ua-image-replacement: Simple API for allowing authors to respond to browser features which edit images in the page**
  - https://github.com/explainers-by-googlers/ua-image-replacement
  - UA が AI の機能などを使って画像を置き換えた際、サイト側がその画像置換を検知できるようにするための API
- Improvements to how W3C Members manage employee participation in groups
  - https://www.w3.org/blog/2026/improvements-to-managing-group-participation/
  - 管理ページの改善
- CSS animations, human rights, and big accessibility at the AB Web Meetup
  - https://www.w3.org/blog/2026/css-animations-human-rights-and-big-accessibility-at-the-ab-web-meetup/
- Threat modeling age-based content restrictions: what we learned at EIC 2026
  - https://www.w3.org/blog/2026/threat-modeling-age-based-content-restrictions-what-we-learned-at-eic-2026/
- W3C Invites Implementations of EPUB 3.4, EPUB Reading Systems 3.4 and EPUB Accessibility 1.2
  - https://www.w3.org/news/2026/w3c-invites-implementations-of-epub-3-4-epub-reading-systems-3-4-and-epub-accessibility-1-2/
- PortableWeb Media Type Is Now Registered with IANA
  - https://www.w3.org/community/portableweb/2026/07/22/portableweb-media-type-is-now-registered-with-iana/
- **State of CSS 2026 Result**
  - https://2026.stateofcss.com/en-US
  - Anchor Positioning の実装が待たれる
  - `:has()` が Widely Available になったので使われ始めてる
  - みんな CSS 書くのに AI 使ってない
  - 過半数が CSS-in-JS を使っていないと回答。他の項目でも Vanilla CSS が上位

  ### TC39/TC55 動向

  #### Meeting

- なし

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
- 2026-06-26
  - https://github.com/WinterTC55/admin/pull/202
  - Andreu Botella (Igalia) の後任として、James Snell (Cloudflare) が議長グループに就任
  - コミュニティの関心は高いものの Deno 以外のランタイムの参加者が少ない。明確な作業ロードマップが欠如している
  - 今後は FS と Node.js 互換性について議論する
- 2026-07-10
  - https://github.com/WinterTC55/admin/pull/203
  - 会議の頻度を隔週から毎月最終金曜日に変更
  - Common Node.js Compat API を進める
  - Deno Deploy classic の非推奨化に伴い、WinterTC ウェブサイトのホスティング先を Cloudflare (James Snell 担当) へ移行

  #### Other

  ### IETF 動向

  #### IETF

- 来月

  #### WG

- RFC
- Work
- Meeting

  #### Other

- **NSA のバックドアに対する抵抗呼びかけ**
  - https://nsa.2026.action.cr.yp.to/
  - NSA が ietf-tls-ecdhe-mlkem に対抗した ietf-tls-mlkem へ組織票を入れているという告発
  - SIGINT Enabling Project によるもの
  - https://www.eff.org/files/2014/04/09/20130905-guard-sigint_enabling.pdf
  - NSA は一度投票で負けたが再投票を呼びかけた
  - バックドアの設置に対抗すべく実名での反対を呼びかけている
  - ブログで経緯を詳細にまとめている
  - https://blog.cr.yp.to/index.html

  ### 周辺動向

  #### ベンダー動向

- **2026 Web Engines Hackfest**
  - https://webengineshackfest.org/
  - That's a Wrap on the 2026 Web Engines Hackfest | Igalia
    - https://www.igalia.com/2026/webengineshackfest.html
  - agenda: Home · Igalia/webengineshackfest Wiki
    - https://github.com/Igalia/webengineshackfest/wiki
  - **Extended Canvas Text Metrics - moving it forward**
    - https://github.com/Igalia/webengineshackfest/wiki/2026-Extended-Canvas-Text-Metrics-%E2%80%90-moving-it-forward
    - `Intl.Segmenter` は文字列の分割を扱う。Text Metrics はフォントのリガチャ込みで分割を扱う。
    - 今 Text Clusters について話されているが、システム側でテキストの部分ごとにフォントを割り当てる機能があれば、もっと使いやすくなる
      - Phase 2 で `SegmentedText` として進める
    - HTML-in-Canvas ではパスに沿ってテキストを配置することが出来ないので、Canvas 側に新しい API を生やすモチベーションがある
      - SVG を使って出来なくはないが出来が悪いらしい
    - 数式のレンダリングは HTML-in-Canvas の MathML で解決するだろうが MathJax のようなライブラリで独自の数式レイアウトをしたいことがあり、詳細なメトリクスが必要となるかもしれない
  - **A new streams API?**
    - https://webengineshackfest.org/slides/a_new_streams_api_by_james_m_snell.pdf
    - https://www.youtube.com/watch?v=8V53ztTecn4
    - 3 月に JSnell が Cloudflare blog に書いて Domenic が Answer した話
    - https://blog.cloudflare.com/a-better-web-streams-api/
    - Stream の API は露出するインタフェースが多い
    - 140 Abstract operations. 60+ internal slots.
    - ブラウザではまだいいが、サーバ側ではパフォーマンスが出ない
    - 最適化しようとすると壊れる
    - Async Iterable を使ったシンプルなものにすれば最適化しやすくなるという提案
    - WinterTC で議論中
  - **Web Components Next Steps**
    - https://github.com/Igalia/webengineshackfest/wiki/2026-Web-Components-Next-Steps
    - OpaqueRange
      - textarea や input、CE でテキスト選択を検知したい
      - ShadowDOM を跨いだり、ネストされたコンポーネントにおけるテキスト選択の場合、コントローラクラスの設計はどうするか
      - WHATWG で議論。CE は将来拡張として議論し、textarea や input を進めていく
    - アクセシビリティ
      - ReferenceTarget v2
      - v1: CustomElement の host を参照したとき、その参照を内部の特定要素に転送
      - v1 の問題: 属性ごとに異なる内部要素へ転送できない。参照元の属性に応じて、適切な内部要素へ振り分ける仕組みが必要
      - 属性ごとの対応表を持つ referenceTargetMap という提案
      - WHATWG で議論
    - スタイル
      - Declarative CSS Modules Script: 宣言的にモジュール配布可能
      - `@sheet`: スタイルシートを１つにまとめる
      - 組み合わせて、１トランザクションで宣言的に複数のスタイルシートを使いまわせないか?
- Post-quantum authentication to origins is now supported | The Cloudflare Blog
  - https://blog.cloudflare.com/post-quantum-authentication-to-origins/
  - Cloudflare の Authenticated Origin Pulls と Custom Origin Trust Store がポスト量子認証をサポートするようになった。
  - Module-Lattice-Based Digital Signature Algorithm (ML-DSA)を用いたポスト量子認証が実装され、顧客のオリジンサーバーとの TLS 接続を保護する。
  - 量子コンピュータによる攻撃からの保護を目的として、ポスト量子暗号と認証の導入が進められている。
  - 2029 年までに完全なポスト量子セキュリティの実現を目指すロードマップが設定されている。
- Igalia WebKit Team | WebKit Igalia Periodical #70
  - https://blogs.igalia.com/webkit/blog/2026/wip-70/
- Igalia WebKit Team | WebKit Igalia Periodical #71
  - https://blogs.igalia.com/webkit/blog/2026/wip-71/
- This Month in Ladybird - June 2026 - Ladybird
  - https://ladybird.org/newsletter/2026-06-30/
- The Unicode Blog: Recent Unicode Happenings: June 2026
  - https://blog.unicode.org/2026/07/recent-unicode-happenings-june-2026.html
- The Unicode Blog: Why do some new emoji look familiar?
  - https://blog.unicode.org/2026/07/why-do-some-new-emoji-look-familiar.html
- A New Browser Vision?
  - https://bkardell.com/blog/NewBrowserVision.html

  #### セキュリティ動向

- **SourTrade: Browser-Assembled Malware Delivered Through Malvertising**
  - https://blog.confiant.com/p/sourtrade-browser-assembled-malware
  - ネットワーク経由でマルウェア完成品を送らず、ブラウザのメモリ上で Bun と悪意あるバイトコードを合体させて生成する。
  - 組み立てたバイトコードを Same-Origin の ServiceWorker 経由でダウンロードさせることで、Windows のゾーン識別子に C2 ではなく偽サイトのドメインを記録させフォレンジックを妨害する。

  #### Other

- **OpenAI のブラウザ「ChatGPT Atlas」終了へ 公開から 1 年足らずで**
  - https://www.itmedia.co.jp/news/article/2607/13/1260713090/

  ### イベント

- 8 月
  - CSSWG F2F
- 9 月
  - 12: フロントエンドカンファレンス福岡
    - [https://frontend-conf.fukuoka.jp/2026/](https://frontend-conf.fukuoka.jp/2026/?hl=ja)
  - 29-01: TC39 Tokyo
    - https://github.com/tc39/agendas
- 10 月
  - 12: フロントエンドカンファレンス関西
    - https://2026.frontend-conf.osaka.jp/
  - 26-30: TPAC 2026 @Ireland
    - https://www.w3.org/news-events/tpac/2026/

  ### Wrap Up

- Chrome
  - 151
    - `<usermedia>`
    - Stream text with `textStream()`
    - `aria-actions` attribute
  - Ship
    - 同一ナビゲーションが迅速に開始された場合に、進行中のナビゲーションが不必要にキャンセルされるのを防ぐ
    - scroll-marker-group に `links` と `tabs` を追加
    - HTML の動的更新メソッド統一化
    - Geolocation API で近似位置データ (2km 以上)
  - Prototype
    - DOM を Rect だけでなく Quads で形状取得
    - Device Bound Session Credentials の JS API
    - ブラウザが Ambient UI を出してサインインする
    - `<input type="checkbox" switch>`
    - Background work API
    - CSS mixin
    - コンテンツの最大行長に合わせてコンテナの幅を縮小する `shrink-to-fit`
    - HTML フラグメントを宣言的に定義する
    - 斜め方向へのスクロールを許可する `scroll-axis-lock`
  - Experiment
  - Deprecate and Remove
  - PSA
  - other intents
    - Chrome Status に MDN や MWG と連携する Adoption の項目が追加
  - web.dev
    - Baseline Status を Lighthouse で一覧できる
  - Google Developer Blog
    - Email Verification Protocol の Origin Trials
  - Chrome Developers
  - Chromium blog
  - other blogs
  - other
    - セルフィーで Google ログイン
    - 「インターネットの父」ヴィント・サーフ氏、Google を退任
- Firefox
  - 153
    - Intl Locale Info
    - import source
    - Picture-in-Picture on desktop
    - タブ単位でアカウント切り替え
    - デザイン刷新プロジェクト Nova が nightly に
  - Ship
    - `text-box-trim` / `text-box-edge`
    - Advanced `attr()`
    - `Promise.allKeyed`
  - Prototype
    - `margin-trim`
    - calc で次元計算
  - other intents
    - 2026/09 から 2week release に変更
  - MDN Blog
  - Standard Position
    - anchor positioning with transforms
  - other
    - State of Open Source AI
- Safari
  - TP 247
    - Added support for `calc-mix()`.
    - Safari MCP Server
  - Safari 26.6
  - TP 248
    - `BigInt.pow` and `BigInt.sqrt`.
  - TP 249
    - `attr()`
    - `@function`
    - `if()`
    - Temporal object
  - Standard Position
  - other
- Edge
  - New in Edge for developers
- W3C/WHATWG
  - Draft
    - 文字列マッチングの仕様が Working Draft
    - WCAG Evaluation Methodology (WCAG-EM) 2.0
  - Open UI
    - Overscroll Areas
    - Focus Landmark
  - WHATNOT meeting
    - Menu elements
    - HTML Streaming の XSS 対策
    - switch 属性
    - Resumable File Uploads
  - CSSWG
    - `@locals`
    - `.prefix-*`
    - `@property` を comma-separated や prefix/namespace で指定できるように
  - Other
    - css-shrink-to-fit explainer
    - ua-image-replacement explainer
    - State of CSS 2026 Result
- TC39
  - WinterTC
    - James Snell が議長に就任
    - 隔週実施から月一実施に変更
- IETF
  - NSA のバックドアに
- 周辺動向
  - ベンダー動向
    - webengineshackfest の振り返り
      - Canvas Text Metrics
      - Stream API
      - Web Components Next Steps
  - セキュリティ動向
    - Service Worker 経由でマルウェアを部分的に送る攻撃
  - Other
    - ChatGPT Atlas 終了
