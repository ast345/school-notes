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

    def subject_display_name
        grade_id = self.school_class_teacher.school_class.grade.id
        if grade_id == 13 || grade_id == 14 || grade_id == 15
            grade_subject = self.grade_subject
            grade_name = grade_subject.grade.grade_name.gsub('生', '')
            subject_name = grade_subject.subject.subject_name
            grade_name + subject_name
        else
            self.grade_subject.subject.subject_name
        end
    end
end
