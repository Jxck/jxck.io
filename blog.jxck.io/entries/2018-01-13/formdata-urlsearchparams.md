# [urlsearchparams][formdata][form] Form で submit されたデータの収集と FormData & URLSearchParams

## Intro

`<form>` の onsubmit をフックして、入力された値を `<input>` から集めて送るといった処理はよくある。

このとき、 submit されたデータの収拾方法はいくつかある。

submit に限らず、そのイベントに付随する情報は、基本的にイベントオブジェクトに内包されている。

Form を例に、イベントオブジェクトを意識したコーディングについて解説する。


## Form Submit

Form が Submit されたことをフックして、処理を挟む場面はよくある。

HTML がこうであった場合。


```html
<form id=login action=/login method=post>
  <fieldset form=login>
    <legend>Login</legend>
    <label for=username>Username</label>
    <input type=text name=username id=username value=jxck>
    <label for=password>Password</label>
    <input type=password name=password id=password value=thisismypassword>
    <button type=submit>login</button>
  </fieldset>
</form>
```

JS は以下のように書かれる場合がある。


```js
document.querySelector('#login').onsubmit = (e) => {
  e.preventDefault()
  const username = document.querySelector('#username')
  const password = document.querySelector('#password')
  process_input({username, password})
}
```

ここでは、取得するデータは 2 つしかないが、大きなフォームでは多数の `<input>` を探索する必要がある。

この例を改善しつつ解説していく。


## e.target

最も簡単な改善は、 document からのクエリをやめることだ。

`e.target` には、対象の DOM、ここでは `<form>` が入っている。

`<input>` はその子要素なので、わざわざ `document` を起点にする必要はない。


```js
document.querySelector('#login').onsubmit = (e) => {
  e.preventDefault()
  const username = e.target.querySelector('#username')
  const password = e.target.querySelector('#password')
  process_input({username, password})
}
```


## FormData

Form で Submit されたデータは、 FormData を経由して取得することができる。

つまり、 FormData に変換しさえすれば、 submit 対象のデータは全て手に入っている。

<https://xhr.spec.whatwg.org/#formdata>

このオブジェクトは、 `get()`、 `set()` など Map のようなインタフェースを持つ。

(なお `new Map(form_data)` すれば、実際の Map にもなる)

また、そのまま XHR や fetch を使ってそのまま POST することができる。


```js
document.querySelector('#login').onsubmit = (e) => {
  e.preventDefault()
  const form_data = new FormData(e.target)
  validate_username(form_data.get('username'))
  validate_password(form_data.get('password'))
  fetch('/login', {
    method: 'POST',
    body: form_data
  })
}
```

ただし、注意点としてこのとき POST される Content-Type は `multipart/form-data` になる。

つまり Body は以下のようなフォーマットだ。


```http
// content-type:multipart/form-data; boundary=----WebKitFormBoundaryPfqUKvtarA1EFkbV


------WebKitFormBoundaryPfqUKvtarA1EFkbV
Content-Disposition: form-data; name="username"

jxck
------WebKitFormBoundaryPfqUKvtarA1EFkbV
Content-Disposition: form-data; name="password"

examplepassword
------WebKitFormBoundaryPfqUKvtarA1EFkbV--
```

大抵のサーバは、これでも問題なく処理できるだろう。

しかし、 File でもない限り HTML Form からは `application/form-url-encoded` で送られてくるという前提で実装されたものもあるだろう。


## URLSearchParams

URLSearchParams は、 URL の標準化の際に QueryString 部分をサポートするために導入された。

しかし、これは FormData を引数にインスタンスを生成することができる。

また、そのまま POST の Body にすれば、 `application/form-url-encoded` として送ることができる。


```js
document.querySelector('#login').onsubmit = (e) => {
  e.preventDefault()
  const form_data = new FormData(e.target)
  const url_search_params = new URLSearchParams(form_data)
  fetch('/login', {
    method: 'POST',
    body: url_search_params
  })
}
```

つまり Body は以下のようなフォーマットだ。


```http
// content-type:application/x-www-form-urlencoded;charset=UTF-8

username=jxck&password=thisismypassword
```


## JSON

API バックエンドなどに対して JSON で送りたい場合もあるだろう。

せっかく FormData までは取得できているので、これを Object に変換してからシリアライズすれば良い。

ここでは FormData が iterable であるこを利用してオブジェクトを組み立ててみる。


```js
document.querySelector('#login').onsubmit = (e) => {
  e.preventDefault()
  const form_data = new FormData(e.target)
  const object = Array.from(form_data).reduce((o, [k, v]) => { o[k] = v; return o }, {})
  const json = JSON.stringify(object)
  fetch('/login', {
    method: 'POST',
    body: json
  })
}
```

(ただし Form に `<select>` などが入る場合は修正が必要 <https://labs.jxck.io/form/input-type/>)


## beforeSubmitCallback

submit に callback を仕込む仕様の提案がかなり前に出ている。

[Need callback for form submit data](https://github.com/w3c/webcomponents/issues/187)


```js
document.registerElement('input', {
  prototype: {
    proto: HTMLElement.prototype,
      beforeSubmitCallback: function() {
        switch (this.type) {
        case 'checkbox':
          if (this.checked) {
            return this.value;
          }
          return undefined;
        }
      }
  }
});
```

進捗は微妙だが、もし実装されると、 JSON で Post したい場合に、 Fetch を使わずにフォーマットの変換だけでよくなるのかもしれない。


## DEMO

DEMO: <https://labs.jxck.io/form/form-data/>


## Links

- <https://xhr.spec.whatwg.org/#interface-formdata>
- <https://url.spec.whatwg.org/#interface-urlsearchparams>
