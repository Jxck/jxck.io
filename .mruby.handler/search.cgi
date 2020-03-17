#!/usr/bin/env ruby

require "uri"
require "cgi/escape"

def log(*a)
  STDERR.print(*a)
  #p(*a)
end

def search(root, keyword)
  Dir.glob("#{root}/blog.jxck.io/entries/**/*.md").reject{|path|
    path.end_with?("amp.html")
  }.reduce([]){|acc, path|
    body = File.read(path)
    hits  = body.scan(/^.*#{keyword}.*$/i).reject{|line| line.start_with?("# [")}
    next acc if hits.empty?
    title = body.lines.first.match(/^# \[.*\] (.*)/)[1]
    path  = path.match(/(\/entries.*)/)[1].sub(".md", ".html")
    date  = path.match(/\/entries\/(\d{4}-\d{2}-\d{2})\/.*/)[1]
    acc.append({path: path, title: title, date: date, hits: hits, keyword: keyword})
  }
end

def build(keyword, result)
  li = result.map{|entry|
    title = entry[:title]
    date  = entry[:date]
    path  = entry[:path]
    hits  = entry[:hits]
    keyword = entry[:keyword]

    deep = hits.map{|hit|
      hit = hit.strip.gsub(/^- /, '').gsub(/^\#{,4} /, '')
      m = hit.match(/(?<prefix>.*)(?<keyword>#{keyword})(?<suffix>.*)/i)

      word   = CGI.escape(m[:keyword])
      prefix = CGI.escape(m[:prefix].strip.split(" ").last  || "")
      suffix = CGI.escape(m[:suffix].strip.split(" ").first || "")

      prefix = "#{prefix}-," unless prefix.empty?
      suffix = ",-#{suffix}" unless suffix.empty?

      hash = "#{prefix}#{word}#{suffix}"
      line =  CGI.escapeHTML(hit)
      {hash: hash, line: line}
    }.map{|hits|
      "<li><a href=https://blog.jxck.io#{path}#:~:text=#{hits[:hash]}>#{hits[:line]}</a></li>"
    }.join("\n")

    <<-EOS
      <li>
        <time datetime="#{date}">#{date}</time>
        <a href=https://blog.jxck.io#{path}#:~:text=#{keyword}>#{title}</a>
        <ul>
          #{deep}
        </ul>
      </li>
    EOS
  }.join("\n      ")

  html = <<-EOS
  <html>
    <meta charset="utf-8">
    <form action=searches method=get>
      <input type=text name=q>
      <button type=submit>search</button>
    </form>
    <title>Search Result of #{CGI.escapeHTML(keyword)}</title>
    <h1>Search Result of #{CGI.escapeHTML(keyword)}</h1>
    <ul>
      #{li}
    </ul>
  </html>
  EOS
end

begin
  root         = ENV["ROOT"] || ENV["PWD"]
  path_info    = ENV["PATH_INFO"] || ""
  query_string = ENV["QUERY_STRING"]

  query = URI.decode_www_form(query_string).to_h
  q     = query["q"]

  if q.nil? or q.empty?
    STDOUT.print "Status: 400 Bad Request\n\n"
    exit(0)
  end

  result = search(root, q)
  html   = build(q, result)

  STDOUT.print "Status: 200 OK\n\n"
  STDOUT.print html
rescue => err
  STDOUT.print "Status: 500 Internal Server Error\n\n"
  STDERR.puts "\n" + err.full_message(highlight: true)
  exit(0)
end
