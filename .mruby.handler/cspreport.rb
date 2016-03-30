Proc.new do |env|
  body = env["rack.input"].read
  File.write("/var/log/csp_report_log", body)
  [200, {"Content-Type" => "text/plain"}, [body]]
end
