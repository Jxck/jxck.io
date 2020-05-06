# [monthly-web][mozaic.fm] ep67 Monthly Web 202004


## Info

audio: https://files.mozaic.fm/mozaic-ep67.mp3

published_at
: 2020-05-06

guest
: [@myakura](https://twitter.com/myakura)


## Theme

第 67 回のテーマは 2020 年 4 月の Monthly Web です。


### Chrome 動向

- Stable: 81
- Updates
  - New in Chrome 81
    - <https://developers.google.com/web/updates/2020/04/nic81>
    - Updated Chrome release schedule
      - 81: released
      - 82: skip
      - 83: 5/19
    - WebXR hit testing
    - App icon badging
    - Web NFC
    - A personal note from Pete
  - Deprecations and removals in Chrome 83  \|  Web  \|  Google Developers
    - <https://developers.google.com/web/updates/2020/04/chrome-83-deps-rems>
    - Disallow downloads in Sandboxed iframes
  - Chromium Blog: Chrome 83 Beta: Cross-site Scripting Protection, Improved Form Controls, and Safe Cross-origin Resource Sharing
    - <https://blog.chromium.org/2020/04/chrome-83-beta-cross-site-scripting.html>
    - Trusted Types for DOM Manipulation
    - Improved Form Controls
    - New Cross-Origin Policies
    - Origin Trials
    - Native File System
    - Performance.measureMemory()
    - Prioritized Scheduler.postTask()
    - WebRTC Insertable Streams
    - Other features in this release
    - ARIA Annotations
    - 'auto' keyword for '-webkit-appearance' CSS property
    - Barcode Detection API
    - CSS contain-intrinsic-size
    - CSS Color Adjust: color-scheme meta tag
    - display:inline-grid/grid/inline-flex/flex for
    - ES Modules for shared workers ('module' type option)
    - Improvements to font-display: optional
    - IndexedDB relaxed durability transactions
    - Out-Of-Renderer Cross-Origin Resource Sharing
    - Reversed range for
    - Support "JIS-B5" and "JIS-B4" @page
    - @supports selector() feature query function
    - WebRTC
      - RTCPeerConnection.canTrickleIceCandidates
      - RTCRtpEncodingParameters.maxFramerate
      - RTCRtpSendParameters.degradationPreference
    - WebXR DOM Overlay
    - JavaScript
    - fractionalSecondDigits option for Intl.DateTimeFormat
    - Deprecations, and Removals
    - Disallow Downloads in Sandboxed iframes
  - Chromium Blog: Temporarily rolling back SameSite Cookie Changes
    - <https://blog.chromium.org/2020/04/temporarily-rolling-back-samesite.html>
- Intents
  - Ship: getInstalledRelatedApps API for Windows
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/aq1Zxc8D_uI/R_uNpPCWBQAJ>
  - Ship: Content Index API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/cMlaiFqdkYQ/ANy6Ad2DAwAJ>
  - Ship: Contacts API Address/Icon support
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Ve2_LrxIG8w/WCa7bLqDAwAJ>
  - Ship: @property
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/3ygpsew53a0/T7acB6sRBQAJ>
    - CSS.registerProperty() を JS 無しで CSS で行う記法
  - Ship: Support for web-animations-1 JavaScript API.
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Wu4yPMznUw0/-LrirfTJBAAJ>
  - Prototype and Ship: Add schemes for decentralized web protocols to the safelist of registerProtocolHandler
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/7nHTRUP1EGY/LYCOtg3IAwAJ>
    - Web サイトに HTML 仕様でホワイトリストされた schema を紐づける
  - Prototype and Ship: ReportingObserver on workers
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/s9npIUKHkMA/aaUeFkVYBAAJ>
  - Implement and Ship: Unprefixed ruby-position CSS property
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/dKyoAe_tSQw/QP_zehZnAwAJ>
  - Prototype: AVIF Decode
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/gPse70Ax-iE/J7Ofg4V9AQAJ>
    - AV1 Image Format のデコード
    - 既存の AV1 実装を利用
  - Prototype: Window Controls Overlay for Installed Desktop Web Apps
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/cper6nNLFRQ/hU91kfCWBQAJ>
  - Prototype: text-decoration-thickness, text-underline-offset and from-font keyword for text-underline-position
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/D6S8JRPYtDA/yZ7fYcQUBQAJ>
  - Prototype: ImageDecoder API extension for WebCodecs
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/w1F8UGwTjZo/rrwylKubAwAJ>
    - Audio/Video と同様 Image もデコードできるように
    - ImageBitmap を取得して Canvas に書いたり
    - DOM 非依存なので Worker からも使える
  - Prototype: Third-party origin trials
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/78i3GDWsPr0/KNFQYEYTAQAJ>
    - 3rd Party から Origin Trials で機能を有効にできるように
  - Prototype: VirtualKeyboard API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/q80uCrMgiTM/nF3mo-7zBAAJ>
    - MS からの draft
    - 元々 2 つあったものをまとめた仕様
  - Prototype: Window Segments Enumeration API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/_1_ljYsaqrU/qOoHJ7MhAgAJ>
    - 複数 window に分割したレイアウトを提供する API
    - foldable/dual screen などの登場を受けて
  - Prototype: Altitude/Azimuth for PointerEvents v3
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/_aMJlxE8Jrw/UgoQSGZZAwAJ>
  - Prototype: App Icon Shortcuts Menu
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/gK4XF2vbvf0/NeA28SQDBgAJ>
  - Prototype: Web Bluetooth BluetoothDevice.watchAdvertisements()
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Bkn7wCAsKbs/reJTn3uuBQAJ>
  - Extend Origin Trial: Serial API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/P5uKC_HTStw/VjYdUfg-BQAJ>
    - シリアル通信を行う API
    - USB API よりもハイレベルで USB ではないシリアルデバイスも対象
    - ハードウェアコミュニティから教育ツールを作るユースケースがあるらしい
  - Extend Origin Trial: Screen Wake Lock API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/eBixUQy_mZk/mjPPt4I7BQAJ>
  - Extend Origin Trial: RenderSubtree attribute
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/sBGPdqQRQfo/cam3wY2jAwAJ>
    - display-locking の文脈
    - search には hit するがレンダリングされてない要素を作れる CSS
  - Experiment: Force Load At Top
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/ONn6qsdwHUo/zHqyNL46BQAJ>
    - scroll-to-text-fragment からの opt-out
  - Experiment: AppCache
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/ezHywZ-Xs20/T4o3-fXTBAAJ>
    - M83 から Reverse Origin Trial 開始
  - Experiment: Portals (Same-Origin, Android Only)
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/tFFemLT2xgQ/V35iIDJHAwAJ>
  - Experiment: Idle Detection API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/9OwINXHzbUE/0EhqVz2CAAAJ>
- Change:
- Unship:
- Remove: Title argument of registerProtocolHandler()
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/cZh5f1Ymj14/rLz2Xsy0BAAJ>
  - web-platform-tests quarterly update - Q1 2020
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/3FfJQAvIRTs/oSeSIWEcAQAJ>
  - Introduced --disable-system-font-check to content_shell
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/TyapRjOlf-w/lqD33jeyBAAJ>
  - PSA: Making WTF::String and WTF::AtomicString thread-safe
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/urPFr3-qeRg/1no3MRP-AwAJ>
  - *PSA: Reducing web compatibility risk.*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/kMhb8lIYAVE/p-w5_kBOAQAJ>
    - deprecation/removal などの互換性リスクのある intents には慎重になる
    - すでに approve された intent も、それぞれ機能ごとに改めて判断する
  - *Deprecate and Freeze: The User-Agent string*
    - <https://groups.google.com/a/chromium.org/d/msg/blink-dev/-2JIRNMWJ7s/u-YzXjZ8BAAJ>
    - UA 文字列のエントロピー減らす試みのうち、 UA 文字列の半固定化を少なくとも 2021 年まで
    - CH-UA ヘッダは  Chrome 84 で ship 予定
- v8
  - Understanding the ECMAScript spec, part 3 · V8
    - <https://v8.dev/blog/understanding-ecmascript-part-3>
  - What's in that .wasm? Introducing: wasm-decompile · V8
    - <https://v8.dev/blog/wasm-decompile>
- Other
  - Making your website "cross-origin isolated" using COOP and COEP
    - <https://web.dev/coop-coep/>
  - Understanding "same-site" and "same-origin"
    - <https://web.dev/same-site-same-origin/>
  - Monitor your web page's total memory usage with performance.measureMemory()
    - <https://web.dev/monitor-total-page-memory-usage/>
  - Improved dark mode default styling with the color-scheme CSS property and the corresponding meta tag
    - <https://web.dev/color-scheme/>
  - WebSocketStream: integrating streams with the WebSocket API
    - <https://web.dev/websocketstream/>
  - web.dev engineering blog #1: How we build the site and use Web Components
    - <https://web.dev/how-we-build-webdev-and-use-web-components/>
  - Ensure your website is available and usable for everyone during COVID-19
    - <https://web.dev/covid19/>
  - Storage for the web
    - <https://web.dev/storage-for-the-web/>
  - Cumulative Layout Shift (CLS) in AMP – The AMP Blog
    - <https://blog.amp.dev/2020/04/16/cumulative-layout-shift-in-amp/>
  - Adobe Experience Cloud Extends AMP Support – The AMP Blog
    - <https://blog.amp.dev/2020/04/10/adobe-experience-cloud-extends-amp-support/>
  - *Introducing the fastest and most user-friendly content encryption – The AMP Blog*
    - <https://blog.amp.dev/2020/04/27/introducing-the-fastest-and-most-user-friendly-content-encryption/>
    - 暗号化した結果をクライアントに送り、ログインしている場合だけ復号して表示する
    - Paywall をなくすための仕組み
  - Project Zero: You Won't Believe what this One Line Change Did to the Chrome Sandbox
  - <https://googleprojectzero.blogspot.com/2020/04/you-wont-believe-what-this-one-line.html>


### Firefox 動向

- Stable: 75.0
- Updates
  - Firefox 75.0, See All New Features, Updates and Fixes
    - <https://www.mozilla.org/en-US/firefox/75.0/releasenotes/>
  - Firefox 75 for developers - Mozilla \| MDN
    - <https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/75>
  - Firefox 75: Ambitions for April - Mozilla Hacks - the Web developer blog
    - <https://hacks.mozilla.org/2020/04/firefox-75-ambitions-for-april/>
    - img 要素の loading 属性
    - CSS の min() / max() / clamp()
- Intents
  - Ship: inputmode attribute on Android (GeckoView)
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/gr5wsowXzLw/hh7RbgGlBgAJ>
  - Ship: Logical Assignment for JavaScript
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/T_dD0us_W1E/F9FxewRDAQAJ>
  - Ship: AudioWorklet
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/_i1mSzhaDkQ/HCQ8CZwsAQAJ>
    - あるサービスプロバイダから WFH な環境で有益という声がでたので、 76 にアップリフトした
  - Ship: "Multi-value" WebAssembly proposal
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/lh3u-nqbFf8/A3KwV6thAQAJ>
  - Ship: RegExp dotAll flag (/s), unicode escape sequences, lookbehind assertions
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/oHXLYkUKWGo/UcWq7WOuAgAJ>
  - Prototype and Ship: CSS :is() and :where() pseudo-classes.
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/_f8gYPevIQw/9X-A-2R5AQAJ>
  - Prototype and Ship: Tab modal system prompts
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/00OOAwDuZ8o/TlZC1ZUCAQAJ>
  - Prototype: Dynamic FPI
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/f2_hLdfsbq4/ZhuWE4ZAAgAJ>
    - First Party Isolation
  - Prototype ARIA reflection (non-IDREF)
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/FWdTtWSFzE0/Rsoy0cVGAgAJ>
  - Prototype: ETP Cookie Purging
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/0JjAHt59j7s/hJR9G0i7AQAJ>
  - Prototype: cookie behavior "reject foreign" with storageAccess API and heuristic exceptions
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/fBzchbJCEBI/CX_8cK-uBwAJ>
  - Unship: window.external.AddSearchProvider
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/vSV-gg5621k/zOughoepBQAJ>
  - Unship: title argument of Navigator.registerProtocolHandler
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/T633aemFPJU/dbv5_iB8AgAJ>
- Other
  - Twitter の Cache 問題
    - Twitter Data Cache on Mozilla Firefox
    - <https://privacy.twitter.com/en/blog/2020/data-cache-firefox.html>
    - Shared PC で、別アカウントの Cache が Firefox では残っていたと Twitter 発表。(Firefox の問題のような書かれ方)
    - <https://blog.mozilla.org/blog/2020/04/03/what-you-need-to-know-about-twitter-on-firefox>
    - 実際は Content-Disposition が指定されて Cache-Control が指定されてないレスポンスが、 Huristic Cache に載っていた問題。 Huristic Cache は仕様にもあり実装にゆだねられているので、本来は明示的に Cache-Control: no-store を指定すべきだが、 Twitter は Chrome/Safari の実装でしかテストしてなかった模様。
    - Mozilla は仕様はこうした問題を解決するためにあるのに、正しく使われていないことによる問題を Firefox の問題のようにすり替えていることに遺憾。
    - Twitter Direct Message Caching and Firefox - Mozilla Hacks - the Web developer blog
    - <https://hacks.mozilla.org/2020/04/twitter-direct-message-caching-and-firefox/>
      - 追記として response に pragma: no-cache が入っていたことが原因でもあったらしい
      - pragma: no-cache は cache-control: no-cache と透過で request で使うべきもの
  - Firefox 76 Beta and Developer Edition are out, some changes postponed due to COVID-19 outbreak
    - <https://www.fxsitecompat.dev/en-CA/blog/2020/firefox-76-beta-and-developer-edition-are-out-some-changes-postponed-due-to-covid-19-outbreak/>
    - Covid-19 で先送りになった機能一覧
    - Removing TLS 1.0/1.1 support
    - Removing DTLS 1.0 support from WebRTC
    - Removing FTP support
    - Enforcing MIME check for worker scripts
    - Rotating JPEG images
  - These Weeks in Firefox: Issue 72 – Firefox Nightly News
    - <https://blog.nightly.mozilla.org/2020/04/06/these-weeks-in-firefox-issue-72/>
  - These Weeks in Firefox: Issue 73 – Firefox Nightly News
    - <https://blog.nightly.mozilla.org/2020/04/17/these-weeks-in-firefox-issue-73/>
  - Firefox's Bug Bounty in 2019 and into the Future \| Mozilla Security Blog
    - <https://blog.mozilla.org/security/2020/04/23/bug-bounty-2019-and-future/>
  - Expanding Client Certificates in Firefox 75 \| Mozilla Security Blog
    - <https://blog.mozilla.org/security/2020/04/14/expanding-client-certificates-in-firefox-75/>
  - Firefox 75 will respect `nosniff` for Page Loads \| Mozilla Security Blog
    - <https://blog.mozilla.org/security/2020/04/07/firefox-75-will-respect-nosniff-for-page-loads/>
  - Engineering code quality in the Firefox browser: A look at our tools and challenges - Mozilla Hacks - the Web developer blog
    - <https://hacks.mozilla.org/2020/04/code-quality-tools-at-mozilla/>
  - A Taste of WebGPU in Firefox - Mozilla Hacks - the Web developer blog
    - <https://hacks.mozilla.org/2020/04/experimental-webgpu-in-firefox/>
  - Keeping Firefox working for you during challenging times \| The Firefox Frontier
    - <https://blog.mozilla.org/firefox/keeping-firefox-working-for-you-during-challenging-times/>


### Safari 動向

- Stable: 13.1
- Updates
  - New WebKit Features in Safari 13.1
    - <https://webkit.org/blog/10247/new-webkit-features-in-safari-13-1/>
    - Pointer and Mouse Events on iPadOS
    - Web Animations API
    - Async Clipboard API
    - JavaScript Improvements
    - ResizeObserver
    - HTML enterkeyhint Attribute
    - CSS Shadow Parts
    - More CSS Additions
    - Media APIs
    - Subtitles and Captions
    - WebRTC Legacy Audio and Proxy Support
    - Performance Improvements
    - Security Improvements
    - Intelligent Tracking Prevention Updates
    - Web Platform Quality Improvements
    - Web Inspector Updates
    - Redesigned Color Picker
    - Customized AR QuickLook
  - Release Notes for Safari Technology Preview 104
    - <https://webkit.org/blog/10264/release-notes-for-safari-technology-preview-104/>
    - Added HTTP3 as an experimental feature (r258678)
    - Added label text to suggested values for a <datalist> element (r259330)
    - Removed synchronous termination of service workers (r259383)
    - Added support for :is() (r259261)
    - Added initial support for WebRTC HEVC (r259452)
    - Supported inserting text or dictation alternative by simulating keyboard input (r258873)
    - Supported resolution of IPv6 STUN/TURN addresses (r259338)
    - Improved title and text used in prompts (r258961)
  - Release Notes for Safari Technology Preview 105
    - <https://webkit.org/blog/10428/release-notes-for-safari-technology-preview-105/>
    - Added Selectors Level 4 specificity calculation for pseudo classes (r260024, r260069)
    - Added support for font-relative lh and rlh unit frp, CSS Values Level 4 specification (r259703)
    - Implemented `BigInt.prototype.toLocaleString` (r259919)
    - Implemented logical assignment operators (r260119)
    - Made a change to update ScreenTime as playback state changes (r260182, r260201)
    - Filtered some capture device names (r259477)
    - Added support for applying a frameRate limit when the request stream is from Camera (r260245)
    - Added support for pseudoElement on KeyframeEffect and KeyframeEffectOptions (r260139)
  - Web Animations in Safari 13.1
    - <https://webkit.org/blog/10266/web-animations-in-safari-13-1/>
  - A Tour of Inline Caching with Delete
    - <https://webkit.org/blog/10298/inline-caching-delete/>
    - delete が最適化にもたらす影響
- Other


### Edge 動向

- Stable: 81
- Updates
- Chakra
  - Release ChakraCore v1.11.18 - microsoft/ChakraCore
    - <https://github.com/microsoft/ChakraCore/releases/tag/v1.11.18>
- Other
  - Analyzing Network Traffic Logs (NetLog json) \| text/plain
    - <https://textslashplain.com/2020/04/08/analyzing-network-traffic-logs-netlog-json/>


### WHATWG/W3C 動向

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
- Chartering
  - Web fights covid19 Community Group created
    - <https://lists.w3.org/Archives/Public/public-new-work/2020Apr/0005.html>
- Other
  - W3C Website redesign: User-stories; brand and identity \| W3C Blog
    - <https://www.w3.org/blog/2020/04/w3c-website-redesign-user-stories-brand-and-identity/>
  - Upcoming Distributed, Online Workshops: W3C/OGC Joint Workshop Series on Maps for the Web
    - <https://www.w3.org/blog/news/archives/8455>


### TC39 動向

- ES2020
  - Release ES2020 Candidate - tc39/ecma262
    - <https://github.com/tc39/ecma262/releases/tag/es2020>
    - 4/2 に TC39 が approve した candidate
    - 6 月に ECMA GA が approve したら正式になる
- Meeting
  - 2020-04
    - <https://github.com/tc39/agendas/blob/master/2020/03.md>
    - <https://github.com/tc39/notes/tree/master/meetings/2020-03>
- Proposals Diff
  - <https://github.com/tc39/proposals/compare/master@{2020-04-01}...master@{2020-05-01}>
  - <https://tc39.github.io/beta/>
  - 0->1
    - Number.range / Bigint.range
    - brand check for private
    - Compartments
    - Intl.NumberFormat v3
  - 1->2
  - 2->3
    - logical assignment
  - 3->4
    - import.meta
- New Proposals
  - Number.range / BigInt.range
    - <https://github.com/tc39/proposal-Number.range>
  - Compartments
    - <https://github.com/bmeck/proposal-compartments>
  - RefCollection
    - <https://github.com/rricard/proposal-refcollection/>
    - reference を symbol でまとめておく仕様
  - Deep Path Properties for Records
    - <https://github.com/rickbutton/proposal-deep-path-properties-for-record/>
    - Record Literal の Path 仕様
  - Conflict Comments
    - diff 記法みたいな
    - ジョークらしい(table から削除されてる)
- Other


### IETF 動向

- IETF
- RFC
- IETF Last Call
- WG Last Call
- Call for Adoption
- I-D Action
- Draft
  - QUIC Version Aliasing
    - <https://tools.ietf.org/html/draft-ietf-quic-version-aliasing-00>
  - *The Vulcain Protocol*
    - <https://tools.ietf.org/html/draft-dunglas-vulcain-00>
    - Graph QL を REST に載せたような OSS 実装の draft 化
    - Preload/Field header を使って関連リソースの Preload をする
    - Cache-Digest や Early Hints などが応用されている
  - Supporting Redirect Responses in DNS Queries over HTTPS (DoH)
    - <https://tools.ietf.org/html/draft-btw-add-rfc8484-clarification-00>
  - *Virtual Hum Application: Requirements*
    - <https://tools.ietf.org/html/draft-sheffer-hum-app-req-00>
    - IETF の文化である hum を Virtual でやる上での要件の整理
  - Specification of DNS over Dedicated QUIC Connections
    - <https://tools.ietf.org/html/draft-ietf-dprive-dnsoquic-00>
  - *Compact TLS 1.3*
    - <https://tools.ietf.org/html/draft-ietf-tls-ctls-00>
    - 互換性のために入れていた値などを取り除いて小さくした仕様
  - Upgrading Communication from Stub Resolvers to DoT or DoH
    - <https://tools.ietf.org/html/draft-pp-add-stub-upgrade-00>
  - Recommendations for Secure Use of Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS)
    - <https://tools.ietf.org/html/draft-sheffer-uta-rfc7525bis-00>
  - Using Early Data in DNS over TLS
    - <https://tools.ietf.org/html/draft-ietf-dprive-early-data-00>
  - Optimizing ACK mechanism for QUIC
    - <https://tools.ietf.org/html/draft-li-quic-optimizing-ack-in-wlan-00>
  - The WebTransport Protocol Framework
    - <https://tools.ietf.org/html/draft-ietf-webtrans-overview-00>
  - Hybrid key exchange in TLS 1.3
    - <https://tools.ietf.org/html/draft-ietf-tls-hybrid-design-00>
  - *Signing HTTP Messages*
    - <https://tools.ietf.org/html/draft-ietf-httpbis-message-signatures-00>
    - その名の通り HTTP に署名する仕様
    - Signature ヘッダを追加
    - メッセージの正規化方法も定義
  - *Best practices for password hashing and storage*
    - <https://tools.ietf.org/html/draft-whited-kitten-password-storage-01>
    - * Other


