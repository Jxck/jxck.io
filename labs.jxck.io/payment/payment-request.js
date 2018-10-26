'use strict';
let log = console.log.bind(console);

document.querySelector('#start').addEventListener('click', async () => {
  console.assert(window.PaymentRequest)

  // Supported payment methods
  const supportedInstruments = [
    { supportedMethods: 'basic-card' }
  ]

  // Checkout details
  const details = {
    total: {
      label: 'Total',
      amount: { currency: 'USD', value : 0 }
    }
  }

  const options = {}

  const request = new PaymentRequest(supportedInstruments, details, options);
  try {
    const result = await request.show()
    console.log(result.toJSON())

    result.complete('success');
  } catch(err) {
    console.log(err)
    // result.complete('fail');
  }
})
