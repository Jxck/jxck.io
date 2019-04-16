#!/usr/bin/env ruby

require "webrick"
require "webrick/https"
require "json"

port  = ARGV.shift
https = ARGV.shift == "-secure"
key   = ARGV.shift
cert  = ARGV.shift
p "#{port}, #{https}, #{key}, #{cert}"

# http://svn.ruby-lang.org/cgi-bin/viewvc.cgi/trunk/lib/webrick/httputils.rb?view=markup
mime = WEBrick::HTTPUtils::DefaultMimeTypes.merge({
  "js"       => "text/javascript",
  "mjs"      => "text/javascript",
  "json"     => "text/json",
  "txt"      => "text/plain",
  "webp"     => "image/webp",
})

config = {
  :Port          => port,
  :DocumentRoot  => ".",
  :MimeTypes     => mime,
  :RequestCallback => lambda {|req, res|
    puts req.header.map{|k, v|
      "#{k}: #{v.join(" ")}"
    }.join("\n")
    res.header.merge!({
      "X-Protocol" => https ? "https" : "http",
    })
  }
}

if https
  config.merge!({
    :SSLEnable      => true,
    :SSLPrivateKey  => OpenSSL::PKey::RSA.new(File.open(key).read),
    :SSLCertificate => OpenSSL::X509::Certificate.new(File.open(cert).read),
  })
end

server = WEBrick::HTTPServer.new(config)


## mount
server.mount("/favicon.ico", WEBrick::HTTPServlet::FileHandler, "#{__dir__}/favicon.ico")

## mount_proc
server.mount_proc('/foo', Proc.new {|req, res|
  pp req.request_method
  res.header.merge!({
    "X-Foo" => "Foo"
  })

  res.body =<<-EOS
<!DOCTYPE html>
<meta charset=utf-8>
<title>test</title>
<h1>test</h1>
  EOS
  res
})


Signal.trap("INT") { server.shutdown }
server.start
