# == Schema Information
#
# Table name: events
#
#  id              :bigint           not null, primary key
#  date            :date
#  day_of_week     :integer
#  event_name      :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  school_class_id :bigint           not null
#
# Indexes
#
#  index_events_on_date_and_school_class_id  (date,school_class_id) UNIQUE
#  index_events_on_school_class_id           (school_class_id)
#
require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
