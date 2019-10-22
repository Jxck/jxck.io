#!/usr/bin/env ruby

require "pp"
require "uri"
require "erb"
require "json"
require "time"
require "optparse"
require "pathname"
require "kramdown"
require "kramdown-parser-gfm"

require_relative "ast.rb"
require_relative "html.rb"
require_relative "amp.rb"
require_relative "article.rb"
require_relative "traverser.rb"
require_relative "entry.rb"
require_relative "episode.rb"
require_relative "podcast.rb"

require_relative "erb_helper.rb"
include ErbHelper

# debugger
def j(o)
  puts caller.first, JSON.pretty_generate(o)
end



# build markdown to html
def to_html(md)
  Kramdown::Document
    .new(md, {input: "GFM"})
    .to_html
end

# remove markdown link
def unlink(str)
  str.gsub(/\[(.*?)\]\(.*?\)/, '\1').gsub(/<(http.*?)>/, '\1')
end

# remove \n\r for online
def oneline(str)
  str.gsub(/(\n|\r)/, "")
end

def erb_template(path)
  template = File.read(path)
  ERB.new(template, nil, '-')
end

# dot access Hash
class Hash
  def method_missing(method, *params)
    if method[-1] == "="
      key = method[0..-2].to_sym
      self[key] = params[0]
    else
      self[method.to_sym]
    end
  end

  def inline?
    inline || [
      :text,
      :header,
      :strong,
      :paragraph,
    ].include?(type)
  end
end

## 渡されたパスの配列を全部ビルドする
## 1 つしかなければ 1 つだけ
def blog(paths)
  icon  = "https://jxck.io/assets/img/jxck"
  fav_template  = File.read(".template/favicon.html.erb")
  ld_template   = File.read(".template/ld-json.html.erb")
  meta_template = File.read(".template/meta.html.erb")
  blog_template = File.read(".template/blog.html.erb")
  amp_template  = File.read(".template/amp.html.erb")

  paths.each{|path|
    p path
    entry = Entry.new(path, icon)

    # blog
    entry.build(HTML.new)
    fav  = ERB.new(fav_template) .result(entry.instance_eval{ binding }).strip
    meta = ERB.new(meta_template).result(entry.instance_eval{ binding }).strip
    ld   = ERB.new(ld_template)  .result(entry.instance_eval{ binding }).strip
    html = ERB.new(blog_template).result(binding).strip
    File.write(entry.htmlfile, html)

    # amp
    entry.build(AMP.new)
    fav  = ERB.new(fav_template) .result(entry.instance_eval{ binding }).strip
    meta = ERB.new(meta_template).result(entry.instance_eval{ binding }).strip
    ld   = ERB.new(ld_template)  .result(entry.instance_eval{ binding }).strip
    html = ERB.new(amp_template) .result(binding).strip
    File.write(entry.ampfile, html)
  }
end

# blog feed
def blogfeed(feed = false)
  puts "build blog"

  # entries
  dir  = "./blog.jxck.io/entries/**/*"
  icon = "https://jxck.io/assets/img/jxck"

  entries = Dir.glob(dir)
    .select {|path| path.match(/.*.md\z/)}
    .map {|path| Entry.new(path, icon)}
    .sort
    .reverse

  if feed
    puts "build blog feed & sitemap"
    xml = erb_template(".template/atom.xml.erb").result(binding)
    File.write("./blog.jxck.io/feeds/atom.xml", xml)

    xml = erb_template(".template/sitemap.xml.erb").result(binding)
    File.write("./blog.jxck.io/feeds/sitemap.xml", xml)
  else
    puts "build archive page"
    fav     = erb_template(".template/favicon.html.erb").result(binding).strip
    archive = erb_template(".template/archive.html.erb").result(binding)
    File.write("./blog.jxck.io/index.html", archive)

    puts "build tags page"
    tags = entries.map {|entry|
      entry.tags.reduce({}) {|acc, tag|
        acc.merge({tag => [entry]})
      }
    }.reduce {|acc, entry|
      acc.merge(entry) {|_key, old, new| new + old}
    }

    tag      = "Tags"
    fav      = erb_template(".template/favicon.html.erb").result(binding).strip
    template = erb_template(".template/tags.html.erb").result(binding).strip
    html     = ERB.new(template).result(binding)
    File.write("./blog.jxck.io/tags/index.html", html)

    tags.each {|tag, v|
      tags     = { tag => v }
      template = erb_template(".template/tags.html.erb").result(binding).strip
      html     = ERB.new(template).result(binding)
      File.write("./blog.jxck.io/tags/#{tag}.html", html)
    }
  end
