# [same-site-cookie][cookie][csrf][security] Same-Site Cookie とは何か、または Token に代わる CSRF 対策

## Intro

これまで CSRF 攻撃の対策は、 Form に hidden 属性でワンタイムトークンを隠す方法が主流となっていた。

しかし、現在策定/実装が進んでいる SameSite Cookie を使用すると、 Cookie が送信される条件を変えることができ、 CSRF の対策になることが期待されている。

そもそもの Cookie が持つ歪な仕様と CSRF の仕組み、そして SameSite Cookie の効果について解説する。

また、 Spectre を踏まえた CSRF 以外の攻撃における SameSite Cookie の効果についても解説する。


## CSRF の仕組み

CSRF(Cross Site Request Forgery) は、ブラウザが保存している Cookie を発行元ドメインへのリクエストに自動で付与する挙動を利用した攻撃方法である。

例として、ログインを必要とする SNS を想定する。

その SNS の投稿は、 Form からのリクエストに正しい Cookie があって初めて成立する。

攻撃者はその投稿 Form と同じリクエストを生成する Form を作り、それを全く別の罠サイトに設置する。

ここに、 SNS にログインし Cookie を保持しているユーザを誘導し、なんらかの方法で Form を Submit させる。

そのリクエストには Cookie が自動的に付与されるので、 Cookie の有効性のみを確認してリクエストを受理している場合は、リクエストが成功してしまう。

これを利用し、ユーザに意図しない投稿を行わせることが、 CSRF の概要となる。

これが、 SNS の投稿ではなく、商品の購入や送金、パスワードの変更だった場合は、より被害が大きくなるだろう。


## CSRF 対策

この攻撃の肝は、どのページから発生したものでも、 SNS サイトへのリクエストには、 SNS サイトの Cookie が付与されるという Cookie の仕様に有る。

つまり、サービスとしては何らかの形で、届いたリクエストが「自サイト内で発生した、意図したものか」「他のサイトから来た、意図しないものか」を区別する必要がある。

ここで問題になるのは、「何を見れば良いか」であり、そこにはいくつかの方法が提案されている。

- Referer Header
- Origin Header
- Hidden Token


### Refere Header の確認

Referer Header には、どの URL からのリクエストであるかが記載される。

この値により、自サイトから発生したリクエストであるかは判断できそうだが、いくつか問題がある。

まず、 Referer はいくつかの要因によって送信されない場合がある。

- 設定や拡張などユーザの設定によるもの
- Proxy など組織ポリシーによるもの
- Referrer-Policy によるサーバ管理者によるもの

従って、 Referer Header が存在する場合、その値を参考にすることはできるが、ヘッダが確実に存在することを保証することはできない。

詳細は、以下を参照。

