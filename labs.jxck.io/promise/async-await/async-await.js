(async () => {
  try {
    showSpinner()
    res = await fetch('/')
    console.log(res)
  } catch (e) {
    console.error(err)
  } finally {
    hideSpinner()
  }
})()