### セキュリティ動向

- Zoom Japan FAQ - 2020/04/01 Zoom 利用者へのメッセージ
  - <https://sites.google.com/zoom.us/zoomjapanfaq/zoomblog/a-message-to-our-users>
  - 様々な脆弱性や実装上の問題に対応するため、 90 日の集中対策計画を発表
- ミーティング・ウェビナーの暗号化について (翻訳版) - Zoom Blog
  - <https://blog.zoom.us/wordpress/ja/2020/04/01/zoom%e3%81%8a%e3%82%88%e3%81%b3%e3%83%9f%e3%83%bc%e3%83%86%e3%82%a3%e3%83%b3%e3%82%b0-%e3%82%a6%e3%82%a7%e3%83%93%e3%83%8a%e3%83%bc%e3%81%ae%e6%9a%97%e5%8f%b7%e5%8c%96%e3%81%ab%e9%96%a2%e3%81%99/>
  - End-to-End 暗号化
- Beware of the GIF: Account Takeover Vulnerability in Microsoft Teams \| CyberArk
  - <https://www.cyberark.com/threat-research-blog/beware-of-the-gif-account-takeover-vulnerability-in-microsoft-teams/>
  - グループチャットツールの Microsoft Teams に「GIF 画像を見るだけでアカウントを乗っ取られる脆弱性」が発見される - GIGAZINE
  - <https://gigazine.net/news/20200428-microsoft-teams-vulnerability-gif-link/>
  - ただし、事前に subdomain を乗っ取っておく必要がある
