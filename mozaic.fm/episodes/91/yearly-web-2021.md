---
type: podcast
tags: ["yearly web"]
audio: https://files.mozaic.fm/mozaic-ep91.mp3
published_at: 2021-12-27
guest: [@myakura](https://twitter.com/myakura)
---

# ep91 Yearly Web 2021

## Theme

第 91 回のテーマは 2021 年の Yearly Web です。


## Show Note

### 今年の mozaic.fm

- 1 月: ep78 TC39 (sosukesuzuki)
- 5 月: ep82 Monthly Web 202104 (sosuke, yuki -> web24)
- 5 月: ep83 IE (MS, yusuke-san)
- 工事
  - RSS の show note が長くてついに Apple Podcast でエラーになったので消した
  - CORP をデプロイしたら Google Podcast でエラーになってた
  - Markdown パーサを自作して Show Note 編集の手間が激減した
- 実はコロナ中はアクセスが倍近く増えていた。今は戻りつつある。


### 2021 年キーワード

#### Jxck

- HTTP3, Core RFC 出なかった
- IE 終活
- Edge Computing
- CDN, Cloud の大規模障
- Privacy Sandbox 延期
- Private Relay, OHTTP -> OHAI
- TC39 が結構活発
- AMP -> CWV -> Bento
- CSS Import, Layer, `:has()`, accent/theme/contrast 管理などでまた CSS 変わりそう
- dialog 来そう
- Safari as next IE
- Safari rapid release
- Web3 ?


#### myakura

- Chrome のリリースサイクル短縮
- Chrome 100 / Firefox 100 近し
- Chrome と Secure by default、互換性
- Safari 15 からのリリースサイクル
- IE11 サポート終了発表
- QUIC が出た & HTTP/3 普及
- CSS の夢機能たち
- AMP から手を引く流れ


### 1 月

- Survey
  - *Web Almanac*
  - State of JS
  - Mozilla developer needs assessments
- *Open Web Doc*
- *CDS*
- *chrome.developers 公開*
- *chrome 87/88 release with incident*
  - mixed contents で form submit 失敗
  - タイムゾーンの反映が壊れて時間表示が狂う
- chrome 89 Device 系 API
- *privacy sandbox 1 年経過の続報*
- *privacy preserving preload と prerendering 2*
- private prefetch proxy proposal
- `<popup>` と ModalCloseWacher
- SameParty Cookie
- Firefox 85 で preload
- *ESNI to ECH*
- Network Partitioning で Super Cookie 対策
- *Safari TP aspect-ratio 周り実装中*
- prefers-contrast: more
- private click measurement
- WebRTC 1.0 RC
- HTML Review Draft Recommendation
- WCAG 3 FPWD
- TAG Election
- TC39 async do expression
- TC39 Proposal Dataset
- tc39/js-outreach-groups
- *IETF oblivious HTTP*
- Tunneling と Proxy 系のドラフトが多い
- Cloudflare Oblivious DoH
- *ウガンダ Internet Shutdown*
- Smooz
- ESE 暗号化と法規制まとめ


### 2 月

- Chrome
  - PWA install prompt requirements change
  - *:focus-visible default UA Style*
  - *macOS X UA string freezing*
  - Origin-Agent-Cluster
  - IP-multicast
  - width/height `<picture>` `<source>`
  - *Early Hints Prototype*
  - *Speculation Rules*
- Firefox
  - *Total Cookie Protection*
  - color-mix
- Safari
  - *Privacy Click Measurement*
  - color function in TP
  - *Private Method behind flag*
  - Declarative Shadow DOM position request
- Edge
  - *Edge Legacy Remove*
  - Adaptive Notification Request
  - *IE サポート終了の流れ加速*
- W3C
  - WHATWG HTML as Recommendation
- IETF
  - *RFC 8941 Structured Field Values*
  - RFC 8942 HTTP Client Hints
- セキュリティ
  - *Cookie / Privacy Sandbox / 独占禁止法 / 公正取引委員会*
  - Let's Encrypt インフラ改善
- 周辺
  - 日本の Web A11y 関心調査


### 3 月

- *Chrome Faster release from 94*
- Spectre PoC DEMO
- URL bar default to https://
- *ship: JSON modules*
- *ship: inert*
- prototype: document.prerendering
- Web.dev CWV debugging や case study 系の記事
- *Compat 2021 で CSS Flexbox/Grid etc の改善着手*
- *privacysandbox.com*
- FLoC OT
- Android chrome/webivew 障害
- *Referer Policy Default change*
- *ETP で built in shim へのフォールバック?*
- *MDN Tier 1 locale unfrozen*
- *Firefox Ship: aspect-ratio*
- *Safari focus-visible*
- Private (static) method
- Worklets & module in sw
- *Igalia contribution*
- Edge Legacy サポート終了
- Post-Spectre Web Development
- ES2021 Candidate
- Record & Tuple の immutable method 提案
- *Temporal Stage 3 と Standard Position*
- *Promise.race と anySettled の話*
- Module Fragments for stage 1
- BCP65bis の Re-WGLC


### 4 月

- *Ch: WebSocket over H2*
- Ch: ES Module for SW
- Ch: H2 / H3 ALPS - ACCEPT_CH
- Ch: SW subresource filter
- Ch: Network State Partitioning
- *Ch: Net slipstream port 10080 blocking*
- *Ch: WebTransport over H3 OT*
- Ch: Scroll Survay
- *Ch: SXG on Search Result*
- *Ch: Page Experience Rollout が 6 月中旬*
- FF: window.name からの inforeak 対策
- FF: QUIC / H3 Rollout 開始
- *FF: Top level await*
- *FF: import assertions 実装開始*
- Wk: FPS negative
- Ed: WebView / Edge の違いドキュメント
- W3C: WebCodecs FPWD
- W3C: Web & Networks IG
- TC39: array by copy
- *TC39: object-has (0 -> 2 に一気に)*
- TC39: class features が 4 に
- *TC39: pattern matching updates*
- *IETF: Proxy Status WGLC*
- *IETF: Cache Status updates*
- IETF: Upgrade / Priority remove from h2
- IETF: CHIPS / cookie incrementalism / state token
- IETF: semantics publication request
- *Security: PSL が辛い*
- 周辺: .new ドメインめっちゃ増えてる
- *周辺: FLoC への風当たりが強い*


### 5 月

- Chrome
  - BlinkOn14
    - Fenced Fame, WebID, Prerendering
  - *Google I/O*
    - adventure
  - prototype EXIF based density collection
  - prototype fenced frame / anonymous iframe
  - finch experiment Early Hints preloading
  - v8 sparkplug
  - web.dev security header quick reference
  - web.dev learn css
  - *UA-CH / UA reduction roadmap*
  - Canvas Base Google Docs
- Firefox
  - *Site Isolation*
  - intents Image density collection
- Safari
  - *14.1 release note*
    - *flexbox gap*
    - date time input
  - Class Field
  - WebM Playback
- Edge
  - MS Build
  - *IE11 Support 終了アナウンス*
  - IE to Edge 移行ガイドライン
- W3C/WHATWG
  - PNG working group
- TC39
  - meeting
  - *Top Level Await to 4*
  - regexp match indices to 4
- IETF
  - *QUIC RFC9000*
  - *httpbis last call*
  - *httpbis bcp last call*
  - CHIPS to httpbis
- CDN
  - CDN-Cache-Control
  - Cloudflare の Privacy Pass + WebAuthN に FIDO から反論
- Secruity
  - *CAB Forum の update を globalsign がアナウンス*


### 6 月

- Chrome
  - OT Shared Element Transition
  - *Intents css module script*
  - *Intents hasOwn*
  - Intents theme-color meta=media
  - Intents ALPACA port blocking
  - Intents Temporal
  - *OT Release Cycle 変更*
  - *web.dev CSS の話多め*
  - *project AURORA*
  - "Conformance" concept
  - privacy sandbox commitment
  - *privacy sandbox milestone update*
- Firefox
  - *Visual refresh*
  - *EKR/Martin FLoC Report*
- Safari
  - *WWDC*
    - *Private Relay*
    - *passkey in iCloud keychain*
    - Safari 15
    - Tab bar
    - meta media
    - web extension
- Edge
  - *HTTPS upgrade を広いサイトで*
  - Windows 11
- WHATWG/W3C
  - Web Audio API REC
  - Web Extensions Community Group
- TC39
  - *es2021*
- IETF
  - Targeted Cache Control
  - Cache Trailer
  - OHTTP
  - DATAGRAM Priority
- CDN
  - *Fastly / AKAMAI 障害*
- セキュリティ
  - CMA のレポート
  - 小勝さん Trusted Types のブログ
- 周辺
  - mnot の Internet Layer に関するブログ
  - EU が Google を検索周りで訴える


### 7 月

- Chrome
  - *COEP: credentialless*
  - Subresource Web Bundle OT 終了
  - Error Cause
  - `Object.hasOwn()`
  - prefer: CurrentTab と mozilla の position
  - *UA-CH と windows の version を細かくする話*
  - Cookie Size Limits
  - *CORS non wildcard に Authorization を追加の話*
  - SW Subresource Filter
  - *URLPattern*
  - *Cross iframe の alert()/confirm() prompt と互換性の話*
  - Lazyloading しすぎて LCP が遅くなる話
  - RenderingNG, TablesNG
  - Phishing Detection のカラープロファイルの話
  - *HTTPS First*
- Firefox
  - Smart Block2
  - *Fetch Metadata Support*
  - Canvas Conic Gradient
  - *Canada で DoH 開始*
- Safari
  - Ergonomic Brand Check
  - Picture source width
  - PCM の report fraud 対策
- Edge
  - VSCode integration
  - WebView2 と Electron
- W3C
  - Sanitizer API が FPWD
  - Trusted Types の FPWD に Mozilla が反対
  - Federated Identity Community Group created
  - *JSON Module, CSS Module が HTML に追加*
- TC39
  - *Realm to Stage3*
  - ArrayBuffer from/to Base64
  - Array grouping to stage 0
  - *Node@16.5 WHATWG Stream support*
- IETF
  - HTTPbis v17 IESG
  - HTTP2bis WGLC
  - Proxy Status WGLC
  - HTTP BCP WGLC
- CDN
  - Akamai DNS 障害
- セキュリティ
  - *Let's Encrypt の 90 日 + 1 秒の話*
  - *宇宙線の 1bit 反転で CT が壊れた話*
- 周辺動向
  - *WWW のコードが NFT で 6 億*
  - Jake の URLSearchParams/FormData blog


### 8 月

- Chrome
  - *deprecation removals 91, 92, 93 の delay*
  - *EyeDropper API*
  - *Client Hints 全部に Sec-Ch つける*
  - 数字で終わるホストをドロップする話
  - *Prototype Layers*
  - accent-color
  - *switch component*
  - *AMP Cache to Open JS Foundation*
- Firefox
  - HTTPS default on Private mode
  - *H3 header splitting attack*
- Safari
  - *iOS 15beta で URL バー位置変更*
  - 新しい楕円曲線追加
- Edge
  - *Super Duper Secure mode*
  - GridNG
- W3C
  - なし
- TC39
  - なし
- IETF111
  - *httpwg core draft 18 の IETF LC 間近*
  - quicwg datagram
  - *webtrans h2 fallback*
  - tlswg FFDH 現状と ECH
  - *wpack Resource Bundling 現状まとめ*
  - ohttp 初の BoF
  - *pearg で Private Relay / FLoC 今後の話*
  - multicast to browser
- 周辺
  - 支援技術調査
  - *DHH の importmap への期待*
  - *Is Safari new IE ?*


### 9 月

- Chrome
  - 93 module script / release cycle shorten
  - 94 WebCodecs / WebGPU
  - 95 UA Reduction OT / self.reportError() / eyedropper / URLPattern
  - *ship self.reportError*
  - *ship script element support*
  - ship webtransport
  - *ship HTTPS DNS record*
  - prototype renderpriority
  - web.dev JS Event History
  - web.dev specuration rules
  - User Device Characteristics レポート
  - Manifest V3 移行
  - UA Reduction Timeline
  - *Search Central での `<title>` と `<h1>` の扱い*
    - *Google によるウェブページ検索結果のタイトル生成方法の詳細 | Google 検索セントラル ブログ*
    - https://developers.google.com/search/blog/2021/09/more-info-about-titles
  - version 100 flag
- Firefox
  - 92 accent-color / hasOwn / font-family: system-ui
  - *prototype cascade layers*
  - *prototype scroll linked animations*
  - version 100 experiment
  - *why are hyperlinks blue ?*
  - *UA-CH standard position non-harmful*
- Safari
  - Safari 15 release
  - iCloud keychain auth key
  - CSS aspect-ratio
  - HTML meta theme-color
  - JSC top level await / module worker / private class methods & accessor
  - API WebGL 2
  - iOS / iPadOS extension
  - *TP COOP/COEP , `<dialog>`, Temporal 実装開始*
  - TP random.UUID, self.reportError 実装
  - Position request for Network Information API
  - *Private Relay 提供開始 => カウントフリーやフィルタリングで不具合*
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
  - *Cloudflare の SXG と Early Hints の話*
- Security
  - secweb で面白そうな論文がちらほら


### 10 月

- Chrome
  - 3 digit version number
  - Simple Range Header without Preflight
  - BFCache on Desktop
  - COEP credentialless
  - HTTPS DNS Records
  - Ship: Non wildcard request header
  - Ship: Late new line normalization
  - Proto: UA-CH Grease Update
  - *Exp: Auto Dark Mode*
  - Rendering/Layout NG
  - *Google Search IE Support 終了*
- Firefox
  - Referrer Tracking Protection
  - 3DES 終了
  - *AVIF Support*
  - Proto: URL Query Stripping
  - Proto: input-security: none/auto
  - *Unship: Clear-Site-Data: cache*
  - *In Browser Annotation*
- Safari
  - hasOwn
  - Temporal
  - Storage API
  - *COOP/COEP + Shared Array Buffer 復活*
  - *Web Push 実装開始*
- Edge
  - VSCode + DevTools Debuggability
  - vscode.dev
- W3C
  - *Private Ads Technology CG*
  - TPAC now
- TC39
- IETF
  - *WebSocket in HTTP RR Record*
  - WGLC: Target Cache-Control
  - WGLC: HTTP Priorities
  - WGLC: WebSocket over H3
- CDN
  - *Web3*
  - Security
  - *Let's Encrypt Root Expiration*
  - Openssl QUIC Support Discussion
- Other
  - *Facebook Disconnected from Internet*
  - Web のルビと a11y
  - State of CSS 2021


### 11 月

- chrome
  - 96
    - emulate version 100
    - *bfcache default on desktop*
  - 97
    - WebTransport
    - `scriptElement.support()`
    - `Array.findLast()`, `Array.findLastIndex()`
  - Prototype
    - capability delegation
    - *input element `showPicker()`*
    - *blocking=rendering 属性*
    - `NFC.makeReadonly()`
    - Set-Cookie の `Domain=""` を許容
  - Ship
    - Request Origin / Redirect Chain
    - *Private Network Access for Preflight*
    - *Cascade Layer*
    - *Sec-CH-UA-Full-Version-List*
  - CDS
    - animation smoothness metrics
    - resposiveness metrics
  - web.dev
    - *UI fund*
  - Search Central
    - Page Experience ranking to desktop rollout in Feb 2022
  - Other
    - *Bento.js (Bento AMP)*
    - BlinkOn 15
  - Firefox
    - 94
      - *`self.structuredClone()`*
      - `scriptElement.supoorts()`
    - 95
      - site isolation rollout
      - *`crypto.randomUUID()`*
      - UA sniffing for slack.com
    - Ship
      - *SameSite=Lax by default*
  - Safari
    - 15.0
      - *`<meta name="theme-color">`*
      - *`aspect-ratio`*
      - *top-level await*
      - *Error.cause*
      - *Private Class methods/accessors*
      - WebGL2
      - `autocomplete="one-time-code"`
    - TP 134
      - `text-decoration-skip-ink`
      - *enable `<dialog>` by default*
      - *`inert` attribute behind flag*
      - enable BroadCastChannel by default
      - enable Storage API + FileSystemAccess + AccessHandle by default
      - CSP script-src-elem, script-src-attr, etc.
    - TP 135
      - *enable `accent-color` by default*
      - *CSS small/large/dynamic viewport units*
      - *enable image lazy-loading by default*
    - TP 136
      - *`contain: paint`*
      - *Scroll To Text Fragment parsing*
      - manifest_version 3
    - Other
      - *enable `:focus-visible` by default*
  - Edge
    - Developer Support Internet team internship
    - Recreate My Problem ボタンでバグレポート
  - WHATWG/W3C
    - TPAC2021
      - Sate Of CSS 2021
      - Making WebViews Work for the Web
      - Cognitive Accessibility Task Force (COGA)
    - XS-Leaks summit
    - ARIA in HTML Recommendation
    - *WHATWG New Living Standards*
      - WebIDL
      - Test Utils
      - WebSocket
      - File System
    - TAG Election
    - *Interoperability Remedies Community Group*
  - TC39
    - *Error Cause stage 4*
    - tc39/proposal-function-helpers
    - tc39/proposal-destructuring-private
    - tc39/proposal-regexp-modifiers
  - IETF
    - Publication request: draft-ietf-httpbis-targeted-cache-control-02
    - Publication request: draft-ietf-httpbis-priority-09
    - *Working Group Last Call: Digest Fields*
    - Bundle Preload と WebBundle のマージ
    - *Secure Credential Transfer (iCloud のような鍵共有)*
    - Avoiding Internet Centralization
  - CDN
    - Cloudflare
    - Mirai による 2Tbps の DDoS
    - Fastly
    - *log4j の脆弱性*
  - 周辺
    - CDS の Compat2021 で Safari TP が古かったことを Paul Kinlan が謝罪
    - *Web Almanac 2021*
    - Open Props (css variables での css framework)