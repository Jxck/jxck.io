Proc.new do |env|
  origin = env["HTTP_ORIGIN"]

  # env["rack.errors"].p()
  # logger = env["rack.errors"]
  # logger.p()

  if origin.nil?
    headers = {
      "Cache-Control" => "max-age=31536000"
    }
    next [403, headers, []]
  end

  unless origin.end_with?("jxck.io") || origin.end_with?("mozaic.fm")
    # should from my Domain
    headers = {
      "Cache-Control" => "max-age=31536000"
    }
    next [403, headers, []]
  end

  headers = {
    "Access-Control-Allow-Origin"=> origin,
    "Vary" => "origin"
  }
  [399, headers, []]
end
