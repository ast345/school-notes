# == Schema Information
#
# Table name: assigned_subjects
#
#  id                       :bigint           not null, primary key
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  grade_subjects_id        :bigint           not null
#  school_class_teachers_id :bigint           not null
#
# Indexes
#
#  index_assigned_subjects_on_grade_subjects_id         (grade_subjects_id)
#  index_assigned_subjects_on_school_class_teachers_id  (school_class_teachers_id)
#
require 'test_helper'

class AssignedSubjectTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
