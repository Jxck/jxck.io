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

## ディレクトリ構成

```text
blog.jxck.io/dictionary/
  check.sh             # 軽量な性質検証
  compression-test.sh  # sample/ 用の比較スクリプト
  dict-generator.rb    # 自作辞書生成ツール
  hash.rb              # SHA-256 ハッシュ計算
  tune.sh              # held-out eval でのパラメータ探索
  sample/              # 小さい回帰用サンプルと生成物
    *.html             # 10 個のサンプル HTML (symlink)
    *.dict             # 生成された辞書
    *.zstd *.br        # 圧縮結果
  work/                # tuning / check 用の生成物
```

`sample/` は tracked な小さい回帰セットで、`work/` は tuning / 検証の作業領域として使う。

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
./blog.jxck.io/dictionary/check.sh
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
./blog.jxck.io/dictionary/tune.sh
```

既定の探索グリッドは以下。

- `slice_length = 8 12 16 24 32`
- `block_length = 512 1024 2048 4096`
- `min_frequency = 2 3 4`
- `dict_size = 262144`

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

### sample/ 上の比較 (辞書サイズ 256KB)

`compression-test.sh` の最新結果は以下。

|  辞書  |  圧縮  |  合計サイズ  | 圧縮率 |
| :----: | :----: | ----------: | :----: |
|   rb   | brotli |      23,807 | 7.57%  |
| brotli | brotli |      23,975 | 7.63%  |
|   rb   |  zstd  |      23,869 | 7.59%  |
| brotli |  zstd  |      24,046 | 7.65%  |
|  zstd  | brotli |      24,670 | 7.85%  |
|  zstd  |  zstd  |      24,692 | 7.85%  |
|  cat   | brotli |      38,565 | 12.27% |
|  cat   |  zstd  |      42,835 | 13.62% |

### 傾向

- `dict-generator.rb` は `sample/` 上で `dictionary_generator` と `zstd --train` の両方を上回った
- `rb.br` は `br.br` より 168 bytes 小さい
- `rb.zstd` は `br.zstd` より 177 bytes 小さい
- `cat` は依然として大きく劣る

この結果は `sample/` 上の回帰ベンチであり、採否は held-out eval の結果を優先する。

## 今後の余地

- `tune.sh` に baseline 比較モードを追加し、`dictionary_generator` / `zstd --train` との差を同時に出す
- 辞書サイズ 256KB 以外も比較し、初回ダウンロードコストとのトレードオフを測る
- source-order 以外の連結順が brotli / zstd に与える影響を実測する
- dcb / dcz ヘッダ付与まで含めた配信フローを自動化する
