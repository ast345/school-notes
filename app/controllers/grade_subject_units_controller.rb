class GradeSubjectUnitsController < ApplicationController
    def create
        school_class =SchoolClass.find(grade_subject_unit_params[:school_class_id])
        grade_subject_id = grade_subject_unit_params[:grade_subject_id]
        unit_name = grade_subject_unit_params[:unit_name]
        text_books = school_class.text_books
        this_subject_text_id = nil
        text_books.each do|text_book|
            text_book_grade_subject_id = text_book.grade_subject_id
            if grade_subject_id == text_book_grade_subject_id
                this_subject_text_id = text_book.id
            end
        end

        if this_subject_text_id
            @grade_subject_unit = GradeSubjectUnit.new(text_book_id: this_subject_text_id, grade_subject_id: grade_subject_id, unit_name: unit_name)
            @grade_subject_unit.save!
        else
            @grade_subject_unit = GradeSubjectUnit.new(grade_subject_id: grade_subject_id, unit_name: unit_name)
            @grade_subject_unit.save!
        end
        render json: @grade_subject_unit
    end

    def update
        @grade_subject_unit = GradeSubjectUnit.find(params[:id])
        if @grade_subject_unit.update(grade_subject_unit_params)
          respond_to do |format|
            format.json { render json: @grade_subject_unit.to_json }
          end
        end
    end

    def destroy
        grade_subject_unit = GradeSubjectUnit.find(params[:id])
        grade_subject_unit.destroy!
    end

    private
    def grade_subject_unit_params
        params.require(:grade_subject_unit).permit(:unit_name, :grade_subject_id, :school_class_id)
    end
end