# == Schema Information
#
# Table name: text_book_comps
#
#  id           :bigint           not null, primary key
#  abbreviation :string           not null
#  comp_name    :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
require 'test_helper'

class TextBookCompTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
