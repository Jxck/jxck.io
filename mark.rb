#!/usr/bin/env ruby

require "pp"
require "uri"
require "erb"
require "json"
require "time"
require "pathname"
require "kramdown"

# html special chars
def hsp(str)
  str.gsub(/&/, "&amp;")
     .gsub(/</, "&lt;")
     .gsub(/>/, "&gt;")
     .gsub(/"/, "&quot;")
     .gsub(/'/, "&#039;")
end

# trim to 140 word for html meta description
def short(str)
  limit = 140
  str.gsub(/(\n|\r)/, '')
     .strip[0...(limit-3)]
     .concat("...")
end

# remove markdown link
def unlink(str)
  str.gsub(/\[(.*?)\]\(.*?\)/, '\1')
end

# remove \n\r for online
def oneline(str)
  str.gsub(/(\n|\r)/, "")
end

def j(o)
  puts caller.first, JSON.pretty_generate(o)
end

# replace ' ' to '+'
def unspace(str)
  str.gsub(/ /, "+")
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
    self.inline || [
      :text,
      :header,
      :strong,
      :paragraph,
    ].include?(self.type)
  end
end

# tag ごとのビルダ
class Markup
  attr_writer :url
  def initialize()
    @indent = "  "
    @css = {
      PRE:   "/assets/css/pre.css",
      TABLE: "/assets/css/table.css",
    }
  end
  def wrap(value)
    # increase indent
    "\n#{value}".gsub(/\n/m, "\n#{@indent}") + "\n"
  end
  def style(href)
    "<link rel=stylesheet property=stylesheet type=text/css href=#{href}>"
  end
  def raw(node)
    node.value
  end
  def root(node)
    wrap("#{node.value}")
  end
  def article(node)
    "<article>#{wrap(node.value)}</article>"
  end
  def section(node)
    "<section>#{wrap(node.value)}</section>\n"
  end
  def ul(node)
    "<ul>#{wrap(node.value)}</ul>\n"
  end
  def ol(node)
    "<ol>#{wrap(node.value)}</ol>\n"
  end

  def header(node)
    level = node.options.level
    if level == 1
      # h1 の中身はタイトル
      @title = node.value
      # h1 だけは self url にリンク
      return %(<h#{level}><a href=#{@url}>#{@title}</a></h#{level}>\n)
    else
      # h2 以降は id を振る
      return %(<h#{level} id="#{unspace(node.value)}"><a href="##{unspace(node.value)}">#{node.value}</a></h#{level}>\n)
    end
  end

  def pre(node)
    lang = node.attr && node.attr["class"].sub("language-", "")
    "<pre#{lang ? %( class=#{lang}) : ""}><code>#{node.value}</code></pre>\n"
  end
  protected :pre

  def codeblock(node)
    value = pre(node)

    if @css.PRE
      value = style(@css.PRE) + "\n" + value
      @css.PRE = nil
    end
    value
  end

  def tabletag(node)
    "<table>#{wrap(node.value)}</table>"
  end
  protected :tabletag

  def table(node)
    value = tabletag(node)

    if @css.TABLE
      value = style(@css.TABLE) + "\n" + value
      @css.TABLE = nil
    end
    value
  end
  def thead(node)
    "<thead>#{wrap(node.value)}</thead>\n"
  end
  def tbody(node)
    "<tbody>#{wrap(node.value)}</tbody>\n"
  end
  def tr(node)
    "<tr>#{wrap(node.value)}</tr>\n"
  end
  def th(node)
    "<th class=align-#{node.alignment}>#{node.value}</th>\n"
  end
  def td(node)
    "<td class=align-#{node.alignment}>#{node.value}</td>\n"
  end
  def dl(node)
    "<dl>#{wrap(node.value)}</dl>\n"
  end
  def dt(node)
    "<dt>#{node.value}\n"
  end
  def dd(node)
    "<dd>#{node.value}\n"
  end
  def p(node)
    "<p>#{node.value}\n"
  end

  # inline elements
  def codespan(node)
    "<code>#{hsp(node.value)}</code>"
  end
  def blockquote(node)
    "<blockquote>#{hsp(node.value)}</blockquote>\n"
  end
  def smart_quote(node)
    {
      lsquo: "'",
      rsquo: "'",
      ldquo: '"',
      rdquo: '"',
    }[node.value]
  end
  def li(node)
    "<li>#{node.value}\n"
  end
  def strong(node)
    "<strong>#{node.value}</strong>"
  end
  def em(node)
    "<em>#{node.value}</em>"
  end
  def text(node)
    node.value
  end
  def br(node)
    "<br>"
  end
  def hr(node)
    "<hr>"
  end
  def entity(node)
    node.options.original
  end
  def typographic_sym(node)
    "..." if node.value == :hellip
  end
  def a(node)
    %(<a href="#{node.attr["href"]}">#{node.value}</a>)
    # TODO: rel="noopener noreferrer"
  end

  def imgsize(node)
    width, height = "", ""

    size = node.attr["src"].split("#")[1]
    if size
      size = size.split("x")
      if size.size == 1
        width = "width=#{size[0]}"
      elsif size.size == 2
        width = "width=#{size[0]}"
        height = "height=#{size[1]}"
      end
    end
    return width, height
  end
  protected :imgsize

  def img(node)
    width, height = imgsize(node)

    # SVG should specify width-height
    if File.extname(URI.parse(node.attr["src"]).path) == ".svg"
      return %(<img src=#{node.attr["src"]} alt="#{node.attr["alt"]}" title="#{node.attr["title"]}" #{width} #{height}>)
    end

    # No width-height for normal img
    return <<-EOS
      <picture>
    <source type=image/webp srcset=#{node.attr["src"].sub(/(.png|.gif|.jpg)/, ".webp")}>
    <img src=#{node.attr["src"]} alt="#{node.attr["alt"]}" title="#{node.attr["title"]}">
    </picture>
    EOS
  end

  def html_element(node)
    if node.value != "iframe"
      STDERR.puts "unsupported html element #{node.value}"
      exit(1)
    end
    attrs = node.attr.map{ |key, value|
      if value == ""
        next key
      end
      %(#{key}="#{value}")
    }.join(" ")
    "<#{node.value} #{attrs}></#{node.value}>\n"
  end
end

# AMP 用に拡張した Markup
class AMP < Markup
  def a(node)
    if node.attr["href"].match(/^chrome:\/\//)
      # amp page ignores `chrome://` url
      return node.attr["href"]
    end
    super(node)
  end
  def codeblock(node)
    pre(node)
  end
  def table(node)
    tabletag(node)
  end
  def img(node)
    width, height = imgsize(node)

    # AMP should specify width-height
    if width == "" || height == ""
      STDERR.puts("no width x height for img")
      exit(1)
    end
    %(<amp-img layout=responsive src=#{node.attr["src"]} alt="#{node.attr["alt"]}" title="#{node.attr["title"]}" #{width} #{height}>)
  end
  def html_element(node)
    value = super(node)
    if value.match(/<iframe.*/)
      value.gsub!(/iframe/, 'amp-iframe')
    end
    value
  end
end

class Podcast < Markup
  def header(node)
    level = node.options.level
    if level == 1
      # h1 の中身はタイトル
      @title = node.value
      # h1 だけは self url にリンク
      return %(<h#{level}>#{@title}</h#{level}>\n)
    else
      # h2 以降は id を振る
      return %(<h#{level}>#{node.value}</h#{level}>\n)
    end
  end
end


# markup をセットして生成したら
# ast を渡すと traverse しながらビルドしてくれる
class Traverser
  attr_reader :codes

  # 結果を入れるスタック
  # push => unshift()
  # pop  => shift()
  # top  => [0]
  def initialize(markup)
    @stack = []
    @codes = []
    @markup = markup
  end

  def enter(node)
    # DEBUG: puts "enter: #{node.type}"

    # enter では、 inline 属性を追加し
    # stack に詰むだけ
    # 実際は、pop 側で整合検証くらいしか使ってない

    @stack.unshift(node)
  end

  def leave(node)
    # DEBUG: puts "leave: #{node.type} #{node.value}"

    if node.type == :codeblock
      # コードを抜き取り、ここで id に置き換える
      value = node.value
      if value == ""
        # code が書かれてなかったらファイルから読む
        # ```js:main.js
        node.attr["class"], node.path = node.attr["class"].split(":")
        value = File.read(node.path)
      end

      # インデントを無視するため、全部組み上がったら後で差し込む。
      @codes.push(value.chomp)

      # あとで差し変えるため id として番号を入れておく
      node.value = "// #{@codes.length}"
    end

    if node.value
      # value があったら、 text とか

      # pop して
      top = @stack.shift
      # 対応を確認
      if top.type != node.type
        STDERR.puts __LINE__, "ERROR", top, node
        exit(1)
      end

      # 閉じる
      unless @markup.respond_to?(node.type)
        STDERR.puts __LINE__, "ERROR", top, node
        exit(1)
      end

      @stack.unshift({
        tag:    :full,
        val:    @markup.send(node.type, node),
        inline?: node.inline?
      })
    else
      # 完成している兄弟タグを集めてきて配列に並べる
      vals = []

      while @stack.first.tag == :full
        top = @stack.shift

        if top.inline? && vals.first && vals.first.inline?
          # 取得したのが inline で、一個前も inline だったら
          # inline どうしをくっつける
          val = vals.shift
          val.val = top.val + val.val
          vals.unshift(val)
        else
          # そうで無ければただの兄弟要素
          vals.unshift(top)
        end
      end

      # タグを全部連結する
      vals = vals.map{ |val| val.val}.join.strip

      # それを親タグで閉じる
      top = @stack.shift
      top.type != node.type
      if top.type != node.type
        STDERR.puts "ERROR", __LINE__, top, node
        exit(1)
      end

      # 今見ているのが paragraph で
      if node.type == :p
        # その親が p いらないタグ だったら
        if [:li, :blockquote].include?(@stack[0].type)
          # p を消すために text に差し替える
          # text はタグをつけない
          node = { type: :text }
        end
      end

      node.value = vals

      unless @markup.respond_to?(node.type)
        STDERR.puts "unsupported type", node.type
      end

      @stack.unshift({
        tag:     :full,
        val:     @markup.send(node.type, node),
        inline?: node.inline?
      })
    end
  end

  def traverse(ast)
    enter(ast)
    return leave(ast) unless ast.children

    ast.children = ast.children.map { |child|
      next traverse(child)
    }
    leave(ast)
  end
end

class AST
  attr_accessor :ast
  def initialize(md)
    option = {
      input: "GFM"
    }
    @ast = Kramdown::Document.new(md, option).to_hashAST

    # pre process
    @ast.children = sectioning(@ast.children, 1)
  end

  def tabling(table)
    # thead > tr > td を th にしたい

    alignment = table.options.alignment

    table.children = table.children.map { |node|
      node.children.map { |tr|
        tr.children.map.with_index { |td, i|
          td.type = :th if node.type == :thead
          td.alignment = alignment[i]
        }
      }
      next node
    }

    table
  end

  def dling(dl)
    # <dd><p>hoge</dd> の <p> を消したい

    dl.children = dl.children.map{ |c|
      next c if c.type == :dt

      c.children = c.children.first.children
      next c
    }
    dl
  end

  def sectioning(children, level)

    # 最初のセクションは <article> にする
    section = {
      type: level === 1 ? :article : :section,
      options: {
        level: level,
      },
      children: [],
    }

    # 横に並ぶべき <section> を入れる配列
    sections = []

    loop do
      # 横並びになっている子要素を取り出す
      child = children.shift
      break if child == nil

      # blank は消す
      next if child.type == :blank

      child = tabling(child) if child.type == :table

      child = dling(child) if child.type == :dl

      # H2.. が来たらそこで section を追加する
      if child.type == :header
        if section.options.level < child.options.level
          #  一つレベルが下がる場合
          #  今の <section> の下に新しい <section> ができる
          #  <section>
          #   <h2>
          #   <section>
          #     <h3> <- これ

          # その h を一旦戻す
          children.unshift(child)

          # そこを起点に再起する
          # そこに <section> ができて、
          # 戻した h を最初にできる
          section.children.concat(sectioning(children, child.options.level))
          next
        elsif section.options.level == child.options.level
          # 同じレベルの h の場合
          # 同じレベルで別の <section> を作る必要がある
          # <section>
          #  <h2>
          # </section>
          # <section>
          #  <h2> <- これ

          # そこまでの sections を一旦終わらせて
          # 親の child に追加する
          # そして、同じレベルの新しい <section> を開始
          if section.children.length > 0
            sections.push(section)
            section = {
              type: :section,
              options: {
                level: child.options.level
              },
              children: []
            }
          end
          # もし今 section に子要素が無ければ
          # そのまま今の section に追加して良い
        elsif section.options.level > child.options.level
          # レベルが一つ上がる場合
          # 今は一つ下がったレベルで再帰している最中だったが
          # それが終わったことを意味する
          # <section>
          #   <h2>
          #   <section>
          #     <h3>
          #     <p>
          #   <h2> <- 今ここ

          # その h を一旦戻す
          children.unshift(child)

          # ループを終わらせ関数を一つ抜ける
          break
        end
      end

      # 今の <section> の子要素として追加
      section.children.push(child)
    end

    # 最後のセクションを追加
    sections.push(section)

    # そこまでの <section> のツリーを返す
    # 再帰している場合は、親の <section> の
    # childrens として使われる
    sections
  end
end

# File に関する情報の抽象
class Article
  attr_reader :path, :article

  def initialize(path)
    @path = path
    @text = File.read(path)
  end

  # "./blog.jxck.io/entries/2016-01-27"
  def dir
    File.dirname(@path)
  end

  # "new-blog-start"
  def name
    File.basename(@path, ".*")
  end

  # "blog.jxck.io"
  def host
    dir.split("/")[1]
  end

  # "entries/2016-01-27"
  def baseurl
    "#{dir.split("/")[2..4].join("/")}"
  end

  # "entries/2016-01-27/new-blog-start.html"
  def relative
    "#{baseurl}/#{name}.html"
  end

  # "/entries/2016-01-27/new-blog-start.html"
  def url
    "/#{baseurl}/#{name}.html"
  end

  # "https://blog.jxck.io/entries/2016-01-27/new-blog-start.html"
  def canonical
    "https://#{host}#{url}"
  end

  def title
    hsp @text.match(/^# \[.*\] (.*)/)[1]
  end

  def tags
    @text.split("\n")[0].scan(/\[(.+?)\]/).flatten
  end

  # tag を本文から消す
  def no_tag
    @text.sub(" [" + tags.join("][") + "]", "")
  end

  def theme
    @text.match(/## (Intro|Theme)(([\n\r]|.)*?)##/m)[2]
  end

  def description
    unlink theme
  end

  def build(markup) # Markup/AMP
    # setting self url
    markup.url = url

    # parse ast
    ast  = AST.new(no_tag)

    # traverse
    traverser = Traverser.new(markup)
    stack = traverser.traverse(ast.ast)

    # 結果の <article> 結果
    article = stack[0].val

    # indent を無視するため
    # ここで pre に code を戻す
    # ついでにエスケープ
    traverser.codes.each.with_index{ |code, i|
      article.sub!("// #{i + 1}"){ hsp(code) }
    }

    @article = article
  end

  def htmlfile
    "#{dir}/#{name}.html"
  end

  def to_s
    path
  end

  def <=>(target)
    return path <=> target.path
  end
end

# Blog Entry の抽象
class Entry < Article
  attr_accessor :icon # TODO: いる？

  def initialize(path, icon = "")
    super(path)
    @icon = icon
  end

  # "/entries/2016-01-27/new-blog-start.amp.html"
  def amprelative
    "/#{baseurl}/#{name}.amp.html"
  end

  # "https://blog.jxck.io/entries/2016-01-27/new-blog-start.amp.html"
  def ampurl
    "https://#{host}/#{amprelative}"
  end

  def created_at
    dir.split("/")[3]
  end

  def updated_at
    File.mtime("#{dir}/#{name}.md").strftime("%Y-%m-%d")
  end

  def ampfile
    "#{dir}/#{name}.amp.html"
  end
end

# Podcast Episode の抽象
class Episode < Article
  attr_accessor :order, :prev, :next

  def initialize(path)
    super(path)
    @info = @text.match(/## Info(([\n\r]|.)*?)##/m)[1]
  end

  def article
    super
      .sub(/audio: (.*)/, "<audio preload=none src=#{audio} controls></audio>")
      .sub(/<ul>(.*?)<li>published_at:/m, '<ul class=info>\1<li>published_at:')
      .sub(/published_at: (.*)/, "published_at: <time datetime=#{datetime}>#{datetime}</time>")
  end

  def num
    @path.split('/')[3].to_i
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

  def file
    audio.sub("https://", "")
  end

  def datetime
    @info.match(/published_at: (.*)/)[1]
  end

  def pubDate
    Time.parse(datetime).rfc822
  end

  def summary()
    hsp unlink @text.sub(/#(.*?)## Theme/m, "# #{title}")
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

  def <=>(target)
    if num == target.num
      return sideshow? ? 1: -1
    end
    return num <=> target.num
  end
end

if __FILE__ == $0

  def blog(entry)
    meta_template = File.read(".template/meta.html.erb") + File.read(".template/ld-json.html.erb")
    blog_template = File.read(".template/blog.html.erb")
    amp_template = File.read(".template/amp.html.erb")

    style = [
      "./blog.jxck.io/assets/css/article.css",
      "./blog.jxck.io/assets/css/body.css",
      "./blog.jxck.io/assets/css/info.css",
      "./blog.jxck.io/assets/css/header.css",
      "./blog.jxck.io/assets/css/main.css",
      "./blog.jxck.io/assets/css/footer.css",
      "./blog.jxck.io/assets/css/pre.css",
      "./blog.jxck.io/assets/css/table.css",
    ].map { |css| File.read(css) }.join("\n")

    # blog
    markup = Markup.new()
    entry.build(markup)
    meta = ERB.new(meta_template).result(entry.instance_eval { binding }).strip
    html = ERB.new(blog_template).result(binding).strip
    File.write(entry.htmlfile, html)

    # amp
    amp = AMP.new()
    entry.build(amp)
    meta = ERB.new(meta_template).result(entry.instance_eval { binding }).strip
    html = ERB.new(amp_template).result(binding).strip
    File.write(entry.ampfile, html)
  end

  # blog feed
  def blogfeed(feed = false)
    puts "build blog"

    # entries
    dir = "./blog.jxck.io/entries/**/*"
    icon = "https://jxck.io/assets/img/jxck.png"
    entries = Dir.glob(dir)
      .select { |path| path.match(/.*.md\z/) }
      .map { |path| Entry.new(path, icon) }
      .sort
      .reverse

    if feed
      puts "build blog feed"
      xml = ERB.new(File.read(".template/atom.xml.erb")).result(binding)
      File.write("./blog.jxck.io/feeds/atom.xml", xml)
    end

    entries.each {|e|
      blog(e)
    }

    puts "build archive.page"
    archive = ERB.new(File.read(".template/archive.html.erb")).result(binding)
    File.write("./blog.jxck.io/index.html", archive)
  end

  def podcast(episode)
    icon = "https://podcast.jxck.io/assets/img/mozaic.png" # TODO: https://mozaic.fm/assets/img/mozaic.png
    meta_template = File.read(".template/meta.html.erb")
    podcast_template = File.read(".template/podcast.html.erb")

    # entry
    markup = Podcast.new()
    episode.build(markup)
    meta = ERB.new(meta_template).result(episode.instance_eval { binding }).strip
    html = ERB.new(podcast_template).result(binding).strip
    File.write(episode.htmlfile, html)
  end

  def podcastfeed(feed = false)
    puts "build podcast"
    dir = "./podcast.jxck.io/episodes/**/*"
    host = "podcast.jxck.io"

    # episodes
    episodes = Dir.glob(dir)
      .select {|path| path.match(/.*.md\z/) }
      .map {|path| Episode.new(path) }
      .sort
      .reverse
      .map.with_index {|ep, i|
        ep.order = i
        ep
      }

    if feed
      puts "build podcast feed"
      xml = ERB.new(File.read(".template/rss2.xml.erb")).result(binding)
      File.write("./podcast.jxck.io/feeds/feed.xml", xml)
    end

    episodes.each.with_index { |e, i|
      e.prev = episodes[i+1] if i < episodes.size
      e.next = episodes[i-1] if i > 0
      podcast(e)
    }

    puts "build index.html"
    archive = ERB.new(File.read(".template/podcast.index.html.erb")).result(binding)
    File.write("./podcast.jxck.io/index.html", archive)
  end

  # $ mark.rb blog feed
  if ARGV.include? "blog"
    blogfeed(ARGV.include? "feed")
  end

  # $ mark.rb podcast feed
  if ARGV.include? "podcast"
    podcastfeed(ARGV.include? "feed")
  end

  if ARGV.include? "full"
    blogfeed(true)
    podcastfeed(true)
  end

  if ARGV.first == "-t"
    # test
    icon = "https://jxck.io/assets/img/jxck.png"
    e = Entry.new("./blog.jxck.io/entries/2016-01-27/new-blog-start.md", icon)
    blog(e)
  end
end
