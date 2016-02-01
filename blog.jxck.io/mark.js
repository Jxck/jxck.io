#!/usr/bin/env node

// TODO: add id to h1~hn for deep link?
// TODO: add updated date to html

'use strict';

// tag ごとのビルダ
let Simple = {
  HTML: (article) =>
`<!DOCTYPE html>
<meta charset=utf-8>
<meta http-equiv=X-UA-Compatible content=IE=edge>
<meta name=viewport content="width=device-width, initial-scale=1">
<title>${Simple.title} | blog.jxck.io</title>
<link rel=stylesheet type=text/css href=/assets/style.css>
<header>
  <a class=logo href=/>blog.jxck.io</a>
</header>
${article}
<hr>
<footer>
  <address class=copyright>Copyright &copy; 2016 <a href=/>Jxck</a>. All Rights Reserved.</address>
</footer>`
  ,
  indent: `  `,
  title: '',
  Article: (node) => {
    let value = `\n${node.value}`.replace(/\n/gm, `\n${Simple.indent}`);
    return `<article>${value}\n</article>`;
  },
  Section: (node) => {
    let value = `\n${node.value}`.replace(/\n/gm, `\n${Simple.indent}`);
    return `<section>${value}\n</section>\n`;
  },
  List: (node) => {
    let value = `\n${node.value}`.replace(/\n/gm, `\n${Simple.indent}`);
    return node.ordered ? `<ol>${value}\n</ol>\n` : `<ul>${value}\n</ul>\n`;
  },
  Header: (node) => {
    let val = '';
    if (node.depth === 1) {
      // h1 には独自ルールでタグを付けている
      // ex)
      // # [blog][web] ブログ始めました
      Simple.title = node.value;

      // tag 取り出す
      let tag = node.children.shift().raw;
      let tags = tag.substr(1, tag.length - 2).split('][');

      // tag は必ず書く
      if (tags === undefined) {
        console.error('\x1b[0;31mThere is No TAGS\x1b[0m');
        process.exit(1);
      }

      // tags をビルド
      tags = tags.map((tag) => `<a href="/tags/${tag}">${tag}</a>`).join('');
      val = `<div><time datetime=${date}>${date}</time><span class=tags>${tags}</span></div>\n`;
    }
    val += `<h${node.depth}>${node.value}</h${node.depth}>\n`;

    return val;
  },
  Document:   (node) => node.value,
  Paragraph:  (node) => `<p>${node.value}\n`,
  CodeBlock:  (node) => `<pre lang=${node.lang}>${node.value}</pre>\n`,
  Code:       (node) => `<code>${node.value}</code>`,
  BlockQuote: (node) => `<blockquote>${node.value}</blockquote>`,
  ListItem:   (node) => `<li>${node.value}\n`,
  Link:       (node) => `<a href="${node.href}">${node.value}</a>`,
  Image:      (node) => `<img src=${node.src} alt="${node.alt}" title="${node.title}" >`,
  Strong:     (node) => `<strong>${node.value}</strong>`,
  Emphasis:   (node) => `<em>${node.value}</em>`,
  Html:       (node) => `${node.value}\n`,
  Str:        (node) => node.value,
  Break:          () => `<br>`,
  HorizontalRule: () => `<hr>`,
};

let p = console.log.bind(console);
let j = JSON.stringify.bind(JSON);

let parse = require('markdown-to-ast').parse
  , Syntax = require('markdown-to-ast').Syntax
  , traverse = require('txt-ast-traverse').traverse
  ;

// 改行したく無いタグ
function isInline(node) {
  return [
    Syntax.Str,
    Syntax.Header,
    Syntax.Strong,
    Syntax.Paragraph,
  ].indexOf(node.type) > -1;
}

function sectioning(children, depth) {
  // 最初のセクションは <article> にする
  let section = {
    type: depth === 1 ? 'Article' : 'Section',
    children: [],
    depth: depth,
  };

  // 横に並ぶべき <section> を入れる配列
  let sections = [];
  while (true) {
    // 横並びになっている子要素を取り出す
    let child = children.shift();
    if (child === undefined) break;

    // H2.. が来たらそこで section を追加する
    if (child.type === 'Header') {
      if (section.depth < child.depth) {
        // 一つレベルが下がる場合
        // 今の <section> の下に新しい <section> ができる
        // <section>
        //  <h2>
        //  <section>
        //    <h3> <- これ

        // その h を一旦戻す
        children.unshift(child);

        // そこを起点に再起する
        // そこに <section> ができて、
        // 戻した h を最初にできる
        Array.prototype.push.apply(section.children, sectioning(children, child.depth));
        continue;
      }
      else if (section.depth === child.depth) {
        // 同じレベルの h の場合
        // 同じレベルで別の <section> を作る必要がある
        // <section>
        //  <h2>
        // </section>
        // <section>
        //  <h2> <- これ

        // そこまでの sections を一旦終わらせて
        // 親の child に追加する
        // そして、同じレベルの新しい <section> を開始
        if (section.children.length > 0) {
          sections.push(section);
          section = {
            type: 'Section',
            children: [],
            depth: child.depth,
          };
        }
        // もし今 section に子要素が無ければ
        // そのまま今の section に追加して良い
      }
      else if (section.depth > child.depth) {
        // レベルが一つ上がる場合
        // 今は一つ下がったレベルで再帰している最中だったが
        // それが終わったことを意味する
        // <section>
        //   <h2>
        //   <section>
        //     <h3>
        //     <p>
        //   <h2> <- 今ここ

        // その h を一旦戻す
        children.unshift(child);

        // ループを終わらせ関数を一つ抜ける
        break;
      }
    }

    // 今の <section> の子要素として追加
    section.children.push(child);
  }

  // 最後のセクションを追加
  sections.push(section);

  // そこまでの <section> のツリーを返す
  // 再帰している場合は、親の <section> の
  // childrens として使われる
  return sections;
}

