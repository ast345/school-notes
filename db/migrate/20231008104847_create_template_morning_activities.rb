class CreateTemplateMorningActivities < ActiveRecord::Migration[6.0]
  def change
    create_table :template_morning_activities do |t|
      t.string :activity_name, null: false
      t.integer :day_of_week, null: false
      t.references :school_class, null: false
      t.timestamps
    end

    add_index :template_morning_activities, [:day_of_week, :school_class_id], unique: true, name: "temp_m_act_validates"
  end
end
