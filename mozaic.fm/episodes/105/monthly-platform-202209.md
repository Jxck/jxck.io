---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep105.mp3
published_at: 2022-10-01
guest: [@myakura](https://twitter.com/myakura)
---

# ep105 Monthly Platform 202209

## Theme

第 105 回のテーマは 2022 年 9 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 106

#### Updates

- **New in Chrome 106**
  - https://developer.chrome.com/en/blog/new-in-chrome-106/
  - New Intl APIs
  - Pop-up API
  - New css features
- **What's New In DevTools (Chrome 106)**
  - https://developer.chrome.com/en/blog/new-in-devtools-106/
  - Group files by Authored / Deployed in the Sources panel
  - Improved stack traces
    - Linked stack traces for asynchronous operations
    - Automatically ignore known third-party scripts
  - Improved call stack during debugging
  - Hiding ignore-listed sources in the Sources panel
  - Hiding ignore-listed files in the Command Menu
  - New Interactions track in the Performance panel
  - LCP timings breakdown in the Performance Insights panel
  - Auto-generate default name for recordings in the Recorder panel
  - Miscellaneous highlights
- **Chrome 107 beta**
  - https://developer.chrome.com/en/blog/chrome-107-beta/
  - CSS grid-template properties interpolation
  - Privacy preserving screen sharing controls
    - DisplayMediaStreamConstraints.selfBrowserSurface
    - DisplayMediaStreamConstraints.surfaceSwitching
    - MediaTrackConstraintSet.displaySurface
  - Render blocking status in Resource Timing
  - Wildcards in permissions policy origins
  - Support the rel attribute on form elements
  - Origin Trials
    - Declarative PendingBeacon API
    - Permissions-Policy: unload
  - Deprecations and removals
    - Expect-CT
- Chromium Blog: Chrome 107 Beta
  - https://blog.chromium.org/2022/09/chrome-107-beta.html
  - developer blog の方に移った
- What's New In DevTools (Chrome 107)
  - https://developer.chrome.com/en/blog/new-in-devtools-107/
  - Customize keyboard shortcuts in DevTools
  - Toggle light and dark themes with keyboard shortcut
  - Highlight C/C++ objects in the Memory Inspector
  - Support full initiator information for HAR import
  - Start DOM search after pressing Enter
  - Display start and end icons for align-content CSS flexbox properties
  - Miscellaneous highlights

#### Intents

- **Ship: Android OSK resizes visual viewport by default + `<meta>` opt-out**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ge7xTu-VhJ0
  - OSK = On Screen Keyboard
  - Android ではオンスクリーンキーボード表示時に layout viewport が変化していた
  - これを iOS の挙動に合わせて、 visual viewport のみ変わるように変更する
  - これまでの挙動に戻すための `<meta name="viewport" content="interactive-widgets=resize-layout">` を定義する
- **Ship: Array grouping**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hSnGUOXTXPE
  - `Array.group()`, `Array.groupToMap()`
- **Ship: CSS @supports : Always non-forgiving parsing**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RJrIxJA9LYw
  - `CSS.supports(selector())` でセレクタをパーズできるかのチェックができる
  - `:is()` や `:has()` は forgiving なパーズなので、セレクタをサポートしているかのチェックに使いにくい
  - なので `supports(selector())` に渡されたセレクタは unforgiving に処理する変更が行われる
  - jQuery で `:has()` が壊れる問題の一部解決にも使われる
- **Ship: CSS Values and Units Module Level 4: Small/Large/Dynamic/Logical viewport units**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Qw2XTr0et_U
  - モバイルでブラウザの UI を含む/除いた時の viewport の長さ
- Ship: Deprecate and remove window.defaultStatus and window.defaultstatus
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7kCLSmq_bDc
- **Ship: Origin Private File System (OPFS) on Android**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/GyxqF8ZDK5Q
- Ship: Sync methods for FileSystemSyncAccessHandle in File System Access API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UzGXhVEFpwU
- **Ship: URLPattern ignoreCase**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KgAdo3kB1wc
  - case insensitive にするオプション
- Ship: Variable COLRv1
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oMcbPblmD-k
- Ship: Web Authentication Conditional UI
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gB4yAmF4msE
- Ship: aria-brailleroledescription and aria-braillelabel
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/a8CoYPI97Z8
- Ship: `font-tech()` and `font-format()` condition extensions to CSS `@supports`
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AzUM6sVsjBc
- Ship: Sec-CH-Prefers-Reduced-Motion client hint header
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_m5xConFTfY
- Prototype and Ship: Snap border, outline and column-rule widths before layout
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0uq_S5p6uZg
- Implement and Ship: Trusted Types fromLiteral
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_ulTuSJrk7U
- Prototype and Ship: Snap border, outline and column-rule widths before layout
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/0uq_S5p6uZg
- Prototype: Bounce Tracking Mitigations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vwQ2x1lByqc
- **Prototype: CSS 'lh' Length Unit**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KPCRWkJ9n1k
  - 行の高さの単位
- Prototype: `FileSystemHandle::remove()` method
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/sudi1AzZO2s
- Prototype: Intl.DurationFormat
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KwmaQ7LqxKY
- **Prototype: Last Baseline Item Alignment**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PnQdSBOxDUc
  - `align-items` などで揃えるベースラインを最後の行のベースラインにする
  - `last baseline` という値はパースしていたがレイアウトのサポートができていなかった
- **Prototype: Same-site cross-origin prerendering triggered by the speculation rules API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4E_UNp8mV_Y
  - Prerender をサブドメインでも使えるように
- Prototype: SoftNavigation performance entry
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MK01W5X_x6E
- **Prototype: Web Smart Card API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BmmWnreaEII
  - Smart Card (PC/SC) の実装やカードリーダーを使った読み込みに対応する
- Prototype: Curve25519 in Web Cryptography
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/n0uKIqfypW0
- Ready for Trial: Permission-Policy: unload
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/38Dpu-uhwFc
- Ready for Trial: WebAuthn Conditional UI
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/laxVRNSzMVo
- Experiment: Permissions-Policy: unload
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RhzscAx3qc8
- Experiment: Web Payment API - connect-src CSP policy
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6i6G-VEQrGw
- Extend Experiment #2: Conditional Focus
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/R90_BzkM_jY
- Extend Experiment: Conditional Focus
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CLmSojRQHoc
- Deprecate and Remove ImageDecoderInit.premultiplyAlpha.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AvVS0FQI5zo
- Deprecate and Remove: connect-src CSP bypass in Web Payment API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mlTnVIovBc0
- Deprecate and Remove: PaymentInstruments
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VenSGqBIoKI
- PSA: Custom Handlers testing automation in ChromeDriver
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/VVW1t8xeXXc
- **PSA: Enforce CORS for favicons**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/YMlAU7fukYA
  - crossorigin 属性のついた `<meta icon>` で no-cors になっていたのを修正
- PSA: runtime_enabled_features.json5 improvements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZL9YOAq9e5A
- In-person registration is now closed
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KSz8dkm42N0

#### V8

#### Other

- web.dev
  - **Building the main navigation for a website**
    - https://web.dev/website-navigation/
    - navigation 実装上の注意や読み上げ対応
  - **Submit your proposals for Interop 2023**
    - https://web.dev/submit-your-proposals-for-interop-2023/
    - Interop で取り組んで欲しい互換性問題を収集している
  - Speedy CSS Tip! Animated Loader
    - https://web.dev/speedy-css-tip-animated-loader/
  - Testing Web Design Color Contrast
    - https://web.dev/testing-web-design-color-contrast/
  - **Introducing Learn HTML**
    - https://web.dev/introducing-learn-html/
  - **Introducing Learn Accessibility**
    - https://web.dev/introducing-learn-accessibility/
  - Optimize long tasks
    - https://web.dev/optimize-long-tasks/
  - New to the web platform in September
    - https://web.dev/web-platform-09-2022/
- google developer blog
  - Google Developers Blog: New Features Available in the Google Identity Services (GIS) Library
    - https://developers.googleblog.com/2022/09/new-features-available-in-google-identity-services-library.html
  - **Google Developers Blog: Updates to Emoji: New Characters, New Animation, New Color Customization, and More!**
    - Noto Emoji の新機能(Animation, Color Theme)
    - https://developers.googleblog.com/2022/09/updates-to-emoji-new-characters-animation-colors-and-more.html
    - MS も Fluent Emoji を公開してる
    - https://github.com/microsoft/fluentui-emoji
  - Google Developers Blog: Come to the Tag1 & Google Performance Workshop at DrupalCon Europe 2022, Prague
    - https://developers.googleblog.com/2022/09/come-to-tag1-google-performance-workshop-at-drupalcon-europe-2022-prague.html
  - Google Developers Blog: Introducing Discovery Ad Performance Analysis
    - https://developers.googleblog.com/2022/09/introducing-discovery-ad-performance-analysis.html
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - Extending the Memory Inspector for C/C++ debugging
    - https://developer.chrome.com/en/blog/memory-inspector-extended-cpp/
  - **Pop-ups: They're making a resurgence!**
    - https://developer.chrome.com/en/blog/pop-ups-theyre-making-a-resurgence/
    - Pop-up API のでもを交えた説明
  - Container queries begin to land in stable browsers while the polyfill gets a big update
    - https://developer.chrome.com/en/blog/cq-polyfill/
  - **How Chrome prepares updates for billions of users**
    - https://developer.chrome.com/en/blog/chrome-updates/
    - Chrome のリリースチームにインタビュー
  - More details on the transition to Manifest V3
    - https://developer.chrome.com/en/blog/more-mv2-transition/
  - Avoiding oversharing when screen sharing
    - https://developer.chrome.com/en/blog/avoiding-oversharing-when-screen-sharing/
  - **Meeting you where you are**
    - https://developer.chrome.com/en/blog/cds-22-update/
      - Chrome Dev Summit 2022 は開催しない
      - 代わりに Googler がいろんなカンファレンスに行く
      - Meet the chrome team - Chrome Developers
        - https://developer.chrome.com/meet-the-team/
  - DevTools Tips: Edit, debug, and export user flow recordings
    - https://developer.chrome.com/en/blog/devtools-tips-14/
  - Payment Handler API will require CSP `connect-src`
    - https://developer.chrome.com/en/blog/payment-handler-csp-connect-src/
- chromium blog
  - **Chromium Blog: Announcing the Launch of the Chrome Root Program**
    - https://blog.chromium.org/2022/09/announcing-launch-of-chrome-root-program.html
    - Chrome 内に Root CA の証明書リストを持つ変更
    - 105 から徐々にロールアウトする
    - デバイス側で User が信用しているものは引き続き有効
  - Chromium Blog: Speeding up Chrome on Android Startup with Freeze Dried Tabs
    - https://blog.chromium.org/2022/09/speeding-up-chrome-on-android-startup.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- other

### Firefox 動向

#### Stable: 105

#### Updates

- **Firefox 105.0, See All New Features, Updates and Fixes**
  - https://www.mozilla.org/en-US/firefox/105.0/releasenotes/
    - Windows トラックパッドの 2 本指スワイプで戻る/進むが可能に
- **Firefox 105 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/105
  - `Intl.DateTimeFormat`, `Intl.NumberFormat` などの range restriction が緩和
  - `TextEncoderStream`, `TextDecoderStream`
  - OffscreenCanvas

#### Intents

- **Ship: enhanced color font (COLRv1) support**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Xs0_dixyT9Q
- **Ship: CSS contain-intrinsic-size and longhands**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/QtMpDO5ZHk8
- **Prototype: Default Accessibility Semantics for Custom Elements**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/wB3YLDD0Xuk
  - Cunstom Elements で ElementInternals support
- Prototype: Synchronous initial about:blank
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/RVzIESoPFSs
- Change:
- Remove:
- Unship: MathML3 support for semantics and maction elements
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/MByzRwG-5hg
- Soft code freeze for Firefox 106 starts on September 15
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/fsRlOxDnDwM
- On making HTTPS the default for new tests
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/WTRvzOWQgfo

#### Other

- **1788684 - Access to router.asus.com broken as of version 104**
  - https://bugzilla.mozilla.org/show_bug.cgi?id=1788684
  - ASUS のルーターでうまく接続できないという問題が報告された
  - HSTS preload list に asus.com が追加されたが、ルーターが接続する `http://router.asus.com` もアップグレードされてしまい繋がらない
  - Firefox は暫定的にリストから削除して対応
  - HSTS preload list 側も 9 月下旬に対応
    - chromium/src - 808aa94f75 - [HSTS] Individually remove asus.com from the preload list.
      - https://chromium.googlesource.com/chromium/src/+/808aa94f75f065a6ec2aee48d240c006258fc5df
- **Mozilla_Five-Walled-Gardens.pdf**
  - https://research.mozilla.org/files/2022/09/Mozilla_Five-Walled-Gardens.pdf
  - OS のデフォルトブラウザやその変更のしにくさとか
- **The 100% Markdown Expedition - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2022/09/the-100-percent-markdown-expedition/
  - Markdown 以降が終わった、どうやったかの話。
- These Weeks In Firefox: Issue 122 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/09/06/these-weeks-in-firefox-issue-122/
- These Weeks In Firefox: Issue 123 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/09/09/these-weeks-in-firefox-issue-122-2/
- These Weeks In Firefox: Issue 124 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2022/09/21/these-weeks-in-firefox-issue-124/

### Safari 動向

#### Stable: 16.0

#### Updates

- **Safari 16 Release Notes | Apple Developer Documentation**
  - https://developer.apple.com/documentation/safari-release-notes/safari-16-release-notes
    - CSS
      - Container Queries
      - Subgrid
      - Offset Path
      - Overscroll Behavior
      - resolution media feature
    - Forms
      - requestSubmit()
      - showPicker()
    - Accessibility
      - accessibility support for `display: contents`
    - Authentication
      - passkeys on iOS 16
    - Media
      - non-animated AVIF
    - Web API
      - Shared Workers
      - Shadow Realms
- **Safari 16.1 Beta Release Notes**
  - https://developer.apple.com/documentation/safari-release-notes/safari-16_1-release-notes
  - Authentication
    - passkeys on macOS Big Sur, Monterey, Ventura, iPadOS 16
  - Media
    - AVIF (including animated AVIF) support
  - Web API
    - Web Push Notifications on Ventura
    - Scroll to Text Fragment
- **WebKit Features in Safari 16.0**
  - https://webkit.org/blog/13152/webkit-features-in-safari-16-0/
  - Passkeys
  - Apple Pay
  - Web Inspector Extensions
  - Container Queries
  - Subgrid
  - Web Inspector
  - Accessibility Improvements
  - Animation Improvements
  - Overscroll Behavior
  - Shared Workers
  - Additional Features
  - Fixes and Polish
    - CSS
    - Forms
    - Security
    - WebGL 2
    - Web Inspector
    - Web Driver
    - Safari Web Extensions
- **Release Notes for Safari Technology Preview 153**
  - https://webkit.org/blog/13148/release-notes-for-safari-technology-preview-153/
  - CSS
    - Implemented forced-colors media query (253290@main)
  - JavaScript
    - Implemented import-assertion and JSON module (253234@main)
  - Web API
    - Implemented the Imperative Slot API
    - Implemented full search for text directives for Scroll to Text Fragment spec
    - Added Set-Cookie as a forbidden header name
    - Added generic media query parser and evaluator
    - Added support to the Permissions API for dedicated workers
    - Added support to the Permissions API for Service Workers and Shared Workers
    - Added box-sizing: border-box to table in the User-Agent stylesheet
  - Accessibility
    - Added support for the ARIA 1.3 property aria-description
- **Release Notes for Safari Technology Preview 154**
  - https://webkit.org/blog/13207/release-notes-for-safari-technology-preview-154/
  - CSS
    - Enabled :dir by default
    - Implemented overflow: clip for SVG elements
    - Fixed parsing of list-style CSS property shorthand
  - Web API
    - Added support for ElementInternals.role, ariaLabel, and ariaRoleDescription
    - Added support for PermissionStatus.onchange
    - Added support for InputEvent.isComposing
    - Enabled Scroll To Text Fragment by default
    - Enabled SKAttributionEnabled by default
    - Fixed X-Frame-Options HTTP headers with an empty value being incorrectly ignored
    - Stopped painting a border for images with loading="lazy" before it loaded
  - Accessibility
    - Implemented the ARIA 1.3 mark role, which provides parity with the `<mark>` tag

#### Other

- **[JSC] Disable ShadowRealm by Constellation**
  - https://github.com/WebKit/WebKit/pull/4338
- **Prototype declarative shadow DOM by rniwa**
  - https://github.com/WebKit/WebKit/pull/4693
- Introducing JetStream 2.1
  - https://webkit.org/blog/13146/introducing-jetstream-2-1/

### Edge 動向

#### Stable:

#### Updates

- Microsoft Edge on Linux で SSL Key を設定してネットワークトレースを取得する | Japan Developer Support Internet Team Blog
  - https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/Edge-Linux-sslkeylog/

#### Chakra

#### Other

- WebView2 is now Generally Available for WinUI 2 (UWP) apps
  - https://blogs.windows.com/msedgedev/2022/09/13/webview2-generally-available-winui-2-uwp/
- **Closing a 30 pixel gap between native and web**
  - https://blogs.windows.com/msedgedev/2022/09/27/closing-pixel-gap-native-web-window-controls-overlay/
  - Window Controls Overlay で領域が広がる話
- More reliable web defense
  - https://blogs.windows.com/msedgedev/2022/09/29/more-reliable-web-defense/
- Best Practice: Post-Mortems
  - https://textslashplain.com/2022/09/29/best-practice-post-mortems/
- Badware Techniques: Notification Spam
  - https://textslashplain.com/2022/09/27/badware-techniques-notification-spam/
- Edge's Super-Res Image Enhancement
  - https://textslashplain.com/2022/09/12/edges-super-res-image-enhancement/

### WHATWG/W3C 動向

#### TPAC

- Breakout
  - **File System**
    - https://docs.google.com/presentation/d/12jqBnFuTxnTCrmKsUIZJxQyxAsf0yc6Uz7nKF15JzPw/edit?resourcekey=0-3xJaumMcgsko818iftYRcA
    - File 周り現状まとめ
  - **Open UI TPAC Update 2022**
    - https://onedrive.live.com/view.aspx?resid=5ACBE28A578FB511!3079257&ithint=file%2cpptx&authkey=!AH8NhgDiDmD1j-M
    - selectmenu や popup attr の振り返り
    - Panelset と Tabs に今取り組んでいる
  - **Project Fugu**
    - https://docs.google.com/presentation/d/1Uv7WfCXDLYAb9fbDG4iVZeBSp4aMYSqwYctrJaXLhnU/edit
    - 最後の New capabilities が野心的
      - Multiple screens
      - Screen refresh rate
      - BLE scanning, Serial over Bluetooth
      - Better advanced storage
      - File system access
      - Low-latency audio
  - **TPAC 2022 - CSS Anchoring**
    - https://jhey-presents.netlify.app/tpac-2022/
    - ポップアップなどの配置は難しい
    - 絶対配置が使われるが、ある要素にそって配置するのは力技でやっているのが現状
    - アンカーとなる要素を定義し、変数などで参照できるようにする
    - 画面外にはみ出した場合の位置についても指定方法を検討している
- WebPerf
  - https://docs.google.com/document/d/1RbszCu4NG-fcRRoL1TsP6SvjohIuz-uxv5NZm_6iA4U/edit#
  - **Element Timing and Shadow DOM.pptx**
    - https://onedrive.live.com/view.aspx?resid=A115415BEE319427!1873134&ithint=file%2cpptx&authkey=!AK4Vf4IcS2Q6K_g
    - Shadow DOM の要素が Element Timing で監視できない
    - **MSN.com が React から WebComponents に移行した時それで困った**
  - **nav-speculation/no-vary-query.md**
    - https://github.com/WICG/nav-speculation/blob/no-vary-query/no-vary-query.md
    - この query は Vary に寄与しないと指定するヘッダ
  - **Even earlier hints for connections**
    - https://docs.google.com/presentation/d/1sBAE3Er3tpDhMNB8e0Jrsg51v0_ghJd3aZQGer1xzb0/edit
    - Super Early Hints
    - Early Hints を HTTPS/SVCB record で送る
  - **2022-09-15 TPAC: Shopify Early Hints Retro**
    - https://docs.google.com/presentation/d/182x_lQdf8ML5k1bLlne-z1pGb76oiJujFzxqAEcuMsE/edit
- WebAppSec
  - https://docs.google.com/document/d/1gXvLPz1Fd3i51diHnFtYYRTszTQFpjYPlbncpXlnlLA/preview
  - arcsjs とか TAO 周りの話が気になった
  - arcsjs-chromium/doc/explainer at main · project-oak/arcsjs-chromium
    - https://github.com/project-oak/arcsjs-chromium/tree/main/doc/explainer
- CSS
  - https://github.com/w3c/csswg-drafts/projects/31
  - https://github.com/w3c/csswg-drafts/projects/32
    - custom highlight api
    - @image
    - baseline
    - scope
    - ic
    - logical property by default
    - css toggles
    - :has()
    - shared element transition FPWD

#### Draft

- Recommendation
  - Payment Request API and Payment Method Identifiers are W3C Recommendations
    - https://www.w3.org/blog/news/archives/9672
- Proposed Recommendation
- Candidate Recommendation
  - W3C Invites Implementations of WCAG 2.2
    - https://www.w3.org/blog/news/archives/9666
- Working Draft
- First Public Working Draft
  - Trusted Types
    - https://www.w3.org/blog/news/archives/9702
  - A Well-Known URL for Changing Passwords
    - https://www.w3.org/blog/news/archives/9705
- Chartering
- Draft Note: W3C Accessibility Maturity Model
  - https://www.w3.org/blog/news/archives/9669
- New Resource: Digital Accessibility Course List
  - https://www.w3.org/blog/news/archives/9683
  - Course List | Web Accessibility Initiative (WAI) | W3C
    - https://www.w3.org/WAI/courses/list/
- First Board of Directors to Initiate Critical Functions of W3C Inc.
  - https://www.w3.org/blog/news/archives/9685

#### Other

- **[selectors] The forgiving nature of :has breaks jQuery when used with a complex :has selector · Issue #7676 - w3c/csswg-drafts**
  - https://github.com/w3c/csswg-drafts/issues/7676
    - F2F で jQuery と `:has()` の問題が取り上げられた
    - Chrome は WebKit の挙動(バグ)に合わせたが、完全には解決しない
    - 壊れる範囲がまだどれくらいか分からない
    - もし影響が大きい場合、`:has()` の引数を unforgiving に変えるかも
    - 注視していきたい、みたいな感じで終わってしまった
- **Permissions workshop 2022 - Issue #348 - w3c/strategy**
  - https://github.com/w3c/strategy/issues/348
    - 2018 年にやった Permissions and User Consent ワークショップの 2 回目を検討しているらしい
- **W3C TPAC 2022 Sustainability Community Group Meeting - Tantek**
  - https://tantek.com/2022/267/b1/w3c-tpac-sustainability-cg-meeting
- **TPAC 2022 - Rego's Everyday Life**
  - https://blogs.igalia.com/mrego/2022/09/28/tpac-2022/
  - igalia の TPAC 参加記
  - "You should hire Igalia to implement that" という声が何度もあった

### TC39 動向

- Meeting のある月はステージの移動のみ見る
- 翌月に公開された Note だけを見る

#### Meeting

- 2022-09
  - agendas/09.md at main · tc39/agendas
    - https://github.com/tc39/agendas/blob/main/2022/09.md

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2022-08-01}...main@{2022-10-01}
- 0->1
  - Extractors
