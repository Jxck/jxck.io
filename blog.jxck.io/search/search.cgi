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

def search(pwd, host, query)
  return [] unless query[:valid]
  base     = Pathname.new("#{pwd}/#{host}")
  keywords = query[:keywords].map{|keyword| /(?<prefix>.*)(?<keyword>#{keyword})(?<suffix>.*)/i }
  reg      = Regexp.union(keywords)

  search_path = case host
                when "blog.jxck.io"
                  "#{base}/entries/**/*.md"
                when "mozaic.fm"
                  "#{base}/episodes/**/*.md"
                end

  Pathname.glob(search_path).sort.reverse.reduce([]){|acc, path|
    body    = File.read(path)

    # そもそも全キーワードが存在するか確認
    exists = keywords.reduce(true){|flag, k|
      break false if (body.scan(k).empty?)
      flag
    }
    next acc unless exists

    # 全キーワードが存在したら union した regexp でスキャンし直す
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
    title = body.match(/^# (\[.*\] )*(?<title>.*)/).named_captures["title"]
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

def build(pwd, host, query, results)
  template_path = case host
                when "blog.jxck.io"
                  "#{pwd}/.src/template/blog.search.html.erb"
                when "mozaic.fm"
                  "#{pwd}/.src/template/podcast.search.html.erb"
                end
  template      = File.read(template_path)
  ERB.new(template, trim_mode: '-').result(binding)
end

def validate_query(query_string)
  query = URI.decode_www_form(query_string).to_h
  q     = query["q"]
  return {valid: false, message: ""} if q.nil? or q.empty?
  return {valid: false, message: "search keyword is too long"} if q.size > MAX_LENGTH
  keywords = q.split(" ").map{|q| Regexp.escape(q)}
  return {valid: true, q: q, keywords: keywords}
end

begin
  #log ENV.entries.join("\n")
  host    = ENV["HTTP_HOST"]
  unless ["blog.jxck.io", "mozaic.fm"].include?(host)
    STDOUT.print "Status: 500 Internal Server Error\n\n"
    exit(0)
  end
  pwd   = ENV["PWD"]
  query = validate_query(ENV["QUERY_STRING"])

  log query

  if query[:valid]
    require "digest"
    sha256 = Digest::SHA256.new
    sha256.update(query[:q])
    sha256.update(`git rev-parse HEAD`)
    etag = sha256.hexdigest[0..10]
    log etag
  end

  results = search(pwd, host, query)
  html    = build(pwd, host, query, results)

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
