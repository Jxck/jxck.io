console.log("hello")

function get(n) {
  const { promise, reject, resolve } = Promise.withResolvers()
  setTimeout(() => {
    resolve(n)
  }, n)
  return promise
}

function ack(m, n) {
  if (m == 0) return n + 1
  if (n == 0) return ack(m - 1, 1)
  return ack(m - 1, ack(m, n - 1))
}
function long() {
  if (ack(3, 10)) return "long"
}
function middle() {
  if (ack(2, 5)) return "middle"
}

console.log(await get(100))
console.log(middle())

console.log(await get(200))
console.log(long())
