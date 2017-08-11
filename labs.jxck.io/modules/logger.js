export default {
  log: (msg) => {
    console.log(msg)
    const $div = document.createElement('div')
    $div.textContent = msg
    document.body.append($div)
  }
}
