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

しかし全部を覚える必要はない。

- no-referrer
  - 常に送らない
- no-referrer-when-downgrade
  - 常に path を送る
  - downgrade では送らない
- strict-origin-when-cross-origin
  - same origin の時は path
  - cross origin の時は　origin
  - downgrade では送らない
- same-origin
  - same origin の時だけ path


ポリシーの観点は以下だ。

- Same Origin なら Path が送られても問題はない
- 平文通信では送るべきではない

この上で Cross Origin への送信をどうするかを考えることになる。

