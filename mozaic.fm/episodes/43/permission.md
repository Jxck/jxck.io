# [permission][mozaic.fm] ep43 Permission


## Info

audio: https://files.mozaic.fm/mozaic-ep43.mp3

published_at
: 2018-09-30

guest
: [@toyoshim](https://twitter.com/toyoshim)


## Theme

第 43 回のテーマは Permission です。

今回は [@toyoshim](https://twitter.com/toyoshim) をお呼びし、今議論中の Web における Permission について、何が問題/課題であり、現状どうなっているのか。

実装と仕様の両方の側面から議論し、 Web における Permission の扱いが Web をどのように変えていくのかについて議論しました。


## Show Note

- [Web MIDI API](http://webaudio.github.io/web-midi-api/)
- [Web Audio API](https://webaudio.github.io/web-audio-api/)
- [Web USB API](https://wicg.github.io/webusb/)
  - <https://github.com/mozilla/standards-positions/issues/100>
- [Web Bluetooth](https://webbluetoothcg.github.io/web-bluetooth/)
- [W3C Workshop on Permissions and User Consent](https://www.w3.org/Privacy/permissions-ws-2018/cfp.html)
  - 2014 年いらい 2 回目の開催
- [builderscon 2018](https://youtu.be/_LzSBr99kkw)
  - builderscon 2018 での発表
- [Permissions API](https://w3c.github.io/permissions/)
  - permission api には push がある
  - chrome が web push で問い合わせるのは notification の permission
  - chrome の site settings 一覧には notification の permission は無い
- [Feature Policy](https://wicg.github.io/feature-policy/)
  - 許可の付与以外に、 iframe 内への権限委譲にも使われる
  - <https://blog.jxck.io/entries/2018-03-08/feature-policy-permission-delegation.html>
- [gpuweb/gpuweb: Where the GPU on the Web work happens!](https://github.com/gpuweb/gpuweb)
  - apple が提案しているため Metal ベース
- [Writable Files API](https://github.com/WICG/writable-files/blob/master/EXPLAINER.md)
  - セキュリティモデルについては TODO のまま
- [Web Budget API](https://wicg.github.io/budget-api/)
  - すでに作業は終わり、ブラウザからも消され始めている
  - <https://blog.jxck.io/entries/2017-06-12/web-budget-api.html>
- [883038 \- Feedback: Eliding www/m subdomains \- chromium \- Monorail](https://bugs.chromium.org/p/chromium/issues/detail?id=883038)
  - chrome69 で `www.`, `m.` のサブドメインを非表示にする変更が一度入った
  - フィードバックを元に 70 で改善予定とのこと
- [Signed HTTP Exchanges](https://tools.ietf.org/id/draft-yasskin-http-origin-signed-responses-02.html)
- [Mozilla Specification Positions](https://mozilla.github.io/standards-positions/)
  - 各 API に対する mozilla の態度を示すページ
  - 現時点で signed http exchange のみ harmful となっている
- [draft\-nottingham\-how\-did\-that\-get\-into\-the\-repo\-00 \- The secret\-token URI Scheme](https://tools.ietf.org/html/draft-nottingham-how-did-that-get-into-the-repo-00)
  - Cookie を再設計したい話
- [TCP and UDP Socket API](https://www.w3.org/TR/raw-sockets/)
