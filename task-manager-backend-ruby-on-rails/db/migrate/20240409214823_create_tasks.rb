class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.references :project, null: false, foreign_key: true
      t.references :workflow_column, null: false, foreign_key: true
      t.string :title, null: false
      t.text :description
      t.references :responsible_user, index: true, foreign_key: { to_table: :users }, null: true
      t.boolean :is_deleted, null: false, default: false

      t.timestamps
    end
  end
end
