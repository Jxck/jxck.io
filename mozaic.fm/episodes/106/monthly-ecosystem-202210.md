---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep106.mp3
published_at: 2022-10-19
guest:
  - [@sakito](https://twitter.com/__sakito__)
  - [@hiroppy](https://twitter.com/about_hiroppy)
---

# ep106 Monthly Ecosystem 202210

## Theme

第 106 回のテーマは 2022 年 10 月の Monthly Ecosystem です。

## Show Note

- **Astro 1.4.0/1.5.0 Release | Astro**
  - https://astro.build/blog/astro-140/
  - https://astro.build/blog/astro-150/
  - node/standalone が追加され、express とかのコード書かなくて良くなった + SSR の preview ができるようになった
  - tailwind/tsconfig の HMR 対応
  - cookie のライブラリ buit-in
  - `:where` で css が出力されるようになった
- **RFC: First class support for promises and async/await**
  - https://github.com/reactjs/rfcs/pull/229
  - `use` Hook と Server Components での async/await のサポートについて
  - Suspense で Promise を解決するもの
    - これでデータの取得を解決し、別の RFC で cache についてのサポートも追加予定らしい
  - Server Components と Client Components で同じような Promise の解決をしたいモチベーションがあり、async/await を使用していることが、Server Components であるという指標にもなるらしい。
  - Client Components はいくつかの技術的な問題があり、Server Components のような async/await コンポーネントにできないらしい
    - https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md#why-cant-client-components-be-async-functions
  - postgres
    - https://github.com/facebook/react/blob/main/packages/react-pg/src/ReactPostgres.js
  - wg
    - https://github.com/reactwg/server-components/discussions/2
- **Substack が Github のアカウント削除**
  - https://web.archive.org/web/20220709104641/https://twitter.com/substack/status/1545720920735551489
  - Substack が Github から消えて npm のモジュールがヤバいことになってる
  - どうやら消した理由は npm/github の 2FA 必須に反対しているかららしい
  - https://twitter.com/ljharb/status/1579610392414007299
  - パッケージのサルベージも始まっている
- **rollup@3.0.0**
  - https://github.com/rollup/rollup/releases/tag/v3.0.0
  - `node:` prefix が使えるようになった
- **Add no-nested-components ESLint rule**
  - https://github.com/facebook/react/pull/25360
  - コンポーネントのネストを防ぐ ESLint ルール
- **Introducing OG Image Generation: Fast, dynamic social card images at the Edge - Vercel**
  - https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images
  - OG の Image を SVG で動的に作るライブラリ
  - HTML + CSS を Satori というエンジンで SVG に変換している
  - Satori はさらに Yoga というレイアウトエンジンの WASM ビルドを使っている
  - Next.js Conf のチケットとかがそれを使っている
- **Fastly で Next.js アプリケーションを実行 | Fastly**
  - https://www.fastly.com/jp/blog/run-your-next-js-app-on-fastly
- **vanilla-extract が vanilla-extract-css として SEEK 社から org として独立**
  - https://github.com/vanilla-extract-css
  - https://twitter.com/mattcompiles/status/1575729572783394816?s=20&t=Sk7MUukc5Fhu6GBiIMiEMg
    - メインメンテナーの人が SEEK 社を退職したからぽい
    - https://twitter.com/mattcompiles/status/1577440099939164160?s=20&t=Sk7MUukc5Fhu6GBiIMiEMg
      - アトラシアンでも引き続き vanilla-extract をやってるぽい
- **V8 の人が meta に転職して React Core Team に入ったらしい**
  - https://twitter.com/_gsathya/status/1578816177371250688?s=20&t=2zEEpVl0jaChMvXpBnYqbw
  - ツイート内容的にコンパイル周りとか色々するっぽい?
- **Release v1.0.0 · axios/axios**
  - https://github.com/axios/axios/releases/tag/v1.0.0
- **lost-pixel/lost-pixel: Holistic visual testing for your Frontend 🖼 First class integration with Storybook, Ladle & other frontend libraries.**
  - https://github.com/lost-pixel/lost-pixel
  - Storybook / Ladle の上で VRT を実現するツール
- **First-class Vite support in Storybook**
  - https://storybook.js.org/blog/first-class-vite-support-in-storybook/
- RFC: File System-Based Native Routing with Expo and React Native | by Evan Bacon | Sep, 2022 | Exposition
  - https://blog.expo.dev/rfc-file-system-based-routing-in-react-native-7a35474722a
- Announcing TypeScript 4.9 Beta - TypeScript
  - https://devblogs.microsoft.com/typescript/announcing-typescript-4-9-beta/
- Ten Years of TypeScript - TypeScript
  - https://devblogs.microsoft.com/typescript/ten-years-of-typescript/
- Volar 1.0 "Nika" Released! | The Vue Point
  - https://blog.vuejs.org/posts/volar-1.0.html
- Gatsby v5 Alpha is Here (and it's Pretty Exciting!) | Gatsby
  - https://www.gatsbyjs.com/blog/gatsby-v5-alpha-is-here-and-its-pretty-exciting/
  - Gatsby にも Partial Hydration ができるようになるらしい
- appwrite/appwrite: Secure Backend Server for Web, Mobile & Flutter Developers 🚀 AKA the 100% open-source Firebase alternative.
  - https://github.com/appwrite/appwrite
  - Firebase の代替、セキュアな BaaS
  - Firebase っぽいことがだいたいできそう
- whyframe
  - https://whyframe.dev/
  - iframe でいいかんじにコンポーネントレンダリングしてくれる
  - ドキュメントサイトとかでコンポーネントだけレンダリングしたいとかに使用するもの向け
- D1: our quest to simplify databases
  - https://blog.cloudflare.com/whats-new-with-d1/
- Introducing workerd: the Open Source Workers runtime
  - https://blog.cloudflare.com/workerd-open-source-workers-runtime/
- R2 is now Generally Available
  - https://blog.cloudflare.com/r2-ga/
