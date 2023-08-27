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
class LessonSerializer < ActiveModel::Serializer
    attributes :id, :grade_subject_unit_id, :grade_subject_id
end
