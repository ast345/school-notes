# == Schema Information
#
# Table name: break_act_displays
#
#  id              :bigint           not null, primary key
#  display         :boolean          default(FALSE), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  school_class_id :bigint           not null
#
# Indexes
#
#  index_break_act_displays_on_school_class_id  (school_class_id)
#
require 'test_helper'

class BreakActDisplayTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