- 1->2
  - Well-Formed Unicode Strings
  - JSON.parseImmutable (Record & Tuple から分離)
- 2->3
  - Array.fromAsync
- 3->4

#### New Proposals

- **tc39/proposal-extractors**
  - https://github.com/tc39/proposal-extractors
  - Symbol.matcher で destructuring 時に同時にロジックを挟む提案

#### Other

- **The Unicode Blog: Announcing ICU4X 1.0**
  - https://blog.unicode.org/2022/09/announcing-icu4x-10.html
  - ICU の Rust 実装が 1.0 に
  - Mozilla での Intl.Segmenter の実装が進むかも

### IETF 動向

#### WG

- IETF
  - https://datatracker.ietf.org/meeting/
- httpwg
  - Interim planning: October 2022
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JulSep/0142.html
    - 10/5 に Interim
  - Alt-Svc design team
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JulSep/0171.html
    - Alt-Svc のデザインチームができた
  - Working Group Last Call: draft-ietf-httpbis-message-signatures-13
    - https://lists.w3.org/Archives/Public/ietf-http-wg/2022JulSep/0183.html
- quicwg
  - https://mailarchive.ietf.org/arch/browse/quic/
  - https://github.com/quicwg/wg-materials
- webtrans
  - https://mailarchive.ietf.org/arch/browse/webtransport/
  - https://github.com/DavidSchinazi/webtrans-wg-materials
