class CreateTemplateClassLeavingTimes < ActiveRecord::Migration[6.0]
  def change
    create_table :template_class_leaving_times do |t|
      t.time :leaving_time
      t.integer :day_of_week
      t.references :school_class, null: false
      t.timestamps
    end
    add_index :template_class_leaving_times, [:day_of_week, :school_class_id], unique: true, name: "temp_leav_times_validates"
  end
end
