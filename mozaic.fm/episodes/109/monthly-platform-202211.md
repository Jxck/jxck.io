---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep109.mp3
published_at: 2022-11-27
guest: [@myakura](https://twitter.com/myakura)
---

# ep109 Monthly Platform 202211

## Theme

第 109 回のテーマは 2022 年 11 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 107

#### Updates

#### Intents

- **Ship: Methods that change Array and TypedArray by copy**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ptKolvGLGWY
  - toReserved/toSorted/toSpliced/with など
- Ship: Private network access warnings for workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dZXuQB3P-nY
- Ship: Quick intensive timer throttling of loaded background pages
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5SZB2CFFGqE
- Ship: Restrict "private network requests" for subresources to secure contexts.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cPiRNjFoCag
- **Ship: Symbols as WeakMap keys**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/E6pDZP_TiBA
- Ship: Resizable ArrayBuffer and growable SharedArrayBuffer
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UKnQgsR0kgY
- **Ship: TLS ClientHello extension permutation**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bYZK81WxYBo
  - TLS の拡張の順番が固定されているためランダムにする
  - 将来 Ossification が発生するのを防ぐため
- Ship: web-share permission policy
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/s22QQi9Fa0E
- **Ship: CSS Initial Letters**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1chZ62qRzIY
  - 先頭の文字サイズを大きくする機能
- **Ship: Expose Reporting API interfaces to JavaScript**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/j7vOAkMbu_M
  - ReportingObserver 周りの Interface で公開されてないものがあったので公開した
- **Ship: Media Session API: Presenting slides actions**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bjoGBvcwi7o
  - Slide の次/前ボタンが使えるようになる
- **Prototype: View Transition Same-Origin Navigation**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eTnrzZ4UxLE
  - 旧 Shared Element Transition が再スタート
- Prototype: Canvas Floating Point Color Types
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/9ELUYZNp644
- **Prototype: Inactive document invalidation API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qap6ReP3lDw
  - Logout 後など inactive なドキュメントを宣言的に表現する API
  - CCNS 使うと BFCache から漏れるので使わないで済むように
- **Prototype: Incoming Call Notifications**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PtHemJah2Qc
  - 通話を受け取った時の UI を Notifications API でも実現したい
- **Prototype: WebSockets over HTTP/3**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KOupRe29WhY
- Prototype: Speculation rules referrer policy key
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qzElfWpzWXg
- **Experiment: Dark mode support for web apps v2**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/1uKxZUFUQsU
- Extend Experiment 2: Dark mode support for web apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WqIBRabU3C0
- Experiment: CSS Initial Letters
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zV9K3hdBwDM
- Extend Origin Trial (again): Trial for SharedArrayBuffers in non-isolated pages on Desktop platforms
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/V2exDBMXw3U
- **Extend Origin Trial: Trial for SharedArrayBuffers in non-isolated pages on Desktop platforms**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OLbI-axDyH0
  - Site Isolation が完全でなくても SAB を緩和できる方法を 3 つ
  - 1. COEP:credentialless
  - 2. COOP same-origin-allow-popups-plus-coep
  - 3. Anonymous iframes
- Remove: ImageEncodeOptions colorSpace and pixelFormat
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pZkPEEkqZn4
- We're just 1 week away from BlinkOn 17!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Wc55togW0mc
- Increased OT limit request for Privacy Sandbox Ads APIs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TgQfRctYN7M
- [Action Requested] Thank you for attending BlinkOn 17!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ehx92d1qrXY
- [blink-dev] BlinkOn 17 is tomorrow!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LBKij45Iq6I
- PSA: Exclusive lock on `removeEntry()` in File System Access API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ddrh_bI1stY

#### V8

#### Other

- web.dev
  - **Building Chrometober!**
    - https://web.dev/building-chrometober/
  - **New to the web platform in October**
    - https://web.dev/web-platform-10-2022/
  - New patterns for media apps
    - https://web.dev/new-patterns-for-media-apps/
  - Speedy CSS Tip! Animated Gradient Text
    - https://web.dev/speedy-css-tip-animated-gradient-text/
  - **Accessibility Week**
    - https://web.dev/accessibility-week-2022/
- google developer blog
  - https://developers.googleblog.com/
- google developer japan blog
  - Google Developers Japan: Chrome 107 ベータ版 : Screen Capture API の機能追加、 CSS grid-template プロパティ補間など
    - https://developers-jp.googleblog.com/2022/10/chrome-107-beta.html
  - Google Developers Japan: Android と Chrome にパスキーを導入
    - https://developers-jp.googleblog.com/2022/11/bringing-passkeys-to-android-and-chrome.html
  - Google Developers Japan: Chrome 108 ベータ版 : CSS の新しいビューポートの単位、 Federated Credential Management API 、可変 COLRv1 フォントなど
    - https://developers-jp.googleblog.com/2022/11/chrome-108-beta.html
  - Google Developers Japan: Google Password Manager のパスキーのセキュリティ
    - https://developers-jp.googleblog.com/2022/11/security-of-passkeys.html
- chrome developer blog
  - **Chrome Web Store Policy Updates**
    - https://developer.chrome.com/en/blog/cws-policy-revamp/
  - **Not all storage is created equal: introducing Storage Buckets**
    - https://developer.chrome.com/en/blog/storage-buckets/
  - **Federated Credential Management API is shipping**
    - https://developer.chrome.com/en/blog/fedcm-shipping/
  - DevTools Tips: Faster DevTools navigation
    - https://developer.chrome.com/en/blog/devtools-tips-2/
  - Expanding Privacy Sandbox for the Web testing into 2023
    - https://developer.chrome.com/en/blog/expanding-privacy-sandbox-testing-2023/
  - DevTools Tips: Identify CSS improvements
    - https://developer.chrome.com/en/blog/devtools-tips-1/
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- **Introducing our new guide to Google Search ranking systems | Google Search Central Blog**
  - https://developers.google.com/search/blog/2022/11/introducing-guide-to-ranking-systems
- BlinkOn 17
  - **[EXTERNAL] Schedule - BlinkOn 17 - Google Sheets**
    - https://docs.google.com/spreadsheets/d/1xtqACFzmdgJZD0RYxiLNJNcUQzf2D-WGWO8b-up-FJM/preview
  - BlinkOn 17 - Sunnyvale + Virtual - YouTube
    - https://www.youtube.com/playlist?list=PL9ioqAuyl6UK-7T_fmKuIwrvH9oMm57ep
- **1178058 - JPEG XL decoding support (image/jxl) in blink (tracking bug) - chromium**
  - https://bugs.chromium.org/p/chromium/issues/detail?id=1178058#c84
    - フラグ付きで実装されていた JPEG XL が削除された
    - 十分な関心を持たれなかったといった説明
    - Meta, Cloudinary, Adobe などが関心を持っており、強い反発が

### Firefox 動向

#### Stable: 107

#### Updates

- Firefox 107.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/107.0/releasenotes/
- Firefox 107 for developers - Mozilla | MDN
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/107
  - `contain-intrinsic-size`
- These Weeks in Firefox: Issue 127 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/11/22/more-improvements-than-can-fit-into-this-title-these-weeks-in-firefox-issue-127/

#### Intents

- **Ship (in Nightly only): Mixed Content Level 2 upgrading of image, audio and video**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/hEwtZEF47NY
- **Ship: Add-On-Gated WebMIDI**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/15O04X2jE28
    - Site Permission Addon を入れると使える
    - https://github.com/mozilla/standards-positions/pull/704
- **Prototype & ship: Origin Private File System API (OPFS)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/dsRxP4liTek
- Searchfox Update: Searchfox's feud with JS #hashtags is now over!
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/G4zaAEYlIG8

#### Other

- 4 ways a Firefox account comes in handy
  - https://blog.mozilla.org/en/products/firefox/firefox-tips/firefox-account-password-manager-bookmarks-credit-card-autofill/
- **Improving Firefox stability with this one weird trick - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2022/11/improving-firefox-stability-with-this-one-weird-trick/
- **Revamp of MDN Web Docs Contribution Docs - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2022/10/revamp-of-mdn-web-docs-contribution-docs/
  - MDN の Contribution Docs を更新する

### Safari 動向

#### Stable: 16.1

#### Updates

- **Release Notes for Safari Technology Preview 157**
  - https://webkit.org/blog/13575/release-notes-for-safari-technology-preview-157/
  - Web Inspector
    - Added support for event breakpoints to be case-insensitive and regular expression matching
  - CSS
    - Added support for font-synthesis longhand properties
    - Added support for last baseline alignment for CSS Grid
    - Added support for last baseline alignment for Flexbox containers
    - **Added support for lh and rlh units**
    - Added margin when computing the baseline position for tables
  - Rendering
  - JavaScript
    - Added support for class static initialization blocks
  - WebCodecs
    - **Added support for WebCodecs encoder bitrate related parameters**
    - **Added support for WebCodecs video encoder flush**
    - **Added support for WebCodecs Validate VideoFrameInit algorithm**
    - **Added support for WebCodecs VideoFrame allocationSize**
    - **Added support for WebCodecsVideoEncoder**
    - **Added support for WebCodecsVideoDecoder**
    - **Added support for WebCodecs VideoFrame copyTo**
    - **Added support for WebCodecsVideoDecoder with VPx backend**
    - **Added support for AVC H.264 WebCodecsVideoEncoder and WebCodecsVideoDecoder**
    - **Added support for GPU-based WebCodecsVideoDecoder flush**
    - Added cropping support to WebCodecsVideoFrame copyTo
    - Added initial implementation to VideoFrame
    - Added support for RGBX and BGRX pixel formats
    - Added WebCodecs VideoFrame support for createImageBitmap
  - Web API
    - Added support for `CSSNumericValue.toSum()`
    - Added support for `CSSNumericValue.parse()`
    - Added support for `CSSTransformValue.toMatrix`
    - Added support for EXT_provoking_vertex draft extension
    - **Added support for the Sec-Fetch-Site header**
    - Added support for cancel event support on `<input type=file>`
    - **Added support for referrerpolicy in link headers**
    - Added a log channel for IntersectionObserver
    - Added the class FilterTargetSwitcher
  - Media
    - Accept `image/jpg` for compatibility
  - Web Animations
  - HTML
    - Added the display of a thumbnail of selected file for `<input type=file>` on macOS
  - Accessibility
    - Fixed accessibility for the meter and progress elements when -webkit-appearance: none or appearance: none is set
    - Fixed accessibility to not limit navigation when focus is explicitly moved outside of a modal
    - Fixed a bug causing VoiceOver to double-read list markers and not output braille for list items
  - Security
    - Fixed `Cross-Origin-Embedder-Policy` incorrectly blocking scripts on a cache hit
  - Privacy
    - **Capped cookie lifetimes to 7 days for responses from third-party IP addresses**
  - Safari Web Extensions
- **Release Notes for Safari Technology Preview 158**
  - https://webkit.org/blog/13584/release-notes-for-safari-technology-preview-158/
  - Web Inspector
    - Added support for editing @-rules in the Styles sidebar of the Elements tab
  - CSS
    - Implemented CSS font-size-adjust property
    - Implemented font-variant-alternates functions, along with matching @font-feature-values at-rule
    - Implemented CSS property contain-intrinsic-size behind a flag
  - Rendering
  - Media
    - Enabled AVIF image decoding for macOS Monterey and macOS Big Sur
  - JavaScript
    - Accelerated Array.prototype.slice on DirectArguments
    - Accelerated Array.prototype.concat when applied to the self array
  - WebCodecs
    - Enabled WebCodecs by default
    - Added WebCodecsVideoFrame initial support for serialization and transfer
  - Web API
    - Aligned fetch header handling with fetch specification

#### Other

### Edge 動向

#### Stable: 107

#### Updates

#### Chakra

#### Other

- **Developer Survey | Browser-Extensions**
  - https://forms.office.com/pages/responsepage.aspx?id=v4j5cvGGr0GRqy180BHbR3RyKfbQaBBGkxWFdiHDHbVURDI5RTNFNzlCUFlMV0VTUEw1U1VEWjROMS4u
- "Not Secure" Warning for IE Mode - text/plain
  - https://textslashplain.com/2022/11/16/not-secure-warning-for-ie-mode/

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
  - W3C Invites Implementations of WebXR Augmented Reality Module - Level 1
    - https://www.w3.org/blog/news/archives/9735
  - W3C Invites Implementations of Core Accessibility API Mappings 1.2
    - https://www.w3.org/blog/news/archives/9745
- Working Draft
- First Public Working Draft
  - W3C Invites Implementations of WebXR Augmented Reality Module - Level 1
    - https://www.w3.org/blog/news/archives/9735
  - W3C Invites Implementations of Core Accessibility API Mappings 1.2
    - https://www.w3.org/blog/news/archives/9745
  - **CSS Snapshot 2022 Draft Note Published**
    - https://www.w3.org/blog/news/archives/9751
    - CSS Snapshot 2022
      - https://www.w3.org/TR/2022/DNOTE-css-2022-20221122/
      - CSS の各仕様の成熟度合いをまとめている
      - 仕様書として CR に達してはいないが、機能として成熟している個々の機能リストも
  - First Public Working Draft: RDF Dataset Canonicalization
    - https://www.w3.org/blog/news/archives/9753
- Chartering

#### Other

- **W3C opens Technical Architecture Group (TAG) election**
  - https://www.w3.org/blog/news/archives/9741
  - https://www.w3.org/2022/11/15-tag-nominations
  - https://tess.oconnor.cx/2022/11/TAG
  - https://tag.w3.org/workmode/
    - 3 席を改選
      - Brandon Baraban (Koodos Labs)
      - Alice Boxhall (Igalia)
      - Amy Guy (Digital Bazaar)
      - Theresa O'Connor (Apple, Inc.)
      - Martin Thomson (Mozilla Foundation)
      - Lea Verou (W3C Invited Expert)
      - Song XU (China Mobile)
- **An iframe whose history can be transferred across parent navigations · Issue #8538 · whatwg/html**
  - https://github.com/whatwg/html/issues/8538
  - 画面遷移しても継続される iframe の提案
  - チャットやメディア再生を継続したい
- **Teleconference Agenda for Nov. 16th, 2022**
  - https://lists.w3.org/Archives/Public/public-webappsec/2022Nov/0001.html
- W3C Workshop on Permissions
  - https://www.w3.org/Privacy/permissions-ws-2022/schedule

### TC39 動向

#### Meeting

- 2022-11
  - https://github.com/tc39/agendas/blob/main/2022/11.md
  - https://github.com/tc39/notes

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2022-11-01}...main@{2022-12-01}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->3
- 3->4

