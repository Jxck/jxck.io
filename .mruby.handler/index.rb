def list(dir, path)
  li = Dir.entries("#{dir}/#{path}")
     .reject{|file| file == "." }
     .sort()
     .map{|file|
       "<li><a href=/#{path}/#{file}>#{file}</a></li>"
     }
     .join("\n")

  <<-EOS
<!DOCTYPE html>
<meta charset=utf-8>
<meta name=viewport content="width=device-width,initial-scale=1">

<title>blog.jxck.io</title>
<link rel=stylesheet type=text/css href=//www.jxck.io/assets/css/style.css>

<header>
  <div>
    <a class=logo href=//jxck.io><img alt="jxck logo" src=//jxck.io/assets/img/jxck.png></a>
    <a class=path href=/>blog.jxck.io</a>
    <a class=feed href=/feeds/atom.xml><img src=//jxck.io/assets/img/rss.svg></a>
  </div>
</header>

<section class=archive>
  <h1><a href=##{path}>#{path}</a></h1>
  <ul>
    #{li}
  </ul>
</section>

<hr>

<footer>
  <address class=copyright>Copyright &copy; 2016 <a href=/>Jxck</a>. All Rights Reserved.</address>
</footer>
EOS
end

Proc.new do |env|
  path = env["PATH_INFO"]
  dir = "./blog.jxck.io"

  if path == "/entries" || path == "/entries/"
    [200, {"content-type" => "text/html"}, [list(dir, "entries")]]
  elsif path =~ /\/entries\/(\d{4}-\d{2}-\d{2})(\/{0,1})$/
    [200, {"content-type" => "text/html"}, [list(dir, "entries/#{$1}")]]
  elsif path =~ /.*.md/
    [200, {"content-type" => "text/plain"}, [File.read(dir + path)]]
  else
    [399, {}, []]
  end
end
