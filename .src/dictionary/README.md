# Compression Dictionary Transport

`blog.jxck.io` 向けの shared dictionary を生成し、`dcb` / `dcz` payload を作り、最終的に H2O で配信するための作業ディレクトリです。

このディレクトリは **ツールと検証用** です。  
実際に配信する辞書本体は [`blog.jxck.io/dictionary/entries.dict`](/Users/jxck/develop/jxck.io/blog.jxck.io/dictionary/entries.dict) に置きます。


## 目的

このリポジトリでやりたいことは 3 つです。

1. `blog.jxck.io/entries/**/*.html` に効く raw dictionary を自前で生成する
2. その辞書を使って `*.html.dcb` を事前生成する
3. H2O が `Available-Dictionary` / `Dictionary-ID` を見て `dcb` を返せるようにする

ここで扱う辞書は RFC 9842 の Compression Dictionary Transport 用です。  
辞書本体は raw bytes として扱い、レスポンス側は `dcb` または `dcz` として配信します。


## 今の構成

```text
.src/dictionary/
  dict-generator.rb      # raw dictionary を生成する
  compress.sh            # raw dictionary を使って br / zstd / dcb / dcz を作る
  compression-test.sh    # sample/ 上で比較ベンチを回す
  hash.rb                # dict の SHA-256 を :base64: で出す
  test.sh                # new-blog-start.html に対する単発確認
  sample/                # 回帰用の小さい HTML セット
  work/
    check.sh             # 小さい corpus で性質検証
    tune.sh              # held-out eval でパラメータ探索
    best.dict            # tune.sh の最良辞書
    best.params          # tune.sh の最良パラメータ

blog.jxck.io/dictionary/
  entries.dict           # 配信用の採用済み辞書

.mruby.handler/
  dcb.rb                 # H2O 側の dcb 配信ロジック
```

役割は明確に分けています。

- `.src/dictionary/`
  - 生成、圧縮、評価、実験
- `blog.jxck.io/dictionary/`
  - 配信用成果物
- `.mruby.handler/dcb.rb`
  - H2O の request-time 判定


## 設計方針

### 1. 生成器は単一ファイル、依存なし

辞書生成器は [`dict-generator.rb`](/Users/jxck/develop/jxck.io/.src/dictionary/dict-generator.rb) です。  
Ruby 単一ファイルで、外部ライブラリに依存しません。

理由は以下です。

- 辞書生成のロジックを読みやすく保つため
- どの環境でもすぐ実行できるようにするため
- tuning 中にコードの追跡をしやすくするため

速度よりも、まずアルゴリズムの透明性を優先しています。

### 2. 対象列挙と依存解決は Make、ビルド処理は `build.ts`

この repo では、どのファイルを処理するかは `Makefile` が管理し、  
実際に HTML / JSON を生成する処理は [`.src/build.ts`](/Users/jxck/develop/jxck.io/.src/build.ts) が担当します。

同じ考え方で、辞書生成や `dcb` 生成も Make に乗せています。

- `make blog`
  - 記事 HTML / JSON の差分ビルド
- `make dict`
  - `entries.dict` の再生成
- `make comp`
  - `.br` と `.html.dcb` の再生成

差分判定は Make に任せます。  
差分一覧を別スクリプトで再実装すると、template や build script 依存を二重管理することになるため、その方向は採っていません。

### 3. 配信用辞書は固定名 `entries.dict`

途中では `<sha256hex>.dict` を実体にして symlink を張る案も試しましたが、現在はやめています。

今は常に:

- [`blog.jxck.io/dictionary/entries.dict`](/Users/jxck/develop/jxck.io/blog.jxck.io/dictionary/entries.dict)

だけを配信します。

理由は以下です。

- H2O 側で辞書本体から `SHA-256` を 1 回だけ計算できる
- `Available-Dictionary` の照合にファイル名ハックが不要
- Make / H2O / 手元確認の参照先が固定になる
- 辞書が 1 本の間は、hash 名運用の利点より複雑さの方が大きい

将来 `js.dict` のような別辞書を増やすなら、`id` ごとに固定名 1 本を持つ方針です。

### 4. H2O は `dcb` 配信条件の判定だけ持つ

