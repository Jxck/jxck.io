function log(label, o) {
  console.log(label, JSON.stringify(o, " ", " "))
}

function scoreAd(adMetadata, bid, auctionConfig, trustedScoringSignals, browserSignals) {
  log("scoreAd", {adMetadata, bid, auctionConfig, trustedScoringSignals, browserSignals})
  // {
  //   adMetadata: {
  //     renderUrl: "https://advertiser.labs.jxck.io/fledge/shopping-ad.html",
  //     metadata: {
  //       type: "shopping"
  //     }
  //   },
  //   bid: 1,
  //   auctionConfig: {
  //     seller:           "https://adtech.labs.jxck.io",
  //     decisionLogicUrl: "https://adtech.labs.jxck.io/fledge/decision_logic.js",
  //     interestGroupBuyers: [
  //       "adtech.labs.jxck.io",
  //       "travel.labs.jxck.io",
  //       "shopping.labs.jxck.io"
  //     ],
  //     auctionSignals: {
  //       auction_signals: "auction_signals"
  //     },
  //     sellerSignals: {
  //       seller_signals: "seller_signals"
  //     },
  //     perBuyerSignals: {
  //       adtech.labs.jxck.io:   { "per_buyer_signals": "per_buyer_signals" },
  //       shopping.labs.jxck.io: { "per_buyer_signals": "per_buyer_signals" },
  //       travel.labs.jxck.io:   { "per_buyer_signals": "per_buyer_signals" }
  //     }
  //   },
  //   trustedScoringSignals: null,
  //   browserSignals: {
  //     topWindowHostname:   "adtech.labs.jxck.io",
  //     interestGroupOwner:  "https://adtech.labs.jxck.io",
  //     adRenderFingerprint: "#####",
  //     biddingDurationMsec: 3
  //   }
  // }

  return 1
}

function reportResult(auctionConfig, browserSignals) {
  log("reportResult", {auctionConfig, browserSignals})

  // {
  //   auctionConfig: {
  //     seller:           "https://adtech.labs.jxck.io",
  //     decisionLogicUrl: "https://adtech.labs.jxck.io/fledge/decision_logic.js",
  //     interestGroupBuyers: [
  //       "adtech.labs.jxck.io",
  //       "travel.labs.jxck.io",
  //       "shopping.labs.jxck.io"
  //     ],
  //     auctionSignals: {
  //       auction_signals: "auction_signals"
  //     },
  //     sellerSignals: {
  //       seller_signals: "seller_signals"
  //     },
  //     perBuyerSignals: {
  //       adtech.labs.jxck.io:   { "per_buyer_signals": "per_buyer_signals" },
  //       shopping.labs.jxck.io: { "per_buyer_signals": "per_buyer_signals" },
  //       travel.labs.jxck.io:   { "per_buyer_signals": "per_buyer_signals" }
  //     }
  //   },
  //   browserSignals: {
  //     topWindowHostname:   "adtech.labs.jxck.io",
  //     interestGroupOwner:  "https://adtech.labs.jxck.io",
  //     renderUrl:           "https://advertiser.labs.jxck.io/fledge/shopping-ad.html",
  //     adRenderFingerprint: "#####",
  //     bid:                 1,
  //     desirability:        1
  //   }
  // }

  sendReportTo(auctionConfig.seller + "/fledge/report.cgi?report=result")
  return {
    "success":          true,
    "signalsForWinner": {"signalForWinner": 1},
    "reportUrl":        auctionConfig.seller + "/report_seller",
  }
}
