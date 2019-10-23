## 渡されたパスの配列を全部ビルドする
## 1 つしかなければ 1 つだけ
class Blog
  def initialize(dir="")
    @paths = Dir.glob(dir)
    @icon  = "https://jxck.io/assets/img/jxck"
    @blog_template = erb_template(".template/blog.html.erb")
    @amp_template  = erb_template(".template/amp.html.erb")
  end

  def build(path)
    puts "build #{path}"
    entry = Entry.new(path, @icon)
    build_html(entry)
    build_amp_html(entry)
  end

  def build_all
    @paths.each{|path|
      build(path)
    }
  end

  def feed
    puts "build blog feed & sitemap"

    entries = @paths
      .map {|path| Entry.new(path, @icon)}
      .sort

    xml = erb_template(".template/atom.xml.erb").result(binding)
    File.write("./blog.jxck.io/feeds/atom.xml", xml)

    xml = erb_template(".template/sitemap.xml.erb").result(binding)
    File.write("./blog.jxck.io/feeds/sitemap.xml", xml)
  end

  def archive
    puts "build archive page"

    entries = @paths
      .map {|path| Entry.new(path, @icon)}
      .sort

    archive = erb_template(".template/archive.html.erb").result(binding)
    File.write("./blog.jxck.io/index.html", archive)

    puts "build tags page"

    tag_map = entries.map {|entry|
      # 各エントリに対して tag => entry な hash を作る
      entry.tags.reduce({}) {|acc, tag|
        acc.merge({tag => [entry]})
      }
    }.reduce {|acc, entry|
      # 全エントリごとに作った hash をマージする
      acc.merge(entry) {|_key, old, new| new + old}
    }

    tag = "Tags"

    # /tags で全タグの一覧のページ
    html = erb_template(".template/tags.html.erb").result(binding).strip
    File.write("./blog.jxck.io/tags/index.html", html)

    # /tags/xxx.html で各タグのページ
    tag_map.each {|tag, v|
      tag_map = { tag => v } # 変数が同じなのでここで単一タグに上書き
      txt     = erb_template(".template/tags.html.erb").result(binding).strip
      File.write("./blog.jxck.io/tags/#{tag}.html", txt)
    }
  end

  private

  def build_html(entry)
    entry.build(HTML.new)
    html = @blog_template.result(binding).strip
    File.write(entry.htmlfile, html)
  end

  def build_amp_html(entry)
    entry.build(AMP.new)
    html = @amp_template.result(binding).strip
    File.write(entry.ampfile, html)
  end
end
