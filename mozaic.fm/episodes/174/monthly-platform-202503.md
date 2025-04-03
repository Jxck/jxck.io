---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep174.mp3
published_at: 2025-04-03
guest: [@myakura](https://github.com/myakura)
guest: [@saku](https://x.com/sakupi01)
---

# ep174 Monthly Platform 202503

## Theme

第 174 回のテーマは 2025 年 3 月の Monthly Platform です。


## Show Note

### Chrome 動向

#### Stable: 135


#### Updates

- New in Chrome 134
  - https://developer.chrome.com/blog/new-in-chrome-134
  - The light-dismiss behavior from popover comes to `<dialog>`
  - The Web Locks API is now supported in shared storage
  - The imageSmoothingQuality attribute is now supported on paint canvas
  - Customizable `<select>`
- Chrome 135 beta
  - https://developer.chrome.com/blog/chrome-135-beta
  - CSS and UI
    - **Anchor positioning remembered scroll offset**
    - CSS Inertness
    - Logical overflow properties
    - Sign-related functions: `abs()` and `sign()`
    - The dynamic-range-limit property
    - The shape() function
    - **The `::column` pseudo-element**
    - **`::scroll-button()` pseudo-elements**
    - **`::scroll-marker` and `::scroll-marker-group`**
    - Nested pseudo elements styling
    - **Partitioning `:visited` links history**
    - Interpolation progress functional notations: CSS `*progress()` functions
    - `safe-area-max-inset-*` variables
  - Web APIs
    - Add MediaStreamTrack support to the Web Speech API
    - Blob URL Partitioning: Fetching and navigation
    - CSP require-sri-for for scripts
    - Create service worker client and inherit service worker controller for srcdoc iframe
    - Dispatching click events to captured pointer
    - **Float16Array**
    - **Incorporating navigation initiator into the HTTP cache partition key**
    - **HSTS tracking prevention**
    - **Invoker Commands: the command and commandfor attributes**
    - Link rel="facilitated-payment" to support push payments
    - The NavigateEvent sourceElement property
    - NotRestoredReasons API reason name change
    - On-device Web Speech API
    - Service Worker client URL ignore history.pushState changes
    - Support rel and relList attributes for SVGAElement
    - Timestamps for RTC Encoded Frames
    - Update ProgressEvent to use double type for 'loaded' and 'total'
    - **The fetchLater API**
  - New origin trials
    - **Interest Invokers**
    - Signature-based Integrity
  - Deprecations and removals
    - Deprecate getters of Intl Locale Info
    - Remove deprecated navigator.xr.supportsSession method
    - Remove NavigateEvent canTransition property
    - Remove WebGPU limit maxInterStageShaderComponents
    - Contribute
    - Related content
    - Follow
- What's new in DevTools, Chrome 135
  - https://developer.chrome.com/blog/new-in-devtools-135
  - Performance panel improvements
    - Origin and script links for profile and function calls in Performance
    - 'LCP by phase' field data support
    - 'Network dependency tree' insight
    - Duration instead of total and self time in Summary
    - Heaviest stack highlighting
  - Improved empty states for various panels
  - Accessibility tree view in Elements
  - Lighthouse 12.4.0
  - Miscellaneous highlights
  - Download the preview channels
  - Get in touch with the Chrome DevTools team
- **New in Chrome 135**
  - https://developer.chrome.com/blog/new-in-chrome-135
  - CSS carousels
  - The `command` and `commandfor` attributes
  - The CSS `shape()` function
- Chrome 135 | Release notes | Chrome for Developers

  - https://developer.chrome.com/release-notes/135

  #### Intents

- Ship: Explicit Compile Hints with Magic Comments
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uNUWZ14SYJI
  - 10 月の TC39 で説明した
  - WICG の Explainer/Draft を更新
  - WebPerf WG でも説明
  - OT のフィードバックあり
    - https://docs.google.com/document/d/1_dt6SMGoxomo8mJuPqFBIP85kUII3CgqUuqqwKWRZOc
- Ship: PaymentRequest on WebView
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1Ep8DvUHU1Q
- Ship: H265 (HEVC) codec support in WebRTC
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3h8lL8a377c
- Ship: Language support for CanvasTextDrawingStyles
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XLvmdCR3o3Q
- **Ship: CSS anchor positioning remembered scroll offset**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ORkpnBrwXqQ
- **Ship: Type-agnostic `var()` fallback**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yc4XmGZi1Mk
  - `var(--length, auto)` のようなフォールバックで `--length` が `<length>` 型だったとする
  - いままでは型が違うのでフォールバックせず unset になっていた。この制限を外す。
  - フォールバック値にキーワードを指定できるように
- Ship: CSS 'stretch' sizing keyword
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SiZ2nDt3B9E
- Ship: Rename `string` `attr()` type to `raw-string`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GISQbW0Xhxg
  - コスメティックな変更なので Alex Russell 激おこ
- Ship: Call stacks in crash reports from unresponsive web pages
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tgRcEnqIb1A
- Ship: Controlled Frame API (available only to IWAs)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nY_GF4iMFFI
- Ship: Unprefixed `print-color-adjust`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DVlwCqUT9L8
- Ship: Update HTTP request headers, body, and referrer policy on CORS redirect
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/g0S3FknAEDU
- **Ship: Auto-generated view transition names**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5LfSXRBkeAY
  - Jake が以前から猛反対している `view-transition-name: auto` が Blink にも実装されそう
  - HTML id 属性が存在する場合: `auto` は動作する
  - HTML id 属性が存在しない場合
    - SPA: `match-element` が動作するので、`auto` は動作する
    - MPA: `match-element` が動作しないので、`auto` は動作しない
  - この暗黙的な挙動差異があるにも関わらず、`auto` というキーワードに丸めこまれてしまっている
- Ship: Automatic beacon cross-origin data support (M135)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mUmR01k_cnE
- Ship: Captured Surface Control
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KqhH5SwOofo
- **Ship: HSTS Tracking Prevention**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jH-vNNF0cNk
  - HSTS を用いた Super Cookie を防ぐために
  - Top Level navigation でしか HSTS Upgrade しない
- Ship: WebGPU: GPUAdapterInfo isFallbackAdapter attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VUkzIOWd2n0
- Ship: WebAssembly Branch Hints
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oWlFPpfVVRI
- Ship: Add support for video frame orientation metadata to WebCodecs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pMfpH02OmHE
- Ship: Use DOMPointInit for getCharNumAtPosition, isPointInFill, isPointInStroke
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OZ_mme2yLxU
- Ship: Protected Audience (B&A): Support multiple sellers in navigator.getInterestGroupAdAuctionData
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FooKdivED94
- Ship: AudioContext Interrupted State
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iNj-OIZ1T3Q
- Ship: Selection API getComposedRanges and direction
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4dsh58Y4ZrE
- Ship: CapturedSurfaceResolution
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jdCVfxAUFLc
- Ship: [WebRTC getStats] Align implementations on when RTP stats should be created
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GYqPzIUUZCQ
- Ship: Protected Audience: Creative scanning via BYOS/V1 trusted scoring signals
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EXfp34Qb1oc
- Ship: Ed25519 in Web Cryptography
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/T2kriFdjXsg
- Ship: FedCM multi IDP in single `get()`, and remove add another account, in passive mode
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5Z-UgA6kRos
- **Ship: `view-transition-name: match-element`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/o3JcMI6dGdY
  - これは Same Document でしか動作しないと明確に表現しようがあるので `match-element` の実装にはポジティブ
- **Ship: `view-transition-name: auto`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KCizytrJUMA
  - `match-element` 単体で Ship するために元のやつから切り離されただけ?
  - Yoav は依然慎重
- Ship: CSS `reading-flow`, `reading-order properties`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/j94_AedA4lk
- Ship: Speculation rules: tag field
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fiKUzNNVhgE
- **Ship: `Accept-Language` Reduction (HTTP-only)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NBEBB81RjaI
  - HTTP ヘッダーの reduction のみで、navigator.language には影響しない (not HTTPS の意味じゃない)
  - "Our study of the top 10k sites provided by Tranco shows that few sites actually use the Accept-Language header" と言っているが i18n 観点から反対がある
    - https://github.com/explainers-by-googlers/reduce-accept-language/issues/10
- Implement and Ship: isSecurePaymentConfirmationAvailable API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1pYa8CTib2s
- Prototype and Ship: Strict Same Origin Policy for Storage Access API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jot2b6e0ewo
- **Prototype: CSS `sibling-index()` and `sibling-count()`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qOdmXuip85o
- Prototype: Full frame rate render blocking attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/e6eRUryIUj0
- Prototype: Nesting of `:has()` and `:host()` CSS Selectors
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/C77l_WH3WB4
- Prototype: Local network access restrictions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vCfMJ35P7bY
- **Prototype: Delete-Cookie header**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_02tPGDMMFo
  - サーバでは扱ってないが `MaxAge` を長くした Cookie の残骸が残っているサービスがよくある
  - `MaxAge=0` で上書きすることで消せるが `Path` / `Domain` が一致する必要
  - `Path` / `Domain` は Cookie ヘッダでは送られないのでわからないと消せない
  - `Path` / `Domain` がなくても消せるヘッダという提案
- Prototype: Noising canvas readbacks in Incognito
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/p5tU5IK6AIg
- Prototype: Bounce Tracking Mitigations for dual-use sites
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gZWfbn3WEEg
- Prototype: Web Authentication immediate mediation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Z6Xp6zp5Lp0
- **Prototype: Related Website Partition (RWP) API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NGKoPjCkNyc
  - Related Website Set に属するサイト間で Partition された Cookie をシェアできる機能
  - Storage Access API と異なりプロンプトが出ない
- Prototype: Column wrapping for multicol
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TJpAuWSTtMo
- Prototype: Expose Initiator info in resource timing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7iP6LX-Ks8A
- Prototype: Proofreader API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1waIrgpXrRs
- **Prototype: Source phase imports**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/swVnlGqhiI4
- Prototype: FedCM: Alternative Fields in Account Selection
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tM4k4D0BEWw
- **Prototype: `flex-wrap:balance`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TlMICG2Sw3Q
  - `text-wrap: balance` の flexbox 版
  - explainer の図がわかりやすい
  - https://github.com/bfgeek/flex-wrap-balance
- Experiment: Speculation rules: `target_hint` field
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/J8pXGgUIuBQ
- Experiment: Enabling Web Applications to understand bimodal performance timings
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FYsfp0OsMko
- Experiment: Device Bound Session Credentials
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/O7Z9DF9AT8Y
- Experiment: Update of Canvas text rendering implementation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IO7l4TorlQk
- Ready For:
- Extend Experiment:
- Extend Experiment: Language Detector API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CjcbdFWqpYg
- **Extend Experiment: Origin Trial for Third Party Cookie Deprecation**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/G8uraMsfNnc
  - 新しい方式のアナウンスはないが OT は 136 まで延長
  - 新しい方式については hope to have more to share in the next several weeks.
- Change:
- Unship:
- Remove:
- **Deprecate and Remove: Deprecate special font size rules for H1 within some elements**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OWd80XhwHrI
- PSA: Restrict orientation lock behavior to android phones
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Hjo6zse3tvg
- **PSA: Private Proof API Explainer**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JrJwSd43hGM
  - 3PC を用いてサービスがユーザをいつ最初に観測したがわかった
  - それを用いた不正検出ができなくなったので、パラダイムシフトが必要
  - ゼロ知識証明を用いる Private Proof Manager API でプライバシーに配慮しつつ不正検出をする目的
- New at BlinkOn 20: Unconference Track
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vFF8OuJa_E8
- Ready for Developer Testing: Incoming Call Notifications
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GoS6kTKV3Qs
- Ready for Developer Testing: CSS find-in-page highlight pseudos

  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dcmserL50FM

  #### Other

- web.dev
  - https://web.dev/
  - February 2025 Baseline monthly digest
    - https://web.dev/blog/baseline-digest-feb-2025
  - New to the web platform in February
    - https://web.dev/blog/web-platform-02-2025
  - How to query the Web Platform Dashboard for Baseline tooling
    - https://web.dev/articles/web-platform-dashboard-baseline
  - ruby-align is Baseline Newly available
    - https://web.dev/blog/baseline-ruby-align
  - **Support for CSS and Baseline has shipped in ESLint**
    - https://web.dev/blog/eslint-baseline-integration
    - 関連で、Stylelint のプラグイン
      - https://github.com/ryo-manba/stylelint-plugin-require-baseline
  - `Intl.DurationFormat` is now Baseline Newly available
    - https://web.dev/blog/intl-durationformat-baseline?hl=en
  - The contenteditable "plaintext-only" attribute value combination is now Baseline Newly available
    - [https://web.dev/blog/contenteditable-plaintext-only-baseline](https://web.dev/blog/contenteditable-plaintext-only-baseline?hl=en)
  - How to think about Baseline and polyfills
    - https://web.dev/articles/baseline-and-polyfills
- google for developers
  - https://developers.googleblog.com/
- google developer japan blog
  - https://developers-jp.googleblog.com/
  - Ads API での同意の分割について
    - https://developers-jp.googleblog.com/2025/03/consent-unbundling-in-ads-apis.html
- chrome developer blog
  - https://developer.chrome.com/blog/
  - Unlock exciting use cases with the Document Picture-in-Picture API
    - https://developer.chrome.com/blog/document-pip-use-case
  - Cancel review in the Chrome Web Store developer dashboard
    - https://developer.chrome.com/blog/chrome-webstore-cancel-review
  - Use scheduler.yield() to break up long tasks
    - https://developer.chrome.com/blog/use-scheduler-yield
  - **Delaying the shipping of CSS `@function` from Chrome 136 to 139**
    - https://developer.chrome.com/blog/delaying-shipping-of-css-functions
  - Introducing command and commandfor
    - https://developer.chrome.com/blog/command-and-commandfor
  - New in Chrome Q1 2025: CSS `text-box`, file system access for Android, Baseline updates and more!
    - https://developer.chrome.com/blog/new-in-chrome-video-q1-2025
  - Chrome Web Store policy updates: Strengthening our policies on affiliate programs in Chrome Extensions
    - https://developer.chrome.com/blog/cws-policy-update-affiliate-ads-2025
  - Changes to remote debugging switches to improve security
    - https://developer.chrome.com/blog/remote-debugging-port
  - Shape the future of the web with GSoC and Chromium
    - https://developer.chrome.com/blog/gsoc-2025
  - Improved navigation and filtering in the DevTools Performance panel
    - https://developer.chrome.com/blog/devtools-navigate-and-filter
  - Memory safety for web fonts
    - https://developer.chrome.com/blog/memory-safety-fonts
      - フォントのライブラリを FreeType から Rust ベースに移行する話
  - **Carousels with CSS**
    - https://developer.chrome.com/blog/carousels-with-css
  - The `<select>` element can now be customized with CSS
    - https://developer.chrome.com/blog/a-customizable-select
  - What's New in WebGPU (Chrome 135)
    - https://developer.chrome.com/blog/new-in-webgpu-135
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
  - Vulnerability Reward Program: 2024 in Review
    - https://security.googleblog.com/2025/03/vulnerability-reward-program-2024-in.html
  - **New security requirements adopted by HTTPS certificate industry**
    - https://security.googleblog.com/2025/03/new-security-requirements-adopted-by.html
    - Chrome Root Program は Moving Forward, Together に取り組んでいた
    - CAB Forum の Baseline Requirements が改定された
    - BR に Moving Forward Together のプラクティスのうち 2 つが採用された
    - Multi-Perspective Issuance Corroboration
      - BGP ハイジャック対策のため、複数の論理的位置から DV を行う
    - Linting
      - 危殆化した暗号やプラクティスに依存しているかを検出する Linter を用いること
- search blog
  - https://developers.google.com/search/
- v8
  - https://v8.dev/
  - **Land ahoy: leaving the Sea of Nodes · V8**
    - https://v8.dev/blog/leaving-the-sea-of-nodes
    - v8 の最適化コンパイラを Turbofan から Turboshaft への移行の解説
    - Turbofan は Sea of Nodes という方式を採用していた
    - しかし、多くの問題があったため伝統的な Control Flow Graph に戻ることにした
    - 理由
      - グラフのダンプが複雑で読みにくい
      - 得られるメリットが限定的
      - コンパイルが遅すぎる
- other

  - **Google が「uBlock Origin のサポートは終了しました」とウソをついているとネットが騒然、広告ブロッカーを使い続ける方法はコレ - GIGAZINE**
    - https://gigazine.net/news/20250307-ublock-origin-is-gone/
  - Project Zero: Blasting Past Webp
    - https://googleprojectzero.blogspot.com/2025/03/blasting-past-webp.html

  ### Firefox 動向

  #### Stable: 136.0.3

  #### Updates

- **Firefox 136.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/136.0/releasenotes/
  - サイドバーと縦タブを導入
  - HTTPS へのアップグレードがデフォルトで有効に。対応してない場合は HTTP にフォールバックする
  - macOS で H.265 をサポート
- **Firefox 136.0.2, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/136.0.2/releasenotes/
  - 互換性の問題から Cookie Store API が無効になった
    - https://old.reddit.com/r/JioHotstar/comments/1j759l4/jiohotstar_mozilla_firefox_fix/
- **Firefox 136.0.3, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/136.0.3/releasenotes/
  - TikTok が使い物にならないくらい遅いというバグを修正
  - `Intl.DateTimeFormat` をキャッシュすることで対応
- **Firefox 136 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/136
  - `autocorrect` 属性
  - `contenteditable=plaintext-only`
  - `Intl.DurationFormat`
  - `details`/`dialog` `:open`
  - CSS グラデーションの one color stop
- High Profile Improvements - These Weeks in Firefox: Issue 176
  - https://blog.nightly.mozilla.org/2025/03/05/high-profile-improvements-these-weeks-in-firefox-issue-176/
- Turn Tabs To Their Side - These Weeks in Firefox: Issue 177
  - https://blog.nightly.mozilla.org/2025/03/11/turn-tabs-to-their-side-these-weeks-in-firefox-issue-177/
- **An update on our Terms of Use**

  - https://blog.mozilla.org/en/products/firefox/update-on-terms-of-use/
    - Mozilla が利用規約の更新に対する批判を受け Firefox の利用規約を再度更新
    - ユーザーの入力内容の所有権は主張しないと明記、CCPA などの法律での「販売」という用語に対応するように FAQ を更新

  #### Intents

- Ship RTCDegradationPreference
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/W308XfoORIA
- **Ship: Import Attributes**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/segjV77p6k0
- **Ship: Error.isError**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/8oQCgIgOLPU
- Ship: The new white-space normalizer of HTMLEditor
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/AApo_nCuR78
- **Ship: Temporal**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/RtsRo93ygO4/m/2YzM42GUBwAJ
- Prototype: Notification.actions
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/0yo4hRuOVWQ
- Change:
- Remove:
- **Unship: UA styles for h1 in article, aside, nav, section**

  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/CzG_pVa7pws/m/Ab3Bwsg2BQAJ
  - section 系要素の入れ子度合いに応じて h1 のフォントサイズが変わっていた挙動を削除する
  - Chromium も deprecate し、console エラーが出たり、Lighthouse でもスコアが下がったりするようになる
    - https://github.com/whatwg/html/issues/7867#issuecomment-2711538791

  #### Newsletter

- Firefox WebDriver Newsletter 136 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-136/
- Firefox DevTools Newsletter - 134 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-134/
- Firefox DevTools Newsletter - 135 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-135/
- Firefox DevTools Newsletter - 136 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-136/
- Network override in Firefox DevTools - Firefox Developer Experience
  - https://fxdx.dev/network-override-in-firefox-devtools/
- Firefox WebDriver Newsletter 137 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-137/
- SpiderMonkey Newsletter (Firefox 135-137) | SpiderMonkey JavaScript/WebAssembly Engine

  - https://spidermonkey.dev/blog/2025/03/17/newsletter-firefox-135-137.html

  #### MDN / Open Web Docs

- **Implications of Global Privacy Control | MDN Blog**
  - https://developer.mozilla.org/en-US/blog/global-privacy-control/
  - DNT は法律の裏付けが無かったため、誰も守らず形骸化した
  - CCPA は GPC 準拠を勧告したため、サービスはこれに従う
- **Bloomberg Joins Open Web Docs**

  - https://openwebdocs.org/content/posts/bloomberg/

  #### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2025-03-01+
- Positive
  - **HTML: passwordrules attribute**
    - https://github.com/mozilla/standards-positions/issues/61
  - Extending the PointerEvent with Unique DeviceId Attribute
    - https://github.com/mozilla/standards-positions/issues/715
  - WebRTC: RTCIceCandidate relayProtocol and url properties
    - https://github.com/mozilla/standards-positions/issues/976
  - **View Transition Classes**
    - https://github.com/mozilla/standards-positions/issues/988
  - RTCRtpEncodingParameters.scaleResolutionDownTo
    - https://github.com/mozilla/standards-positions/issues/1071
  - **CSS `text-box`, `text-box-trim`, `text-box-edge`**
    - https://github.com/mozilla/standards-positions/issues/1105
  - **[Push API] Declarative Web Push**
    - https://github.com/mozilla/standards-positions/issues/1176
- Defer

  - Focusgroup
    - https://github.com/mozilla/standards-positions/issues/631

  #### Other

- Browser choice? Here's how EU's DMA is helping make it real
  - https://blog.mozilla.org/en/products/firefox/eu-digital-markets-act/
- **Mozilla's response to proposed remedies in U.S. v. Google**
  - https://blog.mozilla.org/en/mozilla/internet-policy/proposed-remedies-browsers/
  - 司法省が Google の検索訴訟に対して救済案を出した
  - ブラウザ開発者への検索ライセンスの支払いを全て禁止するもの
  - この提案はブラウザの競争を助けるどころか、毀損する
  - Mozilla が検索ライセンスの収入を失えば、Gecko の開発が危うくなる
  - それは自由でオープンな Web の終わりを意味する
- **Browser choice? Here's how EU's DMA is helping make it real**
  - https://blog.mozilla.org/en/products/firefox/eu-digital-markets-act/
  - 一年前に施行された DMA によるブラウザ選択画面について
  - ユーザは選択肢を求めているし、それがあるべきという話
  - ドイツやフランスで iOS 上の Firefox ユーザは倍近く増えてる
- **Enhancing CA Practices: Key Updates in Mozilla Root Store Policy, v3.0 - Mozilla Security Blog**
  - https://blog.mozilla.org/security/2025/03/12/enhancing-ca-practices-key-updates-in-mozilla-root-store-policy-v3-0/
  - 3/15 から Mozilla Root Store Policy (MRSP) v3.0
  - Addressing Delayed Certificate Revocation
    - 失効はずっと問題だから自動化しろよ
  - No Exceptions to Revocation Requirements
    - 「この場合は失効期限の例外を」みたいな例外は無し
  - Stronger Subscriber Communication and Contractual Clarity
    - 失効期限が守られるような契約をしとけよ
  - Mass Revocation Preparedness
    - 大規模な失効がちゃんとできるよう備えろよ
    - ここは第三者の評価も入れろよ
  - Enhancing Automation in Certificate Issuance and Renewal
    - Web 用は DCV での自動発行/更新を提供すること
    - 最高 30 日で自動更新すること
    - CCADB に ACME を試せるテスト Web サイトを載せること
  - Phasing Out Dual-Purpose (TLS and S/MIME) Root CAs
    - Web と Mail を両方兼ねる兼用 CA を段階的にやめる
    - TLS, S/MIME を分離して、セキュリティ強化の展開を早める
    - 2026/4/15 までに移行計画を Mozilla に提出
    - 2028/12/31 までに移行完了
  - Strengthening CA Key Security with "Cradle-to-Grave" Monitoring
    - 発行したがまだ使ってない鍵のモニタリングも実施
- 4 accessibility tools to try in Firefox

  - https://blog.mozilla.org/en/products/firefox/accessibility-extensions/

  ### Safari 動向

  #### Stable: 18.4

  #### Updates

- Safari Technology Preview 215 | WebKit
  - https://webkit.org/blog/16523/release-notes-for-safari-technology-preview-215/
  - CSS
    - Added support for Scroll Driven Animations.
    - Added support for text-wrap-style: pretty.
    - **Added support for CSS Anchor Positioning.**
  - Images
    - Added support for HDR images.
  - Web API
    - Added support for Trusted Types.
    - Added support for the File System WritableStream API.
- **WebKit Features in Safari 18.4 | WebKit**
  - https://webkit.org/blog/16574/webkit-features-in-safari-18-4/
  - **Declarative Web Push**
  - CSS
    - **Shape function**
    - **Details styling**
    - Sideways writing modes
    - **Text auto space**
      - Chromium にも早く実装してくれと言ってる人がいる
      - https://groups.google.com/a/chromium.org/g/blink-dev/c/my9MyWxa2ns/m/R6qAtNQkCAAJ
    - View Transitions
      - `match-element` の実装
    - And more CSS updates
      - `attr()` fallback
  - HTML
    - `<input type="color" colorspace alpha>`
  - Web Inspector
  - Media
  - WebRTC
  - SVG
  - Web API
    - `dialog.requestClose()`
    - **Cookie Store API**
    - Compression Streams
  - JavaScript
    - **Iterator Helpers**
    - JSON Parsing
    - **`Error.isError`**
  - Canvas
  - Editing
  - Loading
  - WebAssembly
  - Web Extensions
    - Browser Web Extension APIs
    - Temporary Extension Installation
    - Developer ID-Signed and Notarized Safari Web Extensions
    - Reliable Document Identification
    - Efficient Storage Key Retrieval
    - Improved Localization Support
    - Expanded Subframe Injection
  - WKWebView
  - Networking
    - **CHIPS**
  - Storage
  - **Connection Security**
    - HTTPS での接続が 87%を超えたため、アドレスバーから鍵アイコンを削除
    - 3DES で警告を表示
  - Security
  - Resolved Issues
    - バグ修正多数
- **Meet Declarative Web Push | WebKit**

  - https://webkit.org/blog/16535/meet-declarative-web-push/
  - The status quo
    - Challenge 1 - Silent push protection
    - Challenge 2 - Tracking data
  - How to use Declarative Web Push
  - A note on backwards compatibility
  - What if I can't send the notification description through the internet?
  - Standards work

  #### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2025-03-01+
- Support

  - Add MediaStreamTrack support to the Web Speech API
    - https://github.com/WebKit/standards-positions/issues/438

  #### Other

- **Item Flow, Part 1: A new unified concept for layout | WebKit**

  - https://webkit.org/blog/16587/item-flow-part-1-a-new-unified-concept-for-layout/
  - Masonry Layout を議論する過程で Item Flow という新たな概念が登場
  - Item Flow をもちいると Flexbox, Grid, Masonry が全て統一的に説明できる
    - Item Direction: 方向
    - Item Wrap: 折り返し
    - Item Pack: しきつめ
      - Dense packing
      - Balanced packing
      - Collapsed packing
    - Item Slack: たるみ
  - The Overall Plan
  - この概念についてフィードバックを募集

  ### Edge 動向

  #### Stable:

  #### Updates

- https://blogs.windows.com/msedgedev/
  - ここがメイン
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見れる
- https://twitter.com/MSEdgeDev

  - これを見るしか無い

  #### Other

- Debugging Chromium - text/plain
  - https://textslashplain.com/2025/03/25/debugging-chromium/
- **Windows 10/11 に「Noto」フォントが標準搭載へ ～日中韓の Web ブラウジングが改善 - 窓の杜**
  - https://forest.watch.impress.co.jp/docs/news/1670239.html
  - Noto Sans/Serif CJK が Windows Insider に入った
- **Minding the gaps: A new way to draw separators in CSS - Microsoft Edge Blog**

  - https://blogs.windows.com/msedgedev/2025/03/19/minding-the-gaps-a-new-way-to-draw-separators-in-css/
  - Grid や Flexbox のみならず、将来的には Masonry などでも使えるように `column-rule` を拡張し、横方向用に `row-rule` を新設することで、コンテナレイアウトでも縦横不問の Separator を実現したい

  ### WHATWG/W3C 動向

  #### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft

  - First Public Working Draft: ContentEditable | 2025 | News | W3C
    - https://www.w3.org/news/2025/first-public-working-draft-contenteditable/
  - **CSS Form Control Styling Level 1**
    - https://www.w3.org/TR/css-forms-1/
    - Form Control のカスタマイズ方法についてまとめていく作業の最初のドラフト
    - `appearance: base` でベーシックな見た目にオプトインで変更し、さらに追加される数多くの擬似要素で見た目をカスタマイズできるように
    - 主に疑似要素の定義の集約から
    - Open Issues: https://github.com/w3c/csswg-drafts/issues?q=is%3Aissue%20state%3Aopen%20label%3Acss-forms-1

  #### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- open-ui/meetings/telecon/2025-03-06.md
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-03-06.md
  - [openable] do we need exclusive openables? [#1163](https://github.com/openui/open-ui/issues/1163)
    - Tab UI のようなパターンで JS なしで排他性を持たせたい
  - [Interest invokers] Keyboard inputs [#1133](https://github.com/openui/open-ui/issues/1133)
    - 現状のまとめ
    - https://blog.sakupi01.com/dev/articles/standardizing-user-intent-with-interest-invokers
- open-ui/meetings/telecon/2025-03-13.md
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-03-13.md
  - New draft of appearance:base spec [#1175](https://github.com/openui/open-ui/issues/1175)
    - `control-value()` で取得できる値の type を string 以外にも対応したい
      ( attr に type を指定できるようになった感じ)
- open-ui/meetings/telecon/2025-03-20.md
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-03-20.md
  - **[menu] Menu elements proposal [#1179](https://github.com/openui/open-ui/issues/1179)**
    - https://docs.google.com/document/d/1xJlcuHEvWULa_5iwPwIg6KtvGtVBvyBm_nxkUK7ONTY/
    - 現状の `<menu>` はブラウザでは `<ul>` と違いないものとして表される
    - なので、APG に則った独自の実装が必要とされているが、これを標準でやろうという提案
    - > OpenUI will incubate the "menu" concept, and we can land an explainer.
- Others

  - Add initial explainer for menu elements by dizhang168
    - https://github.com/openui/open-ui/pull/1181
  - **Enhanced Range Input (Explainer)**
    - https://open-ui.org/components/enhanced-range-input.explainer/
    - 先月取り上げた range の拡張の explainer が公開

  #### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
- Meeting 17 for joint OpenUI-WHATWG/HTML-CSSWG task force on styleable form controls
  - https://github.com/whatwg/html/issues/11059
  - **[Anne] Web Compatibility of Scoped Custom Element Registries**
    - https://github.com/whatwg/html/issues/11076
  - Not present, carry over
  - Domenic: polyfills cause problems when not ensuring compat with at least one active implementation. Should we write up a recommendation for polyfill people?
  - Polymer などの Polyfill ライブラリが、同じ名前の`ShadowRoot.prototype.customElements`を独自に実装していたものと衝突してバグが出た
- Upcoming WHATNOT meeting on 2025-03-06
  - https://github.com/whatwg/html/issues/11081
- Upcoming WHATNOT meeting on 2025-03-13
  - https://github.com/whatwg/html/issues/11115
- Upcoming WHATNOT meeting on 2025-03-20

  - https://github.com/whatwg/html/issues/11131

  #### Other

- W3C Breakouts Day 2025
  - https://www.w3.org/2025/03/breakouts-day-2025/
  - 来月やる
- **Popping preconceived popover ponderings | scottohara.me**
  - https://www.scottohara.me/blog/2025/03/14/popovers.html
  - Popover の設計思想と、単体で使用することが推奨されない事情について。
  - 元々は `<popup>` として定義されていた。しかし、`<popup>` のセマンティクスはユースケースによって多岐にわたる。
  - これらの多様なユースケースに対応するため、特定のセマンティクスを持つ新しい HTML 要素ではなく、異なる要素に適用できる「振る舞いの集合」をグローバル属性として実装する方向に進んだ。それが Popover API。
  - > The popover attribute isn't meant to be the end-goal. It represents a collection of behaviors that can be used to make the basis of most types of popups - including the listbox popup for the customizable select element.
  - 加えて、自動でフォーカス移動されない理由や、フォーカスアウトで自動的に閉じられない理由、モーダルダイアログではない理由なども書いてある
- **How do we move logical shorthands forward? | OddBird**
  - https://www.oddbird.net/2025/03/27/logical-options/
  - 論理プロパティをデフォルトで使いたい
  - ショートハンドで `logical 1em 2em` など拡張するのもいいが、それだと永遠に 2nd-class citizen のまま
  - `box-sizing` のようにスイッチがあればいいかもしれないが、影響範囲が大きすぎる
  - 影響を調査するにも現状手立てがないので、スポンサーを募集している
    - https://opencollective.com/oddbird-open-source/contribute/css-logical-shorthands-86141
- First catalog of web features completed by the WebDX Community Group | 2025 | Blog | W3C
  - https://www.w3.org/blog/2025/first-catalog-of-web-features-completed-by-the-webdx-community-group/
- WCCG
  - Sessions for March 26th W3C Breakout Day 2025 · Issue #1095 · WICG/webcomponents
    - https://github.com/WICG/webcomponents/issues/1095
  - DOM Parts · Issue #19 · w3c/breakouts-day-2025
    - https://github.com/w3c/breakouts-day-2025/issues/19
  - **Template Instantiation · Issue #20 · w3c/breakouts-day-2025**
    - https://github.com/w3c/breakouts-day-2025/issues/20
  - Scoped custom element registry · Issue #18 · w3c/breakouts-day-2025
    - https://github.com/w3c/breakouts-day-2025/issues/18
- CSSWG

  - [css-fonts-4] Extension of font-stretch property
    - https://lists.w3.org/Archives/Public/www-style/2025Mar/0000.html
  - [CSSWG] Minutes Telecon 2025-03-05 [css-fonts][css-values][css-overflow][css-display]
    - https://lists.w3.org/Archives/Public/www-style/2025Mar/0005.html
  - **[css-forms-1] First initial complete draft published**
    - https://lists.w3.org/Archives/Public/www-style/2025Mar/0004.html
  - Open UI-WHATWG/HTML-CSSWG Meeting Notes 2025-03-06
    - https://lists.w3.org/Archives/Public/www-style/2025Mar/0006.html
  - [css-text-decor] Mongolian Horizontal Preferred position is wrong
    - https://lists.w3.org/Archives/Public/www-style/2025Mar/0007.html
  - [CSSWG] Minutes Telecon 2025-03-12 [css-view-transitions][css-align][css-anchor-position][css-text][css-sizing]
    - https://lists.w3.org/Archives/Public/www-style/2025Mar/0013.html
  - [CSSWG] Minutes Telecon 2025-03-19 [css-forms][css-conditional][css-scoping][css-values]
    - https://lists.w3.org/Archives/Public/www-style/2025Mar/0020.html
  - **[CSSWG][css-grid-3] CSS Grid Level 3 (masonry layout) updated WD**
    - https://lists.w3.org/Archives/Public/www-style/2025Mar/0029.html
  - **[css-fonts-4] Feature for making text always fit the width of its parent · Issue #2528 · w3c/csswg-drafts**
    - https://github.com/w3c/csswg-drafts/issues/2528#issuecomment-2769621512
    - コンテナの幅いっぱいにテキストを表示させたい
    - > RESOLVED: Start work on this in Fonts 5 and begin incubating.

  ### TC39 動向

  #### Meeting

- 2025-02

  - https://github.com/tc39/agendas/blob/main/2025/02.md
  - https://github.com/tc39/notes/pull/363
  - TC39 Minutes を読む
    - https://docs.google.com/document/d/1qXUf4QRTbexUj0fg2sgYTxWwOT2v_q7lmjR282BOWLU/
  - 2025 年の Ecma President に Daniel Ehrenberg が選出された
  - ES2025 がこのミーティングの終わりに凍結
  - Igalia の Test262 へのファンドが終了
  - ECMA-426 (Source Map) が GA
  - `Float16Array` が Stage4
  - `RegExp.escape` が Stage4
  - import defer stage 3
  - Temporal の 2 つの完全な実装が揃いそう
  - ShadowRealm
    - 公開する API を選定中
    - W3C TAG は新しい API は全ての環境で使えるべきという原則を採用
    - しかし crypto.subtle はイベントループに依存しており無理
  - Decorator
    - コミュニティの関心は高いが、エンジンの関心は低い
    - どのブラウザも最初にリリースすることを躊躇している
    - ベンダ自身やそのユーザにとってプライオリティが低く、Temporal や Intl が優先されている
    - Champion は 5 年ほど費やしてるのにこの温度感なので大変そう
  - `Math.clamp`
    - 丸め込みのメソッド提案
    - 引数の順番で議論
    - 普通 `(val, min, max)` だが CSS だけ `(min, val, max)`
    - コンセンサスは前者
    - ただし、Static Method か Protoype Method かは別途議論
    - Number の Static Method なら Val がいらなくなる
  - `Number.isSafeNumeric`
    - 文字列が安全に数値に変換できるかテストする関数
    - バリデーションで使える
    - 「安全」の定義が曖昧なのでペンディング
  - `Error.captureStackTrace()`
    - Stage 1
  - `Error.stack`
    - Stage 2
  - Record / Tuple
    - 構文や `===` オーバーライドを諦めれば道はありそう
    - それでもいいから探求しようという方向に
    - acutmore/proposal-composites
      - https://github.com/acutmore/proposal-composites
  - Decision Making through Consensus
    - 単一の拒否権が議論を終わらせられる問題
    - ブラウザベンダが事実上の拒否権を持ってる
    - 提案ブロックには 5% or 2 名以上の賛同などのルールがあったほうがいいのでは?
    - 結論は出ないが今後継続

  #### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2025-02-01}...main@{2025-04-01}
- https://tc39.github.io/beta/
- 0->1
  - Error.captureStackTrace
  - Math.clamp
  - Curtailing the power of "Thenables"
- 1->2
  - Error Stack Accessor
- 2->2.7
  - Immutable ArrayBuffer
  - ESM Phase Import
- 2.7->3
  - import defer
- 3->4

  - RegExp.escape
  - Float16Array

  #### New Proposals

- **Release ES2025 Candidate March 31st 2025 · tc39/ecma262**

  - https://github.com/tc39/ecma262/releases/tag/es2025-candidate-2025-03-31

  #### WinterTC

- https://github.com/wintercg/admin/issues?q=label%3A%22meeting%22%20
- 2025-03-06 meeting agenda · Issue #99 · wintercg/admin
  - https://github.com/wintercg/admin/issues/99
  - 特に無し
- 2025-03-20 meeting agenda · Issue #108 · wintercg/admin

  - https://github.com/wintercg/admin/issues/108
  - 特に無し

  #### Other

- Summary of the February 2025 TC39 plenary

  - https://blogs.igalia.com/compilers/2025/03/27/summary-of-the-february-2025-tc39-plenary/

  ### IETF 動向

  #### IETF122

- HTTP Working Group Minutes - IETF 122

  - https://httpwg.org/wg-materials/ietf122/minutes.html
  - HTTPBis meeting 1 March 18 2025
    - Chair present: Tommy Pauly
      - Notetaker: Yaroslav Rosomakho
    - QUERY method: Mike Bishop is presenting in person, Julian Reschke remote
    - CONNECT-TCP: Ben Schwartz is presenting remotely
    - Security Considerations for Optimistic Protocol Transitions in HTTP/1.1: Ben Schwartz is presenting remotely
    - Resumable Uploads: Marius Kleidl presents remotely
    - Secondary Certificate Authentication: Eric Gorbaty presents in person
    - end of agenda for today
  - HTTPBis meeting 2 March 21 2025
    - Chair present: Tommy Pauly
      - Notetaker: Nidhi Jaju and Eric Kinnear
    - No-Vary-Search: Domenic Denicola, presenting remotely
    - Incremental HTTP Messages: Kazuho Oku, presenting in-person
      - #3007, Definition of Incremental Delivery
    - HTTP Unencoded Digest: Lucas Pardue, presenting remotely
    - **Delete-Cookie and _HttpOnly Prefix: Yoav Weiss, presenting remotely**
    - **Cookies: HTTP State Management Mechanism: Johann Hofmann, presenting remotely**

  #### WG

- RFC
- RFC 9745: The Deprecation HTTP Response Header Field
  - https://www.rfc-editor.org/rfc/rfc9745.html
- Work
- Meeting

  #### Other

- **aipref WG IETF122 Chair Slides - slides-122-aipref-chair-slides-00.pdf**

  - https://datatracker.ietf.org/meeting/122/materials/slides-122-aipref-chair-slides-00

  ### 周辺動向

  #### ベンダー動向

- Igalia WebKit Team | WebKit Igalia Periodical #15
  - https://blogs.igalia.com/webkit/blog/2025/wip-15/
- Igalia WebKit Team | WebKit Igalia Periodical #16
  - https://blogs.igalia.com/webkit/blog/2025/wip-16/
- Igalia WebKit Team | WebKit Igalia Periodical #17
  - https://blogs.igalia.com/webkit/blog/2025/wip-17/
- Igalia WebKit Team | WebKit Igalia Periodical #18
  - https://blogs.igalia.com/webkit/blog/2025/wip-18/
- Igalia WebKit Team | WebKit Igalia Periodical #19
  - https://blogs.igalia.com/webkit/blog/2025/wip-19/
- Find-in-Page Highlight Styling
  - https://blogs.igalia.com/schenney/find-in-page-highlight-styling/
  - Igalia が進めている `::search-text` と `::search-text:current` の実装について
  - Find in Page におけるハイライト表示のスタイルを CSS で制御できる
- Summary of the February 2025 TC39 plenary
  - https://blogs.igalia.com/compilers/2025/03/27/summary-of-the-february-2025-tc39-plenary/
- Breakouts 2025: Collective
  - https://bkardell.com/blog/Breakouts2025.html
- Chaos in Cloudflare's Lisbon office: securing the Internet with wave motion

  - https://blog.cloudflare.com/chaos-in-cloudflare-lisbon-office-securing-the-internet-with-wave-motion/
  - Cloudflare の Lisbon オフィスにできた新しいエントロピーの壁について
    - 波を発生させてそれを使う。名前を募集中

  #### セキュリティ動向

- **Troy Hunt: A Sneaky Phish Just Grabbed my Mailchimp Mailing List**

  - https://www.troyhunt.com/a-sneaky-phish-just-grabbed-my-mailchimp-mailing-list/
  - Have I Been Pwned の運営者 Troy Hunt がフィッシングにやられ、運営するメーリングリストの購読者のメールアドレスが抜かれる
    - Mailchimp が解約者のメールアドレスも保存していたので被害にあった人数が増えてしまった
    - 奇しくもパスキーの重要性について話をしたあとだった

  #### Cookie 動向

- My cookie spec problem | daniel.haxx.se

  - https://daniel.haxx.se/blog/2025/03/01/my-cookie-spec-problem/

  #### Other

- Google Being Forced To Sell Chrome is Not Good for the Web - Chris Coyier
  - https://chriscoyier.net/2025/03/14/google-being-forced-to-sell-chrome-is-not-good-for-the-web/
  - Related:What Happens If They Sell Chrome? - Igalia Chats
    - https://www.igalia.com/chats/chris-coyier
- As Skype shuts down, its legacy is end-to-end encryption for the masses | TechCrunch
  - https://techcrunch.com/2025/03/03/as-skype-shuts-down-its-legacy-is-end-to-end-encryption-for-the-masses/
- Final report into mobile browsers and cloud gaming published - GOV.UK
  - https://www.gov.uk/government/news/final-report-into-mobile-browsers-and-cloud-gaming-published
- **Servo vs Ladybird**
  - https://thelibre.news/servo-vs-ladybird/
  - 資金状況や開発状況について
  - WPT のスコアは Servo が高いが Ladybird が急速に追い上げている
  - 資金は Ladybird が潤沢
  - パフォーマンスは Servo が高いが、SpiderMonkey の JIT が影響している?
- AI is the future of accessibility - Karl Groves
  - https://karlgroves.com/ai-is-the-future-of-accessibility/
  - > If accessibility advocates aren't at the table now, AI systems will continue to reflect the same exclusions we've been fighting for decades.
- **(令和 7 年 3 月 31 日)スマートフォンにおいて利用される特定ソフトウェアに係る競争の促進に関する法律における特定ソフトウェア事業者の指定について | 公正取引委員会**
  - https://www.jftc.go.jp/houdou/pressrelease/2025/mar/250331_smartphone.html
  - Apple, iTunes, Google が特定ソフトウェア事業者に指定
- Opera、AI がウェブ操作を代行「Browser Operator」 - Impress Watch

  - https://www.watch.impress.co.jp/docs/news/1667787.html

  ### イベント

- 3 月
  - 15-21: IETF 122 Bangkok
    - https://www.ietf.org/meeting/122/
  - 26: W3C Breakouts Day 2025
    - https://www.w3.org/2025/03/breakouts-day-2025/
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
  - 134
    - dialog light-dismiss
    - customizable select
  - 135
    - anchor positioning remembered scroll offset
    - css carousels (`::column`, `::scroll-button()`, `::scroll-marker`, `::scroll-marker-group`), interactivity
    - partitioning `:visited`
    - Float16Array
    - HTTP cache partition key
    - HSTS tracking prevention
    - `command`/`commandfor`
    - `fetchLater`
    - Interest invokers origin trial
  - Ship
    - anchor positioning remembered scroll offset
    - type agnostic `var()` fallback
    - `view-transition-name: auto`
    - `view-transition-name: match-element`
    - Accept-Language reduction for HTTP header
  - Prototype
    - `sibling-index()`, `sibling-count()`
    - `Delete-Cookie` header
    - related website partition
    - source phase imports
    - `flex-wrap: balance`
  - Experiment
    - extend 3pcd
  - Deprecate and Remove
    - h1 style inside sectioning elements
  - PSA
    - private proof api
  - web.dev
    - css baseline support in eslint
  - Chrome Developers
    - `@function` delayed to 139
    - css carousels
  - other blogs
    - HTTPS certificate security reqs
    - v8 moving from turbofan to turboshaft
- Firefox
  - 136
    - サイドバーと縦タブ
    - HTTPS-first
    - Cookie Store API が入るも無効に
    - `Intl.DurationFormat`
    - `dialog :open`
  - Ship
    - import attributes
    - `Error.isError`
    - Temporal
  - other intents
    - unship h1 inside sectioning elements
  - MDN Blog
    - GPC
    - Bloomberg joins OWD
  - Standard Position
    - positive
      - passwordrules
      - `view-transition-class`
      - `text-box`
      - declarative web push
  - other
    - 利用規約再度更新
    - 司法省 vs Google の影響
    - DMA の browser choice がユーザーを増やした
    - Root Store Policy 3.0
- Safari
  - TP 215
    - Scroll Driven Animations
    - `text-wrap-style: pretty;`
    - CSS Anchor Positioning
  - 18.4
    - Shape Function
    - Details Styling
    - Text Auto Space
    - View Transitions `match-element`
    - `attr()` fallback
    - Cookie Store API
    - Iterator Helpers
    - `Error.isError`
  - Standard Position
  - other
    - Masonry 第 3 案としての Item Flow Properties
    - Declarative Web Push の説明
- Edge
  - Windows 10/11 に「Noto」フォントが標準搭載
  - CSS Separators: `column-rule`, `row-rule` の MS Explainer
- W3C/WHATWG
  - Draft
    - First Public Working Draft: ContentEditable
    - CSS Form Control Styling Level 1
  - Open UI
    - Interest Invokers Keyboard Inputs
    - Menu Elements Proposal
    - Enhanced Range Input
  - WHATNOT meeting
    - Scoped Custom Element Registries の Polyfill 問題
  - Other
    - W3C Breakouts Day 2025
    - Popover の設計思想と、単体で使用することが推奨されない事情
    - CSS 論理プロパティをデフォルトで使いたい
    - Baseline の功績まとめ
    - CSS Form Control Styling Level 1 First Initial Public Working Draft Published
    - CSS Grid Level 3 (masonry layout) updated Working Draft
- TC39
  - LittleDan が Ecma President に
  - ES2025 Freeze
    - Float16Array Stage
    - `RegExp.escape`
  - ECMA-426 (Source Map) が GA
  - Decorator をみんな最初に Ship したくない
  - `Math.clamp` の引数の順をどうするか
  - Record / Tuple の妥協版の道模索
  - ベンダ単一の拒否権が強すぎるのでルールが欲しい
  - WinterTC
    - 特に無し
- IETF
  - HTTPWG で `Delete-Cookie` や `__HttpOnly-` Prefix の話
  - aipref WG のワークスタート
- 周辺動向
  - ベンダー動向
  - セキュリティ動向
    - Have I Been Pwned の運営者がフィッシング詐欺
  - Cookie 動向
  - Other
    - Servo vs Ladybird は Ladybird の資金が潤沢
    - Apple, iTunes, Google が特定ソフトウェア事業者に指定