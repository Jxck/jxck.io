# markup をセットして生成したら
# ast を渡すと traverse しながらビルドしてくれる
class Traverser
  attr_reader :codes

  def initialize(markup, dir)
    # ここに codeblock を退避しておく
    @codes  = {}
    @markup = markup
    @dir    = dir
  end

  def start(ast)
    # 全体を舐めつつ変換
    result = traverse(ast)

    # indent を無視するため
    # traverse が終わった結果の
    # pre に code を戻す
    @codes.each {|key, value|
      # markup のもつロジックでコードを処理
      code = @markup.code_format(value)
      # hash に差し替えられているところを置き換える
      result.gsub!("// #{key}") { code }
    }

    result
  end

  def traverse(ast)
    enter(ast)
    ast.children = ast.children&.map {|child|
      traverse(child)
    }
    leave(ast)
  end

  def enter(node)
    # 降りて行きながら、親子関係によって前処理を行う
    # 親から見ないとわからない処理のみ行う
    # puts "[##{__LINE__}] enter: #{node.type}"

    if node.type == :html_element
      # html element は value にタグ名が入ってる
      # 子要素の連結結果を value に入れられるように
      # :tag に移しておく
      node.tag = node.value
      node.value = ""
    end

    if node.type == :blockquote
      # 小要素が 1 つの <p> で行を <br> にして入っている
      p = node.children[0]

      # <br> を複数の <p> に分けつつ余計な改行を消す
      children = p.children.reduce([{type: :p, children: []}]) {|acc, e|
        if e.type === :text and e.value.start_with?("\n")
          e.value = e.value.gsub("\n", "")
        end

        if e.type === :br
          acc << {type: :p, children: []}
        else
          acc.last.children << e
        end
        acc
      }

      node.children = children
    end

    if node.type == :ul or node.type == :ol
      # 初段の level を 1 としておく
      node.level = 1 if node.level.nil?
      node.children.map {|child|
        # li に親の ul/ol の参照を渡しておく
        child.parent = node if child.type == :li
      }
    end

    if node.type == :li
      # li の子には p が入るのでこれを除く
      first = node.children.shift
      if first.type == :p
        first.children.reverse.each{|child|
          node.children.unshift child
        }
      end

      # 基本は li を閉じる
      node.close = true
      if node.children.size == 1 and node.children.first.inline
        # もし li の子が :text 1 つだけなら閉じない
        node.close = false
      end

      # li の子に ul/ol がネストしていたら
      # li の親の ul/ol のレベル + 1 する
      node.children.map {|child|
        if child.type == :ul or child.type == :ol
          child.level = node.parent.level + 1
        end
      }
    end

    # <p><img> は閉じる
    if node.type == :p and node.children&.first&.type == :img
      node.close = true
    end
  end

  def leave(node)
    # puts "[##{__LINE__}] leave: #{node.type} #{node.value}"

    if node.type == :codeblock
      lang = node.attr && node.attr["class"].sub("language-", "")
      code = node.value.chomp
      if code == ""
        # code が書かれてなかったらファイルから読む
        # ```js:main.js
        lang, node.path = lang.split(":")
        path = "#{@dir}/#{node.path}"
        code = File.read(path).chomp
      end

      # コードを展開したあとに全体のインデント操作をすると
      # コードのインデントが狂ってしまう
      # そこでコードを hash に置き換えて退避しておき
      # 全部組み上がったら後で戻すことで
      # インデントを回避できるようにする
      hash = code.hash.to_s
      node.value   = "// #{hash}" # value には hash を入れておく
      node.code    = code         # そのまま埋め込みたい場合は code に入ってる
      node.lang    = lang
      @codes[hash] = {lang: lang, code: code} # 全部組み上がったらここから取り出して replace
    end

    # children を結合して value に
    if node.children
      node.value = node.children.join
    end

    # ここで markup のメソッドを呼び出し変換する
    up = @markup.send(node.type, node)
    up
  end
end
