puts Dir.glob("./**/*.md").select{|file|
  file != "./2016-03-14/web-font-noto-sans.md"
}.map{|file|
  File.read(file).gsub(/(.)/, "\\1\n")
}.join("").split("\n").sort.uniq.join("\n")
