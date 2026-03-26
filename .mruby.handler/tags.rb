Proc.new do |env|
  path = env["PATH_INFO"]
  if path == "/index.html"
    next [308, {"Location" => "/tags"}, []]
  end
  matched = path.match(/\/(.+)\.html$/)
  if matched
    tag = matched[1]
    next [308, {"Location" => "/tags##{tag}"}, []]
  end
  [399, {}, []]
end
