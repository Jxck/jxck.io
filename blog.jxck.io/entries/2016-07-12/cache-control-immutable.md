# [cache][http][performance] Cache-Control の Immutable 拡張によるリロード時のキャッシュ最適化

## Intro

ブラウザはリロード時に、 max-age に満たないキャッシュを持っていても Conditional GET によってキャッシュの Validate (有効性の問い合わせ)を行う。

Cache-Control Extension として提案されている Immutable 拡張は、キャッシュが max-age 内であればリロード時もキャッシュヒットさせる拡張である。

このヘッダの効果と、本サイトへの適用について記す。


## Cache-Control

Cache-Control に max-age を指定することで、ブラウザにリソースをキャッシュさせることができる。

このキャッシュは max-age の期間内は fresh とみなされ、 fresh であればサーバへの問い合わせなく再利用される。

サーバへの問い合わせ(RTT)が無いため、事実上最速のリソース取得となる。


## Reload

しかし、現在のブラウザでは fresh なキャッシュがそのままヒットするのは、ナビゲート(遷移)時のみである。

リロードやスーパーリロードの場合は、 max-age 内のキャッシュであっても、扱いが変わる。


- ナビゲート(link, redirect):  fresh なキャッシュはヒットする
- リロード(F5, cmd+r etc):  fresh であっても無視し、 Conditional GET を行う
- スーパーリロード(shift + reload etc):  fresh あっても無視し、 GET を行う。


## 不必要な Conditional GET

ブラウザの実装上の理由で不必要(とみなされやすい) Conditional GET が発生することもある。

特にブラウザ間の実装差異のため、 Chrome では他のブラウザよりも多くの Validation が行われ、多数の無駄な Conditional GET が発生していたことが Facebook により報告されていた。

