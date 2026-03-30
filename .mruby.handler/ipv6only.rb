Proc.new do |env|
  addr = env["REMOTE_ADDR"]
  unless addr.include?(":")
    body = <<~TEXT
      本サイトは、 IPv6 での接続のみを受け付けるように制限しています。
      あなたのアクセスは IPv4 であるため、別のネットワークからアクセスして下さい。

      あなたのアドレス: #{addr}

      この制限は、あなたの身の回りに IPv4 のみの環境がどのくらい残っているかを啓蒙する目的で行っています。
      詳細な背景については以下を参照して下さい。

      https://blog.jxck.io/entries/2026-04-01/ipv6-only.html

      ただし、この記事も IPv6 で接続しないと見れません。
      スマホのキャリア回線でテザリングするか、 Cloudflare WARP を入れるのが手軽です。

      Jxck
    TEXT
    next [
      403,
      {"Content-Type" => "text/plain; charset=utf-8"},
      [body]
    ]
  end
  [399, {}, []]
end
