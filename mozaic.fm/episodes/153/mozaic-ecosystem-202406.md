---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep153.mp3
published_at: 2024-06-11
guest: [@sakito](https://twitter.com/__sakito__)
guest: [@yoshiko](https://twitter.com/yoshiko_pg)
---

# ep153 Monthly Ecosystem 202406

## Theme

第 153 回のテーマは 2024 年 6 月の Monthly Ecosystem です。

(冒頭で間違えて 5 月って言ってた。)

## Show Note

- React Conf 2024 Recap
  - https://ja.react.dev/blog/2024/05/22/react-conf-2024-recap
  - React 19
    - https://ja.react.dev/blog/2024/04/25/react-19
  - React Compiler
    - https://ja.react.dev/learn/react-compiler
    - eslint plugin https://www.npmjs.com/package/eslint-plugin-react-compiler
  - Remix と React Router
    - https://remix.run/blog/incremental-path-to-react-19
    - RSC を含んだ新しい設計は Reverb という名前らしい
  - React Native New Architecture
    - https://github.com/reactwg/react-native-new-architecture/discussions/189
    - Expo もこれに合わせて対応の話
- React DOM: Add support for Popover API by eps1lon · Pull Request #27981 · facebook/react
  - https://github.com/facebook/react/pull/27981
  - React の Popover API サポート
  - v19 のリリースか RC を使うか
- Next.js 15 RC
  - https://nextjs.org/blog/next-15-rc
  - React 19 RC
  - React Compiler
  - fetch リクエスト、GET のルートハンドラー、Page コンポーネントの Client Router のキャッシュはデフォルトで無効化
  - Partial Prerendering (PPR) (Experimental)
  - next/after (Experimental)
  - Next 15 GA で何かアナウンスがある?
- Vercel Ship 2024 recap
  - https://vercel.com/blog/vercel-ship-2024
  - Improved platform and Next.js integrations for feature flags
  - Log, block, and challenge malicious traffic with the Vercel Firewall
  - New tools to improve iteration velocity in the Vercel Toolbar
  - React 19 support, improved caching, and more in the Next.js 15 Release Candidate
  - Further updates and improvements to v0 and the Vercel AI SDK
- Announcing TypeScript 5.5 RC
  - https://devblogs.microsoft.com/typescript/announcing-typescript-5-5-rc/
  - beta との主な差分
    - Support for New ECMAScript Set Methods
      - TC39 の Stage 3 にある Set の新メソッドのサポート
  - beta 発表時に取り上げてた内容
    - `Array.prototype.filter`で絞り込みに型がつくようになった
    - `typeof obj[key] === "string"` みたいな固定できるパターンの条件が落ちなくなった
    - 正規表現の構文チェックが行えるようになった
    - isolatedDeclarations オプションの追加で、並列ビルドの高速化を行う
- Storybook 8.1
  - https://storybook.js.org/blog/storybook-8-1/
  - Interactive story generation
    - https://storybook.js.org/blog/interactive-story-generation/
    - Storybook の UI 上から Story 追加できるように
  - Type-safe module mocking in Storybook
    - https://storybook.js.org/blog/type-safe-module-mocking/
    - Storybook で Subpath Imports を使った Mock を使うアプローチ
    - Unit testing React Server Components
    - Playwright Component Test で Story をテスト可能に
      - https://storybook.js.org/blog/portable-stories-for-playwright-ct/
- Turborepo 2.0
  - https://turbo.build/blog/turbo-2-0
  - New terminal UI
  - Watch Mode
  - All-new documentation
  - Licensing and maintenance updates
- Biome v1.8
  - https://github.com/biomejs/biome/releases/tag/cli%2Fv1.8.0
  - https://biomejs.dev/ja/internals/language-support/
  - css の lint, format 周りのオプション追加
- An even faster Microsoft Edge
  - https://blogs.windows.com/msedgedev/2024/05/28/an-even-faster-microsoft-edge/
  - Edge が React の使用をやめて新しい構成である WebUI 2.0 にした話。
- Astro 4.9
  - https://astro.build/blog/astro-490/
- Ark UI v3
  - https://ark-ui.com/react/docs/overview/changelog#300---2024-05-24
- React Query の v19 サポート
  - https://github.com/TanStack/query/releases/tag/v5.39.0
  - https://x.com/tannerlinsley/status/1796081137007341851
    - https://x.com/tannerlinsley/status/1796081138672468302
- Vitest 2.0 でブラウザモードに機能追加
  - https://github.com/vitest-dev/vitest/discussions/5828
- ReScript
  - https://rescript-lang.org/
  - OCaml ベースの Alt JS
- feat: Add support for TypeScript config files by aryaemami59 · Pull Request #117 · eslint/rfcs
  - https://github.com/eslint/rfcs/pull/117
  - ESLint config を TS で書けるようにする
- デジタル庁デザインシステムのサンプルコンポーネント
  - https://design.digital.go.jp/
  - https://github.com/digital-go-jp/design-system-example-components
- The Deno Standard Library is now available on JSR
  - https://deno.com/blog/std-on-jsr
  - Deno の標準ライブラリを JSR に
  - deno.land/std はセキュリティパッチのみに
  - パッケージごとにバージョニングしていく
  - Deno の workspace を使うように
- The stabilization process of the Standard Library has begun
  - https://deno.com/blog/stabilize-std
  - Deno std が v1.0 にしていく
  - パッケージごとにリリースタイミングは違う

## Events

- 6 月
  - 14-18: React Summit in Amsterdam
    - https://reactsummit.com/
  - _26-27: Figma Config_
    - https://config.figma.com/
- 8 月
  - 24: フロントエンドカンファレンス北海道 2024
    - https://note.com/fec_hokkaido/n/nbb62b53069a5
- 9 月
  - 10-12: GraphQL Conf
    - https://graphql.org/blog/2024-03-28-announcing-graphqlconf-2024/
- 11 月
  - 19-22: React Summit in NY
    - https://reactsummit.us/
