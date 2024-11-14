# [cookie][3pca] 3PCA 16 日目: Bounce Tracking

## Intro

このエントリは、3rd Party Cookie Advent Calendar の 16 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

今日は 3rd Party Cookie の迂回としてトラッキングに用いられた、Bounce Tracking について解説する。


## Bounce Tracking

例として、X でポスト中のリンクをクリックすると、`t.co` というドメインに一旦遷移し、そこでリダイレクトしてから目的の URL に遷移する作りになってる。

このように、「一旦リダイレクトを挟む」のは、X からすれば、`t.co` のログを見ることで、誰がどのポストを見て、どのサイトに離脱していったかを知ることができるというのは、なんとなくわかるだろう。

ところで、一瞬であっても `t.co` に遷移していれば、それが Top Level Domain になる。つまり、そこで保存/取得する Cookie は 1st Party Cookie だ。たとえそのリンクをクリックしたユーザが X にログインしてなかったとしても、`t.co` の Cookie でトラッキングが可能ということになる。

例えば、X 上に投稿された `https://example.com` が、`https://t.co/deadbeef` に置き換えられていたとしよう。

```html
<!-- X 上のポストのリンク -->
<a href="https://t.co/deadbeef">example.com</a>
```

この t.co へのリクエストは t.co の Cookie が付与される。つまり、過去に同様に t.co を経由していれば、その Cookie が送られるのだ。実際の挙動をみてみると以下のような Cookie が付与されている。

```http
GET /deadbeef HTTP/1.1
Cookie: muc=54832623-...; muc_ads=548045683-...
```

このレスポンスで Cookie を更新しつつリダイレクトしている。

```http
HTTP/1.1 301 Moved Permanently
Location: https://example.com/
Set-Cookie: muc=9f9222787-...; Path=/; Domain=t.co; Secure; SameSite=None ...
Set-Cookie: muc_ads=9f928101-...; Path=/; Domain=t.co; Secure; SameSite=None ...
```

このように 3rd Party Context では送られない 3rd Party (`t.co` の) Cookie を、リダイレクトしてトラッカー(`t.co`)の 1st Party Context でやりとりすることでトラッキングを行うというこの手法を、*Bounce Tracking* と言う。


## Bounce Tracking の制限

このように、Bounce Tracking は、初期の ITP を迂回する手段として使われたりもした。

これに対し Safari は ITP の更新で「リダイレクトだけで通り抜けるのではなく、そのサイトを利用していない場合はトラッカーとみなす」という変更を入れたため、現在はもう塞がれている。

ここでいう「利用」とは、ユーザがそのページに対する何らかの操作(scroll や click)をしているかを元に判定される。これは、*User Gesture* や *User Activation* と呼ばれ、ジェスチャがないページの 1st Party Cookie は消してしまうという制限だ。

なお、Brave は「バウンスしている」と判定したら、間のリダイレクトを削除して最後のページに直接遷移する機能を入れ対策している。

- Bounce Tracking Meaning & Definition | Brave
  - https://brave.com/glossary/bounce-tracking

今では、Safari に限らない全ブラウザ共通の課題として、どうやって防ぐかが議論されている。

- nav-tracking-mitigations/bounce-tracking-explainer.md at main - privacycg/nav-tracking-mitigations
  - https://github.com/privacycg/nav-tracking-mitigations/blob/main/bounce-tracking-explainer.md

逆に、利用する API によっては、遷移された後に User Activation が発生しているかどうかを知る必要がある。そこで提案されたのが User Activation API だ。

- The User Activation API | WebKit
  - https://webkit.org/blog/13862/the-user-activation-api/


## Link Decoration

Facebook 内のリンクで外のサイトにいくと、遷移した先の URL に `fbclid=xxxxxxxxxxxxx...` というクエリが URL に付与されていることに気づくだろう。

このように、プラットフォームからの遷移に URL クエリを付与することによって、その先に対応してる JS (Facebook のボタンなど) があれば、クエリを取得しサイトの 1st Party Cookie として保存することで、トラッキングに使うという手法だ。

```js
// 遷移先の JS
const url = new URL(location.href)
const fbclid = url.searchParams.get("fbclid")
if (fbclid) {
  // クエリがあったら Cookie に保存
  document.cookie = `fbclid=${fbclid}`
}
```

この手法を *Link Decoration* と言う。

Google なら gclid、Yahoo なら yclid といった名前でこうした ID を付与することが多く、Google や Yahoo の提供するスクリプトを埋め込んでいるサイトが多ければ多いほど、この ID が広く共有されることになる。

Link Decoration は Bounce Tracking と組み合わせて使われることも多い。

例えば、複数のトラッカーでタライ回しのようにリダイレクトを繰り返しながら、各トラッカーが 1st Party Cookie を元にそのユーザについて知っている属性情報を集約しながらクエリに追加していく。

最後に、その結果を集約した ID を JS で Cookie に保存すれば、トラッキングの精度を寄ってたかって高めることができるのだ。

瞬時にリダイレクトをたくさん繰り返すようなサービスは、こうしたことを裏で行なっている場合が多い。


## Link Decoration の制限

ITP では「JS (document.cookie) で保存された Cookie は 1st Party であっても短期間で消える」という変更を入れたことで、すでに塞がれている。

また、Decoration に使われるクエリの ID は既知のものが多いため、トラッカー判定されている ID は、送ってること自体がトラッカーの判定に使われたり、ブラウザによって削除してしまうといった話もある。(このあたりは現状どうなのか把握してない)


## 制限の問題

しかし、この制限には重要な問題が 1 つある。それが認証連携だ。

Federation や SSO の実装は、外部の IDP に遷移し、そこの 1st Party Cookie で認証が確認できたら、Token をクエリに付与してリダイレクトで戻ってくるような実装がある。

このケースは、Bounce Tracking + Link Decoration との見分けが難しく、巻き込まれて壊れることが懸念されている。

実際どのくらい壊れるのかは、ブラウザの課している制限によって変わるが、もし壊れていることがわかったら、気にすべき点は以下だ。

まず、IDP のページをリダイレクトで通り過ぎるのではなく、ユーザに表示する。そこに「このアカウントで続行する」といったボタンなどの UI を置いて、それをユーザにクリックさせることで IDP 上でジェスチャーを発生させるといった対応が考えられる。

次に、IDP -> RP への遷移でも、Token を JS ではなくサーバで受け取り、サーバからの `Set-Cookie` で認証情報を保存する(もしくは、Session に紐づける)といった実装にする。

そして、認証連携などのユースケースを持つドメインは、ドメイン自体がトラッカー判定されないように、同じドメインの他の部分でトラッキングをしてないかに注意しておくといいだろう。