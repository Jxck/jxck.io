# [monthly-web][mozaic.fm] ep45 Monthly Web 201811


## Info

audio: https://files.mozaic.fm/mozaic-ep45.mp3

published_at
: 2018-12-05

guest
: [@myakura](https://twitter.com/myakura)


## Theme

第 45 回のテーマは 2018 年 11 月の Monthly Web です。


## Show Note


### Chrome 動向

- Stable: 70.0.3538.110
- Chrome Dev Summit
  - *Chrome Dev Summit 2018: Building a Faster, Smoother, Capable Web*
    - <https://blog.chromium.org/2018/11/chrome-dev-summit-2018-building-faster.html>
  - *Chrome Dev Summit 2018 Day 2: Ready for the next movement*
    - <https://blog.chromium.org/2018/11/chrome-dev-summit-2018-day-2-ready-for.html>
  - From Low Friction to Zero Friction with Web Packaging and Portals
    - <https://youtu.be/Ai4aZ9Jbsys>
  - virtual-scroller: Let there be less (DOM)
    - <https://youtu.be/UtD41bn6kJ0>
  - State of Houdini
    - <https://youtu.be/lK3OiJvwgSc>
  - Using WebAssembly and Threads
    - <https://youtu.be/zgOGZgAPUjQ>
  - State of the Union for Speed Tooling
    - <https://youtu.be/ymxs8OSXiUA>
  - Building Faster, More Resilient Apps with Service Worker: A Caching Strategy Deep Dive
    - <https://youtu.be/25aCD5XL1Jk>
  - Chrome Dev Summit 2018  - Day 1 - Sabarinathan Masilamani - Medium
    - <https://medium.com/@nathan5x/https-medium-com-nathan5x-chrome-dev-summit-2018-day-1-e7a68ea4321a>
- Updates
  - *Signed HTTP Exchanges*
    - <https://developers.google.com/web/updates/2018/11/signed-exchanges>
    - [blog](https://blog.jxck.io/entries/2018-12-01/signed-http-exchanges.html)
  - *The Writable Files API: Simplifying local file access*
    - <https://developers.google.com/web/updates/2018/11/writable-files>
  - *Our commitment to a more capable web*
    - <https://blog.chromium.org/2018/11/our-commitment-to-more-capable-web.html>
  - *Web Audio, Autoplay Policy and Games*
    - <https://developers.google.com/web/updates/2018/11/web-audio-autoplay>
    - Chrome 71 から、音声の自動再生ポリシーが変わる件の詳細
    - ロード時に勝手に再生されるうざい Autoplay を止める
    - 行動から、そのページに Autoplay を許すかを Media Engagement Index (MEI) に記録
    - 例えば恒常的に 7 秒以上再生するなど
    - それ以外は、 UserGesture が無いと resume できない
    - Proxy で UserGesture を全部 resume に繋げるコード例が紹介されている
  - What's New In DevTools (Chrome 72)
    - <https://developers.google.com/web/updates/2018/11/devtools>
    - Visualize performance metrics in the Performance panel.
    - Highlight text nodes in the DOM Tree.
    - Copy the JS path to a DOM node from the DOM Tree.
    - Audits panel updates, including a new audit that detects JS libraries and new keywords for accessing the Audits panel from the Command Menu.
- Intents
  - *Ship: CSS Properties and Values API Level 1*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/QjcyhPZ_sNI/SuB-GuNPDAAJ>
    - `CSS.registerProperty({name: "--my-font-size", syntax: "<length>", initialValue: "0px"})`
    - カスタムプロパティをアニメーションしたりできるようになる。
  - Ship: IndexedDB database info enumeration function
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/xSf7B0aVxnI/0E05ZEB6DAAJ>
  - *Ship: Intl.ListFormat*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/_TllF9146H0/PgI3cqEMBAAJ>
    - `new ListFormat("en").format(["Alice", "Bob"]); // "Alice and Bob"`
    - `new ListFormat("zh").format(["譚永鋒", "劉新宇"]); // "譚永鋒和劉新宇"`
  - Ship: EME Encryption Scheme Query
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/T5FcVK8lwmk/uT-c4OciBgAJ>
  - Ship: Change default style of `<area>` to [display: none]
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/-dmig28jgAo/zPP4gPlnBwAJ>
    - 今は display: inline なので、仕様に合わせる
  - *Ship: First Input Timing*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/LN92hkaKCzw/Y-ryVxu5AgAJ>
    - PerformanceObserver で First Input Timing が取れるように
    - これにより First Input Delay が計算できる
    - Chrome は、指標の 1 つとして First Input Delay を強く啓蒙しているので、優先的に ship したいらしい
  - Ship: EME Extension - Policy Check
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/w0jNaAhyTV0/3oDkR_ASAQAJ>
  - Implement and Ship: Navigator Language for Workers
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/i8oTgTx2vxE/NKL6z6N1BgAJ>
  - Implement and Ship: fix IDL for PerformanceMark, PerformanceMeasure, and performance attribute in workers
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Z3RKovFsA1s/hOxO2vw3AQAJ>
  - Implement and Ship: Network Error Logging request_headers and response_headers fields
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/nvjV8p_DFM8/KzgQBKjmAAAJ>
  - Implement and Ship: RTCPeerConnection.connectionState and RTCPeerConnection.onconnectionstatechanged
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/lxHPNYoaEU8/0JFwF0ipCQAJ>
  - Implement and Ship: RTCRtpReceiver.getParameters()
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/LXJUzctTVfM/p4J-WrzbBgAJ>
  - Implement and Ship: DOMMatrixReadOnly.scaleNonUniform()
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/BJJKDby5p7w/vxmb9bnGAgAJ>
  - Implement and Ship: Additional encodings.networkPriority field in RtpSender[Get|Set]Parameters
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/bVNynDp9PHo/4D96etzMAAAJ>
  - Implement: FetchEvent Worker Timing
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/WS17dXHV6xQ/rOnUbU4CCgAJ>
  - *Implement: Contacts API*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/brKChSa9_d0/GmzVbvYcAAAJ>
    - コンタクト情報を取得する API
    - <https://github.com/beverloo/contact-api>
  - Implement: Feature policy control over `document.domain`.
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Ff6Ywg5vnh4/VbDH4X6wBQAJ>
  - *Implement: Form-associated custom elements*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/HW8j_JLLiPo/V_SmVZkwBgAJ>
  - Implement: Additional encodings.networkPriority field in RtpSender[Get|Set]Parameters
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/7SRh6Pl4iMA/MXPbE3FpBgAJ>
  - Implement: User Idle Detection
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/OuwzBmH02M4/5ChXdXZQBwAJ>
  - Implement: WebRTC RTCDtlsTransport object
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/HulsXXnvGdw/i7mxN_eABgAJ>
  - Implement: Storage Quota Usage Details
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/CwAwSbTUmeg/27O5K12iBgAJ>
  - Implement: Bidi Caret Affinity
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/NN6zKiULN4U/DaCDtRq9BAAJ>
  - Experiment: Configurable WebRTC jitter buffer max size
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/hE2B1iItPDk/d182qqdwAAAJ>
  - *(Reverse) Origin Trial for old Web Components*
    - <https://groups.google.com/a/chromium.org/forum/#!topic/experimentation-dev/lrmxlU-Ddxk>
    - Web Components の deprecate を Origin Trials で延命しながら行う件
  - *Experiment: HrefTranslate HTMLAnchor attribute*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/4DZIDt9o1ME/L4878LGOBwAJ>
    - hrefTranslate でリンク先のコンテンツの言語を指定できる
    - サーバ側で翻訳機を通しているコンテンツの UX がよくなるらしい
  - Continue Experimenting: Web XR Device API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/vWg9cs2t648/QaGw3B3cAAAJ>
  - Change:
  - Unship:
  - Remove:
  - Deprecate and Remove: Rendering FTP resources.
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/eopgOoY1QLs/e1tIefOxAAAJ>
  - *Undeprecate: webkitURL on Window*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/EEo3kba4h2g/V7UbFAuoBQAJ>
    - deprecation がうまくいかなかった
    - <https://github.com/whatwg/url/issues/135>
    - <https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/EsJE9wb321I>
  - *Out of Renderer CORS (Cross-Origin Resource Sharing) is now on 50:50 canary/dev finch*
    - <https://groups.google.com/a/chromium.org/forum/#!topic/network-service-dev/VdU2lGH_Mag>
    - fetch は renderer process から browser process に依頼される
    - CORS チェックは renderer 側でやっていた
    - これを browser 側に持っていく
    - つまり CORS を off the main thread する
    - browser 側でやることで、 renderer を騙せたとしても cors バイパスが成立しにくくなる
    - by toyoshima-san
- Team Weekly Snippet
  - Chrome Storage Team Weekly for 11/06/2018
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/u141Iev0HpI/Xw0lJDRmBwAJ>
- v8
  - Faster async functions and promises
    - <https://v8.dev/blog/fast-async>
    - async/await まわりの高速化とデバッグしやすさについて
- Other
  - Streaming in the Shadow Reader
    - <https://amphtml.wordpress.com/2018/11/05/streaming-in-the-shadow-reader/>
  - PageSpeed Insights, now powered by Lighthouse
    - <https://webmasters.googleblog.com/2018/11/pagespeed-insights-now-powered-by.html>
  - *Developer Preview of better AMP URLs in Google Search*
    - <https://amphtml.wordpress.com/2018/11/13/developer-preview-of-better-amp-urls-in-google-search/>
    - AMP の Signed HTTP Exchange 対応の話
    - <https://g.co/webpackagedemo>
    - 検索のデモも公開されている
  - *web.dev 公開*
    - <https://web.dev/>
    - Web のプラクティスを学ぶ新しいサイト
    - ログインすると Lighthouse の結果を保存できる
    - .dev ドメイン自体が取得可能になっていく
      - <https://get.dev/>
      - まずは trademark 持ってる人 (1/16~2/19)、そのあと一般
      - 社内で .dev 勝手に使ってる人は対応
  - web.dev status update, 11/12/18
    - <https://medium.com/dev-channel/web-dev-status-update-11-12-18-f9b42a693f65>
  - web.dev status update, 11/14/2018
    - <https://medium.com/dev-channel/web-dev-status-update-14th-nov-2018-18708787f239>
  - web.dev status update, 29th Nov 2018
    - <https://medium.com/dev-channel/web-dev-status-update-29th-nov-2018-8904b90bcdd2>
  - *Squoosh*
    - <https://squoosh.app/>
    - <https://github.com/GoogleChromeLabs/squoosh>
    - WebP なども対応した画像圧縮ツール
    - WASM でつくりブラウザで動く
    - 確認しながらパラメータを決める GUI つき
  - Progressively AMPlify EC-CUBE
    - <https://amphtml.wordpress.com/2018/11/20/progressively-amplify-ec-cube/>
  - AMP Project's new governance model now in effect
    - <https://amphtml.wordpress.com/2018/11/30/amp-projects-new-governance-model-now-in-effect/>
  - [ACTION REQUEST] Tell the World What You're Shipping in 72
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/mY-7hPEMq2k/0zwMRZEQAQAJ>
  - VisBug
    - <https://chrome.google.com/webstore/detail/visbug/cdockenadnadldjbbgcallicgledbeoc>
    - <https://medium.com/dev-channel/visbug-101-749f26a485c8>


### Firefox 動向

- Stable: 63.0.3
- Updates
  - *Encrypted SNI Comes to Firefox Nightly* (取りこぼし)
    - <https://blog.mozilla.org/security/2018/10/18/encrypted-sni-comes-to-firefox-nightly/>
    - ClientHello に含まれる SNI は平文なので、どこに接続しようとしてるかは漏れる
    - これも暗号化したいので DNS で公開鍵を送って DH する
    - それだけだと結局 DNS 見れば接続先はわかる
    - そこで DoH ですよという話
    - 提案は Kazuho さんたち
  - *Next Steps in DNS-over-HTTPS Testing - Future Releases*
    - <https://blog.mozilla.org/futurereleases/2018/11/27/next-steps-in-dns-over-https-testing/>
    - DoH (Cloudflare) を使うと一定の改善は見込めた
    - CDN は一番近い Edge を DNS で解決するが、 DoH だとそれがうまくいかない
    - これをどうするか、 Akamai と協力して Firefox でテストしていくことに
- Intents
  - Ship: window.event
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/riVG9FqN9iM/U4PZJb0NBQAJ>
  - Ship: set keyCode or charCode of "keypress" event to the other's non-zero value
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/IWLLJmoGroA/Im3fQSoNBQAJ>
  - Ship: stop dispatching "keypress" events when pressed key (key combination) does not introduce text input
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/E8DyIJBhu1g/dggFj14MBQAJ>
  - Ship: dispatching "keydown" and "keyup" events during IME composition
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/DrYa0gDxI5Q/5odWBZcLBQAJ>
  - *Implement and Ship: CSS environment variables*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/EVKyR1B87T0/_l-_qK8SAAAJ>
  - Implement and Ship: Unprefix -moz-user-select, unship mozilla-specific values.
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/XfKl9Jt7ZQ8/2-wcUBEzBwAJ>
  - Implement and Ship: overflow-wrap: anywhere
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/B36jo-tK9Wk/tssG8exBBgAJ>
  - Implement and Ship: img decode API support
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/7l8FJCEwdaI/-C9kVDXzBQAJ>
  - Implement: Support Referrer Policy for `<script>` elements
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/eeyxS9WDCOs/M1dLpEFfDAAJ>
  - Implement: css-scroll-anchoring
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/4TxLKumAOiE/Feuvlg9jAAAJ>
  - *Implement: Reporting API*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/B9VPjyia7wA/_qhevcK0BwAJ>
  - *Implement: implicit rel=noopener for target=_blank on anchor and area elements*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/d4R7WIHSOMY/KqovfoeFCQAJ>
    - [blog](https://blog.jxck.io/entries/2016-06-12/noopener.html)
  - (re-)enable new keyCode/charCode values of keypress events in Nightly
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/i9jM3s3SbXY/kFOyGDjTBQAJ>
  - Unship: MediaStream.currentTime
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/QW7_dfNSWLw/uAR1aUlkDAAJ>
  - Unship: DOM "text" event
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/2pw2HxiCIbc/EUm-IwJJCwAJ>
  - Unship xml:base
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/goHxC7z3D7Q/4_hYwsP7BAAJ>
- Site Compat
  - *WebP image support has been added*
    - <https://www.fxsitecompat.com/en-CA/docs/2018/webp-image-support-has-been-added/>
    - img への Accept ヘッダが `image/webp,*/*` になる
  - Third-party tracking cookies are now blocked by default (Affecting)
    - <https://www.fxsitecompat.com/en-CA/docs/2018/third-party-tracking-cookies-are-now-blocked-by-default/>
  - Non-standard text event will no longer be fired during IME composition
    - <https://www.fxsitecompat.com/en-CA/docs/2018/non-standard-text-event-will-no-longer-be-fired-during-ime-composition/>
- Other
  - *The Power of Web Components*
    - <https://hacks.mozilla.org/2018/11/the-power-of-web-components/>
  - *New & Experimental Web Design Tools: Feedback Requested*
    - <https://hacks.mozilla.org/2018/11/new-experimental-web-design-tools-feedback-requested/>
  - Firefox Monitor Launches in 26 Languages and Adds New Desktop Browser Feature
    - <https://blog.mozilla.org/blog/2018/11/14/firefox-monitor-launches-in-26-languages-and-adds-new-desktop-browser-feature/>
  - These Weeks in Firefox: Issue 50
    - <https://blog.nightly.mozilla.org/2018/11/27/these-weeks-in-firefox-issue-50/>
  - Multilingual Gecko Status Update 2018.2 \| Mozilla L10N
    - <https://blog.mozilla.org/l10n/2018/11/27/multilingual-gecko-status-update-2018-2/>


### Safari 動向

- Stable: 12.0.1
- Safari Technology Preview 69
  - <https://webkit.org/blog/8479/release-notes-for-safari-technology-preview-69/>
  - Enabled Conic Gradients by default
  - Enabled the `<datalist>` element by default
  - Handled zero-area intersections
  - Implemented `MerchantValidationEvent.methodName`
  - Implemented `PaymentResponse.retry()`
- *Release Notes for Safari Technology Preview 70*
  - <https://webkit.org/blog/8496/release-notes-for-safari-technology-preview-70/>
  - Implemented getTiming() and updateTiming()
  - Implemented Animation.updatePlaybackRate()
  - Added support to allow cross-document intersection observing
  - Added CSS Custom Properties API Support for syntax="*" and `<length>` with proper cycle handling
  - Implemented text-underline-offset and text-decoration-thickness
  - Added support for sender and receiver getCapabilities
  - Added onremovetrack support for RTCPeerConnection removed tracks
  - Added a storage limit for IndexedDB
  - *Added a warning in the Smart Search field when loading non-secure pages*
- Other
  - *Web High Level Shading Language*
    - <https://webkit.org/blog/8482/web-high-level-shading-language/>
    - Web High Level Shading Language = WHLSL (ホイッスル)
    - WebGPU Community Group が作業中


### Edge 動向

- Stable: EdgeHTML 18.17763 / Edge 44.17763
- Status Updates
  - <https://github.com/MicrosoftEdge/Status/compare/production@{2018-11-01}...production@{2018-12-01}>
  - 特になし
- EdgeHTML
  - <https://aka.ms/devguide_edgehtml_18>
  - Autoplay policies
  - etc
- Build Changelog
  - <https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/>
- Chakra
  - Release ChakraCore v1.11.3
    - <https://github.com/Microsoft/ChakraCore/releases/tag/v1.11.3>
- Other
  - <https://developer.microsoft.com/en-us/microsoft-edge/platform/>


### WHATWG/W3C 動向

- TPAC
  - W3C TPAC 2018 [Lyon]
    - <https://twitter.com/i/moments/1054702429957185536>
  - WebRTC Summary of decisions
    - <https://lists.w3.org/Archives/Public/public-webrtc/2018Nov/0018.html>
  - The CSS Working Group At TPAC: What's New In CSS?
    - <https://www.smashingmagazine.com/2018/10/tpac-css-working-group-new/>
  - [CSSWG] Minutes Lyon F2F 2018-10-23 Part I-V
    - <https://lists.w3.org/Archives/Public/www-style/2018Dec/0000.html>
    - <https://lists.w3.org/Archives/Public/www-style/2018Dec/0001.html>
    - <https://lists.w3.org/Archives/Public/www-style/2018Dec/0002.html>
    - <https://lists.w3.org/Archives/Public/www-style/2018Dec/0003.html>
    - <https://lists.w3.org/Archives/Public/www-style/2018Dec/0004.html>
- Recommendation
  - TTML1 3rd, TTML2, TTML-IMSC1 are W3C Recommendations
    - <https://www.w3.org/blog/news/archives/7381>
  - Selectors Level 3 is a W3C Recommendation
    - <https://www.w3.org/blog/news/archives/7374>
- Proposed Recommendation
- Candidate Recommendation
  - W3C Invites Implementations of CSS Containment and Flexible Box Layout Module Level 1
    - <https://www.w3.org/blog/news/archives/7379>
- Working Draft
- First Public Working Draft
  - First Public Working Draft: Trace Context
    - <https://www.w3.org/blog/news/archives/7369>
  - First Public Working Draft: CSS Shadow Parts
    - <https://www.w3.org/blog/news/archives/7396>
  - First Public Working Draft: Extensions to the Semantic Sensor Network Ontology
    - <https://www.w3.org/blog/news/archives/7403>
- Chartering
  - BD Comics Manga Community Group created
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Oct/0019.html>
    - バンド・デシネ、コミック、漫画、 Motion Comics, Web Comics, Visual novels, Interactive Manga, Webtoon, Turbomedia, Parallax strip,  Still motion art ...
    - Web における様々な表現についてのコミュニティグループ
  - Pointer Events Working Group (until 2018-12-04)
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Nov/0000.html>
  - Browser Testing and Tools Working Group
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Nov/0001.html>
  - Accessible Rich Internet Applications Working Group Revised Charter Approved; Call for Participation
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Nov/0002.html>
  - The Business Case for Digital Accessibility
    - <https://www.w3.org/blog/news/archives/7384>
  - Proposed W3C Charter: Web Fonts Working Group
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Oct/0015.html>
  - ARIA and Assistive Technologies Community Group Proposed
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Nov/0009.html>
  - ARIA and Assistive Technologies Community Group created
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Nov/0010.html>
- Other
  - WICG/change-password-url
    - <https://github.com/WICG/change-password-url>
    - <https://lists.w3.org/Archives/Public/public-webappsec/2018Nov/0009.html>
    - `/.well-known/change-password` でパスワード更新を discover できるように
  - [CSSWG][selectors-4] Updated WD of Selectors L4
    - <https://lists.w3.org/Archives/Public/www-style/2018Nov/0023.html>
  - *Change Response's statusText's default by `""` annevk · Pull Request #836*
    - <https://github.com/whatwg/fetch/pull/836>
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/URFbbfpXiPA/zaMD1BjqCQAJ>
    - fetch の仕様で、 res.statusText のデフォルトが "OK" から "" になる
    - Chrome から PSA が出ている
    - 仕様上 `200 OK` の `OK` (reason-phrase) はなんでも良いし、無くても良い。
    - <https://tools.ietf.org/html/rfc7230#section-3.1.2>
  - New Resource: Developing an Accessibility Statement
    - <https://www.w3.org/blog/news/archives/7413>


### TC39 動向

- Meeting
  - agendas/11.md at master · tc39/agendas
    - <https://github.com/tc39/agendas/blob/master/2018/11.md>
- Proposals Diff
  - <https://github.com/tc39/proposals/compare/master@{2018-11-01}...master@{2018-12-01}>
  - 0->1
    - Asset References
  - 1->2
  - 2->3
    - Hashbang Grammar
  - 3->4
  - -> inactive
    - Distinguishing literal strings
  - -> finished
    - Symbol.prototype.description
    - Function.prototype.toString
- New Proposals
  - samuelgoto/proposal-optional-types:
    - <https://github.com/samuelgoto/proposal-optional-types>
  - sebmarkbage/ecmascript-asset-references: Proposal to ECMAScript to add first-class location references relative to a module
    - <https://github.com/sebmarkbage/ecmascript-asset-references>


### IETF 動向

- IETF
  - IETF \| Highlights from IETF 103
    - <https://www.ietf.org/blog/highlights-ietf-103/>
  - HTTP Working Group Minutes
    - <https://github.com/httpwg/wg-materials/blob/gh-pages/ietf103/minutes.md>
    - <https://daniel.haxx.se/blog/2018/11/11/http-3/>
  - HTTP3
    - QUIC を HTTP over QUIC と思っている人がいる
    - 実際は QUIC は Transport で、 HTTP 外にも議論すべき話が多数
    - HTTP over QUIC を HTTP/3 と呼ぼう、という話に
    - HTTP/3 \| daniel.haxx.se
      - <https://daniel.haxx.se/blog/2018/11/11/http-3/>
    - Google's QUIC protocol: moving the web from TCP to UDP
      - <https://ma.ttias.be/googles-quic-protocol-moving-web-tcp-udp/>
  - WebRTC
    - WebRTC QUIC が ML で盛り上がり中
- RFC
- IETF Last Call
- WG Last Call
  - Working Group Last Call: draft-ietf-httpbis-bcp56bis-08
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2018OctDec/0187.html>
- Call for Adoption
- I-D Action
- Draft
  - HTTP Redirects in HTTP Adaptive Streaming
    - <https://tools.ietf.org/html/draft-finkelman-httpbis-has-redirecting-00>
  - Security Considerations Regarding Compression Dictionaries
    - <https://tools.ietf.org/html/draft-kucherawy-httpbis-dict-sec-00>
  - Hybrid ECDHE-SIDH Key Exchange for TLS
    - <https://tools.ietf.org/html/draft-kiefer-tls-ecdhe-sidh-00>
  - OAuth 2.0 for Browser-Based Apps
    - <https://tools.ietf.org/html/draft-parecki-oauth-browser-based-apps-00>
  - A Registry for HTTP Header Fields
    - <https://tools.ietf.org/html/draft-nottingham-httpbis-header-registry-00>
  - CDNI extensions for HTTPS delegation
    - <https://tools.ietf.org/html/draft-ietf-cdni-interfaces-https-delegation-00>
  - The Updated IETF-ISOC Relationship
    - <https://tools.ietf.org/html/draft-ietf-iasa2-rfc2031bis-00>
  - *User Agent Client Hints*
    - <https://tools.ietf.org/html/draft-west-ua-client-hints-00>
    - User-Agent はもう固定にして Client Hints で代替しよう
    - デフォルトでは `Sec-CH-UA: "Chrome 74"` だけ送る
    - `Accept-CH: UA, UA-Platform, UA-Arch` などすると追加が受け取れる
    - GREASE 的なこともするらしい
  - *The 'Lang' Client Hint*
    - <https://tools.ietf.org/html/draft-west-lang-client-hint-00>
    - q で重み付けしても、結局使ってない
    - 情報量が増えて fingerprint しやすくなるだけ
    - 単に言語を優先順に並べるだけにしよう
  - *HTTP-client suggested Push Preference*
    - <https://tools.ietf.org/html/draft-pot-prefer-push-00>
    - Client が Push して欲しいリソースを乗せる HTTP Header
- Other
  - HTTPWorkshop/workshop2019: Working area for the 2019 HTTP Workshop
    - <https://github.com/httpworkshop/workshop2019>


### セキュリティ動向

- *The Holy Hand Grenade of Antioch - OpenSSL Blog*
  - <https://www.openssl.org/blog/blog/2018/11/28/version/>
  - OpenSSL のバージョンフォーマットが変わる
  - 旧: MAJOR.MINOR.FIX[PATCH]
  - 新: MAJOR.MINOR.PATCH
  - 1.1.1 and 1.0.2 は変わらない
  - 2.0.0 は FIPS module で使われている
  - 3.0.0 から新しくなる


### 周辺動向

- A Netflix Web Performance Case Study
  - <https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9>
- *National Center for Supercomputing Applications (NCSA) at the University of Illinois*
  - <https://twitter.com/MIT_CSAIL/status/1061637673536770048>
  - <http://www.ncsa.illinois.edu/enabling/mosaic/versions>
  - NCSA Mosaic 25 周年
- *Cloud Computing without Containers*
  - <https://blog.cloudflare.com/cloud-computing-without-containers/>
  - Cloudflare Workers の仕組みについて解説
  - Container や VM を使わず V8 の isolate を使う
  - (ここでの VM は OS 部分を言ってると思われる)
  - フットプリントが小さく、コンテキストスイッチコストも小さい
  - 任意の言語は実行できない代わりに WASM 対応
  - 今後のクラウドのあり方になるだろう、としている
- *Testing new ideas with Fastly Fiddle*
  - <https://www.fastly.com/blog/testing-new-ideas-fastly-fiddle>
- google/j2cl: Java to Closure JavaScript transpiler
  - <https://github.com/google/j2cl>
- *The State of JavaScript 2018: Introduction*
  - <https://2018.stateofjs.com/introduction>
  - Highest Satisfaction
      1. Jest
      2. Express
      3. GraphQL
  - Highest Interest
      1. GraphQL
      2. Storybook
      3. Electron
  - Most Mentioned
      1. VueX
      2. Cypress
      3. Hapi
  - Most Used
      1. React
      2. Express
      3. Angular
  - Prediction Award
      1. Reason
      2. Svelte
      3. Parcel
  - Special Award
      1. VS Code
      2. Storybook
      3. Next.js
- *The 100 greatest innovations of 2018*
  - <https://www.popsci.com/best-of-whats-new-2018>
  - 2018 年のイノベーション 100 選
  - ここに WebAuthn (Web Authentication) by FIDO Alliance & W3C が入ってる


### イベント

- 12 月
  - 3-7: All Hands/Orlando2018 - MozillaWiki
    - <https://wiki.mozilla.org/All_Hands/Orlando2018>
