require_relative "../highlighter/mono_idtag.rb"

# tag ごとのビルダ
class Idtag
  attr_writer :url
  attr_accessor :baseurl
  def initialize(highlight: "none")
    @highlight = highlight
    @indent = "  "
  end


  def log(node)
    puts ">>>>>>>>>>>>>>>>>>"
    pp node
    puts "<<<<<<<<<<<<<<<<<<"
  end

  def root(node)
    node.value
  end
  def text(node)
    node.value == "\n" ? "" : hsc(node.value)
  end

  def smart_quote(node)
    {
      lsquo: "&lsquo;",
      rsquo: "&rsquo;",
      ldquo: "&ldquo;",
      rdquo: "&rdquo;",
    }[node.value]
  end
  def typographic_sym(node)
    {
      hellip: "&hellip;",
      mdash:  "&mdash;",
      ndash:  "&ndash;",
    }[node.value]
  end
  def entity(node)
    # &gt; &lt; etc
    node.options.original
  end


  # def raw(node)
  #   puts "raw"
  #   node.value
  # end


  ### block element
  def article(node)
    node.value
  end
  def section(node)
    node.value
  end

  # <ul> そのものは出力しない
  # 最初の ul の前には br
  def ul(node)
    if node.level == 1
      <<~EOS.chomp
      #{br}
      #{node.value}
      EOS
    else
      <<~EOS.chomp

      #{(node.value)}
      EOS
    end
  end
  # <ol> そのものは出力しない
  # 最初の ol の前には br
  def ol(node)
    if node.level == 1
      <<~EOS.chomp
      #{br}
      #{node.value}
      EOS
    else
      <<~EOS.chomp

      #{node.value}
      EOS
    end
  end

  def tabletag(node)
    node.value
  end
  def thead(node)
    node.value
  end
  def tbody(node)
    node.value
  end
  def tr(node)
    value = node.children.map{|child| child.value}.join("\t")
    type = node.children.first.type
    "<ParaStyle:#{type}>#{value}\n"
  end
  def th(node)
    node
  end
  def td(node)
    node
  end

  def dl(node)
    node.value
  end
  def div(node)
    node.value
  end
  def blockquote(node)
    <<~EOS
    <blockquote>
      #{indent(node.value)}
    </blockquote>
    EOS
  end

  def codeblock(node)
    lang = node.attr && node.attr["class"].sub("language-", "")
    code = code_format(node).split("\n").map{|line| "<ParaStyle:code-#{lang}>#{line}"}.join("\n")
    <<~EOS.chomp
      #{br}
      #{code}
    EOS
  end

  def code_format(arg)
    lang = arg.lang
    code = arg.code

    case @highlight
    when "mono"
      lexer = Rouge::Lexer.guess(filename: ".#{lang}")
      formatter = MonoIdtag.new
      formatted = formatter.format(lexer.new.lex(code))
      formatted
    when "none"
      code
    end
  end

  def table(node)
    tabletag(node)
  end

  def img(node)
    width, height = imgsize(node)

    # SVG should specify width-height
    if File.extname(URI.parse(node.attr["src"]).path) == ".svg"
      return %(<img loading=lazy src=#{node.attr['src']} alt="#{node.attr['alt']}" title="#{node.attr['title']}" width=#{width} height=#{height} intrinsicsize=#{width}x#{height}>)
    end

    # No width-height for normal img
    return <<~EOS
           <picture>
             <source type=image/webp srcset=#{node.attr['src'].sub(/(.png|.gif|.jpg)/, '.webp')}>
             <img loading=lazy src=#{node.attr['src']} alt="#{node.attr['alt']}" title="#{node.attr['title']}" intrinsicsize=#{width}x#{height}>
           </picture>
           EOS
  end

  ## そのまま
  def html_element(node)
    # attribute がある場合は結合
    attrs = node.attr&.map {|key, value|
      next key if value == ""
      %(#{key}="#{value}")
    }

    attr = attrs.nil? ? "" : " " + attrs.join(" ")

    # TODO: 改行が合わない
    "<#{node.tag}#{attr}>#{node.value}</#{node.tag}>\n"
  end



  ### inline elements
  def codespan(node)
    %(<CharStyle:code>#{hsc(node.value)}<CharStyle:>)
  end
  def strong(node)
    "<CharStyle:strong>#{node.value}<CharStyle:>"
  end
  def em(node)
    "<CharStyle:em>#{node.value}<CharStyle:>"
  end
  def dt(node)
    "<ParaStyle:dt>#{node.value}\n"
  end
  def dd(node)
    "<ParaStyle:dd>#{node.value}\n"
  end
  def br(node=nil)
    "<ParaStyle:br>"
  end
  def hr(_node)
    "<hr>\n"
  end

  def header(node)
    level = node.options.level
    if level == 1
      # h1 の中身はタイトル
      @title = node.value
    end
    %(<ParaStyle:h#{level}>#{node.value}\n)
  end

  def p(node)
    "<ParaStyle:p>#{node.value}\n"
  end


  # <li> だが、親要素がないため、親のレベルに応じて
  # <ulN>, <olN> を出す
  def li(node)
    level = node.parent.level
    type  = node.parent.type
    if node.close
      "<#{type}#{level}>#{node.value}"
    else
      "<#{type}#{level}>#{node.value}\n"
    end
  end

  def a(node)
    %(<a href="#{node.attr['href']}">#{node.value}</a>)
    # TODO: rel="noopener noreferrer"
  end



  private

  def imgsize(node)
    width = ""
    height = ""

    size = node.attr["src"].split("#")[1]
    if size
      size = size.split("x")
      if size.size == 1
        width = size[0]
      elsif size.size == 2
        width = size[0]
        height = size[1]
      end
    end
    return width, height
  end
end
