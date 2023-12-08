# [cookie][3pca] 3PCA 9 日目: DNT

## Intro

このエントリは、 3rd Party Cookie Advent Calendar の 9 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

今回は、 P3P の後に提案され、非常に似たコンセプトかつ最近まで使われていた DNT について解説する。


## Do Not Track List

6 日目に、トラッキングからのオプトアウト方法は、基本的に三種類あるという話をした。

1. オプトアウトを示す Cookie を保存し、それを送られた広告ネットワークはトラッキングしない
2. トラッキングしている業者のリストを作り、それをブラウザなどに読み込んで設定する
3. ユーザの意図をなんらかの方法で表明する(ブラウザからオプトアウトを示す HTTP ヘッダーなどを送るか、ダイアログで同意をとるなど)。

実際に行われていたのが 1 だったが、ユーザは納得していなかった。

そんな中怒ったユーザは、アメリカの FTC (連邦取引委員会) に 「*Do Not Track リストの作成*」を要求する苦情を出したのだ。

もともと、アメリカでは電話セールスをする業者は番号を届ける必要があり、その番号リストを電話だかに設定すると電話セールスを全てお断りできるという仕組みがあった。これは "Do Not Call リスト" と呼ばれていた。"Do Not Track リスト" は、そのドメイン版を作るように求めているのだ。つまり 2 番の方式だ。

とはいえ、いきなり全トラッキング業者をリストにするのは難しいため、FTC からは「ポリシーの整備」を要求するようなパブコメを出すに一旦は止まり、それに合わせて各社が Privacy Policy を整理した。これを受けて FTC が 2009 年に最終レポートを出したあたりで、この Do Not Track リストの話は下火になった。


## オプトアウト拡張

2009 年に Google は DoubleClick のオプトアウト Cookie を永続化する "Google's Advertising Cookie Opt Out Plugin" という拡張をリリースした。

- Google Analytics Opt-out Browser Add-on Download Page
  - https://tools.google.com/dlpage/gaoptout?hl=en

これに触発されたセキュリティエンジニアの Christopher Soghoian は、他の広告事業者のオプトアウト Cookie を追加した拡張機能を TACO(Targeted Advertising Cookie Opt-Out project)としてリリースした。

- slight paranoia: The History of the Do Not Track Header
  - http://paranoia.dubfire.net/2011/01/history-of-do-not-track-header.html

Christopher は夜な夜な広告ネットワークのオプトアウト Cookie を探し、それを TACO に追加していった。最終的には 100 以上のオプトアウト Cookie をサポートする人気の拡張となった。一方で、彼はこの機能を Firefox に組み込み、リストのメンテナンスから手を引けないか Mozilla に持ちかけた。 Mozilla 側は一定の理解を示すも、リストを維持メンテする方法はスケールしないと難色を示していた。

そこで、 `X-Tracking-Opt-Out` のようなヘッダを標準化し、広告事業者にそれを尊重するように求める方法が模索され始めた。


## Header-based opt-out

Christopher は TACO にまず 2 つのヘッダのプロトタイプを実装した。

```http
X-Behavioral-Ad-Opt-Out: 1
X-Do-Not-Track: 1
```

2 つある理由は、広告会社が以下の両方を Tracking と言っており、その実態が会社によって違ったからだ。

1. トラッキング結果を広告のカスタマイズに使用しないこと
2. トラッキング自体をしないこと

1 だけをオプトアウトしても 2 は続けられる場合があり、この違いはユーザにとって把握が難しい。そこで、両方からのオプトアウトを明示するため 2 つにしたのだ。

2009 年 7 月に彼はこのヘッダを Future of Privacy Forum というミーティングで発表し、業界にスピーチした。しかし、実際にはどの広告会社も興味を示さなかった。

のちに彼は FTC に入ったが、 TACO にこれを入れるのは諦めたようだ。


## 議論の再燃

2010 年 7 月に、 オンラインプライバシーに関する公聴会の中で Do Not Track について言及があったあたりから、再度議論が盛り上がった。

そして、 2010 年 12 月には、 FTC は業界に対して "Do Not Track" システムの開発を求めるレポートを出した。

- FTC Backs a 'Do Not Track' System for Internet - WSJ
  - https://www.wsj.com/articles/SB10001424052748704594804575648670826747094
- FTC Mulls Browser-Based Block for Online Ads | Internet News
  - https://www.internetnews.com/it-management/ftc-mulls-browser-based-block-for-online-ads/

広告業界(当時 $23B 規模)は「すでにオプトアウト Cookie の仕組みがある」「無料のサービスが立ち行かなくなる」としてこれに反対していたが、ブラウザベンダはそれぞれ検証を始めた。

その直後、まず MS が IE9 に Tracking Protection を入れた。これはトラッカーのドメインリストを入れて自動でブロックする、いわゆる 2 の方式だ。

もともと 2008 年頃の IE8 には、 InPrivate Filtering / InPrivate Subscriptions といった同等のブロック機能があったが、 $6B で買収したばかりの aQuantive という広告会社からの圧力で 2010 年初頭 IE8 からその機能が消えていた。それを戻した形になる。

