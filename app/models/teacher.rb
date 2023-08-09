# == Schema Information
#
# Table name: teachers
#
#  id           :bigint           not null, primary key
#  display_name :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :bigint
#
# Indexes
#
#  index_teachers_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Teacher < ApplicationRecord
    belongs_to :user
    has_many :school_class_teachers, foreign_key: 'teachers_id'
    has_many :school_classes, through: :school_class_teachers
end
