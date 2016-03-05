Proc.new do |env|
  now = Time.now.to_s
  now << "<br>"
  html =<<-EOS
<!DOCTYPE html>
<meta charset=utf-8>
<title>random</title>
#{now*1000}
  EOS
  [200, {"content-type" => "text/html"}, [html]]
end
