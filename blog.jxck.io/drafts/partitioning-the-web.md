# [cookie][security] Web における Partitioning 小史

## Intro

Double Keying Cookie, Cache Partitioning, State Partitoning, CHIPS etc etc

近年起こっている Web Platform の様々な、それでいて見えにくい変化の一部を、 Partitioning というキーワードを軸にまとめてみる。


## Double Keying

筆者が Partitioning というか Double Keying を意識したのは、 Foreign Fetch が仕様から消えたときだったことをはっきり覚えている。

以下の Issue で Jake に教えてもらったのがきっかけだった。

- Remove foreign fetch · Issue #1188 · w3c/ServiceWorker
  - https://github.com/w3c/ServiceWorker/issues/1188#issue-250914006

当時の話は以下のブログにも書いた。 2017 年の話だ。

- Foreign Fetch が削除されそうな理由と Cookie の double keying | blog.jxck.io
  - https://blog.jxck.io/entries/2017-09-19/remove-foreign-fetch.html

ここでは、主に Firefox が独自実装として行っていた Double Keying について言及されている。

- 565965 - (doublekey) Key cookies on setting domain * toplevel load domain
  - https://bugzilla.mozilla.org/show_bug.cgi?id=565965

この Issue は 2010 年に立てられ、 2016 年には閉じられているので、 Double keying の発想自体はもっと昔からあったことがわかる。






## State Partitioning

Firefox が 2021 年 2 月にアナウンスした State Partitioning は以下だ。

- Introducing State Partitioning - Mozilla Hacks - the Web developer blog
  - https://hacks.mozilla.org/2021/02/introducing-state-partitioning/

State Partitioning という言葉は Total Cookie Protection という Firefox のプライバシー保護の取り組みの中で使われる用語とされている。現在では ETP(Enhanced Tracking Protection) の 1 つだ。

ETP は、 Storage Access Policy とよばれる、いわゆる「3rd Party Cookie のブロック」機能を提供しており、トラッキングに使われる Cookie を文字通りブロック(Set-Cookie できないように)する拡張機能だ。この機能は、あらかじめトラッカーを収集し、そのリストをもとにブロッキングを実施していたため、未知のトラッカーに対して無力だったし、リストのアップデートにはコストも時間もかかっていた。

一方 State Partitioning では、 Tracker かどうかに関わらず、全ての 3rd Party のコンテキストを Double Keying (Top Level Frame + Child Frame)で分離することで、これを防ぐというものだ。 Cookie Partitioning ではなく State Partitioning なのは、 Cookie だけでなく様々な Shared Resource を分離することで、 Supercookie などもの含めてまるっと対策するためだ。

これをやれば Tracker を防ぐことができる一方、 SSO が壊れるというのが定番の課題だ。 Firefox では、 SSO Provider が Unpartition する方法として以下を用意している。

- Storage Access API
  - 明示的に API を叩くことで、 Unpartition の条件を満たしているかをブラウザが判断する。場合によってはプロンプトを出しユーザに問い合わせる。ただし、 permission は 30 日に制限。
- Heuristics
  - 例えば、popup に SSO Provider を出してサインインするようなケースを heuristics に判断し許可する
  - あくまで Storage Access API が普及するまでのつなぎ


## CHIPS

CHIPS は、ほぼ Firefox の State Partitioning に相当するものを、 Chrome が Cookie に限定してそのまま標準化提案したものだと思って良いだろう。

Firefox の場合は限定的に Unpartition の手段があったが、 CHIPS にはそれがない。

基本的には、 3rd Party Cookie がブロックされた世界において、 Partition することによって緩和するための仕様という位置づけだ。



## ITP


ITP の特徴は、機械学習によってドメインをトラッカー判定する点だ。ここでトラッカー判定されたドメインは、 3rd Party Cookie について厳しい制限を受けることになる。

ITP も 1.0 で 3rd Party Cookie の Partitioning を入れたが、最終的に 2.1 ではそれらを全て廃止した。つまり、 Partition がゴールでは無く、すくなくともトラッカーの 3rd Party Cookie は完全に読み書きできなくなっている。

1.1 から導入された Storage Access API も、 `allow-storage-access-by-user-activation` でプロンプトの承認が必須となり、 2.3 では二回 deny されると恒久ブロックとなった。




## Outro

deadbeef


## DEMO

動作するデモを以下に用意した。

- <https://labs.jxck.io/>


## Resources

- Spec
- Explainer
- Requirements Doc
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
- Chrome Platform Status
- WPT (Web Platform Test)
- DEMO
- Blog
- Presentation
- Issues
- Other



Safari で Intelligent Tracking Protection (ITP) を扱う方法 - Microsoft Entra | Microsoft Learn
https://learn.microsoft.com/ja-jp/azure/active-directory/develop/reference-third-party-cookies-spas



ストレージ パーティション
https://developer.chrome.com/ja/docs/privacy-sandbox/storage-partitioning/


Tracking Prevention in WebKit
https://webkit.org/tracking-prevention/#intelligent-tracking-prevention-itp
