---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep117.mp3
published_at: 2023-03-30
guest: [@myakura](https://twitter.com/myakura)
---

# ep117 Monthly Platform 202303

## Theme

第 117 回のテーマは 2023 年 3 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable:111

#### Updates

- **New in Chrome 111**
  - https://developer.chrome.com/en/blog/new-in-chrome-111/
  - View Transitions API.
  - CSS Color Level 4.
  - New color devtools.
- **Chrome 112 beta**
  - https://developer.chrome.com/en/blog/chrome-112-beta/
  - CSS
    - **CSS Nesting**
    - CSS animation-composition property
  - Web APIs
    - "Reload this page" infobar no longer shown if top-level frame is observing permission changes
    - **Add optional submitter parameter to the FormData constructor**
    - **RegExp `v` flag with set notation and properties of strings**
    - **Updated `<dialog>` initial focus algorithm**
    - WebAssembly tail call
    - WebGLContextEvent on Web Workers
    - Skip service worker no-op fetch handler
    - Accept-encoding: br (Brotli) on HTTPS connection in WebView
  - Origin trials in progress
    - FedCM: Auto re-authentication API
  - Deprecation trial
    - X-Requested-With in WebView Deprecation
  - Deprecations and removals
    - Deprecate the document.domain setter
    - Remove stats objects track and stream from the getStats() method of RTCPeerConnection
- **What's New in DevTools (Chrome 112)**
  - https://developer.chrome.com/en/blog/new-in-devtools-112/
  - Recorder updates
    - Replay extensions support
    - Record with pierce selectors
    - Export as a Puppeteer script with Lighthouse analysis
    - Get extensions
  - Elements > Styles updates
    - CSS documentation
    - CSS nesting support
  - Marking logpoints and conditional breakpoints in the Console
  - Ignore irrelevant scripts during debugging
  - JavaScript Profiler deprecation started
  - Emulate reduced contrast
  - Lighthouse 10
  - A Console warning to remove your no-op service worker fetch handler
  - Miscellaneous highlights

#### Intents

- Ship: CSS :lang pseudo class level 4
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tO598HXuS94
- Ship: Display and content-visibility animations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UV9POKsNZA8
- **Ship: First-party sets**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7_6JDIfE1as
  - 異なるサイトを同一 Party として宣言する API
  - 最初の提案からはだいぶ変わっている
  - Storage Access API と requestStorageAccessFor API で利用
- **Ship: Storage Access API (within First-Party Sets)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/V9PzoCvIIIs
- **Ship: requestStorageAccessFor (for First-Party Sets)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zCW6oEALAl4
- **Ship: Forbidden and escaped host characters compliant with the URL standard**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZkeDSeuBx0Q
  - URL の仕様に合わせるため、 Host で利用できる文字の制限が修正
  - % エンコードされる文字も修正
- **Ship: Private State Tokens API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vKCYxKqw8k0
  - 旧 Trust Token だったもの
  - Privacy Pass の Web 実装として、適切な名前に変わった
- Ship: Removal of X-Requested-With in WebView
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Z70s8CQ8PbU
- **Ship: Skip service worker no-op fetch handler**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tEFS0BH8UmE
  - PWA にするために SW を提供するがハンドラは何もしない実装がある
  - onfetch に登録された `() => {}` のようなハンドラを no-op handler と呼ぶ
  - その場合は SW の起動をスキップして起動を高速化する
- Ship: Speculation rules: Content Security Policy extension
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Spjosgl4z-8
- **Ship: The Popover API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uB_jxbRmjAM
- Ship: Transitions on specified discrete properties
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UK6TtET2gOI
- Ship: WebAssembly Relaxed SIMD
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HzLlEGLSx7E
- Ship: WebAssembly extended-const Proposal
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/62eomhywHj0
- Prototype and Ship: Expanded Wildcards in Permissions Policy Origins
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/kSknKkiYlZU
- Implement and Ship: WebAssembly Relaxed SIMD
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dX61V0HAAz4
- Prototype: CSS font-palette property animation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oHg2u4ijXUU
- **Prototype: CSS inline leading-trim**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tYeALJeWwDc
- Prototype: CapturedMouseEvent
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DYb5fXICJvo
- **Prototype: Compression dictionary transport with Shared Brotli**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-qYpLo9DTjw
  - brotli の辞書をコンテンツに基づいて生成し、圧縮率をあげる
  - レスポンスを元に br の辞書を作り次の圧縮に使う delta compression
  - あらかじめ生成した辞書を link で伝える shared dictionary
- Prototype: Delayed clipboard rendering
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UEJjsRSH8Ng
- Prototype: Navigation API: NavigateEvent delayed commit capability
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Aef4fm1Wn18
- Prototype: XRPose Motion APIs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0Bctfvd-Sg8
- **Prototype: popover=hint**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/n_FPQNFt_9k
  - auto/manual に加えた三つ目の popover タイプ
  - 一度に開ける hint は一つなどの制約がある
  - tooltip などに使う
- Extend Deprecation Trial: Restrict "private network requests" for subresources from public websites to secure contexts.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bC5E23Qj46s
- Fwd: Intent to Prototype: XRSession frame rate APIs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/idHaeu3dQVo
- Experiment: Keep strong references to resources in Blink memory cache
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RA7HlvPbinY
- Change:
- Unship:
- **BlinkOn 18 timing & location**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CVblH9r0NJ8
- **[Call for feedback] Proposal to gradually skip unload events: already unreliable, top back/forward cache blocker, better alternatives available!**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oU1yt5cdGH8
- deprecate forwarding of mdoc-scheme URLs as Android Intents
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wcCrcMTELS0

#### V8

#### Other

- web.dev
  - 6 CSS snippets every front-end developer should know in 2023
    - https://web.dev/6-css-snippets-every-front-end-developer-should-know-in-2023/
  - **Trigonometric functions in CSS**
    - https://web.dev/css-trig-functions/
- google developer blog
  - **Let's go. It's Google I/O 2023**
    - https://developers.googleblog.com/2023/03/lets-go-its-google-io-2023.html
- google developer japan blog
  - Google Developers Japan: Google Ads API v11 の提供終了に関するお知らせ
    - https://developers-jp.googleblog.com/2023/03/ads-api-v11-sunset-reminder.html
  - Google Developers Japan: Google Ads API の画像と住所の自動移行について
    - https://developers-jp.googleblog.com/2023/03/ads-api-image-and-location-auto-migrations.html
  - Google Developers Japan: Google Ads API v13 のお知らせ
    - https://developers-jp.googleblog.com/2023/03/announcing-v13-of-google-ads-api.html
  - Google Developers Japan: Google 広告の検索、ショッピング、ディスプレイ、 P-MAX キャンペーンの地域ターゲティングの変更について
    - https://developers-jp.googleblog.com/2023/03/changes-to-location-targeting-in-google-ads.html
- chrome developer blog
  - **SPA view transitions land in Chrome 111 - Chrome Developers**
    - https://developer.chrome.com/en/blog/spa-view-transitions-land/
  - A new home for the Project Fugu API Showcase - Chrome Developers
    - https://developer.chrome.com/en/blog/a-new-home-for-the-project-fugu-api-showcase/
  - Participate in deprecation trial for unpartitioned third-party storage, Service Workers, and Communication APIs - Chrome Developers
    - https://developer.chrome.com/en/blog/storage-partitioning-deprecation-trial/
  - FedCM updates: Origin trial for auto-reauthentication - Chrome Developers
    - https://developer.chrome.com/en/blog/fedcm-auto-reauthn-origin-trial/
  - Improving user privacy by requiring opt-in to send X-Requested-With header from WebView - Chrome Developers
    - https://developer.chrome.com/en/blog/android-webview-header-privacy/
  - **Partnering with Fastly-Oblivious HTTP relay for FLEDGE's 𝑘-anonymity server - Chrome Developers**
    - https://developer.chrome.com/en/blog/oblivious-http-for-k-anon-server-with-fastly/
    - OHTTP を Fledge で使う話
  - **From Web SQL to SQLite Wasm: the database migration guide - Chrome Developers**
    - https://developer.chrome.com/en/blog/from-web-sql-to-sqlite-wasm/
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- search central
  - 2022 年の検索セントラル コミュニティ
    - https://developers.google.com/search/blog/2023/03/2022-recap-search-central-community?hl=ja
  - Blending Search Console and internal data inside Looker Studio
    - https://developers.google.com/search/blog/2023/03/gsc-data-blending-looker-studio
- v8
  - https://v8.dev/

### Firefox 動向

#### Stable: 111.0

#### Updates

- **Firefox 111 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/111
    - `autocapitalize` attribute
    - `translate` attribute
    - Origin Private File System
    - FormData `submitter`
- Firefox 111.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/111.0/releasenotes/

#### Intents

- **Ship: Compatible join and split node direction in HTML editor**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Ob-T1HSe-4I/m/VJ76Bcs1AQAJ
- **Ship: change-array-by-copy**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/2ArmKfy2POQ
- **Ship: inert attribute**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/05UFVR_nj3I
- **Prototype and ship: :nth-child(An+B of \<selector list>)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/eQeeFKYJ038
- **Prototype and ship: Additional CSS Color (level 4) functions**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/eTJLWJEuLv0
- **Prototype: Async clipboard API improvement for read()/readText() and write()**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/doxNXSEFtEE/m/CGsR1fLlAgAJ
- **Prototype: prefers-reduced-transparency media query**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/l410J8odZjA
- Prototype: CSS Custom Highlight API
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/fE37aJ_YdA8
- Change:
- Remove:

#### Other

- Firefox Android's new privacy feature, Total Cookie Protection, stops companies from keeping tabs on your moves
  - https://blog.mozilla.org/en/mozilla/firefox-androids-new-privacy-feature-total-cookie-protection-stops-companies-from-keeping-tabs-on-your-moves/
- Expanding Mozilla's boards in 2023
  - https://blog.mozilla.org/en/mozilla/expanding-mozillas-boards-in-2023/
- Ad blocker roundup: 6 ad blockers to improve your internet experience
  - https://blog.mozilla.org/en/products/firefox/extensions-addons/ad-blocker-roundup-5-adblockers-that-improve-your-internet-experience/
- Email protection just got easier in Firefox
  - https://blog.mozilla.org/en/mozilla/email-protection-just-got-easier-in-firefox/
- Mozilla Launches Responsible AI Challenge
  - https://blog.mozilla.org/en/mozilla/mozilla-launches-responsible-ai-challenge/
- **Introducing Mozilla.ai: Investing in trustworthy AI**
  - https://blog.mozilla.org/en/mozilla/introducing-mozilla-ai-investing-in-trustworthy-ai/
- Mozilla Launches Responsible AI Challenge - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2023/03/mozilla-launches-responsible-ai-challenge/
- Surf with more Perf(ormance) - These Weeks in Firefox: Issue 133 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2023/03/07/surf-with-more-performance-these-weeks-in-firefox-issue-133/

### Safari 動向

#### Stable: 16.3

#### Updates

- **Release Notes for Safari Technology Preview 165**
  - https://webkit.org/blog/13932/release-notes-for-safari-technology-preview-165/
  - **Added support for `text-transform: full-size-kana` (260307@main)**
  - Added support for `x` units in `calc()` function (260678@main)
  - **Added support to `image-set()` for resolution and type as optional arguments (260796@main)**
  - Added support for RegExp Duplicate Named Capture Groups (260692@main)
  - **Added `Headers.prototype.getSetCookie`. (260533@main)**
  - **Added support for `link rel=modulepreload` (260761@main, 260709@main, 260659@main)**
- **Release Notes for Safari Technology Preview 166**
  - https://webkit.org/blog/13964/release-notes-for-safari-technology-preview-166/
  - **Enabled `@counter-style` by default (261182@main, 260912@main, 261135@main)**
  - **Enabled CSS `contain-intrinsic-size` by default (261185@main)**
  - Implemented `text-transform: full-width` (261211@main)
  - Implemented RegExp `v` flag with set notation and properties of strings (261188@main)
  - **Enabled the `popover` attribute (261193@main)**
  - Implemented `[popover=auto]` and light dismiss behavior (261093@main)
  - **Added support for `preconnect` via HTTP early hints (261079@main)**
  - Added Cancel, Unknown, and Clear keycodes (261008@main)
  - Added selection API that works across shadow boundaries (261021@main)
  - Added support for `largeBlob` extension for the local authenticator (260958@main)
  - Adjusted text input `scrollWidth` and `scrollHeight` to include padding and any whitespace added by decorations (261121@main)
- **Enabling the Inspection of Web Content in Apps**
  - https://webkit.org/blog/13936/enabling-the-inspection-of-web-content-in-apps/

####

#### Other

- **Issues · WebKit/standards-positions**
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+is%3Aclosed+closed%3A%3E2023-02-28+
  - 今後は定期観測していく

### Edge 動向

#### Stable:

#### Updates

#### Chakra

#### Other

- Attack Techniques: Open Redirectors, CAPTCHAs, Site Proxies, and IPFS, oh my - text/plain
  - https://textslashplain.com/2023/03/16/attack-techniques-open-redirectors-captchas-site-proxies-and-ipfs-oh-my/
- Improving Native Message Host Reliability on Windows - text/plain
  - https://textslashplain.com/2023/03/16/improving-native-message-host-reliability-on-windows/
- Going Electric - Solar - text/plain
  - https://textslashplain.com/2023/03/20/going-electric-solar/
- Attack Techniques: Spoofing via UserInfo - text/plain
  - https://textslashplain.com/2023/03/22/attack-techniques-spoofing-via-userinfo/
- **How Microsoft Edge Updates - text/plain**
  - https://textslashplain.com/2023/03/25/how-microsoft-edge-updates/
- **Taking control of your application's title bar**
  - https://blogs.windows.com/msedgedev/2023/03/14/taking-control-of-your-applications-title-bar/
- **Video super resolution in Microsoft Edge**
  - https://blogs.windows.com/msedgedev/2023/03/08/video-super-resolution-in-microsoft-edge/

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - **First Public Working Draft: CSS Animations Level 2**
    - https://www.w3.org/blog/news/archives/9854
- Chartering
- Declarative Dynamic Extensions to HTML Community Group Proposed
  - https://lists.w3.org/Archives/Public/public-new-work/2023Mar/0003.html
- CV 3.0 - Global Resume Community Group created
  - https://lists.w3.org/Archives/Public/public-new-work/2023Mar/0001.html
- Data-Centric Digital Rights (DCDR) Framework Community Group Proposed
  - https://lists.w3.org/Archives/Public/public-new-work/2023Mar/0000.html
- Proposed W3C Charter: Web Machine Learning Working Group
  - https://lists.w3.org/Archives/Public/public-new-work/2023Mar/0002.html
- Data-Centric Digital Rights (DCDR) Framework Community Group created
  - https://lists.w3.org/Archives/Public/public-new-work/2023Mar/0005.html
- Advance notice: Work in progress on Publishing Maintenance Working Group Charter
  - https://lists.w3.org/Archives/Public/public-new-work/2023Mar/0006.html
- Autonomous Agents on the Web Community Group created
  - https://lists.w3.org/Archives/Public/public-new-work/2023Mar/0008.html
- Working Group Note: EPUB Type to ARIA Role Authoring Guide 1.1
  - https://www.w3.org/blog/news/archives/9857

#### Other

- **popover attribute may not be web compatible · Issue #9042 · whatwg/html**
  - https://github.com/whatwg/html/issues/9042
    - WebKit が Popover API を試験実装したところ、サイトが壊れたと報告があった
    - `popover` 属性の UA スタイルシートに `display: none` が追加されたため
- **Add the `<search>` element · whatwg/html@c598ff0**
  - https://github.com/whatwg/html/commit/c598ff023f081dd3f03b2e43177a632fb7dc92ec
    - `role="search"` に対応する新しい HTML 要素が追加された
- **Workshop overview - W3C Workshop Secure the Web Forward**
  - https://www.w3.org/2023/03/secure-the-web-forward/
    - 2023 年 6 月 7 日/8 日開催
- Upcoming W3C Workshop: Secure the Web Forward
  - https://www.w3.org/blog/news/archives/9860
- W3C welcomes feedback on the beta of its new website
  - https://www.w3.org/blog/news/archives/9851
- **Add `URL.canParse()` by annevk · Pull Request #763 · whatwg/url**
  - https://github.com/whatwg/url/pull/763

### IETF 動向

#### WG

- IETF
  - https://datatracker.ietf.org/meeting/
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
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

### TC39 動向

- Meeting のある月はステージの移動のみ見る
- 翌月に公開された Note だけを見る

#### Meeting

- 2023-01
  - https://github.com/tc39/agendas
  - https://github.com/tc39/notes

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2023-01-01}...main@{2023-02-01}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->3
- 3->4