H2O の CDT 配信ロジックは [`.mruby.handler/dcb.rb`](/Users/jxck/develop/jxck.io/.mruby.handler/dcb.rb) にあります。  
ここでは次だけを行います。

- `entries.dict` から `Available-Dictionary` の期待値を起動時に 1 回だけ計算
- `Accept-Encoding` に `dcb` があるか確認
- `Available-Dictionary` と `Dictionary-ID` が一致するか確認
- `PATH_INFO` から対応する `.html.dcb` を引く

辞書生成や圧縮は build 時に終わらせ、request 時は lookup と条件判定だけに寄せています。


## 辞書生成アルゴリズム

[`dict-generator.rb`](/Users/jxck/develop/jxck.io/.src/dictionary/dict-generator.rb) は、brotli research の `dictionary_generator` にある `durchschlag` に近い block-cover 方式です。

流れは以下です。

1. 固定長 `slice_length` の slice を全ファイルから抽出する
2. 同じ slice が何ファイルに出たかを document frequency として数える
3. 固定長 `block_length` の window ごとに、その block 内のユニーク slice の active score 合計を計算する
4. 最も score の高い block を選ぶ
5. score 0 の head / tail を trim する
6. 同じ元ファイル内で、すでに採用済みの byte と重なる部分を引く
7. その block が覆った slice を無効化する
8. 辞書サイズ上限まで繰り返す
9. 採用 range を source-order で連結する

ポイントは以下です。

- slice は固定長のみ
- frequency は出現回数ではなく document frequency
- 同一ファイル内の重複出現は 1 回扱い
- 候補 block は max-heap + lazy rescore
- 辞書連結順は source-order

### 採用パラメータ

現在の既定値は以下です。

- `dict_size = 262144`
- `slice_length = 12`
- `block_length = 4096`
- `min_frequency = 3`

これは `work/tune.sh` で held-out eval を回して決めた値です。


## 学習データと評価データ

### 学習に使うもの

- `.src/template/*.ejs`
- `blog.jxck.io/entries/**/*.html`

template を入れる理由は、最終 HTML に出る共通断片を辞書へ寄せるためです。

### 評価に使うもの

主評価は `sample/` ではなく、`entries/**/*.html` を train / eval に deterministic に分けた held-out eval です。

[`work/tune.sh`](/Users/jxck/develop/jxck.io/.src/dictionary/work/tune.sh) では:

- `sha256(relative_path)` の先頭 8 hex を整数化
- `value % 5 == 0` を eval
- それ以外を train

として約 20% を eval に回します。

`sample/` は最適化対象ではなく、tracked な小さい回帰ベンチとして扱います。


## Make との関係

今の build フローは以下です。

### `make blog`

- 各 `.md` から `.html` と `.json` を生成
- `index.html`, `atom.xml`, `sitemap.xml`, `tags/index.html` を更新
- `.dcb` は作らない

### `make dict`

- `.src/template/*.ejs`
- `blog.jxck.io/entries/**/*.html`
- `.src/dictionary/dict-generator.rb`

に依存して、[`blog.jxck.io/dictionary/entries.dict`](/Users/jxck/develop/jxck.io/blog.jxck.io/dictionary/entries.dict) を更新します。

### `make comp`

- 通常の `.br`
- `blog.jxck.io/entries/**/*.html.dcb`

を生成します。

`.dcb` は [`compress.sh`](/Users/jxck/develop/jxck.io/.src/dictionary/compress.sh) を使って作ります。

### `make all`

以下を順に実行します。

1. `make blog`
2. `make podcast`
3. `make dict`
4. `make comp`


## スクリプトの役割

### `dict-generator.rb`

raw dictionary を生成します。

主なオプション:

- `-o FILE`
  - 指定したパスに出力
- `-d DIR`
  - `DIR/<sha256hex>.dict` で出力
- `-s`
  - 辞書サイズ
- `-l`
  - slice length
- `-b`
  - block length
- `-f`
  - minimum frequency
- `-v`
  - 進捗を `stderr` に出す

成功時は、実際に書いた辞書ファイルのパスを `stdout` に 1 行だけ出します。

### `compress.sh`

