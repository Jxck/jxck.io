# [cookie][3pca] 3PCA 18 日目: Cloaking

## Intro

このエントリは、 3rd Party Cookie Advent Calendar の 18 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

今日は、 ITP の迂回で注目された Cloaking について解説する。


## Cloaking

これが今、トラッカーが最も期待している 3rd Party Cookie の迂回技術だろう。

例えば、広告やアナリティクスなどなんらかのトラッカーを 3rd Party として利用している場合は、今後 3rd Party Cookie での連携ができなくなる。

そこで、そのトラッカーサービス自体を自分のサブドメインで運用してしまえば、 eTLD+1 が同じになり、 1st Party で連携できる。つまり `example.com` に対して `analytics.example.com` にトラッカーをデプロイしてしまえば、両者は SameSite になるといった手法だ。

しかし、自分でトラッカーになるサービスをデプロイ/メンテするのは負荷が高いため、ドメインを業者に預け、そこにデプロイしてもらう方が運用する側は楽だ。

ここで用いられるのが Cloaking だ。方法はいくつかある。


### CNAME Cloaking

まず最初に用いられたのは、CNAME を用いる方法だ。

例えば、 ads.example が提供しているトラッカーを、 `analytics.example.com` にデプロイし、 `example.com` と SameSite にしたい場合、 DNS を以下のように設定する。

```
analytics.example.com.    IN    CNAME    deadbeef.ads.example.
```

CNAME で事業者のレコードを参照すれば、そのサブドメインを事業者が運用できるのだ。このように CNAME を預ける方法を CNAME Cloaking (コート預けるクロークのこと)と言う。

これは ITP 迂回の筆頭として問題になったので、 Safari ではもちろん対策がされている。CNAME の先を辿って、最終的に 3rd Party だったら Cookie 付与された Cookie を短命にするといったものだ。


### IP Cloaking

CNAME では Safari にバレてしまうため、次にトラッカーが考えたのがこれを IP にしてしまう IP Cloaking だ。

単純に、トラッカーのサービスの IP を設定するというものだ。

```
analytics.example.com.    IN    CNAME    203.0.113.10
```

大手のトラッカーであれば、 IP がバレるとトラッカー判定されるかもしれないが、事業者が小さければこの方法は判定が難しい。

しかし、トラッカー側にとっては、 IP を変えることができないといった運用上の制限が発生する。


### NS Cloaking

そこでさらに考えられるのが NS の Cloaking だ。

これは、例えば `*.analytics.example.com` のサブドメインを、丸ごとトラッカーに移譲してしまうというものだ。

```
analytics.example.com.    IN    NS    dns.ads.example.
```

これで、トラッカーはトラッキングサービスの運用をある程度自由に行うことができる。

この場合、規模の大きいトラッカーの DNS を丸ごとトラッカー判定するといったことは原理上可能と思われるが、実際にそうした対策が行われているかは不明だ。


## Cloaking のリスク

ドメインオーナーにとっては、一部であれ自分のドメインの管理を外部に移譲することになる。

もし悪質な業者であれば、自社のドメインの上に何か悪質なコンテンツを公開したり、 `Domain` 属性が指定された正規の Cookie を盗むといったことも、不可能ではない。

Web だけでなく、例えばメールなども含めて、もしそのドメインが悪質なものと判定されれば、そのリスクはサービス全体に及ぶだろう。

事業者にドメインを乗っ取られたり、ドメインの価値が毀損されれば、それは 3rd Party Cookie を使えなくなることよりも、大きな損失を生むかもしれない。

いずれにせよ、安易に選ぶべき方法ではないだろう。