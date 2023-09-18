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
end
