# First Experiment (FLEDGE)

> This document describes an early prototype for ads serving in the TURTLEDOVE family, appropriate for experimentation before a fully-featured system is ready.  It would be the First "Locally-Executed Decision over Groups" Experiment.

> Chrome expects to build and ship this first experiment during 2021.  The goal is for us to gain implementer experience, and for the ads ecosystem to evaluate its usability, as soon as it is feasible to do so.  We need a robust API to take flight before Chrome's expected removal of third-party cookies in 2022.

> We plan to hold regular meetings under the auspices of the WICG to go through the details of this proposal and quickly make any needed changes.  Please comment on the timing question in Issue [#88](https://github.com/WICG/turtledove/issues/88) if you want to attend these meetings to be involved in hammering out details.

この文書は、 TURTLEDOVE ファミリーにおける広告配信の初期のプロトタイプについて説明するもので、完全な機能を備えたシステムが完成する前の実験に適している。 これは、最初の「グループに対するローカルで実行される判断」実験となる。

クロームは、この最初の実験を 2021 年中に構築して出荷することを期待している。 目標は、実装が可能になった時点で、実装者が経験を積み、広告エコシステムが使い勝手を評価することです。 また、 2022 年に予定されている Chrome のサードパーティ Cookie の廃止までに、堅牢な API を実現する必要があります。

私たちは、 WICG の後援のもと、定期的にミーティングを開催し、この提案の詳細を確認し、必要な変更を速やかに行うことを計画しています。 このミーティングに参加して詳細を検討したい方は、 Issue [#88](https://github.com/WICG/turtledove/issues/88)のタイミングに関する質問にコメントしてください。

- [Summary](#summary)
- [Background](#background)
- [Design Elements](#design-elements)
  - [1. Browsers Record Interest Groups](#1-browsers-record-interest-groups)
    - [1.1 Joining Interest Groups](#11-joining-interest-groups)
    - [1.2 Interest Group Attributes](#12-interest-group-attributes)
  - [2. Sellers Run On-Device Auctions](#2-sellers-run-on-device-auctions)
    - [2.1 Initiating an On-Device Auction](#21-initiating-an-on-device-auction)
    - [2.2 Auction Participants](#22-auction-participants)
    - [2.3 Scoring Bids](#23-scoring-bids)
  - [3. Buyers Provide Ads and Bidding Functions (BYOS for now)](#3-buyers-provide-ads-and-bidding-functions-byos-for-now)
    - [3.1 Fetching Real-Time Data from a Trusted Server](#31-fetching-real-time-data-from-a-trusted-server)
    - [3.2 On-Device Bidding](#32-on-device-bidding)
    - [3.3 Metadata with the Ad Bid](#33-metadata-with-the-ad-bid)
    - [3.4 Ads Composed of Multiple Pieces](#34-ads-composed-of-multiple-pieces)
  - [4. Browsers Render the Winning Ad](#4-browsers-render-the-winning-ad)
  - [5. Event-Level Reporting (for now)](#5-event-level-reporting-for-now)
    - [5.1 Seller Reporting on Render](#51-seller-reporting-on-render)
    - [5.2 Buyer Reporting on Render and Ad Events](#52-buyer-reporting-on-render-and-ad-events)
    - [5.3 Losing Bidder Reporting](#53-losing-bidder-reporting)


## Summary

During 2021, Chrome plans to run an Origin Trial for a first experiment which includes:

*   Interest Groups, stored by the browser, and associated with arbitrary metadata that can affect how these groups bid and render ads.
*   A mechanism for periodic background updating of these interest groups, available as long as the number of people in the interest group exceeds a k-anonymity threshold.
*   On-device bidding by buyers (DSPs or advertisers), based on interest-group metadata and on data loaded from a trusted server at the time of the on-device auction - with a _temporary and untrusted_ "Bring Your Own Server" model, until a trusted-server framework is settled and in place.
*   On-device ad selection by the seller (an SSP or publisher), based on bids and metadata entered into the auction by the buyers.
*   Microtargeting protection based on the browser ensuring that the same ad or ad component is being shown to at least some minimum number of people.
*   Ad rendering in a temporarily relaxed version of Fenced Frames that prevents interaction with the surrounding page - but that does allow _normal network access for rendering the ad, and for logging and reporting some event-level outcomes_, as a temporary model until both a trusted-server reporting framework and ad delivery via web bundles are settled and in place.

Most of these ideas are drawn from the past year's ongoing discussion of variants on the [original TURTLEDOVE](https://github.com/WICG/turtledove/blob/master/Original-TURTLEDOVE.md) idea.  Interest group metadata, and applying k-anonymity thresholds only to network updates and rendered ads, come from [Outcome-based TURTLEDOVE](https://github.com/WICG/turtledove/blob/master/OUTCOME_BASED.md) and [Product-level TURTLEDOVE](https://github.com/WICG/turtledove/blob/master/PRODUCT_LEVEL.md).  The separation and clarification of the DSP and SSP roles are along the lines described in [TERN](https://github.com/WICG/turtledove/blob/master/TERN.md) and [PARRROT](https://github.com/prebid/identity-gatekeeper/blob/master/proposals/PARRROT.md).  The trusted servers to support bidding, rendering, and reporting come from the [SPARROW](https://github.com/WICG/sparrow) Gatekeeper and [Dovekey](https://github.com/google/ads-privacy/tree/master/proposals/dovekey) Key-Value server.

This still lacks some features that are important for web advertising, and lacks some privacy protections that are important for preventing cross-site tracking.  For example, the first experiment does not (yet) have a mechanism for multi-level on-device auctions, an ad ecosystem feature that needs more design work before we can offer on-device support.  And the temporary italicized carve-outs in the above bulleted list all need privacy-safe replacements before our work is done.

But while third-party cookies are still available, this simplified opt-in preview of a post-3p-cookies technique offers a way that we can all experiment with the on-device ad selection approach together.

2021 年中に、 Chrome は、以下を含む最初の実験のための Origin Trial を実施する予定です。

* ブラウザが保存するインタレストグループには、任意のメタデータが関連付けられており、これらのグループが広告の入札や表示に影響を与えることができます。
* インタレストグループのバックグラウンドでの定期的な更新の仕組み(インタレストグループに含まれる人の数が k-匿名性の閾値を超えている限り利用可能
* Buyer( DSP または広告主)による端末上の入札は、インタレストグループのメタデータと、端末上のオークション時に信頼できるサーバーから読み込まれたデータに基づいて行われます。ただし、信頼できるサーバーのフレームワークが確立されるまでは、一時的で信頼できない「Bring Your Own Server」モデルを使用します。
* 売主( SSP またはパブリッシャー)によるオンデバイス広告の選択は、買主がオークションに入力した入札価格とメタデータに基づいて行われます。
* 同一の広告または広告コンポーネントが少なくともある程度の数の人々に表示されていることをブラウザが保証することに基づくマイクロターゲティングの保護。
* しかし、信頼されたサーバーによるレポーティングフレームワークとウェブバンドルによる広告配信の両方が確立されるまでの一時的なモデルとして、広告をレンダリングするための通常のネットワークアクセスと、イベントレベルの結果を記録・報告するためのネットワークアクセスは許可します。

これらのアイデアのほとんどは、[オリジナルの TURTLEDOVE](https://github.com/WICG/turtledove/blob/master/Original-TURTLEDOVE.md)のアイデアのバリエーションについて、過去 1 年間に行われた継続的な議論から得られたものです。 インタレストグループのメタデータや、ネットワークの更新やレンダリングされた広告にのみ k-アノニマスの閾値を適用することは、[Outcome-based TURTLEDOVE](https://github.com/WICG/turtledove/blob/master/OUTCOME_BASED.md)や[Product-level TURTLEDOVE](https://github.com/WICG/turtledove/blob/master/PRODUCT_LEVEL.md)から来ています。 DSP と SSP の役割の分離と明確化は、[TERN](https://github.com/WICG/turtledove/blob/master/TERN.md)と[PARRROT](https://github.com/prebid/identity-gatekeeper/blob/master/proposals/PARRROT.md)で説明されている路線に沿っています。 入札、レンダリング、レポートをサポートする信頼できるサーバーは、[SPARROW](https://github.com/WICG/sparrow)ゲートキーパーと[Dovekey](https://github.com/google/ads-privacy/tree/master/proposals/dovekey)Key-Value サーバーから来ています。

これでも、ウェブ広告にとって重要な機能がいくつか欠けていますし、クロスサイトトラッキングを防ぐために重要なプライバシー保護機能も欠けています。 例えば、最初の実験では、マルチレベルのオンデバイス・オークションのメカニズムが(まだ)ありません。これは、オンデバイスのサポートを提供する前に、より多くの設計作業が必要なアド・エコシステムの機能です。 また、上記の箇条書きのリストにある一時的な斜体の除外は、すべて私たちの作業が完了する前に、プライバシーの安全な代替品が必要です。

サードパーティークッキーはまだ利用可能ですが、このポスト 3p-Cookie 技術の簡素化されたオプトインプレビューは、オンデバイスの広告選択アプローチをみんなで実験する方法を提供します。


## Background

In January 2020, Chrome published an explainer for TURTLEDOVE, proposing a new way that advertisers and ad tech companies could target an ad to an audience they had built, without the browser revealing anyone's browsing habits or ad interests.

Over the course of extensive engagement and discussion with many participants in the ad tech ecosystem, we've learned many ways in which the original proposal could better meet their needs.  Discussion took place over the past year, primarily in (1) GitHub issues on the TURTLEDOVE repo, (2) the many counter-proposals that built on the original explainer (most things in [this list](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo) with bird names), and (3) the weekly meetings of the W3C's Improving Web Advertising Business Group.

Of the improvements proposed, some can be accommodated through straightforward changes to APIs, some will require deeper gathering of requirements and careful design work, and some will require new server-side infrastructure with novel trust relations with multiple parties.  This update focuses primarily on the first of these types.

2020 年 1 月、 Chrome は「TURTLEDOVE」の説明文を公開し、広告主やアドテック企業が、誰の閲覧習慣や広告への関心もブラウザに表示されることなく、構築したオーディエンスに向けて広告を表示できる新しい方法を提案しました。

この提案は、広告主やアドテク企業が構築したオーディエンスを対象に、ブラウザの閲覧習慣や広告の関心事を明らかにすることなく広告を配信するための新しい方法を提案するものでした。 議論はこの 1 年間、主に(1)TURTLEDOVE リポジトリの GitHub 課題、(2)原案の説明を基にした多くの対案([this list](https://github.com/w3c/web-advertising#ideas-and-proposals-links-outside-this-repo)のほとんどのものは鳥の名前がついています)、(3)W3C の「Improving Web Advertising Business Group」の毎週のミーティングで行われました。

提案されている改善点の中には、 API を単純に変更することで対応できるものもあれば、より深い要件の収集と慎重な設計作業が必要なものもあり、また、複数の当事者との斬新な信頼関係を持つ新しいサーバーサイドのインフラが必要なものもあります。 今回のアップデートでは、主にこれらのうちの 1 つに焦点を当てています。


## Design Elements

Ads can be targeted at **_interest groups_**.  As in the original TURTLEDOVE proposal, the browser is responsible for knowing which interest groups it has joined.

Every interest group has an **_owner_** who will act as a buyer in an on-device ad auction.  The owner is ultimately responsible for the group's membership and usage, but can delegate those tasks to third parties if they so desire.  Many sorts of entities might want to be owners of interest groups.  Some examples include:

広告は **_interest group_** をターゲットにすることができます。 オリジナルの TURTLEDOVE の提案と同様に、ブラウザはどのインタレストグループに参加しているかを知る責任があります。

すべてのインタレストグループには、デバイス上の広告オークションで Buyer となる **_owner_** がいます。 オーナーは、グループのメンバーシップと利用に関して最終的な責任を負いますが、必要に応じてそれらのタスクを第三者に委任することができます。 グループのオーナーになりたい人はたくさんいるでしょう。 例えば、以下のようなものがあります。

*   An advertiser (or a third party working on the advertiser's behalf) might create and own an interest group of people whom they believe are interested in that advertiser's product.  Classical remarketing/retargeting use cases fall under this example.
*   A publisher (or a third party working on the publisher's behalf) might create and own an interest group of people who have read a certain type of content on their site.  Publishers can already use first-party data to let advertisers target their readers on the publisher site.  A publisher-owned interest group could let publishers do the same even when those people are browsing other sites.  Publishers would presumably charge for the ability to target this list.
*   A third-party ad tech company might create and own an interest group of people whom they believe are in the market for some category of item.  They could use that group to serve ads for advertisers who work with that ad tech company and sell things in that category.

* 広告主(または広告主の代理を務めるサードパーティ)が、その広告主の製品に興味があると思われる人々のインタレストグループを作成し、所有することがあります。 古典的なリマーケティング/リターゲティングのユースケースがこの例に該当します。
* 出版社(または出版社に代わって業務を行うサードパーティ)が、自社サイトのある種のコンテンツを読んだことのある人たちのインタレストグループを作成し、所有する場合。 出版社はすでにファーストパーティデータを利用して、広告主が出版社のサイトの読者をターゲットにできるようにしています。 出版社が所有するインタレストグループがあれば、読者が他のサイトを閲覧している場合でも、出版社は同じことができる。 出版社は、このリストをターゲットにする機能に対して料金を支払うことになるだろう。
* サードパーティのアドテック企業が、あるカテゴリーの商品を購入していると思われる人々のインタレストグループを作成し、所有することができる。 サードパーティのアドテク企業が、あるカテゴリーの商品を購入していると思われる人々のインタレストグループを作成・所有し、そのグループを使って、そのアドテク企業と提携し、そのカテゴリーの商品を販売している広告主の広告を配信することができる。

All the logic of the on-device auctions will execute inside a collection of dedicated **_worklets_**.  Each worklet is associated with a single domain, and runs code written by either a buyer or a seller.  The code in the worklets cannot access or communicate with the publisher page or the network.  The browser is responsible for creating those worklets, loading the relevant buyer or seller logic from the provided URLs, fetching real-time data from a trusted server, calling the appropriate functions with specified input, and passing on the output.  We will publish a separate explainer on dedicated worklets.

オンデバイスオークションのすべてのロジックは、専用の **_worklets_** の集合体の中で実行されます。 各ワークレットは 1 つのドメインに関連付けられており、 buyer または seller によって書かれたコードを実行します。 ワークレット内のコードは、パブリッシャーページやネットワークにアクセスしたり、通信したりすることはできません。 ブラウザは、これらの小道具を作成し、提供された URL から関連する Buyer または Seller のロジックを読み込み、信頼できるサーバーからリアルタイムのデータを取得し、指定された入力で適切な関数を呼び出し、出力を渡す責任があります。 専用のワークレットについては、別途解説を掲載する予定です。

The on-device bidding flow includes a way that the worklets can use some data loaded from a **_trusted server_**.  The browser is willing to ask this server questions which might reveal sensitive information, like the set of all interest groups it has joined.  This requires a server that performs no event-level logging and has no other side effects based on these requests.  One can imagine a wide range of ways that a server might earn the trust of a browser, including both policy approaches (trusted third party, audited code, etc) and technical guarantees (secure multi-party computation, secure enclaves, etc).  We expect a robust discussion in early 2021 on what sorts of server-trust models seem feasible to browsers and buyers, with the expectation that initially productionization speed is essential, but trust requirements may increase over time.

オンデバイスの入札フローには、ワークレットが **_trusted server_** から読み込まれたいくつかのデータを使用できる方法が含まれています。 ブラウザは、このサーバーに対して、自分が参加しているすべての利益団体のセットなど、機密情報を明らかにする可能性のある質問をすることができます。 このためには、イベントレベルのロギングを行わず、これらのリクエストに基づくその他の副作用がないサーバが必要です。 サーバがブラウザの信頼を得るための方法は、政策的アプローチ(信頼された第三者、監査されたコードなど)と技術的保証(安全なマルチパーティ計算、安全なエンクレーブなど)の両方を含めて、幅広く想像することができます。 2021 年初頭には、ブラウザや Buyer にとってどのような種類のサーバ信頼モデルが実現可能であるかについて、活発な議論が行われることを期待しています。


### 1. Browsers Record Interest Groups


#### 1.1 Joining Interest Groups

> Browsers keep track of the set of interest groups that they have joined.  For each interest group, the browser stores information about who owns the group, what ads the group might choose to show, various javascript functions and metadata used in bidding and rendering, and what servers to contact to update or supplement that information.

ブラウザは、自分が参加している一連のインタレストグループを記録しています。 各インタレストグループについて、ブラウザは、グループの所有者、グループが表示を選択する可能性のある広告、入札やレンダリングに使用されるさまざまな javascript 関数やメタデータ、および情報を更新または補完するためにどのサーバーに連絡すべきかについての情報を保存します。


```js
const myGroup = {
  'owner': 'www.example-dsp.com',
  'name':  'womens-running-shoes',
  'biddingLogicUrl': '...',
  'dailyUpdateUrl':  '...',
  'trustedBiddingSignalsUrl':  '...',
  'trustedBiddingSignalsKeys': ['key1', 'key2'],
  'userBiddingSignals': {},
  'ads': [shoesAd1, shoesAd2, shoesAd3],
};
navigator.joinAdInterestGroup(myGroup, 30 * kSecsPerDay);
```

> The browser will only allow the `joinAdInterestGroup()` operation with the permission of both the site being visited and the group's owner.  The site can allow or deny permission to any or all third parties via a `Feature-Policy`, where the default policy is to allow all in the top-level page and to deny all in cross-domain iframes.  The group's owner can indicate permission by `joinAdInterestGroup()` running in a page or iframe in the owner's domain, and can delegate that permission to any other domains via a list at a `.well-known` URL.  These can be combined, to allow a DSP to add a person to one of its interest groups based on publisher context, as discussed in [TERN](https://github.com/WICG/turtledove/blob/master/TERN.md#c-contextual-interest-groups) - provided the publisher's `Feature-Policy` permits interest group additions by its SSP, and the DSP gives this SSP this ability.  If some permission is missing, `joinAdInterestGroup()` will raise an `Error` describing the reason for failure.

ブラウザは、訪問先のサイトとグループの所有者の両方の許可がある場合にのみ、 `joinAdInterestGroup()` の操作を許可します。 サイトは `Feature-Policy` を通じて、任意のまたはすべてのサードパーティに対して許可または拒否することができます。デフォルトのポリシーは、トップレベルのページではすべて許可し、クロスドメインの iframe ではすべて拒否することです。 グループのオーナーは、オーナーのドメイン内のページや iframe で実行される `joinAdInterestGroup()` によって許可を示すことができ、`.well-known` URL のリストを介して他のドメインにその許可を委ねることができます。 これらを組み合わせることで、[TERN](https://github.com/WICG/turtledove/blob/master/TERN.md#c-contextual-interest-groups)で議論されているように、 DSP がパブリッシャーのコンテキストに基づいて人をインタレストグループに追加することができます - パブリッシャーの `Feature-Policy` が SSP によるインタレストグループの追加を許可していて、 DSP がこの SSP にこの能力を与えている場合に限ります。 何らかの許可がない場合、`joinAdInterestGroup()` は失敗の理由を説明する `Error` を発生させます。

> There is a complementary API `navigator.leaveAdInterestGroup(myGroup)` which looks only at `myGroup.name` and `myGroup.owner`.  As a special case to support in-ad UIs, invoking `navigator.leaveAdInterestGroup({})` from inside an ad that is being targeted at a particular interest group will cause the browser to leave that group, irrespective of permission policies.

補足的な API として、`navigator.leaveAdInterestGroup(myGroup)`があり、`myGroup.name`と`myGroup.owner`のみを検索します。 広告内 UI をサポートするための特別なケースとして、特定のインタレストグループをターゲットにしている広告の内部から `navigator.leaveAdInterestGroup({})` を呼び出すと、許可ポリシーに関係なく、ブラウザがそのグループから離脱します。

> The browser will remain in an interest group for only a limited amount of time.  The duration is specified in the call to `joinAdInterestGroup()`, and will be capped at 30 days.  This can be extended by calling `joinAdInterestGroup()` again later, with the same group name and owner.  Successive calls to `joinAdInterestGroup()` will overwrite the previously-stored values for any interest group properties, like the group's userBiddingSignal or list of ads.

ブラウザがインタレストグループに留まる時間は限られています。 その期間は`joinAdInterestGroup()`の呼び出しで指定され、 30 日が上限となります。 この期間は、同じグループ名とオーナーを指定して後から再度`joinAdInterestGroup()`を呼び出すことで延長できます。 joinAdInterestGroup()を連続して呼び出すと、グループの userBiddingSignal や広告リストなど、インタレストグループのプロパティの以前に保存された値が上書きされます。


#### 1.2 Interest Group Attributes

> The `userBiddingSignals` is for storage of additional metadata that the owner can use during on-device bidding, and the `trustedBiddingSignals*` attributes provide another mechanism for making real-time data available for use at bidding time.

また、`trustedBiddingSignals*` 属性は、入札時にリアルタイムのデータを利用できるようにするための別のメカニズムを提供します。

> The `dailyUpdateUrl` provides a mechanism for the group's owner to periodically update the attributes of the interest group: any new values returned in this way overwrite the values previously stored (except that the `name` and `owner` cannot be changed).  However, the browser will only allow daily updates when a sufficiently large number of people have the same `dailyUpdateUrl` , e.g. at least 100 browsers with the same update url. This will not include any metadata, so data such as the interest group `name` should be included within the url, so long as url exceeds the minimum count threshold.  (Without this sort of limit, a single-person interest group could be used to observe that person's coarse-grained IP-Geo location over time.)

`dailyUpdateUrl` は、グループのオーナーが興味のあるグループの属性を定期的に更新するためのメカニズムを提供します。この方法で返される新しい値は、以前に保存された値を上書きします(ただし、 `name` と `owner` は変更できません)。 ただし、ブラウザは、十分に多くの人が同じ `dailyUpdateUrl` を持っている場合にのみ、毎日の更新を許可します。例えば、少なくとも 100 個のブラウザが同じ更新 URL を持っている場合です。これにはメタデータは含まれませんので、 URL が最小数のしきい値を超えていれば、インタレストグループの `name` などのデータを URL の中に含める必要があります。 (このような制限がなければ、一人の人のインタレストグループを使って、その人の粗い IP-Geo の位置情報を長期的に観察することができます)

> The `ads` list contains the various ads that the interest group might show.  Each entry is an object that includes both a rendering URL and arbitrary metadata that can be used at bidding time.

`ads` リストには、そのインタレストグループが表示する可能性のある様々な広告が含まれています。 各エントリは、レンダリング URL と、入札時に使用可能な任意のメタデータの両方を含むオブジェクトです。

> The browser will provide protection against microtargeting, by only rendering an ad if the same rendering URL is being shown to a sufficiently large number of people (e.g. at least 100 people would have seen the ad, if it were allowed to show).  As discussed in the [Outcome-Based TURTLEDOVE](https://github.com/WICG/turtledove/blob/master/OUTCOME_BASED.md) proposal, this threshold applies only to the rendered creative; all of the metadata associated with ad bidding is not under any such restriction.  Since a single interest group can carry multiple possible ads that it might show, the group will have an opportunity to re-bid another one of its ads to act as a "fallback ad" any time its most-preferred choice is below threshold.  This means that a small, specialized interest group that is still below the daily-update threshold could still choose to participate in auctions, bidding with a more-generic ad until the group becomes large enough.

ブラウザは、同じレンダリング URL が十分に多くの人に表示されている場合にのみ広告をレンダリングすることで、マイクロターゲティングに対する保護を行います(例えば、広告の表示が許可されている場合、少なくとも 100 人がその広告を見ていることになります)。 [Outcome-Based TURTLEDOVE](https://github.com/WICG/turtledove/blob/master/OUTCOME_BASED.md) の提案で述べたように、この閾値はレンダリングされたクリエイティブにのみ適用され、広告入札に関連するすべてのメタデータにはそのような制限はありません。 1 つのインタレストグループは、複数の広告を表示することができるため、最も好ましい広告が閾値を下回った場合には、別の広告を再入札して「予備の広告」として機能させることができます。 つまり、小規模で専門性の高いグループであっても、デイリーアップデートの閾値を下回っていれば、グループの規模が十分に大きくなるまで、一般的な広告で入札を行い、オークションに参加することができるのです。


### 2. Sellers Run On-Device Auctions

> Interest groups are used to bid in on-device auctions on sites selling ad space.  We refer to the party running the auction as the _seller_.  Many parties might act as sellers: a site might run its own ad auction, or might include a third-party script to run the auction for it, or might use an SSP that combines running an on-device auction with other server-side ad auction activities.

インタレストグループは、広告枠を販売しているサイトの端末上のオークションに入札するために使用されます。 ここでは、オークションの運営者を「Seller」と呼びます。 サイトが独自に広告オークションを運営している場合や、サードパーティのスクリプトを使用してオークションを運営している場合、オンデバイスオークションの運営と他のサーバーサイドの広告オークション活動を組み合わせた SSP を使用している場合など、多くの当事者が Seller として機能する可能性があります。

> Sellers have three basic jobs in the on-device ad auction:

Seller は、オンデバイスの広告オークションにおいて、 3 つの基本的な仕事をします。

> 1. Sellers decide (a) which buyers may participate, and (b) which of the bids from those buyers' interest groups are eligible to enter the auction.  This lets the seller enforce the site's rules for what ads are allowed to appear on the page.
> 2. Sellers are responsible for the business logic of the auction: javascript code which considers each bid's price and metadata, and calculates a "desirability" score.  The bid with the highest desirability score wins the auction.
> 3. Sellers perform reporting on the auction outcome, including information about clearing price and any other pay-outs.  (The winning and losing buyers also get to do their own reporting; see below for buyer jobs.)

1. Seller は、(a)どの Buyer が参加できるか、(b)それらの Buyer のインタレストグループからの入札のうち、どの入札がオークションに参加する資格があるかを決定します。 これにより、 Seller は、どのような広告がページに表示されることができるかというサイトのルールを実行することができます。
2. Seller は、オークションのビジネスロジックに責任を負います。 javascript のコードで、各入札の価格とメタデータを考慮し、「望ましさ」のスコアを計算します。 望ましさ」のスコアが最も高い入札がオークションに勝ちます。
3. Seller は、クリアリングプライスやその他の支払いに関する情報を含む、オークション結果の報告を行う。(勝利した Buyer と敗北した Buyer は、それぞれのレポートを作成することになります。)


#### 2.1 Initiating an On-Device Auction

> A seller initiates an auction by invoking a javascript API inside the publisher's page:

Seller はパブリッシャーのページ内で javascript の API を起動してオークションを開始します。


```js
const myAuctionConfig = {
  'seller': 'www.example-ssp.com',
  'decisionLogicUrl':         '...',
  'trustedScoringSignalsUrl': '...',
  'interestGroupBuyers': ['www.example-dsp.com', 'buyer2.com', ...],
  'additionalBids':      [otherSourceAd1, otherSourceAd2, ...],
  'auctionSignals': {},
  'sellerSignals':  {},
  'perBuyerSignals': {
    'www.example-dsp.com': {},
    'www.another-buyer.com': {},
  },
};
const auctionResultPromise = navigator.runAdAuction(myAuctionConfig);
```

> This will cause the browser to execute the appropriate bidding and auction logic inside a collection of dedicated worklets associated with the buyer and seller domains.  The `auctionSignals`, `sellerSignals`, and `perBuyerSignals` values will be passed as arguments to the appropriate functions that run inside those worklets - the `auctionSignals` are made available to everyone, while the other signals are given only to one party.

これにより、ブラウザは Buyer と Seller のドメインに関連付けられた専用のワークレットのコレクションの中で、適切な入札とオークションのロジックを実行します。 `auctionSignals`, `sellerSignals`, `perBuyerSignals` の値は、これらのワークレット内で実行される適切な関数の引数として渡されます - `auctionSignals` は全員に公開されますが、他のシグナルは一方の当事者にのみ与えられます。

> The returned `auctionResultPromise` object is _opaque_: it is not possible for any code on the publisher page to inspect the winning ad or otherwise learn about its contents, but it can be passed to a Fenced Frame for rendering.  (The [Fenced Frame Opaque Source explainer](https://github.com/shivanigithub/fenced-frame/blob/master/OpaqueSrc.md) has initial thoughts about how this could be implemented.)  If the auction produces no winning ad, the return value can also be null, although this non-opaque return value leaks one bit of information to the surrounding page.  In this case, for example, the seller might choose to render a contextually-targeted ad.

返された `auctionResultPromise` オブジェクトは _opaque_ です: パブリッシャーページのどのコードも獲得した広告を検査したり、その内容を知ることはできませんが、レンダリングのために Fenced Frame に渡すことはできます。 ([Fenced Frame Opaque Source explainer](https://github.com/shivanigithub/fenced-frame/blob/master/OpaqueSrc.md) には、これをどのように実装するかについての初歩的な考えが書かれています)。 オークションで落札された広告がない場合は、戻り値を NULL にすることもできますが、この不透明な戻り値は周囲のページに 1 つの情報を漏らします。 この場合、例えば、 Seller はコンテクストをターゲットにした広告を表示することを選択するかもしれません。


#### 2.2 Auction Participants

> Each interest group the browser has joined and whose owner is in the list of `interestGroupBuyers` will have an opportunity to bid in the auction.  See the "Buyers Provide Ads and Bidding Functions" section, below, for how interest groups bid.

ブラウザが参加していて、オーナーが `interestGroupBuyers` のリストに入っている各インタレストグループには、オークションに入札する機会があります。 インタレストグループがどのように入札するかについては、後述の「購入者による広告の提供と入札機能」の項を参照してください。

> The seller may instead specify `'interestGroupBuyers': '*'` to permit all interest groups into the auction, and decide ad admissibility later in the process, based on criteria other than the interest group owner.  For example, a seller with an out-of-band creative review process might decide admissibility solely based on the creative, not the buyer.

Seller は、代わりに `'interestGroupBuyers': '*'` を指定して、すべてのインタレストグループをオークションに参加させ、広告の許可をプロセスの後半でインタレストグループのオーナー以外の基準に基づいて決定することができます。 例えば、帯域外のクリエイティブレビュープロセスを持つ Seller は、 Buyer ではなく、クリエイティブのみに基づいて許容性を決定することができます。

> The auction configuration's list of `additionalBids` is meant to allow a second way for ads to participate in this on-device auction.  More design work is needed to figure out how to support buyers' and sellers' needs in the multi-level decision-making use cases like those discussed in Issues [#59](https://github.com/WICG/turtledove/issues/59) or [#73](https://github.com/WICG/turtledove/issues/73) - a simple approach like putting one auction's `auctionResultPromise` into another auction's `additionalBids` is probably not sufficient.  This field may not be usable yet in the First Experiment stage, depending on how much new complexity it adds to the design.

オークション設定の `additionalBids` のリストは、広告がこのオンデバイスオークションに参加するための第 2 の方法を可能にすることを意図しています。 問題[#59](https://github.com/WICG/turtledove/issues/59)や[#73](https://github.com/WICG/turtledove/issues/73)で議論されているようなマルチレベルの意思決定のユースケースにおいて、 Buyer と Seller のニーズをどのようにサポートするかについては、さらなる設計作業が必要です。あるオークションの `auctionResultPromise` を別のオークションの `additionalBids` に入れるような単純なアプローチでは、おそらく十分ではありません。 このフィールドは、デザインにどれだけ新しい複雑さを加えるかによって、第一実験の段階ではまだ使えないかもしれません。


#### 2.3 Scoring Bids

> Once the bids are known, the seller runs code inside an _auction worklet_.  Within this worklet, the seller's auction script has an opportunity to consider each individual ad one at a time, with its associated bid and metadata, and then assign a numerical desirability score.  The seller's JS is loaded from the auction configuration's `decisionLogicUrl`, which must expose a `scoreAd()` function:

入札額が判明すると、 Seller はオークションワークレット内でコードを実行します。 このワークレット内で、 Seller のオークション スクリプトは、個々の広告を 1 つずつ検討し、関連する入札とメタデータを考慮して、望ましいスコアを数値で割り当てます。 Seller の JS は、オークション設定の `decisionLogicUrl` から読み込まれ、`scoreAd()` 関数を公開する必要があります。


```js
scoreAd(adMetadata,
        bid,
        auctionConfig,
        trustedScoringSignals,
        browserSignals) {
  ...
  return desirabilityScoreForThisAd;
}
```

> The function gets called once for each candidate ad in the auction.  The arguments to `scoreAd()` are:

この関数は、オークションの各候補広告に対して一度だけ呼び出されます。 `scoreAd()`の引数は以下の通りです。

> *   adMetadata: Arbitrary metadata provided by the buyer
> *   bid: A numerical bid value
> *   auctionConfig: the auction configuration object passed to navigator.runAdAuction()
> *   trustedScoringSignals: A value retrieved from a real-time trusted server chosen by the seller and reflecting the seller's opinion of this particular creative, as further described in [3.1 Fetching Real-Time Data from a Trusted Server](#31-fetching-real-time-data-from-a-trusted-server) below.  (In the case of [ads composed of multiple pieces](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces) this should instead be some collection of values, structure TBD.)
> *   browserSignals: an object constructed by the browser, containing information that the browser knows and which the seller's auction script might want to verify:

* adMetadata: Buyer が提供する任意のメタデータ
* bid: bid: 数値の入札値
* auctionConfig: navigator.runAdAuction()に渡されるオークション設定オブジェクト
* trustedScoringSignals: [3.1 Fetching Real-Time Data from a Trusted Server](#31-fetching-real-time-data-from-a-trusted-server)に記載されているように、 Seller が選んだリアルタイムの信頼できるサーバーから取得した値で、この特定のクリエイティブに対する Seller の意見を反映したものです。 ([複数のピースで構成された広告](https://github.com/WICG/turtledove/blob/main/FLEDGE.md#34-ads-composed-of-multiple-pieces)の場合、これは代わりに何らかの値の集まりであるべきで、構造は未定です。)
* browserSignals: ブラウザが構築するオブジェクトで、ブラウザが知っていて、 Seller のオークションスクリプトが確認したいと思う情報を含みます。


    ```js
    { 'topWindowHostname':   'www.example-publisher.com',
      'interestGroupOwner':  'www.example-dsp.com',
      'interestGroupName':   'womens-running-shoes',
      'adRenderFingerprint': 'M0rNy1D5RVowjnpa',
      'biddingDurationMsec': 12
    }
    ```

> The output of `scoreAd()` is a number indicating how desirable this ad is.  Any value that is zero or negative indicates that the ad cannot win the auction.  (This could be used, for example, to eliminate any interest-group-targeted ad that would not beat a contextually-targeted candidate.)   The winner of the auction is the ad object which was given the highest score.

`scoreAd()` の出力は、この広告がどれだけ望ましいかを示す数値です。 ゼロまたはマイナスの値は、その広告がオークションに勝てないことを示します。 (これは例えば、コンテクストをターゲットにした候補に勝てないインタレストグループをターゲットにした広告を排除するために使用することができます)。  オークションの勝者は、最も高いスコアを与えられた広告オブジェクトです。

> The logic in `scoreAd()` has access to the full auction configuration object, which means the seller can pass in arbitrary information from the publisher page.  In particular, the configuration object's `sellerSignals` field is exclusively for passing information into `scoreAd()`.  This can include information based on looking up publisher settings, based on making a contextual ad request, and so on.  Examples of logic that could live in this function include:

`scoreAd()` のロジックはオークション設定オブジェクト全体にアクセスできます。つまり、 Seller はパブリッシャーページから任意の情報を渡すことができます。 特に、設定オブジェクトの `sellerSignals` フィールドは `scoreAd()` に情報を渡すための専用フィールドです。 これには、パブリッシャーの設定を調べたときの情報や、コンテクスト広告のリクエストをしたときの情報などが含まれます。 この関数に格納されるロジックの例としては、以下のようなものがあります。

> *   Calculation of a publisher pay-out, based on the ad bid along with arbitrary seller data and arbitrary metadata included in the adObject.  This pay-out could influence both the ad's desirability and the post-auction reporting used for moving money around.
> *   Honoring publisher deals that promote certain ads over others irrespective of a per-page auction price.
> *   Disqualifying some ads, by returning a desirability score of 0 (which means the ad will not win).  This could, for example, be based on comparing ad metadata (e.g. advertiser or topic) to publisher site's rules for what ads are allowed to appear on the page, or based on the bidder being slow (as revealed by `biddingDurationMsec`).
> *   Checking whether the creative contents have been pre-approved by the seller.  This could be implemented by an out-of-band creative review process leading to the seller handing the buyer a cryptographically-signed token, which the buyer then includes in the ad's metadata.  See [TERN's Section 0](https://github.com/WICG/turtledove/blob/master/TERN.md#0-before-advertising-begins) for more discussion of this possibility.  The browser signals include an adRenderFingerprint value, which can be checked against a pre-approved fingerprint here as well.  (Eventually this fingerprint can be a hash of the ad web bundle, but while rendering still uses the network, it should just be a hash of the rendering URL.)

* 広告の入札額、任意の Seller のデータ、 adObject に含まれる任意のメタデータに基づいて、パブリッシャーの支払い額を計算する。 この支払額は、広告の魅力と、お金を動かすためのオークション後の報告の両方に影響を与える可能性があります。
* ページごとのオークション価格に関係なく、特定の広告を他の広告よりも促進するパブリッシャーの取引を尊重します。
* 望ましさのスコアを 0 にすることで、一部の広告を失格にする(広告が勝てないことを意味する)。 例えば、広告のメタデータ(広告主やトピックなど)とパブリッシャーサイトのルールとを比較したり、入札者のスピードが遅い(`biddingDurationMsec`で明らかになる)ことなどが考えられます。
* クリエイティブの内容が Seller によって事前に承認されているかどうかをチェックします。 これは、帯域外のクリエイティブレビュープロセスによって実装され、 Seller が Buyer に暗号署名されたトークンを渡し、 Buyer が広告のメタデータにそれを含めることができます。 この可能性については、[TERN のセクション 0](https://github.com/WICG/turtledove/blob/master/TERN.md#0-before-advertising-begins)を参照してください。 ブラウザのシグナルには adRenderFingerprint の値が含まれており、ここでも事前に承認されたフィンガープリントと照合することができます。 (最終的には、このフィンガープリントは広告のウェブバンドルのハッシュになりますが、レンダリングがまだネットワークを使用している間は、レンダリング URL のハッシュにすべきです)。

> Note that `scoreAd()` does not have any way to _store_ information for use later on a different page.  In particular, if the ad scoring logic on day 1 observes a bid from a particular interest group, and then on day 2 the browser interest group membership expires, there is no way for the ad scoring logic on day 3 to "remember" the pre-expiration membership information.

なお、`scoreAd()`には、後で別のページで使用するために情報を保存する方法がありません。 特に、 1 日目の広告採点ロジックが特定のインタレストグループからの入札を観測し、 2 日目にブラウザのインタレストグループのメンバーシップが期限切れになった場合、 3 日目の広告採点ロジックが期限切れ前のメンバーシップ情報を「記憶」する方法はありません。


### 3. Buyers Provide Ads and Bidding Functions (BYOS for now)

> Interest groups are used by their owners to bid in on-device auctions.  We refer to each party bidding in an auction as a _buyer_.  The buyer might be an advertiser who is also an interest group owner themselves, or a DSP who owns an interest group and acts on an advertiser's behalf.

インタレストグループは、所有者がデバイス上のオークションに入札するために使用されます。 ここでは、オークションに入札する各当事者を「Buyer」と呼びます。 Buyer は、インタレストグループのオーナーでもある広告主や、インタレストグループを所有し広告主の代理を務める DSP などが考えられます。

> Alternatively, the interest group owner might be a party whose responsibility is focused on building audiences and letting many different advertisers use them for targeting.  In this case, the owner of the interest group is still the buyer, for the purposes of the seller's on-device auction.  The interest group owner's choice of which advertiser's ad to display might be made via some server-side decision process, or might be made on a case-by-case basis on-device as part of the bidding process.

また、インタレストグループのオーナーは、オーディエンスを構築し、様々な広告主にそのオーディエンスを利用させてターゲティングを行うことを主な業務としている当事者である場合もあります。 この場合でも、 Seller のオンデバイスオークションでは、インタレストグループの所有者が Buyer となります。 インタレストグループのオーナーがどの広告主の広告を表示するかは、サーバー側の決定プロセスを介して行われる場合もあれば、デバイス上で入札プロセスの一部としてケースバイケースで行われる場合もあります。

> Buyers have three basic jobs in the on-device ad auction:

オンデバイスの広告オークションにおいて、 Buyer には 3 つの基本的な役割があります。

> 1. Buyers choose whether or not they want to participate in an auction.
> 2. Buyers pick a specific ad, and enter it in the auction along with a bid price and whatever metadata the seller expects.
> 3. Buyers perform reporting on the auction outcome.  All buyers have a mechanism for aggregate reporting.  _As a temporary mechanism_, the buyer who wins the auction has a way to do event-level reporting alongside their ad rendering; see the "Event-Level Reporting (for now)" section.

1. Buyer は、オークションに参加したいかどうかを選択する。
2. Buyer は、特定の広告を選び、入札価格と Seller が期待するあらゆるメタデータを添えてオークションに参加する。
3. Buyer は、オークションの結果を報告する。 すべての Buyer は、集計報告のためのメカニズムを持っています。 一時的な仕組みとして、オークションに落札した Buyer は、広告のレンダリングと同時にイベントレベルのレポーティングを行うことができます。「イベントレベルのレポーティング(今のところ)」のセクションをご覧ください。


#### 3.1 Fetching Real-Time Data from a Trusted Server

> Buyers may want to make on-device decisions that take into account real-time data (for example, the remaining budget of an ad campaign).  This need can be met using the interest group's `trustedBiddingSignalsUrl` and `trustedBiddingSignalsKeys` fields.  Once a seller initiates an on-device auction on a publisher page, the browser checks each participating interest group for these fields, and makes an uncredentialed (cookieless) HTTP fetch to a URL of the form:

Buyer は、リアルタイムのデータ(例えば、広告キャンペーンの残りの予算)を考慮して、デバイス上で意思決定を行いたい場合があります。 このようなニーズには、インタレストグループの `trustedBiddingSignalsUrl` と `trustedBiddingSignalsKeys` フィールドを使用して対応できます。 Seller がパブリッシャーページでデバイス上のオークションを開始すると、ブラウザは参加している各インタレストグループのこれらのフィールドをチェックし、信用されていない(cookieless)HTTP でフォームの URL にアクセスします。

    https://www.kv-server.example/getvalues?hostname=publisher.com&keys=key1,key2

> The base URL `https://www.kv-server.example/getvalues` comes from the interest group's `trustedBiddingSignalsUrl`, the hostname of the top-level webpage where the ad will appear `publisher.com` is provided by the browser, and `keys` is a list of `trustedBiddingSignalsKeys` strings, perhaps coalesced (for efficiency) across any number of interest groups that share a `trustedBiddingSignalsUrl`.  The response from the server should be a JSON object whose keys are key1, key2, etc., and whose values will be made available to the buyer's bidding functions (un-coalesced).

ベースとなる URL `https://www.kv-server.example/getvalues` はインタレストグループの `trustedBiddingSignalsUrl` から来ており、広告が表示されるトップレベルのウェブページのホスト名 `publisher.com` はブラウザから提供され、`keys` は `trustedBiddingSignalsKeys` の文字列のリストで、`trustedBiddingSignalsUrl` を共有する複数のインタレストグループの間で (効率的に) まとめられています。 サーバーからの応答は、キーが key1 、 key2 などの JSON オブジェクトで、その値は Buyer の入札関数で利用可能になります (統合されていません)。

> Similarly, sellers may want to fetch information about a specific creative, e.g. the results of some out-of-band ad scanning system.  This works in the same way, with the base URL coming from the `trustedScoringSignalsUrl` property of the seller's auction configuration object, and the keys being the `renderUrl` fields of all the ads in the `ads` fields of all interest groups in the auction.  The value associated with a `renderUrl` key is provided as the `trustedScoringSignals` parameter to the seller's `scoreAd()` function.

同様に、 Seller は特定のクリエイティブに関する情報を取得したい場合があります。例えば、帯域外の広告スキャンシステムの結果などです。 これも同様に、 Seller のオークション設定オブジェクトの `trustedScoringSignalsUrl` プロパティをベース URL とし、オークション内のすべてのインタレストグループの `ads` フィールド内のすべての広告の `renderUrl` フィールドをキーとします。 `renderUrl` キーに関連付けられた値は、 Seller の `scoreAd()` 関数の `trustedScoringSignals` パラメータとして提供されます。

> _As a temporary mechanism_ during the First Experiment timeframe, the buyer and seller can fetch these bidding signals from any server, including one they operate  themselves (a "Bring Your Own Server" model).  However, in the final version after the removal of third-party cookies, the request will only be sent to a trusted key-value-type server.  Because the server is trusted, there is no k-anonymity constraint on this request.  The browser needs to trust that the server's return value for each key will be based only on that key and the hostname, and that the server does no event-level logging and has no other side effects based on these requests.

第一次実験の期間中は、一時的なメカニズムとして、 Buyer と Seller は、自分で操作するサーバーを含め、任意のサーバーからこれらの入札シグナルを取得することができます(「Bring Your Own Server」モデル)。 しかし、サードパーティのクッキーを削除した後の最終バージョンでは、リクエストは信頼できるキーバリュー型のサーバーにのみ送信されます。 このサーバーは信頼されているため、このリクエストには k-匿名性の制約はありません。 ブラウザは、各キーに対するサーバの戻り値が、そのキーとホスト名のみに基づいており、サーバがイベントレベルのログを取らず、これらのリクエストに基づく他の副作用がないことを信頼する必要があります。


#### 3.2 On-Device Bidding

> Once the trusted bidding signals are fetched, each interest group's bidding function will run, inside a bidding worklet associated with the interest group owner's domain.  The buyer's JS is loaded from the interest group's `biddingLogicUrl`, which must expose a `generateBid()` function:

信頼できる入札シグナルが取得されると、各インタレストグループの入札機能が、インタレストグループのオーナーのドメインに関連付けられた入札ワークレット内で実行されます。 Buyer の JS は、インタレストグループの `biddingLogicUrl` から読み込まれ、`generateBid()` 関数を公開する必要があります。


```js
generateBid(interestGroup,
            auctionSignals,
            perBuyerSignals,
            trustedBiddingSignals,
            browserSignals) {
  ...
  return {'ad': adObject, 'bid': bidValue, 'render': renderUrl};
}
```

The arguments to `generateBid()` are:

> *   interestGroup: the interest group object, as saved during joinAdInterestGroup() and perhaps updated via the dailyUpdateUrl.
> *   auctionSignals: as provided by the seller in the call to runAdAuction().  This is the opportunity for the seller to provide information about the page context (ad size, publisher ID, etc), the type of auction (first-price vs second-price), and so on.
> *   perBuyerSignals: the value for _this specific buyer_ as taken from the auction config passed to runAdAuction().  This can include contextual signals about the page that come from the buyer's server, if the seller is an SSP which performs a real-time bidding call to buyer servers and pipes the response back, or if the publisher page contacts the buyer's server directly.  If so, the buyer may wish to check a cryptographic signature of those signals inside generateBid() as protection against tampering.
> *   trustedBiddingSignals: an object whose keys are the trustedBiddingSignalsKeys for the interest group, and whose values are those returned in the trustedBiddingSignals request.
> *   browserSignals:  an object constructed by the browser, containing information that the browser knows, and which the buyer's auction script might want to use or verify.  This can include information about both the context (e.g. the true hostname of the current page, which the seller could otherwise lie about) and about the interest group itself (e.g. times when it previously won the auction, to allow on-device frequency capping).

* これは、`joinAdInterestGroup()` で保存され、おそらく dailyUpdateUrl で更新されます。
* auctionSignals: `runAdAuction()` の呼び出しで Seller が提供するもの。 これは、 Seller がページのコンテキスト (広告サイズ、パブリッシャー ID など)、オークションのタイプ (ファーストプライス vs セカンドプライス) などの情報を提供する機会となります。
* perBuyerSignals: `runAdAuction()` に渡されたオークションコンフィグから取得された _this specific buyer_ の値です。 この値には、 Buyer のサーバーから送られてくるページのコンテキストシグナルが含まれます。 Seller が SSP で、 Buyer のサーバーにリアルタイムの入札コールを行い、レスポンスをパイプで返している場合や、パブリッシャーページが Buyer のサーバーに直接コンタクトしている場合などです。 このような場合、 Buyer は `generateBid()` 内でこれらのシグナルの暗号化された署名をチェックして、改ざんから保護することができます。
* trustedBiddingSignals: キーがインタレストグループの `trustedBiddingSignalsKeys` であり、値が `trustedBiddingSignals` リクエストで返されたものであるオブジェクトです。
* browserSignals: ブラウザが構築するオブジェクトで、ブラウザが知っていて、 Buyer のオークションスクリプトが使用または検証したいと思う情報を含みます。 これには、コンテキストに関する情報(例:現在のページの真のホスト名、 Seller が嘘をつく可能性がある)と、利益団体自体に関する情報(例:以前にオークションに勝った回数、オンデバイスの周波数上限設定を可能にするため)が含まれます。


    ```js
    { 'topWindowHostname': 'www.example-publisher.com',
      'seller':    'www.example-ssp.com',
      'joinCount': 3,
      'bidCount':  17,
      'prevWins':  [[time1,ad1],[time2,ad2],...],
    }
    ```

> The output of `generateBid()` contains three fields:

> *   ad: Arbitrary metadata about the ad which this interest group wants to show.  The seller uses this information in its auction and decision logic.
> *   bid: a numerical bid that will enter the auction.  The seller must be in a position to compare bids from different buyers, therefore bids must be in some seller-chosen unit (e.g. "USD per thousand").  If the bid is zero or negative, then this interest group will not participate in the seller's auction at all.  With this mechanism, the buyer can implement any advertiser rules for where their ads may or may not appear.
> *   render: A URL, or a list of URLs, which will be rendered to display the creative if this bid wins the auction.  (See "Ads Composed of Multiple Pieces" below.)

`generateBid()`の出力には 3 つのフィールドが含まれています。

* ad: このインタレストグループが表示を希望する広告に関する任意のメタデータ。 Seller は、この情報をオークションと決定ロジックで使用します。
* bid: オークションに参加するための数値入札。 Seller は、異なる Buyer からの入札を比較できる立場にいなければなりません。したがって、入札は Seller が選んだ単位(例:「USD per 1000」)でなければなりません。 入札額がゼロまたはマイナスの場合、その利益団体は Seller のオークションには一切参加しません。 この仕組みにより、 Buyer は、広告が表示される場所や表示されない場所について、任意の広告主のルールを実装することができます。
* レンダリング。この入札がオークションに勝った場合に、クリエイティブを表示するためにレンダリングされる URL または URL のリスト。 後述の「複数のピースで構成される広告」を参照)。


#### 3.3 Metadata with the Ad Bid

> The metadata accompanying the returned ad is not specified in this document, because sellers and buyers are free to establish whatever protocols they want here.

返送された広告に付随するメタデータは、本文書では規定されていません。なぜなら、 Seller と Buyer は、ここでどんなプロトコルを確立するかは自由だからです。

> Sellers can ask buyers to provide whatever information they feel is necessary for their ad scoring job.  Sellers have an opportunity to enforce requirements in their `scoreAd()` function, rejecting bids whose metadata they find lacking.

Seller は Buyer に対して、広告のスコアリング作業に必要だと思われる情報を提供するよう求めることができます。 Seller は、自分の `scoreAd()` 関数で要件を強制し、メタデータが不足していると判断した入札を拒否する機会があります。

> If `generateBid()` picks an ad whose rendering URL is not yet above the browser-enforced microtargeting prevention threshold, then the function will be called a second time, this time with a modified interestGroup argument that includes only the subset of the group's ads that are over threshold.  (The under-threshold ad will, however, be counted towards the microtargeting thresholding for future auctions for this and other users.)

`generateBid()`がレンダリング URL がブラウザで強制されたマイクロターゲティング防止の閾値をまだ超えていない広告を選択した場合、この関数は 2 回目に呼び出され、今度は閾値を超えているグループの広告のサブセットのみを含む修正された interestGroup 引数を使用します。 (ただし、しきい値未満の広告は、このユーザーや他のユーザーの今後のオークションでマイクロターゲティングのしきい値にカウントされます)。


#### 3.4 Ads Composed of Multiple Pieces

> The [Product-level TURTLEDOVE](https://github.com/WICG/turtledove/blob/master/PRODUCT_LEVEL.md) proposal describes a use case in which the rendered ad is composed of multiple pieces - a top-level ad template "container" which includes some slots that can be filled in with specific "products".  This is useful because the browser's microtargeting threshold can be applied to each individual component of the ad without compromising on tracking protections.

[Product-level TURTLEDOVE](https://github.com/WICG/turtledove/blob/master/PRODUCT_LEVEL.md)の提案では、レンダリングされた広告が複数のピースで構成されるユースケースを説明しています。トップレベルの広告テンプレート「コンテナ」には、特定の「商品」で埋められるいくつかのスロットが含まれています。 これは、ブラウザのマイクロターゲティングの閾値を、トラッキングの保護を損なうことなく、広告の個々の構成要素に適用できるので便利です。

> The output of `generateBid()` can use the on-device ad composition flow by returning a list of URLs as its render attribute.  The first item in the list should be the rendering URL for the container, and later items in the list should be rendering URLs for products which the container wraps, each of which will render inside its own nested Fenced Frame.  (This will require some extension of the mechanism described in the [Fenced Frame Opaque Source](https://github.com/shivanigithub/fenced-frame/blob/master/OpaqueSrc.md) doc, and maybe a flat list of URLs will turn out to be too simplistic here and we'll need more of a tree structure.  Further investigation is needed.)

`generateBid()`の出力は、 render 属性として URL のリストを返すことで、オンデバイスの広告構成フローを使用することができます。 リストの最初の項目はコンテナのレンダリング URL で、それ以降の項目はコンテナがラップする商品のレンダリング URL で、それぞれがネストした Fenced Frame 内でレンダリングされます。 (これには[Fenced Frame Opaque Source](https://github.com/shivanigithub/fenced-frame/blob/master/OpaqueSrc.md)doc で説明されているメカニズムの拡張が必要になります。また、 URL のフラットなリストはここでは単純すぎることが判明し、よりツリー構造が必要になるかもしれません。 さらなる調査が必要です)。

> If an interest group's creative is composed of multiple components, then the logic in `generateBid()` also has the responsibility of constructing the returned ad metadata, by appropriately combining the metadata of the various components included.

利害関係者のクリエイティブが複数のコンポーネントで構成されている場合、`generateBid()`のロジックは、含まれる様々なコンポーネントのメタデータを適切に組み合わせることで、返される広告メタデータを構築する責任もあります。


### 4. Browsers Render the Winning Ad

> The winning ad will be rendered in a [Fenced Frame](https://github.com/shivanigithub/fenced-frame): a mechanism under development for rendering a document in an embedded context which is unable to communicate with the surrounding page.  This communication blockage is necessary to meet the privacy goal that sites cannot learn about their visitors' ad interests.  (Note that the microtargeting prevention threshold alone is not enough to address this threat: the threshold prevents ads which could identify a single person, but it allows ads which identify a group of people that share a single interest.)

受賞した広告は、[Fenced Frame](https://github.com/shivanigithub/fenced-frame)でレンダリングされます。これは、周囲のページと通信できない埋め込み型のコンテキストでドキュメントをレンダリングするために開発中のメカニズムです。 この通信遮断は、サイトが訪問者の広告関心を知ることができないというプライバシー目標を満たすために必要です。 (マイクロターゲティング防止の閾値だけでは、この脅威に対処するのに十分ではありません。閾値では、 1 人を特定できる広告は防止できますが、 1 つの関心事を共有するグループを特定できる広告は許可されます)

> Fenced Frames are designed to be able to provide a second type of protection as well: they will not use the network to load any data from a server, instead only rendering content that was previously downloaded (e.g. as a Web Bundle).  This restriction is focused on preventing information leakage based on server-side joins via timing attacks.

フェンス付きフレームは、 2 つ目の保護機能も備えた設計になっています。ネットワークを使ってサーバーからデータを読み込むことはせず、あらかじめダウンロードされたコンテンツ(Web バンドルなど)のみをレンダリングするようになっています。 この制限は、タイミングアタックによるサーバーサイドジョインからの情報漏洩を防ぐことに重点を置いています。

> _As a temporary mechanism, we will still allow network access,_ rendering the winning ad in a Fenced Frame that is able to load resources from servers.

また、一時的な仕組みとして、ネットワークへのアクセスを許可し、受賞した広告を、サーバーからリソースを読み込むことができる Fenced Frame でレンダリングします。

> The TURTLEDOVE privacy goals mean that this cannot be the long-term solution.  Rendering ads from previously-downloaded web bundles, as originally proposed, is one way to mitigate this leakage.  Another possibility is ad rendering in which all network-loaded resources come from a trusted CDN that does not keep logs of the resources it serves.  As with servers involved in providing the trusted bidding signals, the privacy model and browser trust mechanism for such a CDN would require further work.

しかし、 TURTLEDOVE のプライバシーに関する目標を考えると、これは長期的な解決策にはなりません。 当初の提案のように、以前にダウンロードしたウェブバンドルから広告をレンダリングすることは、このリークを軽減する一つの方法です。 もうひとつの可能性は、ネットワーク上のすべてのリソースが、提供するリソースのログを保持していない信頼できる CDN から提供される広告レンダリングです。 信頼できる入札信号を提供するサーバーと同様に、このような CDN のプライバシーモデルとブラウザの信頼メカニズムについては、さらなる研究が必要です。


### 5. Event-Level Reporting (for now)

> Once the winning ad has rendered in its Fenced Frame, the seller and the winning buyer each have an opportunity to perform logging and reporting on the auction outcome.  The browser will call one reporting function in the seller's auction worklet and one in the winning buyer's bidding worklet.

落札された広告がフェンス付きフレームに表示されると、 Seller と落札者はそれぞれ、オークションの結果についてのログやレポートを行うことができます。 ブラウザは、 Seller のオークションワークレットと落札者の入札ワークレットでそれぞれ 1 つの報告関数を呼び出します。

> _As a temporary mechanism,_ these reporting functions will be able to send event-level reports to their servers.  These reports can include contextual information, and can include information about the winning interest group if it is over an anonymity threshold.  This reporting will happen synchronously, while the page with the ad is still open in the browser.

一時的な仕組みとして、これらのレポート機能はイベントレベルのレポートをサーバーに送信することができます。 これらのレポートにはコンテキスト情報が含まれ、匿名性の閾値を超えている場合には、勝利した利益団体に関する情報を含むことができます。 このレポートは、広告が掲載されているページがブラウザで開かれている間、同期的に行われます。

> In the long term, we need a mechanism to ensure that the after-the-fact reporting cannot be used to learn the advertising interest group of individual visitors to the publisher's site - the same privacy goal that led to Fenced Frame rendering.  Therefore event-level reporting is just a temporary model until an adequate trusted-server reporting framework is settled and in place.  (Once we have a trusted reporting mechanism, we can consider allowing the reports to be influenced by the interest group's userBiddingSignals.)

長期的には、事後報告がパブリッシャーのサイトを訪れた個々の訪問者の広告インタレストグループを知るために使用できないことを保証するメカニズムが必要です。これは、 Fenced Frame レンダリングにつながったのと同じプライバシー目標です。 したがって、イベントレベルのレポーティングは、適切な信頼できるサーバーレポーティングのフレームワークが確立され、実施されるまでの一時的なモデルに過ぎません。 (信頼できる報告の仕組みができたら、利益団体の userBiddingSignals の影響を受けた報告を可能にすることを検討することができます)。


#### 5.1 Seller Reporting on Render

> The seller's JS (i.e. the same script, loaded from `decisionLogicUrl`, that provided the `scoreAd()` function) can also expose a `reportResult()` function:

Seller の JS(すなわち、`scoreAd()`関数を提供した、`decisionLogicUrl`から読み込まれた同じスクリプト)は、`reportResult()`関数を公開することもできます。


```js
reportResult(auctionConfig, browserSignals) {
  ...
  return signalsForWinner;
}
```

The arguments to this function are:

*   auctionConfig: the auction configuration object passed to `navigator.runAdAuction()`
*   browserSignals: an object constructed by the browser, containing information it knows about what happened in the auction:

* auctionConfig: `navigator.runAdAuction()`に渡されるオークション設定オブジェクト
* browserSignals: ブラウザによって構築されたオブジェクトで、オークションで起こったことについて知っている情報を含みます。s


```js
{ 'topWindowHostname': 'www.example-publisher.com',
  'interestGroupOwner': 'www.example-dsp.com',
  'interestGroupName': 'womens-running-shoes',
  'renderUrl': 'https://cdn.com/url-of-winning-creative.wbn',
  'adRenderFingerprint': 'M0rNy1D5RVowjnpa',
  'bid:' bidValue,
  'desirability': desirabilityScoreForWinningAd,
}
```

> The browserSignals argument must be handled carefully to avoid tracking.  It certainly cannot include anything like the full list of interest groups, which would be too identifiable as a tracking signal.  The renderUrl can always be included since it has already passed a k-anonymity check, for example, but the winning interestGroupName will only be present if it has exceeded the threshold which gates daily updates.  Similarly, the browser may limit the precision of the bid and desirability values to avoid these numbers exfiltrating information from the interest group's userBiddingSignals.  On the upside, this set of signals can be expanded to include useful additional summary data about the wider range of bids that participated in the auction, e.g. the second-highest bid or the number of bids.

browserSignals の引数は、トラッキングを避けるために慎重に扱う必要があります。 確かに、インタレスト グループの完全なリストのようなものを含めることはできませんが、これではトラッキング シグナルとして識別できてしまいます。 たとえば、 renderUrl は k-anonymity チェックを通過しているため常に含めることができますが、落札した interestGroupName は、毎日の更新を促す閾値を超えた場合にのみ表示されます。 同様に、ブラウザは入札値と望ましさの値の精度を制限して、これらの数値がインタレストグループの userBiddingSignals から情報を流出させないようにすることができます。 逆に、このシグナルセットを拡張して、オークションに参加したより広い範囲の入札に関する有用な追加のサマリーデータ (例えば、 2 番目に高い入札や入札数) を含めることができます。

> The `reportResult()` function's reporting happens by calling browser-provided aggregate reporting APIs or, temporarily, directly calling network APIs.  The output of this function is not used for reporting, but rather as an input to the buyer's reporting function.

`reportResult()`関数のレポートは、ブラウザが提供する集計レポート API を呼び出したり、一時的にネットワーク API を直接呼び出したりして行われます。 この関数の出力はレポートには使用されず、 Buyer のレポート機能への入力として使用されます。


#### 5.2 Buyer Reporting on Render and Ad Events

> The buyer's JS (i.e. the same script, loaded from `biddingLogicUrl`, that provided the `generateBid()` function) can also expose a `reportWin()` function:

Buyer の JS(つまり、`generateBid()`関数を提供した、`biddingLogicUrl`から読み込まれた同じスクリプト)は、`reportWin()`関数を公開することもできます。


```js
reportWin(auctionSignals, perBuyerSignals, sellerSignals, browserSignals) {
  ...
}
```

> The arguments to this function are:

この関数の引数は次のとおりです。

> *   auctionSignals and perBuyerSignals: as in the call to `generateBid()` for the winning interest group.
> *   sellerSignals: The output of `reportResult()` above, giving the seller an opportunity to pass information to the buyer.
> *   browserSignals: Similar to the argument to `reportResult()` above, though without the seller's desirability score.  This could also include some buyer-specific signal like the second-highest bid from that particular buyer.

* auctionSignals と perBuyerSignals: 落札された利益団体に対する `generateBid()` の呼び出しと同じです。
* sellerSignals: 上記の `reportResult()` の出力で、 Seller が Buyer に情報を渡す機会を与えます。
* browserSignals: 上記の `reportResult()` の引数に似ていますが、 Seller の望ましさのスコアは含まれていません。 これには、特定の Buyer からの 2 番目に高い入札額など、 Buyer 固有のシグナルを含めることもできます。

> The `reportWin()` function's reporting happens by calling browser-provided aggregate reporting APIs or, temporarily, directly calling network APIs.

`reportWin()`関数のレポートは、ブラウザが提供する集計レポート API を呼び出したり、一時的にネットワーク API を直接呼び出したりして行われます。

> Ads often need to report on events that happen once the ad is rendered.  One common example is reporting on whether an ad became viewable on-screen.  We will need a communications channel to allow the publisher page or the Fenced Frame to pass such information into the worklet responsible for reporting.  Some additional design work is needed here.

広告では、広告が表示された後に発生するイベントをレポートする必要があることがよくあります。 一般的な例としては、広告が画面上で表示可能になったかどうかのレポートがあります。 パブリッシャーページや Fenced Frame がそのような情報をレポートを担当するワークレットに渡すことができるような通信チャネルが必要になります。 ここでは、いくつかの追加の設計作業が必要です。


#### 5.3 Losing Bidder Reporting

> We also need to provide a mechanism for the _losing_ bidders in the auction to learn aggregate outcomes.  Certainly they should be able to count the number of times they bid, and losing ads should also be able to learn (in aggregate) some seller-provided information about e.g. the auction clearing price.  Likewise, a reporting mechanism should be available to buyers who attempted to bid with a creative that had not yet reached the k-anonymity threshold.

また、オークションで負けた入札者が全体の結果を知るためのメカニズムを提供する必要があります。 確かに、落札者は入札回数を数えることができるはずです。また、落札した広告は、オークション清算価格など、 Seller が提供する情報を(集計して)知ることができるはずです。 同様に、まだ k-匿名性の閾値に達していないクリエイティブで入札しようとした Buyer に対しても、報告の仕組みを用意する必要があります。

> This could be handled by yet another `reportLoss()` function running in the worklet.  Alternatively, the model of [SPURFOWL](https://github.com/AdRoll/privacy/blob/main/SPURFOWL.md) (an append-only datastore and later aggregate log processing) could be a good fit for this use case.  The details here are yet to be determined.

これは、ワークレット内で実行される別の「`reportLoss()`」関数で処理できます。 また、[SPURFOWL](https://github.com/AdRoll/privacy/blob/main/SPURFOWL.md)のモデル(アペンドオンリーのデータストアと後のアグリゲートログ処理)もこのユースケースに適しているかもしれません。 ここでの詳細はまだ決まっていません。
