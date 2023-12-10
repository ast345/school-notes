class TextBooksController < ApplicationController
    before_action :authenticate_user!

    def show
        @school_class_id = params[:school_class_id]
        @text_book = TextBook.find(params[:id])
        @grade_subject_units = GradeSubjectUnit.where(text_book_id: params[:id])
    end
end