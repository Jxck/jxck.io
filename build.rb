#!/usr/bin/env ruby

# index.html をビルド
top = ""
entries = Dir.glob("./blog.jxck.io/entries/**/**")
  .select { |path| path.match(/.*.md$/) }
  .sort { |a, b| b <=> a }
  .map.with_index { |file, i|
    # read first line
    head = open(file) {|f| f.gets }

    # get title
    title = head.match(/\# \[.*\] (.*)/)[1]

    # get tags
    tags = head
      .scan(/\[(.+?)\]/)
      .map(&:pop)
      .map { |tag| "<a>#{tag}</a>" }
      .reverse
      .join(",")

    tagspan = "<span class=tags>[#{tags}]</span>"

    splitted = file.split("/")
    name = splitted.pop.gsub(".md", ".html")
    date = splitted.pop
    url = "entries/#{date}/#{name}"
    top = url if i == 0
    "<li><time datetime=#{date}>#{date}</time><a href=#{url}>#{title}</a>#{tagspan}"
  }
  .join("\n    ")

html = File.read(".template/archive.html")
html = html.gsub('"', '\"')
html = eval('"' + html + '"')

File.write("./blog.jxck.io/index.html", html)
puts "build index.html"
