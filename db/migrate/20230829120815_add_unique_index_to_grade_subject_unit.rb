class AddUniqueIndexToGradeSubjectUnit < ActiveRecord::Migration[6.0]
  def change
    add_index :grade_subject_units, [:unit_name, :grade_subject_id], unique: true
  end
end
