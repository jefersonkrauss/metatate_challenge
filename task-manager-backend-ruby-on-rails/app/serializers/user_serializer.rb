class UserSerializer
  include JSONAPI::Serializer

  attributes :id, :email, :name, :avatar

  def attributes
    serializable_hash[:data][:attributes]
  end
end