#### New Proposals

#### Other

### IETF 動向

#### WG

- IETF
  - https://datatracker.ietf.org/meeting/
  - **IETF115 minutes を見る - twitter spaces**
    - https://twitter.com/mozaicfm/status/1590678119681511427
    - https://twitter.com/mozaicfm/status/1593212795377815557
- httpwg
  - https://lists.w3.org/Archives/Public/ietf-http-wg/
  - https://github.com/httpwg/wg-materials/
  - **Cookies Having Independent Partitioned State (CHIPS)**
    - https://github.com/httpwg/wg-materials/blob/gh-pages/ietf115/partitioned-cookies.pdf
  - **DRAFT minutes from London**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022OctDec/0139.html
    - HTTP Working Group Minutes - IETF 115
      - https://httpwg.org/wg-materials/ietf115/minutes.html
  - **Addressing WGLC Issues for Signatures**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022OctDec/0119.html
  - **Working Group Last Call: Client-Cert HTTP Header Field**
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022OctDec/0087.html
- quicwg
  - https://mailarchive.ietf.org/arch/browse/quic/
  - https://github.com/quicwg/wg-materials
  - Copie de IETF-115 - Multipath extension for QUIC
    - https://datatracker.ietf.org/meeting/115/materials/slides-115-quic-multipath-00
  - QUIC Ack Frequency - November 2022
    - https://datatracker.ietf.org/meeting/115/materials/slides-115-quic-ack-frequency-00
  - QUIC Reliable Stream Resets
    - https://datatracker.ietf.org/meeting/115/materials/slides-115-quic-reliable-stream-reset-00
