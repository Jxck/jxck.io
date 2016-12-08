
## API の Offline 化

ここでは三つめの方法に注目したい。

HTTP 経由で Service Worker が登録できるということは、  JS や HTML をペイロードに持たないレスポンスについても Service Worker を登録することが可能になるということだ。

例えば Font, Image, JS, CSS ライブラリなどのアセットファイルを提供する CDN においても、それらアセットファイルに紐づけて Service Worker を登録し、オフラインでもアセットを提供することが可能になる。

静的なファイルに限らず、例えば JSON API や GraphQL API そのものを Offline 対応することも同様に可能である。すでに取得したリソースを IndexedDB などに保存しておけば、 GET をフォールバックすることができる。 i8c (isomorpic) な実装でサーバとロジックを共有しておけば、 POST/PUT/PATCH/DELETE などの結果は次回の接続回復時に同期するという処理を、 API のレベルで提供することも不可能ではないだろう。


## Service Worker の責務分離

もちろん、アセットや API が Offline 対応していても、そのクライアントとなるページ自体が Offline 対応していなければ、利用することはできない。
すると、ページ自体の Offline 化のための Service Worker 内で API やアセットのオフライン対応も担保すればいいのでは? という考え方が可能で、現状オフライン対応をうたうサービスはそうした作りも多いかもしれない。

しかし、ページ自体のオフライン化処理と、アセットや API のオフライン化の処理を SW レベルで分けることは責務の分離に繋がる。
例えば `/assets/image` と `/assets/javascript` と `/users.json` の処理が一つの SW 内で分岐しているよりは、それぞれのドメインに詳しい担当が、エンドポイントの実装と合わせて SW の実装も提供できる方が、クライアントが全てを実装しきることを期待するよりは現実的ではないだろうか？

つまり、 microservices 的な文脈でいえば、サービスの単位が API エンドポイントに加えて、オフライン対応を含めることができ、一歩先に進むイメージと言えるかもしれない。


## そして foreign fetch へ

TODO:
アセットや API の Serivce Worker をページそのものの Service Worker と分離することはできたが、それでもオリジンは同じでないと Service Worker が登録できない。
つまり、 font も json も first party であればこの手法が適用できるが third party に対しては適用できないのである。
では、別ドメインから JSON を返す Twitter API や、別ドメインの JS を読み込む形で提供する Google Analytics のオフライン化はだれが担保するのだろうか？自分でやるのだろうか？
Twitter や Google がやってくれると嬉しい。
それを実現するのが次の記事で詳解する Foreign Fetch である。
