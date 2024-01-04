# == Schema Information
#
# Table name: break_act_displays
#
#  id              :bigint           not null, primary key
#  display         :boolean          default(FALSE), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  school_class_id :bigint           not null
#
# Indexes
#
#  index_break_act_displays_on_school_class_id  (school_class_id)
#
class BreakActDisplay < ApplicationRecord
    belongs_to :school_class
end
