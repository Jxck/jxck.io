---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep124.mp3
published_at: 2023-06-18
guest: [@sakito](https://twitter.com/__sakito__)
guest: [@hiroppy](https://twitter.com/about_hiroppy)
---

# ep124 Monthly Ecosystem 202306

## Theme

第 124 回のテーマは 2023 年 6 月の Monthly Ecosystem です。

## Show Note

- Turborepo 1.10 - Turbo
  - https://turbo.build/blog/turbo-1-10-0
  - 実験段階だが、 scafolding ができるようになる(copy, add, append, etc)
  - .env のよみとりができるようになった
  - 環境変数名でワイルドカードが使えるようになった
  - https://www.hygen.io/
- Fresh 1.2 - welcoming a full-time maintainer, sharing state between islands, limited npm support, and more
  - https://deno.com/blog/fresh-1.2
  - Preact のメンテナ Marvin が Deno に入り、 Fresh のフルタイムコミッターになる
- RSC From Scratch. Part 1: Server Components · reactwg/server-components · Discussion #5
  - https://github.com/reactwg/server-components/discussions/5
  - Dan による RSC の deep dive
- add react-server-dom-vite impl and fixture by nksaraf · Pull Request #26926 · facebook/react
  - https://github.com/facebook/react/pull/26926
  - RSC を Vite でも動かせるようにする PR
- Remix + RSC PoC が進んでるらしい
  - https://twitter.com/ryanflorence/status/1663587026384584704
- RedwoodJS' Next Epoch: All In on React Server Components
  - https://tom.preston-werner.com/2023/05/30/redwoods-next-epoch-all-in-on-rsc.html
  - RedwoodJS も RSC 対応するらしい
  - dai-shi/waku: Minimalistic React Framework
    - https://github.com/dai-shi/waku#wakus-minimal-spec-for-react-server-components
- Announcing TypeScript 5.1 - TypeScript
  - https://devblogs.microsoft.com/typescript/announcing-typescript-5-1/
  - Easier Implicit Returns for undefined-Returning Functions
  - Unrelated Types for Getters and Setters
  - Decoupled Type-Checking Between JSX Elements and JSX Tag Types
  - Namespaced JSX Attributes
  - typeRoots Are Consulted In Module Resolution
  - Linked Cursors for JSX Tags
  - Snippet Completions for @param JSDoc Tags
  - Optimizations
  - Breaking Changes
- Stack Overflow Developer Survey 2023
  - https://survey.stackoverflow.co/2023/
  - Stack Overflow の開発者アンケート
- Deno 1.34: deno compile supports npm packages
  - https://deno.com/blog/v1.34
- The Bun Bundler | Bun Blog
  - https://bun.sh/blog/bun-bundler
  - Bun に bundler 実装
- Boshen/oxc: The JavaScript Oxidation Compiler
  - https://github.com/Boshen/oxc
- Bun v0.6.8 | Bun Blog
  - https://bun.sh/blog/bun-v0.6.8
  - password
  - test の mock, spyOn, toMatchObject 追加。結構 jest 意識してそう
  - https://github.com/oven-sh/bun/issues/159
- Announcing Lit 3.0 Pre-releases - Lit
  - https://lit.dev/blog/2023-05-15-lit-3.0-prerelease/
  - IE11 is no longer supported.
  - Lit's npm modules are now published as ES2021.
    - https://github.com/lit/lit/pull/3775
  - APIs deprecated during the Lit 1.x release timeframe have been removed.
  - SSR hydration support modules were moved to the @lit-labs/ssr-client package.
- evanw/polywasm
  - https://github.com/evanw/polywasm
  - wasm が実装されていない環境で wasm ファイルを動かす polyfill
  - 各 WebAssembly 関数を js に変換する
- Astro 2.6: Middleware | Astro
  - https://astro.build/blog/astro-260/
  - 安定化
    - hybrid ssr
    - middleware
    - Custom client directives
    - CSS inlining
  - 実験的
    - Redirects
- Starlight
  - https://starlight.astro.build/
  - Astro でドキュメントサイト作るテンプレ
- Parcel v2.9.0
  - https://parceljs.org/blog/v2-9-0/
  - SWC minifier 使うらしい
- On this day 14 years ago: Node.js was created!
  - https://twitter.com/nodejs/status/1662511486512640000
  - Node 14 年目、祝って
- Celebrating 10 Years of React
  - https://vercel.com/blog/10-years-of-react
  - React 10 周年
- Release Version 7.44.0 · react-hook-form/react-hook-form
  - https://github.com/react-hook-form/react-hook-form/releases/tag/v7.44.0
  - Form コンポーネントの追加
    - コンポーネントから post や status code の検証も可能
- State of Node.js Performance 2023
  - https://blog.rafaelgss.dev/state-of-nodejs-performance-2023
- Thinking in React Query | TkDodo's blog
  - https://tkdodo.eu/blog/thinking-in-react-query
  - 先日あった React Summit での React Query の概要資料
- Announcing Rspack 0.2
  - https://www.rspack.dev/blog/announcing-0.2.html
  - loader や Storybook 対応など
- Release 7.0.0 · lerna/lerna
  - https://github.com/lerna/lerna/releases/tag/7.0.0
- Tailwind の Rust 化
  - https://github.com/tailwindlabs/tailwindcss/pull/11394
- Introducing the Vercel AI SDK - Vercel
  - https://vercel.com/blog/introducing-the-vercel-ai-sdk
  - vercel の AI インターフェース
- Electron 25.0.0 | Electron
  - https://www.electronjs.org/blog/electron-25-0
  - net.fetch
    - API のインターフェースは Node の fetch と同様
    - Chromium が内部で URL ロードの様々な異なるモード(navigation, subresouce, worker)を区別している
    - electron ではそれらを気にすることが多く、コードが散らばってしまい一元化したいのでこのモジュールを追加

## Events

- 6/1: The French React Native Conference
  - https://reactnativeconnection.io/
- 6/20: tailwind connect
  - https://connect.tailwindcss.com/
- 6/21-22: Figma Config
  - https://config.figma.com/
- 9/26 ~ 29 : RedwoodJS Conference
  - https://www.redwoodjsconf.com/
- 11/19: JSConf JP
  - https://jsconf.jp/2023/
