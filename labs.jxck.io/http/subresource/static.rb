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
<script src=a.js></script>
<ul>
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
  <li>a
</ul>
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



while recv = socket.readline
  p recv

  break if recv == "\r\n"
end


js = <<EOS
console.log('hello')
EOS

message = <<EOS
HTTP/1.1 200 OK\r
Content-Length: #{js.size}\r
Content-Type: application/javascript\r
Connection: keep-alive\r
\r
EOS

p message

#####
sleep(3)
#####

p socket.write(message)
p socket.write(js)

p socket.close
p server.close
