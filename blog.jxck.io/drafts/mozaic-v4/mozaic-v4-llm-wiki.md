# [mozaic.fm][podcast] mozaic.fm v4 リリースノート #5 - LLM-Wiki 編

## Intro

mozaic.fm v4 をリリースした。

1. [概要編](/entries/2026-09-16/mozaic-v4.html)
2. [ネットワーク編](/entries/2026-09-17/mozaic-v4-network.html)
3. UI 編
4. VTT 編
5. LLM-Wiki 編

今回は、新設した LLM-Wiki ([wiki.mozaic.fm](https://wiki.mozaic.fm)) について解説する。

mozaic.fm は Web の最新動向を扱う番組で、毎回の Show Note には数十件の URL が並ぶ。これらを「番組で扱った」という事実ごと知識として蓄積し、後から辿れるようにしたい、というのが出発点だ。

実装は 2026-07-20 に始め、約 3 ヶ月の間に raw-only への転換、ontology / RDF 化、TC39 系統の追加、IA の再設計を経て、現在の形になった。この記事はその経緯と、やってみて分かったことをまとめる。


## LLM-Wiki とは

元ネタは Karpathy の LLM-Wiki パターンだ。

- https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f

RAG のように毎回ソースを検索して回答するのではなく、LLM が「永続的で相互リンクされた Markdown 群」を段階的に構築・維持する、というパターンである。構成は 3 層になる。

1. Raw Sources: 不変の取得ソース。LLM は読むだけで編集しない
2. The Wiki: LLM が管理する entity / concept の page 群と相互参照
3. The Schema: 構造・命名・手順の規約。人間と LLM が共同で更新する

操作は Ingest (ソースを読んで page に統合する) / Query (wiki から統合回答する) / Lint (矛盾・孤立・欠落を検査する) の 3 つだ。

mozaic.fm の場合、ソースは Show Note に並ぶ URL であり、entity は「Chrome」「Vite」「View Transitions」のような Web 技術そのものになる。番組回 (ep) を時間軸にして、同じ entity の動向を回をまたいで 1 page に積んでいく、という形が自然に決まった。


## 全体像

![LLM-Wiki の構成と pipeline](mozaic-v4-llm-wiki.svg#1280x760)

左から右へ、Show Note の URL を raw として取得し、entity page に統合し、SSG と RDF として公開する流れになっている。各段を順に解説する。


## Raw 層

### 取得は script で行う

raw は、URL ごとに本文を抽出して Markdown に変換した「normalized snapshot」だ。ドメインとパスをそのままディレクトリ構造に写像し (`raw/<host>/<path>.md`)、1 URL = 1 file とする。同じ記事を複数の回が参照しても file は 1 つで、重複取得は構造的に起きない。

取得を Claude の WebFetch に任せる案は最初に却下した。WebFetch は取得内容に対する小型モデルの回答を返す仕組みで、保存されるものが原文である保証がなく、切り詰めや言い換えが起きても検証できない。raw 層の「不変のソース」という前提が崩れる。そこで取得・抽出は決定的な script (`fetch-raw.ts`) にし、LLM の役割は ingest (要点の抽出と page への統合) に限定した。

frontmatter には元 URL、取得日時、fetched / stub の `status`、本文の `content_hash`、その URL を扱った `episodes` を持たせる。`content_hash` は後述の claims が「どの版の raw のどの行を根拠にしたか」を固定するために使う。

### 取得できないものの扱い

- Chrome / Firefox の Intent thread、standards position、Chrome Platform Status、TAG Review などは「議論のハブ」であり、本体はリンク先にある。これらは discussion-hub として扱い、リンク先を別フェーズ (`fetch-raw-discover.ts`) で追跡取得する。curl 専用、leaf の allowlist、決定的な `discovered_via` で境界を持たせた
- 広告モデル、有料会員限定、bot 排除の意図が明確なサイトは do-not-ingest host とし、本文の raw 化を行わない。既存 raw も stub 化した
- 取得不能の raw は stub として残し、「取得できなかった」という事実自体を記録する。2026-10 時点で raw 3,387 file のうち stub は 9.5% で、X / 広告メディア / ログイン必須の記事が主である

raw は他者著作物の snapshot なので、repo は非公開に確定し、`raw/` は一切配信しない private corpus として扱う。公開するのは wiki の page だけだ。


## Ingest と entity page

Ingest は `/wiki ingest <N>` で回す。Show Note からトピックを抽出し (ecosystem 回は全トピック、platform 回は太字トピック)、URL を raw として取得し、entity page に統合する。

page の規約は次のとおり。

- page は entity 単位で、トピック単位には分けない。「Cloudflare の Workers Cache」は `cloudflare-workers.md` の節になる
- 同じ entity が複数回で登場したら同じ page の `## 動向` に `### ep<N> (配信日)` 節を追記する。時系列が 1 page に積まれる
- ブラウザの Intent はブラウザ page に集約せず、機能単位の page に書く。1 機能の複数ブラウザ・複数回の動きを 1 page で追う
- slug は page の IRI であり変えない。改名は H1 と `aliases` で表す
- 出典は `## 出典` に 1 件 1 bullet で、raw への相対 link と元 URL を持つ

系統は Platform (ブラウザと標準) と Ecosystem (フレームワークやツール) の 2 つから始め、後に TC39 を第 3 系統として足した。category は番組構成に合わせ、Platform は Chrome / Firefox / Safari / Edge / W3C / ECMAScript / IETF / Other、Ecosystem は Framework / Library / Toolchain / Runtime / Bundler / AI/LLM / Services / Other とした。既存 394 entity の再分類は 17 並列の agent に出し、分類判断を inventory として commit してレビュー可能にした。


## raw-only への転換

最初の 1 ヶ月半は、Show Note の記述と agent の知識も使って page を書いていた。読みやすい本文にはなるが、書かれていることが raw に本当にあるのかを後から確かめられない。「それっぽい要約」と「出典に遡れる知識」は別物で、後者でなければ蓄積する意味がない。

そこで 2026-09-07 に raw-only の原則を決めた。page の本文と relation は raw の記述だけから書く。Show Note の解釈と agent の知識は事実の根拠にせず、raw を読む補助と参照資料を探すためにだけ使う。raw が支持しない記述は書かない。

これに合わせて、既存の全 533 page を一度「骨格」に戻した。frontmatter、H1、`### ep<N>` の見出し、`## 出典` だけを残し、本文を消す。その上で、raw だけから本文を作り直す re-ingest を回す。

### writer と 2 系列の verifier

re-ingest は、writer と verifier を分けた体制で回している。

- writer は Codex。入力は骨格 page、raw の行番号付き全文、規則 file を束ねた bundle だけで、旧本文も Show Note も渡さない。bundle 以外の file は開かず、知識で事実を補わない
- verifier は Claude Opus と Codex (新規 context) の 2 系列で、本文の全文を raw の行と照合する
- 采配役 (Fable) は本文を書かず、2 系列の不一致を raw で裁定する。修正 round は 3 回まで
- 1 episode = 1 commit で、report を plan の追補として残す

writer の出力は本文だけではなく、claims と呼ぶ監査表を伴う。`claims/<system>/<slug>.jsonl` に、本文の 1 文ごとに「どの raw の何行目から何行目を根拠にしたか」を `content_hash` 付きで記録する。書かなかった事実も `omitted` として理由 (配信日より後の出来事、相対的な時点表現など) ごと残す。lint は claims の連番、節との対応、raw の hash と行数を機械検査する。

### 文体を機械向けに倒す

verifier を回して分かったのは、人が読みやすい散文ほど raw に無い関係を作ってしまうことだ。「一方」「ただし」「そのため」のような関係語は、raw に書かれていない因果や対比を文の側で足してしまい、両 verifier が unsupported を出す。

そこで本文の形は「出来事の 1 文 + bullet」に固定し、文を事実ごとに独立させて claims の 1 行と対応させた。page の本文は検証しやすさを優先した機械向けの表現で、人向けの読みやすさは Query の統合回答と build 時の表示に委ねる、という割り切りである。

欠陥の型で多いのは、意向や見込みの断定化 (`intend to` を「予定」と書く)、限定語の脱落 (`currently` / `yet` / `only`)、判断の断定化 (`I think` / `seems to be`)、主体の取り違えで、事実そのものの取り違えは少ない。2026-10-08 以降は限定語の列挙と照合手順の合成を verifier の手順に組み込み、ep214 の 36 page は初回に 50% の page で欠陥が出たが、修正 round 3 回以内に全て両 verifier pass になった。

費用は verifier A (Opus) が 1 page あたり 11 万から 17 万 token で、これが照合の上限を決める。verifier B の検出は A の約 3 割だった。


## Ontology と RDF

### frontmatter の type と relations

全 page の frontmatter に `type` (feature / spec / product / org / person / event / concept / venue の 8 種) と `relations` (`shipped-in` / `part-of` / `depends-on` / `proposed-by` / `related` など 8 種) を持たせ、lint が語彙と domain / range を検査する。wiki は Markdown の集まりであると同時に、graph として query できる。

ただ、schema を入れただけでは graph はほぼ空だった。426 page に対して edge は 39 本、degree 0 が 85% である。そこで並列 agent が proposal を JSONL で出し、evidence の verbatim 照合と行単位の mention 照合を gate にして適用する 2 相の backfill を回し、371 edge を足して degree 0 を 31% まで下げた。

relation には 1 本ごとに `evidence` を必須にした。page 全体の出典だけでは、個々の relation の根拠を特定できないためだ。`source` は同じ page の `## 出典` にある raw と文字列一致しなければならず、裏付けられない relation は捏造せず削除する。この `EVIDENCE_ENFORCED` は raw-only への転換と同じ commit で反転した。

### RDF / SHACL / PROV-O

Markdown + frontmatter を唯一の authoring source に保ったまま、`build:wiki` が N-Quads / Turtle / JSON-LD を決定的に生成し、SHACL 1.0 で検証する。目的は、独自の query script を知らない外部の RDF ツールでも、標準 vocabulary (RDFS / OWL / SKOS / PROV-O) で同じ graph を読めるようにすることだ。

- entity の IRI は `https://wiki.mozaic.fm/id/<slug>/#entity` で、category 移動や URL 変更でも変わらない。`/id/<slug>/` には identity document の HTML も生成する
- relation 1 本は forward triple と materialized inverse triple の 2 本に展開する。reasoner を持たない consumer がどちらの向きから辿っても同じ edge 集合を得られるようにするためで、`owl:inverseOf` の宣言だけでは足りない
- relation 1 本ごとに `mw:Claim` (PROV-O) を出し、`prov:wasDerivedFrom` に元 URL、`mw:observedIn` に掲載回を持たせる。raw のパスは RDF に漏らさない
- category は SKOS の ConceptScheme として表す。OWL は `owl:Class` / `owl:inverseOf` / `owl:SymmetricProperty` の安全な公理だけに絞り、`aliases` の `owl:sameAs` 化や category の `rdfs:subClassOf` 化はしない
- TypeScript の closed-world validator と SHACL の shape validation は一部意図的に重複させ、片方のバグが片方だけを通り抜けないようにした

graph は `https://wiki.mozaic.fm/ontology/graph.{nq,ttl,jsonld}` で公開している。


## TC39 系統

Platform の中に TC39 の提案 page があったが、提案の正典は tc39/proposals で、議事録は tc39/notes にある。これらを raw の submodule として取り込み、第 3 の系統 `tc39` を新設した。

- 会合単位で ingest する。Show Note 単位ではなく、最新の会合から遡って owner が指示する
- page は proposals / meetings (会合 README と日次 page) / people / families の 4 種で、提案 page の途中状態は coverage marker で表す
- 人物は 36 page で、議事録中の略号を公開 route に使い、本文中の略号も build 時に人物 page へ link する
- platform 側の TC39 提案 12 page を tc39 側へ移し、claims を byte 不変で移送して旧 URL は互換 HTML で残した

2026-07 の第 115 回会合を pilot として、提案 25 page (新規 13)、日次 3 page、人物 36 page を作った。ここも raw-only と claims と二重照合を初日から課している。


## 公開 UI と情報設計

### SSG

wiki は `build:wiki` が静的 HTML に生成し、h2o が working tree から直接配信する。公開するのは page だけで、raw、claims、log、非公開 manifest は `.dist/` へ一切 copy しない。生成は hash 世代 + symlink swap の atomic publish で、全 page が 404 になる窓を消した。

JavaScript が無効でも navigation は全て通常の link で成立する。検索は同一 origin の bounded な JSON (title / aliases / href / system / category / episodes だけ) を読む optional enhancement で、desktop は sticky sidebar、mobile は同一 DOM を Popover として開く。

wiki.mozaic.fm は専用 IPv6 上の QUIC/HTTP/3 only で、TCP 443 を listen しない。経緯は[ネットワーク編](/entries/2026-09-17/mozaic-v4-network.html)に書いた。

### 番組分類と閲覧階層を分ける

category は「番組のどのコーナーで扱ったか」の分類で、閲覧の階層とは別の軸だ。例えば W3C の下に Working Group があり、その下に仕様があり、仕様は複数のブラウザの Intent に現れる。category だけでは、この階層を辿る導線が作れない。

そこで `navigation.json` で閲覧用の primary path と追加掲載を category の上に重ねる構成にした。category、frontmatter、relation、claims、RDF には触れない。これで TC39 / W3C / Chrome / Firefox / Safari の hub と局所 navigation、Chrome / Firefox の 12 種別の Intents 一覧、Safari の Technology Preview / Releases 一覧、記事目次、episode との往復ができた。

現在の閲覧階層は次のとおり。

```
Home
├── Platform
│   ├── Chrome
│   │   ├── Intents
│   │   │   ├── Ship
│   │   │   ├── Prototype & Ship
│   │   │   ├── Prototype
│   │   │   ├── Deprecate
│   │   │   ├── Remove
│   │   │   ├── PSA
│   │   │   └── Other
│   │   └── Topics
│   ├── Firefox
│   │   ├── Intents
│   │   │   ├── Ship
│   │   │   ├── Prototype & Ship
│   │   │   ├── Prototype
│   │   │   ├── Deprecate
│   │   │   ├── Remove
│   │   │   ├── PSA
│   │   │   └── Other
│   │   └── Topics
│   ├── Safari
│   │   ├── Technology Preview
│   │   └── Releases
│   ├── Edge
│   ├── W3C
│   │   ├── Working Groups [section]
│   │   │   └── CSSWG
│   │   │       └── Specifications & Proposals [section]
│   │   │           ├── CSS Logical Shorthands
│   │   │           └── CSS var() Fallback
│   │   │               └── → ep174 / Sources
│   │   ├── Specifications & Proposals [section]
│   │   ├── Meetings & Events [section]
│   │   │   └── TPAC 2026 / …
│   │   ├── About W3C
│   │   └── Related Organizations [section]
│   │       └── → WHATWG
│   └── WHATWG
├── Ecosystem
│   ├── Framework
│   ├── Library
│   ├── Toolchain
│   ├── Runtime
│   └── …
├── TC39
│   ├── Meetings
│   │   └── 2026-07
│   │       ├── 2026-07-20
│   │       ├── 2026-07-21
│   │       │   └── Topics [section]
│   │       │       └── → Proposals / Related Episodes
│   │       └── 2026-07-22
│   ├── Proposals
│   │   └── Async Iterator helpers
│   │       └── → Meeting Topics / Related Episodes
│   ├── People
│   └── Families
└── Episodes
    ├── ep214
    │   └── → Topics / Meetings / Intents / Show notes
    └── ep174
        └── → Topics / Intents / Show notes
```

最大の page は Chrome の Ship 一覧で 932,777 bytes / 31,002 DOM node あるが、390 CSS px の dark theme でも axe 0 件、横 overflow 0 で収まっている。

本文の typography は show note 用の `.episode-body` から `.wiki-prose` に切り離し、散文向けに文字サイズ・行間・list・見出しの段差を定め直した。


## Build と gate

wiki の build は本体サイトの build とは独立した生成物だが、本体の episode page は wiki の該当 entity に build 時に link を張る。当初は `build:content` が wiki corpus 全体を読んでいたが、episode 対象 page の frontmatter に本文から導いた `title` と `episodes` を持たせ、軽量 reader が frontmatter だけを読む形に変えた。warm cache の `build:content` は 4.8-5.6 秒から 0.8-1.4 秒になった。

`build:wiki` 自体は、入力の bytes と生成物の tree hash が前回と一致すれば生成処理全体を省略する。Bun では生成コードの fingerprint を import graph から作るので、graph 外の app code だけを変えた deploy も skip できる。forced build は Mac で 12.6 秒から 11.0 秒 (RDF / SHACL は 2%) で、9 秒の目標は未達のまま閉じた。

lint (`lint:wiki`) は frontmatter の schema / 語彙 / domain-range、evidence の実在と mention、claims の連番 / hash / 行数、pending marker の文言、本文と frontmatter の一致、SHACL を検査する。build もこれを通し、違反は hard failure にしている。gate が無いと LLM は静かに規約から逸れるので、「規約は lint として書く」を徹底した。


## 現状と評価

2026-10-09 時点の規模は次のとおり。

| 項目 | platform | ecosystem | tc39 | 合計 |
| --- | ---: | ---: | ---: | ---: |
| page | 361 | 203 | 65 | 629 |
| 本文あり (re-ingest 済み) | 155 | 87 | 15 | 257 |
| 骨格のまま (pending) | 199 | 115 | 10 | 324 |
| claims (根拠行) | 3,435 | 2,707 | 349 | 6,491 |
| relations | 295 | 180 | - | 475 |

対象回は ep169 から ep217、raw は 3,387 file である。

精度の面では、本文を持つ page は全文が raw の行に対応し、二重照合を通っている。Show Note の解釈や agent の知識は構造上入らない。

一方で限界もはっきりしている。

- 本文の無い page が半分ある。読者から見ると最も目立つ欠点で、精度以前の問題である
- 照合手順を固める前に書いた 172 page には、限定語や相の脱落が約半分に残る見込みで、再照合を進めている。1 page 8.3 分で全体 24 時間の見積もりである
- 本文は機械向けの文体で、人が読む文章としては硬い。人向けの出口 (回ごとの要約 page か Query の統合回答の保存) はまだ無い
- graph が薄い。42% の page が孤立している。entity 間の関係は claims にはあるが frontmatter の graph には写っていない

方針としては、新しい回は配信ごとに ingest と re-ingest を同じ日に回して本文まで作り、骨格のまま積まない。旧 page は消して作り直さず再照合で直す。


## Outro

LLM に知識を蓄積させる、というと要約を溜めることを想像しがちだが、実際にやってみると「書いてあることが出典に遡れるか」を機械で担保する部分が本体だった。

raw を script で固定し、本文の 1 文ごとに raw の行を claims として記録し、relation に evidence を必須にし、lint と SHACL で逸脱を止める。この gate を揃えて初めて、LLM に書かせた page を信頼して積めるようになった。文体が硬くなったのはその代償で、人向けの出口は次の課題である。

番組で扱った話題が、どの回で、どの出典を根拠に、どう動いたかを辿れる場所として、今後も育てていく。