end

## ビルド時に前後のエントリへのリンクを貼る
## そこで一旦全体を見る必要があるの
## 引数は nil なら全体をビルド
## ファイルパスを渡すとそれだけをビルド
def podcast(path)
  dir  = "./mozaic.fm/episodes/**/*.md"
  icon = "https://mozaic.fm/assets/img/mozaic"

  # prev/next のリンクを貼るために一度全部をたどる必要がある
  # (sideshow があるためディレクトリの番号では足らない)
  episodes = Dir.glob(dir)
    .map {|path| Episode.new(path)} #.map(&method(Episode.new))
    .sort
    .reverse
    .map.with_index {|ep, i|
      # 連番を振る
      ep.order = i
      ep
    }

  # 前後関係を設定
  episodes.each.with_index {|e, i|
    e.prev = episodes[i+1] if i < episodes.size
    e.next = episodes[i-1] if i > 0
  }

  # もし Path があったらその一つに絞る
  episodes = episodes.select{|e| e.path == path} if path

  # ビルドする
  episodes.each{|episode|
    p episode.path

    # entry
    episode.build(Podcast.new)
    fav  = erb_template(".template/favicon.html.erb").result(episode.instance_eval { binding }).strip
    meta = erb_template(".template/meta.html.erb")   .result(episode.instance_eval { binding }).strip
    html = erb_template(".template/podcast.html.erb").result(binding).strip
    File.write(episode.htmlfile, html)
  }

end

def podcastfeed(feed = false)
  puts "build podcast"

  # episodes
  dir  = "./mozaic.fm/episodes/**/*"
  icon = "https://mozaic.fm/assets/img/mozaic"
  host = "mozaic.fm"

  episodes = Dir.glob(dir)
    .select {|path| path.match(/.*.md\z/)}
    .map {|path| Episode.new(path)}
    .sort
    .reverse
    .map.with_index {|ep, i|
      ep.order = i
      ep
    }

  if feed
    puts "build podcast feed"
    xml = erb_template(".template/rss2.xml.erb").result(binding)
    File.write("./feed.mozaic.fm/index.xml", xml)
  else
    episodes.each.with_index {|e, i|
      e.prev = episodes[i+1] if i < episodes.size
      e.next = episodes[i-1] if i > 0
    }

    puts "build index.html"
    fav     = erb_template(".template/favicon.html.erb").result(binding).strip
    archive = erb_template(".template/podcast.index.html.erb").result(binding)
    File.write("./mozaic.fm/index.html", archive)
  end
end


if __FILE__ == $PROGRAM_NAME
  opt = OptionParser.new

  # Markdown to HTML
  opt.on("-b path/to/entry", "--blog ./path/to/entry.md") {|path|
    blog([path])
  }
  opt.on("-p path/to/episode", "--podcast ./path/to/episode.md") {|path|
    podcast(path)
  }
  opt.on("--full") {
    blog(Dir.glob("./blog.jxck.io/entries/**/*.md"))
    podcast(nil)
  }


  # Update Index/Archive/Tags
  opt.on("--blogindex") {|v|
    blogfeed(false)
  }
  opt.on("--podcastindex") {|v|
    podcastfeed(false)
  }


  ## Update Feed
  opt.on("--blogfeed") {|v|
    blogfeed(true)
  }
  opt.on("--podcastfeed") {|v|
    podcastfeed(true)
  }


  ## Test
  opt.on("--blogtest") {|v|
    puts "test builing blog"
    path = "./blog.jxck.io/entries/2016-01-27/new-blog-start.md"
    blog([path])
 }
  opt.on("--podcasttest") {|v|
    puts "test building podcast"
    # path = "./mozaic.fm/episodes/0/introduction-of-mozaicfm.md"
    path = "./mozaic.fm/episodes/1/webcomponents.md"
    podcast(path)
  }

  opt.parse!(ARGV)
end
