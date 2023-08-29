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
#  index_date_items_on_date_and_school_class_id  (date,school_class_id) UNIQUE
#  index_date_items_on_school_class_id           (school_class_id)
#
class DateItem < ApplicationRecord
    belongs_to :school_class
end
