#!/usr/bin/env ruby


noto = "../../../blog.jxck.io/entries/2016-03-14/web-font-noto-sans.html"
uni  = "../../../blog.jxck.io/entries/2017-03-02/unicode-in-javascript.html"
all  = "../../../blog.jxck.io/entries/**/*.html"

current = Dir.glob(all).reject {|file|
  file.include?(".amp.html")
}.map {|file|
  File.read(file)
    .gsub(/<code.*?<\/code>/m, '')
    .gsub("\n", "")
    .gsub(/(.)/, '\\1\n')
}.join("").split('\n').sort.uniq.each{|char|

  puts "#{char}: #{char.codepoints.map{|c| '0x'+c.to_s(16)}}"
}
