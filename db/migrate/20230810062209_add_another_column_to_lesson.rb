class AddAnotherColumnToLesson < ActiveRecord::Migration[6.0]
  def change
    add_reference :lessons, :grade_subject
  end
end
