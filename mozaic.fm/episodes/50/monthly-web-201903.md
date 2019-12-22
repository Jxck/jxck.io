# [monthly-web][mozaic.fm] ep50 Monthly Web 201903

## Info

audio: https://files.mozaic.fm/mozaic-ep50.mp3

published_at
: 2019-03-30

guest
: [@myakura](https://twitter.com/myakura)


## Theme

第 50 回のテーマは 2019 年 03 月の Monthly Web です。


## Show Note


### Chrome 動向

- Stable: 73.0
- Updates
  - New in Chrome 73
    - <https://developers.google.com/web/updates/2019/03/nic73>
    - Progressive Web Apps work everywhere (macOS)
    - Signed HTTP exchanges.
    - Constructable Style Sheets.
  - What's New In DevTools (Chrome 74)
    - <https://developers.google.com/web/updates/2019/03/devtools>
    - Highlight all nodes affected by CSS property
    - Lighthouse v4 in the Audits panel
    - WebSocket binary message viewer
    - Capture area screenshot in the Command Menu
    - Service worker filters in the Network panel
    - Performance panel updates
    - Long tasks in Performance recordings
    - First Paint in the Timings section
    - New DOM tutorial
  - *KV Storage: the Web's First Built-in Module*
    - <https://developers.google.com/web/updates/2019/03/kv-storage>
    - AsyncLocalStorage が KV Storage になった
    - Built-in で `'std:kv-storage'` に
    - import-map で polyfill にフォールバック可能になった
    - Move Ya! Or maybe, don't, if the user prefers-reduced-motion!
    - <https://developers.google.com/web/updates/2019/03/prefers-reduced-motion>
    - prefers-reduces-motion
  - *Chromium Blog: Chrome Lite Pages - For a faster, leaner loading experience*
    - <https://blog.chromium.org/2019/03/chrome-lite-pages-for-faster-leaner.html>
    - data-saver を利用していると Google のサーバで最適化されたページが表示される
  - Introducing JsDbg - Browser-based debugging extensions for Chromium
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/6zhD3VuHi8s/pS4UkiKoCQAJ>
    - <https://github.com/MicrosoftEdge/JsDbg>
    - DOM tree や AOM Tree まで触れるデバッガ
    - Web 技術(HTML/CSS/JS) で作られている
    - 今は Windows のみで、 WinDbg や VS debugger で使える
    - 他の OS や他のデバッガ(GDB)などは future work
    - BlinkOn 10 で話すらしい
  - *Chromium Blog: Chrome 74 beta: reducing unwanted motion, private class fields, and feature policy API*
    - <https://blog.chromium.org/2019/03/chrome-74-beta-reducing-unwanted-motion.html>
    - prefers-reduced-motion
    - Private class fields ([blog](https://blog.jxck.io/entries/2019-03-14/private-class-field.html))
    - JavaScript API for feature policy
    - sampleRate option for the AudioContext constructor
    - Intl.Locale
    - Signed exchange reporting for distributors
    - TextEncoder encodeInto() method
    - Service worker: client.postMessage() is buffered until the document is ready.
    - CSS transition events
    - RTCIceCandidate and RTCIceCandidateInit
    - XHR falls back to UTF-8 when invalid encoding is specified
    - Remove Custom Elements v0
    - Remove PaymentAddress's languageCode property
    - Don't allow popups during page unload
    - Deprecate drive-by downloads in sandboxed iframes
- Intents
  - Ship: Background Fetch
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/-iAATJCpcNY/o6Kb_ktrBQAJ>
  - *Ship: Feature Policy control over document.domain*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/rZOaOONFCNI/4IZTJBYMCAAJ>
    - `document.domain` に代入すると `throw error` するようになる
  - Ship: WebAssembly non-trapping float-to-int conversions
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/ERkU6ysNVz4/ush9rOJVBgAJ>
  - Ship: lowLatency canvas contexts (now: `|desynchronized|`)
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/nxjWgMIeC1Q/LyC1sle2BQAJ>
  - Implement and Ship: Backdrop Filter
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/GRl1_Qy97jM/h7v1qIDsBwAJ>
  - Implement and Ship: ImageCapture support for Pan/Tilt
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/j-Q08QgBipM/F3a5sau1BwAJ>
  - *Implement and Ship: HTMLVideoElement.playsInline*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/0TJyePKiegs/24w8YsCQCAAJ>
    - mobile で fullscreen にならないための属性
    - iPhone Safari の独自だったもの
  - *Implement: line-break: anywhere*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/r7PkIqQDvlU/X0aocVo9BQAJ>
    - 単語の途中などでも任意の Character Unit で折り返しする
  - *Implement: Impl threaded scrollbar scrolling*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/hwZCeiK4wR8/qZvGvW8WBwAJ>
    - Scrollbar のスクロールを off the main thread する話
    - メインループが混んでてもスクロールができる
    - イベントは Queue に貯めといてメインが空いたら上げる
  - Implement: Add charLength Attribute to SpeechSynthesisEvent
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/SwwNS8tPkzw/K1UaiYgqCAAJ>
  - Implement outline-color: invert
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/p0nHeY_ZSEg/-leLPafWCQAJ>
  - *Implement: Subresource prefetching+loading via Signed HTTP Exchange*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/zdvJLcditVA/FPuTNAKnCQAJ>
    - <https://docs.google.com/document/d/1tARwhN_yymddnhyGrYmmM8b9RP0RKPKW_6T9yEI5CAg/edit>
    - AMP Cache から index.html.sxg を取る場合、サブリソースも AMP Cache から取りたい
    - でも index.html.sxg の img タグは元の Origin で書かれている
    - 署名されているから img タグを AMP Cache の URL に書き換えることもできない
    - あらかじめ AMP Cache からとっても良いことを allowed-alt-sxg という meta タグで書いておく
    - AMP Cache は index.html.sxg の中身を見てキャッシュにある img を認識しておく
    - AMP Cache は index.html.sxg のレスポンスで Link タグに AMP Cache に別の URL で img があるよということを教える
    - ブラウザは img を読む時にその AMP Cache 側にリクエストを投げる
    - 署名されてるので AMP Cache が勝手に中身を差し替えたりできないし
    - HTML を書き換えなくても origin のリクエストを全部 AMP Cache に向けられる
  - *Implement: Alternative Text in CSS Generated Content*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/xnoMlEorXxw/mZisL9zqBwAJ>
    - CSS の background-image などで貼った画像に alt をつける
    - content タグに書いた文字が alt として扱われる予定
    - Safari は別の名前 (`-webkit-alt` プロパティ) としてサポート済み
    - 質問した <https://github.com/w3ctag/design-reviews/issues/351>
  - Implement: ElementTiming for text
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/9B7OHgwwEzs/jnmdgx_7DAAJ>
  - Implement: Native Caret Browsing
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/ZEEwLuKlmcw/Nrj2wFkJAwAJ>
  - *Implement: requestPostAnimationFrame*
    - <https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/m-UwqK3cdjA>
  - Remove: overflow: -webkit-paged-x , overflow: -webkit-paged-y
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/_UhJEz04sqA/aCcX58-mBwAJ>
  - Deprecate: Prevent download in ad frame without user activation
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/tXKnmZD3P9o/WXBYboSXCwAJ>
  - Deprecate and Remove: aria-help
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/LS5I962Wlnk/wwIjHS-bCwAJ>
  - PSA: Layered API/built-in modules experimental flag renamed
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Rtv6BM6pLyc/cGxsG6RxBgAJ>
  - PSA: Fast Flat Tree Traversal enabled on trunk
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/2SsgfcYYE1U/4qyqdjsZCwAJ>
  - Experiment: WebRTC audio relative packet arrival delay statistic
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/YbhMyqLXXXo/gwuazcvpCQAJ>
  - *Experiment: KV storage built-in module + import maps*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/sEwWEF80T4s/Nss9VxM3BAAJ>
  - Experiment: navigator.scheduling.isInputPending
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/ItkbDBevOrs/yFffQlqTBQAJ>
  - Implement and Experiment: Mute in Picture-in-Picture window
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/BaOreKhdOwg/YJdACNLLCAAJ>
  - Extend Origin Trial: Background Fetch
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/TcQgTVk_wmM/Tkdb6EtrBQAJ>
  - Extend Origin Trial: Configurable WebRTC jitter buffer max size
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/kyb06SYn_v0/j8lQiSdiBQAJ>
  - Unified V8-Blink Garbage Collected Heaps
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/WosJkkBDY_c/uyRYvR_4BgAJ>
- Team Weekly Snippet
- v8
  - *JIT-less V8*
    - <https://v8.dev/blog/jitless>
    - 組み込み用途では実行可能メモリへのアクセスを許可できないため V8 が使えなかった
    - そこで JIT 無しのインタプリタのみのモードを入れた
    - 遅くはなるが、色々な用途が広がる
  - v8 blog
    - V8 release v7.4 · V8
      - <https://v8.dev/blog/v8-release-74>
    - Blazingly fast parsing, part 1: optimizing the scanner · V8
      - <https://v8.dev/blog/scanner>
- Other
  - Welcome to the AMP Roadshow 2019. First stop: Africa!
    - <https://amphtml.wordpress.com/2019/03/05/welcome-to-the-amp-roadshow-2019-first-stop-africa/>
  - Encouraging more voices in AMP
    - <https://amphtml.wordpress.com/2019/03/06/encouraging-more-voices-in-amp/>
  - *Browser Bug Searcher*
    - <https://browser-issue-tracker-search.appspot.com/>
  - [BlinkOn 10] Draft schedule
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/HxTVkDgXDWw/jCSkQlsCBwAJ>
  - Announcing the AMP Conf Lineup!
    - <https://amphtml.wordpress.com/2019/03/11/announcing-the-amp-conf-lineup/>
  - *Take action and stay up-to-date with dynamic email in Gmail*
    - <https://www.blog.google/products/gmail/take-action-and-stay-up-to-date-with-dynamic-email-in-gmail/>
    - AMP for Email
  - Building the future of email with AMP - Accelerated Mobile Pages Project
    - <https://blog.amp.dev/2019/03/26/building-the-future-of-email-with-amp/>
  - Elliott Sprehn on Twitter: "I'm rethinking my former advice around web storage: localStorage reads are super fast since they read an in memory cache, writes are very slow. IndexedDB KV storage (like the built-in API proposal) has slow reads *and* writes and event loop delays on reads. @shubhie @_developit"
    - <https://twitter.com/ElliottZ/status/1105342069449474048>


### Firefox 動向

- Stable: 66.0.1
  - Firefox 66 for developers - Mozilla \| MDN
    - <https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/66>
  - Firefox 66.0, See All New Features, Updates and Fixes
    - <https://www.mozilla.org/en-US/firefox/66.0/releasenotes/>
  - Firefox 66: The Sound of Silence - Mozilla Hacks - the Web developer blog
    - <https://hacks.mozilla.org/2019/03/firefox-66-the-sound-of-silence/>
- Updates
  - These Weeks in Firefox: Issue 54
    - <https://blog.nightly.mozilla.org/2019/03/05/these-weeks-in-firefox-issue-54/>
  - These Weeks in Firefox: Issue 55
    - <https://blog.nightly.mozilla.org/2019/03/15/these-weeks-in-firefox-issue-55/>
  - Firefox Front-End Performance Update #14 \| Mike Conley's Blog
    - <https://mikeconley.ca/blog/2019/03/08/firefox-front-end-performance-update-14/>
  - Firefox Front-End Performance Update #15 \| Mike Conley's Blog
    - <https://mikeconley.ca/blog/2019/03/22/firefox-front-end-performance-update-15/>
- Intents
  - *Ship: Dynamic module imports (JS 'import()' syntax)*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/Mji-LGbuPOg/heV3n1BvAwAJ>
  - *Ship: String.prototype.matchAll*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/BTnxShq-LQc/eWZIcxQjCQAJ>
  - *Ship: CSS Containment*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/lcGPwhu1Bcg/TxZz8qz2BgAJ>
  - Ship: Backward-Compatibility FIDO U2F support for Google Accounts
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/q5cj38hGTEA/lC834665BQAJ>
  - Ship: Ignore custom cursors over 32 pixels intersecting UI
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/ke-KMmY1Mak/1yNRc4ATBQAJ>
  - Ship: URL classifier classification by default
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/7tsOBwlpgw0/_NaqDRJGCQAJ>
  - *Ship: Backward-Compatibility FIDO U2F support for Google Accounts*
    - <https://groups.google.com/forum/#!topic/mozilla.dev.platform/q5cj38hGTEA>
  - *Implement and Ship the CSS Scroll Snap Module Level 1 and unship old scroll snap properties*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/s0rMvOBnO_4/AFjL0qHpAwAJ>
  - *Implement and Ship: CSS revert keyword.*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/AvR6VqGeSJs/HgWB907xCAAJ>
  - *Implement and Ship: CSS ::marker pseudo-element*
    - <https://groups.google.com/forum/#!topic/mozilla.dev.platform/PSbIck_Jj4s>
  - Implement and Ship: built-in CSS counter 'list-item'
    - <https://groups.google.com/forum/#!topic/mozilla.dev.platform/5V37Xg997Mg>
  - Implement and Ship: CSS counter-set property
    - <https://groups.google.com/forum/#!topic/mozilla.dev.platform/vOGqau_-5qo>
  - Implement: Trim the Referer header sent to third-party tracking resources to origin by default through modifying the default referrer policy
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/pCZkdNluLTk/GW-QWJ_VAwAJ>
    - [blog](https://blog.jxck.io/entries/2018-10-08/referrer-policy.html)
  - Implement: Limit the maximum life-time of cookies set through document.cookie to seven days
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/lECBPeiGTy4/cPP52vyZAwAJ>
  - *Implement: cryptomining and fingerprinting resource blocking*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/8KLyZ_pisEI/_1itq_i9CQAJ>
    - コンテンツブロッキングのリストに Mining/Fingerprint が追加された
    - Coinhive なども入っている
    - <https://github.com/mozilla-services/shavar-prod-lists/blob/7eaadac98bc9dcc95ce917eff7bbb21cb71484ec/disconnect-blacklist.json>
    - これについては「セキュリティ動向」で
  - Intermediate CA Preloading is enabled for desktop Nightly users
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/ATbLAQpWLXE/naA1CZreAwAJ>
  - Disabling document.createEvent("TouchEvent"), document.createTouch* and ontouch* event handlers on desktop
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/dwRNENReBuU/81z1N78zAwAJ>
  - *Implement and Experiment: Require user interaction for notification permission prompts*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/15s-U_wXHeA/cekU32UyBwAJ>
  - *Unship: Some Shadow DOM v0 APIs*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/zFwps4VTiXw/mT44PT8dBgAJ>
- Site Compat
  - <https://www.fxsitecompat.com>
- Other
  - Real virtuality: connecting real things to virtual reality using web technologies - Mozilla Hacks - the Web developer blog
    - <https://hacks.mozilla.org/2019/03/connecting-real-things-to-virtual-worlds-using-web/>
  - *Fast, Bump-Allocated Virtual DOMs with Rust and Wasm*
    - <https://hacks.mozilla.org/2019/03/fast-bump-allocated-virtual-doms-with-rust-and-wasm/>
    - Dodrio


### Safari 動向

- Stable: 12.1
- Safari Technology Preview NN
  - Release Notes for Safari Technology Preview 77
    - <https://webkit.org/blog/8658/release-notes-for-safari-technology-preview-77/>
    - Fixed getUserMedia with an ideal deviceId constraint to always select the correct device (r241489)
    - *Made navigator.mediaDevices SecureContext (r241602)*
    - Fixed WebSocket to not fire events after being stopped (r241599)
    - Fixed Same-Site Lax cookies to be sent with cross-site redirect from a client-initiated load (r241918)
    - Updated the MIME type parser (r241863)
    - Changed to handle indefinite percentages in fit-content() (r241746)
    - Fixed HTML5 `<footer>` tag to be read as an ARIA Landmark to VoiceOver (r242051)
    - Fixed incorrectly mapping the `<meter>` element to progressbar (r241989)
    - Fixed setting fullscreen pseudo-classes outside of root when entering fullscreen from inside of a shadow root (r241484)
    - Changed inline WebVTT styles to start with `::cue` (r241608)
    - Fixed a bug that caused loading on some sites to hang in Safari Technology Preview (r241658)
    - Made the window.safari object available in frames opened to safari-extension:// resources
  - Release Notes for Safari Technology Preview 78
    - <https://webkit.org/blog/8676/release-notes-for-safari-technology-preview-78/>
    - *Enabled support for Pointer Events by default (r242232)*
    - Added support for Pointer Events on macOS (r242137)
    - Fixed string not getting terminated with a null character (r242352)
    - Adjusted XMLHttpRequest Content-Type handling (r242284)
    - *Added support for the referrerpolicy attribute (r242534)*
    - Implemented further CORS restrictions (r242786)
    - Added remote search support for keyboard focusable element search type (r242528)
    - *Removed HEVC as a codec requiring hardware support (r242357)*
- Other
  - *On the Road to WebRTC 1.0, Including VP8*
    - <https://webkit.org/blog/8672/on-the-road-to-webrtc-1-0-including-vp8/>
    - VP8 Video Codec
    - Video Simulcast
    - Unified Plan
    - Additional API updates


### Edge 動向

- Stable: EdgeHTML18
- Status Updates
  - <https://github.com/MicrosoftEdge/Status/compare/production@{2019-03-01}...production@{2019-04-01}>
- EdgeHTML
  - <https://aka.ms/devguide_edgehtml_18>
  - <https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/>
- Build Changelog
  - <https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/>
- Chakra
  - Release ChakraCore v1.11.7 · Microsoft/ChakraCore
    - <https://github.com/Microsoft/ChakraCore/releases/tag/v1.11.7>
- Other
  - Announcing Windows 10 Insider Preview Build 18358 \| Windows Experience Blog
    - <https://blogs.windows.com/windowsexperience/2019/03/15/announcing-windows-10-insider-preview-build-18358/>
    - Windows Defender Application Guard as browser extensions in Google Chrome and Mozilla Firefox
    - Microsoft 、 Chrome と Firefox 向け「Windows Defender Application Guard」拡張機能公開
    - <https://www.itmedia.co.jp/news/articles/1903/18/news077.html>
  - *Japan Support Blog がついにアクセスできなくなる*
    - <https://blogs.technet.microsoft.com/jpieblog/2018/12/30/japan-ie-support-team-blog-終了のお知らせ/>
    - forum に記事がポートされているが新着はなし
    - <https://social.msdn.microsoft.com/Forums/ja-JP/home?forum=edgeiesupportteamja>


### WHATWG/W3C 動向

- *#Web30*
  - W3C celebrates the 30th anniversary of the Web
    - <https://www.w3.org/blog/news/archives/7663>
  - 30 years on, what's next #ForTheWeb?
    - <https://webfoundation.org/2019/03/web-birthday-30/>
  - Building browsers! #Web30 \| Vivaldi Browser
    - <https://vivaldi.com/ja/blog/building-browsers/>
- Recommendation
  - *Web Authentication: An API for accessing Public Key Credentials Level 1 is a W3C Recommendation*
    - <https://www.w3.org/blog/news/archives/7598>
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - *First Public Working Draft: User Timing Level 3*
    - <https://www.w3.org/blog/news/archives/7617>
- Chartering
  - zot protocol Community Group Proposed
    - <https://lists.w3.org/Archives/Public/public-new-work/2019Mar/0004.html>
  - [wbs] response to 'Call for Review: Patents and Standards Interest Group Charter'
    - <https://lists.w3.org/Archives/Public/public-new-work/2019Mar/0003.html>
  - *Patents and Standards Interest Group (PSIG)*
    - <https://lists.w3.org/Archives/Public/public-new-work/2019Mar/0001.html>
  - *Web Applications Working Group*
    - <https://lists.w3.org/Archives/Public/public-new-work/2019Mar/0000.html>
  - *Scalable Vector Graphics (SVG) Working Group Revised Charter Approved; Call for Participation*
    - <https://lists.w3.org/Archives/Public/public-new-work/2019Mar/0008.html>
- Other
  - Upcoming: Second W3C Workshop on the Web of Things
    - <https://lists.w3.org/Archives/Public/public-new-work/2019Mar/0002.html>
  - W3C Workshop Report: Strong Authentication and Identity
    - <https://www.w3.org/blog/news/archives/7638>
  - *[ External ] Moving Delivered JavaScript Forward*
    - <https://docs.google.com/document/d/1kOLu53dYzwElJZ6JBgMR137-Rdj8cDc_rX2YkPFYUsY/edit>
    - Add first-class support for differential script loading · Issue #4432 · whatwg/html
    - <https://github.com/whatwg/html/issues/4432>
    - syntax 属性を追加して、 ECMA 2019 などのバージョンで読み込むスクリプトを変えられるようにする提案
    - babel などで変換する粒度を変えられる
  - *Upcoming: W3C Workshop on Web Games, 27-28 June*
    - <https://lists.w3.org/Archives/Public/public-new-work/2019Mar/0007.html>
    - <https://www.w3.org/blog/news/archives/7666>
    - <https://twitter.com/deltakosh/status/1107995743741083649>
    - MS の人主導っぽい
  - *Name suggestions · Issue #2 · mikewest/sec-metadata*
    - <https://github.com/mikewest/sec-metadata/issues/2>
    - `sec-metadata` は `sec-fetch-*` で land されたのでフィニッシュ
  - *Unpopular opinions: Standards edition (TC39, W3C, WHATWG, IETF, ISO, whatever) What do you \*really\* think?  by littledan*
    - <https://twitter.com/littledan/status/1109521891864338438>
    - 「標準化ってぶっちゃけどう思う?」
  - W3C doesn't help its invited experts. It should. - Tobie Langel - Medium
    - <https://medium.com/@tobie/w3c-doesnt-help-its-invited-experts-it-should-2fb36ae9f720>


### TC39 動向

- Proposals Diff
  - <https://github.com/tc39/proposals/compare/master@{2019-03-01}...master@{2019-04-01}>
  - 0->1
    - Promise.any
  - 1->2
    - String.replaceAll
  - 2->3
    - Promise.allSettled
    - Static class fields and private static methods
  - 3->4
- New Proposals
  - isTemplateObject
    - <https://github.com/mikesamuel/proposal-array-is-template-object>
    - 来月扱う
- Other
  - *A Homepage for the JavaScript Specification*
    - <https://hacks.mozilla.org/2019/03/a-homepage-for-the-javascript-specification/>
    - <https://tc39.github.io/>
    - JS のスペックや Proposal を追うためのハブサイト
    - spec/test/presentation などのリンクがまとまってる
    - 簡単な Example コードがあるものも


### IETF 動向

- IETF
- IETF 104 Prague 3/23 - 29
  - Agenda
    - <https://ietf.org/how/meetings/104/>
    - <https://datatracker.ietf.org/meeting/104/agenda/>
    - <https://datatracker.ietf.org/meeting/104/materials/agenda-104-doh-03>
    - <https://datatracker.ietf.org/meeting/104/materials/agenda-104-httpbis-01>
    - <https://datatracker.ietf.org/meeting/104/materials/agenda-104-quic-02>
    - <https://datatracker.ietf.org/meeting/104/materials/agenda-104-dispatch-02>
      - また webpackaging が dispatch に
  - Hackathon
    - <https://trac.ietf.org/trac/ietf/meeting/wiki/104hackathon>
    - <https://trac.ietf.org/trac/ietf/meeting/wiki/104hackathon/webrtc>
    - Browser and SFU simulcast status
    - <https://docs.google.com/spreadsheets/d/1F5iJ1Qs8AgVTlgdC1ZRhSVHRvTM46AW3r1_9oQhZiMc/edit#gid=0>
  - httpwg/wg-materials
    - <https://github.com/httpwg/wg-materials/blob/gh-pages/ietf104/agenda.md>
- RFC
  - *RFC 8555 - Automatic Certificate Management Environment (ACME)*
    - <https://tools.ietf.org/html/rfc8555>
    - <https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html>
- IETF Last Call
- WG Last Call
- Call for Adoption
- I-D Action
- Draft
  - Digital Product Life Cycle Model
    - <https://tools.ietf.org/html/draft-algermissen-digital-product-life-cycle-model-00>
  - Identifying HTTP Exchanges with URIs
    - <https://tools.ietf.org/html/draft-thomson-http-hx-uri-00>
  - Transport parameters for 0-RTT connections
    - <https://tools.ietf.org/html/draft-kuhn-quic-0rtt-bdp-00>
  - TLS Handshake in CBOR
    - <https://tools.ietf.org/html/draft-schaad-ace-tls-cbor-handshake-00>
  - HTTP Transport for the Open Trust Protocol (OTrP)
    - <https://tools.ietf.org/html/draft-thaler-teep-otrp-over-http-01>
  - the Use Cases for the Application of Multi-Service Tag
    - <https://tools.ietf.org/html/draft-zhang-icn-uscamulsertag-00>
  - Use of the Hash-based Signature Algorithm with CBOR Object Signing and Encryption (COSE)
    - <https://tools.ietf.org/html/draft-ietf-cose-hash-sig-01>
  - DNS Update Proxy for Service Discovery
    - <https://tools.ietf.org/html/draft-pusateri-dnssd-update-proxy-01>
  - Associating a DoH Server with a Resolver
    - <https://tools.ietf.org/html/draft-ietf-doh-resolver-associated-doh-01>
  - Use of TLS for Email Submission and Access
    - <https://tools.ietf.org/html/draft-ietf-uta-tls-for-email-01>
  - Anonymous Tickets for TLS 1.3
    - <https://tools.ietf.org/html/draft-sullivan-tls-anonymous-tickets-00>
  - Additional Algorithm Registrations for COSE and JOSE
    - <https://tools.ietf.org/html/draft-jones-cose-additional-algorithms-00>
  - Best practices for TLS Downgrade
    - <https://tools.ietf.org/html/draft-richsalz-httpbis-https-downgrade-00>
  - CBOR Object Signing and Encryption (COSE): Hash Algorithms
    - <https://tools.ietf.org/html/draft-ietf-cose-hash-algs-00>
  - Compatible Version Negotiation for QUIC
    - <https://tools.ietf.org/html/draft-schinazi-quic-version-negotiation-00>
  - Deprecation of IKEv1 and obsoleted algorithms
    - <https://tools.ietf.org/html/draft-pwouters-ikev1-ipsec-graveyard-00>
  - Connection Setup in a Quantum Network
    - <https://tools.ietf.org/html/draft-van-meter-qirg-quantum-connection-setup-00>
  - Exploring QUIC Connection Migration
    - <https://tools.ietf.org/html/draft-paulo-quic-migration-00>
  - Encoding DNS-over-TLS (DoT) Subject Public Key Info (SPKI) in Name Server name
    - <https://tools.ietf.org/html/draft-bretelle-dprive-dot-spki-in-ns-name-00>
  - Fast Congestion Response
    - <https://tools.ietf.org/html/draft-even-fast-congestion-response-00>
  - Private Discovery with TLS-ESNI
    - <https://tools.ietf.org/html/draft-huitema-dnssd-tls-privacy-00>
  - DNS over HTTPS (DoH) Considerations for Operator Networks
    - <https://tools.ietf.org/html/draft-reid-doh-operator-00>
  - Architectural Principles for a Quantum Internet
    - <https://tools.ietf.org/html/draft-irtf-qirg-principles-00>
  - Support for Path MTU (PMTU) in the Path Computation Element Communication Protocol (PCEP).
    - <https://tools.ietf.org/html/draft-li-pce-pcep-pmtu-00>
  - JSON Web Token (JWT) Profile for OAuth 2.0 Access Tokens
    - <https://tools.ietf.org/html/draft-bertocci-oauth-access-token-jwt-00>
  - An HTTP/2 extension for bidirectional messaging communication
    - <https://tools.ietf.org/html/draft-xie-bidirectional-messaging-00>
  - The Entity Attestation Token (EAT)
    - <https://tools.ietf.org/html/draft-mandyam-rats-eat-00>
  - Alternative DNS Certification Authority Authorization (CAA) Resource Record
    - <https://tools.ietf.org/html/draft-wicinski-lamps-caa-00>
  - Private DNS Subdomains
    - <https://tools.ietf.org/html/draft-pusateri-dnsop-private-subdomains-01>
  - Best practices for TLS Downgrade
    - <https://tools.ietf.org/html/draft-richsalz-httpbis-https-downgrade-00>
  - A Flags Extension for TLS 1.3
    - <https://tools.ietf.org/html/draft-nir-tls-tlsflags-00>
  - Concise Binary Object Representation (CBOR) Tag for Coordinate Reference System (CRS) Specification
    - <https://tools.ietf.org/html/draft-clarke-cbor-crs-00>
  - CMS Content Types for CBOR
    - <https://tools.ietf.org/html/draft-schaad-cbor-content-00>
  - Interactive Connectivity Establishment Patiently Awaiting Connectivity (ICE PAC)
    - <https://tools.ietf.org/html/draft-ietf-ice-pac-00>
- Other


### セキュリティ動向

- Monsters in the Middleboxes: Introducing Two New Tools for Detecting HTTPS Interception
  - <https://blog.cloudflare.com/monsters-in-the-middleboxes/>
  - MITMEngine
  - MALCOLM
- *Coinhive*
  - <https://twitter.com/moro_is/status/1110748839831470081>
  - 無罪判決
  - Coinhive 自体も 3 月で終了
  - <https://coinhive.com/blog/en/discontinuation-of-coinhive>
  - Firefox はブラックリストに追加
  - <https://github.com/mozilla-services/shavar-prod-lists/blob/7eaadac98bc9dcc95ce917eff7bbb21cb71484ec/disconnect-blacklist.json>
- #alertloop
  - <https://www.hacker.or.jp/>
  - 一般社団法人日本ハッカー協会で寄付を募り 6,934,471 円の寄付を集めた
  - 法的支援や転職支援を行う協会の会員有志が始めた


### 周辺動向

- *OpenJS Foundation*
  - <https://openjsf.org/>
- NGINX to Join F5: Proud to Finish One Chapter and Excited to Start the Next - NGINX
  - <https://www.nginx.com/blog/nginx-joins-f5/>
  - <https://www.publickey1.jp/blog/19/nginxf5f5nginx.html>
- Preventing Request Loops Using CDN-Loop
  - <https://blog.cloudflare.com/preventing-request-loops-using-cdn-loop/>
- *Why Fastly loves QUIC and HTTP/3*
  - <https://www.fastly.com/blog/why-fastly-loves-quic-http3>
- Google to offer Android users browser choice - QuirksBlog
  - <https://www.quirksmode.org/blog/archives/2019/03/google_to_offer.html>


### イベント

- 3 月
  - 23-29: IETF 104 Prague
    - <https://ietf.org/blog/cisco-co-host-ietf104/>
- 4 月
  - 9-10: BlinkOn 10 Canada
    - <https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/5K4WbTlD9rI>
    - 3min LT 大会が復活したらしい
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
