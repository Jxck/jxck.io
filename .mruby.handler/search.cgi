#!/usr/bin/env ruby

require "uri"

def log(a)
  STDERR.puts(a)
end

begin
  path_info    = ENV["PATH_INFO"]
  query_string = ENV["QUERY_STRING"]

  #query = URI.decode_www_form().to_h
  log path_info
  log "==="
  log query_string

  #q = query["q"]
  STDOUT.print "Status: 200 OK\n\n"
rescue => err
  STDOUT.print "Status: 500 Internal Server Error\n\n"
  STDERR.puts "\n" + err.full_message(highlight: true)
  exit(0)
end





#def main(keyword)
#  result = Dir.glob("/home/jxck/server/jxck.io/blog.jxck.io/entries/**/*.html")
#              .reject{|path|
#                path.end_with?("amp.html")
#              }.map{|path|
#                body = File.read(path)
#                {path: path, body: body}
#              }.select{|entry|
#                entry[:body].match?(keyword)
#              }.map{|entry|
#                title = entry[:body].match(/<title>(.*) \| blog.jxck.io<\/title>/)[1]
#                path  = entry[:path].match(/(\/entries.*)/)[1]
#                {title: title, path: path}
#              }
#
#  li = result.map{|entry|
#    "<li><a href=https://blog.jxck.io#{entry[:path]}#:~:text=#{keyword}>#{entry[:title]}</a></li>"
#  }.join("\n      ")
#
#  html = <<-EOS
#  <html>
#    <title>Search Result of #{keyword}</title>
#    <h1>Search Result of #{keyword}</h1>
#    <ul>
#      #{li}
#    </ul>
#  </html>
#  EOS
#
#  puts html
#end
