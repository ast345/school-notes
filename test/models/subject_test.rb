# == Schema Information
#
# Table name: subjects
#
#  id           :bigint           not null, primary key
#  subject_name :string
#  yomigana     :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
require 'test_helper'

class SubjectTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
