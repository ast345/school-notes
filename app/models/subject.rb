# == Schema Information
#
# Table name: subjects
#
#  id           :bigint           not null, primary key
#  subject_name :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Subject < ApplicationRecord
end
