# Cache-Control: immutable によるリロード時のキャッシュ最適化

## Intro

ブラウザはリロード時に、 Conditional Get によってキャッシュの有効性を問い合わせる。

Cache-Control Extension として提案されている immutable オプションは、キャッシュが max-age 内であればリロード時もキャッシュヒットさせる拡張である。

このヘッダの効果と、本サイトへの適用について記す。


## Cache-Control

Cache-Control に max-age を指定することで、ブラウザにリソースをキャッシュさせることができる。

このキャッシュは max-age の期間内はフレッシュとみなされ、フレッシュであればサーバへの問い合わせなく再利用される。

サーバへの問い合わせが無いため、事実上最速のリソース取得となる。


## Reload

しかし、現在のブラウザではフレッシュなキャッシュがそのままヒットするのは、ナビゲート(遷移)時のみである。

もしユーザがリロードをした場合は、 max-age 内であってもサーバへの Conditional Get を行う。

スーパーリロードだった場合は、 max-age 内であってもキャッシュを捨てて Get を行う。

ブラウザがリロードを行った場合に挙動については、以下に詳細がまとまっている。

- https://docs.google.com/document/d/1vwx8WiUASKyC2I-j2smNhaJaQQhcWREh7PC3HiIAQCo/edit


## Immutable Extension

Cache-Control Immutable Extension は、 Cache-Control の拡張の一つである。

以下のように指定することで、キャッシュを immutable と指定することができ、ブラウザはキャッシュがフレッシュであればリロード時でもヒットさせるようになる。


```
Cache-Control: max-age=10000, immutable
```

これによって、
