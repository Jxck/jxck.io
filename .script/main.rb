#!/usr/bin/env ruby

require "pp"
require "uri"
require "erb"
require "json"
require "time"
require "optparse"
require "pathname"
require "md2indesign"


require "./.script/builder/builder.rb"
require "./.script/helper/erb_helper.rb"
include ERBHelper

# debugger
def j(o)
  puts caller.first, JSON.pretty_generate(o)
end


if __FILE__ == $PROGRAM_NAME
  opt = OptionParser.new

  dir  = "./blog.jxck.io/entries/**/*.md"
  icon = "https://jxck.io/assets/img/jxck" # 拡張子は template で補完
  blog = Builder::BlogBuilder.new(dir, icon)


  dir  = "./mozaic.fm/episodes/**/*.md"
  icon = "https://mozaic.fm/assets/img/mozaic" # 拡張子は template で補完
  podcast = Builder::PodcastBuilder.new(dir, icon)



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
  opt.on("--podcastid3all") {|v|
    puts "test building podcast id3tag"
    podcast.id3all
  }
  #opt.on("--marktest") {|v|
  #  puts "test markup"
  #  path = "./.script/test/test.md"
  #  idtag = Builder::IdtagBuilder.new()
  #  idtag.build(path)
  #}

  opt.on("--test") {|v|
    path = "./blog.jxck.io/entries/2016-01-27/new-blog-start.md"
    blog.build(path)
    blog.feed
    blog.index

    path = "./mozaic.fm/episodes/1/webcomponents.md"
    podcast.build(path)
    # podcast.feed
    podcast.index
  }

  opt.on("-d path/to/episode", "--draft ./path/to/episode.md") {|path|
    blog.build(path)
  }

  opt.on("-h") {|v|
    puts "make から叩いて"
  }

  puts "make から叩いて" if ARGV.empty?
  opt.parse!(ARGV)
end
