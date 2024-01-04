class CreateTemplateBreakActivities < ActiveRecord::Migration[6.0]
  def change
    create_table :template_break_activities do |t|
      t.string :activity_name, null: false
      t.integer :day_of_week, null: false
      t.references :school_class, null: false
      t.timestamps
    end

    add_index :template_break_activities, [:day_of_week, :school_class_id], unique: true, name: "temp_b_act_validates"
  end
end
