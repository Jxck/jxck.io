# Form で Submit されたデータを SubmitEvent から取る

## Intro

`<form>` の onsubmit をフックして、入力された値を `<input>` から集めて送るといった処理はよくある。

このとき、 submit されたデータは、 `<input>` ではなく、 SubmitEvent から取得することができる。

イベントが発生した時、そのイベントに付随する情報は、イベントオブジェクトに内包されていることを意識したコーディングについて解説する。

(なお、サンプルコードは最低限のコードで解説するため `<label>` などは省略している)


## Form Submit

例えばこういうコードがよく見られる。


```html:form.html
```



##

- https://labs.jxck.io/form/form-data/

```javascript
$('#send').onsubmit = (e) => {
  e.preventDefault()
  const input = Array.from(new FormData(e.target)).reduce((o, [k, v]) => { o[k] = v; return o }, {})
  console.log(new Map(new FormData(e.target)))
  console.log(new URLSearchParams(new FormData(e.target)).toString())
}
```

## Links

- https://xhr.spec.whatwg.org/#interface-formdata
- https://url.spec.whatwg.org/#interface-urlsearchparams
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
