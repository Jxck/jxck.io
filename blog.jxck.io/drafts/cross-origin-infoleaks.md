# How do we Stop Spilling the Beans Across Origins? (A primer on web attacks via cross-origin information leaks and speculative execution)


## Intro

aaj@google.com, mkwst@google.com

Browsers do their best to enforce a hard security boundary on an origin-by-origin basis. To vastly oversimplify, applications hosted at distinct origins must not be able to read each other's data or take action on each other's behalf in the absence of explicit cooperation. Generally speaking, browsers have done a reasonably good job at this; bugs crop up from time to time, but they're well-understood to be bugs by browser vendors and developers, and they're addressed promptly.
ブラウザは、原点ごとに厳しいセキュリティ境界を強制するために最善を尽くしています。明らかに過度に単純化するために、明確な起源でホストされているアプリケーションは、明示的な協力がなければ、お互いのデータを読んでお互いの行動を取ることができません。一般的に言えば、ブラウザはこれでかなり合理的な仕事をしています。バグは時折切り詰められますが、ブラウザのベンダーや開発者のバグであることはよく理解されており、迅速に対応しています。

The web platform, however, is designed to encourage both cross-origin communication and inclusion. These design decisions weaken the borders that browsers place around origins, creating opportunities for side-channel attacks (pixel perfect, resource timing, etc.) and server-side confusion about the provenance of requests (CSRF, cross-site search).  Spectre and related attacks based on speculative execution make the problem worse by allowing attackers to read more memory than they're supposed to, which may contain sensitive cross-origin responses fetched by documents in the same process. Spectre is a powerful attack technique, but it should be seen as a (large) iterative improvement over the platform's existing side-channels.
しかし、ウェブプラットフォームは、起源とのコミュニケーションと包含を促進するように設計されています。これらの設計上の決定は、ブラウザーが原点を迂回して境界線を弱め、サイドチャネル攻撃(ピクセル完全性、リソースタイミングなど)、および要求の発生に関するサーバー側の混乱(CSRF 、クロスサイト検索)を作り出します。憶測や投機的実行に基づく関連攻撃は、攻撃者が想定していたよりも多くのメモリを読み取ることを可能にすることで問題を悪化させます。 Spectre は強力な攻撃手法ですが、プラットフォームの既存のサイドチャネルに対して(大規模な)反復的な改善と見なすべきです。

This document reviews the known classes of cross-origin information leakage, and uses this categorization to evaluate some of the mitigations that have recently been proposed ( CORB , From-Origin , Sec-Metadata / Sec-Site , SameSite cookies and Cross-Origin-Isolate ). We attempt to survey their applicability to each class of attack, and to evaluate developers' ability to deploy them properly in real-world applications. Ideally, we'll be able to settle on mitigation techniques which are both widely deployable, and broadly scoped.
このドキュメントでは、既知のクロスソース情報漏洩のクラスをレビューし、この分類を使用して最近提案された軽減策(CORB 、 From-Origin 、 Sec-Metadata / Sec-Site 、 SameSite Cookie 、 Cross-分離)。各クラスの攻撃に対する適用性を調査し、実際のアプリケーションに適切に展開する開発者の能力を評価しようとします。理想的には、広範に配備可能であり、広範囲に及ぶ緩和技術に取り組むことができます。


## Attacks

A significant contributor to the threat model of web applications is their large attack surface -- a malicious cross-origin attacker can force the browser of a logged-in user to make requests to any endpoint of an application to which she is authenticated. Applications generally cannot distinguish such requests from legitimate traffic initiated by the application itself, and therefore cannot reject them. Historically, this has led to the following classes of vulnerabilities:
Web アプリケーションの脅威モデルの重要な要因は、その攻撃面が大きくなることです。悪意のある相互起点の攻撃者は、ログインしているユーザーのブラウザに、認証されたアプリケーションの任意のエンドポイントに要求するよう強制できます。アプリケーションは、一般に、そのような要求をアプリケーション自体によって開始された正当なトラフィックから区別することができないため、それらを拒否することはできません。歴史的に、これにより以下のような種類の脆弱性が引き起こされています。



1.  Cross-site script inclusion (XSSI): Any script-like response to a GET request can be directly included as a `<script>` by a cross-origin attacker who knows the resource's URL. If that response includes authenticated information, the attacker can often extract it, usually either by observing environment changes caused by executing the script, or via reflection.
  - Current defenses: A common XSSI protection relies on setting a parser-breaking prefix ( )]}'\n) on script responses, fetching them with CORS, and evaluating their contents after stripping the prefix. Other alternatives include using POST requests, relying on unpredictable URLs, or setting a non-script MIME type with an accompanying X-Content-Type-Options: nosniff header.
