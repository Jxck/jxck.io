# [background fetch][pwa] Background Fetch API が消えそうだった話

## Intro

「Background Fetch を使っているのが、世界であなたのサイトだけなんだけど、この機能消しても良い?」

と、TPAC 2025 の会場で、Chrome の Service Worker チームの開発者と話していた際に言われた。


## Background Fetch

Background Fetch は、Service Worker を使って、文字通り Fetch をバックグラウンドで行う機能だ。

特に Android では、ダウンロードの UI にプログレスが表示され、終わったら Cache API に保存されます。

筆者が運営している mozaic.fm のサイトは、Podcast アプリと同じようなことを Web でもできるように PWA 化し、様々な機能を試していた。

- PWA: モバイルでインストールしてアプリとして使える
- Background Fetch: エピソードをダウンロードしておく
- Cache API: オフラインでも聴ける
- Periodic Background Sync: RSS を定期的に取得し、最新エピソードを更新する
- Badge API: 最新エピソードにバッジを表示する
- Content Index: キャッシュしたエピソード一覧を表示する
- Media Session API: ネイティブで音量調節や早送り UI を提供する
- etc

この頃 PWA で追加された機能は、こうしたユースケースをサポートするものだったので、そのナラティブに則って、自分のサイトで試していたものだ。

- mozaic.fm v3 リリースと Podcast の PWA 化 | blog.jxck.io
  - https://blog.jxck.io/entries/2020-05-06/mozaic-v3-release.html
- Podcast over PWA
  - https://speakerdeck.com/jxck/podcast-over-pwa

ところが Android でしか動かないものばかりで、筆者は当時 Android を持っていなかった。そこで、借りた古い Android でデバッグしながら実装し、その端末のアップデートが止まって以降、自分でもまったく試していない機能でもあったた。去年のサイト刷新で一時的に UI を落としたので、試すこともできない状態のはずだ。


## Deprecate Background Fetch

そんな実装をしてから数年、先日の TPAC の会場で Chrome の開発者と話していると「ところで、会ったら聞こうと思ってたんですが」と、冒頭の話になった。

当時、PWA に追加された野心的な機能のいくつかは、様々な事情で問題になっているらしい。他のブラウザも実装していないし、Chrome でも使っている人が少ない。その上で、メンテナンスコストが高く、場合によってはセキュリティ上の問題に発展しうる。消せるなら消したい、というものだ。

この場合問題になるのは「既存の Web への影響」だ。今まで動いていたサイトが壊れるなら、それは避けるべき問題となる。よほど無視できるほど小さい usage でない限り、基本的に消すことはできない。

「この機能を使っているのが、世界であなたのサイトだけなんだけど」

Chrome はテレメトリを収集し、機能ごとの Usage を集計して、Chrome Platform Status で公開している。単に文字列を解析してヒットした、などではなく、実際に呼び出された回数などをもとにしているはずなので、「呼び出すコードがライブラリなどに混ざっているが、実際には呼ばれていない」といったものは省いて、本当に使っているサイトだけがヒットしているはずだ。

ここで Background Fetch を見ると以下の通りだ。

- Chrome Platform Status
  - https://cr-status.appspot.com/metrics/feature/timeline/popularity/2550

