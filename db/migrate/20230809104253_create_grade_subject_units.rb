class CreateGradeSubjectUnits < ActiveRecord::Migration[6.0]
  def change
    create_table :grade_subject_units do |t|
      t.string :unit_name, null: false
      t.references :grade_subject, null: false
      t.timestamps
    end
  end
end
