# [monthly][web] Monthly Web 2017/02

## Intro

今月の Web メモ

## Browser

### Chrome

- Chrome57 Stable
- Chrome58 Beta, Dev, Canaly

- [release](https://chromereleases.googleblog.com/) ([stable updates tag](https://chromereleases.googleblog.com/search/label/Stable%20updates))
- [updates](https://developers.google.com/web/updates/)
- [chromium](https://www.chromium.org/developers/calendar)
- [canaly](https://www.chromium.org/getting-involved/dev-channel)


### Firefox

- Firefox51 Stable
- Firefox52 Beta
- Firefox53 Dev
- Firefox54 Nightly

- [relese](https://www.mozilla.org/en-US/firefox/releases/)
- [nightly](https://www.mozilla.org/ja/firefox/channel/desktop/)


### Safari

- Safari 10.0


- [tech preview](https://developer.apple.com/safari/technology-preview/release-notes/)
- [release](https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Introduction/Introduction.html)


### Edge

- 15019 (Windows Insider Preview (Fast) Desktop)
- 15014 (Windows Insider Preview (Fast) Mobile)
- 15007 (Release date: 01/12/2017)
- 15002 (Release date: 01/09/2017)
- 14986 (Release date: 12/07/2016)

- [change log](https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/)


## API

- 1/26: [Shared Memory と Atomics が stage 4](http://www.2ality.com/2017/01/shared-array-buffer.html)
  - [ES2017 に入る](http://www.2ality.com/2016/02/ecmascript-2017.html) ことに

- 1/27: [FB のフィードバックでブラウザのキャッシュが改善](https://code.facebook.com/posts/557147474482256)
  - [Chrome は Reload 時のキャッシュの扱いを見直した](https://blog.chromium.org/2017/01/reload-reloaded-faster-and-leaner-page_26.html)
  - FF は挙動を変えることはせず、 Cache-Control: immutable を実装した
  - FB 規模だとベンダとの協力体制のあたり、割と影響力ある

- 1/27: [Edge で WebRTC 1.0 がデフォルト](https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/desktop/15019/)
  - ORTC とは別に互換のために実装してた機能が表に
  - [公式ブログ](https://blogs.windows.com/msedgedev/2017/01/31/introducing-webrtc-microsoft-edge/)

- 1/30: [Firefox はしばらくゲームに注力するらしい](http://rockridge.hatenablog.com/entry/2017/01/30/004857)
  - FF51: WebGL default
  - FF52: WASM, SharedArrayBuffer default
  - FF53: 64bit install default

- 1/30: [Cookpad が HTTPS 移行だん](https://speakerdeck.com/kanny/cookpad-dot-com-quan-https-hua-falsegui-ji)
  - CSP レポートは kibana とかの方がいいね、 report-uri.io はダメだ。

- 1/30: [テストドリブン Web 標準化](https://blog.whatwg.org/improving-interoperability)
  - WHATWG の標準化プロセスにおいて、テスト作成とブラウザへのバグ報告を推奨した。
  - 思った以上に上手く回っている
  - [テスト](https://github.com/w3c/web-platform-tests/pull/4611) はスペックメンテナの責務ではなくコミュニティベース。([tes the web forward](http://testthewebforward.org/))

- 1/30: [rendering pipeline のパフォーマンス改善](https://blog.chromium.org/2017/01/performance-improvements-in-chromes.html)
  - re-rendering の領域を局所化

- 1/30: [IETF US 開催に懸念](https://www.ietf.org/blog/2017/01/barriers-to-entry/)
  - IETF Chicago の場所を変えるのは遅いが、来れない人帰れない人もいるかもなので、状況を注視。

- 1/31: [Media Session API](https://developers.google.com/web/updates/2017/02/media-session)
  - Android Chrome で media の再生が便利に
  - [sample](https://googlechrome.github.io/samples/media-session)

- 1/31: [Chrome for iOS](https://blogs.windows.com/msedgedev/2017/01/31/introducing-webrtc-microsoft-edge/) が OSS に
  - Webkit でレンダリングする iOS 用の Chrome が OSS に

- 1/31: [Securitry and Frontend Performance](http://www.oreilly.com/webops-perf/free/security-and-frontend-performance.csp)
  - Web のパフォーマンスとセキュリティをあえて一緒に扱う書籍。 CSP, HSTS, ResourceHints, SW など

- 1/31: [Edge の WebRTC1.0 紹介](https://blogs.windows.com/msedgedev/2017/01/31/introducing-webrtc-microsoft-edge/)
  - ORTC, WebRTC1.0 両サポート、 H.264/AVC は HW Enc/Dec だけど VP8 は Soft だからパフォーマンス注意。

- 2/1: [Chrome for iOS が OSS](https://blog.chromium.org/2017/01/open-sourcing-chrome-on-ios.html)
  - Webkit で レンダリングする iOS 用の Chrome が OSS に

- 2/1: [なぜサポートが終了した Web ブラウザーを使うと危険なのか?](https://blogs.msdn.microsoft.com/osamum/2015/10/08/web-1/)
  - "サポート期間の終了した古い IE に対し、いままでと同じような品質でコンテンツが閲覧できるように精一杯の労力を注いでケアをしても、それはユーザーのためにはならない"

- 2/1: [Etsy での TLS 証明書の扱いかた](https://codeascraft.com/2017/01/31/how-etsy-manages-https-and-ssl-certificates-for-custom-domains-on-pattern/)
  - Custom Domain の場合のパターンが解説されてる

- 2/2: [知っておくべきセキュリティヘッダ](https://blog.appcanary.com/2017/http-security-headers.html)
  - HTTP のヘッダで知っておくべきものリスト

- 2/2: [Front-end Handbook 2017](https://www.gitbook.com/book/frontendmasters/front-end-handbook-2017/details)
  - フロントエンド開発の総合的な知識の本
  - 中身は解説というよりリンク集

- 2/2: [WebVR Rocks](https://webvr.rocks)
  - WebVR のポータル

- 2/2: [Google/Chrome/preload-webpack-plugin](https://github.com/GoogleChrome/preload-webpack-plugin)
  - WebPack で Preload するプラグイン





## Blink On

blink on で色々出たのでこっちにまとめ


- [State of Chrome's Memory](https://docs.google.com/presentation/d/1s8qy_yPrR1Q3AngHnfHFIlIzoDaoLrBAL-Iy0FHeTOY/edit#slide=id.g1c51f9ea06_0_11)
  - Chrome のメモリ周りの実装のまとめ

- [JavaScript preprocessing/precompilation](https://gist.github.com/addyosmani/4009ee1238c4b1ff6f2a2d8a5057c181)
  - JS のソースをサーバ側で Precompile できないかの議事録
  - パースは意外と遅いので、これを速くするどこかの段階までサーバでやっておきたいという話






