# == Schema Information
#
# Table name: user_types
#
#  id         :bigint           not null, primary key
#  type_name  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class UserType < ApplicationRecord
    has_many :user_to_types, foreign_key: 'user_types_id'
end
