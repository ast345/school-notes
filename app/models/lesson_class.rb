# == Schema Information
#
# Table name: lesson_classes
#
#  id              :bigint           not null, primary key
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  lesson_id       :bigint           not null
#  school_class_id :bigint           not null
#
# Indexes
#
#  index_lesson_classes_on_lesson_id        (lesson_id)
#  index_lesson_classes_on_school_class_id  (school_class_id)
#
class LessonClass < ApplicationRecord
    belongs_to :lesson
    belongs_to :school_class

    validate :unique_school_class_lesson, on: :create

    def unique_school_class_lesson
        lesson_date = lesson.date
        lesson_period = lesson.period
    
        if Lesson.joins(:lesson_classes)
                 .where(lesson_classes: { school_class_id: school_class_id })
                 .where(date: lesson_date, period: lesson_period)
                 .exists?
          errors.add(:base, "This school class already has a lesson for the same date and period.")
        end
      end
end