2.  Cross-site request forgery (CSRF): One of the top client-side vulnerabilities on the web, CSRF stems from the fact that any application endpoint which responds to GET or POST requests and modifies server-side state may be directly requested by the attacker. As the browser automatically attaches cookies to cross-origin requests, the server cannot reliably tell them apart from legitimate requests sent by the application, resulting in the attacker's ability to execute actions on behalf of a logged-in victim.
  - Current defenses: CSRF is commonly prevented by requiring form submissions to carry a secret token verified by the server. However, developers need to remember to individually check for the presence of the correct token on all state-changing requests; omitting this check is a frequent source of vulnerabilities.
3.  Detecting the result of loading cross-origin resources: Browsers expose information about the success or failure of a resource load (e.g. for images or scripts), even for cross-origin fetches. In many applications certain resources are only available to a subset of users, allowing the presence of a load or error event to be used to determine the user's logged-in status or, in applications with fine grained ACLs, deanonymize the user.
  - Current defenses: No general, reliable solution exists for these attacks.
4.  Timing attacks based on response size or server processing time: The ability to send cross-origin GET and POST requests and accurately measure the response time lets attackers infer information about the response, even if they cannot view it directly. This enables damaging attacks such as cross-site search , based on exfiltrating secrets from applications with search functionality, and often reveals other application-specific traits.
  - Current defenses: There is no robust protection against this class of attacks.  Applications may apply CSRF-like protections to sensitive endpoints, or require the presence of a special request header for APIs requested by same-origin endpoints; however, this may not be feasible in applications which allow users to bookmark or share URLs.
5.  Pixel-perfect timing attacks to extract the contents of renderable resources: An attacker who can display a cross-origin resource (a document or image) in a window they control can learn the color values of its individual pixels. Attacks rely on setting up CSS rules and SVG filters to introduce substantial timing differences during rendering based on the color of a chosen pixel; detecting the color is then achieved by inspecting the embedding window's rendering performance using client-side APIs such as requestAnimationFrame.
  - Current defenses: X-Frame-Options prevents resources from being embedded in an iframe, allowing developers to protect document formats (HTML, plaintext, natively rendered PDFs) from this class of attacks. No defense currently exists for images.
6.  Polyglot-based data exfiltration: Due to lax parsing rules for some resource types, such as stylesheets or plugin formats, attackers may exfiltrate data from server responses which include (properly escaped) user-controlled contents, or in some cases achieve script execution in the context of the hosting origin. Examples of past attacks include CSS-based data stealing , Comma Chameleon and Rosetta Flash .
  - Current defenses: Some attacks have already been mitigated by browsers and plugins by performing stricter MIME type checking, e.g. when loading cross-origin CSS. Other mitigations rely on developers removing plugin-dependent patterns which allow for content sniffing (e.g. HTML-escaping data in non-HTML responses, or adding static, application-controlled prefixes to certain response types).
7.  Attacks based on framing: This large class of issues includes common problems such as clickjacking , which allows attackers to force the user to interact with cross-origin frames, and several more esoteric threats. For example, an attacker who controls an iframe loaded on a high-value page may be able to exfiltrate text by adjusting scrollbar width to induce DOM reflow and detecting how this affects the position of their inner iframe.
  - Current defenses: X-Frame-Options or CSP frame-ancestors.
8.  Spectre: Speculative execution features in modern CPUs may allow attackers to read the contents of process memory by performing timing attacks from JavaScript. Even if a browser implements process isolation, an attacker can force the loading of cross-origin responses into a process executing the attacker's scripts (e.g. by including them as an `<img>` or `<script>`), and then use speculative side-channel attacks to extract their contents.
  - Current defenses: Partial mitigations available to developers are listed here , but they do not cover all scenarios susceptible to attacks (details below).



