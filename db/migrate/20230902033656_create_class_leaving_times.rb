class CreateClassLeavingTimes < ActiveRecord::Migration[6.0]
  def change
    create_table :class_leaving_times do |t|
      t.time :leaving_time
      t.date :date
      t.integer :day_of_week
      t.references :school_class, null: false
      t.timestamps
    end
  end
end