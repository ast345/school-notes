# == Schema Information
#
# Table name: grade_subjects
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  grades_id   :bigint
#  subjects_id :bigint
#
# Indexes
#
#  index_grade_subjects_on_grades_id    (grades_id)
#  index_grade_subjects_on_subjects_id  (subjects_id)
#
# Foreign Keys
#
#  fk_rails_...  (grades_id => grades.id)
#  fk_rails_...  (subjects_id => subjects.id)
#
require 'test_helper'

class GradeSubjectTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
