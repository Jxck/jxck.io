# [monthly-web][mozaic.fm] ep46 Yearly Web 2018

## Info

audio: https://files.mozaic.fm/mozaic-ep46.mp3

- published_at: 2018-12-16
- guest: [@myakura](https://twitter.com/myakura)


## Theme

第 46 回のテーマは 2018 年の Yearly Web です。

今年行った Monthly Web を振り返ります。

また、収録直前に公表された Microsoft EdgeHTML の開発中止と Edge の Chromium ベースへの移行についても冒頭で話しています。


## Show Note


### Microsoft Edge が Chromium ベースに

- Microsoft Edge: Making the web better through more open source collaboration
  - <https://blogs.windows.com/windowsexperience/2018/12/06/microsoft-edge-making-the-web-better-through-more-open-source-collaboration/>
  - <https://blogs.windows.com/msedgedev/2018/12/07/recapping-open-source-announcements/>
  - <https://github.com/MicrosoftEdge/MSEdge>
  - <https://github.com/MicrosoftEdge/MSEdge/blob/master/README.md>
  - <https://github.com/Microsoft/ChakraCore/issues/5865>
  - 事前に報道されていた噂から数日、公式からアナウンス
  - Edge を Chromium ベースにしていく
  - EdgeHTML は終了
  - ChakraCore は Edge には使われないものの、開発は続ける(メンテナンスモード)
- Microsoft Edge: Explainers
  - <https://github.com/MicrosoftEdge/MSEdgeExplainers>
  - Edge チームからの貢献内容についてのまとめ場所
- Hummingbird: Building Flutter for the Web - Flutter
  - <https://medium.com/flutter-io/hummingbird-building-flutter-for-the-web-e687c2a023a8>


### 2018 年のキーワード


#### Jxck

- cross origin infoleaks
- logical / physical url
- layered apis
- off the main thread
- intelligent tracking prevention
- permission & userconsent & feature policy
- distrust symantec
- template instantiation
- dns over https
- smoosh gate
- mozilla standard position
- first input delay
- coinhive


#### myakura

- deprecation (+ removals)
- chrome
- amp
- wicg (+ origin trials)
- layered apis
- apple
- privacy/security
- whatwg+w3c
- symantec distrust
- compatibility


### 1 月

- Spectre/Meltdown
- Chrome
  - Fetch API Keepalive
  - Fetch Cancelation
  - display contents
  - AMP letter
- Firefox
  - Introducing the MDN Product Advisory Board
    - 昨年末 MDN がクロスベンダーなプロジェクトになり Advisory Board ができた
    - 2018 年は Compat Data の整備を行う
  - CSS 2018 Priorities
    - <https://wiki.mozilla.org/CSS#2018_Priorities>
    - (High) Containment
    - (High) Media Queries 4
    - (Mid) Container Queries Prerequisites
    - (Mid) Multi-column
    - (Low) text-decoration-skip
    - (Low) Houdini
- Safari
  - StorageAccess API
  - Freezing User-Agent
- Edge
  - CSS backdrop-filter
  - Subresource integrity
- WHATWG/W3C
  - HTML 5.2 Recommendation
  - WAI-ARIA 1.1
  - TAG Election
- TC39
  - ECMAScript 2018 final feature set
  - Async Iteration
  - Rest/Spread Properties
  - etc etc
- IETF
  - RFC 8297 on An HTTP Status Code for Indicating Hints (103 Early Hints)
- 周辺動向
  - ACMEv2 で Let's Encrypt が WildCard サポート
  - Apple が AV1 にジョイン


### 2 月

- Chrome
  - AMP for Email
- Firefox
- Safari
  - Storage Access API##
- Edge
  - IE でショートカットキー抑止無効
  - Office 365 TLS 1.2 以前の削除を 18/10/31 に延期
- WHATWG/W3C
  - text-decoration-skip-ink のデフォルト挙動が変わって混乱
- TC39
- IETF
- 周辺動向
  - 3rd Party CSS でキーロガーができる話


### 3 月

- Chrome
  - Ship WebAuthN API
- Mozilla
  - Standard Position
  - DoH with Cloudflare
- Safari
  - 11.1 release
  - Service Worker
  - Payment Request
  - Beacon API
  - display: contents
  - Web App Manifest
  - Subresource Integrity
  - Storage Access API
  - etc etc etc
  - ITP 1.1
- Esge
  - Devtools Protocol Support 開始
  - Flash 対応の今後について
- TC39
  - #SmooshGate
    - flatten が mootools 非互換
    - smoosh にして議論
- IETF
  - IETF 101 London
  - RFC8336 The ORIGIN HTTP/2 Frame
  - WebPackaging Side Meeting
- 周辺
  - Japan GPKI が Mozilla から棄却
  - Trustico が 23000 の証明書を意図的に DigiCert に送りつけ無効化させる
    - Trustico は Symantec の再販をしていた
    - Symantec は DigiCert に売却した
    - Trustico は DigiCert  とは取引せず Comodo の再販を始めた
    - 既存顧客の Symantec 証明書は無効にして Comodo に移って欲しかった
    - そこで意図的に漏洩して無効化させようとしたらしいとされている
  - 総務省のセキュリティガイドラインでパスワード定期変更不要となった
  - ACME v2 で Wildcard サポート
  - Cloudflare が SW サポート


### 4 月

- Chrome
  - Chrome 66
  - BlinkOn 9
  - Layered APIs
  - CORB
  - GCM の Push から Firebase の Push へ移行開始
- Firefox
- Safari
  - User-Agent の固定やめた
- Edge
  - sonarwhal v1(その後に webhint に改名)
- TC39
  - TC39 に大きなゴールが無い問題 by @awbjs
- IETF
  - HTTP Variants
- 周辺
  - 1.1.1.1 アナウンス
  - 漫画村とブロッキングに対する声明
  - Yahoo! Japan TLS 1.0/1.1 切る発表


### 5 月

- GDPR (5/25)
- Chrome
  - Google I/O
  - Google URL Shortener to Firebase Dynamic Links
  - First Input Delay
  - Chrome 70 から HTTP form input の URL を赤に
  - Array.prototype.flat/flatMap
  - `<virtual-list>` / storage access api
  - intent to implement WebGPU
  - intent to implement Sec-Metadata
  - `<amp-consent>` で許諾取得など
- Firefox
  - intent to implement Async Clipboard API(Firefox 63)
  - Shadow DOM on Nightly
- Safari
  - From-Orign や Cross-Origin-Options (was C-O-Window-Policy)
- Edge
  - MS Build
  - Credential Management API / WebP in development
- WHATWG
  - AB Election
- TC39
  - flatten to flat #smooshgate
  - matching proposal
- IETF
  - RFC 8392 CBOR Web Token (CWT)
  - QUIC Spin Bit draft
  - GREASE for HTTP/2 draft
- セキュリティ
  - EFAIL: HTML メールの `<img>` で内容を抜く
  - ADV: Spectre/Meltdown 亜種
- 周辺動向
  - Github Pages でカスタムドメイン HTTPS


### 6 月

- Chrome
  - Fresher service workers, by default
  - beforeinstallprompt on 68
  - Payment Handler API on 68
  - intent to ship: PiP
  - intent to ship: Web Locks API
- Firefox
  - intent to ship: toggleAttribute
  - intent to impl: Clear-Site-Data
  - Flash plug-in support will be removed in 2020 (Affecting)
  - Firefox のシェアが 10% 割ったという話
- Safari
  - WWDC
  - ITP2.0
- Edge
  - EdgeHTML 17
  - ChakraCore v1.10.0
  - IE と Edge も Chrome の HSTS Preload List を読むように
- W3C
  - WCAG 2.1 Recommendation
- TC39
- IETF
  - Bundling HTTP Exchange draft
  - Deprecating TLSv1.0 and TLSv1.1 draft
  - CDN Loop Prevention draft
- セキュリティ動向
  - 気味の悪い拡張子 JSON
  - Coinhive
  - NCSC (英国サイバーセキュリティセンター)が HTTPS always を推奨
  - カナダ政府が HTTPS 必須に関するお達し
  - 常時 SSL/TLS 化調査レポート - 自治体サイト対応状況 (愛媛が TOP)
- 周辺
  - 5G 策定完了


### 7 月

- Chrome
  - HTTP as not secure in M67
  - Site Isolation in M67
  - Android の build number を UA から削除する
  - Shadow DOM V0, Custom Elements V0, HTML Imports の remove と Origin Trial 延命
- Firefox
- Safari
- Edge
  - XSS Filter 削除アナウンス
  - IE の今後 (https://blogs.technet.microsoft.com/jpieblog/2018/07/18/internet-explorer-support/)
- WHATWG/W3C
  - TAG meeting
- TC39
  - npm Joins ECMA International and TC39
  - The Future of JS (記号取り合い問題など)
- IETF102 Montreal
  - <https://everyrfc.org/>
  - mnot's blog: How to Read an RFC
- セキュリティ動向
  - 西日本豪雨で 00000JAPAN 公開、暗号化されてないので内閣サイバーから注意喚起
  - npm のパッケージに npmrc を盗み出すコードが含まれていた
- 周辺動向
  - EFF からブロッキングに対する声明


### 8 月

- Chrome
  - intent to Deprecate: AppCache
  - intent to Remove: Budget API
  - OffscreenCanvas
- Firefox
  - Changing Our Approach to Anti-tracking (3rd Party Tracking を block していく)
- Safari
  - Added an experimental ITP Debug Mode
- Edge
  - EdgeHTML 17
- WHATWG/W3C
- TC39
- IETF
  - RFC 8446 - TLS1.3
- セキュリティ動向
  - Let's Encrypt Root Trusted By All Major Root Programs
- 周辺動向


### 9 月

- Chrome
  - Chrome 10 周年。 UI デザインが変わる
  - M69 で `www.`, `m.` の非表示化
  - M69 で Google 系サービスにログインしたら Chrome にもログイン
- Firefox
  - Variable Fonts Arrive in Firefox 62
- Safari
  - Safari 12.0
- Edge
- WHATWG/W3C
- TC39
- IETF
- セキュリティ動向
  - Twitter Silhouette
  - さらば DES 暗号 (2023)
- 周辺動向
  - YouTube や Netflix が AV1 のテスト


### 10 月

- Chrome
  - Google Fonts launches Japanese support
  - Symantec Distrust が段階的にロールアウト
- Firefox
  - Fission (site isolation project)
  - WebAssembly's post-MVP future: A cartoon skill tree
  - Block User Tracking Cookie
  - intent to implement Dynamic import
  - Symantec Distrust を年末まで延期(後に Firefox 64 で有効に)
- Safari
  - WebKit Contributors Meeting


### 11 月

- Chrome
  - Chrome Dev Summit
    - SXG
    - Portals
    - web.dev
    - Squoosh
  - intent to ship First Input Timing
  - Out of renderer CORS (off the main thread)
- Firefox
  - Encrypted SNI Comes to Firefox Nightly (取りこぼし)
  - intent to Implement: Reporting API
  - WebP Support
- Safari
  - Web High Level Shading Language = WHLSL (ホイッスル)
- WHATWG
- TC39
  - samuelgoto/proposal-optional-types:
- IETF
  - IETF103 Bangkok
  - HTTP3
  - User-Agent / Lang to Client-Hint draft
- セキュリティ
  - flatmap-stream に悪意のあるコード(取りこぼし)
