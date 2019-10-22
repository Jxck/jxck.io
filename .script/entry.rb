require_relative "article.rb"

# Blog Entry の抽象
class Entry < Article
  attr_accessor :icon # TODO: いる？

  def initialize(path, icon = "")
    super(path)
    @icon = icon
  end

  # "./new-blog-start.amp.html"
  def amprelative
    "./#{name}.amp.html"
  end

  # "/entries/2016-01-27/new-blog-start.amp.html"
  def amppath
    "/#{baseurl}/#{name}.amp.html"
  end

  # "https://blog.jxck.io/entries/2016-01-27/new-blog-start.amp.html"
  def ampurl
    "https://#{host}#{amppath}"
  end

  def created_at
    dir.split("/")[3]
  end

  def updated_at
    File.mtime("#{dir}/#{name}.md").strftime("%Y-%m-%d")
  end

  def ampfile
    "#{dir}/#{name}.amp.html"
  end
end
