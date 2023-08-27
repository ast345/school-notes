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
class Event < ApplicationRecord
    enum day_of_week: { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 }
    belongs_to :school_class

    validates :date, uniqueness: { scope: :school_class_id, message: "already has an event for this date" }
end
