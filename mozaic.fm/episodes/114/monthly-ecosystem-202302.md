---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep114.mp3
published_at: 2023-02-11
guest: [@sakito](https://twitter.com/__sakito__)
guest: [@hiroppy](https://twitter.com/about_hiroppy)
---

# ep114 Monthly Ecosystem 202302

## Theme

第 114 回のテーマは 2023 年 2 月の Monthly Ecosystem です。

## Show Note

- **Rome からもう一人やめる**
  - https://twitter.com/MichaReiser/status/1613474278808162304
- **Blazor United prototype - YouTube**
  - https://www.youtube.com/watch?v=48G_CEGXZZM
  - C#/.NET で作る Web 開発プラットフォーム Blazor の紹介
  - SSR と CSR を切り替えられるフレームワークが Blazor United
- **The Future (and the Past) of the Web is Server Side Rendering**
  - https://deno.com/blog/the-future-and-past-is-server-side-rendering
  - SSR + Hydration だと重いので SSR してこうという話
  - そこで Isomorphic な JS が活きてくる
  - これが Deno + Fresh で実現できるという話
- Electron ライクな新フレームワーク「Gluon」登場。 Chromium 内蔵せず Web ブラウザを利用、 Node.js だけでなく Deno と Bun にも対応 - Publickey
  - https://www.publickey1.jp/blog/23/electrongluonchromiumwebnodejsdenobun.html
- **RFC: React DOM for Native**
  - https://github.com/necolas/discussions-and-proposals/blob/reduce-fragmentation/proposals/0000-reduce-fragmentation.md
  - React Native の API を可能な限り Web API に近づけようという RFC
  - ブラウザ上でのオーバーヘッドを考えた機能的な部分と開発者がクロスプラットフォームで開発するために学ぶことが減るという DX の両面があるよう
- **React 周辺動向**
  - React Core Team から Vercel へ
    - https://twitter.com/acdlite/status/1623353741750546439
  - Replace Create React App recommendation with Vite
    - https://github.com/reactjs/reactjs.org/pull/5487#issuecomment-140972074
    - Create React App をモダンな構成に変えようという起点の PR
    - そこに React Core Team の Dan 氏から CRA の歴史的経緯、いまの React の思想、フレームワークとの関係の説明があった
    - 先日ツイッター上でも似たような話が React Core Team からあったところ
      - https://twitter.com/acdlite/status/1617611126514266112
- **Next.js 周辺動向**
  - SEO サポートが入るらしい
    - https://twitter.com/leeerob/status/1619743437577912321
  - Next Router に型が入るらしい
    - https://twitter.com/shuding_/status/1620137501192253440
  - Turbopack で webpack loader の読み込みができるようになるらしい
    - https://twitter.com/jaredpalmer/status/1619071988181651456
- **Bun v0.5 | Bun Blog**
  - https://bun.sh/blog/bun-v0.5.0
  - Bun が WebSocket 標準から外れた API をいれたり
  - JSX 拡張して TS にも入れてって言ってたり
    - https://github.com/microsoft/TypeScript/issues/52057
      - JSX の WG の提案について
        - https://github.com/facebook/jsx/issues/119
  - WinterCG メンバーでありながらなんか色々やってる
- TypeScript 5.0 Iteration Plan · Issue #51362 · microsoft/TypeScript
  - https://github.com/microsoft/TypeScript/issues/51362
- styled-components: Releases
  - https://styled-components.com/releases
- Release v29.4.0 · facebook/jest
  - https://github.com/facebook/jest/releases/tag/v29.4.0
- **Storybook Component Story Format 3 is here**
  - https://storybook.js.org/blog/storybook-csf3-is-here/
  - CSF 3 はいまでも使えるけど、 Storybook 7 で正式に入るにあたって色々と追加要素の説明がある
- **Improved type safety in Storybook 7**
  - https://storybook.js.org/blog/improved-type-safety-in-storybook-7/
  - Storybook の story ファイルに型をつける説明
  - satisfies を使った事例がある
- **Gatsby**
  - https://www.gatsbyjs.com/blog/gatsby-is-joining-netlify/
  - gatsby が netlify に買収された
  - build system 、さまざまなコンテンツ ソースからの Webhook 、 deploy 、 edge runtime などを結び付ける composable architectures と呼ばれる Web UI レイヤーを構築していく
  - https://thenewstack.io/netlify-acquires-gatsby-its-struggling-jamstack-competitor/
- **Astro**
  - https://astro.build/blog/astro-2/
  - content collections
  - hybrid rendering
- **Node**
  - https://nodejs.org/en/blog/release/v19.6.0/
  - loader chain
  - npm isolated mode が追加されたバージョンが内包
    - https://github.com/npm/rfcs/blob/main/accepted/0042-isolated-mode.md
- MSW v1
  - https://github.com/mswjs/msw/releases/tag/v1.0.0
- deno@1.30
  - https://deno.com/blog/v1.30
- elysiajs/elysia: Fast, and friendly Bun web framework
  - https://github.com/elysiajs/elysia
- **DanielXMoore/Civet: The modern way to write TypeScript**
  - https://github.com/DanielXMoore/Civet
  - CoffeeScript の TS 版みたいなもの
  - 今年どうなるか注目

## Events

- Vercel Meetup #0 with CEO
  - https://vercel.connpass.com/event/274772/
