#!/usr/bin/env ruby

# html special chars
def hsp(str)
  str.gsub(/&/, "&amp;")
     .gsub(/</, "&lt;")
     .gsub(/>/, "&gt;")
     .gsub(/"/, "&quot;")
     .gsub(/'/, "&#039;")
end

entries = Dir.glob("./blog.jxck.io/entries/**/**")
             .select { |path| path.match(/.*.md\z/) }
             .sort { |a, b| b <=> a }
             .map { |name|
               href = name.gsub("./blog.jxck.io/", "https://blog.jxck.io/").gsub(".md", ".html")
               file = File.open(name)
               text = file.read
               title = text.match(/^# \[.*\] (.*)/)[1]
               summary = text.match(/## intro(.*?)##/im)[1].strip # .gsub(/\n/, "")
               summary = hsp(summary)
               splitted = name.split("/")
               date = splitted[3]
               id = "tag:blog.jxck.io,2016:entry://#{date}"
               updated = "#{date}T00:00:00Z"

               {
                 title: title,
                 href: href,
                 id: id,
                 updated: updated,
                 summary: summary
               }
             }


xmlEntries = entries.map{|e|
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
<title>blog.jxck.io</title>
<link rel="alternate" href="https://blog.jxck.io/"/>
<link rel="self" type="application/atom+xml" href="https://blog.jxck.io/feeds/atom.xml"/>
<author><name>Jxck</name></author>
<id>tag:blog.jxck.io,2016:feed</id>
<updated>2016-01-28T18:30:02Z</updated>
#{xmlEntries}
</feed>
EOS
File.write("blog.jxck.io/feeds/atom.xml", xml)
