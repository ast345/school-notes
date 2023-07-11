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
require 'test_helper'

class GradeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
