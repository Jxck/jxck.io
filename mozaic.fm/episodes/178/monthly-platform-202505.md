---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep178.mp3
published_at: 2025-05-31
guest: [@myakura](https://github.com/myakura)
guest: [@saku](https://x.com/sakupi01)
---

# ep178 Monthly Platform 202505

## Theme

第 178 回のテーマは 2025 年 5 月の Monthly Platform です。


## Show Note

### Chrome 動向

#### Stable: 137


#### Updates

- **New in Chrome 136**
  - https://developer.chrome.com/blog/new-in-chrome-136
  - Highlights from this release
  - RegExp.escape is now Baseline Newly available
  - :visited link history is now partitioned
  - **Upgrade credentials to passkeys**
    - プロンプト無しで自動で Passkey を登録
    - ユーザがパスワードを保存しているサイトのみ
- What's new in DevTools, Chrome 136
  - https://developer.chrome.com/blog/new-in-devtools-136
- **Chrome 137 beta**
  - https://developer.chrome.com/blog/chrome-137-beta
  - CSS and UI
    - The `if()` function
    - The `reading-flow` and `reading-order` properties
    - `offset-path: shape()`
    - Support transform attribute on SVGSVGElement
    - Allow `<use>` to reference an external document's root element by omitting the fragment.
    - System accent color for accent-color property expanded to Windows and ChromeOS
    - view-transition-name: match-element
  - Web APIs
    - Align error type thrown for 'payment' WebAuthn credential creation
    - Blob URL Partitioning: Fetching/Navigation
    - Call stacks in crash reports from unresponsive web pages
    - Canvas Floating Point Color Types
    - Disallow non-trustworthy plaintext HTTP prerendering
    - `Document-Isolation-Policy`
    - Ed25519 in Web Cryptography
    - IP address logging and reporting
    - JavaScript Promise Integration
    - Language Detector API
    - Restrict float attributes and arguments on SVGMatrix, SVGRect, and SVGPoint
    - Selection API getComposedRanges and direction
    - Web app scope extensions
    - WebAssembly Branch Hints
    - WebGPU: GPUTextureView for externalTexture binding
    - WebGPU: copyBufferToBuffer overload
  - New origin trials
    - Full frame rate render blocking attribute
    - Pause media playback on not-rendered iframes
    - Rewriter API
    - Writer API
- New in Chrome 137
  - https://developer.chrome.com/blog/new-in-chrome-137
  - CSS reading-flow and reading-order
  - CSS `if()` function
  - WebAssembly JavaScript Promise Integration (JSPI)
- **Chrome 138 beta**
  - https://developer.chrome.com/blog/chrome-138-beta
  - CSS and UI
    - CSS stretch sizing keyword
    - CSS sign-related `functions: abs(), sign()`
    - **CSS env variable for OS-level font scale**
    - CSS `sibling-index()` and `sibling-count()`
    - Interpolation progress functional notation: CSS `progress()` function
      - https://github.com/w3c/csswg-drafts/issues/7268
    - Viewport Segments Enumeration API
  - Web APIs
  - Add support for video frame orientation metadata to WebCodecs
    - Crash Reporting API: is_top_level and visibility_state
    - Escape `<` and `>` in attributes on serialization
    - Integrity Policy for scripts
    - Predictable reported storage quota
    - pushsubscriptionchange event upon resubscription
    - Speculation rules: Add prefetchCache and prerenderCache to Clear-Site-Data header
    - Speculation rules: target_hint field
    - Strict Same Origin Policy for Storage Access API
    - Summarizer API
    - Language Detector API
    - Translator API
    - Web app scope extensions
    - Web serial over Bluetooth on Android
  - Deprecations and removals
    - Deprecate asynchronous range removal for Media Source Extensions
    - Remove SwiftShader fallback
- **10 updates from Google I/O 2025**
  - https://developer.chrome.com/blog/web-at-io25
  - **Carousels are now easier than ever to build with a few lines of CSS and HTML**
  - Declarative Popovers: Introducing the new Interest Invoker API
  - Several built-in AI APIs using leading models like Gemini Nano are available, now featuring multimodal capabilities in the Prompt API
  - Client-side AI extends with Firebase and Gemini Developer API to provide a hybrid AI solution
  - AI assistance in Chrome DevTools supports your debugging workflow across styling, performance, and more
  - Real-user data, Lighthouse Insights, and AI features in the Chrome DevTools Performance panel helps you understand and fix performance issues
  - Baseline features availability is now in your familiar tools: VS Code, ESLint, and more
  - Gain a complete view of web feature support with Web Platform Dashboard
  - Developer trial for a streamlined sign-in experience with Credential Manager
- Reshaping user authentication and identity verification
  - https://developer.chrome.com/blog/io25-web-identity
- AI APIs are in stable and origin trials, with new Early Preview Program APIs
  - https://developer.chrome.com/blog/ai-api-updates-io25
- What's new in DevTools, Chrome 137
  - https://developer.chrome.com/blog/new-in-devtools-137
- Enhancing Gemini Nano: delivering higher quality summaries with LoRA
  - https://developer.chrome.com/blog/improved-summaries-gemini-nano
- Watch our AI talks at I/O 2025
  - https://developer.chrome.com/blog/ai-io25
- What's New in WebGPU (Chrome 137)

  - https://developer.chrome.com/blog/new-in-webgpu-137

  #### Intents

- **Ship: System accent color for accent-color property.**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uP9MI1IdZj8
  - システムのアクセントカラーをフォームに適用する
  - checkbox, radio button, progress bar などが対象
- Ship: Web serial over Bluetooth on Android
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BqUGCcurReE
- Ship: Support transactional batchUpdate() and disallow batch inner locks
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jeTztWfTPbQ
- Ship: Language Detector API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sWcHBe9wpbo
- Ship: Viewport Segments Enumeration API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pxWV6Es3T0Q
- Ship: Deprecate GPUAdapter isFallbackAdapter attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Wzr22XXV3s8
- Ship: Update QuotaExceededError to a DOMException derived interface
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/B1AuET73aso?pli=1
- Ship: Short-circuiting `var()`, `attr()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VqnJ6-4vGFs
- **Ship: Pass 'Sec-Purpose: prefetch' header with `<link rel=prefetch>`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0yrUBDA8uUs
- Ship: Escape `"<"` and `">"` in attributes on serialization
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gE6K8-jDWyE
- Ship: CSS sibling-index() and sibling-count()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/opsqx1cBPyc
- Ship: Deprecate asynchronous range removal for Media Source Extensions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/c_W_FapjYGg
- Ship: Modulepreload Referrer Header Fix
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kxd9IUxAKSs
- Ship: Crash Reporting API: is_top_level & visibility_state
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Q0bmByxw9cg
- Ship: Support async attribute for SVG `<script>` element
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JT0XnqTPy6o
- Ship: Summarizer API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cpyB56aHWs4
- Ship: Spec-compliant JSON MIME type detection
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-lZFLXH7_Y8
- **Ship: Speculation rules: target_hint field**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/am_noPAIH5k
- Ship: Add prefetchCache and prerenderCache to Clear-Site-Data header
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/u3ABOeMzZac
- Ship: WebXR Depth Sensing Performance Improvements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6z48GgKC95I
- Ship: Web app scope extensions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KJ3gMgcvFgs
- **Ship: CSS env variable for OS-level font scale**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bZuQAcwcEig
- **Ship: 'request-close' Invoker Command**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/S8q9jq6OTf4
  - `requestClose()` 相当のコマンド
- Ship: WebGPU 'core-features-and-limits'
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8Fy8vnSyNic
- Prototype: Secure Payment Confirmation: Browser Bound Keys
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FCuwg--LqDc
- **Prototype: CSS fit-width text**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/I3aG24t4bwI
- **Prototype: CSS caret-shape property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XNaIQ7R0CSY
  - キャレットのスタイルを変えられる
- Prototype: Add prefetchCache and prerenderCache to Clear-Site-Data header
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XKDWt6Qb0u8
- **Prototype: Prompt API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/x3QEjLYx5Rg
  - Translator や Writer などのタスクベースではなく
  - 直接ローカル LLM にプロンプトを出す API
- Prototype: Pass `Sec-Purpose: prefetch` header with `<link rel=prefetch>`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6RX-nNYdLes
- Prototype: Compute pressure: Own contribution estimate
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_Q-OWlv2Bzg
- **Prototype: Local Style References in Link Tags**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/676KIre8ZZY
  - `<link>` タグで同一ドキュメント内の`<style>`要素をフラグメント識別子(`#id`)で参照できるようにする
  - グローバルスタイルの Web Components への適用時など
  - Light DOM で定義したスタイルを Shadow DOM で再利用したい場合
- **Prototype: @scroll-state scroll-direction support**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nmWAq9cyRxc
  - container query で scroll の方向を取れる
- **Prototype: Trust Anchor Identifiers (TAI)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sTWw9chnhBo
  - TLS/HTTPS サーバが依存する CA を表明する
  - 証明書チェーンが省略できるのでハンドシェイクも小さくできる
- **Prototype: CSS Color for Color Input Value**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lTHmDioYHik
  - color input の value に hex 値以外を指定できるように
  - 値の取得やフォーム送信時は従来通り hex 値で出力。後方互換性のため
- **Prototype: The ident() function**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pAqsAGZIIjw
  - `<custom-ident>` と `<dashed-ident>` の値を動的に構築するための関数
  - `attr()` や `sibling-index()` と組み合わせることで簡潔に ident の自動生成
- Prototype: Show true window position on Android
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6bYDPR1cBPA
- **Prototype: Responsive iframes**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QirdSBIvM1k
- Prototype: Gamepad Event-Driven Input API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5IpJBqhqrMg
- Prototype: Support restrictOwnAudio
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZmUiiT3rhUQ
- Prototype: Stop sending Purpose: "prefetch" header from prefetches and prerenders
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ijLYNiEkR8g
- **Prototype: CSS Anchored Fallback Container Queries**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9NCtqAWS8KA
- Prototype: Local Network Access Restrictions for WebRTC
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CDy8LAs-DoA
- **Prototype: `generate()` Method of URLPattern API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/888ZZfQzZjE
  - URLPattern はパースしか出来なかった
  - 逆に、プレースホルダーに値を割り当てつつ、文字列を生成するメソッドの追加
- **Experiment: Cache sharing for extremely-pervasive scripts**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2rCG7XUZKhM
  - google-analytics.com
  - googlesyndication.com
  - doubleclick.net
  - googletagmanager.com
  - googleapis.com
  - youtube.com
  - のスクリプトのキャッシュを single key にしてパフォーマンス向上
  - https://docs.google.com/spreadsheets/d/1hW-xXj9zEdkTJMVE4b4qcflB00WxsOG72Y0LVtSjcWI/edit?gid=1602510613
  - https://github.com/mozilla/standards-positions/issues/1231#issuecomment-2880080778
- **Experiment: Prompt API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6uBwiiFohAU
- Experiment: WebGPU Compatibility mode
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eCUCpbcH_Co
- **Extend Experiment: Cookie Deprecation Label**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NJrU4AQ5m_I
- Extend Experiment: ServiceWorkerStaticRouterTimingInfo
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/C9_SJuqOtjY
- Extend Experiment: Shared Array Buffers, Atomics and Futex APIs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/X_DczNRJENc
- Extend Experiment: Playout Statistics API for WebAudio
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Q6MUXtJP-wU
- Web-Facing Change PSA: Escape `"<"` and `">"` in attributes on serialization
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ja6CAb7u8rI
- PSA: HTMLFencedFrameElement.canLoadOpaqueURL() to be removed
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dJjA8cQBui0
- PSA: Changes to the `fetch()` option `targetAddressSpace`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rSeg69VGdO4
- Ready for Developer Testing: Modulepreload Referrer Header Fix
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LY7LgtL52DI
- Ready for Developer Testing: HTML in Canvas: drawElement

  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LYJyOdLbOfY

  #### Other

- web.dev
  - New to the web platform in April
    - https://web.dev/blog/web-platform-04-2025
  - April 2025 Baseline monthly digest
    - https://web.dev/blog/baseline-digest-apr-2025
  - Iterator helpers have become Baseline Newly available
    - https://web.dev/blog/baseline-iterator-helpers
  - The ClipboardItem.supports() function is now Baseline Newly available
    - https://web.dev/blog/baseline-clipboard-item-supports
  - **Visual Studio Code now supports Baseline**
    - https://web.dev/blog/baseline-vscode
  - The Baseline Netlify extension has shipped
    - https://web.dev/blog/baseline-netlify-extension
  - WebStatus.dev: Now with more data, deeper insights, and a clearer path to Baseline
    - https://web.dev/blog/web-platform-dashboard-evolution
    - webstatus.dev に機能強化
- google for developers
  - https://developers.googleblog.com/
  - From idea to app: Introducing Stitch, a new way to design UIs
    - https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/
  - What you should know from the Google I/O 2025 Developer keynote
    - https://developers.googleblog.com/en/google-io-2025-developer-keynote-recap/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - https://developer.chrome.com/blog/
  - **Use CSS reading-flow for logical sequential focus navigation**
    - https://developer.chrome.com/blog/reading-flow
    - Grid や Flex レイアウトでのビジュアル順序と DOM の順序が異なる場合、キーボードフォーカスの順序を視覚的順序に合わせる
    - `tab-index` を同時に指定していた場合は `reading-flow` によるフォーカススコープが優先される
  - **Origin trial: Device Bound Session Credentials in Chrome**
    - https://developer.chrome.com/blog/dbsc-origin-trial
  - What's New in WebGPU (Chrome 136)
    - https://developer.chrome.com/blog/new-in-webgpu-136
  - Lighthouse is moving to performance insight audits
    - https://developer.chrome.com/blog/moving-lighthouse-to-insights
  - Origin trial: Cross-device Digital Credentials API now in Chrome desktop
    - https://developer.chrome.com/blog/digital-credentials-cross-device-ot
  - How to style console logs in Chrome DevTools: Color and more!
    - https://developer.chrome.com/blog/devtools-tips-40
  - Document Isolation Policy: Enable powerful web features with ease
    - https://developer.chrome.com/blog/document-isolation-policy
  - Verified uploads in the Chrome Web Store
    - https://developer.chrome.com/blog/verified-uploads-cws
  - **Automatically create passkeys in Google Password Manager on Chrome desktop**
    - https://developer.chrome.com/blog/passkey-automatic-upgrades
    - パスワードを管理してるサイトで、自動的に Passkey を登録する
  - **Enhancements to the `<permission>` element**
    - https://developer.chrome.com/blog/enhancements-to-permission-element
- chromium blog
  - Chromium Blog: Fighting Unwanted Notifications with Machine Learning in Chrome
    - https://blog.chromium.org/2025/05/fighting-unwanted-notifications-with.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
  - Tracking the Cost of Quantum Factoring
    - https://security.googleblog.com/2025/05/tracking-cost-of-quantum-factori.html
- search blog
  - https://developers.google.com/search/
  - Top ways to ensure your content performs well in Google's AI experiences on Search
    - https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search
- v8
  - **Giving V8 a Heads-Up: Faster JavaScript Startup with Explicit Compile Hints · V8**
    - https://v8.dev/blog/explicit-compile-hints
    - どの関数を事前コンパイルするかをコメントで明示して制御する Explicit Compile Hints が Chrome 136 から Ship
    - ただ、事前コンパイルしすぎるとページ初期読み込み時の処理時間やメモリを圧迫する可能性があるので注意とのこと
    - Explicit Compile Hints with Magic Comments - Chrome Platform Status
      - https://chromestatus.com/feature/5100466238652416
  - **JavaScript's New Superpower: Explicit Resource Management**
    - https://v8.dev/features/explicit-resource-management
- other

  ### Firefox 動向

  #### Stable: 139.1

  #### Updates

- **Firefox 138.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/138.0/releasenotes/
  - プロファイルの UI
  - タブグループ
- **Firefox 138 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/138
  - `Error.isError()`
  - `Error.captureStackTrace()`
  - Import attributes
  - `Clear-Site-Data: cache`
    - https://bugzilla.mozilla.org/show_bug.cgi?id=1930500
    - https://bugzilla.mozilla.org/show_bug.cgi?id=1930500
  - `Origin-Agent-Cluster`
  - Import map integrity
- Firefox 139.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/139.0/releasenotes/
  - AI 要約つきリンクプレビューのポップアップ
- **Firefox 139 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/139
  - **`hidden=until-found`**
  - **Temporal**
  - **`requestClose()`**
- Putting up Wallpaper - These Weeks in Firefox: Issue 178
  - https://blog.nightly.mozilla.org/2025/04/07/putting-up-wallpaper-these-weeks-in-firefox-issue-178/
- A Tab Groups Scoop - These Weeks in Firefox: Issue 179
  - https://blog.nightly.mozilla.org/2025/04/23/a-tab-groups-scoop-these-weeks-in-firefox-issue-179/
- Keep on Rolling with Profile Improvements - These Weeks in Firefox: Issue 180

  - https://blog.nightly.mozilla.org/2025/05/05/keep-on-rolling-with-profile-improvements-these-weeks-in-firefox-issue-180/

  #### Intents

- Ship:
  - Ship: Dialog "closedby" attribute (Light Dismiss)
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/OAuP_OJuyEA
  - Ship: CSS Highlight API
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/7pJ-DkgrHtQ
  - Ship: CloseWatcher
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/W2TnGrcMz_s
  - Ship: `pointerrawupdate` event
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/s_hotrmvh7g
  - Ship: Escape `"<"` and `">"` in attributes when serializing HTML
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/noN9YpAywyU
  - **Ship: Explicit Resource Management**
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/K_vucowBMmM
  - Prototype and Ship: PaintTimingMixin for paint timing and LCP without presentationTime
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/qgIwfY6GsnU
  - Prototype and Ship: IntersectionObserver scrollMargin
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/wUYP-C2U24s
- Prototype:
- Change:
  - Change: `click`, `auxclick` and `contextmenu` event target is the preceding `pointerup` event target if and only if the pointer is captured when the `pointerup` is dispatched
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/CoBboR86WnM
- Remove:

  - Unship: beforescriptexecute and afterscriptexecute events in early Beta
    - https://groups.google.com/a/mozilla.org/g/dev-platform/c/3qtHMYJ6paQ

  #### Newsletter

- Firefox DevTools Newsletter - 137 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-137/
- Firefox WebDriver Newsletter 138 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-138/
- Firefox WebDriver Newsletter 139 - Firefox Developer Experience

  - https://fxdx.dev/firefox-webdriver-newsletter-139/

  #### MDN / Open Web Docs

- Color models for humans and devices

  - https://developer.mozilla.org/en-US/blog/color-models-humans-devices/

  #### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2025-05-01+
- Positive

  - `getComputedStyle()` returns true visited colors
    - https://github.com/mozilla/standards-positions/issues/1234
  - colorspace and alpha attributes on `<input type="color">`
    - https://github.com/mozilla/standards-positions/issues/1230
  - Send Sec-Purpose header for link type prefetch (rel=prefetch)
    - https://github.com/mozilla/standards-positions/issues/1228
  - ToggleEvent source attribute
    - https://github.com/mozilla/standards-positions/issues/1220
  - Consolidate `paintTime` and `presentationTime` in performance APIs
    - https://github.com/mozilla/standards-positions/issues/1110
  - Multiple import maps
    - https://github.com/mozilla/standards-positions/issues/1058
  - **CSS interpolate-size property and calc-size() function**
    - https://github.com/mozilla/standards-positions/issues/1022
  - Extending Storage Access API (SAA) to non-cookie storage
    - https://github.com/mozilla/standards-positions/issues/898
  - **Global Privacy Control (GPC)**
    - https://github.com/mozilla/standards-positions/issues/867

  #### Other

- **Firefox Git Migration Update**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/f7c6YbLaToo
  - Firefox のソースコードが Mercurial から GitHub へ移行
  - https://github.com/mozilla-firefox/firefox
  - バグは Bugzilla、レビューは Phabricator という運用は変わらない
- Ads performance, re-imagined. Now in beta: Anonym Private Audiences.
  - https://blog.mozilla.org/en/advertising/anonym/anonym-private-audiences/
- You asked, we built it: Firefox tab groups are here
  - https://blog.mozilla.org/en/firefox/tab-groups-community/
- Tackle tab overload with Firefox Tab Groups
  - https://blog.mozilla.org/en/firefox/firefox-tab-groups/
- **Mozilla's CEO discusses testimony in U.S. v. Google search case**
  - https://blog.mozilla.org/en/mozilla/internet-policy/google-search-deals-and-browser-choice/
  - Google の裁判についての Mozilla CEO の発言
  - 検索パートナーシップがなければ Mozilla の運営は困難
  - 「検索競争の改善は重要だが、ブラウザの競争を犠牲にすべきではない」
- Jump into Firefox Labs: A place to try new features and help shape Firefox
  - https://blog.mozilla.org/en/uncategorized/firefox-labs-fx138/
- **A smarter, simpler Firefox address bar**
  - https://blog.mozilla.org/en/firefox/address-bar/
  - > We've simplified the address bar by trimming "https://" from secure sites, while clearly highlighting when a site isn't secure. This small change improves clarity without sacrificing awareness.
  - スキーム表示が消えた
- Investing in what moves the internet forward
  - https://blog.mozilla.org/en/mozilla/building-whats-next/
  - あとで読むサービスの Pocket と、偽レビュー発見ツールの Fakespot を終了する
- **The future of the web depends on getting this right**
  - https://blog.mozilla.org/en/mozilla/internet-policy/amicus_brief/
- **Firefox Security Response to pwn2own 2025 - Mozilla Security Blog**
  - https://blog.mozilla.org/security/2025/05/17/firefox-security-response-to-pwn2own-2025/
  - pwn2own で報告された脆弱性の報告に 21 時間で対応した
  - 最近 Firefox のフロントエンドで Strict CSP を導入したのもあり、サンドボックスのエスケープが発生しなくなった
  - https://hachyderm.io/@evilpie/114556661209764417
- **'Shifting left' for better accessibility in Firefox | The Mozilla Blog**
  - https://blog.mozilla.org/en/firefox/shifting-left-for-better-accessibility/
  - Firefox がプロダクト開発の早い段階からアクセシビリティを考慮する「Shift Left」アプローチを採用したという紹介
  - 製品開発プロセスを水平線と捉え、Left は "user research" で Right は "launch to market" であるとすると、アクセシビリティは通常右側に位置していたが、左側(早期段階)に移動させることで、障害のある人々と「共に」製品を作る(彼らの「ために」作るのではなく)というアプローチ
  - Shift Left により、設計初期段階から障害のある人々と意見交換することで、アクセシビリティの問題を未然に発見・防止
- **「Firefox 138」のリリースノートにない日本人にとって重要な変更とは? - やじうまの杜 - 窓の杜**

  - https://forest.watch.impress.co.jp/docs/serial/yajiuma/2012339.html
  - NHK プラスは Firefox をサポート対象外にし、対象外というメッセージを出している
  - ただこの表示は Picture-in-Picuture API の feature detection を使っているらしく、Firefox の compat shim 導入により NHK プラスが動くようになった
  - ただ NHK が意図的に Firefox をブロックしている可能性があり、動き続けるかはわからないという話も

  ### Safari 動向

  #### Stable: 18.5

  #### Updates

- **Polishing your typography with line height units | WebKit**
  - https://webkit.org/blog/16831/line-height-units/
  - パラグラフ間の `margin` を、`line-height` の高さに合わせようという啓蒙
- **Easier layout with margin-trim | WebKit**
  - https://webkit.org/blog/16854/margin-trim/
- **Release Notes for Safari Technology Preview 218 | WebKit**
  - https://webkit.org/blog/16861/release-notes-for-safari-technology-preview-218/
  - Added support for `crossorigin()` and `referrerpolicy()` modifiers on CSS image loads.
  - **Added more support for Temporal.**
  - Added support for more web fonts in Lockdown Mode by replacing a fragile hard-coded allowlist with a safe parser that handles a broader range of fonts without compromising security.
  - Added support for `pointer-events="bounding-box"` for SVG group containers.
  - Added support for the request-method content blocker trigger field.
  - Added support in the Debugger tab for stepping over an await statement as though it is synchronous code.
  - Added support for `RTCRtpScriptTransformer.generateKeyFrame` to take a rid parameter.
- **Add wide gamut P3 and alpha transparency to your color picker in HTML | WebKit**
  - https://webkit.org/blog/16900/p3-and-alpha-color-pickers/
  - `<input type=color>` の picker は 16 進数 RGB ベースで始まった
  - そのディスプレイの進化にともない色表現が増えた
  - しかし、picker は進化が止まっていた
  - `colorspace` と `alpha` 属性で UI を変更できる
- **How to have the browser pick a contrasting color in CSS | WebKit**
  - https://webkit.org/blog/16929/contrast-color/
  - `contrast-color()` に色を渡すと、黒/白のコントラストの高い方を選ぶ
  - WCAG2 のアルゴリズムなので必ずしも視覚的にも高いとは限らない
  - `color-contrast()` と異なり WCAG3 になったらアルゴリズムを変えることも視野
  - 白/黒固定なのはその方がシンプルかつ、アルゴリズム変えても互換を壊しにくいため
  - APCA については議論を進めていく
- WebKit Features in Safari 18.5 | WebKit
  - https://webkit.org/blog/16923/webkit-features-in-safari-18-5/
  - Declarative Web Push on macOS
  - Bug Fixes and more
    - Editing
    - JavaScript
    - Lockdown Mode
    - Networking
    - PDF
    - Rendering
    - Sandboxing
    - Service Workers
    - Web Extensions
- Release Notes for Safari Technology Preview 219 | WebKit
  - https://webkit.org/blog/16961/release-notes-for-safari-technology-preview-219/
  - Canvas
    - Resolved Issues
  - CSS
    - Added support for the `margin-trim: block` inline syntax for trimming in both directions.
  - JavaScript
  - Media
  - Rendering
  - Web API
  - Web Extensions
  - WebRTC
    - Added support for RTCEncodedAudioFrame and RTCEncodedVideoFrame constructors.
- **Two lines of Cross-Document View Transitions code you can use on every website today | WebKit**
  - https://webkit.org/blog/16967/two-lines-of-cross-document-view-transitions-code-you-can-use-on-every-website-today/
  - `@view-transition { navigation: auto; }`
- **Release Notes for Safari Technology Preview 220 | WebKit**

  - https://webkit.org/blog/16973/release-notes-for-safari-technology-preview-220/
  - CSS
    - **Added support for field-sizing to override the default sizing behavior of form elements and adjust size to fit their contents.**
  - DOM
  - JavaScript
    - Added support for `@@dispose` and `@@asyncDispose` from the Explicit Resource Management Proposal behind runtime flag.
    - Added support for SuppressedError from the Explicit Resource Management Proposal behind runtime flag.
    - Added support for DisposableStack constructor from the Explicit Resource Management Proposal behind runtime flag.
  - Media
  - Rendering
  - Web Animations
  - Web API
  - Web Inspector
  - WebRTC

  #### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2025-05-01+
- Support
  - **ToggleEvent source attribute**
    - https://github.com/WebKit/standards-positions/issues/494
- Newtral

  - CSP hash reporting keywords
    - https://github.com/WebKit/standards-positions/issues/430

  #### Other

  ### Edge 動向

  #### Stable: 137

  #### Updates

  #### Other

- Attack Techniques: Fake Literally Everything! (Escrow Scam) - text/plain
  - https://textslashplain.com/2025/04/24/attack-techniques-fake-literally-everything/
- **Creating a more accessible web with Aria Notify - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2025/05/05/creating-a-more-accessible-web-with-aria-notify/
  - aria-notify の Origin Trial
  - aria-live ではカバーできなかったケース向け
    - 入力を Ctrl+b で大文字にした際のフィードバック
    - メールの送信後に失敗があった場合の通知
  - 表示されてない部分に DOM を用意して通知するといった必要がなくなる
  - priority を指定して `ariaNotify()` を呼ぶことで通知
- **Microsoft's Bing share is now 12.2%, Google drops to 79.10%, and it's not due to ChatGPT**
  - https://www.windowslatest.com/2025/05/04/microsofts-bing-share-is-now-12-2-google-drops-to-79-10/
  - StatCounter によるとデスクトップ検索で Bing のシェアが上昇中
- **Simplified access to AI in Microsoft Edge: Introducing the Prompt and Writing Assistance APIs - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2025/05/19/introducing-the-prompt-and-writing-assistance-apis/
  - Edge も Prompt API と Writing Assistance API をやる
  - モデルは Phi-4 mini
- **Empowering developers and organizations: Microsoft Edge innovations at Build - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2025/05/19/empowering-developers-and-organizations-microsoft-edge-innovations-at-build/
  - AI APIs and Phi-4-mini model allow developers to enhance web apps
  - Universal productivity boost: PDF translation in Edge creates new documents in a few clicks
  - Automating tasks with Copilot Chat in Edge for Business
  - Blocking inappropriate sites at no cost on Edge for Business
  - Native data protection for BYOD and AI in Edge for Business
    - Ensuring secure corporate access on personal devices with Edge for Business
    - New controls to prevent data leaks from typed prompts in consumer AI apps
  - Easily extend your security solutions into Edge for Business - at no additional cost
- Microsoft Edge Game Assist is now available - Microsoft Edge Blog

  - https://blogs.windows.com/msedgedev/2025/05/29/microsoft-edge-game-assist-is-now-available/

  ### WHATWG/W3C 動向

  #### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
  - **Update on CSS Anchor Positioning**
    - https://www.w3.org/blog/CSS/2025/05/12/update-on-css-anchor-positioning/
    - Updated WD of CSS Anchor Positioning L1
      - https://lists.w3.org/Archives/Public/www-style/2025May/0003.html
    - Update CSS Anchor Positioning
    - 2023 年の FPWD から様々な構文変更や改良が行われた
    - Google、Apple、Roman Komarov の貢献が大きい
    - 今回は比較的マイナーな変更のみが含まれており、これは仕様が安定してきていることを示す
- First Public Working Draft

  - **CSS Functions and Mixins Module**
    - https://www.w3.org/TR/2025/WD-css-mixins-1-20250515/

  #### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- open-ui/meetings/telecon/2025-05-01
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-05-01.md
  - [Range] Handle count and maximum limitations?
  - https://github.com/openui/open-ui/issues/1183
  - RESOLVED: Go for multi-handles because of the use-case. The maximum is author's choice.
- open-ui/meetings/telecon/2025-05-08
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-05-08.md
- open-ui/meetings/telecon/2025-05-15
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-05-15.md
  - `<select multiple>`で`appearance:base;`を使用する際に、デフォルトでボタンとポップアップを必要とするかどうか
- open-ui/meetings/telecon/2025-05-22
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-05-22.md
  - [command invokers] scroll command
  - https://github.com/openui/open-ui/issues/1220
  - `command`/`commandfor` で `::scroll-button` 相当のものを作りたいモチベーション
  - 計 8 つの command を定義する方針: Phisical Direction(`up`/`down`/`left`/`right`)と Logical Direction(`block-start`/`block-end`/`inline-start`/`inline-end`)
  - 距離の指定は現時点では除外する方向
  - 動的な無効化(スクロール終端での無効化)をするかどうかについては検討中
- [Range] update enhanced range slider to use the rangegroup element
- https://github.com/openui/open-ui/pull/1212


#### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
- Upcoming WHATNOT meeting on 2025-05-01
  - https://github.com/whatwg/html/issues/11258
- Upcoming WHATNOT meeting on 2025-05-08
  - https://github.com/whatwg/html/issues/11278
  - **Dialog requestClose causes several issues with regard to interplay of CloseWatcher**
    - https://github.com/whatwg/html/issues/11230
    - `requestClose()`を `CloseWatcher` から分離して、独自に `cancel` / `close` イベントを発火
- Upcoming WHATNOT meeting on 2025-05-15
  - https://github.com/whatwg/html/issues/11290
- Upcoming WHATNOT meeting on 2025-05-22
  - https://github.com/whatwg/html/issues/11307
- Upcoming WHATNOT meeting on 2025-05-29

  - https://github.com/whatwg/html/issues/11328

  #### Other

- Resolved: Start defining a `grid-collapse` property
  - https://github.com/w3c/csswg-drafts/issues/5813#issuecomment-2880870816
- Resolved: Start specifying element-scoped view transitions in view transitions L2
  - https://github.com/w3c/csswg-drafts/issues/9890#issuecomment-2916914625
- Resolved: Add `::view-transition-group-children()` (open to better names), and copy border-sizing properties to it
  - https://github.com/w3c/csswg-drafts/issues/11926#issuecomment-2916977161
- **The WHATWG Blog - Staged proposals at the WHATWG**
  - https://blog.whatwg.org/staged-proposals-at-the-whatwg
  - whatwg の stage process が始まってから 1 年ほど経った
  - `moveBefore()` が初めて Stage 4 にあがった機能
  - Customizable Select は Stage3 へ
- Testing the `appearance:base` design principles
  - https://dbaron.org/css/appearance-base-principles-testing
  - [css-forms-1] use `calc-size()` for improved sizing of `<button>` and `<select>`
    - https://github.com/w3c/csswg-drafts/issues/12085#event-17482205967
- Web Content Accessibility Guidelines (WCAG) 2.1 Updated | 2025
  - https://www.w3.org/news/2025/web-content-accessibility-guidelines-wcag-2-1-updated/
- W3C opens Advisory Board (AB) election
  - https://www.w3.org/news/2025/w3c-opens-advisory-board-ab-election/
- Privacy Principles is a W3C Statement
- https://www.w3.org/news/2025/privacy-principles-is-a-w3c-statement/
- プライバシーを定義する Statement
- **Requirements to count as an implementer for web specs · Issue #350 · whatwg/meta**
  - https://github.com/whatwg/meta/issues/350
  - WHATWG 仕様における「implementer」の定義
  - 現状の定義では Ladybird や Deno のようなプロジェクトを排除する可能性
  - WHATWG はウェブ互換性を考慮するため、ユーザー数の規模が大きいエンジンのみを重視している
- **Accessibility Compat Data Deep Dive Proposal · Issue #2538 · w3c/aria**

  - https://github.com/w3c/aria/issues/2538
  - The Accessibility Compat Data Project
    - https://lolaslab.co/blog/2025/accessibility-compat-data/
  - アクセシビリティに関する BCD 相当のデータセット、ACD(Accessibility Compat Data) の提案
  - aria-at は対象が APG に則っており限定的。
  - a11ysupport.io は aria 属性だけでこれも限定的。
  - Web 機能の AT とブラウザでの互換性データを含む、BCD に類似したデータセットを作成

  ### TC39 動向

  #### Meeting

- 2025-05

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
- 2025-05-01 meeting agenda
  - https://github.com/WinterTC55/admin/issues/115
  - Review of the notes for last meeting ([Minutes of the 6th meeting of Ecma TC55, 01 May 2025 #116](https://github.com/WinterTC55/admin/pull/116)) (5 min)
  - Approval of this meeting's agenda (2 min)
  - Continue WPT review: (???, usually was 30 min)
    - Not sure if there's much else to discuss here, since we'd probably need to finish combing through the spec for both fetch and events before we can review those WPT
    - Maybe FormData, event loop tests and the js WPT folder
  - Continue going through the fetch spec (30 min?)
    - HTTP-redirect fetch, starting on step 15
- 2025-05-15 meeting agenda

  - https://github.com/WinterTC55/admin/issues/117
  - Review of the notes for the last meeting ([Minutes, 03 April 2025 #114](https://github.com/WinterTC55/admin/pull/114)) (5 min)
  - Approval of this meeting's agenda (2 min)
  - Continue WPT review: (30 min?)
    - DOMException
    - Event
    - EventTarget
    - Fetch-related APIs (Header, Request, Response)
    - WASM
    - globalThis: navigator, performance.now queueMicrotask, setInterval/setTimeout, structuredClone, atob/btoa
  - Continue going through the fetch spec (starting with [fetch response handover](https://fetch.spec.whatwg.org/#fetch-finale) algorithm, step 4) (30 mins?)

  #### Other

  ### IETF 動向

  #### WG

- RFC
- Work
- Meeting

  #### Other

- IETF 125 booked for Shenzhen, China for March 14-20, 2026

  - https://mailarchive.ietf.org/arch/msg/ietf-announce/EZo3-65dvZkR1I3P2Aa0Bvee5xY/

  ### 周辺動向

  #### ベンダー動向

- Igalia WebKit Team | WebKit Igalia Periodical #22
  - https://blogs.igalia.com/webkit/blog/2025/wip-22/
- Igalia WebKit Team | WebKit Igalia Periodical #23
  - https://blogs.igalia.com/webkit/blog/2025/wip-23/
- Igalia WebKit Team | WebKit Igalia Periodical #24
  - https://blogs.igalia.com/webkit/blog/2025/wip-24/
- Igalia WebKit Team | WebKit Igalia Periodical #25
  - https://blogs.igalia.com/webkit/blog/2025/wip-25/
-
- The Web Engines Hackfest Starts Monday | Igalia
  - https://www.igalia.com/2025/webengineshackfest.html
- Summary of the April 2025 TC39 plenary
  - https://blogs.igalia.com/compilers/2025/05/20/summary-of-the-april-2025-tc39-plenary/
- **Opera Neon | Agentic AI browser | Opera**
  - https://www.operaneon.com/
- **Letter to Arc members 2025**

  - https://browsercompany.substack.com/p/letter-to-arc-members-2025
  - Dia from The Browser Company
    - https://www.diabrowser.com/
  -

  #### セキュリティ動向

- インターネット取引サービスへの不正アクセス・不正取引による被害が急増しています:金融庁
  - https://www.fsa.go.jp/ordinary/chuui/chuui_phishing.html
  - 4 月でほぼ 3000 億の被害
- 証券口座情報、盗難の手口にコンピューターウイルスも - 日本経済新聞
  - https://www.nikkei.com/article/DGXZQOUB291YK0Z20C25A4000000/
  - インフォスティーラーによる窃取が原因
- 証券口座 乗っ取り被害確認 16 社に拡大 日本証券業協会 | NHK
  - https://www3.nhk.or.jp/news/html/20250528/k10014819031000.html
  - 被害については顧客に保証の方針
- 証券口座の乗っ取り防止、多要素認証を必須に 自民党が提言案 - 日本経済新聞
  - https://www.nikkei.com/article/DGXZQOUA2011F0Q5A520C2000000/
- #### Cookie 動向

- #### Other

- **Fit-to-Width Discussions & Feedback - Roma's Unpolished Posts**
  - https://blog.kizu.dev/fit-to-width-discussions-and-feedback/
  - Blink でプロトタイプが進んでいる「fit-width text」の抱えるアクセシビリティ的な懸念とその議論の現状と Explainer への著者からのフィードバック
  - fit-width text は `text-shrink` と `text-grow` の二つ提案されている
  - fit-width text の全体的な懸念として、viewport 幅に依存して font-size が変わる場合、ブラウザのズームをしても文字サイズが大きくならないみたいなことが起こる
    - WCAG 2.1 の Success Criterion 1.4.4 Resize Text を満たせなくなる
    - WCAG の Success Criterion 云々はないけど、viewport 依存の fit-width text であれば、ズームアウトしても文字サイズが小さくならないみたいな話もある
  - 解決策として、fit-with text の適用範囲を 200% までの拡大とし、それ以降は viewport を見ないようにして、ブラウザのズーム機能が効くようにしよう
    - この閾値の決め方にも色々オプションが検討されている(relaxed, strict, viewport にそもそも依存してるか検知するなど)
  - `text-shrink` と `text-grow` だが、`text-shrink` は要らないという主張
    - プログレッシブエンハンスメント的な問題がある(grow にはないのでポジティブ)
  - その他シンタックスに関する考え
- **Are 'CSS Carousels' accessible?**
  - https://www.sarasoueidan.com/blog/css-carousels-accessibility/
  - CSS carousels のアクセシビリティに関する考察
  - ブラウザは `::scroll-marker-group` を `tablist` として`::scroll-marker` を `tab` として支援技術に公開するが、そもそもカルーセルと `tab` では動作も目的も違うもので、アクセシビリティ的に誤りであり、セマンティクスを分けるために HTML 要素が必要だという主張
  - `::scroll-marker` みたいなインタラクティブな擬似要素を CSS で作れていいのか
  - CSS による見た目の実装と HTML による意味論の分離を保つべき。OpenUI による HTML ネイティブ要素の標準化に期待
  - 現状では CSS Carousels は実験的で本番環境での使用には適していないとしている
- Reading flow ships in Chrome 137 - Rachel Andrew
  - https://rachelandrew.co.uk/archives/2025/05/02/reading-flow-ships-in-chrome-137/
  - reading-flow, reading-order の実装の話
- **Houdini Re-Revisted**
  - https://bkardell.com/blog/HoudiniReRe.html
  - BlinkOn での Bramus による CSS Parser Extensions を受けて。Houdini や Extensible Web に対する再考
    - CSS Parser Extensions // slidr.io
      - https://slidr.io/bramus/css-parser-extensions#1
- Polyfilling CSS with CSS Parser Extensions - Bram.us
  - https://www.bram.us/2025/05/04/css-parser-extensions-pitch/
- Interop Unites Browser Makers To Smooth Web Inconsistencies - The New Stack
  - https://thenewstack.io/interop-unites-browser-makers-to-smooth-web-inconsistencies/
- スマホ新法、12 月 18 日施行へ ガイドライン案を公表 - Impress Watch
  - https://www.watch.impress.co.jp/docs/news/2014680.html
- **Resilient Import Maps - Better Theme Development and Beyond (2025) - Shopify**
  - https://shopify.engineering/resilient-import-maps
- ### イベント

- 6 月
  - 5-6: CSS Day
    - https://cssday.nl/speakers.html
  - 9-13: WWDC '25
    - https://developer.apple.com/wwdc25/
- 7 月
- 8 月

  ### Wrap Up

- Chrome
  - 136
    - Upgrade credentials to passkeys
  - 137
    - CSS `if()`
    - `reading-flow` / `reading-order`
    - `view-transition-name: match-element`
  - 138 beta
    - CSS `stretch`
    - CSS `abs()` / `sign()`
    - CSS env for OS-level font scale
    - CSS `sibling-index()` / `sibling-count()`
    - Summarizer API
  - I/O 2025
    - CSS Carousels
  - Ship
    - system accent color
    - `Sec-Purpose: prefetch`
    - CSS env for OS-level font scale
    - `request-close`
  - Prototype
    - CSS fit-width text
    - `caret-shape`
    - Prompt API
    - local style references
    - `@scroll-state` scroll direction
    - Trust Anchor Identifiers
    - CSS color for `<input type="color">`
    - `ident()`
    - Responsive iframes
    - CSS Anchored Fallback Container Queries
    - URLPattern `generate()`
  - Experiment
    - Cache sharing for extremely-pervasive scripts
  - web.dev
    - Baseline support in VSCode
  - Google Developer Blog
  - Chrome Developers
    - CSS reading-flow for logical sequential focus navigation
    - Device Bound Session Credentials Origin trial
    - Automatically create passkeys in Google Password Manager
    - Enhancements to the `<permission>` element
  - Chromium blog
  - other blogs
  - other
    - v8
      - Explicit Compile Hints
      - Explicit Resource Management
- Firefox
  - 138
    - `Error.isError()`
  - 139
    - `hidden=until-found`
    - Temporal
    - `requestClose()`
  - Ship
    - Explicit Resource Management
  - Prototype
  - other intents
  - MDN Blog
  - Standard Position
    - CSS interpolate-size property and `calc-size()` function
    - Global Privacy Control (GPC)
  - other
    - pwn2own で報告された脆弱性の報告に 21 時間で対応した
    - Firefox のフロントエンドで Strict CSP を導入したのもあり、サンドボックスのエスケープが発生しなくなった
    - 早い段階からアクセシビリティを考慮する「Shift Left」アプローチを採用した
    - NHK プラスが Firefox をサポート対象外にしていることに対する意見
- Safari
  - TP 220
    - field-sizing
  - Standard Position
    - ToggleEvent source attribute
  - other
    - `contrast-color()`
    - `<input type=color>`
- Edge
  - Creating a more accessible web with Aria Notify
  - Microsoft's Bing share is now 12.2%, Google drops to 79.10%, and it's not due to ChatGPT
  - Introducing the Prompt and Writing Assistance APIs
  - Empowering developers and organizations: Microsoft Edge innovations at Build
- W3C/WHATWG
  - Draft
    - WD Update: CSS Anchor Positioning
    - FPWD: CSS Functions and Mixins Module
  - Open UI
    - select multiple
    - range multiple
    - scroll command
  - WHATNOT meeting
    - CloseWatcher のバグ
  - Other
    - whatwg stage process. `moveBefore()` stage4
    - Web interoperability のため implementer の定義
    - Accessibility Compat Data
- TC39
  - WinterTC
    - WPT のレビューがメイン
- IETF
- 周辺動向
  - ベンダー動向
    - Opera to Neon
    - Arc to Dia
  - セキュリティ動向
    - 3000 億円規模の大規模金融詐欺
  - Cookie 動向
  - Other
    - Fit-to-Width の discussion
    - Carousels の a11y
    - Houdini Re-Revisted