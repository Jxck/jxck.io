#!/usr/bin/env ruby

require "socket"

# https://html.spec.whatwg.org/multipage/scripting.html#attr-script-async

def html(socket)
  html = <<EOS
<!doctype html>
<meta charset=utf-8>
<link rel="shortcut icon" href="https://jxck.io/favicon.ico">
<title>example html</title>
<h1>hello</h1>
<script async src=a.js></script>
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

  message = <<EOS
HTTP/1.1 200 OK\r
Content-Length: #{html.size}\r
Content-Type: text/html\r
Content-Language: en\r
Connection: keep-alive\r
\r
EOS

  p socket.write(message)


  html.split("").each{|chunk|
    sleep(0.01)
    p socket.write(chunk)
  }

end


def js(socket)
  js = <<EOS
  console.log('js')
  window.onload = (e) => {
    console.log(e)
  }
EOS

  message = <<EOS
HTTP/1.1 200 OK\r
Content-Length: #{js.size}\r
Content-Type: application/javascript\r
Connection: keep-alive\r
\r
EOS

  p socket.write(message)
  p socket.write(js)

end











server = TCPServer.open(3000)

while true
  Thread.start(server.accept) do |socket|
    pp socket

    p first_line = socket.readline
    while recv = socket.readline
      p recv
      break if recv == "\r\n"
    end

    case first_line
    when "GET / HTTP/1.1\r\n"
      html(socket)
    when "GET /a.js HTTP/1.1\r\n"
      js(socket)
    end

    socket.close
  end
end

p server.close
