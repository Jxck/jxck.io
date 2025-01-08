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
  dump(ENV)
  header, payload, signature = ENV.to_h["HTTP_SEC_SESSION_RESPONSE"].split(".")
  dump JSON.parse(Base64.urlsafe_decode64(header))
  dump JSON.parse(Base64.urlsafe_decode64(payload))
  STDERR.puts signature

  body = JSON.generate({
    "session_identifier": "session_id",
    "refresh_url": "/device-bound-session-credentials/refresh",
    "scope": {
      "origin": "labs.jxck.io",
      "include_site": true,
      "defer_requests": true
    },
    "credentials": [{
      "type": "cookie",
      # This specifies the exact cookie that this config applies to. Attributes match the cookie attributes in RFC 6265bis and are parsed similarly to a normal Set-Cookie line, using the same default values. These SHOULD be equivalent to the Set-Cookie line accompanying this response.
      # Attributes Max-Age, Expires and HttpOnly are ignored
      "name": "auth_cookie",
      "attributes": "Domain=example.com; Path=/; Secure; SameSite=None"
    }]
  })

  STDERR.print body

  STDOUT.print "Status: 200 OK\n"
  STDOUT.print "Content-Length: #{body.size}\n"
  STDOUT.print "Content-Type: application/json\n"
  STDOUT.print "Cache-Control: no-cache\n"
  STDOUT.print "Set-Cookie: auth_cookie=abcdef0123; Domain=example.com; Max-Age=10; Secure; HttpOnly;\n"
  STDOUT.print "\n"
  STDOUT.print body
rescue => err
  STDOUT.print "Status: 500 Internal Server Error\n\n"
  STDERR.puts "\n" + err.full_message(highlight: true)
  exit(0)
end