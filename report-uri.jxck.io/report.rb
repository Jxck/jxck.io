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
  file = File.open(file,'a')
  file.puts(data)
  file.close()
end

server = WEBrick::HTTPServer.new(config)

report = Proc.new do |req, res|
  begin
    if req.header["content-type"].first == "application/csp-report"
      report = JSON.generate(JSON.parse(req.body)) + "\n"
      append(FILE_CSP, report)
      res.status = 201
    elsif req.header["content-type"].first == "text/ping" and req.body == "PING"
      ping_from = req.header["ping-from"].first
      ping_to   = req.header["ping-to"].first
      report    = "#{ping_from}\t#{ping_to}"
      append(FILE_PING, report)
      res.status = 201
    else
      res.status = 400
    end
  rescue
    res.status = 400
  end
end

# mount to /
server.mount_proc('/', report)

Signal.trap("INT") { server.shutdown }
server.start
