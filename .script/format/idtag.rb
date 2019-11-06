require "./.script/helper/erb_helper.rb"

module Format
  # tag ごとのビルダ
  class Idtag
    include ERBHelper
    def initialize(highlight: "none")
      @highlight = highlight
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

    def header(node)
      level = node.options.level
      if level == 1
        # h1 の中身はタイトル
        @title = node.value
      end
      %(<ParaStyle:h#{level}>#{node.value}\n)
    end

    def p(node)
      if node.parent&.type == :blockquote
        "<ParaStyle:blockquote>#{node.value}\n"
      else
        "<ParaStyle:p>#{node.value}\n"
      end
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

    def codeblock(node)
      lang = node.attr && node.attr["class"].sub("language-", "")
      code = code_format(node).split("\n").map{|line| "<ParaStyle:code-#{lang}>#{line}"}.join("\n")
      <<~EOS.chomp
      #{br}
      #{code}
      EOS
    end

    def codespan(node)
      %(<CharStyle:code>#{hsc(node.value)}<CharStyle:>)
    end

    def code_format(arg)
      lang = arg.lang
      code = arg.code

      case @highlight
      when "mono"
        lexer = Rouge::Lexer.guess(filename: ".#{lang}")
        formatter = Highlighter::MonoIdtag.new
        formatted = formatter.format(lexer.new.lex(code))
        formatted
      when "none"
        code
      end
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

    ### table
    def table(node)
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

    ### dl
    def dl(node)
      node.value
    end
    def dt(node)
      "<ParaStyle:dt>#{node.value}\n"
    end
    def dd(node)
      "<ParaStyle:dd>#{node.value}\n"
    end

    ### block elements
    def article(node)
      node.value
    end
    def section(node)
      node.value
    end
    def div(node)
      node.value
    end
    def blockquote(node)
      node.value
    end

    ### inline elements
    def strong(node)
      "<CharStyle:strong>#{node.value}<CharStyle:>"
    end
    def em(node)
      "<CharStyle:em>#{node.value}<CharStyle:>"
    end
    def br(node=nil)
      "<ParaStyle:br>"
    end
    def hr(node=nil)
      "<ParaStyle:hr>\n"
    end
    def a(node)
      # TODO: どする?
      %(<a href="#{node.attr['href']}">#{node.value}</a>)
    end
    def img(node)
      # TODO: どする?
      %(<img src=#{node.attr['src']} alt="#{node.attr['alt']}" title="#{node.attr['title']}">)
    end
  end
end
