---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep88.mp3
published_at: 2021-10-02
guest: [@myakura](https://twitter.com/myakura)
---

# ep88 Monthly Web 202109

## Theme

第 88 回のテーマは 2021 年 9 月の Monthly Web です。

## Show Note

### Chrome 動向

#### Stable: 94

#### Updates

- **New in Chrome 93 - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-chrome-93/
  - CSS Module Scripts
  - Multi-Screen Window Placement API
  - Shortened release cycle
  - New PWA features
    - URL handlers for PWAs
    - Window controls overlay
  - PWA Summit
- **Deprecations and removals in Chrome 94 - Chrome Developers**
  - https://developer.chrome.com/en/blog/deps-rems-94/
  - Deprecate and Remove WebSQL in Third-Party Contexts
  - Restrict Private Network Requests for Subresources to Secure Contexts
- **Chromium Blog: Chrome 94 Beta: WebCodecs, WebGPU, Scheduling, and More**
  - https://blog.chromium.org/2021/08/chrome-94-beta-webcodecs-webgpu.html
  - WebCodecs
  - WebGPU
  - Scheduling APIs: Prioritized scheduler.postTask()
  - Origin Trials
    - New Origin Trials
      - Early Hints for Navigation
    - Completed Origin Trials
      - Canvas Color Management
      - VirtualKeyboard API
  - Other features in this release
    - CSS
      - Align transform-style: preserve-3d and perspective Property with the Spec
      - flex-basis Honors Keywords 'content' and 'min/max/fit-content'
      - scrollbar-gutter
    - MediaStreamTrack Insertable Streams (a.k.a. Breakout Box)
    - Return Fixed Lists for navigator.plugins and navigator.mimeTypes
  - JavaScript
    - Self Profiling API
  - Deprecations, and Removals
    - Deprecate and Remove WebSQL in Third-Party Contexts
    - Restrict Private Network Requests for Subresources to Secure Contexts
- **What's New In DevTools (Chrome 94) - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-devtools-94/
  - **Use DevTools in your preferred language**
  - New Nest Hub devices in the Device list
  - Origin trials in the Frame details view
  - **New CSS container queries badge**
  - New checkbox to invert the network filters
  - Upcoming deprecation of the Console sidebar
  - **Display raw Set-Cookie headers in the Issues tab and Network panel**
  - Consistent display native accessors as own properties in the Console
  - Proper error stack traces for inline scripts with #sourceURL
  - Change color format in the Computed pane
  - Replace custom tooltips with native HTML tooltips
  - [Experimental] Hide issues in the Issues tab
- New in Chrome 94 - Chrome Developers
  - https://developer.chrome.com/en/blog/new-in-chrome-94/
  - Default color space for canvas elements
  - WebCodecs
  - WebGPU
  - PWA Summit
  - And more!
- **What's New In DevTools (Chrome 95) - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-devtools-95/
  - **New CSS length authoring tools**
  - Hide issues in the Issues tab
  - Improved the display of properties
  - **Lighthouse 8.4 in the Lighthouse panel**
  - Sort snippets in the Sources panel
  - New links to translated release notes and report a translation bug
  - Improved UI for DevTools command menu
- **Deprecations and removals in Chrome 95 - Chrome Developers**
  - https://developer.chrome.com/en/blog/deps-rems-95/
  - FTP support removed
  - Support for URLs with non-IPv4 hostnames ending in numbers
  - WebAssembly cross-origin module sharing
  - **Deprecate U2F API (Cryptotoken)**
- **Chromium Blog: Chrome 95 Beta: Secure Payment Confirmation, WebAssembly Exception Handling and More**
  - https://blog.chromium.org/2021/09/chrome-95-beta-secure-payment.html
  - Origin Trials
    - New Origin Trials
      - Access Handles for the File System Access API
      - **Reduce User Agent String Information**
    - Completed Origin Trials
      - Secure Payment Confirmation
      - WebAssembly Exception Handling
  - Other Features in this Release
    - Adding droppedEntriesCount to PerformanceObserver Callback
    - EyeDropper API
    - New UA platform Version Source on Windows for User Agent Client Hints
    - **self.reportError()**
    - URLPattern
  - Deprecations, and Removals
    - FTP Support Removed
    - Support for URLs with non-IPv4 Hostnames Ending in Numbers
    - WebAssembly Cross-Origin Module Sharing
    - Deprecate U2F API (Cryptotoken)

#### Intents

- Ship: COEP for shared worker
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wM0W7z_Vh0Y
- Ship: Cross-Origin-Embedder-Policy: credentialless
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Zr9n9_LG7s4
- Ship: EME MediaKeySession Closed Reason
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aXGPrHaYFHA
- Ship: Reporting API: Isolate reports per-document and support the Reporting-Endpoints header
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3ZcYL4toFis
- Ship: Secure Payment Confirmation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/U5K69fbA6SU
- Ship: URLPattern
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-T5pJtBO8h4
- Ship: WebAssembly Exception Handling
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/N91z_zgZ6OY
- Ship: WebAssembly Reference Types
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/R5r4-TF6at8
- **Ship: self.reportError()**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/QzoPDXSwq4s
  - 例えば Listener を複数呼び出す必要があるライブラリで、 1 つのリスナが例外を投げると後続が全部止まる問題がある。
  - 例外を伝えたいがリスナは全部実行してからにしたい場合にどう例外をブラウザに伝えるか
  - そこで「例外をブラウザに伝えるための API をいれる」という 提案
  - Safari も実装着手済み
  - Node でどうするかは議論中
- **Ship: `HTMLScriptElement.supports(type)` method**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kMoS8_2ND1g/m/hg0LrM4uAQAJ
  - import map や webbundle などのサポートが進むと Feature detection したくなる
  - そのための API
- Ship: CSS @counter-style descriptor 'speak-as'
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/62WEv0FO7yA/m/PgTWUgCRBgAJ
- Ship: Auto-expand details elements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/a6iO__pqI_E/m/Asj1sUABBAAJ
- Ship: Disable propagation of body style to viewport when contained
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LYuQvgjLhe0/m/ruaL9hX_AAAJ
- Ship: Content-Security-Policy delivery via response headers for dedicated workers.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sH75Nkx_OZ0
- **Ship: WebTransport**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kwC5wES3I4c
  - h3 ベースで実装されたもののコア部分を Ship
  - 以下は除外
    - Connection sharing
    - Stream Prioritization
    - Statistics
    - WebTransport over HTTP/2
- Ship: WebAssembly Content Security Policy
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5U_SgZ3r8QI/m/pnOzK2S3BAAJ
- **Ship: HTTP->HTTPS redirect for HTTPS DNS records**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_wp024Ixvfk
  - DNS に HTTPS record があると HSTS が有効になる
- **Prototype and Ship: Control character handling in cookies**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xWVtdGDLz_Q
- Prototype: Add FileSystemHandle::move() and FileSystemHandle::rename() methods
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oxALHQ4pUbk
- Prototype: HTMLScriptElement.supports(type) method
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/evk2qgsekYk
- Prototype: Private Network Access preflight requests for subresources
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PrB0xnNxaHs
- Implement and Ship : onslotchange event handler IDL attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cagoIboJ6Oo
- Implement and Ship: WritableStream controller AbortSignal
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/T6B5czAke1I
- Prototype: Private and Anonymized Requests for Ads that Keep Efficacy and Enhance Transparency ("PARAKEET")
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/b_LUwcESvp0
- Prototype: WebAssembly Content Security Policy
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VeOlvhJo7Dc
- Prototype: Markup based Client Hints delegation for third-party content
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FTNrw03Xs9s
- Prototype: Conditional Focus
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lbuqOGx07xY/m/kumHViBKAQAJ
- Prototype: CSS font-synthesis property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/T8Qogsm3sV8
- **Prototype: renderpriority attribute**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_GBtwrWbgaQ
  - レンダリングをヒューリスティクスによって遅延する機能がある
  - 意図しない場合は優先度を上げたい
  - 現状指定可能な値の候補
    - user-blocking
    - user-visible
    - background
    - never
    - auto
- Ready for Trial: HTMLScriptElement.supports(type) method
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-sE2GpCrG6Y/m/UsHXyVW-CAAJ
- Ready for Trial: PWA manifest unique id - desktop
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/t3FiydJPFY4
- Experiment: Media Source Extensions for WebCodecs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/j9NeEfoMPJQ
- Experiment: Origin Private File System extension: AccessHandle
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-FVIvFovd3g
- Experiment: Conditional Focus
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/I4RE2pbocTg/m/8Jp9xAVMAQAJ
- **Experiment: Priority Hints**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CkRq2zY-t6c/m/sN6_MpnpAAAJ
- Experiment: App history API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ki__L-IiR0Q
- Extend Experiment: Declarative Link Capturing for PWAs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2c4bul4V3GQ
- Extend Origin Trial: Conversion Measurement API (Attribution Reporting API)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DmsUL3KHqMk
- Extend Origin Trial: New Canvas 2D API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eP7wCoMlLCc
- Extend Origin Trial: Trial for SharedArrayBuffers in non-isolated pages on Desktop platforms
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RlhJTtFVN-I
- Extend Origin Trial: Trust Token API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fpfbKgJF8Vc/m/lHcBFfxkBAAJ
- Continue Experimenting: Shared Element Transitions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4rhdWDEl58Q
- Continue Experimenting: Speculation Rules (Prefetch)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/T3nKEipKv-4
- Continue Experiment: Priority Hints
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NJ0voF-ow1Y
- Timeline for Removal of Sync XHR
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Fu3wpd_oGO4
- Deprecate: The "basic-card" method of PaymentRequest API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fLpgY6iLibo
- Deprecate and Remove: SDES key exchange for WebRTC
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Z_tKJ7hnwh0
- WebCodecs Shipping in Chrome 94: Breaking changes and new features
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6knQoJRpje4
- **Save the date for BlinkOn 15!**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/w1ChUGMhO58/m/_6mgHrfgAwAJ
  - What: Combination of live and recorded sessions, including keynotes, lightning talks, breakout talks, and social events
  - When: November 16-18, 2021 PT
  - Where: Virtual

#### V8

- V8 release v9.4 · V8
  - https://v8.dev/blog/v8-release-94
  - Class static initialization blocks
- V8 release v9.5 · V8
  - https://v8.dev/blog/v8-release-95
  - Intl.DisplayNames v2
  - Extended timeZoneName option
  - Exception Handling

#### Other

- web.dev
  - **JavaScript Eventing Deep Dive**
    - https://web.dev/eventing-deepdive/
    - イベントのフェーズとコントロールの説明
    - そもそも Netscape が Capturing で IE が Bubbling だったから両方になった
  - Full control with the VirtualKeyboard API
    - https://web.dev/virtualkeyboard/
  - Building a split-button component
    - https://web.dev/building-a-split-button-component/
  - Bundling non-JavaScript resources
    - https://web.dev/bundling-non-js-resources/
  - Modern client-side routing: the App History API
    - https://web.dev/app-history-api/
  - Access modern GPU features with WebGPU
    - https://web.dev/gpu/
  - How SPA architectures affect Core Web Vitals
    - https://web.dev/vitals-spa-faq/
  - How Swappie increased mobile revenue by 42% by focusing on Core Web Vitals
    - https://web.dev/swappie/
  - **Bringing instant page-loads to the browser through speculative prerendering**
    - https://web.dev/speculative-prerendering/
- google developer blog
  - https://developers.googleblog.com/
- google developer japan blog
  - https://developers-jp.googleblog.com/
  - Google Developers Japan: Chrome 93: マルチスクリーン ウィンドウの配置、 URL ハンドラとしての PWA など
    - https://developers-jp.googleblog.com/2021/08/chrome-93-url-pwa.html
  - Google Developers Japan: 新しい Google Identity Services API のリリースについて
    - https://developers-jp.googleblog.com/2021/08/google-identity-services-api.html
  - Google Developers Japan: Chrome 94 ベータ版: WebCodecs 、 WebGPU 、スケジューリングなど
    - https://developers-jp.googleblog.com/2021/09/chrome-94-webcodecswebgpu.html
  - Google Developers Japan: ウェブ用の Google Sign-In JavaScript プラットフォーム ライブラリの提供終了について
    - https://developers-jp.googleblog.com/2021/09/google-sign-in-javascript.html
  - Google Developers Japan: Chrome の User-Agent 文字列削減のオリジン トライアルと今後の計画について
    - https://developers-jp.googleblog.com/2021/09/chrome-user-agent.html
- chrome developer blog
  - **User-Agent Reduction origin trial - Chrome Developers**
    - https://developer.chrome.com/en/blog/user-agent-reduction-origin-trial/
  - Modernising CSS infrastructure in DevTools - Chrome Developers
    - https://developer.chrome.com/en/blog/modernising-css-infra-in-devtools/
  - What's new in Lighthouse 8.4 - Chrome Developers
    - https://developer.chrome.com/en/blog/lighthouse-8-4/
  - Progress in the Privacy Sandbox (August 2021) - Chrome Developers
    - https://developer.chrome.com/en/blog/progress-in-the-privacy-sandbox-2021-08/
  - First-Party Sets and the SameParty attribute - Chrome Developers
    - https://developer.chrome.com/en/blog/first-party-sets-sameparty/
  - The Chromium Chronicle #24: StrongAlias, IdType, and TokenType - Chrome Developers
    - https://developer.chrome.com/en/blog/chromium-chronicle-24/
  - Key data structures and their roles in RenderingNG - Chrome Developers
    - https://developer.chrome.com/en/blog/renderingng-data-structures/
  - Uniquely identifying PWAs with the web app manifest id property - Chrome Developers
    - https://developer.chrome.com/en/blog/pwa-manifest-id/
  - Deep-dive: VideoNG - Chrome Developers
    - https://developer.chrome.com/en/blog/videong/
  - **Chrome user device characteristics report - Chrome Developers**
    - https://developer.chrome.com/en/blog/device-characteristics/
    - https://docs.google.com/document/d/1BPz0UnQGotX0dACmJbHbbXFJa38jxmKhhNQ2RLj5Gms/edit
    - 米国、ブラジル、日本などでどのようなデバイスが使われているか
    - コア数、メモリ数、ネットワークタイプなどの統計が公開されている
  - **The transition of Chrome extensions to Manifest V3 - Chrome Developers**
    - https://developer.chrome.com/en/blog/mv2-transition/
    - 2022 年 1 月で Chrome Web Store で Manifest V2 拡張の受付終了
    - 2023 年 1 月に Manifest V2 拡張の実行が不可に
- chromium blog
  - https://blog.chromium.org/
  - **Chromium Blog: User-Agent Reduction Origin Trial and Dates**
    - https://blog.chromium.org/2021/09/user-agent-reduction-origin-trial-and-dates.html
    - Reduction Preparation
      - Phase 1: Since Chrome 92 (July 20, 2021)
        - devtools で navigator.userAgent, navigator.appVersion, and navigator.platform の利用に warning が出る
      - Phase 2: Chrome 95 to Chrome 100
        - reduced UA に opt-in するための OT が始まる(最低 6 ヶ月)
    - Reduction Rollout
      - Phase 3: Chrome 100
        - deprecation trial (reverse OT) 開始
      - Phase 4: Chrome 101
        - MINOR.BUILD.PATCH が "0.0.0" な UA がロールアウト
      - Phase 5: Chrome 107
        - Desktop 向けに reduced UA と JS API がロールアウト
      - Phase 6: Chrome 110
        - Android 向けに reduced UA と JS API がロールアウト
    - Reduction Completion
      - Phase 7: Chrome 113
        - Deprecation trial が終了
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- search central
  - **ウェブページのタイトルの生成方法に関する最新情報**
    - https://developers.google.com/search/blog/2021/08/update-to-generating-page-titles
    - 検索結果のタイトルを `<title>` だけでなく `<h1>` なども考慮するように
    - 理由(引用)
      - 非常に長い。
      - キーワードの数が多すぎる。クリエイターは単語をたくさん追加することにより、ページの掲載順位が上がる可能性が高まると誤解しているため。
      - タイトルタグがまったくない、または決まり文句が繰り返されている。たとえば、ホームページに単純に「ホーム」という名前が付けられたり、サイト内のすべてのページが「無題」と名付けられたり、単にサイト名が付けられたりすることもあります。
- Testing Chrome version 100 for fun and profit (but mostly fun I guess)
  - https://miketaylr.com/posts/2021/09/chrome-version-100-testing.html
- Project Zero: Fuzzing Closed-Source JavaScript Engines with Coverage Feedback
  - https://googleprojectzero.blogspot.com/2021/09/fuzzing-closed-source-javascript.html
- Web Stories call to action buttons get an upgrade - The AMP Blog
  - https://blog.amp.dev/2021/09/15/web-stories-call-to-action-buttons-get-an-upgrade/

### Firefox 動向

#### Stable: 92.0.1

#### Updates

- Time for a review of Firefox 92 - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2021/09/time-for-a-review-of-firefox-92/
  - accent-color
  - size-adjust
  - Object.hasOwn
- **Firefox 92.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/92.0/releasenotes/
  - More secure connections: Firefox can now automatically upgrade to HTTPS using HTTPS RR as Alt-Svc headers.
  - Full-range color levels are now supported for video playback on many systems.
  - Mac users can now access the macOS share options from the Firefox File menu.
  - Support for images containing ICC v4 profiles is enabled on macOS.
- **Firefox 92 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/92
    - accent-color
    - font-family: system-ui
    - Object.hasOwn()

#### Intents

- Ship: ShadowRoot's delegatesFocus attribute
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/vZb1WYlEz_I
- Ship: disabling 3DES by default
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/ayz0lLotyyU
- Ship: enterkeyhint attribute
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/dZSP-vTbbuM
- **Prototype: CSS cascade layers (@layer at-rule)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/n4NQ959ngYw
- Prototype: CSS page-size
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/5tBS9nOC4Kk
- **Prototype: scroll-linked animations**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/d8k74ywuFNQ
- Prototype: WebAssembly 64-bit memory model ("memory64")
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/jqE-A3T5d8s
- Prototype and Ship : onslotchange event handler IDL attribute
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/tHIn-Ce1DSE
- **Prototype and Ship: SelectedItem and SelectedItemText system colors**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/G4W8X9ZHR3A
- **Prototype and Ship: image-rendering: smooth and image-rendering: pixelated**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/9lZnL3f6wGs
- Prototype and Ship: `<input type=datetime-local>` on desktop.
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/YcXpHAJrj_I
- Implement and Ship:
- Experiment:
- Change:
- Remove:
- Deprecate Infer linting
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/eSCG8p2FWhM

#### Other

- SpiderMonkey Newsletter (Firefox 92-93)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/AP-CGmj7CQk
- **Heads up: "Firefox 100" webcompat experiment**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/hbSiu0A83nA
  - Firefox Nightly は 2022 年 3 月 に 100 になる
  - その中で壊れるサイトがあったら報告してほしい
  - すでに Slack の emoji が壊れてるのを発見済み
- These Weeks in Firefox: Issue 99 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2021/09/09/these-weeks-in-firefox-issue-99/
- These Weeks in Firefox: Issue 100 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2021/09/21/these-weeks-in-firefox-issue-100/
- Necko Newsletter (2021-09-27)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/_hYnRM1DvRg
- **Why are hyperlinks blue?**
  - https://blog.mozilla.org/en/internet-culture/deep-dives/why-are-hyperlinks-blue/
- **UA Client Hints is less than harmful by martinthomson · Pull Request #579 · mozilla/standards-positions**
  - https://github.com/mozilla/standards-positions/pull/579

### Safari 動向

#### Stable: 15

#### Updates

- Safari 15 Release Notes | Apple Developer Documentation
  - https://developer.apple.com/documentation/safari-release-notes/safari-15-release-notes
  - Authentication and Passwords
    - Added support for Verification Codes to the iCloud Keychain Password Manager. To use verification codes with Safari and Autofill:
      - Use autocomplete=one-time-code to make an `<input>` eligible for AutoFill.
      - Use a standard otpauth URL and replace the scheme with apple-otpauth to link directly to the password manager for setup.
      - Use a raster image to enable contextual menus on otpauth QR codes that offer to set up a verification code generator.
    - Added technology preview of passkeys in iCloud Keychain:
      - Passkeys are WebAuth credentials intended to replace passwords for website and apps with device sync and backup.
      - To Enable the technology preview, in Safari choose Develop > Enable Syncing Platform Authenticator.
  - CSS
    - **Added support for aspect-ratio for box elements**
    - **Added support for lab(), lch(), hwb() color syntaxes**
    - Added support for predefined color spaces using the color() syntax: srgb, display-p3, a98-rgb, prophoto-rgb, rec2020, xyz.
    - **Adjusted environment variable calculations where appropriate to adjust for the safe area of the new iOS design**
  - HTML
    - Redesigned form controls in iOS.
    - **Added support for the theme-color meta tag to change the tab bar background and over-scroll area in macOS and iPadOS, and the status bar in iOS**
    - Added support for the media attribute to specify theme-color meta tags for Dark Mode and light appearance.
  - JS
    - **Added top-level await**
    - **Added support for ES6 Modules in Workers and ServiceWorkers**
    - **Added support for Error.cause**
    - **Added support for private class methods and accessors (Safari 14.1 added support for private data member syntax)**
    - **Added support for BigInt64Array and BigUint64Array**
  - Media
    - Added support for the MediaSession API to enable SharePlay experiences.
    - Added Playback Speed and Chapters menus to built-in media controls.
    - **Added hardware accelerated VP9 and WebM in MSE on all iPads that support iPadOS 15**
    - Added support for the Opus audio codec in WebM containers.
  - Security & Privacy
    - **Added support for automatic HTTPS upgrades**
    - **Added IP address hiding from known trackers which users can enable in Safari Preferences**
    - Private Click Measurement enhancements for privacy-preserving ad click attribution:
    - Updated attribution reporting to also send reports to the click destination.
    - Added click fraud prevention with un-linkable tokens.
    - Added IP address protection for attribution reports.
  - Payments
    - Added support for creating deferred or recurring payments.
    - Added support for indicating an estimated arrival date for shipping methods.
    - Added support for the user to enter a coupon code.
    - Added support for marking the shipping method as in-store pickup.
  - WebAssembly
    - Added support for streaming compilation.
    - Added support for bulk memory operations.
    - Added support for reference types.
    - Added support for non-trapping conversions from float to int.
  - Web APIs
    - **Added support for WebGL 2. The implementation of WebGL runs on top of Metal for better performance**
    - **Added support for Web Share level 2 enhancements to Web Share that enable sharing files from a web page to an app. See Web Share API for more information**
    - User gestures now propagate through requestAnimationFrame with a one second time limit.
  - Web Extensions
    - **Added support for Safari Web Extensions in iOS and iPadOS**
    - **Added support for declarativeNetRequest in Safari Web Extensions**
  - Web Inspector
    - Added an inspected page overlay for visualizing and debugging CSS grid contexts.
- Release Notes for Safari Technology Preview 131
  - https://webkit.org/blog/11962/release-notes-for-safari-technology-preview-131/
  - CSS
    - Changed to consider all snap areas at a given snap offset when snapping (r280527)
    - Fixed aspect ratio for replaced elements (r280471)
    - Implemented the clip value for overflow (r280509)
  - Web API
    - **Added initial support for Cross-Origin-Embedder-Policy (COEP) (r280953)**
    - **Added initial support for Cross-Origin-Opener-Policy (COOP) (r280504, r280881, r280582)**
    - **Implemented support for `<dialog>` element cancel event (r280703)**
  - JavaScript
    - **Renamed Temporal.now to Temporal.Now (r280506)**
  - Web Audio
    - Added WebM container support for Vorbis and Opus (r280573, r280416)
  - WebRTC
    - Enabled WebRTC relay by default (r280908)
    - Enabled WebRTCPlatformUDPSocketsEnabled feature by default (r280545)
    - Introduced an experimental feature to toggle WebRTC socket proxying (r280523)
  - WebCrypto
    - Added console logging to encourage the use of authenticated encryption (r280790)
  - Accessibility
    - Added support for aria-selected value changes in table cells (r280633)
- Release Notes for Safari Technology Preview 132
  - https://webkit.org/blog/11971/release-notes-for-safari-technology-preview-132/
  - JavaScript
    - Added Intl Enumeration APIs (r281513)
    - **Enabled Array#findLast method (r281369)**
    - **Enabled String#at and TypedArray#at (r281370)**
    - Implemented Temporal.Calendar behind the flag (--useTemporal) (r281788)
    - Implemented Intl Locale Info extension (r281374)
    - Implemented Intl.DisplayNames V2 (r281375)
  - Web API
    - **Implemented Crypto.randomUUID() (r281206, r281284)**
    - **Implemented self.reportError() (r281756)**

#### Position

- [webkit-dev] Request for position: supports() extended syntax for @font-face
  - https://lists.webkit.org/pipermail/webkit-dev/2021-August/031935.html
- [webkit-dev] Position on font-family: emoji (and -webkit-pictograph)
  - https://lists.webkit.org/pipermail/webkit-dev/2021-August/031938.html
- **[webkit-dev] Network Information API reboot: request for early feedback**
  - https://lists.webkit.org/pipermail/webkit-dev/2021-August/031950.html
- [webkit-dev] Request for Position on Exception Handling in WebAssembly
  - https://lists.webkit.org/pipermail/webkit-dev/2021-August/031958.html
- **[webkit-dev] Request for position on self.reportError()**
  - https://lists.webkit.org/pipermail/webkit-dev/2021-August/031960.html
- [webkit-dev] Request for position: Cryptographically secure random UUIDs
  - https://lists.webkit.org/pipermail/webkit-dev/2021-August/031962.html

#### Other

- **iOS Engine Choice In Depth - Infrequently Noted**
  - https://infrequently.org/2021/08/webkit-ios-deep-dive/
- **ドコモとソフトバンク、 iOS 15 の「プライベートリレー」で注意呼びかけ - ケータイ Watch**
  - https://k-tai.watch.impress.co.jp/docs/news/1351917.html
  - iCloud Private Relay で影響がでるキャリアのサービス
  - フィルタリングやカウントフリー系に影響が出る
- **Important Information about macOS Safari 15 | PlayCanvas**
  - https://blog.playcanvas.com/important-information-about-safari-15/
  - WebGL のライブラリやゲームエンジンが Safari 15 でクラッシュしているらしい

### Edge 動向

#### Stable: 94

#### Updates

- Make Microsoft Edge DevTools your own
  - https://blogs.windows.com/msedgedev/2021/09/14/edge-devtools-93-personalization/
- **Microsoft announces passwordless future - available across Microsoft Edge and Microsoft 365 apps | Windows Experience Blog**
  - https://blogs.windows.com/windowsexperience/2021/09/15/microsoft-announces-passwordless-future-available-across-microsoft-edge-and-microsoft-365-apps/

#### Chakra

#### Other

- Pick up where you left off on Microsoft Edge PDF Reader - Microsoft Tech Community
  - https://techcommunity.microsoft.com/t5/articles/pick-up-where-you-left-off-on-microsoft-edge-pdf-reader/m-p/2771351
- New Update Experience for Mac available in Edge Beta / Dev / Canary - Microsoft Tech Community
  - https://techcommunity.microsoft.com/t5/articles/new-update-experience-for-mac-available-in-edge-beta-dev-canary/m-p/2200983
- Add Text to your PDF documents - Microsoft Tech Community
  - https://techcommunity.microsoft.com/t5/articles/add-text-to-your-pdf-documents/m-p/2752561
- Top Feedback Summary for August - Microsoft Tech Community
  - https://techcommunity.microsoft.com/t5/articles/top-feedback-summary-for-august/m-p/2704082
- Top Feedback Summary for August 24 - Microsoft Tech Community
  - https://techcommunity.microsoft.com/t5/articles/top-feedback-summary-for-august-24/m-p/2680552

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - First Public Working Draft: WebRTC Encoded Transform
    - https://www.w3.org/blog/news/archives/9258
  - First Public Working Draft: WebXR Lighting Estimation API Level 1
    - https://www.w3.org/blog/news/archives/9256
  - First Public Working Draft: Incremental Font Transfer
    - https://www.w3.org/blog/news/archives/9254
  - First Public Working Draft: Secure Payment Confirmation (SPC)
    - https://www.w3.org/blog/news/archives/9243
  - First Public Working Drafts: WebXR Depth Sensing, Hit Test, DOM Overlays Modules
    - https://www.w3.org/blog/news/archives/9238
  - **First Public Working Draft: CSS Nesting Module**
    - https://www.w3.org/blog/news/archives/9236
    - https://www.w3.org/TR/2021/WD-css-nesting-1-20210831/
    - スタイルブロックやメディアクエリーをネストさせられる提案
    - 現在は `&` セレクタと `@nest` ルールを提案
    - Sass のような `&__element` や `&--modifier` みたいなことはできない
  - First Public Working Draft: Digital Publishing WAI-ARIA Module 1.1
    - https://www.w3.org/blog/news/archives/9231
- Chartering
  - Proposed W3C Charter: Web Authentication Working Group
    - https://lists.w3.org/Archives/Public/public-new-work/2021Aug/0013.html
  - HTML Working Group Charter extended until 30 November 2021
    - https://lists.w3.org/Archives/Public/public-new-work/2021Sep/0007.html

#### Other

- CFC notification for the HTML WG from L é onie Watson
  - https://lists.w3.org/Archives/Public/public-html/2021Sep/0003.html
- HTML review: requesting warning around references to Reporting API
  - https://lists.w3.org/Archives/Public/public-html/2021Aug/0006.html
- Normative references to works in progress
  - https://lists.w3.org/Archives/Public/public-html/2021Aug/0005.html

### TC39 動向

#### Meeting

- 2021-08
  - Agenda
    - https://github.com/tc39/agendas/blob/master/2021/08.md
  - Minutes
    - https://github.com/tc39/notes/blob/master/meetings/2021-08/aug-31.md
    - https://github.com/tc39/notes/blob/master/meetings/2021-08/sept-01.md
  - TC39 meeting, July 13-16 2021 | SpiderMonkey JavaScript/WebAssembly Engine
    - https://spidermonkey.dev/blog/2021/08/09/tc39.html
  - Updates from the 85th meeting of TC39 - DEV Community
    - https://dev.to/hemanth/updates-from-the-85th-meeting-of-tc39-2kep

#### Proposals Diff

- https://github.com/tc39/proposals/compare/master@{2021-08-01}...master@{2021-10-01}
- (8 月含む)
- 0 -> inactive
  - deprecated
- 0->1
  - String is USV String
  - Array.fromAsync
  - BigInt Math
  - Get Intrinsic
  - Fixed Shape Objects
- 1->2
  - Change Array By Copy
  - Pipeline Operator
- 2->3
  - (rename) Realms -> ShadowRealms
- 3->4
  - Array.at
  - Object.hasOwn
  - Class Static Blocks

#### New Proposals

- **guybedford/proposal-is-usv-string**
  - DOMString はサロゲートペアのどっちかが落ちてても問題ない
  - USVString はそれを許容しない
  - JS の String は DOMString だが WASM は USVString になったので検証メソッドが欲しい
  - https://github.com/guybedford/proposal-is-usv-string
- **tc39/proposal-array-from-async**
  - https://github.com/tc39/proposal-array-from-async
  - Async Iterator から Array を生成する
- **tc39/proposal-bigint-math**
  - https://github.com/tc39/proposal-bigint-math
  - Bigint 用の Math
- **ljharb/proposal-get-intrinsic**
  - https://github.com/ljharb/proposal-get-intrinsic
  - ネイティブの実装が上書きされていてもネイティブの実装を取り出す方法
- **syg/proposal-structs**
  - https://github.com/syg/proposal-structs/
  - メモリ上に確保したらその後レイアウトが変わらない構造体
  - シリアライズしてやり取りしたりする際に便利。

#### Other

- SpiderMonkey Newsletter (Firefox 92-93) | SpiderMonkey JavaScript/WebAssembly Engine
  - https://spidermonkey.dev/blog/2021/09/10/newsletter-firefox-92-93.html

### IETF 動向

#### WG

- IETF
  - https://datatracker.ietf.org/meeting/
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - Protocol Action: 'HTTP/1.1' to Internet Standard (draft-ietf-httpbis-messaging-19.txt)
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0423.html
  - Protocol Action: 'HTTP Caching' to Internet Standard (draft-ietf-httpbis-cache-19.txt)
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0422.html
  - Protocol Action: 'HTTP Semantics' to Internet Standard (draft-ietf-httpbis-semantics-19.txt)
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0421.html
  - Partial signatures on the Via header
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0407.html
  - Digest: Last Call and the next interim meeting
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0406.html
  - I-D Action: draft-ietf-httpbis-h3-websockets-00.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0405.html
  - HTTP (httpbis) WG Virtual Meeting: 2021-09-30 from IESG Secretary
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0363.html
  - HTTP (httpbis) WG Virtual Meeting: 2021-09-28 from IESG Secretary
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0362.html
  - httpbis - Not having a session at IETF 112
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0359.html
  - I-D Action: draft-ietf-httpbis-rfc7838bis-00.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0357.html
  - Protocol Action: 'Building Protocols with HTTP' to Best Current Practice (draft-ietf-httpbis-bcp56bis-15.txt)
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0350.html
  - New I-D: Bootstrapping WebSockets with HTTP/3
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0335.html
  - http core spec: late change w.r.t. IANA field registration procedure
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0435.html
  - I-D Action: draft-ietf-httpbis-targeted-cache-control-01.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0434.html
  - Retrying requests sent to Alternative Services
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0429.html
  - I-D Action: draft-ietf-httpbis-http2bis-05.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0444.html
  - I-D Action: draft-ietf-httpbis-priority-05.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0441.html
  - Message Signatures and Cookies
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0440.html
  - I-D Action: draft-ietf-httpbis-http2bis-04.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0439.html
  - Significant milestone on HAProxy's H3/QUIC
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0436.html
- quicwg
  - https://mailarchive.ietf.org/arch/browse/quic/
  - https://github.com/quicwg/wg-materials
- webtrans
  - https://mailarchive.ietf.org/arch/browse/webtransport/
  - https://github.com/DavidSchinazi/webtrans-wg-materials
- tlswg
  - https://mailarchive.ietf.org/arch/browse/tls/
  - https://github.com/tlswg/wg-materials
- wpack
  - https://mailarchive.ietf.org/arch/browse/wpack/
- masque
- pearg
- privacypass
- dispatch
  - https://mailarchive.ietf.org/arch/browse/dispatch/
- secdispatch
  - https://mailarchive.ietf.org/arch/browse/secdispatch/

#### Other

### CDN 動向

#### Cloudflare

- **From AMP to Signed Exchanges, Or How Innovation Happens at Cloudflare**
  - https://blog.cloudflare.com/from-amp-to-signed-exchanges-or-how-innovation-happens-at-cloudflare/
- **Improve site load times and SEO with one-click support for Signed Exchanges on Google Search**
  - https://blog.cloudflare.com/automatic-signed-exchanges/
- **Early Hints: How Cloudflare Can Improve Website Load Times by 30%**
  - https://blog.cloudflare.com/early-hints/
- Benchmarking Edge Network Performance: Akamai, Cloudflare, Amazon CloudFront, Fastly, and Google
  - https://blog.cloudflare.com/benchmarking-edge-network-performance/
- Unboxing the Last Mile: Introducing Last Mile Insights
  - https://blog.cloudflare.com/last-mile-insights/

#### Fastly

#### Other

### セキュリティ動向

- **SecWeb**
  - https://secweb.work/
  - Adopting Trusted Types in Production Web Frameworks to Prevent DOM-Based Cross-Site Scripting: A Case Study
    - https://storage.googleapis.com/pub-tools-public-publication-data/pdf/9c56e856f0ea76454f01cabec9959f7c5b31b285.pdf
  - JSONPS: Secure an inherently insecure practice with this one weird trick!
    - https://secweb.work/papers/lekies2021jsonps.pdf
  - Determining OS Platform Version - text/plain
    - https://textslashplain.com/2021/09/21/determining-os-platform-version/
- HTTPS Is Actually Everywhere | Electronic Frontier Foundation
  - https://www.eff.org/deeplinks/2021/09/https-actually-everywhere

### 周辺動向

- **開発終了の国産 Web ブラウザー「Kinza」、ソースコードが公開 - 窓の杜**
  - https://forest.watch.impress.co.jp/docs/news/1347974.html
- **Testing Chrome version 100 for fun and profit (but mostly fun I guess)**
  - https://miketaylr.com/posts/2021/09/chrome-version-100-testing.html
  - Chrome Canary に UA 文字列のメジャーバージョンを 100 に変更するフラグが入った

### イベント

- 10 月
  - 6-7: PWA Summit
    - https://pwasummit.org/
  - 18-29: TPAC:
    - 10/18-22 October: Breakout sessions
    - 10/25-29 October: Groups and Joint Meetings
    - https://lists.w3.org/Archives/Public/public-webrtc/2021Apr/0027.html
- 11 月
  - 6-12: IETF112 Online
    - https://www.ietf.org/how/meetings/112/
  - 16-18: BlinkOn 15
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/w1ChUGMhO58/m/_6mgHrfgAwAJ

### Wrap Up

- Chrome
  - 93 module script / release cycle shorten
  - 94 WebCodecs / WebGPU
  - 95 UA Reduction OT / `self.reportError()` / eyedropper / URLPattern
  - ship `self.reportError()`
  - ship script element support
  - ship webtransport
  - ship HTTPS DNS record
  - prototype renderpriority
  - web.dev JS Event History
  - web.dev specuration rules
  - User Device Characteristics レポート
  - Manifest V3 移行
  - UA Reduction Timeline
  - Search Central での `<title>` と `<h1>` の扱い
  - version 100 flag
- Firefox
  - 92 accent-color / hasOwn / font-family: system-ui
  - prototype cascade layers
  - prototype scroll linked animations
  - version 100 experiment
  - why are hyperlinks blue ?
  - UA-Ch standard position non-harmful
- Safari
  - Safari 15 release
  - iCloud keychain auth key
  - CSS aspect-ratio
  - HTML meta theme-color
  - JSC top level await / module worker / private class methods & accessor
  - API WebGL 2
  - iOS / iPadOS extension
  - TP COOP/COEP , `<dialog>`, Temporal 実装開始
  - TP random.UUID, self.reportError 実装
  - Position request for Network Information API
  - Private Relay 提供開始 => カウントフリーやフィルタリングで不具合
- W3C/WHATWG
  - CSS Nesting FPWD
- TC39
  - isUSVString
  - Array.fromAsync
  - BigInt Math
  - getIntrinsic
  - Fixed Layout Structs
- IETF
  - httpbis の Core / BCP RFC が出そう
- CDN
  - Cloudflare の SXG と Early Hints の話
- Security
  - secweb で面白そうな論文がちらほら
