# == Schema Information
#
# Table name: template_morning_activities
#
#  id              :bigint           not null, primary key
#  activity_name   :string           not null
#  day_of_week     :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  school_class_id :bigint           not null
#
# Indexes
#
#  index_template_morning_activities_on_school_class_id  (school_class_id)
#  temp_m_act_validates                                  (day_of_week,school_class_id) UNIQUE
#
require 'test_helper'

class TemplateMorningActivityTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
