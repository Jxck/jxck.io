## blog entry の markdown を html/amp でビルド
class BlogBuilder
  attr_accessor :entries

  def initialize(dir, icon)
    @paths = Dir.glob(dir)
    @icon  = icon
    @html_template = erb_template("template/blog.html.erb")
    @amp_template  = erb_template("template/blog.amp.html.erb")

    @entries = @paths
      .map {|path| Entry.new(path, @icon)}
      .sort
  end

  ## 特定のパスのファイルをビルド
  def build(path)
    puts "build #{path}"
    build_html(Entry.new(path, @icon))
    build_amp_html(AMPEntry.new(path, @icon))
  end

  ## dir の中全てビルド
  def build_all
    @paths.each{|path|
      build(path)
    }
    index
    tags
  end

  ## index ページ生成
  def index
    puts "build index page"
    index = erb_template("template/blog.index.html.erb").result(binding)
    File.write("./blog.jxck.io/index.html", index)
  end

  ## tag ページ生成
  def tags
    puts "build tags page"

    tag_map = @paths
      .map {|path| Entry.new(path, @icon)}
      .sort
      .map {|entry|

      # 各エントリに対して tag => entry な hash を作る
      entry.tags.reduce({}) {|acc, tag|
        acc.merge({tag => [entry]})
      }
    }.reduce {|acc, entry|
      # 全エントリごとに作った hash をマージする
      acc.merge(entry) {|_key, old, new| new + old}
    }

    tags_template = erb_template("template/blog.tags.html.erb")

    # /tags で全タグの一覧のページ
    tag = "Tags" # tag 一覧ページのタイトル
    tag_html = tags_template.result(binding).strip
    File.write("./blog.jxck.io/tags/index.html", tag_html)

    # /tags/xxx.html で各タグのページ
    tag_map.each {|tag, v|
      tag_map = { tag => v } # 変数が同じなのでここで単一タグに上書き
      tags_html = tags_template.result(binding).strip
      File.write("./blog.jxck.io/tags/#{tag}.html", tags_html)
    }
  end

  ## RSS/Sitemap 生成
  def feed
    puts "build blog feed & sitemap"

    xml = erb_template("template/blog.atom.xml.erb").result(binding)
    File.write("./blog.jxck.io/feeds/atom.xml", xml)

    xml = erb_template("template/blog.sitemap.xml.erb").result(binding)
    File.write("./blog.jxck.io/feeds/sitemap.xml", xml)
  end

  private

  # html のビルド
  def build_html(entry)
    entry.build(HTML.new)
    html = @html_template.result(binding).strip
    File.write(entry.target_path, html)
  end

  # amp html のビルド
  def build_amp_html(entry)
    entry.build(AMP.new)
    html = @amp_template.result(binding).strip
    File.write(entry.target_path, html)
  end
end