raw dictionary を使って、入力ファイルから以下を生成します。

- `*.br`
- `*.zstd`
- `*.dcb`
- `*.dcz`

既定では `*.dcb` と `*.dcz` を出します。

オプション:

- `-br` / `--raw-brotli`
- `-zstd` / `--raw-zstd`
- `-dcb` / `--delta-compression-brotli`
- `-dcz` / `--delta-compression-zstd`

指定は排他ではなく加算式です。  
たとえば `-br -dcb` なら raw Brotli と CDT Brotli を同時に出します。

圧縮パラメータは固定です。

- brotli: `-q 11 -w 24`
- zstd: `-22 --ultra --long=23 --patch-from`

### `work/check.sh`

小さい corpus で以下を検証します。

- document frequency が file count になっていること
- file boundary をまたがないこと
- trim が効くこと
- overlap subtraction が効くこと
- size cap を守ること
- deterministic であること

### `work/tune.sh`

held-out eval を使って `slice_length`, `block_length`, `min_frequency` を探索します。  
結果は `work/results.tsv`, `work/best.dict`, `work/best.params` に出ます。

### `compression-test.sh`

`sample/` 上で以下を比較します。

- `dictionary_generator`
- `zstd --train`
- `dict-generator.rb`
- `cat`

これは回帰用です。採否の主判断には使いません。

### `test.sh`

`new-blog-start.html` に対して `entries.dict` を使い、単発で `.dcb` を作ります。  
H2O 配信導線の確認用です。


## H2O 側の配信

### 辞書配信

[h2o.conf](/Users/jxck/develop/jxck.io/h2o.conf) では:

- `/dictionary/entries.dict`

に対して:

- `Use-As-Dictionary: match="/entries/*", match-dest=("document"), id="entries"`

を付けて配信しています。

### 本文配信

`/` 配下では:

- `Link: </dictionary/entries.dict>; rel="compression-dictionary"`

を付けています。

実際の `dcb` 判定は [`.mruby.handler/dcb.rb`](/Users/jxck/develop/jxck.io/.mruby.handler/dcb.rb) で行います。

この handler は:

1. `entries.dict` の body から `SHA-256`
2. そこから `Available-Dictionary` 期待値を生成
3. request 時に
   - `Accept-Encoding`
   - `Available-Dictionary`
   - `Dictionary-ID`
   - `PATH_INFO`
   を見て `.html.dcb` を返す

という構成です。

### `Dictionary-ID` について

`Use-As-Dictionary` の `id="entries"` は Structured Fields String です。  
そのため request 側の `Dictionary-ID` も quotes を含んだ値になります。

mruby では:

```ruby
dictionary_id == '"entries"'
```

の形で比較します。


## 実行例

### 辞書を作る

```sh
ruby ./.src/dictionary/dict-generator.rb \
  -o ./blog.jxck.io/dictionary/entries.dict \
  -s 262144 \
  -l 12 \
  -b 4096 \
  -f 3 \
  -v \
  ./.src/template/*.ejs \
  ./blog.jxck.io/entries/**/*.html
```

### `new-blog-start.html` の `.dcb` を作る

```sh
./.src/dictionary/compress.sh \
  --dict ./blog.jxck.io/dictionary/entries.dict \
  --output-dir ./blog.jxck.io/entries/2016-01-27 \
  -dcb \
  ./blog.jxck.io/entries/2016-01-27/new-blog-start.html
```

### 比較ベンチを回す

```sh
./.src/dictionary/compression-test.sh
```

### 性質検証を回す

```sh
./.src/dictionary/work/check.sh
```

### tuning を回す

```sh
./.src/dictionary/work/tune.sh
```


## 今後の整理候補

今は動いていますが、将来見直す可能性がある点です。

- `make clean` が `blog.jxck.io/dictionary/*.dict` を全部消すこと
- H2O 側は `dcb` のみで、`dcz` 配信導線はまだ入っていないこと
- `.mruby.handler/dcb.rb` は実験が固まったら、必要に応じて H2O 本体機能化を検討すること

現時点では、まず `entries.dict` 1 本で `new-blog-start.html` を含む `/entries/*` の配信条件を安定させることを優先しています。
