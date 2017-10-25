function timeout(time, signal) {
  return new Promise((done, fail) => {
    const timer = setTimeout(done, time)
    signal.addEventListener('abort', (e) => {
      clearTimeout(timer)
      fail(e)
    })
  })
}

const controller = new AbortController()
const signal = controller.signal

timeout(100, signal).then(() => {
  console.log('done')
}).catch((e) => {
  console.error(e)
  console.log('timeout')
})

controller.abort()
