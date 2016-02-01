// amp html
((amp) => {
  let ast = parse(fs.readFileSync(path.format(file)).toString());
  ast.children = sectioning(ast.children, 1);
  let filename = path.format({ dir: file.dir, base: `${name}.amp.html` });
  amp.Canonical = path.format({ dir: file.dir, base: `${name}.html` });
  amp.Style = fs.readFileSync("assets/style.css").toString();
  let article = build(ast, date, amp);
  fs.writeFileSync(filename, article);
})(AMP);
