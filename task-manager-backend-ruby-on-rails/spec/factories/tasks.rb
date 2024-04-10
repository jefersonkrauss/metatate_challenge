# == Schema Information
#
# Table name: tasks
#
#  id                  :bigint           not null, primary key
#  description         :text
#  is_deleted          :boolean          default(FALSE), not null
#  title               :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  project_id          :bigint           not null
#  responsible_user_id :bigint           not null
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
FactoryBot.define do
  factory :task do
    project { nil }
    column { nil }
    title { "MyString" }
    description { "MyText" }
    responsible_user { nil }
    is_deleted { false }
  end
end