1. クロスサイトスクリプトインクルード(XSSI): GET リクエストに対するスクリプトに似たレスポンス`<script>`は、リソースの URL を知っているクロス起点の攻撃者によって直接的にインクルードされます。その応答に認証された情報が含まれている場合、攻撃者は通常、スクリプトの実行によって引き起こされた環境の変化を観察することによって、または反映を介して、その情報を抽出することができます。
  - 現在の防御: 一般的な XSSI の保護は、スクリプトレスポンスに対してパーサー破りプレフィックス()を設定し、 CORS でそれらをフェッチし、プレフィックスを取り除いた後でその内容を評価することに依存しています。他の代替方法には、 POST 要求の使用、予測不可能な URL の依存、または添付の X  -Content  -Type  -Options: nosniff ヘッダーを使用した非スクリプト MIME タイプの設定が含まれます。
2. クロスサイトリクエスト偽造(CSRF): Web 上のクライアント側の脆弱性の 1 つである CSRF は、 GET または POST リクエストに応答し、サーバー側の状態を変更するアプリケーションエンドポイントが攻撃者によって直接要求される可能性がある。ブラウザが原点を越えたリクエストにクッキーを自動的に添付するので、サーバーはアプリケーションから送信された正当なリクエストとは別に確実にその旨を伝えることができず、攻撃者はログインした犠牲者の代わりにアクションを実行することができます。
  - 現在の防御: CSRF は、サーバーによって検証された秘密のトークンを運ぶためにフォーム提出を要求することによって、一般的に防止されます。ただし、開発者は、すべての状態変更要求に対して正しいトークンが存在するかどうかを個別にチェックする必要があります。このチェックを省略すると、脆弱性が頻繁に発生します。
3. クロスオリジンリソースのロード結果の検出: ブラウザは、原点を越えたフェッチの場合でも、リソース負荷の成功または失敗(たとえば、イメージまたはスクリプト)の情報を公開します。多くのアプリケーションでは、特定のリソースはユーザーのサブセットのみが使用でき、ロードまたはエラーイベントの存在を使用してユーザーのログイン状態を確認したり、細かい ACL を持つアプリケーションではユーザーを匿名化できます。
  - 現在の防御: これらの攻撃には一般的で信頼できる解決策はありません。
4. 応答サイズまたはサーバー処理時間に基づくタイミング攻撃: 原点を越えた GET および POST 要求を送信し、応答時間を正確に測定する機能により、攻撃者は応答を直接見ることができなくても応答に関する情報を推測できます。これにより、検索機能を備えたアプリケーションからの機密情報の漏えいに基づいて、クロスサイト検索などの有害な攻撃が可能になり、他のアプリケーション固有の特徴が明らかになります。
  - 現在の防御: このクラスの攻撃に対して強力な防御はありません。アプリケーションは、 CSRF のような保護を重要なエンドポイントに適用したり、同じ起点のエンドポイントによって要求された API に特別な要求ヘッダーが存在することを要求することがあります。ただし、ユーザーが URL をブックマークまたは共有できるアプリケーションでは、これは実現不可能なことがあります。
5. レンダリング可能なリソースのコンテンツを抽出するためのピクセル完全タイミング攻撃: 制御元のウィンドウにクロスオリジンリソース(ドキュメントまたはイメージ)を表示できる攻撃者は、個々のピクセルのカラー値を知ることができます。攻撃は、選択したピクセルの色に基づいてレンダリング時に大きなタイミング差を導入するために、 CSS ルールと SVG フィルタの設定に依存します。 requestAnimationFrame などのクライアント側 API を使用して埋め込みウィンドウのレンダリングパフォーマンスを検査することによって、色を検出します。
  - 現在の防御: X  -Frame  -Options は、リソースが iframe に埋め込まれるのを防ぎ、開発者がこのクラスの攻撃から文書フォーマット(HTML 、プレーンテキスト、ネイティブにレンダリングされた PDF)を保護できるようにします。現在のところ、画像に対する防御は存在しない。
6. Polyglot ベースのデータエクスポレーション: スタイルシートやプラグイン形式などの一部のリソースタイプの緩やかな解析ルールのため、攻撃者は(適切にエスケープされた)ユーザーコントロールコンテンツを含むサーバーレスポンスからデータを抽出したり、ホスティング元のコンテキスト 過去の攻撃の例には、 CSS ベースのデータスチール、 Comma Chameleon 、 Rosetta Flash などがあります。
  - 現在の防御: ブラウザやプラグインでは、クロスソース CSS の読み込みなど、より厳密な MIME タイプのチェックを実行することで、いくつかの攻撃が既に緩和されています。他の緩和策は、コンテンツのスニッフィング(HTML 以外のレスポンスでの HTML エスケープデータや、特定のレスポンスタイプへの静的なアプリケーション制御プレフィックスの追加など)を可能にするプラグイン依存のパターンを削除する開発者に依存しています。
