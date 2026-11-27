# jxck.io

## blog.jxck.io

- https://github.com/Jxck/jxck.io/tree/main/blog.jxck.io
  - ビルド済み静的サイト
  - CSP (Report-Only、 `.mruby.handler/csp.rb` で付与)
  - Reporting (Report-To と ReportingObserver で `reporting.jxck.io` に送る)
  - 鉄下駄として
    - analytics
    - YouTube embed
    - etc を導入


### HTML

- markdown を自作のジェネレータでビルド
- このとき AMP 版も生成していたが対応を終了
  - [Non AMP SXG による Prefetch 対応と AMP 提供の停止 | blog.jxck.io](https://blog.jxck.io/entries/2021-05-28/blog-over-sxg.html)
  - [本サイトの AMP 提供の停止とここまでの振り返り | blog.jxck.io](https://blog.jxck.io/entries/2021-06-26/amp-tone-down.html)


### CSS

- 基本は single column layout
- dark mode 対応していたが、あまり気に入らなかったので一旦取り下げ


### JS

- 基本使わない
- 読み込むのは `main.js` と Cloudflare Web Analytics の beacon のみ
  - `main.js` は ReportingObserver の report を `reporting.jxck.io/beacon` に送る
  - PerformanceObserver の計測値は console に出すだけで、送信しない
- 将来的には消したい


### Image

- 基本は SVG を使う
  - 基本は手書き
  - 複雑なのは Cacoo で
- ラスタは WebP に
  - フォールバックとして jpeg/png/gif(anime)
- picture タグで出しわけ
- avif 対応済み


### Video

QuickTime でとった screen record なら mov を吐くので、 mp4/webm に変換

```sh
# メタデータを消し、 frame rate を 24 にし、Audio を消す
$ ffmpeg -i video.mov -map_metadata -1 -r 24 -an video.webm
$ ffmpeg -i video.mov -map_metadata -1 -r 24 -an video.mp4
```

image の記法で video に展開される。


### WebFont

- 鉄下駄として日本語 WebFont を導入
  - Noto Sans CJK JP と Noto Sans Mono CJK JP
  - emoji は入れてない
  - diet
    - entries 以下のファイルを全部みて、使われている文字を列挙
    - それを元に subset 化した woff2 を生成
  - font-display: swap で表示
- していたが、もはややることは大体やって「日本語 Web フォントフルセット」は諦めたほうが良いと判断。対応もやめた。


### iframe

- 鉄下駄として YouTube の iframe を embed
- iframe には `sandbox` 属性を付ける
- CSP の `frame-src` に埋め込み先 (YouTube / Docswell) を列挙する


### Analytics

- 鉄下駄としてアナリティクスを導入
  - 現在は Cloudflare Web Analytics (`.src/template/blog.footer.html.ejs` で beacon を読み込む)
- これを入れても早い状態を維持したい
- CSP なども調整


### basic flow

- 原稿を md で記述
- entries 以下に日付フォルダを作りそこに置く
- `make` (引数なし) で、以下をこの順に行う
  - `make mtime`: ビルドに関係するファイルの mtime をコミット時刻へ戻す (pull 直後の不要な再ビルドを防ぐ。未コミットの変更は対象外。全ファイルを戻すなら `make full-mtime`)
  - `make image`: 画像の webp / avif を生成する (記事のビルドが画像の mtime を読むため、 blog より先に終わらせる)
  - `make blog`: 記事の差分ビルド + `index.html` 更新を行い、最後に `make comp` を呼んで変更分の `.br` / `.html.dcb` まで生成する
- build 結果をコミットして push し、VPS で `git pull` して `make` する
  - `.br` は git 管理外なので、VPS 側でも生成が必要
- 辞書を更新したいときだけ別途 `make dict` を実行する
- ビルドの中心は `Makefile` と `.src/build.ts`


### md

以下のフォーマットで始める。そうでなければビルドが通らない。

```
# [tag][tag2] タイトル

## Intro

簡単なイントロ
```

- tag: タグ単位で記事をまとめたリンクを生成するために必要。だいたい 1~4 程度
- Intro: 必ず最初にくる、これが index ページの見出し、 description 要素、 RSS の概要などに使われる
- 本文: 以降は普通の markdown で記述

文章には以下のルールを適用する。実装は `.src/markdown/formatter.js` にあり、ビルド時に自動でかかる (`make fmt-blog` で全記事にかけることもできる)。

- 全角記号は半角にする (singler)
- 全角と半角の間はスペース (spacer)
- 改行、表、リストなどの細かい整形

ただし markdown は以下に注意

- 画像の URL は最後に `#120x120` のように width/height を入れる
- サンプルコードは外部ファイルを読み込める(独自)

その他細かい挙動は最初のエントリをテストエントリにしているのでそこで確認。

https://blog.jxck.io/entries/2016-01-27/new-blog-start.html#test-section

パーサは独自実装

- https://blog.jxck.io/entries/2021-11-30/blog-v2-release.html


### 画像

画像は以下のように埋め込む。

alt, title, 画像のサイズがないといけない。

```md
![alt](image.png#120x120 "title")
```

また、この md は `<picture>` に展開され、可能であれば avif/WebP で配信する。

なので、 image.avif / image.webp を作って置いておく必要がある。

これは `make image` (`make webp` -> `make avif` の順) でできるが、 `make` に含まれるため、通常は個別実行しなくてよい。

webp の生成時に、元画像も optipng / jpegtran / gifsicle で上書き最適化される。

webp / avif ともに q=40 でやっている。

```sh
$ cwebp -q 40 -quiet -m 6 image.png -o image.webp
$ avifenc --speed 0 -q 40 -o image.avif image.png
```


### 圧縮

`www.jxck.io` と `blog.jxck.io` 配下 (drafts / dictionary を除く) の html/css/js/svg/json/xml などのテキスト系ファイルは全て圧縮する。

ただし画像 (png/jpeg/gif/webp/avif)、動画 (mp4/webm)、woff2、rb/sh/cgi/md/txt などは圧縮しない。

また、圧縮方式は gz/br であるが、モダンなブラウザはほとんどが br に対応しているため、以下のような方針をとる。

- .br は brotli コマンドで事前に作る
- .gz は h2o のオンデマンドで作る

これは `make comp` でできるが、 `make blog` の最後で呼ばれるため、通常は個別実行しなくてよい。


### Compression Dictionary Transport (CDT)

加えて、 entries 配下の HTML は CDT で `.dcb` も生成して配信している。

- `make dict` で古い `*.dict` / `*.dict.br` を掃除しつつ `blog.jxck.io/dictionary/entries/<hash>.dict` を 1 本生成し、 `active.dict` と `h2o.dict.conf` を更新し、全 `.html.dcb` を作り直したうえで `make reload` まで行う (reload は Linux のみで、 Mac ではスキップする)
- `make comp` で記事の `.html.dcb` を生成 (辞書は再生成せず既存辞書を使用。 `.dcb` だけなら `make dcb`)
- 配信ロジックは `h2o.conf` ではなく `.mruby.handler/dcb.rb` にある
- `Dictionary-ID` は Structured Fields String なので、 mruby 側では `"entries"` のように quote を含めて比較する
- 辞書生成・圧縮は別リポジトリの `cdt` CLI (`cargo install cdt-toolkit`) が担う。`.src/dictionary/` は運用ドキュメントと評価ツール、配信用辞書は `blog.jxck.io/dictionary/entries/` に置く
- `make clean` は `.br` / `.dcb` / `.dict` を削除、 `make distclean` は全生成物を削除


## make

コマンドの一覧。定義は `Makefile` にある。


### ビルド

| コマンド          | 内容                                                                          |
|:------------------|:------------------------------------------------------------------------------|
| `make`            | `make all` と同じ。 `mtime` -> `image` -> `blog` の順に実行する               |
| `make mtime`      | entries 配下の md / html / dcb / 画像の mtime を、最終コミット時刻へ戻す      |
| `make full-mtime` | 追跡中の全ファイルの mtime を、最終コミット時刻へ戻す                         |
| `make blog`       | 記事の差分ビルドと index / feed / sitemap / tags の更新。最後に `comp` を呼ぶ |
| `make blog-all`   | 全記事を整形してフルビルドする。 `comp` は呼ばない                            |
| `make fmt`        | `fmt-blog` のあと、 `npm run fmt` (oxfmt) を実行する                          |
| `make fmt-blog`   | 全記事の md を formatter で整形する                                           |


### 画像

| コマンド     | 内容                                                         |
|:-------------|:-------------------------------------------------------------|
| `make image` | `webp` -> `avif` の順に実行する                              |
| `make webp`  | webp の差分生成。元画像も上書きで最適化する                  |
| `make avif`  | avif の差分生成                                              |
| `make png`   | 全 PNG を optipng で最適化する                               |
| `make jpeg`  | 全 JPEG を jpegtran で最適化する                             |
| `make gif`   | 全 GIF を gifsicle で最適化する                              |


### 圧縮と辞書

| コマンド    | 内容                                                                    |
|:------------|:------------------------------------------------------------------------|
| `make comp` | `.br` と `.html.dcb` の差分生成。辞書は再生成しない                     |
| `make dcb`  | `.html.dcb` だけの差分生成                                              |
| `make dict` | 辞書を再生成し、全 `.html.dcb` を作り直して、 Linux では h2o を reload する |


### 削除

| コマンド           | 内容                                                           |
|:-------------------|:---------------------------------------------------------------|
| `make clean`       | `.br` / `.dcb` / `.dict` を削除する                            |
| `make image-clean` | webp / avif を削除する                                         |
| `make blog-clean`  | 記事の html / json と index / feed / sitemap / tags を削除する |
| `make distclean`   | `clean` と `blog-clean` を実行する                             |


### セットアップ

| コマンド              | 内容                                                                    |
|:----------------------|:------------------------------------------------------------------------|
| `make install`        | `npm install` と `cargo install cdt-toolkit` 。 Linux では h2o も入れる |
| `make update`         | 依存を更新する (`ncu` -> `npm install` -> `cdt-toolkit` -> h2o)         |
| `make systemd-list`   | `.systemd` の unit の登録状況を一覧する                                 |
| `make systemd-status` | `.systemd` の unit の状態を表示する                                     |


### h2o

| コマンド       | 内容                                                         |
|:---------------|:-------------------------------------------------------------|
| `make test`    | `h2o.conf` の syntax check                                   |
| `make reload`  | `test` のあと、 h2o を reload する                           |
| `make restart` | `test` のあと、 h2o を restart する                          |
| `make start`   | h2o を起動する                                               |
| `make stop`    | h2o を停止する                                               |
| `make status`  | h2o の状態を表示する                                         |
| `make kill`    | h2o に signal を送って止める (`systemctl kill`)              |
| `make logf`    | h2o のログを追う (`journalctl -f`)                           |
| `make _start`  | systemd を使わず、 h2o を daemon として直接起動する          |
| `make _stop`   | `_start` で起動した h2o を止める                             |
| `make _restart` | `_stop` -> `_start`                                          |
