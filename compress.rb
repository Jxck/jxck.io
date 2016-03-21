#!/usr/bin/env ruby

dir = ARGV[0]

rm = "rm -f ./#{dir}/**/*.gz"
puts rm
puts system(rm)

zopfli = "find ./#{dir}/* -type f | egrep -v '.webp|.rb|.otf|.woff|pdf.js' | xargs -L 1 -P 4 zopfli --i30"
puts zopfli
puts system(zopfli)
