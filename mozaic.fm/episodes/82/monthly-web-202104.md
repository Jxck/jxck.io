# [monthly-web][mozaic.fm] ep82 Monthly Web 202104


## Info

audio: https://files.mozaic.fm/mozaic-ep82.mp3

published_at
: 2021-05-09

guest
: [@myakura](https://twitter.com/myakura)

guest
: [@flano_yuki](https://twitter.com/flano_yuki)

guest
: [@sosukesuzuki](https://twitter.com/__sosukesuzuki)


## Theme

第 81 回のテーマは 2021 年 4 月の Monthly Web です。


### Chrome 動向


#### Stable: 90


#### Updates

- Chromium Blog: Chrome 91: Handwriting Recognition, WebXR Plane Detection and More
  - <https://blog.chromium.org/2021/04/chrome-91-handwriting-recognition-webxr.html>
  - Origin Trials
    - New Origin Trials
      - Declarative Link Capturing for PWAs
      - WebTransport
      - WebXR Plane Detection API
    - Completed Origin Trials
      - battery-savings Meta Tag
      - Searching Hidden Text
      - WebAssembly SIMD
  - Other features in this release
    - Align performance API timer resolution to cross-origin isolated capability
    - Clipboard: Read-Only Files Support
    - CSS
      - Custom Counter Styles
      - Single `<compound-selector>` for `:host()` and `:host-context()`
    - Form Controls Visual Refresh on Android
    - GravitySensor Interface
    - *SharedArrayBuffers on Desktop Platforms Restricted to Cross-Origin Isolated Environments*
    - Suggested file name and location for the File System Access API
    - WebOTP API: cross-origin iframe support
    - *WebSockets over HTTP/2*
    - *Credentials sharing for sites affiliated with Digital Asset Links*
  - JavaScript
    - *ES Modules for service workers ('module' type option)*
    - *Checks for Private Fields*


#### Intents

- Ship: Add dayPeriod option for Intl.DateTimeFormat
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/7zqShg05D3c/m/P7oL2E7FAQAJ>
- *Ship: ALPS and ACCEPT_CH HTTP/2 and HTTP/3 frames*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/6EoEnqxqhsk/m/WC4kkMCAAQAJ>
- Ship: `navigator.webdriver === false` when automation is not enabled.
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/h-5nQQLs2QU/m/iRVKU4LhAgAJ>
- *Ship: Cookie Store API on local secure contexts*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/ekdeaj09c0w/m/gK9lu568AgAJ>
  - Cookie Store API が secure context に限定され、 localhost などにも公開されてなかった
  - HTTPS サーバが無くても試せるよう localhost などにも公開する
- Ship: Final specified imperative slot distribution behavior
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/6U78F3KWJ78/m/hcEoYVx8AgAJ>
- Ship: Allow Navigator.registerProtocolHandler to register "ftp"
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/ABhlioapE0E/m/gXL84wPfAAAJ>
- Implement and Ship: Block HTTP port 10080
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/CNpLNXx2wf0/m/Ehi3cx1YAQAJ>
- Implement and ship: Media Session API: Video conferencing actions
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/sXhlwO_R9To/m/q7QuMyc_AQAJ>
- *Implement and Ship: Implement :playing, :paused pseudo-classes*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/kz3w-yOMDks/m/Ue71o4xYAAAJ>
  - audio/video が再生中かどうかなどを取得する擬似クラス
- *Prototype: auto keyword for contain-intrinsic-size*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/loqGn7N9hzU/m/mRDdLA_cAgAJ>
  - `content-visibility: auto` との組み合わせでページの大きさががたがた変わってしまうのを防ぐために、`contain-intrinsic-size` に新しく auto というキーワードを追加する
- *Prototype: Service Worker subresource filter*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/uEcgVgTJ5qA/m/bemJBwikBAAJ>
  - 全 Request が onfetch にヒットするとオーバーヘッドが大きい
  - 必要なもののみ onfetch にヒットするように `Service-Worker-Subresource-Filter` のみにする
- Implement and ship: tainted origin flag in Timing Allow Origin
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/V5jFCsw8J2M/m/VBg0oh2_AwAJ>
- Experiment: WebTransport over HTTP/3
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/aaLFxzw5zL4/m/H3V_l-qlAgAJ>
- *Experiment: Network State Partitioning*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/sLC_W6B8big/m/5sk787RQBAAJ>
  - side channel を防ぐために、グローバルで共有されるネットワーク状態も分離する
  - connection (H1,2,3, websocket), DNS cache, ALPN/H2 data, TLS/H3 resumption, Reporting/NEL, Expect-CT etc.
- *Experiment: New Canvas 2D API*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/bEgFQrTsDso/m/9wD9tqxQBAAJ>
- Extend Origin Trial: Trust Token API (Take 2)
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/-W90wVkS0Ks/m/HyICZtuuBAAJ>
- Change:
- Unship:
- Remove:
- Deprecate and Remove: RTCConfiguration.offerExtmapAllowMixed
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/Plik-x6biZ0/m/eJ8P1iy0AQAJ>


#### V8

- Private brand checks a.k.a #foo in obj
  - <https://v8.dev/features/private-brand-checks>
  - <https://github.com/tc39/proposal-private-fields-in-in/blob/main/README.md>


#### Other

- web.dev
  - Evolving the CLS metric
    - <https://web.dev/evolving-cls/>
  - *Take the 2021 scroll survey to help improve scrolling on the web*
    - <https://web.dev/2021-scroll-survey/>
    - scroll 関連 API や実装に関するアンケート
  - Fill OTP forms within cross-origin iframes with WebOTP API
    - <https://web.dev/web-otp-iframe/>
  - Building split text animations
    - <https://web.dev/building-split-text-animations/>
  - *Customize the window controls overlay of your PWA's title bar*
    - <https://web.dev/window-controls-overlay/>
    - Title Bar にコンテンツを埋め込む方法
  - Keeping third-party scripts under control
    - <https://web.dev/controlling-third-party-scripts/>
  - Mainline Menswear implements PWA and sees a 55% conversion rate uplift
    - <https://web.dev/mainline-mensware/>
  - *Breaking down barriers using the DataTransfer API*
    - <https://web.dev/datatransfer/>
    - drag and drop などの UI で Window 間でデータをやりとりする API
- google developer blog
  - Announcing the Sustainable Monetized Websites video series
    - <https://developers.google.com/search/blog/2021/04/sustainable-monetized-websites>
  - *Get started with signed exchanges on Google Search*
    - <https://developers.google.com/search/docs/advanced/experience/signed-exchange>
    - Google 検索結果でこれまで AMP のみ SXG による Prefetch が対応されていた
    - これが AMP 以外のサイトでも Prefetch されるようになった
  - *More time, tools, and details on the page experience update*
    - <https://developers.google.com/search/blog/2021/04/more-details-page-experience?hl=ja>
    - Page Experience Update の続報
    - 5 月とアナウンスされていたが 6 月中旬ロールアウト開始に
    - Search Console にページエクスペリエンスのダッシュボードが追加される
    - Google 検索での Non AMP SXG 対応
- google developer japan blog
  - <https://developers-jp.googleblog.com/>
- chromium blog
  - Chromium Blog: Don't Copy That Surface
    - <https://blog.chromium.org/2021/04/dont-copy-that-surface.html>
  - Chromium Blog: Efficient And Safe Allocations Everywhere!
    - <https://blog.chromium.org/2021/04/efficient-and-safe-allocations-everywhere.html>
  - Chromium Blog: Digging for performance gold: finding hidden performance wins
    - <https://blog.chromium.org/2021/04/digging-for-performance-gold.html>
  - Chromium Blog: Help users log in across affiliated sites on Chrome
    - <https://blog.chromium.org/2021/04/help-users-log-in-across-affiliated.html>
- amp
  - *Privacy-preserving instant loading for all web content*
    - <https://blog.amp.dev/2019/05/22/privacy-preserving-instant-loading-for-all-web-content/>
- canary
  - <https://www.chromium.org/getting-involved/dev-channel>
- 3/22 の WebView 障害について障害レポートが出た
  - <https://static.googleusercontent.com/media/www.google.com/en//appsstatus/ir/fw6156fs1panucr.pdf>
  - > A bug within Chrome & WebView's experiment & configuration technology caused instability for Android applications which incorporated WebView to surface web content.


### Firefox 動向


#### Stable: 88

- Firefox 88.0, See All New Features, Updates and Fixes
  - <https://www.mozilla.org/en-US/firefox/88.0/releasenotes/>
- *Firefox 88 for developers - Mozilla*
  - <https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/88>
  - :user-valid, :user-invalid
  - image-set()
  - outline プロパティによるアウトラインが border-radius に沿うように
  - RegExp match indices
    - <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec>
    - <https://v8.dev/features/regexp-match-indices>
- Never too late for Firefox 88 - Mozilla Hacks - the Web developer blog
  - <https://hacks.mozilla.org/2021/04/never-too-late-for-firefox-88/>
- *Firefox 88 combats window.name privacy abuses - Mozilla Security Blog*
  - <https://blog.mozilla.org/security/2021/04/19/firefox-88-combats-window-name-privacy-abuses/>
  - window.name プロパティはその性質からナビゲーションをまたいで保持されていた
  - クロスオリジンのナビゲーションでも保持されるので、トラッキングに使われていた
  - トラッキングを防ぐため、サイトをまたぐナビゲーションの場合に window.name を空にするように
    - トラッキング以外で使われているコードにも影響が出るので、ポップアップウインドウなどは対象外
    - 戻るボタンなどで戻った場合は、`window.name` の値を復元する


#### Updates

- *QUIC and HTTP/3 Support now in Firefox Nightly and Beta - Mozilla Hacks - the Web developer blog*
  - <https://hacks.mozilla.org/2021/04/quic-and-http-3-support-now-in-firefox-nightly-and-beta/>
  - Firefox 88 から Stable でも段階的ロールアウト開始予定、 5 月末までにはデフォルトで有効になる
- *SpiderMonkey Newsletter 10 (Firefox 88-89)*
  - <https://spidermonkey.dev/blog/2021/04/22/newsletter-10.html>


#### Intents

- Ship: forced-colors
  - <https://groups.google.com/g/mozilla.dev.platform/c/zwDaj0JMYjs/m/roFqKU9HAQAJ>
- Ship: Large ArrayBuffers and large wasm memories
  - <https://groups.google.com/a/mozilla.org/g/dev-platform/c/90hVJF-X9c4>
- Ship: @font-face metrics override descriptors
  - <https://groups.google.com/a/mozilla.org/g/dev-platform/c/eeo02Z1x7NU>
- *Implement and Ship: Block HTTP port 10080*
  - <https://groups.google.com/a/chromium.org/g/net-dev/c/bhYOhj4WJC8/m/B1qpE040CAAJ>
- Prototype: WebAssembly extended constants
  - <https://groups.google.com/a/mozilla.org/g/dev-platform/c/trMP9CP0_go>
- Prototype: WebAssembly relaxed SIMD
  - <https://groups.google.com/a/mozilla.org/g/dev-platform/c/it0bm-mipDQ>
- Unship: -moz-outline-radius (now that we follow the border-radius curve for outlines)
  - <https://groups.google.com/a/mozilla.org/g/dev-platform/c/atwrUuiMa-U>


#### Other

- *TC39 Proposal Temporal · Issue #498 - mozilla/standards-positions*
  - <https://github.com/mozilla/standards-positions/issues/498#issuecomment-817512705>
  - 先月話した件、 Anne 的には "that is fine" とのこと
  - 以下の 3 つがわかった
    - stage 3 なら mozilla は少なくとも harmful じゃない
    - harmful ならそもそも stage 3 にはならない
    - temporal は worth prototyping
- These Weeks in Firefox: Issue 91 – Firefox Nightly News
  - <https://blog.nightly.mozilla.org/2021/04/12/these-weeks-in-firefox-issue-91/>
- *Notes on Implementing Vaccine Passports - The Mozilla Blog*
  - <https://blog.mozilla.org/blog/2021/04/22/notes-on-implementing-vaccine-passports/>
  - ワクチン接種証明の仕組みについて
  - Unforgeability, Information minimization, Untraceability が必要
    - US の証明は紙ベース、生年月日が記載されているなど課題がある
  - 改ざんに強い接種証明情報の仕組み(物理的もしくはデジタルな)が求められる
    - 物理的なものはスケールしにくい
    - デジタル証明による仕組みがいいんじゃないか


### Safari 動向


#### Stable: 14.0.3


#### Updates

- Introducing CSS Grid Inspector
  - <https://webkit.org/blog/11588/introducing-css-grid-inspector/>


#### Position

- [webkit-dev] Request for position: ALPS and ACCEPT_CH HTTP/2 and HTTP/3 frames
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-April/031768.html>
- [webkit-dev] Fwd: Request for position: Dedicated workers as service worker clients
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-April/031774.html>
- [webkit-dev] Request for position: Cryptographically secure random UUIDs
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-April/031783.html>
- [webkit-dev] Request for position on First-Party Sets
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-April/031784.html>
- [webkit-dev] Request for position: contain-intrinsic-size auto & longhands
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-April/031787.html>
- [webkit-dev] Request for position: tainted origin flag affecting Timing Allow Origin
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-April/031788.html>
- [webkit-dev] Request for Position: COLR v1 Vector Color Fonts
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-April/031789.html>
- [webkit-dev] Request for position: Element/FrozenArray IDL attribute reflection
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-April/031790.html\>


#### Other


### Edge 動向


#### Stable: 90


#### Updates

- <https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel>
  - ここでも見れる
- <https://twitter.com/MSEdgeDev>
  - これを見るしか無い


#### Chakra


#### Other

- Get your extensions featured on the Microsoft Edge Add-ons home page - Microsoft Tech Community
  - <https://techcommunity.microsoft.com/t5/articles/get-your-extensions-featured-on-the-microsoft-edge-add-ons-home/m-p/2260862>
- Dev channel update to 91.0.864.1 is live - Microsoft Tech Community
  - <https://techcommunity.microsoft.com/t5/discussions/dev-channel-update-to-91-0-864-1-is-live/m-p/2280695>
- Introducing Microsoft Edge Kids Mode, a safer space for your child to discover the web
  - <https://blogs.windows.com/windowsexperience/2021/04/15/introducing-microsoft-edge-kids-mode-a-safer-space-for-your-child-to-discover-the-web/>
- Keeping your family safer online with Microsoft Edge and celebrating 1 year of Give with Bing
  - <https://blogs.windows.com/windowsexperience/2021/04/15/keeping-your-family-safer-online-with-microsoft-edge-and-celebrating-1-year-of-give-with-bing/>
- *Feature differences between Microsoft Edge and WebView2 - Microsoft Edge Development*
  - <https://docs.microsoft.com/en-us/microsoft-edge/webview2/concepts/browserfeatures>
- Microsoft Edge - Internet Explorer mode and compatibility - YouTube
  - <https://www.youtube.com/watch?v=BlbuMbs6bKA>
- *5/25-27 Microsoft Build 2021*
  - <https://japan.zdnet.com/article/35168829/>
  - 詳細はまだ


### WHATWG/W3C 動向


#### Draft

- Recommendation
  - Web Authentication: An API for accessing Public Key Credentials Level 2 is a W3C Recommendation
    - <https://www.w3.org/blog/news/archives/9010>
- Proposed Recommendation
  - [webperf] Call for Consensus - Publishing Beacon to PR
    - <https://lists.w3.org/Archives/Public/public-web-perf/2021Apr/0007.html>
- Candidate Recommendation
  - [webperf] Call for Consensus - CR publishing
    - <https://lists.w3.org/Archives/Public/public-web-perf/2021Apr/0006.html>
      - Performance Timeline L2 <https://www.w3.org/TR/performance-timeline-2/>
      - Resource Timing L2 <https://www.w3.org/TR/resource-timing-2/>
      - User Timing L3 <https://www.w3.org/TR/user-timing-3/>
- Working Draft
- First Public Working Draft
  - First Public Working Drafts for WebCodecs
    - <https://www.w3.org/blog/news/archives/9003>
- Chartering
  - Web & Networks Interest Group Charter Approved
    - <https://lists.w3.org/Archives/Public/public-new-work/2021Apr/0003.html>
    - (Meetings)
      - <https://www.w3.org/wiki/Networks>
      - 4 月ミーティング「Multicast Receiver」
      - https://www.w3.org/2011/webtv/wiki/images/9/94/Multicast%2C_2021-04_%40W3C_Video_Interest_group-v2.pdf
  - Spec Editors Community Group created
    - <https://lists.w3.org/Archives/Public/public-new-work/2021Apr/0007.html>
  - Accessible Platform Architectures Working Group
    - <https://lists.w3.org/Archives/Public/public-new-work/2021Apr/0011.html>


#### Other

- WEBRTC WG Virtual Interim
  - <https://lists.w3.org/Archives/Public/public-webrtc/2021Apr/0005.html>
- WebTransport Bi-weekly Virtual Meeting
  - <https://www.w3.org/wiki/WebTransport/Meetings>
- WebAppsec Meeting
  - <https://github.com/w3c/webappsec/blob/main/meetings/2021/2021-04-20-agenda.md>
- 2021 年 03 月 W3C 活動概要
  - <https://w3ckeio.github.io/monthly-summary/202103.html>


### TC39 動向


#### Meeting

- 2021-04
  - Agenda for the 82nd meeting of Ecma TC39
    - <https://github.com/tc39/agendas/blob/master/2021/04.md>
  - TODO: note
    - <https://github.com/tc39/notes>


#### Proposals Diff

- <https://github.com/tc39/proposals/compare/master@{2021-04-01}...master@{2021-05-01}>
- <https://tc39.github.io/beta/>
- 0->1
  - <https://github.com/littledan/proposal-module-fragments>
  - <https://github.com/rricard/proposal-change-array-by-copy>
- 1->2
  - <https://github.com/tc39/proposal-array-find-from-last>
  - <https://github.com/tc39-transfer/proposal-object-has>
  - <https://github.com/tc39/proposal-symbols-as-weakmap-keys>
- 2->3
  - <https://github.com/tc39/proposal-temporal>
  - <https://github.com/tc39/proposal-error-cause>
- 3->4
  - <https://github.com/tc39/proposal-private-methods>
  - <https://github.com/tc39/proposal-class-fields>
  - <https://github.com/tc39/proposal-static-class-features>


#### New Proposals

- tc39/proposal-accessible-object-hasownproperty
  - <https://github.com/tc39/proposal-accessible-object-hasownproperty>
  - Object.prototype.hasOwnProperty のスタティックメソッド版
- tc39/proposal-change-array-by-copy:
  - <https://github.com/tc39/proposal-change-array-by-copy>
  - イミュータブルな配列操作メソッドたち
- Jack-Works/proposal-readonly-arraybuffer
  - <https://github.com/Jack-Works/proposal-readonly-arraybuffer/>
  - ArrayBuffer をフリーズするインスタンスメソッド
- Jack-Works/proposal-arraybuffer-fixed-view
  - <https://github.com/Jack-Works/proposal-arraybuffer-fixed-view>
  - .buffer にアクセスできない ArrayBuffer


#### Other

- <https://github.com/tc39/notes/blob/master/meetings/2021-03/mar-10.md#promiseanysettled>
- Pattern matching updates - HackMD
  - <https://hackmd.io/@mpcsh/HkZ712ig_#/>


### IETF 動向


#### WG

- IETF
  - <https://datatracker.ietf.org/meeting/>
- httpwg
  - <https://lists.w3.org/Archives/Public/ietf-http-wg/>
  - <https://github.com/httpwg/wg-materials/>
  - *WGLC for Proxy Status*
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0024.html>
  - I-D Action: draft-ietf-httpbis-message-signatures-03.txt
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0021.html>
  - I-D Action: draft-ietf-httpbis-digest-headers-05.txt
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0029.html>
  - *I-D Action: draft-ietf-httpbis-cache-header-08.txt*
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0046.html>
  - I-D Action: draft-ietf-httpbis-message-signatures-04.txt
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0053.html>
  - Publication has been requested for draft-ietf-httpbis-messaging-15
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0031.html>
  - Publication has been requested for draft-ietf-httpbis-semantics-15
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0032.html>
  - Publication has been requested for draft-ietf-httpbis-cache-15
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0033.html>
  - Publication has been requested for draft-ietf-httpbis-cache-header-08
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0050.html>
  - *BCP56bis - remaining work*
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0048.html>
  - *ANN: Scheduling our next Interim Meeting*
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0045.html>
    - Currently, we're looking at June 15 and 17, at 21:00 UTC:
  - *Removals from HTTP/2*
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0055.html>
    - Upgrade と Priority を H2 から削除する最終確認
- quicwg
  - <https://mailarchive.ietf.org/arch/browse/quic/>
  - <https://github.com/quicwg/wg-materials>
  - QUIC 2021-04-21 Interim Meeting Minutes
    - <https://github.com/quicwg/wg-materials/blob/main/interim-21-04/minutes.md>
  - *QUIC Version 2*
    - <https://www.ietf.org/archive/id/draft-duke-quic-v2-00.html>
    - F5 の人がバージョンネゴシエーションを試すために考えたもの
- webtrans
  - <https://mailarchive.ietf.org/arch/browse/webtransport/>
  - <https://github.com/DavidSchinazi/webtrans-wg-materials>
- tlswg
  - <https://mailarchive.ietf.org/arch/browse/tls/>
  - <https://github.com/tlswg/wg-materials>
  - interim
    - <https://datatracker.ietf.org/meeting/interim-2021-tls-01/session/tls>
- wpack
  - <https://mailarchive.ietf.org/arch/browse/wpack/>
- privacypass
- dispatch
  - <https://mailarchive.ietf.org/arch/browse/dispatch/>
    - Date and Time on the Internet: Timestamps with additional information
      - <https://tools.ietf.org/html/draft-ryzokuken-datetime-extended-01>
- secdispatch
  - <https://mailarchive.ietf.org/arch/browse/secdispatch/>
- masque
  - interim
    - <https://datatracker.ietf.org/meeting/interim-2021-masque-03/session/masque>
  - The CONNECT-IP HTTP Method
    - <https://www.ietf.org/archive/id/draft-cms-masque-connect-ip-00.html>
- other


#### Other

- *DCtheTall/CHIPS: A proposal for a cookie attribute to partition cross-site cookies by top-level site*
  - <https://github.com/DCtheTall/CHIPS>
  - `SameSite=None; Secure; HttpOnly; Path=/; Partitioned;` と Partitioned 属性をつける
  - 3rd Party Cookie が 1st Party に紐づけて保存されその組み合わせだけで送られるようになる
  - 全ての 3rd Party Cookie をブロックすることに対する緩和策
- [mikewest/cookie-incrementalism] Origin-Bound Cookies
  - <https://github.com/mikewest/cookie-incrementalism/pull/4>
- Re: [E] Re: HTTP State Tokens
  - <https://lists.w3.org/Archives/Public/public-privacycg/2021Apr/0006.html>
  - HTTP State Tokens の現状について質問があり Mike West が回答
  - インクリメンタルに Cookie を更新していくことにどちらかというとみんな興味があるため、ホールドする
- Updating HTTP Caching Policy in Trailers
  - <https://www.ietf.org/archive/id/draft-nottingham-cache-trailers-00.html>


### CDN 動向


#### Akamai

- 2021 年:急速に増加するボリューム型 DDoS 攻撃 - Akamai Japan Blog
  - <https://blogs.akamai.com/jp/2021/04/2021-volumetric-ddos-attacks-rising-fast.html>
- Akamai 、新たなピークトラフィックを記録 - さらに「その先」を見据えて - Akamai Japan Blog
  - <https://blogs.akamai.com/jp/2021/04/akamai-2.html>
  - 3 月にエッジのトラフィックが 200Tbps を記録
  - > 1 杯のコーヒーを 1 メガバイトとした場合、 200 Tbps は、すべてのニューヨーク市民に 1 分あたり 180 杯以上のコーヒーを提供したことになります。


#### Cloudflare

- Cloudflare Pages is now Generally Available
  - <https://blog.cloudflare.com/cloudflare-pages-ga/>
- Expanding the Cloudflare Workers Observability Ecosystem
  - <https://blog.cloudflare.com/observability-ecosystem/>
- Announcing Cloudflare Workers Unbound for General Availability
  - <https://blog.cloudflare.com/workers-unbound-ga/>
- Improve your page experience with AMP and Cloudflare Workers Unbound
  - <https://blog.cloudflare.com/amp-optimizer-on-cloudflare-workers/>
- Introducing WebSockets Support in Cloudflare Workers
  - <https://blog.cloudflare.com/introducing-websockets-in-workers/>
- Introducing workers.new, custom builds, and improved logging for Workers
  - <https://blog.cloudflare.com/workers-new-custom-builds-and-improved-logging/>
- Announcing Cloudflare Images beta to simplify your image pipeline
  - <https://blog.cloudflare.com/announcing-cloudflare-images-beta/>


#### Fastly


#### Other


### セキュリティ動向

- *Apple の iOS 14 リリースが広告やレポートに及ぼしうる影響 | Facebook Business ヘルプセンター*
  - <https://www.facebook.com/business/help/331612538028890?id=428636648170202>
  - AppTrackingTransparency に基づく Facebook Pixel ユーザへの注意喚起とガイドラインが FB から公開された
    - <https://developer.apple.com/jp/app-store/user-privacy-and-data-use/>
  - ATT の影響があっても効果的な広告が提供できるように Aggregated Event Measurement を提供することに
    - <https://www.facebook.com/business/help/721422165168355>
  - これを使うにはドメイン認証が必要になる
    - <https://www.facebook.com/business/help/245311299870862>
    - ドメイン認証は eTLD + 1 の範囲で Public Suffix List を見る
  - その結果、 PSL への追加リクエストが急増している
    - <https://github.com/publicsuffix/list/issues/1245>
    - FB も FB Pixel のために PSL 追加リクエストをすることは推奨しないと書いてはいる
  - PSL のメンテナンスはボランティアベースなので困っている
  - [blog](https://blog.jxck.io/entries/2021-04-21/public-suffix-list.html)


### 周辺動向

- アドレスバーに "entry.new" と入力すると、はてなブログの記事が書けるようになりました! - はてなブログ開発ブログ
  - <https://staff.hatenablog.com/entry/2021/04/07/101249>
- Is WebAssembly magic performance pixie dust? - surma.dev
  - <https://surma.dev/things/js-to-asc/>
- My Drafts - Modern Web Development with Chrome by Paul Kinlan
  - <https://paul.kinlan.me/my-drafts/>
- FLoC 無効化や FLoC への懸念・批判
  - Use DuckDuckGo Extension to Block FLoC, Google's New Tracking Method in Chrome
    - <https://spreadprivacy.com/block-floc-with-duckduckgo/>
  - No, Google! Vivaldi users will not get FloC'ed.
    - <https://vivaldi.com/blog/no-google-vivaldi-users-will-not-get-floced/>
  - Why Brave Disables FLoC
    - <https://brave.com/why-brave-disables-floc/>
  - Firefox, Edge, Safari, and other browsers won't use Google's new FLoC ad tech - The Verge
    - <https://www.theverge.com/2021/4/16/22387492/google-floc-ad-tech-privacy-browsers-brave-vivaldi-edge-mozilla-chrome-safari>
- Jake Archibald の F1 チームのサイト診断
  - Who has the fastest F1 website in 2021? Part 6
    - <https://jakearchibald.com/2021/f1-perf-part-6/>
  - Who has the fastest F1 website in 2021? Part 7
    - <https://jakearchibald.com/2021/f1-perf-part-7/>
  - Who has the fastest F1 website in 2021? Part 8
    - <https://jakearchibald.com/2021/f1-perf-part-8/>


### イベント

- 5 月
  - 18-20: Google I/O '21
    - <https://events.google.com/io/>
  - 12-14: BlinkOn 14
    - <https://www.chromium.org/events/blinkon-14>
  - 25-27: Microsoft Build 2021
    - <https://japan.zdnet.com/article/35168829/>
    - 詳細はまだ
- 6 月
  - 7-11: WWDC 2021
    - <https://developer.apple.com/wwdc21/>
  - 15-17: httpwg interim
    -    * 24-30: IETF111
    - <https://www.ietf.org/how/meetings/111/>
- 7 月
  - 13-16: TC39 meeting Tokyo
- 9 月
  - 7-11: SecWeb
    - <https://secweb.work/>
- 10 月
  - 18-29: TPAC:
    - 10/18-22 October: Breakout sessions
    - 10/25-29 October: Groups and Joint Meetings
    - <https://lists.w3.org/Archives/Public/public-webrtc/2021Apr/0027.html>


### Wrap Up

- Ch: WebSocket over H2
- Ch: ES Module for SW
- Ch: H2 / H3 ALPS - ACCEPT_CH
- Ch: SW subresource filter
- Ch: Network State Partitioning
- Ch: Net slipstream port 10080 blocking
- Ch: WebTransport over H3 OT
- Ch: Scroll Survay
- Ch: SXG on Search Result
- Ch: Page Experience Rollout が 6 月中旬
- FF: window.name からの inforeak 対策
- FF: QUIC / H3 Rollout 開始
- FF: Top level await
- FF: import assertions 実装開始
- Wk: FPS  negative
- Ed: WebView / Edge の違いドキュメント
- W3C: WebCodecs FPWD
- W3C: Web & Networks IG
- TC39: array by copy
- TC39: object-has (0 -> 2 に一気に)
- TC39: class features が 4 に
- TC39: pattern matching updates
- IETF: Proxy Status WGLC
- IETF: Cache Status updates
- IETF: Upgrade / Priority remove from h2
- IETF: CHIPS / cookie incrementalism / state token
- IETF: semantics publication request
- Security: PSL が辛い
- 周辺: .new ドメインめっちゃ増えてる
- 周辺: FLoC への風当たりが強い
