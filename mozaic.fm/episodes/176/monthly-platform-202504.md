---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep176.mp3
published_at: 2025-04-24
guest: [@myakura](https://github.com/myakura)
guest: [@saku](https://x.com/sakupi01)
---

# ep176 Monthly Platform 202504

## Theme

第 176 回のテーマは 2025 年 4 月の Monthly Platform です。


## Show Note

### Chrome 動向

#### Stable: 136


#### Updates

- **Chrome 136 beta**
  - https://developer.chrome.com/blog/chrome-136-beta
  - CSS and UI
    - CSS dynamic-range-limit property
    - Ignore letter spacing in cursive scripts
    - **Partitioning `:visited` links history**
    - **Rename string `attr()` type to raw-string**
    - **Type-agnostic `var()` fallback**
    - Unprefixed print-color-adjust
  - Web APIs
    - AudioContext interrupted state
    - Blob URL partitioning: Fetching/Navigation
    - Call stacks in crash reports from unresponsive web pages
    - Captured Surface Control API
    - CapturedSurfaceResolution
    - Dispatch click events to captured pointer
    - Explicit compile hints with magic comments
    - FedCM updates: Multiple IdPs support, removal of "add another account" feature in passive mode
    - **Fluent scrollbars**.
    - H265 (HEVC) codec support in WebRTC
    - H26x Codec support updates for MediaRecorder
    - IP address logging and reporting in Chrome Enterprise
    - Incorporate navigation initiator into the HTTP cache partition key
    - Language support for CanvasTextDrawingStyles
    - Permissions Policy reports for iframes
    - Predictable reported storage quota
    - Private Aggregation API: Aggregate error reporting
    - RegExp.escape
    - Speculation rules: tag field
    - Strict Same Origin Policy for the Storage Access API
    - Update ProgressEvent to use double type for loaded and total
    - Use DOMPointInit for getCharNumAtPosition, isPointInFill, isPointInStroke
    - Web Authentication conditional create (Passkey upgrades)
    - WebGPU: GPUAdapterInfo isFallbackAdapter attribute
  - New origin trials
    - Audio Output Devices API: `setDefaultSinkId()`
    - Let web applications understand bimodal performance timings
    - Device Bound Session Credentials
    - Update of canvas text rendering implementation
  - Deprecations and removals
    - Deprecate getters of Intl Locale Info
    - Remove `HTMLFencedFrameElement.canLoadOpaqueURL()`.
    - Contribute
    - Related content
    - Follow


#### Intents

- Ship: WebGPU: `copyBufferToBuffer` overload
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rjtrmhywpf0
- Ship: Dynamic safe area insets
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hXkimpjYaMg
  - Android にも Ship
- Ship: JavaScript Promise Integration
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/w_jCD4gf7Bc
- Ship: Align error type thrown for 'payment' WebAuthn credential creation: SecurityError => NotAllowedError
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZGfGVr0hNlU
- **Ship: Document-Isolation-Policy**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cFuPRXcpc84
- Ship: Allow to reference an external document's root element by omitting the fragment.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2IWiMTU8j9M
- Ship: Pushsubscriptionchange event upon resubscription
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_ckNx_SZIjc
- Ship: Support transform attribute on SVGSVGElement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/I2J9kpx7U9I
- Ship: Ignore Letter Spacing in Cursive Scripts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/K_tGT0tTJoM
- **Implement and ship: Support offset-path: `shape()`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ls5D7zDNQj8
- Implement and Ship: Integrity Policy for scripts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Q304_OkDAZA
- Prototype: Extend CSP `script-src` (aka script-src-v2)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Nt7Baj6Yvvs
- Prototype: User-Agent Client Hints `"ch-ua-high-entropy-values"` permissions policy
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zyxVc8PLXPc
- Prototype: Limiting Access to Local Fonts
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UBFXwrOu6ow
- Prototype: Web App Manifest: "update_token" and update eligibility
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fWPN6TDuv-4
- Prototype: Pushsubscriptionchange event upon resubscription
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BYoV9Zrn6Os
- Prototype: WebXR Depth Sensing Performance Improvements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9AR5m2Jvn7s
- **Prototype: Private Proof API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ND7uCLZlyG4
- Prototype: Policy-controlled feature `manual-text`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JISRS7BIAVw
- Prototype: Policy-controlled feature `autofill`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xT5ZVuSo4HY
- Experiment: Rewriter API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LgPGLOV2vrc
- Experiment: Writer API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LFaidO_GmIU
- Experiment: Pause media playback on not-rendered iframes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_HuO-G0rn1E
- Ready For:
- Extend Experiment: Digital Credential API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GBjkRkSKI9c
- Extend Experiment: WebAuthn attestationFormats
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/N6Y2g7p1YAc
- Extend Experiment: Translator API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5DikAhbCv7M
- Extend Experiment: Summarizer API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/u2MRIDCBZQg
- Extend Experiment: Interest Invokers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0aqsckMRjH8
- Change:
- Unship:
- **Deprecate and Remove: Remove auto-detection of ISO-2022-JP charset in HTML**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yIgrr5YNGJ4
- PSA: FedCM syntax changes for use other account and account labels
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-qc3uEV5ZCo
- Web-Facing Change PSA: Navigations can now be captured into an installed PWA
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xl1hGAfxlA0
- Ready for Developer Testing: Web Authentication immediate mediation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zC13ioLIZ_E


#### Other

- web.dev
  - https://web.dev/
- google for developers
  - https://developers.googleblog.com/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - https://developer.chrome.com/blog/
  - **Making `:visited` more private**
    - https://developer.chrome.com/blog/visited-links
  - Insights sidebar in the DevTools Performance panel
    - https://developer.chrome.com/blog/devtools-insights-sidebar
  - More accurate DevTools performance debugging using real-world data
    - https://developer.chrome.com/blog/devtools-grounded-real-world
  - Use `shape()` for responsive clipping
    - https://developer.chrome.com/blog/css-shape
  - **What is a Chrome Finch experiment?**
    - https://developer.chrome.com/docs/web-platform/chrome-finch
    - chrome://version/?show-variations-cmd
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
  - Taming the Wild West of ML: Practical Model Signing with Sigstore
    - https://security.googleblog.com/2025/04/taming-wild-west-of-ml-practical-model.html
- search blog
  - https://developers.google.com/search/
- v8
  - https://v8.dev/
- other
  - 【山田祥平の Re:config.sys】フォントが変われば世界の見え方も変わる - PC Watch
    - https://pc.watch.impress.co.jp/docs/column/config/2006241.html
    - Windows の Chrome/Edge のデフォルトフォントが Noto Sans に変わったことによる反応
  - **Here's an update on our use of country code top-level domains.**
    - https://blog.google/products/search/country-code-top-level-domains/
    - Google 検索の URL についてすべての ccTLD (e.g. google.co.jp) が google.com へリダイレクトされることに
  - **G̶o̶o̶g̶l̶e̶r̶… ex-Googler. April 10, 2025**
    - https://nerdy.dev/ex-googler
    - Adam Argyle がレイオフされた
  - **Anti-climax - Bram.us**
    - https://www.bram.us/2025/04/14/anti-climax/
    - チームオフサイト中、Google I/O の登壇直前だった
  - **chromium/src - 6b6c58d9a6 - Remove myself from all OWNERS files as I'm being laid off.**
    - https://chromium.googlesource.com/chromium/src/+/6b6c58d9a67f6bffdec56e9a210f3a3171aa5b8e
    - Chrome の初期から関わっている Peter Kasting がレイオフされた
  - **Next steps for Privacy Sandbox and tracking protections in Chrome**
    - https://privacysandbox.com/news/privacy-sandbox-next-steps/
    - https://blog.google/intl/ja-jp/company-news/technology/privacy-sandbox-next-steps/
    - 3rd Party Cookie Deprecation をやめる
    - プロンプトも出さない


### Firefox 動向

#### Stable: 137


#### Updates

- **Firefox 137.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/137.0/releasenotes/
  - タブグループ
  - アドレスバーの検索 UI 改良
  - 開発者ツールのフォントパネルでフォントのメタデータを確認可能に
  - 開発者ツールのネットワークパネルでローカルオーバーライドが可能に
- **Firefox 137 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/137
  - `hyphenate-limit-chars`
  - `Math.sumPrecise()`
  - `Atomics.pause()`
- Putting up Wallpaper - These Weeks in Firefox: Issue 178
  - https://blog.nightly.mozilla.org/2025/04/07/putting-up-wallpaper-these-weeks-in-firefox-issue-178/
- **Shipping Temporal | SpiderMonkey JavaScript/WebAssembly Engine**
  - https://spidermonkey.dev/blog/2025/04/11/shipping-temporal.html
  - 1 人のコントリビューターにより Temporal が実装
- Mozilla's CEO weighs in on U.S. v. Google
  - https://blog.mozilla.org/en/mozilla/internet-policy/mozilla-ceo-on-google-antitrust/


#### Intents

- Ship:
  - `Clear-Site-Data: "cache"` directive for Network cache cleaning
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/tTkLvudz9MA
  - The new white-space normalizer of HTMLEditor
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/AApo_nCuR78
  - HTMLDialogElement requestClose
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/I0wpAR0S75Q
  - **hidden=until-found and auto-expanding `<details>`**
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/OksEjo055ps
- Prototype:
  - endpoint-inclusive commitStyles
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/7p11iesCdbA
  - Escape `"<"` and `">"` in attributes when serializing HTML
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/S01KRQ_NpDU
- Change:
  - Single tap may be retargeted to clickable element around the tapped point
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/TcrfZpO2KNw
- Remove:
  - **Unship: UA styles for h1 in article, aside, nav, section**
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/CzG_pVa7pws
    - 138 beta では rollout を 100% にする
    - stable では 10% rollout する


#### Newsletter


#### MDN / Open Web Docs

- **Default styles for h1 elements are changing**
  - https://developer.mozilla.org/en-US/blog/h1-element-styles/
- **Launching the W3C Docs Community Group**
  - https://openwebdocs.org/content/posts/w3c-docs-cg/
- **Customizable select elements**
  - https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select


#### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2025-04-01+
- defer
  - [HTML] Canvas place element · Issue #1076 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/1076
  - WebXR Hand Input Module - Level 1 · Issue #1070 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/1070
  - WebXR Raw Camera Access API · Issue #667 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/667
  - WebXR Depth Sensing Module · Issue #487 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/487
  - WebXR dynamic viewport scaling · Issue #473 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/473
  - WebXR Layers API · Issue #412 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/412
  - WebXR Anchors Module · Issue #351 · mozilla/standards-positions
    - https://github.com/mozilla/standards-positions/issues/351


#### Other

- **Joining Mozilla - Keith Cirkel**
  - https://www.keithcirkel.co.uk/joining-mozilla/


### Safari 動向

#### Stable: 18.4


#### Updates

- Release Notes for Safari Technology Preview 216 | WebKit
  - https://webkit.org/blog/16731/release-notes-for-safari-technology-preview-216/
  - Accessibility
  - CSS
    - Added additional support for text-wrap-style: pretty to now adjust all lines in the text box to improve rag and hyphenation.
  - Forms
  - Media
  - Rendering
  - Service Workers
  - SVG
  - Text
  - URLs
  - Web Animations
    - Added support for the Animation property overallProgress.
  - Web API
  - Web Inspector
- **Better typography with text-wrap pretty | WebKit**
  - https://webkit.org/blog/16547/better-typography-with-text-wrap-pretty/
  - Better typography
    - Web line layout since 1991
  - text-wrap: pretty
    - Take a look
    - Performance
    - When to use pretty vs balance?
  - text-wrap: balance
  - text-wrap: avoid-short-last-lines
  - text-wrap: auto
  - text-wrap: stable
  - text-wrap-mode and text-wrap-style
- **The CSS `shape()` function | WebKit**
  - https://webkit.org/blog/16794/the-css-shape-function/
  - `path()`で相対値を指定できるようになったイメージ。カスタムプロパティも取れる
- Release Notes for Safari Technology Preview 217 | WebKit
  - https://webkit.org/blog/16824/release-notes-for-safari-technology-preview-217/
  - CSS
  - Forms
  - JavaScript
  - Media
  - Rendering
  - SVG
  - Tables
  - Web API
    - Added support for scrollMargin in IntersectionObserver.
    - Added support for the alg parameter when importing or exporting Edward's-curve based JSON Web Keys in WebCrypto.
  - Web Extensions
    - Added support for exporting and importing data from worker targets in the Timelines tab.
    - Added a a badge for `<slot>` to quickly jump to the assigned node in the Elements tab.
  - Web Inspector
  - WebRTC
    - Added support for exposing CSRC information for RTCEncodedVideoStream.
    - Added serialisation of RTCEncodedAudioFrame and RTCEncodedVideoFrame.
    - Added support for ImageCapture.grabFrame.


#### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2025-04-01+
- support
  - Scoped Custom Element Registries · Issue #38 · WebKit/standards-positions
    - https://github.com/WebKit/standards-positions/issues/38


#### Other


### Edge 動向

#### Stable:


#### Updates

- https://blogs.windows.com/msedgedev/
  - ここがメイン
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見れる
- https://twitter.com/MSEdgeDev
  - これを見るしか無い
- Deprecating `window.external.getHostEnvironmentValue()` - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2025/04/03/deprecating-window-external-gethostenvironmentvalue/
- Significant performance improvements with Edge 134 - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2025/04/10/significant-performance-improvements-with-edge-134/
- Contextual logging with `console.context()` - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2025/04/22/contextual-logging-with-console-context/


#### Other

- Vibe-coding for security - text/plain
  - https://textslashplain.com/2025/04/15/vibe-coding-for-security/


### WHATWG/W3C 動向

#### Draft

- Recommendation
- UI Events KeyboardEvent key Values
  - https://www.w3.org/TR/2025/REC-uievents-key-20250422/
- UI Events KeyboardEvent code Values
  - https://www.w3.org/TR/2025/REC-uievents-code-20250422/
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
- Privacy-Preserving Attribution: Level 1
  - https://www.w3.org/TR/2025/WD-privacy-preserving-attribution-20250422/
  - Meta/Mozilla による提案
- **CSS Gap Decorations Module Level 1**
  - https://www.w3.org/TR/2025/WD-css-gaps-1-20250417/
  - `column-rule`や`row-rule`
  - Grid や Flexbox のみならず、Masonry についての記述も含まれている
- ContentEditable
  - https://www.w3.org/TR/2025/WD-content-editable-20250325/


#### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
  - **[menu] Navigation vs menu items use case #1193**
    - https://github.com/openui/open-ui/issues/1193
    - menu の設計においてナビゲーション用途をどう扱うか
    - Link を含む Navigation Menu パターンと、単なるアクションコマンドを含む Menu は区別される
    - `<nav>` & `<li>` & `<a>` で実現しているやつの menu 版を作りたいけど、これを単純に menu に当てはめていいかというとそうではない
    - 今策定しようとしているのはアクションコマンド用の `<menubar>`, `<menuitem>`, `<menulist>` 。そのままだと、Navigation Menu パターンは実現できない。
    - 解決したというよりかは、意見を募らないとね。という結論に至っている
  - [menu] How should we group checkboxes and radios, and how should we decide if they are checkboxes or radios? #1189
    - https://github.com/openui/open-ui/issues/1189
    - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-04-17.md
    - `<menuitemcheckbox>` と `<menuitemradio>` という独立した要素(現状提案)ではなく、`<menuitem>` に対して、親の `<fieldset>` に属性を追加して radio か checkbox かを指定する方向に議論が傾く
  - [menu] improve distinction between `menubar` and toolbar #1188
    - https://github.com/openui/open-ui/issues/1188
    - menu で toolbar も実現する予定だったけど、アクセシビリティ的な差分から、別枠で考慮されることになる動き
- Move `focusgroup` to non-active proposals menu
  - https://github.com/openui/open-ui/pull/1195
  - Especially as it might be that the menu proposal + customisable select etc end up superseding the primitive
  - より高レベルな menu や select が出てきたため、focusgroup の優先度が下がった


#### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
- Upcoming WHATNOT meeting on 2025-04-03
  - https://github.com/whatwg/html/issues/11170
  - cancel
- Upcoming WHATNOT meeting on 2025-04-17
  - https://github.com/whatwg/html/issues/11192


#### Other

- W3C Breakouts Day 2025
  - https://www.w3.org/2025/03/breakouts-day-2025/
  - 先月の引き継ぎ
    - More performant, diverse Web engines - 26 March 2025
      - https://www.w3.org/2025/03/26-diverse-engines-minutes.html
      - 中国圏の MiniApps とかのユースケースからプロファイルを作りたいという話
      - Adaptive Web Engines - adaptive-engines-breakouts-2025.pdf
      - https://www.w3.org/2025/Talks/adaptive-engines-breakouts-2025.pdf
      - More performant, diverse Web engines
      - https://www.w3.org/2025/Talks/adaptive-discussion-breakouts-2025.html
    - Simplifying Site Navigation: A Standardized Approach for Accessible Destinations - 26 March 2025
      - https://www.w3.org/2025/03/26-adapt-minutes.html
      - 認知や学習障害のケースで、統一的なナビゲーションを提案したい
      - link 要素の rel 属性の語彙を増やす
    - DOM Parts · Issue #19 · w3c/breakouts-day-2025
      - https://github.com/w3c/breakouts-day-2025/issues/19
    - How would AI Agents change the Web platform? - 26 March 2025
      - https://www.w3.org/2025/03/26-ai-agents-minutes.html
    - web-features and Baseline - We're feature complete! What's next? - 26 March 2025
      - https://www.w3.org/2025/03/26-web-baseline-minutes.html
    - **Vectors of Neglect - 26 March 2025**
      - https://www.w3.org/2025/03/26-svg-neglect-minutes.html
      - 開発者からの求めが多いが蔑ろにされている SVG について
      - SVG 仕様がメンテされてない。WG 動いていない
      - SVG 2.0 は夢をみすぎて実装者とのコミュニケーションがとれていなかった
      - SVG 1.1 テストスイートも古く安定していない
      - 今後どうするか?
    - **Collective funding, governance and prioritization of browser engine projects - HedgeDoc - collective-breakouts-2025.pdf**
      - https://www.w3.org/2025/Talks/collective-breakouts-2025.pdf
      - Igalia は機能に対してスポンサーがある
      - プロジェクトに対するスポンサーにできないか
    - **Template Instantiation · Issue #20 · w3c/breakouts-day-2025**
      - https://github.com/w3c/breakouts-day-2025/issues/20
      - https://www.w3.org/2025/03/26-webcomponents-minutes.html
      - DOM Parts の性能はそこまで良くない
      - やるとしても Template Instantiation はマストな要件
    - Scoped custom element registry · Issue #18 · w3c/breakouts-day-2025
      - https://github.com/w3c/breakouts-day-2025/issues/18
    - Revisiting in-band text tracks in MediaSource Extensions
      - https://github.com/w3c/breakouts-day-2025/issues/14
- **CSS multicol block direction wrapping - Rachel Andrew**
  - https://rachelandrew.co.uk/archives/2025/04/04/css-multicol-block-direction-wrapping/
  - https://drafts.csswg.org/css-multicol-2/#cwr
  - `column-count`を保ちつつ、ブロック方向に折り返せるようにする `column-wrap`, `column-height`の提案
- WCCG
  - Sessions for March 26th W3C Breakout Day 2025 · Issue #1095 · WICG/webcomponents
    - https://github.com/WICG/webcomponents/issues/1095
  - DCE Breakout #2 · Issue #109 · w3c/webcomponents-cg
    - https://github.com/w3c/webcomponents-cg/issues/109
    - https://docs.google.com/document/d/1MV7OTxlrU67x4Z0O9jgtIsRCya5LP04Jyf91aNr2Bqs/edit
- CSSWG
  - **[css-display] create a display property value for visually hiding an element while making it available for AT**
    - https://github.com/w3c/csswg-drafts/issues/560
    - Closed as completed
  - [css-env][css-values] UAs inconsistent in how OS font settings affect the default font-size `medium`
    - https://github.com/w3c/csswg-drafts/issues/10674#issuecomment-2750125931
    - 「preferred-text-scale」とし、medium キーワードが様々なズーム設定とどのように相互作用するかを定義する作業を続ける
  - **CSS view transition auto name generation · Issue #1001 · w3ctag/design-reviews**
    - https://github.com/w3ctag/design-reviews/issues/1001#issuecomment-2803634513
    - > we agree with Jake that auto is not the right keyword for this fallback behavior
  - [css-view-transitions-2] Revisiting view-transition-name: auto keyword name · Issue #12091 · w3c/csswg-drafts
    - https://github.com/w3c/csswg-drafts/issues/12091
- Proposal to endorse Vision for W3C as a W3C Statement | 2025 | News | W3C
  - https://www.w3.org/news/2025/proposal-to-endorse-vision-for-w3c-as-a-w3c-statement/
- **Proposal: a DocumentFragment whose nodes do not get removed once inserted · Issue #736 · whatwg/dom**
  - https://github.com/whatwg/dom/issues/736#issuecomment-2802695109
  - DOM Parts よりも軽量な `NodeGroup` で話が進んでいそう
- Breakouts 2025: Collective
  - https://bkardell.com/blog/Breakouts2025.html


### TC39 動向

#### Meeting

- 2025-04
  - 来月


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

- https://github.com/wintercg/admin/issues?q=label%3A%22meeting%22%20
- 2025-04-03 meeting agenda · Issue #111 · wintercg/admin
  - https://github.com/wintercg/admin/issues/111
  - https://github.com/wintercg/admin/blob/81f5446ead9d8b36560f2571474257db6b2ba2f3/meetings/2025-04-03.md
  - 4.1 Web Platform Test review
  - 4.2 Fetch Specification review


#### Other

- Proposal is withdrawn · Issue #394 · tc39/proposal-record-tuple
  - https://github.com/tc39/proposal-record-tuple/issues/394


### IETF 動向

#### WG

- RFC
- Work
- Meeting


#### Other


### 周辺動向

#### ベンダー動向

- **Brave Software Asia、日本のユーザーに向けた新たな取り組みを開始 〜LINE ヤフーとの協力により、より多くの人にローカライズされた快適なオンライン体験を提供〜 | Brave**
  - https://brave.com/ja/blog/japan-search-announce/
  - > 日本における Brave の月間アクティブユーザー(MAU)が 500 万を突破する中、この取り組みを通じてさらに多くのユーザーに Brave の価値を届け、よりカスタマイズされた快適なオンライン環境を提供してまいります。
  - > Brave ブラウザ内での利便性を向上させ、日本のユーザーが LINE ヤフーの提供するサービスをスムーズに利用できる環境を整備します。
- **AI Policy Update Proposal · servo/servo · Discussion #36379**
  - https://github.com/servo/servo/discussions/36379
  - Servo の貢献で Copilot などを限定的に認めるよう AI ポリシーを改訂する提案がでた
    - 翻訳、表現の改善などコードに関与しない貢献で認める
    - コードの貢献はまず Servo のメンテナーが GitHub Copilot で 1 年試したのちに改めて判断する
    - TSC では多くが提案に賛成しているが、一部が反対。コミュニティはかなり反対傾向
    - https://github.com/servo/servo/discussions/36379#discussioncomment-12898169
      - 否決され、現状のポリシーを維持することになった
- **Update on Spain and LaLiga blocks of the internet - Vercel**
  - https://vercel.com/blog/update-on-spain-and-laliga-blocks-of-the-internet
  - スペインで、違法なサッカーストリーミングサービスを止めるために ISP に IP ブロックを要請した
  - それが Cloudflare や Vercel の IP レンジなので、他のサービスもブロックされている
- A next-generation Certificate Transparency log built on Cloudflare Workers
  - https://blog.cloudflare.com/azul-certificate-transparency-log/


#### セキュリティ動向

- **CVE Foundation**
  - https://www.thecvefoundation.org/
  - MITRE が政府からの支援を打ち切られ、CVE プログラムが危うくなった
  - CVE の元ボードメンバーにより、非営利の CVE Foundation が立ち上げられた
- **IIJ セキュア MX サービスにおけるお客様情報の漏えいについてのお詫びとご報告 | IIJ について | IIJ**
  - https://www.iij.ad.jp/news/pressrelease/2025/0422-2.html
  - 法人向けメールセキュリティサービスで大規模な情報漏洩
  - 利用していた Active! mail の脆弱性をつかれた
- **「no-reply@google.com」から送信されたように見えるフィッシングメール攻撃 - GIGAZINE**
  - https://gigazine.net/news/20250421-phishers-abuse-google-oauth-dkim-replay-attack/
  - Google Site にホストされたフィッシングサイトと
  - DKIM Replay 攻撃のセットで
  - 非常に見分けにくい詐欺メールが作れる


#### Cookie 動向

- Call for Adoption: draft-annevk-johannhof-httpbis-cookies from Mark Nottingham
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2025AprJun/0028.html


#### Other

- **(令和 7 年 4 月 15 日)Google LLC に対する排除措置命令について | 公正取引委員会**
  - https://www.jftc.go.jp/houdou/pressrelease/2025/apr/250415_digijyo.html
- **公正取引委員会の排除措置命令について**
  - https://blog.google/intl/ja-jp/company-news/outreach-initiatives/about-the-jftcs-order/
- **How crawlers impact the operations of the Wikimedia projects - Diff**
  - https://diff.wikimedia.org/2025/04/01/how-crawlers-impact-the-operations-of-the-wikimedia-projects/
  - LLM のトレーニング用などの需要から Wikimedia Commons へのトラフィックが増加しインフラを逼迫させている
  - コストの高いトラフィックの 65% がボットから
- **OpenAI 幹部、Chrome 買収に関心 Google 会社分割なら - 日本経済新聞**
  - https://www.nikkei.com/article/DGXZQOGN2300H0T20C25A4000000/


### イベント

- 4 月
  - 7-8: BlinkOn 20
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/OwhKs-ofakU
- 5 月
  - 20-21: Google I/O
    - https://io.google/
- 6 月
  - 9-13: WWDC '25
    - https://developer.apple.com/wwdc25/


### Wrap Up

- Chrome
  - 136
    - partitioning `:visited`
    - `attr(raw-string)`
    - type-agnostic `var()`
  - Ship
    - document-isolation-policy
    - offset-path: `shape()`
  - Prototype
    - private proof API
  - Deprecate and Remove
    - ISO-2022-JP in HTML
  - web.dev
  - Google Developer Blog
  - Chrome Developers
    - Making `:visited` more private
    - Finch の説明
  - other
    - Windows で Noto Sans に変わったことによる反応
    - google.co.jp → google.com にリダイレクト
    - Adam Argyle レイオフ
    - Next steps for Privacy Sandbox
      - 3PCD ストップ
- Firefox
  - 137
    - タブグループ
    - 検索 UI
    - `hyphenate-limit-chars`
  - Ship
    - `hidden=until-found`
  - other intents
    - remove UA h1 styles in sectioning elements
  - MDN Blog
    - default styles for h1
    - W3C docs community group
  - other
    - Keith Cirkel joining Mozilla
    - Shipping Temporal
- Safari
  - TP 216
    - バグ修正
  - TP 217
    - バグ修正
  - Standard Position
    - support: Scoped Custom Element Registries
  - other
    - `text-wrap: pretty`
    - `shape()`
- Edge
  - Vibe-coding for security
- W3C/WHATWG
  - Draft
    - CSS Gap Decorations Module Level 1
      - `colum-rule`, `row-rule`
  - Open UI
    - menu
      - Navigation Menu に関する議論
    - focusgroup が inactive propsals に
  - WHATNOT meeting
  - Other
    - Breakouts Day 2025
      - Vectors of Neglect
      - Collective funding, governance and prioritization of browser engine projects
      - Template Instantiation
    - CSS multicol block direction wrapping
      - `column-count`, `column-height`
    - DCE Breakout
    - `view-transition-name: auto;` remove
    - DOM Parts よりも軽量な `NodeGroup`
- TC39
  - WinterTC
- IETF
- 周辺動向
  - ベンダー動向
    - LINE ヤフーが組んで Brave Software Asia 設立
    - Servo で Copilot を限定的に認める案が炎上棄却
    - スペインの違法サッカー配信を ISP でブロックしたら Cloudflare / Vercel 上のサービスが巻き込み遮断
  - セキュリティ動向
    - CVE の政府支援が打ち切られ非営利団体設立
    - IIJ が Active! mail の脆弱性で漏洩
    - Google からの送信にしか見えないフィッシングメール
  - Cookie 動向
    - Cookiebis の次が Call for Adoption
  - Other
    - 公正取引委員会 Chrome に排除措置命令
    - LLM のリクエストが Wikimedia を圧迫
    - OpenUI Chrome 買収意欲