7. フレーミングに基づく攻撃: この大きなクラスの問題には、攻撃者がユーザーにクロスオリジンフレームやいくつかのより難解な脅威と対話するように強制するクリックジャッキなどの一般的な問題があります。たとえば、値の大きいページに読み込まれた iframe を制御する攻撃者は、スクロールバーの幅を調整して DOM リフローを誘導し、内部 iframe の位置にどのように影響するかを検出することで、テキストを抽出できます。
  - 現在の防御: X フレームオプションまたは CSP フレーム先祖。
8. Spectre: 現代の CPU の投機的な実行機能により、攻撃者は JavaScript からタイミング攻撃を実行してプロセスメモリの内容を読み取ることができます。ブラウザがプロセス分離を実装していても、攻撃者はクロス・オリジン・レスポンスのロードを攻撃者のスクリプトを実行するプロセスに強制的に(例えば、それらを`<img>`or として含めることによって`<script>`)行い、投機的なサイド・チャネル攻撃を使用してその内容を抽出することができます。
  - 現在の防御: 開発者が利用できる部分緩和はここにリストされていますが、攻撃の影響を受けやすいすべてのシナリオ(詳細は後述)には該当しません。



The attacks outlined above rely on the ability to force the loading of cross-origin resources in a context which allows the attacker to extract some information about them, in spite of the usual same-origin policy restrictions. One separate, but conceptually related class of web information leaks is based on direct DOM access , where the long-standing ability to directly access certain properties of the Window object of cross-origin documents (e.g. enumerate window.frames) may allow attackers to infer sensitive information about application state. As with several other issues, there are currently no reliable defenses against this class of attacks.
上で概説した攻撃は、通常の同じ起源のポリシーの制限にもかかわらず、攻撃元がいくつかの情報を抽出することを可能にする文脈の中で起源を越えたリソースの読み込みを強制する能力に依存します。別個であるが概念的に関連した Web 情報漏洩のクラスは直接的な DOM アクセスに基づくものであり、クロスオリジン文書の Window オブジェクトの特定のプロパティ(例えば列挙ウィンドウ。フレーム)に直接アクセスする長年の能力により、攻撃者は、アプリケーションの状態に関する機密情報。他のいくつかの問題と同様に、現在のところ、このクラスの攻撃に対する信頼できる防御はありません。

Importantly, these categories of vulnerabilities (in particular, CSRF and XSSI) account for a sizeable fraction of security issues discovered in modern web applications. Conversely, framing-based attacks such clickjacking have largely been successfully mitigated by more narrowly-scoped protections via X-Frame-Options and frame-ancestors in CSP -- a compelling example of the security value of allowing applications to restrict certain types of unwanted cross-origin interactions.
重要なことに、これらのカテゴリの脆弱性(特に CSRF と XSSI)は、最新の Web アプリケーションで発見されたセキュリティ問題のかなりの部分を占めています。逆に、クリックジャックなどのフレームベース攻撃は、 X-Frame-Options や CSP のフレーム先祖などの狭い範囲の保護によって大幅に軽減されています。これは、アプリケーションが特定のタイプの不要なクロス-origin 相互作用。

It's worth noting that most browsers' third-party cookie blocking mechanisms may be a robust protection against leaking sensitive data from signed-in users, but only insofar as they actually prevent credentials from being delivered to an interesting site. Since interesting sites are often those with which the user regularly interacts, they're unfortunately likely to be carved out from protections either manually or automatically.
ほとんどのブラウザのサードパーティの Cookie ブロックメカニズムは、ログインしたユーザーから機密データを漏洩することを堅牢に防ぎますが、実際には資格情報が興味のあるサイトに配信されないようにする必要があります。興味深いサイトは、通常、ユーザーが定期的にやりとりするサイトであるため、手動または自動で保護されている可能性があります。

Having discussed the threats, let's now move on to a quick review of proposed defenses.
脅威について議論したところで、提案された防御の迅速な検討に移りましょう。



## Protections

A number of approaches have been proposed to mitigate the risks posed by one or more of the threats described above, by preventing sensitive resources from loading into a context to which an attacker has access. Here, we'll walk through some of the more interesting mechanisms:
機密リソースが攻撃者がアクセスできるコンテキストにロードされないようにすることで、上記の 1 つ以上の脅威によって引き起こされるリスクを軽減するためのアプローチがいくつか提案されています。ここでは、より興味深いメカニズムのいくつかについて説明します。


