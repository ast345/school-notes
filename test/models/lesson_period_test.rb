# == Schema Information
#
# Table name: lesson_periods
#
#  id              :bigint           not null, primary key
#  end_of_period   :integer          not null
#  start_of_period :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  school_class_id :bigint           not null
#
# Indexes
#
#  index_lesson_periods_on_school_class_id  (school_class_id)
#
require 'test_helper'

class LessonPeriodTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
