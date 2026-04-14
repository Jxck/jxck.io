---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep202.mp3
published_at: 2026-04-14
guests:
  - name: "@sakito"
    url: https://x.com/__sakito__
  - name: "@yukukotani"
    url: https://x.com/yukukotani
  - name: "@sosuke"
    url: https://x.com/__sosukesuzuki
---

# ep202 Monthly Ecosystem 202604

## Theme

第 202 回のテーマは 2026 年 4 月の Monthly Ecosystem です。


## Show Note

- Supply-Chain Compromise of axios npm Package
  - https://gist.github.com/joe-desimone/36061dabd2bc2513705e0d083a9673e7
  - https://cloud.google.com/blog/topics/threat-intelligence/unc1069-targets-cryptocurrency-ai-social-engineering
  - axios のメンテナがマルウェア感染を受け axios が汚染スクリプトを配布した
  - 攻撃は北朝鮮系で金銭目的とされている
  - メンテナに面接をよそおって近づき、Zoom の調子が悪いと、修正スクリプトを渡す方式
  - インストールすると infostealer が動き、トークンを抜かれる。
  - ちょうど Faltt が Takumi Guard を始めたばかりなので、移行する流れができた
  - Our response to the Axios developer tool compromise
    - https://openai.com/index/axios-developer-tool-compromise/
    - OpenAI も被害
- 要(かなめ)はサイバーセキュリティ～守らなければ奪われる～第１話「なりすまし」(一般社員向け) - YouTube
  - https://www.youtube.com/watch?v=oLW7YG85c-8
  - 警視庁公式 YouTube の 3 話ドラマ
  - サプライチェーン被害に合う流れがリアル
- Introducing 1Password® Unified Access: Identity Security for Humans and Their AI Agents | 1Password
  - https://1password.com/blog/introducing-1password-unified-access
- Release pnpm 11 RC 0 · pnpm/pnpm
  - https://github.com/pnpm/pnpm/releases/tag/v11.0.0-rc.0
  - `minimumReleaseAge` defaults to 1 day
- Release pnpm 11 Beta 0 · pnpm/pnpm
  - https://github.com/pnpm/pnpm/releases/tag/v11.0.0-beta.0
- [RFC] JSIR: A High-Level IR for JavaScript - MLIR - LLVM Discussion Forums
  - https://discourse.llvm.org/t/rfc-jsir-a-high-level-ir-for-javascript/90456
  - https://github.com/google/jsir
  - Google が JS の中間表現の標準化を提案
  - 実装として、Google がデコンパイルや難読化に使ってる JSIR を公開
  - ツールを AST ベースから、IR ベースへの移行を提案
- Announcing TypeScript 6.0 - TypeScript
  - https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/
  - https://github.com/andrewbranch/ts5to6
- Node.js - Node.js 25.9.0 (Current)
  - https://nodejs.org/en/blog/release/v25.9.0
  - `--experimental-stream-iter` (stream/iter)
  - jasnell/new-streams: A proposal for a new streams API
    - https://github.com/jasnell/new-streams
    - WHATWG Stream の実装上の問題を批判した
    - その POC 実装
  - We deserve a better streams API for JavaScript | The Cloudflare Blog
    - https://blog.cloudflare.com/a-better-web-streams-api/
    - Node.js コアコントリビューター、Cloudflare Workers メンバーの James Snell による Streams Standards に対する批判記事。
    - 現状の仕様は必要以上に複雑で実装が遅くなりがち。
    - パフォーマンスが出ないため、新しいストリーム API を提案している。
  - On the Streams Standard | Domenic Denicola
    - https://domenic.me/streams-standard/
    - Streams Standards の仕様策定を進めていた Domenic Denicola による反論記事。
    - 最適化されたファストパスを実装できるように、内部動作を可能な限り外部から観測できないよう細心の注意を払って設計されているため、パフォーマンスに対する批判は見当違いである。
      - ただし仕様策定から 10 年たって振り返ると BYOB やバックプレッシャーなどの仕様が複雑になってしまったのは反省点だと認める。
    - 現代の Web 標準環境において、基礎的なプリミティブを改善するために予算やリソースを割いてもらうのは、2010 年代よりも遥かに難しい。
- Tales from the Void: March 2026 Recap | VoidZero
  - https://voidzero.dev/posts/whats-new-mar-2026
- Introducing EmDash - the spiritual successor to WordPress that solves plugin security
  - https://blog.cloudflare.com/emdash-wordpress/
