# Compression Dictionary Transport

`blog.jxck.io` 向けの shared dictionary を生成し、`dcb` payload を事前作成し、H2O で配信するための運用ドキュメントと評価ツールです。

辞書生成と圧縮そのものは Rust 製の `cdt` ツールキット (`cdt dictionary` / `cdt compress`) が担います。`cdt` は別リポジトリに切り出し済みで、このリポジトリには含みません。PATH 上の `cdt` を Makefile から呼びます。

実際に配信する辞書本体は `blog.jxck.io/dictionary/entries/<sha256hex>.dict` に置き、build 時の参照は `blog.jxck.io/dictionary/entries/active.dict` に寄せます。本文配信時の `Link` ヘッダは `h2o.dict.conf` で管理します。


## 構成

```text
cdt                      # 辞書生成・圧縮を行う Rust 製 CLI (別 repo。PATH 上に配置)

.src/dictionary/
  README.md              # このドキュメント
  sample-bench.sh        # sample/ を corpus にした軽量ベンチ (cdt 使用)
  sample/                # tracked な小さい HTML セット (軽量ベンチの corpus)
  work/
    tune.sh              # 全 entries の held-out eval でパラメータ探索 (cdt 使用)

blog.jxck.io/dictionary/
  entries/
    <hash>.dict          # 配信用 shared dictionary
    <hash>.dict.br       # 辞書自体を br 事前圧縮したもの
    active.dict          # build / mruby から参照する active dict symlink

h2o.dict.conf            # active dict の Link ヘッダ断片 (repo root)

.mruby.handler/
  dcb.rb                 # H2O 側の dcb 配信ロジック
```

役割の分担:

- `cdt` (別 repo) — 辞書生成・圧縮の実装
- `.src/dictionary/` — パラメータ評価ベンチと corpus
- `blog.jxck.io/dictionary/` — 配信用成果物
- `.mruby.handler/dcb.rb` — H2O の request-time 判定


## cdt ツールキットについて

辞書生成・圧縮は単一バイナリ `cdt` に集約されています。

- 導入は `cargo install cdt-toolkit` (Makefile の `install` / `update` ターゲットに含む)
- Makefile は絶対パスを使わず、PATH 上の `cdt` を `cdt dictionary` / `cdt compress` として呼ぶ
- 未導入時は各スクリプト・Makefile が `command -v cdt` で検出してエラーにする

圧縮パラメータ (brotli `-q 11 -w 24` / zstd `--ultra --long --patch-from` 相当) は `cdt` 内部に固定されており、CLI からは変更できません。site 側で調整できるのは辞書生成パラメータ (`-s` / `-l` / `-b` / `-f`) だけで、これは Makefile の `DICT_GENERATOR` で指定します。


## 設計方針

### 1. 配信用辞書は hash 名 1 本 + static Link ヘッダで管理する

配信用辞書は `blog.jxck.io/dictionary/entries/<sha256hex>.dict` で保持します。`make dict` は生成前に既存の `entries/*.dict` / `entries/*.dict.br` を削除し、新しい hash 名の辞書を 1 本だけ作ります。本文配信で使う `Link` ヘッダは `h2o.dict.conf` に:

```yaml
header.set: 'Link: </dictionary/entries/<sha256hex>.dict>; rel="compression-dictionary"'
```

の形で書き出し、H2O が静的に読み込みます。

- URL 自体が content address になるので、同じ URL は常に同じバイト列を指せる
- HTML に dict URL を埋め込まないため、辞書学習入力との循環依存がない
- `make dict` と `.mruby.handler/dcb.rb` / `make comp` の参照先を `entries/active.dict` に固定できる

将来 `js.dict` のような別辞書を増やすなら、`/dictionary/<id>/<hash>.dict` と `Dictionary-ID` を対応させる方針です。

### 2. H2O は配信条件の判定だけ持つ

CDT 配信ロジックは `.mruby.handler/dcb.rb` にあります。辞書生成や圧縮は build 時に終わらせ、request 時は lookup と条件判定だけです。

1. `blog.jxck.io/dictionary/entries/active.dict` の dict body から SHA-256 → `Available-Dictionary` 期待値を起動時に 1 回計算
2. request 時に `Accept-Encoding`, `Available-Dictionary`, `Dictionary-ID`, `PATH_INFO` を見て `.html.dcb` を返す

