---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep102.mp3
published_at: 2022-08-20
guest: [@sakito](https://twitter.com/__sakito__)
guest: [@hiroppy](https://twitter.com/about_hiroppy)
---

# ep102 Monthly Ecosystem 202208

## Theme

第 102 回のテーマは 2022 年 8 月の Monthly Ecosystem です。

## Show Note

- Grafbase: Instant serverless GraphQL backends - Grafbase
  - https://grafbase.com/blog/announcing-grafbase
- Electron 20.0.0 | Electron
  - https://www.electronjs.org/blog/electron-20-0
  - レンダラーがデフォルトで sandbox 化されるようになった
  - 最近出た脆弱性の情報
    - https://news.infoseek.co.jp/article/mynavi_2463478/
  - リリースサイクル
    - https://www.electronjs.org/blog/8-week-cadence
- remix/streaming.md at deferred · remix-run/remix
  - https://github.com/remix-run/remix/blob/deferred/docs/guides/streaming.md
  - React 18 の suspence で watarfall だと遅延するため parallel にしたい
  - Loader 内で明示的に deffer で囲い Await で fallback を出す
  - Next での Layout 相当
- Vite 3.0
  - https://vitejs.dev/blog/announcing-vite3.html
  - Cold Start Improvements
    - 依存の欠損が発生した場合のリロードが減った
  - Esbuild Deps Optimization at Build Time (Experimental)
    - 今までは、 deps をスキャンして最適化してブラウザに渡していた
      - これだと渡したあとに欠損した deps があった場合、再度最適化してブラウザに渡してブラウザをリロードさせる必要がある
    - 今後は、 deps をスキャンして最適化して欠損を見つけてブラウザに渡すようにしたことにより、欠損がみつかったとしても再度ブラウザをリロードする必要がなくなった
  - HMR Partial Accept (Experimental)
    - UI と純粋な関数の混合モジュールの HMR は関数側の書き換えでも起こってしまう
    - これが起こらないように明示的に UI コンポーネントを指定する
  - Bundle Size Reduction
  - Bug Fixing
  - Compatibility Notes
  - Upgrades to Vite Core
  - The Ecosystem is Ready for v3
- Announcing Docusaurus 2.0
  - https://docusaurus.io/blog/2022/08/01/announcing-docusaurus-2.0
- Astro 1.0
  - https://astro.build/blog/astro-1/
  - UI FW 非依存の SSG
  - https://docs.astro.build/en/concepts/mpa-vs-spa/
  - https://docs.astro.build/en/concepts/islands/
  - Island Architecture を独自解釈した Astro Island
- NestJS v9 is now available !
  - https://trilon.io/blog/nestjs-9-is-now-available
  - REPL が入った
  - Node v10 サポート終了
- Storybook 7.0 design sneak peek
  - https://storybook.js.org/blog/storybook-7-0-design-sneak-peek/
- Storybook - 7.0 design alpha
  - https://storybook.js.org/blog/7-0-design-alpha/
  - https://www.chromatic.com/
  - https://ladle.dev/blog/introducing-ladle
- Release v1.24.0 · microsoft/playwright
  - https://github.com/microsoft/playwright/releases/tag/v1.24.0
  - Component Tests Update
  - beforeMount / afterMount hooks の導入
- Rome v0.8.0
  - https://github.com/rome/tools/blob/main/CHANGELOG.md#080
  - rome.json に formatter のセッティングが書ける
- Hermes as the Default
  - https://reactnative.dev/blog/2022/07/08/hermes-as-the-default
  - React Native のデフォルトエンジンを Hermes にした
- 🧙‍♂️ npx-import 🧙‍♀️ v1
  - https://github.com/geelen/npx-import
- JiraCLI
  - https://github.com/ankitpokhrel/jira-cli
- npm, introducing query
  - https://github.blog/changelog/2022-08-03-introducing-the-new-npm-dependency-selector-syntax
  - npm に `query` コマンドが追加
  - `npm query "[license=MIT]"` とかすると MIT ライセンスなものだけ出る的な
- GitHub Pages now uses Actions by default
  - https://github.blog/2022-08-10-github-pages-now-uses-actions-by-default/
  - gh-pages branch や docs dir が不要になり Actions だけで pages ができるようになる
- Cloudscape
  - https://cloudscape.design/
  - AWS の Design System
- Big Changes Ahead for Deno
  - https://deno.com/blog/changes
  - Deno の今後の方針について
  - npm モジュールサポート
  - 最速の JS ランタイムにする。最速の HTTP サーバを搭載。
  - 企業サポート強化
  - この先のはなし
    - https://github.com/denoland/deno/issues/12577
- ESLint's new config system, Part 1: Background
  - https://eslint.org/blog/2022/08/new-config-system-part-1/
- Migrate Babel from Flow to TypeScript (except Babel parser) by zxbodya · Pull Request #11578 · babel/babel
  - https://github.com/babel/babel/pull/11578
  - https://medium.com/flow-type/clarity-on-flows-direction-and-open-source-engagement-e721a4eb4d8b
