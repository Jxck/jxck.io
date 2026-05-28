---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep207.mp3
published_at: 2026-05-28
guests:
  - name: "@saku"
    url: https://x.com/sakupi01
  - name: "@petamoriken"
    url: https://x.com/petamoriken
---

# ep207 Monthly Platform 202605

## Theme

第 207 回のテーマは 2026 年 5 月の Monthly Platform です。


## Show Note

### Chrome 動向

#### Stable: 149


#### Updates

- New in Chrome 148
  - https://developer.chrome.com/blog/new-in-chrome-148
  - CSS name-only container queries
  - Lazy loading for video and audio elements
  - The Prompt API
- What's new in DevTools (Chrome 148)
  - https://developer.chrome.com/blog/new-in-devtools-148
- Chrome 149 beta
  - https://developer.chrome.com/blog/chrome-149-beta
  - CSS and UI
    - Remove explicit border color UA stylesheet rule for tables
    - Support `path()` and `shape()` in shape-outside
    - Support `rect()` and `xywh()` in shape-outside
    - Web app scope system accent color
    - Clip text overflow on user interaction
    - **CSS gap decorations**
    - **image-rendering: crisp-edges**
    - User action pseudo-class top layer boundary
    - Support path-length as a CSS property
  - Web APIs
    - Intl.Locale.prototype.variants
    - **Programmatic scroll promises**
    - Payment Request: allow payment handlers to report back internal errors
    - Respect `autocorrect="off"` for Windows touch keyboard in TSF
    - Disconnect WebSockets on bfcache entry
    - Request.isReloadNavigation attribute
    - Disable SVG filters on plugins and cross-origin and restricted iframes
  - New origin trials
    - Permissions Policy: focus-without-user-activation
    - Gamepad event-driven input API
    - WebAssembly custom descriptors
- New in Chrome at Google I/O 2026
  - https://developer.chrome.com/blog/new-in-chrome-io26
  - WebMCP
  - Modern Web Guidance
    - https://developer.chrome.com/docs/modern-web-guidance
  - Chrome DevTools for agents
    - https://developer.chrome.com/docs/devtools/agents
  - HTML-in-Canvas
  - Prompt API
- What's new in web extensions: I/O 2026 recap
  - https://developer.chrome.com/blog/extensions-io-2026


### Intents

- **Ship: CSS Gap Decorations**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/x6pObJjIUdg
- **Ship: CSS `text-fit` property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/55BYmN6RZtE
- Ship: Disable SVG filters on plugins and cross-origin/restricted iframes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_0VldHfyj8o
- Ship: Expose unprintable areas via CSS
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/35N2MHzpowc
- Ship: Opaque origin for data: URL Dedicated and Shared Workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4Hy56DZjF34
- **Ship: OpaqueRange**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/otEJ9AacRg4
  - `<textarea>` や `<input>` の有効範囲が取れる
- Ship: Payment Request: Allow payment handlers to report back internal errors
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/j8D3S2ZyozQ
- **Ship: Support 'path-length' as a CSS property.**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EinIemRMgoI
  - SVG の pathLength 属性相当の指定を CSS でも出来るように
- Ship: Web Speech API: On-Device Recognition Quality
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/P8P-x7AnC6I
- **Ship: Comma-separated Container Queries**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/d0vAGYKdr-c
  - Container Queries に OR 条件
- Ship: Expose the `'autocorrect'` global html attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UDOKZD6o8X0
- **Ship: Media element pseudo-classes**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iF9Occ8ZPqc
- **Ship: Responsively-sized \<iframe>**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zBx_uoW7jRQ
  - 埋め込んだドキュメントのコンテンツの高さに合わせて自動的にサイズ調整できるように
  - 埋め込む側・埋め込まれる側双方でオプトインする
    - 埋め込まれる側 `<meta name="responsive-embedded-sizing">`
    - 埋め込む側 `frame-sizing: content-height;`
