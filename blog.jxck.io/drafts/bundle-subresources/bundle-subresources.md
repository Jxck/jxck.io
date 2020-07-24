# [webbundle][webpackaging][performance] WebBundle によるサブリソース取得の最適化

## Intro

WebBundle を用いてサブリソースのみを Bundle する Subresource Bundle の策定と実装が進んでいる。

これを用いると、リソース取得に必要な RTT を減らし、単一のファイルで取得が可能になる。

仕様と実装を解説する。


## Subresource Bundling

WebBundle の初期の仕様は、 HTML を頂点としたページ全体をまとめる方向で始まった。

- [WebBundle によるコンテンツの結合と WebPackaging \| blog.jxck.io](https://blog.jxck.io/entries/2019-11-12/webbundle.html)

これをサブリソース(JS, CSS, Img etc)に対して利用できるようにする仕様だ。

HTML 自体は普通に配信し、複数サブリソースの取得を 1 fetch にまとめることができる。


## gen-bundle

実際に gen-bundle を用いてサブリソースのみを Bundle する。

サブリソースを以下のように subresource ディレクトリにまとめたとする。

```sh
subresource/
  a.js
  b.js
  c.css
  d.png
  favicon.ico
```

なお、 `a.js` は `b.js` を import している。

生成は以下のようになる。

CLI の仕様上 `-primaryURL` が必須となる。

Primary URL は HTML を頂点とする Bundle で HTML の URL を指定するが、 Subresouce の場合は特定の Primary が存在しない。

Chorme の実装もこれを無視しているようなので、適当に指定している。

```sh
$ gen-bundle \
    -version b1 \
    -baseURL    https://example.com/webpackaging/subresource-webbundle/ \
    -primaryURL https://example.com/webpackaging/subresource-webbundle/a.js \
    -dir subresource/ \
    -o bundle.wbn
```

dump-bundle すると以下のようになる。

```sh
$ dump-bundle -i bundle.wbn
Version: b1
Primary URL: https://example.com/webpackaging/subresource-webbundle/a.js

> :url: https://example.com/webpackaging/subresource-webbundle/a.js
< :status: 200
< Content-Length: [54]
< Content-Type: [application/javascript]
< Accept-Ranges: [bytes]
< Last-Modified: [Sat, 13 Jun 2020 10:56:18 GMT]
< [len(Body)]: 54
import {data} from './b.js'
console.log('a.js', data)


> :url: https://example.com/webpackaging/subresource-webbundle/b.js
< :status: 200
< Content-Type: [application/javascript]
< Accept-Ranges: [bytes]
< Last-Modified: [Sat, 13 Jun 2020 10:56:18 GMT]
< Content-Length: [43]
< [len(Body)]: 43
export const data = 10
console.log('b.js')


> :url: https://example.com/webpackaging/subresource-webbundle/c.css
< :status: 200
< Content-Type: [text/css; charset=utf-8]
< Accept-Ranges: [bytes]
< Last-Modified: [Tue, 21 Jul 2020 10:45:17 GMT]
< Content-Length: [57]
< [len(Body)]: 57
h1 {
  color: red;
}

img {
  border: solid 1px black;
}


> :url: https://example.com/webpackaging/subresource-webbundle/d.png
< :status: 200
< Last-Modified: [Sat, 13 Jun 2020 10:56:18 GMT]
< Content-Length: [95]
< Content-Type: [image/png]
< Accept-Ranges: [bytes]
< [len(Body)]: 95
[non-text body]
```


## link rel bundle

この Bundle を読み込む HTML は以下のようになる。

普通にサブリソースを読む HTML に加え、 `<link>` で web bundle の読み込みを指定する。

resouces 属性に bundle 側で解決する URL を許可リストで明示する必要がある。

```html
<!DOCTYPE html>
<meta charset=utf-8>
<meta name=viewport content="width=device-width,initial-scale=1">
<title>Subresource Web Bundle DEMO</title>

<link rel=webbundle
      href=bundle.wbn
      resources="
                 https://example.com/webpackaging/subresource-webbundle/a.js
                 https://example.com/webpackaging/subresource-webbundle/b.js
                 https://example.com/webpackaging/subresource-webbundle/c.css
                 https://example.com/webpackaging/subresource-webbundle/d.png
                 "/>

<h1>Subresource Web Bundle DEMO</h1>

<script type=module src=https://example.com/webpackaging/subresource-webbundle/a.js></script>

<link rel=stylesheet href=https://example.com/webpackaging/subresource-webbundle/c.css>

<img width=100 src=https://example.com/webpackaging/subresource-webbundle/d.png>
```

## 挙動

Chrome Canary を flag 付きで起動する。

```
$ open -a /Applications/Google\ Chrome\ Canary.app --args --enable-features=SubresourceWebBundles
```
HTML にアクセスすると、以下の様にサブリソースが bundle から解決されていることがわかる。

![Bundle Subresource のデモを Chrome Devtools で表示](./subresource-bundling.png 'bundle-subresources demo')

実際に実行されている fetch が HTML, Bundle, favicon の 3 つだけになっていることから、



## DEMO

動作する DEMO を以下に用意した

- <https://labs.jxck.io/webpackaging/subresource-webbundle/basic.html>


## Outro



## Resources

- Spec
- Explainer
  - <https://github.com/WICG/webpackage/blob/master/explainers/subresource-loading.md>
  - <https://docs.google.com/document/d/11t4Ix2bvF1_ZCV9HKfafGfWu82zbOD7aUhZ_FyDAgmA/edit#>
- Requirements Doc
  - <https://docs.google.com/document/d/1imEt4TZkuzRVidmkaOaTym9JzPRMK8KSXiPp83797cw/edit#>
- Mozilla Standard Position
- Webkit Position
- TAG Design Review
- Intents
  - Intent to Prototype: Subresource loading with Web Bundles
    - <https://groups.google.com/a/chromium.org/g/blink-dev/c/wYn13HabRN0/m/L4y4iY1-AgAJ>
- Chrome Platform Status
  - <https://www.chromestatus.com/feature/5710618575241216>
- DEMO
  - <https://docs.google.com/document/d/18fFrURT6xD1GnqJwCx2K3Z81Te9Iv-r2ZsCkOvDH_04/>
- Blog
- Presentation
- Issues
- Other