- tlswg
  - https://mailarchive.ietf.org/arch/browse/tls/
  - https://github.com/tlswg/wg-materials
- wpack
  - https://mailarchive.ietf.org/arch/browse/wpack/
- masque
- pearg
- privacypass
- dispatch
  - https://mailarchive.ietf.org/arch/browse/dispatch/
- secdispatch
  - https://mailarchive.ietf.org/arch/browse/secdispatch/

#### Other

### CDN 動向

#### Cloudflare

- Speed & Reliability
- Security
- Developers
- Deep Dive
- **Blocking Kiwifarms**
  - https://blog.cloudflare.com/kiwifarms-blocked/
  - 海外版 5ch のような過激な掲示板をブロックした話
- **How to enable Private Access Tokens in iOS 16 and stop seeing CAPTCHAs**
  - https://blog.cloudflare.com/how-to-enable-private-access-tokens-in-ios-16-and-stop-seeing-captchas/
- The (hardware) key to making phishing defense seamless with Cloudflare Zero Trust and Yubico
  - https://blog.cloudflare.com/making-phishing-defense-seamless-cloudflare-yubico/
- **Announcing Turnstile, a user-friendly, privacy-preserving alternative to CAPTCHA**
  - https://blog.cloudflare.com/turnstile-private-captcha-alternative/

