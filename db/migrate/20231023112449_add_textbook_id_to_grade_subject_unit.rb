class AddTextbookIdToGradeSubjectUnit < ActiveRecord::Migration[6.0]
  def change
    add_reference :grade_subject_units, :text_book
  end
end
