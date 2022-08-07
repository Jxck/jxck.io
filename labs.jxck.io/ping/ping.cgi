#!/usr/bin/env ruby

require "json"
require "time"

FILE="#{Dir.pwd}/ping.log"

def append(file, data)
  STDERR.puts "[reporting.cgi] append to file: #{data.size} byte"
  file = File.open(file, 'a')
  file.print(data+"\r\n")
  file.close()
  STDERR.puts "[reporting.cgi] append success"
end

begin
  header = ENV
    .entries
    .select{|k,v| k.start_with?("HTTP_") }
    .map{|k,v| [k.downcase.sub(/^http_/, ""), v]}
    .to_h

  ping_from = ENV["HTTP_PING_FROM"]
  ping_to   = ENV["HTTP_PING_TO"]
  body = STDIN.read

  if body.empty?
    STDERR.puts "[reporting.cgi] empty body\n"
    STDOUT.print "Status: 400 Bad Request\n\n"
    exit(0)
  else
    date = Time.now.iso8601
    append(FILE, "#{date}\t#{body}\t#{ping_from}\t#{ping_to}")
    STDOUT.print "Status: 201 Created\n\n"
  end
rescue => err
  STDERR.puts "[reporting.cgi]\n" + err.full_message(highlight: true)
  STDOUT.print "Status: 500 Internal Server Error\n\n"
end
