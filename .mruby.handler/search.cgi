#!/usr/bin/env ruby

require "erb"
require "uri"
require "pathname"
include ERB::Util

def log(*a)
  STDERR.print(*a)
  #p(*a)
end

def search(base, keyword)
  Pathname.glob("#{base}/entries/**/*.md").reduce([]){|acc, path|
    body = File.read(path)
    hits = body.scan(/^.*#{keyword}.*$/i)
    next acc if hits.empty?
    title = body.lines.first.match(/^# \[.*\] (.*)/)[1]
    url   = path.relative_path_from(base).sub_ext(".html")
    date  = path.dirname.basename()

    details = hits.map{|hit|
      hit = hit.strip.gsub(/^- /, '').gsub(/^\#{,4} /, '')
      m   = hit.match(/(?<prefix>.*)(?<keyword>#{keyword})(?<suffix>.*)/i)
      keyword  = m[:keyword]
      prefix   = m[:prefix]
      suffix   = m[:suffix]
      {keyword: keyword, prefix: prefix, suffix: suffix, fragment: fragment(prefix, keyword, suffix)}
    }
    acc.append({url: url, title: title, date: date, keyword: keyword, details: details})
  }
end

def fragment(prefix, keyword, suffix)
  word   = url_encode(keyword)
  prefix = url_encode(prefix.strip.split(" ").last  || "")
  suffix = url_encode(suffix.strip.split(" ").first || "")

  prefix = "#{prefix}-," unless prefix.empty?
  suffix = ",-#{suffix}" unless suffix.empty?

  "#{prefix}#{word}#{suffix}"
end

def build(keyword, results)
  template =File.read("./search.html.erb")
  ERB.new(template, nil, '-').result(binding)
end

begin
  # ROOT for exec from shell when test
  base         = Pathname.new((ENV["ROOT"] || ENV["PWD"]) ++ "/blog.jxck.io")
  path_info    = ENV["PATH_INFO"] || ""
  query_string = ENV["QUERY_STRING"]

  query = URI.decode_www_form(query_string).to_h
  q     = Regexp.escape(query["q"] || "")

  if q.nil? or q.empty?
    STDOUT.print "Status: 400 Bad Request\n\n"
    exit(0)
  end

  result = search(base, q)
  html   = build(q, result)

  STDOUT.print "Status: 200 OK\n\n"
  STDOUT.print html
rescue => err
  STDOUT.print "Status: 500 Internal Server Error\n\n"
  STDERR.puts "\n" + err.full_message(highlight: true)
  exit(0)
end
