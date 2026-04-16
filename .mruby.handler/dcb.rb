# 起動時に entries.dict 本体から Available-Dictionary の期待値を 1 回だけ計算する
# これにより request ごとに hash を再計算する必要がない
dict_body = File.open("./blog.jxck.io/dictionary/entries.dict", "rb") { |f| f.read }
dict_hash = [Digest::SHA256.digest(dict_body)].pack("m0")
expected_dictionary = ":#{dict_hash}:"

# リクエストごとのハンドラ
Proc.new do |env|
  # 1. dcb を受け取れないなら通常レスポンスへフォールバックする
  accept_encoding = env["HTTP_ACCEPT_ENCODING"] || ""
  accepts_dcb = accept_encoding.split(",").map { |e| e.strip.downcase }.include?("dcb")
  unless accepts_dcb
    next [399, {}, []]
  end

  # 2. Dictionary-ID は Structured Fields String なので quotes を含んだ値で比較する
  available_dictionary = env["HTTP_AVAILABLE_DICTIONARY"]
  dictionary_id = env["HTTP_DICTIONARY_ID"]
  unless available_dictionary == expected_dictionary && dictionary_id == '"entries"'
    next [399, {}, []]
  end

  # 3. Sec-Fetch-Site による readability gate (RFC 9842 Section 9.3.3)
  # https://www.rfc-editor.org/rfc/rfc9842#section-9.3.3
  # レスポンス範囲を CORS Readable に絞る
  # 許可
  # - none: URL 直打ちなど
  # - same-origin: Origin 内遷移
  # - absent: 未送信(curl 等)
  # 拒否
  # - same-site
  # - cross-site
  site = (env["HTTP_SEC_FETCH_SITE"] || "").downcase
  unless site == "" || site == "same-origin" || site == "none"
    next [399, {}, []]
  end

  # 4. /entries/*.html だけを dcb 配信対象にする
  path_info = (env["SCRIPT_NAME"] || "") + (env["PATH_INFO"] || "")
  unless path_info.start_with?("/entries/") && File.extname(path_info) == ".html"
    next [399, {}, []]
  end

  # 5. 対応する .html.dcb が無ければフォールバック
  dcb = File.join("./blog.jxck.io", path_info.delete_prefix("/")).sub(/\.html\z/, ".html.dcb")
  unless File.file?(dcb)
    next [399, {}, []]
  end

  # 6. dcb 応答を返す
  # Vary に sec-fetch-site を含めることで、
  # readability gate の結果が異なる request 間での誤キャッシュを防ぐ
  body = File.open(dcb, "rb") { |f| f.read }
  [200, {
    "Content-Type" => "text/html",
    "Content-Encoding" => "dcb",
    "Vary" => "accept-encoding, available-dictionary, dictionary-id, sec-fetch-site",
  }, [body]]
end
