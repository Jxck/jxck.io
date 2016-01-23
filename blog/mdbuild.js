#!/usr/bin/env node

'use strict';
let p = console.log.bind(console);
let j = JSON.stringify.bind(JSON);

let parse = require('markdown-to-ast').parse,
    Syntax = require('markdown-to-ast').Syntax;
let traverse = require('txt-ast-traverse').traverse;

let file = process.argv[2];
let AST = parse(require('fs').readFileSync(file).toString());

let indent = `  `

function isInline(node) {
  return [
    Syntax.Str,
    Syntax.Header,
    Syntax.Strong,
    Syntax.Paragraph
  ].indexOf(node.type) > -1;
}

function time() {
  let d = new Date();
  let yyyy = d.getFullYear();
  let mm = d.getMonth()+1;
  let dd = d.getDate();
  return `${yyyy}-${mm}-${dd}`
}

function sectioning(children, depth) {
  let section = {
    type: depth === 1 ? 'Article' : 'Section',
    children: [],
    depth: depth
  };
  let sections = [];
  while (true) {
    let child = children.shift();
    if (child == undefined) break;

    if (child.type === 'Header') {
      if (section.depth < child.depth) {
        // 次が子

        // その h を一旦戻す
        children.unshift(child);

        // そこを起点に再起する
        Array.prototype.push.apply(section.children, sectioning(children, child.depth));
        continue;
      }
      else if (section.depth == child.depth) {
        // 次が兄弟

        // そこまでの section を一旦終わらせて
        // 親に追加する
        if (section.children.length > 0) {
          sections.push(section);
          section = {
            type: 'Section',
            children: [],
            depth: child.depth
          };
        }
      }
      else if (section.depth > child.depth) {
        // 次が親

        // その h を一旦戻す
        children.unshift(child);

        // ループを終わらせ関数を一つ抜ける
        break;
      }
    }

    // 今のセクションに追加
    section.children.push(child);
  }

  // 最後のセクションを追加
  sections.push(section);

  return sections;
}

let html = {
  Document: (node) => node.value,
  Article: (node) => {
    let value = ('\n' + node.value).replace(/\n/gm, `\n${indent}`);
    return `<article>${value}\n</article>`;
  },
  Section: (node) => {
    let value = ('\n' + node.value).replace(/\n/gm, `\n${indent}`);
    return `<section>${value}\n</section>\n`
  },
  List:      (node) => {
    let value = ('\n' + node.value).replace(/\n/gm, `\n${indent}`);
    return node.ordered ? `<ol>${value}\n</ol>\n`: `<ul>${value}\n</ul>\n`;
  },
  Paragraph: (node) => `<p>${node.value}\n`,
  Header:    (node) => {
    let val = ""
    if (node.depth === 1) {
      let t = node.value.split(' | ')
      node.value = t[0]
      title = node.value

      if (t[1] === undefined) {
        console.error("\x1b[0;31mThere is No TAGS\x1b[0m")
        process.exit(1)
      }
      let tags = t[1].split(',').map(tag => `<a href="/tags/${tag}">${tag}</a>`).join('')
      val = `<div><time datetime=${time()}>${time()}</time><span class=tags>${tags}</span></div>\n`
    }
    val += `<h${node.depth}>${node.value}</h${node.depth}>\n`

    return val
  },
  CodeBlock: (node) => `<pre lang="${node.lang}">${node.value}</pre>\n`,
  Code:      (node) => `<code>${node.value}</code>`,
  BlockQuote:(node) => `<blockquote>${node.value}</blockquote>`,
  ListItem:  (node) => `<li>${node.value}\n`,
  Link:      (node) => `<a href="${node.href}">${node.value}</a>`,
  Image:     (node) => `<img src="${node.src}" alt="${node.alt}" title="${node.title}" >`,
  Strong:    (node) => `<strong>${node.value}</strong>`,
  Emphasis:  (node) => `<em>${node.value}</em>`,
  Html:      (node) => `${node.value}\n`,
  Str:       (node) => node.value,
  Break:     (node) => `<br>`,
  HorizontalRule:() => `<hr>`,
}

AST.children = sectioning(AST.children, 1);

let title = "";

let stack = [];

function build(AST) {
  traverse(AST, {
    enter(node) {
      node.inline = isInline(node.type)
      stack.unshift(node)
    },
    leave(node) {
      if (node.value) { // value があったら
        // pop して
        let top = stack.shift();
        if (top.type !== node.type) console.error('ERROR', top, node);

        // 閉じる
        stack.unshift({ tag: 'full', val: html[node.type](node), inline: isInline(node) });
      } else {
        let vals = [];

        // 完成している兄弟タグを集めてきて配列に並べる
        while(stack[0].tag === 'full') {
          let top = stack.shift();
          // 取得したのが inline ですでに前に inline があったら
          if (top.inline && vals[0] && vals[0].inline) {
            // inline どうしをくっつける
            let val = vals.shift();
            val.val = top.val + val.val;
            vals.unshift(val)
          } else {
            vals.unshift(top);
          }
        }
        // 連結する
        vals = vals.map((val) => val.val).join('').trim()

        // それを親タグで閉じる
        let top = stack.shift();
        if (top.type !== node.type) console.error('ERROR', top, node);

        // 今見ているのが Paragraph で
        if(node.type === 'Paragraph') {
          // その親が ListItem だったら
          if (['ListItem', 'BlockQuote'].indexOf(stack[0].type) > -1) {
            // Paragraph を消すために Str に差し替える
            node = {
              type: "Str"
            }
          }
        }

        node.value = vals
        stack.unshift({ tag: 'full', val: html[node.type](node), inline: isInline(node) });
      }
    }
  });

  return stack[0].val
}

let article = build(AST)

p(`
<!DOCTYPE html>
<meta charset=utf-8>
<meta http-equiv=X-UA-Compatible content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${title} | blog.jxck.io</title>
<link rel=stylesheet type=text/css href=style.css>

<header>
  <a class=logo href=/>blog.jxck.io</a>
</header>

${article}

<hr>

<footer>
  <address class="copyright">Copyright &copy; 2016 <a href="/">Jxck</a>. All Rights Reserved.</address>
</footer>
`);
