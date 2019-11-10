require_relative "../document/document.rb"

module Builder
  ## markdown を idtag でビルド
  class IdtagBuilder
    def initialize()
      @idtag_template = erb_template("template/page.idtag.erb")
      @html_template  = erb_template("template/page.html.erb")
    end

    ## 特定のパスのファイルをビルド
    def build(path)
      puts "build #{path}"
      page = Document::Page.new(path)
      build_html(page)
      build_idtag(page)
    end

    # html のビルド
    def build_html(page)
      page.build(MD2Indesign::Format::HTML.new(highlight: "mono"))
      html = @html_template.result(binding).strip
      File.write(page.target_path+".html", html)
    end

    # idtag のビルド
    def build_idtag(page)
      page.build(MD2Indesign::Format::Idtag.new(highlight: "mono"))
      idtag = @idtag_template.result(binding).strip
      File.write(page.target_path+".idtag", idtag)
    end
  end
end
