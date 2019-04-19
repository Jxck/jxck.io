#!/usr/bin/env ruby

require "socket"

server = TCPServer.open(3000)


loop {
  p socket = server.accept

  p first_line = socket.readline
  while recv = socket.readline
    p recv
    break if recv == "\r\n"
  end

  case first_line

  when "GET / HTTP/1.1\r\n"
    message = <<EOS
HTTP/1.1 308 Permanent Redirect\r
Location: /redirect\r
\r
EOS

    p message
    p socket.write(message)

  when "GET /redirect HTTP/1.1\r\n"

    html = <<EOS
<!doctype html>
<meta charset=utf-8>
<link rel="shortcut icon" href="https://jxck.io/favicon.ico">
<title>example html</title>
<h1>hello</h1>
EOS


    message = <<EOS
HTTP/1.1 200 OK\r
Content-Length: #{html.size}\r
Content-Type: text/html\r
Content-Language: en\r
\r
EOS

    p message
    p html
    p socket.write(message)
    p socket.write(html)

  end

  socket.close
}

p server.close