#### New Proposals

#### Other

### WinterCG 動向

- Meeting や大きな動きがあった月だけやる

#### Meeting

- 2023-03-09 Meeting
  - https://github.com/wintercg/admin/issues/49
  - Discussed: Server Functions Next steps
    - No updates
  - Discussed: AsyncContext
    - Spec definition is available at https://tc39.es/proposal-async-context/
  - Discussed: GetSetCookie status
    - Implemented in WebKit and Intent to ship in Chromium.
  - Needs Review:
    - Common-minimum API subset in the ShadowRealm:
    - Explore relationship with ShadowRealms, `[Exposed=*]` proposal-common-minimum-api#21
    - CM-API should be a superset of the APIs exposed in the ShadowRealm
  - Fetch:
    - Relax forbidden header restrictions for non-browser runtimes: Relax forbidden header restrictions for non-browser runtimes fetch#19
  - @andreubotella: preview of blog post
    - https://preview-andreubotella-com.deno.dev/blog/wintercg/

### CDN 動向

#### Cloudflare

- **無料であるべきポスト量子暗号を永久に無料で提供します**
  - https://blog.cloudflare.com/ja-jp/post-quantum-crypto-should-be-free-ja-jp/
- Mutual TLS now available for Workers
  - https://blog.cloudflare.com/mtls-workers/
