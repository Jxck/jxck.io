module Format
  # AMP 用に拡張した HTML
  class AMP < HTML
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
