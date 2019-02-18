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
    if tok == Rouge::Token::Tokens::Text
      safe_val
    else
      "<span class=\"#{tok.name}\">#{safe_val}</span>"
    end
  end
end

#formatter = Rouge::Formatters::HTML.new #Inao.new
formatter = LongHTML.new #Inao.new


js   = formatter.format(Rouge::Lexers::Javascript.new.lex(File.read('demo/script.js')))
css  = formatter.format(Rouge::Lexers::CSS.new.lex(       File.read('demo/style.css')))
html = formatter.format(Rouge::Lexers::HTML.new.lex(      File.read('demo/sample.html')))
http = formatter.format(Rouge::Lexers::HTTP.new.lex(      File.read('demo/http')))
ruby = formatter.format(Rouge::Lexers::Ruby.new.lex(      File.read('mono.rb')))


out = <<EOF
<!DOCTYPE html>
<meta charset=utf-8>
<meta name=viewport content="width=device-width,initial-scale=1">
<title>DEMO</title>

<link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet">

<link rel=stylesheet href=mono.css>


<pre class="highlight js">#{js}</pre>
<pre class="highlight css">#{css}</pre>
<pre class="highlight html">#{html}</pre>
<pre class="highlight js">#{ruby}</pre>
<pre class="highlight http">#{http}</pre>
EOF

open("index.html", "w") {|io| io.write(out)}
