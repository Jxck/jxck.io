# [monthly-web][mozaic.fm] ep71 Monthly Web 202008


## Info

audio: https://files.mozaic.fm/mozaic-ep71.mp3

published_at
: 2020-09-01

guest
: [@myakura](https://twitter.com/myakura)


## Theme

第 71 回のテーマは 2020 年 8 月の Monthly Web です。


## Show Note


### Chrome 動向

- Stable: 85
- Updates
  - *New in Chrome 85*
    - <https://developers.google.com/web/updates/2020/08/nic85>
    - Content Visibility
    - @property and CSS variables
    - Get installed related apps
    - App Icon Shortcuts
    - Origin Trial: Streaming requests with fetch()
  - *What's New In DevTools (Chrome 86)*
    - <https://developers.google.com/web/updates/2020/08/devtools>
    - New Media panel
    - Capture node screenshots via Elements panel context menu
    - Issues tab updates
    - Emulate missing local fonts
    - Emulate inactive users
    - Emulate prefers-reduced-data
    - Untitled ASIDE
    - Support for new JavaScript features
    - Lighthouse 6.2 in the Lighthouse panel
    - Deprecation of "other origins" listing in the Service Workers pane
    - Show coverage summary for filtered items
    - New frame detailed view in Application panel
    - Elements and Network panel updates
  - *Chromium Blog: Helping people spot the spoofs: a URL experiment*
    - <https://blog.chromium.org/2020/08/helping-people-spot-spoofs-url.html>
  - *Chromium Blog: Highlighting great user experiences on the mobile web*
    - <https://blog.chromium.org/2020/08/highlighting-great-user-experiences-on.html>
    - Fast Page バッチがでるように
  - Chromium Blog: Protecting Google Chrome users from insecure forms
    - <https://blog.chromium.org/2020/08/protecting-google-chrome-users-from.html>
  - *Chromium Blog: Chrome just got faster with Profile Guided Optimization*
    - <https://blog.chromium.org/2020/08/chrome-just-got-faster-with-profile.html>
    - Profile Guided Optimization が有効になり 10% 程度ページロードが高速化した
    - ビルドして一回タスクを動かして情報を集め最適化する
  - Google Developers Blog: Guidance to developers affected by our effort to block less secure browsers and applications
    - <https://developers.googleblog.com/2020/08/guidance-for-our-effort-to-block-less-secure-browser-and-apps.html>
  - Debugging memory leaks in WebAssembly using Emscripten
    - <https://web.dev/webassembly-memory-debugging/>
  - *Unblocking clipboard access*
    - <https://web.dev/async-clipboard/>
    - Async Clipboard API の実装が進んだので改めて紹介
    - テキストを扱う writeText()/readText()
    - 画像なども扱える write()/read()
    - パーミッション
      - Chrome はアクティブタブのみ
      - write はパーミッションのダイアログはない
      - read は clipboard-read が必要
  - Read and write from a serial port
    - <https://web.dev/serial/>
  - ARIA: poison or antidote?
    - <https://web.dev/aria-poison-or-antidote/>
  - *content-visibility: the new CSS property that boosts your rendering performance*
    - <https://web.dev/content-visibility/>
- Intents
  - *Ship: WebRTC Insertable Streams*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/XFO4OXrdSRA>
    - Mozilla / Safari は、鍵の交換を JS で行うべきではなく、プラットフォームにそこが統合されるべきで、それまでこの API を推奨する予定はない、もしくはそれまでの移行パスとしてこれを使うべきというスタンス。
    - Web / Framework developers のリンクが非常に充実している
  - Ship: Document-Policy: force-load-at-top (opt-out for text-fragment)
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/h6my3rcC628>
  - *Ship: Imperative Shadow DOM Distribution API*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/Jdw3VWbKvLY/>
    - 1. v0 と比べて v1 は明示的に slot を指定しないといけない
    - 2. condition を明示して slot を切り替えることができなかった
    - これに対応するため、`attachShadow({ mode: 'open', slotAssignment: 'manual' })` することで auto な slotAssign を止め、 `slot.assign()` で命令的にできるように。
  - Ship: Intl.Segmenter
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/MJ1OpvkcA8s>
  - *Ship: Native File System*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/9Fcpl2KVfbk>
  - Ship: Streams API: transferable streams
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/1LStSgBt6AM>
  - Ship: CSS quotes property - support 'auto' value
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/iqihcxi-CzY/m/U_0GkEoqCAAJ>
  - Ship: FileReader - Set Result Only on Load
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/b204isLEEyc/m/ySpOdyfzBwAJ>
  - Ship: CSS flow-relative shorthand and offset properties
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/E7f_WZOcTgQ>
  - *Prototype: First-party sets*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/0EMGi-xbI-8>
    - Firefox は Harmful だが Safari は Positive らしい
    - <https://github.com/privacycg/proposals/issues/17>
  - *Prototype: Permissions-Policy header*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/As1ABvc2QdA/m/yZSpPXY4CAAJ>
  - Prototype: Raw Sockets API
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/ARtkaw4e9T4/m/npjeMssPCAAJ>
  - Prototype: WebXR Depth API
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/U5Iy4LrcwoI/m/dIlbC2OhAwAJ>
  - Prototype: WebAuthentication API: ResidentKeyRequirement and credProps extension
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/hHV_nrVc-To/m/fjcfKB7zBwAJ>
  - Prototype: Add support for CSS properties "overflow: clip" and "overflow-clip-margin"
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/XcGGi4jAwfE>
  - Prototype: Progressive Web Apps as URL Handlers
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/2Sv3fCWEi_Q>
  - *Prototype: Customizable `<select>` Element*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/9TcfjaOs5zg>
    - <https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/ControlUICustomization/explainer.md>
  - *Implement and Ship: Cookies with SameSite by default[a][b][c]*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/AknSSyQTGYs/m/SSB1rTEkBgAJ>
    - Finch だった SameSite のロールアウトが 8/11 に 100% になった
    - 3D セキュアなど壊れたサイトも報告されている
  - Experiment: Beforematch event and hidden-matchable
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/aTrk7__Eiq4>
  - Experiment: Cross-origin opener policy reporting API
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/JhRU2d7RQ_k>
  - Experiment: battery-savings meta tag
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/vVtAi2evarQ>
  - Experiment: Secure payment confirmation
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/1P5bcoBw-II>
  - Experiment: Cross-Screen Window Placement
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/C6xw8i1ZIdE/m/TJsr0zXxBwAJ>
  - Experiment: Digital Goods API
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/syI9_M9dANY>
    - アイテム課金などの UI を Payment Request API よりも細かく制御するための API
  - Experiment: WebCodecs
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/7OdxQf5HnlQ>
  - Experiment: Sec-bfcache-experiment HTTP Header
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/RXxETBGaTYI>
  - Continue Experimenting: Serial API
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/NGgprfPEbG0>
  - Extend Origin Trial: WebRTC Insertable Streams Legacy API
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/LLtmsTDMnXg>
  - Deprecate and Remove: RTP data channels
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/7XWZ-J7HZHw>
  - Deprecate: -webkit-font-size-delta
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/p1D2Fj8WTe0>
  - Deprecate and remove: -webkit-font-size-delta
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/Gr37S4GPg4U/m/T0vGQyLzBwAJ>
  - *PSA: intent-to-experiment needs a draft spec*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/R3cI6ro5Dls>
    - Experiment するには Draft を用意するようにとのこと
    - Explainer だけではだめということ
  - *PSA: Chromestatus Guide UX*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/D3n0dEcb8Eg>
    - Chromestatus への Launch Process の UI が改善した
  - *PSA on Running WPT on Android*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/WTpgeXYqymE>
  - PSA: Installing service workers will throttle network requests.
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/KlgQ-j0Wx0U>
- v8
- Other
  - Google Developers Blog: ChromeOS.dev - A blueprint to build world-class apps and games for Chrome OS
    - <https://developers.googleblog.com/2020/08/introducing-chrome-os-dev.html>
  - Chromium Blog: Changes to the Chrome App Support Timeline
    - <https://blog.chromium.org/2020/08/changes-to-chrome-app-support-timeline.html>
  - Official Google Webmaster Central Blog: Join our first Virtual Webmaster Unconference
    - <https://webmasters.googleblog.com/2020/08/join-our-first-virtual-webmaster.html>
  - Official Google Webmaster Central Blog: Identify and fix AMP Signed Exchange errors in Search Console
    - <https://webmasters.googleblog.com/2020/08/identify-and-fix-amp-signed-exchange.html>
  - *Q2 2020 Summary from Chrome Security*
    - <https://groups.google.com/a/chromium.org/g/security-dev/c/tRgTmKbA0Vo/m/2WADAmPTCAAJ>


### Firefox 動向

- Stable: 80
  - Firefox 80.0, See All New Features, Updates and Fixes
    - <https://www.mozilla.org/en-US/firefox/80.0/releasenotes/>
  - Firefox 80 for developers - Mozilla | MDN
    - <https://developer.mozilla.org/ja/docs/Mozilla/Firefox/Releases/80>
    - CSS の appearance プロパティの接頭辞が外れた
    - export * as namespace
  - Firefox 80 Site Compatibility | Firefox Site Compatibility
    - <https://www.fxsitecompat.dev/en-CA/releases/80/>
  - *Changing World, Changing Mozilla - The Mozilla Blog*
    - <https://blog.mozilla.org/blog/2020/08/11/changing-world-changing-mozilla/>
    - Mozilla が大量の Layoff
    - MDN, Servo, XR, WASM などのチームから人が大幅に減った
    - プロフィールなどを公式が公開
    - <https://talentdirectory.mozilla.org/>
    - <https://discourse.mozilla.org/t/dear-mozilla-community/65546>
- Updates
  - These Weeks in Firefox: Issue 77
    - <https://blog.nightly.mozilla.org/2020/08/07/these-weeks-in-firefox-issue-77/>
  - *An Update on MDN Web Docs*
    - <https://hacks.mozilla.org/2020/08/an-update-on-mdn-web-docs/>
    - MDN は存続するが、 Mozilla Hacks などは休止
  - *Fast, personalized and private by design on all platforms: introducing a new Firefox for Android experience*
    - <https://blog.mozilla.org/blog/2020/08/25/introducing-a-new-firefox-for-android-experience/>
  - SpiderMonkey Newsletter #6
    - <https://groups.google.com/g/mozilla.dev.platform/c/VsgU2nNoXSs>
  - *Plans for new ECDSA root and new intermediates from Let's Encrypt*
    - <https://groups.google.com/g/mozilla.dev.security.policy/c/BAK9eFalSd4>
    - Let's Encrypt の新しい証明書は RSA じゃなく ECDSA
    - バイト数省略のため lencr.org というドメインも用意している
  - Extensions in Firefox 80 | Mozilla Add-ons Blog
    - <https://blog.mozilla.org/addons/2020/08/25/extensions-in-firefox-80/>
- Intents
  - Ship: selectionchange for input/textarea
    - <https://groups.google.com/g/mozilla.dev.platform/c/zS9vCw9GMsg/m/Zd3_STiTAgAJ>
  - *Ship: accept spaces and tabs in unquoted values (of e.g. "filename") used in Content-Disposition parameterized header pairs to to align with other browsers*
    - <https://groups.google.com/g/mozilla.dev.platform/c/-Z72qTjto9I>
  - *Prototype: WebXR Layers*
    - <https://groups.google.com/g/mozilla.dev.platform/c/O0CmHS8meNw>
  - Prototype: ETP strict mode shims for content-blocked resources
    - <https://groups.google.com/g/mozilla.dev.platform/c/28eWGe4s5a8>
  - Unship: Recursive call of Document.execCommand()
    - <https://groups.google.com/g/mozilla.dev.platform/c/QDvYvcx5CAo>
- Other
  - *A look at password security, Part IV: WebAuthn - The Mozilla Blog*
    - <https://blog.mozilla.org/blog/2020/08/20/password-security-part-iv-webauthn/>
  - *Update on Mozilla Mixed Reality*
    - <https://blog.mozvr.com/update-on-mozilla-mixed-reality-2/>


### Safari 動向

- Stable: 13.1.2
- Updates
  - *Release Notes for Safari Technology Preview 112*
    - <https://webkit.org/blog/11183/release-notes-for-safari-technology-preview-112/>
    - Extensions
      - Added support for replacing a Safari App Extension with a Safari Web Extension by specifying the SFSafariAppExtensionBundleIdentifiersToReplace key in the NSExtension element in your Safari Web Extension Info.plist file. The value for the key should be an array of strings, each of which is the bundle identifier on a Safari App Extension you want to replace.
    - JavaScript
      - Implemented Intl.DisplayNames (r264639)
    - SVG
      - Added support for SVG `<a>` element's rel and relList attributes (r264789)
    - Media
      - Added behaviors for YouTube to offer HDR variants to devices which support HDR (r265167)
      - Adopted AVPlayer.videoRangeOverride (r264710)
      - *Added HDR decode support in software-decoded VP9 (r265073)*
    - WebRTC
      - Added OfflineAudioContext constructor (r264657)
    - Web API
      - Added support for the type attribute to PerformanceObserver (r265001)
    - Text Manipulation
      - Changed text manipulation to not extract non-breaking spaces (r264947)
    - Storage
      - Changed to allow IndexedDB in third-party frames (r264790)
- Position[d]
  - <https://lists.webkit.org/pipermail/webkit-dev/ から Position Request についてだけ抜粋>
  - Request for position on transferable streams
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-August/031350.html>
    - The current proposal seems useful to me.
  - Request for Position on Native File System API
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-August/031362.html>
    - Apple's WebKit team does not support this feature due to the security / safety concerns.
  - Request for position on Cookie Store API
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-August/031365.html>
    - We're supportive of the idea of having an asynchronous cookie API. However, we would need to review other aspects of this proposal, for example, exposing it to service workers since that could have subtle implications.
  - Request for position on Atomics.waitAsync
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-August/031367.html>
    - I think it's a good idea. It seems to be a decent fit for how WK handles this already internally.
  - Request for position on Event Timing
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-August/031324.html>
  - Request for position on a Link header to use Signed HTTP Exchanges to load subresources
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-August/031337.html>
  - Request for Position on document-access proposal
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-August/031340.html>
  - Request for position on transferable streams
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-August/031341.html>
  - Request for position on WebRTC Insertable Streams
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-August/031342.html>
  - Request for Position on Native File System API
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-August/031347.html>
  - Request for position on the Origin-Isolation header
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-August/031354.html>
  - Request for position on Cookie Store API
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-August/031364.html>
  - Request for position on Atomics.waitAsync
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-August/031366.html>
  - * Other


### Edge 動向

- Stable: 85
- Updates
- Chakra
  - Release ChakraCore v1.11.21 · microsoft/ChakraCore
    - <https://github.com/microsoft/ChakraCore/releases/tag/v1.11.21>
- Other
  - *Microsoft 365 apps say farewell to Internet Explorer 11 and Windows 10 sunsets Microsoft Edge Legacy - Microsoft Tech Community - 1591666*
    - <https://techcommunity.microsoft.com/t5/microsoft-365-blog/microsoft-365-apps-say-farewell-to-internet-explorer-11-and/ba-p/1591666>
    - Microsoft 365 で Edge Legacy と IE11 のサポート終了予告
    - Edge Legacy は 2021 年 3 月に EOL
    - Microsoft Teams は 2020 年 11 月 30 日で IE11 のサポートを終了
    - 他の Microsoft 365 アプリも 2021 年 8 月 17 日で IE11 のサポートを終了
  - Announcing a new way to paste URLs, Link format! - Microsoft Tech Community - 1600094
    - <https://techcommunity.microsoft.com/t5/articles/announcing-a-new-way-to-paste-urls-link-format/m-p/1600094#M3152>
  - *Beating Private Mode Blockers with an Ephemeral Profile – text/plain*
    - <https://textslashplain.com/2020/08/11/beating-private-mode-blockers-with-an-ephemeral-profile/>
    - Private Browse Blocker なサイトを見るために、専用別アカウントを用意するという話
  - *Seamless Single Sign-On – text/plain*
    - <https://textslashplain.com/2020/08/17/seamless-single-sign-on/>
    - 401 での認証のプロンプトは、セキュリティの都合上 3rd Party の画像に対しては出ないようになっている
    - それを利用して、画像を読み込んで成功すればトークンが残ってる、失敗すれば認証フローに行けば良い、という切り分けをプロンプトを出すことなくできる。
  - Managing Edge via Policy – text/plain
    - <https://textslashplain.com/2020/08/24/managing-edge-via-policy/>


### WHATWG/W3C 動向

- TPAC
  - WebRTC Agenda
    - <https://lists.w3.org/Archives/Public/public-webrtc/2020Aug/0051.html>
    - <https://lists.w3.org/Archives/Public/public-webrtc/2020Aug/0059.html>
- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
  - *For Wide Review: WCAG 2.2*
    - <https://www.w3.org/blog/news/archives/8659>
    - WCAG 2.2 の新しい Working Draft が公開
    - 新しく 9 つの達成基準が追加
    - 9/18 までにコメント募集
    - <https://www.w3.org/TR/2020/WD-WCAG22-20200811/>
- First Public Working Draft
- Chartering
- Other
  - WebAppsec Meeting Agenda 2020-08-18
    - <https://github.com/w3c/webappsec/blob/master/meetings/2020/2020-08-18-agenda.md>
    - IsLoggedIn
      - John Wilander and Melanie Richards will walk us through this PrivacyCG proposal.
    - WebID
      - Sam Goto (and friends!) will walk us through this WICG proposal.
    - HTTP State Tokens
      - Mike West will update folks on this proposal.


### TC39 動向

- Meeting
  - no-meeting
- Proposals Diff
  - <https://github.com/tc39/proposals/compare/master@{2020-08-01}...master@{2020-09-01}>
  - <https://tc39.github.io/beta/>
  - 0->1
  - 1->2
  - 2->3
  - 3->4
- New Proposals
- Other
  - Daniel Ehrenberg on Twitter: "Visiting family in beautiful Rochester, NY, but in my downtime, I'm back on my bullshit." / Twitter
    - <https://twitter.com/littledan/status/1292468777490284544>
    - littledan が新しい Decorators の proposal を書いているらしい


### IETF 動向

- RFC
- IETF Last Call
- WG Last Call
- Call for Adoption
- I-D Action
- Draft
  - The Transport Layer Security (TLS) Protocol Version 1.3
    - <https://tools.ietf.org/html/draft-rescorla-tls-rfc8446-bis-00>
  - QUIC Disable Encryption
    - <https://tools.ietf.org/html/draft-banks-quic-disable-encryption-00>
  - Usage Limits on AEAD Algorithms
    - <https://tools.ietf.org/html/draft-irtf-cfrg-aead-limits-00>
  - The CONNECT-UDP HTTP Method
    - <https://tools.ietf.org/html/draft-ietf-masque-connect-udp-00>
  - *Hypertext Transfer Protocol Version 2 (HTTP/2)*
    - <https://tools.ietf.org/html/draft-thomson-httpbis-http2bis-00>
  - *Client Hint Reliability*
    - <https://tools.ietf.org/html/draft-davidben-http-client-hint-reliability-01>
  - Supporting Redirection for DNS Queries over HTTPS (DoH)
    - <https://tools.ietf.org/html/draft-btw-dprive-rfc8484-clarification-00>
  - A Framework For Decentralized Bearer Token Issuance in HTTP
    - <https://tools.ietf.org/html/draft-thornburgh-fwk-dc-token-iss-01>
  - Effective Terminology in IETF drafts
    - <https://tools.ietf.org/html/draft-gondwana-effective-terminology-01>
- Other
  - mnot's blog: RFC8890: The Internet is for End Users
    - <https://www.mnot.net/blog/2020/08/28/for_the_users>


### セキュリティ動向


### 周辺動向

- *Why bigger isn't always better when it comes to TLS key size*
  - <https://www.fastly.com/blog/key-size-for-tls>
- Why "by developers, for developers" matters now more than ever
  - <https://www.fastly.com/blog/why-by-developers-for-developers-matters-more-than-ever>
- Security at Scale: Fastly announces intent to acquire Signal Sciences, the web application and API protection solution
  - <https://www.fastly.com/blog/fastly-intent-to-acquire-signal-sciences>
- Announcing wrangler dev - the Edge on localhost
  - <https://blog.cloudflare.com/announcing-wrangler-dev-the-edge-on-localhost/>
- *Cloudflare and Human Rights: Joining the Global Network Initiative (GNI)*
  - <https://blog.cloudflare.com/cloudflare-and-human-rights-joining-the-global-network-initiative-gni/>
- How Argo Tunnel engineering uses Argo Tunnel
  - <https://blog.cloudflare.com/how-argo-tunnel-engineering-uses-argo-tunnel/>
- Brave's Concerns with the Client-Hints Proposal | Brave Browser
  - <https://brave.com/brave-and-client-hints/>
- WebBundles Harmful to Content Blocking, Security Tools, and the Open Web (Standards Updates #2)
  - <https://brave.com/webbundles-harmful-to-content-blocking-security-tools-and-the-open-web/>


### イベント

- 9 月
  - 9-10: Chromium Platform Security Summit
    - <https://groups.google.com/a/chromium.org/forum/#!topic/security-dev/k7Lzy8TpR6Y>
  - 11: SecWeb
    - <https://secweb.work/>
- 10 月
  - 26-30: TPAC/2020 - W3C Wiki
    - <https://www.w3.org/wiki/TPAC/2020>
- 11 月
  - 14-20: IETF 109 Bangkok
    - <https://www.ietf.org/how/meetings/109/>
  - 17-19: BlinkOn
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/zNDLekIrSQE>


### Wrap Up

- Chrome 85 リリース
- Same Site Lax が 100% 壊れたサイトもあり
- Form UI Customizable で `<select>` からスタート
- Fast Page バッチのブログ
- Intents
  - Intent to Ship: Insertable Stream
  - Intent to Ship: Native File System
  - Intent to Experiment: Digital Goods API
  - Intent to Experiment で Draft が Required に
- Mozilla Layoff
  - 250 人程のレイオフ、 MDN などのチームが縮小
- MS365 の IE11/Legacy Edge サポート終了
- Webkit-dev request for position で Niwa さんの回答が結構ついてた
- mnot's blog: RFC8890: The Internet is for End Users
- http2bis 作業開始
