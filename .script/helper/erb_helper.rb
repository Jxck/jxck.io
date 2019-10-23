module ErbHelper
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

  # trim to 140 word for html meta description
  def short(str)
    limit = 140
    str.gsub(/(\n|\r)/, "")
      .strip[0...(limit-3)]
      .concat("...")
  end

  def render(path, arg)
    # arg をコンテキストとして ERB の部分テンプレートを読む
    erb_template(path).result(arg.instance_eval{binding}).strip
  end

  def erb_template(path)
    abs_path = File.expand_path("../"+path, __dir__)
    template = File.read(abs_path)
    ERB.new(template, nil, '-')
  end
end
