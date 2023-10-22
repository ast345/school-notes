# == Schema Information
#
# Table name: grade_subjects
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  grades_id   :bigint
#  subjects_id :bigint
#
# Indexes
#
#  index_grade_subjects_on_grades_id    (grades_id)
#  index_grade_subjects_on_subjects_id  (subjects_id)
#
# Foreign Keys
#
#  fk_rails_...  (grades_id => grades.id)
#  fk_rails_...  (subjects_id => subjects.id)
#
class GradeSubject < ApplicationRecord
    belongs_to :grade, foreign_key: 'grades_id'
    belongs_to :subject, foreign_key: 'subjects_id'
    has_many :assigned_subjects, foreign_key: 'grade_subjects_id'
    has_many :grade_subject_units, dependent: :destroy
    has_many :lessons
    has_many :template_lessons
    has_many :text_books
end
