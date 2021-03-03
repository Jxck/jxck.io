# [monthly-web][mozaic.fm] ep80 Monthly Web 202102


## Info

audio: https://files.mozaic.fm/mozaic-ep80.mp3

published_at
: 2021-02-03

guest
: [@myakura](https://twitter.com/myakura)


## Theme

第 80 回のテーマは 2021 年 2 月の Monthly Web です。


### Chrome 動向


#### Stable: 88


#### Updates

- web.dev
  - *Requesting performance isolation with the Origin-Agent-Cluster header*
    - <https://web.dev/origin-agent-cluster/>
    - Origin-Isolation として始まったもの
    - デフォルトではリソースの分離を完全に行うのは難しく特に Same Site では混ざっていた
    - 埋め込んだ iframe がリソースを食い尽くすと、 Top Level Frame 側にも影響することもある
    - Origin-Agent-Cluster はこれを Origin Keyed に変えるためのヒント
    - ヒントであって確実ではない、これにより確実にリソース消費が改善するとも限らない
    - また、 Site Isolation の機能と違い、セキュリティ対策のヘッダではない(rename の理由の一つ)
  - *New aspect-ratio CSS property supported in Chromium, Safari Technology Preview, and Firefox Nightly*
    - <https://web.dev/aspect-ratio/>
    - `aspect-ratio` プロパティによる img 領域の確保方法やユースケース
    - padding-top を用いたハックが不要になり、 width だけで height が計算される
    - CLS の改善にも役立つ
    - width / height を設定した場合は、そのサイズ正確でなくても `width: 100%` なら比率は反映される
  - Accessing hardware devices on the web
    - <https://web.dev/devices-introduction/>
  - *Building a Tabs component*
    - <https://web.dev/building-a-tabs-component/>
    - GUI を実装してみたシリーズのタブ版
    - Scroll Snap や a 要素などプラットフォームの機能をなるべく使う
    - prefers-reduced-motion でアクセシビリティも考慮
    - タブの現在地表示のアニメーションなどに Scroll Timeline
  - Streams - The definitive guide
    - <https://web.dev/streams/>
  - *Tabbed application mode for PWAs*
    - <https://web.dev/tabbed-application-mode/>
    - `{ "display": "tabbed" }` でタブが使える PWA に
  - *Preparing for the display modes of tomorrow*
    - <https://web.dev/display-override/>
    - `{ "display_override": ["window-control-overlay", "minimal-ui"] }`
  - CSS-in-JS support in DevTools
    - <https://developers.google.com/web/updates/2021/02/css-in-js>
    - CSSOM 経由でスタイルを宛てた CSS-in-JS の場合でもデバッグできるように
    - 再パースして CDP (Chrome DevTools Protocol) でいじれるように
- google developer blog
  - Search Console Discover report now includes Chrome data
    - <https://developers.google.com/search/blog/2021/02/search-console-performance-discover-chrome>
  - Improving DevTools startup time
    - <https://developers.google.com/web/updates/2021/02/faster-devtools-startup>
  - Join us at Search Central Live
    - <https://developers.google.com/search/blog/2021/02/join-us-at-search-central-live>
- google developer japan blog
  - Google Developers Japan: Google Ads API v3 の提供終了に関するお知らせ
    - <https://developers-jp.googleblog.com/2021/02/google-ads-api-v3.html>
  - Google Developers Japan: Apple の iOS 14 ポリシー アップデートに向けた Ads パートナーの準備について
    - <https://developers-jp.googleblog.com/2021/02/apple-ios-14-ads.html>
- chromium blog
  - Chromium Blog: Heads Up: Restriction on SharedArrayBuffers are coming in M91
    - <https://blog.chromium.org/2021/02/restriction-on-sharedarraybuffers.html>
- Chrome Developers
  - *Improving Progressive Web App offline support detection - Chrome Developers*
    - <https://developer.chrome.com/blog/improved-pwa-offline-detection/>
    - intent to ship 参照
- blog.google
  - *Focusing on Stadia's future as a platform, and winding down SG&E*
    - <https://blog.google/products/stadia/focusing-on-stadias-future-as-a-platform-and-winding-down-sge/>
    - <https://jp.techcrunch.com/2021/02/02/2021-02-01-google-shuts-down-its-internal-stadia-game-studios/>
    - Google が Stadia ゲームの開発を行う Stadia Games & Entertainment がゲームを一本もリリースしないうちに閉鎖
    - スタジオを率いていた Jade Raymond は Google を離れる
    - Google は Stadia 自体はクローズせず、プラットフォームの方に注力する


#### Intents

- *Ship: More accurate offline capability detection for PWA sites before showing install prompt*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/xwjawsTVlCU/m/kDRU46kdBAAJ>
  - PWA で install prompt を出す前に fake fetch を発行し 200 が返るかどうか調べるように
  - 空の onfetch ハンドラがあればよいわけでは無くなった
  - 既に登録済みの場合はそのまま
  - 実施は 93 以降
- Ship: Stricter mixed content check for blob and filesystem URLs
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/nrpl_ewkmaQ/m/aVI8C8NeAwAJ>
- *Ship: Use :focus-visible in the default UA style sheet*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/gv69rSngHDY/m/B_p8K21kAgAJ>
  - `:focus` の outline を消す CSS が多く `:focus-visible` ができた
  - `:focus-visible` を UA のデフォルトにすることで `:focus` の outline を消す必要が無くなる
- Ship: Protect `application/x-protobuffer` via Cross-Origin-Read-Blocking
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/87Q-8hjVtLE/m/A9JVJWJkBAAJ>
- Ship: WebXR AR Lighting Estimation
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/5j573KRkets/m/tRJHmNXFAQAJ>
- Ship: Clipboard: files support
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/MRDuNaR4Zd0/m/n7J2g6qNAQAJ>
- *Ship: User Agent string: cap macOS version number to 10_15_7*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/hAI4QoX6rEo/m/qQNPThr0AAAJ>
  - UA を `Mac OS X 11_0_0` にするとバグるコンテンツがあるので `10_15_7` にする
- Ship: Generated CSSStyleDeclaration Attributes
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/MfR5PmnS77U/m/rFpewtnuAgAJ>
- *Ship: Support specifying width/height on `<source>` elements for `<picture>`
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/GEjjJE0LCnM/m/0p8CJ48hAgAJ>
  - `<source>` 側にも w/h が指定でき、ロード前に領域が確保されるように
- *Ship: Declarative Shadow DOM*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/7sZ52cP8HMg/m/ciep5kv-AwAJ>
- Ship: WebXR Depth API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/v4fneq7tgDA/m/utkwOcjuAwAJ>
- Ship: Propagate overscroll-behavior from html / root
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/cdBnv0-iYZs/m/L4IsN5NGAwAJ>
- Ship: Ergonomic brand checks for private fields
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/SO8zL3dvKsI/m/wMg-UGOUAgAJ>
- Ship: CSS custom counter style
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/kC8b-dZ8uBQ/m/Ngopo8S2AgAJ>
  - `@counter-style` で ol のスタイルを細かく定義
- Ship: @font-face descriptor advance-override
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/_BO41rwrrtI/m/TjPsQnC2AwAJ>
- Ship: Disable Double Tap to Zoom when mobile viewport is set
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/dXztlK096rs/m/K87liIiwAwAJ>
- Ship: WebAssembly SIMD
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/Ks2iWmi32MM/m/wYnxaB6iAwAJ>
- Implement and Ship: Add toJSON to Trusted Types instances.
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/FnReOdg7cy4/m/-fGpLq30AwAJ>
- Implement and Ship: Seeking past the end of a file in the File System Access API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/iQhMaR0rA2M/m/RdxYBm8rAgAJ>
- Implement and Ship: Block HTTP ports 69, 137, 161, 1719, 1720, 1723, and 6566
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/4Btz5xQ-gXc/m/iPDxYSEgAgAJ>
- Implement and Ship: URL protocol setter: New restrictions for file URLs
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/RmpP1GKY5tc/m/laytuveQAwAJ>
- *Implement and Ship: Rich PWA installation dialogs*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/neoNUFbEZ8Y/m/7bzJmCWVAQAJ>
- *Prototype: Multicast Receive API*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/8sNTXCoggcQ/m/sFr7FOteBAAJ>
  - Browser - Server 間の 1:1 通信では大規模な配信は限界がある
  - IP multicast をブラウザが受け取れれば、 CDN の大規模配信にも対応できる
  - ワールドカップを 4k 配信して 500m 人が見るなどを考えると必須の機能になる
  - OS のアップデート配信も無視できない
  - なおトラフィックの記録は 2020/4 に Akamai が記録した 167tbps
- *Prototype: accent-color CSS property*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/q9zf-frdewo/m/zxw2HuzGAQAJ>
  - form control のデフォルトアクセントカラーを変更するプロパティ
  - `<input type=checkbox>` で `accent-color: red` するとチェックマークの周りが青から赤になる
- Prototype: "credentialless" embedder policy.
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/DOtU6R4TuAY/m/kPbID-LAAQAJ\>
  - `Cross-Origin-Embedder-Policy: credentialless` にすると no-cors なリクエストが credential less になる
  - `require-corp` 同様 Isolation も実施される
- *Prototype: Custom Highlight API*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/Ix2u8NHG5Po/m/sNguLXOsAQAJ>
  - range で作った範囲をハイライトできる API
  - editor などを作る時の selection や find-on-page などが簡単に実装できる
- *Prototype: 103 Early Hints for Navigation*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/DAgWIczGtG0/m/gSXvjYn-AwAJ>
  - サンプルは少ないが数百ミリ秒の改善があったため実装
- *Prototype: Speculation Rules*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/1q7Fp3zpjgQ/m/5jbNkmRfAwAJ>
  - 投機的な取得が可能な候補を JSON で表現する方法
  - これを解析しつつヒューリスティクスを加味してブラウザがどうするか判断するヒント
  - 現状は、明示的な URL List と、ドキュメント全体のリンクを対象にするルールと 2 つある
  - Prerendering Revamped
    - <https://jeremyroman.github.io/alternate-loading-modes/>
- Experiment: Android Platform-Provided Trust Tokens in the Trust Token API Origin Trial
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/_Ayi6SD8yRs/m/nrq9in-4AwAJ>
- Experiment: WebAssembly Exception Handling
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/7l3oDJuNs6o/m/szROEgCxAwAJ>
- Experiment: Declarative Link Capturing for PWAs
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/q6ivDcvAJwQ/m/UWFuY2E9BAAJ>
- Experiment: Storage Foundation API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/Jhirhnq3WbY/m/GnhrTQAnAQAJ>
- *Experiment: First-Party Sets and 'SameParty' cookie attribute*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/XkWbQKrBzMg/m/dIQckPbZAAAJ>
- Experiment: Reverse Origin Trial for WebRTC's Plan B SDP semantics
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/35NFPYdumMs/m/sB_Mu_zSAwAJ>
- Experiment: Canvas color management
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/YKH6RSab_vY/m/nylTA4NZAwAJ>
- Experiment: `getCurrentBrowsingContextMedia()`
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/j70Xe2xSh1s/m/XeQ5UIr8AgAJ>
- Extend Origin Trial: QuicTransport
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/YD_fiUqNggo/m/LyyvJWTFAAAJ>
- Ready for Trial: Read Chrome device attributes
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/1r53FNKspwE/m/kU51UooJAAAJ>
- *Ready for Trial: Element Reflection*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/yecxBLmRVQI/m/d7YOe_nYAgAJ>
- Ready for Trial: GravitySensor API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/2-9kw9iQFfo/m/DF850nQWAQAJ>
- Change:
- Unship:
- Remove:


#### V8

- *V8 release v8.9 · V8*
  - <https://v8.dev/blog/v8-release-89>
  - Top-Level await
- Faster JavaScript calls · V8
  - <https://v8.dev/blog/adaptor-frame>
- Super fast super property access · V8
  - <https://v8.dev/blog/fast-super>


#### Other

- Chrome CT 2021 Plans
  - <https://groups.google.com/a/chromium.org/g/ct-policy/c/4puGir9pNFA>


### Firefox 動向


#### Stable: 86.0


#### Updates

- *A Fabulous February Firefox - 86! - Mozilla Hacks - the Web developer blog*
  - <https://hacks.mozilla.org/2021/02/a-fabulous-february-firefox-86/>
  - Nightly に image-set() 実装中
- *Firefox 86 for developers*
  - <https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/86>
  - :autofill
  - Intl.DisplayNames
- *Introducing State Partitioning - Mozilla Hacks - the Web developer blog*
  - <https://hacks.mozilla.org/2021/02/introducing-state-partitioning/>
  - ETP Strict Mode in Firefox 86 で Total Cookie Protection
- *Firefox 86 Introduces Total Cookie Protection - Mozilla Security Blog*
  - <https://blog.mozilla.org/security/2021/02/23/total-cookie-protection/>
  - ETP に組み込まれた新しいクッキー保護の仕組み
  - これまで Tracker 判定に基づくアクセス制御だったが、完全に Isolate する
  - Super Cookie Protection もあわせると、ブラウザによるサイトのタグ付けがいらなくなる
  - Strict Mode だと ITP2 レベルになるが、まだデフォルトではない


#### Intents

- Ship: Block HTTP ports 69, 137, 161, 1719, 1720, 1723, 6566, 10080
  - <https://groups.google.com/g/mozilla.dev.platform/c/T-uyqcibSdU/m/lCCjOqrNAgAJ>
- Ship: beforeinput event and InputEvent.getTargetRanges()
  - <https://groups.google.com/g/mozilla.dev.platform/c/C_92-abaiuw/m/GzXYMPe7AgAJ>
- Ship: ETP strict mode shims for content-blocked resources (aka SmartBlock)
  - <https://groups.google.com/g/mozilla.dev.platform/c/4R9aX_O5DDw/m/MpqusHASCQAJ>
- Ship: make outlines follow border-radius automatically
  - <https://groups.google.com/g/mozilla.dev.platform/c/VJhM6SSQd-4/m/x3B45oatCAAJ>
- Prototype and ship: Make `<link>` elements not traversable
  - <https://groups.google.com/g/mozilla.dev.platform/c/JOkma1Q8EvI/m/LU7rU-ZTAwAJ>
- *Prototype and ship: :user-valid and :user-invalid pseudo-classes.*
  - <https://groups.google.com/g/mozilla.dev.platform/c/rEYMl79krS8/m/UI_kwzatCAAJ>
  - `<form>` の valid / invalid は `input` の state しかみてなかった
  - ユーザのインタラクションに応じた結果で valid/invalid を判定することができる
  - ページを開いた瞬間にエラー扱いになるなどがなくなる
- Prototype: make outlines follow border-radius automatically
  - <https://groups.google.com/g/mozilla.dev.platform/c/4Tzs6hF4heA/m/3Bw57D9TAwAJ>
- *Prototype: CSS color-mix() function.*
  - <https://groups.google.com/g/mozilla.dev.platform/c/1MdyhPwaInw/m/2Fi4vWGXAQAJ>
  - `color-mix(red  40%, blue)` で 赤: 青 = 40: 60 の混色に
  - * *Unship: Exposure of 11.x macOS versions in the User-Agent string*
  - <https://groups.google.com/g/mozilla.dev.platform/c/yaYW2xo5Kik/m/zZlPf1JwAgAJ>
  - UA 文字列の macOS のバージョンを 10_15_7 に
- Unship: Application Cache API
  - <https://groups.google.com/g/mozilla.dev.platform/c/7RDZ9ynmVbs/m/RDX4Sd_1CAAJ>
- Unship: :-moz-submit-invalid pseudo-class.
  - <https://groups.google.com/g/mozilla.dev.platform/c/woAtt9tvGf8/m/THezrbWlCAAJ>
- Experiment:
- Change:
- Remove:


#### Other

- These Weeks in Firefox: Issue 87 – Firefox Nightly News
  - <https://blog.nightly.mozilla.org/2021/02/05/these-weeks-in-firefox-issue-86-2/>
- These Weeks in Firefox: Issue 88 – Firefox Nightly News
  - <https://blog.nightly.mozilla.org/2021/02/26/these-weeks-in-firefox-issue-88/>
- What WebRTC means for you - The Mozilla Blog
  - <https://blog.mozilla.org/blog/2021/02/04/what-webrtc-means-for-you/>
- *Latest Firefox release includes Multiple Picture-in-Picture and Total Cookie Protection - The Mozilla Blog*
  - <https://blog.mozilla.org/blog/2021/02/23/latest-firefox-release-includes-multiple-picture-in-picture-and-total-cookie-protection/>
  - 複数 PinP に対応
- *MDN localization update, February 2021 - Mozilla Hacks - the Web developer blog*
  - <https://hacks.mozilla.org/2021/02/mdn-localization-update-february-2021/>
  - <https://www.mitsue.co.jp/knowledge/blog/frontend/202102/26_0905.html>
  - MDN のコンテンツの多言語版についてアップデート
  - URL の slug を英語版に統一する
  - メンテされていないページをアーカイブする
  - Tier 1(現在は fr, ja, zh-CN, zh-TW)以外の言語版は非表示にしたいとも
- Browser fuzzing at Mozilla - Mozilla Hacks - the Web developer blog
  - <https://hacks.mozilla.org/2021/02/browser-fuzzing-at-mozilla/>
- *Remain Calm: the fox is still in the Firefox logo \| The Firefox Frontier*
  - <https://blog.mozilla.org/firefox/the-fox-is-still-in-the-firefox-logo/>
  - ブラウザ以外にも Firefox という名前を関すいくつかの製品(VPN やパスワード管理の Lockwise)があり、そのブランドのロゴが 2019 年にできた
  - そのブランドロゴが Firefox の新しいロゴと勘違いされミーム化
  - ブラウザのロゴは変わらないというのをあらためて表明
- *Here's what's happening with the Firefox Nightly logo - Mozilla Hacks - the Web developer blog*
  - <https://hacks.mozilla.org/2021/02/heres-whats-happening-with-the-firefox-nightly-logo/>
  - Firefox のロゴのミーム(上参照)を受けて Nightly のロゴがミームのものを使用
- Firefox Security Newsletter - Q4 2020
  - <https://groups.google.com/g/mozilla.dev.platform/c/KHopl05y29A/m/Be9Ctp7yBQAJ>
- Mozilla Welcomes the Rust Foundation - The Mozilla Blog
  - <https://blog.mozilla.org/blog/2021/02/08/mozilla-welcomes-the-rust-foundation/>
- Notes on Addressing Supply Chain Vulnerabilities - The Mozilla Blog
  - <https://blog.mozilla.org/blog/2021/02/27/notes-on-addressing-supply-chain-vulnerabilities/>
- SpiderMonkey Newsletter #9
  - <https://groups.google.com/g/mozilla.dev.platform/c/MjtIzZ2T8Rc/m/KUl0Flp6AQAJ>


### Safari 動向


#### Stable: 14.0.3


#### Updates

- *Introducing Private Click Measurement, PCM*
  - <https://webkit.org/blog/11529/introducing-private-click-measurement-pcm/>
  - Conversion Measurement とは送れるデータ量や、 1st Party only などが違う
  - App-To-Web
- *Updates to the Storage Access API*
  - <https://webkit.org/blog/11545/updates-to-the-storage-access-api/>
- *Release Notes for Safari Technology Preview 120*
  - <https://webkit.org/blog/11548/release-notes-for-safari-technology-preview-120/>
  - Implemented logical border-radius (r271447)
  - Implemented aria-braillelabel and aria-brailleroledescription (r271416)
- *Release Notes for Safari Technology Preview 121*
  - <https://webkit.org/blog/11555/release-notes-for-safari-technology-preview-121/>
  - CSS
    - Added support for aspect-ratio on grid items (r272307)
    - Added support for logical variants of scroll-padding and scroll-margin (r272035)
    - *Added support for `color(a98-rgb ...)`, `color(prophoto-rgb ...)`, `color(rec2020 ...)`, `color(xyz ...)`, `hwb()` as part of CSS Color 4 (r271992, r272125, r272123, r272311, r272344)
    - *Added support for percentages when parsing color(srgb ...) and color(display-p3 ...) per-spec (r271866)*
    - *Implemented scroll-snap-stop for scroll snapping (r272610)*
  - Media
    - Added intermediate volume icon states between "mute" and "max" (r272375)
  - JavaScript
    - Added @ in Error#stack even if function name does not exist (r272139)
    - Added Atomics support for BigInt64Array and BigUint64Array behind a runtime flag (JSC_useSharedArrayBuffer=1) (r272341)
    - Adjusted properties order of host JS functions (r272099)
    - Implemented BigInt64Array and BigUint64Array (r272170, r272215)
    - *Implemented private methods behind flag (JSC_usePrivateMethods=1)(r272580)*
    - Made JSON.parse faster by using table for fast string parsing (r272570)
  - WASM
    - Implemented WebAssembly.instantiateStreaming and WebAssembly.compileStreaming (r271993)
    - Implemented streaming compilation/instantiation for the Blob type (r272221)
  - A11y
    - Exposed focusable elements even if the element or ancestor has aria-hidden=true (r272390)


#### Position

- [webkit-dev] Request for Position on Foundation Storage API
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-February/031687.html>
- [webkit-dev] Request for Position on Storage Foundation API
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-February/031688.html>
- [webkit-dev] Position on emerging standard: WebCodecs
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-February/031691.html>
- [webkit-dev] Request for position on mapping a source's width/height attributes to width/height/aspect-ratio CSS properties on the `<img>` in a `<picture>`
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-February/031692.html>
- [webkit-dev] Position on WebXR Depth Sensing Module
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-February/031695.html>
- [webkit-dev] Request for position: WebAssembly SIMD
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-February/031696.html>
  - positive
- *[webkit-dev] Position on emerging standard: Declarative Shadow DOM*
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-February/031698.html>
  - rniwa さんとのやり取りあり、以前指摘した問題のいくつかは解決しているが、 getInnerHTML などのセマンティクスに問題ありと指摘
- [webkit-dev] Request for position: CSS custom counter style
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-February/031700.html>
  - generally supportive
- [webkit-dev] Request for position: CSS @font-face descriptor advance-override
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-February/031706.html>
- *[webkit-dev] Request for position: CSS scrollbar-gutter*
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-February/031707.html>
  - Igalia からのリクエスト、スレッドには Mozilla も参加
  - WebKit 的にはこの仕様のままでは won't support らしい


#### Other


### Edge 動向


#### Stable: 88


#### Updates

- *New Microsoft Edge to replace Microsoft Edge Legacy with April's Windows 10 Update Tuesday release - Microsoft Tech Community*
  - <https://techcommunity.microsoft.com/t5/microsoft-365-blog/new-microsoft-edge-to-replace-microsoft-edge-legacy-with-april-s/ba-p/2114224>
  - 2021 年 4 月 13 日リリースの Windows のアップデートで、 Edge Legacy が削除される
- Introducing the new downloads experience - Microsoft Tech Community
  - <https://techcommunity.microsoft.com/t5/articles/introducing-the-new-downloads-experience/m-p/2111551>
- Introducing improvements to the Collections experience - Microsoft Tech Community
  - <https://techcommunity.microsoft.com/t5/articles/introducing-improvements-to-the-collections-experience/m-p/2111553>
- New Feature Roadmap now up on the What's Next page of the Microsoft Edge Insider site - Microsoft Tech Community
  - <https://techcommunity.microsoft.com/t5/articles/new-feature-roadmap-now-up-on-the-what-s-next-page-of-the/m-p/2107761>
- Inking experience improvements in Edge - Microsoft Tech Community
  - <https://techcommunity.microsoft.com/t5/articles/inking-experience-improvements-in-edge/m-p/2098598>
- Switch profiles in web apps - Microsoft Tech Community
  - <https://techcommunity.microsoft.com/t5/articles/switch-profiles-in-web-apps/m-p/2088732>
- Join the Edge Insiders panel to partner with Microsoft! - Microsoft Tech Community
  - <https://techcommunity.microsoft.com/t5/articles/join-the-edge-insiders-panel-to-partner-with-microsoft/m-p/2088704>
- Make Microsoft Edge your own with themes - Microsoft Tech Community
  - <https://techcommunity.microsoft.com/t5/articles/make-microsoft-edge-your-own-with-themes/m-p/2083165>
- Microsoft Edge Native App support in Canary & Dev for Apple Silicon Macs! - Microsoft Tech Community
  - <https://techcommunity.microsoft.com/t5/articles/microsoft-edge-native-app-support-in-canary-amp-dev-for-apple/m-p/2037292>
- Turn off F12 opening DevTools with new Edge setting - Microsoft Tech Community
  - <https://techcommunity.microsoft.com/t5/articles/turn-off-f12-opening-devtools-with-new-edge-setting/m-p/2034433>
- What you need to know about kiosk mode when support for Microsoft Edge Legacy ends
  - <https://blogs.windows.com/msedgedev/2021/02/05/what-you-need-to-know-about-kiosk-mode-when-support-for-microsoft-edge-legacy-ends/>
- *Introducing adaptive notification requests in Microsoft Edge*
  - <https://blogs.windows.com/msedgedev/2021/02/16/introducing-adaptive-notification-requests-in-microsoft-edge/>
  - 84 で導入された Quieter Notification Prompts によって Push を悪いことに使ってないサイトのエンゲージメントが下がった
  - ユーザーの反応もとに重みづけをして、スコアの高いサイトではまたポップアップを出すように再度変更した
- Six time-saving tips for using the DevTools Console
  - <https://blogs.windows.com/msedgedev/2021/02/23/six-time-saving-tips-edge-devtools-console/>
- Making Service Workers easier to debug for Progressive Web Applications and more
  - <https://blogs.windows.com/msedgedev/2021/02/22/service-worker-tools-network-application-sources/>
- *What to know before you accept that cookie \| Windows Experience Blog*
  - <https://blogs.windows.com/windowsexperience/2021/02/23/what-to-know-before-you-accept-that-cookie/>
  - <https://www.microsoft.com/en-us/windows/remote-resource-center/manage-web-cookies>
  - ユーザリテラシー教育的な話


#### Chakra


#### Other

- `window.close()` Restrictions – text/plain
  - <https://textslashplain.com/2021/02/04/window-close-restrictions/>
- Web Proxy Authentication – text/plain
  - <https://textslashplain.com/2021/02/12/web-proxy-authentication/>
- Basic Authentication and Exchange Online – February 2021 Update - Microsoft Tech Community
  - <https://techcommunity.microsoft.com/t5/exchange-team-blog/basic-authentication-and-exchange-online-february-2021-update/ba-p/2111904>
- Partner Center improvements related to Microsoft Edge extensions store listing and certification - Microsoft Tech Community
  - <https://techcommunity.microsoft.com/t5/articles/partner-center-improvements-related-to-microsoft-edge-extensions/m-p/2118981#M4722>
- Edge App shortcuts being removed from desktop - Microsoft Tech Community
  - <https://techcommunity.microsoft.com/t5/articles/edge-app-shortcuts-being-removed-from-desktop/m-p/2091021#M4668>
- *IE サポート終了の流れ*
  - 【重要】「ABEMA」 Internet Explorer 11 サポート終了のお知らせ – ABEMA ヘルプ
    - <https://help.abema.tv/hc/ja/articles/360055647611>
  - Internet Explorer への対応終了のお知らせ \| SmartHR
    - <https://smarthr.jp/other/22512>
    - > 2021 年 1 月現在、 IE11 で SmartHR をご利用いただいているのは、管理者権限の方の 25%、お客さま全体では 6%です。[a]
  - Internet Explorer 11 を推奨利用環境の対象外といたします \| クラウドワークス
    - <https://blog.crowdworks.jp/?p=4293>
  - Internet Explorer サポート終了のお知らせ \| マネーフォワード
    - <https://support.biz.moneyforward.com/valuepack/news/important/20210226.html>
  - Google Workspace Updates: Reminder: Ending support for IE11 for all Google Workspace apps on March 15
    - <https://workspaceupdates.googleblog.com/2021/02/reminder-ending-support-for-ie11-for.html>
  - etc etc etc


### WHATWG/W3C 動向


#### Draft

- Recommendation
  - CSS Cascading and Inheritance Level 3 is a W3C Recommendation
    - <https://www.w3.org/blog/news/archives/8921>
  - HTML Review Draft - Published 29 January 2020 is a W3C Recommendation
    - <https://www.w3.org/blog/news/archives/8909>
- Proposed Recommendation
  - Call for Review: Web Authentication: An API for accessing Public Key Credentials Level 2 is a W3C Proposed Recommendation
    - <https://www.w3.org/blog/news/archives/8927>
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - Six Internationalization Gap-analysis First Public Working Drafts published
    - <https://www.w3.org/blog/news/archives/8913>
- Chartering
  - Proposed W3C Charter: Service Workers Working Group
    - <https://lists.w3.org/Archives/Public/public-new-work/2021Feb/0004.html>
  - Advance notice: Working in progress on an Editing Working Group Charter
    - <https://lists.w3.org/Archives/Public/public-new-work/2021Feb/0006.html>


#### Other


### TC39 動向


#### Meeting

- 2021-01
  - <https://github.com/tc39/agendas/blob/master/2021/01.md>
  - <https://github.com/tc39/notes/tree/master/meetings/2021-01>


#### Proposals Diff

- <https://github.com/tc39/proposals/compare/master@{2021-02-01}...master@{2021-03-01}>
- <https://tc39.github.io/beta/>
- 0->1
- 1->2
- 2->3
- 3->4


#### New Proposals

- #### Other
- ### IETF 動向


#### IETF

- materials
  - <https://datatracker.ietf.org/meeting/>
- httpwg
  - <https://github.com/httpwg/wg-materials/>
  - Removing HTTP/2 upgrade
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021JanMar/0249.html>
  - [bcp56bis] Using TLS in HTTP API specification
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021JanMar/0247.html>
  - *Interim 02/21
    - <https://github.com/httpwg/wg-materials/blob/gh-pages/interim-21-02/minutes.md>
    - bcp56bis の WGLC をやり直す
    - CDN-Cache-Control は WG to call for adoption
- quicwg
  - <https://github.com/quicwg/wg-materials>
  - IETF 110 agenda
    - <https://github.com/quicwg/wg-materials/blob/master/ietf110/agenda.md>
- webtrans
  - <https://github.com/DavidSchinazi/webtrans-wg-materials>
  - The WebTransport Protocol Framework
    - <https://tools.ietf.org/html/draft-ietf-webtrans-overview-01>
- tlswg
  - <https://github.com/tlswg/wg-materials>
  - IETF 110 agenda
    - <https://github.com/tlswg/wg-materials/blob/master/ietf110/agenda.md>
- wpack
- privacypass
- dispatch
- secdispatch


#### Spec

- RFC
  - *RFC 8941 on Structured Field Values for HTTP*
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021JanMar/0211.html>
  - *RFC 8942 on HTTP Client Hints*
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021JanMar/0212.html>
- IETF Last Call
- WG Last Call
- Call for Adoption
- I-D Action
- Draft


#### Other


### CDN 動向


#### Cloudflare

- Who won Super Bowl LV? A look at Internet traffic during the game
  - <https://blog.cloudflare.com/who-won-super-bowl-lv/>
- Using HPKE to Encrypt Request Payloads
  - <https://blog.cloudflare.com/using-hpke-to-encrypt-request-payloads/>


#### Fastly

- The GOAT of all games: traffic patterns and user behaviors from Super Bowl LV \| Fastly
  - <https://www.fastly.com/blog/the-goat-of-all-games-traffic-patterns-and-user-behaviors-from-super-bowl-lv>


#### Other


### セキュリティ動向

- Google の考案する新たな「Cookie レスの仕組み」に独占禁止法違反の目が向けられている - GIGAZINE
  - <https://gigazine.net/news/20210204-google-replacing-cookie-antitrust/>
- **Preparing to Issue 200 Million Certificates in 24 Hours - Let's Encrypt - Free SSL/TLS Certificates**
  - <https://letsencrypt.org/2021/02/10/200m-certs-24hrs.html>
  - 2020/2 に、 300 万(全体の 2.6%)の証明書を置き換えるべき状況があった
  - もしこれが 100% になる最悪のケースがあっても実施できるインフラに改善した
  - 2.4 億証明書を 24h で再発行するためにはボトルネックが 4 つあった
    - DB パフォーマンス
    - 内部ネットワークのスピード
    - HSM(Hardware Security Module) の速度
    - 帯域
  - DB
    - before: Xeon v4 x 24, 1TB RAM, 3.8TB SSD x 24, RAID 10
    - after: AMD x 64, 2TB RAM, 6.4TB NVME x 24, ZFS
  - NW
    - before: 1G メタル
    - after: 25G ファイバ + シスコの寄付したスイッチと NIC
    - (2014 年にシスコが 10G ファイバスイッチをくれたがキャビネットに入らず返却し 1G スイッチ使ってた)
  - HSM
    - before: 1100 署名/s x 2 = 1.9 億/day
    - after: 10000 署名/s x 2  = 8.6 億/day (THALES 寄付)
  - 帯域
    - Fortinet 提供のハードウェアで増強
  - API 拡張
    - ACME クライアントが定期的にポーリングして早期に更新を発見する API を開発中
  - 寄付
    - <https://letsencrypt.org/become-a-sponsor/>
- Post-Spectre Web Development
  - <https://mikewest.github.io/post-spectre-webdev/>
- こんばんは、 X-Forwarded-For 警察です - エムスリーテックブログ
  - <https://www.m3tech.blog/entry/x-forwarded-for>
- (令和 3 年 2 月 17 日)デジタル・プラットフォーム事業者の取引慣行等に関する実態調査(デジタル広告分野)について(最終報告):公正取引委員会
  - <https://www.jftc.go.jp/houdou/pressrelease/2021/feb/210217.html>
  - <https://mozaic.fm/episodes/59/monthly-web-201910.html#%E3%82%BB%E3%82%AD%E3%83%A5%E3%83%AA%E3%83%86%E3%82%A3%E5%8B%95%E5%90%91:~:text=Cookie%20%E6%83%85%E5%A0%B1%E5%8F%8E%E9%9B%86%E5%85%AC%E5%8F%96%E5%A7%94%E8%A6%8F%E5%88%B6%E3%81%B8>
  - でしてた話
  - 英国 CMA (Competition and Market Authority) と意見交換しており、論調が似ている
  - 3rd Party Cookie がブロックされた場合の、広告ビジネスの影響などについても言及されている
  - (Privacy Sandbox という言葉じたいは出てこない)


### 周辺動向

- mnot's blog: No news is... a sign of a stagnating Internet
  - <https://www.mnot.net/blog/2021/02/18/no-news>
- サイバーエージェント、 freee 、サイボウズで Web アクセシビリティに関する調査を実施 \| CyberAgent, Inc.
  - <https://www.cyberagent.co.jp/news/detail/id=25796>
- Why your phone's portrait mode fakes the blur - surma.dev
  - <https://surma.dev/things/portrait-mode/>
- Adobe co-founds the Coalition for Content Provenance and Authenticity (C2PA) standards organization
  - <https://blog.adobe.com/en/publish/2021/02/22/adobe-continues-content-authenticity-commitment-founder-c2pa-standards-org.html>
  - Microsoft, Truepic, Arm, Intel, BBC と共同で立ち上げた Contents Authenticity Initialtive


### イベント

- 3 月
  - 2-4: Microsoft Ignite
    - <https://myignite.microsoft.com/home>
  - 8-12: IETF | IETF 110 Online
    - <https://www.ietf.org/how/meetings/110/>
  - 9: HTTP WG Interim meeting
    - <https://github.com/httpwg/wg-materials/blob/gh-pages/interim-21-02/agenda.md>
  - 9-10: TC39 Meeting
    - <https://github.com/tc39/agendas/blob/master/2021/03.md>


### Wrap Up

- Chrome
  - PWA install prompt requirements change
  - :focus-visible default UA Style
  - macOS X UA string freezing
  - Origin-Agent-Cluster
  - IP-multicast
  - width/height `<picture>` `<source>`
  - Early Hints Prototype
  - Speculation Rules
- Firefox
  - Total Cookie Protection
  - color-mix
- Safari
  - Privacy Click Measurement
  - color function in TP
  - Private Method behind flag
  - Declarative Shadow DOM position request
- Edge
  - Edge Legacy Remove
  - Adaptive Notification Request
  - IE サポート終了の流れ加速
- W3C
  - WHATWG HTML as Recommendation
- IETF
  - RFC 8941 Structured Field Values
  - RFC 8942 HTTP Client Hints
- セキュリティ
  - Cookie / Privacy Sandbox / 独占禁止法 / 公正取引委員会
  - Let's Encrypt インフラ改善
- 周辺
  - 日本の Web A11y 関心調査