- [Issue 505048 - chromium - Chrome makes more conditional re-validation requests than other browsers - Monorail](https://bugs.chromium.org/p/chromium/issues/detail?id=505048)


これは、リロードが発生するタイミングについて、仕様上曖昧な部分があったという理由も大きいようである。

そこで、ブラウザがリロードを行った場合に挙動について調査が行われ、結果が以下にまとまっている。

- [Reload, reloaded](https://docs.google.com/document/d/1vwx8WiUASKyC2I-j2smNhaJaQQhcWREh7PC3HiIAQCo/edit)


無駄な Conditional GET 、つまり不必要な Validation の発生は、 304 レスポンスを返すだけのものであり、無駄な RTT であると言える。

したがって、キャッシュの設計がきちんとなされている場合は、ブラウザの実装に依存せずにリロード時にも Cache HIT させたいという要望から提案されたのが、 Immutable Extension である。


## Immutable Extension

Cache-Control Immutable Extension は、 Cache-Control の拡張の一つである。

以下のように指定することで、キャッシュを Immutable と指定することができ、ブラウザはキャッシュが fresh であればリロード時でもヒットさせるようになる。


```sh
Cache-Control: max-age=10000, immutable
```

これによって、なんらかの原因でユーザがリロードを行う場面においても、無駄なリクエストを防ぐことができる。

特に、画像、動画、フォントといったサイズが大きくも表示において重要なリソースについては、キャッシュの再利用がサーバの負荷という面でも、 UX の面でも有利に働く。


執筆時点では、 Firefox Nightly(version 50.0a1) が https 通信限定で、この拡張をサポートしている。

- [1267474 - Cache-Control: immutable](https://bugzilla.mozilla.org/show_bug.cgi?id=1267474)
- [Bits Up!: Cache-Control: immutable](http://bitsup.blogspot.jp/2016/05/cache-control-immutable.html)


## DEMO

画像に対して `cache-control: immutable` を設定した画像と、していない画像を並べたデモページを以下に用意した。

一度読み込んでからリロードを行うことで、キャッシュのヒットが確認できるだろう。

執筆時点では Firefox Nightly(version 50.0a1) のみ、かつ https のみで実装されている。

- [Cache Control Immutable DEMO \| labs.jxck.io](https://labs.jxck.io/cache-control-immutable/)


![cache-control-immutable](cache-control-immutable.gif#759x555 'Firefox Nightly での Cache-Control Immutable のデモ')


## リロードというユーザ操作

リロードは必ずしもブラウザが勝手に発生するものだけではなく、ユーザが明示的に行う操作の場合もある。

では、そもそもユーザがリロードを行う場合とはどういう場合だろうか。

すぐ浮かぶだけでも以下のような場合があるだろう。

- リソースの更新をいち早く知りたい場合(F5 連打)
- バグによって画面の表示が崩れた場合
- ユーザの置かれているネットワークが不調で、コンテンツの取得が正しく完了しなかった場合
- なんらかの場面で、ページ側がユーザに「リロードしてください」と依頼する場合(希少)


更新通知は自動/半自動含め実装方法は増えているし、表示が崩れるのは明らかにバグである。ましてユーザにリロードを行わせる設計は間違っていると言える。

本来ユーザが明示的にリロードを発生させること自体が、サイトの作りとして問題をはらんでいる場合が多いと考えている。

それでもネットワークのプロキシやブラウザ拡張、その他のユーザサイドの問題で、ユーザがリロードを行う場合はあるだろう。 この場合ユーザがリロードを行うのは、リソースの状態をサーバに問い合わせて fresh に保ちたいという意図が考えられる。

もしリクエストが発生しないからと、無作為にリソースを Immutable に指定すると、ユーザが慣習によって期待していたリロードの挙動を著しく損ねる可能性もある。

したがって、例え max-age が付与できる設計であるとしても、 Immutable の指定には慎重であるべきと考える。


## 本サイトへの適用

本サイトでは、サイトへのアクセスログから 304 レスポンスの頻度が多いリソースを抽出し解析を試みた。

その結果が以下である。


```sh
$ cat access_log.* | grep 304 | cut -f7 | sort | uniq -c | sort -nr | head -n 30
43468 /feeds/atom.xml
31113 /
11341 /assets/js/ga.js
10831 /assets/img/jxck.svg
10432 /assets/css/footer.css
10404 /assets/css/main.css
10368 /assets/css/body.css
10367 /assets/css/header.css
 8880 /assets/img/rss.svg
 8485 /assets/img/blog.svg
 7898 /mozaic.png
 7778 /assets/css/article.css
 7760 /assets/js/main.js
 7433 /assets/css/info.css
 7063 /assets/js/highlight.min.js
 6283 /assets/img/up.svg
 5985 /assets/img/humans.svg
 5885 /assets/img/amp.svg
 5590 /assets/css/pre.css
 4612 /assets/img/jxck.png
 3582 /assets/css/markdown.css
 2656 /assets/js/stale-while-revalidate.js
 2303 /assets/js/master.js
 2198 /assets/js/sw.js
 2162 /assets/js/sw.js?ver=2
 1864 /assets/img/mozaic.svg
 1789 /manifest.json
 1481 /assets/img/podcast.svg
 1478 /entries/2016-06-09/passive-event-listeners.html
 1462 /assets/img/twitter.svg
```

RSS はブラウザのリロードとは関係がなく、また `/` (root)へのアクセスは更新頻度が高いため対象外とした。

以降はアセット系が続くが、 JS や CSS についてはまだ更新の可能性が高く、 SVG についても手書きのものが多数含まれるため、今後も最適化のための描き直しをする可能性がある。

したがって、最も変更の可能性が低い `/assets/img/jxck.png` のみ実験的に対応することとした。


## Web Font への効果

実は検証を開始する前に一番期待していたのは、 Web Font への効果であった。

本サイトは [自分でカスタマイズした Noto Sans CJK](https://blog.jxck.io/entries/2016-03-14/web-font-noto-sans.html) を配布しており、その内容は変更頻度が非常に低い。

また、表示時に Web Font の問い合わせが発生してしまうと、画面の表示が一瞬システムフォントになるか、フォントが表示されない状態に見える可能性がある。
302 が返ってくるとしても、 1RTT 発生してしまうことに変わりは無い。

したがって、リロード時だとしてもそのままローカルキャッシュがヒットし、表示に利用される方が望ましい。

そこで Web Font への適用が一番効果があるだろうと考えたのだが、現時点では Firefox はリロード時に Web Font を問い合わせない実装になっているようで、効果が確認できなかった。

これが Firefox だけの実装であるかは、他のブラウザが実装するまで確認ができない。

しかし Immutable はあくまで拡張であり、実装されていないブラウザでは無視されるだけなので、本サイトでは投機的に Web Font にもこの設定を適用することとした。

今後検証を重ねながら、より積極的な設定へと段階的に移行し、知見が溜まったら追記していく。
