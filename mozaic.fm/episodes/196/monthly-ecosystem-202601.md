---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep196.mp3
published_at: 2026-01-20
guest: [@sakito](https://x.com/__sakito__)
guest: [@re-taro](https://x.com/re_taro_)
guest: [@syumai](https://x.com/__syumai)
---

# ep196 Monthly Ecosystem 202601

## Theme

第 196 回のテーマは 2025 年 12 月と 2026 年 1 月の Monthly Ecosystem です。


## Show Note

- 2025 JavaScript Rising Stars
  - https://risingstars.js.org/2025/en
  - GitHub スターをベースにしたフロントエンド系のライブラリのランキング
- Vite 8 Beta リリース
  - https://voidzero.dev/posts/announcing-vite-8-beta
  - bundler が Rolldown に変更され、これまでの esbuild + Rollup の組み合わせを置き換える
- Oxfmt: Oxc Formatter Alpha リリース
  - https://oxc.rs/blog/2025-12-01-oxfmt-alpha.html
  - キャッシュなしの初回実行時、Prettier と比較して 30 倍以上、Biome と比較して 3 倍以上高速
- Oxlint: Type-Aware Linting Alpha リリース
  - https://oxc.rs/blog/2025-12-08-type-aware-alpha
  - 8 月の technical preview に続くリリース
  - oxlint と一緒に oxlint-tsgolint をインストールしたら、`oxlint --type-aware` で使える
  - `--type-check` flag で Type Check の実行もまとめられる
- Oxc 周りの 2026 年 1Q のプラン
  - https://github.com/oxc-project/oxc/issues/17411
  - Oxlint JS Plugins Alpha
  - Oxlint 2026 Q1
  - Formatter Beta
  - Minifier Beta
  - Transformer Milestone 3
  - Work with the Rolldown team to improve transform, minify, DCE and chunking.
- Introducing Flint
  - https://www.flint.fyi/blog/introducing-flint/
  - typescript-eslint のメンテナーが中心となって作っている新しいリンター
  - TS 中心で書かれていながらも Rust などのパーサーと組み合わせることで、型情報を活かしながら、パフォーマンスも出せるのが売りぽい
- TypeScript 7 (tsgo) の進捗
  - https://devblogs.microsoft.com/typescript/progress-on-typescript-7-december-2025/
  - TypeScript の Go 実装が安定段階に到達
  - TS/JS で実装される TypeScript は 6.0 が最終バージョン(6.1 は無い)
  - 6.0 と比較して、ビルド速度が 10 倍以上高速化されるベンチ結果も出ている
  - TS7 でいくつかのオプションの非推奨化、廃止がある予定
    - strict がデフォルトに。
    - target は es2015 が最低に。
    - baseUrl は廃止
- Introducing: React Best Practices
  - https://vercel.com/blog/introducing-react-best-practices
  - Vercel の React と Next.js の最適化の知見とコード例を AI エージェント用のデータとして公開
- Tailwind でレイオフがあった
  - https://github.com/tailwindlabs/tailwindcss.com/pull/2388#issuecomment-3717222957
  - AI が原因でドキュメントを見る人が 2023 年から 40% 減少
  - 急成長して人気もあるのに収益は 80% 減少している
  - 75%(3 人) をレイオフした
  - その後多くのスポンサーが集まった
- Node.js - Tuesday, January 13, 2026 Security Releases
  - https://nodejs.org/en/blog/vulnerability/december-2025-security-releases
  - 最大深刻度 High の脆弱性修正が含まれたリリース
  - v25.x、v24.x、v22.x、v20.x に影響
  - 年末にリリース予定だったが、みんな Holiday なので延期されてた
  - https://nodejs.org/ja/blog/vulnerability/january-2026-dos-mitigation-async-hooks
- React Server Components の脆弱性 (React2Shell)
  - https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components
  - 認証無しでリモートコード実行が可能な脆弱性
- Denial of Service and Source Code Exposure in React Server Components
  - https://react.dev/blog/2025/12/11/denial-of-service-and-source-code-exposure-in-react-server-components
  - React の脆弱性の原因と対応のまとめ
- Storybook の脆弱性
  - https://storybook.js.org/blog/security-advisory/
  - Storybook における Storybook のビルドに.env の内容が入ってしまう脆弱性
- pnpm Has Lockfile Integrity Bypass that Allows Remote Dynamic Dependencies
  - https://github.com/advisories/GHSA-7vhp-vf5g-r2fw
  - pnpm の脆弱性
  - 10.26.0 で解決された
- Cloudflare の大障害
  - https://blog.cloudflare.com/ja-jp/5-december-2025-outage/
  - 障害範囲は Cloudflare が処理する全 HTTP トラフィックの約 28%
  - 実は RSC の脆弱性のための対応による二次災害だった
- CSS at Scale With StyleX - Engineering at Meta
  - https://engineering.fb.com/2026/01/12/web/css-at-scale-with-stylex/
  - CSS は大規模なウェブサイトでの課題を呈し、Meta はその解決策として StyleX をオープンソース化した。
  - StyleX は CSS-in-JS の利便性と静的 CSS のパフォーマンスを組み合わせ、コンポーネントの原子的スタイリングを可能にする。
  - Figma や Snowflake などで標準化され、Meta では Facebook、Instagram、WhatsApp、Messenger、Threads で使用されている。
- Anthropic が Bun を買収
  - https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone
  - Claude Code の native installer は Bun チームと協力して実現されていた
  - Bun は引き続き OSS として提供される
- Joint statement from Google and Apple
  - https://blog.google/company-news/inside-google/company-announcements/joint-statement-google-apple/
  - Apple と Google が長期に協業する契約を締結
  - Apple Intelligence の裏側が Gemini になる
- Cloudflare が Astro を買収
  - https://astro.build/blog/joining-cloudflare/
  - Astro と Cloudflare が共通したビジョンを持っていたのが決め手らしい
  - Astro は引き続き OSS として提供される
- Astro 6 Beta
  - https://astro.build/blog/astro-6-beta
- MicroQuickJS
  - https://github.com/bellard/mquickjs
  - QuickJS と FFmpeg の作者の Fabrice Bellard の新作
  - ES5 に近い、JS の subset しか実装しない。10kb のメモリがあれば動く
- Disco
  - https://blog.google/innovation-and-ai/models-and-research/google-labs/gentabs-gemini-3/
  - Google Labs で提供される AI 搭載ブラウザ
  - GenTabs と言う機能があり、ユーザーが開いているタブやチャット履歴から次のタスクを予測、そのタスクをこなすためのアプリを生成してくれる
  - Wait List が出ていて、まだ US の人しか使えない
- Deno に Wasm の Source-phase import が来た
  - https://x.com/deno_land/status/1996251639078965681
  - fetch したり、ファイルを Read したりする JS のコードを書かなくてよくなった
- Deno Sandbox
  - https://deno.com/deploy/sandboxes
  - Deno Deploy 上で任意のコードや Shell Script を実行できる Sandbox の SDK
  - Ryan がひっそりとアナウンスしていた。正式公開ではなさそう
    - https://x.com/rough__sea/status/2000719751262408735?s=20
- Akamai が Fermyon を買収
  - https://www.fermyon.com/blog/fermyon-joins-akamai
  - Wasm 製 Web アプリのホスティングサービスや、Spin という Wasm Component ベースのフレームワークを提供している Fermyon が Akamai に買われた
  - もともと、Fermyon Wasm Functions が Akamai でホストされていた
  - これから Akamai も Wasm に力を入れていきそう
- ESLint v10.0.0-rc.0 released
  - https://eslint.org/blog/2026/01/eslint-v10.0.0-rc.0-released/
  - assertion option として requireData を追加
- jQuery 4.0.0
  - https://blog.jquery.com/2026/01/17/jquery-4-0-0/
  - jQuery v4!jQuery 20 周年
- vercel-labs/json-render
  - https://github.com/vercel-labs/json-render
    - AI が JSON をストリーミングしてそれをインタラクティブな UI として描画する
  - デモ的なもの
    - https://x.com/ctatedev/status/2011589295862395238?s=20
- vercel-labs/agent-browser
  - https://github.com/vercel-labs/agent-browser
  - AI エージェント向けのヘッドレスブラウザを Vercel が出した
  - 中身は Rust と Playwright ぽい
- VoidZero 関連のツールのリブランディング
  - https://x.com/voidzerodev/status/2011019657960943994?s=20
- What's New in ViteLand: December 2025 Recap
  - https://voidzero.dev/posts/whats-new-dec-2025
- React Conf 2025 の Video とかが揃った
  - https://conf.react.dev/
- Announcing Rspack 1.7
  - https://rspack.rs/blog/announcing-1-7
  - Rspack 周りのアップデートのまとめも
- Webpack Establishing Working Groups for documentation & outreach
  - https://github.com/webpack/tsc/blob/main/notes/2026/2026-01-12-transcript.md
- Manus、次なるイノベーションの時代へ:Meta と力を結ぶ
  - https://manus.im/ja/blog/manus-joins-meta-for-next-era-of-innovation
  - meta が AI エージェントの Manus を買収
- Next.js 16.1
  - https://nextjs.org/blog/next-16-1
- TanStack AI Alpha
  - https://tanstack.com/blog/tanstack-ai-alpha-your-ai-your-way
- Cursor Browser 向けビジュアルエディタ
  - https://cursor.com/ja/blog/browser-visual-editor
  - Cursor 上でデザインをいじれるビジュアルエディタモードがでた
- The State of TanStack, Two Years of Full-Time OSS
  - https://tanstack.com/blog/tanstack-2-years
  - TanStack の現状や OSS の苦労とこれからについて
- ESLint's 2025 year in review
  - https://eslint.org/blog/2026/01/eslint-2025-year-review/
  - ESLint の 2025 年まとめ
- 2025 year in review | Astro
  - https://astro.build/blog/year-in-review-2025/
  - Astro の 2025 年のまとめ
- pnpm in 2025
  - https://pnpm.io/blog/2025/12/29/pnpm-in-2025
  - pnpm の 2025 年まとめ


## Events

- 1 月
  - burikaigi 2026
    - https://burikaigi.dev/
  - KNOTS 2026
    - https://knots.crossrel.jp/
- 2 月
  - Spectrum Tokyo Festival 2026
    - https://fest.spectrumtokyo.com/2026/
- 3 月