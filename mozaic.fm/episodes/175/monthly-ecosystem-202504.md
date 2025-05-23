---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep175.mp3
published_at: 2025-04-17
guest: [@sakito](https://x.com/__sakito__)
guest: [@hiroppy](https://x.com/about_hiroppy)
---

# ep175 Monthly Ecosystem 202504

## Theme

第 175 回のテーマは 2025 年 4 月の Monthly Ecosystem です。

## Show Note

- TypeScript
  - A 10x Faster TypeScript - TypeScript
    - https://devblogs.microsoft.com/typescript/typescript-native-port/
    - TSC を Go で書き直して高速化する話
    - Anders が去年 10 月くらいからゴリッと書き直し始めたっぽい
    - Go な理由
      - ネイティブコードの最適化がプラットフォームごとにしやすい
      - 並列処理(Goroutine)での高速化がしやすい
      - TS のコードの形を維持しやすい
    - checker 周りはできていて、今年中に CLI が出るかも
    - 仕様の維持(推論周りとか)は期待できなさそう
    - 開発者はビルドが速くなって嬉しいが、エコシステムはどうなるか?
- ESLint
  - v9.23.0 released
    - https://eslint.org/blog/2025/03/eslint-v9.23.0-released/
  - ESLint v9.24.0 released
    - https://eslint.org/blog/2025/04/eslint-v9.24.0-released/
  - Introducing bulk suppressions
    - https://eslint.org/blog/2025/04/introducing-bulk-suppressions/
    - 新しいルールを追加するときに段階的に適用していく方法
    - これまでは ignore していくしかなかった
    - 新しく `eslint-suppressions.json` を設置しそこにルール違反の対象を記述
    - コードと一緒に管理できる
    - コマンドで更新も可能
- React
  - React for Two Computers
    - https://overreacted.io/react-for-two-computers/
  - JSX Over The Wire
    - https://overreacted.io/jsx-over-the-wire/
  - v19.1.0
    - https://github.com/facebook/react/releases/tag/v19.1.0
    - Owner Stack
    - Added support for beforetoggle and toggle events on the dialog element.
  - Advanced React in the Wild
    - https://largeapps.dev/case-studies/advanced/
- Next.js
  - CVE-2025-29927: Authorization Bypass in Next.js | Fastly
    - https://www.fastly.com/blog/cve-2025-29927-authorization-bypass-in-next-js
    - `x-middleware-subrequest` で middle ware をスキップできる
  - Postmortem on Next.js Middleware bypass - Vercel
    - https://vercel.com/blog/postmortem-on-next-js-middleware-bypass
  - v15.3
    - https://nextjs.org/blog/next-15-3
    - Turbopack の本番ビルドのアルファバージョン対応
    - Rspack のサポート
    - Client Instrumentation Hook
    - Navigation Hooks
  - RFC: Deployment Adapters API
    - https://github.com/vercel/next.js/discussions/77740
    - Vercel もこの仕様にのっとり、各サーバレスプラットフォームでも Next.js のデプロイを容易にするための API 案。
    - Netlify、Cloudflare、Amplify、OpenNext と共同でワーキンググループを立ち上げて進めている
  - How we run Next.js today - and what should change
    - https://www.netlify.com/blog/how-we-run-nextjs/
    - Netlify から Next.js への提言
  - Next.js Support Policy | Next.js by Vercel - The React Framework
    - https://nextjs.org/support-policy
    - サポートポリシーの公開
    - Active LTS
      - 次のメジャーまではメンテされる
      - 今は 15.x 系
    - Maintenance LTS
      - 2 年間セキュリティフィックスのみ
      - 今は 14.x 系
- biome
  - Biome partners with Vercel to improve type inference
    - https://biomejs.dev/blog/vercel-partners-biome-type-inference/
  - v2.0 beta
    - https://biomejs.dev/blog/biome-v2-0-beta/
    - GritQL Plugin
    - Domains
- Rstack
  - Rspack joins the Next.js ecosystem
    - https://rspack.dev/blog/rspack-next-partner
  - Announcing Rsdoctor 1.0
    - https://rsdoctor.dev/blog/release/release-note-1_0
  - Support running JavaScript loader in parallel
    - https://github.com/web-infra-dev/rspack/releases/tag/v1.3.1
  - web-infra-dev/rstest: The testing framework powered by Rspack (WIP).
    - https://github.com/web-infra-dev/rstest
    - Rspack 前提のテストツール
- RedwoodJS は Redwood GraphQL と Redwood SDK に分かれるぽい
  - https://community.redwoodjs.com/t/the-future-of-redwood-launches-today/7938/1
- Oxc
  - Oxlint Plugins Written In JavaScript
    - https://github.com/oxc-project/oxc/discussions/10342
  - Oxlint Beta
    - https://oxc.rs/blog/2025-03-15-oxlint-beta.html
- Rolldown
  - How Rolldown Works: Module Loading, Dependency Graphs, and Optimization Explained
    - https://www.atriiy.dev/blog/rolldown-module-loader-and-dependency-graph
  - tsdown が Rolldown の一部へ
    - https://github.com/rolldown/tsdown
    - EvanYou のコメント
      - https://x.com/youyuxi/status/1912149489701568661
      - > Think tsup but based on Rolldown - which means it's compatible with Rollup/Vite plugins. Additionally, it has the additional ability to generate and bundle dts alongside the main js bundle in one go!
      - > With Vite soon moving over the Rolldown, it will be the foundation to improve the lib mode feature of Vite
- webpack
  - Introduce typescript/auto Mode for Faster TypeScript Transpilation in Webpack
    - https://github.com/webpack/webpack/issues/19354
- Turborepo
  - v2.5
    - https://turbo.build/blog/turbo-2-5
- VoidZero and NuxtLabs join forces on Vite Devtools | VoidZero
  - https://voidzero.dev/posts/voidzero-nuxtlabs-vite-devtools
  - デバッグや解析を支援するツール Vite DevTools
  - VoidZero が NuxtLabs と連携し、Anthony Fu がこれに専念する
  - https://node-modules.dev/
- Hello Tokyo!
  - https://antfu.me/posts/hello-tokyo
  - Anthony Fu が日本に移住
- styled-components
- メンテナンスモードへ
  - https://opencollective.com/styled-components/updates/thank-you
- Node.js
  - v23.11.0 (Current)
    - https://nodejs.org/ja/blog/release/v23.11.0
    - assert.partialDeepStrictEqual
    - process.execve
  - v23.10.0 (Current)
    - https://nodejs.org/ja/blog/release/v23.10.0
    - experimental-config-file
  - src: add --run-from runtime flag
    - https://github.com/nodejs/node/pull/57523
    - package.json を指定できるようになったので、monorepo 等でも root から実行可能になった
  - Should Corepack stay in the Node.js distribution?
    - https://github.com/nodejs/TSC/pull/1697#issuecomment-2737093616
    - 段階的に廃止に決定。
    - Node.js の将来のリリース ライン (v25 以降) で Corepack の配布を停止し、内包されなくなる。
    - 既存のリリース ラインと次のリリース ライン (24.x) では、Corepack は実験的なまま
- Zod
  - Introducing Zod 4 beta
    - https://v4.zod.dev/v4
- Tanstack
  - TanStack + Netlify Partnership
    - https://tanstack.com/blog/netlify-partnership
  - Announcing TanStack Form v1
    - https://tanstack.com/blog/announcing-tanstack-form-v1
  - TanStack Pacer
    - https://tanstack.com/pacer/latest
    - throttling, debounce などに特化したライブラリ
    - 現代版 rxjs
- Prisma
  - Prisma ORM Roadmap: March - May 2025
    - https://github.com/prisma/prisma/issues/26592
  - Prisma ORM 6.6.0: ESM Support, D1 Migrations & MCP Server
    - https://www.prisma.io/blog/prisma-orm-6-6-0-esm-support-d1-migrations-and-prisma-mcp-server
  - Announcing Prisma's MCP Server: Vibe Code with Prisma Postgres
    - https://www.prisma.io/blog/announcing-prisma-s-mcp-server-vibe-code-with-prisma-postgres
- Valibot
  - v1 - The 1 kB schema library
    - https://valibot.dev/blog/valibot-v1-the-1-kb-schema-library/
- Cloudflare
  - Cloudflare "Just use Vite"… with the Workers runtime
    - https://blog.cloudflare.com/introducing-the-cloudflare-vite-plugin/
- Deno
  - Node just added TypeScript support. What does that mean for Deno?
    - https://deno.com/blog/typescript-in-node-vs-deno
    - Node が TS サポートしたが、それでも Deno にあるメリット
    - 組み込み型チェック、JSX、ツールチェイン etc
- Playwright
  - microsoft/playwright-mcp
    - https://github.com/microsoft/playwright-mcp
- React Native 0.79 - Faster tooling and much more
  - https://reactnative.dev/blog/2025/04/08/react-native-0.79
  - JSC moving
- Lynx
  - Lynx Roadmap 2025
    - https://lynxjs.org/blog/lynx-open-source-roadmap-2025.html
- Sneak peek: Accessibility Addon refresh
  - https://storybook.js.org/blog/preview-the-new-accessibility-addon/
  - Storybook 9.0 で入るアクセシビリティ周りのはなし
- Figma Slides の正式リリース
  - https://www.figma.com/release-notes/?title=slides-is-out-of-beta
  - PowerPoint インポート、エクスポート機能の追加が入った
- Piecing together the Agent puzzle: MCP, authentication & authorization, and Durable Objects free tier
  - https://blog.cloudflare.com/building-ai-agents-with-mcp-authn-authz-and-durable-objects/
  - Cloudflare の AI 周りのツールが発表された
- e18e
  - Community Showcase (Q1 2025)
    - https://e18e.dev/blog/community-showcase-q1.html
- mui
  - Material UI v7 is here
    - https://mui.com/blog/material-ui-v7-is-here/
- Express
  - Express@5.1.0: Now the Default on npm with LTS Timeline
    - https://expressjs.com/2025/03/31/v5-1-latest-release.html
- Astro
  - v5.7
    - https://astro.build/blog/astro-570/
  - v5.6
    - https://astro.build/blog/astro-560/
- 社内デザインシステムを MCP サーバー化したら UI 実装が爆速になった
  - https://zenn.dev/ubie_dev/articles/f927aaff02d618
- OAuth 2.1 in MCP
  - https://modelcontextprotocol.io/specification/2025-03-26
- A2A protocol
  - https://google.github.io/A2A
  - AI Agent 間で連携するためのプロトコル
- Taming the Wild West of ML: Practical Model Signing with Sigstore
  - https://security.googleblog.com/2025/04/taming-wild-west-of-ml-practical-model.html
  - Model 自体に署名を付与し Sigstore で管理
- 「GIMP 3.0」がリリース ～約 7 年ぶりの大規模アップデートで「GTK 3」ベースに
  - https://forest.watch.impress.co.jp/docs/news/1670985.html

## Events

- 4 月
- 5 月
  - 6-8: Figma Config 2025
    - https://config.figma.com/san-francisco/
  - 23-24: TSKaigi 2025
    - https://2025.tskaigi.org/
- 6 月
- 7 月
- 8 月
- 9 月
  - 6: フロントエンドカンファレンス北海道
    - https://note.com/_n13u_/n/n7ae05b22c09d
  - 21: フロントエンドカンファレンス東京
    - https://x.com/fec_tokyo/status/1908082128815812618
- 10 月
  - React Conf
    - https://conf.react.dev/
  - Vite Conf
    - https://viteconf.amsterdam/
