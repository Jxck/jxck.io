---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep146.mp3
published_at: 2024-03-30
guest: [@myakura](https://twitter.com/myakura)
---

# ep146 Monthly Platform 202403

## Theme

第 146 回のテーマは 2024 年 3 月の Monthly Platform です。

## Show Note

### Chrome 動向

#### Stable: 123

#### Updates

- New in Chrome 123
  - https://developer.chrome.com/blog/new-in-chrome-123
  - **light-dark() CSS function.**
  - **Long Animation Frames API.**
  - **Service worker Static Routing API.**
- What's new in DevTools (Chrome 123)
  - https://developer.chrome.com/blog/new-in-devtools-123
  - Emulate a focused page in Elements > Styles
- **Google I/O 2024**
  - https://io.google/2024/
- Chrome 124 beta
  - https://developer.chrome.com/blog/chrome-124-beta
  - CSS
    - CSSImportRule.styleSheet
    - CSSKeyframesRule.length
  - HTML
    - **The writingsuggestions attribute**
    - **Keyboard-focusable scroll containers**
  - Web APIs
    - Additions to the Attribution Reporting API
    - Document picture-in-picture: add option to hide back-to-tab button
    - **Document render-blocking**
    - jitterBufferTarget attribute
    - pageswap event
    - **priority HTTP request header**
    - Private Network Access permission to relax mixed content
    - **Sec-CH-UA-Form-Factors client hint**
    - **setHTMLUnsafe and parseHTMLUnsafe**
    - Updates to the Shared Storage API
    - Streams API: ReadableStream async iteration
    - SVG context-fill and context-stroke
    - WebGPU: ServiceWorker and SharedWorker support
    - **The WebSocketStream API**
    - X25519Kyber768 key encapsulation for TLS
  - Origin trials in progress
    - **Deprecation trial for mutation events**
  - Deprecations and removals
    - Remove "window-placement" alias for permission and permission policy "window-management"

#### Intents

- Ship: 'pageswap' event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7EaEnJ14W1I
- **Ship: Document Render-Blocking**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/19n4jmAlD6w
- **Ship: FedCM CORS requirement on ID assertion endpoint**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/gYoQJsaiD9E
- Ship: Private Aggregation debug mode for auctionReportBuyers reporting
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/akQN5Iro5AM
- Ship: Used color scheme root scrollbars
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UdOQkoMJYnY
- **Ship: Compute Pressure**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7leKysvPZWk
- Ship: RegExp duplicate named capture groups
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/882bEYP9yKw
- Ship: Standard-compliant pseudo-element argument for getComputedStyle & KeyframeEffect
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/p-7KuUD_p20
- Ship: WebGPU: ServiceWorker and SharedWorker support
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/I6pfkNv0acY
- Ship: Adding Cross-site Ancestor Chain Bit to CHIPS Partition Key
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/d3kJtNXcECk
- **Ship: 'writingsuggestions' attribute**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NhWn64yxB5Q
- Ship: Document picture-in-picture: add option to hide back-to-tab button
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3lZDbHsRmO4
- **Ship: Extending Storage Access API (SAA) to non-cookie storage**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/F5EV8I-j7Eg
- Ship: Protected Audience: Split up large trusted signals fetches & deprectedReplaceInURN via auction config
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Z9v_94NhDME
- Ship: SVG context-fill and context-stroke
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/uH_CBc1O2kI
- Ship: Attribution Reporting Feature Bundle: Header Error Debug Reports, Preferred Platform field, Changing Source Deactivation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aregp1li6xk
- Ship: CSS view-transition-class and class VT argument syntax
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/cYoXygoSrNM
- Ship: X25519Kyber768 key encapsulation for TLS on Desktop
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6xfaov3Z4yo
- **Ship: Allow top layer elements to be nested within popovers**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3vIL56MTgvw
- **Ship: RegExp modifiers**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Hlh6DOL-Zvo
- Ship: Used color scheme root scrollbars
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UdOQkoMJYnY
- Ship: visualViewport.onscrollend Support
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AFJeQSZcNeM
- Implement and Ship: OpusEncoderConfig `signal` and `application` parameters
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZFB4r7NKE6M
- **Prototype: Confirmation of Action API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JBpUXKsJ5qg
- Prototype: No-Vary-Search support for prerender
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/k1_fjhVikxk
- **Prototype: PNA permission prompt for non-fetch requests**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bz97-foS2Lo
- **Prototype: TLS trust expressions**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/R6VOVMt81y8
- Prototype: Web Serial connected attribute and RFCOMM connection events
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dkz0IdP7kao
- Prototype: Speculation Rules Prefetch: Vary on particular cookies
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FQ66_Zf2JS4
- **Prototype: Playout Statistics API for WebAudio**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mokJAXhFzek
- Prototype: Gamepad API Trigger-Rumble Extension
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ncvmDRl0AzM
- Prototype: Document picture-in-picture: propagate user activation
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MwH0ODG4bec
- **Prototype: FedCM as a trust signal for the Storage Access API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bS2PzyzhA-A
- Experiment: FedCM Button Mode API and Use Other Account API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/bQqXXv2S9q0
- Experiment: Add JavaScript timer wake up alignment for unimportant cross-origin frames
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/z3A3J3OZRvQ
- Experiment: WebAssembly JS String Builtins
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/k7DQ3qYbn90
- **Experiment: Skip Preload Scanning**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nTuEKYVDv-I
- Extend Deprecation Trial: Restrict "private network requests" for subresources from public websites to secure contexts.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CkRSC8QEJKk
- Extend Experiment: Extending Storage Access API (SAA) to non-cookie storage
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/AjH7tGxuVuw
- Extend Experiment: Capture all screens
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HErdlr3e_V0
- Extend Deprecation Trial: Removal of X-Requested-With in WebView
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_39OMb7C_tI
- Continue Experimenting: Tabbed Web Apps
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/5aRDL-E9olQ
- Deprecate and remove: Stop sending blur events on element removal
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/L1aI9JZTrBs
- **Deprecate and Remove: Deprecate the includeShadowRoots argument on DOMParser**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KT6UuYp1pmE
- **Ready for Developer Testing: document.caretPositionFromPoint API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/v4MLESmFR1c
- Intent for Reverse Origin Trial: Media Previews opt-out
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/f_x-iPGZSPg
- Change:
- Unship:
- Remove:
- Web-Facing Change PSA: Lazy load scroll margin for iframes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/BumvKm6DYxY
- Web-Facing Change PSA: SharedWorker script inherit controller for blob script URL
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hClP93e4MLk
- Web-Facing Change PSA: Stop modifying author-defined selection colors
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qUG-IHSwLWs
- Web-Facing Change PSA: Update LongTask code to use Long animation frames as a backend
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/R_6k1ZTf6uA
- Coming soon: Windows ClearType Text Tuner Integration
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MAordfWXb7E

#### Other

- web.dev
  - https://web.dev/
  - Blog
    - New to the web platform in February
      - https://web.dev/blog/web-platform-02-2024
    - Interaction to Next Paint is officially a Core Web Vital 🚀
      - https://web.dev/blog/inp-cwv-launch
  - Articles
    - Why is CrUX data different from my RUM data?
      - https://web.dev/articles/crux-and-rum-differences
    - Add a web app manifest
      - https://web.dev/articles/add-manifest
    - SameSite cookies explained
      - https://web.dev/articles/samesite-cookies-explained
    - Custom metrics
      - https://web.dev/articles/custom-metrics
    - Content security policy
      - https://web.dev/articles/csp
    - Cross-Origin Resource Sharing (CORS)
      - https://web.dev/articles/cross-origin-resource-sharing
    - Back and forward cache
      - https://web.dev/articles/bfcache
    - Accessibility for web developers
      - https://web.dev/articles/a11y-tips-for-web-dev
    - userVerification deep dive
      - https://web.dev/articles/webauthn-user-verification
    - The `<model-viewer>` web component
      - https://web.dev/articles/model-viewer
    - Capture audio and video in HTML5
      - https://web.dev/articles/getusermedia-intro
    - Compiling to and optimizing Wasm with Binaryen
      - https://web.dev/articles/binaryen
    - Interaction to Next Paint (INP)
      - https://web.dev/articles/inp
    - Optimize long tasks
      - https://web.dev/articles/optimize-long-tasks
    - Determine the passkey provider with AAGUID
      - https://web.dev/articles/webauthn-aaguid
  - Case Studies
    - How PubTech's Consent Management Platform reduced INP on their customers' websites by up to 64%, while also improving ad viewability by up to 1.5%
      - https://web.dev/case-studies/pubconsent-inp
- google for developers
  - https://developers.googleblog.com/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - Chrome Extensions: eyeo's journey to testing service worker suspension
    - https://developer.chrome.com/blog/eyeos-journey-to-testing-mv3-service%20worker-suspension
  - **Improvements to the Speculation Rules API**
    - https://developer.chrome.com/blog/speculation-rules-improvements
  - **Supercharge compression efficiency with shared dictionaries**
    - https://developer.chrome.com/blog/shared-dictionary-compression
  - A Next.js package for managing third-party libraries
    - https://developer.chrome.com/blog/next-third-parties
  - What's New in WebGPU (Chrome 123)
    - https://developer.chrome.com/blog/new-in-webgpu-123
  - Hide extension requests plus more Network panel improvements
    - https://developer.chrome.com/blog/network-panel-improvements
  - **Performance tooling in 2024 and beyond**
    - https://developer.chrome.com/blog/perf-tooling-2024
  - Private Network Access: Extended protection for web workers and navigation fetches
    - https://developer.chrome.com/blog/private-network-access-update-2024-03
  - Use the Service Worker Static Routing API to bypass the service worker for specific paths
    - https://developer.chrome.com/blog/service-worker-static-routing
  - **Keyboard focusable scrollers**
    - https://developer.chrome.com/blog/keyboard-focusable-scrollers
  - **WebAssembly JavaScript Promise Integration (JSPI) enters origin trial**
    - https://developer.chrome.com/blog/webassembly-jspi-origin-trial
- chromium blog
  - https://blog.chromium.org/
  - **Chromium Blog: Speedometer 3: Building a benchmark that represents the web**
    - https://blog.chromium.org/2024/03/speedometer-3-building-benchmark-that.html
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - https://security.googleblog.com/
  - **Google Online Security Blog: Secure by Design: Google's Perspective on Memory Safety**
    - https://security.googleblog.com/2024/03/secure-by-design-googles-perspective-on.html
  - Press Release: Future Software Should Be Memory Safe | ONCD | The White House
    - https://www.whitehouse.gov/oncd/briefing-room/2024/02/26/press-release-technical-report/
  - **Google Online Security Blog: Real-time, privacy-preserving URL protection**
    - https://security.googleblog.com/2024/03/blog-post.html
    - Fastly との OHTTP を裏で使っている
  - **Google Online Security Blog: Vulnerability Reward Program: 2023 Year in Review**
    - https://security.googleblog.com/2024/03/vulnerability-reward-program-2023-year.html
- search blog
  - What web creators should know about our March 2024 core update and new spam policies
    - https://developers.google.com/search/blog/2024/03/core-update-spam-policies
- v8
  - **WebAssembly JSPI is going to origin trial · V8**
    - https://v8.dev/blog/jspi-ot
- other
  - **[text-spacing-trim] Glyph collides if the font is "Yu Gothic UI" [331123676] - Chromium**
    - https://issues.chromium.org/issues/331123676
    - Yu Gothic UI の括弧に問題があり、`text-spacing-trim`を適用すると括弧が重なる
  - Yu Gothic UI に text-spacing-trim を適用するとバグる
    - https://zenn.dev/inaniwaudon/scraps/f224417d4c51ee

### Firefox 動向

#### Stable: 124

#### Updates

- Firefox 124.0, See All New Features, Updates and Fixes
  - https://www.mozilla.org/en-US/firefox/124.0/releasenotes/
- **Firefox 124 for developers - Mozilla | MDN**
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/124
  - content-visibility: auto
  - text-wrap-mode/text-wrap-style
  - AbortSignal.any()
- Inspector Performance and Other Improvements - These Weeks in Firefox: Issue 155
  - https://blog.nightly.mozilla.org/2024/02/26/inspector-performance-and-other-improvements-these-weeks-in-firefox-issue-155/
- A Better Screenshots Tool and More - These Weeks in Firefox: Issue 156 - Firefox Nightly News
  - https://blog.nightly.mozilla.org/2024/03/11/a-better-screenshots-tool-and-more-these-weeks-in-firefox-issue-156/
- **Improving Performance in Firefox and Across the Web with Speedometer 3 - Mozilla Hacks - the Web developer blog**
  - https://hacks.mozilla.org/2024/03/improving-performance-in-firefox-and-across-the-web-with-speedometer-3/

#### Intents

- Ship: WebAssembly multi-memory
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/U8Byr8LyUcg
- Ship: Gradient rendering in different color interpolation methods
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/cim0y5zi56Q
- **Ship: navigator.clipboard.readText()**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/flwThuV-_nE
- **Ship: CustomStateSet**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Md19-4lLhBc
- **Prototype: ARIA Element Reflection**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/uWjLctFTlxo
- Prototype: Selection.getComposedRanges() and ShadowDOM Selection
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/zF7soLapT-Y
- **Prototype and Ship: align-content on block containers**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/fvcMHPaMdz4
- **Prototype & Ship: URL.parse()**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/3QgJqDYpEwA
  - Consider adding non-throwing URL.parse(input, base) · Issue #372 · whatwg/url
    - https://github.com/whatwg/url/issues/372#issuecomment-2022176315
- Change:
- Remove:

#### Newsletter

- Firefox DevTools Newsletter - 123 - Firefox Developer Experience
  - https://fxdx.dev/firefox-devtools-newsletter-123/
- Firefox WebDriver Newsletter - 124 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-124/
- Necko Newsletter #5: Strengthening Community Involvement
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Ytr6DpwBISw
- SpiderMonkey Newsletter (Firefox 124-125) | SpiderMonkey JavaScript/WebAssembly Engine
  - https://spidermonkey.dev/blog/2024/03/20/newletter-firefox-124-125.html

#### MDN / Open Web Docs

- **Lift-off: The MDN Curriculum launch**
  - https://developer.mozilla.org/en-US/blog/mdn-curriculum-launch/
- Modernizing conventional test automation with TestGrid
  - https://developer.mozilla.org/en-US/blog/modernizing-test-automation-with-test-grid/
- Creating color palettes with the CSS color-mix() function
  - https://developer.mozilla.org/en-US/blog/color-palettes-css-color-mix/
- Introducing our Director of Open Web Docs - Florian Scholz!
  - https://openwebdocs.org/content/posts/florian-owd-director/
- **Igalia Joins Open Web Docs Governing Committee**
  - https://openwebdocs.org/content/posts/igalia-gc/
- Testing JavaScript with Jest on Vultr
  - https://developer.mozilla.org/en-US/blog/test-javascript-with-jest-on-vultr/
- **Interop 2023: MDN updates**
  - https://developer.mozilla.org/en-US/blog/interop2023-mdn-doc-updates/

#### Standard Position

- 今月 Close された Issue と PR ものをみる
  - https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2024-03-01+
  - Positive
    - MediaRecorder: Support mp4 container with avc1 and mp4a.40.2 codecs for MediaRecorder #996
    - [css-color-adjust-1] Root non-overlay scrollbars used color scheme #995

#### Other

- **You can now sponsor Servo on GitHub and Open Collective! - Servo, the embeddable, independent, memory-safe, modular, parallel web rendering engine**
  - https://servo.org/blog/2024/03/12/sponsoring-servo/
- Searchfox Update: calls-between and other diagram improvements
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/g-_UH5cdTtQ
- **Manifest V3 & Manifest V2 (March 2024 update) - Mozilla Add-ons Community Blog**
  - https://blog.mozilla.org/addons/2024/03/13/manifest-v3-manifest-v2-march-2024-update/
- MathML layout tests have all been converted to WPT format
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/qGqxddNMkOQ
- ESMification: in-tree migration completed!
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/GDAs-WJiiu8
- **Mozilla just ditched its privacy partner because its CEO is tied to data brokers - The Verge**
  - https://www.theverge.com/2024/3/22/24109116/mozilla-ends-onerep-data-removal-partnership
  - Mozilla Monitor Plus で使っていた Onerep という個人情報削除ツールとの提携をやめた
  - Onerep の CEO がデータブローカーの会社も立ち上げていたことがわかったため
- **Didthis A New App for Hobbyists**
  - https://blog.mozilla.org/en/internet-culture/introducing-didthis-a-new-app-for-hobbyists/
- **Update Firefox on Android UA string Android version · Issue #257 · whatwg/compat**
  - https://github.com/whatwg/compat/issues/257#issuecomment-1973814589
  - Android 版 Firefox の UA 文字列で Android のバージョンを固定したが Cisco のソフトウェアが壊れたためリバートされた

### Safari 動向

#### Stable: 17.4.1

#### Updates

- An HTML Switch Control
  - https://webkit.org/blog/15054/an-html-switch-control/
- WebKit Features in Safari 17.4
  - https://webkit.org/blog/15063/webkit-features-in-safari-17-4/
  - Architectural improvements
  - Web Apps
    - shortcuts
    - categories
  - Form elements
    - **Switch control**
    - **Vertical writing modes**
    - **Horizontal Rules inside Select**
    - And more
      - showPicker()
  - CSS
    - **Inline Layout**
      - 21 年物のインラインレイアウトエンジンを刷新
      - Ruby も再実装
      - 今後は他(Flexbox など)の formatting contexts も刷新していく
    - Align content everywhere
    - **CSS Scoping**
    - White space and text wrap
      - **white-space-collapse**
      - **text-wrap-mode**
    - Percentages in spacing
      - letter-spacing
      - word-spacing
    - Styling grammar and spelling errors
      - **::spelling-error**
      - **::grammar-error**
    - Alt text for generated content
      - content: "foo" / "bar"
    - Transitions
      - transition-behavior
    - **:has()**
    - And more
      - ::backdrop
  - Web API
    - element.checkVisibility()
    - **setHTMLUnsafe**
    - **parseHTMLUnsafe**
    - CustomStateSet
    - DOMMartixReadOnly
    - **AbortSignal.any()**
  - JavaScript
    - **Promise.withResolvers**
    - Intl.DateTimeFormat
    - ArrayBuffer.prototype.transfer
    - **Object.groupBy(), Map.groupBy()**
  - Media
    - Additional codecs
      - **WebM (VP8, VP9) on iOS/iPadOS**
      - Vorbis
      - HEVC
    - Source prioritization
      - コーデック選択を出現順ではなく内容で選ぶ
    - WebVTT
      - HTML char entities のサポート
    - MediaStream
      - whiteBalanceMode
  - SVG
  - WebGL
  - Web Assembly
  - Web Inspector
  - Changes to Safari
  - Safari Extensions
  - Web Authentication
    - PublicKeyCredentials.getClientCapabilities()
  - Bug Fixes and more
    - Accessibility
    - Browser Changes
    - CSS
    - Forms
    - Fullscreen
    - HTML
    - JavaScript
    - Loading
    - Lockdown Mode
    - Media
    - Rendering
    - Safari Extensions
    - Scrolling
    - Storage
    - SVG
    - URLs
    - Web Animations
    - Web API
    - Web Inspector
    - WebGL
    - WebKit
    - WebRTC
- **Update on apps distributed in the European Union - Support - Apple Developer**
  - https://developer.apple.com/support/dma-and-apps-in-the-eu/
  - > Why don't users in the EU have access to Home Screen web apps?
  - > UPDATE: Previously, Apple announced plans to remove the Home Screen web apps capability in the EU as part of our efforts to comply with the DMA. The need to remove the capability was informed by the complex security and privacy concerns associated with web apps to support alternative browser engines that would require building a new integration architecture that does not currently exist in iOS.
  - > We have received requests to continue to offer support for Home Screen web apps in iOS, therefore we will continue to offer the existing Home Screen web apps capability in the EU. This support means Home Screen web apps continue to be built directly on WebKit and its security architecture, and align with the security and privacy model for native apps on iOS.
  - > Developers and users who may have been impacted by the removal of Home Screen web apps in the beta release of iOS in the EU can expect the return of the existing functionality for Home Screen web apps with the availability of iOS 17.4 in early March.
- **App Store 、 Spotify 、そして欧州の活気あるデジタル音楽市場 - Apple (日本)**
  - https://www.apple.com/jp/newsroom/2024/03/the-app-store-spotify-and-europes-thriving-digital-music-market/
- Release Notes for Safari Technology Preview 190
  - https://webkit.org/blog/15127/release-notes-for-safari-technology-preview-190/
  - Authentication
    - Added support for CTAP to set a pin. (274385@main) (113573055)
  - CSS
    - Added support for the safe keyword in flexbox properties. (274304@main) (118000717)
    - **Added support for CSS style container queries. (274481@main) (122800215)**
  - History
  - HTML
    - Added support for the shadowrootclonable attribute and aligned with declarative shadow root standards changes. In particular, web developers will now have to set this attribute if they want their declarative shadow root to be clonable. (274727@main) (123006751)
  - JavaScript
  - Media
    - Removed non-standard VTTRegion.track. (274936@main) (123172214)
  - Networking
  - Rendering
  - SVG
    - Added support for the turn unit in angle. (274778@main) (120840743)
  - URLs
    - Resolved Issues
  - Web API
    - Resolved Issues
  - Web Inspector
    - **Disabled the network throttling experimental feature. (274112@main) (122327408)**
- Release Notes for Safari Technology Preview 191
  - https://webkit.org/blog/15243/release-notes-for-safari-technology-preview-191/
  - Accessibility
    - **Added support for ariaBrailleLabel and ariaBrailleRoleDescription element reflection properties. (275591@main) (123926949)**
  - Authentication
  - CSS
  - Forms
  - History
    - Added logic to determine the hasUAVisualTransition value. (275438@main) (118347060)
  - JavaScript
  - Lockdown Mode
  - Media
    - **Added support for WebCodecs AV1 when an AV1 hardware decoder is available. (275174@main) (123433815)**
  - SVG
  - Web API
  - Web Inspector
  - WebRTC
- **Speedometer 3.0: The Best Way Yet to Measure Browser Performance**
  - https://webkit.org/blog/15131/speedometer-3-0-the-best-way-yet-to-measure-browser-performance/
- **Implementing Vertical Form Controls**
  - https://webkit.org/blog/15190/implementing-vertical-form-controls/
- **Introducing Natural Input for WebXR in Apple Vision Pro**
  - https://webkit.org/blog/15162/introducing-natural-input-for-webxr-in-apple-vision-pro/

#### Standard Positions

- 今月 Close されたものをみる
  - https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2024-03-01+
  - 今月はなし

#### Other

- Web Inspector: Remove throttling experimental feature pending correct... · WebKit/WebKit@6c1979d
  - https://github.com/WebKit/WebKit/commit/6c1979d64380ab4eedf703a4dd4f92eca1e61515
- Office of Public Affairs | Justice Department Sues Apple for Monopolizing Smartphone Markets | United States Department of Justice
  - https://www.justice.gov/opa/pr/justice-department-sues-apple-monopolizing-smartphone-markets
- **Family Emoji Redesign - Gender Inclusive Variations - 23029-family-emoji.pdf**
  - https://www.unicode.org/L2/L2023/23029-family-emoji.pdf
- iOS 17.4 Emoji Changelog
  - https://blog.emojipedia.org/ios-17-4-emoji-changelog/
- **Update: 2024-03-30**
  - Family にカラーバリエーションをつけるとバラけるのは、以前のフォントからそうでした。

### Edge 動向

#### Stable: 123

#### Updates

#### Other

- Latest (and greatest) AI-powered tools in Edge you didn't know you needed - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2024/02/29/ai-powered-tools-in-edge/
- **Browser Extensions: Powerful and Potentially Dangerous - text/plain**
  - https://textslashplain.com/2024/03/07/browser-extensions-powerful-and-potentially-dangerous/
  - 拡張は便利だが危険でもある
  - 最初は安全であっても、将来も安全とは限らない
  - manifest v3 はこれを緩和するものだが、陰謀論が広まった
  - できるだけブラウザ機能で行い、不要なものは削除すべき
  - 社内では、許可リスト以外をブロックするポリシーがあった方がいい
  - 独自の社内 Web ストアを作ってレビューしたものを管理することもできる
  - 参考になる PDF もある
  - https://support.google.com/chrome/a/answer/9296680
- **Contributing to Speedometer 3.0: Capturing real-world challenges on the web - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2024/03/11/contributing-to-speedometer-30/
- Dev Channel update to 124.0.2450.2 is live. - Microsoft Community Hub
  - https://techcommunity.microsoft.com/t5/articles/dev-channel-update-to-124-0-2450-2-is-live/m-p/4085888#M6835
- Making Mojo Exploits More Difficult | Microsoft Browser Vulnerability Research
  - https://microsoftedge.github.io/edgevr/posts/Making-Mojo-Exploits-More-Difficult/
- pushState and URL Blocking - text/plain
  - https://textslashplain.com/2024/03/20/pushstate-and-url-blocking/
- Attacker Techniques: Gesture Jacking - text/plain
  - https://textslashplain.com/2024/03/27/attacker-techniques-gesture-jacking/
- **Deprecated features in the Windows client - What's new in Windows | Microsoft Learn**
  - https://learn.microsoft.com/en-us/windows/whats-new/deprecated-features
  - Windows は TLS の RSA Key で 2048bit 以下を deprecate した
  - https://www.bleepingcomputer.com/news/microsoft/microsoft-announces-deprecation-of-1024-bit-rsa-keys-in-windows/

### WHATWG/W3C 動向

#### Draft

- Recommendation
- Proposed Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft

#### Open/UI

- https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-03-07.md
- https://github.com/openui/open-ui/blob/main/meetings/telecon/2024-03-14.md
- 特になし

#### Other

- **Marking the Web's 35th Birthday: An Open Letter - World Wide Web Foundation**
  - https://webfoundation.org/2024/03/marking-the-webs-35th-birthday-an-open-letter/
- **W3C adopts new Code of Conduct (Code)**
  - https://www.w3.org/news/2024/w3c-adopts-updated-code-of-conduct-code/
- Hiring: Chief Development Officer
  - https://www.w3.org/news/2024/hiring-chief-development-officer/
- Hiring: Accessibility Content Specialist (worldwide); Technical Specialist (USA)
  - https://www.w3.org/news/2024/hiring-accessibility-content-specialist-worldwide-technical-specialist-usa/
- RDF Dataset Canonicalization is a W3C Proposed Recommendation
  - https://www.w3.org/news/2024/rdf-dataset-canonicalization-is-a-w3c-proposed-recommendation/
- **Add URL.parse() · whatwg/url@58acb06**
  - https://github.com/whatwg/url/commit/58acb06dccec3e95a33d842337e61d25195d4b1b

### TC39 動向

#### Meeting

- 2024-02
  - https://github.com/tc39/agendas/blob/main/2024/02.md
  - https://github.com/tc39/notes/tree/main/meetings/2024-02
  - 今読んでるから来月

#### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2024-01-01}...main@{2024-02-01}
- https://tc39.github.io/beta/
- 0->1
- 1->2
- 2->2.7
- 2.7->3
- 3->4

#### New Proposals

#### Other

### WinterCG 動向

#### Meeting

- **2024-03-07 Meeting**
  - https://github.com/wintercg/admin/issues/62
  - wintercg/proposal-functions-api: Discussing standardizing serverless JS functions
    - https://github.com/wintercg/proposal-functions-api
  - wintercg/proposal-cli-api: WinterCG proposal for standardizing CLI APIs
    - https://github.com/wintercg/proposal-cli-api
  - WinterCG WPT Subset
    - https://docs.google.com/spreadsheets/d/1YhzQXmIngM1Am8qd6PNqiQLyIyNv2Cg3uzK-FcP_NRE/

### IETF 動向

#### IETF

- IETF 119 3/16-22 Brisbane
  - 来月みる
  - HTTPWG Minutes
    - https://github.com/httpwg/wg-materials/blob/gh-pages/ietf119/minutes.md
  - HTTPAPI Minutes
    - https://notes.ietf.org/notes-ietf-119-httpapi

#### WG

- RFC
- Work
  - **Last Call: \<draft-ietf-wish-whip-13.txt> (WebRTC-HTTP ingestion protocol (WHIP)) to Proposed Standard**
    - https://mailarchive.ietf.org/arch/msg/ietf-announce/MhTsLvbPemgbuhs71ewJFLXcNxA/
  - **[TLS] Working Group Last Call for ECH**
    - https://mailarchive.ietf.org/arch/msg/tls/bRvJExU382xLNdNOj_re7Ei1OqQ/
  - [TLS] Draft on "TLS 1.2 feature freeze"
    - https://mailarchive.ietf.org/arch/msg/tls/u_PnejLS2Uhn7YXt7ZjacL0RMRI/
  - [TLS] I-D Action: draft-ietf-tls-rfc8446bis-10.txt
    - https://mailarchive.ietf.org/arch/msg/tls/VLnfp97OpOPvmdowvR5NLiywjCI/
- Meeting

#### Other

- **There Are No Standards Police**
  - https://www.mnot.net/blog/2024/03/13/voluntary

### CDN 動向

#### Cloudflare

- Remediating new DNSSEC resource exhaustion vulnerabilities
  - https://blog.cloudflare.com/remediating-new-dnssec-resource-exhaustion-vulnerabilities/
- **polyfill.io now available on cdnjs: reduce your supply chain risk**
  - https://blog.cloudflare.com/polyfill-io-now-available-on-cdnjs-reduce-your-supply-chain-risk/
- **The state of the post-quantum Internet[a]**
  - https://blog.cloudflare.com/pq-2024/
- Advanced DNS Protection: mitigating sophisticated DNS DDoS attacks
  - https://blog.cloudflare.com/advanced-dns-protection/
- Upcoming Let's Encrypt certificate chain change and impact for Cloudflare customers
  - https://blog.cloudflare.com/upcoming-lets-encrypt-certificate-chain-change-and-impact-for-cloudflare-customers/
- Undersea cable failures cause Internet disruptions for multiple African countries
  - https://blog.cloudflare.com/undersea-cable-failures-cause-internet-disruptions-across-africa-march-14-2024/

#### Fastly

- **New options for Polyfill.io users - General - Fastly Community**
  - https://community.fastly.com/t/new-options-for-polyfill-io-users/2540

#### Other

- **Learning from the LockBit Takedown | Akamai**
  - https://www.akamai.com/blog/security/2024/feb/learning-from-the-lockbit-takedown

### セキュリティ動向

- **GoFetch**
  - https://gofetch.fail/
- **総務省|報道資料|LINE ヤフー株式会社に対する通信の秘密の保護及びサイバーセキュリティの確保に係る措置(指導)**
  - https://www.soumu.go.jp/menu_news/s-news/01kiban18_01000224.html
- **Publickey が受けた DoS 攻撃、これまでの経緯と対策まとめ - Publickey**
  - https://www.publickey1.jp/blog/24/publickeydos.html
- **続、 Publickey が受けた DoS 攻撃、これまでの経緯と対策まとめ - Publickey**
  - https://www.publickey1.jp/blog/24/publickeydos_1.html

### 周辺動向

- WCAG 2.2 日本語訳 公開のお知らせ | ウェブアクセシビリティ基盤委員会(WAIC)
  - https://waic.jp/news/20240301/
- Free Prototype Program - Bocoup
  - https://bocoup.com/blog/free-prototype-program
  - 何か見込みのあるものをプロトタイプできるプログラム
- Making messaging interoperability with third parties safe for users in Europe - Engineering at Meta
  - https://engineering.fb.com/2024/03/06/security/whatsapp-messenger-messaging-interoperability-eu/
  - DMA に対応した WhatsApp と Messenger の変更説明
  - E2EE を維持しながらサードパーティとの互換性を可能にする方法
- **Why Browsers Get Built - Infrequently Noted**
  - https://infrequently.org/2024/03/why-browsers-get-built/
- **So, what exactly did Apple break in the EU?**
  - https://blog.tomayac.com/2024/02/28/so-what-exactly-did-apple-break-in-the-eu/
- **New Ways to Sponsor Servo | Igalia**
  - https://www.igalia.com/2024/03/18/New-Ways-to-Sponsor-Servo.html
- **Web Engines Hackfest 2024 | Igalia**
  - https://www.igalia.com/2024/03/28/Web-Engines-Hackfest-2024.html
- Better video for mobile RTC with AV1 and HD - Engineering at Meta
  - https://engineering.fb.com/2024/03/20/video-engineering/mobile-rtc-video-av1-hd/
- Logarithm: A logging engine for AI training workflows and services - Engineering at Meta
  - https://engineering.fb.com/2024/03/18/data-infrastructure/logarithm-logging-engine-ai-training-workflows-services-meta/
- Choosing Between gzip, Brotli and zStandard Compression | Paul Calvano
  - https://paulcalvano.com/2024-03-19-choosing-between-gzip-brotli-and-zstandard-compression/
- **Cloud Run 上のページが一部の Chrome 環境で文字化けする謎を探るべく我々は Google Cloud の奥地へと向かった**
  - https://zenn.dev/yumemi_inc/articles/cloud-run-chrome-mojibake
  - > Cloud Run は執筆時現在 zstd による圧縮に対応していない
  - > ヘッダの Content-Encoding: zstd のみが削除され,ボディは圧縮されたまま応答される
  - > ブラウザはこの応答を正しく解釈できないため文字化けのような表示となる
- **List of 2024 Leap Day Bugs**
  - https://codeofmatt.com/list-of-2024-leap-day-bugs/
  - 地球の自転が速くなっているため 2029 年までに「負のうるう秒」が必要になる可能性大、ネットや IT サービスが大混乱になる危険性も - GIGAZINE
    - https://gigazine.net/news/20240328-negative-leap-second/
- **パスキーの導入開始:安全性と利便性を両立するゲームプレイの実現へ - Sony Interactive Entertainment Japan**
  - https://sonyinteractive.com/jp/news/blog/passkeys-introducing-a-more-secure-more-convenient-way-to-play/
- **Brave, Mozilla, Vivaldi see browser installs rise on iOS • The Register**
  - https://www.theregister.com/2024/03/14/brave_mozilla_europe_ios/

### Cookie 動向

- **New Privacy-Preserving Ads API coming to Microsoft Edge - Microsoft Edge Blog**
  - https://blogs.windows.com/msedgedev/2024/03/05/new-privacy-preserving-ads-api/
  - Edge の 3rd Party Cookie Deprecation アナウンス
  - 1% ロールアウトを数ヶ月以内に実施
  - 2024 年内は継続
  - Ad Selection API のテストを呼びかけ

### イベント

- 2 月
- 3 月
  - 12: W3C Breakouts Day 2024
    - https://github.com/w3c/breakouts-day-2024
    - 2024 年 3 月 12 日開催
  - 19-22: IETF | IETF 119 Brisbane
    - https://www.ietf.org/how/meetings/119/
- 4 月
- 5 月
  - 14: Google I/O 2024
    - https://io.google/2024/
  - 21-23 Microsoft Build
    - https://www.microsoft.com/en-us/build
- 6 月
  - 3-5: Web Engine Hackfest
    - https://webengineshackfest.org/
  - 10: WWDC
    - https://developer.apple.com/wwdc24/

### Wrap Up

- Chrome
  - 123
    - light-dark()
    - Service Worker Static Routing API
    - DevTools: emulate focused page
  - 124 Beta
    - writingsuggestions
    - keyboard-focusable scroll containers
    - document render blocking
    - HTTP priority header
    - setHTMLUnsafe/parseHTMLUnsafe
    - ReadableStream async iteration
    - WebSocketStream
  - Ship
    - document render blocking
    - FedCM CORS
    - Compute Pressure
    - writingsuggestions
    - Extending Storage Access API for non-cookie storage
    - RegExp modifiers
  - Prototype
    - TLS trust expressions
    - FedCM as trust signal for SAA
  - Experiment
    - skip preload scanning
  - Chrome Developers
    - Shared dictionaries
    - Performance tooling 2024 and beyond
      - Lighthouse panel gone in 2025
  - Chromium blog
    - Speedometer 3
  - other blogs
    - Memory safety on Google Online Security Blog
    - Real-time URL protection (OHTTP)
  - other
    - Yu Gothic UI broken with text-spacing-trim
- Firefox
  - 124
    - content-visibility: auto
    - text-wrap-mode/style
    - AbortSignal.any()
  - Ship
    - navigator.clipboard.readText()
    - align-content on block
    - URL.parse()
  - MDN Blog
    - MDN Curriculum
    - Igalia joins OWD governance committee
  - other
    - Support Servo on Open Collective
    - Manifest V2 support
- Safari
  - 17.4
    - switch control
    - form UI on vertical writing modes
    - Inline layout
    - CSS scoping
    - setHTMLUnsafe/parseHTMLUnsafe
    - AbortSignal.any()
    - Promise.withResolvers()
    - Object.groupBy()
    - WebM (VP8/VP9) on iOS/iPadOS
  - TP190
    - style container queries
    - disabled network throttling
  - TP191
    - araiBrailleLabel, ariaBrailleRoleDescription
    - WebCodecs AV1 with hardware decoder
  - blog
    - Speedmeter 3.0
    - Vertical Form Controls
  - Standard Position
    - 特になし
  - other
    - PWA サポート削除の撤回
    - Spotify
    - family の emoji がシルエットだけになった話
- Edge
  - Speedmeter 3.0
  - TLS で RSA key 2024bit 以下 deprecate
  - Browser extension の危険性 by Eric
- W3C/WHATWG
  - Draft
    - 特になし
  - Open/UI
    - 特になし
  - Other
    - Web 35 才
    - W3C CoC update
    - URL.parse()
- TC39
  - 来月
- WinterCG
  - Serverless function の標準化
  - CLI API (args, argv)の標準化
- IETF
  - IETF119 (来月)
  - WHIP Last Call
  - WGLC for ECH
  - There are no Standards Police by mnot
- CDN 動向
  - State of Post-Quantum Internet
  - Polyfill.io from Cloudflare / Fastly
  - マルウェア集団 LockBit の逮捕
- セキュリティ動向
  - GoFetch (Apple Silicon 脆弱性)
  - LineYahoo への行政指導
  - Publickey DDoS
- 周辺動向
  - Servo Open Collective
  - WebEngines Hackfest 2024 開催アナウンス
  - CloudRun が Content-Encoding: zstd を実装してないため文字化け
  - 閏年のバグまとめ
  - iOS で brave, firefox ,vivaldi の選択画面によりインストールが増えた
- Cookie 動向
  - Edge の Deprecation アナウンス
