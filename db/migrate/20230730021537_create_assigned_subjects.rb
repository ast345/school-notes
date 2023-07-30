class CreateAssignedSubjects < ActiveRecord::Migration[6.0]
  def change
    create_table :assigned_subjects do |t|
      t.references :school_class_teachers, null:false
      t.references :grade_subjects, null:false
      t.timestamps
    end
  end
end
