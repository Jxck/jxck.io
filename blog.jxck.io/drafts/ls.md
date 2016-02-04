# ls が気に食わないから自分で書いた

## Intro

`ls` の並び順が微妙にしっくりきてなかった


## 理想

理想としては github のように、以下の順で並んで欲しい。

1. .dir
2. dir
3. .file
4. file

そして、個人的には symlink や executable は、色が別なだけでなく、種類ごとにまとまってて欲しい。
もちろん同種の中では、名前順にソートして欲しい。

`ls` はオプションが多いが、色々見てもなかなか思うような感じにならない。
また Mac では coreutils で入れないと Linux とオプションも違ってまた面倒。

ということで書いてしまうことにした。


## 実装

自分はオリジナルコマンドは全部 dotfiles 以下に PATH を通した置き場を作って置いている。
ビルドしないで済むように、 ruby か shell か node で書くようにしている。今回は ruby で書いた。

オプションは stats を合わせて表示するものだけつけている。オリジナルでは `ls -l` にあたるもの。

自分は *名前だけ* か *stats 付き* しか基本使わないので、`ls` と `ll` でエイリアスを貼っている。

この stats も、自分にとって必要の無いものは省いた。


### before

いらないものが多い
Linux では日付に時差がついたりするけどそれも消した

```shell
total 16                                           # いらない
drwxr-xr-x  10 jxck  staff  340 Feb  5 02:02 .     # いらない
drwxr-xr-x@  6 jxck  staff  204 Feb  5 02:00 ..    # いらない
drwxr-xr-x   2 jxck  staff   68 Feb  5 02:01 .dir  # 並びが気に食わない
-rwxr-xr-x   1 jxck  staff    0 Feb  5 02:02 .exec
-rw-r--r--   1 jxck  staff    0 Feb  5 02:01 .file
lrwxr-xr-x   1 jxck  staff    5 Feb  5 02:02 .sym -> .file
drwxr-xr-x   2 jxck  staff   68 Feb  5 02:00 dir
-rwxr-xr-x   1 jxck  staff    0 Feb  5 02:01 exec
-rw-r--r--   1 jxck  staff    0 Feb  5 02:01 file
lrwxr-xr-x   1 jxck  staff    4 Feb  5 02:01 sym -> file
^いらない    ^いらない
```


### after

```shell
rwxr-xr-x jxck staff    68B 2016-02-05 02:01 .dir
rwxr-xr-x jxck staff    68B 2016-02-05 02:00 dir
rwxr-xr-x jxck staff     5B 2016-02-05 02:02 .sym -> .file
rwxr-xr-x jxck staff     4B 2016-02-05 02:01 sym -> file
rwxr-xr-x jxck staff     0B 2016-02-05 02:02 .exec
rwxr-xr-x jxck staff     0B 2016-02-05 02:01 exec
rw-r--r-- jxck staff     0B 2016-02-05 02:01 .file
rw-r--r-- jxck staff     0B 2016-02-05 02:01 file
```

あとは、同じ並びでファイル名だけの表示ができる。


## Outro

全く問題なく速度が出てるし、特に困ったところは今のところ無い。
shell script 内で ls が出てると困るところがあるかもしれないけど、自分で書く場合は `\ls` で書けば良い。


とにかく、非常に使用頻度が高く、ビジュアル要素が重要なコマンドなので、変えたことによる満足度はかなり高い。もっと早く作れば良かった。

