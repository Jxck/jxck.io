---
title: "Origin 解体新書 v1.2.0"
emoji: "📝"
type: "tech"
topics: ["origin", "web anatomia", "web"]
published: true
---

# Origin 解体新書 v1.2.0


## Intro

[Web 技術解体新書](https://zenn.dev/jxck/articles/web-anatomia-concepts)

第一章 Origin 解体新書

**Same Origin Policy とは Web において非常に重要なセキュリティモデルの 1 つだ。**

fetch や XHR でリクエストを送信したときに、 CORS 違反で失敗したり、 Preflight という謎のリクエストが送信されたりして悩んだ経験があるかもしれない。これらは全て、ユーザーを保護するために設けられた Same Origin Policy という制限を、ブラウザが遵守した結果なのだ。

本書はこの重要な Origin という概念について、そもそもなぜそんなものが必要なのかという背景や、それがユーザを保護するメカニズム、 JSONP はなぜ危険なのか、 Preflight が飛ぶ理由、 Service Worker など新しい API との連携、 Spectre によって発覚した脆弱性と CORP,COOP,COEP, Origin Isolation など、 Origin を取り巻く関連知識を網羅的/体系的に解説する。


## Change Log

**zenn は一度買えば常に最新版が見られるため、書い直す必要はありません**

- 2020/10/10: v1.2.0
  - 4 節に Electron などで CORS を無効にするリスクについて追記
  - 4 節の「準拠してない仕様」と「安全にまたぐ仕様」の順番を逆に
- 2020/10/08: v1.1.0
  - Cover 刷新
  - Summary の更新
- 2020/10/07: v1.0.0
  - 仕様へのリンクを拡充
  - Fetch Standard について追記
  - request mode / credentials mode について追記
  - crossorigin 属性を追記
- 2020/10/06: v0.1.1
  - 校正誤字修正
  - 脚注の修正
  - 3.md のタイトル変更
- 2020/10/05: v0.1.0
  - Intro チャプタを追加(各ファイル名を +1 シフト)
  - バージョニング開始
  - Change Log を追加
- 2020/10/04: v0.0.0 公開
