

### Zstd の辞書

Zstd は、辞書を用いる仕組みを持っているが、 Brotli のように仕様の中には含んでいない。代わりに、辞書を作る *"Training Mode"* を提供している。

複数のサンプルデータを用意し「このようなデータを送る」というサンプルデータを用意し、そこから辞書を生成することで、圧縮率を上げることができるのだ。もし v1.0.0 の `bundle.js` を辞書に含めれば、共通点の多い v1.0.1 の `bundle.js` のサイズはかなり圧縮できるだろう。

また、 zstd の圧縮/展開は brotli よりも高速であるとされているため、特に動的に圧縮するような場合に向いている。

Brotli には静的辞書があるため、自分で作る必要はないが、代わりに辞書の内容は古くなっていく問題がある。例えば、 JS に新しく長い名前の API が入ってもそれは辞書に含まれていない。ドメイン固有の頻出データも、汎用目的の静的辞書ではカバーできない。これが自分で辞書を作る方式の優位性でもある。

一方、サーバが圧縮し、クライアントが展開するモデルでは、サーバが作った辞書をクライアントに送る必要がある。

この辞書を共有する方法は、 Web における 1 つのミッシングポイントでもあった。


### テンプレート結合辞書

要するに辞書は「共通部分の固まり」と捉えることができる。

本サイトのように EJS の Template に記事を流し込んでビルドしている以上、この Template はどの記事にも現れる共通部分ととらえることができる。

ようするに、雑に作るとこういうことだ。

```console
$ cat ./blog.jxck.io/entries/**/*.html > entries.dict
```

これを用いて Brotli と Zstd それぞれで、サンプルとなる HTML を圧縮してみた。

| 辞書 |  圧縮  |  総サイズ  | 圧縮率 |
| :--: | :----: | ------: | :----: |
| none |  none  | 314,411 |   -    |
| cat  | brotli |  38,565 | 12.27% |
| cat  |  zstd  |  42,835 | 13.62% |

結論からいうと、これでは圧縮率が思ったほど上がらない。

原因は、テンプレート部分だけでは、`<main>` に流し込んだ生成後の HTML の共通部分が取れないことや、ビルド後には消える `<%= %>` テンプレート記法が残っていることが上げられる。

### brotli dictionary_generator

brotli には、サブツールとして `dictionary_generator` という C のプログラムが内包されている。

- brotli/research at master · google/brotli
  - https://github.com/google/brotli/tree/master/research

これは、あくまで研究/検証目的であり、同梱された可視化ツールなどを併用する前提だが、今回の用途でも十分使えそうだ。

辞書は事前に丹念に生成することができるため、最も貪欲なオプションを用い、生成した全ての HTML をサンプルとして辞書を生成した。

```sh
$ dictionary_generator \
    --dsh \
    -t112640 \
    dcb.dict \
    ./blog.jxck.io/entries/**/*.html
```

### zstd train mode

zstd は、コマンドの中に `--train` オプションがついている。

名前の通り、サンプルから学習して辞書を生成し、それを用いた圧縮ができる。

```sh
$ zstd --train \
    ./blog.jxck.io/entries/**/*.html \
    -o dcz.dict
$ zstd -D dcz.dict index.html
$ zstd -D dcz.dict --decompress index.html.zstd
```

ところが、ここに一個落とし穴がある。

`zstd --train` は、独自ヘッダや Huffman Encoding の統計情報など、専用のメタデータが付与された辞書を作る。それは `zstd -D` で使うことが前提だ。

ところが、 Compression Dictionary Transport で転送するのは、単にパターンが連結されただけのバイナリで、 Train Mode でつけられたメタデータなどを解釈しない。

Compression Dictionary Transport で使うには、 `-D` ではなく `--patch-from=` を使う。これは、単に辞書を手前に付けて、パターンとして認識するだけなので、独自ヘッダの部分はノイズにしかならない。

しかし、辞書を作るという点での性能は、 dictionary_generator よりも緻密に実装されていそうだ。

## 比較

zstd で辞書を作ったら zstd で、 brotli で辞書を作ったら brotli で圧縮したくなる。

しかし、 zstd の方が最初から辞書を使う前提で設計されており、辞書との相性が良さそうだ。一方、 brotli は Web ベースの静的辞書を内部にも持っているため、それも合わせて Web コンテンツの圧縮とは相性が良さそうだ。

