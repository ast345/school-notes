class AddUniqueConstraintToLessonWdays < ActiveRecord::Migration[6.0]
  def change
    add_index :lesson_wdays, [:school_class_id, :start_of_week], unique: true
  end
end
