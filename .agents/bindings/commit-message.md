# commit-message の binding

global skill `commit-message` がこの repo で使う値である。規約の本体は global skill が持つ。

## prefix の一覧

- `[entries]`
  - `blog.jxck.io/entries/` 配下の記事 (md / 画像)
- `[draft]`
  - `blog.jxck.io/drafts/` の下書き
- `[mozaic]`
  - `mozaic.fm` 配下 (ポッドキャスト)
- `[src]`
  - `.src/` のビルドスクリプト類
- `[make]`
  - `Makefile` / `makefile`
- `[h2o]`
  - `h2o.conf` / `.mruby.handler/` などのサーバ設定
- `[cdt]`
  - CDT / 辞書生成ツール (`.src/dictionary/` など)
- `[dict]`
  - 配信用辞書 (`blog.jxck.io/dictionary/`)
- `[image]`
  - 画像
- `[agents]`
  - `AGENTS.md` やエージェント設定
- `[skill]`
  - skill 定義 (`.agents/skills/` など) と binding (`.agents/bindings/`)
- `[plan]`
  - `.agents/plan/` のプラン

上記で表せない場合は、対象に応じた prefix を使う。例は `[npm]` / `[readme]` / `[gitignore]` である。

## 表記ゆれ

- `[mozaic]` を `[moziac]` と打ち間違えない
- `[agent]` ではなく `[agents]` に寄せる

## prefix を付けない例外

- 生成物だけを再 build した commit は、慣例として prefix なしの `build` を使う
- それ以外の通常の変更には、必ず `[area]` の prefix を付ける
