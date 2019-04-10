#!/usr/bin/env ruby

require "socket"

message = <<EOS
GET / HTTP/1.1\r
Host: localhost:3000\r
\r
EOS

socket = TCPSocket.open("127.0.0.1", 3000)
socket.write(message)

while recv = socket.readline
  p recv
end


socket.close