- webtrans
  - https://mailarchive.ietf.org/arch/browse/webtransport/
  - https://github.com/DavidSchinazi/webtrans-wg-materials
- tlswg
  - https://mailarchive.ietf.org/arch/browse/tls/
  - https://github.com/tlswg/wg-materials
  - **A well-known URL for publishing ECHConfigLists**
    - https://datatracker.ietf.org/meeting/115/materials/slides-115-tls-well-known-for-ech
    - ECH Config を well-known に置く
- wpack
  - https://mailarchive.ietf.org/arch/browse/wpack/
- masque
  - **Access Descriptions @ IETF 115**
    - https://datatracker.ietf.org/meeting/115/materials/slides-115-masque-http-access-service-description-urls
    - DNS や Proxy の定義を毎回入れるのは面倒なので JSON にまとめる
    - Masque っぽくないので dispatch する
- pearg
- privacypass
- dispatch
  - https://mailarchive.ietf.org/arch/browse/dispatch/
- secdispatch
  - https://mailarchive.ietf.org/arch/browse/secdispatch/
- ohai
  - DoubleCheck OHAI @ IETF 115
    - https://datatracker.ietf.org/meeting/115/materials/slides-115-ohai-doublecheck-for-oblivious-http-and-beyond

#### Other

- **The HTTP Workshop**
  - https://httpwork.shop/
