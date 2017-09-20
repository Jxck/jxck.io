# [localhost][DNS][IETF] Let 'localhost' be localhost ドラフトについて

## Intro

題名の通りのドラフトが出ており、ポジティブに議論が進んでいる。

当たり前のようだが、ある種のミッシングピースだったこのドラフトについて簡単に解説する。


## localhost とは

開発の場面で、固定 IP やドメインを振っていないサーバでは、 localhost というホスト名がよく使われるだろう。

```
http://localhost:3000
```

このアドレスは、ループバックアドレスに解決され、自ホストを指する前提で使われている。


```
http://127.0.0.1:3000
http://[::1]:3000
```

しかし、これは慣習的に /etc/hosts ファイルなどで localhost の解決先が指定されているからである。

```
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1 localhost
::1             localhost
```

仮にこの設定を消した状態では、 OS は localhost の解決先を DNS に問い合わせる。

つまり、 DNS が別のアドレスを解決先として返した場合は、 `localhost` は "localhost" ではなくなる。

これに気づかなければ、例えば開発中に自分の PC だと思っているアクセス先が、実は別のホストであるといったことがありえる。

近年 HTTPS 化にともない HTTP では使えなくなった機能も、開発用に localhost だけは許されるような実装も多い。

localhost がループバックを返すことが保証されていたほうがメリットがある。


## localhost be localhost


[draft-west-let-localhost-be-localhost](https://tools.ietf.org/html/draft-west-let-localhost-be-localhost) (執筆時は -06)

ドラフトの内容は非常に単純で、 `localhost` や `*.localhost` はルーップバックアドレスを返すことを仕様として明示するというものだ。

DNS や順ずる API は、 `localhost` を特別なものとして扱い、ループバックアドレスを必ず返し、権威 DNS やキャッシュ DNS は NXDOMAIN を返す。

加えて、もし DHCP のドメイン検索が `example.com` に設定されていても、 locahost は `localhost.example.com` にはならない。

そして、レジストラは `localhost` の登録依頼を一切受け付けない。


これらが守られる限り、 `locahost` は開発者が想定する localhost であることが保証できる。


## イントラの開発用ドメインなど


