---
type: podcast
tags: ["monthly platform"]
audio: https://files.mozaic.fm/mozaic-ep188.mp3
published_at: 2025-11-05
guest: [@myakura](https://github.com/myakura)
guest: [@saku](https://x.com/sakupi01)
---

# ep188 Monthly Platform 202510

## Theme

第 188 回のテーマは 2025 年 10 月の Monthly Platform です。


## Show Note

### Chrome 動向

#### Stable: 142


#### Updates

- Chrome 142 beta
  - https://developer.chrome.com/blog/chrome-142-beta
  - CSS and UI
    - `:target-before` and `:target-after` pseudo-classes
    - Absolute positioning for the `::view-transition` element
    - activeViewTransition property on document
    - Range syntax for style container queries and `if()`
    - Interest Invokers (the interestfor attribute)
    - The font-language-override property
    - The download attribute in the SVG `<a>` element
    - **Mobile and desktop parity for select element rendering modes**
    - Sticky user activation across same-origin renderer-initiated navigations
  - Web APIs
    - WebGPU: primitive_index feature
    - WebGPU: Texture formats tier1 and tier2
    - DataTransfer property for insertFromPaste, insertFromDrop and insertReplacementText input events
    - Media session: add reason to enterpictureinpicture action details
    - Web Speech API contextual biasing
    - Stricter `*+json` MIME token validation for JSON modules
    - FedCM-Support showing third-party iframe origins in the UI
    - **Origin-keyed process isolation**
    - Interoperable pointerrawupdate events exposed only in secure contexts
  - Origin trials in progress
    - Device Bound Session Credentials
    - TCP Socket Pool per-top-level-site
- **What's new in view transitions (2025 update)**
  - https://developer.chrome.com/blog/view-transitions-in-2025
  - Better browser and framework support
    - **Same-document view transitions are about to become Baseline Newly available**
    - **Support for the View Transition API is now in React core**
  - Recently shipped features
    - **Auto-name elements with view-transition-name: match-element**
    - DevTools now shows rules targeting pseudos that use a view-transition-class
    - **Nested view transition groups** are available from Chrome 140
    - Pseudo-elements now inherit more animation properties
    - The execution of the finished promise callback no longer waits for a frame
  - Upcoming features
    - **Scoped view transitions** are ready for testing in Chrome 140
    - The position of `::view-transition` will change from fixed to absolute in Chrome 142
    - `document.activeViewTransition` is coming to Chrome 142
    - Prevent a view transition from automatically finishing with `ViewTransition.waitUntil()`
- New in Chrome 142
  - https://developer.chrome.com/blog/new-in-chrome-142
  - `:target-before` and `:target-after` pseudo-classes
  - Range syntax for style container queries and `if()`
  - Interest Invokers (the interestfor attribute)
- What's New in WebGPU (Chrome 142)
  - https://developer.chrome.com/blog/new-in-webgpu-142
- What's new in DevTools, Chrome 142
  - https://developer.chrome.com/blog/new-in-devtools-142
- Chrome 143 beta
  - https://developer.chrome.com/blog/chrome-143-beta
  - CSS and UI
    - CSS anchored fallback container queries
    - EditContext: TextFormat underlineStyle and underlineThickness
  - Web APIs
    - Allow more characters in JavaScript DOM APIs
    - Speculation rules: mobile 'eager' eagerness improvements
    - Implement CSS property font-language-override
    - WebGPU: Texture component swizzle
    - ICU 77 (supporting Unicode 16)
    - DataTransfer property for insertFromPaste, insertFromDrop and insertReplacementText input events
    - FedCM-Support Structured JSON Responses from IdPs
    - WebTransport Application Protocol Negotiation
    - Web Smart Card API for Isolated Web Apps
    - Web App Manifest: specify update eligibility, icon URLs are Cache-Control: immutable
    - Heavy Ads Intervention: Reports sent to embedding frame
  - Origin trials in progress
    - Digital Credentials API (issuance support)
    - TCP Socket Pool Limit Randomization
  - Deprecations and removals
    - Deprecate getters of Intl Locale Info
    - Deprecate XSLT

  #### Intents

- **Ship: @scroll-state scrolled support**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FBParkAZ0-U
  - 最後にスクロールが起こった方向を記憶する `scrolled` container feature が `scroll-state()` でクエリ可能に
- **Ship: CSS Anchored Fallback Container Queries**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/TeIDbjagCf4
  - Anchor Positioning の `position-try-fallbacks` (フリップ方向)が `anchor()`でクエリ可能に
- Ship: DataTransfer property for insertFromPaste, insertFromDrop and insertReplacementText input events
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4vTRPpGa2YQ
- Ship: Deprecate getters of Intl Locale Info
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/fwnEjShxvmo
- Ship: EditContext: TextFormat underlineStyle and underlineThickness
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3WaVdQvoW6U
- **Ship: Scoped Custom Element Registry**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mAteNymnc_s
  - 以前 Apple から仕様更新のアナウンスがあった "Revamped" SCE Registry の Chrome 実装
  - 複数のソースから Web Components を利用するときに、Custom Element 名が競合しないよう、カスタム要素空間を作成できる
- **Ship: Web Smart Card API**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dtUIO4sOxwA
  - スマートカード (PC/SC) のカードリーダーに接続できる
- Ship: WebGPU: Texture component swizzle
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/JgYQuS8mtOo
- Ship: WebRTC RTP header extension behavior change
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/coJ597vz9hc
- Ship: [Intervention] Freezing task queues in background on mobile
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NKtuFxLsKgo
- Ship: CSS `:lang` pseudo class level 4
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/tO598HXuS94
  - カンマ区切りでの複数言語指定や、ワイルドカードの利用が可能になる
- Ship: FedCM Privacy Enforcement for Client Metadata
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/qn-EoZMWjLY
- Ship: FedCM nonce param and error attribute rename
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/RfZm0gfU0_E
- **Ship: FileAPI: `Blob.bytes()`**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/7C9nFj39BXA
- Ship: Multicast Support for Direct Sockets API.
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/evWztDc6WyQ
- **Ship: Cache sharing for extremely-pervasive resources**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/oKoNHxyhZxs
  - よく使われているサードパーティのリソースを Chrome 側でキャッシュする
  - キャッシュするリソースは HTTP Archive のデータから取得し更新していく
  - Pervasive Resources (public) - Google Sheets
    - https://docs.google.com/spreadsheets/d/1TgWhdeqKbGm6hLM9WqnnXLn-iiO4Y9HTjDXjVO2aBqI/edit?gid=159071783#gid=159071783
- Ship: Gamepad `ongamepadconnected` and `ongamepaddisconnected` event handler attributes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pbF0-uINoHA
- Ship: EditContext: TextFormat underlineStyle and underlineThickness
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3WaVdQvoW6U
- Ship: CSS anchor positioning with transforms
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/48-VhjHY3Lc
- Ship: CSS color space display-p3-linear
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HRy0NN-9-EE
- Ship: Clipboardchange event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/UgYnldQ0-VY
- Ship: Expose rtpTimestamp from WebRTC video frames via VideoFrame.metadata()
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/up4sP1psaJU
- Ship: Performance + Event Timing: InteractionCount
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vHyONs6Tr9k
- Ship: Permissions Policy reports for iframes
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/3PMdpmPPXu0
- Ship: RTCDegradationPreference enum value "maintain-framerate-and-resolution"
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/FUlvv_Lmk-s
- Ship: ViewTransitions `waitUntil()` method
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/pyuQyLGkbEQ
- Ship: WebCodecs `VideoFrame.metadata().rtpTimestamp` (Chromium M146)
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NNvAaXIrsew
- Ship: CSS caret-shape property
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/a_1mwtfo8tQ
- Ship: CSS letter-spacing and word-spacing: percentage values
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/vrqkenR5s2o
- Ship: WebGPU: Uniform buffer standard layout
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Ww2eL6b74V0
- Ship: side-relative syntax for background-position-x/y longhands
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/PSDj9jEOm0s
- Ship: Intl.Locale.prototype.variants
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/-IH8qyT_7bQ
- Ship: Mirroring of RTL MathML operators
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HA83RzJZKdE
- Prototype and Ship:
- Prototype: Algorithm Updates in WebCrypto
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KluNhawvzgM
- **Prototype: Base Appearance Form Controls**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/n1NsO0N_tO4
  - Form Controls のページ内に常に表示されている部分(現状 の Working Draft で策定されてる Customizable Select 以外の部分)の実装に着手
- Prototype: CPU Performance API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8y-EauEeWWE
- **Prototype: CSS anchor positioning with transforms**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/8sODS-5pdkE
  - Anchor Positioning では、現在のスクロールオフセットを常に使用するのではなく、記憶されたスクロールオフセットを使用して、スクロールのたびにレイアウト計算がなされることを回避している
  - スクロールに伴ったレイアウト計算はせず、アンカーのスクロールオフセットを利用して追従させる
    - related: Ship: CSS anchor positioning remembered scroll offset
      - https://groups.google.com/a/chromium.org/g/blink-dev/c/ORkpnBrwXqQ
  - スクロールと同じ問題が transform にも存在するよね、ということで、同様の処理を transform に適用する提案
  - ホバー時にボタンが回転・拡大する際、ツールチップも相対位置を維持しながら追従する
- **Prototype: Declarative CSS module scripts**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/aflQmg68ISU
  - 宣言型 CSS モジュールスクリプトは、既存のスクリプトベースの CSS モジュールスクリプトの拡張機能です。
  - これにより、開発者は宣言型スタイルシートをシャドウルート(宣言型シャドウルートを含む)と共に共有できるようになります。
  - この機能がない場合、開発者は宣言型シャドウ DOM ホスト間でスタイルセットを共有するために、いくつかの非理想的な選択肢を迫られます:
  - 1. 命令型 CSS モジュールを使用する(スクリプトが必要となるため、宣言型シャドウ DOM の目的をある程度損なう)。
  - 2. style タグを複製する。ネットワークとパーサーの負荷が増大する。
  - 3. link タグで外部 CSS ファイルを使用する。スタイル未適用コンテンツのフラッシュ(FOUC)が発生する可能性がある。
  - 宣言型 CSS モジュールはこれらの問題をすべて回避し、宣言型シャドウルートが効率的に共有できる基本スタイルセットをインラインで定義することを可能にする。
- Prototype: Intl.Locale.prototype.variants
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/NCT4pPJ_Uz8
- Prototype: Manifest localization
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/52jyP77tNnc
- **Prototype: The `inherit()` CSS function**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/nCUNGmfAOMU
  - 指定された「任意プロパティ」の「直親要素」での「計算値」を取得し、それを現在の要素で使用できる
  - 「計算値」を利用するのは、自己参照ループを防ぐため
  - 「直親要素」に限定されているのは、パフォーマンスの観点から、Style Invalidation の範囲を限定するため
  - 親要素に相対的な `border-radius` 、カラー、親要素の前景色と背景色を反転させた色合わせなど、考えられるユースケースは多岐に渡る
  - 現状では *カスタムプロパティのみ* サポート
  - ちなみに、デザイントークンの Pain Points 改善活動の一部
  - [High-level] Making it less painful to communicate design tokens across parties
    - https://github.com/w3c/csswg-drafts/issues/10948
- Prototype: Speculation Rules: prerender-until-script Action
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/amZPwakfv2g
- **Prototype: Customizable combobox**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/lRZgUn9evQo
  - Customoizable Select は UI パターンでいうところの、Single-Select Combobox パターン
  - Combobox は、テキスト入力とそれに応じたフィルタリングが可能な、拡張版 Select パターンとも言える
  - `<input type="text">` が必須で、ユーザがテキストを自由に入力可能
  - `filter` attribute によりユーザ入力に応じて `<datalist>` の option が動的にフィルタリング
  - `search` attribute による正規表現での部分一致
  - `<selectedoption>` など、Customoizable Select の機能と `<input type="text">`, `<datalist>` をうまく使って実現されている予定だったが、直近で設計方針に大きな変更あり
- Prototype: Web Animations Level 2: iterationComposite
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/I7YQiIleH_o
- **Prototype: `text-justify` CSS property**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/507si_plqIw
  - text-align: justify; は、テキストの均等割付けをおこなうが、text-justify はその種類を設定するもの
  - Kent Tamura さんが実装予定らしい
- Prototype: Web App Origin Migration
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/r-DalcGSdao
- **Experiment: Digital Credentials API (issuance support)**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/Gy-NvwoSODo
  - この Web Platform 機能により、発行元ウェブサイト(例:大学、政府機関、銀行)は、デジタル認証情報のプロビジョニング(発行)プロセスをユーザーのモバイルウォレットアプリケーションに直接、安全に開始できます。
  - Android では、この機能は Android IdentityCredential CredMan システム(認証情報マネージャー)を活用します。デスクトップでは、デジタル認証情報の提示と同様に CTAP プロトコルを使用したクロスデバイスアプローチを活用します。
- Experiment: Local network access restrictions for WebSockets
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/mXaKgZnCiz4
- Experiment: Restricting spelling and grammar highlights
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/SvEKV_Jhlqo
- Experiment: TCP Socket Pool Limit Randomization [DRAFT]
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/6D-pO59I-WQ
- Experiment: Web Install API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/KCpVX8F6yh8
- Ready for Developer Testing: Mirroring of RTL MathML operators
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/IpmWeJSPR0g
- Ready for Developer Testing: Intl.Locale.prototype.variants
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/i6QEHcH_fiI
- Ready for Developer Testing: Performance + Event Timing: InteractionCount
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/xgbpLIanblc
- Ready for Developer Testing: Enhanced Canvas TextMetrics
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/OLCCI0ExvIk
- Extend Experiment: Crash Reporting key-value API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ZW9CIjrTD90
- Extend Experiment: Extended lifetime shared workers
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/i3fUrP_Chw8
- Extend Experiment: Shared Array Buffers, Atomics and Futex APIs
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/rsdS22EJge4
- Extend Experiment : Writer API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/HCSzUSI8kI8
- Extend Experiment: Rewriter API
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/eLNXoxgx8CU
- Change:
- Unship:
- Remove:
- **Deprecate and Remove: Deprecate and remove XSLT**
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CxL4gYZeSJA
  - WHATWG で stage3 になり、Chrome では結局 XSLT を削除することになった
  - コミュニティ(というか Mason 製)のポリフィルと拡張を提供、console warning、Stable 以外でのデフォルト removal、kill switch となる OT や Enterprise Policy の提供、そして 2027 年にやっと完全廃止
  - 2 年間かけた非常に慎重なロールアウトで removal する
  - No, Google Did Not Unilaterally Decide to Kill XSLT - Eric's Archived Thoughts
    - https://meyerweb.com/eric/thoughts/2025/08/22/no-google-did-not-unilaterally-decide-to-kill-xslt/
- Deprecate and Remove: Externally loaded entities in XML parsing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/4j2oGg2lyBk
- Deprecate: Deprecate unload event
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/dvusqw9-IhI
- PSA: Heavy Ad Intervention Reports Now Sent to Embedding Frame
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/WldszfogaGU
- Web-Facing Change PSA: The `'&'` pseudo-class behaves as `:where(:scope)` in `@scope` rules
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/_qJzQnAB11M
- Web-Facing Change PSA: CSS letter-spacing and word-spacing: percentage values
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/K7wT6GjVZsQ
  - letter-spacing と word-spacing に、`U+0020` Space に基づいた %を使用できる
- Web-Facing Change PSA: Speculation rules: mobile "eager" eagerness improvements
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/hyeGn2vD_cM
- Web-Facing Change PSA: Tune border-radius correction to better match circles/ellipses
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/MtaFEiEtgbM
- Web-Facing Change PSA: CSS `letter-spacing` and `word-spacing: percentage` values
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/K7wT6GjVZsQ
- PSA: Isolated Web Apps Allowlist for Managed Installations
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/iTCPaBw6HxU
- PSA: Updates on Chrome-facilitated Cookie Deprecation Testing
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/63u-0KmBG4w
- RuntimeEnabledFeatures flags that we might be able to remove
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ScIKVcPF5Yw
  - stable flags in runtime_enabled_features.json5 to consider for removal - Google Sheets
    - https://docs.google.com/spreadsheets/d/1OoQOp19o0dtuWXyyQJdBCAAt_6sq4PpvdRszGb0lNmo/edit?gid=1646801624#gid=1646801624
- Vertical tabs feature status
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/LZ5SKUz1iso

  #### Other

- web.dev
  - September 2025 Baseline monthly digest
    - https://web.dev/blog/baseline-digest-sep-2025
  - New to the web platform in September
    - https://web.dev/blog/web-platform-09-2025
  - Same-document view transitions have become Baseline Newly available
    - https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available
  - **URLPattern is now Baseline Newly available**
    - https://web.dev/blog/baseline-urlpattern
- google for developers
  - https://developers.googleblog.com/
- google developer japan blog
  - https://developers-jp.googleblog.com/
- chrome developer blog
  - https://developer.chrome.com/blog/
  - **Test the clipboardchange event-a more efficient way to monitor the clipboard**
    - https://developer.chrome.com/blog/clipboardchange
    - 新しい clipboardchange イベントは、Chrome と Edge でクリップボードの変更を効率的に監視できる機能であり、ポーリングによるパフォーマンスのオーバーヘッドを軽減する。
    - このイベントは、コンテンツがクリップボードにコピーまたはカットされたとき、自動的に発火し、UI を即座に更新するため、ユーザーエクスペリエンスの向上に寄与する。
    - 現在、Chrome と Edge での Origin Trials に参加することで、clipboardchange イベントをテスト可能であり、フィードバックを通じて標準化を目指している。
  - What's New in WebGPU (Chrome 141)
    - https://developer.chrome.com/blog/new-in-webgpu-141
  - **Make accessible carousels**
    - https://developer.chrome.com/blog/accessible-carousel
    - カルーセルは広く使用されているが、アクセシビリティの確保が難しいため、Chrome チームは CSS Overflow Module Level 5 を通じてインタラクティブな CSS カルーセルの開発に取り組んだ。
    - 各タイプのカルーセル(シングルアイテム、ページネーション、マルチアイテム)には異なるアクセシビリティの考慮が必要であり、適切な ARIA 属性や CSS の活用が推奨される。
    - アクセシビリティは自動的には保証されないため、常にテストが必要であり、CSS Overflow 5 を使用することで高パフォーマンスでアクセシブルなカルーセルを構築できる。
  - Expanding built-in AI to more devices with Chrome
    - https://developer.chrome.com/blog/gemini-nano-cpu-support
  - What's new in DevTools, Chrome 141
    - https://developer.chrome.com/blog/new-in-devtools-141
  - Digital Credentials API: Secure and private identity on the web
    - https://developer.chrome.com/blog/digital-credentials-api-shipped
  - **Go passwordless: Join "The Future of identity on the web" webinar**
    - https://developer.chrome.com/blog/identity-webinar-2025
  - Automatic passkey creation in Chrome for Android
    - https://developer.chrome.com/blog/automatic-passkey-creation-android
  - What's new in Lighthouse 13
    - https://developer.chrome.com/blog/lighthouse-13-0
  - Highlights from our AI in Action workshop
    - https://developer.chrome.com/blog/ai-action-workshop-nyc
  - Introducing a new Chrome Web Store API
    - https://developer.chrome.com/blog/cws-api-v2
  - My GSoC journey: Contributing to Chrome Extensions
    - https://developer.chrome.com/blog/gsoc-2025-extensions?hl
  - **Removing XSLT for a more secure browser**
    - https://developer.chrome.com/docs/web-platform/deprecating-xslt
    - Chrome は XSLT を非推奨とし、ブラウザから削除する予定
    - XSLT をロードしているのは 0.02 %、プロセスしてるのは 0.001%
    - 将来的に XML の処理も libxml から Rust ライブラリに移行するプランも示された
  - FedCM updates: Display iframe domain
    - https://developer.chrome.com/blog/fedcm-chrome-142-updates
  - **Deprecating live editing of JavaScript sources in Chrome DevTools**
    - https://developer.chrome.com/blog/devtools-deprecates-live-editing
    - Sources パネルで読み込んだ JavaScript に動的に編集を加えられる機能が削除
    - Hot Module Replacement なども普及したのでそっちを使ってね
    - Local Overrides や Workspaces は影響なし
  - Device Bound Session Credentials: Second origin trial begins
    - https://developer.chrome.com/blog/dbsc-origin-trial-update
  - My GSoC journey: Contributing to Chrome Extensions
    - https://developer.chrome.com/blog/gsoc-2025-extensions
  - Detect fallback positions with anchored container queries from Chrome 143
    - https://developer.chrome.com/blog/anchored-container-queries
- chromium blog
  - **Chromium Blog: Reducing notification overload for a quieter browsing experience in Chrome**
    - https://blog.chromium.org/2025/10/automatic-notification-permission.html
    - あまり見てないサイトの通知を自動で削除する
- canary
  - https://www.chromium.org/getting-involved/dev-channel
- google security blog
  - **HTTPS by default**
    - https://security.googleblog.com/2025/10/https-by-default.html
    - Chrome 154 から HTTPS がデフォルトに
    - HTTP 接続によるマルウェア感染などのリスクを軽減
    - HTTPS の採用率が 95-99% に達していることを受け、残る HTTP 接続への警告を減らしつつ、ユーザーの安全を確保していく
- search blog
  - https://developers.google.com/search/
- v8
  - https://v8.dev/
- other
  - **Q3 2025 Summary from Chrome Security**
    - https://groups.google.com/a/chromium.org/g/security-dev/c/s-UR_4pJvOY
    - https://www.chromium.org/Home/chromium-security/quarterly-updates/#q3-2025
    - Chrome のプロダクトセキュリティチームがエンジニアを募集している。
    - Counter-Abuse チームがユーザーを不審な通知から保護する取り組みを続けている。
    - サイトから通知を解除する際に、スパムとして報告するオプションが追加された。
    - BoringSSL チームが Merkle Tree Certificates の仕様を IETF Madrid で発表した。
    - Web Platform Security チームが Content Security Policy の改善を行い、新しいキーワードを導入した。
    - Local Network Access の新しい権限が導入され、CSRF 攻撃からユーザーを保護することを目指している。
    - Chrome Security Architecture チームがブラウザカーネルの Rust プロトタイプに取り組んでいる。
    - プラットフォームセキュリティチームがアプリバウンド暗号化の改善を行った。
    - GPU アーキテクチャのセキュリティ向上に向けた新しい Dawn バックエンドが開発中。
    - V8 チームがセキュリティ問題に対処するための改善を進めている。
    - Chrome Fuzzing がクラッシュスタックトレースの解析とグルーピングを改善した。
    - 第三者依存関係管理の効率化に向けた取り組みが進行中。
  - Add trusted contacts for Google account recovery
    - https://blog.google/technology/safety-security/recovery-contacts-verify-google-account/
    - Google Account にアクセスできなくなったときのために、信頼できる人をリカバリコンタクトとして登録しておける
  - The CMA's designation of Google's mobile ecosystem
    - https://blog.google/around-the-globe/google-europe/united-kingdom/cmas-designation-of-googles-mobile-ecosystem/
    - Google のモバイルプラットフォームについて、CMA からの新たな規制処置(Apple も同時)
    - 特に Android などオープンソースなものへの今回の規制は、英国の目標とするデジタル市場での成長と革新に矛盾していると Google は懸念を示す
  - **Update on Plans for Privacy Sandbox Technologies**
    - https://privacysandbox.com/news/update-on-plans-for-privacy-sandbox-technologies/
    - 3PC の削除をやめたことで CMA とのコミットメントが終了
    - Privacy Sandbox が不要になったため一部を残して作業を終了した
    - FedCM, CHIPS, Private State Token は継続
    - 続けると言っていた IP Protection は終了
  - **Google updates G icon with brighter hues**
    - https://blog.google/inside-google/company-announcements/gradient-g-logo-design/
    - Google の 4 色が明るくなったデザインが、全社的に製品展開されていくらしい
  - Post by @paul.kinlan.me - Bluesky
    - https://bsky.app/profile/paul.kinlan.me/post/3lzyvit65dc2o
    - Chrome Dev Summit やったら嬉しい?というポスト
    - Twitter ではまあまあ肯定的だが、Bluesky や Mastodon では否定的
    - どうせ AI の話だろうという反応が多い

  ### Firefox 動向

  #### Stable: 144.0.2

  #### Updates

- Firefox 144.0, See All New Features, Updates and Fixes
  - https://www.firefox.com/en-US/firefox/144.0/releasenotes/
  - 検索エンジンに Perplexity 追加
  - 検索エンジンに Google を指定している場合に Google Lens が使えるように
- Firefox 144 release notes for developers (Stable) - Mozilla | MDN
  - https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/144
  - Invoker Commands
  - View Transitions
  - `Element.moveBefore()`
  - `Map.prototype.getOrInsert()`
- Smarter Search, Smoother Tools - These Weeks in Firefox: Issue 190
  - https://blog.nightly.mozilla.org/2025/10/06/smarter-search-smoother-tools-these-weeks-in-firefox-issue-190/
- Extensions UI Improvements and More - These Weeks in Firefox: Issue 191
  - https://blog.nightly.mozilla.org/2025/10/27/extensions-ui-improvements-and-more-these-weeks-in-firefox-issue-191/

  #### Intents

- Ship: PerformanceEventTiming.interactionId (for INP)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/xvv6sxJZc4U/
- **Ship: CSS property `text-decoration-trim`**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/YrBMtBkbZYo/
  - 下線などの描画範囲を調整できる
  - 日本語でリンクが続いている場合に下線がくっついて、リンクの範囲がわからない問題に対応できる
  - `text-decoration-inset` に改名
    - https://github.com/w3c/csswg-drafts/issues/8402#issuecomment-3462630143
- Ship: WebGPU on macOS Tahoe for ARM64
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/4m_SnGAGkEU/
- Ship: MathML Core math-shift: compact
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/0DY-rztkAfU
- Ship: Mirroring of RTL MathML operators
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/xAISbH3xg1g
- **Ship: Iterator Sequencing**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/mTL4C0f_oT0
- **Ship: CSS text-autospace property**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/69xH8RcOULw/m/CJ1j9F9qAAAJ
  - これで主要ブラウザ全てで利用できるようになるが、初期値に関しては Firefox も他と同じく `no-autospace`(デフォルトで間隔をあけない) にするよう
  - これはどのブラウザも仕様に準拠しない(仕様のデフォルトは `normal` で、間隔をあける)という状況になるが、この実装は CSSWG の RESOLUTION により一旦許容されたもの。初期値に関しては、CSSWG にて引き続き議論が行われている。
  - https://github.com/w3c/csswg-drafts/issues/12386#issuecomment-3028532137
- **Ship: Scoped Styles (`@scope`)**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/I5LXX1kEq4w/m/KBoQfMLRBAAJ
- Prototype: Storage-Access-Headers
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/OPmJiLLZdak
- **Prototype: Sanitizer API**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/M49FSfCdLWY/m/2Gtay7CIAAAJ
- Prototype and ship: HTMLInputElement showPicker() for textual input with datalist
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/hn3MGx3GBRY/m/q_S7ChtqCAAJ
- **Prototype: Document Picture-in-Picture API**
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/VgoQBO-YUW4/m/CBz-QeCeAAAJ
- Change:
- Remove:

  #### Newsletter

- Engineering Effectiveness Newsletter (Q3 2025 Edition)
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/EuR5chAF5fI/m/W0ctQqzlAwAJ
- Firefox WebDriver Newsletter 144 - Firefox Developer Experience
  - https://fxdx.dev/firefox-webdriver-newsletter-144/
- Firefox Security & Privacy Newsletter - Q3 2025
  - https://groups.google.com/a/mozilla.org/g/dev-platform/c/Ur5QJd_Y6e8/m/gk4cPOZDAQAJ

  #### MDN / Open Web Docs

- **Sovereign Tech Fund invests in Web Security and Privacy docs**
  - https://openwebdocs.org/content/posts/stf-investment-2025/
  - Sovereign Tech Fund: ドイツ政府運営の OSS 支援ファンド
  - ここからの一年の支援で OWD にセキュリティ/プライバシードキュメントの拡充をしていく
  - 2023 年の Secure the Web Forward を起点に
    - https://openwebdocs.org/content/posts/secure-the-web-forward/
  - 2024 年に W3C Security Web Application Guidelines Community Group を設立
  - Auth/Sec/Priv 周りを一年かけて拡充する
- **A beginner-friendly guide to view transitions in CSS**
  - https://developer.mozilla.org/en-US/blog/view-transitions-beginner-guide/

  #### Standard Position

- https://github.com/mozilla/standards-positions/issues?q=closed%3A%3E2025-10-01+
- Positive
  - display-p3-linear CSS color space
    - https://github.com/mozilla/standards-positions/issues/1311
- Negative
  - Cache sharing for extremely-pervasive scripts
    - https://github.com/mozilla/standards-positions/issues/1231

  #### Other

- Celebrate the power of browser choice with Firefox. Join us live.
  - https://blog.mozilla.org/en/firefox/firefox-celebrates-browser-choice-house-blend-events/
  - Firefox は 21 周年を迎え、ブラウザの選択の重要性を祝うために、ベルリン、シカゴ、ミュンヘン、ロサンゼルスで 4 つのグローバルイベントを開催する。
  - イベントは「House Blend」コーヒー・レイブとして知られ、参加者は自由な選択やオンライン体験の形成について楽しむ機会を得る。
  - Firefox は非営利団体に支えられ、独自の Gecko エンジンを使用しているため、他の主要ブラウザとは異なる独立した選択肢であることを強調している。
- Firefox profiles: Private, focused spaces for all the ways you browse
  - https://blog.mozilla.org/en/firefox/profile-management/
- Firefox 144 ships interactionId for INP - Mozilla Performance
  - https://blog.mozilla.org/performance/2025/10/15/firefox-144-ships-interactionid-for-inp/
- Better search suggestions in Firefox
  - https://blog.mozilla.org/en/firefox/better-search-suggestions/
  - 検索文字列のクエリで関連キーワードをサジェストする機能
  - Fastly のリレーサーバーに OHTTP を利用

  ### Safari 動向

  #### Stable: 26.1

  #### Updates

- Position-area: Clear and explicit or short and sweet? | WebKit
  - https://webkit.org/blog/17417/position-area-clear-and-explicit-or-short-and-sweet/
  - 記事では、プロファイル画像をクリックした際にメニューを表示するための CSS プロパティ「position-area」が紹介されている。
  - 「span-inline-end」というプロパティは、複数のカラムを跨ぐことを示すが、どのカラムから始まるのかが不明確である。
  - 著者は「center-span-inline-end」という新しいプロパティの導入を提案し、明確さと冗長さのバランスについて読者の意見を求めている。
- **Online Identity Verification with the Digital Credentials API | WebKit**
  - https://webkit.org/blog/17431/online-identity-verification-with-the-digital-credentials-api/
  - オンラインアイデンティティ認証の従来の方法は、ユーザーが政府発行の ID を撮影しアップロードするアナログなプロセスに依存しており、プライバシー保護やセキュリティリスクが伴う。
  - モバイル ID(mdoc)は、ISO/IEC 18013-5 および ISO/IEC 18013-7 に基づく安全な電子版の政府発行証明書で、ユーザーのプライバシーを保護しつつ簡単にオンライン認証を可能にする。
  - Safari 26 以降、W3C のデジタル認証 API を通じて、Apple Wallet や他のサードパーティのウォレットからモバイル ID を直接ウェブサイトで提示できるようになり、ユーザーの同意に基づく安全な情報交換が実現される。
- CSS Grid: A helpful mental model and the power of grid lines | WebKit
  - https://webkit.org/blog/17474/css-grid-a-helpful-mental-model-and-the-power-of-grid-lines/
  - CSS Grid は、複雑なレイアウトを実現するための強力で柔軟なツールであり、特にコンテナの設計に重点を置くことが重要である。
  - グリッドの基本的な概念には、列と行のテンプレート、グリッドライン、グリッドエリアがあり、これらを理解することで効果的なレイアウトが可能になる。
  - 明示的な配置を利用することで、要素をグリッド内で正確に配置し、スペースを有効活用することができる。
- **Release Notes for Safari Technology Preview 229 | WebKit**
  - https://webkit.org/blog/17447/release-notes-for-safari-technology-preview-229/
  - Accessibility
  - CSS
    - Added support for text-decoration-line values spelling-error and grammar-error.
  - Events
  - Forms
  - JavaScript
  - Networking
  - SVG
    - Added support for the onbegin event in the SVGAnimationElement IDL interface to align with the SVG animations specification.
    - Added support for the async attribute in SVGScriptElement to align behavior with HTMLScriptElement and other browsers.
    - Added support for the hreflang IDL attribute on SVGAElement to improve SVG link handling.
    - Added support for type attribute on SVG a element.
  - Storage
  - Web API
    - Added preview support for Event Timing API (Interaction to Next Paint)
    - Removed support for the non-standard "overflow" event.
  - Web Inspector
  - WebDriver
    - Added support for new endpoints for setting storage access permission state and granting storage access to embedded frames for specific origins.
  - WebGPU
    - Added support for using GPUTexture objects as depth-stencil and resolve attachments in WebGPU render passes to match the specification.
- Release Notes for Safari Technology Preview 230 | WebKit
  - https://webkit.org/blog/17504/release-notes-for-safari-technology-preview-230/
  - Web API
    - Added support for Largest Contentful Paint.
  - Web Extension
    - Added support for browser.runtime.getVersion() to retrieve the extension version from its manifest.
- Release Notes for Safari Technology Preview 231 | WebKit
  - https://webkit.org/blog/17560/release-notes-for-safari-technology-preview-231/
  - CSS
    - New Features
      - Added support for the safe keyword with anchor-center in CSS Anchor Positioning.
      - Added support for flip-x and flip-y options in position-try-fallback for CSS Anchor Positioning.
    - Resolved Issues
  - JavaScript
    - Resolved Issues
  - Media
    - Resolved Issues
  - Rendering
    - New Features
      - Added support for text shaping across inline boxes.
    - Resolved Issues
  - Web API
    - Resolved Issues
  - Web Inspector
    - Resolved Issues
  - WebDriver
    - Resolved Issues
- WebKit Features for Safari 26.1 | WebKit
  - https://webkit.org/blog/17541/webkit-features-for-safari-26-1/
  - Relative units in SVG
  - Anchor Positioning improvements
  - Bug fixes and more
    - Accessibility
    - CSS Anchor Positioning
    - CSS
    - Forms
    - PDF
    - Rendering
    - SVG
    - Security
    - Web API
    - Web Inspector
    - WebGPU
    - WebKit API
    - WebRTC

  #### Standard Positions

- https://github.com/WebKit/standards-positions/issues?q=is%3Aissue+closed%3A%3E2025-10-01+
- Support
  - highlightsFromPoint API
    - https://github.com/WebKit/standards-positions/issues/394
- Opposed
  - **The `interestfor` attribute**
    - https://github.com/WebKit/standards-positions/issues/464
- Withdrawn
  - Shared Storage
    - https://github.com/WebKit/standards-positions/issues/10
  - requestStorageAccessFor
    - https://github.com/WebKit/standards-positions/issues/125
  - **Attribution Reporting API**
    - https://github.com/WebKit/standards-positions/issues/180
  - **Private Aggregation API**
    - https://github.com/WebKit/standards-positions/issues/189
  - **Probabilistic Reveal Tokens**
    - https://github.com/WebKit/standards-positions/issues/529'

  #### Other

  ### Edge 動向

  #### Stable: 142

  #### Updates

- https://blogs.windows.com/msedgedev/
  - ここがメイン
- https://docs.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel
  - ここでも見れる
- https://twitter.com/MSEdgeDev
  - これを見るしか無い
- **Securing the Future: Changes to Internet Explorer Mode in Microsoft Edge | Microsoft Browser Vulnerability Research**
  - https://microsoftedge.github.io/edgevr/posts/Changes-to-Internet-Explorer-Mode-in-Microsoft-Edge/
- Meet Copilot Mode in Edge: Your AI browser - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2025/10/23/meet-copilot-mode-in-edge-your-ai-browser/
- Considerations for Safe Agentic Browsing - Microsoft Edge Blog
  - https://blogs.windows.com/msedgedev/2025/10/23/considerations-for-safe-agentic-browsing/

  #### Other

- Add explainer on DataTransfer for input events (#1149) · MicrosoftEdge/MSEdgeExplainers@ba19187
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/commit/ba191875c8e286f74fa6b3a244e4067a43aa537f
- Graduating explainer (#1169) · MicrosoftEdge/MSEdgeExplainers@6cee823
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/commit/6cee8230f51ab9b79acfac33b28d4acd2baea3b1
- Add explainer for WebRTC Decoder State Changed Event (#1166) · MicrosoftEdge/MSEdgeExplainers@69defeb
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/commit/69defeb3e35a887558222e2a86a69d76bdfb7b9d
- Update title of RTCRtpReceiver Decoder Fallback explainer (#1178) · MicrosoftEdge/MSEdgeExplainers@60a077c
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/commit/60a077c1e77b247381dbbba9951e5b095654e648
- Archive IndexedDB `getAllRecords()` proposal (#1120) · MicrosoftEdge/MSEdgeExplainers@c62408a
  - https://github.com/MicrosoftEdge/MSEdgeExplainers/commit/c62408a1e6e43cbff353f0e343a9ad5cc0d02351

  ### WHATWG/W3C 動向

  #### Draft

- https://www.w3.org/news/
- Recommendation
- Candidate Recommendation
- Working Draft
- First Public Working Draft
  - First Public Working Draft: CSS Anchor Positioning Module Level 2
    - https://www.w3.org/news/2025/first-public-working-draft-css-anchor-positioning-module-level-2/
    - `position-try-fallbacks` のクエリをサポートする `anchored` ContainerQuery Type など
- **Web Content Accessibility Guidelines (WCAG) 2.2 Approved as ISO/IEC International Standard**
  - https://www.w3.org/news/2025/web-content-accessibility-guidelines-wcag-2-2-approved-as-iso-iec-international-standard/

  #### Open UI

- https://github.com/openui/open-ui/tree/main/meetings/telecon
- 2025-10-02
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-10-02.md
  - [toolbar] Toolbar element proposal
    - https://github.com/openui/open-ui/issues/1283
    - 新しいコンポーネント
- 2025-10-09
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-10-09.md
- 2025-10-16
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-10-16.md
  - **Some thoughts and questions about combobox**
    - https://github.com/openui/open-ui/issues/1273
    - これまでの `<combobox>` 要素を導入する提案から設計変更
    - `appearance: base;` でオプトインし、既存の `<input>` + `<datalist>`/ `<select>` を拡張する方針
    - Customoizable Select の設計を踏襲
    - Explainer も書き換えられる
    - Create alternate combobox explainer
      - https://github.com/openui/open-ui/pull/1313
- 2025-10-23
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-10-23.md
  - Open a11y questions for overflow/carousels
    - https://github.com/openui/open-ui/issues/1265
- 2025-10-30
  - https://github.com/openui/open-ui/blob/main/meetings/telecon/2025-10-30.md

  #### WHATNOT

- https://github.com/whatwg/html/issues?q=%20WHATNOT%20meeting%20
- 2025-10-02
  - https://github.com/whatwg/html/issues/11717
- 2025-10-09
  - https://github.com/whatwg/html/issues/11747
  - Menu elements proposal
    - https://github.com/whatwg/html/issues/11729
    - Stage1
  - [focusgroup] Declarative keyboard focus navigation for a scoped set of composite widgets
    - https://github.com/whatwg/html/issues/11641
    - Reading Flow との共存や、既存のフォーカスマネジメントモデルと統合した場合の挙動についてより詳細が必要とのことで、Stage2 ならず
- 2025-10-16
  - https://github.com/whatwg/html/issues/11801
- 2025-10-23
  - https://github.com/whatwg/html/issues/11821
  - **Should we remove XSLT from the web platform?**
    - https://github.com/whatwg/html/issues/11523
    - 仕様の更新と実装者が確定してきたので、Stage3 に進める合意
    - Risky Change Guidelines に則って、仕様はマージする(今回の場合は、Chromium で十分に検証したうえで仕様をマージする)
    - Anne が提案したのは１ヶ月だったが、実際の Chrome の I2S では 2 年かけた検証が行われる旨が示されている
    - この決定が、"just because Google doesn't care" に受け取られないよう、Googler を招いた事情解説の場を Igalia Chats に設ける提案 by Brian Kardell
  - FormControlRange Interface
    - https://github.com/whatwg/html/issues/11478
    - Stage1. Stage2 への提案
    - Customizable Range の仕様が進んできた
  - Expose certain behavioural attributes via ElementInternals
    - https://github.com/whatwg/html/issues/11752
    - CE を"実装する" 段階で、ElementInternals を用いて、`draggable` や `popover` などのビルトイン動作をアクティベートできるようにする提案
    - CE を "利用する" 段階で、こういった属性を指定せずに済む(e.g. `<x-popover>` は内部で `popover` 動作を使用するが、利用時は指定不要)
- **Add declarative scroll commands to HTMLButtonElement**
  - https://github.com/whatwg/html/issues/11847
  - Invoker Commands にスクロール用コマンドを追加する提案が WHATWG に持ちかけられた
  - `::scroll-button()` ではなく、Bring Your Own 形式で任意のボタンを要素のスクロールに使える
  - デザインシステムなど既成のボタンを Scroll Button 化しやすくなる

  #### CSSWG

- https://www.w3.org/blog/CSS/
- https://lists.w3.org/Archives/Public/www-style/
- 2025-10-08
  - https://lists.w3.org/Archives/Public/www-style/2025Oct/0006.html
- Masonry Bikeshedding Materials from fantasai on 2025-10-27
  - https://lists.w3.org/Archives/Public/www-style/2025Oct/0013.html
  - Masonry display 値の bikeshed
  - Poll Response: https://docs.google.com/forms/d/e/1FAIpQLSdAqh74IyRa_YM81XPj0rjJCDuC4rO-k8krT7TBlEUu2c4QOA/viewanalytics

  #### Other

- **The World Wide Web Consortium (W3C) adopts a new logo to signal positive changes**
  - https://www.w3.org/press-releases/2025/new-logo/
  - W3C 新ロゴリリース
- W3C logo refresh: more than a cosmetic change, a small step towards durable and sustainable success
  - https://www.w3.org/blog/2025/w3c-logo-refresh-more-than-a-cosmetic-change-a-small-step-towards-durable-and-sustainable-success/
  - World Standards Day に際して、W3C CEO より、W3C 新ロゴに込められた想いが公表された
- **Public concerns over new W3C logo from Tantek Ç.**
  - https://lists.w3.org/Archives/Public/www-archive/2025Oct/0001.html
  - 新しいロゴへのネガティブな反応とそれを戒めるような反応
  - ロゴの変更に関して十分なフィードバックを得たのかという疑問も呈されている
- Threat Modeling with LEGO SERIOUS PLAY: Building your Digital Identity threat
  - https://www.w3.org/blog/2025/threat-modeling-with-lego-serious-play-building-your-digital-identity-threat/
- W3C Standard ODRL Policy gaining industry adoption
  - https://www.w3.org/blog/2025/w3c-standard-odrl-policy-gaining-industry-adoption/
- Web Sustainability Guidelines (WSG) becomes a first public Draft Note
  - https://www.w3.org/news/2025/web-sustainability-guidelines-wsg-becomes-a-first-public-draft-note/
- **Proposal: `moveOrInsertBefore()` · Issue #1406 · whatwg/dom**
  - https://github.com/whatwg/dom/issues/1406
  - `moveBefore()` が使える場合は使う
  - 使えない場合は `insertBefore()` にフォールバック
- **Disposable AbortController · Issue #1405 · whatwg/dom**
  - https://github.com/whatwg/dom/issues/1405
  - Explicit Resource Management を活用して、dispose 時に自動的に`abort()`を呼び、実行中の非同期処理をキャンセルしたい
- Request for comment: DTCG decision-making framework
  - https://www.w3.org/community/design-tokens/2025/10/20/request-for-comment-dtcg-decision-making-framework/
- **Design Tokens specification reaches first stable version**
  - https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/
  - テーマとブランドのサポート
  - Display P3、Oklch など CSS Color Module 4 の全色空間対応
  - 継承、エイリアス、コンポーネントレベルの参照などリッチなトークン関係性
  - デザインツール側もこの仕様に準拠すると主張している
  - 関連:Schema 2025: Design Systems For A New Era | Figma Blog
    - https://www.figma.com/blog/schema-2025-design-systems-recap/#importing-and-exporting-variables
- **TPAC2025 Agendas が出揃ってきた:**
  - https://www.w3.org/2025/11/TPAC/schedule.html
  - WHATUP at TPAC 2025: agenda suggestions · Issue #11711 · whatwg/html
    - https://github.com/whatwg/html/issues/11711
  - CSSWG meeting at TPAC 2025 [CSS Working Group Wiki]
    - https://wiki.csswg.org/planning/tpac-2025#agenda
    - https://github.com/orgs/w3c/projects/213
  - Issues · w3c/tpac2025-breakouts
    - https://github.com/w3c/tpac2025-breakouts/issues
  - Repo Issues
    - https://github.com/w3c/tpac2025-meetings/issues
- **How a Shared Test Suite Fixed the Web's Biggest Problems - The New Stack**
  - https://thenewstack.io/how-a-shared-test-suite-fixed-the-webs-biggest-problems/
  - 10 月分の取りこぼし
  - web-platform-tests の歴史や意義について関係者にインタビュー

  ### TC39/TC55 動向

  #### Meeting

- 2025-09
  - https://github.com/tc39/agendas/blob/main/2025/09.md
  - https://github.com/tc39/notes/pull/384/files
  - https://docs.google.com/document/d/1qXUf4QRTbexUj0fg2sgYTxWwOT2v_q7lmjR282BOWLU/edit?tab=t.zc07zu27hobo#heading=h.48sttkksahs2

  #### Proposals Diff

- https://github.com/tc39/proposals/compare/main@{2025-09-01}...main@{2025-11-04}
- https://tc39.github.io/beta/
- 0->1
  - bulk-add-array
  - reclassify Measure/Amount
- 1->2
  - native promise predicate
- 2->2.7
  - iterator-chunking
  - import-bytes
- 2.7->3
  - non-extensible applies to private
- 3->4

  #### New Proposals

  #### WinterTC

- https://github.com/WinterTC55/admin/tree/main/meetings
- admin/meetings/2025-09-04.md
  - https://github.com/WinterTC55/admin/blob/main/meetings/2025-09-04.md
  - Review of the notes for last meeting (5 min)
  - Approval of this meeting's agenda (2 min)
  - Review of Ecma IPR policy (1 min)
  - Does TC55 plan to attend W3C TPAC?
    - Are there any proposed breakout sessions?
    - Are there any proposed joint meetings?
  - Consider finding a better schedule for these meetings
  - Brainstorming HTTP server API
  - Runtime keys

  #### Other

  ### IETF 動向

  #### WG

- RFC
- Work
- Meeting

  #### Other

- IETF 142 開催中

  ### 周辺動向

  #### ベンダー動向

- **Servo 0.0.1 Release**
  - https://servo.org/blog/2025/10/20/servo-0.0.1-release/
  - Servo v0.0.1 リリース。これから毎月リリースを重ねる予定とのこと
- This month in Servo: experimental mode, Trusted Types, `strokeText()`, and more!
  - https://servo.org/blog/2025/10/24/this-month-in-servo/
- **CMA confirms Apple and Google have strategic market status in mobile platforms - GOV.UK**
  - https://www.gov.uk/government/news/cma-confirms-apple-and-google-have-strategic-market-status-in-mobile-platforms
  - Google と Apple のモバイルプラットフォームが、CMA から Strategic Market Status に指定された
  - SMS に指定されると、CMA がその対象に対して、行動要件を課したり、特定のアクションに対して事前承認を要求したりできるようになる
- State of the post-quantum Internet in 2025
  - https://blog.cloudflare.com/pq-2025/

  #### セキュリティ動向

- サイバー攻撃によるシステム障害発生 について (第 4 報)|ニュースルーム|アサヒグループホールディングス
  - https://www.asahigroup-holdings.com/newsroom/detail/20251014-0103.html
- アスクル、情報流出 ランサムウェア被害で(アスキー) - Yahoo!ニュース
  - https://news.yahoo.co.jp/articles/a2ca9bf048630c7f283f58d90bbbaad58ad72b84
- SBI 証券と楽天証券、パスキーに対応 - Impress Watch
  - https://www.watch.impress.co.jp/docs/news/2058330.html
- AWS、長時間に及ぶ大規模障害の全貌:DNS 問題が招いた混乱の連鎖 | XenoSpectrum
  - https://xenospectrum.com/aws-outage-cascading-failure-dns-ec2-analysis/

  #### Other

- **Introducing ChatGPT Atlas | OpenAI**
  - https://openai.com/index/introducing-chatgpt-atlas/
- **How we built OWL, the new architecture behind our ChatGPT-based browser, Atlas | OpenAI**
  - https://openai.com/index/building-chatgpt-atlas/
  - ChatGPT Atlas のアーキテクチャ
  - Chromium+SwiftUI
  - ブラウザープロセスをアプリプロセスを分離する OWL (OpenAI's Web Layer) を導入
- Samsung Internet Expands to PC With New Beta Program - Samsung Global Newsroom
  - https://news.samsung.com/global/samsung-internet-expands-to-pc-with-new-beta-program
  - Samsung Internet の Windows 版が登場
  - 韓国と米国で展開

  ### イベント

- 10 月
  - 28-29 WebKit Contributors Meeting
    - https://webkit.org/meeting/
- 11 月
  - 1-7: IETF | IETF 124 Montreal
    - https://www.ietf.org/meeting/124/
  - 10-14: TPAC 2025
    - https://www.w3.org/events/tpac/2025/tpac-2025/
  - 16: JSConfJP
    - https://jsconf.jp/2025/en
  - 18-20: TC39 111th
    - https://github.com/tc39/agendas/blob/main/2025/11.md
- 12 月

  ### Wrap Up

- Chrome
  - 142
    - Interest Invokers
    - Origin Isolation
  - 143 beta
    - anchored fallback container queries
    - Deprecate XSLT
  - Ship
    - `scroll-state()`
    - anchored fallback container queries
    - Scoped Custom Element Registry
    - Web Smart Card API (IWA)
    - `Blob.bytes()`
    - Cache sharing for extremely-pervasive resources
  - Prototype
    - `appearance: base`
    - anchor positioning with transforms
    - declarative CSS module scripts
    - CSS `inherit()`
    - Customizable combobox
    - `text-justify`
  - Experiment
    - digital credentials API (issurance)
  - Deprecate and Remove
    - XSLT
  - Chrome Developers
    - new in view transitions
    - accessible carousels
    - removing XSLT
  - Chromium blog
    - reducing notifications
  - other blogs
    - HTTPS by default
  - other
    - Q3 security summary
    - Update on Privacy Sandbox
- Firefox
  - 144
    - Perplexity / Google Lens
    - Invoker Commands
    - View Transitions V1
    - `Element.moveBefore()`
    - `Map.prototype.getOrInsert()`
  - Ship
    - `text-decoration-trim`
    - `text-autospace`
    - Scoped Styles
  - Prototype
    - Sanitizer API
    - Document PiP
- Safari
  - 26.1
  - Standard Position
    - `interestfor` が opposed
    - Privacy Sandbox 系 API の Withdrawn
  - other
- Edge
  - Changes to Internet Explorer Mode
- W3C/WHATWG
  - Draft
    - FPWD CSS Anchor Positioning Level 2 (anchored container query)
    - WCAG2.2 ISO/IEC international standard
  - Open UI
    - Customizable Combobox
  - WHATNOT meeting
    - Removing XSLT from the web platform
    - FormControlRange
    - Declarative scroll commands to HTMLButtonElement
  - Other
    - CSS masonry display value bikeshed
    - W3C 新ロゴ & public concerns
    - `moveOrInsertBefore()`
    - Disposable AbortController
    - DTCG spec reaches first stable version
- TC39
  - 2025-09 Meeting Minutes
    - `Array.prototype.pushAll()`
    - Amount が計算できなくなる
    - native promise predicate で Promise 判定
  - WinterTC
- IETF
  - IETF 142 開催中
- 周辺動向
  - ベンダー動向
    - Server 0.0.1 Release
    - CMA が Google/Apple のモバイルプラットフォームを Storategic Market Status に指定
  - セキュリティ動向
    - アサヒサイバー攻撃
    - アスクルサイバー攻撃
    - SBI/楽天証券 Passkey 対応
    - AWS 障害
  - Other
    - ChatGPT Atlas