#### Fastly

- **A QUIC Chat, With Jana Iyengar | Fastly**
  - https://www.fastly.com/blog/a-quic-chat-with-jana-iyengar-rebuilding-fundamental-standards-of-the-web
- Video Cache Prefetch with Compute@Edge | Fastly
  - https://www.fastly.com/blog/video-cache-prefetch-with-compute-edge
- No-origin, static websites at the edge! | Fastly
  - https://www.fastly.com/blog/no-origin-static-websites-at-the-edge
- Node.js-style HTTP interfaces for Compute@Edge | Fastly
  - https://www.fastly.com/blog/node-js-style-http-interfaces-for-compute-edge
- **Private Access Tokens and the Future of Anti-Fraud | Fastly**
  - https://www.fastly.com/blog/private-access-tokens-and-the-future-of-anti-fraud

#### Other

### セキュリティ動向

- Current MFA Fatigue Attack Campaign Targeting Microsoft Office 365 Users - GoSecure
  - https://www.gosecure.net/blog/2022/02/14/current-mfa-fatigue-attack-campaign-targeting-microsoft-office-365-users/
  - MFA Fatigue = 故意にログインの SMS 送信を繰り返し強引に認証させる攻撃
  - これにより GTA 新作のリークに使われた
  - https://www.itmedia.co.jp/news/articles/2209/28/news050.html
