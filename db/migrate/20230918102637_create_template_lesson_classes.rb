class CreateTemplateLessonClasses < ActiveRecord::Migration[6.0]
  def change
    create_table :template_lesson_classes do |t|
      t.references :school_class , null:false
      t.references :template_lesson, null:false
      t.timestamps
    end
  end
end
