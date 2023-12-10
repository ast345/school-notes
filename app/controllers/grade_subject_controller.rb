class GradeSubjectController < ApplicationController
    before_action :authenticate_user!
    def index
        grade_id = params[:grade_id]
        grade_name = Grade.find(grade_id).grade_name
        school_types_id = Grade.find(grade_id).school_types_id

        subjects_with_grades = []
        if grade_name == "専科"
            grades = Grade.where(school_types_id: school_types_id).where.not(grade_name: '専科')
            grade_ids = []
            grades.each do |grade|
                grade_ids << grade.id
            end
            grade_ids.each do |grade_id|
                grade_subjects = []
                grade_name = Grade.find(grade_id).grade_name
                grade_subject_sets = GradeSubject.where(grades_id: grade_id)
                grade_subject_sets.each do |grade_subject_set|
                    grade_subjects << grade_subject_set
                end
                subjects_with_grade = {
                    grade_name: grade_name,
                    grade_subjects: grade_subjects
                }
                subjects_with_grades << subjects_with_grade
            end
        else
            grade_subjects = GradeSubject.where(grades_id: grade_id)
            subjects_with_grade = {
                grade_name: grade_name,
                grade_subjects: grade_subjects
            }
            subjects_with_grades << subjects_with_grade
        end

        subjects_data = []
        subjects_with_grades.each do |subjects_with_grade|
            grade_name = subjects_with_grade[:grade_name]
            grade_subjects = subjects_with_grade[:grade_subjects]

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

                subject_data = {
                    grade_subject_id: grade_subject_id,
                    subject_name: subject_name,
                    text_books: text_books_data
                }
    
                # レスポンスデータを配列に追加
                subjects << subject_data

            end
            grade_subjects_data = {
                grade_name: grade_name,
                grade_subjects: subjects
            }
            subjects_data << grade_subjects_data
        end

        render json: subjects_data
    end
end