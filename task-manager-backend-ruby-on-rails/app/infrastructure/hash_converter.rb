class HashConverter

  BASIC_TYPES = [String, Integer, FalseClass, TrueClass, NilClass, Float, Symbol, DateTime, Numeric].freeze

  def to_h
    convert(self)
  end

  def to_hash
    convert(self)
  end

  def convert(node)
    node.instance_variables.map do |var|
      value = node.instance_variable_get(var)
      value = convert_value(value)
      [var[1..-1].to_sym, value]
    end.to_h.deep_symbolize_keys
  end

  private

  def convert_value(value)
    if value.is_a?(Array)
      value = value.map { |array_node| convert_value(array_node) } if value.is_a?(Array)
    elsif value.is_a?(Hash)
      value = value.transform_values { |v| convert_value(v) }
    else
      value = convert(value) unless BASIC_TYPES.include?(value.class)
    end
    value
  end

end
