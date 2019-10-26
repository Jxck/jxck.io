class Page < Article
  def initialize(path)
    super(path)
  end

  def title
    hsc @text.match(/^# (.*)/)[1]
  end

  def target_path
    "#{dir}/#{name}"
  end
end
