# [cookie][3pca] 3PCA 16 日目: Bounce Tracking

## Intro

このエントリは、 3rd Party Cookie Advent Calendar の 16 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

今日は 3rd Party Cookie の迂回としてトラッキングに用いられた、 Bounce Tracking について解説する。


## Bounce Tracking

例として、 X でポスト中のリンクをクリックすると、 `t.co` というドメインに一旦遷移し、そこでリダイレクトしてから目的の URL に遷移する作りになってる。

このように、「一旦リダイレクトを挟む」のは、X からすれば、`t.co`のログを見ることで、誰がどのポストを見て、どのサイトに離脱していったかを知ることができるというのは、なんとなくわかるだろう。

ところで、一瞬であっても `t.co` に遷移していれば、それが Top Level Domain になる。つまり、そこで保存/取得する Cookie は 1st Party Cookie だ。たとえそのリンクをクリックしたユーザが X にログインしてなかったとしても、 `t.co` の Cookie でトラッキングが可能ということになる。

3rd Party Context では送られない 3rd Party Cookie を、リダイレクトしてトラッカーの 1st Party Context でやりとりすることで、トラッキングを行うというこの手法を、「Bounce Tracking」と言う。

特に、複数のトラッカーでタライ回しのようにリダイレクトを繰り返しながら、各トラッカーがそのユーザの属性情報を追加していけば、トラッキングの精度を寄ってたかって高めることができるため、リダイレクトを瞬時にたくさん繰り返すようなサービスもあった。

このように、Bounce Tracking は、初期の ITP を迂回する手段として使われたりもしたが、後に Safari が「リダイレクトだけで通り抜けるのではなく、そのサイトを利用していない場合はトラッカーとみなす」という変更を入れたため、現在はもう塞がれている。

なお、Brave は「バウンスしている」と判定したら、間のリダイレクトを削除して最後のページに直接遷移する機能を入れ対策している。

- Bounce Tracking Meaning & Definition | Brave
  - https://brave.com/glossary/bounce-tracking

今では、 Safari に限らない全ブラウザ共通の課題として、どうやって防ぐかが議論されている。

- nav-tracking-mitigations/bounce-tracking-explainer.md at main - privacycg/nav-tracking-mitigations
  - https://github.com/privacycg/nav-tracking-mitigations/blob/main/bounce-tracking-explainer.md

注意点として、 Federation や SSO のように外部の IDP に一瞬行って、認証が確認できたらリダイレクトで戻ってくるようなケースは、 Bounce Tracking との見分けが難しく、巻き込まれて壊れることが懸念されている。

その場合、 IDP のページをリダイレクトではなく表示し、そこに「このアカウントで続行する」といったボタンなどの UI を置いて、それをユーザにクリックさせることで IDP 上でジェスチャーを発生させるといった対応が必要になる場合もある。


## Link Decoration

Facebook 内のリンクで外のサイトにいくと、遷移した先の URL に `fbclid=xxxxxxxxxxxxx...` というクエリが URL に付与されていることに気づくだろう。

これは、 URL クエリを付与して遷移することによって、その先に対応してる JS (Facebook のボタンなど)があれば、 JS でクエリを取得し、サイトの 1st Party Cookie として保存することで、トラッキングに使うという手法だ。

この手法を「Link Decoration」と言う。

ITP では「JS (document.cookie) で保存された Cookie は 1st Party であっても短期間で消える」という変更を入れたことで、すでに塞がれている。

また、クエリを送ってること自体も、トラッカーの判定に使われたり、削除してしまうといった話もある。しかしこれも、認証連携で Token をクエリに付与するケースが、巻き込んで壊れる可能性があるため、削除自体は簡単では無い。

認証連携など正規のユースケースを持つドメインは、ドメイン自体がトラッカー判定されないように、他の部分でトラッキングをしてないかに注意しておく必要があるだろう。



