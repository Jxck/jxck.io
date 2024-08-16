---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep92.mp3
published_at: 2022-01-23
guest: [@myakura](https://twitter.com/myakura)
---

# ep92 Monthly Web 202201

## Theme

第 92 回のテーマは 2021 年 12 月と 2022 年 1 月の Monthly Web です。

## Show Note

### Chrome 動向

#### Stable: 97

#### Updates

- **New in Chrome 97 - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-chrome-97/
  - WebTransport
  - Script type feature detection
  - New array prototypes
  - Emulate Chrome 100 in the UA string
- **Chromium Blog: Chrome 98 Beta: Color Gradient Vector Fonts, Region Capture Origin Trial, and More**
  - https://blog.chromium.org/2022/01/chrome-98-beta-color-gradient-vector.html
  - COLRv1 Color Gradient Vector Fonts
  - Preparing for a Three Digit Version Number
  - Origin Trials
    - New Origin Trial
      - Region Capture
  - Other Features in this Release
    - Adding auto Keyword for contain-intrinsic-size
    - AudioContext.outputLatency
    - CSS Color Adjust: 'only' Keyword for color-scheme
    - document.adoptedStyleSheets is Now Mutable
    - High Dynamic Range Color Media Queries
    - New window.open() Behavior for Popups, Tabs, and Windows
    - Private Network Access Preflight Requests for Subresources
    - structuredClone() Method on Windows and Workers
    - WebAuthn minPinLength Extension
    - Window Controls Overlay for Installed Desktop Web Apps
    - WritableStream controller AbortSignal
  - Deprecations, and Removals
    - Remove SDES Key Exchange for WebRTC
- **Deprecations and removals in Chrome 98 - Chrome Developers**
  - https://developer.chrome.com/en/blog/deps-rems-98/
  - Remove SDES key exchange for WebRTC
- **What's New In DevTools (Chrome 98) - Chrome Developers**
  - https://developer.chrome.com/en/blog/new-in-devtools-98/

#### Intents

- **Ship: HTMLInputElement `showPicker()`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YfnM0ubs53k/m/LLhpJMihDQAJ
- **Ship: Origin Isolation By Default / Deprecate document.domain**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_oRc19PjpFo/m/10vHgsmwAQAJ
- Ship: Unprefixed text-emphasis properties
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wjZfRqRaTxk/m/zyHrvfUxCgAJ
- **Ship: Markup based Client Hints delegation for third-party content**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JQ68cvYuiQU/m/S_33YSqxCwAJ
- Ship: Handwriting Recognition API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/glIwF6hYtMI/m/p2MXhpGKEAAJ
- Ship: Allow `infinity`, `-infinity` and `NaN` in CSS `calc()`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tRrw-g1qMqc/m/1vt-pJGKEAAJ
- Ship: WebTransport serverCertificateHashes option
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/m0v9XiwKA4M/m/GtMq9j_iAAAJ
- Ship: TLS ALPN extension in wss-schemed WebSockets connections
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/x2yTf7_VOEw/m/04NaSkrCAAAJ
- **Ship: mix-blend-mode: plus-lighter**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KXAJlJsbBak/m/JisA_CS2AAAJ
- Prototype: HIDDevice forget()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/c2vCYr-0dqk/m/3nSeViRLCgAJ
- Prototype: mix-blend-mode: plus-lighter
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0ngoiUCAdE8/m/OjYQRp1yCgAJ
- Prototype: Markup based Client Hints delegation for third-party content
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oDU_uaDTLic/m/JTT1gQ2xCwAJ
- **Prototype: Focusgroup**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/DGFYzid2Qw8/m/3HcmUpghAgAJ
- Prototype: MediaRecorderErrorEvent API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/zOJxI8PTSiw/m/K5lzN2sYAgAJ
- Prototype: Service Worker Registration Id
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tA-OzYygv6s/m/achunwbaAQAJ
- Prototype: Transferable MediaStreamTracks
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BR8ZrEEw62I/m/07eD5VC0AAAJ
- **Prototype: CSS Subgrid**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GcoJNrGwWAc
- Continue Experimenting: Handwriting Recognition API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-cHgV0Efl9E/m/8Lu-_s8RDAAJ
- Extend Experiment: Same-origin prerendering triggered by the speculation rules API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tcbtZoQIlvI/m/K26gVfbUAQAJ
- **Extend Experiment: Origin Private File System extension: AccessHandle**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/yNslidDtNho/m/IEPD25X_AAAJ
- **Extend Experiment: Storage Foundation API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/wDiMaUps4lg/m/kEdkcVz_AAAJ
- Deprecate and Remove: Minor WebCodecs spec violations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dnWY4yKbLX8/m/Bum86SfACgAJ
- Deprecate and Remove: Battery Status API in Insecure Origins
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/w80tJL8uEV8/m/PfrHlvtgAgAJ
- Save the date for BlinkOn 16!
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tvOHmMflQy4/m/c5NXpLFoAgAJ

#### V8

#### Other

- web.dev
  - PWAs on Oculus Quest 2
    - https://web.dev/pwas-on-oculus-2/
  - **State of CSS 2021**
    - https://web.dev/state-of-css-2021/
  - **Deep-copying in JavaScript using structuredClone**
    - https://web.dev/structured-clone/
  - Control how your app is launched
    - https://web.dev/launch-handler/
  - Compat 2021 Holiday Update: presents for developers before the end of the year
    - https://web.dev/compat2021-holiday-update/
  - Porting USB applications to the web. Part 1: libusb
    - https://web.dev/porting-libusb-to-webusb/
  - Building a theme switch component
    - https://web.dev/building-a-theme-switch-component/
  - Embedding JavaScript snippets in C++ with Emscripten
    - https://web.dev/emscripten-embedding-js-snippets/
- google developer blog
  - **New robots tag: indexifembedded | Google Search Central Blog | Google Developers**
    - https://developers.google.com/search/blog/2022/01/robots-meta-tag-indexifembedded
- google developer japan blog
  - Google Developers Japan: 新しいリアルタイム入札の試験運用についてのお知らせ
    - https://developers-jp.googleblog.com/2022/01/blog-post.html
  - Google Developers Japan: Chrome のコードをパーティショニングして Android での起動時間を短縮する
    - https://developers-jp.googleblog.com/2021/12/chrome-android.html
  - Google Developers Japan: Chrome のストレージの管理が簡単に
    - https://developers-jp.googleblog.com/2021/12/chrome-storage.html
  - **Google Developers Japan: Chrome 97: WebTransport 、 Array の新しい静的メソッドなど**
    - https://developers-jp.googleblog.com/2021/12/chrome-97-webtransportarray.html
  - **Google Developers Japan: Bento のご紹介**
    - https://developers-jp.googleblog.com/2022/01/bento.html
  - Google Developers Japan: Windows 版 Chrome のパフォーマンス改善とネイティブ ウィンドウ オクルージョンの導入
    - https://developers-jp.googleblog.com/2022/01/native-window-occlusion.html
- chrome developer blog
  - Progress in the Privacy Sandbox (December 2021) - Chrome Developers
    - https://developer.chrome.com/en/blog/progress-in-the-privacy-sandbox-2021-12/
  - COLRv1 Color Gradient Vector Fonts in Chrome 98 - Chrome Developers
    - https://developer.chrome.com/en/blog/colrv1-fonts/
  - **Private Network Access: introducing preflights - Chrome Developers**
    - https://developer.chrome.com/en/blog/private-network-access-preflight/
  - Full accessibility tree in Chrome DevTools - Chrome Developers
    - https://developer.chrome.com/en/blog/full-accessibility-tree/
- chromium blog
  - https://blog.chromium.org/
- canary
  - https://www.chromium.org/getting-involved/dev-channel

### Firefox 動向

#### Stable: 96.0.2

#### Updates

- Firefox 96.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/96.0/releasenotes/
- Firefox 96.0.1, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/96.0.1/releasenotes/
- Firefox 96.0.2, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/96.0.2/releasenotes/
- **Firefox 96 for developers**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/96
  - CSS `hwb()` color
  - CSS `color-scheme` property
  - **SameSite=Lax by default**
  - Web Locks API
  - WebP encoder in Canvas
- **1750264 - Disable cookie sameSite schemeful in Firefox 96**
  - https://bugzilla.mozilla.org/show_bug.cgi?id=1750264
  - Schemeful SameSite を投入したら色んなサイトが壊れたのでバックアウトした
- **1749910 - (foxstuck) [2022-01-13] Hangs in socket thread**
  - https://bugzilla.mozilla.org/show_bug.cgi?id=1749910
  - 1/13 に障害
  - Mozilla のサービスで使う GCP のロードバランサーが HTTP/3 に対応したところ、 Telemetry でデータをアップロードする際にソケットスレッドで無限ループを引き起こしたらしい
- These Weeks in Firefox: Issue 107 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/01/18/these-weeks-in-firefox-issue-107/

#### Intents

- **Ship: Form-associated custom elements**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/39THaAm_RHM
- **Ship: HTML `<dialog>` element.**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/swi3i7Pvs40
- Prototype: CSS property `hyphenate-character`
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/KR8_G8uYzVw
- **Unship: WebVR**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/S9ltYIfjCpg
  - Firefox は WebXR をやってないが WebVR は落とす

#### Other

- **SpiderMonkey Newsletter (Firefox 96-97)**
  - https://spidermonkey.dev/blog/2022/01/14/newsletter-firefox-96-97.html
    - Records/Tuples
    - New Set methods
    - Import Assertions
    - WritableStream
    - pipeTo()
- **Revisiting why hyperlinks are blue**
  - https://blog.mozilla.org/en/internet-culture/why-are-hyperlinks-blue-revisited/
  - 昨年公開した Why are hyperlinks blue の続編
    - https://blog.mozilla.org/en/internet-culture/deep-dives/why-are-hyperlinks-blue/
  - 昨年の記事はなぜ青色なのかを突き止められていなかった
  - 寄せられたコメントから Ben Shneiderman の存在を教えてもらいコンタクトを取った
    - HyperTIES というハイパーテキストのソフトウェアが、青いリンクの最初の実装らしい
    - "Red highlighting made the links more visible, but reduced the user's capacity to read and retain the content of the text... blue was visible, on both white and black backgrounds and didn't interfere with retention,"
    - 赤のほうが目立つが、目立ちすぎてコンテキストを忘れてしまう
    - 青は白背景・黒背景どちらでも目立ち、コンテキストを損ねない
  - Shneiderman の研究が TimBL の WWW に影響を与えた
- Contributing to MDN: Meet the Contributors - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2022/01/contributing-to-mdn-meet-the-contributors/

### Safari 動向

#### Stable: 15.2

#### Updates

- **New WebKit Features in Safari 15.2 | WebKit**
  - https://webkit.org/blog/12140/new-webkit-features-in-safari-15-2/
  - WebAssembly Enhancements
  - COOP/COEP HTTP Headers
  - Wide gamut support for Canvas
- **Release Notes for Safari Technology Preview 137 | WebKit**
  - https://webkit.org/blog/12156/release-notes-for-safari-technology-preview-137/
  - Web Inspector
  - CSS
    - **Enabled support for :has() pseudo-class by default**
    - Added support for new `srgb-linear`, `xyz-d50` and `xyz-d65` colorspaces
    - Added support for `oklab()` and `oklch()` colors
    - Added support for replaced elements with intrinsic ratio and no intrinsic size
    - Added support for `*vi` (inline) and `*vb` (block) viewport units
    - Added helper to add CSS property with implicit default
  - JavaScript
    - Added `Intl.NumberFormat.formatRangeToParts` for ICU 69~ platforms
    - Implemented `Date.prototype.toTemporalInstant()`
  - WebAssembly
  - Experimental Model Element
    - Added support for mouse-based manipulation of `<model>` on macOS
    - Added audio support
    - Added support for controlling looping animations
    - Added support for getting and setting the camera
    - Added support for pausing and resuming animations
    - Added support for seeking animations
  - Accessibility
    - Added accessibility attributes for `<model>`
  - Web API
    - **Added initial implementation for the Web Lock API**
  - Content Security Policy
    - Implemented submitting samples in violation reports (r286150)
  - Media
    - Added support for more requestVideoFrameCallback metadata (r285984)
  - Apple Pay
  - Web Extensions
    - Added support for special matching characters (`*`, `|`, `||`, and `^`) in urlFilter of declarativeNetRequest rules instead of treating them as regex patterns
    - Added permission prompting inside Web Inspector for devtools extension tabs
    - Added support for CSS injections and removals of more than one file with browser.scripting
- **Release Notes for Safari Technology Preview 138 | WebKit**
  - https://webkit.org/blog/12176/release-notes-for-safari-technology-preview-138/
  - CSS
    - **Enabled :focus-visible pseudo-class by default**
    - Enabled the resolution media query by default
    - **Enabled the CSS Contain property by default**
  - Experimental Model Element
    - Added load and error events to distinguish resource load from model readiness
  - Web Animations
    - Added a way to run scripted animations via CustomEffect
  - Web API
    - Changed to group radio buttons with no form owner
    - Fixed the range of `<input type="time">` to be reversible
    - Fixed an `<input>` that's been autofilled with obscured content to still be editable
    - Implemented AbortSignal.throwIfAborted
    - Improved `<input type="datetime-local">` value parsing and sanitization
    - Restored navigator.hardwareConcurrency
    - Fixed setting onselectionchange content attribute to add an event listener
  - Service Workers
    - **Enabled NavigationPreloadManager by default**
    - Added support for ServiceWorker downloads
    - Fixed "no-cache" network error
    - Fixed same-site lax cookies not sent by fetch event handler after page reload
  - WebAssembly
    - Added preparation of `WebAssembly.Memory` imports in Wasm/ESM modules
  - Web Extensions
    - Added support for changed web_accessible_resources declaration with manifest_version 3

#### Position

- https://lists.webkit.org/pipermail/webkit-dev/
- 特に返信なし

#### Other

- **iCloud Private Relay Overview (PDF)**
  - https://www.apple.com/privacy/docs/iCloud_Private_Relay_Overview_Dec2021.PDF
    - Private Relay のサービスや利用する技術の概要
    - MASQUE や ODoH を使っている
- **Safari 15 IndexedDB Leaks**
  - https://safarileaks.com/
  - Exploiting IndexedDB API information leaks in Safari 15
    - https://fingerprintjs.com/blog/indexeddb-api-browser-vulnerability-safari-15/
    - Safari 15 の IndexedDB で cross-origin info leaks が見つかった
    - 同一セッション内のタブやフレームで、データベース名が漏れてしまう
    - データベースに触ると、同じ名前を持つ空のデータベースが他のタブやフレームにも作られる
    - Google などは User ID を名前に使っているので、 Google の各種 API を使ってプロフィール画像などが取得できる
  - Changeset 288078 - WebKit - database names leak cross-origin within the same browser session ​
    - https://trac.webkit.org/changeset/288078/webkit
    - 1/16 に修正が trunk に入った

### Edge 動向

#### Stable: 97

#### Updates

- Looking back at Microsoft Edge for developers in 2021 - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2022/01/19/looking-back-at-microsoft-edge-for-developers-in-2021/
- Getting started with Protocol Handlers for your web app - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2022/01/20/getting-started-url-protocol-handlers-microsoft-edge/
- New ways to manage your passwords in Microsoft Edge - Microsoft Tech Community
  - https://techcommunity.microsoft.com/t5/articles/new-ways-to-manage-your-passwords-in-microsoft-edge/m-p/3054579#M6312

#### Chakra

#### Other

- Debugging Compatibility in Edge - text/plain
  - https://textslashplain.com/2022/01/20/debugging-compatibility-in-edge/

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
  - Media Queries Level 4
    - https://www.w3.org/TR/2021/CRD-mediaqueries-4-20211225/
    - CSS WG Blog - Updated CRD of Media Queries Level 4
      - https://www.w3.org/blog/CSS/2022/01/02/updated-crd-of-media-queries-level-4/
  - CSS Conditional Rules Module Level 3
    - https://www.w3.org/TR/2022/CR-css-conditional-3-20220113/
  - CSS Cascading and Inheritance Level 4
    - https://www.w3.org/TR/2022/CR-css-cascade-4-20220113/
  - **CSS Cascading and Inheritance Level 5**
    - https://www.w3.org/TR/2022/CR-css-cascade-5-20220113/
    - layers を含む
- Working Draft
  - **W3C Accessibility Guidelines (WCAG) 3.0**
    - https://www.w3.org/TR/2021/WD-wcag-3.0-20211207/
  - CSS Overflow Module Level 3
    - https://www.w3.org/TR/2021/WD-css-overflow-3-20211202/
    - CSS WG Blog - Updated WD of CSS Overflow Level 3
      - https://www.w3.org/blog/CSS/2021/12/02/css-overflow-3-update/
  - CSS Values and Units Module Level 4
    - https://www.w3.org/TR/2021/WD-css-values-4-20211216/
    - CSS WG Blog - CSS Values and Units Level 4 Update
      - https://www.w3.org/blog/CSS/2021/12/31/css-values-4-wide-review/
  - Media Queries Level 5
    - https://www.w3.org/TR/2021/WD-mediaqueries-5-20211218/
    - CSS WG Blog - Updated Working Draft for Media Queries 5
      - https://www.w3.org/blog/CSS/2022/01/02/update-working-draft-for-media-queries-5/
- First Public Working Draft
  - EditContext API
    - https://www.w3.org/TR/2021/WD-edit-context-20211221/
- Note
  - **Explainer for W3C Accessibility Guidelines (WCAG) 3.0**
    - https://www.w3.org/TR/2021/DNOTE-wcag-3.0-explainer-20211207/
  - **CSS Snapshot 2021**
    - https://www.w3.org/TR/css-2021/
    - CSS WG Blog - CSS Snapshot 2021 Published
      - https://www.w3.org/blog/CSS/2022/01/01/css-snapshot-2021-published/
- Chartering

#### Other

- W3C Advisory Committee Elects Technical Architecture Group
  - https://www.w3.org/blog/news/archives/9377
- **Interoperable Private Attribution (IPA) Overview - Google Docs**
  - https://docs.google.com/document/d/1KpdSKD8-Rn0bWPTu4UtK54ks0yv2j22pA5SrAD9av4s/edit
  - Private Advertising Technology Community Group で検討されている
  - author に Meta (Facebook) の人と Martin Thomson
  - Interoperable Private Attribution (IPA): A Non-technical introduction - Google Slides
    - https://docs.google.com/presentation/d/1NpQz0Wm73eEKw24V7B0yCjq4Tw2qPgeezhMfS0-P-TY/edit

### TC39 動向

#### Meeting

- 2021-12
  - Agenda
    - https://github.com/tc39/agendas/blob/main/2021/12.md
  - Notes
    - https://github.com/tc39/notes/blob/master/meetings/2021-12/dec-14.md
    - https://github.com/tc39/notes/blob/master/meetings/2021-12/dec-15.md
  - Record & Tuple References Object
    - https://drive.google.com/file/d/1lVYn8_sHecqxW08vN5Tu7rXZn7GemBqO/view

#### Proposals Diff

- https://github.com/tc39/proposals/compare/master@{2021-12-01}...master@{2022-01-21}
- 0->1
  - Intl.Segmenter v2
- 1->2
  - RegExp Buffer Boundaries
  - RegExp Modifiers
  - Array.fromAsync
- 2->3
  - Array Grouping
  - Intl.DurationFormat
- 3->4
  - Intl.DisplayNames v2
  - Extend TimeZoneName Options

#### New Proposals

#### Other

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

- **AUTH48 status page for C430 > RFC Editor**
  - https://www.rfc-editor.org/auth48/C430
    - RFC9110: Semantics
    - RFC9111: Caching
    - RFC9112: Messaging
    - RFC9113: HTTP3
    - RFC9114: QPACK
    - RFC9163: Expect-CT
- **HTTP Working Group Interim Meeting Agenda - February 2022**
  - https://httpwg.org/wg-materials/interim-22-02/agenda.html

### CDN 動向

#### Cloudflare

- **2022 年に入って既に 5 箇所のネット切断が発生**
  - ガンビア: 海底ケーブルの故障
    - https://blog.cloudflare.com/the-gambia-without-internet/
  - カザフスタン: 内部情勢の悪化により政府が実施
    - https://blog.cloudflare.com/internet-shut-down-in-kazakhstan-amid-unrest/
  - ブルキナファソ: クーデターによるモバイルネットの停止
    - https://radar.cloudflare.com/bf?date_filter=last_30_days
  - トンガ: 火山噴火による海底ケーブル破損
    - https://blog.cloudflare.com/tonga-internet-outage/
  - イエメン: 空爆による海底ケーブル破損
    - https://blog.cloudflare.com/internet-outage-in-yemen-amid-airstrikes/
- DDoS Attack Trends for Q4 2021
  - https://blog.cloudflare.com/ddos-attack-trends-for-2021-q4/

#### Fastly

#### Other

### セキュリティ動向

- **最高裁無罪判決のご報告|モロ|note**
  - https://note.com/morois/n/n04022db1f76c
  - Coinhive の最高裁裁判が終了し無罪判決
  - 判決全文
  - https://www.courts.go.jp/app/files/hanrei_jp/869/090869_hanrei.pdf
- **colors などの npm パッケージに悪意あるコードが含まれている問題について**
  - https://zenn.dev/azu/articles/d56615b2e11ad1

### 周辺動向

- ドコモからのお知らせ : NTT ドコモから提供している一部サービスの URL 変更について | お知らせ | NTT ドコモ
  - https://www.nttdocomo.co.jp/info/notice/page/211216_00.html
  - ドコモが運営するサービスのドメインを `*.docomo.ne.jp` に統一していく
- NTT 公式ホームページのリニューアルに伴う URL 変更について | トピックス | NTT
  - https://group.ntt/jp/topics/2021/02/19/hprenewal/index.html
  - 新: https://group.ntt
  - 旧: https://www.ntt.co.jp
- Washed Up - Infrequently Noted
  - https://infrequently.org/2022/01/washed-up/
  - Web3 についての Alex Russell のエントリ
- `<video>`, HTTP range requests & WHATWG streams - surma.dev
  - https://surma.dev/things/range-requests/
- **Vivaldi が絶対に暗号通貨に手を出さない理由 | Vivaldi Browser**
  - https://vivaldi.com/ja/blog/why-vivaldi-will-never-create-thinkcoin/
  - トークンの価値がある日無くなる可能性がある
  - マイニングが環境破壊を助長する可能性がある
  - などの理由により手を出さないという宣言をした
- **Introducing Opera's new Web3 initiative: Crypto Browser Project now available in public beta for Windows, Mac and Android - Blog | Opera Crypto**
  - https://blogs.opera.com/crypto/2022/01/opera-crypto-browser-project-web3/
  - Web3 に対応していくために Crypto Browser として Wallet の対応などをすすめる
- The State of CSS 2021
  - https://2021.stateofcss.com/
  - 結果発表
- State of JavaScript 2021/2022
  - https://app.stateofjs.com/survey/state-of-js/2021
  - 開始
- 25 年に渡る JavaScript の歴史 | JetBrains: プロデベロッパーとチーム向けの開発ツール | JetBrains: Developer Tools for Professionals and Teams
  - https://www.jetbrains.com/ja-jp/lp/javascript-25/

### イベント

- 1 月
  - 24-27: TC39
    - https://github.com/tc39/agendas/blob/main/2022/01.md
- 2 月
  - 1-3: httpwg interim
    - https://github.com/httpwg/wg-materials/blob/gh-pages/interim-22-02/agenda.md
- 3 月
  - 19-25: IETF | IETF 113 Vienna
    - https://www.ietf.org/how/meetings/113/
- 4 月
- 5 月
  - 17-18 BlinkOn 16
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/tvOHmMflQy4/m/c5NXpLFoAgAJ

### Wrap Up

- Chrome
  - 97
    - WebTransport
    - `script.supports()`
    - FindLast/FindLastIndex
  - 98
    - COLRv1 fonts
    - HDR media queries
    - structuredClone()
    - Private Network Access Preflight
  - Ship
    - showPicker()
    - mix-blend-mode: plus-lighter
  - Prototype
    - focusgroup
    - Subgrid
  - Other
    - State of CSS
- Firefox
  - 96
    - SameSite=Lax by default
    - Web Locks API
  - 互換性・障害
    - Schemeful SameSite ロールバック
    - Telemetry の HTTP/3 実装で障害
  - Ship
    - Form-associated custom elements
    - `<dialog>`
  - Unship
    - WebVR
  - SpiderMonkey
    - Records/Tuples
    - New Set methods
    - Import Assertions
    - WritableStream/pipeTo()
  - Other
    - Why are hyperlinks blue revisited
- Safari
  - 15.2
    - WASM enhancements
    - COOP/COEP
    - Wide-gamut Canvas
  - TP 137
    - `:has()`
    - Web Locks API
  - TP 138
    - :focus-visible by default
    - Containment by default
    - Navigation Preload
  - other
    - Private Relay Overview
    - Safari 15 IndexedDB Leaks
- Edge
- WHATWG/W3C
  - Layers 含む Cascading & Inheritancs Lv5 が CR
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
  - Coinhive 無罪
  - Color.js / Faker.js に悪意のあるコード
- 周辺動向
  - NTT がドメインを変更(docomo.ne.jp / ntt.co.jp)
  - Vivaldi は暗号通貨に手を出さない
  - Opera は Crypto Browser として Web3 進めていく
  - State of CSS / State of JS
