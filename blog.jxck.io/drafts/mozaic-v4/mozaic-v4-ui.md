# [mozaic.fm][podcast] mozaic.fm v4 リリースノート #2 - UI 編

## Intro

mozaic.fm v4 をリリースした。

1. [概要編](/entries/2026-09-16/mozaic-v4.html)
2. [ネットワーク編](/2026-09-17/mozaic-v4-network.html)
3. UI 編
4. VTT 編
5. LLM-Wiki 編

今回は、UI 周りの変更について解説する。

ここでも、 mozaic.fm で紹介している機能をふんだんに取り入れ、実践することを優先した。


## アーキテクチャ

以前の mozaic.fm は、基本的に静的 HTML を生成する MPA だった。これは、この blog のレンダリングを流用して実装していたためだが、 blog も podcast も MPA であったため、試せる機能に限界があった。

そもそも、エピソード再生中に画面遷移すると、再生が途切れる問題があり、メディアを再生するサービスは根本的に SPA 化を避けるのが難しい。

そこで、この機会に SPA に移行することにした。

ところが、そこまで複雑な UI を作る必要はなく、画面遷移時にプレイヤーを固定できればよいだけだ。そこで、基本は React / Vite / Hono で、薄めの SSR / SPA をベースとした。

## Navigation API

上部に固定したプレイヤーを再生したまま、本文 `<article>` だけを遷移できれば良い。この用途では、遷移をフックし、 React Component を Fetch して、表示を置換する Inertia が候補に上がった。

しかし、 Inertia は History API をこね回す古き良き実装で、ここはもちろん Navigation API を実践したい。そこで、 Inertia を Navigation API 対応するパッチを考えたが、 AI とプランした結果「Inertia を大きく作り直すことになり、自分で実装した方が早い」という結論になった。

当時は、帰ってきた Fable がサブスクになる前のボーナス期間で、その期間中に終わらせかったため自前実装に踏み切ったが、「Inertia みたいなのを Navigation API ベースで」だけで 2 時間程度で終わった。

Igniter と名付け、公開しやすいようディレクトリは切り分けてあるが、公開はしてない。昨今のサプライチェーン攻撃の状況を考えると、公開されたパッケージを依存に追加するのも「リクスの追加」だが、一方自分が公開したパッケージが他に依存され、自分が何かの被害をうけ、踏み台になったときのことを考えると、パッケージの公開も安易にしにくい時代になったしまった。

一方、「Inertia みたいなのを Navigation API ベースで」という発想さえあれば、 2 時間で AI が作ってくれる時代だ。この程度のパッケージなら、発想自体を共有して、各々がローカルで実装し、持ち合わせたセキュリティハーネスで脆弱性対策を担保する方がトータルでは健全な可能性が高い。

既に mozaic.fm のサイトはこれで稼働しているため、挙動も実際に確認して、参考にしてもらえればと思う。

## Player

ほとんど静的なサイトにおいて、唯一それなりに複雑なのが Player だ。

サイト上で、そのエピソードの音声再生を行えるよう、 mozaic.fm の初期版から育ててきた WebComponents として、自前実装を持っている。

今回も、この WebComponents をリファクタリングしつつ、ほぼそのまま移植した。

大きい変更は、 Declarative Shadow DOM として SSR に含め、 JS 無しで登録できるようにした点だ。 JS が実行される前から表示だけは再現されるため、 Layout Shift ももちろんない。

React が DSD を特別なものとして認識してないため、そのままでは hydration 時に仮想 DOM 上は `<template shadowrootmode="open">` があるが、レンダリング結果は消費されて `<template>` がないというミスマッチが起こってしまう。すると、 Player が再レンダリングされ音声再生も止まってしまうため、 SSR かどうかで DSD の出し分けをすることで対応している。

また、固定の Player が再生してても、別エピソードを表示中に、そのエピソードの再生に変えられるよう、エピソードのタイトル横にも Play ボタンが付いている。

このボタンは、 Player の Play ボタンと関連があるｔこを `aria-contorls` で連携したいが、連携先が Shadow DOM の中なので、これを参照するために Reference Target (`shadowrootreferencetarget`) を公開している。

Reference Targe はまだ実験的な機能であり、 host あたりの転送が 1 つしかできなかったり、 Document PiP では別 Window になるため解決できないなど、色々課題はあるが、それも含めて検証している。

## 色設計

色の設計は、基本的には sRGB 空間無いのでカラートークンベースで設計されるのが主流だろう。

しかし、本サイトでは OKLCH ベースで、 Display P3 まで使った設計を入れたいと考えた。

基本的には LCH ベースで Dark/Light までカバーするパレットをアルゴリズミックに生成した。

また、 Display P3 に対応したディスプレイにしか表示できない色として存在する、鮮やかな緑/赤/オレンジなどを使ってみるために、これらネオンカラーをアクセントとして UI に導入した。

Display P3 に対応したディスプレイかどうかで、見え方が変わる。




---

以前まとめた内容を再掲します。


**音声と字幕**

- `<audio><track kind="captions"></audio>` という意味的に正しい要素構成 (2026-07-30 に旧実装から移行)
- `track.mode = "hidden"` で cue の時刻計算だけブラウザに任せ、実際の表示は `cuechange` を監視して shadow DOM の `#caption` へ自前で転記する。理由は macOS の字幕設定 (MediaAccessibility) が native `::cue` の背景色を author CSS より優先してしまう実測結果があったため
- caption はオーバーフロー時に font-size を3段階まで自動縮小し、それでも収まらなければ `-webkit-line-clamp` で3行 ellipsis にフォールバック(データは欠落させず表示だけ削る)

**Declarative Shadow DOM 化 (2026-08-25、今回の目玉)**

- player shell を SSR し、`<template shadowrootmode="open">` で最初の HTML レスポンスの時点から shadow DOM を宣言的に構築。JS 到着前に player の見た目が出る
- `shadowrootreferencetarget` (Reference Target) で `aria-controls` が shadow 内の `#play` を直接参照できる
- React は DSD を公式サポートしていないため、この前提は CI 常設の pre-hydration / hydration spec (3 engine) が固定している

**Media element pseudo-classes (2026-08-12)**

- `:playing` / `:paused` / `:muted` / `:volume-locked` を CSS 経由で扱い、JS は `hidden` を極力操作しない設計に変更。非対応 engine には JS fallback を残す
- `:buffering`/`:stalled` は当初 CSS 化予定だったが WebKit で技法が成立せず、`waiting`/`stalled` イベントベースの JS 実装に変更した実測ベースの判断

**Document Picture-in-Picture (2026-08-12)**

- `<mozaic-player>` 要素ごと `requestWindow()` の PiP document へ move する方式(mini UI の二重管理はしない)
- custom element の disconnect/connect ライフサイクルがそのまま機能する設計

**その他**

- P3 ネオンアクセント (2026-08-25): 再生系 UI は Dark=green / Light=red、play リング・seek overlay・thumb の発光
- caption toggle / PiP toggle は hover chip 化 (2026-08-02)。デスクトップはホバーで表示、タッチは常時表示
- MediaSession API 連携でロック画面操作に対応
- localStorage で音量・mute・速度・字幕 on/off・再生位置を永続化
- breakpoint (584px) は content-derived。「controls が1行に収まる幅 + slider の実用幅」から逆算した値で、慣習的な960px等は使っていない