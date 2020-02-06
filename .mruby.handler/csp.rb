Proc.new do |env|
  REPORT_URI = "https://reporting.jxck.io"
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
      "https://adservice.google.com",
      ";",
      "frame-src",
      "https://www.youtube.com",
      "https://*.doubleclick.net",
      "https://*.googlesyndication.com",
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
      "https://*.google.co.jp",
      "https://*.google.com",
      "https://*.googleadservices.com",
      "https://*.googlesyndication.com",
      "https://*.googletagservices.com",
      "https://*.ytimg.com",
      "'unsafe-inline'",
      ";",
      "frame-src",
      "https://www.youtube.com",
      "https://*.doubleclick.net",
      "https://*.googlesyndication.com",
      ";",
      "connect-src",
      "wss://ws.jxck.io",
      "https://reporting.jxck.io",
      "https://*.gstatic.com",
      "https://www.google-analytics.com",
      "https://*.googlesyndication.com",
      ";",
      "report-uri #{REPORT_URI}",
      ";",
      "report-to default"
    ]

    # csp = [
    #   "script-src",
    #   "'strict-dynamic'",
    #   "'unsafe-eval'",
    #   "'unsafe-inline'",
    #   "https:",
    #   "'nonce-dummynonce'",
    #   ";",
    #   "report-uri #{REPORT_URI}",
    #   ";",
    #   "report-to default"
    # ]

    headers["Content-Security-Policy-Report-Only"] = csp.join(" ")
  end
  [399, headers, []]
end