`active.dict` を更新したら h2o の reload が必要です (`make dict` は末尾で `make reload` する)。reload しないと dcb.rb の期待値と Link ヘッダがズレて dcb 配信が崩れます。


## 辞書生成アルゴリズム

`cdt dictionary` は brotli research の `dictionary_generator` にある `durchschlag` に近い block-cover 方式です。

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

Makefile の `DICT_GENERATOR` で指定している本番値です。

- `dict_size = 262144` (256KB)
- `slice_length = 12`
- `block_length = 4096`
- `min_frequency = 3`

`work/tune.sh` の held-out eval で決めた採用値で、サイズ別の探索結果は次のとおりでした (この値を決めた当時の記録):

| サイズ | `slice_length` | `block_length` | `min_frequency` | held-out brotli | held-out zstd |
|-------:|---------------:|---------------:|----------------:|----------------:|--------------:|
| 128KB  | 8  | 4096 | 3 | 244,735 | 249,593 |
| 192KB  | 8  | 4096 | 3 | 239,876 | 242,133 |
| 256KB  | 12 | 4096 | 3 | 236,596 | 237,521 |


## ベンチ

辞書生成パラメータをベンチで決め、圧縮側は最高値固定、という方針です。どちらのベンチも生成器は PATH 上の `cdt` を使います。

### `work/tune.sh` — 本番パラメータ探索 (全 corpus)

`blog.jxck.io/entries/**/*.html` を train / eval に分割し、パラメータグリッドを総当たりして本番採用値を決めるベンチです。

- train / eval split: `sha256(relative_path)` 先頭 8 hex を整数化し、`% 5 == 0` を eval (約 20%)、残りを train
- 各組で `cdt dictionary` が train から辞書を生成
- eval を `brotli -q 11 -w 24` / `zstd -22 --ultra --long --patch-from` で圧縮し合計サイズを測る
- primary = brotli 合計、tie-break = zstd 合計 で best を選ぶ
- 結果は `work/results.tsv`, `work/best.dict`, `work/best.params` に出力 (いずれも gitignore)

既定の探索グリッド (環境変数で上書き可):

- `SLICE_GRID = "8 12 16 24 32"`
- `BLOCK_GRID = "512 1024 2048 4096"`
- `FREQ_GRID = "2 3 4"`
- `DICT_SIZE = 262144`

学習入力は本番 (`make dict` の `cdt dictionary ... $(BLOG_HTML)`) と同じく entries のみです。brotli -q11 のグリッド総当たりは重いので、実行には時間がかかります。

### `sample-bench.sh` — 軽量チェック (sample corpus)

`sample/` の HTML を corpus にした軽量版です。`cdt dictionary` で辞書を 1 本生成し、各 sample を本番相当の最高圧縮で圧縮して合計サイズを出します。

- 既定パラメータは本番採用値 (`-s 262144 -l 12 -b 4096 -f 3`)、環境変数 `DICT_SIZE` / `SLICE_LENGTH` / `BLOCK_LENGTH` / `MIN_FREQUENCY` で上書き可
- 出力 (辞書・圧縮結果) は tmpdir に書き、sample/ を汚さない
- グリッド探索ではなく単一構成の size 確認。素早い what-if と回帰チェック用

`sample/` は最適化の主対象ではなく、tracked な小さい回帰用 corpus です。正式なパラメータ決定は `work/tune.sh` を使います。


## Make ターゲット

### `make` / `make all`

全体一括ビルドは廃止しました。引数なしの `make` (= `make all`) はエラーを出して停止し、`make blog` か `make podcast` を実行するよう促します。辞書の再生成は `make dict` を明示的に呼んだときだけ行います。

### `make blog`

記事 HTML / JSON の差分ビルド + index 更新を行い、最後に `make comp` を呼んで変更分の `.br` / `.html.dcb` を生成します。

### `make dict`

`blog.jxck.io/entries/**/*.html` に依存して以下を一度に行います。

