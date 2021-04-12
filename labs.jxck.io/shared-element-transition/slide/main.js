'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

async function render(href, transition) {
  await document.documentTransition?.prepare(transition)

  const res = await fetch(href)
  const html = await res.text()
  const parser = new DOMParser()
  const dom = parser.parseFromString(html, 'text/html')

  const title = dom.querySelector('title').textContent
  const $main = dom.querySelector('main')

  $('title').textContent = title
  document.body.replaceChild($main, $('main'))

  const sharedElements = []
  if (transition.sharedElements.length > 0) {
    sharedElements.push($main.querySelector('article'))
  }
  console.log(sharedElements)

  await document.documentTransition?.start({sharedElements})

  init()
}


function handleTransition() {
  document.documentTransition.prepare({
    rootTransition: "reveal-left",
    duration: 300,
    sharedElements: [e1, e2, e3]
  }).then(() => {
    changeBodyBackground();
    document.documentTransition.start([newE1, newE2, newE3]).then(
      () => console.log("transition finished"));
  });
}

async function init() {
  $$('a').forEach(($a) => {
    console.log($a)
    $a.on('click', async (e) => {
      e.preventDefault()
      const href = e.target.href
      const duration = 1000
      const rootTransition = Array.from(e.target.classList).join("-")
      const sharedElements = []
      if (rootTransition === 'explode') {
        sharedElements.push(e.target)
      }
      const transition = {rootTransition, duration, sharedElements}
      console.log(transition)
      await render(href, transition)

      history.pushState({}, '', href)
    })
  })
}

document.on('DOMContentLoaded', async (e) => {
  console.log(e)
  init()

  const $footer = document.createElement('footer')
  const detection = document.documentTransition ? 'enabled' : 'disabled'
  $footer.textContent = `document transition is ${detection} on your browser`
  $('body').appendChild($footer)
})

window.addEventListener('popstate', (e) => {
  const href = document.location
  render(href)
})
