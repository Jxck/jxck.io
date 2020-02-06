#!/usr/bin/env ruby

require "json"
require "time"

FILE="#{Dir.pwd}/beacon.log"

def append(file, data)
  file = File.open(file, 'a')
  file.print(data+"\r\n")
  file.close()
end

begin
  header = ENV
    .entries
    .select{|k,v| k.start_with?("HTTP_") }
    .map{|k,v| [k.downcase.sub(/^http_/, ""), v]}
    .to_h

  body = STDIN.read

  if body.empty?
    STDOUT.print "Status: 400 Bad Request\n\n"
    exit(0)
  end

  date = Time.now.iso8601

  json = {body: JSON.parse(body), header: header, date: date}

  append(FILE, JSON.fast_generate(json))

  STDOUT.print "Status: 201 Created\n\n"
rescue => err
  STDOUT.print "Status: 500 Internal Server Error\n\n"
  STDERR.puts "\n" + err.full_message(highlight: true)
  exit(0)
end
