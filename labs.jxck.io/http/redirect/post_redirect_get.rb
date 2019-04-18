#!/usr/bin/env ruby

require "socket"


def new(socket)
    html = <<eos
<!doctype html>
<meta charset=utf-8>
<link rel="shortcut icon" href="https://jxck.io/favicon.ico">
<title>example html</title>
<h1>form</h1>
<form method=post action=/comments>
  <input type=text name=message value=hello>
  <button type=submit>ok</button>
</form>
eos

    message = <<eos
http/1.1 200 ok\r
content-length: #{html.size}\r
content-type: text/html\r
\r
eos

    p message
    p html
    p socket.write(message)
    p socket.write(html)
end

def create(socket)
  message = <<EOS
HTTP/1.1 303 See Other\r
Location: /comments\r
\r
EOS

  p message
  p socket.write(message)
end

def index(socket)
    html = <<eos
<!doctype html>
<meta charset=utf-8>
<link rel="shortcut icon" href="https://jxck.io/favicon.ico">
<title>example html</title>
<h1>comments</h1>
<ul>
  <li>hello
  <li>hello
  <li>hello
  <li>hello
<ul>
eos

    message = <<eos
http/1.1 200 ok\r
content-length: #{html.size}\r
content-type: text/html\r
\r
eos

    p message
    p html
    p socket.write(message)
    p socket.write(html)

end


server = TCPServer.open(3000)

loop {
  p socket = server.accept

  p first_line = socket.readline
  while recv = socket.readline
    p recv
    break if recv == "\r\n"
  end

  case first_line

  when "GET /comments/new HTTP/1.1\r\n"
    new(socket)
  when "POST /comments HTTP/1.1\r\n"
    create(socket)
  when "GET /comments HTTP/1.1\r\n"
    index(socket)
  end

  socket.close
}

p server.close
