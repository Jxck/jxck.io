Proc.new do |env|
  url_mapping = {
    "/entries/2016-09-29/vender-prefix-to-origin-trials.html" => "https://blog.jxck.io/entries/2016-09-29/vendor-prefix-to-origin-trials.html",
    "/entries/2017-05-22/webrtc-loadmap.html" => "https://blog.jxck.io/entries/2017-05-22/webrtc-roadmap.html",
    "/entries/2017-07-10/subclassible-eventtarget.html" => "https://blog.jxck.io/entries/2017-07-10/subclassable-eventtarget.html",
    "/entries/2023-12-15/work-around.html" => "https://blog.jxck.io/entries/2023-12-15/workaround.html",
    "/entries/2025-07-25/digital-regacy.html" => "https://blog.jxck.io/entries/2025-07-25/digital-legacy.html",
    "/entries/2025-11-09/family-paln.html" => "https://blog.jxck.io/entries/2025-11-09/family-plan.html",
    "/entries/2026-04-01/cognitive-saturation.html" => "https://blog.jxck.io/entries/2026-04-01/ipv6-only.html",
  }
  path = env["PATH_INFO"]
  if url_mapping[path]
    next [308, { "Content-Type" => "text/html", "Location" => url_mapping[path] }, []]
  end
  [399, {}, []]
end
