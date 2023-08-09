# == Schema Information
#
# Table name: school_classes
#
#  id         :bigint           not null, primary key
#  class_name :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  grade_id   :bigint           not null
#
# Indexes
#
#  index_school_classes_on_grade_id  (grade_id)
#
class SchoolClass < ApplicationRecord
    belongs_to :grade
    has_many :school_class_teachers, foreign_key: 'school_classes_id', dependent: :destroy
    has_many :teachers, through: :school_class_teachers

    accepts_nested_attributes_for :school_class_teachers

    validates :grade_id, presence: true
    validates :class_name, presence: true
end
