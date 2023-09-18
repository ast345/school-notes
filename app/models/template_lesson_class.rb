# == Schema Information
#
# Table name: template_lesson_classes
#
#  id                 :bigint           not null, primary key
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  school_class_id    :bigint           not null
#  template_lesson_id :bigint           not null
#
# Indexes
#
#  index_template_lesson_classes_on_school_class_id     (school_class_id)
#  index_template_lesson_classes_on_template_lesson_id  (template_lesson_id)
#
class TemplateLessonClass < ApplicationRecord
    belongs_to :template_lesson
    belongs_to :school_class

    validate :unique_template_lesson_class, on: :create

    def unique_template_lesson_class
        lesson_day_of_week = template_lesson.day_of_week
        lesson_period = template_lesson.period
    
        if TemplateLesson.joins(:template_lesson_classes)
                 .where(template_lesson_classes: { school_class_id: school_class.id })
                 .where(day_of_week: lesson_day_of_week, period: lesson_period)
                 .exists?
          errors.add(:base, "This school class already has a temolate lesson for the same date and period.")
        end
    end
end
