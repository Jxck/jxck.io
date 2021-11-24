Proc.new do |env|
  # env["rack.errors"].p()
  # logger = env["rack.errors"]
  path = env["PATH_INFO"]
  if path === "/index.html"
    next [399, {}, []]
  end
  matched = path.match("/(.*).html")
  if matched
    tag = matched[1]
    next [308, { "Content-Type" => "text/html", "Location" => "/tags##{tag}" }, []]
  end
  [399, {}, []]
end
