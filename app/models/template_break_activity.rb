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
class TemplateBreakActivity < ApplicationRecord
    enum day_of_week: { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 }
    belongs_to :school_class
end
