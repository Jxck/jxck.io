# Referrer-Policy の制限を強めると安全になるという誤解

## Intro

`Referrer-Policy` は、送信される `Referer` の値を制御することが可能だ。

このヘッダの副次的な効果がよくわかってないと、「`no-referer` にして送らないのが最も安全だ」という勘違いを産むことになる。

## Referrer-Policy

`Referrer-Policy` には複数のディレクティブがある。

- no-referrer
- no-referrer-when-downgrade
- origin
- origin-when-cross-origin
- same-origin
- strict-origin
- strict-origin-when-cross-origin
- unsafe-url

しかし全部を覚える必要はない。以下だけわかっていればいい。

- no-referrer
  - 常に送らない
- origin
  - origin しか送らない
- origin-when-cross-origin
  - same origin の時は path
  - cross origin の時は origin
- no-referrer-when-downgrade
  - downgrade の時だけ送らない
- same-origin
  - same origin の時だけ送る
- strict-origin
- strict-origin-when-cross-origin
  - same origin の時は path
  - cross origin の時は　origin
  - downgrade では送らない
- unsafe-url
  - 常に path を送る