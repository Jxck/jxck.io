module Document
  # Podcast Episode の抽象
  class Episode < Article
    attr_accessor :order, :prev, :next, :icon

    def initialize(path, icon = "")
      super(path)
      @icon = icon
      @info = @text.match(/## Info(([\n\r]|.)*?)##/m)[1]
    end

    def build(format)
      # setting self url
      format.url = url
      super(format)
    end

    # AST parse する markdown の body
    # tag を本文から消す
    def body
      @text.sub(" [" + tags.join("][") + "]", "")
    end

    def tags
      @text.split("\n")[0].scan(/\[(.+?)\]/).flatten
    end

    def joined_tag
      joined = tags.map{|tag|
        %(<a href="/tags/#{tag.gsub(' ', '%20')}.html">#{tag}</a>)
      }.join("<i>,</i>")
      "[#{joined}]"
    end

    def theme
      @text.match(/## (Theme)(([\n\r]|.)*?)##/m)[2]
    end

    def description
      unlink theme
    end

    def article
      super
        .sub(/audio: (.*)/, "<mozaic-player><audio slot=audio src=#{audio} crossorigin=anonymous title='#{title}' data-forward=+30 data-back=-10></audio></mozaic-player>")
        .sub(/<dl>(.*?)<dt>published_at/m, '<dl class=info>\1<dt>published_at')
        .sub(/published_at: (.*)/, "published_at: <time datetime=#{datetime}>#{datetime}</time>")
    end

    def num
      @path.split("/")[3].to_i
    end

    def subtitle
      summary.split("\n")[2]
    end

    def sideshow?
      !! (@path =~ /.*sideshow.md/)
    end

    def audio
      @info.match(/audio: (.*)/)[1]
    end

    def guests
      @info.scan(/guest\n: (.*)/).map(&:first) || []
    end

    def guest_links
      guests.map{|guest|
        to_html(guest)
          .gsub("<p>", "")
          .gsub("</p>", "")
          .strip
      }
    end

    def audio_file
      audio.sub("https://", "")
    end

    def datetime
      @info.match(/published_at\n: (.*)/)[1]
    end

    def pubDate
      Time.parse(datetime).rfc822
    end

    def summary()
      hsc unlink @text.sub(/#(.*?)## Theme/m, "# #{title}")
    end

    def theme_line
      to_html(theme).split("\n").reject(&:empty?)
    end

    # build markdown to html
    def to_html(md)
      Kramdown::Document
        .new(md, {input: "GFM"})
        .to_html
    end

    def size
      begin
        File.open("../#{audio_file}").size
      rescue
        0
      end
    end

    def duration
      sec = 0
      if RUBY_PLATFORM.match(/darwin/)
        sec = `afinfo ../#{audio_file}  | grep duration | cut -d' ' -f 3`.to_i
      else
        sec = `mp3info -p "%S\n" ../#{audio_file}`.to_i
      end
      Time.at(sec).utc.strftime("%X")
    end

    def <=>(other)
      if num == other.num
        sideshow? ? 1 : -1
      else
        num <=> other.num
      end
    end
  end
end
