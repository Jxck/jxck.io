# [html][security] リンクのへの rel=noopener 付与による Tabnabbing 対策

## Intro

本サイト以下全ての `target=_blank` 付きのリンクに `rel="noopener noreferrer"` の付与を実施した。

このプロパティの意味と、これが無い場合のフィッシング詐欺攻撃の可能性について解説する。


## window.opener

以下が今回注目する挙動である。

![Window Opener DEMO](window-opener.gif#150x150 'window opener demo')

このデモでは、 [https://labs.jxck.io/noopener](https://labs.jxck.io/noopener) から開いた [https://labs.jxck.io/noopener/opener-change.html](https://labs.jxck.io/noopener/opener-change.html) のページが別タブで開いた後、最初に開いたタブが勝手に [http://example.com](http://example.com) に遷移しているというものである。

最初のページを Parent 、開いたタブを Child とする。

child 側では以下のような JS が書かれており、 parent 側の location を変えて、任意の URL に遷移されることが可能である。


```
window.opener.location = http://example.com
```

多くのブラウザでは、 child が `target=blank_` により別タブで開いた場合に、そちらが手前に表示され、 parent は裏に回る。

child で上記の JS が動くと、裏で勝手に parent が画面遷移している状態となる。

これは、オリジンが違っても可能であるため、リンクをたどってきたユーザを任意のサイトに誘導することが可能というわけである。

[Window Opener DEMO](https://labs.jxck.io/noopener/)


## open link in new tab

`target=_blank` が無いリンクを、別タブとして開いても、この攻撃は再現しないようである。

しかし、 `target=_blank` がついたリンクを、さらに「別タブとして開く」機能を用いて開いた場合の挙動は、ブラウザによって異なる。


| Browser   | Click | Shift+click | Meta/Ctrl+click |
|:----------|:-----:|:-----------:|:---------------:|
| Chrome40  | x     | x           | x               |
| Firefox34 |       |             |                 |
| Opera26   | x     | x           | x               |
| Safari7,8 | x     |             |                 |


なお IE は(security zone setting をいじらない限り)この問題が発生しないようだ。

引用元: [blankshield demo \| Reverse tabnabber phishing](https://danielstjules.github.io/blankshield/)


## tabnabbing

上記の挙動を、フィッシング詐欺に利用できることが既に指摘されている。

この手法は Tabnabbing と呼ばれている。

- [Tabnabbing: A New Type of Phishing Attack Aza on Design](http://www.azarask.in/blog/post/a-new-type-of-phishing-attack/)
- [Target="_blank" - the most underestimated vulnerability ever](https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/)

この攻撃方法を解説する。


### 攻撃の概要

![tab-nabbing.svg](tab-nabbing.svg#500x500 'tab-nabbing の解説図')

`https://cgm.example.com` (左上) というサービスがあるとし、これは SNS やチームコラボレーション系サービスを想定する。

攻撃者は、このサービスの不特定ユーザのユーザ名およびパスワードを盗みたいとする。

この攻撃の成立のために、サービスに必要な仕様は **任意のリンクを貼ることができて、そのリンクが `target=_blank` にマークアップされる** ことである。

攻撃者が必要な準備は以下である。


### 誘導用サイト(右上)

ユーザを収集用サイトに誘導するサイトである。

- 見た目がごく普通のサイト `https://happy.example.jp` を用意する
- このサイトに `window.opener.location = "https://cgn.example.com/login"` を仕込む
- (この JS が動くなら、 XSS でこのスクリプトを別サービスに仕込んでも代替できる)


### 収集用サイト(左下)

ユーザ情報を収集する、ダミーサイトである。

- 対象サイトと酷似したドメイン取得する、今回の場合 `cgn.example.com` など
- `https://cgn.example.com/login` に本家のログインページと全く同じ見た目を実装する
- ログイン情報を収集したら、すぐさま本家 `https://cgm.example.com` (右下==左上) にリダイレクトするよう実装する


### 攻撃

実際の攻撃は以下の手順で行う

- 本家のサービスに `https://happy.example.jp` (右上) のリンクを貼る
- 本家サービスを利用中の他のユーザに、このリンクを踏ませる
- 被害者は、別のタブで開き、本家のタブは裏に隠れる。
- 見終わって閉じると、さっきまでの本家サイトのタブがなぜかログイン画面(左下)になっている。
- このログイン画面はダミーであり、ユーザ名/パスワードを入力すると、本家(右下)へリダイレクトする。

最近は遷移の途中や、一定時間経過後にログインを要求するサービスもあるため、この挙動を攻撃とは思わないユーザがいても不思議では無いだろう。

最も、自分が開いていた正しいページが、勝手に別の攻撃ページに置き換わっているという想定が一般的とは考えにくい。 

最後のリダイレクトは、攻撃サイトから既にログイン済みの本家サイトにリダイレクトすることで、ユーザからみれば単にログインが成功したように見える。

つまり、攻撃自体に気づけない可能性もある。


### 攻撃に気づくために

被害者が攻撃を見破れるとしたら以下の点であるだろう。

- 別タブで誘導サイトを開いたときに、裏でタブがリダイレクトしたことを、タブのアイコンで気づく
- 何もしてないのに勝手にログアウトされていることに不信感を抱き気づく
- ブラウザが記録しているログイン情報が自動挿入されないことに気づく
- ドメイン名が違うことに気づく
- メジャーなサービスなのに URL グリーンバーに組織情報が表示されずに気づく


### 対策

本家サービスからすれば、ダミーのログイン画面に対してできることは無い。

銀行当のサイトが注意喚起を高い頻度で行っていることを見ても分かるだろう。

したがって、この攻撃ストーリーであれば、最初の誘導サイトを開いたときにリダイレクトされることを防ぐのが効果的である。

そこで使用できるのが `rel=noopener` 属性である。


## noopener

parent 側のリンクタグに `rel=noopener` を追加することで、 child が parent を `window.opener` 経由で参照できなくなるため、 parent の location の変更などを抑止することが可能である。

[4.6.6.11 Link type "noopener" \| WHATWG Spec](https://html.spec.whatwg.org/multipage/semantics.html#link-type-noopener)

ただし、 Chrome, Opera 以外は現時点で `noopener` に対応していない。

[rel=noopener \| Can I use](http://caniuse.com/#feat=rel-noopener)

代替として `noreferrer` を指定することで同じ挙動が実現できる。

したがって、以下のようにすることで目的が達成できる。


```html
<a href="http://example.com" target=_blank rel="noopener noreferrer">
```

ただし `noreferrer` はその名の通り Referrer を抑止する属性であるため、副作用には注意が必要である。


## DEMO

`rel` の有無により、 child から parent ページの遷移の動作を試すデモも以下に用意した。

[noopener DEMO](https://labs.jxck.io/noopener)


## 本サイトでの適用

そもそも `target=_blank` が無ければ対応の必要はなく、モバイルにおいて `target=_blank` は UX を損ねるという話もあるため、本サイトでは基本的に `target=_blank` は付与していない。そもそもログインなどのクレデンシャルの保持も無い。

ただ、ごく一部デモページで `target=_blank` を付けていたので、それら全てについて試験的に `rel="noopener noreferrer"` の付与を実施した。


## 注意

`window.opener` の挙動は、あくまでもフィッシング詐欺への応用が可能であるだけで、実際の攻撃はダミーのログイン画面への入力時点で発生している。

フィッシングメールに含まれるリンクからの誘導や、ダミーログインの URL を直接踏ませるのとも本質的には同じである。

したがって、リンクに `rel=noopener` を付与していないサイトが総じて脆弱であるというわけではない。

例えば Google はこの挙動を脆弱性とは認定していない。

- [Phishing by navigating browser tabs - Bughunter University](https://sites.google.com/site/bughunteruniversity/nonvuln/phishing-with-window-opener)

ただし、「既に開いているタブが、勝手に遷移している可能性がある」というのは、一般的に知られた挙動とは言えないと考える。

システムを騙すより人間を騙す方が楽であるため、安全側に倒すという意味においても、システム側で対応可能な本対策は検討に値するのではないだろうか。
