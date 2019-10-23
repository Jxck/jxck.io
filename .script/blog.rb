## 渡されたパスの配列を全部ビルドする
## 1 つしかなければ 1 つだけ
class Blog
  def initialize(dir="")
    @paths = Dir.glob(dir)
    @icon  = "https://jxck.io/assets/img/jxck"
  end

  def build
    ld_template   = erb_template(".template/ld-json.html.erb")
    meta_template = erb_template(".template/meta.html.erb")
    blog_template = erb_template(".template/blog.html.erb")
    amp_template  = erb_template(".template/amp.html.erb")

    @paths.each{|path|
      puts path
      entry = Entry.new(path, @icon)

      # blog
      entry.build(HTML.new)
      meta = meta_template.result(entry.instance_eval{ binding }).strip
      ld   = ld_template  .result(entry.instance_eval{ binding }).strip
      html = blog_template.result(binding).strip
      File.write(entry.htmlfile, html)

      # amp
      entry.build(AMP.new)
      meta = meta_template.result(entry.instance_eval{ binding }).strip
      ld   = ld_template  .result(entry.instance_eval{ binding }).strip
      html = amp_template .result(binding).strip
      File.write(entry.ampfile, html)
    }
  end

  def build_path(path)
    ld_template   = erb_template(".template/ld-json.html.erb")
    meta_template = erb_template(".template/meta.html.erb")
    blog_template = erb_template(".template/blog.html.erb")
    amp_template  = erb_template(".template/amp.html.erb")

    puts path
    entry = Entry.new(path, @icon)

    # blog
    entry.build(HTML.new)
    meta = meta_template.result(entry.instance_eval{ binding }).strip
    ld   = ld_template  .result(entry.instance_eval{ binding }).strip
    html = blog_template.result(binding).strip
    File.write(entry.htmlfile, html)

    # amp
    entry.build(AMP.new)
    meta = meta_template.result(entry.instance_eval{ binding }).strip
    ld   = ld_template  .result(entry.instance_eval{ binding }).strip
    html = amp_template .result(binding).strip
    File.write(entry.ampfile, html)
  end

  def feed
    entries = @paths
      .map {|path| Entry.new(path, @icon)}
      .sort
      .reverse

    puts "build blog feed & sitemap"
    xml = erb_template(".template/atom.xml.erb").result(binding)
    File.write("./blog.jxck.io/feeds/atom.xml", xml)

    xml = erb_template(".template/sitemap.xml.erb").result(binding)
    File.write("./blog.jxck.io/feeds/sitemap.xml", xml)
  end

  def archive
    entries = @paths
      .select {|path| path.match(/.*.md\z/)}
      .map {|path| Entry.new(path, @icon)}
      .sort
      .reverse

    puts "build archive page"
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
end
