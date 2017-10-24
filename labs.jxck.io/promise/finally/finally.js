showSpinner()
fetch('/')
  .then((response) => {
    console.log(response)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    hideSpinner()
  })
