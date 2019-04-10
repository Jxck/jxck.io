#!/usr/bin/env ruby

require "socket"

server = TCPServer.open(3000)

socket = server.accept

message = <<EOS
HTTP/1.1 200 OK\r
Content-Length: 10\r
Content-Type: text/plain\r
\r
1234567890
EOS


while recv = socket.readline
  p recv

  break if recv == "\r\n"
end

p message

p socket.write(message)
p socket.close
server.close
