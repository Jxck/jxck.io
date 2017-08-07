#!/usr/bin/env ruby

ARGV.each do |dir|
  rm = "selects path from './#{dir}/**/*' where extname '=~' 'gz|br' | sed -E 's/(.*)/\"\\1\"/' | xargs -P 4 rm"
  puts rm
  puts system(rm)

  zopfli = "find ./#{dir}/* -type f | sed -E 's/(.*)/\"\\1\"/' | egrep -v '.gz|.br|.webp|.rb|.otf|.woff|pdf.js|main.js' | xargs -P 4 zopfli --i30"
  puts zopfli
  puts system(zopfli)

  brotli = "find ./#{dir}/* -type f | sed -E 's/(.*)/\"\\1\"/' | egrep -v '.gz|.br|.webp|.rb|.otf|.woff|pdf.js|main.js' | xargs -P 4 -IXXX bro --quality 10 --input XXX --output XXX.br"
  puts brotli
  puts system(brotli)
end
