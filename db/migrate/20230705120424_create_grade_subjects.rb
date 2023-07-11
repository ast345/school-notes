class CreateGradeSubjects < ActiveRecord::Migration[6.0]
  def change
    create_table :grade_subjects do |t|
      t.references :grades, foreign_key: true
      t.references :subjects, foreign_key: true
      t.timestamps
    end
  end
end
