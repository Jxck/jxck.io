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


def issue()
  sec_trust_token = ENV["HTTP_SEC_TRUST_TOKEN"]

  token = `./issue #{sec_trust_token}`

  headers = {
    "Content-Type"   => "text/html; charset=utf-8",
    "Content-Length" => "0",
    "Sec-Trust-Token" => token,
  }.entries().map{|e| e.join(": ")}.join("\n")
  html = ""

  STDOUT.print "Status: 200 OK\n"
  STDOUT.print "#{headers}\n"
  STDOUT.print "\n"
  STDOUT.print html
end

def redemption()
  sec_trust_token = ENV["HTTP_SEC_TRUST_TOKEN"]

  token = `./redemption #{sec_trust_token}`

  headers = {
    "Content-Type"   => "text/html; charset=utf-8",
    "Content-Length" => "0",
    "Sec-Trust-Token" => token,
  }.entries().map{|e| e.join(": ")}.join("\n")
  html = ""

  STDOUT.print "Status: 200 OK\n"
  STDOUT.print "#{headers}\n"
  STDOUT.print "\n"
  STDOUT.print html
end

def send_srr()
  sec_signed_redemption_record = ENV["HTTP_SEC_SIGNED_REDEMPTION_RECORD"]

  log sec_signed_redemption_record

  html = sec_signed_redemption_record
  headers = {
    "Content-Type"   => "text/html; charset=utf-8",
    "Content-Length" => html.size
  }.entries().map{|e| e.join(": ")}.join("\n")

  STDOUT.print "Status: 200 OK\n"
  STDOUT.print "#{headers}\n"
  STDOUT.print "\n"
  STDOUT.print html
end



begin
  # log ENV.entries.join("\n")

  uri = ENV["REQUEST_URI"]

  case uri
  when "/.well-known/trust-token/request"
    issue()
  when "/.well-known/trust-token/redemption"
    redemption()
  when "/.well-known/trust-token/send-srr"
    send_srr()
  else
    STDOUT.print "Status: 404 OK\n"
    STDOUT.print "\n"
  end
rescue => err
  STDOUT.print "Status: 500 Internal Server Error\n\n"
  STDERR.puts "\n" + err.full_message(highlight: true)
  exit(0)
end
