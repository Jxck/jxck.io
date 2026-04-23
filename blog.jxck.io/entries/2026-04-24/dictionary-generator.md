# [cdt][zstd][brotli][compression] Compression Dictionary Transport 用の Toolkit を公開した

## Intro

Compression Dictionary Transport(CDT) は、まだ新しいプロトコルのため専用のツールが不足している。

それらを開発し公開したので、紹介する。


## CDT-Toolkit

CDT は、あらかじめ辞書を作ってクライアントに取得させておき、それを用いて転送を圧縮することができる。

ところが、この辞書を作る汎用的なツールはない。

また CDT で転送するには、作った辞書を用いて圧縮し、専用のヘッダを付ける必要がある。

ところが、この圧縮を行う専用のツールはない。

この 2 つができるツールを Rust で開発し、`cdt-toolkit` として公開した。

- Jxck/cdt-toolkit
  - https://github.com/Jxck/cdt-toolkit

crates.io にも公開している。

- cdt-toolkit - crates.io: Rust Package Registry
  - https://crates.io/crates/cdt-toolkit


## How to Use

辞書の作成は、辞書のもとになる素材を渡す。例えばビルド済みの HTML があるなら、それらをまるごと渡せば良いだろう。

```sh
cdt dictionary \
  --output html.dict \
  build/html/*.html
```

生成された辞書を用いて、以下のように HTML を事前に圧縮できる。

```sh
cdt compress \
  --dict html.dict \
  -b \
  build/html/*.html
```

これで `*.html` を辞書を使って brotli 圧縮した `*.html.dcb` が生成される。

`-z` にすれば zstd で圧縮した `*.html.zstd` だ。


## 辞書の生成

CDT で用いる辞書は、いわゆる "raw dictionary" と呼ばれるものだ。

圧縮対象の手前に付けて、参照できる形であればなんでもよい。

例えば、HTML がテンプレートから生成されているなら、そのテンプレートを結合するだけでも辞書にはなる。

```sh
cat ./template/*.ejs > template.dict
```

これによって共通部分の圧縮は可能になるが、テンプレート同士に共通の部分があれば、辞書の中に同じパターンが何度も出てきて無駄になる。

また、テンプレートの中に埋め込むコンテツに共通部分があっても、この辞書ではそこの圧縮率を上げられない。

したがって、対象となるデータから、圧縮効率が高く、なるべく小さい辞書を生成するのが望ましい。


### brotli dictionary_generator

brotli には、サブツールとして `dictionary_generator` という C のプログラムが内包されている。

- brotli/research
  - https://github.com/google/brotli/tree/master/research

```sh
$ dictionary_generator \
    --dsh \
    -t112640 \
    html.dict \
    ./**/*.html
```

これは、あくまで研究/検証目的であり、同梱された可視化ツールなどを併用する前提だ。

単体で配布されているわけでもなく、brotli をインストールしたら自動で付いてくるわけでもないため、使いにくい。


### zstd train mode

zstd コマンドには、`--train` オプションがついている。

名前の通り、サンプルから学習して辞書を生成し、それを用いた圧縮ができる。

```sh
$ zstd --train \
    ./blog.jxck.io/entries/**/*.html \
    -o dcz.dict
$ zstd -D dcz.dict index.html
$ zstd -D dcz.dict --decompress index.html.zstd
```

ところが、ここに一個落とし穴がある。

`zstd --train` は、独自ヘッダや Huffman Encoding の統計情報など、専用のメタデータが付与された辞書を作る。それは `zstd -D` コマンドで使うことが前提だ。

ところが、CDT が転送する辞書は "raw dictionary" なので、Train Mode でつけられたメタデータなどを解釈するわけではない。`zstd --patch-from` の方に相当する挙動だ。

つまり、`--train` で作った辞書は、CDT で使えない訳では無いが、独自ヘッダの後に続くコンテンツ部分が使われるだけで、ヘッダ部分はノイズにしかならない。


### CDT Dictionary Generator

CDT Toolkit であれば、以下のように渡したコンテンツを元に辞書を生成することができる。

対象は HTML, CSS, JS などなんでもよい。コンテンツタイプごとに辞書を出し分けてもよいし、全部まとめて１つの辞書を作っても良い。

```sh
cdt dictionary \
  --output html.dict \
  build/html/*.html
```

辞書を作るうえでのパラメータも調整できる。

```sh
cdt dictionary -h
  -o, --output <OUTPUT>
  -d, --output-dir <OUTPUT_DIR>
  -s, --size <SIZE>                    [default: 262144]
  -l, --slice-length <SLICE_LENGTH>    [default: 12]
  -b, --block-length <BLOCK_LENGTH>    [default: 4096]
  -f, --min-frequency <MIN_FREQUENCY>  [default: 3]
```

`-o` を指定しなければ、`<sha256>.dict` で出力することができる。

これは、ハッシュ名を計算しなくても、ファイル名から辞書を引くことができるようにするためだ。

辞書の性能は残りのパラメータで調整できる。


### `dictionary-tuning` SKILL

辞書を生成すパラメータは、圧縮対象のファイルによって変わる。

そこで、これを自動で詰めることができる SKILL を同梱している。

- skills/dictionary-tuning/SKILL.md
  - https://github.com/Jxck/cdt-toolkit/blob/main/skills/dictionary-tuning/SKILL.md

このスキルを AI に読ませることで、内部的には辞書の性能を詰めるためのスクリプトを実行しながら、対象のコンテンツを最も効率よく圧縮できる辞書を生成できる。


## CDT Header

生成した辞書を用いて、コンテンツを圧縮することは、`brotli` / `zstd` コマンドでもできる。

しかし CDT の場合は、圧縮したコンテンツに "*特定のヘッダ*" を付与する必要があるのだ。

(HTTP Header のことではなく、バイナリファイルの先頭に付与するバイト列のこと)

値は RFC に定義されており、brotli/zstd でフォーマットが変わる。

Dictionary-Compressed Brotli (`dcb`) は以下の 36 byte

```
0xff, 0x44, 0x43, 0x42 (magic)
(SHA256 32 bytes)
```

Dictionary-Compressed Zstd (`dcz`) は以下の 40 byte

```
0x5e, 0x2a, 0x4d, 0x18 (magic)
0x20, 0x00, 0x00, 0x00 (magic)
(SHA256 32 bytes)
```

これを付けずに、ただ `.br` / `.zstd` の圧縮ファイルを CDT で転送しても、ブラウザは正しく表示してくれない。

そして、この「CDT Header を付与するツール」は、ざっと調べたところ存在しなかった。

CDT Toolkit は、以下のように辞書を用いて圧縮し、このバイナリヘッダを付与したファイルを生成する。

```sh
cdt compress \
  --dict html.dict \
  -b \
  build/html/*.html
```

これは、このまま `Content-Encoding: dcb` で転送することができる。

圧縮フォーマットは `dcb`, `dcz` を選ぶことができる。


## Deploy

cdt コマンドで辞書を作り、それを用いて圧縮を行えば、あとはそれをデプロイするだけだ。

詳細は、本サイトのデプロイをベースに以下で解説している。

- Compression Dictionary Transport によるコンテンツ圧縮の最適化 | blog.jxck.io
  - https://blog.jxck.io/entries/2026-04-21/compression-dictionary-transport.html


## Outro

Compression Dictionary Transport 用のツールキットを開発し、公開した。