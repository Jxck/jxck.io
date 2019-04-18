#!/usr/bin/env ruby

require "socket"

socket = TCPSocket.open("example.com", 80)

message = <<EOS
HEAD / HTTP/1.1\r
Host: example.com\r
\r
EOS

puts message

p socket.write(message)

while recv = socket.readline
  puts recv

  break if recv == "\r\n"
end


total  = 1270
range  = 0
offset = 300


while range < total do
  p range, offset

  message = <<EOS
GET / HTTP/1.1\r
Host: example.com\r
Range: bytes=#{range}-#{range+offset-1}
\r
EOS

  puts message
  socket.write(message)
  while recv = socket.readline
    puts recv
    break if recv == "\r\n"
  end

  p socket.read(offset)

  range = range + offset


  if (range + offset > total)
    # offset が長すぎる
    offset = total - range
  end
end

p socket.close
