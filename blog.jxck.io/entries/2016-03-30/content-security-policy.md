# [csp][security] Content Security Policy 対応と report-uri.io でのレポート収集

## Intro

本サイトにて Content Security Policy を有効化した。

まずは Report Only にて導入し、段階的にポリシーとコンテンツを修正していく方針をとる。

CSP Report については、 [report-uri.io](report-uri.io) を用いて収集することにした。

導入に必要な設定や、注意点についてまとめる。


## Content Security Policy

Content Security Policy(CSP) とは、 Web におけるセキュリティを向上させる非常に強力な仕組みである。

[Content Security Policy 1.0](https://www.w3.org/TR/CSP1/)


具体的には、コンテンツに対し Content-Security-Policy ヘッダを付加することにより、ブラウザに読み込を許可するコンテンツをホワイトリストにより制限することができる。

これは、コンテンツ作成者が意図しない外部スクリプトや、インラインスクリプトを埋め込むことにより攻撃が実現するタイプの XSS を、ことごとく防ぐことが可能になる。


## CSP の設定

CSP を有効にするには、 Content-Security-Policy ヘッダを付与し、その引数にポリシーを指定する。

ポリシーは、コンテンツが読み込み可能な外部コンテンツについての制限であり、以下のような指定が可能である。


```
Content-Security-Policy: default-src 'self'
```

ここで使用されるディレクティブについては、以下に詳細がある。

[CSP におけるポリシーのディレクティブ - Web セキュリティ | MDN](https://developer.mozilla.org/ja/docs/Web/Security/CSP/CSP_policy_directives)


基本的には、同一オリジン以外の外部スクリプトや、 `<script>` 内に直接記述するインラインスクリプトなどを全て除外し、そうしたスクリプトがあった場合も実行を阻止することができる。

また、ポリシー違反があった事実を JSON 形式のレポートとして生成し、指定 URL に送信することが可能である。

このレポートを収集解析することで、攻撃の事実などを知ることができ、対策が可能となる。


## CSP の注意点

もし、先ほど例示した設定をサイト全体に適用した場合、何がおこるかを考えてみる。

```
Content-Security-Policy: default-src 'self'
```

まず、この指定により、インラインスクリプトが全て無効になる。
よくある例として、 Google Analytics のためページ下部に埋め込んだ `<script>` が全て動かなくなるため、アナリティクスが動かなくなる。

他にも、例えば `cdn.jquery.com` などの Public CDN から取得しているスクリプトも軒並み動かなくなる。

スクリプトだけでなく、 `<img>` や `<iframe>` なども注意が必要だ。

特にアド(広告)を貼っている場合は、その広告は表示されなくなる可能性が高い。

同じオリジンから配布している JS でも、内部で `eval()` や、 XHR, WebSocket で別オリジンに接続している箇所は、ポリシー違反になる場合もある。

とにかく、ある程度外部のリソースへリンクしているコンテンツにとっては、前述の制約はかなり厳しいものである。

よって、ここに対してホワイトリストで、信頼するドメインの追加や、幾つかの挙動を例外的に許可する設定を足していくことになる。


## Report Only

脆弱性がなくても、コンテンツの挙動が少しでもポリシーに触れれば、そのページが正常に動作しなくなる可能性がある。

従って、いきなりポリシーを有効にするのはかなり難しいと思われる。

そこで、以降手段として Content-Security-Policy-Report-Only を利用する方法が有る。

これは、ポリシー違反があった場合、レポートだけを送信し、コンテンツの挙動を一切ブロックしないというものである。

指定は、ヘッダ名を以下のように変更するだけである。

```
Content-Security-Policy-Report-Only: default-src 'self'; report-uri http://example.com/csp-report
```

サイトへの影響はないため、まずはこの指定でレポートを収集しながら、影響範囲を把握しポリシーとコンテンツを徐々に改善することができる。

ポリシーが落ち着いたら Content-Security-Policy に移行するフローが導入しやすいだろう。


## report-uri.io

ブラウザは、 CSP に違反した実行を検出した場合、違反レポートを生成し `report-uri` に指定した URI に対して自動的に送信する。

CSP の違反レポートは以下のような JSON データである。


```json
{
    "csp-report": {
        "document-uri": "https://www.jxck.io/",
        "violated-directive": "default-src 'self'",
        "effective-directive": "img-src",
        "original-policy": "default-src 'self';
        "blocked-uri": "https://www.google-analytics.com",
        "status-code": 0
    }
}
```

このレポートは、 Google Analytics の実行がポリシーのホワイトリストに含まれていないことによって発生している。

こうしたレポートにより、どのページの、どの実行が、どのポリシーに違反したかなどが取得できる。


このレポートの収集と解析を行うサービスとして、 report-uri.io というサービスが最近登場した。

[Welcome to report-uri.io](http://report-uri.io/)


登録し、発行された URI を `report-uri` に指定するだけなので、導入は非常に楽である。

ダッシュボードでは、レポートの分析や、ポリシーディレクティブの生成のサポートまで行ってくれるようである。


## 懸念点

本サイトのコンテンツは、全て筆者の管理下にあるため、影響の把握はそこまで難しくはない。

外部コンテンツの取得についても、取得方法の変更や、本サイトオリジンからの配布に変更するなど、対応は不可能ではないだろう。

アドや外部タグの導入も多くはないため、あまり問題はないだろうと思われる。


一番懸念しているのは、例えば本サイト購読者の、ブラウザ拡張やブックマークレットなどへの影響である。

本サイトは技術ブログであるため、購読者もそうしたツールを利用する技術者である可能性が非常に高く、これが問題になるのかどうかは興味がある。

レポートなどを等してそうした事実がわかれば追って報告したい。


## 本サイトでの適用

本サイトでも、まずは Report-Only をサイト全体に適用し、 report-uri.io にてレポートを収集することにした。

一通りエラーを見て回ったところ、以下の点で修正が必要だった。

- *.jxck.io 間でコンテンツをリンクしている
- AMP のカスタムタグを CDN より読み込んでいる
- AMP のカスタムタグがインラインスタイルを使用していた
- YouTube の動画を `<iframe>` で埋め込んでいる
- Google Analytics を設定している
- 一部インラインスクリプト、インラインスタイルを使用していた


基本的には、必要なオリジンをホワイトリストに追加し、インラインスタイル、インラインスクリプトは外部化した。

そして、 AMP のカスタムタグがインラインスタイルを使用している部分は、手を入れることができない。

かといって、全体として `'unsafe-inline'` を許容するのもはばかられたため、 AMP ページのみ `'unsafe-inline'` を許可した。

よって、通常のブログと AMP ページでは以下の出し分けをしている。

```
# normal page
content-security-policy-report-only: default-src self https://*.jxck.io https://www.google-analytics.com ; child-src https://www.youtube.com ; report-uri https://xxx.report-uri.io/r/default/csp/reportOnly

# amp page
content-security-policy-report-only: default-src 'self' https://*.jxck.io https://www.google-analytics.com https://cdn.ampproject.org ; style-src 'unsafe-inline' ; report-uri https://xxx.report-uri.io/r/default/csp/reportOnly
```

今後も収集したポリシーを解析、それを元にコンテンツやポリシーを修正を実施し、ある程度影響が見えてから実際の CSP の適用を再検討したいと考えている。
