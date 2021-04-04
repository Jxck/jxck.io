# [monthly-web][mozaic.fm] ep81 Monthly Web 202103


## Info

audio: https://files.mozaic.fm/mozaic-ep81.mp3

published_at
: 2021-04-04

guest
: [@myakura](https://twitter.com/myakura)


## Theme

第 80 回のテーマは 2021 年 3 月の Monthly Web です。


### Chrome 動向


#### Stable: 89


#### Updates

- *Chromium Blog: Speeding up Chrome's release cycle*
  - <https://blog.chromium.org/2021/03/speeding-up-release-cycle.html>
  - <https://developer.chrome.com/blog/faster-release-cycle/>
  - M94 から 6 週間ごとのリリースが 4 週間ごとになる
  - さらに組み込み利用などにむけ 8 週間ごとの Extended Stable を並行リリース
  - Extended もセキュリティ更新は 2 週間ごとにくる
- *Chromium Blog: Chrome 90 Beta: AV1 Encoder for WebRTC, New Origin Trials, and More*
  - <https://blog.chromium.org/2021/03/chrome-90-beta-av1-encoder-for-webrtc.html>
  - <https://developers-jp.googleblog.com/2021/04/chrome-90-webrtc-av1.html>
  - AV1 Encoder
  - Origin Trials
    - New Origin Trials
      - getCurrentBrowsingContextMedia()
      - MediaStreamTrack Insertable Streams (a.k.a. Breakout Box)
      - Subresource Loading with Web Bundles
      - WebAssembly Exception Handling
    - Completed Origin Trials
      - WebXR AR Lighting Estimation
  - Other Features in this Release
    - CSS
    - *aspect-ratio Interpolation*
    - Custom State Pseudo Classes
    - Implement 'auto' value for appearance and -webkit-appearance
    - overflow: clip Property
    - overflow-clip-margin Property
    - *Permissions-Policy Header*
    - Protect application/x-protobuffer via Cross-Origin-Read-Blocking
    - Seeking Past the End of a File in the File System Access API
    - StaticRange Constructor
    - Support Specifying Width and Height on `<source>` Elements for `<picture>`
    - WebAudio: OscillatorOptions.periodicWave is Not Nullable
  - JavaScript
    - *Relative Indexing Method for Array, String, and TypedArrays*
  - Deprecations, and Removals
    - Remove Content Security Policy Directive 'plugin-types'
    - Remove WebRTC RTP Data Channels
    - Return Empty for navigator.plugins and navigator.mimeTypes
- *What's New In DevTools (Chrome 90)*
  - <https://developer.chrome.com/blog/new-in-devtools-90/>
  - *New CSS flexbox debugging tools*
  - *New Core Web Vitals overlay*
  - Issues tab updates
    - Moved issue count to the Console status bar
    - Report Trusted Web Activity issues
  - Format strings as (valid) JavaScript string literals in the Console
  - New Trust Tokens pane in the Application panel
  - Emulate the CSS color-gamut media feature
  - Improved Progressive Web Apps tooling
  - New Remote Address Space column in the Network panel
  - Performance improvements
  - Display allowed/disallowed features in the Frame details view
  - *New SameParty column in the Cookies pane*
  - Deprecated non-standard fn.displayName support
  - Deprecation of Don't show Chrome Data Saver warning in the Settings menu
  - Experimental features
    - Automatic low-contrast issue reporting in the Issues tab
    - Full accessibility tree view in the Elements panel
- *Chromium Blog: Mitigating Side-Channel Attacks*
  - <https://blog.chromium.org/2021/03/mitigating-side-channel-attacks.html>
  - Sec-Fetch
  - CORP
  - Frame-Option
  - COOP
  - CORB
  - X-Content-Type-Option
  - などを組み合わせると Side Channel 攻撃対策になるという話
- Chromium Blog: Advanced memory management and more performance improvements in M89
  - <https://blog.chromium.org/2021/03/advanced-memory-management-and-more.html>
- *Chromium Blog: A safer default for navigation: HTTPS*
  - <https://blog.chromium.org/2021/03/a-safer-default-for-navigation-https.html>
  - M90 から URL の直接入力で HTTPS がデフォルトになる
  - だめだったら HTTP にフォールバック
  - localhost などは別
- *Google Online Security Blog: A Spectre proof-of-concept for a Spectre-proof web*
  - <https://security.googleblog.com/2021/03/a-spectre-proof-of-concept-for-spectre.html>
  - <https://leaky.page/>
  - これまであまり公開されてこなかった Spectre の DEMO が公開された
- 2020 Q4 Summary from Chrome Security
  - <https://groups.google.com/a/chromium.org/g/security-dev/c/lSebbMvUBeY/m/yPa1YYOrBAAJ>


#### Intents

- *Ship: Critical-CH, a Client Hint reliability mechanism*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/V3Yo20_ZZLc>
- Ship: Single `<compound-selector>` for :host(), :host-context()
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/ztanzClftBA>
- *Ship: Import Assertions and JSON Modules*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/dppzCKHI874>
- Ship: Block HTTP port 554
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/kyVo08TtOp8>
- *Ship: Class static initializer blocks*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/pzy_Z3AwmaY/m/FeXzN3hnAwAJ>
  - 別で Temporal の Position を Mozilla に聞いた
  - Anne "反対だったら Stage 3 になる前に止めてるからいちいち聞くな"
  - そのコメントが引用されて「mozilla は stage 3 には全部 positive だ」と使われている
- Ship: GravitySensor API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/uV1gwoX2fMY/m/vWrj0BA6AwAJ>
- Ship: adaptivePtime property for RTCRtpEncodingParameters
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/dsuUWMg2eSk/m/QCDH_i0GBAAJ>
- Ship: Align performance API timer resolution to cross-origin isolated capability
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/k6M3HJiqmkE/m/zgaVyKfnAwAJ>
- Ship: CTAP2 credBlob extension
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/Vfg2o0peyYg/m/Vp0h8i5VBQAJ>
- Ship: WebOTP API: cross-origin iframe support
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/clPEmywkX4w/m/LbIZZv-fBQAJ>
- Ship: Managed configuration for Web Applications
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/xPQYlcf-N-0/m/se6xRssBCAAJ>
- *Ship: inert attribute*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/_P5bxPTo6XE/m/1tqu3dzCBwAJ>
- Ship: Clear window name for cross-site navigations that switches browsing context group
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/86VeIi5sZzc/m/fPOAbuRHCAAJ>
- Ship: Suggested file name and location for the File System Access API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/2JspuQ0dj7I/m/GQkji2pCCAAJ>
- Ship: Dedicated workers as service worker clients
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/FhGd1AqB3ng/m/f0_yXSGNCAAJ>
- Implement and Ship: Honor media HTML attribute for link icon
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/OwUSsHWokpA>
- Prototype and Ship: ES Modules for service workers ('module' type option)
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/iJaPCv9HOrE/m/MRJDqCRvAgAJ>
- *Prototype: document.prerendering*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/8R6kvHjiqdw>
  - もともと `document.visibilityState == 'prerendering'` が Ship されていた
  - しかし `hidden` でも `prerendering` な場合もあるため Unship
  - 代わりにに `document.prerendering` が追加された
  - prerender2 の準備っぽい
- Prototype: App history API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/R1D5xYccqb0>
- *Prototype: First "Locally-Executed Decision over Groups" Experiment (FLEDGE)*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/w9hm8eQCmNI>
- *Prototype: Media Session API: Video conferencing actions*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/0WrBY77sfh0/m/78tjw5GsAwAJ>
- Prototype: Note taking new note URL
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/uJ1tuT7HTd8/m/gP8ixHXiBQAJ>
- Prototype: Lock Screen API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/006tkVwj1yw/m/7i4d1XXiBQAJ>
- Prototype: JPEG XL decoding support (image/jxl) in blink
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/WjCKcBw219k/m/BK9qXyz1BwAJ>
- *Prototype: Compute Pressure*
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/LTIRZ24C5Os/m/BPSeJ8y0BwAJ>
- Prototype: ALPS and ACCEPT_CH HTTP/2 and HTTP/3 frames
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/DJEygGmiSz4/m/UGcmivJBCAAJ>
- Experiment: Secure Payment Confirmation V2
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/6Dd00NJ-td8>
- Experiment: Federated Learning of Cohorts
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/MmijXrmwrJs>
- Experiment: Viewport-height client hint
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/Q2wcqY2UyNs>
- Experiment: Subresource loading with Web Bundles
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/9CwkzaF_eQ4>
- Extend Origin Trial: WebCodecs
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/55QViQdz5Rc/m/UxytBsZ5AgAJ>
- Experiment: File Handling API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/Fb-NdCvbgmU/m/68nHOaFPBQAJ>
- Experiment: Handwriting Recognition API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/o8RqlFwZItQ/m/zDlYHEhYBAAJ>
- Experiment: WebXR Plane Detection API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/51Yd2t6quik/m/6AWd7G07CAAJ>
- Change:
- Unship:
- Remove: EME persistent-usage-record session
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/bTLNlcpbGOg>
- Remove: webkitBeforeTextInserted & webkitEditableContentChanged JS events
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/QlEJAuX9pGk/m/a9c_hmgdAgAJ>
- Ready for Trial: JPEG XL decoding support (image/jxl) in blink
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/NttEYOmuB5U/m/Hqojb5WdAwAJ>
- Ready for Trial: Sanitizer API
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/OrWQnXVQJ0A/m/TbF-0Dw3BQAJ>
- PSA: CSS property 'font-size-adjust' will no longer be a Web Platform Experimental Feature
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/OCDD4-vVbQs/m/3fE0ufytBQAJ>
- FYI: DNS-over-HTTPS (DoH) support coming soon to Linux
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/5zF0xa0rHFg/m/h5xNvZX8BwAJ>
- Action required: You're invited to BlinkOn 14 in 1H 2021!
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/E0-ZogbHoH8/m/mG0NvQQNBAAJ>
- [blink-dev] Reminder - action required: You're invited to BlinkOn 14 in 1H 2021!
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/D6Y0OLYcjpk/m/Rx3Iu6ubBwAJ>
- Call for lightning talks at BlinkOn 14!!
  - <https://groups.google.com/a/chromium.org/g/blink-dev/c/-P5UnWO6-yo/m/KjKoRCK7BwAJ>


#### V8

- Faster releases · V8
  - <https://v8.dev/blog/faster-releases>
  - Chrome と同じく 4 週間
  - Extended Stable も提供
- V8 release v9.0 · V8
  - <https://v8.dev/blog/v8-release-90>


#### Other

- web.dev
  - Agrofy: A 70% improvement in LCP correlated to a 76% reduction in load abandonment
    - <https://web.dev/agrofy/>
  - *How CLS optimizations increased Yahoo! JAPAN News's page views per session by 15%*
    - <https://web.dev/yahoo-japan-news/>
  - JavaScript: What is the meaning of this?
    - <https://web.dev/javascript-this/>
  - *Debugging layout shifts*
    - <https://web.dev/debugging-layout-shifts/>
    - URL が変わった? => debug-layout-shifts
  - How Wix improved website performance by evolving their infrastructure
    - <https://web.dev/wix/>
  - Vodafone: A 31% improvement in LCP increased sales by 8%
    - <https://web.dev/vodafone/>
  - Building a Settings component
    - <https://web.dev/building-a-settings-component/>
  - Mitigate cross-site scripting (XSS) with a strict Content Security Policy (CSP)
    - <https://web.dev/strict-csp/>
  - Lowe's website is among fastest performing e-commerce websites
    - <https://web.dev/lowes/>
  - *Compat2021: Eliminating five top compatibility pain points on the web*
    - <https://web.dev/compat2021/>
    - 互換性に関する調査から、特に 5 つの問題にフォーカスする
    - CSS Flexbox
    - CSS Grid
    - CSS position: sticky
    - CSS aspect-ratio property
    - CSS transforms
  - What is Federated Learning of Cohorts (FLoC)?
    - <https://web.dev/floc/>
  - *Best practices for cookie notices*
    - <https://web.dev/cookie-notice-best-practices/>
  - *Debug Web Vitals in the field*
    - <https://web.dev/debug-web-vitals-in-the-field/>
  - Debug layout shifts
    - <https://web.dev/debug-layout-shifts/>
- Adding Rank Magnitude to the CrUX Report in BigQuery.
  - <https://developers.google.com/web/updates/2021/03/crux-rank-magnitude>
- google developer blog
  - <https://developers.googleblog.com/>
  - *Clarifications about the SharedArrayBuffer object message*
    - <https://developers.google.com/search/blog/2021/03/sharedarraybuffer-notes>
  - *New resources for video SEO  \|  Google Search Central Blog*
    - <https://developers.google.com/search/blog/2021/03/new-resources-for-video-seo>
    - Make your videos available on the web
    - Provide structured data with VideoObject markup
    - Include high-quality thumbnails
    - Submit a video sitemap
    - Make video content files accessible
  - Google Developers Blog: Modernizing your Google App Engine applications
    - <https://developers.googleblog.com/2021/03/modernizing-your-google-app-engine-applications.html>
- google developer japan blog
  - <https://developers-jp.googleblog.com/>
- chromium blog
  - <https://blog.chromium.org/>
- canary
  - <https://www.chromium.org/getting-involved/dev-channel>
- amp
  - Optimizing your AMP page experience for Core Web Vitals – The AMP Blog
    - <https://blog.amp.dev/2021/03/23/optimizing-your-amp-page-experience-for-core-web-vitals/>
- *Privacy, sustainability and the importance of "and"*
  - <https://blog.google/products/chrome/privacy-sustainability-and-the-importance-of-and/>
  - FLoC の Origin Trial を一部地域で開始するというアナウンス
    - Australia, Brazil, Canada, India, Indonesia, Japan, Mexico, New Zealand, Philippines and the U.S
  - あわせて https://www.privacysandbox.com/ も公開
- *Android の Chrome と WebView で障害*
  - <https://twitter.com/googlejapan/status/1374269162961268741>
  - Google Japan on Twitter: "Android アプリが一部のユーザーで強制終了する問題を修正しました。不具合が解消しない場合は、 Google Play ストアから Android システムの WebView と Google Chrome をアップデートしてください。ご迷惑をおかけした皆さまにお詫び申し上げます。" / Twitter


### Firefox 動向


#### Stable: 87.0


#### Updates

- In March, we see Firefox 87 - Mozilla Hacks - the Web developer blog
  - <https://hacks.mozilla.org/2021/03/in-march-we-see-firefox-87/>
- Firefox 87 for developers - Mozilla \| MDN
  - <https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/87>
- Firefox 87.0, See All New Features, Updates and Fixes
  - <https://www.mozilla.org/en-US/firefox/87.0/releasenotes/>
- Firefox 87 trims HTTP Referrers by default to protect user privacy - Mozilla Security Blog
  - <https://blog.mozilla.org/security/2021/03/22/firefox-87-trims-http-referrers-by-default-to-protect-user-privacy/>
  - デフォルトの Referrer が strict-origin-when-cross-origin に
- *Firefox 87 introduces SmartBlock for Private Browsing - Mozilla Security Blog*
  - <https://blog.mozilla.org/security/2021/03/23/introducing-smartblock/>
  - ETP の Strict mode ではリソースの読み込みをブロックしている
  - ブロックされたスクリプトに依存したページが読めない問題があった
  - ページが表示されるように shim を用意し提供
- These Weeks in Firefox: Issue 89 – Firefox Nightly News
  - <https://blog.nightly.mozilla.org/2021/03/12/these-weeks-in-firefox-issue-89/>
- These Weeks in Firefox: Issue 90 – Firefox Nightly News
  - <https://blog.nightly.mozilla.org/2021/03/25/these-weeks-in-firefox-issue-90/>


#### Intents

- Ship:
  - Enable State Partitioning in Private Browsing Mode
    - <https://groups.google.com/g/mozilla.dev.platform/c/-S-28sBh9-I/m/hCT3m7utAwAJ>
  - *Top Level Await*
    - <https://groups.google.com/g/mozilla.dev.platform/c/YcLW7hzQp8U/m/Oe0mS5BoAwAJ>
  - PerformanceEventTiming API
    - <https://groups.google.com/g/mozilla.dev.platform/c/eLXz442Icxs/m/KKqM5_KuAQAJ>
  - Honoring bogo-XML declaration for character encoding in text/html
    - <https://groups.google.com/g/mozilla.dev.platform/c/-DF65QZSmzs/m/fxnzasFoBgAJ>
  - sha2 windows signing
    - <https://groups.google.com/g/mozilla.dev.platform/c/2bTkUj6LmDs/m/k9mbK-02AgAJ>
  - *AbortSignal.abort()*
    - <https://groups.google.com/g/mozilla.dev.platform/c/23hnabutNlA/m/VV6OTp12AgAJ>
  - AV1 Still Image File Format (AVIF)
    - <https://groups.google.com/g/mozilla.dev.platform/c/eWIa9XXxHsc/m/Wzs20e0kAAAJ>
  - *aspect-ratio property*
    - <https://groups.google.com/g/mozilla.dev.platform/c/selXOOzcRkU/m/GKxYv-0kAAAJ>
- Prototype and Ship
  - Support `document.execCommand` and related API in `<input>` and `<textarea>`
    - <https://groups.google.com/g/mozilla.dev.platform/c/ymhlgZTX3-Q/m/c26xQWIIAwAJ>
  - make width and height map to aspect-ratio for `<video>`, `<canvas>` and `<input type=image>`
    - <https://groups.google.com/g/mozilla.dev.platform/c/Y7aZiULRVjg/m/uiEbMj99BgAJ>
  - Make mac mouse focus model closer to other platforms
    - <https://groups.google.com/g/mozilla.dev.platform/c/dCOWnTLiA2o/m/dIvZjmI8AgAJ>
  - ruby-position: alternate
    - <https://groups.google.com/g/mozilla.dev.platform/c/paiMEal9m4Q/m/tIeMrqkQAQAJ>
- Prototype
  - WebAssembly exception handling proposal
    - <https://groups.google.com/g/mozilla.dev.platform/c/9ioehBRsEnw/m/6IiauaGvAQAJ>
  - Default font metrics overriding
    - <https://groups.google.com/g/mozilla.dev.platform/c/zk_-KRtKJr0/m/KcAhTOqcAwAJ>
  - glyph-scale-factor descriptor for @font-face rules
    - <https://groups.google.com/g/mozilla.dev.platform/c/joBc4SoTOPc/m/Mwjr06tcAgAJ>
  - Honoring bogo-XML declaration for character encoding in text/html
    - <https://groups.google.com/g/mozilla.dev.platform/c/NtgfaHffE-8/m/I3lv6eZcAAAJ>
  - `fit-content()` function
    - <https://groups.google.com/g/mozilla.dev.platform/c/K10xFE4xF58/m/sFhSXf2WAQAJ>
- Experiment:
- Unship
  - cross-context @@hasInstance in IDL interfaces
    - <https://groups.google.com/g/mozilla.dev.platform/c/PSEPdL0MbvM/m/IVILjtVUAAAJ>
- Change:
- Remove:
  - intl.uidirection pref
    - <https://groups.google.com/g/mozilla.dev.platform/c/e8w70uOCmss/m/l6PFZWdSAAAJ>


#### Other

- *Reinstating net neutrality in the US - The Mozilla Blog*
  - <https://blog.mozilla.org/blog/2021/03/19/reinstating-net-neutrality-in-the-us/>
- *MDN localization in March - Tier 1 locales unfrozen, and future plans*
  - <https://hacks.mozilla.org/2021/03/mdn-localization-in-march-tier-1-locales-unfrozen-and-future-plans/>
  - Tier 1 (fr, ja, ru, zh-CN, zh-TW) のロケールが編集可能に戻った
  - アクティブコントリビューターが紹介されている(日本人による ja チームも)
  - メンテされてないロケールの非表示化を 4/30 に行う
    - 韓国語やドイツ語など、 Tier 1 ではないもののアクセスの多いものは公開継続してメンテナを募る
- How MDN's site-search works - Mozilla Hacks - the Web developer blog
  - <https://hacks.mozilla.org/2021/03/how-mdns-site-search-works/>
- A web testing deep dive: The MDN web testing report - Mozilla Hacks - the Web developer blog
  - <https://hacks.mozilla.org/2021/04/a-web-testing-deep-dive-the-mdn-web-testing-report/>


### Safari 動向


#### Stable: 14.0.3


#### Updates

- Release Notes for Safari Technology Preview 122
  - <https://webkit.org/blog/11577/release-notes-for-safari-technology-preview-122/>
  - CSS
    - *Implemented :focus-visible (r273812, r272983)*
    - Implemented the first case in Definite and Indefinite Sizes specifications in section 9.8 for flexbox (r273072)
    - Added experimental support for CSS Color 5 color-contrast() (r273683)
    - Added experimental support for CSS Color 5 color-mix() (r273244)
    - Added experimental support for CSS Color 5 Relative Color Syntax (r273127)
    - Added support for aspect-ratio on flexbox items (r273193)
  - JavaScript
    - *Enabled private methods (r273125)*
    - *Implemented private static methods (r273107)*
    - *Implemented top-level-await (r273225)*
    - *Implemented RegExp Match Indices (r273086)*
    - Implemented GC verifier (r273138)
    - *Added support for modules in Workers and Worklets (r273203)*
    - *Added support for modules in Service Workers (r273224)*
  - WebAssembly
    - Extended wasm type with type index (r273813)
    - Implemented non-trapping float to int conversion (r272933)
  - Web API
    - *Enabled Paint Timing (r273221, r273220)*
  - WebRTC
    - Added support for WebRTC priority (r273550)
    - Added support for BigInt as media-stream encryption key (r273158)
  - Accessibility
    - Added the ability for an embedded accessibility image description in an image file to be reported if available (r273214)
- Release Notes for Safari Technology Preview 123
  - <https://webkit.org/blog/11585/release-notes-for-safari-technology-preview-123/>
  - CSS
    - *Changed to consider intrinsic sizes as automatic whenever the block axis of the flex item is the flexible box main size (r273955)*
    - *Fixed orthogonal items with percentage sizes in Flexbox (r273958)*
    - Fixed position: sticky behavior in a table with dir=RTL (r273982)
  - Web API
    - *Removed the Origin header if the navigation request goes from POST to GET (r273905)*


#### Position

- [webkit-dev] Request for position: Honor media HTML attribute for link icon
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-March/031721.html>
- [webkit-dev] Request for position on Import Conditions
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-March/031725.html>
- [webkit-dev] Request for position: ES modules for Service Workers
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-March/031728.html>
- [webkit-dev] Request for position: class static blocks
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-March/031729.html>
- [webkit-dev] Request for Position on Sanitizer API
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-March/031731.html>
- *[webkit-dev] Request For Position on CSS containment*
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-March/031733.html>
- *[webkit-dev] Request for position: Aligning high-resolution timer granularity to cross-origin isolated capability*
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-March/031739.html>
- [webkit-dev] Request for Position: COLR v1 Vector Color Fonts
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-March/031753.html>
- [webkit-dev] Request for position: WebAuthn support for credBlob and minimum PIN length
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-March/031755.html>
- [webkit-dev] Request for position: Media Session video conferencing actions
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-March/031756.html>
- [webkit-dev] Request for Position on RTCRtpEncodingParameters.adaptivePtime
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-March/031757.html>
- [webkit-dev] Request for position: Managed Configuration API
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-March/031758.html>
- [webkit-dev] Request for position: Support using WebOTP API in cross-origin iframes
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-March/031759.html>
- [webkit-dev] Request for position on Handwriting Recognition API
  - <https://lists.webkit.org/pipermail/webkit-dev/2021-March/031762.html>


#### Other


### Edge 動向


#### Stable: 89


#### Ignite

- MS Ignite
  - <https://myignite.microsoft.com/sessions>
  - Top reasons why customers love Microsoft Edge
    - <https://myignite.microsoft.com/sessions/e6450bfb-4db9-491e-87d2-0bf2fbf5f1d1?source=sessions>


#### Updates

- *Microsoft Edge Legacy desktop application support ends today - Microsoft Edge Blog*
  - <https://blogs.windows.com/msedgedev/2021/03/09/microsoft-edge-legacy-end-of-support/>
  - Edge Legacy のサポートが 3/9 で終了
- *Serving our customers more effectively with new release cycles for Microsoft Edge - Microsoft Edge Blog*
  - <https://blogs.windows.com/msedgedev/2021/03/12/new-release-cycles-microsoft-edge-extended-stable/>
  - Chrome と同じ
- *Microsoft Edge 89: Delivering improved browser performance to get the job done - Microsoft Edge Blog*
  - <https://blogs.windows.com/msedgedev/2021/03/04/edge-89-performance/>
- Joining forces on better browser compatibility in 2021 - Microsoft Edge Blog
  - <https://blogs.windows.com/msedgedev/2021/03/22/better-compatibility-compat2021/>


#### Chakra


#### Other

- Per-Site Permissions in Edge – text/plain
  - <https://textslashplain.com/2021/03/29/per-site-permissions-in-edge/>
- Specifying Per-Site Policy with Chromium's URL Filter Format – text/plain
  - <https://textslashplain.com/2021/03/29/specifying-per-site-policy-with-chromiums-url-filter-format/>


### WHATWG/W3C 動向


#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
  - Updated Candidate Recommendation: CSS Scroll Snap Module Level 1
    - <https://www.w3.org/blog/news/archives/8942>
  - Updated Candidate Recommendation: Timed Text Markup Language 2 (TTML2) (2nd Edition)
    - <https://www.w3.org/blog/news/archives/8939>
- Working Draft
- First Public Working Draft
  - First Public Working Draft: Open Screen Protocol
    - <https://www.w3.org/blog/news/archives/8973>
  - *First Public Working Draft: Post-Spectre Web Development*
    - <https://www.w3.org/blog/news/archives/8956>
  - First Public Working Draft: Indexed Database API 3.0
    - <https://www.w3.org/blog/news/archives/8944>
- Chartering


#### Other

- Authorized Translation of WCAG 2.1 in Polish
  - <https://www.w3.org/blog/news/archives/8951>


#### ES2021

- *Release ES2021 Candidate March 2021 · tc39/ecma262*
  - <https://github.com/tc39/ecma262/releases/tag/es2021-candidate-2021-03>
  - String.prototype.replaceAll
  - Promise.any()
  - WeakRefs
  - Logical assignment operators
  - number literals and bigint literals


#### Meeting

- *2021-03*
  - <https://github.com/tc39/agendas/blob/master/2021/03.md>
  - <https://github.com/tc39/notes/blob/master/meetings/2021-03/mar-9.md>
  - <https://github.com/tc39/notes/blob/master/meetings/2021-03/mar-10.md>
  - ECMA 402
  - Introducing: Make B.1.{1,2} (octal literals & escapes) normative for sloppy code
  - Normative: specify creation order for capturing group properties
  - Backup incumbent tracking for FinalizationRegistry jobs
  - Class Static Initialization Blocks
  - *Records and Tuples update*
  - Async Do update towards stage 2
  - Top-level await status update
  - ECMA Recognition Awards
  - Module Fragments (For Stage 1)
  - Collection normalization methods
  - *Temporal for Stage 3*
  - RegExp set notation: Update
  - Error.prototype.cause for stage 3
  - *Promise.anySettled*
  - Array find from last
  - ResizableArrayBuffer for Stage 3
  - Incubation call chartering
  - Intl.Segmenter for Stage 4
  - Top-level await
  - Temporal Pt 2
  - Pipeline Operator
  - Opt-Out Period


#### Proposals Diff

- <https://github.com/tc39/proposals/compare/master@{2021-03-01}...master@{2021-04-01}>
- <https://tc39.github.io/beta/>
- 0->1
  - Module Fragments
- 1->2
  - Array find from last
- 2->3
  - Error Cause
  - Temporal
  - Class Static Block
- 3->4


#### New Proposals

- *Provides additional methods to Array.prototype to enable changes on an array by returning a new copy of it with the change.*
  - <https://github.com/rricard/proposal-change-array-by-copy>
  - record / tuple に必要な immutable な method を Array.prototype にも入れる案
  - pushed / shifted / with など


#### Other

- ECMAScript 2021: the final feature set
  - <https://2ality.com/2020/09/ecmascript-2021.html>


### IETF 動向


#### WG

- IETF110
  - <https://datatracker.ietf.org/meeting/110/materials>
- httpwg
  - <https://lists.w3.org/Archives/Public/ietf-http-wg/>
  - <https://github.com/httpwg/wg-materials/>
  - IETF110 は無し
  - Targeted HTTP Response Header Fields for Cache Control
    - <https://www.ietf.org/archive/id/draft-cdn-control-header-01.html>
  - I-D Action: draft-ietf-httpbis-message-signatures-02.txt
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021JanMar/0286.html>
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021JanMar/0287.html>
    - <https://www.ietf.org/archive/id/draft-ietf-httpbis-message-signatures-02.html>
    - Signatures Draft の更新
  - I-D Action: draft-ietf-httpbis-bcp56bis-10.txt
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021JanMar/0264.html>
  - I-D Action: draft-ietf-httpbis-bcp56bis-11.txt
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021JanMar/0298.html>
  - *Re-WGLC for BCP65bis*
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021AprJun/0003.html>
    - いよいよ大詰めだけど最後の WGLC が結構前なのでもう一度
  - Call for Adoption: draft-bdc-something-something-certificate-05
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021JanMar/0314.html>
  - I-D Action: draft-ietf-httpbis-safe-method-w-body-00.txt
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021JanMar/0312.html>
  - I-D Action: draft-ietf-httpbis-messaging-15.txt
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021JanMar/0311.html>
  - I-D Action: draft-ietf-httpbis-cache-15.txt
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021JanMar/0310.html>
  - I-D Action: draft-ietf-httpbis-semantics-15.txt
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021JanMar/0309.html>
  - Hopefully-final draft-ietf-dnsop-svcb-https-04
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021JanMar/0297.html>
  - I-D Action: draft-ietf-httpbis-message-signatures-02.txt
    - <https://lists.w3.org/Archives/Public/ietf-http-wg/2021JanMar/0286.html>
- quicwg
  - <https://mailarchive.ietf.org/arch/browse/quic/>
  - <https://github.com/quicwg/wg-materials>
  - IETF 110
    - <https://github.com/quicwg/wg-materials/blob/main/ietf110/agenda.md>
    - <https://github.com/quicwg/wg-materials/blob/main/ietf110/minutes.md>
- webtrans
  - <https://mailarchive.ietf.org/arch/browse/webtransport/>
  - <https://github.com/DavidSchinazi/webtrans-wg-materials>
  - IETF110
    - <https://github.com/ietf-wg-webtrans/webtrans-wg-materials/blob/master/ietf106/agenda.md>
    - <https://github.com/ietf-wg-webtrans/webtrans-wg-materials/blob/master/ietf106/minutes.md>
    - やってくぞ、って感じ
- tlswg
  - <https://mailarchive.ietf.org/arch/browse/tls/>
  - <https://github.com/tlswg/wg-materials>
  - IETF110
    - <https://github.com/tlswg/wg-materials/blob/master/ietf110/agenda.md>
    - <https://github.com/tlswg/wg-materials/blob/master/ietf110/minutes.md>
    - 特になし?
- wpack
  - <https://mailarchive.ietf.org/arch/browse/wpack/>
- privacypass
- dispatch
  - <https://mailarchive.ietf.org/arch/browse/dispatch/>
- secdispatch
  - <https://mailarchive.ietf.org/arch/browse/secdispatch/>


#### Spec

- RFC
  - Joke RFC: 見てない
- IETF Last Call
- WG Last Call
- Call for Adoption
- I-D Action
- Draft


#### Other

- Where is HTTP/3 right now? \| daniel.haxx.se
  - <https://daniel.haxx.se/blog/2021/04/02/where-is-http-3-right-now/>


### CDN 動向


#### Cloudflare


#### Fastly

- 2020 Year-in-Review: COVID drives "bump" in traffic across various industries \| Fastly
  - <https://www.fastly.com/blog/2020-year-in-review-covid-drives-bump-in-traffic-across-various-industries>


#### Other


### セキュリティ動向

- Spectre DEMO
  - <https://leaky.page/>


### 周辺動向

- *Brave acquires search engine to offer the first private alternative to Google Search and Google Chrome on both mobile and desktop*
  - <https://brave.com/brave-search/>
  - 2020 年にサービス終了した検索エンジン Cliqz の開発者が集うオープンな検索エンジン Tailcat を買収
  - Brave Search という検索エンジンを提供予定
- The Performance Inequality Gap, 2021 - Infrequently Noted
  - <https://infrequently.org/2021/03/the-performance-inequality-gap/>
- Reactive Data With Modern JavaScript - Infrequently Noted
  - <https://infrequently.org/2021/03/reactive-data-modern-js/>
- Good news about display: contents and Chrome
  - <https://www.rachelandrew.co.uk/archives/2021/03/11/good-news-about-display-contents-and-chrome/>
- *Who has the fastest F1 website in 2021?*
  - Part 1 - JakeArchibald.com
    - <https://jakearchibald.com/2021/f1-perf-part-1/>
  - Part 2 - JakeArchibald.com
    - <https://jakearchibald.com/2021/f1-perf-part-2/>
  - Part 3 - JakeArchibald.com
    - <https://jakearchibald.com/2021/f1-perf-part-3/>
  - Part 4 - JakeArchibald.com
    - <https://jakearchibald.com/2021/f1-perf-part-4/>
  - Part 5 - JakeArchibald.com
    - <https://jakearchibald.com/2021/f1-perf-part-5/>


### イベント

- 6 月
  - 7-11: WWDC 2021
    - <https://developer.apple.com/wwdc21/>
  - 24-30: IETF111
    - IETF 111 San Francisco


### Wrap Up

- Chrome Faster release from 94
- Spectre PoC DEMO
- URL bar default to https://
- ship: JSON modules
- ship: inert
- prototype: document.prerendering
- Web.dev CWV debugging や case study 系の記事
- Compat 2021 で CSS Flexbox/Grid etc の改善着手
- privacysandbox.com
- FLoC OT
- Android chrome/webivew 障害
- Referer Policy Default change
- ETP で built in shim へのフォールバック?
- MDN Tier 1 locale unfrozen
- Firefox Ship: aspect-ratio
- Safari focus-visible
- Private (static) method
- Worklets & module in sw
- Igalia contribution
- Edge Legacy サポート終了
- Post-Spectre Web Development
- ES2021 Candidate
- Record & Tuple の immutable method 提案
- Temporal Stage 3 と Standard Position
- Promise.race と anySettled の話
- Module Fragments for stage 1
- BCP65bis の Re-WGLC
