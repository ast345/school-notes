# == Schema Information
#
# Table name: grades
#
#  id              :bigint           not null, primary key
#  grade_name      :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  school_types_id :bigint
#
# Indexes
#
#  index_grades_on_school_types_id  (school_types_id)
#
# Foreign Keys
#
#  fk_rails_...  (school_types_id => school_types.id)
#
class Grade < ApplicationRecord
    belongs_to :school_type, foreign_key: 'school_types_id'
    has_many :grade_subjects, foreign_key: 'grades_id'
    has_many :school_classes

    def full_grade_name
        "#{school_type.type_name}#{grade_name}"
    end
end
