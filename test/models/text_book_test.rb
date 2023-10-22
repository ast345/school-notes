# == Schema Information
#
# Table name: text_books
#
#  id                :bigint           not null, primary key
#  revision_year     :integer          not null
#  text_book_name    :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  grade_subject_id  :bigint           not null
#  text_book_comp_id :bigint           not null
#
# Indexes
#
#  index_text_books_on_grade_subject_id   (grade_subject_id)
#  index_text_books_on_text_book_comp_id  (text_book_comp_id)
#
require 'test_helper'

class TextBookTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