function build(AST, date, template) {
  // 結果を入れるスタック
  // push => unshift()
  // pop  => shift()
  // top  => [0]
  let stack = [];

  let codes = [];

  // トラバース
  traverse(AST, {
    enter(node) {
      // enter では、 inline 属性を追加し
      // stack に詰むだけ
      // 実際は、pop 側で整合検証くらいしか使ってない

      node.inline = isInline(node.type);
      stack.unshift(node);
    },
    leave(node) {
      if (node.type === 'CodeBlock') {
        codes.push(node.value);
        node.value = `// ${codes.length}`;
      }
      if (node.value) {
        // value があったら、 Str とか

        // pop して
        let top = stack.shift();
        // 対応を確認
        if (top.type !== node.type) console.error('ERROR', top, node);

        // 閉じる
        stack.unshift({ tag: 'full', val: template[node.type](node), inline: isInline(node) });
      } else {
        // 完成している兄弟タグを集めてきて配列に並べる
        let vals = [];

        while (stack[0].tag === 'full') {
          let top = stack.shift();

          if (top.inline && vals[0] && vals[0].inline) {
            // 取得したのが inline で、一個前も inline だったら
            // inline どうしをくっつける
            let val = vals.shift();
            val.val = top.val + val.val;
            vals.unshift(val);
          } else {
            // そうで無ければただの兄弟要素
            vals.unshift(top);
          }
        }

        // タグを全部連結する
        vals = vals.map((val) => val.val).join('').trim();

        // それを親タグで閉じる
        let top = stack.shift();
        if (top.type !== node.type) console.error('ERROR', top, node);

        // 今見ているのが Paragraph で
        if (node.type === 'Paragraph') {
          // その親が P いらないタグ だったら
          if (['ListItem', 'BlockQuote'].indexOf(stack[0].type) > -1) {
            // Paragraph を消すために Str に差し替える
            // Str はタグをつけない
            node = { type: 'Str' };
          }
        }

        node.value = vals;
        stack.unshift({ tag: 'full', val: template[node.type](node), inline: isInline(node) });
      }
    },
  });

  // 結果の <article> 結果
  let article = stack[0].val;

  let result = template['HTML'](article);

  codes.forEach((code, i) => {
    code = code.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#039;');

    result = result.replace(`// ${i+1}`, code);
  });

  return result;
}

if (process.argv.length < 3) {
  console.error('no file name');
  process.exit(1);
}

let path = require('path');
let fs = require('fs');
let file = path.parse(process.argv[2]);
let date = file.dir.split('/')[1];
let name = file.name;

// simple html
((simple) => {
  let ast = parse(fs.readFileSync(path.format(file)).toString());
  ast.children = sectioning(ast.children, 1);
  let filename = path.format({ dir: file.dir, base: `${name}.html` });
  let article = build(ast, date, simple);
  fs.writeFileSync(filename, article);
})(Simple);

// amp html
((amp) => {
  amp.HTML = (article) =>
`<!DOCTYPE html>
<html amp>
<head>
<meta charset=utf-8>
<link rel=canonical href=${Simple.Canonical}>
<meta name=viewport content="width=device-width,minimum-scale=1">
<style>body {opacity: 0}</style><noscript><style>body {opacity: 1}</style></noscript>
<title>${Simple.title} | blog.jxck.io</title>
<script async src=https://cdn.ampproject.org/v0.js></script>
<style amp-custom>
${Simple.Style}
</style>
</head>
<body>
<header>
  <a class=logo href=/>blog.jxck.io</a>
</header>
${article}
<hr>
<footer>
  <address class=copyright>Copyright &copy; 2016 <a href=/>Jxck</a>. All Rights Reserved.</address>
</footer>
</body>
</html>`;

  let ast = parse(fs.readFileSync(path.format(file)).toString());
  ast.children = sectioning(ast.children, 1);
  let filename = path.format({ dir: file.dir, base: `${name}.amp.html` });
  amp.Canonical = path.format({ dir: file.dir, base: `${name}.html` });
  amp.Style = fs.readFileSync("assets/style.css").toString();
  let article = build(ast, date, amp);
  fs.writeFileSync(filename, article);
})(Simple);
