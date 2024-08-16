---
type: podcast
tags: ["mozaic renewal"]
audio: https://files.mozaic.fm/mozaic-ep148.mp3
published_at: 2024-04-22
guest: [@sakito](https://twitter.com/__sakito__)
guest: [@hiroppy](https://twitter.com/about_hiroppy)
---

# ep148 mozaic.fm Renewal Project 202404

## Theme

第 148 回のテーマは 2024 年 4 月の mozaic.fm renewal project です。

## 進捗

- jxck
  - Honox で初期構成の PR
  - Cloudflare のセットアップとデプロイ
- sakito
  - 現状デザインの Figma への書き起こし
  - カードレイアウト案作成
- hiroppy
  - pnpm への以降
  - インフラ周りの構築

## タスク

- jxck
  - honox での SPA
  - markdown パース
    - 自前 or Mdx (remark)
  - こまかいところの実装開始
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
    - 実装
      - algoria
      - 自前実装
      - その他 OSS
  - Review
    - https://github.com/Jxck/mozaic.fm/pull/14

## Done

- Git Repo
- Figma + Storybook + Chromatic

## スタック

- Honox
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