[Referrer-Policy によるリファラ制御 \| blog.jxck.io](https://blog.jxck.io/entries/2018-10-08/referrer-policy.html)


### Origin Header の確認

Origin Header は「どの Origin からのリクエストであるか」を相手に通知するために策定されたヘッダだ。

このヘッダは Form からの POST リクエストであれば、 Origin が同じでも付与される。

したがって、 CSRF 対策のコンテキストでも、この値を見て想定した Origin からのリクエストであることを確認するのは妥当と言える。

しかし、この方法は、任意のヘッダを追加できるという脆弱性があった場合、それを CSRF に組み合わせられると容易に突破できてしまう。

また、同じ Origin 内から発生した意図しないリクエスト(XSS などで仕込まれた Form など)からのリクエストだった場合は判別できない。

実際にそうした脆弱性が報告されてしまったため、追加の対策が求められるようになった。

[Security/Origin - MozillaWiki](https://wiki.mozilla.org/Security/Origin)


### One Time Token の付与

任意のヘッダが付与できるとしても、付与すべき Valid な値を攻撃者が取得できなければ、対策の有効性が増す。

そこで、サーバから暗号的に安全な乱数を、短命な One Time Token (nonce という場合もある) として付与し、それを POST のリクエストに含むことを求める方法が考えられる。

これを、独自の HTTP Header で受け渡しするか、 HTML Form に hidden で隠し、リクエストの Body に載せる方法が主流だろう。

現在では、主要なフレームワークは、 CSRF 対策として何らかの形でこうした手法をサポートしている。


### Same Site 属性の付与

ここまでの手法はいずれもリクエストの中身から、想定されたコンテキストでのリクエストかを判断することで、攻撃を防ぐという手法である。

しかし、そもそも「*他のサイトからのリクエストでも、 Cookie が自動で付与される*」という挙動を制御できれば、追加のロジックが無くとも POST 自体を否認することができるだろう。

そこで、「この Cookie は他のサイトからのリクエストには付与してはならない」ということを明示的にブラウザに知らせるのが Same Site Cookie である。

CSRF のために設置された罠サイトからリクエストが発生できたとしても、そこには SameSite 指定した Cookie が付与されないため、他のヘッダのチェックも無くサービスはそのリクエストを受け付けずに済む。

Cookie 属性に付与することのポイントは、別のヘッダによる総合的な判断では無く、 Cookie の有無そのものを制御できるため、仮に「任意のヘッダを付与できる脆弱性」があったとしても、影響を受けにくいことだ。

もし全てのブラウザが対応すれば、理想的には CSRF 対策のための One Time Token は不要となることが期待される。

逆を言えば、それまでは、既存の手法(One Time Token)との並行運用などが必要となる。


## Same Site Cookie

Same Site Cookie は、 Set-Cookie ヘッダに付与する新しい属性であり、現状 2 つの値を取る。


```
Set-Cookie: key=value; SameSite=Strict
Set-Cookie: key=value; SameSite=Lax
```

<https://tools.ietf.org/html/draft-ietf-httpbis-rfc6265bis-02#section-5.3.7>


### Strict

Same-Site のリクエスト以外では一切 Cookie を送らなくなる。

これは CSRF 対策の観点からはかなり強い制限である。

しかし、単に Session Cookie にこの属性を付与すると、例えば別の Origin からリンクで遷移した場合に、 Cookie が送られないため、ログイン状態にならなくなる。


### Lax

Cross Site のリクエストでも、 HTTP Method が Safe (GET, HEAD etc) である場合のみ Cookie を送る。

別のサイトにあるリンクから遷移した場合は GET であるため Cookie が付与され、ログイン状態が維持できる。

一方、 Form からの POST を用いた CSRF などは、 Cookie が付与されないため、攻撃が成立しなくなる。


## SameSite Cookie の導入


### 既存の Cookie に対する Lax の付与

他のサイトから遷移した場合に毎回ログインを要求するのは利便性の観点から問題が出る。

そこで、互換性を崩さずに導入するためには、すでに運用されている Session Cookie に lax を付与するのが安全だろう。

ただし、サポートしていないブラウザが、 SameSite 属性を無視するだけなので、しばらくは従来の対策との並行運用が必要になる。


### Read/Write Cookie の分離運用

Form からの POST による CSRF を考えれば Lax の付与だけでもかなり効果があるだろう。

しかし、より根本的に安全性を高めるのであれば、 Strict の導入が望ましい。

RFC では Cookie を Read Cookie と Write Cookie の 2 つにわける構成も言及されている。

<https://tools.ietf.org/html/draft-west-first-party-cookies-07#section-5.2>

Read Cookie

:  表示のみを許可する Cookie 、これが送られればユーザのセッション(ログイン状態)が維持される。

Write Cookie

:  書き込みを許可する Cookie 、例えば、 SNS であれば投稿やプロフィールの変更、 EC であれば購入やキャンセルなど、副作用が必要な操作に求められる Cookie 。

この構成に Cookie を分離し、 Write Cookie を Strict にすれば CSRF 対策としては強固になる。

Read Cookie には SameSite をつけないか、 Lax にすることで Top Level Navigation でもセッションを維持できる。


```http
Set-Cookie: read=zxcv; Path=/; Secure; HttpOnly;
Set-Cookie: write=asdf; Path=/; Secure; HttpOnly; SameSite=Strict
```

もし新規の開発や改修が可能であるならば、こうした構成も可能かもしれないが、既存のサービスのほとんどはここまで手を入れるのは難しだろう。

先にフレームワークなどに機能として取り込まれ、デプロイレベルの知見が貯まるまでは、 Lax のみの運用が現実的かもしれない。


## CSRF 対策以外の効果

今回は Same Site Cookie のわかりやすい効果として CSRF 対策を例として解説した。

しかし、その効果は CSRF 対策がシンプルになるというだけのものでは無い。
現在の Web のセキュリティは、 Origin を基礎としたセキュリティモデルの上に立脚している。

しかし、 Cookie はより古くから使われている仕様であるため、 Origin の枠に収まっていない。

後から Domain, Secure 属性などを付与することである程度の改善が試みられたが、いずれも十分とは言えない仕様だった。

Same Site Cookie は、この点をある程度カバーするための仕様であり、単純に言えば「意図しない場面で送られない」という制約を課す仕様と言える。

「意図しない場面で送られる」代表例として CSRF があるが、他にも今年話題になった Spectore/Meltdown のようなサイドチャネルアタックについても同じことが言える。

他にも、最近 NTT と早稲田の研究者によって報告された Twitter の Silhouette (シルエット) という攻撃についても、 Same Site Cookie は有効と報告されている。

[Protecting user identity against Silhouette](https://blog.twitter.com/engineering/en_us/topics/insights/2018/twitter_silhouette.html)

つまり、「意図しない場面で送られなくなる」ということは、単なる CSRF 対策だけでなく、より汎用的に Cookie という Credential を守ることができるということだ。

したがって、「現状 CSRF Token を発行して CSRF 対策をしているから不要」というのは問題の一部に対する対策でしか無い。


## Cookie の改善

Cookie の仕様に問題があるという認識は共通しており、 Same Site のような属性の付与では無く根本的に設計し直そうという話もある。

[mikewest/http-state-tokens: Incrementally better HTTP state management](https://github.com/mikewest/http-state-tokens)

他にも類似する問題(Cookie に限らず)は、 Cross Origin Info Leaks という文脈で議論されることが多いが、そちらについては別途エントリにまとめたいと思う。


## 本サイトへの適用

本サイトでは Google Analytics 以外に Cookie は使っていないため、適用は無い。


## DEMO

動作する DEMO は以下に用意した

<https://labs.mozaic.fm/same-site-cookie/>
