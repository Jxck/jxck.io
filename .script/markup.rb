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
  def div(node)
    "<div>#{wrap(node.value)}</div>\n"
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
        width = size[0]
      elsif size.size == 2
        width = size[0]
        height = size[1]
      end
    end
    return width, height
  end
  protected :imgsize

  def img(node)
    width, height = imgsize(node)

    # SVG should specify width-height
    if File.extname(URI.parse(node.attr["src"]).path) == ".svg"
      return %(<img loading=lazy src=#{node.attr['src']} alt="#{node.attr['alt']}" title="#{node.attr['title']}" width=#{width} height=#{height} intrinsicsize=#{width}x#{height}>)
    end

    # No width-height for normal img
    return <<-EOS

  <picture>
    <source type=image/webp srcset=#{node.attr['src'].sub(/(.png|.gif|.jpg)/, '.webp')}>
    <img loading=lazy src=#{node.attr['src']} alt="#{node.attr['alt']}" title="#{node.attr['title']}" intrinsicsize=#{width}x#{height}>
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
