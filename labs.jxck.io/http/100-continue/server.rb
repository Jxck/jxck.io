#!/usr/bin/env ruby

require "socket"

server = TCPServer.open(3000)

socket = server.accept

message = <<EOS
HTTP/1.1 100 Continue\r
\r
EOS


while recv = socket.readline
  p recv
  break if recv == "\r\n"
end

p message
p socket.write(message)


while recv = socket.readline
  p recv
  break if recv == "\r\n"
end


p socket.close
server.close


# $ curl -H "Content-Type: text/plain" --data-binary @large.txt http://localhost:3000/
