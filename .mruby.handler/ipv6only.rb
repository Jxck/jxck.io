# IPv4 block の時に使ったハンドラ。
# 今は使ってない。

Proc.new do |env|
  addr = env["REMOTE_ADDR"]
  # IPv6 ならそのまま通す
  next [399, {}, []] if addr.include?(":")
  # bot/crawler 等は許可する (OGP 取得, RSS リーダー等)
  allowed = ["bot", "crawler", "proxy", "spider", "facebook", "line", "hatena", "feed", "rss", "reader", "http://", "https://"]
  ua = env["HTTP_USER_AGENT"].to_s.downcase
  next [399, {}, []] if allowed.any? { |word| ua.include?(word) }
  # IPv4 ならエラーにする
  body = <<~TEXT
    本サイトは、 IPv6 での接続のみを受け付けるように制限しています。
    あなたのアクセスは IPv4 であるため、別のネットワークからアクセスして下さい。

    あなたのアドレス: #{addr}

    この制限は、あなたの身の回りに IPv4 のみの環境がどのくらい残っているかを啓蒙する目的で行っています。
    詳細な背景については以下を参照してください。

    https://blog.jxck.io/entries/2026-04-01/ipv6-only.html

    ただし、この記事も IPv6 で接続しないと見られません。
    スマホのキャリア回線でテザリングするか、 Cloudflare WARP を入れるのが手軽です。

    Jxck
  TEXT
  # 403 でエラーメッセージを返す
  [
    403,
    {"Content-Type" => "text/plain; charset=utf-8"},
    [body]
  ]
end
