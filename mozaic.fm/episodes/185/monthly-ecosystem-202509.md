---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep185.mp3
published_at: 2025-09-20
guest: [@sakito](https://x.com/__sakito__)
guest: [@re-taro](https://x.com/re_taro_)
---

# ep185 Monthly Ecosystem 202509

## Theme

第 185 回のテーマは 2025 年 9 月の Monthly Ecosystem です。


## Show Note

- Malicious versions of Nx and some supporting plugins were published · Advisory · nrwl/nx
  - https://github.com/nrwl/nx/security/advisories/GHSA-cxm3-wv7p-598c
  - Nx の特定パッケージに含まれた脆弱性に対するサプライチェーン攻撃(s1ngularity)
  - 影響の確認、対応策、攻撃背景、今後の対応
  - npm debug and chalk packages compromised
    - https://www.aikido.dev/blog/npm-debug-and-chalk-packages-compromised
- Shai-Hulud npm Supply Chain Attack | Wiz Blog
  - https://www.wiz.io/blog/shai-hulud-npm-supply-chain-attack
  - Nx の攻撃の発展形で、今度は自己増殖型ワームが配布された
  - CrowdStrike などのパッケージが侵害される
- Mitigating supply chain attacks | pnpm
  - https://pnpm.io/supply-chain-security
  - npm パッケージが狙われていることに対する pnpm を使用した対応策
  - 公開から一定時間経過したバージョンのみインストールするよう制御可能な `minimumReleaseAge` が pnpm 10.16 で追加された
  - Yarn にも `minimumReleaseAge` が追加された
    - https://github.com/yarnpkg/berry/releases/tag/%40yarnpkg%2Fcli%2F4.10.0
  - npm は `minimumReleaseAge` について議論中
    - https://github.com/npm/cli/issues/8570
    - npm では `--before` がそれにあたるらしい
    - ただし絶対日付指定なので計算が必要
    - .npmrc には書けないので強制が難しい
  - pnpm は v10 以降で postinstall をデフォルトで無効化しているが、npm と Yarn はデフォルトで有効
- npm trusted publishing with OIDC is generally available - GitHub Changelog
  - https://github.blog/changelog/2025-07-31-npm-trusted-publishing-with-oidc-is-generally-available/
  - Trusted publishing for npm packages | npm Docs
    - https://docs.npmjs.com/trusted-publishers#supported-cicd-providers
- Releases now support immutability in public preview - GitHub Changelog
  - https://github.blog/changelog/2025-08-26-releases-now-support-immutability-in-public-preview/
- Middleware in React Router | Remix
  - https://remix.run/blog/middleware
  - React Router v7.9.0 で導入された Middleware の解説
- Next.js 15.5
  - https://nextjs.org/blog/next-15-5
- Deno 2.5: Permissions in the config file
  - https://deno.com/blog/v2.5
- Behind The Scenes of Bun Install | Bun Blog
  - https://bun.com/blog/behind-the-scenes-of-bun-install
  - Bun install が高速な理由の解説
- A deep dive into Cloudflare's September 12, 2025 dashboard and API outage
  - https://blog.cloudflare.com/deep-dive-into-cloudflares-sept-12-dashboard-and-api-outage/
  - Cloudflare が useEffect に渡す依存配列のミスでセルフ DoS
- Migration guide for Storybook 10
  - https://storybook.js.org/docs/10/releases/migration-guide
  - Storybook v10 はまだ beta だが、Migration guide がでた
  - ESM 化,CSF の型周り強化が入っている
- feat: CSS variable tracking by nzakas · Pull Request #136 · eslint/rfcs
  - https://github.com/eslint/rfcs/pull/136
  - ESLint の CSS Variabl の静的解析の機能追加
- Release Activity in Canary by rickhanlonii · Pull Request #34374 · facebook/react
  - https://github.com/facebook/react/pull/34374
  - `<Activity>` が Canary リリースへ
- りぃさん VoidZero へ
  - https://x.com/leaysgur/status/1962395920483643481
  - > 目下のタスクとしては、やっぱり Prettier の Rust リライトかな?
  - oxfmt の RFC: https://github.com/oxc-project/oxc/discussions/13608
- Storybook MCP Addon
  - https://www.npmjs.com/package/@storybook/addon-mcp
  - Storybook 公式から出た MCP Addon
  - Story ファイルを生成してくれる
- Storybook Design Systems with Agents RFC
  - https://github.com/storybookjs/ds-mcp-experiment-reshaped/discussions/1
- Agentic Workflow RFC
  - https://github.com/storybookjs/addon-mcp/discussions/15
- Remote GitHub MCP Server is now generally available - GitHub Changelog
  - https://github.blog/changelog/2025-09-04-remote-github-mcp-server-is-now-generally-available/
- Meet the GitHub MCP Registry: The fastest way to discover MCP Servers - The GitHub Blog
  - https://github.blog/ai-and-ml/github-copilot/meet-the-github-mcp-registry-the-fastest-way-to-discover-mcp-servers/
- Introducing the MCP Registry | mcp blog
  - https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/
- A postmortem of three recent issues
  - https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues
  - Claude の品質が落ちていたバグの修正と技術的分析など
- 国内における脆弱性関連情報を取り扱う全ての皆様へ - 情報セキュリティ早期警戒パートナーシップガイドラインに則した対応に関するお願い - (METI/経済産業省)
  - https://www.meti.go.jp/policy/netsecurity/vul_request.html
  - 共同通信が Felica の脆弱性を先走って公開した件
  - Sony は内部で対応を進めていたにもかかわらず、なし崩し的に一方を出すしかなかった。
  - 脆弱性情報の共有には、対応がある程度済んでから行うべき手順として、パートナーシップガイドラインがあるので、メディアも発見者も守るべき
- Rails 作者の DHH 氏、独自開発した Linux OS「Omarchy」 をデモ。5 分で最高の開発環境を導入。ターミナル UI とタイリングウィンドウが特徴 － Publickey
  - https://www.publickey1.jp/blog/25/railsdhhlinux_osomarchy_5ui.html
  - Omakase + Arch linux = Omarchy
  - すでに資産はあるので、収益などは考えない趣味プロジェクトらしい


## Events

- 9 月
  - 21: フロントエンドカンファレンス東京
    - https://x.com/fec_tokyo/status/1908082128815812618
- 10 月
  - 7-8: React Conf
    - https://conf.react.dev/
  - 9-10: Vite Conf
    - https://viteconf.amsterdam/
  - 22: Next Conf
    - https://nextjs.org/conf
  - 25: Vue Fes Japan 2025
    - https://vuefes.jp/2025/
- 11 月
  - 14-15: YAPC fukuoka
    - https://fortee.jp/yapc-fukuoka-2025
  - 16: JSConf JP
    - https://jsconf.jp/2025/en
  - 23: TSKaigi Hokuriku 2025
    - https://x.com/tskaigi/status/1944237850071118068
  - 30: フロントエンドカンファレンス関西
    - https://frontend-conf.osaka.jp/