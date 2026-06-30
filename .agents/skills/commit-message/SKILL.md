---
name: commit-message
description: Write git commit messages for this repository following the `[area]` prefix convention. Use when composing or reviewing a commit message in jxck.io.
---

# commit-message

このリポジトリの commit message を書くときの共通ルールである。

commit message に関する正本ルールはこの skill に集約する。
`AGENTS.md` には skill を使うことだけを書き、詳細な規約はここに置く。

## 起動時にやること

1. [`AGENTS.md`](../../../AGENTS.md) を読み、リポジトリ共通ルールを確認する
2. 変更内容の主対象(どのディレクトリ/コンポーネントか)を見極める
3. 先頭に `[area]` prefix を付けて message を書く

## 基本ルール

- message の先頭は必ず `[area]` の形の prefix を 1 つ付ける
  - 例: `[entries] fix typos in digital-legacy`
- prefix は変更の **主対象** に対応させる
- prefix の後ろに半角スペースを 1 つ置き、英語で簡潔に内容を書く
- 本文は英語(グローバル規約に従う)、命令形・現在形で短く

## Prefix の選び方

- 既存の prefix を再利用する。新しい prefix をむやみに増やさない
- 迷ったら `git log --format='%s' | grep -oE '^\[[^]]+\]' | sort | uniq -c | sort -rn` で
  既存の prefix を確認し、それに合わせる
- 複数領域にまたがる場合は、最も中心的な領域 1 つを選ぶ
- 表記ゆれを作らない
  - `[mozaic]` を `[moziac]` と打ち間違えない
  - `[agent]` ではなく `[agents]` に寄せる

## Prefix 一覧 (主なもの)

- `[entries]` — `blog.jxck.io/entries/` 配下の記事 (md / 画像)
- `[draft]` — `blog.jxck.io/drafts/` の下書き
- `[mozaic]` — `mozaic.fm` 配下 (ポッドキャスト)
- `[src]` — `.src/` のビルドスクリプト類
- `[make]` — `Makefile` / `makefile`
- `[h2o]` — `h2o.conf` / `.mruby.handler/` などのサーバ設定
- `[cdt]` — CDT / 辞書生成ツール (`.src/dictionary/` など)
- `[dict]` — 配信用辞書 (`blog.jxck.io/dictionary/`)
- `[image]` — 画像
- `[agents]` — `AGENTS.md` やエージェント設定
- `[skill]` — skill 定義 (`.agents/skills/` など)
- `[plan]` — `.agents/plan/` のプラン
- 上記で表せない場合は対象に応じた prefix を使う (`[npm]` `[readme]` `[gitignore]` など)

## 例外

- 生成物のみの再ビルドコミットは、慣例として prefix なしの `build` を使ってきた
  - これに倣う場合は `build` のままで良い
- それ以外の通常の変更は、必ず `[area]` prefix を付ける

## やらないこと

- 既存コミットの message を遡って書き換えない
- 意味のない prefix の新設や、1 コミットへの複数 prefix の付与はしない
- 全角の括弧 (`【】` や `[]`) は使わず、半角の `[]` を使う
