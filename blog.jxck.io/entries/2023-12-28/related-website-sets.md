# [cookie][3pca] 3PCA 26 日目: Related Website Sets

## Intro

このエントリは、3rd Party Cookie Advent Calendar の 26 日目である。

- 3rd Party Cookie のカレンダー | Advent Calendar 2023 - Qiita
  - https://qiita.com/advent-calendar/2023/3rd-party-cookie

今日からは、Privacy Sandbox の「広告」以外の API を解説していく。


## 同一組織の別ドメイン

グローバル企業であれば、各国の ccTLD でローカライズされたサービスを提供するのは一般的な運用だ。

- google.co.jp
- google.co.uk
- google.de
- google.fr
- etc

他にも、例えば用途毎にドメインを分ける運用も一般的だろう。

- google.com
- googleusercontent.com
- fonts.gstatic.com
- etc

また、ドメインは全く別だが、同一組織の運営する別ブランドの場合もあるだろう。

- office.com
- live.com
- microsoft.com
- etc

これらは全て Cross Site だ。

同じ運営母体(Party)でありながら、その全てが 3rd Party Cookie で連携しており、それが塞がれると全てが連携できなくなる。

この制限を緩和するために提案されたのが、Related Website Sets だ。


## Related Website Sets

もともとは First Party Sets と呼ばれていたが、名前が変わり Related Website Sets となった。

- WICG/first-party-sets
  - https://github.com/WICG/first-party-sets

これは、「このドメインは、これらのドメインと関連している」という情報を JSON で定義するものである。

```js
{
  "primary": "https://primary.com",
  "associatedSites": ["https://associate1.com", "https://associate2.com", "https://associate3.com"]
}
```

そして、それを GitHub のリポジトリに PR して、許可されると以下の JSON にマージされる。

- related-website-sets/related_website_sets.JSON at main · GoogleChrome/related-website-sets
  - https://github.com/GoogleChrome/related-website-sets/blob/main/related_website_sets.JSON

Chrome はこれを読み込んで、ドメインの関連を認識するのだ。

一般に公開されることで、他の実装も使えること、そして衆目に晒すことで監視になることを目的としている。

ちょっと前は 2,3 個しかなかったが、流石に少し登録が増えてきたようだ。

もちろん、無尽蔵に登録できるわけではなく、様々な制限はあるが、それでも全く無いよりは良いため、登録が増えているのだろう。

![ドメインの関連: Same Origin/Same Site/Schemeful Same Site/Subset/3rd Party の違い](domain-relation.png#6166x5132)


## Storage Access API

認識されると無制限で Cookie が読めるというわけでは無い(First Party Sets のころはそうだった気がする)。

RWS ではどうなるかというと、Storage Access API で prompt が出ずに Cookie を取得できるようになる。

もし RWS に対応してないブラウザでも、SAA に対応していれば prompt を経て Cookie が取得できる点で、互換性がある設計とは言えるだろう。

これで、例えば認証連携のような場合は `<iframe>` から SAA を呼ぶことで、ユースケースの継続ができる可能性が増える。

一方、CDN から画像などを取得するケースでは、SAA が呼べない。そこで、Top Level Window 側で CDN のための SAA を取得するための拡張 API が追加されている。

```js
document.requestStorageAccessFor("https://cdn.example.com")
```


## Standard Position

Firefox, Safari は共に First Party Sets の時代から反対している。

- Mozilla: Negative
  - https://mozilla.github.io/standards-positions/#first-party-sets

> We believe the definition of first party should be clear and understandable to users,
> web developers, and publishers, and thus ideally it should be based only on the top-level URL.
> While we can't quite do that today because it isn't compatible with all sites,
> we'd like to move towards doing that, rather than standardizing a mechanism that moves away from that. See more details.

- Safari: Oppose
  - https://github.com/WebKit/standards-positions/issues/93

> We have already implemented partitioning of state and storage by top-level site.
> We think that is where the web platform should be.

確かに、多くのドメインを持つサービスにとって、すべての連携が切れるのは問題だろう。

しかし、それを個別の API に落とし込むならまだしも、完全に迂回できる手段を用意するということは、他のブラウザにとって看過し難いことは容易に想像できる。

したがって、この JSON が読み込まれる実装がこの先増えるかは疑問だ。

また、あらゆるサービスのドメインをリストにしていくというのは Public Suffix List と同等の運用になる。

PSL は Mozilla 発だが、今はコミュニティ運営されており、非常に負荷が高い割にクリティカルなソースなので度々問題になっている。

それを知っていながら、これと同じ運用を新たに行おうとすること自体が、うまくいくのかは個人的に疑問だ。

また、そのリポジトリが Google Chrome の下にあり、マージは Google の人間が行っていることになる。

一つの組織が独自に審査し、それを特例として認めているとみなされかねないこの JSON の扱いは、これまでの Web の常識からすると、かなり特殊なものと感じられる。