## Cross-Origin Read Blocking ( explainer )  [ Lukasz Anforowicz (Google), Charlie Reis (Google)]

CORB prevents cross-origin resource loads for several types of responses (primarily, HTML and JSON, which cannot be legitimately loaded as resources) to keep them out of untrusted execution contexts. In browsers with process-based isolation it can prevent passing data from protected responses to untrusted renderer processes running attacker-controlled scripts, mitigating speculative side-channel attacks on CORB-eligible resources. It is currently the only Spectre protection which is likely to be enabled by default in user agents.
CORB は、信頼できない実行コンテキストからそれらを保護するために、いくつかのタイプの応答(主に、リソースとして正当にロードできない HTML および JSON)に対するクロスオリジンリソースのロードを防ぎます。プロセスベースの分離機能を備えたブラウザでは、保護されたレスポンスのデータを攻撃者が制御するスクリプトを実行する信頼できないレンダラプロセスに渡すことを防ぎ、 CORB 適格リソースに対する投機的なサイドチャネル攻撃を軽減できます。これは現在、ユーザーエージェントでデフォルトで有効になっている可能性が高い唯一の Spectre の保護です。

Pros: Enabled by default, without requiring application changes -- "free" Spectre mitigation for non-embeddable MIME types which commonly include authenticated data.
長所: アプリケーションの変更を必要とせずに、デフォルトで有効になります - 一般に認証されたデータを含む埋め込み不可能な MIME タイプに対する "フリー" Spectre 軽減。

Cons: For compatibility reasons, doesn't protect all resources (e.g. anything other than HTML, XML or JSON), leaving room for attacks on images, JavaScript responses, file downloads and other MIME types. Focuses on Spectre, without mitigating other cross-origin attack types, e.g. timings or CSRF.
短所: 互換性の理由から、 HTML 、 XML 、 JSON 以外のすべてのリソースを保護するわけではないため、画像、 JavaScript レスポンス、ファイルダウンロード、その他の MIME タイプへの攻撃の余地が残ります。他のクロスオリジンの攻撃タイプ(タイミングや CSRF など)を軽減することなく、 Spectre に焦点を当てます。


|      | XSSI | CSRF | Load detection | Timing | Pixel perfect | Spectre | Direct DOM |
|------|------|------|----------------|--------|---------------|---------|------------|
| CORB | o    | x    | x              | x      | x             | o       | x          |



### From-Origin ( discussion , spec )  [Authors: Anne van Kesteren (Mozilla), John Wilander (Apple)]

From-Origin is an HTTP response header served on resource requests, controlling which origins are allowed to embed a given resource. It's analogous to X-Frame-Options, but applies to all kinds of responses (scripts, stylesheets, images), preventing them from being exposed to a cross-origin page.
From-Origin は、リソース要求に提供される HTTP 応答ヘッダーであり、特定のリソースを埋め込むことを許可するオリジンを制御します。これは X-Frame-Options に似ていますが、すべての種類の応答(スクリプト、スタイルシート、画像)に適用され、クロスオリジンページにさらされないようにします。

Pros: Simple to use; especially in self-contained applications with no cross-origin dependencies it may be easily adopted by setting the header on all responses. The presence of a response header provides an explicit signal to the browser that the origin may wish to opt into process isolation.
長所: 使いやすい。特に、クロスオリジン依存関係のない自己完結型アプリケーションでは、すべての応答にヘッダーを設定することで容易に採用することができます。応答ヘッダーが存在すると、ブラウザに、プロセスの分離を選択することを希望する明示的な信号が提供されます。

Cons: More difficult to adopt in applications with resources requested by cross-origin documents (requires enumeration of all trusted origins in the response header). Does not affect server-side processing of requests, which leaves them open to CSRF and most side-channel attacks.
短所: クロスオリジン文書で要求されたリソースを持つアプリケーションで採用するのが難しい(応答ヘッダー内のすべての信頼できる起点の列挙が必要)。要求のサーバー側の処理には影響しません。そのため、 CSRF や大部分のサイドチャネル攻撃に開放されます。


|                     | XSSI | CSRF | Load detection | Timing | Pixel perfect | Spectre | Direct DOM |
|---------------------|------|------|----------------|--------|---------------|---------|------------|
| From-Origin(+X-F-O) | o    | x    | o              | x      | o             | o       | x          |



