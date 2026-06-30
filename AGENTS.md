# Project Agent Policy

このリポジトリで作業する際の正本ルールです。


## Project Notes

- ビルドの中心は `Makefile` と `.src/build.ts`
- `.src/build.ts` は起動時に `process.chdir(import.meta.dirname)` するため、相対パスは `.src/` 基準
- `make` (引数なし) と `make all` はエラーを出して停止し、`make blog` か `make podcast` を実行するよう促す (全体一括ビルドは廃止)
- `make blog` は記事の差分ビルドと `index.html` 更新を行い、最後に `make comp` を呼んで変更分の `.br` / `.html.dcb` を生成する
- `make dict` は古い `*.dict` / `*.dict.br` を掃除してから辞書を再生成し、`blog.jxck.io/dictionary/entries/<hash>.dict` と配信用の `<hash>.dict.br` を作り、`active.dict` (`<hash>.dict` への symlink) と `h2o.dict.conf` を更新し、全 `.html.dcb` も生成し直したうえで、最後に `make reload` で h2o に反映する
- `make comp` は通常の `.br` と `blog.jxck.io/entries/**/*.html.dcb` を生成する
- `make clean` は `.br` / `.dcb` / `.dict` を削除、`make distclean` は全生成物を削除
- 辞書生成・圧縮ツールは `.src/dictionary/`、配信用辞書は `blog.jxck.io/dictionary/entries/` に置く
- CDT 配信ロジックは `h2o.conf` ではなく `.mruby.handler/dcb.rb` にある
- `Dictionary-ID` は Structured Fields String なので、mruby では `"entries"` のように quotes を含んだ値で比較する


## Plan File Policy

- プラン作成・レビュー・固定化の正本ルールはグローバル skill (`planning`) にある
- プランを作成またはレビューする場合は、必ず `planning` skill を使う


## Skill Directory Workflow

- 共有 skill の正本は `.agents/skills/<skill>/` に置く
- `.claude/skills/<skill>` と `.codex/skills/<skill>` は、原則としてその正本ディレクトリへの symlink にする
- skill の内容を更新する場合は、正本だけを編集する
- `name` や `description` を含む frontmatter は正本だけに持たせる
- Claude/Codex 側に内容を複製して持たない


## Article Review Policy

- 記事のレビュー/校正ルールの正本は `.agents/skills/article-review/SKILL.md` に置く
- 記事をレビューまたは校正する場合は、必ず `article-review` skill を使う
