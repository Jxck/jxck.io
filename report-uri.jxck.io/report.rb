#!/usr/bin/env ruby

require "webrick"
require "json"

FILE_CSP  = "#{ENV['SERVER']}/logs/report-csp.log"
FILE_PING = "#{ENV['SERVER']}/logs/ping.log"
PORT      = ENV['PORT']

config = {
  :Port => PORT
}

def append(file, data)
  file = File.open(file, 'a')
  file.puts(data)
  file.close()
end

server = WEBrick::HTTPServer.new(config)

reporting = Proc.new do |req, res|
  begin
    header = req.header.map{|k,v| [k, v.join(",")]}.to_h
    body = JSON.parse(req.body)
    body["header"] = header
    body["date"] = Time.now
    report = JSON.generate(body) + "\n"
    append(FILE_CSP, report)
    res.status = 201
  rescue => e
    STDERR.puts e
    res.status = 500
  end
end

# mount to /
server.mount_proc('/', reporting)

Signal.trap("INT") { server.shutdown }
server.start
