document.addEventListener("DOMContentLoaded", async (e) => {
  console.log(e)

  console.log(e?.b    ) // e == null ? undefined : e.b
  console.log(e?.[0]  ) // e == null ? undefined : e[0]
  console.log(e?.b?.()) // e == null ? undefined : e.b()

  const none = document.querySelector(".none")?.textContent
  console.log(none)

  console.log(window.bar?.())
})
