class Podcast < Markup
  def header(node)
    level = node.options.level
    if level == 1
      # h1 の中身はタイトル
      @title = node.value
      # h1 だけは self url にリンク
      return %(<h#{level}><a href=#{@url}>#{@title}</a></h#{level}>\n)
    else
      # h2 以降はそのまま
      return %(<h#{level}>#{node.value}</h#{level}>\n)
    end
  end
end
