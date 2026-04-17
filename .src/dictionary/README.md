# Compression Dictionary Transport

`blog.jxck.io` 向けの shared dictionary を生成し、`dcb` payload を事前作成し、H2O で配信するためのツール群です。

実際に配信する辞書本体は `blog.jxck.io/dictionary/entries.dict` に置きます。


## 構成

```text
.src/dictionary/
  dict-generator.rb      # raw dictionary を生成する
  compress.sh            # raw dictionary を使って br / zstd / dcb / dcz を作る
  compression-test.sh    # sample/ 上で比較ベンチを回す
  hash.rb                # dict の SHA-256 を :base64: で出す
  test.sh                # single file に対する単発確認
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

役割の分担:

- `.src/dictionary/` — 生成、圧縮、評価、実験
- `blog.jxck.io/dictionary/` — 配信用成果物
- `.mruby.handler/dcb.rb` — H2O の request-time 判定


## 設計方針

### 1. 生成器は単一ファイル、依存なし

辞書生成器は `dict-generator.rb` です。Ruby 単一ファイルで、外部ライブラリに依存しません。

- 辞書生成のロジックを読みやすく保つため
- どの環境でもすぐ実行できるようにするため
- tuning 中にコードの追跡をしやすくするため

速度よりも、まずアルゴリズムの透明性を優先しています。

### 2. 対象列挙は Make、ビルド処理は build.ts / ツール群

どのファイルを処理するかは `Makefile` が管理し、実際の HTML / JSON 生成は `.src/build.ts`、辞書生成は `dict-generator.rb`、圧縮は `compress.sh` が担当します。差分判定は Make のパターンルールに任せ、別スクリプトで再実装する方向は採りません。

### 3. 配信用辞書は固定名 `entries.dict`

`<sha256hex>.dict` + symlink 案は検討の末やめました。

- H2O 側で辞書本体から SHA-256 を 1 回だけ計算できる
- `Available-Dictionary` の照合にファイル名ハックが不要
- Make / H2O / 手元確認の参照先が固定になる
- 辞書が 1 本の間は、hash 名運用の利点より複雑さの方が大きい

将来 `js.dict` のような別辞書を増やすなら、`id` ごとに固定名 1 本を持つ方針です。

### 4. H2O は配信条件の判定だけ持つ

CDT 配信ロジックは `.mruby.handler/dcb.rb` にあります。辞書生成や圧縮は build 時に終わらせ、request 時は lookup と条件判定だけです。

1. `entries.dict` の body から SHA-256 → `Available-Dictionary` 期待値を起動時に 1 回計算
2. request 時に `Accept-Encoding`, `Available-Dictionary`, `Dictionary-ID`, `PATH_INFO` を見て `.html.dcb` を返す


## 辞書生成アルゴリズム

`dict-generator.rb` は brotli research の `dictionary_generator` にある `durchschlag` に近い block-cover 方式です。

1. 固定長 `slice_length` の slice を全ファイルから抽出する
2. 同じ slice が何ファイルに出たかを document frequency として数える
3. 固定長 `block_length` の window ごとに、block 内のユニーク slice の active score 合計を計算する
4. 最も score の高い block を選ぶ (max-heap + lazy rescore)
5. score 0 の head / tail を trim する
6. 同じ元ファイル内の採用済み byte と重なる部分を差し引く
7. その block が覆った slice を無効化する
8. 辞書サイズ上限まで繰り返す
9. 採用 range を source-order で連結する

ポイント:

- slice は固定長のみ
- frequency は出現回数ではなく document frequency (同一ファイル内の重複は 1 回扱い)
- 入力順に依存しないよう、内部で相対パス昇順に正規化してから処理する

### 採用パラメータ

`work/tune.sh` で held-out eval を回して決めた値です。

- `dict_size = 262144` (256KB)
- `slice_length = 12`
- `block_length = 4096`
- `min_frequency = 3`

サイズ別の tuning 結果:

| サイズ | `slice_length` | `block_length` | `min_frequency` | held-out brotli | held-out zstd |
|-------:|---------------:|---------------:|----------------:|----------------:|--------------:|
| 128KB  | 8  | 4096 | 3 | 244,735 | 249,593 |
| 192KB  | 8  | 4096 | 3 | 239,876 | 242,133 |
| 256KB  | 12 | 4096 | 3 | 236,596 | 237,521 |


## 学習データと評価データ

### 学習入力

- `blog.jxck.io/entries/**/*.html` の train 側

### 評価方式

主評価は `sample/` ではなく、`entries/**/*.html` を train / eval に deterministic に分けた held-out eval です。

`work/tune.sh` では:

- `sha256(relative_path)` の先頭 8 hex を整数化
- `value % 5 == 0` を eval (約 20%)
- それ以外を train

`sample/` は最適化対象ではなく、tracked な小さい回帰ベンチです。

### 評価指標

- primary: brotli の合計圧縮サイズ
- tie-break: zstd の合計圧縮サイズ

主目的は CDT 向け shared dictionary の質の改善であり、brotli 側の圧縮率を最優先しています。


## Make ターゲット

### `make all` (= `make`)

以下を順に実行します。

1. `make blog` — 記事 HTML / JSON の差分ビルド + index 更新
2. `make podcast` — podcast の全エピソードビルド
3. `make dict` — `entries.dict` の再生成
4. `make comp` — `.br` と `.html.dcb` の生成

### `make dict`

`blog.jxck.io/entries/**/*.html`, `.src/dictionary/dict-generator.rb` に依存して `blog.jxck.io/dictionary/entries.dict` を更新します。

### `make comp`

通常の brotli `.br` と、辞書を使った `blog.jxck.io/entries/**/*.html.dcb` を生成します。

`.dcb` は `compress.sh` を `--output-dir .` (リポジトリルート基準) で呼びます。`compress.sh` は入力の cwd 相対パスを出力先にも保持するため、output-dir は `.` にして `$@` と一致させる必要があります。

### `make clean`

`.br` / `.dcb` / `blog.jxck.io/dictionary/*.dict` を削除します。

### `make distclean`

`clean` + blog/podcast の全生成物 (HTML, JSON, index, RSS, sitemap, tags) を削除します。画像 (webp/avif) は対象外です。`make blog-clean` / `make podcast-clean` で個別にも実行できます。


## スクリプトリファレンス

### `dict-generator.rb`

raw dictionary を生成します。

```sh
ruby ./.src/dictionary/dict-generator.rb \
  -o ./blog.jxck.io/dictionary/entries.dict \
  -s 262144 -l 12 -b 4096 -f 3 -v \
  ./blog.jxck.io/entries/**/*.html
