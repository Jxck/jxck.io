#!/usr/bin/env ruby
require "digest"
require "base64"

file = ARGV[0]
data = File.binread(file)
puts "#{data.size} bytes"
sha256 = Digest::SHA256.digest(data)
base64 = Base64.strict_encode64(sha256)
puts ":#{base64}:"
