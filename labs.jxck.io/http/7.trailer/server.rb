#!/usr/bin/env ruby

require "socket"

server = TCPServer.open(3000)

socket = server.accept

message = <<EOS
HTTP/1.1 200 OK\r
Content-Length: 10\r
Content-Type: text/plain\r
\r
EOS


while recv = socket.readline
  p recv

  break if recv == "\r\n"
end

p socket.write(message)
sleep 1
p socket.write("0")
sleep 1
p socket.write("1")
sleep 1
p socket.write("2")
sleep 1
p socket.write("3")
sleep 1
p socket.write("4")
sleep 1
p socket.write("5")
sleep 1
p socket.write("6")
sleep 1
p socket.write("7")
sleep 1
p socket.write("8")
sleep 1
p socket.write("9")
sleep 1
p socket.close
server.close


# curl http://localhost:3000
