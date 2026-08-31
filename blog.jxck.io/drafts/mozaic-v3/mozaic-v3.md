# mozaic.fm v3

## Intro

mozaic.fm v3 をリリースした。

かなり大幅ななアップデートになる。


## UI 刷新


## VTT 提供

Podcast の文字起こし提供は、開始した当初からずっと付きまとう問題だった。

Whisper が出てきたあたりで、非常に雑な文字起こしは提供できるようになったが、そのクオリティのコントロールは難しかった。

この、文字起こしハルシネーションを修正するために、ここ 2~3 年かなりいろいろな手をかけてきたが、ついに相当の精度が出るようになったため、公開することにした。

VTT は、本来 `<video>` に対して `<track>` で提供すれば、ブラウザが画面上に字幕として表示する仕組みになっている。最初はこの仕組みをそのまま使おうとしたが、標準の VTT 表示は折り返しの制御が難しく、長い行が突き抜けてしまったりといった現象があった。

また、字幕は背景に動画が再生されている前提であるため、 OS の提供する `background-color` 相当がデフォルトで付与されている。これは OS に設定できるため、ユーザ環境によっては `background-color` が白でも黒でもありえる。この仕組みを、動画が再生されていない音声再生のみの `<video>` に入れると、背景色が邪魔しあい、非常に読みにくくなってしまうケースがあった。

そこで、 `<video>` はやめて `<audio>` に戻り、自前で字幕をレンダリングする UI を作ることにした。

また、 VTT の細かい修正を詰めていくと、最後は音声を聞いて人間が直す必要が出る。しかし、音声を聞きながらテキストやタイミングを調整できるツールは高価だったり、動画が前提だったり、日本語に対応してなかったりと、ちょうどいいものが無かった。

そこで、 VTT のエディタを一緒に作り、タブ切り替えだけで編集モードにできるようにした。





## LLM-Wiki

Monthly シリーズでは、月に一度 Web の更新についてまとめ、 2.5h ほど話している。

それが、 Platform 寄りと Monthly Ecosystem は、月に一回 Web の





## v3 でやったこと

2026 年 5 月から 8 月の作業である。設計は `.agents/plan/` に 79 本の plan として残っている。

- 配信基盤を作り直した
  - Cloudflare Workers + Static Assets で一度作り切ったあと、全部 VPS へ戻した
  - h2o が 6 host の入口になり、daemon は SSR と `/api/search` だけを持つ
  - deploy は `make deploy` の直線 1 本 (update -> check -> bundle -> restart -> smoke)。rollback 機構は持たない
  - 2026-08-17 に cutover 完了。apex の A レコードを消して Web 経路の IPv6 only 化が完成し、apex の :80 は redirect ではなく 403 で拒否する
  - 証明書は DNS-01 (dns-cloudflare) + shortlived profile (160 時間) へ移行し、port 80 / `.well-known` 依存を切った
  - Web 経路 (apex / wiki / vtt) の TLS を 1.3 only + X25519MLKEM768 (ポスト量子ハイブリッド鍵交換) にした。podcast 経路 (www / files / feed) は互換性優先で TLS 1.2 のまま残し、TCP / QUIC 両方で実測して確認した
  - certbot の導入元を brew (root 汚染) / apt (2.9.0 は ACME profile 非対応) から snap へ移した
  - h2o (2.3.0-DEV) の host level header 指令が「自身も header 指令を持つ最初の path」にしか継承されない不具合を発見し、path-level への展開で回避した (upstream への報告も準備した)
- サイト本体を静的 HTML から SSR + SPA にした
  - Inertia を採用したあと、自前 router の igniter (Navigation API) へ置き換えた
  - persistent layout と View Transitions で、遷移しても再生が途切れず画面も飛ばない
- 音声体験を作り直した
  - player は旧サイトの Web Components を土台に、Media Session / 状態復元 / Document PiP まで広げた
  - 再生状態は `:playing` / `:paused` / `:muted` の CSS 疑似クラスで扱い、未対応環境は JS へ落とす
  - player の shell は SSR が `<template shadowrootmode>` で宣言的に構築し (Declarative Shadow DOM)、JS 到着前に player の見た目が描画される
- 字幕を公開できる品質まで持っていった
  - whisper のパイプライン (VAD / 用語 prompt / 辞書 / alignment / cue gap / 50 文字) を整えた
  - 誰でも直せる公開 VTT エディタをエピソードページのタブに統合した
  - 表示は native `::cue` をやめて自前描画にした
- 検索を新設した (旧サイトには無い)
  - build 時生成の静的 index を Orama で引き、結果は行ヒットまで出して該当行へ飛ばす
