# [monthly-web][mozaic.fm] ep76 Monthly Web 202011


## Info

audio: https://files.mozaic.fm/mozaic-ep76.mp3

published_at
: 2020-12-05

guest
: [@myakura](https://twitter.com/myakura)


## Theme

第 76 回のテーマは 2020 年 11 月の Monthly Web です。


## Show Note


### Chrome 動向

- Stable: 87
- Updates
  - *Chromium Blog: Chrome 88: Digital Goods, Lighting Estimation in Augmented Reality, and More*
    - <https://blog.chromium.org/2020/12/chrome-88-digital-goods-lighting.html>
    - *Digital Goods API*
    - Origin Trials
      - New Origin Trials
        -  WebXR: AR Lighting Estimation
      - Completed Origin Trials
        - PointerLock unadjustedMovement
    - Other features in this release
      - *Anchor `target=_blank` implies `rel=noopener` by Default*
      - Dark Mode Form Controls and Scrollbars
      - *AbortSignal in `addEventListener()`*
      - *CSS aspect-ratio Property*
      - CSS Selectors 4: Complex `:not()`
      - Don't Clear adoptedStyleSheets on Adoption to/from `<template>`
      - ElementInternals.shadowRoot Attribute
      - Make Type Optional in `WakeLock.request()`
      - *Origin Isolation*
      - `path()` Support in clip-path CSS Property
      - *Permissions-Policy Header*
      - `RTCRtpTransceiver.stop()`
      - JavaScript
        - Shared Array Buffers, Atomics, and Futex APIs
    - Deprecations, and Removals
      - Don't Allow Popups During Page Unload (Enterprises)
      - FTP Support Removed
      - Web Components v0 Removed
  - *What's New In DevTools (Chrome 88)*
    - <https://developers.google.com/web/updates/2020/11/devtools>
    - Faster DevTools startup
    - New CSS angle visualization tools
    - Emulate unsupported image types
    - Simulate storage quota size in the Storage pane
    - New Web Vitals lane in the Performance panel recordings
    - Report CORS errors in the Network panel
    - Frame details view updates
      - Cross-origin isolation information in the Frame details view
      - New Web Workers information in the Frame details view
      - Display opener frame details for opened windows
    - Open Network panel from the Service Workers pane
    - New copy options in the Network panel
      - Copy property value
      - Copy stacktrace for network initiator
    - Wasm debugging updates
      - Preview Wasm variable value on mouseover
      - Evaluate Wasm variable in the Console
    - Consistent units of measurement for file/memory sizes
    - Highlight pseudo elements in the Elements panel
    - Experimental features
      - CSS Flexbox debugging tools
      - Customize chords keyboard shortcuts
  - *Puppetaria: accessibility-first Puppeteer scripts*
    - <https://developers.google.com/web/updates/2020/11/puppetaria>
    - CSS Selector ではなく a11y tree のクエリでテストを記述する
    - DOM 構造への依存を減らせるのでメンテナンスコストが下がる
  - New in Chrome 87
    - <https://developers.google.com/web/updates/2020/11/nic87>
    - Chrome Dev Summit
    - Camera pan, tilt, zoom
    - Range requests and service workers
    - Origin Trial: Font access API
  - *Simulating color vision deficiencies in the Blink Renderer*
    - <https://developers.google.com/web/updates/2020/11/cvd>
    - 色覚障害のシミュレーションや、コントラスト不足などを検証する方法
  - Chromium Blog: Tab throttling and more performance improvements in Chrome M87
    - <https://blog.chromium.org/2020/11/tab-throttling-and-more-performance.html>
    - Occlusion Tracking で使用中タブを認識しリソースの配分を最適化
    - Back/forward cache
  - Google ウェブマスターから Google 検索セントラルへ
    - <https://developers.google.com/search/blog/2020/11/goodbye-google-webmasters>
    - WebMaster から Search Central へリブランド
  - Google 検索へのページ エクスペリエンスの導入時期
    - <https://developers.google.com/search/blog/2020/11/timing-for-page-experience?hl=ja>
    - 2021/5 から Page Experience を Ranking に反映するという発表
    - AMP じゃなくてもモバイルのトップニュースの表示候補になるように
    - CWV/Mobile Friendly/Safe Browsing/HTTPS/No Intrusive Interstitials などが加味される
  - Disable mouse acceleration to provide a better FPS gaming experience
    - <https://web.dev/disable-mouse-acceleration/>
    - マウスのアクセラレーションを無効にする?
  - Using the Event Conversion Measurement API
    - <https://web.dev/using-conversion-measurement/>
    - Privacy Sandbox family の 1 つ
    - Click でのコンバージョンを送る API
  - Building a Stories component
    - <https://web.dev/building-a-stories-component/>
    - Instagram の Story みたいな表現を CSS で行う解説
    - Grid/scroll-snap-align/scroll-snap-stop などを組み合わせる
  - *Schemeful Same-Site*
    - <https://web.dev/schemeful-samesite/>
    - SameSite はこれまで Schemeless だった
    - Schemefull がデフォルトになり https:// と http:// は Cross Site になる
  - Browser-level lazy-loading for CMSs
    - <https://web.dev/browser-level-lazy-loading-for-cmss/>
    - loading lazy を CMS につける場合の考慮事項まとめ
  - *Better JS scheduling with `isInputPending()`*
    - <https://web.dev/isinputpending/>
    - isInputPending を用いたユーザ操作をブロックしないタスクの書き方
  - Back/forward cache
    - <https://web.dev/bfcache/>
    - Safari/FF にはあった戻る時のキャッシュヒットを Chrome に入れていく話
    - CrossSite は Finch release 済み
    - SameSite への OT を実施中
    - pageshow/pagehide の扱い、 no-store でのオプトアウトなど
  - *BlinkOn13 Youtube Playlist*
    - <https://www.youtube.com/playlist?list=PL9ioqAuyl6UJ_1hPrSWD1LpaIAeF9aaJi>
    - 動画の前半がセッション、後半は QA な録画
    - History of the Web
      - <https://www.youtube.com/watch?v=__V7J2NgKZI>
      - Igaria / Google の 3 人によるセッション
      - スライドなし、昔話
    - BFCache
      - <https://www.youtube.com/watch?v=lzWQTN7E0HA>
    - Origin Trials
      - <https://www.youtube.com/watch?v=C1x44KZJLQI>
    - Instant & Seamless
      - <https://www.youtube.com/watch?v=aSSFEfAq3oY>
    - WebBundles - JS delivery without the tradeoffs
      - <https://www.youtube.com/watch?v=i68zS3iG7xw>
    - The Intent of Intents - Chromium and Standards
      - <https://www.youtube.com/watch?v=hgEyQsy1D7w>
      - Intents の仕組みがどう回ってるのかの話
  - *Schedule: Chromium University 2020*
    - <https://docs.google.com/document/d/e/2PACX-1vRcPxu7DPsFNZHGDaeaM00meaHybMsEUrsCZOhYJIO-umT3Ouh-uDYQtWnhiQRxYR15HKqabbWQyh-0/pub>
    - 2019 年まで Chrome University だったものが Chromium University に
- Intents
  - Ship: Origin Isolation
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/WW4fGjvroWI>
  - Ship: XRWebGLBinding interface
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/6J0yfRuMmSU>
  - Ship: Change click, auxclick and contextmenu event types to PointerEvent
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/bta50W_Hg24>
  - *Ship: Schemeful Same-Site*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/aiXFdnA5tsk>
    - SameSite Cookie が SchemeLess だったのを SchemeFul に変える
    - http:// と https:// が Cross Site になるので安全性向上
    - M88 から Finch して影響を調査
  - *Ship: Restrict "private network requests" for subresources to secure contexts.*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/cPiRNjFoCag>
    - CORS-RFC1918 の第一歩
    - public な攻撃サイトからの subresorce request で local/private に攻撃できる場合がある
    - とりあえず public -> private へのリクエストは https を必須にすることで緩和
  - Ship: Same-site back-forward cache on Android
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/XS9VnYQoaQE>
    - BFCache は Cross Site でのみ提供済みだったが Same Site でも Ship していきたい
  - Ship: Restriction on SharedArrayBuffers (SABs)
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/1NKvbIj3dq4>
    - Android Chrome と FF に ship された SiteIsolation 環境での SAB 最有効化
    - あれを Desktop Chrome でもやる M91 ねらい
  - Ship: CSS ::target-text pseudo-element
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/yN2lrq67a1c>
    - scroll to text で遷移する先を取る疑似要素
  - *Ship: Relative indexing method for Array, String, and TypedArrays*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/I8S78w7aFmE/m/qLHAcjhRCQAJ>
    - String, Array, TypedArray の引数で index を指定する `at()`
    - 負の数だと後ろから
  - Ship: Add support for CSS properties "overflow: clip" and "overflow-clip-margin"
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/xGofL-IMAb4/m/t03fbbg3CQAJ>
  - *Ship: 'display: list-item' by default for `<summary>`*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/ihZFdCHuiTA/m/e1SEN6IQCQAJ>
    - summary の開閉の三角を別のものに書き換えるとき `::-webkit-details-marker` の `::before` content 経由だった
    - list-item になり list-style-type でコンテントを、 `::marker` でスタイルを定義できるように
  - *Ship: 'disclosure-open' and 'disclosure-closed' keywords for CSS list-style-type property*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/Czc_36BS2dA/m/_yHDeFwQCQAJ>
    - list-style-type に `disclosure-open`/`closed` を追加(`<summary>` の開閉の三角)
  - Ship: WebHID (Human Interface Device)
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/rL1csFYD1Ms/m/3qgPuZACCQAJ>
  - Ship: Potentially trustworthy data: urls
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/Hb1-VLwq54Y/m/TYsK4EzlCAAJ>
    - data: urls は仕様上 potentially trustworthy となっている'
    - それを chrome の他のケースにも一般化する?
  - Ship: display_override
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/MZgYJgS4Lcs>
    - webmanifest の display に fallback が書ける
  - Ship: Cross-origin opener policy reporting API
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/0fvyrO1-p_o>
    - COOP に Reporting
  - Implement and Ship: Block HTTP ports 5060 and 5061
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/tTGznHWRB9U>
  - Implement and Ship: AbstractRange superclass
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/h9AyVUx7M7M/m/NUrQd9DRBwAJ>
    - StaticRange と Range に共通メソッドがあるので AbstractRange を抽出
  - Implement and Ship: Limit characters allowed in extensions in File System Access API file pickers
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/bFUbINgQNgk>
  - *Prototype: AbortSignal in addEventListener*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/9396JedBBOM>
    - signal でキャンセルすると listener が削除される
  - Prototype: MediaStreamTrack Insertable Streams (a.k.a. Breakout Box)
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/gkBkLvGKuzc>
  - Prototype: Screen Fold API
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/prHGPxF62i4>
    - 折りたたみデバイスなどに向けて、たたみ方のタイプや角度を取得できるようにする API
  - Prototype: Media Source Extensions for WebCodecs
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/bejy1nmoWmU>
    - WebCodecs を用いて MSE をもっと効率よくできるようにする提案
  - *Prototype: Handwriting Recognition API*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/VXUq1UY4m7Y>
    - 手書き認識の API
    - OS の IME では対応があるのに Web にはないというギャップを埋めたいらしい
  - *Prototype: display-capture feature policy*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/gBpWuawy-Ms>
    - getDisplayMedia に対する feature policy
    - もう permission policy じゃね? -> つっこみ入ってた
  - Prototype: Read Chrome device attributes
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/oYRwgx8SwTA>
  - Prototype: Managed configuration for Web Applications
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/LZ3FHzUOLQk>
  - Prototype: Shared Element Transitions
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/7SMI3IklO4g>
    - MPA で SPA みたいなシームレスな画面遷移ができるようにする
    - DEMO: https://www.youtube.com/watch?v=yDFyLEN6aKk
  - Extend Origin Trial: WebAssembly SIMD
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/bw_RgyH4Xss>
  - *Extend Experiment: Beforematch event and hidden-matchable*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/a76WF3Dfl3E>
    - `content-visibility: hidden-matchable` すると非表示だが検索ができる
    - Beforematch event はそのページ内検索や scoll to text したときに発火するイベント
    - DEMO: https://github.com/WICG/display-locking/blob/master/explainers/images/beforematch.gif
  - Extend Origin Trial: WebCodecs
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/3MNyU3OAacI>
  - Extend Origin Trial: Web Components v0 Deprecation
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/ZQJ0k1IpQSo/m/KE467oUICQAJ>
  - Extend Origin Trial: Secure payment confirmation
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/9cgsOW3XNw4/m/bBgGYUwACQAJ>
    - Credential Management API に PaymentCredential を追加して決済の UX を改善
  - Extend Origin Trial: adaptivePtime property for RTCRtpEncodingParameters
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/T1ad0wJQ9qQ>
- Change:
- Unship:
- *Remove: HTTP/2 and gQUIC server push*
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/K3rYLvmQUBY>
  - PSA: TAG Reviews Are Required
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/naqmDmy1iM8/m/czBpBRFYAQAJ>
- v8
- Other
  - Feedback wanted: CORS for private networks (RFC1918)
    - <https://web.dev/cors-rfc1918-feedback/>
  - Q3 Summary from Chrome Security
    - <https://groups.google.com/a/chromium.org/g/security-dev/c/oBj6NlMnWKw>
  - *Announcing the Chrome Root Program*
    - <https://groups.google.com/g/mozilla.dev.security.policy/c/3Q36J4flnQs>
    - <https://www.chromium.org/Home/chromium-security/root-ca-policy>
    - Chrome も Firefox みたいに証明書ストアを自分で持つようになるらしい


### Firefox 動向

- Stable: 83.0
- Updates
  - *Warp: Improved JS performance in Firefox 83*
    - <https://hacks.mozilla.org/2020/11/warp-improved-js-performance-in-firefox-83/>
  - These Weeks in Firefox: Issue 83
    - <https://blog.nightly.mozilla.org/2020/11/19/these-weeks-in-firefox-issue-83/>
  - Measuring Middlebox Interference with DNS Records - Mozilla Security Blog
    - <https://blog.mozilla.org/security/2020/11/17/measuring-middlebox-interference-with-dns-records/>
    - DNS のパフォーマンスへの影響を Cloudflare と調査
  - *Firefox 83 introduces HTTPS-Only Mode*
    - <https://blog.mozilla.org/security/2020/11/17/firefox-83-introduces-https-only-mode/>
    - HTTPS でしか接続せず、 HTTP で接続しようとすると許可を求めるモードの導入
  - Foundations for the Future - Mozilla Hacks - the Web developer blog
    - <https://hacks.mozilla.org/2020/11/foundations-for-the-future/>
    - Servo が Linux Foundation に移管されたことを受けての今後の話
  - *Firefox 83 is upon us*
    - <https://hacks.mozilla.org/2020/11/firefox-83-is-upon-us/>
    - Conic gradients
    - WebRender comes to more platforms
      - ページを 60fps で表示する WebRender のトライアル開始
    - Pinch to zoom on desktop
- Intents
  - *Ship: :focus-visible pseudo-class*
    - <https://groups.google.com/g/mozilla.dev.platform/c/yA2rL_2keTE>
  - Ship: CSS overflow:clip
    - <https://groups.google.com/g/mozilla.dev.platform/c/7oQm8PC0aU0>
    - -moz-hidden-unscrollable の標準バージョン
  - *Ship: PerformancePaintTiming API*
    - <https://groups.google.com/g/mozilla.dev.platform/c/qPB1OLaQWsw>
    - First Contentful Paint
  - Implement and ship: CSS property touch-action:pinch-zoom
    - <https://groups.google.com/g/mozilla.dev.platform/c/DYc-4vO0D5Q/m/VJHGCUFhAQAJ>
  - *Prototype and ship: signal property on AddEventListenerOptions*
    - <https://groups.google.com/g/mozilla.dev.platform/c/KdR8-eJplCs/m/a0pVUNiTBAAJ>
    - AbortSignal を渡すための signal property
  - Unship: Large-Allocation header
    - <https://groups.google.com/g/mozilla.dev.platform/c/9GZosW8PN6w/m/LhbpVe3DAwAJ>
  - Removal of NPAPI plugin support in Firefox 85
    - <https://groups.google.com/g/mozilla.dev.platform/c/NsdReYslBU4/m/b9FwjVAbBAAJ>
  - Accessibility review process
    - <https://groups.google.com/g/mozilla.dev.platform/c/6W6vxvVivLk>
  - *Enabled CRLite in Nightly*
    - <https://groups.google.com/g/mozilla.dev.platform/c/mbYKUEGE5oQ/m/JsSBV-RRAAAJ>
  - HTTP/3 ready for testing
    - <https://groups.google.com/g/mozilla.dev.platform/c/6CZs8Jartu0>
- Other
  - Firefox Security Newsletter - Q3 2020
    - <https://groups.google.com/g/mozilla.dev.platform/c/k_jNJXOMXYw>
  - *Design of the CRLite Infrastructure - Mozilla Security Blog*
    - <https://blog.mozilla.org/security/2020/12/01/crlite-part-4-infrastructure-design/>
    - CRLite をどういうインフラで提供しているか
  - Fission Newsletter #9
    - <https://groups.google.com/g/mozilla.dev.platform/c/F-68NBe2K_8>
  - *Preloading Intermediate CA Certificates into Firefox*
    - <https://blog.mozilla.org/security/2020/11/13/preloading-intermediate-ca-certificates-into-firefox/>
  - *Igalia joins MDN Product Advisory Board | Igalia*
    - <https://www.igalia.com/2020/12/02/Igalia-joins-MDN-Product-Advisory-Board.html>
    - Igalia (Daniel Ehrenberg) が MDN の PAB に参加


### Safari 動向

- Stable: 14.0.1
- Updates
  - New WebKit Features in Safari 14
    - <https://webkit.org/blog/11340/new-webkit-features-in-safari-14/>
    - *Webpage Translation*
      - ただし日本語は対象外?
      - translate(="yes") or translate="no"
    - Performance Improvements
      - Loading a previously unvisited page is 13% faster
      - loading recently visited pages is 42-52% faster.
      - Tab closing performance improved from 3.5 seconds to 50 milliseconds.
      - support for incrementally loading PDF files and now renders the first page up to 60 x faster.
    - Improved Compatibility
      - Service Workers, SVG, CSS, XHR+Fetch などで 14 万個のテストに追加でパス
    - *Privacy Updates*
      - ITP 更新
      - CNAME Cloaking block
    - Touch ID and Face ID for the Web
    - *WebP Support*
    - Reserving Layout Space for Images
      - width/height でアスペクト比割り出し領域予約
    - New CSS Features
      - *画像の向きが EXIF ベースになり、 image-orientation で上書き*
      - is:(), :matches(), :where()
      - line-break: anywhere
    - Media Enhancements
      - dynamic-range: high
    - *JavaScript Improvements*
      - BigInt
      - optional chaining
    - Web Inspector Updates
  - *Release Notes for Safari Technology Preview 116 | WebKit*
    - <https://webkit.org/blog/11348/release-notes-for-safari-technology-preview-116/>
    - *Enabled AudioWorklet API by default (r268459)*
    - Added implementation for AudioWorkletGlobalScope.registerProcessor() (r268103)
    - Added implementation for AudioWorkletGlobalScope's currentFrame, currentTime, and sampleRate attributes (r268076)
    - *Enabled video capture by default on macOS (r268052)*
    - Added support for MediaRecorder bitrate getters (r268363)
    - Added support for MediaRecorder pause and resume (r268130)
    - Added support for respecting enabled and muted tracks (r267987)
    - Added support for BlobEvent.timecode (r268136)
    - Added support for the individual transform properties translate, rotate, scale, including accelerated animation (r267985, r268627)
    - Added painting CSS highlights over images (r268487)
    - Improved the essential internal methods for %TypedArray% to adhere to spec (r268640)
    - Improved computation of default audio input and output devices (r268396)
    - Implemented Blob.stream (r268228)
    - Improved xhr.response conformance to the specification (r267959)
    - Aligned URL setters to reasonable behaviors of other browsers (r268050)
    - Fixed UTF-8 encoding in URL parsing (r267963)
    - Enabled per-page storage access scope (r267973)
  - MediaRecorder API
    - <https://webkit.org/blog/11353/mediarecorder-api/>
  - *CNAME Cloaking and Bounce Tracking Defense*
    - <https://webkit.org/blog/11338/cname-cloaking-and-bounce-tracking-defense/>
- Request for Position
  - Element Timing
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-November/031579.html>
  - changing click, auxclick, contextmenu to PointerEvent
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-November/031588.html>
  - Readable Byte Streams
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-November/031597.html>
  - Schemeful Same-Site
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-November/031618.html>
  - relative indexing method on JS indexables
    - <https://lists.webkit.org/pipermail/webkit-dev/2020-November/031622.html>
- Other


### Edge 動向

- Stable: 87
- Updates
- Chakra
  - Release ChakraCore v1.11.23 - microsoft/ChakraCore
    - <https://github.com/microsoft/ChakraCore/releases/tag/v1.11.23>
- Other
  - How Microsoft Edge and other applications manage memory
    - <https://blogs.windows.com/msedgedev/2020/11/11/how-microsoft-edge-and-other-applications-manage-memory/>
  - Introducing Shopping with Microsoft Edge - Microsoft Tech Community
    - <https://techcommunity.microsoft.com/t5/articles/introducing-shopping-with-microsoft-edge/m-p/1870080>
  - Announcing General Availability of Microsoft Edge WebView2 for .NET and Fixed Version distribution mode - Microsoft Edge Blog
    - <https://blogs.windows.com/msedgedev/2020/11/20/announcing-general-availability-of-microsoft-edge-webview2-for-net-and-fixed-version-distribution-mode/>
  - *Improving notifications and badging in Microsoft Edge - Microsoft Edge Blog*
    - <https://blogs.windows.com/msedgedev/2020/11/16/improving-notifications-badging-microsoft-edge/>
    - Edge ってブラウザ閉じてる時の push notification 無かったらしい
    - これを戻した
  - *Improvements to history in Microsoft Edge - Microsoft Tech Community*
    - <https://techcommunity.microsoft.com/t5/articles/improvements-to-history-in-microsoft-edge/m-p/1896552#M3896>
    - 履歴と表示タブをブラウザで共有する話
  - Outlook REST API beta and Outlook REST API v2.0 Deprecation Notice - Microsoft Tech Community
    - <https://techcommunity.microsoft.com/t5/exchange-team-blog/outlook-rest-api-beta-and-outlook-rest-api-v2-0-deprecation/ba-p/1898162>


### WHATWG/W3C 動向

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
  - Updated Candidate Recommendation: Payment Request API
    - <https://www.w3.org/blog/news/archives/8779>
- First Public Working Draft
  - First Public Working Draft: WebXR Layers API Level 1
    - <https://www.w3.org/blog/news/archives/8775>
- Chartering
  - Consent Community Group created
    - <https://lists.w3.org/Archives/Public/public-new-work/2020Nov/0005.html>
  - <https://www.w3.org/blog/news>
- Other
  - *Web Platform Design Principles*
    - <https://www.w3.org/TR/2020/NOTE-design-principles-20201110/>
    - Web に新しい機能を追加する際に検討すること
    - TAG review での経験をもとに文書化
  - *Remove AppCache · whatwg/html@e4330d5*
    - <https://github.com/whatwg/html/commit/e4330d510a1d05e1f5f84707c9d6dcec97db94b8>
    - HTML 仕様から AppCache が削除


### TC39 動向

- Meeting 2020-011
  - agendas
    - <https://github.com/tc39/agendas/blob/master/2020/11.md>
  - minutes
    - <https://github.com/tc39/notes/tree/master/meetings/2020-11 (まだない)>
- Proposals Diff
  - <https://github.com/tc39/proposals/compare/master@{2020-11-01}...master@{2020-12-01}>
  - <https://tc39.github.io/beta/>
  - 0->1
    - Module Blocks
    - Extensions
  - 1->2
    - Error Cause
  - 2->3
    - `.item()` to `.at()`
  - 3->4
- New Proposals
  - *Module Blocks*
    - <https://github.com/tc39/proposal-js-module-blocks>
    - module をインラインで定義できる構文
    - worker のコードなどを別ファイルで読み込まなくて良い
  - *Extensions*
    - <https://github.com/hax/proposal-extensions>
    - Bind Operator をさらに更新してモジュールとして拡張を自作できるようにする
  - eraDisplay option for Intl.DateTimeFormat
  - Intl.bestAvailableLocale
  - Extend TimeZoneName Option Proposal
- Other
  - *2021 の meeting*
    - 8 回を予定
    - 半分は物理で計画
    - 7 月は Tokyo (4 days) -> のちに remote に変更(たぶん Olympic)
  - *TC39 も MDN に協力してこう*
    - MDN staffing to document TC39's work


### IETF 動向

- IETF
  - materials
    - <https://datatracker.ietf.org/meeting/>
  - httpwg
    - no meeting
  - quicwg
    - <https://github.com/quicwg/wg-materials/blob/master/ietf109/minutes.md>
  - webtrans
    - <https://datatracker.ietf.org/meeting/109/materials/minutes-109-webtrans-00>
  - tlswg
    - <https://datatracker.ietf.org/meeting/109/materials/minutes-109-tls-00>
  - dispatch
    - <https://datatracker.ietf.org/meeting/109/materials/minutes-109-dispatch-00>
- RFC
- IETF Last Call
- WG Last Call
- Call for Adoption
  - Call for Adoption: HTTP/2 Bis
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2020OctDec/0197.html>
    - HTTP2 の更新作業をやっていく
  - On RFC7725bis
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2020OctDec/0195.html>
    - 451 Unavailable For Legal Reasons 更新については interest が少なくてやらない
- I-D Action
- Draft
  - *The CDN-Cache-Control HTTP Response Header Field*
    - <https://tools.ietf.org/html/draft-cdn-control-header-00>
    - CDN にのみ向けた Cache-Control となるヘッダ
    - Fastly でいう Surrogate-Control の標準化
  - JWS Clear Text JSON Signature Option (JWS/CT)
    - <https://tools.ietf.org/html/draft-jordan-jws-ct-00>
  - *The Idempotency HTTP Header Field*
    - <https://tools.ietf.org/html/draft-idempotency-header-01>
    - 冪等性の無い POST をリトライできるように id をつけるためのヘッダ
- Other


### セキュリティ動向

- Standing on Our Own Two Feet - Let's Encrypt - Free SSL/TLS Certificates
  - <https://letsencrypt.org/2020/11/06/own-two-feet.html>


### 周辺動向

- Cloudflare
  - SAD DNS Explained
    - <https://blog.cloudflare.com/sad-dns-explained/>
  - Automated Origin CA for Kubernetes
    - <https://blog.cloudflare.com/automated-origin-ca-for-kubernetes/>
  - Announcing Spectrum DDoS Analytics and DDoS Insights & Trends
    - <https://blog.cloudflare.com/announcing-spectrum-ddos-analytics-and-ddos-insights-trends/>
  - The Internet is Getting Safer: Fall 2020 RPKI Update
    - <https://blog.cloudflare.com/rpki-2020-fall-update/>
- *Improving Performance and Search Rankings with Cloudflare for Fun and Profit*
    - <https://blog.cloudflare.com/improving-performance-and-search-rankings-with-cloudflare-for-fun-and-profit/>
    - Google が search rank に perf を入れるアナウンスをした ->
    - cloudflare 入れると perf が上がる ->
    - cloudflare 入れると rank が上がる
    - Brotli compression using a reduced dictionary
  - Brotli compression using a reduced dictionary
    - <https://blog.cloudflare.com/brotli-compression-using-a-reduced-dictionary/>
- *The State of CSS 2020*
  - <https://2020.stateofcss.com/>
- *Advent Calendar*
  - PWAdvent
    - <https://pwadvent.dev/>
  - Web Performance Calendar >> 2020
    - <https://calendar.perfplanet.com/2020/>
    - <https://calendar.perfplanet.com/contribute/>


### イベント

- 12 月
  - 9-10: Chrome Dev Summit
    - <https://developer.chrome.com/devsummit/>
- 1 月
- 2 月


### Wrap Up

- M88
  - Digital Goods API
  - noopener by default
  - AbortController for addEventListener
  - Origin Isolation
- Devtools に機能がいっぱい
- Puppetaria でテストをセマンティックに
- Page Experience をランクに反映を 2020/5 に
- Schemfull Samesite
- BlinkOn / Chromium University
- `<summary>` の CSS 改善
- H2Push 削除
- Root Program Announce
- Mozilla
  - HTTPS Only Mode
  - CRLite
- MDN PAB に Igalia 加入
- macOS 14 Big Sur + Safari 14
  - translate / extension / webp
  - ITP / CNAME Cloaking / Bounce Tracking
- AppCache HTML から削除
- TC39 Module Blocks
- IETF CDN-Cache-Control Header / POST Idempotent Header
- The State of CSS 2020
