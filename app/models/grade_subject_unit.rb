# == Schema Information
#
# Table name: grade_subject_units
#
#  id               :bigint           not null, primary key
#  unit_name        :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  grade_subject_id :bigint           not null
#
# Indexes
#
#  index_grade_subject_units_on_grade_subject_id  (grade_subject_id)
#
class GradeSubjectUnit < ApplicationRecord
    belongs_to :grade_subject
    has_many :lessons
end