# == Schema Information
#
# Table name: user_to_types
#
#  id            :bigint           not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_types_id :bigint
#  users_id      :bigint
#
# Indexes
#
#  index_user_to_types_on_user_types_id  (user_types_id)
#  index_user_to_types_on_users_id       (users_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_types_id => user_types.id)
#  fk_rails_...  (users_id => users.id)
#
require 'test_helper'

class UserToTypeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
