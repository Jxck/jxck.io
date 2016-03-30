Proc.new do |env|
  REPORT_URI = "https://4887c342aec2b444c655987aa8b0d5cb.report-uri.io/r/default/csp/reportOnly"
  headers = {}
  if /\.amp.html\z/.match(env["PATH_INFO"])
    # CSP for AMP Page
    csp = [
      "default-src",
      "'self'",
      "https://*.jxck.io",
      "https://www.google-analytics.com",
      "https://cdn.ampproject.org",
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
      "self",
      "https://*.jxck.io",
      "https://www.google-analytics.com",
      ";",
      "child-src",
      "https://www.youtube.com",
      ";",
      "report-uri #{REPORT_URI}"
    ]
    headers["Content-Security-Policy-Report-Only"] = csp.join(" ")
  end
  [399, headers, []]
end