- Microsoft to Add 'Tracking Protection' to Web Browser
  - https://www.wsj.com/articles/SB10001424052748703296604576005542201534546

 FTC は MS を賞賛したが、デフォルトはオフで、リストは自分でどこかからとってくる必要があるため、利用の敷居は低くはなかった。


## Do Not Track Header

"Do Not Track" は標語となり、どう実現するかが各所で議論されていた。 IE のような 2 の方法はスケールしないため、 3 の方法にシフトした。 TACO の試みが再評価され、できたのが DNT ヘッダだ。

```http
DNT: 1
```

P3P はサービスがレスポンスするものだったが、 DNT はクライアントが意思を表示するために送るものであるため、ベクトルが逆になる。

また、その値も `1` だと "拒否"、 `0` だと "許可" という非常にシンプルな仕様だ。

(TACO と関わりをもっていたためだろう)最初に Mozilla が 2011 年 1 月に実装したのをきっかけに、 IE, Safari, Chrome, Opera と、次々と実装していくことになる。

- Firefox Web Tool to Deter Tracking - WSJ (2011/01/24)
  - https://www.wsj.com/articles/SB10001424052748704213404576100441609997236#U4017830322951v
- Microsoft Adds Do-Not-Track Tool to Browser (2011/03/15)
  - https://www.wsj.com/articles/SB10001424052748703363904576200981919667762
- Apple Adds Do-Not-Track Tool to New Browser (2011/04/14)
  - https://www.wsj.com/articles/SB10001424052748703551304576261272308358858
- Opera Desktop Team - Core update with Do Not Track, and mail and theme fixes (2012/02/10)
  - https://web.archive.org/web/20130310122003/http://my.opera.com/desktopteam/blog/2012/02/10/core-dnt-mail-themes

「DNT を送る」といったオプションを有効にすれば、この DNT が飛ぶようになったため、ユーザの意図が示せるようになった。また、デフォルトで送っているわけでもないため、互換性への影響も少ない。

残る問題は、このヘッダを見るトラッカー側だ。


## 広告側の対応

結果から言うと、どの業者もまともにこのヘッダに対応しなかった。

Yahoo や Google などの大手も、プライバシーポリシーの中に「DNT があってもうちは見てません」といったことをはっきりと明示するレベルで、事実上無視されていた。

Google は 2012 年の時点で以下のように表明している。

> At this time, most web services, including Google's, do not alter their behavior or change their services upon receiving Do Not Track requests.

Yahoo は 2014 年にポリシーを更新している。

> web browser Do Not Track settings will no longer be enabled on Yahoo.

- Do not track? Ad industry says: "Do not want"
  - https://web.archive.org/web/20150724042940/http://www.consumeraffairs.com/news/do-not-track-ad-industry-says-do-not-want-062014.html

これもやはり、「DNT に対応するインセンティブがない」というのが実際のところだろう。つまり、守らないといけない法律がなかったのだ。

また、 IE が一部のユーザに DNT をデフォルトで有効にしたことがあり、そのせいで「ユーザの意図の反映とは言えない」という批判があった。

一方 DAA (Digital Advertising Alliance) は、 DNT を Web の標準とすることについて、 W3C が本分を超えて政策にまで関与していると批判した。

結果、広告側の言い分は以下のようになる。

- そもそも DNT で何をオプトアウトしたいのか(トラッキングが嫌なのか、パーソナライズが嫌なのか)ユーザは本当に理解しているかは怪しい
- 無料で運営しているサイトが収益化する方法がなくなると、インターネットは立ち行かなくなる

これは、現在に至って「トラッキングを正当なユースケースとして認めさせたい事業者」の言い分として存在している。

ともあれ結果として DNT は、実装されてはいるが、プライバシー意識の高い人によって虚空に投げられるだけのヘッダになった。


## DNT as Fingerprint Vector

DNT が受信側によってまったく考慮されていないのにも関わらず、ただただ送っているだけの状態になって久しい。最近のでは、DNT の存在が逆にプライバシー問題になるところまで発展した。

例えば、 DNT を送っていない大半の人のリクエストが以下だったとする。

```http
GET / HTTP/1.1
Host: example.com
Accept: text/html
Accept-Language: ja-JP
```

その中で、プライバシー意識の高い 1000 人に 1 人くらいが DNT を送っていたとする。

```http
GET / HTTP/1.1
Host: example.com
Accept: text/html
Accept-Language: ja-JP
DNT: 1
```

逆に目立つことがわかるだろう。

3rd Party Cookie が使えない場合に、代替として Fingerprint を行う際に、他のユーザと "区別" する上で非常に有用なシグナルとなる。つまり、エントロピーの高い Fingerprinting Vector になってしまうのだ。

結果 2019 年に Safari は「DNT は Fingerprinting に使われる以外に用途がなくなったので削除する」と発表した。

- Safari 12.1 Release Notes | Apple Developer Documentation
  - https://developer.apple.com/documentation/safari-release-notes/safari-12_1-release-notes

Chrome, Firefox, Edge は、未だに DNT を送るためのオプションがある。例え形骸化しているとはいえ、 DNT を削除すること自体が「ユーザにとっての選択肢を減らしている」という心情を与えるため、簡単には消せないという問題もあるだろう。

しかし、Fingerprinting Vector であることもさることながら、代替の方法が提案されているため、いずれはなくなるのではないかと考えられる。それについては後ほど解説する。