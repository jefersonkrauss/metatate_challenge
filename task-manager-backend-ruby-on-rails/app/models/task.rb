# == Schema Information
#
# Table name: tasks
#
#  id                  :bigint           not null, primary key
#  description         :text
#  is_deleted          :boolean          default(FALSE), not null
#  position            :integer          default(1), not null
#  title               :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  project_id          :bigint           not null
#  responsible_user_id :bigint
#  workflow_column_id  :bigint           not null
#
# Indexes
#
#  index_tasks_on_project_id           (project_id)
#  index_tasks_on_responsible_user_id  (responsible_user_id)
#  index_tasks_on_workflow_column_id   (workflow_column_id)
#
# Foreign Keys
#
#  fk_rails_...  (project_id => projects.id)
#  fk_rails_...  (responsible_user_id => users.id)
#  fk_rails_...  (workflow_column_id => workflow_columns.id)
#
class Task < ApplicationRecord
  belongs_to :project
  belongs_to :workflow_column
  belongs_to :responsible_user, class_name: 'User', optional: true

  scope :active, -> { where(is_deleted: false) }
  scope :ordered, -> { order(position: :asc) }

  def responsible
    return if responsible_user.blank?
    UserSerializer.new(responsible_user).attributes
  end
end
