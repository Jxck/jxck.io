#!/usr/bin/env ruby

require 'base64'
require "json"
require 'jwt'

def dump(hash)
  STDERR.puts("")
  STDERR.puts(">>>>>>>>")
  hash.to_h.each{|k,v|
    STDERR.puts("#{k}: #{v}")
  }
  STDERR.puts("<<<<<<<<")
end

def login()
  STDOUT.print <<~EOS
    Status: 302 Found
    Sec-Session-Registration: (ES256);challenge="challenge_value";path="session"
    Cache-Control: no-cache
    Location: /device-bound-session-credentials/index.html

  EOS
end

MAX_AGE = 3

def session()
  jwt = ENV.to_h["HTTP_SEC_SESSION_RESPONSE"]
  payload, header = JWT.decode(jwt, nil, false)
  dump(payload)
  dump(header)

  body = JSON.generate({
    "session_identifier": "1",
    "refresh_url": "https://labs.jxck.io/device-bound-session-credentials/refresh",
    "scope": {
      "origin": "https://labs.jxck.io",
      "include_site": true,
      "defer_requests": true,
      "scope_specification": []
    },
    "credentials": [
      {
        "type": "cookie",
        # TODO: __Host- prefix is not supported yet
        "name": "__Secure-session_id",
        "value": "deadbeef",
        # Attributes Max-Age, Expires and HttpOnly are ignored
        "attributes": "Path=/; Secure; HttpOnly; Max-Age=#{MAX_AGE}"
      }
    ]
  })

  dump JSON.parse(body)

  STDOUT.print <<~EOS
    Status: 200 OK
    Content-Type: application/json
    Cache-Control: no-cache
    Set-Cookie: __Secure-session_id=deadbeef; Path=/; Secure; HttpOnly; Max-Age=#{MAX_AGE};

  EOS
end

def refresh()
  sec_session_id = ENV.to_h["HTTP_SEC_SESSION_ID"]
  sec_session_response = ENV.to_h["HTTP_SEC_SESSION_RESPONSE"]

  if (sec_session_response.nil? || sec_session_response.empty?)
    STDOUT.print <<~EOS
      Status: 401 Unauthorized
      Sec-Session-Challenge: "challenge_value";id="1"
      Cache-Control: no-cache

    EOS
    return
  end

  payload, header = JWT.decode(sec_session_response, nil, false)
  dump(payload)
  dump(header)

  body = JSON.generate({
    "session_identifier": "1",
    "refresh_url": "https://labs.jxck.io/device-bound-session-credentials/refresh",
    "scope": {
      "origin": "https://labs.jxck.io",
      "include_site": true,
      "defer_requests": true,
      "scope_specification": []
    },
    "credentials": [{
      "type": "cookie",
      # TODO: __Host- prefix is not supported yet
      "name": "__Secure-session_id",
      "value": "deadbeef",
      # Attributes Max-Age, Expires and HttpOnly are ignored
      "attributes": "Path=/; Secure; HttpOnly; Max-Age=#{MAX_AGE}"
    }]
  })

  dump JSON.parse(body)

  STDOUT.print <<~EOS
    Status: 200 OK
    Content-Type: application/json
    Cache-Control: no-cache
    Set-Cookie: __Secure-session_id=deadbeef; Path=/; Secure; HttpOnly; Max-Age=#{MAX_AGE};

  EOS
end

begin
  # dump(ENV)
  URI = ENV.to_h["REQUEST_URI"]
  STDERR.puts "URI: #{URI}"

  case URI
  when "/device-bound-session-credentials/login"
    STDERR.puts ">>>> login()"
    login()
  when "/device-bound-session-credentials/session"
    STDERR.puts ">>>> session()"
    session()
  when "/device-bound-session-credentials/refresh"
    STDERR.puts ">>>> refresh()"
    refresh()
  else
    STDOUT.print "Status: 404 Not Found\n\n"
    exit(0)
  end
rescue => err
  STDOUT.print "Status: 500 Internal Server Error\n\n"
  STDERR.puts "\n" + err.full_message(highlight: true)
  exit(0)
end