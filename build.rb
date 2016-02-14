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

puts <<-EOS
<!DOCTYPE html>
<meta charset=utf-8>
<meta name=viewport content="width=device-width,initial-scale=1">

<title>blog.jxck.io</title>
<link rel=prerender href=#{top}>
<link rel=stylesheet type=text/css href=//www.jxck.io/assets/css/body.css>

<link rel=stylesheet type=text/css href=//www.jxck.io/assets/css/header.css>
<header>
  <div>
    <a class=logo href=//jxck.io><img alt="jxck logo" src=//jxck.io/assets/img/jxck.png></a>
    <a class=path href=/>blog.jxck.io</a>
    <a class=feed href=/feeds/atom.xml><img alt="rss feed" src=//jxck.io/assets/img/rss.svg></a>
  </div>
</header>

<link rel=stylesheet type=text/css href=//www.jxck.io/assets/css/main.css>
<main class=archive>
  <h1><a href=#archive>Archive</a></h1>
  <h2><a href=#2016>2016</a></h2>
  <ul>
    #{entries.join("\n    ")}
  </ul>
</main>

<hr>

<link rel=stylesheet type=text/css href=//www.jxck.io/assets/css/footer.css>
<footer>
  <address class=copyright>Copyright &copy; 2016 <a href=/>Jxck</a>. All Rights Reserved.</address>
</footer>
EOS
