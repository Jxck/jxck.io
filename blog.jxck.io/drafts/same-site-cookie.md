# [cookie][security] Same Site Cookie による CSRF/XSSI 対策

## Intro

これまで CSRF 攻撃の対策は、 Form に hidden 属性でワンタイムトークンを隠す方法が主流となっていた。

しかし、現在策定/実装が進んでいる SameSite Cookie を使用すると、 Cookie が送信される条件を変えることができ、 CSRF の対策になることが期待されている。

そもそもの Cookie が持つ歪な仕様と CSRF の仕組み、そして SameSite Cookie の効果について解説する。

また、 Spectre を踏まえた CSRF 以外の攻撃における SameSite Cookie についても解説する。


## CSRF の仕組み

CSRF(Cross Site Request Forgery) は、ブラウザが保存している Cookie を発行元ドメインへのリクエストに自動で付与する挙動を利用した攻撃方法である。

例えば、ログインを必要とする SNS があったとする。

その SNS への投稿は Form から行い、そのリクエストに正しい Cookie があって初めて投稿が成立する。

攻撃者はその投稿 Form と同じリクエストを生成する Form を作り、それを全く別の罠サイトに設置する。

ここに、 SNS にログインし Cookie を保持しているユーザを誘導し、なんらかの方法で Form を Submit すれば攻撃は成立だ。

そのリクエストには Cookie が自動的に付与されるので、 SNS サービスに届くリクエストは正規のものと区別がつかない。

これを利用し、ユーザに意図しない投稿を行わせることが、 CSRF の概要となる。

これが、 SNS の投稿ではなく、商品の購入や送金、パスワードの変更だった場合は、より被害が大きくなるだろう。


## CSRF 対策

この攻撃の肝は、どのページから発生したものでも、 SNS サイトへのリクエストには、 SNS サイトの Cookie が付与される。という Cookie の仕様に有る。

つまり、サービスとしては何らかの形で、届いたリクエストが「自サイト内で発生した、意図したものか」「他のサイトから来た、意図しないものか」を区別する必要がある。

ここで問題になるのは、「何を見れば良いか」である。


## Origin/Refere の確認

Referer Header には、どの URL からのリクエストであるかが記載される。

この値により、自サイトから発生したリクエストであるかは判断できそうだが、いくつか問題がある。

まず、 Referer はページ間の遷移を追跡する目的で使われるため、ユーザが設定により無効している可能性を考慮しなくてはならない。

そこで、情報を Origin のみに絞る(URL から Path を省く)ヘッダである Origin Header を確認する方が用途としては妥当性がある。 Same Origin の場合は GET/HEAD では送られないが、こうした用途は基本 POST を想定する。

まとめると、基本的にサービスは Origin Header を確認すれば CSRF に対応することが可能になる。

しかし、この方法は、任意のヘッダを追加できるという脆弱性があり、それを CSRF に組み合わせられる場合は容易に突破できてしまう。

この場合 Origin Header の値は単なる Origin であり、攻撃者が容易に Valid な値を付与できてしまう。

もし、任意のヘッダを追加できるという脆弱性を想定しなければ、 Origin の確認は有効に機能するが、実際にそうした脆弱性が報告されてしまったため、追加の対策が求められるようになった。


## One Time Token の付与

任意のヘッダが付与できるとしても、付与すべき Valid な値を攻撃者が取得できなければ、対策の有効性が増す。

これには、サーバから暗号的に安全な乱数を、短命な One Time Token (nonce という場合もある) として付与し、それを POST のリクエストに含むことを求める方法が考えられる。

これを、独自の HTTP Header で受け渡しするか、 HTML Form に hidden で隠し、リクエストの Body に載せる方法が主流だろう。

現在では、主要なフレームワークは、 CSRF 対策として何らかの形でこうした手法をサポートしている。


## Same Site Cookie

ここまでの手法はいずれもリクエストの中身から、想定されたコンテキストでのリクエストかを判断することで、攻撃を防ぐという手法である。

しかし、そもそも「他のサイトからのリクエストでも、 Cookie が自動で付与される」という挙動を制御できれば、追加のロジックが無くとも POST 自体を否認することができるだろう。

そこで、「この Cookie は他のサイトからのリクエストには付与してはならない」ということを明示的にブラウザに知らせるのが Same Site Cookie である。

CSRF のために設置された別 Origin の罠サイトから POST リクエストが発生できたとしても、そこには SameSite 指定した Cookie が付与されないため、他のヘッダのチェックも無くサービスはその POST を受け付けずに済む。

Cookie 属性に付与することのポイントは、別のヘッダによる総合的な判断では無く、 Cookie の有無そのものを制御できるため、仮に「任意のヘッダを付与できる脆弱性」があったとしても、影響を受けにくいことだ。

もし全てのブラウザが対応すれば、理想的には CSRF 対策のために One Time Token を正規フローで発行する必要も無くなる。

しかし、それまでは、既存の手法(One Time Token)との並行運用などが必要となる。


## Same Site Cookie

Same Site Cookie は、 Set-Cookie ヘッダに付与する新しい属性であり、現状 2 つの値を取る。


```
Set-Cookie: key=value; SameSite=Strict
Set-Cookie: key=value; SameSite=Lax
```

strict は同じオリジンにしか Cookie を付与しない。

これは、 GET に対しても同じである

https://gist.github.com/mala/8857629

http://blog.a-way-out.net/blog/2015/03/23/stateless-csrf-protection/


## SameSite Cookie の導入

CSRF 対策という観点で考えるのであれば、 strict を付与できれば理想的である。

しかし、もし Session Cookie に strict を付与すると、他のページから遷移してきたユーザは Cookie を送ってこないため、ログインを要求する必要が出てしまう。

一般的に(Google, Facebook, Amazon など多くのサービスがそうであるように)、リンクをクリックすればログインした状態でページが表示されるのが一般的だろう、いちいちログインを求めてはユーザにとっては不便だ。

そこで、互換性を崩さずに導入するためには、すでに運用されている Cookie に lax を付与するのが安全である可能性が高い。

もし新規の開発、改修が可能であるならば、 Cookie を Read Cookie と Write Cookie の 2 つにわける構成が考えられるだろう。

Read Cookie: 表示のみを許可する Cookie 、これが送られればユーザのセッション(ログイン状態)が維持される。

Write Cookie: 書き込みを許可する Cookie 、例えば、 SNS であれば投稿やプロフィールの変更、 EC であれば購入やキャンセルなど、特権が必要な操作に求められる Cookie 。

先の、別ページから来た場合にログインが求められる問題の対策として、 Session Cookie は SameSite にはしない。しかし CSRF が成立しないように、この Cookie を含むリクエストだけでは特権操作を許可しないという実装をする。

対して Credential Cookie には SameSite: strict を付与し、 CSRF 成立しても Cookie が送られないようにする。実際にサイト内で購入や投稿などを行う場合は、同一サイト内の Form からのリクエストになるようにし、ここでは Credential Cookie が送られてくれば、操作を許可する。


```
Set-Cookie: session=zxcv; Path=/; Secure; HttpOnly;
Set-Cookie: credential=asdf; Path=/; Secure; HttpOnly; SameSite=Strict
```
