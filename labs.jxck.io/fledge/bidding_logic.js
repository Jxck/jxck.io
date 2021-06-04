function log(label, o) {
  console.log(label, JSON.stringify(o, " ", " "))
}

function generateBid(interestGroup, auctionSignals, perBuyerSignals, trustedBiddingSignals, browserSignals) {
  log("generateBid", {interestGroup, auctionSignals, perBuyerSignals, trustedBiddingSignals, browserSignals})

  // {
  //   interestGroup: {
  //     owner: "https://adtech.labs.jxck.io",
  //       name: "shopping",
  //       userBiddingSignals: {
  //         user_bidding_signals: "user_bidding_signals"
  //       },
  //       ads: [
  //         {
  //           renderUrl: "https://advertiser.labs.jxck.io/fledge/shopping-ad.html",
  //           metadata: {
  //             type: "shopping"
  //           }
  //         },
  //         {
  //           renderUrl: "https://advertiser.labs.jxck.io/fledge/travel-ad.html",
  //           metadata: {
  //             type: "travel"
  //           }
  //         }
  //       ]
  //   },
  //   auctionSignals: {
  //     auction_signals: "auction_signals"
  //   },
  //   perBuyerSignals: {
  //     per_buyer_signals: "per_buyer_signals"
  //   },
  //   trustedBiddingSignals: null,
  //   browserSignals: {
  //     topWindowHostname: "adtech.labs.jxck.io",
  //     seller:            "https://adtech.labs.jxck.io",
  //     joinCount:         1,
  //     bidCount:          0,
  //     prevWins:          []
  //   }
  // }

  return {ad: interestGroup.ads[0], bid: 100, render: interestGroup.ads[0].renderUrl}
}

function reportWin(auctionSignals, perBuyerSignals, sellerSignals, browserSignals) {
  log("reportWin", {auctionSignals, perBuyerSignals, sellerSignals, browserSignals})
  // {
  //   auctionSignals: {
  //     auction_signals: "auction_signals"
  //   },
  //   perBuyerSignals: {
  //     per_buyer_signals: "per_buyer_signals"
  //   },
  //   sellerSignals: {
  //     success: true,
  //     signalsForWinner: {
  //       signalForWinner: 1
  //     },
  //     reportUrl: "https://adtech.labs.jxck.io/report_seller"
  //   },
  //   browserSignals: {
  //     topWindowHostname:   "adtech.labs.jxck.io",
  //     interestGroupOwner:  "https://adtech.labs.jxck.io",
  //     interestGroupName:   "shopping",
  //     renderUrl:           "https://advertiser.labs.jxck.io/fledge/shopping-ad.html",
  //     adRenderFingerprint: "#####",
  //     bid:                 1
  //   }
  // }

  sendReportTo(browserSignals.interestGroupOwner + "/fledge/report.cgi?report=win")
}
