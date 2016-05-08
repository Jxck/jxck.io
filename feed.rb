#!/usr/bin/env ruby

require "json"

# html special chars
def hsp(str)
  str.gsub(/&/, "&amp;")
     .gsub(/</, "&lt;")
     .gsub(/>/, "&gt;")
     .gsub(/"/, "&quot;")
     .gsub(/'/, "&#039;")
end

def Feed(dir)
  host = dir.split("/")[1]

  entries = Dir.glob(dir)
  .select { |path| path.match(/.*.md\z/) }
  .sort { |a, b| b <=> a }
  .map { |name|
    href     = name.gsub("./#{host}/", "https://#{host}/").gsub(".md", ".html")
    file     = File.open(name)
    text     = file.read
    title    = text.match(/^# \[.*\] (.*)/)[1]
    summary  = text.match(/## intro(.*?)##/im)[1].strip # .gsub(/\n/, "")
    summary  = hsp(summary)
    splitted = name.split("/")
    date     = splitted[3]
    id       = "tag:#{host},2016:entry://#{date}"
    updated  = "#{date}T00:00:00Z"

    {
      title:   title,
      href:    href,
      id:      id,
      updated: updated,
      summary: summary
    }
  }

  xml_entries = entries.map{|e|
    <<-EOS
  <entry>
   <title>#{e[:title]}</title>
   <link href="#{e[:href]}" rel="alternate" />
   <id>#{e[:id]}</id>
   <updated>#{e[:updated]}</updated>
   <summary>#{e[:summary]}</summary>
  </entry>
    EOS
  }.join("\n")

  xml = <<-EOS
<?xml version='1.0' encoding='UTF-8'?>
<feed xmlns='http://www.w3.org/2005/Atom' xml:lang='ja'>
<title>#{host}</title>
<link rel="alternate" href="https://#{host}/"/>
<link rel="self" type="application/atom+xml" href="https://#{host}/feeds/atom.xml"/>
<author><name>Jxck</name></author>
<id>tag:#{host},2016:feed</id>
<updated>2016-01-28T18:30:02Z</updated>
#{xml_entries}
</feed>
  EOS
  File.write("#{host}/feeds/atom.xml", xml)

  json = JSON.pretty_generate(
    title:     host,
    alternate: "https://#{host}",
    author:    { name: "Jxck" },
    id:        "tag:#{host},2016:feed",
    update:    "2016-01-28T18:30:02Z",
    entry:     entries
  )

  File.write("#{host}/feeds/atom.json", json)
end

Feed("./blog.jxck.io/entries/**/**")
