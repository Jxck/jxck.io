"use strict";
var parse = require("markdown-to-ast").parse,
    Syntax = require("markdown-to-ast").Syntax;
var traverse = require("txt-ast-traverse").traverse;

var AST = parse(`
a

- 1
- 2

`)
// var AST = parse(require('fs').readFileSync('./blog.md').toString())


var p = console.log.bind(console);

function isInline(ast) {
  return [
    Syntax.Str,
    Syntax.Header,
  ].indexOf(ast.type) > -1
}

var stack = [];

traverse(AST, {
  enter(node) {
    console.log("enter", node.type);
    stack.unshift({ tag: 'o', val: `<${node.type}>` })
  },
  leave(node) {
    debugger;
    console.log("leave", node.type, stack)
    if (node.value) {
      let top = stack.shift();
      if (top.tag === 'o') {
        stack.unshift({ tag: 'f', val: `\n${top.val}\n--${node.value}\n</${node.type}>`})
      }
    } else {
      let vals = [];
      while(stack[0].tag === 'f') {
        vals.push(stack.shift().val);
      }
      vals = vals.reverse().join('').replace(/\n/gm, '\n--')
      let top = stack.shift();
      stack.unshift({ tag: 'f', val: `\n${top.val}${vals}\n</${node.type}>` })
    }
  }
});

p('==========')
p(stack[0].val)

traverse('', {
  enter(node) {
    // console.log("enter", node.type);
    switch (node.type) {
      case Syntax.Document:
        html += bo`<body>`;
        break;
      case Syntax.Paragraph:
        console.log(state)
        //if (state.length === 1) {
        //  html += `\n<p>`;
        //}
        html += bo`<p>`;
        break;
      case Syntax.BlockQuote:
        html += bo`<blockquote>`;
        // state.unshift(Syntax.BlockQuote);
        break;
      case Syntax.ListItem:
        // state.unshift(Syntax.ListItem);
        html += bo`<li>`;
        break;
      case Syntax.List:
        html += node.ordered ? bo`<ol>`: bo`<ul>`;
        break;
      case Syntax.Header:
        console.log(state);
        for (;isFinite(state[0]) && state[0] >= node.depth;) {
          state.shift();
          html += bc`</section>`;
        }
        html += bo`<section>`;
        state.unshift(node.depth)
        html += bo`<h${node.depth}>`;
        break;
      case Syntax.CodeBlock:
        html += bo`<pre lang="${node.lang}">`
        html += node.value;
        break;
      case Syntax.HtmlBlock:
        break;
      case Syntax.ReferenceDef:
        break;
      case Syntax.Str:
        html += node.raw
        break;
      case Syntax.Break:
        break;
      case Syntax.Emphasis:
        html += io`<em>`;
        break;
      case Syntax.Strong:
        html += io`<strong>`
        break;
      case Syntax.Html:
        html += io`${node.value}`;
        break;
      case Syntax.Link:
        html += io`<a href="${node.href}">`;
        break;
      case Syntax.Img:
        break;
      case Syntax.Code:
        html += io`<code>${node.value}`;
        break;
      default:
    }
    state.unshift(node.type)
  },
  leave(node) {
    // console.log("leave", node.type);
    switch (node.type) {
      case Syntax.Document:
        for (;isFinite(state[0]);) {
          html += bc`</section>`;
          state.shift();
        }
        html += bc`</body>`;
        break;
      case Syntax.Paragraph:
        //if (state.length === 2) {
        //  html += `</p>`;
        //}
        html += bc`</p>`;
        break;
      case Syntax.BlockQuote:
        // state.shift();
        html += bc`</blockquote>`;
        break;
      case Syntax.ListItem:
        html += bc`</li>`;
        // state.shift();
        break;
      case Syntax.List:
        html += node.ordered ? bc`</ol>`: bc`</ul>`;
        break;
      case Syntax.Header:
        html += bc`</h${node.depth}>`;
        break;
      case Syntax.CodeBlock:
        html += bc`</pre>`;
        break;
      case Syntax.HtmlBlock:
        break;
      case Syntax.ReferenceDef:
        break;
      case Syntax.Str:
        break;
      case Syntax.Break:
        break;
      case Syntax.Emphasis:
        html += ic`</em>`;
        break;
      case Syntax.Strong:
        html += ic`</strong>`;
        break;
      case Syntax.Html:
        break;
      case Syntax.Link:
        html += ic`</a>`;
        break;
      case Syntax.Image:
        html += ic`<img src="${node.src}" alt="${node.alt}" title="${node.title}">`
        break;
      case Syntax.Code:
        html += ic`</code>`;
        break;
      default:
    }
    state.shift()
  }
});
