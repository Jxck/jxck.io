"use strict";
var p = console.log.bind(console);
var j = JSON.stringify.bind(JSON);

var parse = require("markdown-to-ast").parse,
    Syntax = require("markdown-to-ast").Syntax;
var traverse = require("txt-ast-traverse").traverse;

var AST = parse(`
# h1

aaa **bbb** ccc
`)
// var AST = parse(require('fs').readFileSync('./blog.md').toString())

function sectioning(children, depth) {
  let section = {
    type: 'Section',
    children: [],
    depth: depth,
  }
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
        Array.prototype.push.apply(section.children, sectioning(children, child.depth))
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
            depth: child.depth,
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

  return sections
}

AST.children = sectioning(AST.children, 1)


function isInline(node) {
  return [
    Syntax.Str,
    Syntax.Header,
    Syntax.Strong,
    Syntax.Paragraph
  ].indexOf(node.type) > -1;
}



var html = {
  Document: (node)  => {
    let value = ('\n' + node.value).replace(/\n/gm, '\n--');
    return `<article>${value}\n</article>`
  },
  Section: (node)   => {
    let value = ('\n' + node.value).replace(/\n/gm, '\n--');
    return `<section>${value}\n</section>`
  },
  Paragraph: (node) => `<p>${node.value}</p>`,
  Str: (node)       => node.value,
  Header: (node)    => `<h${node.depth}>${node.value}</h${node.depth}>`,
  Strong: (node)    => `<strong>${node.value}</strong>`,
}

var stack = [];
traverse(AST, {
  enter(node) {
    node.inline = isInline(node.type)
    stack.unshift(node)
  },
  leave(node) {
    if (node.value) { // value があったら
      // pop して
      let top = stack.shift();
      if (top.type !== node.type) console.error(top, node);

      // 閉じる
      stack.unshift({ tag: 'full', val: html[node.type](node), inline: isInline(node) });
    } else {
      let vals = [];

      // 完成している兄弟タグを集めてきて配列に並べる
      while(stack[0].tag === 'full') {
        vals.unshift(stack.shift().val);
      }
      // 連結する
      vals = vals.join('\n').trim()

      // それを親タグで閉じる
      let top = stack.shift();
      if (top.type !== node.type) console.error(top, node);

      node.value = vals
      stack.unshift({ tag: 'full', val: html[node.type](node), inline: isInline(node) });
    }
  }
});

p(stack[0].val)

