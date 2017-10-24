https://xhr.spec.whatwg.org/#interface-formdata
https://url.spec.whatwg.org/#interface-urlsearchparams
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

$('#send').onsubmit = (e) => {
  e.preventDefault()

  const input = Array.from(new FormData(e.target)).reduce((o, [k, v]) => { o[k] = v; return o }, {})

  console.log(new Map(new FormData(e.target)))

  console.log(new URLSearchParams(new FormData(e.target)).toString())



  const $li = document.createElement('li')
  $li.innerHTML = input.message // XSS
  $('#messages').appendChild($li)
}
