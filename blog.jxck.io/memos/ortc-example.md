# ORTC の Example はどう書くべきか

## ORTC の Example が糞コード問題

- ローバル変数共有モデル
- 特に help してない helper.js に固執
- JS として間違っている
- どこが本質なのか読み解けない
- もちろん動かない


## メンテナ

- ちなみにメインは Hookflash の人
  - 仕様の文面を考える人
  - IETF 系のプロトコルギークの人
  - JS よくわからんと言っている


## わからないのはしょうがない

- PR しまくる日々
  - 最初は Typo から
  - 徐々に HTML の整形から
  - ほぼ全体を整形した PR が通るくらいにはなった
- 徐々に Example へ
  - 完全な構文ミスから
  - ちょっとづつ直す
  - 「お前の方が上手くできると思うんだけど？」
  - 「そう思う」
  - やるか


## さて、どう書こうか

- どういうスタイルで Example を書くべきか？


## ORTC

- Edge でしか動かない
  - Edge で動けば良い？
- 将来的に WebRTC にマージして WebRTC NV
- Promise も部分的に入ってる

## Edge

- Edge にまだ無い
  - default function
  - destructuring

- 他はだいたいある

# Example とは

- 目的
  - API の呼び方を例示する
  - API の呼び出し順を例示する
  - 全体を書く必要は無い
  - そのまま動作する必要は無い
- 性質
  - 見られる可能性が高い
  - 参考にされる可能性がある
  - コピペされる可能性も高い

- 自分のチームであればガイドラインを決めれば良い
- Example の敷居を上げる訳にはいかない


# モダンであるべきか？

- モダンかどうかは本質ではない
  - 新しい機能を使うと記述を少なくできる
  - 記述が少ないと、本質が見やすくなる
  - Example を通じて世界の JS の底上げ
  - だって標準でしょ？
- 新しすぎると読めない
  - 「俺の知ってる JS と違う」問題


## どこまでついて来れるだろうか？

### level 1

- let/const
- arrow function
- template string
- Array.prototype.*
- 単発系 callback を promise で wrap
- object shorthand

-----

- for-of
- async/await
- class
- (Map?)


### 番外

- module !!?


# 割と新しいドラフト

- WebRTC
- https://fetch.spec.whatwg.org/


# お前らの JS は今どこだ？
