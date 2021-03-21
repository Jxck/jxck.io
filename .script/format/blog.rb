module Format
  # Blog 用に拡張した HTML
  class BlogHTML < MD2Indesign::Format::HTML
    attr_writer :url
    attr_reader :toc
    def initialize(highlight: "none")
      super
      @css = {
        PRE:   "/assets/css/pre.css",
        TABLE: "/assets/css/table.css",
      }
      @toc = []
    end

    def header(node)
      level = node[:options][:level]
      if level == 1
        # h1 の中身はタイトル
        @title = node[:value]
        # h1 だけは self url にリンク
        return %(<h#{level}><a href=#{@url}>#{@title}</a></h#{level}>\n)
      else
        # h2 以降は id を振る
        id = node[:attr]["id"]
        value = node[:value]
        @toc.push({level: level, id: id, value: value})
        return %(<h#{level} id="#{id}"><a href="##{id}">#{value}</a></h#{level}>\n)
      end
    end

    def img(node)
      src   = node[:attr]["src"]
      alt   = node[:attr]["alt"]
      title = node[:attr]["title"]
      uri   = URI.parse(src)

      width, height = imgsize(uri.fragment)

      # SVG should specify width-height
      if File.extname(uri.path) == ".svg"
        return %(<img loading=lazy decoding=async src=#{src} alt="#{alt}" title="#{title}" width=#{width} height=#{height}>)
      end

      # No width-height for normal img
      return <<~EOS
           <picture>
             <source type=image/webp srcset=#{src.sub(/(.png|.gif|.jpg)/, '.webp')}>
             <img loading=lazy decoding=async src=#{src} alt="#{alt}" title="#{title}">
           </picture>
      EOS
    end

    def table(node)
      value = super(node)

      # CSS を一度だけ挿入
      if @css[:TABLE]
        value = style(@css[:TABLE]) + "\n" + value
        @css[:TABLE] = nil # 一度読み込んだら消す
      end
      value
    end

    def codeblock(node)
      value = super(node)

      # CSS を一度だけ挿入
      if @css[:PRE]
        value = style(@css[:PRE]) + "\n" + value
        @css[:PRE] = nil # 一度読み込んだら消す
      end
      value
    end

    private

    def style(path)
      "<link rel=stylesheet property=stylesheet type=text/css #{href(path)}>"
    end

    def imgsize(fragment)
      width = ""
      height = ""

      if fragment
        w, h = fragment.split("x")
        width  = w unless w.nil?
        height = h unless h.nil?
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
      indent(node[:value].to_s)
    end

    def a(node)
      if node[:attr]["href"].match(%r{^chrome:\/\/})
        # amp page ignores `chrome://` url
        return node[:attr]["href"]
      end
      super(node)
    end

    def img(node)
      src   = node[:attr]["src"]
      alt   = node[:attr]["alt"]
      title = node[:attr]["title"]
      uri   = URI.parse(src)

      width, height = imgsize(uri.fragment)


      # AMP should specify width-height
      if width == "" || height == ""
        STDERR.puts("no width x height for img")
        exit(1)
      end
      %(<amp-img layout=responsive src=#{src} alt="#{alt}" title="#{title}" width=#{width} height=#{height}>)
    end

    def html_element(node)
      value = super(node)
      if value.match(/<iframe.*/)
        value.gsub!(/iframe/, "amp-iframe")
        value.gsub!(/ loading="lazy"/, "")
        value.gsub!(/frameborder="0" allow/, 'frameborder="0" sandbox="allow-scripts allow-same-origin allow-presentation" allow') # youtube の仕様が変わり、 sandbox から allow になったため追加
      end
      value
    end
  end
end
