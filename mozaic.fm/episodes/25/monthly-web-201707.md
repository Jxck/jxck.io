# [monthly-web][mozaic.fm] ep25 Monthly Web 201707


## Info

audio: https://files.mozaic.fm/mozaic-ep25.mp3

published_at
: 2017-07-29

guest
: [@myakura](https://twitter.com/myakura)


## Theme

第 25 回のテーマは 2017 年 7 月の Monthly Web です。

これまでの mozaic.fm では、特定のテーマについて毎回違うゲストと議論をしてきました。

しかし、このテーマの設定と消化よりもよほど早い勢いで、細かいかつ重大なトピックは日々生まれており、その流れを扱うことはできないかずっと考えていました。

そこで、特定のテーマを深掘りするのとは別に、およそ月単位で、大局的な Web の流れについても扱う Monthly Web を始めてみようと思います。

目的は、速報ではありません。単なるニュースのまとめをするというよりも、そこまでにあった流れをまとめながら *Web のスナップショット* を取っていくようなイメージです。

名前に反し、本当に月一でできるかはわからないし、どこまで続けられるかはわかりませんが、やりながら考えて進めて行こうと思います。

一方で、 mozaic.fm は月間情報チャンネルになるわけではないので、通常のテーマ回は今まで通りやっていこうと思っています。

テーマ回であれ Monthly Web であれ、 Podcast を通して mozaic.fm でやりたいことは変わっていません。

Web をより深く理解するために

- *今何が起こっているのか*
- *これからどうなっていくのか*

について、議論していければと思っています。


## Show Note


### Chrome 動向

- Chrome 59
  - <https://blog.chromium.org/2017/05/chrome-59-beta-headless-chromium-native.html>
  - Headless Chrome
  - Native notifications on macOS
  - Service Worker Navigation Preload (書いてなかったので [blog 書いた](https://blog.jxck.io/entries/2017-08-05/navigation-preload.html))
  - full screen capture
- Chrome 60 Stable
  - Chrome 60 Beta: Paint Timing API, CSS font-display, and Credential Management API improvements
    - <https://blog.chromium.org/2017/06/chrome-60-beta-paint-timing-api-css.html>
    - Paint API
    - Credential Management API improvements
    - Budget API ([blog](https://blog.jxck.io/entries/2017-06-12/web-budget-api.html))
    - Lighthouse in Devtools Audits
    - 3rd party badges
- Chrome 60.0.3312 Beta
- Chrome 61.0.3163 Dev
  - What's New In DevTools (Chrome 61)
    - <https://developers.google.com/web/updates/2017/07/devtools-release-notes>
    - storage usage in dev tools
    - cache timestamp
    - mobile device throttling simulation
    - Web Share API enable by default
    - Expect-CT header
- Chrome 62.0.3167 Canary


### Firefox 動向

- Firefox 54 Stable
  - <https://developer.mozilla.org/en-US/Firefox/Releases/54>
  - <https://www.fxsitecompat.com/en-CA/versions/54/>
  - <https://www.mozilla.org/en-US/firefox/54.0/releasenotes/>
- Firefox 55 Beta
  - <https://developer.mozilla.org/en-US/Firefox/Releases/55>
  - <https://www.fxsitecompat.com/en-CA/versions/55>
  - Async generator methods are now supported
  - requestIdleCallback API
- Firefox 56 Nightly
  - <https://developer.mozilla.org/en-US/Firefox/Releases/56>
  - <https://www.fxsitecompat.com/en-CA/versions/56>
    - Implemented `<link rel="preload">` ([blog](https://blog.jxck.io/entries/2016-03-04/preload.html))
  - <https://blog.nightly.mozilla.org/2017/07/17/preview-storage-api-in-firefox-nightly/>
    - storage api の preview
- Firefox 57 Nightly
  - <https://blog.nightly.mozilla.org/2017/07/25/stylo-is-ready-for-community-testing-on-nightly/>
  - stylo rendering engine


### Safari 動向

- Safari Technology Preview 35
  - <https://webkit.org/blog/7786/release-notes-for-safari-technology-preview-35/>
  - <https://developer.apple.com/safari/technology-preview/release-notes/>
- Safari Technology Preview 36
  - <https://webkit.org/blog/7833/release-notes-for-safari-technology-preview-36/>
  - Implemented Object Spread


### Edge 動向

- Release date: 07/07/2017 build 16237
  - <https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/desktop/16237/>
  - Unprefixed CSS Grid is now enabled by default
- Windows Insider Preview (Fast) build 16241 
  - <https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/desktop/16241/>
  - Service Worker?
    - <https://twitter.com/tomayac/status/889863448368205824>
- Windows Insider Preview (Fast) build 16251
  - <https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/desktop/16251/>
- Save the date: Microsoft Edge Web Summit 2017 comes to Seattle on September 13th
  - <https://blogs.windows.com/msedgedev/2017/06/20/save-the-date-edge-web-summit-2017-september-13th-seattle/>


### 標準動向

- ES2017 published
  - <https://hackernoon.com/es8-was-released-and-here-are-its-main-new-features-ee9c394adf66>
  - string padding
  - Object.values and Object.entries
  - Object.getOwnPropertyDescriptors
  - Trailing commas in function parameter lists and calls
  - Async functions
  - Shared memory and atomics (Jxck がど忘れした言葉は race condition でした)
- tc39/proposal-pattern-matching
  - <https://github.com/tc39/proposal-pattern-matching>
  - stage 0
- buckton/proposal-partial-application
  - <https://github.com/rbuckton/proposal-partial-application>
  - stage 0
- tc39/proposal-bigint
  - <https://github.com/tc39/proposal-bigint>
  - stage 3
- byte-storage proposal
  - <https://github.com/jakearchibald/byte-storage>
- Allow constructing and subclassing EventTarget
  - <https://github.com/whatwg/dom/commit/c4c1c8b47340a1e5ecc1a07670927b831f240586>
  - [blog](https://blog.jxck.io/entries/2017-07-10/subclassible-eventtarget.html)
- Dev 向け HTML Spec
  - <https://html.spec.whatwg.org/dev/>
  - <https://blog.whatwg.org/developers-edition-comeback>
- WHATWG の spec が offline 対応
  - <https://github.com/whatwg/resources.whatwg.org/commit/bd7900e6d3028954fb9e5fe3eca53eea82a59718>
- MDN redesing
  - <https://hacks.mozilla.org/2017/07/the-mdn-redesign-behind-the-scenes/>
  - open sans から Zilla Slab
  - code samples を上の方に手作業で移していく
  - compat table を mobile/pc で side by side に
- whatwg to w3c コピペ問題
  - <https://github.com/w3c/charter-html/issues/145>
  - <https://diffofhtmls.herokuapp.com/>


### 周辺動向

- Apple Engineers Join WebVR Community Group
  - <https://www.vrfocus.com/2017/07/apple-engineers-join-webvr-community-group/>
- [webkit-dev] Service workers
  - Apple の「Under Consideration」は文字通り検討してるよとの発言
  - <https://lists.webkit.org/pipermail/webkit-dev/2017-July/029285.html>
- Consider implementing W3C Payment Request API
  - <https://trac.webkit.org/changeset/219848/webkit>
  - safari で payment request が under consideration
- Fixing The Web
  - <https://www.youtube.com/watch?v=WBgsRyvEPJM>
  - <https://www.w3.org/blog/2017/07/fixing-the-web-with-jeff-jaffe-brewster-kahle-and-steven-gordon/>
- Mozilla Japan が WebDINO Japan へ
  - <https://www.webdino.org/>
- IETF プラハ
  - WebPackaging が Dispatch に上がった
- 東アジア(日本, 韓国, 中国)における HTTPS がまだまだ、な論文
  - <https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/46197.pdf>
- TLS1.3 とエンタープライズ
  - <https://www.cs.uic.edu/~s/musings/tls13-enterprises/>
- Net Neutrality DEMO の呼びかけ by Sir TBL
  - <https://youtu.be/5Gh0NIQ3yd0>
- Web and Chrome Developer Relations manifesto by Paul Kinlan
  - <https://paul.kinlan.me/web-developer-relations-manifesto/>
- Wildcard Certificates Coming January 2018 / Let's Encrypt
  - <https://letsencrypt.org//2017/07/06/wildcard-certificates-coming-jan-2018.html>
- Flash 2020
  - <https://blogs.adobe.com/conversations/2017/07/adobe-flash-update.html>
  - chrome: <https://blog.chromium.org/2017/07/so-long-and-thanks-for-all-flash.html>
  - edge: <https://blogs.windows.com/msedgedev/2017/07/25/flash-on-windows-timeline/>
  - Mozilla: <https://blog.mozilla.org/futurereleases/2017/07/25/firefox-roadmap-flash-end-life/>
  - Apple: <https://webkit.org/blog/7839/adobe-announces-flash-distribution-and-updates-to-end/>
  - Facebook: <https://developers.facebook.com/blog/post/2017/07/25/Games-Migration-to-Open-Web-Standards/>


### イベント

- 7 月
  - IETF99
    - <https://www.ietf.org/meeting/99/index.html>
    - <https://github.com/httpwg/wg-materials/blob/gh-pages/ietf99/minutes.md>
    - TLS1.3, QUIC, WebPackaging
  - TC39
    - <https://github.com/tc39/agendas/blob/master/2017/07.md>
    - pattern match
    - binary ast
    - pipeline
    - あたりが話し合われる
  - TAG Meeting in London
    - <https://ti.to/w3c-tag/meet-the-tag-london-july-2017/en>
    - 事前に AMP に関するテレコンがあった
      - <https://github.com/w3ctag/meetings/blob/gh-pages/2017/telcons/07-18-agenda.md>
- 8 月
  - Polymer Summit 2017 in コペンハーゲン
    - <https://summit.polymer-project.org/>
- 9 月
  - Edge Summit (9/13)
    - <https://summit.microsoftedge.com/>
  - Moz Fest (10/27-29)
    - <https://mozillafestival.org/>
