Proc.new do |env|
  url_mapping = {
    "/entries/2026-04-01/cognitive-saturation.html" => "https://blog.jxck.io/entries/2026-04-01/ipv6-only.html",
  }
  path = env["PATH_INFO"]
  if url_mapping[path]
    next [308, { "Content-Type" => "text/html", "Location" => url_mapping[path] }, []]
  end
  [399, {}, []]
end
