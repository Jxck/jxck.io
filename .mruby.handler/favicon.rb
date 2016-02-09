Proc.new do |env|
  if env["PATH_INFO"] == "/favicon.ico"
    [200, {"content-type" => "image/x-icon"}, File::open("./www.jxck.io/favicon.ico")]
  else
    [399, {}, []]
  end
end
