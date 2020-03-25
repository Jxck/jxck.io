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

def search(base, query)
  return [] unless query[:valid]
  keywords = query[:keywords]
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

def validate_query(query_string)
  query = URI.decode_www_form(query_string).to_h
  q     = query["q"]
  return {valid: false, message: "search keyword is required"} if q.nil? or q.empty?
  return {valid: false, message: "search keyword is too long"} if q.size > MAX_LENGTH
  keywords = q.split(" ").map{|q| Regexp.escape(q)}
  return {valid: true, q: q, keywords: keywords}
end

begin
  # log ENV.entries.join("\n")
  base    = Pathname.new(ENV["PWD"] ++ "/blog.jxck.io")
  query   = validate_query(ENV["QUERY_STRING"])
  results = search(base, query)
  html    = build(query, results)

  headers = {
    "Content-Type"                 => "text/html; charset=utf-8",
    "Strict-Transport-Security"    => "max-age=31536000",
    "Content-Security-Policy"      => "default-src 'self'",
    "Cross-Origin-Resource-Policy" => "same-origin",
    "Cross-Origin-Opener-Policy"   => "same-origin",
    "Cross-Origin-Embedder-Policy" => "require-corp",
    "Feature-Policy"               => "sync-xhr 'none'; sync-script 'none'",
    "Expect-CT"                    => "max-age=31536000, report-uri https://reporting.jxck.io;",
    "NEL"                          => "{\"report-to\":\"default\", \"max-age\":864000, \"include-subdomains\":false, \"success-fraction\":0, \"error-fraction\":1.0}",
    "X-Content-Type-Options"       => "nosniff",
    "X-XSS-Protection"             => "1; mode=block",
    "Accept-CH"                    => "DPR, Content-DPR, Width, Viewport-Width, Save-Data, Arch, Model, Platform, Header, Mobile",
    "Accept-CH-Lifetime"           => "86400",
  }.entries().map{|e| e.join(": ")}.join("\n")

  STDOUT.print "Status: 200 OK\n"
  STDOUT.print "#{headers}\n"
  STDOUT.print "\n"
  STDOUT.print html
rescue => err
  STDOUT.print "Status: 500 Internal Server Error\n\n"
  STDERR.puts "\n" + err.full_message(highlight: true)
  exit(0)
end
