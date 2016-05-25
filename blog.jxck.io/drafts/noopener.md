# [html][security] target=_blank がもたらすフィッシング詐欺の可能性と対応

## Intro

本サイト以下全ての `target=_blank` 付きのリンクに `rel="noopener noreferrer"` の付与を実施した。

このプロパティの意味と、これが無い場合のフィッシング詐欺攻撃の可能性について解説する。


## window.opener

例えば http://parent.example.com に表示された `<a href="http://attack.example.com" target=_blank>` というリンクをクリックした場合、 http://attack.example.com が別タブ(ウィンドウ)として開かれる。

この時、開いた側の parent.example.com を parent 、開かれた側の attack.example.com を child とする。

child 側では以下のような JS を書くことで、 parent 側の location を変えて、画面を遷移されることが可能である。

```
window.opener.location = http://fishing.example.com
```

多くのブラウザでは、 child が別タブで開いた場合に、そちらが手前に表示され、 parent は裏に回る。
child で上記の JS が動くと、裏で勝手に parent が画面遷移している状態となる。

これは、オリジンが違っても可能であるため、リンクをたどってきたユーザを任意のサイトに誘導することが可能というわけである。


## revers tabnabbing

上記の挙動を利用して、以下のような攻撃が考えられる。

https://cgm.example.com というサービスがあるとし、これは FB や Twitter のような、任意のリンクを貼ることができて、そのリンクが自動的に `target=_blank` にマークアップされるサイトを想定する。

https://cgm.example.com/login がログインページであり、ここでユーザ名とパスワードを入力する。

攻撃の準備は以下である。

- そのサイトと酷似したドメイン(cgn.example.com など)を取得する
- Let's Encrypt などで https 化を行う
- https://cgn.example.com/login に本家のログインページと全く同じ見た目を実装する
- 本家のサービスに任意の攻撃サイト(実際にはそうは見えないページ)へのリンクを貼る
- その攻撃サイトには `window.opener.location = "https://cgn.example.com/login"` の JS を仕込む


この状態で本家サイトのリンクをクリックしたユーザは、別タブで攻撃サイトが開いた裏で、なぜかもとのページがログインページになってしまった状態に見える。

最近は Amazon などが、遷移の途中でログインを要求する場合があるため、この挙動を攻撃とは思わないユーザがいても不思議では無いだろう。
もっとも、自分が開いていた正しいページが、勝手に別の攻撃ページに置き換わっているなんて予期しないと思われる。

ぱっと見ドメインも似ており HTTPS にもなっているので、ダミーページにパスワードを入れてしまう可能性は非常に高く、一旦ダミーページでパスワードがサブミットされたら、まるでパスワードが間違っていたかのように、本家のログインページにリダイレクトすれば、よりユーザに気付かれにくい攻撃が可能になるだろう。


## open link in new tab

`target=_blank` が無いリンクを、別タブとして開いても、この攻撃は再現しないようである。

しかし、 `target=_blank` がついたリンクを、さらに別タブとして開く場合の挙動は、ブラウザによって異なる。


| Browser   | Click | Shift+click | Meta/Ctrl+click |
|:----------|:-----:|:-----------:|:---------------:|
| Chrome40  | x     | x           | x               |
| Firefox34 |       |             |                 |
| Opera26   | x     | x           | x               |
| Safari7,8 | x     |             |                 |


なお IE は(security zone setting をいじらない限り)この問題が発生しない。


[引用](https://danielstjules.github.io/blankshield/)


## noopener

parent 側のリンクタグに `rel=noopener` を追加することで、 child が parent を `window.opener` 経由で参照できなくなるため、 parent の location の変更などを抑止することが可能である。

ただし、 Firefox は現時点で `noopener` に対応していないが、代替として `noreferrer` を指定することで同じ挙動が実現できる。

したがって、 `<a href="http://attack.example.com" target=_blank rel="noopener noreferrer">` とすることで目的が達成できる。


## DEMO

`rel` の有無により、child から parent ページの遷移の動作を試すデモを以下に用意した。

[labs.jxck.io/noopener](https://labs.jxck.io/noopener)


## 本サイトでの適用

そもそも `target=_blank` が無ければ対応の必要はなく、モバイルに向けては `target=_blank` は UX を損ねるという話もあるため、本サイトでは基本的に `target=_blank` は付与していない。

ただ、ごく一部デモページで `target=_blank` を付けていたので、それら全てについて `rel="noopener noreferrer"` の付与を実施した。
