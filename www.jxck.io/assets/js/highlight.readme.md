GET from https://highlightjs.org/download/

```js
document.querySelectorAll("form input[type=checkbox]").forEach((e) => {
  const TARGET = "bash, css, erlang, html, http, javascript, json, ruby, sh, sql, text, xml, yaml, cpp, go".split(", ").map((e) => `${e}.js`) // (x)sdp, (x)svg, (x)url
  e.checked = !!TARGET.includes(e.name)
})
```
