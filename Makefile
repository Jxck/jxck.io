.PHONY: blog podcast comp gz br remove clean webp avif
.SUFFIXES: .html .md .amp .amp.html .webp .avif .png .jpeg .gif

build:
	cd .src && node build.js build
	make comp

compile:
	cd .src && node build.js build

preview:
	cd .src && node build.js preview

draft:
	cd .src && node build.js draft

fmt:
	cd .src && node build.js format

install:
	npm install
	workbox copyLibraries www.jxck.io/assets/js
	$(DOTFILES)/install/install-avif.sh
	$(DOTFILES)/install/install-brotli.sh
	$(DOTFILES)/install/install-h2o.sh
	$(DOTFILES)/install/install-webp.sh
	$(DOTFILES)/install/install-guetzli.sh

update:
	ncu -u

systemd-list:
	@systemctl list-unit-files | grep $(foreach service, $(notdir $(wildcard ./.systemd/*)), -e '^$(service)')

systemd-status:
	$(foreach service, $(notdir $(wildcard ./.systemd/*)), systemctl status $(service))

cron:
	sudo crontab -u root .crontab/*
	sudo crontab -u root -l


## optimize all image
image:
	which pngquant
	which optipng
	which jpeg-recompress
	which mozjpeg
	which guetzli
	which gifsicle
	which avif
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
WWW = $(shell selects path from "./www.jxck.io/**/*"  where "file?" "==" "true" and extname "!~" ".gz|.br|.png|.jpeg|.gif|.webp|.avif|.mp4|.webm|.rb|.md|.txt|.woff2|.sh|.cgi" order by path desc)
BLO = $(shell selects path from "./blog.jxck.io/**/*" where "file?" "==" "true" and extname "!~" ".gz|.br|.png|.jpeg|.gif|.webp|.avif|.mp4|.webm|.rb|.md|.txt|.woff2|.sh|.cgi" and      path "!~" "drafts" and path "!~" "tags" order by path desc)
MOZ = $(shell selects path from "./mozaic.fm/**/*"    where "file?" "==" "true" and extname "!~" ".gz|.br|.png|.jpeg|.gif|.webp|.avif|.mp4|.webm|.rb|.md|.txt|.woff2|.sh|.cgi" order by path desc)
TARGET = $(WWW) $(BLO) $(MOZ)

ENTRIES = $(shell selects path from "./blog.jxck.io/entries/**/*.html")

BR = $(addsuffix .br, $(TARGET))
SB = $(addsuffix .sb, $(ENTRIES))

#HASH_TARGET = $(shell etag.rb $(filter-out %.html, $(TARGET)))
#COMP_TARGET = $(addsuffix .br, $(HASH_TARGET) $(filter %.html, $(TARGET)))

# .js => .xxxx.js
#$(HASH_TARGET): $(TARGET)
#	cp $(abspath $<) $(abspath $@)

# .xxx.js => .xxx.js.br
#$(COMP_TARGET): $(HASH_TARGET)

%.br: %
	brotli -f $<
	touch -r $< $@

%.sb: %
	brotli -f --dictionary=$(wildcard ./blog.jxck.io/dictionary/*dict) --suffix=.sb $<
	touch -r $< $@

# 対象ファイルを圧縮
comp: $(BR) $(SB)

# 圧縮を削除
clean:
	@rm -fv $(BR)
	@rm -fv $(SB)

# ビルド結果(HTML)も削除
remove:
	@rm -fv $(BHTML)
	@rm -fv $(BHTML:.html=.amp.html)
	@rm -fv $(PHTML)


##########################
# Build Markdown
##########################

# .md
BMD = $(wildcard ./blog.jxck.io/entries/**/*.md)
PMD = $(wildcard ./mozaic.fm/episodes/**/*.md)

# .html
BHTML = $(BMD:.md=.html)
PHTML = $(PMD:.md=.html)

# .md -> .html
.md.html:
	$(MARK) $(if $(findstring blog.jxck.io, $*), --blog, --podcast) ./$*.md


##########################
# Optimize Image
##########################

## png
PNGQUANT := pngquant --force --skip-if-larger --speed 1 --strip --ext .png --verbose
OPTIPNG  := optipng -o7
png:
	find ./blog.jxck.io/entries/**/*.png \
	  | xargs -P$(shell core) -i{} sh -c '$(OPTIPNG) {}'
		#| xargs -P$(shell core) -i{} sh -c '$(PNGQUANT) {}'

## jpeg
JPEGRECOMP := jpeg-recompress --strip
MOZJPEG    := mozjpeg -optimize
GUETZLI    := guetzli
jpeg:
	find ./blog.jxck.io/entries/**/*.jpeg \
		| xargs -P$(shell core) -i{} sh -c 'echo {} && $(GUETZLI) {} {}'
		#| xargs -P$(shell core) -i{} sh -c 'echo {} && $(JPEGRECOMP) {} {}'
		#| xargs -P$(shell core) -i{} sh -c '$(MOZJPEG) -outfile {} {}'

## gif
GIFSICLE := gifsicle --optimize=3 --colors 256 -v
gif:
	find ./blog.jxck.io/entries/**/*.gif \
		| xargs -P$(shell core) -i{} sh -c '$(GIFSICLE) {} -o {}'


PNG = $(wildcard ./blog.jxck.io/entries/**/*.png)
JPG = $(wildcard ./blog.jxck.io/entries/**/*.jpeg)
GIF = $(wildcard ./blog.jxck.io/entries/**/*.gif)


## webp
CWEBP = cwebp -q 40 -quiet -m 6
GWEBP = gif2webp -q 40 -quiet -m 6

WEBP = $(PNG:.png=.webp)
WEBP += $(JPG:.jpeg=.webp)
WEBP += $(GIF:.gif=.webp)

.png.webp:
	$(CWEBP) $*.png -o $*.webp

.jpeg.webp:
	$(CWEBP) $*.jpeg -o $*.webp

.gif.webp:
	$(GWEBP) $*.gif -o $*.webp

webp: $(WEBP)


## avif
CAVIF = avif --speed 0 --quality 40 --verbose

AVIF = $(PNG:.png=.avif)
AVIF += $(JPG:.jpeg=.avif)
AVIF += $(GIF:.gif=.avif)

.png.avif:
	$(CAVIF) --input $*.png

.jpeg.avif:
	$(CAVIF) --input $*.jpeg

.gif.avif:
	ffmpeg -i $*.gif -pix_fmt yuv420p -f yuv4mpegpipe - | avifenc --stdin --fps 15 $*.avif

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
	sudo $(DOTFILES)/local/h2o/bin/h2o -t -c h2o.conf | cat
	sudo systemctl reload h2o

test:
	sudo $(DOTFILES)/local/h2o/bin/h2o -t -c h2o.conf | cat

## h2o local
_start:
	sudo $(DOTFILES)/local/h2o/bin/h2o -m daemon -c h2o.conf

_stop:
	sudo kill -TERM `cat ./.pid/h2o.pid`

_restart:
	$(MAKE) _stop
	$(MAKE) _start