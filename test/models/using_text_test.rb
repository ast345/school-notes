# == Schema Information
#
# Table name: using_texts
#
#  id              :bigint           not null, primary key
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  school_class_id :bigint           not null
#  text_book_id    :bigint           not null
#
# Indexes
#
#  index_using_texts_on_school_class_id  (school_class_id)
#  index_using_texts_on_text_book_id     (text_book_id)
#
require 'test_helper'

class UsingTextTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
