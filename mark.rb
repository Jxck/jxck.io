#!/usr/bin/env ruby

require "json"
require "kramdown"

#'use strict';
#
#let path = require('path');
#let url = require('url');
#let fs = require('fs');
#let parse = require('remark').parse;
#
#// read template and trim
#function read(path) {
#  return fs.readFileSync(path).toString().trim();
#}
#
#// html special chars
#function hsp(str) {
#  return str.replace(/&/g, '&amp;')
#            .replace(/</g, '&lt;')
#            .replace(/>/g, '&gt;')
#            .replace(/"/g, '&quot;')
#            .replace(/'/g, '&#039;');
#}
#
#// tagged literal of hsp
#function h(tag, val) {
#  return `${tag[0]}${hsp(val)}${tag[1]}`;
#}
#

# replace ' ' to '+'
def unspace(str)
  str.gsub(/ /, '+');
end

#
#// tag を抜き出す
#function Tags(filepath) {
#  let text = read(filepath);
#
#  // [foo][bar] の部分
#  let tagtext = text.match(/\# ((\[(.+?)\])+)/)[1];
#  // tag は必ず書く
#  if (tagtext === undefined || tagtext.length === 0) {
#    console.error('\x1b[0;31mThere is No TAGS\x1b[0m');
#    exit(1);
#  }
#
#  // tag を本文から消す
#  let md = text.replace(' ' + tagtext, '');
#
#  // tag をリストに
#  let tags = tagtext.substr(1, tagtext.length - 2).split('][');
#
#  return { tags, md };
#}
#
#// Intro/Theme の中身を取り出す
#function Description(text) {
#  let intro = text.match(/## (Intro|Theme)(([\n\r]|.)*?)##/m)[2].trim();
#  intro = intro.replace(/(\n|\r)/g, '');
#  intro = intro.substring(0, 140) + '...';
#  intro = hsp(intro);
#  return intro;
#}
#
#const CSS = {
#  ARTICLE: '/assets/css/article.css',
#  BODY:    '/assets/css/body.css',
#  INFO:    '/assets/css/info.css',
#  HEADER:  '/assets/css/header.css',
#  MAIN:    '/assets/css/main.css',
#  FOOTER:  '/assets/css/footer.css',
#  PRE:     '/assets/css/pre.css',
#  TABLE:   '/assets/css/table.css',
#};
#
#function CatStyle(path) {
#  return Object.keys(CSS).map((f) => {
#    return `${path}/${f.toLowerCase()}.css`;
#  }).map((f) => {
#    return fs.readFileSync(f).toString();
#  }).join('\n');
#}



# tag ごとのビルダ
class Builder
  def initialize(option)
#    this.host = option.host;
    @canonical = option.canonical || "https://example.com" #TODO
#    this.ampurl = option.ampurl;
#    this.template = option.template;
#    this.meta = option.meta;
#    this.description = option.description;
#    this.created_at = option.created_at;
#    this.updated_at = option.updated_at;
#    this.dir = option.dir;
#    this.tags = option.tags;
#    this.style = option.style;
    @indent = option.indent || "  ";
#    this.icon = option.icon;
#    this.title = '';
   end
#  get isAMP() {
#    return !this.ampurl;
#  }
#  taglist() {
#    return this.tags.map((tag) => `<a>${tag}</a>`).join(',');
#  }
  def wrap(value)
    # increase indent
    "\n#{value}".gsub(/\n/m, "\n#{@indent}") + "\n"
  end
#  Style(href) {
#    return `<link rel=stylesheet property=stylesheet type=text/css href=${href}>`;
#  }
#  HTML(article) {
#    this.article = article;
#    this.meta = eval('`' + this.meta + '`');
#    return eval('`' + this.template + '`');
#  }
  def root(node)
    wrap("#{node.value}")
  end

  def article(node)
    "<article>#{wrap(node.value)}</article>"
  end
  def section(node)
    "<section>#{wrap(node.value)}</section>\n"
  end
  def ul(node)
    "<ul>#{wrap(node.value)}</ul>\n"
  end
  def ol(node)
    "<ol>#{wrap(node.value)}</ol>\n"
  end
  def header(node)
    level = node.options.level
    if level == 1
      # h1 の中身はタイトル
      @title = node.value
      # h1 だけは canonical にリンク
      return "<h#{level}><a href=#{@canonical}>#{@title}</a></h#{level}>\n"
    else
      # h2 以降は id を振る
      return "<h#{level} id=\"#{unspace(node.value)}\"><a href=\"#{unspace(node.value)}\">#{node.value}</a></h#{level}>\n";
    end
  end