- **HTTP Workshop 2022 - day 1 | daniel.haxx.se**
  - https://daniel.haxx.se/blog/2022/11/02/http-workshop-2022-day-1/
  - Welcome to the HTTP Workshop
    - https://github.com/HTTPWorkshop/workshop2022/blob/main/talks/intro.pdf
  - No-Vary-Search
    - https://github.com/HTTPWorkshop/workshop2022/blob/main/talks/no-vary-search.pdf
  - New Stuff in HTTP
    - https://github.com/HTTPWorkshop/workshop2022/blob/main/talks/new-stuff.pdf
  - Cookies
    - https://github.com/HTTPWorkshop/workshop2022/blob/main/talks/cookies.pdf
- Workshop season 5 episode 2 | daniel.haxx.se
  - https://daniel.haxx.se/blog/2022/11/03/workshop-season-5-episode-2/
- thehttpworkshop2022-day3.txt | daniel.haxx.se
  - https://daniel.haxx.se/blog/2022/11/03/thehttpworkshop2022-day3-txt/
  - **Making a HTTP client good**
    - https://github.com/HTTPWorkshop/workshop2022/blob/main/talks/client-api.pdf
    - adobe/fetch が紹介されてた
      - adobe/fetch: Simplified HTTP/1(.1) and HTTP/2 requests with Server Push Support
        - https://github.com/adobe/fetch