辞書生成は、brotli は自前でビルドしないといけない上に、あくまで検証用のサンプル実装だ。一方、 zstd はコマンドに標準で入ってて使いやすい上に、作りは brotli よりも良さそうだ。

ということで、「辞書を作るツール」と「圧縮ツール」を組み合わせて、圧縮率が良くなる組み合わせを検証することにした。

まず、生成した HTML をサンプルに辞書を作り、その辞書を使って両方のアルゴリズムを試してみた。


|  辞書  |  圧縮  |  サイズ  | 圧縮率 |
| :----: | :----: | ------: | :----: |
|   -    |   -    | 314,411 |   -    |
| brotli | brotli |  25,211 | *8.02%* |
| brotli |  zstd  |  25,812 | 8.21%  |
|  zstd  | brotli |  26,089 | 8.30%  |
|  zstd  |  zstd  |  26,763 | 8.51%  |


ここでは、 brotli で辞書を作り brotli で圧縮するのが最も効果が高いことがわかる。


## 圧縮率の改善

より効果の高い辞書について考えてみる。

辞書作成ツールの気持ちになれば、まずさきに大まかな共通部分がわかっていれば、それを辞書のベースとして確定できるだろう。

そこで、辞書生成のサンプルに、ビルド済み HTML だけででなく、テンプレートを追加してみた。

また、辞書のサイズには上限があるため、もし大きくなって溢れてしまわないように、先にテンプレートを渡してみる。

```sh
$ zstd --train \
    .src/template/*.ejs \
    ./blog.jxck.io/entries/**/*.html \
    -o $DCZ_DICT

$ dictionary_generator \
    --dsh \
    -t112640 \
    $DCB_DICT \
    .src/template/*.ejs \
    ./blog.jxck.io/entries/**/*.html
```

すると、圧縮結果の改善が確認できた。

|  辞書  |  圧縮  |  サイズ  | 圧縮率 | 差分(byte) |
| :----: | :----: | ------: | :----: | ---------: |
|   -    |   -    | 314,411 |   -    |          - |
| brotli | brotli |  25,624 | *8.15%* |       -413 |
|  zstd  | brotli |  25,863 | 8.23%  |       -226 |
| brotli |  zstd  |  26,250 | 8.35%  |       +438 |
|  zstd  |  zstd  |  26,459 | 8.41%  |       -304 |



比較として、テンプレートを HTML よりも後にした場合は以下だった。

|  辞書  |  圧縮  |  サイズ  | 圧縮率 | 実験2との差 |
| :----: | :----: | ------: | :----: | ---------: |
|   -    |   -    | 314,411 |   -    |          - |
| brotli | brotli |  25,624 | *8.15%* |          0 |
|  zstd  | brotli |  26,313 | 8.37%  |       +450 |
| brotli |  zstd  |  26,250 | 8.35%  |          0 |
|  zstd  |  zstd  |  26,881 | 8.55%  |       +422 |

dictionary_generator は、サンプルの順番に依存せず同じ出力が得られていた。しかし、 zstd の方はわずかだが悪化しているようだ。

念のため、テンプレートを先に渡し、その後生成済み HTML を渡す運用にすることにした。


## 実験結果

実験の結果、本サイトに最適な辞書は以下のように作れることがわかった。

- dictionary_generator を利用し辞書を作成
  - サンプルは Template と生成済み HTML
- 圧縮は brotli を使用

ところが、 dictionary_generator は自前でビルドする必要がある。brotli リポジトリの更新に追従してメンテするのは多少面倒だ。

一方 zstd の `--train` は、標準コマンドであり zstd は brew で入れることができる。運用上は、辞書は zstd で作るほうが現実的なのでそちらを選定した。

一方、辞書は zstd で作っても、圧縮は brotli を使った方が良い結果が出ている。brotli-brotli と zstd-brotli の差は 0.1 ポイントほど、 10 ファイルでの差が 240 byte 程度であるため、ファイルの対象が増えれば誤差になっていくだろう。

したがって、本サイトでは以下の組み合わせを選ぶことにした。

```sh
$ zstd --train \
    .src/template/*.ejs \
    ./blog.jxck.io/entries/**/*.html \
    -o $DCZ_DICT

$ brotli -q 11 \
    -w 24 \
    -f \
    --dictionary=$DCZ_DICT $TARGET \
    -o ${TARGET}.dcb
```







---




## zstd dictionary

辞書を用いた圧縮は brotli, zstd どちらでも可能だが、今回は zstd の方を用いることにする。