1. 既存の `entries/*.dict` と `entries/*.dict.br` を削除し、`<hash>.dict` を 1 本だけ生成する
2. `active.dict` を `<hash>.dict` への symlink として張り直す
3. `h2o.dict.conf` に `<hash>.dict` を指す `Link` ヘッダを書き出す
4. 辞書自体の事前圧縮 `<hash>.dict.br` を生成する
5. 全 `.html.dcb` を新しい辞書で再生成する (`-B dcb`)
6. `make reload` で h2o を reload する

### `make comp`

通常の brotli `.br` と、辞書を使った `blog.jxck.io/entries/**/*.html.dcb` を生成します。

`.dcb` は `cdt compress` を `--output-dir .` (リポジトリルート基準) で呼びます。`cdt compress` は入力の cwd 相対パスを出力先にも保持するため、output-dir は `.` にして `$@` と一致させる必要があります。

### `make clean`

`.br` / `.dcb` / `blog.jxck.io/dictionary/**/*.dict` を削除し、`h2o.dict.conf` は placeholder に戻します。

### `make distclean`

`clean` + blog/podcast の全生成物 (HTML, JSON, index, RSS, sitemap, tags) を削除します。画像 (webp/avif) は対象外です。`make blog-clean` / `make podcast-clean` で個別にも実行できます。


## cdt ツールリファレンス

辞書生成・圧縮は `cdt` ツールキットが行います。詳細は `cdt dictionary --help` / `cdt compress --help` を参照してください。

### `cdt dictionary`

raw dictionary を生成します。生成した辞書の出力パス (`<dir>/<sha256hex>.dict`) を stdout に 1 行で出します。Makefile はこの stdout を読んで active.dict の symlink と Link ヘッダを張ります。

```sh
cdt dictionary \
  -d ./blog.jxck.io/dictionary/entries \
  -s 262144 -l 12 -b 4096 -f 3 -v \
  ./blog.jxck.io/entries/**/*.html
```

オプション (`cdt dictionary --help`):

- `-o, --output <OUTPUT>` — 指定したパスに出力
- `-d, --output-dir <DIR>` — `DIR/<sha256hex>.dict` で出力
- `-s, --size <SIZE>` — 辞書サイズ (default: 262144)
- `-l, --slice-length <N>` — slice length (default: 12)
- `-b, --block-length <N>` — block length (default: 4096)
- `-f, --min-frequency <N>` — minimum document frequency (default: 3)
- `-v, --verbose` — 進捗を stderr に出す

### `cdt compress`

raw dictionary を使って圧縮ファイルを生成します。

```sh
cdt compress \
  --dict ./blog.jxck.io/dictionary/entries/active.dict \
  --output-dir . \
  --delta-compression-brotli \
  ./blog.jxck.io/entries/2016-01-27/new-blog-start.html
```

オプション (`cdt compress --help`):

- `-d, --dict <DICT>` — 使用する辞書 (必須)
- `-o, --output-dir <DIR>` — 出力先 (default: `./work/compressed`)
- `-b, --raw-brotli` — ヘッダなし `.br`
- `-z, --raw-zstd` — ヘッダなし `.zstd`
- `--delta-compression-brotli` — CDT payload `.dcb`
- `--delta-compression-zstd` — CDT payload `.dcz`
- `-v, --verbose`

出力フラグは加算式で、いずれも指定しない場合は `.dcb` + `.dcz` を出します。

**注意:** `--output-dir` は入力の cwd 相対パスをそのまま出力先に保持します。Make から呼ぶ場合は `--output-dir .` にしないとパスが二重になります。


## H2O 配信

### 辞書配信

`h2o.conf` で `/dictionary/entries/` に対して:

```
Use-As-Dictionary: match="/entries/*", match-dest=("document"), id="entries"
Cache-Control: public, max-age=31536000, immutable
```

を付けて配信しています。URL 自体が content address (`<hash>.dict`) なので `immutable` を宣言できます。

### 本文配信

`/` 配下では `!file h2o.dict.conf` を読み、生成済み辞書に対応する:

```
Link: </dictionary/entries/<sha256hex>.dict>; rel="compression-dictionary"
```

を付けています。実際の dcb 判定は `.mruby.handler/dcb.rb` で行います。

### Dictionary-ID

`Use-As-Dictionary` の `id="entries"` は Structured Fields String です。request 側の `Dictionary-ID` も quotes を含むため、mruby では `dictionary_id == '"entries"'` で比較します。
