# == Schema Information
#
# Table name: date_items
#
#  id              :bigint           not null, primary key
#  date            :date
#  day_of_week     :integer
#  item_name       :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  school_class_id :bigint           not null
#
# Indexes
#
#  index_date_items_on_school_class_id  (school_class_id)
#
require 'test_helper'

class DateItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end