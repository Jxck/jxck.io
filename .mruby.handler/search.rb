#!/usr/bin/env ruby


def main(keyword)
  result = Dir.glob("/home/jxck/server/jxck.io/blog.jxck.io/entries/**/*.html")
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
    "<li><a href=https://blog.jxck.io#{entry[:path]}#:~:text=#{keyword}>#{entry[:title]}</a></li>"
  }.join("\n      ")

  html = <<-EOS
  <html>
    <title>Search Result of #{keyword}</title>
    <h1>Search Result of #{keyword}</h1>
    <ul>
      #{li}
    </ul>
  </html>
  EOS

  puts html
end

if __FILE__ == $0
  main("cookie")
end
