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
class UsingText < ApplicationRecord
    belongs_to :school_class
    belongs_to :text_book

    def subject_name
        self.text_book.grade_subject.subject.subject_name
    end

    def text_book_name
        self.text_book.text_book_name
    end
end
