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
end
