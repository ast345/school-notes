# == Schema Information
#
# Table name: class_leaving_times
#
#  id              :bigint           not null, primary key
#  date            :date
#  day_of_week     :integer
#  leaving_time    :time             not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  school_class_id :bigint           not null
#
# Indexes
#
#  index_class_leaving_times_on_date_and_school_class_id  (date,school_class_id) UNIQUE
#  index_class_leaving_times_on_school_class_id           (school_class_id)
#
class ClassLeavingTimeSerialzier < ActiveModel::Serializer
    attributes :id, :leaving_time
end
