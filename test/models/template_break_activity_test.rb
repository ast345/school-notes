# == Schema Information
#
# Table name: template_break_activities
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
#  index_template_break_activities_on_school_class_id  (school_class_id)
#  temp_b_act_validates                                (day_of_week,school_class_id) UNIQUE
#
require 'test_helper'

class TemplateBreakActivityTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
