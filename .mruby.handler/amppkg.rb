Proc.new do |env|
  logger = env["rack.errors"]
  path = env["PATH_INFO"]

  # no amp page request
  unless /\.amp.html\z/.match(path)
    # do nothing, delegate as normal access
    next [399, {}, []]
  end

  amp_cache_transform = env["HTTP_AMP_CACHE_TRANSFORM"]

  # no AMP-Cache-Transform request
  if amp_cache_transform.nil?
    # do nothing, delegate as normal access
    next [399, {"vary" => "amp-cache-transform, accept"}, []]
  end

  logger.p(">>>>>>> #{path}")
  req_headers = env.reduce({}){|acc, header|
    k, v = header
    if k.start_with?("HTTP_")
      k = k[5..-1].downcase.gsub("_", "-")
      acc[k] = v
      logger.p("#{k}: #{v}")
    end
    acc
  }
  logger.p("<<<<<<<<<<<<<<<<<<<<<")

  # forward to amppkg
  req = http_request("http://127.0.0.1:10000/priv/doc/https://blog.jxck.io#{path}", {headers: req_headers})
  status, headers, body = req.join
  logger.p(status, '================')
  [status, headers, body]
end
