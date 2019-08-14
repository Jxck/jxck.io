document.on('DOMContentLoaded', async (e) => {
  console.log(e)

  a?.b   // a == null ? undefined : a.b
  a?.[x] // a == null ? undefined : a[x]
  a?.b() // a == null ? undefined : a.b()
  a?.()  // a == null ? undefined : a()

  const none = document.querySelector('.none')?.textContent
  console.log(none)

  console.log(window.bar?.())
})
