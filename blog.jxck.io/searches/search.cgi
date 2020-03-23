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

def search(base, keywords)
  reg = Regexp.union(keywords.map{|keyword| /(?<prefix>.*)(?<keyword>#{keyword})(?<suffix>.*)/i })
  Pathname.glob("#{base}/entries/**/*.md").reduce([]){|acc, path|
    body    = File.read(path)
    details = body.scan(reg).map {|hits|
      hits.each_slice(3).reduce([]) {|acc, hit|
        next acc if hit == [nil, nil, nil]
        prefix   = hit[0]
        keyword  = hit[1]
        suffix   = hit[2]
        acc.append({keyword: keyword, prefix: prefix, suffix: suffix, fragment: fragment(prefix, keyword, suffix)})
      }
    }.flatten
    next acc if details.empty?
    title = body.lines.first.match(/^# \[.*\] (.*)/)[1]
    url   = path.relative_path_from(base).sub_ext(".html")
    date  = path.dirname.basename().to_s
    acc.append({url: url, title: title, date: date, keyword: keywords.join(" "), details: details})
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

def build(query, results)
  template = File.read("#{ENV["PWD"]}/.script/template/blog.search.html.erb")
  ERB.new(template, nil, '-').result(binding)
end

def sanitize_query(query_string)
  query = URI.decode_www_form(query_string).to_h
  q     = query["q"]
  return {valid: false, message: "search keyword is required"} if q.nil? or q.empty?
  return {valid: false, message: "search keyword is required"} if q.size > MAX_LENGTH
  keywords = q.split(" ").map{|q| Regexp.escape(q) }
  return {valid: true, keywords: keywords, q: q}
end

begin
  # log ENV.entries.join("\n")
  base    = Pathname.new(ENV["PWD"] ++ "/blog.jxck.io")
  query   = sanitize_query(ENV["QUERY_STRING"])
  results = search(base, query[:keywords])
  html    = build(query, results)
  STDOUT.print "Status: 200 OK\n\n"
  STDOUT.print html
rescue => err
  STDOUT.print "Status: 500 Internal Server Error\n\n"
  STDERR.puts "\n" + err.full_message(highlight: true)
  exit(0)
end
