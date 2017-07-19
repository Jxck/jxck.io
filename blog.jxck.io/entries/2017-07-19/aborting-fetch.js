function main() {
  // AbortController class が追加される
  const controller = new AbortController()

  // キャンセルを通知するための siganl が取得できる
  const signal = controller.signal

  startSpinner()

  // signal を第二引数に渡す
  fetch(url, {signal})
    .then((res) => {
      // レスポンスの処理
    })
    .catch((err) => {
      if (err.name == 'AbortError') {
        // 中断の場合の処理
        return
      }
      // 中断以外のエラー処理
      console.error(err)
    })
    .then(() => {
      // finally 相当
      stopSpinner()
    })


  // fetch が 1000ms 超えたらコントローラ経由で中断する
  setTimeout(() => {
    controller.abort()
  }, 1000)
}
