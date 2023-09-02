class CreateAddUniqueIndexToClassLeavingTimes < ActiveRecord::Migration[6.0]
  def change
    add_index :class_leaving_times, [:date, :school_class_id], unique: true
  end
end
