---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep99.mp3
published_at: 2022-07-31
guest: [@myakura](https://twitter.com/myakura)
---

# ep99 Monthly Web 202207

## Theme

第 99 回のテーマは 2022 年 7 月の Monthly Web です。

## Show Note

### ep100 オフラインイベント

- ep100 オフラインイベントは中止
- オンライン開催はしない
- 延期もしくは 2024 年 3 月 に 10 周年イベントとか

### Chrome 動向

#### Stable: 103

#### Updates

- What's New In DevTools (Chrome 104)
  - https://developer.chrome.com/en/blog/new-in-devtools-104/

#### Intents

- Ship: Expose TransformStreamDefaultController
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/I3ANo1F_NkM/m/ZSA9Qwk-AgAJ
- **Ship: `fetch()` upload streaming**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zwKGB0_ksQU/m/mtVsZDH1AwAJ
- **Ship: CSS Overflow for replaced elements**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MuTeW_AFgxA/m/boPlODonAwAJ
- Ship: Add onbeforeinput global event handler content attribute
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hOhg-Rw6qww/m/LCJ9CzXiAgAJ
- Ship: MSE in Workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FRY3F1v6Two
- Ship: Intl.NumberFormat v3 API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mN6o7uk2hjM
- Ship: `navigateEvent.scroll()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DKeklNbLG5s
- Prototype: Align async API read/write HTML format with DataTransfer API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/j9fDbU9E2Ds/m/bYquF9mdAAAJ
- **Prototype: COOP: restrict-properties**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/27CzR01sZYI/m/eoefKZNWBAAJ
- Prototype: ContentVisibilityAutoStateChanged event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MtgwTiMvXGc/m/1t4_G4cTBAAJ
- Prototype: Custom highlight API pointer events
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_jX8ZP35OAg
- Prototype: HTTP response status code in Resource Timing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/G6A18jiwbzE
- Prototype: Borderless Mode for Installed Desktop Web Apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0WFHeazngK8
- Prototype: URLPattern ignoreCase
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hNUoDg94-_8
- Experiment: Increased max nesting level for `setTimeout(0)`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TUE7eeY2gdg/m/EVniN4pCBgAJ
- Experiment: Anonymous iframes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-7H19EHTenU
- Experiment: COOP: restrict-properties
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JrMX5H2PX_o/m/JipeWijACAAJ
- **Extend experiment: Privacy Sandbox Ads APIs**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SD8Ot2gpz4g
- Extend Experiment: Dark mode support for web apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/2c8msRrrcF0
- Extend Origin Trial: WebGPU
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gBMsYQ1Aurw
- **Deprecate and Remove: Expect-CT**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bGLVLwSKNJY/m/nbg4hWckAwAJ
- Deprecate and Remove: CSS default keyword is disallowed in custom identifiers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/o89R2kMX-yI/m/xh_omNilBgAJ
- Deprecate and Remove: `navigateEvent.restoreScroll()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/biFaQ7PkFtU
- Extend Deprecation Trial: Restrict "private network requests" for subresources from public websites to secure contexts.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PCfDnIV1cOw
- Remove: window.webkitStorageInfo
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HPuDXPKwW_s
- PSA: Upcoming chromestatus.com home page change
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aPeytth3nSQ
- PSA: FileSystemReadWriteOptions to become optional on Access Handles
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BboiMXq2-xg
- PSA: Multi-Screen Window Placement implementation change (Accurate Screen Labels)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/44EYjwSZrjQ
- PSA: FileSystemReadWriteOptions to become optional on Access Handles
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BboiMXq2-xg
- **Upcoming chromestatus.com edit permissions change**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eVVBa8It2dA
- Inactive OWNERS cleanup
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-xIo9nN7F7Q
- Save the date for BlinkOn 17!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/16LQXKmAD4s

#### V8

#### Other

- web.dev
  - How the BBC is rolling out HSTS for better security and performance.
    - https://web.dev/bbc-hsts/
  - **New to the web platform in July**
    - https://web.dev/web-platform-07-2022/
  - New patterns
    - https://web.dev/new-patterns-july-2022/
- google developer blog
  - https://developers.googleblog.com/
- google developer japan blog
  - Google Developers Japan: Chrome 104 ベータ版: メディアクエリの新構文、リージョン キャプチャなど
    - https://developers-jp.googleblog.com/2022/07/chrome-104.html
  - Google Developers Japan: Maps JavaScript API のユーザー補助機能に関する最新情報
    - https://developers-jp.googleblog.com/2022/07/maps-javascript-api.html
- chrome developer blog
- DevTools Tips: How to log messages in the Console
  - https://developer.chrome.com/en/blog/devtools-tips-11/
- Revamping Analytics in the Chrome Web Store Developer Dashboard
  - https://developer.chrome.com/en/blog/cws-analytics-revamp/
- **Expanding Privacy Sandbox testing**
  - https://developer.chrome.com/en/blog/expanding-privacy-sandbox-testing/
- **Help pick a syntax for CSS nesting**
  - https://developer.chrome.com/en/blog/help-css-nesting/
  - CSS nesting の syntax をどうするか議論中でアンケート
  - 1: `&` でネストし、曖昧さが生まれる場合はさらに `@nest` を付ける
  - 2: 常に `@nest` と `&` を付ける
  - 3: ブラケットを付けてネストし、必要な場合は `&` を使う
- Top layer support in Chrome DevTools
  - https://developer.chrome.com/en/blog/top-layer-devtools/
- An Update On Chrome's Web Framework Funding for 2022
  - https://developer.chrome.com/en/blog/framework-fund-2022/
- DevTools Tips: How to emulate CSS user preference media features with DevTools
  - https://developer.chrome.com/en/blog/devtools-tips-10/
- Chrome Dev Insider: The CSS and UI edition
  - https://developer.chrome.com/en/blog/insider-july-2022/
- **Progress in the Privacy Sandbox (May - June 2022)**
  - https://developer.chrome.com/en/blog/progress-in-the-privacy-sandbox-2022-06/
- Signed Exchanges launched for desktop sites
  - https://developer.chrome.com/en/blog/sxg-desktop/
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- **Google Online Security Blog: DNS-over-HTTP/3 in Android**
  - https://security.googleblog.com/2022/07/dns-over-http3-in-android.html
- Expanding testing for the Privacy Sandbox for the Web
  - https://blog.google/products/chrome/update-testing-privacy-sandbox-web/
- **Google Japan Blog: ウェブ向けプライバシー サンドボックスのテスト期間延長について**
  - https://japan.googleblog.com/2022/07/blog-post.html
  - トライアルのフィードバックを元にスケジュールの変更
  - API 実装が 2023 Q3 、 3P Cookie 廃止が late 2024 に 1 年延期
  - 2021/6 にも API 実装が late 2022 、 3P Cookie 廃止を late 2023 に延期していた
- **Proposing changes to First-Party Sets based on community feedback · Issue #92 · WICG/first-party-sets**
  - https://github.com/WICG/first-party-sets/issues/92
    - 「セット」をカテゴリごとのサブセットで考える
    - Storage Access API を使う
    - SameParty 属性を廃止
  - CHIPS にも影響するが、現在検討中なのでそちらは案がまとまったら共有する

### Firefox 動向

#### Stable: 103

- **Firefox 103.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/103.0/releasenotes/
    - > Removed a configuration option to allow SHA-1 signatures in certificates
    - > Your information now has increased protection from online tracking via Total Cookie Protection enabled by default. All third-party cookies are now isolated into partitioned storage.
- **Firefox 103 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/103
    - `backdrop-filter` プロパティ
    - `scroll-snap-stop` プロパティ
    - `:modal` 擬似クラス
    - Transferable streams
    - Cache API が Secure Context に

#### Updates

#### Intents

- Ship: OffscreenCanvas
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/isRigZXSPZM
- Prototype & ship: Canvas2d.fontKerning attribute
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/HBgxBzZAL20
- Prototype & Ship: The Content-Security-Policy script-src-elem and script-src-attr directives
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/LlxUr3vIBWc
- Prototype: width and height attributes on `<source>` elements
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/V0nhaTr86LA
- **Prototype: animation-composition property**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/s0_mISL9ac8
- Engineering Effectiveness Newsletter (June 2022 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/H389vt45F0Y

#### Other

- **ESMification Prep: What is JSM?**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Dr2OVHL2ZSk
- **ESMification Prep 2: What is an ESM?**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/6ahIMBNIamo
- **ESMification Prep 3: Dive into example migrations**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/hSQXSb_n-9U
- These Weeks In Firefox: Issue 120 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/07/18/these-weeks-in-firefox-issue-120/
- These Weeks In Firefox: Issue 121 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/07/28/these-weeks-in-firefox-issue-121/
- **Understanding Apple's Private Click Measurement**
  - https://blog.mozilla.org/en/mozilla/understanding-apples-private-click-measurement/
  - Martin Thomson による PCM の評価
  - > Overall, the design choices in PCM that aim to safeguard privacy provide insufficient privacy protections, but they appear to make the API less useful for measurement.
- **Facebook が URL の形式を変更。一部ブラウザーが実装したパラメーター削除機能への対策か【やじうま Watch 】 - INTERNET Watch**
  - https://internet.watch.impress.co.jp/docs/yajiuma/1426324.html

### Safari 動向

#### Stable: 15.6

#### Updates

- **New WebKit Features in Safari 15.6**
  - https://webkit.org/blog/13009/new-webkit-features-in-safari-15-6/
    - Newly defined in CSS Selectors level 4, the :modal pseudo-class can be used to select dialog elements opened with the showModal() API.
    - Fixed `<link rel=preconnect>` to respect crossorigin=anonymous and prevent sending credentials to different-origin links
- **Release Notes for Safari Technology Preview 149**
  - https://webkit.org/blog/12998/release-notes-for-safari-technology-preview-149/
  - Web Inspector
    - Added support for forcing pseudo-class :focus-visible, :focus-within, and :target (251656@main, 251628@main)
  - Media
    - Added support for AVIF images on macOS Ventura and iOS 16 (251850@main)
    - Added support for emitting a resize event from PiP window (251512@main)
  - CSS
    - Implemented the text-align-last property (251540@main)
  - CSS Container Queries
  - Rendering
  - JavaScript
  - Screen Sharing
  - Web Animations
    - Added support for custom properties in @keyframes rules (251733@main)
  - WebAuthn
  - Navigation Preload
  - Web API
    - Added support for waiting for event in custom element (251718@main)
  - Security
- **Release Notes for Safari Technology Preview 150**
  - https://webkit.org/blog/13066/release-notes-for-safari-technology-preview-150/
  - Web Inspector
  - CSS
  - Shadow DOM
  - JavaScript
  - Web Animations
    - Added support for custom properties in Animation.commitStyles() (251858@main)
    - Added support for custom properties in JavaScript-originated animations (251856@main)
  - Web Share
  - WebAuthn
    - Added getPublicKey and getPublicKeyAlgorithm methods to AuthenticatorAttestationResponse (251844@main)
    - Added support for authenticators over CCID (252425@main)
  - Web API
    - Fixed an issue where SameSite=Lax cookies were sometimes not sent on link navigations (252341@main)
  - Rendering
  - Accessibility
- Understanding GC in JSC From Scratch
  - https://webkit.org/blog/12967/understanding-gc-in-jsc-from-scratch/

#### Other

- **Apple - Anne's Blog**
  - https://annevankesteren.nl/2022/07/apple
  - Anne が Mozilla から Apple へ
- **Apple expands commitment to protect users from mercenary spyware - Apple**
  - https://www.apple.com/newsroom/2022/07/apple-expands-commitment-to-protect-users-from-mercenary-spyware/
  - Apple が OS に Lockdown Mode を導入する
  - Pegasus など要人や人権活動家のスマートフォンに仕込まれたスパイウェアから守る
  - 有効にすると JIT コンパイラが動かなくなるなどの制限はかかる

### Edge 動向

#### Stable: 103

#### Updates

#### Chakra

#### Other

- **Disk caching in Microsoft Edge**
  - https://blogs.windows.com/msedgedev/2022/07/27/disk-caching-in-microsoft-edge/
  - Edge のディスクキャッシュを自動的に圧縮して容量を減らすように
- New Recipes for 3rd Party Cookies - text/plain
  - https://textslashplain.com/2022/07/27/new-recipes-for-cookies/
- **My Next Opportunity - text/plain**
  - https://textslashplain.com/2022/07/22/iwebbrowser3beforenavigate/
- Edge URL Schemes - text/plain
  - https://textslashplain.com/2022/07/18/edge-url-schemes/

### WHATWG/W3C 動向

#### Draft

- Recommendation
  - **Decentralized Identifiers (DIDs) v1.0**
    - https://www.w3.org/TR/did-core/
    - Google と Mozilla から Formal Objection が出ていたが勧告された
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
- Chartering

#### Other

- **W3C offers an Inclusion Fund and Fellowships for TPAC 2022**
  - https://www.w3.org/blog/news/archives/9613
- **W3C calls for nominations in the election for the Board of Directors of W3C, Inc.**
  - https://www.w3.org/blog/news/archives/9631
- W3C Board of Directors Job Description
  - https://www.w3.org/2022/07/w3c-board-of-directors-job-description.html
- Nominations and statements for the election for the Board of Directors of W3C, Incorporated
  - https://www.w3.org/2022/08/bod-nominations.html

### TC39 動向

#### Meeting

- **2021-06**
  - https://github.com/tc39/agendas/blob/main/2022/06.md
  - https://github.com/tc39/notes/tree/main/meetings/2022-06

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2022-07-01}...main@{2022-08-01}
- https://tc39.github.io/beta/
- 0->1
  - Symbol Predicates
  - Policy Maps and Sets
  - Function Memoization
  - Object pick/omit
- 1->2
  - Import Reflection
- 2->3
  - Duplicate named capturing group
  - JSON.parse source text access
- 3->4
  - Hashbang Grammar

#### New Proposals

- wmsbill/proposal-catch-guards
  - https://github.com/wmsbill/proposal-catch-guards
  - catch で捉える例外をパターンマッチする
- tc39/proposal-symbol-predicates
  - https://github.com/tc39/proposal-symbol-predicates
  - isRegistered / isWellKnown などを symbol に生やす
  - weak map の key に使える symbol の判定が目的
- tc39/proposal-policy-map-set
  - https://github.com/tc39/proposal-policy-map-set
  - Map/Set にメモリ使用量制限をつける
- tc39/proposal-function-memo
  - https://github.com/tc39/proposal-function-memo
  - 関数メモ化
- tc39/proposal-object-pick-or-omit
  - https://github.com/tc39/proposal-object-pick-or-omit
  - オブジェクトの特定プロパティだけを残したり消したり

#### Other

### IETF 動向

#### WG

- IETF
  - IETF 114 Philadelphia
    - https://datatracker.ietf.org/meeting/114/materials
    - 来月 minutes が出揃ったら
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - METADATA frames for HTTP/2 and HTTP/3
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JulSep/0032.html
  - I-D Action: draft-ietf-httpbis-message-signatures-11.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JulSep/0030.html
  - I-D Action: draft-ietf-httpbis-safe-method-w-body-03.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JulSep/0006.html
  - draft-schinazi-httpbis-transport-auth at IETF 114
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JulSep/0029.html
  - Protocol Action: 'Binary Representation of HTTP Messages' to Proposed Standard (draft-ietf-httpbis-binary-message-06.txt)
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JulSep/0028.html
  - Update on geo-hint header
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JulSep/0015.html
  - HTTP Working Group Materials - IETF114
    - https://httpwg.org/wg-materials/ietf114/
  - **RFC 9264: Linkset: Media Types and a Link Relation Type for Link Sets**
    - https://www.rfc-editor.org/rfc/rfc9264.html
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

- IETF | IETF 116 Yokohama
  - https://www.ietf.org/how/meetings/116/
  - 2022 年 3 月が横浜開催

### CDN 動向

#### Cloudflare

- Speed & Reliability
- Security
  - 2022 年第 2 四半期における DDoS 攻撃の傾向
    - https://blog.cloudflare.com/ja-jp/ddos-attack-trends-for-2022-q2-ja-jp/
- Developers
  - **Announcing support for WASI on Cloudflare Workers**
    - https://blog.cloudflare.com/announcing-wasi-on-workers/
- Deep Dive
  - **When the window is not fully open, your TCP stack is doing more than you think**
    - https://blog.cloudflare.com/when-the-window-is-not-fully-open-your-tcp-stack-is-doing-more-than-you-think/
  - **NIST's pleasant post-quantum surprise**
    - https://blog.cloudflare.com/nist-post-quantum-surprise/

#### Fastly

- **The state of TLS fingerprinting: What's Working, What Isn't, and What's Next | Fastly**
  - https://www.fastly.com/blog/the-state-of-tls-fingerprinting-whats-working-what-isnt-and-whats-next

#### Other

### セキュリティ動向

- **NIST Announces First Four Quantum-Resistant Cryptographic Algorithms | NIST**
  - https://www.nist.gov/news-events/news/2022/07/nist-announces-first-four-quantum-resistant-cryptographic-algorithms

### 周辺動向

- **Wolvic 1.0 | Igalia**
  - https://www.igalia.com/2022/07/08/Wolvic-1.0.html
- Igalia in the News | Igalia
  - https://www.igalia.com/2022/07/29/Igalia-in-the-News.html
- **Igalia: the Open Source Powerhouse You've Never Heard of - The New Stack**
  - https://thenewstack.io/igalia-the-open-source-powerhouse-youve-never-heard-of/
  - 謎のオープンソース企業 Igalia について中の人や Bloomberg の人にインタビュー
- **Some highlights of the Web Engines Hackfest 2022 - Rego's Everyday Life**
  - https://blogs.igalia.com/mrego/2022/07/20/some-highlights-of-the-web-engines-hackfest-2022/
- **ImperialViolet - Passkeys**
  - https://www.imperialviolet.org/2022/07/04/passkeys.html
- **Help design the State of CSS Survey 2022! - Lea Verou**
  - https://lea.verou.me/2022/07/help-design-the-state-of-css-survey-2022/
  - Google の UI fund を得て Lea Verou が State of CSS 2022 の設計に協力
  - 8 月 20 日までに GitHub でフィードバックを集めている
    - https://github.com/Devographics/Surveys/issues
  - ブラウザ開発者が見ているのでみんな参加して
- The History of JavaScript - DEV Community
  - https://dev.to/iarchitsharma/the-history-of-javascript-5e98
- **Apple, Google, Facebook's AV1 standards group under antitrust investigation in EU**
  - https://appleinsider.com/articles/22/07/07/apple-google-facebooks-av1-standards-group-under-antitrust-investigation-in-eu/amp/
- **書籍「いちばんやさしい Web3 の教本 人気講師が教える NFT 、 DAO 、 DeFi が織りなす新世界」の回収について - インプレスブックス**
  - https://book.impress.co.jp/info/20220725.html

### イベント

- 8 月
- 9 月
  - 12-16: TPAC 2022 Vancouver
    - https://www.w3.org/wiki/TPAC/2022
- 10 月
- 11 月
  - 15-17: BlinkOn17
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/16LQXKmAD4s

### Wrap Up

- Chrome
  - Ship
    - fetch() upload streaming
  - Prototype
    - COOP restrict-properties
  - Deprecate and Remove
    - Expect-CT
  - Chrome Developers
    - Privacy Sandbox 延期
    - CSS Nesting syntax poll
  - other blogs
    - DoH3 in Android
  - other
    - proposing changes to First-Party Sets
- Firefox
  - 103
    - Cookie partitioning by default
    - `backdrop-filter`
    - `scroll-snap-stop`
    - `:modal`
  - Ship
    - OffscreenCanvas
  - Prototype
    - `animation-composition`
  - other
    - Martin on Private Click Measurement
- Safari
  - 15.6
    - `:modal`
  - TP 149
    - AVIF
  - TP 150
  - blog
    - understanding GC
  - other
    - Anne to Apple
    - Lockdown Mode で JIT が無効化
- Edge
  - ディスクキャッシュの圧縮
  - ericlaw Edge チームを離れる
- W3C/WHATWG
  - Spec
    - DID 1.0 勧告
  - other
    - W3C, Inc. Board of Directors
- TC39
  - proposal-catch-guards: catch で捉える例外をパターンマッチする
  - proposal-symbol-predicates: isRegistered / isWellKnown などを symbol に生やす
  - proposal-policy-map-set: Map/Set にメモリ使用量制限をつける
  - proposal-function-memo: 関数メモ化
  - proposal-object-pick-or-omit: オブジェクトのサブセットを作る
- IETF
  - IETF 114 Philadelphia
  - RFC 9264: Linkset: Media Types and a Link Relation Type for Link Sets
- CDN 動向
- Cloudflare Workers WASI サポート
- Fastly The state of TLS fingerprinting
- セキュリティ動向
  - NIST から対量子暗号ガイドのアナウンス
- 周辺動向
  - Wolvic 1.0
  - 謎のオープンソース企業 Igalia について中の人や Bloomberg の人にインタビュー
  - ImperialViolet - Passkeys
  - State of CSS Survey 2022 のフィードバック募集
  - AV1 に対して EU の公正取引調査
  - 「いちばんやさしい Web3 の教本」回収
