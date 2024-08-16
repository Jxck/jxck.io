---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep118.mp3
published_at: 2023-04-15
guest: [@sakito](https://twitter.com/__sakito__)
guest: [@yoshiko](https://twitter.com/yoshiko_pg)
---

# ep118 Monthly Ecosystem 202304

## Theme

第 118 回のテーマは 2023 年 4 月の Monthly Ecosystem です。

## Show Note

- Next.js
  - https://nextjs.org/blog/next-13-3
  - 13.3 リリース
  - App Directory
    - Metadata API
    - Static Export Support
      - https://beta.nextjs.org/docs/configuring/static-export
      - Server Components は next build 時にデータ取得
    - Parallel Routes
    - Intercepting Routes
  - @vercel/og の ImageResponse が next/server に入った
- Add Zod and router state validation by shuding · Pull Request #46962 · vercel/next.js
  - https://github.com/vercel/next.js/pull/46962
  - `typedRoutes`を提供し、 Next に Zod を入れてやってるぽい
- RFC: `next/third-parties` - vercel/next.js - Discussion #48256
  - https://github.com/vercel/next.js/discussions/48256
  - Nextjs でよく使われる
  - 3rd party script のラッパーライブラリーの RFC
- Remix without Limits - Vercel
  - https://vercel.com/blog/vercel-remix-integration-with-edge-functions-support
  - Vercel が Remix 向けにテンプレートとパッケージを発表
- React Labs: What We've Been Working On - March 2023 - React
  - https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023
  - React Labs の研究報告
  - RSC が入ったが、これを最大限生かすには bundler の integration が必須
    - 今の Bundler は Client に特化してる
    - 単一のモジュールグラフを Server/Client で分割できるものがない
    - なので、 Bundler 開発者と組んでやっていく
  - Asset Loading
    - CSS, Font, Img を Suspence と統合していく
  - Document Metadata
    - `<title>`, `<meta>`, `<link>` を任意の場所で書いて勝手に `<head>` に入るようにする
    - Next,js 13.2 に入ったやつ
      - https://nextjs.org/blog/next-13-2#built-in-seo-support-with-new-metadata-api
  - React Optimizing Compiler
    - React Forget = "auto-memoizing Compiler" or "automatic reactivity compiler"
    - React が過剰に再レンダリングしないようにメモ化を取り入れる目的
    - が、オブジェクトの一意性の比較ではなく意味的な比較で更新する
    - Meta で実験中、もうコアは Babel から剥がされている。
    - React Conf 2021 の続報的なもの
      - https://www.youtube.com/watch?v=lGEMwh32soc
  - Offscreen Rendering
    - content-visibliity の React 版
    - ルータがバックグラウンドで prerendering したりできる
    - Meta 内部で実験中で、良い結果がでてる。今年後半には RFC 出す
  - Transition Trace
    - React Transitions が遅くなったことを検知できる
    - 実装済みだがプロジェクトが休止中
- React の公式ドキュメントサイトリニューアルについての Dan 氏の解説
  - https://twitter.com/dan_abramov/status/1638004334544707584
  - ドキュメントの最初の方には hooks が登場しなくて、 Server Components でも動くような説明を意識してる
  - memo 系の関数は使用されてなくて、多くのコードで問題なく、 React labs でやってるコンパイラ周りで解決されることを確信している(使うことが非推奨とかではない)
  - Effects 周りと Refs はあまり使用しない方向でドキュメントの最後の Escape Hatches のコンテンツへ(使うことが非推奨とかではない)
  - なんで最初から Effects 周りはそうなってなかったかというと、まぁすぐにベストプラクティスができるわけでもないからさ〜ってやつ
- Storybook v7
  - https://storybook.js.org/blog/storybook-7-0/
  - https://github.com/storybookjs/storybook/blob/v7.0.0/CHANGELOG.md
    - First-class Vite support
    - Zero-config support for NextJS & SvelteKit powered by the new Frameworks API
    - Component Story Format 3 with improved type safety
    - Docs overhaul: MDX2 support & streamlined doc blocks
    - UI design refresh
    - Improved interaction testing & test coverage
    - Enhanced stability via pre-bundling and Ecosystem CI
    - Hundreds more improvements at every level
- Chakra UI
  - https://www.adebayosegun.com/blog/the-future-of-chakra-ui
  - 脱 Runtime CSS-in-JS
  - 以下三つに分割されるっぽい
    - Zag (ステートマシンベースの UI 実装)
      - https://zagjs.com/
    - Ark (zagjs を使ったヘッドレスコンポーネントライブラリ)
      - https://ark-ui.com/
    - Panda (zero-runtime CSS in JS)
  - Ultra というデザイントークンのための SaaS Platform を開発中
- Client-side Routing - Issue #532 - withastro/roadmap
  - https://github.com/withastro/roadmap/issues/532
  - Astro の SPA の Client-side Routing に関する提案が出てる
- Sass: Sass and Native Nesting
  - https://sass-lang.com/blog/sass-and-native-nesting
  - Sass と CSS Nestting に関する違いと、今後のプラン
  - CSS だと `:is()` を使用するが、 Sass は使用しないので、適用されるパターンに違いがある
  - `:is()` のシェアが 98%を超えたら、 Sass も `:is()` を使用するプラン
- layer - vanilla-extract
  - https://vanilla-extract.style/documentation/api/layer/#layer
  - vanilla-extract のレイヤーサポート
- Announcing Rome v12
  - https://rome.tools/blog/2023/03/28/rome12/
  - JSON サポート
  - TS v5 サポート
- GitHub Actions - Visual Studio Marketplace
  - https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-github-actions
  - VS CodeGitHub Actions の実行や記法の静的構文エラー解析してくれる
- Copilot
  - https://github.com/features/preview/copilot-x
  - https://githubnext.com/projects/copilot-for-pull-requests
- Vercel
  - https://twitter.com/vercel/status/1643270051049660417
  - 謎告知

## Events

- Remix Conf 2023
  - https://remix.run/conf/2023
  - 9 月予定
- Figma Config
  - https://config.figma.com/
  - 6 月予定
