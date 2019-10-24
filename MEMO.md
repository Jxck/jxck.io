# jxck.io

## blog.jxck.io

https://github.com/Jxck/jxck.io/tree/master/blog.jxck.io

- 純静的ページ
- 動的なものはほぼない
- 基本は全部 Makefile に集約


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


## 画像

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


## 圧縮

html/css/js/png/jpeg/svg ファイルは全て圧縮する。

ただし webp/rb/md/woff2 などは圧縮しない。

- .gz は zopfli で作る
- .br は brotli で作る

<https://github.com/Jxck/jxck.io/blob/master/compress.sh>

これは `make comp` でできるが、 `make build` に入ってるため、もろもろ準備できたら最後の build でやる。


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


## mp3

- 48kbps (mono) 96kbps(stereo)
- 44.1kHz (joint stereo)
- mp3

で吐く。

[Tag Editor Free on the Mac App Store](https://itunes.apple.com/us/app/tag-editor-free/id984278082)

などを使ってタグをつける。

- title
- artist
- album
- genre: "Podcast"
- Comment: "epXX Title"
- Track#: ファイルの順番(sideshow があるものもあるので ep とは違う)
