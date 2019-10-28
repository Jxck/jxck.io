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

require_relative "markdown/ast.rb"
require_relative "markdown/traverser.rb"

require_relative "file/article.rb"
require_relative "file/entry.rb"
require_relative "file/episode.rb"

require_relative "format/html.rb"
require_relative "format/amp.rb"

require_relative "builder/blog_builder.rb"
require_relative "builder/podcast_builder.rb"
require_relative "builder/idtag_builder.rb"

require_relative "helper/erb_helper.rb"
include ErbHelper

# debugger
def j(o)
  puts caller.first, JSON.pretty_generate(o)
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



if __FILE__ == $PROGRAM_NAME
  opt = OptionParser.new

  dir  = "./blog.jxck.io/entries/**/*.md"
  icon = "https://jxck.io/assets/img/jxck" # 拡張子は template で補完
  blog = BlogBuilder.new(dir, icon)


  dir  = "./mozaic.fm/episodes/**/*.md"
  icon = "https://mozaic.fm/assets/img/mozaic" # 拡張子は template で補完
  podcast = PodcastBuilder.new(dir, icon)



  # Markdown to HTML
  opt.on("-b path/to/entry", "--blog ./path/to/entry.md") {|path|
    blog.build(path)
  }
  opt.on("-p path/to/episode", "--podcast ./path/to/episode.md") {|path|
    podcast.build(path)
  }
  opt.on("--full") {
    blog.build_all
    podcast.build_all
  }


  # Update Index/Tags
  opt.on("--blogindex") {|v|
    blog.index
    blog.tags
  }
  opt.on("--podcastindex") {|v|
    podcast.index
  }


  ## Update Feed
  opt.on("--blogfeed") {|v|
    blog.feed
  }
  opt.on("--podcastfeed") {|v|
    podcast.feed
  }


  ## Test
  opt.on("--blogtest") {|v|
    puts "test builing blog"
    path = "./blog.jxck.io/entries/2016-01-27/new-blog-start.md"
    blog.build(path)
    blog.build_all
    blog.feed
 }
  opt.on("--podcasttest") {|v|
    puts "test building podcast"
    # path = "./mozaic.fm/episodes/0/introduction-of-mozaicfm.md"
    path = "./mozaic.fm/episodes/1/webcomponents.md"
    podcast.build(path)
    podcast.build_all
    podcast.feed
    podcast.index
  }
  opt.on("--marktest") {|v|
    puts "test markup"
    path = "./.script/test/test.md"
    idtag = IdtagBuilder.new()
    idtag.build(path)
  }

  opt.on("--test") {|v|
    path = "./blog.jxck.io/entries/2016-01-27/new-blog-start.md"
    blog.build(path)
    blog.feed
    blog.index

    path = "./mozaic.fm/episodes/1/webcomponents.md"
    podcast.build(path)
    # podcast.feed
    podcast.index

    path = "./.script/test/test.md"
    idtag = IdtagBuilder.new()
    idtag.build(path)
  }

  opt.on("-h") {|v|
    puts "make から叩いて"
  }

  puts "make から叩いて" if ARGV.empty?
  opt.parse!(ARGV)
end
