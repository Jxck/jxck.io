# [systemd][ssh][linux][nuc] Intel NUC で自宅 Ubuntu 開発環境構築と SSH Port Forwarding によるアクセス


## Intro

家では Mac を使っていたが、やはり Ubuntu 開発環境を作ることにした。

前々から気になっていた Intel NUC をベースに Ubuntu 環境を構築。

また、外出時もアクセスできるように SSH Port Fowarding を使って、固定 IP の無い家に外からアクセスできるようにした。

備忘録を兼ねて記す。


## 自宅開発環境

自宅では長らく Mac を使ってきたが、やはり Linux 環境があったほうが良いということで、数年ぶりにラップトップ以外の PC の購入を検討した。

自宅サーバとして使えれば、宅内オートメーションや、さまざまな用途にも流用できて、遊ぶ上でも良いだろう。

今は mini PC も色々出ており、選択肢も多く、比較的安価に、場所をとらないサーバが組めるようになった。

これを期に、高い Mac の買い替え更新をやめ、 Air などの持ち運び用途に特化したものを選び、メインリソースとしてどこからもアクセスできる自宅サーバを組むことにした。


## 要件

要件は以下になる。

- 邪魔にならない
- 静か
- どこからでもアクセスできる


## 邪魔にならない

最後にデスクトップを買ったのは 10 年以上前で、そこからずっと Mac のラップトップで過ごしてきたため、基本的に大きな筐体を置く前提の家になってない。

そこで、タワー型より、机の端にちょこっと置けるくらいの mini PC 程度が良く、前から気になっていた Intel NUC をベースにすることにした。


## 静か

家に置く上で、ファンなどがうるさいのが一番ストレスになる。発熱しやすい作りはあまり好ましくない。

Mac 以外の PC 事情はあまり詳しくないので、久々に家電量販店で詳しそうな店員に色々聞いてみる。

Intel NUC でそれなりのスペックを選ぶと、 Core i7 で M.2 SSD などが選択可能だが、それらは電力消費が大きく、ということは発熱しやすいとのこと。

正直そこまで CPU をぶん回すような処理も、クラスタを組んでどうこうといったこともしないし、スペックが過剰である必要はない。

値段も抑えられるので、今回はとりあえず控えめに組んでおくことにした。

- NUC 自体の世代
  - 8 以降は排熱が改善されているらしい
- Intel Core の世代
  - 4 Core 8 Thread あると嬉しい
  - i7 で電気を食うなら i5 で別に良い
- SSD
  - M.2 NVMe は高電力で発熱しやすいらしい
  - そこまでの書き込み速度いらないので 2.5" SSD で十分
  - 外部ストレージがすでにあるので、サイズも小さくて良い
- RAM
  - 特に発熱はあまり関係なさそう
  - とりあえず 16G を 1 枚指しておて不足ならもう 16G 買い足す

すると NUC8i5BEH になる。

あとは、その用途に合いそうなパーツをセットで購入し組む。