#  code(node) {
#    let lang = node.lang || '""';
#    let value = `<pre class=${lang}><code>${node.value}</code></pre>\n`;
#    if (!this.isAMP && !this.pred) {
#      value = [this.Style(CSS.PRE), value].join('\n');
#      this.pred = true;
#    }
#    return value;
#  }
#  table(node) {
#    let value = this.wrap`<table>${node.value}</table>`;
#    if (!this.isAMP && !this.tabled) {
#      value = [this.Style(CSS.TABLE), value].join('\n');
#      this.tabled = true;
#    }
#    return value;
#  }
#  thead      (node) { return this.wrap`<thead>${node.value}</thead>\n`; }
#  tbody      (node) { return this.wrap`<tbody>${node.value}</tbody>\n`; }
#  tableRow   (node) { return this.wrap`<tr>${node.value}</tr>\n`; }
#  tableHead  (node) { return `<th class=align-${node.align}>${node.value}</th>\n`; }
#  tableData  (node) { return `<td class=align-${node.align}>${node.value}</td>\n`; }
   def p(node)
     "<p>#{node.value}\n"
   end
#
#  // inline
#  inlineCode (node) { return h`<code>${node.value}</code>`; }
#  blockquote (node) { return h`<blockquote>${node.value}</blockquote>\n`; }
   def li(node)
     "<li>#{node.value}\n"
   end
#  strong     (node) { return `<strong>${node.value}</strong>`; }
#  emphasis   (node) { return `<em>${node.value}</em>`; }
   def text(node)
     node.value
   end
#  thematicBreak() { return '<hr>'; }
#
#  link(node) {
#    if (this.isAMP && node.url.match(/^chrome:\/\//)) {
#      // amp page ignores chrome:// url
#      return node.url;
#    }
#    return `<a href="${node.url}">${node.value}</a>`;
#  }
#  image(node) {
#    let width = '';
#    let height = '';
#
#    let size = node.url.split('#')[1];
#    if (size) {
#      size = size.split('x');
#      if (size.length === 2) {
#        width = `width=${size[0]}`;
#        height = `height=${size[1]}`;
#      }
#    }
#
#    // AMP should specify width-height
#    if (this.isAMP) {
#      // not has amp link means amp template
#      if (width === '' || height === '') {
#        console.log('no widthxheight for img');
#        exit(1);
#      }
#      return `<amp-img layout=responsive src=${node.url} alt="${node.alt}" title="${node.title}" ${width} ${height}>`;
#    }
#
#    // SVG should specify width-height
#    if (path.parse(url.parse(node.url).path).ext === '.svg') {
#      return `<img src=${node.url} alt="${node.alt}" title="${node.title}" ${width} ${height}>`;
#    }
#
#    // No width-height for normal img
#    return `<picture>
#    <source type=image/webp srcset=${node.url.replace(/(.png|.gif)/, '.webp')}>
#    <img src=${node.url} alt="${node.alt}" title="${node.title}">
#    </picture>`;
#  }
#  html(node) {
#    let value = `${node.value}\n`;
#    if (this.isAMP && value.match(/<iframe.*/)) {
#      return value.replace(/iframe/g, 'amp-iframe');
#    }
#    return value;
#  }
end

class Hash
  def method_missing(method, *params)
    if method[-1] == "="
      key = method[0..-2].to_sym
      self[key] = params[0]
    else
      self[method.to_sym]
    end
  end

  def inline?
    [
      :text,
      :header,
      :strong,
      :paragraph,
    ].include?(self.type)
  end
end

def j(o)
  puts JSON.pretty_generate(o)
end

