# [monthly-web][yearly-web][mozaic.fm] ep32 Yearly Web 2017

## Info

audio: https://files.mozaic.fm/mozaic-ep32.mp3

published_at
: 2017-12-19

guest
: [@myakura](https://twitter.com/myakura)


## Theme

第 32 回のテーマは 2017 年の Yearly Web です。

2017/12 の Monthly Web に加えて、今年の Web を振り返ります。

Monthly Web のモチベーションについては以下。

[ep25 Monthly Web 201707](https://mozaic.fm/episodes/25/monthly-web-201707.html)


## Show Note


### Chrome 動向

- Chrome 63 リリース
  - <https://developers.google.com/web/updates/2017/12/nic63>
  - import()
  - Promise.finally()
  - async iterators (for-await-of)
  - overscroll-behavior プロパティ(pull-to-reflesh やスクロール超過の効果を消せる)
  - Android では Push 含めすべての許可ダイアログがモーダルに
- Intent
  - Ship: saveData attribute in Network Information API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/AgonJunvfIE/O7Gb0fzXAgAJ>
  - Ship: image decoding attribute
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/MbXp16hQclY/bQjegyrbAgAJ>
  - Ship: Draft TLS 1.3 1-RTT field trial, take two
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/ySf8YHR6MpA/nxOmaP4oAwAJ>
  - Ship: Feature Policy for Autoplay
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/sufZCxRTvXk/HvSyv8yOAgAJ>
  - Ship: Set document.URL (location) to url of active document when navigation started for javascript:-generated documents
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/3w3ACwjR9NY/hpk5RK9jCQAJ>
  - Ship :any-link
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/RNHfILQBYic/qWM2IsY_CAAJ>
      - :link と:visited のどちらにもマッチする擬似クラス
  - Implement: saveData attribute in Network Information API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/IrIwAdMWhAE/B0A23MQhBQAJ>
  - Implement and Ship: CSS Color 4 Syntax
    - RGB{A} <https://groups.google.com/a/chromium.org/d/topic/blink-dev/rbkgdTPBCbM/discussion>
    - HSL{A} <https://groups.google.com/a/chromium.org/d/topic/blink-dev/3TNvxPAork0/discussion>
    - rgb(), hsl() が拡張されて、アルファ指定を含めたり、小数が使えるように
      - <https://html5experts.jp/myakura/22818/#color4-notation>
      - Firefox で実装済
  - Experiment: Disable Hardware Noise Suppression
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/8QacQMv6oAY/v3wxZi1WAQAJ>
  - Experiment: Disable Hardware Noise Suppression
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/8QacQMv6oAY/QSA_cD4fAwAJ>
  - Deprecate and Remove: SharedArrayBuffer.isView
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/RgnCOL61Mzg/NiueyofYCQAJ>
  - Deprecate and Remove: Remove Content Type Sniffing for Worker Scripts
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/35t5cJQ3J_Q/FH45dl0vAwAJ>
- Loading Team weekly snippet
  - Nov 20 - Dec 1:
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/8NwtELZSLOw/tsu-kdEFAwAJ>
    - WebPackage (kinuko, kouhei, horo) / Prototyped the loading code.
  - Dec 4 - Dec 8:
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/A3KAs19DlGA/4cw3RQqLAgAJ>
- v8
  - An Introduction to Speculative Optimization in V8
    - <https://ponyfoo.com/articles/an-introduction-to-speculative-optimization-in-v8>
- The Device Memory API
  - <https://developers.google.com/web/updates/2017/12/device-memory>
    - 使われてる Accept-CH ヘッダについては TAG からいろいろおかしくないとツッコミが
      - <https://github.com/w3ctag/design-reviews/issues/206>
- Audio/Video Updates in Chrome 63/64
  - <https://developers.google.com/web/updates/2017/12/chrome-63-64-media-updates>
- Strict-Transport-Security for *.dev, *.app and more \| text/plain
  - <https://textslashplain.com/2017/12/05/strict-transport-security-for-dev/>
- Polymer 2 and Googlebot
  - <https://medium.com/dev-channel/polymer-2-and-googlebot-2ad50c5727dd>
  - Polymer を Google Bot Friendly にするための Tips
- V8 JavaScript Engine: JavaScript code coverage
  - <https://v8project.blogspot.jp/2017/12/javascript-code-coverage.html>
  - V8 のカバレッジ取得サポートの話。
  - devtools だと結構前から coverage タブで見ることができる
- Chrome Web Store から Chrome Apps のセクションが削除
  - <https://arstechnica.com/gadgets/2017/12/google-shuts-down-the-apps-section-of-the-chrome-web-store/>
  - 2016 年の発表では 2018 年初頭に起動不可能になるとあったが、延長された
    - <https://blog.chromium.org/2016/08/from-chrome-apps-to-web.html>
    - 2017 年 12 月 5 日付けで追記があった
    - EOL については改めて発表するとのこと


### Firefox 動向

- These Weeks in Firefox: Issue 29 - Firefox Nightly News
  - <https://blog.nightly.mozilla.org/2017/12/05/these-weeks-in-firefox-issue-29/>
- Intents
  - Ship: Web Authentication
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/tsevyqfBHLE/lccldWNNBwAJ>
  - Unship: SMIL accessKey support
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/skw-Yj_Pdjk/PEdvjsUhBwAJ>
  - Remove pcast and feed protocols
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/abHJ-jaQ5YY/kOTDKTVmCQAJ>
- Site Compat
  - HTTP auth dialog can no longer be triggered by cross-origin images
    - <https://www.fxsitecompat.com/en-CA/docs/2017/http-auth-dialog-can-no-longer-be-triggered-by-cross-origin-images/>
  - WebVR can no longer be used on insecure sites
    - <https://www.fxsitecompat.com/en-CA/docs/2017/webvr-can-no-longer-be-used-on-insecure-sites/>
  - SMIL accessKey support has been removed
    - <https://www.fxsitecompat.com/en-CA/docs/2017/smil-accesskey-support-has-been-removed/>
- Some SpiderMonkey optimizations in Firefox Quantum
  - <https://jandemooij.nl/blog/2017/12/06/some-spidermonkey-optimizations-in-firefox-quantum/>
  - 57 までの様々な JavaScript の最適化
- Off-Main-Thread Painting
  - <https://mozillagfx.wordpress.com/2017/12/05/off-main-thread-painting/>
  - Firefox 58 からラスタライズをメインスレッドから独自のペイントスレッドに移動した
  - macOS では Firefox 59 からの模様
    - <https://groups.google.com/forum/#!topic/mozilla.dev.platform/KrPb69AVuQ4>
- Mozilla is Funding Art About Online Privacy and Security
  - <https://blog.mozilla.org/blog/2017/12/07/mozilla-is-funding-art-about-online-privacy-and-security/>
- JavaScript Startup Bytecode Cache
  - <https://blog.mozilla.org/javascript/2017/12/12/javascript-startup-bytecode-cache/>
  - Firefox の JavaScript Startup Bytecode Cache の説明
- Using Headless Mode in Firefox - Mozilla Hacks
  - <https://hacks.mozilla.org/2017/12/using-headless-mode-in-firefox/>


### Safari 動向

- Release Notes for Safari Technology Preview 45
  - <https://webkit.org/blog/8039/release-notes-for-safari-technology-preview-45/>
- WebKit が Web App Manifest の実装を開始
  - <https://trac.webkit.org/changeset/225507/webkit>


### Edge 動向

- Breaking on DOM Mutations in the Microsoft Edge DevTools
  - <https://blogs.windows.com/msedgedev/2017/12/04/dom-mutation-breakpoints-edge-devtools/>
  - Devtools での DOM Break point の話
- Introducing the Web Media Extension Package with OGG Vorbis and Theora support for Microsoft Edge
  - <https://blogs.windows.com/msedgedev/2017/12/05/introducing-web-media-extension-package-ogg-vorbis-theora-support/>
  - Media Extension Package でコーデックを追加
- ChakraCore で ICU を使うようになる
  - <https://twitter.com/bterlson/status/938172691969740800>
  - Intl. API の互換性が上がる(他のエンジンも ICU 使ってるから)
  - 独立した実装がなくなるよねという懸念も
    - <https://twitter.com/hsivonen/status/938732131592925185>
- Building a great touchpad experience for the web with Pointer Events
  - <https://blogs.windows.com/msedgedev/2017/12/07/better-precision-touchpad-experience-ptp-pointer-events/>
- 12 月の Internet Explorer / Microsoft Edge の累積的なセキュリティ更新プログラムを公開しました
  - <https://blogs.technet.microsoft.com/jpieblog/2017/12/13/securityupdate201712/>


### WHATWG/W3C 動向

- Further working mode changes
  - <https://blog.whatwg.org/working-mode-changes>
  - W3C と同様のロイヤリティフリーな IPR Policy
  - Steering Group の設置
  - Contributor and Workstream Participant Agreement を要求
  - [blog](https://blog.jxck.io/entries/2017-12-12/whatwg-working-mode-changes.html)
  - FYI: domenic による html dups の解説 <https://bit.ly/2z4LSyc>
- A 'navigation-to' CSP directive
  - <https://lists.w3.org/Archives/Public/public-webappsec/2017Dec/0000.html>
  - <https://docs.google.com/document/d/1eMfw7sSIPtPPs9T3K2C8SfDi3Q7OXRTrRDdkGOLb19M/edit>
  - naviagtion する先の url を csp で制限
- W3C Technical Architecture Group Election
  - <https://www.w3.org/2001/tag/>
  - <https://www.w3.org/blog/news/archives/6663>
  - <https://www.w3.org/2017/12/01-tag-nominations>
  - TAG の election
- Publish FPWD of HTML5.3
  - <https://lists.w3.org/Archives/Public/public-html/2017Dec/0000.html>
  - HTML 5.3 の First Public Working Draft
- W3C releases video introducing Web Accessibility and W3C Standards
  - <https://www.w3.org/blog/news/archives/6677>
  - W3C による A11y の紹介ビデオ
- Improving Web Advertising: W3C Business Group Launched
  - <https://www.w3.org/blog/2017/11/improving-web-advertising-w3c-business-group-launched/>
  - <https://www.w3.org/community/web-adv/>
- Call for Review: ActivityPub is a W3C Proposed Recommendation
  - <https://www.w3.org/blog/news/archives/6688>
- W3C Invites Implementations of CSS Color Module Level 3
  - <https://www.w3.org/blog/news/archives/6691>
  - <https://www.w3.org/TR/2017/CR-css-color-3-20171205/>
  - すでに勧告された Color L3 に errata があったので、それを反映
- [CSSWG] Minutes San Fransisco F2F 2017-11-06
  - Part I: [css-sizing]: <https://lists.w3.org/Archives/Public/www-style/2017Dec/0004.html>
  - Part II:[css-backgrounds] [css-grid]: <https://lists.w3.org/Archives/Public/www-style/2017Dec/0005.html>
  - Part III: [css-flexbox] [css-overflow]: <https://lists.w3.org/Archives/Public/www-style/2017Dec/0006.html>
  - Part IV: [css-values] [css-contain] [css-inline] [css21]
  - <https://lists.w3.org/Archives/Public/www-style/2017Dec/0007.htm>
- [CSSWG] Minutes Telecon 2017-12-06
  - [css-sizing-3][css-scroll-snap][css-values][css-counter-styles][css-grid][selectors]:
  - <https://lists.w3.org/Archives/Public/www-style/2017Dec/0011.html>
- [CSSWG] Minutes Telecon 2017-12-13
  - [css-values] [selectors-4] [css-flexbox] [css-grid] [css-sizing]
  - <https://lists.w3.org/Archives/Public/www-style/2017Dec/0018.html>
- WebRTC: Doodle for a January VI
  - <https://lists.w3.org/Archives/Public/public-webrtc/2017Dec/0008.html>
  - Virtual Interim やるらしい
- Video: Web Accessibility Standards and Benefits
  - <https://www.w3.org/blog/2017/12/web-accessibility-standards-and-benefits/>
  - 12/3 "International Day of Persons with Disabilities" (国際障害者デー) に公開された W3C の WCAG 啓蒙ビデオ
- First Public Working Draft: Cognitive Accessibility Roadmap and Gap Analysis
  - <https://www.w3.org/blog/news/archives/6700>
- CSS Writing Modes の Level 3 CR と Level 4 FPWD が公開
  - <https://www.w3.org/TR/2017/CR-css-writing-modes-3-20171207/>
  - <https://www.w3.org/TR/2017/WD-css-writing-modes-4-20171207/>
  - 前回の Level 3 CR にあった機能のうち、実装の乏しかったものを Level 4 に先送りした
- Web Content Accessibility Guidelines (WCAG) 2.1 final Working Draft
  - <https://www.w3.org/blog/news/archives/6715>
- First Public Working Draft: Payment Method Manifest
  - <https://www.w3.org/blog/news/archives/6718>
  - <https://www.w3.org/TR/2017/WD-payment-method-manifest-20171212/>
- Thanks Steve for everything …
  - <https://lists.w3.org/Archives/Public/public-html/2017Dec/0006.html>
    - The Paciello Group の Steve Faulkner が W3C HTML5 の Editor を降りる
      - ARIA まわりの仕様は続けそう
      - <https://twitter.com/stevefaulkner/status/940835584410574850>
- Improving ergonomics of events with Observable · Issue #544 · whatwg/dom
  - <https://github.com/whatwg/dom/issues/544>
  - DOM で Observable やれないかとの提案
    - TC-39 でやんないの?という疑問にはいくつか背景が
      - <https://github.com/whatwg/dom/issues/544#issuecomment-351520728>
      - <https://github.com/whatwg/dom/issues/544#issuecomment-351607779>
- HTML 5.2 Recommendation
  - <https://www.w3.org/TR/2017/REC-html52-20171214/>
  - <https://www.w3.org/blog/2017/12/html-5-2-is-done-html-5-3-is-coming/>


### TC39 動向

- ECMAScript proposal updates @ 2017-011
  - <https://ecmascript-daily.github.io/ecmascript/2017/12/05/ecmascript-proposal-updates>
  - 11 月の TC39 の Stage Update
- Proposal to explore Statements as Expressions
  - <https://github.com/rbuckton/proposal-statements-as-expressions>
  - throw, return, break, continue, debugger を statement に


### IETF 動向

- Principles for Multiplexing of UDP-based Protocols
  - <https://tools.ietf.org/html/draft-thomson-mux-principles-00>
- More Apparent Randomization for QUIC
  - <https://tools.ietf.org/html/draft-thomson-quic-grease-00>
- Taking a Long Look at QUIC
  - <https://conferences.sigcomm.org/imc/2017/papers/imc17-final39.pdf>
- On the use of HTTP as a Substrate
  - <https://tools.ietf.org/html/draft-ietf-httpbis-bcp56bis-00>


### 周辺動向

- How to Fix the Refresh Button When Using Service Workers
  - <https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68>
- A Pinterest Progressive Web App Performance Case Study
  - <https://medium.com/dev-channel/a-pinterest-progressive-web-app-performance-case-study-3bd6ed2e6154>
- @rauschma Goes back to JS1.1/ES1. Based on idea that a prototype is in fact the prototypal instance of a class of object (see self language)...
  - <https://twitter.com/awbjs/status/936993492206628865>
- Font-display playground
  - <https://font-display.glitch.me/>
  - font-display のわかりやすい図と解説とデモ
- Chromium Browser Advent Calendar 2017
  - <https://qiita.com/advent-calendar/2017/chromium>
- Performance Calendar 2017
  -  <https://calendar.perfplanet.com/2017/>
  - パフォーマンスアドベントカレンダー
- 24 A11y
  - <https://www.24a11y.com/>
  - アクセシビリティのアドベントカレンダー
- [openssl-announce] OpenSSL Security Advisory
  - <https://mta.openssl.org/pipermail/openssl-announce/2017-December/000110.html>
  - 関連する Node のセキュリティアップデート
    - <https://nodejs.org/en/blog/vulnerability/december-2017-security-releases/>
- A Tale of JavaScript Performance (frontconf Dec '17)
  - <https://docs.google.com/presentation/d/1NszKfRhMhtAyFifCdG4XQtqj_MED-pEKtyJcgWK0geQ>
- Internet protocols are changing \| APNIC Blog
  - <https://blog.apnic.net/2017/12/12/internet-protocols-changing/>
  - mnot による HTTP2/QUIC/TLS1.3/DOH の概説
- 平文 HTTP にコードが挿入される話
  - Are you aware? Comcast is injecting 400+ lines of JavaScript into web pages.
    - <https://forums.xfinity.com/t5/Customer-Service/Are-you-aware-Comcast-is-injecting-400-lines-of-JavaScript-into/td-p/3009551>
  - Coin Hive 埋め込み
    - <https://twitter.com/imnoah/status/936948776119537665>
- The ROBOT Attack - Return of Bleichenbacher's Oracle Threat
  -  <https://robotattack.org/>
- Pioneers for Net Neutrality
  - <https://pioneersfornetneutrality.tumblr.com/>
  - Final Vote が近いので、署名を集めている
  - そうそうたるメンバーの署名が集まっている
- Twitter uses AMP to improve reading experience, enables publishers to understand their audience
  - <https://amphtml.wordpress.com/2017/12/13/twitter-uses-amp-to-improve-reading-experience-enables-publishers-to-understand-their-audience/>
  - 記事を tweet した時に AMP 対応があればキャッシュを取りに行く
  - Twitter はかなり AMP を気に入っている模様


### イベント

- 2018
  - WebPlatform Web Components F2F 2018
    - <https://github.com/w3c/webcomponents/issues/713>


### 2017 振り返り

- wasm/css grid supported in Major Browser
- sw, payment, webrtc in Safari
- remove foreign fetch
- ITP (Intelligent Tracking Prevention)
- 3rd Party Cookie
- CoinHive
- Quantum Release
- WebDINO
- Houdini
- Worklet
- Observer
- ES Modules
- Performance APIs/Tooling
- TTI (time to interact)
- webp
- brotli
- CDN
- Fastly
- Payment
- WebComponents
- HTML Modules
- template instantiation
- HTML5.2
- TC39
- DOM/ECMAScript
- HTTPS
- Symantec Cert
- CT (Certificate Transparency)
- Feature Policy
- CSPv3
- HPKP to Expect-CT
- WCAG2.1