- LLM-Wiki を新設した
  - エピソードのトピックを ontology 付きで蓄積し、wiki.mozaic.fm として公開した
  - 公開 UI と client-side 検索を後から足した
  - VTT の本文精度向上より先に wiki ingest を終わらせる順序に変えた。shownote の裏取りで show note の箇条書きだけでなく、wiki が読み込み済みの原文記事を直接参照できるようにした
- デザインを token から作り直した
  - 色は全て OKLCH。意味色はコントラスト目標から導出し、機械検査で drift を止める
  - Display P3 のネオンアクセント 4 色を足し、再生系 UI とヘッダーの VU メーターを発光させた。sRGB 環境には gamut mapping の確定値を `@media (color-gamut: p3)` 分岐で配る
  - layout の切替は viewport の media query から component 自身の container query へ移し、閾値は device 慣習値 (960 等) ではなく content の実測破綻幅から導出した
  - タイポグラフィは text-* を全数検討し、見出しの balance と文節改行、UI label の leading trim を採った
  - dark / light は 2 状態 toggle と SSR の cookie 復元で、FOUC なしに切り替わる
- runtime を Node から Bun へ移行した
  - 常駐 daemon (Bun.serve) と生成 script は Bun、Vite / unit test / E2E は実測して Node に残した。install は pnpm のまま
  - 層ごとに env の切替点を置き、既定は Node。撤退は env を外すだけで、実際に 3 層がこの経路で戻った
  - build 全体で約 2 割短縮、daemon のメモリは旧 Node 定常 174MB -> 100MB 前後
- サイト自身の実装ドキュメント (/docs) を新設した
  - 「今どう作られているか」を現在形で書く公開ページ群。本文は HTML 直書き、CSS はサイト本体の実ファイルを build 時連結して token に自動追従する
  - CSP 違反・固定色・内部情報の混入を build gate で落とす (production でしか壊れない事故を build 時に検出する)
- 品質の守りを敷いた
  - unit 545、E2E 151 test を 3 engine、Page VRT 28 面、axe は WCAG AA 違反 0 を常時
  - unit test runner を tsx --test から Vitest へ移行した (収集契約と node:assert/strict を維持したまま)
  - 生成物は atomic publish、runtime に contract guard、CI に artifact hygiene / sink / baseline / 色の gate
  - build:content は episode ごとの hash 差分で compile を skip する。221 episode 変更なしなら全件 cache hit
  - episode 公開前のミス (monthly slug の月忘れ、published_at の書き間違い) を check:episodes で機械検査する
- 開発体制そのものを設計した
  - README = AGENTS.md = CLAUDE.md の単一規約と、plan の WIP -> 相互レビュー -> Fixed の workflow
  - Claude と Codex を相互レビューに使い、確定した方針は skill に落として再利用する

## これまでの mozaic.fm との違い

- ホスティング: VPS の静的 HTML 配信 -> **VPS のまま SSR 化** (h2o + Bun daemon)
  - 一度 Cloudflare Workers + Static Assets で作り切った後、**全部 VPS 配信へ回帰**した経緯
    (Workers 時代の設計資産: 薄い server / 生成物の Static Asset 化 / manifest 同梱、は
    そのまま VPS でも効いている)
  - h2o が 6 host (apex / www / feed / wiki / files / vtt) の入口。mozaic 系の設定は
    本 repo の h2o.conf を jxck.io 側が !file import する 1 行接点
  - daemon は SSR + /api/search だけ。trusted proxy 契約 (loopback + Host allowlist +
    XFP https、不成立は 421) / in-process rate limiter / in-memory Home cache (key = theme)
  - Web 経路は IPv6 only (apex は AAAA のみ)、podcast 経路 (feed / files) は dual stack。
    www は feed artwork 用の IPv4 出口 + apex への 301
- 静的サイト -> SSR (Hono + React) + SPA 遷移
  - router は自前の igniter (Navigation API ベース。Inertia を採用 -> 置換した経緯)
  - persistent layout で SPA 遷移しても player の再生が途切れない
  - same-document View Transitions で遷移を cross-fade。back/forward は対象外にして
    scroll 復元を優先する (webkit で干渉した実測がある)
- 検索の新設 (旧サイトには無かった)
  - Orama。index は build 時生成の静的 JSON、server bundle には小さな manifest のみ
    (index 実体は fs から single-flight load + per-IP / global rate limit)
  - 結果は「エピソード + ヒット行の列挙」+ 複数語 AND。行中の検索語クリックでその行へ
    scroll to text fragment + ハイライト
- VTT 字幕まわり
  - whisper による文字起こしパイプライン (VAD / 用語 prompt / 辞書置換 / alignment /
    cue gap ルール / 50 文字ルール)
  - エピソードページに VTT タブ = 誰でも編集できる公開エディタ (crowdsourcing)。
    認証なし + 事後 git diff レビューという設計判断。保存 = working tree へ即時反映
  - 字幕表示は native ::cue をやめて自前描画 (理由は下記)
