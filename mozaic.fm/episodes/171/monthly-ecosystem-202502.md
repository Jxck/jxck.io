---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep171.mp3
published_at: 2025-02-20
guest: [@hiroppy](https://x.com/about_hiroppy)
guest: [@araya](https://bsky.app/profile/araya.dev)
---

# ep171 Monthly Ecosystem 202502

## Theme

第 171 回のテーマは 2025 年 2 月の Monthly Ecosystem です。

## Show Note

- Node v24 が 2025-04-22 に予定
  - https://github.com/nodejs/node/issues/57057
  - v18 が 2025-04-30 に EOL
- Node v23.7.0
  - https://nodejs.org/en/blog/release/v23.7.0
- Node v23.8.0
  - https://nodejs.org/en/blog/release/v23.8.0
  - URL Pattern
  - zstd のサポート
- Node JSX Support ?
  - https://github.com/nodejs/node/issues/56822
- require(esm) Backported to Node.js 20, Paving the Way for ESM-Only Packages
  - https://socket.dev/blog/require-esm-backported-to-node-js-20
- Add nodejs runtime support for middleware by ijjk · Pull Request #75624 · vercel/next.js
  - https://x.com/leeerob/status/1886547050134647070
  - https://github.com/vercel/next.js/pull/75624
  - Next.js に新しく experimental.nodeMiddleware フラグが追加
- Sunsetting Create React App
  - https://react.dev/blog/2025/02/14/sunsetting-create-react-app
    - アクティブなメンテナーがいない
    - CRA で新しいアプリを作ると警告が出る
- Build a React app from Scratch
  - https://react.dev/learn/build-a-react-app-from-scratch
- create-tsrouter-app
  - Vite,Tanstack Router を使った CRA のようなやつ
  - Tanstack 公式ではないがスポンサー的なことはしてるらしい
    - https://x.com/tannerlinsley/status/1891950203256659996
- State of React 2024
  - https://2024.stateofreact.com/ja-JP/
- [crud] Merge useResourceEffect into useEffect
  - https://github.com/facebook/react/pull/32205/files
- React Router v7.2.0
  - https://github.com/remix-run/react-router/blob/main/CHANGELOG.md#v720
- react-hook-form に standard-schema が追加
  - https://github.com/react-hook-form/resolvers/releases/tag/v4.0.0
- Announcing TypeScript 5.8 RC - TypeScript
  - https://devblogs.microsoft.com/typescript/announcing-typescript-5-8-rc/
  - Granular Checks for Branches in Return Expressions
  - Support for `require()` of ECMAScript Modules in `--module nodenext`
  - `--module node18`
  - The `--erasableSyntaxOnly` Option
  - The `--libReplacement` Flag
  - Preserved Computed Property Names in Declaration Files
  - Optimizations on Program Loads and Updates
  - Notable Behavioral Changes
    - lib.d.ts
    - Restrictions on Import Assertions Under `--module nodenext`
- kermanx/simple_ts
  - https://github.com/KermanX/simple_ts
  - oxc の type aware linting に使う目的の ts 実装
  - TS のパーサだが lint に必要な最小限に絞ることで実装を軽くする目的
- Introducing the JSR open governance board
  - https://deno.com/blog/jsr-open-governance-board
  - Announcing OpenAI on JSR https://deno.com/blog/openai-on-jsr
- Deno: "#FreeJavaScript update: Oracle…" - Fosstodon
  - https://fosstodon.org/@deno_land/113793964751001617
  - Oracle が JS 商標の放棄を拒否
- Announcing Rspack 1.2 - Rspack
  - https://rspack.dev/blog/announcing-1-2
    - persisted cache
    - Yarn PnP support
    - Angular support
    - https://github.com/Coly010/ng-rspack-build
- @rsbuild/plugin-react-router
  - https://github.com/rspack-contrib/rsbuild-plugin-react-router
  - RS Build で React Router を使うプラグイン
- Bun 1.2
  - https://bun.sh/blog/bun-v1.2
  - lockfile の default が text file になり、dependabot でも beta として support された
    - https://github.com/dependabot/dependabot-core/issues/6528#issuecomment-2593393639
- Newly published versions of package managers distributed from npm cannot be installed due to key id mismatch
  - https://github.com/nodejs/corepack/issues/612
- Open Props UI
  - https://open-props-ui.netlify.app/
  - Open Props v2 をベースにした UI コンポーネント集
- Tailwind CSS v4.0 - Tailwind CSS
  - https://tailwindcss.com/blog/tailwindcss-v4
  - New high-performance engine
  - Designed for the modern web
  - Simplified installation
  - First-party Vite plugin
  - Automatic content detection
  - Built-in import support
  - CSS-first configuration
  - CSS theme variables
  - Dynamic utility values and variants
  - Modernized P3 color palette
  - Container queries
  - New 3D transform utilities
  - Expanded gradient APIs
  - @starting-style support
  - `not-*` variant
  - Even more new utilities and variants
- Move on to ESM-only
  - https://antfu.me/posts/move-on-to-esm-only
  - Anthony Fu が ESM 移行を推奨する記事
  - もう準備は整ったとしている
- Prisma
  - From Rust to TypeScript: A New Chapter for Prisma ORM
    - https://www.prisma.io/blog/from-rust-to-typescript-a-new-chapter-for-prisma-orm
  - v6.4.0
    - https://github.com/prisma/prisma/releases/tag/6.4.0
- ESLint now officially supports linting of CSS
  - https://eslint.org/blog/2025/02/eslint-css-support/
- Announcing NestJS 11: What's New?
  - https://trilon.io/blog/announcing-nestjs-11-whats-new
- Biome Roadmap 2025 and Biome 2.0
  - https://biomejs.dev/blog/roadmap-2025/
- Fastly が「AI Accelerator」正式リリース、生成 AI からのレスポンスをキャッシュし高速化とコスト削減を実現
  - https://www.publickey1.jp/blog/25/fastlyai_acceleratorai.html
- Introducing Fluid compute: The power of servers, in serverless form
  - https://vercel.com/blog/introducing-fluid-compute
- storybook v8.5
  - https://x.com/storybookjs/status/1881752469929365789
  - https://storybook.js.org/blog/storybook-8-5/
- shiki-stream
  - https://github.com/antfu/shiki-stream
- Laravel Starter Kits
  - https://laravel.com/docs/11.x/starter-kits
  - Laravel アプリケーションのスターターキット
- Angular: The Documentary | An origin story
  - https://www.youtube.com/watch?v=cRC9DlH45lA
- Astro 5.2 | Astro
  - https://astro.build/blog/astro-520/
- Astro 5.3 | Astro
  - https://astro.build/blog/astro-530/
- Introducing HeroUI
  - https://www.heroui.com/blog/introducing-heroui

## Events

- 1 月
- 2 月
- 3 月
- 4 月
- 5 月
