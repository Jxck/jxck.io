# [ie][browser] IE11 サポート終了の歴史

## Intro

IE11 が役目を終えていく流れを記録として残す。特に MS からのアナウンスや、それに準じた各サービスの反応、特に IE サポート終了アナウンスをまとめることで、IE11 というブラウザがどのように終了していったのかのを記録することを目的とする。

もともとは [Google Docs](https://docs.google.com/document/d/1XP58gVMyp_UCP4FFsf5ATpvRVwqi7v_EpEF3sl_Sobk/edit) にまとめていたものである。

- 日付はアナウンスの公開日
  - サポート終了日ではない
  - サポート終了日も書いておけばよかったけど今からやり直す気力はない、、
- **赤字** は MS 関連もしくはサポート終了の影響が大きそうなアナウンス
- Windows における IE11 自体のサポート終了については以下を参照
  - https://www.atmarkit.co.jp/ait/articles/1503/11/news134.html
- できればある程度の結論が出るまでこのエントリを更新していきたい


## 追加リクエスト

- 本エントリへの追加リクエストは以下から受け付けている。
  - https://docs.google.com/forms/d/1iL9rk1QEVAK1LeTO6MV26C1QACM-XYeuV9rhy1H7Wbo/edit


## 2018

- **2018/07/18: Internet Explorer の今後について - Japan IE Support Team Blog**
  - https://social.msdn.microsoft.com/Forums/ja-JP/47290e24-fc66-4d3e-a2de-429643758d40/internet-explorer-12398201702446012395123881235612390?forum=edgeiesupportteamja&fbclid=IwAR3D0Yw4FEqGFAaOL4eYiTNSXloWKzJLqaOgTNMP3Jdk6WaY3s5oPEuLajo
  - http://web.archive.org/web/20180718022957/https://blogs.technet.microsoft.com/jpieblog/2018/07/18/internet-explorer-support/
  - 「Windows 10 においては、Microsoft Edge と Internet Explorer というふたつのブラウザーが搭載されていますが、弊社としましては、Internet Explorer との後方互換性が必要な業務 Web システムには Internet Explorer を利用いただき、Internet Explorer でなければならない場合以外は Microsoft Edge をご利用いただくことを提案してきました。」
  - 「この考え方は今も基本的には変わりはありませんが、現在の Web アプリケーションが古いブラウザーである Internet Explorer 固有の機能に依存している状態であれば、そうした依存性を無くし、最新のブラウザーである Microsoft Edge で閲覧できるように見直していただくことを、今からご検討いただくようお伝えをしていくことが、私たちサポート チームの使命と考えています。」
  - 「Internet Explorer はいつまでサポートが提供されるのか?など、将来の予定についてお問い合せをいただいたとしても、大変恐縮ですが回答することはできません。ただ、世の中の大きな流れとして、Web ブラウザーという観点では相互運用性を保ちつつも、最新の Web 標準の技術を取り入れる方向性となっていることをご認識いただき、引き続き Legacy Web から Modern Web への移行を十分に余裕をもった計画で検討を進める必要があるということを、今回の記事をきかっけに改めて意識をしていただけますと幸いです。」
- 2018/11/26: Internet Explorer 11 のサポート終了のお知らせ - Zendesk ヘルプ
  - [https://support.zendesk.com/hc/ja/articles/360002084367-Internet-Explorer-11 のサポート終了のお知らせ](https://support.zendesk.com/hc/ja/articles/4408822547098-Internet-Explorer-11%E3%81%AE%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E7%B5%82%E4%BA%86%E3%81%AE%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B)


## 2019

- **2019/02/06: The perils of using Internet Explorer as your default browser - Microsoft Tech Community**
  - https://techcommunity.microsoft.com/t5/windows-it-pro-blog/the-perils-of-using-internet-explorer-as-your-default-browser/ba-p/331732
  - IE はかつて DOCTYPE の有無で quirks/standard mode をスイッチした
  - ただし今ほど単純な DOCTYPE ではなく正しく DTD を入れる必要があった
  - ドキュメントをちゃんと読み込まない多くの人には難しかった
  - その後 IE が多くの標準をサポートしていった
  - 古い standard mode 実装に依存して、互換が壊れる恐れがあった
  - Internet では IE8 Standard, Intra では IE7 Standard と使い分けた
  - Intra では古い標準で作らないといけなくなってしまい、これを断ち切る必要があった
  - 2014 IE11 でエンタープライズモードを入れる時、これを断ち切った
  - レガシーなサイトを見つける discovery 機能をリリースし、それらだけスイッチした
  - IE がこれをしないと、開発者は前に進めないから、これをやった
  - IE は Compatibility Solution で、これ以上新しい標準をサポートしない
  - 開発者も IE でのテストなんてしていない
  - もし過去のやりかたを続けていたら、新しく作ったものが動かない世界が続いてしまう
  - 我々がやりたいのは、漸進的な Web をサポートすることだ
  - **という記事を Engadget が英訳するとなぜか↓のようになる**
- 2019/02/09: マイクロソフト、企業に Internet Explorer の使用をやめるよう要請。「IE は技術的負債もたらす」 - Engadget 日本版
  - https://japanese.engadget.com/jp-2019-02-08-internet-explorer-ie.html
  - 上の記事の紹介
- 2019/02/26: マイクロソフトも使用やめるよう声明 国会で Internet Explorer 論争 - ライブドアニュース
  - http://web.archive.org/web/20190228192603/https://news.livedoor.com/article/detail/16079565/
- 2019/08/02: An update on disabling VBScript in Internet Explorer 11
  - https://blogs.windows.com/msedgedev/2019/08/02/update-disabling-vbscript-internet-explorer-windows-7-8/#AQoMz1kXuFvK6M6J.97
  - IE11 で VBScript 無効化のアナウンス
- 2019/11/01: 今後 LIG が制作する Web サイトは、Internet Explorer の対応をやめます。| 株式会社 LIG
  - https://liginc.co.jp/481562


## 2020

- **2020/01/16: 新たな年に新たなブラウザーを - 新しい Microsoft Edge はプレビューを終え、ダウンロード提供を開始 - Windows Blog for Japan**
  - https://blogs.windows.com/japan/2020/01/16/new-year-new-browser-the-new-microsoft-edge-is-out-of-preview-and-now-available-for-download/
  - Chromium ベースの Edge リリースアナウンス
  - (日本のみ確定申告を懸念し遅延した)
- 2020/01/16: Internet Explorer 11(IE11)のサポート終了について - board
  - https://the-board.jp/blogs/news_end_of_support_for_ie11
- **2020/01/19: Retiring Internet Explorer - text/plain**
  - https://textslashplain.com/2020/01/19/retiring-internet-explorer/
  - Eric Lawrence による回顧録と IE モードの話
- 2020/06/01: Zendesk Chat:Internet Explorer 11 のサポート終了のお知らせ - Zendesk ヘルプ
  - https://support.zendesk.com/hc/ja/articles/360048439353-Zendesk-Chat-Internet-Explorer-11%E3%81%AE%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E7%B5%82%E4%BA%86%E3%81%AE%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B
- 2020/06/16  Bootstrap 5 alpha! | Bootstrap Blog
  - https://blog.getbootstrap.com/2020/06/16/bootstrap-5-alpha/
- 2020/07/17: Backlog IE11 サポート終了のお知らせ | プロジェクト管理ツール Backlog
  - https://backlog.com/ja/product-updates/announcement/ie11-support-ends/
- 2020/08/13: Internet Explorer 11 サポート終了ならびに Microsoft Edge 更新についてのお知らせ - はてなブックマーク開発ブログ
  - https://bookmark.hatenastaff.com/entry/2020/08/13/111055
- **2020/08/17 Microsoft 365 apps say farewell to Internet Explorer 11 and Windows 10 sunsets Microsoft Edge Legacy - Microsoft Tech Community**
  - https://techcommunity.microsoft.com/t5/microsoft-365-blog/microsoft-365-apps-say-farewell-to-internet-explorer-11-and/ba-p/1591666
  - **2020/11/30 Microsoft Teams の IE11 サポート終了**
  - **2021/08/17 Microsoft 365 全アプリケーションで IE11 サポート終了**
- 2020/08/24: サントリーウェブサイト IE サポート終了のお知らせ お知らせ サントリー
  - https://www.suntory.co.jp/note/detail/200824_000095.html
- 2020/08/25: Internet Explorer 11 および Edge レガシのサポート終了について | ArcGIS ブログ
  - https://blog.esrij.com/2020/08/25/post-37271/
- 2020/09/04: ウェブサイト開発における IE11 サポート終了のお知らせ - 株式会社デジタルキューブ
  - https://www.digitalcube.jp/news/11416/
- 2020/10/16: Internet Explorer (IE) は使えますか? - よくある質問 | STORES
  - https://faq.stores.jp/hc/ja/articles/360049598591-Internet-Explorer-IE-%E3%81%AF%E4%BD%BF%E3%81%88%E3%81%BE%E3%81%99%E3%81%8B-
- 2020/10/21: Gyazo のサポートブラウザについての変更を実施しました - Gyazo Blog
  - https://blogja.gyazo.com/entry/2020/10/21/173000
- 2020/10/29: さくらインターネット 全サービスにおける Internet Explorer サポート終了のお知らせ | さくらインターネット
  - https://www.sakura.ad.jp/information/announcements/2020/10/29/1968205310/
- 2020/10/30: マガジン公式サイト Internet Explorer 非対応のお知らせ。- 週マガ公式サイト
  - https://shonenmagazine.com/info/entry/20201030oshirase
- 2020/11/16: Internet Explorer のサポート終了とその後の BASE の進化 - BASE プロダクトチームブログ
  - https://devblog.thebase.in/entry/ie-forever
- **2020/11/13: Moving users to Microsoft Edge from Internet Explorer - Microsoft Edge Development | Microsoft Docs**
  - https://docs.microsoft.com/en-us/microsoft-edge/web-platform/ie-to-microsoft-edge-redirection
  - **登録するとそのサイトへの IE からのアクセスを自動で Edge にリダイレクトする機能のアナウンス**
  - **そこへの登録履歴**
  - https://github.com/teppeis/history-of-ie-incompatible-sites-list
- 2020/12/01: Internet Explorer 11 サポート終了のお知らせ - kickflow
  - https://kickflow.com/news/20201201_ie11_support_end
- 2020/12/07: IE から Edge への転送を開始 | Web 品質 Blog | ミツエーリンクス
  - https://www.mitsue.co.jp/knowledge/blog/qc/202012/07_1601.html
- 2020/12/11: Internet Explorer サポート終了のお知らせ | mixhost ニュース
  - https://mixhost.jp/news/572
- 2020/12/11: Unlim サイトにおける IE11 サポート終了のお知らせ | Unlim [アンリム] - ファンがアスリートに想いを直接届けるスポーツギフティングサービス
  - https://unlim.team/news/2020/12/10/17


## 2021

- 2021/01/05: WArm+ Internet Explorer 11 サポート終了のお知らせ | インフォメーション | 株式会社システムリサーチ イリイソリューション部
  - https://www.ilii.jp/info/2021/20210105/
- **2021/01/13: Browser changes for your Seller Central experience - US Announcements - Amazon セラーフォーラム**
  - https://sellercentral.amazon.com/forums/t/browser-changes-for-your-seller-central-experience/768439
- 2021/01/19: レグ Web サイト IE サポート終了のお知らせ - お知らせ・トピックス - REG
  - https://www.reg.co.jp/news/archives/1711503.html
- 2021/01/22: 【重要】「ABEMA」 Internet Explorer 11 サポート終了のお知らせ
  - https://help.abema.tv/hc/ja/articles/360055647611
- 2021/02/09: Internet Explorer への対応終了のお知らせ | SmartHR|シェア No.1 のクラウド人事労務ソフト
  - https://smarthr.jp/other/22512
- 2021/02/12: Internet Explorer サポート終了のお知らせ | ハンドメイドマーケット minne
  - https://minne.com/infos/2215
- 2021/02/17: Internet Explorer 11 を推奨利用環境の対象外といたします | クラウドワークス お知らせブログ
  - https://blog.crowdworks.jp/?p=4293
- 2021/02/22: 全サービス Internet Explorer への対応終了のお知らせ:Information|スターティアラボ
  - https://www.startialab.co.jp/information/2021/02/22/656
- **2021/02/25: Google Workspace Updates: Reminder: Ending support for IE11 for all Google Workspace apps on March 15**
  - https://workspaceupdates.googleblog.com/2021/02/reminder-ending-support-for-ie11-for.html
- 2021/02/26: Internet Explorer サポート終了のお知らせ |マネーフォワード クラウド料金・契約
  - https://support.biz.moneyforward.com/valuepack/news/important/20210226.html
- 2021/03/04: Discussion: Dropping support for IE11 - Make WordPress Core
  - https://make.wordpress.org/core/2021/03/04/discussion-dropping-support-for-ie11/
  - IE11 でのアクセスはすでに 1% を下回っている
- 2021/03/05: 2021 年 4 月以降における Internet Explorer への対応について | ミツエーリンクス
  - https://www.mitsue.co.jp/news/20210305.html
- 2021/03/15: 全ての Google Workspace apps が IE11 をサポート終了
  - https://workspaceupdates.googleblog.com/2020/12/ending-support-for-ie11-for-all-google-workspace.html
  - https://support.google.com/a/answer/33864?hl=ja
- 2021/03/18: WebClass の Internet Explorer サポート終了(2021 年 7 月末)のお知らせ | WebClass R&D Team Blog
  - [https://webclass.jp/blog/2021/03/18/webclass の internet-explorer サポート終了(2021 年 7 月末)のお知らせ](https://webclass.jp/blog/2021/03/18/webclass%e3%81%aeinternet-explorer%e3%82%b5%e3%83%9d%e3%83%bc%e3%83%88%e7%b5%82%e4%ba%86%ef%bc%882021%e5%b9%b47%e6%9c%88%e6%9c%ab%ef%bc%89%e3%81%ae%e3%81%8a%e7%9f%a5%e3%82%89%e3%81%9b/)
- 2021/03/19: STUDIO サイトが Internet Explorer で閲覧できなくなります | STUDIO Blog
  - https://blog.studio.design/ja/posts/IE-support
- 2021/03/19: Internet Explorer 11 への消極的対応について - カーリルのブログ
  - https://blog.calil.jp/2021/03/ie11-deprecate-slowly.html
- 2021/03/22: Internet Explorer サポート終了のお知らせ | News | BRANU 株式会社 | 建設 DX プラットフォーム
  - https://branu.jp/news/page/210322/
- 2021/03/22:【重要】管理画面・サービスページでの Internet Explorer 11 サポート終了のご案内 - ホームページ作成・ホームページ制作サービス「グーペ」
  - https://goope.jp/info/information/?id=623
- 2021/03/23: Internet Explorer 11 が推奨利用環境の対象外となります | お知らせ
  - https://info.lancers.jp/25512
- 2021/03/25: Internet Explorer 対応終了のお知らせ|NINJA SIGN(忍者サイン)【公式】|note
  - https://note.com/ninjasign/n/nb579ba9d1b3a
- 2021/03/26: WordPress to Drop Support for IE11 in Upcoming 5.8 or 5.9 Release - WordPress Tavern
  - https://wptavern.com/wordpress-to-drop-support-for-ie11-in-upcoming-5-8-or-5-9-release
  - https://ja.wordpress.org/2021/05/19/dropping-support-for-internet-explorer-11/
- 2021/03/26: Internet Explorer 11 サポート終了に伴うバナー表示のお知らせ - HENNGE One ヘルプセンター
  - https://support.hdeone.com/hc/ja/articles/900006326923
- 2021/04/01:【重要なお知らせ】 Internet Explorer サポート終了について - goo blog スタッフブログ
  - https://blog.goo.ne.jp/staffblog/e/6f4121c97f4dbab4c5bb0018d1fba65e
- 2021/04/02: Internet Explorer サポート終了のお知らせ | キマ Room!(キマルーム)
  - https://intro.kimaroom.jp/news/news1385
- 2021/04/02: Vue3 IE11 Support | vuejs/rfcs
  - https://github.com/vuejs/rfcs/blob/master/active-rfcs/0038-vue3-ie11-support.md
- 2021/04/06:[重要なお知らせ]Internet Explorer 11 サポート終了のお知らせ - Hulu ヘルプセンター
  - https://help.hulu.jp/hc/ja/articles/900005502846
- 2021/04/12:【テレ東 BIZ Web サイト】 Internet Explorer サポート終了のお知らせ - テレ東 BIZ ヘルプセンター
  - https://help-txbiz.tv-tokyo.co.jp/hc/ja/articles/1500007334741
- 2021/04/14: Internet Explorer サポート終了のお知らせ | みらいマルシェ
  - https://www.miraimarche.com/press/news/20210414
- 2021/04/22: Internet Explorer11 およびデスクトップアプリのサポート終了のお知らせ | グループウェア アイポ
  - https://aipo.com/2021/04_22_123924/
- 2021/05/05: Bootstrap 5 | Bootstrap Blog
  - https://blog.getbootstrap.com/2021/05/05/bootstrap-5/
- 2021/05/13: Angular v12 is now available
  - https://blog.angular.io/angular-v12-is-now-available-32ed51fbfd49
- 2021/05/17: Internet Explorer 11 への対応終了のお知らせ - Mackerel お知らせ #mackerelio
  - [https://mackerel.io/ja/blog/entry/20210517#Internet-Explorer-11 への対応終了のお知らせ](https://mackerel.io/ja/blog/entry/20210517#Internet-Explorer-11への対応終了のお知らせ)


## Win10 の IE11 デスクトップサポート終了アナウンス

- **2021/05/19: Internet Explorer は Microsoft Edge へ - Windows 10 の Internet Explorer 11 デスクトップアプリは 2022 年 6 月 15 日にサポート終了 - Windows Blog for Japan**
  - https://blogs.windows.com/japan/2021/05/19/the-future-of-internet-explorer-on-windows-10-is-in-microsoft-edge
  - 「Internet Explorer 11 デスクトップ アプリケーションは 2022 年 6 月 15 日をもってサポートを終了いたします」
  - 2021/05/19: Internet Explorer デスクトップアプリ提供終了発表
  - 2021/08/17: Microsoft 365 及び他アプリでの IE サポート終了
  - 2022/06/15: Internet Explorer デスクトップアプリの提供終了
- 2021/05/19: 「Internet Explorer 11 デスクトップ アプリケーションのサポート終了」の発表に関連する FAQ - Windows Blog for Japan
  - https://blogs.windows.com/japan/2021/05/19/internet-explorer-11-desktop-app-retirement-faq/
- 2021/05/20: Internet Explorer から Microsoft Edge への移行ガイドライン | Japan Developer Support Internet Team Blog
  - https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/guidelines-for-migrating-from-ie-to-microsoft-edge/
- 2021/05/20: Internet Explorer 11 デスクトップ アプリのサポート終了へ! IE モードへの移行を進めましょう! | Japan Developer Support Internet Team Blog
  - https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/internet-explorer-app-end-of-support/
- 2021/05/20: Microsoft Edge 組み込みのサイト リスト マネージャーについて | Japan Developer Support Internet Team Blog
  - https://jpdsi.github.io/blog/internet-explorer-microsoft-edge/edge-ie-mode-site-list-manager/
- 2021/05/27: Internet Explorer: A Brief History - Ben Slivka
  - https://benslivka.com/2021/05/27/internet-explorer-a-brief-history/


## mozaic.fm ep 83 IE

- **mozaic.fm ep 83 IE**
  - https://mozaic.fm/episodes/83/ie.html
  - Microsoft の Yusuke さんをお呼びして、IE のたどってきた歴史を振り返り、これをどう Edge に置き換えていくのかという流れを踏まえながら、IE が Web に与えた歴史や、IE 以降の Web について議論した。
  - IE サポートアナウンスの詳細や、開発者はこれから何に取り組んでいくべきなのかという点も議論している。


## After Announce

- List of APIs that will be available due to IE termination
  - https://github.com/progfay/benefit-from-end-of-ie
  - IE が終了することで使えるようになる API 一覧
- 2021/06/15: 当社製品・サービスでの Internet Explorer 11 サポート終了について | サイボウズからのお知らせ
  - https://cs.cybozu.co.jp/2021/007430.html
- 2021/06/15: 2022 年 6 月「Internet Explorer」サポートが終了へ 〜 サポートが継続する他のブラウザへの切り替えを 〜 IPA 独立行政法人 情報処理推進機構
  - https://www.ipa.go.jp/security/anshin/mgdayori20210615.html
- 2021/06/23: Internet Explorer サポート終了のお知らせ - Chatwork
  - https://help.chatwork.com/hc/ja/articles/900007012223
- **2021/06/25: Windows 11 の仕様 - Microsoft**
  - https://www.microsoft.com/ja-jp/windows/windows-11-specifications
  - 「Internet Explorer は無効になります。」
  - 「従来の Internet Explorer ベースの Web サイトやアプリケーションに直接アクセスできる「Internet Explorer モード (IE モード) 」を搭載した Microsoft Edge をご利用ください。」
- 2021/07/13: Internet Explorer の対応を終了します - カクヨムからのお知らせ
  - https://kakuyomu.jp/info/entry/2021/07/13/125755
- 2021/07/20: Deprecation of Internet Explorer Support - The AMP Blog
  - https://blog.amp.dev/2021/07/20/deprecation-of-internet-explorer-support/
- 2021/08/04: Internet Explorer 11 サポート終了のお知らせ | ニコニコインフォ
  - https://blog.nicovideo.jp/niconews/155803.html
- 2021/08: Internet Explorer サポート終了のご案内 - 少年ジャンプ+α
  - https://shonenjumpplus.com/article/information_0818
- 2021/09/07: Yahoo! JAPAN の推奨ブラウザー
  - https://support.yahoo-net.jp/PccYjcommon/s/article/H000011350
- 2021/10/02: Google の検索結果
  - https://twitter.com/cramforce/status/1443962459723755533
- 2021/11/09: Internet Explorer のサポートを終了いたします - Qiita Blog
  - https://blog.qiita.com/end-ie11-support/
- 2021/11: クラウドサイン ヘルプセンター
  - https://help.cloudsign.jp/ja/articles/2570393-クラウドサインの推奨環境を教えてください
- 2022/01/31: 【重要なお知らせ:IE11 サポート終了について】 日経電子版ウェブサイト
  - https://twitter.com/webkanpr/status/1488070799286312962
- 2022/02/16: ヤフーの IE11 サポート終了の進め方 - Yahoo! JAPAN Tech Blog
  - https://techblog.yahoo.co.jp/entry/2022021630265506/


## After Expire

- 2022/06/15: Internet Explorer 11 has retired and is officially out of support -what you need to know | Windows Experience Blog
  - https://blogs.windows.com/windowsexperience/2022/06/15/internet-explorer-11-has-retired-and-is-officially-out-of-support-what-you-need-to-know/
- 2022/06/16: 「Internet Explorer」サポート終了も「IE モード」で"ゾンビ化" 本当の混乱は 7 年後? - ITmedia ビジネスオンライン
  - https://www.itmedia.co.jp/business/articles/2206/16/news102.html#utm_term=share_sp
- 2022/06/16: 「Internet Explorer」サポート終了に自治体「なんで急に」報道 Twitter で「さすがに草」などの声(ITmedia ビジネスオンライン) - Yahoo!ニュース
  - https://news.yahoo.co.jp/articles/51c133f4a6b7e3ff77d1e6b1de2ea8756271838e
- 2022/06/23: Internet Explorer のサポートが終了:今後も続く脅威とは? | WIRED.jp
  - https://wired.jp/article/internet-explorer-dead-security-risks/?utm_source=twitter&utm_medium=social
- 2022/07/01: さらば、Internet Explorer! | Vivaldi Browser
  - https://vivaldi.com/ja/blog/good-riddance-internet-explorer/


## IE 卒業式

- 2022/06/16: IE 卒業式 - connpass
  - https://web-study.connpass.com/event/250191/
  - https://www.youtube.com/watch?v=VWHJ06K9UwY
  - Internet Explorer は Microsoft Edge へ - IE の歩みとこれから - - Speaker Deck
    - https://speakerdeck.com/yuhara0928/internet-explorer-ha-microsoft-edge-he-ie-falsebu-mitokorekara
  - IE Graduation (IE の功績を讃える) - Speaker Deck
    - https://speakerdeck.com/jxck/ie-graduation
  - IE Graduation Certificate - Speaker Deck
    - https://speakerdeck.com/jxck/ie-graduation-certificate


## IE 廃止セット

- *Edge Customer Adoption Kit - Microsoft*
  - IE11 廃止セットや、メールテンプレなどを配布している
  - https://www.microsoft.com/ja-JP/download/details.aspx?id=102119