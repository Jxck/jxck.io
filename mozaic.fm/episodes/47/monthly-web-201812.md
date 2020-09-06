# [monthly-web][mozaic.fm] ep47 Monthly Web 201812


## Info

audio: https://files.mozaic.fm/mozaic-ep47.mp3

published_at
: 2019-01-20

guest
: [@myakura](https://twitter.com/myakura)


## Theme

第 47 回のテーマは 2018 年 12 月の Monthly Web です。


## Show Note


### Chrome 動向

- Stable: 71
- Updates
  - *New in Chrome 71*
    - <https://developers.google.com/web/updates/2018/12/nic71>
    - Displaying relative times with Intl
    - vertical underline
    - Requiring user activation for speech synthesis API.
  - *Chromium Blog: Chrome 72 Beta: Public class fields, user activation and more*
    - <https://blog.chromium.org/2018/12/chrome-72-beta-public-class-fields-user.html>
  - Introducing Background Fetch
    - <https://developers.google.com/web/updates/2018/12/background-fetch>
  - Registering as a Share Target with the Web Share Target API
    - <https://developers.google.com/web/updates/2018/12/web-share-target>
  - Badging for App Icons
    - <https://developers.google.com/web/updates/2018/12/badging-api>
  - Public and private class fields
    - <https://developers.google.com/web/updates/2018/12/class-fields>
  - The Intl.ListFormat API
    - <https://developers.google.com/web/updates/2018/12/intl-listformat>
  - I'm Awake! Stay Awake with the WakeLock API
    - <https://developers.google.com/web/updates/2018/12/wakelock>
  - Deprecations and removals in Chrome 72
    - <https://developers.google.com/web/updates/2018/12/chrome-72-deps-rems>
  - BlinkOn 10 save-the-date
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/5K4WbTlD9rI/8Um3FirABAAJ>
- Intents
  - *Ship: Stale While Revalidate*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/rspPrQHfFkI/rrhGyO4DBwAJ>
    - [blog](https://blog.jxck.io/entries/2016-04-16/stale-while-revalidate.html)
  - Ship: Spec compliant serialization for 'animation' shorthand property
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/KUelGRZP73Y/kMZcuYv7BgAJ>
  - *Ship: CSS shadow parts*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/DAmfw08GGis/-0OyBbTmBgAJ>
    - `part="foo"` と `::part(for)` で ShowTree の中身を外に出す
  - *Ship: Object.fromEntries()*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/TT5_9N2r5ow/AXnk-VPXBQAJ>
  - Ship: touched attribute on GamepadButton
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/pc5Jx9qcEJo/JyFBJTbXBQAJ>
  - Ship: Transform list interpolation
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/26p_kUZNLj0/rzWN-m-yBQAJ>
  - *Ship: Constructable Stylesheet Objects*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/gL2EVBzO5og/YfId9-vqBAAJ>
  - Ship: Treat Document Level Wheel/Mousewheel Event Listeners as Passive
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/PJZbHO7621s/PDkYsushCAAJ>
  - Ship: CanvasRenderingContext2D.getContextAttributes()
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/IcxDgEnEEIs/eWc-OXUGDQAJ>
  - Implement and Ship: PerformanceObserver.supportedEntryTypes
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/XZU_DhQ9ZGs/whPNC357BQAJ>
  - Implement and Ship: RTCConfiguration.offerExtmapAllowMixed
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/7z3uvp0-ZAc/8Z7qpp71BgAJ>
  - *Implement and Ship: UIAutomation Provider Mappings*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/h4HTt4M5dWo/3P2jNGIwBgAJ>
    - Microsoft UI Automation (UIA) をマッピングし、 Assistive Technology (AT) などができることを増やす
  - Implement and Ship: CSS: Use the response URL for base URL and response type for security decisions
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/7OSy00oxVpk/siufiQVBBwAJ>
  - Implement and Ship: Feature Policy JS Introspection API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/qwLRSNFsfUQ/ZhxYYusjCAAJ>
  - *Implement: Scroll Timeline for Web Animations (JS only)*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/8V4ixKVmNY4/vJQdo9GCBgAJ>
  - Implement: Web Bluetooth Scanning
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/aVxGkVQ2xRk/iYw0yIB4CQAJ>
  - *Implement: Media Queries: prefers-color-scheme feature*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Muw0N43ntSw/WZZZI7w7DQAJ>
    - [blog](https://blog.jxck.io/entries/2018-11-10/dark-mode-via-prefers-color-scheme.html)
  - Experiment:
  - Change:
  - Undeprecate and Retain: PPAPI (Pepper) WebSocket
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/lWNvY56OAYs/9IoQx_ncDQAJ>
    - 消そうと思ったけどユーザが多かった
    - エミュレーション作ってもメンテが大変だから戻すことにした
    - いずれユーザが移行したら消したい
  - Remove:
  - Deprecated and Remove: XMLHttpRequest for FTP resources
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/evZbY6LFq_s/Jrpqwi_dAQAJ>
  - *Deprecate and Remove: Atomics.wake*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/_zPuM7ETNSE/9Iu-r-XWDwAJ>
    - ECMAScript の仕様上 Atomics.notify に rename されている
    - Spectre 関連で SharedArrayBuffer と Atomics が Unship されてる間の変更なので、リスクは少ないとのこと
    - <https://github.com/tc39/ecma262/pull/1220>
  - Deprecate and Remove: Custom cursors with dimensions greater than 64 DIP
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/e0bzxOfL-2I/_G0ohB29DAAJ>
  - Deprecate and Remove: PPB_Compositor/PPB_CompositorLayer Pepper API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/gwocKqRuXvw/aEXJORBvDAAJ>
  - Extend Origin Trial: lowLatency canvas contexts
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/9yCtIXtw_Qw/PA2bXNQOBwAJ>
  - *Extend Origin Trial: Signed HTTP Exchanges*
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/gJB_mlA6joQ/XUIPLvryBgAJ>
  - Extend Origin Trial RTCPeerConnection.id
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/OXIHwnuVJRc/k2bBnEbBBAAJ>
  - Extend Origin Trial: Picking echo canceller for getUserMedia
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/ymkFZ_zwrAU/19he3idKBQAJ>
  - Experiment: RTCQuicTransport & RTCIceTransport
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/xXf23VY_8uM/lDBcbf8KAgAJ>
  - Experiment: Badging API
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/KEUnHsvulEU/tMzKbzHxBQAJ>
  - PSA: Changing XHR's fallback encoding to UTF-8 when invalid encoding is specified
    - <https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/SylOtRH8bIc/c8A06VPXBQAJ>
- Team Weekly Snippet
  - なし
- v8
  - v8 blog
    - なし
- Other
  - The Official AMP Plugin for WordPress
    - <https://amphtml.wordpress.com/2018/12/07/the-official-amp-plugin-for-wordpress/>
  - *Contributing to WebKit for a more predictable web platform*
    - <https://amphtml.wordpress.com/2018/12/06/contributing-to-webkit-for-a-more-predictable-web-platform/>
    - AMP チームが Igalia と組んで、 iOS の WebKit を改善してきた記録
  - Why AddThis chose to integrate with AMP
    - <https://amphtml.wordpress.com/2018/12/13/why-addthis-chose-to-integrate-with-amp/>
  - *Experimenting with the Wake Lock API*
    - <https://medium.com/dev-channel/experimenting-with-the-wake-lock-api-b6f42e0a089f>
    - *Project Fugu の一環*
    - <https://bugs.chromium.org/p/chromium/issues/list?q=label:Proj-Fugu>
  - *Origin Trials*
    - <https://developers.chrome.com/origintrials/>
    - (取りこぼし) Origin Trials の一覧
    - 実施中のものから終わったもの、自分が参加したものも見られる


### Firefox 動向

- Stable: 64
- Updates
  - Firefox Coming to the Windows 10 on Qualcomm Snapdragon Devices Ecosystem
    - <https://blog.mozilla.org/futurereleases/2018/12/06/firefox-coming-to-the-windows-10-on-qualcomm-snapdragon-devices-ecosystem/>
  - Firefox 64 Released - Mozilla Hacks - the Web developer blog
    - <https://hacks.mozilla.org/2018/12/firefox-64-released/>
    - prefers reduced-motion.
    - Fullscreen API unprefixed
    - -webkit-appearance
    - Symantec CA Distrust
  - Firefox 64 for developers
    - <https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/64>
- Intents
  - Ship: InputEvent.inputType (with Input Events Level 1)
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/qqPRzzvkAE0/28u0Nl-2CAAJ>
  - *Ship: Storage Access API*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/BZ36ZDV0Fik/i5ZtGyN8CgAJ>
  - *Implement and Ship: UTF-8 autodetection for HTML and plain text loaded from file: URLs*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/jXpEKnsUCuU/vHyoxhOZBgAJ>
  - Implement and Ship: break-before, break-after, break-inside CSS properties
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/pZBNiEwBhyA/KMjTYg6zBQAJ>
  - Implement and Ship: forced case-sensitive attribute selector matching
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/NMpix5gqXlY/dbvk94zuBgAJ>
  - *Implement and Ship: Overflow media queries*
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/0XQjow3t5vY/tmgRdojAAgAJ>
  - Implement: TextEncoder.encodeInto() - UTF-8 encode into caller-provided buffer
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/gyzIVfQD_PA/XI3Cb934CQAJ>
  - Unship: x-moz-errormessage attribute
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/LDNiOssSN3U/jwxytRCCCAAJ>
  - Ship:
  - Implement & Ship:
  - Experiment:
  - Change:
  - Remove:
- Site Compat
  - RTCIceCandidateStats has been updated to the latest spec
    - <https://www.fxsitecompat.com/en-CA/docs/2018/rtcicecandidatestats-has-been-updated-to-the-latest-spec/>
  - Non-printable keys no longer fire keypress event (Affecting)
    - <https://www.fxsitecompat.com/en-CA/docs/2018/non-printable-keys-no-longer-fire-keypress-event/>
  - keydown and keyup events are now fired during IME composition
    - <https://www.fxsitecompat.com/en-CA/docs/2018/keydown-and-keyup-events-are-now-fired-during-ime-composition/>
  - Support for window.event and Event.returnValue has been added again (Affecting)
    - <https://www.fxsitecompat.com/en-CA/docs/2018/support-for-window-event-and-event-returnvalue-has-been-added-again/>
  - DataView.length is now 1 instead of 3
    - <https://www.fxsitecompat.com/en-CA/docs/2018/dataview-length-is-now-1-instead-of-3/>
  - window.open() can now be called only once per event
    - <https://www.fxsitecompat.com/en-CA/docs/2018/window-open-can-now-be-called-only-once-per-event/>
- Other
  - Goodbye, EdgeHTML - The Mozilla Blog
    - <https://blog.mozilla.org/blog/2018/12/06/goodbye-edge/>
  - This year in web-platform-tests - 2018 Edition
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/M1EC3Wx3-I0/cnoUXRa4BQAJ>
  - Next Year in web-platform-tests - 2018/19 Edition
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/89h3aip8NhI/A7Ur2Cm4BQAJ>
  - Why Build Progressive Web Apps: If It's Just a Bookmark, It's not a PWA!-Video Write-Up
    - <https://medium.com/dev-channel/why-build-progressive-web-apps-if-its-just-a-bookmark-it-s-not-a-pwa-video-write-up-7ccca1c58034>
  - MDN Changelog for November 2018 - Mozilla Hacks - the Web developer blog
    - <https://hacks.mozilla.org/2018/12/mdn-changelog-for-november-2018/>
  - *MOSS 2018 Year in Review*
    - <https://blog.mozilla.org/blog/2019/01/03/moss-2018-year-in-review/>
    - 2018 年は 40 を超える OSS プロジェクトに $970,000 を出資(寄付)した
  - *Mozilla Announces Deal to Bring Firefox Reality to HTC VIVE Devices*
    - <https://blog.mozilla.org/blog/2019/01/08/mozilla-announces-deal-to-bring-firefox-reality-to-htc-vive-devices/>
    - Firefox Reality = immersive コンテンツに特化した browser
    - これを HTC Vive と手を組んでやってくことに
  - *Mozilla Hacks' 10 most-read posts of 2018*
    - <https://hacks.mozilla.org/2018/12/mozilla-hacks-10-most-read-posts-of-2018/>
    - もっとも読まれた記事
    - cartoons はやっぱり強かった


### Safari 動向

- Stable: 12.0.2
- Release Notes for Safari Technology Preview 71
  - <https://webkit.org/blog/8517/release-notes-for-safari-technology-preview-71/>
  - Support `supported-color-schemes`
  - Update `prefers-color-scheme`
  - Enabled Web Animations by default in the Experimental Features menu
  - Enabled Intersection Observer by default in the Experimental Features menu
  - Added Web Authentication as an experimental feature with support for USB-based CTAP2 devices
  - Changed CSS Painting API to pass size, arguments, and input properties to the paint callback
  - Unprefixed text-decoration CSS3 properties
  - Required `<iframe allow="display">` for an iframe to use getDisplayMedia
  - Added BigInt support into ValueAdd
- Release Notes for Safari Technology Preview 72
  - <https://webkit.org/blog/8547/release-notes-for-safari-technology-preview-72/>
  - Added support for CTAP HID authenticators on macOS (r238729)
  - Added CSS Painting API support for multiple worklets. (r239067)
  - Added support for firing the devicechange event when more capture device information is revealed when getUserMedia is granted by user (r238796)
  - Enabled .mjs content when loaded from `file://` (r238673)
  - Added BigInt support for logic operations (r238861)
  - Implemented BigInt support for `<<` and `>>` (r238790)
- Other


### Edge 動向

- Stable: 44.17 / 18
- *Microsoft Edge and Chromium Open Source: Our Intent*
  - Microsoft Edge: Making the web better through more open source collaboration
    - <https://blogs.windows.com/windowsexperience/2018/12/06/microsoft-edge-making-the-web-better-through-more-open-source-collaboration/>
    - <https://blogs.windows.com/msedgedev/2018/12/07/recapping-open-source-announcements/>
    - <https://github.com/MicrosoftEdge/MSEdge>
    - <https://github.com/MicrosoftEdge/MSEdge/blob/master/README.md>
    - <https://github.com/Microsoft/ChakraCore/issues/5865>
    - 事前に報道されていた噂から数日、公式からアナウンス
    - Edge を Chromium ベースに
    - Blink と V8 を採用
    - ChakraCore は新しい Edge では使わないがメンテナンスは継続する
- Status Updates
  - <https://github.com/MicrosoftEdge/Status/compare/production@{2018-12-01}...production@{2019-01-01}>
  - N/A
- EdgeHTML
  - <https://aka.ms/devguide_edgehtml_18>
- Build Changelog
  - <https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/>
- Chakra
  - Release ChakraCore v1.11.4 · Microsoft/ChakraCore
    - <https://github.com/Microsoft/ChakraCore/releases/tag/v1.11.4>
- Other
  - Announcing Windows 10 Insider Preview Build 18298
    - <https://blogs.windows.com/windowsexperience/2018/12/10/announcing-windows-10-insider-preview-build-18298/>
  - Google は Microsoft Edge を蹴落とすために YouTube を意図的にイジっていたと Edge の開発者が指摘 - GIGAZINE
    - <https://gigazine.net/news/20181219-microsoft-edge-html-chromium/>
    - <https://news.ycombinator.com/item?id=18697824>
  - JAPAN IE Support Team Blog 終了のお知らせ
    - <https://blogs.technet.microsoft.com/jpieblog/2018/12/30/japan-ie-support-team-blog-%E7%B5%82%E4%BA%86%E3%81%AE%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B/>
    - Edge/Internet Explorer (IE) サポートチーム フォーラムへ移行するらしい
    - 今後も味のあるポエムが続くことを期待したい
    - フォーラムは RSS が無いようなのでどう watch するか
    - あった


### WHATWG/W3C 動向

- Recommendation
  - Accessible Name and Description Computation 1.1 is a W3C Recommendation
    - <https://www.w3.org/blog/news/archives/7451>
- Proposed Recommendation
- Candidate Recommendation
  - W3C Invites Implementations of Geometry Interfaces Module Level 1; CSS Fragmentation Module Level 3
    - <https://www.w3.org/blog/news/archives/7421>
  - *W3C Invites Implementations of Pointer Events 2*
    - <https://www.w3.org/blog/news/archives/7435>
- Working Draft
- First Public Working Draft
  - First Public Working Draft: WebRTC Next Version Use Cases
    - <https://www.w3.org/blog/news/archives/7433>
  - Two Working Drafts Published by the Cognitive and Learning Disabilities Accessibility Task Force
    - <https://www.w3.org/blog/news/archives/7431>
  - First Public Working Drafts: The Profiles Ontology; Content Negotiation by Profile
    - <https://www.w3.org/blog/news/archives/7454>
  - First Public Working Draft: CSS Fragmentation Module Level 4
    - <https://www.w3.org/blog/news/archives/7456>
- Chartering
  - Web Video Map Tracks (WebVMT) Community Group created
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Dec/0003.html>
  - Web Fonts Working Group Revised Charter Approved; Call for Participation
    - <https://lists.w3.org/Archives/Public/public-webfonts-wg/2018Dec/0000.html>
  - Scalable Vector Graphics (SVG) Working Group (until 2019-01-25)
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Dec/0006.html>
  - Proposed W3C Charter: Secure Web Payments Interest Group (until 2019-01-23)
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Dec/0008.html>
  - Proposed W3C Charter: SVG Working Group
    - <https://groups.google.com/forum/#!msg/mozilla.dev.platform/CuW-Avj4P0Q/BnJQRG7XAgAJ>
  - Patents and Standards Interest Group (PSIG) Charter Extended
    - <http://lists.w3.org/Archives/Public/public-new-work/2018Dec/0013.html>
  - Privacy Interest Group (PING) Charter Extended
    - <http://lists.w3.org/Archives/Public/public-new-work/2018Dec/0012.html>
  - Web Application Security Working Group Charter Extended
    - <http://lists.w3.org/Archives/Public/public-new-work/2018Dec/0011.html>
  - Web Audio Working Group Charter Extended
    - <http://lists.w3.org/Archives/Public/public-new-work/2018Dec/0010.html>
  - ceddl html attribute-based markup and javascript api Community Group created
    - <https://lists.w3.org/Archives/Public/public-new-work/2019Jan/0003.html>
  - Computational Legal Decision Support Community Group created
    - <https://lists.w3.org/Archives/Public/public-new-work/2019Jan/0002.html>
  - Knowledge Graph Construction Community Group created
    - <https://lists.w3.org/Archives/Public/public-new-work/2019Jan/0001.html>
  - Patents and Standards Interest Group (PSIG) Charter Extended until 31 March 2019
    - <https://lists.w3.org/Archives/Public/public-new-work/2018Dec/0013.html>
- Other
  - *Result of call for adoption - WEBRTC-QUIC*
    - <https://lists.w3.org/Archives/Public/public-webrtc/2018Dec/0013.html>
    - とりあえず QUIC 用の API を出すには早い
    - プロトコルの要求ではなく、ユーザの要望に答えるべき
  - `sec-metadata` . Issue #280 . w3ctag/design-reviews
    - <https://github.com/w3ctag/design-reviews/issues/280#issuecomment-439815581>
    - sec-metadata を細かく分離する
  - DRAFT 2017 Web Application Security Working Group
    - <https://w3c.github.io/webappsec/admin/webappsec-charter-2019.html>
  - *Alice Boxhall for W3C TAG - Infrequently Noted*
    - <https://infrequently.org/2018/12/alice-boxhall-for-w3c-tag/>
    - Alex Russell が 6 年務めた TAG を去る
    - 次の Election で Alice Boxhall (@sundress) を推薦
  - *W3C Advisory Committee Elects Technical Architecture Group*
    - <https://www.w3.org/blog/news/archives/7480>
    - TAG の election が終わった
    - 当選
      - Alice Boxhall (Google)
      - Theresa O'Connor (Apple)
    - 継続
      - Daniel Appelquist (Samsung Electronics; co-Chair)
      - David Baron (Mozilla Foundation)
      - Hadley Beeman (W3C Invited Expert)
      - Kenneth Rohde Christiansen (Intel Corporation)
      - Peter Linss (W3C Invited Expert; co-Chair)
      - Lukasz Olejnik (W3C Invited Expert)
    - 任期終了
      - *Travis Leithead (Microsoft)*
      - *Alex Russell (Google)*
  - New version of the Roadmap of Web Applications on Mobile
    - <https://www.w3.org/blog/news/archives/7475>


### TC39 動向

- Proposals Diff
  - <https://github.com/tc39/proposals/compare/master@{2018-12-01}...master@{2019-01-01}>
  - 0->1
  - 1->2
  - 2->3
  - 3->4
  - 特に無い
- New Proposals


### IETF 動向

- IETF
- RFC
- IETF Last Call
- WG Last Call
- Call for Adoption
- I-D Action
- Draft
  - A JSON Meta Application Protocol (JMAP) Subprotocol for WebSocket
    - <https://tools.ietf.org/html/draft-ietf-jmap-websocket-00>
  - Intentional SYN Drop for mitigation against SYN flooding attacks
    - <https://tools.ietf.org/html/draft-park-tcpm-intentional-syn-drop-option-00>
  - Authenticated Handshake for QUIC
    - <https://tools.ietf.org/html/draft-kazuho-quic-authenticated-handshake-00>
  - *The PRELOAD Frame Extension*
    - <https://tools.ietf.org/html/draft-goto-httpbis-preload-frame-00>
  - *Request Header Originated With*
    - <https://tools.ietf.org/html/draft-request-header-originated-with-00>
    - どこからかを表示
    - Sec-Metadata と被ってる感じ
  - *Cryptographic Hyperlinks*
    - <https://tools.ietf.org/html/draft-sporny-hashlink-00>
    - URL にコンテンツのハッシュを `?hl=` で含む
    - ファイルのハッシュを別に書いておくよくある場面を想定
  - *The Multibase Data Format*
    - <https://tools.ietf.org/html/draft-multiformats-multibase-00>
    - base encoding は base32, base58, base64 など色々ある
    - 結果だけ見てもどれでエンコードしたかわからないので見分ける仕組みを
- Other


### セキュリティ動向

- *J-STAGE が Firefox でのアクセスを遮断、日本の電子ジャーナルが世界から不可視となった日*
  - <https://note.mu/note_s/n/n517ff243e083>
  - TLS1.2 対応と 1.0/1.1 の削除をセキュリティのために行った
  - しかし必須の暗号スイートに対応してないためネゴシエーションできない
  - まるでブラウザの方が悪いかのような言い方をしていた
  - 一旦ロールバックし復旧
- *DNS over TLS: Encrypting DNS end-to-end - Facebook Code*
  - <https://code.fb.com/security/dns-over-tls/>
  - Cloudflare と組んで検証
  - 良い結果が得られた
- ImperialViolet - Zero-knowledge attestation
  - <https://www.imperialviolet.org/2019/01/01/zkattestation.html>


### 周辺動向

- *Hummingbird: Building Flutter for the Web - Flutter*
  - <https://medium.com/flutter-io/hummingbird-building-flutter-for-the-web-e687c2a023a8>
  - <https://developers.googleblog.com/2018/12/flutter-10-googles-portable-ui-toolkit.html>
- What's on the NativeScript Roadmap for 2019?
  - <https://www.nativescript.org/blog/whats-on-the-nativescript-roadmap-for-2019>
- How Terrarium reframes the compiler and sandbox relationship
  - <https://www.fastly.com/blog/terrarium-reframes-compiler-sandbox-relationship>
  - エディタでコードを書きそのまま WASM でコンパイルしてデプロイする
- Edge programming with Rust and WebAssembly
  - <https://www.fastly.com/blog/edge-programming-rust-web-assembly>
- What happens when packages go bad? - JakeArchibald.com
  - <https://jakearchibald.com/2018/when-packages-go-bad/>
- *Basilisk web browser*
  - <https://www.basilisk-browser.org/>
  - A XUL-based web-browser demonstrating the Unified XUL Platform (UXP).
  - This browser is a close twin to pre-Servo Firefox in how it operates.


### イベント

- 3 月
- 4 月
  - 9-10: BlinkOn 10
    - <https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/5K4WbTlD9rI>
  - 17-18: AMP Conf 2019: Tokyo
    - <https://amphtml.wordpress.com/2019/01/08/announcing-amp-conf-2019-tokyo/>
