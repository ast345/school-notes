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
class TemplateLessonSerializer < ActiveModel::Serializer
    attributes :id, :grade_subject_id
end
