const interestGroup = {
  name:                     "FLEDGE_TRIAL",
  owner:                    "https://publisher.labs.jxck.io",

  // x-allow-fledge: true
  biddingLogicUrl:          "https://publisher.labs.jxck.io/fledge/bidding_logic.js",

  // x-allow-fledge: true
  trustedBiddingSignalsUrl: "https://publisher.labs.jxck.io/fledge/bidding_signal.json",
  trustBiddingSignalsKeys:  ["bidding_signals_keys"],

  dailyUpdateUrl: "", // not implemented yets
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
  seller:              "https://publisher.labs.jxck.io", // should same as decisionLogicUrl's origin

  // x-allow-fledge: true
  decisionLogicUrl:    "https://publisher.labs.jxck.io/fledge/decision_logic.js",
  interestGroupBuyers: ["https://publisher.labs.jxck.io"], // * is not supported yet
  auctionSignals:      {auction_signals: "auction_signals"},
  sellerSignals:       {seller_signals:  "seller_signals"},
  perBuyerSignals:     {"https://publisher.labs.jxck.io": {per_buyer_signals: "per_buyer_signals"}}
}

const kSecsPerDay = 10000
document.addEventListener("DOMContentLoaded", async () => {
  await navigator.joinAdInterestGroup(interestGroup, kSecsPerDay)
  const adAuctionResult = await navigator.runAdAuction(auctionConfig)
  console.log({adAuctionResult})
})
