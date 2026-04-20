# WIP Plan: Repo Local Agent Maintainer Skill

## Plan by (Codex)

### Summary

`.agents/skills/agent-maintainer/` という新しい共通 skill を追加し、この repo 内の agent 運用ルールと shared skill レイアウトの**整合を監査し、必要な整理を実施する専用 skill**として定義する。

この skill の対象は repo ローカルの以下に限定する。

- `AGENTS.md`
- `.agents/skills/`
- `.claude/skills/`
- `.codex/skills/`
- `.agents/plan/`

`~/.codex/...` や repo 外の設定、`.claude/mcp.json` のような MCP server 設定は対象外にする。  
また、この skill は**明示的に指定された時だけ**使う前提とし、generic な agent/skill 保守依頼での auto-trigger を避ける。

この skill の追加と同じ変更セットで、ルールの正本配置も次の形に統一する。

- `Skill Directory Workflow`: `AGENTS.md` 正本のまま
- `Article Review Policy`: `article-review` skill 正本のまま
- `Plan File Workflow`: `planning` skill 正本へ移管する

これに合わせて、`AGENTS.md` には `Plan File Policy` という参照節だけを残し、`planning` skill は self-contained に書き換える。

### Implementation Changes

#### 1. `agent-maintainer` skill を追加する

正本を `.agents/skills/agent-maintainer/` に作る。  
`.claude/skills/agent-maintainer` と `.codex/skills/agent-maintainer` は、既存ルールどおり正本ディレクトリへの symlink にする。

`SKILL.md` の frontmatter は以下で固定する。

- `name: agent-maintainer`
- `description: Audit alignment between AGENTS.md and repo-local shared skills under .agents/skills. Invoke explicitly only; do not auto-trigger on generic agent or skill maintenance requests.`

#### 2. `agent-maintainer` の責務を固定する

この skill が扱うのは、**repo ローカルの agent 運用 docs / shared skill layout / workflow 定義の整合**だけに限定する。

含める責務:

- `AGENTS.md` を lean に保つ
  - repo 共通ルールだけを残す
  - task-specific rule は対応 skill に移す
  - 重複・古い運用記述を検出して整理する
- `.agents/skills/` を shared skill 正本として維持する
  - `.claude/skills/<skill>` と `.codex/skills/<skill>` が正本ディレクトリ symlink になっていることを確認する
  - 実ファイル複製や `SKILL.md` 単体 symlink を drift とみなして直す
- shared skill と `AGENTS.md` の責務分離を維持する
  - repo 共通ルールは `AGENTS.md`
  - task-specific rule は skill 正本
- plan workflow の**定義の整合**を維持する
  - `AGENTS.md` の参照節
  - `planning` skill の workflow 本文
  - `.agents/plan/` の命名規則

含めない責務:

- 個別 plan ファイルの作成・レビュー・Fixed 化
- repo 外の設定整理
- MCP 設定の最適化
- editor / formatter / shell の一般設定

#### 3. `Plan File Workflow` を `planning` skill 正本へ移管する

この移管は `agent-maintainer` 追加と**同じ変更セットで実施**する。

具体的には以下を行う。

- `planning` skill
  - `AGENTS.md` の `Plan File Workflow` 参照をやめる
  - workflow 本文を skill 側の正本として持つ
  - self-contained な説明に書き換える
- `AGENTS.md`
  - 現在の `Plan File Workflow` 本文を削除する
  - 代わりに `Plan File Policy` という参照節を置く
  - 内容は `planning` skill を使うことだけにする

これにより、`article-review` と `planning` の task-specific policy の置き方を対称にする。

#### 4. `agent-maintainer` の実行手順を固定する

`SKILL.md` の手順は以下で固定する。

1. `AGENTS.md` を読む
2. `.agents/skills/`, `.claude/skills/`, `.codex/skills/` の構造を確認する
3. shared skill の正本と symlink のズレを検出する
4. `AGENTS.md` と各 skill の間で、重複・矛盾・古い運用記述を洗い出す
5. ルールの置き場所を判断する
   - repo 共通 rule: `AGENTS.md`
   - task-specific rule: 対応 skill
6. 必要なら skill 正本へ移管し、`AGENTS.md` には参照だけを残す
7. shared skill ディレクトリ構成と symlink を整える
8. 最後に、移管・削除・共通化した点を短くまとめる

この skill 自身には `Skill Directory Workflow` の全文を再掲しない。  
shared rule は `AGENTS.md` を参照し、`agent-maintainer` には `AGENTS.md` に無い task-specific な判断だけを書く。

### Test Plan

実装後は少なくとも以下を確認する。

#### Skill Layout

- `.agents/skills/agent-maintainer/SKILL.md` が存在する
- `.claude/skills/agent-maintainer` がディレクトリ symlink である
- `.codex/skills/agent-maintainer` がディレクトリ symlink である
- `.claude/skills/*/SKILL.md` の個別 symlink が残っていない
- `.codex/skills/*/SKILL.md` の個別 symlink が残っていない

#### AGENTS / Skill Ownership

- `AGENTS.md` に article-review 固有の見出しや規約本文 (`Review Order`, `What To Fix`, `Sentence Splitting` など) が無い
- `AGENTS.md` に `Plan File Workflow` 本文が無く、`planning` skill への参照節だけがある
- `AGENTS.md` に `Skill Directory Workflow` 本文が残っている
- `.agents/skills/article-review/SKILL.md` に記事校正ルール本文がある
- `.agents/skills/planning/SKILL.md` に `WIP Plan`, `Plan by`, `Review by`, `Answer by`, `Fixed Plan` の workflow 本文がある

#### Responsibility Boundaries

- `agent-maintainer` の `SKILL.md` に MCP 設定を対象とする記述が無い
- `agent-maintainer` の `SKILL.md` に個別 plan ファイルをレビュー/Fixed 化する責務が書かれていない
- `agent-maintainer` の `SKILL.md` が `Skill Directory Workflow` の shared rule を丸ごと再掲していない

### Assumptions

- skill 名は `agent-maintainer` のまま採用する
- `Plan File Workflow` の移管は `agent-maintainer` 追加と同じ変更セットで行う
- `AGENTS.md` には repo 共通ルールと shared workflow の正本だけを残す
- task-specific な policy は、今後も対応する shared skill の正本へ寄せる
