module Format
  # Blog 用に拡張した HTML
  class BlogHTML < HTML
    attr_writer :url
    def initialize(highlight: "none")
      super
      @css = {
        PRE:   "/assets/css/pre.css",
        TABLE: "/assets/css/table.css",
      }
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

    def table(node)
      value = super(node)

      # CSS を一度だけ挿入
      if @css.TABLE
        value = style(@css.TABLE) + "\n" + value
        @css.TABLE = nil # 一度読み込んだら消す
      end
      value
    end

    def codeblock(node)
      value = super(node)

      # CSS を一度だけ挿入
      if @css.PRE
        value = style(@css.PRE) + "\n" + value
        @css.PRE = nil # 一度読み込んだら消す
      end
      value
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

  # AMP 用に拡張した HTML
  class AmpHTML < BlogHTML
    def initialize(highlight: "none")
      super
      @css = {}
    end

    def root(node)
      indent(node.value.to_s)
    end

    def a(node)
      if node.attr["href"].match(%r{^chrome:\/\/})
        # amp page ignores `chrome://` url
        return node.attr["href"]
      end
      super(node)
    end

    def img(node)
      width, height = imgsize(node)

      # AMP should specify width-height
      if width == "" || height == ""
        STDERR.puts("no width x height for img")
        exit(1)
      end
      %(<amp-img layout=responsive src=#{node.attr['src']} alt="#{node.attr['alt']}" title="#{node.attr['title']}" width=#{width} height=#{height}>)
    end

    def html_element(node)
      value = super(node)
      if value.match(/<iframe.*/)
        value.gsub!(/iframe/, "amp-iframe")
        value.gsub!(/ loading="lazy"/, "")
      end
      value
    end
  end
end