- Ship: Selective Clipboard Format Read
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qzlyebrWWZg
- Ship: WebGPU: Immediates
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8LdEcW1CkNo
- Ship: `overscroll-behavior: chain`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hEYWr00Eb1g
- Ship: Allow optional rounding parameter for `polygon()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zURJF7ODxws
- Ship: Animatable zoom
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PA0fTX96LWY
- **Ship: CSS `image(<color>)` function**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gbIWh0i2vOo
  - 指定した色で塗りつぶされた画像をインラインで作れる
  - ノンストップな `liner-gradient()` と機能的には等しい
- Ship: CSS `light-dark()` with image values
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OfZ5uS1XAnc
- **Ship: CSSPseudoElement support for `::backdrop`, `::scroll-marker` and `::view-transitions`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CB44320ip2E
- **Ship: Out of order streaming**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eAUPFR-sloc
  - Declarative Partial Updates
  - `<template>` 要素の for 属性と、`<?start>` / `<?end>` といった XML 風のマーカーを組み合わせることで、ストリーミング中に任意の位置のコンテンツを差し替える
  - 各ベンダ positive
- **Ship: Relative Alpha Colors (CSS Color 5 `alpha()` function)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fl5TIBDLHuo
  - 透明度だけを相対的に変更できる
- **Ship: CSS `background-clip: border-area`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AET-65LwYxg
  - Make creative borders with background-clip border-area | WebKit
    - https://webkit.org/blog/16214/background-clip-border-area/
- Ship: Animatable zoom
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PA0fTX96LWY
- Prototype and Ship:
- Prototype: Conditional tracing for long animation frame(LoAF) timing API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ur_FiEgzLvk
- Prototype: Declarative Performance Observer
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Uw6sq0z7GRM
- **Prototype: Incremental font transfer**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3emvPjUOtaM
  - unicode-range で subsetting せず段階的にフォントをロードできる
  - 既存フォントファイルを IFT 用にエンコードして利用
- Prototype: Scroll Timing API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SAKvEpK748M
- Prototype: Speculation Rules: Referrer-provided prefetch proxies
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oT9r5cUmZhM
- Prototype: Visual order caret movement for Bidirectional text
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GIg4Ll81BxQ
- Prototype: WebAuthn Cross-Device Fallback URL Extension
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sGm7WIm161w
- Prototype: [FedCM] Support web-identity.registrable domain subdomain for well-known file discovery
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XgP80HMJuEA
- **Prototype: cachehint attribute of script element**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/v2iaXSCqChY
- Prototype: CSS image function
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tBqbTRD5gzM
- Prototype: Prefetch activation beacon
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2FdWZ020ptc
- **Prototype: `textStream()` for response/request/blob**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/li8tZFxgz8E
  - TextDecoderStream を pipe する処理を textStream メソッドで簡単にする
- **Prototype: Embedding API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/EjL1gAy3k3Q
- Experiment: Gamepad Event-Driven Input API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pZZLH85rNP8
- Experiment: Email Verification Protocol
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Vp1w1u6rYjE
- Experiment: Speculative load measurement
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YwTlv_5SiYY
- **Experiment: WebMCP**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gmYffo5WOE8
- Ready for Developer Testing: Additional Windowing Controls
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/49DBcMFjU9Q
- Ready for Developer Testing: CSS4 text-decoration-skip-spaces
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dbm8MfEEI1Q
- **Ready for Developer Testing: Platform-provided behaviors**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lVP5il5uNuM
- Ready for Developer Testing: Update text selection on `mouseup` before dispatching click event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/q8bXxtA3j_8
- Extend Experiment: Capability Elements `<usermedia>` MVP
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RtvK2dTcrEI
- **Extend Experiment: Enhanced Canvas TextMetrics**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/N0BDxE700QY
  - Canvas 2D に `TextMetrics`/`TextCluster` を入れる実験
  - HTML-in-Canvas では円形に文字を配置するなどシェイプ機能や変形が限定的なので、そこをカバーする
  - > Tangentially, TAG and WHATWG feedback also led to the implementation of language and text writing mode support for Canvas, which is tracked through separate intents.
- Change:
- Unship:
- Remove:
- PSA: Approximate/precise choice for geolocation permission prompts on Android
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fw4NDdI9wRQ
- Ready for Developer Testing: Inline script cache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/COlhss8fxuI
- Web-Facing Change PSA: IncognitoStaticStorageQuota
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/00aHBCiUGzo
- Web facing PSA: navigation API timing changes to avoiding spurious `navigateerror` firing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aNz8aUJCYT0
- Web-Facing Change PSA: Update text selection on `mouseup` before dispatching click event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YUXe7QEQAc8
- 2026 Web Engines Hackfest
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/XVB3zvLmBOw
  - https://webengineshackfest.org/


### Other

- web.dev
  - New to the web platform in April
    - https://web.dev/blog/web-platform-04-2026
- google for developers
  - https://developers.googleblog.com/
  - **An important update: Transitioning Gemini CLI to Antigravity CLI**
    - https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - https://developer.chrome.com/blog/
  - Empower your team with expanded roles in the Developer Dashboard
    - https://developer.chrome.com/blog/cws-role-expansion-developer-dashboard
  - Container Timing origin trial
    - https://developer.chrome.com/blog/container-timing-origin-trial
  - Streamlined sign-in: Immediate UI mode is now available
    - https://developer.chrome.com/blog/webauthn-immediate-ui
  - Install web apps with the new HTML install element
    - https://developer.chrome.com/blog/install-element-ot
  - **Gap decorations: Now available in Chromium**
    - https://developer.chrome.com/blog/gap-decorations-stable
  - **Declarative partial updates**
    - https://developer.chrome.com/blog/declarative-partial-updates
  - **Introducing the HTML-in-Canvas API origin trial**
    - https://developer.chrome.com/blog/html-in-canvas-origin-trial
  - 15 updates from Google I﻿/﻿O 2026: Powering the agentic web with new capabilities, tools, and features in Chrome
    - https://developer.chrome.com/blog/chrome-at-io26
  - Streamline your AI coding workflow with Chrome DevTools for agents 1.0
    - https://developer.chrome.com/blog/devtools-for-agents-v1
  - **Modernize authentication with passkeys, digital credentials, and more**
    - https://developer.chrome.com/blog/io26-web-identity
  - Build new features using built-in AI in Chrome
    - https://developer.chrome.com/blog/build-new-features-using-built-in-ai-in-chrome-io2026
- chromium blog
  - https://blog.chromium.org/
  - Bringing a clearer, more consistent HDR video experience to Chrome
    - https://blog.google/chromium/bringing-a-clearer-more-consistent-hdr-video-experience-to-chrome/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
  - Influence Operations Bulletin Q1 2026
    - https://blog.google/security/influence-operations-bulletin-q1-2026/
    - YouTube チャンネルや広告で世論誘導を行ったとして停止処分にしたアカウントのレポート。中国やロシア関連など
- search blog
  - https://developers.google.com/search/
  - A new resource for optimizing for generative AI in Google Search
    - https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing
    - > SEO best practices remain relevant and foundational to success with our generative AI features
    - Google's Guide to Optimizing for Generative AI Features on Google Search
      - https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
      - > LLMS.txt files and other "special" markup: You don't need to create new machine readable files, AI text files, markup, or Markdown to appear in generative AI search.
- v8
  - https://v8.dev/
- other
  - Evolving the Android & Chrome VRPs for the AI Era - Google Bug Hunters
    - https://bughunters.google.com/blog/evolving-the-android-chrome-vrps-for-the-ai-era
  - bugSWAT in Seoul - April 2026 - Google Bug Hunters
    - https://bughunters.google.com/blog/bugswat-in-seoul-april-2026
    - バグハンターを集めた Google 製品のライブハッキングイベント
    - 2026 年 4 月開催はトップバグハンター 20 名が参加。
    - 2 週間のバーチャルトレーニング+ソウルでの 2 日間の対面イベント。
    - 107 件のバグを発見、総額 $425,111 の報酬。
    - AI 製品(公開・未公開)を対象にハッキング。
  - A 0-click exploit chain for the Pixel 10: When a Door Closes, a Window Opens - Project Zero
    - https://projectzero.google/2026/05/pixel-10-exploit.html
    - Project Zero が Pixel 10 における「0 クリック」のエクスプロイトチェーンを公開した。
    - Dolby の脆弱性(CVE-2025-54957)を Pixel 10 向けに移植し、初期化コードの書き換えに成功した。
    - 新たに搭載された VPU(ビデオ処理ユニット)のドライバーに、深刻な脆弱性を発見した。
    - mmap 処理のサイズ制限不備により、ユーザー空間からカーネル領域全体の読み書きが可能であった。
    - 報告から 71 日後の 2026 年 2 月のセキュリティアップデートで、この脆弱性は修正された。
  - Google I/O Keynote まとめ
    - **Google I/O 2026: Sundar Pichai's opening keynote**
      - https://blog.google/innovation-and-ai/sundar-pichai-io-2026/
    - **All the news from the Google I/O 2026 Developer keynote**
      - https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/


## Firefox 動向

### Stable: 151


### Updates

- https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases
- Firefox 151 release notes for developers (Stable) - Mozilla | MDN
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/151
  - Changes for web developers
  - HTML
    - shadowrootslotassignment attribute
  - CSS
    - `@container` CSS at-rule supports `style()` queries
  - JavaScript
    - Document Picture-in-Picture API
    - CanvasRenderingContext2D.lang
  - APIs
    - **Web Serial API**
  - WebDriver conformance (WebDriver BiDi, Marionette)
  - Changes for add-on developers
  - Experimental web features
    - `@container style()` range syntax queries
    - `field-sizing` property
- VPN, Split View, and Other Goodies - These Weeks in Firefox: Issue 200!
  - https://blog.nightly.mozilla.org/2026/04/27/vpn-split-view-and-other-goodies-these-weeks-in-firefox-issue-200/
  - VPN feature is rolling out in US
- Import-ant Updates - These Weeks in Firefox: Issue 201
  - https://blog.nightly.mozilla.org/2026/04/30/import-ant-updates-these-weeks-in-firefox-issue-201/
- Settings Are Getting a New Look!
  - https://blog.nightly.mozilla.org/2026/05/20/settings-are-getting-a-new-look/
- Firefox's Shake to Summarize expands to Android and new languages on iOS
  - https://blog.mozilla.org/en/firefox/shake-to-summarize-expansion/
- AI controls are here for Firefox mobile
  - https://blog.mozilla.org/en/firefox/ai-controls-firefox-mobile/
- New in Firefox 151: VPN location selection, AI controls on mobile, and expanded Shake to Summarize support
  - https://blog.mozilla.org/en/firefox/more-control-firefox/
- **A free VPN you can trust, now built into Firefox**
  - https://blog.mozilla.org/en/firefox/built-in-vpn/
- **Designing Firefox for the future**
  - https://blog.mozilla.org/en/firefox/new-firefox-design/
- **Mozilla and Adafruit bring Web Serial workflows to Firefox**
  - https://blog.mozilla.org/en/firefox/firefox-web-serial-adafruit/


### Intents

- **Ship: `field-sizing:content`**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/bEjI1WY2teI/
- Ship: Notification.actions
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/_9ZAivg8KkM
- **Ship: `Popover=hint` "new behaviours"**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/H8BANoQFENM/
- **Ship: Parser changes to "select"**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/xMuYX98QJMs/
- **Ship: Importing text modules**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/NcpSKbLqUe8/
- **Prototype and Ship: animation property of AnimationEvent and TransitionEvent**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Ta1DyOYPKvk/
  - by canalun
- **Prototype and Ship: `Error.stackTraceLimit`**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/L72GpAEtabM
  - V8 の独自 API だったが JSC が ship 済みだった
  - SpiderMonkey にも ship
  - TC39 で Stage 1 として進行中
- Prototype and Ship: Pointer Lock unadjustedMovement
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/7H6Jf5qAi5Q/
- **Prototype and Ship: Picture in Picture API**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/5sijgGvvbdc/
- Prototype and ship: CSS `image(<color>)` function (and use it for `light-dark()` images)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/MsmsVPkVbKQ
- Prototype & ship: Pointer Lock unadjustedMovement
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/7H6Jf5qAi5Q
- **Prototype: WebAssembly JS-Promise-Integration**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/r0JfIYxym6Q
- **Prototype: Speculation Rules - Same-Origin Prefetch**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/gBZYcVxrJN4
- **Prototype: `No-Vary-Search` HTTP Caching Extension**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/9FyV3uZk184
- **Prototype and Ship: Happy Eyeballs v3**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/zKL8Q_xLNlU
- **Prototype: EditContext**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/4KNtKTaEn7k/
- **Prototype: Advanced CSS `attr()` function**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/9tQ-XV82EqU/
- Change:
- Remove:
- **Weekly Firefox dot release schedule starting with Firefox 151**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/yy4p-jmWDy8
  - Firefox のマイナーアップデートの間隔が、週に 1 回に変更される
- Removed Legacy Mirrors
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/t9LN4d9wNkk/


### Newsletter

- https://fxdx.dev/
- Firefox WebDriver Newsletter 151 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-151/


### MDN / Open Web Docs

- https://developer.mozilla.org/en-US/blog/


### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2026-05-01+
- Support
  - Import Bytes
    - https://github.com/mozilla/standards-positions/issues/1367
  - OpaqueRange: AbstractRange subtype for encapsulated content (`<input>`, `<textarea>`)
    - https://github.com/mozilla/standards-positions/issues/1289
  - Pointer Lock Unadjusted Movement
    - https://github.com/mozilla/standards-positions/issues/448
  - Gamepad Haptics
    - https://github.com/mozilla/standards-positions/issues/49
- Negative
  - **Prompt API**
    - https://github.com/mozilla/standards-positions/issues/1213
- Defer
  - Payment Handler API
    - https://github.com/mozilla/standards-positions/issues/23
- Withdrawn
  - Attribution Reporting API
    - https://github.com/mozilla/standards-positions/issues/791


### Other

- L10n Report: April Edition 2026 - Mozilla L10N
  - https://blog.mozilla.org/l10n/2026/04/30/l10n-report-april-edition-2026/
  - Firefox のデスクトップ版は、149 から開発者の締切が変更され、文字列翻訳の締切が 2 日延長される。
  - Firefox for Android は、内蔵 VPN 機能と 2026 年ワールドカップ用の新ウィジェットを導入し、文字列数が急増した。
  - Pontoon の新しいドキュメントシステムが導入され、開発者やローカライザー向けの情報が一元化された。
- Trustworthy JavaScript for the Open Web - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2026/05/trustworthy-javascript-for-the-open-web/
  - オープンウェブは、プライベートな通信や金融取引、医療記録などの高度に機密性のあるデータを扱うアプリケーションにとって重要なプラットフォームである。
  - WAICT により、クライアント側のコードをマニフェストに結びつけ、公開監査可能なログにコミットすることで、整合性と透明性を確保できる。
  - 強固で検証可能なアプリケーションセキュリティをオープンウェブの主要な特性とするための重要なステップである。
- Mozilla calls on UK policymakers to address the roots of online harm, not undermine the open web - Open Policy & Advocacy
  - https://blog.mozilla.org/netpolicy/2026/05/05/mozilla-calls-on-uk-policymakers-to-address-the-roots-of-online-harm-not-undermine-the-open-web/
  - Mozilla は、若者をオンラインで保護するために、オープンウェブを損なわないよう UK の政策立案者に呼びかけた。
  - 年齢確認や VPN 制限は、プライバシーとセキュリティを損なうリスクがある。
  - 子供の安全に関する根本的な問題に対処することが、より効果的な解決策であると主張した。
- **Announcing Web Serial Support in Firefox - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2026/05/web-serial-support-in-firefox/
- Firefox's Shake to Summarize expands to Android and new languages on iOS
  - https://blog.mozilla.org/en/firefox/shake-to-summarize-expansion/
- AI controls are here for Firefox mobile
  - https://blog.mozilla.org/en/firefox/ai-controls-firefox-mobile/
- Designing Firefox for the future
  - https://blog.mozilla.org/en/firefox/new-firefox-design/
- Mozilla and Adafruit bring Web Serial workflows to Firefox
  - https://blog.mozilla.org/en/firefox/firefox-web-serial-adafruit/
- **Growing darkness: Against the rise of internet shutdowns - Open Policy & Advocacy**
  - https://blog.mozilla.org/netpolicy/2026/05/26/growing-darkness-against-the-rise-of-internet-shutdowns/
  - 意図的なインターネットシャットダウンは、オープンなウェブの基盤を揺るがし、人権や安全を脅かす深刻な傾向である。
  - イランでは 2026 年 2 月 28 日から 3 カ月近く遮断が続き、情報孤立や経済的打撃をもたらしている。
  - 2025 年には 52 カ国で 313 件のシャットダウンが記録され、接続制限が日常的な統制手段になりつつある。
  - 局所的な通信規制は、世界のインターネット全体の回復力や信頼性を損ない、分断を招く恐れがある。
  - Mozilla は Firefox のテレメトリデータを提供して障害の分析を支援し、開かれたウェブの維持を訴えている。


## Safari 動向

### Stable: 26.5


### Updates

- https://webkit.org/blog/
- Release Notes for Safari Technology Preview 243 | WebKit
  - https://webkit.org/blog/17953/release-notes-for-safari-technology-preview-243/
  - Accessibility
  - Animations
  - CSS
    - Added support for contain: style applying to CSS quote counters, as specified in CSS Containment Level 2.
    - Added support for the insert keyword for the text-autospace property.
  - Canvas
  - Editing
  - Encoding
  - Forms
  - HTML
    - Added support for the shadowrootslotassignment attribute on declarative shadow roots.
  - JavaScript
  - Media
    - Added support for setting TextTrackCue.endTime to Infinity to represent an unbounded cue duration.
  - Networking
  - PDF
  - Rendering
  - SVG
  - Scrolling
  - Spatial Web
  - UI
  - Web API
  - Web Extensions
    - Added reporting of uncaught JavaScript exceptions and unhandled promise rejections in Web Extension scripts.
  - Web Inspector
    - Added Subgrid and Grid-Lanes badges to the Elements tab for easier identification of subgrid and grid-lanes layout contexts.
    - Added the layout root element to Layout event details in the Timeline tab.
  - WebAssembly
  - WebGPU
    - Added support for the clip_distances builtin value in WGSL shaders.
  - WebRTC
- WebKit Features for Safari 26.5 | WebKit
  - https://webkit.org/blog/17938/webkit-features-for-safari-26-5/
  - CSS
    - The `:open` pseudo-class
    - Improvements to CSS `random()`
    - Improvements to Anchor Positioning
    - Improvements to Hanging Punctuation
    - Improvements to Scroll-Driven Animations
    - Improvements to Block-in-Inline Layout
    - Improvements to Grid, Flexbox, Tables, Multicolumn
    - Improvements to zoom
    - Even more improvements to CSS
  - SVG
    - Improvements to SVG
  - Web API
    - ToggleEvent.source
    - **Origin API**
    - Improvements to Web API
  - Additional Resolved Issues
    - Accessibility
    - Editing
    - Forms
    - HTML
    - Images
    - JavaScript
    - Media
    - Networking
    - Scrolling
    - Storage
    - Web Extensions
    - WebGL
    - WebRTC
- Release Notes for Safari Technology Preview 244 | WebKit
  - https://webkit.org/blog/17962/release-notes-for-safari-technology-preview-244/
  - Accessibility
  - Animations
    - **Added the animation property to `AnimationEvent` and `TransitionEvent` interfaces.**
  - CSS
    - Added support for the normal and none values on the position-anchor CSS property.
    - Added support for transform-aware anchor positioning.
  - Forms
  - HTML
    - Added support for `tabindex`, `focus()`, `blur()`, and autofocus on MathML elements per the HTML Standard.
  - Images
  - JavaScript
  - MathML
    - Added support for multiple-character operators in MathML.
  - Media
    - Added support for synchronized video playback on displays using genlock on macOS.
  - Networking
  - Rendering
    - Added support for anchor-valid and anchor-visible as aliases of anchors-valid and anchors-visible in position-visibility.
    - Added support for the Dutch IJ digraph in text-transform: capitalize and `::first-letter`, correctly titlecasing "ij" to "IJ" at word starts when the content language is Dutch.
  - SVG
  - Security
  - Storage
  - Web API
    - Added support for creating dedicated workers inside shared workers per the HTML Standard.
  - Web Extensions
    - Added support for propagating user gestures through `sendMessage()`, `connect()`, `postMessage()`, and `executeScript()` APIs, enabling extensions to perform gesture-requiring actions like media playback.
  - Web Inspector
  - WebAssembly
  - WebGL
  - WebGPU


### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2026-05-01+
- Support
  - OpaqueRange: AbstractRange subtype for encapsulated content (`<input>`, `<textarea>`)
    - https://github.com/WebKit/standards-positions/issues/541
  - **Out of order streaming**
    - https://github.com/WebKit/standards-positions/issues/628
  - Payment Request - Allow payment handlers to report back internal errors
    - https://github.com/WebKit/standards-positions/issues/655
- Oppose
  - **BeforeInstallPromptEvent**
    - https://github.com/WebKit/standards-positions/issues/619
  - **Web Serial API**
    - https://github.com/WebKit/standards-positions/issues/199
  - ML Prompt API
    - https://github.com/WebKit/standards-positions/issues/495
  - Web Install API
    - https://github.com/WebKit/standards-positions/issues/463
    - The Web Install API is ready for testing - Microsoft Edge Blog
      - https://blogs.windows.com/msedgedev/2025/11/24/the-web-install-api-is-ready-for-testing/
- Neutral
  - Document Subtitle
    - https://github.com/WebKit/standards-positions/issues/138


### Other

- **explainers/css-spatial/explainer.md**
  - https://github.com/WebKit/explainers/blob/main/css-spatial/explainer.md
  - CSS Spatial Layout Module
  - positioning 系のプロパティを Z 軸方向でも扱えるように拡張


## Edge 動向

### Stable: 149


### Updates

- New updates to Edge across desktop and mobile - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2026/05/13/new-updates-to-edge-across-desktop-and-mobile/
  - Microsoft Edge のデスクトップ版とモバイル版に、開いている複数タブの情報を比較・要約できる新しい Copilot 機能が導入された。
  - 音声や視線によるハンズフリー操作、閲覧履歴に基づく回答、デザイン刷新された新しいタブページや「Journeys」機能がモバイル版でも利用可能になった。
  - 学習をサポートする「Study and Learn mode」や、タブの内容を音声で聴ける「Podcasts」など、生産性を高める新しい AI ツールが追加された。
- New in Edge for Business: AI for work, safe from day one - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2026/05/20/new-in-edge-for-business-ai-for-work-safe-from-day-one/
  - エージェント機能の導入: 承認されたサイト上で Copilot が複数ステップのタスクを自動実行する「エージェント型ブラウジング」の限定プレビューが開始された。
  - 効率的な情報活用の強化: カレンダーやファイルを一元管理する新しいタブ画面や、モバイル対応した複数タブの要約・YouTube 要約機能が追加された。
  - 強固なセキュリティ管理: IT 管理者が機能を制御できるポリシー設定や、未承認 AI への機密データ流出を防ぐ「シャドーAI 保護機能」により安全性が確保されている。
- https://blogs.windows.com/msedgedev/
  - ここがメイン
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見れる
- https://twitter.com/MSEdgeDev
  - これを見るしか無い


### Other

- Saved passwords in Edge memory: what we're changing and why | Microsoft Browser Vulnerability Research
  - https://microsoftedge.github.io/edgevr/posts/Saved-passwords-in-Edge-memory-what-were-changing-and-why/
  - Edge の起動時に保存されたパスワードが平文でメモリに読み込まれる脆弱性が指摘され、防御を強化するため即座に仕様を変更した。
  - デバイスがすでに侵害されていることが前提の脆弱性であるため、ブラウザ単体による新たな被害リスク(ユーザーの追加の暴露)はない。
  - 今後は Canary 版やビルド 148 以降のすべてのバージョンで起動時のメモリ読み込みを廃止し、研究者からの報告対応プロセスも迅速化する。
- Cybersecurity Metaphors - text/plain
  - https://textslashplain.com/2026/05/05/cybersecurity-metaphors/
  - 不均一な防御: 攻撃は水のように最も弱い隙間へ流れ込むため、すでに強固な壁をさらに高くする対策は無意味である。
  - 暗号化の課題: 秘密鍵の保護が前提であり、鍵自体の安全な管理が極めて困難であるため、暗号化のみでは不十分となる。
  - セキュア・エンクレーブの盲点: 隔離された安全な実行環境であっても、実装の未熟さにより攻撃者の要求をそのまま受け入れる「騙された代理人」になり得る。


## WHATWG/W3C 動向

### Draft

- https://www.w3.org/news/
- Recommendation
  - IMSC Text Profile 1.3 is now a W3C Recommendation
    - https://www.w3.org/news/2026/imsc-text-profile-1-3-is-now-a-w3c-recommendation/
  - Proposed Advancement of Pointer Events Level 3 to W3C Recommendation
    - https://www.w3.org/news/2026/proposed-advancement-of-pointer-events-level-3-to-w3c-recommendation/
- Candidate Recommendation
  - Updated Candidate Recommendation: Web Authentication: An API for accessing Public Key Credentials Level 3
    - https://www.w3.org/news/2026/updated-candidate-recommendation-web-authentication-an-api-for-accessing-public-key-credentials-level-3/
- Working Draft
- First Public Working Draft
  - CBOR-LD 1.0
    - https://www.w3.org/news/2026/first-public-working-draft-cbor-ld-1-0/
  - Long Animation Frames API
    - https://www.w3.org/news/2026/first-public-working-draft-long-animation-frames-api/
  - Recognized Entities v1.0
    - https://www.w3.org/news/2026/first-public-working-draft-recognized-entities-v1-0/
  - SHACL 1.2 User Interfaces
    - https://www.w3.org/news/2026/first-public-working-draft-shacl-1-2-user-interfaces/
- Group Note Draft
  - **Group Note Draft: Threat Model for the Web**
    - https://www.w3.org/news/2026/group-note-draft-threat-model-for-the-web/
    - Security Interest Group が策定した脅威モデル・セキュリティモデルのノート
    - 信頼できないソースからのコード実行に対し、起源と隔離の概念を重視する。
    - 脅威源を分類や、サンドボックスや Origin など防御機能を説明する。
    - 仕様のレビューに活用する目的


### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- 2026-04-30
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2026-04-30.md
- 2026-05-07
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2026-05-07.md
- Meeting 42 for joint OpenUI-WHATWG/HTML-CSSWG task force on styleable form controls
  - https://github.com/whatwg/html/issues/12412
  - Interest Invokers, Customizable Select の filtering, multiple 系諸々


### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
- 2026-04-30
  - https://github.com/whatwg/html/issues/12401
  - Stage1
    - **SpellCheck Custom Dictionary / exemptions**
      - https://github.com/whatwg/html/issues/12388
      - ページごとにカスタム辞書を登録して、スペルチェックする
      - explainers/spell-check-dictionary at main · Igalia/explainers
        - https://github.com/Igalia/explainers/tree/main/spell-check-dictionary
  - Stage2
    - **Shadow Root Adopted Stylesheets**
  - Stage3 (postpone)
    - Opaque Range Interface
- 2026-05-07
  - https://github.com/whatwg/html/issues/12413
  - Stage1
    - HTML Video Poster Image: Enable Responsive Images and ALT Text for Poster #10378
      - https://github.com/whatwg/html/issues/10378
      - video 要素の poster 属性指定時(サムネ表示時)に代替テキストを付与可能にする
  - Stage2
    - **Declarative CSS Modules**
- 2026-05-21
  - https://github.com/whatwg/html/issues/12456
  - **Stage3: Out of order HTML streaming ("patching")**
    - https://github.com/whatwg/html/issues/11542
    - 全ベンダで positive
  - Stage3 (postpone)
    - Opaque Range Interface (#11478)
    - Reference Target


### CSSWG

- https://www.w3.org/blog/CSS/
- https://lists.w3.org/Archives/Public/www-style/
- **CSS Spatial Layout | explainers**
  - https://webkit.github.io/explainers/css-spatial/explainer.html
  - > CSS Spatial Layout introduces true 3D positioning to the web
  - ウェブレイアウトにおける Z 軸の概念、しっかり CSS 側で進んでいきそう
  - Apple の提案だけど、元は Immersive WG で Meta なども交えてやっていたもの
  - Immersive Web WG/CG May 2026 face-to-face Day 2 - 20 May 2026
    - https://www.w3.org/2026/05/20-immersive-web-minutes.html
- [css-fonts-5] meta text-scale limits
  - https://github.com/w3c/csswg-drafts/issues/13557
  - Resolution でそう
- [css-pseudo] ::before(ident) / ::after(ident): A possible path forwards for multiple gencontent pseudos?
  - https://github.com/w3c/csswg-drafts/issues/13860
  - 1 つの要素に、複数の ::before や ::after を作れるように
  - ::before(name) のようにして無限に名前付き擬似要素を生成可能にする


### Other

- Managing inline spaces in Chinese & Japanese
  - https://w3c.github.io/i18n-drafts/articles/styling/inline-space.en.html
  - 中国語と日本語におけるインラインスペースの現状整理
- Upcoming: W3C Workshop on the Future of ODRL
  - https://www.w3.org/news/2026/upcoming-w3c-workshop-on-the-future-of-odrl/
- W3C Establishes Representative Office in Shenzhen, China
  - https://www.w3.org/news/2026/w3c-establishes-representative-office-in-shenzhen-china/
- W3C Advisory Committee Elects Advisory Board | 2026 | News | W3C
  - https://www.w3.org/news/2026/w3c-advisory-committee-elects-advisory-board/
- Age-restrictions on the web and user privacy and safety
  - https://www.w3.org/blog/2026/age-restrictions-on-the-web-and-user-privacy-and-safety/
- **W3C recognized on the 2026 Forbes Accessibility 200 list**
  - https://www.w3.org/blog/2026/w3c-recognized-on-the-2026-forbes-accessibility-200-list/
  - W3C の Web Accessibility Initiative (WAI) が世界に与えた影響が評価されたことを表す
  - 5 月 21 日の GAAD にも沿ったもの
- **W3C Japan Member Meeting and W3C in Japan 30th Anniversary Ceremony**
  - https://www.w3.org/blog/2026/w3c-japan-member-meeting-and-w3c-in-japan-30th-anniversary-ceremony/
  - W3C Japan 発足 30 周年記念会員会議
  - 「日本のインターネットの父」村井純先生とサイボウズ青野さんの対談
- **State of CSS 2026**
  - https://survey.devographics.com/en-US/survey/state-of-css/2026
  - from June 1 to July 1, 2026?
- **GAAD**
  - https://accessibility.day/
  - Thursday, May 21, 2026
  - 「アクセシビリティ」を考える一日。2026 年 5 月 21 日(木)開催 - GAAD JAPAN
    - https://www.gaad.jp/
    - ヘルナッツの VoiceOver 講座! iPhone でスクリーンリーダーを使ってみヘル!!
      - https://docs.google.com/presentation/d/1APU04ZpP3dM1ZxOHNykLZeB682yPZ5SEUgWHYXtWuRo/
  - Global Accessibility Awareness Day: Recapping our three free training sessions - Deque
    - https://www.deque.com/blog/global-accessibility-awareness-day-recapping-our-three-free-training-sessions/
- **Nominations and Statements for W3C Advisory Board 2026 Election**
  - https://www.w3.org/2026/04/ab-nominations
  - 新しい AB が選出された
  - Daniel Appelquist (Samsung Electronics Co., Ltd.),
  - Wei Ding (Huawei)
  - Elena Lape (Holopin)
  - Andrew Wafaa (ARM Limited)
- **New incubation: Web Haptics API**
  - https://lists.w3.org/Archives/Public/public-new-work/2026Apr/0009.html
  - Haptics API の Incubation が開始
  - https://github.com/WICG/web-haptics
- **New incubation: Device Bound Session Credentials for SSO**
  - https://lists.w3.org/Archives/Public/public-new-work/2026May/0005.html


## TC39/TC55 動向

### Meeting

- なし


### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2026-01-01}...main@{2026-02-01}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->2.7
- 2.7->3
- 3->4


### New Proposals


### WinterTC

- https://github.com/WinterTC55/admin/tree/main/meetings
- 5 月はなし


### Other


## IETF 動向

### IETF


### WG

- RFC
- Work
- I-D Action: draft-ietf-httpbis-layered-cookies-02.txt
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2026AprJun/0051.html
- I-D Action: draft-ietf-httpbis-no-vary-search-05.txt
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2026AprJun/0044.html
- Meeting


### Other

- What's Missing in the 'Agentic' Story
  - https://mnot.net/blog/2026/agents_as_collective_bargains
- Web Feeds in 2026: A Survey
  - https://mnot.net/blog/2026/feed-survey
- **IETF | New RFC Editor website is live**
  - https://www.ietf.org/blog/rfc-editor-website-launch/
  - [rfc-editor.org](http://rfc-editor.org) が刷新
  - 検索機能向上、パフォーマンス改善、モバイル対応やアクセシビリティが強化
  - VSCode Plugin "DraftForge" が導入され、データベースが Datatracker と統合されたことで、メタデータの整合性が大幅に向上。
  - 今後は ICANN グラントプログラムの支援を受け、実装者や研究者に向けたさらなる新機能の追加が進められる。
  - 同時に Errata と Queue のサイトもできた
  - https://errata.rfc-editor.org/
  - https://queue.rfc-editor.org/
- IETF | A new suite of modern tools coming RFCs are edited and published
  - https://www.ietf.org/blog/new-tools-coming-for-editing-and-publishing-rfcs/
  - 同上


## 周辺動向

### ベンダー動向

- **Web Feeds in 2026: A Survey**
  - https://mnot.net/blog/2026/feed-survey
  - Common Crawl を AI 分析し Tranco の上位 50 万サイトの約 53 万個のフィードを分析
  - 約 36%がフィードを提供している
  - ちゃんと更新してるのは 22.6%で多くが放置状態
  - CMS による意図しない自動生成が品質低下の主因
  - パース成功は 98.3%、RSS と Atom が共存し、複数言語の混在は 1.1%と稀である。
  - 現状の自動発見機能の不全を改善するため、より確実な新しいメカニズムを提案している。
- What's Missing in the 'Agentic' Story
  - https://mnot.net/blog/2026/agents_as_collective_bargains
  - ネット接続機器によるユーザーへの「信頼の侵害」が常態化している。
  - Web ブラウザは共通規格による制約を通じ、集団交渉でユーザーを守ってきた。
  - 現行の AI エージェントには共通の制約がなく、信頼構築や市場形成の妨げである。
  - 信頼担保には、ツール API の標準化や権限モデルなど、あえて制約を設ける必要がある。
- Igalia at Open Source Summit North America 2026 | Igalia
  - https://www.igalia.com/2026/05/14/Igalia-at-Open-Source-Summit-North-America-2026.html
  - "Engineering Quality in a Fast-Moving Open Source Project: WPE WebKit"
  - https://hosted-files.sched.co/osselcna2026/3d/20260518-EngineeringQualityInWPEWebKit.pdf
- **Canvas-ing the Web - Eric's Archived Thoughts**
  - https://meyerweb.com/eric/thoughts/2026/04/27/canvas-ing-the-web/
  - HTML-in-canvas の話
- Igalia WebKit Team | WebKit Igalia Periodical #63
  - https://blogs.igalia.com/webkit/blog/2026/wip-63/
- Igalia WebKit Team | WebKit Igalia Periodical #64
  - https://blogs.igalia.com/webkit/blog/2026/wip-64/
- Igalia WebKit Team | WebKit Igalia Periodical #65
  - https://blogs.igalia.com/webkit/blog/2026/wip-65/
- Building WebKit and libsoup with AddressSanitizer (ASan)
  - https://blogs.igalia.com/fujii/building-webkit-and-libsoup-with-addresssanitizer-asan/
- **Browsers and Language Features**
  - https://bkardell.com/blog/language.html
  - Speech to Text, Text to Speech, Spellcheck などの話
- **Get Clamped: Unwinding Some Difficult CSS History**
  - https://bkardell.com/blog/GetClamped.html
  - 2000 年代に Safari が独自実装した不完全な行省略機能が、口コミで広まりデファクトとなった。
  - 相互運用性の課題を解決するため line-clamp の導入が進んでいる。
  - 既存サイトへの影響が大きいため、フィードバックを求めている。
- **When DNSSEC goes wrong: how we responded to the .de TLD outage**
  - https://blog.cloudflare.com/de-tld-outage-dnssec/
  - 2026 年 5 月 5 日、ドイツの TLD「.de」の管理団体(DENIC)が定期的な鍵更新の際、誤った DNSSEC 署名を配布したことで世界規模の検証エラー(SERVFAIL)が発生。
  - キャッシュ内の古いレコードを返し続ける「Serve Stale」機能により即時断絶は防がれたが、有効期限切れに伴い不通ドメインが拡大。
  - DNSSEC 検証を一時的にバイパスする設定(ネガティブ・トラスト・アンカーと同等)を投入し、安全性を天秤にかけつつ速やかに 1.1.1.1 での解決を復旧。
- Post-quantum encryption for Cloudflare IPsec is generally available
  - https://blog.cloudflare.com/post-quantum-ipsec/
  - 量子コンピュータによる暗号解読リスク(対 Q-Day)を見据え、Cloudflare IPsec におけるポスト量子暗号(PQC)の一般提供を開始。
  - ハイブリッド ML-KEM を採用した IETF ドラフトに準拠し、Cisco や Fortinet などの既存ハードウェアとの相互運用性を実証。
  - TLS より標準化が 4 年遅れた背景に QKD(量子鍵配送)への偏重があり、今後は暗号化だけでなくポスト量子認証の規格化が必要。
- Shutdowns, power outages, and conflict: a review of Q1 2026 Internet disruptions
  - https://blog.cloudflare.com/q1-2026-internet-disruption-summary/
  - 2026 年第 1 四半期、ウガンダとイランで政府主導のインターネットシャットダウンが発生し、前年同時期と対照的な状況となった。
  - キューバでは、国家電力網の 3 回の崩壊がインターネット接続に深刻な影響を及ぼした。
  - 中東では、軍事行動が Amazon Web Services のデータセンターに直接的な損害を与え、クラウドインフラに悪影響を及ぼした。


### セキュリティ動向


### Other

- **Nordstjernen Web Browser**
  - https://groups.google.com/a/chromium.org/g/chromium-discuss/c/blV6Q1rVYJQ
  - https://nordstjernen.org/
  - > Nordstjernen is an independent, lightweight web browser built entirely from scratch in C. A hardened,
  - > zero-JIT HTML5 / CSS / JavaScript rendering engine with a clean-room engine - not Blink, not WebKit, not Gecko.
  - "ノールチャーネン" らしい


## イベント

- 6 月
  - 8-12: WWDC
    - https://developer.apple.com/wwdc26/
  - 11-12: CSS Day 2026
    - https://cssday.nl/
  - 15-17: Web Engines Hackfest
    - https://webengineshackfest.org/
- 7 月
  - 18-24: IETF 126 Vienna
    - https://www.ietf.org/meeting/126/
  - 20-23: TC39 Remote
    - https://github.com/tc39/agendas
- 8 月


## Wrap Up

- Chrome
  - 149 beta
  - Ship
    - CSS Gap Decorations
    - CSS text-fit property
    - OpaqueRange
    - Comma-separated Container Queries
    - Responsively-sized iframe
      - 埋め込んだドキュメントのコンテンツの高さに合わせて自動的にサイズ調整できるように
      - 埋め込む側・埋め込まれる側双方でオプトインする
        - 埋め込まれる側 meta name="responsive-embedded-sizing"
        - 埋め込む側 frame-sizing: content-height;
    - CSSPseudoElement support for ::backdrop, ::scroll-marker and ::view-transitions
    - Out of order streaming
      - template 要素の for 属性と、?start / ?end といった XML 風のマーカーを組み合わせることで、ストリーミング中に任意の位置のコンテンツを差し替える
    - Relative Alpha Colors (CSS Color 5 alpha() function)
    - CSS background-clip: border-area
  - Prototype
    - Incremental font transfer
      - unicode-range で subsetting せず段階的にフォントをロードできる
    - cachehint attribute of script element
    - textStream() for response/request/blob
    - Embedding API
  - Experiment
    - WebMCP
    - Enhanced Canvas TextMetrics
      - Canvas 2D に TextMetrics/TextCluster を入れる実験
      - HTML-in-Canvas では円形に文字を配置するなどシェイプ機能や変形が限定的なので、そこをカバーする
  - Deprecate and Remove
  - PSA
  - other intents
  - web.dev
  - Google Developer Blog
    - Transitioning Gemini CLI to Antigravity CLI
  - Chrome Developers
    - Gap decorations: Now available in Chromium
    - Declarative partial updates
    - Introducing the HTML-in-Canvas API origin trial
  - Chromium blog
  - other blogs
    - A new resource for optimizing for generative AI in Google Search
  - other
- Firefox
  - 151
  - Ship
    - Web Serial API
    - Parser changes to "select"
    - Importing text modules
    - animation property of AnimationEvent and TransitionEvent
      - by canalun
    - Error.stackTraceLimit
    - Picture in Picture API
  - Prototype
    - WebAssembly JS-Promise-Integration
    - Speculation Rules - Same-Origin Prefetch
    - No-Vary-Search HTTP Caching Extension
    - Happy Eyeballs v3
    - EditContext
    - Advanced CSS attr() function
  - other intents
    - Weekly Firefox dot release schedule starting with Firefox 151
      - Firefox のマイナーアップデートの間隔が、週に 1 回に変更される
  - MDN Blog
  - Standard Position
    - Negative
      - Prompt API
  - other
    - Announcing Web Serial Support in Firefox
    - インターネットシャットダウンについての啓蒙
- Safari
  - TP 243
  - Safari 26.5
    - The :open pseudo-class
    - Origin API
  - TP 244
    - Added the animation property to AnimationEvent and TransitionEvent interfaces.
  - Standard Position
    - Support
      - Out of order streaming
    - Oppose
      - BeforeInstallPromptEvent
      - Web Serial API
    - Neutral
      - Document Subtitle
  - other
    - CSS Spatial Layout Module Explainer
- Edge
  - 起動時にパスワードを平文でメモリに読んでたのを修正
- W3C/WHATWG
  - Draft
    - Threat Model for the Web
  - Open UI
    - Interest Invokers
    - Customizable Select の filtering, multiple 周り
  - WHATNOT meeting
    - SpellCheck Custom Dictionary
    - Shadow Root Adopted Stylesheets
    - Declarative CSS Modules
    - Out of order HTML streaming ("patching")
  - CSSWG
    - Spatial Layout
    - 1 つの要素に、複数の ::before や ::after を作れる ::before(name) ::after(name) の提案
  - Other
    - W3C in Japan 30th Anniversary Ceremony
    - State of CSS 2026
    - Web Haptics API
- TC39
  - WinterTC
- IETF
  - rfc-editor の刷新と queue/errata サイト公開
- 周辺動向
  - ベンダー動向
    - mnot による RSS Feed の大規模調査
    - HTML-in-canvas のブログ
    - Speech - Text など言語周りのブログ
    - line-clamp のヒストリーブログ
    - .de の DNSSEC 鍵更新
    - ウガンダとイランのインターネット遮断
  - セキュリティ動向
  - Other
    - Nordstjernen Web Browser