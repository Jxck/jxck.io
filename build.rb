#!/usr/bin/env ruby

`find ./* -name *.gz | xargs -L 4 -P 4 rm`
puts "gz deleted"
`rm ./blog.jxck.io/entries/**/*.html`
puts "html deleted"

production = ARGV[0] == "production"

top = ""
entries = Dir.glob("./blog.jxck.io/entries/**/**")
  .select{|path| path.match(/.*.md$/)}
  .sort{|a,b| b <=> a }
  .map.with_index{|file, i|
    puts "process #{file}"

    `./mark.js #{file}`
    head = `head -n 1 #{file}`

    title = head.match(/\# \[.*\] (.*)/)[1]

    tags = head
      .scan(/\[(.+?)\]/)
      .map{|s| s.pop }
      .map{|tag| "<a>#{tag}</a>" }
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

if production
  # compression
  `find ./www.jxck.io/* -type f | egrep -v '.webp|.rb' | xargs -L 1 -P 4 zopfli --i30`
  puts "www.jxck.io compressed"
  `find ./labs.jxck.io/* -type f | egrep -v '.webp|.rb' | xargs -L 1 -P 4 zopfli --i30`
  puts "labs.jxck.io compressed"
  `find ./blog.jxck.io/* -type f | egrep -v '.webp|.rb|.xml' | xargs -L 1 -P 4 zopfli --i30`
  puts "blog.jxck.io compressed"
end