- The White House's National Cybersecurity Strategy asks the private sector to step up to fight cyber attacks. Cloudflare is ready
  - https://blog.cloudflare.com/the-white-houses-national-cybersecurity-strategy-asks-the-private-sector-to-step-up-to-fight-cyber-attacks-cloudflare-is-ready/
- **Security Week 2023 へようこそ**
  - https://blog.cloudflare.com/ja-jp/welcome-to-security-week-2023-ja-jp/
- 最もフィッシング攻撃されやすいブランド上位 50 件と、フィッシングから社員を守るために使える新しいツール
  - https://blog.cloudflare.com/ja-jp/50-most-impersonated-brands-protect-phishing-ja-jp/
- The state of application security in 2023
  - https://blog.cloudflare.com/application-security-2023/
- Cloudflare Fraud Detection の発表
  - https://blog.cloudflare.com/ja-jp/cloudflare-fraud-detection-ja-jp/
- Analyze any URL safely using the Cloudflare Radar URL Scanner
  - https://blog.cloudflare.com/radar-url-scanner-early-access/
- Protect your key server with Keyless SSL and Cloudflare Tunnel integration
  - https://blog.cloudflare.com/protect-your-key-server-with-keyless-ssl-and-cloudflare-tunnel-integration/
- No, AI did not break post-quantum cryptography
  - https://blog.cloudflare.com/kyber-isnt-broken/
