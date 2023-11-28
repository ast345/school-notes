class RemoveIndexFromGradeSubjectUnits < ActiveRecord::Migration[6.0]
  def change
    remove_index :grade_subject_units, name: "index_grade_subject_units_on_unit_name_and_grade_subject_id"
  end
end
