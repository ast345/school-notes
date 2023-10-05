# == Schema Information
#
# Table name: morning_activities
#
#  id              :bigint           not null, primary key
#  activity_name   :string           not null
#  date            :date
#  day_of_week     :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  school_class_id :bigint           not null
#
# Indexes
#
#  index_morning_activities_on_date_and_school_class_id  (date,school_class_id) UNIQUE
#  index_morning_activities_on_school_class_id           (school_class_id)
#
require 'test_helper'

class MorningActivityTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
