Proc.new do |env|
  REPORT_URI = "https://reporting.jxck.io"
  # No CSP for static text file
  if /(\.md\z|\.txt\z|\.xml\z|\.json\z)/.match(env["PATH_INFO"])
    next [399, {}, []]
  end

  csp = {
    "default-src": [
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
    ],
    "frame-src": [
      "https://www.youtube.com",
      "https://*.doubleclick.net",
      "https://*.googlesyndication.com",
    ],
    "connect-src": [
      "wss://ws.jxck.io",
      "https://reporting.jxck.io",
      "https://*.gstatic.com",
      "https://www.google-analytics.com",
      "https://*.googlesyndication.com",
      "https://*.doubleclick.net",
    ],
    "report-uri": [
      "#{REPORT_URI}",
    ],
    "report-to": [
      "default"
    ]
  }
  # CSP for Normal Page
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

  # CSP for AMP Page
  if /\.amp.html\z/.match(env["PATH_INFO"])
    csp[:"default-src"].concat([
      "https://*.ampproject.org",
      "https://*.ampproject.net",
      "https://adservice.google.com",
    ])
    csp[:"connect-src"].concat([
      "https://*.ampproject.org",
      "https://*.ampproject.net",
      "https://*.google.com",
      "https://*.google.co.jp",
      "https://blog.jxck.io",
    ])
    csp[:"style-src"] = [
      "'unsafe-inline'",
    ]
  end

  headers = {}
  headers["Content-Security-Policy-Report-Only"] = csp.map{|k, v| "#{k} #{v.join(" ")};" }.join(" ")
  [399, headers, []]
end
