---
type: podcast
tags: ["yearly platform"]
audio: https://files.mozaic.fm/mozaic-ep111.mp3
published_at: 2022-12-29
guest: [@myakura](https://twitter.com/myakura)
---

# ep111 Yearly Platform 2022

## Theme

第 111 回のテーマは 2022 年 の Yearly Platform です。

今年の 8 月まで実施した Monthly Web と、8 月からの Monthly Platform を踏まえ、今年の Web Platform を振り返ります。

## Show Note

### 今年の mozaic.fm

- 1 月: 通常回 ep93 Web3
- 8 月: ep100
  - イベントは断念し State of mozaic.fm を実施
  - Logo 刷新
  - Monthly Web を Monthly Platform に
  - Monthly Ecosystem スタート
- 8 月: 通常回 ep101 Passwordless
- 12 月: Yearly Web
  - Yearly Platform と Yearly Ecosystem 両方実施

### 今年のキーワード

- Jxck
  - HTTP RFC 大量更新(Semantics, Caching, HTTP/3 etc)
  - IE リタイア
  - Interop 2022
  - Passkey/Passwordless
  - Layer, Container Query, `:has`, `:is`, `:where`, scope, nesting
  - Winter CG
  - Web3 どうなった?
  - デジタル庁デザインシステム
- myakura
  - Interop 2022
  - CSS
  - IE サポート終了
  - バージョン 100
  - `:has()` 互換性
  - Apple/Safari/WebKit
  - Igalia
  - W3C Inc.設立準備

### 2023 年チェックポイント

- Style Query
- CSS scope
- Apple のブラウザエンジン制限
- User-Agent reduction completion
- Winter CG の今後
- Figma 買収での Adobe 製品の今後
- Addon-gated と Permission

### 1 月

- Chrome
  - 97
    - **WebTransport**
    - `script.supports()`
    - FindLast/FindLastIndex
  - 98
    - COLRv1 fonts
    - HDR media queries
    - **`structuredClone()`**
    - Private Network Access Preflight
  - Ship
    - **`showPicker()`**
    - mix-blend-mode: plus-lighter
  - Prototype
    - focusgroup
    - Subgrid
  - Other
    - State of CSS
- Firefox
  - 96
    - **SameSite=Lax by default**
    - Web Locks API
  - 互換性/障害
    - **Schemeful SameSite ロールバック**
    - **Telemetry の HTTP/3 実装で障害**
  - Ship
    - Form-associated custom elements
    - **`<dialog>`**
  - Unship
    - WebVR
  - SpiderMonkey
    - **Records/Tuples**
    - New Set methods
    - Import Assertions
    - WritableStream/pipeTo()
  - Other
    - Why are hyperlinks blue revisited
- Safari
  - 15.2
    - WASM enhancements
    - **COOP/COEP**
    - Wide-gamut Canvas
  - TP 137
    - **`:has()`**
    - Web Locks API
  - TP 138
    - **`:focus-visible` by default**
    - Containment by default
    - Navigation Preload
  - other
    - Private Relay Overview
    - Safari 15 IndexedDB Leaks
- Edge
- WHATWG/W3C
  - Layers 含む Cascading & Inheritance Lv5 が CR
  - WCAG 3.0 が WG Draft
  - CSS Snapshot 2021
  - Meta と Mozilla が Interoperable Private Attribution (IPA) を提出
- TC39
  - Record & Tuples referenced Object
- IETF
  - AUTH48 で HTTP Core & H3 に採番される
- CDN
  - 2022 年に入って 5 箇所でインターネット切断
- セキュリティ動向
  - **Coinhive 無罪**
  - **Color.js / Faker.js に悪意のあるコード**
- 周辺動向
  - NTT がドメインを変更(docomo.ne.jp / ntt.co.jp)
  - **Vivaldi は暗号通貨に手を出さない**
  - **Opera は Crypto Browser として Web3 進めていく**
  - State of CSS / State of JS

### 2 月

- Chrome
  - 98
    - COLRv1
  - 99
    - **Cascade Layers**
    - `input.showPicker()`
    - Window Controls Overlay
  - Ship
    - Autofill in ShadowDOM
    - `AbortSignal.throwIfAborted()`
    - Network State Partitioning
    - UA reduction phase 4 (MAJOR.0.0.0)
    - Sec-CH-UA-WoW64
  - Prototype
    - bfcache on Cache-Control: no-store
    - `AbortSignal.timeout()`
    - Document Picture-in-Picture
  - Ready for Trial
    - **FedCM**
  - Other
    - Version 100 on March 29
- Firefox
  - 97
    - CSS `cap`/`ic` unit
    - **Cascade Layers**
    - `scroll-gutter`
    - CSS `d`
    - `AbortSignal.throwIfAborted()`
  - Ship
    - **OffScreenCanvas (WebGL only) for Zoom**
    - Soft reload cache revalidation
  - Other
    - SameSite=Lax デフォルト化のバックアウト
    - Privacy Preserving Attributes for Advertising
- Safari
  - **15.4 Beta**
    - CSS
      - Containment `contain` property
      - **Cascade Layers**
      - **`:has()`**
      - new viewport units
      - **`:focus-visible`**
      - CSS `sin()`/`cos()`/`tan()` etc.
      - unprefix
    - HTML
      - **`<dialog>`**
      - **`<img loading>`**
    - Web API
      - BroadCastChannel
      - Navigation Preload
      - Web Locks
    - JavaScript
      - `Object.hasOwn()`
      - `self.structuredClone()`
      - **`Array.findLast()`/`Array.findLastIndex()`**
      - **`at()`**
    - Security
      - CSP3
  - TP 139
  - TP 140
    - `:has(:not(foo))`
    - **`form.requestSubmit()`**
  - **Origin Private File System**
  - Intro Dialog Element
  - Other
    - **`:focus-visible` のための Igalia のクラファンが Apple によるものという勘違い炎上**
- Edge
  - 88 から Guard 系のセキュリティ強化
  - IE を Selenium でテストする方法
- WHATWG/W3C
- TC39
- IETF
  - HTTPWG interim
    - Retrofit Structured Fields for HTTP
    - The Geo-Hash HTTP Client Hint
  - Auth48 で番号が変わった
    - HTTP3: 9113 -> 9114
    - QPACK: 9114 -> 9204
- CDN 動向
- セキュリティ動向
- 周辺動向
  - **Igalia が Firefox Reality を Fork した Wolvic ブラウザ**

### 3 月

- Chrome
  - 99
    - Cascade Layers
    - showPicker()
  - **100**
    - UA reduction deprecation trial
    - AbortSignal.throwIfAborted()
    - Capability Delegation
  - Ship
    - Priority Hints
    - `hidden=until-found` / `beforematch`
  - Prototype
    - Cookie age upper limit
    - **`@scope`**
    - bfcache NotRestoredReason API
    - update on Popup API
  - web.dev
    - Interop 2022
- Firefox
  - 98
    - `<dialog>`
  - Ship
    - `pipeTo()`
  - Prototype
    - `content-visibility: hidden`
  - Other
    - Tuple implementation by Igalia
    - Exposure guidelines update on standardization venue
    - **MDN redesign**
    - **MDN and Open Web Docs**
    - **MDN Plus**
    - **Web Vision**
    - Interop 2022
- Safari
  - **15.4**
    - lazyload
    - `<dialog>`
    - `:has()`
    - Cascade Layers
    - `svw`, `lvw`, `dvw`, etc.
    - `:focus-visible`
    - BroadCastChannel
    - `findLast()`/`findLastIndex()`
    - `hasOwn()`
    - `at()`
    - CSP Level 3
  - TP 141
    - `overscroll-behavior`
    - `AbortSignal.timeout()`
  - TP 142
    - **Subgrid**
    - **Container Queries**
  - Position Request
    - positive on FedCM
  - Other
    - Interop 2022
- Edge
  - Interop 2022
  - Cognitive API で alt の自動生成
  - IE11 から Edge への強制移行が「日本を除く」になってる
- W3C/WHATWG
  - Add `<search>` element to html
- TC39
  - 2021/3 の Meeting が盛り上がりそう
    - Decorators for Stage 3
    - Pattern Matching for Stage 2
    - Types as Comments for Stage 1
- IETF
  - **IETF | IETF 113 Vienna and Online**
- CDN 動向
  - Cloudflare
    - DDR サポート on 1.1.1.1
    - ウクライナのトラフィック解析
    - **iCloud Private Relay の Egress を担当している話**
  - Akamai
    - **iCloud Private Relay の Egress を担当している話**
- セキュリティ動向
  - Meta, MS, Google による Trusted Types の Rollout Report
  - SCT Auditing の Paper
- 周辺動向
  - **Open Web Advocacy**
  - PayPay 銀行 Firefox サポート終了
  - **Interop 2022 の各社ブログ**
  - **Internet Society の「国境でアクセスを弾いたりしない」**
  - **ロシア情勢が Web/Internet/Tech に与えた影響の記録 2022 年 3 月**

### 4 月

- Chrome
  - 101
    - **Reduced UA string (MAJOR.0.0.0)**
    - FedCM OT
    - Priority Hints
  - 102
    - Network State Partitioning
    - **Speculation Rules**
    - Subresource loading with Web Bundles
    - **inert**
    - Local Font Access
    - **Navigation API**
    - `hidden=until-found`
  - Ship
    - Media Queries 4 syntax
    - Speculation Rules (prefetch)
    - Speculation Rules (same-origin prerendering)
    - Subresource loading with Web Bundles
    - **Navigation API**
    - Early Hints preload/preconnect
  - Prototype
    - CSS toggles
    - Isolated Web Apps
    - Element.isVisible
  - developer.chrome.com
    - hidden=until-found
    - inert
    - BlinkNG
- Firefox
  - 99
  - Ship
    - small/large/dynamic viewport units
    - prefers-contrast
  - Prototype
    - **Import maps**
    - `input.showPicker()`
  - Other
    - Platform 2022 planned work
- Safari
  - TP 143
    - Container Queries
    - Subgrid
    - inert by default
    - Permissions API by default
  - 15.5 Beta
    - inert
  - Position request
    - **Topics API: negative**
    - **Media Queries 4 syntax: supportive**
  - Other
    - Private Click Measurement の Fraud Prevention blog
    - Inert blog
    - **GitHub 移行に向けた話**
- Edge
  - 30 days of PWA tutorial
- W3C/WHATWG
  - Fonts for the Web Rationale 1996 公開
  - TPAC 2022 バンクーバーで hybrid のアナウンス
  - **HTML Outline Algorithm の削除**
- TC39
  - 2022/3 の meeting minutes
  - Type Annotation to Stage 1
  - **Decorators to Stage 3**
- IETF
  - httpwg が IETF114 でひさびさのミーティングのアナウンス
- CDN 動向
  - Cloudflare 1500 万 rps の記録的な HTTPS DOS を確認
  - **Fastly iCloud Private Relay のブログ**
- セキュリティ動向
- 周辺動向
  - DuckDuckGo mac 向けブラウザ
  - Digital Ocean が CSS-Tricks を買収

### 5 月

- Chrome
  - 101
    - `hwb()`
    - **Priority Hints**
  - 102
  - Ship
    - Container Queries
    - `Element.isVisible`
    - Subresource loading with Web Bundles
    - `:has()`
    - `:modal` pseudo class
    - `Response.json()`
  - Prototype
    - HTTPS DNS records with h3 ALPN param
    - **`Accept-Language` reduce fingerprinting**
    - `AbortSignal.any()`
    - COEP reflection API
    - **Origin-bound cookies**
    - **Prerender2 for Desktop**
  - I/O
    - **INP (Interaction to Next Paint)**
    - password-free auth in Yahoo! JAPAN
  - other
    - **BlinkOn 16**
    - Passkey standardization
- Firefox
  - **100**
    - **WritableStream**
    - `pipeTo()`
    - `AbortSignal.timeout()`
    - soft-reloading not cause cache revalidation
  - 101
    - `prefers-contrast`
    - **small/large/dynamic viewport units**
    - `input.showPicker()`
    - Constructable stylesheets
  - Ship
    - TransformStreams
    - BYOBStreams
    - **URL query stripping (on ETP Strict and Private Browsing modes)**
  - Prototype
    - transferable streams
  - other
    - Certificate revocation policy update
- Safari
  - TP 144
    - display: contents accessibility support
  - TP 145
  - 15.5
    - `inert`
  - TP 146
- Edge
  - `select` 要素のスタイルガイド
  - MS Build 2022
  - Edge Secure Network VPN
- W3C/WHATWG
  - W3C Strategic Highlights April 2022
  - AB Election
- TC39
- IETF
  - QPACK が Header Comp から Field Comp に改名
  - **RFC 9239 - Updates to ECMAScript Media Types**
  - Post Alien Crypto
- CDN 動向
  - Cloudflare
    - **WinterCG と Worker の OSS 公開**
    - **D1, R2, Magic Nat, MQTT など新製品公開**
    - Web3 系
  - Fastly
    - H3/QUIC available for all user
    - **Glitch 買収**
- セキュリティ動向
  - Martin の Entropy の記事
  - EKR の Online ID の記事
- 周辺動向
  - WebEngine Hackfest
  - **Ryan Dahl の container に関する Blog (WinterCG)**

### 6 月

- Chrome
  - 102
    - Navigation API
  - 103
    - **Early Hints**
  - 104
    - **range media query syntax**
  - Ship
    - `navigateEvent.intercept()`
    - **`import.meta.resolve()`**
  - Prototype
    - Background Blur API
    - CSS trigonometric functions
    - Private Network Access permission
  - Deprecate
    - **`navigateEvent.transitionWhile()`**
  - web.dev
    - **farewell HTML5Rocks**
  - Chrome Developers
    - Early Hints
- Firefox
  - 102
    - TransformStreams
  - SpiderMonkey
    - findLast/findLastIndex
    - **ESMification**
  - Ship
    - Transferable Streams
    - scroll-snap-stop
    - Array.findLast/findLastIndex
  - Prototype
    - CSS `linear()` easing function
  - other
    - **ECMAScript license**
- Safari
  - WWDC
    - Safari 16
    - **Web Push**
    - **Passkeys**
  - Safari 16
    - Container Queries
    - Web Push
    - Subgrid
    - Shared Workers
  - TP 147
    - Safari 16 features
  - TP 148
    - :modal pseudo-class
    - Link nonces
  - other
    - **WebKit is now on GitHub**
    - **WebKit standard-position repo on GitHub**
- Edge
  - **IE11 サポート終了**
- W3C/WHATWG
  - **legal NPO in 2023**
  - AB Election 終了
  - W3C が Metaverse Standards Forum に Join
  - **Outline Algorithm がなくなる**
- TC39
  - `proposal-intl-temporal`
- IETF
  - **HTTP RFC 大量公開**
  - Incremental Font Transfer レビュー依頼
- CDN 動向
  - Cloudflare
    - Early Hints
    - **Private Access Token**
    - **6/21 大規模障害**
  - Fastly
    - **Private Access Token**
- セキュリティ動向
  - **メタップス行政処分**
  - **尼崎市 USB 紛失**
- 周辺動向
  - **Anne leaving Mozilla**
  - What would Chromium-only Web look like by mnot
  - モバイルエコシステムに対するパブコメ募集
  - **行政におけるデザインシステムの在り方**

### 7 月

- Chrome
  - Ship
    - **`fetch()` upload streaming**
  - Prototype
    - COOP restrict-properties
  - Deprecate and Remove
    - **`Expect-CT`**
  - Chrome Developers
    - **Privacy Sandbox 延期**
    - **CSS Nesting syntax poll**
  - other blogs
    - **DoH3 in Android**
  - other
    - proposing changes to First-Party Sets
- Firefox
  - 103
    - **Cookie partitioning by default**
    - **`::backdrop-filter`**
    - **`scroll-snap-stop`**
    - **`:modal`**
  - Ship
    - OffscreenCanvas
  - Prototype
    - `animation-composition`
  - other
    - **Martin on Private Click Measurement**
- Safari
  - 15.6
    - **`:modal`**
  - TP 149
    - **AVIF**
  - TP 150
  - blog
    - understanding GC
  - other
    - **Anne to Apple**
    - **Lockdown Mode で JIT が無効化**
- Edge
  - ディスクキャッシュの圧縮
  - **ericlaw Edge チームを離れる**
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
  - **NIST から対量子暗号ガイドのアナウンス**
- 周辺動向
  - Wolvic 1.0
  - **謎のオープンソース企業 Igalia について中の人や Bloomberg の人にインタビュー**
  - ImperialViolet - Passkeys
  - State of CSS Survey 2022 のフィードバック募集
  - **AV1 に対して EU の公正取引調査**
  - **「いちばんやさしい Web3 の教本」回収**

### 8 月

- Chrome
  - 105
    - **Container Queries**
    - **`:has()`**
    - Fetch Upload Streaming
    - **Sanitizer API**
    - **`import.meta.resolve()`**
    - `Response.json()`
    - **Remove WebSQL in non-secure contexts**
  - 106 Beta
    - Anonymous iframes
    - **Pop-up API**
    - Intl.NumberFormat v3 API
    - **Remove HTTP/2 Server Push**
  - Ship
    - **`ic` length unit**
      - 水か永か
    - `@font-face` `tech()` function
    - Permissions Policy Origins にワイルドカード
    - **UA Reduction Phase 5 (freezing desktop platform version)**
  - other intents
    - Apple から `<model>` のフィードバック
  - Chrome Developers
    - top layer
    - Container Queries
    - `:has()`
    - Removing HTTP/2 Server Push
    - Deprecating and removing Web SQL
- Firefox
  - 104
    - `Array.findLast()`/`Array.findLastIndex()`
    - `element.focus({ focusVisible })`
  - Prototype
    - **COLRv1**
    - **JavaScript decorators**
  - other intents
  - other
    - Origin Trials (OffscreenCanvas and COEP: credentialless)
    - **position signals が positive, neutral, negative に**
- Safari
  - TP 151
    - **color-mix()**
    - scan media query
    - :dir
    - Range の ordering check 削除
  - TP 152
    - **Array の rename #groupBy -> #group と #groupByToMap -> groupToMap**
  - Blog
  - Other
    - `:has()` のブログ
    - WebKit on GitHub
- Edge
  - **104 で Enhanced Security Mode 導入**
  - **Chrome の OT Token が Edge でも動く**
- W3C/WHATWG
  - Spec
    - Geolocation API in W3C Recommendation
      - Living Standard にして Level N を無くす
  - Other
    - `ic` での "水" か "永" か問題
    - **`:has()` と forgiving selector list で jQuery の独自拡張 `:has()` が壊れる**
- TC39
  - Meeting 2022-07
    - Change Array by Copy の toSplice 廃止
    - NumberFormat v3 の Range order check 廃止
- IETF
  - IETF 114
  - **RFC 9292 Binary Representation of HTTP Messages**
- CDN 動向
  - Zip with WASI on Cloudflare Workers
- セキュリティ動向
  - Coincheck が Sign in with Apple の廃止
- 周辺動向

### 9 月

- Chrome
  - 106
    - **Popup API Origin Trial**
  - 107
    - **wildcards in permissions policy origins**
    - **Declarative Pending Beacon API OT**
    - **Permissions-Policy: unload OT**
    - Expect-CT removal
  - Ship
    - Android OSK resizes visual viewport
    - **Array grouping**
    - **`@supports` selector non-forgiving parsing**
    - **Small/Large/Dynamic viewport units**
    - **OPFS on Android**
  - Prototype
    - **`lh` unit**
    - **Same-site cross-origin prerendering by Speculation Rules**
    - Web Smart Card API
  - web.dev
    - **Interop 2023 proposals**
    - Learn HTML/Accessibility
  - Chrome Developers
    - Popup API
    - CDS 2022 開催はなし
  - Chromium blog
    - **Chrome Root Program**
- Firefox
  - 105
    - **TextEncoderStream/TextDecoderStream**
    - **OffscreenCanvas**
  - Ship
    - **COLRv1 fonts**
    - ElementInternals ARIA reflection
  - other
    - **HSTS preload list に `asus.com` が追加されルータに繋がらなくなったバグ**
- Safari
  - 16.0
    - Container Queries
    - Subgrid
    - **passkeys on iOS**
    - non-animated AVIF
    - Shared Workers
  - TP 153
    - Import Assertions and JSON modules
    - Imperative Slot API
    - aria-description
  - TP 154
    - `:dir`
    - ElementInternals ARIA reflection
    - **Scroll To Text Fragment**
  - blog
  - other
    - **Disable ShadowRealm**
    - **Prototype Declarative Shadow DOM**
- Edge
  - **Window Controls Overlay で 30px のタイトルバー部分が使える**
- W3C/WHATWG
  - TPAC
    - Breakout
      - File System
      - Open UI
      - Fugu
      - CSS Anchoring
    - WebPerf
      - **MSN.com が React から WebComponents に移行した話**
      - **no-vary-query**
      - Super Early Hints
  - Spec
    - Trusted Types FPWD
    - Well-Known URL Change Password FPWD
  - other
    - **TPAC で `:has` 問題の議論がふんわり終わってしまった**
    - **Permissions and User Consent の 2 回目を予定**
    - Tantek による Sustainability CG Meeting まとめ
- TC39
  - proposal-extractors
  - **Rust 実装の ICU4X1.0 リリースで FF Intl.Segmenter が進みそう**
- IETF
  - Alt-SVC デザインチームができた
- CDN 動向
  - **Cloudflare が過激化した Kiwifarms をブロックした話**
  - Private Access Token 系の記事が多い
- セキュリティ動向
  - **GTA と Uber に MFA Fatigue 攻撃**
  - **EV 証明書の OCSP 検証が無くなったため高速化したサイトの話 by WebPageTest**
- 周辺動向
  - **Open Web Docs Steering Committee に Apple 参加**
  - **JavaScript の商標を手放して欲しい by Ryan Dahl**
  - Let's Encrypt の立ち上げに貢献した Peter が死去
  - **Adobe Figma 買収が Web に与える影響**
  - **2022 Web Almanac**
  - **Stadia 終了アナウンス**

### 10 月

- Chrome
  - 107
    - PendingBeacon OT
  - 108 Beta
    - svh/dvh/lvh
    - FedCM
    - Wildcards in Permissions Policy Origins
    - Variable COLRv1
    - Inactive CSS properties in DevTools
  - Ship
    - **CHIPS**
    - FedCM
    - **Origin Isolation by default / deprecate document.domain**
    - Same-site cross-origin prerendering
    - **Anonymous iframes**
  - Prototype
    - **CSS Initial Letters**
    - CSS Nesting
    - **Document Rules**
    - `scheduler.yield()`
  - web.dev
    - Passkeys
  - Chrome Developers
    - No spooky cookies
    - **Is Project Fugu Done? -> far from it**
  - Chromium blog
  - other blogs
  - other
- Firefox
  - 106
    - **`@supports font-tech()` / `@supports font-format()`**
  - Ship
    - **Import maps**
    - **CSS trigonometric functions**
  - Prototype
    - **ORB (partial) in Nightly**
  - other
    - Page Collections from Chromium
    - `import.meta.resolve()`
    - **Early Hints, WebTransport, OHTTP 実装中**
- Safari
  - TP 155
    - disabled ShadowRealm for now
    - Reporting API
  - TP 156
    - **`import.meta.resolve()`**
    - **Import Maps**
    - `Clear-Site-Data`
    - **prototype Declarative Shadow DOM**
  - 16.1
    - **Web Push for Ventura**
    - **Animated AVIF**
    - **Passkeys**
    - **Scroll to Text Fragment**
- Edge
  - MS Ignite
- W3C/WHATWG
  - Spec
    - PNG の EXIF や HDR 対応更新
    - **Shared Element Transition が CSS View Transitions Module に**
    - Scroll-linked Animations
  - other
    - **12 月 Permission Workshop 開催**
    - **WCG/HDR の Workshop report**
- TC39
  - 9 月のミーティング
  - **Record & Tuple**
    - isRecord/isTuple がなくなる
    - JSON.parseImmutable は別ドラフト
    - Object を含むのはやめ WeakMap を使え
  - Iterator helpers を method ではなく function にする提案
  - **分割代入時にロジックを挟む Extractor Objects**
- IETF
  - 特になし
- CDN 動向
  - Cloudflare
    - **Alexa Top100 後継を 1.1.1.1 の統計情報で**
    - OHTTP のブログ
    - Early Hints で Cloudflare pages を速く
  - Fastly
    - **Yamagoya 2022**
- セキュリティ動向
  - **PayPal が Passkey 対応**
- 周辺動向
  - **Facebook が Chromium-based WebView for Android**
  - Igalia の MPArch の記事

### 11 月

- Chrome
  - Ship
    - **Change Array by copy**
    - **Symbols as WeakMap keys**
    - **TLS ClientHello extension permutation**
    - **CSS Initial Letters**
    - **Media Session slides actions**
  - Prototype
    - View Transition Same-Origin Navigation
    - Inactive Document Invalidation API
    - Incoming Call Notifications
    - **WebSocket over h3**
  - Experiment
    - **SAB in non-isolated pages**
      - COEP credentialless
      - Cross-origin Isolated + popups
      - Anonymous iframes
  - web.dev
    - Building Chrometober
    - **new to the web platform in October**
      - AVIF
  - Chrome Developers
    - Storage Buckets
  - other
    - BlinkOn 17
    - **JPEG XL support dropped**
- Firefox
  - 107
    - **`contain-intrinsic-size`**
  - Ship
    - **Mixed contents Lv2 upgrading image, audio, video**
    - **Addon-gated WebMIDI**
    - **OPFS**
  - other
    - **revamp MDN Contribution docs**
- Safari
  - TP 157
    - CSS lh/rlh
    - WebCodecs
    - `Sec-Fetch-Site`
    - **Cap Cookie lifetime to 7 days from 3rd-party IP addresses (CNAME Cloaking)**
  - TP 158
    - contain-intrinsic-size
    - AVIF for Monterey and Big Sur
    - **enable WebCodecs by default**
- W3C/WHATWG
  - Spec
    - **CSS Snapshot 2022**
  - other
    - TAG election
    - agenda for Permissions Workshop
- TC39
  - Meeting も Stage 移動もなし
- IETF
  - IETF115 London
    - Well-known for ECHConfigList
    - DNS や Proxy の設定をまとめる JSON for Masque
  - HTTP Workshop
    - HTTP Client を作る上でどういう API が良いのかという発表
      - **ついでに adobe/fetch が紹介されてた**
- CDN 動向
  - **CF: ブラジル選挙、大統領中間選挙、サンクスギビングのトラフィックレポート**
  - CF: OpenSSL の CVE が BoringSSL 使ってるから影響なかった
  - **CF: WinterCG の活動について**
  - Fastly: ECDSA 証明書を使う理由
- セキュリティ動向
  - **ケニアの大統領が「盗聴してないので E2EE する必要はない」と宣言**
- 周辺動向
  - **FB Instant Article 2023/4 にサポート終了**
  - FB Git 互換のソース管理 Sapling 公開
  - **Netscape, Chrome の重鎮 Darin Fisher が The Browser Company に入った**
  - **Igalia の BlinkOn と WebKit Contributors Meeting レポート**
  - Google Fonts が IP のプライバシーに関する声明
  - **CMA による Cloud Gaming の寡占に関するレポート**
