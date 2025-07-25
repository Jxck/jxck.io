---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep182.mp3
published_at: 2025-07-25
guest: [@myakura](https://github.com/myakura)
guest: [@saku](https://x.com/sakupi01)
---

# ep182 Monthly Platform 202507

## Theme

第 182 回のテーマは 2025 年 7 月の Monthly Platform です。


## Show Note

### Chrome 動向

#### Stable: 138


#### Updates

- What's new in DevTools, Chrome 139
  - https://developer.chrome.com/blog/new-in-devtools-139
  - A more reliable and productive Chrome DevTools
  - Upload images in AI assistance for styling
  - Add request headers to the table in Network
  - Check out the highlights from Google I/O 2025
  - Miscellaneous highlights
  - Download the preview channels
  - Get in touch with the Chrome DevTools team


#### Intents

- Ship: CSS :lang pseudo class level 4
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tO598HXuS94
- Ship: File System Access on Android and WebView
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/x3IcFv2jY6c
- Ship: Secure Payment Confirmation: UX Refresh
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ni0Kvtmd20s
- Ship: Support font-feature-settings descriptor in `@font-face` rule
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lfiEcwQrgQM
- Ship: CSS find-in-page highlight pseudos
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/U-6tIuuGtgo
- Ship: Web Speech API contextual biasing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FAoeEf5hcTg
- Ship: IP Protection in Incognito using published Masked Domain list
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EbdlJ3pc3NM
- **Ship: Deprecate special font size rules for H1 within some elements**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/owM01CWwoes
  - Outline Algorithm 由来のスタイル removal について
  - Firefox で段階的に removal が始まっていたが、139 と 140 の Stable で 100% remove され、regression の報告はなかったそう
  - Intent to unship: UA styles for h1 in article, aside, nav, section
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/CzG_pVa7pws/m/Ab3Bwsg2BQAJ
  - > Per discussion in #7867 (comment), Firefox has shipped this to stable for 2 releases at 100%. That meets the bar we've discussed above, so I think this is ready to merge.
  - I'll plan on doing that by Monday Japan time unless more discussion happens in the meantime.
    - https://github.com/whatwg/html/pull/11102#issuecomment-3055008310
  - よって、HTML においても削除 PR がマージされ、Chrome でも 140 Stable から removal される
  - https://chromestatus.com/feature/6192419898654720
- Ship: ToggleEvent source attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sf1UDcVAkxo
- Ship: Web Speech API contextual biasing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FAoeEf5hcTg
- **Ship: ARIA Notify API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QCtWzIPgcCY
- Ship: Add MediaStreamTrack support to the Web Speech API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4ibjEVQ-i0s
- **Ship: IP Protection in Incognito using published Masked Domain list**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EbdlJ3pc3NM
  - IP 保護機能は、Incognito モードにおいてユーザーの元の IP アドレスの利用を制限し、クロスサイトトラッキングに対する保護を強化することを目的としている。
  - 提案されたアプローチは、Masked Domain List(MDL)にリストされたドメインのみが影響を受ける形で、第三者コンテキストにおける IP アドレスの使用を制限するものである。
  - 1%の安定した Incognito 実験では、Core Web Vitals やクラッシュの増加に統計的に有意な変化は見られなかったが、今後のパフォーマンスと安定性の評価を慎重に行う予定である。
- Ship: Script Blocking in Incognito
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/g3GHFPl3Bbw
- Ship: ServiceWorkerAutoPreload
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7UYEFRdEg-g
- Ship: ServiceWorkerStaticRouterTimingInfo
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NqI9QfefGbo
- Ship: Support restrictOwnAudio
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5SZfg29iwPc
- Ship: ToggleEvent source attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sf1UDcVAkxo
- Ship: View Transitions: Inherit more animation properties
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6_-tSUpILRI
- Ship: IndexedDB getAllRecords() and direction option for getAll()/getAllKeys()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/h9Xk1cFORh0
- **Prototype: CSS hanging-punctuation**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5Vl2Du2fzT4
  - 行末に句読点が来た時、行長よりはみ出して配置する、均等割組版で良く使われる手法
  - `[ first || [ force-end | allow-end ] || last ]`
  - ぶら下げ必須の場合は `force-end` で、`punctuation` はコンテンツ幅計算から除外され、テキスト本体の整列が `punctuation` の影響を受けなくなる
  - 条件付きぶら下げの場合は `allow-end` で、`punctuation` はコンテンツ幅計算に神され、テキスト本体の整列が `punctuation` の影響を受ける。つまり、句読点が行内に収まる場合は、句読点が行の最後に来ることを許容する感じ
  - `last` は仕様上は `force-end` の定義だが、Safari は `allow-end` で実装している(というか allow-end のみサポート)
  - 仕様はどちらにした方がいいのかの議論が `open`。`force-end` で仕様変更なしの見込み
  - [css-text] `hanging-punctuation: last` should be "conditionally hang"
    - https://github.com/w3c/csswg-drafts/issues/12433
- **Prototype: Scoped Custom Element Registry**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/um-9YjJWyEQ
  - Apple からの仕様の更新についてアナウンス
  - Revamped Scoped Custom Element Registries · Issue #10854 · whatwg/html
  - https://github.com/whatwg/html/issues/10854
- Prototype: HDR headroom for drawing to 2D canvas
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/S7jaeH2J7Rw
- Prototype: CSSPseudoElement JS Interface
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/feSej8WpIew
- **Prototype: Document Policy: network-efficiency-guardrails reporting**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iuL_8IV_L5w
  - ウェブドキュメントは、最適化されていないネットワーク使用を検出・報告する機能を持ち、パフォーマンスへの影響を最小限に抑えることができる。
  - リソース使用の振る舞いを特定・フラグ付けすることで、開発者はユーザー体験をより良く管理し、スムーズなインタラクションと応答性の向上を図ることが可能となる。
  - 現在、埋め込まれたリソースや iframe がパフォーマンスを低下させる行動を防ぐメカニズムが存在せず、埋め込みドキュメントはユーザー体験の制御が困難である。
- Prototype: Mirroring of RTL MathML operators
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iU0jQWJZCEM
- **Prototype: Script Tools API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/W444JxsqxZw
  - MCP を Web でやる、みたいな API ぽい
  - Explainer も何もなく、雑に立てられて怒られてた
    - その後公開https://github.com/explainers-by-googlers/script-tools/blob/main/explainer.md
  - MS も似たような API を出してる
    - https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/WebModelContext/explainer.md
- **Prototype: Document Local Dictionary API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LB5SvNilyhA
  - 提案された API は、ユーザーがブラウザ内のドキュメントローカル辞書を変更できる機能を提供し、単語の追加、削除、確認が可能である。
  - この機能により、ドキュメントローカル辞書に登録された単語がスペルエラーとしてマークされることを防ぐことができる。
  - 現在の仕様では、既存の辞書内の単語を管理するために `element.spellcheck` 属性や `::spelling-error` CSS 擬似要素が使用されており、新しい API が必要とされている。
- Prototype: CSS Text Level 3 `text-align: match-parent`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9aAu_6PHeow
- Prototype: Crash reporting storage API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/F3JDegZ9Ukw
- **Prototype: Declarative Document Patching**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fdsXPaSLWZs
  - HTML コンテンツを順不同でストリーミングし、既存のドキュメントをエンコードされた「パッチ」のストリームで更新することにより、パフォーマンスの最適化を図る提案である。
  - この機能は、サーバーがドキュメントのコンテンツを生成するのが遅い場合に、DOM 内に早く表示される必要がある部分を効率的に処理することを目的としている。
  - 同一ドキュメントの更新をプラットフォームに組み込む形で開発者が利用できるようにするための大規模なイニシアティブの一部である。
- **Prototype: FormControlRange Interface**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Xg_dfObLp8c
  - FormControlRange は、AbstractRange を拡張した新しい Range オブジェクト。
  - フォームコントロール要素内のテキストの範囲を参照する手段を提供する。
  - これを使って RTE を `<div>` ではなく `<input>` の中でできるようにしようという提案。
- **Prototype: Layout Instability Attribution in CSS Pixels**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EMlUrEwx_uE
  - レイアウト不安定性の属性を CSS ピクセルで報告することに関するプロトタイプの意図が発表された。これにより、`prevRect`および`currentRect`がデバイスピクセルではなく CSS ピクセルで報告されることが提案されている。
  - この変更は、`getBoundingClientRect()`などの他の Web API との整合性を高め、レイアウトシフトデータの視覚化、デバッグ、デバイス間での統合を容易にすることを目的としている。
  - 変更は実行時フラグの背後で実装され、リスクは特にないとされている。
- **Prototype: `@custom-media`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/h6tFdnw20L0
  - 提案されている `@custom-media` ルールは、開発者が独自のメディアクエリを定義し、名前を付けることを可能にする機能である。
  - この機能は、レスポンシブデザインのコードをよりクリーンで保守しやすくし、繰り返しを減らすことに寄与する。
  - 開発者からの強い要望があり、Chromium のバグ報告には 233 のスターが付いているなど、広く支持されている。
- Ready for Developer Testing: CSS `caret-shape` property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uXQ-I34KQrU
- Ready for Developer Testing: Web Install API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ame_t7wN2cU
- **Ready for Developer Testing: CSS Masonry**
- https://groups.google.com/a/chromium.org/g/blink-dev/c/EVXdUNT7Nak
- **Ready for Developer Testing: Probabilistic Reveal Tokens**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jrZIVwGRXsg
  - プロバビリスティックリビールトークン(PRT)は、ビジネスが詐欺の推定、モデルのトレーニング、詐欺行動の分析を行うために導入され、ユーザーの IP アドレスを大規模に追跡する能力を軽減することを目的としている。
  - PRT は、ブラウザによって追加された新しい HTTP ヘッダーに含まれ、特定のドメインに対して送信されるプロキシリクエストに使用される。各 PRT は、発行者によって生成された暗号化された情報を含み、受信者は遅延後に復号化できる。
  - 開発者は、ローカル Chrome インスタンスを構成して PRT を取得し、特定のドメインへのネットワークリクエストに添付することができ、将来的には PRT を受け取るためにオリジンのサインアップが必要となる。
- Experiment: Extended lifetime shared workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tTiZrl6n_fA
- Extend Experiment: Playout Statistics API for WebAudio
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7O5rdHJeW2I
- Extend Experiment: Digital Credential API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Vj2tr_cAClk
- Extend Experiment: Enabling Web Applications to understand bimodal performance timings
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/A40TrnLYTqo
- Experiment: Fetch retry (for keepalive fetches)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PgarGIbrIhA
- Experiment: Clipboardchange event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JQb0t_esk1k
- Experiment: SharedWorker on Android
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_Lsfs08XX5c
- Extend Experiment: Cookie Deprecation Label
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WnIy9TTDXpk
- Extend Experiment:
- Change:
- Unship:
- Remove:
- PSA: View Transition finished promise timing change
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PPgNBAteKz4
- Web-Facing Change PSA: View Transition finished promise timing change
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PPgNBAteKz4


### Other

- web.dev
  - New to the web platform in June
    - https://web.dev/blog/web-platform-06-2025
    - Escape `<` and `>` in attributes when serializing HTML
    - The CSS Custom Highlight API
    - The Cookie Store API
    - Removal of mutation events
    - CSS functions in Chrome 138
    - Built-in AI APIs for translation, language detection, and summarization
    - Support for video frame orientation in WebCodecs
  - June 2025 Baseline monthly digest
    - https://web.dev/blog/baseline-digest-jun-2025
    - The New Stack covers Baseline
    - Baseline Newly and Widely available features
    - Vite 7.0 now targets Baseline Widely available
    - vscode.dev and codesandbox.io have inherited Baseline messaging
  - Is your app installed? getInstalledRelatedApps() will tell you!
    - https://web.dev/articles/get-installed-related-apps
  - **Take the State of HTML survey today**
    - https://web.dev/blog/state-of-html-2025
    - State of HTML 2025
      - https://survey.devographics.com/ja-JP/survey/state-of-html/2025
    - Influence the State of HTML 2025 Survey!
      - https://lea.verou.me/blog/2025/design-state-of-html/
      - 開始 2 週までの結果が Interop 2026 に反映される
- google for developers
  - https://developers.googleblog.com/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - CSS conditionals with the new `if()` function
    - https://developer.chrome.com/blog/if-article
  - **Brick by brick: Help us build CSS Masonry**
    - https://developer.chrome.com/blog/masonry-update
    - CSS Masonry が Chrome および Edge 140 以降で開発者向けのテストが開始され、フィードバックが重要であることが強調されている。
    - CSS Masonry は、アイテムをブロック状に配置するレイアウトモードであり、従来の CSS グリッドやフレックスボックスでは実現が難しい柔軟な配置が可能である。
    - 現在、CSS Working Group が CSS Masonry の仕様を策定中であり、開発者はデモを試してフィードバックを提供することが奨励されている。
  - **Join the Prompt API origin trial**
    - https://developer.chrome.com/blog/prompt-multimodal-origin-trial
- chromium blog
  - https://blog.chromium.org/
  - **Chromium Blog: Introducing Skia Graphite: Chrome's rasterization backend for the future**
    - https://blog.chromium.org/2025/07/introducing-skia-graphite-chromes.html
    - A brief history of Skia in Chrome
    - Results
    - Differences between Graphite and Ganesh
      - Modern graphics APIs
      - 2D depth(?!) testing
      - Multithreading
      - Performance cliffs and pipeline compilation
    - Future Plans
      - Multithreaded Rasterization
      - Reducing GPU memory for simple content
      - GPU Compute Path Rasterization
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
- search blog
  - https://developers.google.com/search/
- v8
  - https://v8.dev/
- other


## Firefox 動向

### Stable: 141


### Updates

- **Firefox 141.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/141.0/releasenotes/
  - タブグループの名前を AI で決めてくれる機能
  - Windows で WebGPU が有効に
  - CHIPS が再び有効に
- **Firefox 141 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/141
  - `<dialog closedby>`
- Highlights from Volunteer Contributors - These Weeks in Firefox: Issue 184
  - https://blog.nightly.mozilla.org/2025/07/01/highlights-from-volunteer-contributors-these-weeks-in-firefox-issue-184/


### Intents

- Ship: Render unknown MathML elements as an mrow
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/O29rXDKkO0c
- Ship: Atomics.waitAsync
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/aavkIMfCgxU/m/IE1yVdUUBAAJ
- Prototype and ship: Integrity-Policy
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/cZgY6hx8ERY/m/DpJQpHVuAAAJ
- Prototype:
- Change:
- Remove:
- Unship: CSS "`overflow: -moz-hidden-unscrollable`" (legacy alias for "`overflow: clip`")
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/XnmrGbMGum4/m/Bvj67e2NAwAJ


### Newsletter

- Engineering Effectiveness Newsletter (Q2 2025 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/I_iverPuBfE
- **Firefox Security & Privacy Newsletter - Q2 2025**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/AoCY84BYBzc/m/7a0HRRcIAgAJ
- **Performance Tools Newsletter (H1 Edition)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/zdWluoM2cd0/m/KDnN7utyAgAJ
- Firefox WebDriver Newsletter 141 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-141/


### MDN / Open Web Docs

- **Celebrating 20 years of MDN**
  - https://developer.mozilla.org/en-US/blog/mdn-turns-20/


### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2025-07-01+
- No planned
  - Web Neural Network API
    - https://github.com/mozilla/standards-positions/issues/1215


### Other


## Safari 動向

### Stable: 18.5


### Updates

- **Release Notes for Safari Technology Preview 222**
  - https://webkit.org/blog/17181/release-notes-for-safari-technology-preview-222/
  - Accessibility
  - CSS
    - Added support for implicit anchor elements for pseudo-elements with anchor functions.
  - Media
  - Rendering
  - Scrolling
  - Web API
- **Release Notes for Safari Technology Preview 223**
  - https://webkit.org/blog/17201/release-notes-for-safari-technology-preview-223/
  - CSS
    - Added support for allowing declarations directly inside `@scope` rule without a style rule ancestor.
  - JavaScript
    - Added support for Intl.Locale.prototype.variants getter.
  - Rendering
  - SVG
  - Text
  - Web API
  - Web Extensions
    - Added support for `dom.openOrClosedShadowRoot()` and element.openOrClosedShadowRoot.
  - Web Inspector
- **So many ranges, so little time: A cheatsheet of `animation-ranges` for your next scroll-driven animation | WebKit**
  - https://webkit.org/blog/17184/so-many-ranges-so-little-time-a-cheatsheet-of-animation-ranges-for-your-next-scroll-driven-animation/
  - アニメーションレンジの定義と重要性: `animation-range`は、要素がビューポートに表示される際にアニメーションの開始と終了を制御するために用いるプロパティであり、特にスクロール駆動のアニメーションにおいて重要な役割を果たす。
  - 異なるアニメーションレンジの種類: `cover`、`contain`、`entry`、`entry-crossing`、`exit`、および`exit-crossing`といったさまざまなレンジを使用することで、アニメーションの開始と終了のタイミングを細かく設定できる。
  - カスタマイズの柔軟性: アニメーションレンジは、タイムラインレンジ名と長さパーセンテージを組み合わせることで、ユーザーが望むアニメーションの動きやタイミングを細かく調整できるため、デザインの自由度が高まる。
- **Release Notes for Safari Technology Preview 224 | WebKit**
  - https://webkit.org/blog/17210/release-notes-for-safari-technology-preview-224/
  - Accessibility
  - Animations
    - Added support for animation-range, animation-range-start, animation-range-end, and animation-timeline properties for `::marker`.
  - CSS
  - Forms
  - Images
  - Rendering
  - Text
  - Web API
    - Added support for Element.currentCSSZoom.
    - Added support for userAgentAllowsProtocol in the Digital Credentials API.
  - Web Extensions
  - Web Inspector
    - Added support for @starting-style.


### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2025-07-01+
- Invalid
  - Web Neural Network API
    - https://github.com/WebKit/standards-positions/issues/486


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
- **Removing -ms-high-contrast and embracing standards-based forced colors in Microsoft Edge - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2025/06/30/removing-ms-high-contrast-and-embracing-standards-based-forced-colors-in-microsoft-edge/
  - `-ms-high-contrast`, `-ms-high-contrast-adjust` プロパティが Edge 138 から完全に削除
- **Microsoft Edge sets a new standard for speed and responsiveness - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2025/07/07/microsoft-edge-sets-a-new-standard-for-speed-and-responsiveness/
  - Microsoft Edge は、初期コンテンツの表示時間を 300ms 未満に短縮し、ユーザー体験の向上を図った。この目標は、ユーザー満足度に大きな影響を与えることが研究で示されている。
  - 過去数ヶ月の努力により、13 のブラウザ機能において平均 40%の読み込み時間短縮を達成し、設定、音声読み上げ、分割画面、ワークスペースなどの機能の応答性が向上した。
  - 今後も印刷プレビューや拡張機能など、さらなるパフォーマンス改善が予定されており、より快適でスムーズなブラウジング体験を提供することを目指している。


### Other


## WHATWG/W3C 動向

### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - CSS Positioned Layout Module Level 4
    - https://www.w3.org/news/2025/first-public-working-draft-css-positioned-layout-module-level-4/
    - Top Layer 系の追加が入ってる Level
  - Digital Credentials
    - https://www.w3.org/news/2025/first-public-working-draft-digital-credentials/
  - CSS Borders and Box Decorations Module Level 4
    - https://www.w3.org/news/2025/first-public-working-draft-css-borders-and-box-decorations-module-level-4/
    - `corner-shape` や `border-shape` などが入ってる Level
  - IMSC Text Profile 1.3
    - https://www.w3.org/news/2025/first-public-working-draft-imsc-text-profile-1-3/


### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- https://github.com/openui/design-system/tree/main/telecon
- open-ui/meetings/telecon/2025-07-10.md
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-07-10.md
  - [interest invokers] expected behavior when the `interestfor` link is broken #1240
- open-ui/meetings/telecon/2025-07-24.md
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-07-24.md
  - Working session (triage issues, review PRs, etc)


### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
- **Define customizable `<select>`**
  - https://github.com/whatwg/html/pull/10548
  - パーサの緩和と既存コンテンツモデルの変更(option にインタラクティブな要素は含められないので注意)、新しい要素(`<selectedcontent>`)の追加、`base-appearance` 時の UA StyleSheet 及び select の挙動の定義
- `<select>` attribute to switch between dropdown and listbox (`type` ?)
  - https://github.com/whatwg/html/issues/11452


### CSSWG

- https://www.w3.org/blog/CSS/
- https://lists.w3.org/Archives/Public/www-style/
- Minutes Telecon 2025-07-02
  - https://www.w3.org/blog/CSS/2025/07/03/minutes-2025-07-02/
  - Resolved: Allow shipping with `no-autospace` as initial value, continue discussing eventual default behavior (Issue #12386: Reconsider the initial value of the `text-autospace` property)
    - https://github.com/w3c/csswg-drafts/issues/12386
- Minutes Telecon 2025-07-09
  - https://www.w3.org/blog/CSS/2025/07/09/minutes-2025-07-09/
- Minutes Telecon 2025-07-16
  - https://www.w3.org/blog/CSS/2025/07/16/minutes-2025-07-16/
  - Resolved: `appearance: base-select` can be used to opt listbox selects into base appearance. control of listbox and multiple rendering will be improved in html (Issue #12468: Should `appearance: base-select` work on listbox selects? (`select size`/`select multiple`))
    - https://github.com/w3c/csswg-drafts/issues/12468


### Other

- **TPAC 2025: Registration**
  - https://www.w3.org/2025/11/TPAC/registration.html
- **W3C opens Inclusion Fund and Invited Expert Fund for TPAC 2025**
  - https://www.w3.org/news/2025/w3c-opens-inclusion-fund-and-invited-expert-fund-for-tpac-2025/
- Diversity report 2025
  - https://www.w3.org/news/2025/diversity-report-2025/
- Upcoming: IAB/W3C Workshop on Age-Based Restrictions on Content Access
  - https://www.w3.org/news/2025/upcoming-iab-w3c-workshop-on-age-based-restrictions-on-content-access/
- Public release of W3C's 2025-2028 strategic objectives initiatives
  - https://www.w3.org/blog/2025/public-release-of-w3cs-2025-2028-strategic-objectives-initiatives/~
  - W3C CEO の Seth Dobbs から、2025-2028 までの W3C の目標と戦略について
- **W3C Digital Credentials API publication: the next step to privacy-preserving identities on the web**
  - https://www.w3.org/blog/2025/w3c-digital-credentials-api-publication-the-next-step-to-privacy-preserving-identities-on-the-web/


## TC39 動向

### Meeting

- 2025-01
  - https://github.com/tc39/agendas
  - https://github.com/tc39/notes


### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2025-01-01}...main@{2025-02-01}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->2.7
- 2.7->3
- 3->4


### New Proposals


### WinterTC

- https://github.com/wintercg/admin/issues?q=label%3A%22meeting%22%20
- 2025-07-10 meeting agenda · Issue #123 · WinterTC55/admin
  - https://github.com/WinterTC55/admin/issues/123
  - Review of the notes for last meeting (5 min)
  - Approval of this meeting's agenda (2 min)


### Other


## IETF 動向

### WG

- RFC
- Work
- Meeting
  - reCAPTCHA and Web Bots Agents
    - https://datatracker.ietf.org/meeting/123/materials/slides-123-webbotauth-recaptcha-and-agents-00
    - IETF 123 で、Web で、AI Agent やクローラをどうやって識別するのかという議論 (Web Bot Auth BOF)
  - Draft OODA-HTTP - Behavioral Extension to HTTP (with TLS Runtime Coordination)
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2025JulSep/0041.html
    - OODA-HTTP プロトコルは、HTTP(1.1、2、3)に対する行動拡張を導入し、アプリケーション層での`Observe-Orient-Decide-Act` ループを適用する。
    - 新しいセマンティックヘッダ `X-OODA-Action`を導入し、TLS とのランタイム調整(例:KeyUpdate トリガー)を実施する。
    - ボット検出、セッションスコアリング、適応防御などのユースケースを含む軽量の「セマンティックベクターエンジン」を活用し、リアルタイムの脅威に対する適応的な応答を可能にする。


### Other


## 周辺動向

### ベンダー動向

- The crawl before the fall… of referrals: understanding AI's impact on content providers
  - https://blog.cloudflare.com/ai-search-crawl-refer-ratio-on-radar/
  - コンテンツ提供者は、従来の検索エンジンのクローラーによるトラフィックの増加を歓迎していたが、AI ボットによるクローリングは異なるモデルであり、元の出版物への訪問を必要としないことが多い。
  - 新しい指標が Cloudflare Radar で公開され、AI モデルがサイトに送るトラフィックとクローリングの頻度を比較することで、コンテンツ提供者が AI ボットの許可やブロックに関する意思決定を支援する。
  - コンテンツのクローリングとリファラルの比率が変化しており、クローリングが増加する一方で、実際のトラフィックは減少しているため、コンテンツ提供者は AI クローラーに対するポリシーを見直す必要がある。
- Control content use for AI training with Cloudflare's managed robots.txt and blocking for monetized content
  - https://blog.cloudflare.com/control-content-use-for-ai-training/
  - Cloudflare は、ウェブサイトオーナーが AI ボットによるコンテンツのアクセスを管理できる 2 つの新しいツールを提供し、特に robots.txt ファイルを自動的に作成・管理する機能を追加した。
  - ウェブサイトオーナーは、広告収益を得ている部分に対してのみ AI ボットをブロックする新しいオプションを選択でき、これにより収益を保護しつつ、必要なページへのアクセスは許可することが可能になる。
  - AI トレーニング用のクローラーの増加に伴い、Cloudflare は顧客に対してより細かな制御を提供し、AI ボットの活動を管理するための新しい機能を導入した。
- Introducing pay per crawl: enabling content owners to charge AI crawlers for access
  - https://blog.cloudflare.com/introducing-pay-per-crawl/
  - Cloudflare は、コンテンツ制作者が AI クローラーに対してアクセスを有料で提供できる「pay per crawl」機能を導入し、コンテンツの収益化を支援することを目指している。
  - この仕組みでは、クローラーがアクセスを要求する際に、支払い意図を示すヘッダーを送信し、成功した場合は HTTP 200 レスポンスを受け取るか、支払いが必要な場合は HTTP 402 レスポンスを受け取ることができる。
  - コンテンツ所有者は、全サイトにわたる一律の価格設定や特定のクローラーに対する無料アクセスの許可、またはアクセスの完全拒否を選択できる柔軟性を持つ。
- From Googlebot to GPTBot: who's crawling your site in 2025
  - https://blog.cloudflare.com/from-googlebot-to-gptbot-whos-crawling-your-site-in-2025/
  - ウェブクローラーの役割が AI の台頭により進化しており、特に GPTBot や Meta-ExternalAgent などの AI 専用クローラーが急成長していることが確認された。
  - Googlebot は、2024 年 5 月から 2025 年 5 月の間に 96%の成長を遂げ、全体のクローリングシェアが 30%から 50%に増加し、AI 関連機能の強化が影響していると考えられる。
  - ウェブサイトの運営者は、robots.txt を使用してクローラーのアクセスを管理することができるが、AI クローラーに対する明確な許可や拒否のルールが少なく、より強力な防御手段への移行が進んでいる。
- Content Independence Day: no AI crawl without compensation!
  - https://blog.cloudflare.com/content-independence-day-no-ai-crawl-without-compensation/
  - コンテンツクリエイターと AI クローラーの関係が変化しており、Google の検索トラフィックが減少する中、AI がその代替となりつつある。
  - Cloudflare は、AI クローラーがクリエイターのコンテンツを利用する際に報酬を支払うことを求める「コンテンツ独立記念日」を宣言し、クリエイターの価値を保護する取り組みを開始した。
  - 新たなビジネスモデルでは、トラフィックではなく知識の向上に基づいてコンテンツの価値を評価し、高品質なコンテンツ創出の新たな時代を目指す。
- Message Signatures are now part of our Verified Bots Program, simplifying bot authentication
  - https://blog.cloudflare.com/verified-bots-with-cryptography/
  - Cloudflare は、HTTP メッセージ署名を「Verified Bots Program」に統合し、ボットの認証を簡素化することを発表した。この新しい手法により、ボットオペレーターはより迅速に認証を受けることが可能になる。
  - ボットトラフィックの管理を行うサイトオーナーにとって、メッセージ署名は正当なボットトラフィックの識別を向上させ、偽装攻撃のリスクを軽減する。
  - Cloudflare は、ボットオペレーターに対してメッセージ署名の使用を推奨し、これにより従来の認証手法よりも信頼性の高い認証方法を提供することを目指している。
- Igalia WebKit Team | WebKit Igalia Periodical #29
  - https://blogs.igalia.com/webkit/blog/2025/wip-29/
  - WebKit の GTK および WPE ポートにおける WebXR サポートが大幅に改修され、多プロセスアーキテクチャに適合するように再実装が進められている。
  - std::variant の使用が mpark::variant に置き換えられ、WebKit ライブラリのサイズが約 1MB 削減された。
  - Android 向けの WPE WebKit で、logd サービスへのログ送信機能が改善され、デバッグが容易になった。
- Igalia WebKit Team | WebKit Igalia Periodical #30
  - https://blogs.igalia.com/webkit/blog/2025/wip-30/
  - WebKit において、IPv6 スコープ ID の DNS 応答に対するサポートが修正された。
  - JSC の開発者ビルドにおいて、フレームポインタがデフォルトで有効化され、より有用なバックトレースが可能となった。
  - 絵文字フォントの選択が仕様により近づけられ、フォールバックフォントを選ぶ際に選択が尊重されるよう改善された。
- Igalia WebKit Team | WebKit Igalia Periodical #31
  - https://blogs.igalia.com/webkit/blog/2025/wip-31/
  - WebKit において、shared-mime-info パッケージが未インストールのプラットフォームでのリソースローダーの修正や、SQLite の使用に関する修正が行われた。
  - GStreamer ベースの WebRTC 実装において、デフォルトの DTLS 証明書の暗号化強化や依存関係の削除が進行中であり、互換性向上が期待される。
  - GNOME Web Canary ビルドが数週間にわたり停止しており、WebKitGTK のビルド依存関係の更新により、早急な修正が必要とされている。
- **Playing with the new caret CSS properties**
  - https://blogs.igalia.com/mrego/playing-with-the-new-caret-css-properties/
  - `caret-animation` と `caret-shape` を使用した実験
  - Chromium では `caret-animation` が 139 から利用可能で、`caret-shape` は開発中
  - 特にブロック形状や色のアニメーションを用いたカーソルのカスタマイズが可能であることが強調されている。
- **Cloudflare 1.1.1.1 incident on July 14, 2025**
  - https://blog.cloudflare.com/cloudflare-1-1-1-1-incident-on-july-14-2025/
  - 2025 年 7 月 14 日、Cloudflare の 1.1.1.1 DNS リゾルバーサービスが 62 分間のダウンタイムを経験し、全世界のユーザーに影響を及ぼした。この障害は、内部の設定エラーによるものであり、攻撃や BGP ハイジャックによるものではなかった。
  - 障害は、6 月 6 日に行われた設定変更が原因で、1.1.1.1 の IP アドレスが誤って非稼働のサービスにリンクされ、グローバルにルートが撤回されたことによって発生した。
  - Cloudflare は、今後同様の問題を防ぐために、レガシーシステムの廃止と段階的なアドレス展開の導入を進める計画を発表した。


### セキュリティ動向

- **Troy Hunt: Passkeys for Normal People**
  - https://www.troyhunt.com/passkeys-for-normal-people/
  - Have I Been Pwned の Troy による紹介
  - Mailchimp で引っかかった詐欺をきっかけに


### Other

- **欧州アクセシビリティ法の完全施行**
  - https://www.mitsue.co.jp/knowledge/column/20250708.html
  - EU 市場において販売・提供されるデジタルサービスを、アクセシブルなものとするための法律「欧州アクセシビリティ法(European Accessibility Act)」への準拠が義務化
  - EAA の参照する欧州規格、EN 301 549 に自社製品・サービスを対応させることが求められるように
  - たとえ本社が日本にあろうとも、EU 加盟国においてデジタル製品・サービスを販売している企業であれば、EAA の適用対象となる可能性がある
- **Web Bucks**
- https://bkardell.com/blog/WebBucks.html
- Micropayments の動きが標準の外で進んでいる
- Google Ads で先月 Offerwall が発表されていた。Medium のプレミアムコンテンツ閲覧ダイアログのようなものを、Google Ads レベルで出す
  - Monetization options that prioritize audience choice
  - https://blog.google/products/ads-commerce/offerwall-gives-publishers-more-options-audiences-more-control/
- **Google exec says the company will unify Android and ChromeOS**
  - Google says it will be the 'ChromeOS experience on top of Android'
  - https://9to5google.com/2025/07/14/chromeos-experience-android/
  - Chromium Blog: Building a faster, smarter, Chromebook experience with the best of Google technologies
    - https://blog.chromium.org/2024/06/building-faster-smarter-chromebook.html


## イベント

- 7 月
  - 19-25: IETF | IETF 123 Madrid
    - https://www.ietf.org/meeting/123/
- 8 月
- 9 月


## Wrap Up

- Chrome
  - Ship
    - セクション内 `h1` のスタイル廃止
    - `ariaNotify`
    - IP Protection in Incognito
  - Prototype
    - `hanging-punctuation`
    - Script Tools API
    - Document Local Dictionary API
    - Declarative Document Patching
    - FormControlRange
    - Layout Instability Attribution in CSS pixels
    - `@custom-media`
  - PSA
    - CSS Masonry developer testing
  - web.dev
    - State of HTML
  - Chrome Developers
    - CSS Masonry
    - Prompt API Origin trial
  - Chromium blog
    - Skia Graphite
- Firefox
  - 141
    - WebGPU on Windows
    - CHIPS re-enabled
    - `<dialog closedby>`
  - MDN Blog
    - 20 years
  - other
    - Security & Privacy newsletter Q2 2025
- Safari
  - TP 222
    - バグ修正
  - TP 223
    - bare declarations in `@scope`
  - TP 224
    - `Element.currentCSSZoom`
  - other
    - `animation-range`
- Edge
  - Removing `-ms-high-contrast`, `-ms-high-contrast-adjust`
  - Edge の Browser UI の速度改善
- W3C/WHATWG
  - Draft
    - FPWD
      - Positioned Layout - Top Layer, `::backdrop` など
      - Digital Credentials
      - Borders and Box Decorations - `corner-shape` や `border-shape`
  - Open UI
  - WHATNOT meeting
    - Define customizable `<select>`
    - `<select>` attribute to switch between dropdown and listbox
  - CSSWG meeting
    - text-autospace
  - Other
    - TPAC 2025 Registration Open
    - TPAC 2025 Inclusion Fund for Invited Expert
- TC39
  - 次回
  - WinterTC
- IETF
  - マドリード開催中なので次回
- 周辺動向
  - ベンダー動向
    - Cloudflare 周りで AI 向け pay wall や利益還元などの話
    - 1.1.1.1 の 62 分ダウン
  - セキュリティ動向
    - Have I Been Pwned の Troy さんのフィッシング被害振り返り
  - Cookie 動向
    - 今回でおしまい
  - Other
    - 欧州アクセシビリティ法完全施行
    - Chrome OS がシュリンクして Android とマージ?