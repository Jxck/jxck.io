require_relative "../file/page.rb"
require_relative "../format/idtag.rb"

## markdown を idtag でビルド
class IdtagBuilder
  def initialize()
    @idtag_template = erb_template("template/page.idtag.erb")
    @html_template  = erb_template("template/page.html.erb")
  end

  ## 特定のパスのファイルをビルド
  def build(path)
    puts "build #{path}"
    page = Page.new(path)
    build_html(page)
    build_idtag(page)
  end

  # html のビルド
  def build_html(page)
    page.build(HTML.new)
    html = @html_template.result(binding).strip
    File.write(page.target_path+".html", html)
  end

  # idtag のビルド
  def build_idtag(page)
    page.build(Idtag.new)
    idtag = @idtag_template.result(binding).strip
    File.write(page.target_path+".idtag", idtag)
  end
end
