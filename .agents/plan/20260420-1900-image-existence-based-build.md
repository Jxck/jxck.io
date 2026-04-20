# Fixed Plan: make image を存在ベースに切り替える

## Plan by Codex

### Summary

`make image` を mtime ベースの差分 build から、**派生画像の存在ベース build** に切り替える。

この plan の前提は明示的に以下で固定する。

- `png/jpeg/gif` から `webp/avif` を生成するのは、**元画像の新規追加時だけ**でよい
- 一度生成した `webp/avif` は、そのままコミットして管理する
- 元画像を後から更新しても、`make image` は自動再生成しない
- 再生成したい場合は、既存の `webp/avif` を削除してから `make image` を実行する
- build が `webp` / `avif` の欠損を自己回復することは要件に含めない

この契約に寄せることで、`git restore-mtime` と Make の mtime 比較が食い違うことで起きていた不要な再実行をなくす。

### Background

現状の `make image` は Make のパターンルール (`%.webp: %.png`, `%.avif: %.png` など) による **mtime 比較** に依存している。

しかし git は mtime を保存しないため、サーバ側では `git restore-mtime` で source の mtime を commit 時刻へ戻している。ここで source と derived が別コミットになると、source の方が新しく見えて不要な再生成が発生する。

実例:

```text
cq-dry-run-result.png  -> last commit: 2026-03-09
cq-dry-run-result.webp -> last commit: 2024-06-14
```

この状態で `git restore-mtime` をかけると、png の方が新しくなり、内容差がなくても Make は再生成を始める。

さらに現行設計では、1 枚の source に対して `webp` と `avif` がそれぞれ独立に optimizer を呼ぶため、source 1 枚あたり optimizer が 2 回走る。

### Requirements

1. 新しい `png/jpeg/gif` を追加したら、一度だけ最適化 + `webp/avif` 生成を実行する
2. 二回目以降は、対応する `webp` と `avif` が存在すれば何もしない
3. ローカル / サーバ / CI のいずれでも、**commit 済みの source + derived が揃っていれば** `make image` は同じ挙動になる
4. 再生成したい場合は、既存の `webp/avif` を削除してから再実行すればよい

### Non-Goals

この plan は以下を要件に含めない。

- source 更新時の自動再生成
- `webp` だけ、または `avif` だけ欠けた状態の自己回復
- 元画像だけを単独で再最適化する手段の維持

### Design

#### 1. mtime 比較を廃止する

以下を削除する。

- `mtime-image` target
- `preserve_mtime` define
- `BLOG_IMAGE` 変数 (現行 Makefile では `mtime-image` でのみ使用)
- `%.webp: ...` の pattern rule
- `%.avif: ...` の pattern rule
- `webp:` / `avif:` target
- `.PHONY` の `webp avif`

`WEBP_FILES` / `AVIF_FILES` は**残す**。ただし用途を次の 1 点に限定する。

- `image-clean` target の削除対象リストとしてのみ使用する

これにより、画像派生物の生成は Make の timestamp 比較ではなく、`image` target の existence check が担う。

#### 2. `image` target を existence check に一本化する

`image` target は `parallel` の中で派生物の存在を確認し、両方揃っている場合は skip、そうでなければ source を最適化して `webp` と `avif` をまとめて生成する。

```makefile
image:
	printf '%s\n' $(BLOG_PNG) | parallel -j $(CORES) \
	  'test -f {.}.webp -a -f {.}.avif || (echo {} && $(OPTIPNG) {} && $(CWEBP) {} -o {.}.webp && $(AVIFENC) -o {.}.avif {})'
	printf '%s\n' $(BLOG_JPEG) | parallel -j $(CORES) \
	  'test -f {.}.webp -a -f {.}.avif || (echo {} && $(JPEGTRAN) -outfile {} {} && $(CWEBP) {} -o {.}.webp && $(AVIFENC) -o {.}.avif {})'
	printf '%s\n' $(BLOG_GIF) | parallel -j $(CORES) \
	  'test -f {.}.webp -a -f {.}.avif || (echo {} && $(GIFSICLE) {} -o {} && $(GWEBP) {} -o {.}.webp && ffmpeg -i {} -pix_fmt yuv420p -f yuv4mpegpipe - | $(AVIFENC) --stdin {.}.avif)'
```

ここでは `.webp` / `.avif` の両方を見る。元の要求は「存在ベースで skip」であり、片方だけ欠けたケースを通常運用では考えない前提だが、両方確認しても契約は壊れず、少なくとも明らかな incomplete state では再実行される。

なお、`jpegtran -outfile {} {}` / `gifsicle {} -o {}` / gif → avif の `ffmpeg | avifenc --stdin` は**現行 Makefile と同じコマンドの踏襲**であり、本 plan で新たに導入する挙動ではない。

#### 3. `png/jpeg/gif` 単独 target は削除する

現行の `png`, `jpeg`, `gif` target を残すと、元画像だけを in-place で更新して派生物を再生成しない経路が残る。これは、この plan が固定する「新規追加時だけ生成し、その後は存在ベースで skip」という契約と整合しない。

