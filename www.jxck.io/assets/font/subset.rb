#!/usr/bin/env ruby

NOTO = "../../../blog.jxck.io/entries/2016-03-14/web-font-noto-sans.html"
UNI  = "../../../blog.jxck.io/entries/2017-03-02/unicode-in-javascript.html"
ALL  = "../../../blog.jxck.io/entries/**/*.html"

current = Dir.glob(ALL).reject {|file|
  file.include?(".amp.html")
}.map {|file|
  File.read(file)
    .gsub(/<code.*?<\/code>/m, '')
    .gsub("\n", "")
    .gsub(/(.)/, '\\1\n')
}.join("").split('\n').sort.uniq.tap{|chars|
  chars.each{|char|
    # puts "#{char}: #{char.codepoints.map{|c| '0x'+c.to_s(16)}}"
  }
}

all = File.read("./All.txt").split("\n")

p (current - all)

IO.write("./All.txt", current.join("\n"))
