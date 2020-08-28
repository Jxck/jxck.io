#!/usr/bin/env ruby

require "erb"
require "uri"
require "pathname"
include ERB::Util

MAX_LENGTH = 30

def log(*a)
  STDERR.print(*a)
  #p(*a)
end


begin
  # log ENV.entries.join("\n")
  sec_trust_token = ENV["HTTP_SEC_TRUST_TOKEN"]
  log sec_trust_token

  headers = {
    "Content-Type"   => "text/html; charset=utf-8",
    "Content-Length" => "0",
  }.entries().map{|e| e.join(": ")}.join("\n")
  html = ""

  STDOUT.print "Status: 200 OK\n"
  STDOUT.print "#{headers}\n"
  STDOUT.print "\n"
  STDOUT.print html
rescue => err
  STDOUT.print "Status: 500 Internal Server Error\n\n"
  STDERR.puts "\n" + err.full_message(highlight: true)
  exit(0)
end
