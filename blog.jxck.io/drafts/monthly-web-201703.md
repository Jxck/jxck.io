# [monthly][web] Monthly Web 2017/03

## Intro

今月の Web メモ

## Browser

### Chrome

- 2/28 [API Deprecations and Removals in Chrome 57](https://developers.google.com/web/updates/2017/02/chrome-57-deprecations)
  - FileReaderSync in service workers
  - webkitCancelRequestAnimationFrame
  - BluetoothDevice.uuids
  - webkit-prefixed IndexedDB
  - etc



//- 2/2: Beta [Chrome57](https://blog.chromium.org/2017/02/chrome-57-beta-css-grid-layout-improved.html)
//  - Grid
//  - Add to Home Screeen
//  - Media Session
//  - text padding
//  - SW NavigationPreload
//  - remove vender prefix from IDB
//- Chrome58 Beta, Dev, Canary
//
//- [release](https://chromereleases.googleblog.com/) ([stable updates tag](https://chromereleases.googleblog.com/search/label/Stable%20updates))
//- [updates](https://developers.google.com/web/updates/)
//- [chromium](https://www.chromium.org/developers/calendar)
//- [canary](https://www.chromium.org/getting-involved/dev-channel)

- [API Deprecations and Removals in Chrome 57  \|  Web  \|  Google Developers](https://developers.google.com/web/updates/2017/02/chrome-57-deprecations)

### Firefox

- 2/22: [ECMAScript 2016+ in Firefox](https://blog.mozilla.org/javascript/2017/02/22/ecmascript-2016plus-in-firefox/)
  - Nightly 54 で Kangax ES2016 compat 100% 達成


Firefoxの開発者向けのノート
- https://developer.mozilla.org/en-US/Firefox/Releases/51

//- 1/31 Stable [Firefox51](https://blog.nightly.mozilla.org/2017/01/31/these-weeks-in-firefox-issue-9/)
//  - new logo
//  - e10s
//- Firefox52 Beta
//- Firefox53 Dev
//  - [TURN/TLS support](https://wiki.mozilla.org/Media/WebRTC/ReleaseNotes/53)
//- Firefox54 Nightly
//  - [es modules が動くように](https://twitter.com/malyw/status/829707412659658753)
//
//- [release](https://www.mozilla.org/en-US/firefox/releases/)
//- [nightly](https://www.mozilla.org/ja/firefox/channel/desktop/)



- 2/20: [Firefox で event.timeStamp が DOMHighResTimeStamp を返すように](https://www.fxsitecompat.com/ja/docs/2017/event-timestamp-now-returns-domhighrestimestamp-by-default/)
  - これまでの ms 単位から精度が向上
  - chrome は 49 からやってるので互換性は大丈夫だろうという判断
- 2/22: [ECMAScript 2016+ in Firefox](https://blog.mozilla.org/javascript/2017/02/22/ecmascript-2016plus-in-firefox/)
  - ES2016 以降のサポートの話

- [Firefox/AddOns/Status/current \- MozillaWiki](https://wiki.mozilla.org/Firefox/AddOns/Status/current#Schedule)
  - WebExtension/e10s 周りのスケジュールが載ってる

### Safari

- 2/22: [Safari Technology Preview 24](https://webkit.org/blog/7423/release-notes-for-safari-technology-preview-24/)
    - User Timing
    - Link Preload
    - import()
    - etc


//- Safari 10.0
//
//- [tech preview](https://developer.apple.com/safari/technology-preview/release-notes/)
//- [release](https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Introduction/Introduction.html)


[Release Notes for Safari Technology Preview 24 \| WebKit](https://webkit.org/blog/7423/release-notes-for-safari-technology-preview-24/)

### Edge

//- 15019 (Windows Insider Preview (Fast) Desktop)
//- 15014 (Windows Insider Preview (Fast) Mobile)
//- 15007 (Release date: 01/12/2017)
//- 15002 (Release date: 01/09/2017)
//- 14986 (Release date: 12/07/2016)
//
//- [change log](https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/)


### V8

//- 2/6: [V8 Release 5.7](http://v8project.blogspot.jp/2017/02/v8-release-57.html)
//  - Native async functions as fast as promises
//  - Continued ES2015 improvements
//  - RegExp 15 % faster
//  - padStart/End, Intl.DateTimeFormat.prototype.formatToParts 
//  - WASM enabled
//  - etc


## 取りこぼし

- 2/8: [Google and Mozilla's message to AV and security firms: Stop trashing HTTPS \| ZDNet](http://www.zdnet.com/article/google-and-mozillas-message-to-av-and-security-firms-stop-trashing-https/)
  - HTTPS 化が広がり、それをほどく挙動のウイルス対策ソフトが出ててる
  - これがむしろ脆弱性を作り込む場合があって有害という話っぽい

- 2/17: [Twitter の React-Base Mobile Web はネイティブに匹敵する](https://www.infoq.com/news/2017/02/twitter-react-mobile-stack)
  - Twitter の PWA がいい感じらしい


## News

- 2/22: [TypeScript 2.2 リリース](https://blogs.msdn.microsoft.com/typescript/2017/02/22/announcing-typescript-2-2/)
  - `object` type 追加、`new.target` サポート etc
- 2/22: [Node v7.6.0 リリース](https://nodejs.org/en/blog/release/v7.6.0/)
  - v8 が 5.5 に

- 2/20: [RSA暗号運用でやってはいけない n のこと #ssmjp](https://www.slideshare.net/sonickun/rsa-n-ssmjp)




- [HTTP Live Streaming の解説](http://did2memo.net/2017/02/20/http-live-streaming/)
  - HLS, .ts, .m3u8 の解説
  - AbemaTV/FRESH を題材に

- 2/23: [SHAttered](https://shattered.it/)
  - SHA1 の衝突を発生させる手法が公開
  - これが色々と飛び火した
  - [Google Online Security Blog: Announcing the first SHA1 collision](https://security.googleblog.com/2017/02/announcing-first-sha1-collision.html)
  - [Cryptanalysis of SHA-1](https://www.schneier.com/blog/archives/2005/02/cryptanalysis_o.html)
  - [IIJ Security Diary: SHAttered attack (SHA-1コリジョン発見)](https://sect.iij.ad.jp/d/2017/02/271993.html)

- 2/22: [Node v7.6.0](https://nodejs.org/en/blog/release/v7.6.0/)
  - v8 to 5.5
  - libuv to 1.11.0
  - whatwg url
  - etc

- 2/22: [TypeScript 2.2](https://blogs.msdn.microsoft.com/typescript/2017/02/22/announcing-typescript-2-2/)
  - object type
  - better mixin
  - new.target
  - etc



- 2/23: [Rails 5.1.0.beta1](http://weblog.rubyonrails.org/2017/2/23/Rails-5-1-beta1/)
  - Yarn, WebPack 統合
  - jQuery を削除
  - Capybara で System tests
  - secrets の暗号化
  - form_tag/form_for が form_with に統合
  - etc


- 2/23: [Neutrino](https://hacks.mozilla.org/2017/02/using-neutrino-for-modern-javascript-development/)
  - mozilla 作 JS の preset tool

- 2/23: [WASM のロゴが決定](https://github.com/carlosbaraza/web-assembly-logo)
  - [投票結果](https://github.com/WebAssembly/design/issues/980#issue-205968264)

- 2/24: [Annotation is now a web standard](https://hypothes.is/blog/annotation-is-now-a-web-standard/)
  - [Three recommendations to enable Annotations on the Web](https://www.w3.org/blog/news/archives/6156)
  - あとで

- 2/22: [Making a Conscious Choice - Mozilla Open Design](https://blog.mozilla.org/opendesign/making-a-conscious-choice/)
  - あとで

- 2/25: [Securing Browsers Through Isolation Versus Mitigation](https://medium.com/@justin.schuh/securing-browsers-through-isolation-versus-mitigation-15f0baced2c2#.hc1zvqdsu)
  - あとで


- 2/26: [netcode.io](http://new.gafferongames.com/post/why_cant_i_send_udp_packets_from_a_browser/)
  - ブラウザで UDP を使えない理由と、使えるようにする場合の問題、それに対する netcode.io の話。

- 2/27: [Mozilla Pocket を買収](https://blog.mozilla.org/blog/2017/02/27/mozilla-acquires-pocket/)
  - ブランドは残すらしい

- 2/28: [mobile において何を計るべきかe](https://www.thinkwithgoogle.com/articles/mobile-page-speed-new-industry-benchmarks.html)
  - 記事の下にスライドがあるタイプ

- 2/28: [Sir Tim Berners Lee 来日](https://sites.google.com/keio.jp/20170313-tbl-party/)
  - 慶應義塾から名誉博士号授与
  - 3/13 (Web の誕生日前日)に来日らしい


- 3/1: [An interactive web server](https://github.com/gchaincl/httplab)
  - レスポンスを自由に変えられるサーバ
  - デモを見るとわかりやすい
  - 検証などで使いやすそう


- 2/28: [WASM のデザインがベンダ間でおおよそ合意](https://lists.w3.org/Archives/Public/public-webassembly/2017Feb/0002.html)
  - 今後は W3C で WG 作り、実装しながら色々進めて行くらしい。

- 2/27: [TLS1.3 を読めない Proxy](https://bugs.chromium.org/p/chromium/issues/detail?id=694593)
  - [Symantec の Blue Coat など](https://www.theregister.co.uk/2017/02/27/blue_coat_chokes_on_chrome_encryption_update/)
  - Google Chrome 56 で一時的に TLS1.3 を無効
  - 今後は 1.3 - 1.2 でフォールバックっぽい


- 3/1: [Mobile Web Progress 2017](https://ti.to/samsunginternet/mwp2017/en)
  - イベントがあるらしい

- 3/1: [Add &gt;link&lt; rel="modulepreload" by domenic](https://github.com/whatwg/html/pull/2383)
  - whatwg/html への提案


- 2/28: [Feature watch: ECMAScript 2018](http://www.2ality.com/2017/02/ecmascript-2018.html)
  - stage の候補や解説


- 3/1: [github/rawrtc/rawrtc](https://github.com/rawrtc/rawrtc)
  - WebRTC/ORTC の実装

- 3/1: [V8: Behind the Scenes](http://benediktmeurer.de/2017/03/01/v8-behind-the-scenes-february-edition/)
  - TurboFan の話

- 3/1: [V8 JavaScript Engine: Fast For-In in V8](https://v8project.blogspot.jp/2017/03/fast-for-in-in-v8.html)
  - V8 での for-in 最適化

- 2/28: [H2O version 2.2 beta](http://blog.kazuhooku.com/2017/02/h2o-version-22-beta-released-with-tls.html)
  - TLS 1.3 対応


- 3/1: [Rails 5.0.2](http://weblog.rubyonrails.org/2017/3/1/Rails-5-0-2-has-been-released/)

- 3/1: [AWS S3 で大規模障害](https://aws.amazon.com/message/41926/)
  - 人的ミスだったらしい





## WASM 解説シリーズ

[https://hacks.mozilla.org/](https://hacks.mozilla.org/) に [Lin Clark](http://code-cartoons.com/) が連載

- 2/28: [Where is WebAssembly now and what’s next? ★ Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2017/02/where-is-webassembly-now-and-whats-next/)
- 2/28: [What makes WebAssembly fast? ★ Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2017/02/what-makes-webassembly-fast/)
- 2/28: [Creating and working with WebAssembly modules ★ Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2017/02/creating-and-working-with-webassembly-modules/)
- 2/28: [A crash course in assembly ★ Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2017/02/a-crash-course-in-assembly/)
- 2/28: [A crash course in just\-in\-time \(JIT\) compilers ★ Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/)
- 2/28: [A cartoon intro to WebAssembly ★ Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2017/02/a-cartoon-intro-to-webassembly/)
