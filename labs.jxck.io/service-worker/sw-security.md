# Service Worker Security Consideration

## 6.1 sercure context

localhost, 127.0.0.0/8, and ::1/128 for development purpose 以外は https


## 6.2. Content Security Policy

CSP や Report-Only があれば尊重することで、 XSS を緩和


## 6.3. Origin Relativity

This section is non-normative.

SW は CDN だめ、ただし importScripts は良い


## 6.4. Cross-Origin Resources and CORS

This section is non-normative.

CORS Request をキャッシュしたりそこから返すことはできるが、
それをプログラマブルに操作したりはできない。


## 6.5. Implementer Concerns

Plugin を SW で読んでは行けない
Plugin は独自のセキュリティコンテキストを持つかもしれないから

実装、色々気をつけてね。


## 6.6. Privacy

ストレージ周りは、ユーザがいつでもパージ(コントロール)できるようにしよう。
