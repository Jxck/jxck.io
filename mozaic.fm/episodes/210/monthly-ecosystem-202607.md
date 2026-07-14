---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep210.mp3
published_at: 2026-07-14
guests:
  - name: "@yukukotani"
    url: https://x.com/yukukotani
  - name: "@syumai"
    url: https://x.com/__syumai
---

# ep210 Monthly Ecosystem 202607

## Theme

第 210 回のテーマは 2026 年 7 月の Monthly Ecosystem です。


## Show Note

- TypeScript 7.0 Release
  - https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
  - RC からの大きな変更は特になさそう
  - JS API は以前からの計画通り、TypeScript 7.1 でのリリースを想定
  - Vue, MDX, Astro, Svelte などでは、現時点では TS 7 を活かしきれない可能性が高い
  - VS Code 向けの Native preview plugin の名前が「TypeScript 7」になっていた
    - https://marketplace.visualstudio.com/items?itemName=TypeScriptTeam.native-preview
- Vite 8.1
  - https://vite.dev/blog/announcing-vite8-1
  - Vite 8.1 の中心的な新機能は、実験的な**Bundled Dev Mode**。
  - 以前「Full Bundle Mode」と呼ばれていた機能で、開発時にもアプリ全体をある程度まとめてバンドルする。
  - 通常の Vite はソースモジュールを個別に配信するが、巨大なアプリではモジュール数そのものがボトルネックになる。
  - Bundled Dev Mode は、数千〜数万モジュールを持つ大規模アプリでの起動やページ再読み込みを高速化する。
