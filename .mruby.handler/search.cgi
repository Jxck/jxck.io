#!/usr/bin/env ruby

require "uri"
require "pathname"
require "cgi/escape"

def log(*a)
  STDERR.print(*a)
  #p(*a)
end

def search(base, keyword)
  Pathname.glob("#{base}/entries/**/*.md").reduce([]){|acc, path|
    body = File.read(path)
    hits = body.scan(/^.*#{keyword}.*$/i)
    next acc if hits.empty?
    title = body.lines.first.match(/^# \[.*\] (.*)/)[1]
    url   = path.relative_path_from(base).sub_ext(".html")
    date  = path.dirname.basename()
    acc.append({url: url, title: title, date: date, hits: hits, keyword: keyword})
  }
end

def hash(prefix, keyword, suffix)
  word   = CGI.escape(keyword)
  prefix = CGI.escape(prefix.strip.split(" ").last  || "")
  suffix = CGI.escape(suffix.strip.split(" ").first || "")

  prefix = "#{prefix}-," unless prefix.empty?
  suffix = ",-#{suffix}" unless suffix.empty?

  "#{prefix}#{word}#{suffix}"
end

def build(keyword, result)
  li = result.map{|entry|
    title = entry[:title]
    date  = entry[:date]
    url   = entry[:url]
    hits  = entry[:hits]
    keyword = entry[:keyword]

    deep = hits.map{|hit|
      hit = hit.strip.gsub(/^- /, '').gsub(/^\#{,4} /, '')
      m   = hit.match(/(?<prefix>.*)(?<keyword>#{keyword})(?<suffix>.*)/i)

      keyword = m[:keyword]
      prefix  = m[:prefix]
      suffix  = m[:suffix]

      <<-EOS
        <li>
          #{CGI.escapeHTML(prefix)}
          <a href=https://blog.jxck.io#{url}#:~:text=#{hash(prefix, keyword, suffix)}>
            #{CGI.escapeHTML(keyword)}
          </a>
          #{CGI.escapeHTML(suffix)}
        </li>
      EOS
    }.join("\n")

    <<-EOS
      <li>
        <time datetime="#{date}">#{date}</time>
        <a href=https://blog.jxck.io#{url}#:~:text=#{keyword}>#{title}</a>
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
  # ROOT for exec from shell when test
  base         = Pathname.new((ENV["ROOT"] || ENV["PWD"]) ++ "/blog.jxck.io")
  path_info    = ENV["PATH_INFO"] || ""
  query_string = ENV["QUERY_STRING"]

  query = URI.decode_www_form(query_string).to_h
  q     = Regexp.escape(query["q"] || "")

  if q.nil? or q.empty?
    STDOUT.print "Status: 400 Bad Request\n\n"
    exit(0)
  end

  result = search(base, q)
  html   = build(q, result)

  STDOUT.print "Status: 200 OK\n\n"
  STDOUT.print html
rescue => err
  STDOUT.print "Status: 500 Internal Server Error\n\n"
  STDERR.puts "\n" + err.full_message(highlight: true)
  exit(0)
end
