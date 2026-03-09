.PHONY: build compile preview draft fmt install update image png jpeg gif webp avif comp clean remove space singler format start stop status kill restart reload test logf

NODE := $(HOME)/.local/share/mise/installs/node/latest/bin/node

build:
	$(MAKE) fmt
	cd .src && $(NODE) build.js build
	$(MAKE) comp

compile:
	$(NODE) -v
	cd .src && $(NODE) build.js build

preview:
	cd .src && $(NODE) build.js preview

draft:
	cd .src && $(NODE) build.js draft

fmt:
	.src/markdown/formatter.js blog.jxck.io/entries/**/*.md
	npx prettier -w mozaic.fm/episodes/**/*.md

install:
	npm install
	$(DOTFILES)/install/install-avif.sh
	$(DOTFILES)/install/install-brotli.sh
	$(DOTFILES)/install/install-webp.sh
	$(DOTFILES)/install/install-guetzli.sh
	.h2o/install.sh

update:
	ncu -u

systemd-list:
	@systemctl list-unit-files | grep $(foreach service, $(notdir $(wildcard ./.systemd/*)), -e '^$(service)')

systemd-status:
	$(foreach service, $(notdir $(wildcard ./.systemd/*)), systemctl status $(service))


## optimize all image
image:
	which optipng
	which guetzli
	which gifsicle
	which avifenc
	which ffmpeg
	which cwebp gif2webp
	$(MAKE) png
	$(MAKE) jpeg
	$(MAKE) gif
	$(MAKE) webp
	$(MAKE) avif


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
SB = $(addsuffix .sb, $(ENTRIES))

%.br: %
	brotli -q 11 -f $<

%.sb: %
	brotli -q 11 -f --dictionary=$(wildcard ./blog.jxck.io/dictionary/*dict) --suffix=.sb $<

# 対象ファイルを圧縮
comp: $(BR) $(SB)

# 圧縮を削除
clean:
	@rm -fv $(BR)
	@rm -fv $(SB)

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
	  | xargs -P$(shell core) -I{} sh -c '$(OPTIPNG) {}'

## jpeg
GUETZLI := guetzli
jpeg:
	find ./blog.jxck.io/entries -name '*.jpeg' \
		| xargs -P$(shell core) -I{} sh -c 'echo {} && $(GUETZLI) {} {}'

## gif
GIFSICLE := gifsicle --optimize=3 --colors 256 -v
gif:
	find ./blog.jxck.io/entries -name '*.gif' \
		| xargs -P$(shell core) -I{} sh -c '$(GIFSICLE) {} -o {}'


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

webp: $(WEBP)


## avif
CAVIF = npx avif --speed 0 --quality 40

AVIF = $(PNG:.png=.avif)
AVIF += $(JPG:.jpeg=.avif)
AVIF += $(GIF:.gif=.avif)

%.avif: %.png
	$(CAVIF) --input $<
	touch -r $< $@

%.avif: %.jpeg
	$(CAVIF) --input $<
	touch -r $< $@

%.avif: %.gif
	ffmpeg -i $< -pix_fmt yuv420p -f yuv4mpegpipe - | avifenc --stdin --fps 15 $@
	touch -r $< $@

avif: $(AVIF)


##########################
# formatter
##########################
space:
	selects path from './blog.jxck.io/entries/**/*' where extname '==' '.md' | xargs -L 1 spacer
	selects path from './mozaic.fm/episodes/**/*'   where extname '==' '.md' | xargs -L 1 spacer

singler:
	selects path from './blog.jxck.io/entries/**/*' where extname '==' '.md' | xargs -L 1 singler
	selects path from './mozaic.fm/episodes/**/*'   where extname '==' '.md' | xargs -L 1 singler

format:
	selects path from './blog.jxck.io/entries/**/*' where extname '==' '.md' | xargs -L 1 format.rb
	selects path from './mozaic.fm/episodes/**/*'   where extname '==' '.md' | xargs -L 1 format.rb


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
