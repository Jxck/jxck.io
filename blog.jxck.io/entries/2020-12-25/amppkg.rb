Proc.new do |env|
  path = env["PATH_INFO"]
  amp_cache_transform = env["HTTP_AMP_CACHE_TRANSFORM"]

  # amp page request
  if /\.amp.html\z/.match(path)
    if amp_cache_transform.nil?
      # delegate as normal access with vary header
      next [399, {"vary" => "amp-cache-transform, accept"}, []]
    else
      # reproxy to backend amppackager
      next [307, {"x-reproxy-url" => "http://127.0.0.1:10000/priv/doc/https://blog.jxck.io#{path}"}, []]
    end
  end

  # do nothing, delegate as normal access
  [399, {}, []]
end
