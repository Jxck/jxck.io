const interestGroup = {
  name: "shopping",
  owner: "https://adtech.labs.jxck.io", // dsp

  // x-allow-fledge: true
  biddingLogicUrl: "https://adtech.labs.jxck.io/fledge/bidding_logic.js",

  // x-allow-fledge: true
  trustedBiddingSignalsUrl: "https://adtech.labs.jxck.io/fledge/bidding_signal.json",
  trustBiddingSignalsKeys: ["bidding_signals_keys"],

  dailyUpdateUrl: "", // not implemented yets
  userBiddingSignals: { "user_bidding_signals": "user_bidding_signals" },
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

document.addEventListener("DOMContentLoaded", async (e) => {
  console.log(e)
  const kSecsPerDay = 3600*24*30
  console.log(await navigator.joinAdInterestGroup(interestGroup, kSecsPerDay))
})
