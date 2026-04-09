# Raw Dictionary Generator for Compression Dictionary Transport

## Context

RFC 9842 (Compression Dictionary Transport) は辞書を "raw" (生バイト列) として扱うことを要求する。
`zstd --train` は formatted dictionary (entropy tables 等のメタ情報付き) を生成するため CDT には不適。
Brotli の `dictionary_generator` (C++) は raw 辞書を生成できるが、zstd 側に同等のツールがない。

**目的**: サンプルファイル群から raw dictionary を生成する汎用 Ruby CLI ツールを作る。

## ツール概要

単一の Ruby スクリプト。`zstd --train` のように使える。

```sh
# 辞書生成
./dict-generator.rb -o dictionary.dict samples/**/*.html

# 生成した辞書で圧縮 (zstd --patch-from で raw として使う)
zstd --patch-from=dictionary.dict input.html -o input.html.zstd
```

## アルゴリズム

Brotli の durchschlag を簡略化した頻出部分文字列抽出:

1. **スライス抽出** - 各サンプルファイルをスライディングウィンドウで固定長スライスに分割
2. **頻度カウント** - 各スライスが何ファイルに出現するか数える
3. **フィルタ** - 出現ファイル数が min_frequency 未満のスライスを除外
4. **スコアリング** - `score = スライス長 × 出現ファイル数`
5. **貪欲選択** - スコア上位から辞書に追加。既選択スライスと重複が大きいものはスキップ
6. **出力** - 選択されたスライスを結合して raw バイト列として出力

## CLI インターフェース

```
Usage: dict-generator.rb [options] samples...

Options:
  -o, --output FILE        出力ファイル (default: dictionary.dict)
  -s, --size BYTES         目標辞書サイズ (default: 32768)
  -l, --slice-length N     スライス長 (default: 16)
  -S, --step N             ステップ幅 (default: 1)
  -f, --min-frequency N    最小出現ファイル数 (default: 2)
  --fast                   高速モード (slice:32, step:8, freq:3)
  --thorough               高精度モード (slice:16, step:1, freq:2)
  -v, --verbose            進捗表示
  -h, --help               ヘルプ
```

## 品質/速度トレードオフ

| パラメータ | fast | default | thorough |
|-----------|------|---------|----------|
| slice_length | 32 | 16 | 16 |
| step | 8 | 1 | 1 |
| min_frequency | 3 | 2 | 2 |

- slice_length: 短いほど細かいパターンを拾えるが遅い
- step: 小さいほど網羅的だがメモリ・時間を消費
- min_frequency: 大きいほど候補が減り高速だが辞書の質が落ちる

## 実装構成 (~200行, 単一ファイル)

```
#!/usr/bin/env ruby
require "optparse"
require "digest"
require "base64"

1. オプションパース (~40行)
2. ファイル読み込み - 1ファイルずつ読んでスライス抽出 (~30行)
3. 頻度フィルタ (~10行)
4. スコアリング・ソート (~15行)
5. 貪欲選択 + 重複排除 (~50行)
6. 出力 + サマリ表示 (~30行)
```

## 注意点

- 全文字列を `Encoding::BINARY` で扱う (日本語 HTML の UTF-8 問題回避)
- ファイルは1つずつ読んで処理し、メモリを節約
- 重複排除: 辞書バッファに対して `include?` で既存スライスとの重複をチェック

## 出力例 (verbose)

```
reading 271 files (9478588 bytes)
extracted 5932841 slices
filtered to 42381 unique slices (freq >= 2)
selected 1847 slices
wrote dictionary.dict (32768 bytes)
sha256: :base64hash:
```

## 対象ファイル

- `dict-generator.rb` (新規: ツール本体)

## 検証方法

```sh
# 1. 辞書生成
./dict-generator.rb -o test.dict ./blog.jxck.io/entries/**/*.html -v

# 2. 圧縮・展開の往復確認
zstd --patch-from=test.dict input.html -o input.html.zstd
zstd --patch-from=test.dict -d input.html.zstd -o input.html.decoded
diff input.html input.html.decoded

# 3. 圧縮率の比較
ls -la input.html input.html.zstd
```
