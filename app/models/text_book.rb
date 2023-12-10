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
class TextBook < ApplicationRecord
    belongs_to :grade_subject
    belongs_to :text_book_comp
    has_many :grade_subject_units
    has_many :using_texts, dependent: :destroy
    has_many :school_classes, through: :using_texts
end