- Security Week 2023 で見逃したかもしれない内容のまとめご用意しました
  - https://blog.cloudflare.com/ja-jp/security-week-2023-wrap-up-ja-jp/
- The quantum state of a TCP port
  - https://blog.cloudflare.com/the-quantum-state-of-a-tcp-port/
- **Out now! Auto-renew TLS certificates with DCV Delegation**
  - https://blog.cloudflare.com/introducing-dcv-delegation/

#### Fastly

- **ネット上のプライバシーを強化する Oblivious HTTP | Fastly**
  - https://www.fastly.com/jp/blog/enabling-privacy-on-the-internet-with-oblivious-http

#### Other

- DDoS Attacks in 2022: Targeting Everything Online, All at Once | Akamai
  - https://www.akamai.com/blog/security/ddos-attacks-in-2022-targeting-everything-online
- Akamai Mitigates Record DDoS Attack in Asia-Pacific (900 Gbps) | Akamai
  - https://www.akamai.com/blog/security/record-breaking-ddos-in-apac
- Attack Superhighway: A Deep Dive on Malicious DNS Traffic | Akamai
  - https://www.akamai.com/blog/security/a-deep-dive-on-malicious-dns-traffic
- What Proposed New Changes in the OWASP API Security Top 10 Mean for You | Akamai
  - https://www.akamai.com/blog/security/proposed-new-changes-in-owasp-api-security

