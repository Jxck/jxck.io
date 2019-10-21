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

require_relative "markup.rb"
require_relative "amp.rb"
require_relative "article.rb"
require_relative "ast.rb"
require_relative "entry.rb"
require_relative "traverser.rb"


# html
def to_html(md)
  Kramdown::Document
    .new(md, {input: "GFM"})
    .to_html
end

# html special chars
def hsc(str)
  str.gsub(/&/, "&amp;")
     .gsub(/</, "&lt;")
     .gsub(/>/, "&gt;")
     .gsub(/"/, "&quot;")
     .gsub(/'/, "&#039;")
end

# trim to 140 word for html meta description
def short(str)
  limit = 140
  str.gsub(/(\n|\r)/, "")
     .strip[0...(limit-3)]
     .concat("...")
end

# remove markdown link
def unlink(str)
  str.gsub(/\[(.*?)\]\(.*?\)/, '\1').gsub(/<(http.*?)>/, '\1')
end

# remove \n\r for online
def oneline(str)
  str.gsub(/(\n|\r)/, "")
end

def j(o)
  puts caller.first, JSON.pretty_generate(o)
end

# replace " " to "+"
def escape(str)
  str
    .tr('"', "")
    .tr(" ", "+")
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
  meta_template = File.read(".template/meta.html.erb") + File.read(".template/ld-json.html.erb")
  blog_template = File.read(".template/blog.html.erb")
  amp_template  = File.read(".template/amp.html.erb")

  style = [
    "./blog.jxck.io/assets/css/article.css",
    "./blog.jxck.io/assets/css/body.css",
    "./blog.jxck.io/assets/css/info.css",
    "./blog.jxck.io/assets/css/header.css",
    "./blog.jxck.io/assets/css/markdown.css",
    "./blog.jxck.io/assets/css/main.css",
    "./blog.jxck.io/assets/css/footer.css",
    "./blog.jxck.io/assets/css/pre.css",
    "./blog.jxck.io/assets/css/table.css",
  ].map {|css| File.read(css)}.join("\n")

  paths.each{|path|
    p path
    entry = Entry.new(path, icon)

    # blog
    markup = Markup.new
    entry.build(markup)
    fav  = ERB.new(fav_template).result(entry.instance_eval { binding }).strip
    meta = ERB.new(meta_template).result(entry.instance_eval { binding }).strip
    html = ERB.new(blog_template).result(binding).strip
    File.write(entry.htmlfile, html)

    # amp
    amp = AMP.new
    entry.build(amp)
    fav  = ERB.new(fav_template).result(entry.instance_eval { binding }).strip
    meta = ERB.new(meta_template).result(entry.instance_eval { binding }).strip
    html = ERB.new(amp_template).result(binding).strip
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
    xml = ERB.new(File.read(".template/atom.xml.erb")).result(binding)
    File.write("./blog.jxck.io/feeds/atom.xml", xml)

    xml = ERB.new(File.read(".template/sitemap.xml.erb")).result(binding)
    File.write("./blog.jxck.io/feeds/sitemap.xml", xml)
  else
    puts "build archive page"
    fav     = ERB.new(File.read(".template/favicon.html.erb")).result(binding).strip
    archive = ERB.new(File.read(".template/archive.html.erb")).result(binding)
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
    fav      = ERB.new(File.read(".template/favicon.html.erb")).result(binding).strip
    template = ERB.new(File.read(".template/tags.html.erb")).result(binding).strip
    html     = ERB.new(template).result(binding)
    File.write("./blog.jxck.io/tags/index.html", html)

    tags.each {|tag, v|
      tags     = { tag => v }
      template = ERB.new(File.read(".template/tags.html.erb")).result(binding).strip
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
  fav_template     = File.read(".template/favicon.html.erb")
  meta_template    = File.read(".template/meta.html.erb")
  podcast_template = File.read(".template/podcast.html.erb")

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
    # entry
    markup = Podcast.new
    episode.build(markup)
    fav  = ERB.new(fav_template).result(episode.instance_eval { binding }).strip
    meta = ERB.new(meta_template).result(episode.instance_eval { binding }).strip
    html = ERB.new(podcast_template).result(binding).strip
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
    xml = ERB.new(File.read(".template/rss2.xml.erb")).result(binding)
    File.write("./feed.mozaic.fm/index.xml", xml)
  else
    episodes.each.with_index {|e, i|
      e.prev = episodes[i+1] if i < episodes.size
      e.next = episodes[i-1] if i > 0
    }

    puts "build index.html"
    fav     = ERB.new(File.read(".template/favicon.html.erb")).result(binding).strip
    archive = ERB.new(File.read(".template/podcast.index.html.erb")).result(binding)
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
