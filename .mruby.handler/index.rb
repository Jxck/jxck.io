def list(path)
  li = Dir.entries(path)
     .reject{|path| path == "." }
     .sort()
     .map{|path| "<li><a href=#{path}>#{path}</a></li>" }
     .join("\n")
  <<-EOS
<html>
<ul>
#{li}
</ul>
</html>
EOS
end

Proc.new do |env|
  path = env["PATH_INFO"]

  if path == "/entries" || path == "/entries/"
    [200, {"content-type" => "text/html"}, [list("./blog.jxck.io/entries")]]
  elsif path =~ /\/entries\/(\d{4}-\d{2}-\d{2})(\/{0,1})$/
    [200, {"content-type" => "text/html"}, [list("./blog.jxck.io/entries/#{$1}")]]
  else
    [399, {}, []]
  end
end
