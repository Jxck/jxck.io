#!/usr/bin/env ruby
Dir.glob("./**/*.md").each {|path|
  txt = File.read(path)
    .gsub(/http\:\/\/t.umblr.com\/redirect\?z=/, '')
    .gsub(/(%3A)/, ':')
    .gsub(/(%2F)/, '/')
    .gsub(/&t=(.*?)\)/, ')')
  File.write(path, txt)
}