### CDN 動向

#### Cloudflare

- Speed & Reliability
  - **How the Brazilian Presidential elections affected Internet traffic**
    - https://blog.cloudflare.com/how-the-brazilian-presidential-elections-affected-internet-traffic/
  - **Protecting election groups during the 2022 US midterm elections**
    - https://blog.cloudflare.com/protecting-election-groups-during-the-2022-us-midterm-elections/
  - 2022 US midterm elections attack analysis
    - https://blog.cloudflare.com/2022-us-midterm-elections-attack-analysis/
  - **Why BGP communities are better than AS-path prepends**
    - https://blog.cloudflare.com/prepends-considered-harmful/
  - **An early look at Thanksgiving 2022 Internet trends**
    - https://blog.cloudflare.com/an-early-look-at-thanksgiving-2022-internet-trends/
- Security
  - **Cloudflare is not affected by the OpenSSL vulnerabilities CVE-2022-3602 and CVE-2022-3786**
    - https://blog.cloudflare.com/cloudflare-is-not-affected-by-the-openssl-vulnerabilities-cve-2022-3602-and-cve-2022-37/
  - Bringing authentication and identification to Workers through Mutual TLS
    - https://blog.cloudflare.com/mutual-tls-for-workers/
- Developers
  - Announcing the first Workers Launchpad cohort and growth of the program to $2 billion
    - https://blog.cloudflare.com/launchpad-fall-22/
  - **The road to a more standards-compliant Workers API**
    - https://blog.cloudflare.com/standards-compliant-workers-api/
  - The Cloudflare API now uses OpenAPI schemas
    - https://blog.cloudflare.com/open-api-transition/
