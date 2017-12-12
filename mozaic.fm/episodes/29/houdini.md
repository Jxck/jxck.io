# [houdini][css][mozaic.fm] ep29 Houdini

## Info

audio: https://files.mozaic.fm/mozaic-ep29.mp3

- published_at: 2017-11-02
- guest: [@kojiishi](https://twitter.com/kojiishi)


## Theme

第 29 回のテーマは Houdini です。

今回は、ゲストとして Chrome チームの開発者であり、 CSS の標準化にも関わられている [@kojiishi](https://twitter.com/kojiishi) さんをお呼びし、 Houdini がどういうモチベーションで始まり、現在仕様策定や実装状況はどうなっているのか。

実装する上での問題点や、今後の展望をお聞きし、今後 Houdini が CSS に対してどういった影響を及ぼしていくかを踏まえ、「**今何がおこっているのか**」と「**これからどうなっていくのか**」について議論しました。


## Show Note

- Koji さんのドラフト
  - [CSS Text Module Level 3](https://drafts.csswg.org/css-text-3/)
  - [CSS Text Decoration Module Level 3](https://drafts.csswg.org/css-text-decor-3/)
  - [CSS Inline Layout Module Level 3](https://drafts.csswg.org/css-inline/)
  - [CSS Ruby Layout Module Level 1](https://drafts.csswg.org/css-ruby/)
  - [CSS Writing Modes Level 3](https://drafts.csswg.org/css-writing-modes-3/)
  - [CSS Line Grid Module Level 1](https://drafts.csswg.org/css-line-grid/)
  - [CSS Rhythmic Sizing](https://drafts.csswg.org/css-rhythm/)
  - [UAX \#50: Unicode Vertical Text Layout](http://www.unicode.org/reports/tr50/)
- [CSS\-TAG Houdini Editor Drafts](https://drafts.css-houdini.org/) ([github](https://github.com/w3c/css-houdini-drafts))
  - [Worklets Level 1](https://drafts.css-houdini.org/worklets/)
    - JS のメインスレッドとは別に実行される環境
    - ハイレベル API で使用される定義される
    - WebWorker とは違う。イベントベースですらない
    - Class で適宜したハンドラを渡すと内部で実行される
  - [CSS Properties and Values API Level 1](https://drafts.css-houdini.org/css-properties-values-api/)
    - name, syntax, inherits, init を指定して任意のプロパティを registerProperty する
  - [CSS Typed OM Level 1](https://drafts.css-houdini.org/css-typed-om/)
    - attributeStyleMap 経由で型と値を操作
    - CSSXXXValue などで値を計算
  - [Box Tree API Level 1](https://drafts.css-houdini.org/box-tree-api/)
    - 行の折り返しなどで生成される Fragment にアクセスできる API
    - まだ中身があまりない
  - [CSS Parser API](https://drafts.css-houdini.org/css-parser-api/)
    - CSS パーサを export し CSS を解析した中間表現にアクセスできるように
    - まだ中身がほぼない
    - use case: [https\://github.com/WICG/CSS-Parser-API](https://github.com/WICG/CSS-Parser-API)
  - [CSS Painting API Level 1](https://drafts.css-houdini.org/css-paint-api/)
    - ペイント領域に対して Canvas API サブセットで好きなように描画できる
  - [CSS Layout API Level 1](https://drafts.css-houdini.org/css-layout-api/)
    - Style Tree で生成された Fragment をどう配置するかを決める
    - OutPut として Box Tree を提供し、それをブラウザがペイントする
    - Flexbox や Grid みたいなものを自分で定義できる
  - [Font Metrics API Level 1](https://drafts.css-houdini.org/font-metrics-api/)
    - baseline などレイアウトに必要なメトリクス情報を取得する
- Paint API で StokeText できないと困る話
  - [why no fillText/strokeText ? Issue \#478](https://github.com/w3c/css-houdini-drafts/issues/478)
- Minutes Paris F2F 2017-08-01
  - [Part I: AnimationWorklet, TypedOM](https://lists.w3.org/Archives/Public/public-houdini/2017Aug/0001.html)
  - [Part II: CSS Properties & Values, Custom Paint](https://lists.w3.org/Archives/Public/public-houdini/2017Aug/0002.html)
  - [Part III: Layout Worklets, Future Meetings](https://lists.w3.org/Archives/Public/public-houdini/2017Aug/0003.html)
- レシピの中括弧
  - [https\://wiki.csswg.org/planning/tokyo-2017#afternoon1](https://wiki.csswg.org/planning/tokyo-2017#afternoon1)
  - [CSS Paint API での実装例](http://kojiishi.github.io/css-paint/curly-bracket.html)
- TPAC 2017
  - [TPAC 2017](https://wiki.csswg.org/planning/tpac-2017)
  - [TPAC F2F November 2017](https://github.com/w3c/css-houdini-drafts/wiki/TPAC-F2F-November-2017)
- 各ベンダの最近の CSS エンジン改善
  - FF: [Quantum \- MozillaWiki](https://wiki.mozilla.org/Quantum#Quantum_CSS)
  - Edge: [Making the web smoother with independent rendering \- Microsoft Edge Dev Blog](https://blogs.windows.com/msedgedev/2017/08/17/making-web-smoother-independent-rendering/)
  - Chrome: [LayoutNG](https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/Source/core/layout/ng/README.md), [Sliming Paint V2](https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/Source/core/paint/README.md#slimmingpaintv2-a_k_a_spv2)
- see also
  - [GoogleChromeLabs/houdini\-samples](https://github.com/GoogleChromeLabs/houdini-samples)
  - [Is Houdini Ready Yet?](https://ishoudinireadyyet.com/)
  - [BlinkOn 8: Line Layout Deep Dive](https://www.youtube.com/watch?v=kQ03a6topCM&feature=youtu.be)
