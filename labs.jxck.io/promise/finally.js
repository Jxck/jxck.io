showSpinner()
fetch()
  .finally(() => {
    hideSpinner()
  })
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })
