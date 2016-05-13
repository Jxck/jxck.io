#!/usr/bin/ruby

require "erb"
require "json"
require "time"

##################
# - podcast feed (rss2.xml)
#  - description: Thema 全体 (link の url は消す), podcast app に表示する用
#  - subtitle:    itunes:subtitle で Thema の一行分
#
# - blog feed (atom.xml)
#  - summary:     Intro の全体
#
# - blog/podcast の HTML meta (meta.html)
#  - description: Intro/Thema を 140 文字に切ったもの
##################

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

  def tags
    @text.split("\n")[0].scan(/\[(.+?)\]/).flatten
  end

  def host
    path.split('/')[1]
  end

  def title
    hsc @text.match(/^# \[.*\] (.*)/)[1]
  end

  def url
    path.sub('./', 'https://').sub('.md', '.html')
  end

  def to_s
    path
  end
end

class Entry < Article
  def href
    url
  end

  def summary
    hsc @text.match(/## Intro(.*?)##/im)[1].strip
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
    hsc @text.match(/## Theme(.*?)##/im)[1].strip.split("\n")[0]
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
    begin
      File.open("../#{file}").size
    rescue
      0
    end
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

  def <=>(target)
    if num == target.num
      return sideshow? ? 1: -1
    end
    return num <=> target.num
  end
end

def blog(target)
  dir = "./blog.jxck.io/entries/**/*"
  entries = Dir.glob(dir)
    .select { |path| path.match(/.*.md\z/) }
    .map { |path| Entry.new(path) }
    .sort
    .reverse

  if target.include?("markdown")
  end

  if target.include?("feed")
    # xml
    xml = ERB.new(File.read(".template/atom.xml")).result(binding)
    File.write("./blog.jxck.io/feeds/atom.xml", xml)

    # json
    json = JSON.pretty_generate(
      title:     "blog.jxck.io",
      alternate: "https://blog.jxck.io",
      author:    { name: "Jxck" },
      id:        "tag:blog.jxck.io,2016:feed",
      update:    "2016-01-28T18:30:02Z",
      entry:     entries.map(&:json)
    )
    File.write("./blog.jxck.io/feeds/atom.json", json)
  end
end

def podcast(target)
  dir = "./podcast.jxck.io/episodes/**/*"
  items = Dir.glob(dir)
    .select {|path| path.match(/.*.md\z/) }
    .map {|path| Episode.new(path) }
    .sort
    .reverse
    .map.with_index {|ep, i|
      ep.order = i
      ep
    }

  if target.include?("markdown")
  end

  if target.include?("feed")
    xml = ERB.new(File.read(".template/rss2.xml")).result(binding)
    File.write("./podcast.jxck.io/feeds/feed.xml", xml)
  end
end

if __FILE__ == $0
  blog(["markdown", "feed"])
  podcast(["markdown", "feed"])
end