### セキュリティ動向

### 周辺動向

- **Intent To Ship on Twitter: "The admin of this account has been permanently suspended from Twitter"**
  - https://twitter.com/intenttoship/status/1636087416959258625
  - ブラウザの Intent to Ship をウォッチするボットを作っている人のアカウントがサスペンドされた
- Be a Part of Web Engines HackFest 2023 | Igalia
  - https://www.igalia.com/2023/03/07/Be-a-Part-of-Web-Engines-HackFest-2023.html
- The Igalia 2023 Coding Experience Program | Igalia
  - https://www.igalia.com/2023/03/15/The-Igalia-2023-Coding-Experience-Program.html

### イベント

- 3 月
  - 25-31: IETF116 Yokohama
    - https://www.ietf.org/how/meetings/116/
- 4 月
- 5 月
  - 10: Google I/O
    - https://io.google/2023/
  - 25: SecWeb
    - https://secweb.work/2023.html
- 6 月
  - 7-8: W3C Workshop Secure the Web Forward
    - https://www.w3.org/2023/03/secure-the-web-forward/

### Wrap Up

- Chrome
  - 111
    - View Transitions API
    - CSS Color Level 4
  - 112 Beta
    - CSS Nesting
    - FormData `submitter`
    - RegExp `v` flag
    - Skip SW noop fetch handler
  - Ship
    - First-party Sets
    - Storage Access API
    - requestStorageAccessFor
    - Private State Tokens
    - Skip service worker no-op fetch handler
    - Popover
  - Prototype
    - CSS leding-trim
    - Compression dictionary transport with Shared Brotli
    - `popover="hint"`
  - other intents
    - gradually skip unload events
  - Google Developer Blog
    - I/O 2023
  - Chrome Developers
    - SPA View Transitions
    - OHTTP relay for FLEDGE with Fastly
    - Web SQL to SQLite Wasm
