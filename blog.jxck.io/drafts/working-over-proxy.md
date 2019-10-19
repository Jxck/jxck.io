# [proxy] 社内 Proxy の超えスクリプト(Linux, Mac)

## Intro

イケてる Web 開発会社にいる人には伝わらないかもしれないが、比較的大きい企業には社内 Proxy がある環境も多い。

開発者から見るとこれは本当に厄介で、日々消耗している人も少なくないだろう。

かく言う筆者もまさしくその一人だったが、最近は状況が改善し Proxy を超える場面も減った。

今回大掃除を兼ね、昔から使っていた Proxy 超えの設定スクリプトなどをここで供養し、 dotfiles から削除しようと思う。


## 社内 Proxy

社内 Proxy とは、社内ネットワークから出る際に必ず通る Proxy であり、大きめの組織のネットワークに大抵存在する。

本来的には、余計な情報が外部に出ることを防ぐ、業務に関係ない(気に食わない) URL へのアクセスを遮断する、といった目的で存在する。

大抵は認証があり、社員番号とパスワードといった、社内認証基盤と連携したものが多いだろう。

そして、このパスワードは未だに定期変更する運用も多く、その場合 Proxy の設定も更新することになる。


## Linux の Proxy 設定

Windows は GUI で統一指定すると反映される場合が多いが、特に Linux 系を使っていると思うように行かない場合が多い。

Ubuntu の GUI では一応あるが、 GUI Less な環境もあるため、そちらに揃える方が取り回しが効く。

基本は `$HTTP_PROXY` 的な環境変数に入れれば見てくれるものが多い。

しかし、環境変数はファイルでないため、 Linux の伝統的な権限制御と違うため、パスワード等のクレデンシャルを入れるには不適切とする場合がある。

したがって、環境変数を見ずに、独自に設定ファイル内への記述を求めるツールが有るのがやっかいだ。

特にパスワードの定期変更を求められるような場合は、その設定も自動化したい。

そうした環境と戦いながら作られた秘伝のタレ的なスクリプトを、多くの人が dotfiles に忍ばせていたりするだろう。

以下が筆者のもので、現在の環境で動くか、妥当かなどは細かく検証していない。

ちなみに使っていたころは、 Mac でも動いていた。



## 環境変数

まず基本の環境変数設定から始まる。

テンプレートは以下のようになり、 .zshrc より .zprofile 的な方に書く。

```sh
export http_proxy="http://{{user}}:{{pass}}@{{host}}:{{port}}"
export https_proxy="http://{{user}}:{{pass}}@{{host}}:{{port}}"
export HTTP_PROXY=$http_proxy
export HTTPS_PROXY=$https_proxy
export all_proxy=$http_proxy
export ALL_PROXY=$http_proxy
export no_proxy="localhost,127.0.0.1,/var/run/docker.sock"
export NO_PROXY=$no_proxy

export SOCKS5_USER="{{user}}"
export SOCKS5_PASSWD="{{pass}}"
```


## APT

Linux で必須になるのが apt への設定だ。


`/etc/apt/apt.conf` に書くことになる。

```conf
Acquire::http::proxy "http://{{user}}:{{pass}}@{{host}}:{{port}}";
Acquire::https::proxy "https://{{user}}:{{pass}}@{{host}}:{{port}}";
Acquire::ftp::proxy "ftp://{{user}}:{{pass}}@{{host}}:{{port}}";
Acquire::socks::proxy "socks://{{user}}:{{pass}}@{{host}}:{{port}}";
```


## その他コマンド

独自の設定を求めるコマンドがいくつかある。


`.curlrc`

```conf
proxy-user = "{{user}}:{{pass}}"
proxy = "{{host}}:{{port}}"
```

`.npmrc`

```
proxy=${HTTP_PROXY}
https-proxy=${HTTPS_PROXY}
```

これはもう自分の使っているツールのドキュメントから同じようにテンプレートを作るしか無い。


## 自動化

筆者はこの設定を自動化していた。

設定のテンプレートを dotfiles に保存し、そこに情報を埋め込んで各設定ファイルにアペンドする。

ID/Pass といった情報は dotfiles にうっかりでも入らないよう、 gitignore で省くなどもしない。

代わりに、パスワードが変わった場合、以下ような proxy.sh を叩いて入力する。

```zsh
#!/bin/bash

read -p  "user: " user
read -sp "pass: " pass
echo
read -p  "host: " host
read -p  "port: " port

echo "http://$user:*****@$host:$port"
confpath="$HOME/dotfiles/conf"

for f in `\ls -A $confpath`
do
cat $confpath/$f |
sed -e "s/{{user}}/$user/g" |
sed -e "s/{{pass}}/$pass/g" |
sed -e "s/{{host}}/$host/g" |
sed -e "s/{{port}}/$port/g" > ~/$f
done

if [ `uname` = "Darwin" ]; then
rm ~/apt.conf
elif [ `uname` = "Linux" ]; then
sudo mv ~/apt.conf /etc/apt/apt.conf
fi
```

入力を変数に受け取り、 $HOME/dotfiles/conf 以下に入れておいた、前述のようなテンプレートに埋め込み、とりあえず $HOME に置く。

その後、必要に応じて適切な場所に移動したり、ものによって既存のファイルに追記する。

ログインしなおせば設定が行き渡り、パスワードが変わったらまた proxy.sh を叩けば良い。

新しいコマンドも、テンプレートと配置先さえわかれば、そこに追加してく。


## Proxy の功罪

HTTPS 化の進む現在、本当に Proxy によって何かが守れているのかは個人的には疑わしいが、立てて置いたほうが良いという理由で立てられている環境は想像以上に多い。

特に OSS 系は、 Proxy なんか無い場所で開発されていると思われ、認証付き Proxy の存在など前提にしてないものが多い。

Proxy を立てる側は、実装に対して Proxy を意識して開発するべきといい、実装者は Proxy なんて知ったことかとなる。

割を食うのは、 Proxy 環境下でそうしたツールをなんとか動かすために苦心する開発者だ。

依存モジュールの深層にある一個だけ Proxy を意識しないためにデバッグで消耗し、フォークしてなんとかするという話も多い。

新人が書籍や Web のチュートリアルの 1 ページ目で、どこにも解説されてないエラーに悩まされて止まる場面も何度も見てきた。

クラウドを使って Proxy の外に開発環境が作れでもすれば、 SSH さえ通れば解決するが、そうも行かない人はまだ沢山いるだろう。

全ての社内 Proxy が無くなるか、全ての実装が Proxy を意識して実装するまで、こうしたしわ寄せをなんとかしながら進むしか無い。

筆者個人でいえば、個々最近徐々に周囲の環境が改善し、生産性は余裕で倍は出ていると思う。

このエントリを書きながら、その頃が少しフラッシュバックした。またあの環境に戻ったらと思うと、げんなりする。
