const interestGroup = {
  name:                     "shopping",
  owner:                    "https://adtech.labs.jxck.io", // dsp

  // x-allow-fledge: true
  biddingLogicUrl:          "https://adtech.labs.jxck.io/fledge/bidding_logic.js",

  // x-allow-fledge: true
  trustedBiddingSignalsUrl: "https://adtech.labs.jxck.io/fledge/bidding_signal.json",
  trustBiddingSignalsKeys:  ["bidding_signals_keys"],

  dailyUpdateUrl:           "", // not implemented yets
  userBiddingSignals:       {"user_bidding_signals": "user_bidding_signals"},
  ads: [
    {
      renderUrl: "https://advertiser.labs.jxck.io/fledge/shopping-ad.html",
      metadata: {
        type: "shopping"
      }
    },
    {
      renderUrl: "https://advertiser.labs.jxck.io/fledge/travel-ad.html",
      metadata: {
        type: "travel"
      }
    }
  ]
}

const auctionConfig = {
  seller:              "https://adtech.labs.jxck.io", // should https & same as decisionLogicUrl's origin

  // x-allow-fledge: true
  decisionLogicUrl:    "https://adtech.labs.jxck.io/fledge/decision_logic.js",
  interestGroupBuyers: [
    // * is not supported yet
    "https://adtech.labs.jxck.io",
    "https://travel.labs.jxck.io",
    "https://shopping.labs.jxck.io",
  ],
  auctionSignals:      {auction_signals: "auction_signals"},
  sellerSignals:       {seller_signals:  "seller_signals"},
  perBuyerSignals: {
    // interestGroupByers にリストされていること
    "https://adtech.labs.jxck.io":   {per_buyer_signals: "per_buyer_signals"},
    "https://travel.labs.jxck.io":   {per_buyer_signals: "per_buyer_signals"},
    "https://shopping.labs.jxck.io": {per_buyer_signals: "per_buyer_signals"},
  }
}

const kSecsPerDay = 10000
document.addEventListener("DOMContentLoaded", async () => {
  console.log(await navigator.joinAdInterestGroup(interestGroup, kSecsPerDay))
  const adAuctionResult = await navigator.runAdAuction(auctionConfig)
  console.log({adAuctionResult})
})
