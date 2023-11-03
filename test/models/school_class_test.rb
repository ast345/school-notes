# == Schema Information
#
# Table name: school_classes
#
#  id         :bigint           not null, primary key
#  class_name :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  grade_id   :bigint           not null
#
# Indexes
#
#  index_school_classes_on_grade_id  (grade_id)
#
require 'test_helper'

class SchoolClassTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
