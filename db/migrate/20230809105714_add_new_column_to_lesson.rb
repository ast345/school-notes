class AddNewColumnToLesson < ActiveRecord::Migration[6.0]
  def change
    add_reference :lessons, :grade_subject_unit
  end
end
