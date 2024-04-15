class AddPositionColumnToTask < ActiveRecord::Migration[7.1]
  def change
    add_column :tasks, :position, :integer, null: false, default: 1
  end
end