- 「ニンテンドーネットワーク ID」に対する不正ログイン発生のご報告と「ニンテンドーアカウント」を安全にご利用いただくためのお願い
  - <https://www.nintendo.co.jp/support/information/2020/0424.html>


### 周辺動向

- How HTTP/3 and QUIC aim to help the connections that need it most
  - <https://www.fastly.com/blog/how-http3-and-quic-help-long-tail-connections>
- How COVID-19 is affecting internet performance
  - <https://www.fastly.com/blog/how-covid-19-is-affecting-internet-performance>
- Internet performance during the COVID-19 emergency
  - <https://blog.cloudflare.com/recent-trends-in-internet-traffic/>
- Comparing HTTP/3 vs. HTTP/2 Performance
  - <https://blog.cloudflare.com/http-3-vs-http-2/>
- News: Cliqz closes areas for browser and search technologies
  - <https://www.burda.com/de/news/cliqz-schliesst-bereiche/>
  - ep65 (2020-03) で取り上げた Cliqz がブラウザと検索事業を終了
  - Google が支配的な現状を崩せないことや、パンデミックの影響に言及
- MsQuic is Open Source
  - <https://techcommunity.microsoft.com/t5/networking-blog/msquic-is-open-source/ba-p/1345441>
  - microsoft/msquic: Cross platform C implementation of the IETF QUIC protocol.
    - <https://github.com/Microsoft/msquic>
- オランダ当局が Cookie ウォールは GDPR の要件を満たさないと判断 \| TechCrunch Japan
  - <https://jp.techcrunch.com/2019/03/11/2019-03-08-cookie-walls-dont-comply-with-gdpr-says-dutch-dpa/>


### イベント

- 5 月
  - ??: Chrome Security Summit
    - 9/9-10 に延期
      - Chromium Platform Security Summit - September 9th and 10th
      - <https://groups.google.com/a/chromium.org/forum/#!topic/security-dev/k7Lzy8TpR6Y>
- 6 月
  - 19: SecWeb
  - ??: WWDC
    - virtual


### Wrap Up

- ブラウザが Compatibility risk のある変更を延期
- Trusted Types + C-O-\* = Securer Context 周りが始まった
- zoom の脆弱性と E2E 暗号化から WebRTC Insertable Stream の話
- es2020 の candidate
- Compact TLS 1.3
- MsQuic 公開
- Covid-19 によるネットワークトラフィック統計 by Fastly/Cloudflare
- Twitter Cache のバグと Firefox 実装の話
