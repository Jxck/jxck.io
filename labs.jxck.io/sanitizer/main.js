'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

document.on('DOMContentLoaded', async (e) => {
  console.log(e)
  $('form').on('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const raw  = formData.get('rawtext')
    const mode = formData.get('mode')

    console.log(mode)

    const option = ((mode) => {
      switch (mode) {
        case 'default':
          return {}
        case 'no-attr':
          return {allowAttributes: []}
        case 'no-elem':
          return {allowElements: []}
      }
    })(mode)

    console.log(raw)
    const sanitizer = new Sanitizer(option)

    const sanitized = sanitizer.sanitizeToString(raw)
    console.log(sanitized)
    $('#sanitized').value = sanitized

    const result = new Sanitizer().sanitize(raw);
    console.log(result)

    $('#render').innerHTML = ''
    $('#render').appendChild(result)
  })

  const elements =  Object.getOwnPropertyNames(window).reduce((acc, curr) => {
    const matched = curr.match(/^HTML(.*)Element$/)
    if (matched) {
      acc.push(matched[1].toLowerCase())
    }
    return acc
  }, [])
  console.log(elements.sort())


  $('#copy').on('click', async () => {
    const code = $('#code pre code').textContent
    await navigator.clipboard.writeText(code);
  })
})
