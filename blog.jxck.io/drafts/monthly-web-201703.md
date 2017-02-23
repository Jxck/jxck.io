# [monthly][web] Monthly Web 2017/03

## Intro

今月の Web メモ

## Browser

### Chrome

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



## News

- 2/22: [TypeScript 2.2 リリース](https://blogs.msdn.microsoft.com/typescript/2017/02/22/announcing-typescript-2-2/)
  - `object` type 追加、`new.target` サポート etc
- 2/22: [Node v7.6.0 リリース](https://nodejs.org/en/blog/release/v7.6.0/)
  - v8 が 5.5 に

- 2/20: [RSA暗号運用でやってはいけない n のこと #ssmjp](https://www.slideshare.net/sonickun/rsa-n-ssmjp)




- [HTTP Live Streaming の解説](http://did2memo.net/2017/02/20/http-live-streaming/)
  - HLS, .ts, .m3u8 の解説
  - AbemaTV/FRESH を題材に
