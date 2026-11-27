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


## podcast

https://github.com/Jxck/mozaic.fm

2026-08 に別リポジトリへ移行済みで、このリポジトリには podcast のサイトや feed は含まれない。ビルドや配信の手順は移行先の README を正とする。

ビルドスクリプト、テンプレート、フロントエンドの JS など、 podcast 用のコードもこのリポジトリから削除済みである。

残っている接点は次の 2 つである。

- `h2o.conf` が VPS 上の `mozaic.fm/h2o.conf` を `!file` で読み込む
- `mozaic.fm/h2o.conf` が、このリポジトリの `.mruby.handler/hsts.rb` を相対パスで参照する

以下は移行前 (このリポジトリでビルドしていた頃) の記録である。

基本は blog と同じように作っていた。


### basic flow

- 編集した mp3 を生成
- 原稿を md で記述
- episodes 以下にエピソード番号のディレクトリを作りそこに置く
- `make podcast` で html と RSS (`feed.mozaic.fm/index.{xml,json}`) が同時に生成されていた


### md

以下のフォーマットで始める。

```md
---
type: podcast
tags: ["tag"]
audio: https://files.mozaic.fm/mozaic-epXX.mp3
published_at: 2022-02-22
guest: [@gest](url)
guest: [@gest2](url)
---

# epXX XXXX

## Theme

簡単なテーマ


## Show Note
```

- tag: タグのページ、ただし今はタグページを作ってない
- Theme: これが index ページの見出し、 description 要素、 RSS の概要などに使われる

mp3 のプレイヤーは `<mozaic-player>` という Custom Element を作っていた。


### mp3

- 48kbps (mono) 96kbps(stereo)
- 44.1kHz (joint stereo)
- mp3

で編集したものを吐く。

移行前は、実体を `mozaic.fm/files.mozaic.fm/` に置き、 `jxck.io/files.mozaic.fm` から symlink して、 Git LFS で履歴管理していた。この symlink は 2026-08-21 に削除済みである。

現在は mozaic.fm repo 側で、 git-annex の locked symlink として管理している (2026-07 に移行)。


### ID3 Tag

mp3 には ID3 というメタデータを付与できる。

ID3 には複数のバージョンがありおおよそ以下のようになっているらしい。

変遷は wikipedia にまとまっているものが参考になる。

- [ID3 タグ - Wikipedia](https://ja.wikipedia.org/wiki/ID3%E3%82%BF%E3%82%B0)

これを元に、元も普及しているらしく、画像を付与できる v2.3 を採用。

ツールは、 GUI ではなく、ビルド時にメタデータを付与できるように CLI を探し、 Mac/Linux 両対応で使いやすい eyeD3 を採用した。

- [eyeD3](https://eyed3.readthedocs.io/en/latest/)

HTML/RSS をビルドするときに収集するメタデータを用いて、各ファイルに対するコマンドファイルの shell を精製し、それを必要に応じて(通常は公開時)に実行する。

```shell
eyeD3 --remove-all ../files.mozaic.fm/mozaic-ep0.mp3

eyeD3 --title "ep0 introduction of mozaic.fm" \
      --track 1 \
      --artist 'Jxck' \
      --album 'mozaic.fm' \
      --genre 'Podcast' \
      --add-image ./www.jxck.io/assets/img/mozaic.jpeg:FRONT_COVER \
      --to-v2.3 \
      ../files.mozaic.fm/mozaic-ep0.mp3
```

一度全部消して、最小限のメタデータを付与。 track は sideshow の分ずれるので、エピソード番号と同じではなく、 1 オリジンで最初からのファイル数。