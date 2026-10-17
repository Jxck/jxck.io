# [mozaic.fm][podcast] mozaic.fm v4 リリースノート #4 - VTT 編

## Intro

mozaic.fm v4 をリリースした。

1. [概要編](/entries/2026-09-16/mozaic-v4.html)
2. [ネットワーク編](/entries/2026-09-17/mozaic-v4-network.html)
3. UI 編
4. VTT 編
5. LLM-Wiki 編

今回は、字幕 (VTT) の提供について解説する。

Podcast の文字起こしは、番組を始めた当初から付きまとう問題だった。Whisper が出てきてから「雑な文字起こし」は作れるようになったが、ハルシネーションや固有名詞の誤認識が多く、そのまま出せる品質ではなかった。この 2~3 年で手を入れ続けた結果、ようやく公開できる精度になったため、v4 で字幕として提供することにした。

この記事では、mp3 から配信品質の VTT を作る現在のフローと、誰でも直せる公開エディタ、そして字幕を自前で描画することにした経緯をまとめる。


## 全体像

![VTT の生成から公開までのフロー](mozaic-v4-vtt.svg#1280x760)

左から右へ、whisper による初稿生成、構造系の後処理、Show Note と wiki を使った本文の照合、完了ゲート、配信、そして公開エディタからの修正が working tree に戻ってくる loop になっている。

作業は `/vtt <EP>` という 1 つの skill にまとめてあり、agent (Claude Code) がこのフローを回す。人間がやるのは、判断が必要な箇所の確認と最後の commit だけだ。


## 初稿生成 (whisper)

初稿は `transcribe.sh` が作る。入力は mp3 と、その回の Show Note (Markdown) である。

1. Show Note から Latin 語を抽出して用語集を作り、whisper の `--prompt` に渡す。Show Note は公開時に必ず存在するので、その回固有の API 名や製品名の正解データとして使える
2. 音声を 15 分 chunk + 60 秒 overlap に分割し、chunk ごとに `whisper-cli` (large-v3) を VAD 付きで実行する
3. chunk を絶対時刻に戻して 1 本に結合する
4. 結合結果を `.vtt0` として `chmod 400` で保全する。これが whisper の生出力で、以降は一切変更しない
5. `.vtt0` を `.vtt` に copy し、辞書置換と cue gap ルールを適用する。以降の作業はこの `.vtt` に対して行う

この構成は、ep201 (2 時間 17 分) の文字起こしで実測した whisper の系統的な不具合への対策として決まった。

- 無音ハルシネーション: 無音 10 秒を「うん」x 12 で埋める、同じ文を 6~11 回反復する。VAD (silero) で無音区間を decoder に渡さないようにした。VAD model が無い場合は黙って無効化せず fail させる。黙って無効化すると不具合が静かに再発するためだ
- タイムスタンプの量子化: decoder の状態が一度壊れると、23 分にわたって cue 境界が秒刻みになり cue が巨大化 (最大 202 文字) した。chunk 分割で被害を境界までに限定する
- 固有名詞の誤認識: フェード CM (FedCM)、T バック (TPAC)、Web ドライババイディ (WebDriver BiDi)。ドメイン語彙が decoder に無いので、Show Note 由来の prompt で語彙をバイアスする。ただし `--carry-initial-prompt` で全 window に前置すると decoder が干渉し、数十秒単位で発話を丸ごと取りこぼした (10 箇所、最大 40 秒) ため、prompt は chunk の先頭にだけ使う
- 実行が異常に遅い: 全編 8 時間 22 分 (実時間の 3.7 倍) かかった原因は macOS の App Nap だった。`caffeinate` を付けると実時間の約 0.4 倍になった

whisper は Mac で回す。VPS (960MB) では large-v3 の読み込みすら通らない。


## 構造系の後処理 (タスク 1-10)

初稿には構造的な問題が残るので、タスク 1 から 10 の順に直す。

1. 本文が空の cue を削除する
2. タイムスタンプが 5 秒以上飛ぶ区間を再書き起こしして置換する
3. 日本語でも英語でもない文字が含まれる行を再書き起こしする
4. 1 行が 50 文字を超える区間を再書き起こしする
5. 同一文字列が 5 回以上連続する区間 (ハルシネーション) を再書き起こしする
6. 不要な半角スペースを削除する
7. 改行位置の乱れを修復する
8. タイムスタンプの矛盾 (逆転・重なり) を検出する
9. WhisperX でタイムスタンプを alignment し直す
10. 長すぎる cue を分割する

タスク 2 から 5 の「再書き起こし」は、該当区間を `ffmpeg` で切り出して whisper に掛け直し、元 VTT の該当 cue を差し替える。全編を回し直すより、問題区間だけを取り直す方が速く、再現性もある。

タスク 9 の alignment は wav2vec2 の forced alignment で、本文を変えずにタイムスタンプだけを音声に寄せ直す。ここにも drift guard を入れてある。aligned 時刻が元の cue から 15 秒を超えて動く場合は誤マッチとみなして元時刻を維持する。「そう」のような短い cue が数千秒先の同文にマッチし、以降が連鎖的に壊れる事故が実際に起きたためで、失敗モードは常に「元時刻のまま、悪化しない」に倒してある。

タスク 10 の分割は、alignment で得た word 単位の時刻を使う。読点で割り、割れなければ句境界で割り、それでも残れば JSON spec で手動分割する。分割点の時刻を word 時刻から引くため、cue 内の間 (ま) に影響されない。

### 1 行 50 文字と cue gap

字幕としての読みやすさを決める規則が 2 つある。

- 1 行 50 文字。これを超える行があれば完了にしない。`check-line-length.py` が exit 1 を返す
- cue gap ルール。次の cue までの間隔が 2 秒未満なら、前の cue の end を次の start まで伸ばして密着させる。短い無音で字幕がちらつくのを防ぐ。ルールの実装は player / editor / script で共有する 1 つの関数 (`closeCueGaps`) に置き、どの経路で保存しても同じ結果になる


## 本文の照合 (Show Note と wiki を台本にする)

構造が整ったら、本文の誤認識を直す。whisper は固有名詞をカタカナや同音の一般語に落とすので、「リアクト」を React に、「エイチティーティーピー」を HTTP に戻す作業である。

ここで台本になるのが Show Note だ。しかし v4 では、Show Note より先に [LLM-Wiki](/entries/XXXX/mozaic-v4-llm-wiki.html) への ingest を終わらせる順序に変えた。wiki の ingest は Show Note の URL 先を raw として取得済みなので、Show Note の箇条書きだけでなく、記事本文そのもの (readability 抽出済みの英文) を裏取りに使える。固有名詞の綴りを確かめるには、これが最も濃い一次情報になる。

対象は monthly ecosystem / platform の回で、判定と完了確認は機械的に行う。ingest の commit が無ければ fail-closed で止まり、先に `/wiki ingest <EP>` を回す。

照合の規律は次のとおり。

- 直すのは本文行だけで、タイムスタンプと空行には触れない。これは目視ではなく diff で機械検証し、タイムスタンプ行に差分があれば戻す
- 発話と異なる表記へ言い換えない。発話が「JS」なら台本に JavaScript とあっても JS のまま。要約も語順の変更もしない
- 推測で直さない。台本に無い固有名詞は wiki の page と raw、過去回の VTT、Web 検索の順に裏を取る。「Ant シルバー」が実在のエンジン名 Ant Silver だったように、誤認識に見える語が正しいことがある
- それでも曖昧なら直さず、cue 本文の先頭に `★` (不明度が高ければ `★★`) を付けて残す。この印は後述のエディタで可視化される

機械検出 (辞書未登録語の抽出、grep レシピ) はあくまで当たり付けで、誤認識の大半は通読でしか見つからない。ep210 では修正 146 件のうち機械検出で拾えたのは 2 割弱だった。

見つけた誤認識は、無文脈で安全なら置換辞書 (`dict.csv`) に、文脈依存なら grep レシピ (`check.md`) に還元し、次の回の初稿に効かせる。辞書は 1 万行を超えた。「テーブル -> Fable」「バン -> Bun」「炎 -> Hono」のように一般語と衝突する語は辞書に入れず、レシピ側で文脈を見て直す。


## 完了ゲート

次が全て green になるまで完了にしない。

| 項目 | 検査 |
| --- | --- |
| cue gap ルール (2 秒未満を閉じる) | `close-vtt-cue-gaps.ts --check` |
| 1 行 50 文字 | `check-line-length.py` (exit 0。`★` 行は除外) |
| 空 cue が無い | 全体走査 |
| 5 秒以上のギャップが無い | 全体走査 |
| 日本語でも英語でもない文字が無い | 全体走査 |
| 同一文字列 5 連続以上が無い | `duplicate.rb --min-repeats=5` |
| タイムスタンプの逆転・重なりが無い | 全体走査 |

公開 VTT 全件に対しては、別途 strict profile の検査 (`check:vtt`) も掛かる。これは後述するエディタの server 側と同じ validator だ。

現在、ep200 から ep218 までの 19 本、合計 57,491 cue を配信している。`★` が残る cue は 195 件ある。


## 配信と字幕の描画

VTT は `vtt.mozaic.fm/*.vtt` として git 管理し、VPS の working tree を h2o がそのまま配信する。mp3 と同じ「working tree = 配信元」のモデルで、build も deploy 手順も無い。`.vtt0` は配信しない (404)。

player 側は `<audio><track kind="captions">` という意味的に正しい構成に戻した。ただし字幕の描画はブラウザに任せていない。

- 標準の `::cue` 描画は折り返しの制御が難しく、長い行が突き抜けることがあった
- macOS の字幕設定 (MediaAccessibility) は、native `::cue` の背景色を author CSS より優先する。字幕は背景に動画がある前提で OS が背景色を付けるため、音声だけの再生では背景色同士が邪魔しあって読めないケースがあった

そこで `track.mode = "hidden"` にして cue の時刻計算だけをブラウザに任せ、`cuechange` で active cue を shadow DOM の `#caption` に転記して自前で描画する。cue 本文は `textContent` としてだけ扱い、WebVTT の cue markup も解釈しない。溢れたときは font-size を 3 段階まで縮め、それでも収まらなければ 3 行で ellipsis にする (データは削らず表示だけ削る)。詳細は UI 編に書いた。


## 公開エディタ (字幕の crowdsourcing)

VTT を詰めていくと、最後は音声を聞いて人間が直す必要が出る。しかし音声を聞きながらテキストとタイミングを調整できるツールは、高価だったり、動画前提だったり、日本語に対応していなかったりと、ちょうどいいものが無かった。

そこでエディタを一緒に作り、エピソードページの VTT タブとして統合した。再生は固定 player が持っているので、エディタは cue の読み込み / 編集 / 保存と、playerStore 経由のライブプレビューと頭出しだけを担当する。

そして、この編集機能は認証なしで誰でも使える。

- 保存 = VPS の working tree への即時反映で、配信にそのまま乗る
- 編集は uncommitted のまま溜まり、jxck が `git diff` を見て事後に commit する。承認フローは置かない
- 悪意ある編集も保存した瞬間に配信へ乗るが、字幕は再生中にしか見えず攻撃の旨味が薄い。巻き戻しは `git checkout` 一発で、善意の編集が上書きで消えるケースのために成功 PUT ごとの server-side snapshot を持つ

その代わり、公開 write endpoint の防御は server 側で強制する。

- `If-Match` (ETag) を必須にし、競合は 412。エディタは 412 を受けたら再読み込みまで autosave を止める
- VTT を bounded plain-text profile として定義し、strict validation を通らない body は 422。上限は file 512 KiB、cue 10,000、cue 本文 1,000 code point / 4 行、timeline 24 時間、1 秒以内に開始する cue 20 個
- rate limit は IP / file / 全体の 3 段の token bucket。自動保存 (約 1 秒に 1 回) で編集者が 429 を受けていたのを access log で見つけ、上限を上げた
- strict validation -> cue gap 正規化 -> snapshot -> atomic write の順で、file mutex の下で書く
- GET も同じ validator を通し、invalid な file は本文も ETag も返さない (fail-closed)。lenient parse で壊れた block を黙って捨てたまま保存すると、表示されなかった block を失うためだ

client 側も、Content-Length を信用せずに ReadableStream を上限まで読んで打ち切り、不正な UTF-8 は replacement character で素通りさせず fail にする。VTT 由来の DOM XSS は確認できなかったが、Trusted Types を CSP で enforce し、`innerHTML` 系の sink をアプリ全体で allowlist 化した。

エディタの UI は、cue card に duration slider を常設し、タイミングの重なりは error summary と `aria-invalid` で示す。`★` の付いた未処理 cue は warning surface と右上の件数表示で可視化し、リスナーがどこを直せばよいか分かるようにした。Spell Check Custom Dictionary には wiki と episode から作った 1,078 語の glossary を登録している。


## Outro

字幕は「whisper を回せば出る」ものではなく、生出力の保全、構造の修復、台本との照合、ゲート、配信、修正の還元、という loop 全体で品質が決まる。v4 ではその loop を 1 つの skill と数本の script に固定し、どの回でも同じ手順で同じ品質に到達できるようにした。

残っているのは `★` が付いたままの 195 cue と、ep199 以前の回である。公開エディタからの修正が溜まり、辞書が育ち、次の回の初稿が少しずつ良くなる。字幕は配信して終わりではなく、聞いた人と一緒に直し続けるものとして運用していく。