![Chrome Status の Background Fetch API Usage](background-fetch-usage.png#864x1045)

確かに、使っているサイトには筆者の [mozaic.fm](http://mozaic.fm) のみが表示されている。

Web 全体から見れば弱小な、筆者の個人サイト 1 つしか表示されないということは、最低でもテレメトリ収集対象でまともに使っているサイトは、本当に存在しないのだろう。

「これ、消しても良いですか?」

Web の機能の生殺与奪を委ねられる日が来るとは、全く思っていなかった。

具体的な削除理由のクリティカルさなどは、そこでは詳細には聞けなかったが、ここで自分がゴネて Web 全体の問題点になるくらいなら、まあ消した方が良いのだろう。現時点で他のブラウザからの実装シグナルもなく、実装されることもなさそうだ。

後日 Intent to Deprecate が出れば、そこで詳細は分かるだろう、くらいのつもりで「大丈夫です」と返事をした。


## Intent to Deprecate

TPAC が終わってすぐ、その Intent は公開された。

- Intent to Ship: deprecate BackgroundFetch
  - https://groups.google.com/a/chromium.org/g/blink-dev/c/CpXXaJh5Rq8/
  - (Intent to Deprecate ではなく Intent to Ship: deprecate になっている)

要約すると以下のような内容だ。

- Chrome 74 (2019/4) に Ship し、6 年ほど経つが、API の利用率が全体の 0.00002% しかない
- この低い使用率に対して、API の維持やセキュリティ対応に要するエンジニアリングのコストは見合っていない
- 廃止して代替のソリューション(いわゆる普通のダウンロードなど)に移行したい

どのような問題があり、どのような維持コストがかかっているかは、ここからは読み取れなかった。

しかし、この投稿にはすぐにいくつかのフィードバックがつくことになる。

- 少ないと言っているが、それでも利用者はいる。その API ユーザとのコミュニケーションはできているのか?
- 本当にこんなに利用者が少ないのか? 計測方法次第では潜在ユーザがもっといる可能性はある。
- この Intent ですぐに消すのか? 移行期間を設けるといった長期のスケジュールは切らないでいいのか?
- AI の model ダウンロードなど、ユースケースはまだまだあるはずだ。
- etc. etc.

だいたいは、予想どおりのものではあった。


## Feedback

渦中の API ユーザでもあり、TPAC でも話をしている手前、黙って見ているわけにもいかないので、自分からもフィードバックを投稿した。別に消されたら自分のサービスが壊れて困る、という意図はない。こうやって「消されてしまう可能性がある」というスタンスのリスクだ。

```
I am the owner of the website mozaic.fm, which is the only one that appears on that Status page.

私は、その Status ページに唯一出てくるサイト mozaic.fm のオーナーです。

That page is my podcast program, and at that time, I turned the podcast page into an app by adopting the "PWA Narrative" and using its added features. I periodically fetched RSS using periodic background fetch, displayed badge with the badging API if new episodes are available, and downloaded episode MP3s using background fetch so they could be listened to offline.

そのページは私の Podcast Program で、私はその頃 PWA のナラティブに則り、追加された機能を使って、Podcast ページをアプリ化しました。Periodic Background Fetch で RSS を定期取得し、新しいエピソードがあれば Badging API で表示し、Background Fetch でエピソードの mp3 をダウンロードし、オフラインで聴けるようにしました。

However, I implemented it quite a while ago, and since many people listening my program on Spotify or Apple's podcast apps, I honestly had forgotten about this feature myself.

ところが、実装したのはかなり前で、多くの人は Spotify や Apple の Podcast アプリで聴いていると思われるので、私もこの機能のことはすっかり忘れていました。

At TPAC 2025, I spoke directly with Yoshisato, and he asked me, "Would you mind if this feature were removed ?".

TPAC 2025 で、私は Yoshisato と直接話し、「この機能の削除についてどう思うか?」と聞かれました。

I told him that if removing this feature would benefit the web, and if I were the only one blocker in worldwide, I wouldn't oppose it.

私は、この機能の削除が Web のためになり、そのブロッカーが世界で自分しかいないのであれば、反対するつもりはありません。

However, the risks associated with not removing this feature are largely unknown. It's also unclear whether similar risks exist for other PWA features. PWA has incorporated ambitious capabilities, and I was in a position to try them. The Web values compatibility, but it should prioritize user safety even more. If security risks or similar issues were found, I would understand removing it. However, if the message is simply that "features with few users may be removed," then adopting new features early becomes a risky act.

しかし、この機能の削除をしないことで発生するリスクはあまりわかっていません。また、同様のリスクが PWA の他の機能ではどうなのかもわかっていません。PWA は野心的な機能を取り込み、私はそれを検証する立場にありました。Web は compat を重視しますが、それ以上に user safety を重視すべきです。

セキュリティリスクなどが見つかって消すならわかりますが、「単に使う人が少ないなら消される可能性がある」となれば、新しい機能に早期に飛びつくことはリスクのあることになってしまいます。そしてこの機能は、その後そこまでアドボケートもされてません。

Were they also hoping to remove other PWA features if they had few users? Wouldn't that imply that the very concept of "PWA" itself has failed?

PWA の他の機能も、もしユーザが少なければ消したかったのでしょうか?それは PWA というコンセプトそのものが失敗したということでは無いでしょうか?

If the reason was "too few users relative to the maintenance cost," are there any efforts being made to increase the number of users? At least for Background Fetch, I don't think there have been any updates or advocacy for a long time.

もし「メンテコストに対してユーザ数が少ない」のが原因なら、ユーザ数を増やす取り組みはしてるのでしょうか?少なくとも Background fetch については、長いこと何もアップデートや紹介を見ないと思います。

I believe PWA was a campaign strongly promoted by Google. Has Google already lost interest in PWA? Do they no longer have the budget or resources to advocate for the features they introduced? If that is the case, what has become of that narrative now?

PWA は Google が推し進めていたキャンペーンだと思います。もう Google は PWA に飽きたのでしょうか?出した機能を啓蒙に割くバジェットもリソースもないのでしょうか?そうであれば、あのナラティブは今どうなっているのでしょうか?

We developers are strongly encouraged to try new features every time a new campaign appears: Layered APIs, Houdini, Web Packaging etc etc. However, browser vendors do not signal when those campaigns have effectively ended. Even when teams are re-orged, people are laid off, or resources are redirected to another campaign, we keep waiting for updates.

我々開発者は、そうしたキャンペーンの登場ごとに、強く先導されて新しい機能を試します。Layered API, Houdini, WebPackaging。しかし、ブラウザベンダーはキャンペーンが終わってもそれをシグナルしてくれません。チームが re-org したり、担当者がレイオフされたり、別のキャンペーンにリソースが取られても、我々はずっと更新を待ってます。

If there were either a serious explanation of why this feature should be removed on its own by security reason, or a clear indication that Google has shifted its overall policy regarding the PWA campaign, I believe we could have a more constructive discussion.

この機能を単体でも消すべき深刻な理由の説明か、PWA というキャンペーン全体に対する Google の方針転換か、そのどちらかがあれば、より建設的な議論ができると思います。

Best,
Jxck
```

その後もいくつかのフィードバックが続き、それらを踏まえて、この機能の Deprecate は撤回された。


## Outro

確かに Chrome しか Ship してない機能ではある。それでも、一度出した機能を消すというのは、やはり Web にとってはかなり難しい。し、そうあるべきだ。

もちろん、現実的にそのメンテナンスコストは無視できないだろう。PWA キャンペーンが最も盛り上がっていたころ、かなり無理のある機能も次々に投入された。他のブラウザに実装される予定もなく、仕様も宙に浮き、実装した当事者達は AI など別のキャンペーンに駆り出され、引き継いだメンバーがそのコストを払っている、といった構図も見え隠れする。Periodic Background Fetch なんかはよっぽど無理があって、制限も厳しいが、あちらはもう少し使われているので消せないらしい。大変そうだ。

かといって、そうやって野心的な機能に挑む開発者がいなければ、Web 自体はどんどん停滞していくだろう。そうした取り組みが新しいケイパビリティを増やし、それがユースケースを生み、そこからまた Web が広がっていくうえで、重要な起爆剤になることもある。

そういう場面では、我々のような人間がこうやって新しい機能を試し、フィードバックをすることで、その機能のゲートキーパーのような存在になれることもある。そんなクリティカルでみんなが舌を巻くようなフィードバックである必要はない。使ってみてどうだったか。なんなら「こんな用途で使ってみた」だけでもいい。それが、我々開発者のできる、もっとも身近な貢献だ。もし筆者が自分のサイトでこの機能を試していなかったら、世界で全く使われていない機能として、もっとすんなり消されていた可能性もあったかと思うと、まあ試しておいて良かったのかもしれない。

関係ないが、0.00002% ということは、Chrome における [mozaic.fm](http://mozaic.fm) のトラフィックは、ざっくり Web 全体の 1000 万分の 2 くらいってことになるのだろうか。500 万分の 1 という生々しい数字が垣間見れたのは、個人的には面白かった。

ところで、もし次に [mozaic.fm](http://mozaic.fm) を刷新するなら、もう PWA にはしない可能性が高い。その際は、世界からこの API のユーザが消える可能性があるので、それまでにこのゲートキーパーを引き継いでくれる人が現れることを祈る。