- Security update | Uber Newsroom
  - https://www.uber.com/newsroom/security-update
  - Uber も MFA Fatigue の被害を受けた
- Passkeys | ImperialViolet
  - https://www.imperialviolet.org/2022/09/22/passkeys.html
- **No More EV Certificate Overhead in Chrome 106 - WebPageTest Blog**
  - https://blog.webpagetest.org/posts/eliminating-ev-certificate-performance-overhead/

### 周辺動向

- **Apple joins the Open Web Docs Steering Committee - Open Collective**
  - https://opencollective.com/open-web-docs/updates/apple-joins-the-open-web-docs-steering-committee
- **Dear Oracle, Please Release the JavaScript Trademark**
  - https://tinyclouds.org/trademark
  - "JavaScript の商標を手放してくれ" という ry から Oracle へのメッセージ
- **Honoring Peter Eckersley, Who Made the Internet a Safer Place for Everyone | Electronic Frontier Foundation**
  - https://www.eff.org/deeplinks/2022/09/honoring-peter-eckersley-who-made-internet-safer-place-everyone
  - Let's Encrypt の立ち上げなどに貢献した Peter Eckersley が亡くなった
- **Adobe Buys Figma: What Does this Mean for Web Standards? - The New Stack**
  - https://thenewstack.io/adobe-buys-figma-what-does-this-mean-for-web-standards/
