# markdown


## requirements

- 余計な記法は実装しない
- indent をちゃんとする
- `<section>` を入れる
- block 要素が入らない場合は一行に
- 閉じタグが不要なものは消す
- `<dl>` の下には `<div>` を入れる
- 余計な空白はエラー
- `<h1>`... にはリンクを入れる
  - id は他の h とかぶってたら後ろに連番
- `![]()` は
  - jpeg, png, gif, svg, mp4 以外受け付けない
  - mp4 だったら `<video>` にして webm をフォールバック
  - jpeg, png なら `<picture>` にして webp をフォールバック
  - URL の最後に cachebusting の query をつける
- codeblock
  - 拡張子の後ろにパスを指定したら、外部ファイルを埋め込む
- TOC を作る
- table の align は class をつける
- 引用の最後の `--- url` は `<cite>` と `<blocquote cite=>` で埋める
- description を markdown から抜き出すのではなく HTML の text 部分のみから生成するように。
- dd が複数の dl をサポート
  - 複数 dd の場合も 1 つの div にまとめる
- kramdown だと `|` が文中にあると `<table>` 判定されるため URL のタイトル内の `|` をエスケープする必要がある
  - 文中に `<table>` 入れることなんか無いのでエスケープしないで済むようにしたい。

## TODO

- TOC で h2 内の `code` を外す
- description
  - 今雑に正規表現で取り出し、 hsc は自分でやって `<%- %>` で埋め込んでる
  - Intro の前に Update があっても大丈夫なように
- Intro の前に Update が入ったら直す
- podcast の `<article>` のインデントが 1 個深い