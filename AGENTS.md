# Project Agent Policy

このリポジトリで作業する際の正本ルールです。


## Project Notes

- ビルドの中心は `Makefile` と `.src/build.ts`
- `.src/build.ts` は起動時に `process.chdir(import.meta.dirname)` するため、相対パスは `.src/` 基準
- `make` (= `make all`) で blog → podcast → dict → comp を順に実行する
- `make blog` は記事の差分ビルドと `index.html` 更新のみを行い、`.dcb` は作らない
- `make dict` は `blog.jxck.io/dictionary/entries.dict` を直接更新する
- `make comp` は通常の `.br` と `blog.jxck.io/entries/**/*.html.dcb` を生成する
- `make clean` は `.br` / `.dcb` / `.dict` を削除、`make distclean` は全生成物を削除
- 辞書生成・圧縮ツールは `.src/dictionary/`、配信用辞書は `blog.jxck.io/dictionary/` に置く
- CDT 配信ロジックは `h2o.conf` ではなく `.mruby.handler/dcb.rb` にある
- `Dictionary-ID` は Structured Fields String なので、mruby では `"entries"` のように quotes を含んだ値で比較する


## Plan File Workflow

- プランは `.agents/plan/` 配下に `YYYYMMDD-HHMM-概要.md` で作る
- 初稿は `# WIP Plan: プラン名` で始める
- 初稿本文は `## Plan by (Agent 名)` に書く
- レビューは `## Review by (Agent 名)` を末尾に追記していく
- レビューへの返答は `## Answer by (Agent 名)` を末尾に追記してよい
- 方針が固まったら全体を清書し、同じファイルを `# Fixed Plan: プラン名` で上書きする


## Skill Directory Workflow

- 共有 skill の正本は `.agents/skills/<skill>/SKILL.md` に置く
- `.claude/skills/<skill>/SKILL.md` と `.codex/skills/<skill>/SKILL.md` は、原則としてその正本への symlink にする
- skill の内容を更新する場合は、正本だけを編集する
- `name` や `description` を含む frontmatter は正本だけに持たせる
- Claude/Codex 側に内容を複製して持たない


## Article Review Policy

- 記事のレビュー/校正ルールの正本は `.agents/skills/article-review/SKILL.md` に置く
- 記事をレビューまたは校正する場合は、必ず `article-review` skill を使う