- [NUC8I5BEH](https://www.amazon.co.jp/dp/B07J6T286L)
- [Kingston DDR4-2400 (PC4-19200) 16GB](https://www.amazon.co.jp/dp/B01LW588R9)
- [Crucial SSD 500GB MX500](https://www.amazon.co.jp/dp/B077PPN5NN)
- [BUFFALO 電源ケーブル](https://www.amazon.co.jp/dp/B014GLJJ32)

組み立ても、開けて指すだけなので特に難しいところは無かった。

Ubuntu 19.10 eoan を入れたが、これもすんなり入った。


## どこからでもアクセスできる

自宅内に置いているため、固定 IP などはない。

しかし、せっかく作った環境は、外出先等でも使いたいため、外からもアクセスできるようにしたい。

すでに Sakura VPS には固定 IP を振っているため、これを用いた最も安価で簡単な方法は SSH の Portfowarding だろう。


### 構成

外出先の Laptop から Sakura VPS を踏み台にして NUC に SSH 接続したい。

構成としては以下のようになる。


```
[nuc]--1-->|<--3--[vps]----|<--2--[laptop]
```

このとき NUC から VPS には SSH できるが、逆は NUC に IP が無いためできない。

そこで、 NUC と VPS の SSH を張りっぱなしにしておき、 laptop からの SSH をそこを通して NUC に届けるのが Port Fowarding だ。

まず NUC から VPS に -R で SSH をつなぐ。


```sh
# nuc から vps
$ ssh user@vps -NR 22222:localhost:22
```

これを繋ぎっぱなしにする。

次に、外出した laptop から vps につなぐ、これは普通の SSH


```sh
# laptop から vps
$ ssh user@vps
```

最後に、入った VPS の上で、 localhost:22222 に対して SSH する


```sh
# vps に入ったあと vps から nuc
$ ssh user@localhost -p 22222
```

最初に VPS の 22222 ポートへの通信を、 NUC の 22 に転送するように SSH を貼っている。

NUC 上で sshd が動いていれば、 VPS 上で 22222 に対して SSH すると、 NUC に入れるという仕組みだ。

これを、いつでも接続できるようにしておく。


### ~/.ssh/config

まず、 SSH 接続を維持しやすい設定にするため、 config を以下のようにする。


```config
Host reverse-ssh
  HostName $vps
  User $user
  ServerAliveInterval 60
  ExitOnForwardFailure yes
  TCPKeepAlive no
```

Foward に失敗したり、応答が返らなければ落ちる。ただし TCP の接続が一時的に不安定になっても影響を受けないといった設定だ。

肝は、変な状態でとどまらず、おかしかったら落ちることだ。落ちれば、後述の方法で再接続できる。

これで最初のコマンドは以下のようになる。


```sh
# nuc から vps
$ ssh reverse-ssh -NR 22222:localhost:22
```


### autossh

まず NUC から VPS への reverse ssh は、常に貼っておかないと使いたいとき使えない。

もし接続が落ちても自動で再接続する必要がある。

これは autossh というツールを使うと、簡単にできるらしいので入れてみる。

autossh は ssh と同じコマンドで使うと、 ssh プロセスをフォークして監視し、 ssh が落ちたら再度フォークしてくれるツールだ。


```sh
$ autossh reverse-ssh -NR 22222:localhost:22
```

しかし autossh 自体が落ちてもだれも面倒を見てくれない。

また、 PC を再起動した場合は、自分で実行しないといけない。

そこで、これを systemd に登録する。


### systemd

systemd への登録はレベルによって場所が変わる。

今回のようなユーザ単位のサービスの場合は `~/.config/systemd/user/` に登録することになる。

しかし、ここはユーザがログインしたときに実行されるため、再起動してユーザがログインする前には実行されない。

そこで、起動時にユーザのサービスが起動されるように以下を実行する。


```sh
$ sudo loginctl enable-linger $USER
```

ところが、これが何故か動かない。


```sh
Could not enable linger: No such file or directory
```

探すと `/var/lib/systemd/linger/$USER` を touch するとか色々ワークアラウンドが出てくるが、実行しても有効化できなかった。

どうやら systemd のバグらしい。

仕方ないので、普通に system レベルで登録してしまうことにした。

ということで、以下を `/etc/systemd/system/autossh.service` として作成。


```systemd
[Unit]
Description=keep ssh tunnel
After=network-online.target ssh.service

[Service]
Type=simple
RestartSec=3
Restart=always
TimeoutStopSec=10

Environment="AUTOSSH_PORT=0"
Environment="AUTOSSH_GATETIME=0"
ExecStart=/usr/bin/autossh reverse-ssh -NTR 22222:localhost:22

[Install]
WantedBy=multi-user.target
```

(しかし、これなら autossh 無くても systemd で ssh を監視するだけで良かった気もする)

ところがこのままでは ssh が sudo で実行されるため、 `~/.ssh/config` は使われず reverse-ssh が解釈されない。

面倒なので `~/.ssh/config` に書いた内容を `/etc/ssh/ssh_config` に書いてしまうことにした。

これで一応 ssh 接続は維持できた。

若干の不安もあるので、制限を色々かけておく。


## known_hosts

known_hosts には接続相手の履歴が残っている。

初回はここにエントリを追加し、次からは既存のエントリが参照される。

サーバの IP などが変わったりすると、 DNS が書き換えられていると判定されエラーになることがある。

systemd で起動した autossh は `/root/.ssh/known_hosts` にエントリを追加するため、もしエラーになったら一旦ここをクリアする。

しかし、 systemd での起動ではエントリが足されないようなので、先に一旦手動で同等のコマンドを打っておくと良い。


```sh
# systemd に書いた ExecStart 相当
$ sudo /usr/bin/autossh reverse-ssh -NTR 22222:localhost:22
```


### sshd_config

NUC には、 VPS からの key を用いた ssh のみを許可したい。

まず `/etc/ssh/sshd_cinfig` でパスワードによる接続を無効にする。


```config
PasswordAuthentication no
```

これで鍵がなければ入れない。


### UFW

ufw を使って、 NUC の 22 へのアクセスを VPS の IP に限定する。

これにより、意図しないアクセスを防ぐことができる。

そうでなくても Ubuntu Desktop に sshd を入れた時点で、ほかも締め付けておきたい。

以下のようなスクリプトで行った。


```sh
ufw reset

ufw default deny incoming
ufw default allow outgoing

ufw allow from $(vsp_ip) to any port 22

ufw enable
ufw reload
ufw status numbered
```

変更があったら、このスクリプトを更新して叩き直せばリセットして再設定できる。

(デフォルトの UFW の設定を全部すっ飛ばしたが、デフォルトがなにやっているのかよくわからなかったので、困ったら自力で治す)


### authorized_keys

authorized_keys の最初には、 SSH で接続してくる IP の制限が指定できる。

今回は、 VPS からの forwarding しか受け付けない設定にしたい。

この場合、 NUC には localhost からアクセスしていることになるため、 NUC の `~/.ssh/authorized_keys` で、該当行の先頭に以下を追加する。


```
from="127.0.0.1" ssh-xxx xxxxxxxxxxxxxxxxx
```

これで、経路が VPS の Port Forwarding を用いた経路一択になったはずだ。


## Laptop の config

毎回 VPS に入ってから ssh しなおすのは面倒なので、以下のように ProxyCommand を設定する。


```config
Host nuc
  ProxyCommand ssh -W localhost:22222 vps
  ServerAliveInterval 60
```

すると laptop 上では以下のように叩けば、 VPS を経由して NUC に自動的に入れる。


```sh
$ ssh nuc
```


## まとめ

- 小さく静かで邪魔にならない開発環境を構築
- VPS を経由してのみ SSH Port Forwarding でログイン可能
- 外出先からも簡単に SSH できるようにした

これでだいぶ色々な開発が捗るようになった。