- **The 2022 Web Almanac**
  - https://almanac.httparchive.org/en/2022/
- **A message about Stadia and our long term streaming strategy**
  - https://blog.google/products/stadia/message-on-stadia-streaming-strategy/
  - Stadia が終了
- A Safer, More Centralised Australian Internet
  - https://www.mnot.net/blog/2022/09/11/esafety-industry-codes
- Sacha Greif on Twitter: "Anybody want to help us test the 2022 State of CSS survey? It's now open, let us know if you find any bugs or issues"
  - https://twitter.com/SachaGreif/status/1575647229259714560

### イベント

- 10 月
- 11 月
  - 5-11: IETF 115 London
    - https://www.ietf.org/how/meetings/115/
  - 15-17: BlinkOn17
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/16LQXKmAD4s
  - 29-1: TC39
    - https://github.com/tc39/agendas/blob/main/2022/11.md
    - ### Wrap Up
- Chrome
  - 106
    - Popup API Origin Trial
  - 107
    - wildcards in permissions policy origins
    - Declarative Pending Beacon API OT
    - Permissions-Policy: unload OT
    - Expect-CT removal
  - Ship
    - Android OSK resizes visual viewport
    - Array grouping
    - `@supports` selector non-forgiving parsing
    - Small/Large/Dynamic viewport units
    - OPFS on Android
  - Prototype
    - `lh` unit
    - Same-site cross-origin prerendering by Speclation Rules
    - Web Smart Card API
  - web.dev
    - Interop 2023 proposals
    - Learn HTML/Accessibility
  - Chrome Developers
    - Popup API
    - CDS 2022 開催はなし
  - Chromium blog
    - Chrome Root Program