### Sec-Metadata / Sec-Site ( discussion )  [Authors: Artur Janc (Google), Mike West (Google)]

The proposed Sec-Metadata HTTP request header indicates the provenance of a resource request (same-origin, same-site or cross-site, potentially with more granularity) to allow the server to make decisions based on the sender of the request and/or its destination . This enables servers to quickly reject unexpected resource requests and allows for more flexible server-side authorization logic.
提案された Sec-Metadata HTTP 要求ヘッダーは、要求の送信者に基づいてサーバーが決定を下すことを可能にするリソース要求(同じ起点、同じサイトまたはクロスサイト、潜在的により細かい単位)の出所を示します。その目的地。これにより、サーバーは予期せぬリソース要求を迅速に拒否し、より柔軟なサーバー側の承認ロジックを可能にします。

Pros: Protects against most cross-origin attacks by letting the server refuse to process requests sent by untrusted senders. Can be adopted in applications with complex cross-origin dependencies; facilitates deployment by allowing developers to review origins requesting their resources before enforcing any restrictions.
長所: 信頼できない送信者によって送信された要求をサーバーが処理するのを拒否することによって、多くのクロスオリジン攻撃を防ぎます。複雑なクロス・オリジン依存関係を持つアプリケーションに採用することができます。開発者が制限を実施する前にリソースを要求している原点を確認できるようにすることで、展開を容易にします。

Cons: More work to adopt by requiring server-side code changes. Doesn't provide user agents with an explicit signal that the application wants to opt into process isolation.
短所: サーバー側のコード変更を要求することで採用する作業が増えます。ユーザーエージェントに、アプリケーションがプロセス分離を選択することを明示する明示的なシグナルを提供しません。


|                | XSSI | CSRF | Load detection | Timing | Pixel perfect | Spectre | Direct DOM |
|----------------|------|------|----------------|--------|---------------|---------|------------|
| Sec-Metadata   | o    | o    | o              | o      | o             | o       | x          |



### SameSite cookies ( spec )  [Author: Mark Goodwin (Mozilla), Mike West (Google)]

The most mature feature which allows the limiting of cross-origin interactions. SameSite cookies do not directly prevent attackers from loading cross-origin resources, but they cause such requests to be sent without credentials, rendering the responses of little value to the attacker.
クロスオリジン相互作用の制限を可能にする最も成熟した特徴。 SameSite クッキーは、攻撃元が原点を越えたリソースをロードすることを直接防御するものではありませんが、そのような要求が資格情報なしで送信されるため、攻撃者にはあまり価値のない応答がレンダリングされます。

Pros: Protects against most cross-origin attacks. Setting the SameSite attribute on cookies is a small, self-contained change.
利点: ほとんどのクロスオリジン攻撃から保護します。クッキーに SameSite 属性を設定することは、小さな自己完結型の変更です。

Cons: SameSite cookies have proven difficult to adopt in existing applications, as they miss flexibility to allow some resources to be requested across origins; an origin using a SameSite cookie for authentication will not be able to provide authenticated APIs, and will break common framing scenarios. Requires " strict " mode to robustly defend against CSRF, leading to top-level navigations being sent without cookies, which is incompatible with some applications.
短所: SameSite Cookie は、既存のアプリケーションで採用することが困難であることが証明されています。認証のために SameSite クッキーを使用する起源は認証された API を提供することができず、共通フレーミングシナリオを破ります。 CSRF に対して堅固に防御するために「厳密な」モードが必要であり、トップレベルのナビゲーションがクッキーなしで送信され、一部のアプリケーションと互換性がありません。


|                  | XSSI | CSRF | Load detection | Timing | Pixel perfect | Spectre | Direct DOM |
|------------------|------|------|----------------|--------|---------------|---------|------------|
| SameSite Cookies | o    | o    | o              | o      | o             | o       | x          |



### Cross-Origin-Isolate ( proposal )  [Author: Ryosuke Niwa (Apple)]

While other proposals attempt to prevent an attacker-controlled context from learning the contents of responses, they do not restrict the attacker's ability to directly interact with the DOM of cross-origin windows. To help implement Spectre protections in browsers without out-of-process
他の提案では、攻撃者が制御するコンテキストが応答の内容を学習することを防ぎますが、攻撃元がクロスオリジンウィンドウの DOM と直接対話する能力を制限しません。アウトオブプロセスなしでブラウザで Spectre の保護を実装する方法

