# == Schema Information
#
# Table name: workflow_columns
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  order       :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  workflow_id :bigint           not null
#
# Indexes
#
#  index_workflow_columns_on_workflow_id  (workflow_id)
#
# Foreign Keys
#
#  fk_rails_...  (workflow_id => workflows.id)
#
FactoryBot.define do
  factory :workflow_column do
    workflow { nil }
    name { "MyString" }
    order { 1 }
  end
end
