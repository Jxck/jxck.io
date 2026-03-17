---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep200.mp3
published_at: 2026-03-18
guests:
  - name: "@sakito"
    url: https://x.com/__sakito__
  - name: "@re-taro"
    url: https://x.com/re_taro_
  - name: "@yukukotani"
    url: https://x.com/yukukotani
---

# ep200 Monthly Ecosystem 202603

## Theme

第 200 回のテーマは 2026 年 3 月の Monthly Ecosystem です。

## Show Note

- Vite 8.0 is out! | Vite
  - https://vite.dev/blog/announcing-vite8
  - esbuild + rollup => rolldown に統一
  - oxc 移行
  - registry.vite.dev
  - devtools
- Vite+
  - https://viteplus.dev/
  - VoidZero スタックの統合 CLI
  - 有償予定だったけど無償になった
- Void Cloud
  - https://void.cloud/
  - VoidZero 製のデプロイプラットフォーム
  - Vite 向け
  - Cloudflare backend らしい
- What's New in ViteLand: February 2026 Recap | VoidZero
  - https://voidzero.dev/posts/whats-new-feb-2026
- What's new in Astro - February 2026 | Astro
  - https://astro.build/blog/whats-new-february-2026/
- Astro 6.0 | Astro
  - https://astro.build/blog/astro-6/?tw
- How we rebuilt Next.js with AI in one week
  - https://blog.cloudflare.com/vinext/
  - Next.js を Vite ベースに AI で丸っと書き換え
  - Vercel 側からは Slop Fork と批判
  - 本当にテストが通ってるのか怪しいという話も
- Vercel Chat SDK
  - https://vercel.com/changelog/chat-sdk
  - `npm i chat`
  - Slack とか Discord とかを統合的に扱える Chat Bot SDK
- Node.js のリリーススケジュール変更
  - https://nodejs.org/ja/blog/announcements/evolving-the-nodejs-release-schedule
  - 毎年 4 月にメジャーアップデートが出て、10 月に LTS になり 30 ヶ月継続、を繰り返す
  - 奇数/偶数バージョンの区別はなくなり、全バージョンが LTS になる
  - v27(2027/04)から適用
- Announcing npmx: a fast, modern browser for the npm registry
  - https://npmx.dev/blog/alpha-release
    - npm パッケージに関するあれこれを行ってくれる
    - download statistics
    - outdated dependency warnings
    - module format (ESM/CJS)
    - install size
    - JSR cross-reference
    - multi-provider repo support
    - version range resolution
    - package likes and social features
    - performance recommendations powered by e18e
  - https://voidzero.dev/posts/npmx-alpha
    - VoidZero も興味を示している
- shadcn/cli v4
  - https://ui.shadcn.com/docs/changelog/2026-03-cli-v4
  - skills の追加
  - shadcn/create と--preset で初期のカスタマイズの生成
  - `init --template` による Nextjs や Vite などへのテンプレートの生成
  - `init --base` で Radix や Base UI の選択
  - docs によるドキュメントの取得
  - Monorepo 対応
- Introducing TanStack Intent: Ship Agent Skills with your npm Packages
  - https://tanstack.com/blog/from-docs-to-agents
  - tanstack/intent で npm パッケージに skills を組み込む仕組みをつくったとのこと
  - skills の生成、検証、対象の依存グラフなども出してくれる
- The Next Evolution of Prisma ORM
  - https://www.prisma.io/blog/the-next-evolution-of-prisma-orm
  - Prisma クエリの見直し
  - SQL ビルダーの追加
  - 全レイヤでの Validation
  - エージェントのガードレールに
  - etc etc
- Drizzle joins PlanetScale
  - https://planetscale.com/blog/drizzle-joins-planetscale
  - Drizzle が PlanetScale に join
- React Compiler: Rust edition is coming soon.
  - https://x.com/en_JS/status/2031606726689173846?s=20
  - oxc base ではなく独自の中間表現を持っているらしい
  - AI 使って大部分を書き換えた
