'use strict';
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
EventTarget.prototype.on = EventTarget.prototype.addEventListener

const origin = location.origin
console.log(origin)

// interest group への追加
const interestGroup = {
  owner:                    origin,
  name:                     "FLEDGE TRIAL",
  biddingLogicUrl:          `${origin}/bidding_logic.js`,
  trustedBiddingSignalsUrl: `${origin}/bidding_signal.json`,
  trustBiddingSignalsKeys:  ["test_trust_bid_sig_key1", "test_trust_bid_sig_key2"],
  userBiddingSignals:       {"test_user_bid_signal": "test_user_bid_signal"},
  dailyUpdateUrl:           "???", // インタレストグループを定期的に更新するため
  ads: [{  // 表示する広告の候補
    renderUrl: `${origin}/ad_url`,
    metadata:  { // generateBid の引数
      test_metadata: "test_metadata"
    }
  }]
}

// Seller が実行するオークション
const adAuctionConfig = {
  seller:           origin,

  // seller のオークション用 Worklet
  decisionLogicUrl: `${origin}/decision_logic.js`,
  trustedScoringSignalsUrl: "??",
  interestGroupBuyers:  [origin],
  additionalBids: "??",　// まだ議論中の機能

  // generateBid, reportResult, reportWin の引数
  auctionSignals: {
    test_auction_signals: "test_auction_signals"
  },
  // reportResult, reportWin の引数
  sellerSignals: {
    test_seller_signals: "test_seller_signals"
  },
  // generateBid, reportResult, reportWin の引数
  perBuyerSignals: {
    "https://labs.jxck.io": {
      test_per_buyer_signals: "test_per_buyer_signals"
    }
  }
}

document.on('DOMContentLoaded', async (e) => {
  console.log(e)

  // console.log(interestGroup)
  await navigator.joinAdInterestGroup(interestGroup, kSecsPerDay)

  // この promise は Opaque で Fenced Frame には渡せる
  const adAuctionResult = await navigator.runAdAuction(adAuctionConfig)
  console.log({adAuctionResult})
})
