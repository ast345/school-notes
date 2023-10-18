# == Schema Information
#
# Table name: template_class_leaving_times
#
#  id              :bigint           not null, primary key
#  day_of_week     :integer
#  leaving_time    :time
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  school_class_id :bigint           not null
#
# Indexes
#
#  index_template_class_leaving_times_on_school_class_id  (school_class_id)
#  temp_leav_times_validates                              (day_of_week,school_class_id) UNIQUE
#
class ClassLeavingTimeSerialzier < ActiveModel::Serializer
    attributes :id, :leaving_time
end
