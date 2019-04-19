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
<form method=post action=/>
  <input type=text name=key value="x www form urlencoded">
  <button type=submit>ok</button>
</form>
<form method=post action=/ enctype=text/plain>
  <input type=text name=key value="text plain">
  <button type=submit>ok</button>
</form>
<form method=post action=/ enctype=multipart/form-data>
  <input type=text name=key value=xxx>
  <input type=text name=value value=yyy>
  <button type=submit>ok</button>
</form>
<form method=post action=/ enctype=multipart/form-data>
  <input type=file name=samplefile>
  <button type=submit>ok</button>
</form>
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




len = 0
while recv = socket.readline
  p recv
  if recv =~ /Content-Length: (\d*)/
    len = $1.to_i
  end

  break if recv == "\r\n"
end
p len

p body = socket.read(len)


message = <<EOS
HTTP/1.1 200 OK\r
Content-Length: #{body.size}\r
Content-Type: text/html\r
Content-Language: en\r
Connection: keep-alive\r
\r
EOS

p message

p socket.write(message)
p socket.write(body)
