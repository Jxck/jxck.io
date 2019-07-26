Proc.new do |env|
  REPORT_URI = "https://report-uri.jxck.io"
  # No CSP for static text file
  if /(\.md\z|\.txt\z|\.xml\z|\.json\z)/.match(env["PATH_INFO"])
    next [399, {}, []]
  end

  headers = {}
  if /\.amp.html\z/.match(env["PATH_INFO"])
    # CSP for AMP Page
    csp = [
      "default-src",
      "'self'",
      "https://jxck.io",
      "https://*.jxck.io",
      "https://www.google-analytics.com",
      "https://*.ampproject.org",
      "https://*.ampproject.net",
      "https://html.spec.whatwg.org",
      "https://w3c.github.io",
      ";",
      "frame-src",
      "https://www.youtube.com",
      ";",
      "style-src",
      "'unsafe-inline'",
      ";",
      "report-uri #{REPORT_URI}",
      ";",
      "report-to default"
    ]
    headers["Content-Security-Policy-Report-Only"] = csp.join(" ")
  else
    # CSP for Normal Page
    csp = [
      "default-src",
      "'self'",
      "https://jxck.io",
      "https://*.jxck.io",
      "https://www.google-analytics.com",
      "https://html.spec.whatwg.org",
      "https://w3c.github.io",
      ";",
      "worker-src",
      "https://blog.jxck.io", # service-worker
      ";",
      "frame-src",
      "https://www.youtube.com",
      ";",
      "connect-src",
      "wss://ws.jxck.io",
      "https://www.google-analytics.com",
      "https://report-uri.jxck.io",
      ";",
      "report-uri #{REPORT_URI}",
      ";",
      "report-to default"
    ]
    headers["Content-Security-Policy-Report-Only"] = csp.join(" ")
  end
  [399, headers, []]
end