- Next.js 16.2 | Next.js
  - https://nextjs.org/blog/next-16-2
- Next.js 16.2: AI Improvements | Next.js
  - https://nextjs.org/blog/next-16-2-ai
- Next.js Across Platforms: Adapters, OpenNext, and Our Commitments
  - https://nextjs.org/blog/nextjs-across-platforms
  - OpenNext と共同開発された AdapterAPI
- Release v10.3.0 · storybookjs/storybook
  - https://github.com/storybookjs/storybook/releases/tag/v10.3.0
- Storybook 10.3
  - https://storybook.js.org/blog/storybook-10-3/
- Best practices for using Storybook with AI
  - https://storybook.js.org/docs/ai/best-practices
  - Storybook MCP と AI 活用のために Story ファイルを書くベストプラクティス
- Storybook MCP for React
  - https://storybook.js.org/blog/storybook-mcp-for-react/
- Release v2.7.6 · denoland/deno
  - https://github.com/denoland/deno/releases/tag/v2.7.6
- Bun v1.3.11 | Bun Blog
  - https://bun.com/blog/bun-v1.3.11
- Bun v.1.3.12 | Bun Blog
  - https://bun.com/blog/bun-v1.3.12
- Valibot v1.3: Smarter pipelines, result caching, and new validators | Valibot
  - https://valibot.dev/blog/valibot-v1.3-release-notes/
- ESLint v10.1.0 released - ESLint - Pluggable JavaScript Linter
  - https://eslint.org/blog/2026/03/eslint-v10.1.0-released/
- RedwoodSDK 1.0: Getting Out of the Weeds
  - https://rwsdk.com/blog/redwood-v1-getting-out-of-the-weeds
- Vitest 4.1 is out! | Vitest
  - https://vitest.dev/blog/vitest-4-1.html
- [flags] land enableTrustedTypesIntegration
  - https://github.com/facebook/react/pull/35816
  - Trusted Types API を React に入れる話し
- Announcing Knip v6 | Knip
  - https://knip.dev/blog/knip-v6
  - oxc 移行した 2~4x 高速化
  - 「oxc が全部やってくれた、めちゃくちゃ感謝」
- Writing Tests | Guide | Vitest
  - https://vitest.dev/guide/learn/writing-tests.html
  - Vitest のベストプラクティスまとめ
- Introducing Material UI and MUI X v9
  - https://mui.com/blog/introducing-mui-v9/
  - コンポーネント追加、カレンダーやチャット専用、AI のためのドキュメント構造化などもしていくらしい
- Project Glasswing: Securing critical software for the AI era Anthropic
  - https://www.anthropic.com/glasswing
  - AWS, Apple, Google, MS などが共同で防御強化のため作ったプロジェクト
  - Mythos(ミュトス) が OS/browser で大量の脆弱性を自律発見したことが発端
  - AI の攻撃能力の急上昇に対抗するため、防御側に先に渡し、重要インフラを守る必要がある
  - 90 日以内に成果と修正済み脆弱性を公開し、新しいセキュリティ標準の策定も進行。
  - Anthropic は 1 億ドルのクレジット提供などで支援し、40 以上の組織が参加。
- 0din-ai/ai-scanner: AI model safety scanner built on NVIDIA garak
  - https://github.com/0din-ai/ai-scanner
  - TODO
- Claude Managed Agents
  - https://platform.claude.com/docs/en/managed-agents/overview
  - Anthropic 公式のマネージドなエージェントハーネス
  - Tool や FS をサンドボックスで動かせる
- Supabase docs over SSH
  - https://supabase.com/blog/supabase-docs-over-ssh
  - AI Agent が Supabase のドキュメントに直接アクセスできる SSH サーバー
  - Supabase の MCP は search_docs があるが、先に目的が必要。
  - Bash なら雑に探したり、偶然何かを見つけたりできる。


## Events

- 4 月
  - 22-24: Google Cloud Next 2026
    - https://www.googlecloudevents.com/next-vegas
- 5 月
  - 9: フロントエンドカンファレンス名古屋
    - https://fec-nagoya-org.github.io/2026/
  - 19-20: Google I/O 2026
    - https://io.google/2026/
  - 22-23: TS Kaigi 2026
    - https://2026.tskaigi.org/
- 6 月
  - 2-3: Microsoft Build
    - https://build.microsoft.com/en-US/home
  - 10: Code with Claude
    - https://claude.com/code-with-claude
  - 23-25: Figma Config 2026
    - https://config.figma.com/