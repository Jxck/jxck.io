#!/usr/bin/ruby

require "time"
require "erb"

# html special chars
def hsc(str)
  str.gsub(/&/, "&amp;")
     .gsub(/</, "&lt;")
     .gsub(/>/, "&gt;")
     .gsub(/"/, "&quot;")
     .gsub(/'/, "&#039;")
end

class Article
  attr_reader :path

  def initialize(path)
    @path = path
    @text = File.read(path)
  end

  def title
    hsc @text.match(/^# \[.*\] (.*)/)[1]
  end

  def url
    path.sub('./', 'https://').sub('.md', '.html')
  end

  def summary
    hsc @text.match(/## Theme(.*?)##/im)[1].strip.split("\n")[0]
  end

  def to_s
    @path
  end
end

class Entry < Article
  def href
    url
  end

  def summary
    # TODO
    hsc @text.match(/## intro(.*?)##/im)[1].strip
  end

  def updated
    date = @path.split("/")[3]
    updated  = "#{date}T00:00:00Z"
  end

  def id
    date = @path.split("/")[3]
    "tag:blog.jxck.io,2016:entry://#{date}"
  end

  def json
    {
      title:   title,
      href:    href,
      id:      id,
      updated: updated,
      summary: summary
    }
  end

  def <=>(target)
    return path <=> target.path
  end
end

class Episode < Article
  attr_accessor :order

  def num
    @path.split('/')[3].to_i
  end

  def subtitle
    summary
  end

  def sideshow?
    !! (@path =~ /.*sideshow.md/)
  end

  def pubDate
    datetime = @text.match(/datetime=(.*?)>/)[1]
    Time.parse(datetime).rfc822
  end

  def description
    hsc @text.sub(/#(.*?)## Theme/m, "# #{title}").gsub(/\[(.*?)\]\(.*?\)/, '\1')
  end

  def file
    "files.mozaic.fm/mozaic-ep#{num}#{'.sideshow' if sideshow?}.mp3"
  end

  def size
    File.open("../#{file}").size
  end

  def duration
    sec = 0
    if RUBY_PLATFORM.match(/darwin/)
      sec = `afinfo ../#{file}  | grep duration | cut -d' ' -f 3`.to_i
    else
      sec = `mp3info -p "%S\n" ../#{file}`.to_i
    end
    Time.at(sec).utc.strftime("%X")
  end

  def to_s
    "#{summary}"
  end

  def <=>(target)
    if num == target.num
      return sideshow? ? 1: -1
    end
    return num <=> target.num
  end
end

def atom(dir)
  entries = Dir.glob(dir)
    .select { |path| path.match(/.*.md\z/) }
    .map { |path| Entry.new(path) }
    .sort
    .reverse

  ERB.new(File.read(".template/atom.xml")).result(binding)
end

def json(dir)
  require "json"
  entries = Dir.glob(dir)
    .select { |path| path.match(/.*.md\z/) }
    .map { |path| Entry.new(path) }
    .sort
    .reverse
    .map {|e| e.json}

  JSON.pretty_generate(
    title:     "blog.jxck.io",
    alternate: "https://blog.jxck.io",
    author:    { name: "Jxck" },
    id:        "tag:blog.jxck.io,2016:feed",
    update:    "2016-01-28T18:30:02Z",
    entry:     entries
  )
end

def rss2(dir)
  items = Dir.glob(dir)
    .select {|path| path.match(/.*.md\z/) }
    .map {|path| Episode.new(path) }
    .sort
    .reverse
    .map.with_index {|ep, i|
      ep.order = i
      ep
    }

  ERB.new(File.read(".template/rss2.xml")).result(binding)
end

if __FILE__ == $0
  target = ARGV[0]

  if target == "blog"
    File.write("./blog.jxck.io/feeds/atom.xml", atom("./blog.jxck.io/entries/**/*"))
    File.write("./blog.jxck.io/feeds/atom.json", json("./blog.jxck.io/entries/**/*"))
  elsif target == "podcast"
    File.write("./podcast.jxck.io/feeds/feed.xml", rss2("./podcast.jxck.io/**/*"))
  else
    puts '"blog" or "podcast"'
    exit -1
  end
end
