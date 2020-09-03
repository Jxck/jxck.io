# jxck.io


## blog.jxck.io

- <https://github.com/Jxck/jxck.io/tree/master/blog.jxck.io>
  - ビルド済み静的サイト
  - AMP 対応
  - DarkMode 対応
  - CSP/FeaturePolicy
  - Reporting
  - 鉄下駄として
    - webfont
    - adsense
    - analytics
    - youtbe embed
    - etc を導入


### HTML

- markdown を自作のジェネレータでビルド
- このとき AMP 版も生成


### CSS

- 基本は single colmun layout
- dark mode 対応


### JS

- 基本使わない
- reporting のみ
- 将来的には消したい


### Image

- 基本は SVG を使う
  - 基本は手書き
  - 複雑なのは Cacoo で
- ラスタは WebP に
  - フォールバックとして jpeg/png/gif(anime)
- picture タグで出しわけ


### WebFont

- 鉄下駄として日本語 WebFont を導入
- Noto Sans CJK JP と Noto Sans Mono CJK JP
- emoji は入れてない
- diet
  - entries 以下のファイルを全部みて、使われている文字を列挙
  - それを元に subset 化した woff2 を生成
- font-display: swap で表示


### iframe

- 鉄下駄として Youtube の iframe を embed
- Feature Policy などを調整


### Analytics/Ad

- 鉄下駄としてアナリティクス/広告を導入
- これを入れても早い状態を維持したい
- CSP なども調整


### basic flow

- 原稿を md で記述
- entries 以下に日付フォルダを作りそこに置く
- `make blog` で html, amp.html が生成される
  - ここで結果を確認しながら直していく
  - 古い圧縮を消さなければブラウザには新しい変換結果は送られない
- `make blogfeed` で RSS が更新される
  - これをしなければ RSS は勝手には更新されない
- `make build` で全体の変換や圧縮のなどを一式行う
  - これで build 結果をコミットしたら終わり


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

文章には以下のルールを適用、別途自分のコマンドが用意してあるが dotfiles に入ってるのでここには含めない。

- 全角記号は半角にする: [singler](https://github.com/Jxck/dotfiles/blob/master/bin/singler)
- 全角と半角の間はスペース: [spacer](https://github.com/Jxck/dotfiles/blob/master/bin/spacer) (ただし除外するファイルもある)
- 改行とか細かいルール: [format.rb](https://github.com/Jxck/dotfiles/blob/master/bin/format.rb) (ただし除外するファイルもある)
- いずれも Makefile に入ってる

ただし markdown は以下に注意

- URL 直書きは `<>` で囲まないとリンクにならない(kramdown の仕様)
- 画像の URL は最後に `#120x120` のように width/height を入れる(AMP 用)
- サンプルコードは外部ファイルを読み込める(独自)

その他細かい挙動は最初のエントリをテストエントリにしているのでそこで確認。

`make blogtest` でこれだけをビルドもできる。

<https://blog.jxck.io/entries/2016-01-27/new-blog-start.html#test-section>

変換の実装は ./script にある。

kramdown を元に実装している。

<https://github.com/Jxck/jxck.io/blob/master/mark.rb>

- kramdown で GFM としてパースだけしている
- 取得した AST を前処理し、気に入らない部分を書き換える
  - `<section>` を入れるなど
  - いらない `<p>` を消す
  - `<table>` の中をイジる
  - etc
- 出来上がった AST を HTML に変換する
  - HTML と AMP 両方出し分けている
  - ここで属性の追加や綴じタグの削除も入れる
  - インデントには気を使ってキレイな出力を心がけている
- その他
  - 日付はディレクトリから取得
  - 最終更新はファイルから取得
  - tag ページも生成
  - podcast も同じようにやっている
  - RSS もここからできる


### 画像

画像は以下のように埋め込む。

alt, title, 画像のサイズがないといけない。


```md
![alt](image.png#120x120 "title")
```

また、この md は `<picture>` に展開され、可能であれば WebP で配信する。

なので、 imgage.webp を作って置いておく必要がある。

これは make webp でできる。

だいたい q=40 でやっている。


```sh
$ cwebp -q 40 image.png -o image.webp
```

さらに gulp から gulp-image を叩いて最適化も行っている。

これは `$ gulp` で叩けるが `make build` に入ってる。


### 圧縮

html/css/js/png/jpeg/svg ファイルは全て圧縮する。

ただし webp/rb/md/woff2 などは圧縮しない。

また、圧縮方式は gz/br であるが、モダンなブラウザはほとんどが br に対応しているため、以下のような方針をとる。

- .br は brotli コマンドで事前に作る
- .gz は h2o のオンデマンドで作る

これは `make comp` でできるが、 `make build` に入ってるため、もろもろ準備できたら最後の build で実行。


## podcast

https://github.com/Jxck/jxck.io/tree/master/mozaic.fm

基本は blog と同じように作っている。


### basic flow

- 編集した mp3 を生成
- 原稿を md で記述
- episodes 以下にエピソード番号のディレクトリを作りそこに置く
- `make podcast` で html が生成される
- `make podcastfeed` で RSS が更新される
- `make build` で全体の変換や圧縮のなどを一式行う


### md

以下のフォーマットで始める。


```md
# [tag][tag2] epXX タイトル

## Info

audio: https://files.mozaic.fm/mozaic-ep0.mp3

- published_at: 2222-22-22
- guest: [@jxck_](https://twitter.com/jxck_)
- guest: [@jxck_](https://twitter.com/jxck_)


## Theme

簡単なテーマ


## Show Note
```

- tag: タグのページ、ただし今はタグページを作ってない
- Info: 必ず最初に来る、この形で書くと mp3 がプレイヤーに埋め込まれ RSS にも乗る
- guest: 複数書ける
- Theme: これが index ページの見出し、 description 要素、 RSS の概要などに使われる

ビルドは blog と同じく mark.rb で行う。

AMP は吐かない。

mp3 のプレイヤーは [mozaic-player](https://github.com/Jxck/jxck.io/blob/master/www.jxck.io/assets/js/mozaic-player.mjs) を作っている。


### mp3

- 48kbps (mono) 96kbps(stereo)
- 44.1kHz (joint stereo)
- mp3

で編集したものを吐く。


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


## install/update

ruby と node の依存は以下で install/update できる


```sh
$ make isntall
$ make update
```

gem は .bundle/vender に入れている。


```sh
$ bundle config set path './.bundle/vendor' --local
```
