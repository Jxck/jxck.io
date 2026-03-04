---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep192.mp3
published_at: 2025-11-30
guest:
  - [@saku](https://x.com/sakupi01)
  - [@petamoriken](https://x.com/petamoriken)
---

# ep192 Monthly Platform 202511

## Theme

第 192 回のテーマは 2025 年 11 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 143

#### Updates

#### Intents

- **Ship: Temporal in ECMA262**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/s58GKzoQZFg
  - > Update: We have [unflagged Temporal](https://chromium-review.googlesource.com/c/v8/v8/+/7098665). Barring any unforeseen issues, this ought to ship in Chrome 144 ([branch date](https://chromiumdash.appspot.com/schedule) Dec 1).
- Ship: CSS `letter-spacing` and `word-spacing: percentage` values
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vrqkenR5s2o
- Ship: SVG2 CSS Cascading
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8ZT9te1tP4E
- Ship: Support `ping`, `hreflang`, `type` and `referrerPolicy` for SVGAElement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bQyE_lhuVOc
- Ship: User-Agent Client Hints `"ch-ua-high-entropy-values"` permissions policy
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Zr_yTEP5WLA
- Ship: WebGPU: `subgroup_id` feature
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SV75BHCUJz0
- Ship: XRVisibilityMaskChange
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pSxatLwuKRM
- **Ship: Scroll Triggered Animations**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TZLFLjzt4II
  - 特定のスクロール位置に到達したときにアニメーションが発火する
  - Scroll-Driven Animation とは異なる目的なので注意
- **Ship: Origin API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CaCxnx6UaXo
  - `isSameOrigin`, `isSameSite` メソッドを持つ Origin クラス
- Ship: Non-Tree-Scoped container-name Matching
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AA_hgdhZyyo
- **Ship: Focus's focusVisible option**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OptbQ7cGx4A
  - `focus()` した時に focus-visible とするか focus とするかは、現状 UA の実装による。これを制御可能にするオプション
- Ship: Add presentationTime/paintTime to performance entries
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SfDA0lo12iw
- Ship: Column wrapping for multicol
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BHb4yTJLWbc
- Ship: Enable monochrome emoji rendering in forced colors mode.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/A57SyMHayKM
- Ship: The `<geolocation>` element
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GL0BkdkCIGc
- Ship: Window Controls Overlay for Installed Desktop Web Apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/guI1QCPJTAA
- **Ship: deprecate BackgroundFetch**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CpXXaJh5Rq8
- Ship: Interoperable Pointer and Mouse boundary events after DOM changes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JvcRfrwRlcU
- **Prototype and Ship: View transition types**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/XZ4P63YCbZA/
  - 進むアニメーション・戻るアニメーションでそれぞれ別の ViewTransition を適用したい場合に type を指定できる
  - つまり、「どっちの方向に遷移しているか」という情報を持たせられるので、それぞれ別の ViewTransition を適用できる
- Prototype: CSS counter-reset: `<reversed-counter-name>`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mDSIbh-_SxY
- **Prototype: Declarative scroll commands for HTMLButtonElement**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3jwcQg6u90k
  - Invoker Commands にスクロール用コマンドを追加する提案
  - 既成のボタンをスクロールのトリガーに拡張可能
- Prototype: FedCM Conditional Mediation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ESUMseAwCTo
- Prototype: FedCM Navigation Interception API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_5P00uaafKM
- Prototype: Local Network Access Restrictions for WebRTC
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CDy8LAs-DoA
- Prototype: Media element pseudo-classes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FqxaR-oQQ6c
- Prototype: WebRequest.SecurityInfo in Controlled Frame
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fo1Hh6FKr9c
- Prototype: Context-aware media element(s)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xa0MJ9wtkS8
- Prototype: WebRequest.SecurityInfo in Controlled Frame
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fo1Hh6FKr9c
- **Deprecate and Remove: Shared Storage API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uh5Ke6qyegc
- **Deprecate and Remove: Private Aggregation API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ld7avyD0U0Q
- **Deprecate and Remove: Protected Audience**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/k_nubsMb97g
- **Deprecate and Remove: Related Website Sets (RWS)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/V-wPXyoruac
- **Deprecate and Remove: Topics API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_R85yctz4Rs
- **Deprecate and Remove: document.requestStorageAccessFor**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bqHGZYHWxnQ
- **Deprecate and Remove: Attribution Reporting API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4K2RRt6VYCQ
- Dev Trial: Partitioned Popins
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0KHYC3wLay8
- Experiment: Enhanced Canvas TextMetrics
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rzsEnBDU848
- Ready for Developer Testing: Scroll Triggered Animations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Gw42-BxHqcs
- Ready for Developer Testing: Local network access restrictions for WebTransport
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pmizFbgcmvU
- Extend Experiment: Playout Statistics API for WebAudio
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_D3nUO270Rs
- Change:
- Unship:
- Remove:
- PSA: Allow update of renderBlockingStatus in Resource Timing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iq4sojegj-Q
- PSA: Protected Audience k-Anonymity Enforcement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/exVncc_qAME
- PSA: Supplementable is going away
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nbTIoUZW6n0
- **PSA: Third-Party Cookie Allowlist Header Explainer**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dfMaZfMxRcw
- [FYI] Changes in Chrome's Payment Request behaviour
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Hv-y6fUqBsE
- **Web-Facing Change PSA: Don't use aria-details for anchor positioning**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vgakGtfrJWY
  - Anchor Positioning はあくまで Visual Binding を作成するものとする
  - アクセシビリティツリーに Anchor Positioning の関係性を反映することはしない
  - Popover API ではバインディングするが、Anchor Positioing はより汎用的なケースでも利用が考えられるので、ARIA はユースケースに依存させる
  - CSS: handing the a11y of anchor positioning
    - https://github.com/w3c/html-aam/issues/545#issuecomment-3515548386
- Web-Facing Change PSA: Respect overscroll-behavior for keyboard scrolls
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/icQKtss_Gbc
- Web-Facing Change PSA: Throw exception when throttling pushState/replaceState
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TyvBybEFIKU

  #### Other

- web.dev
  - https://web.dev/
  - **The winners of the Baseline Tooling Hackathon are...**
    - https://web.dev/blog/baseline-hackathon-2025-winners
  - New to the web platform in October
    - https://web.dev/blog/web-platform-10-2025
  - October 2025 Baseline monthly digest
    - https://web.dev/blog/baseline-digest-oct-2025
  - Container queries and units in action
    - https://web.dev/articles/baseline-in-action-container-queries
  - How to implement an image gallery using Baseline features
    - https://web.dev/articles/baseline-in-action-image-gallery
  - WebGPU is now supported in major browsers
    - https://web.dev/blog/webgpu-supported-major-browsers?hl=en
  - **New to the web platform in November**
    - https://web.dev/blog/web-platform-11-2025?hl=en
    - `contrast-color()`
    - Display-p3-linear color space
    - Firefox 145 (&146 Nightly のデフォルト) からフラグ付きで Anchor Positioning がサポート
  - `<dialog>` and popover: Baseline layered UI patterns
    - https://web.dev/articles/baseline-in-action-dialog-popover
- google for developers
  - https://developers.googleblog.com/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - https://developer.chrome.com/blog/
  - FedCM updates: Display iframe domain
    - https://developer.chrome.com/blog/fedcm-chrome-142-updates
  - Publisher pages: New to the Chrome Web Store
    - https://developer.chrome.com/blog/cws-publisher-pages
  - Extending supported hashes in script-src
    - https://developer.chrome.com/blog/script-src-hashes
  - What's New in WebGPU (Chrome 143)
    - https://developer.chrome.com/blog/new-in-webgpu-143
  - Changes to location permissions in Chrome on Windows
    - https://developer.chrome.com/blog/changes-location-permissions-windows
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
  - **Effortless Web Security: Secure by Design in the Wild - Google Bug Hunters**
    - https://bughunters.google.com/blog/5457130561798144/effortless-web-security-secure-by-design-in-the-wild
    - W3C Community Group: Secure Web Application Guidelines (SWAG)
    - Auto-CSP in Angular

  ### Firefox 動向

  #### Stable: 145

  #### Updates

- Getting Better Every Day - These Weeks in Firefox: Issue 192
  - https://blog.nightly.mozilla.org/2025/11/24/getting-better-every-day-these-weeks-in-firefox-issue-192/
- Firefox 145 release notes for developers (Stable) - Mozilla | MDN
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/145
  - `text-autospace`
  - `<select>` 内部に `<hr>` を挿入できるように
  - `Atomics.waitAsync()`
  - `CSS Anchor Positioning`
  - `Integrity-Policy`, `Integrity-Policy-Report-Only`
- Firefox 146 release notes for developers (Beta) - Mozilla | MDN
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/146
  - CSS `@scope`
  - `contrast-color()`
  - `display-p3-linear` 色空間
  - `WeakMap` and `WeakSet` now accept Symbol objects as keys
  - Navigation API

  #### Intents

- **Ship: CSS Module Scripts**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ynzRS-tLvmU
- Ship: Module Service Workers
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ns3a6N_PVYs
- Ship: Synchronous initial about:blank
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/KuiBbZpYm1U
- **Prototype: Deferred Imports Evaluation**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/KOi3s52D51E
- Prototype and Ship: Untangle computed values of border / outline / column-rule widths and style
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Tr8fE3kzEqM
- **Prototype and Ship: Navigation API**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/2U3cwQgCWBY
- **Prototype and Ship: View transition types**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/XZ4P63YCbZA
- **Prototype and Ship: Document.activeViewTransition**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/xwCxvB1NZSQ
- Change: Stop splitting user selected range to multiple ones for excluding non-selectable nodes
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ZJf1XXzalmU
- Remove:
- PSA: Improvements to Uplift Requests in Lando
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/6vmwcw8EtFQ
- `text-decorationt-trim` renamed to text-decoration-inset
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/-chzNDktMCU

  #### Newsletter

- Firefox WebDriver Newsletter 145 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-145/

  #### MDN / Open Web Docs

- Image formats: Codecs and compression tools
  - https://developer.mozilla.org/en-US/blog/image-formats-codecs-compression-tools/

  #### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2025-11-01+
- Positive
  - Base appearance for list box select elements
    - https://github.com/mozilla/standards-positions/issues/1304
  - Geolocation element (part of PEPC)
    - https://github.com/mozilla/standards-positions/issues/1288
  - Extended lifetime shared workers
    - https://github.com/mozilla/standards-positions/issues/1227
  - `"media-playback-while-not-visible"` Permission Policy
    - https://github.com/mozilla/standards-positions/issues/1082
- Neutral
  - Signature-based Integrity
    - https://github.com/mozilla/standards-positions/issues/1139

  #### Other

- Under the hood: How Firefox suggests tab groups with local AI
  - https://blog.mozilla.org/en/firefox/ai-tab-groups/
- **Introducing early access for Firefox Support for Organizations**
  - https://blog.mozilla.org/en/firefox/firefox-support-for-organizations/
  - Firefox Support for Organizations は、2026 年 1 月に開始される新しいプログラムである。
  - プライベートなサポートチャネル、カスタム開発の割引、戦略的コラボレーションを提供する。
  - 企業や組織向けに、機密性の高い信頼性のあるカスタマイズされたサポートを強化する。
- **Firefox expands fingerprint protections: advancing towards a more private web**
  - https://blog.mozilla.org/en/firefox/fingerprinting-protections/
  - Firefox 145 において、ブラウザの fingerprinting に対する重要なプライバシーアップグレードが実施された。
  - fingerprinting 保護により、追跡可能な Firefox ユーザーの数が半減した。
  - プライベートブラウジングモードと ETP ストリクトモードで新しい防御機能が導入され、Web の利用を妨げることなくプライバシーを強化している。
- Mozilla joins the Digital Public Goods Alliance, championing open source to drive global progress
  - https://blog.mozilla.org/en/mozilla/digital-public-goods-alliance/
- Introducing AI, the Firefox way: A look at what we're working on and how you can help shape it
  - https://blog.mozilla.org/en/firefox/ai-window/
- Firefox tab groups just got an upgrade, thanks to your feedback
  - https://blog.mozilla.org/en/firefox/tab-groups-updates/
- **Rewiring Mozilla: Doing for AI what we did for the web**
  - https://blog.mozilla.org/en/mozilla/rewiring-mozilla-ai-and-web/
  - AI 時代における Mozilla の再定義
- Celebrating the contributors that power Mozilla Support
  - https://blog.mozilla.org/en/firefox/contributors-mozilla-support/

  ### Safari 動向

  #### Stable: 26.1

  #### Updates

- **Release Notes for Safari Technology Preview 232 | WebKit**
  - https://webkit.org/blog/17601/release-notes-for-safari-technology-preview-232/
  - CSS
    - Added support for allowing positioned boxes in scrollable containing blocks to overflow along scrollable directions.
    - Added support for flip-x and flip-y options in position-try-fallback for CSS Anchor Positioning.
  - JavaScript
  - Media
  - Rendering
  - SVG
  - Storage
  - Web API
  - Web Inspector
- Grid: how grid-template-areas offer a visual solution for your code | WebKit
  - https://webkit.org/blog/17620/grid-how-grid-template-areas-offer-a-visual-solution-for-your-code/

  #### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2025-11-01+
- Withdrawn
  - Private Proof API
    - https://github.com/WebKit/standards-positions/issues/473
  - Partitioned Popins
    - https://github.com/WebKit/standards-positions/issues/349
  - Opener Protections
    - https://github.com/WebKit/standards-positions/issues/277

  #### Other

- Igalia WebKit Team | WebKit Igalia Periodical #45
  - https://blogs.igalia.com/webkit/blog/2025/wip-45/
- Igalia WebKit Team | WebKit Igalia Periodical #46
  - https://blogs.igalia.com/webkit/blog/2025/wip-46/
- Igalia WebKit Team | WebKit Igalia Periodical #47
  - https://blogs.igalia.com/webkit/blog/2025/wip-47/
- Igalia WebKit Team | WebKit Igalia Periodical #48
  - https://blogs.igalia.com/webkit/blog/2025/wip-48/

  ### Edge 動向

  #### Stable:

  #### Updates

- https://blogs.windows.com/msedgedev/
  - Secure the browser your way with new Edge for Business connectors - Microsoft Edge Blog
    - https://blogs.windows.com/msedgedev/2025/10/30/secure-the-browser-your-way-with-new-edge-for-business-connectors/
  - Protecting more Edge users with expanded Scareware blocker availability and real-time protection - Microsoft Edge Blog
    - https://blogs.windows.com/msedgedev/2025/10/31/protecting-more-edge-users-with-expanded-scareware-blocker-availability-and-real-time-protection/
  - **Microsoft Edge introduces passkey saving and syncing with Microsoft Password Manager - Microsoft Edge Blog**
    - https://blogs.windows.com/msedgedev/2025/11/03/microsoft-edge-introduces-passkey-saving-and-syncing-with-microsoft-password-manager/
    - デスクトップ版 Edge でパスキーの同期が可能に
  - Microsoft recognized as a Leader in IDC MarketScape on application streaming and enterprise browsers - Microsoft Edge Blog
    - https://blogs.windows.com/msedgedev/2025/11/06/microsoft-recognized-as-a-leader-in-idc-marketscape-on-application-streaming-and-enterprise-browsers/
  - Edge for Business presents: the world's first secure enterprise AI browser - Microsoft Edge Blog
    - https://blogs.windows.com/msedgedev/2025/11/18/edge-for-business-presents-the-worlds-first-secure-enterprise-ai-browser/
  - **The Web Install API is ready for testing - Microsoft Edge Blog**
    - https://blogs.windows.com/msedgedev/2025/11/24/the-web-install-api-is-ready-for-testing/
    - Web サイトが他の Web サイトを PWA としてインストールするよう、ブラウザに依頼できる仕組み
    - 自社の PWA アプリストアみたいなものを構築できる
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見れる
- https://twitter.com/MSEdgeDev
  - これを見るしか無い
- MSEdgeExplainers/OfflineAudioContext/explainer.md at main · MicrosoftEdge/MSEdgeExplainers
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/OfflineAudioContext/explainer.md

  #### Other

- Defensive Technology: Ransomware Data Recovery - text/plain
  - https://textslashplain.com/2025/11/19/defensive-technology-ransomware-data-recovery/
  - Ransomware データ回復機能は、Windows Security Center App の一部であり、OneDrive と連携する。
  - Ransomware 攻撃を検知すると、Defender は攻撃を阻止し、バックアッププロバイダーに感染のタイムスタンプを通知する。
  - この機能は、3P セキュリティソフトウェアとクラウドバックアップソフトウェアが Windows Security Center と統合するためのインターフェースを提供する。

  ### WHATWG/W3C 動向

#### TPAC

- WCCG TPAC meeting - 10 November 2025
  - https://www.w3.org/2025/11/10-webcomponents-minutes.html
- WHATWG - 11 November 2025
  - https://www.w3.org/2025/11/11-whatwg-minutes.html
- WHATWG - 13 November 2025
  - https://www.w3.org/2025/11/13-whatwg-minutes.html
- View 1 · CSS WG TPAC 2025 agenda
  - https://github.com/orgs/w3c/projects/213

  #### Draft

- https://www.w3.org/news/
- Recommendation
- Candidate Recommendation
  - Updated Candidate Recommendation: Pointer Events Level 3
    - https://www.w3.org/news/2025/updated-candidate-recommendation-pointer-events-level-3/
- Working Draft
- First Public Working Draft
  - First Public Working Draft: CSS Backgrounds Module Level 4
    - https://www.w3.org/news/2025/first-public-working-draft-css-backgrounds-module-level-4/
- Note
  - Self-Review Questionnaire: Societal Impact
    - https://www.w3.org/news/2025/group-note-draft-self-review-questionnaire-societal-impact/
    - 仕様の策定者、レビュー者、実装者が、Web を通じて社会に与える影響を自己評価するアンケート項目
  - Group Note Draft: Web User Agents
    - https://www.w3.org/news/2025/group-note-draft-web-user-agents/
    - TAG が「Web User Agents」の初版ドラフトを公開した。
    - User Agent は、Web ブラウザやエンドユーザーと Web の間の仲介者を含む。
    - User Agent はユーザーに対して様々な義務を負い、これらは集団的な議論を通じて確立されるべきである。テクニカルアーキテクチャグループが「Web User Agents」の初版ドラフトを公開した。
    - User Agent は、Web ブラウザやエンドユーザーと Web の間の仲介者を含む。
    - User Agent はユーザーに対して様々な義務を負い、これらは集団的な議論を通じて確立されるべきである。
- Others
  - Authorized Translation of Verifiable Credentials Data Model v2.0 in Simplified Chinese
    - https://www.w3.org/news/2025/authorized-translation-of-verifiable-credentials-data-model-v2-0-in-simplified-chinese/

  #### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- 2025-11-06
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-11-06.md
- 2025-11-20
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-11-20.md
  - [scroll-animations?] Proposal: Add overscroll gestures with ability to reveal elements
    - https://github.com/w3c/csswg-drafts/issues/12750
    - https://docs.google.com/presentation/d/1J7RrjKQQCuqLjxTOTvGWoGmxq2FzVvL00YpEczaRUUo/edit?slide=id.p#slide=id.p
    - https://codepen.io/argyleink/pen/gOzPYOj
    - スワイプジェスチャーによる要素の表示を Web で宣言的に実装できるようにする提案
      - 左からスワイプで出るメニュー、pull-to-refresh、etc
    - スワイプできないユーザはどうする?というアクセシビリティの問題がある
      - フォーカスをどうハンドリングするか
      - 全コンテンツをスクロールしないと要素に到達できない
    - CSS でやるか HTML でやるかが TPAC で話し合われた

  #### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
- WHATWG
  - https://www.w3.org/events/meetings/c3357551-d84b-4e96-b02d-4eab08a16d9e/
  - https://www.w3.org/events/meetings/c33b890d-56a9-429b-ac81-aca8c5447772/
  - WHATUP 2025 Notes
    - https://docs.google.com/document/d/1XQLLjETtdBPv-xGiGPRALR4X7hgSb_Lk13bdBucEJ_g/edit?tab=t.0
  - Anchor Positioning - Anchor Positioning Inter Related Issues
    - Anchor Positioning はセマンティックバインディングを示さないという話

  #### CSSWG

- https://www.w3.org/blog/CSS/
- https://lists.w3.org/Archives/Public/www-style/
- **[css-grid-3] Masonry Switch Syntax**
  - https://github.com/w3c/csswg-drafts/issues/12022
  - `サーベイ結果、grid-stack`、`packed-grid` 、`grid-lanes` 、`lane-grid が有力`
  - Stack 系は stacking context と勘違いされる
  - Pack 系は density プロパティと勘違いされる
  - > RESOLVED: masonry switch will be `display: grid-lanes`
- **[css-view-transitions-2][css-conditionals] Exposing navigation/route matching**
  - https://github.com/w3c/csswg-drafts/issues/12594
  - URLPattern を CSS から利用可能にし、URL ベースのスタイリングを実現する提案
  - URLPattern の仕様に基づく URL マッチングを行う CSS 関数 `url-pattern()`
  - URL に応じた条件付きスタイルを示す at-rule として `@navigation`
  - URLPattern をカスタムプロパティのように扱う at-rule として `@route`
  - B/F Navigation の区別は別途考慮
  - Editor's Draft : CSS Route Matching
    - https://drafts.csswg.org/css-navigation-1/
- Source maps for CSS
  - https://github.com/w3c/csswg-drafts/issues/13098
  - CSS のニーズに合わせてソースマップを改善したい。どんな改善ができそうかという Nicolo からの提案
- [css-grid-3][masonry] item-flow row vs. column in masonry layouts
  - https://github.com/w3c/csswg-drafts/issues/12803
  - https://lists.w3.org/Archives/Public/www-archive/2025Oct/att-0013/CSSWG_2025_October_Masonry_Item_Flow.pdf
  - item-flow の column & row の値の解釈。
  - Masonry 全体の「形」を表すのか、はたまた item の「流れ」を表すかについての議論が TPAC で行われ、かなり白熱した

  #### Other

- W3C Advisory Committee Elects Technical Architecture Group
  - https://www.w3.org/news/2025/w3c-advisory-committee-elects-technical-architecture-group/
  - > starting 1 February 2026: Matthew Atkinson, Christian Liebel, Jeffrey Yasskin and Sen Yu.
- Addressable comments (a very small DOM parts subset)
  - https://github.com/WICG/webcomponents/issues/1116
  - コメントを使って DOM Parts の traversal を速くするということらしい
- **Proposal: Custom attributes for all elements, enhancements for more complex use cases**
  - https://github.com/WICG/webcomponents/issues/1029
  - https://www.w3.org/2025/11/12-custom-attrs-minutes.html
  - Custom の Attribute を HTML 要素に追加できるようにする提案
- **ADC Projects Update**
  - https://docs.google.com/document/d/1ree75ImLZjf60lTZ3BhCaLHygxgywr7SBXp-q0xPs8A/edit?tab=t.kwy3jemh57eo#heading=h.otakpzvvzent
  - Bocoup が AT Driver 仕様で大きな進展を見せており、これによりテスト実行のコストが大幅に下がる見込み
  - Big news: Mozilla が資金提供に合意
  - まずはデータセットの形状や BCD との統合方法のデモを見せる段階
  - 引き続き他のスポンサーも募集中
  - lolaslab/accessibility-compat-data
    - https://github.com/lolaslab/accessibility-compat-data
- **Accelerating the adoption of modern web features, and migrating away from outdated approaches**
  - https://github.com/w3c/tpac2025-breakouts/issues/76
- **Future of the Open Web**
  - https://www.w3.org/events/meetings/679c6e5a-f288-4a9b-8887-9d9af4d8b8ad/
  - https://docs.google.com/document/d/1WaXDfwPP6olY-UVQxDZKNkUyqvmHt-u4kREJW4ys6ms/edit?tab=t.twskog28ivz4#heading=h.gcn6o9tbcajj
- **Proposal: HTML in Canvas**
  - https://github.com/WICG/html-in-canvas
  - `<canvas>` の中で Element を描画する提案。`<input>` などで入力させたり、アクセシビリティツリーをつくってくれたりする
  - chrome://flags/#canvas-draw-element を有効化することで試せる
    - https://raw.githack.com/mrdoob/three.js/htmltexture/examples/webgl_materials_texture_html.html
- **2025 Content Progress Tracker 🪄**
  - https://github.com/HTTPArchive/almanac.httparchive.org/issues/4110
  - 今年の Web Almanac
  - もう結構みれる

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
- minutes がマージされてない
- かつ 11 月は TPAC なんでなかったぽい

  #### Other

- **Technical Discussion with TC39 (JSConf JP 2025)**
  - https://jsconf.jp/2025/en/talks/technical-discussion-tc39
  - Pipeline Operator が長いこと Stage 2 のままなのは Hack language style と F# language style で揉めていてデッドロックしているから
  - Pattern Matching が Stage 1 のままなのは単に champion の時間が取れていない
  - JSSuger / JS0 と分けることで提案の進行が早く進むのではないかという意見が出たが、進行スピードよりもセキュリティの方が重要で今のスピード感の方が安定して話が進められると返答された
  - Language Evolution - Google Slides
    - https://docs.google.com/presentation/d/1ylROTu3N6MyHzNzWJXQAc7Bo1O0FHO3lNKfQMfPOA4o/edit?slide=id.p#slide=id.p

  ### IETF 動向

  #### WG

- RFC
  - RFC 9875 on HTTP Cache Groups
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/XTwM0hWqXDFvtGr52gA5aH89RLE/
- Work
- Meeting

  #### Other

- 新しい NTP DNS レコードの提案書を書いた - ASnoKaze blog
  - https://asnokaze.hatenablog.com/entry/2025/11/27/003215
  -

  ### 周辺動向

  #### ベンダー動向

- **Cloudflare outage on November 18, 2025**
  - https://blog.cloudflare.com/18-november-2025-outage/
  - Cloudflare の大規模障害の顛末
- **Orion 1.0 ✴︎ Browse Beyond | Kagi Blog**
  - https://blog.kagi.com/orion
  - WebKit ベース、プライバシーファーストなブラウザ Orion

  #### セキュリティ動向

- **Second Sha1-Hulud Wave Affects 25,000+ Repositories via npm Preinstall Credential Theft**
  - https://thehackernews.com/2025/11/second-sha1-hulud-wave-affects-25000.html?m=1
  - シャイハルードというメタルバンドが由来っぽい
  - 9 月にあった攻撃を土台とした、第二波の攻撃
- **AI 時代の Web ブラウザーに潜む落とし穴── Edge Copilot のぜい弱性を解析 小勝 純 インタビュー**
  - https://www.hitachi-systems.com/-/media/report/specialist/hj/download/2025_hj73.pdf
  - Edge Copilot のセキュリティの話
  - Code Blue で採られた小勝さんのインタビュー
- **アサヒがランサム被害で VPN 廃止、大規模被害招いた 3 つの技術的盲点 | 日経クロステック(xTECH)**
  - https://xtech.nikkei.com/atcl/nxt/column/18/00001/11296/
  - 侵入経路が VPN だった可能性示唆

  #### Other

- The Performance Inequality Gap, 2026 - Infrequently Noted
  - https://infrequently.org/2025/11/performance-inequality-gap-2026/
- **Order This Is For Everyone by Sir Tim Berners-Lee**
  - https://thisisforeveryone.timbl.com/
  - https://www.amazon.co.jp/dp/0374612463

  ### イベント

- 12 月
  - 6: アクセシビリティカンファレンス福岡
    - https://fukuoka.a11yconf.net/
- 1 月
- 2 月

  ### Wrap Up

- Chrome
  - 143
  - Ship
    - Temporal unflagged
    - Scroll Triggered Animation
    - Origin API
    - focusVisible option for `focus()`
    - Deprecate BackgroundFetch
    - ViewTransition types
  - Prototype
    - Scroll commands for HTMLButtonElement
  - Experiment
  - Deprecate and Remove
    - Privacy Sandbox 関連 API Deprecation
  - PSA
    - Third-Party Cookie Allowlist Header
  - other intents
    - Anchor Positioning にセマンティックバインディングはしない
  - web.dev
    - Baseline Tooling Hackathon で日本人の方が優勝
  - Google Developer Blog
  - Chrome Developers
  - Chromium blog
  - other blogs
  - other
- Firefox
  - 145
    - `text-autospace`
    - `<select>` 内部に `<hr>` を挿入できるように
    - `Atomics.waitAsync()`
    - CSS Anchor Positioning
    - `Integrity-Policy`, `Integrity-Policy-Report-Only`
  - 146
    - CSS `@scope`
    - `contrast-color()`
    - `display-p3-linear` 色空間
    - `WeakMap` and `WeakSet` now accept Symbol objects as keys
    - Navigation API
  - Ship
    - CSS Module Scripts
    - Navigation API
    - View transition types
    - `Document.activeViewTransition`
  - Prototype
    - Deferred Imports Evaluation
  - Other Intents
  - MDN Blog
  - Standard Position
    - `<geolocation>`
  - other
    - Introducing early access for Firefox Support for Organizations
    - Firefox expands fingerprint protections: advancing towards a more private web
    - Rewiring Mozilla: Doing for AI what we did for the web
- Safari
  - TP 232
    - `flip-x`, `flip-y`
  - Standard Position
    - Privacy Sandbox 系の Withdrawn
  - other
- Edge
  - デスクトップ版 Edge (on Windows) でパスキー同期サポート
  - Web Install API
- W3C/WHATWG
  - TPAC
  - Draft
    - Web User Agents
  - Open UI
    - Overscroll Gestures
  - WHATNOT meeting
    - WHATUP in TPAC で色々
  - Other
    - Proposal: Custom attributes
    - ADC Projects Update
    - Future of the Open Web
    - Proposal: HTML in Canvas
- TC39
  - Technical Discussion with TC39 (JSConf JP 2025)
- IETF
  - RFC 9875 on HTTP Cache Groups
  - yuki NTP DNS Record ドラフト執筆
- 周辺動向
  - ベンダー動向
    - Cloudflare 大規模障害ポストモーテム
    - Orion 1.0 Webki ベースブラウザ
  - セキュリティ動向
    - Sha1-Hulud サプライチェーンアタック
    - 小勝さん Code Blue インタビュー
    - アサヒランサム記者会見で VPN 脆弱性公表
  - Other
    - Tim Berners-Lee 新刊
