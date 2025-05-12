---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep149.mp3
published_at: 2024-04-27
guest: [@myakura](https://twitter.com/myakura)
---

# ep149 Monthly Platform 202404

## Theme

第 149 回のテーマは 2024 年 4 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 124

#### Updates

- **New in Chrome 124**
  - https://developer.chrome.com/blog/new-in-chrome-124
  - Use declarative shadow DOM in JavaScript
  - WebSocket Stream API
  - View transitions improvements
  - And more!
  - Further reading
  - Subscribe
- **Chrome 124 | Release notes**
  - https://developer.chrome.com/release-notes/124
- **What's new in DevTools, Chrome 124**
  - https://developer.chrome.com/blog/new-in-devtools-124
- **Chrome 125 beta**
  - https://developer.chrome.com/blog/chrome-125-beta
  - CSS
    - CSS Anchor Positioning
    - CSS stepped value `functions-round()`, `mod()`, and `rem()`
    - Remove discontinuity for Oklab and Oklch colors with lightness of nearly 100% or 0
    - Used color scheme root scrollbars
  - HTML
    - Keyboard-focusable scroll containers
    - Declarative shadow DOM serialization
  - Web APIs
    - Additions to the Attribution Reporting API
    - The Compute Pressure API
    - Accept HTTP(S) URLs when constructing WebSocket
    - Extending Storage Access API (SAA) to non-cookie storage
    - FedCM CORS requirement on ID assertion endpoint
    - Interoperable mousemove default action
    - Updates to the Shared Storage API
  - Chrome Apps
    - Direct Sockets API in Chrome Apps
  - New origin trials
    - FedCM Button Mode API and Use Other Account API
    - Foldable APIs
    - Media Previews opt-out
    - Deprecation trial for prefixed HTMLVideoElement Fullscreen properties and methods
    - Skip preload scanning
  - Deprecations and removals
    - Remove "window-placement" alias for permission and permission policy "window-management"
    - Removal of Enterprise policy: NewBaseUrlInheritanceBehaviorAllowed
    - Removal of prefixed HTMLVideoElement Fullscreen properties and methods
- What's New in WebGPU (Chrome 124)
  - https://developer.chrome.com/blog/new-in-webgpu-124

#### Intents

- Ship: Declarative shadow DOM serialization
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/T4jcCXRkwB8
- Ship: CSS Stepped Value Functions
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WQLmZB0PRgM
- Ship: Attribution Reporting Feature Bundle: Additional Verbose Debug Reports, Further Gating Source Verbose Debug Reports, Splitting the Attribution Rate Limit
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9UyhI6SRyxM
- Ship: CSS Anchor Positioning
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/jGTYNuidPRs
- Ship: FedCM: Credentialed requests will no longer send SameSite=Strict cookies
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ghxeqsFhPY8
- Ship: Gamepad API Trigger-Rumble Extension
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZdpePHn-UIM
- Ship: Support Cross-Origin Shared Storage Worklets
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JJFldgplL58
- **Ship: `URL.parse()`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/G070zUd0e4c
- Ship: WebGLObject Web IDL superinterface
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nPg5H6CkDvU
- **Ship: Stable Bare Declarations (@nest)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/prg4CN0eEGg
  - CSS Nesting の shifting up (hoisting) を解決仕様とする試み
  - ネストしたブロックの後にくる通常の宣言を包むためのルール
  - CSSWG や他 standard-position で議論が散らばっている
- Prototype and Ship: toJSON for GeolocationCoordinates and GeolocationPosition
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JQkvFd0oXUI
- **Prototype: Document-Isolation-Policy**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HrdJr8dSoUE
- **Prototype: ::scroll-marker and ::scroll-markers for Carousel**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4hDfC6nBoP0
- **Prototype: Future browsing context group dependency hint**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sI1zySADmNs
- **Prototype: headingstart attribute.**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8yl-pJhuLHE
- **Prototype: Importmap integrity**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/O2UR3kb-HcI
  - Yoav Weiss "Trying to gather a web developer signal - do y'all care about subresource integrity for dynamic imports?"
  - https://twitter.com/yoavweiss/status/1778067431417954803
- **Prototype: Storage Access API Headers**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yfxV-jLMqNg
- **Prototype: Third-party Cookie Grace Period Opt-Out**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/O9mh5XvbqqE
- **Prototype: Web Install API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CyIcrJX33ik
- Prototype: Audio Output Devices API: `setDefaultSinkId()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yu2JfZaOpQs
- **Prototype: Web Translation API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ie46tc6_8so
- Experiment: Foldable APIs (combo of Device Posture and Viewport Segments APIs)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/y7BPRu8C2o4
- Experiment: Protected Audience Bidding & Auction Services
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2bwMHd3Yz7I
- **Experiment: FedCM Bundle 6: Continuation API, Scope API, Scaling Well-Known, Custom account labels**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ypvHRK8MqEo
- Web-Facing Change PSA: Support "color-interpolation: linearrgb" on SVG gradients
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4-oI8ruAKXY
- FYI: Shared Storage API data storage limits updated
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vu8hvzY__y4
- Extend Reverse Origin Trial: Trial for SharedArrayBuffers in non-isolated pages on Desktop platforms
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4tDmckQLZLQ
- PSA: Direct Sockets in Chrome Apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AtcCPxeYqmw
- Ready for Developer Testing: Media Previews opt-out
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0V39bkO_ddk
- **Q1 2024 Summary from Chrome Security**
  - https://groups.google.com/a/chromium.org/g/security-dev/c/VSTfZ3SsGDk

#### Other

- web.dev
  - blog
    - New to the web platform in March
      - https://web.dev/blog/web-platform-03-2024
    - Learning from you about AI
      - https://web.dev/blog/ai-chats-and-takeaways
    - **Introducing Learn JavaScript**
      - https://web.dev/blog/introducing-learn-javascript
    - The align-content property for block layouts is now part of Baseline
      - https://web.dev/blog/align-content-block
    - **The Intl.Segmenter object is now part of Baseline**
      - https://web.dev/blog/intl-segmenter
  - article
    - **CSS color-scheme-dependent colors with `light-dark()`**
      - https://web.dev/articles/light-dark
    - What is Artificial Intelligence?
      - https://web.dev/articles/ai-overview
    - Ethics and AI
      - https://web.dev/articles/ai-ethics
    - Meet the Web.dev AI Team
      - https://web.dev/articles/ai-team
    - Upgrade your site search: Contextual answers with generative AI
      - https://web.dev/articles/ai-rag-search
    - Play the Chrome dino game with your gamepad
      - https://web.dev/articles/gamepad
- google for developers
  - https://developers.googleblog.com/
- google developer japan blog
  - Google Developers Japan: パスキーハッカソンを開催します
    - https://developers-jp.googleblog.com/2024/04/passkey-hackathon.html
- chrome developer blog
  - **The fetchLater API Origin Trial**
    - https://developer.chrome.com/blog/fetch-later-api-origin-trial
  - Goodbye JS Profiler, profiling CPU with the Performance panel
    - https://developer.chrome.com/blog/profiling-cpu
  - Version rollbacks in the Chrome Web Store Developer Dashboard
    - https://developer.chrome.com/blog/chrome-webstore-rollback
  - Navigation types now available in CrUX
    - https://developer.chrome.com/blog/crux-navigation-types
  - Fun & Powerful: Intro to Chrome DevTools
    - https://developer.chrome.com/blog/devtools-tips-32
  - Access to MIDI devices now requires user permission
    - https://developer.chrome.com/blog/web-midi-permission-prompt
  - Origin trial for Foldable APIs
    - https://developer.chrome.com/blog/foldable-apis-ot
  - What's happening in Chrome Extensions?
    - https://developer.chrome.com/blog/extension-news-april-2024
  - The Private Network Access (PNA) for non-secure contexts deprecation trial is ending-implement the PNA permission prompt
    - https://developer.chrome.com/blog/pna-permission-prompt-ot-end
- chromium blog
  - **Chromium Blog: Fighting cookie theft using device bound sessions**
    - https://blog.chromium.org/2024/04/fighting-cookie-theft-using-device.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - Google Online Security Blog: Address Sanitizer for Bare-metal Firmware
    - https://security.googleblog.com/2024/03/address-sanitizer-for-bare-metal.html
  - **Google Online Security Blog: Google Public DNS's approach to fight against cache poisoning attacks**
    - https://security.googleblog.com/2024/03/google-public-dnss-approach-to-fight.html
    - DNS Cache poisoning 対策のガイド
    - Query Source Port / Query ID の Randomize
    - DNS Cookie
    - Case Randomize
    - DNS over TLS
    - DNS 運用者は最低でもどれか一個はやったほうがいい
  - **Google Online Security Blog: Uncovering potential threats to your web application by leveraging security reports**
    - https://security.googleblog.com/2024/04/uncovering-potential-threats-to-your.html
    - Google がどうやって CSP レポートを集めるかの話
    - レポートの中からノイズを省いて問題に集中するためのテクニックもある
    - HyperLogLog という推定方法で重複 IP をカウントする方法など
- search blog
  - https://developers.google.com/search/
- v8
  - https://v8.dev/
  - The V8 Sandbox · V8
    - https://v8.dev/blog/sandbox
- Justin Fagnani が Google を退職
  - https://twitter.com/justinfagnani/status/1776339358284644599
  - Lit には引き続き関わる

### Firefox 動向

#### Stable: 125.0.2

#### Updates

- Firefox 125.0.1, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/125.0.1/releasenotes/
- **Firefox 125 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/125
  - `align-content` on block
  - Intl.Segmenter
  - Popover
  - AV1 on EME
- 1892069 - dom.block_download_insecure causes a different file to download from a website
  - https://bugzilla.mozilla.org/show_bug.cgi?id=1892069
- Switch to Container Tabs - These Weeks in Firefox: Issue 157 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2024/04/02/switch-to-container-tabs-these-weeks-in-firefox-issue-157/
- **Customizing Reader Mode - These Weeks in Firefox: Issue 158 - Firefox Nightly News**
  - https://blog.nightly.mozilla.org/2024/04/15/customizing-reader-mode-these-weeks-in-firefox-issue-158/
  - ESMification が 100% に
- **Wall to Wall Improvements - These Weeks in Firefox: Issue 159 - Firefox Nightly News**
  - https://blog.nightly.mozilla.org/2024/04/23/wall-to-wall-improvements-these-weeks-in-firefox-issue-159/
  - Brotli の展開をメインスレッドから外したら 50 パーセンタイルで LCP が 10% 向上した
- Exploring improvements to the Firefox sidebar - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2024/04/15/exploring-improvements-to-the-firefox-sidebar/
  - 縦タブなどサイドバーの機能強化を検討しているらしい
- Firefox Nightly Now Available for Linux on ARM64 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2024/04/19/firefox-nightly-now-available-for-linux-on-arm64/

#### Intents

- **Ship: CSS zoom property, Element.currentCSSZoom (and partially unship -moz-transform)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/2xo3_A8as4E
- Prototype: CloseWatcher
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/gq_k_Kdb9Gk
- Prototype: TextEvent and textInput event
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/noIHUpX5tHw
- **Prototype: Relative Color Syntax**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/McZfEwrqce8
- **Prototype: CSS Margin rules**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/T_dnrCZezRs
- **Prototype: Scoped Styles (@scope)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/VokGNgqFqt0
- **Prototype: @starting-style rule in CSS Transitions Level 2**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/IXyZWh8oJek
- Unship: `<marquee>` start/finish/bounce events
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/2_-v3ODTS_0
- Unship: [mathml] Automatic vertical centering of some basic binary operators
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/nlA0t4J0gzo
- PSA: using `fetch()` or new `XMLHttpRequest()` from Firefox's privileged (chrome) code will now not send cookies / credential information by default
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/TWExppdK208
- ESMification: Out-of-tree migration
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/HJHAaGKSeGU

#### Newsletter

- Performance Testing Newsletter, Q1 Edition
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/An6YSd_Wl10/m/WO39x79vAAAJ
- Engineering Effectiveness Newsletter (February/March 2024 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/KJZhd7UZohM
- Firefox WebDriver Newsletter - 125 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-125/

#### MDN / Open Web Docs

- Open Web Docs Impact and Transparency Report 2023
  - https://openwebdocs.org/content/reports/2023/
- MDN が Web Awesome という Kickstarter のバナー出してる
  - https://www.kickstarter.com/projects/fontawesome/web-awesome
- Setting up service workers on Vultr | MDN Blog
  - https://developer.mozilla.org/en-US/blog/setting-up-service-workers-on-vultr/
- **CSS containment**
  - https://openwebdocs.org/content/posts/css-containment/

#### Standard Position

- 今月 Close された Issue と PR ものをみる
  - https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2024-03-01+
- positive
  - **`getHTML()` and the serializable concept · Issue #1006 · mozilla/standards-positions**
    - https://github.com/mozilla/standards-positions/issues/1006
  - **MediaRecorder: Support mp4 container with avc1 and mp4a.40.2 codecs for MediaRecorder · Issue #996 · mozilla/standards-positions**
    - https://github.com/mozilla/standards-positions/issues/996
  - **[css-color-adjust-1] Root non-overlay scrollbars used color scheme · Issue #995 · mozilla/standards-positions**
    - https://github.com/mozilla/standards-positions/issues/995
  - **CSS margin-trim property · Issue #994 · mozilla/standards-positions**
    - https://github.com/mozilla/standards-positions/issues/994
- negative
  - **`autocomplete=device-eid` and `=device-imei` · Issue #1002 · mozilla/standards-positions**
    - https://github.com/mozilla/standards-positions/issues/1002

#### Other

- Google's Protected Audience Protects Advertisers (and Google) More Than It Protects You
  - https://blog.mozilla.org/en/privacy-security/googles-protected-audience-protects-advertisers/
- **Protected Audience Privacy Analysis**
  - https://mozilla.github.io/ppa-docs/protected-audience.pdf
- Empowering Choice: Firefox Partners with Qwant for a Better Web
  - https://blog.mozilla.org/en/products/firefox-partners-with-qwant/
- Rapidly Leveling up Firefox Security - Mozilla Security Blog
  - https://blog.mozilla.org/security/2024/04/04/rapidly-leveling-up-firefox-security/
- Porting a cross-platform GUI application to Rust - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2024/04/porting-a-cross-platform-gui-application-to-rust/
- **Prototype even faster with the Gradio UI for Figma component library - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2024/04/prototype-even-faster-with-the-gradio-ui-for-figma-component-library/
- Servo and SpiderMonkey - Servo, the embeddable, independent, memory-safe, modular, parallel web rendering engine
  - https://servo.org/blog/2024/04/15/spidermonkey/
- **Bug 1871963: Implement zstd content-encoding support**
  - https://hg.mozilla.org/mozilla-central/rev/99e71b905661

### Safari 動向

#### Stable: 17.4

#### Updates

- **Help us invent CSS Grid Level 3, aka "Masonry" layout**
  - https://webkit.org/blog/15269/help-us-invent-masonry-layouts-for-css-grid-level-3/
  - Masonry の議論が難航しており、開発者のフィードバックを求めている
  - 特にこれを Display Grid の派生と考えるかどうか
  - またこれを用いるモチベーションがあるかどうか
- **Optimizing WebKit & Safari for Speedometer 3.0**
  - https://webkit.org/blog/15249/optimizing-webkit-safari-for-speedometer-3-0/
- **Release Notes for Safari Technology Preview 192**
  - https://webkit.org/blog/15260/release-notes-for-safari-technology-preview-192/
  - Added support for View Transitions. (276426@main) (123128491)
  - Added support for MSE in workers. (276389@main) (123052315)
  - Added support for `URL.parse()`. (276656@main) (125376520)
  - Added support for shadowRootDelegatesFocus and shadowRootClonable to template. (276631@main) (125401993)
  - Updated to use the web extension architecture in open-source WebKit code. Web extension authors are encouraged to test your extensions and report issues. (123908710)
- **Release Notes for Safari Technology Preview 193**
  - https://webkit.org/blog/15375/release-notes-for-safari-technology-preview-193/
  - Fixed inconsistent output of Function.prototype.toString for accessor properties. (276904@main) (125739577)
  - Added support for PopStateEvent's hasUAVisualTransition. (277001@main) (125849073)

#### Standard Positions

- 今月 Close されたものをみる
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2024-03-01+
- support
  - Digital Credentials API · Issue #332 · WebKit/standards-positions
    - https://github.com/WebKit/standards-positions/issues/332
- oppose
  - Page Embedded Permission Control · Issue #270 · WebKit/standards-positions
    - https://github.com/WebKit/standards-positions/issues/270

#### Other

- **www.nhl.com - design is broken · Issue #135984 · webcompat/web-bugs**
  - https://github.com/webcompat/web-bugs/issues/135984
  - Safari で JPEG2000 のサポートを削除したところ nhl.com が壊れた

### Edge 動向

#### Stable: 124

#### Updates

- **Introducing the Edge 2024 web platform top developer needs dashboard - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2024/04/18/2024-web-platform-top-developer-needs-dashboard/
- Microsoft Edge - 2024 web platform top developer needs
  - https://microsoftedge.github.io/TopDeveloperNeeds/
- Improving text editing on the web, one feature at a time - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2024/04/23/improving-text-editing-on-the-web/

#### Other

- Browser Security Bugs that Aren't: JavaScript in PDF - text/plain
  - https://textslashplain.com/2024/04/10/browser-security-bugs-that-arent-javascript-in-pdf/
- A Slow 10K - text/plain
  - https://textslashplain.com/2024/04/09/a-slow-10k/
- Mouse Gestures in Edge - text/plain
  - https://textslashplain.com/2024/04/23/mouse-gestures-in-edge/
- **We've just launched Microsoft Store installers for web**
  - https://twitter.com/RudyHuyn/status/1781839212935069856

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft

#### Open/UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- 気になるのがあったときだけ

#### Other

- Vision for W3C
  - https://www.w3.org/TR/2024/NOTE-w3c-vision-20240403/
- Breakouts Day 2024 Recap
  - https://www.w3.org/blog/2024/breakouts-day-2024-recap/
- **Warn that the XML syntax is not recommended by sideshowbarker · Pull Request #10239 · whatwg/html**
  - https://github.com/whatwg/html/pull/10239
  - XML 構文での仕様はメンテされておらず推奨されないことが明記された
  - Declarative Shadow DOM for XML Syntax · Issue #10237 · whatwg/html
    - https://github.com/whatwg/html/issues/10237
- Mark Nottingham: "**On the Shinkansen, hyperventilating...**" - techpolicy
  - https://techpolicy.social/@mnot/112228877734080748
  - 広島で開催の AC ミーティングに向かう新幹線の中で mnot が見た光景

### TC39 動向

#### Meeting

- **2024-02**
  - https://github.com/tc39/notes/tree/main/meetings/2024-02
  - https://github.com/tc39/agendas/blob/main/2024/02.md
  - https://twitter.com/mozaicfm/status/1772609638829035653
- TC39 100th Meeting
  - https://twitter.com/TC39/status/1755410133176242322
- WinterCG の作業を Ecma の TC55 でやりそう
  - https://github.com/tc39/notes/blob/main/meetings/2024-02/feb-6.md#secretarys-report
- Intl.MessageFormat: I have some questions
  - MF2 が Unicode CLDR で策定されている
  - 策定が Unicode で終わるまでまつかどうかの議論
- ArrayBuffer transfer for stage 4
  - Stage 4
- revisit Promise.try
- Uint8Array Base64 for stages 2.7 and 3
  - Static から Prototype に
  - Stage 3
- ESM Phase Imports for stage 1
  - https://docs.google.com/presentation/d/1Vxx9cohxn9MgvLL3607LFDBAngcyQUb8PlaPo1c7EsU/edit#slide=id.p
  - Source phase import は WASM のコンストラクタに渡すモチベ
  - そこで JS の Module をとりたい
  - ESM のモジュールを読み込み Worker に渡せる
  - Stage 1
- "Discard" (void) Bindings for stage 1
  - 捨てるための変数を void にする
  - destructuring とかで便利
  - Stage 1

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2024-02-01}...main@{2024-03-01}
- https://tc39.github.io/beta/
- 0->1
  - Iterator Unique
  - Micro and mini waits
  - Iterator chunking
  - ESM Phase Imports
  - Function and Object Literal Element Decorators
  - Discard void Bindings
- 1->2
  - Joint Iteration
  - Promise.try
  - ShadowRealm
  - Improved Escapes for Template Literals
- 2->2.7
- 2.7->3
  - Uint8Array to/from Base64
- 3->4
  - ArrayBuffer transfer
- Inactive
  - Math Extension
  - Generator Arrow function
  - Math.signbit

#### New Proposals

- **proposal-signals/proposal-signals: A proposal to add signals to JavaScript.**
  - https://github.com/proposal-signals/proposal-signals

#### Other

- WinterCG

### WinterCG 動向

- Meeting や大きな動きがあった月だけやる

#### Meeting

- 2024-04-04 meeting · Issue #64 · wintercg/admin
  - https://github.com/wintercg/admin/issues/64

### IETF 動向

#### IETF 119

- **HTTPWG**
  - https://datatracker.ietf.org/meeting/119/session/httpbis/
  - https://datatracker.ietf.org/meeting/119/materials/minutes-119-httpbis-00
  - Cookiebis
    - もうすぐ Last Call
  - Unprompted Authentication
    - Signature HTTP Authentication Scheme に改名
  - Query Method
    - 全然進んでない
  - Resumable Uploads
    - だいぶ複雑になってきた
    - application/partial-upload を定義
  - Retrofit Structured Fields
    - 仕様的にはほぼ終わった
    - 実際の作業を再開したい?
  - Cache Group
    - Group 全体の revalidate は難しいし必要性もわからないのでやめる
    - それ以外 WGLC できそう
  - Compression Dictionary Transport
    - いくつか Issue あり
  - HTTP/3 On Streams
    - やっぱり UDP 通らないところがあるから HTTP/3 over TCP が必要そう
    - 割と賛成が多そう
  - Reverse HTTP Tunnel
    - かなり難しそうだから議論がもっと必要
- QUIC
  - https://github.com/quicwg/wg-materials/blob/main/ietf119/minutes.md

#### WG

- RFC
  - RFC 9429 on JavaScript Session Establishment Protocol (JSEP)
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/SFKU3LbjX11bbfPviZZroyrAmL4/
  - Last Call: draft-ietf-tls-keylogfile-01.txt (The SSLKEYLOGFILE Format for TLS) to Informational RFC
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/PadqcgbNefIpAbbnq75stIdOR8Q/
- Work
  - WGLC Review: Connect-TCP from Mike Bishop
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024AprJun/0010.html
  - I-D Action: draft-ietf-httpbis-secondary-server-certs-00
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024AprJun/0012.html
  - Compression dictionary issues for broader discussion
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024AprJun/0013.html
  - I-D Action: draft-ietf-httpbis-sfbis-06.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2024AprJun/0017.html
- Meeting

#### Other

- Review of TLS's ECH HTTP-related I-Ds from Sean Turner on 2024-04-01 (ietf-http-wg@w3.org from April to June 2024)
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2024AprJun/0000.html
- Content-Encoding and MITM devices from Patrick Meenan
  - https://lists.w3.org/Archives/Public/ietf-http-wg/2024AprJun/0002.html

### CDN 動向

#### Cloudflare

- **Cloudflare Calls: millions of cascading trees all the way down**
  - https://blog.cloudflare.com/cloudflare-calls-anycast-webrtc/
  - WebRTC 用 SFU
  - 接続速度のチューニングや疎通など面倒なことを全部やってくれる
  - Room の概念はなくアプリ開発者が自由な構成で使える
- Developer Week 2024 wrap-up
  - https://blog.cloudflare.com/developer-week-2024-wrap-up/
- **How we ensure Cloudflare customers aren't affected by Let's Encrypt's certificate chain change**
  - https://blog.cloudflare.com/shortening-lets-encrypt-change-of-trust-no-impact-to-cloudflare-customers/
  - 2024 年 9 月 30 日に IdenTrust とのクロスルートが終わって ISRG Root X1 になる
  - これにより古いデバイスで接続できなくなる可能性がある
  - CF は No Browser left Behind というポリシーのためこれを許容しない
  - そこで LE を選んでない場合は自動で LE 以外の CA から取得するようになる
- **Improving authoritative DNS with the official release of Foundation DNS**
  - https://blog.cloudflare.com/foundation-dns-launch/
  - Cloudflare の権威 DNS 実装が公開された
- An Internet traffic analysis during Iran's April 13, 2024, attack on Israel
  - https://blog.cloudflare.com/internet-traffic-analysis-iran-israel-april-attack/
- DDoS threat report for 2024 Q1
  - https://blog.cloudflare.com/ddos-threat-report-for-2024-q1/
- **Cloudflare named in 2024 Gartner ® Magic Quadrant ™ for Security Service Edge**
  - https://blog.cloudflare.com/cloudflare-sse-gartner-magic-quadrant-2024/

#### Fastly

- **Let's Encrypt Chain of Trust Impact**
  - https://www.fastly.com/blog/lets-encrypt-chain-of-trust-impact
  - 6/6 にクロスルートの参照が停止
- One Fastly - Unified Login Experience
  - https://www.fastly.com/blog/one-fastly-unified-login-experience
- **BoringSSL to make TLS more secure**
  - https://www.fastly.com/blog/boringssl-to-make-tls-more-secure
  - OpenSSL から BoringSSL へ移行した話
  - よりシンプルで安全になった
  - 細かい差異をカバーしてより優れた実装に置き換わった
  - バージョンがないのでアップデートの分析が大変だがその価値はあった
- **TLS: More secure; always fast**
  - https://www.fastly.com/blog/tls-more-secure-always-fast
  - BoringSSL 移行に合わせて Neverbleed を導入した
  - パフォーマンスが劣化しないように非同期化などでチューニングした話

#### Other

- Latency numbers every frontend developer should know - Vercel
  - https://vercel.com/blog/latency-numbers-every-web-developer-should-know

### セキュリティ動向

- Design choices for post-quantum TLS
  - https://educatedguesswork.org/posts/pq-rollout/
- **oss-security - backdoor in upstream xz/liblzma leading to ssh server compromise**
  - https://openwall.com/lists/oss-security/2024/03/29/4
  - xz に巧妙なバックドアが仕込まれていた
- xz/liblzma: Bash-stage Obfuscation Explained - gynvael.coldwind//vx.log
  - https://gynvael.coldwind.pl/?lang=en&id=782
- **GitHub comments abused to push malware via Microsoft repo URLs**
  - https://www.bleepingcomputer.com/news/security/github-comments-abused-to-push-malware-via-microsoft-repo-urls/
  - GitHub 経由でマルウェアが配布されていた
  - URL が github.com/microsoft/ 以下になっているが、これは GitHub の仕様を悪用したもの
  - コメントでアップロードされたファイルにレポジトリ名がついてしまう
- GuptiMiner: Hijacking Antivirus Updates for Distributing Backdoors and Casual Mining - Avast Threat Labs
  - https://decoded.avast.io/janrubin/guptiminer-hijacking-antivirus-updates-for-distributing-backdoors-and-casual-mining/
- **NIST SP 800-63B への補遺が出ました〜パスキーの追加です - @\_Nat Zone**
  - https://www.sakimura.org/2024/04/5776/
- **CA Incident Transparency and Public Audits**
  - https://www.mail-archive.com/dev-security-policy@mozilla.org/msg01525.html
  - https://venafi.com/blog/24-000-mis-issued-ev-certificates-to-be-revoked-and-reissued-by-entrust-this-sunday-are-you-ready/
  - Entrust という会社で EV の誤発行があったらしい

### 周辺動向

- April Conference News | Igalia
  - https://www.igalia.com/2024/04/03/April-Conference-News.html
- In-App Browsers: The worst erosion of user choice you haven't heard of - Open Web Advocacy
  - https://open-web-advocacy.org/blog/in-app-browsers-the-worst-erosion-of-user-choice-you-havent-heard-of/
- Considerations for AI Opt-Out
  - https://www.mnot.net/blog/2024/04/21/ai-control
- **Chromium Backend Beta - Wolvic**
  - https://wolvic.com/blog/Chromium_Beta_APKs/

### Cookie 動向

- **Update on the plan for phase-out of third-party cookies on Chrome**
  - https://privacysandbox.com/intl/en_us/news/update-on-the-plan-for-phase-out-of-third-party-cookies-on-chrome/
  - 3rd Party Cookie Deprecation の延期。
  - 未定だが少なくとも 2024 年内の deprecation 完了はない。

### イベント

- 5 月
  - 14: Google I/O 2024
    - https://io.google/2024/
  - 21-23 Microsoft Build
    - https://www.microsoft.com/en-us/build
- 6 月
  - 3-5: Web Engine Hackfest
    - https://webengineshackfest.org/
  - 10: WWDC
    - https://developer.apple.com/wwdc24/

### Wrap Up

- Chrome
  - 124
    - setHTMLUnsafe/parseHTMLUnsafe
    - WebSocketStream
    - ReadableStream async iteration
    - HTTP priority header
    - Sec-CH-UA-Form-Factors
    - PWA install criteria がなくなる
    - document render blocking
    - dcc にリリースノートが登場
  - 125 Beta
    - CSS Anchor Positioning
    - CSS `round()`/`mod()`/`rem()`
    - Compute Pressure API
  - Ship
    - CSS `round()`/`mod()`/`rem()`
    - CSS Anchor Positioning
    - `URL.parse()`
    - Stable Bare Declarations (@nest)
  - Prototype
    - Document-Isolation-Policy
    - headingstart attribute
    - Web Install API
    - Web Translation API
  - Experiment
    - FedCM Bundle 6
  - Chrome Developers
    - fetchLater Origin Trial
  - Chromium blog
    - Device Bound Session Credentials
  - other blogs
    - Google Public DNS approach against cache poisoning
    - Google の CSP レポート
  - other
- Firefox
  - 125
    - align-content on block
    - Intl.Segmenter
    - Popover
  - Ship
    - CSS zoom
  - Prototype
    - Relative Color Syntax
    - @scope
    - @starting-style
  - Standard Position
    - positive
      - DSD serialization
      - margin-trim
    - negative
      - autocomplete=device-eid/device-imei
  - other
    - Protected Audience analysis
    - zstd
- Safari
  - TP 192
    - View Transitions
    - `URL.parse()`
  - blog
    - Masonry layout
  - Standard Position
    - positive
      - Digital Credentials
    - negative
      - Page Embedded Permission Control
- Edge
  - Edge 2024 web platform developer needs dashboard
- W3C/WHATWG
  - Visions for W3C Note
  - Other
    - XHTML is not recommended
- TC39
  - 100th meeting
  - TC55 WinterCG
  - ArrayBuffer transfer stage 4
  - revisit Promise.try
  - Uint8Array Base64 stage 3
  - ESM Phase Imports stage 1
  - void bindings stage 1
  - proposal-signals
- WinterCG
- IETF
  - Cookiebis もうすぐ Last Call
  - Query Method 全然進んでない
  - Resumable Uploads 複雑になってきた
  - Retrofit SFV 仕様はほぼ完了
  - Cache Group WGLC 間近
  - HTTP/3 on TCP の提案
  - Reverse HTTP Tunnel 難しそう
- CDN 動向
  - CF Let's Encrypt クロスルート終了に向けた取り組み
  - CF Foundation DNS 公開
  - CF Gartner Magic Quadrant
  - Fastly BoringSSL 移行
  - Fastly Neverbleed 導入
- セキュリティ動向
  - xz バックドア
  - GitHub 経由でマルウェア
- 周辺動向
  - Wolvic Chromium backend beta
- Cookie 動向
  - 3PCD 延期
