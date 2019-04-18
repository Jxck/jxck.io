Proc.new do |env|
  match = env["PATH_INFO"].match(/(.*)\.m4a/)
  if match
    next [308, { "Content-Type" => "audio/mpeg", "Location" => "#{match[1]}.mp3" }, []]
  end
  [399, {}, []]
end
