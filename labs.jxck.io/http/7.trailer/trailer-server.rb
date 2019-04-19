#!/usr/bin/env ruby

require "socket"

server = TCPServer.open(3000)

socket = server.accept

message = <<EOS
HTTP/1.1 200 OK\r
Content-Type: text/plain
Transfer-Encoding: chunked\r
\r
EOS


while recv = socket.readline
  p recv

  break if recv == "\r\n"
end

trailer = "ETag: xyz==\r\n"

p socket.write(message)
sleep 1
p socket.write("1\r\n0\r\n")
sleep 1
p socket.write("1\r\n1\r\n")
sleep 1
p socket.write("1\r\n2\r\n")
sleep 1
p socket.write("1\r\n3\r\n")
sleep 1
p socket.write("1\r\n4\r\n")
sleep 1


p socket.write("0\r\n")

if trailer
  p socket.write(trailer)
end

p socket.write("\r\n")


socket.close
server.close


# curl http://localhost:3000