- Firefox
  - 111
    - OPFS
    - FormData `submitter`
  - Ship
    - Change array by copy
    - inert
    - `:nth-child( of S)`
    - CSS Color Level 4
  - Prototype
    - Async Clipboard API read/write/readText
    - prefers-reduced-transparency
    - CSS Custom Highlight API
  - other
    - Mozilla.ai
- Safari
  - TP 165
    - `text-transform: full-size-kana`
    - CSS `image-set()`
    - `Headers.getSetCookie()`
    - `link rel="modulepreload"`
  - TP 166
    - CSS `@counter-style`
    - `contain-intrinsic-size`
    - Popover
    - `preconnect` via Early Hints
- Edge
  - How Microsoft Edge Updates - text/plain
  - Taking control of your application's title bar
  - Video super resolution in Microsoft Edge
- W3C/WHATWG
  - Spec
  - other
    - popover 属性で壊れるサイト発覚
    - `<search>` element 追加
    - Secure the Web Forward workshop 開催告知
    - URL.canParse()
- IETF
- TC39
- WinterCG
  - AsyncContext の Proposal が tc39 に
  - GetSetCookies が Webkit/Chromium に
- CDN 動向
  - Cloudflare: ポスト量子暗号を永久無料提供
  - Cloudflare: Security Week 20223
  - Cloudflare: TLS の Domain Control Validation を肩代わりする機能
  - Fastly: OHTTP と Fledge のブログ
- セキュリティ動向
- 周辺動向
  - Intent2Ship bot の中の人が twitter 垢 BAN された