- player を別ウィンドウへ出せる (Document Picture-in-Picture)
  - `<mozaic-player>` を要素ごと PiP window へ move する方式。再生を途切れさせず、
    stylesheet copy と theme mirror で見た目もそのまま持っていく
  - 他のページを見ている間も再生 UI が常時前面に残る
  - Baseline 未達のため feature detection + graceful degradation (未対応環境は chip を出さない)
- LLM-Wiki (wiki.mozaic.fm) の新設: エピソードで扱ったトピックの知識蓄積
  - 全ページに ontology frontmatter (type / relations) + lint enforce、グラフとして query 可能
  - 公開 UI は Platform 優先の overview + 系統別 / エピソード別の入口。desktop は sticky
    sidebar、mobile は同一 DOM を Popover として開く
  - 同一 origin の bounded な JSON による client-side 検索。JS 無効でも navigation は成立する
- feed は build 時に静的生成。旧 feed と golden diff = 0、URL もほぼ完全互換
  - **唯一の意図的例外: /index.json (JSON Feed) は廃止** (新実装に生成器を持たない判断)
- JavaScript runtime は Bun と Node の併用
  - daemon (Bun.serve) と build 時の生成 script は Bun、Vite / unit test / E2E は Node、install は pnpm
  - 「基本は全部 Bun、詰まった層は Node に戻す」を層ごとに実測して決めた。Vite は生成物の byte 一致 gate で撤退、という判断も含む
- サイト自身の実装ドキュメントを `/docs` で公開 (旧サイトには無い)
  - アーキテクチャ / 色の設計 / runtime の使い分け等を現在形で説明する。開発者と agent 向け
- mp3 の管理を git-annex 化 (実体は VPS 一箇所、保管 = 配信。GitHub には帳簿と symlink のみ)
  - 公開は `make mp3` の 1 操作。ID3 タグ (title/track/artist/album/cover) を annex 化前に自動で焼き、配信後に実タグを照合する読み取り専用検査もある
  - 旧さくらサーバー解約に伴い、mp3 の耐久 2 copies を VPS + さくらから VPS + ローカルへ切り替えた。git remote の命名も端末を問わず `origin` = GitHub に統一した
  - 新規 episode だけを VPS へ反映する軽量 deploy (`make preview`。bundle -> restart のみ、test 系なし) を追加した。アプリコード変更時は引き続き `make deploy` を使う
- dark / light テーマ (light-dark() + data-theme。SSR は theme cookie で FOUC なし)
  - toggle は 2 状態。system か、押した瞬間の反対を具体値で pin するかで、
    pin 後に OS 設定が変わってもサイトの見た目は動かない
  - 色は全て OKLCH。hue 6 + 濃度単位 1 + 状態混色率 2 の 9 公理から全 token を導出する
    格子文法で、`pnpm check:colors` が manifest 一致 / 文法 / コントラスト契約を検査する
- PWA は M9 で後日 (旧サイトの SW は kill-switch 配信中)

## 実装を工夫した点

- server を薄くする設計 (Workers 時代の制約が良い設計を残した)
  - コンテンツ (episodes JSON / feed / sitemap / wiki HTML / 検索 index) は全て build 時生成
    (検索 index を bundle 同梱していた時代は 1.74 MiB -> manifest 化で server bundle は激減)
  - feed / sitemap の毎リクエスト生成は CPU 実測で不可と判断して build 時化
  - Home SSR は in-memory cache (X-Cache header。restart で消える割り切り)
- ディレクトリ構成の原則 (cutover 直前に全面整理)
  - 「配信データは repo root の `<host>/`、プロセスは `runtime/<host>/`」の 2 軸
  - 「生成物は所有者の下 (`<owner>/.dist/`)」で top-level dist/ を廃止
  - 「自分たちが使う道具は dot ディレクトリ (.scripts/ 等)」
  - staging / blue-green / releases / rollback を持たない直線 deploy
    (pull -> build -> 両 daemon restart -> host matrix smoke)。個人サイトの規模判断
  - wiki だけ hash 世代 + symlink swap の atomic publish (全ページ 404 の窓を消す)
- 字幕の自前描画
  - macOS の字幕設定 (MediaAccessibility) が native ::cue の背景を author CSS より優先する
    (実測)。track.mode = "hidden" で時刻計算だけブラウザに任せ、active cue を DOM に転記
  - 音声は semantic に <audio> + <track kind="captions"> (video 要素からの置換の経緯)
  - JS 無効時は native の ::cue + :~:text= に graceful degradation
- 検索の text fragment 2 段構成
  - #hl=<語>(;line=<行>) は app-owned な fragment で自前 highlighter (CSS Custom Highlight API) が処理
  - :~:text=<行全文> は JS 無効 / full load 用に native へ委譲
  - ヒット行の抽出は client 側で detail JSON から (server 負荷ゼロ、ブラウザ cache が効く)
