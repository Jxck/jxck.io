require "./.script/builder/blog_builder.rb"
require "./.script/builder/podcast_builder.rb"
require "./.script/builder/idtag_builder.rb"

module Builder
  class Builder
    def initialize(format)
      @format = format
    end
    def build(path)
      dir  = File.dirname(path)
      body = File.read(path)
      ast  = AST.new(body).ast
      traverser = Traverser.new(@format, dir)
      result = traverser.start(ast)
    end
  end
end
