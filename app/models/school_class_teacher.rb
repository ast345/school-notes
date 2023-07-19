# == Schema Information
#
# Table name: school_class_teachers
#
#  id                :bigint           not null, primary key
#  teacher_type      :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  school_classes_id :bigint           not null
#  teachers_id       :bigint           not null
#
# Indexes
#
#  index_school_class_teachers_on_school_classes_id  (school_classes_id)
#  index_school_class_teachers_on_teachers_id        (teachers_id)
#
class SchoolClassTeacher < ApplicationRecord
    belongs_to :teacher, foreign_key: 'teachers_id'
    belongs_to :school_class, foreign_key: 'school_classes_id'
end
