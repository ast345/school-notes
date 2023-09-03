class AddNotNullConstraintToLeavingTime < ActiveRecord::Migration[6.0]
  def change
    change_column_null :class_leaving_times, :leaving_time, false
  end
end
