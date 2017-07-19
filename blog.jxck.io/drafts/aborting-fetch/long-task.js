class LongTask {
  start() {
    //...
  }
  stop() {
    //...
  }
}

function longTaskPromise({signal}) {
  return new Promise((resolve, reject) => {
    // 処理の Promise 化
    let longTask = new LongTask()
    longTask.addEventListener('data', (data) => {
      resolve(data)
    })

    longTask.addEventListener('error', (err) => {
      reject(err)
    })
    longTask.start()

    // abort signal のハンドリング
    signal.addEventListener('abort', () => {
      longTask.stop()
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}


function main() {
  // AbortController class が追加される
  const controller = new AbortController()

  // キャンセルを通知するための siganl が取得できる
  const signal = controller.signal

  startSpinner()

  // signal を第二引数に渡す
  longTaskPromise({signal})
    .then((result) => {
      // 結果の正常処理
    })
    .catch((err) => {
      if (err.name == 'AbortError') {
        // 中断の場合の処理
        return
      }
      // 中断以外のエラー
      console.error(err)
    })
    .then(() => {
      // finally
      stopSpinner()
    })


  // fetch が 1000ms 超えたらコントローラ経由で中断する
  setTimeout(() => {
    controller.abort()
  }, 1000)
}
