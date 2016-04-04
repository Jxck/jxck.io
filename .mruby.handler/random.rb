Proc.new do |env|
  @i ||= 0
  seq = (@i+=1).to_s
  now = Time.now.to_s
  random = (0...8).map{ ('A'..'Z').to_a[rand(26)] }.join

  10000.times.reduce{|pre, curr| pre ** curr }

  header = {
    "Content-Type" => "text/json; charset=utf-8",
    "X-Seq" => seq
  }

  body = <<-EOS
{
  seq: "#{seq}",
  now: "#{now}",
  random: "#{random}"
}
EOS

  [200, header, [body]]
end
