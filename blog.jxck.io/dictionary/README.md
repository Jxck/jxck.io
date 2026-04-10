# Compression Dictionary Transport - 辞書生成と圧縮ベンチマーク

## 設計方針

RFC 9842 (Compression Dictionary Transport) では、辞書を raw なバイト列として扱う。
サーバは辞書を配信し、ブラウザがキャッシュし、その後のレスポンスを dcb / dcz で差分圧縮する。

このディレクトリでは、`blog.jxck.io` の HTML から raw dictionary を生成し、brotli / zstd の両方で圧縮率を比較する。

### 辞書生成ツール

| ツール | 方式 | 特徴 |
|--------|------|------|
| `zstd --train` | zstd cover / fastCover 系 | formatted dictionary を生成するが `--patch-from` で raw 的に比較できる |
| `dictionary_generator` | brotli research の durchschlag | 固定 `slice_len` と `block_len` で高密度 block を選ぶ |
| `dict-generator.rb` | 自作 Ruby 実装 | durchschlag 寄りの block-cover。単一ファイル、依存なし |

### dict-generator.rb のアルゴリズム

現行の `dict-generator.rb` は、以前の multi-length range greedy をやめて、`dictionary_generator` の `durchschlag` に近い block-cover 方式へ置き換えている。

1. **固定長 slice の抽出** - `slice_length` バイトの slice を各ファイルから 1 byte step で取り出す
2. **document frequency 集計** - 同じ slice が何ファイルに出たかを数える。同一ファイル内の重複出現は 1 回として扱う
3. **固定長 block の採点** - `block_length` バイトの window ごとに、その中に含まれるユニーク slice の frequency 合計を score にする
4. **貪欲選択** - score が最も高い block を選ぶ
5. **trim と overlap 除去** - score 0 の head / tail を落とし、同じ元ファイル上で既採用 range と重なる byte を差し引く
6. **covered slice の無効化** - 採用 block が覆った slice の score を 0 にし、次の block を再評価する
7. **source-order で連結** - 最後に採用 range を元ファイル順・位置順で連結して辞書にする

入力順に結果が依存しないよう、受け取ったパスは内部で相対パス昇順に正規化してから処理する。
そのため、`template/*.ejs` を先頭に置くかどうかで結果が変わる設計にはしていない。

現在の既定値は以下。

- `dict_size = 262144`
- `slice_length = 12`
- `block_length = 4096`
- `min_frequency = 3`

`dict-generator.rb` の出力は 2 通りある。

- `-o FILE`: 指定したパスへその名前で出力する
- `-d DIR`: `DIR/<sha256hex>.dict` という名前で出力する

`-o` と `-d` は排他で、同時指定はできない。`-d` のファイル名は CDT の辞書 ID と同じ SHA-256 を使うが、`Available-Dictionary` が base64 表現なのに対し、ファイル名は安全性のため hex 表現にしている。

## ディレクトリ構成

```text
blog.jxck.io/dictionary/
  compress.sh          # 生成済み辞書で dcb / dcz を作る
  compression-test.sh  # sample/ 用の比較スクリプト
  dict-generator.rb    # 自作辞書生成ツール
  hash.rb              # SHA-256 ハッシュ計算
  sample/              # 小さい回帰用サンプルと生成物
    *.html             # 10 個のサンプル HTML (symlink)
    *.dict             # 生成された辞書
    *.zstd *.br        # 圧縮結果
  work/                # tuning / check 用のスクリプトと生成物
    check.sh           # 軽量な性質検証
    tune.sh            # held-out eval でのパラメータ探索
```

`sample/` は tracked な小さい回帰セットで、`work/` は tuning / 検証用のスクリプトと作業領域として使う。

## 評価方針

### 学習入力

- `.src/template/*.ejs`
- `blog.jxck.io/entries/**/*.html` の train 側

`template/*.ejs` は、実 HTML に出る共有断片を辞書へ入れやすくするために学習に含める。
ただし、評価には使わない。

### 主評価

主評価は `sample/` ではなく、`entries/**/*.html` を train / eval に deterministic に分割した held-out eval で行う。

- `sha256(relative_path)` の先頭 8 hex を整数化
- `value % 5 == 0` を eval
- それ以外を train

つまり、eval は全 entries の約 20% で固定される。
`sample/` は最適化対象ではなく、最後の連続性確認用とする。

### 評価指標

- primary: brotli の合計圧縮サイズ
- tie-break: zstd の合計圧縮サイズ

今回の主目的は CDT 向け shared dictionary の質の改善であり、最優先は brotli 側の圧縮率に置いている。

## 実行方法

### 性質検証

```sh
./blog.jxck.io/dictionary/work/check.sh
```

以下を小さい corpus で確認する。

- document frequency が出現回数ではなく出現ファイル数になっていること
- slice / block がファイル境界をまたがないこと
- trim で低価値 head / tail が落ちること
- overlap 差し引きで同じ byte を二重に入れないこと
- size cap を超えないこと
- 同じ入力から同じ辞書が再生成されること

### パラメータ探索

```sh
./blog.jxck.io/dictionary/work/tune.sh
```

