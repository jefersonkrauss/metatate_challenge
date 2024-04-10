# == Schema Information
#
# Table name: projects
#
#  id          :bigint           not null, primary key
#  description :text
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#  workflow_id :bigint           not null
#
# Indexes
#
#  index_projects_on_user_id      (user_id)
#  index_projects_on_workflow_id  (workflow_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#  fk_rails_...  (workflow_id => workflows.id)
#
FactoryBot.define do
  factory :project do
    user { nil }
    workflow { nil }
    name { "MyString" }
    description { "MyText" }
  end
end
