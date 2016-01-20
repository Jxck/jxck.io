var parse = require("markdown-to-ast").parse,
    Syntax = require("markdown-to-ast").Syntax;
var traverse = require("txt-ast-traverse").traverse,
    VisitorOption = require("txt-ast-traverse").VisitorOption;

var AST = parse(`
## 111

aaa

### 222

bbb

#### asdf

## 111

ccc

### 222

ddd
`)
// var AST = parse(require('fs').readFileSync('./blog.md').toString())

var html = "";
var state = [];

traverse(AST, {
  enter(node) {
    // console.log("enter", node.type);
    switch (node.type) {
      case Syntax.Document:
        html += "<body>";
        break;
      case Syntax.Paragraph:
        console.log(state)
        //if (state.length === 1) {
        //  html += "\n<p>";
        //}
      html += "\n<p>";
        break;
      case Syntax.BlockQuote:
        html += `\n<blockquote>`;
        // state.unshift(Syntax.BlockQuote);
        break;
      case Syntax.ListItem:
        // state.unshift(Syntax.ListItem);
        html += `\n<li>`;
        break;
      case Syntax.List:
        html += node.ordered ? '\n<ol>': '\n<ul>';
        break;
      case Syntax.Header:
        for (;isFinite(state[0]) && state[0] >= node.depth;) {
          html += `\n</section>\n`;
          state.shift();
        }
        state.unshift(node.depth)
        html += `\n<section>`;
        html += `\n<h${node.depth}>`;
        break;
      case Syntax.CodeBlock:
        html += `\n<pre lang="${node.lang}">`
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
        html += `\n<em>`;
        break;
      case Syntax.Strong:
        html += `\n<strong>`
        break;
      case Syntax.Html:
        html += '\n' + node.value
        break;
      case Syntax.Link:
        html += `\n<a href="${node.href}">`;
        break;
      case Syntax.Img:
        break;
      case Syntax.Code:
        html += `\n<code>${node.value}`;
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
          html += `\n</section>\n`;
          state.shift();
        }
        html += "</body>";
        break;
      case Syntax.Paragraph:
        //if (state.length === 2) {
        //  html += "</p>";
        //}
        html += "</p>";
        break;
      case Syntax.BlockQuote:
        // state.shift();
        html += `</blockquote>`;
        break;
      case Syntax.ListItem:
        html += '</li>';
        // state.shift();
        break;
      case Syntax.List:
        html += node.ordered ? '</ol>': '</ul>';
        break;
      case Syntax.Header:
        html += `<h${node.depth}>`;
        break;
      case Syntax.CodeBlock:
        html += "</pre>";
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
        html += `</em>`;
        break;
      case Syntax.Strong:
        html += `</strong>`;
        break;
      case Syntax.Html:
        break;
      case Syntax.Link:
        html += `</a>`;
        break;
      case Syntax.Image:
        html += `<img src="${node.src}" alt="${node.alt}" title="${node.title}">`
        break;
      case Syntax.Code:
        html += `</code>`;
        break;
      default:
    }
    state.shift()
  }
});

console.log(html)

// var open = {
//   Syntax.Document       : "<body>"       ,
//   Syntax.Paragraph      : "<p>"          ,
//   Syntax.BlockQuote     : "<blockquote>" ,
//   Syntax.ListItem       : ""             ,
//   Syntax.List           : ""             ,
//   Syntax.Header         : ""             ,
//   Syntax.CodeBlock      : "<code>"       ,
//   Syntax.HtmlBlock      : ""             ,
//   Syntax.ReferenceDef   : ""             ,
//   Syntax.HorizontalRule : "<hr>"         ,
//   Syntax.Str            : ""             ,
//   Syntax.Break          : "<br>"         ,
//   Syntax.Emphasis       : "<em>"         ,
//   Syntax.Strong         : "<strong>"     ,
//   Syntax.Html           : "<html>"       ,
//   Syntax.Link           : ""             ,
//   Syntax.Image          : ""             ,
//   Syntax.Code           : ""             ,
// }

