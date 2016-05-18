#!/usr/bin/env ruby

ARGV.each do |dir|
  rm = "find ./#{dir}/* -name *.gz | xargs -L 4 -P 4 rm"
  puts rm
  puts system(rm)

  zopfli = "find ./#{dir}/* -type f | egrep -v '.webp|.rb|.otf|.woff|pdf.js|main.js' | xargs -L 1 -P 4 zopfli --i30"
  puts zopfli
  puts system(zopfli)
end
