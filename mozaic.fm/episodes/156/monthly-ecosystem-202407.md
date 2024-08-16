---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep156.mp3
published_at: 2024-07-18
guest: [@koba04](https://twitter.com/koba04)
guest: [@hiroppy](https://twitter.com/about_hiroppy)
---

# ep156 Monthly Ecosystem 202407

## Theme

第 156 回のテーマは 2024 年 7 月の Monthly Ecosystem です。

## Show Note

- [React 19] Disabling prerendering siblings of suspended components breaking common pattern
  - https://github.com/facebook/react/issues/29898
  - 今までは Suspense 内の複数の非同期コンポーネントで並列に処理していたが、v19 では直列に変更するようにした。これにより、ウォーターフォールの状態となるためレンダリングが長くなってしまう
    - メリット: Suspense のフォールバックを早く表示でき、コンポーネントにおける無駄なレンダリングを避けることができる
  - Render-as-You-Fetch パターン以外では影響があるため、strategy みたいなオプションを追加し、レンダリングを直列/並列に切り替えれるようにできるかの議論中
  - https://tkdodo.eu/blog/react-19-and-suspense-a-drama-in-3-acts
- Next.js のキャッシュの今後
  - https://x.com/leeerob/status/1803824227704877236
  - v15 以降のキャッシュはほとんどデフォルトでオフになる
  - PPR は今後デフォルトになる
  - fetch などを使うのは全て dynamic rendering にオプトインにする
    - これまでは headers などだけだった
- node: module: add --experimental-strip-types
  - https://github.com/nodejs/node/pull/53725
  - typescript のコードを node 上で実行する取り組み
  - 型検査は行わず、あくまでもトランスパイルと実行のみ
- node: lib,src,test,doc: add node:sqlite module
  - https://github.com/nodejs/node/pull/53752
  - node 上で sqlite を利用できるようにする
  - もともと Web Storage API の実現で sqlite を使っていて node:sqlite を新しくネイティブモジュールとして追加
- What's coming next for ESLint
  - https://eslint.org/blog/2024/07/whats-coming-next-for-eslint/
  - JS 以外の言語も対応する
    - @eslint/js, @eslint/json, @eslint/markdown を最初に公式が提供
  - 11 年経ち、負債が多いのでリポジトリを変えて書き直し
    - ​​https://github.com/eslint/rewrite
- Announcing Rspack v1.0 Alpha
  - https://www.rspack.dev/blog/announcing-1-0-alpha
  - concatenateModules(scope hoisting)がデフォルトで有効
  - Lightning CSS がビルトイン
  - css が webpack に合わせるためにデフォルトから実験的へ移動
- e18e
  - https://e18e.dev/
  - 依存から JS のエコシステムで古いものやパフォーマンスの最適化を行うプロジェクト
- Astro: Netlify: Our Official Deployment Partner
  - https://astro.build/blog/netlify-official-deployment-partner/
- Astro: 4.11
  - https://astro.build/blog/astro-4110/
  - 500.astro ファイルで error が受け取れるようになった
  - Code コンポーネントに Shiki の transformer を渡せるようになった
- Announcing TypeScript 5.5
  - https://devblogs.microsoft.com/typescript/announcing-typescript-5-5/
- Fog of War
  - https://remix.run/blog/fog-of-war
  - Remix の Route Manifests に対する最適化。Shopify のような大規模サイトででも Remix が使えるようにするための改善
  - React Router では unstable_patchRoutesOnMiss として expose されている
- Nuxt 2 End-of-Life (EOL)
  - https://nuxt.com/blog/nuxt2-eol
- vitest2.0
  - https://github.com/vitest-dev/vitest/releases/tag/v2.0.0
  - Browser Mode
    - https://vitest.dev/guide/browser/
- Bun v1.1.18, v1.1.19
  - https://bun.sh/blog/bun-v1.1.18
  - https://bun.sh/blog/bun-v1.1.19
  - Constant Folding によるパフォーマンスの最適化
  - This release enables WebKit's FTL JIT (Faster Than Light Just In Time Compiler) on Windows
- Deno 1.4.5
  - https://deno.com/blog/v1.45
- Figma AI
  - https://www.figma.com/ja-jp/ai/
- pnpm 9.5.0
  - https://github.com/pnpm/pnpm/releases/tag/v9.5.0
  - catalog:機能が追加され、ライブラリのグルーピングが行えるようになった
    - https://pnpm.io/catalogs
    - monorepo で同じライブラリのバージョンがいろいろな package.json に書かれるが、それを一箇所にまとめることによりコンフリクトやアップグレードを容易にする
- Polyfill supply chain attack hits 100K+ sites
  - https://sansec.io/research/polyfill-supply-chain-attack
- Persistent npm Campaign Shipping Trojanized jQuery
  - https://blog.phylum.io/persistent-npm-campaign-shipping-trojanized-jquery/
  - 悪意のあるコードを含んだ jQuery を同梱したライブラリが配られていた
  - jQuery 公式がポイゾニングされていたわけではない
- es-toolkit
  - https://github.com/toss/es-toolkit
  - 堅牢な型があり、パフォーマンスの最適化を行っている utility ライブラリ
- State of JavaScript 2023
  - https://2023.stateofjs.com/en-US/

## Events

- 8 月
  - 24: フロントエンドカンファレンス北海道 2024
    - https://note.com/fec_hokkaido/n/nbb62b53069a5
- 9 月
  - 7: Web Developer Conference
    - https://web-study.connpass.com/event/321711/
  - 10-12: GraphQL Conf
    - https://graphql.org/blog/2024-03-28-announcing-graphqlconf-2024/
- 10 月
  - 3: ViteConf
    - https://viteconf.org/?2024
  - 19: Vue Fes Japan 2024
    - https://vuefes.jp/2024/
- 11 月
  - 23: JSConfJP
    - https://jsconf.jp/2024/
  - 19-22: React Summit in NY
    - https://reactsummit.us/
