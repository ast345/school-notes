# == Schema Information
#
# Table name: assigned_subjects
#
#  id                       :bigint           not null, primary key
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  grade_subjects_id        :bigint           not null
#  school_class_teachers_id :bigint           not null
#
# Indexes
#
#  index_assigned_subjects_on_grade_subjects_id         (grade_subjects_id)
#  index_assigned_subjects_on_school_class_teachers_id  (school_class_teachers_id)
#
class AssignedSubject < ApplicationRecord
    belongs_to :school_class_teacher, foreign_key: 'school_class_teachers_id'
    belongs_to :grade_subject, foreign_key: 'grade_subjects_id'
end
