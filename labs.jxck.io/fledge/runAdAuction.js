const auctionConfig = {
  seller: "https://adtech.labs.jxck.io", // should https & same as decisionLogicUrl's origin

  // x-allow-fledge: true
  decisionLogicUrl: "https://adtech.labs.jxck.io/fledge/decision_logic.js",
  interestGroupBuyers: [
    // * is not supported yet
    "https://adtech.labs.jxck.io",
    "https://travel.labs.jxck.io",
    "https://shopping.labs.jxck.io",
  ],
  auctionSignals: { auction_signals: "auction_signals" },
  sellerSignals: { seller_signals: "seller_signals" },
  perBuyerSignals: {
    // interestGroupByers にリストされていること
    "https://adtech.labs.jxck.io": { per_buyer_signals: "per_buyer_signals" },
    "https://travel.labs.jxck.io": { per_buyer_signals: "per_buyer_signals" },
    "https://shopping.labs.jxck.io": { per_buyer_signals: "per_buyer_signals" },
  }
}

document.addEventListener("DOMContentLoaded", async (e) => {
  console.log(e)
  const adAuctionResult = await navigator.runAdAuction(auctionConfig)
  console.log({ adAuctionResult })

  const $iframe = document.createElement('iframe')
  $iframe.src = adAuctionResult
  $iframe.width = 300
  $iframe.height = 300
  document.body.appendChild($iframe)
})
