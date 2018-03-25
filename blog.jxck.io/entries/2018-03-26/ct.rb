#!/usr/bin/env ruby
require "base64"
require "json"
require "net/http"
require "openssl"
require "pp"
require "uri"

def get_proof_by_hash(host, cert, tree_size, timestamp)
  der = cert.to_der

  blob = [
    0, # prefix (uint8)
    0, # v1 (uint8)
    0, # timestamped_entry (uint8)
    timestamp, # timestamp (uint32)
    0, # x509_entry (uint16)

    # length in 24bit
    (der.size >> 16) & 255,
    (der.size >>  8) & 255,
    (der.size >>  0) & 255,

    der, # der (binary)

    0, # extension (uint16)
  ].pack("C3Q>nC3a*n")

  sha256 = OpenSSL::Digest::SHA256.digest(blob)
  base64 = Base64.encode64(sha256).chomp
  param = URI.encode_www_form("hash" => base64, "tree_size" => tree_size)

  ## Debug
  # puts "timestamp = #{timestamp}"
  # puts "tree_size = #{tree_size}"
  # puts "sha256 = #{OpenSSL::Digest::SHA256.hexdigest(blob)}"
  # puts "base64 = #{base64}"

  uri = URI.parse("https://#{host}/ct/v1/get-proof-by-hash?#{param}")
  request = Net::HTTP::Get.new(uri)
  response = Net::HTTP.start(uri.hostname, uri.port, {use_ssl: true}) do |http|
    http.request(request)
  end

  puts "\e[0;31m$ curl '#{uri}' | jq .\e[0m"
  pp JSON.parse(response.body)
end

def get_sth(host)
  uri    = URI.parse("https://#{host}/ct/v1/get-sth")
  json   = Net::HTTP.get(uri)
  result = JSON.parse(json)

  puts "\e[0;31m$ curl '#{uri}' | jq .\e[0m"
  pp result
end

def add_chain(host, chain)
  uri = URI.parse("https://#{host}/ct/v1/add-chain")
  request = Net::HTTP::Post.new(uri)
  request.content_type = "application/json"

  str = chain.map{|cert|
    cert
      .to_pem
      .gsub("-----BEGIN CERTIFICATE-----\n", "")
      .gsub("-----END CERTIFICATE-----\n", "")
      .gsub("\n", "")
  }

  request.body = JSON.dump({
    "chain" => str
  })

  response = Net::HTTP.start(uri.hostname, uri.port, {use_ssl: true}) do |http|
    http.request(request)
  end

  puts <<-EOS
\e[0;31m$ curl -H 'Content-Type:application/json' \\
       -d '{ "chain": #{str} }' \\
       #{uri} | jq . \e[0m
EOS

  pp JSON.parse(response.body)
end

def main(host = "ct.googleapis.com/pilot", pemfile)
  puts "host = #{host}"
  puts "pemfile = #{pemfile}"
  chain = File.read(pemfile)
    .split("-----END CERTIFICATE-----\n")
    .map{|str| str + "-----END CERTIFICATE-----\n"}
    .map{|str| OpenSSL::X509::Certificate.new(str) }

  tree_size = get_sth(host)["tree_size"]
  puts ""
  timestamp = add_chain(host, chain)["timestamp"]
  puts ""
  get_proof_by_hash(host, chain[0], tree_size, timestamp)
end

main(*ARGV)
