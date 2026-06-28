.PHONY: all
.PHONY: dict dcb
.PHONY: blog blog-all
.PHONY: podcast
.PHONY: fmt fmt-blog fmt-podcast
.PHONY: mtime mtime-blog mtime-podcast mtime-image mtime-comp
.PHONY: image png jpeg gif webp avif image-clean
.PHONY: comp clean blog-clean podcast-clean distclean
.PHONY: install update systemd-list systemd-status
.PHONY: start stop status kill restart reload test logf
.PHONY: _start _stop _restart

# コア数
CORES := $(shell nproc)

# トップレベルの Make を並列化
MAKEFLAGS += --no-print-directory
ifeq ($(MAKELEVEL),0)
MAKEFLAGS += -j$(CORES)
endif

# Commands
NODE     := $(HOME)/.local/share/mise/installs/node/latest/bin/node
PRETTIER := $(NODE) ./node_modules/prettier/bin/prettier.cjs


##########################
# Aggregate
##########################
# 既定ターゲット: 直接ビルドは禁止し、用途別ターゲットへ誘導する
all:
	@echo "run 'make blog' or 'make podcast'" >&2
	@exit 1

# blog/podcast の md を formatter にかけて整形
fmt: fmt-blog fmt-podcast

# 全ファイルの mtime を最終コミット時刻に戻す
mtime: mtime-blog mtime-podcast mtime-image mtime-comp


##########################
# Blog
##########################
BLOG_FILES := $(shell find ./blog.jxck.io/entries ! -type d)
BLOG_MD    := $(filter %.md, $(BLOG_FILES))
BLOG_HTML  := $(BLOG_MD:.md=.html)
BLOG_JSON  := $(BLOG_MD:.md=.json)

# blog の fmt
fmt-blog:
	@printf '%s\n' $(BLOG_MD) | parallel -X -j $(CORES) ./.src/markdown/formatter.js

# blog の mtime を戻す
mtime-blog:
	@git restore-mtime $(BLOG_MD)

# blog の差分ビルド (1 つの md から .html と .json を同時に生成)
./blog.jxck.io/entries/%.html ./blog.jxck.io/entries/%.json: ./blog.jxck.io/entries/%.md
	./.src/markdown/formatter.js $<
	$(NODE) .src/build.ts blog $<

# index.html は @touch で mtime を進め blog_index の再実行を防ぐ
./blog.jxck.io/index.html: $(BLOG_JSON)
	$(NODE) .src/build.ts blog_index $(BLOG_JSON)
	@touch $@

# index/rss/sitemap/tags を更新し、最後に comp で .br/.dcb を生成する
blog: ./blog.jxck.io/index.html
	$(MAKE) comp

# blog のフルビルド
blog-all:
	$(MAKE) fmt-blog
	$(NODE) .src/build.ts blog $(BLOG_MD)
	$(NODE) .src/build.ts blog_index $(BLOG_JSON)


##########################
# Podcast
##########################
PODCAST_MD   := $(shell find ./mozaic.fm/episodes -name '*.md')
PODCAST_HTML := $(PODCAST_MD:.md=.html)

# podcast の fmt
fmt-podcast:
	@printf '%s\n' $(PODCAST_MD) | parallel -X -j $(CORES) $(PRETTIER) -w --log-level error

# podcast の mtime を戻す
mtime-podcast:
	@git restore-mtime $(PODCAST_MD)

# podcast のフルビルド
podcast:
	$(MAKE) fmt-podcast
	$(NODE) .src/build.ts podcast


##########################
# Optimize Image
##########################
BLOG_PNG  := $(filter %.png,  $(BLOG_FILES))
BLOG_JPEG := $(filter %.jpeg, $(BLOG_FILES))
BLOG_GIF  := $(filter %.gif,  $(BLOG_FILES))
BLOG_IMAGE := $(BLOG_PNG) $(BLOG_JPEG) $(BLOG_GIF)
BLOG_IMAGE += $(BLOG_PNG:.png=.webp) $(BLOG_JPEG:.jpeg=.webp) $(BLOG_GIF:.gif=.webp)
BLOG_IMAGE += $(BLOG_PNG:.png=.avif) $(BLOG_JPEG:.jpeg=.avif) $(BLOG_GIF:.gif=.avif)

# blog 画像の mtime を戻す
mtime-image:
	@git restore-mtime $(BLOG_IMAGE)

# 全画像の最適化
# 元画像の最適化 (optipng 等) は webp pass でのみ in-place に行い、avif pass は
# 最適化済みの元画像から変換する。webp -> avif の順に直列化することで、同じ元画像へ
# 最適化が二重に走るのも、並列実行で衝突して "Can't back up the input file" になるのも
# 防ぐ。mtime はビルド順で派生物が常に元画像より後になり古くならないため、ここでは
# 触らない。コミット時刻への正規化は commit 後に make mtime (mtime-image) で行う。
image:
	$(MAKE) webp
	$(MAKE) avif

# PNG を optipng で最適化
OPTIPNG := optipng -o7
png:
	printf '%s\n' $(BLOG_PNG) | parallel -j $(CORES) $(OPTIPNG)

