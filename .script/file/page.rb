class Page < Article
  def initialize(path)
    super(path)
  end

  def title
    hsc @text.match(/^# (.*)/)[1]
  end

  def idfile
    "#{dir}/#{name}.idtag"
  end
end
