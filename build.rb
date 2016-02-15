#!/usr/bin/env ruby

top = ""
entries = Dir.glob("./blog.jxck.io/entries/**/**")
  .select{|path| path.match(/.*.md/)}
  .sort{|a,b| b <=> a }
  .map.with_index{|file, i|

    `./mark.js #{file}`
    head = `head -n 1 #{file}`

    title = head.match(/\# \[.*\] (.*)/)[1]

    tags = head
      .scan(/\[(.+?)\]/)
      .map{|s| s.pop }
      .map{|tag| "<a>#{tag}</a>" }
      .reverse
      .join

    tagspan = "<span class=tags>#{tags}</span>"

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

puts html
