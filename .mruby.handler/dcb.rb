# 起動時に entries.dict 本体から Available-Dictionary の期待値を 1 回だけ計算する
dict_body = File.open("./blog.jxck.io/dictionary/entries.dict", "rb") { |f| f.read }
dict_hash = [Digest::SHA256.digest(dict_body)].pack("m0")
expected_dictionary = ":#{dict_hash}:"

# リクエストごとのハンドラ
Proc.new do |env|
  # まずヘッダだけで dcb 応答候補かを判定する
  accept_encoding = env["HTTP_ACCEPT_ENCODING"] || ""
  # dcb を受け取れないなら通常レスポンスへフォールバックする
  accepts_dcb = accept_encoding.split(",").map { |e| e.strip.downcase }.include?("dcb")
  unless accepts_dcb
    next [399, {}, []]
  end

  # dcb を受け取るなら、想定した dictionary かを判定
  available_dictionary = env["HTTP_AVAILABLE_DICTIONARY"]
  dictionary_id = env["HTTP_DICTIONARY_ID"]
  unless available_dictionary == expected_dictionary && dictionary_id == '"entries"'
    next [399, {}, []]
  end

  # h2o が PATH_INFO を正規化済みの前提でプレフィクスと拡張子のみ確認
  path_info = (env["SCRIPT_NAME"] || "") + (env["PATH_INFO"] || "")
  unless path_info.start_with?("/entries/") && File.extname(path_info) == ".html"
    next [399, {}, []]
  end

  # 対応する dcb ファイルを取得
  dcb = File.join("./blog.jxck.io", path_info.delete_prefix("/")).sub(/\.html\z/, ".html.dcb")
  unless File.file?(dcb)
    next [399, {}, []]
  end

  body = File.open(dcb, "rb") { |f| f.read }
  [200, {
    "Content-Type" => "text/html",
    "Content-Encoding" => "dcb",
    "Vary" => "accept-encoding, available-dictionary, dictionary-id",
  }, [body]]
end