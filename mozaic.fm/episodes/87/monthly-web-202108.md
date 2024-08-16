---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep87.mp3
published_at: 2021-08-23
guest: [@myakura](https://twitter.com/myakura)
---

# ep87 Monthly Web 202108

## Theme

第 87 回のテーマは 2021 年 8 月の Monthly Web です。

## Show Note

### Chrome 動向

#### Stable: 92

#### Updates

- **Deprecations and removals in Chrome 91 - Chrome Developers**
  - https://developer.chrome.com/blog/deps-rems-91/
  - Remove `alert()`, `confirm()`, and `prompt()` for cross origin iframes
- **Deprecations and removals in Chrome 92 - Chrome Developers**
  - https://developer.chrome.com/en/blog/deps-rems-92/
- **Deprecations and removals in Chrome 93 - Chrome Developers**
  - https://developer.chrome.com/en/blog/deps-rems-93/
  - Block ports 989 and 990
  - Remove 3DES in TLS
  - WebAssembly cross-origin module sharing
    - same-site も cross-origin として扱うように

#### Intents

- Ship: Extend Intl.DateTimeFormat timeZoneName Option
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-6bANPdHR7c
- Ship: Intl.DisplayNames v2
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uld_YkbzL0Q
- Ship: Clipboard: Preserve PNG metadata
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iFEftDdghiU
- Ship: JS Self-Profiling API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7K7Qt7aRJ8s
- Ship: Media Queries: prefers-contrast feature
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Hy6ngo_cSgU
- Ship: WebCodecs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7UlTzFMbTFs
- Ship: Remove clamping of `setTimeout(..., 0)`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HKPTp7C1LwY
  - `setTimeout(..., 0)` が 1ms に固定されていた歴史的理由の実装を削除
- **Ship: EyeDropper API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rdniQ0D5UfY
  - スポイトツールを表示できる API
  - 結果を sRGBHex で取得し `input[type=color].value` に入れられる
- Ship: Custom Highlight API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Q21BQb-zV0w
  - JS で text の range を作り、そこをハイライトさせる API
- Ship: PermissionStatus.prototype.name
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LPvBoisFnAA
- Ship: Back-forward cache for desktop
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RwWG-z4i_PU
- Ship: Remove font-family `-webkit-<generic-name>`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/npks-SO2n0A
- Implement and Ship: :autofill pseudo-class
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/saobtpGibyA
- **Implement and Ship: Logical properties for contain-intrinsic-size**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gBka8QBN1ac
- Prototype: Intl Enumeration API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Txtf_rSqGH8
- Prototype: Gamepad Button and Axis Events
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VOM5imqAPlU
- **Prototype: Standardize existing client hint naming**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wTGpTPtAJGM
  - 既に実装されている client hints に全部 `sec-ch-` をつける
  - https://wicg.github.io/client-hints-infrastructure/
  - https://wicg.github.io/responsive-image-client-hints/
  - https://wicg.github.io/savedata/#save-data-request-header-field
  - https://wicg.github.io/netinfo/#networkinformation-interface
- Prototype: Web app launch handler
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8tNe2jrJ78A
- Prototype: Origin Private File System extension: AccessHandle
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/33T36N6VBKI
- **Prototype: Deprecate support for URLs with non-IPv4 hostnames ending in numbers**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7QN5nxjwIfM
  - `http://foo.127.1/` は PSL 的には `127.1` が Host となる
  - `http://127.1` は URL の仕様的に `http://127.0.0.1` となる
  - これが問題になり得るので、数字で終わるホスト名を落としたいという話
  - https://github.com/whatwg/url/pull/619
  - mozilla も supportive っぽい
- Prototype: The "math" generic font family
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CnQuMzqabqE
- Prototype: Deprecated and remove font-family: `-webkit-pictograph`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TVRkV9XrFGo
- **Prototype: CSS cascade layers**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/chiJ2GIECPc
  - CSS の優先順位を制御する Layer の実装
  - Specificity よりも優先される Layer 同士の優先度も制御しやすい
  - 他ブラウザの反応はなし
- Experiment: Same-origin prerendering triggered by the speculation rules API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3JwGNnqH3QI
- Experiment: Capability Delegation with Payment Request
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/i6pAWsjU7zg
- Extend Experiment: Capture Handle
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eJPOkBGriZc
- Ready for Trial: Origin Private File System extension: AccessHandle
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_nB5VfgXW_I
- Ready for Trial: Intl Enumeration API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IaTkvH_9DAY
- Extend Origin Trial: Subresource loading with Web Bundles
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BoHqrhb3Ba0
- Change:
- Unship:
- Deprecate and Remove: RTCConfiguration.offerExtmapAllowMixed
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Plik-x6biZ0
- Deprecate: Human-readable names for Bluetooth assigned numbers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ibDHfEYWOCk
- Remove: `-internal-autofill-previewed` and `-internal-autofill-selected`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rCq-89BfJs0

#### V8

- **V8 release v9.3 · V8**
  - https://v8.dev/blog/v8-release-93
  - Sparkplug batch compilation
  - Object.hasOwn
  - Error cause
  - Untrusted code mitigations disabled on Android
  - V8 API

#### Other

- web.dev
  - **2021 Scroll Survey Report**
    - https://web.dev/2021-scroll-survey-report/
    - 45% が scroll の開発に不満をもっている
    - 43% は scroll の開発が難しいと思っている
    - それらをうけて compatibility の向上を進めていく
  - **User preference media features client hints headers**
    - https://web.dev/user-preference-media-features-headers/
    - みんな Prefer Color Scheme の話しかしてないけど他にもあるよ
    - `Sec-CH-Prefers-Reduced-Motion`
    - `Sec-CH-Prefers-Reduced-Transparency`
    - `Sec-CH-Prefers-Contrast`
    - `Sec-CH-Forced-Colors`
    - `Sec-CH-Prefers-Color-Scheme`
    - `Sec-CH-Prefers-Reduced-Data`
  - A performance-focused workflow based on Google tools
    - https://web.dev/vitals-tools-workflow/
  - **Building a switch component**
    - https://web.dev/building-a-switch-component/
    - スイッチコントロールを時前実装する話
    - https://github.com/whatwg/html/issues/4180
    - Google はこれを標準化しようとしてたがあきらめている
    - 理由は書かれてない
  - **CSS accent-color**
    - https://web.dev/accent-color/
    - form controller のスタイルのためにスタイルリセットがよくされる
    - 逆に a11y 的に悪い場合が多い
    - アクセントカラーを別途定義して UA がコントローラに反映させる
  - Why lab and field data can be different (and what to do about it)
    - https://web.dev/lab-and-field-data-differences/
  - Using CSS Module Scripts to import stylesheets
    - https://web.dev/css-module-scripts/
    - Import Assertion で使える話
    - `@import` とのインテグレーションはまだな話
- google developer blog
  - https://developers.googleblog.com/
- google developer japan blog
  - Google Developers Japan: Chrome 92 でのフィッシング検知の高速化と効率化
    - https://developers-jp.googleblog.com/2021/08/chrome-92.html
- chrome developer blog
  - **Automatically start PWAs on OS Login - Chrome Developers**
    - https://developer.chrome.com/en/blog/run-on-login/
    - 右クリックから設定できるように
  - Smooth and simple page transitions with the shared element transition API - Chrome Developers
    - https://developer.chrome.com/en/blog/shared-element-transitions-for-spas/
  - CSS Grid tooling in DevTools - Chrome Developers
    - https://developer.chrome.com/en/blog/css-grid-tooling/
  - Troubleshooting Chrome's origin trials - Chrome Developers
    - https://developer.chrome.com/en/blog/origin-trial-troubleshooting/
- **An update on how AMP is served at the OpenJS Foundation - The AMP Blog**
  - https://blog.amp.dev/2021/08/16/an-update-on-how-amp-is-served-at-the-openjs-foundation/
- ss2021 - 日本ソフトウェア科学会 プログラミング論研究会 (JSSST-SIGPPL)
  - http://ppl.jssst.or.jp/index.php?ss2021
  - PPL サマースクール 2021 「JavaScript 処理系と Chrome ブラウザの実装技術」

### Firefox 動向

#### Stable: 91.0.1

#### Updates

- **Hopping on Firefox 91 - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2021/08/hopping-on-firefox-91/
  - Visual Viewport API
  - New formats for Intl.DateTimeFormat
  - Securing the Gamepad API
- **Firefox 91 Introduces Enhanced Cookie Clearing**
  - https://blog.mozilla.org/security/2021/08/10/firefox-91-introduces-enhanced-cookie-clearing/
  - 分割した Cookie Jar によってトラッキングを防ぐ仕組みを強化
  - 履歴を消す際にファーストパーティの Cookie だけではなく、サードパーティの Cookie も削除する
- **Firefox 91 introduces HTTPS by Default in Private Browsing**
  - https://blog.mozilla.org/security/2021/08/10/firefox-91-introduces-https-by-default-in-private-browsing/
  - 91 からプライベートモードではデフォルトで HTTPS アクセスをする
- These Weeks in Firefox: Issue 97 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2021/08/11/these-weeks-in-firefox-issue-97/
- These Weeks in Firefox: Issue 98 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2021/08/13/these-weeks-in-firefox-issue-98/
- **Security Vulnerabilities fixed in Firefox 91.0.1 and Thunderbird 91.0.1**
  - https://www.mozilla.org/en-US/security/advisories/mfsa2021-37/
  - Firefox 91.0.1 で入ったセキュリティ修正
  - HTTP/3 でヘッダ内の改行がヘッダを分割してしまうバグがあった

#### Intents

- Ship: Custom Elements disabledFeatures
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/w-WMJNSffxQ
- Ship: break-inside: avoid-{page,column}
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Yfqi29gUX1U
- **Ship: Class Static Initialization Blocks**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/x9u_E20XdV0
- **Prototype and ship: font-family: system-ui**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/pQAJ1UZkKCc
- **Prototype and ship: `self.reportError()`**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Xh4g1UmOkmE
- Prototype and ship: ElementInternals.shadowRoot
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Y_Ms3o_Alag
- Prototype: Disallow relaxing referrer policy for cross-site requests
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/yGbc5I4wd6U
- **Prototype: Web Locks**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/qprlUIF0H48
  - https://wicg.github.io/web-locks/
- Experiment:
- Change:
- Unship: KeyboardEvent.initKeyEvent
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/NL-dqM621JM

#### Other

- An update from Firefox
  - https://blog.mozilla.org/en/products/firefox/an-update-from-firefox/
- Why Facebook's claims about the Ad Observer are wrong
  - https://blog.mozilla.org/en/mozilla/news/why-facebooks-claims-about-the-ad-observer-are-wrong/
- **Privacy analysis of SWAN.community and United ID 2.0**
  - https://blog.mozilla.org/en/mozilla/swan-uid2-privacy/
- **Firefox Security Newsletter/FSN-2021-Q2 - MozillaWiki**
  - https://wiki.mozilla.org/Firefox_Security_Newsletter/FSN-2021-Q2
- How MDN's autocomplete search works - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2021/08/mdns-autocomplete-search/
- **Spring cleaning MDN: Part 2 - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2021/08/spring-cleaning-mdn-part-2/

### Safari 動向

#### Stable: 14.1.2

#### Updates

- **Release Notes for Safari Technology Preview 129**
  - https://webkit.org/blog/11951/release-notes-for-safari-technology-preview-129/
  - Note: On macOS Big Sur, this release requires enabling GPU Process: Media option from Experimental Features under the Develop menu to address issues with streaming services.
  - Added contextual documentation for CSS properties (r279510)
  - Changed the sidebar panel and navigation bar to layout asynchronously during resize (r279790)
  - Added support for rendering `<model>` resources (r279451)
  - Added support for (ref null? $t) type constructor (r279265)
  - **Added support for Elliptic Curve P-521 (r279688)**
- **Release Notes for Safari Technology Preview 130**
  - https://webkit.org/blog/11958/release-notes-for-safari-technology-preview-130/
  - **Implemented Array.prototype.findLast and Array.prototype.findLastIndex behind a runtime flag (`--useArrayFindLastMethod`) (r279937)**
  - Added support for MediaError.message (r279978)
  - **Added webm/opus container support for Web Audio (r280416)**
  - Implemented SubmitEvent interface (r279979)
  - Implemented IDBTransaction.commit() (r280053)
  - Implemented IDBTransaction.durability (r280415)
- iCloud Private Relay に向けたネットワークの準備 - サポート - Apple Developer
  - https://developer.apple.com/jp/support/prepare-your-network-for-icloud-private-relay/
  - Egress IP のリストが公開されている
- **iOS & iPadOS 15 Beta 6 Release Notes | Apple Developer Documentation**
  - https://developer.apple.com/documentation/ios-ipados-release-notes/ios-ipados-15-beta-release-notes
  - New Features in iOS & iPadOS 15 beta 6
  - > The bottom tab bar has been redesigned to appear below page content. An option to show the address bar at the top is also available. (81118141)

#### Position

- Request for position: supports(`<font-technology>`) extended syntax for @font-face
  - https://lists.webkit.org/pipermail/webkit-dev/2021-August/031937.html
  - positive
- Request for position: CSS @font-face descriptor advance-override
  - https://lists.webkit.org/pipermail/webkit-dev/2021-August/031936.html
  - positive

#### Other

- 2021 WebKit Contributors Meeting - Save the Date (9/27, 28)
  - https://lists.webkit.org/pipermail/webkit-dev/2021-August/031933.html

### Edge 動向

#### Stable: 92

#### Updates

#### Chakra

#### Other

- **Super Duper Secure Mode | Microsoft Browser Vulnerability Research**
  - https://microsoftedge.github.io/edgevr/posts/Super-Duper-Secure-Mode/
- **Compat2021: Improving CSS Grid compatibility with GridNG - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2021/08/10/compat2021-css-grid-gridng/
- Enhancing Inking on the Web
  - https://blogs.windows.com/msedgedev/2021/08/18/enhancing-inking-on-the-web/
- CSS module scripts: `import` stylesheets like JavaScript modules
  - https://blogs.windows.com/msedgedev/2021/08/17/css-module-scripts-import-stylesheets-like-javascript-modules/

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
  - Call for Review: DOM Review Draft 15 June 2020 is a W3C Proposed Recommendation
    - https://www.w3.org/blog/news/archives/9191
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - First Public Working Draft: MathML Core
    - https://www.w3.org/blog/news/archives/9185
- Chartering
  - Call for Participation: Browser Testing and Tools Working Group Charter Approved; Join BTT WG
    - https://lists.w3.org/Archives/Public/public-new-work/2021Aug/0003.html
  - Cognitive Accessibility Community Group created
    - https://lists.w3.org/Archives/Public/public-new-work/2021Aug/0002.html
  - Proposed W3C Charters: Internationalization Working Group and Interest Group
    - https://lists.w3.org/Archives/Public/public-new-work/2021Aug/0000.html
  - Proposed W3C Charter: Web Applications Working Group
    - https://lists.w3.org/Archives/Public/public-new-work/2021Aug/0007.html
  - [wbs] response to 'Call for Review: Proposed W3C Process Document'
    - https://lists.w3.org/Archives/Public/public-new-work/2021Aug/0005.html
  - Call for Participation: Accessible Platform Architectures Working Group Charter Approved; Join APA WG
    - https://lists.w3.org/Archives/Public/public-new-work/2021Aug/0004.html

#### Other

### TC39 動向

#### Meeting

- 2021-07
  - https://github.com/tc39/agendas/blob/master/2021/07.md
  - https://github.com/tc39/notes/tree/master/meetings/2021-07

#### Proposals Diff

- https://github.com/tc39/proposals/compare/master@{2021-08-01}...master@{2021-09-01}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->3
- 3->4

#### New Proposals

#### Other

- JavaScript needs more helper functions for iteration (map, filter, etc.)
  - https://2ality.com/2021/08/iteration-helpers.html

### IETF 動向

#### WG

- **IETF111 Online**
  - https://www.ietf.org/how/meetings/111/
  - https://datatracker.ietf.org/meeting/
  - https://www.youtube.com/playlist?list=PLC86T-6ZTP5ik187oPfRrOUaMw1AuLLi6
- httpwg
  - IETF でのセッションは無し
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - Binary Messages
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0182.html
  - Roman Danyliw's No Objection on draft-ietf-httpbis-cache-header-09: (with COMMENT)
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0181.html
  - Artart telechat review of draft-ietf-httpbis-cache-header-09
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0177.html
  - PoW (Re: Attack research on HTTP/2 implementations)
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0171.html
  - Extended CONNECT, Capsules in DATA, HTTP Upgrade Tokens
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0169.html
  - Benjamin Kaduk's No Objection on draft-ietf-httpbis-cache-header-09: (with COMMENT)
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0168.html
  - Ddos prevention for ssl
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0163.html
  - Signature Negotiation
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0159.html
  - Attack research on HTTP/2 implementations
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0146.html
  - Negotiating Window Limits for Content Encodings
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0137.html
  - Tsvart last call review of draft-ietf-httpbis-proxy-status-05
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0135.html
  - I-D Action: draft-ietf-httpbis-bcp56bis-13.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0134.html
  - **Revised HTTP core specifications submitted (drafts 18)**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0241.html
    - semantics, cache, messaging が 18 になって IESG のレビューをカバーした
  - **IETF Last Call for HTTP 'core' documents**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0252.html
    - -18 をもって 2 週間後にもう一度 IETF Last Call
  - Protocol Action: 'The Cache-Status HTTP Response Header Field' to Proposed Standard
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0242.html
  - **Interim meeting -- planning**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0230.html
    - 9 月の終わりに interim を実施し IETF 中はやらない
  - I-D Action: draft-ietf-httpbis-proxy-status-06.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0218.html
  - I-D Action: draft-ietf-httpbis-message-signatures-06.txt
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2021JulSep/0195.html
- **quicwg**
  - https://mailarchive.ietf.org/arch/browse/quic/
  - https://github.com/quicwg/wg-materials
  - agenda
    - https://github.com/quicwg/wg-materials/blob/main/ietf111/agenda.md
  - minutes
    - https://github.com/quicwg/wg-materials/blob/main/ietf111/minutes.md
  - slides
    - https://github.com/quicwg/wg-materials/blob/main/ietf111/ops-drafts.pdf
      - AMP に使える送信元ポートを使わないように閉じる議論
      - 仕様に書くのではなく IANA に登録しよう
    - https://github.com/quicwg/wg-materials/blob/main/ietf111/datagram.pdf
      - -03 で実装が多くありデプロイも進んでる
      - -04 にして WGLC できそう
    - https://github.com/quicwg/wg-materials/blob/main/ietf111/qlog.pdf
    - https://github.com/quicwg/wg-materials/blob/main/ietf111/quic-lb.pdf
    - https://github.com/quicwg/wg-materials/blob/main/ietf111/version-negotiation.pdf
    - https://github.com/quicwg/wg-materials/blob/main/ietf111/0rtt-bdp.pdf
    - https://github.com/quicwg/wg-materials/blob/main/ietf111/ack-frequency.pdf
    - https://github.com/quicwg/wg-materials/blob/main/ietf111/multipath-experiments.pdf
    - https://github.com/quicwg/wg-materials/blob/main/ietf111/quic-version-stuff.pdf
- **webtrans**
  - https://mailarchive.ietf.org/arch/browse/webtransport/
  - https://github.com/DavidSchinazi/webtrans-wg-materials
  - agenda
    - https://datatracker.ietf.org/meeting/111/materials/agenda-111-webtrans-02
  - minuts
    - https://datatracker.ietf.org/meeting/111/materials/minutes-111-webtrans-00
  - slide
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-webtrans-ietf-111-webtrans-wg-slides-01
    - WebTransport over H2 で H3 がない時のフォールバック
    - Datagram の Priority を http の priority とは別にやる
    - MASQUE で今後の拡張をするうえでの整理
    - Layered するのか Integrated するのか
- **tlswg**
  - https://mailarchive.ietf.org/arch/browse/tls/
  - https://github.com/tlswg/wg-materials
  - agenda
    - https://github.com/tlswg/wg-materials/blob/master/ietf111/agenda.md
  - minutes
    - https://github.com/tlswg/wg-materials/blob/master/ietf111/notes.md
  - slides
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-tls-ctls-00
      - いらないものを削ぎ落とそうとしてる
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-tls-encrypted-client-hello-00
      - 仕様はだいたいできて、セキュリティ issue もない
      - -12 を出してテストデプロイを始めたい
      - IETF112 で再度話そう
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-tls-tls-chairs-slides-ietf-111-00
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-tls-deprecating-obsolete-key-exchange-00
      - PFS 無いし RSA での鍵交換はもう非推奨
      - FFDHE はどうするか、 deprecate すると interop 問題がありそう?
      - そういう問題があるので Chrome は DHE を落とした
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-tls-snip-00
      - ダウングレードが発生したことがわからない
      - 拡張で伝えよう
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-tls-hybrid-key-exchange-in-tls-13-00
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-tls-tls-pok-00
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-tls-authkem-01
- **wpack**
  - https://mailarchive.ietf.org/arch/browse/wpack/
  - agenda
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-wpack-wpack-chairs-slides-ietf111-00
  - slide
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-wpack-web-bundles-00
    - Chrome の WebBundles and Bundle Preloading と Resource Bundles の対比の話
    - module fragments (TC39 stage1) との関連の話
- **ohttp**
  - minutes
    - https://datatracker.ietf.org/meeting/111/materials/minutes-111-ohttp-00
    - 初めての BoF
  - agenda
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-ohttp-chair-slides-00
  - slide
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-ohttp-oblivious-http-01
    - 「常に使うとは限らないが、標準化しない理由はない」
- privacypass
  - agenda
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-privacypass-chair-slides-00
  - slide
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-privacypass-privacypass-updates-01
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-privacypass-summary-from-anonymous-credentials-meeting-00
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-privacypass-adding-public-metadata-01
- pearg
  - minutes
    - https://datatracker.ietf.org/meeting/111/materials/minutes-111-pearg-00
  - slide
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-pearg-private-relay-00
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-pearg-website-fingerprinting-in-the-age-of-quic-00
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-pearg-shortor-improving-tor-network-latency-through-multi-hop-overlay-routing-00
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-pearg-chair-slides-00
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-pearg-safe-internet-measurement-00
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-pearg-lets-talk-about-floc-00
- dispatch
  - https://mailarchive.ietf.org/arch/browse/dispatch/
  - slide
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-dispatch-slides-111-dispatch-draft-zern-webp-00
    - secdispatch
  - https://mailarchive.ietf.org/arch/browse/secdispatch/
  - slide
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-secdispatch-draft-e2ee-definition-00
- masque
  - minutes
    - https://datatracker.ietf.org/meeting/111/materials/minutes-111-masque-01
  - slide
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-masque-the-connect-ip-http-method-for-proxying-ip-traffic-00
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-masque-http-dgram-priorities-01
      - http datagram での priority の話
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-masque-chair-slides-00
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-masque-http-datagrams-and-connect-udp-01
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-masque-connect-ip-proxying-ip-packets-01
- httpapi
  - slide
    - https://datatracker.ietf.org/meeting/111/materials/slides-111-httpapi-idempotency-header-00
    - POST の冪等ヘッダ
- **multicast for web sidemeeting**
  - https://datatracker.ietf.org/meeting/111/materials/slides-111-mboned-status-update-multicast-to-the-browser-00
    - IP Multicast でブラウザに配信したい CDN の提案
  - https://notes.ietf.org/s/notes-ietf-111-multicast-side-meeting
- Media over QUIC sidemeeting
  - https://github.com/afrind/draft-rush/blob/main/meeting-materials/agenda.2021.07.03.md
  - https://notes.ietf.org/s/B1Jhb70Rd
- 追えてない
  - WiSH
  - Gnap

#### Other

### CDN 動向

#### Cloudflare

#### Fastly

#### Other

### セキュリティ動向

- Inspecting Certificates in Edge - text/plain
  - https://textslashplain.com/2021/08/02/inspecting-certificates-in-edge/
- Privacy-Enhancing Technologies and Building for the Future | Facebook for Business
  - https://www.facebook.com/business/news/building-for-the-future
- **Dutch government to stop issuing TLS certs because of ever-complicated standards - The Record by Recorded Future**
  - https://therecord.media/dutch-government-to-stop-issuing-tls-certs-because-of-ever-complicated-standards/

### 周辺動向

- **第 1 回支援技術利用状況調査報告書 | 日本視覚障害者 ICT ネットワーク**
  - https://jbict.net/survey/at-survey-01
  - PC は PC-Talker - Netreader が圧倒的
  - Mobile は iOS voice over が圧倒的
- **Modern web apps without JavaScript bundling or transpiling**
  - https://world.hey.com/dhh/modern-web-apps-without-javascript-bundling-or-transpiling-a20f2755
  - 2016 年に WebPacker を開発し 2017 年に Rails 5.2 に入れた
  - その後状況が変わり、 ES6 は実装され、 HTTP2 は普及し、 Import Map が生まれた
  - Bundling はキャッシュ粒度も低いし、 WebPack は複雑
  - もう WebPacker をデフォルトにするのはやめ Import Map とその shim に移行
  - JSX, TS などのトランスパイルは別で
- **Is Safari the new IE ?**
  - Breaking the web forward - QuirksBlog
    - https://www.quirksmode.org/blog/archives/2021/08/breaking_the_we.html
  - HTTP 203: Is Safari the new IE?
    - https://http203.libsyn.com/is-safari-the-new-ie
  - For developers, Apple's Safari is crap and outdated - Perry Sun | Blog
    - https://blog.perrysun.com/2021/07/15/for-developers-safari-is-crap-and-outdated/
  - Safari isn't protecting the web, it's killing it | HTTP Toolkit
    - https://httptoolkit.tech/blog/safari-is-killing-the-web/

### イベント

- 9 月
  - 31-01: TC39
    - https://github.com/tc39/agendas/blob/master/2021/08.md
  - 7-11: SecWeb
    - https://secweb.work/
  - 27-28: WebKit Contributors Meeting
    - https://lists.webkit.org/pipermail/webkit-dev/2021-August/031933.html
- 10 月
  - 18-29: TPAC:
    - 10/18-22 October: Breakout sessions
    - 10/25-29 October: Groups and Joint Meetings
    - https://lists.w3.org/Archives/Public/public-webrtc/2021Apr/0027.html
- 11 月
  - 6-12: IETF112 Online
    - https://www.ietf.org/how/meetings/112/

### Wrap Up

- Chrome
  - deprecation removals 91, 92, 93 の delay
  - EyeDropper API
  - Client Hints 全部に Sec-Ch つける
  - 数字で終わるホストをドロップする話
  - Prototype Layers
  - accent-color
  - switch component
  - AMP Cache to Open JS Foundation
- Firefox
  - HTTPS default on Private mode
  - H3 header splitting attack
- Safari
  - iOS 15beta で URL バー位置変更
  - 新しい楕円曲線追加
- Edge
  - Super Duper Secure mode
  - GridNG
- W3C
  - なし
- TC39
  - なし
- IETF111
  - httpwg core draft 18 の IETF LC 間近
  - quicwg datagram
  - webtrans h2 fallback
  - tlswg FFDH 現状と ECH
  - wpack Resource Bundling 現状まとめ
  - ohttp 初の BoF
  - pearg で Private Relay / FLoC 今後の話
  - multicast to browser
- 周辺
  - 支援技術調査
  - DHH の importmap への期待
  - Is Safari new IE ?
