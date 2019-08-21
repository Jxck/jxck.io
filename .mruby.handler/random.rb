Proc.new do |env|
  # delay
  10000.times.reduce{|pre, curr| pre ** curr }

  @i ||= 0
  seq = (@i+=1).to_s
  now = Time.now.to_s
  random = (0...8).map{ ('A'..'Z').to_a[rand(26)] }.join

  ext = File.extname(env["PATH_INFO"]).gsub('.', '')
  ext = "html" if ext == ""

  header = {
    "Content-Type" => "text/#{ext}; charset=utf-8",
    "X-Seq" => seq
  }

  body = ""
  case ext
  when "json"
    body = <<-EOS
{
  "seq": #{seq},
  "now": "#{now}",
  "random": "#{random}"
}
EOS
  when "html"
    body =<<-EOS
<!DOCTYPE html>
<meta charset=utf-8>
<title>random</title>
<h1>Test</h1>
<a href=./random>reload</a>
<dl>
  <dt>seq</dt><dd>#{seq}</dd>
  <dt>now</dt><dd>#{now}</dd>
  <dt>random</dt><dd>#{random}</dd>
</dl>
EOS
  end

  [200, header, [body]]
end
