# Compression Dictionary Transport - 辞書生成と圧縮ベンチマーク

## 設計方針

RFC 9842 (Compression Dictionary Transport) では、辞書を "raw" (生バイト列) として扱う。
サーバは辞書を配信し、ブラウザがキャッシュ。以降のリクエストで辞書を参照した差分圧縮を行う。

圧縮には dcb (dictionary compressed brotli) と dcz (dictionary compressed zstd) の 2 形式がある。
辞書は共通で、どちらの圧縮アルゴリズムでも使える raw バイト列。

### 辞書生成ツール

辞書を作るツールは 3 種類を検証している。

| ツール | 方式 | 特徴 |
|--------|------|------|
| `zstd --train` | zstd 内蔵の統計学習 | formatted dictionary を生成するが `--patch-from` で raw として使える |
| `dictionary_generator` | brotli research の durchschlag | サフィックス配列ベースの block スコアリング。raw 辞書を直接生成 |
| `dict-generator.rb` | 自作 Ruby 実装 | 複数スライス長 + 連続レンジ結合 + カバレッジ追跡 |

### dict-generator.rb のアルゴリズム

1. **複数スライス長での抽出** - [8, 16, 32, 64] バイトのスライディングウィンドウで各ファイルを走査
2. **頻度フィルタ** - 出現ファイル数が閾値未満のスライスを除外
3. **連続レンジ結合** - 隣接する qualifying スライスを 1 つのバイト範囲にマージ
4. **スコア密度ソート** - 出現ファイル数降順 → バイト長降順
5. **カバレッジ追跡付き貪欲選択** - 選択済みスライスを追跡し、新規バイト数 × 出現ファイル数で再スコアリング

## ベンチマーク

### ファイル構成

```
blog.jxck.io/dictionary/
  compression-test.sh   # ベンチマークスクリプト
  dict-generator.rb     # 自作辞書生成ツール
  hash.rb               # SHA-256 ハッシュ計算
  sample/               # テスト用ファイル (symlink + 生成物)
    *.html              # 10 個のサンプル HTML (symlink)
    *.dict              # 生成された辞書
    *.zstd *.br         # 圧縮結果
```

### サンプルファイル (10 個, 合計 314,411 bytes)

| ファイル | 選定基準 |
|----------|----------|
| ipv6-only.html | 最新エントリー |
| service-worker-tutorial.html | 最大 (104,819 bytes) |
| webrtc-in-safari11.html | 最小 (9,838 bytes) |
| new-blog-start.html | 中央値 (28,399 bytes) |
| 他 6 ファイル | ランダム |

### 実行方法

```sh
# リポジトリルートから実行
./blog.jxck.io/dictionary/compression-test.sh
```

辞書生成 → 全サンプル × 全辞書 × brotli/zstd で圧縮を実行。

### 結果の集計

```sh
# 各パターンの合計サイズを確認
for ext in br.br zstd.br rb.br br.zstd zstd.zstd rb.zstd cat.br cat.zstd; do
  total=0
  for f in blog.jxck.io/dictionary/sample/*.html; do
    v=$(wc -c < "${f}.${ext}")
    total=$((total + v))
  done
  echo "$ext: $total"
done
```

## 実験結果

### 辞書サイズ 112KB (112,640 bytes)

サンプル: 271 HTML + テンプレート ejs

|  辞書  |  圧縮  |  合計サイズ  | 圧縮率 |
| :----: | :----: | ----------: | :----: |
| brotli | brotli |      25,624 | 8.15%  |
|  zstd  | brotli |      25,863 | 8.23%  |
|   rb   | brotli |      26,419 | 8.40%  |
| brotli |  zstd  |      26,250 | 8.35%  |
|  zstd  |  zstd  |      26,459 | 8.41%  |
|   rb   |  zstd  |      27,175 | 8.64%  |
|  cat   | brotli |      38,565 | 12.27% |
|  cat   |  zstd  |      42,835 | 13.62% |

### 辞書サイズ 256KB (262,144 bytes)

|  辞書  |  圧縮  |  合計サイズ  | 圧縮率 | 112KB比 |
| :----: | :----: | ----------: | :----: | ------: |
| brotli | brotli |      23,975 | 7.63%  |  -1,649 |
|  zstd  | brotli |      24,670 | 7.85%  |  -1,193 |
|   rb   | brotli |      24,851 | 7.90%  |  -1,568 |
| brotli |  zstd  |      24,046 | 7.65%  |  -2,204 |
|  zstd  |  zstd  |      24,692 | 7.85%  |  -1,767 |
|   rb   |  zstd  |      24,912 | 7.92%  |  -2,263 |
|  cat   | brotli |      38,565 | 12.27% |       0 |
|  cat   |  zstd  |      42,835 | 13.62% |       0 |

### 傾向

- **圧縮アルゴリズム**: brotli が zstd より常に優位。raw dictionary との相性が良い
- **辞書の質**: brotli (dictionary_generator) >= zstd (--train) > rb (dict-generator.rb) >> cat
- **rb と brotli/zstd の差**: 112KB で 3.1%、256KB で 3.7%。ほぼ横並び
- **辞書サイズ**: 112KB → 256KB で全ツール 5-8% 改善。cat は変化なし (テンプレート結合なので固定)
- **サンプル順序**: `zstd --train` はテンプレートを先にすると改善。`dictionary_generator` は順序に依存しない

## 改善の余地

### dict-generator.rb

- **ブロックスコアリング** - durchschlag のように 1024 バイトブロック単位でスライス密度を評価する。孤立した高スコアスライスより密集領域を優先
- **部分重複の検出** - レンジの一部が辞書に既にある場合、差分だけを追加する
- **長いレンジの分割** - 低頻度部分を含む長いレンジを分割し、高頻度部分だけ採用

### 全体

- **辞書サイズの最適化** - サイズと初回ダウンロードコストのトレードオフを実測で検証
- **複数ページでの実測** - ベンチマークは 10 ファイルの合計。実際のブラウジングパターンでの検証が必要
- **dcb/dcz ヘッダ付与の自動化** - 圧縮結果に RFC 9842 準拠のヘッダを付与するスクリプトの整備
