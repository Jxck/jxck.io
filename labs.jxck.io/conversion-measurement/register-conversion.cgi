#!/usr/bin/env ruby

require "json"
require "time"
require "uri"

FILE="#{Dir.pwd}/conversion.log"

def append(file, data)
  file = File.open(file, 'a')
  file.print(data+"\r\n")
  file.close()
end

def dump(hash)
  STDERR.puts("========")
  hash.to_h.each{|k,v|
    STDERR.puts("#{k}: #{v}")
  }
  STDERR.puts("========")
end

begin
  header = ENV
    .entries
    .select{|k,v| k.start_with?("HTTP_") || k == "QUERY_STRING" }
    .map{|k,v| [k.downcase.sub(/^http_/, ""), v]}
    .to_h

  query = URI::decode_www_form(header['query_string']).to_h

  body = STDIN.read

  date = Time.now.iso8601

  json = {date: date, conversion: query, header: header, body: body}

  append(FILE, JSON.generate(json))

  STDOUT.print "Status: 201 Created\n\n"
rescue => err
  STDOUT.print "Status: 500 Internal Server Error\n\n"
  STDERR.puts "\n" + err.full_message(highlight: true)
  exit(0)
end
