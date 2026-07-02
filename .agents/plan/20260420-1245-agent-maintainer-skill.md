# Fixed Plan: Agent Maintainer Skill

## 概要

repo 内の agent 運用ルールと shared skill レイアウトの整合を監査する専用 skill `agent-maintainer` を定義する。同じ変更セットで、`Plan File Workflow` の正本を `AGENTS.md` から `planning` skill へ移管し、`AGENTS.md` には参照節 (`Plan File Policy`) だけを残す。

当初案 (WIP) では skill 正本を `.agents/skills/agent-maintainer/` (repo ローカル) に置く計画だったが、実装後の 2026-04-30 に `planning` とあわせて dotfiles 管理のグローバル skill へ移設した。この配置変更を正式な決定として本プランに反映する (2026-07-02 確認)。

## 経緯

- 2026-04-20 12:45: WIP Plan 作成 (Codex)
- 2026-04-20 13:10: repo ローカルに実装 (`ca27cca26 [agents] add agent-maintainer`)
- 2026-04-30 17:34-17:44: `planning` / `agent-maintainer` を dotfiles へ移設し、repo ローカルから削除 (`91dcc219d`, `8e127dda3`)
- 2026-07-02: グローバル配置の維持を決定し、Fixed 化

## 最終形

### 配置

- `agent-maintainer` の正本: dotfiles 管理 (`~/dotfiles/.agents/skills/agent-maintainer/`)、`~/.claude/skills/` / `~/.codex/skills/` 経由でグローバルに公開
- `planning` の正本: 同上 (dotfiles 管理のグローバル skill)
- repo ローカルの `.agents/skills/` に残すのは repo 固有 skill (`article-review`, `commit-message`) のみ

repo を対象とする skill でも、特定 repo の作業ディレクトリに依存しない「運用系 skill」は dotfiles に集約する。repo コンテンツに密結合な skill (記事校正・commit message 規約) だけを repo ローカル正本とする。

### frontmatter

- `name: agent-maintainer`
- `description: Audit alignment between AGENTS.md and repo-local shared skills under .agents/skills. Invoke explicitly only; do not auto-trigger on generic agent or skill maintenance requests.`

明示的に指定された時だけ使い、generic な agent/skill 保守依頼で auto-trigger しない。

### 責務

対象は repo ローカルの `AGENTS.md` / `.agents/skills/` / `.claude/skills/` / `.codex/skills/` / `.agents/plan/` に限定する。

含める:

- `AGENTS.md` を lean に保つ (repo 共通ルールのみ残し、task-specific rule は対応 skill へ移す)
- `.agents/skills/` 正本と `.claude/skills/` / `.codex/skills/` symlink の drift 検出と修正
- plan workflow の定義整合 (`AGENTS.md` 参照節 / `planning` skill 本文 / `.agents/plan/` 命名規則)

含めない:

- 個別 plan ファイルの作成・レビュー・Fixed 化 (`planning` skill の責務)
- repo 外の設定・ホーム配下の共通 skill・MCP 設定・editor / formatter / shell の一般設定

手順の詳細は skill 正本 (`SKILL.md`) に持ち、`Skill Directory Workflow` の shared rule 本文は `AGENTS.md` を正本として再掲しない。

### Plan File Workflow の移管

- `planning` skill: workflow 本文 (`WIP Plan` / `Plan by` / `Review by` / `Answer by` / `Fixed Plan`) を self-contained に持つ
- `AGENTS.md`: `Plan File Workflow` 本文を削除し、`Plan File Policy` 参照節 (`planning` skill を使うことのみ) を置く

これにより task-specific policy の置き方が `article-review` / `commit-message` / `planning` で対称になる。

## 検証 (2026-07-02 実施)

- [x] `~/.claude/skills/agent-maintainer/SKILL.md` が存在し、frontmatter が上記の通り
- [x] `~/.codex/skills/agent-maintainer` が同じ正本 (dotfiles) を指す
- [x] repo の `.claude/skills/` / `.codex/skills/` は `article-review` / `commit-message` のディレクトリ symlink のみで、`SKILL.md` 単体 symlink や実ファイル複製が無い
- [x] `AGENTS.md` に `Plan File Workflow` 本文が無く、`Plan File Policy` 参照節だけがある
- [x] `AGENTS.md` に `Skill Directory Workflow` 本文が残っている
- [x] `AGENTS.md` に article-review 固有の規約本文が無い
- [x] `planning` skill に workflow 本文があり self-contained になっている
- [x] `agent-maintainer` の `SKILL.md` に MCP 設定・個別 plan の Fixed 化を扱う記述が無い
- [x] `agent-maintainer` の `SKILL.md` が `Skill Directory Workflow` 本文を再掲していない
