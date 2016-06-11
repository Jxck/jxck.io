Proc.new do |env|
  REPORT_URI = "https://4887c342aec2b444c655987aa8b0d5cb.report-uri.io/r/default/csp/reportOnly"
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
      "https://cdn.ampproject.org",
      ";",
      "child-src",
      "https://www.youtube.com",
      ";",
      "style-src",
      "'unsafe-inline'",
      ";",
      "report-uri #{REPORT_URI}"
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
      ";",
      "child-src",
      "https://www.youtube.com",
      ";",
      "connect-src",
      "wss://ws.jxck.io",
      ";",
      "report-uri #{REPORT_URI}"
    ]
    headers["Content-Security-Policy-Report-Only"] = csp.join(" ")
  end
  [399, headers, []]
end