- How to supercharge your design system with slots
  - https://www.figma.com/blog/supercharge-your-design-system-with-slots/
  - Figma で slots 機能がリリースされた
  - React でいう children のように、構造やレイアウトは親が持っていて、そこに入る子は柔軟にできる
  - AI でのコード生成もより実態に近くなる
- Figma MCP Catalog | Figma
  - https://www.figma.com/mcp-catalog/
  - Figma と連携できる MCP のカタログ
- Codex to Figma と Claude Code to Figma
  - https://www.figma.com/blog/introducing-codex-to-figma/
  - https://www.figma.com/blog/introducing-claude-code-to-figma/
  - Figma の Canvas 上で Claude Code や Codex の連携ができる
  - Figma からコード生成もできる
- Codex Security: now in research preview | OpenAI
  - https://openai.com/index/codex-security-now-in-research-preview/
- Code Review for Claude Code | Claude
  - https://claude.com/blog/code-review
- Continue local sessions from any device with Remote Control - Claude Code Docs
  - https://code.claude.com/docs/en/remote-control
- Oxlint JS Plugins Alpha | The JavaScript Oxidation Compiler
  - https://oxc.rs/blog/2026-03-11-oxlint-js-plugins-alpha
- Oxfmt Beta
  - https://oxc.rs/blog/2026-02-24-oxfmt-beta
  - Oxfmt 1.0
    - https://github.com/oxc-project/oxc/milestone/19
- Takumi Guard | Flatt Security
  - https://flatt.tech/takumi/features/guard
  - 去年猛威を振るったサプライチェーンアタックの対策を無料で提供
  - npm の全パッケージを監視しているらしい
    - インストールスクリプトの悪用
    - 使い捨てメールからの公開
    - typosquatting (名前偽装)
    - 既知の悪意あるメンテナーの検出
  - npm のプロキシで導入すると危険なパッケージをブロック
  - 後から発覚した場合もアラートを送ってくれる
- Hono Documentary
  - http://youtu.be/lgy0FKho2yI
- Cursor が JetBrains IDE で利用可能になりました
  - https://cursor.com/ja/blog/jetbrains-acp
  - Agent Client Protocol を用いて JetBrains IDE で Cursor を呼び出す対応
- Introducing Glaze
  - https://www.raycast.com/blog/introducing-glaze
  - Raycast が Mac OS のデスクトップアプリをプロンプトで生成するツールをリリース
  - App Store へのリリースまでできるらしい
- Rork
  - https://rork.com/
- Mastra Code
  - https://code.mastra.ai/
- GitHub Copilot CLI is now generally available - GitHub Changelog
  - https://github.blog/changelog/2026-02-25-github-copilot-cli-is-now-generally-available/
- Google completes acquisition of Wiz
  - https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/wiz-acquisition/
  - It's Official: Wiz Joins Google! | Wiz Blog
    - https://www.wiz.io/blog/google-closes-deal-to-acquire-wiz
- Statement from Dario Amodei on our discussions with the Department of War Anthropic
  - https://www.anthropic.com/news/statement-department-of-war
  - Anthropic、AI の軍事利用について米国防総省の要求を拒否 - Impress Watch
    - https://www.watch.impress.co.jp/docs/news/2089161.html
- Build agents that run automatically
  - https://cursor.com/blog/automations
  - イベントトリガーで常時稼働するエージェント
- Claude Code に「オートモード」登場 承認作業を AI で自動化
  - https://www.itmedia.co.jp/news/articles/2603/05/news116.html
  - 承認作業を AI で自動化して長時間の AI 作業が可能に
- マヂラブ野田クリスタル Claude Code を手に入れる
  - https://x.com/nodacry/status/2033184666291982497
  - 独学の Win 向けゲームを iPhone に移植
  - 企画力ある人が AI を手に入れる強さに期待

## Events

- 4 月
  - 22-24: Google Cloud Next 2026
    - https://www.googlecloudevents.com/next-vegas
- 5 月
  - 19-20: Google I/O 2026
    - https://io.google/2026/
  - 22-23: TS Kaigi 2026
    - https://2026.tskaigi.org/
- 6 月
  - 2-3: Microsoft Build
    - https://build.microsoft.com/en-US/home
  - 23-25: Figma Config 2026
    - https://config.figma.com/
