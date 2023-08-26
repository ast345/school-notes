# == Schema Information
#
# Table name: lessons
#
#  id                    :bigint           not null, primary key
#  date                  :date
#  day_of_week           :integer
#  period                :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  grade_subject_id      :bigint
#  grade_subject_unit_id :bigint
#
# Indexes
#
#  index_lessons_on_grade_subject_id       (grade_subject_id)
#  index_lessons_on_grade_subject_unit_id  (grade_subject_unit_id)
#
class Lesson < ApplicationRecord
    enum day_of_week: { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 }
    has_many :lesson_classes, dependent: :destroy
    has_many :school_classes, through: :lesson_classes
    belongs_to :grade_subject
    belongs_to :grade_subject_unit, optional: true

    def grade_subject_name
        grade_subject.subject.subject_name
    end

    def unit_name
        grade_subject_unit.unit_name
    end
end
