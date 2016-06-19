# Intersection Observer を用いた要素出現検出の最適化

## Intro

スクロール時における DOM 要素の出現を効率よく検知するため、新しく Intersection Observer という API が追加された。

この API の使い方と、本サイトへの適用について記す。


## 要素出現の検出

ページをスクロールしていく過程で、特定の DOM が画面に出現したことをフックするケースがある。

代表例は **画像の遅延読み込み** であり、特に画像の多いページでは、初期ロードでは画像のフェッチを行わず、スクロールしていく過程で順次取得することは、初期表示の高速化に大きく寄与する。

しかし、これを実行するためには、画面全体の scroll event を監視し、その中で画面のサイズと DOM 要素のサイズを計算し、交差判定を行う必要があった。

この実装にはいくつかの問題がある。

1. 全 scroll event で実施しては回数が多いので、自分で throttling (まびき)を行う必要がある
2. scroll event のハンドラが Scroll Junk を引き起こす可能性がある
3. サイズや位置を取得する API は Forced Synchronous Layout を発生させる

1 については、 undersocre.js の [throttle()](http://underscorejs.org/#throttle) 相当のものや、 Reactive Extension 系のライブラリを使うことで実現できる。

2 については、先日解説した [Passive Event Listener](https://blog.jxck.io/entries/2016-06-09/passive-event-listeners.html) を用いると解決が可能だ。

今回は、現時点で一番大きな問題である 3 について解説する。


### Forced Synchronous Layout

DOM の位置や大きさは、全体の


### 画面への出現判定

ある要素が画面に出現したかを検出する従来の方法は、ある時点での要素の位置が画面の表示範囲内に入っていることを、定期的(スクロールするたびなど)に調べることで実現できる。

要素の位置の調べ方は基本的には以下のようになる。

- scroolTop




これまでは `getBoundingClientRect()` を用いて取得していた。
しかし、 `getBoundingClientRect()` は、その要素を再レイアウト(re-layout)させるため、この処理がオーバーヘッドとなり、 Scroll Junk の原因となっていた。

