#!/usr/bin/env ruby

# Show Note から単語を抽出
def keyword(file)
  File.read(file)
    .match(/## Show Note(.*)/m)[1]
    .gsub(/^\w*- /, "")
    .gsub(/[#\[\]\(\)]/, " ")
    .gsub(/http(s?):.*/, " ")
    .gsub(/[\'\"\,\;\:\*\/\<\>\!\`、。「」]/, " ")
    .downcase
    .split(" ")
    .reject{|c| c.size == 1 }
    .reject{|c| /^[\d\.\-\/\~\:\_]+$/ =~ c } # 日付や時間や数字
    .reject{|c| /^\d\-\>\d+$/ =~ c } # 1->2
    .sort.uniq
end

def main()
  dir  = "./mozaic.fm/episodes/**/*.md"
  result = Dir.glob(dir).map{|file|
    keyword(file)
  }

  result.each{|line|
    puts line.join("\n")
    puts "========"
  }

  #puts result.flatten.sort.uniq.join("\n")
end

if __FILE__ == $0
  main()
end
