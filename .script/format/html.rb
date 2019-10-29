module Format
  # tag ごとのビルダ
  class HTML
    attr_writer :url
    attr_accessor :baseurl
    def initialize(highlight: "none")
      @highlight = highlight
      @indent = "  "
      @css = {
        PRE:   "/assets/css/pre.css",
        TABLE: "/assets/css/table.css",
      }
    end

    def root(node)
      indent(node.value.to_s, 4)
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
      <<~EOS
      <article>
        #{indent(node.value)}
      </article>
      EOS
    end
    def section(node)
      <<~EOS
      <section>
        #{indent(node.value)}
      </section>
      EOS
    end
    def ul(node)
      <<~EOS
      <ul>
        #{indent(node.value)}
      </ul>
      EOS
    end
    def ol(node)
      <<~EOS
      <ol>
        #{indent(node.value)}
      </ol>
      EOS
    end
    def tabletag(node)
      <<~EOS
      <table>
        #{indent(node.value)}
      </table>
      EOS
    end
    def thead(node)
      <<~EOS
      <thead>
        #{indent(node.value)}
      </thead>
      EOS
    end
    def tbody(node)
      <<~EOS
      <tbody>
        #{indent(node.value)}
      </tbody>
      EOS
    end
    def tr(node)
      <<~EOS
      <tr>
        #{indent(node.value)}
      </tr>
      EOS
    end
    def dl(node)
      <<~EOS
      <dl>
        #{indent(node.value)}
      </dl>
      EOS
    end
    def div(node)
      <<~EOS
      <div>
        #{indent(node.value)}
      </div>
      EOS
    end
    def blockquote(node)
      <<~EOS
      <blockquote>
        #{indent(node.value)}
      </blockquote>
      EOS
    end

    def codeblock(node)
      value = pre(node)

      if @css.PRE
        value = style(@css.PRE) + "\n" + value
        @css.PRE = nil # 一度読み込んだら消す
      end
      value
    end

    def table(node)
      value = tabletag(node)

      if @css.TABLE
        value = style(@css.TABLE) + "\n" + value
        @css.TABLE = nil # 一度読み込んだら消す
      end
      value
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
      attrs = node.attr&.map {|key, value|
        next key if value == ""
        %(#{key}="#{value}")
      }

      attr = attrs.nil? ? "" : " " + attrs.join(" ")
      "<#{node.tag}#{attr}>#{node.value}</#{node.tag}>\n"
    end



    ### inline elements
    def codespan(node)
      %(<code translate="no">#{hsc(node.value)}</code>)
    end
    def strong(node)
      "<strong>#{node.value}</strong>"
    end
    def em(node)
      "<em>#{node.value}</em>"
    end
    def th(node)
      "<th class=align-#{node.alignment}>#{node.value}</th>\n"
    end
    def td(node)
      "<td class=align-#{node.alignment}>#{node.value}</td>\n"
    end
    def dt(node)
      "<dt>#{node.value}\n"
    end
    def dd(node)
      "<dd>#{node.value}\n"
    end
    def br(_node)
      "<br>\n"
    end
    def hr(_node)
      "<hr>\n"
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
      lang = node.lang
      %(<pre#{lang ? %( class=#{lang}) : ''}><code translate="no">#{node.value}</code></pre>\n)
    end

    def code_format(arg)
      lang = arg.lang
      code = arg.code

      case @highlight
      when "mono"
        lexer = Rouge::Lexer.guess(filename: ".#{lang}")
        formatter = Highlighter::MonoHTML.new
        formatted = formatter.format(lexer.new.lex(code))
        formatted
      when "color"

      when "none"
        hsc(code)
      end
    end

    def p(node)
      if node.close
        <<~EOS
        <p>
          #{indent(node.value)}
        </p>
        EOS
      else
        "<p>#{node.value}\n"
      end
    end

    def li(node)
      if node.close
        <<~EOS
        <li>
          #{indent(node.value)}
        </li>
        EOS
      else
        "<li>#{node.value}\n"
      end
    end

    def a(node)
      %(<a href="#{node.attr['href']}">#{node.value}</a>)
      # TODO: rel="noopener noreferrer"
    end



    private

    def style(href)
      "<link rel=stylesheet property=stylesheet type=text/css href=#{href}>"
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
  end
end
