---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep184.mp3
published_at: 2025-09-02
guest: [@myakura](https://github.com/myakura)
guest: [@saku](https://x.com/sakupi01)
---

# ep184 Monthly Platform 202508

## Theme

第 184 回のテーマは 2025 年 8 月の Monthly Platform です。


## Show Note

### Chrome 動向

#### Stable: 140


#### Updates

- New in Chrome 139
  - https://developer.chrome.com/blog/new-in-chrome-139
  - On-device Web Speech API
  - CSS corner shaping
  - CSS custom functions
- What's New in WebGPU (Chrome 139)
  - https://developer.chrome.com/blog/new-in-webgpu-139
- Chrome 140 beta
  - https://developer.chrome.com/blog/chrome-140-beta
  - CSS and UI
    - CSS typed arithmetic
    - The scroll-target-group property
    - Enable `counter()` and `counters()` in the content property's alt text
    - View transition pseudos inherit more animation properties
    - **Enable nested view transitions**
    - Propagate viewport overscroll-behavior from root
    - ScrollIntoView container option
    - Add the CSS `caret-animation` property
    - The `highlightsFromPoint` API
    - Change View Transition finished promise timing
    - Add the ToggleEvent source attribute
    - Prevent SVG foreignObject from tainting the canvas for blob URLs
    - Support the font-variation-settings descriptor in @font-face rule
  - Web APIs
    - **Convert Uint8Array to and from base64 and hex**
    - Use the ReadableStreamBYOBReader min option
    - **Http cookie prefix**
    - Local network access restrictions
    - Enable SharedWorker scripts to inherit controller for blob script URLs
    - Add ServiceWorkerStaticRouterTimingInfo
    - Enable Web Authentication conditional create on Android (not shipping)
  - Isolated Web Apps
    - Introduce the Controlled Frame API
  - New origin trials
    - Add the clipboardchange event
    - Enable incoming call notifications
    - **Introduce the Crash Reporting key-value API**
  - Deprecations and removals
    - **Deprecate special font size rules for `<h1>` within some elements**
    - Contribute
    - Related content
    - Follow
- **What's New in Web UI: I/O 2025 Recap**
  - https://developer.chrome.com/blog/new-in-web-ui-io-2025-recap


#### Intents

- **Ship: FedCM: Alternative Fields in Account Selection**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TwBCFixr72k
  - FedCM は、ユーザーのフルネームやメールアドレスに代わって、電話番号やユーザー名をアカウント識別子としてサポートする機能を追加した。
  - この新機能は、ウェブサイトが開示文を調整するために利用可能な新しいフィールドを提供する。
  - 現在、FedCM は Chrome のみで実装されており、互換性リスクはなく、セキュリティリスクも存在しない。
- **Ship: Probabilistic Reveal Tokens**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KHbfwJpF4Zg
  - プロバビリスティックリビールトークン(PRTs)は、企業がシステム上の詐欺を推定し、防御モデルを訓練し、新たな詐欺行動を分析するための遅延 IP サンプリングメカニズムであり、IP アドレスによるユーザー追跡を軽減することを目的としている。
  - Chrome は、今年後半にプライベートモードで IP 保護を導入し、PRTs はプロキシ要求に新しい HTTP ヘッダーとして含まれ、開発者は特定のプロセスを通じて受け取ることができる。
  - 各 PRT は暗号化されたテキストを含み、発行者によって生成され、ブラウザによって再ランダム化され、遅延後に受信者が復号できる仕組みであり、少数の PRT がクライアントの元の IP アドレスを明らかにする。
- **Ship: Range syntax for style container queries and if()**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KFIjx7Xwxik
  - MQ や Container Size Query などでサイズのみに Range Syntax の用途は限定的に存在した
  - 今回の Style Query への適用で、数値を持つあらゆる value で Range Syntax を使える道が開ける
  - e.g. `if(style(attr(data-columns, type<number>) > 2)`
  - MediaQuery の Range Syntax も来月 Widely Available に
- Ship: Update hidden=until-found and details ancestor revealing algorithm
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SeRScSVsUXY
- **Ship: Digital Credentials API I (presentation support)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cPLAQLj8nV0
  - デジタルクレデンシャル API は、ウェブサイトが Android の IdentityCredential CredMan システムを通じてモバイルウォレットアプリからの身分情報を要求することを可能にする。
  - この API は、ISO mDoc や W3C の検証可能クレデンシャルなど、複数のクレデンシャルフォーマットをサポートし、複数のウォレットアプリを利用可能とする。
  - プライバシー対策やセキュリティリスクに関する懸念があり、Mozilla などとの協力を通じて、エコシステム全体の悪用リスクを軽減するためのメカニズムが追加される予定である。
- Ship: Navigation API: deferred commit (precommit handlers)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rFC6UbHSeGs
- Ship: Permissions Policy for Device Attributes API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BkBh748H-rE
- Ship: Signature-based Integrity
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/R6isgRnE1j4
- Ship: WebGPU: 'primitive_index' feature
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2pCbH1JQLIo
- Ship: WebRTC Encoded Transform (V2)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QeosFeu-d8A
- Ship: echoCancellationMode for getUserMedia()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/x5nfoaUAUWY
- Ship: windowAudio for getDisplayMedia()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/66dDyQoX3RI
- Ship: Support width and height as presentation attributes on nested `<svg>` elements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/X_33IoHzOkM
- Ship: Deprecate getters of Intl Locale Info
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fwnEjShxvmo
- Ship: Sticky user activation across same-origin navigations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0vW4BkK99XI
  - bfcache が効かない場合の MPA ページ遷移でも、同一オリジン内であればアクティベーションを保持
- Ship: Modulepreload Referrer Header Fix
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kxd9IUxAKSs
- Prototype and Ship: activeViewTransition property on document
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ET1U6rt1Ihc
- Prototype and Ship: activeViewTransition property on document
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ET1U6rt1Ihc
- Prototype: CSS Text Level 3 text-transform: full-width
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cNv-cKRdRxY
- **Prototype: Customizable select multiple and listbox**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/U-K17B966Ys
- **Prototype: Declarative route matching**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_iaN7v4D1vM
  - 「ルート」は URL パターンであり、開発者はこれに名前を付け、CSS や JavaScript を用いて直接マッチングできるようにすることが提案されている。
  - 現在、URL の変更に関する操作はスクリプトに依存しており、このプロトタイプはウェブプラットフォームへのルーティングの導入が価値を提供するかどうかを探求している。
  - 提案はまだ初期段階であり、リスクや互換性に関する信号は確認されていない。
- Prototype: FileAPI: Blob.bytes()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/klTrgVxlYYA
- **Prototype: Selective Permissions Intervention**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FiCMnaPwb4M
  - ウェブプラットフォーム介入により、ユーザーの意図に基づく API の権限を調整し、広告スクリプトがプライバシーに敏感な API にアクセスするのを防ぐことを目的としている。
  - ユーザーがウェブサイトに強力な API(位置情報、マイク、カメラなど)へのアクセスを許可する際、その同意はサイトに対してであり、ページ上のサードパーティスクリプトに対してではないことを強調。
  - この介入は、ユーザーのデータに対する信頼と制御を強化し、広告がユーザーの情報にアクセスすることに対する認識を高めることを目指している。
- Prototype: Support slotting option elements in select elements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/T-irOeif4L4
- Prototype: WebAudio: Configurable render quantum
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/n4PifuLlrwc
- **Prototype: Function Calling capability in Prompt API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/i0rxY1MIg6U
  - プロンプト API に「Function Calling」機能を追加する提案があり、これにより開発者は言語モデルがプロンプトを処理する際に追加の能力を定義し、アクションをトリガーしたり、タスクを完了するための情報を取得できるようになる。
  - この機能により、開発者はオンデバイスモデルが使用できるツールを定義でき、ユーザーは自然言語での要求をより直接的に表現できるようになるなど、AI を活用した豊かなウェブ体験が実現される。
  - プロンプト API の Function Calling は、Script Tools API とは異なり、ウェブページが AI とのインタラクションを制御する「内向き」機能であり、開発者が自サイトの機能を強化するために使用される。
- Prototype: Multicast Support for Direct Sockets API.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ADV4FZtN4nE
- **Prototype: The `'revert-rule'` Keyword**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SCzoDed3iZ8
  - カスケードを前のルールまでフォールバック
- Prototype: FedCM IdP Registration API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/laVjxqPaOkk
- **Prototype: Delayed Messages Timing API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ldl7_a5HAa8
  - postMessage API の遅延が体験を損なう
  - ビジースレッドやメッセージキューなどの情報が取れない
  - Delayed Messages API は E2E のデバッグ用タイミングメトリクスを提供する。
- Prototype: Extend the DownloadURL drag type to support multiple files
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fhcLlMcy1r0
- Prototype: HTMLElement: accessKeyLabel
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uzx6kTcS3hY
- Prototype: Selective Clipboard Format Read
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CWw41HOpmy8
- Prototype: Multicast Support for Direct Sockets API.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ADV4FZtN4nE
- Prototype: FedCM IdP Registration API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/laVjxqPaOkk
- Experiment: Crash Reporting key-value API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fujoqyfUhrc
- Experiment: WebAssembly Custom Descriptors
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_uPKlWwz_Lw
- Experiment: Device Bound Session Credentials
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WzbDt-roawg
- Extend Experiment: SoftNavigation performance entry
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lQIWTwQGFBo
- Remove: SwiftShader Fallback
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yhFguWS_3pM
- Deprecate: Deprecate unload event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dvusqw9-IhI
- Ready for Developer Testing: Permissions Policy for Device Attributes API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/O0sTtPbIJzY
- **Ready for Developer Testing: Scoped view transitions**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kafnCyjDMrw
  - document 直下ではなく、任意の HTMLElement の範囲に `::view-transition` を限定できる
  - View Transition の間、ページ全体が inert にならない(inert になる範囲を限定できる)
  - 親要素の clip や transform, animation を考慮して VT が実行できる
  - z-index を考慮して View Transition が実行できるので、ドロップダウンなどの View Transition 領域をオーバーレイする UI に影響を与えない
  - 複数の View Transition を並行して実行できる
- Web-Facing Change PSA: Speculation rules: desktop "eager" eagerness improvements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ShwbX_19SP0
- Web-Facing Change PSA: Faster background freezing on Android
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NXZ_aTNzR2w


#### Other

- web.dev
  - https://web.dev/
  - **Baseline for CSS properties now in Chrome DevTools**
    - https://web.dev/blog/baseline-devtools-css
  - **Happy 20th birthday MDN!**
    - https://web.dev/blog/mdn-birthday
  - July 2025 Baseline monthly digest
    - https://web.dev/blog/baseline-digest-jul-2025
  - New to the web platform in July
    - https://web.dev/blog/web-platform-07-2025
  - **Take the State of HTML survey today**
    - https://web.dev/blog/state-of-html-2025
  - **What's my Baseline?**
    - https://web.dev/blog/whats-my-baseline
    - プロジェクトに合った「My Baseline Target Year」を調べてみてねキャンペーン
    - #WhatsMyBaseline
  - New to the web platform in August
    - https://web.dev/blog/web-platform-08-2025
- google for developers
  - https://developers.googleblog.com/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - https://developer.chrome.com/blog/
  - Extended lifetime shared workers origin trial
    - https://developer.chrome.com/blog/extended-lifetime-shared-workers-origin-trial
  - **New Soft Navigations origin trial**
    - https://developer.chrome.com/blog/new-soft-navigations-origin-trial
  - Use Chrome DevTools Performance panel to profile Angular apps
    - https://developer.chrome.com/blog/perf-panel-profile-angular
  - Native UI Automation for Windows in Chromium
    - https://developer.chrome.com/blog/windows-uia-support-update
  - Origin trial: WebAuthn immediate mediation for frictionless sign-in
    - https://developer.chrome.com/blog/webauthn-immediate-mediation-ot
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
- search blog
  - https://developers.google.com/search/
- v8
  - **How we made JSON.stringify more than twice as fast · V8**
    - https://v8.dev/blog/json-stringify
    - V8 における`JSON.stringify`の最適化により、シリアライズ処理が 2 倍以上速くなり、ウェブアプリケーションの応答性が向上した。
    - 新たに導入された「ファストパス」により、副作用のないオブジェクトのシリアライズが可能となり、メモリ管理の効率化や、文字列のエスケープ処理の高速化が実現された。
    - この最適化は、V8 のバージョン 13.8 以降(Chrome 138)で利用可能であり、API レスポンスや設定オブジェクトのシリアライズにおいて自動的にパフォーマンス向上の恩恵を受けられる。
- other
  - Project Zero: From Chrome renderer code exec to kernel with MSG_OOB
    - https://googleprojectzero.blogspot.com/2025/08/from-chrome-renderer-code-exec-to-kernel.html
  - **Designing the Built-in AI Web APIs | Domenic Denicola**
    - https://domenic.me/builtin-ai-api-design/
    - Chrome の内蔵 AI チームは、ウェブブラウザ向けにさまざまな AI モデルを提供する API の設計に取り組んでおり、他のブラウザにも採用されることを目指している。
    - 言語モデルに特化した「プロンプト API」の設計では、メッセージの役割や形式、マルチモーダル入力の取り扱いなど、複雑な要素が考慮されている。
    - API はクライアントサイドでの使用を前提とし、状態管理を重視した設計がなされており、将来的な互換性や相互運用性を確保するための工夫が求められている。


## Firefox 動向

### Stable: 142


### Updates

- Firefox 142.0, See All New Features, Updates and Fixes
  - https://www.firefox.com/en-US/firefox/142.0/releasenotes/
- Firefox 142 for developers - Mozilla | MDN
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/142
  - URLPattern
  - `scheduler.yield()`
- **Jake Archibald: "Yay! It's the first Firefox re…" - Mastodon**
  - https://mastodon.social/@jaffathecake/115071814028438892
  - Firefox 142 の開発者向け機能について Jake Archibald が縦型動画で紹介
- **Custom Profile Avatars Arrive in Nightly - These Weeks in Firefox: Issue 186 - Firefox Nightly News**
  - https://blog.nightly.mozilla.org/2025/08/04/custom-profile-avatars-arrive-in-nightly-these-weeks-in-firefox-issue-186/
  - アドレスバーのシールドアイコンと鍵アイコンが統合
  - Perplexity 検索エンジン追加も実装中


### Intents

- **Ship: CSS View Transitions L1**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/JuDlPRWOFWY
- **Ship: Command and CommandFor attributes**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ck7taWZO2cs
- **Ship: upsert proposal**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/A1rzoW7LHm0
  - Map/WeakMap の `getOrInsert()`, `getOrInsertComputed()`
- Ship: web apps in Firefox for Windows
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/zCyXEVgXJwc
- Ship: Windows UI Automation
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/qljNUMTNtyA
- **Prototype and Ship: improvements to styling, including support for `::details-content` pseudo element**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/O_pX2nEyCFU
- **Prototype: CSS text-autospace property**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/3Gk5csjxi1s
  - `text-autospace` の実装開始
- **Prototype: CSS Module Scripts**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/DIDp376HgVc
- Prototype : Matroska playback support
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/0ib0_yqiBmk
  - メディアコンテナ Matroska (MKV) のサポート
- Unship: element.style.MozAppearance
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/T3Ta628jvuQ/m/zdVtLePKCgAJ


### Newsletter

- Firefox WebDriver Newsletter 142 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-142/


### MDN / Open Web Docs

- Pixel data from encoders to decoders
  - https://developer.mozilla.org/en-US/blog/image-formats-pixels-graphics/
- **Launching MDN's new front end**
  - https://developer.mozilla.org/en-US/blog/launching-new-front-end/
  - MDN のフロントエンドが刷新
  - Lit ベース
  - https://github.com/mdn/fred


### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2025-08-01+
- Positive
  - **Requesting Mozilla's position on removal of XSLT from HTML living standard**
    - https://github.com/mozilla/standards-positions/issues/1287
  - Selective Clipboard Format Read
    - https://github.com/mozilla/standards-positions/issues/1279
  - CONNECT-UDP
    - https://github.com/mozilla/standards-positions/issues/1272
  - `__Http-` and `__Host-Http-` cookie prefixes
    - https://github.com/mozilla/standards-positions/issues/1256
      - 実装済み
  - Add `is_top_level` and `visibility_state` fields to crash report bodies
    - https://github.com/mozilla/standards-positions/issues/1225
  - CSS Values and Units: sibling-count() and sibling-index()
    - https://github.com/mozilla/standards-positions/issues/1194
  - `Integrity-Policy` header for scripts
    - https://github.com/mozilla/standards-positions/issues/1173
  - Document Picture in Picture API
    - https://github.com/mozilla/standards-positions/issues/670
- Neutral
  - Request for Mozilla Position on Modern Algorithms in WebCrypto
    - https://github.com/mozilla/standards-positions/issues/1282
  - [SVG 2.0] Allow `use` to reference entire files
    - https://github.com/mozilla/standards-positions/issues/1204


### Other

- **1977365 - (jp-text) [meta] layout/rendering improvements for Japanese text**
  - https://bugzilla.mozilla.org/show_bug.cgi?id=1977365
  - 日本語関連のレイアウトをよくするプロジェクト
    - `text-autospace` の実装が始まった
- Firefox just got better for Chinese, Japanese and Korean speakers on Android
  - https://blog.mozilla.org/en/firefox/cjk-translation-on-android/
  - Firefox に入った CJK 翻訳のモデルについて
  - 公開されているデータでモデルのトレーニングを行ったが、CJK で使える良いデータはなかなかなかった
- Introducing the Firefox Extension Developer Awards Program - Mozilla Add-ons Community Blog
  - https://blog.mozilla.org/addons/2025/08/15/introducing-the-firefox-extension-developer-awards-program/
- Speeding up Firefox Local AI Runtime
  - https://blog.mozilla.org/en/firefox/firefox-ai/speeding-up-firefox-local-ai-runtime/
- Fast, private and secure (pick three): Introducing CRLite in Firefox
  - https://blog.mozilla.org/en/firefox/crlite/
- **CRLite: Fast, private, and comprehensive certificate revocation checking in Firefox - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2025/08/crlite-fast-private-and-comprehensive-certificate-revocation-checking-in-firefox/
- Jake Archibald: "Starting my new role on Monday…" - Mastodon
  - https://mastodon.social/@jaffathecake/114947963365880322
  - Jake Archibald が Mozilla に


## Safari 動向

### Stable: 18.6


### Updates

- Release Notes for Safari Technology Preview 225 | WebKit
  - https://webkit.org/blog/17216/release-notes-for-safari-technology-preview-225/
  - Accessibility
  - CSS
  - HTML
    - **Added support for auto-expanding `<details>` element. (297083@main) (155256522)**
    - **Added support for `hidden=until-found`. (297084@main) (155256718)**
  - JavaScript
  - Rendering
  - WebDriver
  - WebRTC
- Release Notes for Safari Technology Preview 226 | WebKit
  - https://webkit.org/blog/17282/release-notes-for-safari-technology-preview-226/
  - CSS
    - Added support for @scope(:host).
    - **Added support for CSS tree-counting functions.**
    - Added support for cross-origin() and referrer-policy() CSS URL modifiers.
  - Canvas
    - Removed non-standard legacy drawImageFromRect.
  - JavaScript
    - **Added support for Math.sumPrecise.**
    - Added WebIDL support for [Enumerated] extended attribute and related attributes.
  - Media
  - Rendering
    - Removed UA styles for `h1` in `article`, `aside`, `nav`, and `section`. (297671@main) (151455566)
  - SVG
  - Storage
  - Web API
    - Added support for document.caretPositionFromPoint().
    - **Added preview support for the Navigation API.**
  - Web Extensions
  - Web Inspector
- **Item Flow - Part 2: next steps for Masonry | WebKit**
  - https://webkit.org/blog/17219/item-flow-part-2-next-steps-for-masonry/
  - CSS の新しいアイデア「Item Flow」は、Flexbox と Grid のレイアウトを統一するための新しいプロパティを提案しており、将来的にはこれにより特定のプロパティを置き換えることが可能になる。
  - Masonry スタイルのレイアウトにおいて、CSS 作業グループはグリッドテンプレートと配置プロパティを再利用することを採用したが、レイアウトを切り替える方法と「行」と「列」の定義については依然として議論が続いている。
  - WebKit は Masonry スタイルのレイアウトを Grid の一種として捉え、既存の CSS Grid の文法を利用して Item Flow を実装することが最も直感的で簡単であると考えている。
  - どう Masonry モードにスイッチするか
    - 独立した display として扱う(`display: masonry;`)
    - Grid の亜種として扱う(`display: grid;` `item-flow: collapse;`)
  - どう Masonry をコントロールするか
- **A gentle introduction to anchor positioning | WebKit**
  - https://webkit.org/blog/17240/a-gentle-introduction-to-anchor-positioning/
  - アンカーポジショニングは、他の要素に基づいてページ上の要素を配置する手法であり、CSS のみでレスポンシブなメニューやツールチップを簡単に作成できる。
  - メニューの位置は、アンカー要素(例:アバター)を基準にして決定し、position-area や anchor()関数を使用して柔軟に配置を調整できる。
  - モバイル環境では、スペースが不足した際に自動的に別の位置に移動する機能(position-try)を利用することで、ユーザー体験を向上させることが可能である。
- **Rolling the Dice with CSS `random()` | WebKit**
  - https://webkit.org/blog/17285/rolling-the-dice-with-css-random/
  - CSS に新たに追加される `random()` 関数は、ランダムな数値を生成し、アニメーションの遅延やレイアウト、カラーなどを JavaScript なしで実現できる。
  - `random()` 関数は、最小値、最大値、ステップの 3 つの引数を持ち、さまざまな数値タイプ(整数、パーセンテージ、長さ、角度など)に対応している。
  - この機能は、Safari Technology Preview で試すことができ、開発者からのフィードバックを求めている。


### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2025-08-01+
- Support
  - css-view-transitions-2: adding document.activeViewTransition
    - https://github.com/WebKit/standards-positions/issues/536
  - Add IndexedDB getAllRecords() method and update getAll()/getAllKeys() to support direction option
    - https://github.com/WebKit/standards-positions/issues/521
  - `__Host-Http-` and `__Http-` cookie name prefixes
    - https://github.com/WebKit/standards-positions/issues/518
  - Navigation API: deferred commit
    - https://github.com/WebKit/standards-positions/issues/449
  - Skip service worker no-op fetch handler
    - https://github.com/WebKit/standards-positions/issues/129
  - **Cookie Store API**
    - https://github.com/WebKit/standards-positions/issues/36
    - Spec は WHATWG に移行した


### Other


## Edge 動向

### Stable:


### Updates

- https://blogs.windows.com/msedgedev/
  - ここがメイン
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見れる
- https://twitter.com/MSEdgeDev
  - これを見るしか無い


### Other


## WHATWG/W3C 動向

### Draft

- https://www.w3.org/news/
- Recommendation
- Candidate Recommendation
  - **W3C invites implementations of Incremental Font Transfer**
    - https://www.w3.org/news/2025/w3c-invites-implementations-of-incremental-font-transfer/
  - W3C Invites Implementations of Accessibility Conformance Testing (ACT) Rules Format 1.1
    - https://www.w3.org/news/2025/w3c-invites-implementations-of-accessibility-conformance-testing-act-rules-format-1-1/
- Working Draft
- First Public Working Draft
  - First Public Working Draft: Device Bound Session Credentials
    - https://www.w3.org/news/2025/first-public-working-draft-device-bound-session-credentials/
  - First Public Working Draft: A Well-Known URL for Relying Party Passkey Endpoints
    - https://www.w3.org/news/2025/first-public-working-draft-a-well-known-url-for-relying-party-passkey-endpoints/


### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
  - 2025-08-07
    - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-08-07.md
    - minutes
      - https://www.w3.org/2025/08/07-openui-minutes.html
    - Alternative HTML-only version of the `::interest-hint` feature, via command invokers
    - タッチデバイスでの"hover(interest)"に関して、コンテキストメニューに、interest 要素トリガ専用の「View more info」などの項目を追加することになっている
    - 「それでは interest 要素にリーチするステップが多すぎる」というケースに対応するため、タップして発火する擬似要素で interest を示せるようにするのはどうか?-> `::interest-hint`
  - 2025-08-14
    - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-08-14.md
    - minutes
      - https://www.w3.org/2025/08/14-openui-minutes.html
  - 2025-08-21
    - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-08-21.md


### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
- **Should we remove XSLT from the web platform? · Issue #11523 · whatwg/html**
  - https://github.com/whatwg/html/issues/11523
  - XSLT を Web から削除するか?という議論に対して、最終的に個人攻撃が始まったため、議論がロックされる事態に
  - ベンダ側(Apple/Mozilla/Google が一致して削除に関心を示している)の主張は、メンテナンスの負担に対する懸念
  - ただ、出版業界などで根強く使っている人もいるため、反発が絶えなかった
  - Remove mentions of XSLT from the html spec by mfreed7 · Pull Request #11563 · whatwg/html
    - https://github.com/whatwg/html/pull/11563
  - Should the web platform adopt XSLT 3.0? · Issue #11578 · whatwg/html
    - https://github.com/whatwg/html/issues/11578
  - No, Google Did Not Unilaterally Decide to Kill XSLT - Eric's Archived Thoughts
    - https://meyerweb.com/eric/thoughts/2025/08/22/no-google-did-not-unilaterally-decide-to-kill-xslt/
  - RIP XSLT? | Igalia
    - https://www.igalia.com/chats/xslt-liam
  - Requesting Mozilla's position on removal of XSLT from HTML living standard · Issue #1287 · mozilla/standards-positions
  - https://github.com/mozilla/standards-positions/issues/1287
- Jake Archibald が WHATNOT にレギュラー参加
  - https://github.com/whatwg/html/issues/11527#issuecomment-3159764087


### CSSWG

- https://www.w3.org/blog/CSS/
- https://lists.w3.org/Archives/Public/www-style/
- How to handle addEventListener on `CSSPseudoElement`? · Issue #12163 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/12163#issuecomment-3108997256
  - カルーセルの `::scroll-marker` などで、擬似要素にイベントリスナを登録したいニーズが増えてきた
  - EventTarget を拡張する形で、擬似要素にもイベントリスナをつけれるようにする議論が進行中
- **[css-grid-3] Masonry Switch Syntax · Issue #12022 · w3c/csswg-drafts**
  - https://github.com/w3c/csswg-drafts/issues/12022#issuecomment-3200131437
  - Masonry レイアウトへのスイッチは新しい `display` プロパティの値で行うことに
  - 名前はこれから。`grid-stack` とか `grid-collapsed` などが提案されている
- [css-conditional] `@supports-condition`, for larger feature queries and named reuse · Issue #12622 · w3c/csswg-drafts
  - https://github.com/w3c/csswg-drafts/issues/12622
  - 特定の CSS 構文をサポートしてるかに名前をつける `@supports-condition` の提案
  - `@supports` は最初プロパティだけで、後にセレクターや@ルールなども対象とするように拡張された。それでもすべての構文に対応できるわけではない
  - すでに `CSS` パーザーがあるので、`@supports-condition` ブロック内に書いたものに名前をつけて参照可能にすればいいのではというアイデア


### Other

- **Vision for W3C**
  - https://www.w3.org/TR/2025/STMT-w3c-vision-20250729/
  - Vision for W3C: a manifesto for our operations and decision making
    - https://www.w3.org/blog/2025/vision-for-w3c-a-manifesto-for-our-operations-and-decision-making/
- **W3C updates its Process Document**
  - https://www.w3.org/news/2025/w3c-updates-its-process-document/
  - https://www.w3.org/policies/process/20250818/
  - Proposed Recommendation が削除された
  - Advisory Committee が Candidate Recommendation をレビューする形に
- WCAG 2.2 テクニック集 一部公開のお知らせ | ウェブアクセシビリティ基盤委員会(WAIC)
  - https://waic.jp/news/20250819/
- **サイボウズ、W3C (World Wide Web Consortium) のメンバーに加入 | サイボウズ株式会社**
  - https://topics.cybozu.co.jp/news/2025/07/25-19153.html
- **なぜサイボウズは W3C のメンバーに加入したのか?その真意を聞いてみた - Cybozu Inside Out | サイボウズエンジニアのブログ**
  - https://blog.cybozu.io/entry/joining-w3c
- **26 awardees in W3C's TPAC Inclusion and Invited Expert Support funds | 2025 | Blog | W3C**
  - https://www.w3.org/blog/2025/26-awardees-in-w3cs-tpac-inclusion-and-invited-expert-support-funds/
  - TPAC の Inclusion/Invited Expert support fund で TPAC 2025 に 26 名が参加
  - > We received 67 applications. 26 matched the eligibility criteria, passed our screening, and were approved by our selection committee.
  - > 12 from Europe (6 economies), 10 from North America (2 from Canada and 8 from the United States) and 4 from Asia Pacific.
  - > 19 experts are independent, while the other 7 are employed by W3C members but were not able to secure funding support from their employer.
- Cookie Store API Standard
  - https://cookiestore.spec.whatwg.org/
  - WICG から Cookie Store API の仕様が移管
- Incubation: An `Origin` Object · Issue #1130 · w3ctag/design-reviews
  - https://github.com/w3ctag/design-reviews/issues/1130
  - https://github.com/mikewest/origin-api/
  - `Origin` オブジェクトの提案


## TC39 動向

### Meeting

- 2025-07
  - https://github.com/tc39/agendas/blob/main/2025/07.md
  - https://github.com/tc39/notes/pull/379
  - https://docs.google.com/document/d/1qXUf4QRTbexUj0fg2sgYTxWwOT2v_q7lmjR282BOWLU/
  - Upesrt
    - Stage 3
  - Error.captureStackTrace
    - アクセサにするかデータプロパティにするか未定
  - Amount
    - 数値と単位をまとめる Measure を Amount に
    - Stage 2
  - Import Buffer
    - Uint8Array で import する
  - Object.propertyCount
    - オブジェクトの key の数
  - Array.isSparse
    - Array に穴があるかどうか


### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2025-08-01}...main@{2025-09-01}
- https://tc39.github.io/beta/
- 0->1
  - Module Global
- 1->2
  - Import Bytes
- 2->2.7
  - Keep Trailing Zero
- 2.7->3
  - Iterator Sequencing
  - Upsert
- 3->4
  - Math.sumPrecise
  - Uint8Array to/from Base64


### New Proposals


### WinterTC

- https://github.com/wintercg/admin/issues?q=label%3A%22meeting%22%20
- 21 August 2025 meeting agenda · Issue #135 · WinterTC55/admin
  - https://github.com/WinterTC55/admin/issues/135
- 2025-08-07 meeting agenda · Issue #133 · WinterTC55/admin
  - https://github.com/WinterTC55/admin/issues/133


### Other


## IETF 動向

### IETF123

- https://www.ietf.org/meeting/123/
- https://datatracker.ietf.org/meeting/123/agenda
- https://docs.google.com/document/d/1Ic8TAxKlq3KXVO_5o05uEE_pBLFQ1OtZ0ufol5RF88k
- Cookie Bis まだ
- そんなに面白い話がなかった


### WG

- RFC
- Work
- Meeting


### Other


## 周辺動向

### ベンダー動向

- Igalia WebKit Team | WebKit Igalia Periodical #35
  - https://blogs.igalia.com/webkit/blog/2025/wip-35/
- Igalia WebKit Team | WebKit Igalia Periodical #34
  - https://blogs.igalia.com/webkit/blog/2025/wip-34/
- Igalia WebKit Team | WebKit Igalia Periodical #33
  - https://blogs.igalia.com/webkit/blog/2025/wip-33/
- Igalia WebKit Team | WebKit Igalia Periodical #32
  - https://blogs.igalia.com/webkit/blog/2025/wip-32/
- **UK Reportedly Withdraws Demand to Access Encrypted iCloud User Data - MacRumors**
  - https://www.macrumors.com/2025/08/19/uk-withdraws-icloud-user-data-demand/
  - iCloud にバックドアつけるという英国政府の要望があり、Apple が Advanced Data Protection を無効にした件の続報
  - アメリカ政府が英国政府に取りやめにするように言って、英国側が取りやめたとのこと
- From Chromium to Community (2025) - Tiago Vignatti
  - https://vignatti.com/posts/from-chromium-to-community/
  - Igalia のチームは 2025 年 6 月の初めに、Chromium に関する定例会議を開催し、技術プロジェクトや AI への投資の影響について議論した。
  - Linux Foundation が Chromium のオープン開発を支援する新たな取り組みを発表し、プロジェクトの将来に関する関心が高まっている。
  - 年次 Igalia 会議では、Valerie が Igalia の共同管理についての個人的な経験を共有し、他の協同組合との関わりについて語った。
- CEA-608 captions in Media Source Extensions with webkitgtk
  - https://blogs.igalia.com/vwatermeier/cea-608-captions-in-media-source-extensions-with-webkitgtk/
  - Vivienne Watermeier は、Media Source Extensions における CEA-608 キャプションの WebKitGTK サポートに取り組んでおり、特に MP4 内の WebVTT 形式に焦点を当てている。
  - CEA-608 は固定ビットレートストリームとして設計されており、MSE 環境での利用にはいくつかの課題が存在する。特に、キューの定義やタイムスタンプの管理が難しい。
  - 現在のパッチは実験的なサポートに過ぎないが、WebVTT 以外の形式との相互運用性に関する貴重な洞察を得ており、将来的には他のフォーマットの追加も期待されている。
- Ed25519 Support Lands in Chrome: What It Means for Developers and the Web. - make everything intensely
  - https://blogs.igalia.com/jfernandez/2025/08/25/ed25519-support-lands-in-chrome-what-it-means-for-developers-and-the-web/
  - Chrome M137 で Ed25519 がデフォルトでサポートされ、これにより IPFS エコシステムにおけるセキュリティとパフォーマンスが向上することが期待される。
  - Ed25519 および X25519 のネイティブ実装が Web Cryptography API に組み込まれたことで、開発者は外部ライブラリに依存せず、安全で効率的なアプリケーションを構築できるようになる。
  - この機能の実装は、IPFS だけでなく、Proton や Matrix、Signal などの他の分散型技術にも広く影響を与え、ウェブ全体のプラットフォーム改善に寄与する。


### セキュリティ動向

- MadeYouReset: An HTTP/2 vulnerability thwarted by Rapid Reset mitigations
  - https://blog.cloudflare.com/madeyoureset-an-http-2-vulnerability-thwarted-by-rapid-reset-mitigations/
  - MadeYouReset(CVE-2025-8671)は、HTTP/2 サーバーの一部の未修正実装に存在する新たな DoS 脆弱性であり、特に不正なフレームを送信するクライアントによるストリームリセットを悪用するものである。
  - Cloudflare は、Rapid Reset(CVE-2023-44487)に対する対策を講じており、MadeYouReset からの保護が確保されているため、Cloudflare を利用しているユーザーは影響を受けない。
  - Pingora フレームワークの古いバージョン(h2 ライブラリの 0.4.11 以前)を使用しているユーザーは、アプリケーションをパッチするために h2 クレートのバージョンを更新する必要がある。
- Google Chrome の人気拡張機能が実はスパイウェア、10 万 DL 超、おすすめバッジもついている無償 VPN - 窓の杜
  - https://forest.watch.impress.co.jp/docs/news/2041333.html


### Other

- **State of CSS 2025**
  - https://2025.stateofcss.com/en-US


## イベント

- 8 月
  - 18-22: CSS Working Group Face-to-Face
    - https://wiki.csswg.org/planning/paris-2025
- 9 月
- 10 月
- 11 月
  - 1-7: IETF | IETF 124 Montreal
    - https://www.ietf.org/meeting/124/
  - 10-14: TPAC 2025
    - https://www.w3.org/events/tpac/2025/tpac-2025/


## Wrap Up

- Chrome
  - 139
    - `corner-shape`
    - `@function`
  - 140
    - nested view transitions
    - `Uint8Array.toBase64()`
    - Http Cookie prefix
    - deprecate h1 style in section elems
  - Ship
    - FedCM Alternative Fields in Account Selection
    - Porobabilistic Reveal Tokens
    - Range syntax for style container and if()
    - Digital Credentials API
  - Prototype
    - Customizable select multiple
    - Declarative route matching
    - Selective Permissions Intervention
    - Function Calling in Prompt API
    - `revert-rule`
    - Delayed Messages Timing API
  - other intents
    - Scoped view transitions
  - web.dev
    - CSS Baseline in DevTools
    - What's my Baseline
  - Chrome Developers
    - New Soft Navigations Origin Trial
  - other blogs
    - V8 JSON.stringify() 2x
    - Designing Built-in Web APIs
  - other
- Firefox
  - 142
    - URLPattern
    - `scheduler.yield()`
  - Ship
    - View Transitions L1
    - Command/Commandfor
    - Upsert
    - `::details-content`
  - Prototype
    - `text-autospace`
    - CSS Module Scripts
  - MDN Blog
    - New front end (Lit)
  - Standard Position
    - support for XSLT removal
  - other
    - Jake Archibald が Mozilla 入り
    - CRLite
- Safari
  - TP 225
    - `hidden=until-found`
  - TP 226
    - `sibling-count`
    - `Math.sumPrecise`
    - remove `h1` styles
    - Navigation API
  - other
    - `item-flow` と Masonry
    - Anchor positioning
    - CSS `random()`
- Edge
  - MSEdgeExplainers の `README.md` のコミットもみるべき?
- W3C/WHATWG
  - Draft
    - Incremental Font Transfer
  - Open UI
    - `::interest-hint`
  - WHATNOT meeting
    - Should we remove XSLT from the Web platform?
  - CSS WG meeting
    - addEventListener on `CSSPseudoElement`?
    - August F2F
      - Masonry Switch Syntax: `display: grid-*`
      - `@supports-condition`
  - Other
    - Cookie Store API が WHATWG に
    - W3C Process Document Update
    - サイボウズ、W3C メンバー加入
    - TPAC Inclusion and Invited Expert Support funds で 26 名が選出
- TC39
  - TC39 202507
    - Upsert Stage3
    - Error.captureStackTrace をプロパティにするかアクセサにするか
    - Measure が Amount に
    - Import Buffer (Uint8Array)
    - `Object.propertyCount` / `Array.isSparse` テスト向け提案
  - WinterTC
- IETF123
  - Cookie Bis がまだこない
- 周辺動向
  - ベンダー動向
    - UK による iCloud のバックドアが US 政府の交渉でなくなる
  - セキュリティ動向
  - Other
    - State of CSS 回答者減少