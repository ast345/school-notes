class GradeSubjectController < ApplicationController
    def index
        grade_id = params[:grade_id]
        grade_subjects = GradeSubject.where(grades_id: grade_id)

        subjects = []
        grade_subjects.each do |grade_subject|
            grade_subject_id = grade_subject.id
            subject_name = grade_subject.subject.subject_name
            text_books = grade_subject.text_books
            text_books_data = []
            text_books.each do |text_book|
                text_book_id = text_book.id
                text_book_name = text_book.text_book_name
                text_book_comp = text_book.text_book_comp.abbreviation

                text_book_data = {
                    text_book_id: text_book_id,
                    text_book_name: text_book_name,
                    text_book_comp: text_book_comp
                }

                text_books_data << text_book_data
            end
            # レスポンスデータを作成
            subject_data = {
                grade_subject_id: grade_subject_id,
                subject_name: subject_name,
                text_books: text_books_data
            }

            # レスポンスデータを配列に追加
            subjects << subject_data
        end

        render json: subjects
    end
end