class Traverser

  # 結果を入れるスタック
  # push => unshift()
  # pop  => shift()
  # top  => [0]
  def initialize(builder)
    @stack = []
    @codes = []
    @builder = builder
  end

  def enter(node)
    puts "enter: #{node.type}"
    # enter では、 inline 属性を追加し
    # stack に詰むだけ
    # 実際は、pop 側で整合検証くらいしか使ってない

    @stack.unshift(node);
  end

  def leave(node)
    puts "leave: #{node.type}"

    if node.type == :codespan
      # コードを抜き取り、ここで id に置き換える
      tmp = node.value.split("\n")
      node.lang = tmp.shift
      node.value = tmp.join("\n")
      if node.value == ""
        # code が書かれてなかったらファイルから読む
        # ```js:main.js
        node.lang, node.path = node.lang.split(":")
        node.value = File.read(node.path);
      end
      # インデントを無視するため、全部組み上がったら後で差し込む。
      # TODO
      codes.push(node)
      node.value = "// #{codes.length}"
    end
    if node.value
      # value があったら、 text とか

      # pop して
      top = @stack.shift
      # 対応を確認
      if top.type != node.type
        STDERR.puts "ERROR", top, node
        exit(1)
      end

      # 閉じる
      unless @builder.respond_to?(node.type)
        STDERR.puts "ERROR", node.type
        exit(1)
      end

      @stack.unshift({
        tag:    :full,
        val:    @builder.send(node.type, node),
        inline?: node.inline?,
      })
    else
      # 完成している兄弟タグを集めてきて配列に並べる
      vals = []

      while @stack.first.tag == :full
        top = @stack.shift()

        if top.inline? && vals.first && vals.first.inline?
          # 取得したのが inline で、一個前も inline だったら
          # inline どうしをくっつける
          val = vals.shift
          val.val = top.val + val.val
          vals.unshift(val)
        else
          # そうで無ければただの兄弟要素
          vals.unshift(top)
        end
      end

      # タグを全部連結する
      vals = vals.map{|val| val.val}.join('').strip

      # それを親タグで閉じる
      top = @stack.shift()
      top.type != node.type
      if top.type != node.type
        puts 'ERROR', top, node
        exit(1)
      end

      # 今見ているのが paragraph で
      if node.type == :p
        # その親が p いらないタグ だったら
        if [:li, :blockquote].include?(@stack[0].type)
          # p を消すために text に差し替える
          # text はタグをつけない
          node = { type: :text }
        end
      end

      node.value = vals

      unless @builder.respond_to?(node.type)
        STDERR.puts 'unsupported type', node.type
      end

      @stack.unshift({
        tag:     :full,
        val:     @builder.send(node.type, node),
        inline?: node.inline?,
      })
    end
  end

  def traverse(ast)
    enter(ast)
    return leave(ast) unless ast.children

    ast.children = ast.children.map {|child|
      next traverse(child)
    }
    return leave(ast)
  end
end

class AST
  def initialize(md)
    @ast = Kramdown::Document.new(md).to_hashAST

    # pre process
    @ast.children = sectioning(@ast.children, 1)
  end

  def tabling(table)
    # thead > tr > td を th にしたい

    alignment = table.options.alignment

    table.children = table.children.map {|node|
      node.children.map {|tr|
        tr.children.map.with_index {|td, i|
          if node.type == :thead
            td.type = :th
          end
          td.alignment = alignment[i]
        }
      }
      next node
    }
    return table
  end

  def sectioning(children, level)
    # 最初のセクションは <article> にする
    section = {
      type: level === 1 ? :article : :section,
      options: {
        level: level,
      },
      children: [],
    }

    # 横に並ぶべき <section> を入れる配列
    sections = []

    loop {
      # 横並びになっている子要素を取り出す
      child = children.shift()
      break if child == nil

      # blank は消す
      next if child.type == :blank

      child = tabling(child) if child.type == :table

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
        elsif section.options.depth == child.options.depth
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
          if section.children.length > 0
            sections.push(section)
            section = {
              type: :section,
              options: {
                level: child.options.level,
              },
              children: [],
            }
          end
          # もし今 section に子要素が無ければ
          # そのまま今の section に追加して良い
        elsif section.options.depth > child.options.depth
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
    }

    # 最後のセクションを追加
    sections.push(section)

    # そこまでの <section> のツリーを返す
    # 再帰している場合は、親の <section> の
    # childrens として使われる
    return sections
  end

  def build(builder)

    # traverse
    stack = Traverser.new(builder).traverse(@ast)

    # 結果の <article> 結果
    article = stack[0].val;

    puts article

    #let result = template.HTML(article);

    ## indent を無視するため
    ## ここで pre に code を戻す
    ## ついでにエスケープ
    #codes.forEach((code, i) => {
    #  result = result.replace(`// ${i + 1}`, hsp(code));
    #});

    #return result;
  end
