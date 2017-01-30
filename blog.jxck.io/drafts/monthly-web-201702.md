# [monthly][web] Monthly Web 2017/02

## Intro

今月の Web メモ

## API



- 1/26: [Shared Memory と Atomics が stage 4](http://www.2ality.com/2017/01/shared-array-buffer.html)
  - [ES2017 に入る](http://www.2ality.com/2016/02/ecmascript-2017.html) ことに
- 1/27: [FB のフィードバックでブラウザのキャッシュが改善](https://code.facebook.com/posts/557147474482256)
  - [Chrome は Reload 時のキャッシュの扱いを見直した](https://blog.chromium.org/2017/01/reload-reloaded-faster-and-leaner-page_26.html)
  - FF は挙動を変えることはせず、 Cache-Control: immutable を実装した
  - FB 規模だとベンダとの協力体制のあたり、割と影響力ある
- 1/27: [Edge で WebRTC 1.0 がデフォルト](https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/desktop/15019/)
  - ORTC とは別に互換のために実装してた機能が表に
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
