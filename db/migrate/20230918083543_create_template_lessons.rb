class CreateTemplateLessons < ActiveRecord::Migration[6.0]
  def change
    create_table :template_lessons do |t|
      t.integer :day_of_week, null:false
      t.integer :period, null:false
      t.references :grade_subject, null: false
      t.timestamps
    end
  end
end
