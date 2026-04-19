# CDT Cross-Origin Guard Plan

## Summary

目的は、[`dcb.rb`](/Users/jxck/develop/jxck.io/.mruby.handler/dcb.rb) の `dcb` 配信判定を RFC 9842 の security / privacy 要件に沿って安全側へ寄せることです。  
今回の方針は、**same-origin か direct navigation と見なせる request にだけ `dcb` を返し、それ以外は通常レスポンスへフォールバックする**、で固定します。

この変更で達成したいことは以下です。

- `Available-Dictionary` / `Dictionary-ID` 一致だけでは不十分な点を解消する
- `Sec-Fetch-Site` を使って cross-origin request context を抑止する
- 現在の same-origin 実験導線は壊さない
- 将来 CORS readable な `dcb` 配信を追加したくなったときに、拡張しやすい判定構造にする

成功条件は以下です。

- same-origin request では従来どおり `dcb` が返る
- `same-site` / `cross-site` request には `dcb` を返さない
- `none` は direct navigation として許可する
- `Vary` が readability gate に追従している
- 判定木がコード上で一意に読める

## Implementation Changes

### 1. `dcb.rb` の判定順を固定する

[`dcb.rb`](/Users/jxck/develop/jxck.io/.mruby.handler/dcb.rb) の `Proc` は、以下の順で早期 return する形に整理する。

1. `Accept-Encoding` に `dcb` が無ければ拒否
2. `Available-Dictionary` と `Dictionary-ID` が期待値と一致しなければ拒否
3. fetch metadata による readability gate を通らなければ拒否
4. `PATH_INFO` が `/entries/*.html` でなければ拒否
5. 対応する `.html.dcb` が無ければ拒否
6. ここまで通ったときだけ `200 + Content-Encoding: dcb`

この順にする理由は、軽いヘッダ判定で先に落とし、`PATH_INFO` の解釈や file lookup を必要な request に限定するため。

### 2. Readability Gate をインラインで実装する

`Sec-Fetch-Site` の判定は helper 関数にせず、ハンドラ内にインラインで `unless` + `next` の早期 return として実装する。

判定仕様は以下で固定する。

- `Sec-Fetch-Site` が無い (absent): 許可 — 未送信のクライアント (curl 等)
- `Sec-Fetch-Site == "none"`: 許可 — URL 直打ちなど
- `Sec-Fetch-Site == "same-origin"`: 許可 — Origin 内遷移
- `Sec-Fetch-Site == "same-site"`: 拒否
- `Sec-Fetch-Site == "cross-site"`: 拒否
- 上記以外の未知値: 拒否

`Sec-Fetch-Mode` は判定に使わない。  
理由は、`Sec-Fetch-Site` が `same-origin` / `none` / absent の時点で安全側は満たしており、mode まで見ると same-origin からの `fetch()` (mode: cors/no-cors) を不必要に拒否してしまうため。

### 3. `Origin` / CORS 判定は今回は入れない

今回の plan では `Origin` / `Access-Control-Allow-Origin` を使った CORS readable 判定は実装しない。  
理由は以下。

- 現在の blog HTML 応答は `Access-Control-Allow-Origin` を返していない
- つまり cross-origin readable 条件を満たす運用がまだ無い
- 中途半端に CORS 分岐を入れるより、今は cross-origin を全部落とす方が安全で単純

将来 CORS readable な `dcb` を許可したい場合は、以下をまとめて追加する前提にする。

- `h2o.conf` 側の CORS header
- `dcb.rb` 側の `Origin` / `Access-Control-Allow-Origin` 判定
- `Vary` への追加ヘッダ見直し

### 4. `Vary` を拡張する

現在の `Vary`:

- `accept-encoding`
- `available-dictionary`
- `dictionary-id`

に加えて、以下を追加する。

- `sec-fetch-site`

最終形は以下で固定する。

```http
Vary: accept-encoding, available-dictionary, dictionary-id, sec-fetch-site
```

理由は、readability gate の結果が `Sec-Fetch-Site` に依存するため。  
これを入れないと、異なる fetch context 間で `dcb` 応答が誤キャッシュされる余地がある。

`sec-fetch-mode` は判定に使わないため `Vary` にも含めない。

### 5. コメントを追加する

[`dcb.rb`](/Users/jxck/develop/jxck.io/.mruby.handler/dcb.rb) には以下が読める程度の日本語コメントを残す。

- 起動時に辞書 hash を 1 回だけ計算する意図
- `Dictionary-ID` が Structured Fields String なので quotes 込みで比較していること
- RFC 9842 Section 9.3.3 へのリンク
- `Sec-Fetch-Site` の各値 (none / same-origin / absent / same-site / cross-site) の許可・拒否理由
- `Vary` に `sec-fetch-site` を含める理由

### 6. `h2o.conf` は変更しない

今回は [`h2o.conf`](/Users/jxck/develop/jxck.io/h2o.conf) の以下は維持する。

- `Use-As-Dictionary: match="/entries/*", match-dest=("document"), id="entries"`
- `Link: </dictionary/entries.dict>; rel="compression-dictionary"`

つまり、辞書の advertise 範囲や `Dictionary-ID` の設計は変えず、**返す/返さないの安全条件だけを `dcb.rb` 側で厳しくする**。

## Test Plan

### Manual Request Cases

最低限、以下の request 条件を手で確認する。

- `Accept-Encoding: dcb` なし → `dcb` を返さない
- `Accept-Encoding: dcb` あり、dictionary 一致、`Sec-Fetch-Site: same-origin` → `dcb` を返す
- `Accept-Encoding: dcb` あり、dictionary 一致、`Sec-Fetch-Site: none` → `dcb` を返す
- `Accept-Encoding: dcb` あり、dictionary 一致、`Sec-Fetch-Site: same-site` → `dcb` を返さない
- `Accept-Encoding: dcb` あり、dictionary 一致、`Sec-Fetch-Site: cross-site` → `dcb` を返さない
- `Accept-Encoding: dcb` あり、dictionary 一致、`Sec-Fetch-Site` なし (absent) → `dcb` を返す
- `Accept-Encoding: dcb` あり、dictionary 不一致 → `dcb` を返さない
- `Accept-Encoding: dcb` あり、`Dictionary-ID` 不一致 → `dcb` を返さない

### Regression

- 現在の `new-blog-start.html` 実験ページで、same-origin の通常 request が引き続き `dcb` になること
- `PATH_INFO` から `.html.dcb` を引く現在のロジックが壊れていないこと
- H2O reload 後に mruby の初期化エラーが無いこと

### Cache Safety

- 200 応答時に `Vary` が `sec-fetch-site` まで含むこと
- non-`dcb` request に対して、誤って cached `dcb` が返らないこと

## Assumptions

- 今回の目的は「RFC の安全側に寄せること」であり、cross-origin readable な `dcb` 配信を新たに有効化することではない
- `same-site` は今後許可する可能性はあるが、今回は拒否で固定する
- `cross-site` は navigate であっても拒否で固定する
- `Sec-Fetch-Mode` は判定に使わない
- `Origin` と `Access-Control-Allow-Origin` は今回は使わない
- `entries.dict` の hash 計算、`Dictionary-ID == '"entries"'` の比較、`PATH_INFO` から `.html.dcb` を引く現在仕様は維持する