- pnpr
  - https://pnpm.io/pnpr/
  - pnpr は、**Rust で実装された pnpm 互換の npm レジストリサーバー**。
  - npm Registry Protocol を実装しており、pnpm だけでなく npm や Yarn からも利用できる。
  - 組織内のプライベートパッケージをホストする用途に使える。
  - [npmjs.org](http://npmjs.org)などの外部レジストリをプロキシし、取得したパッケージをキャッシュできる。
    - 上流レジストリが停止した場合でも、キャッシュ済みパッケージを利用できるため耐障害性が上がる。
    - 上流レジストリの認証トークンをサーバー側に保持し、クライアントへ直接配布しない credential gateway として使える。
  - pnpm CLI とは独立した製品であり、pnpm を使わずに pnpr だけを利用することも、その逆も可能。
- Rspack 2.1
  - https://rspack.rs/blog/announcing-2-1
  - Rspack 2.1 では、Rust 版 React Compiler を組み込みの SWC loader から直接利用できる。
  - 従来は主に`babel-loader`経由だったため、React Compiler 以外に Babel 変換のオーバーヘッドが発生していた。
  - Rspack のベンチマークでは、Rust 版 React Compiler は Babel 版より約 7〜13 倍高速。
  - 開発ビルドでは 10.6 秒から 0.7 秒、プロダクションビルドでは 9.3 秒から 1.2 秒になったとしている。TypeScript 7 への対応が追加された。
- oxc_type_checker
  - https://github.com/oxc-project/oxc/tree/main/crates/oxc_type_checker
  - Oxc のチームが tsgo を Rust に port しようとしているっぽい
- Vite+ Beta
  - https://voidzero.dev/posts/announcing-vite-plus-beta
- Deno 2.9
  - https://deno.com/blog/v2.9
  - deno desktop コマンドなど
- konsistent
  - https://vercel.com/changelog/enforce-consistent-code-for-agents-and-humans-with-konsistent
  - Vercel Labs 製の TypeScript 向け Linter
  - ESLint などと異なり、プロジェクトの構造を検査する
- Vercel が Better Auth を買収
  - https://vercel.com/blog/vercel-acquires-better-auth
- eve
  - https://vercel.com/eve
- **Cloudflare の Workers Cache**
  - https://blog.cloudflare.com/workers-cache/
  - これまで Cloudflare Workers は前段に Cache を置けなかったが、置けるようになったらしい
    - Cache を返すにも、Workers の Cache API で読み書きする必要があった
    - Workers Cache なら Worker の CPU / メモリを消費しない
- Ant
  - https://antjs.org/
  - Ant is a lightweight, high-performance JavaScript runtime built from scratch.
  - バイナリサイズが 9MB、単一ファイルとして配布可能
- Yuku
  - https://yuku.fyi/
  - Zig 製の JS/TS Toolchain。いまのところパーサーと codegen と意味解析器がある
  - oxc より速いらしい。
  - VoidZero の Boshen も言及していた
    - https://x.com/boshen_c/status/2076523616876011666?
- Rewriting Bun in Rust
  - https://bun.com/blog/bun-in-rust
  - アンサー記事 by Zig 作者
    - https://andrewkelley.me/post/my-thoughts-bun-rust-rewrite.html
- GLM 5.2
  - https://docs.z.ai/guides/llm/glm-5.2
  - Z.AI の新モデル
- Claude Code Artifacts
  - https://claude.com/blog/artifacts-in-claude-code
- Claude Sonnet 5
  - https://www.anthropic.com/news/claude-sonnet-5
  - Fable が再度使えるようになる直前
- Redeploying Fable 5
  - https://www.anthropic.com/news/redeploying-fable-5
  - Fable 再開
  - 週次利用枠の 50% までが Fable 枠
    - https://support.claude.com/en/articles/15424964-claude-fable-5-promotional-access
- Claude Fable 5 のサブスク利用延長 (1 回目)
  - https://x.com/claudeai/status/2074548242386178258
  - 7/12 まで延長
- GPT-5.6 (Sol / Terra / Luna) リリース
  - https://openai.com/ja-JP/index/gpt-5-6/
  - **モデル構成**
    - GPT-5.6 は、高性能な **Sol**、低コストでバランス型の **Terra**、最速・最安の **Luna** の 3 層で提供。
    - 必要に応じて推論量を増やす `max` と、複数エージェントを並列実行する `ultra` を利用できる。
  - **コーディング**
    - OpenAI 史上最も高性能なコーディングモデルとされ、実際のコードベースや長時間のターミナル作業に強い。
    - 少ない指示でも、調査、実装、デバッグ、検証まで継続して進める能力が向上した。
  - **安全対策**
    - モデル内の保護機能、リアルタイム検査、監視、アカウント単位の制御を組み合わせた多層構造。
    - サイバーセキュリティ・生物学の能力は向上したが、OpenAI の評価上はいずれも「Critical」のしきい値を超えていない。
  - **提供先**
    - ChatGPT、ChatGPT Work、Codex、OpenAI API で提供。
    - 無料・Go ユーザーは主に Terra、有料プランでは Sol、Terra、Luna や高度な推論設定を利用できる。
  - **API 料金**
    - 100 万トークン当たり **入力/出力**
    - Sol: **$5/$30**
    - Terra: **$2.50/$15**
    - Luna: **$1/$6**
- Grok 4.5 リリース
  - https://x.ai/news/grok-4-5
  - SpaceXAI (旧: xAI) に買収された Cursor のチームが一緒に訓練したモデル
  - 高速さが売り
    - 80 TPS
- Claude Fable 5 のサブスク利用延長 (2 回目)
  - https://x.com/claudeai/status/2076351399999557669
  - 7/19 まで延長
- CursorBench 3.2
  - https://cursor.com/en-US/cursorbench
  - Fable 5 に加えて Grok 4.5、GPT-5.6 が追加されている
  - 一番賢いのは引き続き Fable 5
  - Grok 4.5 のコスト対性能がかなり良さそう
  - GPT-5.6 も健闘
- Design Arena の Frontend アプリケーション構築ベンチマーク「Web Dev (Non-Agentic)」で GPT-5.6 Sol が一位に
  - https://x.com/Designarena/status/2076391367446860249
  - https://intelligence.ai/leaderboard
    - 多様なタスクにおけるモデルの能力を総合的に評価
      - Web サイト、UI コンポーネント、ゲーム開発、データビジュアライゼーション、3D モデリング等
    - コーディング能力の総合的なパフォーマンスを計測
  - Fable 5 を上回った
  - GLM 5.2 も Fable 超え
- Cloudflare proudly joins the UK government's Cyber Resilience Pledge
  - https://blog.cloudflare.com/cloudflare-joins-uk-cyber-resilience-pledge/
  - 英国政府がサイバー・レジリエンス・プレッジを発表した。
  - Cloudflare が創設メンバーとして参加し、サイバーセキュリティの向上に貢献する。
  - プレッジの柱は、セキュリティの民主化、リーダーシップの責任、透明性である。
  - サイバーセキュリティは企業の重要な優先事項であり、全ての組織が基準を満たすべきである。


## Events

- 6 月
  - 23-25: Figma Config 2026
    - https://config.figma.com/
- 7 月
  - 11: Google I/O Extended Tokyo 2026
    - https://gdg-tokyo.connpass.com/event/394136/
  - 27: [初心者歓迎] #雑 LT_study - connpass
    - https://web-study.connpass.com/event/396644/
  - 30-31 Google Cloud Next Tokyo
    - https://www.googlecloudevents.com/next-tokyo/
- 8 月
  - 17: Ginza.js#11
    - https://ginzajs.connpass.com/event/398379/
- 9 月
  - 11: Go Conference 2026
    - https://gocon.jp/2026/
  - 12: Frontend Conference Fukuoka 2026
    - https://frontend-conf.fukuoka.jp/2026/?hl=ja
  - 26: Platform Engineering Kaigi 2026
    - https://www.cnia.io/pek2026/