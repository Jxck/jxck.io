Proc.new do |env|
  hash = {}
  env.each {|k, v|
    if k.start_with?("HTTP_")
      unless k == "HTTP_HOST" || k == "HTTP_USER_AGENT" || k == "HTTP_REFERER"
        hash[k[5..-1].downcase] = v
      end
    end
  }
  # logger = env["rack.errors"]
  # logger.puts(hash.to_s)
  [399, {"x-fallthru-set-HEADERS" => hash.to_json}, []]
end
