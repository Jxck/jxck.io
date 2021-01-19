# markdown builder


## markdown builder

blog.jxck.io や moziac.fm の markdown を HTML に変換するためのスクリプト郡。

生成した HTML にこだわりたいため、特定のライブラリを使わず自分で作っている。


## main.rb

オプションを指定するとタスクを実行する。これを Make から叩いてる。


## builder

blog.jxck.io, mozaic.fm をビルドするためのタスク群。

markdown をビルドして HTML にする以外にもタスクがあるため、ファイルを漁ったついでにそれらを実行する。

- blog のタスク
  - markdown -> html の変換
  - index ページ生成
  - tag ページ生成
  - RSS 生成
- podcast のタスク
  - markdown -> html の変換
  - index ページ生成
  - 前後エピソードのリンク
  - RSS 生成
  - ID3 を設定するためのシェルの生成

対象のディレクトリ以下のファイルを全部集め、そのファイルごとの操作を抽象化した Document に作り変えてから処理。

結果をファイルに保存。


## document

ファイル内にあるメタ情報と本文を取り出せるようにするためのクラス。

共通部分を集約した親クラスとして Article があり、ファイルに応じてそれを継承して独自の情報を追加している。

- blog の場合は Entry で日付やタグなど
- podcast の場合は Episode でエピソード番号やゲストなど

が取得できる。

さらに、 `build()` があり、ここに format を渡すと変換ができる。


### document.build

document.build は、 body (markdown のテキスト) を以下の様に処理する。

- kramdown を使って AST にパースする (ast.rb)
- その AST を traverse して事前処理を行う (traverse.rb)

こうすると、 document クラスの中の `@article` などに結果が入る。


### AST

AST は kramdown で AST に変換した結果、気に食わない構造を先に治す。

- section がないところに刺す
- table や dl 内のいらない p を消すとか

ここでもすでに AST をトラバースしているが、結果きれいな AST を吐くまでを仕事にしてるので良い。またここで事前処理しておくと、次のトラバースも楽。


### Traverse

きれいにした AST を上からトラバースする。(enter と leave)

トラバースしながら気に食わない構造は直す。

なにげに enter と leave を 定義したプラグインを渡すと呼び出すこともできたりする。使ってない。


```rb
def default_plugin
  {
    :enter => lambda {|node| node}, # call after  enter
    :leave => lambda {|node| node}, # call before leave
  }
end
```

特に codeblock は、インデントを直したりする上で埋め込んだコードに影響が無いように、トラバース前に保存して hash におきかえ、トラバース後に置換するようにしてる。

そして leave 側で HTML に変換できるものは Format に渡して HTML に変換する。


### Format

format は Markdown 記法の AST を HTML に変換する対応を持つクラス。

`{type: 'h1', value, 'hello'}` を `<h1>hello</h1>` にするイメージ。

エスケープなどもここでやる。

つまり、 HTML を直したいならここを治すことになる。

別の Format を書けば HTML 以外にも変換できる。


### Template

テンプレートは HTML などの外側の雛形。 document は build した結果 `@article` とかに変換結果を持っているので、それを `result(binding)` で渡せば埋め込むことができる。
