import {interval} from "./timer.mjs"

(async () => {
  const controller = new AbortController()
  const signal = controller.signal

  let $c = document.querySelector('#c')
  for await (const i of interval(700, signal)) {
    $c.textContent = i
    if (i >= 10) {
      controller.abort()
    }
  }
})()
