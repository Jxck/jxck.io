# Highlight.js

GET from https://highlightjs.org/download/

```js
document.querySelectorAll("form input[type=checkbox]").forEach((e) => {
  const TARGET =
  ` bash
    css
    erlang
    html
    http
    javascript
    json
    ruby
    sh
    sql
    text
    xml
    yaml
    cpp
    go
  `.replace(/ /g, "").split("\n"); // (x)sdp, (x)svg, (x)url
  const langs = Array.from(new Set(TARGET)).map((e) => `${e}.js`);
  e.checked = !!langs.includes(e.name)
})
```

# Prism.js

https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+bash+c+cpp+erlang+go+http+hpkp+hsts+json+plsql+ruby+shell-session+sql+yaml
