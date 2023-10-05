class CreateMorningActivities < ActiveRecord::Migration[6.0]
  def change
    create_table :morning_activities do |t|
      t.string :activity_name, null: false
      t.date :date
      t.integer :day_of_week
      t.references :school_class, null: false
      t.timestamps
    end

    add_index :morning_activities, [:date, :school_class_id], unique: true
  end
end
