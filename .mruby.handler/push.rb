Proc.new do |env|
  headers = {}
  if /index.html\z/.match(env["PATH_INFO"])
    # push
    headers["Link"] = "</http2/push/1.js>; rel=preload"
  end
  [399, headers, []]
end
