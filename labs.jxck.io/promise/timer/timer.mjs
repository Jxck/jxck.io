export function timeout(time, signal) {
  return new Promise((done, fail) => {
    const timer = setTimeout(done, time)
    signal.addEventListener('abort', (e) => {
      clearTimeout(timer)
      done(e)
    })
  })
}

export async function* interval(time, signal) {
  let i = 0;
  while (!signal.aborted) {
    await timeout(time, signal)
    yield  i++;
  }
}
