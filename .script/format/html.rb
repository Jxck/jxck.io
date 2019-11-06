require "./.script/helper/erb_helper.rb"

module Format
  # tag ごとのビルダ
  class HTML
    include ERBHelper
    def initialize(highlight: "none")
      @highlight = highlight
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

    def header(node)
      level = node.options.level
      "<h#{level}>#{node.value}</a></h#{level}>\n"
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

    def codeblock(node)
      lang = node.lang
      %(<pre#{lang ? %( class=#{lang}) : ''}><code translate="no">#{node.value}</code></pre>\n)
    end

    def codespan(node)
      %(<code translate="no">#{hsc(node.value)}</code>)
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
        # TODO
        hsc(code)
      when "none"
        hsc(code)
      end
    end

    ## そのまま出力
    def html_element(node)
      attrs = node.attr&.map {|key, value|
        next key if value == ""
        %(#{key}="#{value}")
      }

      attr = attrs.nil? ? "" : " " + attrs.join(" ")
      "<#{node.tag}#{attr}>#{node.value}</#{node.tag}>\n"
    end


    ### table
    def table(node)
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
    def th(node)
      "<th class=align-#{node.alignment}>#{node.value}</th>\n"
    end
    def td(node)
      "<td class=align-#{node.alignment}>#{node.value}</td>\n"
    end

    ### dl
    def dl(node)
      <<~EOS
      <dl>
        #{indent(node.value)}
      </dl>
      EOS
    end
    def dt(node)
      "<dt>#{node.value}\n"
    end
    def dd(node)
      "<dd>#{node.value}\n"
    end

    ### block elements
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

    ### inline elements
    def strong(node)
      "<strong>#{node.value}</strong>"
    end
    def em(node)
      "<em>#{node.value}</em>"
    end
    def br(_node)
      "<br>\n"
    end
    def hr(_node)
      "<hr>\n"
    end
    def a(node)
      %(<a href="#{node.attr['href']}">#{node.value}</a>)
    end
    def img(node)
      %(<img src=#{node.attr['src']} alt="#{node.attr['alt']}" title="#{node.attr['title']}">)
    end
  end
end
