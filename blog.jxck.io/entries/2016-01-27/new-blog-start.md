# [web][blog] Blog を移転しました

## Intro

長いこと [はてな blog](https://jxck.hatenablog.com/) をメインにし、他にも [Qiita](https://qiita.com/jxck_) や [Tumblr](http://jxck.tumblr.com/) を使って色々書いて来たが、そろそろ自分のドメインに全部集約していこうかと思う。


## motivation

最近、メディア系は独自のサイトを持つよりも、Medium などのサービス経由で流入してもらわないと辛いという話をよく聞くので、その意味では完全に逆行しているかもしれない。

しかし、別に PV を稼ぐためにブログを書いているわけでもないので、むしろ技術的にも自分で色々試せる自由な環境を持ち、特定のサービスに依存せずやってみるのも良いと考える。

むしろ、ドメイン自体は結構前に取っていたので、遅すぎるくらいなのだが、やっと重い腰を上げた。

まだ作り途中であり、一気に移行するのは難しいが、徐々に作りながらやっていこうと思う。


## test section

以降は、本サイトのマークアップやスタイルをテストするためのセクションである。

対応している記法を列挙し、挙動を確認する。


### heading section 3

ここは `<h3>` セクションである。


#### heading section 4

ここは `<h4>` セクションである。


### リストスタイル

リストスタイルは 2 つある

1. ordered list
2. un-ordered list

それぞれは使うタグが違う

- ここはリストスタイルである
- unordered list は `<ul>` を用いて表現する
- `<li>` の前には markdown と同じく `-` を表示する
  - 入れ子にも対応している
- しかし 2 段階以上の深さは使わないようにする
  - リストの中で引用もできる
  - > ここは `<blockquote>` です


### 定義リスト

定義リストは `<dl>` を用いて表現する

定義リスト(description list)
: `<dl>` を用いる
定義(description term)
: `<dt>` を用いる
説明(description details)
: `<dd>` を用いる


## 引用

引用は `<blockquote>` を用いて表現する。

> 他のサイトなどから引用する場合は `<blockquote>` を用いて表現する。
> 複数行あると `<p>` に展開される
> 引用元の URL は `<cite>` を用いてマークアップする
> --- [example.com](https://example.com)


## テーブル

テーブルは `<table>` タグを用いて表現する。

Caption: キャプションは必須
| 範囲             | 文字数 |
|:-----------------|-------:|
| 基本ラテン文字   |     94 |
| CJK 記号と句読点 |     11 |
| ひらがな         |     81 |
| カタカナ         |     83 |
| 半角形と全角形   |      0 |
| 常用漢字         |   2136 |
| 記号             |      1 |
| 不要文字         |   - 23 |
| 追加更新         |     13 |
| 合計             |   2396 |

半角の例

Caption: webp と圧縮率
| file type | size | ratio |
|:----------|-----:|------:|
| .webp     | 9474 |  100% |
| .webp.gz  | 2609 |   28% |
| .webp.br  | 2544 |   27% |


## Image

画像は `<picture>` タグを用いて表現する。

![jxck](jxck.png#300x300 "jxck logo")

必ず `.webp` も提供する必要がある。

webp の推奨は以下

```sh
$ cwebp -q 40 img.png -o img.webp
```


## Video

markdown 上は画像と同じ記法で、拡張子が `mp4` の場合は `<video>` で展開する。

![dummy video](dummy_video.mp4#1000x2000)

必ず `.mp4`、`.webm` 両方を提供する必要がある。

QuickTime で screen record を取り gif 的に表示するなら推奨は以下。

```console
# メタデータを消し、frame rate を 24 にし、Audio を消す
$ ffmpeg -i video.mov -map_metadata -1 -r 24 -an video.webm
$ ffmpeg -i video.mov -map_metadata -1 -r 24 -an video.mp4
```


### サンプルコード

インラインの場合は `<code>` タグを用いて表現する。

コードブロックの場合は `<pre>` と `<code>` を用いて表現する。

```http
# デフォルトリクエスト
GET / HTTP/1.1
Host: example.com
User-Agent: browser
Accept-Encoding: br, gz
Accept-Language: ja-JP
```

```js
class Test {
  constructor(arg) {
    this.arg = arg
  }
  print() {
    console.log(this.arg)
  }
}

const test = new Test('hello')
test.print() // hello
```

ファイルからコードを読むこともできる。以下ハイライトテスト用。

```
no tag
```

```text
hello world
```

```js:sample.js
```