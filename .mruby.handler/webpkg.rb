Proc.new do |env|
  logger = env["rack.errors"]

  path = env["PATH_INFO"]
  amp_cache_transform = env["HTTP_AMP_CACHE_TRANSFORM"]

  # amp page request
  if /\.amp.html\z/.match(path)
    # if amp_cache_transform.nil?
    #   # delegate as normal access with vary header
    #   next [399, {"vary" => "amp-cache-transform, accept"}, []]
    # else
    #   # reproxy to backend amppackager
    #   next [307, {"x-reproxy-url" => "http://127.0.0.1:10000/priv/doc/https://blog.jxck.io#{path}"}, []]
    # end
    next [301, {"Location" => path.sub(".amp.html", ".html")}, []]
  elsif /.html\z/.match(path) && /application\/signed-exchange;v=b3(?!;q=)/.match(env["HTTP_ACCEPT"])
    logger.puts(path)
    logger.puts(env["HTTP_USER_AGENT"])
    logger.puts(env["HTTP_ACCEPT"])
    # reproxy to backend wepkgserver
    next [307, {"x-reproxy-url" => "http://127.0.0.1:11000/priv/doc/https://blog.jxck.io#{path}"}, []]
  end

  # do nothing, delegate as normal access
  [399, {}, []]
end
