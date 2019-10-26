require 'rouge'

class MonoHTML < Rouge::Formatters::HTML
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
    classes.join(" ")
  end
end
