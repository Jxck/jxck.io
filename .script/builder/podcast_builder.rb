## podcast episode の markdown を html でビルド
class PodcastBuilder
  attr_accessor :episodes

  def initialize(dir, icon)
    @paths = Dir.glob(dir)
    @icon  = icon

    @html_template = erb_template("template/podcast.html.erb")

    # prev/next のリンクを貼るために一度全部をたどる必要がある
    # (sideshow があるためディレクトリの番号では足らない)
    @episodes = @paths
      .map {|path| Episode.new(path, @icon)}
      .sort
      .reverse
      .map.with_index {|ep, i|
      # 連番を振る
      ep.order = i
      ep
    }

    # 前後関係を設定
    @episodes.each.with_index {|e, i|
      e.prev = @episodes[i+1] if i < @episodes.size
      e.next = @episodes[i-1] if i > 0
    }
  end

  ## 特定のパスのファイルをビルド
  def build(path)
    # もし Path があったらその一つに絞る
    episode = @episodes.find{|e| e.path == path}

    puts episode.path

    # entry
    episode.build(TMP.new)
    html = @html_template.result(binding).strip
    File.write(episode.target_path, html)
  end

  ## dir の中全てビルド
  def build_all
    # ビルドする
    @episodes.each{|episode|
      puts episode.path

      episode.build(TMP.new)
      html = @html_template.result(binding).strip
      File.write(episode.target_path, html)
    }
  end

  ## index ページ生成
  def index
    puts "build index.html"
    index = erb_template("template/podcast.index.html.erb").result(binding)
    File.write("./mozaic.fm/index.html", index)
  end

  ## RSS 生成
  def feed
    puts "build podcast feed"
    xml = erb_template("template/podcast.rss2.xml.erb").result(binding)
    File.write("./feed.mozaic.fm/index.xml", xml)
  end
end
