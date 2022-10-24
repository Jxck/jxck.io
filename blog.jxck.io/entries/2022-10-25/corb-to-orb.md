# [orb][corb][isolation][spectre][security] CORB から ORB へ

## Intro

CORB (Cross Origin Read Blocking) が Fetch の仕様から消え、後継の ORB (Opaque Response Blocking) が策定作業中である。

ここでどのような変更が起こっているのかを調査し、記録する。


## CORB

CORB はもともと、 Spectre に端を発する Site Isolation の走りとして始まった。

Spectre のサイドチャネル対策のためには、本来アクセスできてはならない Cross Origin のリソースが、同一のプロセスに展開されることを防ぐ必要がある。

CORS で行われるなら良いが、 no-cors な読み込みが可能なリソースでは、その読み込みが安全かどうかは別途確認する必要がある。

そこで、リソースをメモリ上に展開するためだけの、攻撃用途くらいしかあり得ないようなリソース読み込みをブロックする対策が行われた、これが CORB だ。

```html
<!-- 通常はあり得ないがメモリ上にリソースを展開できるコード -->
<img src="https://example.com/secret.html">
```

これは CORB が Opt-In ではなくブラウザの Intervention であることを意味し、もちろん全てのケースを防ぐことはできない。

例えば、 JS を Script タグに読むことは防げない。そこで、そうした CORB で防げないものは、 CORP/COOP/COEP を用いて Opt-In で対策する必要がある。


## Allow List と Block List

Opt-In の CORP/COOP/COEP は、ヘッダの指定が整合していなければブロックするだけなので、仕様は比較的シンプルであるが、Intervention として防ぐ CORB は、ブラウザが「何をどういう条件でブロックするのか」を定義する必要がある。

その定義の方法として、 CORB は「このケースでは読み込みを許可しない」という Block List の形式で定義がされていた。

そして、 Mozilla は CORB を実装しておらず、その理由として Standard Position の中で以下のように示している。

> Blocklist certain opaque responses based on MIME type and return an 'emptied' response instead.
> While this is an important aspect of a robust Spectre-defense, we would like to see a safelist-based approach pursued, e.g., Opaque Response Blocking.
> --- https://mozilla.github.io/standards-positions/#corb

Mozilla は、 Spectre 対策として仕様の目的自体には理解を示す一方、 Block List 方式の仕様である点を指摘し、 Allow List での実装が望ましいとしていることがわかる。

セキュリティ対策の仕様などは通常、 Block List よりも Allow List の方が好まれる。Allow List の方が、それ以外は全部ブロックするため話がシンプルであり、コーナーケースの安全性を担保しやすいためだ。


## ORB

そこで、 CORB をベースに、元 Mozilla の Ann によって Allow List として定義し直されたのが ORB という位置付けのようだ。

- annevk/orb: Opaque Response Blocking (CORB++)
  - https://github.com/annevk/orb

CORB と ORB の違いについては、以下に詳細がある。

- Cross-Origin Read Blocking / Opaque Resource Blocking (CORB/ORB)
  - https://chromium.googlesource.com/chromium/src/+/HEAD/services/network/public/cpp/corb/README.md

大きな違いは以下のように解説されている。

> The fundamental difference between CORB and ORB is that CORB picked specific type mismatches to disallow,
> while ORB enumerates the data formats that we expect to occur in "no-cors" requests and blocks the rest.
> This makes ORB a better fit for our security requirements.
> It also makes ORB a much bigger risk for web compatibility.
> --- https://chromium.googlesource.com/chromium/src/+/HEAD/services/network/public/cpp/corb/README.md

仕様を比較してみると、 ORB にも `blocklist` な変数が定義されているため、一見両方とも Allow と Block を併用してるように見えるが、ステップの最後が `allow(true)` を返すか `deny(false)` を返すのかの違いが大きいということのようだ。

- Define opaque-response blocking by annevk · Pull Request #1442 · whatwg/fetch
  - https://github.com/whatwg/fetch/pull/1442/files
- Remove CORB by annevk · Pull Request #1441 · whatwg/fetch
  - https://github.com/whatwg/fetch/pull/1441/files

また、これらの仕様は最終的には Fetch 側にマージされることになる。現状 CORB はすでに削除されており、 ORB はまだレビュー中でマージされてない。

CORB にしても ORB にしても、大抵は攻撃に使われるようなおかしな読み込みを防ぐという目的でありながら、それによって成り立っていた既存の実装があった場合に、 breaking changes になる。そこで Chrome は、まずは ORB v1.0 というサブセットを作り、そこから展開していく計画のようだ。

- Intent to Ship: Opaque Response Blocking (ORB, aka CORB++) v0.1
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/ScjhKz3Z6U4/m/I6KIhSnyBAAJ


## Outro

CORB もそうだったが、 ORB でも既に動いていたものが動かなくなる可能性をはらんでいる。

レスポンスするリソースに対し、適切な MIME を指定し、適切な方法(HTML タグなど)で読み込む。という基本的なことを実施できていれば、引っかかることは少ないと思われる。

逆を言えば、引っかかった場合は `Content-Type` の適切な指定がなかったり、なにかしら適切でない読み込みが行われいる可能性があるため、配布/読み込みの方法を見直すとよさそうだ。

また、 CORB/ORB はあくまで「おかしな読み込み」を防ぐことを目的とし、正常な読み込みによって発生する攻撃は防げない。そこを防ぐためには、 Opt-In での CORP/COOP/COEP などに Opt-In で対応していく必要があるだろう。


## DEMO

以前作成した CORB エラーのデモがそのまま使えると思われる。

- https://labs.jxck.io/site-isolation/cross-origin-read-blocking/index.html

Canary M109 で試した時点では、エラーメッセージは "CORB" のままだった。これが今後変わるのかは不明だが恐らくこのデモのまま確認できると思われる。


## Resources

- Spec
  - https://github.com/annevk/orb
- Explainer
- Requirements Doc
- Mozilla Standard Position
  - https://mozilla.github.io/standards-positions/#corb
- Webkit Position
  - https://github.com/WebKit/standards-positions/issues/64
  - 執筆時点で回答なし
- TAG Design Review
  - https://github.com/w3ctag/design-reviews/issues/618
- Intents
  - Intent to Ship: Opaque Response Blocking (ORB, aka CORB++) v0.1
    - https://groups.google.com/a/chromium.org/g/blink-dev/c/ScjhKz3Z6U4/m/I6KIhSnyBAAJ
- Chrome Platform Status
  - https://chromestatus.com/feature/4933785622675456
- WPT (Web Platform Test)
  - https://github.com/web-platform-tests/wpt/tree/master/fetch/corb
- DEMO
- Blog
- Presentation
- Issues
- Other