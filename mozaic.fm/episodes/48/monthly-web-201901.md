# [monthly-web][mozaic.fm] ep48 Monthly Web 201901

## Info

audio: https://files.mozaic.fm/mozaic-ep48.mp3

published_at
: 2019-02-04

guest
: [@myakura](https://twitter.com/myakura)


## Theme

第 48 回のテーマは 2019 年 01 月の Monthly Web です。


## Show Note


### Chrome 動向

- Stable: 72
- Updates
  - *New in Chrome 72*
    - <https://developers.google.com/web/updates/2019/01/nic72>
    - public class fields
    - User Activation API
    - Intl.ListFormat()
  - *What's New In DevTools (Chrome 73)*
    - <https://developers.google.com/web/updates/2019/01/devtools>
    - logpoints
    - AAA contrast ratio line in the Color Picker
  - A Picture is Worth a Thousand Words, Faces, and Barcodes-The Shape Detection API
    - <https://developers.google.com/web/updates/2019/01/shape-detection>
    - ハードウェアが持つ顔認識やバーコードスキャナーを活用するための API
  - *Making user activation consistent across APIs*
    - <https://developers.google.com/web/updates/2019/01/user-activation>
  - *Emscripten and npm*
    - <https://developers.google.com/web/updates/2019/01/emscripten-npm>
    - Docker でツールをまとめてるからそれ使うと npm モジュールも開発しやすいよという話
- Intents
  - Ship: WebRTC RTCDtlsTransport object
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/bm-eQd1fKRQ/o3DqG4wxEAAJ>
  - Ship: imagesrcset and imagesizes attributes on
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/07CbItWfA4M/CG1qF8IoEAAJ>
  - *Ship: Signed HTTP Exchanges (SXG)*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/gPH_BcOBEtc/Z41GR0mwEQAJ>
  - Ship: IntersectionObserver V2
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/g-pdQdSR0HI/LY6lcGKOCgAJ>
  - *Ship: Hashbang Interpreter Line Syntax*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/xSD0PYiZq9U/Af87U7wWDAAJ>
    - <https://tc39.github.io/proposal-hashbang/> の実装
    - Shebang/Hashbang を許容するようにし、 CLI 向けのコードがそのまま動くように
  - Implement: Media Queries: prefers-color-scheme feature
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Muw0N43ntSw/WZZZI7w7DQAJ>
  - Implement and Ship: OverconstrainedErrorEvent
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/QwFpOPom5HQ/pJh1YSQ0EQAJ>
  - *Implement and Ship: CSS prefers-reduced-motion media query*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/NZ3c9d4ivA8/BIHFbOj6DAAJ>
  - *Implement and Ship: Cross-Origin Resource Policy*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/TBNHorRPhZk/4_gfRjfzDgAJ>
  - Implement and Ship: RTCError, RTCErrorEvent, RTCErrorEventInit
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/TsJA1XX7mTE/nlQ0FFjSDgAJ>
  - Implement and Ship: Prevent downloads in sandboxed iframes without user activation
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/JdAQ6HNoZvk/WQZfXIMADgAJ>
  - Implement and Ship: `|type|` in PerformanceObserverInit
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/IPl_CSXhMbw/F0rSlAvzDQAJ>
  - Implement and Ship: CSS property font-optical-sizing
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Y3lhEykjfV0/FKa0H8zwDQAJ>
  - Implement and Ship: RTCRtpEncodingParameters.scaleResolutionDownBy & RTCRtpEncodingParameters.maxFramerate
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/SV8evGSU_dw/DIrx9XzvDQAJ>
  - *Implement and Ship: CSS Transition Events*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/L5J1DUzfQIw/3SSWuKkaDAAJ>
    - `transitionrun`, `transitionstart`, `transitionend`, `transitioncancel` が仕様にはある
    - Blink は `transitionend` しか実装してない、他はわりと実装している
    - これを実装すると、いつアニメーションしてるのかとかわかる。
  - Implement and Ship: Make RTCIceCandidate/RTCIceCandidateInit spec compliant
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/T6zlVFZhRVY/-bOrMI_rDQAJ>
  - Implement: back-forward cache
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/OVROmzNUng0/1gTmi-I3EQAJ>
  - Implement: Web Share Level 2
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/AiKgWvv3cq0/xAsjfSfMDQAJ>
  - *Implement: HTML Modules*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/ewfRSdqcOd8/w_Fr6rJ3DQAJ>
    - Chromium の intents だが MS Edge の人から出ている
    - かなりよく書かれた intents
  - *Implement: `Sec-CH-UA-` Client Hints.*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/WQ0eC_Gf8bw/dhWMhCYYDwAJ>
    - User-Agent ヘッダのエントロピーが高く、ほとんど無駄なのに fingerprint に使える
    - 減らしたいので Client-Hints で opt-in にしたい
    - そこで Sec-CH-UA-Arch, Sec-CH-UA-Platform などにわける
  - *Implement: APIs for Main Thread Scheduling*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/eLq8t56CbaQ/KdbOY7ZHCwAJ>
    - スケジューリングのプリミティブを JS に出す
    - TaskQueue API を追加する
  - *Implement: High Contrast support*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/N77UCHle_rw/omPE8XRzFQAJ>
    - MSEdge チームから、 Windows にあったコントラスト系の API を出したい模様
    - Media Queries lv5 の prefers-contrast とは違う
    - ブラウザがデフォルトでハイコントラストを提供し、コンテンツがオプトアウトするための仕組み、らしい。
    - 下の supported-color-schemes meta tag と被ってそう?
  - *Implement: supported-color-schemes meta tag*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/8NsJruvDJIw/xgtAfWJoDAAJ>
    - コンテンツがサポートしている Color Scheme をメタタグに明示する
    - UA はそれを元に、何がサポートされているのかを知ることができる
    - この有無により、 UA による自動変換での Color Scheme 変更などをコントロールしたい
    - `<meta name="supported-color-schemes" content="[light? || dark? || <ident>?]* || only?">`
    - light dark: UA はユーザのセッティングによってリストから選んで適用、いいのがなかったら自動変換できる
    - light dark only: UA はリストから選ぶ。自動変換はしない
    - なし: UA は自動変換できる
  - Implement: MediaCapabilities: encrypted (EME) decodingInfo()
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/bBUZGuJ4VfY/yBfMs4d0DAAJ>
  - *Experiment: ElementTiming for Images*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/9LV2L8sDgPY/5-PSyCOkBwAJ>
    - Performance Observer の Element Timing で Image の表示完了をとる
  - *Experiment: Feature Policy Reporting*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/2aHJE8YNXE0/9oo5x3s2EQAJ>
    - 待っていたやつ
  - Experiment: [Web Perf] Layout Jank API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/QRK6RbAwsb4/L6s-XUAvEQAJ>
    - PerformanceObserver で取れるように
  - Experiment: Handle retransmission in WebRTC audio jitter buffer
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/A31F88qhQLQ/TZYAm2dIEAAJ>
  - *Experiment: Trusted Types*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/I9To21DXcLo/NrU9P0M4EAAJ>
    - [blog](https://blog.jxck.io/entries/2019-01-27/trusted-types.html)
  - Experiment: getInstalledRelatedApps()
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/hi1RKJcdplo/T_BvnpHhDgAJ>
  - *Experiment: Priority Hints*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/jpeSdM897Xw/CY6tothSDgAJ>
  - Experiment: Per-method quota for PaymentRequest.canMakePayment()
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/-h-_ecsReLg/Cm11b3juDQAJ>
  - Experiment: Contact API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/GBgoS_eCmzM/Ot7ePqCbCgAJ>
  - *Experiment: Auto Picture-in-Picture*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/eFZ3h_A3VTY/NuXabBbQDQAJ>
    - タブを変えたりした時に自動で PinP すると、ビデオ会議とかで便利な場合がある
  - Extend Origin Trial: EventTiming
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/sJ4lxamz2V0/YSRPP3SwBgAJ>
  - Extend Origin Trial: lowLatency canvas contexts (AGAIN)
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/MasDDXg75Jc/bbylvOtrFQAJ>
  - Change:
  - Unship:
  - Deprecate and Remove: Web MIDI use on insecure origins
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/_2XZt3yInCI/d98O63x7CgAJ>
  - Deprecate and Remove: googHotword constraint.
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/WlIzSK6-xq0/E1bm3vdwCgAJ>
  - *Deprecate and Remove: Shadow DOM V0, Custom Elements V0, HTML Imports*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/h-JwMiPUnuU/RgmCstxKDwAJ>
    - WebComponents v0 仕様の deprecation が Chrome 74 に延期(従来は 73 を予定していた)
    - Chrome 内部のコードで v0 を使っているものなどのマイグレーションがうまくいかなかった
  - *Temporarily Remove: link rel=preload types 'audio' and 'video'*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/QnwPuiiYuQE/or9tagG4DAAJ>
    - 音声/映像の preload と要素での再取得によって、二回ダウンロードすることがある
    - 実装によって曖昧なことが WPT で判明したっぽい
    - Fetch でのキャッシュの挙動が仕様/実装共に直るまではおいておく
- Team Weekly Snippet
- v8
  - v8 blog
    - Trash talk: the Orinoco garbage collector · V8
      - <https://v8.dev/blog/trash-talk>
- Other
  - A year of open source funding - Accelerated Mobile Pages Project
    - <https://amphtml.wordpress.com/2019/01/09/a-year-of-open-source-funding/>
  - *Chromium Blog: Building a Better World Wide Web*
    - <https://blog.chromium.org/2019/01/building-better-world-wide-web.html>
    - Better Ads Standard の最初の成果の紹介
    - サイトの改善も広がり、 UX が向上しつつあるとのこと
  - Test your site speed automatically with Speed Demon
    - <https://medium.com/dev-channel/introducing-speed-demon-a36d95dd0174>
    - WebPageTest を定期的に叩いて spreadsheet に保存する app script
    - 閾値を超えたら通知してくれる
  - *PSA: H264 simulcast available in Chrome*
    - <https://groups.google.com/forum/#!msg/discuss-webrtc/_lxG4Yg1A2U/9UH3JCjlEwAJ>
    - <https://bugs.chromium.org/p/webrtc/issues/detail?id=5840>
  - *Chrome University 2018 - YouTube*
    - <https://www.youtube.com/playlist?list=PL9ioqAuyl6UIFAdsM5KU6P-hRJdh-BPmm>
    - Chrome の新規開発者向けに内部でやっていた Chrome University が公開された
    - 何度か前に紹介した Life of a Pixel などもここでやっていたものらしい
  - *Custom Elements v1 が v0 の利用量を抜く*
    - <https://twitter.com/abraham/status/1085314381951520769>
    - 去年の 8 月にでかいリリースがあった模様
  - Google Japan Blog: Google しごと検索で、仕事探しをもっとスムーズに!
    - <https://japan.googleblog.com/2019/01/shigoto-search.html>
    - 検索結果に仕事が出るように
    - Structured Data から出してるっぽい
  - *Wow, fancy that. Web ad giant Google to block ad-blockers in Chrome. For safety, apparently - The Register*
    - <https://www.theregister.co.uk/2019/01/22/google_chrome_browser_ad_content_block_change/>
    - <https://bugs.chromium.org/p/chromium/issues/detail?id=896897&desc=2#c23>
    - Chrome Extensions の Manifest v3 で WebRequest が廃止になり declarativeNetRequest API になる。
    - <https://developers.chrome.com/extensions/declarativeNetRequest>
    - MAX_NUMBER_OF_ALLOWED_PAGES = 100
    - MAX_NUMBER_OF_RULES = 30,000
    - <https://twitter.com/bulkneets/status/1088112760712421377>
  - *Guidelines for URL Display*
    - <https://chromium.googlesource.com/chromium/src/+/master/docs/security/url_display_guidelines/url_display_guidelines.md>
    - Where possible, avoid displaying URLs, especially when the user is likely to be making a trust decision. Instead, display only the origin. Additionally, if the connection is not secure, add an indicator to that effect:
    - If the URL display only applies to secure URLs (for example, a permission prompt that can only be requested by HTTPS pages), omit the scheme and non-default ports (443 for HTTPS).
  - *12e546d6fee1d2a669733feaad7e85145ae4c02f - chromium/src - Git at Google*
    - <https://chromium.googlesource.com/chromium/src/+/12e546d6fee1d2a669733feaad7e85145ae4c02f>
    - macOS の Chrome で Dark mode がサポートされた
    - 73 でリリース予定
  - chromestatus.com の features ページで、その機能を使っているサイトが表示されるように
    - <https://twitter.com/HTTPArchive/status/1085298896677597185>
    - HTTP Archive のデータを利用
  - Chrome を直したら Google Photos が壊れた話
    - <https://twitter.com/ecbos_/status/1090726938925297665>
    - Photos を直す代わりに Blink の挙動を仕様に則さないようにしていたらしい


### Firefox 動向

- Stable: 65
- Updates
  - *Firefox 65: WebP support, Flexbox Inspector, new tooling & platform updates*
    - <https://hacks.mozilla.org/2019/01/firefox-65-webp-flexbox-inspector-new-tooling/>
    - CSS Flexbox Inspector
    - Changes panel
    - Advanced color contrast ratio
    - JavaScript debugging improvements
    - CSS environment variables
    - steps() animation timing function
    - `break-*` properties
    - Readable streams
    - Relative time formats
    - Storage Access API
    - globalThis
    - Media: Support for WebP and AV1, and other improvements
  - Today's Firefox Gives Users More Control over their Privacy
    - <https://blog.mozilla.org/blog/2019/01/29/todays-firefox-gives-users-more-control-over-their-privacy/>
  - Firefox 65 for developers
    - <https://developer.mozilla.org/docs/Mozilla/Firefox/Releases/65>
- Intents
  - Ship: TextEncoder.encodeInto() - UTF-8 encode into caller-provided buffer
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/vsU15d9wQkQ/-JW7OEqfDQAJ>
  - *Ship: implicit ref=noopener for `target=_blank` on anchor and area elements*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/DDQP5xIKYiY/3ppe9V-ZCgAJ>
    - noopener をデフォルトにする
    - [blog](https://blog.jxck.io/entries/2016-06-12/noopener.html)
  - Implement and Ship: CSS margin-block and margin-inline shorthands
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/SSDCEvyqAAE/gEFqO9jSDQAJ>
  - Implement and Ship: CSS padding-block and padding-inline shorthands
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/gpubhXTxI6o/8CzbtxK7DQAJ>
  - Implement and Ship: CSS inset/inset-block/inset-inline shorthands
    - <https://groups.google.com/forum/#!topic/mozilla.dev.platform/8dvTjUpgcqU>
    - top, right, bottom, right の logical 版
  - Implement and Ship: CSS border-{block,inline}-{color,style,width} and border-{block,inline} shorthands
    - <https://groups.google.com/forum/#!topic/mozilla.dev.platform/WjKAMVeKb7o>
  - Implement and Ship: The border-{start,end}-{start,end}-radius CSS properties
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/Pjf2a6t-sFA/M8uHtP4vEgAJ>
  - Implement and Ship: CSS border-{block,inline}-{color,style,width} and border-{block,inline} shorthands
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/WjKAMVeKb7o/xLqWZafbEQAJ>
  - Implement and Ship: CSS inset/inset-block/inset-inline shorthands
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/8dvTjUpgcqU/ndU2k8faEQAJ>
  - *Implement: report-to header as part of Reporting API*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/7dykNEdqvzA/DWcGTm4tDwAJ>
    - report-to ディレクティブの実装
    - ReportingObserver は別でやってる
  - *Put off to ship: Event.returnValue*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/nPnUjQt0g1A/nOZXWcwgEgAJ>
    - [詳細](https://miketaylr.com/posts/2019/01/everything-is-terrible-keypress-edition.html)
    -    * Unship: `-moz-binding` CSS property from content.
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/TR1_24OldK8/FQ3X3zPXFwAJ>
- Site Compat
  - <https://www.fxsitecompat.com>
- Other
  - *Bug 1342012 - Implement the dynamic import() proposal*
    - <https://hg.mozilla.org/integration/mozilla-inbound/pushloghtml?changeset=8e6f86cd811a>
    - Dynamic import がフラグ付きで実装、 Firefox 67 で有効に
  - thank u, next
    - <https://words.steveklabnik.com/thank-u-next>
    - rust  の人が抜ける
  - Leaving Mozilla and (most of) the Rust project
    - <https://www.ncameron.org/blog/leaving-mozilla-and-most-of-the-rust-project/>
    - rust の人が抜ける
  - *Defining the tracking practices that will be blocked in Firefox \| Mozilla Security Blog*
    - <https://blog.mozilla.org/security/2019/01/28/defining-the-tracking-practices-that-will-be-blocked-in-firefox/>
    - Anti Tracking Policy をリリース
    - <https://wiki.mozilla.org/Security/Anti_tracking_policy>
    - Parties not wishing to be blocked by this policy should stop tracking Firefox users across websites
  - *The Legacy of Firefox OS - Ben Francis - Medium*
    - <https://medium.com/@bfrancis/the-legacy-of-firefox-os-c58ec32d94f0>
    - Firefox OS 終了前後にうまれた KaiOS などのフォークなどについて


### Safari 動向

- Stable: 12.0.2
- Safari Technology Preview 73
  - <https://webkit.org/blog/8555/release-notes-for-safari-technology-preview-73/>
  - Removed support for `<meta http-equiv=set-cookie>` (r239342)
  - Added support for `globalThis` (r239464)
- Safari Technology Preview 74
  - <https://webkit.org/blog/8566/release-notes-for-safari-technology-preview-74/>
  - *Implemented abortable fetch (r239644)* [blog](https://blog.jxck.io/entries/2017-07-19/aborting-fetch.html)
  - *Imported U2F command and response converters from Chromium (r239665)*
  - *Added support for U2F HID Authenticators on macOS (r239752)*
  - Added support for new rgb() and rgba() syntax described in the CSS Color Level 4 specifications (r239574)
  - Added support for calc() expressions in gradient color stops (r239571)
  - *Made "Disable Web SQL" on by default (r239885)*
  - *Fixed CSP violation reports to bypass CSP checks (r239634)*
- *Removing Legacy SPDY Protocol Support*
  - <https://webkit.org/blog/8569/removing-legacy-spdy-protocol-support/>
  - CFNetwork チームからの依頼で書かれたエントリ
  - URLSession API から SPDY と NPN を削除
  - 2014 with Apple's OS X Yosemite and iOS 8 からサポートされていた
  - Apple Developer Betas of macOS Mojave 10.14.4 and iOS 12.2 で deprecate
  - Safari and WebKit on Apple platforms に広く影響するので
- Other
  - *Ricky Mondello on Twitter: "We released STP 74 yesterday! A small note: STP 74 bumps its Safari version number from 12.1 to 12.2. That is, STP is now tracking a release after Safari 12.1. https://t.co/6dCaLWKy58"*
    - <https://twitter.com/rmondello/status/1088456470356668417>
    - Safari TP 73 までの機能が Safari 12.1 に入る模様


### Edge 動向

- Stable: EdgeHTML18
- Status Updates
  - <https://github.com/MicrosoftEdge/Status/compare/production@{2019-01-01}...production@{2019-02-01}>
  - Origin-Signed HTTP Exchanges
    - under consideration, priority low
- EdgeHTML
  - <https://aka.ms/devguide_edgehtml_18>
  - <https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/>
- Build Changelog
- Chakra
- Other


### WHATWG/W3C 動向

- Recommendation
- Proposed Recommendation
  - Call for Review: User Timing Level 2 is a W3C Proposed Recommendation
    - <https://www.w3.org/blog/news/archives/7495>
  - Call for Review: Web Authentication: An API for accessing Public Key Credentials Level 1 is a W3C Proposed Recommendation
    - <https://www.w3.org/blog/news/archives/7538>
- Candidate Recommendation
- Working Draft
- First Public Working Draft
- Chartering
  - CSS-in-JS Community Group
    - <https://lists.w3.org/Archives/Public/public-new-work/2019Jan/0012.html>
- Other
  - *Declarative routing · Issue #1373 · w3c/ServiceWorker*
    - <https://github.com/w3c/ServiceWorker/issues/1373>
    - <https://jakearchibald.com/2019/service-worker-declarative-router/>
    - ServiceWorker の処理を宣言的に記述したい
    - 最初は条件毎にクラスを作るパターンで提案された
    - domenic の提案でオブジェクトベースに
    - `router.add(conditions, ['cache',''network',{ type: 'cache', request: '/shell.html' }]);`
  - W3C Advisory Committee Elects Technical Architecture Group
    - <https://www.w3.org/blog/news/archives/7480>
    - Google の Alice Boxhall が新たに参加
    - Microsoft の Travis Leithead と Google の Alex Russell が任期満了につき(1 月末)で TAG を抜ける
  - MSEdgeExplainers/explainer.md at master · MicrosoftEdge/MSEdgeExplainers
    - <https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/master/HTMLModules/explainer.md>
    - Edge チームから HTML Modules の提案
    - モジュールスクリプトのみを許した HTML を import できるようにする
  - Fronteers, The W3C, and me
    - <https://www.rachelandrew.co.uk/archives/2019/01/25/fronteers-the-w3c-and-me/>
    - <https://www.smashingmagazine.com/2018/09/representing-web-developers-w3c/>
    - <https://www.meetup.com/ja-JP/Fronteers-NL/events/258152423/>
  - HTML, CSS and our vanishing industry entry points
    - <https://www.rachelandrew.co.uk/archives/2019/01/30/html-css-and-our-vanishing-industry-entry-points/>
    - お気持ち (tl;dr;)
  - *WICG や Chrome チームの explainer プロセスについて問題視*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/gPH_BcOBEtc/evzRLEfIDQAJ>
    - <https://twitter.com/othermaciej/status/1088871541629116416>
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/g-pdQdSR0HI/vXSne9aCDAAJ>
      - 個人の explainer ではなくちゃんとグループのレポジトリに追加しようね、など


### TC39 動向

- *ES2019 Final Feature Set*
  - <https://github.com/tc39/proposals/blob/master/finished-proposals.md>
  - <http://2ality.com/2018/02/ecmascript-2019.html>
  - ES2019 に入る 8 つの機能(現 Stage 4)が確定
    - Optional catch binding
    - JSON superset
    - Symbol.prototype.description
    - Function.prototype.toString
    - Object.fromEntries
    - Well-formed JSON.stringify
    - String.prototype.{trimStart,trimEnd}
    - Array.prototype.{flat,flatMap}
- Proposals Diff
  - <https://github.com/tc39/proposals/compare/master@{2019-01-01}...master@{2019-02-01}>
  - 0->1
  - 1->2
    - Promise.allSettled
  - 2->3
  - 3->4
    - Array.prototype.{flat,flatMap}
    - String.prototype.{trimStart,trimEnd}
    - Object.fromEntries
    - JSON.stringify
- New Proposals
  - bakkot/proposal-freeze-prototype
    - <https://github.com/bakkot/proposal-freeze-prototype>
  - tc39/proposal-intl-displaynames
    - <https://github.com/tc39/proposal-intl-displaynames/>
  - littledan/proposal-new-initialize
    - <https://github.com/littledan/proposal-new-initialize>
  - littledan/proposal-operator-overloading
    - <https://github.com/littledan/proposal-operator-overloading/>
  - *devsnek/proposal-iterator-helpers*
    - <https://github.com/devsnek/proposal-iterator-helpers>
    - `Iterator.range(0, Infinity).filter((n) => n % 2 === 0).take(5)`
    - promise の配列を array にしたりしたい
  - Private Declarations
    - <https://docs.google.com/presentation/d/1Zu9uCFMUU4zLwBVSd3OOxtsm-CYyYvJIryLVGW5leoA/edit>
  - jridgewell/proposal-private-symbols: A proposal for private symbols in JavaScript
    - <https://github.com/jridgewell/proposal-private-symbols>
  - *littledan/proposal-reserved-decorator-like-syntax:*
    - <https://github.com/littledan/proposal-reserved-decorator-like-syntax>
    - 記号の取り合いも枯渇し、新しい構文を追加するのも限界がきている
    - 将来的な拡張はデコレータベースでやっていくのが良さそう
    - `@[expressionLike]` のような構文を予約しておく
    - 互換性を保ちつつ拡張していくベースとして考える
  - *tc39/proposal-promise-any*
    - <https://github.com/tc39/proposal-promise-any>
    - Promise.allSettled: 全部 resolve/reject したら終わり
    - Promise.all: 一個でも reject したら終わり
    - Promise.race: 一個でも resolve/reject したら終わり
    - Promise.any: 一個でも resolve したら終わり、全部だめだったらエラー配列で reject
- Other
  - *Future JavaScript: what is still missing?*
    - <http://2ality.com/2019/01/future-js.html>
  - *Justin Fagnani on Twitter: "JavaScript class fields are so, so, very broken"*
    - <https://twitter.com/justinfagnani/status/1090732607615029248>
    - class fields の設計がうれしくないという指摘


### IETF 動向

- IETF
- RFC
  - *RFC 8448 - Example Handshake Traces for TLS 1.3*
    - <https://tools.ietf.org/html/rfc8448>
- IETF Last Call
- WG Last Call
- Call for Adoption
- I-D Action
- Draft
  - Use of the Hash-based Signature Algorithm with CBOR Object Signing and Encryption (COSE)
    - <https://tools.ietf.org/html/draft-ietf-cose-hash-sig-00>
  - Third-Party Device Attestation for ACME
    - <https://tools.ietf.org/html/draft-yusef-acme-3rd-party-device-attestation-00>
  - Algorithm Identifiers for the HMAC-based Extract-and-Expand Key Derivation Function (HKDF)
    - <https://tools.ietf.org/html/draft-housley-hkdf-oids-00>
  - Extended Security Considerations for the Automatic Certificate Management Environment (ESecACME)
    - <https://tools.ietf.org/html/draft-fiebig-security-acme-00>
  - CBOR Algorithms for Object Signing and Encryption (COSE)
    - <https://tools.ietf.org/html/draft-ietf-cose-rfc8152bis-algs-00>
  - CBOR Object Signing and Encryption (COSE) - Structures and Process
    - <https://tools.ietf.org/html/draft-ietf-cose-rfc8152bis-struct-00>
  - Hybrid Public Key Encryption
    - <https://tools.ietf.org/html/draft-barnes-cfrg-hpke-00>
  - TLS Ticket Requests
    - <https://tools.ietf.org/html/draft-ietf-tls-ticketrequests-00>
  - *The Cache HTTP Response Header*
    - <https://tools.ietf.org/html/draft-ietf-httpbis-cache-header-00>
  - *Pairing-Friendly Curves*
    - <https://tools.ietf.org/html/draft-yonezawa-pairing-friendly-curves-00>
    - 日本人(レピダム、 NTT)からのドラフト
  - Using Early Data in DOTS
    - <https://tools.ietf.org/html/draft-boucadair-dots-earlydata-00>
    - DOTS で TLS1.3 の 0-RTT を使う
  - Concise Binary Object Representation (CBOR) Tag for Error Indications
    - <https://tools.ietf.org/html/draft-richter-cbor-error-tag-00>
  - CBOR Object Signing and Encryption (COSE): Headers for carrying and referencing X.509 certificates
    - <https://tools.ietf.org/html/draft-ietf-cose-x509-00>
  - *OAuth 2.0 for Browser-Based Apps*
    - <https://tools.ietf.org/html/draft-ietf-oauth-browser-based-apps-00>
    - Browser Based App で OAuth 2.0 を利用する上での BCP
  - *mikewest/first-party-sets*
    - <https://github.com/mikewest/first-party-sets>
  - Reporting Repository
    - <https://tools.ietf.org/html/draft-mcpherson-sattler-reporting-repository-00>
  - Report Structure
    - <https://tools.ietf.org/html/draft-mcpherson-sattler-report-structure-00>
  - Transaction Report
    - <https://tools.ietf.org/html/draft-mcpherson-sattler-transaction-report-00>
  - Contact Inventory Report
    - <https://tools.ietf.org/html/draft-sattler-contact-inventory-report-00>
  - Domain Drop List Report
    - <https://tools.ietf.org/html/draft-sattler-domain-drop-list-report-00>
  - Domain Inventory Report
    - <https://tools.ietf.org/html/draft-sattler-domain-inventory-report-01>
  - Premium Domain Fee Report
    - <https://tools.ietf.org/html/draft-sattler-premium-domain-fee-report-01>
  - Unavailable Domain Report
    - <https://tools.ietf.org/html/draft-sattler-unavailable-domain-report-01>
- Other
  - *Cache Digests status from Mark Nottingham*
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2019JanMar/0033.html>
    - [blog](https://daniel.haxx.se/blog/2019/01/21/quic-and-missing-apis/)
    - Cache Digest の実装が進まないし、仕様としては Dead では?
    - もう Push は終わるかもしれない
    - <https://github.com/mozilla/standards-positions/issues/131>
    - Mozilla は実装はしないけど non-harmful になりそう。
  - QUIC and missing APIs
    - <https://daniel.haxx.se/blog/2019/01/21/quic-and-missing-apis/>
  - Introduction to WebAuthn API - Ackermann Yuriy
    - <https://medium.com/@herrjemand/introduction-to-webauthn-api-5fd1fb46c285>
  - *pmeenan/http3-prioritization-proposal: Proposal for a prioritization scheme that does not use stream dependencies.*
    - <https://github.com/pmeenan/http3-prioritization-proposal>
    - H2 で Priority を提供するセマンティクスはあるが、実装は難しい。
    - dependencies tree を構築管理する方式だった
    - H3 ではもっとシンプルに "priority" と "concurrency" だけで定義できないかという提案
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2019JanMar/0073.html>
    - 盛り上がってる
  - HTTP/3 talk on video \| daniel.haxx.se
    - <https://daniel.haxx.se/blog/2019/01/23/http-3-talk-on-video/>
  - HTTP/3: From root to tip
    - <https://blog.cloudflare.com/http-3-from-root-to-tip/>
  - *Tracks issues / notes for HTTP/2 prioritization across browsers, CDNs and servers*
    - <https://github.com/andydavies/http2-prioritization-issues#cdns--cloud-hosting-services>
    - CDN で H2 Priority を実装できているかのテスト結果


### セキュリティ動向

- *TLS 1.3 rollout on GitHub.com \| The GitHub Blog*
  - <https://blog.github.com/changelog/2019-01-15-tls13-rollout/>
  - エントリ公開の前週に github.com で TLS 1.3 をロールアウト
  - 1 週間ほどで 30% ほどのトラフィックが 1.3 上に
- *Let's Encrypt No Longer Checking Google Safe Browsing - Issuance Policy - Let's Encrypt Community Support*
  - <https://community.letsencrypt.org/t/let-s-encrypt-no-longer-checking-google-safe-browsing/82168>
  - 証明書の提供前に Google Safe Browsing を見ていたがやめた
  - 通信の暗号化とコンテンツの内容保証は関係ないから
  - Let's Encrypt 的には Out Of Scope
- *Detecting Phishing Sites Using Certificate Transparency Monitoring \| Hardenize Blog*
  - <https://www.hardenize.com/blog/certificate-transparency-monitoring-phishing-detection>
  - CT を監視して似た名前で取ってるフィッシングサイトを見つけ出す話
- Introduction to WebAuthn API
  - <https://medium.com/@herrjemand/introduction-to-webauthn-api-5fd1fb46c285>


### 周辺動向

- Web Standards: The What, The Why, And The How - Smashing Magazine
  - <https://www.smashingmagazine.com/2019/01/web-standards-guide/>
- *pinch-zoom-element*
  - <https://paul.kinlan.me/ja/pinch-zoom-element/>
  - `<pinch-zoom>` 要素のデモ
- *Common CSS Issues For Front-End Projects*
  - <https://www.smashingmagazine.com/2018/12/common-css-issues-front-end-projects/>
  - 取りこぼし
- Bruce Lawson's personal site: The practical value of semantic HTML
  - <https://www.brucelawson.co.uk/2018/the-practical-value-of-semantic-html/>
- *Twitter が change password の well-known uri をサポートしてた*
  - <https://mobile.twitter.com/.well-known/change-password>
  - <https://github.com/WICG/change-password-url>
  - <https://twitter.com/rmondello/status/1090702498220961793>
  - <https://www.youtube.com/watch?v=-0dwX2kf6Oc>


### イベント

- 2 月
  - 7-8: JSConf Hawaii
    - <https://www.jsconfhi.com/>
- 3 月
  - IETF 104 Prague
    - <https://ietf.org/blog/cisco-co-host-ietf104/>
- 4 月
  - 9-10: BlinkOn 10
    - <https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/5K4WbTlD9rI>
  - 17-18: AMP Conf 2019: Tokyo
    - <https://amphtml.wordpress.com/2019/01/08/announcing-amp-conf-2019-tokyo/>
- 5 月
  - 7-9: Google I/O
    - <https://events.google.com/io/transmission>
- 6 月
  - 1-2: JSConf EU
    - <https://2019.jsconf.eu/>
- 7 月
- 8 月
- 9 月
  - 16-20: W3C TPAC 2019 (Fukuoka)
    - <https://www.w3.org/wiki/TPAC/2019>
