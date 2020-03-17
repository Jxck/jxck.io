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
    result = body.scan(/^.*#{keyword}.*$/i).reject{|line| line.start_with?("# [")}
    next acc if result.empty?
    title = body.lines.first.match(/^# \[.*\] (.*)/)[1]
    path  = path.match(/(\/entries.*)/)[1]
    acc.append({path: path, title: title, result: result})
  }
end

def build(keyword, result)
  li = result.map{|entry|
    "<li><a href=https://blog.jxck.io#{entry[:path]}#:~:text=#{CGI.escape(keyword)}>#{entry[:title]}</a></li>"
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
