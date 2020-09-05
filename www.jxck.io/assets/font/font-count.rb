#!/usr/bin/env ruby

def main()
  path = "#{ENV['SERVER']}/jxck.io"
  result =
    Dir.glob([
      "#{path}/blog.jxck.io/entries/**/*.md",
      "#{path}/mozaic.fm/episodes/**/*.md",
    ])
       .map{|file|
          # 全文字の出現頻度を数え 1 回だけのものを数える
          File.read(file).split('')
      }.flatten
       .group_by{|e| e}
       .map{|k, v| [v.size, k] }
       .sort
       .filter{|count, word| count == 1}
       .map{|count, word| word}

  p result

  result.each{|char|
    puts `grep --color=always #{char} #{path}/**/**/**/*.md`
      .gsub("#{path}/blog.jxck.io/entries", '')
      .gsub("#{path}/mozaic.fm/episodes", '')
      .gsub("#{path}/labs.jxck.io/.*", '')
  }
end

if __FILE__ == $0
  main
end
