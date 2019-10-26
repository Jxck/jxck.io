require 'rouge'

class MonoIdtag < Rouge::Formatters::HTML
  def safe_span(token, safe_val)
    return safe_val if token == Rouge::Token::Tokens::Text

    classes = token.qualname.split(".")

    return "<CharStyle:#{self.classname(classes)}>#{safe_val}<CharStyle:>"
  end

  def classname(classes)
    return ("RegularSilverItalic") if classes.include?("Comment")
    return ("RegularSilverItalic") if classes.include?("String")
    return ("RegularDark"        ) if classes.include?("Number")
    return ("RegularDark"        ) if classes.include?("Operator")
    return ("BoldBlack"          ) if classes.include?("Label")
    return ("BoldBlack"          ) if classes.include?("Tag")
    return ("BoldGray"           ) if classes.include?("Name")
    return ("BoldBlack"          ) if classes.include?("Keyword")
    classes.join(" ")
  end
end

