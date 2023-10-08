# == Schema Information
#
# Table name: template_date_items
#
#  id              :bigint           not null, primary key
#  day_of_week     :integer
#  item_name       :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  school_class_id :bigint           not null
#
# Indexes
#
#  index_template_date_items_on_school_class_id  (school_class_id)
#  temp_d_items_validates                        (day_of_week,school_class_id) UNIQUE
#
require 'test_helper'

class TemplateDateItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
