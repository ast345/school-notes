class AddUniqueIndexToDateItems < ActiveRecord::Migration[6.0]
  def change
    add_index :date_items, [:date, :school_class_id], unique: true
  end
end
