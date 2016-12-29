#!/usr/bin/env ruby
# このスクリプトを実行すると、現時点のエントリの中から All.txt に入ってない文字だけを出す。
# この出力を All.txt に入れてフォントセットを作り直す。
# そこから https://noto-website.storage.googleapis.com/pkgs/NotoSansCJKjp-hinted.zip をベースに
# http://opentype.jp/subsetfontmk.htm を使って生成し
# http://opentype.jp/woffconv.htm で woff にする
# バージョンをつけてデプロイする。
current = Dir.glob('../../../blog.jxck.io/entries/**/*.md').select {|file|
  file != '../../../blog.jxck.io/entries/2016-03-14/web-font-noto-sans.md'
}.map {|file|
  File.read(file).gsub(/(.)/, '\\1\n')
}.join('').split('\n').sort.uniq

all = File.read('./All.txt').split('\n')

puts(current - all - ['', ' ', '\t'])
