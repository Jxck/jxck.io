.PHONY: blog podcast comp gz br remove clean webp
.SUFFIXES: .html .md .amp .amp.html .webp .png .jpeg .gif

build:
	make full
	make blogfeed
	make podcastfeed
	make image
	make comp


##########################
# Compression
##########################
# 探索は www/blog/mozaic のみ
# .webp, .rb, .md, .txt は対象外
# これを brotli/zopfli で圧縮する
WWW := $(shell selects path from "./www.jxck.io/**/*"  where path "!~" "drafts" and path "!~" "tags" and extname "=~" "[^.gz|.br|.webp|.rb|.md|.txt|.woff2|.sh]")
BLO := $(shell selects path from "./blog.jxck.io/**/*" where path "!~" "drafts" and path "!~" "tags" and extname "=~" "[^.gz|.br|.webp|.rb|.md|.txt|.woff2|.sh]")
MOZ := $(shell selects path from "./mozaic.fm/**/*"    where path "!~" "drafts" and path "!~" "tags" and extname "=~" "[^.gz|.br|.webp|.rb|.md|.txt|.woff2|.sh]")
TARGET = $(WWW) $(BLO) $(MOZ)

GZ = $(addsuffix .gz, $(TARGET))
BR = $(addsuffix .br, $(TARGET))

# 対象ファイルを圧縮
comp: $(BR) $(GZ)

gz:$(GZ)

br:$(BR)

%.gz: %
	zopfli --i30 $<

%.br: %
	brotli -n -f $<

# 圧縮を削除
clean:
	@rm -fv $(GZ)
	@rm -fv $(BR)

# ビルド結果(HTML)も削除
remove:
	@rm -fv $(BHTML)
	@rm -fv $(BHTML:.html=.amp.html)
	@rm -fv $(PHTML)


##########################
# Build Markdown
##########################
MARK = bundle exec ruby ./.script/main.rb

# .md
BMD := $(shell find ./blog.jxck.io/entries/**/*.md)
PMD := $(shell find ./mozaic.fm/episodes/**/*.md)

# .html
BHTML = $(BMD:.md=.html)
PHTML = $(PMD:.md=.html)

# .md -> .html
.md.html:
	$(MARK) $(if $(findstring blog.jxck.io, $*), --blog, --podcast) ./$*.md


# build
blog: $(BHTML)
	$(MARK) --blogindex

podcast: $(PHTML)
	$(MARK) --podcastindex

full:
	$(MARK) --full
	$(MARK) --blogindex
	$(MARK) --podcastindex


# feed
blogfeed:
	$(MARK) --blogfeed

podcastfeed:
	$(MARK) --podcastfeed


# test
blogtest:
	$(MARK) --blogtest

podcasttest:
	$(MARK) --podcasttest

marktest:
	$(MARK) --marktest


##########################
# Optimize Image
##########################
CWEBP = cwebp -q 40 -quiet
GWEBP = gif2webp -q 40 -quiet

PNG := $(wildcard ./blog.jxck.io/entries/**/*.png)
JPG := $(wildcard ./blog.jxck.io/entries/**/*.jpeg)
GIF := $(wildcard ./blog.jxck.io/entries/**/*.gif)

WEBP = $(PNG:.png=.webp)
WEBP += $(JPG:.jpeg=.webp)
WEBP += $(GIF:.gif=.webp)

.png.webp:
	$(CWEBP) $*.png -o $*.webp

.jpeg.webp:
	$(CWEBP) $*.jpeg -o $*.webp

.gif.webp:
	$(GWEBP) $*.gif -o $*.webp


# webp 生成
webp: $(WEBP)


#--gulp----------------------------
# .png/.jpg/.svg
IMAGES := $(shell find ./blog.jxck.io/entries/**/* \
	-name *.png -or \
	-name *.jpg -or \
	-name *.svg)

# optimize all image
image:
	@for target in $(IMAGES); do \
		gulp image --path $$target; \
	done
#--gulp----------------------------


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

kill:
	sudo systemctl kill h2o

restart:
	sudo systemctl restart h2o

reload:
	sudo systemctl reload h2o

test:
	$(DOTFILES)/local/h2o/bin/h2o -t -c h2o.conf | cat

## h2o local
_start:
	sudo $(DOTFILES)/local/h2o/bin/h2o -m daemon -c h2o.conf

_stop:
	sudo kill -TERM `cat ../pid/h2o.pid`

_restart:
	npm run _stop
	npm run _start


##########################
# other
##########################
cron:
	sudo crontab -u root .crontab/*
	sudo crontab -u root -l
