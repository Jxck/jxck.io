def list(dir, path)
  li = Dir.entries("#{dir}/#{path}")
     .reject{|file| file == "." }
     .sort{|a, b|
       ret = b <=> a
       ret = -1 if a == ".."
       ret = 1 if b == ".."
       ret
     }
     .map{|file|
       "<li><a href=/#{path}/#{file}>#{file}</a></li>"
     }
     .join("\n    ")

  pathlink = ""
  if path != "entries"
    pathlink = "<li><a href=/entries/#{path.split('/')[1]}>#{path.split('/')[1]}</a>"
  end

  pathlink = <<EOS
  <li><a href=/>blog.jxck.io</a>
  <li><a href=/entries>entries</a>
  #{pathlink}
EOS

  html = File.read(".template/index.html")
  html = html.gsub('"', '\"')
  html = '"' + html + '"'

  return eval(html)
end

Proc.new do |env|
  path = env["PATH_INFO"]
  dir = "./blog.jxck.io"

  if path == "/entries" || path == "/entries/"
    [200, {"content-type" => "text/html"}, [list(dir, "entries")]]
  elsif path =~ /\/entries\/(\d{4}-\d{2}-\d{2})(\/{0,1})$/
    [200, {"content-type" => "text/html"}, [list(dir, "entries/#{$1}")]]
  else
    [399, {}, []]
  end
end
