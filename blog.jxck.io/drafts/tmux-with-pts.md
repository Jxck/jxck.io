# [pty][tmux][tips] Linux で出力を別の shell に表示する

## intro

tmux, screen, termina のタブなど、 shell を複数起動する方法はいくつかある。
Linux では、 pty を経由すれば、ある shell の出力を簡単に別の shell で表示することができる。
これを応用すると、簡易ダッシュボードを作り色々便利に使うことができる。


## stdout/stderr

代表例として、 tmux で pane を分割し、コマンドの出力を stdout/stderr で分けて pane ごとに表示するケースで解説する。

まず、以下のようにランダムにエラー出力を吐くプログラムを実行する。


```js:hello_world
```

ターミナル上では stdout/stderror の出力は同じ画面上に出る。


```
$ ./hello_world
hello
world
hello
world
world
world
world
hello
world
```


tmux で別のペインで表示したい場合に、例えば一旦別のファイルに追記し、ペインごとに `tail -f` することもできる。

```
$ ./hello_world 1> ./success.log 2> ./error.log
```

```
# pane1 for stdout
$ tail -f access.log
```

```
# pane2 for stderr
$ tail -f error.log
```

この一時ファイルに相当するものとして pty を代用できる。


## /dev/pts

tmux で pane を開いた状態で、 `tty` コマンドで紐付いた pts を確認する。
(`ps で確認することもできる)

```
$ tty
/dev/pts/2
...
```

紐付いている pts の番号が 2 なので、その実態は `/dev/pts/2` となる。
試しに、別の pane からこの PTS に対して書き込みをしてみると、結果が表示されることがわかるだろう。


```
## 別の pane
$ echo hello > /dev/pts/2
```

```
pane1 for stdout
$ hello # 表示される
```

逆に、別の pane から cat で読み出すと、入力された値を奪い取ることもできる。

```
## 別の pane
$ cat /dev/pts/2
# 入力が表示される
```

```
$ # ここでの入力は奪われる
```

つまり、 pts への書き込みは pane に表示され、 pane への入力は pts から読み出せる。
pts は疑似端末であり、 tmux と shell に間に挟まったファイルのようなものだと思えば良い。


つまり、実行結果の stdout を pane1 (`/dev/pts2/` に紐づくとする) に、 stderr を pane2 (`/dev/pts5/` に紐づくとする) 場合。

```
$ ./hello_world 1> /dev/pts2 2> /dev/pts5
```

これで、それぞれの表示だけを行う 2 つの pane を作ることができる。


## 応用

`tee` コマンドと、プロセス置換を使うと、出力を自由にフィルタし分岐することができる。
この分岐先を、好きな pane にすれば、簡易ダッシュボードを作ることができる。


例えば access_log をステータスコードごとに出すなどもできる。

```
$ tail -f access.log | tee >(grep 404 > /dev/pts/5) >(grep 500 > /dev/pts/6) >(grep 451 > /dev/pts/7)
```


Logger のタグを使った分岐なんかも地味に便利だったりする。

```
$ tail -f debug.log | tee >(grep Info > /dev/pts/5) >(grep Debug > /dev/pts/6) >(grep Trace > /dev/pts/7)
```
