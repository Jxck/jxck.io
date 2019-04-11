#!/usr/bin/env ruby

require "socket"

server = TCPServer.open(3000)

p socket = server.accept


while recv = socket.readline
  p recv

  break if recv == "\r\n"
end

html = <<EOS
<!doctype html>
<meta charset=utf-8>
<link rel="shortcut icon" href="https://jxck.io/favicon.ico">
<title>example html</title>
<script src=a.js></script>
<h1>hello</h1>
EOS

p html

message = <<EOS
HTTP/1.1 200 OK\r
Content-Length: #{html.size}\r
Content-Type: text/html\r
Content-Language: en\r
Connection: keep-alive\r
\r
EOS

p message

p socket.write(message)
p socket.write(html)

#p socket.close
#p socket = server.accept

while recv = socket.readline
  p recv

  break if recv == "\r\n"
end

js = <<EOS
console.log('hello')
EOS

p js

message = <<EOS
HTTP/1.1 200 OK\r
Content-Length: #{js.size}\r
Content-Type: application/javascript\r
\r
EOS

p message

p socket.write(message)
p socket.write(js)

p socket.close
p server.close
