# [monthly-web][mozaic.fm] ep26 Monthly Web 201708

## Info

audio: https://files.mozaic.fm/mozaic-ep26.mp3

published_at
: 2017-09-03

guest
: [@myakura](https://twitter.com/myakura)


## Theme

第 26 回のテーマは 2017 年 8 月の Monthly Web です。

Monthly Web のモチベーションについては以下。

[ep25 Monthly Web 201707](https://mozaic.fm/episodes/25/monthly-web-201707.html)


## Show Note


### Chrome 動向

- Chrome Platform Status Release Timeline
   - <https://www.chromestatus.com/features/schedule>
- Chrome 60 Stable
   - <https://developers.google.com/web/updates/2017/07/nic60>
   - PaintTiming, WASM, Budget, Feature Policy
   - UserAgent が Chrome Apps WebView にて変更できない問題は、無事解決。
- Chrome 61 Beta
   - <https://blog.chromium.org/2017/08/chrome-61-beta-javascript-modules.html>
   - <https://developers.google.com/web/updates/2017/08/chrome-61-deprecations>
   - <https://developers.google.com/web/updates/2017/07/devtools-release-notes>
   - ES Modules
   - Payment Request API (desktop)
   - Web Share API
   - WebUSB
   - CSP: Embedded Enforcement
   - Referrer policies 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin'
   - Expect-CT header
   - Device RAM header & API
   - Media Updates in Chrome 61
     - <https://developers.google.com/web/updates/2017/07/chrome-61-media-updates>
     - MSE を使う場合バックグラウンドになるとメディアが無効に
   - Budget API
     - <https://developers.google.com/web/updates/2017/08/estimating-available-storage-space>
   - PSA: WebRTC M61 Release Notes
     - <https://groups.google.com/forum/#!topic/discuss-webrtc/8gJyg8EFPdo>
     - <https://labs.jxck.io/webrtc/mediastream/>
- Chrome 62 Dev
   - Upcoming Regular Expression Features
     - <https://developers.google.com/web/updates/2017/07/upcoming-regexp-features>
     - RegExp `dotAll` mode / `s` flag (. が改行を含むように)
     - RegExp lookbehind assertions
   - `<data>` element
   - `<time>` element
   - console.context で log のコンテキストをわけられるように
     - <https://umaar.com/dev-tips/153-log-management/>
   - http:なサイト上のフォームに入力したときに安全じゃないよーって出るように
     - そんなフォーム持ってるサイト運営者にメールが行っているらしい
   - What's New In DevTools (Chrome 62)
     - <https://developers.google.com/web/updates/2017/08/devtools-release-notes>
     - top level await
     - queryObject in console
- 8/10 Google と Mozilla のエンジニアが Web Compatibility について意見交換
   - <https://docs.google.com/document/d/1FIUk5Y5_VmZ8rqHEsFEoXaysJUCRzf3RbvcyuYpim9c/edit#>
- Puppeteer - Headless Chrome 用のライブラリ
   - <https://github.com/GoogleChrome/puppeteer>
   - DevTools チーム謹製
- V8 Release 6.1
   - <https://v8project.blogspot.jp/2017/08/v8-release-61.html>
   - asm.js が wasm にコンパイルされる
   - devtools の breakpoint が wasm にヒットした時ローカル変数が出る
- Chrome dev/beta/stable が同時にインストールできるように
   - <https://blog.chromium.org/2017/08/run-multiple-versions-of-chrome-side-by.html>
- Intent to Implement - ServerTiming
   - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/y3qwr490Fc4/boGoo41-BwAJ>
- Fast Properties in V8
   - <http://v8project.blogspot.jp/2017/08/fast-properties.html>
- Rendertron
   - headless chrome の docker
   - <https://github.com/GoogleChrome/rendertron>


### Firefox 動向

- Firefox 55 Stable
   - IntersectionObserver と requestIdleCallback が 有効に
      - <https://hacks.mozilla.org/2017/08/intersection-observer-comes-to-firefox/>
   - WebVR for All Windows Users
      - <https://hacks.mozilla.org/2017/08/webvr-for-all-windows-users/>
      - <https://hacks.mozilla.org/2017/08/essential-webvr-resources/>
   - Firefox 55: first desktop browser to support WebVR
      - <https://hacks.mozilla.org/2017/08/firefox-55-supports-webvr/>
- Firefox 56 Beta
   - <https://developer.mozilla.org/Firefox/Releases/56>
   - `<link rel=preload>` のサポート
   - Headless モードが実装
      - <https://developer.mozilla.org/en-US/Firefox/Headless_mode>
- Firefox 57 Nightly
   - for-each-in の実装を削除
      - `for ... of` が入ったので `for each ... in` という独自構文を削除
      - <https://www.fxsitecompat.com/en-CA/docs/2017/for-each-in-loop-support-has-been-removed/>
   - ReadableStream が実装
      - <https://bugzilla.mozilla.org/show_bug.cgi?id=1128959>
      - <https://bugzilla.mozilla.org/show_bug.cgi?id=1272697>
      - WritableStream はまだ
   - ロゴが新しく
      - <https://rockridge.hatenablog.com/entry/2017/08/17/235034>
- New Test Pilot Experiments Available Today
   - <https://blog.mozilla.org/blog/2017/08/01/new-test-pilot-experiments/>
   - <https://testpilot.firefox.com/>
      - Send
      - Voice Fill
      - Notes
- Mozilla の Web Payment のロードマップ
   - <https://wiki.mozilla.org/Firefox/Features/Web_Payments>
   - 2017 年の Q3 には API 部分(UI 除く)は実装してるという計画
- 8/22 Stylo の紹介記事
   - <https://hacks.mozilla.org/2017/08/inside-a-super-fast-css-engine-quantum-css-aka-stylo/>
- Intent to ship: Abort API
   - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/jk6XtUch4GQ/lYNjSuHDBQAJ>
   - Edge も Chrome もやってるのでもうすぐかも
- Implementing a Chrome DevTools Protocol server in Firefox
   - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/4-4A8W-nP5g/Y9C9UkWTAAAJ>
- Firefox/Channels/Meetings/2017-08-29
   - <https://wiki.mozilla.org/Firefox/Channels/Meetings/2017-08-29>
   - e10-multi plans to go 100% on release next week
   - e10s = Electrolysis
- for-await-of が有効に
   - <https://bugzilla.mozilla.org/show_bug.cgi?id=1352312>


### Safari 動向

- 8/3 WebKit で Service Worker が実装開始
   - <https://trac.webkit.org/changeset/220220/webkit#file19>
- 8/9 Safari Technology Preview 37
   - <https://webkit.org/blog/7862/release-notes-for-safari-technology-preview-release-37/>
   - navigator.sendBeacon の実装開始(flag)
      - <https://w3c.github.io/beacon/#sec-sendBeacon-method>
   - `Promise.finally()` Stage3 実装
      - <https://github.com/tc39/proposal-promise-finally>
      - <https://blog.jxck.io/entries/2017-08-10/promise-finally-proposal.html>
   - Added support for optional catch binding Stage 3
      - <https://github.com/tc39/proposal-optional-catch-binding>
- 8/24 Safari Technology Preview 38
   - <https://webkit.org/blog/7877/release-notes-for-safari-technology-preview-38/>
   - Becon API (experimental)
   - Request Payment API (experimental)
- Safari 11
   - <https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Safari_11_0/Safari_11_0.html>
   - WebRTC
   - WASM
   - Resource Timing
   - Cookie 周りが変わる? double keying ってやつの影響?
      - <https://webkit.org/blog/7675/intelligent-tracking-prevention/>
   - (double keying の影響で foreign fetch が消える話)
      - <https://github.com/w3c/ServiceWorker/issues/1188>
   - WWDC で brotli 対応発表(High Sierra)
      - <https://blog.jxck.io/entries/2017-08-19/content-encoding-brotli.html>
- 8/30 Concurrent JavaScript: It can work!
   - <https://webkit.org/blog/7846/concurrent-javascript-it-can-work/>
- 8/30 Igalia のひとが AMP チームの要請をうけて WebKit を修正中という話
   - <http://frederic-wang.fr/amp-and-igalia-working-together-to-improve-the-web-platform.html>


### Edge 動向

- Windows Insider Preview (Fast) build 16275
   - <https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/desktop/16275>
- Windows Insider Preview (Fast) build 16273
   - <https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/desktop/16273>
- Windows Insider Preview (Fast) build 16257
   - <https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/desktop/16257>
- Windows Insider Preview (Fast) build 16251
   - <https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/desktop/16251>
- aborting fetch がどっかで入りそう
   - <https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/13009916/>
- 8/17 Making the web smoother with independent rendering
   - <https://blogs.windows.com/msedgedev/2017/08/17/making-web-smoother-independent-rendering/>
   - EdgeHTML 16 で content prosession と rendering を並行化し描画を高速化
   - select, canvas, svg などでも効果がある
   - MotionMark で 43% 向上


### WHATWG/W3C 標準動向

- Distributed and syndicated content
   - <https://www.w3.org/2001/tag/doc/distributed-content/>
   - AMP どうなんすかっていう話
- 8/1 WebAssembly core の仕様ドラフト公開
   - <https://lists.w3.org/Archives/Public/public-webassembly/2017Aug/0000.html>
   - <https://webassembly.github.io/spec/>
- 8/2 SVG WG が recharter
   - <https://www.w3.org/2017/04/svg-2017.html>
   - SVG2 が死にそうになっている(ブラウザベンダー撤退)
   - SVG2 を勧告させるための WG
- 8/2 Service Workers WG 発足
   - <https://www.w3.org/sw/>
   - <https://www.w3.org/2017/08/sw-charter>
   - 10 月に v1 の CR と v2 の FPWD を予定
- 8/2 WebAssembly WG 発足
   - <https://www.w3.org/blog/2017/08/launching-the-webassembly-working-group/>
- 8/10 Indexed DB 2.0 が CR に
   - <https://www.w3.org/blog/news/archives/6457>
- 8/11 過去の HTML/XHTML が obsolete という扱いになるかも
   - <https://www.w3.org/blog/news/archives/6459>
   - 9/7 までコメントを受け付ける
- 8/21 web-platform-tests dashboard
   - <http://wpt.fyi/>
   - Chrome チームによる主要ブラウザでの web-platform-tests の実行結果をみるやつ
- 8/22 WebRTC 1.0 Editors Draft が更新
   - <https://w3c.github.io/webrtc-pc/archives/20170822/webrtc.html>
   - 年内勧告に向けて仕様のブラッシュアップといった雰囲気
- 8/24 CSS Scroll Snapping Module 1 の CR が更新
   - <https://www.w3.org/TR/2017/CR-css-scroll-snap-1-20170824/>
- Make fetch() use "same-origin" credentials by default #585
   - <https://github.com/whatwg/fetch/pull/585>
   - fetch で cookie の same-origin をデフォルトにする提案
   - <https://twitter.com/jaffathecake/status/901005238471200769>
   - 概ねポジティブな反応
- Virtual DOM 的なものを標準へ取り込む系の議論
   - <https://twitter.com/HenrikJoreteg/status/901110162340986881>
- Manual priority control of resource fetching
   - <https://discourse.wicg.io/t/manual-priority-control-of-resource-fetching/2280>
   - HTTP2 的な Priority を HTML で明示する方法が議論され始めた
   - <https://github.com/WICG/resource-priorities>
- Be mobile-friendly #59
   - <https://github.com/whatwg/whatwg.org/issues/59>
   - WHATWG のドキュメントをモバイルでも読みやすくしたいとのこと
- [Houdini] Minutes Paris F2F 2017-08-01 Part 1~3
   - <http://lists.w3.org/Archives/Public/public-houdini/2017Aug/0001.html>
   - <http://lists.w3.org/Archives/Public/public-houdini/2017Aug/0002.html>
   - <http://lists.w3.org/Archives/Public/public-houdini/2017Aug/0003.html>
- TAG Teleconference - 29 August 2017 ; 15:00 UTC
   - <https://github.com/w3ctag/meetings/blob/gh-pages/2017/telcons/08-29-agenda.md>
- [Proposal] Lifecycle for the Web - for system initiated resource re-allocation
   - <https://discourse.wicg.io/t/proposal-lifecycle-for-the-web-for-system-initiated-resource-re-allocation/2319>
- 8/2 Geolocation Header の話題
   - <https://lists.w3.org/Archives/Public/ietf-http-wg/2017JulSep/0171.html>
   - ヘッダに位置情報載せたいという提案が盛り上がってる
   - あまり気にしないで良さそう
- Web に足りない機能の公募
   - <https://twitter.com/domenic/status/898699783979753472>


### TC39 標準動向

- 7/25-27 59th meeting of Ecma TC39  (@Microsoft WA)
   - TC39 サマリ
      - <https://github.com/rwaldron/tc39-notes/blob/master/es8/2017-07/summary.md>
   - Stage 変更一覧
      - <https://ecmascript-daily.github.io/ecmascript/2017/07/28/ecmascript-proposals-status>
   - Optional Chaining Operator
      - <https://docs.google.com/presentation/d/1OcytQtyykmOZJwm-LFgOP0FpQccyeajAjLdOvBki9a0/edit#slide=id.p>
   - Pipeline operator
      - <https://docs.google.com/presentation/d/1qiWFzi5dkjuUVGcFXwypuQbEbZk-BV7unX0bYurcQsA/edit#slide=id.p>
   - Interfaces
      - <https://docs.google.com/presentation/d/1WrvSyslnF-5VnPj3k3HRq8MRzuiSN1kQ6ENE1iUSmDU/edit#slide=id.gc6fa3c898_0_0>
- Binary AST Stage 1
   - <https://github.com/syg/ecmascript-binary-ast>
   - パースの負荷を減らしたいのでバイナリ AST という話
   - Mozilla と Facebook が検討中
   - <https://yoric.github.io/post/binary-ast-newsletter-1/>
- ES proposal: class fields が Stage 3 に
   - <http://2ality.com/2017/07/class-fields.html>
- RegExp dotAll mode `s` shipped in V8
   - <https://github.com/tc39/proposal-regexp-dotall-flag>
   - <https://chromium.googlesource.com/v8/v8.git/+/f4b2b9bef77c35491adc6c56be157c09294f79ba%5E%21>
   - `.` が改行も含めてマッチするように
- gibson042/ecma262-proposal-json-superset
   - U+2028 LINE SEPARATOR と U+2029 PARAGRAPH SEPARATOR は JSON に含められるが JSON.parse() で対応してない。これを直すという話。
   - <https://github.com/gibson042/ecma262-proposal-json-superset>
   - <https://en.wikipedia.org/wiki/JSON_Streaming#Line_delimited_JSON>
- Rex Jaeschke Chair / Daniel Ehrenberg Vice Chair
   - <https://bocoup.com/blog/the-next-steps-for-tc39>
- EcmaScript.in
   - <http://ecmascript.in/>
   - ES の仕様更新を通知してくれるらしい


### IETF 標準動向

- 418 I'm a Teapot 問題
   - <https://lists.w3.org/Archives/Public/ietf-http-wg/2017JulSep/0196.html>
   - status code 418 を使いたいが、 joke rfc の rfc2324 の HTCPCP で取られてる
   - <https://www.ietf.org/rfc/rfc2324.txt>
   - ジョークだけど実装も多いので、使うか使わないかで議論に
   - <https://github.com/martinthomson/teapot/blob/master/draft-thomson-teapot.md>
   - <https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml>
   - 418, 419, 425 などの案が出てる
   - 418 を IANA で予約するためのドラフトを mnot が書いた
   - <https://tools.ietf.org/id/draft-nottingham-thanks-larry-00.html>
   - <http://save418.com/>
- WebPackaging
   - <https://tools.ietf.org/html/draft-yasskin-webpackage-use-cases-00>
- .mjs as javascript
   - <https://tools.ietf.org/html/draft-bfarias-javascript-mjs-01>
   - <https://blog.jxck.io/entries/2017-08-15/universal-mjs-ecosystem.html>


### 周辺動向

- Intent to Deprecate and Remove: Trust in existing Symantec-issued Certificates
   - <https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/eUAKwjihhBs%5B251-275%5D>
   - Symantec の証明書誤発行がひどいので、 Chrome は Symantec 発行の証明書を信頼する期間を段階的に短くする。
   - これもあってか Symantec は CA 業務自体を Digicert に売却した
      - <https://www.digicert.com/news/digicert-to-acquire-symantec-website-security-business/>
      - <https://www.symantec.com/about/newsroom/press-releases/2017/symantec_0802_01>
- Removing Disabled WoSign and StartCom Certificates from Firefox 58
   - <https://blog.mozilla.org/security/2017/08/30/removing-disabled-wosign-startcom-certificates-firefox-58/>
- WebAssembly Weekly #1: Real world WebAssembly
   - <https://www.wasmrocks.com/topic/57/webassembly-weekly-1-real-world-webassembly>
- webpack awarded $125,000 from MOSS Program
   - <https://medium.com/webpack/webpack-awarded-125-000-from-moss-program-f63eeaaf4e15>
   - webpack で wasm をサポートし、全ての資産を webpack 経由で wasm にして繋ぐ
   - そこに向けて webpack を色々書き換える
   - そのために MOSS(mozilla oss support) から $125,000 (1300 万)出た 
- Search Console の UI が改善
   - <https://webmasters.googleblog.com/2017/08/a-sneak-peek-at-two-experimental.html>
   - AMP ページの修正が楽に
- News Feed FYI: Showing You Stories That Link to Faster Loading Webpages
   - <https://newsroom.fb.com/news/2017/08/news-feed-fyi-showing-you-stories-that-link-to-faster-loading-webpages/>
- The Languages Which Almost Became CSS
   - <https://blog.cloudflare.com/the-languages-which-almost-became-css/>
- Node.js に HTTP2
   - <https://github.com/nodejs/node/compare/1abfbbb1c479c550760b5f428eee5dbcc18243b3...34d1b1144e1af8382dad71c28c8d956ebf709801>
   - 8.4.0 に搭載
   - <https://blog.risingstack.com/node-js-http-2-push/>
   - server push も
- QUIC デプロイ知見が論文で
   - <http://dl.acm.org/citation.cfm?id=3098842>
- Hello WebAssembly
   - <http://www.mono-project.com/news/2017/08/09/hello-webassembly/>
- ES Modules
   - <https://medium.com/web-on-the-edge/es-modules-in-node-today-32cff914e4b>
   - <https://blogs.windows.com/msedgedev/2017/08/10/es-modules-node-today/>
   - Node では .mjs が採用された
   - MIME 登録提案 <https://tools.ietf.org/html/draft-bfarias-javascript-mjs-00>
- Google Rendering Service based on chrome 41
   - <https://developers.google.com/search/docs/guides/rendering>
- V8 向けコード最適化
   - <https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e>
- Intent to Ship: Server Timing
   - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/ivub1L2UQzQ/e_dreSHfBAAJ>
- React のライセンスふたたび
   - <https://code.facebook.com/posts/112130496157735/explaining-react-s-license/>
   - <https://twitter.com/slicknet/status/898728697854808065>
- 各 FW が Custom Element とどの程度協調できてるか
   - <https://custom-elements-everywhere.com/>
- CT をチェックできるサービス
   - <https://developers.facebook.com/tools/ct/>
   - ドメインに対する証明書発行でメールが送られてくるようになる
- Public Workbox Meeting Notes
   - <https://docs.google.com/document/d/1SbLfFbIgO5v8f9paG1_jUbQeD9OCzIYJvw60mJUc680/edit>
- Bidirectional JavaScript &lt;-&gt; ESI(Edge Side Includes)
   - <https://github.com/akamai/js2esi>
   - could run on Akamai Edge


### イベント

- 8 月
   - 8/22, 23 Polymer Summit 2017
     - <https://summit.polymer-project.org/>
     - polymer 3
        - <https://www.polymer-project.org/blog/2017-08-22-npm-modules>
        - Bower to NPM
        - HTML Imports to ESM
     - ES6 Modules in the Real World (Polymer Summit 2017)
     - SSR Web Components (Polymer Summit 2017)
     - Using Web Components in Ionic (Polymer Summit 2017)
     - Straight Talk About Server-Side Rendering (Polymer Summit 2017)
     - Custom Elements Everywhere (Polymer Summit 2017)
     - Web Components: Just in the Nick of Time (Polymer Summit 2017)
     - Youtube が Polymer 化
     - <https://twitter.com/slightlylate/status/902640312543133696>
- 9 月
   - 9/5, 6 Google Developer Days
      - <https://developers.google.com/events/gdd-europe/>
   - 9/13 Edge Summit
      - <https://summit.microsoftedge.com/>
      - <https://summit.microsoftedge.com/#schedule>
   - 9/20-21 BlinkOn
      - <https://docs.google.com/document/d/11Y1MK-jVQl_xlhFS8dds_6FsC70jQ_9aOtcWALBiz5k/preview#>
   - 9/22 PWA Roadshow
      - <https://events.withgoogle.com/pwa-roadshow-tokyo-2017/>
- 10 月
   - 10/23-24 Chrome Developer Summit
      - <https://twitter.com/ChromiumDev/status/892770719448289280>
   - 10/27-29 Mozilla Fes
   - <https://mozillafestival.org/>
- 11 月
   - 11/6-10 TPAC 2017
   - <https://www.w3.org/2017/11/TPAC/>
