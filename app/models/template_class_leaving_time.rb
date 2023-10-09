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
class TemplateClassLeavingTime < ApplicationRecord
    enum day_of_week: { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 }
    belongs_to :school_class
end
