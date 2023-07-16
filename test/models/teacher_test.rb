# == Schema Information
#
# Table name: teachers
#
#  id           :bigint           not null, primary key
#  display_name :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  users_id     :bigint
#
# Indexes
#
#  index_teachers_on_users_id  (users_id)
#
# Foreign Keys
#
#  fk_rails_...  (users_id => users.id)
#
require 'test_helper'

class TeacherTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
