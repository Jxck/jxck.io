# Foreign Fetch による API の Offline 対応

## Intro

Service Worker に Foreign Fetch という機能が提案されている。

この機能があると、 HTML を持たない Web API についても Service Worker を付与することができるようになる。

一体どういう仕組みなのか、これによって何が可能になるのかについて、デモを交えて記す。

なお、この機能は現在 Origin Trial 対応であるため、検証には Token の取得が必要となる。


## Foreign Fetch

Service Worker のインストールは、 Service Worker を読み込むページ無いで実行される JavaScript が必要である。

しかし、 HTML を持たない、例えば JSON API といったものや、 JS だけで提供されるアナリティクスのようなサービスについては、 Service Worker を登録することができない。

例えば、本サイトが登録している Google Analytics は、ページのロード時などに Analytics のオリジンに対してリクエストを発行するが、ブラウザがオフラインだった場合、リクエストを発行することができず、サービスをうけることができない。

オフライン時のリクエストを **本サイトの Service Worker** で残すには、オリジンが違うため Opaque となる上に、そもそも Analytics のオフライン対応はできれば Analytics に行って欲しい。

そこで、




コンテンツの開発自体は、 localhost で行うが、この場合はブラウザのフラグを設定することで、自分だけ有効にして開発すればいいだろう。
実際に Foreign Fetch を使って作成したコンテンツを以下に設置した。

完成したコンテンツをドメインに配置するが、ここで Origin Trials Token を入れたものと入れなかったもの二つを用意してみた。


- [Token 有り]()
- [Token 無し]()

Token が無い方では、動かないことがわかる。
ただし、利用者本人のブラウザでフラグが有効にされている場合は、 Token の有無に関係なく動作することに留意したい。


### Tools