end

#
#function prepare(filepath, option) {
#  let indent = '  ';
#  let dir = path.parse(filepath).dir;
#  let name = path.parse(filepath).name;
#  let host = dir.split('/')[1];
#  let baseurl = '/' + dir.split('/').slice(2).join('/');
#  let created_at = dir.split('/')[3];
#  let updated_at = fs.statSync(filepath).mtime.toISOString().substring(0, 10);
#
#  // separate tag
#  let { tags, md } = Tags(filepath);
#
#  // take description
#  let description = Description(md);
#
#  // meta
#  let icon = option.icon;
#  let canonical = `${baseurl}/${name}.html`;
#  let ampurl = `${baseurl}/${name}.amp.html`;
#  let target = `${dir}/${name}.html`;
#
#  // template
#  let meta = option.meta;
#  let template = option.template;
#  let style = null;
#
#  if (option.amp) {
#    ampurl = null;
#    style = CatStyle('blog.jxck.io/assets/css');
#    target = `${dir}/${name}.amp.html`;
#  }
#
#  return {
#    dir,
#    name,
#    created_at,
#    updated_at,
#    tags,
#    md,
#    description,
#    canonical,
#    ampurl,
#    host,
#    meta,
#    template,
#    style,
#    target,
#    indent,
#    icon,
#  };
#}
#
#if (process.argv.length < 3) {
#  console.error('no file name');
#  exit(1);
#}
#
#let filepath = process.argv[2];
#
#if (process.argv[3] === 'podcast') {
#  // podcast html
#  (() => {
#    p('podcast html', filepath);
#    let option = {
#      amp:      false,
#      meta:     read('./.template/meta.html'),
#      template: read('./.template/podcast.html'),
#      icon:     'https://podcast.jxck.io/assets/img/mozaic.png', // TODO: https://mozaic.fm/assets/img/mozaic.png
#    };
#    let info = prepare(filepath, option);
#    let builder = new Builder(info);
#    let ast = new AST(info.md);
#    let article = ast.build(info.dir, builder);
#    fs.writeFileSync(info.target, article);
#  })();
#
#  exit(0);
#}
#
#// blog html
#(() => {
#  p('mark html', filepath);
#  let meta = read('./.template/meta.html') + '\n' + read('./.template/ld-json.html');
#  let option = {
#    amp:      false,
#    meta:     meta,
#    template: read('./.template/blog.html'),
#    icon:     'https://jxck.io/assets/img/jxck.png',
#  };
#  let info = prepare(filepath, option);
#  let builder = new Builder(info);
#  let ast = new AST(info.md);
#  let article = ast.build(info.dir, builder);
#  fs.writeFileSync(info.target, article);
#})();
#
#// amp html
#(() => {
#  p('mark amp', filepath);
#  let meta = read('./.template/meta.html') + '\n' + read('./.template/ld-json.html');
#  let option = {
#    amp:      true,
#    meta:     meta,
#    template: read('./.template/amp.html'),
#    icon:     'https://jxck.io/assets/img/jxck.png',
#  };
#  let info = prepare(filepath, option);
#  let builder = new Builder(info);
#  let ast = new AST(info.md);
#  let article = ast.build(info.dir, builder);
#  fs.writeFileSync(info.target, article);
#})();

md = <<-EOS
## ul

- hoge
- fuga

## ol

1. fuga
1. piyo
EOS

AST.new(md).build(Builder.new({}))
