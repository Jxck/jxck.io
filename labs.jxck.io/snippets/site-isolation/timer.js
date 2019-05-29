self.onmessage = function(event) {
  console.log('>> onmessage')
  const sharedBuffer = event.data
  const sharedArray = new Uint32Array(sharedBuffer)
  postMessage('start')
  while (true) {
    Atomics.add(sharedArray, 0, 1)
  }
}
