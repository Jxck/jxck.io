.PHONY: build blog podcast compile fmt fmt-blog fmt-podcast mtime mtime-blog mtime-podcast install update image png jpeg gif webp avif comp clean remove start stop status kill restart reload test logf

NODE  := $(HOME)/.local/share/mise/installs/node/latest/bin/node
CORES := $(shell nproc)

build:
	$(MAKE) blog
	$(MAKE) podcast
	$(MAKE) comp

fmt:
	$(MAKE) fmt-blog
	$(MAKE) fmt-podcast

fmt-blog:
	selects path from './blog.jxck.io/entries/**/*' where extname '==' '.md' \
		| sort -r \
		| parallel -X -j $(CORES) ./.src/markdown/formatter.js

fmt-podcast:
	selects path from './mozaic.fm/episodes/**/*' where extname '==' '.md' \
		| sort -r \
		| parallel -X -j $(CORES) npx prettier -w

mtime:
	$(MAKE) mtime-blog
	$(MAKE) mtime-podcast

mtime-blog:
	git restore-mtime blog.jxck.io/entries/**/*.md

mtime-podcast:
	git restore-mtime mozaic.fm/episodes/**/*.md

blog:
	$(MAKE) fmt-blog
	$(MAKE) mtime-blog
	cd .src && $(NODE) build.ts blog
	cd .src && $(NODE) build.ts blog_index

podcast:
	$(MAKE) fmt-podcast
	$(MAKE) mtime-podcast
	cd .src && $(NODE) build.ts podcast

compile:
	$(NODE) -v
	cd .src && $(NODE) build.ts build

preview:
	cd .src && $(NODE) build.ts preview

draft:
	cd .src && $(NODE) build.ts draft

install:
	brew bundle --file=$(DOTFILES)/Brewfile
	npm install
	.h2o/install.sh

update:
	ncu -u

systemd-list:
	@systemctl list-unit-files | grep $(foreach service, $(notdir $(wildcard ./.systemd/*)), -e '^$(service)')

systemd-status:
	$(foreach service, $(notdir $(wildcard ./.systemd/*)), systemctl status $(service))


## optimize all image
image:
	$(MAKE) -j$(CORES) png jpeg gif
	$(MAKE) -j$(CORES) webp avif


##########################
# Compression
##########################
# 探索は www/blog/mozaic のみ
# 対象外ファイルを除き brotli で圧縮する (zopfli/gz は h2o 側でやることにした)
WWW := $(shell selects path from "./www.jxck.io/**/*"  where "file?" "==" "true" and extname "!~" ".gz|.br|.sb|.png|.jpeg|.gif|.webp|.avif|.mp4|.webm|.rb|.md|.txt|.woff2|.sh|.cgi" order by path desc)
BLO := $(shell selects path from "./blog.jxck.io/**/*" where "file?" "==" "true" and extname "!~" ".gz|.br|.sb|.png|.jpeg|.gif|.webp|.avif|.mp4|.webm|.rb|.md|.txt|.woff2|.sh|.cgi" and      path "!~" "drafts" and path "!~" "tags" order by path desc)
MOZ := $(shell selects path from "./mozaic.fm/**/*"    where "file?" "==" "true" and extname "!~" ".gz|.br|.sb|.png|.jpeg|.gif|.webp|.avif|.mp4|.webm|.rb|.md|.txt|.woff2|.sh|.cgi" order by path desc)
TARGET := $(WWW) $(BLO) $(MOZ)

ENTRIES := $(shell selects path from "./blog.jxck.io/entries/**/*.html")

BR = $(addsuffix .br, $(TARGET))

%.br: %
	brotli -q 11 -f $<

# 対象ファイルを圧縮
comp:
	$(MAKE) -j$(CORES) $(BR)

# 圧縮を削除
clean:
	@rm -fv $(BR)

##########################
# Build Markdown
##########################

# .md
BMD = $(wildcard ./blog.jxck.io/entries/**/*.md)
PMD = $(wildcard ./mozaic.fm/episodes/**/*.md)

# .html
BHTML = $(BMD:.md=.html)
PHTML = $(PMD:.md=.html)

# ビルド結果(HTML)も削除
remove:
	@rm -fv $(BHTML)
	@rm -fv $(PHTML)


##########################
# Optimize Image
##########################

## png
OPTIPNG := optipng -o7
png:
	find ./blog.jxck.io/entries -name '*.png' \
		| parallel -j $(CORES) $(OPTIPNG)

## jpeg
JPEGTRAN := jpegtran -copy none -optimize -progressive
jpeg:
	find ./blog.jxck.io/entries -name '*.jpeg' \
		| parallel -j $(CORES) 'echo {} && $(JPEGTRAN) -outfile {} {}'

## gif
GIFSICLE := gifsicle --optimize=3 --colors 256 -v
gif:
	find ./blog.jxck.io/entries -name '*.gif' \
		| parallel -j $(CORES) '$(GIFSICLE) {} -o {}'


PNG = $(wildcard ./blog.jxck.io/entries/**/*.png)
JPG = $(wildcard ./blog.jxck.io/entries/**/*.jpeg)
GIF = $(wildcard ./blog.jxck.io/entries/**/*.gif)


## webp
CWEBP = cwebp -q 40 -quiet -m 6
GWEBP = gif2webp -q 40 -quiet -m 6

WEBP = $(PNG:.png=.webp)
WEBP += $(JPG:.jpeg=.webp)
WEBP += $(GIF:.gif=.webp)

%.webp: %.png
	$(CWEBP) $< -o $@
	touch -r $< $@

%.webp: %.jpeg
	$(CWEBP) $< -o $@
	touch -r $< $@

%.webp: %.gif
	$(GWEBP) $< -o $@
	touch -r $< $@

webp:
	$(MAKE) -j$(CORES) $(WEBP)


## avif
AVIFENC := avifenc --speed 0 --min 0 --max 40

AVIF = $(PNG:.png=.avif)
AVIF += $(JPG:.jpeg=.avif)
AVIF += $(GIF:.gif=.avif)

%.avif: %.png
	$(AVIFENC) -o $@ $<
	touch -r $< $@

%.avif: %.jpeg
	$(AVIFENC) -o $@ $<
	touch -r $< $@

%.avif: %.gif
	ffmpeg -i $< -pix_fmt yuv420p -f yuv4mpegpipe - | avifenc --stdin --fps 15 $@
	touch -r $< $@

avif:
	$(MAKE) -j$(CORES) $(AVIF)


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

reload:
	sudo .h2o/local/bin/h2o -t -c h2o.conf | cat
	sudo systemctl daemon-reload
	sudo systemctl reload h2o

test:
	sudo .h2o/local/bin/h2o -t -c h2o.conf | cat

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