- 公開 VTT エディタの防御設計
  - If-Match (ETag) の競合検出 / strict VTT validation (bounded plain-text profile) /
    rate limit (IP / file / 全体の 3 段) / bounded snapshot /
    autosave は dirty revision 方式 (古い応答で新しい編集を saved にしない)
  - Trusted Types を CSP で enforce (VTT はテキストとしてのみ扱う)
- Popover API + CSS Anchor Positioning (mobile メニュー、rate 表示)
  - React state を持たない宣言的開閉、light dismiss / Esc / ARIA はブラウザ任せ
- Baseline Newly available 方針: polyfill なし
  (日付は temporal-polyfill-lite の ponyfill のみ。anchor() には静的 fallback)
- テスト / リリースの守り
  - Playwright E2E 151 test x 3 engine + axe (WCAG AA 違反 0 を CI で常時) + Page VRT + unit 545
  - E2E は専用 port + fixture 隔離 (実ファイルを書かない)、VRT は fixture episodes で
    実データ非依存 (エピソード公開で baseline が割れない)
  - CI の e2e 失敗 trace が 1 バイトも保存されていなかった事故と修復
    (outputDir の CWD 解決 + upload path 不一致 + 空 upload が success になる 3 重の穴)
  - 外部 action の full SHA pin + dependabot、pnpm の supply-chain policy (minimumReleaseAge 等)
  - 生成物は atomic publish (temp -> 検証 -> rename) + runtime の contract guard +
    artifact hygiene gate (dev origin / wiki raw の漏洩検査)

## こだわった点

- 旧サイトからの継承
  - モザイクのロゴ / RoyalBlue の accent / feed の golden diff = 0 / URL 互換
  - player は旧サイトで手組みした Web Components (MozaicPlayer) を土台に SVG アイコンも継承
- player の細部
  - 決定的な "00:00:00" 表示 (Intl.DurationFormat はブラウザ差があり不採用)
  - seekbar の hover 時刻 tooltip (thumb の可動域まで補正して正確な位置)
  - rate slider の x1 起点マーカー / bar 型 thumb (VTT editor と統一) / RoyalBlue の再生済み
  - Media Session (OS の再生 UI) 対応、再生位置・音量・倍速の localStorage 復元
- 字幕の様式: 白の太ゴシック (映画字幕風の教科書体案は試して取り下げ)
- mobile UI: now-playing の marquee / hamburger / rate ペア中央寄せ /
  カード meta の 1 行圧縮 ("2026-07-14: @guest")
- a11y: focus ring 統一、hit 領域 24px (WCAG 2.5.8)、VTT 競合の error summary +
  aria-invalid、字幕は aria-hidden (transcript は VTT タブが担う)、
  prefers-reduced-motion で marquee 停止、コントラストは全て実測で決定、
  Reference Target (Chrome 151) で shadow DOM を跨ぐ ARIA 参照に対応
- 文字ポリシー (全角記号の機械検査) と oxfmt による全拡張子一括 format

## その他特筆すべき点

- 開発体制: ほぼ全編を AI エージェント (Claude / Codex) との協働で実装
  - README = AGENTS.md = CLAUDE.md の単一規約、.agents/plan/ の planning workflow
    (WIP -> cross review -> Fixed)、Claude と Codex の相互レビュー
  - ディレクトリ整理 plan は 3 視点レビュー (Codex 2 round + Opus + self-review) を通して
    blocker 6 件を実装前に潰した、という進み方の実例
  - 確立した実装方針を skill (impl-patterns 等) に蓄積して再利用
  - reliability/security の横断レビュー (codebase-review) も agent 発 -> 相互レビュー ->
    1 日で W1-W5 実装、という進み方をした
- 実測駆動の意思決定が多い
  - webkit の scroll 復元 x container-type、macOS 字幕、::cue の var() 不安定、
    CSS nesting の specificity、CPU 実測 (feed 動的生成の断念)、bundle 実測 (1.74MiB 発覚)、
    gitignore の symlink 挙動、vite の publicDir copy 挙動など、
    「測って決めて README に制約として残す」運用
- 非公開 repo で運用 (コンテンツの権利のため)。igniter のみ MIT で単体公開予定 (@jxck/igniter)
- transcribe パイプライン: whisper の系統的不具合 (反復ループ / 時刻圧縮) への対策一式、
  VPS (メモリ 961MB) では turbo-q5 モデルで区間再書き起こし
- 旧サイトは cutover 後に削除 (並列稼働なし)。切替は DNS 変更 (Web 経路 IPv6 only 化) +
  証明書 SAN 拡張 + systemd 配備 + jxck.io h2o.conf の fragment import 切替
- コミットの署名をやめた。 1Password の approve がネックになるため。
