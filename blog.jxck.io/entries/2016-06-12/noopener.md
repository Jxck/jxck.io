# [html][security] リンクのへの rel=noopener 付与によるフィッシング詐欺対策

## Intro

本サイト以下全ての `target=_blank` 付きのリンクに `rel="noopener noreferrer"` の付与を実施した。

このプロパティの意味と、これが無い場合のフィッシング詐欺攻撃の可能性について解説する。


## window.opener

例えば http://parent.example.com に表示された `<a href="http://child.example.com" target=_blank>` というリンクをクリックした場合、 http://child.example.com が別タブ(ウィンドウ)として開かれる。

この時、開いた側の http://parent.example.com を parent 、開かれた側の http://child.example.com を child とする。

child 側では以下のような JS を書くことで、 parent 側の location を変えて、任意の URL に遷移されることが可能である。

```
window.opener.location = http://fishing.example.com
```

多くのブラウザでは、 child が別タブで開いた場合に、そちらが手前に表示され、 parent は裏に回る。
child で上記の JS が動くと、裏で勝手に parent が画面遷移している状態となる。


これは、オリジンが違っても可能であるため、リンクをたどってきたユーザを任意のサイトに誘導することが可能というわけである。


## DEMO

言葉では分かりにくいので、デモを用意した。

[Window Opener DEMO](https://labs.jxck.io/noopener/)


リンク先が Parent ページであり、真ん中のリンクから開いた Child ページが、裏で Parent を http://example.com に遷移させている。

以下のような挙動が確認できるはずだ。

![Window Opener DEMO](window-opener.gif#150x150)


## open link in new tab

`target=_blank` が無いリンクを、別タブとして開いても、この攻撃は再現しないようである。

しかし、 `target=_blank` がついたリンクを、さらに別タブとして開く場合の挙動は、ブラウザによって異なる。


| Browser   | Click | Shift+click | Meta/Ctrl+click |
|:----------|:-----:|:-----------:|:---------------:|
| Chrome40  | x     | x           | x               |
| Firefox34 |       |             |                 |
| Opera26   | x     | x           | x               |
| Safari7,8 | x     |             |                 |


なお IE は(security zone setting をいじらない限り)この問題が発生しないようだ。


引用元: [blankshield demo \| Reverse tabnabber phishing](https://danielstjules.github.io/blankshield/)


## revers tabnabbing

上記の挙動を利用して、以下のような攻撃が考えられる。

これも言葉での説明ではわかりにくいので、先に実行結果を示す。




### 攻撃の概要

https://cgm.example.com というサービスがあるとし、これは FB や Twitter のような、任意のリンクを貼ることができて、そのリンクが自動的に `target=_blank` にマークアップされるサイトを想定する。

https://cgm.example.com/login がログインページであり、ここでユーザ名とパスワードを入力する。

攻撃者は、このサービスの不特定ユーザのユーザ名およびパスワードを盗みたいとする。

攻撃者が必要な準備は以下である。


### 収集用サイト

ユーザ情報を収集する、ダミーサイトである。

- 対象サイトと酷似したドメイン取得する、今回の場合 `cgn.example.com` など
- https://cgn.example.com/login に本家のログインページと全く同じ見た目を実装する
- ログイン情報を収集したら、すぐさま本家 https://cgm.example.com にリダイレクトするよう実装する


### 誘導用サイト

ユーザを収集用サイトに誘導するサイトである。

- 見た目がごく普通のサイト `https://happy.example.jp` を用意する
- このサイトに `window.opener.location = "https://cgn.example.com/login"` を仕込む
- (この JS が動くなら、 XSS でこのスクリプトを別サービスに仕込んでも代替できる)


### 攻撃

実際の攻撃は以下の手順で行う

- 本家のサービスに `https://happy.example.jp` のリンクを貼る
- 本家サービスを利用中の他のユーザに、このリンクを踏ませる

これだけである。


### 被害者 A さん

では、ここで被害者として A さんを想定する。

- A さんが本家サイトを閲覧中、攻撃者が貼った `https://happy.example.jp` のリンクを見つけ、それをクリックする。
- A さんのブラウザでは、別のタブで `https://happy.example.jp` が開き、本家のタブは裏に隠れる。
- A さんが、 `http://happy.example.jp` を見終わって閉じると、さっきまでの本家サイトのタブがなぜかログイン画面になっている。
- A さんは、「まあ、 Amazon とかもなんかのタイミングでログイン要求したりするしな」と、ユーザ名/パスワードを入力する。
- ログインが完了し、本家のメイン画面が開く。


最近は Amazon などが、遷移の途中でログインを要求する場合があるため、この挙動を攻撃とは思わないユーザがいても不思議では無いだろう。
もっとも、自分が開いていた正しいページが、勝手に別の攻撃ページに置き換わっているなんて予期しないと思われる。

最後のリダイレクトは、攻撃サイトからすでにログイン済みの本家サイトにリダイレクトすることで、
本家のメインページが開くため、ユーザからみれば、単にログインが成功したように見える。

ここで A さんの情報が盗まれている。


### A さんが気づけるとすれば

もし A さんがかなりリテラシーが高く、かつ非常に神経質だったとする。
A さんが見破れるとしたら以下の点であるだろう。

- 別タブで誘導サイトを開いたときに、裏でタブがリダイレクトしたことを、タブのアイコンで気づく
- 何もしてないのに勝手にログアウトされていることに不信感を抱き気づく
- ブラウザが記録しているログイン情報が自動挿入されないことに気づく
- ドメイン名が嘘であることに気づく
- メジャーなサービスなのに URL バーに組織情報が表示されずに気づく

さて、これは現実的かというと、それなりのリテラシーが無いと難しいと思われる。


### 対策

本家サービスからすれば、ダミーのログイン画面に対してできることは無い。
銀行当のサイトが注意喚起を高い頻度で行っていることを見てもわかるだろう。

したがって、この攻撃ストーリーであれば、最初の誘導サイトを開いたときにリダイレクトされることを防ぐのが効果的である。

そこで使用できるのが `rel=noopener` 属性である。


## noopener

parent 側のリンクタグに `rel=noopener` を追加することで、 child が parent を `window.opener` 経由で参照できなくなるため、 parent の location の変更などを抑止することが可能である。

ただし、 Firefox は現時点で `noopener` に対応していないが、代替として `noreferrer` を指定することで同じ挙動が実現できる。

したがって、 `<a href="http://attack.example.com" target=_blank rel="noopener noreferrer">` とすることで目的が達成できる。


## DEMO

`rel` の有無により、child から parent ページの遷移の動作を試すデモも以下に用意した。

先ほどと同じ、以下のページの最後のリンクが Parent ページの遷移を抑止している。

[noopener DEMO](https://labs.jxck.io/noopener)


## 本サイトでの適用

そもそも `target=_blank` が無ければ対応の必要はなく、モバイルに向けては `target=_blank` は UX を損ねるという話もあるため、本サイトでは基本的に `target=_blank` は付与していない。

ただ、ごく一部デモページで `target=_blank` を付けていたので、それら全てについて `rel="noopener noreferrer"` の付与を実施した。
