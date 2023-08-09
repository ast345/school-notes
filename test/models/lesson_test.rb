# == Schema Information
#
# Table name: lessons
#
#  id          :bigint           not null, primary key
#  date        :date
#  day_of_week :integer
#  period      :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'test_helper'

class LessonTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