- Deep Dive

#### Fastly

- What is a DDoS attack? | Fastly
  - https://www.fastly.com/blog/what-is-a-ddos-attack
- Announcing Rate Limiting Expansion for Next-Gen WAF | Fastly
  - https://www.fastly.com/blog/announcing-rate-limiting-expansion-for-next-gen-waf
- Fast Forward: Let's build the good internet together | Fastly
  - https://www.fastly.com/blog/fast-forward-lets-build-the-good-internet-together
- **Is it Time for ECDSA Certificates? | Fastly**
  - https://www.fastly.com/blog/is-it-time-for-ecdsa-certificates
- Introducing Cloud WAF Terraform Support | Fastly
  - https://www.fastly.com/blog/introducing-cloud-waf-terraform-support

#### Other

### セキュリティ動向

- **暗号化とはなにか、なぜケニア人は暗号化を使い続けねばならないのか | p2ptk[.]org**
  - https://p2ptk.org/privacy/4104
  - ケニアの新大統領が「政府が国民のプライベートな通信をスパイすることはなく、エンドツーエンド暗号化(E2EE)メッセージングプラットフォームは不要だ」と宣言した。
  - それでも使った方が良いという記事
  - No need for Signal, WhatsApp when I'm in charge - President-elect Ruto | Nation
    - https://nation.africa/kenya/news/politics/no-need-for-signal-whatsapp-president-elect-ruto-3917538
    - 元のスピーチに関する記事

### 周辺動向

- **Investigation into cloud gaming and browsers to support UK tech and consumers - GOV.UK**
  - https://www.gov.uk/government/news/investigation-into-cloud-gaming-and-browsers-to-support-uk-tech-and-consumers
- **Google Fonts Blog: Your Privacy and Google Fonts**
  - https://fonts.googleblog.com/2022/11/your-privacy-and-google-fonts.html
  - プライバシーとデータ収集 | Google Fonts | Google Developers
    - https://developers.google.com/fonts/faq/privacy
- **WebKit Contributors Meeting 2022 | Igalia**
  - https://www.igalia.com/2022/11/08/WebKit-Contributors-Meeting-2022.html
  - Igalia/WebKit Contributors Meeting 2022 - YouTube
    - https://www.youtube.com/watch?v=2eg4ue9Rpuk
- The Wolvic Vision | Igalia
  - https://www.igalia.com/2022/11/03/The-Wolvic-Vision.html
- **Igalia at BlinkOn 17 | Igalia**
  - https://www.igalia.com/2022/11/02/Igalia-at-BlinkOn-17.html
- **What Comes After Chrome**
  - https://browsercompany.substack.com/p/what-comes-after-chrome
    - Netscape, Chrome の重鎮 Darin Fisher が The Browser Company に入った
- **Sapling: Source control that's user-friendly and scalable**
  - https://engineering.fb.com/2022/11/15/open-source/sapling-source-control-scalable/
  - Git 互換の独自ソース管理ツール
- Reducing Instagram's basic video compute time by 94 percent
  - https://engineering.fb.com/2022/11/04/video-engineering/instagram-video-processing-encoding-reduction/
- Improving Instagram notification management with machine learning and causal inference
  - https://engineering.fb.com/2022/10/31/ml-applications/instagram-notification-management-machine-learning/
