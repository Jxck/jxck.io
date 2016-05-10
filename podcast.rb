#!/usr/bin/ruby

require "time"

# html special chars
def hsp(str)
  str.gsub(/&/, "&amp;")
     .gsub(/</, "&lt;")
     .gsub(/>/, "&gt;")
     .gsub(/"/, "&quot;")
     .gsub(/'/, "&#039;")
end

dir = "./podcast.jxck.io/**/*"

class EP
  attr_reader :path
  def initialize(path)
    @path = path
    @text = File.read(path)
  end
  def num
    @path.split('/')[3].to_i
  end
  def file
    "https://files.mozaic.fm/mozaic-ep#{num}.mp3"
  end
  def sideshow?
    !! (@path =~ /.*sideshow.md/)
  end
  def <=>(target)
    if num == target.num
      return sideshow? ? 1: -1
    end
    return num <=> target.num
  end
  def to_s
    return path
  end
  def url
    path.sub('./', 'https://').sub('.md', '.html')
  end
  def title
    hsp @text.match(/^# \[.*\] (.*)/)[1]
  end
  def summary
    hsp @text.match(/## Theme(.*?)##/im)[1].strip # .gsub(/\n/, "")
  end
  def pubDate
    datetime = @text.match(/datetime=(.*?)>/)[1]
    Time.new(datetime).rfc822
  end
  def size
    File.open("../files.mozaic.fm/mozaic-ep#{num}.mp3")
  end
end

md = "./podcast.jxck.io/episodes/19/es7.md"
ep = EP.new(md)
puts ep.size
#entries = Dir.glob(dir)
#  .select { |path| path.match(/.*.md\z/) }
#  .map { |path| EP.new(path) }
#  .sort
#
#puts entries

__END__

url = "https://mozaic.fm/episedes/1/webcomponents.html"
file = "hptts://files.mozaic.fm/mozaic-ep1.mp3"
size = 100
duration = "10:00"
title = "ep1 WebComponents"
pubDate = "Sun, 07 April 2014 08:00:00 -0700"
subtitle = <<EOS
第 1 回目のテーマは WebComponents です。

今回は [@hokaccha](https://twitter.com/hokaccha) さんと [@ahomu](https://twitter.com/ahomu) さんをお迎えし、 WebComponents で何が変わるのか、 ShadowDOM で何が嬉しいのか、今の課題は何か?

「なにが起こっているのか?」「これからどうなっていくのか?」を議論しました。

ハッシュタグは [#mozaicfm](https://twitter.com/search?q=mozaicfm&src=hash) です。
EOS

description = "description"

items =<<-EOS
   <item>
     <author>Jxck</author>
     <category>mozaicfm</category>
     <description>#{description}</description>
     <enclosure url="#{file}" length="#{size}" type="audio/mpeg" />
     <guid isPermaLink="false">#{url}</guid>
     <link>#{url}</link>
     <pubDate>#{pubDate}</pubDate>
     <title>#{title} | mozaic.fm</title>
     <itunes:author>Jxck</itunes:author>
     <itunes:duration>#{duration}</itunes:duration>
     <itunes:explicit>no</itunes:explicit>
     <itunes:keywords>web,tech,it</itunes:keywords>
     <itunes:subtitle>#{subtitle}</itunes:subtitle>
     <media:content url="#{file}" fileSize="#{size}" type="audio/mpeg" />
   </item>
EOS

xml = <<-EOS
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:media="http://search.yahoo.com/mrss/" >
  <channel>
    <title>mozaic.fm</title>
    <link>http://mozaic.fm/</link>
    <description>next generation web podcast</description>
    <generator>Ruby</generator>
    <language>ja</language>
    <copyright>Copyright © 2014 mozaic.fm. All Rights Reserved. Redistribute, Transcript are not allowed.</copyright>
    <atom:link xmlns:atom10="http://www.w3.org/2005/Atom" rel="self" type="application/rss+xml" href="http://mozaic.fm/feeds/rss2.xml" />
    <itunes:author>Jxck</itunes:author>
    <itunes:category text="Technology"><itunes:category text="Podcasting" /></itunes:category>
    <itunes:explicit>no</itunes:explicit>
    <itunes:image href="http://files.mozaic.fm/mozaic.png" />
    <itunes:keywords>web,technology,programming,it,software,jxck</itunes:keywords>
    <itunes:subtitle>next generation web podcast</itunes:subtitle>
    <itunes:summary>talking about next generation web technologies hosted by Jxck </itunes:summary>
    <media:category scheme="http://www.itunes.com/dtds/podcast-1.0.dtd">Technology/Podcasting</media:category>
    <media:copyright>Copyright © 2014 mozaic.fm. All Rights Reserved. Redistribute, Transcript are not allowed.</media:copyright>
    <media:credit role="author">Jxck</media:credit>
    <media:description type="plain">next generation web podcast</media:description>
    <media:keywords>web,technology,programming,it,software,jxck</media:keywords>
    <media:rating>nonadult</media:rating>
    <media:thumbnail url="http://files.mozaic.fm/mozaic.png" />
    <itunes:owner>
      <itunes:email>block.rxckin.beats@gmail.com</itunes:email>
      <itunes:name>Jxck</itunes:name>
    </itunes:owner>
#{items}
  </channel>
</rss>
EOS

