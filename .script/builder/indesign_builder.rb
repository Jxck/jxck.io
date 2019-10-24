require_relative "../file/page.rb"
require_relative "../format/indesign.rb"

## markdown を indesign でビルド
class IndesignBuilder
  def initialize()
    @indesign_template = erb_template("template/indesign.txt.erb")
  end

  ## 特定のパスのファイルをビルド
  def build(path)
    puts "build #{path}"
    page = Page.new(path)
    build_indesign(page)
  end

  # indesign のビルド
  def build_indesign(page)
    page.build(Indesign.new)
    indesign = @indesign_template.result(binding).strip
    p indesign
    File.write(page.htmlfile, indesign)
  end
end
