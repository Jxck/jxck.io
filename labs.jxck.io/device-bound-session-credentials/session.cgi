#!/usr/bin/env ruby

require 'base64'
require "json"

def dump(hash)
  STDERR.puts("")
  STDERR.puts("========")
  hash.to_h.each{|k,v|
    STDERR.puts("#{k}: #{v}")
  }
  STDERR.puts("========")
end

begin
  STDERR.puts "xxxxxxxxxxxxxxx"
  # header, payload, signature = ENV.to_h["HTTP_SEC_SESSION_RESPONSE"].split(".")
  # dump JSON.parse(Base64.urlsafe_decode64(header))
  # dump JSON.parse(Base64.urlsafe_decode64(payload))
  # STDERR.puts signature

  body = JSON.generate({
    "session_identifier": "session_id",
    "refresh_url": "/device-bound-session-credentials/refresh",
    "scope": {
      "origin": "labs.jxck.io",
      "include_site": true,
      "defer_requests": true,
      "scope_specification": [
        {
          "type": "include",
          "domain": "labs.jxck.io",
          "path": "/"
        }
      ]
    },
    "credentials": [{
      "type": "cookie",
      # This specifies the exact cookie that this config applies to. Attributes match the cookie attributes in RFC 6265bis and are parsed similarly to a normal Set-Cookie line, using the same default values. These SHOULD be equivalent to the Set-Cookie line accompanying this response.
      # Attributes Max-Age, Expires and HttpOnly are ignored
      "name": "__Host-session_id",
      "attributes": "Max-Age=10; Secure; HttpOnly; Path=/;"
    }]
  })

  STDERR.print body

  STDOUT.print "Status: 200 OK\n"
  STDOUT.print "Content-Length: #{body.size}\n"
  STDOUT.print "Content-Type: application/json\n"
  STDOUT.print "Set-Cookie: __Host-session_id=deadbeef; Max-Age=10; Secure; HttpOnly; Path=/;\n"
  STDOUT.print "\n"
  STDOUT.print body
rescue => err
  STDOUT.print "Status: 500 Internal Server Error\n\n"
  STDERR.puts "\n" + err.full_message(highlight: true)
  exit(0)
end