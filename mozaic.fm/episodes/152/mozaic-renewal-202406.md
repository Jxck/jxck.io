---
type: podcast
tags: ["mozaic renewal"]
audio: https://files.mozaic.fm/mozaic-ep152.mp3
published_at: 2024-06-04
guest: [@sakito](https://twitter.com/__sakito__)
guest: [@hiroppy](https://twitter.com/about_hiroppy)
---

# ep152 mozaic.fm Renewal Project 202406

## Theme

第 152 回のテーマは 2024 年 6 月の mozaic.fm renewal project です。

## 進捗

- Jxck
  - Hono -> Next.js に全部書き直し
  - 既存のコードを捨てたので Figma, Storybook, Chromatic の連携もやり直し
  - デプロイ済み
    - https://mozaicfm.pages.dev/
- Sakito
  - 進捗なし、すいません。
- Hiroppy
  - フロントエンドのインフラ再作成
  - algolia 調査、別のライブラリ調査中
    - Pagefind

## タスク

- jxck
  - markdown パース
    - 自前 or Mdx (remark)
  - markdown は最終的にはリポジトリに入れる
  - こまかいところの実装開始
    - player component
- sakito
  - デザイン案
    - カードレイアウトベース
    - リスト切り替え?
    - light/dark
    - mobile
    - 検索
    - タグ
      - https://github.com/Jxck/jxck.io/blob/main/mozaic.fm/episodes/0/introduction-of-mozaicfm.md?plain=1
      - 実装に合わせて markdown 側を変えてもいい
    - player
    - SVG
      - https://github.com/Jxck/jxck.io/tree/main/www.jxck.io/assets/img
- hiroppy
  - 検索
    - 要件
      - エピソードの順に結果を表示したい
      - markdown はここ
        - https://github.com/Jxck/jxck.io/tree/main/mozaic.fm/episodes
    - 実装
      - algoria
      - 自前実装
      - その他 OSS
  - Storybook - Figma - Chromatic 連携
  - Review
    - https://github.com/Jxck/mozaic.fm/pull/14

## Done

- Git Repo
- Init Next.js

## スタック

- Next.js
  - Approuter
- Markdown
  - MDX
- Figma
  - professional plan: 1800 円/月
  - figma for vscode
  - public に公開
- Storybook
  - storybook test
- Chromatic
  - VRT / E2E
  - 無料枠 ?
  - public に公開
- Test
  - Vitest
  - Storybook
- CI
  - Github Actions
- Cloudflare
  - 無料枠
- CSS
  - figma で @scope 付き生 CSS を吐く
  - dark mode 対応
  - `prefer-*` は全部意識
- Component
  - 全部自作
  - aria とかも全部自分で考える

## スケジュール

- 8 月: デザイン - Component - (一覧ページ|個別ページ)
- ?月: プレイヤーで再生
- ?月: RSS
- ?月: 検索
