---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep180.mp3
published_at: 2025-06-30
guest: [@myakura](https://github.com/myakura)
guest: [@saku](https://x.com/sakupi01)
---

# ep180 Monthly Platform 202506

## Theme

第 180 回のテーマは 2025 年 6 月の Monthly Platform です。


## Show Note

### Chrome 動向

#### Stable: 138


#### Updates

- New in Chrome 138
  - https://developer.chrome.com/blog/new-in-chrome-138
  - Translator, Language Detector, Summarizer API
  - `abs()`、`sign()`、`progress()`、`sibling-index()`、`sibling-count()`
  - Viewport Segments API により、折りたたみデバイス向けの分割ビューポートに対応可能となった。
- Chrome 139 beta
  - https://developer.chrome.com/blog/chrome-139-beta
  - CSS
    - **Short-circuiting `var()` and `attr()`**
    - CSS caret-animation property
    - **Corner shaping**
    - Continue running transitions when switching to the initial transition value.
    - **CSS Custom Functions**
    - Support width and height as presentation attributes on nested `<svg>` elements
  - Web APIs
    - Web App Manifest: specify update eligibility, icon URLs are Cache-Control: immutable
    - WebXR Depth Sensing Performance Improvements
    - Allow more characters in JavaScript DOM APIs
    - **request-close invoker command**
    - WebGPU: 3D texture support for BC and ASTC compressed formats
    - Secure Payment Confirmation: Browser Bound Keys
    - Secure Payment Confirmation: UX Refresh
    - WebGPU core-features-and-limits
    - Scroll anchoring priority candidate fix
    - Support the async attribute for SVG `<script>` elements
    - On-device Web Speech API
    - Clear window.name for cross-site navigations that switch browsing context group
    - Web app scope extensions
    - Specification-compliant JSON MIME type detection
    - Private Aggregation API: aggregate error reporting
    - **Crash Reporting API: Specify crash-reporting to receive only crash reports**
    - **Reduce fingerprinting in Accept-Language header information**
      - **http を先に減らし**
      - **js は将来的に減らす**
    - Fire error event instead of throwing for CSP blocked worker
    - Audio Level for RTC Encoded Frames
  - New origin trials
    - **Prompt API**
    - Full frame rate render blocking attribute
    - WebGPU Compatibility mode
  - Deprecations and removals
    - Remove support for macOS 11
    - **Remove auto-detection of ISO-2022-JP charset in HTML**
- Update your extensions ahead of upcoming bookmark sync changes
  - https://developer.chrome.com/blog/bookmarks-sync-changes
  - Chrome のアイデンティティモデルの変更が、ブックマークの保存方法に影響
  - ローカルに保存されたブックマークは、自動で動悸されず個別または一括選択が必要
  - chrome.bookmarks API で、拡張はブックマークの同期有効無効を区別できる
  - 同名のフォルダが存在する場合は明示する必要。
- What's New in WebGPU (Chrome 138)
  - https://developer.chrome.com/blog/new-in-webgpu-138
- **What's new in DevTools, Chrome 138**
  - https://developer.chrome.com/blog/new-in-devtools-138
  - Debug complex CSS values easier
  - `calc()`, `min()`, `max()`, `var()` などの関数をホバーすると、計算プロセスを示すツールチップが出現
  - https://docs.google.com/document/d/1zyKdPREtKT8OU4WtlHV_Wxet3SvyUtAXrTdFLPmYmdU/edit?pli=1&tab=t.0
  - `attr()` and `if()` のサポートや CSS Debugger Tool やの実装も予定されている


#### Intents

- **Ship: Allow more characters in javascript DOM APIs**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/65ggNwpC6lw
  - JavaScript の DOM API における要素および属性名の検証が緩和され、HTML パーサーと一致するように変更される。この変更により、以前許可されていた名前は新しい動作でも引き続き許可される。
  - この変更はバグ修正に近く、開発者がすぐに利用できるようになるため、特別なアウトリーチは必要ないとされている。
- Ship: Audio Level for RTC Encoded Frames
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/d7beiJ0msY8
- **Ship: CSS Corner shaping (corner-shape, superellipse, squircle)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OoX4xjqSPt4
  - コーナーの形状や曲率を指定できるようになり、squircles, notches, scoops などの形状が可能となる
  - アニメーションも可能
  - 将来的には、既存のプロパティと互換性のあるショートハンドの導入が計画されている。
- **Ship: Insert CJK inter-script spacing: the CSS `text-autospace` property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gwRvkPJ5pws
  - 漢字やフランス語などの特定の文字に対して自動的に小さなスペースを挿入し、読みやすさを向上させる機能
  - 初期実装は主に漢字のルールに焦点を当てており、`text-autospace`の `normal`, `no-autospace` が含まれる
  - Safari 18.4 では初期値が `no-autospace` と仕様で定義された `normal` とは違うので、仕様の初期値を変更するか議論中
  - [css-text] Reconsider the initial value of the `text-autospace` property · Issue #12386 · w3c/csswg-drafts
    - https://github.com/w3c/csswg-drafts/issues/12386
- Ship: Secure Payment Confirmation: Browser Bound Keys
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0sYsrtrSF1Y
- Ship: Support width and height as presentation attributes on nested `<svg>` elements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/X_33IoHzOkM
- Ship: Translator API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eCE8jIW2auo
- Ship: WebGPU: 3D texture support for BC and ASTC compressed formats
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cOrnjv2y3jU
- **Ship: CSS `counter()` and `counters()` in alt text of 'content' property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ec36bxU5lok
- **Ship: CSS `scroll-target-group` property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/R_VD_FkYrF8
  - CSS Carousel の `::scroll-marker` だけで可能だった `:target-current` の計算機能を切り出し、Carousel 以外でも scroll marker group を作れるように
  - TOC 実装に便利そう
- **Ship: CSS typed arithmetic**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/A5APTVmqntU
  - 型付き算術(Typed arithmetic)により、`calc(10em / 1px)`や`calc(20% / 0.5em * 1px)`といった式を記述できる
  - これにより型付き値を無型の値に変換し、数値を受け入れるプロパティで再利用できるように
  - 開発者からはこの機能の必要性について強い肯定的な反応があり
- **Ship: Crash Reporting API: Specify crash-reporting to receive only crash reports**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4mhi9k87ar4
- Ship: Randomizing TCP Port Allocation on Windows
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-Bmnni7Xv0A
- Ship: ScrollIntoView container option
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bfnPvqLfVi4
- **Ship: CSS caret-animation property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OcliQ_XqUOI
- Ship: Secure Payment Confirmation: Browser Bound Keys
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0sYsrtrSF1Y
- Ship: Uint8Array to/from base64 and hex
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yHjg1eo7FlY
- Ship: Stop sending Purpose: prefetch header from prefetches and prerenders
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iBAJV-lgfLI
- **Ship: View transition pseudos inherit `animation-delay`.**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/T-Gi6ZdyJ7Y
  - アニメーションが適用された擬似要素のツリーを追加し、アニメーションの持続時間と遅延を継承する機能
  - Safari と Firefox が同様の動作を実装済み
- **Ship: Support `font-feature-settings` descriptor in `@font-face` rule**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lfiEcwQrgQM
  - Chromium ベースのブラウザは、`@font-face` 宣言内での `'font-feature-settings'` プロパティのサポートが不足しており、これによりフォントの動作をフォント読み込み時に設定できず、冗長な宣言が必要となる。
  - CSS Fonts Level 4 に基づくこの機能の実装により、タイポグラフィの制御が向上し、現代的なウェブデザインのためのスケーラブルなアプローチが可能になる。
- Ship: Stop sending Purpose: prefetch header from prefetches and prerenders
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iBAJV-lgfLI
- **Ship: Uint8Array to/from base64 and hex**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yHjg1eo7FlY
- Implement and Ship: ReadableStreamBYOBReader Min Option
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CPHJu6riuzw
- **Implement and Ship: Http cookie prefix**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WsXlDO6oO2E/m/w9c5qr_wAQAJ
  - **`Set-Cookie` で `httpOnly` 属性を持つ場合のみ保存される `__Http-` プレフィックス**
  - `__Http` と `__HostHttp` プレフィックスの組み合わせに関する議論が続いており、最終的なスペルが決定されるまで、`__HostHttp` バリアントの出荷は計画されていません。
- **Prototype: Crash Reporting API: Specify crash-reporting to receive only crash reports**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/u3xIBzZZzo4
  - `Reporting-Endpoints: crash-reporting="https://example.com/reports"`
- Prototype: Enhanced Canvas TextMetrics
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/52Lu9BdG0nc
- **Prototype: Last Baseline Content Alignment**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/svIHpnp5C8E
  - `align-content: last-baseline`
  - ボックスのコンテンツを最後のベースラインに基づいて整列させる
  - table cell, flex, grid item に適用可能
  - Firefox と Safari は実装済み、Chrome は block container のみ
  - Interop 2025 のタスク
- **Prototype: Menu elements**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/C4bw78qLyx8
  - `<li>` に command(を発火できる button など)を入れ、toolbar のように振る舞うことが期待されていたが、ほとんど `<ul>` 同等の機能しか持たない。というのが、現行の `<menu>` の特徴
  - 事実上 `<ul>` となんら変わりなく、プログラム的にも `<ul>` と同等なので、Accessibility Tree にも `role=list`として載る
  - もちろん(APG などで)期待されるキーボード操作もネイティブでは実装されておらず、各デザインシステムは独自実装をしている状態
  - 本来 `<menu>` に期待されていた挙動を、`<menubar>`, `<menulist>`, `<menuitem>` として標準化しようという試み
  - ​​Toolbar や Navigation Menu をカバーするものではない
- Prototype: Permissions Policy for Device Attributes API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XimUtR87WAQ
- **Prototype: Programmatic scroll promise**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CaXL0GJDxM4
  - Smooth Scroll が完了した時点で Resolve する Promise を返す
- Prototype: Secure Payment Confirmation: UX Refresh
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pbAYh9g333I
- **Prototype: CSS `border-shape`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FAgQ2UkHJSs
  - CSS `border-shape` は、ポリゴンや円などの任意の形状を用いて非矩形のボーダーを作成する機能を提供する。
  - `border-shape` は `clip-path` と同じ形状を受け入れるが、ボーダーの形状を定義し装飾する点で根本的に異なる。
  - この機能は、`shape()`や`corner-shape`と共に、ウェブ上での非ボックスデザインを可能にし、より表現豊かで美しいウェブの実現を目指している。
- Prototype: `getSelectionBoundingClientRect()` for `<textarea>` and `<input>` elements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TYc-kViyDyc
- **Prototype: Customized built-in elements via elementInternals.type**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6srW418CDgs
  - `elementInternals.type` を利用することで、カスタム要素がネイティブ HTML 要素の動作やプロパティを継承し、特定のニーズに応じて機能を拡張できる。
- **Prototype: `HTMLElement.scrollParent`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2S5HL2SMxys
  - HTMLElement の`scrollParent`属性は、要素の位置に影響を与える最も近いスクロールコンテナを返し、開発者がスクロールイベントリスナーを追加する際の利便性を向上させる。
  - スクロールコンテナを特定するための条件確認が簡素化され、開発者はより効率的にスクロール API を利用できる。
  - この API には既知のセキュリティリスクはなく、ポリフィルを使用して即座に利用を開始できる可能性がある。
- **Prototype: Expose unprintable areas via CSS**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QA6KgNdrpko
  - プリンタには、用紙の四隅に印刷できない領域があり、これを考慮するために CSS 環境変数 `env(safe-printable-inset)` が導入される予定。
  - 開発者が独自のページマージンやカスタムヘッダー・フッターを追加する際、印刷可能領域を正確に把握する必要があり、これによりコンテンツの損失を防ぐことができる。
  - 現在、ブラウザは印刷可能領域に関する情報を持っているが、CSS を通じてこの情報が公開されていないため、改善が求められている。
- **Prototype: Fetch retry (for keepalive fetches)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8Ouwrg_50n8
  - ウェブ開発者が`fetch()`リクエストの再試行を指定できるようにし、ネットワークが不安定な場合でも信頼性を高めることを目的とした提案である。
  - 特に keepalive fetches に焦点を当てており、ドキュメントの寿命を超えてリクエストが生存する場合でも、手動での再試行ができない問題を解決する。
  - 提案には、悪意のあるサイトによる過剰な再試行を防ぐための制限や、リクエストの再試行状態を示す`Retry-Attempt`ヘッダーの導入が含まれており、リスクは低いとされている。
- **Experiment: IP Protection in Incognito using published Masked Domain list**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gBL-Nce3g9c
  - IP 保護機能は、Chrome のシークレットモードにおいて、ユーザーの元の IP アドレスの利用を制限し、クロスサイトトラッキングに対する保護を強化することを目的としている。
  - この機能は、マスクドドメインリスト(MDL)に掲載されたドメインに対してのみ影響を与えるリストベースのアプローチを採用し、ユーザーがシークレットモードでのブラウジング時に IP アドレスをより制御できるようにする。
  - 北米のユーザーを対象に、シークレットモードで 1%の安定した実験を実施し、インフラの安定性やスケーラビリティを理解することを目指している。
- Experiment: Per-Function Explicit Compile Hints via Magic Comments
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/z-497Nyjtk8
- Experiment: Full frame rate render blocking attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vN4HiPr0h14
  - 新しいレンダーブロッキングトークン「full-frame-rate」を追加する提案があり、これによりレンダラーはリソースを確保するために低いフレームレートで動作する。
  - このトークンを使用することで、特定の要素がパースされるまでフレームレートが低下し、その後元のフレームレートに戻ることが可能であるが、ブラウザはこの指示を必ずしも遵守するわけではない。
  - 現在のフィールド実験では、特に顕著なパフォーマンス向上が見られないため、この機能の導入は未確定であり、さらなるテストが必要である。
- Experiment: Script Blocking in Incognito
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NJvGkSvLk8I
  - スクリプトブロッキング機能: ブラウザ再識別のための API の悪用を軽減する目的で、Incognito モードにおける第三者コンテキストでのスクリプトをブロックする機能が提案されている。この機能は、特定のドメインが「スクリプトブロッキングの影響を受ける」とマークされた場合にのみ適用される。
  - 実験の目的: Chrome での機能の有効化に伴い、ネットワークリクエストをブロックリストと照合することによるサイトの機能障害やパフォーマンスへの影響を評価するため、1%のユーザーを対象にした安定した実験が計画されている。
  - 互換性と影響: この機能は、特定のドメインからのスクリプトに依存するウェブサイトに影響を及ぼす可能性があり、Incognito モードで正しく表示されない、または機能しない場合があることが予想される。
- Experiment: Origin Trial: Incoming Call Notifications
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-axY-ZsIw44
- Experiment: Re-Sizing TCP Connection Pool
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1r-i4Koc5nM
- Experiment: Web Authentication immediate mediation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EcioR5yZ9HA
  - `navigator.credentials.get()` に新たな mediation モードを追加し、既知のパスキーやパスワードがある場合のみサインイン UI を表示し、なければ `NotAllowedError` で拒否する提案が議論中。
  - サイト側は、資格情報がある場合はサインイン画面なしで認証を試み、ない場合は通常のサインイン画面に誘導できるようになる。
  - ただし、`PasswordCredential` が Firefox や Safari に未実装であるため、この機能の互換性にはリスクがある。
- Extend Experiment: Page-Embedded Permission Control
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/393mrf_4aBk
- Experiment: Local Network Access
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ahtNny6XmxY
- Ready for Developer Testing: Crash Reporting API: Specify crash-reporting to receive only crash reports
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_5yTknKOTOg
- **Ready for Developer Testing: CSS Gap Decorations**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vmO3X2aYL2Y
  - CSS Gap Decorations は、Grid や Flexbox のレイアウトにおける隙間のスタイリングを可能にする機能であり、これは多くのウェブ開発者からの強い要望に基づいている。
  - 現在の実装にはアニメーションや断片化サポートの欠如、グリッドサイズの制限などの技術的制約が存在し、これらへの対応が計画されている。
  - 開発者からのフィードバックを収集することが目的であり、API の使いやすさや実際の使用例に関する意見が求められている。
- Ready for Developer Testing: Local network access restrictions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/D4nqAa3FUN8
- Change:
- Unship:
- Remove:
- Web-Facing Change PSA: Continue running transitions when switching to initial transition value.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/B2aypkK91oI
- Web-Facing Change PSA: Scroll Anchoring Priority Candidate Fix
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3bAXt1VFYDw
- Web-Facing Change PSA: Enable `navigator.getInstalledRelatedApps()` for desktop web apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LSRh7Gno3YY
- Web-Facing Change PSA: ServiceWorker support for Speculation Rules Prefetch
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wZ3C_MRJGhg
- Web-Facing Change PSA: Speculation rules: mobile "moderate" eagerness improvements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YYBd-eksiE8
  - Web アプリケーションが getDisplayMedia()を呼び出すと、Chromium はプロミスを返し、ユーザーにタブ、ウィンドウ、または画面を選択するダイアログを表示する。
  - Chromium m139 以降、ユーザーが「共有」ボタンをクリックすると、プロミスが解決される前にドキュメントに一時的なアクティベーションが付与される。
  - この変更により、ウェブベースのビデオ会議アプリがウィンドウを選択した場合、そのウィンドウが前面に表示され、ユーザーはアプリに戻ることなく PiP をトリガーできるようになる。
- Web-Facing Change PSA: User accepting `getDisplayMedia()` dialog will confer activation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dDWHV_Pv4CQ
- Web-Facing Change PSA: Propagate Viewport `overscroll-behavior` from Root
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/an611rpPxLQ
  - Chrome は、overscroll-behavior を body からではなく、root 要素から伝播させる機能を導入する予定であり、これは Safari や Firefox の動作と一致させるためである。
  - CSS 作業部会は、viewport のプロパティは body からではなく root 要素から伝播されるべきであると決定した。
  - この変更は、Chrome が WebKit(Safari)や Gecko(Firefox)とは異なる動作をしていた問題を解決するものであり、全ての Blink プラットフォームでサポートされる予定である。
- RuntimeEnabledFeatures flags that we might be able to remove
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ScIKVcPF5Yw
  - stable になって長い機能のフラグも混ざってるから、一旦 runtime_enabled_features.json5 整理
  - https://docs.google.com/spreadsheets/d/1OoQOp19o0dtuWXyyQJdBCAAt_6sq4PpvdRszGb0lNmo/edit?gid=436733424#gid=436733424
- Possible to remove WebGLRenderingContextBase::commit()?
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4oy-XTtUViA


#### Other

- web.dev
  - New to the web platform in May
    - https://web.dev/blog/web-platform-05-2025
  - May 2025 Baseline monthly digest
    - https://web.dev/blog/baseline-digest-may-2025
  - Optimize Interaction to Next Paint
    - https://web.dev/articles/optimize-inp
  - New to the web platform in May
    - https://web.dev/blog/web-platform-05-2025
  - May 2025 Baseline monthly digest
    - https://web.dev/blog/baseline-digest-may-2025
  - JSON module scripts are now Baseline Newly available
    - https://web.dev/blog/json-imports-baseline-newly-available
- google for developers
  - Google Pay inside sandboxed iframe for PCI DSS v4 compliance
    - https://developers.googleblog.com/en/google-pay-inside-sandboxed-iframe-for-pci-dss-v4-compliance/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - Enabling chrome.userScripts in Chrome Extensions is changing
    - https://developer.chrome.com/blog/chrome-userscript
  - What's happening in Chrome Extensions, June 2025
    - https://developer.chrome.com/blog/extension-news-june-2025
  - Support foldable devices with the Viewport Segments API
    - https://developer.chrome.com/blog/viewport-segments-api-shipped
  - New permission prompt for Local Network Access
    - https://developer.chrome.com/blog/local-network-access
  - **A new way to style gaps in CSS**
    - https://developer.chrome.com/blog/gap-decorations
  - HTML spec change: escaping `<` and `>` in attributes
    - https://developer.chrome.com/blog/escape-attributes
- chromium blog
  - Chromium Blog: Chrome achieves highest score ever on Speedometer 3.1, saving users millions of hours
    - https://blog.chromium.org/2025/06/chrome-achieves-highest-score-ever-on.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
- search blog
  - 新たにポイント プログラムのマークアップをサポート | Google 検索セントラル ブログ
    - https://developers.google.com/search/blog/2025/06/loyalty-program
- v8
  - **Speculative Optimizations for WebAssembly using Deopts and Inlining · V8**
    - https://v8.dev/blog/wasm-speculative-optimizations
    - V8 エンジンにおいて、WebAssembly のために実装された新しい最適化手法として、speculative call_indirect inlining と deoptimization が紹介され、これにより実行速度が最大で 50%向上することが示された。
    - Speculative inlining は、間接呼び出しに対しても関数のインライン化を可能にし、実行時のフィードバックに基づいて最適化を行い、さらに後続の最適化を促進する。
    - Deoptimization は、最適化中に行った仮定が無効になった場合に、最適化されたコードから未最適化のコードに戻る手段を提供し、これによりさらなる最適化を可能にする。
- other
  - AI bugSWAT in Tokyo & 2025 Hacker Roadshow - Google Bug Hunters
    - https://bughunters.google.com/blog/5753079171252224/ai-bugswat-in-tokyo-2025-hacker-roadshow
  - **Escaping `<` and `>` in attributes - How it helps protect against mutation XSS - Google Bug Hunters**
    - https://bughunters.google.com/blog/5038742869770240/escaping-and-in-attributes-how-it-helps-protect-against-mutation-xss


### Firefox 動向

#### Stable: 140


#### Updates

- Firefox 140.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/140.0/releasenotes/
- Firefox 140 for developers - Mozilla | MDN
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/140
  - Custom Highlight API
  - セクション要素内の h1 へのスタイル指定が削除
  - Cookie Store API
  - 属性値内の `<` , `>` を `innerHTML` で参照したらエスケープされるように
  - Mutation Events 削除
- Smarter Searches - These Weeks in Firefox: Issue 182
  - https://blog.nightly.mozilla.org/2025/06/06/smarter-searches-these-weeks-in-firefox-issue-182/
- Firefox features that help you plan a trip (and take it)
  - https://blog.mozilla.org/en/firefox/travel-features/
- Absolute Unit of an Update - These Weeks in Firefox: Issue 183
  - https://blog.nightly.mozilla.org/2025/06/18/absolute-unit-of-an-update-these-weeks-in-firefox-issue-183/
- Your data, your rules: Firefox's privacy-first AI features you can trust
  - https://blog.mozilla.org/en/firefox/firefox-ai/ai-browser-features/
  - Firefox は、AI 機能を拡張し、ユーザーのデータをプライベートに保つことに重点を置いている。AI モデルはデバイス上で直接実行され、センシティブなデータが外部に送信されることはない。
  - 自動的な代替テキスト生成、ページの即時翻訳、AI によるタブグループの提案など、プライバシーを損なうことなく生産性を向上させるツールが提供されている。
  - ユーザーは好みの AI チャットボットを選択・切り替え可能で、ダウンロードした AI モデルをいつでも削除できるため、プライバシーを守りながら自由に利用できる。


#### Intents

- Ship: WebGPU on Windows
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/21W7YWSvYIM/m/U2gYnGK2BQAJ
- **Ship: endpoint-inclusive commitStyles**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/0AJipNgtu4E/m/mSoPvxJvAQAJ
- **Ship: Prioritized Scheduling API**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/4_RN4WRGidc/m/II1umxUyAgAJ
  - Firefox 142 以降、Prioritized Scheduling API が全プラットフォームでデフォルトで有効になる予定である。
  - この API は、`dom.enable_web_task_scheduling`という設定の下で開発されており、Blink ではすでに実装済みであるが、WebKit からの信号はない。
  - 現在、WICG 仕様であるが、HTML 仕様に移行することが合意されており、関連するバグトラッキングリンクも提供されている。
  - `scheduler.yield()`
- Prototype:
- Prototype: Local Network Access (LNA) Defense via Permission Prompts
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/B8oN3ARp_j0/m/rWKXmnj4AAAJ
- Prototype: Framebusting Intervention
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/G0GDGqJCGpM/m/c_kjdJUaBwAJ
- **Prototype: :heading & :heading(AnB#) selectors**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/SlPKz6WrEv4
- Change: Enable synthetic mousemove on Android to dispatch mouse/pointer boundary events at a layout change or a scroll
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/NW3z8YdR8PQ/m/xgY3hKohAgAJ
- Remove:


#### Newsletter

- Absolute Unit of an Update - These Weeks in Firefox: Issue 183 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2025/06/18/absolute-unit-of-an-update-these-weeks-in-firefox-issue-183/
- Firefox WebDriver Newsletter 140 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-140/


#### MDN / Open Web Docs


#### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2025-06-01+
- Positive
  - Remove non-standard prefetch headers like X-Moz for Sec-Purpose for prefetches, prerenders, etc.
    - https://github.com/mozilla/standards-positions/issues/1259
  - **HTML ping attribute**
    - https://github.com/mozilla/standards-positions/issues/1212
  - Scoped Custom Elements Registries
    - https://github.com/mozilla/standards-positions/issues/424


#### Other

- 1974034 - Noto fonts should NOT be used as default CJK font on Windows
  - https://bugzilla.mozilla.org/show_bug.cgi?id=1974034
  - Chromium にならって Firefox でも Noto CJK をデフォルトフォントに変更したところ、見た目が変わり読みにくいという反応が多かった
  - Noto はヒンティングがないので、高 DPI でないディスプレイにおいてぼやけたように見えてしまう
  - とりあえず Noto の優先順位を下げるように変更しそう
- Bug 1974034 - Move Noto (CJK) fonts later in the font prefs lists on … · mozilla-firefox/firefox@eaa8b3a
  - https://github.com/mozilla-firefox/firefox/commit/eaa8b3ade1dd
- June 11, 2025-KB5063060 (OS Build 26100.4351) Out-of-band - Microsoft Support
  - https://support.microsoft.com/en-us/topic/june-11-2025-kb5063060-os-build-26100-4351-out-of-band-b1746442-8c6c-425d-ac5a-3a8f51e372f3
  - > There are reports of blurry or unclear CJK (Chinese, Japanese, Korean) text when displayed at 96 DPI (100% scaling) in Chromium-based browsers such as Microsoft Edge and Google Chrome. The March 2025 Preview Update introduced Noto fonts in collaboration with Google, for CJK languages as fallbacks to improve text rendering when websites or apps don't specify appropriate fonts. The issue is due to limited pixel density at 96 DPI, which can reduce the clarity and alignment of CJK characters. Increasing the display scaling improves clarity by enhancing text rendering.
- Chromium using Windows provided Noto Sans CJK as default font is blurrier as reported by users [415261549] - Chromium
  - https://issues.chromium.org/issues/415261549
- Prefer Microsoft fonts over Noto on Windows whenever available (regression of 343302583) [409486609] - Chromium
  - https://issues.chromium.org/issues/409486609
- One-time permissions are here to stay! - Advancing WebRTC
  - https://blog.mozilla.org/webrtc/one-time-permissions-are-here-to-stay/
  - Chrome でのパーミッションプロンプトで「Allow this time」が入り、Firefox/Safari に並んで久しい
  - 永続的ではないというマインドセットになることが重要
    - 先に権限を求めないで、使う時に許可を求める
- Page Embedded Permission Control (Take 2) · Issue #1245 · mozilla/standards-positions
  - https://github.com/mozilla/standards-positions/issues/1245
  - PEPC の explainer が更新され、カメラ、マイク、位置情報にフォーカスしたことなどに好感触を持った
  - その上で、`<permission>` ではなく専用の要素にすることや、実行時のパーミッションに限定する(永続的でなくする)ことを望むなど、議論中
- keithamus: "Okay gang, those who sling HTM…" - Indieweb.Social
  - https://indieweb.social/@keithamus/114699867404080965
  - Firefox に足りてないと思う機能についてアンケート
- Platform/2025PlannedWork - MozillaWiki
  - https://wiki.mozilla.org/Platform/2025PlannedWork


### Safari 動向

#### Stable: 18.5


#### Updates

- Shop Talk Show episode 667 | WebKit
  - https://webkit.org/blog/16983/shop-talk-show-episode-667/
  - 3 月くらいから WebKit Blog 週一更新するようにしてる
  - `color-contrast()`の記事は Jen がデモ作ってて、色が変だと感じて調査した結果
  - Declarative Web Push
  - Form Control Styling
    - in-page が先行して、picker が後で進められる
  - Wide Gamut Color & `input type="color"`
  - Typography がアツい
  - `item-flow` (Flex と Grid の統合、Masonry の議論など)
- **News from WWDC25: WebKit in Safari 26 beta | WebKit**
  - https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/
  - SVG Icons
  - **Every site can be a web app on iOS and iPadOS**
  - HDR Images
  - WebKit in SwiftUI
    - WebView
    - WebPage
  - `<model>` on visionOS
    - Basic usage
    - Lighting
    - Animation and playback
    - Rotation and interaction
  - Immersive video and audio on visionOS
  - WebGPU
  - CSS
    - Anchor Positioning
    - Scroll-driven Animations
    - Pretty text
    - Contrast Color
    - Progress function
    - And more CSS
  - Digital Credentials API
  - Web API
  - JavaScript
  - Editing
  - SVG
  - Media
  - WebRTC
  - Web Inspector
  - Web Extensions
  - WebKit API
  - WebAssembly
  - Privacy
  - Networking
  - Lockdown Mode
  - Website Compatibility
  - Bug Fixes and more
    - Accessibility
    - CSS
    - Canvas
    - DOM
    - Editing
    - Forms
    - JavaScript
    - Media
    - Rendering
    - SVG
    - Safari View Controller
    - Scrolling
    - Service Workers
    - Tables
    - Text
    - URLs
    - Web API
    - Web Animations
    - Web Extensions
    - Web Inspector
    - WebRTC
  - Try out Safari 26 beta
  - Feedback
- **Web technology videos at WWDC25 | WebKit**
  - https://webkit.org/blog/16987/web-technology-videos-at-wwdc25/
  - What's new in Safari and WebKit
  - What's new for the spatial web
  - Learn more about Declarative Web Push
  - **What's new in passkeys**
  - Verify identity documents on the web
  - Unlock GPU computing with WebGPU
  - Meet WebKit for SwiftUI
- Release Notes for Safari Technology Preview 221 | WebKit
  - https://webkit.org/blog/17092/release-notes-for-safari-technology-preview-221/
  - Accessibility
  - Forms
  - JavaScript
  - Media
  - PDF
  - Rendering
  - Web API
  - Web Inspector
    - Added support for recording Workers in the Timelines tab.
  - WebRTC
    - Added support for exposing a default system speaker device.
- A guide to Scroll-driven Animations with just CSS | WebKit
  - https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/
- A step into the spatial web: The HTML model element in Apple Vision Pro | WebKit
  - https://webkit.org/blog/17118/a-step-into-the-spatial-web-the-html-model-element-in-apple-vision-pro/


#### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2025-06-01+
- Support
  - Approximate geolocation
    - https://github.com/WebKit/standards-positions/issues/470
  - `Integrity-Policy` header for scripts
    - https://github.com/WebKit/standards-positions/issues/458
  - **Observable**
    - https://github.com/WebKit/standards-positions/issues/292
- Oppose
  - WebUSB API
    - https://github.com/WebKit/standards-positions/issues/68


#### Other


### Edge 動向

#### Stable:


#### Updates

- The Edge 2025 web platform top developer needs dashboard - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2025/06/26/the-edge-2025-web-platform-top-developer-needs-dashboard/
  - Microsoft Edge チームは、Interop 2025 プロジェクトを通じて、主要なウェブ開発者のニーズに関する透明性を高め、ブラウザ間の互換性を向上させるために努力している。
  - 新たに発表された「Edge 2025 ウェブプラットフォームトップ開発者ニーズダッシュボード」は、開発者が求める重要な機能の互換性とテストの成功を追跡する。
  - ダッシュボードには、スクロール駆動アニメーションやクロスドキュメントビュー遷移など、開発者が必要とする複数の機能が含まれており、ブラウザベンダーによる実装の進捗が確認できる。


#### Other

- Bring your PWA closer to users with App Actions on Windows
  - https://blogs.windows.com/msedgedev/2025/05/30/bring-your-pwa-closer-to-users-with-app-actions-on-windows/
- Debuting new enhanced controls for picture-in-picture in Microsoft Edge
  - https://blogs.windows.com/msedgedev/2025/06/06/debuting-new-enhanced-controls-for-picture-in-picture-in-microsoft-edge/
- Introducing secure password deployment in Microsoft Edge for Business
  - https://blogs.windows.com/msedgedev/2025/06/11/introducing-secure-password-deployment-in-microsoft-edge-for-business/
- Strengthen mobile device security with Edge for Business, the secure enterprise browser
  - https://blogs.windows.com/msedgedev/2025/06/19/strengthen-mobile-device-security-with-edge-for-business-the-secure-enterprise-browser/
- Announcing Windows 11 Insider Preview Build 26120.4520 (Beta Channel) | Windows Insider Blog
  - https://blogs.windows.com/windows-insider/2025/06/27/announcing-windows-11-insider-preview-build-26120-4520-beta-channel/
- Announcing Windows 11 Insider Preview Build 26200.5670 (Dev Channel) | Windows Insider Blog
  - https://blogs.windows.com/windows-insider/2025/06/27/announcing-windows-11-insider-preview-build-26200-5670-dev-channel/
- **Use Windows Hello to unlock 1Password on your Windows PC | 1Password Support**
  - https://support.1password.com/windows-hello/


### WHATWG/W3C 動向

#### Draft

- Recommendation
  - DPUB-ARIA and DPUB-AAM are now Web Standards (W3C Recommendations)
    - https://www.w3.org/WAI/news/2025-06-12/dpub-aria-dpub-aam-rec/
  - **Portable Network Graphics (PNG) Specification (Third Edition) is now a W3C Recommendation**
    - https://www.w3.org/news/2025/portable-network-graphics-png-specification-third-edition-is-now-a-w3c-recommendation/
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft


#### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- [menu] Should `menulist` be a popover by default? [#1226](https://github.com/openui/open-ui/issues/1226)
  - `<menulist>` はブロック方向に popover で表示されるやつ。`<menubar>` はインラインに `<menulist>` や menuitem を並べるやつ。
  - > RESOLVED: We should not require popover attribute on menulist.
- Should `select multiple` with popup have OK/Cancel buttons? [#1217](https://github.com/openui/open-ui/issues/1217)
  - Option2: Only a close button is provided.
- How should `interestfor` work on a disabled button [#1227](https://github.com/openui/open-ui/issues/1227)
  - disabled な hovercards は mouseover-able だけど、not focusable だし、not long-pressable.
  - 「なぜそのホバーカードが disabled なのか説明する時のツールチップ」を出すために `interestfor` を使用可能にすべきか
  - Accessibility の観点から scott が猛烈に反対
  - 無効な状態を示したければ、`aria-disabled` や適切な UI 設計で同様の結果を達成可能


#### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
- 2025-06-05
  - https://github.com/whatwg/html/issues/11353
  - Naming of the `interesttarget` attribute
    - https://github.com/whatwg/html/issues/11312
    - `interesttarget` -> `interestfor`にリネーム
    - `interest-delay` の Resolution を受けて
    - OpenUI 側にも反映済み
      - https://github.com/openui/open-ui/pull/1234
- 2025-06-12
  - https://github.com/whatwg/html/issues/11358
  - XML の `parseFromString()` のエラー挙動がクロスブラウザ互換してない件について
- 2025-06-19
  - https://github.com/whatwg/html/issues/11378
- 2025-06-26
  - https://github.com/whatwg/html/issues/11386


#### Other

- W3C Advisory Committee Elects Advisory Board
  - https://www.w3.org/news/2025/w3c-advisory-committee-elects-advisory-board/
- CSSWG
  - [css-shapes-1] Updated CR of CSS Shapes?
    - https://github.com/w3c/csswg-drafts/issues/6450
    - `shape()` が cs-shape-2 (ED) から css-shape-1 (CR) に
    - spec と実装が固まっていることを示す
    - Updated Candidate Recommendation Draft: CSS Shapes Level 1.
      - https://www.w3.org/Style/CSS/current-work.en.html#n2025-06-12
  - **Add "show interest" and "lose interest" hover delays to CSS**
    - https://github.com/w3c/csswg-drafts/issues/9236#issuecomment-2940736593
    - "show interest" "lose interest"をカスタマイズできるようにすべきか、すべきでないか。プロパティの命名をどうするかの議論
    - プラットフォームのデフォルト遅延として `normal` keyword を追加。
    - `normal` のような単一値から始め、キーボード/タッチなどの代替値が必要な可能性についての spec note を追加していく
    - `interest-delay-start` と `interest-delay-end` のショートハンドとして `interest-delay` を定義
    - `command`/`interest` が一般的な名前となりつつあり、`command`/`interest`間で一貫した命名にする動きが。`interesttartget`(popover 由来) -> `interestfor`(`commandfor`と一貫)
  - [css-color-4] What if gradients with legacy colors _also_ interpolated in Oklab by default?
    - https://github.com/w3c/csswg-drafts/issues/7948
    - 従来の sRGB 色形式(hex 色、named 色、`rgb()`、`hsl()`、`hwb()` など)を使用するグラデーションでも、デフォルトで Oklab 色空間で補間を行う決定があったが、Revert
- Draft Group Note: Linked Web Storage Use Cases
  - https://www.w3.org/news/2025/draft-group-note-linked-web-storage-use-cases/
- W3C invites implementations of MathML Core
  - https://www.w3.org/news/2025/w3c-invites-implementations-of-mathml-core/
- **Feature Request: Built-In Web Libraries (BWL) via browser-lib attribute · Issue #11376 · whatwg/html**
  - https://github.com/whatwg/html/issues/11376#issuecomment-2976803780
  - 「ブラウザが有名なライブラリをバンドルすればいい」というたまにくる夢の提案
  - Google の Patrick Meenan がそれはしないと言いつつ、有名な JS/CSS のライブラリを Compression dictionary として Chrome に入れるのも一つの案として検討しているとコメント
  - > From the Chrome side of things, we're planning to explore an alternative approach where we ship a compression dictionary that has the most common js/css (maybe HTML?) chunks in it so that the common web libraries would effectively get compressed to zero.
- **Scheduling Approach Alternatives · w3c/wcag3 · Discussion #322**
  - https://github.com/w3c/wcag3/discussions/322
  - WCAG 3 のスケジュール案について
  - https://docs.google.com/presentation/d/1hB8eLqzQWp9EZEwZltvKgItGZLmCpJg3g_xOPd_OGBE/edit
  - 複数の Option があるが、どれも時間がかかる
  - 議論の中で WCAG 2.2 からインクリメンタルに更新していくという案が出てきて紛糾
  - https://docs.google.com/presentation/d/1vwD1uJOB1mpduOJ3wdCnEovW5tRZolIVgIJC0FGXwOQ/edit
- **CSS Day**
  - https://cssday.nl/
  - From 7 Hours Behind | @sakupi01.com
    - https://blog.sakupi01.com/life/articles/from-7-hours-behind
  - CSSDay 2025 Report
    - https://zenn.dev/cybozu_frontend/articles/css-day-2025
  - 個人的には John Allsopp と Miriam Suzanne の発表が特に好きだった
  - John: A Dao of CSS
    - 自身の A Dao of Web Design を元に、CSS に応用した話
    - ネイティブに対する Web からの不安、SPA の登場によるエコシステムの発展、JS over CSS のような構図の露見、Native CSS の特徴が蔑ろにされているのでは
    - 7 Principles of CSS
    - DO LESS.
  - Mia: Is Sass Dead Yet? CSS Mixins & Functions
    - https://slides.oddbird.net/mixins/cssday/
    - Sass にもあった Abstractions が CSS で同等に動いてきたことはない
      - Variables, Math & Color functions, Nesting, if, functions, mixin
    - Sass の Variables, if, function と CSS の Custom Properties, `if(), @function` の違いをエンジンレベルで解説
  - Tim や Brecht とは特に仲良くなった
    - Range 難しいの話
    - `view-transition-name: auto;` の話
  - 他にも、Miriam Suzanne、Brad Frost、Bramus、Rachel Andrew & Philip Walton、Una Kravets、Sacha Greif、Eric Leese とかとも喋れた
  - セッションは、Web 標準寄りと CSS 芸人寄りに大別される感じがあった
  - Google お家芸(?)の「What's Missing from HTML & CSS ?」も催されていた


### TC39 動向

#### Meeting

- 2025-01
  - https://github.com/tc39/agendas/blob/main/2025/05.md
  - https://github.com/tc39/notes/pull/373
  - https://docs.google.com/document/d/1qXUf4QRTbexUj0fg2sgYTxWwOT2v_q7lmjR282BOWLU/edit?tab=t.wp0c3xmn3x1u
  - ECMA2025 がもうすぐ出そう
  - LTR/RTL どっちでもない縦書き言語(オイトラ語、モンゴル語 etc)の扱い
  - WebIDL の ECMA での拡張と自動生成
  - `window.Random` の追加提案
  - Comparisons (strictDeepEqual 的なことができる)の提案
  - Decimal.Amount で精度保持はやっていく


#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2025-06-01}...main@{2025-07-01}
- https://tc39.github.io/beta/
- 0->1
  - window.Random
  - Inspector
- 1->2
  - SeededPRNG
  - Math.clamp
- 2->2.7
- 2.7->3
- 3->4
  - Error.isError
  - Array.fromAsync (条件付き)


#### New Proposals


#### WinterTC

- https://github.com/wintercg/admin/issues?q=label%3A%22meeting%22%20
- 2025-06-26 meeting agenda · Issue #122 · WinterTC55/admin
  - https://github.com/WinterTC55/admin/issues/122
- ​​2025-06-12 meeting agenda · Issue #120 · WinterTC55/admin
  - https://github.com/WinterTC55/admin/issues/120


#### Other


### IETF 動向

#### WG

- RFC
- Work
- Meeting


#### Other

- Vary and Availability Hints (again)
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2025AprJun/0211.html
  - HTTP の Vary ヘッダーは、キャッシュがクライアントの要求に応じた適切な応答を選択するのを困難にし、効率の低下や誤った応答を引き起こす問題がある。
  - 2015 年の Key 仕様や 2018 年の Variants 仕様を経て、2023 年には Availability Hints が提案され、これによりキャッシュはサーバーの利用可能なレスポンス表現をより直感的に把握できるようになる。
  - Availability Hints は、キャッシュエンジニアリングチームとコンテンツエンジンの間の実装に関する関心を促進するための重要な問題であり、今後の議論が期待される。
- web-bot-auth
  - https://mailarchive.ietf.org/arch/browse/web-bot-auth/
- DRAFT Charter: Web Bot Auth WG - Google Docs
  - https://docs.google.com/document/d/1cNksLq-nd1_ALHhGYTEG_g3RaNGeWrDMHXLORwV0dY8/edit
  - > The Web Bot Auth Working Group will standardise methods for cryptographically authenticating non-browser clients to Web sites. This is intended for use by sites that primarily serve browsers.


### 周辺動向

#### ベンダー動向

- Igalia WebKit Team | WebKit at the Web Engines Hackfest 2025
  - https://blogs.igalia.com/webkit/blog/2025/web-engines-hackfest/
- Igalia WebKit Team | WebKit Igalia Periodical #26
  - https://blogs.igalia.com/webkit/blog/2025/wip-26/
- Igalia WebKit Team | WebKit Igalia Periodical #27
  - https://blogs.igalia.com/webkit/blog/2025/wip-27/
- une Conference News | Igalia
  - https://www.igalia.com/2025/05/30/June-Conference-News.html


#### セキュリティ動向

- 16 billion passwords exposed in colossal data breach​ | Cybernews
  - https://cybernews.com/security/billions-credentials-exposed-infostealers-data-leak/
- **160 億件のパスワードが流出―アップル、フェイスブック、グーグル、GitHub も 今すぐ対策を**
  - https://forbesjapan.com/articles/detail/80004
- Introducing Passkeys on Facebook for an Easier Sign-In
  - https://about.fb.com/news/2025/06/introducing-passkeys-facebook-easier-sign-in/
- グーグルが 20 億ユーザーに警告―今すぐ Gmail をパスワードからパスキーに変更を
  - https://news.yahoo.co.jp/articles/4156cd473dc89d7c650b7ef76d8af06844412d08
- **警視庁サイバーセキュリティ対策本部**
  - セキュリティを強化して大切な情報を守りましょう。
  - https://x.com/MPD_cybersec/status/1937677739882078268


#### Cookie 動向


#### Other

- Using AI to Evaluate Internet Standards
  - https://www.mnot.net/blog/2025/06/04/using_ai
  - mnot が AI にインターネット標準を評価させてみた
  - 対象は Privacy Sandbox / QUIC
  - 結論としては「ニュアンス」が抜けている。
  - 「AI は考えてない」ので入口の部分はいいが、そこから先はちゃんと把握した専門家が必要
- AI Focus | Modern Web Development with Chrome
  - https://paul.kinlan.me/2025-06-06-ai-focus/
  - Paul が AI Focus という blog を立ち上げた
  - AI と Web 開発の接点を探るもの
- Safari at WWDC '25: The Ghost of Christmas Past - Infrequently Noted
  - https://infrequently.org/2025/06/the-ghost-of-christmas-past/
  - Alex Russel の Safari に対する批判
  - WWDC で発表された新機能のほとんどは Chrome が OT などで整備しとっくにリリースしてるもの
  - Safari の機能網羅的な完成度は常に最下位
  - DMA に対する対応も粗雑
  - Google からの契約収入 200 億の内、Safari に投じてるのは 10 億で 190 億は純利益
  - 過去 10 年エコシステムから莫大な利益を掠め取りながら Web を阻害してきた Apple が、単一障害点として足を引っ張ってきた機能のアンロックが今回の WWDC だった
- JavaScript™ Trademark Update | Deno
  - https://deno.com/blog/deno-v-oracle4
- **iPhone の子ども向けフィルタリングが効かなくなる?「スマホ新法」の意外な盲点とは**
  - https://www.itmedia.co.jp/news/articles/2506/05/news095.html
  - スマホ新法が施行されブラウザエンジンが WebKit に限定されなくなるとフィルタリングで困るという点からの問題提起
  - 施行近づく「スマホ新法」 競争促進の実際や消費者保護への指摘も - Impress Watch
  - https://www.watch.impress.co.jp/docs/topic/2019566.html


### イベント

- 7 月
  - 19-25: IETF | IETF 123 Madrid
    - https://www.ietf.org/meeting/123/
- 8 月
- 9 月


### Wrap Up

- Chrome
  - 138
    - Built-in AI
    - `sign()`/`progress()`/`sibling-index()`
  - 139 beta
    - CSS short-circuiting `var()`
    - CSS `corner-shape`
    - CSS custom functions
    - `request-close`
    - Crash Reporting API
    - Reduce `Accept-Language` header
  - 138 DevTools
    - `calc()` 系の計算プロセスのツールチップ
  - Ship
    - Allow more chars in JS DOM APIs
    - CSS Corner Shaping
    - CSS `text-autospace`
    - CSS `counter()` in `content` alt
    - CSS `scroll-target-group`
    - CSS typed arithmetic
    - Crash Reporting API
    - CSS `caret-animation`
    - `font-feature-settings` in `@font-face`
    - Uint8Array to/from base64 and hex
    - Http Cookie prefix
  - Prototype
    - menu elements
    - programmatic scroll promise
    - CSS `border-shape`
    - Customized built-in elements via `ElementInternals.type`
    - `HTMLElement.scrollParent`
    - unprintable areas via CSS
    - Fetch retry for keepalive fetches
  - Experiment
    - IP Protection in Incognito using Masked Domain List
  - Chrome Developers
    - CSS gap styling
  - other blogs
    - V8 speculative optimization for WASM
  - other
    - Escaping `<` and `>` in attr getters
- Firefox
  - 140
    - Custom Highlight API
    - セクション系要素内 h1 のデフォルトスタイル削除
    - Cookie Store API
    - `<` and `>` escaping
    - Mutation Events 削除
  - Ship
    - endpoint-inclusive commitStyles
    - `scheduler.yield()`
  - Prototype
    - `:heading` and `:heading()`
  - Standard Position
    - support for `<a ping>`
  - other
    - Noto フォント revert
    - PEPC ちょっと前進?
- Safari
  - TP 18.5
  - Standard Position
    - Observable
  - other
    - WWDC 2025 wrap-up
- Edge
  - Use Windows Hello to unlock 1Password on your Windows PC
- W3C/WHATWG
  - Draft
    - Portable Network Graphics (PNG) Specification
  - Open UI
    - Select Multiple will provide cancel button.
    - `interestfor` for disabled button?
  - WHATNOT meeting
    - `interesttarget` -> `interestfor`
    - `interest-delay`
      - `normal` keyword
  - Other
    - WCAG 3 のスケジュール案が出る
    - WCAG 2.2 からインクリメンタルに更新していく議論
    - CSSDay wrap-up
- TC39
  - Meeting
    - ECMA2025 もうすぐ
    - WebIDL の ECMA での標準化提案
    - `window.Random` の提案
    - Comparisons での比較(assert)提案
    - `Decimal.Amount` で精度保持
  - WinterTC
- IETF
- 周辺動向
  - ベンダー動向
  - セキュリティ動向
    - 160 億件のパスワードが流出- Apple, FB, Google, GitHub
    - gmail の 20 億ユーザに Passkey 啓蒙
    - 警視庁より Passkey の啓蒙
  - Cookie 動向
  - Other