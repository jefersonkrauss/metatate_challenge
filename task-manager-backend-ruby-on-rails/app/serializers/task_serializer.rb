class TaskSerializer
  include JSONAPI::Serializer

  attributes :id, :project_id, :workflow_column_id, :position, :title, :description, :responsible, :created_at, :updated_at

  def attributes
    serializable_hash[:data][:attributes]
  end
end
