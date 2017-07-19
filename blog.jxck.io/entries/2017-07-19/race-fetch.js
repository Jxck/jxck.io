const controlle = new AbortController()
const signal = controller.signal

// 同じリソースを複数のミラーに問い合わせて
// 一番早く返ってきたやつだけ使いたい的な例
Promise.race([
  fetch(url, {signal}),
  fetch(mirror1, {signal}),
  fetch(mirror2, {signal}),
  fetch(mirror3, {signal}),
]).then((res) => {
  // 最初のレスポンス
  console.log(res)
  // そのままでは残りの fetch も走るので
  // それらを止める。
  controller.abort()
}).catch((err) => {
  if (err.name == 'AbortError') {
    // ここに来るのは race が終わる前に Abort した場合
    // race が終わった後の abort はここに来ない
    return
  }
  // race の失敗
  console.error(err)
})
