module ERBHelper
  require 'digest'
  require 'base64'
  include ERB::Util

  # indent with depth
  # remove empty line indent
  def indent(str, depth=2)
    space = " "*depth
    str.split("\n").join("\n#{space}").gsub(/^ *$/, "")
  end

  # escape html special chars
  def hsc(str)
    str.gsub(/&/, "&amp;")
      .gsub(/</, "&lt;")
      .gsub(/>/, "&gt;")
      .gsub(/"/, "&quot;")
      .gsub(/'/, "&#039;")
  end

  def jsonescape(str)
    # markdown 用に | を escape した backslash を消す
    str.gsub(/\\/, "")
  end

  # trim to 140 word for html meta description
  def short(str)
    limit = 140
    str = str.gsub(/(\n|\r)/, "")
    return str if str.size <= limit
    str.strip[0...(limit-3)]
      .concat("...")
  end

  # subresource integrity with sha256
  def integrity(path)
    "sha256-#{Base64.encode64(Digest::SHA256.digest(File.read(path))).chomp}"
  end

  def render(path, arg)
    # arg をコンテキストとして ERB の部分テンプレートを読む
    erb_template(path).result(arg.instance_eval{binding}).strip
  end

  def render_hash(path, hash)
    # arg をコンテキストとして ERB の部分テンプレートを読む
    erb_template(path).result(OpenStruct.new(hash).instance_eval{binding}).strip
  end

  def erb_template(path)
    abs_path = File.expand_path("../"+path, __dir__)
    template = File.read(abs_path)
    ERB.new(template, nil, '-')
  end

  def cache_busting(path)
    f = File.open(path)
    q = f.mtime.strftime("%y%m%d_%H%M%S")
    return q
  end

  def src(path)
    abs_path = File.expand_path("../../www.jxck.io"+path, __dir__)
    q = cache_busting(abs_path)
    "src=#{path}?#{q}"
  end

  def href(path)
    abs_path = File.expand_path("../../www.jxck.io"+path, __dir__)
    q = cache_busting(abs_path)
    "href=#{path}?#{q}"
  end
end
