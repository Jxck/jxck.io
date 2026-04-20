# WIP Plan: make image を存在ベースに切り替える

## Plan by Claude

### 背景と問題

現状の `make image` は make のパターンルール (`%.webp: %.png`) の **mtime 比較** に依存している。
git は mtime を保存しないため、`git restore-mtime` で source の mtime を復元しているが、
source と derived が別コミットになると commit 時刻が異なり、サーバ上で不要な再実行が発生する。

実例:
```
cq-dry-run-result.png  → last commit: 2026-03-09 (make image で最適化 → 内容変更)
cq-dry-run-result.webp → last commit: 2024-06-14 (出力同一のため git に変更なし)
```
→ `git restore-mtime` 後に png (2026-03-09) > webp (2024-06-14) → make が再生成してしまう。

### 要件

1. 新しい png/jpeg/gif を追加したら、**一度だけ**最適化 + webp/avif 生成を実行する
2. 二回目以降は、対応する webp (または avif) が存在すれば**一切スキップ**する
3. 別環境 (サーバ) で `make image` しても同じ挙動になる
4. 再生成したい場合は webp/avif を削除してから再実行すれば良い

### 方針: mtime 比較 → 存在チェック

**核心:** `.webp` ファイルの存在 = 「その source は最適化済み & 派生ファイル生成済み」の印とする。

- make のパターンルール (`%.webp: %.png`) を廃止する
- `mtime-image` / `preserve_mtime` を廃止する (不要になる)
- 代わりに `parallel` の中で `test -f {.}.webp` による存在チェックを行う
- 存在しなければ: 最適化 → webp 生成 → avif 生成
- 存在すれば: 何もしない

### 変更後の `image` ターゲット

```makefile
##########################
# Optimize Image
##########################
BLOG_PNG  := $(filter %.png,  $(BLOG_FILES))
BLOG_JPEG := $(filter %.jpeg, $(BLOG_FILES))
BLOG_GIF  := $(filter %.gif,  $(BLOG_FILES))

# Commands
OPTIPNG  := optipng -o7
JPEGTRAN := jpegtran -copy none -optimize -progressive
GIFSICLE := gifsicle --optimize=3 --colors 256
CWEBP    := cwebp -q 40 -quiet -m 6
GWEBP    := gif2webp -q 40 -quiet -m 6
AVIFENC  := avifenc --speed 0 -q 40

# 画像の最適化 + webp/avif 生成 (存在チェック: webp があればスキップ)
image:
	printf '%s\n' $(BLOG_PNG) | parallel -j $(CORES) \
	  'test -f {.}.webp || (echo {} && $(OPTIPNG) {} && $(CWEBP) {} -o {.}.webp && $(AVIFENC) -o {.}.avif {})'
	printf '%s\n' $(BLOG_JPEG) | parallel -j $(CORES) \
	  'test -f {.}.webp || (echo {} && $(JPEGTRAN) -outfile {} {} && $(CWEBP) {} -o {.}.webp && $(AVIFENC) -o {.}.avif {})'
	printf '%s\n' $(BLOG_GIF) | parallel -j $(CORES) \
	  'test -f {.}.webp || (echo {} && $(GIFSICLE) {} -o {} && $(GWEBP) {} -o {.}.webp && ffmpeg -i {} -pix_fmt yuv420p -f yuv4mpegpipe - | $(AVIFENC) --stdin {.}.avif)'
```

### 削除するもの

| 対象 | 理由 |
|:--|:--|
| `mtime-image` ターゲット | mtime 復元不要 |
| `preserve_mtime` define | mtime 保持不要 |
| `%.webp: %.png` 等のパターンルール (6 本) | 存在チェックに置換 |
| `%.avif: %.png` 等のパターンルール (3 本) | 同上 |
| `webp:` / `avif:` ターゲット | `image` に統合 |
| `WEBP_FILES` / `AVIF_FILES` 変数 | パターンルールで使っていた |
| `BLOG_IMAGE` 変数 | `mtime-image` で使っていた |
| `.PHONY` の `webp avif` | 不要 |

### 残すもの

| 対象 | 理由 |
|:--|:--|
| `png` / `jpeg` / `gif` ターゲット | 手動で全画像再最適化したい場合用 (optional) |
| `BLOG_PNG` / `BLOG_JPEG` / `BLOG_GIF` 変数 | `image` + 個別ターゲットで使用 |

### 利点

1. **git の mtime 問題を完全回避** — タイムスタンプに一切依存しない
2. **シンプル** — `preserve_mtime`, `mtime-image`, パターンルールがすべて不要
3. **冪等** — 何回実行しても同じ結果
4. **環境非依存** — ローカル/サーバ/CI どこでも同じ挙動
5. **並列実行** — parallel でファイル単位の並列化を維持

### 再生成したい場合

```bash
# 全再生成
rm blog.jxck.io/entries/**/*.webp blog.jxck.io/entries/**/*.avif
make image

# 特定エントリのみ
rm blog.jxck.io/entries/2024-06-14/*.webp blog.jxck.io/entries/2024-06-14/*.avif
make image
```

### 検討事項

1. **webp だけ存在し avif がない場合** — webp の存在でスキップするため avif も生成されない。
   → 現実的には webp と avif は常にセットで生成されるので問題ない。
   → 万一の場合は `rm *.webp` で再生成可能。
2. **`png`/`jpeg`/`gif` 単独ターゲットを残すか** — 残す場合は既存のまま (parallel + optimizer)。image とは独立した手動ツールとして。
3. **`make comp` への影響** — COMP_EXCLUDE で webp/avif は除外済み。影響なし。
4. **avifenc の `--speed 0` が遅い問題** — 1ファイルあたり数十秒かかるが、新規画像時のみなので許容範囲。
