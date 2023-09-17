# == Schema Information
#
# Table name: lesson_wdays
#
#  id              :bigint           not null, primary key
#  friday          :boolean          default(TRUE), not null
#  monday          :boolean          default(TRUE), not null
#  saturday        :boolean          default(FALSE), not null
#  start_of_week   :date             not null
#  sunday          :boolean          default(FALSE), not null
#  thursday        :boolean          default(TRUE), not null
#  tuesday         :boolean          default(TRUE), not null
#  wednesday       :boolean          default(TRUE), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  school_class_id :bigint           not null
#
# Indexes
#
#  index_lesson_wdays_on_school_class_id                    (school_class_id)
#  index_lesson_wdays_on_school_class_id_and_start_of_week  (school_class_id,start_of_week) UNIQUE
#
class LessonWday < ApplicationRecord
    belongs_to :school_class
end
