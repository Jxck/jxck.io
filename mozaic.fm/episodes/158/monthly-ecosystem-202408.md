---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep158.mp3
published_at: 2024-08-15
guest: [@sakito](https://twitter.com/__sakito__)
guest: [@hiroppy](https://twitter.com/about_hiroppy)
---

# ep158 Monthly Ecosystem 202408

## Theme

第 158 回のテーマは 2024 年 8 月の Monthly Ecosystem です。

## Show Note

- Figma Config 2024
  - サマリ
    - https://www.figma.com/blog/config-2024-recap/
    - Figma AI: Think bigger and build faster
    - UI3: Figma, redesigned
    - Figma Slides: Build, collaborate, and present
    - Dev Mode updates: From design ready to dev complete
    - Quality-of-life improvements: Auto Layout, UI Kits, and prototype viewer
  - セッション一覧
    - https://www.youtube.com/playlist?list=PLXDU_eVOJTx402DljIPagaDKLibF-qfF0
- Node v22.5.0 (Current)
  - https://nodejs.org/en/blog/release/v22.5.0
  - node:http に websocket(undici 経由)を追加
  - node:sqlite を追加
  - node:path に正規表現が入力に一致するかを検証する `matchesGlob` を追加
  - process.finalization の追加
    - Node プロセスが終了するときに登録したオブジェクトを適切に破棄し、メモリリークを防ぐことができる
  - node:worker_thread に `postMessageToThread` を追加
- Node v22.6.0 (Current)
  - https://nodejs.org/en/blog/release/v22.6.0
  - strip types の追加(experimental)
  - ネットワーク インスペクションの追加
    - chrome 側の対応待ち
    - https://issues.chromium.org/issues/353924015
- module: add `--experimental-transform-types` flag
  - https://github.com/nodejs/node/pull/54283
  - 以前は対応してなかった TypeScript の独自構文である Enum や Namespace に対応
- bun
  - v1.1.23
    - https://bun.sh/blog/bun-v1.1.23
    - `TextEncoderStream`、`TextDecoderStream` の追加
    - `console.log` が 50%速くなった
  - v1.1.22
    - https://bun.sh/blog/bun-v1.1.22
    - Express が 3 倍速くなった
    - `util.aborted()` の追加
    - `events.getEventListeners()` の追加
  - v1.1.21
    - https://bun.sh/blog/bun-v1.1.21
    - `--fetch-preconnect` の追加
- Announcing TypeScript 5.6 Beta
  - https://devblogs.microsoft.com/typescript/announcing-typescript-5-6-beta/
  - 構文的には動くが、実際は動かない真偽/null のコードを警告できるように
    - eslint の `no-constant-binary-expression` ルールと同様
  - map や filter などのイテレータヘルパーメソッドを追加
    - tc39/iterator-helpers
    - https://github.com/tc39/proposal-iterator-helpers
  - `--noUncheckedSideEffectImports​`
    - side effect import されたソースがない場合に TS は無視するが、無視せずに存在を検証するオプション
  - `--noCheck​`
    - すべての型チェックをスキップする
    - これにより JS ファイルの生成と型チェックを分離することができる
- Node Sass is end-of-life
  - https://sass-lang.com/blog/node-sass-is-end-of-life/
- Astro 4.12: Server Islands
  - https://astro.build/blog/astro-4120/
  - Server Islands の実験サポート
    - 動的な部分は Next.js の Partial Pre Rendering と似た機能
    - https://server-islands.com/
  - Image へ `inferRemoteSize` の追加
    - リモート画像の大きさを自動推測
- Astro 4.13
  - https://astro.build/blog/astro-4130/
  - リクエストのリライト機能が安定へ
  - content collection で JSON Schema の自動作成が安定へ
- state of react
  - https://2023.stateofreact.com/en-US/
- mui: Migrating to v6
  - https://next.mui.com/material-ui/migration/migrating-to-v6/
- Tokens Studio 2.0
  - https://feedback.tokens.studio/changelog/release-20
  - W3C DTCG format
  - A new variables experience
  - Non-local variable references
  - Variables in typography styles, shadows, border tokens and gradients
  - Typography tokens
  - Bitbucket support
  - Tokens Studio (platform) support
- Style Dictionary
  - https://github.com/amzn/style-dictionary/releases/tag/v4.0.0
  - ずっと止まっていたアップデートがやっと出た
- Revolutionising Design Systems: The Future of UI Design using Graphs & Node-based Design
  - https://tokens.studio/blog/revolutionising-design-systems-the-future-of-ui-design-using-graphs-node-based-design
  - Token の依存グラフを視覚的に作成することができるツール
- Software Sharing for Modern Companies | Fair.io
  - https://fair.io/
  - オープンソースとは違う新しい取り組み「Fair Source」登場。ビジネスの持続性とソースコード公開の両立を目指す
    - https://www.publickey1.jp/blog/24/fair_source.html
  - ビジネスを守るための最小限の制約をもつが、利用や再配布が可能で一定期間後オープンになる
  - Sentry の提唱で、コードの公開とソフトウェアビジネスの両立のためのもの
- ESLint v9.9.0 released
  - https://eslint.org/blog/2024/08/eslint-v9.9.0-released/
  - 実験的に設定ファイルの TS サポート
- Announcing typescript-eslint v8
  - https://typescript-eslint.io/blog/announcing-typescript-eslint-v8/
  - eslint v9 のサポート
  - いくつかのルールが変更される
- NLnet; Servo improvements for Tauri
  - https://nlnet.nl/project/Verso/
  - Rust 製ブラウザエンジン「Servo」搭載、新たな Web ブラウザ「Verso」の開発プロジェクトが立ち上がる
    - https://www.publickey1.jp/blog/24/rustservowebverso.html
- What we got wrong about HTTP imports
  - https://deno.com/blog/http-imports
- Apollo Client 3.11
  - Subscription API の改善
  - React 19 サポート
  - テストライブラリの変更。MSW を利用した graphql-testing-library へ
  - Devtools オプションの追加
    - 今まで 1 つしか対応できてなかった
    - このオプションで複数の apollo client インスタンスに対応
  - nextFetchPolicy の呼び出しタイミング変更
- HonoHub
  - https://honohub.dev/
  - Hono ライクな OSS の Headless CMS ぽい?
- Frontend AI
  - 生成 AI のツール
  - UI を生成したりコードも出してくれるぽい
- Lottielab Interactivity
  - Lottielab で作ってたエディターがアップデートして正式アプデぽい
- Postgres Sandbox
  - https://postgres.new/

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
- 11 月
  - 23: JSConfJP
    - https://jsconf.jp/2024/
  - 19-22: React Summit in NY
    - https://reactsummit.us/
