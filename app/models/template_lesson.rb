# == Schema Information
#
# Table name: template_lessons
#
#  id               :bigint           not null, primary key
#  day_of_week      :integer          not null
#  period           :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  grade_subject_id :bigint           not null
#
# Indexes
#
#  index_template_lessons_on_grade_subject_id  (grade_subject_id)
#
class TemplateLesson < ApplicationRecord
    enum day_of_week: { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 }
    
    belongs_to :grade_subject
    has_many :template_lesson_classes, dependent: :destroy

    def subject_name
        self.grade_subject.subject.subject_name
    end

    def grade_subject_name(grade_id)
        if grade_id == 1 or grade_id == 2
            grade_subject = self.grade_subject
            grade_subject.subject.yomigana
        elsif grade_id == 13 || grade_id == 14 || grade_id == 15
            grade_subject = self.grade_subject
            grade_name = grade_subject.grade.grade_name.gsub('生', '')
            subject_name = grade_subject.subject.subject_name
            grade_name + subject_name
        else
            grade_subject = self.grade_subject
            grade_subject.subject.subject_name
        end
    end
end