既定の探索グリッドは以下。

- `slice_length = 8 12 16 24 32`
- `block_length = 512 1024 2048 4096`
- `min_frequency = 2 3 4`
- `dict_size = 262144`

サイズ別の full tuning 結果は以下。

| サイズ | `slice_length` | `block_length` | `min_frequency` | held-out brotli | held-out zstd |
|-------:|---------------:|---------------:|----------------:|----------------:|--------------:|
| 128KB  | 8  | 4096 | 3 | 244,735 | 249,593 |
| 192KB  | 8  | 4096 | 3 | 239,876 | 242,133 |
| 256KB  | 12 | 4096 | 3 | 236,596 | 237,521 |

圧縮率最優先の採用値は `256KB / 12 / 4096 / 3` とした。

出力は `work/` に保存される。

- `work/train.list`
- `work/eval.list`
- `work/results.tsv`
- `work/best.dict`
- `work/best.params`

### sample/ での最終比較

```sh
./blog.jxck.io/dictionary/compression-test.sh
```

これは `sample/*.html` に対して、`dictionary_generator`, `zstd --train`, `dict-generator.rb`, `cat` を使った辞書を比較する。
主評価ではないが、tracked な小さい回帰ベンチとして残している。

### 生成済み辞書での圧縮

既定では、RFC 9842 の fixed header を付けた `*.dcb` と `*.dcz` を両方生成する。

```sh
./blog.jxck.io/dictionary/compress.sh \
  --dict ./blog.jxck.io/dictionary/work/best.dict \
  --output-dir ./blog.jxck.io/dictionary/work/compressed \
  ./blog.jxck.io/entries/**/*.html
```

`dcb` だけ出したい場合は、出力種別を明示する。

```sh
./blog.jxck.io/dictionary/compress.sh \
  -dcb \
  --dict ./blog.jxck.io/dictionary/work/best.dict \
  --output-dir ./blog.jxck.io/dictionary/work/compressed \
  ./blog.jxck.io/entries/**/*.html
```

このスクリプトは、raw dictionary を使って各 HTML を圧縮し、`work/compressed/` 配下に元の相対パスを保ったまま出力する。出力指定は排他ではなく加算式なので、`-br -dcb` のように raw と CDT を混在指定できる。

出力オプションは以下。

- `-br` / `--raw-brotli` でヘッダ無し `*.br` を生成する
- `-zstd` / `--raw-zstd` でヘッダ無し `*.zstd` を生成する
- `-dcb` / `--delta-compression-brotli` で `*.dcb` を生成する
- `-dcz` / `--delta-compression-zstd` で `*.dcz` を生成する

何も指定しなければ、従来どおり `*.dcb` と `*.dcz` の両方を生成する。

圧縮パラメータは以下で固定している。

- `brotli` は `-q 11 -w 24`、`zstd` は `-22 --ultra --long=23 --patch-from` を使う

RFC 9842 では、`dcb` は `0xff 44 43 42 + SHA-256(dict)`、`dcz` は `0x5e 2a 4d 18 20 00 00 00 + SHA-256(dict)` の fixed header を持つため、`compress.sh` はそのヘッダを付与してから出力する。

合計サイズの集計は以下。

```sh
for ext in br.br zstd.br rb.br br.zstd zstd.zstd rb.zstd cat.br cat.zstd; do
  total=0
  for f in blog.jxck.io/dictionary/sample/*.html; do
    v=$(wc -c < "${f}.${ext}")
    total=$((total + v))
  done
  echo "$ext: $total"
done
```

## 現在の結果

### sample/ 上の比較 (採用設定: 256KB / 12 / 4096 / 3)

採用した tuned dictionary を `sample/*.html` に当てた結果は以下。

|  辞書  |  圧縮  |  合計サイズ  | 圧縮率 |
| :----: | :----: | ----------: | :----: |
|   rb   | brotli |      24,516 | 7.80%  |
| brotli | brotli |      23,975 | 7.63%  |
|   rb   |  zstd  |      24,700 | 7.86%  |
| brotli |  zstd  |      24,046 | 7.65%  |
|  zstd  | brotli |      24,670 | 7.85%  |
|  zstd  |  zstd  |      24,692 | 7.85%  |
|  cat   | brotli |      38,565 | 12.27% |
|  cat   |  zstd  |      42,835 | 13.62% |

### 傾向

- 採用値は held-out eval を最優先して選んでいる
- `sample/` だけを見ると、以前の `16 / 1024 / 2` の方が小さい
- これは `sample/` が最適化対象ではなく、小さい回帰ベンチだから
- `cat` は依然として大きく劣る

この結果は `sample/` 上の回帰ベンチであり、採否は held-out eval の結果を優先する。

## 今後の余地

- `tune.sh` に baseline 比較モードを追加し、`dictionary_generator` / `zstd --train` との差を同時に出す
- 辞書サイズ 64KB / 96KB など、より細かいサイズでも比較する
- source-order 以外の連結順が brotli / zstd に与える影響を実測する
- dcb / dcz ヘッダ付与まで含めた配信フローを自動化する
