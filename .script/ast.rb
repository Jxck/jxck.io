class AST
  attr_accessor :ast
  def initialize(md)
    option = {
      input: "GFM"
    }
    @ast = Kramdown::Document.new(md, option).to_hashAST

    # pre process
    @ast.children = sectioning(@ast.children, 1)
  end

  def tabling(table)
    # thead > tr > td を th にしたい

    alignment = table.options.alignment

    table.children = table.children.map {|node|
      node.children.map {|tr|
        tr.children.map.with_index {|td, i|
          td.type = :th if node.type == :thead
          td.alignment = alignment[i]
        }
      }
      next node
    }

    table
  end

  def dling(dl)
    # <dd><p>hoge</dd> の <p> を消したい

    dl.children = dl.children.map {|c|
      next c if c.type == :dt

      c.children = c.children.first.children
      next c
    }

    i = 0
    dl.children = dl.children.group_by {|c|
      if c.type == :dt
        next i
      elsif c.type == :dd
        j = i
        i = i+1
        next j
      end
    }.map{|k, c|
      {:type => :div, :children => c}
    }
    dl
  end

  def sectioning(children, level)
    # 最初のセクションは <article> にする
    section = {
      type: level == 1 ? :article : :section,
      options: {
        level: level,
      },
      children: [],
    }

    # 横に並ぶべき <section> を入れる配列
    sections = []

    loop do
      # 横並びになっている子要素を取り出す
      child = children.shift
      break if child.nil?

      # blank は消す
      next if child.type == :blank

      child = tabling(child) if child.type == :table

      child = dling(child) if child.type == :dl

      # H2.. が来たらそこで section を追加する
      if child.type == :header
        if section.options.level < child.options.level
          #  一つレベルが下がる場合
          #  今の <section> の下に新しい <section> ができる
          #  <section>
          #   <h2>
          #   <section>
          #     <h3> <- これ

          # その h を一旦戻す
          children.unshift(child)

          # そこを起点に再起する
          # そこに <section> ができて、
          # 戻した h を最初にできる
          section.children.concat(sectioning(children, child.options.level))
          next
        elsif section.options.level == child.options.level
          # 同じレベルの h の場合
          # 同じレベルで別の <section> を作る必要がある
          # <section>
          #  <h2>
          # </section>
          # <section>
          #  <h2> <- これ

          # そこまでの sections を一旦終わらせて
          # 親の child に追加する
          # そして、同じレベルの新しい <section> を開始
          unless section.children.empty?
            sections.push(section)
            section = {
              type: :section,
              options: {
                level: child.options.level
              },
              children: []
            }
          end
          # もし今 section に子要素が無ければ
          # そのまま今の section に追加して良い
        elsif section.options.level > child.options.level
          # レベルが一つ上がる場合
          # 今は一つ下がったレベルで再帰している最中だったが
          # それが終わったことを意味する
          # <section>
          #   <h2>
          #   <section>
          #     <h3>
          #     <p>
          #   <h2> <- 今ここ

          # その h を一旦戻す
          children.unshift(child)

          # ループを終わらせ関数を一つ抜ける
          break
        end
      end

      # 今の <section> の子要素として追加
      section.children.push(child)
    end

    # 最後のセクションを追加
    sections.push(section)

    # そこまでの <section> のツリーを返す
    # 再帰している場合は、親の <section> の
    # childrens として使われる
    sections
  end
end

