import {interval} from "./timer.mjs"

(async () => {
  const controller = new AbortController()
  const signal = controller.signal

  let $d = document.querySelector('#d')
  for await (const i of interval(800, signal)) {
    $d.textContent = i
    if (i >= 10) {
      controller.abort()
    }
  }
})()
