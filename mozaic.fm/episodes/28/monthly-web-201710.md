---
type: podcast
tags: ["monthly web"]
audio: https://files.mozaic.fm/mozaic-ep28.mp3
published_at: 2017-11-01
guest: [@myakura](https://twitter.com/myakura)
---

# ep28 Monthly Web 201710

## Theme

第 28 回のテーマは 2017 年 10 月の Monthly Web です。

Monthly Web のモチベーションについては以下。

[ep25 Monthly Web 201707](https://mozaic.fm/episodes/25/monthly-web-201707.html)

## Show Note

### Chrome 動向

- Chrome 62 Stable
  - New in Chrome 62
    - https://developers.google.com/web/updates/2017/10/nic62
    - Network Information API Improve
      - navigator.connection.type/effectiveType
    - OpenType variable fonts
    - capture media streams from HTML Media elements
      - Web Audio API でエフェクトとかかけた結果を WebRTC とかできる
    - Payment Request API is now available on Chrome for iOS
    - WebVR origin trial
- Chrome 63 Beta
  - Changes
    - https://blog.chromium.org/2017/10/chrome-63-beta-dynamic-module-imports_27.html
    - Chromium Blog: Chrome 63 Beta:
    - Dynamic module imports
    - async iterators/generators
    - Device Memory API
    - (Android) 許可の UI が変更
      - 下からにゅっと出すパネルだと、90% が dismiss することがわかった
      - 63 からダイアログをモーダルにすることにした
      - https://twitter.com/grigs/status/922524110961307649
    - font-variant-east-asian
    - Generic Sensor API の Origin Trial
  - What's New In DevTools (Chrome 63)
    - https://developers.google.com/web/updates/2017/10/devtools-release-notes
    - Workspaces 2.0
    - Push/Background custom simulation
    - (こぼれ話)公開されたが、動画にネオナチな主張によく使われるミームが使われてていったん取り下げになったりした
  - Deprecations and removals in Chrome 63
    - https://developers.google.com/web/updates/2017/10/chrome-63-deprecations
  - Removing ::shadow and /deep/ in Chrome 63
    - 下の Developer Updates で
- Chrome 64 Dev
- Chrome 64 Canary
- V8 (http://bit.ly/v8apichanges)
  - V8 Release 6.3 (chrome 63)
    - https://v8project.blogspot.jp/2017/10/v8-release-63.html
    - Optimize
    - Dynamic module import via `import()`
    - Promise.prototype.finally
    - async iterators/generators.
  - Optimizing ES2015 proxies
    - https://v8project.blogspot.jp/2017/10/optimizing-proxies.html
  - An Internship on Laziness: Lazy Unlinking of Deoptimized Functions
    - https://v8project.blogspot.jp/2017/10/lazy-unlinking.html
- developer updates
  - Animating a Blur
    - https://developers.google.com/web/updates/2017/10/animated-blur
    - ぼかし効果の最適化方法の話
  - The Intl.PluralRules API
    - https://developers.google.com/web/updates/2017/10/intl-pluralrules
    - 複数形単位の翻訳の話
  - Exceeding the buffering quota
    - https://developers.google.com/web/updates/2017/10/quotaexceedederror
    - appendBuffer しすぎるとあふれるが、いつ溢れるかは実装依存
    - 細かいチャンクにバラしてから追加などのワークアラウンド
    - 実装上の注意について
  - Promise.prototype.finally
    - https://developers.google.com/web/updates/2017/10/promise-finally
    - 最後に finally できる話
  - Removing ::shadow and /deep/ in Chrome 63
    - https://developers.google.com/web/updates/2017/10/remove-shadow-piercing
    - ShadowDOM v0 の ::shadow と /deep/ が削除
    - open/close をちゃんと使おう
  - Using Trusted Web Activity
    - https://developers.google.com/web/updates/2017/10/using-twa
    - Digital Asset Links でリンクされてれば URL bar が表示されなくなる
    - 別ページに行ったら普通の Custom Tab
- Intents (https://bit.ly/blinkintents)
  - Ship: RegExp named captures
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/kZFj6oseQck/g4KwgCaUBAAJ
  - Ship: CSS transform-box
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/4ZWHz8tCONI/XBTvQtw2BAAJ
  - Ship: delegateStickyUserActivation
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/F4h7sdBdiBM/oVnhPTV5BAAJ
  - Implement and Ship: 'unsafe-hashed-attributes' in CSP3
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/bUAhkdsrmqE/nimnFDG3BAAJ
    - unsafe-inline できない場合、埋め込んだコードのハッシュでセーフリストする用
  - Implement and Ship: Adding new MHTML headers to support sharing of MHTML pages
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/GkAQbgmElK8/zx8KPu8WCgAJ
    - https://docs.google.com/document/d/1FvmYUC0S0BkdkR7wZsg0hLdKc_qjGnGahBwwa0CdnHE/edit
  - Implement and Ship: Fractional coordinates in PointerEvents of type mouse
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/ssfd-_V26Ls/YwcZTqyqBgAJ
    - マウスポインタのイベントを小数に?
  - Implement and Ship: WebAudio: AudioParam Setter is setValueAtTime
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/y4s3-aXbMOw/9s34pPQVBgAJ
  - Implement and Ship: Parse floats/decimals in CSS RGB and RGBA functions
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/zH51Atd-Vag/BMY1tOGaBAAJ
    - `rgb()` 内の数値はこれまで整数だったんだけど小数もとれるように
  - Implement and Ship: import.meta.url
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/Hq3cVNto74c/x7tNhmZUBQAJ
    - ちゃんと入ってた
  - Implement and Ship: HTTP/2 push header validation
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/5_aP_stqndw/jlvJjoOEBQAJ
    - Push 時に Vary や Range をちゃんとみるように
  - Implement: image async attribute
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/9i6wgXv7c7c/0kiqdQkhBQAJ
  - Implement: saveData attribute in Network Information API
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/IrIwAdMWhAE/B0A23MQhBQAJ
  - Implement: Simple User Activation
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/bJ2icZEANV4/5VlT_RKrBgAJ
    - https://docs.google.com/document/d/1erpl1yqJlc1pH0QvVVmi1s3WzqQLsEXTLLh6VuYp228/edit
  - Implement: Web Lifecycle - to enable system initiated Discarding & Stopping
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/1WFVPbRL640/TPPG9gs5AwAJ
  - Implement and Experiment: Single buffered canvas
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/DCPyE6rPFpA/sqZwKAWXBAAJ
  - Implement: Fetch API: keepalive
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/AUAIHVF63SM/naGVAnoBAwAJ
    - https://docs.google.com/document/d/1iHJtFa3jOo5n9QXHb6Ok5nK8kavXSk2DrLoubPWi9ys/edit
    - Beacon API は POST のみだが、GET (analytics) や HEAD (ads) のニーズが
    - Beacon は拡張し辛いので、`fetch()` でやろう。しかし keep-alive が無いので入れよう
    - Blink の Beacon 実装が fetch の層を通らずダイレクトにネットワークしてるので直す
  - Ship: text-decoration-skip-ink: auto;
  - Deprecate and Remove: text-decoration-skip:
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/47BHtmz0jVY/itAC_xpwBgAJ
    - text-decoration-skip: ink を廃止して、text-decoration-skip-ink が新設される
  - Deprecate and Remove: legacy touch event APIs on desktop devices
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/KV6kqDJpYiE/YFM28ZNBBAAJ
  - Remove: ImageCapture.setOptions()
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/tPbZ0eaO-yw/JM04acXKAgAJ
  - Remove: window.event for Shadow DOM
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/a9SmvyKUX4w/Yi1a8GlXBQAJ
  - FYI: Small changes to localStorage/sessionStorage methods in M63
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/uptbsZKhUxg/xTZalM25BAAJ
    - 仕様と違ってた部分を改善
    - メソッドを全部 NotEnumerable に
    - getter/setter などもあったが、無い場合 undefined を返すなど、メソッドと挙動が違ったので、null を返す getItem() などのメソッドに統一
  - Ship: CSS Paint API
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/Jex3idOld48/8C2mDsSjBQAJ
    - Worklet がらみで議論が足りてなかったので止まってたが、月末に動きが
    - Secure Contexts に限定するように変更して、ship する予定
    - https://bugs.chromium.org/p/chromium/issues/detail?id=779938
    - [手書きみたいな線を引くデモ](http://lab.iamvdo.me/houdini/rough-boxes)
    - [blog](https://blog.jxck.io/entries/2017-10-31/houdini-paint-api.html)
- Other
  - blink-dev で arch team のスライドまとめ
    - https://docs.google.com/document/d/1ds9EEkcDGnt-iR8SAN-_7nsOfw7gsMfhZjzZ_QAIyjM/edit
  - Loading Tokyo Team weekly snippet (Sep 30 - Oct 6)
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/xEC0qbm9_0Q/T57qMRUZAgAJ
    - 東京チームの進捗
    - ES Module Performance (次述)
  - Module loading performance
    - https://docs.google.com/document/d/1ds9EEkcDGnt-iR8SAN-_7nsOfw7gsMfhZjzZ_QAIyjM/edit
    - 100 以上もしくは依存のネストが 5 以上の場合は Bundle を強く推奨
    - NW コストだけではなく、Renderer Process と IO を行う Browser Process との IPC も結構ある。
  - Jumbo: Fully supported in Blink + Some requests
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/F4JYqAY1dgM/b-hopZvmBgAJ
    - Jumbo = unity build implementation in Chromium
  - DOM & HTML team: Quarterly Report [2017/Q3-]
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/wrLgwlkKaR8/tgWoLv8EAwAJ
  - Worker status: presentations at BlinkOn8, perf benchmarks for PWA
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/d2TohcNYY2M/nNY23FbyAwAJ
  - Loading Team weekly snippet
    - Oct 9 - Oct 13:
      - https://groups.google.com/a/chromium.org/d/msg/blink-dev/dMBXu1F1vwU/bGh6zqn5AwAJ
    - Oct 16 - Oct 20:
      - https://groups.google.com/a/chromium.org/d/msg/blink-dev/fsUz-I3hc1g/bMAmAbEhBgAJ
    - Oct 23 - Oct 27:
      - https://groups.google.com/a/chromium.org/d/msg/blink-dev/pEIIfzW-y1k/cyHS0SpoBQAJ
  - Layout Team Weekly Snippets
    - October 2, 2017
      - https://groups.google.com/a/chromium.org/d/msg/layout-dev/lBzoGbRJWFQ/JhcmNYWGCAAJ
    - October 9, 2017
      - https://groups.google.com/a/chromium.org/d/msg/layout-dev/d85DZbyeelo/rpAYSCrPBgAJ
    - October 16, 2017
      - https://groups.google.com/a/chromium.org/d/msg/layout-dev/3dR4cA_xUbw/u-gd4BWAAwAJ
    - October 30, 2017
      - https://groups.google.com/a/chromium.org/d/msg/layout-dev/Nw05Wt_5TgI/A26jABl_BgAJ
  - How payment methods work in the Payment Request API
    - https://medium.com/dev-channel/how-payment-methods-work-in-the-payment-request-api-54b8f2ee03c5
  - AMP: Two years of user-first webpages
    - https://amphtml.wordpress.com/2017/10/19/amp-two-years-of-user-first-webpages/
    - 2500 万ドメイン 40 億ページで、Google からの読み込み中央値 0.5s
    - アクセス 10% 増、滞在時間 2 倍、コンバージョン 20% 増 etc
  - Promise.prototype.finally
    - https://developers.google.com/web/updates/2017/10/promise-finally
  - Introducing the Chrome User Experience Report
    - https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html
    - 有効にしたユーザから収集している Chrome のレポートが公開された
    - BigQuery で色々見られるように
  - Will Blink Introduce DOMJIT Technique?
    - https://groups.google.com/a/chromium.org/d/msg/blink-dev/_S9TWojVP90/BJolSK6yBAAJ
    - 一度やったが良い結果が出ず ship しなかった
    - ので答えは NO
  - "We've heard that some people want guaranteed access to URL when in PWAs. This is now in canary and we want feedback!
    - https://twitter.com/owencm/status/913059860215762944
    - PWA だと URL バーなかったりするのが問題だよねという声に答えようとしているよという話

### Firefox 動向

- Firefox 56 Stable
  - Last Stop before Quantum
    - https://hacks.mozilla.org/2017/10/firefox-56-last-stop-before-quantum/
- Firefox 57 Beta
- Firefox 58 Nightly
- These Weeks in Firefox: Issue 25
  - https://blog.nightly.mozilla.org/2017/10/11/these-weeks-in-firefox-issue-25/
- Intents
  - Unship: rel=preload for firefox 57 (CSS loaded with are not applied)
    - https://groups.google.com/d/msg/mozilla.dev.platform/aNUUx0S6PxE/3E3TkBXtAgAJ
    - https://www.fxsitecompat.com/en-CA/docs/2017/css-loaded-with-link-rel-preload-are-not-applied/
    - 56 で入ったが、preload された CSS がうまく当たらないバグが出た
    - cacheable なリソースにしか適用されていなかったので 57 で unship
    - non-cacheable なリソースにも適用できるように直して 58 で戻したい
  - Ship: PerformanceNavigationTiming
    - https://groups.google.com/d/msg/mozilla.dev.platform/1OZrP1hR_SE/d_2TOCIeAgAJ
  - Ship: Pointer Events (Desktop)
    - https://groups.google.com/d/msg/mozilla.dev.platform/RPELgLHAhjM/gmkupELMAgAJ
  - Implement and Ship: PerformanceResourceTiming.workerStart
    - https://groups.google.com/d/msg/mozilla.dev.platform/lw0ylqXLil0/PjYSsoHkAAAJ
  - Implement and Ship: CSP exemptions for content injected by privileged callers
    - https://groups.google.com/d/msg/mozilla.dev.platform/EVKMSAY__lA/8b1ctuJgBwAJ
  - Implement: CSS media queries, interaction media features
    - https://groups.google.com/d/msg/mozilla.dev.platform/WhXB19qGVkI/J5rGuFydCAAJ
    - any-hover/any-pointer
  - Implement: scroll-boundary-behavior
    - https://groups.google.com/d/msg/mozilla.dev.platform/3hujzpw-LDA/pKl0V27zAwAJ
- Other
  - Mozilla Awards Over Half a Million to Open Source Projects
    - https://blog.mozilla.org/blog/2017/10/03/mozilla-awards-half-million-open-source-projects/
    - $125,000: webpack の WebAssembly サポート
    - $100,000: RiseUp の email service のセキュア化
    - $50,000: Phaser (HTML5 games engine) version 3 開発
    - $70,000: mod_md (Apache の ACME モジュール) の開発
  - Treating data URLs as unique origins for Firefox 57
    - https://blog.mozilla.org/security/2017/10/04/treating-data-urls-unique-origins-firefox-57/
  - The whole web at maximum FPS: How WebRender gets rid of jank
    - https://hacks.mozilla.org/2017/10/the-whole-web-at-maximum-fps-how-webrender-gets-rid-of-jank/
    - Paint/Composite の詳細から WebRender でどう変わるのか
  - An Introduction to CSS Grid Layout
    - https://hacks.mozilla.org/2017/10/an-introduction-to-css-grid-layout-part-1/
    - https://hacks.mozilla.org/2017/10/an-introduction-to-css-grid-layout-part-2/
  - How we rebuilt the viewsourceconf.org website
    - https://hacks.mozilla.org/2017/10/how-we-rebuilt-the-viewsourceconf-org-website/
    - Static, Offline First, Mobile First, SVG, No Script, HTTPS, Do Not Track なサイト
  - Browser Architecture Newsletter 4
    - https://mozilla.github.io/firefox-browser-architecture/newsletter/2017/10/19/browser-architecture-newsletter-4.html
  - Bringing Mixed Reality to the Web
    - https://blog.mozilla.org/blog/2017/10/20/bringing-mixed-reality-web/
  - Add Progressive Web Apps to your Home screen in Firefox for Android
    - https://hacks.mozilla.org/2017/10/progressive-web-apps-firefox-android/
    - Android 版 Firefox 58 で Add to Home Screen などが機能するように
    - 59 では Background Sync のサポートも検討中
    - ほかにも Payment Request API や Web Share API も検討中
  - Saying Goodbye to Firebug
    - https://hacks.mozilla.org/2017/10/saying-goodbye-to-firebug/
    - 2006 年に始まった Firebug が役目を終える
    - OSS としては残る
  - WebRTC video may stop in low-bandwidth conditions
    - https://www.fxsitecompat.com/en-CA/docs/2017/webrtc-video-may-stop-in-low-bandwidth-conditions/
    - WebRTC で帯域がサチって一度止まった映像が復帰しない問題、56.0.2 では修正済み。
  - Object.prototype.watch has been removed
    - https://www.fxsitecompat.com/en-CA/docs/2017/object-prototype-watch-has-been-removed/
    - Use the standard Proxy or Reflect object instead
  - HTMLMediaElement.mozSrcObject has been removed
    - https://www.fxsitecompat.com/en-CA/docs/2017/htmlmediaelement-mozsrcobject-has-been-removed/
    - Use the standard srcObject property instead
  - These Weeks in Firefox: Issue 26
    - https://blog.nightly.mozilla.org/2017/10/26/these-weeks-in-firefox-issue-26/
  - Stylo is built as default even if Fennec/Android
    - https://groups.google.com/d/msg/mozilla.dev.platform/CogfmMY2bLA/ZJWkXGRBCAAJ
    - Android 版 Firefox でも Stylo をビルドするように(58)
    - 59 でデフォルト有効を目指しているよう

### Safari 動向

- Safari Technology Preview 41
  - https://webkit.org/blog/7989/release-notes-for-safari-technology-preview-41/
  - Added support for `min()` and `max()` in `calc()`
  - Added a small optimization for async generators
  - Added support for Elliptic Curve P-521
  - etc
- Safari Technology Preview 42
  - https://webkit.org/blog/8001/release-notes-for-safari-technology-preview-42/
  - Implemented `PaymentRequest.canMakePayment()`
  - Implemented `PaymentRequest.show()` and `PaymentRequest.hide()`
  - Remove `constant()` in favor of `env()`
    - WHATWG/W3C 動向参照
  - Added support for DOM aborting
    - AbortController/AbortSignal class はあるが fetch はキャンセルできない
  - Introduced import.meta
    - まだ中身は空
  - Added support for `<link rel=preconnect>`
  - Implemented font-display loading behaviors
- Other
  - WebKit Build Archives
    - https://webkit.org/blog/7978/introducing-webkit-build-archives/
    - WebKit Nightly とは別に最新版の成功ビルドが個別に落とせるようになった
    - 自動アップデートなどもないので、コントリビュータに便利
    - 新しい機能を試したいなら STP 使ってねとのこと
  - Web App Manifest Standard
    - https://lists.webkit.org/pipermail/webkit-dev/2017-October/029694.html
    - 実装開始らしい
  - Touch Bar の API
    - https://lists.webkit.org/pipermail/webkit-dev/2017-October/029693.html
    - HTML の `<menu>` と `<menuitem>` を再利用する方向で検討中

### Edge 動向

- EdgeHTML
  - 15: https://aka.ms/devguide_edgehtml_15
  - 16: https://aka.ms/devguide_edgehtml_16
- What's New in Microsoft Edge in the Windows 10 Fall Creators Update
  - https://blogs.windows.com/msedgedev/2017/10/17/edgehtml-16-fall-creators-update/
  - New CSS features: Grid Layout, object-fit, and object-position
  - Improvements to the Microsoft Edge DevTools
  - Payment Request API
  - Service Worker preview
  - Motion Controllers in WebVR
  - and more...
- ChakraCore
  - https://github.com/Microsoft/ChakraCore/wiki/Roadmap
- Other
  - Bringing WebVR to everyone with the Windows 10 Fall Creators Update
    - https://blogs.windows.com/msedgedev/2017/10/10/bringing-webvr-everyone-windows-10-fall-creators-update/
  - sonar: Linting the web forward
    - https://blogs.windows.com/msedgedev/2017/10/25/introducing-sonar-site-scanner/
    - HTML, HTTP, HTTPS などあらゆるものを lint できるツールの紹介
  - Microsoft Edge for iOS and Android: What developers need to know
    - https://blogs.windows.com/msedgedev/2017/10/05/microsoft-edge-ios-android-developer/

### WHATWG/W3C 標準動向

- Recommendation
  - HTML 5.1 2nd Edition
    - https://www.w3.org/blog/news/archives/6553
  - Time Ontology in OWL
    - https://www.w3.org/blog/news/archives/6578
  - Semantic Sensor Network Ontology
    - https://www.w3.org/blog/news/archives/6574
- Proposed Recommendation
  - Notice of CFC: Move HTML5.2 to PR
    - https://lists.w3.org/Archives/Public/public-html/2017Oct/0008.html
    - https://github.com/w3c/html/issues/1050
    - positive feedback のみだったので CFC は close
    - Proposed Recommendation 待ち
  - WebSub
    - https://www.w3.org/blog/news/archives/6555
    - SocialWG (Social Web Working Group)
    - PubSubHubbub を元にした Pub-Sub の仕様
  - Cooperative Scheduling of Background Tasks
    - https://www.w3.org/blog/news/archives/6557
    - https://www.w3.org/TR/2017/PR-requestidlecallback-20171010/
    - `requestIdleCallback()`/`cancelIdleCallback()` の仕様
  - Page Visibility Level 2
    - https://www.w3.org/blog/news/archives/6562
    - https://www.w3.org/TR/2017/PR-page-visibility-2-20171017/
    - document.hidden が非推奨になり、document.visibilityState を見ろということに
    - onvisiblitychange ハンドラが追加
- Candidate Recommendation
  - Audio Output Devices API; Media Capture and Streams
    - https://www.w3.org/blog/news/archives/6551
  - CSS Backgrounds and Borders Module Level 3
    - https://www.w3.org/blog/news/archives/6564
    - https://www.w3.org/TR/2017/CR-css-backgrounds-3-20171017/
    - 2014 年の CR を更新、Changes を見る限りは地味め
  - Remote Playback API
    - https://www.w3.org/blog/news/archives/6581
  - Tracking Preference Expression (DNT)
    - https://www.w3.org/blog/news/archives/6586
  - CSS Flexible Box Layout Module Level 1
    - https://www.w3.org/blog/news/archives/6584
    - https://www.w3.org/TR/2017/CR-css-flexbox-1-20171019/
  - Preload
    - https://www.w3.org/blog/news/archives/6605
    - https://www.w3.org/TR/2017/CR-preload-20171026/
    - 初の CR に
- Working Draft
  - New webrtc-pc Editor's draft (v20171002)
    - https://lists.w3.org/Archives/Public/public-webrtc/2017Oct/0000.html
  - CSS Multi-column Layout Level 1 republished as a Working Draft
    - https://www.w3.org/blog/CSS/2017/10/05/css-multi-column-layout-level-1-republished-as-a-working-draft/
    - https://www.w3.org/TR/2017/WD-css-multicol-1-20171005/
    - 2011 年の CR からいろいろ変更あり
      - https://www.w3.org/TR/2017/WD-css-multicol-1-20171005/#changes
- First Public Working Draft
  - TTML Profiles for Internet Media Subtitles and Captions 1.1
    - https://www.w3.org/blog/news/archives/6566
- Chartering
  - Web Authentication Working Group re-charter approved
    - https://lists.w3.org/Archives/Public/public-webauthn/2017Oct/0138.html
- FetchObserver (for a single fetch)
  - https://github.com/whatwg/fetch/issues/607
  - https://gist.github.com/slightlyoff/18dc42ae00768c23fbc4c5097400adfb#gistcomment-2227534
  - `observe()` から `observer` を取り、`onpush` などのイベントで取れるように
- WHATWG HTML で UTF-8 がエンコーディングに規定された
  - https://github.com/whatwg/html/commit/fae77e3c558b9f083dfb9086752863a4789268f5
  - authoring conformance なので UTF-8 以外をブラウザが受け付けなくなるわけではない
  - もともと Encoding 仕様では長年 UTF-8 がデフォルトで、他はレガシー扱いだった
  - W3C のほうでも issue はたった
    - https://github.com/w3c/html/issues/1039
- Other
  - WebRTC New webrtc-pc Editor's draft (v20171023)
    - https://lists.w3.org/Archives/Public/public-webrtc/2017Oct/0071.html
  - User Agent properties and variables #1693
    - https://github.com/w3c/csswg-drafts/issues/1693#issuecomment-330909067
    - safe-area-inset のように UA が提供する値を取得する API が欲しい(calc したい)
    - `constant()` だったが、意味的には `env()` だろということで仕様が変更
    - safari にもすぐにパッチも入る
  - Including the Presentation API in HTML5.2
    - http://lists.w3.org/Archives/Public/public-html/2017Oct/0003.html
    - Presentation API の実装が Chrome しかないけど HTML5.2 に入れるの?
    - 入れた上で実装状況などを Warning しておくという方向に
  - Mike West appointed co-Chair of the Web Application Security Working Group
    - https://lists.w3.org/Archives/Public/public-webappsec/2017Oct/0012.html
    - Mike West (google) が WebAppSec の co-chair に
  - Proposal for a MIX Level 2 roadmap
    - https://lists.w3.org/Archives/Public/public-webappsec/2017Oct/0013.html
    - Mixed Content を更新していくロードマップ
    - Upgrade-Insecure-Request を消して、デフォルト動作にするなど

### TC39 標準動向

- 取りこぼし ECMAScript, TC39, and the History of JavaScript
  - https://tylermcginnis.com/videos/ecmascript/
- Proposals Diff
  - 0->1
  - 1->2
  - 2->3
    - https://github.com/tc39/proposal-private-methods
- ecmascript-do-generator
  - https://github.com/sebmarkbage/ecmascript-do-generator
  - do 記法で書かれた結果から generator を作る記法
  - Array.from や spread operator と組み合わせ Array Comprehention (リスト内包表記)の代替に
- String.prototype.codePoints proposal
  - https://github.com/RReverser/string-prototype-codepoints
  - codePointAt だとポジションがわかってないといけない
  - イテレーションの中で使えるようにイテレータで取り出す API
- proposal-block-params
  - https://github.com/samuelgoto/proposal-block-params

### IETF 標準動向

- RFC
  - The ARIA Algorithm and Its Use with the Secure Real-Time Transport Protocol (SRTP)
    - https://tools.ietf.org/html/rfc8269
    - ARIA を SRTP の KDF に使う話
  - Data Center TCP (DCTCP): TCP Congestion Control for Data Centers
    - https://tools.ietf.org/html/rfc8257
  - Updates to the Opus Audio Codec
    - https://tools.ietf.org/html/rfc8251
  - Uniform Resource Name (URN) Namespace Registration Transition
    - https://tools.ietf.org/html/rfc8254
  - Rules for Designing Protocols Using the Generalized Packet/Message Format from RFC 5444
    - https://tools.ietf.org/html/rfc8245
- Draft
  - IETF Last Call:
  - WG Last Call:
  - Draft:
    - (IETF 直前だからかドラフトが多い)
    - ECMAScript Media Types Updates
      - https://tools.ietf.org/html/draft-ietf-dispatch-javascript-mjs-00
      - .mjs の件 Dispatch WG から
    - QUIC Multiplexing
      - https://tools.ietf.org/html/draft-aboba-avtcore-quic-multiplexing-00
      - De-Multiplex するためめに、Type を犠牲にして最初の 2-bit を 11 にする。[192..] -> QUIC
    - HTTP/2 "Dropped Frame" Frame
      - https://tools.ietf.org/html/draft-kerwin-http2-nak-frame-01
      - 対応してない拡張フレームが送られてきたことを相手に伝えたい
    - Bootstrapping Websockets from HTTP/2
      - https://tools.ietf.org/html/draft-mcmanus-httpbis-h2-websockets-00.html
      - HTTP2 の上で WebSocket という議論再び
    - OpenID Connect DNS-based Discovery
      - https://tools.ietf.org/html/draft-sanz-openid-dns-discovery-00
    - Origin Validation Clarifications
      - https://tools.ietf.org/html/draft-ietf-sidrops-ov-clarify-00
    - Babel Security Model
      - https://tools.ietf.org/html/draft-lemon-homenet-babel-security-latest-00
      - Home ネットワークの認証周りの話
    - New protocol elements for HTTP Status Code 451
      - https://tools.ietf.org/html/draft-451-new-protocol-elements-00
      - 451 を返す時、ブロックを実装した人と命令した人を区別するべきといった推奨事項。
    - Structured Headers for HTTP
      - https://tools.ietf.org/html/draft-nottingham-structured-headers-00
      - HTTP Header に型付データで構造化する話
      - A JSON Encoding for HTTP Header Field Values もあるが置き換える雰囲気
        - https://tools.ietf.org/html/draft-reschke-http-jfv-06
    - Application-Layer TLS
      - https://tools.ietf.org/html/draft-friel-tls-over-http-00
    - Multipath Extension for QUIC
      - https://tools.ietf.org/html/draft-deconinck-multipath-quic-00
    - Network Layer Coding for QUIC: Requirements
      - https://tools.ietf.org/html/draft-quic-coding-00
    - RTP Control Protocol (RTCP) Extended Report (XR) Block for Effective Loss Index Reporting
      - https://tools.ietf.org/html/draft-zheng-xrblock-effective-loss-index-00
    - HTTP-Payments
      - https://tools.ietf.org/html/draft-hope-bailie-http-payments-00
      - Reserved だった 402 Payment Required で支払いを要求
      - Pay, Pay-Token, Pay-Balance で支払い情報の交換
  - Call for Adoption
    - Call For Adoption HTTPbis BCP56bis
      - http://lists.w3.org/Archives/Public/ietf-http-wg/2017OctDec/0018.html
      - HTTP の Best Current Practice (RFC3205) 2002 ぶりに更新
- Other
  - DRAFT
    - HTTPtre scope of work
      - https://lists.w3.org/Archives/Public/ietf-http-wg/2017OctDec/0014.html
      - HTTP/1.1 の更新を進めるという話
      - IETF でもスケジュールあり

### 周辺動向

- MDN への Documentation リソース統合
  - Mozilla
    - Mozilla brings Microsoft, Google, the W3C, Samsung together to create cross-browser documentation on MDN
    - https://blog.mozilla.org/blog/2017/10/18/mozilla-brings-microsoft-google-w3c-samsung-together-create-cross-browser-documentation-mdn/
  - Chrome
    - https://blog.chromium.org/2017/10/building-unified-documentation-for-web.html
  - Edge
    - https://blogs.windows.com/msedgedev/2017/10/18/documenting-web-together-mdn-web-docs/
- Say "yes" to HTTPS: Chrome secures the web, one site at a time
  - https://www.blog.google/topics/safety-security/say-yes-https-chrome-secures-web-one-site-time
  - 日本は 30% 程度と非常に低かったが、55% までアップした
- (取りこぼし) Introducing Cloudflare Workers
  - https://blog.cloudflare.com/introducing-cloudflare-workers/
  - Cloudflare の CDN エッジで SW を動かせる
- webrtc/KITE
  - https://github.com/webrtc/KITE
  - KITE is a test engine designed to test WebRTC interoperability across browsers
- "Does anyone know if the WHATWG stream API will be supported on Node.js (natively)?"
  - https://twitter.com/rauschma/status/916863465473630208
- Delivering H/2 Push Payloads To Userland
  - https://gist.github.com/slightlyoff/18dc42ae00768c23fbc4c5097400adfb
  - https://twitter.com/slightlylate/status/918268696656691200
- Web Components Survey, Fall 2017
  - https://docs.google.com/forms/d/e/1FAIpQLSeoj4qSGJj0diQVyoju9EP1sgJBlUPD4f0JXvuXgaLXvRmv-w/viewform
  - WebComponents についての要望アンケート
- "If you disable autocomplete on your HTML forms, why?"
  - https://twitter.com/Paul_Kinlan/status/914799105507041280
- Get ready for TLS 1.3 | Akamai Community
  - https://community.akamai.com/community/web-performance/blog/2017/10/25/get-ready-for-tls-13
  - Akamai で TLS1.3 beta リリース

### イベント

- 9 月
  - 9/20-21 BlinkOn 8 Tokyo
    - video: https://www.youtube.com/playlist?list=PL9ioqAuyl6UK7Z0HHswBM5JgAp-izn_3S
- 10 月
  - 10/3-5 QUIC interim
    - https://github.com/quicwg/wg-materials/tree/master/interim-17-10
    - https://github.com/quicwg/wg-materials/blob/master/interim-17-10/agenda.md
    - https://github.com/quicwg/wg-materials/blob/master/interim-17-10/minutes.md
  - 10/13 WebRTC Vertial Interim
    - TPAC の前にもう一回 CR blocker を整理する VI をやる
      - https://lists.w3.org/Archives/Public/public-webrtc/2017Sep/0045.html
    - Minutes
      - https://lists.w3.org/Archives/Public/public-webrtc/2017Oct/0051.html
      - https://www.w3.org/2017/10/12-webrtc-minutes
      - https://www.w3.org/2011/04/webrtc/wiki/October_12_2017
      - https://www.w3.org/2011/04/webrtc/wiki/November_6_-_7_2017
  - 10/16 Meet the W3C AB London - Oct 2017
    - https://ti.to/w3c-ab/meet-the-w3c-ab-london-oct-2017
  - 10/23-24 Chrome Developer Summit
    - https://developer.chrome.com/devsummit/
    - Chrome Developer Summit 2017 Summary - Day 1/2
      - https://auth0.com/blog/chromedevsummit-summary-day-one/
      - https://auth0.com/blog/chromedevsummit-summary-day-two/
  - 10/27-29 Mozilla Fes
    - https://mozillafestival.org/
- 11 月
  - 11/6-10 TPAC 2017 San Francisco
    - https://www.w3.org/2017/11/TPAC/
    - https://www.w3.org/wiki/TPAC/2017
  - 11/11-17 IETF 100 Singapore
    - https://www.ietf.org/meeting/100/index.html
    - https://datatracker.ietf.org/meeting/100/agenda.html
- 12 月
  - 12/5-7 W3C Workshop on WebVR Authoring: Opportunities and Challenges
    - https://www.w3.org/blog/news/archives/6535
