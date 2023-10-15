# == Schema Information
#
# Table name: subjects
#
#  id           :bigint           not null, primary key
#  subject_name :string
#  yomigana     :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Subject < ApplicationRecord
    has_many :grade_subjects, foreign_key: 'subjects_id'
end
