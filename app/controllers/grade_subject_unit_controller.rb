class GradeSubjectUnitController < ApplicationController
    def get_grade_subject_units
        school_class = SchoolClass.find(params[:school_class_id])
        grade_subject_id = params[:grade_subject_id].to_i
        text_books = school_class.text_books
        this_subject_text_id = nil
        text_books.each do|text_book|
            text_book_grade_subject_id = text_book.grade_subject_id
            if grade_subject_id == text_book_grade_subject_id
                this_subject_text_id = text_book.id
            end
        end
        # grade_subject_unitsを取得する
        if this_subject_text_id
            grade_subject_units = GradeSubjectUnit.where(grade_subject_id: params[:grade_subject_id], text_book_id: this_subject_text_id)
        else
            grade_subject_units = GradeSubjectUnit.where(grade_subject_id: params[:grade_subject_id])
        end
        render json: grade_subject_units
    end
end