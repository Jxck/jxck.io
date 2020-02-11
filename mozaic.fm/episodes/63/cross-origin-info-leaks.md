# [cookie][site isolation][security][mozaic.fm] ep63 Cross Origin Info Leaks

## Info

audio: https://files.mozaic.fm/mozaic-ep63.mp3

published_at
: 2020-02-11

guest
: [@shhnjk](https://twitter.com/shhnjk)


## Theme

第 63 回のテーマは Cross Origin Info Leaks です。

今回は [@shhnjk](https://twitter.com/shhnjk) さんをお迎えし、 Spectre で発覚した Side Channel Attack と、対策として出てきた Site Isolation や増えてきた `Cross-Origin-*` 系のヘッダ郡。

今の Web はどういう脅威と戦い、これらの仕様や実装は何を目的として提案されたのか。

Origin を守るための Web の戦いと、そこから見える Web や Browser のアーキテクチャの今後について議論します。


## Show Note

- Spectre
  - <https://spectreattack.com/>
  - A year with Spectre: a V8 perspective · V8
    - <https://v8.dev/blog/spectre>
  - What Spectre and Meltdown Mean For WebKit
    - <https://webkit.org/blog/8048/what-spectre-and-meltdown-mean-for-webkit/>
    - webkit による解説と対策の紹介
  - Jake Archibald
    - <https://twitter.com/jaffathecake/status/948879579397214208>
  - A Spectre-shaped Web 👻🕸️ (BerlinSec)
    - <https://docs.google.com/presentation/d/1sadl7jTrBIECCanuqSrNndnDr82NGW1yyuXFT1Dc7SQ/edit>
  - Mitigating Side-Channel Attacks - The Chromium Projects
    - <https://sites.google.com/a/chromium.org/dev/Home/chromium-security/ssca>
- Site Isolation
  - <http://www.chromium.org/Home/chromium-security/site-isolation>
  - Post-Spectre Threat Model Re-Think
    - <https://chromium.googlesource.com/chromium/src/+/master/docs/security/side-channel-threat-model.md>
  - Hack Patch!: ブラウザ セキュリティの近状
    - <https://shhnjk.blogspot.com/2017/12/Browser-Security.html>
  - Chrome Rewards – Application Security – Google
    - <https://www.google.com/about/appsecurity/chrome-rewards/index.html#special>
    - Site Isolation はバグを見つけると報奨金も高い
- Out Of Renderer CORS
  - <https://www.chromestatus.com/feature/5768642492891136>
- CORB(Cross Origin Read Blocking)
  - <https://fetch.spec.whatwg.org/#corb>
  - 秘情報を含む json などのリソースが img などで意図的に取得される場合
  - 全部ではなくても先頭部分だけメモリに展開されても、サイドチャネルで読めてしまう
  - そこで cors のついてない Content-Type がずれたコンテンツは一切読み込まない
  - Cross-Origin Read Blocking for Web Developers - The Chromium Projects
    - <https://www.chromium.org/Home/chromium-security/corb-for-developers>
  - Fetch: CORB - Issue #81 - mozilla/standards-positions
    - <https://github.com/mozilla/standards-positions/issues/81>
  - Cross-Origin Read Blocking (CORB) - Issue #681 - whatwg/fetch
    - <https://github.com/whatwg/fetch/issues/681>
- CORP(Cross-Origin-Resorce-Policy) (was Form Origin)
  - <https://fetch.spec.whatwg.org/#cross-origin-resource-policy-header>
  - same-origin/same-site などを指定
  - そのリソースが別の Origin/Site で取得されることを防ぐ
  - Chrome の場合は Renderer Process に渡されないなど
  - CORB の opt-in 版で CORB で防げないものを防ぐ
  - Cross-Origin-Resource-Policy (was: From-Origin) - Issue #687 - whatwg/fetch
    - <https://github.com/whatwg/fetch/issues/687>
  - Fetch: From-Origin #80
    - <https://github.com/mozilla/standards-positions/issues/80>
- COOP(Cross-Origin-Opener-Policy) (was Cross Origin Window Policy)
  - 自分が開かれたときに window.opener をなくせる
  - 前のページとのリファレンスが無くせるため、新しく開いたページを別 Process に isolate できる
  - なお、開く側が次のページとのリファレンスを無くす場合は、 `rel=noopener` を指定
  - Restricting cross-origin WindowProxy access (Cross-Origin-Opener-Policy) - Issue #3740 - whatwg/html
    - <https://github.com/whatwg/html/issues/3740>
- COEP(Cross-Origin-Embedder-Policy) (was Cross Origin Resource Resource Policy)
  - <https://mikewest.github.io/corpp/>
  - iframe などで取得する全てのリソースに CORP を強制できる
- CORP+COEP+COOP を組み合わせる
  - ページを展開した際に Isolation された Process に展開できる
  - サブリソースも読み込みが許可されたものだけであることが保証できる

- Fetch Metadata (was Sec-Site/Sec-metadata)
  - リクエストに 4 つのデフォルトヘッダが追加される
  - Fetch Metadata Request Headers - Issue #88 - mozilla/standards-positions
    - <https://github.com/mozilla/standards-positions/issues/88>
  - `sec-metadata` - Issue #280 - w3ctag/design-reviews
    - <https://github.com/w3ctag/design-reviews/issues/280>
- Same Site Cookie
  - <https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-05#section-5.3.7>
  - 別 Site に Cookie が飛ばないようにする
- schemeless/schemefull same site
  - <https://lists.w3.org/Archives/Public/public-webappsec/2019Nov/0004.html>
  - same site = TopLevel ドメインが同じ、において、 scheme を意識するかしないかを明確にする
- Origin Isolation
  - <https://github.com/domenic/origin-isolation>
- Securer Contexts
  - <https://github.com/mikewest/securer-contexts/>
- Securing your extensions against compromised renderer processes
  - <https://groups.google.com/a/chromium.org/d/msg/chromium-extensions/0ei-UCHNm34/lDaXwQhzBAAJ>
  - あまり関係ないドキュメントだが、Compromised renderer processの定義が書いてある
- Possible side-channel information leak using IntersectionObserver
  - <https://github.com/WICG/ScrollToTextFragment/issues/79>
- XS-Leaks
  - <https://github.com/xsleaks/xsleaks>
  - sirdarckcat: [🌐💧💥] HTTP Cache Cross-Site Leaks
    - <http://sirdarckcat.blogspot.com/2019/03/http-cache-cross-site-leaks.html>
  - Cache and Error Events
    - <https://github.com/xsleaks/xsleaks/wiki/Browser-Side-Channels#cache-and-error-events>
    - 一度キャッシュを POST などで消す
    - prerender などで目的のサイトをレンダリングさせる
    - refere にすごく長い URL をセットしてリクエストさせる
      - キャッシュがあれば普通にヒットする
      - なければサーバに行き、通常エラーになる
      - この結果でキャッシュの有無がわかる
    - たとえば特定の人の画像があるかどうかで、友達かどうかわかるなど
    - chrome が referer の長さを 4K に制限したのはこれの対策
      - <https://www.chromestatus.com/feature/5648956820291584>
  - Twitter Silhouette 攻撃
    - <https://blog.twitter.com/ja_jp/topics/company/2018/twitter_silhouette_JPN.html>
    - リクエストにかかる時間を観測し、レスポンスの大きさを調べる
    - ブロックしてたりすると、固定ページで、レスポンスが小さいが、フォローしてると TL が取得できる
    - これを観測しブロック関係などを推測する
  - どちらも Same Site Cookie などが有効
- Stephen Röttger \| OffensiveCon
  - <https://www.offensivecon.org/speakers/2020/stephen-roettger.html>
