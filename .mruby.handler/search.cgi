#!/usr/bin/env ruby

require "uri"
require "cgi/escape"

def log(*a)
  STDERR.puts(*a)
  #p(*a)
end

def search(keyword)
  log keyword
  result = Dir.glob("#{ENV["SERVER"]}/jxck.io/blog.jxck.io/entries/**/*.html")
              .reject{|path|
                path.end_with?("amp.html")
              }.map{|path|
                body = File.read(path)
                {path: path, body: body}
              }.select{|entry|
                entry[:body].match?(keyword)
              }.map{|entry|
                title = entry[:body].match(/<title>(.*) \| blog.jxck.io<\/title>/)[1]
                path  = entry[:path].match(/(\/entries.*)/)[1]
                {title: title, path: path}
              }


  li = result.map{|entry|
    "<li><a href=https://blog.jxck.io#{entry[:path]}#:~:text=#{CGI.escape(keyword)}>#{entry[:title]}</a></li>"
  }.join("\n      ")

  html = <<-EOS
  <html>
    <title>Search Result of #{CGI.escapeHTML(keyword)}</title>
    <h1>Search Result of #{CGI.escapeHTML(keyword)}</h1>
    <ul>
      #{li}
    </ul>
  </html>
  EOS
end

begin
  path_info    = ENV["PATH_INFO"] || ""
  query_string = ENV["QUERY_STRING"]

  query = URI.decode_www_form(query_string).to_h
  q     = query["q"]

  html = search(q)

  STDOUT.print "Status: 200 OK\n\n"
  STDOUT.print html

rescue => err
  STDOUT.print "Status: 500 Internal Server Error\n\n"
  STDERR.puts "\n" + err.full_message(highlight: true)
  exit(0)
end
