# File に関する情報の抽象
class Article
  attr_reader :path, :article

  def initialize(path)
    @path = path
    @text = File.read(path)
  end

  # "./blog.jxck.io/entries/2016-01-27"
  def dir
    File.dirname(@path)
  end

  # "new-blog-start"
  def name
    File.basename(@path, ".*")
  end

  # "blog.jxck.io"
  def host
    dir.split("/")[1]
  end

  # "entries/2016-01-27"
  def baseurl
    dir.split("/")[2..4].join("/").to_s
  end

  # "entries/2016-01-27/new-blog-start.html"
  def relative
    "#{baseurl}/#{name}.html"
  end

  # "/entries/2016-01-27/new-blog-start.html"
  def url
    "/#{baseurl}/#{name}.html"
  end

  # "https://blog.jxck.io/entries/2016-01-27/new-blog-start.html"
  def canonical
    "https://#{host}#{url}"
  end

  def title
    hsc @text.match(/^# \[.*\] (.*)/)[1]
  end

  def tags
    @text.split("\n")[0].scan(/\[(.+?)\]/).flatten
  end

  # tag を本文から消す
  def no_tag
    @text.sub(" [" + tags.join("][") + "]", "")
  end

  def joined_tag
    joined = tags.map{|tag|
      %(<a href="/tags/#{tag.gsub(' ', '%20')}.html">#{tag}</a>)
    }.join("<i>,</i>")
    "[#{joined}]"
  end

  def theme
    @text.match(/## (Intro|Theme)(([\n\r]|.)*?)##/m)[2]
  end

  def description
    unlink theme
  end

  def build(markup) # Markup/AMP
    # setting self url
    markup.url = url
    markup.baseurl = baseurl

    # parse ast
    ast = AST.new(no_tag)
    # DEBUG: pp ast.ast

    # traverse
    traverser = Traverser.new(markup)
    article   = traverser.traverse(ast.ast)

    # indent を無視するため
    # ここで pre に code を戻す
    # ついでにエスケープ
    traverser.codes.each {|key, value|
      # hash に差し替えられているところを置き換える
      article.gsub!("// #{key}") { hsc(value) }
    }

    @article = article
  end

  def htmlfile
    "#{dir}/#{name}.html"
  end

  def to_s
    path
  end

  def <=>(other)
    return path <=> other.path
  end

  protected
  # remove markdown link
  def unlink(str)
    str.gsub(/\[(.*?)\]\(.*?\)/, '\1').gsub(/<(http.*?)>/, '\1')
  end
end
