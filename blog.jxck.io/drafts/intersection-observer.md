# Intersection Observer を用いた


これまでは `getBoundingClientRect()` を用いて取得していた。
しかし、 `getBoundingClientRect()` は、その要素を再レイアウト(re-layout)させるため、この処理がオーバーヘッドとなり、 Scroll Junk の原因となっていた。

