itr = Enumerator.new do |y|
  (1..10).each{|i|
    n = 0
    loop {
      n += 1
      break if n > 1000000
    }
    y << i.to_s
  }
end

Proc.new do |env|
  path = env["PATH_INFO"]
  p path
  if path == "/progress"
    [200, {"content-type" => "text/html"}, itr]
  else
    [399, {}, []]
  end
end
