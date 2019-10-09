#!/usr/bin/env ruby
# このスクリプトを実行すると、現時点のエントリの中から All.txt に入ってない文字だけを出す。
# この出力を All.txt に入れてフォントセットを作り直す。
# そこから https://noto-website.storage.googleapis.com/pkgs/NotoSansCJKjp-hinted.zip をベースに
# http://opentype.jp/subsetfontmk.htm を使って生成し
# http://opentype.jp/woffconv.htm で woff にする
# バージョンをつけてデプロイする。
current = Dir.glob("../../../blog.jxck.io/entries/**/*.md").reject {|file|
  [
    "../../../blog.jxck.io/entries/2016-03-14/web-font-noto-sans.md",
    "../../../blog.jxck.io/entries/2017-03-02/unicode-in-javascript.md",
  ].include?(file)
}.map {|file|
  File.read(file).gsub("\n", "").gsub(/(.)/, '\\1\n')
}.join("").split('\n').sort.uniq

all = File.read("./All.txt").split("\n")

# これらはフォントのサブセットに含めない
ignore = [
  "",       # empty
  "\u0009", # tab
  "\u0020", # space

  # unicode-in-javascript の中で出てくるやつ
  # "\u0304", # combining macron
  # "\u0308", # combining diaeresis
  # "\u200d", # zero width joiner
  # "\u309a", # 片仮名の丸
  # "\ufffd", # replacement character
  # "🏻",
  # "🏼",
  # "🏽",
  # "🏾",
  # "🏿",
  # "👍",
  # "👦",
  # "👧",
  # "👨",
  # "👩",
  # "😭",
  # ["E0100".hex].pack('U*'), # variation selector 17
]

diff = (current - all - ignore)

diff.each{|char|
  puts "#{char}: #{char.codepoints.map{|c| '0x'+c.to_s(16)}}"
}
