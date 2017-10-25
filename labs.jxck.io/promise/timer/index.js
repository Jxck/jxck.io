import {timeout, interval} from "./timer.mjs"

async function demo0() {
  await new Promise(done => setTimeout(done, 100))
}

function demo1() {
  const controller = new AbortController()
  const signal = controller.signal

  timeout(100, signal).then(() => {
    console.log('done')
  }).catch((e) => {
    console.error(e.type, e)
  })

  controller.abort()
}

async function demo2() {
  const controller = new AbortController()
  const signal = controller.signal

  setTimeout(() => {
    controller.abort()
  }, 100)

  try {
    await timeout(100, signal)
    console.log('done')
  } catch(e) {
    console.error(e.type, e)
  }
}

async function demo3() {
  const controller = new AbortController()
  const signal = controller.signal

  for await (const i of interval(100, signal)) {
    console.log(i)
    if (i === 5) {
      controller.abort()
    }
  }
  console.log('done')
}

async function main() {
  //await demo0()
  // await demo1()
  // await demo2()
  await demo3()
}
main()
