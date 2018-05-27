# [tag] 社内 Proxy の超えスクリプト

## Intro

イケてる Web 開発会社にいる人には伝わらないかもしれないが、比較的大きい企業には社内 Proxy がある環境も多い。

開発者から見るとこれは本当に厄介で、日々消耗している人も少なくないだろう。

かく言う筆者もまさしくその一人だったが、最近は状況が改善し Proxy を超える場面も減った。

そこで、昔から使っていた Proxy 超えの設定スクリプトなどを供養も兼ねて共有しようと思う。


## 社内 Proxy

社内 Proxy とは、社内ネットワークから出る際に必ず通る Proxy であり、企業の場合は大抵認証が必須である。

UserName は社員番号などであり、 Password は社内認証パスワードなどが多いだろう。

そして、この Password は定期変更で運用されていることが多いので、 Proxy の設定も合わせて更新することになる。




以下の設定は何年か色々加えていった結果の、いわゆる秘伝のタレなので、現在の環境で本当にそれが必要なのかなどは細かく検証していない。

だいたい動くと思われる。



## 環境変数


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

```conf
// /etc/apt/apt.conf
Acquire::http::proxy "http://{{user}}:{{pass}}@{{host}}:{{port}}";
Acquire::https::proxy "https://{{user}}:{{pass}}@{{host}}:{{port}}";
Acquire::ftp::proxy "ftp://{{user}}:{{pass}}@{{host}}:{{port}}";
Acquire::socks::proxy "socks://{{user}}:{{pass}}@{{host}}:{{port}}";
```


