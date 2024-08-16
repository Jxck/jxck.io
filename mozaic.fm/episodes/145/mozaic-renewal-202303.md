---
type: podcast
tags: ["mozaic renewal"]
audio: https://files.mozaic.fm/mozaic-ep145.mp3
published_at: 2024-03-26
guest: [@sakito](https://twitter.com/__sakito__)
guest: [@hiroppy](https://twitter.com/about_hiroppy)
---

# ep145 mozaic.fm Renewal Project 202403

## Theme

第 145 回のテーマは 2024 年 3 月の mozaic.fm renewal project です。

Monthly Ecosystem では、様々なツールやフレームワーク、開発手法に触れていますが、実践する機会を確保するのが難しい場合もあります。

そこで、最新のフレームワークや手法を用いながら mozaic.fm のサイトを刷新するシリーズを始めます。

月一で進捗確認兼方針の相談などをそのまま配信していきます。

## 現状

現場の mozaic.fm は、 blog.jxck.io と同じスタックでできています。

- markdown でエピソードの Show Note を書く
- 自作の markdwon パーサでパースし、筆者好みの HTML にレンダリングする
- EJS のレイアウトに流して静的な HTML を作成
- 音楽プレイヤーは自作の WebComponents
- それを h2o で配信
- 画面は、一覧、個別、検索のみ
- 検索は Ruby で書いた CGI (h2o だけでやる方法が mruby か gci しかないため)

## 方針

- Server
  - Hono か HonoX
  - Cloudflare にデプロイ
- デザイン
  - Figma で作る
  - DevMode で Storybook に JSX を起こす
  - Cromatic で VRT/E2E
  - Component ライブラリは入れない
  - CSS は @scope ベース
  - `prefer-*` は全て意識(dark mode あり)
- Test
  - Storybook Test / Vitest
- Lint/Format は Biome
- サポートブラウザ
  - どうせエピソードは好きな Podcast Player で聞ける
  - 最悪 Chrome でしか動かないサイトでもいい
- 認証をつけたい
  - idp.jxck.io に IDP
  - それに federation で入れるようにする
  - Cookie 周りの検証を兼ねる
  - Passkey, FedCM, Storage Access API など試したい
  - 認証する理由は今のところない
  - 何かアカウントを作るモチベーションを提供する必要?

## 進捗

### init repo

https://github.com/Jxck/mozaic.fm

```sh
$ npm init
$ npm install --save-dev --save-exact @biomejs/biome
```

### storybook

```sh
$ npx storybook@latest init
> react
> vite
```

### chromatic

```sh
$ npm install --save-dev chromatic
$ npx chromatic --project-token=$PORJECT_TOKEN
```

### figma devmode

- figma で create team
- Professional 課金で dev-mode を有効に
- Storybook Connect Plugin を入れる Chromatic と連携
- Chromatic 側でも Storybook と連携
- Component を Chromatic と紐づける
- VSCode に Figma for VSCode を入れる
- Figma に Figma to Code を入れる(Anima はアカウントが必要?)

Figma でコンポーネントを作り、それを Figma to Code で JSX / HTML を表示できる。

その Figma を VSCode に表示でき、その CSS がサジェストされるようになる。

これを元にコンポーネントを作り、 Storybook を作れば、 Chromatic にあげてテストできる。

## スケジュール

- 8 月: デザイン - Component - (一覧ページ|個別ページ)
- ? 月: プレイヤーで再生
- ? 月: RSS
- ? 月: 検索
- 11 月: デプロイ
- 1 月: 振り返り?

## Show Note
