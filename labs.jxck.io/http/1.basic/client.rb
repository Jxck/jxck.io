#!/usr/bin/env ruby

require "socket"

socket = TCPSocket.open("127.0.0.1", 3000)

message = <<EOS
GET / HTTP/1.1\r
Host: localhost:3000\r
\r
EOS

p message

p socket.write(message)

while recv = socket.readline
  p recv

  break if recv == "\r\n"
end

p socket.close