- facebook/zstd: Zstandard - Fast real-time compression algorithm
  - https://github.com/facebook/zstd

Homebrew で入れることができる。

```console
$ brew install zstd
```

これを用いてソースとなるファイルから辞書を生成する。

```console
$ zstd --train ./blog.jxck.io/entries/**/*.html -o entries.dict
```

基本的に静的ファイルは Cache Busting しておきたいので、`Available-Dictionary` に利用される SHA256 の値でファイルをリネームしておく。

```sh
$ sha256sum ./entries.dict
91ed3fa57e7127555ce76142c9e0a7e6e194aa4b2f139ab3954f2d54068c84f2
$ mv entries.dict 91ed3fa57e7127555ce76142c9e0a7e6e194aa4b2f139ab3954f2d54068c84f2.dict
```

この辞書をデプロイする。なお、この辞書のための MIME は定義されておらず、辞書に用いたコンテンツに応じて任意のものを使ってよいとされている。

今回は raw dictionary として配るため、`Content-Type` は `application/octet-stream` としておく。

この辞書を index.html の HTML でアドバタイズする。

```html
<link rel="compression-dictionary" href="/91ed3fa57e7127555ce76142c9e0a7e6e194aa4b2f139ab3954f2d54068c84f2.dict">
```

次に、先程ビルドした brotli リポジトリのバイナリを使って、テンプレートを使って生成した各 HTML を、辞書を使って圧縮する。

```console
$ zstd -D 91ed3fa57e7127555ce76142c9e0a7e6e194aa4b2f139ab3954f2d54068c84f2.dict /path/to/entry.html
```

最後に、サーバが `Accept-Encoding: dcz` に対して、指定されたハッシュと同じ辞書で圧縮した `.dcz` ファイルを返すようにデプロイすれば完了だ。

## H2O のパッチ

本サイトは h2o でサーブしているが、h2o はまだ `.dcb` に対応していないのでパッチを当ててビルドした。

`send-compression` を有効にしたときに、拡張子付きのファイルを探してくれる部分をいじり、`.dcb` を返すようにしている。

また、`.dcb` を返す際に `Available-Dictionary` のハッシュを検証したり、`Vary` を付与するためには、conf で mruby を呼ぶか、同じくパッチを当てるしか無い。そのオーバーヘッドは検証に影響するため、ここも省略して辞書の `expires` を短くしておくにとどめた。

## 検証

Chrome Canary 117.0.5912.0 で以下のフラグを有効にし、挙動を検証した。

- #enable-compression-dictionary-transport
- #enable-compression-dictionary-transport-backend

この状態で本ブログのインデックスページにアクセスすると、以下のようにメインコンテンツの後に辞書が取得されていることがわかる。

![dictionary が取得されている devtools timeline のスクショ](./dictionary.png#3584x2108)

次に、記事に遷移すると、コンテントネゴシエーションの結果 dcb が返されていることがわかる。

![Content-Encoding dcb が取得されている devtools timeline のスクショ](./compression.png#3584x2106)

[前回の記事](/entries/2023-06-18/cookie-store-api.html) の圧縮結果を比較すると、以下のようになっている。

Caption: 圧縮率の比較
| format | byte | ratio |
|-------:|------:|------:|
| html | 27278 | 100% |
| br | 5453 | 20% |
| dcb | 4559 | 17% |

この結果では 3 point 圧縮率が向上している。全ファイルを同様に計算したが、平均で 4 point の向上だった。また、1 つだけ、結果が -1 point (br の方が dcb より 1byte 少ない)という結果もあった。

今回使った辞書のサイズは 7245 byte で、これを通常の br 圧縮して 1557 byte だったが、事前にバックグラウンドで取得することを考えると、辞書はもう少し大きくても問題はないだろう。

今回はテンプレートをただくっつけただけの辞書だったため、本文の内容の圧縮には寄与してない。brotli のデフォルト辞書がそもそも HTML を考慮していることを考えると、むしろそこに出てこない日本語部分で、頻出単語を並べるといった方法で辞書を作った方が、圧縮率は向上したかもしれない。

いずれにせよ、辞書の作り方が非常に重要になることがよくわかる。

そして、このサイトではほとんど使ってない JS/CSS の圧縮は今回対象外だったが、SPA ではそうしたアセットの圧縮こそ本仕様の本領が発揮される部分だと思われる。

そのあたりは今後の課題としたい。
