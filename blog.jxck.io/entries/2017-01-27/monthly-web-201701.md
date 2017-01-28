# [monthly][web] Monthly Web 2017/01

## Intro

月一でその月にあったことをまとめる習慣がついたので、試しにそれを毎月あげてみる。
(HTML/CSS あとで直す)


## Browser

- 1/25 Chrome 56
  - [https://developers.google.com/web/updates/2017/01/nic56](https://developers.google.com/web/updates/2017/01/nic56)
  - scroll イベントの passive 化
  - webvr
  - web bluetooth
  - position: sticky
  - writeable streams
  - HTML5 default
- 1/24 Firefox 51
  - [https://www.mozilla.org/en-US/firefox/51.0/releasenotes/](https://www.mozilla.org/en-US/firefox/51.0/releasenotes/)
  - https://developer.mozilla.org/en-US/Firefox/Releases/51
  - webgl default
  - idb2
- 1/23 Safari 10.1
  - [https://developer.apple.com/library/prerelease/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_1.html](https://developer.apple.com/library/prerelease/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_1.html)
  - fetch
  - idb2
  - custom elements
  - input events
  - form validation
  - async/await
  - grid layout


## News

- Mozilla の new logo
  - [https://blog.mozilla.org/opendesign/arrival/](https://blog.mozilla.org/opendesign/arrival/)
  - フォントも無料公開されるらしい
- マイナンバーサイト 32bit IE/Safari + Java
  - [http://internet.watch.impress.co.jp/docs/yajiuma/1039551.html](http://internet.watch.impress.co.jp/docs/yajiuma/1039551.html)
  - IC カード対応のため止むを得ずらしい
- webpack 2 系（ 2.2 ）正式リリース
  - [https://medium.com/webpack/webpack-2-2-the-final-release-76c3d43bf144](https://medium.com/webpack/webpack-2-2-the-final-release-76c3d43bf144)
  - tree shaking が入った(uglify で消す)
- webcomponents.org がリニューアル
  - [https://www.webcomponents.org/](https://www.webcomponents.org/)
  - API バージョンを v1 にあげた


## API

- Safari が credential management api
  - [https://lists.webkit.org/pipermail/webkit-dev/2017-January/028684.html](https://lists.webkit.org/pipermail/webkit-dev/2017-January/028684.html)
- Blink が ES Modules 実装頑張ってる
  - [https://docs.google.com/document/d/1vjiWxwhg9D0GNNOYgw3AxMG0iKOC9I3jlID4GTgZsac/edit](https://docs.google.com/document/d/1vjiWxwhg9D0GNNOYgw3AxMG0iKOC9I3jlID4GTgZsac/edit)
- display: flow-root で clearfix hack はもういらない
  - [https://rachelandrew.co.uk/archives/2017/01/24/the-end-of-the-clearfix-hack/](https://rachelandrew.co.uk/archives/2017/01/24/the-end-of-the-clearfix-hack/)
- WebKit に WebRTC のコードが
  - [https://trac.webkit.org/changeset/210942](https://trac.webkit.org/changeset/210942)
  - Chrome のコードをもってきてる
- AMP Lite
  - [https://developers-jp.googleblog.com/2017/01/google-amp-cache-and-amp-lite.html](https://developers-jp.googleblog.com/2017/01/google-amp-cache-and-amp-lite.html)
- cache-control: no-transform は無視するらしい(opt-in だからか)
  - Cloudflare の AMP 施策
  - [https://www.cloudflare.com/website-optimization/accelerated-mobile-links/](https://www.cloudflare.com/website-optimization/accelerated-mobile-links/)
- 新しい Google の圧縮ライブラリ Draco と guetzli
  - [https://opensource.googleblog.com/2017/01/introducing-draco-compression-for-3d.html](https://opensource.googleblog.com/2017/01/introducing-draco-compression-for-3d.html)
  - https://github.com/google/guetzli
  - WebVR 系コンテンツ特化とか
- Firefox に input type=date 系実装中
  - [https://twitter.com/mozhacks/status/821005161602646016](https://twitter.com/mozhacks/status/821005161602646016)
  - はやくカレンダーライブラリいらなくなれ
- Webmention が W3C 勧告
  - [https://www.mitsue.co.jp/knowledge/blog/frontend/201701/13_1201.html](https://www.mitsue.co.jp/knowledge/blog/frontend/201701/13_1201.html)
  - [https://www.w3.org/TR/2017/REC-webmention-20170112/](https://www.w3.org/TR/2017/REC-webmention-20170112/)
  - トラックバックの現代版
- Compiling Rust to WebAssembly Guide
  - [https://hackernoon.com/compiling-rust-to-webassembly-guide-411066a69fde](https://hackernoon.com/compiling-rust-to-webassembly-guide-411066a69fde)
  - なんかみんな期待しすぎじゃないか心配もある
- Win10 Insider Preview に WebPayments
  - [https://blogs.windows.com/windowsexperience/2017/01/09/announcing-windows-10-insider-preview-build-15002-pc/](https://blogs.windows.com/windowsexperience/2017/01/09/announcing-windows-10-insider-preview-build-15002-pc/)
- ES proposal: import()
  - [http://www.2ality.com/2017/01/import-operator.html](http://www.2ality.com/2017/01/import-operator.html)
  - どのモジュールが呼んだかを知るため関数ではなくオペレータ
- MiniApp: Why full screen scrolling web apps are so hard
  - [https://docs.google.com/document/d/11kwtjxXelqsIELtHfXDWLWVPrdGJGdy4yvHu-2mGyn4/edit#heading=h.t1ozsjau67fw](https://docs.google.com/document/d/11kwtjxXelqsIELtHfXDWLWVPrdGJGdy4yvHu-2mGyn4/edit#heading=h.t1ozsjau67fw)
  - あとで読む
- Promise の cancel が白紙に
  - [https://github.com/tc39/proposal-cancelable-promises/issues/70](https://github.com/tc39/proposal-cancelable-promises/issues/70)
  - https://medium.com/@benlesh/promise-cancellation-is-dead-long-live-promise-cancellation-c6601f1f5082#.8803mtmd3
  - domenic 大丈夫かな…
  - Aborting a fetch NG ：[https://github.com/whatwg/fetch/issues/447](https://github.com/whatwg/fetch/issues/447)
  - [https://github.com/whatwg/fetch/issues/455](https://github.com/whatwg/fetch/issues/455)
  - https://github.com/whatwg/fetch/issues/455#issuecomment-274869169
- google/ngx_token_binding
  - [https://github.com/google/ngx_token_binding](https://github.com/google/ngx_token_binding)
  - token_binding 実装


## Security

- Google も CA 参入
  - [https://security.googleblog.com/2017/01/the-foundation-of-more-secure-web.html](https://security.googleblog.com/2017/01/the-foundation-of-more-secure-web.html)
  - Global Sign の一部を買っていたらしい
  - 最近の CA インシデントにしびれを切らしたんだろう
- F5 の TLS レポート 2016
  - [https://f5.com/Portals/1/PDF/labs/R065%20-%20REPORT%20-%20The%202016%20TLS%20Telemetry%20Report.pdf](https://f5.com/Portals/1/PDF/labs/R065%20-%20REPORT%20-%20The%202016%20TLS%20Telemetry%20Report.pdf)
- bugzilla.mozilla.org が CSP 適用予定
  - [https://emceeaich.dreamwidth.org/201211.html](https://emceeaich.dreamwidth.org/201211.html)
  - XSRF も対応できるって書いてあったけどこれは勘違い(修正済み)
- Ars が [HTTPS 移行](HTTPS 移行)
  - [https://arstechnica.com/information-technology/2017/01/ars-announces-https-by-default-finally/](https://arstechnica.com/information-technology/2017/01/ars-announces-https-by-default-finally/)
  - forum で起こる mixed-contents は許容という判断 (CGM の宿命か)
- Akamai が OpenSSL の TLS1.3 開発スポンサーに
  - [https://blogs.akamai.com/2017/01/tls-13-ftw.html](https://blogs.akamai.com/2017/01/tls-13-ftw.html)
  - 4 月の 1.1.0 に乗る予定
- Key Transparency
  - [https://developers-jp.googleblog.com/2017/01/security-through-transparency.html?m=1](https://developers-jp.googleblog.com/2017/01/security-through-transparency.html?m=1)
  - [https://github.com/google/keytransparency/](https://github.com/google/keytransparency/)
- GPG を整理的な？
  - [https://onename.com/](https://onename.com/)
  - [https://keybase.io/](https://keybase.io/)
- HSTS meetup
  - [https://docs.google.com/document/d/1d21wtTCQ-a6vN7yDwyhLkuBpgmLoJCKMI7aRrXNBIbI/edit](https://docs.google.com/document/d/1d21wtTCQ-a6vN7yDwyhLkuBpgmLoJCKMI7aRrXNBIbI/edit)
  - 濃ゆい議論があった模様
- HTTPS に移行しない Neverssl
  - [http://neverssl.com/](http://neverssl.com/)
  - example.com あればいらない気もした
- Godaddy の SSL 証明書にドメイン認証の脆弱性があり 8850 件の証明書が失効された
  - [http://blog.tokumaru.org/2017/01/godaddyssl8850.html?m=1](http://blog.tokumaru.org/2017/01/godaddyssl8850.html?m=1)
- autofill で個人情報が意図せず送られる
  - [https://gist.github.com/mala/a53e3f8a0c793a5c7bef2215dd951879](https://gist.github.com/mala/a53e3f8a0c793a5c7bef2215dd951879)
  - [http://gigazine.net/news/20170106-browser-autofill-phishing/](http://gigazine.net/news/20170106-browser-autofill-phishing/)
  - input を隠しとく素朴なやりかた
  - UI でなんとかするらしい
- [HTTPS on NYTimes.com](HTTPS on NYTimes.com)
  - https://open.blogs.nytimes.com/2017/01/10/https-on-nytimes-com/
  - デカイ事例
- Let's Encrypt 順調です
  - [https://letsencrypt.org//2017/01/06/le-2016-in-review.html](https://letsencrypt.org//2017/01/06/le-2016-in-review.html)
  - パンクしないかちょっと心配
- Amazon が CA 参入らしい
  - [https://www.amazontrust.com/](https://www.amazontrust.com/)
  - CA 参入は流行りか
- Edge に Brotli
  - [https://blogs.windows.com/msedgedev/2016/12/20/introducing-brotli-compression/](https://blogs.windows.com/msedgedev/2016/12/20/introducing-brotli-compression/)
  - transport-encoding: br がどのくらい増えるか
