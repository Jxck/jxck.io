#!/usr/bin/env ruby

require "uri"

def dump(hash)
  STDERR.puts("========")
  hash.to_h.each{|k,v|
    STDERR.puts("#{k}: #{v}")
  }
  STDERR.puts("========")
end

begin
  query = URI::decode_www_form(ENV.to_h['QUERY_STRING']).to_h
  conversion = query['conversion-data']
  location = "https://adtech.labs.jxck.io/.well-known/register-conversion?conversion-data=#{conversion}"
  STDOUT.print "Status: 302 Found\n"
  STDOUT.print "Location: #{location}\n"
  STDOUT.print "\n"
rescue => err
  STDOUT.print "Status: 500 Internal Server Error\n\n"
  STDERR.puts "\n" + err.full_message(highlight: true)
  exit(0)
end
