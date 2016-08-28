#!/usr/bin/env ruby
# このスクリプトを実行すると、現時点のエントリの中から All.txt に入ってない文字だけを出す。
# この出力を All.txt に入れて、フォントを生成し直し、バージョンをつけてデプロイする。
current = Dir.glob("../../../blog.jxck.io/entries/**/*.md").select{|file|
  file != "../../../blog.jxck.io/entries/2016-03-14/web-font-noto-sans.md"
}.map{|file|
  File.read(file).gsub(/(.)/, "\\1\n")
}.join("").split("\n").sort.uniq #.join("\n")

all = File.read("./All.txt").split("\n")

puts (current - all - ["", " ", "\t"])
