# [cookie][3pca] 3PCA 7 日目: Cookie2

## Intro

このエントリは、 3rd Party Cookie Advent Calendar の 2 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

ここからは第二幕、人類と 3rd Party Cookie の闘いの歴史を見ていく。

「歴史の話はいらない、早くコードを見せろ」と思っている読者の気持ちもわかるが、この位は知っておかないとまともな闘いはできないだろう。


## Cookie2

この話は、すでに別エントリで詳細に書いたが、このアドベントカレンダーに併せて要点のみを抜粋する。

- Cookie2 とは何か | blog.jxck.io
  - https://blog.jxck.io/entries/2023-08-19/cookie2.html

最初に Cookie の仕様が作られたのは実に 1990 年代に遡るが、それを 1997 年に RFC 化したのが RFC 2109 という仕様だった。

その頃、つまり 1996 年頃には、 Double Click などによるトラッキングの問題が既に上がっており、特にプライバシーについて敏感である EU 圏からのフィードバックは標準化にも影響していた。

今でいう 3rd Party Cookie によるトラッキングは "Unverfiable Transation" (ユーザに認識されてないやり取り)と呼ばれ、ここに「インフォームドコンセント(きちんと説明をし同意をとる)」が要求されていたのだ。

それを反映し RFC2109 では「*デフォルトで 3rd Party Cookie の送信を禁止*」し、ユーザに検証(Verify) する方法を提供するように求めているのだ。

加えてこれを実現する仕様として `Comment` という属性が導入された。これはブラウザが「この Cookie の用途はこうだ」という UI を表示するような目的があった。

```http
Set-Cookie: id=31d4d96e407aad42; Comment="このクッキーは広告の改善などに用います"
```

ここまで読めばわかると思うが、これは今まさしく行われている「Cookie バナーでの同意取得」と全く同じコンセプトだ。今回のテーマである 3rd Party Cookie Deprecation 後に求められている世界が、 20 年以上前に既に仕様に盛り込まれていたのだ。

しかし、互換性の問題があったため、 RFC 2965 では、これらの変更は既存の Cookie と分離して Cookie2 になった。

ところが、 `Set-Cookie2` と `Cookie2` という新しい仕様をデプロイするインセンティブが、サービスにはなかった。あくまで RFC の仕様だけであり、これを強制する法律もなかったからだ。また、広まるまでは `Set-Cookie` / `Cookie` も両方サポートする必要があり、旧仕様も動くのなら新仕様に移行するメリットがない。という悪循環で、結局誰にも使われなかった。

標準化にブラウザベンダが関わってなかったことも問題の一つで、その後ブラウザベンダが主導した改訂では、まるっと仕様から消された。今では知っている人もほとんどない。

また、 3rd Party Cookie のブロックも、仕様の中で行われたが現実的には行われなかった。ここには「広告業界からの反発が多くあった」という話もあれば「Web が壊れるからだ」という話もある。立場によって見え方が違うのはいつものことだ。単に「両方とも事実だ」というだけなんだろう。

## 1990 年代からの問題

大事なのは *トラッキングの問題は今に始まったことでない* ということだ。具体的には 1990 年代まで遡れること、そして、人類はずっと無策で、最近になって大慌てで取り組み出したわけではないことがわかるだろう。

また、当時 Cookie2 の仕様策定に従事し、最終的に 3rd Party Cookie を残すという重要な決断をした Lou Montulli は、以下のように書いている。

> Any company that had the ability to track users across a large section of the web would need to be a large publicly visible company.
> Web の広範囲にわたってユーザをトラッキングする能力を有するには、一般に認知さるほどの大企業である必要がある。
> Cookies could be seen by users so a tracking company can't hide from the public.
> Cookie はユーザが認識できるので、トラッキング会社はそれを隠れて行うことはできない。
> In this way the public has a natural feedback mechanism to constrain those that would seek to track them.
> したがって一般市民は、自分たちをトラッキングしようとする企業を抑制するための自然なフィードバックメカニズムを持つ。
> If 3rd party cookies were disabled ad companies would use another mechanism to accomplish the same thing, and that mechanism would not have the same level of visibility and control as cookies.
> もし 3rd Party Cookie が無効になれば、広告会社は同じことを達成するために別の仕組みを使うでしょう、そしてそれは Cookie よりももっと認識/制御することが難しいメカニズムになりえます。
> We would be trading out one problem for another.
> 今ある問題を、別の問題と引き換えるだけになるでしょう。
> --- https://montulli.blogspot.com/2013/05/the-reasoning-behind-web-cookies.html

この洞察は非常に鋭い。そして、実際にほとんどこの通りのことが、現在にわたって起こっている。

つまり、

- トラッキングは「機能」ではなく「ユースケース」であり、「ユースケース」の規制は法的なアプローチでやるべきだ。
- もし 3rd Party Cookie をブロックすることで、例えばメールアドレスをキーに会社同士が紐付けに使うみたいなことをバックエンドでやりだしたら、もはやブラウザでは制限できない。もしろ制限がかけやすいブラウザ側でやっている方が、まだ将来的には制御の余地が残せる。

「単にブロックすればいい」という考えは、「より悪い結果」を招きうることは、きちんと対処して臨むべき課題だ。この 2 つのアイデアは、今後非常に大事になる。