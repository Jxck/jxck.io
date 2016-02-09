robots =<<-EOS
User-agent: *
Allow: *
EOS

Proc.new do |env|
  if env["PATH_INFO"] == "/robots.txt"
    [
      200,
      {"content-type" => "text/plain"},
      [robots]
    ]
  else
    [399, {}, []]
  end
end
