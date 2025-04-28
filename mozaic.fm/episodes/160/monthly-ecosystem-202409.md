---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep160.mp3
published_at: 2024-09-20
guest: [@sakito](https://twitter.com/__sakito__)
guest: [@hiroppy](https://twitter.com/about_hiroppy)
---

# ep160 Monthly Ecosystem 202409

## Theme

第 160 回のテーマは 2024 年 9 月の Monthly Ecosystem です。


## Show Note

- What we got wrong about HTTP imports
  - https://deno.com/blog/http-imports
  - module の http imports は分散管理で良さそうと思ってはじめた
  - しかし依存の管理は結局うまくスケールしなかった
  - semver に乗りつつ、集中管理できる JSR を作った
  - import map と一緒にそっちに移行した方がいい
  - Deno 2 の展望も
- Node.js
  - v22.7.0
    - https://nodejs.org/en/blog/release/v22.7.0
    - `--experimental-transform-types` が追加され、TypeScript の Enum や namespaces がコードに含まれていても実行可能になった
    - `--experimental-detect-module` がデフォルトで有効になり、V8 を利用し、曖昧なファイル(.js または package.json に type が無い)に対して、中身に import/export/TLA などがあるかを見てモジュールが CJS か ESM かを判断するようになった
  - v22.8.0
    - https://nodejs.org/en/blog/release/v22.8.0
    - `module.enableCompileCache` が追加され、ロードされたモジュールのオンディスクキャッシュを有効化し、ESM でのパフォーマンス改善を行えるようになった
    - `vm.createContext` で `globalThis` を freeze させグローバルへのアクセス高速化を行えるようになった
    - node:test でカバレッジの閾値を設定可能になった
  - v22.9.0
    - https://nodejs.org/en/blog/release/v22.9.0
    - `util.getCallSite` で現在実行しているスタックトレースが取れるようになった
    - V8 にある SSA ベースの JIT コンパイラである Maglev をデフォルトで無効化へ
- Node.js Takes Steps Towards Removing Corepack
  - https://socket.dev/blog/node-js-takes-steps-towards-removing-corepack
  - Crepack が Node から削除される
  - 過去、deps: add Yarn 1.22.5
    - https://github.com/nodejs/node/pull/37277
- Breaking News: JSConf is Back and Joining the OpenJS Foundation | OpenJS Foundation
  - https://openjsf.org/blog/jsconf-brand-and-js-logo-and-wordmark-contributed
  - JSConf が OpenJS に所属
  - OpenJS World は JSConf にリブランド
- Announcing Rspack 1.0
  - https://rspack.dev/blog/announcing-1-0
  - npm でダウンロードされている webpack plugins の上位 50 位の 80%以上を実行できるようになった
  - chunks, tree shaking, scope hoisting, mangle exports などの最適化アルゴリズムのサポート
  - module federation v2 のサポート
  - Rspack Stack: Rspack/Rsbuild/Rslib/Rspress/Rsdctor
  - Import attributes の JSON/CSS Modules は対応済み
  - webpack での css scripts
    - https://github.com/webpack/webpack/pull/18721
    - https://github.com/webpack/webpack/issues/14893
    - https://github.com/webpack-contrib/css-loader/pull/1368
- Announcing Rsbuild 1.0 - Rsbuild
  - https://rsbuild.dev/community/releases/v1-0
  - Rspack を使ったビルドツール
  - webpack-cli との互換を維持しつつモダンな設計
  - ByteDance が Vite の代わりに開発したもので、内部ではかなり使われている
  - Rspress, Rslib, Modern.js (fullstack React Framework), Storybook Rsbuild も合わせて OSS 化
  - 今後は Remix とも協力など、多くのフレームワークへの対応をすすめる予定
  - feat: rsc plugin
    - https://github.com/web-infra-dev/rspack/pull/5824
- Evan You 「oxc + swc + Rolldown 使った Vue のビルドが 85 倍速くなった」
  - https://x.com/youyuxi/status/1833492071862440070
  - Linter Product Plan and Progress
    - https://github.com/oxc-project/oxc/issues/481
- Vite Environment API
  - https://github.com/vitejs/vite/pull/16471
  - client, ssr のように個別の環境を作成することができ、独立したモジュールグラフを作成することにより、混在しない状態が作れるようになった
  - この API を使うことにより、RSC のような独立したモジュールグラフを持つ環境を構築することが可能となった
- Biome v1.9 Anniversary Release | Biome
  - https://biomejs.dev/blog/biome-v1-9/
  - CSS/GraphQL の formatter/linter デフォルトサポート
  - AST grep みたいな AST を検索できる search 機能
    - プラグインを作る上で必要な機能を出したっぽい?
  - editorconfig を見るように
- Announcing TypedSQL: Make your raw SQL queries type-safe with Prisma ORM
  - https://www.prisma.io/blog/announcing-typedsql-make-your-raw-sql-queries-type-safe-with-prisma-orm
  - 生 SQL を型安全にしたライブラリ
  - prisma ディレクトリに sql ファイルを配置し、`prisma generate --sql` を実行することにより、ts のコードを生成できる
- Astro
  - v5.0 Beta
    - https://astro.build/blog/astro-5-beta/
    - Content Layer が安定へ
    - Server Islands が安定へ
      - 動的コンテンツのレンダリングを最初のページ読み込み後まで延期できる
    - astro:env が安定へ
  - v4.15
    - https://astro.build/blog/astro-4150/
    - astro actions が安定へ
    - i18n のルーティングでフォールバック結果の書き換えが可能になった
    - astro db でリモートの libSQL サーバーインスタンスへ接続可能になった
    - `client:idle` ディレクティブが追加され、コンポーネントのロードタイムアウトが設定可能になった
- Version support policy and ESLint v8.x end of life
  - https://eslint.org/blog/2024/09/eslint-v8-eol-version-support/
  - 2024/10/5 で v8 が EOL へ
  - HeroDevs への課金で延命可能
- experimental typesafety phase 1
  - https://github.com/remix-run/react-router/pull/12019
  - React Router(remix)のルーティングの型化まわりを試している PR
- Bun Compile and run C in JavaScript
  - https://bun.sh/blog/compile-and-run-c-in-js
  - JS のコード内で C をコンパイルし実行できるようになった
- express@5.0.0
  - https://github.com/expressjs/express/releases/tag/v5.0.0
  - https://github.com/expressjs/express/releases/tag/5.0.0-alpha.1
  - v5 alpha 1 から 10 年
- Material UI v6 is out now
  - https://mui.com/blog/material-ui-v6-is-out/
  - CSS theme variables の追加された
  - containerQueries の追加された
  - Grid2 が安定になった
  - emotion の代わりに Pigment CSS が実験的に統合できるようになった
  - Getting started with Pigment CSS
    - https://mui.com/material-ui/experimental-api/pigment-css/
  - toolpad
    - https://mui.com/toolpad/core/introduction/
    - tailwind ui のように MUI のコンポーネントでダッシュボードデザインのテンプレを作れるコンポーネント集
  - Toolpad Studio
    - toolpad のコンポーネントを GUI で動かしてダッシュボード画面を作り、コードも生成してくれる
- Announcing TypeScript 5.6
  - https://devblogs.microsoft.com/typescript/announcing-typescript-5-6/
  - 8 月分参照
- Component testing in Storybook
  - https://storybook.js.org/blog/component-testing/
  - Storybook と Chromatic を活用した component test と e2e について
- Storybook 8.3
  - https://github.com/storybookjs/storybook/blob/next/CHANGELOG.md#830
  - First-class Vitest integration to run stories as component tests
  - Next.js-Vite framework for Vitest compatibility and better DX
  - Further reduced bundle size for a smaller install footprint
  - Experimental Story globals to standardize stories for themes, viewports, and locales
  - Hundreds more improvements
- Support React 18 in Pages Router
  - https://github.com/vercel/next.js/pull/69484
  - Pages Router は React v19 落ち着くまで v18 にする PR
    - マージしてリバートされた
      - https://github.com/vercel/next.js/pull/69911
      - つまり 19 がでそう?
- v0.dev のアップデート
  - https://v0.dev/chat
  - v0.dev の日本語対応、UI 生成以外も対応
- Why did OpenAI move from Next.js to Remix?
  - https://www.youtube.com/watch?v=hHWgGfZpk00
  - OpenAI が Remix にしたはなし
- node-fetch-server
  - https://github.com/mjackson/remix-the-web/tree/main/packages/node-fetch-server


## Events

- 9 月
  - 7: Web Developer Conference
    - https://web-study.connpass.com/event/321711/
  - 10-12: GraphQL Conf
    - https://graphql.org/blog/2024-03-28-announcing-graphqlconf-2024/
- 10 月
  - 2-3: Compose2024
    - https://www.netlify.com/compose
  - 3: ViteConf
    - https://viteconf.org/?2024
  - 19: Vue Fes Japan 2024
    - https://vuefes.jp/2024/
  - 24: Next.js Conf
    - https://nextjs.org/conf
- 11 月
  - 16: tskaigi kansai
    - https://tskaigi.hatenablog.com/entry/2024/08/01/152041
  - 23: JSConfJP
    - https://jsconf.jp/2024/
  - 19-22: React Summit in NY
    - https://reactsummit.us/