#!/usr/bin/env ruby

require 'rouge'

TABLE_FOR_ESCAPE_HTML = {
  '&' => '&amp;',
  '<' => '&lt;',
  '>' => '&gt;',
}

class Inao < Rouge::Formatters::Null
  # @yield the html output.
  def stream(tokens, &b)
    tokens.each { |token, val| yield span(token, val) }
  end

  def span(token, val)
    safe_span(token, val.gsub(/[&<>]/, TABLE_FOR_ESCAPE_HTML))
  end

  def safe_span(token, safe_val)
    if token == Rouge::Token::Tokens::Text
      if safe_val == "\n\n\n"
        "\n<ParaStyle:半行アキ>\n<ParaStyle:半行アキ>\n"
      elsif safe_val == "\n\n"
        "\n<ParaStyle:半行アキ>\n"
      elsif safe_val.start_with?("\n ")
        safe_val.sub("\n", "\n<ParaStyle:リスト>")
      else
        safe_val
      end
    else
      "<CharStyle:#{token.name}>#{safe_val}<CharStyle:>"
    end
  end
end

class LongHTML < Rouge::Formatters::HTML
  def safe_span(tok, safe_val)
    return safe_val if tok == Rouge::Token::Tokens::Text

    classes = tok.qualname.split(".")

    return "<span class=\"#{self.classname(classes)}\">#{safe_val}</span>"
  end

  def classname(classes)
    return "RegularSilverItalic" if classes.include?("Comment")
    return "RegularSilverItalic" if classes.include?("String")
    return "RegularDark"         if classes.include?("Number")
    return "RegularDark"         if classes.include?("Operator")
    return "BoldBlack"           if classes.include?("Label")
    return "BoldBlack"           if classes.include?("Tag")
    return "BoldGray"            if classes.include?("Name")
    return "BoldBlack"           if classes.include?("Keyword")

    p classes
    classes.join(" ")
  end
end

#formatter = Rouge::Formatters::HTML.new #Inao.new
formatter = LongHTML.new #Inao.new


ruby  = formatter.format(Rouge::Lexers::Ruby.new.lex(      File.read('mono.rb')))

js    = formatter.format(Rouge::Lexers::Javascript.new.lex(File.read('demo/script.js')))
css   = formatter.format(Rouge::Lexers::CSS.new.lex(       File.read('demo/style.css')))
html  = formatter.format(Rouge::Lexers::HTML.new.lex(      File.read('demo/sample.html')))
http  = formatter.format(Rouge::Lexers::HTTP.new.lex(      File.read('demo/http')))
nginx = formatter.format(Rouge::Lexers::Nginx.new.lex(     File.read('demo/nginx.conf')))
java  = formatter.format(Rouge::Lexers::Java.new.lex(      File.read('demo/sample.java')))
go    = formatter.format(Rouge::Lexers::Go.new.lex(        File.read('demo/sample.go')))
make  = formatter.format(Rouge::Lexers::Make.new.lex(      File.read('demo/Makefile')))


out = <<EOF
<!DOCTYPE html>
<meta charset=utf-8>
<meta name=viewport content="width=device-width,initial-scale=1">
<title>DEMO</title>

<link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet">

<link rel=stylesheet href=mono.css>

<body class=white>
  <button id=toggle>toggle</button>

  <pre>
    <span>this is thin &amp; silver (他のスタイルが当たらない場合のベース、中括弧やセミコロンなど)</span>
    <span class=RegularDark>this is regular &amp; dark (数値と演算子)</span>
    <span class=RegularSilverItalic>this is regular &amp; silver &amp; italic (コメントと文字列)</span>
    <span class=BoldBlack>this is bold &amp; black (構文キーワードなど)</span>
    <span class=BoldGray>this is bold &amp; gray (変数関数クラス名など)</span>
  </pre>

  <pre class="highlight js">#{js}</pre>
  <pre class="highlight css">#{css}</pre>
  <pre class="highlight html">#{html}</pre>
  <pre class="highlight http">#{http}</pre>
  <pre class="highlight nginx">#{nginx}</pre>
  <pre class="highlight java">#{java}</pre>
  <pre class="highlight ruby">#{ruby}</pre>
  <pre class="highlight go">#{go}</pre>
  <pre class="highlight make">#{make}</pre>
</body>

<script>
document.querySelector('button').addEventListener('click', (e) => {
  const value = document.body.classList.value
  if (value === 'white') {
    document.body.classList.value = 'dark'
  } else {
    document.body.classList.value = 'white'
  }
})
</script>

EOF

open("index.html", "w") {|io| io.write(out)}
