(async () => {
  try {
    showSpinner()
    res = await fetch('/')
    console.log(res)
  } catch (e) {
    console.error(e)
  } finally {
    hideSpinner()
  }
})()