```

オプション:

- `-o FILE` — 指定したパスに出力
- `-d DIR` — `DIR/<sha256hex>.dict` で出力 (`-o` と排他)
- `-s` — 辞書サイズ (default: 262144)
- `-l` — slice length (default: 12)
- `-b` — block length (default: 4096)
- `-f` — minimum document frequency (default: 3)
- `-v` — 進捗を stderr に出す

### `compress.sh`

raw dictionary を使って圧縮ファイルを生成します。

```sh
./.src/dictionary/compress.sh \
  --dict ./blog.jxck.io/dictionary/entries.dict \
  --output-dir . \
  -dcb \
  ./blog.jxck.io/entries/2016-01-27/new-blog-start.html
```

出力オプション (加算式、未指定時は dcb + dcz):

- `-br` / `--raw-brotli` — ヘッダなし `.br`
- `-zstd` / `--raw-zstd` — ヘッダなし `.zstd`
- `-dcb` / `--delta-compression-brotli` — CDT payload `.dcb`
- `-dcz` / `--delta-compression-zstd` — CDT payload `.dcz`

圧縮パラメータ (固定):

- brotli: `-q 11 -w 24`
- zstd: `-22 --ultra --long=23 --patch-from`

**注意:** `--output-dir` は入力の cwd 相対パスをそのまま出力先に保持します。Make から呼ぶ場合は `--output-dir .` にしないとパスが二重になります。

### `work/check.sh`

小さい corpus で dict-generator.rb の性質を検証します。

- document frequency が file count であること
- file boundary をまたがないこと
- trim / overlap subtraction が効くこと
- size cap を守ること
- deterministic であること

### `work/tune.sh`

held-out eval でパラメータグリッドを探索します。結果は `work/results.tsv`, `work/best.dict`, `work/best.params` に出ます。

既定の探索グリッド:

- `slice_length = 8 12 16 24 32`
- `block_length = 512 1024 2048 4096`
- `min_frequency = 2 3 4`
- `dict_size = 262144`

### `compression-test.sh`

`sample/` 上で `dictionary_generator`, `zstd --train`, `dict-generator.rb`, `cat` の 4 辞書を比較します。回帰用であり、採否の主判断には使いません。


## H2O 配信

### 辞書配信

`h2o.conf` で `/dictionary/entries.dict` に対して:

```
Use-As-Dictionary: match="/entries/*", match-dest=("document"), id="entries"
```

を付けて配信しています。

### 本文配信

`/` 配下で:

```
Link: </dictionary/entries.dict>; rel="compression-dictionary"
```

を付けています。実際の dcb 判定は `.mruby.handler/dcb.rb` で行います。

### Dictionary-ID

`Use-As-Dictionary` の `id="entries"` は Structured Fields String です。request 側の `Dictionary-ID` も quotes を含むため、mruby では `dictionary_id == '"entries"'` で比較します。
