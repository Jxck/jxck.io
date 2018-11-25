#!/usr/bin/env ruby

require "pp"
require "uri"
require "erb"
require "json"
require "time"
require "pathname"
require "kramdown"

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
     .gsub(/'/, '&#039;')
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

# tag ごとのビルダ
class Markup
  attr_writer :url
  attr_accessor :baseurl
  def initialize
    @indent = "  "
    @css = {
      PRE:   "/assets/css/pre.css",
      TABLE: "/assets/css/table.css",
    }
  end
  def wrap(value)
    # increase indent
    "\n#{value.split("\n").map{|e| @indent + e}.join("\n")}\n"
  end
  def style(href)
    "<link rel=stylesheet property=stylesheet type=text/css href=#{href}>"
  end
  def raw(node)
    node.value
  end
  def root(node)
    wrap(node.value.to_s)
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
      id = node.attr["id"]
      return %(<h#{level} id="#{id}"><a href="##{id}">#{node.value}</a></h#{level}>\n)
    end
  end

  def pre(node)
    lang = node.attr && node.attr["class"].sub("language-", "")
    "<pre#{lang ? %( class=#{lang}) : ''}><code translate=\"no\">#{node.value}</code></pre>\n"
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
    "<table>#{wrap(node.value)}</table>\n"
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
    if node.close
      "<p>#{node.value}</p>\n"
    else
      "<p>#{node.value}\n"
    end
  end

  # inline elements
  def codespan(node)
    "<code translate=\"no\">#{hsc(node.value)}</code>"
  end
  def blockquote(node)
    "<blockquote>#{wrap(node.value)}</blockquote>\n"
  end
  def smart_quote(node)
    {
      lsquo: "&lsquo;",
      rsquo: "&rsquo;",
      ldquo: "&ldquo;",
      rdquo: "&rdquo;",
    }[node.value]
  end
  def li(node)
    if node.close
      "<li>#{wrap(node.value)}</li>\n"
    else
      "<li>#{node.value}\n"
    end
  end
  def strong(node)
    "<strong>#{node.value}</strong>"
  end
  def em(node)
    "<em>#{node.value}</em>"
  end
  def text(node)
    node.value == "\n" ? "" : hsc(node.value)
  end
  def br(_node)
    "<br>\n"
  end
  def hr(_node)
    "<hr>\n"
  end
  def entity(node)
    node.options.original
  end
  def typographic_sym(node)
    {
      hellip: "&hellip;",
      mdash:  "&mdash;",
      ndash:  "&ndash;",
    }[node.value]
  end
  def a(node)
    %(<a href="#{node.attr['href']}">#{node.value}</a>)
    # TODO: rel="noopener noreferrer"
  end

  def imgsize(node)
    width = ""
    height = ""

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
      return %(<img lazyload src=#{node.attr['src']} alt="#{node.attr['alt']}" title="#{node.attr['title']}" #{width} #{height}>)
    end

    # No width-height for normal img
    return <<-EOS

  <picture>
    <source type=image/webp srcset=#{node.attr['src'].sub(/(.png|.gif|.jpg)/, '.webp')}>
    <img lazyload src=#{node.attr['src']} alt="#{node.attr['alt']}" title="#{node.attr['title']}">
  </picture>
EOS
  end

  def html_element(node)
    attrs = node.attr&.map {|key, value|
      next key if value == ""
      %(#{key}="#{value}")
    }

    attr = attrs.nil? ? "" : " " + attrs.join(" ")
    "<#{node.tag}#{attr}>#{node.value}</#{node.tag}>\n"
  end
end

# AMP 用に拡張した Markup
class AMP < Markup
  def a(node)
    if node.attr["href"].match(%r{^chrome:\/\/})
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
    %(<amp-img layout=responsive src=#{node.attr['src']} alt="#{node.attr['alt']}" title="#{node.attr['title']}" #{width} #{height}>)
  end
  def html_element(node)
    value = super(node)
    if value.match(/<iframe.*/)
      value.gsub!(/iframe/, 'amp-iframe sandbox="allow-scripts allow-same-origin allow-presentation" layout="responsive"')
      value.gsub!(/ lazyload/, '')
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
      return %(<h#{level}><a href=#{@url}>#{@title}</a></h#{level}>\n)
    else
      # h2 以降はそのまま
      return %(<h#{level}>#{node.value}</h#{level}>\n)
    end
  end
end

# markup をセットして生成したら
# ast を渡すと traverse しながらビルドしてくれる
class Traverser
  attr_reader :codes

  def initialize(markup)
    @codes = []
    @markup = markup
  end

  def traverse(ast)
    enter(ast)
    ast.children = ast.children&.map { |child|
      traverse(child)
    }
    leave(ast)
  end

  def enter(node)
    # 降りて行きながら、親子関係によって前処理を行う
    # puts "[##{__LINE__}] enter: #{node.type}"

    if node.type == :html_element
      # html element は value にタグ名が入ってる
      # 子要素の連結結果を value に入れられるように
      # :tag に移しておく
      node.tag = node.value
      node.value = ''
    end

    if node.type == :blockquote
      # 小要素が 1 つの <p> で行を <br> にして入っている
      p = node.children[0]

      # <br> を複数の <p> に分けつつ余計な改行を消す
      children = p.children.reduce([{type: :p, children: []}]) {|acc, e|
        if e.type === :text and e.value.start_with?("\n")
          e.value.gsub!("\n", "")
        end

        if e.type === :br
          acc << {type: :p, children: []}
        else
          acc.last.children << e
        end
        acc
      }

      node.children = children
    end

    if node.type == :li
      # li の子には p が入るのでこれを除く
      first = node.children.shift
      if first.type == :p
        first.children.reverse.each{|child|
          node.children.unshift child
        }
      end

      # 基本は li を閉じる
      node.close = true
      if node.children.size == 1 and node.children.first.type == :text
        # もし li の子が :text 1 つだけなら閉じない
        node.close = false
      end
    end

    if node.type == :p and node.children
      first = node.children.first
      if first.type == :img
        node.close = true
      end
    end
  end

  def leave(node)
    # puts "[##{__LINE__}] leave: #{node.type} #{node.value}"

    if node.type == :codeblock
      # コードを抜き取り、ここで id に置き換える
      code = node.value
      if code == ""
        # code が書かれてなかったらファイルから読む
        # ```js:main.js
        node.attr["class"], node.path = node.attr["class"].split(":")
        path = "./blog.jxck.io/#{@markup.baseurl}/#{node.path}"
        code = File.read(path)
      end

      # インデントを無視するため、全部組み上がったら後で差し込む。
      @codes.push(code.chomp)

      # あとで差し変えるため id として番号を入れておく
      node.value = "// #{@codes.length}"
    end

    if node.children
      node.value = node.children.join
    end
    up = @markup.send(node.type, node)
    up
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

    table.children = table.children.map {|node|
      node.children.map {|tr|
        tr.children.map.with_index {|td, i|
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
      type: level == 1 ? :article : :section,
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
      break if child.nil?

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
          unless section.children.empty?
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
    dir.split("/")[2..4].join("/").to_s
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
    hsc @text.match(/^# \[.*\] (.*)/)[1]
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
    markup.baseurl = baseurl

    # parse ast
    ast = AST.new(no_tag)
    # DEBUG: pp ast.ast

    # traverse
    traverser = Traverser.new(markup)
    article = traverser.traverse(ast.ast)

    # indent を無視するため
    # ここで pre に code を戻す
    # ついでにエスケープ
    traverser.codes.each.with_index {|code, i|
      article.sub!("// #{i + 1}") { hsc(code) }
    }

    @article = article
  end

  def htmlfile
    "#{dir}/#{name}.html"
  end

  def to_s
    path
  end

  def <=>(other)
    return path <=> other.path
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
    "https://#{host}#{amprelative}"
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
    @info.scan(/guest: (.*)/) || []
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
    hsc unlink @text.sub(/#(.*?)## Theme/m, "# #{title}")
  end

  def theme_html()
    # build markdown to html
    html = to_html(theme)

    # fixup indent
    oneline(html).gsub("</p><p>", "</p>\n      <p>")
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

if __FILE__ == $PROGRAM_NAME

  def blog(entry)
    meta_template = File.read(".template/meta.html.erb") + File.read(".template/ld-json.html.erb")
    blog_template = File.read(".template/blog.html.erb")
    amp_template = File.read(".template/amp.html.erb")

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
    ].map { |css| File.read(css) }.join("\n")

    # blog
    markup = Markup.new
    entry.build(markup)
    meta = ERB.new(meta_template).result(entry.instance_eval { binding }).strip
    html = ERB.new(blog_template).result(binding).strip
    File.write(entry.htmlfile, html)

    # amp
    amp = AMP.new
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
      puts "build blog feed & sitemap"
      xml = ERB.new(File.read(".template/atom.xml.erb")).result(binding)
      File.write("./blog.jxck.io/feeds/atom.xml", xml)

      xml = ERB.new(File.read(".template/sitemap.xml.erb")).result(binding)
      File.write("./blog.jxck.io/feeds/sitemap.xml", xml)
    end

    entries.each {|e|
      blog(e)
    }

    puts "build archive page"
    archive = ERB.new(File.read(".template/archive.html.erb")).result(binding)
    File.write("./blog.jxck.io/index.html", archive)

    puts "build tags page"
    tags = entries.map {|entry|
      entry.tags.reduce({}) {|acc, tag|
        acc.merge({tag => [entry]})
      }
    }.reduce {|acc, entry|
      acc.merge(entry) { |_key, old, new| new + old }
    }

    tag = "Tags"
    tags_template = File.read(".template/tags.html.erb")
    template = ERB.new(tags_template).result(binding).strip
    html = ERB.new(template).result(binding)
    File.write("./blog.jxck.io/tags/index.html", html)

    tags.each {|tag, v|
      tags = { tag => v }
      tags_template = File.read(".template/tags.html.erb")
      template = ERB.new(tags_template).result(binding).strip
      html = ERB.new(template).result(binding)
      File.write("./blog.jxck.io/tags/#{tag}.html", html)
    }
  end

  def podcast(episode)
    icon = "https://mozaic.fm/assets/img/mozaic.png"
    meta_template = File.read(".template/meta.html.erb")
    podcast_template = File.read(".template/podcast.html.erb")

    # entry
    markup = Podcast.new
    episode.build(markup)
    meta = ERB.new(meta_template).result(episode.instance_eval { binding }).strip
    html = ERB.new(podcast_template).result(binding).strip
    File.write(episode.htmlfile, html)
  end

  def podcastfeed(feed = false)
    puts "build podcast"
    dir = "./mozaic.fm/episodes/**/*"
    host = "mozaic.fm"

    # episodes
    episodes = Dir.glob(dir)
                  .select { |path| path.match(/.*.md\z/) }
                  .map { |path| Episode.new(path) }
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
    end

    episodes.each.with_index {|e, i|
      e.prev = episodes[i+1] if i < episodes.size
      e.next = episodes[i-1] if i > 0
      podcast(e)
    }

    puts "build index.html"
    archive = ERB.new(File.read(".template/podcast.index.html.erb")).result(binding)
    File.write("./mozaic.fm/index.html", archive)
  end

  # $ mark.rb blog feed
  if ARGV.include? "blog"
    blogfeed(ARGV.include?("feed"))
  end

  # $ mark.rb podcast feed
  if ARGV.include? "podcast"
    podcastfeed(ARGV.include?("feed"))
  end

  if ARGV.include? "full"
    blogfeed(true)
    podcastfeed(true)
  end

  if ARGV.first == "-t"
    # test
    icon = "https://jxck.io/assets/img/jxck.png"
    entry = Entry.new("./test/test-blog.md", icon)
    meta_template = File.read(".template/meta.html.erb") + File.read(".template/ld-json.html.erb")
    blog_template = File.read(".template/blog.html.erb")

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
    ].map { |css| File.read(css) }.join("\n")

    # blog
    markup = Markup.new
    entry.build(markup)
    meta = ERB.new(meta_template).result(entry.instance_eval { binding }).strip
    html = ERB.new(blog_template).result(binding).strip
    File.write(entry.htmlfile, html)

    # blog(entry)
  end

  if ARGV.first == "-tp"
    # test podcast
    entry = Episode.new("./mozaic.fm/episodes/1/webcomponents.md")
    # podcast(entry)
  end
end
