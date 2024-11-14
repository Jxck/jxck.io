# [cookie][3pca] 3PCA 22 日目: Privacy Sandbox

## Intro

このエントリは、3rd Party Cookie Advent Calendar の 22 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

今日からいよいよ Privacy Sandbox の話に入っていく。


## 単に塞げば良いのか?

各ブラウザが「3rd Party Cookie をブロックしよう」と合意した。しかし、単に使えなくすればそれでいいのか? というと、実はそんなに簡単ではない。

まず、何度も言っているように、「認証連携」やトラッキング問題とは関係のないポジティブなユースケースまで使えなくなることで、多くのサイトが壊れてしまう懸念がある。

ITP によって壊れたサイトは多く存在したが、Chrome でしか動作しないサイトも多くあるため、次はそれらが壊れることになるだろう。シェアも異なるため、これまで軽微だった影響が無視できなくなることもある。

次に、特にメディア系のサイトは、広告収入があることで無料で提供できているものが多い。トラッキングの精度が下がったり、コンバージョンがあってもそれを正確に測れなくなったりすることで、収入が減って運営できなくなる可能性もある。

ビジネスが立ち行かなくなったサービス同士が結託し、メールアドレスをキーにユーザの情報を交換し合って紐付けるといったことを始めれば、それはもうブラウザ側からは関与や制限ができない。Cookie に依存していたからこそ、ブラウザがコントロールしていた頃と比べ、より野放しな悪い方向に向かってしまう可能性があるのだ。

すると、何度も言っているように、「問題は Cookie そのものではなく、トラッキングをはじめとしたプライバシー」であることに立ち返ると、Cookie をブロックする一方で、「プライバシーの問題がなく、既存のユースケースを満たせる安全な API がブラウザに備わっていた方が良いのではないか?」という発想になる。


## Privacy Sandbox

例えば、これまでは 3rd Party Cookie を使用して「ID xxxxxx の人が、この広告を見て、この商品を買った」という情報を正確に取得できていたものを、「この一ヶ月で、この広告を見て、この商品を買った人が、何人いる」まで集約された情報しか取得できなければ、プライバシーの問題はかなり解消でき、既存のユースケースを(完璧ではないまでも)満たせる可能性がある。

このように、各ユースケースに対して、Cookie をブロックすると同時に対応する API を用意するというのが Privacy Sandbox の発想だ。これは HTML5、PWA、Fugu などと同じ「コンセプト」に近い枠組みの名前であり、以下のような API が提案されている。

- Protected Audience API
- Fenced Frame
- Attribution Reporting API
- Topics API
- Private State Token
- Web Related Sets
- FedCM
- Storage Access API
- CHIPS
- etc

基本的に、どの API もかなり難しい。そして、明確な用途があるため、そのユースケースを持たなければ、一生縁のない API がほとんどだ。特に広告関連の人でもなければ、全部を知っておく必要は全くない。


## 特殊な API 策定

Privacy Sandbox は「Google のもの」として認識している人も多いだろう。単に「Google が自分たちのために、勝手にやっているだけ」という理解でも別に構わないが、実際には非常に複雑な構造がある。

筆者としても、本当に全体が理解できているとは思っておらず、立場によって見え方も異なるだろう。

一つだけ言えるのは、Privacy Sandbox は従来の Web 標準の捉え方からすると「非常に特殊な成り立ち」の API だという点だ。従来の Web 標準に慣れている人が不審に感じる点もそこにあると思うため、ある程度の背景を書いておく。

筆者の見えている範囲での理解であるため、おまけ程度に読んでほしい。


### Google が始めたこと?

現状 Google がイニシアチブを取っているように見えるのは、決して間違いでは無い。しかし、そもそも「塞がれる API を標準にしよう」という発想は、どちらかというと Safari の提案が先にある。

Safari は ITP を実施している最中に、開発者からのフィードバックを踏まえ、広告計測用の Ad Click Attribution や Storage Access API などを独自に提案した。

ところが、Apple はいつも Safari にリリースするところで発表し、内容もブログだけというスタンスで、標準化は後回しな出し方をすることが多い。

Google は標準を重視するため、Attribution Reporting API などは Ad Click Attribution を踏まえて仕様を策定したものを、W3C のプロセスに乗せたニュアンスが強い。

他にも多くの仕様を、最終的には Google のエンジニアが仕様に起こしているため、「Google のもの」に見えるのは、Web ではいつものことだ。

実際の仕様の策定は、W3C の Privacy CG や Web Advertising BG などで行われており、これらが会員企業に閉じているため、勝手にやっているように見えるのは仕方がないとは思う。


### 広告やってないと関係ない?

確かに Attribution Reporting, Protected Audience, Topics など、広告に関係する API は多い。それらを必要とするのも広告事業者だろう。

しかし、"3rd Party Cookie" にまつわるユースケースを対象としているため、それだけではない。

例えば、認証連携には FedCM、埋め込み用途には CHIPS, Storage Access API, Related Website Sets など、一般的な Web 開発をしている開発者にも、無関係ではない API もある。


### Google だけが嬉しい?

確かに Google は世界で最も Web 広告で売り上げている企業であることは事実だろう。そのため、特に広告系仕様があれば、Google にとってメリットが多く見えるだろう。

しかし、実際はそんな簡単な話ではない。なぜなら、Google は First Party Data を多く保有しているからだ。

3rd Party Cookie がなくなり、トラッキングができなくなると、(Fingerprint などにすがりつくのを諦めれば) 1st Party Data の活用が重要になるとされている。

