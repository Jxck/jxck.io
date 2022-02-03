Proc.new do |env|
  # env["rack.errors"].p()
  # logger = env["rack.errors"]
  # env.each{|e|
  #   logger.p(e)
  # }

  if env["rack.url_scheme"] == "http"
    location = "https://#{env["HTTP_HOST"]}#{env["PATH_INFO"]}"
    next [308, {location: location}, []]
  end
  [399, {}, []]
end