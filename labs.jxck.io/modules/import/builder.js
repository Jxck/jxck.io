export default (title, message) => html`
<template>
<section>
  <h2>${title}</h2>
  <div>${message}</div>
</section>
</template>
`

function html(template, ...args) {
  const escaped = args.map(hsc)

  return template.reduce((pre, curr, i) => {
    pre.push(curr)
    pre.push(escaped[i])
    return pre
  }, []).join('')
}

function hsc(str) {
  return str.replace(/&/g, '&amp;') // first!
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#96;');
}