Pros: Preventing direct DOM access by cross-origin windows protects from attacks based on frame counting and navigation of the window to an attacker-controlled destination ("tabnabbing"). It can serve as a signal that the application wants to opt into the brower's process-based isolation.
利点: クロスオリジンウィンドウによる直接的な DOM アクセスの防止は、フレームのカウントと攻撃者が制御する宛先へのウィンドウのナビゲーション(「タブナブ」)に基づく攻撃から保護します。これは、アプリケーションがブラウザーのプロセスベースの分離を選択したいというシグナルとして役立ちます。

Cons: May complement other mechanisms, but by itself does not offer substantial protection against information leaks.
短所: 他のメカニズムを補完する可能性はありますが、それだけでは情報漏えいに対する実質的な保護はありません。

|                      | XSSI | CSRF | Load detection | Timing | Pixel perfect | Spectre | Direct DOM |
|----------------------|------|------|----------------|--------|---------------|---------|------------|
| Cross-Origin-Isolate | x    | x    | x              | ~      | x             | ~       | o          |



### Historical note: Earlier isolation proposals

Similar concerns motivated several past proposals, including Entry Point Regulation and Isolate-Me -- ambitious attempts to lock down the attack surface of sensitive applications against cross-origin attacks. However, arguably due to the large scope and complexity of both proposals, they have not gained significant traction.
同様の懸念は、 Entry Point Regulation や Cross-Origin 攻撃に対する機密性の高いアプリケーションの攻撃面をロックアウトしようとする野心的な試みなど、過去のいくつかの提案を動機づけました。しかし、おそらく両方の提案の大きな範囲と複雑さに起因して、彼らは大きな牽引力を得ていない。

Allowing windows to protect themselves from direct cross-origin DOM access was proposed as part of disown-opener in CSP3 ( discussion ).
ウィンドウが直接のクロスオリジン DOM アクセスから自分自身を守ることを可能にすることは、 CSP3(ディスカッション)のディスオープンオープナーの一環として提案されました。


## Summary

While concerns about Spectre are a direct motivation for the mechanisms discussed above, we propose that it is critical to consider the broader problem of cross-origin information leaks and design defenses for this more general class of attacks. This is especially important for any opt-in protections whose value depends on adoption by application developers, for two reasons:

Specter に関する懸念は、上記のメカニズムの直接的な動機であるが、我々はより一般的な種類の攻撃に対するクロスオリジンの情報漏洩と設計防御のより広い問題を検討することが重要であると提案する。これは、アプリケーション開発者による採用に依存するオプトイン保護の場合、特に重要です。その理由は次の 2 つです。


1. Web developers don't understand Spectre , and they shouldn't need to in order to protect their applications, but they have long had to deal with other vulnerabilities discussed in this document (CSRF, XSSI). Providing mechanisms which can protect from a larger class of attacks, especially those known to developers, increases their security value and makes it more likely that they will be adopted in real applications.
Web 開発者は Spectre を理解しておらず、アプリケーションを保護するためには必要ないはずですが、この文書で説明されている他の脆弱性(CSRF 、 XSSI)には長い間対処しなければなりませんでした。より大きなクラスの攻撃(特に開発者に知られている攻撃)から保護できるメカニズムを提供することで、セキュリティの価値が高まり、実際のアプリケーションで採用される可能性が高まります。

2. Web developers don't understand browser process models , but are familiar with the concept of allowing application resources to be loaded only from a small set of origins from which the developer expects requests (for example via CORS, or when handling data sent via postMessage). Aligning security mechanisms with the standard web model of policing cross-origin relationships, instead of focusing on ad hoc mitigations tailored to Spectre, may make the protections more understandable and increase the likelihood of their adoption.
Web 開発者はブラウザプロセスモデルを理解していませんが、開発者が要求を期待する少数の起源のセット(たとえば、 CORS を介して、または postMessage 経由で送信されるデータを処理する場合など)からアプリケーションリソースをロードできるようにするという概念に精通しています。 。 Specter に合った特別な軽減策に焦点を当てるのではなく、原点を越えた関係をポリシングする標準の Web モデルとセキュリティメカニズムを連携させることで、保護をより理解しやすくし、採用の可能性を高めることができます。


In practice, a thoughtful combination of the security features outlined above is likely to be sufficient to address Spectre as well as other cross-origin information leaks: smaller sites can augment CORB protections for Spectre by adopting From-Origin and X-Frame-Options, existing larger applications can prevent most cross-origin attacks by checking the Sec-Metadata request header and setting Cross-Origin-Isolate on all responses, and particularly sensitive new sites can create their authentication cookies as "SameSite".

