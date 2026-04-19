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


# Article Review Policy

このリポジトリで記事原稿をレビューまたは校正する際は、以下の方針に従う。


## Scope

- 対象は主に `blog.jxck.io/entries/**/*.md`
- 指示がなければ、本文・見出し・箇条書き・注釈を確認対象とする
- 画像や外部リンクのファクトチェックは、必要性が明示された場合にのみ行う
- 漢字の開き閉じは、明示的に求められない限り触らない
  - `関わらず` を `かかわらず` に修正しない
  - `無い` を `ない` に修正しない
- 同一記事の中で閉じ開きがゆれていたら、閉じる側に揃える。

## Review Order

- まず明確な誤字脱字を直す
- 次に、意味を変えずに不自然な表現を直す
- 次に、同一記事内の表記ゆれをそろえる
- 最後に、長すぎて読みにくい一文だけを分割する


## What To Fix

- 明確なら抜き言葉、い抜き言葉
- 明確な誤字脱字
- 不自然な日本語
  - 名詞化が連続して重い文
  - 主語述語の対応が弱い文
  - 係り受けが遠すぎる文
  - 口語的すぎて浮く表現
- 表記ゆれ
- 数字
  - 基本は算用数字を使う(`一回` -> `1 回`)


## What Not To Fix

- 筆者の主張やトーンそのもの
- 意図的な言い回し、皮肉、比喩
- 漢字の開き閉じ
- 業界慣用表現
- ファイル末尾に改行を足さない


## Sentence Splitting

- 一文が長くても、論理が素直で読めるなら無理に分割しない
- 分割するのは次のような場合のみ
  - 1 文に論点が 3 つ以上入っている
  - 逆接や条件節が重なって読みにくい
  - 補足が長く、主文が埋もれている
- 分割時は、意味やトーンを変えない
- 接続詞を安易に増やしすぎない


## Style

- 筆者の文体は維持する
- 技術記事としての硬さは保つ
- 過度に平易化しない
- 説教くさい書き換えや要約はしない
- 意味が同じなら、短くて素直な文を優先する


## Output Policy

- 修正は高確度なものだけに絞る
- 大規模な全面リライトはしない
