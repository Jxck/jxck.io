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
# 全体の差分ビルド
all:
	$(MAKE) blog
	$(MAKE) podcast
	$(MAKE) dict
	$(MAKE) comp

# blog/podcast の md を formatter にかけて整形
fmt: fmt-blog fmt-podcast

# blog/podcast の md の mtime を最終コミット時刻に戻す
mtime: mtime-blog mtime-podcast


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

# index/rss/sitemap/tags の更新
blog: ./blog.jxck.io/index.html

# blog のフルビルド
blog-all:
	$(MAKE) fmt-blog
	$(MAKE) mtime-blog
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
	$(MAKE) mtime-podcast
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
image:
	$(MAKE) mtime-image
	$(MAKE) webp avif

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

# PNG -> webp 変換
%.webp: %.png
	$(OPTIPNG) $<
	$(CWEBP) $< -o $@
	touch -r $< $@

# JPEG -> webp 変換
%.webp: %.jpeg
	$(JPEGTRAN) -outfile $< $<
	$(CWEBP) $< -o $@
	touch -r $< $@

# GIF -> webp 変換
%.webp: %.gif
	$(GIFSICLE) $< -o $<
	$(GWEBP) $< -o $@
	touch -r $< $@

# webp 差分ビルド
webp: $(WEBP_FILES)


## avif
AVIFENC := avifenc --speed 0 -q 40

AVIF_FILES := $(BLOG_PNG:.png=.avif)
AVIF_FILES += $(BLOG_JPEG:.jpeg=.avif)
AVIF_FILES += $(BLOG_GIF:.gif=.avif)

# PNG -> avif 変換
%.avif: %.png
	$(OPTIPNG) $<
	$(AVIFENC) -o $@ $<
	touch -r $< $@

# JPEG -> avif 変換
%.avif: %.jpeg
	$(JPEGTRAN) -outfile $< $<
	$(AVIFENC) -o $@ $<
	touch -r $< $@

# GIF -> avif 変換
%.avif: %.gif
	$(GIFSICLE) $< -o $<
	ffmpeg -i $< -pix_fmt yuv420p -f yuv4mpegpipe - | $(AVIFENC) --stdin $@
	touch -r $< $@

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
DICT_GENERATOR := ruby ./.src/dictionary/dict-generator.rb \
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
COMP_BLOG    := $(filter-out $(COMP_EXCLUDE), $(shell find ./blog.jxck.io -xtype f ! -path '*/.*' ! -path '*/drafts/*'))
COMP_MOZAIC  := $(filter-out $(COMP_EXCLUDE), $(shell find ./mozaic.fm    -xtype f ! -path '*/.*'))
COMP_TARGETS := $(COMP_WWW) $(COMP_BLOG) $(COMP_MOZAIC)

COMP_BR := $(addsuffix .br, $(COMP_TARGETS))

# 全 entry HTML に対応する .dcb
BLOG_DCB := $(BLOG_HTML:.html=.html.dcb)
DICT_FILES := $(shell find $(DICT_DIR) \( -type f -o -type l \) ! -path '*/.*' 2>/dev/null)
COMP_FILES := $(COMP_TARGETS) $(COMP_BR) $(BLOG_DCB) $(DICT_FILES) $(DICT_CONF)

# pull 後に comp 関連の source / generated を git の commit 時刻へ揃える
mtime-comp:
	@git restore-mtime $(COMP_FILES)

# brotli 圧縮コマンド
%.br: %
	brotli -v -q 11 -f $<

# entries html から配信用辞書と active dict metadata を更新する
$(DICT_ACTIVE): $(BLOG_HTML) ./.src/dictionary/dict-generator.rb
	@rm -f $(DICT_DIR)/*.dict
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

# .dcb 生成コマンド (active dict を使った brotli 差分圧縮)
%.html.dcb: %.html $(DICT_ACTIVE)
	@./.src/dictionary/compress.sh \
	    --dict "$(DICT_ACTIVE)" \
	    --output-dir . \
	    -dcb \
	    $<

dict:
	@$(MAKE) -B $(DICT_ACTIVE)

# dcb 差分生成 (単独実行可)
dcb: $(BLOG_DCB)

# pull 後の server では、comp の前に mtime を揃えて差分判定を安定させる
comp:
	$(MAKE) mtime-comp
	$(MAKE) $(COMP_BR) $(BLOG_DCB)

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
	.h2o/install.sh

# 依存更新
update:
	ncu --cooldown 7 --upgrade
	npm install
	.h2o/install.sh

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