# JPEG を jpegtran で最適化
JPEGTRAN := jpegtran -copy none -optimize -progressive
jpeg:
	printf '%s\n' $(BLOG_JPEG) | parallel -j $(CORES) 'echo {} && $(JPEGTRAN) -outfile {} {}'

# GIF を gifsicle で最適化
GIFSICLE := gifsicle --optimize=3 --colors 256 -v
gif:
	printf '%s\n' $(BLOG_GIF) | parallel -j $(CORES) '$(GIFSICLE) {} -o {}'


## webp
CWEBP := cwebp -q 40 -quiet -m 6
GWEBP := gif2webp -q 40 -quiet -m 6

WEBP_FILES := $(BLOG_PNG:.png=.webp)
WEBP_FILES += $(BLOG_JPEG:.jpeg=.webp)
WEBP_FILES += $(BLOG_GIF:.gif=.webp)

# PNG -> webp 変換 (元 PNG も optipng で最適化する)
%.webp: %.png
	$(OPTIPNG) $<
	$(CWEBP) $< -o $@

# JPEG -> webp 変換 (元 JPEG も jpegtran で最適化する)
%.webp: %.jpeg
	$(JPEGTRAN) -outfile $< $<
	$(CWEBP) $< -o $@

# GIF -> webp 変換 (元 GIF も gifsicle で最適化する)
%.webp: %.gif
	$(GIFSICLE) $< -o $<
	$(GWEBP) $< -o $@

# webp 差分ビルド
webp: $(WEBP_FILES)


## avif
AVIFENC := avifenc --speed 0 -q 40

AVIF_FILES := $(BLOG_PNG:.png=.avif)
AVIF_FILES += $(BLOG_JPEG:.jpeg=.avif)
AVIF_FILES += $(BLOG_GIF:.gif=.avif)

# PNG -> avif 変換 (元 PNG の最適化は webp pass 済みのため行わない)
%.avif: %.png
	$(AVIFENC) -o $@ $<

# JPEG -> avif 変換 (元 JPEG の最適化は webp pass 済みのため行わない)
%.avif: %.jpeg
	$(AVIFENC) -o $@ $<

# GIF -> avif 変換 (元 GIF の最適化は webp pass 済みのため行わない)
%.avif: %.gif
	ffmpeg -i $< -pix_fmt yuv420p -f yuv4mpegpipe - | $(AVIFENC) --stdin $@

# avif 差分ビルド
avif: $(AVIF_FILES)


##########################
# Compression
##########################
# blog.jxck.io/dictionary/entries/<hash>.dict を生成し、
# build 時は fixed name の active.dict から参照する。
DICT_DIR    := ./blog.jxck.io/dictionary/entries
DICT_ACTIVE := $(DICT_DIR)/active.dict
DICT_CONF   := ./h2o.dict.conf
# 256KB / slice=12 / block=4096 / min_frequency=3 は tuning 済みの採用値。
DICT_GENERATOR := cdt dictionary \
	-s 262144 \
	-l 12 \
	-b 4096 \
	-f 3 \
	-v

# 対象外ファイルを除き brotli で圧縮する (zopfli/gz は h2o 側でやることにした)
COMP_EXCLUDE := \
  %.gz %.br %.sb %.dcb \
  %.png %.jpeg %.gif %.webp %.avif \
  %.mp4 %.webm \
  %.woff2 \
  %.rb %.sh %.cgi \
  %.md %.txt

COMP_WWW     := $(filter-out $(COMP_EXCLUDE), $(shell find ./www.jxck.io  -xtype f ! -path '*/.*'))
COMP_BLOG    := $(filter-out $(COMP_EXCLUDE), $(shell find ./blog.jxck.io -xtype f ! -path '*/.*' ! -path '*/drafts/*' ! -path '*/dictionary/*'))
COMP_MOZAIC  := $(filter-out $(COMP_EXCLUDE), $(shell find ./mozaic.fm    -xtype f ! -path '*/.*'))
COMP_TARGETS := $(COMP_WWW) $(COMP_BLOG) $(COMP_MOZAIC)

COMP_BR := $(addsuffix .br, $(COMP_TARGETS))

# 全 entry HTML に対応する .dcb
BLOG_DCB := $(BLOG_HTML:.html=.html.dcb)
DICT_FILES := $(shell find $(DICT_DIR) \( -type f -o -type l \) ! -path '*/.*' 2>/dev/null)
COMP_FILES := $(COMP_TARGETS) $(COMP_BR) $(BLOG_DCB) $(DICT_FILES) $(DICT_CONF)

# comp の mtime を戻す
mtime-comp:
	@git restore-mtime $(COMP_FILES)

# brotli 圧縮コマンド
%.br: %
	brotli -v -q 11 -f $<

