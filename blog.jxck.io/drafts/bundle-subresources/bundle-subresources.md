# [webbundle][webpackaging][performance] WebBundle によるサブリソース取得の最適化

## Intro

WebBundle を用いてサブリソースのみを Bundle する Subresource Bundle の策定と実装が進んでいる。

これを用いると、リソース取得に必要な RTT を減らし、単一のファイルで取得が可能になる。

仕様と実装を解説する。


## Subresource Bundling

WebBundle の初期の仕様は、 HTML を頂点としたページ全体をまとめる方向で始まった。

- [WebBundle によるコンテンツの結合と WebPackaging \| blog.jxck.io](https://blog.jxck.io/entries/2019-11-12/webbundle.html)




## gen-bundle

```sh
subresource/
  a.js
  b.js
  c.css
  d.png
```



```sh
$ gen-bundle \
    -version b1 \
    -baseURL    https://example.com/webpackaging/subresource-webbundle/ \
    -primaryURL https://example.com/webpackaging/subresource-webbundle/a.js \
    -dir subresource/ \
    -o bundle.wbn
```


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


![Bundle Subresource のデモを Chrome Devtools で表示](./bundle-subresources.png 'bundle-subresources demo')



## DEMO

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
