class AddUniqueIdexToEvents < ActiveRecord::Migration[6.0]
  def change
    add_index :events, [:date, :school_class_id], unique: true
  end
end
