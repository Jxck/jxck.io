# markup をセットして生成したら
# ast を渡すと traverse しながらビルドしてくれる
class Traverser
  attr_reader :codes

  def initialize(markup)
    @codes = {}
    @markup = markup
  end

  def traverse(ast)
    enter(ast)
    ast.children = ast.children&.map { |child|
      traverse(child)
    }
    leave(ast)
  end

  def enter(node)
    # 降りて行きながら、親子関係によって前処理を行う
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
      if node.children.size == 1 and node.children.first.type == :text
        # もし li の子が :text 1 つだけなら閉じない
        node.close = false
      end
    end

    if node.type == :p and node.children
      first = node.children.first
      if first.type == :img
        node.close = true
      end
    end
  end

  def leave(node)
    # puts "[##{__LINE__}] leave: #{node.type} #{node.value}"

    if node.type == :codeblock
      # コードを抜き取り、ここで id に置き換える
      code = node.value
      if code == ""
        # code が書かれてなかったらファイルから読む
        # ```js:main.js
        node.attr["class"], node.path = node.attr["class"].split(":")
        path = "./blog.jxck.io/#{@markup.baseurl}/#{node.path}"
        code = File.read(path)
      end

      # インデントを無視するため、退避しておき全部組み上がったら後で差し込む。
      hash = code.chomp.hash
      @codes[hash] = code.chomp

      # あとで差し変えるため id として hash を入れておく
      node.value = "// #{hash}"
    end

    if node.children
      node.value = node.children.join
    end
    up = @markup.send(node.type, node)
    up
  end
end