実際には、上で概説したセキュリティ機能を慎重に組み合わせることで、 Spectre と他のクロスオリジンの情報漏えいに対処するのに十分です。小規模なサイトでは、 From-Origin および X-Frame-Options を採用し、既存の大規模なアプリケーションでは、 Sec-Metadata リクエストヘッダーをチェックし、すべてのレスポンスに対して Cross-Origin-Isolate を設定することで、多くのクロスオリジン攻撃を防ぐことができます。特に重要な新しいサイトでは、認証 Cookie を「SameSite」として作成できます。

In the end, we strongly believe that the success of browser efforts in this area depends on keeping a broader view of the attacks outlined in this document, and understanding how proposed mitigations fit together to allow developers to add meaningful protections in their applications.
最終的には、この分野でのブラウザの成功は、このドキュメントで概説されている攻撃の広範な見方を維持し、提案された緩和策がどのように適合しているかを理解することに重点を置いています。

Thanks to Krzysztof Kotowicz , Michal Zalewski , Devdatta Akhawe and Jasvir Nagra for useful feedback on earlier drafts of this document.

1.  CORB protects against XSSI for some responses, but it does not cover the text/javascript MIME type.
2.  CORB may partially mitigate timing attacks if the server supports RFC8297 and browsers reject responses immediately when they are determined to be CORB-eligible without receiving the full response.
3.  Spectre protections are limited to CORB-eligible resource types and rely on browser process isolation.
4.  To protect from load status detection, From-Origin must be set on both success and error replies.
5.  The same considerations as for CORB apply here.
6.  From-Origin protection against Spectre relies on the browser's implementation of process isolation.
7.  To reliably prevent CSRF, Sec-Metadata must indicate if a request is a result of a top-level navigation.
8.  Local attackers may still conduct related attacks by observing traffic size on forced top-level navigations.
9.  Sec-Metadata protection against Spectre relies on the browser's implementation of process isolation.
10. Requires SameSite cookies in "Strict" mode.
11. Relies on the browser's implementation of process isolation.  iframes, Cross-Origin-Isolate allows documents to break direct DOM access, potentially preventing cross-origin navigations or traversal of the document's frames.
12. Cross-Origin-Isolate does not protect against timing attacks, but can complement defenses against cross-site search and related issues by preventing the attacker from navigating cross-origin windows.
13. Cross-Origin-Isolate helps achieve Spectre protection in browsers without out-of-process iframes.


1.  CORB はいくつかのレスポンスに対して XSSI を保護しますが、 text/javascript の MIME タイプはカバーしません。
2.  CORB は、サーバーが RFC8297 をサポートしていて、完全な応答を受信せずに CORB 資格があると判断された場合、ブラウザが応答をすぐに拒否すると、タイミング攻撃を部分的に緩和する可能性があります。
3.  スペクターの保護は、 CORB に適格なリソースタイプに限られており、ブラウザプロセスの分離に依存しています。
4.  負荷状態の検出から保護するには、 From-Origin を成功応答とエラー応答の両方で設定する必要があります。
5.  CORB と同じ考慮事項がここに適用されます。
6.  Spectre に対する Origin からの保護は、ブラウザのプロセス分離の実装に依存しています。
7.  CSRF を確実に防止するために、 Sec-Metadata は、要求がトップレベルのナビゲーションの結果であるかどうかを示す必要があります。
8.  ローカルの攻撃者は、強制的なトップレベルのナビゲーションでトラフィックのサイズを観察することによって、引き続き関連する攻撃を行う可能性があります。
9.  Sec-Metadata の保護機能は、ブラウザのプロセス分離の実装に依存しています。
10. 「Strict」モードで SameSite Cookie が必要です。
11. ブラウザのプロセス分離の実装に依存します。 iframe では、 Cross-Origin-Isolate を使用すると、文書が直接 DOM へのアクセスを中断させ、クロスオリジンのナビゲーションや文書のフレームの走査を防ぐことができます。
12. Cross-Origin-Isolate はタイミング攻撃から防御するものではありませんが、攻撃元がクロスオリジンウィンドウをナビゲートしないようにすることで、クロスサイト検索や関連する問題に対する防御を補完することができます。
13. Cross-Origin-Isolate は、プロセス外 iframe なしでブラウザで Spectre の保護を実現するのに役立ちます。