- Firefox
  - 105
    - TextEncorderStream/TextDecoderStream
    - OffscreenCanvas
  - Ship
    - COLRv1 fonts
    - ElementInternals ARIA reflection
  - other
    - HSTS preload list に `asus.com` が追加されルータに繋がらなくなったバグ
- Safari
  - 16.0
    - Container Queries
    - Subgrid
    - passkeys on iOS
    - non-animated AVIF
    - Shared Workers
  - TP 153
    - Import Assetions and JSON modules
    - Imperative Slot API
    - aria-description
  - TP 154
    - :dir
    - ElementInternals ARIA reflection
    - Scroll To Text Fragment
  - blog
  - other
    - Disable ShadowRealm
    - Prototype Declarative Shadow DOM
- Edge
  - Window Controlls Overlay で 30px のタイトルバー部分が使える
- W3C/WHATWG
  - TPAC
    - Breakout
      - File System
      - Open UI
      - Fugu
      - CSS Anchoring
    - WebPerf
      - MSN.com が React から WebComponents に移行した話
      - no-vary-query
      - Super Early Hints
  - Spec
    - Trusted Types FPWD
    - Well-Known URL Change Password FPWD
  - other
    - TPAC で `:has` 問題の議論がふんわり終わってしまった
    - Permissions and User Consent の 2 回目を予定
    - Tanteck による Sustinability CG Meeting まとめ
- TC39
  - proopsal-extractors
  - Rust 実装の ICU4X1.0 リリースで FF Intl.Segmenter が進みそう
- IETF
  - Alt-SVC デザインチームができた
- CDN 動向
  - Cloudflare が過激化した Kiwifarms をブロックした話
  - Private Access Token 系の記事が多い
- セキュリティ動向
  - GTA と Uber に MFA Fatigue 攻撃
  - EV 証明書の OCSP 検証が無くなったため高速化したサイトの話 by WebPageTest
- 周辺動向
  - Open Web Docs SteeringCommittee に Apple 参加
  - JavaScript の商標を手放して欲しい by Ryan Dahl
  - Let's Encrypt の立ち上げに貢献した Peter が死去
  - Adobe Figma 買収が Web に与える影響
  - 2022 Web Almanac
  - Stadia 終了アナウンス
