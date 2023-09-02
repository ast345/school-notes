# == Schema Information
#
# Table name: class_leaving_times
#
#  id              :bigint           not null, primary key
#  date            :date
#  day_of_week     :integer
#  leaving_time    :time
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  school_class_id :bigint           not null
#
# Indexes
#
#  index_class_leaving_times_on_date_and_school_class_id  (date,school_class_id) UNIQUE
#  index_class_leaving_times_on_school_class_id           (school_class_id)
#
class ClassLeavingTime < ApplicationRecord
    belongs_to :school_class

    validates :date, uniqueness: { scope: :school_class_id, message: "この日の行事予定はすでに作成されています。" }
end
