---
name: img
description: Size local blog images and add rendered dimensions to Markdown image URLs in jxck.io. Use when inserting article images, normalizing their displayed sizes, or invoking /img for a Markdown file.
---

# img

このリポジトリの記事画像について、Markdown に埋め込む表示サイズを決める。

## Workflow

1. 対象 Markdown のローカル画像参照を全て抽出する
2. 画像パスを Markdown と同じディレクトリから解決する
3. 対応画像をまとめて `/Users/jxck/dotfiles/bin/img` に渡し、各画像の縮尺候補を取得する
4. 記事全体で画像の表示幅が揃う候補を選ぶ
5. Markdown の画像 URL を `<path>#<width>x<height>` に更新する
6. 全参照に寸法が入り、アスペクト比が候補出力と一致することを検証する

## Size selection

- 元画像を拡大しない
- 同種・同用途の画像は、候補の中から近い表示幅を選ぶ
- 画像ごとに倍率を揃えるのではなく、記事上の表示幅を揃える
- スクリーンショット内の文字や細部が読めなくなる候補は避ける
- 縦長画像や意図的に小さく見せる画像は、横長画像と同じ幅に無理に揃えない
- 判断に迷う場合は、候補の中で本文カラムに収まりやすい600px前後を基準にする

## Markdown format

例えば `photo.png` の採用候補が `633x323` の場合は次のように書く。

```markdown
![Alt text](photo.png#633x323)
```

画像ファイル自体は変更せず、URL fragment の寸法だけを編集する。
