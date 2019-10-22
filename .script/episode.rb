# Podcast Episode の抽象
class Episode < Article
  attr_accessor :order, :prev, :next

  def initialize(path)
    super(path)
    @info = @text.match(/## Info(([\n\r]|.)*?)##/m)[1]
  end

  def article
    super
      .sub(/audio: (.*)/, "<mozaic-player><audio slot=audio src=#{audio} title='#{title}' data-forward=+30 data-back=-10></audio></mozaic-player>")
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

  def file
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
    to_html(theme).split("\n").reject{|c| c.empty?}
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

  def <=>(other)
    if num == other.num
      return sideshow? ? 1 : -1
    end
    return num <=> other.num
  end
end