しかし、1st Party Data の保有となれば、GAFA に代表されるビッグテックが圧倒的に有利になってしまう。その中でも特に Google は "1st Party Data", 広告事業, ブラウザの全てを持っているのだ。

つまり、何が起こるかと言うと「1st Party Data を潤沢に持つ Google が、Chrome の 3rd Party Cookie をただブロックすることは、他の広告会社に対する不当な圧力だ」と見なされてしまう可能性があるのだ。

そこで、CMA は、独占禁止法的な意味での不正競争の防止を目的として、Google が「代替手段を準備せずに 3rd Party Cookie をブロックしないように監視する」というプロセスを開始した。

- CMA to investigate Google's 'Privacy Sandbox' browser changes - GOV.UK
  - https://www.gov.uk/government/news/cma-to-investigate-google-s-privacy-sandbox-browser-changes

この API こそが Privacy Sandbox だ。つまり Google は「自分たちのため」どころか、「3rd Party Cookie に依存している他の企業が困らないようにするため」に Privacy Sandbox に取り組んでいると言っても過言ではないのだ。

CMA による最初の調査が入ったのは 2021/01 と記録されている。これは 3rd Party Cookie Deprecation について発表されたよりも後だ。

- Investigation into Google's 'Privacy Sandbox' browser changes - GOV.UK
  - https://www.gov.uk/cma-cases/investigation-into-googles-privacy-sandbox-browser-changes

これ以降、Google は定期的に CMA のレビューを受けながらプロセスを進めることになる。

多くのユースケースごとに、代替手段となる API を策定し、それを実装し、リリースし、CMA の許可を得て初めて Chrome は 3rd Party Cookie をブロックできるのだ。

結果、一度リスケを挟んで、ゴールが 2024 年 Q1 になったが、そもそもこの規模のプロジェクトを、3 年たらずで終わらせることの難しさは、容易に想像できるだろう。

それが故の歪みも、多少はある。


### 特殊な標準化

3rd Party Cookie の代替となる API を策定する必要はあるが、それが新たな Tracking Vector や Fingerprinting Vector になってはならない。

従って、例えば情報を取得するまでにラグがあったり、ノイズを含めたり、特殊な環境でしか実行できなくしたりと、Privacy Sandbox でしか見ないようなさまざまな仕組みが盛り込まれている。

背景がわからなければ、「なんでそんなことするの?」なものが非常に多いだろう。

そして、その加減も難しい。W3C でも、広告事業者が集まる Web Advertising BG に参加する広告事業者はもっと精度の高い情報を欲しがり、Privacy CG に集まるプライバシーの専門家はその反対を言う。

この「どこまでの情報を提供できる API にするか」は非常に匙加減が難しく、人によってスタンスが異なる。ここの匙加減をミスると、新しく作った API が 3rd Party Cookie よりずっとエントロピーを低くして代替するという前提を省いて、「プライバシーを侵害する API が提供されようとしている」として非難されることになるからだ。

また、ある程度の議論と合意をもとに標準化しても、それを他のブラウザが実装するとは限らない。標準化は互換性のために行うものだが、標準化している段階から「この機能は実装しない」と他のブラウザがかなりはっきり表明することもある。

実装しない理由は、プライバシーがほとんどだ。3rd Party Cookie よりマシな API を提供する目的だとしても、3rd Party Cookie が無くなった世界線でその API を追加したと考えれば、余計な情報が取れる API にしか見えないということになるため、背景を無視すれば否定する方が最初から圧倒的に有利なので仕方がない。

が、それでも Chrome は策定を止めるわけにはいかず、結果として特に広告系の API については Chrome だけが実装しているものがほとんどになっている。

広告以外の API については、他のブラウザも徐々に実装が進んでいるものもあるが、Privacy Sandbox == 広告系 API に見えている人にとっては、Google が勝手に標準化し、勝手に実装し、勝手に使っている API に見えるだろう。


### Abuse を防ぐ Enroll

Privacy Sandbox は、その API から取得できる情報のエントロピーを非常に慎重に調整してはいるが、それでも多くのドメインを使って名寄せしたり、事業者が結託すると、意図した以上の情報を得る Abuse が起こる可能性がどうしても残る。

そこで、あまり知られてないと思うが、現状 Privacy Sandbox の API を使うには、Enroll という登録作業が必要になる。

簡単に言うと「この会社が、このドメインで、この用途のために、この API を使いたい」という事前登録をする必要があるのだ。

- attestation/how-to-enroll.md at main · privacysandbox/attestation
  - https://github.com/privacysandbox/attestation/blob/main/how-to-enroll.md

これまで、Origin Trials を除き、「API を利用するために登録をし審査が必要」なんていう API は、少なくとも筆者は見たことが無い。

現状、対象の API を実装しているのが Chrome しかないため、Enroll 自体を Chrome しかやっておらず、他のブラウザも今後これをやるのかなどはよくわかってない。

これを見て「Chrome が Web を独占しコントロールしようとしている」と思うのは自由だ。しかし、これを CMA のレビューのもとやっていることを忘れてはいけない。

中身はしらないが、登録だけなら自動化できても、審査となるとそうもいかないだろう。まともなブラウザベンダだったら、必要に駆られずに自分たちであえてこんな面倒なことはしない。というのは容易に想像できそうだ。


## まとめ

以上のように、Privacy Sandbox は筆者の知る中でも非常に特殊な API 群だ。

出自からプロセスからゴールまで、何もかもが特殊で、これまでの Web では考えられなかったことが、かなりたくさん起こっている。

API が多すぎて、筆者にももはや全体など到底把握しきれない。

それでも一応、次回からは Privacy Sandbox の代表的な API を紹介していく。