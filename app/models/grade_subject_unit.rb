# == Schema Information
#
# Table name: grade_subject_units
#
#  id               :bigint           not null, primary key
#  unit_name        :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  grade_subject_id :bigint           not null
#  text_book_id     :bigint
#
# Indexes
#
#  index_grade_subject_units_on_grade_subject_id  (grade_subject_id)
#  index_grade_subject_units_on_text_book_id      (text_book_id)
#
class GradeSubjectUnit < ApplicationRecord
    belongs_to :grade_subject
    belongs_to :text_book, optional: true
    has_many :lessons
    
    validates :unit_name, uniqueness: { scope: [:grade_subject_id, :text_book_id] }, if: -> { text_book_id.present? }
    validates :unit_name, uniqueness: { scope: :grade_subject_id }, unless: -> { text_book_id.present? }
end
