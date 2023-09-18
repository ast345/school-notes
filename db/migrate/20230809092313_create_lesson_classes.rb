class CreateLessonClasses < ActiveRecord::Migration[6.0]
  def change
    create_table :lesson_classes do |t|
      t.references :school_class , null:false
      t.references :lesson, null:false
      t.timestamps
    end
  end
end
