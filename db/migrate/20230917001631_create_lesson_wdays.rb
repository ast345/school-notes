class CreateLessonWdays < ActiveRecord::Migration[6.0]
  def change
    create_table :lesson_wdays do |t|
      t.references :school_class, null: false
      t.date :start_of_week, null:false
      t.boolean :monday, null:false, default: true
      t.boolean :tuesday, null:false, default: true
      t.boolean :wednesday, null:false, default: true
      t.boolean :thursday, null:false, default: true
      t.boolean :friday, null:false, default: true
      t.boolean :saturday, null:false, default: false
      t.boolean :sunday, null:false, default: false
      t.timestamps
    end
  end
end