- Tulip: Schematizing Meta's data platform - Engineering at Meta
  - https://engineering.fb.com/2022/11/09/developer-tools/tulip-schematizing-metas-data-platform/
- Move faster, wait less: Improving code review time at Meta
  - https://engineering.fb.com/2022/11/16/culture/meta-code-review-time-improving/
- How Precision Time Protocol is being deployed at Meta
  - https://engineering.fb.com/2022/11/21/production-engineering/precision-time-protocol-at-meta/
- PTP: Timing accuracy and precision for the future of computing
  - https://engineering.fb.com/2022/11/21/production-engineering/future-computing-ptp/
- **Facebook Plans To Cut Instant Articles**
  - https://gizmodo.com/facebook-meta-news-instant-articles-1849660590
  - Facebook が Instant Articles を来年 4 月にはやめるとメールで案内

### イベント

- 11 月
  - 5-11: IETF 115 London
    - https://www.ietf.org/how/meetings/115/
  - 15-17: BlinkOn17
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/16LQXKmAD4s
  - 29-1: TC39
    - https://github.com/tc39/agendas/blob/main/2022/11.md
- 12 月
  - 5-6: W3C Workshop on Permissions
    - https://www.w3.org/Privacy/permissions-ws-2022/
- 1 月
- 2 月
- 3 月
  - 25-31: IETF116 Yokohama
    - https://www.ietf.org/how/meetings/116/

### Wrap Up

- Chrome
  - Ship
    - Change Array by copy
    - Symbols as WeakMap keys
    - TLS ClientHello extension permutation
    - CSS Initial Letters
    - Media Session slides actions
  - Prototype
    - View Transition Same-Origin Navigation
    - Inactive Document Invalidation API
    - Incoming Call Notifications
    - WebSocket over h3
  - Experiment
    - SAB in non-isolated pages
      - COEP credentialless
      - Cross-origin Isolated + popups
      - Anonymous iframes
  - web.dev
    - Building Chrometober
    - new to the web platform in October
      - AVIF
  - Chrome Developers
    - Storage Buckets
  - other
    - BlinkOn 17
    - JPEG XL support dropped
- Firefox
  - 107
    - contain-intrinsic-size
  - Ship
    - Mixed contents L2 upgrading image, audio, video
    - Addon-gated WebMIDI
    - OPFS
  - other
    - revamp MDN Contribution docs
- Safari
  - TP 157
    - CSS lh/rlh
    - WebCodecs
    - Sec-Fetch-Site
    - Cap Cookie lifetime to 7 days from 3rd-party IP addresses (CNAME Cloaking)
  - TP 158
    - contain-intrinsic-size
    - AVIF for Monterey and Big Sur
    - enable WebCodecs by default
- W3C/WHATWG
  - Spec
    - CSS Snapshot 2022
  - other
    - TAG election
    - agenda for Permissions Workshop
- TC39
  - Meeting も Stage 移動もなし
- IETF
  - IETF115 London
    - Well-known for ECHConfigList
    - DNS や Proxy の設定をまとめる JSON for Masque
  - HTTP Work Shop
    - HTTP Client を作る上でどういう API が良いのかという発表
      - ついでに abode/fetch が紹介されてた
- CDN 動向
  - CF: ブラジル選挙、大統領中間選挙、サンクスギビングのトラフィックレポート
  - CF: OpenSSL の CVE が BoringSSL 使ってるから影響なかった
  - CF: WinterWG の活動について
  - Fastly: ECDSA 証明書を使う理由
- セキュリティ動向
  - ケニアの大統領が「盗聴してないので E2EE する必要はない」と宣言
- 周辺動向
  - FB Instant Article 2023/4 にサポート終了
  - FB Git 互換のソース管理 Sapling 公開
  - Netscape, Chrome の重鎮 Darin Fisher が The Browser Company に入った
  - Igalia の BlinkOn と Webkit Contributors Meeting レポート
  - Google Fonts が IP のプライバシーに関する声明
  - CMA による Cloud Gaming の寡占に関するレポート
