#!/usr/bin/env ruby

require "socket"

server = TCPServer.open(3000)

socket = server.accept


while recv = socket.readline
  p recv

  break if recv == "\r\n"
end


html = <<EOS
<!doctype html>
<meta charset=utf-8>
<link rel="shortcut icon" href="https://jxck.io/favicon.ico">
<title>example html</title>
<h1>hello</h1>
EOS

p html


require 'zlib'
deflated = Zlib::deflate(html, Zlib::BEST_COMPRESSION)
html = deflated


message = <<EOS
HTTP/1.1 200 OK\r
Content-Length: #{html.size}\r
Content-Type: text/html\r
Content-Encoding: deflate\r
Content-Language: en\r
\r
EOS

p message

p socket.write(message)
p socket.write(html)
p socket.close
p server.close