そのため、単独最適化 target は削除する。

画像まわりの更新経路は以下だけに絞る。

- 新規追加: `make image`
- 全再生成: `make image-clean && make image`
- 個別再生成: 対応する `webp/avif` を削除して `make image`

#### 4. `image-clean` を正規の再生成導線にする

既にある `image-clean` は残す。`WEBP_FILES` / `AVIF_FILES` はこの target のためだけに保持する。

再生成方法は本文でこれに統一する。

```bash
make image-clean
make image
```

特定画像だけをやり直したい場合は、対応する `*.webp` と `*.avif` を削除してから `make image` を実行する。

`distclean` は現行どおり `clean blog-clean podcast-clean` に留め、`image-clean` を含めない。これにより commit 済みの派生物が `distclean` で消えることを防ぐ。

#### 5. `.PHONY: image` は残す

`image` はファイルを生成しない orchestration target なので、`.PHONY: image` は残す。

削るのは `.PHONY: webp avif` だけでよい。

### Proposed Makefile Shape

```makefile
.PHONY: image image-clean

BLOG_PNG  := $(filter %.png,  $(BLOG_FILES))
BLOG_JPEG := $(filter %.jpeg, $(BLOG_FILES))
BLOG_GIF  := $(filter %.gif,  $(BLOG_FILES))

OPTIPNG  := optipng -o7
JPEGTRAN := jpegtran -copy none -optimize -progressive
GIFSICLE := gifsicle --optimize=3 --colors 256
CWEBP    := cwebp -q 40 -quiet -m 6
GWEBP    := gif2webp -q 40 -quiet -m 6
AVIFENC  := avifenc --speed 0 -q 40

# image-clean でのみ使用する派生物リスト
WEBP_FILES := $(BLOG_PNG:.png=.webp)
WEBP_FILES += $(BLOG_JPEG:.jpeg=.webp)
WEBP_FILES += $(BLOG_GIF:.gif=.webp)

AVIF_FILES := $(BLOG_PNG:.png=.avif)
AVIF_FILES += $(BLOG_JPEG:.jpeg=.avif)
AVIF_FILES += $(BLOG_GIF:.gif=.avif)

image:
	printf '%s\n' $(BLOG_PNG) | parallel -j $(CORES) \
	  'test -f {.}.webp -a -f {.}.avif || (echo {} && $(OPTIPNG) {} && $(CWEBP) {} -o {.}.webp && $(AVIFENC) -o {.}.avif {})'
	printf '%s\n' $(BLOG_JPEG) | parallel -j $(CORES) \
	  'test -f {.}.webp -a -f {.}.avif || (echo {} && $(JPEGTRAN) -outfile {} {} && $(CWEBP) {} -o {.}.webp && $(AVIFENC) -o {.}.avif {})'
	printf '%s\n' $(BLOG_GIF) | parallel -j $(CORES) \
	  'test -f {.}.webp -a -f {.}.avif || (echo {} && $(GIFSICLE) {} -o {} && $(GWEBP) {} -o {.}.webp && ffmpeg -i {} -pix_fmt yuv420p -f yuv4mpegpipe - | $(AVIFENC) --stdin {.}.avif)'

image-clean:
	@rm -fv $(WEBP_FILES)
	@rm -fv $(AVIF_FILES)
```

### Benefits

1. `git restore-mtime` と derived の commit 時刻ずれに依存しなくなる
2. source 1 枚あたり optimizer が 1 回で済む (現行の pattern rule は webp/avif でそれぞれ optimizer を呼ぶ)
3. `make image` の契約が単純になる
4. commit 済みの source + derived が揃っていれば、どの環境でも `make image` は no-op になる
5. `mtime-image` / `preserve_mtime` / pattern rule 群が不要になり、画像生成系の見通しがよくなる

### Tradeoffs

1. source を更新しても `make image` は自動再生成しない
2. source だけを単独最適化する手段は消える
3. `webp` / `avif` の incomplete state を build が積極的に面倒を見る設計ではない
4. `avifenc --speed 0` の重さは残る。ただし新規追加時だけのコストに閉じる

### Verification

実装後は最低限以下を確認する。

1. 新しい `png` を 1 枚追加した状態で `make image` を実行し、`webp` と `avif` が生成される
2. 続けて `make image` を再実行し、対象画像に対して optimizer / encoder が再度走らない
3. `make image-clean && make image` で全再生成できる
4. 既存の commit 済み `webp/avif` が揃った環境で `make image` が no-op になる
5. `make image-clean` で `WEBP_FILES` / `AVIF_FILES` 相当のファイルがすべて削除される
6. `make png` / `make jpeg` / `make gif` が「ターゲットが存在しない」というエラーで落ちる (§Design #3 の削除が効いていることの確認)
7. `make distclean` 実行後も `webp` / `avif` が残る (`distclean` が `image-clean` を含まない現行挙動の維持)
