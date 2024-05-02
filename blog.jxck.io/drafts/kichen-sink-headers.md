# [security][http] Kichen Sink Heaers の弊害と Web プラットフォームにおける「デフォルト」の安全性

## Intro

例えば以下のようなヘッダを見ることがある。

```http
Cache-Control: no-store, no-cache, max-age=0, must-revalidate, proxy-revalidate
```

このような、様々なディレクティブをひたすら詰め込んでおくスタイルは、 Kichen Sink Headers と呼ばれる。

Kichen Sink は、 Cache-Control に限らず様々な場面で行われている。

なぜ、台所には無作為に皿が積み上げられてしまうのだろうか?

## Kichen Sink

前述の Cache-Control の例は、仕様上最も制限の強いディレクティブが採用され、それ以外は無視されることになる。

つまり、以下と同等の効果しかない。

```http
Cache-Control: no-store
```

それ以外のディレクティブは全て無駄だ。つまり 56 byte のバラストを送っていることになる。

