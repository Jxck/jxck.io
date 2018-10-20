# [tag] ブラウザで何が起こっているのかを知る Reporting API と Reporting Infra の重要性

## Intro

サービスにおいて Logging の重要性は言うまでもなく、通常サーバのアクセスログやエラーログを取得し解析する仕組みは各位保有していることと思う。

しかし、これまでブラウザの中で発生するエラーは収集が難しく、表面的な情報を収集しても原因を解析するのは難しくもあった。

Reporting API は、こうした「ブラウザの中で何が起こったのか」を収集するための枠組みとして成長しつつある。

今後サービス提供時には、こうした情報の収集を行うインフラを整備し、サーバ側のログと同じように解析しフィードバックしていくことが重要になるだろうと筆者は考えている。


## Reporting API

いくつかの話が関わるので、一度全体像をまとめる。

Reporting API は、簡単に言えば「ブラウザの中で起こったこと」を情報として取得する API だ。

取得できる情報は以下のようなものがある。

- CSP Violation
- Feature Policy Violation
- HPKP Violation
- Expect-CT Violation
- Deprecation Report
- Intervention Report
- Crash Report
- Network Error Logging


取得方法は大きく 2 つ有る。

- HTTP Header で指定したエンドポイントに、ブラウザが JSON で POST する
- JS でオブジェクトとして取得しハンドリングする

いずれも、基本的には JSON にシリアライズすることになるだろう。

つまり、サービス側はその JSON を収集するエンドポイントを保有することになる。

JSON を集めるだけなので、収集の難易度はそこまで高くないだろう。

問題はその解析だが、そこにはまだ課題が多いように筆者は感じている。


## Reporting API の経緯


筆者の観測では発端は CSP だ。

CSP で定義したポリシーに違反があった場合、その原因をブロックすると同時に、違反があったことを知りたいという要望が有った。

CSP は HTTP Header で指定するため、そのディレクティブとして、 Report を送信する先を指定する report-uri が定義された。

```http
Content-Security-Policy: default-src 'self' report-uri https://report-uri.example.com
```

CSP は JS の実行をブロックする場合が有るので、その情報は JS で収集するよりも、ブラウザが直接レポートするのは理にかなっている。

その後、 Referrer-Policy など、類似する機能で Reporting を備える API が増えてきた。

すると、個々のヘッダに report-uri を書くよりも、 Reporting エンドポイントをまとめて記述できる Report-To ヘッダを定義し、各 Policy がそれを参照する形に整理することになった。


```http
Report-To: {
            "group": "default-endpoint",
            "max-age": "36000",
            "endpoints": [
                {"url": "https://report-uri.example.com"},
                {"url": "https://report-uri2.example.com"}
            ]
           }
Content-Security-Policy: default-src 'self' report-to=default-endpoing
Feature-Policy: syncxhr 'none' report-to=default-endpoing
```

([Feature-Policy の report-to 対応は議論中](https://github.com/WICG/feature-policy/issues/142))


一方、他にも取得したい情報は増え、必ずしも Policy Header + Report-To の枠組みが適切ではない場合もでてきた。

そこで、 JS でレポートを取得するための ReportingObserver が定義された。

Error に包んで onerror としない理由は、 Report は必ずしも Applicatio Error とは限らず、付加的な情報としてオプトインで処理できることを考慮してだろう。

そうした情報が Observer で提供されるのは昨今の流れだ。


```js
const observer = new ReportingObserver((reports, observer) => {
  navigator.sendBeacon("https://report-uri.example.com", JSON.stringify(reports))
});

observer.observe();
```


これまで、クライアントの情報の収集は、リクエストヘッダを Access Log に残すか、 onerror などをフックして集めるのが基本だっただろう。

しかし、Reporting Observer によって「ブラウザしか知り得ない」情報も取得できるようになった。

こうした情報を取得するために定義されたのが Reporting API という枠組みであり、実際に取得できる情報は徐々に増えている。



## Report-To Header

Report-To ヘッダは、  Reporting エンドポイントの情報を一括して定義する HTTP Header だ。

現在の仕様で Report-To を参照できるのは以下だ。

- Content-Security-Policy
- Public-Key-Pins (基本的にもう使わない)
- Feature-Policy (仕様策定中)
- Network Error Logging











Implement: Suppress exception/error reporting when loading an unknown external protocol
https://groups.google.com/forum/#!msg/mozilla.dev.platform/0KgeG3058NY/EGuve2RWAQAJ


*Implement: Feature Policy Violation Reporting*
Feature Policy によるブロックを Reporting で送る
以前 GitHub で提案したものが通った模様
https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/5-3woY4Y1Qg/xHDTmUFAEAAJ
https://github.com/WICG/feature-policy/blob/master/reporting.md
https://github.com/WICG/feature-policy/issues/142


## Reporting API
https://developers.google.com/web/updates/2018/09/reportingapi


## Reporting Observer


### Deprecation Report

### Intervention Report

*Ship: Intervention Reports*
https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/sQrAZpTA8WI/EWC7W6GOCwAJ
Reporting Observer で取得できる



### Crash Report

*Implement: Crash Reports (via Reporting API)*
- https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/rbqI2wiszyY/RzIx7aIFCQAJ

### Network Error Logging

Ship: Reporting and Network Error Logging
- https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/nNji_u7BRxo/Zh8Y9hRlBAAJ
- https://github.com/WICG/reporting/blob/master/EXPLAINER.md