# entries html から配信用辞書と active dict metadata を更新する
$(DICT_ACTIVE): $(BLOG_HTML)
	@rm -f $(DICT_DIR)/*.dict $(DICT_DIR)/*.dict.br
	@dict_path=$$($(DICT_GENERATOR) -d $(DICT_DIR) $(BLOG_HTML)); \
	  dict_name=$${dict_path##*/}; \
	  ln -snf "$$dict_name" $(DICT_ACTIVE); \
	  dict_url=$${dict_path#./blog.jxck.io}; \
	  printf "header.set: 'Link: <%s>; rel=\"compression-dictionary\"'\n" "$$dict_url" > $(DICT_CONF)

# active dict があれば Link 断片も再生成できる
$(DICT_CONF): $(DICT_ACTIVE)
	@dict_name=$$(readlink $(DICT_ACTIVE)); \
	  dict_url=/dictionary/entries/$${dict_name##*/}; \
	  printf "header.set: 'Link: <%s>; rel=\"compression-dictionary\"'\n" "$$dict_url" > $(DICT_CONF)

# .dcb 生成コマンド (make dict で更新済みの active dict を使う)
%.html.dcb: %.html
	@test -e "$(DICT_ACTIVE)" || { \
	  echo "missing $(DICT_ACTIVE): run 'make dict' first" >&2; \
	  exit 1; \
	}
	@cdt compress \
	    --dict "$(DICT_ACTIVE)" \
	    --output-dir . \
	    --delta-compression-brotli \
	    $<

# 辞書を再生成する
# 配信用の hash.dict.br と全 html.dcb を更新し、Link ヘッダ反映のため reload する
dict:
	@$(MAKE) -B $(DICT_ACTIVE)
	@dict_name=$$(readlink $(DICT_ACTIVE)); \
	  $(MAKE) -B "$(DICT_DIR)/$$dict_name.br"
	@$(MAKE) -B dcb
	$(MAKE) reload

# dcb 差分生成 (単独実行可)
dcb: $(BLOG_DCB)

# 圧縮 .br と .dcb を生成する
# 辞書は再生成せず、既存の辞書で行う
comp: $(COMP_BR) $(BLOG_DCB)

# .br と .dcb と辞書を削除
clean:
	@rm -fv $(COMP_BR)
	@rm -fv $(BLOG_DCB)
	@rm -fv ./blog.jxck.io/dictionary/*.dict
	@rm -fv $(DICT_DIR)/*.dict
	@printf '# generated by make dict\nheader.unset: Link\n' > $(DICT_CONF)

# 画像の派生生成物を削除
image-clean:
	@rm -fv $(WEBP_FILES)
	@rm -fv $(AVIF_FILES)

# blog の生成ファイルを削除 (画像は除く)
blog-clean:
	@rm -fv $(BLOG_HTML)
	@rm -fv $(BLOG_JSON)
	@rm -f ./blog.jxck.io/index.html
	@rm -f ./blog.jxck.io/feeds/atom.xml
	@rm -f ./blog.jxck.io/feeds/sitemap.xml
	@rm -f ./blog.jxck.io/tags/index.html

# podcast の生成ファイルを削除
podcast-clean:
	@rm -fv $(PODCAST_HTML)
	@rm -f ./mozaic.fm/index.html
	@rm -f ./feed.mozaic.fm/index.xml
	@rm -f ./feed.mozaic.fm/index.json
	@rm -f ./id3all.sh

# 全生成ファイルを削除 (画像は除く)
distclean: clean blog-clean podcast-clean


##########################
# Setup
##########################
# 依存インストール
install:
	npm install
ifeq ($(shell uname -s),Linux)
	.h2o/install.sh
else
	@printf '\033[31mSKIP H2O INSTALL ON $(shell uname -s)\033[0m\n'
endif

# 依存更新
update:
	ncu --cooldown 7 --upgrade
	npm install
ifeq ($(shell uname -s),Linux)
	.h2o/install.sh
else
	@printf '\033[31mSKIP H2O INSTALL ON $(shell uname -s)\033[0m\n'
endif

# .systemd unit 一覧
systemd-list:
	@systemctl list-unit-files | grep $(foreach service, $(notdir $(wildcard ./.systemd/*)), -e '^$(service)')

# .systemd unit 状態一覧
systemd-status:
	$(foreach service, $(notdir $(wildcard ./.systemd/*)), systemctl status $(service))

fmt:
	npm run fmt

##########################
# h2o
##########################
start:
	sudo systemctl start h2o

stop:
	sudo systemctl stop h2o

status:
	sudo systemctl status h2o

kill:
	sudo systemctl kill h2o

restart:
	sudo systemctl restart h2o

# h2o.conf の syntax check 後に reload
reload: test
	sudo systemctl daemon-reload
	sudo systemctl reload h2o

# h2o.conf の syntax check
test:
	sudo .h2o/local/bin/h2o -t -c h2o.conf | cat

# journalctl ログ表示
logf:
	sudo journalctl -u h2o -f

## h2o local
_start:
	sudo .h2o/local/bin/h2o -m daemon -c h2o.conf

_stop:
	sudo kill -TERM `cat ./.h2o/pid/h2o.pid`

_restart:
	$(MAKE) _stop
	$(MAKE) _start
