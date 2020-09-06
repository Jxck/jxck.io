# [dns][domain] 予約済みドメイン (.example, .localhost, .test) について


## Intro

特別なドメインとして予約され、特定の用途で使用可能なドメインとして、 `.example` `.localhost` `.test` などがある。

`localhost` の Draft や、  gTLD である `.dev` が Chrome で Preload HSTS になったなどの動きを踏まえ、これらの意味や用途を解説する。


## ドメインを利用する上での注意

ドメインは、レジストラなどを通じて取得するため、インターネット上では好き勝手に取得することはできない。

しかし、自分で設定可能な DNS や hosts ファイルなどを使えば、任意のドメインを任意のアドレスに解決させることができる。

例えば、自分が適当にリクエストのテストを行うためのドメインを hosts ファイルに設定し、ループバックアドレスに解決して流していたとする。

このドメインがたまたま実在するものだった場合、そのテストを他のユーザが実行すれば、実際のドメインに対してパケットが飛んでしまう可能性がある。

同じように、例えば `nmap` コマンドを用いた port scan の方法をドキュメントにする際、もしそこに指定したホストが本当に存在したら、問題があるだろう。

ドキュメント通り実行されたコマンドから、大量の port scan を受けてしまうかもしれない。

ドキュメントやテストで、適当に思いついたドメイン名を用いるのは問題がある。


## 「今は」無いドメイン

もしローカルネットワークで使う用途で割り当てたドメインでも、外に出れば実際にそのドメインが取得されているかもしれない。

仮に今は取得されていなかったとしても、今後取得される可能性もある。

もっと言えば、 gTLD (global top level domain) ですら近年は色々と増えている。

例えば、社内のネットワークで当時存在しなかった `.dev` を、開発用ドメインとして割り当てられるような環境を作っていたとする。

現在、 `.dev` は正式に gTLD として認定され、 [Google](https://www.iana.org/domains/root/db/dev.html) がそれを管理している。

つまり、これまで社内のみと思われていた `.dev` のアドレスと、同じものが Google からリリースされる可能性もある。

合わせて、先日 Google は `.dev` 全体に対して Chrome に preload HSTS の設定をマージした。

[Preload HSTS for the .dev gTLD](https://chromium-review.googlesource.com/c/chromium/src/+/669923)

HTTPS が前提の昨今、こうして先手を打って HSTS を TLD 以下に強制するということだろう。

もしくは、 `.dev` を社内で勝手に運用している環境を認識して、そうした環境にあっても Google の正規サービスであることを明示する目的もあるかもしれない。

いずれにせよ、自前で `.dev` を運用しているユーザには影響があるだろう。

他にも gTLD はどんどん増えているので、 `.dev` 以外にも注意が必要だ。


## Reserved Top Level DNS Names

以上のことを踏まえれば、将来に渡って取得されないことが保証され、こうした用途に使えるメインがあるのが望ましい。

そこで RFC6761 (was RFC2606) には、 *予約済みドメイン* としていくつかのドメインとその用途が記されている。

- [RFC6761 Special-Use Domain Names](https://tools.ietf.org/html/rfc6761)
- [RFC2606 Reserved Top Level DNS Names](https://tools.ietf.org/html/rfc2606)

用途を守れば、そのドメインを所有していなくても、安心して使うことができるのだ。


## `.example`

主にドキュメントなどの例示に使われる。

TLD としての `*.example` 以外に、以下の 3 つの STD も予約されており、同様に使うことができる。

(本サイトでは、ブログの例示には主にこれを使っている)

- example.com
- example.net
- example.org

また、この 3 つは実際にインターネット上で HTTP をサーブしている。

- <http://example.com>
- <http://example.net>
- <http://example.org>

ちなみに、これらのアドレスは実は結構便利な作りをしている。

- 単純な HTML (サブリソースなし)
- HTTP (HSTS なし)
- HTTPS (HTTP2)
- 余計なヘッダなし
- コンテンツがほぼ更新されない

筆者は Wifi の認証など HTTP のアドレスが欲しい時や、余計な邪魔のないページで devtool をいじりたいとき、単なる疎通確認など色々な場面で使っている。

管理しているのが ICANN なので、個人が取得したドメインと違い *無くなっている可能性などを気にしないで良い* ため、覚えておくと地味に便利だったりする。


## `.localhost`

主に開発で自ホストに解決される用途で使われる。

実際には、 OS が名前解決に使う hosts ファイルなどで、 `localhost` がループバックアドレスに指定されている。


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

もしこの設定がなければ、他のアドレス同様 DNS に問い合わせを行い、もし DNS が別のアドレスを返せば `localhost` は "localhost" ではなくなってしまう。

しかし、最近では HTTPS 必須のブラウザ機能が、 localhost だけは特別扱いするなどといった挙動になっている。

そこで、 `localhost` がループバックアドレスであることを保証するべきというドラフトが上がっている。

[Let 'localhost' be localhost. draft-west-let-localhost-be-localhost-06](https://tools.ietf.org/html/draft-west-let-localhost-be-localhost-06)

これが RFC になれば、 `.localhost` は明確にループバックアドレスとして使われることになるだろう。

先ほどの `.dev` 同様に `.localhost` を別のアドレスで解決する環境を作っていたりする場合は、やはり問題が出るかもしれない。


## `.test`

主にテスト用途で使われる。

取得されないことと共に、他のネットワークでは別の名前に解決される可能性を前提とした上で、比較的自由に使える。

つまり前述のように、社内ネットワークのような環境で開発用ドメインを運用する際などに、利用できるだろう。


## `.invalid`

無効であることを明示する用途で使われる。

常に NXDOMAIN を返すと想定され、主に DNS の開発などに使うのだろうと思われる。


## その他テスト用ドメイン

RFC6761 の他にもこうした用途のドメインはいくつかある。

中でも `.テスト` や `ドメイン名例.jp` などは、 Ascii だけでなく日本語ドメイン(punycode)も検証対象としたい場合などに使えるだろう。

一度にたくさんのドメインが欲しい場合は、連番が使える以下が便利だ。

- example1.jp
- example2.jp
- example3.jp
- example4.jp
- example5.jp
- ...

詳細は下記参照

- <https://www.iana.org/domains/reserved>
- <https://jprs.jp/doc/rule/wideusejp-reserved.html>
- <https://jprs.jp/faq/use/>
