---
type: podcast
tags: ["monthly ecosystem"]
audio: https://files.mozaic.fm/mozaic-ep155.mp3
published_at: 2024-07-08
guest: [@sakito](https://twitter.com/__sakito__)
guest: [@hiroppy](https://twitter.com/about_hiroppy)
---

# ep155 mozaic renewal 202407

## Theme

第 155 回のテーマは 2024 年 7 月の mozaic.fm renewal project です。

## 進捗

- Jxck
  - 既存記事のフォーマットを全部見直し
  - mozaic-player をリファクタ中
    - background-fetch 周りは消す
- Sakito
  - 検索
    - 検索は検索ページ `/search?q=xxx`
    - 検索ボックスは全ページ
    - カテゴリも絞る場合は `/search?q=xxx&c=platform`
  - 一覧
    - クエリをつけると `?c=platfrom` で絞れる
  - darkmode
    - system を採用
  - - Hiroppy
  - biome 修正
  - storybook 再構築中
  - 検索機能実装完了
    - next/mdx を利用
    - frontmatter の中身どうだそうかなー
  - .md + frontmatter は継続
    - remark plugin でビルド
    - front matter の型はないが雑にチェックはしたい
      - remark plugin 作る?
  - ビルド時に全部 SSG する(検索以外)

## タスク

- jxck
  - app/\_conponents に一覧ページのコンポーネントを実装し始める
  - figma の assets の単位で実装
- sakito
  - 一覧ページの修正
  - 個別ページのデザイン
  - プレイヤーのデザイン
- hiroppy
  - 検索と md frontmatter 対応

## Done

## スタック

- Next.js
- algoria

## スケジュール

- 8 月: トップページと検索がある程度完了
- 9 月: 個別ページとプレイヤーで再生がある程度完了
- ?月: RSS
- ?月: 検索
